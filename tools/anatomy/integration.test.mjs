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
test('Workshop 5 opens with the AI SDLC before its tools and practice system',()=>{
 const slides=context.window.SLIDES;
 assert.deepEqual(Array.from(slides.slice(0,6),s=>s.title),[
  'Welcome to Workshop 5 · AI-native SDLC','Recap: from W4 agents to the AI SDLC','The lifecycle: AI assists, humans decide','Your assignment and definition of done','The practice system: two agents, one shop','Working boundaries'
 ]);
 const at=title=>slides.findIndex(s=>s.title===title);
 assert.ok(at('Your assignment and definition of done')<at('Open Claude Code'));
 assert.ok(at('Working boundaries')<at('Open Claude Code'));
 assert.ok(slides.slice(0,6).every(s=>s.teachingPhase==='core'));
 assert.match(slides[at('The practice system: two agents, one shop')].subtitle,/We change the SRE agent/);
});
test('Workshop 5 welcomes learners, recalls W4 and bridges to the next workshops without extra theory blocks',()=>{
 const slides=context.window.SLIDES;
 assert.equal(slides[0].visual.opener,'welcome');
 assert.match(slides[0].tagline,/10:00–16:00/);
 const recap=slides[1];
 assert.equal(recap.cards.length,2);
 assert.match(recap.tagline,/lesson or surprise from W4/);
 assert.match(recap.notes,/not a prerequisite for the solo route/);
 const agenda=slides.find(s=>s.title==='Your assignment and definition of done');
 assert.deepEqual(Array.from(agenda.cards,c=>c.title),['11:15 · Specify','13:00 · Build and verify','14:55 · Review and learn']);
 assert.match(agenda.tagline,/Lunch 12:00–13:00/);
 const close=slides.find(s=>s.title==='Show the completed lifecycle');
 assert.match(close.tagline,/W6.*W7/);
 assert.match(close.notes,/Revisit the delivery skill/);
});
test('Workshop 5 retains the diagrams used by the assignment and selected reference',()=>{
 const mapping=['loop','mcp','hooks','eval'];
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
 for(const name of ['console-start','console-diagnosis','console-refusal','console-approval','console-not-landed','shop-healthy','shop-broken']){
  const src=`assets/workshop-5/${name}.png`;
  const slide=slides.find(s=>s.visual?.image===src);
  assert.ok(slide,src);
  assert.equal(slide.visual.opener,'showcase');
  assert.ok(slide.visual.imageAlt&&slide.notes,`${name} has context`);
  assert.ok(existsSync(path.join(root,src)),src);
 }
 for(const title of ['Specify: start with an observed problem','Repair the tool: red → green','Repair the gate: refuse unsafe actions','Review the actual diff']) assert.equal(slides.filter(s=>s.title===title).length,1,title);
 assert.equal(slides.filter(s=>s.title.startsWith('Assignment ')).length,0);
 const setup=slides.find(s=>s.title==='Start the lab and check your starting point');
 assert.match(setup.notes,/npm run model:check/);
 assert.match(setup.notes,/npm start -- --fast/);
 const assistant=slides.find(s=>s.title==='Open Claude Code');
 assert.ok(assistant.steps.some(s=>s.includes('.lab/checkpoints/start')&&s.includes('claude')));
 assert.ok(assistant.repo.url.endsWith('/CARD.md'));
 assert.ok(slides.some(s=>s.title==='Hooks: allow, ask, deny'));
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
 const close=at('Show the completed lifecycle');
 assert.equal(close,31);
 assert.equal(slides.length,39);
 assert.ok(slides.slice(0,close+1).every(s=>s.teachingPhase==='core'));
 assert.ok(slides.slice(close+1).every(s=>s.teachingPhase==='optional'&&s.kicker.includes('REFERENCE ONLY')));
 for(const sequence of [
  ['Your assignment and definition of done','The practice system: two agents, one shop','Working boundaries','Open Claude Code','First assignment: understand before editing','Start the lab and check your starting point'],
  ['Specify: start with an observed problem','Create one fault and observe detection','Check the diagnosis against the evidence','Turn the finding into an intent','Accept the assignment before building'],
  ['Establish a reviewable starting point','Ask for a small plan, then review it','Understand the tool before repair','Repair the tool: red → green','Check the change on the same incident','Understand the human approval gate','Repair the gate: refuse unsafe actions','Verify the complete change'],
  ['Verify the complete change','Review the actual diff','Prepare the PR and make a release decision','Observe runtime with separate permission','Recovery: confirmed or not confirmed?','Turn the observation into the next task','Continue independently','Show the completed lifecycle'],
 ]){
  for(let i=1;i<sequence.length;i++)assert.ok(at(sequence[i-1])<at(sequence[i]),`${sequence[i-1]} before ${sequence[i]}`);
 }
 for(const title of ['skills','Hooks: allow, ask, deny','One loop first; subagents for a reason','CI: repeat the checks'])assert.ok(at(title)>close,title);
 const core3=slides.slice(at('Review the actual diff'),close+1);
 assert.ok(core3.every(s=>!s.title.startsWith('Repair')));
 assert.match(slides[at('Check the change on the same incident')].steps.join(' '),/same incident/);
 assert.match(slides[at('Repair the gate: refuse unsafe actions')].steps.join(' '),/Review the gate plan before/);
 const verify=slides[at('Verify the complete change')];
 assert.equal(verify.type,'practice');
 assert.match(verify.steps.join(' '),/npm run verify/);
 assert.match(verify.steps.join(' '),/npm run test:workshop/);
 assert.match(verify.steps.join(' '),/npm run test:hooks/);
 const recovery=slides[at('Recovery: confirmed or not confirmed?')];
 assert.match(JSON.stringify(recovery.cards),/LANDED/);
 assert.match(JSON.stringify(recovery.cards),/Keep the incident open/);
 assert.match(JSON.stringify(recovery.cards),/never retry for green/);
 const main=JSON.stringify(slides.slice(0,close+1));
 assert.doesNotMatch(main,/w5-step-|npm run shop, npm run traffic/);
 assert.match(main,/Each stage leaves evidence for a human decision/);
 assert.match(main,/not model quality/);
});
test('Workshop 5 requires AI-SDLC artifacts before the closing reflection',()=>{
 const slides=context.window.SLIDES;
 const core=slides.filter(s=>s.teachingPhase==='core');
 const text=JSON.stringify(core);
 for(const artifact of ['intent.md','docs/plan.md','REVIEW.md','docs/verify/sdlc.md','workshop-base','RELEASE BLOCKED'])assert.ok(text.includes(artifact),artifact);
 for(const title of ['Turn the finding into an intent','Establish a reviewable starting point','Review the actual diff','Prepare the PR and make a release decision','Turn the observation into the next task']){
  const slide=core.find(s=>s.title===title);
  assert.equal(slide?.type,'practice',title);
  assert.ok(slide.steps.length>=3,title);
 }
 assert.match(core.find(s=>s.title==='The practice system: two agents, one shop').notes,/rollback is not a software release/);
 assert.doesNotMatch(text,/plan\.md is optional|Git approval gate is optional depth/);
 assert.doesNotMatch(JSON.stringify(slides),/Scripted runtime \(a model is optional\)/);
});
test('Workshop 5 starts Claude Code early and provides the SRE solo route',()=>{
 const slides=context.window.SLIDES;
 const at=title=>slides.findIndex(s=>s.title===title);
 assert.ok(at('Open Claude Code')>at('Your assignment and definition of done'));
 assert.ok(at('First assignment: understand before editing')<at('Start the lab and check your starting point'));
 assert.ok(at('Continue independently')<at('Show the completed lifecycle'));
 const solo=slides[at('Continue independently')];
 assert.equal(solo.repo.url,'https://github.com/RyanLisse/sre-oncall-agent/blob/main/SOLO.md');
 const setup=slides[at('Start the lab and check your starting point')];
 assert.match(setup.notes,/no automatic offline fallback/i);
 assert.doesNotMatch(setup.subtitle,/Offline|No API key/);
 for(const slide of slides.filter(s=>s.visual?.image?.includes('/console-'))){
  assert.match(slide.visual.imageLink,/earlier offline capture/);
 }
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
 assert.equal(screenshots.length,7);
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
