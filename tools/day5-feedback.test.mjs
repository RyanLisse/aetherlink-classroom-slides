import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const deck = read('workshop5-slides.js');

for (const consumer of ['app.js', 'presenter.js']) {
  test(`Day 5 and ${consumer} share a valid classic-script lexical scope`, () => {
    assert.doesNotThrow(() => new vm.Script(`${deck}\n${read(consumer)}`, {
      filename: `workshop5-slides.js + ${consumer}`
    }));
  });
}

test('Daily Brief assignments use a clickable starter link and end in independent local work', () => {
  const context = {window: {}};
  vm.runInNewContext(read('day5-daily-brief-slides.js'), context);
  const slides = context.window.SLIDES;
  const assignments = slides.filter(s => s.assignmentId?.startsWith('brief-a'));
  assert.deepEqual([...new Set(Array.from(assignments, s => Number(s.assignmentId.match(/^brief-a([1-7])/)[1])))], [1, 2, 3, 4, 5, 6, 7]);
  assert.equal(new Set(assignments.map(s => s.assignmentId)).size, assignments.length);
  for (const slide of assignments) {
    assert.equal(slide.repo?.url, 'https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1');
    assert.ok(slide.steps.length, `${slide.assignmentId} contains participant steps`);
  }
  assert.doesNotMatch(JSON.stringify(slides), /\bgit\s+switch\b/i);
  assert.ok(slides.some(s => s.title === 'What do you bring into Day 5?'));
  assert.match(JSON.stringify(slides.find(s => s.title === 'Start the project')), /--setting-sources project,user --strict-mcp-config --no-chrome/);
  const a7 = assignments.at(-1);
  assert.ok(!a7.prompt, 'A7 leaves the implementation prompt to the participant');
  assert.doesNotMatch(JSON.stringify(a7.steps), /git push|gh pr create/);
  assert.ok(slides.some(slide => slide.source?.url === 'day5-jessy.html'), 'The Sonny bonus remains reachable');
});

test('Daily Brief SDLC presenter stills omit the historical slide number', () => {
  const context = {window: {}};
  vm.runInNewContext(read('day5-daily-brief-slides.js'), context);
  const slide = context.window.SLIDES.find(s => s.title === 'The software development life cycle (SDLC)');
  const shots = slide.teach.script.map(beat => beat.shot).filter(Boolean);
  assert.equal(shots.length, 7);
  assert.ok(shots.every(shot => shot.startsWith('assets/day5-daily-brief-teach/s06-')));
  for (const shot of shots) assert.doesNotThrow(() => readFileSync(new URL(`../${shot}`, import.meta.url)));
});
