import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {test} from 'node:test';
import {DAY4_LESSON_MEDIA, addDay4LessonMedia} from './day4-lesson-media.mjs';

test('Day 4 lesson media exists and appears after the terminal check', () => {
  for (const [title, media] of Object.entries(DAY4_LESSON_MEDIA)) {
    assert.ok(existsSync(new URL(`../${media.clip}`, import.meta.url)), media.clip);
    const slide = {title, teach: {script: [
      {do: 'Step 1 · Claude Code.'},
      {do: 'Step 2 · Terminal 2.'},
      {do: 'Ask two people to show their result.'}
    ]}};
    const [result] = addDay4LessonMedia([slide]);
    const guide = result.teach.script.find(beat => beat.clip === media.clip);
    assert.ok(guide, `${title}: guide is attached`);
    assert.match(guide.say, /dry run|offline|without calling a model|no invented|own live runs/i);
  }
});

test('checkpoint slides reuse the matching assignment guide', () => {
  for (const [kicker, title] of [
    ['What you see · Step 0', 'Assignment 0: Read the n8n flow'],
    ['What you see · Step 1', 'Assignment 1: One agent that fills in the form'],
    ['What you see · Step 2', 'Assignment 2: A main agent and two sub-agents'],
    ['What you see · Step 3', 'Assignment 3: Real facts from the lookup desk'],
    ['What you see · SOLO 4', 'Assignment 4: Compare with n8n and collect proof']
  ]) {
    const slide = {title: 'Check', kicker, teach: {script: []}};
    const [result] = addDay4LessonMedia([slide]);
    assert.equal(result.teach.script[0].clip, DAY4_LESSON_MEDIA[title].clip);
  }
});
