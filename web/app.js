/* Dependency-free research catalog. Content is rendered as text, never HTML. */
(() => {
  'use strict';

  const PAGE_SIZE = 30;
  const FILTER_KEYS = ['q', 'collection', 'category', 'year', 'tag', 'company', 'sort'];
  const DEFAULTS = { q: '', collection: 'all', category: '', year: '', tag: '', company: '', sort: 'newest' };
  const $ = (id) => document.getElementById(id);
  const ui = {
    search: $('search-input'), sort: $('sort-select'), year: $('year-filter'),
    tag: $('tag-filter'), company: $('company-filter'), categories: $('category-options'),
    papers: $('papers'), active: $('active-filters'), status: $('results-status'),
    pagination: $('pagination'), showing: $('showing-count'), more: $('load-more'),
    filterToggle: $('filter-toggle'), sidebar: $('filter-panel')
  };
  let catalog, papers = [], categories = [], companies = [], filtered = [];
  let state = { ...DEFAULTS }, visibleCount = PAGE_SIZE, searchTimer;
  let initialSearchEntry = true;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function safeURL(value) {
    try {
      if (typeof value !== 'string' || !value.trim()) return null;
      const url = new URL(value, window.location.href);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch (_) { return null; }
  }

  function arxivID(paper) {
    const direct = String(paper.id || '').match(/\d{4}\.\d{4,5}/);
    if (direct) return direct[0];
    for (const link of paper.links || []) {
      const match = String(link.url || '').match(/arxiv\.org\/(?:abs|pdf)\/(\d{4}\.\d{4,5})/);
      if (match) return match[1];
    }
    return String(paper.id || '').replace(/^paper-/, '');
  }

  function anchorFor(paper) {
    return 'paper-' + arxivID(paper).replace(/\./g, '-').replace(/[^a-zA-Z0-9_-]/g, '-');
  }

  function companyLabel(id) {
    return companies.find((company) => company.id === id || company.name === id)?.name || id;
  }

  function categoryLabel(id) {
    return categories.find((category) => category.id === id)?.title || id;
  }

  function companyMatches(paper, value) {
    const company = companies.find((item) => item.id === value || item.name === value);
    return paper.companies.some((id) => id === value || (company && (id === company.id || id === company.name)));
  }

  function readURL() {
    const params = new URLSearchParams(window.location.search);
    const next = { ...DEFAULTS };
    for (const key of FILTER_KEYS) if (params.has(key)) next[key] = params.get(key) || DEFAULTS[key];
    if (!['all', 'core', 'related'].includes(next.collection)) next.collection = 'all';
    if (!['newest', 'title', 'original'].includes(next.sort)) next.sort = 'newest';
    // Keep valid filter values, even when a combination has no results.
    if (!categories.some((c) => c.id === next.category)) next.category = '';
    if (!papers.some((p) => String(p.year) === next.year)) next.year = '';
    if (!papers.some((p) => p.tags.includes(next.tag))) next.tag = '';
    if (!companies.some((c) => c.id === next.company || c.name === next.company)) next.company = '';
    return next;
  }

  function writeURL(mode = 'push') {
    const url = new URL(window.location.href);
    for (const key of FILTER_KEYS) {
      if (state[key] && state[key] !== DEFAULTS[key]) url.searchParams.set(key, state[key]);
      else url.searchParams.delete(key);
    }
    // A paper anchor belongs to the old result set after filters change.
    url.hash = '';
    if (url.href !== window.location.href) window.history[mode === 'replace' ? 'replaceState' : 'pushState']({}, '', url);
  }

  function syncControls() {
    ui.search.value = state.q;
    ui.sort.value = state.sort;
    ui.year.value = state.year;
    ui.tag.value = state.tag;
    ui.company.value = state.company;
    document.querySelectorAll('input[name="collection"]').forEach((input) => { input.checked = input.value === state.collection; });
    ui.tag.disabled = state.collection === 'related' && !papers.some((paper) => paper.collection === 'related' && paper.tags.length);
    $('tag-help').textContent = 'Tags are curated for core papers.';
  }

  function update(patch, options = {}) {
    clearTimeout(searchTimer);
    state = { ...state, q: ui.search.value, ...patch };
    if (Object.hasOwn(patch, 'collection')) {
      if (state.category && !categories.some((c) => c.id === state.category && (state.collection === 'all' || c.collection === state.collection))) state.category = '';
      if (state.collection === 'related' && !papers.some((paper) => paper.collection === 'related' && paper.tags.length)) state.tag = '';
    }
    if (Object.hasOwn(patch, 'category') && state.category) {
      const category = categories.find((c) => c.id === state.category);
      if (category && state.collection !== 'all' && category.collection !== state.collection) state.collection = category.collection;
    }
    visibleCount = PAGE_SIZE;
    if (options.url !== false) writeURL(options.replace ? 'replace' : 'push');
    syncControls();
    render();
  }

  function selectOptions(select, values, firstLabel) {
    select.replaceChildren(element('option', '', firstLabel));
    select.firstElementChild.value = '';
    values.forEach(({ value, label }) => {
      const option = element('option', '', label);
      option.value = value;
      select.append(option);
    });
  }

  function initializeControls() {
    const years = [...new Set(papers.map((p) => String(p.year)).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
    const tags = [...new Set(papers.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b));
    selectOptions(ui.year, years.map((year) => ({ value: year, label: year })), 'All years');
    selectOptions(ui.tag, tags.map((tag) => ({ value: tag, label: tag })), 'All tags');
    selectOptions(ui.company, [...companies].sort((a, b) => a.name.localeCompare(b.name)).map((company) => ({ value: company.id, label: `${company.name} (${company.count})` })), 'All companies');
    ui.search.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        update({ q: ui.search.value }, { replace: !initialSearchEntry });
        initialSearchEntry = false;
      }, 180);
    });
    ui.search.addEventListener('blur', () => { initialSearchEntry = true; });
    $('search-form').addEventListener('submit', (event) => {
      event.preventDefault();
      update({ q: ui.search.value }, { replace: !initialSearchEntry });
      initialSearchEntry = false;
    });
    [['sort', ui.sort], ['year', ui.year], ['tag', ui.tag], ['company', ui.company]].forEach(([key, node]) => {
      node.addEventListener('change', () => update({ [key]: node.value }));
    });
    document.querySelectorAll('input[name="collection"]').forEach((input) => input.addEventListener('change', () => update({ collection: input.value })));
    $('reset-sidebar').addEventListener('click', clearFilters);
    ui.more.addEventListener('click', () => {
      const firstNew = visibleCount;
      visibleCount += PAGE_SIZE;
      renderPapers();
      const firstCard = ui.papers.children[firstNew];
      if (firstCard) firstCard.focus({ preventScroll: true });
    });
    ui.filterToggle.addEventListener('click', () => {
      const isOpen = ui.filterToggle.getAttribute('aria-expanded') !== 'true';
      ui.filterToggle.setAttribute('aria-expanded', String(isOpen));
      ui.sidebar.classList.toggle('is-open', isOpen);
    });
    document.addEventListener('keydown', (event) => {
      const target = event.target;
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !target.closest('input, textarea, select, [contenteditable="true"]')) {
        event.preventDefault();
        ui.search.focus();
      }
      if (event.key === 'Escape' && ui.sidebar.classList.contains('is-open') && ui.sidebar.contains(target)) {
        ui.sidebar.classList.remove('is-open');
        ui.filterToggle.setAttribute('aria-expanded', 'false');
        ui.filterToggle.focus();
      }
    });
    window.addEventListener('popstate', () => {
      clearTimeout(searchTimer);
      initialSearchEntry = true;
      state = readURL();
      visibleCount = PAGE_SIZE;
      syncControls();
      render();
      revealHash();
    });
    window.addEventListener('hashchange', revealHash);
  }

  function clearFilters() {
    initialSearchEntry = true;
    update({ ...DEFAULTS });
  }

  function renderCategories() {
    ui.categories.replaceChildren();
    function addCategory(id, title, count) {
      const button = element('button', 'category-button');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(state.category === id));
      button.append(element('span', '', title), element('span', 'category-count', count));
      button.addEventListener('click', () => {
        update({ category: id });
        // The selected button is recreated; restore keyboard focus to it.
        const selected = ui.categories.querySelector('[aria-pressed="true"]');
        if (selected) selected.focus({ preventScroll: true });
      });
      ui.categories.append(button);
    }
    const inCollection = papers.filter((paper) => state.collection === 'all' || paper.collection === state.collection);
    addCategory('', 'All research areas', inCollection.length);
    const shownCategories = categories.filter((category) => state.collection === 'all' || category.collection === state.collection);
    let lastCollection;
    for (const category of shownCategories) {
      if (state.collection === 'all' && lastCollection !== category.collection) {
        ui.categories.append(element('p', 'category-group', category.collection === 'core' ? 'Core research' : 'Related work'));
        lastCollection = category.collection;
      }
      addCategory(category.id, category.title, inCollection.filter((paper) => paper.category === category.id).length);
    }
  }

  function matches(paper) {
    if (state.collection !== 'all' && paper.collection !== state.collection) return false;
    if (state.category && paper.category !== state.category) return false;
    if (state.year && String(paper.year) !== state.year) return false;
    if (state.tag && !paper.tags.includes(state.tag)) return false;
    if (state.company && !companyMatches(paper, state.company)) return false;
    const words = state.q.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return words.every((word) => paper.searchText.includes(word));
  }

  function renderActiveFilters() {
    ui.active.replaceChildren();
    const labels = {
      q: state.q ? `Search: ${state.q}` : '',
      collection: state.collection !== 'all' ? (state.collection === 'core' ? 'Core papers' : 'Related work') : '',
      category: state.category ? categoryLabel(state.category) : '',
      year: state.year,
      tag: state.tag,
      company: state.company ? companyLabel(state.company) : ''
    };
    Object.entries(labels).forEach(([key, label]) => {
      if (!label) return;
      const button = element('button', 'active-chip');
      button.type = 'button';
      button.setAttribute('aria-label', `Remove filter: ${label}`);
      const close = element('span', 'chip-close', '×');
      close.setAttribute('aria-hidden', 'true');
      button.append(element('span', '', label), close);
      button.addEventListener('click', () => {
        update({ [key]: DEFAULTS[key] });
        if (ui.active.firstElementChild) ui.active.firstElementChild.focus();
        else ui.search.focus({ preventScroll: true });
      });
      ui.active.append(button);
    });
    const count = ui.active.children.length;
    ui.active.hidden = count === 0;
    $('mobile-filter-count').hidden = count === 0;
    $('mobile-filter-count').textContent = count;
    if (count > 1) {
      const clear = element('button', 'text-button clear-all', 'Clear all');
      clear.type = 'button';
      clear.addEventListener('click', () => { clearFilters(); ui.search.focus({ preventScroll: true }); });
      ui.active.append(clear);
    }
  }

  function createLink(label, url, className) {
    const link = element('a', className, label);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }

  function paperCard(paper) {
    const card = element('article', 'paper-card');
    card.id = anchorFor(paper);
    card.tabIndex = -1;
    const titleID = `${card.id}-title`;
    card.setAttribute('aria-labelledby', titleID);
    const eyebrow = element('div', 'paper-eyebrow');
    eyebrow.append(element('span', 'paper-area', categoryLabel(paper.category)));
    eyebrow.append(element('span', 'paper-collection', paper.collection === 'core' ? 'Core paper' : 'Related work'));
    if (paper.year) eyebrow.append(element('span', 'paper-year', paper.year));
    card.append(eyebrow);
    const title = element('h3', 'paper-title');
    title.id = titleID;
    const links = paper.links.map((link) => ({ ...link, url: safeURL(link.url) })).filter((link) => link.url);
    const primaryLink = links.find((link) => /paper|arxiv/i.test(link.label)) || links[0];
    if (primaryLink) title.append(createLink(paper.title, primaryLink.url, ''));
    else title.textContent = paper.title;
    card.append(title);
    if (paper.affiliation || paper.venue) {
      const meta = element('div', 'paper-meta');
      if (paper.affiliation) meta.append(element('span', 'paper-affiliation', paper.affiliation));
      if (paper.affiliation && paper.venue) {
        const divider = element('span', 'meta-divider');
        divider.setAttribute('aria-hidden', 'true');
        meta.append(divider);
      }
      if (paper.venue) meta.append(element('span', 'paper-venue', paper.venue));
      card.append(meta);
    }
    if (paper.contribution) card.append(element('p', 'paper-contribution', paper.contribution));
    const bottom = element('div', 'paper-bottom');
    const tags = element('div', 'paper-tags');
    if (paper.tags.length) {
      tags.setAttribute('aria-label', 'Research tags');
      paper.tags.forEach((tag) => {
        const button = element('button', 'tag-button', tag);
        button.type = 'button';
        button.setAttribute('aria-label', `Filter by tag: ${tag}`);
        button.addEventListener('click', () => {
          update({ tag });
          $('research').focus({ preventScroll: true });
          $('research').scrollIntoView({ behavior: 'auto', block: 'start' });
        });
        tags.append(button);
      });
    }
    const actions = element('div', 'paper-links');
    links.forEach(({ label, url }) => {
      const link = createLink(String(label || 'Paper').replace(/^\[|\]$/g, ''), url, 'paper-link');
      const arrow = element('span', 'external-arrow', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      link.append(arrow);
      actions.append(link);
    });
    const permalink = element('a', 'permalink', '#');
    // Use a clean URL so the link always resolves regardless of current filters.
    const linkURL = new URL(window.location.pathname, window.location.origin);
    linkURL.hash = card.id;
    permalink.href = linkURL.pathname + linkURL.hash;
    permalink.setAttribute('aria-label', `Permanent link to ${paper.title}`);
    permalink.title = 'Permanent link to this paper';
    permalink.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      window.history.pushState({}, '', permalink.href);
      state = { ...DEFAULTS };
      visibleCount = PAGE_SIZE;
      syncControls();
      render();
      revealHash();
    });
    actions.append(permalink);
    bottom.append(tags, actions);
    card.append(bottom);
    return card;
  }

  function renderEmpty() {
    const empty = element('div', 'empty-state');
    const symbol = element('div', 'empty-symbol', '∅');
    symbol.setAttribute('aria-hidden', 'true');
    empty.append(symbol, element('h3', '', 'A little too specific?'), element('p', '', 'No papers match these filters. Try a broader search or clear a filter to keep exploring.'));
    const clear = element('button', 'button button-primary', 'Clear all filters');
    clear.type = 'button';
    clear.addEventListener('click', () => { clearFilters(); ui.search.focus({ preventScroll: true }); });
    empty.append(clear);
    ui.papers.append(empty);
  }

  function renderPapers() {
    const shown = filtered.slice(0, visibleCount);
    ui.papers.replaceChildren();
    if (!shown.length) renderEmpty();
    else {
      const fragment = document.createDocumentFragment();
      shown.forEach((paper) => fragment.append(paperCard(paper)));
      ui.papers.append(fragment);
    }
    ui.papers.setAttribute('aria-busy', 'false');
    ui.pagination.hidden = filtered.length === 0;
    ui.more.hidden = shown.length >= filtered.length;
    ui.showing.textContent = `Showing ${shown.length} of ${filtered.length} papers`;
    ui.status.textContent = `${filtered.length} ${filtered.length === 1 ? 'paper matches' : 'papers match'}. Showing ${shown.length}.`;
  }

  function render() {
    filtered = papers.filter(matches);
    if (state.sort === 'title') filtered.sort((a, b) => a.title.localeCompare(b.title));
    else if (state.sort === 'original') filtered.sort((a, b) => a.order - b.order);
    else filtered.sort((a, b) => Number(b.year || 0) - Number(a.year || 0) || arxivID(b).localeCompare(arxivID(a), undefined, { numeric: true }) || a.order - b.order);
    $('result-count').textContent = filtered.length;
    $('results-kicker').textContent = state.collection === 'core' ? 'CORE RESEARCH' : state.collection === 'related' ? 'RELATED WORK' : 'THE COLLECTION';
    const category = categories.find((item) => item.id === state.category);
    $('category-description').textContent = category?.description || '';
    $('category-description').hidden = !category?.description;
    renderCategories();
    renderActiveFilters();
    renderPapers();
  }

  function revealHash() {
    if (!window.location.hash.startsWith('#paper-')) return;
    let hash;
    try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch (_) { return; }
    const paper = papers.find((item) => anchorFor(item) === hash);
    if (!paper) return;
    let index = filtered.findIndex((item) => item.id === paper.id);
    if (index === -1) {
      state = { ...DEFAULTS };
      const url = new URL(window.location.href);
      FILTER_KEYS.forEach((key) => url.searchParams.delete(key));
      window.history.replaceState({}, '', url);
      syncControls();
      render();
      index = filtered.findIndex((item) => item.id === paper.id);
    }
    if (index >= visibleCount) {
      visibleCount = Math.ceil((index + 1) / PAGE_SIZE) * PAGE_SIZE;
      renderPapers();
    }
    requestAnimationFrame(() => {
      const target = $(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        target.focus({ preventScroll: true });
      }
    });
  }

  function showError() {
    ui.papers.replaceChildren();
    ui.papers.setAttribute('aria-busy', 'false');
    const empty = element('div', 'empty-state');
    empty.append(element('h3', '', 'The library couldn’t be loaded'), element('p', '', 'Please try again, or browse the complete reading list on GitHub.'));
    const button = element('button', 'button button-secondary', 'Try again');
    button.type = 'button';
    button.addEventListener('click', () => window.location.reload());
    const link = element('a', 'paper-link', 'Read on GitHub ↗');
    link.href = 'https://github.com/byby221b/Awesome-CTR-Scaling';
    const actions = element('div', 'paper-links');
    actions.style.justifyContent = 'center';
    actions.append(button, link);
    empty.append(actions);
    ui.papers.append(empty);
    ui.status.textContent = 'The catalog could not be loaded. Please retry or use the repository README.';
    $('result-count').textContent = '—';
  }

  async function start() {
    try {
      const response = await fetch('./catalog.json');
      if (!response.ok) throw new Error('Catalog request failed');
      catalog = await response.json();
      if (!Array.isArray(catalog.papers) || !Array.isArray(catalog.categories)) throw new Error('Invalid catalog');
      categories = catalog.categories;
      companies = Array.isArray(catalog.companies) ? catalog.companies : [];
      papers = catalog.papers.map((paper, index) => {
        const normalized = { ...paper, year: paper.year || '', tags: Array.isArray(paper.tags) ? paper.tags : [], companies: Array.isArray(paper.companies) ? paper.companies : [], links: Array.isArray(paper.links) ? paper.links : [], order: Number.isFinite(paper.order) ? paper.order : index };
        normalized.searchText = [paper.id, paper.title, ...(Array.isArray(paper.aliases) ? paper.aliases : []), paper.doi, paper.contribution, paper.affiliation, paper.venue, paper.year, categoryLabel(paper.category), ...normalized.tags, ...normalized.companies.map(companyLabel), ...normalized.links.map((link) => link.url)].filter(Boolean).join(' ').toLocaleLowerCase();
        return normalized;
      });
      const coreCount = papers.filter((paper) => paper.collection === 'core').length;
      const relatedCount = papers.filter((paper) => paper.collection === 'related').length;
      [['total-stat', papers.length], ['all-count', papers.length], ['core-stat', coreCount], ['core-count', coreCount], ['related-stat', relatedCount], ['related-count', relatedCount]].forEach(([id, value]) => { $(id).textContent = value; });
      if (catalog.meta?.updated) {
        const rawDate = String(catalog.meta.updated);
        const date = new Date(rawDate.length === 10 ? rawDate + 'T00:00:00Z' : rawDate);
        if (!Number.isNaN(date.getTime())) {
          $('updated-at').dateTime = rawDate;
          $('updated-at').textContent = date.toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
        } else $('updated-at').textContent = rawDate;
      }
      initializeControls();
      state = readURL();
      syncControls();
      render();
      revealHash();
    } catch (error) {
      console.error('Unable to load research catalog:', error);
      showError();
    }
  }

  start();
})();
