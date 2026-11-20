export const DAY5_LESSON_MEDIA = {
  'Assignment 1: Write down what the brief must do': {
    clip: 'assets/day5-daily-brief-teach/a1-guide.mp4',
    say: 'This guide shows the published Assignment 1 prompt and the intent.md diff to inspect. It is instruction, not a participant result.'
  },
  'Assignment 2: Make the schema test fail, then pass': {
    clip: 'assets/day5-daily-brief-teach/a2-guide.mp4',
    say: 'This guide shows the published Assignment 2 prompt and the npm test proof action. It does not claim a red or green run happened.'
  },
  'Assignment 3: Agree on the design and the plan': {
    clip: 'assets/day5-daily-brief-teach/a3-guide.mp4',
    say: 'This guide shows the published Assignment 3 prompt, plan mode and the design diff to inspect. It does not show an accepted plan.'
  },
  'Assignment 4: Render the brief from sample data': {
    clip: 'assets/day5-daily-brief-teach/a4-guide.mp4',
    say: 'This guide shows the published Assignment 4 prompt and the later brief:sample proof action. It does not run an unfinished renderer.'
  },
  'Assignment 5: Give the agent one read-only tool': {
    clip: 'assets/day5-daily-brief-teach/a5-guide.mp4',
    say: 'This guide shows the published Assignment 5 prompt and the offline sample action. It uses no credentials and makes no live-model claim.'
  },
  'Assignment 6: Record the evidence': {
    clip: 'assets/day5-daily-brief-teach/a6-guide.mp4',
    say: 'This guide shows the published Assignment 6 prompt and the three commands whose real exit codes must be recorded. It invents no evidence.'
  },
  'Assignment 7: Decide the gate and prepare the PR': {
    clip: 'assets/day5-daily-brief-teach/a7-guide.mp4',
    say: 'This guide shows the published Assignment 7 prompt and the gate review. It performs no commit, push, pull request, merge or deployment.'
  }
};

export const addDay5LessonMedia = slides => slides.map(slide => {
  const media = DAY5_LESSON_MEDIA[slide.title];
  if (!media) return slide;
  const script = [...slide.teach.script];
  const promptStep = script.findIndex(beat => beat.do?.includes('copy the SOLO prompt'));
  script.splice(promptStep < 0 ? script.length : promptStep + 1, 0, {
    do: 'Play the short terminal guide. Then compare it with the published prompt and the participant’s own proof.',
    ...media
  });
  return {...slide, teach: {...slide.teach, script}};
});
