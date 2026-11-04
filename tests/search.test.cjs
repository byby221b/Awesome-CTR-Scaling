/* Search policy regressions: synthetic adversarial records plus real catalog anchors. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { boot, catalog } = require('./frontend.test.cjs');

function ids(app, query) {
  app.search(query);
  while (!app.$('load-more').hidden) app.$('load-more').fire('click');
  assert.equal(app.logs.length, 0, app.logs.join('\n'));
  return app.cards().map(card => card.id.replace('paper-', '').replace('-', '.'));
}
const sorted = values => [...values].sort();

async function testSearch() {
  // Exercise the shared parser directly, without adding any production exports.
  const parserSource = fs.readFileSync(path.join(__dirname, '../web/app.js'), 'utf8').replace('  start();', `
    window.sourceTextForTest = sourceTextForSearch;
    window.displayTextForTest = value => {
      const node = element('p'); appendSourceText(node, value); return node.textContent;
    };
    start();`);
  const parserApp = await boot(undefined, false, undefined, {source: parserSource});
  const formatting = [
    [String.raw`\textbf{T}est-Time`, 'Test-Time'],
    [String.raw`\textbf{E\emph{S}T}`, 'EST'],
    [String.raw`\textbf{EST}`, 'EST'],
    [String.raw`\emph{EST}(KDD)`, 'EST(KDD)'],
    [String.raw`\textit{T}\textbf{e}st`, 'Test'],
    [String.raw`\mathrm{E}ST`, 'EST'],
    [String.raw`\text{EST}imator`, 'ESTimator'],
    [String.raw`\unknown{T}est`, String.raw`\unknownTest`],
    [String.raw`E\unknown{}ST`, String.raw`E\unknownST`],
    [String.raw`\textbf{\unknown{E}ST}`, String.raw`\unknownEST`],
    [String.raw`\constructor{E}ST`, String.raw`\constructorEST`],
    [String.raw`\toString{E}ST`, String.raw`\toStringEST`],
    [String.raw`\\textbf{T}est`, String.raw`\textbfTest`],
    [String.raw`\href{https://example.test/EST}{Test-Time}`, 'Test-Time'],
    ['EST(KDD)', 'EST(KDD)'],
    [String.raw`<script>alert(1)</script> \emph{EST}`, '<script>alert(1)</script> EST']
  ];
  for (const [input, expected] of formatting) {
    const created = parserApp.metrics.elements;
    assert.equal(parserApp.window.sourceTextForTest(input), expected, input);
    assert.equal(parserApp.metrics.elements, created, 'index conversion must not create DOM nodes');
    assert.equal(parserApp.window.displayTextForTest(input), expected, 'display and index parser agree');
  }
  assert.equal(parserApp.logs.length, 0);

  const formatted = structuredClone(catalog);
  const sourceExamples = [
    String.raw`\textbf{T}est-Time Understan\emph{din}g Com\textbf{ple}te gra\emph{dien}t`,
    String.raw`We compare \textbf{EST}.`,
    String.raw`We compare \textbf{E\emph{S}T}.`,
    'EST(KDD)',
    String.raw`\unknown{E}ST and E\unknown{}ST`,
    String.raw`\text{EST}imator`,
    String.raw`\href{https://example.test/EST}{A source link}`,
    'Neutral source text.'
  ];
  formatted.papers = sourceExamples.map((text, index) => {
    const id = `2601.${91000 + index}`;
    return {...structuredClone(catalog.papers[0]), id, title: 'Formatting fixture ' + index,
      aliases: [], tags: [], companies: [], summaries: {},
      links: [{label: 'Paper', url: `https://arxiv.org/abs/${id}`}],
      original_abstract: {...structuredClone(catalog.papers[0].original_abstract), text, source_title: 'Formatting fixture ' + index}};
  });
  // Formatting also applies to title/alias/tag/summary indexes and fuzzy vocabulary.
  Object.assign(formatted.papers[7], {title: String.raw`\textbf{T}est-Time`,
    aliases: [String.raw`\emph{T}est`], tags: [String.raw`\textbf{T}est-Time`],
    summaries: {en: {basis: 'original_abstract', text: String.raw`\textbf{T}est-Time`},
      zh: {basis: 'original_abstract', text: String.raw`\emph{T}est-Time`}}});
  for (const route of ['', 'zh.html']) {
    const app = await boot('https://example.test/Awesome-CTR-Scaling/' + route, false, formatted);
    assert.deepEqual(sorted(ids(app, 'EST')), ['2601.91001', '2601.91002', '2601.91003']);
    assert.deepEqual(ids(app, 'EST KDD'), ['2601.91003'], 'ordinary parentheses still separate query words');
    for (const term of ['DIN', 'PLE', 'DIEN']) assert.deepEqual(ids(app, term), [], 'formatting cannot split a word into ' + term);
    assert(ids(app, 'Test-Time').includes('2601.91000'), 'joined original word stays searchable');
    assert(ids(app, 'Test-Time').includes('2601.91007'), 'formatted high fields stay searchable');
    assert(ids(app, 'unknown').includes('2601.91004'), 'unknown command names are retained');
    const before = app.$('paper-2601-91004-abstract').textContent;
    assert(before.includes(String.raw`\unknownEST`) && before.includes(String.raw`E\unknownST`));
  }

  const fixture = structuredClone(catalog);
  fixture.categories = [{id: 'test', title: 'Test area', collection: 'core', description: ''}];
  fixture.companies = [];
  fixture.papers = [];
  const add = (title, extra = {}) => {
    const id = `2601.${String(90000 + fixture.papers.length)}`;
    fixture.papers.push({ ...structuredClone(catalog.papers[0]), id, title, order: fixture.papers.length,
      category: 'test', collection: 'core', year: 2026, tags: [], aliases: [], companies: [], affiliation: '', venue: '',
      links: [{label: 'Paper', url: `https://arxiv.org/abs/${id}`}], summaries: {},
      original_abstract: {status: 'verified', text: 'Neutral source text.', source_title: title,
        language: 'en', retrieved_at: '2026-01-01T00:00:00Z', source_url: `https://arxiv.org/abs/${id}`}, ...extra });
    return id;
  };
  const abstract = text => ({status: 'verified', text, language: 'en', retrieved_at: '2026-01-01T00:00:00Z', source_url: 'https://example.test/paper'});
  const est = add('Exact Sequence Transformer', {aliases: ['EST']});
  const estBody = add('A newer comparison', {original_abstract: abstract('We compare EST.')});
  const acronymNoise = add('Understanding Embedding LinkedIn Decoding Principled Complete Multiple gradient interest best test');
  const din = add('DIN: A distinct method');
  const ple = add('PLE: A distinct method');
  const dien = add('DIEN: A distinct method');
  const hstu = add('HSTU: A distinct method');
  const moe = add('MoE: Expert routing');
  const chineseMoe = add('混合专家路由');
  const mmoe = add('MMoE: A multi-gate method');
  const fm = add('FM: A distinct method');
  const ambiguousFM = add('Foundation models and factorization machines');
  const multiTask = add('Multi-task learning');
  const multiScenario = add('Multi-scenario learning');
  const kd = add('Knowledge Distillation for Recommendation');
  const kdChinese = add('知识蒸馏研究');
  const splitTitleBody = add('Knowledge', {original_abstract: abstract('Distillation')});
  const splitAliases = add('Cross-field decoy', {aliases: ['knowledge', 'distillation']});
  const splitLanguages = add('Cross-language decoy', {summaries: {
    en: {basis: 'original_abstract', text: 'knowledge'}, zh: {basis: 'original_abstract', text: 'distillation'}
  }});
  const long = add('Efficient history processing', {tags: ['Long Sequence']});
  const longChinese = add('长序列建模研究');
  const both = add('Compressed history processing', {tags: ['Long Sequence', 'Knowledge Distillation']});
  const splitPhrase = add('Long unrelated sequence processing');
  const ptq = add('训练后量化研究');
  const vector = add('Vector Quantization for Retrieval');
  const linear = add('Linear Attention with Quantization');
  const typoExact = add('Transfromer literal spelling');
  const transformer = add('Transformer needle architecture');
  const transformerBody = add('Body-only reference', {original_abstract: abstract('Transformer')});
  const doubleTypo = add('Transformer Distillation architecture');
  const titleField = add('Rarefieldtoken title');
  const aliasField = add('Named method', {aliases: ['Rarefieldtoken']});
  const tagField = add('Tagged method', {tags: ['Rarefieldtoken']});
  const metaField = add('Metadata method', {affiliation: 'Rarefieldtoken'});
  const bodyField = add('Prose method', {original_abstract: abstract('Rarefieldtoken')});
  const strictAlias = add('A named architecture', {aliases: ['ABCDEF']});
  const closeWord = add('Abcdeg architecture');
  add('Abcdefg is a longer word');
  add('BFP8 is a different format');
  const adaptive = Array.from({length: 10}, (_, i) => add(`Adaptive method ${i}`));
  const adaptiveTypo = add('Adaptine needle architecture');
  const twin = add('Transformer gradient architecture');

  for (const route of ['', 'zh.html']) {
    const app = await boot('https://example.test/Awesome-CTR-Scaling/' + route, false, fixture);
    for (const query of [est, est + 'v2', `https://arxiv.org/abs/${est}v2`, `https://arxiv.org/pdf/${est}v2.pdf`]) {
      assert.deepEqual(ids(app, query), [est], query);
    }
    assert.deepEqual(ids(app, '2601.89999'), [], 'numeric IDs are never corrected');
    assert.deepEqual(ids(app, '2601.9000'), [], '4-digit suffix must not match a 5-digit ID prefix');
    assert.equal(ids(app, 'Exact Sequence Transformer')[0], est, 'complete title ranks first');
    assert.deepEqual(ids(app, 'EST'), [est, estBody], 'exact alias before body mention, no interest/test matches');
    for (const [query, expected] of [['DIN', din], ['PLE', ple], ['DIEN', dien], ['HSTU', hstu]]) {
      assert.deepEqual(ids(app, query), [expected], 'strict token: ' + query);
      assert(!ids(app, query).includes(acronymNoise));
    }
    assert.deepEqual(ids(app, 'HSTV'), [], 'short acronym typo is not repaired');
    assert.deepEqual(ids(app, 'abceef'), [], 'declared acronym is not a fuzzy target');
    assert.deepEqual(ids(app, 'abcdef'), [strictAlias], 'declared acronym is not a fuzzy source');
    assert.deepEqual(ids(app, 'ABCDEF'), [strictAlias]);
    assert.deepEqual(ids(app, 'FP8'), [], 'alphanumeric acronym boundaries are strict');
    assert.deepEqual(ids(app, 'FM'), [fm], 'ambiguous FM is not expanded');
    assert.deepEqual(ids(app, 'multi-task'), [multiTask], 'multi-task and multi-scenario differ');
    assert.deepEqual(ids(app, 'multi-scenario'), [multiScenario]);
    assert.deepEqual(sorted(ids(app, 'MoE')), sorted([moe, chineseMoe]), 'term aliases OR without MMoE substring leakage');
    assert.deepEqual(sorted(ids(app, '混合专家')), sorted([moe, chineseMoe]));
    assert.deepEqual(ids(app, 'MMoE'), [mmoe]);
    assert.equal(ids(app, 'MoE')[0], moe, 'literal title precedes translated alias');
    assert.equal(ids(app, '混合专家')[0], chineseMoe);
    for (const query of ['knowledge distillation', '知识蒸馏']) {
      assert.deepEqual(sorted(ids(app, query)), sorted([kd, kdChinese, both]));
      for (const decoy of [splitTitleBody, splitAliases, splitLanguages]) assert(!ids(app, query).includes(decoy));
    }
    for (const query of ['long sequence', 'long sequence modeling', '长序列', '长序列建模']) {
      assert.deepEqual(sorted(ids(app, query)), sorted([long, longChinese, both]), 'longest controlled phrase: ' + query);
    }
    for (const query of ['long sequence knowledge distillation', '长序列知识蒸馏', '知识蒸馏 long sequence modeling']) {
      assert.deepEqual(ids(app, query), [both], 'AND between concepts: ' + query);
    }
    assert.deepEqual(ids(app, 'knowledge distillation unknowntokenzzz'), [], 'unknown terms cannot be dropped');
    for (const query of ['训练后量化', 'post training quantization', 'post-training quantization']) {
      assert.deepEqual(ids(app, query), [ptq], 'longest phrase must not fall back to all quantization');
    }
    for (const query of ['vector quantization', '向量量化']) assert.deepEqual(ids(app, query), [vector]);
    assert.deepEqual(ids(app, '线性注意力 量化'), [linear]);
    const corrected = ids(app, 'transfromer');
    assert.equal(corrected[0], typoExact, 'literal misspelling precedes corrections');
    assert(corrected.includes(transformer));
    assert(!corrected.includes(transformerBody), 'no edit-distance search against abstract text');
    assert(app.walk(app.$('paper-' + transformer.replace('.', '-'))).some(node => node.classList.contains('spelling-match') && node.textContent.includes('transfromer → transformer')));
    assert(!app.walk(app.$('paper-' + typoExact.replace('.', '-'))).some(node => node.classList.contains('spelling-match')));
    for (const query of ['transformr', 'transformerx', 'transforner']) assert(ids(app, query).includes(transformer), 'one edit: ' + query);
    assert.deepEqual(ids(app, 'trnsfrmer'), [], 'two edits are not repaired');
    assert.deepEqual(ids(app, 'transfromer distilltion'), [], 'at most one misspelled concept per result');
    assert.deepEqual(ids(app, 'TRANSFROMER needle'), [], 'uppercase identifiers are not corrected');
    assert.deepEqual(ids(app, 'transfromer needle'), [transformer]);
    for (let i = 0; i < 40; i++) ids(app, `unrelatedquery${i}`);
    assert.deepEqual(ids(app, 'transfromer'), corrected, 'bounded cache eviction preserves search semantics');
    assert(ids(app, 'transfromer needle').every(id => corrected.includes(id)), 'adding a concept cannot widen typo recall');
    assert.deepEqual(sorted(ids(app, 'adaptive')), sorted(adaptive), 'enough direct hits suppress typo alternatives');
    assert.deepEqual(ids(app, 'adaptive needle'), [], 'new concept does not enable a wider fallback');
    app.change('year-filter', '2025');
    assert.deepEqual(ids(app, 'adaptive'), [], 'filters do not activate a wider fallback');
    app.$('reset-sidebar').fire('click');
    assert.deepEqual(ids(app, 'rarefieldtoken'), [aliasField, titleField, tagField, metaField, bodyField], 'exact alias, title, tag, metadata, body weighting');
    assert.deepEqual(ids(app, 'qzxvunknownzzz'), [], 'unrelated input stays empty');
    // Cross-field boundaries also apply to short acronyms, not just phrases.
    const cross = structuredClone(fixture);
    cross.papers = [{...cross.papers[0], title: 'D', aliases: ['IN', 'P', 'LE', 'DI', 'EN'],
      original_abstract: abstract('Understanding Embedding LinkedIn Decoding Principled Complete Multiple gradient'), summaries: {}}];
    const crossApp = await boot('https://example.test/Awesome-CTR-Scaling/' + route, false, cross);
    for (const query of ['DIN', 'PLE', 'DIEN', 'MoE', '混合专家']) assert.deepEqual(ids(crossApp, query), []);

    const ranking = structuredClone(fixture);
    ranking.papers = ['Knowledge distillation transfromer', '知识蒸馏 transfromer', 'Knowledge distillation Transformer']
      .map((title, i) => ({ ...ranking.papers[i], title, aliases: [], tags: [], summaries: {},
        original_abstract: abstract('Neutral source text.') }));
    const rankApp = await boot('https://example.test/Awesome-CTR-Scaling/' + route, false, ranking);
    assert.deepEqual(ids(rankApp, 'knowledge distillation transfromer'), ranking.papers.map(p => p.id),
      'literal query precedes controlled translation, which precedes spelling repair');

    const vocabulary = structuredClone(fixture);
    vocabulary.papers = [
      {...vocabulary.papers[0], title: 'Tagged model', aliases: [], tags: ['Transformer'], original_abstract: abstract('Neutral text.')},
      {...vocabulary.papers[1], title: 'Aliased model', aliases: ['Efficient Transformer'], tags: [], original_abstract: abstract('Neutral text.')},
      {...vocabulary.papers[2], title: 'Metadata-only model', aliases: [], tags: [], affiliation: 'Transformer', original_abstract: abstract('Neutral text.')}
    ];
    const vocabApp = await boot('https://example.test/Awesome-CTR-Scaling/' + route, false, vocabulary);
    assert.deepEqual(ids(vocabApp, 'transfromer'), [vocabulary.papers[1].id, vocabulary.papers[0].id],
      'spelling vocabulary covers aliases and tags, excludes metadata-only mentions');
  }

  const actual = [];
  for (const route of ['', 'zh.html']) {
    const app = await boot('https://example.test/Awesome-CTR-Scaling/' + route);
    const queries = ['EST', 'DIN', 'PLE', 'DIEN', 'HSTV', 'MoE', '混合专家', '知识蒸馏', 'knowledge distillation',
      '长序列', 'long sequence', '长序列 知识蒸馏', '线性注意力 量化', 'FP8 训练后量化', 'transfromer', 'qzxvunknownzzz'];
    const results = Object.fromEntries(queries.map(query => [query, ids(app, query)]));
    assert.deepEqual(results.EST, ['2602.10811'], 'real EST remains; formatted Test-Time in 2610.32098 must not match');
    assert(results.DIN.includes('2605.25583'), 'LENS has a genuine standalone DIN mention');
    for (const acronym of ['DIN', 'PLE', 'DIEN']) {
      for (const id of results[acronym]) {
        const paper = catalog.papers.find(p => p.id === id);
        assert(new RegExp(`(^|[^a-z0-9])${acronym}(?=$|[^a-z0-9])`, 'i').test(JSON.stringify(paper)), 'real acronym results must have token evidence');
      }
    }
    assert.deepEqual(results.HSTV, []);
    assert.deepEqual(sorted(results.MoE), sorted(results['混合专家']));
    assert.deepEqual(sorted(results['knowledge distillation']), sorted(results['知识蒸馏']));
    assert.deepEqual(sorted(results['long sequence']), sorted(results['长序列']));
    assert(results['长序列 知识蒸馏'].includes('2610.28569'), 'ECHO');
    assert(results['长序列 知识蒸馏'].every(id => results['长序列'].includes(id) && results['知识蒸馏'].includes(id)));
    assert(results['线性注意力 量化'].includes('2609.38166'), 'LeapQuant');
    assert(results['FP8 训练后量化'].includes('2603.11486'), 'OneRec-V2');
    assert(results.transfromer.length > 0);
    for (const id of results.transfromer) {
      const paper = catalog.papers.find(p => p.id === id);
      assert([paper.title, paper.original_abstract?.source_title, ...(paper.aliases || []), ...paper.tags]
        .some(text => /\btransformer\b/i.test(text || '')), 'real typo results require high-field token evidence');
    }
    assert.deepEqual(results.qzxvunknownzzz, []);
    const titlePaper = catalog.papers.find(p => p.id === '2610.28569');
    assert.equal(ids(app, titlePaper.title)[0], titlePaper.id);
    assert.deepEqual(ids(app, '2610.28569'), [titlePaper.id]);
    actual.push(results);
  }
  assert.deepEqual(actual[0], actual[1], 'same query gives identical membership AND ranking in both UI languages');
  console.log('PASS: controlled bilingual search, weighted fields, bounded spelling, strict acronyms, concept AND, longest phrases, real positives/negatives and bilingual ranking parity');
  return actual[0];
}
module.exports = testSearch;
if (require.main === module) testSearch().catch(error => { console.error(error); process.exitCode = 1; });
