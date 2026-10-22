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
test('Workshop 5 retains all eight built diagrams and the control-loop video',()=>{
 const mapping=['bottleneck','loop','line-loop','control-loop','mcp','hooks','subagents','eval'];
 const dctx={window:{}};vm.runInNewContext(read('workshop5-diagrams.js'),dctx);
 const figures=context.window.SLIDES.filter(s=>s.visual?.diagram);
 assert.equal(figures.length,mapping.length);
 for(const id of mapping){
  const slide=figures.find(s=>s.visual.diagram.id===id);
  assert.ok(slide,`Missing ${id} figure`);
  const output=dctx.window.ALS_DIAGRAMS[id](slide);
  assert.match(output.viewBox,/^0 0 1280 \d+$/);
  assert.match(output.svg,/dg-step/);
  assert.ok(slide.visual.diagram.title&&slide.notes&&slide.keyPoints.length,`${id} retains teaching content`);
 }
 const media=figures.find(s=>s.visual.diagram.id==='control-loop').visual.media;
 assert.equal(media.type,'video');
 for(const target of [media.src,media.poster])assert.ok(existsSync(path.join(root,target)),target);
 assert.ok(read('workshop5.html').includes('workshop5-diagrams.js'));
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
test('Workshop 5 includes both UIs and the current card/checkpoint route',()=>{
 const slides=context.window.SLIDES;
 for(const name of ['console-start','console-diagnosis','console-refusal','console-approval','console-landed','console-resolved','shop-healthy','shop-broken']){
  const src=`assets/workshop-5/${name}.png`;
  const slide=slides.find(s=>s.visual?.image===src);
  assert.ok(slide,src);
  assert.equal(slide.visual.opener,'showcase');
  assert.ok(slide.visual.imageAlt&&slide.notes,`${name} has context`);
  assert.ok(existsSync(path.join(root,src)),src);
 }
 for(const title of ['Core 1: Investigate the evidence','Core 2: Build a change safely','Core 3: Judge the recovery']) assert.equal(slides.filter(s=>s.title===title).length,1,title);
 assert.equal(slides.filter(s=>s.title.startsWith('Assignment ')).length,0);
 const map=slides.find(s=>s.title==='One ticket, three core tasks');
 assert.equal(map.items.filter(item=>item.label.startsWith('Core ')).length,3);
 assert.equal(map.items.filter(item=>item.label==='Optional depth').length,1);
 const setup=slides.find(s=>s.title==='Start the lab');
 assert.ok(setup.steps.some(s=>s.includes('npm start')));
 assert.match(setup.cards[0].body,/npm run checkpoint -- start\ncd \.lab\/checkpoints\/start\nnpm start -- --fast/);
 assert.ok(slides.some(s=>s.title==='Go deeper: your own guard rule (optional)'));
 assert.doesNotMatch(JSON.stringify(slides),/starter\.zip|checkpoint\.zip|git switch -c my\/workshop-5 w5-core-start/);
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
test('Workshop 5 teaches concepts at use and keeps optional depth after the close',()=>{
 const slides=context.window.SLIDES;
 const at=title=>{const index=slides.findIndex(s=>s.title===title);assert.ok(index>=0,title);return index;};
 const close=at('Close: show what you can now prove');
 assert.ok(slides.slice(0,close+1).every(s=>s.teachingPhase==='core'));
 assert.ok(slides.slice(close+1).every(s=>s.teachingPhase==='optional'&&s.kicker.includes('OPTIONAL DEPTH')));
 for(const sequence of [
  ['Goal of the day','Why build an on-call agent?','The shop: what customers see','Start the lab'],
  ['Core 1: Investigate the evidence','Before the fault: how detection works','Break the shop, then inspect the incident','Before the diagnosis: evidence and data gaps','Before you record: evidence, not a done marker','Core 1: Check the claims'],
  ['Core 2: Why this change','CLAUDE.md','Before code: a small plan','MCP','Watch: the tools in the trace','eval: the bench','Core 2: Build a change safely','Core 2: Prove it on the live incident'],
  ['Human gate: approval is not execution','Core 3: Judge the recovery','Recovery result: inspect every check','Core 3: Close it, or stop safely','Closure result: a human records the lesson','The AI-native loop','Close: show what you can now prove'],
 ]){
  for(let i=1;i<sequence.length;i++)assert.ok(at(sequence[i-1])<at(sequence[i]),`${sequence[i-1]} before ${sequence[i]}`);
 }
 for(const title of ['skills','hooks','subagents','The gate + REVIEW.md'])assert.ok(at(title)>close,title);
 const main=JSON.stringify(slides.slice(0,close+1));
 assert.doesNotMatch(main,/w5-step-|npm run shop, npm run traffic/);
 assert.match(main,/What proves it/);
 assert.match(main,/not model quality/);
});
test('Classroom and presenter reference the same cached slide and style versions',()=>{
 const main=read('workshop5.html'),presenter=read('workshop5-presenter.html');
 for(const asset of ['styles.css','workshop5-slides.js']){
  const extract=html=>html.match(new RegExp(asset.replace('.','\\.')+'\\?v=([^"\\s]+)'))?.[1];
  assert.ok(extract(main),asset);assert.equal(extract(main),extract(presenter),asset);
 }
});
function renderShowcase(visual){
 const app=read('app.js'),nodeSource=app.match(/function node\(tag, cls, text\) \{[^\n]*\}/)?.[0];
 const start=app.indexOf('function buildOpener('),end=app.indexOf('\nfunction rel(',start);
 assert.ok(nodeSource&&start>=0&&end>start);
 const document={createElement(tag){return{
  tag,children:[],attributes:{},classList:{add(){}},
  append(...children){this.children.push(...children)},
  prepend(...children){this.children.unshift(...children)},
  setAttribute(name,value){this.attributes[name]=value}
 }}};
 const vmContext={document};
 vm.runInNewContext(`${nodeSource}\n${app.slice(start,end)}\nthis.renderShowcase=buildOpener;`,vmContext);
 const main=document.createElement('main');
 vmContext.renderShowcase({querySelector:()=>document.createElement('header')},main,{},visual);
 const link=main.children[0].children[1],img=link.children[0];
 return{label:link.attributes['aria-label'],href:link.href,target:link.target,rel:link.rel,imageAlt:img.alt};
}
test('Showcase links describe their image and preserve full-size navigation',()=>{
 const screenshots=context.window.SLIDES.filter(s=>s.visual?.opener==='showcase'&&s.visual.image);
 assert.equal(screenshots.length,8);
 const labels=screenshots.map(({visual})=>{
  const rendered=renderShowcase(visual);
  assert.equal(rendered.label,`${visual.imageAlt}: Open screenshot at full size`);
  assert.equal(rendered.href,visual.image);
  assert.equal(rendered.target,'_blank');
  assert.equal(rendered.rel,'noopener');
  assert.equal(rendered.imageAlt,visual.imageAlt);
  return rendered.label;
 });
 assert.equal(new Set(labels).size,screenshots.length);
 const legacyContext={window:{}};
 vm.runInNewContext(read('workshop3-slides.js'),legacyContext);
 const legacy=legacyContext.window.SLIDES.find(s=>s.visual?.opener==='showcase'&&s.visual.image).visual;
 assert.ok(legacy);
 assert.equal(Object.hasOwn(legacy,'imageAlt'),false);
 for(const visual of [{...legacy,imageAlt:''},legacy]){
  const rendered=renderShowcase(visual);
  assert.equal(rendered.label,'Open screenshot at full size');
  assert.equal(rendered.href,visual.image);
  assert.equal(rendered.target,'_blank');
  assert.equal(rendered.rel,'noopener');
  assert.equal(rendered.imageAlt,visual.imageAlt||'');
 }
});
