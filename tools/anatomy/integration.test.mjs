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
test('Day 5 keeps 65 slides (4 hidden bonus) without Anatomy figures, and the former figure slides keep their content',()=>{
 const slides=context.window.SLIDES;
 assert.equal(slides.length,65);
 assert.equal(slides.filter(slide=>slide.visual?.anatomy).map(slide=>slide.title).join(', '),'');
 for(const title of ['MCP','Allow · ask · deny','subagents','eval','Watch: PASS and REJECTED']){
  const slide=slides.find(item=>item.title===title);
  assert.ok(slide,title);
  assert.ok((slide.cards?.length||slide.columns?.length)&&slide.notes&&slide.keyPoints.length,`${title} retains teaching content`);
 }
 for(const id of ['bottleneck','loop','mcp','hooks','subagents','eval'])assert.ok(existsSync(path.join(root,`assets/anatomy/${id}.html`)),id);
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
