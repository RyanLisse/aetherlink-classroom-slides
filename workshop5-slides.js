'use strict';

const PROMPTS = {
  a1Map: `/show-me Read README.md, WORKSHOP.md, CLAUDE.md, package.json, fixtures/incidents/bad-deploy.json, and the runtime entry points. Give me a shallow repository map of two intake paths: the fixture CLI for INC-1001 and the live console listener that creates a new incident id from shop telemetry. Show where both paths call the shared investigate flow. Stay read-only. Do not generate HTML. Name the four files I should inspect next, then stop.`,
  a1Setup: `Use the repository map we just reviewed. Check Node and my current diff. Install dependencies only if they are missing, then generate the sample fixtures. Run the main tests. Run the workshop tests and explain why A3, A4, A5, and A8 are expected to fail. Do not solve them. Run npm run workshop:check only to locate unfinished markers; it is not a completion gate. Check port 4320. If it is free, start the console with AGENT_LISTEN_WINDOW_MIN=1. If it is occupied, do not stop the process. Report whether it belongs to this lab and whether its listener window is known. Show the console health and local URL. Do not push or change hooks. Stop for my setup review.`,
  a2Design: `/design-control-loop Read intent.md, fixtures/incidents/bad-deploy.json, and REVIEW.md. Ask me at most three questions in one round about the operator, the observable outcome, and the read-only boundary. Recommend an answer for each question. Map my answers to intent.md fields. Stay in design mode. Do not edit or build. Stop after the field map.`,
  a2Write: `Use the decisions from the design-control-loop interview. Propose an exact intent.md diff with one operator outcome, three checks a stranger can repeat, the sample-data boundary, and the named human decisions. Wait for my approval. After I approve, edit only intent.md and show the diff. Do not build or push.`,
  a3Contract: `Read the accepted intent.md, docs/spec.md, src/contract.ts, src/runtime.ts, src/prompts.ts, and the A3 workshop test. Explain the current verdict contract in plain English. Propose the smallest contract change that requires non-empty customer_impact, keeps unsupported claims OPEN, and keeps the offline and optional real-model schemas aligned. Describe observed request failures or latency; keep affected versions, regions, and customer segments OPEN unless the cited metric establishes them. Do not edit code or tests. Stop for my contract review.`,
  a3Build: `Use the contract I accepted. Run the focused A3 test and show the red assertion. Explain the failure before editing. Then implement the accepted A3 contract without weakening tests. Change TODO(A3), docs/spec.md, the contract schema and types, all offline runtime verdict branches, the real-model schema in src/prompts.ts, the relevant contract, approval, and executor fixtures that consume customer_impact, and display customer_impact in src/cli.ts and console/index.html. Do not change unrelated product scaffolding. Rerun the focused A3 test. Run the main tests, typecheck, and the offline investigation. Show the exact CLI output, console field, test outputs, and diff. Do not copy a solved implementation, approve, execute, resolve, or push.`,
  a3Verify: `/verify-this Verify this claim: the A3 verdict contract cannot pass without non-empty customer_impact and the offline investigation still reports customer impact. Use the accepted spec, the focused A3 test, the main tests, typecheck, and the offline output. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with file and output references. Stay read-only.`,
  a4Chat: `Read intent.md, src/chat.ts, and test/workshop/chat.test.ts. Explain the chat-refusal contract in plain English. Add a named MUTATION regex constant because the progress hook checks it. Add a negative test that the read-only question "Was the deploy the cause?" remains a question and is not refused. Ask me to choose one extra operational mutation phrase. Add that phrase to the focused test, show the test red, then implement only TODO(A4) in src/chat.ts. Rerun the focused chat test and show the diff. Do not edit .claude/, approvals/, lessons/lessons.md, PROGRESS.md, or bench/ratchet.json. Do not approve or execute anything. Stop before the human hook step.`,
  a4Review: `Read the human edit in .claude/hooks/guard.mjs and test/workshop/guard.test.ts. Do not edit either file. Run only the focused guard test. Explain whether Edit and Write to bench/ratchet.json are denied, and show the audit result. Do not claim that the hook blocks every shell command. Stop for my review.`,
  a5Build: `Read intent.md, src/tools.ts, src/runtime.ts, src/chat.ts, and test/workshop/tools.test.ts. Explain how list_deploys stays read-only and where its trace arguments are recorded. Show the three starter bypasses that read deploys without the new handler. Ask me to choose one edge case: an empty time window or a missing deploy. Show the focused A5 test red. After my approval, implement TODO(A5) in src/tools.ts and remove the list_deploys bypasses from src/runtime.ts and src/chat.ts so offline investigation and chat use the registered handler. Add my edge case and rerun the focused test. Then run the main tests, typecheck, and the offline investigation. Show the tool result and exact trace arguments. Do not add a mutation tool, approve, execute, resolve, or push.`,
  a6Map: `/show-me Read docs/plan.md, fixtures/incidents/bad-deploy.json, and the existing shop, traffic, chaos, and console scripts. Map two shallow paths: the fixture CLI for INC-1001 and the live listener that creates a new incident id from shop telemetry. Show where both paths use the shared investigate flow and tool trace. Stay read-only. Do not generate HTML. Separate scripted fixture output from optional model output, then stop.`,
  a6Build: `Use the incident path we reviewed. Propose a local demo plan with files, order, risks, proof, rollback, and one alternative cause. Wait for my approval. Reuse running processes. After I approve, give me exact commands for separate terminals. I will start the console with AGENT_LISTEN_WINDOW_MIN=1, start the shop, keep healthy traffic running for two minutes to establish the before state, and then run the one-shot bad-deploy chaos command in its own terminal. Do not run chaos or stop processes yourself. When I confirm the incident exists, help me trace each diagnosis claim to a stable source:ref label. Keep diagnosis-snapshot evidence separate from current telemetry. Ask before writing docs/diagnosis-live.md. Mark missing evidence OPEN. Do not approve, execute, resolve, or push.`,
  a6Evidence: `Which evidence supports the proposed rollback? Show stable source:ref labels. Separate the diagnosis snapshot from current telemetry. Do not approve or execute anything.`,
  a6Alternative: `Could this be something other than the deployment?`,
  a6Mutation: `Roll back now.`,
  a7Build: `Read bench/cases.json, bench/ratchet.json, the current bench results, and the bench tests. Explain what the offline scripted bench proves and what it does not prove. Run the bench before any edit and save its exact output plus the original case count and ratchet values under docs/verify/a7-offline-bench/baseline/. Ask me to choose one incident variation. Propose a deterministic fixture case and its expected policy result, then wait for my approval. After I approve, add the case without weakening existing cases or lowering the score floor. Run the bench again, save the exact output under docs/verify/a7-offline-bench/treatment/, and rerun one neighboring case. Show the diff, case count, pass result, and harmful count. Do not claim that this proves resistance to live model prompt injection. Do not alter hooks, approve, execute, resolve, or push.`,
  a7Verify: `/verify-this Verify this claim: the new deterministic fixture case increases the case count by one, the new case passes, harmful remains 0, and both ratchet values are unchanged. Compare the saved baseline and treatment outputs and the neighboring rerun. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with evidence references. Stay read-only.`,
  a8Build: `Read intent.md, src/executor.ts, approvals/README.md, and the A8 workshop test. Explain the exact incident-and-action match that a valid approval requires. Ask me to choose one negative case: wrong incident or wrong action. Show the focused A8 test red. After my approval, implement only TODO(A8), add the negative case, and rerun the focused test. Then run the main tests and typecheck. Show why the negative case stays blocked. Do not create an approval, click Approve, Execute, or Resolve, edit a human decision record, or push. Stop with the real console action marked HUMAN OPEN.`,
  a9Maintain: `Read docs/diagnosis-live.md, lessons/proposed/, lessons/lessons.md, approvals/audit.jsonl, and PROGRESS.md. Explain the difference between curated operational knowledge, the action log, and local progress signals. Propose one reusable lesson with the incident id and stable evidence references. Do not edit lessons/lessons.md. Ask me which claim a human can accept and which claim must stay OPEN. Then interview me one question at a time about a hackathon problem. Draft docs/hackathon-intent.md with an outcome, three repeatable checks, boundaries, and OPEN questions. Show the proposed lesson and intent diff for review. Do not resolve the incident, promote the lesson, or push.`,
  a9Handoff: `/handoff Create a handoff prompt for the next teammate. Include the accepted intent, verified checks with evidence references, every HUMAN OPEN item, the hackathon intent, and one concrete next step. Do not claim that the incident was resolved, the lesson was promoted, or a human action happened. For this classroom run, do not copy to the clipboard. Print the full handoff here for my review. Stop before editing any file.`,
  a9Save: `Save the exact handoff text I just approved to HANDOFF.md. Ask before writing the file. Do not add new claims or change the reviewed wording. Show the diff, then stop. Do not push.`
};

const note = ({time, why, predict, play, pause, see, inside, participant, watch, stuck, stop, next}) => [
  `Time: ${time}.`,
  `Why now: ${why}`,
  `Predict: ${predict}`,
  play ? `Play: ${play}` : null,
  pause ? `Pause: ${pause}` : null,
  `What you see: ${see}`,
  `Look inside: ${inside}`,
  `Participant does: ${participant}`,
  `Watch for: ${watch}`,
  `If stuck: ${stuck}`,
  `Stop: ${stop}`,
  `Next: ${next}`
].filter(Boolean).join('\n\n');

const noteValue = (notes, label) => String(notes || '')
  .split('\n\n')
  .find((line) => line.startsWith(`${label}: `))
  ?.slice(label.length + 2);

const teachFromNotes = ({title, subtitle, keyPoints, notes}) => {
  const gist = subtitle || title;
  const predict = noteValue(notes, 'Predict');
  return {
    time: noteValue(notes, 'Time') || 'Facilitator',
    gist,
    script: predict ? [{say: noteValue(notes, 'Why now') || gist}, {ask: predict}] : [{say: gist}],
    do: [noteValue(notes, 'Participant does') || `Present ${title}.`],
    done: [noteValue(notes, 'Stop') || keyPoints.at(-1) || gist],
    watch: [noteValue(notes, 'Watch for')].filter(Boolean),
    next: noteValue(notes, 'Next') || ''
  };
};

const baseSlide = ({title, kicker, subtitle, type = 'concept', cards = [], keyPoints = [], notes, stage, beat, visual, layout, items, tagline, prompt, stepsHeading, steps, expected, repo, teach}) => ({
  title, kicker, subtitle, type, cards, keyPoints, notes, stage, beat, visual, layout, items, tagline, prompt, stepsHeading, steps, expected, repo,
  teach: teach || teachFromNotes({title, subtitle, keyPoints, notes})
});

const demoSlide = ({number, title, subtitle, clip, predict, pause, points, stage, next}) => baseSlide({
  title,
  kicker: `W5 · A${number} · WATCH`,
  subtitle,
  type: 'demo',
  stage,
  beat: 'demo',
  cards: points.map((body, index) => ({title: `${index + 1}`, body})),
  keyPoints: points,
  tagline: predict,
  notes: note({time: '2 min', why: 'A short example gives the learner a proof target before Claude starts.', predict, play: `${clip}. This older clip is illustrative. It is not proof of the participant's current run.`, pause, see: points[0], inside: points[1], participant: 'Name the proof that must appear on your own screen.', watch: 'Do not present saved output as evidence of the current run.', stuck: 'Skip the clip. Read the proof points and continue.', stop: 'Stop the clip at the proof line.', next}),
  teach: {time: '2 min', gist: subtitle, script: [{ask: predict}, {clip, say: 'Illustrative saved evidence. The participant output remains the proof.'}, {do: pause}], do: [pause], done: [points[points.length - 1]], watch: ['The clip is illustrative, not current run evidence.'], next}
});

const assignmentSlide = ({number, title, subtitle, stage, duration, prompts, manualSteps = [], after, checks, choice, humanOpen, next}) => baseSlide({
  title: `Assignment ${number}: ${title}`,
  kicker: `W5 · A${number} · BUILD`,
  subtitle,
  type: 'practice',
  layout: 'exercise',
  stage,
  beat: 'turn',
  repo: {url: 'https://github.com/AetherLink-bv/sre-oncall-agent/tree/workshop/start', label: 'AetherLink-bv/sre-oncall-agent · workshop/start'},
  stepsHeading: 'Copy, build, inspect:',
  steps: [
    ...prompts.map((item, index) => ({text: item.label || `Copy prompt ${index + 1}`, prompt: item.prompt, after: item.after})),
    ...manualSteps
  ],
  expected: after,
  cards: [{title: 'Your choice', body: choice}, {title: 'Checkpoint', body: checks.join('\n')}, {title: 'Human stays responsible', body: humanOpen}],
  keyPoints: checks,
  notes: note({time: duration, why: subtitle, predict: `Ask which result would prove A${number} is complete.`, see: after, inside: checks.join(' '), participant: `Make the choice: ${choice} Copy the prompt and inspect Claude's work.`, watch: humanOpen, stuck: 'After 2 minutes without visible progress, ask Claude: "State the blocker and the next focused check." Do not run the full suite again unless this assignment asks for it.', stop: checks[checks.length - 1], next}),
  teach: {time: duration, gist: subtitle, script: [{ask: `Which result would prove A${number} is complete?`}, {do: `Share the Copy prompt. Learners choose: ${choice}`}, {do: `Pair check: ${checks[0]}`}], do: ['Share the Copy prompt.', `Inspect: ${checks[0]}`], done: [after], watch: [humanOpen, 'Use the focused recovery prompt after 2 minutes without visible progress.'], next}
});

const pauseSlide = (title, duration, next) => baseSlide({
  title,
  kicker: `W5 · ${duration.toUpperCase()}`,
  type: 'pause',
  cards: [{title: 'Next', body: next}],
  visual: {countdown: Number.parseInt(duration, 10), bot: 'wave', place: 'beside'},
  notes: `Time: ${duration}.\n\nStart the timer. Help only with the current checkpoint.\n\nNext: ${next}`,
  teach: {time: duration, gist: title, script: [{do: 'Start the timer.'}], do: ['Start the timer.'], done: [`Resume with ${next}.`], watch: [], next}
});

const openingSlides = [];
const assignmentSlides = [];
const closingSlides = [];
const appendixSlides = [];

openingSlides.push(
  baseSlide({
    title: 'Day 5 starts with one broken checkout',
    kicker: 'W5 · AI-NATIVE SDLC',
    subtitle: 'You are new to the codebase. One failure story already has a fixture record.',
    type: 'context',
    cards: [
      {title: 'Customer', body: 'Checkout errors rose after deploy d-4821.'},
      {title: 'You', body: 'You have 15 minutes before the next handoff.'},
      {title: 'Claude Code', body: 'The builder reads and changes the project with your review.'}
    ],
    keyPoints: ['Start with the customer impact.', 'Follow the failure across fixture and live records.', 'A human owns every operational action.'],
    visual: {opener: 'welcome', bot: 'alert', place: 'beside'},
    notes: note({time: '10:00 · 2 min', why: 'The incident gives every later file, test, and gate a reason to exist.', predict: 'Ask what you would inspect before you changed code.', see: 'Checkout errors rose after one deploy.', inside: 'The learner starts without codebase knowledge.', participant: 'Give one first check.', watch: 'Do not introduce AI-native SDLC jargon yet.', stuck: 'Read the incident and ask for the first observable fact.', stop: 'Collect two answers.', next: 'Meet the builder and the product'})
  }),
  baseSlide({
    title: 'Meet the builder and the product',
    kicker: 'W5 · TWO ROLES',
    subtitle: 'Claude Code builds the project. The on-call agent is the product you build.',
    type: 'concept',
    cards: [
      {title: 'Builder · Claude Code', body: 'Reads the repo, proposes changes, edits code, and runs focused checks after you approve.'},
      {title: 'Product · on-call agent', body: 'Reads scripted sample evidence, writes a cited diagnosis, and refuses operational action.'}
    ],
    keyPoints: ['Do not confuse the builder with the product.', 'The core runtime is offline and scripted.', 'A real model investigator is optional and separate.'],
    notes: note({time: '10:02 · 2 min', why: 'Beginners otherwise attribute product behavior to the builder session.', predict: 'Ask which role edits src/chat.ts.', see: 'Claude Code is outside the product loop.', inside: 'The sample product uses repeatable fixtures without an API key.', participant: 'Name one builder action and one product action.', watch: 'Never label scripted output as live model evidence.', stuck: 'Point to the two cards.', stop: 'The room can name both roles.', next: 'The customer needs a safe first responder'})
  }),
  baseSlide({
    title: 'The customer needs a safe first responder',
    kicker: 'W5 · PROBLEM',
    subtitle: 'The first responder gathers evidence before a person decides.',
    type: 'context',
    cards: [
      {title: 'Without help', body: 'Search logs, compare deploys, inspect a diff, and write a handoff.'},
      {title: 'With the agent', body: 'Get a cited diagnosis, one alternative cause, and an explicit OPEN list.'},
      {title: 'Still human', body: 'Approve, execute, resolve, and promote a lesson.'}
    ],
    keyPoints: ['Evidence before proposal.', 'Stable references before trust.', 'Human action stays OPEN.'],
    notes: note({time: '10:04 · 2 min', why: 'The learner needs the outcome before the implementation route.', predict: 'Ask which action must never happen from chat.', see: 'The agent reduces search time but does not own the decision.', inside: 'The boundary separates investigation from action.', participant: 'Name one agent task and one human task.', watch: 'Do not say that automation removes accountability.', stuck: 'Point to Approve, Execute, and Resolve.', stop: 'The room can state the boundary.', next: 'What you have built by 16:00'})
  }),
  baseSlide({
    title: 'What you have built by 16:00',
    kicker: 'W5 · OUTCOME',
    subtitle: 'A local first responder for one failure story and a handoff for your hackathon.',
    type: 'context',
    cards: [
      {title: 'Investigate', body: 'Read metrics, deploys, the diff, and logs.'},
      {title: 'Explain', body: 'Attach stable source:ref labels to every claim.'},
      {title: 'Stop safely', body: 'Refuse mutation requests and wait at the human gate.'},
      {title: 'Continue later', body: 'Leave tested evidence, OPEN items, and one next step.'}
    ],
    keyPoints: ['Visible result first.', 'One failure story connects all nine assignments.', 'The hackathon starts from the handoff.'],
    notes: note({time: '10:06 · 2 min', why: 'Participants can judge every assignment against the final result.', predict: 'Ask which card would be hardest to prove.', see: 'Four observable outcomes.', inside: 'Each outcome becomes a later checkpoint.', participant: 'Choose the outcome you want to inspect most closely.', watch: 'Do not promise a production agent.', stuck: 'Connect each card to the failure story.', stop: 'The room can describe the finished local lab.', next: 'Today repeats the Day 1–4 loop'})
  }),
  baseSlide({
    title: 'Today repeats the Day 1–4 loop',
    kicker: 'W5 · RECAP',
    subtitle: 'You know the working method. Today the evidence gets stricter.',
    type: 'concept',
    cards: [
      {title: 'Day 1', body: 'intent.md, CLAUDE.md, plan mode, permissions, and hooks.'},
      {title: 'Day 2', body: 'Project skills, reusable workflows, and subagents make methods repeatable.'},
      {title: 'Day 3', body: 'The n8n triage used chat, memory, structured output, subagents, and tools.'},
      {title: 'Day 4', body: 'Claude Code rebuilt the known workflow with prompts, agents, and read-only data.'}
    ],
    keyPoints: ['Prompt one result.', 'Inspect the diff.', 'Run a focused check.', 'Trace claims.', 'Keep uncertainty OPEN.'],
    notes: note({time: '10:08 · 3 min', why: 'Repetition lowers the load for a learner who is new to this repository.', predict: 'Ask which earlier step caught a mistake.', see: 'The same method now operates on an incident.', inside: 'Trace and OPEN make the Day 5 proof stricter.', participant: 'Give one concrete example from Days 1–4.', watch: 'Do not reteach every earlier concept.', stuck: 'Use one participant example and continue.', stop: 'Name the repeated method once.', next: 'Clone and trust the project'})
  }),
  baseSlide({
    title: 'Clone and trust the project',
    kicker: 'W5 · ONE-TIME SETUP',
    subtitle: 'Use any terminal at your own clone. Open the local result in a browser.',
    type: 'practice',
    layout: 'steps',
    items: [
      {label: '1', caption: 'Clone workshop/start into a new folder.'},
      {label: '2', caption: 'Enter your clone and review its path.'},
      {label: '3', caption: 'Confirm the workshop/start branch.'},
      {label: '4', caption: 'Run Claude Code and review folder trust.'},
      {label: '5', caption: 'Confirm project skills are available.'}
    ],
    steps: [
      {text: 'Clone the participant branch once', prompt: 'git clone --branch workshop/start --single-branch https://github.com/AetherLink-bv/sre-oncall-agent.git\ncd sre-oncall-agent', after: 'The terminal is inside the workshop/start clone.'},
      {text: 'Start Claude Code', prompt: 'claude', after: 'Confirm the displayed path matches your own clone. Accept trust only for that clone. Restart Claude Code if project skills remain missing after trust.'}
    ],
    cards: [
      {title: 'No extra setup', body: 'The repository already contains the project skills.'},
      {title: 'Any terminal works', body: 'Cursor is convenient, but the lesson only needs a terminal and browser.'}
    ],
    keyPoints: ['Open your own clone.', 'Review the displayed trust path.', 'Use the existing project skills.'],
    notes: note({time: '10:11 · 4 min', why: 'Everyone needs the same trusted repository before the first prompt.', predict: 'Ask which folder Claude Code may trust.', see: 'The terminal is at the root of the participant clone.', inside: 'Project skills load only after the participant trusts that folder.', participant: 'Review the path, accept trust only for your own clone, and restart Claude Code if the project skills remain missing.', watch: 'Never bypass trust or accept an unfamiliar folder. Cursor is optional.', stuck: 'Check the path and workshop/start branch, then restart Claude Code.', stop: 'Every participant can see the Claude Code prompt and project skills.', next: 'The repository already knows how to help'})
  }),
  baseSlide({
    title: 'The repository already knows how to help',
    kicker: 'W5 · PROJECT SKILLS',
    subtitle: 'Invoke a project skill by starting the prompt with its slash command.',
    type: 'concept',
    cards: [
      {title: '/show-me', body: 'Map the repo or explain one flow.'},
      {title: '/design-control-loop', body: 'Interview, map, and stop before implementation.'},
      {title: '/verify-this', body: 'Return VERIFIED, NOT VERIFIED, or INCONCLUSIVE for one falsifiable claim.'},
      {title: '/handoff', body: 'Write a portable prompt for the next agent.'}
    ],
    keyPoints: ['The slash command must start the prompt.', 'Skills guide a method. They do not replace review.', 'No global install is required.'],
    notes: note({time: '10:15 · 1 min', why: 'The first assignment uses a project skill to learn the codebase.', predict: 'Ask which skill should run before the first edit.', see: 'Four skills match four decisions in the day.', inside: 'These skills require explicit slash invocation.', participant: 'Choose the skill that maps an unknown repository.', watch: 'Do not write a normal prompt that merely mentions a slash skill.', stuck: 'Point to /show-me.', stop: 'The room knows that the slash command starts the prompt.', next: 'One ticket, nine assignments'})
  }),
  baseSlide({
    title: 'One ticket, nine assignments',
    kicker: 'W5 · ROUTE',
    subtitle: 'Each assignment leaves one artifact that the next assignment can inspect.',
    type: 'concept',
    layout: 'steps',
    items: [
      {label: 'A1', caption: 'Repo map and setup proof'}, {label: 'A2', caption: 'Reviewed intent'},
      {label: 'A3', caption: 'Tested verdict contract'}, {label: 'A4', caption: 'Chat refusal and human hook'},
      {label: 'A5', caption: 'Read-only deploy tool'}, {label: 'A6', caption: 'Cited live diagnosis'},
      {label: 'A7', caption: 'Offline fixture coverage'}, {label: 'A8', caption: 'Named human gate'},
      {label: 'A9', caption: 'Lesson, hackathon intent, and handoff'}
    ],
    keyPoints: ['Claude builds one step.', 'You choose and inspect.', 'The human gate remains OPEN.'],
    notes: note({time: '10:16 · 1 min', why: 'The route prevents a beginner from solving the whole codebase at once.', predict: 'Ask where the first human-only edit appears.', see: 'Nine small results form one investigation and handoff route.', inside: 'Each artifact is evidence for the next assignment.', participant: 'Keep this route open when you lose your place.', watch: 'Do not jump to a solved branch or tag.', stuck: 'Return to the current artifact.', stop: 'Point to A1.', next: 'The starter stack'})
  }),
  baseSlide({
    title: 'The starter stack',
    kicker: 'W5 · STARTER · STACK',
    subtitle: 'The supplied layers already connect the browser to repeatable evidence.',
    type: 'concept',
    layout: 'steps',
    items: [
      {label: 'Browser', caption: 'Open the local incident console.'},
      {label: 'Console', caption: 'Plain HTML, CSS, and JavaScript.'},
      {label: 'Runtime', caption: 'Node 22, TypeScript, tsx, and Zod.'},
      {label: 'Evidence', caption: 'Read-only tools, fictional fixtures, and tests.'}
    ],
    keyPoints: ['Use the supplied layers.', 'Keep the core route offline.', 'Do not regenerate the app.'],
    notes: note({time: '10:17 · 30 sec', why: 'The learner needs the supplied technical layers before deciding what to build.', predict: 'Ask which layer owns the fictional evidence.', see: 'Browser, plain console, runtime, and evidence form one local stack.', inside: 'The optional model SDK sits outside the core offline proof.', participant: 'Trace the four layers once.', watch: 'Do not label the console React.', stuck: 'Read the layers from top to bottom.', stop: 'The room can name the supplied stack.', next: 'What is ready and what you build'})
  }),
  baseSlide({
    title: 'What is ready and what you build',
    kicker: 'W5 · STARTER VS LEARNER',
    subtitle: 'The starter limits code generation. Your work stays focused on agent behavior and proof.',
    type: 'concept',
    cards: [
      {title: 'Starter', body: 'Console, shop, traffic, chaos, runtime, tools, fixtures, and tests.'},
      {title: 'You build and prove', body: 'A3 contract, A4 controls, A5 tool path, A8 gate, cited diagnosis, and handoff.'}
    ],
    keyPoints: ['Do not regenerate the supplied app.', 'Prompt one bounded behavior.', 'Spend time on decisions and proof.'],
    notes: note({time: '10:17:30 · 30 sec', why: 'Building a console from scratch would consume tokens and class time without teaching the agent contract.', predict: 'Ask which four behaviors participants still implement.', see: 'The starter supplies the runtime surface. The learner supplies the agent behavior and proof.', inside: 'A3, A4, A5, and A8 contain the missing behavior.', participant: 'Name one supplied component and one behavior you will build.', watch: 'Do not ask Claude to replace the console, shop, traffic generator, fixtures, tests, or tool infrastructure.', stuck: 'Point to the You build and prove card.', stop: 'The room can separate starter code from learner work.', next: 'A1 · Learn the repo before you build'})
  })
);

assignmentSlides.push(
  baseSlide({
    title: 'A1 · Learn the repo before you build', kicker: 'W5 · A1 · CONCEPT', subtitle: 'A repository map turns unknown code into four files and one call tree.', stage: 'setup', beat: 'concept',
    cards: [{title: 'Fixture intake', body: 'The CLI loads fixture INC-1001.'}, {title: 'Live intake', body: 'The console listener creates a new id from shop telemetry.'}, {title: 'Shared flow', body: 'Both use investigate, read-only tools, and a trace.'}],
    keyPoints: ['Start read-only.', 'Keep both intakes separate.', 'Find the shared investigate flow.'],
    notes: note({time: '10:18 · 2 min', why: 'A beginner needs a small map before setup commands have meaning.', predict: 'Ask where the fixture and live paths first differ.', see: 'The CLI loads INC-1001. The listener creates a new live incident id.', inside: 'Both paths call the shared investigate flow and produce a tool trace.', participant: 'Predict one file on each intake path.', watch: 'Do not draw an impossible fixture-to-console path.', stuck: 'Find the CLI intake, live listener, then shared investigate function.', stop: 'The two intakes and shared flow are clear.', next: 'Watch A1'})
  }),
  demoSlide({number: 1, title: 'Watch A1 · Review older setup evidence', subtitle: 'The older clip shows saved setup logs. Your run must add the new read-only repo map.', clip: 'assets/day5-teach/a1.mp4', predict: 'Which expected red test tells you where the build starts?', pause: 'Pause on the saved logs and name what the current A1 still needs to prove.', points: ['The clip reviews saved setup evidence.', 'It does not prove that the recorded session ran those checks.', 'Your current proof adds the repo map, console health, and expected red tests.'], stage: 'setup', next: 'Assignment 1'}),
  assignmentSlide({
    number: 1, title: 'map the repo and prove setup', subtitle: 'Learn the incident path, then prove the starter is ready.', stage: 'setup', duration: '15 min',
    prompts: [{label: 'Copy the repo-map skill prompt', prompt: PROMPTS.a1Map, after: 'Claude stops with a shallow map and four files to inspect.'}, {label: 'Copy the setup prompt', prompt: PROMPTS.a1Setup, after: 'The main suite passes and only A3, A4, A5, and A8 remain red.'}],
    after: 'You can point to the fixture, runtime, trace, console, and expected red exercises.',
    checks: ['Show the shallow call tree.', 'Show the console health.', 'Read the expected red assignment names.'],
    choice: 'Choose which expected red assignment you want to inspect first.', humanOpen: 'Do not change hooks, push, or solve a later assignment.', next: 'A2 · Define the operator outcome'
  }),
  baseSlide({
    title: 'A2 · Define the operator outcome', kicker: 'W5 · A2 · CONCEPT', subtitle: 'The agent needs an observable outcome before it needs more code.', stage: 'plan', beat: 'concept',
    cards: [{title: 'Operator', body: 'Who uses the first responder?'}, {title: 'Checks', body: 'What can a stranger repeat?'}, {title: 'Boundary', body: 'What stays read-only and human-owned?'}],
    keyPoints: ['Repeat Day 1 intent.md.', 'Use one interview round.', 'Design before edit.'],
    notes: note({time: '10:37 · 2 min', why: 'A vague outcome makes every later green check weak.', predict: 'Ask whether "the agent is reliable" is repeatable.', see: 'One operator, three checks, and one boundary.', inside: 'The control-loop skill maps answers to intent fields.', participant: 'Rewrite one wish as an observable check.', watch: 'Stop the skill before it edits or builds.', stuck: 'Ask who observes what result.', stop: 'The room can reject a wish.', next: 'Watch A2'})
  }),
  demoSlide({number: 2, title: 'Watch A2 · Interview, map, review', subtitle: 'Claude asks at most three questions, then stops with a field map.', clip: 'assets/day5-teach/a2.mp4', predict: 'Which answer belongs to a human decision?', pause: 'Pause before the proposed intent edit.', points: ['One interview round keeps the choice with the learner.', 'The field map connects answers to intent.md.', 'The learner reviews the exact diff before any build.'], stage: 'plan', next: 'Assignment 2'}),
  assignmentSlide({
    number: 2, title: 'write a reviewed intent', subtitle: 'Choose the operator, three checks, and the read-only boundary.', stage: 'plan', duration: '14 min',
    prompts: [{label: 'Copy the design skill prompt', prompt: PROMPTS.a2Design, after: 'Claude stops after one round with a field map.'}, {label: 'Copy the intent prompt', prompt: PROMPTS.a2Write, after: 'Claude shows the exact intent.md diff for review.'}],
    after: 'intent.md has one operator outcome, three repeatable checks, and named human decisions.',
    checks: ['Read the operator outcome.', 'Challenge one weak check.', 'Show the reviewed intent.md diff.'],
    choice: 'Choose the operator and the three observable checks.', humanOpen: 'The learner approves the intent edit. Claude does not choose the outcome.', next: 'Break'
  }),
  pauseSlide('Break', '15 min', 'A3 · Make the contract fail before it passes'),
  baseSlide({
    title: 'A3 · Make the contract fail before it passes', kicker: 'W5 · A3 · CONCEPT', subtitle: 'A red test proves that the new customer-impact rule can catch a defect.', stage: 'design', beat: 'concept',
    cards: [{title: 'Day 3 repeat', body: 'Structured output is a contract.'}, {title: 'Today', body: 'customer_impact must be present and useful.'}, {title: 'Proof', body: 'Accept contract, focused red, small patch, focused green.'}],
    keyPoints: ['Read the accepted intent.', 'Agree on the contract.', 'Run the focused test first.'],
    notes: note({time: '11:10 · 3 min', why: 'The contract turns customer impact into a result that tests can reject.', predict: 'Ask what must fail before the patch.', see: 'The A3 test rejects a verdict without customer impact.', inside: 'The accepted change reaches the schema, types, runtime branches, prompt schema, and consuming fixtures.', participant: 'Choose one invalid verdict.', watch: 'Do not weaken the assertion to make it green.', stuck: 'Run only the focused A3 test first.', stop: 'The failure mechanism is clear.', next: 'Watch A3'})
  }),
  demoSlide({number: 3, title: 'Watch A3 · Review saved technical evidence', subtitle: 'The clip shows older assignment text and saved green A3 output, not a complete Claude run.', clip: 'assets/day5-teach/a3.mp4', predict: 'Which contract evidence must the current run add?', pause: 'Pause on the saved green output and name what it cannot prove.', points: ['The clip illustrates saved A3 technical evidence.', 'It does not prove contract acceptance or the original red assertion.', 'Your run must show acceptance, focused red, cross-file diff, focused green, and verification.'], stage: 'design', next: 'Assignment 3'}),
  assignmentSlide({
    number: 3, title: 'accept and build the verdict contract · 1/2', subtitle: 'Make the accepted customer-impact contract red, then green.', stage: 'design', duration: '27 min',
    prompts: [{label: 'Copy the contract prompt', prompt: PROMPTS.a3Contract, after: 'Claude stops with a proposed contract and no edit.'}, {label: 'After you accept, copy the build prompt', prompt: PROMPTS.a3Build, after: 'Claude shows focused red, the cross-file patch, focused green, and the offline result.'}],
    after: 'The accepted contract requires customer impact and the focused test passes.',
    checks: ['Show the accepted contract.', 'Show the original red assertion.', 'Inspect the cross-file diff without weakened tests.'],
    choice: 'Choose one invalid verdict that the contract must reject.', humanOpen: 'The learner accepts the contract. Claude cannot weaken tests or invent support.', next: 'Assignment 3 · verify'
  }),
  assignmentSlide({
    number: 3, title: 'verify the verdict contract · 2/2', subtitle: 'Use a read-only skill to challenge one falsifiable claim.', stage: 'design', duration: '8 min',
    prompts: [{label: 'Copy the verification skill prompt', prompt: PROMPTS.a3Verify, after: 'Claude reports VERIFIED, NOT VERIFIED, or INCONCLUSIVE with evidence references.'}],
    after: 'The verification verdict cites the focused test, main tests, typecheck, and offline output.',
    checks: ['Read the verdict.', 'Follow one file reference.', 'Follow one output reference.'],
    choice: 'Accept only the evidence-backed verdict.', humanOpen: 'The skill stays read-only and does not convert missing evidence into support.', next: 'Lunch'
  }),
  pauseSlide('Lunch', '60 min', 'A4 · Make unsafe chat requests fail')
);

assignmentSlides.push(
  baseSlide({
    title: 'A4 · Make unsafe chat requests fail', kicker: 'W5 · A4 · CONCEPT', subtitle: 'Use separate controls because chat text alone is not a safety boundary.', stage: 'controls', beat: 'concept',
    cards: [{title: 'Chat', body: 'Refuse operational mutation requests.'}, {title: 'Permissions', body: 'Allow reads. Ask or deny writes.'}, {title: 'Human-owned hook', body: 'Deny Edit and Write to bench/ratchet.json.'}],
    keyPoints: ['Repeat Day 1 permissions and hooks; Day 2 reused them.', 'The builder cannot edit its own guard.', 'The hook does not claim full shell protection.'],
    notes: note({time: '13:00 · 3 min', why: 'The learner needs to see the difference between guidance and one enforced file boundary.', predict: 'Ask which layer still stops an unsafe file edit.', see: 'Chat refusal, permission policy, and the hook have separate proofs.', inside: 'The human-owned hook denies Edit and Write to bench/ratchet.json.', participant: 'Write one extra mutation phrase.', watch: 'Do not claim that the hook blocks every shell command.', stuck: 'Test the chat refusal first.', stop: 'The room can state the exact hook boundary.', next: 'Watch A4'})
  }),
  demoSlide({number: 4, title: 'Watch A4 · Chat proof, hook still open', subtitle: 'The saved clip is illustrative chat evidence. The human hook edit remains OPEN.', clip: 'assets/day5-teach/a4.mp4', predict: 'Which proof must the current run add after the clip?', pause: 'Pause on the saved chat test and the OPEN hook rule.', points: ['The clip illustrates the chat-refusal check.', 'It leaves the human-owned hook rule OPEN.', 'Your run must add the human edit and focused guard result.'], stage: 'controls', next: 'Assignment 4'}),
  assignmentSlide({
    number: 4, title: 'wire and prove the controls', subtitle: 'Build the chat refusal, then review one human-owned hook edit.', stage: 'controls', duration: '25 min',
    prompts: [{label: 'Copy the chat build prompt', prompt: PROMPTS.a4Chat, after: 'The chat test passes and Claude stops before the hook step.'}, {label: 'After the human edit, copy the review prompt', prompt: PROMPTS.a4Review, after: 'Claude runs the focused guard test without editing the guard.'}],
    manualSteps: ['Human step: in .claude/hooks/guard.mjs, replace the four-line TODO(A4) comment block immediately before else if (SDLC_ARTEFACT.test(rel)) with: else if (rel === "bench/ratchet.json") decide("deny", "guard: ratchet is human-owned"); Keep this step OPEN until a person performs it.'],
    after: 'Chat refuses the extra mutation phrase and the human-owned hook denies the protected file edits.',
    checks: ['Show the chosen mutation phrase and green chat test.', 'Name the person who made the hook edit.', 'Show the focused guard result and audit entry.'],
    choice: 'Choose one extra operational mutation phrase.', humanOpen: 'Only a human edits the guard. The test proves a file-edit boundary, not full shell protection.', next: 'A5 · Give the agent one read-only tool'
  }),
  baseSlide({
    title: 'A5 · Give the agent one read-only tool', kicker: 'W5 · A5 · CONCEPT', subtitle: 'A tool supplies evidence. It does not supply authority.', stage: 'controls', beat: 'concept',
    cards: [{title: 'Day 3 repeat', body: 'Use a tool when the answer depends on data outside the prompt.'}, {title: 'Today', body: 'list_deploys returns evidence and records exact arguments.'}, {title: 'Boundary', body: 'No rollback or mutation tool exists.'}],
    keyPoints: ['Bind one tool.', 'Keep it read-only.', 'Inspect the trace arguments.'],
    notes: note({time: '13:30 · 3 min', why: 'The diagnosis needs deployment facts that model text cannot prove.', predict: 'Ask which deploy fact the agent must read.', see: 'One read-only tool appears in the trace.', inside: 'The trace preserves the real request arguments.', participant: 'Choose the empty-window or missing-deploy edge case.', watch: 'Do not add a write tool.', stuck: 'Run the focused A5 test.', stop: 'The tool boundary is clear.', next: 'Watch A5'})
  }),
  demoSlide({number: 5, title: 'Watch A5 · Review saved tool checks', subtitle: 'The clip shows older assignment text and saved handler, registration, and empty-window checks.', clip: 'assets/day5-teach/a5.mp4', predict: 'Which runtime proof must the current run add?', pause: 'Pause on the saved green checks and name the missing trace proof.', points: ['The clip illustrates saved tool checks.', 'It does not prove the current runtime trace arguments.', 'Your run must show the handler result, registration, and exact trace input.'], stage: 'controls', next: 'Assignment 5'}),
  assignmentSlide({
    number: 5, title: 'build a read-only deploy tool', subtitle: 'Bind list_deploys and prove its result and trace.', stage: 'controls', duration: '20 min',
    prompts: [{label: 'Copy the build prompt', prompt: PROMPTS.a5Build, after: 'The focused test passes and the offline trace shows the exact arguments.'}],
    after: 'list_deploys is registered, read-only, tested, and visible in the trace.',
    checks: ['Show the chosen edge case.', 'Show the tool result.', 'Show the exact trace arguments.'],
    choice: 'Choose an empty time window or a missing deploy.', humanOpen: 'The tool reads evidence only. Operational action stays outside the agent.', next: 'A6 · Create the live counterpart'
  }),
  baseSlide({
    title: 'A6 · Create the live counterpart', kicker: 'W5 · A6 · CONCEPT', subtitle: 'INC-1001 is the fixture reference. The listener creates a new live incident id.', stage: 'diagnose', beat: 'concept',
    cards: [{title: 'Incident', body: 'A detected service problem with an id, state, and evidence.'}, {title: 'Deploy', body: 'A recorded software release such as d-4821.'}, {title: 'Trace', body: 'The ordered tool calls and arguments behind a claim.'}, {title: 'source:ref', body: 'A stable label such as deploys:d-4821 or logs:<timestamp>.'}],
    keyPoints: ['Plan before the live run.', 'Separate diagnosis snapshot from current state.', 'Challenge one alternative cause.'],
    notes: note({time: '13:55 · 4 min', why: 'No SRE knowledge is assumed. These four terms are enough for the exercise.', predict: 'Ask why a current health value cannot prove an earlier cause.', see: 'Every diagnosis claim points to a stable reference.', inside: 'The alternative cause names what would change the conclusion.', participant: 'Choose one alternative cause.', watch: 'Do not present scripted fixture output as live model evidence.', stuck: 'Inspect the offline diagnosis and mark live claims OPEN.', stop: 'The room can define incident, deploy, trace, and source:ref.', next: 'Watch A6'})
  }),
  demoSlide({number: 6, title: 'Watch A6 · Review an illustrative route', subtitle: 'This older clip is illustrative. Your current terminal output and incident chat provide the proof.', clip: 'assets/day5-teach/a6.mp4', predict: 'Which proof must the current run produce?', pause: 'Pause and name the evidence that still needs current output.', points: ['Treat the clip as an illustration, not validation.', 'Do not infer current ids, evidence, or human actions from it.', 'Your run must prove stable refs, snapshot wording, the alternative answer, and mutation refusal.'], stage: 'diagnose', next: 'Assignment 6'}),
  assignmentSlide({
    number: 6, title: 'start and trace the live counterpart · 1/2', subtitle: 'Map both intake paths, then start the live scenario in four terminals.', stage: 'diagnose', duration: '22 min',
    prompts: [{label: 'Copy the incident-map skill prompt', prompt: PROMPTS.a6Map, after: 'Claude separates fixture INC-1001 from the generated live incident.'}, {label: 'Copy the plan and diagnosis prompt', prompt: PROMPTS.a6Build, after: 'Claude gives commands for the human terminals, then stops with a cited diagnosis and OPEN gaps.'}],
    manualSteps: ['Human step: start the console with AGENT_LISTEN_WINDOW_MIN=1. Use separate terminals for the console, shop, continuous traffic, and one-shot chaos. Keep healthy traffic running for two minutes before the one-shot bad deploy so the trace has a before state. Record the generated live incident id.'],
    after: 'The generated live incident id is visible and its diagnosis claims map to stable references.',
    checks: ['Show the generated incident id.', 'Follow one claim to its source:ref.', 'Find the snapshot and current-state wording.'],
    choice: 'Choose one alternative cause that the evidence must falsify.', humanOpen: 'A human starts chaos. Claude may not fabricate that action.', next: 'Assignment 6 · challenge the chat'
  }),
  assignmentSlide({
    number: 6, title: 'challenge the live incident chat · 2/2', subtitle: 'Ask for evidence, expose the comparison gap, then request a forbidden mutation.', stage: 'diagnose', duration: '12 min',
    prompts: [{label: 'Copy the evidence question', prompt: PROMPTS.a6Evidence, after: 'The answer must separate snapshot evidence from current telemetry.'}, {label: 'Copy the exact alternative question', prompt: PROMPTS.a6Alternative, after: 'The scripted chat may only summarize evidence. Mark a missing cause comparison OPEN.'}, {label: 'Copy the mutation request', prompt: PROMPTS.a6Mutation, after: 'The chat refuses and records no decision.'}],
    after: 'The generated incident has cited evidence, an honest comparison gap, and a visible mutation refusal.',
    checks: ['Show the stable references.', 'Compare the alternative yourself with the diagnosis ruled_out evidence.', 'Show the refusal and pending human decision.'],
    choice: 'Mark the alternative supported, rejected, or OPEN from the available evidence.', humanOpen: 'Chat may not approve, execute, resolve, or fabricate a human decision.', next: 'Break'
  }),
  pauseSlide('Break', '15 min', 'A7 · Turn the incident into offline coverage')
);

assignmentSlides.push(
  baseSlide({
    title: 'A7 · Turn the incident into offline coverage', kicker: 'W5 · A7 · CONCEPT', subtitle: 'A reviewed incident variation becomes a deterministic fixture case.', stage: 'test', beat: 'concept',
    cards: [{title: 'Contract', body: 'The expected policy result for one fixture.'}, {title: 'Bench', body: 'A repeatable offline score over deterministic cases.'}, {title: 'Limit', body: 'The bench does not prove live model prompt-injection resistance.'}],
    keyPoints: ['Record the before result.', 'Add one deterministic case.', 'Never lower the score floor to pass.'],
    notes: note({time: '14:50 · 3 min', why: 'The team needs a replayable policy check for the incident variation.', predict: 'Ask what this offline bench cannot prove.', see: 'Before and after results use the same score floor.', inside: 'The fixture and expected policy result are explicit.', participant: 'Choose one incident variation.', watch: 'Do not call this a live model eval.', stuck: 'Run one focused case before the full offline bench.', stop: 'The room can state the bench limit.', next: 'Watch A7'})
  }),
  demoSlide({number: 7, title: 'Watch A7 · Review saved bench evidence', subtitle: 'The clip shows an older adversarial-case prompt and one saved bench result.', clip: 'assets/day5-teach/a7.mp4', predict: 'Which comparison must the current run add?', pause: 'Pause on the saved result and name the missing baseline and treatment proof.', points: ['The clip illustrates one saved bench result.', 'It does not prove the current baseline, treatment, or neighboring rerun.', 'Your run must preserve both ratchet values, harmful 0, and the extra case count.'], stage: 'test', next: 'Assignment 7'}),
  assignmentSlide({
    number: 7, title: 'add and verify an offline fixture case', subtitle: 'Increase deterministic policy coverage without moving the expected result.', stage: 'test', duration: '15 min',
    prompts: [{label: 'Copy the build prompt', prompt: PROMPTS.a7Build, after: 'Claude shows the before and after offline results.'}, {label: 'Copy the verification skill prompt', prompt: PROMPTS.a7Verify, after: 'Claude reports VERIFIED, NOT VERIFIED, or INCONCLUSIVE with evidence references.'}],
    after: 'The fixture case passes, harmful remains 0, and the score floor does not decrease.',
    checks: ['Compare the offline before and after results.', 'Show the new fixture and expected policy result.', 'Show the /verify-this verdict and a neighboring rerun.'],
    choice: 'Choose one deterministic incident variation.', humanOpen: 'The learner accepts the case. A real model eval is optional and outside the core route.', next: 'A8 · Bind the exact decision to a named human'
  }),
  baseSlide({
    title: 'A8 · Bind the exact decision to a named human', kicker: 'W5 · A8 · CONCEPT', subtitle: 'A deterministic fixture proves the gate contract. The live decision stays OPEN.', stage: 'gate', beat: 'concept',
    cards: [{title: 'Incident', body: 'The approval names INC-1001.'}, {title: 'Action', body: 'The approval names the proposed rollback.'}, {title: 'Person', body: 'A named human records the decision.'}],
    keyPoints: ['Wrong incident stays blocked.', 'Wrong action stays blocked.', 'The agent never creates the approval.'],
    notes: note({time: '15:10 · 3 min', why: 'A generic approval can authorize the wrong action.', predict: 'Ask which mismatch should keep Execute disabled.', see: 'The gate checks incident, action, and human identity.', inside: 'Negative tests prove that near matches stay blocked.', participant: 'Choose the wrong-incident or wrong-action case.', watch: 'No agent clicks Approve, Execute, or Resolve.', stuck: 'Run the focused A8 negative test.', stop: 'The room can define the gate.', next: 'Watch A8'})
  }),
  demoSlide({number: 8, title: 'Watch A8 · Mismatch stays blocked', subtitle: 'Tests prove the gate. The console action stays HUMAN OPEN.', clip: 'assets/day5-teach/a8.mp4', predict: 'What happens when the incident matches but the action does not?', pause: 'Pause on the rejected mismatch and the pending human decision.', points: ['The wrong incident or action is rejected.', 'The matching decision still needs a named human.', 'The clip does not show an agent taking the human action.'], stage: 'gate', next: 'Assignment 8'}),
  assignmentSlide({
    number: 8, title: 'build the approval gate', subtitle: 'Require the exact incident, action, and named human decision.', stage: 'gate', duration: '15 min',
    prompts: [{label: 'Copy the build prompt', prompt: PROMPTS.a8Build, after: 'Claude shows the negative case, green focused test, and HUMAN OPEN console action.'}],
    after: 'The tested gate rejects the chosen mismatch and the real human action remains OPEN.',
    checks: ['Show the chosen mismatch.', 'Show the focused green test.', 'Show that no approval or execution record was created.'],
    choice: 'Choose wrong incident or wrong action.', humanOpen: 'Only the named human may approve, execute, or resolve in the local sample console.', next: 'A9 · Leave the next person an honest start'
  }),
  baseSlide({
    title: 'A9 · Leave the next person an honest start', kicker: 'W5 · A9 · CONCEPT', subtitle: 'Memory, logs, progress, and handoff have different jobs.', stage: 'maintain', beat: 'concept',
    cards: [{title: 'Curated knowledge', body: 'lessons/lessons.md contains human-reviewed operational lessons. This is like Day 4 curated memory.md, not session context.'}, {title: 'Action log', body: 'approvals/audit.jsonl records decisions and attempted actions.'}, {title: 'Progress signals', body: 'PROGRESS.md records local signals. It does not prove validation.'}, {title: 'Handoff', body: 'HANDOFF.md carries verified work, OPEN items, and one next step.'}],
    keyPoints: ['A human promotes the lesson.', 'An audit log is not memory.', 'A progress signal is not validation.', 'The handoff does not invent closure.'],
    notes: note({time: '15:30 · 4 min', why: 'Day 4 separated curated memory from logs. Day 5 applies the same distinction to incident operations.', predict: 'Ask which file the agent may propose but not promote.', see: 'Four files have four different ownership rules.', inside: 'The handoff skill prints a portable prompt. It does not write HANDOFF.md itself.', participant: 'Choose one lesson claim and one hackathon problem.', watch: 'Do not edit lessons/lessons.md or claim that /handoff saves a file.', stuck: 'Write the HUMAN OPEN list before the summary.', stop: 'The room can distinguish knowledge, audit, progress, and handoff.', next: 'Watch A9'})
  }),
  demoSlide({number: 9, title: 'Watch A9 · Review an illustrative handoff', subtitle: 'This older clip is illustrative. Your current review and saved text provide the proof.', clip: 'assets/day5-teach/a9.mp4', predict: 'Which current handoff steps need visible proof?', pause: 'Pause and name the review-before-save contract.', points: ['Treat the clip as an illustration, not validation.', 'Do not infer a review, save, resolution, or lesson promotion from it.', 'Your run must review the printed handoff before a separate approved save.'], stage: 'maintain', next: 'Assignment 9'}),
  assignmentSlide({
    number: 9, title: 'turn the lesson into a hackathon handoff', subtitle: 'Propose one lesson, define one hackathon problem, and save an approved handoff.', stage: 'maintain', duration: '19 min',
    prompts: [{label: 'Copy the maintain prompt', prompt: PROMPTS.a9Maintain, after: 'Claude shows the proposed lesson and hackathon intent for review.'}, {label: 'Copy the handoff skill prompt', prompt: PROMPTS.a9Handoff, after: 'The skill prints the full handoff and stops before a file edit.'}, {label: 'After review, copy the save prompt', prompt: PROMPTS.a9Save, after: 'Claude asks before saving the exact approved text to HANDOFF.md.'}],
    after: 'A teammate can start from the intent, evidence, HUMAN OPEN items, and one next step.',
    checks: ['Inspect the lesson evidence references.', 'Read the three hackathon checks.', 'Ask a partner to name the next step from HANDOFF.md only.'],
    choice: 'Choose one reusable lesson claim and one hackathon problem.', humanOpen: 'A human resolves the incident, promotes the lesson, approves the handoff text, and accepts the hackathon direction.', next: 'You now have a hackathon start point'
  })
);

closingSlides.push(
  baseSlide({
    title: 'You now have a hackathon start point', kicker: 'W5 · HANDOFF', subtitle: 'Keep the same working method. Change the customer problem.', type: 'context',
    cards: [{title: 'Problem', body: 'One concrete customer or operator pain.'}, {title: 'Checks', body: 'Three results another person can repeat.'}, {title: 'Boundary', body: 'What the agent may inspect and what a human decides.'}, {title: 'First step', body: 'One small build with a visible proof.'}],
    keyPoints: ['Start from docs/hackathon-intent.md.', 'Use HANDOFF.md to resume.', 'Keep human decisions OPEN until they happen.'],
    notes: note({time: '15:55 · 2 min', why: 'The hackathon should begin from evidence, not a blank chat.', predict: 'Ask which workshop artifact becomes the first hackathon input.', see: 'The same method applies to a new problem.', inside: 'The intent and handoff reduce restart work.', participant: 'Share the problem and first check with a partner.', watch: 'Do not make the SRE sample the required hackathon topic.', stuck: 'Reuse the operator, checks, boundary, and OPEN structure.', stop: 'Each learner has one problem and one first step.', next: 'The method you take with you'})
  }),
  baseSlide({
    title: 'The method you take with you', kicker: 'W5 · CLOSE', subtitle: 'Learn the repo. Choose the outcome. Build one step. Prove it. Stop for the person.', type: 'context', layout: 'steps',
    items: [{label: 'Learn', caption: '/show-me'}, {label: 'Choose', caption: '/design-control-loop'}, {label: 'Build', caption: 'one focused change'}, {label: 'Prove', caption: '/verify-this'}, {label: 'Hand off', caption: '/handoff, review, then save'}],
    keyPoints: ['Claude Code explores and builds.', 'You choose and review.', 'Evidence supports the next decision.'],
    notes: note({time: '15:57 · 2 min', why: 'The close must leave one repeatable method.', predict: 'Ask which step they will use first in the hackathon.', see: 'Five verbs describe the full day.', inside: 'The project skills support four of the five verbs.', participant: 'Name one step and its evidence.', watch: 'Do not add a new concept in the close.', stuck: 'Return to the failure story and trace the five verbs.', stop: 'Collect two takeaways.', next: 'End at 16:00'})
  }),
  baseSlide({
    title: 'End at 16:00', kicker: 'W5 · DONE', subtitle: 'Keep your intent, evidence, OPEN list, and handoff.', type: 'context',
    cards: [{title: 'Keep', body: 'intent.md · evidence refs · bench result · HANDOFF.md'}, {title: 'Do not claim', body: 'A human approval, execution, resolution, or promoted lesson that did not happen.'}],
    keyPoints: ['Thank the room.', 'Name the hackathon start.', 'Keep the human boundary explicit.'],
    notes: 'Time: 15:59 · 1 min.\n\nThank the room. Ask one person to read the first line of the handoff. End at 16:00.'
  })
);

appendixSlides.push(
  baseSlide({title: 'Appendix · Why this is an AI-native SDLC loop', kicker: 'W5 · APPENDIX', subtitle: 'Each accepted artifact becomes the next step\'s input.', cards: [{title: 'Plan', body: 'intent.md'}, {title: 'Design', body: 'docs/spec.md'}, {title: 'Build', body: 'small TODO implementation'}, {title: 'Test', body: 'focused tests and offline bench'}, {title: 'Deploy gate', body: 'named human decision'}, {title: 'Maintain', body: 'lesson proposal and handoff'}], keyPoints: ['The loop is non-linear.', 'Evidence crosses each handoff.', 'Humans own decisions.'], notes: 'Appendix. Use only if the room asks for the AI-native SDLC model. Source: https://claude.com/resources/articles/the-ai-native-sdlc-playbook'}),
  baseSlide({title: 'Appendix · Guidance and enforcement are different', kicker: 'W5 · APPENDIX', subtitle: 'CLAUDE.md guides. Tests, permissions, and hooks enforce defined boundaries.', cards: [{title: 'Guide', body: 'CLAUDE.md · intent.md · skills'}, {title: 'Enforce', body: 'tests · allow/ask/deny · the human-owned hook'}, {title: 'Record', body: 'trace · audit · HUMAN OPEN list'}], keyPoints: ['A written rule can be ignored.', 'A hook can block a defined file edit.', 'A human reviews both.'], notes: 'Appendix. Use after A4 when a participant asks why the chat refusal is not enough.'}),
  baseSlide({title: 'Appendix · Optional /sdlc course mod', kicker: 'W5 · APPENDIX · OPTIONAL', subtitle: 'The mod shows the same nine assignments inside Claude Code.', cards: [{title: 'It does', body: 'Open an assignment and fill its SOLO.md prompt.'}, {title: 'It does not', body: 'Submit the prompt or complete the human decision.'}], keyPoints: ['Optional route only.', 'SOLO.md remains the prompt source.', 'No plugin is required for the core lesson.'], notes: note({time: 'Optional · 2 min', why: 'Some facilitators want a code-mod view of the course.', predict: 'Ask whether the mod submits the prompt.', play: 'assets/day5-teach/mod.mp4. The clip is illustrative and shows only the prompt-fill behavior.', pause: 'Pause before submission.', see: 'The mod opens the assignment and fills the first prompt.', inside: 'The participant still reviews and submits.', participant: 'Use the slide Copy button unless the facilitator chooses the mod.', watch: 'The mod exposes the first fenced prompt for each A1–A9 assignment.', stuck: 'Skip the mod.', stop: 'The evidence boundary is clear.', next: 'Return to the current assignment.'}), teach: {time: '2 min', gist: 'Optional mod view', script: [{clip: 'assets/day5-teach/mod.mp4', say: 'Illustrative prompt-fill behavior only.'}], do: ['Pause before submission.'], done: ['The mod fills but does not submit.'], watch: ['Optional only.'], next: 'Return to the current assignment.'}}),
  baseSlide({title: 'Appendix · Recovery without a solved branch', kicker: 'W5 · APPENDIX · FACILITATOR', subtitle: 'Recover the current step. Do not replace participant work with solved code.', cards: [{title: 'After 2 minutes', body: 'Ask Claude to state the blocker and next focused check.'}, {title: 'After one failed attempt', body: 'Pair with a neighbor and compare the current artifact.'}, {title: 'After two failed attempts', body: 'Use facilitator evidence and apply only the reviewed change.'}], keyPoints: ['No branch checkout between assignments.', 'No full suite after every prompt.', 'Preserve the participant diff.'], notes: 'Appendix. Use this card for catch-up. Never ask a participant to discard local work.'}),
  baseSlide({title: 'Appendix · Optional real-model eval', kicker: 'W5 · APPENDIX · OPTIONAL', subtitle: 'Run this only when the facilitator has approved model access, cost, and data.', cards: [{title: 'Core proof', body: 'The offline scripted bench checks deterministic policy fixtures.'}, {title: 'Optional proof', body: 'A separately approved model eval can test live model behavior.'}], keyPoints: ['Keep fixture and model evidence separate.', 'Do not require an API key for the core lesson.', 'Record model, cost, and exact input when you run it.'], notes: 'Appendix. Do not run this to fill waiting time. The core route stays offline and repeatable.'}),
  baseSlide({title: 'Bonus · Daily Brief agent', kicker: 'W5 · BONUS', subtitle: 'Use the Daily Brief lab only after the SRE lesson is complete.', repo: {url: 'https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1', label: 'AetherLink-bv/aetherlink-daily-brief-lab-s1'}, cards: [{title: 'Core route', body: 'Steps 1–4 · 30 to 40 minutes'}, {title: 'Homework', body: 'Steps 5–7'}, {title: 'Gate', body: 'Open a pull request only after human review.'}], keyPoints: ['SRE is the main AI-SDLC lesson.', 'Daily Brief is the bonus.', 'Keep the same evidence and human-gate pattern.'], notes: 'Bonus only. Do not shorten A1–A9 to fit this lab.'})
);

window.DAY5_PROMPTS = PROMPTS;
window.SLIDES = [...openingSlides, ...assignmentSlides, ...closingSlides, ...appendixSlides];
window.SLIDES.forEach((slide, index) => {
  slide.teach.next = window.SLIDES[index + 1]?.title || 'End';
});
