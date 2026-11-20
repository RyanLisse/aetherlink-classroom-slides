import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {test} from 'node:test';
import {DAY5_LESSON_MEDIA, addDay5LessonMedia} from './day5-lesson-media.mjs';

test('every Bree assignment has a playable instructional guide', () => {
  assert.equal(Object.keys(DAY5_LESSON_MEDIA).length, 7);
  for (const [title, media] of Object.entries(DAY5_LESSON_MEDIA)) {
    assert.ok(existsSync(new URL(`../${media.clip}`, import.meta.url)), media.clip);
    assert.match(media.say, /instruction|does not|invents no|no credentials|performs no/i);
    const slide = {title, teach: {script: [
      {do: 'Step 1. Check the mode.'},
      {do: 'Step 2. Participants copy the SOLO prompt.'},
      {do: 'Step 3. Inspect the result.'}
    ]}};
    const [result] = addDay5LessonMedia([slide]);
    const guide = result.teach.script.find(beat => beat.clip === media.clip);
    assert.ok(guide, `${title}: guide is attached`);
  }
});
