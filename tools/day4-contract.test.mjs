import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const contract = JSON.parse(read('tools/day4-participant-contract.json'));
const load = (file) => { const ctx = { window: {} }; vm.runInNewContext(read(file), ctx); return ctx.window.SLIDES; };
const strings = (slide) => {
  const found = [];
  const walk = (value, key) => {
    if (typeof value === 'string') { if (key !== 'image' && key !== 'clip' && key !== 'url') found.push(value); }
    else if (Array.isArray(value)) value.forEach((item) => walk(item, key));
    else if (value && typeof value === 'object') for (const [name, item] of Object.entries(value)) walk(item, name);
  };
  walk(slide);
  return found;
};

// Both decks teach the prompt-first route on main: Ryan's deck and the final deck that is generated from it.
for (const file of ['workshop4-slides.js', 'day4-final-slides.js']) {
const slides = load(file);
test(`${file} names only commands and files that the participant repositories have`, () => {
  const scripts = new Set([...contract.scripts, 'ci']);
  const files = new Set(contract.files);
  const folders = new Set(contract.files.flatMap((file) => file.split('/').slice(0, -1).map((_, i, parts) => parts.slice(0, i + 1).join('/'))));
  for (const [index, slide] of slides.entries()) {
    for (const text of strings(slide)) {
      for (const [, name] of text.matchAll(/npm run ([a-z0-9-]+(?::[a-z0-9-]+)?)/g)) {
        assert.ok(scripts.has(name), `slide ${index + 1} "${slide.title}": npm run ${name} is not a script in the participant repositories`);
      }
      for (const [path] of text.matchAll(/(?:\.claude|0[1-3]-[a-z-]+|lib|docs|n8n|checks|src)\/[\w./-]*\w/g)) {
        assert.ok(files.has(path) || folders.has(path), `slide ${index + 1} "${slide.title}": ${path} is not in the participant repositories`);
      }
    }
  }
});

test(`${file}: check slides show the test commands of the same step in SOLO.md`, () => {
  assert.deepEqual(Object.keys(contract.testCommands), ['0', '1', '2', '3'], 'SOLO 0 to 3 each list their test commands');
  for (const [step, commands] of Object.entries(contract.testCommands)) {
    const slide = slides.find((item) => item.kicker === `What you see · Step ${step}`);
    assert.ok(slide, `there is a check slide for Step ${step}`);
    assert.deepEqual(Array.from(slide.visual.term.filter((line) => line.c), (line) => line.c), commands, `Step ${step} check slide`);
  }
});

test(`${file} does not describe the earlier package`, () => {
  const text = JSON.stringify(slides.map(strings));
  for (const stale of ['list_transactions', 'MCP servers OK', 'AUTO_REPLY', 'External data section', 'evidence pack', 'prepared trainer copy', 'six labels', 'aetherlink-day5-n8n']) {
    assert.ok(!text.includes(stale), `the deck still says "${stale}"`);
  }
});
}
