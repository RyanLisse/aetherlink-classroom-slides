export const DAY4_LESSON_MEDIA = {
  'Assignment 0: Read the n8n flow': {
    clip: 'assets/day4-final-teach/a0-verify.mp4',
    say: 'This is the offline starter check on main. It must end with all tests passing, the MCP smoke check and two dry runs.'
  },
  'Assignment 1: One agent that fills in the form': {
    clip: 'assets/day4-final-teach/a1-check.mp4',
    say: 'This is check:1 on the reference solution. It verifies the options, the output form and CLAUDE.md without calling a model.'
  },
  'Assignment 1b: Inspect the form and the memory': {
    clip: 'assets/day4-final-teach/a1b-dry-run.mp4',
    say: 'This guide shows the documented dry runs. They prove the setup only. Participants still need the live chat to prove session memory.',
    afterStep: 1
  },
  'Assignment 1c: Challenge the policy': {
    clip: 'assets/day4-final-teach/a1c-restore.mp4',
    say: 'This guide proves the accepted policy is restored and check:1 passes. The before and after labels must still come from the participant’s own live runs.',
    afterStep: 3
  },
  'Assignment 1M: Memory per ticket': {
    clip: 'assets/day4-final-teach/a1m-sources.mp4',
    say: 'This guide shows the two real starter sources and the empty state before approval. It shows no invented memory file or model output.',
    afterStep: 0
  },
  'Assignment 2: A main agent and two sub-agents': {
    clip: 'assets/day4-final-teach/a2-check.mp4',
    say: 'This is check:2 on the reference solution. It verifies both sub-agent files and the main-agent options without calling a model.'
  },
  'Assignment 3: Real facts from the lookup desk': {
    clip: 'assets/day4-final-teach/a3-check.mp4',
    say: 'This is check:3 followed by the MCP smoke check. Both are offline checks. The live ticket run is separate model evidence.'
  },
  'Assignment 4: Compare with n8n and collect proof': {
    clip: 'assets/day4-final-teach/a4-dry-runs.mp4',
    say: 'This guide shows the exact three inputs and the full dry-run configuration. A dry run is not acceptance evidence. Use live output or write OPEN.',
    afterStep: 0
  },
  'Assignment 5: Save three drafts for human review': {
    clip: 'assets/day4-final-teach/a5-parity.mp4',
    say: 'This offline check verifies main-owned priority, three fixed routes, three saved drafts and rejection of invalid output. It sends nothing and does not test model behavior.',
    afterStep: 1
  }
};

const DAY4_COMPANION_MEDIA = {
  'What you see · Step 0': DAY4_LESSON_MEDIA['Assignment 0: Read the n8n flow'],
  'What you see · Step 1': DAY4_LESSON_MEDIA['Assignment 1: One agent that fills in the form'],
  'What you see · Step 2': DAY4_LESSON_MEDIA['Assignment 2: A main agent and two sub-agents'],
  'What you see · Step 3': DAY4_LESSON_MEDIA['Assignment 3: Real facts from the lookup desk'],
  'What you see · SOLO 4': DAY4_LESSON_MEDIA['Assignment 4: Compare with n8n and collect proof']
};

export const addDay4LessonMedia = slides => slides.map(slide => {
  const media = DAY4_LESSON_MEDIA[slide.title] || DAY4_COMPANION_MEDIA[slide.kicker];
  if (!media) return slide;
  const script = [...slide.teach.script];
  const terminalStep = script.findIndex(beat => beat.do?.includes('Terminal 2'));
  const insertAt = Number.isInteger(media.afterStep) ? media.afterStep + 1 : terminalStep < 0 ? script.length : terminalStep + 1;
  const {afterStep, ...guide} = media;
  script.splice(insertAt, 0, {
    do: 'Play the short terminal guide. Then let participants compare it with their own output.',
    ...guide
  });
  return {...slide, teach: {...slide.teach, script}};
});
