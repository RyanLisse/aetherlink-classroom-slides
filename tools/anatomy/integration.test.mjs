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
test('Day 5 keeps the approved A1-A9 build route without Anatomy figures',()=>{
 const slides=context.window.SLIDES;
 assert.ok(slides.length>0,'Day 5 deck loads');
 assert.equal(slides.filter(slide=>slide.visual?.anatomy).length,0,'Day 5 has no Anatomy figures');
 assert.ok(slides.every(slide=>typeof slide.notes==='string'&&slide.notes.trim()),'every slide has speaker notes');
 assert.ok(slides.every(slide=>slide.teach?.script?.length),'every slide has a presenter teach card');
 assert.ok(slides.every(slide=>slide.teach?.do?.length&&slide.teach?.done?.length),'every teach card has an action and stop result');
 assert.ok(slides.slice(0,-1).every((slide,index)=>slide.teach.next===slides[index+1].title),'teach.next follows the slide order');

 let promptCount=0;
 for(let number=1;number<=9;number+=1){
  const prefix=`W5 · A${number} ·`;
  const route=slides.filter(slide=>slide.kicker?.startsWith(prefix));
  assert.ok(route.some(slide=>slide.beat==='concept'),`A${number} has a concept slide`);
  const demos=route.filter(slide=>slide.beat==='demo');
  assert.equal(demos.length,1,`A${number} has one illustrative demo`);
  assert.match(demos[0].teach.script.find(item=>item.clip)?.clip||'',new RegExp(`/a${number}\\.mp4$`),`A${number} demo uses its video`);
  const exercises=route.filter(slide=>slide.beat==='turn');
  assert.ok(exercises.length>=1,`A${number} has a participant exercise`);
  for(const exercise of exercises){
   const prompts=(exercise.steps||[]).filter(step=>typeof step.prompt==='string'&&step.prompt.trim());
   assert.ok(prompts.length>=1,`${exercise.title} has a copy-ready prompt`);
   promptCount+=prompts.length;
  }
 }
 assert.equal(promptCount,21,'the approved exercises expose all 21 copy-ready prompts');

 const live=slides.findIndex(slide=>slide.kicker==='W5 · OPTIONAL LIVE MODEL');
 const skills=slides.findIndex(slide=>slide.kicker==='W5 · PROJECT SKILLS');
 const a5=slides.findIndex(slide=>slide.title==='Assignment 5: build a read-only deploy tool');
 const a6=slides.findIndex(slide=>slide.title==='A6 · Create the live counterpart');
 const handoffClose=slides.findIndex(slide=>slide.kicker==='W5 · HANDOFF');
 const method=slides.findIndex(slide=>slide.title==='The method you take with you');
 const hackathon=slides.findIndex(slide=>slide.kicker==='W5 · HACKATHON SKILLS');
 assert.ok(skills>=0&&skills<slides.findIndex(slide=>slide.kicker==='W5 · A1 · CONCEPT'),'included project skills appear before A1');
 assert.ok(a5>=0&&live===a5+1&&live<a6,'optional product-model setup appears directly after A5 and before A6');
 assert.equal(slides[skills].source,undefined,'opening project-skills slide uses only the included skills');
 assert.equal(slides[skills].prompt,undefined,'opening project-skills slide does not install the public pack');
 assert.ok(slides.some(slide=>slide.steps?.some(step=>step.prompt==='claude --setting-sources project --strict-mcp-config --no-chrome')),'Day 5 starts Claude Code with project context only');
 assert.doesNotMatch(slides[skills].notes,/user settings|global settings/i,'project-skills introduction does not load wider settings');
 assert.equal(handoffClose+1,method,'the handoff flows into the Day 5 method');
 assert.equal(hackathon,45,'the full skills pack starts on physical slide 46, after slide 45');
 assert.equal(hackathon,method+1,'the full skills pack follows the Day 5 method');
 assert.equal(slides[handoffClose].source,undefined,'the handoff does not introduce the full skills pack early');
 assert.equal(slides[hackathon].source?.url,'https://github.com/AetherLink-bv/claude-code-skills-pack','slide 46 links the public skills pack');
 assert.match(slides[hackathon].prompt,/only that skill.*project's \.claude\/skills.*preserve it.*approval.*Do not install the full pack/s,'slide 46 exposes the selective install prompt');
 assert.ok(slides[hackathon].keyPoints.some(point=>/Do not bulk install/.test(point)),'skills pack stays selective and belongs after the lesson');
 assert.ok(slides[hackathon].cards.some(card=>/claude --setting-sources project --strict-mcp-config --no-chrome/.test(card.body)),'hackathon pack uses project-only settings without Claude in Chrome');
 const a1MapPrompt=slides.flatMap(slide=>slide.steps||[]).find(step=>step.prompt?.startsWith('/show-me Read CLAUDE.md'))?.prompt||'';
 assert.doesNotMatch(a1MapPrompt,/README\.md|WORKSHOP\.md|package\.json/,'A1 repo map stays within the bounded source set');
 assert.equal(slides[live].layout,'exercise','optional live-model setup uses the copy-enabled assignment renderer');
 assert.ok(slides[live].steps.every(step=>typeof step.prompt==='string'&&step.prompt.trim()),'every live-model step exposes copy-ready text');
 assert.match(slides[live].steps[0].prompt,/Claude Code builder session.*Claude Agent SDK product runtime/);
 assert.match(slides[live].steps[1].prompt,/--max-turns 8 --max-budget-usd 0\.30 --dry-run/);
 assert.match(slides[live].steps[2].prompt,/AGENT_MODEL=sonnet/);
 assert.match(slides[live].steps[3].prompt,/^env -u AGENT_MODEL AGENT_LISTEN_WINDOW_MIN=1 npm run console$/);
 assert.match(slides[live].notes,/completed diagnosis.*tool trace/i);
 assert.ok(slides[live].keyPoints.some(point=>/between turns.*exceed/i.test(point)),'live-model setup warns that the budget can overshoot within one turn');
 assert.match(slides[live].cards.find(card=>card.title==='Product · optional now')?.body||'',/turn-checked.*One turn can exceed the budget/,'the overshoot warning is in the visible assignment card');

 const handoff=slides.find(slide=>slide.title==='Assignment 9: turn the lesson into a hackathon handoff');
 assert.ok(handoff,'A9 handoff assignment exists');
 const handoffPrompt=handoff.steps.find(step=>step.prompt?.startsWith('/handoff '))?.prompt||'';
 assert.match(handoffPrompt,/forbidden service mutations.*allowed local verification evidence writes under docs\/verify\//);

 const stack=slides.findIndex(slide=>slide.title==='The starter stack');
 const scope=slides.findIndex(slide=>slide.title==='What is ready and what you build');
 const a1=slides.findIndex(slide=>slide.kicker==='W5 · A1 · CONCEPT');
 assert.ok(stack>=0&&scope===stack+1&&a1>scope,'starter stack and learner scope appear before A1');
 assert.deepEqual([...slides[stack].items.map(item=>item.label)],['Browser','Console','Runtime','Evidence']);
 assert.deepEqual([...slides[scope].cards.map(card=>card.title)],['Starter','You build and prove']);

 const close=slides.findIndex(slide=>slide.kicker==='W5 · DONE');
 const appendix=slides.findIndex(slide=>slide.kicker==='W5 · APPENDIX');
 const bonus=slides.findIndex(slide=>slide.kicker==='W5 · BONUS');
 assert.ok(close>0&&appendix>close&&bonus>appendix,'the main SRE route closes before appendix and bonus');
 assert.match(slides[bonus].repo.url,/aetherlink-daily-brief-lab-s1$/,'Daily Brief remains the bonus');
 for(const slide of slides.filter(item=>item.beat==='turn'))assert.match(slide.repo.url,/sre-oncall-agent\/tree\/workshop\/start$/,'main exercises use the SRE starter');
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
