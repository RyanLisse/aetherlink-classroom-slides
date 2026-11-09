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
