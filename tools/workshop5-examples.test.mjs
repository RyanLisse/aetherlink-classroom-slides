import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
test('Every Workshop 5 practice slide has a labelled example and scenario', () => {
  const context = { window: {} };
  vm.runInNewContext(read('workshop5-slides.js'), context);
  const examples = JSON.parse(read('assets/workshop-5/assignments/examples.json'));
  const practice = context.window.SLIDES.filter(s => s.type === 'practice');
  assert.equal(practice.length, 15);
  assert.equal(examples.length, practice.length);
  assert.equal(new Set(examples.map(e => e.id)).size, examples.length);
  for (const slide of practice) {
    const example = examples.find(e => e.slide === slide.title);
    assert.ok(example, slide.title);
    assert.equal(slide.subtitle, example.scenario);
    assert.ok(slide.notes.includes(example.start));
    assert.ok(slide.notes.includes(example.stop));
    assert.equal(slide.visual.shotLabel, example.kind);
    assert.ok(slide.visual.shotAlt.includes(example.title));
    assert.ok(existsSync(new URL(slide.visual.shot, root)), slide.visual.shot);
    assert.equal(slide.visual.reference, `assets/workshop-5/assignments/index.html#${example.id}`);
  }
});
