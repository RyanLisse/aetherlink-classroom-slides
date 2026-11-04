import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const ctx = {window: {}};
vm.runInNewContext(read('workshop4-slides.js'), ctx);
const slides = ctx.window.SLIDES;

test('Day 4 deck and presenter request the current versioned slide data', () => {
  const version = file => {
    const match = read(file).match(/src="workshop4-slides\.js\?v=(\d+)"/);
    assert.ok(match, file + ' must load a versioned slide script');
    return Number(match[1]);
  };
  const deckVersion = version('workshop4.html');
  assert.ok(deckVersion > 19);
  assert.equal(version('workshop4-presenter.html'), deckVersion);
});

test('The memory discussion leads into three illustrated explanations', () => {
  const start = slides.findIndex(s => s.title === 'Discuss: what makes the route predictable?') + 1;
  assert.deepEqual(Array.from(slides.slice(start, start + 3), s => s.stateId), [
    'w4-context-window', 'w4-prompt-cache', 'w4-context-compaction',
  ]);
  const diagrams = slides.slice(start, start + 3);
  assert.equal(new Set(diagrams.map(s => s.visual.image)).size, 3);
  for (const slide of diagrams) {
    assert.equal(slide.visual.opener, 'sdlc-loop');
    assert.ok(slide.visual.imageAlt);
    assert.match(read(slide.visual.image), /<svg /);
    assert.match(slide.notes, /Participant:/);
    assert.match(slide.notes, /\bCheck(?::| each\b)/);
  }
});

test('Workshop 4 starts with the AI-SDLC goal and tells participants what to build', () => {
  const welcome = slides[0];
  assert.match(welcome.subtitle, /Learning goal: use the AI-SDLC/);
  assert.match(welcome.subtitle, /practice system/);

  const step1 = slides.find(s => s.title === 'Run Step 1 and test chat memory.');
  const step2 = slides.find(s => s.title === 'Run the orchestrator and inspect the draft.');
  const step3 = slides.find(s => s.title === 'Run Step 3 customer and transaction lookups.');
  assert.ok(step1.steps.some(step => /complete Step 1.*Build the options, project instructions and Priority Parser/.test(step)));
  assert.ok(step2.steps.some(step => /complete Step 2.*Build both prompts, the loader, schema and orchestrator options/.test(step)));
  assert.ok(step2.steps.some(step => /dry run makes no model call/.test(step)));
  assert.ok(step3.steps.some(step => /complete Step 3.*Build both read-only MCP tools/.test(step)));
  assert.ok(step3.steps.some(step => /live run or labelled sample trace/.test(step)));
});

test('New Day 4 build steps reset old checkmarks without resetting their timers', () => {
  const affected = [
    ['Run Step 1 and test chat memory.', '23:Run Step 1 and test chat memory.'],
    ['Run the orchestrator and inspect the draft.', '33:Run the orchestrator and inspect the draft.'],
    ['Run Step 3 customer and transaction lookups.', '39:Run Step 3 customer and transaction lookups.'],
  ];
  const source = read('app.js');
  const start = source.indexOf('const stateKey = () =>');
  const end = source.indexOf('\nfunction renderInstructions', start);
  const stateFunctions = source.slice(start, end);
  const timerContext = {window: {}};
  vm.runInNewContext(read('timers.js'), timerContext);

  for (const [title, stateId] of affected) {
    const slide = slides.find(item => item.title === title);
    assert.equal(slide.stateId, stateId);
    assert.ok(slide.progressId);
    const oldKey = 'als:' + stateId;
    const result = vm.runInNewContext(stateFunctions + '; ({ key: stateKey(), state: loadState() })', {
      slides: [slide],
      current: 0,
      sessionStorage: {getItem: key => key === oldKey ? JSON.stringify({done: [true], passed: true}) : null},
    });
    assert.equal(result.key, 'als:' + slide.progressId);
    assert.equal(result.state.done, undefined);
    assert.equal(result.state.passed, undefined);
    assert.equal(timerContext.window.ALSTimer.key(0, slide.title, slide.stateId), 'als:timer:' + stateId);
  }
});

test('Inserting explanations preserves every original W4 slide identity', () => {
  const originals = slides.filter(s => !s.stateId.startsWith('w4-'));
  assert.equal(originals.length, 66);
  originals.forEach((slide, oldIndex) => {
    const originalTitle = oldIndex === 7 ? 'Optional yesterday, explained today: specialist agents' : slide.title;
    assert.equal(slide.stateId, oldIndex + ':' + originalTitle);
  });
  assert.equal(new Set(slides.map(s => s.stateId)).size, slides.length);
});

test('The shifted lunch reads its existing timer, checklist and hidden state', () => {
  const index = slides.findIndex(s => s.title === 'Lunch');
  assert.equal(index, 29);
  const saved = new Map([
    ['als:timer:26:Lunch', JSON.stringify({total:3600, left:123, running:false, endAt:0})],
    ['als:26:Lunch', JSON.stringify({done:[true], passed:true})],
    ['als:hidden:workshop4.html', JSON.stringify(['26:Lunch'])],
  ]);
  const storage = {getItem:key => saved.get(key) ?? null, setItem:(key,value) => saved.set(key,value)};
  const timerContext = {window:{}, localStorage:storage};
  vm.runInNewContext(read('timers.js'), timerContext);
  const timer = timerContext.window.ALSTimer;
  assert.equal(timer.key(index, slides[index].title, slides[index].stateId), 'als:timer:26:Lunch');
  assert.equal(timer.read(timer.key(index, slides[index].title, slides[index].stateId), 0).left, 123);

  const app = read('app.js');
  const stateSource = app.slice(app.indexOf('const stateKey ='), app.indexOf('\nfunction renderInstructions', app.indexOf('const stateKey =')));
  const state = vm.runInNewContext(stateSource + ';loadState()', {slides, current:index, sessionStorage:storage});
  assert.deepEqual(JSON.parse(JSON.stringify(state)), {done:[true], passed:true});
  const visibilitySource = app.slice(app.indexOf('const hideId ='), app.indexOf('\nfunction visibleFrom', app.indexOf('const hideId =')));
  const hidden = vm.runInNewContext(visibilitySource + ';isHidden(current)', {
    slides, current:index, localStorage:storage, DECK_ID:'workshop4.html', HIDDEN_KEY:'als:hidden:workshop4.html',
  });
  assert.equal(hidden, true);
  const presenter = read('presenter.js');
  const presenterSource = presenter.slice(presenter.indexOf('function isHidden(i) {'), presenter.indexOf('\n\n/* ---- the timer'));
  assert.equal(vm.runInNewContext(presenterSource + ';isHidden(current)', {
    slides, current:index, localStorage:storage, HIDDEN_KEY:'als:hidden:workshop4.html', SHOWN_KEY:'als:shown:workshop4.html',
  }), true);
  assert.equal(timer.key(3, 'Legacy title'), 'als:timer:3:Legacy title');
});
