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
test('Workshop 5 keeps 70 slides and draws its concept figures as built diagrams',()=>{
 assert.equal(context.window.SLIDES.length,70);
 const dctx={window:{}};vm.runInNewContext(read('workshop5-diagrams.js'),dctx);const D=dctx.window.ALS_DIAGRAMS;
 const mapping=[[9,'bottleneck'],[11,'loop'],[12,'line-loop'],[31,'control-loop'],[39,'mcp'],[44,'hooks'],[49,'subagents'],[53,'eval']];
 for(const[number,id]of mapping){
  const slide=context.window.SLIDES[number-1],d=slide.visual.diagram;
  assert.equal(slide.visual.anatomy,undefined,`Slide ${number} has no Anatomy figure`);
  assert.equal(d.id,id);assert.equal(typeof D[id],'function',id);
  const out=D[id](slide);assert.match(out.viewBox,/^0 0 1280 \d+$/);assert.ok(out.svg.includes('dg-step'),id);
  assert.ok(d.title&&slide.notes&&slide.keyPoints.length,`Slide ${number} retains teaching content`);
 }
 const m=context.window.SLIDES[30].visual.media;
 assert.equal(m.type,'video');for(const f of[m.src,m.poster])assert.ok(existsSync(path.join(root,f)),f);
 assert.ok(read('workshop5.html').includes('workshop5-diagrams.js'));
});
test('Workshop 4 wires its two Anatomy figures',()=>{
 const ctx={window:{}};vm.runInNewContext(read('workshop4-slides.js'),ctx);
 assert.equal(ctx.window.SLIDES.length,56);
 for(const[number,id]of[[13,'agent-loop'],[42,'permissions']]){
  const slide=ctx.window.SLIDES[number-1],a=slide.visual.anatomy;
  assert.equal(a.src,`assets/anatomy/${id}.html`);assert.equal(a.poster,`assets/anatomy/${id}.svg`);
  for(const target of[a.src,a.poster,`assets/anatomy/${id}-light.html`])assert.ok(existsSync(path.join(root,target)),target);
  assert.ok(a.title&&a.caption&&slide.notes&&slide.keyPoints.length,`Slide ${number} retains teaching content`);
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
