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

test('Daily Brief assignments use a clickable starter link and need no branch switch', () => {
  const context = {window: {}};
  vm.runInNewContext(read('day5-daily-brief-slides.js'), context);
  const slides = context.window.SLIDES;
  const assignments = slides.filter(s => s.assignmentId?.startsWith('brief-a'));
  assert.deepEqual(Array.from(assignments, s => s.assignmentId), [
    'brief-a1', 'brief-a2', 'brief-a3', 'brief-a4', 'brief-a5', 'brief-a6', 'brief-a7'
  ]);
  for (const slide of assignments) {
    assert.equal(slide.repo?.url, 'https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1');
    assert.equal(slide.teach.copy.length, 2, `${slide.assignmentId} has one SOLO prompt and one project skill`);
    assert.match(slide.steps.map(step => step.text).join(' '), /SOLO \d|SOLO 7/);
  }
  assert.doesNotMatch(JSON.stringify(slides), /\bgit\s+switch\b/i);
  assert.ok(slides.some(s => s.title === 'From one reviewed draft to one reviewed brief'));
  assert.match(JSON.stringify(slides.find(s => s.title === 'Start the project')), /--setting-sources project,user --strict-mcp-config --no-chrome/);
  const a7 = assignments.at(-1);
  assert.match(a7.prompt, /Do not commit, push, open a PR/);
  assert.ok(a7.steps.findIndex(step => /commit/i.test(step.text)) < a7.steps.findIndex(step => /Push HEAD/i.test(step.text)));
  assert.equal(slides.at(-1).source?.url, 'workshop5.html');
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
