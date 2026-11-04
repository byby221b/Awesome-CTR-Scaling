'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { boot } = require('./frontend.test.cjs');
const ROOT = path.join(__dirname, '..');
const tick = () => new Promise(resolve => setTimeout(resolve, 10));
async function until(fn) { for (let n=0;n<400;n++) { if(fn()) return; await tick(); } assert.fail('Layer did not settle'); }
const reply = body => ({ ok:true,arrayBuffer:async()=>new TextEncoder().encode(body).buffer });
function transport() {
  const calls=[]; let resolveSearch; let failSearch=false, failDetails=false, holdDetails=false;
  const detailReplies=[];
  const observers=[];
  class Observer {
    constructor(callback) { this.callback=callback; this.nodes=[]; observers.push(this); }
    observe(node) { this.nodes.push(node); }
    unobserve(node) { this.nodes=this.nodes.filter(x=>x!==node); }
    disconnect() { this.nodes=[]; }
  }
  const fetch = async url => {
    const relative = new URL(url).pathname.split('/').slice(-2).join('/');
    calls.push(relative);
    const body=fs.readFileSync(path.join(ROOT,'site',relative),'utf8');
    if (relative.includes('/search-')) return new Promise(resolve=>{resolveSearch=()=>resolve(failSearch?{ok:false}:reply(body));});
    if (relative.includes('/details-') && failDetails) return {ok:false};
    if (relative.includes('/details-') && holdDetails) return new Promise(resolve=>detailReplies.push(()=>resolve(reply(body))));
    return reply(body);
  };
  return {calls,fetch,Observer,observers,detailReplies,holdDetails:value=>{holdDetails=value;},release:()=>resolveSearch(),searchWaiting:()=>Boolean(resolveSearch),
    failSearch:value=>{failSearch=value;}, failDetails:value=>{failDetails=value;},
    visible(count=1) { for(const observer of observers) for(const node of observer.nodes.slice(0,count)) observer.callback([{target:node,isIntersecting:true}]); }};
}
function ids(app) {
  while(!app.$('load-more').hidden && !app.$('pagination').hidden) app.$('load-more').fire('click');
  return app.cards().map(card=>card.id);
}
module.exports=async()=>{
  for(const language of ['index.html','zh.html']) {
    const t=transport();
    const app=await boot('https://example.test/Awesome-CTR-Scaling/'+language,false,undefined,{layered:true,fetch:t.fetch,IntersectionObserver:t.Observer});
    await until(()=>app.$('load-status').hidden && t.searchWaiting());
    assert.equal(app.cards().length,30); assert.equal(app.$('sort-select').disabled,false); assert.equal(app.$('search-input').disabled,true);
    assert.equal(t.calls.filter(x=>x.includes('/details-')).length,0,'offscreen details are not downloaded');
    const card=app.cards()[0]; card.focus();
    const order=app.cards().map(c=>c.id),count=app.$('result-count').textContent;
    t.visible(2); await until(()=>app.walk(card).some(n=>n.className==='abstract-text reading-preview is-collapsed'||n.classList.contains('abstract-text')));
    assert.equal(app.cards()[0],card); assert.equal(app.active(),card); assert.deepEqual(app.cards().map(c=>c.id),order); assert.equal(app.$('result-count').textContent,count);
    assert(t.calls.filter(x=>x.includes('/details-')).length<=2);
    app.change('sort-select','title');
    const current=app.cards()[0]; t.visible(1); await tick(); assert.equal(app.cards()[0],current);
    t.release(); await until(()=>!app.$('search-input').disabled);
    assert.equal(app.$('sort-select').value,'title','index arrival does not reset sort');
    const baseline=await boot('https://example.test/Awesome-CTR-Scaling/'+language);
    app.change('sort-select','relevance');
    const queries=['EST','MoE','混合专家','DIN','PLE','DIEN','MMoE','HSTV','FM','知识蒸馏','knowledge distillation','长序列','long sequence','transfromer','长序列 知识蒸馏','FP8 训练后量化','线性注意力 量化','2610.32098','2602.10811','https://arxiv.org/abs/2602.10811v1','qzxvunknownzzz','scaling','recommendation','Transformer','quantization','多任务 多场景'];
    for(const q of queries) { baseline.search(q); app.search(q); assert.deepEqual(ids(app),ids(baseline),`${language}: full ordered-ID parity ${q}`); }
    assert.equal(t.calls.filter(x=>x.includes('/search-')).length,1);
  }
  // Intent remains in URL/state while full text is pending. Clear wins over old responses.
  const t=transport();
  const app=await boot('https://example.test/Awesome-CTR-Scaling/zh.html?q=EST',false,undefined,{layered:true,fetch:t.fetch,IntersectionObserver:t.Observer});
  await until(()=>t.searchWaiting());
  assert.equal(app.cards().length,0); assert.equal(app.$('result-count').textContent,'…');
  app.change('sort-select','title'); app.back(); app.forward();
  app.window.history.pushState({},'', '?q=MoE'); app.back(); app.forward();
  assert(app.$('language-switch').href.includes('q=MoE'));
  app.hash('#paper-2602-10811'); assert(app.window.location.search.includes('q=MoE'),'hash does not erase pending query');
  const clear=app.walk(app.$('search-status')).find(n=>n.tagName==='BUTTON');clear.fire('click');
  assert.equal(app.cards().length,30); assert.equal(app.$('search-input').value,'');
  t.release(); await until(()=>!app.$('search-input').disabled);
  assert.equal(app.$('search-input').value,''); assert.equal(app.cards().length,30);
  // Search failure is independent of browsing and independently retryable.
  const f=transport(); f.failSearch(true);
  const failed=await boot(undefined,false,undefined,{layered:true,fetch:f.fetch,IntersectionObserver:f.Observer});
  await until(()=>f.searchWaiting()); f.release(); await until(()=>failed.$('search-status').textContent.includes('Retry'));
  assert.equal(failed.cards().length,30); failed.change('sort-select','title');
  f.failSearch(false); failed.walk(failed.$('search-status')).find(n=>n.tagName==='BUTTON').fire('click');
  await tick(); f.release(); await until(()=>!failed.$('search-input').disabled);
  // Detail errors are download failures, not fabricated source-status gaps.
  f.failDetails(true); f.visible(1);
  await until(()=>failed.$('papers').textContent.includes('Abstract download failed'));
  const retry=failed.walk(failed.$('papers')).find(n=>n.tagName==='BUTTON'&&n.textContent==='Retry abstracts');
  f.failDetails(false); retry.fire('click'); retry.fire('click');
  await until(()=>!failed.$('papers').textContent.includes('Abstract download failed'));
  // Out-of-order responses cannot attach to cards removed by a new sort.
  const racing=transport();racing.holdDetails(true);
  const races=await boot(undefined,false,undefined,{layered:true,fetch:racing.fetch,IntersectionObserver:racing.Observer});
  await until(()=>racing.searchWaiting());racing.release();await until(()=>!races.$('search-input').disabled);
  const staleCard=races.cards()[0];racing.visible(30);await until(()=>racing.detailReplies.length>0);
  assert(racing.calls.filter(x=>x.includes('/details-')).length<=3,'detail concurrency is bounded at three');
  races.change('sort-select','title');const stable=races.cards()[0];stable.focus();
  racing.holdDetails(false);
  for(const resolve of racing.detailReplies.reverse())resolve();
  await tick();await tick();
  assert.equal(races.cards()[0],stable);assert.equal(races.active(),stable);
  assert(!staleCard.textContent.includes('Original source'),'stale response never fills removed cards');
  racing.visible(1);await tick();
  // A fresh pending detail request has its own timeout/retry, without changing search state.
  races.change('sort-select','original');racing.holdDetails(true);racing.visible(30);
  await tick();races.flush(15000);await tick();
  const failedDetail=races.walk(races.$('papers')).find(n=>n.tagName==='BUTTON'&&n.textContent==='Retry abstracts');
  assert(failedDetail, 'detail timeout exposes a retry');
  {
    const before=races.cards().map(c=>c.id);racing.holdDetails(false);
    for(const resolve of racing.detailReplies) resolve();
    failedDetail.focus();failedDetail.fire('click');
    await until(()=>races.walk(races.active()).some(n=>n.className==='summary-panel'));
    assert.deepEqual(races.cards().map(c=>c.id),before);
    assert.equal(races.active().className,'detail-content');
  }
  // Verified immutable resources can be reused without downloading the index again.
  const stored=new Map();
  const cache={match:async key=>stored.has(key)?new Response(stored.get(key)):undefined,
    put:async(key,response)=>{stored.set(key,await response.arrayBuffer());},
    keys:async()=>[...stored.keys()],delete:async key=>stored.delete(key)};
  const caches={open:async name=>{assert.equal(name,'ctr-layered-public-v2-/Awesome-CTR-Scaling/');return cache;}};
  const cold=transport();
  const first=await boot(undefined,false,undefined,{layered:true,fetch:cold.fetch,IntersectionObserver:cold.Observer,caches});
  await until(()=>cold.searchWaiting());cold.release();await until(()=>!first.$('search-input').disabled&&stored.size===3);
  const warm=transport();
  const second=await boot(undefined,false,undefined,{layered:true,fetch:warm.fetch,IntersectionObserver:warm.Observer,caches});
  await until(()=>second.$('load-status').hidden&&!second.$('search-input').disabled);
  assert.equal(warm.calls.length,0,'verified warm startup performs no asset network calls');
  const directoryKey=[...stored.keys()].find(k=>k.endsWith('/cache-slot/1'));
  stored.set(directoryKey,new TextEncoder().encode('corrupt').buffer);
  const recover=transport();
  const third=await boot(undefined,false,undefined,{layered:true,fetch:recover.fetch,IntersectionObserver:recover.Observer,caches});
  await until(()=>third.$('load-status').hidden&&!third.$('search-input').disabled);
  assert.equal(recover.calls.length,1);assert(recover.calls[0].includes('/directory-'));
  assert([...stored.keys()].every(key=>/\/cache-slot\/(?:[0-9]|[1-5][0-9]|6[0-3])$/.test(key)));
  let forbiddenReads=0;
  const unsupported=await boot(undefined,false,undefined,{layered:true,crypto:null,preview:true,
    fetch:async()=>{forbiddenReads++;throw Error('No unverified fetch');},
    caches:{open:async()=>{forbiddenReads++;throw Error('No unverified cache');}}});
  await until(()=>unsupported.logs.length>0);
  assert.equal(forbiddenReads,0);assert.equal(unsupported.cards().length,1);
  assert.match(unsupported.$('load-status').textContent,/couldn’t be loaded/);
  console.log('PASS: layered ordered-ID parity EN/ZH, directory before index/details, viewport loading, independent failures/retry, pending query/back/forward/hash/clear, identity and focus retention');
};
if(require.main===module)module.exports().catch(e=>{console.error(e);process.exitCode=1;});
