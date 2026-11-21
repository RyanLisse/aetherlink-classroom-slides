import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {existsSync, readFileSync, statSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';

test('all seven published Daily Brief assignments link a class demo before individual work', () => {
  const context = {window: {}};
  const deck = new URL('../day5-daily-brief-slides.js', import.meta.url);
  vm.runInNewContext(readFileSync(deck, 'utf8'), context);
  const assignments = context.window.SLIDES.filter(slide => /^brief-a[1-7]$/.test(slide.assignmentId));
  const manifest = JSON.parse(readFileSync(new URL('../assets/day5-daily-brief-teach/manifest.json', import.meta.url), 'utf8'));
  assert.equal(assignments.length, 7);
  assert.equal(manifest.guides.length, 7);
  for (const slide of assignments) {
    const {script} = slide.teach;
    const guides = script.filter(beat => beat.clip);
    assert.equal(guides.length, 1, slide.assignmentId);
    const path = `assets/day5-daily-brief-teach/${slide.assignmentId.slice(6)}-guide.mp4`;
    assert.equal(guides[0].clip, path);
    const video = new URL(`../${path}`, import.meta.url);
    assert.ok(existsSync(video), path);
    assert.ok(statSync(video).size > 10_000, `${path} contains a rendered video`);
    assert.equal(readFileSync(video).subarray(4, 8).toString(), 'ftyp', `${path} is a playable MP4 container`);
    assert.equal(guides[0].mediaKind, 'instruction-walkthrough');
    assert.match(guides[0].say, /not a live Claude or connector recording/i);
    const currentFingerprint = createHash('sha256').update(JSON.stringify({
      title: slide.title,
      subtitle: slide.subtitle,
      steps: slide.steps,
      expected: slide.expected,
      prompt: slide.prompt,
      copy: slide.teach?.copy
    })).digest('hex').slice(0, 16);
    const recorded = manifest.guides.find(guide => guide.assignmentId === slide.assignmentId);
    assert.equal(recorded?.file, path);
    assert.equal(recorded?.fingerprint, currentFingerprint, `${slide.assignmentId} video is stale; run node tools/render-day5-guide-videos.mjs`);
    assert.equal(guides[0].mediaFingerprint, currentFingerprint);
    assert.match(recorded?.disclaimer ?? '', /not a live Claude or connector recording/i);
    assert.ok(script.indexOf(guides[0]) < script.findIndex(beat => beat.do.startsWith('Step 1.')));
    assert.ok(script.some(beat => beat.do.startsWith('Class check.')));
  }
});
