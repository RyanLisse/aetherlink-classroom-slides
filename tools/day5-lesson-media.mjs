import {createHash} from 'node:crypto';

const fingerprint = slide => createHash('sha256').update(JSON.stringify({
  title: slide.title,
  subtitle: slide.subtitle,
  steps: slide.steps,
  expected: slide.expected,
  prompt: slide.prompt,
  copy: slide.teach?.copy
})).digest('hex').slice(0, 16);

export const addDay5LessonMedia = slides => slides.map(slide => {
  const match = /^brief-(?:a[1-7](?:-p[1-3])?|voice-p[12])$/.exec(slide.assignmentId ?? '');
  if (!match) return slide;

  const [intro, demo, ...buildAndCheck] = slide.teach.script;
  const id = slide.assignmentId.slice(6);
  const voice = id.startsWith('voice-');
  const trainerReference = /^(?:a[5-7]|voice-)/.test(id);
  const guide = {
    do: trainerReference
      ? 'Play the labeled synthetic trainer reference. Point at the real command and its visible result, then let participants run their own step.'
      : 'Play the saved participant checkpoint. Point at the real action and its visible result, then let participants run their own step.',
    say: voice
      ? 'This is a saved synthetic trainer reference with a mocked request. It is not a live ElevenLabs account or API recording. Run the free mocked check before any explicit credit-using request.'
      : trainerReference
        ? 'This is saved trainer evidence from synthetic fixtures. It is not a live Claude or connector run. Keep every unavailable live proof OPEN.'
        : 'This is a saved participant checkpoint with synthetic fixtures. It is not a new Claude or connector run. Reproduce the action and result in your own checkout.',
    clip: `assets/day5-daily-brief-teach/${id}-guide.mp4`,
    mediaKind: 'evidence-demonstration',
    mediaFingerprint: fingerprint(slide)
  };
  return {
    ...slide,
    teach: {...slide.teach, script: id === 'voice-p2'
      ? [guide, ...slide.teach.script]
      : [intro, demo, guide, ...buildAndCheck]}
  };
});
