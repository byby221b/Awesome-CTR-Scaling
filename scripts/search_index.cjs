/* Build body search fields using the exact browser text/TeX normalization. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(require.main === module && process.argv[2] ? process.argv[2] : path.join(__dirname, '../web/app.js'), 'utf8');
function section(start, end) {
  const a = source.indexOf(start), b = source.indexOf(end, a);
  if (a < 0 || b < a) throw new Error('Search normalization boundaries changed');
  return source.slice(a, b);
}
const build = vm.runInNewContext(
  section('  function normalizeSearch(value)', '  function normalizeSearchQuery') +
  section('  function appendSourceText(', '  function appendReadingPreview(') +
  `papers => papers.map(p => ({id:p.id, texts:[p.original_abstract?.text,
    verifiedSummary(p,'en')?.text, verifiedSummary(p,'zh')?.text]
    .filter(v => v !== undefined && v !== null && v !== '').map(normalizeIndexedText)}))`,
  { tr: en => en });
module.exports = papers => JSON.parse(JSON.stringify(build(papers)));
if (require.main === module) {
  process.stdout.write(JSON.stringify(module.exports(JSON.parse(fs.readFileSync(0,'utf8')))));
}
