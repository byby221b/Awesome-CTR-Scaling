'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { webcrypto } = require('node:crypto');
const { boot, catalog } = require('./frontend.test.cjs');
const tick = () => new Promise(resolve => setTimeout(resolve, 20));
const body = JSON.stringify(catalog);
const response = text => ({ ok: true, text: async () => text, arrayBuffer: async () => new TextEncoder().encode(text).buffer });
module.exports = async function () {
  const legacy = await boot(undefined, false, undefined, { legacyPage: true });
  assert.match(legacy.$('papers').textContent, /Refresh page version/);
  assert.equal(legacy.$('papers').getAttribute('aria-busy'), 'false');
  let resolveFetch, calls = 0;
  const app = await boot(undefined, false, undefined, { preview: true, fetch: () => {
    calls++; return new Promise(resolve => { resolveFetch = resolve; });
  }});
  assert.equal(app.cards().length, 1, 'static preview survives a pending full request');
  assert.equal(app.$('search-input').disabled, true);
  assert.equal(app.$('sort-select').disabled, true);
  assert.equal(app.$('papers').getAttribute('aria-busy'), 'true');
  app.flush(15000); await tick();
  assert.equal(app.cards().length, 1, 'timeout preserves preview');
  assert.match(app.$('load-status').textContent, /Try again/);
  const retry = app.walk(app.$('load-status')).find(n => n.tagName === 'BUTTON' && n.textContent === 'Try again');
  retry.fire('click'); assert.equal(calls, 2);
  resolveFetch(response(body)); await tick();
  assert.equal(app.cards().length, 30); assert.equal(app.$('search-input').disabled, false);
  assert.equal(app.$('load-status').hidden, true);
  assert.equal(app.$('search-input').listeners.input.length, 1);
  assert.equal(app.$('search-form').listeners.submit.length, 1);
  retry.fire('click'); await tick();
  resolveFetch(response(body)); await tick();
  assert.equal(app.$('search-input').listeners.input.length, 1, 'even a stale retry callback cannot duplicate controls');
  app.search('EST'); assert.equal(app.cards().length, 1);

  for (const route of ['index.html', 'zh.html']) {
    const relatedURL = 'https://example.test/Awesome-CTR-Scaling/' + route + '?collection=related';
    const related = await boot(relatedURL);
    assert.equal(related.$('tag-filter').disabled, true, 'related URL preserves conditional tag disabling');
    let fail = true;
    const recovering = await boot(relatedURL, false, undefined, {
      fetch: async () => fail ? { ok: false } : response(body)
    });
    assert.equal(recovering.$('tag-filter').disabled, true);
    fail = false;
    const retryRelated = recovering.walk(recovering.$('load-status')).find(n => n.tagName === 'BUTTON' && /Try again|重试/.test(n.textContent));
    retryRelated.fire('click'); await tick();
    assert.equal(recovering.cards().length, 30);
    assert.equal(recovering.$('search-input').disabled, false);
    assert.equal(recovering.$('tag-filter').disabled, true, 'retry preserves conditional tag disabling');
  }

  async function cached(hit, options = {}) {
    let network = 0, writes = 0, savedKey;
    const cache = { match: async () => hit, put: async (key, value) => {
      writes++; savedKey = key; assert.equal(await value.text(), body);
      if (options.quota) throw new Error('Quota exceeded');
    }};
    if (options.syncDenied) cache.put = () => { throw new Error('Storage revoked'); };
    const result = await boot(undefined, false, undefined, { crypto: webcrypto,
      caches: { open: async () => { if (options.denied) throw new Error('Storage denied'); return cache; } },
      fetch: async url => { network++; assert.match(url, /catalog.json\?v=[a-f0-9]{64}$/); return response(body); }, ...options });
    for (let i = 0; i < 20 && result.cards().length !== 30 && !result.logs.length; i++) await tick();
    return { result, network, writes, savedKey };
  }
  let test = await cached(response(body));
  assert.equal(test.network, 0); assert.equal(test.result.cards().length, 30);
  for (const hit of [response('{broken'), response('\uFEFF' + body), response(body.replace('Scaling', 'Forged!')),
    response(JSON.stringify({ ...catalog, meta: { ...catalog.meta, catalog_sha256: 'old' } })), undefined]) {
    test = await cached(hit); assert.equal(test.network, 1); assert.equal(test.result.cards().length, 30);
    assert.equal(test.writes, 1); assert.equal(test.savedKey, 'https://example.test/Awesome-CTR-Scaling/catalog.json');
  }
  test = await cached(undefined, { denied: true }); assert.equal(test.network, 1); assert.equal(test.result.cards().length, 30);
  test = await cached(undefined, { quota: true }); assert.equal(test.result.cards().length, 30);
  test = await cached(undefined, { syncDenied: true }); assert.equal(test.result.cards().length, 30);
  test = await cached(response(body), { crypto: undefined }); assert.equal(test.network, 1); assert.equal(test.writes, 0);
  test = await cached(response(body), { expectedPayload: body + ' ' });
  assert.equal(test.result.cards().length, 0); assert.equal(test.writes, 0);
  assert.match(test.result.$('load-status').textContent, /Refresh page version/);
  test = await cached(response(body), { expectedVersion: 'different-canonical-version' });
  assert.equal(test.result.cards().length, 0); assert.equal(test.writes, 0);
  test = await cached(undefined, { fetch: async () => ({ ok: false }) });
  assert.equal(test.writes, 0); assert.match(test.result.$('load-status').textContent, /Try again/);
  let slowNetwork = 0;
  const slow = await boot(undefined, false, undefined, { crypto: webcrypto,
    caches: { open: () => new Promise(() => {}) },
    fetch: async () => { slowNetwork++; return response(body); } });
  slow.flush(1000);
  for (let i = 0; i < 20 && slow.cards().length !== 30; i++) await tick();
  assert.equal(slowNetwork, 1); assert.equal(slow.cards().length, 30);
  const invalid = JSON.stringify({ ...catalog, schema_version: 999 });
  test = await cached(response(invalid), { payload: invalid, fetch: async () => response(invalid) });
  assert.equal(test.result.cards().length, 0); assert.equal(test.writes, 0);
  for (const lang of ['index.html', 'zh.html']) {
    const html = fs.readFileSync(path.join(__dirname, '../site', lang), 'utf8');
    const ids = [...html.matchAll(/data-preview-id="([^"]+)"/g)].map(match => match[1]);
    const ready = await boot('https://example.test/Awesome-CTR-Scaling/' + lang);
    assert.deepEqual(ids.map(id => 'paper-' + id.replace('.', '-')), ready.cards().map(card => card.id), 'preview matches actual default frontend ordering');
  }
  console.log('PASS: static preview/default order, pending/timeout/retry, disabled controls, cache hit/hash/version/corruption/denial/quota/no-crypto, failure not cached');
};
if (require.main === module) module.exports().catch(error => { console.error(error); process.exitCode = 1; });
