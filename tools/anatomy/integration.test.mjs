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
  const beats=new Set(slides.filter(slide=>slide.stage===stage).map(slide=>slide.beat));
  for(const beat of ['concept','what','demo','turn','check','discuss'])assert.ok(beats.has(beat),`${stage} has ${beat}`);
 }
 assert.ok(slides.every(slide=>slide.teach?.script?.length&&slide.teach.do?.length),'every slide has actionable presenter guidance');
 assert.ok(slides.every(slide=>slide.teach.script.every(item=>!/^\d{1,2}:?$/.test(item.say||item.do||'')&&!/:\s*$/.test(item.say||item.do||''))),'presenter guidance keeps times and ports intact');
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
});
