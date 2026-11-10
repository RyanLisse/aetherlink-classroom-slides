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
  a3BuildProve: `Run the main tests, typecheck, and the offline investigation. Show customer_impact in the exact CLI output and at http://localhost:4320. Keep unsupported versions, regions, and customer segments OPEN. Report any failure before editing again. Do not push.`,
  a3Verify: `/verify-this Verify this claim: the A3 verdict contract cannot pass without non-empty customer_impact and the offline investigation still reports customer impact. Use the accepted spec, the focused A3 test, the main tests, typecheck, and the offline output. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with file and output references. Stay read-only.`,
  a4Chat: `Read intent.md, src/chat.ts, and test/workshop/chat.test.ts. Explain the chat-refusal contract. Add a named MUTATION regex constant. Keep the full A6 evidence question ending with "Do not approve or execute anything." read-only. Refuse "Do not approve and roll back now." as a mutation. Show the focused chat test red, then implement only TODO(A4) in src/chat.ts. Rerun the focused chat test and show its output and the diff. Do not inspect approvals/audit.jsonl or edit .claude/, approvals/, lessons/lessons.md, PROGRESS.md, or bench/ratchet.json. Stop before the human hook step.`,
  a4Review: `Read the human edit in .claude/hooks/guard.mjs and test/workshop/guard.test.ts. Do not edit either file. Run only the focused guard test. Explain whether Edit and Write to bench/ratchet.json are denied. Do not claim that the hook blocks every shell command. Stop for my review.`,
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

const baseSlide = ({title, kicker, subtitle, type = 'concept', cards = [], keyPoints = [], notes, stage, beat, visual, layout, items, tagline, prompt, stepsHeading, steps, expected, repo, source, teach, mode, calm, assignmentId, detail}) => ({
  title, kicker, subtitle, type, cards, keyPoints, notes, stage, beat, visual, layout, items, tagline, prompt, stepsHeading, steps, expected, repo, source, mode, calm, assignmentId, detail,
  teach: teach || teachFromNotes({title, subtitle, keyPoints, notes})
});

const assignmentSlide = ({number, title, subtitle, stage, duration, steps, after, checks, humanOpen, next, shot, teach, shotLabel}) => baseSlide({
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
        {say: ['Today the agent gets a new job: something breaks in a web shop.', 'The agent helps find out why.', 'Before anything changes, it asks you. You stay in control.']}
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
    notes: 'Time: 10:00 · 3 min. The alert text matches the terminal in A1: “Error rate 12% for 5 min on checkout (threshold 2%)”. The cause (update d-4821 reads a missing secret key for EU payments) is what the agent finds. Do not tell the room yet.',
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
        {ask: 'And what should he never do without you?', say: ['(Answers: roll back on his own, change production, close the incident.)', 'Keep these in mind too: they come back two slides later.']}
      ],
      learn: ['An incident starts with an alert: here, 12% of payments fail right after an update.', 'A global shop has customers awake at every hour, so every minute counts.', 'Sonny gets the same alert as the operator. What he may and may not do on his own is a choice we make.'],
      watch: ['Do not reveal the cause yet (a missing EU payment key). On the next slide Sonny finds it.', 'Keep it a story. No technical words yet.'],
      terms: [['Operator', 'the on-call engineer: the person who gets the alert and decides what happens'], ['Alert', 'the message that starts an incident'], ['Incident', 'the problem, with a number: INC-1001'], ['Checkout', 'the payment step of a web shop'], ['Update (deploy)', 'putting a new version of the software live']],
      next: 'how we want Sonny to work.'
    }
  }),
  baseSlide({
    title: 'How we want Sonny to work', kicker: 'Day 5 · THE ON-CALL AGENT', subtitle: 'He looks where you would look, writes down what he found, and proposes one fix. Then he asks you.', type: 'context',
    visual: {agentJob: {
      botTag: 'SONNY',
      looks: [['📈', 'the graphs'], ['🚀', 'the latest updates'], ['🧩', 'what changed in the code'], ['📜', 'the error messages']],
      docName: 'diagnosis · INC-1001',
      doc: [['What’s happening', 'failed payments jumped from 0.3% to 12% at 03:45, two minutes after update v2.15.0', 'metrics:03:45'], ['Root cause (high)', 'the update changed the EU payment settings, and the error log says a key for EU payments is missing', ['deploys:d-4821', 'diff:d-4821', 'logs:03:45:03']], ['Proposed fix', 'roll back to v2.14.0, then watch the error rate']],
      wait: 'waiting for the operator', yes: 'Approve', no: 'Reject'
    }, reveal: 'click', covers: []},
    cards: [{title: 'He looks', body: 'At the graphs, the updates, the code and the errors. He only reads. He changes nothing.'}, {title: 'He writes a diagnosis', body: 'What is wrong, the evidence for it, and one proposed fix.'}, {title: 'He asks you', body: 'Nothing changes until you approve. That is human in the loop.'}],
    tagline: 'Sonny proposes, you decide. Today you build Sonny, with Claude Code.',
    keyPoints: ['Sonny looks where you would look. He only reads.', 'He writes a diagnosis with evidence and one proposed fix.', 'He asks the operator: human in the loop.'],
    notes: 'Time: 10:03 · 3 min. Merges the old slides “Meet the builder and the product” and “What the on-call agent does”. The diagnosis lines come from the real offline output of npm run investigate -- fixtures/incidents/bad-deploy.json (A1 step 7), shortened: the labels are metrics:2026-10-05T03:45:00.000Z, deploys:d-4821, diff:d-4821, logs:2026-10-05T03:45:03.000Z (PaymentConfigError: missing key PAYMENT_PROVIDER_SECRET_EU). The terminal headings are “What’s happening”, “Root cause (high)” and “Proposed fix”. The real text calls the update a candidate cause and keeps non-deploy causes OPEN. Today the agent runs offline on scripted answers (src/runtime.ts): free and the same for everyone. A real model is optional (appendix).',
    teach: {
      time: '3 min',
      openShot: 'assets/day5-jessy-teach/s4-3.webp',
      gist: 'How we want Sonny to work: he looks, writes a diagnosis with evidence, proposes one fix, and asks the operator. Sonny proposes, you decide.',
      script: [
        {do: 'Slide appears with three closed blocks. Point back at the answers from the last slide.', say: ['You just said what you expect Sonny to do. Let us see how we want him to work.', 'At 03:45, half awake, these checks take you a while. Sonny does them before you are even at your laptop.']},
        {shot: 'assets/day5-jessy-teach/s4-1.webp', do: 'Click block 1. The four checks pop up.', say: ['He looks where you would look: the graphs, the latest updates, what changed in the code, the error messages.', 'He only reads. He changes nothing.']},
        {shot: 'assets/day5-jessy-teach/s4-2.webp', do: 'Click block 2. The diagnosis appears line by line.', say: ['Then he writes a diagnosis. These lines come from the real output you will see yourself in Assignment 1.', 'What is happening: failed payments jumped to 12%, two minutes after an update.', 'The root cause, with four pieces of evidence: the graph, the update list, the code change, the error log. The small blue labels say where he found each one, so you can check it yourself.', 'And one proposed fix: roll back to the version from before the update, then watch the error rate.']},
        {shot: 'assets/day5-jessy-teach/s4-3.webp', do: 'Click block 3.', say: ['And then he asks you, the operator.', 'Nothing changes until you approve. That is human in the loop: you know it from Day 3 and 4.']},
        {ask: 'Which of your answers from the last slide do you see back here?', say: ['(Point at the matches: looking at what changed, the errors, proposing a fix.)']},
        {ask: 'Why would he ask, if he already knows the fix?', say: ['(Answer: he could be wrong, and you are responsible for production. Next slide.)']},
        {do: 'Point at the line at the bottom.', say: ['Sonny proposes, you decide.', 'Today you build Sonny. Claude Code, from Day 1 and 2, helps you build him.']}
      ],
      learn: ['Sonny does the first checks for the operator. He only reads.', 'He writes a diagnosis with evidence and one proposed fix.', 'He changes nothing himself: the operator approves or rejects. That is human in the loop.', 'Claude Code helps you build Sonny; Sonny is what you build.'],
      watch: ['Someone asks if Sonny is a real AI: today he runs offline on scripted answers, so everyone gets the same result and it costs nothing. Running him on Claude Sonnet is optional, at the end.', 'Do not explain rollback in depth yet. One line is enough: going back to the version before the update.'],
      terms: [['Sonny', 'our name for the on-call agent: the AI you build today'], ['Human in the loop', 'a person approves before anything changes'], ['Diagnosis', 'what the agent writes about the incident: what is wrong, the evidence, one proposed fix'], ['Evidence', 'one line of data that shows something: where it is, and which entry'], ['Proposed fix', 'the one step the agent suggests, for example a rollback'], ['Rollback', 'putting the previous version back live']],
      next: 'would you trust Sonny at 03:45?'
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
    cards: [{title: 'Incident', body: 'A problem in the shop, with a number and a status.'}, {title: 'Fixture', body: 'A saved, made-up incident with all its data. Everyone gets the same case, every time.'}, {title: 'Telemetry', body: 'What the shop records about itself: graphs, updates and error logs. Sonny reads it.'}, {title: 'Diagnosis', body: 'What Sonny writes: what is happening, the root cause with evidence, one proposed fix.'}, {title: 'Evidence', body: 'One line of data that shows something: where it is, and which entry.'}, {title: 'OPEN', body: 'Not known or not decided yet. Sonny writes OPEN instead of guessing.'}, {title: 'Proposed fix', body: 'The one step Sonny suggests. A proposal, not an action.'}, {title: 'Approval', body: 'A named person approves or rejects one proposed fix for one incident. Sonny only drafts it.'}],
    keyPoints: ['A fixture is a saved incident: the same case for everyone.', 'Sonny writes OPEN instead of guessing.', 'A proposed fix is not an action. Only a person approves or rejects it.'],
    notes: 'Time: 10:06 · 3 min. Words taken from the repo (README “Shared terms”: incident, fixture, proposal, approval) plus what participants see in the terminal in A1 (telemetry, evidence, OPEN). The code says “verdict” for diagnosis and “proposal” for proposed fix: mention that once, in Assignment 3. Rule, contract and test come in Assignment 3. Approval in the repo (approvals/README.md): one record per incident and proposal; Sonny writes a pending draft with decided_by: "OPEN"; a pending draft is not an approval. The rollback program (src/executor.ts) only continues when incident, proposal, decision “approved” and a named person all match. Running the rollback is a separate step after the approval.',
    teach: {
      time: '3 min',
      openShot: 'assets/day5-jessy-teach/s5-5.webp',
      gist: 'Eight words from the project and the terminal, each with one meaning for the whole day.',
      script: [
        {do: 'Slide appears with eight closed blocks.', say: ['Eight words you will meet today, in the project and in the terminal.', 'Let us agree what they mean, so everyone means the same thing.']},
        {shot: 'assets/day5-jessy-teach/s5-1.webp', do: 'Click Incident and Fixture.', say: ['An incident: a problem in the shop, with a number. INC-1001 is the one from 03:45.', 'A fixture: a saved, made-up copy of that incident, with all its data. Like a recording.', 'So everyone in the room gets exactly the same case. You will start it with that file name.']},
        {shot: 'assets/day5-jessy-teach/s5-2.webp', do: 'Click Telemetry.', say: ['Telemetry: what the shop records about itself. The graphs, the list of updates, the error logs.', 'That is what Sonny reads. In the fixture it is saved too.']},
        {shot: 'assets/day5-jessy-teach/s5-3.webp', do: 'Click Diagnosis and Evidence.', say: ['The diagnosis is what Sonny writes about the incident.', 'Evidence is one line of data that shows something: where it is, and which entry. deploys:d-4821 means: the update list, update d-4821.']},
        {shot: 'assets/day5-jessy-teach/s5-4.webp', do: 'Click OPEN.', say: ['OPEN: Sonny does not know it yet, or nobody has decided yet.', 'For example: which regions are hit? The data does not say, so Sonny writes OPEN instead of guessing.']},
        {shot: 'assets/day5-jessy-teach/s5-5.webp', do: 'Click Proposed fix and Approval.', say: ['The proposed fix is the one step Sonny suggests. A proposal, not an action.', 'An approval: a named person approves or rejects that one fix, for that one incident. Sonny only drafts it. Until a person signs, it says OPEN.']},
        {ask: 'Sonny proposes a rollback and drafts the approval. Has anything changed in the shop?', say: ['(Answer: no. The draft says OPEN until a person approves. Without that, the rollback is refused.)']},
        {say: ['Three more words come in Assignment 3: rule, contract and test. We explain them when you need them.']}
      ],
      learn: ['Incident, fixture, telemetry, diagnosis, evidence, OPEN, proposed fix, approval: one meaning each.', 'A fixture is a saved incident, so everyone gets the same case.', 'A proposed fix is not an action: a named person approves or rejects it.'],
      watch: ['Do not add rule, contract and test here: they come in Assignment 3.', 'Someone sees “verdict” or “proposal” in the code: the code’s words for diagnosis and proposed fix.', 'Approval is not the rollback itself. After an approval, running the rollback is still a separate step.'],
      terms: [['Verdict', 'the code’s word for diagnosis'], ['Proposal', 'the code’s word for proposed fix'], ['Rollback', 'putting the previous version back live']],
      next: 'would you trust Sonny at 03:45?'
    }
  }),
  baseSlide({
    title: 'The software development life cycle (SDLC)', kicker: 'Day 5 · THE PROCESS', subtitle: 'Six steps every piece of software goes through, from idea to running and getting better.', type: 'concept',
    visual: {sdlcLine: true},
    cards: [
      {title: 'What do we want, and what not?', body: 'Goals, limits, and who it is for.'},
      {title: 'How should it work?', body: 'The parts, and how they work together.'},
      {title: 'Make it', body: 'Write the code.'},
      {title: 'Does it do what we agreed?', body: 'Proof, not a feeling.'},
      {title: 'Put it live', body: 'Real users start using it.'},
      {title: 'Keep it running, and learn', body: 'Fix, improve, and start again at Plan.'}
    ],
    keyPoints: ['Plan, Design, Build, Test, Deploy, Maintain.', 'The six dots at the top of each slide show where we are.', 'Day 6 and 7: the same six steps with your own project.'],
    notes: 'Time: 10:09 · 3 min. Each click (→) lights the next dot and shows its card. Clicking a dot jumps to that step; the current dot is orange. Source: the AI-native SDLC playbook (https://claude.com/resources/articles/the-ai-native-sdlc-playbook).',
    teach: {
      time: '3 min',
      gist: 'The six steps all software goes through, on one line. The same line is at the top of every slide today.',
      script: [
        {do: 'Slide appears: six grey dots on one line.', say: ['How do you build software you can trust?', 'All software goes through the same six steps. That is the SDLC: software development life cycle.']},
        {do: 'Click: Plan lights up.', say: ['Plan: decide what it must do, and what not.']},
        {do: 'Click: Design.', say: ['Design: decide how it will work.']},
        {do: 'Click: Build.', say: ['Build: write the code.']},
        {do: 'Click: Test.', say: ['Test: show that it does what was agreed. Proof, not a feeling.']},
        {do: 'Click: Deploy.', say: ['Deploy: put it live for real users.']},
        {do: 'Click: Maintain.', say: ['Maintain: keep it running, and learn from what went wrong.', 'That feeds the next Plan, and you go round again.']},
        {ask: 'Claude Code can help in every step. Why is a person still needed?', say: ['(Answer: AI can be wrong, and someone is responsible for what goes live.)']},
        {do: 'Click any dot to jump back to that step (it turns orange).', say: ['From the next slides on, this line is small at the top right of every slide.', 'The lit dot shows where we are.', 'Day 6 and 7, the hackathon: the same six steps with your own project. Today is the practice round.']}
      ],
      learn: ['SDLC = the six steps all software goes through: Plan, Design, Build, Test, Deploy, Maintain.', 'Today you go through them once.', 'The dots at the top of each slide show the current step.'],
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
      {items: [['A3 · 2/2', 'Prove A3 with fresh evidence'], ['Catch-up', 'Everything works before going live']]},
      {items: [['A6', 'Break the shop, live']]},
      {optional: true, items: [['A7', 'More test cases', true], ['A9', 'A lesson and a handoff note', true]]}
    ]},
    cards: [
      {title: 'Plan', body: 'You know the project and what Sonny must do.'},
      {title: 'Design', body: 'Everyone agrees what a good diagnosis contains.'},
      {title: 'Build', body: 'Sonny follows the rules, refuses fixes in the chat and can look up updates.'},
      {title: 'Test', body: 'Proof that it works, before it goes live.'},
      {title: 'Deploy', body: 'Sonny investigates a live incident. A person approves.'},
      {title: 'Maintain', body: ''}
    ],
    keyPoints: ['The six steps, now with today’s assignments.', 'Each assignment builds on the one before.', 'Maintain (A7, A9) is optional, for who is fast.'],
    notes: 'Time: 10:12 · 2 min. Required route: A1–A6. Test = the second part of A3 and the catch-up before A6. A7 (more test cases) and A9 (lesson + handoff) are optional appendix work. The human-in-the-loop part (once called A8) is inside A6. → or a click moves to the next step; the next → after Maintain goes to the next slide.',
    teach: {
      time: '2 min',
      gist: 'Today’s route: which assignment belongs to which of the six steps.',
      script: [
        {do: 'Slide appears. Plan is lit, Sonny stands on it.', say: ['The same six dots, now with today’s assignments under them.', 'Sonny walks along with us: with each click he moves to the next step.']},
        {do: 'Plan.', say: ['Plan: A1 and A2.', 'First find out what Sonny is today, then write down what he must do.']},
        {do: 'Press → : Design.', say: ['Design: in A3 you first agree on the rules for a good diagnosis.', 'For example: always say what customers notice.']},
        {do: 'Press → : Build.', say: ['Build: A3 builds those rules.', 'A4: Sonny says no when someone types “Roll back now” in the chat.', 'A5: a tool so he can look up the updates.']},
        {do: 'Press → : Test.', say: ['Test: prove A3 with fresh evidence, and make sure everything works before we go live.']},
        {do: 'Press → : Deploy.', say: ['Deploy: A6. You break the shop yourself, and Sonny investigates live.']},
        {do: 'Press → : Maintain (dashed).', say: ['Maintain: A7 and A9 are extras for who is fast.']},
        {ask: 'In which step do you first see Sonny work on a live shop?', say: ['(Answer: Deploy, in A6. Before that he works on a saved incident.)']}
      ],
      learn: ['Today follows the six steps: Plan, Design, Build, Test, Deploy, Maintain.', 'Each assignment builds on the one before.', 'Maintain is optional today.'],
      watch: ['Do not explain each assignment in depth: each has its own slides.', 'Do not call A7 or A9 required.', 'One more → after Maintain goes to the next slide.'],
      terms: [['Diagnosis', 'what Sonny writes: what is happening, the root cause with evidence, one proposed fix']],
      next: 'where Sonny’s incidents come from: morning a fixture, afternoon live.'
    }
  }),
  baseSlide({
    title: 'Morning: a fixture. Afternoon: live.', kicker: 'Day 5 · HOW THE DAY RUNS', subtitle: 'Sonny gets incidents in two ways. In the morning nothing breaks: you practise on a saved incident. In the afternoon you break the shop yourself.', type: 'context',
    visual: {doors: [
      {icon: 'replay', color: 'var(--violet)', when: 'Morning · A1–A5'},
      {icon: 'alert', color: '#ff6b6b', when: 'Afternoon · A6'},
      {icon: 'trace', color: 'var(--aether-orange)', when: 'All day'}
    ]},
    cards: [{title: 'The fixture: INC-1001', body: 'A saved, made-up incident with all its data: graphs, updates, logs. The shop is not involved. One command hands it to Sonny: the same for everyone, every time.'}, {title: 'Live from the shop', body: 'The shop runs on your laptop and fake customers keep paying. You push a bad update on purpose. The console sees the errors and makes a new incident with a new number.'}, {title: 'Sonny handles both the same way', body: 'Same Sonny, same steps. So what you build on the fixture in the morning also works live.'}],
    keyPoints: ['Morning: practise on the fixture INC-1001. Nothing breaks.', 'Afternoon: you break the shop, a live incident gets a new number.', 'Sonny handles both the same way.'],
    notes: 'Time: 10:17 · 2 min. Fixture: npm run investigate -- fixtures/incidents/bad-deploy.json → src/cli.ts → investigate() in src/agent.ts. Its data lives in fixtures/telemetry/. Live: the console (console/server.ts) listens for alerts, creates a new incident (INC-<digits>) and investigates through src/chat.ts → investigate() in src/agent.ts. Claude Code draws both routes in A1.',
    teach: {
      time: '2 min',
      gist: 'Morning on a fixture (nothing breaks), afternoon live (you break the shop). Sonny handles both the same way.',
      script: [
        {do: 'Slide appears.', say: ['Before we look inside Sonny: how do incidents get to him?', 'Two ways. This decides how the whole day runs.']},
        {do: 'Point at The fixture.', say: ['Morning: nothing breaks.', 'INC-1001 is a fixture: a saved, made-up incident with all its data, the graphs, the updates, the logs.', 'The shop is not involved. One command hands it to Sonny.', 'Same for everyone, every time. So after each change you run it again and compare.']},
        {do: 'Point at Live from the shop.', say: ['Afternoon, in A6: the shop runs on your laptop and fake customers keep paying.', 'You push a bad update on purpose.', 'The console sees the errors by itself and makes a new incident, with a new number.']},
        {do: 'Point at Sonny handles both the same way.', say: ['Both go to the same Sonny, who takes the same steps.', 'So what you build on the fixture in the morning works live in the afternoon.']},
        {ask: 'This afternoon a live incident appears. Will it be INC-1001?', say: ['(Answer: no. INC-1001 is the fixture. A live incident gets a new number.)']}
      ],
      learn: ['Morning: the fixture INC-1001. Nothing breaks.', 'Afternoon: you break the shop. A live incident gets its own number.', 'Sonny handles both the same way.'],
      watch: ['Do not reveal what the bad update breaks.', 'Do not open the files now: Claude Code draws both routes in A1.'],
      terms: [['Fixture', 'a saved, made-up incident with all its data; the same case for everyone, every time'], ['Fake customers', 'a small script that keeps placing orders, so the shop has traffic'], ['Bad update', 'a new version of the shop that contains a mistake']],
      next: 'what happens inside Sonny, and what is still missing.'
    }
  }),
  baseSlide({
    title: 'Sonny already runs. Today you make him safe to trust.', kicker: 'Day 5 · SONNY’S MAP', subtitle: 'Five steps, from the alert to your decision. Each piece you build today has its own place here.', type: 'context',
    visual: {reveal: 'click', covers: [], plIntro: 'First A1: look at all five steps. Then A2: write down what Sonny must do.', pipeline: [
      {have: [['ok', 'from the fixture (morning) or from the shop you break (afternoon)']]},
      {have: [['ok', 'graphs, code change, error logs'], ['todo', 'a proper tool to look up the updates. Today he uses a temporary shortcut.', 'A5']]},
      {have: [['ok', 'what is happening, the cause with evidence, one proposed fix']]},
      {hl: true, gate: 'only if every rule is met', have: [['ok', 'every diagnosis goes through it'], ['todo', 'there are no rules yet, so today every diagnosis goes through, even a bad one. You write the five rules.', 'A3']]},
      {have: [['ok', 'you read it and ask questions in the chat'], ['todo', 'Sonny must refuse “roll back now” typed in the chat', 'A4'], ['todo', 'the rollback only runs after a named person approves it', 'A6']]}
    ]},
    cards: [
      {title: 'An alert comes in', body: 'Checkout errors at 12%.'},
      {title: 'Sonny reads the data', body: 'Only reading. He changes nothing.'},
      {title: 'He writes a diagnosis', body: 'In plain words, with evidence.'},
      {title: 'The contract checks it, before you see it', body: 'Breaks a rule? You see which one.'},
      {title: 'You decide', body: 'Human in the loop: approve or reject the proposed fix.'}
    ],
    tagline: 'In Assignment 1 you see 14 red tests: exactly these pieces. Red means still to build, not broken.',
    keyPoints: ['Sonny proposes, the contract lets through only a diagnosis that meets every rule, then you decide.', 'Each piece you build today has its place in this flow, and its own red tests.', 'This map comes back before every assignment.'],
    notes: 'Time: 10:17 · 3 min. Each click opens the next step. Files (A1 shows them): 1 src/cli.ts (fixture) · console/server.ts (live) · 2 src/tools.ts · 3 src/agent.ts · 4 src/contract.ts · 5 terminal and console. Facts (workshop/start): the contract is parseVerdict in src/contract.ts with TODO(A3); it is wired in (validateVerdict in src/router.ts, called from investigate() in src/agent.ts), so every diagnosis prints “PASS contract” today. A5: list_deploys in src/tools.ts returns [] (TODO(A5)); until then src/runtime.ts and src/chat.ts read the updates directly (“A5 bypass” comments), so the morning works without it. A5 sits in the afternoon next to A4 because both are about limits (what Sonny may be told, what he may look at), and it must be done before the live run. A4: TODO(A4) in src/chat.ts plus a guard that protects bench/ratchet.json. A6: checkApproval in src/executor.ts (the tests call it A8). Red at the start: 14 workshop tests.',
    teach: {
      time: '3 min',
      gist: 'Sonny already runs from start to end, but nothing makes him safe to trust yet. A diagnosis must meet every rule of the contract before it gets to you: that is human in the loop.',
      script: [
        {do: 'Slide appears: five closed blocks, one line above them.', say: ['We know how incidents get to Sonny. Now: what happens inside him?', 'Five steps, from the alert to your decision.', 'He already runs from start to end. But nothing makes him safe to trust yet. That is today’s work.']},
        {do: 'Point at the line above the blocks.', say: ['First A1: you look at all five steps. Then A2: you write down what Sonny must do.', 'From A3 on, every assignment builds one piece, at its own place.']},
        {do: 'Click: An alert comes in.', say: ['That already works: from the fixture in the morning, or from the shop you break in the afternoon.']},
        {do: 'Click: Sonny reads the data.', say: ['He reads the graphs, the code change and the error logs. Only reading.', 'For the update list he uses a temporary shortcut today. In A5 you build a proper tool for it.']},
        {do: 'Click: He writes a diagnosis.', say: ['That works: what is happening, the cause with evidence, one proposed fix.']},
        {do: 'Click: The contract checks it (orange).', say: ['“Contract” is a normal software word: the rules something must meet.', 'Here: the rules every diagnosis must meet before you see it.', 'The contract is already wired in: every diagnosis goes through it. But it has no rules yet. So today every diagnosis goes through, even a bad one.', 'In A3 you write the five rules.']},
        {do: 'Point at the orange marker “only if every rule is met”.', say: ['This is the heart of it.', 'Only a diagnosis that meets every rule goes on to you. Breaks a rule? You see which one.', 'Why? An AI can sound very sure without evidence. So plain code checks first, and you decide with a diagnosis you can trust.']},
        {do: 'Click: You decide.', say: ['You read it and ask questions in the chat. That works.', 'A4: if someone types “roll back now” in the chat, Sonny must refuse. Actions are buttons a person clicks.', 'A6: the rollback only runs after a named person approves it.', 'Sonny proposes, the contract checks, you decide. That is human in the loop.']},
        {ask: 'Why not let the operator check everything themselves?', say: ['(Answer: at 03:45, under stress, you miss things. The contract checks the same rules every time, so you can spend your attention on the decision.)']},
        {do: 'Point at the line at the bottom.', say: ['In Assignment 1 you see 14 red tests: exactly these pieces. Red means still to build, not broken.', 'This map comes back before every assignment, with that assignment’s piece lit.']}
      ],
      learn: ['Sonny proposes → the contract lets through only a diagnosis that meets every rule → the operator decides. That is human in the loop.', 'Already there: the alert, reading the data, writing the diagnosis, the chat.', 'Still to build: the update tool (A5), the contract’s rules (A3), refusing “roll back now” in the chat (A4), approval before the rollback runs (A6).'],
      watch: ['Someone asks why A5 comes so late: the shortcut keeps the morning working; A5 replaces it before the live run, next to A4 (both are about limits).', '“Contract” confuses someone: it is the set of rules a diagnosis must meet; Java developers know it from design by contract.', 'Someone asks about “A8” in the tests: that is the approval piece, part of A6.'],
      terms: [['Contract', 'the five rules together, as code; every diagnosis must meet them before the operator sees it'], ['Tool', 'a small function Sonny may call to read data, like the update list'], ['Red test', 'a test for a piece that is not built yet']],
      next: 'Assignment 1 starts with research.'
    }
  }),
  baseSlide({
    title: 'A1 · Before you build: find out what Sonny is today', kicker: 'Day 5 · A1 · RESEARCH', subtitle: 'Like a new team member: first look, then build. Nothing to type yet. You answer these four questions in Assignment 1.', type: 'concept',
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
        {do: 'Click: What can he not do yet?', say: ['What can he not do yet: the red tests, the missing pieces from the map.', 'And what must he never do without you? Look for “OPEN: a human decides” at the end of his diagnosis.']},
        {ask: 'Why not start building straight away?', say: ['(Answer: you would change code you do not understand, in a project you have not seen run.)']},
        {say: ['Nothing to type yet. First we get the project on your laptop.']}
      ],
      learn: ['A1 = research before building.', 'Four questions: does it run, where does an incident come in, what does Sonny do now, what can he not do yet.', 'You change nothing in A1.'],
      watch: ['Someone starts typing: nothing to do on this slide yet.', 'Keep it short: the answers come in the next slides and in Assignment 1.'],
      terms: [['Research', 'looking before you change anything: read, run, observe']],
      next: 'let’s start the project.'
    }
  }),
  baseSlide({
    title: 'Let’s start the project', kicker: 'Day 5 · A1 · RESEARCH · SET UP', subtitle: 'Get your own copy of the project and open Claude Code in it. We do this together, step by step.', type: 'context', layout: 'exercise', mode: 'manual', calm: true,
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
    notes: 'Time: 10:13 · 7 min. Do it together, one step at a time. Node 22.13+ is needed because the project stores incidents with node:sqlite, which older Node versions do not have (npm test fails on store.test.ts, the console cannot save incidents).',
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
    title: 'A tour of the project', kicker: 'Day 5 · A1 · RESEARCH · TOUR', subtitle: 'Where everything lives. Open your own sre-oncall-agent folder and follow along.', type: 'context',
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
    notes: 'Time: 10:22 · 4 min. Trainer demo: open the sre-oncall-agent folder in your editor or file explorer on the projector. Other folders (bench/, lessons/, approvals/, course/, scripts/, skills/) come back in the optional parts or are for the trainer; skip them unless asked.',
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
        [2, 'verify-this/', 'checks a claim with fresh proof', 'A3', 'hl'],
        [2, 'handoff/', 'writes a note for the next person', 'extra', 'hl'],
        [2, '+ 4 more we do not use today', '', '', 'more']
      ]}
    ]},
    cards: [{title: 'Claude Code’s skills: they help you build', body: 'Type / in Claude Code and you see them in the list, for example /show-me.'}],
    tagline: 'Try it now: type / in Claude Code and find show-me.',
    keyPoints: ['A skill is a written set of steps.', 'You start one with a slash: /show-me.', 'Each skill is a plain SKILL.md file in .claude/skills/.'],
    notes: 'Time: 10:20 · 2 min. Nine skills in .claude/skills/: show-me, design-control-loop, verify-this and handoff are used in the assignments; grilling, incident-triage, review-and-ship and visual-pr are not. The product runbook skills/triage/SKILL.md is team-owned and only read in real-model mode (src/prompts.ts); do not read its “Things that have burned us” list aloud, it hints at today’s cause.',
    teach: {
      time: '2 min',
      gist: 'Four ready skills for Claude Code. You start one with a slash. Check that everyone sees /show-me before A1.',
      script: [
        {do: 'Slide appears.', say: ['You know skills from Day 2: a written set of steps that Claude Code follows.', 'Four are ready in this project.']},
        {do: 'Point at the folder tree.', say: ['Remember the .claude folder from the tour? They live in .claude/skills/, one folder per skill.', 'Each folder has a SKILL.md: plain text you can open and read.']},
        {do: 'Point at the four highlighted skills, top to bottom.', say: ['/show-me: draws how the code works. First one, in A1.', '/design-control-loop: asks you questions and writes the plan. A2.', '/verify-this: checks a claim with fresh proof. A3.', '/handoff: writes a note for the next person. In the extra part.']},
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
    number: 1, title: 'Get to know the project, and check that it works', subtitle: 'Let Claude Code show you around. Change nothing yet.', stage: 'learn', duration: '10:30 · 18 min', shot: 'assets/day5-expected/a1.png', shotLabel: 'What you should see at the end',
    steps: [
      {text: 'First check the mode: the bottom of Claude Code says “manual mode on”.', after: 'Not there? Press Shift+Tab until it is. Claude Code now asks before every change.', warn: true},
      {text: 'Type this in: Claude Code. Goal: a map of how an incident gets in.', prompt: PROMPTS.a1Map, after: 'A diagram with two routes: the saved incident via src/cli.ts, and a live alert via console/server.ts and src/chat.ts. Both reach investigate in src/agent.ts. Nothing changes.'},
      {text: 'Type this in: Claude Code. Goal: get the project ready (Node, packages, sample data).', prompt: PROMPTS.a1Setup, after: 'Claude Code shows the commands and results, then stops for your review.'},
      {text: 'Type this in: Claude Code. Goal: check the starting point.', prompt: PROMPTS.a1SetupChecks, after: 'Main tests: 56 pass. Workshop tests: 6 pass, 14 red. The red ones are your to-do list (A8 = the human-in-the-loop check, part of A6). Do not fix them.'},
      {text: 'Type this in: a new terminal window, Window 1 (Git Bash on Windows). You start the console yourself, not Claude. Keep this window open all day.', prompt: 'AGENT_LISTEN_WINDOW_MIN=1 npm run console', after: 'You see “on-call console http://localhost:4320”. Leave Window 1 running. Error “No such built-in module: node:sqlite”? This window uses an older Node: run nvm use 22 (or install Node 22), then start again.', warn: true},
      {text: 'Open in browser: http://localhost:4320', after: 'The console opens. The top shows the shop, telemetry and “listening”.'},
      {text: 'Type this in: a new terminal window, Window 2 (Git Bash on Windows). Goal: watch your agent investigate the saved incident INC-1001.', prompt: 'npm run investigate -- fixtures/incidents/bad-deploy.json', after: 'The agent calls four tools, then prints a diagnosis: update v2.15.0, missing key PAYMENT_PROVIDER_SECRET_EU, proposed fix: rollback. Notice: no “Customer impact” line yet. That is A3.'}
    ],
    after: 'You can explain both routes into the agent and have seen it investigate INC-1001. 56 tests are green, 14 are red (your to-do list), and the console runs.',
    checks: ['You can explain both routes into the agent.', '56 main tests pass, 14 workshop tests are red.', 'The console runs, and you saw the diagnosis for INC-1001.'],
    humanOpen: 'Change nothing yet. The red tests are for the next assignments.', next: 'A2 · First write down what the agent must do',
    teach: {
      time: '18 min',
      gist: 'Research before you build: does it run, where does an incident come in, what does Sonny do now, what can he not do yet. Plus the console for all day. Change nothing yet.',
      do: ['Check manual mode, ask for the map, get the project ready, run the tests, start the console, run the agent on INC-1001.'],
      done: ['They can explain both routes into the agent.', '56 green, 14 red.', 'The console runs at localhost:4320.', 'They saw the INC-1001 diagnosis (without Customer impact).'],
      copy: [['Step 2 · Claude Code', PROMPTS.a1Map], ['Step 3 · Claude Code', PROMPTS.a1Setup], ['Step 4 · Claude Code', PROMPTS.a1SetupChecks], ['Step 5 · Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console'], ['Step 6 · Browser', 'http://localhost:4320'], ['Step 7 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json'], ['After each step · Window 2', 'git status']],
      script: [
        {do: 'Slide appears. Goal of A1.', say: ['Now the research itself: the four questions from before.', 'Does it run? Where does an incident come in? What does Sonny do now? What can he not do yet?', 'Each step answers one of them, and you also start the console you use all day. Nothing in Sonny changes yet.', 'This is the Plan phase. On Day 6–7 you start your own project the same way.']},
        {do: 'Step 1 · manual mode. Show the bottom of your Claude Code.', say: ['Why: Claude Code is about to read and run things in a project you do not know yet. You want to see every action first.', '“manual mode on”. Not there? Shift+Tab, like Day 1–2.']},
        {do: 'Step 2 · the map. Paste the /show-me prompt.', copy: [['Step 2 · Claude Code', PROMPTS.a1Map]], say: ['Why: today you change this agent. You need to know where an incident comes in and where the agent is: that is where your work lands.', 'In the project: Claude Code reads the 6 files named in the prompt (maybe a few more, like SOLO.md). It changes nothing.', 'Every action passes the project’s guard (a hook, like Day 2). The guard writes each one to approvals/audit.jsonl: “allow” or “deny”.', 'They see: a diagram in the chat. Saved incident → src/cli.ts. Live alert → console/server.ts → src/chat.ts. Both → the investigate function in src/agent.ts.', 'Sometimes also an HTML diagram in docs/show-me/; Claude Code says the path.']},
        {ask: 'Look at the diagram: where do both routes meet?', say: ['(Answer: in the agent: the investigate function in src/agent.ts.)', 'So what you build this morning also works live this afternoon.']},
        {do: 'Show approvals/audit.jsonl in the editor.', say: ['Every action Claude Code took is logged here, with allow or deny.', 'You can always check afterwards what it did. Human in the loop, also after the fact.']},
        {do: 'Step 3 · a working start. Paste the setup prompt.', copy: [['Step 3 · Claude Code', PROMPTS.a1Setup]], say: ['Why: the project must run on your laptop before you build. Otherwise, when something fails later, you cannot tell if it was your change or the setup.', 'In the project, Claude Code runs four commands:', 'node --version → v22 or newer.', 'git status / git diff → nothing changed yet: a clean start.', 'npm ci → installs the packages. New folder: node_modules/.', 'npm run fixtures → writes the sample data in fixtures/telemetry/: one hour of graphs, logs and updates per scenario. Same files as before, so Git still shows nothing changed.', 'Then it stops for your review.']},
        {do: 'Show PROGRESS.md (scroll to the bottom).', say: ['The project’s second hook noticed node_modules/ and added an “A-1 setup” entry.', 'It is a signal, not proof: it says “Validation: OPEN”.', 'Not there yet? It appears after Claude Code’s next action.']},
        {do: 'Step 4 · the to-do list. Paste the test prompt.', copy: [['Step 4 · Claude Code', PROMPTS.a1SetupChecks]], say: ['Why: the tests are your to-do list. They show what works and exactly what you will build.', 'In the project: Claude Code runs npm test and npm run test:workshop. Nothing changes.', 'They see: 56 of 56 green: the project works. Workshop tests: 6 green, 14 red.', 'Each red test points to a TODO in the code: src/contract.ts (A3), src/chat.ts and the guard (A4), src/tools.ts (A5), src/executor.ts (“A8” = human in the loop, A6).']},
        {do: 'Open src/contract.ts and search for TODO(A3).', say: ['This is what a missing piece looks like: a TODO comment, and a red test that waits for it.', 'In A3 you build this, and the red test turns green.']},
        {ask: 'Claude Code says 14 tests fail. Is the project broken?', say: ['(Answer: no. Those are the pieces you build in A3 to A6.)']},
        {do: 'Step 5 · the agent’s workplace. New terminal window: start the console.', copy: [['Step 5 · Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console']], say: ['Why: the console is where your agent works. This afternoon you watch it investigate a live incident here.', 'In the project: the console starts a small web server on port 4320 and a database in console/data/ for its incidents.', 'You start it yourself and leave it open all day. Restart only when the code changes.', 'They see: “on-call console http://localhost:4320”, the shop at 4310, “listening for alerts every 10 s”. A yellow SQLite warning is normal.', 'Error “No such built-in module: node:sqlite”? This window has an older Node: nvm use 22.']},
        {do: 'Step 6 · see it. Open localhost:4320.', say: ['The shop, its numbers, and “listening”.', 'In A6 the live incident appears right here.']},
        {do: 'Step 7 · see the agent work. New terminal window, Window 2: run the saved incident.', copy: [['Step 7 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json']], say: ['Why: so far you only saw a drawing of the route. Now you see your agent actually work.', 'In the project: src/cli.ts reads the saved incident INC-1001 and its telemetry from fixtures/, and hands it to the agent in src/agent.ts. Nothing changes.', 'They see, top to bottom:', 'The alert: error rate 12% on checkout.', 'Four tool calls: graphs, the update list, the code change, the error logs.', 'The diagnosis: update v2.15.0 at 03:43, error “missing key PAYMENT_PROVIDER_SECRET_EU”, confidence high, proposed fix: rollback → Deploy owner.', 'Window 2 stays open: you use it for git status and git diff.']},
        {ask: 'Look at the diagnosis. What does it not say?', say: ['(Answer: what customers notice. There is no Customer impact line.)', 'Remember that. In A3 you add it, and you run this same command again to see the difference.']},
        {ask: 'What did Sonny do, and what did he not do?', say: ['(Answer: he proposed a rollback, but he did not run it. The last line says OPEN: a human decides.)', 'And what did the contract check? (Nothing yet: it says PASS because it is empty. That is A3.)']},
        {do: 'Wrap up: the four research questions, answered.', say: ['Does it run? Yes: 56 green main tests, the console running.', 'Where does an incident come in? The map: two routes, both into investigate in src/agent.ts.', 'What does Sonny do now? You saw his diagnosis for INC-1001, still without Customer impact.', 'What can he not do yet? 14 red tests, each with a TODO in the code. And he proposes, he never runs the fix himself.', 'Next, A2: before we build, we write down what the agent must do.']}
      ],
      learn: ['Before you build: a map, a working start, a to-do list.', 'Check the starting point: 56 green, 14 red.', 'Red tests are your to-do list. The console runs all day.', 'The agent already works on INC-1001, but its diagnosis has no Customer impact yet.'],
      watch: ['Node below 22.13: tests fail on store.test.ts. Back to the set-up slide.', 'A new terminal window can start on an older Node than the one checked at set-up (common with nvm). Symptom: “No such built-in module: node:sqlite”. Fix: nvm use 22, or nvm alias default 22.', 'The picture on the right was recorded on a test server: it shows port 18881. On the laptop it is 4320.', 'Claude Code says “A8”: that is the human-in-the-loop check, part of A6.', 'Port 4320 already in use? A console is already running somewhere: close it or use that one.', 'Someone starts fixing red tests: stop them, that is A3 to A6.', 'Step 3 shows a non-empty diff? Someone already changed files. git stash or a fresh clone gives a clean start.', 'npm ci takes about 5–30 seconds, depending on the network.', 'Step 7 says “npm: command not found” or a Node error in Window 2: a new window can start on an older Node, same fix: nvm use 22.', 'Someone runs step 7 inside Claude Code instead of Window 2: fine, same output, but the point is that they run their agent themselves.', 'No “A-1 setup” line in PROGRESS.md? It appears after Claude Code’s next action; it is only a signal, not proof.'],
      terms: [['npm ci', 'installs the packages the project needs'], ['Fixtures', 'the sample data: the saved incidents and their graphs, logs and updates (fixtures/telemetry/)'], ['Diff', 'what changed in the files compared to the last saved version in Git'], ['Dependencies', 'the packages a project needs to run (node_modules)'], ['Console', 'the web page at localhost:4320 where your agent works']],
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
      next: 'A2: write down what the agent must do.'
    }
  }),
  baseSlide({
    title: 'A2 · First write down what the agent must do', kicker: 'Day 5 · A2 · CONCEPT', subtitle: 'Before we build, we agree on the goal. You decide, Claude Code writes it in intent.md, and reads it again before every build.',
    visual: {intentFlow: [
      {items: [['1', 'Who uses the agent? (the operator)'], ['2', 'What do they get from it?'], ['3', 'What may it not do?']]},
      {doc: [['Problem', true], ['Proposed outcome', true], ['Users and systems', false], ['Constraints', false], ['Open questions', true]]},
      {items: [['A3', 'Rules for a good diagnosis'], ['A4', 'Say no to “Roll back now”'], ['A5', 'A tool to look up updates'], ['A6', 'Human in the loop']]}
    ]},
    cards: [{title: 'You decide', body: 'Claude Code asks you three questions and suggests an answer for each.'}, {title: 'intent.md: the agreement', body: 'Two parts are already there. Three gaps are still empty: you fill them in.'}, {title: 'Claude Code builds from it', body: 'Every build prompt starts with “Read intent.md”.'}],
    tagline: 'Like a brief for a builder: first agree on what “good” means, then build.',
    keyPoints: ['Before building, write down what the agent must do.', 'You decide; Claude Code writes it in intent.md.', 'Claude Code reads intent.md again before every build.'],
    notes: 'Time: 10:50 · 3 min. intent.md has three “<fill in>” sections (Problem, Proposed outcome, Open questions); Affected users and systems and Constraints are prefilled. No code file loads intent.md: the link runs through the prompts. The A3, A4, A5 and A8 prompts start with “Read (the accepted) intent.md”, and the A9 handoff includes it. The progress hook marks A-2 done when intent.md no longer contains “<fill”.',
    teach: {
      time: '3 min',
      gist: 'Before we build, we write down what the agent must do. Claude Code reads that file again before every build.',
      copy: [['Show the gaps (optional)', 'grep -n "fill in" intent.md']],
      script: [
        {do: 'Slide appears.', say: ['A1: we got to know the project.', 'Now, before we build anything, we write down what the agent must do.', 'Still the Plan phase: the second half.']},
        {ask: 'Why not just start building right away?', say: ['(Answer: then Claude Code guesses what you want, and you only find out at the end that it is not what you meant.)', 'Same with a builder: no brief, no house you like.']},
        {do: 'Point at the left card.', say: ['/design-control-loop: one of the four project skills you saw before Assignment 1.', 'It asks you three questions, each with a suggested answer.', 'You choose. Claude Code does not decide what the agent is for.']},
        {do: 'Point at the middle card. Optional: open intent.md, or run the command.', copy: 'grep -n "fill in" intent.md', say: ['intent.md: a normal text file in the project.', 'Two parts are already filled in: who it serves, and what it may never do.', 'Three gaps still say “fill in”: Problem, Outcome, Open questions.', 'That is what you write in A2.']},
        {do: 'Point at the right card.', say: ['Look ahead at the prompts of A3, A4 and A5: each starts with “Read intent.md”.', 'So Claude Code reads your agreement again before every build.', 'Your sentences steer what gets built.']},
        {ask: 'Does the agent itself read intent.md while it works?', say: ['(Answer: no. Claude Code, the builder, reads it. The agent follows the rules that are built from it.)', 'intent.md is for the builders: Claude Code and you.']}
      ],
      learn: ['First agree on the goal, then build.', 'You decide what goes in intent.md, not Claude Code.', 'Claude Code reads intent.md before every build, so it steers the work.'],
      watch: ['No code file loads intent.md. The link runs through the prompts: A3, A4, A5 and A8 start with “Read intent.md”.', 'Skip the theory behind the skill name (control loop): not needed today.'],
      terms: [['intent.md', 'a short file that says what the agent must do and must not do'], ['Brief', 'the instructions you give someone before they build something for you']],
      next: 'what a good intent.md looks like.'
    }
  }),
  baseSlide({
    title: 'A2 · intent.md: before and after', kicker: 'Day 5 · A2 · EXAMPLE', subtitle: 'You do not type this yourself. In Assignment 2, Claude Code asks you three questions, writes your answers into intent.md, and waits for your OK.',
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
        ['h', '## Checks'], ['new', '1. Every claim shows where it came from.', 'built in A3'], ['new', '2. What it does not know, it marks OPEN.', 'built in A3'], ['new', '3. “Roll back now” in the chat is refused.', 'built in A4'],
        ['h', '## Affected users and systems · ## Constraints'], ['keep', 'unchanged'],
        ['h', '## Open questions'], ['new', 'How long is evidence still valid before we check again?']
      ]}
    ]},
    cards: [{title: 'Now: three empty parts', body: 'This is the file as you got it.'}, {title: 'After Assignment 2: an example', body: 'Your answers, written by Claude Code. Yours will be different.'}],
    tagline: 'Tip: write things you can test later. “The agent is helpful” ✗ too vague · “Every claim shows where it came from” ✓ you can look and see',
    keyPoints: ['Claude Code writes intent.md from your answers; you approve.', 'Three empty parts get filled; a Checks part is added.', 'The checks are what we build in A3 and A4.'],
    notes: 'Time: 10:53 · 2 min. Example only: participants answer the questions themselves. The Checks part is new: the A2 write prompt asks for three checks. Check 1 and 2 match the A3 rules for a good diagnosis (every claim needs evidence, what is not proven stays OPEN); check 3 matches the A4 chat refusal.',
    teach: {
      time: '2 min',
      gist: 'This is intent.md before and after Assignment 2. Claude Code writes it from your answers; the checks are what we build next.',
      script: [
        {do: 'Slide appears.', say: ['Same file twice: intent.md in the project.', 'Left: how you got it. Right: an example of how it looks after Assignment 2.']},
        {do: 'Point at the subtitle.', say: ['You do not type this yourself.', 'Claude Code asks you three questions, you answer in the Claude Code terminal.', 'Then it writes your answers into this file, and waits for your OK.']},
        {do: 'Point at the orange <fill in> lines left, then the green lines right.', say: ['Left: three empty parts.', 'Right: each filled with one or two plain sentences.', 'Yours will be different: that is fine.']},
        {do: 'Point at ## Checks and the purple labels.', say: ['Checks is a new part. Claude Code adds it.', 'Three promises about the agent.', 'The labels say where we build them: A3 the rules for a good diagnosis, A4 the chat that says no.', 'Later the red tests check: does the agent keep these promises?']},
        {ask: 'Look at the tip at the bottom. Why is “the agent is helpful” a bad check?', say: ['(Answer: too vague. You cannot look and see if it is true.)', '“Every claim shows where it came from”: you open a diagnosis and look.', 'When Claude Code suggests an answer, ask yourself: could I test this later?']}
      ],
      learn: ['intent.md gets filled by Claude Code from your answers; you approve.', 'Three empty parts get filled, and a Checks part is added.', 'The checks come back in A3 and A4, and the tests check them.'],
      watch: ['They should not copy this example word for word: they answer the questions themselves.', 'Someone asks “do I type this in the browser?”: no, everything in A2 happens in the Claude Code terminal and the file intent.md.', 'File names or code in intent.md: it says what, not how.'],
      terms: [['intent.md', 'a short file that says what the agent must do and must not do'], ['OPEN', 'the agent says: I do not know this yet']],
      next: 'Assignment 2: write your own.'
    }
  }),
  assignmentSlide({
    number: 2, title: 'Write down what the agent must do', subtitle: 'Claude Code asks, you decide, Claude Code writes, you check. Only intent.md changes.', stage: 'intent', duration: '10:55 · 10 min', shot: 'assets/day5-expected/a2-diff.png', shotLabel: 'What you should see at the end (an example)',
    steps: [
      {text: 'First check the mode: the bottom of Claude Code says “manual mode on”.', after: 'Not there? Press Shift+Tab until it is. Claude Code now asks before it changes a file.', warn: true},
      {text: 'Type this in: Claude Code. Goal: let Claude Code interview you about what the agent is for.', prompt: PROMPTS.a2Design, after: 'At most three questions (operator, outcome, what it may not do), each with a suggested answer. Then a small table: your answer → which part of intent.md. Nothing changes yet.'},
      {text: 'You decide. Goal: the answers are yours, not Claude Code’s. Type “yes” or your own answer for each question.', after: 'Ask yourself per answer: can I test this later? “The agent is helpful” is too vague.'},
      {text: 'Type this in: Claude Code. Goal: turn your answers into text in intent.md.', prompt: PROMPTS.a2Write, after: 'Claude Code shows the exact change: the three empty parts filled in, plus three checks. Then it stops and waits.'},
      {text: 'You check. Goal: read the change before it is saved. Then approve the edit.', after: 'Claude Code asks “confirm this edit with the human”. Yes = intent.md is saved. No other file changes.', warn: true},
      {text: 'Type this in: Window 2 (the terminal from A1 step 7). Goal: see for yourself what changed.', prompt: 'git diff -- intent.md', after: 'Red lines: the old “fill in” text. Green lines: your sentences. Only intent.md.'}
    ],
    after: 'intent.md is filled in with your answers and three checks. Claude Code reads it again at the start of A3, A4 and A5.',
    checks: ['No “fill in” is left in intent.md.', 'You can read your three checks out loud.', 'git diff shows only intent.md.'],
    humanOpen: 'You decide what the agent is for. Claude Code only suggests.', next: 'Break',
    teach: {
      time: '10 min',
      gist: 'Claude Code asks, you decide, Claude Code writes, you check. At the end intent.md is filled in, and only that file changed.',
      do: ['Check manual mode, answer Claude Code’s questions, approve the change to intent.md, check it with git diff.'],
      done: ['No “fill in” left in intent.md.', 'Three checks they can read out loud.', 'git diff shows only intent.md.'],
      copy: [['Step 2 · Claude Code', PROMPTS.a2Design], ['Step 4 · Claude Code', PROMPTS.a2Write], ['Step 6 · Window 2', 'git diff -- intent.md'], ['Optional · Window 2', 'grep -n "fill in" intent.md'], ['After each step · Window 2', 'git status']],
      script: [
        {do: 'Slide appears. Goal of A2.', say: ['In A1 you got to know the project. Now you write down what the agent must do.', 'Four moves: Claude Code asks, you decide, Claude Code writes, you check.', 'That is the human in the loop. You practise it yourself before you build it into the agent.', 'At the end only one file has changed: intent.md.']},
        {do: 'Step 1 · manual mode. Show the bottom of your Claude Code.', say: ['Why: in this assignment the moment Claude Code asks permission is the point.', '“manual mode on”. Not there? Shift+Tab.']},
        {do: 'Step 2 · the interview. Paste the /design-control-loop prompt.', copy: [['Step 2 · Claude Code', PROMPTS.a2Design]], say: ['Why: before anything gets written, Claude Code has to know what you want.', '/design-control-loop: one of the skills from slide 9. It only interviews, it builds nothing.', 'In the project: Claude Code reads intent.md, the saved incident (INC-1001) and REVIEW.md, the project’s safety checklist. It changes nothing.', 'They see: at most three questions, each with a suggested answer.', 'Who is the operator? The on-call engineer who uses the agent’s diagnosis.', 'What does the operator get? What may the agent not do?', 'Then a small table, the “field map”: your answer → which part of intent.md it goes in.']},
        {do: 'Step 3 · you decide. Type your answers.', say: ['Why: if you say yes to everything, Claude Code decided what the agent is for. You decide.', 'Type “yes” to a suggestion, or write your own answer.', 'Test per answer: can I check this later with yes or no?', 'Too vague? Ask Claude Code: “make answer 2 something I can test”.']},
        {ask: 'Claude Code suggests: “The agent helps the operator work faster.” Good check?', say: ['(Answer: no, too vague. Better: “within a minute, a diagnosis with its evidence”.)']},
        {do: 'Step 4 · the text. Paste the write prompt.', copy: [['Step 4 · Claude Code', PROMPTS.a2Write]], say: ['Why: your answers become text in the file that Claude Code reads before every build.', 'In the project: still nothing saved. Claude Code shows a proposal.', 'They see: the change to intent.md in the chat. The three “fill in” parts get sentences, and three checks are added.', 'Then it stops and waits.']},
        {do: 'Step 5 · you check. Read the change, then approve.', say: ['Why: read before it is saved. Same as the agent later: it proposes, a person approves.', 'They see: Claude Code asks permission, with “SDLC artefact: confirm this edit with the human”.', 'That is the project’s guard: intent.md is an important file, so it always asks, even outside manual mode.', 'In the project after yes: intent.md is saved. The guard logs the edit in approvals/audit.jsonl.', 'PROGRESS.md gets an “A-2 intent” entry, because no “fill in” is left.']},
        {do: 'Step 6 · see for yourself. In Window 2: git diff.', copy: [['Step 6 · Window 2', 'git diff -- intent.md']], say: ['Why: do not just trust what Claude Code says it did. Check it yourself.', 'Window 2: the normal terminal from A1 step 7. Window 1 keeps running the console.', 'They see: red lines = the old “fill in” text, green lines = their sentences. Only intent.md.', 'Want an extra check? grep -n "fill in" intent.md shows nothing when every part is filled.']},
        {ask: 'Who reads intent.md from now on?', say: ['(Answer: Claude Code, at the start of A3, A4 and A5. Those prompts begin with “Read intent.md”.)']},
        {do: 'Wrap up: what is in the project now.', say: ['intent.md: your answers and three checks.', 'A line in audit.jsonl and an “A-2 intent” entry in PROGRESS.md.', 'Break. After the break, A3: we build the first check, a good diagnosis.']}
      ],
      learn: ['First agree what the agent must do, then build.', 'Claude Code suggests; you decide and approve.', 'Check the result yourself with git diff.'],
      watch: ['Someone accepts every suggestion without reading: ask them to read their three checks out loud.', 'Claude Code starts editing in step 2: the skill should only ask. Say “stop, only ask questions”.', 'Claude Code asks more than three questions or a second round: say “one round is enough, give the field map”.', 'Approved by mistake? git checkout -- intent.md puts the file back, then redo step 4.', 'git diff shows other files: someone changed files earlier. Only intent.md should be new in A2.', 'No “A-2 intent” in PROGRESS.md? A “fill in” is still in the file, or it appears after Claude Code’s next action.', 'Do not let them copy the example on the right: their own answers.'],
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
      next: 'break, then A3: build the rules for a good diagnosis.'
    }
  }),
  pauseSlide('Break', '15 min', 'How your agent handles an incident', '11:05'),
  baseSlide({
    title: 'How your agent handles an incident', kicker: 'Day 5 · THE AGENT', subtitle: 'An alert comes in, the agent looks at the data and writes a diagnosis. Then plain code checks that diagnosis against fixed rules, and the operator decides.',
    visual: {pipeline: [
      {file: 'src/cli.ts · console/server.ts'},
      {file: 'src/tools.ts', tag: 'A5'},
      {file: 'src/agent.ts'},
      {file: 'src/contract.ts', tag: 'A3', hl: true},
      {file: 'terminal · console', tag: 'A4 · A6'}
    ]},
    cards: [
      {title: 'An alert comes in', body: 'Checkout errors at 12%. A saved incident (INC-1001) or live from the shop.'},
      {title: 'The agent looks at the data', body: 'Graphs, the update list, the code change, the error logs. Only reading.'},
      {title: 'It writes a diagnosis', body: 'What is wrong, the proof, how sure it is, and a proposed fix.'},
      {title: 'Code checks the diagnosis', body: 'Fixed rules, like “is there proof?”. Breaks a rule? The operator sees which one.'},
      {title: 'A person decides', body: 'The operator reads it, asks questions in the chat, approves the fix or not.'}
    ],
    tagline: 'Each assignment builds one part of this.',
    keyPoints: ['Alert → look at the data → diagnosis → code checks it → the operator decides.', 'Two safety layers: fixed rules in code, then a person.', 'A3 builds the rules.'],
    notes: 'Time: 11:20 · 2 min. Saved incident: npm run investigate → src/cli.ts → investigate() in src/agent.ts. Live: console/server.ts → src/chat.ts → investigate(). Four read-only tools in src/tools.ts: summarize_metrics, list_deploys, get_diff, search_logs. The diagnosis goes to validateVerdict (src/router.ts) → parseVerdict (src/contract.ts). Offline the diagnosis comes from scripted answers (src/runtime.ts); with a real model the instructions are in src/prompts.ts.',
    teach: {
      time: '2 min',
      gist: 'How the agent works, start to end: alert, look at the data, write a diagnosis, check it, a person decides.',
      script: [
        {do: 'Slide appears.', say: ['How does your agent work, from start to end?', 'Five steps, left to right.']},
        {do: 'Point at the first three cards.', say: ['An alert comes in: checkout errors at 12%.', 'The agent looks at the data: graphs, the update list, what changed in the code, the error logs. It only reads.', 'It writes a diagnosis: what is wrong, the proof, how sure it is, a proposed fix.']},
        {do: 'Point at the orange card.', say: ['Then ordinary code checks the diagnosis. Not the AI, not a person: a few fixed rules.', 'For example: is there proof? Does it say what customers notice?', 'Breaks a rule? The operator sees which rule broke, instead of a diagnosis that only looks convincing.', 'Why? An AI can sound very sure without proof. So you never pass its answer on unchecked.']},
        {ask: 'Why not let the operator check everything themselves?', say: ['(Answer: at 3 at night, under stress, you miss things. Rules in code check the same things every time, so the person can spend their attention on the decision.)']},
        {do: 'Still on the orange card.', say: ['This is a common pattern when you build with AI: check the output with code, then let a person decide. Two safety layers.', 'The check is already wired into the agent. Only the rules are missing. That is A3.']},
        {do: 'Point at the last card.', say: ['A person decides: reads it, asks questions, approves the fix or not.', 'The agent never fixes things on its own.']},
        {do: 'Point at the labels under the cards.', say: ['Each assignment builds one part: A3 the check, A4 the chat, A5 a data tool, A6 the approval.']}
      ],
      learn: ['Alert → data → diagnosis → code checks it → the operator decides.', 'Two safety layers: fixed rules in code catch the obvious mistakes, a person makes the decision.', 'The agent only reads and proposes. A3 builds the rules.'],
      watch: ['Someone asks where the AI is: offline, the diagnosis comes from scripted answers so everyone gets the same result. A real model is in the appendix.', 'The shop is not used yet: the morning uses the saved incident. The shop starts in A6.'],
      terms: [['Tool', 'a small function the agent may call to read data, like the update list'], ['Diagnosis', 'what the agent concludes: cause, proof, confidence, proposed fix'], ['Check', 'a small piece of normal code with fixed rules; it runs on every diagnosis before the operator sees it']],
      next: 'the problem: nobody checks the diagnosis yet.'
    }
  }),
  baseSlide({
    title: 'A3 · The problem: nobody checks the diagnosis', kicker: 'Day 5 · A3 · DESIGN', subtitle: 'Right now the check is empty. Whatever the agent writes goes straight to the operator, even without proof. So we build a check with five rules.',
    visual: {intentFlow: [
      {docName: 'diagnosis · INC-1001', doc: [['Cause: update v2.15.0', false, '✓'], ['Evidence: graphs, update, logs', false, '✓'], ['Confidence: high', false, '✓'], ['Proposed fix: roll back', false, '✓'], ['Customer impact', true, 'missing']]},
      {items: [['1', 'Says what customers notice'], ['2', 'Roll back? Show proof from the update list'], ['3', 'Strong proposal? Proof from 2 sources'], ['4', 'Low confidence? No strong proposal'], ['5', 'Data missing? Not “high confidence”']]},
      {items: [['✓', 'Follows all five rules: the operator sees the diagnosis', 'good'], ['✗', 'Breaks a rule: the operator sees which rule, not the diagnosis', 'bad']]}
    ]},
    cards: [{title: 'Now', body: 'Customer impact is missing, and the operator still gets it.'}, {title: 'The fix: five rules', body: 'We build these in A3.'}, {title: 'After A3', body: ''}],
    keyPoints: ['Now: the check is empty, every diagnosis gets through.', 'The fix: five rules every diagnosis must follow.', 'After A3: only a diagnosis that follows the rules is shown.'],
    notes: 'Time: 11:22 · 3 min. Ryan’s words: diagnosis = “verdict”, the five rules = “verdict contract”, the check = parseVerdict in src/contract.ts (called from src/agent.ts via src/router.ts). Now: parseVerdict returns ok for everything, with a TODO(A3) comment listing the five rules. test/workshop/contract.test.ts: 6 of 7 red at the start. When a rule fails, the errors are returned and shown instead of the diagnosis. After A3 the agent’s answers (src/runtime.ts, src/prompts.ts) also include customer_impact.',
    teach: {
      time: '3 min',
      gist: 'The problem: nobody checks the diagnosis, so even a bad one reaches the operator. The fix: a check with five rules. That is A3.',
      script: [
        {do: 'Slide appears.', say: ['The problem: right now nobody checks the diagnosis.', 'Whatever the agent writes, the operator gets it.']},
        {do: 'Point at the left card.', say: ['A diagnosis for INC-1001: cause, proof, how sure, proposed fix.', 'But it does not say what customers notice. And it still goes through.', 'Same for a diagnosis without proof, or with “high confidence” while data is missing.']},
        {ask: 'Would you roll back production on a diagnosis that says “high confidence” but has no proof?', say: ['(Answer: no. That is why we need a check.)']},
        {do: 'Point at the middle card, rule by rule.', say: ['The fix: five rules every diagnosis must follow.', '1: say what customers notice, so the operator knows how bad it is.', '2: proposing a rollback? Show the update you want to undo.', '3: a strong proposal needs proof from two places, like the graphs and the update list. One signal is a hunch.', '4: not sure? Then no strong proposal.', '5: data missing? Then no “high confidence”. Missing means unknown, not fine.']},
        {do: 'Point at the right card.', say: ['After A3: follows all five rules? The operator sees it.', 'Breaks a rule? The operator sees which rule broke, not a diagnosis that looks fine.', 'And the agent learns to write the customer impact, so INC-1001 gets that line.']},
        {do: 'Optional: show src/contract.ts, search for TODO(A3).', say: ['This is the check now: a comment that lists the five rules, then “ok” for everything.', 'Ryan took the rules out on purpose, so you can build them.']}
      ],
      learn: ['Now: every diagnosis gets through, even a bad one.', 'The fix: five rules (customer impact, proof for a rollback, two sources, no strong proposal when unsure, no high confidence with missing data).', 'After A3 only a diagnosis that follows the rules is shown.'],
      watch: ['Ryan’s words in prompts and tests: verdict = diagnosis, contract = the five rules. “Contract” is a normal software word for rules that data must follow; in AI agents you also hear “output validation” or “guardrails”.', 'Someone asks “what is OPEN”: the agent says “I do not know this yet” instead of guessing.', 'Do not go into the code here: the assignment does that with Claude Code.'],
      terms: [['Diagnosis (verdict)', 'what the agent concludes: cause, proof, confidence, proposed fix'], ['Contract', 'the rules every diagnosis must follow'], ['Evidence', 'the proof: a line from the graphs, logs or update list'], ['OPEN', 'the agent says: I do not know this yet']],
      next: 'how do we know the rules work? Tests.'
    }
  }),
  baseSlide({
    title: 'A3 · How do we know the rules work? Tests.', kicker: 'Day 5 · A3 · TEST', subtitle: 'A test is a small program: it gives the check a made-up diagnosis and checks the answer. Ryan already wrote one for each rule.',
    visual: {filePair: [
      {file: 'Test 2 · today', lines: [
        ['h', 'The test gives the check'], ['keep', 'a diagnosis without customer impact'],
        ['h', 'The test expects'], ['keep', '“refused”'],
        ['h', 'The check answers'], ['red', '“ok” (it has no rules yet)'],
        ['red', '✗ red: wrong answer']
      ]},
      {file: 'Test 2 · after A3', lines: [
        ['h', 'The test gives the check'], ['keep', 'a diagnosis without customer impact'],
        ['h', 'The test expects'], ['keep', '“refused”'],
        ['h', 'The check answers'], ['new', '“refused: customer impact is missing”'],
        ['green', '✓ green: right answer']
      ]}
    ]},
    cards: [{title: 'Today: red = wrong answer', body: '6 of the 7 A3 tests are red.'}, {title: 'After A3: green = right answer', body: 'All 7 green. Same idea for every rule.'}],
    tagline: 'Goal of A3: all A3 tests green, and the diagnosis shows what customers notice.',
    keyPoints: ['A test gives the check a made-up diagnosis and expects an answer.', 'Red = wrong answer, green = right answer.', 'Today 6 of 7 A3 tests are red; after A3 all 7 green.'],
    notes: 'Time: 11:23 · 2 min. test/workshop/contract.test.ts has 7 A3 tests; at the start pass 1 / fail 6 (the 7th, “evidence has to carry at least one line”, already passes). Test 2 = “A3: customer_impact is required and non-empty”: it builds a verdict without customer_impact and expects parseVerdict to fail. Verified on the reference tag day5-after-a3: pass 7 / fail 0, and npm run investigate prints “Customer impact: … users of checkout may see failures or slowness …; affected segments remain OPEN”.',
    teach: {
      time: '2 min',
      gist: 'A test gives the check a made-up diagnosis and says what the answer should be. Today the check answers wrong (red); after A3 it answers right (green).',
      script: [
        {do: 'Slide appears.', say: ['How do we know the rules work? We do not trust our eyes: we use tests.', 'Ryan already wrote one test per rule.']},
        {do: 'Point at the left card, top to bottom.', say: ['A test is a small program. This one is test 2.', 'It gives the check a made-up diagnosis without customer impact.', 'It expects: “refused”.', 'Today the check says “ok”, because it has no rules yet.', 'Wrong answer: the test is red.']},
        {do: 'Point at the right card.', say: ['After A3: same diagnosis, same expectation.', 'Now the check says “refused: customer impact is missing”.', 'Right answer: the test is green.']},
        {ask: 'Test 3 gives the check a rollback without proof from the update list. What should the check answer?', say: ['(Answer: refused. Rule 2: a rollback needs proof from the update list.)']},
        {do: 'Point at the bottom line: the goal of A3.', say: ['Two things you will see at the end of A3.', 'One: the A3 tests go from 6 red to 7 green.', 'Two: the diagnosis for INC-1001 now has a Customer impact line. In the terminal and in the console.']},
        {do: 'Link to A1.', say: ['Of the 14 red tests from A1, 6 are these A3 tests.', 'The other 8 are for A4, A5 and the human-in-the-loop check.']}
      ],
      learn: ['A test: made-up input, expected answer.', 'Red = wrong answer, green = right answer.', 'Build until the A3 tests are green.'],
      watch: ['Someone asks who wrote the tests: Ryan, before the workshop. In real projects you often write the test first, then the code: “red, then green”.', 'Exact words in the Customer impact line can differ per person: the line itself must be there.'],
      terms: [['Test', 'a small program that gives code an input and checks the answer'], ['Red / green', 'the test failed / the test passed']],
      next: 'Assignment 3: build the rules.'
    }
  }),
  assignmentSlide({
    number: 3, title: 'Build the rules for a good diagnosis · 1/2', subtitle: 'Build the check with five rules. Claude Code explains, you accept, it shows the plan, then builds. The A3 tests turn green.', stage: 'contract', duration: '11:25 · 25 min', shot: 'assets/day5-expected/a3-done.png', shotLabel: 'What you should see at the end',
    steps: [
      {text: 'First check the mode: the bottom of Claude Code says “manual mode on”.', after: 'Not there? Press Shift+Tab until it is. Claude Code asks before every file it changes.', warn: true},
      {text: 'Type this in: Claude Code. Goal: understand the five rules before anything is built.', prompt: PROMPTS.a3Contract, after: 'The five rules in plain English, and the smallest change that adds them. Nothing changes yet.'},
      {text: 'You decide. Goal: accept the rules. Check that all five are there and that unknown things stay OPEN.', after: 'Missing a rule? Say which one. Agree? Type “accepted”.'},
      {text: 'Type this in: Claude Code. Goal: see the red test and the plan before anything changes.', prompt: PROMPTS.a3Build, after: '6 of the 7 A3 tests red, why, and a list of about 9 files that must change. Nothing changes yet.'},
      {text: 'Type this in: Claude Code. Goal: build it.', prompt: PROMPTS.a3BuildImplement, after: 'Claude Code asks permission per file. At the end: the A3 test 7 of 7 green, and the diff.'},
      {text: 'Type this in: Window 2. Goal: see the difference with A1, same command.', prompt: 'npm run investigate -- fixtures/incidents/bad-deploy.json', after: 'The same diagnosis as in A1, now with a new line: “Customer impact: … users of checkout may see failures or slowness …”.'},
      {text: 'Type this in: Window 1. Press Ctrl+C first, then start the console again. The console does not pick up new code by itself.', prompt: 'AGENT_LISTEN_WINDOW_MIN=1 npm run console', after: 'The console runs again with your A3 code.', warn: true},
      {text: 'Open in browser: http://localhost:4320. Click “+ New investigation”, then “Investigate: customers report checkout errors”.', after: 'The diagnosis shows a “Customer impact” line.'}
    ],
    after: 'The A3 tests are green, and the diagnosis shows Customer impact in the terminal and the browser.',
    checks: ['The A3 test: 7 of 7 green.', 'You can name the five rules.', 'The browser shows a Customer impact line.'],
    humanOpen: 'You accept the rules and review every file change. Nothing is approved or rolled back.', next: 'Assignment 3 · verify',
    teach: {
      time: '25 min',
      gist: 'Claude Code explains the five rules, you accept them, it shows the plan, then builds. The A3 tests go from 6 red to 7 green.',
      do: ['Check manual mode, let Claude Code explain the rules, accept them, review the plan, approve the build, restart the console, check the browser.'],
      done: ['The A3 test: 7 of 7 green.', 'They can name the five rules.', 'Customer impact shows in the browser.'],
      copy: [['Step 2 · Claude Code', PROMPTS.a3Contract], ['Step 4 · Claude Code', PROMPTS.a3Build], ['Step 5 · Claude Code', PROMPTS.a3BuildImplement], ['Step 6 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json'], ['Step 7 · Window 1 (Ctrl+C first)', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console'], ['Step 8 · Browser', 'http://localhost:4320'], ['After each step · Window 2', 'git status']],
      script: [
        {do: 'Slide appears. Goal of A3.', say: ['We know the five rules, and we know how to check them: tests. Now we build.', 'Same rhythm as A2: Claude Code explains, you decide, then it builds.', 'The biggest assignment of the day: 25 minutes, about 9 files.']},
        {do: 'Step 1 · manual mode.', say: ['Why: Claude Code is about to change about 9 files. You want to see each change.', '“manual mode on”. Not there? Shift+Tab.']},
        {do: 'Step 2 · understand. Paste the first prompt.', copy: [['Step 2 · Claude Code', PROMPTS.a3Contract]], say: ['Why: you only accept rules you understand.', 'In the project: Claude Code reads intent.md (your A2 work), docs/spec.md, src/contract.ts, two agent files and the A3 test. It changes nothing.', 'They see: the five rules in plain English, and the smallest change that adds them.']},
        {do: 'Step 3 · you decide.', say: ['Why: you own the rules, not Claude Code.', 'Check: are all five there? Does it keep unknown things OPEN: versions, regions, customer groups?', 'Agree: type “accepted”.']},
        {ask: 'The agent sees errors in the graphs, but has no update list. May it say “high confidence”?', say: ['(Answer: no. Data is missing, so rule 5 says no high confidence.)']},
        {do: 'Step 4 · the plan. Paste the second prompt.', copy: [['Step 4 · Claude Code', PROMPTS.a3Build]], say: ['Why: first see what fails and what will change, before anything changes.', 'In the project: Claude Code runs only the A3 test. Nothing changes.', 'They see: 6 of 7 red, why each one fails, and a list of about 9 files with a reason for each.']},
        {do: 'Step 5 · build. Paste the third prompt.', copy: [['Step 5 · Claude Code', PROMPTS.a3BuildImplement]], say: ['Why: now the rules go into the code, everywhere the diagnosis goes.', 'In the project, about 9 files change:', 'src/contract.ts: the check itself, the five rules.', 'src/runtime.ts and src/prompts.ts: the agent’s answers now include customer impact.', 'docs/spec.md: the description of a diagnosis.', 'src/cli.ts and console/index.html: the terminal and the web page show the new line.', 'Plus a few test files and approvals/README.md get one line.', 'They see: a permission question per file. For docs/spec.md and test files the guard asks extra: “confirm this edit with the human”.', 'At the end: the A3 test 7 of 7 green, and the diff.']},
        {do: 'Show PROGRESS.md.', say: ['The hook adds an “A-3 spec + contract” entry: the check now mentions customer_impact.']},
        {do: 'Step 6 · same command as A1, in Window 2.', copy: [['Step 6 · Window 2', 'npm run investigate -- fixtures/incidents/bad-deploy.json']], say: ['Why: see with your own eyes what changed, with the exact same incident.', 'They see: the same diagnosis as in A1, plus a new line: Customer impact.', '“affected segments remain OPEN”: it does not guess which customers.']},
        {do: 'Step 7 · restart the console in Window 1.', copy: [['Step 7 · Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console']], say: ['Why: the console loaded the old code when it started. It does not see new code by itself.', 'Ctrl+C, then start it again.']},
        {do: 'Step 8 · see it. Browser: + New investigation.', say: ['They see: the diagnosis with a new line, Customer impact.', 'Same line as in Window 2 at step 6.']},
        {do: 'Wrap up.', say: ['The check works: every diagnosis is now tested against five rules.', 'Next, part 2: we check it with fresh proof, not just trust Claude Code.']}
      ],
      learn: ['Understand and accept the rules before building.', 'See the red test and the file list first, then build.', 'One rule reaches everywhere the diagnosis goes: check, agent, description, terminal, web page.'],
      watch: ['Many permission questions in step 5: read the first few. Then they may pick “allow edits for this session”; the guard still asks for docs/spec.md and test files.', 'Claude Code edits in step 2 or 4: say “stop, do not edit yet”.', 'Claude Code removes or weakens an existing rule to make a test green: reject it.', 'Test still red after step 5: ask Claude Code to show the red line and fix only that.', 'No Customer impact in the browser: the console was not restarted (step 7), or it is an old incident: start a new investigation.', 'Port 4320 in use after Ctrl+C: wait a second, or close the old window.', 'Stuck far behind: part 2 has a catch-up command that jumps to the finished A3.'],
      terms: [['Diagnosis (verdict)', 'what the agent concludes: cause, proof, confidence, proposed fix'], ['Contract', 'the rules every diagnosis must follow (src/contract.ts)'], ['Schema', 'the form a diagnosis must have: which fields, which types'], ['Fixtures', 'the sample data and saved answers the tests use'], ['OPEN', 'the agent says: I do not know this yet']],
      changes: [
        ['Before step 2', 'From A1 and A2: `modified: intent.md`, `modified: PROGRESS.md`. Nothing else.'],
        ['After steps 2, 3 and 4', 'Nothing new. Claude Code only read, explained and ran the A3 test.'],
        ['After step 5 · build', 'About 9 modified files: `src/contract.ts`, `src/runtime.ts`, `src/prompts.ts`, `src/cli.ts`, `console/index.html`, `docs/spec.md`, often a few `test/*.test.ts` and `approvals/README.md`. The exact list can differ per person. PROGRESS.md gets an “A-3” entry.'],
        ['Show one change', '`git diff -- src/cli.ts`: one new line, the Customer impact output. Small and easy to read.'],
        ['After steps 6, 7 and 8', 'Nothing new. Running the agent and restarting the console change no files.']
      ],
      next: 'part 2: check it with fresh proof.'
    }
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
    notes: note({time: '13:10 · 3 min', why: 'The room needs the morning chain before adding controls.', predict: 'Ask which artifact A3 implements.', see: 'Map, intent, and contract form one chain.', inside: 'A4 now protects the action boundary.', participant: 'Write one link in your notes. Optionally share it in chat.', watch: 'Do not introduce new content.', stuck: 'Read the three cards.', stop: 'The room can state the chain.', next: 'A4 · Refuse unsafe chat actions'})
  }),
  baseSlide({
    title: 'A4 · Refuse unsafe chat actions', kicker: 'Day 5 · A4 · CONCEPT', subtitle: 'Chat may investigate. Buttons and a named person own mutations.',
    cards: [{title: 'Question', body: 'Read-only evidence questions stay allowed.'}, {title: 'Mutation', body: 'Rollback, approval, scaling, and resolution stay refused.'}, {title: 'File guard', body: 'A human-owned hook protects bench/ratchet.json edits.'}],
    keyPoints: ['Grammar runs before the model.', 'The evidence question must still work.', 'The hook proves a file-edit boundary only.'],
    notes: note({time: '13:13 · 3 min', why: 'The product must separate investigation from action.', predict: 'Ask why “Do not approve or execute anything” stays read-only while “Do not approve and roll back now” is refused.', see: 'The full evidence question stays allowed and mutation language routes to refusal.', inside: 'The human hook protects one file boundary.', participant: 'Classify both exact A4 sentences.', watch: 'Do not claim full shell protection.', stuck: 'Run the focused chat test.', stop: 'The two exact cases are clear.', next: 'A4 example target'})
  }),
  screenshotSlide({number: 4, title: 'A4 · Example refusal and guard proof', subtitle: 'Focused test output proves two separate boundaries.', stage: 'controls', shot: 'assets/day5-expected/a4.png', points: ['The full evidence question remains read-only.', '“Do not approve and roll back now.” is refused.', 'The focused guard test denies Edit and Write to bench/ratchet.json.'], next: 'Assignment 4', time: '13:16 · 2 min'}),
  assignmentSlide({
    number: 4, title: 'wire and prove the controls', subtitle: 'Build the chat refusal, then review the human-owned file guard.', stage: 'controls', duration: '13:18 · 22 min', shot: 'assets/day5-expected/a4.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a4Chat, after: 'The focused chat test proves mutation refusal and a read-only question.'},
      {text: 'You, not Claude: open .claude/hooks/guard.mjs in your editor. Find the 4 comment lines that start with // TODO(A4). Replace them with these 2 lines and save.', prompt: 'else if (rel === "bench/ratchet.json")\n    decide("deny", "guard: ratchet is human-owned");', after: 'The new lines sit just above the line that starts with else if (SDLC_ARTEFACT.', warn: true},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a4Review, after: 'Claude Code reports the focused guard result without editing the hook.'},
      {text: 'Type this in: Window 1. Press Ctrl+C, then start the console again so it uses your A4 code.', prompt: 'AGENT_LISTEN_WINDOW_MIN=1 npm run console', after: 'The console runs again.', warn: true},
      {text: 'Type this in: browser http://localhost:4320 · open your investigation · agent chat', prompt: 'Roll back now.', after: 'The chat refuses: mutations are buttons for a named human. This is what you see on screen, not audit-log proof.'},
      {text: 'Human review. Compare chat refusal with the file guard.', after: 'You can explain the two different boundaries.'}
    ],
    after: 'Chat refuses mutations, evidence questions work, and the human-owned file guard passes.',
    checks: ['Show the focused chat output for both exact sentences.', 'Show the focused guard output.', 'Do not use the root audit file as A4 proof.'],
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
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'npm run investigate -- fixtures/incidents/bad-deploy.json', after: 'The trace shows list_deploys and exact arguments.'},
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
    keyPoints: ['Self-check the first missing checkpoint.', 'Do not rerun every suite.', 'Continue when all three proofs are visible.'],
    notes: note({time: '14:05 · 5 min', why: 'The live route depends on the three completed contracts.', predict: 'Ask which proof is missing first.', see: 'Three compact checkpoints.', inside: 'The recovery commands preserve work and create a separate branch.', participant: 'Self-check A3, A4, and A5. Optionally share one blocker in chat.', watch: 'Never reset or overwrite participant work.', stuck: 'Use the reviewed day5-after-a5 tag.', stop: 'All three checkpoints are visible.', next: 'A6 · Run the live counterpart'})
  }),
  baseSlide({
    title: 'A6 · Run the live counterpart', kicker: 'Day 5 · A6 · CONCEPT', subtitle: 'Create a new live incident, challenge its evidence, and keep action human-owned.',
    cards: [{title: 'Before', body: 'Run healthy traffic for two minutes.'}, {title: 'Change', body: 'Run one bad deploy in its own terminal.'}, {title: 'Explain', body: 'Use stable refs and keep current telemetry separate.'}, {title: 'Human in the loop', body: 'Wrong incident or action stays blocked.'}],
    keyPoints: ['Window 1 is the console from A1. Restart it. Do not open a second one.', 'Do not let Claude run chaos.', 'The A8 human-in-the-loop check is the last A6 step.'],
    notes: note({time: '14:10 · 4 min', why: 'The learner now has the contracts needed for a real local route.', predict: 'Ask why the healthy baseline comes first.', see: 'The listener creates a new live incident about three minutes after healthy traffic starts.', inside: 'Run Window 1: AGENT_LISTEN_WINDOW_MIN=1 npm run console. Run Window 2: npm run shop. Run Window 3: npm run traffic. After the two-minute baseline, run Window 4: npm run chaos -- deploy v2.15.0 --mode bad-deploy. Detection and diagnosis take about 55 seconds.', participant: 'Write one plausible alternative cause.', watch: 'Keep fixture, live, diagnosis snapshot, and current telemetry distinct.', stuck: 'Stay on the scripted route.', stop: 'The room can state all four commands and the wait.', next: 'A6 example target'})
  }),
  screenshotSlide({number: 6, title: 'A6 · Example live incident proof', subtitle: 'The current run must reproduce the route and its evidence labels.', stage: 'live', shot: 'assets/day5-expected/a6.png', points: ['The live incident has its own id.', 'Diagnosis claims cite stable source:ref labels.', 'Snapshot evidence and current telemetry are labeled separately.'], next: 'Assignment 6 · start and trace', time: '14:14 · 2 min'}),
  assignmentSlide({
    number: 6, title: 'start and trace the live route · 1/2', subtitle: 'Map the path, reuse services, establish a baseline, then create one incident.', stage: 'live', duration: '14:16 · 22 min', shot: 'assets/day5-expected/a6.png',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a6Map, after: 'Claude Code maps the fixture and live routes without editing.'},
      {text: 'Type this in: Claude Code', prompt: PROMPTS.a6Build, after: 'Claude Code proposes the terminal order and waits for approval.'},
      {text: 'You, not Claude. Window 1 already runs the console from A1: press Ctrl+C there and start it again. Open two new windows for the shop and the traffic.', parts: [['Window 1', 'AGENT_LISTEN_WINDOW_MIN=1 npm run console'], ['Window 2', 'npm run shop'], ['Window 3', 'npm run traffic']], after: 'All three windows say they are running. Do not start a second console.', warn: true},
      {text: 'Human review. Keep healthy traffic running for two minutes.', after: 'A healthy before-state is visible. About 55 seconds remain after the deploy.', warn: true},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows). Use Window 4.', parts: [['Window 4', 'npm run chaos -- deploy v2.15.0 --mode bad-deploy']], after: 'About 55 seconds later, a new incident appears at localhost:4320.', warn: true}
    ],
    after: 'A new live incident exists with a healthy before-state and a visible tool trace.',
    checks: ['Show the live incident id.', 'Show the two-minute baseline.', 'Show the diagnosis trace.'],
    humanOpen: 'The participant starts chaos. Claude Code never runs or stops the processes.', next: 'Human in the loop · Part of A6'
  }),
  screenshotSlide({number: 8, title: 'Human in the loop · Part of A6', kicker: 'Day 5 · A6 · HUMAN IN THE LOOP', subtitle: 'The last safety check inside A6: only the right incident, the right action and a named person.', stage: 'gate', shot: 'assets/day5-expected/a8.png', points: ['A wrong incident stays blocked.', 'A wrong action stays blocked.', 'The real approval and execution remain HUMAN OPEN.'], next: 'Assignment 6 · challenge and human in the loop', time: '14:38 · 2 min'}),
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
    notes: note({time: '15:15 · 5 min', why: 'The required build route is now complete.', predict: 'Ask which proof another participant could repeat.', see: 'Three final A6 checks.', inside: 'The recovery commands preserve work and keep actions closed.', participant: 'Self-check the first missing proof. Optionally share one blocker in chat.', watch: 'Do not invent resolution or approval.', stuck: 'Use the reviewed day5-after-a6 tag.', stop: 'All required proof is visible.', next: 'Hackathon intent studio'})
  }),
  baseSlide({
    title: 'Hackathon intent studio', kicker: 'Day 5 · PRACTICE', subtitle: 'Back to Plan: sharpen one problem and three checks for your own Day 6–7 project.', type: 'review', layout: 'exercise', calm: true, mode: 'manual',
    stepsHeading: 'Prepare the next build',
    steps: [
      {text: 'Human review. Write one customer or operator problem.', after: 'The problem describes current pain, not a feature.'},
      {text: 'Human review. Write three results another person can repeat.', after: 'Each check has a visible result.'},
      {text: 'Human review. Mark the data and action boundaries.', after: 'The agent and human responsibilities are distinct.'},
      {text: 'Human review. Choose one small first build.', after: 'The next step fits one focused work session.'}
    ],
    expected: 'You have one problem, three checks, explicit boundaries, and one first build.',
    cards: [{title: 'Use on Day 6', body: 'This intent is the first hackathon input.'}, {title: 'Keep small', body: 'Do not design the full product today.'}],
    keyPoints: ['Problem before solution.', 'Checks before implementation.', 'One build before a roadmap.'],
    notes: note({time: '15:20 · 30 min', why: 'The workshop method becomes useful when it transfers to a new problem.', predict: 'Ask whether the first sentence describes pain or a feature.', see: 'One bounded hackathon intent.', inside: 'The same intent, build, proof, and review loop repeats.', participant: 'Write and self-review the four parts. Optionally share one in chat.', watch: 'Do not force the SRE sample as the hackathon topic.', stuck: 'Reuse operator, outcome, boundary, first build.', stop: 'Each learner has a reviewed start point.', next: 'Final recap'})
  }),
  baseSlide({
    title: 'Recap · The six-assignment loop', kicker: 'Day 5 · RECAP', subtitle: 'You went round the loop once. On Day 6 and 7 you do it again with your own project.', type: 'recap', layout: 'steps',
    items: [{label: 'A1', caption: 'repo map + setup proof'}, {label: 'A2', caption: 'reviewed intent'}, {label: 'A3', caption: 'verdict contract'}, {label: 'A4', caption: 'refusal + guard'}, {label: 'A5', caption: 'read tool + trace'}, {label: 'A6', caption: 'live evidence + human gate'}],
    keyPoints: ['Learn the repo.', 'Choose the outcome.', 'Build one contract.', 'Prove it.', 'Stop for the person.'],
    notes: note({time: '15:50 · 7 min', why: 'The final recall turns six builds into one reusable method.', predict: 'Ask which assignment created the first accepted artifact.', see: 'Six artifacts form one loop.', inside: 'The handoff carries only verified work forward.', participant: 'Explain one assignment in your own notes. Optionally share it in chat.', watch: 'Do not introduce new content.', stuck: 'Read the artifact captions.', stop: 'Collect one method each learner will reuse.', next: 'End at 16:00'})
  }),
  baseSlide({
    title: 'End at 16:00', kicker: 'Day 5 · DONE', subtitle: 'Keep your intent, evidence, OPEN list, and handoff.', type: 'context',
    cards: [{title: 'Keep', body: 'intent.md · evidence refs · focused checks · HANDOFF.md'}, {title: 'Do not claim', body: 'A human approval, execution, resolution, or promoted lesson that did not happen.'}],
    keyPoints: ['Thank the room.', 'Name the hackathon first step.', 'Keep the human boundary explicit.'],
    notes: 'Time: 15:57 · 3 min.\n\nThank the room. Invite an optional chat share of the first handoff line. End at 16:00.'
  }),
  baseSlide({
    title: 'Appendix · Optional product model', kicker: 'Day 5 · APPENDIX · OPTIONAL LIVE MODEL', subtitle: 'Run one approved model proof only after the required route.', type: 'concept', layout: 'exercise', calm: true, mode: 'manual',
    stepsHeading: 'Optional local proof',
    steps: [
      {text: 'Type this in: Claude Code', prompt: PROMPTS.liveModelSetup, after: 'Claude Code proposes the bounded proof and waits.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'npm run investigate -- fixtures/incidents/bad-deploy.json --model sonnet --max-turns 8 --max-budget-usd 0.30 --dry-run', after: 'One diagnosis and tool trace complete, or the run stops with a clear reason.', warn: true},
      {text: 'Human review. Inspect cost, diagnosis, and trace before any console restart.', after: 'A health label alone is not accepted as proof.', warn: true},
      {text: 'Open skills/triage/SKILL.md: the team runbook. With a real model, the agent reads it as its instructions. Compare the tool trace with the runbook’s order.', after: 'Runbook order: updates first, then the error graph, then the change, then the logs. Did the agent follow it? If not, write down where it differs.'},
      {text: 'Type this in: Terminal 2 (Git Bash on Windows)', prompt: 'env -u AGENT_MODEL AGENT_LISTEN_WINDOW_MIN=1 npm run console', after: 'The required scripted route is restored.'}
    ],
    expected: 'One bounded product-model proof is separate from the required scripted route.',
    keyPoints: ['Never display credentials.', 'One turn can exceed the budget.', 'The console has no global model-budget guard.'],
    notes: 'Appendix. Use only after the required six assignments and with approved model access. The model name in health is configuration, not proof. The runbook (skills/triage/SKILL.md) is loaded into the agent’s instructions only in real-model mode (src/prompts.ts, loadRunbook). In Ryan’s test run (docs/verification.md) the trace was summarize_metrics → list_deploys → get_diff → search_logs: the model looked at the graph before the updates, while the runbook says updates first.',
    teach: {
      time: '10 min · optional',
      gist: 'Optional: the agent investigates once with a real AI model. Now it reads the team runbook. Check cost, diagnosis and trace, then go back to the script.',
      copy: [['Step 1 · Claude Code', PROMPTS.liveModelSetup], ['Step 2 · Terminal', 'npm run investigate -- fixtures/incidents/bad-deploy.json --model sonnet --max-turns 8 --max-budget-usd 0.30 --dry-run'], ['Step 5 · Terminal', 'env -u AGENT_MODEL AGENT_LISTEN_WINDOW_MIN=1 npm run console']],
      script: [
        {do: 'Only for people who finished A6, with approved model access.', say: ['Until now the agent ran on a script.', 'Now it investigates once with a real AI model.']},
        {do: 'Paste the setup prompt in Claude Code.', copy: [['Step 1 · Claude Code', PROMPTS.liveModelSetup]], say: ['Claude Code explains the difference: itself is the builder; the agent now runs on its own model.', 'It proposes one test run and waits.']},
        {do: 'Run the investigate line in the terminal.', copy: [['Step 2 · Terminal', 'npm run investigate -- fixtures/incidents/bad-deploy.json --model sonnet --max-turns 8 --max-budget-usd 0.30 --dry-run']], say: ['One real run: at most 8 steps and $0.30.', 'The budget is checked between steps, so one step can go a bit over.']},
        {do: 'Check cost, diagnosis and trace together.', say: ['How much did it cost?', 'Does the diagnosis cite its sources?', 'Which tools did it use, in which order?']},
        {do: 'Open skills/triage/SKILL.md.', say: ['This is the team runbook: the shop team’s checklist for when something breaks.', 'With a real model, the agent reads it as its instructions.', 'Runbook order: updates first, then the error graph, the change, the logs.']},
        {ask: 'Did the agent follow the runbook’s order?', say: ['(Answer: look at the trace. In Ryan’s test it checked the graph first, then the updates.)', 'Is that a problem? Discuss: a model follows instructions, but not always exactly. That is why we check the trace.']},
        {do: 'Restart the console without the model.', copy: [['Step 5 · Terminal', 'env -u AGENT_MODEL AGENT_LISTEN_WINDOW_MIN=1 npm run console']], say: ['Back to the script, so everyone is on the same route again.']}
      ],
      learn: ['With a real model, the agent reads the team runbook as its instructions.', 'Always check cost, diagnosis and trace.', 'A model can differ from its instructions: the trace shows it.'],
      watch: ['Never show or copy credentials or keys.', 'No approved model access? Skip this slide.', 'Do not read the runbook’s “Things that have burned us” list aloud before the cause is found.'],
      terms: [['Runbook', 'a team’s checklist for when something breaks; here skills/triage/SKILL.md'], ['Tool trace', 'the list of tools the agent used, in order'], ['Budget', 'the maximum cost of one run, here $0.30']]
    }
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
  baseSlide({title: 'Appendix · Recovery without a solved branch', kicker: 'Day 5 · APPENDIX · FACILITATOR', subtitle: 'Recover the current step. Preserve participant work.', cards: [{title: 'After 2 minutes', body: 'Ask for the blocker and next focused check.'}, {title: 'After one failed attempt', body: 'Self-check the current artifact, then optionally share the blocker in chat.'}, {title: 'After two failed attempts', body: 'Use facilitator evidence and apply only the reviewed change.'}], keyPoints: ['No branch checkout between assignments.', 'No full suite after every prompt.', 'Preserve the participant diff.'], notes: 'Appendix. Never replace participant work with solved code.'}),
  baseSlide({title: 'Appendix · Optional real-model eval', kicker: 'Day 5 · APPENDIX · OPTIONAL', subtitle: 'Run only with approved access, cost, and data.', cards: [{title: 'Required proof', body: 'The scripted route checks deterministic fixtures.'}, {title: 'Optional proof', body: 'A separately approved eval can test model behavior.'}], keyPoints: ['Keep fixture and model evidence separate.', 'Record model, cost, and exact input.', 'Do not fill waiting time with a paid run.'], notes: 'Appendix. The required route needs no paid model.'}),
  baseSlide({title: 'Bonus · Daily Brief agent', kicker: 'Day 5 · BONUS', subtitle: 'Use the Daily Brief lab only after the SRE lesson.', repo: {url: 'https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1', label: 'AetherLink-bv/aetherlink-daily-brief-lab-s1'}, cards: [{title: 'Core route', body: 'Steps 1 to 4 · 30 to 40 minutes'}, {title: 'Homework', body: 'Steps 5 to 7'}, {title: 'Human in the loop', body: 'Open a pull request only after human review.'}], keyPoints: ['SRE is the main lesson.', 'Daily Brief is the bonus.', 'Reuse the same evidence and human-in-the-loop method.'], notes: 'Bonus only. Do not shorten the six required assignments to fit this lab.'})
];

window.DAY5_PROMPTS = PROMPTS;
window.SLIDES = day5Slides;
// SDLC tracker: which of the six phases lights up on each slide (see sdlcTrack in app.js).
// Breaks, the quiz and the post-lunch recap keep the phase of the slide before them.
const SDLC_BY_TITLE = [
  [/^(Let’s start the project|The skills Claude Code uses today|Sonny already runs|Morning: a fixture|A tour of the project|A1 |Assignment 1:|A2 |Assignment 2:)/, 'plan'],
  [/^A3 checkpoint/, 'test'],
  [/^A3 · How do we know/, 'test'],
  [/^(How your agent handles an incident|A3 · )/, 'design'],
  [/^(Assignment 3:|A4 |Assignment 4:|A5 |Assignment 5:)/, 'build'],
  [/^Catch-up · Ready for the live route/, 'test'],
  [/^(A6 |Assignment 6:|Human in the loop · Part of A6|Catch-up · Six required)/, 'deploy'],
  [/^Hackathon intent studio/, 'plan', true],
  [/^(Recap · |End at 16:00)/, 'all'],
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
