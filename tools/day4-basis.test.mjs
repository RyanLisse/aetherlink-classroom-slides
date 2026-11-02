import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const deck=file=>{const context={window:{}};vm.runInNewContext(read(file),context);return context.window.SLIDES};

test('Maarten Day 4 keeps its path and adds a usable setup step',()=>{
 const slides=deck('day4-maarten-n8n-to-claude-slides.js');
 assert.equal(slides.length,21);
 assert.deepEqual(Array.from(slides,s=>s.title),[
  'Welcome to Day 4!','Today','Yesterday in n8n','Today in Claude Code',"Today's customer messages",'Get the workshop package',
  'Lesson 1: one agent + CLAUDE.md','Lesson 1: try it','Quiz: message 6','Lesson 2: orchestrator + subagents',
  'What is in a subagent file?','Lesson 2: try it','Lesson 3: MCP + external data','Connect the MCP server',
  'What is behind the IDs?','Lesson 3: try it','Look back at the three lessons','Choose n8n when the route is fixed','Choose Claude Code when the work varies',
  'What did you learn?','Thank you!'
 ]);
 assert.ok(slides.every(s=>s.layout!=='compare'));
 assert.ok(slides.every(s=>(s.keyPoints?.length||0)<=3));
 const setup=slides[5];
 assert.equal(setup.layout,'exercise');
 assert.equal(setup.repo.url,'https://github.com/RyanLisse/aetherlink-day5-n8n-to-agent');
 assert.match(setup.cards[0].body,/npm run verify/);
 assert.match(setup.cards[0].body,/--dry-run/);
 assert.match(slides[2].notes,/three specialist roles/);
 assert.match(slides[9].notes,/Customer Context returns in Lesson 3/);
 const source=read('day4-maarten-n8n-to-claude-slides.js');
 assert.doesNotMatch(source,/01-lesson-one|02-lesson-two|03-lesson-three|ticket-analyst|email-responder/);
 assert.match(source,/01-single-agent\/claude-project/);
 assert.match(source,/02-subagents\/claude-project/);
 assert.match(source,/03-mcp\/claude-project/);
 assert.match(source,/risk-agent/);
 assert.match(source,/customer-reply-agent/);
 assert.match(source,/customer-context-agent/);
 assert.match(source,/get_customer/);
 assert.match(source,/get_transaction/);
});

test('Both Day 4 decks use the current Day 1 and 2 shell',()=>{
 for(const name of ['day4-maarten-n8n-to-claude','workshop4']){
  const html=read(name+'.html');
  const presenter=read(name+'-presenter.html');
  assert.match(html,/styles\.css\?v=147/);
  assert.match(html,/demo-fallback\.js\?v=94/);
  assert.match(html,/timers\.js\?v=92/);
  assert.match(html,/sessions\.js\?v=18/);
  assert.match(html,/app\.js\?v=129/);
  assert.match(html,/id="timer-btn"/);
  assert.match(presenter,/styles\.css\?v=129/);
  assert.match(presenter,/timers\.js\?v=92/);
  assert.match(presenter,/presenter\.js\?v=96/);
 }
 assert.match(read('workshop4.html'),/workshop4-slides\.js\?v=3/);
 assert.match(read('workshop4-presenter.html'),/workshop4-slides\.js\?v=3/);
 assert.match(read('day4-maarten-n8n-to-claude.html'),/day4-maarten-n8n-to-claude-slides\.js\?v=4/);
 assert.match(read('day4-maarten-n8n-to-claude-presenter.html'),/day4-maarten-n8n-to-claude-slides\.js\?v=4/);
 const ryan=deck('workshop4-slides.js');
 assert.equal(ryan.length,24);
 assert.equal(JSON.parse(read('tools/session-source-manifest.json')).decks.find(d=>d.file==='workshop4-slides.js').sourceSlides,28);
 assert.ok(ryan.every(s=>s.layout!=='compare'));
 assert.ok(ryan.filter(s=>s.type==='concept').every(s=>(s.keyPoints?.length||0)<=3));
 assert.deepEqual(Array.from(ryan.slice(3,7),s=>s.title),['Yesterday in n8n','Agent SDK: the query loop','Agent SDK: project instructions','Get the workshop package.']);
 assert.ok(!ryan.some(s=>/Hooks|Skills/.test(s.title)));
 const active=JSON.stringify(ryan);
 assert.doesNotMatch(active,/ticket-analyst|email-responder|transaction-clerk|npm run clerk/);
 assert.match(active,/risk-agent/);
 assert.match(active,/customer-reply-agent/);
 assert.match(active,/customer-context-agent/);
 assert.match(active,/get_customer/);
 assert.match(active,/get_transaction/);
 const lesson1=ryan.find(s=>s.title==='Run Lesson 1 and test the tone trap.');
 assert.match(lesson1.steps[0],/git switch step-1/);
 assert.match(lesson1.steps.join('\n'),/01-single-agent\/claude-project\/CLAUDE\.md/);
});
