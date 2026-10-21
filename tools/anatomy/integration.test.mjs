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
test('Workshop 5 includes real console screenshots and three core tasks',()=>{
 const slides=context.window.SLIDES;
 for(const name of ['start','diagnosis','refusal','approval','landed','resolved']){
  const src=`assets/workshop-5/console-${name}.png`;
  const slide=slides.find(s=>s.visual?.image===src);
  assert.ok(slide,src);
  assert.equal(slide.visual.opener,'showcase');
  assert.ok(slide.visual.imageAlt&&slide.notes,`${name} has context`);
  assert.ok(existsSync(path.join(root,src)),src);
 }
 for(let n=1;n<=3;n++) assert.equal(slides.filter(s=>s.title.startsWith(`Core task ${n}:`)).length,1,`Core task ${n}`);
 assert.equal(slides.filter(s=>s.title.startsWith('Assignment ')).length,0);
 const map=slides.find(s=>s.title==='One ticket, three core tasks');
 assert.equal(map.items.length,3);
 assert.ok(slides.find(s=>s.title==='Start here: one command').steps.some(s=>s.includes('npm start')));
 assert.ok(slides.some(s=>s.title==='Optional: Wire and prove the controls'));
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
 assert.equal(screenshots.length,6);
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
