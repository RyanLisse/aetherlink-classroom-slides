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
