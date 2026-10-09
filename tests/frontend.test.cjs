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
  const TestDate = options.now === undefined ? Date : class extends Date {
    constructor(...args) { super(...(args.length ? args : [options.now])); }
    static now() { return options.now; }
  };
  const context = vm.createContext({ document, window, URL, URLSearchParams, Date: TestDate,
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
  // Acronym lookup must not be buried among test/best/interest substring hits.
  for (const route of ['', 'zh.html']) {
    const searchApp = await boot('https://example.test/Awesome-CTR-Scaling/' + route + '?q=EST');
    assert.equal(searchApp.$('sort-select').value, 'relevance');
    for (const query of ['EST', 'est', '  eSt  ', 'ＥＳＴ', 'EST KDD', 'EST(KDD)', '2602.10811']) {
      searchApp.search(query);
      assert(Number(searchApp.$('result-count').textContent) >= 1, query);
      assert.equal(searchApp.cards()[0].id, 'paper-2602-10811', query);
    }
    searchApp.search('EST');
    searchApp.change('company-filter', 'meta');
    assert(!searchApp.cards().some(card => card.id === 'paper-2602-10811'), 'search keeps an incompatible company filter');
    searchApp.change('company-filter', 'alibaba');
    assert.equal(searchApp.cards()[0].id, 'paper-2602-10811');
    searchApp.inputs[2].fire('change');
    assert(!searchApp.cards().some(card => card.id === 'paper-2602-10811'), 'search keeps an incompatible collection filter');
  }
  const searchFixture = structuredClone(catalog);
  const searchPaper = (id, title, order, extra = {}) => ({
    ...structuredClone(catalog.papers[0]), id, title, order, year: 2026, aliases: [],
    links: [{label: 'Paper', url: 'https://arxiv.org/abs/' + id}],
    summaries: {}, ...extra,
    original_abstract: {...structuredClone(catalog.papers[0].original_abstract), text: 'Unrelated scientific content.', source_title: title, ...(extra.original_abstract || {})}
  });
  searchFixture.papers = [
    searchPaper('2601.00001', 'Exact Sequence Transformer', 0, {year: 2025, aliases: ['EST']}),
    searchPaper('2609.00002', 'A newer paper', 1, {original_abstract: {status: 'verified', text: 'We compare EST in this work.'}}),
    searchPaper('2608.00003', 'EST: A title match', 2),
    searchPaper('2607.00004', 'Interest, best, test, estimation', 3),
    searchPaper('2606.00005', 'Alias-only result', 4, {aliases: ['HeMix'], original_abstract: {status: 'verified', source_title: 'Original Source Name: Efficient Mixture', text: 'Hiddenfulltexttoken is searchable.'}}),
    searchPaper('2605.00006', 'Chinese-only text', 5, {summaries: {zh: {basis: 'original_abstract', text: '目标感知压缩保留长期兴趣'}}}),
    searchPaper('2604.00007', 'EST: Another title match', 6)
  ];
  const searchApp = await boot('https://example.test/Awesome-CTR-Scaling/?q=EST', false, searchFixture);
  assert.deepEqual(searchApp.cards().map(card => card.id), ['paper-2601-00001', 'paper-2608-00003', 'paper-2604-00007', 'paper-2609-00002'], 'exact alias, title, then full-text; deterministic newest ties');
  searchApp.change('sort-select', 'newest');
  assert.equal(searchApp.cards()[0].id, 'paper-2609-00002', 'explicit newest takes priority over relevance');
  assert(searchApp.window.location.search.includes('sort=newest'));
  assert(searchApp.$('language-switch').href.includes('sort=newest'), 'explicit sort survives language switch');
  searchApp.back();
  assert.equal(searchApp.$('sort-select').value, 'relevance');
  assert.equal(searchApp.cards()[0].id, 'paper-2601-00001');
  searchApp.forward();
  assert.equal(searchApp.cards()[0].id, 'paper-2609-00002');
  searchApp.change('sort-select', 'original');
  assert.equal(searchApp.cards()[0].id, 'paper-2601-00001');
  searchApp.change('sort-select', 'title');
  assert.equal(searchApp.cards()[0].id, 'paper-2609-00002');
  searchApp.change('sort-select', 'relevance');
  for (const [query, id] of [['Exact  Sequence\tTransformer', '2601.00001'], ['HeMix', '2606.00005'], ['Original Source Name', '2606.00005'], ['fulltexttoken', '2606.00005'], ['感知压缩保留', '2605.00006'], ['interest', '2607.00004']]) {
    searchApp.search(query);
    assert.equal(searchApp.cards()[0].id, 'paper-' + id.replace('.', '-'), query);
  }
  searchApp.search('   ');
  assert.equal(searchApp.$('result-count').textContent, String(searchFixture.papers.length));
  assert.equal(searchApp.cards()[0].id, 'paper-2609-00002', 'empty search falls back to newest');
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
  // Recent activity is a catalog timeline, with explicit source dates and Shanghai calendar boundaries.
  const activity = structuredClone(catalog);
  activity.papers = activity.papers.slice(0, 8);
  const now = Date.parse('2026-10-02T12:00:00Z');
  const addedDates = ['2026-10-02T10:00:00Z','2026-09-25T16:00:00Z','2026-09-25T15:59:59Z','2026-10-02T12:00:01Z',null,'2026-08-01T00:00:00Z','2026-10-01T18:00:00Z',null];
  const makeEvent = (kind, at, fields) => ({kind,at,fields,source_url:'https://example.test/evidence'});
  activity.papers.forEach((paper, i) => { paper.added_at=addedDates[i]; paper.change_history=[]; });
  activity.papers[0].change_history=[makeEvent('venue_update','2026-10-02T11:00:00Z',['venue'])];
  activity.papers[1].change_history=[makeEvent('venue_update','2026-09-25T16:00:00Z',['venue'])];
  activity.papers[2].change_history=[makeEvent('venue_update','2026-09-25T15:59:59Z',['venue'])];
  activity.papers[3].change_history=[makeEvent('venue_update','2026-10-02T12:00:01Z',['venue'])];
  activity.papers[4].change_history=[makeEvent('metadata_enrichment','2026-10-02T11:30:00Z',['original_abstract','summaries'])];
  activity.papers[5].change_history=[makeEvent('paper_revision','2026-10-01T00:00:00Z',['source_dates'])];
  activity.papers[6].change_history=[makeEvent('metadata_enrichment','2026-10-02T11:00:00Z',['affiliation'])];
  const ids = indices => indices.map(i => 'paper-' + activity.papers[i].id.replace('.', '-')).sort();
  const resultIDs = app => app.cards().map(card=>card.id).sort();
  for (const route of ['', 'zh.html']) {
    const base = 'https://example.test/Awesome-CTR-Scaling/' + route;
    app = await boot(base, false, activity, {now});
    app.$('recent-added').fire('click');
    assert.deepEqual(resultIDs(app), ids([0,1,6]), '7 Shanghai days include midnight boundary, exclude future/unknown');
    assert.equal(app.cards()[0].id, ids([0])[0]);
    assert.equal(app.$('recent-added').getAttribute('aria-pressed'),'true');
    assert.equal(app.$('sort-select').value,'added');
    assert.equal(app.$('change-kind').hidden,true);
    assert(app.$('recent-note').textContent.includes('Asia/Shanghai'));
    app.change('recent-window','30'); assert.deepEqual(resultIDs(app),ids([0,1,2,6]));
    app.change('recent-window','all'); assert.deepEqual(resultIDs(app),ids([0,1,2,5,6]));
    app.change('recent-window','7');
    app.$('recent-updated').fire('click');
    assert.deepEqual(resultIDs(app),ids([0,1,5,6]), 'default updates exclude abstract/translation-only enrichment');
    assert.equal(app.$('change-kind').value,'substantive');
    assert.equal(app.$('change-kind').hidden,false);
    assert.equal(app.$('sort-select').value,'updated');
    app.change('change-kind','metadata_enrichment'); assert.deepEqual(resultIDs(app),ids([4,6]));
    app.change('change-kind','paper_revision'); assert.deepEqual(resultIDs(app),ids([5]));
    app.change('change-kind','venue_update'); assert.deepEqual(resultIDs(app),ids([0,1]));
    app.change('change-kind','all'); assert.deepEqual(resultIDs(app),ids([0,1,4,5,6]));
    app.change('sort-select','relevance');
    assert(new URL(app.window.location).searchParams.get('sort') === 'relevance', 'explicit relevance survives recent URL serialization');
    const saved = app.window.location.href;
    const languageURL = new URL(app.$('language-switch').href, app.window.location).href;
    const reopened = await boot(saved, false, activity, {now});
    const switched = await boot(languageURL, false, activity, {now});
    for (const restored of [reopened,switched]) {
      assert.equal(restored.$('sort-select').value,'relevance');
      assert.equal(restored.$('change-kind').value,'all');
      assert.deepEqual(resultIDs(restored),ids([0,1,4,5,6]));
    }
    app.change('recent-window','30');app.back();assert.equal(app.$('recent-window').value,'7');app.forward();assert.equal(app.$('recent-window').value,'30');
    app.change('sort-select','title');app.$('recent-added').fire('click');
    assert.equal(app.$('sort-select').value,'title','explicit sorting survives switching recent view');
    assert.equal(app.$('recent-window').value,'30','explicit window survives view switching');
    app.search(activity.papers[0].id); assert.deepEqual(resultIDs(app),ids([0]));
    assert(app.cards()[0].textContent.includes('2026-10-02'));
    assert(app.walk(app.cards()[0]).some(node=>node.classList.contains('source-dates')));
    app.search('qzx-no-results');assert.equal(app.cards().length,0);
    app.$('reset-sidebar').fire('click');assert.equal(app.cards().length,8);
    assert.equal(app.$('recent-all').getAttribute('aria-pressed'),'true');
    assert.equal(app.$('recent-options').hidden,true);
    assert.equal(app.$('recent-note').hidden,true);
    assert.equal(app.logs.length,0,app.logs.join('\n'));
  }
  const thirtyBoundary = structuredClone(activity);
  thirtyBoundary.papers = thirtyBoundary.papers.slice(0,2);
  thirtyBoundary.papers[0].added_at = '2026-09-02T16:00:00Z';
  thirtyBoundary.papers[1].added_at = '2026-09-02T15:59:59Z';
  for (const route of ['', 'zh.html']) {
    app = await boot('https://example.test/Awesome-CTR-Scaling/' + route + '?recent=added&days=30',false,thirtyBoundary,{now});
    assert.deepEqual(resultIDs(app),ids([0]), '30 Shanghai calendar days include exact midnight, exclude preceding second');
  }
  app = await boot('https://example.test/Awesome-CTR-Scaling/?recent=added',false,activity,{now:Date.parse('2026-10-02T17:00:00Z')});
  assert(!resultIDs(app).includes(ids([1])[0]), 'Shanghai day advances at UTC 16:00');
  app = await boot('https://example.test/Awesome-CTR-Scaling/?recent=invalid&days=8&kind=invalid&sort=bad',false,activity,{now});
  assert.equal(app.cards().length,8);assert.equal(app.$('recent-window').value,'7');assert.equal(app.$('sort-select').value,'relevance');
  app = await boot('https://example.test/Awesome-CTR-Scaling/?recent=updated&kind=paper_revision&days=all&sort=updated#' + ids([7])[0],false,activity,{now});
  assert.equal(app.$(ids([7])[0]).scrolled,true,'deep link to excluded record resets incompatible recent filters');
  assert.equal(app.$('recent-all').getAttribute('aria-pressed'),'true');
  app = await boot('https://example.test/Awesome-CTR-Scaling/?sort=added',false,activity,{now});
  assert.equal(app.cards()[0].id,ids([0])[0]);
  assert(resultIDs({cards:()=>app.cards().slice(-3)}).includes(ids([7])[0]),'unknown/future additions sort at the end');
  // Reading priority is an explicit, public tier, independent of search relevance and quality.
  const tierFixture = structuredClone(catalog);
  tierFixture.papers = [
    searchPaper('2610.00001', 'Reading candidate A', 0, {year: 2026, aliases: ['PriorityMatch']}),
    searchPaper('2601.00002', 'Reading candidate B', 1, {year: 2026, reading_tier: null}),
    searchPaper('2608.00003', 'Reading candidate C', 2, {year: 2026, reading_tier: 'as_needed'}),
    searchPaper('2501.00004', 'Reading candidate D', 3, {year: 2025, reading_tier: 'consider'}),
    searchPaper('2401.00005', 'Reading candidate E', 4, {year: 2024, reading_tier: 'prioritize'}),
    searchPaper('2411.00006', 'Reading candidate F', 5, {year: 2024, reading_tier: 'prioritize'}),
    searchPaper('2607.00007', 'Reading candidate G', 6, {year: 2026, reading_tier: '<script>invalid-enum-canary</script>'}),
    searchPaper('2606.00008', 'Reading candidate H', 7, {year: 2026, reading_tier: 'consider'}),
    searchPaper('2701.00009', 'Reading candidate I', 8, {year: 2027, reading_tier: {prioritize: true}})
  ];
  delete tierFixture.papers[0].reading_tier; // Exercise a genuinely absent field regardless of catalog data.
  tierFixture.papers.forEach((paper, index) => {
    paper.original_abstract.text = 'PriorityMatch shared searchable text.';
    paper.tags = ['Scaling Law']; paper.companies = ['meta'];
    paper.added_at = '2026-10-02T10:00:00Z'; paper.change_history = [];
    // Unexpected fields are neither visible nor part of the search index.
    paper.unknown_field_a = 'unknown-field-canary-a'; paper.unknown_field_b = 'unknown-field-canary-b';
    paper.unknown_field_c = 'unknown-field-canary-c'; paper.unknown_field_d = 'unknown-field-canary-d';
    if (index === 5) paper.companies = ['alibaba'];
  });
  const tierIDs = indices => indices.map(index => 'paper-' + tierFixture.papers[index].id.replace('.', '-'));
  const orderedIDs = app => app.cards().map(card => card.id);
  const tierOrder = [5, 4, 7, 3, 2, 8, 0, 6, 1];
  const unratedFixture = structuredClone(tierFixture);
  unratedFixture.papers.forEach(paper => { delete paper.reading_tier; });
  for (const route of ['', 'zh.html']) {
    const base = 'https://example.test/Awesome-CTR-Scaling/' + route;
    const zh = route === 'zh.html';
    const labels = zh ? ['优先读', '值得读', '按需读', '未分级'] : ['Read first', 'Worth reading', 'Read as needed', 'Unrated'];
    app = await boot(base, false, tierFixture, {now});
    const unassigned = await boot(base, false, unratedFixture, {now});
    assert.deepEqual(orderedIDs(app), orderedIDs(unassigned), 'tier assignments never change the default browsing order');
    assert.equal(app.$('sort-select').value, 'relevance');
    assert.equal(app.$('reading-sort-note').hidden, true);
    assert.equal(app.$('sort-select').getAttribute('aria-describedby'), '');
    assert.deepEqual(app.$('reading-tier-filter').children.map(option => option.value), ['', 'prioritize', 'consider', 'as_needed', 'unrated']);
    assert.deepEqual(app.$('reading-tier-filter').children.slice(1).map(option => option.textContent), labels);
    for (const [index, tierIndex] of [[0,3], [1,3], [2,2], [3,1], [4,0], [5,0], [6,3], [7,1], [8,3]]) {
      const badge = app.walk(app.$(tierIDs([index])[0])).find(node => node.classList.contains('reading-tier'));
      assert.equal(badge.textContent, labels[tierIndex]);
      assert.equal(badge.getAttribute('aria-describedby'), 'reading-tier-note');
      assert(badge.getAttribute('aria-label').endsWith(': ' + labels[tierIndex]));
      assert.equal(badge.classList.contains('reading-tier--unrated'), tierIndex === 3, 'unassigned and malformed values stay visibly neutral');
    }
    app.search('PriorityMatch'); unassigned.search('PriorityMatch');
    assert.deepEqual(orderedIDs(app), orderedIDs(unassigned), 'tiers never override default relevance');
    assert.equal(app.cards()[0].id, tierIDs([0])[0], 'exact alias still ranks first even when unrated');
    app.change('sort-select', 'reading_priority');
    assert.deepEqual(orderedIDs(app), tierIDs(tierOrder), 'explicit priority groups tiers with deterministic newest ties');
    assert.equal(app.$('reading-sort-note').hidden, false);
    assert.equal(app.$('sort-select').getAttribute('aria-describedby'), 'reading-sort-note');
    labels.forEach(label => assert(app.$('reading-sort-note').textContent.includes(label)));
    assert.equal(new URL(app.window.location).searchParams.get('sort'), 'reading_priority');
    for (const [tier, indices] of [['prioritize',[5,4]], ['consider',[7,3]], ['as_needed',[2]], ['unrated',[8,0,6,1]]]) {
      app.change('reading-tier-filter', tier);
      assert.deepEqual(orderedIDs(app), tierIDs(indices));
      assert.equal(new URL(app.window.location).searchParams.get('tier'), tier);
    }
    app.back(); assert.equal(app.$('reading-tier-filter').value, 'as_needed'); assert.deepEqual(orderedIDs(app),tierIDs([2]));
    app.forward(); assert.equal(app.$('reading-tier-filter').value, 'unrated'); assert.deepEqual(orderedIDs(app),tierIDs([8,0,6,1]));
    const savedURL = app.window.location.href;
    const languageURL = new URL(app.$('language-switch').href, app.window.location);
    assert.equal(languageURL.search, app.window.location.search);
    for (const restored of [await boot(savedURL, false, tierFixture, {now}), await boot(languageURL.href, false, tierFixture, {now})]) {
      assert.equal(restored.$('reading-tier-filter').value, 'unrated');
      assert.equal(restored.$('sort-select').value, 'reading_priority');
      assert.deepEqual(orderedIDs(restored), tierIDs([8,0,6,1]));
    }
    app.change('reading-tier-filter', 'prioritize');
    app.change('company-filter', 'meta'); app.change('tag-filter', 'Scaling Law'); app.change('year-filter', '2024');
    assert.deepEqual(orderedIDs(app), tierIDs([4]), 'tier composes with search, company, tag and year');
    app.inputs[2].fire('change'); assert.equal(app.cards().length, 0, 'incompatible collection does not drop priority');
    assert.equal(app.$('reading-tier-filter').value, 'prioritize');
    app.$('reset-sidebar').fire('click');
    assert.equal(app.$('reading-tier-filter').value, ''); assert.equal(app.$('sort-select').value, 'relevance');
    assert.equal(new URL(app.window.location).search, '');
    app.change('reading-tier-filter', 'consider');
    const tierChip = app.$('active-filters').children.find(node => node.className === 'active-chip' && node.textContent.includes(labels[1]));
    assert(tierChip); assert.equal(tierChip.type, 'button');
    assert(tierChip.getAttribute('aria-label').includes(labels[1]));
    assert.equal(app.$('mobile-filter-count').textContent, '1');
    app.$('filter-toggle').fire('click'); assert.equal(app.$('filter-toggle').getAttribute('aria-expanded'), 'true');
    tierChip.fire('click');
    assert.equal(app.$('reading-tier-filter').value, ''); assert.equal(app.$('mobile-filter-count').hidden, true);
    assert.equal(app.active(), app.$('search-input'), 'removing the final chip restores focus');
    app.$('filter-toggle').fire('click'); assert.equal(app.$('filter-toggle').getAttribute('aria-expanded'), 'false');
    app.change('sort-select', 'reading_priority'); app.change('reading-tier-filter', 'as_needed');
    app.$('recent-added').fire('click');
    assert.equal(app.$('sort-select').value, 'reading_priority', 'explicit tier order survives recent-view navigation');
    assert.deepEqual(orderedIDs(app), tierIDs([2]));
    app.$('reset-sidebar').fire('click');
    for (const token of ['invalid-enum-canary', 'unknown-field-canary-a', 'unknown-field-canary-b', 'unknown-field-canary-c', 'unknown-field-canary-d']) {
      assert(!app.$('papers').textContent.includes(token), 'unrecognized fields must not render');
      app.search(token); assert.equal(app.cards().length, 0, 'unrecognized fields must not be searchable');
      app.$('reset-sidebar').fire('click');
    }
    app.$('search-input').value = tierFixture.papers[4].id; app.$('search-input').fire('input');
    app.change('reading-tier-filter', 'prioritize'); app.flush();
    assert.deepEqual(orderedIDs(app), tierIDs([4]), 'pending search is preserved when changing tiers');
    assert.equal(app.logs.length,0,app.logs.join('\n'));
    app = await boot(base + '?tier=bad&sort=reading_priority', false, tierFixture, {now});
    assert.equal(app.$('reading-tier-filter').value, ''); assert.deepEqual(orderedIDs(app), tierIDs(tierOrder));
    app = await boot(base + '?tier=prioritize&sort=reading_priority#' + tierIDs([4])[0], false, tierFixture, {now});
    assert.equal(app.$('reading-tier-filter').value, 'prioritize');
    assert.equal(new URL(app.$('language-switch').href, app.window.location).hash, '#' + tierIDs([4])[0]);
    app = await boot(base + '?tier=prioritize&sort=reading_priority#' + tierIDs([0])[0], false, tierFixture, {now});
    assert.equal(app.$(tierIDs([0])[0]).scrolled, true, 'deep links reveal papers excluded by tier filters');
    assert.equal(app.$('reading-tier-filter').value, '');
    app = await boot(base + '?tier=prioritize&sort=reading_priority', false, unratedFixture, {now});
    assert.equal(app.cards().length, 0, 'valid tier filters remain selected even without rated papers');
    assert.equal(app.$('reading-tier-filter').value, 'prioritize');
    app.change('reading-tier-filter', 'unrated'); assert.equal(app.cards().length, tierFixture.papers.length);
    const html = fs.readFileSync(path.join(ROOT, 'web', route || 'index.html'), 'utf8');
    assert.match(html, /<label[^>]*for="reading-tier-filter">[^<]+<\/label><select id="reading-tier-filter" aria-describedby="reading-tier-note">/);
    assert.match(html, /<select id="sort-select" aria-describedby="reading-sort-note">.*<option value="reading_priority">/);
    assert(html.includes(zh ? '并非论文客观质量评价' : 'not objective paper quality'));
  }
  const pagedTiers = structuredClone(catalog);
  pagedTiers.papers.forEach((paper, index) => { paper.reading_tier = index % 2 ? 'prioritize' : null; });
  app = await boot('https://example.test/Awesome-CTR-Scaling/?tier=prioritize&sort=reading_priority', false, pagedTiers);
  assert.equal(app.cards().length, 30); app.$('load-more').fire('click'); assert.equal(app.cards().length, 60);
  assert(app.cards().every(card => app.walk(card).some(node => node.classList.contains('reading-tier--prioritize'))));
  app.change('reading-tier-filter', 'unrated'); assert.equal(app.cards().length, 30, 'tier changes reset pagination');
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
  console.log('PASS: frontend unit flows: pagination, search/aliases/ID, collection/year/tag/company, combined filters, empty/reset, sort, history, deep links, pending input, mobile toggle, fetch failure, bilingual routes/search/state, provenance, removed-annotation guards, explicit gaps, safe source formatting, measured reading previews, repeated expand/collapse, resize, retained expansion, back to top, reduced motion, technical grid structure, complete metadata, category/tag/chip clicks, clicked permalinks, language round trips, recent activity windows/types, immutable timeline display, UTC/Shanghai boundaries, unknown/future exclusions, explicit recent sort serialization, bilingual reading tiers, neutral unrated states, stable default ordering, explicit tier sorting/filtering, tier URL/history/language/recent/mobile flows, pagination and unknown-field guards');
})().catch(error => { console.error(error); process.exitCode = 1; });
