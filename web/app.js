/* Dependency-free research catalog. Content is rendered as text, never HTML. */
(() => {
  'use strict';

  const PAGE_SIZE = 30;
  const LANG = /(?:^|\/)zh(?:\.html|\/)?$/.test(window.location.pathname) ? 'zh' : 'en';
  const tr = (en, zh) => LANG === 'zh' ? zh : en;
  const CATEGORY_ZH = {
    'scaling-law-theory': ['规模规律与理论', '推荐模型的经验规模规律、扩展方法与理论边界。'],
    'scalable-architecture': ['可扩展架构', '面向工业排序规模化的 Transformer、Mixer 与稀疏架构。'],
    'unified-feature-sequence-modeling': ['统一特征与序列建模', '联合建模特征交互、用户历史与行为序列。'],
    'foundation-models-multi-scenario': ['基础模型与多场景', '共享基础模型、多任务学习与跨场景迁移。'],
    'efficiency-deployment': ['效率与部署', '让模型规模化落地的训练、推理和部署技术。'],
    'long-sequence-modeling': ['长序列建模', '面向用户行为序列的长历史建模、记忆与压缩。'],
    'sample-instance-compression-for-sequence-modeling': ['序列样本与实例压缩', '将完整交互和原始样本压缩为序列 token。'],
    'generative-recommendation': ['生成式推荐', '判别式 CTR 之外的生成式检索、推荐与排序。'],
    'generative-pre-training-for-ctr': ['CTR 生成式预训练', '服务于判别式 CTR 任务的生成式目标与预训练。'],
    'knowledge-distillation-compression': ['知识蒸馏与压缩', '通过知识迁移和压缩提高模型效率。'],
    'retrieval-reranking-scaling': ['检索与重排序扩展', '探索检索及重排序模型的规模化。'],
    'architecture-innovations-beyond-recommendation': ['推荐之外的架构创新', '可为推荐系统规模化提供启发的模型架构研究。'],
    'engineering-serving': ['工程与服务', '支撑大规模推荐的系统工程与在线服务。'],
    'other': ['其他相关研究', '与推荐系统规模化有关的其他研究。']
  };
  const TAG_ZH = {'Architecture':'模型架构','Attention':'注意力','Token Mixing':'Token 混合','Sparse Activation':'稀疏激活','Residual/Depth':'残差 / 深度','Embedding Design':'嵌入设计','Tokenization':'Token 化','Knowledge Distillation':'知识蒸馏','Test-time Compute':'推理时计算','Loop Scaling':'循环扩展','Long Sequence':'长序列','Unified FI+Seq':'统一特征交互与序列','Scaling Law':'规模规律','Transformer':'Transformer','Feature Interaction':'特征交互','Sequence Modeling':'序列建模','Sparse Model':'稀疏模型','MoE':'MoE','Multi-task':'多任务','Multi-scenario':'多场景','Foundation Model':'基础模型','User Modeling':'用户建模','Generative Rec':'生成式推荐','Serving':'在线服务','Training Efficiency':'训练效率','Distributed':'分布式','Quantization':'量化','Ads':'广告','E-commerce':'电商','Video/Live':'视频 / 直播','Representation Collapse':'表征坍塌'};
  const tagLabel = (tag) => LANG === 'zh' ? (TAG_ZH[tag] || tag) : tag;
  const READING_TIERS = ['prioritize', 'consider', 'as_needed', 'unrated'];
  const TIER_LABELS = { prioritize: ['Read first', '优先读'], consider: ['Worth reading', '值得读'], as_needed: ['Read as needed', '按需读'], unrated: ['Unrated', '未分级'] };
  const readingTier = value => typeof value === 'string' && READING_TIERS.includes(value) ? value : 'unrated';
  const tierLabel = value => tr(...TIER_LABELS[readingTier(value)]);
  const FILTER_KEYS = ['q', 'collection', 'category', 'year', 'tag', 'company', 'tier', 'sort', 'recent', 'days', 'kind'];
  const DEFAULTS = { q: '', collection: 'all', category: '', year: '', tag: '', company: '', tier: '', sort: 'relevance', recent: '', days: '7', kind: 'substantive' };
  const $ = (id) => document.getElementById(id);
  const ui = {
    recentWindow: $('recent-window'), changeKind: $('change-kind'), search: $('search-input'), sort: $('sort-select'), year: $('year-filter'),
    tag: $('tag-filter'), company: $('company-filter'), tier: $('reading-tier-filter'), categories: $('category-options'),
    papers: $('papers'), active: $('active-filters'), status: $('results-status'),
    pagination: $('pagination'), showing: $('showing-count'), more: $('load-more'),
    filterToggle: $('filter-toggle'), sidebar: $('filter-panel'), backToTop: $('back-to-top')
  };
  let catalog, papers = [], categories = [], companies = [], filtered = [];
  let state = { ...DEFAULTS }, visibleCount = PAGE_SIZE, searchTimer;
  let initialSearchEntry = true;
  let readingPreviews = [], readingLayoutPending = false;
  const expandedReadings = new Set();

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
    return (LANG === 'zh' && CATEGORY_ZH[id]?.[0]) || categories.find((category) => category.id === id)?.title || id;
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
    if (!['relevance', 'newest', 'title', 'original', 'added', 'updated', 'reading_priority'].includes(next.sort)) next.sort = DEFAULTS.sort;
    if (!READING_TIERS.includes(next.tier)) next.tier = '';
    if (!['', 'added', 'updated'].includes(next.recent)) next.recent = '';
    if (!['7', '30', 'all'].includes(next.days)) next.days = '7';
    if (!['all', 'substantive', 'paper_revision', 'venue_update', 'metadata_enrichment'].includes(next.kind) || next.recent !== 'updated') next.kind = 'substantive';
    if (next.recent && !params.has('sort')) next.sort = next.recent;
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
      if (state[key] && (state[key] !== DEFAULTS[key] || (key === 'sort' && state.recent))) url.searchParams.set(key, state[key]);
      else url.searchParams.delete(key);
    }
    // A paper anchor belongs to the old result set after filters change.
    url.hash = '';
    if (url.href !== window.location.href) window.history[mode === 'replace' ? 'replaceState' : 'pushState']({}, '', url);
  }

  function syncControls() {
    ui.search.value = state.q;
    ui.recentWindow.value = state.days;
    ui.changeKind.value = state.kind;
    $('recent-options').hidden = !state.recent;
    ui.changeKind.hidden = state.recent !== 'updated';
    for (const mode of ['', 'added', 'updated']) $('recent-' + (mode || 'all')).setAttribute('aria-pressed', String(state.recent === mode));
    ui.sort.value = state.sort;
    ui.sort.setAttribute('aria-describedby', state.sort === 'reading_priority' ? 'reading-sort-note' : '');
    ui.year.value = state.year;
    ui.tag.value = state.tag;
    ui.company.value = state.company;
    ui.tier.value = state.tier;
    document.querySelectorAll('input[name="collection"]').forEach((input) => { input.checked = input.value === state.collection; });
    ui.tag.disabled = state.collection === 'related' && !papers.some((paper) => paper.collection === 'related' && paper.tags.length);
    $('tag-help').textContent = tr('Tags are curated for core papers.', '研究标签主要整理于核心论文。');
  }

  function update(patch, options = {}) {
    clearTimeout(searchTimer);
    state = { ...state, q: ui.search.value, ...patch };
    if (Object.hasOwn(patch, 'recent')) {
      if (!Object.hasOwn(patch, 'kind')) state.kind = DEFAULTS.kind;
      if (!Object.hasOwn(patch, 'sort') && ['relevance', 'added', 'updated'].includes(state.sort)) state.sort = state.recent || DEFAULTS.sort;
    }
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
    selectOptions(ui.year, years.map((year) => ({ value: year, label: year })), tr('All years', '全部年份'));
    selectOptions(ui.tag, tags.map((tag) => ({ value: tag, label: tagLabel(tag) })), tr('All tags', '全部标签'));
    selectOptions(ui.company, [...companies].sort((a, b) => a.name.localeCompare(b.name)).map((company) => ({ value: company.id, label: `${company.name} (${company.count})` })), tr('All companies', '全部公司'));
    selectOptions(ui.tier, READING_TIERS.map(tier => ({ value: tier, label: tierLabel(tier) })), tr('All reading priorities', '全部阅读优先级'));
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
    for (const mode of ['', 'added', 'updated']) $('recent-' + (mode || 'all')).addEventListener('click', () => update({ recent: mode }));
    [['days', ui.recentWindow], ['kind', ui.changeKind], ['sort', ui.sort], ['year', ui.year], ['tag', ui.tag], ['company', ui.company], ['tier', ui.tier]].forEach(([key, node]) => {
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
    window.addEventListener('hashchange', () => { revealHash(); syncLanguageLink(); });
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
    addCategory('', tr('All research areas', '全部研究方向'), inCollection.length);
    const shownCategories = categories.filter((category) => state.collection === 'all' || category.collection === state.collection);
    let lastCollection;
    for (const category of shownCategories) {
      if (state.collection === 'all' && lastCollection !== category.collection) {
        ui.categories.append(element('p', 'category-group', category.collection === 'core' ? tr('Core research', '核心研究') : tr('Related work', '相关研究')));
        lastCollection = category.collection;
      }
      addCategory(category.id, categoryLabel(category.id), inCollection.filter((paper) => paper.category === category.id).length);
    }
  }

  function normalizeSearch(value) {
    return String(value || '').normalize('NFKC').toLowerCase()
      .replace(/[()[\]{}:：,，;；!?！？"“”‘’]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function includesSearchTerm(text, term) {
    // Short Latin queries are usually acronyms. EST must not match test or interest.
    // Longer words, identifiers and Chinese retain substring/full-text search.
    return /^[a-z]{1,4}$/.test(term)
      ? new RegExp(`(^|[^a-z0-9])${term}(?=$|[^a-z0-9])`).test(text)
      : text.includes(term);
  }

  function searchRank(paper, query, words) {
    if (!query) return 0;
    if (paper.searchIDs.includes(query)) return 100;
    if (paper.searchTitles.includes(query)) return 90;
    if (paper.searchTitles.some((title) => includesSearchTerm(title, query))) return 80;
    const titleMatches = words.filter((word) => paper.searchTitles.some((title) => includesSearchTerm(title, word))).length;
    if (titleMatches === words.length) return 60;
    return titleMatches ? 40 + titleMatches / words.length : 0;
  }

  function newestFirst(a, b) {
    return Number(b.year || 0) - Number(a.year || 0)
      || arxivID(b).localeCompare(arxivID(a), undefined, { numeric: true })
      || a.order - b.order || String(a.id).localeCompare(String(b.id));
  }

  const CHANGE_LABELS = {paper_revision: ['Paper revision', '论文修订'], venue_update: ['Venue update', 'Venue 更新'], metadata_enrichment: ['Metadata enrichment', '资料补全']};
  const changeLabel = kind => kind === 'substantive' ? tr('Paper information updates', '论文信息更新') : kind === 'all' ? tr('All update types', '全部更新类型') : CHANGE_LABELS[kind] ? tr(...CHANGE_LABELS[kind]) : '';
  function validInstant(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) return NaN;
    return Date.parse(value);
  }
  function matchingEvents(paper) {
    return (Array.isArray(paper.change_history) ? paper.change_history : []).filter(event => event && CHANGE_LABELS[event.kind] && (state.recent !== 'updated' || state.kind === 'all' || (state.kind === 'substantive' ? event.kind !== 'metadata_enrichment' || (event.fields || []).some(field => !['summaries', 'original_abstract', 'source_dates'].includes(field)) : event.kind === state.kind)) && Number.isFinite(validInstant(event.at)) && validInstant(event.at) <= Date.now());
  }
  function latestChange(paper) {
    return matchingEvents(paper).reduce((latest, event) => !latest || event.at > latest.at ? event : latest, null);
  }
  function activityInstant(paper, mode) {
    const value = validInstant(mode === 'added' ? paper.added_at : latestChange(paper)?.at);
    return Number.isFinite(value) && value <= Date.now() ? value : -Infinity;
  }
  function inRecentWindow(value) {
    const now = Date.now(), day = 86400000, offset = 8 * 3600000;
    if (!Number.isFinite(value) || value > now) return false;
    const start = Math.floor((now + offset) / day) * day - offset - (Number(state.days) - 1) * day;
    return state.days === 'all' || value >= start;
  }
  function displayDate(value) {
    const stamp = validInstant(value);
    return Number.isFinite(stamp) ? new Date(stamp + 8 * 3600000).toISOString().slice(0, 10) : tr('Unknown', '未知');
  }

  function matches(paper, words) {
    if (state.recent && !inRecentWindow(activityInstant(paper, state.recent))) return false;
    if (state.collection !== 'all' && paper.collection !== state.collection) return false;
    if (state.category && paper.category !== state.category) return false;
    if (state.year && String(paper.year) !== state.year) return false;
    if (state.tag && !paper.tags.includes(state.tag)) return false;
    if (state.company && !companyMatches(paper, state.company)) return false;
    if (state.tier && paper.reading_tier !== state.tier) return false;
    return words.every((word) => includesSearchTerm(paper.searchText, word));
  }

  function renderActiveFilters() {
    ui.active.replaceChildren();
    const labels = {
      q: state.q ? `${tr('Search', '搜索')}: ${state.q}` : '',
      collection: state.collection !== 'all' ? (state.collection === 'core' ? tr('Core papers', '核心论文') : tr('Related work', '相关研究')) : '',
      category: state.category ? categoryLabel(state.category) : '',
      year: state.year,
      tag: tagLabel(state.tag),
      company: state.company ? companyLabel(state.company) : '',
      tier: state.tier ? `${tr('Reading priority', '阅读优先级')}: ${tierLabel(state.tier)}` : '',
      recent: state.recent ? `${state.recent === 'added' ? tr('Recently added', '最近新增') : tr('Recently updated', '最近更新')} · ${state.days === 'all' ? tr('All time', '全部时间') : tr(`Past ${state.days} days`, `近 ${state.days} 天`)}` : '',
      kind: state.recent === 'updated' && state.kind !== 'all' ? changeLabel(state.kind) : ''
    };
    Object.entries(labels).forEach(([key, label]) => {
      if (!label) return;
      const button = element('button', 'active-chip');
      button.type = 'button';
      button.setAttribute('aria-label', `${tr('Remove filter', '移除筛选')}: ${label}`);
      const close = element('span', 'chip-close', '×');
      close.setAttribute('aria-hidden', 'true');
      button.append(element('span', '', label), close);
      button.addEventListener('click', () => {
        update({ [key]: key === 'kind' ? 'all' : DEFAULTS[key] });
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
      const clear = element('button', 'text-button clear-all', tr('Clear all', '清空全部'));
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

  function syncLanguageLink() {
    const link = $('language-switch');
    if (!link) return;
    const url = new URL(LANG === 'zh' ? './index.html' : './zh.html', window.location.href);
    url.search = window.location.search;
    url.hash = window.location.hash;
    link.href = url.pathname + url.search + url.hash;
  }

  // Small, text-only TeX display layer. The exact author text stays in catalog.json.
  // It supports the source typography and simple inline formulas without executing markup.
  // Unknown author macros remain visible as source notation rather than being guessed.
  function appendSourceText(parent, source) {
    const symbols = {times: '×', sim: '∼', gg: '≫', star: '⋆', approx: '≈', dagger: '†',
      alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', lambda: 'λ', mu: 'μ', sigma: 'σ', theta: 'θ',
      leq: '≤', geq: '≥', cdot: '·', infty: '∞', log: 'log', exp: 'exp'};
    const formats = {textbf: 'strong', textit: 'em', emph: 'em', textsc: 'span',
      mathbf: 'strong', mathrm: 'span', text: 'span', uline: 'span'};
    let pos = 0;
    function appendText(node, text) { if (text) node.append(element('span', '', text)); }
    function parse(node, stop = '', math = false) {
      let buffer = '';
      const flush = () => { appendText(node, buffer); buffer = ''; };
      while (pos < source.length) {
        const char = source[pos];
        if (stop && char === stop) { pos++; break; }
        if (char === '\\' && pos + 1 < source.length) {
          flush(); pos++;
          const command = source.slice(pos).match(/^[A-Za-z]+/);
          if (!command) {
            const escaped = source[pos++];
            appendText(node, escaped === '!' ? '' : escaped === ',' || escaped === ';' ? ' ' : escaped);
          } else {
            const name = command[0]; pos += name.length;
            if (symbols[name]) appendText(node, symbols[name]);
            else if (formats[name] && source[pos] === '{') {
              pos++; const formatted = element(formats[name], name === 'textsc' ? 'small-caps' : '');
              parse(formatted, '}', math); node.append(formatted);
            } else if (name === 'href' && source[pos] === '{') {
              pos++; const destination = element('span'); parse(destination, '}', false);
              if (source[pos] === '{') { pos++; parse(node, '}', math); }
              else appendText(node, destination.textContent);
            } else {
              const macro = element('code', 'source-macro', '\\' + name);
              macro.title = tr('Unexpanded notation in the author source', '作者原文中未展开的宏');
              node.append(macro);
            }
          }
        } else if (char === '$') {
          flush(); pos++;
          const formula = element('span', 'inline-math');
          parse(formula, '$', true); node.append(formula);
        } else if (char === '{') {
          flush(); pos++; parse(node, '}', math);
        } else if (math && (char === '^' || char === '_')) {
          flush(); pos++; const script = element(char === '^' ? 'sup' : 'sub');
          if (source[pos] === '{') { pos++; parse(script, '}', true); }
          else if (source[pos] === '\\') {
            const command = source.slice(pos + 1).match(/^[A-Za-z]+/);
            if (command) { pos += command[0].length + 1; appendText(script, symbols[command[0]] || '\\' + command[0]); }
            else appendText(script, source[pos++]);
          } else if (pos < source.length) appendText(script, source[pos++]);
          node.append(script);
        } else { buffer += char; pos++; }
      }
      flush();
    }
    parse(parent);
  }

  function verifiedSummary(paper, language) {
    const summary = paper.summaries?.[language];
    return summary?.basis === 'original_abstract' && paper.original_abstract?.status === 'verified' ? summary : null;
  }

  function appendReadingPreview(parent, prose, id, label) {
    prose.id = id;
    prose.classList.add('reading-preview');
    prose.classList.add('is-collapsed');
    const button = element('button', 'reading-toggle');
    button.type = 'button';
    button.hidden = true;
    button.setAttribute('aria-controls', id);
    button.setAttribute('aria-expanded', 'false');
    const preview = { prose, button, id, label, overflowing: false };
    readingPreviews.push(preview);
    button.addEventListener('click', () => {
      if (!preview.overflowing) return;
      const expanded = !expandedReadings.has(id);
      if (expanded) expandedReadings.add(id);
      else expandedReadings.delete(id);
      syncReadingPreview(preview);
      // Keep the control reachable when a long passage collapses above it.
      if (!expanded) button.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    });
    parent.append(prose, button);
  }

  function syncReadingPreview(preview) {
    const { prose, button, id, label, overflowing } = preview;
    const expanded = overflowing && expandedReadings.has(id);
    prose.classList.toggle('is-collapsed', overflowing && !expanded);
    button.hidden = !overflowing;
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? tr('Show less', '收起全文') : tr('Show full text', '展开全文');
    button.setAttribute('aria-label', `${button.textContent} · ${label}`);
  }

  function refreshReadingPreviews() {
    // Measure real wrapping at the current width, including formatted source text.
    // Batch the writes and reads so large result sets need only one layout pass.
    readingPreviews.forEach(({ prose }) => prose.classList.add('is-collapsed'));
    readingPreviews.forEach((preview) => {
      preview.overflowing = preview.prose.scrollHeight > preview.prose.clientHeight + 1;
    });
    readingPreviews.forEach(syncReadingPreview);
  }

  function initializeReadingControls() {
    const updateBackToTop = () => {
      ui.backToTop.hidden = window.scrollY < Math.max(400, window.innerHeight * .75);
    };
    ui.backToTop.addEventListener('click', () => {
      $('hero-title').focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    window.addEventListener('resize', () => {
      if (readingLayoutPending) return;
      readingLayoutPending = true;
      requestAnimationFrame(() => {
        readingLayoutPending = false;
        refreshReadingPreviews();
        updateBackToTop();
      });
    });
    updateBackToTop();
  }

  function appendReadingContent(parent, paper, cardID) {
    const summary = verifiedSummary(paper, LANG);
    const panel = element('section', 'summary-panel');
    panel.setAttribute('aria-label', tr('Paper summary', '论文总结'));
    panel.append(element('h4', 'reading-label', tr('Paper summary', '论文总结')));
    if (summary?.text) {
      appendReadingPreview(panel, element('p', 'summary-text', summary.text), `${cardID}-summary`, tr('Paper summary', '论文总结'));
      const basis = tr('Based on the original abstract', '基于论文原始摘要');
      panel.append(element('p', 'provenance', `${summary.method === 'ai_assisted' ? tr('AI-assisted summary', 'AI 辅助总结') : tr('Editorial summary', '编者总结')} · ${basis}`));
    } else {
      panel.append(element('p', 'missing-content', tr('English summary not yet available.', '中文总结尚未补齐。')));
    }
    parent.append(panel);
    const original = element('section', 'abstract-panel');
    original.setAttribute('aria-label', tr('Original abstract', '原始摘要'));
    const abstract = paper.original_abstract;
    original.append(element('h4', 'reading-label', tr('Original abstract', '论文原始摘要') + (abstract?.status === 'verified' ? ` · ${abstract.language.toUpperCase()}` : '')));
    if (abstract?.status === 'verified' && abstract.text) {
      if (abstract.source_title && abstract.source_title.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '') !== paper.title.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '')) {
        original.append(element('p', 'source-title', `${tr('Title at source', '来源所载标题')}: ${abstract.source_title}`));
      }
      const prose = element('p', 'abstract-text');
      appendSourceText(prose, abstract.text);
      prose.lang = abstract.language;
      appendReadingPreview(original, prose, `${cardID}-abstract`, tr('Original abstract', '原始摘要'));
      const provenance = element('p', 'provenance');
      const source = safeURL(abstract.source_url);
      if (source) provenance.append(createLink(tr('Original source', '原始来源'), source, 'source-citation'));
      provenance.append(element('span', '', ` · ${tr('Retrieved', '获取于')} ${abstract.retrieved_at.slice(0, 10)}`));
      if (abstract.source_version) provenance.append(element('span', '', ` · ${abstract.source_version}`));
      if (abstract.license) provenance.append(element('span', '', ` · ${abstract.license}`));
      original.append(provenance);
      if (paper.source_dates) original.append(element('p', 'provenance source-dates', `${tr('Source first published', '来源首次发表')} ${displayDate(paper.source_dates.published_at)} · ${tr('Source latest version', '来源最新版本')} ${paper.source_dates.source_version || ''} · ${displayDate(paper.source_dates.updated_at)} (Asia/Shanghai)`));
    } else {
      original.append(element('p', 'missing-content', abstract?.status === 'unavailable' ? tr('Original abstract unavailable from the verified source. See the paper link.', '暂未从来源获取到可核实的原始摘要，请查阅论文链接。') : tr('Original abstract awaiting source verification.', '原始摘要待来源核实。')));
      if (abstract?.reason) {
        const details = element('details', 'source-details');
        details.append(element('summary', '', tr('Source status details', '查看来源状态')));
        details.append(element('p', 'provenance', abstract.reason));
        original.append(details);
      }
    }
    parent.append(original);

  }

  function paperCard(paper) {
    const card = element('article', 'paper-card');
    card.id = anchorFor(paper);
    card.tabIndex = -1;
    const titleID = `${card.id}-title`;
    card.setAttribute('aria-labelledby', titleID);
    const rail = element('div', 'paper-rail');
    const number = element('span', 'paper-number', String(paper.order + 1).padStart(3, '0'));
    number.setAttribute('aria-label', `${tr('Catalog record', '目录序号')} ${paper.order + 1}`);
    rail.append(number);
    if (paper.year) rail.append(element('span', 'paper-year', paper.year));
    const body = element('div', 'paper-body');
    const metadata = element('div', 'paper-metadata');
    metadata.setAttribute('aria-label', tr('Paper metadata', '论文元信息'));
    const eyebrow = element('div', 'paper-eyebrow');
    eyebrow.append(element('span', 'paper-collection', paper.collection === 'core' ? tr('Core paper', '核心论文') : tr('Related work', '相关研究')));
    eyebrow.append(element('span', 'paper-area', categoryLabel(paper.category)));
    metadata.append(eyebrow);
    const priority = element('div', 'paper-reading-tier');
    priority.append(element('span', 'reading-tier-label', tr('Reading priority', '阅读优先级')));
    const badge = element('span', 'reading-tier reading-tier--' + paper.reading_tier, tierLabel(paper.reading_tier));
    badge.setAttribute('aria-label', `${tr('Reading priority', '阅读优先级')}: ${tierLabel(paper.reading_tier)}`);
    badge.setAttribute('aria-describedby', 'reading-tier-note');
    priority.append(badge);
    metadata.append(priority);
    const title = element('h3', 'paper-title');
    title.id = titleID;
    const links = paper.links.map((link) => ({ ...link, url: safeURL(link.url) })).filter((link) => link.url);
    const primaryLink = links.find((link) => /paper|arxiv/i.test(link.label)) || links[0];
    if (primaryLink) title.append(createLink(paper.title, primaryLink.url, ''));
    else title.textContent = paper.title;
    body.append(title);
    if (paper.affiliation || paper.venue) {
      const meta = element('div', 'paper-meta');
      if (paper.affiliation) meta.append(element('span', 'paper-affiliation', paper.affiliation));
      if (paper.affiliation && paper.venue) {
        const divider = element('span', 'meta-divider');
        divider.setAttribute('aria-hidden', 'true');
        meta.append(divider);
      }
      if (paper.venue) meta.append(element('span', 'paper-venue', paper.venue));
      metadata.append(meta);
    }
    const dates = element('div', 'paper-dates');
    dates.append(element('p', '', `${tr('Added to catalog', '收录于')} ${displayDate(paper.added_at)}`));
    const latest = latestChange(paper);
    if (latest) dates.append(element('p', '', `${changeLabel(latest.kind)} · ${displayDate(latest.at)}`));
    const allEvents = (paper.change_history || []).filter(event => event && CHANGE_LABELS[event.kind] && Number.isFinite(validInstant(event.at))).slice().reverse();
    if (paper.added_provenance?.source_url || allEvents.length) {
      const history = element('details', 'change-details');
      history.append(element('summary', '', tr('Catalog history', '查看目录历史')));
      const entries = element('ul', 'change-history');
      function addHistory(label, at, sourceURL, fields = []) {
        const item = element('li', '', `${label} · ${displayDate(at)}`);
        const names = {venue: tr('venue', '会议'), affiliation: tr('affiliation', '机构'), title: tr('title', '标题'), original_abstract: tr('original abstract', '原始摘要'), summaries: tr('summaries', '总结'), source_dates: tr('source dates', '来源日期')};
        if (fields.length) item.append(element('span', 'change-fields', fields.map(field => names[field] || field).join(' / ')));
        const url = safeURL(sourceURL);
        if (url) item.append(createLink(tr('Evidence', '记录来源'), url, 'history-source'));
        entries.append(item);
      }
      allEvents.forEach(event => addHistory(changeLabel(event.kind), event.at, event.source_url, event.fields || []));
      if (paper.added_at) addHistory(tr('New catalog entry', '新增论文'), paper.added_at, paper.added_provenance?.source_url);
      history.append(entries);
      dates.append(history);
    }
    metadata.append(dates);
    appendReadingContent(body, paper, card.id);
    const tags = element('div', 'paper-tags');
    if (paper.tags.length) {
      tags.setAttribute('aria-label', tr('Research tags', '研究标签'));
      paper.tags.forEach((tag) => {
        const button = element('button', 'tag-button', tagLabel(tag));
        button.type = 'button';
        button.setAttribute('aria-label', `${tr('Filter by tag', '按标签筛选')}: ${tagLabel(tag)}`);
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
      const cleanLabel = String(label || 'Paper').replace(/^\[|\]$/g, '');
      const localizedLabel = LANG === 'zh' ? ({Paper: '论文', Code: '代码', Project: '项目', Website: '网站'}[cleanLabel] || cleanLabel) : cleanLabel;
      const link = createLink(localizedLabel, url, 'paper-link');
      const arrow = element('span', 'external-arrow');
      arrow.setAttribute('aria-hidden', 'true');
      link.append(arrow);
      actions.append(link);
    });
    const permalink = element('a', 'permalink', '#');
    // Use a clean URL so the link always resolves regardless of current filters.
    const linkURL = new URL(window.location.pathname, window.location.origin);
    linkURL.hash = card.id;
    permalink.href = linkURL.pathname + linkURL.hash;
    permalink.setAttribute('aria-label', `${tr('Permanent link to', '论文固定链接')} ${paper.title}`);
    permalink.title = tr('Permanent link to this paper', '此论文的固定链接');
    permalink.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      window.history.pushState({}, '', permalink.href);
      state = { ...DEFAULTS };
      visibleCount = PAGE_SIZE;
      syncControls();
      render();
      revealHash();
      syncLanguageLink();
    });
    actions.append(permalink);
    metadata.append(tags);
    body.append(actions);
    card.append(rail, body, metadata);
    return card;
  }

  function renderEmpty() {
    const empty = element('div', 'empty-state');
    const symbol = element('div', 'empty-symbol', '∅');
    symbol.setAttribute('aria-hidden', 'true');
    empty.append(symbol, element('h3', '', tr('A little too specific?', '筛选条件有点严格？')), element('p', '', tr('No papers match these filters. Try a broader search or clear a filter to keep exploring.', '没有符合条件的论文。试试更宽泛的关键词，或移除一项筛选条件。')));
    const clear = element('button', 'button button-primary', tr('Clear all filters', '清空全部筛选'));
    clear.type = 'button';
    clear.addEventListener('click', () => { clearFilters(); ui.search.focus({ preventScroll: true }); });
    empty.append(clear);
    ui.papers.append(empty);
  }

  function renderPapers() {
    const shown = filtered.slice(0, visibleCount);
    readingPreviews = [];
    ui.papers.replaceChildren();
    if (!shown.length) renderEmpty();
    else {
      const fragment = document.createDocumentFragment();
      shown.forEach((paper) => fragment.append(paperCard(paper)));
      ui.papers.append(fragment);
    }
    refreshReadingPreviews();
    ui.papers.setAttribute('aria-busy', 'false');
    ui.pagination.hidden = filtered.length === 0;
    ui.more.hidden = shown.length >= filtered.length;
    ui.showing.textContent = tr(`Showing ${shown.length} of ${filtered.length} papers`, `已显示 ${shown.length} / ${filtered.length} 篇论文`);
    ui.status.textContent = tr(`${filtered.length} ${filtered.length === 1 ? 'paper matches' : 'papers match'}. Showing ${shown.length}.`, `找到 ${filtered.length} 篇论文，已显示 ${shown.length} 篇。`);
  }

  function render() {
    const query = normalizeSearch(state.q);
    const words = query.split(/\s+/).filter(Boolean);
    filtered = papers.filter((paper) => matches(paper, words));
    if (state.sort === 'title') filtered.sort((a, b) => a.title.localeCompare(b.title));
    else if (state.sort === 'reading_priority') filtered.sort((a, b) => READING_TIERS.indexOf(a.reading_tier) - READING_TIERS.indexOf(b.reading_tier) || newestFirst(a, b));
    else if (['added', 'updated'].includes(state.sort)) filtered.sort((a, b) => {
      const left = activityInstant(a, state.sort), right = activityInstant(b, state.sort);
      return (left === right ? 0 : left < right ? 1 : -1) || newestFirst(a, b);
    });
    else if (state.sort === 'original') filtered.sort((a, b) => a.order - b.order);
    else if (state.sort === 'relevance' && words.length) {
      const ranks = new Map(filtered.map((paper) => [paper.id, searchRank(paper, query, words)]));
      filtered.sort((a, b) => ranks.get(b.id) - ranks.get(a.id) || newestFirst(a, b));
    } else filtered.sort(newestFirst);
    $('reading-sort-note').hidden = state.sort !== 'reading_priority';
    $('reading-sort-note').textContent = tr('Read first → Worth reading → Read as needed → Unrated. Within each group: recorded year, then arXiv ID, newest first.', '优先读 → 值得读 → 按需读 → 未分级。同组内按发表年份与 arXiv 编号从新到旧排序。');
    $('recent-note').hidden = !state.recent;
    $('recent-note').textContent = tr('Dates use Asia/Shanghai calendar days. Added means first recorded in this repository, not publication. Paper information updates exclude abstract/translation-only backfills; select Metadata enrichment or All update types to see those. Unknown dates are excluded.', '按 Asia/Shanghai 自然日筛选。新增指仓库首次收录，并非论文发表；更新默认显示论文信息变化；摘要与翻译补全可在“资料补全”或“全部更新类型”查看。日期未知的记录不进入时间筛选。');
    $('result-count').textContent = filtered.length;
    $('results-kicker').textContent = state.collection === 'core' ? tr('CORE RESEARCH', '核心研究') : state.collection === 'related' ? tr('RELATED WORK', '相关研究') : tr('THE COLLECTION', '全部研究');
    const category = categories.find((item) => item.id === state.category);
    $('category-description').textContent = (LANG === 'zh' && CATEGORY_ZH[category?.id]?.[1]) || category?.description || '';
    $('category-description').hidden = !category?.description;
    renderCategories();
    renderActiveFilters();
    renderPapers();
    syncLanguageLink();
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
    empty.append(element('h3', '', tr('The library couldn’t be loaded', '论文库暂时无法加载')), element('p', '', tr('Please try again, or browse the complete reading list on GitHub.', '请重试，或在 GitHub 查看完整阅读清单。')));
    const button = element('button', 'button button-secondary', tr('Try again', '重试'));
    button.type = 'button';
    button.addEventListener('click', () => window.location.reload());
    const link = element('a', 'paper-link', tr('Read on GitHub', '在 GitHub 阅读'));
    link.href = 'https://github.com/byby221b/Awesome-CTR-Scaling';
    const actions = element('div', 'paper-links');
    actions.style.justifyContent = 'center';
    actions.append(button, link);
    empty.append(actions);
    ui.papers.append(empty);
    ui.status.textContent = tr('The catalog could not be loaded. Please retry or use the repository README.', '目录无法加载。请重试或查看仓库 README。');
    $('result-count').textContent = '—';
  }

  async function start() {
    initializeReadingControls();
    syncLanguageLink();
    try {
      const response = await fetch('./catalog.json');
      if (!response.ok) throw new Error('Catalog request failed');
      catalog = await response.json();
      if (!Array.isArray(catalog.papers) || !Array.isArray(catalog.categories)) throw new Error('Invalid catalog');
      categories = catalog.categories;
      companies = Array.isArray(catalog.companies) ? catalog.companies : [];
      papers = catalog.papers.map((paper, index) => {
        const normalized = { ...paper, reading_tier: readingTier(paper.reading_tier), year: paper.year || '', tags: Array.isArray(paper.tags) ? paper.tags : [], companies: Array.isArray(paper.companies) ? paper.companies : [], links: Array.isArray(paper.links) ? paper.links : [], order: Number.isFinite(paper.order) ? paper.order : index };
        normalized.searchIDs = [paper.id, arxivID(paper), paper.doi].filter(Boolean).map(normalizeSearch);
        normalized.searchTitles = [paper.title, paper.original_abstract?.source_title, ...(Array.isArray(paper.aliases) ? paper.aliases : [])].filter(Boolean).map(normalizeSearch);
        normalized.searchText = normalizeSearch([paper.id, paper.title, ...(Array.isArray(paper.aliases) ? paper.aliases : []), paper.doi, paper.original_abstract?.text, paper.original_abstract?.source_title, verifiedSummary(paper, 'en')?.text, verifiedSummary(paper, 'zh')?.text, CATEGORY_ZH[paper.category]?.join(' '), paper.affiliation, paper.venue, paper.year, categoryLabel(paper.category), ...normalized.tags, ...normalized.tags.map(tagLabel), ...normalized.companies.map(companyLabel), ...normalized.links.map((link) => link.url)].filter(Boolean).join(' '));
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
          $('updated-at').textContent = date.toLocaleDateString(LANG === 'zh' ? 'zh-CN' : 'en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
        } else $('updated-at').textContent = rawDate;
      }
      const coverage = catalog.coverage || {};
      $('coverage-note').textContent = tr(
        `Original abstracts: ${coverage.verified_abstracts || 0}/${papers.length} verified · English summaries: ${coverage.english_summaries || 0}/${papers.length} · Chinese summaries: ${coverage.chinese_summaries || 0}/${papers.length}. Gaps are labeled below.`,
        `原始摘要：已核实 ${coverage.verified_abstracts || 0}/${papers.length} 篇 · 英文总结：${coverage.english_summaries || 0}/${papers.length} · 中文总结：${coverage.chinese_summaries || 0}/${papers.length}。未补齐的内容会明确标注。`);
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
