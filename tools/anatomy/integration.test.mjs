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
test('Workshop 5 retains its six usable Anatomy figures',()=>{
 const mapping=['bottleneck','loop','mcp','hooks','subagents','eval'];
 const figures=context.window.SLIDES.filter(s=>s.visual?.anatomy);
 assert.equal(figures.length,mapping.length);
 for(const id of mapping){
  const slide=figures.find(s=>s.visual.anatomy.src===`assets/anatomy/${id}.html`);
  assert.ok(slide,`Missing ${id} figure`);
  const a=slide.visual.anatomy,query='';
  assert.equal(a.src,`assets/anatomy/${id}.html${query}`);
  assert.equal(a.poster,`assets/anatomy/${id}.svg`);
  for(const target of [a.src.split('?')[0],a.poster])assert.ok(existsSync(path.join(root,target)),target);
  assert.ok(a.title&&a.caption&&slide.notes&&slide.keyPoints.length,`${id} retains teaching content`);
 }
});
test('Workshop 4 wires its two Anatomy figures',()=>{
 const ctx={window:{}};vm.runInNewContext(read('workshop4-slides.js'),ctx);
 const figures=ctx.window.SLIDES.filter(s=>s.visual?.anatomy);
 assert.equal(figures.length,2);
 for(const id of ['agent-loop','permissions']){
  const slide=figures.find(s=>s.visual.anatomy.src===`assets/anatomy/${id}.html`);
  assert.ok(slide,`Missing ${id} figure`);
  const a=slide.visual.anatomy;
  assert.equal(a.src,`assets/anatomy/${id}.html`);assert.equal(a.poster,`assets/anatomy/${id}.svg`);
  for(const target of[a.src,a.poster,`assets/anatomy/${id}-light.html`])assert.ok(existsSync(path.join(root,target)),target);
  assert.ok(a.title&&a.caption&&slide.notes&&slide.keyPoints.length,`${id} retains teaching content`);
 }
});
test('Workshop 5 includes real console screenshots and all nine assignments',()=>{
 const slides=context.window.SLIDES;
 for(const name of ['start','diagnosis','refusal','approval','landed','resolved']){
  const src=`assets/workshop-5/console-${name}.png`;
  const slide=slides.find(s=>s.visual?.image===src);
  assert.ok(slide,src);
  assert.equal(slide.visual.opener,'showcase');
  assert.ok(slide.visual.imageAlt&&slide.notes,`${name} has context`);
  assert.ok(existsSync(path.join(root,src)),src);
 }
 for(let n=1;n<=9;n++) assert.equal(slides.filter(s=>s.title.startsWith(`Assignment ${n}:`)).length,1,`Assignment ${n}`);
 assert.ok(slides.every(s=>s.notes?.trim()),'Every slide has facilitator notes');
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
