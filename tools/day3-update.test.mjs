import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const context = { window: {} };
vm.runInNewContext(read('day3-maarten-n8n-slides.js'), context);
const slides = context.window.SLIDES;

test('Day 3 keeps Maarten technical steps inside the Jessy-led classroom route', () => {
  assert.equal(slides.length, 24);
  const titles = slides.map(slide => slide.title);
  for (const title of [
    'What was useful from the last session?',
    'Introducing myself',
    'Who are you?',
    'A quick tour of n8n',
    'Use workshop data only',
    'Checkpoint: prove memory',
    'Checkpoint: route structured output',
    'Assignment: from chat to chat',
    'Save your proof',
    'What did you learn?'
  ]) assert.ok(titles.includes(title), title);
  assert.ok(titles.indexOf('A quick tour of n8n') < titles.indexOf('The basic flow'));
  assert.ok(titles.indexOf('Save your proof') < titles.indexOf('What did you learn?'));
  const introduction = slides.find(slide => slide.title === 'Who are you?');
  assert.equal(introduction.cards.length, 3);
  assert.match(introduction.cards.at(-1).body, /success/i);
});

test('The eleven lesson screenshots stay paired with technical steps 1 through 11', () => {
  const expected = [
    ['The basic flow', '01-basic-flow.jpeg'],
    ['Chat Message trigger', '02-chat-trigger.jpeg'],
    ['Simple Memory', '03-chat-memory.jpeg'],
    ['AI Agent in the flow', '04-agent-in-flow.jpeg'],
    ['Output Parser', '05-output-parser.jpeg'],
    ['Output Parser settings', '06-output-parser-settings.jpeg'],
    ['Your first sub-agent', '07-customer-reply-agent.jpeg'],
    ['The second sub-agent: Risk Agent', '08-risk-agent.jpeg'],
    ['Risk Agent settings', '09-risk-agent-settings.jpeg'],
    ['Data tables', '10-data-table.jpeg'],
    ['Three sub-agents', '11-three-sub-agents.jpeg']
  ];
  for (const [title, filename] of expected) {
    const slide = slides.find(item => item.title === title);
    assert.ok(slide, title);
    const image = slide.visual.image || slide.visual.shot;
    assert.ok(image.endsWith(filename), title);
    assert.ok(existsSync(new URL(image, root)), image);
  }
});

test('Memory, customer data and proof are usable from the deck', () => {
  const memory = slides.find(slide => slide.title === 'Simple Memory');
  assert.equal(memory.visual.imageLink, 'Step 3 · Before connecting Simple Memory');
  assert.match(memory.notes, /without memory/i);
  assert.match(memory.notes, /clean session/i);
  assert.match(memory.notes, /compare/i);
  const data = slides.find(slide => slide.title === 'Data tables');
  assert.equal(data.source.url, 'assets/day3-maarten-n8n/customer-context.csv');
  assert.ok(existsSync(new URL(data.source.url, root)));
  const proof = slides.find(slide => slide.title === 'Save your proof');
  assert.match(proof.expected, /workflow/i);
  assert.match(proof.expected, /human review/i);
  const checkpoints = slides.filter(slide => slide.layout === 'exercise' && /Checkpoint|Three sub-agents/.test(slide.title));
  assert.equal(checkpoints.length, 3);
  for (const slide of checkpoints) {
    assert.ok(slide.visual.shot, slide.title);
    assert.ok(slide.steps.length >= 4, slide.title);
    assert.ok(slide.expected, slide.title);
  }
  const specialists = slides.find(slide => slide.title === 'Three sub-agents');
  assert.equal(specialists.repo.url, 'assets/day3-maarten-n8n/customer-context.csv');
  const risk = slides.find(slide => slide.title === 'Risk Agent settings');
  assert.ok(risk.cards.every(card => card.body.length < 70));
  assert.match(risk.prompt, /Description:/);
  assert.match(risk.prompt, /System Message:/);
});

test('Deck and presenter load the same current Day 3 source', () => {
  const deck = read('day3-maarten-n8n.html');
  const presenter = read('day3-maarten-n8n-presenter.html');
  assert.ok(deck.includes('day3-maarten-n8n-slides.js?v=3'));
  assert.ok(presenter.includes('day3-maarten-n8n-slides.js?v=3'));
  assert.ok(deck.includes('id="timer-btn"'));
  assert.ok(deck.includes('window.ASG_PROMPT = true'));
  assert.ok(deck.includes('styles.css?v=147'));
  assert.ok(deck.includes('demo-fallback.js?v=94'));
  assert.ok(deck.includes('timers.js?v=92'));
  assert.ok(deck.includes('app.js?v=129'));
  assert.ok(presenter.includes('styles.css?v=129'));
  assert.ok(presenter.includes('timers.js?v=92'));
  assert.ok(presenter.includes('sessions.js?v=19'));
  assert.ok(presenter.includes('presenter.js?v=96'));
});
