import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

// Day 3 is one combined deck (day3-jessy, Jessy's version with presenter notes): Ryan's ticket story and L1 → L3 climb,
// Maarten's build steps and screenshots, written in the Day 1 and 2 style.
const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const context = { window: {} };
vm.runInNewContext(read('day3-jessy-slides.js'), context);
const slides = context.window.SLIDES;
const titles = slides.map(slide => slide.title);
const exercises = slides.filter(slide => slide.layout === 'exercise');
const assignments = exercises.filter(slide => /^Assignment \d+:/.test(slide.title));

test('Day 3 runs from welcome through registration, L1, L2, L3 to proof', () => {
  assert.equal(slides.length, 45);
  const order = [
    'Welcome to Day 3!',
    'What do you remember from last week?',
    'Assignment 30: Get your own n8n',
    'Your own n8n. Workshop data only.',
    'A tour of n8n',
    'Assignment 31: Build L1, the ticket Switch',
    'Assignment 32: Find where L1 needs a person',
    'What is an agent?',
    'Assignment 35: Put the agent in the ticket flow',
    'Assignment 36: Fixed fields for the Switch',
    'Assignment 37: The Customer Reply Agent',
    'Assignment 40: Give the specialist the table',
    'Assignment 41: From chat to chat',
    'Assignment 42: Save your proof',
    'What did you learn?'
  ];
  let last = -1;
  for (const title of order) {
    const at = titles.indexOf(title);
    assert.ok(at > last, title);
    last = at;
  }
  const numbers = assignments.map(slide => Number(/^Assignment (\d+)/.exec(slide.title)[1]));
  assert.equal(numbers.join(','), '30,31,32,33,34,35,36,37,38,39,40,41,42');
});

test('Registration slide explains the n8n Cloud trial and the Gateway credits', () => {
  const setup = slides.find(slide => slide.title === 'Assignment 30: Get your own n8n');
  assert.equal(setup.repo.url, 'https://n8n.io');
  const text = JSON.stringify(setup);
  for (const term of ['14 days', '1,000', 'app.n8n.cloud', 'Included in n8n', 'Download'.toLowerCase()]) assert.ok(text.toLowerCase().includes(term.toLowerCase()), term);
  assert.match(setup.notes, /Gateway credits/);
});

test('Every assignment is teachable: steps with what you see, a Done when, and full notes', () => {
  for (const slide of exercises) {
    assert.ok(slide.steps.length >= 3 && slide.steps.length <= 6, slide.title);
    assert.ok(slide.expected, slide.title);
    assert.ok(slide.calm, slide.title);
    assert.ok(slide.steps.every(step => typeof step === 'object' && step.text), slide.title);
    assert.ok(slide.notes.length > 300, slide.title);
    assert.match(slide.notes, /Say:/, slide.title);
  }
  const build = assignments.filter(slide => /BUILD|TEST|FINAL/.test(slide.kicker));
  for (const slide of build) assert.match(slide.notes, /Watch for:/, slide.title);
});

test('The texts participants paste are on the slides, with a Copy button', () => {
  const prompts = exercises.flatMap(slide => slide.steps.filter(step => step.prompt).map(step => step.prompt));
  assert.ok(prompts.length >= 20);
  const all = prompts.join('\n');
  for (const text of ['"ticket_id": "WL-1026"', 'Message: {{ $json.message }}', 'You are a support triage agent', '"priority":""',
    'You are a customer support communication specialist.', 'You are a payment risk and escalation specialist.',
    'You are a customer context specialist.', 'CUST-004: Please send me a copy of my invoice', 'My favorite color is red']) assert.ok(all.includes(text), text);
  const tool = slides.find(slide => slide.title === 'Assignment 40: Give the specialist the table');
  assert.match(JSON.stringify(tool.steps), /Operation.*Get/);
  assert.match(JSON.stringify(tool.steps), /Column.*customer_id/);
  assert.match(tool.notes, /\$fromAI\('customer_id'/);
  const log = slides.find(slide => slide.title === 'Extra B: Let the workflow keep a log');
  assert.ok(JSON.stringify(log.steps).includes("$('Ticket Input').item.json.ticket_id"));
  assert.doesNotMatch(JSON.stringify(slides), /flipchart|projector|neighbour/);
  for (const ticket of ['WL-1027', 'WL-9001', 'WL-9002', 'WL-1030']) {
    const json = prompts.find(prompt => prompt.includes(ticket));
    assert.ok(json, ticket);
    assert.doesNotThrow(() => JSON.parse(json), ticket);
  }
});

test('Screenshots and downloads exist', () => {
  for (const slide of slides) {
    const v = slide.visual || {};
    for (const image of [v.image, v.shot].filter(Boolean)) assert.ok(existsSync(new URL(image, root)), image);
    for (const link of [slide.repo, slide.source].filter(Boolean)) if (!/^https?:/.test(link.url)) assert.ok(existsSync(new URL(link.url, root)), link.url);
  }
});

test('Deck and presenter load the same Day 3 source on the current Day 1 and 2 shell', () => {
  const deck = read('day3-jessy.html');
  const presenter = read('day3-jessy-presenter.html');
  assert.ok(deck.includes('day3-jessy-slides.js?v=15'));
  assert.ok(presenter.includes('day3-jessy-slides.js?v=15'));
  assert.ok(deck.includes('id="timer-btn"'));
  assert.ok(deck.includes('window.ASG_PROMPT = true'));
  assert.ok(deck.includes('styles.css?v=147'));
  assert.ok(deck.includes('app.js?v=129'));
  assert.ok(presenter.includes('styles.css?v=129'));
  assert.ok(presenter.includes('sessions.js?v=19'));
  assert.ok(presenter.includes('presenter.js?v=104'));
  assert.ok(presenter.includes('window.DECK_PAGE = "day3-jessy.html"'));
});
