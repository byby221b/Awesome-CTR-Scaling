'use strict';
const { createHash } = require('node:crypto');
const buildIndex = require('../scripts/search_index.cjs');
module.exports = data => {
  const files = new Map();
  const envelope = { schema: 1, search_version: 1, catalog_sha256: data.meta.catalog_sha256 };
  function asset(kind, value) {
    const body = JSON.stringify(value) + '\n';
    const sha256 = createHash('sha256').update(body).digest('hex');
    const path = `assets/${kind}-${sha256}.json`;
    files.set(path, body); return {path, sha256};
  }
  const details = [];
  for (let i = 0; i < data.papers.length; i += 24) {
    const group = data.papers.slice(i,i+24);
    details.push({...asset('details',{...envelope,papers:group.map(p=>({id:p.id,original_abstract:p.original_abstract,summaries:p.summaries}))}),ids:group.map(p=>p.id)});
  }
  const directory = asset('directory',{...data,...envelope,papers:data.papers.map(p=>{
    const { original_abstract, summaries, ...rest } = p;
    return {...rest,original_abstract:original_abstract && {source_title:original_abstract.source_title,status:original_abstract.status,language:original_abstract.language}};
  })});
  const search = asset('search',{...envelope,papers:buildIndex(data.papers)});
  const version = asset('version',{...envelope,directory,search,details,paper_count:data.papers.length});
  return {files,version};
};
