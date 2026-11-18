import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import vm from 'node:vm';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const ctx = { window: {} };
vm.runInNewContext(read('day4-final-slides.js'), ctx);
const slides = ctx.window.SLIDES;
// The fenced text and sh blocks of SOLO.md and README.md on main of the participant package.
const packageBlocks = JSON.parse(read('tools/day4-participant-contract.json')).prompts.blocks;

// Everything a Copy button on the slide, the presenter view or the day sheet hands to a participant.
const copyPrompts = (slide) => [
  ...(slide.steps || []).map((step) => step.prompt),
  slide.prompt,
  ...(slide.teach.copy || []).map(([, text]) => text),
  ...slide.teach.script.flatMap((beat) => (beat.copy || []).map(([, text]) => text)),
].filter(Boolean);

test('Day 4 final: every copy prompt is verbatim in SOLO.md or README.md of the package', () => {
  const mismatches = [...slides].flatMap((slide, index) => copyPrompts(slide).filter((prompt) => !packageBlocks.includes(prompt)).map((prompt) => `slide ${index + 1} "${slide.title}": ${prompt.slice(0, 80)}`));
  assert.deepEqual(mismatches, [], 'a copy prompt differs from the package text');
});

test('Day 4 final: the deck has every prompt and command block that the package gives a participant', () => {
  const inDeck = new Set([...slides].flatMap(copyPrompts));
  // The one block that is not a prompt: the file tree in README.md.
  const missing = packageBlocks.filter((block) => !block.startsWith('n8n/support-triage.json  ') && !inDeck.has(block));
  assert.deepEqual(missing, []);
});

test('Day 4 final: every assignment has steps, a checkpoint, a human boundary and a full teach block', () => {
  const assignments = slides.filter((slide) => slide.layout === 'exercise');
  assert.deepEqual(Array.from(assignments, (slide) => slide.title.match(/^Assignment (\w+):/)?.[1]), ['0', '1', '1b', '1c', '1M', '2', '3', '4']);
  for (const slide of assignments) {
    assert.ok(slide.steps.every((step) => step.text && step.where), `${slide.title}: each step says where and what`);
    assert.ok(slide.steps.some((step) => step.prompt), `${slide.title}: has a Copy prompt`);
    assert.deepEqual(Array.from(slide.cards, (card) => card.title), ['Checkpoint', 'Human boundary'], slide.title);
    for (const key of ['time', 'gist', 'next']) assert.ok(slide.teach[key], `${slide.title}: teach.${key}`);
    for (const key of ['script', 'learn', 'watch', 'terms', 'done']) assert.ok(slide.teach[key].length, `${slide.title}: teach.${key}`);
    assert.ok(slide.teach.script.every((beat) => beat.do && beat.say.length), `${slide.title}: each script beat has do and say`);
  }
});

test('Day 4 final: the next pointers follow the slide order and the four blocks add up', () => {
  assert.ok(slides.slice(0, -1).every((slide, index) => slide.teach.next === slides[index + 1].title && slide.notes.endsWith(`Next: ${slides[index + 1].title}`)));
  const blocks = [0];
  for (const slide of slides) { if (slide.type === 'pause') blocks.push(0); else blocks[blocks.length - 1] += parseInt(slide.teach.time, 10) || 0; }
  assert.deepEqual(blocks, [60, 120, 90, 45], 'minutes of work before the break, before lunch, before the second break, and to the end');
  assert.deepEqual(Array.from(slides.filter((slide) => slide.type === 'pause'), (slide) => parseInt(slide.teach.time, 10)), [15, 45, 15]);
});

test('Day 4 final: the committed deck is what the generator writes, and its guards pass', () => {
  // --check also runs the guards of the generator: no word of the earlier step-branch route, no em dash, every highlight in its subtitle.
  execFileSync(process.execPath, [fileURLToPath(new URL('./build-day4-final.mjs', import.meta.url)), '--check'], { stdio: 'pipe' });
});
