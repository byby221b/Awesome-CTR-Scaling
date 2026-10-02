/* Minimal in-memory DOM harness. These are unit tests, not browser/layout tests. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'site/catalog.json'), 'utf8'));
const source = fs.readFileSync(path.join(ROOT, 'web/app.js'), 'utf8');

async function boot(initialURL = 'https://example.test/Awesome-CTR-Scaling/', failFetch = false, data = catalog, options = {}) {
  const route = new URL(initialURL).pathname;
  const template = fs.readFileSync(path.join(ROOT, 'web', /(?:^|\/)zh(?:\.html|\/)?$/.test(route) ? 'zh.html' : 'index.html'), 'utf8');
  const roots = new Map(), inputs = [], events = {}, timers = new Map(), logs = [];
  // Synthetic line metrics exercise overflow decisions; actual wrapping/ellipsis needs browser QA.
  const layout = { charsPerLine: 80, reducedMotion: false, ...options };
  const scrollCalls = [];
  let timerID = 0;
  class Element {
    constructor(tag) {
      this.tagName = tag.toUpperCase(); this.children = []; this.listeners = {};
      this.attrs = {}; this.value = ''; this.hidden = false; this.style = {}; this.className = ''; this._text = '';
      this.classList = {
        contains: name => this.className.split(/\s+/).includes(name),
        add: name => { if (!this.classList.contains(name)) this.className += ' ' + name; },
        remove: name => { this.className = this.className.split(/\s+/).filter(x => x !== name).join(' '); },
        toggle: (name, enabled) => enabled ? this.classList.add(name) : this.classList.remove(name)
      };
    }
    set textContent(text) { this._text = String(text); this.children = []; }
    get textContent() { return this._text + this.children.map(x => x.textContent).join(''); }
    get scrollHeight() { return Math.ceil(this.textContent.length / layout.charsPerLine) * 33.3; }
    get clientHeight() { return this.classList.contains('is-collapsed') ? Math.min(this.scrollHeight, 4 * 33.3) : this.scrollHeight; }
    get firstElementChild() { return this.children[0] || null; }
    append(...nodes) { for (const node of nodes) this.children.push(...(node.fragment ? node.children : [node])); }
    replaceChildren(...nodes) { this.children = []; this._text = ''; this.append(...nodes); }
    setAttribute(name, value) { this.attrs[name] = String(value); }
    getAttribute(name) { return this.attrs[name] ?? null; }
    addEventListener(type, handler) { (this.listeners[type] ||= []).push(handler); }
    fire(type, extra = {}) { for (const handler of this.listeners[type] || []) handler({ target: this, button: 0, preventDefault() {}, ...extra }); }
    focus(options) { document.activeElement = this; this.focusOptions = options; }
    scrollIntoView() { this.scrolled = true; }
    contains(target) { return target === this || this.children.some(x => x.contains(target)); }
    querySelector(selector) { return walk(this).find(x => selector === '[aria-pressed="true"]' && x.attrs['aria-pressed'] === 'true') || null; }
    closest() { return null; }
  }
  function walk(node) { return [node, ...node.children.flatMap(walk)]; }
  for (const match of template.matchAll(/\bid="([^"]+)"/g)) { const node = new Element('div'); node.id = match[1]; roots.set(node.id, node); }
  for (const value of ['all', 'core', 'related']) { const input = new Element('input'); input.value = value; inputs.push(input); }
  const document = {
    activeElement: null,
    getElementById: id => roots.get(id) || [...roots.values()].flatMap(walk).find(x => x.id === id),
    createElement: tag => new Element(tag),
    createDocumentFragment: () => Object.assign(new Element('fragment'), { fragment: true }),
    querySelectorAll: selector => selector === 'input[name="collection"]' ? inputs : [],
    addEventListener: (type, handler) => { (events[type] ||= []).push(handler); }
  };
  const fireWindow = type => { for (const handler of events[type] || []) handler(); };
  const window = {
    location: new URL(initialURL), scrollY: 0, innerHeight: 800,
    addEventListener: (type, handler) => { (events[type] ||= []).push(handler); },
    matchMedia: query => ({ matches: query === '(prefers-reduced-motion: reduce)' && layout.reducedMotion }),
    scrollTo: options => { scrollCalls.push(options); window.scrollY = options.top; fireWindow('scroll'); }
  };
  const history = [window.location.href]; let historyIndex = 0;
  window.history = {
    pushState(_, __, url) { window.location = new URL(url, window.location); history.splice(++historyIndex); history.push(window.location.href); },
    replaceState(_, __, url) { window.location = new URL(url, window.location); history[historyIndex] = window.location.href; }
  };
  const context = vm.createContext({ document, window, URL, URLSearchParams,
    fetch: async () => ({ ok: !failFetch, json: async () => structuredClone(data) }),
    console: { error: (...args) => logs.push(args.join(' ')) },
    setTimeout: fn => { timers.set(++timerID, fn); return timerID; },
    clearTimeout: id => timers.delete(id), requestAnimationFrame: fn => fn()
  });
  vm.runInContext(source, context);
  await new Promise(resolve => setImmediate(resolve));
  const $ = id => document.getElementById(id);
  return { $, inputs, window, logs, walk, scrollCalls,
    active: () => document.activeElement,
    scroll: top => { window.scrollY = top; fireWindow('scroll'); },
    resize: charsPerLine => { layout.charsPerLine = charsPerLine; fireWindow('resize'); },
    cards: () => $('papers').children.filter(x => x.tagName === 'ARTICLE'),
    change: (id, value) => { $(id).value = value; $(id).fire('change'); },
    search: text => { $('search-input').value = text; $('search-form').fire('submit'); },
    back() { if (historyIndex > 0) window.location = new URL(history[--historyIndex]); for (const fn of events.popstate || []) fn(); },
    forward() { if (historyIndex < history.length - 1) window.location = new URL(history[++historyIndex]); for (const fn of events.popstate || []) fn(); },
    flush() { for (const [id, fn] of timers) { timers.delete(id); fn(); } }
  };
}

(async () => {
  let app = await boot();
  assert.equal(app.$('result-count').textContent, String(catalog.papers.length));
  assert.equal(app.cards().length, 30);
  app.$('load-more').fire('click'); assert.equal(app.cards().length, 60);
  assert.equal(app.active(), app.cards()[30], 'paging focuses the first new article');
  app.inputs[1].fire('change');
  assert.equal(app.$('result-count').textContent, String(catalog.papers.filter(p => p.collection === 'core').length));
  app.search('Wukong'); assert(app.cards().length > 0); assert(app.window.location.search.includes('q=Wukong'));
  app.search('qzx-no-paper-has-this-token'); assert.equal(app.cards().length, 0);
  app.$('reset-sidebar').fire('click'); assert.equal(app.$('result-count').textContent, String(catalog.papers.length));
  app.change('company-filter', 'meta');
  assert.equal(app.$('result-count').textContent, String(catalog.papers.filter(p => p.companies.includes('meta')).length));
  app.change('year-filter', '2026');
  assert.equal(app.$('result-count').textContent, String(catalog.papers.filter(p => p.companies.includes('meta') && p.year === 2026).length));
  app.back(); assert.equal(app.$('year-filter').value, '');
  app.forward(); assert.equal(app.$('year-filter').value, '2026');
  app.$('reset-sidebar').fire('click'); app.change('tag-filter', 'Scaling Law');
  assert(app.cards().every(card => card.textContent.includes('Scaling Law')));
  app.inputs[2].fire('change'); assert.equal(app.$('tag-filter').value, ''); assert.equal(app.$('tag-filter').disabled, true);
  assert.equal(app.$('result-count').textContent, String(catalog.papers.filter(p => p.collection === 'related').length));
  app.$('reset-sidebar').fire('click');
  for (const query of ['2609.37905', 'UTTSI', 'PISA']) {
    app.search(query); assert(app.cards().length > 0, `no results for ${query}`);
  }
  app.$('reset-sidebar').fire('click'); app.change('sort-select', 'original');
  assert.equal(app.cards()[0].id, 'paper-' + catalog.papers[0].id.replace('.', '-'));
  app.change('sort-select', 'title');
  const byTitle = [...catalog.papers].sort((a, b) => a.title.localeCompare(b.title));
  assert.equal(app.cards()[0].id, 'paper-' + byTitle[0].id.replace('.', '-'));
  app.$('filter-toggle').fire('click'); assert.equal(app.$('filter-toggle').getAttribute('aria-expanded'), 'true');
  app.$('filter-toggle').fire('click'); assert.equal(app.$('filter-toggle').getAttribute('aria-expanded'), 'false');
  app.$('reset-sidebar').fire('click');
  app.$('search-input').value = 'Meta'; app.$('search-input').fire('input'); app.change('year-filter', '2026'); app.flush();
  assert.equal(app.$('search-input').value, 'Meta'); assert.equal(app.$('year-filter').value, '2026');
  assert.equal(app.logs.length, 0, app.logs.join('\n'));
  app = await boot('https://example.test/Awesome-CTR-Scaling/#paper-2208-08489');
  assert(app.$('paper-2208-08489').scrolled); assert(app.cards().length > 30);
  app = await boot('https://example.test/Awesome-CTR-Scaling/?collection=related&company=invalid#paper-2208-08489');
  assert(app.$('paper-2208-08489').scrolled); assert.equal(app.$('company-filter').value, '');
  app = await boot('https://example.test/Awesome-CTR-Scaling/', true);
  assert.match(app.$('papers').textContent, /couldn’t be loaded/); assert.equal(app.$('papers').getAttribute('aria-busy'), 'false');
  // Both languages are real entry points; navigation keeps current filters and anchors.
  app = await boot('https://example.test/Awesome-CTR-Scaling/zh.html?q=Wukong&collection=core');
  assert(app.$('language-switch').href.includes('/index.html?q=Wukong&collection=core'));
  assert(app.$('category-options').textContent.includes('规模规律与理论'));
  assert(app.$('tag-filter').textContent.includes('多任务'));
  assert(app.$('showing-count').textContent.includes('篇论文'));
  const summarized = catalog.papers.find(p => p.summaries?.zh?.text);
  assert(summarized, 'fixture needs at least one Chinese summary');
  app.search(summarized.summaries.zh.text.slice(0, 10));
  assert(app.cards().some(card => card.id === 'paper-' + summarized.id.replace('.', '-')));
  app.$('reset-sidebar').fire('click');
  app.search('2602.09387');
  assert(app.cards()[0].textContent.includes('来源所载标题'));
  assert(app.cards()[0].textContent.includes('HeMix'));
  assert(!app.cards()[0].textContent.includes('原目录贡献说明'));
  assert(!app.walk(app.cards()[0]).some(node => node.className === 'catalog-annotation'));
  app = await boot('https://example.test/Awesome-CTR-Scaling/zh.html#paper-2208-08489');
  assert(app.$('language-switch').href.endsWith('/index.html#paper-2208-08489'));
  assert(app.$('paper-2208-08489').scrolled);
  app = await boot('https://example.test/Awesome-CTR-Scaling/?q=HeMix');
  assert(app.cards().some(card => card.id === 'paper-2602-09387'));
  app = await boot('https://example.test/Awesome-CTR-Scaling/zh.html', true);
  assert(app.$('papers').textContent.includes('暂时无法加载'));
  // The technical grid keeps complete records, stable anchors and controls in both templates.
  for (const route of ['', 'zh.html']) {
    app = await boot('https://example.test/Awesome-CTR-Scaling/' + route + '?sort=original');
    for (const [index, card] of app.cards().entries()) {
      const paper = catalog.papers[index];
      assert.deepEqual(card.children.map(node => node.className), ['paper-rail', 'paper-body', 'paper-metadata']);
      const [rail, body, metadata] = card.children;
      assert.equal(rail.children.find(node => node.className === 'paper-year').textContent, String(paper.year));
      assert.equal(rail.children.find(node => node.className === 'paper-number').textContent, String(index + 1).padStart(3, '0'));
      assert.equal(card.getAttribute('aria-labelledby'), card.id + '-title');
      assert(app.walk(body).some(node => node.id === card.id + '-title' && node.textContent === paper.title));
      assert(app.walk(body).some(node => node.id === card.id + '-summary'));
      assert(app.walk(body).some(node => node.id === card.id + '-abstract'));
      if (paper.affiliation) assert(metadata.textContent.includes(paper.affiliation));
      if (paper.venue) assert(metadata.textContent.includes(paper.venue));
      assert(app.walk(metadata).some(node => node.className === 'paper-area' && node.textContent));
      assert.equal(app.walk(metadata).filter(node => node.className === 'tag-button').length, paper.tags.length);
    }
    const ids = app.walk(app.$('papers')).map(node => node.id).filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, 'all card, title and reading IDs stay unique');
    const categoryButton = app.$('category-options').children.find(node => node.className === 'category-button' && node.getAttribute('aria-pressed') === 'false');
    categoryButton.fire('click');
    const category = new URL(app.window.location).searchParams.get('category');
    assert(category);
    assert.equal(app.$('result-count').textContent, String(catalog.papers.filter(paper => paper.category === category).length));
    assert.equal(app.active().getAttribute('aria-pressed'), 'true', 'recreated selected category restores focus');
    app.$('reset-sidebar').fire('click');
    app.search(catalog.papers.find(paper => paper.tags.length).id);
    const tagButton = app.walk(app.cards()[0]).find(node => node.className === 'tag-button');
    tagButton.fire('click');
    assert(new URL(app.window.location).searchParams.has('tag'));
    const searchChip = app.$('active-filters').children.find(node => node.className === 'active-chip' && (node.textContent.includes('搜索') || node.textContent.includes('Search:')));
    assert(searchChip); searchChip.fire('click');
    assert(!new URL(app.window.location).searchParams.has('q'));
    assert(new URL(app.window.location).searchParams.has('tag'));
    const targetCard = app.cards()[0];
    app.walk(targetCard).find(node => node.className === 'permalink').fire('click');
    assert.equal(app.window.location.search, '');
    assert.equal(app.window.location.hash, '#' + targetCard.id);
    assert.equal(app.$(targetCard.id).scrolled, true);
    assert.equal(app.logs.length, 0, app.logs.join('\n'));
  }
  const roundTripID = catalog.papers[0].id;
  const roundTripHash = '#paper-' + roundTripID.replace('.', '-');
  app = await boot('https://example.test/Awesome-CTR-Scaling/?q=' + roundTripID + '&sort=original' + roundTripHash);
  const initialSearch = app.window.location.search;
  const zhLink = new URL(app.$('language-switch').href, app.window.location);
  assert.equal(zhLink.search, initialSearch); assert.equal(zhLink.hash, roundTripHash);
  app = await boot(zhLink.href);
  const enLink = new URL(app.$('language-switch').href, app.window.location);
  assert(enLink.pathname.endsWith('/index.html'));
  assert.equal(enLink.search, initialSearch); assert.equal(enLink.hash, roundTripHash);
  // Missing content stays explicit. Source formatting uses DOM text, including hostile input.
  // Removed annotations never render or affect search, including stale unexpected input.
  assert(catalog.papers.every(paper => !Object.hasOwn(paper, 'contribution')));
  const obsoleteFixture = structuredClone(catalog);
  obsoleteFixture.papers = [obsoleteFixture.papers[0]];
  obsoleteFixture.papers[0].contribution = 'obsolete-annotation-only-fixture';
  for (const route of ['', 'zh.html']) {
    app = await boot('https://example.test/Awesome-CTR-Scaling/' + route, false, obsoleteFixture);
    assert(!app.cards()[0].textContent.includes('obsolete-annotation-only-fixture'));
    assert(!app.cards()[0].textContent.includes('Preserved catalog annotation'));
    assert(!app.cards()[0].textContent.includes('原目录贡献说明'));
    assert(!app.walk(app.cards()[0]).some(node => node.className === 'catalog-annotation'));
    app.search('obsolete-annotation-only-fixture');
    assert.equal(app.cards().length, 0);
  }
  obsoleteFixture.papers[0].summaries.en = {...obsoleteFixture.papers[0].summaries.en, basis:'catalog_contribution', text:'Rejected historical summary fixture'};
  app = await boot('https://example.test/Awesome-CTR-Scaling/', false, obsoleteFixture);
  assert(app.cards()[0].textContent.includes('English summary not yet available.'));
  assert(!app.cards()[0].textContent.includes('Rejected historical summary fixture'));
  app.search('Rejected historical summary fixture');
  assert.equal(app.cards().length, 0);
  const fixture = structuredClone(catalog);
  fixture.papers = [fixture.papers[0]];
  fixture.papers[0].summaries = {};
  fixture.papers[0].original_abstract = {status:'pending',text:'',language:'en',source_url:fixture.papers[0].links[0].url,retrieved_at:null,license:null,reason:'A source check is pending.'};
  app = await boot('https://example.test/Awesome-CTR-Scaling/zh.html', false, fixture);
  assert(app.cards()[0].textContent.includes('中文总结尚未补齐'));
  assert(app.cards()[0].textContent.includes('原始摘要待来源核实'));
  fixture.papers[0].original_abstract = {...fixture.papers[0].original_abstract,status:'verified',retrieved_at:'2026-10-02T04:00:00Z',text:String.raw`A \textbf{strong} model has $O(N^2)$ cost and $3\times$ speed. <script>alert(1)</script> \unknownmacro`};
  app = await boot('https://example.test/Awesome-CTR-Scaling/', false, fixture);
  const nodes = app.walk(app.cards()[0]);
  assert(nodes.some(n => n.tagName === 'STRONG' && n.textContent === 'strong'));
  assert(nodes.some(n => n.tagName === 'SUP' && n.textContent === '2'));
  assert(app.cards()[0].textContent.includes('3×'));
  assert(app.cards()[0].textContent.includes('<script>alert(1)</script>'));
  assert(!nodes.some(n => n.tagName === 'SCRIPT'));
  assert(nodes.some(n => n.tagName === 'CODE' && n.textContent === String.raw`\unknownmacro`));
  assert.equal(app.logs.length, 0, app.logs.join('\n'));
  // Four-line reading controls preserve source text, independent expansion, and state on rerender.
  const readingFixture = structuredClone(catalog);
  const readingPaper = readingFixture.papers[0];
  const readingID = 'paper-' + readingPaper.id.replace('.', '-');
  const longSummary = 'A readable summary of the verified paper. '.repeat(20) + 'summary-final-token';
  const longAbstract = String.raw`A \textbf{formatted} abstract with $O(N^2)$ cost. `.repeat(30) + 'abstract-final-token';
  for (const language of ['en', 'zh']) readingPaper.summaries[language].text = longSummary;
  readingPaper.original_abstract.text = longAbstract;
  const toggleFor = (app, id) => app.walk(app.$('papers')).find(node => node.getAttribute('aria-controls') === id);
  for (const route of ['', 'zh.html']) {
    const zh = route === 'zh.html';
    app = await boot('https://example.test/Awesome-CTR-Scaling/' + route + '?sort=original', false, readingFixture);
    const summaryID = readingID + '-summary', abstractID = readingID + '-abstract';
    const fullAbstract = app.$(abstractID).textContent;
    let toggle = toggleFor(app, summaryID);
    assert.equal(toggle.hidden, false);
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(toggle.textContent, zh ? '展开全文' : 'Show full text');
    assert(app.$(summaryID).classList.contains('is-collapsed'));
    const ids = app.walk(app.$('papers')).map(node => node.id).filter(Boolean);
    assert.equal(ids.length, new Set(ids).size, 'reading targets must have unique IDs');
    for (let repeat = 0; repeat < 3; repeat++) {
      toggle.fire('click');
      assert.equal(toggle.getAttribute('aria-expanded'), 'true');
      assert.equal(toggle.textContent, zh ? '收起全文' : 'Show less');
      assert(!app.$(summaryID).classList.contains('is-collapsed'));
      assert(app.$(abstractID).classList.contains('is-collapsed'), 'the other reading remains collapsed');
      toggle.fire('click');
      assert.equal(toggle.getAttribute('aria-expanded'), 'false');
      assert(app.$(summaryID).classList.contains('is-collapsed'));
      assert.equal(toggle.scrolled, true, 'collapse keeps the control in view');
      assert.equal(app.$(summaryID).textContent, longSummary);
      assert.equal(app.$(abstractID).textContent, fullAbstract);
    }
    toggle.fire('click');
    app.$('load-more').fire('click');
    toggle = toggleFor(app, summaryID);
    assert.equal(toggle.getAttribute('aria-expanded'), 'true', 'load more preserves expanded readings');
    assert(!app.$(summaryID).classList.contains('is-collapsed'));
    app.search('abstract-final-token');
    assert.equal(app.cards().length, 1, 'search includes text beyond the preview');
    assert.equal(toggleFor(app, summaryID).getAttribute('aria-expanded'), 'true');
    app.back(); app.forward();
    assert.equal(toggleFor(app, summaryID).getAttribute('aria-expanded'), 'true', 'history preserves expansion');
    app.resize(1000);
    assert.equal(toggleFor(app, summaryID).hidden, true, 'no expand button when the whole text fits');
    assert(!app.$(summaryID).classList.contains('is-collapsed'));
    app.resize(30);
    assert.equal(toggleFor(app, summaryID).hidden, false);
    assert.equal(toggleFor(app, summaryID).getAttribute('aria-expanded'), 'true', 'resize preserves an explicit expansion');
    toggleFor(app, summaryID).fire('click');
    app.resize(1000); app.resize(30);
    assert.equal(toggleFor(app, summaryID).getAttribute('aria-expanded'), 'false');
    assert(app.$(summaryID).classList.contains('is-collapsed'));
    assert.equal(app.logs.length, 0, app.logs.join('\n'));
  }
  const shortFixture = structuredClone(readingFixture);
  shortFixture.papers = [shortFixture.papers[0]];
  shortFixture.papers[0].summaries.en.text = 'A short summary.';
  shortFixture.papers[0].original_abstract.text = 'A short abstract.';
  app = await boot('https://example.test/Awesome-CTR-Scaling/', false, shortFixture);
  assert(app.walk(app.$('papers')).filter(node => node.className === 'reading-toggle').every(node => node.hidden));
  assert(!app.$(readingID + '-summary').classList.contains('is-collapsed'));
  assert(!app.$(readingID + '-abstract').classList.contains('is-collapsed'));
  // Back to top remains independent of filters/hash and works repeatedly, with motion preferences.
  for (const reducedMotion of [false, true]) {
    app = await boot('https://example.test/Awesome-CTR-Scaling/zh.html?q=Meta#paper-2208-08489', false, catalog, { reducedMotion });
    assert.equal(app.$('back-to-top').hidden, true);
    const beforeURL = app.window.location.href;
    for (let repeat = 0; repeat < 3; repeat++) {
      app.scroll(300); assert.equal(app.$('back-to-top').hidden, true);
      app.scroll(1600); assert.equal(app.$('back-to-top').hidden, false);
      app.$('back-to-top').fire('click');
      assert.equal(app.scrollCalls.at(-1).top, 0);
      assert.equal(app.scrollCalls.at(-1).behavior, reducedMotion ? 'auto' : 'smooth');
      assert.equal(app.active(), app.$('hero-title'));
      assert.equal(app.$('hero-title').focusOptions.preventScroll, true);
      assert.equal(app.$('back-to-top').hidden, true);
      assert.equal(app.window.location.href, beforeURL);
    }
  }
  app = await boot('https://example.test/Awesome-CTR-Scaling/', true);
  app.scroll(1600); app.$('back-to-top').fire('click');
  assert.equal(app.scrollCalls.at(-1).top, 0, 'back to top also works if catalog loading fails');
  const css = fs.readFileSync(path.join(ROOT, 'web/styles.css'), 'utf8');
  assert(![...css.matchAll(/font-size:\s*([\d.]+)px/g)].some(match => Number(match[1]) < 14), 'labels and metadata must stay at least 14px');
  assert.match(css, /\.paper-card\s*\{[^}]*grid-template-columns:\s*var\(--year-column\) minmax\(0, 1fr\) var\(--metadata-column\)/);
  assert.match(css, /\.reading-preview\.is-collapsed\s*\{[^}]*-webkit-line-clamp:\s*4;[^}]*overflow:\s*hidden;/);
  for (const className of ['summary-text', 'abstract-text']) {
    const rules = [...css.matchAll(new RegExp('\\.' + className + '\\s*\\{([^}]+)\\}', 'g'))];
    const fontSizes = rules.flatMap(rule => [...rule[1].matchAll(/font-size:\s*([^;]+);/g)].map(match => match[1]));
    assert.deepEqual(fontSizes, ['18px'], 'readable type must not shrink on mobile');
  }
  for (const [file, label] of [['index.html', 'Back to top'], ['zh.html', '回到顶部']]) {
    const html = fs.readFileSync(path.join(ROOT, 'web', file), 'utf8');
    assert.match(html, new RegExp('id="back-to-top"[^>]*type="button"[^>]*aria-label="' + label + '"[^>]*hidden'));
    assert.match(html, /id="hero-title" tabindex="-1"/);
  }
  console.log('PASS: frontend unit flows: pagination, search/aliases/ID, collection/year/tag/company, combined filters, empty/reset, sort, history, deep links, pending input, mobile toggle, fetch failure, bilingual routes/search/state, provenance, removed-annotation guards, explicit gaps, safe source formatting, measured reading previews, repeated expand/collapse, resize, retained expansion, back to top, reduced motion, technical grid structure, complete metadata, category/tag/chip clicks, clicked permalinks and language round trips');
})().catch(error => { console.error(error); process.exitCode = 1; });
