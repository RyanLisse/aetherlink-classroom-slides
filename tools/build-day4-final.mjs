// Builds day4-final-slides.js: the one Day 4 deck.
// Route, commands and copy prompts come from the participant package on main (through
// tools/day4-participant-contract.json). Reused slides come from workshop4-slides.js and
// day4-jessy-slides.js by title, so a fix there reaches this deck.
// Rerun after a change to either deck or to the contract: node tools/build-day4-final.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import vm from 'node:vm';
import {addDay4LessonMedia} from './day4-lesson-media.mjs';

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
const lessonPrompts = JSON.parse(read('tools/day4-lesson-prompts.json'));
const block = start => {
  const hits = contract.prompts.blocks.filter(b => b.startsWith(start));
  if (hits.length !== 1) throw new Error(`the package has ${hits.length} copy blocks that start with "${start}"`);
  return hits[0];
};
const P = {
  start: block('git clone'), trainer: lessonPrompts.trainerStart,
  test0: block('npm run doctor'),
  solo1: block('Run npm run check:1 and show'), test1: block('npm run check:1\n'),
  solo1b: block('Run the documented SOLO 1 dry run'), solo1c: block('Read my SOLO 1 diff'),
  memory1: block('Use Claude Code itself'), memory2: block('This is a fresh'), memory3: block('This is another fresh'),
  solo2: block('Run npm run check:2 and show'), test2: block('npm run check:2\n'),
  solo3: block('Run npm run check:3'), test3: block('npm run smoke:mcp'),
  solo4: block('Run npm run lesson3'), day3Review: block('Read n8n/day3-review-queue.json'),
  solo4Final: block('Run npm run lesson3 for MSG-01'), parityOffline: block('node day4-sdk-parity/verify.mjs'), parityLive: block('node day4-sdk-parity/run.mjs MSG-01'),
  a1bDryRun: lessonPrompts.a1bDryRun, a1bChat: lessonPrompts.a1bChat, freshClaudeSession: lessonPrompts.freshClaudeSession
};
const REPO = {url: 'https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent', label: 'AetherLink-bv/aetherlink-day4-n8n-to-agent · branch main'};

// Walk every string of a slide. Terminal output (key "o") is quoted from the package and stays as it is.
const mapStrings = (value, fn, key) =>
  typeof value === 'string' ? (key === 'o' || key === 'prompt' || contract.prompts.blocks.includes(value) ? value : fn(value))
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
const terminalOutput = (slide, from, to) => {
  const lines = slide.visual?.term?.filter(line => line.o === from) ?? [];
  if (lines.length !== 1) throw new Error(`"${slide.title}" has ${lines.length} terminal lines equal to "${from}"`);
  lines[0].o = to;
  return slide;
};
const reuse = (min, slide, extra = {}) => {
  const {teach: teachExtra, ...rest} = extra;
  return {...slide, ...rest, min, teach: {...slide.teach, ...teachExtra}};
};

// One exercise slide: numbered steps with Copy prompts, a checkpoint, a human boundary and a full teach block.
const assignment = ({id, title, subtitle, min, steps, checkpoint, boundary, gist, learn, watch, terms, source}) => ({
  lessonId: 'workshop-4',
  title: `Assignment ${id}: ${title}`,
  kicker: `Day 4 · SOLO ${id}`,
  type: 'practice',
  layout: 'exercise',
  calm: true,
  timer: min,
  min,
  repo: REPO,
  ...(source ? {source} : {}),
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
  subtitle: 'Use the final Day 3 workflow. Claude Code maps each n8n node to the code you will build today.',
  source: {label: 'Download the final Day 3 workflow', url: 'assets/workshop-4/day3-review-queue.json', download: 'day3-review-queue.json'},
  steps: [
    {where: 'Terminal', text: 'Get the starter and start Claude Code', prompt: P.start, after: 'The last line starts Claude Code with the project settings and your own user settings. MCP servers and connectors stay off.', say: 'Four lines: clone, go into the folder, install, start Claude Code. Use Copy.'},
    {where: 'You', text: 'Locate the two workflows in n8n/', after: 'Open day3-review-queue.json and support-triage.json. If the first file is missing, download it into n8n/.', say: 'Show both files in the n8n folder. Earlier clones can use the download link to add day3-review-queue.json.'},
    {where: 'Claude Code', text: 'Compare the final workflow with the starter snapshot', prompt: P.day3Review, after: 'You get one table. Anything Day 4 does not yet reproduce is marked OPEN.', say: 'Paste the comparison prompt. It reads both snapshots and changes no file.'},
    {where: 'Terminal 2', text: 'Test it yourself from the repository root', prompt: P.test0, after: 'doctor checks your laptop and your login. verify runs the 24 starter tests and the dry runs. It calls no model.', say: 'Keep Claude Code and Terminal 2 in the cloned repository root all day. Type both commands there.'},
    {where: 'You', text: 'Point to the three sub-agents in the n8n JSON', after: 'A file marked TODO is yours to build today.', say: 'Find the three sub-agents in the table. They become three files today.'}
  ],
  checkpoint: ['npm run doctor and npm run verify exit 0.', 'You can point to the three sub-agents in the n8n JSON.'],
  boundary: 'Claude Code changes no file. Do not import or activate the n8n export. Stop after you have read the table.',
  gist: 'Everyone opens the starter and compares its two workflow snapshots as one table. Done when doctor and verify exit 0.',
  learn: ['The final Day 3 workflow is the source for today.', 'The plumbing is built. The Agent SDK parts say TODO.', 'Every assignment is the same loop: paste the prompt, the check goes green, one real run, read why.'],
  watch: ['“npm” or “git” not found: Node.js or Git is missing. See docs/SETUP.md.', 'The run says backend sdk: an API key is set on that laptop. Add --backend claude-code.', 'verify must show pass 24 and fail 0. A version number can differ.', 'A clone from an earlier class: make a fresh clone.'],
  terms: [['npm ci', 'installs the parts the starter needs'], ['npm run doctor', 'checks Node.js, Claude Code and your login'], ['npm run verify', 'runs the starter tests and the dry runs, with no model call'], ['Dry run', 'shows what would be sent, and stops before the model']]
});

const A1 = assignment({
  id: '1', min: 25, title: 'One agent that fills in the form',
  subtitle: 'Build the starter baseline first. The check tells you when its three files are right.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 1 prompt', prompt: P.solo1, after: 'First the check is red. That is correct. Then Claude Code fills in options.mjs, priority-schema.mjs and CLAUDE.md.', say: 'Paste the prompt. Watch the check go from red to green.'},
    {where: 'Terminal 2', text: 'Test it yourself', prompt: P.test1, after: 'check:1 compares your three files with the reference. It calls no model. lesson1 sends one ticket to the model.', say: 'Now the same check and the same run in your second terminal.'},
    {where: 'You', text: 'Read the table: each option, its n8n setting, and what goes wrong without it', after: 'Stop after you have read the table.', say: 'Read one row out loud to your neighbour.'}
  ],
  checkpoint: ['npm run check:1 passes.', 'The real run prints a priority, a reason and the Switch route.'],
  boundary: 'Claude Code changes three files and no other. The agent has no tools. You read the table before you continue.',
  gist: 'Claude Code fills in the Step 1 baseline from the starter snapshot. Assignment 5 applies the final Day 3 policy and review queue.',
  learn: ['settingSources loads the instructions.', 'tools: [] removes every tool. maxTurns limits the loop.', 'outputFormat forces the form. A test can check each setting.'],
  watch: ['A check that stays red: paste the failed line into Claude Code and ask for the smallest fix.', 'A real run takes up to a minute. The words of the reason differ on every laptop.', 'MSG-06 is loud. The policy says medium: something is wrong, but the customer can still work.', 'Claude Code that changes other files: say stop, only the three files.'],
  terms: [['npm run check:1', 'compares your Step 1 files with the reference, with no model call'], ['npm run lesson1 -- MSG-06', 'sends ticket MSG-06 to the model once'], ['options.mjs', 'the settings of the agent, like the panel of the n8n node'], ['outputFormat', 'the setting that forces the answer into the form']]
});

const A1b = assignment({
  id: '1b', min: 15, title: 'Inspect the form and the memory',
  subtitle: 'Claude Code shows the real output. You keep setup evidence and model evidence apart.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 1b prompt', prompt: P.solo1b, after: 'Claude Code explains what to inspect. It changes no file.', say: 'Paste the prompt. Keep the three kinds of evidence separate.'},
    {where: 'Terminal 2 · repository root', text: 'Run the dry run', prompt: P.a1bDryRun, after: 'The output shows the configuration. It is not a model answer.', say: 'Point to outputFormat and the route. Call this configuration evidence.'},
    {where: 'Terminal 2 · repository root', text: 'Start the first live chat', prompt: P.a1bChat, after: 'Identify the ticket as T-101. Give it a harmless marker. Ask for that marker in the same chat.', say: 'This is live model evidence. Use a harmless marker, not personal data.'},
    {where: 'Terminal 2 · repository root', text: 'Exit and start a second live chat', prompt: P.a1bChat, after: 'Identify this ticket as T-202. Ask for the marker from T-101. It must not know it.', say: 'Exit the first chat before you start this command again.'},
    {where: 'You', text: 'Label the evidence', after: 'The dry run is configuration evidence. The chats are live model evidence. docs/sample-trace.md is sample evidence only.', say: 'Name each output. A sample trace is never proof of your own run.'}
  ],
  checkpoint: ['The same conversation recalls its marker.', 'A fresh conversation for another ticket does not get that marker.', 'You can say which output is setup evidence and which came from a model.'],
  boundary: 'Claude Code changes nothing. You decide which output counts as evidence.',
  gist: 'Participants run one dry run and two separate chats from the repository root. Done when T-101 remembers its marker, T-202 does not, and every output has the right evidence label.',
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
    {where: 'You', text: 'Restore only the temporary policy edit', after: 'Keep the completed SOLO 1 files. Restore the policy to its exact pre-experiment text. Inspect the diff before and after. Then run npm run verify.', say: 'Do not revert the whole SOLO 1 diff. Remove only the temporary experiment.'}
  ],
  checkpoint: ['The before and after evidence uses the same messages.', 'Only the temporary policy edit is gone. The completed SOLO 1 files remain and npm run verify passes.'],
  boundary: 'Claude Code waits for your approval before the temporary change. You inspect the restored diff.',
  gist: 'One experiment on the policy: does a loud message get another label when the policy changes? Done when the policy is restored and verify is green.',
  learn: ['The policy text decides the label. Change the text and the label can change.', 'The label can also stay the same. The policy is still what you rely on.', 'After the experiment, only its temporary edit must disappear.'],
  watch: ['A temporary change that stays in the file. Check the diff before you continue.', 'A participant who reverts the completed SOLO 1 files. Restore only the temporary policy edit.', 'Participants who expect one fixed outcome. Labels can differ between runs.'],
  terms: [['Policy', 'the Priority definitions in CLAUDE.md'], ['Tone bias', 'a loud message gets another label than its content deserves'], ['Diff', 'the exact changes in your files']]
});

const A1M = assignment({
  id: '1M', min: 25, title: 'Memory per ticket',
  subtitle: 'Three Claude Code sessions. One reviewed memory file per ticket. No file is written before you approve.',
  steps: [
    {where: 'Claude Code', text: 'Session 1: build the T-001 memory', prompt: P.memory1, after: 'Read the proposal and approve it. Then Claude Code writes tickets/T-001/memory.md and stops.', say: 'Claude Code itself is the chat. Paste, read the proposal, approve.'},
    {where: 'Terminal · repository root', text: 'Exit Claude Code and start a fresh session', prompt: P.freshClaudeSession, after: 'The new session has not seen Session 1.', say: 'Stay in the repository root. Exit Claude Code, then run this command.'},
    {where: 'Claude Code', text: 'Session 2, a fresh one: resume T-001 from the file', prompt: P.memory2, after: 'The summary comes only from the file. Claude Code says that it read the file because you asked.', say: 'Open a new Claude Code session. It knows nothing. Now it reads the file.'},
    {where: 'Terminal · repository root', text: 'Exit Claude Code and start another fresh session', prompt: P.freshClaudeSession, after: 'The new session has not seen Session 1 or Session 2.', say: 'Exit again. Stay in the repository root and run the same command.'},
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
  id: '2', min: 25, title: 'A main agent and two sub-agents',
  subtitle: 'Claude Code fills in two sub-agent files and the main-agent options. You read the trace and the draft.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 2 prompt', prompt: P.solo2, after: 'The check goes from red to green. Then one real run with MSG-05.', say: 'Paste the prompt. Two files and the main-agent options.'},
    {where: 'Terminal 2', text: 'Test it yourself', prompt: P.test2, after: 'check:2 compares your two sub-agent files and the main-agent options with the reference. lesson2 runs the team on one ticket.', say: 'Same check, same run, in your second terminal.'},
    {where: 'You', text: 'Find risk-agent before customer-reply-agent in the trace', after: 'Both sub-agents return separately to the main agent.', say: 'Which sub-agent ran first? Where did each result return?'},
    {where: 'You', text: 'Read the draft in message', after: 'It is a draft. Nothing is sent.', say: 'Read the draft. Is there a fact in it that the ticket did not give?'}
  ],
  checkpoint: ['npm run check:2 passes.', 'The trace shows risk-agent before customer-reply-agent.'],
  boundary: 'Neither sub-agent has a tool. The reply in message is a draft. Nothing is sent.',
  gist: 'The single agent becomes a team. Done when check:2 passes and the trace shows risk-agent before customer-reply-agent.',
  learn: ['The description of a sub-agent tells the main agent when to delegate.', 'Each sub-agent starts with an empty context and returns only its answer.', 'In Step 2, the main agent delegates to Risk and Reply separately.'],
  watch: ['A draft with a fact that the ticket did not give. No specialist can look anything up yet.', 'The wrong order in the trace: read the description line of both files.', 'A personal style in the answers: your own user settings load too.'],
  terms: [['npm run check:2', 'compares your Step 2 files with the reference, with no model call'], ['npm run lesson2 -- MSG-05', 'runs the team on ticket MSG-05 once'], ['Trace', 'the order of specialists and tools in one real run'], ['Agent tool', 'the tool the team lead uses to hand a task to a specialist'], ['description', 'the line in an agent file that says when to use it']]
});

const A3 = assignment({
  id: '3', min: 25, title: 'Real facts from the lookup desk',
  subtitle: 'Claude Code adds the Customer Context sub-agent and connects the lookup desk. You match each fact to a tool result.',
  steps: [
    {where: 'Claude Code', text: 'Paste the SOLO 3 prompt', prompt: P.solo3, after: 'The check goes from red to green. Then one real run with MSG-08.', say: 'Paste the prompt. One more specialist file, and the options that connect the desk.'},
    {where: 'Terminal 2', text: 'Test it yourself', prompt: P.test3, after: 'smoke:mcp starts the lookup desk and calls each tool once. check:3 compares your files with the reference. lesson3 runs the full team.', say: 'Three commands this time. The first one tests the desk without a model.'},
    {where: 'You', text: 'Find get_customer and get_transaction in the trace', after: 'get_customer looks up one customer. get_transaction looks up one payment. Both only read.', say: 'Find the two lookups. Which specialist made them?'},
    {where: 'You', text: 'Match each fact in the draft to a tool result', after: 'A fact without a tool result is a question for the room.', say: 'Take one fact from the draft. Where did it come from?'}
  ],
  checkpoint: ['npm run check:3 passes.', 'The trace shows Context, then Risk, then Reply, with two tool results.'],
  boundary: 'The lookup desk only reads. Only the Customer Context sub-agent has its tools. You match each fact to a tool result.',
  gist: 'The team gets a third sub-agent and one lookup desk with two read-only tools. Done when check:3 passes and the trace shows Context, Risk, Reply with two tool results.',
  learn: ['An MCP server gives an agent tools from outside the SDK.', 'You name the server in mcpServers and give its tools to one sub-agent.', 'The other agents cannot look up or change data. They have no tool for it.'],
  watch: ['A change to 03-mcp/support-mcp/server.js. The desk is built and stays as it is.', 'A fact in the draft without a tool result. Ask where it comes from.', 'smoke:mcp also asks for a customer that does not exist. The tool says so. That is correct.', 'A green check proves the configuration. Only the real run proves the behavior.'],
  terms: [['MCP server', 'a small program that gives an agent tools. Here: the lookup desk, called support'], ['get_customer', 'looks up one customer in docs/customer_context.csv'], ['get_transaction', 'looks up one payment in docs/transactions.xlsx'], ['npm run smoke:mcp', 'starts the lookup desk and calls each tool once, with no model call'], ['npm run check:3', 'compares your Step 3 files with the reference']]
});

const A4 = assignment({
  id: '4', min: 12, title: 'Compare with n8n and collect proof',
  subtitle: 'Three real runs become one acceptance table. You make the review decision.',
  steps: [
    {where: 'Claude Code', text: 'Paste the final Day 3 comparison prompt', prompt: P.solo4Final, after: 'Claude Code runs MSG-01, MSG-06 and MSG-09 and writes participant-output/acceptance-table.md against n8n/day3-review-queue.json.', say: 'Paste the prompt. Three real runs take a few minutes.'},
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

const A5 = assignment({
  id: '5', min: 12, title: 'Save three drafts for human review',
  subtitle: 'Add the Day 3 review queue: three routes save a draft, but nothing is sent.',
  source: {url: 'assets/day4-sdk-parity.zip', label: 'Download the Day 4 SDK exercise', download: 'day4-sdk-parity.zip'},
  steps: [
    {where: 'You', text: 'Open day4-sdk-parity/ in your project', after: 'Read the priority rules in CLAUDE.md. If the folder is missing, unpack the download in your project root.', say: 'Show day4-sdk-parity/ next to package.json. For an earlier clone, use the ZIP on this slide.'},
    {where: 'Terminal · project root', text: 'Run the offline parity check', prompt: P.parityOffline, after: 'The check verifies the output schema, three routes and review-only draft storage without calling a model.', say: 'Run this from the project root. It proves the wiring before a live model run.'},
    {where: 'Terminal · project root', text: 'Run one low, medium and high ticket', prompt: P.parityLive, after: 'Context and Risk advise. The main agent decides priority. Reply writes text. Code validates, routes and saves the draft.', say: 'Run these from the project root. Read the route and saved file after each run.'},
    {where: 'You', text: 'Inspect the files in day4-sdk-parity/review-drafts', after: 'Each file contains priority, route, subject and body, and waits for review. The body contains no internal risk note or unsupported promise.', say: 'Open the three saved drafts. Check the status and the customer-facing text.'}
  ],
  checkpoint: ['Low, medium and high each produce a saved draft.', 'Every draft waits for human review and keeps the internal risk note out of the reply.'],
  boundary: 'Nothing is sent. A person approves every draft. The internal risk note stays outside the customer reply.',
  gist: 'The companion exercise adds the Day 3 review queue: three routes save a draft without sending it. Session memory was practised separately in Assignment 1b.',
  learn: ['The companion uses the final Day 3 priority definitions.', 'Context, Risk and Reply each return to the main agent.', 'The app validates, routes and saves the draft, but sends nothing.'],
  watch: ['The zip unpacked outside the completed project.', 'A failed offline check. Fix that before running the model.', 'A customer reply that contains the internal risk note or promises an action. Mark it FAIL.'],
  terms: [['Parity', 'the Day 4 app reproduces the observable outcome from the final Day 3 workflow'], ['validateOutput', 'code checks priority and message before it routes or saves anything'], ['review-drafts', 'the local folder where drafts wait for a person']]
});

// Slides written for this deck, in Jessy's visual pattern.
const bridgeQuestions = {
  lessonId: 'workshop-4',
  title: 'From the n8n workflow to code',
  kicker: 'Day 4 · Recap · 3 questions',
  subtitle: 'Use the double-charge ticket from Day 3. Answer one question per table.',
  type: 'context',
  cards: [
    {title: '1 · Decide', body: '“I was charged twice.” What priority would you give this ticket?'},
    {title: '2 · Route', body: 'Which node uses that priority to select low, medium or high?'},
    {title: '3 · Review', body: 'Where does the draft wait for a person to review it?'}
  ],
  keyPoints: ['Priority from the main agent', 'Route from the Switch', 'Saved draft awaiting review'],
  notes: 'Use one familiar Day 3 ticket to retrieve the decision, route and human review. Ask for one short answer per table. The next two slides add memory, structured output, the three sub-agents and customer data.',
  teach: {
    gist: 'One familiar ticket retrieves the Day 3 decision, route and review before participants rebuild them in code.',
    script: [
      {do: 'Give each table one question.', say: 'Use the double-charge ticket. Give one answer and name the node that produced it.'},
      {do: 'Ask one person per table to share.', say: 'Listen for the main agent, the Switch and the replies table with status waiting for approval.'}
    ],
    do: ['Give each table one question.', 'Collect one short answer per table.'],
    done: ['The room can trace one ticket from decision to review.'],
    learn: ['The same decision, route and review return today in code.'],
    watch: ['Keep answers concrete. The next slides fill the gaps.'],
    terms: []
  }
};

const mainFlowRecap = {
  lessonId: 'workshop-4',
  title: 'Last session · the main flow',
  kicker: 'Last session · the n8n workflow',
  subtitle: 'Chat starts the run. The main agent decides. Structured output and the Switch select the route.',
  type: 'concept',
  visual: {opener: 'showcase', image: 'assets/workshop-4/day3-chat-memory.png', imageLink: 'Day 3 · chat, main agent and Simple Memory'},
  cards: [
    {title: 'Chat and memory', body: 'The chat receives the ticket. Simple Memory carries earlier messages in the same session.'},
    {title: 'Main AI Agent', body: 'The System Message defines triage. The agent returns a priority and a draft.'},
    {title: 'Parser and Switch', body: 'The parser fixes the fields. The Switch sends low, medium and high to separate routes.'}
  ],
  keyPoints: ['One workflow, extended step by step', 'The model chooses the priority', 'Fixed code selects the route'],
  notes: 'Recap the main line of the final Day 3 workflow. It started with chat, added Simple Memory, then triage instructions, structured output and the Switch. Today these parts become session history, CLAUDE.md, a JSON schema and lib/switch.mjs.',
  teach: {
    gist: 'The main Day 3 line becomes code today: chat and memory, triage, structured output and fixed routing.',
    script: [
      {do: 'Point from left to right.', say: 'One chat message starts the workflow. The main agent decides the priority and drafts. The parser fixes the form. The Switch selects the route.'},
      {ask: 'Which part thinks, and which part follows a fixed rule?', say: '(Answer: the agent thinks. The Switch follows the fixed priority rules.)'}
    ],
    do: ['Trace the three cards from left to right.'],
    done: ['Everyone can name the main line that returns in code.'],
    learn: ['The agent chooses a label. Fixed code routes that label.'],
    watch: ['Do not call the Switch the decision maker. It routes the priority that the agent returned.'],
    terms: []
  }
};

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
    {title: 'A person decides', body: 'Outside this app. The agent sends nothing.'}
  ],
  keyPoints: ['The same ticket desk as in n8n, now in code.', 'One draft, always in the same form.', 'A person reads every draft.'],
  visual: {agentJob: {
    botTag: 'TICKET DESK',
    looks: [['👤', 'the customer'], ['💳', 'the payment']],
    docName: 'example draft · MSG-08',
    doc: [['priority', 'high', 'the policy'], ['message', 'Thank you for reporting the duplicate charge on TX-1014.', ['ticket message']]],
    check: {rules: ['priority is low, medium or high', 'message is the draft text', 'no other fields'], gate: 'only if the form is right'},
    wait: 'a draft, ready for a person',
    yes: 'Approve draft',
    no: 'Change it'
  }, reveal: 'click', covers: []},
  notes: 'Show the whole desk before the first assignment. Last session participants extended one n8n workflow step by step. Today they rebuild the same responsibilities as one small app. The ticket is fictional. The agent looks, writes one draft in a fixed form, and plain code checks the form. A person reviews outside this app. Nothing is sent by the agent.',
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
  cards: [{title: 'The n8n flow', body: ''}, {title: 'The same desk in code', body: ''}, {title: 'The starter today', body: ''}, {title: 'The gap', body: ''}, {title: 'Nine assignments', body: ''}],
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
    note: 'The gap is nine assignments. Each one starts with a check or a concrete proof step.'
  }},
  notes: 'Show what the starter already has before anyone opens it. The runner, the read-only lookup desk and the checks are built. The Agent SDK parts say TODO. On main the three specialist files exist, with only a name and TODO lines. Participants stay on main all day. They never copy files from another branch.',
  teach: {
    gist: 'The starter has the plumbing. The Agent SDK parts say TODO. Nine assignments close the gap.',
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
  reuse(3, patch(ryan('Welcome to Day 4'),
    ['Last session you built the flow in n8n. Today you build the same flow in code.', 'Last session you built a support workflow in n8n. Today you’ll build it in code.'],
    ['sorting machine from n8n blocks', 'support workflow in n8n'],
    ['sorting machine for customer messages in n8n, by connecting blocks', 'support workflow in n8n, node by node'],
    ['exactly the same machine', 'the same workflow'],
    ['the same machine', 'the same workflow']), {teach: {
    copy: [['Trainer · before class, on your own clone', P.trainer]],
    watch: ['Did Day 3 not work for someone? Reassure them: the starter has everything, so nobody is behind.', 'For you: demo from the trainer/solution branch. Nothing must be built before class. Participants stay on main.']
  }}),
  reuse(6, bridgeQuestions),
  reuse(2, mainFlowRecap),
  reuse(3, patch(ryan('Last session · 4. The team of specialists'),
    ['Last session · 4. The team of specialists', 'Last session · the team of specialists'],
    ['Recap · n8n flow 4/4', 'Last session · the n8n flow'],
    ['assets/day3-maarten-n8n/11-three-sub-agents.jpeg', 'assets/workshop-4/day3-final-sub-agents.svg'],
    ['n8n · Customer Reply, Risk and Customer Context agents', 'Final Day 3 workflow · one memory on the main agent and three sub-agent tools'],
    ['As in an office, everyone has one job. Today, Reply and Risk become agents in code. Customer Context comes back in Step 3, with a lookup desk (MCP).', 'The main agent delegates to Reply, Risk and Customer Context. Today the same three become sub-agents in code.'],
    ['The risk expert: decides how risky the message is.', 'The risk expert: writes a short internal risk note.'],
    ['Ask: who called the Risk Agent, and what customer information reached the Reply Agent?', 'Point out that the main agent called all three tools and that only the main agent had Simple Memory.'],
    ['show this screenshot as the example', 'show this diagram as the final example'],
    ['The risk expert decides how risky the message is.', 'The risk expert writes an internal risk note.'],
    ['Who called the Risk Agent in your flow last session?', 'Which agent called Reply, Risk and Customer Context in the final flow?'],
    ["(Listen to the answers. If someone's flow did not work, show this diagram as the final example.)", '(Answer: the main agent. If someone’s flow did not work, show this diagram as the final example.)'])),
  reuse(4, story),
  reuse(2, patch(ryan("Today's goal"),
    ['When a person has to approve a change.', 'Where a person reviews before anything reaches a customer.'],
    ['A person says yes before a change', 'A person reviews every draft'],
    ['And you know when a person must say yes before anything changes.', 'And you know where a person reviews before anything reaches a customer.'],
    ['At the end of the day we will come back to this, and to the goals you wrote down this morning.', 'At the end of the day we return to the double-charge ticket and trace the complete result.'],
    ['Come back to this at the close, together with the goals that people wrote down this morning.', 'Return to this at the close with the double-charge ticket from the opening.'],
    ['Link it to the goals on the board.', 'Link it to the double-charge ticket from the opening.'])),
  agenda,
  reuse(4, patch(ryan("The dictionary: last session's blocks, today's names"),
    ["The dictionary: last session's blocks, today's names", "The dictionary: last session's nodes, today's names"],
    ['Every block from last session, with its name in code. And still a person at the end.', 'The core parts return, but responsibilities move into code. There is still a person at the end.'],
    ['Everything they built last session comes back today, and only the name changes.', 'The core parts return today, but the responsibility can move to a file, a sub-agent or fixed code.'],
    ['Everything from last session comes back. Only the name changes. And at the end there is still a person who checks.', 'The core parts return, but not as a one-to-one rename. A person still checks the result.'],
    ['Everything from last session comes back', 'The core parts return'],
    ['Only the name changes', 'Responsibilities move into code'])),
  reuse(5, ryan('How does an agent work?')),
  reuse(2, ryan('Which login do we use? And whose data?'), {teach: {watch: [
    "Does someone's run choose 'sdk' by itself? Then an API key is set on their laptop. Add --backend claude-code to the command.",
    'The lessons load project and user settings. A large personal setup can change the tone of the free-text answers, and each run costs more. MCP servers and connectors stay off.',
    'Company laptop on Vertex AI and a run says it is not logged in? Run npm run doctor. If the Login settings line says none, follow docs/SETUP.md, Company login.'
  ]}}),
  reuse(2, ryan('Words you need today')),
  reuse(5, starter),
  A0,
  reuse(4, patch(terminalOutput(ryan('Check: does your screen look like this?', 'What you see · Step 0'), 'ℹ pass 21', 'ℹ pass 24'),
    ['dry run — no model call', 'dry run, no model call'])),
  pause('Coffee break', 'Day 4 · Break', 15, 'coffee', 'Not at fail 0 yet? Stay for a moment and we fix it together.'),

  reuse(4, patch(ryan("CLAUDE.md: the agent's work instructions"),
    ['inside the n8n block (System Message)', 'inside the n8n node (System Message)'],
    ['It is like the work instructions that a new colleague gets on day one.', 'This first file is the starter baseline. Assignment 5 returns to the final Day 3 policy. It is like the work instructions that a new colleague gets on day one.'])),
  reuse(4, patch(ryan('The form, now in code'),
    ['The same form, now as a file: priority-schema.mjs. Today it has two fields: priority and reason. The AI has to fill it in.', 'The form changes slightly. Day 3 returned priority and message. Today priority-schema.mjs returns priority and reason.'],
    ['It is the same form with the same fields. The AI has to fill it in, otherwise the answer is refused.', 'It is the same idea, but not the same fields. The schema now checks priority and reason.'])),
  A1,
  reuse(5, ryan('Check: does your screen look like this?', 'What you see · Step 1')),
  reuse(4, patch(ryan('Session memory: the chat remembers this conversation'), ["Just like the shop counter from this morning's recap: with the same customer, you remember; with a new customer, you start afresh.", 'Like a shop counter. With the same customer, you remember. With a new customer, you start afresh.'])),
  A1b,
  reuse(4, patch(ryan('Quiz: message 6'),
    ['That is the medium line of the policy in CLAUDE.md.', 'That is medium in both the starter baseline and the final Day 3 policy.'])),
  A1c,
  reuse(5, ryan('Discuss: who decides what?')),
  reuse(4, ryan('Context: what can the AI see at once?')),
  reuse(5, memoryKinds),
  patch(A1M, ['No UI and no model call are added.', 'No UI and no app model call are added.']),
  pause('Lunch', 'Day 4 · Lunch', 45, 'sleepy', 'Fallen behind? Give Claude Code the failing check and ask for the smallest fix.'),

  reuse(5, ryan('Tools: what may each agent use?')),
  reuse(5, patch(ryan('The team: a team lead and two specialists'),
    ['Last session in n8n the Risk Agent was wired as a tool of the Reply Agent.', 'In the main Day 3 workflow, the main agent called Risk and then Reply. The optional extra nested Risk under Reply.'],
    ['The team lead hands out the work. The risk expert goes first, and its result goes to the writer.', 'The main agent delegates to Risk and then Reply. In Step 2, both return separately to the main agent.'],
    ['Writes the draft reply, using the risk note.', 'Writes the draft reply from the ticket and priority. Step 3 can add the risk note to the handoff.'],
    ['Step 2: the orchestrator delegates to risk-agent first, and then passes that result to customer-reply-agent.', 'Step 2: the orchestrator delegates to risk-agent first, then separately delegates to customer-reply-agent.'],
    ['The writer gets the risk note and writes the draft.', 'The writer gets the ticket and priority. Step 3 can add the risk note.'],
    ['The team lead hands out the work: risk first, then the writer.', 'The main agent delegates to Risk and then Reply; both return to the main agent.'])),
  reuse(4, ryan('Each specialist is one file')),
  reuse(3, ryan('Put the file in the folder: Claude finds it')),
  A2,
  reuse(4, patch(ryan('Check: does your screen look like this?', 'What you see · Step 2'),
    ['team-lead options', 'main-agent options'])),
  reuse(5, patch(ryan('Discuss: who did what?'),
    ['risk-agent provides the priority and risk analysis.', 'risk-agent provides an internal risk analysis.'],
    ['customer-reply-agent uses the original message and risk-agent result.', 'customer-reply-agent uses the original message and priority in Step 2.'],
    ['Answers: the risk expert goes first, because the writer needs its risk note.', 'Answers: Risk runs first, but both sub-agents return separately to the main agent in Step 2.'],
    ['Discussion: the order (risk first) and where the Description lives now.', 'Discussion: the order, the return to the main agent and where the Description lives now.'],
    ['(Answer: risk. The writer needs to know how serious it is.)', '(Answer: Risk runs first. Both results return separately to the main agent.)'])),
  reuse(5, patch(ryan('MCP: the lookup desk'),
    ['MCP is the lookup desk. It is read-only: it looks things up and never changes them.', 'The support MCP server is a read-only lookup desk. Other MCP tools can write, such as the draft tool later.'],
    ['And the desk can only look things up. It cannot change anything.', 'This support desk can only look things up. It cannot change anything.'],
    ['It is read-only.', 'This support desk is read-only.'])),
  A3,
  reuse(4, ryan('Check: does your screen look like this?', 'What you see · Step 3')),
  reuse(5, patch(ryan('Discuss: where did the facts come from?'),
    ['Who reads the draft before it is sent?', 'Who reviews the draft before anything reaches a customer?'],
    ['A person reads every draft before it is sent.', 'A person reviews every draft before anything reaches a customer.'])),
  pause('Coffee break', 'Day 4 · Break', 15, 'coffee', 'Fallen behind? Keep your work and fix the first failing check.'),

  reuse(4, ryan('Fixed rules or a thinking agent?')),
  A4,
  reuse(4, patch(ryan('Check: does your evidence look like this?'),
    ['Each label and external-data claim points to an actual run, saved draft or tool result.', 'Each route and customer-data claim points to a run or tool result.'],
    ["Show the participant's acceptance table and one real trace. Read one row end to end. If the evidence is absent, the row says OPEN. Do not compare against a hidden answer key.", 'Show the acceptance table and one real trace. Read one row end to end. If evidence is absent, the row says OPEN.'])),
  A5,
  reuse(5, patch(jessy('Discuss: who is accountable?'),
    ['In the assignment every change gets one line in participant-output/audit.jsonl; in production you add the name of the reviewer.', 'Today your acceptance table is the record. In production you add the name of the reviewer.'],
    ["an audit log: what happened, when, and who approved it. Our assignment writes one line per change; in production you add the reviewer's name.", "a record of what happened, when, and who approved it. Today that is your acceptance table. In production you add the reviewer's name."],
    ['nine messages', 'ten messages'],
    ['it is exactly the point of the barrier.', 'it is exactly why a person reviews every draft.'])),
  reuse(4, ryan('On Monday: take this to your squad')),
  reuse(4, patch(ryan('Close: a person stays in charge'),
    ['This morning we started with a sorting machine in n8n blocks.', 'This morning we started with the support workflow from Day 3.'],
    ['Only the keys it needs', 'Narrow tools'],
    ['One agent can look things up. No agent can change data.', 'The support tool only reads. The draft tool only saves for review.'],
    ['Go back to the goals on the board from this morning.', 'Return to the concrete Day 3 ticket from the opening.'],
    ['Point at the goals on the board from this morning.', 'Point back to the double-charge ticket from the opening.'],
    ['Look at the goal you wrote down this morning. Who got there?', 'Can you now trace this ticket from chat to a saved draft that waits for review?'],
    ['back to this morning\'s goals', 'back to the opening ticket'],
    ['Ask for one result each, and go back to the goals.', 'Ask for one result each, and return to the opening ticket.'],
    ['Next: Day 5', 'Day 5'])),
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
  ['Proof', 'Assignment 4: compare with n8n.\nAssignment 5: save drafts for review.']
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
const day3Terms = slide => mapStrings(slide, text => text
  .replace(/\bSpecialists\b/g, 'Sub-agents')
  .replace(/\bspecialists\b/g, 'sub-agents')
  .replace(/\bSpecialist\b/g, 'Sub-agent')
  .replace(/\bspecialist\b/g, 'sub-agent')
  .replace(/\bTeam lead\b/g, 'Main agent')
  .replace(/\bteam lead\b/g, 'main agent'));
let pauseIndex = 0;
const ordered = day.map(s => s.pause ? pauseSlide(s, pauses[pauseIndex++]) : s.agenda ? agendaSlide(s.min) : s).map(day3Terms);

// Finish every slide: duration, the pointer to the next slide, and a complete teach block.
const slides = addDay4LessonMedia(ordered.map(({min, ...s}, i) => {
  const next = ordered[i + 1]?.title ?? 'End of Day 4';
  const time = min ? `${min} min` : 'after the day';
  const teach = {...s.teach, time, learn: s.teach.learn ?? s.keyPoints ?? [], terms: s.teach.terms ?? [], next};
  const slide = {...s, notes: `Time: ${time}.\n\n${s.notes}\n\nNext: ${next}`, teach};
  if (slide.type === 'pause') slide.cards = [{title: slide.cards[0].title, body: `Next: ${next}`}];
  // The recap layout joins label and caption with an em dash. One label per item keeps the slide free of it.
  if (slide.items) slide.items = slide.items.map(({label, caption}) => ({label: caption ? `${label}: ${caption}` : label}));
  return slide;
}));

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
