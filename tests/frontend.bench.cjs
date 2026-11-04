/* Repeatable CPU/DOM-work benchmark, not a browser or network timing test.
 * node tests/frontend.bench.cjs [path/to/baseline-app.js]
 */
'use strict';
const fs = require('node:fs');
const { performance } = require('node:perf_hooks');
const { boot } = require('./frontend.test.cjs');

(async () => {
  const source = process.argv[2] ? fs.readFileSync(process.argv[2], 'utf8') : undefined;
  const queries = ['scaling', 'recommendation', 'EST', '推荐', 'MoE', '混合专家',
    'knowledge distillation', '知识蒸馏', 'long sequence', '长序列', 'transfromer',
    '长序列 知识蒸馏', 'qzxvunknownzzz', ''];
  const samples = {};
  const querySamples = {};
  const record = (key, start) => (samples[key] ||= []).push(performance.now() - start);
  let work;
  for (let run = 0; run < 11; run++) {
    let start = performance.now();
    const app = await boot('https://example.test/Awesome-CTR-Scaling/zh.html', false, undefined, { source });
    record('boot_ms', start);
    for (const query of queries) {
      start = performance.now(); app.search(query);
      const elapsed = performance.now() - start;
      (samples.search_ms ||= []).push(elapsed);
      (querySamples[query] ||= []).push(elapsed);
    }
    start = performance.now();
    const before = { ...app.metrics };
    for (let page = 0; page < 4; page++) app.$('load-more').fire('click');
    record('load_30_to_150_ms', start);
    work = Object.fromEntries(Object.keys(before).map(key => [key, app.metrics[key] - before[key]]));
    if (!run) {
      for (const key of Object.keys(samples)) samples[key] = [];
      for (const key of Object.keys(querySamples)) querySamples[key] = [];
    }
  }
  // Isolate first-query and repeated-query work; boot cost is excluded here.
  const cold = {}, warm = {};
  for (let run = 0; run < 5; run++) {
    for (const query of queries) {
      const app = await boot('https://example.test/Awesome-CTR-Scaling/zh.html', false, undefined, { source });
      let start = performance.now(); app.search(query);
      (cold[query] ||= []).push(performance.now() - start);
      start = performance.now(); app.search(query);
      (warm[query] ||= []).push(performance.now() - start);
    }
  }
  const medians = data => Object.fromEntries(Object.entries(data).map(([key, values]) =>
    [key, +values.sort((a,b) => a-b)[Math.floor(values.length / 2)].toFixed(2)]));
  console.log(JSON.stringify({ runtime: process.version, runs: 10, medians: Object.fromEntries(
    Object.entries(samples).map(([key, values]) => [key, +values.sort((a,b) => a-b)[Math.floor(values.length / 2)].toFixed(2)])),
    search_by_query_ms: Object.fromEntries(Object.entries(querySamples).map(([key, values]) =>
      [key, +values.sort((a,b) => a-b)[Math.floor(values.length / 2)].toFixed(2)])),
    isolated_query_runs: 5, cold_query_ms: medians(cold), repeated_query_ms: medians(warm),
    load_30_to_150_work: work }, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
