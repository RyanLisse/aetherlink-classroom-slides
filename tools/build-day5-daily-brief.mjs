// Builds day5-daily-brief-slides.js: the Daily Brief agent is the main route.
// The final slide links to the separate optional Sonny deck.
// Rerun after day5-jessy-slides.js changes: node tools/build-day5-daily-brief.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import vm from 'node:vm';
import {addDay5LessonMedia} from './day5-lesson-media.mjs';

const root = new URL('../', import.meta.url);
const ctx = {window: {}};
vm.runInNewContext(readFileSync(new URL('day5-jessy-slides.js', root), 'utf8'), ctx);
const jessy = ctx.window.SLIDES;
const byTitle = t => {
  const s = jessy.find(x => x.title === t);
  if (!s) throw new Error(`day5-jessy has no slide titled "${t}"`);
  return structuredClone(s);
};

const w5 = {window: {}};
vm.runInNewContext(readFileSync(new URL('workshop5-slides.js', root), 'utf8'), w5);
const fromWorkshop5 = t => {
  const s = w5.window.SLIDES.find(x => x.title === t);
  if (!s) throw new Error(`workshop5 has no slide titled "${t}"`);
  return structuredClone(s);
};

const dailyBriefSdlc = byTitle('The software development life cycle (SDLC)');
for (const beat of dailyBriefSdlc.teach?.script ?? []) {
  if (beat.shot?.startsWith('assets/day5-jessy-teach/s06-')) {
    beat.shot = beat.shot.replace('assets/day5-jessy-teach/', 'assets/day5-daily-brief-teach/');
  }
}

const REPO = {url: 'https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1', label: 'github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1'};
const PACK = {url: 'https://github.com/AetherLink-bv/claude-code-skills-pack', label: 'github.com/AetherLink-bv/claude-code-skills-pack'};

// One skill per assignment. The prompts are verbatim in the lab's SOLO.md and docs/prompts.md.
const SKILLS = {
  1: {name: 'grilling', what: 'asks you hard questions, one at a time, until nothing is assumed', prompt: '/grilling Grill me on my intent.md, one question at a time. Focus on the checks a neighbour cannot observe. Do not edit files.'},
  2: {name: 'eli5', what: 'explains code simply, with the real mechanism', prompt: '/eli5 Explain my schema and test/schema.test.ts as for an intelligent beginner: what each field checks and why the test was red first. Do not edit files.'},
  3: {name: 'visual-plan', what: 'turns a plan into one HTML page you can read', prompt: '/visual-plan Turn my accepted docs/plan.md into one HTML page I can read in the browser. Do not change the plan.'},
  4: {name: 'verify-this', what: 'proves or disproves one claim with a fresh run', prompt: '/verify-this Prove that npm run brief:sample writes out/latest.html without a model call. Show the command, exit code and one line of output.'},
  5: {name: 'show-me', what: 'draws how the code connects, without changing it', prompt: '/show-me Draw how one source reaches the brief: src/sources.ts, the tool in src/agent.ts, and src/main.ts. Only read, change nothing.'},
  6: {name: 'verify-this', what: 'reruns your evidence and compares the result', prompt: '/verify-this Rerun the three commands in docs/evidence.md and compare each exit code with what is written. Mark any difference OPEN.'},
  7: {name: 'review-and-ship', what: 'reviews your branch and prepares the PR', prompt: '/review-and-ship Review my work against intent.md and docs/gate.md. Run the tests. Prepare the PR, but stop before you open it and before any merge.'}
};
const HANDOFF = '/handoff Write a prompt for a fresh Claude Code session to continue from my current step. Name the step, the files, and the next proof.';
const SOLO_PROMPTS = {
  1: 'Read CLAUDE.md, SOLO.md, and the templates. Interview me one question at a time. Draft intent.md with one outcome, three observable checks, owners, a hard boundary, and one OPEN. Challenge my weakest check with one concrete counterexample. Revise only after my answer. Show the diff and stop for my review. Do not implement code.',
  2: 'Read my accepted intent.md and reference/. Draft docs/spec.md with one quoted example per field, then stop for my approval. After I approve it, write test/schema.test.ts and run it to show the expected red failure. Stop so I can inspect and commit the red test. After I confirm, build src/brief.ts and sample/brief.sample.json until the test passes. Ask me for one invalid sample and prove the schema rejects it. Show the test output and diff. Do not build a renderer or tools.',
  3: 'In plan mode, read intent.md, docs/spec.md, and the current diff. Propose docs/design.md, one decision under docs/decisions/, and docs/plan.md. Give every plan step an exact path, proof command, and rollback. Do not edit files or build. Stop for my approval. After I approve the plan, tell me to press Shift+Tab until manual mode is on. Then save only those design documents, challenge one assumption with a case I choose, show the revised diff, and stop.',
  4: 'Use my accepted docs/plan.md. Write test/render.test.ts and show the expected red failure. Then build src/render.ts and a sample-only src/main.ts. Escape untrusted text. Run npm run brief:sample and show out/latest.html. Ask me to choose one house-style change. Add its failing test first, make it pass, regenerate the page, and show the diff. Use no API key or model call. Stop for my inspection.',
  5: 'Read my accepted plan and schema. Build src/agent.ts, src/sources.ts, and test/agent.test.ts for one read-only tool. Connect src/main.ts to the agent for the live brief command. Preserve brief:sample without model calls. Give the brief agent no shell or write tools. Prove the tool wiring and one missing-source case I choose with tests. With credentials, run the brief and trace each factual claim to run.log. Without credentials, run the sample and mark the live check OPEN. Never print tokens. Show the proof and diff, then stop.',
  6: 'Run the existing typecheck, test, and brief:sample scripts. Record every command, exit code, and one output line in docs/evidence.md. Link docs/evidence/latest-1440x900.png. Mark unrun checks OPEN. Do not change code to hide a failure. Ask my reviewer to rerun one command. Record the reviewer\'s actual name and result only after the rerun. Show the evidence diff and stop.',
  7: 'Read intent.md, the current diff, and docs/evidence.md. Draft docs/gate.md with evidence links and proposed FAIL or OPEN entries for missing checks. Leave every PASS decision to me. Prepare a PR title, description, and inactive weekday schedule. Show the diff and stop for my gate decision. Do not commit, push, open a PR, merge, deploy, or activate the schedule.'
};
const say = (time, why, see, watch, stop, next) =>
  `Time: ${time}.\n\nWhy now: ${why}\n\nWhat you see: ${see}\n\nWatch for: ${watch}\n\nIf stuck: Ask Claude Code to state the blocker and the next focused check.\n\nStop: ${stop}\n\nNext: ${next}`;

// Stage per assignment, as in the AI-native SDLC playbook: intent.md is Plan, spec.md is Design, plan.md is Build.
const SDLC = {1: 'plan', 2: 'design', 3: 'build', 4: 'build', 5: 'build', 6: 'test', 7: 'deploy'};
const PLAYBOOK = {url: 'https://claude.com/resources/articles/the-ai-native-sdlc-playbook', label: 'claude.com · The AI-native SDLC playbook'};
const STAGE = {1: 'intent', 2: 'contract', 3: 'contract', 4: 'tools', 5: 'tools', 6: 'gate', 7: 'gate'};

// The presenter view and the day sheet read `teach`. Info slides pass it in directly.
const info = (slide, teach) => ({...slide, teach: {next: teach.next ?? slide.notes.split('Next: ')[1], ...teach}});

const teachFor = (n, time, {gist, say, learn, watch, terms, done, prompt, next}) => ({
  time,
  gist,
  do: ['Check the Claude Code mode, paste the SOLO prompt, inspect the named check, then approve or revise.'],
  done,
  copy: [[`SOLO ${n} · Claude Code`, prompt], [`Project skill · /${SKILLS[n].name}`, SKILLS[n].prompt]],
  script: [
    {do: 'Slide appears. Read the goal and the checkpoint out loud.', say},
    n === 3 ? {do: 'Step 1. Everyone checks “plan mode on” at the bottom of Claude Code.', say: ['Plan mode for this one. Claude Code can read and propose, but cannot change files.']} : {do: 'Step 1. Everyone checks “manual mode on” at the bottom of Claude Code.', say: ['Manual mode first. Claude Code asks before every change, so you stay the reviewer.']},
    {do: 'Step 2. Participants copy the SOLO prompt. Walk the room.', say: ['Paste this exact prompt. Claude Code stops at the review point named in the prompt.']},
    {do: 'Step 3. Participants answer the check on the slide.', say: ['Read the result and the diff. Answer the check with yes or no. Revise if the answer is no.']},
    {do: `Step 4. Use /${SKILLS[n].name} for the final inspection.`, say: [`This project skill ${SKILLS[n].what}. It does not replace the SOLO prompt or the checkpoint.`]},
    n === 7
      ? {do: 'Step 5. Approve publication only after the gate review.', say: ['Claude Code then commits the accepted gate files, pushes HEAD to a new remote branch and opens the PR. Stop before merge or activation.']}
      : {do: 'Step 5. Save only accepted work.', say: ['Commit only after you accept the result. Ask one participant to show the visible proof.']}
  ],
  learn,
  watch,
  terms,
  next
});

const assignment = (n, step, title, subtitle, checkpoint, boundary, prompt, improve, notes, teach) => ({
  title: `Assignment ${n}: ${title}`,
  kicker: `Day 5 · A${n} · SOLO ${step}`,
  subtitle,
  type: 'practice',
  layout: 'exercise',
  beat: 'turn',
  sdlc: SDLC[n],
  stage: STAGE[n],
  mode: n === 3 ? 'plan' : 'manual',
  calm: true,
  expected: checkpoint.at(-1),
  repo: REPO,
  assignmentId: `brief-a${n}`,
  teach: teachFor(n, notes.match(/^Time: ([^.]+)\./)[1], {prompt, done: checkpoint, ...TEACH[n]}),
  cards: [{title: 'Checkpoint', body: checkpoint.join('\n')}, {title: 'Human boundary', body: boundary}],
  keyPoints: checkpoint,
  stepsHeading: 'Do this',
  steps: n === 7 ? [
    {where: 'Claude Code', text: 'In manual mode, paste the exact SOLO 7 prompt', prompt},
    {where: 'Claude Code', text: 'Inspect the gate diff. Make every PASS decision yourself.', after: checkpoint.at(-1)},
    {where: 'Project skill', text: 'Run /review-and-ship before the gate decision', prompt: SKILLS[7].prompt},
    {where: 'Terminal', text: 'After approval, commit the accepted Assignment 7 files'},
    {where: 'Terminal', text: 'Push HEAD to a new remote branch and open the PR', prompt: 'BRANCH="my/<firstname>"\ngit push origin "HEAD:refs/heads/$BRANCH"\ngh pr create --repo AetherLink-bv/aetherlink-daily-brief-lab-s1 --base main --head "$BRANCH"', after: 'If origin is not writable, use the fork route in SOLO.md. Stop before merge, deployment or schedule activation.'}
  ] : [
    {where: 'Claude Code', text: `In ${n === 3 ? 'plan' : 'manual'} mode, paste the exact SOLO ${n} prompt`, prompt, after: 'Not in the right mode? Press Shift+Tab first.', warn: true},
    {where: 'Claude Code', text: n === 3 ? 'After approval, return to manual mode. Then inspect the saved documents.' : 'Inspect the result and answer the checkpoint', after: checkpoint.at(-1)},
    {where: 'Project skill', text: `Run /${SKILLS[n].name} for the final inspection`, prompt: SKILLS[n].prompt},
    {where: 'Terminal', text: 'Commit only the work you accepted'}
  ],
  prompt,
  notes
});

const TEACH = {
  1: {
    gist: 'Claude Code interviews the participant. The answer is intent.md: one outcome, three checks you can see, owners, a hard boundary and one OPEN.',
    say: ['Before we write code, we write down what done means.', 'Claude Code asks you one question at a time. You answer, it writes intent.md.', 'A check you cannot see is not a check. “Useful” is not a check. “Shows my first meeting at the top” is.'],
    learn: ['The intent decides what done means for every later step.', 'A check must be something a neighbour can observe.', 'One OPEN is fine. It is a known unknown, written down.'],
    watch: ['Checks like “useful” or “clear”. Ask: how would your neighbour see that?', 'Claude Code that starts on code. Say: stop, intent only.', 'Live accounts. Today is sample data only.'],
    terms: [['intent.md', 'the file that says what the brief must do and how you check it'], ['OPEN', 'a question or check that is not answered yet, written down on purpose'], ['Boundary', 'something the agent must never do']],
    next: 'make the schema test fail, then pass.'
  },
  2: {
    gist: 'From the reference brief PDFs to a spec with one quoted example per field. A schema test that is red first, then the schema that makes it green.',
    say: ['The spec says which fields a brief has. Each field gets one real example from the reference PDFs.', 'Then a test. It must fail first. A test that never failed has not proved it can catch anything.', 'Only then the schema. Green means the schema matches the spec.'],
    learn: ['Red first proves the test can catch a mistake.', 'Commit the red test before the schema.', 'npm test green on the schema tests is the proof.'],
    watch: ['A test written after the code. Ask for the red run.', 'Fields without a quoted example in docs/spec.md.', 'Someone who starts a renderer. That is A4.'],
    terms: [['Spec', 'docs/spec.md: the fields of a brief, each with a quoted example'], ['Schema', 'src/brief.ts: code that checks a brief has the right fields'], ['Red / green', 'a failing test / a passing test']],
    next: 'agree on the design and the plan.'
  },
  3: {
    gist: 'Plan mode. Claude Code proposes the design, one decision record and a plan with a path, a proof command and a rollback per step. Nothing changes until the participant accepts.',
    say: ['Now Claude Code only proposes. It cannot change files in plan mode.', 'Each step in the plan names three things: which file, which command proves it, how to undo it.', 'You accept the plan. That is a human decision.'],
    learn: ['A plan with a proof per step makes the build easy to review.', 'Plan mode keeps the agent from building too early.', 'A decision record says why, not only what.'],
    watch: ['Plan steps without a proof command.', 'Someone who leaves plan mode before accepting. Press Shift+Tab back.', 'Very long plans. Ask for one screen.'],
    terms: [['Plan mode', 'Claude Code proposes, but cannot edit files'], ['ADR', 'a short decision record under docs/decisions/'], ['Rollback', 'how to undo one step']],
    next: 'render the brief from sample data.'
  },
  4: {
    gist: 'A red render test, then src/render.ts and a sample-only src/main.ts. npm run brief:sample writes out/latest.html. No API key and no model call.',
    say: ['The first thing you can see today: your brief as a web page.', 'Same rule: the render test fails first.', 'No model call. The sample route must work without a network.'],
    learn: ['out/latest.html is the first visible proof.', 'Escape untrusted text before it goes into HTML.', 'A style change is a test first, then the change.'],
    watch: ['A model call in the sample path.', 'Unescaped text from the sources in the HTML.', 'Save the 1440×900 screenshot now as docs/evidence/latest-1440x900.png. A6 needs it.'],
    terms: [['Renderer', 'src/render.ts: turns a brief into HTML'], ['brief:sample', 'the npm script that renders the sample brief, with no model call'], ['Escape', 'make text safe to put in HTML']],
    next: 'after lunch, give the agent one read-only tool.'
  },
  5: {
    gist: 'The agent gets one read-only tool for one source. Tests prove the wiring and the missing-source case without a network. brief:sample keeps working.',
    say: ['Now the agent. It gets one tool, and that tool can only read.', 'No shell, no write tools. An agent is only as safe as its tools.', 'No credentials? Then the live check is OPEN, not failed.'],
    learn: ['One read-only tool is enough to prove the wiring.', 'A missing source is a normal case. Test it.', 'Never print a token.'],
    watch: ['Shell or write tools on the brief agent.', 'Tokens in a prompt, a log or a commit.', 'brief:sample that suddenly needs a model.', 'Keep the scope to exactly one read-only tool.', 'run.log comes from: npm run brief 2> run.log.'],
    terms: [['Tool', 'a function the agent may call'], ['Read-only', 'the tool can look, but cannot change anything'], ['run.log', 'the log that each claim in a live brief traces back to']],
    next: 'record the evidence.'
  },
  6: {
    gist: 'Run typecheck, test and brief:sample. Write each real command, its exit code and one output line in docs/evidence.md. A neighbour reruns one.',
    say: ['A claim without evidence is a hypothesis.', 'Write down the real command and the real exit code. Not from memory.', 'Your neighbour reruns one command. Same result? Then it counts.'],
    learn: ['Evidence is a command, an exit code and an output line.', 'An unrun check is OPEN.', 'A reviewer is a real person with a real name.'],
    watch: ['Evidence typed from memory.', 'Code changed to hide a failure.', 'A reviewer name filled in before the rerun.'],
    terms: [['Exit code', '0 means the command passed; anything else means it failed'], ['Evidence', 'docs/evidence.md: what you ran and what came out'], ['Reviewer', 'the person who reruns one command']],
    next: 'decide the gate and prepare the PR.'
  },
  7: {
    gist: 'Claude Code drafts docs/gate.md and a PR preview. The participant decides PASS, commits, then opens the PR. The schedule stays inactive.',
    say: ['The gate is where a human decides.', 'Claude Code may propose FAIL or OPEN. Only you write PASS.', 'After approval, commit and open the PR. Do not merge, deploy or activate the schedule.'],
    learn: ['PASS is a human decision with evidence in front of you.', 'An OPEN item can become a new check.', 'The schedule stays inactive.'],
    watch: ['An agent that writes PASS.', 'A schedule that is switched on.', 'A merge or a deploy. Stop before both.'],
    terms: [['Gate', 'docs/gate.md: PASS, FAIL or OPEN for each check'], ['PR', 'a pull request: your change, ready for review'], ['Inactive schedule', 'the weekday run, written down but not switched on']],
    next: 'Maintain: close the loop.'
  }
};

const brief = [
  {
    title: 'Build Bree, your morning brief agent',
    kicker: 'Day 5',
    subtitle: 'Turn updates from four sources into a one-page brief you can check.',
    keyPoints: ['Define what the brief should include.', 'Test it against the sources before you approve it.'],
    notes: 'Time: 5 min.\n\nOn Day 4, the ticket agent drafted a reply for a person to review. Today you set the criteria for a different draft: your morning brief. Use one example: if Bree flags a ticket for standup, can you trace it to the source before you act?\n\nNext: 08:30: your morning',
    teach: {
      time: '5 min',
      gist: 'The team defines what a useful brief contains and checks it before approval.',
      script: [{do: 'Connect the ticket draft to the morning brief.', say: ['Yesterday your agent drafted a customer reply. You reviewed it before it could go out.', 'Today you decide what Bree should flag. If she says a ticket needs attention, you should be able to find the update behind that claim.']}],
      learn: ['Set a criterion for a useful brief and check the result against its source.'],
      next: '08:30: your morning'
    }
  },
  {
    title: 'From one reviewed draft to one reviewed brief',
    kicker: 'Day 5 · Day 4 recap',
    subtitle: 'The product changes. The working pattern stays the same.',
    type: 'concept',
    cards: [
      {title: 'Day 4 · Ticket', body: 'Message → main agent → sub-agents → validated priority → review draft.'},
      {title: 'Day 5 · Brief', body: 'Four sources → Bree → fixed schema → source checks → human review.'}
    ],
    keyPoints: ['The agent prepares a result.', 'Code checks the result.', 'A person decides what happens next.'],
    notes: 'Time: 3 min.\n\nUse one concrete Day 4 run: MSG-05 became a high-priority review draft. The workflow did not send it. Today Bree reads four sample sources and prepares one brief. The brief is checked before a person approves it.\n\nNext: 08:30: your morning',
    teach: {
      time: '3 min',
      gist: 'Day 5 reuses the Day 4 pattern with four sources and one reviewed brief.',
      script: [{do: 'Compare one finished Day 4 ticket with today’s brief.', say: ['Yesterday MSG-05 became a validated high-priority draft for review. Nothing was sent automatically.', 'Today Bree combines four sources. Code checks the structure and source references before you review the page.']}],
      learn: ['Agent prepares, code checks, person decides.'],
      next: '08:30: your morning'
    }
  },
  {
    title: '08:30: your morning',
    kicker: 'Day 5 · THE STORY',
    subtitle: 'Four tools, four tabs. Before you can start, you read them all.',
    type: 'context',
    stage: 'learn',
    cards: [
      {title: 'The clock', body: '08:30. Standup at 09:00.'},
      {title: 'On your screen', body: 'Four tools, each with something new since yesterday.'},
      {title: 'Bree reads too', body: 'What do you want on one page?\nAnd what should she never do?'}
    ],
    keyPoints: ['Every morning: GitLab, Jira, Confluence, Outlook.', 'Fifteen minutes of reading before real work.', 'Bree, your brief agent, reads them for you.'],
    visual: {wakeUp: {
      clock: '08:30',
      tag: 'YOU · BEFORE WORK',
      screen: 'laptop · 08:30',
      alert: 'Standup at 09:00 · 3 reviews wait · 2 tickets moved · 1 page changed',
      chart: {label: 'tabs to read before work', from: '0', to: '4', limit: '1', mark: 'standup 09:00'},
      world: [['GitLab', '3 reviews', '🦊'], ['Jira', '2 tickets', '🎫'], ['Outlook', '4 meetings', '📅']],
      sonny: {tag: 'BREE · YOUR BRIEF AGENT', bubble: 'Reading your four tools…'}
    }, reveal: 'click', covers: []},
    notes: say('3 min', 'Make the problem personal: everyone has this morning.', 'The clock, the four tools, Bree.', 'People who want to connect real accounts. Today is sample data only.', 'Participants recognise their own morning.', 'How we want Bree to work')
  },
  {
    title: 'How we want Bree to work',
    kicker: 'Day 5 · THE STORY',
    subtitle: 'She looks. She writes one page. She checks it. You read it.',
    type: 'context',
    stage: 'learn',
    cards: [
      {title: 'She looks', body: 'At four tools. She only reads.'},
      {title: 'She writes one page', body: 'Always the same format. Every line with a source.'},
      {title: 'She checks it', body: 'Against fixed rules, before you see it.'},
      {title: 'You read it', body: 'She sends nothing and changes nothing.'}
    ],
    keyPoints: ['She only reads the four tools.', 'One page, always the same format.', 'Every line says where it comes from.'],
    visual: {agentJob: {
      botTag: 'BREE',
      looks: [['🦊', 'merge requests'], ['🎫', 'tickets'], ['📄', 'changed pages'], ['📅', 'your calendar']],
      docName: 'brief · Tuesday',
      doc: [
        ['First thing', 'standup at 09:00, then review MR !42 before 11:00', ['outlook:09:00', 'gitlab:!42']],
        ['Watch', 'ticket ABC-101 moved to “blocked”', 'jira:ABC-101'],
        ['Read later', 'the release page changed yesterday', 'confluence:release']
      ],
      check: {rules: ['Every line has a source', 'Times in order', 'Unknown? Write OPEN', 'No secrets on the page', 'One page']},
      wait: 'ready for you to read',
      yes: 'Read it',
      no: 'Ask a question'
    }, reveal: 'click', covers: []},
    notes: say('4 min', 'Show the whole agent before the steps.', 'Looks, page, check, you.', 'Questions about live data. Sample data first; live is OPEN until A5.', 'Participants can say the four parts in their own words.', 'The software development life cycle')
  },
  dailyBriefSdlc,
  {
    title: 'The AI-native SDLC',
    kicker: 'Day 5 · WHY WE ARE HERE',
    subtitle: 'The same six stages. The agent does the work. A person decides at every stage.',
    type: 'concept',
    source: PLAYBOOK,
    cards: [
      {title: 'One file per stage', body: 'Every stage commits a file the next stage can read.'},
      {title: 'The agent works', body: 'Claude Code writes, tests and proposes.'},
      {title: 'A person decides', body: 'You accept the intent, the plan and the gate.'}
    ],
    keyPoints: ['Bree is the example. The AI-native SDLC is the lesson.', 'One file per stage: intent.md, spec.md, plan.md, evidence.md, gate.md.', 'The agent may act up to the gate. It cannot pass it.'],
    notes: say('4 min', 'Say what the day is for: the way of working, not the brief agent.', 'Three ideas from the playbook.', 'Participants who think the goal is a nice brief. The goal is the loop.', 'Participants can say: one file per stage, a person decides.', 'Today: build the brief through the SDLC')
  },
  {
    title: 'Today: build the brief through the SDLC',
    kicker: 'Day 5 · Seven steps',
    subtitle: 'One step at a time. Each step has a file you write and a proof you show.',
    cards: [
      {title: 'Plan', body: 'A1 · intent.md'},
      {title: 'Design', body: 'A2 · spec.md and the schema'},
      {title: 'Build', body: 'A3 · plan.md, in plan mode\nA4 · the renderer\nA5 · one read-only tool'},
      {title: 'Test', body: 'A6 · evidence.md'},
      {title: 'Deploy', body: 'A7 · gate.md. A person decides.'},
      {title: 'Maintain', body: 'What you learn becomes a new intent.md.'}
    ],
    keyPoints: ['Every stage leaves one file the next stage reads.', 'A1 to A4 before lunch, A5 to A7 after.', 'Sonny is the bonus.'],
    notes: say('5 min', 'Show the whole route before the first step.', 'The seven steps on the SDLC loop.', 'Groups that want to skip the plan. The plan is what makes the build fast.', 'Participants know where they are at every moment of the day.', 'Start the project')
  },
  {
    title: 'Start the project',
    kicker: 'Day 5 · Setup',
    subtitle: 'Clone the lab, install the dependencies, and open Claude Code from the repository root.',
    type: 'practice',
    layout: 'exercise',
    repo: REPO,
    stepsHeading: 'Do this',
    steps: [
      {where: 'Terminal', text: 'git clone https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1.git'},
      {where: 'Terminal', text: 'cd aetherlink-daily-brief-lab-s1 && npm ci'},
      {where: 'Terminal', text: 'claude --setting-sources project,user --strict-mcp-config --no-chrome'},
      {where: 'Claude Code', text: 'Inspect the starting point', prompt: 'Read README.md, CLAUDE.md, SOLO.md, AGENTS.md, intent.md, and progress.md. Report the current step, the starting files, and any blockers. Do not change files yet.'}
    ],
    keyPoints: ['Node.js 20 or newer, Git, and Claude Code signed in.', 'Keep Claude Code and Terminal in this repository root.', 'No API key is needed before Assignment 5.'],
    notes: say('10 min', 'Everyone starts from the same clean main branch.', 'Claude Code reports the starting files and no blockers.', 'An existing clone. Ask Claude Code to inspect git status first, and use git pull --ff-only only when it is clean.', 'Every participant has Claude Code open in the repository root.', 'The rules for today')
  },
  {
    title: 'The rules for today',
    kicker: 'Day 5 · Rules',
    subtitle: 'Read CLAUDE.md, AGENTS.md, progress.md and SOLO.md before you change anything.',
    keyPoints: [
      'Sample data only. No credential in a prompt or a commit.',
      'Every claim needs a source, a check and a reviewer. Otherwise it is OPEN.',
      'Append progress.md after each step.',
      'Use your own diff and the named check. Do not copy solution files.'
    ],
    notes: say('3 min', 'Set the rules once, so the steps can stay short.', 'Four rules.', 'Participants who copy solution files. Ask them to use their own diff and named check.', 'Participants can name the OPEN rule.', 'What is a skill?')
  },
  {
    title: 'What is a skill?',
    kicker: 'Day 5 · SKILLS',
    subtitle: 'A saved recipe for Claude Code. You type /name, it follows the recipe.',
    type: 'concept',
    cards: [
      {title: 'A folder', body: '.claude/skills/grilling/SKILL.md\nOne file with the recipe.'},
      {title: 'A name', body: 'Type /grilling and Claude Code loads it.'},
      {title: 'A recipe', body: 'The steps a good colleague would follow. Every time the same.'}
    ],
    keyPoints: ['A skill is a folder with one SKILL.md.', 'You start it with /name.', 'A skill guides the work. Tests still prove it.'],
    notes: say('3 min', 'Explain the idea once, before the first skill.', 'Folder, name, recipe.', 'People who think a skill is a plugin or a model. It is text in a folder.', 'Participants can say where a skill lives.', 'The skills you use today')
  },
  {
    title: 'Use the included project skills',
    kicker: 'Day 5 · PROJECT SKILLS',
    subtitle: 'The lab already has the skills you use today. One per assignment.',
    type: 'concept',
    cards: [
      {title: 'A1–A2', body: '/grilling challenges the intent. /eli5 explains the schema.'},
      {title: 'A3–A4', body: '/visual-plan shows the plan. /verify-this checks the sample.'},
      {title: 'A5–A6', body: '/show-me traces the tool. /verify-this checks the evidence.'},
      {title: 'A7 and handoff', body: '/review-and-ship reviews the gate. /handoff continues later.'}
    ],
    keyPoints: ['Type / in Claude Code to see them.', 'Use only these project skills during the lesson.', 'The full skills pack comes at the end of the day.'],
    prompt: HANDOFF,
    notes: say('3 min', 'Show the tools before the first assignment.', 'Seven skills, one per step.', 'Participants who install the full pack now. That is for the hackathon.', 'Everyone can find /grilling after typing /.', 'Assignment 1')
  },
  {
    title: 'What Bree should do, and what she does today',
    kicker: 'Day 5 · PLAN',
    subtitle: 'Today Bree is an empty project. The difference is what you write down.',
    type: 'concept',
    sdlc: 'plan',
    cards: [{title: '08:30', body: ''}, {title: 'How we want Bree', body: ''}, {title: 'The project today', body: ''}, {title: 'The gap', body: ''}, {title: 'intent.md', body: ''}],
    keyPoints: ['What Bree should do comes from your morning.', 'Today the project has templates, no code.', 'The gap is your intent.md.'],
    visual: {gapCompare: {
      icons: ['⏰', '🧭', '📁', '↔️', '📝'],
      focus: 3,
      reveal: [2, 1, 1],
      head: ['How we want Bree to work', 'What the project has today'],
      rows: [
        ['She reads four tools', ['no src/ folder'], false],
        ['She writes one page, always the same format', ['no schema, no test'], false],
        ['She checks every line has a source', ['no check'], false],
        ['You read it before work', ['the reference PDFs show the target'], true]
      ],
      note: 'The difference is the gap. You write down how we want Bree to work: that is intent.md.'
    }},
    notes: say('3 min', 'Turn the story into a gap you can close.', 'Four rows, three still empty.', 'Participants who start coding. First the goal.', 'Participants can name the gap.', 'intent.md: what goes in it')
  },
  {
    title: 'intent.md: what goes in it, and where it lives',
    kicker: 'Day 5 · PLAN',
    subtitle: 'First the goal. Then the rules, the tests, the code. Each in its own place.',
    type: 'concept',
    sdlc: 'plan',
    cards: [{title: 'What goes in intent.md', body: 'One outcome, three checks, owners, a boundary, one OPEN.'}, {title: 'Where it lives', body: 'Goal, rules, tests, code. Each in its own place.'}],
    keyPoints: ['intent.md: one outcome, three checks, owners, a boundary, one OPEN.', 'Goal, rules, tests, code: four places.', 'Today you write all four, one assignment at a time.'],
    visual: {intentFlow: [
      {doc: [['Outcome', true, '', 'what Bree delivers each morning'], ['Three checks', true, '', 'what a neighbour can see'], ['Owners', true, '', 'who decides'], ['Boundary', true, '', 'what Bree may never do'], ['OPEN', true, '', 'what we do not know yet']]},
      {tree: [[0, 'aetherlink-daily-brief-lab-s1/'], [1, 'intent.md', 'the goal · you, Assignment 1', true, 'Plan'], [1, 'docs/spec.md', 'the rules: what a good brief is · Assignment 2', true, 'Design'], [1, 'test/', 'the tests: red first, then green · Assignments 2, 4, 5', true, 'Test'], [1, 'src/', 'the code: Bree herself · Assignments 2, 4, 5', true, 'Build']]}
    ]},
    notes: say('3 min', 'Show where each piece of work lives before the first assignment.', 'Five parts, four places.', 'Long intents. One screen is enough.', 'Participants know what A1 asks for.', 'Assignment 1')
  },
  assignment(1, 1, 'Write down what the brief must do', 'Claude Code interviews you. You write intent.md. No code yet.',
    ['intent.md has one outcome and three checks you can observe.', 'It names the owners, one hard boundary and one OPEN.', 'A facilitator accepts the boundary.'],
    'Do not implement code. Stop for review.',
    SOLO_PROMPTS[1],
    'Challenge my weakest check with one concrete counterexample. Revise only intent.md after my answer. Show the diff and stop.',
    say('25 min', 'The intent decides what done means for every later step.', 'A short intent.md with checks you can test.', 'Checks that cannot be observed, such as "the brief is useful".', 'A facilitator accepts the boundary.', 'Assignment 2')),
  {
    title: 'A brief you can trust',
    kicker: 'Day 5 · THE CONTRACT',
    subtitle: 'Always the same format. Every line with a source. Checked before you see it.',
    type: 'context',
    sdlc: 'design',
    cards: [{title: '08:30', body: ''}, {title: 'She looks', body: ''}, {title: 'She writes', body: ''}, {title: 'She checks', body: ''}, {title: 'You read', body: ''}],
    keyPoints: ['Same format every morning: that is the schema.', 'Five rules, checked in plain code.', 'One rule broken? You see the error, not the brief.'],
    visual: {contractZoom: {
      icons: ['⏰', '👀', '📝', '📋', '🧑'],
      gate: 'only if every rule is met',
      look: {title: 'She looks', body: 'At four tools. She only reads. She changes nothing.', items: [['🦊', 'merge requests'], ['🎫', 'tickets'], ['📄', 'changed pages'], ['📅', 'your calendar']]},
      docName: 'Bree’s brief · Tuesday · always this format',
      doc: [
        {label: 'First thing', text: 'standup at 09:00', ev: ['outlook:09:00'], key: 'first'},
        {label: 'Reviews', text: 'MR !42 waits for you since yesterday', ev: ['gitlab:!42'], key: 'reviews'},
        {label: 'Tickets', text: 'ABC-101 moved to “blocked”', ev: ['jira:ABC-101'], key: 'tickets'},
        {label: 'Read later', text: 'the release page changed', ev: ['confluence:release'], key: 'later', small: true},
        {label: 'Missing', text: 'none', key: 'gaps', small: true},
        {label: 'Today’s meetings', text: 'not there', fixed: '09:00 standup · 14:00 planning; room: OPEN', key: 'meetings', ghost: true}
      ],
      docFoot: 'An example · your own fields come from the reference briefs',
      rulesTitle: 'The schema: five rules · click to check',
      fixLabel: 'what if she writes it?',
      rules: [
        {text: 'Every line has a source', ok: true, note: 'four sources', hl: ['outlook:09:00', 'gitlab:!42', 'jira:ABC-101', 'confluence:release']},
        {text: 'Times are in order', ok: true, note: '09:00 first', hl: ['first']},
        {text: 'Unknown? Write OPEN', ok: true, note: 'nothing unknown', hl: ['gaps']},
        {text: 'No secrets on the page', ok: true, note: 'none', hl: ['later']},
        {text: 'Today’s meetings are on the page', ok: false, note: 'missing', noteOk: 'there', hl: ['meetings']}
      ],
      result: 'One rule broken: this brief is stopped. You see “schema: meetings missing”, not the brief. In Assignment 2 you write this check, red first.',
      ask: {say: 'All five rules met. Your brief is ready.', yes: 'Read it', no: 'Ask a question', yesReply: 'You read it. Bree changed nothing.', noReply: 'Ask Bree: where does this line come from?'}
    }},
    notes: say('5 min', 'Explain the contract before the participants write it.', 'The brief, the five rules, one broken.', 'Participants who think the model checks itself. The check is plain code.', 'Participants can say what a schema is in one sentence.', 'Assignment 2')
  },
  assignment(2, 2, 'Make the schema test fail, then pass', 'From the reference briefs to a spec, a red test and a schema.',
    ['docs/spec.md has one quoted example per field.', 'test/schema.test.ts was red first, then green.', 'npm test passes.'],
    'Commit the red test before you build the schema. No renderer and no tools yet.',
    SOLO_PROMPTS[2],
    'Add one invalid sample of my choice to test/schema.test.ts. Prove the schema rejects it. Show the spec row, test output, and diff. Stop before SOLO 3.',
    say('30 min', 'A test that failed first proves it can catch a mistake.', 'Red test output, then green.', 'A test written after the code. Ask for the red run.', 'npm test is green on the schema tests.', 'Break')),
  byTitle('Break'),
  assignment(3, 3, 'Agree on the design and the plan', 'In plan mode. Claude Code proposes, you accept. No files change until you say so.',
    ['docs/design.md, one decision under docs/decisions/ and docs/plan.md.', 'Each plan step names a path, a proof command and a rollback.', 'A stranger can follow the plan.'],
    'Stay in plan mode until you accept. Do not build.',
    SOLO_PROMPTS[3],
    'After I accept the plan, save only those design documents. Challenge one assumption with the case I choose. Show the revised plan and diff. Stop before building.',
    say('25 min', 'A plan you accepted makes the build fast and easy to review.', 'Three documents and a plan with a proof per step.', 'Plans without a proof command.', 'A neighbour can name what proves completion.', 'Assignment 4')),
  assignment(4, 4, 'Render the brief from sample data', 'A red render test, then the renderer. No API key, no model call.',
    ['test/render.test.ts was red first, then green.', 'npm run brief:sample writes out/latest.html.', 'You chose one style change and saw its test and diff.'],
    'No model call and no credentials. Untrusted text is escaped.',
    SOLO_PROMPTS[4],
    'Change one house-style rule I choose. Add a failing test first, then make it pass. Regenerate out/latest.html and show the diff. Stop so I can inspect the page and save a 1440×900 screenshot.',
    say('35 min', 'The first visible result of the day.', 'out/latest.html in the browser.', 'A model call in the sample path. The sample route must work offline.', 'out/latest.html opens and npm test passes.', 'Lunch')),
  byTitle('Lunch'),
  byTitle('Restart and settle'),
  {
    title: 'Tools: how an AI agent sees',
    kicker: 'Day 5 · TOOLS',
    subtitle: 'The AI only reads and writes text. Tools are its eyes. What is not on the menu, it cannot see.',
    type: 'context',
    sdlc: 'build',
    cards: [],
    keyPoints: ['The AI sees only through its tools.', 'Only eyes, no hands: tools only read.', 'Every look is written down in run.log.'],
    visual: {guardRail: {
      plainChain: true,
      railCols: 3,
      chainTitle: 'Bree’s four tools: the four looks from slide 3',
      chain: [['🦊', 'Merge requests', 'gitlab'], ['🎫', 'Tickets', 'jira'], ['📄', 'Changed pages', 'confluence'], ['📅', 'Your calendar', 'outlook']],
      railsTitle: 'Three things must be true',
      rails: [
        {icon: '👀', title: '1 · It has the eyes it needs', whoLabel: 'Bree', who: 'today you build one tool. The others follow the same pattern', stop: 'Without the calendar, she cannot put the standup first.', where: 'src/sources.ts'},
        {icon: '✋', title: '2 · Only eyes, no hands', whoLabel: 'Bree', who: 'no shell, no write tools', stop: 'She cannot close a ticket or send a mail. That stays with you.', where: 'src/agent.ts'},
        {icon: '📜', title: '3 · Every look is written down', whoLabel: 'Bree', who: 'run.log: each line on the page traces back to one look', stop: 'So you can check where a line comes from.', where: 'run.log'}
      ],
      foot: 'No credentials today? Then the live check is OPEN, not failed. The sample route keeps working.'
    }},
    notes: say('4 min', 'Explain tools before the participants build one.', 'Four tools, three rules.', 'Write or shell tools. Eyes only.', 'Participants can say why tools only read.', 'Assignment 5')
  },
  assignment(5, 5, 'Give the agent one read-only tool', 'The agent reads one source. It cannot write or run a shell.',
    ['src/agent.ts and src/sources.ts with one read-only tool.', 'Tests prove the wiring and the missing-source case without a network.', 'npm run brief:sample still works without a model call.'],
    'No shell or write tools for the brief agent. Never print tokens.',
    SOLO_PROMPTS[5],
    'Test one missing-source case I choose. Show the diff and observed test output. With configured credentials, run the brief and trace each factual claim to run.log. Without credentials, run the sample and mark the live check OPEN. Never print tokens. Stop for my inspection.',
    say('40 min', 'An agent is only as safe as its tools.', 'Green tests for the tool and the missing source.', 'Participants who add write or shell tools.', 'npm test, npm run typecheck and npm run brief:sample are green.', 'Assignment 6')),
  assignment(6, 6, 'Record the evidence', 'Real commands, real exit codes, a reviewer who reruns one.',
    ['docs/evidence.md has each command, its exit code and one output line.', 'Your screenshot is linked under docs/evidence/.', 'Unrun checks are OPEN.'],
    'Do not change the code to hide a failure.',
    SOLO_PROMPTS[6],
    'Check the evidence against the extra case I choose. Show missing proof as OPEN. Stop while my reviewer reruns one command and compares the output. Record their actual name and result only afterward.',
    say('25 min', 'A claim without evidence is a hypothesis.', 'docs/evidence.md with exit codes.', 'Evidence written from memory instead of from a run.', 'A neighbour reran one command and got the same result.', 'Assignment 7')),
  assignment(7, 7, 'Decide the gate and prepare the PR', 'You decide PASS. Claude Code proposes FAIL and OPEN.',
    ['docs/gate.md links the evidence and marks each check PASS, FAIL or OPEN.', 'The PR is open after your approval.', 'The schedule stays inactive. Nothing is merged or deployed.'],
    'You make every PASS decision. Open the PR only after the human review.',
    SOLO_PROMPTS[7],
    'Use the OPEN item I choose to propose one new acceptance check. Show the gate diff and PR preview. After I decide the gate and approve publication, open the PR. Stop before merge or deployment.',
    say('25 min', 'The gate is where a human decides, with the evidence in front of them.', 'docs/gate.md with a quoted line per check.', 'An agent that writes PASS. The human decides PASS.', 'Each participant has a gate decision and opens the PR only after approval.', 'Maintain: close the loop')),
  {
    title: 'Maintain: close the loop',
    kicker: 'Day 5 · MAINTAIN',
    subtitle: 'The brief runs every morning. What goes wrong becomes a new intent.md.',
    type: 'concept',
    sdlc: 'maintain',
    source: PLAYBOOK,
    cards: [
      {title: 'It runs', body: 'Every weekday morning, once you switch the schedule on.'},
      {title: 'You notice', body: 'A wrong line, a missing source, an OPEN that stays open.'},
      {title: 'Back to Plan', body: 'You write it down as a new intent.md. The loop starts again.'}
    ],
    keyPoints: ['Maintain is not a new assignment today.', 'Your OPEN items in gate.md are the first input.', 'The loop keeps running. Your judgement stays above it.'],
    notes: say('3 min', 'Show the sixth stage, so the line becomes a loop.', 'Runs, notice, back to Plan.', 'Participants who switch the schedule on today. It stays inactive.', 'Participants can name one OPEN item that would start a new intent.', 'Recap')
  },
  {
    title: 'Recap: seven steps, one brief',
    kicker: 'Day 5 · Recap',
    subtitle: 'Plan, Design, Build, Test, Deploy, Maintain. Every stage left a file and a proof.',
    keyPoints: ['One file per stage: intent, spec, plan, evidence, gate.', 'Tests failed first, then passed.', 'A person made every decision.'],
    notes: say('5 min', 'Close the main route before the bonus.', 'The seven steps and their proofs.', 'Groups that did not reach A7. They finish it with SOLO.md.', 'Participants can name the proof of each step.', 'The Claude Code skills pack')
  },
  {
    title: 'Bonus: Sonny, the on-call SRE agent',
    kicker: 'Day 5 · Bonus',
    subtitle: 'Done early? Use the same SDLC loop on a second agent: Sonny diagnoses a broken shop at 03:45.',
    keyPoints: ['Same loop, new domain: intent, contract, guardrails, tool, live run.', 'Repo: sre-oncall-agent, branch workshop/start.', 'Do the assignments in order. Stop where the day ends.'],
    notes: say('2 min', 'Give fast participants a real second challenge.', 'The Sonny assignments that follow.', 'Participants who start the bonus before they finish A4.', 'Fast participants open the Sonny project.', 'A global shop, and you are on call')
  }
];

const close = {
  title: 'Close: what you learned on Day 5',
  kicker: 'Day 5 · Close',
  subtitle: 'You built an agent through the SDLC, and a human decided at every gate.',
  keyPoints: ['Plan before you build.', 'Red before green.', 'Evidence before PASS.'],
  notes: say('5 min', 'End the day on the loop, not on the tools.', 'Three lessons.', 'Groups that are not done. They finish with SOLO.md.', 'Everyone can name the next step for their own brief.', 'Day 6')
};

const withTeach = s => s.teach ? s : info(s, {
  time: s.notes.match(/^Time: ([^.]+)\./)?.[1] ?? '',
  gist: s.subtitle,
  script: [{do: 'Slide appears. Read the title and the subtitle.', say: s.keyPoints}],
  learn: s.keyPoints,
  watch: [s.notes.match(/Watch for: ([^\n]+)/)?.[1]].filter(Boolean)
});
const pack = [
  {
    title: 'The Claude Code skills pack',
    kicker: 'Day 5 · SKILLS PACK',
    subtitle: 'A public set of skills for everyday shipping. You pick one for the hackathon.',
    type: 'concept',
    source: PACK,
    cards: [
      {title: 'Understand', body: '/eli5, /show-me, /diagram, /archify'},
      {title: 'Plan', body: '/grilling, /rpi, /visual-plan'},
      {title: 'Prove', body: '/verify-this, /fix-ci'},
      {title: 'Ship', body: '/review-and-ship, /make-pr-easy-to-review, /handoff'}
    ],
    keyPoints: ['The seven assignments use the exact prompts from SOLO.md.', 'Pick one skill for your hackathon problem.', 'Install one skill, in your project only.'],
    notes: say('3 min', 'Connect today to the hackathon.', 'Four groups of skills.', 'Bulk installs. One skill, one project.', 'Participants name one skill they want.', 'Choose one skill for the hackathon')
  },
  (() => { const s = fromWorkshop5('Appendix · Choose one skill for the hackathon'); s.title = 'Choose one skill for the hackathon'; s.kicker = 'Day 5 · SKILLS PACK'; s.cards[1].body = 'Project and user settings, no connectors, no Chrome integration.'; s.notes = 'Time: 3 min.\n\nThe full pack is hackathon support, not lesson setup.'; s.teach.time = '3 min'; return s; })()
];
// Pause slides come from Jessy's deck with her stage dot. In this deck they sit between other stages.
for (const b of brief) if (['Break', 'Lunch', 'Restart and settle'].includes(b.title)) delete b.sdlc;

const divider = brief.at(-1);
divider.title = 'Optional bonus: open the Sonny lesson';
divider.subtitle = 'Continue in the separate Sonny deck when the seven Daily Brief assignments are complete.';
divider.source = {url: 'workshop5.html', label: 'Open the optional Sonny lesson'};
divider.keyPoints = ['Finish the Daily Brief route first.', 'Open workshop5.html for the full Sonny slides and presenter notes.', 'Use the sre-oncall-agent workshop/start branch.'];
divider.notes = 'Time: 2 min.\n\nThis link keeps the complete verified Sonny assignment route available without mixing its catch-up commands into the Daily Brief lesson. Open workshop5.html only for optional self-study.\n\nNext: Day 6';

const briefMain = brief.slice(0, -1).filter(s => s.title !== 'What is a skill?');
const ordered = [...briefMain, ...pack, close, divider];
// Next pointers and clocks are derived, so a reorder cannot leave a stale one behind.
const main = ordered.length - 1;
ordered.forEach((o, i) => {
  o.notes = o.notes.replace(/Time: \d\d:\d\d · /, 'Time: ');
  if (i >= main) return;
  const next = i === main - 1 ? 'Day 6' : ordered[i + 1].title;
  o.notes = /Next: /.test(o.notes) ? o.notes.replace(/Next: [^\n]*$/, 'Next: ' + next) : o.notes + '\n\nNext: ' + next;
  if (o.teach) o.teach.next = next;
  if (o.cards?.length === 1 && o.cards[0].title === 'Next') o.cards[0].body = next;
});
const slides = addDay5LessonMedia(ordered.map(withTeach));
const out = `'use strict';\n// Generated by tools/build-day5-daily-brief.mjs. Edit the generator, not this file.\nwindow.SLIDES = ${JSON.stringify(slides, null, 1)};\n`;
writeFileSync(new URL('day5-daily-brief-slides.js', root), out);
console.log(`day5-daily-brief-slides.js: ${slides.length} slides (${briefMain.length} brief, 1 close)`);
