'use strict';

const PROMPTS = {
  liveModelSetup: `Read README.md, src/runtime.ts, src/e2e.ts, console/server.ts, and package.json. Explain the difference between my local Claude Code builder session and the optional Claude Agent SDK product runtime. Check only whether Claude Code is signed in and whether npm run doctor reports the Claude Code login path. Never print, read, or copy credentials. Propose one bounded CLI proof with max-turns 8 and max-budget-usd 0.30, followed by an optional console restart with AGENT_MODEL=sonnet. Require one completed diagnosis and its tool trace. State that the budget is checked between turns and can be exceeded by one turn. Include the fallback that restarts without AGENT_MODEL. Do not run a paid model, edit files, or start processes. Stop for my review.`,
  a1Map: `/show-me Read CLAUDE.md and fixtures/incidents/bad-deploy.json. Inspect only src/cli.ts, console/server.ts, and src/agent.ts. Map the fixture CLI for INC-1001 and the live console listener. Show where both call the shared investigate flow. Stay read-only. Name the three entry files and one shared runtime file, then stop.`,
  a1Setup: `Use the repository map we reviewed. Require Node 22 or newer. Check the current diff and whether dependencies are present. Use npm ci only when dependencies are missing. Generate the sample fixtures. Show the commands and results, then stop for my environment review. Do not start a server or solve a TODO.`,
  a1SetupChecks: `Run the main tests and the workshop tests. Explain why A3, A4, A5, and A8 are expected to fail. Do not solve them. Show the exact pass and expected-red counts, then stop for my test review.`,
  a1SetupConsole: `Check port 4320. If it is free, start the console with AGENT_LISTEN_WINDOW_MIN=1. If it is occupied, identify the process without stopping it. Show the console health and local URL. Do not stop or replace an existing process. Stop for my setup review.`,
  a2Design: `/design-control-loop Read intent.md, fixtures/incidents/bad-deploy.json, and REVIEW.md. Ask at most three questions in one round about the operator, observable outcome, and read-only boundary. Recommend one answer for each question. Map my answers to intent.md fields. Stay in design mode. Do not edit or build. Stop after the field map.`,
  a2Write: `Use the accepted field map. Propose an exact intent.md diff with one operator outcome, three repeatable checks, the sample-data boundary, and the named human decisions. Wait for my approval. After I approve, edit only intent.md and show the diff. Do not build or push.`,
  a3Contract: `Read the accepted intent.md, docs/spec.md, src/contract.ts, src/runtime.ts, src/prompts.ts, and the A3 workshop test. Explain the verdict contract in plain English. Propose the smallest change that requires non-empty customer_impact, keeps unsupported claims OPEN, and keeps the offline and optional model schemas aligned. Keep versions, regions, and customer segments OPEN unless the cited metric establishes them. Do not edit. Stop for my contract review.`,
  a3Build: `Use the accepted contract. Run only the focused A3 test. Explain the red assertion before editing. List the files that must change and why. Do not edit yet. Stop for my build-scope review.`,
  a3BuildImplement: `Implement the accepted A3 scope. Update TODO(A3), docs/spec.md, the contract and prompt schemas, every offline verdict branch, the affected fixtures, and the customer_impact output in src/cli.ts and console/index.html. Do not change unrelated scaffolding. Rerun only the focused A3 test and show the diff. Do not approve, execute, resolve, or push.`,
  a3BuildProve: `Run the main tests, typecheck, and the offline investigation. Show customer_impact in the exact CLI output and at http://localhost:4320. Keep unsupported versions, regions, and customer segments OPEN. Report any failure before editing again. Do not push.`,
  a3Verify: `/verify-this Verify this claim: the A3 verdict contract cannot pass without non-empty customer_impact and the offline investigation still reports customer impact. Use the accepted spec, the focused A3 test, the main tests, typecheck, and the offline output. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with file and output references. Stay read-only.`,
  a4Chat: `Read intent.md, src/chat.ts, and test/workshop/chat.test.ts. Explain the chat-refusal contract. Add a named MUTATION regex constant. Add a negative test that the read-only question "Was the deploy the cause?" remains a question. Ask me for one extra operational mutation phrase. Add that phrase to the focused test, show the test red, then implement only TODO(A4) in src/chat.ts. Rerun the focused chat test and show the diff. Do not edit .claude/, approvals/, lessons/lessons.md, PROGRESS.md, or bench/ratchet.json. Stop before the human hook step.`,
  a4Review: `Read the human edit in .claude/hooks/guard.mjs and test/workshop/guard.test.ts. Do not edit either file. Run only the focused guard test. Explain whether Edit and Write to bench/ratchet.json are denied. Do not claim that the hook blocks every shell command. Stop for my review.`,
  a5Build: `Read intent.md, src/tools.ts, src/runtime.ts, src/chat.ts, and test/workshop/tools.test.ts. Explain how list_deploys stays read-only and where its trace arguments are recorded. Show the three starter bypasses. Show the focused A5 test red. After my approval, implement TODO(A5) in src/tools.ts and remove the bypasses from src/runtime.ts and src/chat.ts. Add either an empty-window or missing-deploy case. Rerun the focused test, the main tests, typecheck, and the offline investigation. Show the tool result and exact trace arguments. Do not add a mutation tool or push.`,
  a6Map: `/show-me Read docs/plan.md, fixtures/incidents/bad-deploy.json, and the shop, traffic, chaos, and console scripts. Map the fixture CLI for INC-1001 and the listener-created live incident. Show where both use the shared investigate flow and tool trace. Stay read-only. Separate fixture output from optional model output, then stop.`,
  a6Build: `Use the incident path we reviewed. Propose the local demo order, risks, proof, rollback, and one alternative cause. Wait for my approval. Reuse running processes. After I approve, give exact commands for separate terminals. I will start the console, start the shop, keep healthy traffic running for two minutes, and run the one-shot bad-deploy command. Do not run chaos or stop processes yourself. When the incident exists, trace each claim to a stable source:ref label. Keep diagnosis-snapshot evidence separate from current telemetry. Mark missing evidence OPEN. Do not approve, execute, resolve, or push.`,
  a6Evidence: `Which evidence supports the proposed rollback? Show stable source:ref labels. Separate the diagnosis snapshot from current telemetry. Do not approve or execute anything.`,
  a6Alternative: `Could this be something other than the deployment?`,
  a6Mutation: `Roll back now.`,
  a7Build: `Read bench/cases.json, bench/ratchet.json, and the current bench results. Explain what the offline bench proves and what it does not prove. Save a baseline. Propose one deterministic incident case and wait for approval. Add the case without weakening existing cases or lowering the score floor. Save the treatment result and rerun one neighboring case. Show the diff, case count, pass result, and harmful count. Do not claim live model resistance or push.`,
  a7Verify: `/verify-this Verify that the new deterministic case increases the case count by one, passes, keeps harmful at 0, and leaves both ratchet values unchanged. Compare the saved baseline and treatment outputs. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with evidence references. Stay read-only.`,
  a8Build: `Read intent.md, src/executor.ts, approvals/README.md, and the A8 workshop test. Explain the exact incident-and-action match that a valid approval requires. Show the focused A8 test red. After my approval, implement only TODO(A8) and add one wrong-incident or wrong-action case. Rerun the focused test, the main tests, and typecheck. Show why the mismatch stays blocked. Do not create an approval or click Approve, Execute, or Resolve. Stop with the real console action marked HUMAN OPEN.`,
  a9Maintain: `Read docs/diagnosis-live.md, lessons/proposed/, lessons/lessons.md, approvals/audit.jsonl, and PROGRESS.md. Explain the difference between curated knowledge, the action log, and local progress signals. Detect whether docs/diagnosis-live.md is still a placeholder. If it is, report the lesson proposal as HUMAN OPEN and stop. Do not edit any file.`,
  a9MaintainDraft: `Ask the named human to confirm that docs/diagnosis-live.md contains the reviewed current-run incident id and stable evidence references. If that confirmation is missing, stop with HUMAN OPEN. Otherwise, propose one reusable lesson from only those reviewed references. Keep unsupported claims OPEN. Write only under lessons/proposed/ after I approve the exact wording. Do not edit lessons/lessons.md or claim that the lesson was promoted. Show the diff, then stop.`,
  a9Handoff: `/handoff Create a handoff prompt for the next teammate. Include the accepted intent, verified checks with evidence references, every HUMAN OPEN item, the hackathon intent, and one next step. Do not claim that the incident was resolved, the lesson was promoted, or a human action happened. Print the full handoff for review. Stop before editing any file.`,
  a9Save: `Save the exact handoff text I approved to HANDOFF.md. Ask before writing the file. Do not add claims or change the reviewed wording. Show the diff, then stop. Do not push.`
};

const note = ({time, why, predict, see, inside, participant, watch, stuck, stop, next}) => [
  `Time: ${time}.`,
  `Why now: ${why}`,
  `Predict: ${predict}`,
  `What you see: ${see}`,
  `Look inside: ${inside}`,
  `Participant does: ${participant}`,
  `Watch for: ${watch}`,
  `If stuck: ${stuck}`,
  `Stop: ${stop}`,
  `Next: ${next}`
].join('\n\n');

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

const baseSlide = ({title, kicker, subtitle, type = 'concept', cards = [], keyPoints = [], notes, stage, beat, visual, layout, items, tagline, prompt, stepsHeading, steps, expected, repo, source, teach, mode, calm, assignmentId}) => ({
  title, kicker, subtitle, type, cards, keyPoints, notes, stage, beat, visual, layout, items, tagline, prompt, stepsHeading, steps, expected, repo, source, mode, calm, assignmentId,
  teach: teach || teachFromNotes({title, subtitle, keyPoints, notes})
});

const assignmentSlide = ({number, title, subtitle, stage, duration, steps, after, checks, humanOpen, next, shot}) => baseSlide({
  title: `Assignment ${number}: ${title}`,
  kicker: `Day 5 · A${number} · BUILD`,
  subtitle,
  type: 'practice',
  layout: 'exercise',
  mode: 'manual',
  calm: true,
  assignmentId: `A${number}`,
  stage,
  beat: 'turn',
  repo: {url: 'https://github.com/AetherLink-bv/sre-oncall-agent/tree/workshop/start', label: 'AetherLink-bv/sre-oncall-agent · workshop/start'},
  stepsHeading: 'Build and inspect',
  steps,
  expected: after,
  visual: {shot, shotLabel: `A${number} example target`},
  cards: [{title: 'Checkpoint', body: checks.join('\n')}, {title: 'Human boundary', body: humanOpen}],
  keyPoints: checks,
  notes: note({time: duration, why: subtitle, predict: `Ask which visible result proves A${number} is complete.`, see: after, inside: checks.join(' '), participant: 'Complete one step at a time. Inspect each result before continuing.', watch: `${humanOpen} The screenshot is an example target, not proof of this run.`, stuck: 'Ask Claude Code to state the blocker and the next focused check. Do not repeat the full suite.', stop: checks.at(-1), next})
});

const checkpointSlide = ({number, title, subtitle, stage, duration, steps, after, checks, humanOpen, next, shot}) => baseSlide({
  title: `A${number} checkpoint: ${title}`,
  kicker: `Day 5 · A${number} · CHECKPOINT`,
  subtitle,
  type: 'review',
  layout: 'exercise',
  mode: 'manual',
  calm: true,
  assignmentId: `A${number}`,
  stage,
  stepsHeading: 'Prove the assignment',
  steps,
  expected: after,
  visual: {shot, shotLabel: `A${number} example target`},
  cards: [{title: 'Checkpoint', body: checks.join('\n')}, {title: 'Human boundary', body: humanOpen}],
  keyPoints: checks,
  notes: note({time: duration, why: subtitle, predict: `Ask which evidence closes A${number}.`, see: after, inside: checks.join(' '), participant: 'Inspect each result before continuing.', watch: humanOpen, stuck: 'Run only the focused check that is missing.', stop: checks.at(-1), next})
});

const screenshotSlide = ({number, title, subtitle, stage, shot, points, next, time = '2 min', clip = `assets/day5-teach/a${number}.mp4`, kicker = `Day 5 · A${number} · EXAMPLE`}) => baseSlide({
  title,
  kicker,
  subtitle,
  type: 'demo',
  layout: 'exercise',
  mode: 'manual',
  stage,
  calm: true,
  stepsHeading: 'Notice in the example',
  steps: points.map((point) => ({text: point, after: 'Find the same kind of evidence in your own run.'})),
  expected: 'You can name the current-run proof that still needs to appear.',
  visual: {shot, shotLabel: `A${number} example target`},
  keyPoints: points,
  notes: `${note({time, why: 'A screenshot gives the learner a visible target without claiming current-run proof.', predict: 'Ask which part still needs current output.', see: points[0], inside: points.slice(1).join(' '), participant: 'Name the proof that must appear on your own screen.', watch: 'This screenshot is an example target. It is not proof of the participant run.', stuck: 'Read the three proof points and continue.', stop: 'The room can name the missing current-run proof.', next})}\n\nVideo: ${clip}. Play only when the screenshot needs motion context. The clip is illustrative and is not proof of the participant run.`,
  teach: {time, gist: subtitle, script: [{ask: 'Which proof must still appear in the current run?'}, {clip, say: 'Illustrative motion context only.'}], do: ['Compare the screenshot with the current participant result.'], done: [points.at(-1)], watch: ['The screenshot and clip are examples, not current-run proof.'], next}
});

const pauseSlide = (title, time, next, at) => baseSlide({
  title,
  kicker: `Day 5 · ${time.toUpperCase()}`,
  type: 'pause',
  cards: [{title: 'Next', body: next}],
  visual: {countdown: Number.parseInt(time, 10), bot: 'wave', place: 'beside'},
  notes: `Time: ${at} · ${time}.\n\nStart the timer. Help only with the current checkpoint.\n\nNext: ${next}`,
  teach: {time, gist: title, script: [{do: 'Start the timer.'}], do: ['Start the timer.'], done: [`Resume with ${next}.`], watch: [], next}
});

const slides = [
  baseSlide({
    title: 'Day 5 starts with one broken checkout', kicker: 'Day 5 · AI-NATIVE SDLC', subtitle: 'You are new to the codebase. Start from the customer impact.', type: 'context',
    cards: [{title: 'Customer', body: 'Checkout errors rose after deploy d-4821.'}, {title: 'You', body: 'You have one day to build a safe first responder.'}, {title: 'Boundary', body: 'The agent investigates. A named human decides.'}],
    keyPoints: ['Start with customer impact.', 'Use evidence before a proposal.', 'Keep every operational action human-owned.'],
    notes: note({time: '10:00 · 2 min', why: 'The incident gives every file and test a reason to exist.', predict: 'Ask what you would inspect before changing code.', see: 'One broken checkout story.', inside: 'A fixture makes the story repeatable.', participant: 'Name one first check.', watch: 'Do not start with framework terms.', stuck: 'Read the customer card.', stop: 'Collect two checks.', next: 'Meet the builder and the product'})
  }),
  baseSlide({
    title: 'Meet the builder and the product', kicker: 'Day 5 · TWO ROLES', subtitle: 'Claude Code builds the project. The on-call agent is the product.',
    cards: [{title: 'Claude Code', body: 'Reads the repo, proposes edits, and runs focused checks after your review.'}, {title: 'On-call agent', body: 'Reads telemetry, writes a cited diagnosis, and refuses operational action.'}],
    keyPoints: ['The builder and product are different.', 'The required runtime is scripted.', 'A product model is optional.'],
    notes: note({time: '10:02 · 2 min', why: 'Learners must know which agent edits the code.', predict: 'Ask which role edits src/chat.ts.', see: 'Two roles with separate evidence.', inside: 'The product does not inherit the builder session.', participant: 'Name one action for each role.', watch: 'Never call scripted output model evidence.', stuck: 'Point to the two cards.', stop: 'The room can name both roles.', next: 'The safe first-responder problem'})
  }),
  baseSlide({
    title: 'The customer needs a safe first responder', kicker: 'Day 5 · PROBLEM', subtitle: 'The first responder gathers evidence before a person decides.', type: 'context',
    cards: [{title: 'Find', body: 'Compare metrics, deploys, logs, and a diff.'}, {title: 'Explain', body: 'Write a cited diagnosis and one alternative cause.'}, {title: 'Stop', body: 'Leave approval, execution, and resolution to a named human.'}],
    keyPoints: ['Evidence before proposal.', 'Stable references before trust.', 'Human action stays OPEN.'],
    notes: note({time: '10:04 · 2 min', why: 'The outcome comes before the implementation.', predict: 'Ask which action chat must refuse.', see: 'The agent reduces search work.', inside: 'The boundary separates investigation from action.', participant: 'Name one agent task and one human task.', watch: 'Do not imply that automation owns accountability.', stuck: 'Point to the Stop card.', stop: 'The room can state the boundary.', next: 'Four words for the day'})
  }),
  baseSlide({
    title: 'Six words for the day', kicker: 'Day 5 · GLOSSARY', subtitle: 'Use these plain definitions in every assignment.', type: 'concept',
    cards: [{title: 'Incident', body: 'A service problem with an id, state, and evidence.'}, {title: 'Fixture', body: 'Saved input that makes one scenario repeatable.'}, {title: 'Telemetry', body: 'Recorded service measurements, deploys, and logs.'}, {title: 'Tool trace', body: 'The ordered tool calls and arguments behind a claim.'}, {title: 'Approval gate', body: 'A check that requires the exact incident, action, and named human.'}, {title: 'OPEN', body: 'A claim or decision that the available evidence does not settle.'}],
    keyPoints: ['INC-1001 names the fixture incident.', 'The listener creates a different live incident id.', 'A source:ref label points to stable evidence.'],
    notes: note({time: '10:06 · 3 min', why: 'The lesson uses SRE terms that must stay concrete.', predict: 'Ask whether INC-1001 is the live listener record.', see: 'One story can produce distinct records.', inside: 'Fixture and live evidence can share a cause without sharing an id.', participant: 'Define one term in plain English.', watch: 'Keep the fixture incident and live incident distinct.', stuck: 'Use the card definitions.', stop: 'The room can explain all six terms.', next: 'What you build and repeat'})
  }),
  baseSlide({
    title: 'What you build and repeat', kicker: 'Day 5 · OUTCOMES', subtitle: 'By 16:00, you can move from an unfamiliar repo to a reviewed handoff.', type: 'context',
    cards: [{title: 'Learn', body: 'Map the repo and its two intake paths.'}, {title: 'Build', body: 'Complete six focused assignments.'}, {title: 'Prove', body: 'Use tests, traces, browser output, and human review.'}, {title: 'Repeat', body: 'Carry the same method into the hackathon.'}],
    keyPoints: ['Day 1 intent and permissions return.', 'Day 2 skills and hooks return.', 'Day 3 tools return.', 'Day 4 memory and logs stay separate.'],
    tagline: 'AI-native SDLC means that intent, code, proof, and human review stay in one repeatable loop.',
    notes: note({time: '10:09 · 4 min', why: 'The learner needs a finish line and a link to earlier days.', predict: 'Ask which earlier lesson supplied tools.', see: 'Six assignments reuse four days of patterns.', inside: 'Each accepted artifact becomes the next step input.', participant: 'Name one pattern you already know.', watch: 'Keep the AI-native definition to one sentence.', stuck: 'Read the four cards.', stop: 'The room can name the finish line.', next: 'Start the participant project'})
  }),
  baseSlide({
    title: 'Start the participant project', kicker: 'Day 5 · ONE-TIME SETUP', subtitle: 'Open the starter and isolate the Claude Code session.', type: 'context', layout: 'exercise', mode: 'manual', calm: true,
    stage: 'setup',
    repo: {url: 'https://github.com/AetherLink-bv/sre-oncall-agent/tree/workshop/start', label: 'AetherLink-bv/sre-oncall-agent · workshop/start'},
    stepsHeading: 'Set up once',
    steps: [
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git', after: 'A local sre-oncall-agent folder exists.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'cd sre-oncall-agent', after: 'The terminal path ends in sre-oncall-agent.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'claude --setting-sources project --strict-mcp-config --no-chrome', after: 'Claude Code shows the participant project path.', warn: true},
      {text: 'Human review. Trust only this participant clone.', after: 'The project skills load without user settings, Chrome, or auto memory.', warn: true}
    ],
    expected: 'Claude Code is open in the participant clone with project-only context.',
    visual: {shot: 'assets/day5-expected/a1.png', shotLabel: 'Setup example target'},
    cards: [{title: 'Checkpoint', body: 'The branch is workshop/start.\nThe displayed path is the participant clone.\nNo global skills pack is installed.'}, {title: 'Human boundary', body: 'You approve trust for your own folder only.'}],
    keyPoints: ['Use workshop/start.', 'Trust only your clone.', 'Keep project context isolated.'],
    notes: note({time: '10:13 · 7 min', why: 'Every participant needs the same isolated starting point.', predict: 'Ask which folder Claude Code is about to trust.', see: 'The participant clone and project-only Claude Code session.', inside: 'Project settings disable auto memory and the command excludes user settings, MCP connectors, and Chrome.', participant: 'Clone, enter the folder, start Claude Code, and review trust.', watch: 'Do not trust an unfamiliar folder or install global skills.', stuck: 'Use Git Bash on Windows and run one command at a time.', stop: 'The path and workshop/start branch are visible.', next: 'Use the included project skills'})
  }),
  baseSlide({
    title: 'Use the included project skills', kicker: 'Day 5 · PROJECT SKILLS', subtitle: 'The starter already contains the four skills used today.',
    cards: [{title: '/show-me', body: 'Map an unfamiliar code path.'}, {title: '/design-control-loop', body: 'Turn questions into an intent.'}, {title: '/verify-this', body: 'Check one claim against evidence.'}, {title: '/handoff', body: 'Print a reviewed next-step prompt.'}],
    keyPoints: ['Use only project skills during the lesson.', 'The full public pack stays in the appendix.', 'A skill guides work. Tests prove behavior.'],
    notes: note({time: '10:20 · 2 min', why: 'The learner needs the available commands before A1.', predict: 'Ask which skill maps a code path.', see: 'Four included skills support the route.', inside: 'Project settings isolate the workshop context.', participant: 'Type / and locate one skill.', watch: 'Do not install the public pack now.', stuck: 'Restart Claude Code in the trusted folder.', stop: 'Everyone can locate /show-me.', next: 'See the six assignments'})
  }),
  baseSlide({
    title: 'Six assignments, one safe first responder', kicker: 'Day 5 · ROUTE', subtitle: 'Each assignment leaves one reviewed artifact for the next.', type: 'context', layout: 'steps',
    items: [{label: 'A1', caption: 'Map and set up'}, {label: 'A2', caption: 'Define intent'}, {label: 'A3', caption: 'Build the contract'}, {label: 'A4', caption: 'Refuse mutations'}, {label: 'A5', caption: 'Add a read tool'}, {label: 'A6', caption: 'Run, challenge, and gate'}],
    keyPoints: ['A7 is optional offline depth.', 'A9 is an optional lesson and handoff recap.', 'The required route ends after A6.'],
    notes: note({time: '10:22 · 2 min', why: 'Six checkpoints are easier to hold than nine separate builds.', predict: 'Ask which assignment first changes product code.', see: 'The route moves from understanding to proof.', inside: 'A8 remains the stable gate contract inside A6.', participant: 'Point to the assignment you expect to find hardest.', watch: 'Do not call A7 or A9 required.', stuck: 'Read the six captions.', stop: 'The room knows the required route.', next: 'See the starter stack'})
  }),
  baseSlide({
    title: 'The starter stack', kicker: 'Day 5 · STARTER · STACK', subtitle: 'Most code already exists. You build only the missing contracts.', type: 'context',
    cards: [{title: 'Runtime', body: 'TypeScript · Node.js 22 · local files'}, {title: 'Interfaces', body: 'CLI · browser console · Claude Code terminal'}, {title: 'Evidence', body: 'Fixtures · tests · tool traces · screenshots'}, {title: 'Safety', body: 'Read-only tools · refusal grammar · named human gate'}],
    keyPoints: ['Do not rebuild the app.', 'Spend model time on the missing contracts.', 'Use focused checks before full tests.'],
    notes: note({time: '10:24 · 2 min', why: 'The learner should know what not to rebuild.', predict: 'Ask which interface runs on port 4320.', see: 'The starter already has the runtime and console.', inside: 'TODO markers isolate the work.', participant: 'Name one component that already exists.', watch: 'Do not ask Claude Code to rewrite the repository.', stuck: 'Point to the four cards.', stop: 'The room can name the existing stack.', next: 'See what you change'})
  }),
  baseSlide({
    title: 'What is ready and what you change', kicker: 'Day 5 · STARTER VS LEARNER', subtitle: 'Keep the scaffold. Complete four contract cuts and one live proof.', type: 'context',
    cards: [{title: 'Ready', body: 'Fixture loaders, console, telemetry, test harness, and project skills.'}, {title: 'You change', body: 'A3 verdict, A4 refusal and guard, A5 tool, and A8 gate.'}, {title: 'You prove', body: 'A live listener route with stable references and refused mutation.'}],
    keyPoints: ['Read before editing.', 'Do not solve future TODOs early.', 'Keep current participant work on one branch.'],
    notes: note({time: '10:26 · 2 min', why: 'Scope control saves waiting time and tokens.', predict: 'Ask which TODO belongs to the human gate.', see: 'Four cuts and one live proof.', inside: 'The starter stays intentionally incomplete.', participant: 'Name the first file you will inspect.', watch: 'Do not checkout solved branches.', stuck: 'Open workshop:check only to locate markers.', stop: 'The scope is clear.', next: 'A1 · Learn the repo'})
  }),
  baseSlide({
    title: 'A1 · Learn the repo before you build', kicker: 'Day 5 · A1 · CONCEPT', subtitle: 'Map both intake paths before changing code.',
    cards: [{title: 'Fixture path', body: 'INC-1001 enters through src/cli.ts.'}, {title: 'Live path', body: 'The listener creates a different incident id.'}, {title: 'Shared path', body: 'Both call the same investigate flow.'}],
    keyPoints: ['Stay shallow.', 'Name entry files.', 'Stop before editing.'],
    notes: note({time: '10:28 · 2 min', why: 'A newcomer needs a route before a change.', predict: 'Ask whether both paths use the same incident id.', see: 'Two records share one investigation flow.', inside: 'The map bounds later edits.', participant: 'Predict the shared file.', watch: 'Do not confuse the fixture and live ids.', stuck: 'Read the three entry files.', stop: 'The learner can draw both paths.', next: 'A1 example target'})
  }),
  screenshotSlide({number: 1, title: 'A1 · Example map and setup proof', subtitle: 'Use the screenshot as a target, then prove the current clone.', stage: 'learn', shot: 'assets/day5-expected/a1.png', points: ['Two intake paths are visible.', 'One shared investigate flow is named.', 'The console health and local URL belong to the current clone.'], next: 'Assignment 1', time: '10:30 · 2 min'}),
  assignmentSlide({
    number: 1, title: 'map the repo and prove setup', subtitle: 'Learn the code path, then prove the starter without solving it.', stage: 'learn', duration: '10:32 · 18 min', shot: 'assets/day5-expected/a1.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a1Map, after: 'Claude Code shows two intake paths and one shared flow.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a1Setup, after: 'Node, the diff, dependencies, and fixtures are checked.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a1SetupChecks, after: 'The main suite passes and the four workshop cuts stay expected-red.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a1SetupConsole, after: 'The console starts or the existing owned process is identified.'},
      {text: 'Open in browser: http://localhost:4320', after: 'The health panel belongs to this clone and shows the listener.'}
    ],
    after: 'You can explain both intake paths and show a working local starter.',
    checks: ['Map the two intake paths.', 'Show the green main tests.', 'Show the current console health.'],
    humanOpen: 'Do not solve A3, A4, A5, or A8 during setup.', next: 'A2 · Define the operator outcome'
  }),
  baseSlide({
    title: 'A2 · Define the operator outcome', kicker: 'Day 5 · A2 · CONCEPT', subtitle: 'Write what success means before changing the product.',
    cards: [{title: 'Operator', body: 'Who uses the diagnosis?'}, {title: 'Outcome', body: 'What visible result helps them decide?'}, {title: 'Boundary', body: 'What stays sample-only and human-owned?'}],
    keyPoints: ['Ask one bounded round.', 'Write repeatable checks.', 'Keep actions human-owned.'],
    notes: note({time: '10:50 · 2 min', why: 'The contract needs an accepted outcome.', predict: 'Ask which check a stranger can repeat.', see: 'The intent names the operator and proof.', inside: 'The same intent constrains later code.', participant: 'Suggest one observable check.', watch: 'Do not write implementation details into intent.md.', stuck: 'Use operator, outcome, boundary.', stop: 'The room can state one check.', next: 'A2 example target'})
  }),
  screenshotSlide({number: 2, title: 'A2 · Example reviewed intent', subtitle: 'The diff shows the decision before any product code changes.', stage: 'intent', shot: 'assets/day5-expected/a2.png', points: ['One operator outcome is explicit.', 'Three checks are repeatable.', 'Sample data and human decisions are bounded.'], next: 'Assignment 2', time: '10:52 · 2 min'}),
  assignmentSlide({
    number: 2, title: 'write a reviewed intent', subtitle: 'Interview once, review the field map, then edit only intent.md.', stage: 'intent', duration: '10:54 · 16 min', shot: 'assets/day5-expected/a2.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a2Design, after: 'Claude Code shows one field map and at most three questions.'},
      {text: 'Human review. Accept or change the operator, outcome, and boundary.', after: 'The field map contains your decisions.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a2Write, after: 'Claude Code proposes the exact intent.md diff and waits.'},
      {text: 'Human review. Approve only the reviewed intent diff.', after: 'Only intent.md changes.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'git diff -- intent.md', after: 'The diff shows one outcome, three checks, and the human boundary.'}
    ],
    after: 'intent.md carries the reviewed outcome and repeatable checks.',
    checks: ['Read the operator outcome.', 'Repeat the three checks.', 'Name the sample and human boundaries.'],
    humanOpen: 'You accept the intent. Claude Code does not choose the outcome.', next: 'Break'
  }),
  pauseSlide('Break', '15 min', 'A3 · Build the verdict contract', '11:10'),
  baseSlide({
    title: 'A3 · Make the contract fail before it passes', kicker: 'Day 5 · A3 · CONCEPT', subtitle: 'A diagnosis must state observed customer impact and keep gaps OPEN.',
    cards: [{title: 'Required', body: 'customer_impact is non-empty.'}, {title: 'Evidence', body: 'Observed failures or latency support the claim.'}, {title: 'OPEN', body: 'Versions, regions, and segments stay OPEN without evidence.'}],
    keyPoints: ['Read the schema first.', 'Show the red assertion.', 'Update both offline and optional model schemas.'],
    notes: note({time: '11:25 · 3 min', why: 'The contract turns intent into an enforceable result.', predict: 'Ask which claim must stay OPEN.', see: 'One missing field fails the focused test.', inside: 'The schema reaches runtime, fixtures, CLI, and console.', participant: 'Name one unsupported scope claim.', watch: 'Do not weaken the test.', stuck: 'Read docs/spec.md and the A3 test.', stop: 'The contract change is clear.', next: 'A3 example target'})
  }),
  screenshotSlide({number: 3, title: 'A3 · Example red-to-green proof', subtitle: 'The visible field and tests must agree.', stage: 'contract', shot: 'assets/day5-expected/a3.png', points: ['The focused test fails before the edit.', 'customer_impact appears in CLI and browser output.', 'The focused test, main tests, and typecheck finish green.'], next: 'Assignment 3 · review and build', time: '11:28 · 2 min'}),
  assignmentSlide({
    number: 3, title: 'review and build the verdict contract · 1/2', subtitle: 'Accept the contract, then implement only the A3 scope.', stage: 'contract', duration: '11:30 · 20 min', shot: 'assets/day5-expected/a3.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a3Contract, after: 'Claude Code explains the contract and proposes one bounded change.'},
      {text: 'Human review. Accept the field and OPEN rules.', after: 'The implementation boundary is explicit.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a3Build, after: 'Claude Code explains the red assertion and lists the bounded file scope.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a3BuildImplement, after: 'Claude Code applies the accepted edits and the focused A3 test passes.'},
      {text: 'Open in browser: http://localhost:4320', after: 'The incident view displays customer impact.'},
    ],
    after: 'The contract rejects an empty customer impact and both interfaces display it.',
    checks: ['Show the original red assertion.', 'Show customer_impact on both interfaces.', 'Keep unsupported scope OPEN.'],
    humanOpen: 'You accept the contract. No approval or operation occurs.', next: 'Assignment 3 · verify'
  }),
  checkpointSlide({
    number: 3, title: 'verify the verdict contract · 2/2', subtitle: 'Check the claim with independent evidence before lunch.', stage: 'contract', duration: '11:50 · 7 min', shot: 'assets/day5-expected/a3.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a3BuildProve, after: 'The main tests, typecheck, offline output, and browser field are visible.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a3Verify, after: 'Claude Code returns VERIFIED, NOT VERIFIED, or INCONCLUSIVE.'},
      {text: 'Human review. Open every cited file and output.', after: 'Each reference supports the stated verdict.'},
      {text: 'Open in browser: http://localhost:4320', after: 'The visible customer impact matches the verified claim.'},
      {text: 'If you are blocked, type this in: Terminal 2 (Git Bash on Windows)', prompt: 'git stash push -u -m "before Day 5 A3 catch-up" && git switch -c day5-catch-up-a3 day5-after-a3', after: 'Your work is saved and a new branch starts at the reviewed A3 checkpoint.', warn: true}
    ],
    after: 'The A3 claim is verified with file and output references.',
    checks: ['Read the verification verdict.', 'Open the cited evidence.', 'Show green typecheck and main tests.'],
    humanOpen: 'A verification result does not approve or execute an operation.', next: 'Pre-lunch quiz'
  }),
  baseSlide({
    title: 'Pre-lunch quiz · What is true now?', kicker: 'Day 5 · QUIZ', subtitle: 'Vote first. Reveal the answers second.', type: 'quiz',
    cards: [{title: 'A', body: 'INC-1001 and the listener incident are the same record.'}, {title: 'B', body: 'The builder and product runtime are separate.'}, {title: 'C', body: 'A green contract test proves a human approved rollback.'}, {title: 'D', body: 'Unsupported customer scope stays OPEN.'}],
    keyPoints: ['B and D are true.', 'A confuses two records.', 'C confuses proof with authority.'],
    notes: note({time: '11:57 · 3 min', why: 'The quiz catches identity and authority mistakes before lunch.', predict: 'Ask for two true answers.', see: 'B and D remain.', inside: 'The wrong answers repeat the two main risks.', participant: 'Vote before the reveal.', watch: 'Do not explain before the vote.', stuck: 'Read each answer aloud.', stop: 'The room can explain both false answers.', next: 'Lunch'})
  }),
  pauseSlide('Lunch', '60 min', 'Recall the morning before A4', '12:00'),
  pauseSlide('Restart and settle', '10 min', 'Post-lunch recap', '13:00'),
  baseSlide({
    title: 'Post-lunch recap · Intent becomes a contract', kicker: 'Day 5 · RECAP', subtitle: 'Reconnect A1, A2, and A3 before the control work.', type: 'recap',
    cards: [{title: 'A1', body: 'Map both intake paths.'}, {title: 'A2', body: 'Accept the operator outcome.'}, {title: 'A3', body: 'Require customer impact and keep gaps OPEN.'}],
    keyPoints: ['The repo map bounded the work.', 'The intent defined success.', 'The contract made success testable.'],
    notes: note({time: '13:10 · 3 min', why: 'The room needs the morning chain before adding controls.', predict: 'Ask which artifact A3 implements.', see: 'Map, intent, and contract form one chain.', inside: 'A4 now protects the action boundary.', participant: 'Explain one link to a partner.', watch: 'Do not introduce new content.', stuck: 'Read the three cards.', stop: 'The room can state the chain.', next: 'A4 · Refuse unsafe chat actions'})
  }),
  baseSlide({
    title: 'A4 · Refuse unsafe chat actions', kicker: 'Day 5 · A4 · CONCEPT', subtitle: 'Chat may investigate. Buttons and a named person own mutations.',
    cards: [{title: 'Question', body: 'Read-only evidence questions stay allowed.'}, {title: 'Mutation', body: 'Rollback, approval, scaling, and resolution stay refused.'}, {title: 'File guard', body: 'A human-owned hook protects bench/ratchet.json edits.'}],
    keyPoints: ['Grammar runs before the model.', 'The evidence question must still work.', 'The hook proves a file-edit boundary only.'],
    notes: note({time: '13:13 · 3 min', why: 'The product must separate investigation from action.', predict: 'Ask whether “Can you roll back?” is a question or mutation.', see: 'Mutation language routes to refusal.', inside: 'The human hook protects one file boundary.', participant: 'Suggest one mutation phrase.', watch: 'Do not claim full shell protection.', stuck: 'Run the focused chat test.', stop: 'The boundary is clear.', next: 'A4 example target'})
  }),
  screenshotSlide({number: 4, title: 'A4 · Example refusal and guard proof', subtitle: 'A refused mutation and a focused guard check prove different boundaries.', stage: 'controls', shot: 'assets/day5-expected/a4.png', points: ['The mutation request is refused.', 'The exact A6 evidence question remains allowed.', 'Edit and Write to bench/ratchet.json are denied.'], next: 'Assignment 4', time: '13:16 · 2 min'}),
  assignmentSlide({
    number: 4, title: 'wire and prove the controls', subtitle: 'Build the chat refusal, then review the human-owned file guard.', stage: 'controls', duration: '13:18 · 22 min', shot: 'assets/day5-expected/a4.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a4Chat, after: 'The focused chat test proves mutation refusal and a read-only question.'},
      {text: 'Human review. Add the single reviewed guard line.', after: 'Edit and Write to bench/ratchet.json are denied.', warn: true},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a4Review, after: 'Claude Code reports the focused guard result without editing the hook.'},
      {text: 'Open in browser: http://localhost:4320', after: 'A mutation message shows the refusal and no action record.'},
      {text: 'Human review. Compare chat refusal with the file guard.', after: 'You can explain the two different boundaries.'}
    ],
    after: 'Chat refuses mutations, evidence questions work, and the human-owned file guard passes.',
    checks: ['Show both focused tests.', 'Show one allowed evidence question.', 'Show no approval or action record.'],
    humanOpen: 'Only the participant edits the human-owned hook line.', next: 'A5 · Add one read-only tool'
  }),
  baseSlide({
    title: 'A5 · Give the agent one read-only tool', kicker: 'Day 5 · A5 · CONCEPT', subtitle: 'A tool supplies evidence. It does not supply authority.',
    cards: [{title: 'Handler', body: 'list_deploys returns deployment evidence.'}, {title: 'Trace', body: 'The trace records the exact arguments.'}, {title: 'No bypass', body: 'Offline runtime and chat use the registered handler.'}],
    keyPoints: ['No mutation tool exists.', 'Empty windows remain data gaps.', 'Trace arguments must match the request.'],
    notes: note({time: '13:40 · 3 min', why: 'The diagnosis needs facts outside the prompt.', predict: 'Ask which tool call proves a deploy claim.', see: 'One read-only handler appears in the trace.', inside: 'Three bypasses must disappear.', participant: 'Choose an empty-window or missing-deploy case.', watch: 'Do not add a write tool.', stuck: 'Run the focused A5 test.', stop: 'The tool boundary is clear.', next: 'A5 example target'})
  }),
  screenshotSlide({number: 5, title: 'A5 · Example tool and trace proof', subtitle: 'The result and the arguments both belong in the proof.', stage: 'tools', shot: 'assets/day5-expected/a5.png', points: ['The registered handler returns deploy evidence.', 'The trace shows exact list_deploys arguments.', 'The offline runtime and chat no longer bypass the handler.'], next: 'Assignment 5', time: '13:43 · 2 min'}),
  assignmentSlide({
    number: 5, title: 'build a read-only deploy tool', subtitle: 'Bind one evidence tool and prove every route uses it.', stage: 'tools', duration: '13:45 · 20 min', shot: 'assets/day5-expected/a5.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a5Build, after: 'Claude Code shows the red focused test and the three bypasses.'},
      {text: 'Human review. Approve only the handler and bypass-removal scope.', after: 'The implementation stays read-only.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'npm run test:workshop -- --test-name-pattern=A5:', after: 'Only the focused A5 checks run and pass.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'npm run investigate -- fixtures/incidents/bad-deploy.json --offline', after: 'The trace shows list_deploys and exact arguments.'},
      {text: 'Human review. Compare the result with the trace.', after: 'Every deploy claim has a tool reference.'}
    ],
    after: 'The deploy tool is read-only, traced, and used by every investigation route.',
    checks: ['Show the handler result.', 'Show exact trace arguments.', 'Show no direct deploy-reader bypass.'],
    humanOpen: 'A tool result informs a decision. It never authorizes one.', next: 'A5 catch-up checkpoint'
  }),
  baseSlide({
    title: 'Catch-up · Ready for the live route', kicker: 'Day 5 · CHECKPOINT A5', subtitle: 'Save your work before using the reviewed A5 checkpoint.', type: 'review', layout: 'exercise', mode: 'manual', calm: true,
    stepsHeading: 'Use only when blocked',
    steps: [
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'git status --short', after: 'You can see every local change before recovery.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'git stash push -u -m "before Day 5 A5 catch-up"', after: 'Tracked and untracked participant work is saved.', warn: true},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'git switch -c day5-catch-up-a5 day5-after-a5', after: 'A new branch starts at the reviewed A5 checkpoint.'},
      {text: 'Human review. Continue with A6 only.', after: 'Your original work remains in the named stash.'}
    ],
    expected: 'A new catch-up branch is ready without discarding participant work.',
    cards: [{title: 'A3', body: 'customer_impact is required and visible.'}, {title: 'A4', body: 'Mutations are refused and the guard passes.'}, {title: 'A5', body: 'list_deploys returns evidence with trace arguments.'}],
    keyPoints: ['Pair on the first missing checkpoint.', 'Do not rerun every suite.', 'Continue when all three proofs are visible.'],
    notes: note({time: '14:05 · 5 min', why: 'The live route depends on the three completed contracts.', predict: 'Ask which proof is missing first.', see: 'Three compact checkpoints.', inside: 'The recovery commands preserve work and create a separate branch.', participant: 'Pair-check A3, A4, and A5.', watch: 'Never reset or overwrite participant work.', stuck: 'Use the reviewed day5-after-a5 tag.', stop: 'All three checkpoints are visible.', next: 'A6 · Run the live counterpart'})
  }),
  baseSlide({
    title: 'A6 · Run the live counterpart', kicker: 'Day 5 · A6 · CONCEPT', subtitle: 'Create a new live incident, challenge its evidence, and keep action human-owned.',
    cards: [{title: 'Before', body: 'Run healthy traffic for two minutes.'}, {title: 'Change', body: 'Run one bad deploy in its own terminal.'}, {title: 'Explain', body: 'Use stable refs and keep current telemetry separate.'}, {title: 'Gate', body: 'Wrong incident or action stays blocked.'}],
    keyPoints: ['Reuse owned processes.', 'Do not let Claude run chaos.', 'The A8 gate is the final A6 checkpoint.'],
    notes: note({time: '14:10 · 4 min', why: 'The learner now has the contracts needed for a real local route.', predict: 'Ask why the healthy baseline comes first.', see: 'The listener creates a new live incident.', inside: 'The fixture remains a separate reference record.', participant: 'Name one alternative cause.', watch: 'Keep fixture, live, diagnosis snapshot, and current telemetry distinct.', stuck: 'Stay on the scripted route.', stop: 'The room can state the order.', next: 'A6 example target'})
  }),
  screenshotSlide({number: 6, title: 'A6 · Example live incident proof', subtitle: 'The current run must reproduce the route and its evidence labels.', stage: 'live', shot: 'assets/day5-expected/a6.png', points: ['The live incident has its own id.', 'Diagnosis claims cite stable source:ref labels.', 'Snapshot evidence and current telemetry are labeled separately.'], next: 'Assignment 6 · start and trace', time: '14:14 · 2 min'}),
  assignmentSlide({
    number: 6, title: 'start and trace the live route · 1/2', subtitle: 'Map the path, reuse services, establish a baseline, then create one incident.', stage: 'live', duration: '14:16 · 22 min', shot: 'assets/day5-expected/a6.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a6Map, after: 'Claude Code maps the fixture and live routes without editing.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a6Build, after: 'Claude Code proposes the terminal order and waits for approval.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows). Use three terminal windows.', parts: [['Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console'], ['Window 2', 'npm run shop'], ['Window 3', 'npm run traffic']], after: 'The console, shop, and healthy traffic processes report ready. Reuse owned processes.', warn: true},
      {text: 'Human review. Keep healthy traffic running for two minutes.', after: 'The browser shows a healthy before-state.', warn: true},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows). Use Window 4.', parts: [['Window 4', 'npm run chaos -- deploy v2.15.0 --mode bad-deploy']], after: 'One bad-deploy event creates a new listener incident at http://localhost:4320.', warn: true}
    ],
    after: 'A new live incident exists with a healthy before-state and a visible tool trace.',
    checks: ['Show the live incident id.', 'Show the two-minute baseline.', 'Show the diagnosis trace.'],
    humanOpen: 'The participant starts chaos. Claude Code never runs or stops the processes.', next: 'A8 example human gate'
  }),
  screenshotSlide({number: 8, title: 'Human approval gate · Part of A6', kicker: 'Day 5 · A6 · HUMAN GATE', subtitle: 'This stable contract is the final safety checkpoint inside A6.', stage: 'gate', shot: 'assets/day5-expected/a8.png', points: ['A wrong incident stays blocked.', 'A wrong action stays blocked.', 'The real approval and execution remain HUMAN OPEN.'], next: 'Assignment 6 · challenge and gate', time: '14:38 · 2 min'}),
  checkpointSlide({
    number: 6, title: 'challenge the incident and prove the gate · 2/2', subtitle: 'Ask for evidence, test an alternative, refuse mutation, and prove the named-human gate.', stage: 'gate', duration: '14:40 · 20 min', shot: 'assets/day5-expected/a8.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a6Evidence, after: 'The answer cites stable refs and separates snapshot from current telemetry.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a6Alternative, after: 'The answer names an alternative or marks missing evidence OPEN.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a6Mutation, after: 'Chat refuses the rollback request and creates no action record.', warn: true},
      {text: 'Type this in: Claude Code. Build the human gate.', prompt: PROMPTS.a8Build, after: 'The wrong incident or action stays blocked in the focused test.'},
      {text: 'Open in browser: http://localhost:4320', after: 'Approve and Execute remain HUMAN OPEN.', warn: true}
    ],
    after: 'The incident answer is cited, mutation is refused, and the exact human gate stays closed.',
    checks: ['Show stable evidence refs.', 'Show the refused mutation.', 'Show the A8 mismatch test and HUMAN OPEN action.'],
    humanOpen: 'Only a named human may approve, execute, mitigate, or resolve.', next: 'Break'
  }),
  pauseSlide('Break', '15 min', 'A6 catch-up and recap', '15:00'),
  baseSlide({
    title: 'Catch-up · Six required assignments complete', kicker: 'Day 5 · CHECKPOINT A6', subtitle: 'Save your work before using the reviewed A6 checkpoint.', type: 'review', layout: 'exercise', mode: 'manual', calm: true,
    stepsHeading: 'Use only when blocked',
    steps: [
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'git status --short', after: 'You can see every local change before recovery.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'git stash push -u -m "before Day 5 A6 catch-up"', after: 'Tracked and untracked participant work is saved.', warn: true},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'git switch -c day5-catch-up-a6 day5-after-a6', after: 'A new branch starts at the reviewed A6 checkpoint.'},
      {text: 'Human review. Keep approval and execution HUMAN OPEN.', after: 'The checkpoint remains safe and ready for the recap.', warn: true}
    ],
    expected: 'A safe A6 catch-up branch is ready and participant work is preserved.',
    cards: [{title: 'Evidence', body: 'Stable refs support the diagnosis.'}, {title: 'Boundary', body: 'Mutation is refused and approval stays HUMAN OPEN.'}, {title: 'Identity', body: 'The fixture and live incident remain distinct.'}],
    keyPoints: ['Use one focused check.', 'Keep unsupported claims OPEN.', 'Stop when the missing proof appears.'],
    notes: note({time: '15:15 · 5 min', why: 'The required build route is now complete.', predict: 'Ask which proof a teammate could repeat.', see: 'Three final A6 checks.', inside: 'The recovery commands preserve work and keep actions closed.', participant: 'Pair-check the first missing proof.', watch: 'Do not invent resolution or approval.', stuck: 'Use the reviewed day5-after-a6 tag.', stop: 'All required proof is visible.', next: 'Hackathon intent studio'})
  }),
  baseSlide({
    title: 'Hackathon intent studio', kicker: 'Day 5 · PRACTICE', subtitle: 'Use the remaining time to sharpen one problem and three checks.', type: 'review', layout: 'exercise', calm: true, mode: 'manual',
    stepsHeading: 'Prepare the next build',
    steps: [
      {text: 'Human review. Write one customer or operator problem.', after: 'The problem describes current pain, not a feature.'},
      {text: 'Human review. Write three results another person can repeat.', after: 'Each check has a visible result.'},
      {text: 'Human review. Mark the data and action boundaries.', after: 'The agent and human responsibilities are distinct.'},
      {text: 'Human review. Choose one small first build.', after: 'The next step fits one focused work session.'}
    ],
    expected: 'You have one problem, three checks, explicit boundaries, and one first build.',
    cards: [{title: 'Use tomorrow', body: 'This intent is the first hackathon input.'}, {title: 'Keep small', body: 'Do not design the full product today.'}],
    keyPoints: ['Problem before solution.', 'Checks before implementation.', 'One build before a roadmap.'],
    notes: note({time: '15:20 · 30 min', why: 'The workshop method becomes useful when it transfers to a new problem.', predict: 'Ask whether the first sentence describes pain or a feature.', see: 'One bounded hackathon intent.', inside: 'The same intent, build, proof, and review loop repeats.', participant: 'Write and pair-review the four parts.', watch: 'Do not force the SRE sample as the hackathon topic.', stuck: 'Reuse operator, outcome, boundary, first build.', stop: 'Each learner has a reviewed start point.', next: 'Final recap'})
  }),
  baseSlide({
    title: 'Recap · The six-assignment loop', kicker: 'Day 5 · RECAP', subtitle: 'Name the artifact and proof from each assignment.', type: 'recap', layout: 'steps',
    items: [{label: 'A1', caption: 'repo map + setup proof'}, {label: 'A2', caption: 'reviewed intent'}, {label: 'A3', caption: 'verdict contract'}, {label: 'A4', caption: 'refusal + guard'}, {label: 'A5', caption: 'read tool + trace'}, {label: 'A6', caption: 'live evidence + human gate'}],
    keyPoints: ['Learn the repo.', 'Choose the outcome.', 'Build one contract.', 'Prove it.', 'Stop for the person.'],
    notes: note({time: '15:50 · 7 min', why: 'The final recall turns six builds into one reusable method.', predict: 'Ask which assignment created the first accepted artifact.', see: 'Six artifacts form one loop.', inside: 'The handoff carries only verified work forward.', participant: 'Explain one assignment to a partner without notes.', watch: 'Do not introduce new content.', stuck: 'Read the artifact captions.', stop: 'Collect one method each learner will reuse.', next: 'End at 16:00'})
  }),
  baseSlide({
    title: 'End at 16:00', kicker: 'Day 5 · DONE', subtitle: 'Keep your intent, evidence, OPEN list, and handoff.', type: 'context',
    cards: [{title: 'Keep', body: 'intent.md · evidence refs · focused checks · HANDOFF.md'}, {title: 'Do not claim', body: 'A human approval, execution, resolution, or promoted lesson that did not happen.'}],
    keyPoints: ['Thank the room.', 'Name the hackathon first step.', 'Keep the human boundary explicit.'],
    notes: 'Time: 15:57 · 3 min.\n\nThank the room. Ask one person to read the first line of the handoff. End at 16:00.'
  }),
  baseSlide({
    title: 'Appendix · Optional product model', kicker: 'Day 5 · APPENDIX · OPTIONAL LIVE MODEL', subtitle: 'Run one approved model proof only after the required route.', type: 'concept', layout: 'exercise', calm: true, mode: 'manual',
    stepsHeading: 'Optional local proof',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.liveModelSetup, after: 'Claude Code proposes the bounded proof and waits.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'npm run investigate -- fixtures/incidents/bad-deploy.json --model sonnet --max-turns 8 --max-budget-usd 0.30 --dry-run', after: 'One diagnosis and tool trace complete, or the run stops with a clear reason.', warn: true},
      {text: 'Human review. Inspect cost, diagnosis, and trace before any console restart.', after: 'A health label alone is not accepted as proof.', warn: true},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'env -u AGENT_MODEL AGENT_LISTEN_WINDOW_MIN=1 npm run console', after: 'The required scripted route is restored.'}
    ],
    expected: 'One bounded product-model proof is separate from the required scripted route.',
    keyPoints: ['Never display credentials.', 'One turn can exceed the budget.', 'The console has no global model-budget guard.'],
    notes: 'Appendix. Use only after the required six assignments and with approved model access. The model name in health is configuration, not proof.'
  }),
  baseSlide({
    title: 'Appendix · A7 optional offline coverage', kicker: 'Day 5 · A7 · OPTIONAL', subtitle: 'Add one deterministic case without lowering the expected result.', type: 'concept',
    cards: [{title: 'Baseline', body: 'Save case count, score floor, and harmful count.'}, {title: 'Treatment', body: 'Add one reviewed fixture case.'}, {title: 'Limit', body: 'The offline bench does not prove live model resistance.'}],
    keyPoints: ['A7 is optional.', 'Keep both ratchet values unchanged.', 'Compare baseline and treatment.'],
    notes: 'Appendix. Use when the core route finishes early. Keep fixture evidence separate from model evidence.'
  }),
  screenshotSlide({number: 7, title: 'Appendix · A7 example bench comparison', subtitle: 'The example shows the proof shape for the optional exercise.', stage: 'optional', shot: 'assets/day5-expected/a7.png', points: ['The case count increases by one.', 'The new case passes and harmful stays 0.', 'Both score-floor values remain unchanged.'], next: 'Optional A7 prompt'}),
  baseSlide({
    title: 'Appendix · Run optional A7', kicker: 'Day 5 · A7 · OPTIONAL PRACTICE', subtitle: 'Use only when the required route is complete.', type: 'review', layout: 'exercise', calm: true, mode: 'manual',
    stepsHeading: 'Optional offline depth',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a7Build, after: 'Claude Code saves baseline and treatment evidence.'},
      {text: 'Human review. Inspect the new case and unchanged floor.', after: 'The case does not weaken an existing expectation.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a7Verify, after: 'Claude Code reports a cited verification verdict.'},
      {text: 'Human review. Keep the model-eval claim OPEN.', after: 'The result is described as deterministic fixture evidence only.'}
    ],
    expected: 'One reviewed case increases offline coverage without moving the floor.',
    visual: {shot: 'assets/day5-expected/a7.png', shotLabel: 'A7 optional example'},
    keyPoints: ['Optional only.', 'No floor reduction.', 'No live-model claim.'],
    notes: 'Appendix. This is not a seventh required assignment.'
  }),
  baseSlide({
    title: 'Appendix · A9 optional lesson proposal', kicker: 'Day 5 · A9 · OPTIONAL', subtitle: 'Propose reusable knowledge. Do not promote it automatically.', type: 'concept',
    cards: [{title: 'Curated knowledge', body: 'lessons/lessons.md contains human-reviewed lessons.'}, {title: 'Action log', body: 'approvals/audit.jsonl records decisions and attempts.'}, {title: 'Progress signal', body: 'PROGRESS.md is not validation.'}, {title: 'Handoff', body: 'HANDOFF.md carries verified work and OPEN items.'}],
    keyPoints: ['A human promotes a lesson.', 'An audit log is not memory.', 'A handoff does not invent closure.'],
    notes: 'Appendix. Use after the handoff recap if the room has time.'
  }),
  screenshotSlide({number: 9, title: 'Appendix · A9 example lesson boundary', subtitle: 'The example separates a proposal, a log, progress, and a handoff.', stage: 'optional', shot: 'assets/day5-expected/a9.png', points: ['The lesson remains proposed.', 'The audit log records actions without becoming memory.', 'The handoff keeps resolution and promotion OPEN.'], next: 'Optional A9 prompt'}),
  baseSlide({
    title: 'Appendix · Run optional A9', kicker: 'Day 5 · A9 · OPTIONAL PRACTICE', subtitle: 'Review one lesson proposal without promoting it.', type: 'review', layout: 'exercise', calm: true, mode: 'manual',
    stepsHeading: 'Optional maintain step',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a9Maintain, after: 'Claude Code separates the three file roles or stops with HUMAN OPEN for a placeholder diagnosis.'},
      {text: 'Human review. Separate curated knowledge, the action log, and progress signals.', after: 'The file roles are clear before any proposal.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a9MaintainDraft, after: 'Claude Code shows one cited proposal under lessons/proposed/.'},
      {text: 'Human review. Leave lessons/lessons.md unchanged.', after: 'Promotion remains a named human action.'},
      {text: 'Human review. Carry only accepted wording into the handoff.', after: 'The handoff stays honest and reusable.'}
    ],
    expected: 'One reusable lesson is proposed and remains unpromoted.',
    visual: {shot: 'assets/day5-expected/a9.png', shotLabel: 'A9 optional example'},
    keyPoints: ['Optional only.', 'Proposal is not promotion.', 'Progress is not proof.'],
    notes: 'Appendix. Do not present this as a required assignment.'
  }),
  baseSlide({
    title: 'Appendix · A9 handoff recap', kicker: 'Day 5 · A9 · OPTIONAL HANDOFF', subtitle: 'Carry verified work and OPEN items forward without inventing closure.', type: 'review', layout: 'exercise', calm: true, mode: 'manual',
    stepsHeading: 'Review the next-team handoff',
    steps: [
      {text: 'Human review. Name the operator problem and accepted intent.', after: 'The handoff begins with the reviewed outcome.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a9Handoff, after: 'Claude Code prints a full handoff and stops before writing.'},
      {text: 'Human review. Check every evidence reference and HUMAN OPEN item.', after: 'Resolution, promotion, approval, and execution remain honest.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a9Save, after: 'Claude Code asks before saving the exact reviewed text.'}
    ],
    expected: 'HANDOFF.md contains only reviewed intent, verified checks, OPEN items, and one next step.',
    visual: {shot: 'assets/day5-expected/a9.png', shotLabel: 'A9 optional handoff example'},
    keyPoints: ['Optional recap only.', 'Review before save.', 'Do not invent closure.'],
    notes: 'Appendix. This handoff recap is not a seventh required assignment.'
  }),
  baseSlide({
    title: 'Appendix · Choose one skill for the hackathon', kicker: 'Day 5 · APPENDIX · HACKATHON SKILLS', subtitle: 'Install only the project skill that your hackathon needs.', type: 'context',
    source: {url: 'https://github.com/AetherLink-bv/claude-code-skills-pack', label: 'github.com/AetherLink-bv/claude-code-skills-pack'},
    prompt: "Read README.md and inspect the skill I choose. Explain what it does and its requirements. Propose installing only that skill in my chosen project's .claude/skills folder. Check for an existing skill with that name and preserve it. Show the source and target paths. Ask for my approval before copying or replacing anything. Do not install the full pack, change global settings, or run the skill yet.",
    cards: [{title: 'After Day 5', body: 'Keep the lesson project skills separate.'}, {title: 'Start isolated', body: 'Use project-only settings and no Chrome integration.'}, {title: 'Choose one', body: 'Inspect one skill for the hackathon problem.'}, {title: 'Review first', body: 'Approve the source and project-local target.'}],
    keyPoints: ['Do not bulk install.', 'Preserve an existing skill.', 'Do not change global settings.'],
    notes: 'Appendix. The full pack is hackathon support, not lesson setup.'
  }),
  baseSlide({title: 'Appendix · Why this is an AI-native SDLC loop', kicker: 'Day 5 · APPENDIX', subtitle: 'Each accepted artifact becomes the next step input.', cards: [{title: 'Intent', body: 'intent.md'}, {title: 'Build', body: 'one bounded contract'}, {title: 'Proof', body: 'focused checks and visible output'}, {title: 'Human review', body: 'accepted wording and action boundary'}], keyPoints: ['The loop is non-linear.', 'Evidence crosses each handoff.', 'Humans own decisions.'], notes: 'Appendix. Source: https://claude.com/resources/articles/the-ai-native-sdlc-playbook'}),
  baseSlide({title: 'Appendix · Guidance and enforcement differ', kicker: 'Day 5 · APPENDIX', subtitle: 'CLAUDE.md guides. Tests, permissions, and hooks enforce defined boundaries.', cards: [{title: 'Guide', body: 'CLAUDE.md · intent.md · skills'}, {title: 'Enforce', body: 'tests · permissions · human-owned hook'}, {title: 'Record', body: 'trace · audit · HUMAN OPEN list'}], keyPoints: ['A written rule can be ignored.', 'A hook blocks a defined edit.', 'A human reviews both.'], notes: 'Appendix. Use after A4 when a learner asks why chat refusal is not enough.'}),
  baseSlide({title: 'Appendix · Optional /sdlc course mod', kicker: 'Day 5 · APPENDIX · OPTIONAL', subtitle: 'The mod opens the current prompt inside Claude Code.', cards: [{title: 'It does', body: 'Open an assignment and fill its prompt.'}, {title: 'It does not', body: 'Submit the prompt or complete a human decision.'}], keyPoints: ['Optional route only.', 'The slides remain the prompt source.', 'No plugin is required.'], notes: 'Appendix. The mod fills a prompt. The participant reviews and submits it.'}),
  baseSlide({title: 'Appendix · Recovery without a solved branch', kicker: 'Day 5 · APPENDIX · FACILITATOR', subtitle: 'Recover the current step. Preserve participant work.', cards: [{title: 'After 2 minutes', body: 'Ask for the blocker and next focused check.'}, {title: 'After one failed attempt', body: 'Pair and compare the current artifact.'}, {title: 'After two failed attempts', body: 'Use facilitator evidence and apply only the reviewed change.'}], keyPoints: ['No branch checkout between assignments.', 'No full suite after every prompt.', 'Preserve the participant diff.'], notes: 'Appendix. Never replace participant work with solved code.'}),
  baseSlide({title: 'Appendix · Optional real-model eval', kicker: 'Day 5 · APPENDIX · OPTIONAL', subtitle: 'Run only with approved access, cost, and data.', cards: [{title: 'Required proof', body: 'The scripted route checks deterministic fixtures.'}, {title: 'Optional proof', body: 'A separately approved eval can test model behavior.'}], keyPoints: ['Keep fixture and model evidence separate.', 'Record model, cost, and exact input.', 'Do not fill waiting time with a paid run.'], notes: 'Appendix. The required route needs no paid model.'}),
  baseSlide({title: 'Bonus · Daily Brief agent', kicker: 'Day 5 · BONUS', subtitle: 'Use the Daily Brief lab only after the SRE lesson.', repo: {url: 'https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1', label: 'AetherLink-bv/aetherlink-daily-brief-lab-s1'}, cards: [{title: 'Core route', body: 'Steps 1 to 4 · 30 to 40 minutes'}, {title: 'Homework', body: 'Steps 5 to 7'}, {title: 'Gate', body: 'Open a pull request only after human review.'}], keyPoints: ['SRE is the main lesson.', 'Daily Brief is the bonus.', 'Reuse the same evidence and human-gate method.'], notes: 'Bonus only. Do not shorten the six required assignments to fit this lab.'})
];

window.DAY5_PROMPTS = PROMPTS;
window.SLIDES = slides;
window.SLIDES.forEach((slide, index) => {
  slide.teach.next = window.SLIDES[index + 1]?.title || 'End';
});
