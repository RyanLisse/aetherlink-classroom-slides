// Builds day4-final-slides.js: the one Day 4 deck.
// Route, commands and copy prompts come from the participant package on main (through
// tools/day4-participant-contract.json). Reused slides come from workshop4-slides.js and
// day4-jessy-slides.js by title, so a fix there reaches this deck.
// Rerun after a change to either deck or to the contract: node tools/build-day4-final.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = file => readFileSync(new URL(file, root), 'utf8');
const load = file => { const ctx = {window: {}}; vm.runInNewContext(read(file), ctx); return ctx.window.SLIDES; };
const pick = (file, slides = load(file)) => (title, kicker) => {
  const hits = slides.filter(s => s.title === title && (!kicker || s.kicker === kicker));
  if (hits.length !== 1) throw new Error(`${file} has ${hits.length} slides titled "${title}"${kicker ? ` with kicker "${kicker}"` : ''}`);
  const {stateId, ...slide} = structuredClone(hits[0]);   // state IDs carry the slide number of the source deck
  return slide;
};
const ryan = pick('workshop4-slides.js');
const jessy = pick('day4-jessy-slides.js');

// Copy prompts are looked up in the pinned package text, so they cannot drift from SOLO.md and README.md.
const contract = JSON.parse(read('tools/day4-participant-contract.json'));
const block = start => {
  const hits = contract.prompts.blocks.filter(b => b.startsWith(start));
  if (hits.length !== 1) throw new Error(`the package has ${hits.length} copy blocks that start with "${start}"`);
  return hits[0];
};
const P = {
  start: block('git clone'), trainer: block('git fetch origin trainer/solution'),
  solo0: block('Read n8n/support-triage.json'), test0: block('npm run doctor'),
  solo1: block('Run npm run check:1'), test1: block('npm run check:1\n'),
  solo1b: block('Run the documented SOLO 1 dry run'), solo1c: block('Read my SOLO 1 diff'),
  memory1: block('Use Claude Code itself'), memory2: block('This is a fresh'), memory3: block('This is another fresh'),
  solo2: block('Run npm run check:2'), test2: block('npm run check:2\n'),
  solo3: block('Run npm run check:3'), test3: block('npm run smoke:mcp'),
  solo4: block('Run npm run lesson3')
};
const REPO = {url: 'https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent', label: 'AetherLink-bv/aetherlink-day4-n8n-to-agent · branch main'};

// Walk every string of a slide. Terminal output (key "o") is quoted from the package and stays as it is.
const mapStrings = (value, fn, key) =>
  typeof value === 'string' ? (key === 'o' ? value : fn(value))
    : Array.isArray(value) ? value.map(item => mapStrings(item, fn, key))
      : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapStrings(v, fn, k)]))
        : value;
// Replace text in a reused slide. Every pair must hit, so a change in the source deck cannot pass unseen.
const patch = (slide, ...pairs) => pairs.reduce((s, [from, to]) => {
  let hits = 0;
  const out = mapStrings(s, text => { if (text.includes(from)) hits++; return text.split(from).join(to); });
  if (!hits) throw new Error(`"${s.title}" no longer contains "${from}"`);
  return out;
}, slide);
const reuse = (min, slide, extra = {}) => {
  const {teach: teachExtra, ...rest} = extra;
  return {...slide, ...rest, min, teach: {...slide.teach, ...teachExtra}};
};

// One exercise slide: numbered steps with Copy prompts, a checkpoint, a human boundary and a full teach block.
const assignment = ({id, title, subtitle, min, steps, checkpoint, boundary, gist, learn, watch, terms}) => ({
  lessonId: 'workshop-4',
  title: `Assignment ${id}: ${title}`,
  kicker: `Day 4 · SOLO ${id}`,
  type: 'practice',
  layout: 'exercise',
  calm: true,
  timer: min,
  min,
  repo: REPO,
  subtitle,
  cards: [{title: 'Checkpoint', body: checkpoint.join('\n')}, {title: 'Human boundary', body: boundary}],
  keyPoints: checkpoint,
  steps: steps.map(({say, ...step}) => step),
  expected: checkpoint.at(-1),
  notes: `${gist}\n\nWatch for: ${watch[0]}\n\nIf stuck: give Claude Code the failed line and ask for the smallest fix.\n\nStop: ${boundary}`,
  teach: {
    gist,
    do: ['Walk the room. Use the Copy buttons. Check the checkpoint on two laptops.'],
    done: checkpoint,
    copy: steps.filter(s => s.prompt).map(s => [`Step ${steps.indexOf(s) + 1} · ${s.where}`, s.prompt]),
    script: [
      {do: 'Slide appears. Read the goal and the checkpoint out loud.', say: [subtitle, `You are done when: ${checkpoint.join(' ')}`]},
      ...steps.map((s, i) => ({do: `Step ${i + 1}${s.where ? ` · ${s.where}` : ''}. ${s.text}.`, say: [s.say]})),
      {do: 'Ask two people to show their result.', say: ['Who wants to show the checkpoint on their screen?', `And the boundary for this step: ${boundary}`]}
    ],
    learn,
    watch,
    terms
  }
});

const A0 = assignment({
  id: '0', min: 15, title: 'Read the n8n flow',
  subtitle: 'Claude Code reads the n8n export. You get one table: each node, and the file that replaces it.',
  steps: [
    {where: 'Terminal', text: 'Get the starter and start Claude Code', prompt: P.start, after: 'The last line starts Claude Code with the project settings and your own user settings. MCP servers and connectors stay off.', say: 'Four lines: clone, go into the folder, install, start Claude Code. Use Copy.'},
    {where: 'Claude Code', text: 'Paste the SOLO 0 prompt', prompt: P.solo0, after: 'You get one table. Each file is marked built or TODO.', say: 'Paste the prompt. Claude Code only reads. It changes no file.'},
    {where: 'Terminal 2', text: 'Test it yourself', prompt: P.test0, after: 'doctor checks your laptop and your login. verify runs the 21 starter tests and the dry runs. It calls no model.', say: 'Open a second terminal. Type the same two commands yourself.'},
    {where: 'You', text: 'Point to the three specialists in the n8n JSON', after: 'A file marked TODO is yours to build today.', say: 'Find the three specialists in the table. They become three files today.'}
  ],
  checkpoint: ['npm run doctor and npm run verify exit 0.', 'You can point to the three specialists in the n8n JSON.'],
  boundary: 'Claude Code changes no file. Do not import or activate the n8n export. Stop after you have read the table.',
  gist: 'Everyone gets the starter, starts Claude Code and reads the n8n flow as one table. Done when doctor and verify exit 0.',
  learn: ['The n8n export is the source. It stays as it is.', 'The plumbing is built. The Agent SDK parts say TODO.', 'Every assignment is the same loop: paste the prompt, the check goes green, one real run, read why.'],
  watch: ['“npm” or “git” not found: Node.js or Git is missing. See docs/SETUP.md.', 'The run says backend sdk: an API key is set on that laptop. Add --backend claude-code.', 'verify must show pass 21 and fail 0. A version number can differ.', 'A clone from an earlier class: make a fresh clone.'],
  terms: [['npm ci', 'installs the parts the starter needs'], ['npm run doctor', 'checks Node.js, Claude Code and your login'], ['npm run verify', 'runs the starter tests and the dry runs, with no model call'], ['Dry run', 'shows what would be sent, and stops before the model']]
});

const A1 = assignment({
  id: '1', min: 25, title: 'One agent that fills in the form',
  subtitle: 'Claude Code fills in three files. The check tells you when the step is right.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 1 prompt', prompt: P.solo1, after: 'First the check is red. That is correct. Then Claude Code fills in options.mjs, priority-schema.mjs and CLAUDE.md.', say: 'Paste the prompt. Watch the check go from red to green.'},
    {where: 'Terminal 2', text: 'Test it yourself', prompt: P.test1, after: 'check:1 compares your three files with the reference. It calls no model. lesson1 sends one ticket to the model.', say: 'Now the same check and the same run in your second terminal.'},
    {where: 'You', text: 'Read the table: each option, its n8n setting, and what goes wrong without it', after: 'Stop after you have read the table.', say: 'Read one row out loud to your neighbour.'}
  ],
  checkpoint: ['npm run check:1 passes.', 'The real run prints a priority, a reason and the Switch route.'],
  boundary: 'Claude Code changes three files and no other. The agent has no tools. You read the table before you continue.',
  gist: 'Claude Code fills in the Step 1 files from the n8n node. Done when check:1 passes and one real run shows a priority, a reason and the route.',
  learn: ['settingSources loads the instructions.', 'tools: [] removes every tool. maxTurns limits the loop.', 'outputFormat forces the form. A test can check each setting.'],
  watch: ['A check that stays red: paste the failed line into Claude Code and ask for the smallest fix.', 'A real run takes up to a minute. The words of the reason differ on every laptop.', 'MSG-06 is loud. The policy says medium: something is wrong, but the customer can still work.', 'Claude Code that changes other files: say stop, only the three files.'],
  terms: [['npm run check:1', 'compares your Step 1 files with the reference, with no model call'], ['npm run lesson1 -- MSG-06', 'sends ticket MSG-06 to the model once'], ['options.mjs', 'the settings of the agent, like the panel of the n8n node'], ['outputFormat', 'the setting that forces the answer into the form']]
});

const A1b = assignment({
  id: '1b', min: 15, title: 'Inspect the form and the memory',
  subtitle: 'Claude Code shows the real output. You keep setup evidence and model evidence apart.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 1b prompt', prompt: P.solo1b, after: 'A dry run shows the settings. It is not a model result. The chat runs are model results.', say: 'Paste the prompt. Claude Code runs a dry run first, then the chat with two tickets.'},
    {where: 'You', text: 'Find the form and the route in the output', after: 'The model returns a label. lib/switch.mjs picks the route. That is plain code.', say: 'Point to the form. Then point to the route. Who made each one?'},
    {where: 'You', text: 'Check the memory', after: 'The same conversation recalls its marker. A new conversation for another ticket does not.', say: 'Did the second ticket know the marker of the first? It must not.'}
  ],
  checkpoint: ['The same conversation recalls its marker.', 'A fresh conversation for another ticket does not get that marker.', 'You can say which output is setup evidence and which came from a model.'],
  boundary: 'Claude Code changes nothing. You decide which output counts as evidence.',
  gist: 'Participants look inside: the form, the fixed route, and the chat memory with two tickets. Done when they can say which output is setup evidence and which came from a model.',
  learn: ['A dry run is setup evidence. Only a real run is model evidence.', 'The model gives the label. Code picks the route.', 'One conversation, one ticket. A new conversation starts empty.'],
  watch: ['Dry-run output called “the answer of the AI”. No model was called.', 'No model run possible: use docs/sample-trace.md and call it sample evidence.', 'A marker with real personal data. Use a harmless word.'],
  terms: [['npm run chat', 'a chat with the agent that remembers this conversation'], ['--dry-run', 'print the settings and stop before the model'], ['Marker', 'a harmless word you give the chat, to test what it remembers'], ['Sample evidence', 'output from docs/sample-trace.md, not from your own run']]
});

const A1c = assignment({
  id: '1c', min: 20, title: 'Challenge the policy',
  subtitle: 'Claude Code proposes one temporary change. You approve it, compare, and check that the policy is back.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 1c prompt', prompt: P.solo1c, after: 'Claude Code proposes one temporary policy change and waits.', say: 'Paste the prompt. Claude Code proposes. It does not start yet.'},
    {where: 'You', text: 'Approve one temporary change', after: 'Claude Code runs MSG-01 and MSG-06 before and after, and records the labels.', say: 'Read the proposal. Say yes only when you understand what changes.'},
    {where: 'You', text: 'Inspect the restored policy', after: 'The diff is clean and npm run verify passes.', say: 'Check that the policy is back. The diff must be clean.'}
  ],
  checkpoint: ['The before and after evidence uses the same messages.', 'The accepted policy is restored and npm run verify passes.'],
  boundary: 'Claude Code waits for your approval before the temporary change. You inspect the restored diff.',
  gist: 'One experiment on the policy: does a loud message get another label when the policy changes? Done when the policy is restored and verify is green.',
  learn: ['The policy text decides the label. Change the text and the label can change.', 'The label can also stay the same. The policy is still what you rely on.', 'After an experiment, the diff must be clean.'],
  watch: ['A temporary change that stays in the file. Check the diff before you continue.', 'Claude Code that changes lib/switch.mjs. The fixed route stays as it is.', 'Participants who expect one fixed outcome. Labels can differ between runs.'],
  terms: [['Policy', 'the Priority definitions in CLAUDE.md'], ['Tone bias', 'a loud message gets another label than its content deserves'], ['Diff', 'the exact changes in your files']]
});

const A1M = assignment({
  id: '1M', min: 25, title: 'Memory per ticket',
  subtitle: 'Three Claude Code sessions. One reviewed memory file per ticket. No file is written before you approve.',
  steps: [
    {where: 'Claude Code', text: 'Session 1: build the T-001 memory', prompt: P.memory1, after: 'Read the proposal and approve it. Then Claude Code writes tickets/T-001/memory.md and stops.', say: 'Claude Code itself is the chat. Paste, read the proposal, approve.'},
    {where: 'Claude Code', text: 'Session 2, a fresh one: resume T-001 from the file', prompt: P.memory2, after: 'The summary comes only from the file. Claude Code says that it read the file because you asked.', say: 'Open a new Claude Code session. It knows nothing. Now it reads the file.'},
    {where: 'Claude Code', text: 'Session 3, another fresh one: build the T-002 memory', prompt: P.memory3, after: 'Every item maps to a T-002 label.', say: 'One more new session, for the second ticket.'},
    {where: 'You', text: 'Compare the two files yourself', after: 'T-002 contains no T-001 label and no T-001 fact.', say: 'Open both files next to each other. Is anything of T-001 in T-002?'}
  ],
  checkpoint: ['Two small reviewed memory files exist.', 'A fresh session resumes T-001 only after it reads the file.', 'T-002 contains no T-001 fact.'],
  boundary: 'You approve each memory file before it is written. You compare the two files yourself. No UI and no model call are added.',
  gist: 'Claude Code itself is the chat. Participants build a small reviewed memory file for T-001, resume from it in a fresh session, and prove that T-002 stays separate.',
  learn: ['A memory file is short, sourced and reviewed by a person.', 'A fresh session knows nothing until it reads the file.', 'One ticket, one file. Nothing leaks to another ticket.'],
  watch: ['A continued session is not a fresh session. Start a new one.', 'Credentials, tokens or personal data in a memory file. Reject the proposal.', 'Claude Code asked to compare T-001 and T-002. The person compares, after Claude Code stops.', 'A participant who builds a UI or adds a model call. This is a file exercise.'],
  terms: [['Fresh session', 'a new Claude Code session that has seen nothing of the earlier one'], ['memory.md', 'a short reviewed file with facts, decisions, open questions and a next step'], ['Source label', 'a stable name for where a fact comes from, such as T-001/F1'], ['OPEN', 'a claim that is not confirmed yet']]
});

const A2 = assignment({
  id: '2', min: 25, title: 'A team lead and two specialists',
  subtitle: 'Claude Code fills in two specialist files and the team-lead options. You read the trace and the draft.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 2 prompt', prompt: P.solo2, after: 'The check goes from red to green. Then one real run with MSG-05.', say: 'Paste the prompt. Two files and the team-lead options.'},
    {where: 'Terminal 2', text: 'Test it yourself', prompt: P.test2, after: 'check:2 compares your two specialist files and the team-lead options with the reference. lesson2 runs the team on one ticket.', say: 'Same check, same run, in your second terminal.'},
    {where: 'You', text: 'Find risk-agent before customer-reply-agent in the trace', after: 'The writer needs the risk note first.', say: 'Which specialist ran first? Why that order?'},
    {where: 'You', text: 'Read the draft in message', after: 'It is a draft. Nothing is sent.', say: 'Read the draft. Is there a fact in it that the ticket did not give?'}
  ],
  checkpoint: ['npm run check:2 passes.', 'The trace shows risk-agent before customer-reply-agent.'],
  boundary: 'Neither specialist has a tool. The reply in message is a draft. Nothing is sent.',
  gist: 'The single agent becomes a team. Done when check:2 passes and the trace shows risk-agent before customer-reply-agent.',
  learn: ['The description of an agent file tells the team lead when to delegate.', 'Each specialist starts with an empty context and returns only its answer.', 'The team lead has one tool: Agent. It can delegate and do nothing else.'],
  watch: ['A draft with a fact that the ticket did not give. No specialist can look anything up yet.', 'The wrong order in the trace: read the description line of both files.', 'A personal style in the answers: your own user settings load too.'],
  terms: [['npm run check:2', 'compares your Step 2 files with the reference, with no model call'], ['npm run lesson2 -- MSG-05', 'runs the team on ticket MSG-05 once'], ['Trace', 'the order of specialists and tools in one real run'], ['Agent tool', 'the tool the team lead uses to hand a task to a specialist'], ['description', 'the line in an agent file that says when to use it']]
});

const A3 = assignment({
  id: '3', min: 25, title: 'Real facts from the lookup desk',
  subtitle: 'Claude Code adds the context specialist and connects the lookup desk. You match each fact to a tool result.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 3 prompt', prompt: P.solo3, after: 'The check goes from red to green. Then one real run with MSG-08.', say: 'Paste the prompt. One more specialist file, and the options that connect the desk.'},
    {where: 'Terminal 2', text: 'Test it yourself', prompt: P.test3, after: 'smoke:mcp starts the lookup desk and calls each tool once. check:3 compares your files with the reference. lesson3 runs the full team.', say: 'Three commands this time. The first one tests the desk without a model.'},
    {where: 'You', text: 'Find get_customer and get_transaction in the trace', after: 'get_customer looks up one customer. get_transaction looks up one payment. Both only read.', say: 'Find the two lookups. Which specialist made them?'},
    {where: 'You', text: 'Match each fact in the draft to a tool result', after: 'A fact without a tool result is a question for the room.', say: 'Take one fact from the draft. Where did it come from?'}
  ],
  checkpoint: ['npm run check:3 passes.', 'The trace shows Context, then Risk, then Reply, with two tool results.'],
  boundary: 'The lookup desk only reads. Only one specialist has its tools. You match each fact to a tool result.',
  gist: 'The team gets a third specialist and one lookup desk with two read-only tools. Done when check:3 passes and the trace shows Context, Risk, Reply with two tool results.',
  learn: ['An MCP server gives an agent tools from outside the SDK.', 'You name the server in mcpServers and give its tools to one specialist.', 'The other agents cannot look up or change data. They have no tool for it.'],
  watch: ['A change to 03-mcp/support-mcp/server.js. The desk is built and stays as it is.', 'A fact in the draft without a tool result. Ask where it comes from.', 'smoke:mcp also asks for a customer that does not exist. The tool says so. That is correct.', 'A green check proves the configuration. Only the real run proves the behavior.'],
  terms: [['MCP server', 'a small program that gives an agent tools. Here: the lookup desk, called support'], ['get_customer', 'looks up one customer in docs/customer_context.csv'], ['get_transaction', 'looks up one payment in docs/transactions.xlsx'], ['npm run smoke:mcp', 'starts the lookup desk and calls each tool once, with no model call'], ['npm run check:3', 'compares your Step 3 files with the reference']]
});

const A4 = assignment({
  id: '4', min: 18, title: 'Compare with n8n and collect proof',
  subtitle: 'Three real runs become one acceptance table. You make the review decision.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 4 prompt', prompt: P.solo4, after: 'Claude Code runs MSG-01, MSG-06 and MSG-09 and writes participant-output/acceptance-table.md.', say: 'Paste the prompt. Three real runs take a few minutes.'},
    {where: 'You', text: 'Read one row, from the message to the n8n node', after: 'A row without a real run says OPEN.', say: 'Read one row to your neighbour, from left to right.'},
    {where: 'You', text: 'Choose the difference you would improve first', after: 'Say which file you would change.', say: 'One difference with n8n. Which file would you change?'},
    {where: 'You', text: 'Record your own review decision', after: 'PASS, FAIL or OPEN. Claude Code does not approve its own work.', say: 'Write down your decision. You decide, not Claude Code.'}
  ],
  checkpoint: ['Every row points to a real run or says OPEN.', 'You named one difference with n8n and the file you would change.'],
  boundary: 'Claude Code changes no source file. You make the review decision. Nothing is sent or deployed.',
  gist: 'Proof, not opinion: three real runs, one table, one difference with n8n. Done when every row points to a real run or says OPEN.',
  learn: ['Proof is a real run, written down.', 'What you did not observe is OPEN.', 'A person makes the review decision.'],
  watch: ['Rows filled in from memory. Ask for the run.', 'A source file that changed. This assignment changes no source file.', 'The three runs take a few minutes. Ask the room to predict the priority of MSG-06.'],
  terms: [['Acceptance table', 'one row per message: what you saw, and which n8n node gave that behavior'], ['npm run lesson3', 'runs the full team on one ticket'], ['OPEN', 'behavior you did not observe in a real run']]
});

// Slides written for this deck, in Jessy's visual pattern.
const story = {
  lessonId: 'workshop-4',
  title: 'How the ticket desk should work',
  kicker: 'Day 4 · THE STORY',
  subtitle: 'It looks things up. It writes one draft. The form checks it. A person decides.',
  type: 'context',
  cards: [
    {title: 'It looks', body: 'At the customer and the payment. It only reads.'},
    {title: 'It writes one draft', body: 'A priority and a reply. Always the same form.'},
    {title: 'The form checks it', body: 'Plain code. No AI.'},
    {title: 'A person decides', body: 'The agent sends nothing.'}
  ],
  keyPoints: ['The same ticket desk as in n8n, now in code.', 'One draft, always in the same form.', 'A person reads every draft.'],
  visual: {agentJob: {
    botTag: 'TICKET DESK',
    looks: [['👤', 'the customer'], ['💳', 'the payment']],
    docName: 'example draft · MSG-08',
    doc: [['priority', 'high', 'the policy'], ['message', 'We are checking TX-1014 for you …', ['get_customer', 'get_transaction']]],
    check: {rules: ['priority is low, medium or high', 'message is the draft text', 'no other fields'], gate: 'only if the form is right'},
    wait: 'a draft, ready for a person',
    yes: 'Send it',
    no: 'Change it'
  }, reveal: 'click', covers: []},
  notes: 'Show the whole desk before the first assignment. Last session it was four n8n flows. Today it is one small app. The ticket is fictional. The agent looks, writes one draft in a fixed form, plain code checks the form, and a person decides. Nothing is sent by the agent.',
  teach: {
    gist: 'The whole ticket desk in one picture: it looks, it writes one draft, the form checks it, a person decides.',
    script: [
      {do: 'Slide appears. Click once for each block.', say: ['Last session you built this desk in n8n. Today it is the same desk, in code.', 'It looks things up. It writes one draft. Plain code checks the form. Then a person decides.']},
      {ask: 'Who sends the reply to the customer?', say: '(Answer: a person. The agent only writes a draft.)'}
    ],
    do: ['Click through the four blocks.', 'Ask who sends the reply.'],
    done: ['Everyone can name the four parts of the desk.'],
    learn: ['The agent only reads and drafts.', 'The form is checked by code, not by the AI.', 'A person decides about every draft.'],
    watch: ['Questions about real customers. Every ticket today is fictional.'],
    terms: [['Draft', 'a reply that a person still has to read and send'], ['Form', 'the fixed fields of the answer: priority and message']]
  }
};

const starter = {
  lessonId: 'workshop-4',
  title: 'The starter: what is built, and what you build',
  kicker: 'Day 4 · THE STARTER',
  subtitle: 'The plumbing is built. The Agent SDK parts say TODO. Those are yours.',
  type: 'concept',
  cards: [{title: 'The n8n flow', body: ''}, {title: 'The same desk in code', body: ''}, {title: 'The starter today', body: ''}, {title: 'The gap', body: ''}, {title: 'Six assignments', body: ''}],
  keyPoints: ['The runner, the lookup desk and the tests are built.', 'The files that say TODO are yours.', 'A red check at the start is correct.'],
  visual: {gapCompare: {
    icons: ['🧩', '🧭', '📁', '↔️', '📝'],
    focus: 3,
    reveal: [2, 2, 1],
    head: ['What the n8n flow has', 'What the starter has today'],
    rows: [
      ['AI Agent with a System Message', ['CLAUDE.md: TODO', 'options.mjs: TODO'], false],
      ['Structured Output Parser', ['priority-schema.mjs: TODO'], false],
      ['Risk Agent and Customer Reply Agent', ['two agent files: TODO'], false],
      ['Customer Context Agent and Get row(s)', ['one agent file: TODO', '03-mcp/options.mjs: TODO'], false],
      ['Switch, and the data to look up', ['lib/switch.mjs: built', 'the lookup desk: built'], true]
    ],
    note: 'The gap is six assignments. Each one starts with a red check. You paste one prompt, and the check goes green.'
  }},
  notes: 'Show what the starter already has before anyone opens it. The runner, the read-only lookup desk and the checks are built. The Agent SDK parts say TODO. On main the three specialist files exist, with only a name and TODO lines. Participants stay on main all day. They never copy files from another branch.',
  teach: {
    gist: 'The starter has the plumbing. The Agent SDK parts say TODO. Six assignments close the gap.',
    script: [
      {do: 'Slide appears. Click “The gap” to open the rows.', say: ['On the left: what your n8n flow has. On the right: what the starter has today.', 'Four rows say TODO. Those are yours. One row is built: the Switch and the lookup desk.']},
      {ask: 'Why is a red check at the start correct?', say: '(Answer: the files still say TODO. The check goes green when the step is right.)'}
    ],
    do: ['Open the rows one by one.', 'Name the loop: paste the prompt, the check goes green, one real run, read why.'],
    done: ['Everyone knows which files are theirs to build.'],
    learn: ['The plumbing is built. You build the Agent SDK parts.', 'A check tells you when a step is right.', 'You stay on main all day.'],
    watch: ['Participants who look for a finished branch. There is none for them. They paste the prompt of the current step again.'],
    terms: [['Starter', 'the project you clone: plumbing built, Agent SDK parts TODO'], ['TODO', 'a place in a file that you fill in today'], ['Check', 'a command that says if a step is right']]
  }
};

const memoryKinds = {
  lessonId: 'workshop-4',
  title: 'Three kinds of memory',
  kicker: 'Day 4 · MEMORY',
  subtitle: 'The chat remembers one conversation. A log records what happened. A memory file keeps what a person reviewed.',
  type: 'concept',
  visual: {stagger: 'pop', bot: 'think', place: 'beside'},
  cards: [
    {title: 'The conversation', body: 'The chat remembers this session. A new session starts empty.'},
    {title: 'The technical log', body: 'Every event, in order. Nothing is removed. Nobody chooses what matters.'},
    {title: 'The memory file', body: 'Short. Each line has a source. A person approved it.'}
  ],
  keyPoints: ['A new session does not remember.', 'A log is evidence, not memory.', 'A memory file is small, sourced and reviewed.'],
  notes: 'Three things that people call memory. The conversation is session memory: it ends with the session. A technical log is evidence: complete and never edited. A memory file is a short summary that a person reviewed. In the next assignment participants build one memory file per ticket. No conversation and no log exist for that exercise, so nobody invents one.',
  teach: {
    gist: 'Three kinds of memory: the conversation, the log, and a reviewed memory file. The next assignment builds the third.',
    script: [
      {do: 'Slide appears. Point at the cards, left to right.', say: ['The chat remembers one conversation. Close it, and it is gone.', 'A log keeps everything. Nobody chose what matters.', 'A memory file is short. A person read it and said yes.']},
      {ask: 'Which of the three would you give to a colleague who takes over a ticket?', say: '(Answer: the memory file. It is short, and a person checked it.)'}
    ],
    do: ['Name the three kinds.', 'Say which one the next assignment builds.'],
    done: ['Everyone can say the difference between a log and a memory file.'],
    learn: ['Session memory ends with the session.', 'A log is complete. A memory file is chosen.', 'A person reviews what goes into memory.'],
    watch: ['People who want to store the whole chat. A transcript is not a memory file.'],
    terms: [['Session', 'one conversation with Claude Code, from start to close'], ['Technical log', 'a complete record of events that nobody edits'], ['Memory file', 'a short reviewed summary for one ticket']]
  }
};

// The day: four blocks of work with three pauses between them. Durations only; the clock follows from START.
const START = '10:00';
const BLOCK_MINUTES = [60, 120, 90, 45];
const pause = (title, kicker, min, bot, behind) => ({pause: true, min, title, kicker, bot, behind});
const agenda = {agenda: true, min: 3};

const day = [
  reuse(3, ryan('Welcome to Day 4'), {teach: {
    copy: [['Trainer · before class, on your own clone', P.trainer]],
    watch: ['Did Day 3 not work for someone? Reassure them: the starter has everything, so nobody is behind.', 'For you: demo from the trainer/solution branch. Nothing must be built before class. Participants stay on main.']
  }}),
  reuse(6, ryan('Look back, look ahead: three questions')),
  reuse(2, patch(ryan('Last session · 1. The sorting machine'), ['Recap · n8n flow 1/4', 'Last session · the n8n flow'], ['Recap 1 of 4 (10:05). ', ''])),
  reuse(3, patch(ryan('Last session · 4. The team of specialists'), ['Recap · n8n flow 4/4', 'Last session · the n8n flow'])),
  reuse(4, story),
  reuse(2, patch(ryan("Today's goal"),
    ['When a person has to approve a change.', 'Where a person reviews before anything reaches a customer.'],
    ['A person says yes before a change', 'A person reviews every draft'],
    ['And you know when a person must say yes before anything changes.', 'And you know where a person reviews before anything reaches a customer.'])),
  agenda,
  reuse(4, ryan("The dictionary: last session's blocks, today's names")),
  reuse(5, ryan('How does an agent work?')),
  reuse(2, ryan('Which login do we use? And whose data?'), {teach: {watch: [
    "Does someone's run choose 'sdk' by itself? Then an API key is set on their laptop. Add --backend claude-code to the command.",
    'The lessons load project and user settings. A large personal setup can change the tone of the free-text answers, and each run costs more. MCP servers and connectors stay off.',
    'Company laptop on Vertex AI and a run says it is not logged in? Run npm run doctor. If the Login settings line says none, follow docs/SETUP.md, Company login.'
  ]}}),
  reuse(2, ryan('Words you need today')),
  reuse(5, starter),
  A0,
  reuse(4, patch(ryan('Check: does your screen look like this?', 'What you see · Step 0'), ['dry run — no model call', 'dry run, no model call'])),
  pause('Coffee break', 'Day 4 · Break', 15, 'coffee', 'Not at fail 0 yet? Stay for a moment and we fix it together.'),

  reuse(4, ryan("CLAUDE.md: the agent's work instructions")),
  reuse(4, ryan('The form, now in code')),
  A1,
  reuse(5, ryan('Check: does your screen look like this?', 'What you see · Step 1')),
  reuse(4, patch(ryan('Session memory: the chat remembers this conversation'), ["Just like the shop counter from this morning's recap: with the same customer, you remember; with a new customer, you start afresh.", 'Like a shop counter. With the same customer, you remember. With a new customer, you start afresh.'])),
  A1b,
  reuse(4, ryan('Quiz: message 6')),
  A1c,
  reuse(5, ryan('Discuss: who decides what?')),
  reuse(4, ryan('Context: what can the AI see at once?')),
  reuse(5, memoryKinds),
  A1M,
  pause('Lunch', 'Day 4 · Lunch', 45, 'sleepy', 'Fallen behind? Give Claude Code the failing check and ask for the smallest fix.'),

  reuse(5, ryan('Tools: what may each agent use?')),
  reuse(5, ryan('The team: a team lead and two specialists')),
  reuse(4, ryan('Each specialist is one file')),
  reuse(3, ryan('Put the file in the folder: Claude finds it')),
  A2,
  reuse(4, ryan('Check: does your screen look like this?', 'What you see · Step 2')),
  reuse(5, ryan('Discuss: who did what?')),
  reuse(5, ryan('MCP: the lookup desk')),
  A3,
  reuse(4, ryan('Check: does your screen look like this?', 'What you see · Step 3')),
  reuse(5, ryan('Discuss: where did the facts come from?')),
  pause('Coffee break', 'Day 4 · Break', 15, 'coffee', 'Fallen behind? Keep your work and fix the first failing check.'),

  reuse(4, ryan('Fixed rules or a thinking agent?')),
  A4,
  reuse(4, ryan('Check: does your evidence look like this?')),
  reuse(5, patch(jessy('Discuss: who is accountable?'),
    ['In the assignment every change gets one line in participant-output/audit.jsonl; in production you add the name of the reviewer.', 'Today your acceptance table is the record. In production you add the name of the reviewer.'],
    ["an audit log: what happened, when, and who approved it. Our assignment writes one line per change; in production you add the reviewer's name.", "a record of what happened, when, and who approved it. Today that is your acceptance table. In production you add the reviewer's name."],
    ['nine messages', 'ten messages'],
    ['it is exactly the point of the barrier.', 'it is exactly why a person reviews every draft.'])),
  reuse(4, ryan('On Monday: take this to your squad')),
  reuse(10, patch(ryan('Close: a person stays in charge'), ['Next: Day 5', 'Day 5'])),
  // After the day. It is not part of a block.
  reuse(0, ryan('Bonus · finished early?'))
];

// The clock: blocks and pauses in order.
const clock = minutes => { const [h, m] = START.split(':').map(Number); const t = h * 60 + m + minutes; return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`; };
const blocks = [[]];
for (const s of day) { if (s.pause) blocks.push([]); else if (s.min) blocks.at(-1).push(s); }
const sums = blocks.map(b => b.reduce((n, s) => n + s.min, 0));
if (sums.join() !== BLOCK_MINUTES.join()) throw new Error(`the blocks take ${sums.join(', ')} minutes, expected ${BLOCK_MINUTES.join(', ')}`);
let elapsed = 0;
const pauses = day.filter(s => s.pause).map((p, i) => { elapsed += sums[i]; const from = clock(elapsed); elapsed += p.min; return {from, back: clock(elapsed)}; });
const end = clock(elapsed + sums.at(-1));
// The fixed points of the day, given by the organisers: lunch 13:15 to 14:00, the afternoon break at 15:30.
if (pauses[1].from !== '13:15' || pauses[1].back !== '14:00' || pauses[2].from !== '15:30') throw new Error(`lunch ${pauses[1].from} to ${pauses[1].back}, afternoon break ${pauses[2].from}`);

const BLOCK_NAMES = [
  ['Read the flow', 'The story so far.\nThe starter.\nAssignment 0.'],
  ['One agent', 'Assignments 1, 1b and 1c.\nThen memory per ticket: 1M.'],
  ['The team', 'Assignment 2: two specialists.\nAssignment 3: the lookup desk.'],
  ['Proof', 'Assignment 4: compare with n8n.\nA person decides.']
];
const agendaSlide = min => ({
  lessonId: 'workshop-4',
  title: 'Today · agenda',
  kicker: `Day 4 · ${START} to ${end}`,
  type: 'context',
  subtitle: 'Claude Code builds. You choose, read the diff and decide when to continue.',
  cards: BLOCK_NAMES.map(([name, body], i) => ({title: `${sums[i]} min · ${name}`, body})),
  keyPoints: [`Break: ${day.filter(s => s.pause)[0].min} min at ${pauses[0].from}.`, `Lunch: ${pauses[1].from} to ${pauses[1].back}.`, `Break at ${pauses[2].from}. We end at ${end}.`],
  notes: `Four blocks of ${sums.join(', ')} minutes. The morning break is at ${pauses[0].from}, lunch runs from ${pauses[1].from} to ${pauses[1].back}, and the afternoon break is at ${pauses[2].from}. The day ends at ${end}. Participants stay on main. The workshop repository is ${REPO.url}.`,
  min,
  teach: {
    gist: 'Four blocks, three pauses. Claude Code builds, the participant decides.',
    script: [{do: 'Point to the four blocks and name the pauses.', say: [`The morning break is at ${pauses[0].from}. Lunch runs from ${pauses[1].from} to ${pauses[1].back}. The afternoon break is at ${pauses[2].from}. We end at ${end}.`, 'Every assignment is the same loop: paste the prompt, the check goes green, one real run, read why.']}],
    do: ['Point to the four blocks.', 'Name the pauses.'],
    done: ['Everyone knows when the pauses are.'],
    learn: ['Four blocks, one loop.', 'You decide when to continue.'],
    watch: []
  }
});
const pauseSlide = ({title, kicker, min, bot, behind}, {back}) => ({
  lessonId: 'workshop-4',
  title, kicker,
  type: 'pause',
  visual: {countdown: min, bot, place: 'beside'},
  subtitle: `Back at ${back}. ${behind}`,
  cards: [{title: `Back at ${back}`, body: ''}],
  keyPoints: [`Say the return time: ${back}.`, 'Press ▶ Start on the timer.', behind],
  notes: `Say the return time out loud: ${back}. ${behind}`,
  min,
  teach: {
    gist: `${title}. Be back at ${back}.`,
    script: [{do: 'Start the countdown.', say: [`${title}. Be back at ${back}.`]}],
    do: ['Start the countdown.', 'Help the people who are behind.'],
    done: [`Everyone is back at ${back}.`],
    learn: [],
    watch: []
  }
});
let pauseIndex = 0;
const ordered = day.map(s => s.pause ? pauseSlide(s, pauses[pauseIndex++]) : s.agenda ? agendaSlide(s.min) : s);

// Finish every slide: duration, the pointer to the next slide, and a complete teach block.
const slides = ordered.map(({min, ...s}, i) => {
  const next = ordered[i + 1]?.title ?? 'End of Day 4';
  const time = min ? `${min} min` : 'after the day';
  const teach = {...s.teach, time, learn: s.teach.learn ?? s.keyPoints ?? [], terms: s.teach.terms ?? [], next};
  const slide = {...s, notes: `Time: ${time}.\n\n${s.notes}\n\nNext: ${next}`, teach};
  if (slide.type === 'pause') slide.cards = [{title: slide.cards[0].title, body: `Next: ${next}`}];
  // The recap layout joins label and caption with an em dash. One label per item keeps the slide free of it.
  if (slide.items) slide.items = slide.items.map(({label, caption}) => ({label: caption ? `${label}: ${caption}` : label}));
  return slide;
});

// Guards. This deck teaches the prompt-first route on main. These words belong to the earlier step-branch route.
const STALE = /step-[1-5]\b|origin\/step|git stash|Build [1-4]\b|npm run check(?![:\w])|check:assignment|hook:demo|transaction-mcp|list_transactions|lookup desks|two servers|six labels|three more labels|settingSources: \['project'\]|\['user', ?'project'\]|pass 9\b|pass 22\b|day5-n8n|RyanLisse|barrier|audit\.jsonl|tone trap|not tone|slides? \d+|yesterday/i;
slides.forEach((s, i) => {
  const where = `slide ${i + 1} "${s.title}"`;
  mapStrings(s, text => {
    const stale = text.match(STALE);
    if (stale) throw new Error(`${where} says "${stale[0]}": ${text.slice(0, 120)}`);
    if (text.includes('—')) throw new Error(`${where} has an em dash: ${text.slice(0, 120)}`);
    return text;
  });
  for (const h of s.visual?.highlight ?? []) if (h.in === 'subtitle' && !s.subtitle.includes(h.text)) throw new Error(`${where} highlights "${h.text}", which is not in its subtitle`);
  if (s.title !== 'Today · agenda' && s.type !== 'pause' && /\b\d{1,2}:\d{2}\b/.test(JSON.stringify({...s, kicker: ''}))) throw new Error(`${where} names a clock time`);
});

const out = `'use strict';\n// Generated by tools/build-day4-final.mjs. Edit the generator, not this file.\nwindow.SLIDES = ${JSON.stringify(slides, null, 1)};\n`;
if (process.argv.includes('--check')) {
  if (read('day4-final-slides.js') !== out) { console.error('day4-final-slides.js is out of date. Run: node tools/build-day4-final.mjs'); process.exit(1); }
} else {
  writeFileSync(new URL('day4-final-slides.js', root), out);
  console.log(`${slides.length} slides. Blocks: ${sums.map((n, i) => `${BLOCK_NAMES[i][0]} ${n} min`).join(', ')}. Pauses: ${pauses.map(p => `${p.from} to ${p.back}`).join(', ')}. End ${end}.`);
}
