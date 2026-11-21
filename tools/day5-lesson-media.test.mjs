import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {test} from 'node:test';
import vm from 'node:vm';

test('the guide renderer rejects unknown arguments before invoking media tools', () => {
  const fakeBin = mkdtempSync(join(tmpdir(), 'day5-media-cli-'));
  const marker = join(fakeBin, 'media-tool-ran');
  try {
    for (const command of ['sips', 'ffmpeg']) {
      const path = join(fakeBin, command);
      writeFileSync(path, `#!/bin/sh\ntouch "${marker}"\nexit 91\n`);
      chmodSync(path, 0o755);
    }
    for (const [argument, message] of [['--check', 'Unknown option: --check'], ['--assignment=', 'Unknown assignment selector:']]) {
      const result = spawnSync(process.execPath, ['tools/render-day5-guide-videos.mjs', argument], {
        cwd: new URL('../', import.meta.url),
        encoding: 'utf8',
        env: {...process.env, PATH: fakeBin},
        timeout: 5_000,
      });
      assert.notEqual(result.status, 0);
      assert.match(`${result.stdout}${result.stderr}`, new RegExp(message));
    }
    assert.equal(existsSync(marker), false, 'unknown arguments must not invoke sips or ffmpeg');
  } finally {
    rmSync(fakeBin, {recursive: true, force: true});
  }
});

test('every published Daily Brief assignment part links a class demo before individual work', () => {
  const context = {window: {}};
  const deck = new URL('../day5-daily-brief-slides.js', import.meta.url);
  vm.runInNewContext(readFileSync(deck, 'utf8'), context);
  const assignments = context.window.SLIDES.filter(slide => /^brief-a[1-7](?:-p[1-3])?$/.test(slide.assignmentId));
  const voiceBonus = context.window.SLIDES.filter(slide => /^brief-voice-p[12]$/.test(slide.assignmentId));
  const guidedSlides = [...assignments, ...voiceBonus];
  const manifest = JSON.parse(readFileSync(new URL('../assets/day5-daily-brief-teach/manifest.json', import.meta.url), 'utf8'));
  assert.deepEqual(
    Array.from(new Set(assignments.map(slide => slide.assignmentId.match(/^brief-(a[1-7])/)[1]))),
    ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7']
  );
  assert.deepEqual(Array.from(voiceBonus, slide => slide.assignmentId), ['brief-voice-p1', 'brief-voice-p2']);
  assert.equal(manifest.guides.length, guidedSlides.length);
  for (const slide of guidedSlides) {
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
    assert.match(guides[0].say, slide.assignmentId.startsWith('brief-voice')
      ? /not a live ElevenLabs account or API recording/i
      : /not a live Claude or connector recording/i);
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
    assert.match(recorded?.disclaimer ?? '', slide.assignmentId.startsWith('brief-voice')
      ? /not a live ElevenLabs account or API recording/i
      : /not a live Claude or connector recording/i);
    const firstParticipantAction = script.findIndex(beat => slide.assignmentId.startsWith('brief-voice')
      ? /^(?:Paste Part|Hand control)/.test(beat.do)
      : beat.do.startsWith('Step 1.'));
    assert.ok(firstParticipantAction > script.indexOf(guides[0]), `${slide.assignmentId} guide precedes participant work`);
    assert.ok(script.some(beat => slide.assignmentId.startsWith('brief-voice')
      ? /approval|inspect|OPEN/i.test(`${beat.do} ${beat.say}`)
      : beat.do.startsWith('Class check.')), `${slide.assignmentId} ends with a human check`);
  }
});
