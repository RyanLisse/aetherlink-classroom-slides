import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const ctx = {window: {}};
vm.runInNewContext(read('workshop4-slides.js'), ctx);
const slides = ctx.window.SLIDES;

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

test('Inserting explanations preserves every original W4 slide identity', () => {
  const originals = slides.filter(s => !s.stateId.startsWith('w4-'));
  assert.equal(originals.length, 66);
  originals.forEach((slide, oldIndex) => assert.equal(slide.stateId, oldIndex + ':' + slide.title));
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
