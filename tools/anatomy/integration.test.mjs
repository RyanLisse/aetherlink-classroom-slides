import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const read=name=>readFileSync(path.join(root,name),'utf8');
const context={window:{}};
vm.runInNewContext(read('workshop5-slides.js'),context);
test('Day 5 keeps the 80-slide SRE route without Anatomy figures',()=>{
 const slides=context.window.SLIDES;
 assert.equal(slides.length,80);
 assert.equal(slides.filter(slide=>slide.visual?.anatomy).map(slide=>slide.title).join(', '),'');
 for(const stage of ['setup','plan','design','controls','diagnose','test','gate','maintain']){
  const route=slides.filter(slide=>slide.stage===stage).map(slide=>slide.beat);
  const beats=new Set(route);
  for(const beat of ['concept','what','demo','turn','check','discuss'])assert.ok(beats.has(beat),`${stage} has ${beat}`);
  const rank=new Map([['concept',0],['what',1],['demo',2],['turn',3],['check',4],['discuss',5]]);
  assert.equal(route.join(','),[...route].sort((left,right)=>rank.get(left)-rank.get(right)).join(','),`${stage} follows the teaching loop`);
  assert.ok(slides.some(slide=>slide.stage===stage&&slide.beat==='demo'&&slide.teach.script.some(item=>item.clip)),`${stage} demo has presenter video`);
 }
 assert.ok(slides.every(slide=>slide.teach?.script?.length&&slide.teach.do?.length),'every slide has actionable presenter guidance');
 assert.ok(slides.every(slide=>slide.teach.script.every(item=>!/^\d{1,2}:?$/.test(item.say||item.do||'')&&!/:\s*$/.test(item.say||item.do||''))),'presenter guidance keeps times and ports intact');
 slides.forEach((slide,index)=>assert.equal(slide.teach.next,slides[index+1]?.title,`${slide.title} points to the actual next slide`));
 assert.ok(slides.filter(slide=>slide.stage==='controls'&&['concept','what','demo'].includes(slide.beat)).every(slide=>slide.notes.startsWith('Controls block · before Assignment 4.')),'reordered controls slides do not retain backwards clock times');
 assert.equal(slides.filter(slide=>slide.teach.do.some(action=>/connect it to the next participant decision/.test(action))).length,0,'presenter actions are slide-specific');
 for(const generic of ['Connect the artifact to its assignment.','Inspect the participant’s own evidence.','Compare evidence in pairs.']){
  assert.equal(slides.filter(slide=>slide.teach.do.includes(generic)).length,0,`no generic presenter action: ${generic}`);
 }
 for(const title of ['MCP','Allow · ask · deny','subagents','eval: the bench']){
  const slide=slides.find(item=>item.title===title);
  assert.ok(slide,title);
  assert.ok((slide.cards?.length||slide.columns?.length)&&slide.notes&&slide.keyPoints.length,`${title} retains teaching content`);
 }
});
test('Presenter uses posters before the legacy bot renderer',()=>{
 const app=read('app.js');
 const anatomy=app.indexOf('if (v.anatomy)');
 const embed=app.indexOf('if (EMBED)',anatomy);
 const bot=app.indexOf('const bot = BOTS[v.bot]',anatomy);
 assert.ok(anatomy>0&&embed>anatomy&&bot>embed);
 assert.ok(app.slice(anatomy,bot).includes('img.src = a.poster'));
 assert.ok(app.slice(anatomy,bot).includes('frame.src = a.src'));
});
test('Classroom and presenter reference the same cached slide and style versions',()=>{
 const main=read('workshop5.html'),presenter=read('workshop5-presenter.html');
 for(const asset of ['styles.css','workshop5-slides.js']){
  const extract=html=>html.match(new RegExp(asset.replace('.','\\.')+'\\?v=([^"\\s]+)'))?.[1];
  assert.ok(extract(main),asset);assert.equal(extract(main),extract(presenter),asset);
 }
 assert.match(presenter,/video\/webm/);
 assert.match(presenter,/video\/mp4/);
 assert.match(presenter,/assets\/day5-teach\//);
});
