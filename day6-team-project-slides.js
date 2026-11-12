/* ==========================================================================
   Aetherlink x Worldline — Day 6 deck: the team project (first hackathon day)
   23 slides. One slide = one object in order. See README.md "How to edit
   a slide" before changing anything here.

   Field reference:
     title     - required. Shown as the big heading.
     kicker    - small text above the title (e.g. "DAY 1 · PART 1").
     subtitle  - one sentence under the title.
     type      - one of: context, concept, practice, review, quiz, recap, pause.
                 Controls the colour chip and the footer progress dot.
                 quiz: its own colour and look (use with visual.quiz).
     dark      - true to render this slide on the dark background variant.
     hidden    - true to skip this slide by default on every laptop (H or Chapters shows it again).
     layout    - optional: "steps" | "pillars" | "compare" | "recap" |
                 "exercise" (assignment slides — timer + "Do this now" panel).
                 Leave out for a plain card grid (the default).
     cards     - array of {title, body} shown as the card grid.
     items     - for layout "steps"/"pillars"/"recap": {label, caption, detail}.
     columns   - for layout "compare": {title, items:[...], foot}.
     steps     - the "Do this now" checklist (plain strings) for exercise slides.
     expected  - one sentence: what a good result looks like.
     check     - the checkpoint question a facilitator/participant confirms.
     (Assignment timers have no preset: the facilitator types the minutes on the slide.)
     prompt    - an exact phrase the facilitator can read aloud or paste.
                 For slides with a CURRICULUM.md "Prompt panel" code block,
                 this is that block verbatim (template literals preserve the
                 original line breaks) — do not paraphrase these.
     tagline   - a short bold line rendered under the slide's main content.
     notes     - facilitator speaker notes, the full text (never shown to participants).
     keyPoints - 3–5 keyword bullets shown above the notes in the presenter view.
     visual    - optional illustration, never changes wording:
                 bot: 'wave'|'think'|'point'|'head' (AetherBOT pose)
                 place: 'left'|'beside'|'under'|'timeline'
                 tool: 'map'|'arm'|'toolbox'|'thought' (comes out of his head)
                 target: CSS selector the tool points at
                 art: 'timeline' · cardArt: { <cardIndex>: 'route' } · pillarIcons
                 highlight: [{ in: 'title'|'subtitle'|'card:N', text, tone:
                              'orange'|'purple'|'mark' }] — text must exist verbatim
                 stagger: 'pop' — cards pop in one by one
                 hero: N — card N becomes one big centred statement
                 popOut: N + place: 'popout' — card N's lines pop out of the bot as chips
                 art: 'nested' + place: 'nest' — steps shown as rings inside each other (+ magnifier)
                 keyLine: N (+ stamp, place: 'key') — card N becomes the big key line, bot stamps it
                 art: 'flow' + place: 'slot' — cards 1+2 flow through the bot into card 3
                 art: 'window' — context-window box filling with tokens beside the cards
                 cardArt: { N: 'sliders'|'thermo' } — small illustration inside card N
                 reveal: 'click' (+ place: 'slot') — cards start closed; click / → opens the next (buttons: true shows buttons)
                 faces: [...] — with reveal: AetherBOT's face per opened card (assets/aetherbot/faces/:
                        verward · dubbel · eigenwijs · slaperig · betrapt · blij · verrast)
                 checklist: N — card N's lines become a list that ticks itself off
                 highlight 'in' may also be 'tagline'
                 quiz: { answer: N } — → strikes the wrong cards one by one, then marks N (checkpoint hidden)
                 spotlight: N — card N lights up, the others dim
                 pairs: true — compare layout shown as row pairs, one per click / →
                 countdown: minutes — pause slide: live countdown + real "Back at" clock time
                 chipIcons: [...] — icons in front of popOut chips
                 bot: 'stretchLeft'|'stretchRight' + place: 'pointer' + pointAt: N — stretch arm reaches card N
                 chipGrid: 3 — popOut chips in a 3-column grid
                 term: [{c}|{o}|{ask}] — terminal beside the cards that types commands, output, then an approval question
                 art: 'gate' — route Explore → Plan → approval gate → Change; click / → opens the gate
                 art: 'prompt' (+ promptMarks) — the slide's prompt typed in a terminal; B shows plan B (demo-fallback.js)
                 stepKeys: true (+ humanStep: N) — steps layout without buttons, → activates the next step
                 reach: true — (with stepKeys) AetherBOT's arm telescopes to the active step
                 art: 'loop' — (with stepKeys) steps drawn as a circle: 4 nodes + "repeat or stop" in the middle
                 art: 'boxes' (+ link) — compare columns drawn as boxes inside boxes; → zooms in, then links items
                 addLine: 'placeholder' — (with checklist) an empty line the trainer can type into live
                 stack: [tags] — cards pop in top to bottom, one by one, each with a tag
                 cmdCards: [N..] — card bodies shown as typing terminal lines (lines ending in ':' or '.' are notes)
                 browser: N — mini browser with the four app pages in card N (Game live, rest empty)
                 lineReveal: N — card N's lines as a numbered list that pops in
                 stamps: ['PASS', …] (+ bot, place: 'stamps') — clickable decision stamps that pop out of AetherBOT's head (checkpoint box hidden)
                 badge: N — card N's lines as an empty profile badge
                 swap: true — two AetherBOT heads passing work to each other (peer review); with stamps: stamps pop between them
                 template: N (+ templateRows) — empty card template (term/definition or the card's own lines)
                 notebook: N — card N's lines as a ruled notebook page
                 quietTimer: minutes — quiet countdown (no "Back at") beside the cards
                 badges: [icons] (+ place 'aside') — title-only cards unlock one by one like achievements
                 dayRoute: [stops] — the shape of the day as a route under the cards
                 art: 'stairs' (+ stepKeys, today: [i]) — levels as a staircase, today's levels tagged
                 art: 'intake' (+ place 'aside', tags) — every card flows into AetherBOT
                 mdfile: N — card N's lines as sections of a CLAUDE.md file
                 guides: [[icon, name, verb], …] — two badges "X guides ≠ Y enforces" above the tagline
                 repeatStack: N — card N repeated as three cards that fly in and fan out like a hand of cards
                 mdName — file name shown on mdfile (default CLAUDE.md)
                 noSkill: N — card N's body becomes a "No skill yet" badge
                 diff: [{title, rows:[{k, miss, odd, note}]}] — two mini cards side by side, differences circled
                 lifespan: [{kind:'now'|'always'|'recurring', icon, label}] — per card a small "how long it lives" track
                 tree: N — card N's path as a folder tree ending in an empty file
                 fence: N — card N's lines as signs on a fence around a bouncing AetherBOT (bounded autonomy)
                 conveyor: N — card N becomes a belt: terms go into AetherBOT, READY/REVISE/OPEN cards come out
                 loopCaptions: true — (with art 'loop') show the active step's caption under the loop
                 perCard: [stamps] — row of mini cards, each with its own decision stamp (checkpoint hidden)
                 gameFlow: true — cards as one round of the game with a loop-back arrow
                 gameMock: true — mini game screen beside the cards, feedback area empty ("you build this")
                 phrase: '…' — a chat bubble with the exact phrase to say
                 catChips: N — card N's lines as coloured rating labels
                 runner: [{label, tone}] — card 0's lines as test cases that "run" and show their expected result (checkpoint hidden)
                 plugs: N — MCP picture: AetherBOT plugged into an MCP server via card N's lines
                 zones: [left, right, [chips]] — compare layout as 'your laptop' vs 'outside' behind an MCP gate
                 pending: [title, text] — visible placeholder for content that still has to be added
                 sourceTiles: N — card N's lines as source tiles with a read-only lock
                 planB: 'WINDOW_VAR' (+ planBLabel) — B shows a captured example (see demo-fallback.js)
                 menu: N — card N's lines as clickable chips (pick one)
                 pipes: true (+ same: [k]) — compare columns 'A → B → C → D' as two aligned pipelines; same stages glow
                 recapKeys: true — recap items pop in one by one with a trophy (no buttons, no clicking)
                 levelUp: true — recap items tick off with a progress bar filling up
                 supportDays: true — (with art 'timeline') the two teaching days marked done
                 doneSteps: N — (with stepKeys) first N steps done ✓, the next one pulses
                 handover: 'text' — compare: AetherBOT on the AI side, 👤 on the people side, then a big closing line
                 sentences: true — cards as open sentences on a notebook page
                 oneCol: true — the card grid as a single column (e.g. for long command lines)
                 stepThrough: true | 'selector' — cards, pillars, compare columns, pop-out chips and the tagline
                              appear one per click / → (skipped if the slide already has its own reveal)
   stepsHeading (slide field) — heading above the steps; default "Your prompt must ask Claude Code to:"
   ========================================================================== */
window.SLIDES = [

/* ==========================================================================
   DAY 6 — The team project: from idea to a plan you can build
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* DAY 6 — Welcome and recap                                                */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Welcome to Day 6!",
  kicker: "AETHERLINK × WORLDLINE · DAY 6",
  subtitle: "",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["On screen as people arrive","Warm welcome once seated","Today is their day, not ours"],
  notes: "Have this on screen while people walk in. Once everyone is seated, give a short welcome. Set the tone straight away: today the teams do the work and we facilitate."
},

{ // Slide 2
  title: "Where we are",
  kicker: "DAY 6 · ROUTE",
  subtitle: "Everything so far was practice. Today the team project starts for real.",
  type: "context",
  visual: { bot: 'wave', place: 'left', dayRoute: ['Day 1: Claude Code', 'Day 2: skills, agents', 'Day 3: n8n', 'Day 4: Agent SDK', 'Day 5: SDLC, Sonny', 'Today: team project', 'Day 7: AI app'] },
  cards: [
    { title: "Today", body: "Your team turns an idea into a plan you can build, and starts building." },
    { title: "Day 7", body: "Your team shows a working AI app." }
  ],
  keyPoints: ["Walk the route left to right","Each day added one piece","Today: idea becomes a plan","Day 7: a working app"],
  notes: "Walk the route once: Day 1 Claude Code and the working method, Day 2 skills, agents and workflows, Day 3 workflows in n8n, Day 4 the Claude Agent SDK, Day 5 the software development life cycle with Sonny, the on-call agent. Today all of that comes together in one team project. Day 7 is the finish line: a working AI app the team can show.",
  teach: {
    time: '3 min',
    gist: 'Where we are in the week: five days of practice, today the team project starts, Day 7 the team shows a working AI app.',
    script: [
      {do: 'Slide appears. The route fills in from left to right.', say: 'Before we start: where are we? Five days behind us. Each day added one piece.'},
      {do: 'Point at Day 1 and Day 2.', say: 'Day 1: Claude Code and the way we work with it. Day 2: skills, agents and workflows.'},
      {do: 'Point at Day 3 and Day 4.', say: 'Day 3: workflows in n8n. Day 4: agents with the Claude Agent SDK.'},
      {do: 'Point at Day 5.', say: 'Day 5: the software development life cycle. You built Sonny, the on-call agent, step by step: on your own, with Claude Code.'},
      {ask: 'Which of these days did you find most useful for your own work?', say: '(Let two or three people answer. Keep it short.)'},
      {do: 'Point at Today and the Today card.', say: 'Everything so far was practice. Today your team picks one idea, turns it into a plan you can build, and starts building.'},
      {do: 'Point at Day 7 and the Day 7 card.', say: 'Day 7 is the finish line: your team shows a working AI app.'}
    ],
    learn: ['Each day added one piece; today they all come together.', 'Today: from idea to a plan you can build, and a first build.', 'Day 7: a working AI app the team shows.'],
    watch: ['Keep it to the route: what each day was about comes back on the next slides.', 'Someone missed a day: reassure them, the recap on the next slides covers what they need.'],
    next: 'what do you remember from Day 5?'
  }
},

{ // Slide 3
  title: "What do you remember?",
  kicker: "DAY 6 · RECAP",
  subtitle: "Without looking back, explain:",
  type: "recap",
  tagline: "Answer from memory first, no peeking.",
  visual: { reveal: 'click', bot: 'peek', place: 'slot', noReact: true },
  cards: [
    { title: "03:45, checkout errors at 12%. What did Sonny do, and what did he not do?", body: "" },
    { title: "What is evidence, and why does a diagnosis need it?", body: "" },
    { title: "What goes in intent.md, and why does Claude Code read it before every build?", body: "" },
    { title: "What does the contract do, and how do you know it works?", body: "" },
    { title: "Where did the operator have to decide, and why?", body: "" }
  ],
  keyPoints: ["Cold retrieval","One question per click","Room answers first","Gaps = what to support today"],
  notes: "Cold retrieval: no slides, no notes. Open one question per click and let the room answer. The questions follow Day 5: the 03:45 incident, Sonny, intent.md, the contract and the operator's approval. Note the gaps out loud: whatever the room can't answer is what you will support most today.",
  teach: {
    time: '6 min',
    gist: 'Five questions about Day 5, answered from memory. Whatever the room cannot answer is what you support most today.',
    script: [
      {do: 'Slide appears with five closed questions.', say: 'Day 5, from memory. No slides, no notes. I open one question at a time. You answer first, then I add what is missing.'},
      {do: 'Click question 1.', ask: '03:45, checkout errors at 12%. What did Sonny do, and what did he not do?', say: '(Answer: he looked where you would look: the graphs, the latest updates, what changed in the code, the error messages. He wrote a diagnosis with evidence and one proposed fix. He changed nothing himself: he only read, and asked the operator.)'},
      {do: 'Click question 2.', ask: 'What is evidence, and why does a diagnosis need it?', say: '(Answer: one line of data that shows something: where it is and which entry, like deploys:d-4821. With evidence the operator can check the diagnosis instead of just believing it.)'},
      {do: 'Click question 3.', ask: 'What goes in intent.md, and why does Claude Code read it before every build?', say: '(Answer: what the agent must do: the problem, the outcome, who uses it, what it may not do, and open questions. You decide, Claude Code writes it down. Because every build starts from it, Claude Code builds what you agreed instead of guessing.)'},
      {do: 'Click question 4.', ask: 'What does the contract do, and how do you know it works?', say: '(Answer: the contract is the five rules together, as code. It runs on every diagnosis before the operator sees it. Tests give it made-up diagnoses, good and bad, and show that it catches the bad ones: red first, green when the rules are built.)'},
      {do: 'Click question 5.', ask: 'Where did the operator have to decide, and why?', say: '(Answer: before anything changes, for example before a rollback. A named person approves one proposed fix for one incident. The AI can be wrong, and a person is responsible for what goes live.)'},
      {say: 'Name the gaps out loud: “Question 4 was hard, so we will come back to rules and tests when you build.”'}
    ],
    learn: ['Sonny only reads, writes a diagnosis with evidence, proposes one fix, and asks.', 'intent.md first, then build.', 'The contract and its tests catch bad diagnoses.', 'A person approves before anything changes.'],
    watch: ['Wait for the room before you answer. Silence is fine for a few seconds.', 'Online participants: ask them to type their answer in the chat.', 'Do not teach Day 5 again: one or two sentences per answer is enough.'],
    terms: [['Diagnosis', 'what Sonny writes: what is wrong, the evidence, one proposed fix'], ['Evidence', 'one line of data: where it is and which entry'], ['Contract', 'the five rules together, as code, run on every diagnosis'], ['Test', 'example diagnoses you run with npm test to show the contract catches bad ones'], ['Approval', 'a named person signs one proposed fix for one incident']],
    next: 'Day 5 in pictures, and what you take into your own project.'
  }
},

{ // Slide 4
  title: "Day 5 in pictures",
  kicker: "DAY 6 · RECAP · DAY 5 IN PICTURES",
  subtitle: "03:45, checkout errors at 12%. Six assignments later, Sonny was an agent you could trust.",
  type: "concept",
  visual: { stepThrough: '.cards > .card, .sb-take',
    scrapbook: [
      { tag: 'A1', pic: { kind: 'term', lines: ['$ npm test', '✓ 56 passed', '$ npm run investigate …', 'Customer impact: (missing)'] }, keys: ['research', 'fixture', 'telemetry'], moment: "Sonny’s first diagnosis: checkout broken at 03:45, customer impact… not mentioned." },
      { tag: 'A2', pic: { kind: 'file', name: 'intent.md', lines: ['## For whom: the operator', '## Must do: diagnosis + evidence', '## Must not: act on his own', '## Not sure? write OPEN'] }, keys: ['intent.md', 'OPEN'], moment: 'Claude Code asked the questions. For once, you had to have the answers.' },
      { tag: 'A3', pic: { kind: 'term', lines: ['$ npm run test:workshop', 'FAIL  1 pass · 6 fail', '… Claude Code builds the rules …', 'PASS  7 pass · 0 fail'] }, keys: ['rule', 'contract', 'test'], moment: 'Red first, green after. For once, red was the good news.' },
      { tag: 'A4', pic: { kind: 'chat', lines: [['you', 'Roll back now.'], ['bot', 'I can’t. A rollback is a button for a named person.']] }, keys: ['guardrail', 'approval'], moment: '“Roll back now.” Sonny: nice try.' },
      { tag: 'A5', pic: { kind: 'term', lines: ['list_deploys → []', 'FAIL  contract', '… you build the tool …', 'PASS  v2.15.0 is back'] }, keys: ['tool', 'evidence'], moment: 'We took Sonny’s eyes away on purpose. The contract noticed straight away.' },
      { tag: 'A6', pic: { kind: 'big', emoji: '💥', text: 'Make something break → incident in about 60 s' }, keys: ['incident', 'approval', 'proposed fix'], moment: 'You broke the shop yourself. Sonny found it. You approved with your own name.' }
    ],
    scrapTakeLabel: 'Take with you today',
    scrapTake: ['intent.md', 'Rules and tests', 'Read first', 'Approval'] },
  cards: [
    { title: "Look first, change nothing", body: "Claude Code showed you the project. You ran Sonny on the saved 03:45 night." },
    { title: "Write down what Sonny must do", body: "intent.md: for whom, what, what not. Not sure? Write OPEN." },
    { title: "Rules, then the contract", body: "Five rules every diagnosis must meet. The test went from red to green." },
    { title: "No shortcuts past the person", body: "A chat message can never start a rollback. That is for a named person." },
    { title: "Tools: how Sonny sees", body: "Without the tool Sonny was blind; with it he found the bad update again." },
    { title: "Break the shop, then decide", body: "Sonny opened the incident, proposed a rollback, and you decided." }
  ],
  keyPoints: ["Day 5 as six pictures: A1 to A6", "Look first, intent, rules, guardrails, tools, decide", "One funny moment per assignment", "Take along: intent.md, rules and tests, read first, approval"],
  notes: "A visual recap of Day 5: one polaroid per assignment, with what you saw on screen, the words of that day and a light moment. Each click shows the next one; the last click shows the four things the team takes into its own project today: intent.md, rules and tests, read first, approval. The moments come from the assignments themselves; if your group had its own funny moment on Day 5, tell that one instead.",
  teach: {
    time: '5 min',
    gist: 'Day 5 in six pictures, one per assignment, with a light moment each. Then the four things the team takes into its own project.',
    script: [
      {do: 'Slide appears: title and the 03:45 line only.', say: 'You just answered from memory. Now let us look at the photos. 03:45, checkout errors at 12%.'},
      {do: 'Press → : A1.', say: 'A1: look first, change nothing. Claude Code showed you around. And Sonny’s first diagnosis? Checkout broken at 03:45, and not one word about the customers.'},
      {do: 'Press → : A2.', say: 'A2: you wrote down what Sonny must do, in intent.md. Claude Code asked, you decided. And when you did not know: OPEN, not a guess.'},
      {do: 'Press → : A3.', say: 'A3: rules, then the contract. The test was red first: that was the good news. After the build: seven green.'},
      {ask: 'Why was red the good news?', say: '(Answer: it shows the test really checks something. A test that is green before you build anything proves nothing.)'},
      {do: 'Press → : A4.', say: 'A4: no shortcuts past the person. Someone typed “Roll back now.” Sonny said no. A rollback is a button for a named person.'},
      {do: 'Press → : A5.', say: 'A5: tools. We took Sonny’s eyes away on purpose: the list of updates came back empty, and the contract said FAIL. You built the tool, and he saw the bad update again.'},
      {do: 'Press → : A6.', say: 'A6: you broke the shop yourself with the 💥 button. About a minute later Sonny opened an incident. And who decided about the rollback? You, with your own name.'},
      {do: 'Press → : the strip at the bottom.', say: 'Four of those pieces work in any AI project: intent.md, rules and tests, read first, approval. Today your team uses them for its own idea.'}
    ],
    learn: ['Day 5 in six steps: look first, intent, rules and the contract, guardrails, tools, a person decides.', 'intent.md, rules and tests, read first, approval: four pieces for any AI project.'],
    watch: ['Keep it light: this is a memory, not a second lesson. About 30 seconds per picture.', 'If your group had its own funny moment on Day 5, tell that one instead of the one on the slide.', 'Someone asks if their project needs a contract like Sonny: not the same code, but the same idea: rules you can check.'],
    terms: [['Read first', 'the app may look at the data but not change it'], ['OPEN', 'not known or not decided yet: write OPEN instead of guessing']],
    next: 'the same loop as Day 5, now with your own project.'
  }
},

{ // Slide 5
  title: "Same loop, now with your own project",
  kicker: "DAY 6 · SDLC",
  subtitle: "On Day 5 you went round the loop once with Sonny. Today and on Day 7 your team goes round it with its own idea.",
  type: "concept",
  visual: { sdlcLine: true, bot: 'point', place: 'beside' },
  tagline: "Plan and Design first, about 30 minutes. Then build in short rounds.",
  keyPoints: ["Same six phases as Day 5","Today: Plan, Design, Build","Plan + Design: about 30 minutes","Day 7: Test and show","Maintain: who owns it later?"],
  notes: "Keep it short: the six phases were on every slide of Day 5. Click through and say where the team will be today. Plan and Design together take about 30 minutes once the idea is chosen; don't let them take the whole morning. Then Build in short rounds: plan mode first, build a little, try it, adjust. Going back to change the plan during the build is normal. Day 7 is Test and showing it. Don't skip Maintain: asking who owns the app after this week is a good reality check.",
  teach: {
    time: '3 min',
    gist: 'The six SDLC phases from Day 5, now for the team project: Plan, Design and Build today; Test and show on Day 7.',
    script: [
      {do: 'Slide appears with the six dots from Day 5, none lit yet.', say: 'The six phases from Day 5. They were on every slide with Sonny. Day 5 was the practice round. Now the same loop, with your own idea.'},
      {do: 'Press → : Plan lights up.', say: 'Plan: today you choose one idea and write the intent.'},
      {do: 'Press → : Design.', say: 'Design: which data do you need, which rules, which risks?'},
      {do: 'Press → : Build.', say: 'Build: a first small slice that works from start to end, in short rounds.'},
      {do: 'Press → : Test.', say: 'Test: on Day 7. Does it follow your rules, also with wrong input?'},
      {do: 'Press → : Deploy.', say: 'Deploy: on Day 7 you show it working.'},
      {do: 'Press → : Maintain.', say: 'Maintain: who owns it after this week? A good question to ask now already.'},
      {ask: 'Plan and Design take about 30 minutes. Why not longer?', say: '(Answer: the plan changes anyway once you build. Build a little, learn, adjust: that is the loop.)'},
      {do: 'Point at the line at the bottom.', say: 'Plan and Design first, about 30 minutes. Then build in short rounds.'}
    ],
    learn: ['Same six phases as Day 5.', 'Today: Plan, Design and a first Build. Day 7: Test and show.', 'Plan and Design are short; changing the plan during the build is normal.'],
    watch: ['Do not teach the SDLC again: it was Day 5.', 'Teams that want to plan all morning: point at the 30 minutes.'],
    next: 'how today works: we facilitate, you decide and build.'
  }
},

/* ---------------------------------------------------------------------- */
/* DAY 6 — Today is yours                                                   */
/* ---------------------------------------------------------------------- */

{ // Slide 6
  title: "Today is yours",
  kicker: "DAY 6 · HOW TODAY WORKS",
  subtitle: "We facilitate. You decide and build.",
  type: "context",
  layout: "compare",
  visual: { stepThrough: true },
  columns: [
    { title: "The team", items: [
      "chooses the problem and the scope",
      "decides who does what",
      "builds and tests",
      "owns the decisions"
    ] },
    { title: "We, the facilitators", items: [
      "ask questions",
      "keep time and the rhythm",
      "unblock when you are stuck",
      "do not build it for you"
    ] }
  ],
  tagline: "If you ask us what to do, we will ask you a question back.",
  keyPoints: ["Teams decide, we facilitate","We ask, we don't answer for them","We keep time","We unblock, we don't build"],
  notes: "Make the roles explicit. Facilitating means helping the team think and decide, not taking decisions for them. When a team asks 'what should we do?', answer with a question: 'what problem are you solving?', 'how would you know it works?'. Step in when a team is truly stuck or out of time, not to steer them towards your own idea. Ask for honesty and openness in the team, and share the work evenly."
},

{ // Slide 7
  title: "What you can build with",
  kicker: "DAY 6 · YOUR TOOLBOX",
  subtitle: "Everything from the last days is now a tool for your team.",
  type: "concept",
  visual: { stepThrough: true, toolWall: [
    { day: 'Day 1', pic: { kind: 'term', lines: ['$ claude', '> explore first, then plan', '● plan ready · approve?', '✓ tests pass'] } },
    { day: 'Day 1', pic: { kind: 'file', name: 'CLAUDE.md', lines: ['# How this project works', 'Run tests: npm test', '# Rules', 'Never push to main'] } },
    { day: 'Day 2', pic: { kind: 'tree', lines: [[0, '.claude/'], [1, 'skills/'], [2, 'show-me/'], [3, 'SKILL.md'], [2, 'verify-this/']] } },
    { day: 'Day 2', pic: { kind: 'bots', tags: ['plan', 'build', 'check'] } },
    { day: 'Day 3', pic: { kind: 'img', src: 'assets/workshop-3/01-n8n.jpeg', pos: '40% 32%', zoom: 2.6, origin: '42% 33%' } },
    { day: 'Day 4', pic: { kind: 'code', lines: ['import { query } from', "  '@anthropic-ai/claude-agent-sdk'", 'for await (const m of query({', '  prompt, options })) { … }'] } },
    { day: 'Day 4', pic: { kind: 'plug', sources: ['tickets', 'repo', 'files'] } },
    { day: 'Day 5', pic: { kind: 'sdlc' } }
  ] },
  cards: [
    { title: "Claude Code", body: "Builds and changes your app, with the working method." },
    { title: "CLAUDE.md", body: "Tells Claude Code how your project works." },
    { title: "Skills", body: "A method you repeat, written down once." },
    { title: "Agents", body: "Helpers that each do one job." },
    { title: "n8n", body: "Workflows with AI as one of the steps." },
    { title: "Agent SDK", body: "Your own agent, in code." },
    { title: "MCP", body: "Approved connections to tools and data." },
    { title: "SDLC", body: "Plan to Maintain, a person approves." }
  ],
  keyPoints: ["Everything learned = a tool now","One tile per tool, with its day","Claude Code builds the app","n8n or the Agent SDK runs it","Teams pick what fits"],
  notes: "A quick reminder of what they have: press → for each tile and say one sentence. Claude Code builds the app with the working method (explore, plan, create, test, human review, handoff); CLAUDE.md tells it how the project works and what it may never do; skills are a method written down once; agents are helpers that each do one job; n8n runs workflows with AI as a step; the Agent SDK is your own agent in code; MCP gives approved connections to tools and data; the SDLC with Sonny was Day 5. Say it out loud: a good team project uses the tools that fit the problem. A simple app built with Claude Code is fine; so is an n8n workflow with a Claude step. Using everything is not the goal."
},

/* ---------------------------------------------------------------------- */
/* DAY 6 — Choosing one idea                                                */
/* ---------------------------------------------------------------------- */

{ // Slide 8
  title: "Let's brainstorm ideas!",
  kicker: "DAY 6 · CHOOSING AN IDEA",
  subtitle: "",
  type: "concept",
  visual: { bigWord: true, bot: 'think', place: 'bigword', highlight: [{ in: 'title', text: 'ideas!', tone: 'orange' }] },
  keyPoints: ["One big line, no content","Energy up: now the team starts","Everyone brings ideas from their own work","Next slide: how we choose"],
  notes: "A moment to switch gears: the recap is over, now the teams start. Leave the slide up and ask everyone to think of one or two ideas from their own work: what annoys you, what costs time, what goes wrong. Don't judge ideas yet: the next slide shows how the team scores them.",
  teach: {
    time: '1 min',
    gist: 'Switch from recap to team work: everyone starts thinking of ideas from their own work.',
    script: [
      {do: 'Slide appears: AetherBOT and one big line.', say: "Enough looking back. Now it is your turn. Let's brainstorm ideas!"},
      {do: 'Wait a moment, let the room think.', say: 'Think of your own work. What annoys you? What costs you time every week? What goes wrong too often?'},
      {ask: 'Who already has an idea? Just say it in one sentence.', say: '(Take two or three ideas. Do not judge them yet: every idea is welcome at this point.)'},
      {do: 'Press → to the five pillars.', say: 'Many ideas is good. But you build only one. So how do you choose? With five pillars.'}
    ],
    learn: ['Ideas come from your own work.', 'Every idea counts at this point; choosing comes next.'],
    watch: ['Do not discuss or score ideas here: that is the next slide and the assignment.', 'Someone says "I have no idea": ask what took them too long last week.'],
    next: 'the five pillars every idea is scored on.'
  }
},

{ // Slide 9
  title: "Five pillars for choosing an idea",
  kicker: "DAY 6 · CHOOSING AN IDEA",
  subtitle: "Every idea gets the same questions. The idea with the highest total score wins.",
  type: "concept",
  visual: { stepThrough: '.temple > .card, .temple-base, .slide-main > .tagline', temple: { roof: 'Your idea', scores: [4, 5, 3, 4, 4], base: 'Score each pillar from 1 to 5 and add them up' } },
  cards: [
    { title: "Interest", body: "Do we want to build this?\nWill it keep us going for two days?" },
    { title: "Gain", body: "What do we gain: time, quality, fewer mistakes?\nHow big is that gain?" },
    { title: "Problem", body: "How real is the problem?\nWho has it, and how often?" },
    { title: "Team", body: "How much does it help our team?\nIs another team already building it?" },
    { title: "Security", body: "How easy is it to make safe?\nWhich data, and who has to approve?" }
  ],
  tagline: "You build the idea with the highest total, not the one that wins on just one pillar.",
  keyPoints: ["Five pillars, two questions each","Score 1–5 per pillar","Security: 5 = easy to make safe","Add up: highest total out of 25 wins","Strong on all five beats great on one"],
  notes: "Press → for each pillar and ask the room its questions. Interest and gain go together: an idea the team cares about but that gains nothing is a hobby, and a big gain nobody wants to build won't get finished in two days. Problem is about how real it is: name who has it and how often. Team includes looking outside: do they know what the other teams are building? Security is about effort: the easier it is to make safe, the higher the score, because an idea that touches production data will eat most of the two days. Then press → for the base: every idea gets a score from 1 to 5 on each pillar, the scores are added up, and the idea with the highest total out of 25 is the one the team builds. The example (4 + 5 + 3 + 4 + 4 = 20) is made up; the team scores its own ideas in the next assignment.",
  teach: {
    time: '5 min',
    gist: 'Five pillars, each with its own questions. Every idea is scored 1 to 5 per pillar; the highest total wins.',
    script: [
      {do: 'Slide appears with only the roof: Your idea.', say: 'This is your idea. It needs five pillars to stand on. If one is weak, the whole thing wobbles.'},
      {do: 'Press → : Interest.', say: 'Interest. Do we want to build this? Will it keep us going for two whole days?'},
      {do: 'Press → : Gain.', say: 'Gain. What do we win: time, quality, fewer mistakes? And how much?'},
      {do: 'Press → : Problem.', say: 'Problem. Is it a real problem? Who has it, and how often?'},
      {do: 'Press → : Team.', say: 'Team. Does it help our own team? And is another team maybe building the same thing?'},
      {do: 'Press → : Security.', say: 'Security. How easy is it to make this safe? Which data does it touch, and who has to say yes?'},
      {ask: 'For security, does a 5 mean easy or hard?', say: '(Answer: easy to make safe. All five pillars count the same way: higher is better.)'},
      {do: 'Press → : the base with the scores.', say: 'We score every idea from 1 to 5 on each pillar and add them up. This made-up idea gets 20 out of 25.'},
      {do: 'Press → : the line at the bottom.', say: 'You build the idea with the highest total, not the one that wins on just one pillar.'}
    ],
    learn: ['Every idea gets the same five pillars and questions.', 'Score 1 to 5 per pillar; for security 5 means easy to make safe.', 'Add the scores up: the highest total out of 25 is the idea you build.'],
    watch: ['Do not let teams score yet: that is the assignment on the next slide.', 'Someone asks what to do with a tie: look at the top two together, maybe they can become one idea.'],
    terms: [['Pillar', 'one of the five things an idea is scored on'], ['Total', 'the five scores added up, at most 25']],
    next: 'the assignment: brainstorm and choose your idea.'
  }
},

{ // Slide 10
  title: "Assignment: Brainstorm and choose your idea",
  kicker: "DAY 6 · TEAM ASSIGNMENT 1",
  subtitle: "Collect ideas from your own work, score them on the five pillars, and choose one.",
  type: "practice",
  layout: "exercise",
  stepsHeading: "Steps:",
  steps: [
    "Everyone names one or two ideas from their own work. Write them all down.",
    "Put ideas that look alike together.",
    { text: "As a team, score every idea from 1 to 5 on the five pillars.", note: "The facilitator helps you put the numbers in the score matrix (next slide)." },
    "Add up the scores. Look at the top two: can they become one stronger idea?",
    "Choose the idea with the highest total and write down in one sentence why."
  ],
  expected: "One chosen idea with the highest total, its scores, and one sentence on why the team chose it.",
  check: "Can every team member explain why this idea won?",
  prompt: "Here are our ideas: [list them]. For each idea, ask us one question per pillar: interest, gain, problem, team and security. Help us score each pillar from 1 to 5 (for security, 5 means easy to make safe). Then show all scores and totals in one table and tell us which ideas could be combined. Don't choose for us.",
  keyPoints: ["Ideas from your own work","Score 1–5 on five pillars","Security: 5 = easy to make safe","Add up: highest total wins","Combine the top two?","One idea, one reason"],
  notes: "Type the minutes on the timer. At step 3, go to the next slide (the score matrix) and fill it in with the team: type the ideas in the rows, click a score per pillar, the total adds itself up. Teams often start with everyone defending their own idea; the scores make the discussion about the idea, not the person. Say clearly that all pillars count the same way: higher is better, so for security a 5 means easy to make safe. The highest total out of 25 wins. Before they decide, push on combining: two ideas close to the top often make one stronger idea. The Example prompt lets Claude ask the pillar questions, but the team scores and chooses."
},

/* ---------------------------------------------------------------------- */
/* DAY 6 — The questions every team has to answer                          */
/* ---------------------------------------------------------------------- */

{ // Slide 11
  title: "Score matrix: your ideas side by side",
  kicker: "DAY 6 · TEAM ASSIGNMENT 1 · SCORE MATRIX",
  banner: "Picking a team project",
  subtitle: "Type your ideas, click a score from 1 to 5 per pillar. The total adds itself up; the highest total wins.",
  type: "practice",
  visual: { scoreMatrix: { ideas: 4, max: 6, min: 2, hint: 'Click a number to score, click it again to undo. For security, 5 = easy to make safe.' } },
  cards: [
    { title: "Interest", body: "Do we want to build this?" },
    { title: "Gain", body: "What do we gain, and how much?" },
    { title: "Problem", body: "How real is the problem?" },
    { title: "Team", body: "How much does it help our team?" },
    { title: "Security", body: "How easy is it to make safe?" }
  ],
  keyPoints: ["One row per idea, usually 3 or 4", "Click 1–5 per pillar", "Total out of 25 adds itself up", "🏆 = highest total with all five scored", "Close totals? Try to combine them"],
  notes: "Fill this in live with the team while sharing your screen. Type each idea in a row (start with 4 rows; + Add idea goes up to 6, − Remove last down to 2). For every idea, ask the pillar question in the column header and let the team agree on one number; click it (click again to undo). The total updates by itself, and the row with the highest total, once all five pillars are scored, turns orange with a 🏆. The scores stay in this browser, also after a refresh; Clear all (click twice) empties the matrix for the next team. Push on combining when two totals are close.",
  teach: {
    time: 'during the assignment',
    gist: 'The score matrix: the team scores every idea per pillar, the facilitator clicks the numbers in, and the highest total wins.',
    script: [
      {do: 'Open this slide at step 3 of the assignment. Share your screen.', say: 'Let us put your ideas side by side. Name them, and I type them in.'},
      {do: 'Type the ideas in the rows (3 or 4).', say: 'One row per idea. Short names are enough.'},
      {do: 'Per idea, read the question at the top of each column.', say: 'Interest: do we want to build this? Give me one number from 1 to 5.', ask: 'Do we all agree on that number?'},
      {do: 'Click the numbers in; the total updates.', say: 'Remember: for security, 5 means easy to make safe. Higher is always better.'},
      {do: 'When every idea is scored, point at the 🏆 row.', say: 'This one has the highest total. Before we choose: are the top two close? Could they become one stronger idea?'},
      {ask: 'Why do we add up all five instead of picking the idea with the best interest score?', say: '(Answer: an idea needs to stand on all five pillars. Great on one and weak on the rest will not get finished in two days.)'}
    ],
    learn: ['Every idea gets a score per pillar; the total decides.', 'The team scores; the facilitator only types and clicks.'],
    watch: ['Let the team agree on one number per pillar; do not average everyone’s numbers.', 'The scores stay in this browser. Before the next team, click Clear all twice.', 'A tie: look at the two ideas together, maybe they become one.'],
    terms: [['Score matrix', 'the table with ideas as rows and the five pillars as columns'], ['Total', 'the five scores added up, at most 25']],
    next: 'the briefing before you begin.'
  }
},

{ // Slide 12
  title: "Briefing before you begin",
  kicker: "DAY 6 · QUESTIONS TO ANSWER",
  subtitle: "Five things your team talks through before anyone builds. Tick off what you can answer.",
  type: "concept",
  visual: { stepThrough: '.brief-grid > .card, .slide-main > .tagline',
    brief: [
      { emoji: '🎯' },
      { emoji: '🗄️' },
      { emoji: '👥' },
      { emoji: '🗺️' },
      { emoji: '🔒', more: 'More on the next slides →' }
    ] },
  cards: [
    { title: "The problem", body: "Who is it for? One real user or team.\nWhat problem, in one sentence?\nWhy AI, and not a form or a script?\nWhen is it successful? Write it so you can check it." },
    { title: "The data", body: "Where does the real information live? That is your source of truth.\nWhich data do you need: repos, tickets, docs?\nHow do you connect: MCP or another approved way?\nRead-only first." },
    { title: "Roles: who does what", body: "Who is product owner, who builds, who tests, who presents?\nWho builds which part?\nOne repo: who merges?" },
    { title: "The plan", body: "What is in for Day 7, and what is not?\nClaude Code, n8n, or both?\nWhat is the first small slice that works end to end?" },
    { title: "Security", body: "Which data goes in, and is that allowed?\nWhere does a person approve?\nWhat is still OPEN?" }
  ],
  tagline: "Write the answers down: they become your team canvas, your plan and your CLAUDE.md.",
  keyPoints: ["Five topics: problem, data, roles, plan, security", "Source of truth: where the real data lives", "Who does what, who merges", "Small first slice", "Security from the start"],
  notes: "This slide replaces the three separate question slides (the problem, the source of truth, the team and the plan): slides 13 and 14 are hidden by default and can be shown again with the eye in the Overview or H. Press → for each topic. The questions can be ticked off by clicking them, which works well with a team on screen. Push hardest on two: 'Why AI?' (sometimes a plain form or an n8n workflow without AI is better, and that is a good outcome) and scope (teams plan far more than fits in two days). 'When is it successful?' becomes the definition of done for Day 7. Security only gets three questions here; the next slides go deeper.",
  teach: {
    time: '6 min',
    gist: 'Five topics every team talks through before building: the problem, the data, roles, the plan and security.',
    script: [
      {do: 'Slide appears: title only.', say: 'You have an idea. Before anyone opens Claude Code, your team talks through five things.'},
      {do: 'Press → : 1 The problem.', say: 'Who is it for, which problem, why AI, and when is it a success? Write the last one so someone can check it.'},
      {ask: 'Why ask “why AI?” at all?', say: '(Answer: sometimes a plain form or a workflow without AI does the job better. Then that is the better choice.)'},
      {do: 'Press → : 2 The data.', say: 'Where does the real information live? That is your source of truth. Start by only reading it, like Sonny on Day 5.'},
      {do: 'Press → : 3 Roles.', say: 'Who does what? And with one repo: who merges, so you do not overwrite each other.'},
      {do: 'Press → : 4 The plan.', say: 'What is in for Day 7 and what is not? And what is the first small piece that works from start to end?'},
      {do: 'Press → : 5 Security.', say: 'Three questions now. The next slides go deeper.'},
      {do: 'Press → : the line at the bottom.', say: 'Write the answers down. They become your team canvas, your plan and your CLAUDE.md.'}
    ],
    learn: ['Talk through the problem, the data, roles, the plan and security before you build.', 'The source of truth is where the real information lives.'],
    watch: ['Do not let teams answer now: that is the assignment after the security slides.', 'Click a question to tick it; click again to untick.'],
    terms: [['Source of truth', 'the place where the real, up-to-date information lives'], ['First slice', 'the smallest version that works from start to end']],
    next: 'why security is a requirement, not a check at the end.'
  }
},

{ // Slide 13
  title: "Input: start from the source of truth",
  kicker: "DAY 6 · DESIGN · INPUT",
  subtitle: "Your app is only as good as the data it gets.",
  type: "concept",
  hidden: true,
  layout: "steps",
  visual: { stepKeys: true, bot: 'point', place: 'beside' },
  items: [
    { label: "Source of truth", caption: "Where does the real information live?" },
    { label: "Connect to the tools", caption: "MCP or another approved connection." },
    { label: "Get the data", caption: "Repos and their history, tickets, documentation." },
    { label: "Read-only first", caption: "Fetch and read. Changing things comes later, with approval." }
  ],
  tagline: "Start by reading. Writing to a real system needs a person's approval.",
  keyPoints: ["Name the source of truth","Connect with approved tools","Repos, history, tickets","Read-only first"],
  notes: "Design starts with the input. Ask every team: where does the real information live? Then: how do we connect to it (MCP or another approved connection), and which data do we actually need? Repos and their history and the tickets are usually the richest sources. Start read-only, exactly like fetching tickets last session: an app that only reads is much easier to make safe, and it is enough for a first slice."
},

{ // Slide 14
  title: "Before you build: the team and the plan",
  kicker: "DAY 6 · QUESTIONS TO ANSWER",
  subtitle: "The questions you need answers on as a team.",
  type: "concept",
  hidden: true,
  visual: { checklist: 0, bot: 'point', place: 'left' },
  cards: [
    { title: "Answer as a team", body: "Who does what: product owner, builders, tester, presenter?\nWhat is in for Day 7, and what is not?\nWhich data do we use, and are we allowed to?\nClaude Code, n8n, or both?\nWhere does a person approve or decide?\nHow do we work together: one repo, who merges?\nWhat is our first small slice that works?" }
  ],
  tagline: "Write the answers down. They become your CLAUDE.md and your plan.",
  keyPoints: ["Roles: who owns what","Scope: in and out for Day 7","Data: allowed or not","Tools: Claude Code, n8n, both","Human checkpoint","Way of working: repo and merging","First small slice"],
  notes: "The practical questions for building together. Two often cause trouble: scope (teams plan far more than fits in two days; push for a small first slice that works end to end) and working together in one codebase (agree who merges and how, or they will overwrite each other). The answers aren't paperwork: they go straight into CLAUDE.md and the team plan, exactly like the AetherBOT exercise on Day 2."
},

/* ---------------------------------------------------------------------- */
/* DAY 6 — Security                                                         */
/* ---------------------------------------------------------------------- */

{ // Slide 15
  title: "Security is a requirement",
  kicker: "DAY 6 · SECURITY",
  subtitle: "Not a check at the end, but a question from the start.",
  type: "concept",
  layout: "compare",
  visual: { stepThrough: true },
  columns: [
    { title: "Security at the end", items: [
      "found when it's almost done",
      "means rebuilding",
      "tries things on production",
      "becomes a no"
    ] },
    { title: "Security from the start", items: [
      "shapes the design",
      "costs a question, not a rebuild",
      "tries things in a sandbox first",
      "becomes a yes, if…"
    ] }
  ],
  tagline: "A security question now is cheaper than a security problem on Day 7.",
  keyPoints: ["Security is part of the design","Early question = cheap","Sandbox first, not production","Production needs permission","Aim for 'yes, if…'"],
  notes: "Frame security as part of good software, not as someone else's veto. There is a security specialist in the room today: introduce them here as a resource for every team. Their questions will feel like friction at times; that's legitimate, because a question answered during design costs minutes and the same problem found on Day 7 costs the demo. Make the difference between environments clear: a sandbox is easier to get access to and the place to try things; changes on production (and pre-production) need permission from legal and management. The goal is a 'yes, if…' for every team: what has to be true for this to be safe enough?"
},

{ // Slide 16
  title: "Questions security will ask",
  kicker: "DAY 6 · SECURITY",
  subtitle: "Discuss each question in your team. Have an answer ready, or write it down as OPEN.",
  type: "concept",
  visual: { carousel: { foot: '💬 Discuss this in your team' } },
  cards: [
    { title: "Data", body: "Which data goes in?\nIs it personal or confidential?\nWhere does it go, and is that allowed?" },
    { title: "Access and secrets", body: "Who can use the app?\nWhere are API keys and passwords kept?\nNever in the code or the repo." },
    { title: "The AI model", body: "What do you send to the model?\nCan input trick it (prompt injection)?\nWhat if the answer is wrong?" },
    { title: "Actions", body: "What can the app change on its own?\nOn production: notify, don't act.\nWhere does a person approve?" },
    { title: "Traces", body: "Can you see afterwards what happened?\nLogs, n8n executions, git history." }
  ],
  tagline: "Not sure? Write it down as OPEN and ask. That's a good answer too.",
  keyPoints: ["Five numbered questions, one at a time", "Data: what, where, allowed?", "Secrets never in the repo", "Model: input, output, injection", "Actions: notify, don't act on production", "Traces: can we check afterwards?"],
  notes: "One question card at a time in the middle, numbered 1 to 5; → slides to the next one, ← back (or click a side card or a number). After card 5, → goes to the next slide. These questions are for the teams to discuss among themselves, not for you to answer: give each card a moment and let the teams talk. Data and secrets are the classics. AI adds its own: whatever goes to the model leaves your laptop; text from users or documents can contain instructions (prompt injection); and the model can be wrong with confidence. Actions ties back to Day 5: on production the app notifies, a person decides. Traces: n8n executions and git history already give a lot. OPEN is an honest answer.",
  teach: {
    time: '6 min',
    gist: 'Five security questions, one at a time, for the teams to discuss among themselves.',
    script: [
      {do: 'Slide appears with card 1 (Data) in the middle.', say: 'Five questions a security specialist will ask about your app. Not for me to answer: for your team to discuss.'},
      {do: 'Card 1: Data. Give the teams a moment.', say: 'Which data goes in, is it personal, and where does it go?'},
      {do: 'Press → : card 2, Access and secrets.', say: 'Who can use it, and where do the keys live? Never in the repo.'},
      {do: 'Press → : card 3, The AI model.', say: 'Everything you send to the model leaves your laptop. And text from a user can contain instructions.', ask: 'What happens in your app if the model is wrong?'},
      {do: 'Press → : card 4, Actions.', say: 'Like Sonny: on production the app notifies, and a person decides.'},
      {do: 'Press → : card 5, Traces.', say: 'Can you see afterwards what happened? Logs, n8n executions, git history.'},
      {do: 'Point at the line at the bottom.', say: 'Not sure? Write OPEN and ask. That is a good answer too.'}
    ],
    learn: ['Five security questions: data, access and secrets, the AI model, actions, traces.', 'OPEN is an honest answer; a guess is not.'],
    watch: ['Let the teams talk; do not answer for them.', '→ after card 5 goes to the next slide; ← goes back one card.'],
    terms: [['Prompt injection', 'text that tries to give the AI new instructions'], ['OPEN', 'not known or not decided yet']],
    next: 'a human in the loop: AI notices, a person decides.'
  }
},

{ // Slide 17
  title: "A human in the loop",
  kicker: "DAY 6 · SECURITY",
  subtitle: "Fixed rules miss things. AI reasoning catches more, but it doesn't act alone.",
  type: "concept",
  layout: "compare",
  visual: { handover: 'AI notifies. A person decides.' },
  columns: [
    { title: "AI does", items: [
      "watches and notices",
      "reasons about what it sees",
      "suggests what to do",
      "notifies a person"
    ] },
    { title: "A person does", items: [
      "checks the suggestion",
      "decides",
      "acts on production",
      "owns the result"
    ] }
  ],
  keyPoints: ["Rules alone miss things","AI reasons, suggests, notifies","A person decides and acts","Control and compliance"],
  notes: "Many ideas involve watching something: errors, traffic, incidents. Fixed rules (alert when X > Y) are a good start but miss what nobody wrote a rule for; AI reasoning can notice more. That makes the human checkpoint more important, not less: the AI notices, explains and suggests, and a person decides and acts, certainly on production. This keeps control where it belongs and keeps the app within the rules the organisation has to follow. Ask every team where this line is in their app."
},

{ // Slide 18
  title: "Assignment: Your plan for the next two days",
  kicker: "DAY 6 · TEAM ASSIGNMENT 2",
  subtitle: "How will you build your idea in two days? Answer the briefing, cut it down to an MVP, and split the work.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your two days", body: "today: plan, set up, first slice\nnext session, start: finish and test\nnext session, end: demo and presentation\nalong the way: let Claude build your presentation with you" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Answer the briefing together: problem, data, roles, plan and security. Write OPEN where you don't know yet.",
    "Cut it down to an MVP: the smallest version that shows your idea works, from input to result.",
    "Split the MVP into pieces. Give every piece an owner, and agree who tests and who merges.",
    "Plan the two days: what works by the end of today, what you finish and test next session.",
    { text: "Ask the security specialist to look at your data, secrets and actions.", note: "The facilitator plans a short visit for every team." },
    "Ask Claude Code to write it all down: notes/team-canvas.md and notes/plan.md."
  ],
  expected: "A canvas and a two-day plan your whole team agrees on: the MVP, who builds what, what works by tonight, and the security questions answered or OPEN.",
  prompt: "Interview our team about the app we want to build in two days. Ask one question at a time about the user, the problem, why AI, when it is successful, the source of truth, roles, scope, tools, where a person approves, and security. Then help us cut it down to an MVP, split it into pieces with an owner each, and plan what works by the end of today and what we finish next session. Write notes/team-canvas.md and notes/plan.md, and mark anything we didn't decide as OPEN.",
  keyPoints: ["Type the minutes on the timer", "Briefing first", "MVP: smallest version that works", "Every piece has an owner", "Plan the two days", "Security visit per team"],
  notes: "Type the minutes on the timer (about 30 minutes). This assignment is about how the team will build its idea in two days: not the idea itself (chosen at slide 10) but the route. Walk from team to team and ask the briefing questions instead of giving answers. The hardest step is the MVP cut: teams plan far more than fits; ask 'what is the smallest thing you can show working next session?'. Check that every piece has an owner and that someone tests and merges. Plan the security specialist's time: every team gets a short visit. The Example prompt lets Claude interview the team and write both files; the decisions stay theirs."
},

{ // Slide 19
  title: "Day 7: your presentation",
  kicker: "DAY 6 · BEFORE YOU BUILD · THE PRESENTATION",
  subtitle: "Next session every team shows what it built. Start the presentation today, while you build.",
  type: "context",
  visual: { stepThrough: '.pitch-grid > .card, .slide-main > .tagline',
    pitch: { heroEmoji: '🤖', hero: 'Let Claude help you build your presentation while you build your app, not the night before.',
      cards: [
        { emoji: '🎬' },
        { emoji: '🏛️', chips: ['Interest', 'Gain', 'Problem', 'Team', 'Security'] },
        { emoji: '✨' },
        { emoji: '💻' },
        { emoji: '🙌' },
        { emoji: '⏱️' }
      ] } },
  cards: [
    { title: "A live demo of your MVP", body: "Show it working: your input, the AI step, the result." },
    { title: "Your story along the five pillars", body: "Why this idea? Tell it with the same pillars you used to choose it." },
    { title: "Make it interactive", body: "More than slides: a video, a website, a live poll, something people can try." },
    { title: "Made with Claude Code", body: "Your presentation is a web page Claude Code builds with you, and keeps up to date as the app grows." },
    { title: "Everybody pitches in", body: "No one hides in the back row: every team member has a part on stage." },
    { title: "7–10 minutes", body: "Short and to the point. Practise once." }
  ],
  tagline: "Tell why it matters, not only what it does.",
  keyPoints: ["Claude builds the presentation with you, during the hackathon", "Live demo of the MVP", "Story along the five pillars", "Interactive: video, website, poll…", "Made with Claude Code", "Everybody pitches in", "7–10 minutes"],
  notes: "Show this before the teams start building, so the presentation grows with the app instead of being made the night before. The main message is at the top: ask Claude Code to keep a presentation (a simple web page) up to date while you build, for example after every round: 'add what we just built to our presentation'. Requirements: a live demo of the MVP; the story told along the five pillars; something interactive (a short video, a website, a live poll, something the room can try); made with Claude Code; everybody pitches in, so no high-school culture where one person talks and the rest stand behind; 7–10 minutes.",
  teach: {
    time: '4 min',
    gist: 'What the Day 7 presentation needs, and the main message: let Claude build it with you while you build.',
    script: [
      {do: 'Slide appears with the orange line at the top.', say: 'Before you build: next session you present. And the trick is this: let Claude help you build the presentation while you build the app. Not the night before.'},
      {do: 'Press → : A live demo of your MVP.', say: 'We want to see it work. Your input, the AI step, the result.'},
      {do: 'Press → : the five pillars.', say: 'Why this idea? Tell it with the same five pillars you used to choose it.'},
      {do: 'Press → : Make it interactive.', say: 'More than slides. A short video, a website, a poll, something we can try.'},
      {do: 'Press → : Made with Claude Code.', say: 'Your presentation is a web page Claude Code builds with you. After every round: add what we just built.'},
      {do: 'Press → : Everybody pitches in.', say: 'No high-school culture where one person talks and the rest stand behind. Everyone has a part.', ask: 'Who in your team presents which part?'},
      {do: 'Press → : 7–10 minutes.', say: 'Short and to the point. Practise once.'},
      {do: 'Press → : the line at the bottom.', say: 'Tell us why it matters, not only what it does.'}
    ],
    learn: ['The presentation grows with the app: Claude Code builds it with you during the hackathon.', 'A live demo, the five pillars, something interactive, and everyone takes part.'],
    watch: ['Keep it light: this is a preview, the teams build it later.', 'Someone asks if PowerPoint is allowed: the point is that Claude Code builds it with you; a web page is easiest to keep up to date.'],
    terms: [['MVP', 'the smallest version that shows your idea works'], ['Interactive', 'something the room can watch, click or try, not only read']],
    next: 'a short break, then you build your first slice.'
  }
},

{ // Slide 20
  title: "Short break",
  kicker: "DAY 6 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "Continuing with: building your first slice." }
  ],
  keyPoints: ["Say the return time","Press ▶ Start on the timer","Check in with any stuck team"],
  notes: "Say the actual clock time you'll resume. Use the break to check in briefly with a team that looked stuck or was still arguing about scope."
},

/* ---------------------------------------------------------------------- */
/* DAY 6 — Build                                                            */
/* ---------------------------------------------------------------------- */

{ // Slide 21
  title: "Check-in",
  kicker: "DAY 6 · CHECK-IN",
  subtitle: "Every team, two minutes. Short answers.",
  type: "review",
  visual: { reveal: 'click', bot: 'peek', place: 'slot', noReact: true },
  cards: [
    { title: "What works now?", body: "" },
    { title: "What's next?", body: "" },
    { title: "What's blocking you?", body: "" },
    { title: "Which security question is still OPEN?", body: "" }
  ],
  tagline: "Blocked? Say it now, not at the end of the day.",
  keyPoints: ["Two minutes per team","Works, next, blocked, OPEN","Solve blockers after, not during","Repeat during the day"],
  notes: "Use this as a rhythm: run it once before lunch and once mid-afternoon. Two minutes per team, short answers. Don't solve problems during the round: note the blockers and go to those teams afterwards. The OPEN security question keeps security visible and gives the security specialist a clear list to work through."
},

/* ---------------------------------------------------------------------- */
/* DAY 6 — Closing                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 22
  title: "Ready for Day 7?",
  kicker: "DAY 6 · CLOSING",
  subtitle: "Next session your team shows a working AI app.",
  type: "recap",
  visual: { checklist: 0, bot: 'happy', place: 'left' },
  cards: [
    { title: "By the end of today", body: "the canvas is in the repo\nyou know when your app is successful\nthe first slice works\nCLAUDE.md and settings.json are in place\nsecurity questions are answered or OPEN\nyou have a plan for the presentation\nyou know what to build at the start of the next session" }
  ],
  tagline: "Next session: finish, test, and show what you built.",
  keyPoints: ["Seven checks per team","Missing one? Plan it first thing next session","Day 7 = finish, test, show"],
  notes: "Go through the list with each team. Anything that isn't ticked becomes the first task for the start of the next session. Tell them what Day 7 looks like: finish, test, and present a working app."
},

{ // Slide 23
  title: "What did you learn?",
  kicker: "DAY 6 · CLOSING",
  subtitle: "Complete these statements.",
  type: "recap",
  tagline: "Complete each statement for yourself.",
  visual: { sentences: true, quietTimer: 3 },
  cards: [
    { title: "Our app helps…", body: "" },
    { title: "Working as a team, I learned…", body: "" },
    { title: "The security question that changed our plan was…", body: "" },
    { title: "Next session we first…", body: "" }
  ],
  keyPoints: ["Three quiet minutes","Then a few answers aloud","Security answers are worth sharing"],
  notes: "Give three quiet minutes, then collect a few answers. Ask at least one team which security question changed their plan: it shows the room that the security questions made the work better, not slower."
}

];
