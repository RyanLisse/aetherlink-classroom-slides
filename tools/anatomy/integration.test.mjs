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

test('Day 5 keeps six core assignments, the A8 gate, and optional A7/A9 without Anatomy figures',()=>{
 const slides=context.window.SLIDES;
 assert.ok(slides.length>0,'Day 5 deck loads');
 assert.equal(slides.filter(slide=>slide.visual?.anatomy).length,0,'Day 5 has no Anatomy figures');
 assert.ok(slides.every(slide=>typeof slide.notes==='string'&&slide.notes.trim()),'every slide has speaker notes');
 assert.ok(slides.every(slide=>slide.teach?.script?.length),'every slide has a presenter teach card');
 assert.ok(slides.every(slide=>slide.teach?.do?.length&&slide.teach?.done?.length),'every teach card has an action and stop result');
 assert.ok(slides.slice(0,-1).every((slide,index)=>slide.teach.next===slides[index+1].title),'teach.next follows the slide order');
 assert.ok(slides.every(slide=>slide.kicker?.startsWith('Day 5 ·')),'every kicker uses the Day 5 label');

 for(let number=1;number<=6;number+=1){
  const concept=slides.filter(slide=>slide.kicker===`Day 5 · A${number} · CONCEPT`);
  assert.equal(concept.length,1,`A${number} has one concept slide`);
  const example=slides.filter(slide=>slide.kicker===`Day 5 · A${number} · EXAMPLE`);
  assert.equal(example.length,1,`A${number} has one screenshot example`);
  assert.equal(example[0].visual?.shot,`assets/day5-expected/a${number}.png`,`A${number} uses its expected-result screenshot`);
  const exercises=slides.filter(slide=>slide.assignmentId===`A${number}`);
  assert.ok(exercises.length>=1,`A${number} has a participant exercise`);
  assert.ok(exercises.every(slide=>slide.layout==='exercise'),`A${number} uses the exercise renderer`);
  assert.ok(exercises.every(slide=>slide.steps.length>=4&&slide.steps.length<=5),`A${number} keeps four or five participant steps`);
  assert.ok(exercises.some(slide=>slide.steps.some(step=>typeof step.prompt==='string'&&step.prompt.trim())),`A${number} has a copy-ready prompt`);
 }

 const promptValues=Object.values(context.window.DAY5_PROMPTS);
 assert.equal(promptValues.length,27,'the deck exposes the approved 27 named prompts');
 const stepPrompts=slides.flatMap(slide=>slide.steps||[]).map(step=>step.prompt).filter(Boolean);
 for(const prompt of promptValues)assert.equal(stepPrompts.filter(value=>value===prompt).length,1,'each named prompt appears exactly once in the route');

 const a8Gate=slides.find(slide=>slide.kicker==='Day 5 · A6 · HUMAN GATE');
 assert.ok(a8Gate,'the A8 human gate remains inside A6');
 assert.equal(a8Gate.visual?.shot,'assets/day5-expected/a8.png','the A8 gate uses its expected-result screenshot');
 assert.equal(slides.filter(slide=>slide.assignmentId==='A8').length,0,'A8 is not presented as a seventh core assignment');
 assert.ok(slides.some(slide=>slide.assignmentId==='A6'&&slide.steps.some(step=>step.prompt===context.window.DAY5_PROMPTS.a8Build)),'the final A6 checkpoint builds and proves A8');
 const a6Challenge=slides.find(slide=>slide.assignmentId==='A6'&&slide.steps.some(step=>step.prompt===context.window.DAY5_PROMPTS.a6Evidence));
 for(const prompt of [context.window.DAY5_PROMPTS.a6Evidence,context.window.DAY5_PROMPTS.a6Alternative,context.window.DAY5_PROMPTS.a6Mutation]){
  assert.match(a6Challenge.steps.find(step=>step.prompt===prompt)?.text||'',/^Type this in: browser http:\/\/localhost:4320 · agent chat$/,'product-chat checks run in the browser, not Claude Code');
 }
 assert.match(a6Challenge.steps.find(step=>step.prompt===context.window.DAY5_PROMPTS.a8Build)?.text||'',/Claude Code/,'the A8 implementation remains in Claude Code');

 for(const number of [7,9]){
  assert.equal(slides.filter(slide=>slide.kicker===`Day 5 · A${number} · OPTIONAL`).length,1,`A${number} has one optional concept`);
  assert.equal(slides.filter(slide=>slide.kicker===`Day 5 · A${number} · OPTIONAL PRACTICE`).length,1,`A${number} has one optional practice`);
 }
 for(let number=1;number<=9;number+=1){
  const demo=slides.find(slide=>slide.type==='demo'&&slide.visual?.shot===`assets/day5-expected/a${number}.png`);
  assert.ok(demo,`A${number} has a fresh expected-result screenshot`);
  const screenshot=path.join(root,demo.visual.shot);
  assert.ok(existsSync(screenshot)&&readFileSync(screenshot).length>100,`${demo.visual.shot} is a real asset`);
  assert.match(demo.teach.script.find(item=>item.clip)?.clip||'',new RegExp(`/a${number}\\.mp4$`),`A${number} keeps its optional video in presenter notes`);
 }

 const live=slides.findIndex(slide=>slide.kicker==='Day 5 · APPENDIX · OPTIONAL LIVE MODEL');
 const skills=slides.findIndex(slide=>slide.kicker==='Day 5 · PROJECT SKILLS');
 const close=slides.findIndex(slide=>slide.kicker==='Day 5 · DONE');
 const a7=slides.findIndex(slide=>slide.kicker==='Day 5 · A7 · OPTIONAL');
 const a9=slides.findIndex(slide=>slide.kicker==='Day 5 · A9 · OPTIONAL');
 const hackathon=slides.findIndex(slide=>slide.kicker==='Day 5 · APPENDIX · HACKATHON SKILLS');
 assert.ok(skills>=0&&skills<slides.findIndex(slide=>slide.kicker==='Day 5 · A1 · CONCEPT'),'included project skills appear before A1');
 assert.ok(close>=0&&live>close&&a7>close&&a9>a7,'the live model and optional depth stay after the six-assignment lesson');
 assert.ok(hackathon>a9,'the public skills pack appears after optional A7 and A9');
 assert.equal(slides[skills].source,undefined,'opening project-skills slide uses only the included skills');
 assert.equal(slides[skills].prompt,undefined,'opening project-skills slide does not install the public pack');
 assert.match(slides[skills].keyPoints.join(' '),/only project skills/i,'the lesson loads only project skills');
 const setup=slides.find(slide=>slide.kicker==='Day 5 · ONE-TIME SETUP');
 const nodeStep=setup.steps.findIndex(step=>step.prompt==='node --version');
 const cloneStep=setup.steps.findIndex(step=>step.prompt?.startsWith('git clone --branch workshop/start'));
 assert.ok(nodeStep>=0&&nodeStep<cloneStep,'Node 22 is checked before cloning');
 assert.ok(slides.some(slide=>slide.steps?.some(step=>step.prompt==='claude --setting-sources project --strict-mcp-config --no-chrome')),'Day 5 starts Claude Code with project context only');
 assert.equal(slides[hackathon].source?.url,'https://github.com/AetherLink-bv/claude-code-skills-pack','the hackathon appendix links the public skills pack');
 assert.match(slides[hackathon].prompt,/only that skill.*project's \.claude\/skills.*preserve it.*approval.*Do not install the full pack/s,'the appendix exposes the selective install prompt');
 assert.ok(slides[hackathon].keyPoints.some(point=>/Do not bulk install/.test(point)),'skills pack stays selective and belongs after the lesson');
 assert.match(slides[hackathon].cards.map(card=>card.body).join(' '),/project-only settings and no Chrome integration/,'hackathon pack stays project-local without Claude in Chrome');
 const a1MapPrompt=slides.flatMap(slide=>slide.steps||[]).find(step=>step.prompt?.startsWith('/show-me Read CLAUDE.md'))?.prompt||'';
 assert.doesNotMatch(a1MapPrompt,/README\.md|WORKSHOP\.md|package\.json/,'A1 repo map stays within the bounded source set');
 assert.equal(slides[live].layout,'exercise','optional live-model setup uses the copy-enabled assignment renderer');
 assert.equal(slides[live].steps.filter(step=>typeof step.prompt==='string'&&step.prompt.trim()).length,3,'the live-model appendix exposes three copy-ready commands and one human review');
 assert.match(slides[live].steps[0].prompt,/Claude Code builder session.*Claude Agent SDK product runtime/);
 assert.match(slides[live].steps[1].prompt,/--max-turns 8 --max-budget-usd 0\.30 --dry-run/);
 assert.match(slides[live].steps[3].prompt,/^env -u AGENT_MODEL AGENT_LISTEN_WINDOW_MIN=1 npm run console$/);
 assert.match(slides[live].steps[0].prompt,/completed diagnosis.*tool trace/i);
 assert.match(slides[live].steps[0].prompt,/budget is checked between turns and can be exceeded by one turn/i,'the copy-ready prompt explains the turn boundary');
 assert.ok(slides[live].keyPoints.some(point=>/one turn can exceed/i.test(point)),'the visible slide warns that one turn can exceed the budget');

 const handoff=slides.find(slide=>slide.kicker==='Day 5 · A9 · OPTIONAL HANDOFF');
 assert.ok(handoff,'A9 keeps an optional handoff recap');
 assert.match(handoff.steps.find(step=>step.prompt?.startsWith('/handoff '))?.prompt||'',/verified checks.*HUMAN OPEN.*Do not claim.*resolved/s,'the handoff carries verified work without inventing closure');

 const stack=slides.findIndex(slide=>slide.title==='The starter stack');
 const scope=slides.findIndex(slide=>slide.title==='What is ready and what you change');
 const a1=slides.findIndex(slide=>slide.kicker==='Day 5 · A1 · CONCEPT');
 assert.ok(stack>=0&&scope===stack+1&&a1>scope,'starter stack and learner scope appear before A1');
 assert.deepEqual([...slides[stack].cards.map(card=>card.title)],['Runtime','Interfaces','Evidence','Safety']);
 assert.deepEqual([...slides[scope].cards.map(card=>card.title)],['Ready','You change','You prove']);

 const appendix=slides.findIndex(slide=>slide.kicker==='Day 5 · APPENDIX · OPTIONAL LIVE MODEL');
 const bonus=slides.findIndex(slide=>slide.kicker==='Day 5 · BONUS');
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
