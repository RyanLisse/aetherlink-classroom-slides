import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import vm from 'node:vm';

const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const load = name => {
  const context = {window: {}};
  vm.runInNewContext(read(name), context);
  return context.window.SLIDES;
};

test('W3 core can finish without specialist extensions', () => {
  const slides = load('workshop3-slides.js');
  assert.equal(new Set(slides.map(s => s.stateId)).size, slides.length);
  const core = slides.filter(s => !s.optional);
  assert.ok(core.every(s => !s.hidden));
  assert.ok(slides.filter(s => s.optional).every(s => s.hidden));
  assert.equal(core.filter(s => s.type === 'pause').length, 3);
  const final = core.find(s => s.title.startsWith('Final build:'));
  assert.match(final.expected, /One Agent completes the core/);
  assert.ok(core.find(s => s.stateId === 'w3-invalid'));
  assert.ok(core.find(s => s.stateId === 'w3-review'));
});

test('Every W3 exercise has visible instructions and reachable local evidence aids', () => {
  const guide = read('assets/workshop-3/participant-guide.html');
  for (const s of load('workshop3-slides.js')) {
    for (const path of [s.visual?.image, s.visual?.shot].filter(Boolean)) {
      assert.ok(existsSync(new URL('../' + path, import.meta.url)), path);
    }
    if (s.type !== 'practice') continue;
    assert.ok(s.steps?.length && s.expected && s.timer > 0, s.title);
    const [file, anchor] = s.repo.url.split('#');
    assert.ok(existsSync(new URL('../' + file, import.meta.url)), file);
    if (anchor) assert.ok(guide.includes(`id="${anchor}"`), anchor);
  }
});

test('Day 4 bridges the real fields and does not require W3 specialists', () => {
  const slides = load('workshop4-slides.js');
  assert.ok(slides.some(s => s.notes?.includes('No specialist extension is required')));
  assert.ok(slides.some(s => s.cards?.some(c => c.body.includes('Day 3: priority and message'))));
});

test('Day 3 uses trial model credits and reserves provider keys for the SDK route', () => {
  const slides = load('workshop3-slides.js');
  const setup = slides.find(s => s.stateId === 'w3-setup');
  const chat = slides.find(s => s.stateId === 'w3-chat');
  assert.match(setup.subtitle, /Cloud trial/);
  assert.ok(setup.steps[0].includes('Create your own'));
  assert.ok(chat.steps.some(step => step.includes('Use Gateway credits')));
  assert.match(chat.expected, /Do not substitute an API key/);
  assert.doesNotMatch(JSON.stringify(slides), /add your own OpenAI credential|Select your credential in the model node/);
  const guide = read('assets/workshop-3/participant-guide.html');
  assert.match(guide, /complete any email verification prompt/i);
  for (const phrase of ['Assistant credits are different', 'Do not buy credits', 'Gateway credits are not available on self-hosted', 'Only the Claude SDK route uses']) {
    assert.ok(guide.includes(phrase), phrase);
  }
  const backend = load('workshop4-slides.js').find(s => s.title === 'Two ways to run the same agent');
  assert.match(backend.subtitle, /n8n trial credits stay in n8n/);
});

test('The proof pack explains how to share a separate export without changing the live workflow', () => {
  const guide = read('assets/workshop-3/participant-guide.html');
  for (const phrase of ['id="safe-export"', 'Export JSON', '02-chat-shareable.json', 'Do not edit credentials in the live workflow', '02-chat-share-check', 'without executing', 'Valid JSON alone does not prove']) {
    assert.ok(guide.includes(phrase), phrase);
  }
  const proof = load('workshop3-slides.js').find(s => s.stateId === 'w3-build-zip-44');
  assert.match(proof.expected, /checked sharing copy/);
  assert.equal(proof.repo.url, 'assets/workshop-3/participant-guide.html#finish');
});

test('Both days explain the same bounded loop without equating text with success', () => {
  for (const file of ['workshop3-slides.js', 'workshop4-slides.js']) {
      const slides = load(file);
      const diagrams = slides.filter(s => s.visual?.image === 'assets/workshop-3/agent-loop.svg');
      assert.equal(diagrams.length, 1);
      assert.match(diagrams[0].notes, /post-tool hook cannot prevent an action that already ran/);
      assert.match(diagrams[0].notes, /not proof that acceptance checks passed/);
      assert.ok(diagrams[0].visual.imageAlt);
      assert.equal(slides.some(s => s.visual?.anatomy), false, `${file} still references removed Anatomy visuals`);
      assert.doesNotMatch(JSON.stringify(slides), /assets\/anatomy\//, `${file} references removed Anatomy assets`);
    }
  const svg = read('assets/workshop-3/agent-loop.svg');
  for (const label of ['Check permission', 'Runtime executes tool', 'Answer to review', 'human cancellation']) {
    assert.ok(svg.includes(label), label);
  }
});
