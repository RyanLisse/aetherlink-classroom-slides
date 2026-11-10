'use strict';

const PROMPTS = {
  liveModelSetup: `Read README.md, src/runtime.ts, src/e2e.ts, console/server.ts, and package.json. Explain the difference between my local Claude Code builder session and the optional Claude Agent SDK product runtime. Check only whether Claude Code is signed in and whether npm run doctor reports the Claude Code login path. Never print, read, or copy credentials. Propose one bounded CLI proof with max-turns 8 and max-budget-usd 0.30, followed by an optional console restart with AGENT_MODEL=sonnet. Require one completed diagnosis and its tool trace. State that the budget is checked between turns and can be exceeded by one turn. Include the fallback that restarts without AGENT_MODEL. Do not run a paid model, edit files, or start processes. Stop for my review.`,
  a1Map: `/show-me How does an incident reach the agent in this project? Read CLAUDE.md and fixtures/incidents/bad-deploy.json first. Then look only at src/cli.ts, console/server.ts, src/chat.ts and src/agent.ts. Draw two routes: the saved incident INC-1001 started with a command, and a live alert picked up by the console. Show where both reach the same investigate function. Only read, change nothing, then stop.`,
  a1Setup: `Use the repository map we reviewed. Require Node 22 or newer. Check the current diff and whether dependencies are present. Use npm ci only when dependencies are missing. Generate the sample fixtures. Show the commands and results, then stop for my environment review. Do not start a server or solve a TODO.`,
  a1SetupChecks: `Run the main tests and the workshop tests. Explain why A3, A4, A5, and A8 are expected to fail. Do not solve them. Show the exact pass and expected-red counts, then stop for my test review.`,
  a2Design: `/design-control-loop Read intent.md, fixtures/incidents/bad-deploy.json, and REVIEW.md. Ask at most three questions in one round about the operator, observable outcome, and read-only boundary. Recommend one answer for each question. Map my answers to intent.md fields. Stay in design mode. Do not edit or build. Stop after the field map.`,
  a2Write: `Use the accepted field map. Propose an exact intent.md diff with one operator outcome, three repeatable checks, the sample-data boundary, and the named human decisions. Wait for my approval. After I approve, edit only intent.md and show the diff. Do not build or push.`,
  a3Contract: `Read the accepted intent.md, docs/spec.md, src/contract.ts, src/runtime.ts, src/prompts.ts, and the A3 workshop test. Explain the verdict contract in plain English. Propose the smallest change for all five rules in TODO(A3): customer_impact is required and non-empty, rollback needs a deploys evidence line, a strong proposal needs at least two sources, low confidence cannot carry a strong proposal, and high confidence is refused while data_gaps exist. The change keeps unsupported claims OPEN and keeps the offline and optional model schemas aligned. Keep versions, regions, and customer segments OPEN unless the cited metric establishes them. Do not edit. Stop for my contract review.`,
  a3Build: `Use the accepted contract. Run only the focused A3 test. Explain the red assertion before editing. List the files that must change and why. Do not edit yet. Stop for my build-scope review.`,
  a3BuildImplement: `Implement the accepted A3 scope. Update TODO(A3), docs/spec.md, the contract and prompt schemas, every offline verdict branch, the affected fixtures, and the customer_impact output in src/cli.ts and console/index.html. Do not change unrelated scaffolding. Rerun only the focused A3 test and show the diff. Do not approve, execute, resolve, or push.`,
  a3BuildProve: `Run the main tests, typecheck, and the offline investigation. Show customer_impact in the exact CLI output. Keep unsupported versions, regions, and customer segments OPEN. Report any failure before editing again. Do not push.`,
  a3Verify: `/verify-this Verify this claim: the A3 verdict contract cannot pass without non-empty customer_impact and the offline investigation still reports customer impact. Use the accepted spec, the focused A3 test, the main tests, typecheck, and the offline output. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with file and output references. Stay read-only.`,
  a4Chat: `Read intent.md, src/chat.ts, and test/workshop/chat.test.ts. Explain the chat-refusal contract. Add a named MUTATION regex constant. Keep the full A6 evidence question ending with "Do not approve or execute anything." read-only. Refuse "Do not approve and roll back now." as a mutation. Show the focused chat test red, then implement only TODO(A4) in src/chat.ts. Rerun the focused chat test and show its output and the diff. Do not inspect approvals/audit.jsonl or edit .claude/, approvals/, lessons/lessons.md, PROGRESS.md, or bench/ratchet.json. Stop before the human hook step.`,
  a4GuardBefore: `Run only the focused guard test: npx tsx --test test/workshop/guard.test.ts. Do not edit any file. Explain in plain words which test is red and what it means for bench/ratchet.json. Stop for my review.`,
  a4Review: `Read the human edit in .claude/hooks/guard.mjs and test/workshop/guard.test.ts. Do not edit either file. Run only the focused guard test. Explain whether Edit and Write to bench/ratchet.json are denied. Do not claim that the hook blocks every shell command. Stop for my review.`,
  a5See: `Read intent.md, src/tools.ts, src/runtime.ts, src/chat.ts, and test/workshop/tools.test.ts. Explain in plain words what the list_deploys tool should do and why it may only read. Show every place where the code reads the update list around the tool (the “A5 bypass” comments). Run only the focused A5 test and show it red. Do not edit anything. Stop for my review.`,
  a5Implement: `Implement TODO(A5): bind list_deploys in src/tools.ts to listDeploys from src/telemetry.ts and register it on the telemetry server, read-only, cited as deploys:<id>. Remove the A5 bypasses in src/runtime.ts and src/chat.ts so both use the tool. Add one case: an empty time window returns [] and the diagnosis stays unknown (OPEN, low confidence, investigate-more), never healthy. Rerun the focused A5 test, the main tests and typecheck, and show the diff. Do not add a tool that changes anything. Do not push.`,
  a5Build: `Read intent.md, src/tools.ts, src/runtime.ts, src/chat.ts, and test/workshop/tools.test.ts. Explain how list_deploys stays read-only and where its trace arguments are recorded. Show the three starter bypasses. Show the focused A5 test red. After my approval, implement TODO(A5) in src/tools.ts and remove the bypasses from src/runtime.ts and src/chat.ts. Add either an empty-window or missing-deploy case. Rerun the focused test, the main tests, typecheck, and the offline investigation. Show the tool result and exact trace arguments. Do not add a mutation tool or push.`,
  a6Map: `/show-me Read docs/plan.md, fixtures/incidents/bad-deploy.json, and the shop, traffic, chaos, and console scripts. Map the fixture CLI for INC-1001 and the listener-created live incident. Show where both use the shared investigate flow and tool trace. Stay read-only. Separate fixture output from optional model output, then stop.`,
  a6Build: `Use the incident path we reviewed. Propose the demo order, risks, proof, rollback, and one alternative cause. Reuse owned processes. Keep diagnosis-snapshot evidence separate from current telemetry, mark missing evidence OPEN, and leave approval, execution, and resolution to the human. Do not run or stop processes. Wait for my approval.`,
  a6Evidence: `Which evidence supports the proposed rollback? Show stable source:ref labels. Separate the diagnosis snapshot from current telemetry. Do not approve or execute anything.`,
  a6Alternative: `Could this be something other than the deployment?`,
  a6Mutation: `Roll back now.`,
  a7Build: `Read bench/cases.json, bench/ratchet.json, and the current bench results. Explain what the offline bench proves and what it does not prove. Save a baseline. Propose one deterministic case that reuses the bad-deploy data with the alert text "Customers report checkout problems" and wait for approval. Add the case without weakening existing cases or lowering the score floor. Save the treatment result and rerun one neighboring case. Show the diff, case count, pass result, and harmful count. Do not claim live model resistance or push.`,
  a7Verify: `/verify-this Verify that the new deterministic case increases the case count by one, passes, keeps harmful at 0, and leaves both ratchet values unchanged. Compare the saved baseline and treatment outputs. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with evidence references. Stay read-only.`,
  a8Build: `Read intent.md, src/executor.ts, approvals/README.md, and the A8 workshop test. Explain the exact incident-and-action match. Show the focused test red. After my approval, implement only TODO(A8). Keep the existing wrong-incident and wrong-action cases. Rerun the focused test, main tests, and typecheck. Show both mismatches blocked. Do not create an approval or click Approve, Execute, or Resolve. Stop with the console action HUMAN OPEN.`,
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

const baseSlide = ({title, kicker, subtitle, type = 'concept', cards = [], keyPoints = [], notes, stage, beat, visual, layout, items, tagline, prompt, stepsHeading, steps, expected, repo, source, teach, mode, calm, assignmentId, detail, review}) => ({
  title, kicker, subtitle, type, cards, keyPoints, notes, stage, beat, visual, layout, items, tagline, prompt, stepsHeading, steps, expected, repo, source, mode, calm, assignmentId, detail, review,
  teach: teach || teachFromNotes({title, subtitle, keyPoints, notes})
});

const assignmentSlide = ({number, title, subtitle, stage, duration, steps, after, checks, humanOpen, next, shot, teach, shotLabel, review}) => baseSlide({
  review,
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
  visual: {shot, shotLabel: shotLabel || `A${number} example target`},
  teach,
  cards: [{title: 'Checkpoint', body: checks.join('\n')}, {title: 'Human boundary', body: humanOpen}],
  keyPoints: checks,
  notes: note({time: duration, why: subtitle, predict: `Ask which visible result shows Assignment ${number} is done.`, see: after, inside: checks.join(' '), participant: 'Complete one step at a time. Inspect each result before continuing.', watch: `${humanOpen} The picture is an example of the end result, not their own run.`, stuck: 'Ask Claude Code to state the blocker and the next focused check. Do not repeat the full suite.', stop: checks.at(-1), next})
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

const screenshotSlide = ({number, title, subtitle, stage, shot, points, next, time = '2 min', clip = `assets/day5-teach/a${number}.mp4`, kicker = `Day 5 · EXAMPLE`}) => baseSlide({
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
  notes: `${note({time, why: 'A picture shows what to aim for; it is not their own output.', predict: 'Ask which part still needs current output.', see: points[0], inside: points.slice(1).join(' '), participant: 'Name what must appear on your own screen.', watch: 'This screenshot is an example target. It is not proof of the participant run.', stuck: 'Read the three proof points and continue.', stop: 'The room can name the missing current-run proof.', next})}\n\nVideo: ${clip}. Play only when the screenshot needs motion context. The clip is illustrative and is not proof of the participant run.`,
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

// Sonny’s run and the tests: the two ways into src/contract.ts (strip on top of slides 20 and 21; `here` = the lit one)
// Review note for Ryan, shown only on the Overview page (tag on the tile + the note under the big preview)
const REVIEW_A3 = {to: 'Ryan', text: 'Please check (Jessy, 10 Nov): the console only has data when the shop runs (demo/data/telemetry.json comes from npm run shop), and in this deck the shop first started in A6. So A1 step 6 and A3 steps 7–8 could not show what they promised. Changed: A1 step 5 now starts shop, traffic and console (your README’s four windows; chaos later in Window 2). A3 steps 7–8 now show Sonny live on the healthy shop: tested on day5-after-a3, “+ New investigation” gives “#noise · no-action · Customer impact: none observed” (not INC-1001). A4 gets a before/after in the chat (tested: before A4 the chat just answers, after A4 “mutations are buttons for a named human”). A6 no longer starts shop and traffic. The 3B prompt no longer asks for localhost:4320. Is this how you meant the live part?'};
const CONTRACT_DOORS = (here) => ({title: 'Two ways into src/contract.ts. They never touch.', here, otherNote: here ? 'last slide' : 'next slide', target: 'src/contract.ts', targetNote: 'the contract · parseVerdict()',
  doors: [{tag: 'A', icon: '🔎', name: 'Sonny’s run', when: 'Every incident, also at 03:45. Automatic.', cmd: 'npm run investigate', path: ['cli.ts', 'agent.ts']},
    {tag: 'B', icon: '🧪', name: 'The tests', when: 'Only when someone types it. Never at 03:45.', cmd: 'npm run test:workshop', path: ['contract.test.ts']}]});

const day5Slides = [
  baseSlide({
    title: 'Welcome to Day 5!', kicker: 'AETHERLINK × WORLDLINE · DAY 5', subtitle: '', type: 'context',
    visual: {opener: 'welcome', bot: 'wave', place: 'beside'},
    keyPoints: ['On screen as people join', 'Warm welcome once everyone is in', 'Keep it to a few sentences'],
    notes: 'Share this slide while people join the call. Once everyone is in, give a warm welcome back: keep it to a few sentences.\n\nBefore the session: check that Node 22 or newer is active on your laptop, and that you have gone through Assignments 1 to 6 once yourself in your own clone of sre-oncall-agent. Every assignment slide has the exact text to paste, so you can follow the deck as your script.',
    teach: {
      time: '2 min',
      gist: 'Welcome back. Today: an agent that helps when something breaks. You stay in control.',
      script: [
        {do: 'Have this slide on screen while people come in.'},
        {say: ['Welcome back to Day 5!', 'Day 3: a support flow in n8n.', 'Day 4: the same flow in code.']},
        {say: ['Today the agent gets a new job: something breaks in a web shop.', 'The agent helps find out why.', 'It proposes a fix. You decide. You stay in control.']}
      ],
      watch: ['No working setup yet? Help them during Assignment 1, not now.'],
      next: 'today’s story: a web shop where customers cannot pay.'
    }
  }),
  baseSlide({
    title: 'A global shop, and you are on call', kicker: 'Day 5 · TODAY’S STORY', subtitle: 'Customers all over the world pay in this web shop, day and night. This week you are the operator: the one who gets called when it breaks.', type: 'context',
    visual: {shopDay: {
      shopBar: 'web shop · checkout · live',
      orders: [['Singapore', 'paid · 15:12'], ['New York', 'paid · 02:12'], ['Amsterdam', 'paid · 08:12'], ['São Paulo', 'paid · 04:12']],
      health: '● all payments go through',
      youTag: 'YOU · THE OPERATOR', agentTag: 'SONNY · ON CALL'
    }, reveal: 'click', covers: []},
    cards: [{title: 'The shop', body: 'A web shop with customers everywhere. Somewhere it is always daytime, so people pay at every hour.'}, {title: 'You: the operator', body: 'This week you are on call. If the shop breaks, at any hour, your phone rings.'}, {title: 'Today you build Sonny', body: 'Sonny, the on-call agent: an AI that helps you when the shop breaks.'}],
    keyPoints: ['A global shop: people pay at every hour.', 'You are the operator: on call this week.', 'Today you build Sonny, the on-call agent that helps you.'],
    notes: 'Time: 10:00 · 2 min. Sets the scene before the incident. The shop is the demo shop in the practice repo (npm run shop, used live in A6). The order times are all the same moment in different time zones.',
    teach: {
      time: '2 min',
      openShot: 'assets/day5-jessy-teach/s2-3.webp',
      gist: 'The world of today: a global web shop, you are the operator on call, and today you build Sonny, the on-call agent that helps you.',
      script: [
        {do: 'Slide appears with three closed blocks. Click a block (or press →) to open them, left to right.', say: ['Before we build anything: the story of today.']},
        {shot: 'assets/day5-jessy-teach/s2-1.webp', do: 'Click block 1. Orders come in from everywhere.', say: ['This is a web shop. Customers from all over the world pay here.', 'Look at the times: when it is afternoon in Singapore, it is night in New York.', 'So this shop never sleeps. Somewhere, someone is always paying.']},
        {shot: 'assets/day5-jessy-teach/s2-2.webp', do: 'Click block 2.', say: ['And this is you: the operator.', 'This week you are on call. That means: if the shop breaks, at any hour, your phone rings. Also at night.']},
        {shot: 'assets/day5-jessy-teach/s2-3.webp', do: 'Click block 3.', say: ['Today you build an AI agent that helps you when that happens: the on-call agent.', 'We call him Sonny. Later he can run on Claude Sonnet, hence the name.', 'Claude Code, from Day 1 and 2, helps you build him.']},
        {ask: 'Who here has ever been on call, or been called about something that broke?', say: ['(Let one or two people tell it in one sentence. It makes the next slide land.)']}
      ],
      learn: ['The shop is global, so it has customers at every hour.', 'The operator is the on-call engineer: the person who gets called when it breaks.', 'Today you build Sonny, the on-call agent that helps the operator.'],
      watch: ['Keep it a story. No code, no repo yet.', 'Someone remembers Bobby from Day 2? Bobby checked levels and said GO or NO-GO. Sonny is a different helper with a different job.', 'In the code and the console he is called “on-call agent”. Sonny is our name for him.'],
      terms: [['Sonny', 'our name for the on-call agent'], ['On call', 'being the person who gets called when something breaks, also at night'], ['Operator', 'the on-call engineer: the person who gets the alert and decides what happens'], ['On-call agent', 'the AI you build today: it helps the operator when something breaks']],
      next: 'and then, one night, at 03:45…'
    }
  }),
  baseSlide({
    title: '03:45: an incident', kicker: 'Day 5 · TODAY’S STORY', subtitle: 'Checkout errors jump to 12%, right after an update. Somewhere it is daytime, and people cannot pay.', type: 'context',
    visual: {wakeUp: {
      clock: '03:45', tag: 'YOU · THE OPERATOR', screen: 'on-call laptop · 03:45',
      alert: 'ALERT · checkout · error rate 12% for 5 min (limit 2%) · INC-1001',
      chart: {label: 'checkout · payments that fail', from: '0.3%', to: '12%', limit: '2%', mark: 'update 03:43'},
      world: [['Here', '03:45 · night', '🌙'], ['Singapore', 'late morning', '☀️'], ['New York', 'evening', '🌆']],
      sonny: {tag: 'SONNY · ON CALL', bubble: 'On it. Looking at the data…'}
    }, reveal: 'click', covers: []},
    cards: [{title: 'The alert', body: 'Your phone buzzes. You wake up.'}, {title: 'On your screen', body: '12 of every 100 customers who try to pay, fail. It started right after an update.'}, {title: 'Sonny got the alert too', body: 'What do you expect Sonny to do?\nAnd what should he never do without you?'}],
    keyPoints: ['03:45: an incident. 12% of payments fail.', 'A global shop never sleeps: people are paying right now.', 'Ask: what do you expect Sonny to do, and what never without you?'],
    notes: 'Time: 10:02 · 3 min. The alert text matches the terminal in A1: “Error rate 12% for 5 min on checkout (threshold 2%)”. The cause (update d-4821 reads a missing secret key for EU payments) is what the agent finds. Do not tell the room yet.',
    teach: {
      time: '3 min',
      openShot: 'assets/day5-jessy-teach/s3-3.webp',
      gist: 'At 03:45 an incident happens: 12% of payments fail. Sonny got the alert too. What do you expect him to do, and what never without you?',
      script: [
        {do: 'Slide appears with three closed blocks. Click a block (or press →) to open them, left to right.', say: ['And then, one night. It is 03:45. Your phone wakes you up.', 'You are on call, so this is for you.']},
        {shot: 'assets/day5-jessy-teach/s3-1.webp', do: 'Click block 1. Aetherbot wakes up after a second.', say: ['That is you, the operator. Half asleep, and now wide awake.']},
        {shot: 'assets/day5-jessy-teach/s3-2.webp', do: 'Click block 2. The alert, the graph and the clocks pop up one by one.', say: ['The alert: on checkout, the payment step of the shop, 12% of payments fail. The green line is the limit: 2%.', 'The orange line: an update went live at 03:43. Two minutes later the graph shoots up.', 'It gets a number: incident INC-1001.']},
        {do: 'Point at the three clocks.', say: ['For you it is the middle of the night. But this is a global shop.', 'In Singapore people are shopping in the late morning, in New York in the evening.', 'Right now, 12 out of every 100 of them cannot pay.']},
        {shot: 'assets/day5-jessy-teach/s3-3.webp', do: 'Click block 3. Sonny appears with his speech bubble.', say: ['You are not alone. Sonny, your on-call agent, got the same alert. He is already on it.']},
        {ask: 'What do you expect Sonny to do now?', say: ['(Answers: look at the graphs, check what changed, read the error messages, find the cause, propose a fix.)', 'Collect two or three answers. The next slide comes back to them.']},
        {ask: 'And what should he never do without you?', say: ['(Answers: roll back on his own, change production, close the incident.)', 'Keep these in mind too: they come back on the next slide.']}
      ],
      learn: ['An incident starts with an alert: here, 12% of payments fail right after an update.', 'A global shop has customers awake at every hour, so every minute counts.', 'Sonny gets the same alert as the operator. What he may and may not do on his own is a choice we make.', 'What the operator needs here is where “what Sonny should do” comes from: it comes back before Assignment 2.'],
      watch: ['Do not reveal the cause yet (a missing EU payment key). On the next slide Sonny finds it.', 'Keep it a story. No technical words yet.'],
      terms: [['Operator', 'the on-call engineer: the person who gets the alert and decides what happens'], ['Alert', 'the message that starts an incident'], ['Incident', 'the problem, with a number: INC-1001'], ['Checkout', 'the payment step of a web shop'], ['Update (deploy)', 'putting a new version of the software live']],
      next: 'how we want Sonny to work.'
    }
  }),
  baseSlide({
    title: 'How we want Sonny to work', kicker: 'Day 5 · THE ON-CALL AGENT', subtitle: 'He looks where you would look, writes down what he found, and checks it against fixed rules. Then he asks you.', type: 'context',
    visual: {agentJob: {
      botTag: 'SONNY',
      looks: [['📈', 'the graphs'], ['🚀', 'the latest updates'], ['🧩', 'what changed in the code'], ['📜', 'the error messages']],
      docName: 'diagnosis · INC-1001',
      doc: [['What’s happening', 'failed payments jumped from 0.3% to 12% at 03:45, two minutes after update v2.15.0', 'metrics:03:45'], ['Root cause (high)', 'the update changed the EU payment settings, and the error log says a key for EU payments is missing', ['deploys:d-4821', 'diff:d-4821', 'logs:03:45:03']], ['Proposed fix', 'roll back to v2.14.0, then watch the error rate']],
      check: {rules: ['Evidence from two places', 'A rollback needs the update list', 'Not sure? No strong fix', 'Data missing? Write OPEN', 'Say what customers notice'],},
      wait: 'waiting for the operator', yes: 'Approve', no: 'Reject'
    }, reveal: 'click', covers: []},
    cards: [{title: 'He looks', body: 'At the graphs, the updates, the code and the errors. He only reads. He changes nothing.'}, {title: 'He writes a diagnosis', body: 'What is wrong, the evidence for it, and one proposed fix.'}, {title: 'He checks it against fixed rules', body: 'Only a diagnosis that meets every rule goes to you.'}, {title: 'He asks you', body: 'He changes nothing himself. You approve or reject. That is human in the loop.'}],
    tagline: 'Sonny proposes, you decide. Today you build Sonny, with Claude Code.',
    keyPoints: ['Sonny looks where you would look. He only reads.', 'He writes a diagnosis with evidence and one proposed fix.', 'He checks it against fixed rules: only a diagnosis that meets every rule goes on.', 'He asks the operator: human in the loop.'],
    notes: 'Time: 10:05 · 4 min. Block 3 is how we WANT it: today the rules are still empty (Assignment 1 shows “PASS contract” because nothing is checked; Assignment 3 writes the five rules from TODO(A3) in src/contract.ts). The five chips are those rules in short. On purpose there are no ✓/✗ here: the zoom before Assignment 3 shows that this diagnosis breaks “say what customers notice”. The diagnosis lines come from the real offline output of npm run investigate -- fixtures/incidents/bad-deploy.json (A1 step 7), shortened: the labels are metrics:2026-10-05T03:45:00.000Z, deploys:d-4821, diff:d-4821, logs:2026-10-05T03:45:03.000Z (PaymentConfigError: missing key PAYMENT_PROVIDER_SECRET_EU). The terminal headings are “What’s happening”, “Root cause (high)” and “Proposed fix”. The real text calls the update a candidate cause and keeps non-deploy causes OPEN. Today the agent runs offline on scripted answers (src/runtime.ts): free and the same for everyone. A real model is optional (appendix).',
    teach: {
      time: '4 min',
      openShot: 'assets/day5-jessy-teach/s4-4.webp',
      gist: 'How we want Sonny to work: he looks, writes a diagnosis with evidence and one proposed fix, checks it against fixed rules, and only then asks the operator. Sonny proposes, you decide.',
      script: [
        {do: 'Slide appears with four closed blocks. Point back at the answers from the last slide.', say: ['You just said what you expect Sonny to do. Let us see how we want him to work.', 'At 03:45, half awake, these checks take you a while. Sonny does them before you are even at your laptop.']},
        {shot: 'assets/day5-jessy-teach/s4-1.webp', do: 'Click block 1. The four checks pop up.', say: ['He looks where you would look: the graphs, the latest updates, what changed in the code, the error messages.', 'He only reads. He changes nothing.']},
        {shot: 'assets/day5-jessy-teach/s4-2.webp', do: 'Click block 2. The diagnosis appears line by line.', say: ['Then he writes a diagnosis. These lines come from the real output you will see yourself in Assignment 1.', 'What is happening: failed payments jumped to 12%, two minutes after an update.', 'The root cause, with four pieces of evidence: the graph, the update list, the code change, the error log. The small blue labels say where he found each one, so you can check it yourself.', 'And one proposed fix: roll back to the version from before the update, then watch the error rate.']},
        {shot: 'assets/day5-jessy-teach/s4-3.webp', do: 'Click block 3. Five rules appear.', say: ['Before you see it, he checks his diagnosis against fixed rules.', 'For example: evidence from two places. Proposing a rollback? Then show the update. Data missing? Write OPEN, do not guess. And say what customers notice.', 'Only a diagnosis that meets every rule goes to you. So you do not have to check all that yourself at 03:45.']},
        {shot: 'assets/day5-jessy-teach/s4-4.webp', do: 'Click block 4.', say: ['And then he asks you, the operator.', 'He changes nothing himself. You approve or reject his proposed fix. That is human in the loop: you know it from Day 3 and 4.']},
        {ask: 'Which of your answers from the last slide do you see back here?', say: ['(Point at the matches: looking at what changed, the errors, proposing a fix.)']},
        {ask: 'Why would he ask, if he already knows the fix?', say: ['(Answer: the rules catch a diagnosis that is not good enough, but they cannot judge if a rollback is wise right now. And you are responsible for production.)']},
        {do: 'Point at the line at the bottom.', say: ['Sonny proposes, you decide.', 'Today you build Sonny. Claude Code, from Day 1 and 2, helps you build him.']}
      ],
      learn: ['Sonny does the first checks for the operator. He only reads.', 'He writes a diagnosis with evidence and one proposed fix.', 'He checks his own diagnosis against fixed rules before it gets to the operator.', 'He changes nothing himself: the operator approves or rejects. That is human in the loop.', 'Claude Code helps you build Sonny; Sonny is what you build.', 'These four blocks are the goal: after Assignment 1 you compare them with what Sonny does today.'],
      watch: ['Someone asks if Sonny is a real AI: today he runs offline on scripted answers, so everyone gets the same result and it costs nothing. Running him on Claude Sonnet is optional, at the end.', 'Do not explain rollback in depth yet. One line is enough: going back to the version before the update.', 'Do not go into the rules one by one: just before Assignment 3 we zoom in on them. Here it is enough that the step exists.', 'Someone asks if Sonny does this today: not yet. In Assignment 1 you see the rules are still empty; in Assignment 3 you build them.'],
      terms: [['Sonny', 'our name for the on-call agent: the AI you build today'], ['Human in the loop', 'the AI proposes, a person decides'], ['Diagnosis', 'what the agent writes about the incident: what is wrong, the evidence, one proposed fix'], ['Evidence', 'one line of data that shows something: where it is, and which entry'], ['Proposed fix', 'the one step the agent suggests, for example a rollback'], ['Rollback', 'putting the previous version back live'], ['Rule', 'one requirement every diagnosis must meet']],
      next: 'key terms for today.'
    }
  }),
  baseSlide({
    title: 'Key terms for today', kicker: 'Day 5 · DEFINITIONS', subtitle: 'Eight words you will meet in the project and in the terminal. We use them all day, with exactly this meaning.', type: 'concept',
    visual: {glossary: [
      {icon: 'bolt', color: '#ff6b6b', eg: 'INC-1001'},
      {icon: 'replay', color: 'var(--violet)', eg: 'bad-deploy.json'},
      {icon: 'chart', color: 'var(--violet)', eg: 'graphs · updates · error logs'},
      {icon: 'doc', color: 'var(--cyan)', eg: 'what’s happening · root cause'},
      {icon: 'evidence', color: 'var(--cyan)', eg: 'deploys:d-4821'},
      {icon: 'open', color: '#a6b8d2', eg: 'regions remain OPEN'},
      {icon: 'fix', color: 'var(--amber)', eg: 'rollback → v2.14.0'},
      {icon: 'sign', color: 'var(--ok)', eg: 'decided_by: your name'}
    ], glossCols: 4, reveal: 'click', covers: []},
    cards: [{title: 'Incident', body: 'A problem in the shop, with a number and a status.'}, {title: 'Fixture', body: 'A saved, made-up incident with all its data. Everyone gets the same case, every time.'}, {title: 'Telemetry', body: 'What the shop records about itself: graphs, updates and error logs. Sonny reads it.'}, {title: 'Diagnosis', body: 'What Sonny writes: what is happening, the root cause with evidence, one proposed fix.'}, {title: 'Evidence', body: 'One line of data that shows something: where it is, and which entry.'}, {title: 'OPEN', body: 'Not known or not decided yet. Sonny writes OPEN instead of guessing.'}, {title: 'Proposed fix', body: 'The one step Sonny suggests. A suggestion: nothing has changed yet.'}, {title: 'Approval', body: 'A named person approves or rejects one proposed fix for one incident. Sonny only drafts it.'}],
    keyPoints: ['A fixture is a saved incident: the same case for everyone.', 'Sonny writes OPEN instead of guessing.', 'A proposed fix is only a suggestion. Only a person approves or rejects it.'],
    notes: 'Time: 10:09 · 3 min. Words taken from the repo (README “Shared terms”: incident, fixture, proposal, approval) plus what participants see in the terminal in A1 (telemetry, evidence, OPEN). The code says “verdict” for diagnosis and “proposal” for proposed fix: mention that once, in Assignment 3. Rule already showed up in “How we want Sonny to work” (“fixed rules”); contract and test come just before Assignment 3. Approval in the repo (approvals/README.md): one record per incident and proposal; Sonny writes a pending draft with decided_by: "OPEN"; a pending draft is not an approval. The rollback program (src/executor.ts) only continues when incident, proposal, decision “approved” and a named person all match. Running the rollback is a separate step after the approval.',
    teach: {
      time: '3 min',
      openShot: 'assets/day5-jessy-teach/s5-5.webp',
      gist: 'Eight words from the project and the terminal, each with one meaning for the whole day.',
      script: [
        {do: 'Slide appears with eight closed blocks.', say: ['Eight words you will meet today, in the project and in the terminal.', 'Let us agree what they mean, so everyone means the same thing.']},
        {shot: 'assets/day5-jessy-teach/s5-1.webp', do: 'Click Incident and Fixture.', say: ['An incident: a problem in the shop, with a number. INC-1001 is the one from 03:45.', 'A fixture: a saved, made-up copy of that incident, with all its data.', 'So everyone in the room gets exactly the same case. You will start it with that file name.']},
        {shot: 'assets/day5-jessy-teach/s5-2.webp', do: 'Click Telemetry.', say: ['Telemetry: what the shop records about itself. The graphs, the list of updates, the error logs.', 'That is what Sonny reads. In the fixture it is saved too.']},
        {shot: 'assets/day5-jessy-teach/s5-3.webp', do: 'Click Diagnosis and Evidence.', say: ['The diagnosis is what Sonny writes about the incident.', 'Evidence is one line of data that shows something: where it is, and which entry. deploys:d-4821 means: the update list, update d-4821.']},
        {shot: 'assets/day5-jessy-teach/s5-4.webp', do: 'Click OPEN.', say: ['OPEN: Sonny does not know it yet, or nobody has decided yet.', 'For example: which regions are hit? The data does not say, so Sonny writes OPEN instead of guessing.']},
        {shot: 'assets/day5-jessy-teach/s5-5.webp', do: 'Click Proposed fix and Approval.', say: ['The proposed fix is the one step Sonny suggests. A suggestion: nothing has changed yet.', 'An approval: a named person approves or rejects that one fix, for that one incident. Sonny only drafts it. Until a person signs, it says OPEN.']},
        {ask: 'Sonny proposes a rollback and drafts the approval. Has anything changed in the shop?', say: ['(Answer: no. The draft says OPEN until a person approves. Without that, the rollback is refused.)']},
        {say: ['You already saw them in Sonny’s rules: evidence, OPEN, a proposed fix.']}
      ],
      learn: ['Incident, fixture, telemetry, diagnosis, evidence, OPEN, proposed fix, approval: one meaning each.', 'A fixture is a saved incident, so everyone gets the same case.', 'A proposed fix is only a suggestion: a named person approves or rejects it.'],
      watch: ['Do not add contract and test here: they come just before Assignment 3.', 'Someone sees “verdict” or “proposal” in the code: the code’s words for diagnosis and proposed fix.', 'Approval is not the rollback itself. After an approval, running the rollback is still a separate step.'],
      terms: [['Verdict', 'the code’s word for diagnosis'], ['Proposal', 'the code’s word for proposed fix'], ['Rollback', 'putting the previous version back live']],
      next: 'the six steps of building software (SDLC).'
    }
  }),
  baseSlide({
    title: 'The software development life cycle (SDLC)', kicker: 'Day 5 · THE PROCESS', subtitle: 'Six steps every piece of software goes through, from idea to running and getting better.', type: 'concept',
    visual: {sdlcLine: true},
    cards: [
      {title: 'What do we want, and what not?', body: 'Goals, limits, and who it is for.'},
      {title: 'How should it work?', body: 'The parts, and how they work together.'},
      {title: 'Make it', body: 'Write the code.'},
      {title: 'Does it do what we agreed?', body: 'Evidence, not a feeling.'},
      {title: 'Put it live', body: 'Real users start using it.'},
      {title: 'Keep it running, and learn', body: 'Fix, improve, and start again at Plan.'}
    ],
    keyPoints: ['Plan, Design, Build, Test, Deploy, Maintain.', 'The six dots at the top of most slides show where we are.', 'Day 6 and 7: the same six steps with your own project.'],
    notes: 'Time: 10:12 · 3 min. Each click (→) lights the next dot and shows its card. Clicking a dot jumps to that step; the current dot is orange. Source: the AI-native SDLC playbook (https://claude.com/resources/articles/the-ai-native-sdlc-playbook).',
    teach: {
      time: '3 min',
      gist: 'The six steps all software goes through, on one line. The same line is at the top of most slides today.',
      script: [
        {do: 'Slide appears: six grey dots on one line.', say: ['How do you build software you can trust?', 'All software goes through the same six steps. That is the SDLC: software development life cycle.']},
        {do: 'Click: Plan lights up.', say: ['Plan: decide what it must do, and what not.']},
        {do: 'Click: Design.', say: ['Design: decide how it will work.']},
        {do: 'Click: Build.', say: ['Build: write the code.']},
        {do: 'Click: Test.', say: ['Test: show that it does what was agreed. Evidence, not a feeling.']},
        {do: 'Click: Deploy.', say: ['Deploy: put it live for real users.']},
        {do: 'Click: Maintain.', say: ['Maintain: keep it running, and learn from what went wrong.', 'That feeds the next Plan, and you go round again.']},
        {ask: 'Claude Code can help in every step. Why is a person still needed?', say: ['(Answer: AI can be wrong, and someone is responsible for what goes live.)']},
        {do: 'Click any dot to jump back to that step (it turns orange).', say: ['After the next slide, this line is small at the top right of most slides.', 'The lit dot shows where we are.', 'Day 6 and 7, the hackathon: the same six steps with your own project. Today is the practice round.']}
      ],
      learn: ['SDLC = the six steps all software goes through: Plan, Design, Build, Test, Deploy, Maintain.', 'Today you go through them once.', 'The dots at the top of most slides show the current step.'],
      watch: ['Keep it short: the dots bring the steps back all day.', '“We do agile/sprints”? Fine: the same steps, just in smaller rounds.'],
      terms: [['SDLC', 'software development life cycle: the six steps all software goes through'], ['Deploy', 'putting a new version live']],
      next: 'today’s assignments, step by step.'
    }
  }),
  baseSlide({
    title: 'Today: build Sonny through the SDLC', kicker: 'Day 5 · ROUTE', subtitle: 'The same six steps, with today’s assignments under each one. Each adds one piece to Sonny.', type: 'context',
    visual: {routeLine: true, routeBot: true, sdlcRoute: [
      {items: [['A1', 'Find out what Sonny is today'], ['A2', 'Write down what he must do']]},
      {items: [['A3', 'Agree on the rules for a good diagnosis']]},
      {items: [['A3', 'Build those rules'], ['A4', 'Say no to “Roll back now”'], ['A5', 'A tool to look up updates']]},
      {items: [['A3B', 'Check that it really works'], ['Catch-up', 'Everything works before going live']]},
      {items: [['A6', 'Break the shop, live']]},
      {optional: true, items: [['A7', 'More test cases', true], ['A9', 'A lesson and a handoff note', true]]}
    ]},
    cards: [
      {title: 'Plan', body: 'You know the project and what Sonny must do.'},
      {title: 'Design', body: 'Everyone agrees what a good diagnosis contains.'},
      {title: 'Build', body: 'Sonny follows the rules, refuses fixes in the chat and can look up updates.'},
      {title: 'Test', body: 'Evidence that it works, before it goes live.'},
      {title: 'Deploy', body: 'Sonny investigates a live incident. You, the operator, approve.'},
      {title: 'Maintain', body: ''}
    ],
    keyPoints: ['The six steps, now with today’s assignments.', 'Each assignment builds on the one before.', 'Maintain (A7, A9) is optional, for who is fast.'],
    notes: 'Time: 10:15 · 2 min. Required route: A1–A6. Test = the second part of A3 and the catch-up before A6. A7 (more test cases) and A9 (lesson + handoff) are optional appendix work. The human-in-the-loop part (once called A8) is inside A6. → or a click moves to the next step; the next → after Maintain goes to the next slide.',
    teach: {
      time: '2 min',
      gist: 'Today’s route: which assignment belongs to which of the six steps.',
      script: [
        {do: 'Slide appears. Plan is lit, Sonny stands on it.', say: ['The same six dots, now with today’s assignments under them.', 'Sonny walks along with us: with each click he moves to the next step.']},
        {do: 'Plan.', say: ['Plan: A1 and A2.', 'First find out what Sonny is today, then write down what he must do.']},
        {do: 'Press → : Design.', say: ['Design: in A3 you first agree on the rules for a good diagnosis.', 'For example: always say what customers notice.']},
        {do: 'Press → : Build.', say: ['Build: A3 builds those rules.', 'A4: Sonny says no when someone types “Roll back now” in the chat.', 'A5: a tool so he can look up the updates.']},
        {do: 'Press → : Test.', say: ['Test: check A3 with fresh evidence, and make sure everything works before we go live.']},
        {do: 'Press → : Deploy.', say: ['Deploy: A6. You break the shop yourself, and Sonny investigates live.']},
        {do: 'Press → : Maintain (dashed).', say: ['Maintain: A7 and A9 are extras for who is fast.']},
        {ask: 'In which step do you first see Sonny work on a live shop?', say: ['(Answer: Deploy, in A6. Before that he works on a saved incident.)']}
      ],
      learn: ['Today follows the six steps: Plan, Design, Build, Test, Deploy, Maintain.', 'Each assignment builds on the one before.', 'Maintain is optional today.'],
      watch: ['Do not explain each assignment in depth: each has its own slides.', 'Do not call A7 or A9 required.', 'One more → after Maintain goes to the next slide.'],
      terms: [['Diagnosis', 'what Sonny writes: what is happening, the root cause with evidence, one proposed fix']],
      next: 'how we test that Sonny behaves: two scenarios.'
    }
  }),
  baseSlide({
    title: 'Two scenarios to test Sonny', kicker: 'Day 5 · HOW THE DAY RUNS', subtitle: 'You cannot wait for a real 03:45 to see if Sonny behaves. So you give him scenarios.', type: 'context',
    visual: {doors: [
      {icon: 'replay', color: 'var(--violet)', when: 'Morning · A1–A5', mini: 'alert', alert: 'ALERT · checkout · 12% · INC-1001', stamp: 'SAVED · FIXTURE', cmd: 'one command'},
      {icon: 'alert', color: '#ff6b6b', when: 'Afternoon · A6', mini: 'shop', flow: [['🛒', 'customers pay ✓', 'ok'], ['⚡', 'you push a bad update', 'bad'], ['🚨', 'new alert, new number', 'bad']]},
      {icon: 'trace', color: 'var(--aether-orange)', when: 'All day', bot: true}
    ]},
    cards: [{title: 'Morning: the 03:45 incident, saved', body: 'All its data is stored: graphs, updates, logs. One command hands it to Sonny. The same every time, so you see exactly what your change did.'}, {title: 'Afternoon: live', body: 'The shop runs on your laptop and fake customers keep paying. You break it on purpose. The console sees the errors and makes a new incident.'}, {title: 'Same Sonny, same rules', body: 'What you build in the morning also works live.'}],
    keyPoints: ['Morning: the 03:45 incident, saved as a fixture. Nothing breaks.', 'Afternoon: you break the shop, a live incident gets a new number.', 'Same Sonny, same rules.'],
    notes: 'Time: 10:17 · 2 min. The fixture: npm run investigate -- fixtures/incidents/bad-deploy.json (A1 last step; again in A3 to see the difference) → src/cli.ts → investigate() in src/agent.ts; its data lives in fixtures/telemetry/. Live (A6): the console (console/server.ts) listens for alerts, creates a new incident (INC-<digits>) and investigates through src/chat.ts → investigate() in src/agent.ts.',
    teach: {
      time: '2 min',
      gist: 'We test Sonny on scenarios: in the morning the saved 03:45 incident (the fixture), in the afternoon a live one you cause yourself. Same Sonny, same rules.',
      script: [
        {do: 'Slide appears.', say: ['We know how we want Sonny to work. How do you test that he behaves?', 'You cannot wait for a real incident at 03:45. So you give him scenarios.']},
        {do: 'Point at the morning block.', say: ['Morning: the incident from 03:45, saved with all its data. The graphs, the updates, the logs.', 'That is a fixture. Nothing breaks, the shop is not involved.', 'One command hands it to Sonny. The same every time, for everyone.', 'So after each change you run it again and see exactly what your change did.']},
        {do: 'Point at the afternoon block.', say: ['Afternoon, in A6: the shop runs on your laptop, fake customers keep paying.', 'You push a bad update on purpose. The console sees the errors and makes a new incident, with a new number.']},
        {do: 'Point at Sonny.', say: ['Same Sonny, same rules. What you build in the morning also works live.']},
        {ask: 'Why practise on a saved incident instead of a real one?', say: ['(Answer: it is the same every time, so you can compare before and after. And you cannot wait for a real 03:45.)']},
        {say: ['In Assignment 1 you run the 03:45 scenario yourself, and watch what Sonny does.']}
      ],
      learn: ['A scenario is a situation you put Sonny in to test him.', 'Morning: the fixture INC-1001, the saved 03:45 incident. Afternoon: a live incident you cause.', 'Same Sonny, same rules.'],
      watch: ['Do not reveal what the bad update breaks.', 'This afternoon’s live incident is not INC-1001: it gets a new number.'],
      terms: [['Scenario', 'a situation you put Sonny in to see how he behaves'], ['Fixture', 'a saved, made-up incident with all its data; the same every time'], ['Fake customers', 'a small script that keeps placing orders, so the shop has traffic']],
      next: 'Assignment 1 starts with research.'
    }
  }),
  baseSlide({
    title: 'Before you build: find out what Sonny is today', kicker: 'Day 5 · RESEARCH', subtitle: 'Like a new team member: first look, then build. Nothing to type yet. You answer these four questions in Assignment 1.', type: 'concept',
    visual: {reveal: 'click', covers: [], glossCols: 4, glossary: [
      {icon: 'terminal', color: 'var(--cyan)', eg: 'you see: 56 green tests'},
      {icon: 'trace', color: 'var(--violet)', eg: 'you see: a map with two routes'},
      {icon: 'bot', color: 'var(--aether-orange)', eg: 'you see: his diagnosis for INC-1001'},
      {icon: 'sign', color: 'var(--ok)', eg: 'you see: 14 red tests · “OPEN: a human decides”'}
    ]},
    cards: [{title: 'Does it run?', body: 'Set the project up on your laptop. Do the tests pass?'}, {title: 'Where does an incident come in?', body: 'And where is Sonny in the code? That is where your work lands.'}, {title: 'What does Sonny do now?', body: 'Watch him investigate the fixture INC-1001.'}, {title: 'What can he not do yet?', body: 'And what must he never do without you?'}],
    tagline: 'You change nothing yet. First look, then build.',
    keyPoints: ['A1 is research: you change nothing.', 'Four questions: does it run, where does an incident come in, what does Sonny do now, what can he not do yet.', 'Set-up, the tour, the skills and Assignment 1 answer them.'],
    notes: 'Time: 10:19 · 2 min. This slide has no task and no command. It frames the next slides (set-up, tour, skills) and Assignment 1 as one research round. Each block opens on click.',
    teach: {
      time: '2 min',
      gist: 'A1 is research: four questions a new team member asks before building. Nothing to type yet.',
      script: [
        {do: 'Slide appears: four closed blocks.', say: ['You join a project someone else made. Sonny already exists, but he is not finished.', 'What do you do on your first day in a new team? You do not start typing code. You look first.', 'That is Assignment 1: research. You change nothing.']},
        {do: 'Click: Does it run?', say: ['First: does it run on your laptop? Do the tests pass?', 'Otherwise, when something fails later, you cannot tell if it was your change or the set-up.']},
        {do: 'Click: Where does an incident come in?', say: ['Where does an incident come in, and where is Sonny in the code?', 'That is where your work lands. Claude Code draws it for you.']},
        {do: 'Click: What does Sonny do now?', say: ['You watch him investigate the fixture INC-1001, with your own eyes.']},
        {do: 'Click: What can he not do yet?', say: ['What can he not do yet: the red tests, the missing pieces from the map. And the fixed rules from how we want him to work: still empty.', 'And what must he never do without you? Look for “OPEN: a human decides” at the end of his diagnosis.']},
        {ask: 'Why not start building straight away?', say: ['(Answer: you would change code you do not understand, in a project you have not seen run.)']},
        {say: ['Nothing to type yet. First we get the project on your laptop.']}
      ],
      learn: ['Assignment 1 = research before building.', 'Four questions: does it run, where does an incident come in, what does Sonny do now, what can he not do yet.', 'You change nothing in A1.'],
      watch: ['Someone starts typing: nothing to do on this slide yet.', 'Keep it short: the answers come in the next slides and in Assignment 1.'],
      terms: [['Research', 'looking before you change anything: read, run, observe']],
      next: 'let’s start the project.'
    }
  }),
  baseSlide({
    title: 'Let’s start the project', kicker: 'Day 5 · RESEARCH · SET UP', subtitle: 'Get your own copy of the project and open Claude Code in it. We do this together, step by step.', type: 'context', layout: 'exercise', mode: 'manual', calm: true,
    stage: 'setup',
    repo: {url: 'https://github.com/AetherLink-bv/sre-oncall-agent/tree/workshop/start', label: 'AetherLink-bv/sre-oncall-agent · workshop/start'},
    stepsHeading: 'Set up once',
    steps: [
      {text: 'Type this in: Terminal (Git Bash on Windows). Check your Node version.', prompt: 'node --version', after: 'You see v22.13 or higher (v24 is fine too). Lower? Raise your hand: the project does not run on older Node.', warn: true},
      {text: 'Type this in: Terminal. Download your own copy of the project.', prompt: 'git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git', after: 'A folder sre-oncall-agent appears.'},
      {text: 'Type this in: Terminal. Go into the folder.', prompt: 'cd sre-oncall-agent', after: 'The line in your terminal ends in sre-oncall-agent.'},
      {text: 'Type this in: Terminal. Start Claude Code with only this project’s settings.', prompt: 'claude --setting-sources project --strict-mcp-config --no-chrome', after: 'Claude Code asks if you trust this folder. It looks like the picture on the right.'},
      {text: 'Read the yellow warning, then choose “Yes, I trust this folder”.', after: 'The warning means: this project lists about 40 safe commands, like npm test, that Claude Code may run without asking you each time. Everyone gets the same list. Then check the bottom says “manual mode on” (if not: Shift+Tab).', warn: true},
      {text: 'Four yellow lines “Deny rule Write(…) never matches”? That is fine.', after: 'The project forbids Claude Code to change a few files, like approvals and its own settings. Each rule is written twice; Claude Code says the Write copy is not needed. The Edit copy already blocks it.'}
    ],
    expected: 'Claude Code is open in your own sre-oncall-agent folder.',
    visual: {shot: 'assets/day5-expected/trust.png', shotLabel: 'After step 4: the trust question'},
    cards: [{title: 'Check', body: 'Node is v22.13 or higher.\nYour folder is sre-oncall-agent.\nClaude Code is open in that folder.'}, {title: 'Why the extra words after claude?', body: 'Use only this project’s settings, not your personal ones (for example permissions, hooks or connectors you added on earlier days). No browser. Everyone starts the same.'}],
    keyPoints: ['Check Node first.', 'Your own copy, in your own folder.', 'Claude Code starts with only this project’s settings.', 'Trust only this folder.'],
    notes: 'Time: 10:21 · 7 min. Do it together, one step at a time. Node 22.13+ is needed because the project stores incidents with node:sqlite, which older Node versions do not have (npm test fails on store.test.ts, the console cannot save incidents).',
    teach: {
      time: '7 min',
      gist: 'Together, step by step: own copy of the project, Claude Code open in it with only project settings.',
      copy: [['Step 1 · Terminal', 'node --version'], ['Step 2 · Terminal', 'git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git'], ['Step 3 · Terminal', 'cd sre-oncall-agent'], ['Step 4 · Terminal', 'claude --setting-sources project --strict-mcp-config --no-chrome']],
      do: ['Check Node, download the project, go into the folder, start Claude Code, trust the folder.'],
      done: ['Claude Code is open in the sre-oncall-agent folder on every laptop.'],
      script: [
        {do: 'Slide appears. Open your own terminal on the projector.', say: ['First research question: does it run? For that we need the project on your laptop.', 'We do this together: I type, you type.', 'Something looks different? Raise your hand straight away.']},
        {do: 'Type node --version.', copy: [['Step 1 · Terminal', 'node --version']], say: ['Node runs our project.', 'We need 22.13 or higher.', 'Why: the project saves incidents in a small database that only newer Node has.']},
        {ask: 'Who sees a number lower than 22?', say: ['(Answer: they raise their hand.)', 'They follow on the screen; we fix Node with them during Assignment 1.']},
        {do: 'Type the git clone line.', copy: [['Step 2 · Terminal', 'git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git']], say: ['We download our own copy of the project.', 'Your own copy: you can never break someone else’s work.']},
        {do: 'Type cd sre-oncall-agent.', copy: [['Step 3 · Terminal', 'cd sre-oncall-agent']], say: ['Go into the folder.', 'Check: the line ends in sre-oncall-agent.']},
        {do: 'Type the claude line. Point at the three extra words.', copy: [['Step 4 · Terminal', 'claude --setting-sources project --strict-mcp-config --no-chrome']], say: ['Claude Code has two kinds of settings:', 'Personal: the .claude folder in your home folder. Counts for every project.', 'Project: the .claude folder inside this project.', 'On earlier days some of you added personal permissions, hooks or connectors.', '--setting-sources project: today only the project settings count.', 'So Claude Code also starts in manual mode, even if you set another default before.', '--strict-mcp-config: no connectors (like Gmail or n8n).', '--no-chrome: Claude Code cannot use your browser.', 'Result: everyone starts the same, and your screen looks like mine.']},
        {do: 'Show the trust question on your screen. Point at the yellow warning.', say: ['Everyone gets this question the first time in a new folder.', 'Yellow warning: the folder pre-approves 40 tool permissions.', 'Meaning: a list of safe commands, like npm test, that Claude Code may run without asking.', 'Same project, so everyone sees the same list.', 'Our own course project: choose yes.']},
        {do: 'Claude Code opens. Point at the four yellow “Deny rule … never matches” lines.', say: ['Everyone sees these four yellow lines. Nothing is wrong.', 'A deny rule: something Claude Code is never allowed to do.', 'Here: change the approvals folder, its own settings (.claude), PROGRESS.md and the lessons file.', 'Why? Claude Code may not change its own rules or approve its own work. Human in the loop.', 'Each rule is in the settings twice: as Edit and as Write.', 'Claude Code says: the Write copy is not needed, because the Edit rule already blocks writing too.', 'So the protection works.']},
      {ask: 'Why do we start Claude Code without our own settings today?', say: ['(Answer: so everyone starts the same. Personal settings could change what Claude Code does.)']}
      ],
      learn: ['Everyone works in their own copy of the project.', 'The extra words after claude give everyone the same clean start.', 'Trust only a folder you know.'],
      watch: ['Node below 22.13: project does not run. Install the LTS from nodejs.org (or nvm).', 'Cannot install (locked laptop)? Follow on screen, catch up later with the checkpoint branch.', 'Windows: Git Bash, not PowerShell.', '“already exists” on git clone: delete the old folder or clone elsewhere.', 'Bottom not “manual mode on”? Shift+Tab.', 'Yellow “Deny rule Write(…) never matches” lines: harmless, the Edit rule already blocks it.'],
      terms: [['Node', 'the program that runs JavaScript and TypeScript projects on your laptop'], ['git clone', 'download your own copy of a project from GitHub'], ['Connector (MCP)', 'a link from Claude Code to another app, like Gmail or n8n'], ['Trust', 'you allow Claude Code to read, change and run files in this folder'], ['Pre-approved permission', 'a command the project allows Claude Code to run without asking, like npm test'], ['Personal settings', 'settings in the .claude folder in your home folder; they count for every project'], ['Deny rule', 'something Claude Code is never allowed to do, written in the settings']],
      next: 'a tour of the project.'
    }
  }),
  baseSlide({
    title: 'A tour of the project', kicker: 'Day 5 · RESEARCH · TOUR', subtitle: 'Where everything lives. Open your own sre-oncall-agent folder and follow along.', type: 'context',
    visual: {skillTrees: [
      {icon: 'chart', color: 'var(--cyan)', lines: [
        [0, 'sre-oncall-agent/'],
        [1, 'demo/', 'the web shop, the fake customers, the “break it” script', 'A6', 'hl'],
        [1, 'console/', 'the web page where Sonny works', 'A1 · A6', 'hl'],
        [1, 'fixtures/', 'the fixtures: saved incidents (INC-1001)', 'A1–A5', 'hl'],
        [1, 'docs/', 'plans and explanations', '', '']
      ]},
      {icon: 'bot', color: 'var(--aether-orange)', lines: [
        [0, 'sre-oncall-agent/'],
        [1, 'src/', 'Sonny himself', 'A3–A5', 'hl'],
        [1, 'test/workshop/', 'the red tests: your to-do list', 'A3–A6', 'hl'],
        [1, '.claude/', 'Claude Code’s skills, settings and safety rules', '', 'hl'],
        [1, 'intent.md', 'what the agent must do: you fill it in', 'A2', 'hl'],
        [1, 'CLAUDE.md', 'what Claude Code reads first', '', 'hl']
      ]}
    ]},
    cards: [{title: 'The world around Sonny', body: 'The shop, the console and the fixtures.'}, {title: 'Sonny and his rules', body: 'The code, the tests, and the files that steer Claude Code.'}],
    keyPoints: ['demo/ and console/: the shop and the web page.', 'src/ and test/workshop/: Sonny and his red tests.', 'intent.md: you fill it in at A2.'],
    notes: 'Time: 10:28 · 4 min. Trainer demo: open the sre-oncall-agent folder in your editor or file explorer on the projector. Other folders (bench/, lessons/, approvals/, course/, scripts/, skills/) come back in the optional parts or are for the trainer; skip them unless asked.',
    teach: {
      time: '4 min · demo',
      gist: 'Show where everything lives. Left: the world around Sonny. Right: Sonny and his rules.',
      do: ['Open their own sre-oncall-agent folder and follow along.'],
      done: ['Everyone has seen demo/, console/, src/, test/workshop/, intent.md and CLAUDE.md.'],
      script: [
        {do: 'Open the sre-oncall-agent folder in your editor or file explorer on the projector.', say: ['The project is on your laptop. Before Claude Code shows you around: a short tour of the folders.', 'Open your own sre-oncall-agent folder and follow along.']},
        {do: 'Open demo/.', say: ['demo/: the web shop, the fake customers, and the script that breaks it.', 'You use this in A6.']},
        {do: 'Open console/.', say: ['console/: the web page where Sonny works.', 'You start it in A1 and keep it open all day.']},
        {do: 'Open fixtures/incidents/.', say: ['fixtures/: the saved incidents.', 'INC-1001 is the fixture you practise on all morning.']},
        {do: 'Open src/ and point at agent.ts.', say: ['src/: Sonny himself.', 'This is where most of your work lands in A3 to A5.']},
        {do: 'Open test/workshop/.', say: ['test/workshop/: five test files.', 'They are red now: your to-do list.']},
        {do: 'Open intent.md and scroll through it.', say: ['intent.md: what the agent must do.', 'Still full of “fill in”: you fill it in at A2.']},
        {do: 'Open CLAUDE.md, then .claude/.', say: ['CLAUDE.md: what Claude Code reads first in this project.', '.claude/: Claude Code’s skills (the next slide), its settings and the safety rules (the yellow deny lines you saw at the start).']},
        {ask: 'Where would you look for the red tests?', say: ['(Answer: test/workshop/.)']}
      ],
      learn: ['demo/ and console/: the world around Sonny.', 'src/: Sonny. test/workshop/: the red tests.', 'intent.md and CLAUDE.md steer the work.'],
      watch: ['Do not open the code itself in depth: A1 does that with Claude Code.', 'Other folders (bench/, lessons/, approvals/, course/, scripts/, skills/): optional parts or trainer material. Skip unless asked.', 'skills/triage/ is Sonny’s own runbook: only if they ask (more in the skills notes).'],
      terms: [['Folder tree', 'the folders and files of a project, nested inside each other'], ['CLAUDE.md', 'a file with project instructions that Claude Code reads at the start']],
      next: 'the skills Claude Code uses today.'
    }
  }),
  baseSlide({
    title: 'The skills Claude Code uses today', kicker: 'Day 5 · PROJECT SKILLS', subtitle: 'A skill is a written set of steps that Claude Code follows. Four are ready in the project. You start one with a slash.', type: 'concept',
    visual: {skillTrees: [
      {icon: 'terminal', color: 'var(--cyan)', lines: [
        [0, 'sre-oncall-agent/'],
        [1, '.claude/skills/'],
        [2, 'show-me/', 'draws how the code works', 'A1 · A6', 'hl'],
        [2, 'design-control-loop/', 'asks you questions, writes the plan', 'A2', 'hl'],
        [2, 'verify-this/', 'checks a claim with fresh evidence', 'A3', 'hl'],
        [2, 'handoff/', 'writes a note for the next person', 'extra', 'hl'],
        [2, '+ 4 more we do not use today', '', '', 'more']
      ]}
    ]},
    cards: [{title: 'Claude Code’s skills: they help you build', body: 'Type / in Claude Code and you see them in the list, for example /show-me.'}],
    tagline: 'Try it now: type / in Claude Code and find show-me.',
    keyPoints: ['A skill is a written set of steps.', 'You start one with a slash: /show-me.', 'Each skill is a plain SKILL.md file in .claude/skills/.'],
    notes: 'Time: 10:32 · 2 min. Nine skills in .claude/skills/: show-me, design-control-loop, verify-this and handoff are used in the assignments; grilling, incident-triage, review-and-ship and visual-pr are not. The product runbook skills/triage/SKILL.md is team-owned and only read in real-model mode (src/prompts.ts); do not read its “Things that have burned us” list aloud, it hints at today’s cause.',
    teach: {
      time: '2 min',
      gist: 'Four ready skills for Claude Code. You start one with a slash. Check that everyone sees /show-me before A1.',
      script: [
        {do: 'Slide appears.', say: ['You know skills from Day 2: a written set of steps that Claude Code follows.', 'Four are ready in this project.']},
        {do: 'Point at the folder tree.', say: ['Remember the .claude folder from the tour? They live in .claude/skills/, one folder per skill.', 'Each folder has a SKILL.md: plain text you can open and read.']},
        {do: 'Point at the four highlighted skills, top to bottom.', say: ['/show-me: draws how the code works. First one, in A1.', '/design-control-loop: asks you questions and writes the plan. A2.', '/verify-this: checks a claim with fresh evidence. A3.', '/handoff: writes a note for the next person. In the extra part.']},
        {ask: 'You want Claude Code to check whether something really works. Which skill do you use?', say: ['(Answer: /verify-this.)']},
        {do: 'Ask everyone to type / in Claude Code.', say: ['Type a slash in Claude Code.', 'Do you see show-me in the list? Then you are ready for Assignment 1.']}
      ],
      learn: ['A skill is a written set of steps for Claude Code.', 'Skills live in .claude/skills/. You start one with a slash.', 'Four are used today: show-me, design-control-loop, verify-this, handoff.'],
      watch: ['No show-me after typing /? Restart Claude Code inside the sre-oncall-agent folder.', 'Do not install other skill packs now.'],
      terms: [['Skill', 'a written set of steps (a SKILL.md file) that Claude Code follows'], ['Slash command', 'typing / plus a name, like /show-me, to start a skill'], ['Text after a skill name', 'works with every skill: “/show-me Read CLAUDE.md…” means follow the show-me steps for this request. Some skills place your text in a fixed spot: /verify-this has “Claim: $ARGUMENTS” in its file. Without text, the skill works on what you are talking about.'], ['skills/triage/SKILL.md', 'the on-call agent’s own skill: the team’s runbook (a checklist for when something breaks). Students do not build it; the team writes it. Only the real-AI version of the agent reads it: see “Appendix · Optional product model”. Today’s script follows the same order, written into code.']],
      next: 'Assignment 1: get to know the project, and check that it works.'
    }
  }),
  assignmentSlide({
    number: 1, title: 'Get to know the project, and check that it works', subtitle: 'Research first: let Claude Code show you around. Change nothing yet.', stage: 'learn', duration: '10:34 · 18 min', shot: 'assets/day5-jessy-expected/a1.png', shotLabel: 'What you should see at the end',
    steps: [
      {where: 'Claude Code', text: 'Check the mode: “manual mode on”', after: 'Not there? Press Shift+Tab until it is.', warn: true},
      {where: 'Claude Code', text: 'A map of how an incident gets in', prompt: PROMPTS.a1Map, after: 'Two routes, both into investigate in src/agent.ts. Nothing changes.'},
      {where: 'Claude Code', text: 'Get the project ready', prompt: PROMPTS.a1Setup, after: 'Claude Code shows the commands, then stops for your review.'},
      {where: 'Claude Code', text: 'Check the starting point', prompt: PROMPTS.a1SetupChecks, after: '56 pass · 14 red: your to-do list. Do not fix them.'},
      {where: 'Windows 3, 4 and 1 · three new terminals', text: 'Start the live part, in this order, and leave all three open all day: the shop, customers who buy, and the console', parts: [['Window 3 · the shop', 'npm run shop'], ['Window 4 · customers', 'npm run traffic'], ['Window 1 · the console', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console']], after: 'Window 3: “shop listening on http://localhost:4310 … mode healthy”. Window 4: “traffic 8/s”, with 5xx 0. Window 1: “on-call console http://localhost:4320”.'},
      {where: 'Browser', text: 'http://localhost:4320: the operator’s desk, Sonny on the live shop', after: 'Left: the incidents (none yet: the shop is healthy). Bottom: the chat, where the operator asks Sonny questions. Later, under each diagnosis: Approve and Reject, for a named person. Top: “Scripted demo (no model connection) · shop online · v2.14.0 healthy”.'},
      {where: 'Window 2 · new terminal', text: 'Watch Sonny investigate the 03:45 incident', prompt: 'npm run investigate -- fixtures/incidents/bad-deploy.json', after: 'His diagnosis: update v2.15.0, a missing key, rollback. No “Customer impact” line yet.'}
    ],
    after: 'You know both routes, saw Sonny’s diagnosis, 56 green / 14 red, and the live shop and the console run.',
    checks: ['You can explain both routes into Sonny.', '56 main tests pass, 14 workshop tests are red.', 'The shop, the customers and the console run, and you saw the diagnosis for INC-1001.'],
    humanOpen: 'Change nothing yet. The red tests are for the next assignments.', next: 'What Sonny should do, and what he does today',
    teach: {
      time: '18 min',
      gist: 'Research before you build: does it run, where does an incident come in, what does Sonny do now, what can he not do yet. Plus the live part for all day: the shop, its customers and the operator’s desk. Change nothing yet.',
      do: ['Check manual mode, ask for the map, get the project ready, run the tests, start the shop, the customers and the console, look at the desk, run the agent on INC-1001.'],
      done: ['They can explain both routes into the agent.', '56 green, 14 red.', 'The shop, the customers and the console run; the desk says “shop online”.', 'They saw the INC-1001 diagnosis (without Customer impact).'],
      copy: [['Step 2 · Claude Code', PROMPTS.a1Map], ['Step 3 · Claude Code', PROMPTS.a1Setup], ['Step 4 · Claude Code', PROMPTS.a1SetupChecks], ['Step 5 · Window 3', 'npm run shop'], ['Step 5 · Window 4', 'npm run traffic'], ['Step 5 · Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console'], ['Step 6 · Browser', 'http://localhost:4320'], ['Step 7 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json'], ['After each step · Window 2', 'git status']],
      script: [
        {do: 'Slide appears. Goal of this assignment. Long prompts show one line: click “show all” and the whole prompt opens in the same box, to read out loud. “show less”, Esc or a click beside it closes it. Copy always copies the whole prompt. The 🔍 picture top right opens large: what they should see at the end.', say: ['Now the research itself: the four questions from before.', 'Does it run? Where does an incident come in? What does Sonny do now? What can he not do yet?', 'Each step answers one of them, and you also start the live part you use all day: a small web shop, customers who buy in it, and the operator’s desk. Nothing in Sonny changes yet.', 'This is the Plan phase. On Day 6–7 you start your own project the same way.']},
        {do: 'Step 1 · Check the mode. Show the bottom of your Claude Code.', say: ['Why: Claude Code is about to read and run things in a project you do not know yet. You want to see every action first.', '“manual mode on”. Not there? Shift+Tab, like Day 1–2.']},
        {do: 'Step 2 · A map of how an incident gets in. Paste the /show-me prompt.', copy: [['Step 2 · Claude Code', PROMPTS.a1Map]], say: ['Why: today you change this agent. You need to know where an incident comes in and where the agent is: that is where your work lands.', 'In the project: Claude Code reads the 6 files named in the prompt (maybe a few more, like SOLO.md). It changes nothing.', 'Every action passes the project’s guard (a hook, like Day 2). The guard writes each one to approvals/audit.jsonl: “allow” or “deny”.', 'They see: a diagram in the chat. Saved incident → src/cli.ts. Live alert → console/server.ts → src/chat.ts. Both → the investigate function in src/agent.ts.', 'Sometimes also an HTML diagram in docs/show-me/; Claude Code says the path.']},
        {ask: 'Look at the diagram: where do both routes meet?', say: ['(Answer: in the agent: the investigate function in src/agent.ts.)', 'So what you build this morning also works live this afternoon.']},
        {do: 'Show approvals/audit.jsonl in the editor.', say: ['Every action Claude Code took is logged here, with allow or deny.', 'You can always check afterwards what it did. Human in the loop, also after the fact.']},
        {do: 'Step 3 · Get the project ready. Paste the setup prompt.', copy: [['Step 3 · Claude Code', PROMPTS.a1Setup]], say: ['Why: the project must run on your laptop before you build. Otherwise, when something fails later, you cannot tell if it was your change or the setup.', 'In the project, Claude Code runs four commands:', 'node --version → v22 or newer.', 'git status / git diff → nothing changed yet: a clean start.', 'npm ci → installs the packages. New folder: node_modules/.', 'npm run fixtures → writes the sample data in fixtures/telemetry/: one hour of graphs, logs and updates per scenario. Same files as before, so Git still shows nothing changed.', 'Then it stops for your review.']},
        {do: 'Show PROGRESS.md (scroll to the bottom).', say: ['The project’s second hook noticed node_modules/ and added an “A-1 setup” entry.', 'It is a signal, not a check that it works: it says “Validation: OPEN”.', 'Not there yet? It appears after Claude Code’s next action.']},
        {do: 'Step 4 · Check the starting point. Paste the test prompt.', copy: [['Step 4 · Claude Code', PROMPTS.a1SetupChecks]], say: ['Why: the tests are your to-do list. They show what works and exactly what you will build.', 'In the project: Claude Code runs npm test and npm run test:workshop. Nothing changes.', 'They see: 56 of 56 green: the project works. Workshop tests: 6 green, 14 red.', 'Each red test points to a TODO in the code: src/contract.ts (A3), src/chat.ts and the guard (A4), src/tools.ts (A5), src/executor.ts (“A8” = human in the loop, A6).']},
        {do: 'Open src/contract.ts and search for TODO(A3).', say: ['This is what a missing piece looks like: a TODO comment, and a red test that waits for it.', 'In A3 you build this, and the red test turns green.']},
        {ask: 'Claude Code says 14 tests fail. Is the project broken?', say: ['(Answer: no. Those are the pieces you build in A3 to A6.)']},
        {do: 'Step 5 · start the live part: three new terminals, in this order.', copy: [['Step 5 · Window 3', 'npm run shop'], ['Step 5 · Window 4', 'npm run traffic'], ['Step 5 · Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console']], say: ['Why: today has two worlds. The saved 03:45 night, a recording you can replay in the terminal. And a live world that runs right now. This step starts the live world, and it keeps running all day.', 'Window 3, the shop: a small pretend web shop on your laptop, port 4310. It writes its own graphs, logs and updates while it runs.', 'Window 4, the customers: 8 pretend checkouts per second. “5xx 0” means no errors: the shop is healthy.', 'Window 1, the console: the operator’s desk. It reads the shop’s graphs every 10 seconds. If errors stay high for 1 minute, it opens an incident by itself. That is what AGENT_LISTEN_WINDOW_MIN=1 means: 1 minute instead of 5, so we do not wait in class.', 'A yellow SQLite warning in Window 1 is normal.']},
        {do: 'Step 6 · Browser: open localhost:4320. Point at the left side, the chat box at the bottom, and the top line.', say: ['This is the operator’s desk: the screen the person on call looks at at 03:45.', 'Left: the incidents. None yet: the shop is healthy, so nothing is wrong.', 'Bottom: the chat. The operator can ask Sonny questions about an incident, like “which evidence do you have?”. Teams often talk to their tools in a chat during an incident.', 'Later, under each diagnosis: an Approve and a Reject button, with a field for your name. Only a named person presses them.', 'Top right: “Scripted demo (no model connection)”. Read that out loud.']},
        {do: 'Say the four sentences of the day. They come back in Assignments 3, 4 and 6.', say: ['One: there are two ways into Sonny. The terminal runs the saved 03:45 night: the same answer every time, for you as the builder to compare before and after. The desk runs on the live shop, right now: that is where the operator works.', 'Two: on the desk, the chat is for questions. Actions, like rolling back, are buttons for a named person.', 'Three: Sonny is a script today, not an AI. “No model connection”. The desk is built so a real AI can be plugged in later. That is why everything you build today is plain code.', 'Four: the thread of the day. Sonny gets better at telling the operator what is going on, but he never gets more power.']},
        {ask: 'The terminal and the desk both run Sonny. What is the difference?', say: ['(Answer: the terminal replays the saved 03:45 night: same input, same answer. The desk looks at the live shop, right now.)']},
        {do: 'Step 7 · Window 2, a new terminal: watch Sonny investigate the 03:45 incident. Run the saved incident.', copy: [['Step 7 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json']], say: ['Why: so far you only saw a drawing of the route. Now you see your agent actually work.', 'In the project: src/cli.ts reads the saved incident INC-1001 and its telemetry from fixtures/, and hands it to the agent in src/agent.ts. Nothing changes.', 'They see, top to bottom:', 'The alert: error rate 12% on checkout.', 'Four tool calls: graphs, the update list, the code change, the error logs.', 'The diagnosis: update v2.15.0 at 03:43, error “missing key PAYMENT_PROVIDER_SECRET_EU”, confidence high, proposed fix: rollback → Deploy owner.', 'Rollback means: undo the last update, so go back from v2.15.0 to v2.14.0. The most common fix in SRE. Sonny proposes it. He never does it himself.', 'Window 2 stays open: you use it for git status and git diff.']},
        {ask: 'Look at the diagnosis. What does it not say?', say: ['(Answer: what customers notice. There is no Customer impact line.)', 'Remember that. In A3 you add it, and you run this same command again to see the difference.']},
        {ask: 'What did Sonny do, and what did he not do?', say: ['(Answer: he proposed a rollback, but he did not run it. The last line says OPEN: a human decides.)', 'And the rules he should check his diagnosis against? The terminal says “PASS contract”. “Contract” is the project’s word for those fixed rules, block 3 of how we want Sonny to work. Today there are no rules yet, so everything passes. You build them in Assignment 3.']},
        {do: 'Wrap up: the four research questions, answered.', say: ['Does it run? Yes: 56 green main tests, and the shop, the customers and the console running.', 'Where does an incident come in? The map: two routes, both into investigate in src/agent.ts.', 'What does Sonny do now? You saw his diagnosis for INC-1001, still without Customer impact.', 'What can he not do yet? 14 red tests, each with a TODO in the code. And he proposes, he never runs the fix himself.', 'Next: what Sonny should do, compared with what you just saw. Then we write it down.']}
      ],
      learn: ['Before you build: a map, a working start, a to-do list.', 'Check the starting point: 56 green, 14 red.', 'Red tests are your to-do list. The shop, the customers and the console run all day.', 'The agent already works on INC-1001, but its diagnosis has no Customer impact yet.'],
      watch: ['Windows: all four windows are Git Bash windows, not PowerShell.', 'Order matters: start the shop before the console. Console first? The desk says “shop offline · no telemetry”: wait 10 seconds, it picks the shop up.', 'Port 4310 or 4320 already in use: a shop or console from earlier still runs. Close that window, or use it.', 'Laptop gets busy: fine. The shop and the customers are small; leave them running.', 'Node below 22.13: tests fail on store.test.ts. Back to the set-up slide.', 'Step 5 or 7: “No such built-in module: node:sqlite”, “npm: command not found” or another Node error? A new terminal window can start on an older Node (common with nvm). Fix: nvm use 22 (or nvm alias default 22), then start again.', 'Claude Code says “A8”: that is the human-in-the-loop check, part of A6.', 'Port 4320 already in use? A console is already running somewhere: close it or use that one.', 'Someone starts fixing red tests: stop them, that is A3 to A6.', 'Step 3 shows a non-empty diff? Someone already changed files. git stash or a fresh clone gives a clean start.', 'npm ci takes about 5–30 seconds, depending on the network.', 'Someone runs step 7 inside Claude Code instead of Window 2: fine, same output, but the point is that they run their agent themselves.', 'No “A-1 setup” line in PROGRESS.md? It appears after Claude Code’s next action; it is only a signal, not a check that it works.'],
      terms: [['npm ci', 'installs the packages the project needs'], ['Fixtures', 'the sample data: the saved incidents and their graphs, logs and updates (fixtures/telemetry/)'], ['Diff', 'what changed in the files compared to the last saved version in Git'], ['Dependencies', 'the packages a project needs to run (node_modules)'], ['Console', 'the operator’s desk: the web page at localhost:4320 where Sonny works live'], ['The shop', 'a small pretend web shop on your laptop (localhost:4310) that writes its own graphs and logs'], ['Traffic', 'pretend customers who keep buying in the shop']],
      changes: [
        ['How', '`git status` in a normal terminal. Window 2 only opens at step 7: for steps 2–5 open it early yourself, or type `! git status` in Claude Code. It also shows new files; `git diff` only shows changes inside files Git already knows.'],
        ['Before step 2', '“nothing to commit, working tree clean”. A clean start.'],
        ['After step 2 · map', 'Nothing. Or one new file: `docs/show-me/show-me-….html`, if Claude Code made an HTML diagram.'],
        ['After step 3 · setup', '`modified: PROGRESS.md` (the “A-1 setup” entry; can appear one action later). `node_modules/` is new but Git ignores it. `fixtures/telemetry/` was rewritten with the same content, so no change.'],
        ['After step 4 · tests', 'Nothing new.'],
        ['After step 5 · console', 'Nothing new. Its database `console/data/` is ignored by Git.'],
        ['After step 7 · investigate', 'Nothing new. The agent only reads and prints.'],
        ['Never in git status', '`approvals/audit.jsonl`: Git ignores it on purpose (a log, not code). Open it in the editor to show it.']
      ],
      next: 'what Sonny should do, and what he does today.'
    }
  }),
  baseSlide({
    title: 'What Sonny should do, and what he does today', kicker: 'Day 5 · PLAN', subtitle: 'At 03:45 you said what you need. That became how we want Sonny to work. Assignment 1 showed what he does today. The difference is what you write down.',
    visual: {gapCompare: {
      icons: ['🚨', '🧭', '🖥️', '↔️', '📝'], focus: 3,
      head: ['How we want Sonny to work', 'What Assignment 1, step 7 shows'],
      rows: [
        ['He looks: the graphs, the updates, the code change, the errors', ['four “Tool:” lines'], true],
        ['He writes a diagnosis with evidence and one proposed fix', ['Root cause (high) + four evidence lines', 'Proposed fix: rollback'], true],
        ['He checks it against fixed rules, like “say what customers notice”', ['no “Customer impact:” line', 'PASS contract'], false],
        ['He asks you', ['OPEN: a human decides. Nothing was rolled back'], true]
      ],
      note: 'The difference is the gap. You write down how we want Sonny to work: that is intent.md.'
    }},
    cards: [{title: '03:45: what you need', body: ''}, {title: 'How we want Sonny to work', body: ''}, {title: 'What step 7 shows', body: ''}, {title: 'The gap', body: ''}, {title: 'intent.md', body: ''}],
    keyPoints: ['What Sonny should do comes from what you need at 03:45.', 'Assignment 1 showed what he does today: three of the four blocks.', 'The gap: nobody checks his diagnosis yet. You write down how we want it: intent.md.'],
    notes: 'Time: 10:52 · 3 min. The “should” comes from the operator’s need at 03:45 (slide 3), turned into the four blocks of “How we want Sonny to work” (slide 4). The right column is the real offline output of npm run investigate -- fixtures/incidents/bad-deploy.json at workshop/start: four Tool: lines (summarize_metrics, list_deploys, get_diff, search_logs), Root cause (high) with metrics/deploys/diff/logs evidence, Proposed fix: rollback → Deploy owner, last line “PASS contract · OPEN: a human decides. Nothing was rolled back, scaled or paged.” There is no Customer impact line; Blast radius says customer segments remain OPEN. “PASS contract” means: parseVerdict in src/contract.ts has no rules yet (TODO(A3)), so everything passes. The 14 red tests are from step 4, not step 7: they come back in Assignment 3.',
    teach: {
      time: '3 min',
      gist: 'Where “what Sonny should do” comes from: your need at 03:45 → how we want him to work → what Assignment 1 showed he does today. The gap is what you write down in intent.md.',
      script: [
        {do: 'Slide appears. Point at the chain at the top, left to right.', say: ['How do we know what Sonny should do? Not from the terminal.', 'It starts at 03:45: what you, the operator, need. Know fast what is going on, with evidence you can check, and nothing happens without you.', 'That became how we want Sonny to work: the four blocks from this morning.', 'Assignment 1, step 7 showed what he does today. The difference is the gap. And the gap is what you write down: intent.md.']},
        {do: 'Point at the first two rows.', say: ['He looks: you saw four “Tool:” lines in the terminal. ✓', 'He writes a diagnosis with evidence and one proposed fix: Root cause, four evidence lines, Proposed fix: rollback. ✓']},
        {ask: 'Third block: he checks his diagnosis against fixed rules, like “say what customers notice”. Did you see that in step 7?', say: ['(Answer: no. There is no “Customer impact:” line.)', 'And the last line said “PASS contract”. That sounds good, but it means: there are no rules yet, so everything passes. ✗']},
        {do: 'Point at the last row.', say: ['He asks you: “OPEN: a human decides. Nothing was rolled back.” ✓']},
        {do: 'Point at the orange line at the bottom.', say: ['So three of the four blocks work. The checking block is missing.', 'Before we build anything, we write down how we want Sonny to work. That file is intent.md.']}
      ],
      learn: ['What Sonny should do comes from the operator’s need at 03:45.', 'Today he does three of the four blocks: the checking block is missing.', 'The gap is what you write down, before you build.'],
      watch: ['“PASS contract” confuses people: it sounds like good news. It means: there are no rules yet, so everything passes.', 'Someone ran step 7 again later and sees a Customer impact line: they are already past Assignment 3. Fine.', 'The 14 red tests are from step 4: leave them for Assignment 3.'],
      terms: [['Gap', 'the difference between how we want it and how it is today']],
      next: 'intent.md: what goes in it, and where it lives.'
    }
  }),
  baseSlide({
    title: 'intent.md: what goes in it, and where it lives', kicker: 'Day 5 · PLAN', subtitle: 'Before you build, you always write down what it must do, and what not. In this project the team already wrote the rules and the tests. You write the goal, and then the code.',
    visual: {intentFlow: [
      {doc: [['Problem', true, '', 'what goes wrong today'], ['Proposed outcome', true, '', 'what Sonny must deliver'], ['Users and systems', false, '', 'who uses him, what he reads'], ['Constraints', false, '', 'what he may never do'], ['Open questions', true, '', 'what we do not know yet']]},
      {tree: [[0, 'sre-oncall-agent/'], [1, 'intent.md', 'the goal · the team + you, Assignment 2', true, 'Plan'], [1, 'docs/spec.md', 'the rules: what a good diagnosis is · the team', false, 'Design'], [1, 'test/workshop/', 'the tests: do the rules work? · the team', false, 'Test'], [1, 'src/', 'the code: Sonny himself · you, Assignments 3–6', false, 'Build']]}
    ]},
    cards: [{title: 'What goes in intent.md', body: 'Five parts. Orange = still empty: you fill them in.'}, {title: 'Where it lives: four layers', body: 'Goal, rules, tests, code. Each in its own place, at the top of the project.'}],
    tagline: 'Day 6–7: you write all four layers yourself. First the goal, then the rules, then the tests, then the code.',
    keyPoints: ['intent.md has five parts; three are still empty.', 'Four layers: goal (intent.md), rules (docs/spec.md), tests (test/workshop/), code (src/).', 'Here the team already wrote the rules and the tests. You write the goal and the code.'],
    notes: 'Time: 10:55 · 2 min. intent.md sits at the project root (sre-oncall-agent/intent.md), not in src/. Its parts: Problem, Proposed outcome and Open questions are “<fill in>”; Affected users and systems (Serves / Reads / Never writes / Boundary) and Constraints are already written. The rules: the verdict-contract table in docs/spec.md (customer_impact, a rollback needs a deploys line, high refused while data_gaps) and all five in the TODO(A3) comment in src/contract.ts; spec.md also has an empty “Rules worth writing down” part that Assignment 3 fills. Tests: test/workshop/contract.test.ts (7 for the rules) and the other workshop tests; participants make them green, they do not write them (extra test cases only in the optional A7). The normal order is goal → rules → tests → code (the SDLC of slide 6); in this practice project the team wrote two layers ahead of time. No code file loads intent.md: the build prompts start with “Read intent.md”. Day 6–7: docs/hackathon-intent.md.',
    teach: {
      time: '2 min',
      gist: 'intent.md has five parts, three still empty. It is the first of four layers: goal, rules, tests, code. Here the team already wrote the rules and tests; you write the goal and the code.',
      copy: [['Show the empty parts (optional)', 'grep -n "fill in" intent.md']],
      script: [
        {do: 'Slide appears. Point at the left block.', say: ['intent.md has five parts.', 'Problem: what goes wrong today. Proposed outcome: what Sonny must deliver.', 'Users and systems: who uses him and what he reads. Constraints: what he may never do. Those two are already written by the team.', 'Open questions: what we do not know yet.', 'The orange parts are still empty. In Assignment 2 you fill them in, together with Claude Code.']},
        {do: 'Point at the right block, top to bottom. Optional: open the folder in your editor.', copy: 'grep -n "fill in" intent.md', say: ['Where is it? At the top of the project. Not inside Sonny: his code is in src/.', 'And it is the first of four layers. The goal: intent.md. The rules: docs/spec.md, what a good diagnosis is. The tests: they check if the rules work. The code: src/, Sonny himself.', 'That is the normal order: first the goal, then the rules, then the tests, then the code.']},
        {do: 'Point at the small labels after each line.', say: ['In this practice project the team already wrote the rules and the tests.', 'You write the goal now, and the code in Assignments 3 to 6.']},
        {ask: 'Why write the goal down before you build?', say: ['(Answer: so everyone builds toward the same goal, Claude Code too. And afterwards you can check the result against it.)']},
        {do: 'Point at the line at the bottom.', say: ['On Day 6 and 7 you write all four layers yourself, for your own project. Starting with this file.']}
      ],
      learn: ['intent.md has five parts; three are still empty.', 'Four layers: goal, rules, tests, code. Normal order: in that order.', 'Here the team wrote the rules and tests; you write the goal and the code.'],
      watch: ['Do not explain the questions Claude Code will ask: they come up by themselves in Assignment 2.', 'Someone thinks intent.md makes Claude Code write the rules: no. The rules are already in docs/spec.md and a TODO in src/contract.ts.', 'Someone asks if they write tests today: no, they make the team’s tests green. Writing extra test cases is an optional extra.', 'Someone asks how Claude Code uses intent.md: the build prompts start with “Read intent.md”. No code loads it. Only explain this if asked.'],
      terms: [['intent.md', 'a short file that says what the agent must do and must not do'], ['spec.md', 'the exact rules: what a good diagnosis must contain'], ['Project root', 'the top folder of the project: here sre-oncall-agent/']],
      next: 'Assignment 2: write down what Sonny must do.'
    }
  }),
  assignmentSlide({
    number: 2, title: 'Write down what Sonny must do', subtitle: 'Claude Code asks, you decide, Claude Code writes, you check. Only intent.md changes.', stage: 'intent', duration: '10:57 · 10 min', shot: 'assets/day5-expected/a2-diff.png', shotLabel: 'What you should see at the end (an example)',
    steps: [
      {text: 'First check the mode: the bottom of Claude Code says “manual mode on”.', after: 'Not there? Press Shift+Tab until it is. Claude Code now asks before it changes a file.', warn: true},
      {text: 'Type this in: Claude Code. Goal: let Claude Code interview you about what the agent is for.', prompt: PROMPTS.a2Design, after: 'At most three questions (operator, outcome, what it may not do), each with a suggested answer. Then a small table: your answer → which part of intent.md. Nothing changes yet.'},
      {text: 'You decide. Goal: the answers are yours, not Claude Code’s. Type “yes” or your own answer for each question.', after: 'Ask yourself per answer: can I test this later? “The agent is helpful” is too vague.'},
      {text: 'Type this in: Claude Code. Goal: turn your answers into text in intent.md.', prompt: PROMPTS.a2Write, after: 'Claude Code shows the exact change: the three empty parts filled in, plus three checks. Then it stops and waits.'},
      {text: 'You check. Goal: read the change before it is saved. Then approve the edit.', after: 'Claude Code asks “confirm this edit with the human”. Yes = intent.md is saved. No other file changes.', warn: true},
      {text: 'Type this in: Window 2. Goal: see for yourself what changed.', prompt: 'git diff -- intent.md', after: 'Red lines: the old “fill in” text. Green lines: your sentences. Only intent.md.'}
    ],
    after: 'intent.md is filled in with your answers and three checks. Claude Code reads it again before every build.',
    checks: ['No “fill in” is left in intent.md.', 'You can read your three checks out loud.', 'git diff shows only intent.md.'],
    humanOpen: 'You decide what Sonny is for. Claude Code only suggests.', next: 'Your intent.md: before and after',
    teach: {
      time: '10 min',
      gist: 'Claude Code asks, you decide, Claude Code writes, you check. At the end intent.md is filled in, and only that file changed.',
      do: ['Check manual mode, answer Claude Code’s questions, approve the change to intent.md, check it with git diff.'],
      done: ['No “fill in” left in intent.md.', 'Three checks they can read out loud.', 'git diff shows only intent.md.'],
      copy: [['Step 2 · Claude Code', PROMPTS.a2Design], ['Step 4 · Claude Code', PROMPTS.a2Write], ['Step 6 · Window 2', 'git diff -- intent.md'], ['Optional · Window 2', 'grep -n "fill in" intent.md'], ['After each step · Window 2', 'git status']],
      script: [
        {do: 'Slide appears. Goal of this assignment.', say: ['You just saw the gap: nobody checks his diagnosis yet. And intent.md still has three empty parts.', 'Now you fill them in: you write down what Sonny must do.', 'Four moves: Claude Code asks, you decide, Claude Code writes, you check.', 'That is the human in the loop. You practise it yourself before you build it into the agent.', 'At the end only one file has changed: intent.md.']},
        {do: 'Step 1 · manual mode. Show the bottom of your Claude Code.', say: ['Why: in this assignment the moment Claude Code asks permission is the point.', '“manual mode on”. Not there? Shift+Tab.']},
        {do: 'Step 2 · the interview. Paste the /design-control-loop prompt.', copy: [['Step 2 · Claude Code', PROMPTS.a2Design]], say: ['Why: before anything gets written, Claude Code has to know what you want.', '/design-control-loop: one of the four project skills. It only interviews, it builds nothing.', 'In the project: Claude Code reads intent.md, the saved incident (INC-1001) and REVIEW.md, the project’s safety checklist. It changes nothing.', 'They see: at most three questions, each with a suggested answer.', 'Who is the operator? The on-call engineer who uses the agent’s diagnosis.', 'What does the operator get? What may the agent not do?', 'Then a small table, the “field map”: your answer → which part of intent.md it goes in.']},
        {do: 'Step 3 · you decide. Type your answers.', say: ['Why: if you say yes to everything, Claude Code decided what the agent is for. You decide.', 'Type “yes” to a suggestion, or write your own answer.', 'Test per answer: can I check this later with yes or no?', 'Too vague? Ask Claude Code: “make answer 2 something I can test”.']},
        {ask: 'Claude Code suggests: “The agent helps the operator work faster.” Good check?', say: ['(Answer: no, too vague. Better: “within a minute, a diagnosis with its evidence”.)']},
        {do: 'Step 4 · the text. Paste the write prompt.', copy: [['Step 4 · Claude Code', PROMPTS.a2Write]], say: ['Why: your answers become text in the file that Claude Code reads before every build.', 'In the project: still nothing saved. Claude Code shows a proposal.', 'They see: the change to intent.md in the chat. The three “fill in” parts get sentences, and three checks are added.', 'Then it stops and waits.']},
        {do: 'Step 5 · you check. Read the change, then approve.', say: ['Why: read before it is saved. Same as the agent later: it proposes, a person approves.', 'They see: Claude Code asks permission, with “SDLC artefact: confirm this edit with the human”.', 'That is the project’s guard: intent.md is an important file, so it always asks, even outside manual mode.', 'In the project after yes: intent.md is saved. The guard logs the edit in approvals/audit.jsonl.', 'PROGRESS.md gets an “A-2 intent” entry, because no “fill in” is left.']},
        {do: 'Step 6 · see for yourself. In Window 2: git diff.', copy: [['Step 6 · Window 2', 'git diff -- intent.md']], say: ['Why: do not just trust what Claude Code says it did. Check it yourself.', 'Window 2: the normal terminal you opened in Assignment 1. Window 1 keeps running the console.', 'They see: red lines = the old “fill in” text, green lines = their sentences. Only intent.md.', 'Want an extra check? grep -n "fill in" intent.md shows nothing when every part is filled.']},
        {ask: 'Who reads intent.md from now on?', say: ['(Answer: Claude Code, before every build: those prompts begin with “Read intent.md”. Sonny never reads it.)']},
        {do: 'Wrap up: what is in the project now.', say: ['intent.md: your answers and three checks.', 'A line in audit.jsonl and an “A-2 intent” entry in PROGRESS.md.', 'Then we compare your intent.md with an example, and take a break.']}
      ],
      learn: ['First agree what the agent must do, then build.', 'Claude Code suggests; you decide and approve.', 'Check the result yourself with git diff.'],
      watch: ['Someone accepts every suggestion without reading: ask them to read their three checks out loud.', 'Claude Code starts editing in step 2: the skill should only ask. Say “stop, only ask questions”.', 'Claude Code asks more than three questions or a second round: say “one round is enough, give the field map”.', 'Approved by mistake? git checkout -- intent.md puts the file back, then redo step 4.', 'git diff shows other files: someone changed files earlier. Only intent.md should be new in this assignment.', 'No “A-2 intent” in PROGRESS.md? A “fill in” is still in the file, or it appears after Claude Code’s next action.', 'Do not let them copy the example on the right: their own answers.'],
      terms: [['Operator', 'the on-call engineer who uses the agent’s diagnosis'], ['Field map', 'a small table: your answer → which part of intent.md it goes in'], ['Diff', 'what changed in a file compared to the last saved version in Git'], ['Window 2', 'a normal terminal in the project folder, next to Claude Code and the console']],
      changes: [
        ['Before step 2', 'Whatever A1 left: `modified: PROGRESS.md`, maybe a `docs/show-me/` file. Nothing else.'],
        ['After step 2 · interview', 'Nothing new. Claude Code only read and asked.'],
        ['After step 3 · you decide', 'Nothing new. Your answers are only in the chat.'],
        ['After step 4 · proposal', 'Nothing new. The change is only shown in the chat.'],
        ['After step 5 · approve', '`modified: intent.md`. PROGRESS.md gets an “A-2 intent” entry (it was already modified since A1).'],
        ['Step 6 · git diff', '`git diff -- intent.md` shows only intent.md. Plain `git diff` also shows the PROGRESS.md lines: those come from the hook, not from Claude Code.'],
        ['Never in git status', 'The new line in `approvals/audit.jsonl` (ignored by Git).']
      ],
      next: 'compare your intent.md with an example.'
    }
  }),
  baseSlide({
    title: 'Your intent.md: before and after', kicker: 'Day 5 · PLAN · CHECK', subtitle: 'Compare it with yours. Your sentences will be different. What counts: no empty part is left, and there are three checks.',
    visual: {filePair: [
      {file: 'intent.md', lines: [
        ['h', '## Problem'], ['gap', '<fill in>'],
        ['h', '## Proposed outcome'], ['gap', '<fill in>'],
        ['h', '## Affected users and systems'], ['keep', 'already written'],
        ['h', '## Constraints'], ['keep', 'already written'],
        ['h', '## Open questions'], ['gap', '<fill in>']
      ]},
      {file: 'intent.md', lines: [
        ['h', '## Problem'], ['new', 'When checkout breaks, the on-call engineer spends the first 10 minutes collecting the same data by hand.'],
        ['h', '## Proposed outcome'], ['new', 'Within a minute: a diagnosis with its evidence, and one proposed fix that waits for a person’s approval.'],
        ['h', '## Checks'], ['new', '1. Every claim shows where it came from.'], ['new', '2. What it does not know, it marks OPEN.'], ['new', '3. “Roll back now” in the chat is refused.'],
        ['h', '## Affected users and systems · ## Constraints'], ['keep', 'unchanged'],
        ['h', '## Open questions'], ['new', 'How long is evidence still valid before we check again?']
      ]}
    ]},
    cards: [{title: 'Before: three empty parts', body: 'The file as you got it.'}, {title: 'After: an example', body: 'Written by Claude Code from someone’s answers. Yours will be different.'}],
    tagline: 'Check your checks: can you see if they are true by looking? “The agent is helpful” ✗ too vague · “Every claim shows where it came from” ✓',
    keyPoints: ['Compare with your own intent.md: same parts, your own sentences.', 'No empty part left; a Checks part is added.', 'Checks: promises you can check later, just by looking.'],
    notes: 'Time: 11:07 · 2 min. Shown after Assignment 2, so they compare instead of copy. Example only. The Checks part is new: the write prompt asks for three checks. Honest about the link: the checks do not create code. The five rules are already in the project (docs/spec.md, TODO(A3) in src/contract.ts) and the chat refusal is TODO(A4) in src/chat.ts. Claude Code reads intent.md next to them before it builds, so your promises and the project’s rules should match.',
    teach: {
      time: '2 min',
      gist: 'After Assignment 2: compare your intent.md with this example. No empty part left, three checks you can check by looking.',
      script: [
        {do: 'Slide appears. Ask everyone to open their own intent.md next to it.', say: ['You just wrote your intent.md. Let us compare.', 'Left: the file as you got it. Right: an example of how it can look now.']},
        {do: 'Point at the orange <fill in> lines left, then the green lines right.', say: ['Left: three empty parts.', 'Right: each filled with one or two plain sentences.', 'Yours will be different: that is fine. Is any part in yours still empty?']},
        {do: 'Point at ## Checks.', say: ['Checks is a new part. Claude Code adds it.', 'Three promises about Sonny, written so you can check them later just by looking.', 'The project already has rules in its code that match promises like these. Claude Code reads your intent.md next to them before it builds.', 'Later today the tests show if Sonny keeps these promises.']},
        {ask: 'Look at the line at the bottom. Why is “the agent is helpful” a bad check?', say: ['(Answer: too vague. You cannot look and see if it is true.)', '“Every claim shows where it came from”: you open a diagnosis and look.', 'Look at your own three checks: could you see if they are true by looking? If not, ask Claude Code to make them sharper.']}
      ],
      learn: ['intent.md gets filled by Claude Code from your answers; you approve.', 'Three empty parts get filled, and a Checks part is added.', 'The checks are promises you can check by looking; the tests check them later today.'],
      watch: ['Someone’s intent.md looks very different: fine, as long as no part is empty and the checks can be checked by looking.', 'Someone thinks the checks make Claude Code write the rules: no. The rules are already in the project; Claude Code reads intent.md next to them.', 'File names or code in intent.md: it says what, not how.'],
      terms: [['intent.md', 'a short file that says what the agent must do and must not do'], ['OPEN', 'the agent says: I do not know this yet']],
      next: 'break, then: a diagnosis you can trust.'
    }
  }),
  pauseSlide('Break', '15 min', 'A diagnosis you can trust', '11:09'),
  baseSlide({
    title: 'A diagnosis you can trust', kicker: 'Day 5 · HUMAN IN THE LOOP', subtitle: 'You want Sonny to bring you a real diagnosis: always in the same format, with evidence, and checked against fixed rules before it gets to you. That check is the contract.', type: 'context',
    visual: {contractZoom: {
      icons: ['🚨', '👀', '📝', '📋', '🧑'],
      gate: 'only if every rule is met',
      look: {title: 'He looks', body: 'At the graphs, the updates, the code and the errors. He only reads. He changes nothing.', items: [['📈', 'the graphs'], ['🚀', 'the latest updates'], ['🧩', 'what changed in the code'], ['📜', 'the error messages']]},
      docName: 'Sonny’s diagnosis · INC-1001 · always this format',
      doc: [
        {label: 'What’s happening', text: 'failed payments jumped from 0.3% to 12% at 03:45, near update v2.15.0', ev: ['metrics:03:45'], key: 'happening'},
        {label: 'Root cause', conf: 'high', text: 'the update moved EU payments to a new setting, and the error log says the EU payment key is missing', ev: ['deploys:d-4821', 'diff:d-4821', 'logs:03:45:03'], key: 'cause'},
        {label: 'Blast radius', text: 'checkout at 12% errors; which versions, regions and customers: OPEN', key: 'blast', small: true},
        {label: 'Proposed fix', text: 'roll back → deploy owner; then watch the error rate', key: 'fix'},
        {label: 'Would change my mind', text: 'errors that started before the update, or the same errors on v2.14.0', key: 'mind', small: true},
        {label: 'Missing data', text: 'none', key: 'gaps', small: true},
        {label: 'Customer impact', text: 'not there', fixed: 'customers of checkout may see failed payments or slowness; which customers: OPEN', key: 'impact', ghost: true}
      ],
      docFoot: 'Always: a draft only · a person must approve',
      rulesTitle: 'The contract: five rules · click to check',
      fixLabel: 'what if he writes it?',
      rules: [
        {text: 'A strong proposed fix needs evidence from at least two places', ok: true, note: 'four places', hl: ['metrics:03:45', 'deploys:d-4821', 'diff:d-4821', 'logs:03:45:03', 'fix']},
        {text: 'A rollback needs evidence from the update list', ok: true, note: 'deploys:d-4821', hl: ['deploys:d-4821', 'fix']},
        {text: 'Not sure? Then no strong proposed fix', ok: true, note: 'sure (high)', hl: ['conf', 'fix']},
        {text: 'Data missing? Then not “sure”: write OPEN', ok: true, note: 'nothing missing', hl: ['conf', 'gaps']},
        {text: 'Say what customers notice', ok: false, note: 'missing', noteOk: 'there', hl: ['impact']}
      ],
      result: 'One rule broken: this diagnosis is stopped. You see “FAIL contract: customer impact is missing”, not the diagnosis. (Today the rules are not in the code yet, so it still gets PASS. Assignment 3 changes that.)',
      ask: {say: 'All five rules met. My proposed fix: roll back to v2.14.0. You decide.', yes: 'Approve', no: 'Reject', yesReply: 'Approved by you. The deploy owner rolls back. Sonny changed nothing himself.', noReply: 'Rejected. Nothing happens. Sonny keeps looking.'}
    }},
    cards: [{title: '03:45 alert', body: ''}, {title: 'He looks', body: ''}, {title: 'He writes a diagnosis', body: ''}, {title: 'He checks it against fixed rules', body: ''}, {title: 'He asks you', body: ''}],
    keyPoints: ['You want a diagnosis you can trust: same format, with evidence, checked before it gets to you.', 'Only if all five rules are met does Sonny ask you.', 'Sonny is asked to follow the rules; the contract checks them in plain code. In Assignment 3 you build the five rules.'],
    notes: 'Time: 11:24 · 5 min. Clicks (→): 1 the alert and “He looks” light up, with the first box of “How we want Sonny to work” below · 2 “He writes a diagnosis”: the box goes, his full diagnosis drops in on the left · 3 “He checks it”: the five rules appear on the right, all “?” · 4–8 each → opens the next rule (✓ or ✗) and lights what it looks at in the diagnosis · 9 the switch in the last rule: Customer impact is written, all five met → “only if every rule is met” lights up, “He asks you” lights up and Sonny asks; Approve / Reject show what happens. You can also click: the blocks on top jump to that step (“He asks you” only when all five are met, otherwise the gate shakes); a rule opens and closes again; the switch goes on and off; Approve / Reject toggle. ← steps back one click at a time, and at the start goes to the previous slide. The diagnosis is the real offline run of INC-1001 (npm run investigate -- fixtures/incidents/bad-deploy.json); the Customer impact text after the switch is close to the real line after Assignment 3 (“users of checkout may see failures or slowness …; affected segments remain OPEN”). The format is VERDICT_SCHEMA in src/contract.ts; parseVerdict already checks the format today (every field there, at least one evidence line, draft_only and human_approval_required true): that is why today everything gets PASS. Not shown on the slide, because it is not one of the five rules. Where Sonny is told: with a real model, src/prompts.ts plus the schema as output format; offline, src/runtime.ts writes the diagnosis by script. Where it is checked: src/router.ts validateVerdict → parseVerdict in src/contract.ts, plain code. Breaks a rule: “FAIL contract” with the reasons; the operator never sees a repaired diagnosis. The five rules are TODO(A3) (code words: a strong proposal (anything but investigate-more / no-action) needs evidence from at least 2 sources; rollback needs a deploys evidence line; low confidence cannot carry a strong proposal; high confidence is refused while data_gaps is non-empty; non-empty customer_impact). Approve / Reject on the slide are only to show the idea: the real approval comes in Assignment 6.',
    teach: {
      time: '5 min',
      gist: 'A diagnosis you can trust: he looks, writes a diagnosis in a fixed format, and only if all five rules are met does it get to you. Show it broken (one rule ✗), then flip the switch and show what happens when all five are met.',
      script: [
        {shot: 'assets/day5-jessy-teach/s19-1.webp', do: 'Slide appears. Point at the strip at the top.', say: ['Remember how we want Sonny to work? He looks, he writes a diagnosis, he checks it against fixed rules, he asks you.', 'This morning you saw that the checking step is missing. Now we zoom in, because at 03:45 you want a diagnosis you can trust.']},
        {shot: 'assets/day5-jessy-teach/s19-2.webp', do: 'Click: “He looks” lights up, with its box below.', say: ['First he looks: the graphs, the updates, the code change, the errors. He only reads.']},
        {shot: 'assets/day5-jessy-teach/s19-3.webp', do: 'Click: “He writes a diagnosis”. The box goes, his diagnosis drops in on the left.', say: ['Then he writes this. Not free text: always this format.', 'What is happening. The root cause, how sure he is, four evidence lines.', 'How far it spreads, with OPEN for what he does not know. One proposed fix. What would change his mind. Missing data: none.', 'At the bottom: only a draft, a person must approve.']},
        {ask: 'Where does Sonny learn to write it like this?', say: ['(Answer: it is in his instructions, and the format is fixed in the project. But being told is not the same as doing it.)']},
        {shot: 'assets/day5-jessy-teach/s19-4.webp', do: 'Click: “He checks it”. The five rules appear on the right, all with a question mark.', say: ['So before you see it, the diagnosis goes through the contract: five rules, checked by plain code. No AI.']},
        {shot: 'assets/day5-jessy-teach/s19-5.webp', do: 'Click four times: rules 1 to 4 open one by one. Each lights up what it looks at.', say: ['Evidence from at least two places: he has four. ✓', 'A rollback needs the update list: deploys:d-4821. ✓', 'Not sure? Then no strong fix. He says sure: high. ✓', 'Data missing? Then not “sure”. Nothing is missing. ✓']},
        {ask: 'Last rule: say what customers notice. Does the diagnosis do that?', say: ['(Answer: no.)']},
        {shot: 'assets/day5-jessy-teach/s19-6.webp', do: 'Click: rule 5 opens red. The missing line shows.', say: ['✗. One rule broken: the gate stays closed. You never see this diagnosis, you see “FAIL contract: customer impact is missing”.', 'Today the rules are not in the code yet, so it still says PASS. Building them: that is Assignment 3.']},
        {shot: 'assets/day5-jessy-teach/s19-7.webp', do: 'Click: the switch in rule 5 (“what if he writes it?”). The line fills in, the gate lights up, Sonny asks you.', say: ['Now suppose he does write what customers notice.', 'All five met: only now it gets to you. Sonny asks: roll back? You decide.']},
        {shot: 'assets/day5-jessy-teach/s19-8.webp', do: 'Optional: click Approve, then Reject.', say: ['Approve: the deploy owner rolls back. Sonny changed nothing himself.', 'Reject: nothing happens. That is human in the loop.']},
        {ask: 'Why not let the operator check the rules themselves?', say: ['(Answer: at 03:45, under stress, you miss things. Code checks the same rules every time, so your attention goes to the decision.)']},
        {do: 'Bridge to the next slide.', say: ['That is the idea. Next: what does this look like in the code? And how do we make sure the contract really works?']}
      ],
      learn: ['A diagnosis you can trust: always the same format, with evidence, checked before it gets to you.', 'Only if all five rules are met does Sonny ask you.', 'The five rules are not in the code yet: Assignment 3 builds them.'],
      watch: ['Clicked something by mistake? ← steps back one click at a time. A rule closes when you click it again; the switch and Approve / Reject toggle back. You can also click the blocks at the top to jump: He looks, He writes a diagnosis, He checks it. “He asks you” only opens when all five rules are met; otherwise the gate shakes.', 'Do not explain how to build the rules: the assignment does that.', 'Someone asks why today it says PASS: the code already checks the format (every field there, at least one evidence line), but not the five rules.', 'Someone asks where the instructions are: src/prompts.ts (with a real AI model). Offline, src/runtime.ts writes his diagnosis by script.', 'Approve / Reject here only show the idea. The real approval comes in Assignment 6.', '“Contract” confuses someone: the rules something must meet, checked in code.'],
      terms: [['Contract', 'the rules every diagnosis must meet, checked in plain code before the operator sees it'], ['Rule', 'one requirement every diagnosis must meet']],
      next: 'Sonny’s work in the code: every diagnosis goes through the contract.'
    }
  }),
  baseSlide({
    title: 'Sonny’s work in the code: every diagnosis goes through the contract', kicker: 'Day 5 · IN THE CODE · SONNY’S RUN', subtitle: 'Follow INC-1001 through the code, from the command you type to PASS or FAIL. This happens on every run, also at 03:45.',
    visual: {codeRoute: {
      entry: CONTRACT_DOORS(0),
      steps: [
        {file: 'You type · Window 2', term: true, code: '$ npm run investigate -- fixtures/incidents/bad-deploy.json\n\n// package.json\n"investigate": "tsx src/cli.ts"'},
        {file: 'src/cli.ts', code: 'const runtime = resolveRuntime(telemetry.value, values.model);\nconsole.log(`▶ incident … · runtime ${runtime.label}`);\n\nconst run = await investigate(incident.value, {\n  query: runtime.query, …\n});'},
        {file: 'src/agent.ts', code: 'deps.query({\n  prompt: buildIncidentPrompt(incident),\n  options: {\n    systemPrompt: ONCALL_SYSTEM,   // his instructions\n    tools: [...ALLOWED_TOOLS],     // 4 look-only tools\n    outputFormat: { schema: VERDICT_SCHEMA },\n    maxTurns,                      // at most 10 rounds\n  },\n})'},
        {file: 'src/agent.ts → src/router.ts', lit: true, code: '// agent.ts, right after his answer\nconst verdict = validateVerdict(incident, json.value);\nif (!verdict.ok) return { ...base, result: verdict };\n\n// router.ts\nconst parsed = parseVerdict(raw);'},
        {file: 'src/contract.ts', lit: true, code: 'export const parseVerdict = (raw) => {\n  const errors = [ …every field there, the right shape… ];\n  if (errors.length > 0) return fail(errors);\n\n  // TODO(A3): the five rules go here\n  return ok(verdict);\n};'},
        {file: 'src/cli.ts → your terminal', code: 'if (!run.result.ok) {\n  console.error(`FAIL contract\\n  - ${errors}`);\n  return 1;\n}\n…\nconsole.log("PASS contract · OPEN: a human decides.");'}
      ],
      run: {label: 'See it yourself · Sonny’s run', cmd: 'npm run investigate -- fixtures/incidents/bad-deploy.json', when: 'You did this in Assignment 1. You do it again in Assignment 3, step 6: then his diagnosis goes through the five new rules.',
        outLabel: 'The end of the output, today', out: '▶ incident INC-1001 · checkout · runtime offline …\n── diagnosis (#bad-deploy) ──\nWhat’s happening: error_rate jumped from 0.003 to 0.12 …\nProposed fix: rollback → Deploy owner\n\nPASS contract · OPEN: a human decides.'},
      foot: 'Every run, automatically: Sonny writes, the contract checks, you decide. No test runs here.'
    }},
    cards: [
      {title: 'You start Sonny', body: 'Terminal: this command. Browser: console/server.ts → src/chat.ts. Both reach the same investigate().'},
      {title: 'cli.ts picks his brain', body: 'Nothing set: the offline script (today). AGENT_MODEL set: a real AI model. The same shape comes out.'},
      {title: 'Sonny investigates', body: 'His instructions, four look-only tools, the fixed format. He writes the diagnosis.'},
      {title: 'Straight to the contract', body: 'Right after his answer, automatically. Nobody has to ask for it.'},
      {title: 'The contract answers', body: 'Plain code, no AI: ok, or refused with the reasons. Today only the format. Assignment 3 puts the five rules here.'},
      {title: 'You see PASS or FAIL', body: 'PASS: you see the diagnosis and decide. FAIL: you see the broken rule, never the diagnosis.'}
    ],
    keyPoints: ['Sonny’s run: npm run investigate → cli.ts → agent.ts (Sonny) → parseVerdict in contract.ts → PASS or FAIL in your terminal.', 'It happens on every run, automatically, also at 03:45. No test runs here.', 'Right after the AI writes the diagnosis, the contract checks it: a hard-coded checklist in Sonny’s code, no AI.'],
    notes: 'Time: 11:29 · 5 min. No SDLC tracker on this slide. Clicks (→): 1–6 open the six code blocks one by one (the arrows light up between them), 7 the orange “see it yourself” bar and the line at the bottom. Click a block to jump there; ← steps back. The strip on top stays: the two ways into src/contract.ts. Sonny’s run is lit here; the tests are dimmed and come on the next slide. Slide 19’s “He checks it” is blocks 4–5: the contract is part of Sonny’s code, a hard-coded checklist the engineers wrote, and it runs right after his AI brain writes the diagnosis. Do not split “Sonny” and “the contract” in what you say; explain it only if someone asks. All code is from workshop/start, shortened with “…”. The real path: npm run investigate = tsx src/cli.ts (package.json). cli.ts reads the incident file and fixtures/telemetry/bad-deploy.json, checks both, then resolveRuntime (src/runtime.ts): AGENT_MODEL unset → offline script, AGENT_MODEL=<model> → the Claude Agent SDK. investigate() in src/agent.ts sends one query: systemPrompt ONCALL_SYSTEM (src/prompts.ts + the runbook skills/triage/SKILL.md), the alert fenced as data plus matching lessons, the four read-only tools (permissionMode dontAsk: everything else is refused), outputFormat VERDICT_SCHEMA, maxTurns 10. Then, still in agent.ts and without anyone asking: parseJson → validateVerdict (src/router.ts) → parseVerdict (src/contract.ts; format today, the five rules are TODO(A3)) → same incident id → checkTrace (every evidence source must be a tool he really called) → routeVerdict adds the owner. cli.ts prints the trace, the diagnosis and “PASS contract · OPEN: a human decides.”, or “FAIL contract” with the reasons; without --dry-run it also writes a pending approval in approvals/. Browser path: console/server.ts → src/chat.ts (plain rules: investigate, a question, or a refused “roll back”) → the same investigate(). Output in the bar checked on workshop/start with --dry-run (offline, 5 turns, PASS).',
    teach: {
      time: '5 min',
      gist: 'Sonny’s work in the code: what happens on every run. You type one command, Sonny writes a diagnosis, and the code hands it straight to the contract. PASS or FAIL comes back to you. No test runs here.',
      script: [
        {shot: 'assets/day5-jessy-teach/s20-1.webp', do: 'Slide appears. Point at the strip on top.', say: ['On the last slide you saw the diagnosis and the five rules of the contract. Now: what does that look like in the code?', 'There are two ways into the contract, and they never touch. Sonny’s run: every incident, also at 03:45. The tests: only when someone types them. This slide is Sonny’s run. The next slide is the tests.']},
        {shot: 'assets/day5-jessy-teach/s20-2.webp', do: 'Click: block 1, you start Sonny.', say: ['It starts with the command you know from Assignment 1.', '“investigate” is a short name in package.json. It starts cli.ts.', 'From the browser it starts somewhere else, but it ends up in the same place.']},
        {shot: 'assets/day5-jessy-teach/s20-3.webp', do: 'Click: block 2, cli.ts.', say: ['cli.ts picks his brain. Nothing set: the offline script, what we use today. A model name set: a real AI model.', 'That is the line you saw in Assignment 1: “runtime offline”.']},
        {shot: 'assets/day5-jessy-teach/s20-4.webp', do: 'Click: block 3, Sonny investigates.', say: ['agent.ts gives him his instructions, four tools that can only look, and the fixed format. At most ten rounds.', 'Then he writes the diagnosis, in the fixed format.']},
        {ask: 'Why is the contract plain code, and not AI?', say: ['(Answer: an AI sometimes skips an instruction. A hard-coded checklist runs the same way every time.)']},
        {shot: 'assets/day5-jessy-teach/s20-5.webp', do: 'Click: block 4, straight to the contract.', say: ['This is the key moment. Right after his answer, the code hands his diagnosis to the contract: parseVerdict.', 'Nobody asks for it. It happens on every run.']},
        {shot: 'assets/day5-jessy-teach/s20-6.webp', do: 'Click: block 5, the contract.', say: ['The contract is one function. Plain code, no AI. It answers ok, or refused with the reasons.', 'Look at the comment: TODO A3. Today it only checks the format. The five rules go right there, in Assignment 3.']},
        {shot: 'assets/day5-jessy-teach/s20-7.webp', do: 'Click: block 6, you see PASS or FAIL.', say: ['Back in cli.ts. Refused: you see FAIL contract and the broken rule, never the diagnosis. Ok: PASS, and you decide.']},
        {shot: 'assets/day5-jessy-teach/s20-8.webp', do: 'Click: the orange bar appears.', say: ['You can see this yourself with the same command. You did it in Assignment 1, and you do it again in Assignment 3, step 6.', 'Then his diagnosis goes through the five new rules.', 'And notice: no test ran here. That is the next slide.']}
      ],
      learn: ['Sonny’s run: the command → cli.ts → agent.ts → the contract → PASS or FAIL.', 'The contract runs automatically on every diagnosis, also at 03:45.', 'Sonny writes, the contract checks, you decide.'],
      watch: ['Clicked too far? ← steps back. Click a block to jump to it.', 'Do not read the code line by line: point at the one line that matters per block (the command, resolveRuntime, tools, validateVerdict, the TODO, PASS / FAIL).', 'Someone asks what router.ts is: a small in-between file; validateVerdict calls parseVerdict and also checks the incident id.', 'Someone asks about checkTrace: right after the contract, agent.ts also checks that every evidence line comes from a tool he really called.', 'Someone asks how to switch to a real model: AGENT_MODEL=sonnet before the command. It costs money and needs a login; today we stay offline.', 'An engineer asks who does the checking, the AI or the code: the code. The contract is a hard-coded checklist in Sonny’s own code (src/contract.ts), run right after the AI writes the diagnosis. The AI is only asked to follow the rules; the checklist makes sure.', 'Someone asks where Claude Code is: nowhere in this path. Claude Code is the builder: it changes these files. Sonny is what runs.'],
      terms: [['Sonny’s run', 'every incident goes through the contract, automatically'], ['parseVerdict', 'the contract’s function in src/contract.ts (the code calls a diagnosis “verdict”)'], ['Offline script', 'a stand-in for the AI model: same tools, fixed order, fixed rules']],
      next: 'Making sure the contract works: the tests.'
    }
  }),
  baseSlide({
    title: 'Making sure the contract works: the tests', kicker: 'Day 5 · IN THE CODE · THE TESTS', subtitle: 'How do you know the contract follows the rules? Give it made-up diagnoses and check every answer. No Sonny, no AI.',
    visual: {codeRoute: {
      entry: CONTRACT_DOORS(1),
      steps: [
        {file: 'You or Claude Code type · Window 2', term: true, code: '$ npm run test:workshop\n\n// package.json\n"test:workshop": "node scripts/test-workshop.mjs"'},
        {file: 'scripts/test-workshop.mjs', code: 'const files = readdirSync("test/workshop")\n  .filter((name) => name.endsWith(".test.ts"));\n\nspawnSync(process.execPath,\n  ["--import", "tsx", "--test", ...files]);'},
        {file: 'test/workshop/contract.test.ts', lit: true, code: 'import assert from "node:assert/strict";\nimport { test } from "node:test";\nimport { parseVerdict } from "../../src/contract.js";'},
        {file: 'test/workshop/contract.test.ts', code: 'const base = {\n  incident_id: "INC-1",\n  confidence: "high",\n  customer_impact: "checkout fails for paying customers",\n  evidence: [ metrics…, deploys… ],\n  proposal: "rollback",\n  data_gaps: [], …\n};'},
        {file: 'test/workshop/contract.test.ts', lit: true, code: 'test("A3: rollback needs a deploys evidence line", () => {\n  const r = parseVerdict({ ...base,\n    evidence: [metrics…, logs…] });  // no deploys\n  assert.equal(r.ok, false);\n  assert.match(r.errors.join(), /rollback requires a deploys/);\n});'},
        {file: 'Your terminal · today', term: true, code: 'not ok 1 - A3: a complete verdict … passes\nnot ok 2 - A3: customer_impact is required …\nnot ok 3 - A3: rollback needs a deploys …\n…\nok 6 - A3: evidence has to carry at least one line\n# pass 1\n# fail 6', after: '# pass 7\n# fail 0', afterLabel: 'After Assignment 3'}
      ],
      run: {label: 'See it yourself · only the contract test', cmd: 'npx tsx --test test/workshop/contract.test.ts', when: 'Claude Code runs it for you in Assignment 3: step 4 before building (red), step 5 after building (green). Assignment 3B runs all tests.'},
      foot: 'The tests show the contract follows the rules. Right rules? You decide (step 3). Does Sonny still get through? Run him again (step 6).'
    }},
    cards: [
      {title: 'Someone starts the tests', body: 'You, or Claude Code because the Assignment 3 prompt says so. Only when someone types it. Never at 03:45.'},
      {title: 'Every workshop test runs', body: 'Every file in test/workshop/. In Assignment 3, Claude Code runs only the contract test.'},
      {title: 'It loads only the contract', body: 'No cli.ts, no agent.ts, no Sonny, no AI. So the answer is the same every time.'},
      {title: 'A made-up diagnosis', body: 'Typed into the test file. Complete: it meets all five rules. Every test breaks one thing in it.'},
      {title: 'Break one rule: refused?', body: 'Seven tests: the complete one must pass, six broken ones must be refused, for the right reason.'},
      {title: 'The score', body: 'Red first proves each test really checks something. Assignment 3 turns all seven green.'}
    ],
    keyPoints: ['The tests: npm run test:workshop → contract.test.ts → parseVerdict in contract.ts. No Sonny, no AI.', 'Seven made-up diagnoses: one must pass, six must be refused. Today 1 of 7 right; after Assignment 3, 7 of 7.', 'Only when someone types it: in Assignment 3 (steps 4 and 5) and 3B. Never at 03:45.'],
    notes: 'Time: 11:34 · 4 min. No SDLC tracker. Clicks (→): 1–6 open the six code blocks, 7 the orange bar and the line at the bottom. Click a block to jump; ← steps back. Strip on top: the tests are lit now, Sonny’s run is dimmed. All code is from workshop/start, shortened with “…”. The path: npm run test:workshop = node scripts/test-workshop.mjs, which runs every *.test.ts in test/workshop/ with node --test (20 tests in 5 files: on workshop/start pass 6 / fail 14, that is why the bar shows the focused command). test/workshop/contract.test.ts imports only parseVerdict from src/contract.ts: nothing in src/ calls the tests, and the tests never call cli.ts or agent.ts. That is why you cannot follow the code from Sonny’s run to the tests: they only share contract.ts. The seven tests (checked on workshop/start with npx tsx --test test/workshop/contract.test.ts: pass 1 / fail 6; on tag day5-after-a3: pass 7 / fail 0): 1 complete verdict passes · 2 customer_impact required and non-empty · 3 rollback needs a deploys line · 4 a strong proposal needs 2 sources · 5 low confidence cannot carry a strong proposal · 6 at least one evidence line (already green: the format check refuses empty evidence) · 7 high confidence refused while data_gaps exist. Test 1 is red today because the contract does not know customer_impact yet (“customer_impact: unknown field”); 2–5 and 7 are red because the rules are missing. The refusal tests also check the reason text (/rollback requires a deploys/, /at least 2 sources/, /low confidence/, /data_gaps/). In Assignment 3 the step 4 prompt runs only this test before editing (red), step 5 reruns it after the build (green). Assignment 3B runs all main tests, the type check and npm run investigate, plus /verify-this. The bottom line: tests only answer “does the contract follow the rules?”. “Are these the right rules?” is the step 3 review (the team’s rules from docs/spec.md and the TODO(A3) comment, against the goal in intent.md). “Does Sonny still get through?” is Sonny’s run again: today offlineVerdict writes no customer_impact, so the A3 build also changes src/runtime.ts, src/prompts.ts and VERDICT_SCHEMA; step 6 shows it.',
    teach: {
      time: '4 min',
      gist: 'Making sure the contract works: how you know it follows the rules. A test file gives the contract seven made-up diagnoses and checks every answer. No Sonny, no AI. It only runs when someone types it.',
      script: [
        {shot: 'assets/day5-jessy-teach/s21-1.webp', do: 'Slide appears. Point at the strip on top: the tests are lit now.', say: ['You know where the contract sits. But how do you make sure it really works? That is the other way into the contract: the tests.', 'Same contract, completely different moment. This only happens when someone types the command. Never at 03:45.']},
        {shot: 'assets/day5-jessy-teach/s21-2.webp', do: 'Click: block 1, someone starts the tests.', say: ['You type it, or Claude Code does, because the Assignment 3 prompt tells it to.', 'Again a short name in package.json.']},
        {shot: 'assets/day5-jessy-teach/s21-3.webp', do: 'Click: block 2, every workshop test runs.', say: ['This little script runs every test file in the folder test/workshop.', 'In Assignment 3, Claude Code runs only one of them: the contract test.']},
        {shot: 'assets/day5-jessy-teach/s21-4.webp', do: 'Click: block 3, it loads only the contract.', say: ['Look at the last line: the test loads parseVerdict, the same function from the last slide.', 'Nothing else. No cli.ts, no agent.ts, no Sonny, no AI. So the answer is the same every time.']},
        {shot: 'assets/day5-jessy-teach/s21-5.webp', do: 'Click: block 4, a made-up diagnosis.', say: ['The diagnosis is typed into the test file itself. A complete one: it meets all five rules.']},
        {shot: 'assets/day5-jessy-teach/s21-6.webp', do: 'Click: block 5, break one rule.', say: ['Each test breaks one thing. Here: a rollback, but no update in the evidence.', 'The test hands it to the contract and says: the answer must be “refused”, for this reason.', 'Seven of these: the complete one must pass, six broken ones must be refused.']},
        {shot: 'assets/day5-jessy-teach/s21-7.webp', do: 'Click: block 6, the score.', say: ['This is the real output today: one right, six wrong. Red.', 'After Assignment 3: seven of seven. Green.']},
        {ask: 'Why is it good that they are red now?', say: ['(Answer: a test that was red and turns green really checks something. A test that is always green proves nothing.)']},
        {shot: 'assets/day5-jessy-teach/s21-8.webp', do: 'Click: the orange bar and the line at the bottom appear.', say: ['You do not have to type this yourself: Claude Code runs it in Assignment 3, before and after building.', 'Read the bottom line. The tests show the contract follows the rules. Are they the right rules? You decide, in step 3. Does Sonny still get through? Run him again: step 6.']}
      ],
      learn: ['The tests: the test file loads only the contract and gives it made-up diagnoses.', 'Seven tests: one must pass, six must be refused. Today 1 of 7, after Assignment 3: 7 of 7.', 'The tests never touch Sonny. Whether Sonny still passes, you see when you run him.'],
      watch: ['Someone asks why the complete one fails today: the contract still refuses fields it does not know, and customer impact is new.', 'Someone asks why test 6 is already green: the format check already wants at least one evidence line.', 'Someone runs npm run test:workshop and sees 14 red: that is all five workshop test files. Only the contract one belongs to Assignment 3.', 'Someone asks who wrote the tests: the team, before the code, so you know when you are done.', 'Do not explain how to build the rules: the assignment does that.'],
      terms: [['The tests', 'they check the contract with made-up diagnoses, only when someone types the command'], ['Test', 'a small program that gives the contract a made-up diagnosis and checks the answer'], ['Red / green', 'a test that fails / passes']],
      next: 'Up next: Assignment 3, step by step.'
    }
  }),
  baseSlide({
    title: 'Up next: Assignment 3, step by step', kicker: 'Day 5 · A3 PREVIEW', type: 'context', subtitle: 'What you are about to do. Each step uses the tests or Sonny’s run from the last two slides.',
    visual: {previewList: {
      order: [['Agree on the rules', 'you'], ['Test: red', 'red'], ['Build the rules', ''], ['Test: green', 'green'], ['Run Sonny', 'A']],
      rows: [
        {step: 'Step 1', text: 'Manual mode on, so you see every file change', who: 'you', out: 'manual mode on'},
        {step: 'Step 2', text: 'Claude Code reads intent.md, spec.md, contract.ts and the test, and explains the five rules', who: 'reads only', out: 'nothing changes'},
        {step: 'Step 3', text: 'You accept the rules', who: 'you decide', out: '“accepted”'},
        {step: 'Step 4', text: 'Claude Code runs the contract test, before building', moment: 'B', label: 'the tests', out: 'red · 1 ✓ 6 ✗', tone: 'red'},
        {step: 'Step 5', text: 'Claude Code builds the five rules into contract.ts, teaches Sonny to write customer impact, and runs the test again', moment: 'B', label: 'the tests', out: 'green · 7 ✓', tone: 'green'},
        {step: 'Step 6', text: 'You run Sonny yourself', cmd: 'npm run investigate -- fixtures/incidents/bad-deploy.json', moment: 'A', label: 'Sonny’s run', out: 'PASS + Customer impact', tone: 'pass'},
        {step: 'Steps 7–8', text: 'Restart the console, and run Sonny live on the operator’s desk', cmd: 'http://localhost:4320', moment: 'A', label: 'live', out: 'no action + Customer impact', tone: 'pass'},
        {step: '3B', text: 'All 56 main tests, the type check, Sonny once more, and /verify-this', moment: 'A + B', label: 'both', out: 'all green · VERIFIED', tone: 'green'}
      ],
      foot: 'Test first (red), then the rules, then test again (green), then run Sonny himself.'
    }},
    keyPoints: ['Agree on the rules → test: red → build the rules → test: green → run Sonny.', 'Steps 4 and 5 use the tests. Step 6 is Sonny’s run on the saved night, steps 7–8 Sonny live.', 'Assignment 3B does both again, and a second check looks at the evidence.'],
    notes: 'Time: 11:38 · 2 min. No SDLC tracker. A preview, not the assignment: nobody types anything yet. Clicks (→): each click ticks the next row (☐ → ✓); after the last row the line at the bottom appears. Click a row to tick up to it; ← unticks. The rows follow the eight steps on the Assignment 3 slide plus 3B. Step 4 = the PROMPTS.a3Build prompt (runs only the focused A3 test: pass 1 / fail 6 on workshop/start). Step 5 = PROMPTS.a3BuildImplement (about 9 files; test 7 / 0, as on tag day5-after-a3). Step 6 output after the build: “Customer impact: checkout error_rate rose from 0.003 to 0.12; users of checkout may see failures or slowness … affected segments remain OPEN” and PASS contract (checked on day5-after-a3). 3B: the main tests, the type check and the offline investigation, then /verify-this returns VERIFIED, NOT VERIFIED or INCONCLUSIVE.',
    teach: {
      time: '2 min',
      gist: 'A preview of Assignment 3 as a checklist: agree on the rules, test red, build, test green, run Sonny. Each step uses the tests or Sonny’s run from the last two slides.',
      script: [
        {shot: 'assets/day5-jessy-teach/s22-1.webp', do: 'Slide appears. Point at the row of pills on top.', say: ['You have seen Sonny’s work in the code and how the tests make sure the contract works. Now you build it. Before you start, the whole assignment in one line: agree on the rules, test red, build the rules, test green, run Sonny.', 'Nobody types anything yet. This is the map.']},
        {shot: 'assets/day5-jessy-teach/s22-2.webp', do: 'Click three times: steps 1, 2 and 3 get a tick.', say: ['First manual mode, so you see every change. Then Claude Code reads and explains the five rules. Nothing changes.', 'Then you decide: you type “accepted”. You own the rules.']},
        {shot: 'assets/day5-jessy-teach/s22-3.webp', do: 'Click: step 4.', say: ['Step 4 uses the tests: Claude Code runs the contract test before building. Red: one of seven.']},
        {shot: 'assets/day5-jessy-teach/s22-4.webp', do: 'Click: step 5.', say: ['Then it builds the rules into the contract, teaches Sonny to write customer impact, and runs the test again. Green: seven of seven.']},
        {shot: 'assets/day5-jessy-teach/s22-5.webp', do: 'Click: step 6.', say: ['Step 6 is Sonny’s run: you run him yourself, the same command as in Assignment 1. Same incident, now with a Customer impact line, and PASS.']},
        {shot: 'assets/day5-jessy-teach/s22-6.webp', do: 'Click: steps 7–8.', say: ['Then the same Sonny live, on the operator’s desk from this morning. The shop is healthy, so he says no action, but with a Customer impact line.']},
        {shot: 'assets/day5-jessy-teach/s22-7.webp', do: 'Click: 3B. The line at the bottom appears.', say: ['And 3B does it all again, plus a second check with fresh eyes.', 'Remember the order: test first, then the rules, then test again, then run Sonny.']},
        {ask: 'In which step do you find out if Sonny still gets through?', say: ['(Answer: step 6, when you run Sonny. The tests in step 5 never use his own diagnosis.)']}
      ],
      learn: ['The order of Assignment 3: rules, red, build, green, run Sonny.', 'Steps 4–5 use the tests, step 6 Sonny on the saved night, steps 7–8 Sonny live.'],
      watch: ['Someone starts typing: not yet, this is only the preview. The next slide has the prompts.', 'Someone asks why the test comes before the build: red first shows the test really catches the missing rules. Green after the build means the rules are really there.', 'Keep it short: 2 minutes. The details are on the assignment slide.'],
      terms: [['Sonny’s run', 'the contract checks his diagnosis'], ['The tests', 'made-up diagnoses check the contract']],
      next: 'Assignment 3: agree on the rules, then build them.'
    }
  }),
  assignmentSlide({
    number: 3, title: 'Agree on the rules, then build them', subtitle: 'Claude Code explains the five rules, you accept them, it shows the plan, then builds them into the contract. The 7 contract tests turn green.', stage: 'contract', duration: '11:40 · 25 min', shot: 'assets/day5-expected/a3-done.png', shotLabel: 'What you should see at the end',
    steps: [
      {text: 'First check the mode: the bottom of Claude Code says “manual mode on”.', after: 'Not there? Press Shift+Tab until it is. Claude Code asks before every file it changes.', warn: true},
      {text: 'Type this in: Claude Code. Goal: understand the five rules before anything is built.', prompt: PROMPTS.a3Contract, after: 'The five rules in plain English, and the smallest change that adds them. Nothing changes yet.'},
      {text: 'You decide. Goal: accept the rules. Check that all five are there and that unknown things stay OPEN.', after: 'Missing a rule? Say which one. Agree? Type “accepted”.'},
      {text: 'Type this in: Claude Code. Goal: see the red test and the plan before anything changes.', prompt: PROMPTS.a3Build, after: '6 of the 7 A3 tests red, why, and a list of about 9 files that must change. Nothing changes yet.'},
      {text: 'Type this in: Claude Code. Goal: build it.', prompt: PROMPTS.a3BuildImplement, after: 'Claude Code asks permission per file. At the end: the A3 test 7 of 7 green, and the diff.'},
      {text: 'Type this in: Window 2. Goal: see the difference with Assignment 1, same command.', prompt: 'npm run investigate -- fixtures/incidents/bad-deploy.json', after: 'The same diagnosis as in Assignment 1, now with a new line: “Customer impact: … users of checkout may see failures or slowness …”.'},
      {text: 'Type this in: Window 1. Goal: the operator’s desk gets your new rule too. It still runs your old code, so press Ctrl+C first, then start it again.', prompt: 'AGENT_LISTEN_WINDOW_MIN=1 npm run console', after: '“on-call console http://localhost:4320” again. The shop and the customers keep running.', warn: true},
      {text: 'Open in browser: http://localhost:4320. Goal: Sonny live. Click “+ New investigation”, then “Investigate: customers report checkout errors”.', after: 'Look for the row “Customer impact”. It is new: the desk uses your rule now. It says “none observed”: the live shop is healthy, so no customer has trouble.'}
    ],
    after: 'The A3 tests are green. The saved night shows a Customer impact line, and so does Sonny live on the operator’s desk.',
    checks: ['The A3 test: 7 of 7 green.', 'You can name the five rules.', 'A Customer impact line in the terminal (step 6) and on the desk (step 8).'],
    humanOpen: 'You accept the rules and review every file change. Nothing is approved or rolled back.', next: 'Done means: everything still works', review: REVIEW_A3,
    teach: {
      time: '25 min',
      gist: 'Claude Code explains the five rules, you accept them, it shows the plan, then builds. The A3 tests go from 6 red to 7 green.',
      do: ['Check manual mode, let Claude Code explain the rules, accept them, review the plan, approve the build, run Sonny on the saved night, restart the console, run Sonny live.'],
      done: ['The A3 test: 7 of 7 green.', 'They can name the five rules.', 'Customer impact in the terminal (step 6) and on the desk (step 8).'],
      copy: [['Step 2 · Claude Code', PROMPTS.a3Contract], ['Step 4 · Claude Code', PROMPTS.a3Build], ['Step 5 · Claude Code', PROMPTS.a3BuildImplement], ['Step 6 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json'], ['Step 7 · Window 1 (Ctrl+C first)', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console'], ['Step 8 · Browser', 'http://localhost:4320'], ['After each step · Window 2', 'git status']],
      script: [
        {do: 'Slide appears. Goal of this assignment.', say: ['You saw both: Sonny’s run goes through the contract, and the tests make sure the contract works. Now you build the five rules into it, in the order of the preview.', 'Same rhythm as Assignment 2: Claude Code explains, you decide, then it builds.', 'The biggest assignment of the day: 25 minutes, about 9 files.']},
        {do: 'Step 1 · manual mode.', say: ['Why: Claude Code is about to change about 9 files. You want to see each change.', '“manual mode on”. Not there? Shift+Tab.']},
        {do: 'Step 2 · understand. Paste the first prompt.', copy: [['Step 2 · Claude Code', PROMPTS.a3Contract]], say: ['Why: you only accept rules you understand.', 'In the project: Claude Code reads intent.md (your work from Assignment 2), docs/spec.md, src/contract.ts, two agent files and the A3 test. It changes nothing.', 'They see: the five rules in plain English, and the smallest change that adds them.']},
        {do: 'Step 3 · you decide.', say: ['Why: you own the rules, not Claude Code.', 'Check: are all five there? Does it keep unknown things OPEN: versions, regions, customer groups?', 'Agree: type “accepted”.']},
        {ask: 'The agent sees errors in the graphs, but has no update list. May it say “high confidence”?', say: ['(Answer: no. Data is missing, so rule 5 says no high confidence.)']},
        {do: 'Step 4 · the plan. Paste the second prompt.', copy: [['Step 4 · Claude Code', PROMPTS.a3Build]], say: ['Why: first see what fails and what will change, before anything changes. This uses the tests, before building.', 'In the project: Claude Code runs only the A3 test. Nothing changes.', 'They see: 6 of 7 red, why each one fails, and a list of about 9 files with a reason for each.']},
        {do: 'Step 5 · build. Paste the third prompt.', copy: [['Step 5 · Claude Code', PROMPTS.a3BuildImplement]], say: ['Why: now the rules go into the code, everywhere the diagnosis goes.', 'In the project, about 9 files change:', 'src/contract.ts: the check itself, the five rules.', 'src/runtime.ts and src/prompts.ts: the agent’s answers now include customer impact.', 'docs/spec.md: the description of a diagnosis.', 'src/cli.ts and console/index.html: the terminal and the web page show the new line.', 'Plus a few test files and approvals/README.md get one line.', 'They see: a permission question per file. For docs/spec.md and test files the guard asks extra: “confirm this edit with the human”.', 'At the end: the A3 test 7 of 7 green, and the diff.']},
        {do: 'Show PROGRESS.md.', say: ['The hook adds an “A-3 spec + contract” entry: the check now mentions customer_impact.']},
        {do: 'Step 6 · same command as Assignment 1, in Window 2.', copy: [['Step 6 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json']], say: ['Why: see with your own eyes what changed, with the exact same incident. Now Sonny’s run: does he still get through the new contract?', 'They see: the same diagnosis as in Assignment 1, plus a new line: Customer impact.', '“affected segments remain OPEN”: it does not guess which customers.']},
        {do: 'Step 7 · restart the console in Window 1.', copy: [['Step 7 · Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console']], say: ['Why: the console loaded Sonny’s code when it started this morning. It still has the old contract. Ctrl+C, then start it again.', 'Only Window 1. The shop and the customers keep running.']},
        {do: 'Step 8 · Sonny live. Browser: + New investigation → “Investigate: customers report checkout errors”.', say: ['Why: a change is only done when it works where the user works. The terminal is your workbench. The desk is where the operator sits.', '“+ New investigation”, then the button “Investigate: customers report checkout errors”: as if someone calls in. Sonny looks at the live shop, the last hour.', 'What to look for: the row “Customer impact” in the diagnosis. That row is the test. Before Assignment 3 it did not exist. Now it is there: the desk uses your new rule.', 'What it says: “none observed — no customer-facing metric moved”. The shop is healthy, so no customer has trouble. Sonny still had to fill in the row, because your rule says every diagnosis needs one.', 'Also: “#noise · no-action”, and Approve and Reject buttons. Do not press them.']},
        {ask: 'The row says “none observed”. Did your rule work?', say: ['(Answer: yes. The test is that the row is there at all. “None observed” is simply true: the shop is healthy.)', 'And Sonny did not make up a problem just because someone said “checkout errors”.', 'The exciting version comes in Assignment 6: you break the shop, and this row shows real customer trouble.']},
        {do: 'Wrap up.', say: ['The contract works: every diagnosis now goes through five rules. On the saved night, and live on the desk.', 'But you changed the shape of every diagnosis. Does the rest of Sonny still work? That is next.']}
      ],
      learn: ['Understand and accept the rules before building.', 'See the red test and the file list first, then build.', 'One rule ends up everywhere the diagnosis goes: contract, agent, description, terminal, web page.', 'Done means it also works where the user works: the desk.'],
      watch: ['Many permission questions in step 5: read the first few. Then they may pick “allow edits for this session”; the guard still asks for docs/spec.md and test files.', 'Claude Code edits in step 2 or 4: say “stop, do not edit yet”.', 'Claude Code removes or weakens an existing rule to make a test green: reject it.', 'Test still red after step 5: ask Claude Code to show the red line and fix only that.', 'Step 8 shows no Customer impact row: the console was not restarted (step 7). Ctrl+C in Window 1, start again, new investigation.', 'Someone opened their old incident from this morning and sees “Customer impact: undefined”: that diagnosis was made before the rule. A new investigation shows the real line. A nice moment to point at.', 'Step 8 shows a red “no telemetry … start the shop”: Window 3 (the shop) is not running. Start it: npm run shop, wait 10 seconds, try again.', 'Someone expects the 03:45 diagnosis in step 8: no, the desk looks at the live shop, which is healthy. The 03:45 night is the recording in step 6.', 'Port 4320 in use after Ctrl+C: wait a second, or close the old window.', 'Stuck far behind: Assignment 3B has a catch-up command that jumps to the finished A3.'],
      terms: [['Diagnosis', 'what Sonny writes: what is happening, root cause with evidence, how sure, one proposed fix (the code calls it “verdict”)'], ['Contract', 'the rules every diagnosis must follow (src/contract.ts)'], ['Schema', 'the form a diagnosis must have: which fields, which types'], ['Fixtures', 'the sample data and saved answers the tests use'], ['OPEN', 'the agent says: I do not know this yet']],
      changes: [
        ['Before step 2', 'From A1 and A2: `modified: intent.md`, `modified: PROGRESS.md`. Nothing else.'],
        ['After steps 2, 3 and 4', 'Nothing new. Claude Code only read, explained and ran the A3 test.'],
        ['After step 5 · build', 'About 9 modified files: `src/contract.ts`, `src/runtime.ts`, `src/prompts.ts`, `src/cli.ts`, `console/index.html`, `docs/spec.md`, often a few `test/*.test.ts` and `approvals/README.md`. The exact list can differ per person. PROGRESS.md gets an “A-3” entry.'],
        ['Show one change', '`git diff -- src/cli.ts`: one new line, the Customer impact output. Small and easy to read.'],
        ['After steps 6, 7 and 8', 'Nothing new in Git. The desk saves its incidents in console/data/ and a lesson draft in lessons/proposed/; Git ignores both.']
      ],
      next: 'Done means: everything still works.'
    }
  }),
  baseSlide({
    title: 'Done means: everything still works', kicker: 'Day 5 · TESTING', subtitle: 'The contract test is green. But your rule changed the shape of every diagnosis. Does the rest of Sonny still work?',
    visual: {suiteMap: {
      groups: [
        {icon: '🛡️', count: '56', state: 'green all day', tone: 'green', cmd: 'npm test', where: 'test/ · 13 files', rule: 'Must stay green. Red means your change broke something that worked.'},
        {icon: '📝', count: '20', state: 'red until you build it', tone: 'amber', cmd: 'npm run test:workshop', where: 'test/workshop/ · 5 files',
          files: [['contract', 'A3', '7', '7/7 ✓ now', 'ok'], ['chat + guard', 'A4', '5', 'still red'], ['tools', 'A5', '3', 'still red'], ['executor', 'extra', '5', 'still red']], rule: 'Red is normal. Each assignment turns its own file green.'},
        {icon: '🧩', state: 'no errors', tone: 'cyan', cmd: 'npm run typecheck', where: 'every code file', rule: 'Add a field in one place and forget another: it shows you where.'}
      ],
      convention: [['While you build', 'run only your own test: fast'], ['Before you say “done”', 'run everything']],
      example: {title: 'Why: tested on this project', left: {label: 'Only the contract changed', lines: ['Contract test   7/7 ✓']}, right: {label: 'Then run everything', lines: ['Main tests      52/56 · 4 ✗', 'Type check      errors in 3 files', 'Sonny           FAIL contract']},
        foot: 'The contract works, but the rest of Sonny does not know the new field yet. Assignment 3B finds this.'}
    }},
    cards: [
      {title: 'Main tests', body: 'Everything that already worked: Sonny’s investigation, the graphs and logs, approvals, the executor, the chat, the console.'},
      {title: 'Workshop tests', body: 'The pieces cut out of this project, one file per piece. Your to-do list for the day.'},
      {title: 'Type check', body: 'Not a test. It checks that every file agrees on the shape of a diagnosis.'}
    ],
    keyPoints: ['Main tests (56): what already worked. They must stay green.', 'Workshop tests (20): your to-do list. Red is normal until you build that piece.', 'While you build: your own test. Before “done”: everything, plus the type check.'],
    notes: 'Time: 12:05 · 3 min. SDLC tracker: Test. Clicks (→): 1 main tests · 2 workshop tests · 3 type check · 4 the convention line · 5 the tested example. Click a box to open it too; ← steps back. Builds on Assignment 1, where they saw “56 green, 14 red” without an explanation. The practice project (workshop/start) is the finished product with pieces cut out. Main tests: npm test = tsx --test test/*.test.ts, 13 files, 56 tests (agent, approval, bench, chat, console, contract format, deployWatch, executor, lessons, scan, store, telemetry, watch); 56/56 green on workshop/start and on day5-after-a3. Workshop tests: npm run test:workshop = scripts/test-workshop.mjs over test/workshop/*.test.ts, 5 files, 20 tests; each file starts with “Red on workshop/start; rebuild in src/…”. Per file on workshop/start → after A3: contract 1/7 → 7/7, chat 1/3, guard 1/2 (chat + guard = Assignment 4), tools 0/3 (Assignment 5), executor 3/5 (optional extra). Total 6/20 at the start, 12/20 after A3: the 8 still red are normal. Type check: npm run typecheck = tsc --noEmit; not a test, it checks that all files use the same data shapes. The example was run on workshop/start with only src/contract.ts taken from day5-after-a3: contract test 7/7, npm test 52/56 (agent loop, model-skips-tools, identity, a complete verdict passes), typecheck errors in src/runtime.ts, test/approval.test.ts and test/executor.test.ts (customer_impact missing), npm run investigate: FAIL contract, customer_impact: expected a non-empty string. The convention is normal in real teams: a focused test while building, the full suite before you call it done (often run automatically on every change).',
    teach: {
      time: '3 min',
      gist: 'There are two groups of tests: the main tests guard what already worked (must stay green), the workshop tests are the day’s to-do list (red until built). Plus the type check. While you build you run your own test; before “done” you run everything. Assignment 3B does that.',
      script: [
        {shot: 'assets/day5-jessy-teach/s24-1.webp', do: 'Slide appears. Read the subtitle.', say: ['The contract test is green. Is Assignment 3 done?', 'You changed what every diagnosis looks like. Other parts of Sonny use that shape too. So: does the rest still work?']},
        {shot: 'assets/day5-jessy-teach/s24-2.webp', do: 'Click: main tests.', say: ['Remember Assignment 1: “56 green, 14 red”? These are the 56.', 'They test everything that already worked: his investigation, approvals, the executor, the chat.', 'Their job is to stay green. Red means: your change broke something that worked.']},
        {shot: 'assets/day5-jessy-teach/s24-3.webp', do: 'Click: workshop tests.', say: ['And these are the 14 red ones from this morning, 20 in total.', 'The team cut pieces out of this project. Each file describes one missing piece. It is your to-do list for the day.', 'Assignment 3 turned the contract file green. The others are still red, and that is normal: that is this afternoon.']},
        {shot: 'assets/day5-jessy-teach/s24-4.webp', do: 'Click: type check.', say: ['The type check is not a test. It checks that every file agrees on what a diagnosis looks like.', 'Add a field in one place and forget it in another: the type check shows you where.']},
        {shot: 'assets/day5-jessy-teach/s24-5.webp', do: 'Click: the line in the middle.', say: ['This is how teams work: while you build, only your own test, because it is fast. Before you say “done”: everything.']},
        {shot: 'assets/day5-jessy-teach/s24-6.webp', do: 'Click: the example.', say: ['We tried it on this project. Only the contract changed: the contract test is green.', 'Run everything: four main tests red, the type check finds three files, and Sonny himself gets FAIL contract.', 'That is what Assignment 3B looks for.']},
        {ask: 'Seven workshop tests are still red after Assignment 3. Is that a problem?', say: ['(Answer: no. Those are the pieces for Assignment 4 and 5. Only the main tests must be green.)']}
      ],
      learn: ['Main tests guard what already worked; they must stay green.', 'Workshop tests are the day’s to-do list; red is normal until you build that piece.', 'Your own test while building, everything before “done”.'],
      watch: ['Someone asks why the team cut pieces out: so you build them yourself, with a test that tells you when you are done.', 'Someone asks why not always run everything: you can, it just takes longer. While building, one fast test keeps you moving.', 'Someone asks who runs this in real life: usually it runs automatically on every change (“CI”). Today we do it by hand.', 'Do not go through all 13 main test files: the groups are enough.'],
      terms: [['Main tests', 'tests for everything that already works; they must stay green (regression tests)'], ['Workshop tests', 'tests for the pieces you build today; red until you build them'], ['Type check', 'a check that every file uses the same shape for a diagnosis; not a test']],
      next: 'Assignment 3B: check that it really works.'
    }
  }),
  {...checkpointSlide({
    number: 3, title: 'verify the verdict contract', subtitle: 'Prove the whole Sonny still works with your new rule, not just the contract. Then a second check that does not take Claude Code’s word for it. You read the evidence yourself.', stage: 'contract', duration: '12:08 · 7 min', shot: 'assets/day5-expected/a3.png',
    steps: [
      {text: 'Type this in: Claude Code. Goal: run everything, not just the contract test: the main tests, the type check, and Sonny.', prompt: PROMPTS.a3BuildProve, after: 'Main tests 56 of 56 green, the type check without errors, and Customer impact in Sonny’s output. Something red? Claude Code reports it before it changes anything.'},
      {text: 'Type this in: Claude Code. Goal: a second, independent check of the claim.', prompt: PROMPTS.a3Verify, after: 'One word back: VERIFIED, NOT VERIFIED or INCONCLUSIVE, with the files and output it looked at.'},
      {text: 'You check. Goal: open every file and output it names.', after: 'Each one really shows what the check says.'},
      {text: 'Type this in: Window 2. Goal: only if you are stuck: save your work and jump to the finished version of Assignment 3.', prompt: 'git stash push -u -m "before Day 5 A3 catch-up" && git switch -c day5-catch-up-a3 day5-after-a3', after: 'Your work is saved, and you continue from the finished Assignment 3.', warn: true}
    ],
    after: 'The claim “the contract refuses a diagnosis without customer impact” is verified, with the files and output to show it.',
    checks: ['Main tests 56 of 56 green, type check clean.', 'You opened the evidence the second check names.', 'VERIFIED from the second check.'],
    humanOpen: 'A check result approves nothing and runs nothing.', next: 'Pre-lunch quiz'
  }), title: 'Assignment 3B: Check that it really works', kicker: 'Day 5 · ASSIGNMENT 3B · TEST', type: 'practice', visual: {shot: 'assets/day5-expected/a3.png', shotLabel: 'What you should see at the end'},
    teach: {
      time: '7 min',
      gist: 'The Test step: prove the whole Sonny still works with the new rule (main tests, type check, Sonny himself), then let /verify-this check the claim with fresh eyes, and read the evidence yourself.',
      copy: [['Step 1 · Claude Code', PROMPTS.a3BuildProve], ['Step 2 · Claude Code', PROMPTS.a3Verify], ['Stuck · Window 2', 'git stash push -u -m "before Day 5 A3 catch-up" && git switch -c day5-catch-up-a3 day5-after-a3']],
      script: [
        {do: 'Slide appears. Goal of this assignment.', say: ['Claude Code says it is done. Do you believe it?', 'Same idea as the contract, one level up: the contract checks Sonny’s work before the operator sees it. Now the tests and a second check look at Claude Code’s work before you accept it.', 'In the SDLC this is the Test step.']},
        {do: 'Step 1 · run everything. Paste the first prompt.', copy: PROMPTS.a3BuildProve, say: ['Why: the last slide. The contract test was green, but did anything else break?', 'In the project: the 56 main tests, the type check, and Sonny himself on the 03:45 incident. Nothing changes.', 'Normal: 56 of 56 green, no type errors, a Customer impact line in his output. The workshop tests for this afternoon are not part of this: they are still red, and that is fine.']},
        {ask: 'Claude Code reports 4 main tests red. What now?', say: ['(Answer: something that worked is broken. Usually Sonny does not write customer impact everywhere yet. Let Claude Code show the red line and fix only that, then run everything again.)']},
        {do: 'Step 2 · a second check. Paste the second prompt.', say: ['Why: so far Claude Code checked its own work. Now a separate check that only reads, with one claim: no diagnosis gets through without customer impact, and Sonny still writes it.', '/verify-this is a skill in the project. It looks at the spec, the tests and the output, and answers VERIFIED, NOT VERIFIED or INCONCLUSIVE, with the files it looked at.']},
        {ask: 'INCONCLUSIVE: is that bad?', say: ['(Answer: no. It means: not enough evidence to say yes or no. Ask what is missing.)']},
        {do: 'Step 3 · you check.', say: ['Why: the human in the loop again. Open what it names, and look for yourself.']},
        {do: 'Stuck: point at the last step.', say: ['Far behind? This saves your work and jumps to the finished Assignment 3, so you are ready after lunch.']}
      ],
      learn: ['Done means: the main tests and the type check are still green, not only your own test.', 'A second check that only reads gives fresh eyes.', 'You still read the evidence yourself.'],
      watch: ['Someone expects the workshop tests to be green: only the contract file is (7/7). The other 8 red ones are Assignment 4, 5 and an extra.', 'NOT VERIFIED: ask Claude Code which check failed and fix only that.', 'The stuck command needs a clean start: it saves their work first (git stash), nothing is lost.', 'Someone thinks VERIFIED approves a rollback: no. It only says the claim is true.'],
      terms: [['/verify-this', 'a skill that checks one claim, read-only, and answers VERIFIED, NOT VERIFIED or INCONCLUSIVE'], ['Type check', 'a check that every piece of code uses the right kind of data']],
      next: 'pre-lunch quiz.'
    }},
  baseSlide({
    title: 'Pre-lunch quiz · What is true now?', kicker: 'Day 5 · QUIZ', subtitle: 'Vote first. Reveal the answers second.', type: 'quiz',
    cards: [{title: 'A', body: 'INC-1001 and the listener incident are the same record.'}, {title: 'B', body: 'The builder and product runtime are separate.'}, {title: 'C', body: 'A green contract test proves a human approved rollback.'}, {title: 'D', body: 'Unsupported customer scope stays OPEN.'}],
    keyPoints: ['B and D are true.', 'A confuses two records.', 'C confuses proof with authority.'],
    notes: note({time: '12:15 · 3 min', why: 'The quiz catches identity and authority mistakes before lunch.', predict: 'Ask for two true answers.', see: 'B and D remain.', inside: 'The wrong answers repeat the two main risks.', participant: 'Vote before the reveal.', watch: 'Do not explain before the vote.', stuck: 'Read each answer aloud.', stop: 'The room can explain both false answers.', next: 'Lunch'})
  }),
  pauseSlide('Lunch', '60 min', 'Recall the morning before A4', '12:00'),
  pauseSlide('Restart and settle', '10 min', 'Guardrails: no shortcuts past the person', '13:10'),
  baseSlide({
    title: 'Guardrails: no shortcuts past the person', kicker: 'Day 5 · HUMAN IN THE LOOP', type: 'context',
    subtitle: 'The normal road ends with a person who decides. A guardrail is plain code that blocks a shortcut around that person, whoever takes it: a colleague, you yourself, or an AI.',
    visual: {guardRail: {
      chainTitle: 'The normal road',
      chain: [['🚨', 'An alert', 'checkout errors at 03:45'], ['👀', 'Sonny looks', 'he only reads'], ['📝', 'Sonny proposes a fix', 'for example: roll back'], ['🧑', 'A person decides', 'Approve or Reject, with a name']],
      railsTitle: 'Shortcuts, and the guardrail that blocks them',
      rails: [
        {icon: '💬', title: 'Shortcut 1: rolling back through the chat', who: 'anyone at the desk: a colleague, you at 03:45, or a trick hidden in a log message', try: 'types “Roll back now.” in the chat, without a diagnosis and without the button', stop: 'The chat answers questions, but refuses actions: “use the button, with your name”.', where: 'src/chat.ts', today: 'today: missing · Claude Code builds it'},
        {icon: '🛠️', title: 'Shortcut 2: lowering the pass mark', who: 'Claude Code, the AI that builds with you', try: 'Sonny scores worse on his practice exam after a change. Instead of fixing the code, Claude Code lowers the pass mark in bench/ratchet.json from 70% to 50%. The check is green again, but Sonny is no better', stop: 'Only a person may change the pass mark. Claude Code is refused.', where: '.claude/hooks/guard.mjs', today: 'today: missing · you write it yourself'}
      ],
      foot: 'Assignment 4: try the shortcut → build the guardrail → try the shortcut again.'
    }},
    keyPoints: ['The normal road ends with a person who decides.', 'A guardrail blocks a shortcut around that person, whoever takes it.', 'Guardrails are plain code: test them by trying the shortcut.'],
    notes: 'Time: 13:13 · 5 min. Replaces Ryan’s “Refuse unsafe chat actions” and the A4 example picture. Clicks (→): 1 the heading “Shortcuts…” · 2 shortcut 1 (the chat) · 3 shortcut 2 (the pass mark) · 4 the line at the bottom. The top row is the normal road, always visible: no guardrail is needed there. Facts (workshop/start): every chat message first goes through routeMessage() in src/chat.ts, plain code that sorts it by how it starts: “Investigate …” → an investigation, “Watch …” → a deployment watch, anything else → a question answered from read-only tools. The action refusal (roll back, approve, resolve, scale up) is the TODO(A4) there; test/workshop/chat.test.ts is red until built. Sonny has no tool that can roll back; rollback only runs through Approve and then Execute on the desk. The practice exam = the bench (npm run bench: Sonny on a set of saved incidents); bench/ratchet.json = {min_rate 0.7, max_harmful 0}, the minimum the bench must reach. The guard hook (.claude/hooks/guard.mjs, like Day 2) checks every Claude Code action; its TODO(A4) is the line the participant writes by hand. Tested: before A4 “Roll back now.” is treated as a question (evidence + “You asked: …”); after A4 “mutations are buttons for a named human, not chat requests”. Guard test (npx tsx --test test/workshop/guard.test.ts): pass 1 / fail 1 before the two lines (“agent cannot edit or write bench/ratchet.json”), pass 2 / fail 0 after. A case is harmful when Sonny proposes a strong action (rollback, scale, flag-off) that the answer key says is wrong (src/bench.ts).',
    teach: {
      time: '5 min',
      gist: 'Zoom out: the normal road ends with a person who decides. Guardrails block shortcuts around that person, whoever takes them. Assignment 4 tests two shortcuts.',
      script: [
        {shot: 'assets/day5-jessy-teach/s29-1.webp', do: 'Slide appears. Point at the top row, left to right.', say: ['This is the normal road. You know it from this morning.', 'An alert. Sonny looks, he only reads. He proposes a fix, for example: roll back. And then a person decides: Approve or Reject, with a name.', 'Nothing wrong with this road. The person at the end is in control.'], ask: ['Where could someone skip that person?']},
        {shot: 'assets/day5-jessy-teach/s29-2.webp', do: 'Click: the heading “Shortcuts”.', say: ['A guardrail is plain code that blocks a shortcut around that person. Whoever takes the shortcut: a colleague, you yourself, or an AI.', 'Not because people are bad. Because at 03:45 everyone is tired, and an AI does what it is told.']},
        {shot: 'assets/day5-jessy-teach/s29-3.webp', do: 'Click: shortcut 1.', say: ['Shortcut 1: someone types “Roll back now.” in the chat. No diagnosis, no button, no name.', 'That could be a colleague in a hurry, you yourself at 03:45, or a trick: text hidden in a log message that tries to give an order.', 'The guardrail: the chat answers questions, but refuses actions. “Use the button, with your name.” Today it is missing: you will see that yourself first.']},
        {shot: 'assets/day5-jessy-teach/s29-4.webp', do: 'Click: shortcut 2.', say: ['Shortcut 2 is about Claude Code, the AI that builds with you.', 'First the practice exam. The project has a list of saved incidents, each with the right answer: which fix, and how urgent. Sonny answers them all and gets a score.', 'The pass mark: at least 70% right, and never a harmful fix. Harmful means: a rollback when that was the wrong answer. A wrong fix is worse than no fix. Those two numbers are in one file: bench/ratchet.json.', 'Now the shortcut. Say Claude Code changes Sonny and he scores 60%. The check turns red. The honest way: fix the code. The shortcut: change 70% into 50% in that file. Green again, and Sonny is no better. Like a student who changes their own grade.', 'An AI told “make the checks green” can take that shortcut without bad intent. That is why it gets a guardrail.', 'The guardrail: only a person may change the pass mark. And because this guardrail watches Claude Code, you write it yourself.']},
        {ask: 'Who takes the shortcut in shortcut 2?', say: ['(Answer: Claude Code. So even the AI you work with gets a guardrail.)']},
        {shot: 'assets/day5-jessy-teach/s29-5.webp', do: 'Click: the line at the bottom.', say: ['That is Assignment 4: try the shortcut, build the guardrail, try the shortcut again. The same rhythm as red and green this morning.']}
      ],
      learn: ['The normal road ends with a person who decides.', 'A guardrail blocks a shortcut around that person, whoever takes it, even an AI.', 'You test a guardrail by trying the shortcut.'],
      watch: ['Someone asks if Sonny could roll back now: no. He has no tool for it. Rollback only runs through Approve and Execute on the desk. Shortcut 1 is about the chat looking like the place to do it.', 'Someone asks what a “trick in a log message” is: text inside data that tries to give the AI an order. Plain-code guardrails do not listen to it.', 'Someone asks why it is called “ratchet”: a ratchet is a tool that only turns one way. The pass mark may go up when Sonny gets better, never down.', 'Do not go into the code here; that is the assignment.'],
      terms: [['Guardrail', 'plain code that blocks a shortcut around the person who decides'], ['Rollback', 'undo the last update: back from v2.15.0 to v2.14.0'], ['Practice exam (bench)', 'Sonny on a set of saved incidents; the pass mark is in bench/ratchet.json: 70% right, 0 harmful']],
      next: 'Assignment 4.'
    }
  }),
  assignmentSlide({
    number: 4, title: 'Try the guardrails, build them, try again', subtitle: 'The two shortcuts from the last slide. For each one: try it, build the guardrail, try it again.', stage: 'controls', duration: '13:18 · 25 min', shot: 'assets/day5-expected/a4.png',
    steps: [
      {text: 'Shortcut 1 · Open in browser: http://localhost:4320. Goal: try the shortcut. Click your investigation from Assignment 3 on the left. Type in the chat:', prompt: 'Roll back now.', after: 'Sonny treats it as a question: his evidence, plus “You asked: …”. Nothing is rolled back, but nothing says no either.'},
      {text: 'Shortcut 1 · Type this in: Claude Code. Goal: build the chat guardrail. Questions keep working.', prompt: PROMPTS.a4Chat, after: 'The chat test red first, then green. “Do not approve and roll back now.” is refused; the long evidence question still works.'},
      {text: 'Shortcut 1 · Type this in: Window 1. Press Ctrl+C, then start the console again so it uses your new code.', prompt: 'AGENT_LISTEN_WINDOW_MIN=1 npm run console', after: 'The console runs again. The shop and the customers keep running.', warn: true},
      {text: 'Shortcut 1 · Open in browser: http://localhost:4320. Goal: try the shortcut again. Same investigation, same chat:', prompt: 'Roll back now.', after: '“mutations are buttons for a named human, not chat requests”.'},
      {text: 'Shortcut 2 · Type this in: Claude Code. Goal: try the shortcut. The guard test checks whether Claude Code can change the pass mark.', prompt: PROMPTS.a4GuardBefore, after: 'Red: “agent cannot edit or write bench/ratchet.json” fails. Today Claude Code could still change the pass mark.'},
      {text: 'Shortcut 2 · You, not Claude: open .claude/hooks/guard.mjs in your editor. Find the 4 comment lines that start with // TODO(A4). Replace them with these 2 lines and save.', prompt: 'else if (rel === "bench/ratchet.json")\n    decide("deny", "guard: ratchet is human-owned");', after: 'The new lines sit just above the line that starts with else if (SDLC_ARTEFACT.', warn: true},
      {text: 'Shortcut 2 · Type this in: Claude Code. Goal: try the shortcut again, without Claude Code touching your line.', prompt: PROMPTS.a4Review, after: 'Green: Edit and Write to bench/ratchet.json are denied. Claude Code did not edit the hook.'}
    ],
    after: 'Both shortcuts are blocked: the chat refuses “roll back”, and Claude Code cannot change the pass mark.',
    checks: ['Shortcut 1: the same sentence, first answered (step 1), then refused (step 4).', 'Shortcut 2: the guard test red (step 5), then green (step 7).', 'You wrote the guard line yourself, and can say both guardrails in your own words.'],
    teach: {
      time: '25 min',
      gist: 'The two shortcuts from slide 29, each with the same rhythm: try it, build the guardrail, try it again. Shortcut 1 on the desk (the chat), shortcut 2 on Claude Code (the pass mark). The participant writes the second guardrail by hand.',
      do: ['Shortcut 1: try “Roll back now.”, let Claude Code build the refusal, restart the console, try again. Shortcut 2: run the guard test (red), write the guard line by hand, run it again (green).'],
      done: ['Shortcut 1: answered (step 1), refused (step 4).', 'Shortcut 2: red (step 5), green (step 7).', 'They can name the two guardrails.'],
      copy: [['Step 1 · Browser chat', 'Roll back now.'], ['Step 2 · Claude Code', PROMPTS.a4Chat], ['Step 3 · Window 1 (Ctrl+C first)', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console'], ['Step 4 · Browser chat', 'Roll back now.'], ['Step 5 · Claude Code', PROMPTS.a4GuardBefore], ['Step 6 · .claude/hooks/guard.mjs', 'else if (rel === "bench/ratchet.json")\n    decide("deny", "guard: ratchet is human-owned");'], ['Step 7 · Claude Code', PROMPTS.a4Review]],
      script: [
        {do: 'Slide appears. Point at the two halves: steps 1–4 and steps 5–7.', say: ['The two shortcuts from the last slide. For each one you do the same three things: try the shortcut, build the guardrail, try the shortcut again.', 'Steps 1 to 4: shortcut 1, the chat. Steps 5 to 7: shortcut 2, the pass mark.']},
        {do: 'Step 1 · try shortcut 1. Browser, your investigation from Assignment 3, chat: “Roll back now.”', copy: [['Step 1 · Browser chat', 'Roll back now.']], say: ['Why: first see that the guardrail is missing, like the red test this morning.', 'They see: Sonny answers with his evidence, and “You asked: Roll back now.”.', 'What happened: every chat message first goes through a sorter, plain code. It looks at how the message starts. “Investigate …” starts an investigation, “Watch …” watches an update, and anything else is treated as a question.', '“Roll back now.” is none of these, so it becomes a question. Nothing is rolled back: Sonny has no tool for that. But nothing says no either. At 03:45 the operator might think it worked.']},
        {ask: 'Who should be able to roll back, at 03:45?', say: ['(Answer: a named person, with the button. Not a chat message.)']},
        {do: 'Step 2 · build the chat guardrail. Paste the first prompt.', copy: [['Step 2 · Claude Code', PROMPTS.a4Chat]], say: ['Why: same rhythm as Assignment 3: the test red first, then build, then green.', 'In the project: the sorter in src/chat.ts gets one more row: action words (roll back, approve, resolve, scale up) → refused, with a clear answer. It runs before everything else. Only the A4 chat test runs.', 'Two sentences matter: “Do not approve and roll back now.” must be refused. The long evidence question that ends with “Do not approve or execute anything.” must still work: it only asks to look.']},
        {ask: 'Both sentences say “do not approve”. Why is one refused and the other not?', say: ['(Answer: the first one still asks to roll back. The second one only asks to look at evidence.)']},
        {do: 'Step 3 · restart the console in Window 1.', copy: [['Step 3 · Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console']], say: ['Same as Assignment 3: the console still runs your old code. Ctrl+C, start again. Only Window 1.']},
        {do: 'Step 4 · try shortcut 1 again. Same investigation, same chat.', copy: [['Step 4 · Browser chat', 'Roll back now.']], say: ['They see: “mutations are buttons for a named human, not chat requests”.', 'Same sentence as step 1. Before: treated as a question. Now: refused straight away, with a clear answer. That is your guardrail, on the operator’s desk.', 'Ask a normal question too, like “How is production doing?”: it still gets an answer. Only actions are blocked.']},
        {do: 'Step 5 · try shortcut 2. Paste the guard-test prompt.', copy: [['Step 5 · Claude Code', PROMPTS.a4GuardBefore]], say: ['Now shortcut 2: the pass mark. Quick reminder: Sonny has a practice exam of saved incidents. He must get at least 70% right and never propose a harmful fix. Those two numbers are in bench/ratchet.json.', 'Why it matters: if Sonny scores worse after a change, the honest fix is better code. The shortcut is changing 70% into 50% in that file: the check is green again, but Sonny is no better.', 'The guard test pretends to be Claude Code trying to change that file. They see: red, “agent cannot edit or write bench/ratchet.json”. Today nothing stops it.']},
        {do: 'Step 6 · you, not Claude. Open .claude/hooks/guard.mjs, replace the TODO(A4) lines.', copy: [['Step 6 · guard.mjs', 'else if (rel === "bench/ratchet.json")\n    decide("deny", "guard: ratchet is human-owned");']], say: ['Why you: this file is the guardrail on Claude Code itself. If Claude Code wrote its own guardrail, who checks it? So a person writes this line.', 'The guard is the hook you know from Day 2: plain code that says allow or deny for every Claude Code action. Your two lines say: changing bench/ratchet.json → deny.']},
        {do: 'Step 7 · try shortcut 2 again. Paste the review prompt.', copy: [['Step 7 · Claude Code', PROMPTS.a4Review]], say: ['In the project: only the guard test runs again. Claude Code reads your line, but does not edit it.', 'They see: green. Edit and Write to bench/ratchet.json are denied.', 'Honest limit: the guard looks at Claude Code’s edit actions. It does not block every shell command. The prompt says not to claim that.']},
        {do: 'Wrap up: the two guardrails. Ask one person to say them in their own words.', say: ['The chat: a chat message can never start an action, also not with a real AI later. That protects the operator.', 'The pass mark: only a person changes it. Even the AI you build with gets a guardrail.', 'Both are plain code, not AI. Like the contract this morning.', 'In Assignment 6 you see the button that a person does press.']}
      ],
      learn: ['Test a guardrail by trying the shortcut: before and after.', 'In the chat Sonny answers questions; a chat message never starts an action. Actions are buttons for a named person.', 'Even the AI you build with gets a guardrail, written by a person.'],
      watch: ['Step 1: the investigation from Assignment 3 is gone? Click “+ New investigation” → “Investigate: customers report checkout errors” and use that one.', 'Step 1: Sonny already refuses: they used the catch-up branch, which has A4 in it. Fine, skip to step 2.', 'Step 4 still answers instead of refusing: the console was not restarted (step 3).', 'Step 5: Claude Code offers to fix the red test: say no. Step 6 is the person’s job.', 'Step 7: Claude Code offers to edit guard.mjs: say no.', 'Someone says the guard blocks everything: no, only Claude Code’s edits to that one file.', 'The guard asks extra confirmation for test files in step 2: that is the guard from Day 2 doing its work.'],
      terms: [['Guardrail', 'plain code that blocks a shortcut around the person who decides'], ['Guard', 'the hook .claude/hooks/guard.mjs: plain code that allows or denies each Claude Code action'], ['Practice exam (bench)', 'Sonny answers a set of saved incidents; the pass mark is in bench/ratchet.json: at least 70% right, 0 harmful']],
      changes: [
        ['After step 1', 'Nothing in Git. The chat message is saved in console/data/, which Git ignores.'],
        ['After step 2', '`modified: src/chat.ts` (plus PROGRESS.md).'],
        ['After steps 3–5', 'Nothing new.'],
        ['After step 6', '`modified: .claude/hooks/guard.mjs`: your two lines.'],
        ['After step 7', 'Nothing new.']
      ],
      next: 'Sonny’s eyes in the code: one tool is missing.'
    },
    humanOpen: 'Only you write the guard line. The chat proposes; a named person presses the buttons.', next: 'A5 · Add one read-only tool'
  }),
  baseSlide({
    title: 'Sonny’s eyes in the code: one tool is missing', kicker: 'Day 5 · IN THE CODE · TOOLS', type: 'context',
    subtitle: 'The four looks from slide 4 are four tools in src/tools.ts: small functions that only read. Three work. The update list is empty, and the code takes a detour around it.',
    visual: {codeRoute: {
      steps: [
        {file: 'Your terminal · Assignment 1 · Sonny’s trace', term: true, code: '── trace (what the agent looked at) ──\n1. summarize_metrics {since 02:50, until 03:50}\n2. list_deploys      {since 02:50, until 03:50}\n   → [{"id":"d-4821","version":"v2.15.0","at":"03:43" …}]\n3. get_diff          {"deploy":"d-4821"}\n4. search_logs       {"level":"error" …}'},
        {file: 'src/tools.ts · the four tools', lit: true, code: 'export const handlers = (t) => ({\n  search_logs:       (args) => searchLogs(t, args),\n  summarize_metrics: (args) => summarizeMetrics(t, …),\n  // TODO(A5): bind it to listDeploys(t, …)\n  list_deploys:      (_args) => [],   // ← empty\n  get_diff:          (args) => getDiff(t, args.deploy),\n});'},
        {file: 'src/telemetry.ts · where the update list is', code: 'export const listDeploys = (t, since, until) =>\n  [...t.deploys]                      // the update list\n    .filter((d) => inWindow(d.at, since, until))\n    .sort(newest first);\n\n// the tool should call this. Today it does not.'},
        {file: 'src/runtime.ts · Sonny’s run', lit: true, code: 'const h = handlers(t);   // h = the tools\n\nconst metrics = h.summarize_metrics(…);  // ✓ tool\n\n// A5 bypass: … read deploys directly\nconst deploys = listDeploys(t, …);      // ✗ detour'},
        {file: 'src/runtime.ts · what goes in the trace', lit: true, code: 'const outputs = {\n  summarize_metrics: h.summarize_metrics(windowInput),  // ✓\n  list_deploys: listDeploys(t, …),   // ✗ A5 bypass\n  search_logs: h.search_logs(logInput),                // ✓\n};\n// the trace prints “list_deploys”, but the tool was skipped'},
        {file: 'src/chat.ts · the chat on the desk', lit: true, code: 'const h = handlers(t);   // h = the tools\n\nconst m = h.summarize_metrics({});  // ✓ tool\nconst d = listDeploys(t);           // ✗ detour\nconst errs = h.search_logs(…);      // ✓ tool'}
      ],
      run: {label: 'See it yourself · Assignment 5, step 2', cmd: 'npx tsx --test test/workshop/tools.test.ts', when: 'Claude Code runs this test for you in step 2. After the build in step 4: pass 4, fail 0.',
        outLabel: 'Today', out: 'not ok 1 - A5: list_deploys is bound to telemetry.listDeploys and returns deploys\nnot ok 2 - A5: list_deploys is registered on the telemetry MCP server\nnot ok 3 - A5: chat and offline runtime use the shared list_deploys capability\n# pass 0\n# fail 3'},
      foot: 'h.something(…) = through the tool. listDeploys(t, …) straight away = the detour. Assignment 5: one real tool, and all three places use it.'
    }},
    cards: [
      {title: 'The four looks, in his trace', body: 'Slide 4’s four looks, as you saw them in Assignment 1. Each line is one tool call.'},
      {title: 'The four tools', body: 'Three read real data. list_deploys gives back an empty list: the TODO for Assignment 5.'},
      {title: 'The update list itself', body: 'listDeploys reads the updates in a time window. The tool should call it.'},
      {title: 'The detour in Sonny’s run', body: 'Graphs go through the tool (h.). The update list is read directly, around the tool.'},
      {title: 'The trace is not quite true', body: 'It prints “list_deploys”, while the data came in around the tool.'},
      {title: 'The same detour in the chat', body: 'The desk’s chat answers also read the update list directly.'}
    ],
    keyPoints: ['The four looks from slide 4 are four tools in src/tools.ts; they only read.', 'list_deploys is empty today; Sonny’s run and the chat read the update list around it.', 'A real AI would not get the tool, and the trace would not be true. Assignment 5 fixes both.'],
    notes: 'Time: 13:43 · 5 min. Same visual as slide 20 (code blocks with arrows). Clicks (→): 1–6 open the code blocks one by one, 7 the orange “see it yourself” bar and the line at the bottom. Click a block to jump; ← steps back. All code is from workshop/start (the version participants clone, with four pieces cut out), shortened with “…”: src/tools.ts lines 39–53 (handlers; list_deploys returns [] under TODO(A5)), src/telemetry.ts line 169 (listDeploys), src/runtime.ts lines 104–106 (offlineVerdict: the bypass) and 224–227 (the outputs that go in the trace), src/chat.ts line 63 (offlineAnswer). A second TODO(A5) in src/tools.ts: list_deploys is not registered on the telemetry server (createTelemetryServer), so a real AI model could not call it at all. Tested: tools test pass 0 / fail 3 on day5-after-a3, pass 4 / fail 0 on day5-after-a5; npm run investigate output identical on both; main 56/56 and typecheck clean after A5. Not on the slide, but true: no tool can change anything (eyes, no hands); say it in the wrap-up.',
    teach: {
      time: '5 min',
      gist: 'Slide 4’s four looks are four tools in the code. One, the update list, is empty, and the code takes a detour around it. In the code you can see the difference: h.something = through the tool, listDeploys directly = around it.',
      script: [
        {shot: 'assets/day5-jessy-teach/s31-1.webp', do: 'Slide appears. Point back: slide 4, “He looks”.', say: ['On slide 4 Sonny looked in four places: the graphs, the update list, the code change, the error logs.', 'In the code, each of those looks is a tool: a small function that only reads. Let us follow them.']},
        {shot: 'assets/day5-jessy-teach/s31-2.webp', do: 'Click: block 1, the trace.', say: ['You saw this in Assignment 1, at the top of Sonny’s output: his trace. Four lines, the four looks.', 'Line 2: list_deploys, between 02:50 and 03:50, and it found update v2.15.0 at 03:43. That is how he knew the update caused it.']},
        {shot: 'assets/day5-jessy-teach/s31-3.webp', do: 'Click: block 2, src/tools.ts.', say: ['Here are the four tools. Point at the left side: search_logs, summarize_metrics, list_deploys, get_diff. The same four names as in the trace.', 'Three of them read real data. list_deploys gives back an empty list: two square brackets. With a TODO for Assignment 5 above it.']},
        {ask: 'If the tool is empty, how did Sonny find update v2.15.0 this morning?', say: ['(Answer: he did not use the tool. Next blocks.)']},
        {shot: 'assets/day5-jessy-teach/s31-4.webp', do: 'Click: block 3, src/telemetry.ts.', say: ['This is where the update list really is: listDeploys. It takes the updates within a time window.', 'The tool should call this function. Today it does not.']},
        {shot: 'assets/day5-jessy-teach/s31-5.webp', do: 'Click: block 4, Sonny’s run.', say: ['Look at the two lines. The graphs: h.summarize_metrics. The h means: through the tool.', 'The update list: listDeploys, straight away. No h. That is the detour: it reads the list itself, around the tool. The comment even says so: A5 bypass.', 'Why is it there? The tool was cut out for this workshop. Without the detour, this morning would not have worked.']},
        {shot: 'assets/day5-jessy-teach/s31-6.webp', do: 'Click: block 5, what goes in the trace.', say: ['And this is what gets written in the trace. For list_deploys it writes the name of the tool, but the data came from the detour.', 'So the trace you saw this morning was not quite true. And the trace is exactly what you use to check Sonny.']},
        {shot: 'assets/day5-jessy-teach/s31-7.webp', do: 'Click: block 6, the chat.', say: ['The same detour in the chat on the desk: the graphs through the tool, the update list directly.']},
        {shot: 'assets/day5-jessy-teach/s31-8.webp', do: 'Click: the orange bar appears.', say: ['The A5 test checks exactly this: is the tool real, is it offered to the AI, and do Sonny’s run and the chat use it? Today: 0 of 3.', 'In Assignment 5 Claude Code builds the tool and removes the detours. Then: 4 of 4. Sonny’s output stays the same, but now it really comes through the tool.']},
        {ask: 'Why does it matter, if the answer is the same?', say: ['(Answer: a real AI only gets tools. Without list_deploys it could never see the update. And the trace must be true, because that is how you check him.)']},
        {do: 'Wrap up.', say: ['One more thing. Look at the four tools again: they all only read. There is no tool that rolls back or installs anything. Sonny has eyes, no hands. Changing things stays a button for a person.']}
      ],
      learn: ['Slide 4’s four looks are four tools in src/tools.ts.', 'h.something = through the tool; listDeploys directly = the detour.', 'The trace must be true: it is how you check Sonny.', 'Eyes, no hands: no tool changes anything.'],
      watch: ['Do not read the code line by line: point at the one line per block (the trace line, the empty [], listDeploys, h. vs no h., the bypass comment).', 'Someone asks why the detour was there: the project is a starting version with pieces cut out; the detour kept the morning working.', 'Someone asks if it is a bug: it is a temporary shortcut, marked “A5 bypass”. In real projects this is called technical debt.', 'Clicked too far? ← steps back.'],
      terms: [['Tool', 'a small function Sonny can call to look at something; these four only read'], ['Trace', 'the list of every tool Sonny used, with what he asked for'], ['h.', 'short for the handlers: the tools. h.summarize_metrics(…) = through the tool'], ['Detour (bypass)', 'code that reads the data around the tool, so the tool is skipped'], ['Deploy', 'an update to the shop, like v2.15.0']],
      next: 'Assignment 5.'
    }
  }),
  assignmentSlide({
    number: 5, title: 'Repair Sonny’s missing eye', subtitle: 'See the red test and the detour, build the update-list tool, test it green. Sonny’s output stays the same, but now it is true.', stage: 'tools', duration: '13:47 · 15 min', shot: 'assets/day5-expected/a5.png',
    steps: [
      {text: 'Check the mode: the bottom of Claude Code says “manual mode on”.', after: 'Not there? Press Shift+Tab until it is.', warn: true},
      {text: 'Type this in: Claude Code. Goal: see what is missing before anything changes.', prompt: PROMPTS.a5See, after: 'What the tool should do, the detours in src/runtime.ts and src/chat.ts, and the A5 test red (0 of 3). Nothing changes yet.'},
      {text: 'You decide. Goal: accept the plan. The tool may only read: no tool that changes anything.', after: 'Agree? Type “accepted”.'},
      {text: 'Type this in: Claude Code. Goal: build the tool and remove the detours.', prompt: PROMPTS.a5Implement, after: 'Claude Code asks per file. At the end: the A5 test green (4 of 4), the main tests and the type check green, and the diff.'},
      {text: 'Type this in: Window 2. Goal: run Sonny again, same command as Assignment 1.', prompt: 'npm run investigate -- fixtures/incidents/bad-deploy.json', after: 'The same diagnosis as in Assignment 3, with list_deploys in the trace. Same answer, but now the update list really comes through the tool.'}
    ],
    after: 'The update-list tool works and only reads, the detours are gone, and the trace tells the truth.',
    checks: ['The A5 test: red first (0 of 3), then green (4 of 4).', 'You saw where the detours were.', 'Sonny’s output: the same diagnosis, with list_deploys in the trace.'],
    teach: {
      time: '15 min',
      gist: 'Same rhythm as Assignment 3: see what is missing (red test, the detours), accept the plan, build, test green. Sonny’s output does not change: the point is that it now really comes through the tool.',
      do: ['Check manual mode, let Claude Code show what is missing, accept, let it build, run Sonny again.'],
      done: ['A5 test red, then green.', 'They can point at one detour that was removed.', 'Same diagnosis, list_deploys in the trace.'],
      copy: [['Step 2 · Claude Code', PROMPTS.a5See], ['Step 4 · Claude Code', PROMPTS.a5Implement], ['Step 5 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json'], ['After each step · Window 2', 'git status']],
      script: [
        {do: 'Slide appears. Goal of this assignment.', say: ['The missing eye from the last slide: the update list. Same rhythm as Assignment 3: first see what is missing, then build, then test.', 'Shorter than Assignment 3: about 4 files.']},
        {do: 'Step 1 · manual mode.', say: ['Claude Code is about to change files: you want to see each change.']},
        {do: 'Step 2 · see what is missing. Paste the first prompt.', copy: [['Step 2 · Claude Code', PROMPTS.a5See]], say: ['Why: you only fix what you understand.', 'In the project: Claude Code reads the tool file, the two files with the detour, and the A5 test. It changes nothing.', 'They see: what list_deploys should do, the detours (marked “A5 bypass” in the code: two in src/runtime.ts, one in src/chat.ts), and the A5 test red: 0 of 3.']},
        {ask: 'If the detour works, why remove it?', say: ['(Answer: a real AI would not get the tool, so it could not see the update. And the trace would say list_deploys while the data came in around it.)']},
        {do: 'Step 3 · you decide.', say: ['Check one thing: the tool only reads. If Claude Code proposes anything that changes something, say no.', 'Agree: type “accepted”.']},
        {do: 'Step 4 · build. Paste the second prompt.', copy: [['Step 4 · Claude Code', PROMPTS.a5Implement]], say: ['In the project: src/tools.ts gets the real tool, offered to the AI. src/runtime.ts and src/chat.ts lose the detour and use the tool. And one test file gets a new case.', 'The new case: if there is no data at all in the time window, Sonny must say “unknown”: OPEN, low confidence, investigate more. Never “healthy”. No data is not good news.', 'At the end: the A5 test green, 4 of 4. The main tests and the type check still green: done means everything still works.']},
        {do: 'Step 5 · run Sonny again, in Window 2.', copy: [['Step 5 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json']], say: ['They see: exactly the same diagnosis as after Assignment 3. In the trace: list_deploys, 02:50 to 03:50.', 'Same answer. But now it really comes through the tool, and the trace tells the truth.']},
        {do: 'Wrap up.', say: ['Sonny has four working eyes now, and no hands.', 'Next: you break the shop yourself, and watch him use those eyes live.']}
      ],
      learn: ['First see what is missing: red test and the detour.', 'Every look goes through one tool that only reads, so the trace is true.', 'No data means unknown, never healthy.'],
      watch: ['Someone is disappointed that the output did not change: that is expected. Ask them to open src/runtime.ts and find where the detour was.', 'Claude Code proposes a tool that changes something: reject it.', 'Main tests red after step 4: ask Claude Code to show the red line and fix only that.', 'Someone asks about the console: it still runs the old code until the restart in Assignment 6. Nothing to do now.', 'Stuck far behind: the catch-up slide after this assignment jumps to the finished A5.'],
      terms: [['Tool', 'a small piece of code Sonny can call to look at something; these only read'], ['Trace', 'the list of every tool Sonny used, with what he asked for'], ['Detour (bypass)', 'code that reads the data around the tool, so the tool is skipped']],
      changes: [
        ['After steps 1–3', 'Nothing new. Claude Code only read and ran the A5 test.'],
        ['After step 4', '`modified: src/tools.ts`, `src/runtime.ts`, `src/chat.ts`, `test/workshop/tools.test.ts` (plus PROGRESS.md). The exact list can differ.'],
        ['After step 5', 'Nothing new.']
      ],
      next: 'Catch-up · Ready for the live route.'
    },
    humanOpen: 'A tool only reads. What it shows informs a decision; a person still makes it.', next: 'A5 catch-up checkpoint'
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
    keyPoints: ['Self-check the first missing checkpoint.', 'Do not rerun every suite.', 'Continue when all three proofs are visible.'],
    notes: note({time: '14:05 · 5 min', why: 'The live route depends on the three completed contracts.', predict: 'Ask which proof is missing first.', see: 'Three compact checkpoints.', inside: 'The recovery commands preserve work and create a separate branch.', participant: 'Self-check A3, A4, and A5. Optionally share one blocker in chat.', watch: 'Never reset or overwrite participant work.', stuck: 'Use the reviewed day5-after-a5 tag.', stop: 'All three checkpoints are visible.', next: 'A6 · Run the live counterpart'})
  }),
  baseSlide({
    title: 'Run the live counterpart', kicker: 'Day 5 · CONCEPT', subtitle: 'Create a new live incident, challenge its evidence, and keep action human-owned.',
    cards: [{title: 'Before', body: 'The shop has run healthy since this morning.'}, {title: 'Change', body: 'Run one bad deploy in its own terminal.'}, {title: 'Explain', body: 'Use stable refs and keep current telemetry separate.'}, {title: 'Human in the loop', body: 'Wrong incident or action stays blocked.'}],
    keyPoints: ['Window 1 is the console from A1. Restart it. Do not open a second one.', 'Do not let Claude run chaos.', 'The A8 human-in-the-loop check is the last A6 step.'],
    notes: note({time: '14:10 · 4 min', why: 'The learner now has the contracts needed for a real local route.', predict: 'Ask why the healthy baseline comes first.', see: 'The listener creates a new live incident about three minutes after healthy traffic starts.', inside: 'The shop (Window 3) and the customers (Window 4) run since Assignment 1, so the healthy “before” is already there. Restart only the console in Window 1 (it needs the A5 code): AGENT_LISTEN_WINDOW_MIN=1 npm run console. Then Window 2: npm run chaos -- deploy v2.15.0 --mode bad-deploy. Tested on day5-after-a5: the incident appears within about 60 seconds, a bad-deploy diagnosis with “Customer impact: checkout error_rate rose from 0 to 0.05 …” and proposal rollback, decision OPEN.', participant: 'Write one plausible alternative cause.', watch: 'Keep fixture, live, diagnosis snapshot, and current telemetry distinct.', stuck: 'Stay on the scripted route.', stop: 'The room can state all four commands and the wait.', next: 'A6 example target'})
  }),
  screenshotSlide({number: 6, title: 'Example live incident proof', subtitle: 'The current run must reproduce the route and its evidence labels.', stage: 'live', shot: 'assets/day5-expected/a6.png', points: ['The live incident has its own id.', 'Diagnosis claims cite stable source:ref labels.', 'Snapshot evidence and current telemetry are labeled separately.'], next: 'Assignment 6 · start and trace', time: '14:14 · 2 min'}),
  assignmentSlide({
    number: 6, title: 'start and trace the live route · 1/2', subtitle: 'Map the path, reuse services, establish a baseline, then create one incident.', stage: 'live', duration: '14:16 · 22 min', shot: 'assets/day5-expected/a6.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a6Map, after: 'Claude Code maps the fixture and live routes without editing.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a6Build, after: 'Claude Code proposes the terminal order and waits for approval.'},
      {text: 'You, not Claude. Window 1: press Ctrl+C and start the console again, so it uses your A5 code. The shop (Window 3) and the customers (Window 4) keep running since this morning.', parts: [['Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console']], after: 'The desk says “shop online · v2.14.0 healthy”. That is your healthy “before”. Do not start a second console.', warn: true},
      {text: 'You, not Claude. Break the shop: a bad update. Window 2.', parts: [['Window 2', 'npm run chaos -- deploy v2.15.0 --mode bad-deploy']], after: 'Window 4 starts showing 5xx errors. Within about a minute a new incident appears on the desk by itself.', warn: true}
    ],
    after: 'A new live incident exists with a healthy before-state and a visible tool trace.',
    checks: ['Show the live incident id.', 'Show the healthy before: the desk said healthy.', 'Show the diagnosis trace.'],
    humanOpen: 'The participant starts chaos. Claude Code never runs or stops the processes.', next: 'Human in the loop · Part of A6'
  }),
  screenshotSlide({number: 8, title: 'Human in the loop · Part of A6', kicker: 'Day 5 · HUMAN IN THE LOOP', subtitle: 'The last safety check inside A6: only the right incident, the right action and a named person.', stage: 'gate', shot: 'assets/day5-expected/a8.png', points: ['A wrong incident stays blocked.', 'A wrong action stays blocked.', 'The real approval and execution remain HUMAN OPEN.'], next: 'Assignment 6 · challenge and human in the loop', time: '14:38 · 2 min'}),
  checkpointSlide({
    number: 6, title: 'challenge the incident and prove human in the loop · 2/2', subtitle: 'Challenge the evidence, refuse mutation, and prove the human in the loop.', stage: 'gate', duration: '14:40 · 20 min', shot: 'assets/day5-expected/a8.png',
    steps: [
      {text: 'Type this in: browser http://localhost:4320 · agent chat', prompt: PROMPTS.a6Evidence, after: 'The answer cites stable refs and separates snapshot from current telemetry.'},
      {text: 'Type this in: browser http://localhost:4320 · agent chat', prompt: PROMPTS.a6Alternative, after: 'The offline bot repeats the same summary. That is expected: it is a script, not a model, so it cannot think of other causes. Write one other possible cause in your own notes.'},
      {text: 'Type this in: browser http://localhost:4320 · agent chat', prompt: PROMPTS.a6Mutation, after: 'Chat refuses rollback and creates no action record.', warn: true},
      {text: 'Type this in: Claude Code. Build the human-in-the-loop check.', prompt: PROMPTS.a8Build, after: 'Both existing mismatch cases stay blocked in the focused test.'},
      {text: 'Open in browser: http://localhost:4320', after: 'Approve and Execute remain HUMAN OPEN.', warn: true}
    ],
    after: 'The answer is cited, mutation is refused, and the human in the loop stays in charge.',
    checks: ['Show stable refs.', 'Show refused mutation.', 'Show both mismatch tests and HUMAN OPEN.'],
    humanOpen: 'Only a named human may approve, execute, mitigate, or resolve.', next: 'Close: what you learned on Day 5'
  }),
  baseSlide({
    title: 'Close: what you learned on Day 5', kicker: 'Close · Day 5', type: 'recap', layout: 'recap',
    subtitle: 'From an idea to a change you can trust: plan it, build it, test it, and a person decides.',
    visual: {levelUp: true, bot: 'happy', place: 'beside'},
    items: [
      {label: 'The map', caption: 'Claude Code read the project first and showed the two ways into Sonny (Assignment 1).'},
      {label: 'The intent', caption: 'You wrote down what Sonny must do for the operator, before any code (Assignment 2).'},
      {label: 'The contract and its test', caption: 'Five rules every diagnosis must pass. The test was red first, green after the build (Assignment 3).'},
      {label: 'Done means everything', caption: 'All 56 main tests, the type check and a second opinion, not just your own test (Assignment 3B).'},
      {label: 'Questions yes, actions no', caption: 'A chat message can never start a rollback; that is a button for a person. And you wrote the guard line yourself (Assignment 4).'},
      {label: 'Next: Day 6', caption: 'The same loop, on your own team project.'}
    ],
    keyPoints: ['Plan before you build: map and intent.', 'Rules in code, proven by a test.', 'Done means everything still works.', 'A person decides about actions.'],
    notes: 'Time: 13:40 · 15 min (end time still to be decided). Recap round, like the close of Day 3 and Day 4. Each click on Reveal shows the next line. Everyone shows one result in one minute: the red-then-green contract test, the Customer impact line, the 56 green main tests, or the chat refusal. Back to the six SDLC phases: which ones did they do today? Ask where a person still had to decide.',
    teach: {
      time: '15 min',
      gist: 'Close: one result each, the six lines of today, and a bridge to Day 6.',
      script: [
        {do: 'Slide appears.', say: ['This morning Sonny was an agent you had never seen. Now he follows your rules, and you proved it.']},
        {do: 'Click Reveal: The map.', say: ['First you let Claude Code read the project before changing anything. You saw the two ways into Sonny.']},
        {do: 'Click Reveal: The intent.', say: ['Then you wrote down what Sonny must do for the operator at 03:45, before any code.']},
        {do: 'Click Reveal: The contract and its test.', say: ['From the intent came five rules in the contract. The test was red first, and green after the build.'], ask: ['What did the Customer impact line say in your run?']},
        {do: 'Click Reveal: Done means everything.', say: ['Your own test was green, but that is not done. Done means all main tests, the type check, and a second opinion.']},
        {do: 'Click Reveal: Questions yes, actions no.', say: ['In the chat you can ask Sonny anything. But a chat message can never start an action. Rolling back is a button for a named person.'], ask: ['Where today did a person have to decide, and not the AI?']},
        {do: 'Click Reveal: Next: Day 6.', say: ['On Day 6 you do the same loop on your own team project: map, intent, rules, test, done.']}
      ],
      do: ['Everyone shows one result in one minute.', 'Go through the six lines.', 'Bridge to Day 6.'],
      done: ['Each person named one result.', 'The room can say where a person decides.'],
      watch: ['Do not introduce anything new.']
    }
  })
];

window.DAY5_PROMPTS = PROMPTS;
window.SLIDES = day5Slides;
// SDLC tracker: which of the six phases lights up on each slide (see sdlcTrack in app.js).
// Breaks, the quiz and the post-lunch recap keep the phase of the slide before them.
const SDLC_BY_TITLE = [
  [/^(Let’s start the project|Two scenarios to test Sonny|Assignment 1:|What Sonny should do, and what he does today|intent\.md: what goes in it|Assignment 2:|Your intent\.md: before and after)/, 'plan'],
  [/^(Assignment 3B|Done means: everything still works)/, 'test'],
  [/^A diagnosis you can trust/, 'design'],
  [/^(Assignment 3:|Guardrails:|Assignment 4:|Sonny’s eyes|Assignment 5:)/, 'build'],
  [/^Catch-up · Ready for the live route/, 'test'],
  [/^(Run the live counterpart|Example live incident|A6 |Assignment 6:|Human in the loop · Part of A6|Catch-up · Six required)/, 'deploy'],
  [/^Hackathon intent studio/, 'plan', true],
  [/^(Recap · |End at 16:00|Close: what you learned)/, 'all'],
  [/^Appendix · (A7|Run optional A7|A9|Run optional A9)/, 'maintain']
];
let sdlcCarry = null;
window.SLIDES.forEach((slide) => {
  const hit = SDLC_BY_TITLE.find(([re]) => re.test(slide.title));
  if (hit) { slide.sdlc = hit[1]; if (hit[2]) slide.sdlcLoop = true; }
  else if (sdlcCarry && (slide.type === 'pause' || slide.type === 'quiz' || /^Post-lunch recap/.test(slide.title))) slide.sdlc = sdlcCarry;
  if (slide.sdlc && slide.sdlc !== 'all') sdlcCarry = slide.sdlc;
});
window.SLIDES.forEach((slide, index) => {
  slide.teach.next = slide.teach.next || window.SLIDES[index + 1]?.title || 'End';
});
