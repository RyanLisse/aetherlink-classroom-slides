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
  const match = /^brief-a([1-7])$/.exec(slide.assignmentId ?? '');
  if (!match) return slide;

  const [intro, demo, ...buildAndCheck] = slide.teach.script;
  const number = Number(match[1]);
  const guide = {
    do: 'Play the instruction walkthrough. Then demonstrate the real step and let participants run it.',
    say: 'This video explains where each action happens and what evidence to show. It uses synthetic content and is not a live Claude or connector recording. Record any live connector proof separately.',
    clip: `assets/day5-daily-brief-teach/a${number}-guide.mp4`,
    mediaKind: 'instruction-walkthrough',
    mediaFingerprint: fingerprint(slide)
  };
  return {
    ...slide,
    teach: {...slide.teach, script: [intro, demo, guide, ...buildAndCheck]}
  };
});
