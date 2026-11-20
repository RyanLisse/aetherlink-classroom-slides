import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

// workshop3 is Ryan's Day 3 merged with Jessy's: her assignments and notes, his warm-up and screenshots.
const root = new URL('../', import.meta.url);
const load = file => { const c = { window: {} }; vm.runInNewContext(readFileSync(new URL(file, root), 'utf8'), c); return c.window.SLIDES; };
const slides = load('workshop3-slides.js');
const titles = Array.from(slides, s => s.title);

test('workshop3 keeps Jessy\'s route in order with the reviewed title adaptations', () => {
  const jessy = Array.from(load("day3-jessy-slides.js"), s => s.title);
  const adapted = new Map([
    ['Extra A: Let specialists consult each other', 'Extra: Let specialists consult each other'],
    ['Assignment 42: Save your proof', 'Assignment 42: Save every reply for approval']
  ]);
  const normalized = titles.map(title => adapted.get(title) || title);
  assert.deepEqual(normalized.filter(title => jessy.includes(title)), jessy);
  assert.deepEqual(titles.filter(title => !jessy.includes(title) && !adapted.has(title)), [
    'We are team AetherLink',
    'Warm-up: build your first workflow',
    'Explore: what can you create in n8n?',
    'Extra B: Let the workflow keep a log'
  ]);
  assert.equal(slides.length, jessy.length + 4);
});

test('the warm-up sits between the tour and the L1 → L3 ladder', () => {
  const at = t => titles.indexOf(t);
  assert.ok(at('A tour of n8n') < at('Warm-up: build your first workflow'));
  assert.equal(at('Explore: what can you create in n8n?'), at('Warm-up: build your first workflow') + 1);
  assert.equal(at('One ticket. Three agency levels.'), at('Explore: what can you create in n8n?') + 1);
});

test('every assignment screenshot exists', () => {
  const shots = slides.map(s => s.visual?.shot).filter(Boolean);
  assert.ok(shots.length >= 7);
  for (const shot of shots) assert.ok(existsSync(new URL(shot, root)), shot);
});
