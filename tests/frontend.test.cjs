/* Minimal in-memory DOM harness. These are unit tests, not browser/layout tests. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'site/catalog.json'), 'utf8'));
const source = fs.readFileSync(path.join(ROOT, 'web/app.js'), 'utf8');
const template = fs.readFileSync(path.join(ROOT, 'web/index.html'), 'utf8');

async function boot(initialURL = 'https://example.test/Awesome-CTR-Scaling/', failFetch = false) {
  const roots = new Map(), inputs = [], events = {}, timers = new Map(), logs = [];
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
    get firstElementChild() { return this.children[0] || null; }
    append(...nodes) { for (const node of nodes) this.children.push(...(node.fragment ? node.children : [node])); }
    replaceChildren(...nodes) { this.children = []; this._text = ''; this.append(...nodes); }
    setAttribute(name, value) { this.attrs[name] = String(value); }
    getAttribute(name) { return this.attrs[name] ?? null; }
    addEventListener(type, handler) { (this.listeners[type] ||= []).push(handler); }
    fire(type, extra = {}) { for (const handler of this.listeners[type] || []) handler({ target: this, button: 0, preventDefault() {}, ...extra }); }
    focus() { document.activeElement = this; }
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
  const window = { location: new URL(initialURL), addEventListener: (type, handler) => { (events[type] ||= []).push(handler); } };
  const history = [window.location.href]; let historyIndex = 0;
  window.history = {
    pushState(_, __, url) { window.location = new URL(url, window.location); history.splice(++historyIndex); history.push(window.location.href); },
    replaceState(_, __, url) { window.location = new URL(url, window.location); history[historyIndex] = window.location.href; }
  };
  const context = vm.createContext({ document, window, URL, URLSearchParams,
    fetch: async () => ({ ok: !failFetch, json: async () => structuredClone(catalog) }),
    console: { error: (...args) => logs.push(args.join(' ')) },
    setTimeout: fn => { timers.set(++timerID, fn); return timerID; },
    clearTimeout: id => timers.delete(id), requestAnimationFrame: fn => fn()
  });
  vm.runInContext(source, context);
  await new Promise(resolve => setImmediate(resolve));
  const $ = id => document.getElementById(id);
  return { $, inputs, window, logs,
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
  console.log('PASS: frontend unit flows: pagination, search/aliases/ID, collection/year/tag/company, combined filters, empty/reset, sort, history, deep links, pending input, mobile toggle and fetch failure');
})().catch(error => { console.error(error); process.exitCode = 1; });
