/* ==========================================================================
   Aetherlink x Worldline — Day 2 classroom deck (levels, skills, Bobby). Started 2026-11-18 as a copy of slides 83-189 of slides.js; this is now the Day 2 deck
   173 slides, authored from CURRICULUM.md (2026-09-15 revision) plus its
   "Resolved alignment decisions" section, which overrides three points in
   the base document: Assignment 11's AI feedback is required and needs no
   API credentials (folded into Slide 64 + new Slide 65); Slide 27 carries
   the three-tier SDLC / working-method / agent-loop framing; Part 5's
   Jira/GitLab/Confluence MCP connections are the real, primary path.
   One slide = one object in order. See README.md "How to edit a slide"
   before changing anything here.

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
   TEACHING DAY 2 — Levels, skills, agents and the Aether Arcade
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* DAY 2 — Welcome and recap                                              */
/* ---------------------------------------------------------------------- */

{ // Slide 83
  title: "Welcome to Day 2",
  kicker: "AETHERLINK × WORLDLINE · DAY 2",
  subtitle: "",
  type: "context",
  visual: { opener: "welcome", bot: "wave", place: "beside" },
  keyPoints: ["Short re-welcome", "No agenda yet: the game shows it in a moment", "Straight on to Show your game"],
  notes: "Short re-welcome. Don't explain the day yet: the next slide shows a level 4 Snake, and the levels slide after the recap shows the whole route."
},

{ // Slide 84
  title: "Show your game",
  kicker: "DAY 2 · WARM-UP",
  subtitle: "Show, tell, ask: one minute each. This is where your Snake is going today.",
  type: "context",
  visual: { anatomy: { src: "assets/examples/snake-advanced.html", poster: "assets/examples/snake-level-4.svg", title: "Snake, level 4: obstacles, more food, a longer and faster snake, a stopwatch", caption: "" } },
  keyPoints: ["The game on screen plays itself: let it run", "Then everyone: show, tell, ask", "One minute each", "Questions on the flipchart", "This is today's goal"],
  notes: "The board on the slide plays itself (autopilot). Click it and use the arrow keys to play yourself; click outside the game to get the slide keys back. Say: This is level 4. By tonight your Snake has levels like this, and you'll have built them three ways: with prompts, with skills, and with one command.\n\nThen everyone shows their Snake from last session, one minute each. Show: play it for a few seconds. Tell: one thing that went well, one thing that went wrong. Ask: what do you want to know after seeing the others? Online participants share their screen. Collect the questions on the flipchart: the recap answers them."
},

{ // Slide 85
  title: "Quiz: what do you remember?",
  kicker: "DAY 2 · QUIZ",
  subtitle: "Last session in five questions. Answer out loud first, then click to see the answer.",
  type: "quiz",
  visual: { reveal: "click", answers: true, bot: "peek", place: "slot", noReact: true },
  cards: [
    { title: "Why start a task in plan mode?", body: "Claude can only read and ask. You see the plan and approve it before anything changes." },
    { title: "What does CLAUDE.md do, and what does settings.json do?", body: "CLAUDE.md: instructions Claude tries to follow. settings.json: permissions it can't ignore (allow, ask, deny)." },
    { title: "What does a hook do that an instruction or a permission can't?", body: "It always runs, at a fixed moment. Like npm test after every edit." },
    { title: "Esc Esc or a commit: when do you use which?", body: "Esc Esc undoes the last few minutes. A commit is a save point that lasts." },
    { title: "What are the six phases of the working method?", body: "Plan → Design → Build → Test → Deploy → Maintain" }
  ],
  keyPoints: ["From memory, no looking back", "Let the room answer before you click", "Six phases shaky? Show slide 41 again"],
  notes: "Ask each question and let the room answer before you click: from memory, not open-book. Click a card (or →) to show its answer. Plan mode: Claude can't change files, so you see the plan first. CLAUDE.md asks, settings.json enforces. A hook makes something always happen; a permission only decides what's allowed. Esc Esc for the last few minutes, a commit for always. If the six phases are shaky, put the working method slide (Day 1, slide 41) back up for a moment: today's assignments are labelled with them."
},

{ // Slide 86
  title: "Your AI in Claude Code",
  kicker: "DAY 2 · RECAP",
  subtitle: "Last session's map, now with everything you made in it.",
  type: "recap",
  visual: { stepThrough: ".cmap-step, .slide-main > .tagline", map: {
    tree: { root: "~", rootNote: "your home folder", groups: [
      [ ["├── ", ".claude/", "about you, every project", 1],
        ["│   ├── ", "CLAUDE.md", "memory: about you"],
        ["│   ├── ", "settings.json", "your own permissions"],
        ["│   └── ", "projects/…/memory/", "Claude's notes"] ],
      [ ["└── ", "aether-snake/", "your project, in git", 1],
        ["    ├── ", "intent.md", "what you want ✓"],
        ["    ├── ", "CLAUDE.md", "memory: this project"],
        ["    ├── ", ".claude/settings.json", "permissions + hook"],
        ["    ├── ", "game.js …", "your Snake ✓"],
        ["    ├── ", "assets/", "your avatar"],
        ["    ├── ", "tests/", "your test"],
        ["    └── ", "PROGRESS.md", "the handover"] ]
    ] },
    inLabel: "loads", center: "Claude Code", centerSub: "reads both folders at the start", outLabel: "MCP",
    right: [
      { name: "Hands and feet", where: "Outside, through MCP", chips: [["GitLab", "your project ✓"], ["Jira", "support days"], ["Confluence", "support days"]] }
    ]
  } },
  tagline: "Everything Claude knows about your game is a file. Today the same folder grows.",
  keyPoints: ["Same map as Day 1 slide 52", "Click: one part at a time", "Ticks: what you made last session", "PROGRESS.md: where today starts", "Answer the flipchart questions here"],
  notes: "Say: This is the map from last session (Day 1, slide 52), now with everything you made in it. Click through it one part at a time. 1 ~/.claude/: your personal CLAUDE.md, your own settings and Claude's notes, the same as last session. 2 Your project folder, with a tick on everything you made: intent.md, the project CLAUDE.md, .claude/settings.json with your permissions and the hook that runs npm test after every edit, the game in 5 layers, your avatar in assets/, the test in tests/ that caught the straight-back bug, and PROGRESS.md, the handover. 3 Claude Code loads both folders at the start of every session; PROGRESS.md it reads when you ask. 4 Through MCP it made your GitLab project; Jira and Confluence come in the support days.\n\nUse this to answer the questions from Show your game. Today the same folder gets spec.md, levels/, three skills, a workflow and an agent called Bobby in .claude/."
},

{ // Slide 87
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 16: Pick up where you left off",
  kicker: "DAY 2 · ASSIGNMENT 16 · PLAN",
  subtitle: "Last session's conversation is gone from Claude's head. Your files aren't.",
  calm: true,
  steps: [
    { text: "A new day: open a terminal, go to your game and get the latest", prompt: "cd aether-snake\ngit pull" },
    { text: "Open the code editor next to it", prompt: "code .", after: "VS Code left, the terminal right: you see every file Claude touches." },
    { text: "Start Claude Code in last session's conversation", prompt: "claude --continue", after: "Not “manual mode on” at the bottom? Shift+Tab." },
    { text: "Ask where you stopped", prompt: "Read PROGRESS.md. Where did we stop, and what's still open?", after: "Claude answers from the file, not from memory." },
    "In VS Code: find CLAUDE.md, intent.md, .claude/settings.json and your test. Which one did Claude just read?"
  ],
  expected: "Claude Code and VS Code are open on your game, and Claude knows where you stopped.",
  keyPoints: ["git pull every morning", "VS Code next to the terminal", "claude --continue or /resume", "PROGRESS.md carries over", "Find last session's files"],
  notes: "Part of the recap: hands on the keyboard before anything new. The loop goes round: last session's Maintain (PROGRESS.md) is today's Plan. git pull is the first thing developers do every morning. claude --continue goes back into the last conversation; /resume lets you pick one. Either way, the files are what really carry over.\n\nWhy now: a new day, a new session. Start from what's written down.\nWhat you see: Claude reads PROGRESS.md and knows where you stopped; VS Code shows the same folder as the recap map.\nLook inside: point at each file from the recap map in VS Code.\n\nNo PROGRESS.md (group didn't get to the handover)? Ask instead: “Look at this folder and the git log. What did we build, and what's still open?”"
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 1: Level 2 by prompt                                      */
/* ---------------------------------------------------------------------- */

{ // Slide 88
  title: "What should the next levels be like?",
  kicker: "DAY 2 · PART 1 · LEVELS",
  subtitle: "Your Snake is level 1. Today it gets four more, each a little harder.",
  type: "concept",
  visual: { stepThrough: ".layer-card, .slide-main > .tagline", layers: [
    { img: "assets/examples/snake-level-1.svg", label: "Level 1", caption: "Your game from last session." },
    { img: "assets/examples/snake-level-2.svg", label: "Level 2", caption: "More food to finish, a longer snake, one obstacle." },
    { img: "assets/examples/snake-level-3.svg", label: "Level 3", caption: "More obstacles, a bit faster." },
    { img: "assets/examples/snake-level-4.svg", label: "Level 4", caption: "Faster, more in the way." },
    { img: "assets/examples/snake-level-5.svg", label: "Level 5", caption: "Almost a maze. Still playable." }
  ] },
  tagline: "Level 2 with prompts. Level 3 with skills. A test and a subagent check them. Levels 4 and 5 with one command.",
  keyPoints: ["Ask first: how would you make Snake harder?", "Click: one level at a time", "Harder, but still playable", "The tagline is today's route"],
  notes: "Ask the room first: what would make the next level of Snake harder? Collect a few answers, then click through the five boards. Every level turns the same knobs a little further: more food to finish, a longer snake at the start, more obstacles, a bit faster. Harder, but always playable: that rule comes back in the spec, the test and Bobby.\n\nThe tagline is the route of the day, read it out: level 2 with plain prompts, level 3 with three skills you make, then a test and a checker subagent, then one command that builds levels 4 and 5. Each time the same result, built a smarter way."
},

{ // Slide 89
  title: "Update intent.md: the levels wish",
  kicker: "DAY 2 · PART 1 · DESIGN",
  subtitle: "Your intent.md from last session says what your game is. Before you build levels, add what you want next.",
  type: "concept",
  visual: { stepThrough: ".dp-step, .slide-main > .tagline", docPair: {
    tree: { root: "aether-snake/", rootNote: "your project, in git", rows: [
      ["├── ", "CLAUDE.md", "how to work here: says @intent.md"],
      ["├── ", "intent.md", "from Day 1: add the levels wish", "why"],
      ["├── ", ".claude/settings.json", "permissions + hook"],
      ["├── ", "game.js …", "your Snake"],
      ["├── ", "tests/", "your test"],
      ["└── ", "PROGRESS.md", "the handover"]
    ] },
    docs: [
      { name: "intent.md", badge: "Why + what", ask: "What do we want, and why?",
        lines: ["## Outcome", "…your game from Day 1…", "+ Levels 2 to 5, each a little harder.", "## Done when", "+ you can play all five", "+ no level is easier than the one before", "## Boundaries", "+ always playable"],
        facts: ["The same file as last session, a few lines more (+)", "In words, for people and for Claude"],
        when: ["at the start of every session: CLAUDE.md says @intent.md", "when it makes a plan", "to check: is it done? Later today a test and a subagent check the Done when lines"],
        example: "Make the game harder, level by level." }
    ],
    whenTitle: "When does Claude read it?",
    work: ["intent.md ≈ the why in a ticket or user story: the outcome and the acceptance criteria"]
  } },
  tagline: "New goal? Update intent.md first. Then build.",
  keyPoints: ["Click: folder, intent.md, when, at work", "You know it from Day 1", "Outcome, done when, boundaries", "Read every session through @intent.md", "Done when comes back with the test and the subagent"],
  notes: "Say: You just saw five levels. Before anyone builds one, we update what we want. This is the intent.md you made on Day 1: nothing new, it just gets a few lines for the levels (the + lines on the slide).\n\nClick through it. 1 The folder as it is now, at the end of Day 1: intent.md is already there, in the root next to CLAUDE.md, in git. 2 What goes in it, in words: the outcome (levels 2 to 5, each a little harder), when it's done (you can play all five, no level is easier than the one before) and the boundaries (always playable). 3 When Claude reads it: at the start of every session, because CLAUDE.md pulls it in with @intent.md, so you don't have to repeat the goal in every prompt. Also when it makes a plan, and when it checks whether something is done. The Done when lines come back this afternoon: the level test and a subagent check against them. 4 At work: the why in a ticket or user story, with its acceptance criteria.\n\nWhy now and not later: it's the goal of the whole day, and it costs one prompt.\n\nNot yet: the exact numbers (how fast, how many obstacles at most). Those come in spec.md, just before the skills, when three skills, a test and a subagent have to agree on them. Don't name Bobby yet: the subagent gets its name after lunch. After Assignment 25, intent.md is no longer loaded by itself: then it's read when needed.\n\nNext: Assignment 17, the wish in your own intent.md."
},

{ // Slide 90
  type: "practice",
  layout: "exercise",
  mode: "plan",
  title: "Assignment 17: Update intent.md",
  kicker: "DAY 2 · ASSIGNMENT 17 · DESIGN",
  subtitle: "Add the levels wish to last session's intent.md. Nothing gets built yet.",
  calm: true,
  steps: [
    "Shift+Tab to “plan mode on”",
    { text: "Add the wish to intent.md", prompt: "New wish: levels 2 to 5, each a little harder than the one before: more food to finish, a longer snake at the start, more obstacles, a bit faster. Always playable. Add it to intent.md: the outcome, done-when checks and boundaries. Don't build anything yet.", after: "Approve the plan with 2 (not 1)." },
    "Open intent.md in VS Code. Find Done when. How would you check each line?",
    { text: "Save it", prompt: "Commit and push intent.md." }
  ],
  expected: "intent.md has the levels wish: the outcome, done-when checks and boundaries.",
  keyPoints: ["Design phase", "One prompt, in plan mode", "Done when: how do you check it?", "Commit it"],
  notes: "Why now: you're about to build levels. Write down what you want first, so every session after this knows the goal.\nWhat you see: intent.md gets a levels outcome with done-when checks and boundaries.\nLook inside: the Done when lines. 'No level is easier than the one before': how would you check that? Keep the answer: the level test and the subagent do exactly that this afternoon.\n\nThe prompt names the four ways to make a level harder, the same as the boards on the slide before. Dry run (28 Oct): without them, Claude asked 'harder how?' and offered only speed and obstacles.\n\nWatch for: Claude may say it won't push straight to main and offer a branch. On Day 1 you pushed to main too: say push to main. Claude also listed its assumptions first (level 1 is today's game, game over goes back to level 1, 'You win' after level 5). If someone asks for 'more food on the board', Claude rightly reads that as easier: harder is more food to finish."
},

{ // Slide 91
  title: "How developers work with git",
  kicker: "DAY 2 · PART 1 · GIT",
  subtitle: "Main always works. New work happens next to it.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "Pull", caption: "Get the latest from GitLab." },
    { label: "Branch", caption: "A copy to work in, for example level-2." },
    { label: "Commit + push", caption: "Small save points, on your branch." },
    { label: "Merge request", caption: "Ask to bring it into main: what, why, how tested." },
    { label: "Review + merge", caption: "Someone else looks. Then it goes into main." }
  ],
  tagline: "At Worldline nobody pushes straight to main.",
  keyPoints: [
    "Main always works",
    "A branch per feature",
    "Merge request = asking to bring it in",
    "Review before merge",
    "Claude runs git, you decide"
  ],
  notes: "For the trainers, in plain words: a developer's day at a company like Worldline starts with git pull. Each ticket gets its own branch, so main keeps working. Small commits with a clear message, pushed often. When it's done: a merge request (GitLab's name for a pull request), where a colleague reviews it and the pipeline runs the tests; then it's merged. Main is protected: no direct pushes, no force push. When two people change the same line, that's a merge conflict and someone decides which version stays. Something broke after a merge? git revert undoes a commit safely. A tag such as v1.0 marks a release. Today they meet branch and merge request."
},

{ // Slide 92
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 18: Level 2 in three layers",
  kicker: "DAY 2 · ASSIGNMENT 18 · BUILD",
  subtitle: "Like last session: one layer, check it, commit. Each layer has a 10-second check.",
  calm: true,
  steps: [
    { text: "Layer 1: more food to finish. Say yes to each file.", prompt: "Create a branch level-2. Level 1 is the game as it is now: move its numbers into levels/level-1.js, without changing how it plays. Then make levels/level-2.js: the same, but it needs more food to finish. After level 1's food goal you go to level 2. Also make index.html?level=2 start straight at level 2, and the same for every later level, so I can test it.", after: "Check: reload the tab and eat 5 food. The screen says Level 2. Or start there: type ?level=2 after index.html in the address bar." },
    { text: "Look inside", prompt: "Explain @levels/level-2.js in plain words.", after: "Check: level 2 needs more food than level-1.js. Works? Commit and push." },
    { text: "Layer 2: a longer snake", prompt: "Next layer, only in levels/level-2.js: the snake starts a bit longer than in level 1. Keep it playable.", after: "Check: open index.html?level=2. Count the snake: longer than in level 1? Commit and push." },
    { text: "Layer 3: obstacles", prompt: "Last layer: level 2 gets a few obstacles, blocks on the board that end the game when you hit them. Put them in levels/level-2.js. The snake never starts in one, and food never lands on one.", after: "Check: open index.html?level=2. You see blocks. Steer into one: game over. Commit and push." },
    { text: "Which branch are you on?", prompt: "!git branch", after: "* level-2. main is untouched." }
  ],
  expected: "Level 2 needs more food, has a longer snake and a few obstacles, in levels/level-2.js on the branch level-2.",
  keyPoints: ["Same rhythm as Day 1: layer, play, commit", "Claude reads intent.md and game.js", "Level 2's numbers in their own file", "The hook runs the tests after every edit", "On a branch, main untouched"],
  notes: "Same rhythm as last session's layers: one change, play it, commit and push. Each layer makes level 2 harder in one way, the same as the boards on slide 6: more food to finish, a longer snake, a few obstacles.\n\nWhat Claude uses: intent.md (CLAUDE.md loads it every session) for the goal, 'each level a little harder, always playable'; game.js to see how the game works now. What it changes: in layer 1 it moves level 1's numbers out of game.js into levels/level-1.js (level 1 isn't built again: it's the game they already have), makes levels/level-2.js and teaches game.js to load the levels. Layer 2 changes one number in level-2.js. Layer 3 adds the obstacles to level-2.js and the drawing and collision to game.js. Last session's hook runs npm test after every edit, and edits in tests/ still ask.\n\nWhy one file per level: the numbers that make a level hard sit together in one small file, not between the game code. The skills will need to find them there later.\n\nWhy now: level 2 is a new feature, and main must keep working while you build it.\nLook inside: @levels/level-2.js. If nobody can say what each number does, slow down.\n\nWatch for: dry run (28 Oct): Claude showed a plan first (CLAUDE.md says so), asked two small questions (what after the last level, show the level number?) and wrote tests/levels.test.js by itself. Fine: Assignment 26 builds on it.\n\nNotice for later: the three layers are three jobs (food, snake, obstacles). Level 3 needs the same three again: that's the next part."
},

{ // Slide 93
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 19: Your first merge request",
  kicker: "DAY 2 · ASSIGNMENT 19 · DEPLOY",
  subtitle: "Before it goes into main, someone looks at it. Today that's you.",
  calm: true,
  steps: [
    { text: "Ask for a merge request", prompt: "Open a merge request on GitLab for the branch level-2 into main. Description: what changed, why, and how it was tested. Don't merge it: I review and merge it myself.", after: "Claude gives you the link. It doesn't merge." },
    "Open the link. Read the changes as if a colleague wrote them",
    "Happy? Merge it yourself on GitLab",
    { text: "Back in the terminal: get the merged work on main", prompt: "!git checkout main && git pull" }
  ],
  expected: "Level 2 is in main, through a merge request you reviewed.",
  keyPoints: [
    "Deploy phase: the human gate",
    "Claude opens the MR via MCP",
    "You review and merge",
    "Pull main afterwards"
  ],
  notes: "Claude goes up to the gate; the human goes through it. That's the same gate as on Day 5.\n\nWhy now: Nothing goes into main without a second pair of eyes.\nWhat you see: A merge request on GitLab, with what, why and how it was tested.\nLook inside: Read it as if a colleague wrote it. Would you approve it?"
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 2: Skills, level 3                                        */
/* ---------------------------------------------------------------------- */

{ // Slide 94
  title: "A repeated method",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "You just made level 2 in three prompts. Level 3 needs the same three again.",
  type: "context",
  visual: { repeatStack: 0, repeatTags: ["level 2", "level 3", "level 4 …"], bot: "sleepy", place: "aside" },
  cards: [
    { title: "Every level needs", body: "food\na snake\nobstacles\nharder, but still playable\non a branch" }
  ],
  tagline: "Typing it again is boring, and you forget a line.",
  keyPoints: [
    "Ask: what did you repeat every layer?",
    "Collect it, then show the card",
    "Same method, next game",
    "That's what a skill is for"
  ],
  notes: "Ask the room first: what did you tell Claude for level 2 that you'll have to say again for level 3? Collect it, then show the card. Typing it again is boring and you forget a line. That's what a skill is for."
},

{ // Slide 95
  title: "What is a skill?",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Anthropic's definition, in three parts. The example: the first skill you'll make.",
  type: "concept",
  visual: { stepThrough: ".sf-step, .slide-main > .tagline", skillDef: {
    quote: "Skills extend what Claude can do.", source: "Anthropic, Claude Code docs",
    file: { title: "A SKILL.md file", lines: ["---", "name: create-food", "description: Adds food to a level.", "  Use when a level needs food.", "---", "1. Read the food rules in spec.md.", "2. A bit more food than last level.", "3. Never on an obstacle or the snake."], caption: "With instructions: how the task is done. Written once." },
    starters: [
      { title: "Claude uses it when relevant", say: "Level 3 needs food.", caption: "your task matches the description" },
      { title: "Or you start it", say: "/create-food", chip: true, caption: "type / to see all skills" }
    ],
    result: { title: "The same way, every time", tiles: ["L3", "L4", "L5"], caption: "every level gets its food by the same instructions" }
  } },
  tagline: "Write it down once. Claude does it the same way every time.",
  keyPoints: ["Click: definition, file, who starts it, result", "Anthropic's definition first", "A file with instructions", "Claude picks it when relevant", "Or you type /name"],
  notes: "Read the definition from Anthropic's Claude Code docs out loud: 'Skills extend what Claude can do. Create a SKILL.md file with instructions, and Claude adds it to its toolkit. Claude uses skills when relevant, or you can invoke one directly with /skill-name.' The three cards are those three sentences.\n\nLink it to what they just did: for level 2 you told Claude three times how to make a level harder. A skill writes that down once, so Claude does it the same way for level 3, 4 and 5.\n\nClaude Code also comes with a few built-in skills (type / to see them), and you can ask Claude to turn what you just did into a skill: that's what you'll do next."
},

{ // Slide 96
  title: "Inside a skill: SKILL.md",
  kicker: "DAY 2 · PART 2 · SKILLS",
  subtitle: "A skill is a folder with one file in it, SKILL.md. The file has two parts: the frontmatter on top, the body under it.",
  type: "concept",
  visual: { stepThrough: ".sd-step, .slide-main > .tagline", skillDoc: {
    tree: { label: "Where skills live", root: "aether-snake/", rootNote: "your project, in git", rows: [
      ["├── ", "CLAUDE.md", "", "dim"],
      ["├── ", "intent.md", "", "dim"],
      ["├── ", "spec.md", "the numbers", "dim"],
      ["├── ", "levels/", "skills add level 3 here", "dim"],
      ["└── ", ".claude/", "", "dir"],
      ["    ├── ", "settings.json", "", "dim"],
      ["    └── ", "skills/", "a folder per skill", "dir"],
      ["        ├── ", "create-food/", "", "skill"],
      ["        │   └── ", "SKILL.md", "on the right →", "file"],
      ["        ├── ", "create-snake/", "", "skill"],
      ["        │   └── ", "SKILL.md", "", "file"],
      ["        └── ", "create-obstacles/", "", "skill"],
      ["            └── ", "SKILL.md", "", "file"]
    ] },
    file: { label: "Inside the file", name: "create-food/SKILL.md", parts: [
      { kind: "front", label: "Frontmatter", sub: "the top of the file, between the two --- lines", lines: [
        ["---", ""],
        ["name: create-food", "the /name you type"],
        ["description: Adds the food to a level.", "what it does, and when:"],
        ["  Use when a level needs food.", "Claude picks the skill by this"],
        ["allowed-tools: Read, Edit(levels/**)", "may do this without asking you"],
        ["---", ""]
      ] },
      { kind: "body", label: "Body", sub: "everything under the second ---, no heading needed", lines: [
        ["# Create food", ""],
        ["1. Read the food rules in spec.md.", ""],
        ["2. A bit more food to finish than the level before.", ""],
        ["3. Never on an obstacle or the snake.", ""],
        ["4. Run npm test: green before you stop.", ""]
      ] }
    ] },
    load: { title: "What does Claude load, and when?", moments: [
      { when: "1 · The session starts", label: "in Claude's context", chips: [["create-food: frontmatter", "front"], ["create-snake: frontmatter", "front"], ["create-obstacles: frontmatter", "front"]], note: "Only the frontmatter of each skill: a few lines. Now Claude knows which skills exist." },
      { when: "2 · You: “Level 3 needs food.”", link: "It matches the description of create-food, so Claude Code loads that skill's body", label: "added to Claude's context", chips: [["create-food: body", "body"], ["spec.md", "file"]], closed: ["create-snake: body, not loaded", "create-obstacles: body, not loaded"], note: "Only this skill's body. Step 1 says: read spec.md, so Claude reads that too. The other two are not loaded." }
    ], why: "Why it matters: a skill costs almost nothing until it's used, so you can have many. But Claude only sees the frontmatter, so the description must be clear." }
  } },
  tagline: "The frontmatter is always loaded. The body only when the skill is used.",
  keyPoints: ["Click: folder, frontmatter, body, loading", "One folder per skill in .claude/skills/", "Frontmatter = the top, between the --- lines", "description decides when Claude picks it", "Frontmatter always loaded, body only when used"],
  notes: "Click through it. 1 Where it lives: every skill is a folder in .claude/skills/, with one file in it, SKILL.md. Today you make three: create-food, create-snake and create-obstacles. In git, so the whole team gets them. The grey files are the ones the skills work with: spec.md for the numbers, levels/ for the level files.\n\n2 The frontmatter: the block between the two --- lines at the top (Ryan's 'three stripes'). Think of it as the label on a jar. name is the /name you type. description says what the skill does and when to use it: Claude reads it to decide whether this skill fits your task. allowed-tools: what this skill may do without asking you, only while it runs.\n\n3 The body: the instructions themselves, in plain words, step by step. It points to spec.md instead of repeating the numbers.\n\n4 What Claude loads, and when. At the start of every session Claude reads only the labels of all skills: a few lines each. That's how it knows which skills exist. The instructions are only read when the skill is used: you type /create-food, or you ask for something that matches the description. Why that matters: a skill costs almost nothing until you use it, so you can have many. And because Claude only sees the label, the description must say clearly when to use it, or Claude never picks the skill. Remember the tokens part after lunch: this is one of the cheap ones.\n\nOther frontmatter settings you'll meet today: disable-model-invocation: true (only you can start it, with /name) and argument-hint (what to type after /name).\n\nIn the code editor: when Claude makes a skill you see the folder appear in VS Code's explorer, and the skill is in the / menu straight away, no restart.\n\nThe example points to spec.md: say 'you'll write that in a few minutes, just before you build this skill'."
},

{ // Slide 99
  title: "Which skills would you build for your daily work?",
  kicker: "DAY 2 · PART 2 · YOUR WORK",
  subtitle: "Think of something you explain again and again, to Claude or to a colleague.",
  type: "context",
  visual: { stagger: "pop", stepThrough: true, bot: "think", place: "beside" },
  cards: [
    { title: "Something you explain every time", body: "How we name things here, how a ticket should look." },
    { title: "A check you always do", body: "Before a merge request, before a release." },
    { title: "Something with the same shape every week", body: "A status update, a report, release notes." }
  ],
  tagline: "Anything you explain to Claude twice can become a skill.",
  keyPoints: ["Ask first, then click", "Something you explain every time", "A check you always do", "The same shape every week", "Collect 3 or 4 answers"],
  notes: "Ask the question before you click. Give the room a minute to think of their own work, then collect three or four answers. Only then click through the three cards as starting points for anyone who's stuck.\n\nExamples if it stays quiet: a frontender with a skill for a new component (design system, naming, a test for every state); a backender with a skill for a new endpoint (the contract first, tests, error handling); a manager with a skill for the weekly status (read the board, the same headings, risks on top).\n\nKeep the answers: at the end of the day the final reflection asks for one workflow to investigate."
},

{ // Slide 100b
  title: "spec.md: one rulebook for every level",
  kicker: "DAY 2 · PART 2 · DESIGN",
  subtitle: "Before you build the skills: write down the numbers they must stay within.",
  type: "concept",
  visual: { stepThrough: ".sp-step, .slide-main > .tagline", specDoc: {
    tree: { root: "aether-snake/", rootNote: "your project, in git", rows: [
      ["├── ", "CLAUDE.md", "how to work here"],
      ["├── ", "intent.md", "why + what: the levels wish"],
      ["├── ", "spec.md", "exactly what: new now", "what"],
      ["├── ", "levels/", "level-1.js, level-2.js: from this morning"],
      ["├── ", "game.js …", "your Snake"],
      ["├── ", "tests/", "your test"],
      ["└── ", "PROGRESS.md", "the handover"]
    ] },
    what: { head: "What is it?", lines: ["## levels/level-N.js", "value         min   max", "startLength     3     8", "speed (ms)     40   150", "obstacles       0    40", "foodToFinish    5    50", "## Example: level-2.js"],
      text: "A file with the numbers a level may have: a minimum and a maximum for each, and one example. Claude writes it from your levels 1 and 2. You check the numbers." },
    why: { head: "What is it for?", intent: "each level a little harder, always playable", spec: ["speed: 40 to 150 ms", "obstacles: at most 40", "food to finish: 5 to 50"],
      text: "intent.md says what you want, in words. spec.md turns that into numbers you can check." },
    skills: { head: "What does it mean for the skills?", names: ["create-food", "create-snake", "create-obstacles"], verb: "each reads →",
      text: "Each skill's instructions say “read spec.md”. So all three stay within the same numbers: every level gets harder, but never unplayable." },
    work: ["spec.md ≈ the API contract or the design spec: what everyone builds to"]
  } },
  tagline: "intent.md says what you want. spec.md says exactly how far you may go.",
  keyPoints: ["Click: folder, what, what for, the skills", "A min and max for every value", "Words in intent.md, numbers in spec.md", "Every skill reads it"],
  notes: "Say: Level 2 you built alone, with prompts. That didn't need a rulebook. Now three skills each build part of a level. If each of them guesses its own numbers, level 4 might suddenly be twice as fast, or blocked. spec.md is the one set of numbers they all follow.\n\nClick through it. 1 The folder: levels/ is there now, from this morning, and spec.md is the one new file, in the root next to intent.md. 2 What is it? A file with the numbers a level may have: a minimum and a maximum for each, and one example. You don't invent it: Claude writes it from your levels 1 and 2, and you check the numbers. 3 What is it for? intent.md says 'each level a little harder, always playable', in words. spec.md says how far: speed at least 40 ms, at most 40 obstacles. Words become numbers you can check. 4 What does it mean for the skills? Every skill's instructions start with 'read spec.md', so all three skills stay within the same numbers. 5 At work: the API contract or the design spec.\n\nThe numbers on the slide are an example. Claude may choose other names (startDelay instead of speed): fine, as long as every value has a minimum and a maximum.\n\nLater today the level test and the subagent check against the same file; you don't need to say that yet.\n\nNext: Assignment 20, your own spec.md."
},

{ // Slide 100c
  type: "practice",
  layout: "exercise",
  mode: "plan",
  title: "Assignment 20: Your spec.md",
  kicker: "DAY 2 · ASSIGNMENT 20 · DESIGN",
  subtitle: "Write down the rules your levels already follow, before the skills need them.",
  calm: true,
  steps: [
    { text: "A new branch for level 3", prompt: "!git checkout -b level-3" },
    "Shift+Tab to “plan mode on”",
    { text: "Write spec.md from what you have", prompt: "Write spec.md from levels/level-1.js, levels/level-2.js and the levels wish in intent.md: which values a level file contains, a minimum and a maximum for every value so the game stays playable, and level-2.js as the example. Don't change any level.", after: "Approve the plan with 2. Claude may ask a few questions: pick with ↑↓ and Enter." },
    "Put intent.md and spec.md side by side in VS Code. Which line in spec.md makes “always playable” exact?",
    { text: "Save point", prompt: "Commit spec.md on the branch level-3 and push it." }
  ],
  expected: "spec.md says what a level file contains, with a minimum and maximum for every value, on the branch level-3.",
  keyPoints: ["Why now: the skills need one rulebook", "Written from your real levels", "Plan mode", "Find the line that makes it exact", "On the branch level-3"],
  notes: "Why now: the next three assignments build skills that make levels. Write down the limits they must stay within first.\nWhat you see: a new spec.md with the values from your level files, a min and max for each, and level-2.js as the example.\nLook inside: step 4. intent.md says 'always playable' in words; spec.md turns it into numbers (a maximum speed, a maximum number of obstacles).\n\nWhy from levels 1 and 2: everyone's game is different, so everyone's spec is too. It records what the levels already look like, plus the limits.\n\nThe branch level-3 holds spec.md, the three skills and level 3 itself: one merge request at the end.\n\nWatch for: Claude may put spec.md in levels/: fine. Field names differ per person: fine. Someone whose level 2 has no own file in levels/? Ask Claude to move the numbers there first."
},

{ // Slide 100d
  title: "A skill prompt: the job, and the limits",
  kicker: "DAY 2 · PART 2 · SKILLS",
  subtitle: "Say in words what the skill should do. Then point to spec.md for how far it may go.",
  type: "concept",
  visual: { stepThrough: ".pt-step, .slide-main > .tagline", promptParts: {
    label: "The prompt for your first skill, in parts",
    parts: [
      { kind: "where", text: "Make a skill in .claude/skills/create-food/.", label: "Where", means: "the folder of the skill" },
      { kind: "job", text: "Level N needs a little more food to finish than the level before. Food never lands on an obstacle or the snake.", label: "The job, in words", means: "what the skill does" },
      { kind: "limits", text: "Stay within the limits in spec.md.", label: "The limits", means: "how far: the numbers in spec.md" },
      { kind: "check", text: "Then npm test must be green.", label: "The check", means: "how you know it worked" }
    ],
    compare: { title: "Why “within spec.md”?", cols: [
      { tone: "bad", head: "Only the words", say: "a little more food", items: ["Claude decides how much “a little” is", "level 5 might need 6 food, or 200", "nothing to check it against"] },
      { tone: "good", head: "The words + spec.md", say: "foodToFinish: 5 to 50", items: ["a number Claude has to stay within", "the same for all three skills", "a test can check it: yes or no"] }
    ] }
  } },
  tagline: "Words say what you want. spec.md makes it measurable.",
  keyPoints: ["Click: the prompt, the parts, why", "The job: in words", "The limits: in spec.md, not in the prompt", "Measurable = testable"],
  notes: "Say: You're about to write the prompts for your three skills. Every one of them has the same parts. Click 1: the prompt for create-food. Click 2: the four parts. Where the skill lives. The job, in words: what the skill does. The limits: how far it may go, and that's one short sentence, because the numbers are already in spec.md. The check: how you know it worked.\n\nClick 3: why the limits part matters. 'A little more food' is clear to a person, but Claude decides how much a little is, and it may decide differently for level 4 than for level 5. Nothing says when it's too much. spec.md makes it measurable: food to finish between 5 and 50. Every skill stays within the same numbers, and a test can check it with a yes or a no.\n\nWhy not put the numbers in the prompt? Then they live in three skills, and the next time you change a limit you have to change three files. In spec.md they live in one place.\n\nAt work: the same as writing 'follow the API contract' in a ticket instead of copying the contract into it.\n\nNext: Assignment 21, your first skill."
},

{ // Slide 101
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 21: Skill 1, /create-food",
  kicker: "DAY 2 · ASSIGNMENT 21 · BUILD",
  subtitle: "You made the food for level 2 by hand. Now write down the instructions.",
  calm: true,
  steps: [
    { text: "Make the skill", prompt: "Turn how we made the food for level 2 into a skill in .claude/skills/create-food/. I start it with /create-food N. Frontmatter: name, and a description that says when to use it. Instructions: if levels/level-N.js doesn't exist yet, start from a copy of the level before. Read the food rules in spec.md, make level N need a little more food to finish than the level before and stay within the limits, food never on an obstacle or the snake, then npm test must be green. Show me SKILL.md before you save it.", after: "Read it, then say yes." },
    "Open .claude/skills/create-food/SKILL.md in VS Code. Find the two --- lines. Which line tells Claude when to use it?",
    { text: "Try it on level 3", prompt: "/create-food 3", after: "Claude makes levels/level-3.js: a copy of level 2, with more food to finish." },
    { text: "Check it in the browser", after: "Open index.html?level=3. Does it need more food to finish than ?level=2?" },
    { text: "Save point", prompt: "Commit the skill and level 3 on the branch level-3 and push." }
  ],
  expected: "A /create-food skill, and level 3 with more food to finish, on the branch level-3.",
  keyPoints: ["Skill from your own work", "Frontmatter: name + description", "Instructions point to spec.md", "In the / menu straight away"],
  notes: "Why now: level 3 needs food again, exactly like level 2.\nWhat you see: a new folder .claude/skills/create-food/ in VS Code, with SKILL.md.\nLook inside: the description. Would Claude pick this skill if you said 'level 3 needs food'?\n\nThe instructions point to spec.md instead of repeating the numbers: one rulebook. You're still on the branch level-3 from Assignment 20."
},

{ // Slide 102a
  title: "Two kinds of permission",
  kicker: "DAY 2 · PART 2 · PERMISSIONS",
  subtitle: "Skills let Claude do more on its own. That's the point, as long as you decide where its freedom ends: what it may just do, and what it must ask you first.",
  type: "concept",
  visual: { stepThrough: ".pp-step, .slide-main > .tagline", permPair: {
    cols: [
      { tone: "skill", title: "allowed-tools, in the skill", where: ".claude/skills/create-snake/SKILL.md",
        code: [{ t: "---" }, { t: "name: create-snake" }, { t: "description: …" }, { t: "allowed-tools: Edit(levels/**)", hl: true }, { t: "---" }],
        say: "/create-snake 3", target: "levels/level-3.js", verdict: "ok", verdictText: "✓ no question",
        scope: "This skill only, while it runs." },
      { tone: "project", title: "A rule, in settings.json", where: ".claude/settings.json",
        code: [{ t: "\"permissions\": {" }, { t: "  \"ask\": [" }, { t: "    \"Edit(spec.md)\"", hl: true }, { t: "  ]" }, { t: "}" }],
        say: "Make the maximum speed faster.", target: "spec.md", verdict: "ask", verdictText: "✋ asks you first",
        scope: "The whole project, every session, whatever a skill says." }
    ],
    work: ["like a protected file in GitLab: anyone can propose a change to the contract, someone has to approve it"]
  } },
  tagline: "A skill gets what it needs for its job. The rulebook only changes when you say yes.",
  keyPoints: ["Click: skill, then project", "allowed-tools: this skill, while it runs", "settings.json: the whole project", "Level files: free. spec.md: asks"],
  notes: "Say: Skills are great: Claude does more by itself, faster. But you don't want an AI, or any agent, to just do whatever it likes in your project. So you decide where its freedom ends. In the next assignment you make the second skill, and you give it two permissions at once. Here's the difference before you build it.\n\nClick 1: allowed-tools, in the skill's frontmatter. create-snake may edit the files in levels/ without asking you. That's practical: building levels is its job. It only counts for this skill, and only while it runs.\n\nClick 2: a rule in .claude/settings.json. Claude always asks before it changes spec.md. That counts for the whole project and every session, whatever a skill says. spec.md is the rulebook every skill follows: if a skill or a prompt could quietly raise a limit, the rules would mean nothing.\n\nAsk the room: which one would you use for a file nobody should ever touch? (deny in settings.json: deny beats allow and ask.)\n\nAt work: a protected file in GitLab, like a pipeline config or an API contract.\n\nNext: Assignment 22, both permissions in your project."
},

{ // Slide 102
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 22: Skill 2, /create-snake, and its permissions",
  kicker: "DAY 2 · ASSIGNMENT 22 · BUILD",
  subtitle: "The second skill. It may change level files without asking you, but not the rules in spec.md. Try it on level 3 straight away.",
  calm: true,
  steps: [
    { text: "Make the skill", prompt: "Make a skill in .claude/skills/create-snake/ for the snake in level N. I start it with /create-snake N. Its start length and its speed: a little more than the level before, within the limits in spec.md, and the snake never starts in an obstacle. In the frontmatter, add allowed-tools so this skill may edit the files in levels/ without asking me. Show me SKILL.md before you save it.", after: "Find allowed-tools between the --- lines." },
    { text: "Try it on level 3", prompt: "/create-snake 3", after: "No question for the edit in levels/: that's allowed-tools. Check: index.html?level=3. The snake starts longer than in ?level=2." },
    { text: "A rule for the whole project: the rulebook stays yours", prompt: "Add an ask rule to .claude/settings.json so Claude always asks me before it changes spec.md. Show me the change first.", after: "The skills may change level files without asking. The rules they follow only change when you say yes." },
    { text: "Try it", prompt: "Make the maximum speed in spec.md faster.", after: "Claude asks first: Permission rule Edit(spec.md) requires confirmation. Say no." },
    { text: "Save point", prompt: "Commit the skill, level 3 and settings.json on level-3 and push." }
  ],
  expected: "A /create-snake skill with its own allowed-tools, a longer snake in level 3, and an ask rule that guards spec.md.",
  keyPoints: ["allowed-tools: per skill, while it runs", "settings.json: for the whole project", "Level files: free for the skill", "spec.md: always asks"],
  notes: "Two kinds of permission side by side. allowed-tools in a skill's frontmatter: the tools that skill may use without asking, only while it runs. settings.json: rules for the whole project, for every session, whatever the skill says.\n\nWhy now: the skill changes level files all day, so it may do that without asking. But spec.md is the rulebook every skill follows. If a skill or a prompt could quietly raise a limit, the rules mean nothing. So changes to spec.md always ask, and you decide.\nWhat you see: allowed-tools in SKILL.md; an ask rule for Edit(spec.md) in settings.json. /create-snake 3 changes level-3.js without a question; 'make the maximum speed faster' stops and asks.\nLook inside: .claude/settings.json: allow, ask and deny. Which rule stops which edit?\n\nAt work: the same idea as a protected file in GitLab, like a pipeline config or an API contract: anyone can propose a change, someone has to approve it.\n\nNot tried in a dry run yet: check that Claude asks for the spec.md edit with the rule's name on screen."
},

{ // Slide 103
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 23: Skill 3, /create-obstacles",
  kicker: "DAY 2 · ASSIGNMENT 23 · BUILD",
  subtitle: "The third skill, the same shape as the first two. Try it on level 3 straight away.",
  calm: true,
  steps: [
    { text: "Make the skill", prompt: "Make a skill in .claude/skills/create-obstacles/ for the obstacles in level N. I start it with /create-obstacles N. A few more than the level before, within the limits in spec.md, never on the snake's start and never blocking the whole board. Show me SKILL.md before you save it." },
    { text: "Try it on level 3", prompt: "/create-obstacles 3", after: "Claude adds blocks to levels/level-3.js." },
    { text: "Check it in the browser", after: "Open index.html?level=3. More blocks than in ?level=2? Still fair?" },
    { text: "Save point", prompt: "Commit the skill and level 3 on the branch level-3 and push." }
  ],
  expected: "A /create-obstacles skill, and level 3 with more obstacles, on the branch level-3.",
  keyPoints: ["Third skill: same shape", "Within the limits in spec.md", "Try it on level 3", "Level 3: three layers, three skills"],
  notes: "Why now: level 3 has its food and its snake. The obstacles are the last layer, just like in level 2.\nWhat you see: a new folder .claude/skills/create-obstacles/, and more blocks in level 3.\nLook inside: is the board still fair? The skill says never blocking the whole board; spec.md says how many at most.\n\nAfter this, level 3 is built in three layers with three skills, the same three layers as level 2 by hand. Ask the room: what was different?",
},

{ // Slide 103b
  title: "Quiz: how does Claude pick a skill?",
  kicker: "DAY 2 · QUIZ",
  subtitle: "You type “Level 4 needs obstacles.” You don't type /create-obstacles. How does Claude know to use that skill?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "It reads the body of all three skills first." },
    { title: "B", body: "Your question matches the description in the frontmatter." },
    { title: "C", body: "spec.md says which skill to use." },
    { title: "D", body: "CLAUDE.md lists your skills." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first", "Answer: B, the description", "Frontmatter: always loaded", "Body: only after Claude picks the skill"],
  notes: "Vote first, then press → to strike the wrong answers. B: at the start of every session Claude has the frontmatter of every skill. 'Level 4 needs obstacles' matches the description of create-obstacles, so Claude picks that skill, and only then Claude Code loads its body. A is the opposite: the bodies are only loaded after the choice, that's why skills are cheap. C: spec.md has the numbers, not the skills; the skill's body points to spec.md. D: CLAUDE.md doesn't need to list skills, Claude Code finds them in .claude/skills/ by itself.\n\nNext: Assignment 24, where they ask without the / and see Claude make that choice."
},

{ // Slide 104
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 24: Let Claude pick the skill",
  kicker: "DAY 2 · ASSIGNMENT 24 · BUILD",
  subtitle: "Level 3 is built. Now ask without the /: does Claude pick the right skill by itself?",
  calm: true,
  steps: [
    { text: "Start clean, then ask without the /", cmds: ["/clear"], prompt: "Level 3 needs one more obstacle.", after: "Watch: Claude picks create-obstacles by itself. It may ask “Use skill?”: say yes." },
    { text: "Check it in the browser", after: "Open index.html?level=3. One more block? Compare with ?level=2." },
    { text: "Merge request", prompt: "Push level-3 and open a merge request into main: what changed, why, how it was tested. Don't merge it.", after: "Review it on GitLab and merge it yourself." },
    { text: "Back on main", prompt: "!git checkout main && git pull" }
  ],
  expected: "Claude picked a skill from its description, and level 3 is in main.",
  keyPoints: ["/clear first", "No /: Claude picks by the description", "The quiz, live", "Review and merge level 3"],
  notes: "Why now: the quiz just asked how Claude picks a skill. Here they see it happen.\nWhat you see: Claude names the skill it uses, Skill(create-obstacles), sometimes after asking 'Use skill?'. The body of that skill is loaded, the other two are not.\nLook inside: which skill did it use, and why? The description in its frontmatter.\n\nLevel 3 was already built in Assignments 21 to 23: each skill tried right after it was made, one layer at a time, just like level 2 by hand.\n\nWatch for: dry run (28 Oct, Claude Code 2.1.312): a broad 'Make level 3' without naming skills made Claude read the SKILL.md files with cat instead of a real Skill() call. A request that matches one description, like this one, is the better test. Not tried in a dry run yet: if Claude edits level-3.js without the skill, ask 'Which skill fits this?' and compare."
},

{ // Slide 105
  title: "Lunch",
  kicker: "DAY 2 · LUNCH",
  subtitle: "Enjoy your lunch.",
  type: "pause",
  visual: { countdown: 60, bot: "wave", place: "beside" },
  cards: [
    { title: "Back at 13:00", body: "We continue with what costs tokens, then a test and Bobby." }
  ],
  keyPoints: ["Lunch: resume at 13:00", "Check in on stuck skills", "Quick word over lunch"],
  notes: "Exact resume time: 13:00. Over lunch: check who has level 3 merged; help anyone whose skills Claude didn't pick up (usually a vague description)."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 3: Context architecture                                   */
/* ---------------------------------------------------------------------- */

{ // Slide 106
  title: "What costs tokens, and what doesn't",
  kicker: "DAY 2 · PART 3 · ARCHITECTURE",
  subtitle: "Where you put something decides when Claude reads it.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "short", tone: "orange" }] },
  cards: [
    { title: "Always loaded", body: "CLAUDE.md, and what it pulls in with @\nthe frontmatter of every skill\nMCP server instructions (the tools themselves load on demand)" },
    { title: "Only when needed", body: "a SKILL.md's instructions\nfiles inside a skill\nlevels/CLAUDE.md: only when Claude works in levels/" },
    { title: "Almost free", body: "hooks and scripts: they run, only their output counts\na subagent: works in its own context, brings back a summary" }
  ],
  tagline: "Keep CLAUDE.md short. Put the details where they're needed.",
  keyPoints: [
    "Always: CLAUDE.md + @imports, skill descriptions, MCP instructions",
    "On demand: MCP tools, skill recipe, nested CLAUDE.md",
    "Almost free: hooks, scripts, subagents",
    "The conversation is by far the biggest cost",
    "Tell Claude where things are, so it doesn't search"
  ],
  notes: "This is the question students ask most: why does where I put things matter? Real numbers from the dry run (/context, Claude Code 2.1.309): the conversation was 175k tokens before /compact and 44k after; CLAUDE.md plus @intent.md about 1.2k; 30 skills 5.1k (only their descriptions); 155 MCP tools 0 tokens, because they load on demand, while the MCP server instructions cost 2.5k. So the conversation is by far the biggest cost: /clear between tasks matters most. Everything in the first column is in the context window from the very first message, every session. The second column is only read when it's relevant. The third column barely touches the context: a hook or script runs outside it, and a subagent does its reading in its own window and only returns a summary. Practical habits: keep CLAUDE.md short and let it say where things live, switch off MCP servers you don't use, put detail in skills and nested CLAUDE.md files, use /clear between tasks."
},

{ // Slide 103
  title: "The map of your project",
  kicker: "DAY 2 · PART 3 · ARCHITECTURE",
  subtitle: "What your folder has after this morning, and what this afternoon adds.",
  type: "concept",
  visual: { stepThrough: ".pm-step, .slide-main > .tagline", projMap: {
    legend: [["day1", "Day 1"], ["am", "this morning"], ["pm", "this afternoon"]],
    tree: { root: "aether-snake/", rootNote: "your project, in git", rows: [
      ["├── ", "CLAUDE.md", "every session: gets shorter next", "day1"],
      ["├── ", "intent.md", "Day 1 + the levels wish", "am"],
      ["├── ", "spec.md", "the numbers every level stays within", "am"],
      ["├── ", "PROGRESS.md", "the handover", "day1"],
      ["├── ", "index.html  game.js …", "your Snake", "day1"],
      ["├── ", "levels/", "one file per level", "am dir"],
      ["│   ├── ", "CLAUDE.md", "only when Claude works in levels/", "pm"],
      ["│   ├── ", "level-1.js  level-2.js  level-3.js", "", "am"],
      ["│   └── ", "level-4.js  level-5.js", "the workflow builds them", "pm"],
      ["├── ", "tests/", "", "day1 dir"],
      ["│   ├── ", "reverse-keys.test.js", "your Day 1 test", "day1"],
      ["│   └── ", "levels.test.js", "every level, every limit", "pm"],
      ["└── ", ".claude/", "", "day1 dir"],
      ["    ├── ", "settings.json", "permissions, hooks, ask before spec.md", "am"],
      ["    ├── ", "skills/", "", "am dir"],
      ["    │   ├── ", "create-food/  create-snake/  create-obstacles/", "your 3 skills", "am"],
      ["    │   └── ", "build-game-levels/", "the workflow", "pm"],
      ["    └── ", "agents/", "", "pm dir"],
      ["        └── ", "level-checker.md", "a subagent that checks the levels", "pm"]
    ] },
    side: { title: "Yours, not shared", groups: [
      { head: "Not in git", items: ["CLAUDE.local.md", ".claude/settings.local.json"] },
      { head: "You, in every project", items: ["~/.claude/CLAUDE.md", "~/.claude/settings.json", "~/.claude/skills/", "~/.claude/agents/"] }
    ] }
  } },
  tagline: "Project files are shared through git. Your home folder is only yours.",
  keyPoints: ["Click: the project, then yours", "Grey: Day 1. Cyan: this morning. Orange: this afternoon", "Project .claude/: shared with the team", "Local files and ~/.claude/: only you"],
  notes: "Come back to this map whenever someone asks 'where does this go?'.\n\nClick 1: the project. Grey is what they had at the end of Day 1. Cyan is this morning: the levels wish in intent.md, spec.md, levels 1 to 3 in their own files, the ask rule for spec.md in settings.json, and the three skills. Orange is this afternoon: a shorter CLAUDE.md with a second one in levels/ (next assignment), the level test, a subagent that checks the levels, the workflow, levels 4 and 5, and the hook that keeps Claude off main (it goes into settings.json with the workflow). The file is level-checker.md; don't name its character yet: Bobby comes three slides from now.\n\nClick 2: yours, not shared. Anything in the project's .claude/ folder and the project CLAUDE.md is shared with the team through git. The .local files are only for you and stay out of git. ~/.claude/ is the same structure for you personally, in every project.\n\nYour folder may differ a little: Claude may have chosen other file names, or put a level test in tests/ already in level 2. Fine."
},

{ // Slide 108
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 25: A shorter CLAUDE.md",
  kicker: "DAY 2 · ASSIGNMENT 25 · MAINTAIN",
  subtitle: "intent.md is not loaded in full when you only point to it. Right now @intent.md loads all of it, every session.",
  calm: true,
  steps: [
    { text: "Note the size of your memory files", prompt: "/context", after: "“Memory files”: about 1k tokens." },
    { text: "Make CLAUDE.md cheaper", prompt: "Make the root CLAUDE.md as cheap as possible: move everything about levels into levels/CLAUDE.md, and replace the @intent.md line with a plain pointer (\"What we're building is in intent.md\"), so intent.md isn't loaded into every session. Show me both files before you save them.", after: "Claude shows both files. Read them, then say yes." },
    { text: "Start fresh and look again", cmds: ["/clear", "/context"], after: "Memory files: about 200 tokens." },
    { text: "Does Claude still know the level rules?", prompt: "What are the rules for a new level?", after: "Yes: it reads them when it needs them." },
    { text: "Save it", prompt: "Commit and push both CLAUDE.md files." }
  ],
  expected: "A short root CLAUDE.md, and a levels/CLAUDE.md that only loads when it's needed.",
  keyPoints: [
    "Measure first with /context",
    "Nested CLAUDE.md per folder",
    "Root: only what every session needs",
    "Measure again"
  ],
  notes: "In the dry run (28 Oct): memory files went from 1k to 176 tokens. Claude also copied 'Don't commit or push without asking' into the root CLAUDE.md, because that rule only lived in intent.md. After /clear it still answered the level rules correctly.\n\nIn the dry run the real cost was the @intent.md line: it pulled the whole intent.md (about 1k tokens) into every session. Replacing it with a plain pointer took memory files from 1.2k to 188 tokens. Before and after with /context makes the saving visible. A CLAUDE.md in a subfolder is read when Claude works with files in that folder, not at the start. If the room's CLAUDE.md is still tiny, the saving is small; the habit is the point. Note: files pulled in with @ in the root CLAUDE.md load at the start, so moving them into a nested CLAUDE.md is what actually defers them.\n\nWhy now: /context shows it: your CLAUDE.md costs tokens in every session, even when you're not working on levels.\nWhat you see: Fewer tokens at the start. The level rules still apply in levels/.\nLook inside: Which lines did Claude move, and where to?"
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 4: A test for the levels, and Bobby                       */
/* ---------------------------------------------------------------------- */

{ // Slide 109
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 26: A test for every level",
  kicker: "DAY 2 · ASSIGNMENT 26 · TEST",
  subtitle: "Every level harder than the one before, and none of them unplayable.",
  calm: true,
  steps: [
    { text: "Write the test on a new branch", prompt: "Create a branch level-test. Write tests/levels.test.js. For every level file that exists: it follows spec.md, every value stays between its minimum and maximum, each level is harder than the one before and never easier, the snake never starts in an obstacle and food never lands on one. Show me the tests before you save them.", after: "Tests change: last session's ask rule asks you. Say yes." },
    { text: "All green?", prompt: "!npm test" },
    { text: "Break it on purpose", prompt: "On purpose, to see the test catch it: make level 3 faster than spec.md allows.", after: "The hook runs the test: red, with the file and the allowed range. Then Esc Esc to undo." },
    { text: "Save it", prompt: "Commit, push and open a merge request. Don't merge it.", after: "Merge it yourself, then !git checkout main && git pull" }
  ],
  expected: "A green level test that turns red when a level is too fast.",
  keyPoints: ["Test phase", "Harder, never easier", "Limits keep it playable", "Break it on purpose: red", "Esc Esc to undo"],
  notes: "Why now: three levels exist, two more are coming by command. You need a check that doesn't depend on someone playing every level.\nWhat you see: tests/levels.test.js, green for levels 1 to 3. A too-fast level 3 turns it red.\nLook inside: open the test. Which line checks 'harder than the one before'?\n\nThe break-on-purpose step is the point: a test is only worth something if you've seen it fail. Dry run (28 Oct): 'Make level 3 as fast as possible' did not break anything: Claude (with the create-snake skill, which it picked by itself after a 'Use skill?' question) offered the fastest values spec.md allows. Asking for faster than spec.md allows gave 2 red tests naming the file, the value and the range. The level test Claude wrote: 19 checks, 40 of 40 green, trial-run on copies with planted mistakes first. In the next assignment this test becomes Bobby's main tool."
},

{ // Slide 110
  title: "Meet Bobby, your level-checker",
  kicker: "DAY 2 · PART 4 · AGENTS",
  subtitle: "A subagent is one file. Ask for it, and Claude writes it. Bobby is its character: a helper with its own head.",
  type: "concept",
  visual: { stepThrough: ".sd-step, .slide-main > .tagline", bot: "wave", place: "in", botIn: ".sd-tree", botTag: "Bobby", skillDoc: {
    tree: { label: "Where it lives", root: "aether-snake/", rootNote: "your project, in git", rows: [
      ["├── ", "spec.md", "Bobby checks against it", "dim"],
      ["├── ", "levels/", "the levels Bobby reads", "dim"],
      ["├── ", "tests/levels.test.js", "the test Bobby runs", "dim"],
      ["└── ", ".claude/", "", "dir"],
      ["    ├── ", "settings.json", "", "dim"],
      ["    ├── ", "skills/", "folders, one per skill", "dim"],
      ["    └── ", "agents/", "new: a file per subagent", "dir"],
      ["        └── ", "level-checker.md", "on the right →", "skill"]
    ] },
    file: { label: "Inside the file", name: ".claude/agents/level-checker.md", parts: [
      { kind: "front", label: "Frontmatter", sub: "the same idea as a skill, between the --- lines", lines: [
        ["---", ""],
        ["name: level-checker", "the subagent's name"],
        ["description: Bobby, the level-checker.", "when Claude hands"],
        ["  Checks the levels against spec.md.", "it a job"],
        ["tools: Read, Grep, Glob, Bash", "read and run npm test"],
        ["model: haiku", "a smaller, cheaper Claude"],
        ["---", ""]
      ] },
      { kind: "body", label: "Body", sub: "its instructions: who it is and how it works", lines: [
        ["You are Bobby, the level-checker.", ""],
        ["1. Run npm test.", ""],
        ["2. Read spec.md and every levels/level-N.js.", ""],
        ["3. Each level harder than the one before? Playable?", ""],
        ["4. Change nothing. End with GO or NO-GO + reasons.", ""]
      ] }
    ] },
    loadWide: true,
    load: { title: "What happens when you ask Bobby?", moments: [
      { when: "1 · Claude Code starts", label: "in your context", chips: [["level-checker: frontmatter", "front"]], note: "Like a skill: only the frontmatter. A new subagent loads at the start, so restart once after making it." },
      { when: "2 · You: “Ask Bobby to check the levels.”", label: "Bobby's own context: a separate Claude", chips: [["level-checker: body", "body"], ["spec.md", "file"], ["level-1.js … level-3.js", "file"], ["npm test output", "file"]], note: "Bobby reads, runs and thinks by itself. None of this lands in your context." },
      { when: "3 · Bobby is done", label: "back in your context", chips: [["the report: GO or NO-GO + reasons", "front"]], note: "Only the short report comes back. You decide what happens next." }
    ], why: "Skill or subagent? A skill runs in your conversation, so everything it reads fills your context. A subagent works apart and only sends back its report." }
  } },
  tagline: "A subagent reports. It approves nothing.",
  keyPoints: ["Click: folder, frontmatter, body, what happens", "One file: .claude/agents/level-checker.md", "Bobby is its character, named in the description", "Frontmatter: name, description, tools, model", "Own context: only the report comes back", "Restart once after making it"],
  notes: "Say: In the next assignment you ask Claude to make Bobby, the level-checker. This is what Claude will create: one file, level-checker.md, and Bobby is the character inside it. The robot on the slide has his name tag.\n\nClick 1, the folder: one new folder, .claude/agents/, with one file per subagent. A skill is a folder with SKILL.md in it; a subagent is just one .md file. In git, so the team gets Bobby too. The grey files are what Bobby works with: spec.md, the levels and the level test.\n\nClick 2, the frontmatter: the same idea as a skill. name is the subagent's name: level-checker, what it does. Bobby is its character: the description and the body say 'Bobby', so 'ask Bobby' works. description tells Claude when to hand it a job. tools is what it may use: here reading and Bash for npm test, no Edit or Write. model: Haiku, a smaller and cheaper Claude, enough for checking against a spec.\n\nClick 3, the body: its instructions, written as who it is and how it works. It ends with GO or NO-GO, and changes nothing.\n\nClick 4, what happens: at the start only the frontmatter is loaded, like a skill; a new subagent only loads when Claude Code starts, so restart once. When you ask, Claude hands the job over: Bobby is a separate Claude with its own context window and its own agent loop. It reads the files, runs the test and thinks, and none of that fills your context. Only the short report comes back. That's the difference with a skill: a skill is instructions your own Claude follows inside your conversation; a subagent is another worker.\n\nWatch for: Bobby gets Bash to run npm test, so 'change nothing' is partly an instruction, not a hard wall. Say it out loud. The exact frontmatter Claude writes may differ a little (tools as a list, a colour): fine.\n\nThe decision to merge stays yours."
},

{ // Slide 111
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 27: Bobby, your level-checker",
  kicker: "DAY 2 · ASSIGNMENT 27 · TEST",
  subtitle: "A second opinion on every level, in its own context.",
  calm: true,
  steps: [
    { text: "Ask Claude to make Bobby", prompt: "Create a branch level-checker. Create a subagent in .claude/agents/level-checker.md, named level-checker. Its character is Bobby: the description starts with “Bobby, the level-checker”. Job: run tests/levels.test.js, read the level files and spec.md, and check that every level is harder than the one before and still playable. Tools: read files and npm test, no edits. Model: Haiku. Bobby ends with GO or NO-GO and the reasons, and approves nothing. Show me the file first.", after: "Say yes to the file." },
    "Open .claude/agents/level-checker.md in VS Code. Same --- frontmatter as a skill: which tools may Bobby use?",
    { text: "Restart so Bobby loads: /exit, then", prompt: "claude --continue", after: "Back in auto mode? Shift+Tab to “manual mode on”.", warn: true },
    { text: "Ask Bobby", prompt: "Ask Bobby to check the levels that exist.", after: "Probably NO-GO: levels 4 and 5 don't exist yet. Read the reasons." },
    { text: "Save it", prompt: "Commit, push and open a merge request. Don't merge it.", after: "Merge it yourself, then !git checkout main && git pull" }
  ],
  expected: "Bobby checks your levels and answers GO or NO-GO, without changing anything.",
  keyPoints: ["Made by asking Claude", "Same frontmatter as a skill", "Read-only + npm test", "Restart to load", "GO / NO-GO, you decide"],
  notes: "Why now: you have a test and three levels. Checking them all is reading work that fills your session; let a helper do it.\nWhat you see: .claude/agents/level-checker.md, and a report ending in GO or NO-GO.\nLook inside: /context after Bobby's check: did Bobby's reading land in your context, or only the report?\n\nDry run (28 Oct, 2.1.312): Bobby ran as a background agent (about 30 s) and said NO-GO because spec.md wants five levels and only three exist; levels 1 to 3 each passed. He also spotted that the level test doesn't require all five levels: Bobby reads more than the test does. Claude itself mentioned /agents as a way to load him without a restart.\n\nWatch for: 'Agent type level-checker not found' means no restart yet. Not tried in a dry run yet with the name level-checker: if 'Ask Bobby' doesn't find it, say 'Ask the level-checker'. Bobby gets Bash to run npm test, so 'no edits' is partly an instruction, not a hard wall: say it out loud. Haiku is enough for checking against a spec, and cheaper."
},

{ // Slide 112
  title: "Overview: what does what",
  kicker: "DAY 2 · PART 4 · OVERVIEW",
  subtitle: "Everything you made in two days, on one sheet.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true },
  cards: [
    { title: "💬 Prompt", body: "Loaded: now\nStarted by: you\nOwn context: no" },
    { title: "📄 CLAUDE.md", body: "Loaded: every session\nStarted by: Claude Code\nOwn context: no" },
    { title: "🧰 Skill", body: "Loaded: the top always, the instructions when used\nStarted by: Claude, or you with /name\nOwn context: no" },
    { title: "🤖 Subagent", body: "Loaded: when called\nStarted by: Claude\nOwn context: yes" },
    { title: "🔗 Workflow", body: "Loaded: when you type /name\nStarted by: you\nOwn context: no, it calls agents" },
    { title: "🪝 Hook", body: "Runs: at a fixed moment\nStarted by: Claude Code\nOwn context: no, runs outside" },
    { title: "🔒 Permission", body: "Checked: before every action\nStarted by: Claude Code\nOwn context: no" }
  ],
  tagline: "Guides Claude: prompt, CLAUDE.md, skill. Enforces: hook, permission.",
  keyPoints: ["One sheet: point back here", "When is it loaded?", "Who starts it?", "Own context: only the subagent", "Guide vs enforce"],
  notes: "The reference sheet for the rest of the day and for the support days. Three questions per mechanism: when is it loaded, who starts it, does it have its own context? Only the subagent has its own context. Hooks and permissions don't ask Claude anything: Claude Code enforces them. The workflow is next: it's a skill you start yourself, and it calls the other skills and Bobby."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Part 5: The workflow                                           */
/* ---------------------------------------------------------------------- */

{ // Slide 113
  title: "A workflow: one command that runs the others",
  kicker: "DAY 2 · PART 5 · WORKFLOW",
  subtitle: "Your three skills, the test and Bobby, in a fixed order, with a gate at the end.",
  type: "concept",
  visual: { stepThrough: ".or-step, .slide-main > .tagline", orchestra: {
    ladder: { title: "Who does the steps?", rungs: [
      { name: "Prompt", text: "you say every step yourself" },
      { name: "Skill", text: "one step, written down once" },
      { name: "Subagent", text: "a separate worker that checks and reports" },
      { name: "Workflow", text: "one command runs them all, in order, with a gate", hl: true }
    ] },
    front: { name: ".claude/skills/build-game-levels/SKILL.md", lines: [
      { t: "---" }, { t: "name: build-game-levels" }, { t: "argument-hint: [N]", hl: true }, { t: "disable-model-invocation: true", hl: true }, { t: "---" }
    ] },
    flow: { title: "What one command does", steps: [
      { kind: "you", label: "You", title: "/build-game-levels 5" },
      { kind: "wf", label: "The workflow", title: "Looks: levels 1 to 3 exist", text: "makes a new branch, then builds level 4 and level 5" },
      { kind: "skills", label: "For each level: your 3 skills", chips: ["create-food", "create-snake", "create-obstacles"] },
      { kind: "test", label: "The test", title: "npm test", text: "every level within spec.md" },
      { kind: "agent", label: "The subagent, in its own context", title: "Bobby: GO or NO-GO", split: [
        { kind: "go", title: "GO", text: "commit, push, merge request" },
        { kind: "nogo", title: "NO-GO", text: "stop, show why, nothing pushed" }
      ] },
      { kind: "you", label: "You", title: "Review and merge", text: "the human gate stays yours" }
    ] }
  } },
  tagline: "A workflow is a skill that conducts the others. Only you start it.",
  keyPoints: ["Click: the ladder, then the run", "Prompt, skill, subagent, workflow", "The workflow calls skills, a test and Bobby", "Bobby is the gate: NO-GO pushes nothing", "disable-model-invocation: only you start it"],
  notes: "Say: Today you climbed a ladder. Level 2: you said every step yourself, in prompts. Level 3: each step was a skill. Then Bobby, a separate worker that checks. Now the top: a workflow, one command that runs all of them in a fixed order, with a gate at the end. That's orchestration: Claude conducts your skills and your subagent, you only start it and approve the result.\n\nClick 1, the ladder, with the workflow's frontmatter under it. A workflow is a skill too: a folder build-game-levels/ with a SKILL.md. Two lines are new. argument-hint: [N] shows in the / menu that you type a number after it; the number reaches the instructions as $ARGUMENTS. disable-model-invocation: true means Claude may never start it by itself: it pushes, so only you start it.\n\nClick 2, the run. You type /build-game-levels 5. The workflow looks which levels exist (1 to 3), makes a new branch and builds level 4, then level 5, each with your three skills. Then npm test. Then Bobby, in his own context: GO means commit, push and a merge request on GitLab; NO-GO means stop and show why, nothing leaves your laptop. At the end you review and merge: the human gate.\n\nAt work: a release pipeline or a definition of done: the same steps, the same checks, every time, and a person signs off.\n\nNext: Assignment 28, build the workflow and let it make levels 4 and 5."
},

{ // Slide 114
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 28: Levels 4 and 5 with one command",
  kicker: "DAY 2 · ASSIGNMENT 28 · BUILD",
  subtitle: "Build the workflow once. Then let it build the levels.",
  calm: true,
  steps: [
    { text: "Make the workflow", prompt: "Create a branch workflow. Make a workflow skill in .claude/skills/build-game-levels/: /build-game-levels N looks which levels exist, makes a new branch, and makes the missing levels up to N with the create-food, create-snake and create-obstacles skills, each a little harder than the one before. Then it runs npm test and asks the level-checker subagent (Bobby) to check. Only on GO: commit, push and open a merge request on GitLab. On NO-GO: stop and show me why. It only runs when I type it, never by itself. Show me SKILL.md before you save it.", after: "Find disable-model-invocation and $ARGUMENTS." },
    { text: "A guard before Claude works on its own: no edits on main", prompt: "Add a hook to .claude/settings.json: before Claude edits or writes a file, check the git branch. On main, block it with the message: Make a branch first. Show me the hook before you save it.", after: "Try it: !git checkout main, ask for a small change: blocked. Then !git checkout workflow" },
    { text: "Save the workflow and the hook first: it wants a clean start", prompt: "Commit, push and open a merge request.", after: "Merge it, then !git checkout main && git pull" },
    { text: "Run it", prompt: "/build-game-levels 5", after: "Watch: first a new branch (on main the hook would stop it), three skills per level, npm test, Bobby, then the push question." },
    "Bobby said GO? Review the merge request on GitLab, check index.html?level=4 and ?level=5, then merge"
  ],
  expected: "Levels 4 and 5 by one command, checked by Bobby, merged by you. Claude stays off main.",
  keyPoints: ["Stacked: skills, test, Bobby, MR", "Only by /build-game-levels", "Hook: no edits on main, whatever happens", "The push still asks", "You still merge"],
  notes: "Why now: every level is the same steps. Typing them every time is where mistakes creep in. And the workflow is the first time Claude works on its own for a few minutes: branch, files, commit, push. So first a guard that doesn't depend on Claude remembering a rule.\n\nThe hook: last session's hook ran the test after every edit. This one runs before every edit and can say no: a PreToolUse hook on Edit and Write that checks git branch and blocks on main. At work main is protected in GitLab; this does the same on your laptop, for Claude. It only blocks Claude's file edits, not git itself, so checkout, pull and merge on main still work. The try-it on main works because the new hook isn't committed yet: uncommitted changes come along to main. Dry run (28 Oct): on main the edit was blocked with 'Make a branch first.', and Claude made a branch by itself and did the edit there; delete that branch afterwards.\nWhat you see: one command; Claude names each skill and Bobby as it goes; a merge request link at the end.\nLook inside: SKILL.md of build-game-levels. Which skills and which agent does it call, in what order?\n\nDry run (28 Oct, 2.1.312, manual mode): /build-game-levels 5 found levels 1 to 3, showed a plan (values per level, obstacles as a pinwheel), made branch levels-4-to-5, wrote both level files and the script tags, ran npm test (52 of 52) and a reachability check, ran Bobby in the background (GO, with what he could not check), then asked before the commit and before the push. About 3 minutes plus the yes-clicks. With a GitLab origin it opens the merge request through git push options or MCP. It read the three skills as files instead of calling them: same result.\n\nWatch for: if the workflow's own SKILL.md is uncommitted, its clean-start check stops it at step 1: that's why step 2 exists. Skills load without a restart. Expect a few minutes per level."
},

{ // Slide 115
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 29: Make Bobby say no",
  kicker: "DAY 2 · ASSIGNMENT 29 · TEST",
  subtitle: "A gate is only worth something if you've seen it close.",
  calm: true,
  steps: [
    { text: "Ask for a level that breaks the rules", prompt: "/build-game-levels 5, but on purpose, to test the gate: first throw away level 5, then make the new level 5 faster than spec.md allows. Ask Bobby to check as well.", after: "npm test turns red, Bobby says NO-GO. No commit, no push." },
    "Check: was anything pushed? Look on GitLab: no new branch, no merge request",
    { text: "Clean up", prompt: "Restore the original level 5, go back to main and delete the branch you made.", after: "Your five levels are back." }
  ],
  expected: "Bobby said NO-GO, and nothing reached GitLab.",
  keyPoints: ["Break the rule on purpose", "Test red, Bobby NO-GO", "Nothing pushed", "Like Day 1's rescue"],
  notes: "Same idea as last session's rescue: make it go wrong on purpose, in a safe place. The limits in spec.md, the level test and Bobby together stop the bad level before it leaves the laptop.\n\nWhy now: you've seen the workflow say GO. Trust comes from seeing it say NO.\nWhat you see: a red test, a NO-GO with the reason, and no push.\nLook inside: which line in spec.md did the new level 5 break?\n\nDry run (28 Oct, 2.1.312): /build-game-levels 6 doesn't work for this: the workflow and spec.md only allow levels up to 5, so it stops before Bobby. Throwing away level 5 and rebuilding it too fast did reach all gates: the hook flagged the write, npm test failed 1 of 52 ('startDelay is 30, must be 40 to 150'), Bobby said NO-GO, nothing was committed or pushed. Bonus moment: Bobby miscounted the obstacles (30 instead of 26) and the main Claude corrected him. Bobby can be wrong: that's why he approves nothing."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Extras                                                         */
/* ---------------------------------------------------------------------- */

{ // Slide 116
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Extra: a stopwatch and enemies",
  kicker: "DAY 2 · EXTRA",
  subtitle: "Done early? Make your levels even harder, the way you made the others.",
  calm: true,
  steps: [
    { text: "A stopwatch", prompt: "Add a time limit to every level: level 1 has 4 minutes, each next level 10 seconds less. Add it to spec.md and to the level test first, then build it.", after: "Red first, then green." },
    { text: "Enemies", prompt: "Make a skill create-enemies: from level 4 on, enemies move across the board like in Space Invaders, a few more per level, within new limits in spec.md. Add it to the build-game-levels workflow.", after: "Then run /build-game-levels again." },
    "Bobby GO? Merge request, review, merge"
  ],
  expected: "A stopwatch per level, and enemies from level 4, checked by Bobby.",
  keyPoints: ["Spec and test first", "A fourth skill", "Workflow extended", "Bobby still the gate"],
  notes: "For fast finishers, solo. Both follow today's pattern: spec.md first, the test first, a skill, then the workflow. The stopwatch matches the board on the Show your game slide (level 1 = 4:00, then 10 seconds less per level)."
},

{ // Slide 117
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Extra: an arcade hall, or Pac-Man",
  kicker: "DAY 2 · EXTRA",
  subtitle: "Still going? Pick one.",
  calm: true,
  steps: [
    { text: "An arcade hall", prompt: "Make arcade.html: a hall with a tile for my Snake and for the games of two classmates (I'll give you their GitLab project links), and a scoreboard next to it with the best score per game.", after: "Ask two classmates for their GitLab link first." },
    { text: "Or: Pac-Man with your own skills", prompt: "Build Pac-Man in a new folder pacman/, with levels. Use my create-food and create-obstacles skills for the dots and the maze, and add a skill create-ghosts for the enemies.", after: "Which skills worked for a different game without changes?" }
  ],
  expected: "An arcade hall with a scoreboard, or a Pac-Man built with your skills.",
  keyPoints: ["Solo, for the fastest", "Arcade: other people's games", "Pac-Man: are your skills reusable?"],
  notes: "For fast finishers, solo. The arcade hall reads other people's projects through GitLab: ask for the links in the chat. Pac-Man tests how reusable the skills really are: a description written only for Snake won't be picked for Pac-Man, which is a good discussion."
},

/* ---------------------------------------------------------------------- */
/* DAY 2 — Closing                                                        */
/* ---------------------------------------------------------------------- */

{ // Slide 118
  title: "Awards and debrief",
  kicker: "DAY 2 · CLOSING",
  subtitle: "First the awards. Then three honest questions.",
  type: "recap",
  visual: { stagger: "pop", stepThrough: true },
  cards: [
    { title: "🐍 Hardest level", body: "Still playable. Voted by whoever played it." },
    { title: "✅ First time GO", body: "Bobby said GO on your first run." },
    { title: "🧰 Best skill", body: "A description so clear Claude picks it every time." },
    { title: "🕹️ Best extra", body: "Stopwatch, enemies, arcade hall or Pac-Man." },
    { title: "Debrief", body: "What failed, and why?\nWhat goes in the spec next time?\nWhere do you see this at Worldline?" }
  ],
  keyPoints: ["Quick, loud awards", "Reward good specs and checks, not just playing", "Ten minutes of debrief", "Link to Days 5 to 7"],
  notes: "Keep the awards quick and loud, then take the debrief seriously: ten minutes. What failed, and why? What would you put in spec.md next time? Where do you see this in your own work? Close by pointing at Days 5 to 7: the same loop, with real stakes."
},

{ // Slide 119
  title: "What you built",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Together, we created:",
  type: "recap",
  layout: "recap",
  visual: { recapKeys: true, bot: "happy", place: "aside" },
  items: [
    { label: "Your own Snake repo on GitLab, built in layers" },
    { label: "intent.md, spec.md, CLAUDE.md and PROGRESS.md" },
    { label: "Permissions, a deny rule and two hooks" },
    { label: "Five levels, each one harder" },
    { label: "Three skills, a level test and Bobby" },
    { label: "A /build-game-levels workflow" },
    { label: "Branches and merge requests, like at work" }
  ],
  keyPoints: ["Items appear on their own", "No clicking needed", "Don't talk over them", "Let the room recognise its work"],
  notes: "The items appear on their own, one by one — no clicking needed. Let them come in without talking over them, and let the room recognise their own two days of work in the list."
},

{ // Slide 120
  title: "What you can now do",
  kicker: "DAY 2 · CLOSING",
  subtitle: "How Claude Code works, and why the boundaries matter.",
  type: "recap",
  layout: "recap",
  visual: { levelUp: true },
  items: [
    { label: "Walk the SDLC loop with Claude Code." },
    { label: "Plan first, and choose the right mode." },
    { label: "Tell what guides Claude (CLAUDE.md, skills) from what enforces (permissions, hooks)." },
    { label: "Put things where they cost the fewest tokens." },
    { label: "Build skills, subagents and a workflow." },
    { label: "Work with branches, merge requests and reviews." },
    { label: "Let a check stop the work when it says no." },
    { label: "Keep human review and handover." }
  ],
  keyPoints: [
    "Understanding checklist, not artefact list",
    "Name the distinction out loud",
    "How Claude Code works, why boundaries matter"
  ],
  notes: "This is the understanding checklist, not the artefact checklist (that was the previous slide) — the distinction is worth naming out loud. If there's time, ask someone which line they will use first in their own work."
},

{ // Slide 121
  title: "The five support days",
  kicker: "PREVIEW · SUPPORT DAYS",
  subtitle: "The support programme builds on this foundation.",
  type: "context",
  tagline: "Preview only — the support days go deeper.",
  visual: { art: 'timeline', supportDays: true },
  cards: [
    { title: "Day 3 · Agent workflows in n8n", body: "" },
    { title: "Day 4 · Build your own agent: the Claude Agent SDK", body: "" },
    { title: "Day 5 · The AI-native software lifecycle", body: "" },
    { title: "Day 6 · Hackathon: a thin slice for your team", body: "" },
    { title: "Day 7 · Hackathon: ship and present", body: "" }
  ],
  keyPoints: ["Preview only","Different facilitator's territory","Avoid detail questions here"],
  notes: "Preview only, matching the Day 1 recap's pattern — this is a different facilitator's territory starting next time, don't get pulled into detail questions here."
},

{ // Slide 122
  title: "Where could your team be helped first?",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Now that you know what's possible: which recurring task costs your team time or creates unnecessary uncertainty?",
  type: "context",
  visual: { bot: 'think', place: 'beside',
    highlight: [{ in: 'title', text: 'helped first', tone: 'orange' }, { in: 'subtitle', text: 'time', tone: 'mark' }, { in: 'subtitle', text: 'uncertainty', tone: 'purple' }] },
  cards: [
    { title: "Describe the problem", body: "Leave the solution open: that's for the support days." }
  ],
  prompt: "Where could your team be helped first? Which recurring task costs you time or creates unnecessary uncertainty? Describe the current problem. Leave the solution open for now.",
  keyPoints: ["Bridge to the support days","Per team, five minutes","Describe the problem, not the solution","Write it down: it's input for Day 3"],
  notes: "The bridge from the two teaching days to the support days. The programme outcome (Day 1) is that every team builds something with AI that works in their team; this is where they pick the problem. Now that they've seen what Claude Code can do, each team takes five minutes: which recurring task costs time or creates uncertainty? Describe the current problem, leave the solution open: do not let it become a design session. Write the answers down: they're the input for the support days."
},

{ // Slide 123
  title: "Human responsibility",
  kicker: "DAY 2 · CLOSING",
  subtitle: "AI can inspect, propose, create, transform and check.",
  type: "context",
  layout: "compare",
  visual: { handover: 'People remain responsible.' },
  columns: [
    { title: "AI can", items: [
      "inspect",
      "propose",
      "create",
      "transform",
      "check"
    ] },
    { title: "People remain responsible for", items: [
      "the goal",
      "permitted context",
      "approval boundaries",
      "factual and technical review",
      "the impact of the final decision"
    ] }
  ],
  keyPoints: ["The sentence to leave with","Slow down here","Don't rush near the end"],
  notes: "This is the single sentence to leave the room with above all others — slow down here, don't rush it because it's near the end of a long two days."
},

{ // Slide 124
  title: "Final reflection",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Complete these statements.",
  type: "recap",
  tagline: "Complete each statement for yourself.",
  visual: { sentences: true, quietTimer: 3 },
  cards: [
    { title: "I can now…", body: "" },
    { title: "I still need help with…", body: "" },
    { title: "One workflow I want to investigate is…", body: "" },
    { title: "The first task I would hand to Claude is…", body: "" },
    { title: "The human decision must remain…", body: "" }
  ],
  keyPoints: ["End here","Back to the flipchart from Day 1","A minute of silence if possible","Let people write five sentences","Logistics only afterwards"],
  notes: "First go back to the flipchart from Day 1 (What do you hope to learn?): which hopes were met, which questions are still open? Park the open ones for the support days. Then end here, in silence for a minute if the room will tolerate it, before any closing announcements — let people actually write their five sentences rather than rushing to logistics."
},


/* ---------------------------------------------------------------------- */
/* PARKED — replaced or not used (hidden)                                 */
/* ---------------------------------------------------------------------- */

{ // Slide 97
  hidden: true,
  title: "Parked · Where skills live, and who starts them",
  kicker: "DAY 2 · PART 2 · SKILLS",
  subtitle: "Teach Claude a method once, reuse it every time.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "one thing you call", tone: "orange" }] },
  cards: [
    { title: "Project", body: ".claude/skills/ in your repo. Goes into git: the whole team gets it." },
    { title: "Personal", body: "~/.claude/skills/ in your home folder. Only you, in every project." },
    { title: "Built in and plugins", body: "Claude Code comes with a few. Plugins add more. Type / to see them all." },
    { title: "Who starts it", body: "Claude, when your task matches the description. Or you, by typing /name. With disable-model-invocation: true, only you." }
  ],
  tagline: "A skill is one thing you call, and it runs. It doesn't start Claude Code or run in the background.",
  keyPoints: ["Project skills: shared through git", "Personal: ~/.claude/skills", "Type / to see them", "Claude picks by description, or /name", "One thing you call, and it runs"],
  notes: "Same two places as CLAUDE.md and settings.json: the project (shared with the team through git) and your home folder (only you). Built-in skills come with Claude Code; plugins bundle skills, agents and hooks from others. Type / to show the list live.\n\nWho starts a skill: Claude, when your request matches the description; or you, by typing /name. For a skill that does something you don't want to happen by surprise (push, deploy), switch off Claude's automatic use with disable-model-invocation: true in the frontmatter.\n\nThe tagline is the guardrail worth repeating: a skill is a method Claude applies inside your conversation. It's not a background process, and it's not a separate agent: that comes after lunch (Bobby)."
},

{ // Slide 100
  hidden: true,
  title: "Parked · Quiz: where does it go?",
  kicker: "DAY 2 · QUIZ",
  subtitle: "Claude must follow an instruction in every session of this project. Where do you put it?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "In your prompt, every time." },
    { title: "B", body: "In CLAUDE.md." },
    { title: "C", body: "In a skill." },
    { title: "D", body: "In a comment in your code." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first", "Answer: B, CLAUDE.md", "Skill = a recurring method, not a standing instruction"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is B: CLAUDE.md is read in every session, so standing instructions live there. A is the problem the room felt with every Snake layer: repeating yourself. C is close but different: a skill holds a recurring method that runs when needed, not an instruction that always applies."
},

{ // Slide 98
  hidden: true,
  title: "Parked · Prompt, CLAUDE.md and skill",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Three different mechanisms, three different jobs.",
  type: "concept",
  visual: { lifespan: [{ kind: 'now', icon: '💬', label: 'now' }, { kind: 'always', icon: '📄', label: 'every session' }, { kind: 'recurring', icon: '🧰', label: 'whenever that task comes up' }] },
  cards: [
    { title: "Prompt", body: "The task Claude should perform now." },
    { title: "CLAUDE.md", body: "Project instructions that apply across sessions." },
    { title: "Skill", body: "A reusable method for one type of task." }
  ],
  keyPoints: ["Three mechanisms, three jobs","The guide column of the map, zoomed in","Point back here after lunch","Point back here during work"],
  notes: "All three are text Claude reads; they differ in when they apply. A prompt is this task, CLAUDE.md is every session, a skill is loaded when a task matches its description. None of them enforces anything: that stays in settings.json, as you saw last session with the permissions and the hook (guide vs enforce). Assignment 25 (a shorter CLAUDE.md) builds on exactly this difference."
},

{ // Slide 125
  hidden: true,
  title: "Parked · Permissions and Plan Mode",
  kicker: "DAY 1 · PART 2 · PERMISSIONS",
  subtitle: "Look first. Change later.",
  type: "concept",
  visual: { art: 'gate' },
  cards: [
    { title: "Permissions", body: "Permissions control which actions Claude Code may perform without further approval." },
    { title: "Plan Mode", body: "Plan Mode lets Claude investigate and prepare a plan before implementation." }
  ],
  tagline: "Start with exploration. Review the plan before allowing changes.",
  keyPoints: ["Who decides what it may do? You", "It asks before edits and commands", "Yes once, yes always, or no", "Read what you approve", "Plan mode = look, don't touch", "Shift+Tab switches mode", "Rule: plan first, then approve changes"],
  notes: "This comes before anyone runs Claude Code on a task: from the demo on, they will see approval questions. Open with the question: Claude Code works on your real files and your real terminal, so who decides what it may do? You do. Permissions: reading and looking around is low risk, but before it edits a file or runs a command it stops and asks. You answer yes (just this once), yes and don't ask again for this kind of action, or no (and tell it what to do instead). Link back to the terminal slide: you don't need to know every command, but you must understand what you approve. Standing rules (always allow the tests, never touch this folder) live in the settings; /permissions shows them. Modes: the current mode shows at the bottom of Claude Code and Shift+Tab switches between them. Normal asks before each edit or command, which is best while learning. Accept edits lets file edits through without asking, while other actions still ask. Plan mode is read-only: Claude explores and comes back with a plan, and nothing changes until you approve it. Auto mode, if your setup has it, runs without asking each time, but risky actions are still checked and can be blocked. There is also a skip-all-permissions option for automated setups; mention that it exists and that we don't use it. Click to open the gate: this gate is you. Close on the tagline as the rule for both days: every assignment starts in plan mode, and changes only happen after you have read the plan. Optional story: when a hard-to-undo action such as deleting a repository is requested, Claude Code's safety check can block it even after a yes in chat, and the human has to run it themselves; that is permissions working as designed. Before class, open Claude Code on your teaching laptop and press Shift+Tab a few times, so the modes you name match what the room will see (they depend on the version and company settings)."
},

{ // Slide 126
  hidden: true,
  title: "Parked · Watch: Claude Code explores a project",
  kicker: "DAY 1 · PART 2 · LIVE DEMO",
  subtitle: "The reliable prompt in action, on a project it has never seen. Watch what Claude Code does, without changing anything.",
  type: "concept",
  dark: true,
  visual: { art: 'prompt', promptMarks: ["Don't change anything", "the file it comes from", "OPEN"] },
  cards: [
    { title: "Goal", body: "Explain what this application does and how it is structured." },
    { title: "Context", body: "I just cloned this practice repository and have never seen it." },
    { title: "Constraints", body: "Don't change anything. Don't use or ask for any Worldline information." },
    { title: "Check", body: "For each claim, name the file it comes from. Mark what you cannot confirm as OPEN." }
  ],
  prompt: "Goal: explain what this application does and how it is structured, so I can work on it.\nContext: I just cloned this practice repository and have never seen it.\nConstraints: Don't change anything. Don't use or ask for any Worldline information.\nDone when: I know what the app does, where things live and how to run it.\nOutput: a short overview. For each claim, name the file it comes from.\nCheck: mark anything you cannot confirm as OPEN.",
  keyPoints: ["Trainer demo: the room watches", "Point out: reads, tools, evidence, OPEN", "Point out: it asks before it runs", "Nothing changes: read-only", "Live run fails: press B for plan B"],
  notes: "This is a trainer demo: you run it live on the projector, the room watches. Use the practice repo on your own laptop (git clone https://github.com/jyse/aetherlink-classroom-starter.git); participants don't need it. While it runs, narrate what you see: it reads files, asks before it runs a command (that's the permission you just explained), builds up context, ties claims to evidence, marks OPEN, and changes nothing. Before class, run this exact prompt once on your own machine. If your live run fails (no network, no auth, a crash), say so plainly and press B for the captured run, then walk through it as if it were live; the teaching point survives either way. Point out that it's the reliable prompt from Part 1: goal, context, constraints, check. Later today they use the same pattern on their own game."
},

{ // Slide 127
  hidden: true,
  title: "Parked · A tour of Claude Code",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "Open VS Code next to your terminal, so you see every file Claude touches.",
  type: "concept",
  visual: { stepThrough: true, bot: 'wave', place: 'beside',
    highlight: [{ in: 'subtitle', text: 'next to your terminal', tone: 'orange' }] },
  cards: [
    { title: "The input", body: "Type in plain language and press Enter. Esc stops Claude halfway." },
    { title: "When it goes wrong", body: "Read the error. Paste it back to Claude and ask what it means." },
    { title: "The bottom of the screen", body: "Which mode you are in, and your status line. Shift+Tab switches the mode." }
  ],
  keyPoints: ["Live on the projector","VS Code beside the terminal","Input: plain language, Esc stops","Errors: paste back, ask","Bottom line: mode + status line"],
  notes: "Do this live on the projector. Open VS Code next to the terminal so the room sees the files Claude touches. The input: type a normal sentence and press Enter; Esc stops Claude halfway. When something goes wrong: read the error, paste it back to Claude and ask what it means. At the bottom of the screen: which mode you are in and your status line; Shift+Tab switches the mode."
},

{ // Slide 128
  hidden: true,
  title: "Parked · Assignment: Your first CLAUDE.md",
  kicker: "DAY 1 · ASSIGNMENT",
  subtitle: "Tell Claude Code who you are. One rule is enough to start.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "You end up with", body: "a CLAUDE.md about you\none rule Claude follows\na new session that knows who you are" }
  ],
  stepsHeading: "Do this:",
  steps: ["Type claude.", "Ask Claude to create your personal CLAUDE.md in ~/.claude/.", "Tell it who you are and what you do at Worldline.", "Add one rule, for example: “When I build frontend, use Tailwind.”", "Open the file in VS Code and read it.", "Start a new session and ask: “What do you know about me?”"],
  expected: "A short CLAUDE.md about you, and a new session that knows who you are.",
  prompt: "Create my personal CLAUDE.md in ~/.claude/.\n\nWho I am: [your name], [your role] at Worldline, in [your team], working on [what you work on].\nRule: [for example: when I build frontend, use Tailwind].\n\nKeep it short. Show me the file before you save it.",
  keyPoints: ["Show it once on the projector","Who you are + one rule","Role only: no customer data or internal documents","Check it in a new session","Timer: press ▶ Start"],
  notes: "Show it once on the projector, then let everyone write their own. Who you are and what you do at Worldline, plus one rule, for example: when I build frontend, use Tailwind. Keep it to your role: no customer data, passwords or internal documents. Claude shows the file before saving; read it, approve it, and open it in VS Code. Then start a new session and ask 'What do you know about me?' to see that it works."
},

{ // Slide 129
  hidden: true,
  title: "Parked · Look around for yourself",
  kicker: "DAY 1 · BEFORE LUNCH",
  subtitle: "10 to 15 minutes. Try things, ask Claude about Claude Code.",
  type: "practice",
  layout: "exercise",
  stepsHeading: "Try this:",
  cards: [
    { title: "You end up with", body: "your way around the / menu\none thing that surprised you" }
  ],
  steps: ["Type / and scroll through the menu.", "Try /model and look at the options.", "Type /context: what fills your context window right now?", "Ask Claude: “What can you help me with in Claude Code?”", "Write down one thing that surprised you."],
  expected: "You know your way around Claude Code, and you've seen your own context window.",
  keyPoints: ["10–15 minutes, free","Walk around and help","Collect surprises for after lunch","Then lunch"],
  notes: "Ten to fifteen minutes to look around on their own. Walk around and help. Ask a few people what surprised them and keep those for after lunch. Then lunch."
},

{ // Slide 130
  hidden: true,
  title: "Parked · Assignment 1: Your own game repo",
  kicker: "DAY 1 · ASSIGNMENT 1",
  subtitle: "Connect Claude Code to GitLab and make a repo for your game.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "You end up with", body: "GitLab connected to Claude Code\na new repo in your personal space\nthat repo on your laptop" }
  ],
  stepsHeading: "Do this:",
  steps: ["Add the GitLab MCP server. Your trainer gives you the command.", "Start claude, type /mcp and log in to GitLab.", "Ask Claude: “Which GitLab projects can you see?”", "Make a new repo for your game in your personal space: through Claude, or on the GitLab page.", "Clone it to your laptop and start claude inside it."],
  expected: "Claude Code can see GitLab, and your empty game repo is on your laptop.",
  prompt: "Create a new project called aether-game-[your name] in my personal GitLab space: private, with only a README. Show me what you will do before you do it.",
  keyPoints: ["MCP command: from the trainer","/mcp → log in","Check GitLab access before the course","Can't create through Claude? Use the GitLab page","Everyone ends inside their own empty repo"],
  notes: "Now the MCP from the previous slides becomes real. Everyone adds the GitLab MCP server (the trainer gives the command), starts claude, types /mcp and logs in. A first check: ask Claude which GitLab projects it can see. Then each person makes a new repo for the game in their personal space; if Claude can't create projects through the MCP, they use the GitLab page. Clone it and start claude inside it. Check before the course that every participant, managers included, has GitLab access. Anyone without it today starts with an empty local folder (git init) and connects GitLab later; the rest of the afternoon works the same."
},

{ // Slide 131
  hidden: true,
  title: "Parked · Assignment 2: Build your Snake",
  kicker: "DAY 1 · ASSIGNMENT 2",
  subtitle: "Layer by layer, in your own repo. No skills yet.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Then make it yours", body: "a different character\na sound when you eat\nwalls or a maze" }
  ],
  stepsHeading: "Do this:",
  steps: ["In your game repo: type claude and switch to plan mode.", "Layer 1: ask for the skeleton. Read the plan, approve, play.", "Next layers: controls, food and score, game over. One prompt per layer, play after each.", "Ask for one small test in tests/: the snake grows when it eats (npm test).", "Make it yours: pick one from the box.", "Commit every layer that works."],
  expected: "A Snake you can play, built in layers, with one test that passes.",
  prompt: "Goal: the first layer of a Snake game in this repo: a page with a grid and a snake that moves on its own.\nContext: plain HTML, CSS and JavaScript, no frameworks. Controls, food and score come in later layers.\nConstraints: only this layer. Keep it small.\nDone when: I open the page and the snake moves.\nShow me the plan first.",
  keyPoints: ["One prompt per layer","Plan mode, then play","The test goes in tests/","Make it yours","Commit every working layer"],
  notes: "Now everyone builds their own. The Example prompt is layer 1 in the reliable-prompt form; the next layers they write themselves. One prompt per layer, play after each. The test matters for later: ask for one small test in tests/ that checks the snake grows when it eats, runnable with npm test. The hook and the goals this afternoon use it. Then make it theirs: a different character, a sound, walls or a maze. Commit every layer that works, so they can always go back."
},

{ // Slide 132
  hidden: true,
  title: "Parked · Assignment 5: House rules for your game",
  kicker: "DAY 1 · ASSIGNMENT 5",
  subtitle: "Decide what Claude may always do here, and what it may never do.",
  type: "practice",
  layout: "exercise",
  visual: { shotLabel: "Rules for this project", oneCol: true },
  cards: [
    { title: "Never", body: "git push --force: it overwrites history on GitLab\nrm -rf: no deleting folders\nedit tests/: the test is the referee" },
    { title: "Always", body: "npm test: safe, and you run it all the time" }
  ],
  stepsHeading: "Steps:",
  steps: ["Decide for yourself: what may Claude always do here, and what may it never do?", "Ask Claude to write your rules into .claude/settings.json. Read the file before you approve.", "Restart Claude and type /permissions. Are your rules there?", "Test them: “run the tests” (no question asked), then “force push my work” (blocked)."],
  expected: "The tests run without asking. Force push, rm -rf and edits to tests/ are blocked, even when you ask for them.",
  prompt: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm test)\"],\n    \"deny\": [\n      \"Bash(git push --force*)\",\n      \"Bash(rm -rf *)\",\n      \"Edit(tests/**)\"\n    ]\n  }\n}",
  keyPoints: ["You decide the rules, Claude writes them","Read settings.json before approving","/permissions shows what's active","Test both: allowed and blocked","tests/ is the referee"],
  notes: "Each rule stops a mistake that can really happen. No force push: it overwrites the history in their GitLab repo. No rm -rf: Claude never deletes folders on its own. No edits to tests/: the test is the referee; asked to 'make the tests pass', Claude might otherwise change the test instead of the game. Always allow npm test: approving a safe command over and over only teaches people to click yes without reading. Each participant decides first, then Claude writes the file; the Example prompt shows a good result (don't hand it out before they've decided). The test is the point: 'force push my work' must be refused by Claude Code itself, not by Claude being polite. If /permissions doesn't show the rules, restart Claude in the project folder."
},

{ // Slide 133
  hidden: true,
  title: "Parked · Assignment 6: Let the test check Claude's work",
  kicker: "DAY 1 · ASSIGNMENT 6",
  subtitle: "After every change, the test runs by itself.",
  type: "practice",
  layout: "exercise",
  visual: { shotLabel: "What happens", oneCol: true },
  cards: [
    { title: "The hook", body: "After every file edit: run npm test." },
    { title: "The test", body: "Ask Claude to make the snake stop growing.\nThe hook catches it.\nClaude can't change the test, so it tells you." }
  ],
  stepsHeading: "Steps:",
  steps: ["Ask Claude to add a hook to .claude/settings.json that runs npm test after every file edit.", "Read the hook before you approve. Type /hooks to check it's there.", "Test it: ask Claude to make the snake stop growing when it eats.", "Watch the hook catch it. What does Claude do now?"],
  expected: "A change that breaks the game gets caught, without you asking for the check.",
  prompt: "\"hooks\": {\n  \"PostToolUse\": [\n    {\n      \"matcher\": \"Edit|Write\",\n      \"hooks\": [\n        { \"type\": \"command\", \"command\": \"npm test >&2 || exit 2\" }\n      ]\n    }\n  ]\n}",
  keyPoints: ["Same settings.json as assignment 5","Hook runs after every edit","Read it before approving","Break it on purpose","Rule + hook: Claude must tell you"],
  notes: "The hook goes into the same .claude/settings.json as the house rules, next to permissions. After every file edit (PostToolUse, matcher Edit|Write), Claude Code runs npm test. The '|| exit 2' part matters: if the test fails, the error goes back to Claude, so Claude sees it. The test makes it visible: asking the snake to stop growing breaks the test on purpose. Claude can't change the test (tests/ is denied), so the right outcome is that Claude tells you the request conflicts with the test. That is rules and hooks working together. If the hook doesn't fire, check /hooks and restart Claude in the project folder."
},

{ // Slide 134
  hidden: true,
  title: "Parked · Assignment 7: Let Claude run to a goal",
  kicker: "DAY 2 · ASSIGNMENT 7",
  subtitle: "Your house rules and your hook stay on. Claude works on its own until the goal is met.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Still active", body: "rules: force push, rm -rf and tests/ are blocked\nhook: npm test runs after every edit\nnew: one goal for one feature" }
  ],
  stepsHeading: "Steps:",
  steps: ["Type: /goal the snake gets faster at 5 and 10 points, and npm test passes", "Don't steer. Watch: when does the hook run? When does the goal clear?", "Type /goal while it runs, and read the status.", "When it's done, play the game yourself.", "Bonus: ask Claude to force push. Your rule still blocks it."],
  expected: "The goal cleared by itself, the test ran after every edit, and the game speeds up when you play it.",
  prompt: "/goal the snake gets faster at 5 and 10 points, and npm test passes",
  keyPoints: ["Given goal, one line","Don't steer: watch it work","The hook fires after edits","/goal shows the status","Goal met ≠ approved: play it"],
  notes: "The first time Claude really works on its own for a while, but inside the fences they built in assignments 5 and 6. Name it out loud: autonomy is safe because the rules and the check are already in place. The goal is given word for word (Example prompt). While it runs, point at the test output after each edit: that's their hook. Typing /goal mid-run shows the status. When the goal clears, they still play it themselves; the goal being met is not their approval. The bonus shows the deny rule holds even while Claude runs on its own."
},

{ // Slide 135
  hidden: true,
  title: "Parked · Assignment 8: Write your own goal",
  kicker: "DAY 2 · ASSIGNMENT 8",
  subtitle: "A feature you choose, from a goal you write yourself.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your goal must say", body: "what the feature does\nwhere you see it in the game\nwhat happens at game over and restart\nwhich check proves it works" }
  ],
  stepsHeading: "Steps:",
  steps: ["Pick a feature: a high score that stays after reload, a pause key, or walls that appear per level.", "Write your own /goal for it. No given prompt this time.", "Check it against the box: could a test or a person check every part? If not, sharpen it.", "Run it. Your hook keeps checking every edit.", "When the goal clears, play it yourself. Post your goal in the team chat: did it work, and why?"],
  expected: "Your game has a new feature, built from a goal you wrote yourself, and you played it to check.",
  keyPoints: ["Own goal, no given prompt","Self-check: is it checkable?","Hook keeps running","Play it yourself","Goals in the team chat: compare"],
  notes: "Last step down the ladder for this block: they write the goal themselves. The self-check against the box is the learning moment: “add a high score” is too vague; “the game shows a high score that stays after reload, resets only with a button, and npm test passes” is a goal a model can check. When the goal clears, they still play it. Everyone posts their goal in the team chat. Close by picking one good and one weak goal from the chat and saying why the good one worked."
},

{ // Slide 136
  hidden: true,
  title: "Parked · Assignment 9: Turn your Snake into a skill",
  kicker: "DAY 2 · ASSIGNMENT 9",
  subtitle: "Let Claude write the recipe from how you built your Snake.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your skill says", body: "when to use it\nthe tech: HTML, CSS, JavaScript\nthe layers, one at a time\na test per layer\nwhen it's done" }
  ],
  stepsHeading: "Do this:",
  steps: ["Open your Snake repo and start claude.", "Ask Claude to look at your Snake and write a skill: build-arcade-game.", "Read the SKILL.md. Missing a step you always did? Add it.", "Check it's there: type / and look for your skill."],
  expected: "A build-arcade-game skill in your repo that describes how you build a game, layer by layer.",
  prompt: "Look at how my Snake game is built in this repo, and at the layers I built it in. Write a skill called build-arcade-game in .claude/skills/build-arcade-game/SKILL.md that describes that method, so I can build my next game the same way: the tech, one layer at a time, a test per layer, and when a layer is done. Show me the skill before you save it.",
  keyPoints: ["Claude writes it, you check it","Add what's missing","Type / to see it","This is the recipe for Pac-Man"],
  notes: "Claude writes the recipe from their own work: it reads the Snake repo and turns the method into a SKILL.md. The important part is the reading: is the step they always did in there? If not, they add it. Then type / and check the skill shows up. This skill builds Pac-Man in the next assignment."
},

{ // Slide 137
  hidden: true,
  title: "Parked · Assignment 10: Build Pac-Man with your skill",
  kicker: "DAY 2 · ASSIGNMENT 10",
  subtitle: "Same method, next game. This time the skill does the explaining.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Compare with last session", body: "How many prompts did you need?\nWhat did you not have to explain?\nWhat would you add to the skill?" }
  ],
  stepsHeading: "Do this:",
  steps: ["In your game repo: a new folder for Pac-Man.", "Ask Claude to build Pac-Man with your build-arcade-game skill.", "Read the plan: does it follow your layers?", "Play after every layer. Your hook and rules still run.", "Something you had to explain again? Add it to the skill."],
  expected: "A Pac-Man you can play, built with your own skill, and a skill that got better.",
  prompt: "Use my build-arcade-game skill to build Pac-Man in the folder pacman/. Start with layer 1 and show me the plan first.",
  keyPoints: ["Same method, fewer words","Plan follows the layers?","Hooks and rules still active","Improve the skill as you go"],
  notes: "Same method, next game. The skill does the explaining, so the prompt is one line. Point out that the plan follows their own layers, and that the rules and hook from last session still run. The real learning is the last step: whatever they had to explain again goes into the skill. Ask afterwards: how many prompts did you need compared to Snake?"
},

{ // Slide 138
  hidden: true,
  title: "Parked · Assignment 11: Levels from MD files",
  kicker: "DAY 2 · ASSIGNMENT 11",
  subtitle: "Every level is a file with its own rules. Claude builds the level from the file.",
  type: "practice",
  layout: "exercise",
  visual: { mdfile: 0, mdName: 'levels/level-2.md' },
  cards: [
    { title: "A level file", body: "Speed\nObstacles\nGoal\nWhat happens when you win" }
  ],
  stepsHeading: "Do this:",
  steps: ["Write levels/level-2.md yourself: speed, obstacles, goal.", "Ask Claude to build level 2 from that file.", "Play it. Does it follow your rules?", "Write level 3 differently, and build it the same way.", "Bonus: let Claude turn this into a skill: build-level."],
  expected: "Two levels built from your own MD files, and the rules in the file are what you see in the game.",
  prompt: "Build level 2 of my game from levels/level-2.md. Follow the rules in that file exactly, and tell me if a rule is unclear instead of guessing. Show me the plan first.",
  keyPoints: ["The rules live in a file, not in the prompt","Claude asks when a rule is unclear","Play: does it match?","Bonus: build-level skill"],
  notes: "The rules of a level live in a file, not in the prompt: speed, obstacles, goal, what happens when you win. Claude builds the level from the file and must say when a rule is unclear instead of guessing. That's the same idea as a spec or a ticket at work. Bonus: turn 'build a level from a file' into its own skill."
},

{ // Slide 139
  hidden: true,
  title: "Parked · The arcade",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "One game is one prompt. Five games and one scoreboard is teamwork.",
  type: "concept",
  visual: { stepThrough: true, bot: 'happy', place: 'aside',
    highlight: [{ in: 'tagline', text: 'agree', tone: 'orange' }] },
  cards: [
    { title: "Scoreboard", body: "One place that receives every score and shows the top 10." },
    { title: "Connection", body: "At game over, every game sends: player name, picture, points, game name." },
    { title: "Start screen", body: "One menu: pick your avatar, pick a game, play." }
  ],
  tagline: "That only works if you agree first.",
  keyPoints: ["Why: no single prompt builds this","Three layers: scoreboard, connection, start screen","The format is the agreement","Collected on one laptop, on the big screen"],
  notes: "Why the arcade: Claude can build one game in one prompt. Five games from five people talking to one scoreboard can't: it needs one agreement that everyone keeps, and building in layers. That is the software lifecycle and the team work we want them to feel. The agreement is already made for them: the arcade starter has one fixed contract (arcade.js) and a skill that connects a game to it. Three layers: the scoreboard, the connection every game uses at game over, and the start screen. Everything runs on one laptop, the arcade, shared on the big screen.",
},

{ // Slide 140
  hidden: true,
  title: "Parked · Assignment 12: Set up the arcade",
  kicker: "DAY 2 · ASSIGNMENT 12",
  subtitle: "The agreement is ready: one contract, one skill. Put it on GitLab and read it together.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "In the starter", body: "arcade.js: the contract\nthe arcade-score skill\nserve.js: the arcade server\nan empty scoreboard and start screen\nan example game" }
  ],
  stepsHeading: "Do this:",
  steps: ["Manager: create a repo arcade in your GitLab space, give your team access.", "Manager: copy the arcade starter in (from your trainer), commit and push.", "Everyone: clone it and read the arcade-score skill. What does every game send?", "On the arcade laptop: npm test, then node serve.js. Open localhost:8080.", "Play the example game once. Its score is the first one in the arcade."],
  expected: "The arcade runs on the arcade laptop, the tests pass, and everyone knows what their game must send.",
  prompt: "Read the arcade-score skill in this repo. Explain in five lines what my game must do to join the arcade, and what I must never change.",
  keyPoints: ["The agreement is given: arcade.js + skill","Manager sets up the repo","Everyone reads the skill","npm test, node serve.js","Example game = first score"],
  notes: "The agreement is already made: one contract (arcade.js) and one skill (arcade-score) that every game uses. The manager creates the arcade repo on GitLab, copies the starter in and pushes; the trainer has the starter (https://github.com/AetherLink-bv/aetherlink-classroom-slides/tree/main/arcade-starter). Everyone clones it and reads the skill: the Example prompt lets Claude summarise it in five lines. On the arcade laptop: npm test (it tests the contract), then node serve.js and open localhost:8080. Play the example game once so there is a first score. No install is needed: serve.js uses Node only."
},

{ // Slide 141
  hidden: true,
  title: "Parked · Assignment 13: Build the scoreboard",
  kicker: "DAY 2 · ASSIGNMENT 13",
  subtitle: "On the arcade laptop: fill in the empty scoreboard.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Done when", body: "it shows the top 10\nwith picture, name, game and points\nit survives a reload" }
  ],
  stepsHeading: "Do this:",
  steps: ["Arcade laptop, arcade repo: start claude.", "Ask Claude to fill in scoreboard.html with Arcade.topScores(10). Plan first.", "Test with the example game: game over twice.", "All visible? npm test passes? Commit and push."],
  expected: "A scoreboard that shows the example scores in the top 10, with picture and name.",
  prompt: "Fill in scoreboard.html: show Arcade.topScores(10) as a top 10, each row with the player's picture, name, game and points. Don't change arcade.js. Plan first.",
  keyPoints: ["On the arcade laptop", "Fill in, don't start from scratch", "Test with the example game", "arcade.js stays untouched"],
  notes: "The scoreboard is half there: scoreboard.html is an empty page with the contract loaded. Claude fills it in with Arcade.topScores(10). Test with the example game before any real game is connected. arcade.js is the contract and stays untouched; if Claude wants to change it, say no. Mostly backender and manager, with the rest preparing their game.",
},

{ // Slide 142
  hidden: true,
  title: "Parked · Assignment 14: Connect your game",
  kicker: "DAY 2 · ASSIGNMENT 14",
  subtitle: "At game over, your game sends its score to the scoreboard.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "The order", body: "one game first\ntest it\nthen the next one" }
  ],
  stepsHeading: "Do this:",
  steps: ["Copy your game into the arcade repo: games/<game>-<your name>/, with your picture.", "Ask Claude to connect it with the arcade-score skill. Plan first.", "npm test passes, and your game is in localhost:8080/games.json.", "On the arcade laptop: play one round. Is your score on the board, with your picture?", "Works? Push, and the next player goes. Doesn't? Fix it first."],
  expected: "Every game sends its score, and every score shows on the scoreboard with the right picture.",
  prompt: "Use the arcade-score skill to connect my game in games/[your folder]. Plan first.",
  keyPoints: ["Your game into games/<game>-<name>/", "The skill does the connecting", "Check /games.json", "One game first, then the next"],
  notes: "Every player copies their game into the arcade repo, in games/<game>-<name>/, with their picture. The skill does the connecting: game.json, the contract script, one Arcade.submitScore at game over. One game first: connect, check /games.json, play one round on the arcade laptop, check the scoreboard. Only when that works does the next game join. When something breaks, it is almost always the score: the contract rejects it with a clear message.",
},

{ // Slide 143
  hidden: true,
  title: "Parked · Assignment 15: The start screen",
  kicker: "DAY 2 · ASSIGNMENT 15",
  subtitle: "One menu for the whole arcade.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "The start screen shows", body: "every player's avatar\nevery game\nthe top 10" }
  ],
  stepsHeading: "Do this:",
  steps: ["On the arcade laptop: ask Claude to fill in index.html. Plan first.", "Pick your avatar, pick a game, play.", "After game over: back to the start screen, with the new top 10.", "Commit and push."],
  expected: "From one start screen, everyone can pick their avatar and play every game.",
  prompt: "Fill in index.html as the arcade's start screen: every player's avatar and every game from Arcade.games(), and the top 10 from Arcade.topScores(10). Picking a game opens it. Don't change arcade.js. Plan first.",
  keyPoints: ["Frontender-led","Avatar → game → play → back","Top 10 on the start screen","Then: the tournament"],
  notes: "Mostly the frontender, on the arcade laptop. index.html is an empty start screen with three sections: players, games and the top 10. Arcade.games() gives every connected game with its player and picture. Pick your avatar, pick a game, play, and after game over you're back with the new top 10. When this works, the arcade is ready for the tournament.",
},

{ // Slide 144
  hidden: true,
  title: "Parked · Bonus: the game coaches you",
  kicker: "DAY 2 · BONUS",
  subtitle: "A skill that gives a comment after every round.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "For example", body: "“Three times the left wall. Try going right.”\n“New personal record!”\n“You were faster than yesterday.”" }
  ],
  stepsHeading: "Do this:",
  steps: ["Ask Claude to write a skill: arcade-coach.", "The coach looks at the round that just ended and gives one short comment.", "Make it fun, never mean.", "Play a round and read the comment."],
  expected: "After every round your game gives one short, fun comment that fits what you just did.",
  prompt: "Write a skill called arcade-coach. After every round it looks at what happened (score, how you lost, your previous best) and shows one short, fun comment in the game. Fixed comments are fine: no AI connection in the game itself. Only change files in my own game folder. Show me the skill first.",
  keyPoints: ["Optional, for fast teams","Skill + memory + creativity","No AI connection in the game","Fun, never mean"],
  notes: "Optional, for teams that are done early. The game comments on itself after every round: skills, memory and creativity together. The comments are fixed texts chosen by rules: there is no AI connection inside the game itself."
},

{ // Slide 145
  hidden: true,
  title: "Parked · Three views of the same work",
  kicker: "DAY 1 · PART 2 · WORKING METHOD",
  subtitle: "Zoom in: lifecycle → task → loop.",
  type: "concept",
  layout: "compare",
  visual: { art: 'boxes', link: { 0: ['Build', 'Test'], 1: ['Create', 'Test'] } },
  columns: [
    { title: "SDLC — outer", items: [
      "Plan", "Design", "Build", "Test", "Deploy", "Maintain"
    ], foot: "Contains the working method ↓" },
    { title: "Working method — middle", items: [
      "Explore", "Plan", "Create", "Test", "Human review", "Handoff"
    ], foot: "Contains the agent loop ↓" },
    { title: "Agent loop — inner", items: [
      "Observe", "Decide", "Act", "Check", "Repeat or stop"
    ] }
  ],
  tagline: "The agent loop happens within a task. A task sits within the team's software lifecycle.",
  keyPoints: ["Say the nesting left to right","SDLC Build+Test contains method Create+Test","Which contains the whole agent loop","Only the outer SDLC ring is new","Close on the tagline as written"],
  notes: "This is the reconciled three-tier diagram — say the nesting out loud, left to right: Build+Test of the SDLC (outer) contains Create+Test of the working method (middle), which contains the whole agent loop (inner). The middle tier is this course's own working method from slide 40, unchanged; the inner tier is slide 39's agent loop, unchanged. Only the outer SDLC ring is new context — it places one bounded assignment inside the team's whole software lifecycle. Close on the tagline exactly as written; it's the sentence to leave the room with before moving to slide 42."
},

{ // Slide 146
  hidden: true,
  title: "Parked · Get the Aether Library on your laptop",
  kicker: "DAY 1 · PART 2 · HANDS-ON",
  subtitle: "The practice repo you'll build on today. Everyone clones their own copy.",
  type: "context",
  visual: { cmdCards: [0, 1], oneCol: true,
    highlight: [{ in: 'tagline', text: 'inside the folder', tone: 'orange' }] },
  cards: [
    { title: "1 · Clone it", body: "git clone https://github.com/jyse/aetherlink-classroom-starter.git\ncd aetherlink-classroom-starter" },
    { title: "2 · Start Claude Code in that folder", body: "claude" }
  ],
  tagline: "Thumbs up when Claude Code is running inside the folder.",
  prompt: "git clone https://github.com/jyse/aetherlink-classroom-starter.git\ncd aetherlink-classroom-starter\nclaude",
  keyPoints: ["Everyone clones their own copy", "Copy commands: Example prompt", "claude inside the repo folder", "Count the thumbs up", "Stuck: watch a neighbour, fix at lunch"],
  notes: "Walk the room through it together, not self-paced. Everyone clones the starter repo and starts Claude Code inside that folder; the commands are in the Example prompt panel to copy. The repo is aetherlink-classroom-starter; its on-screen name is Aether Library, which we properly introduce after lunch. No npm install yet: for exploring, the files are enough; running the app comes later. Anyone stuck (git missing, no access) follows along on a neighbour's screen and gets fixed at lunch."
},

{ // Slide 147
  hidden: true,
  title: "Parked · settings.json",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "Claude Code's settings live in a file you can read.",
  type: "concept",
  visual: { code: 0 },
  cards: [
    { title: "~/.claude/settings.json", body: "{\n  \"model\": \"sonnet\",\n  \"permissions\": {\n    \"deny\": [\"Bash(git push *)\"]\n  }\n}" },
    { title: "Where it lives", body: "~/.claude/settings.json: you, in every project\n.claude/settings.json: this project, shared with your team\n.claude/settings.local.json: this project, only you" }
  ],
  tagline: "This afternoon you write your own rules in here.",
  keyPoints: ["Open it in VS Code","model: the model it starts with","deny: never allowed","Three places: you, project, project-only-you"],
  notes: "Open the file in VS Code. Settings are plain JSON. In this example: the model Claude Code starts with, and one thing it is never allowed to do: push. There are three places: in your home folder for you in every project, in the project for the whole team, and settings.local.json for this project but only you. Don't go deeper now: this afternoon everyone writes their own rules in here."
},

{ // Slide 148
  hidden: true,
  title: "Parked · Complete progression",
  kicker: "DAY 2 · CLOSING",
  subtitle: "From your first Claude Code conversation to applying the method during the support days.",
  type: "recap",
  layout: "steps",
  visual: { stepKeys: true, doneSteps: 6 },
  items: [
    { label: "Understand", caption: "Understand AI and Claude Code." },
    { label: "Your game", caption: "Build a game in layers, in your own repo." },
    { label: "Rules and goals", caption: "Set rules Claude can't ignore and a goal it works towards." },
    { label: "A skill", caption: "Turn a repeated method into a skill." },
    { label: "Pac-Man", caption: "Build the next game with your own skill." },
    { label: "The arcade", caption: "Agree as a team and build it together, layer by layer." },
    { label: "Apply it", caption: "Apply the method during the support days." }
  ],
  keyPoints: ["First six steps = the two days","Say that explicitly","Last step: the support days"],
  notes: "The first six steps are exactly what the room just did across the two teaching days — say that explicitly before pointing at the last one, which belongs to the support days."
},

{ // Slide 149
  hidden: true,
  title: "Parked · Assignment 5: Design and build a feature",
  hidden: true, // folded into AetherBOT: the bot is the feature this group designs and builds (press H or use Chapters to show it again)
  kicker: "DAY 2 · ASSIGNMENT 5",
  subtitle: "Dream up features for the Aether Library, pick them as a room, then build one.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Good ideas are", body: "small enough for one hour\nuseful for the whole room\nvisible in the browser\nsafe: no data files changed" }
  ],
  steps: [
    "Plan mode: ask Claude for 5 feature ideas.",
    "Share your best idea with the room.",
    "As a room, pick a few for the board.",
    "Build one of the picked features."
  ],
  expected: "One picked feature working in your Library, planned before it was built.",
  stepsHeading: "Steps:",
  keyPoints: ["Plan mode: ask for five ideas","Each shares best idea, one sentence","Room picks 3 to 5, on board","Build one: plan, approve, build, check","Watch: data file changes, broken pages"],
  notes: "Four rounds. (1) Everyone switches to plan mode (Shift+Tab until it shows Plan) and asks Claude for five feature ideas for their Aether Library; Claude explores the project and proposes, but changes nothing. (2) Each person shares their best idea in one sentence. (3) The room picks three to five and you write them on the board. (4) Everyone builds one of the picked features with the working method: plan, approve, build, check in the browser. Good fits if the room needs a nudge: a theme switcher with 3+ palettes that survives a reload, search on the Glossary page, a “term of the day”. The skill practised is describing what you want to SEE, not what code to write; encourage small rounds (change, look, adjust). Watch for changes that touch the data files (only app code should change) and for features that break another page.",
},

{ // Slide 150
  hidden: true,
  title: "Parked · Sources of context",
  kicker: "DAY 2 · PART 1 · CONTEXT & CLAUDE.MD",
  subtitle: "Where context can come from.",
  type: "concept",
  visual: { art: 'intake', bot: 'head', place: 'aside', tags: { 4: 'later today' } },
  cards: [
    { title: "Current conversation", body: "The task requested now." },
    { title: "Project instructions", body: "CLAUDE.md" },
    { title: "Task files", body: "Brief, ticket or plan." },
    { title: "Repository", body: "Code, tests and documentation." },
    { title: "Connected system", body: "Jira, GitLab or Confluence through approved tools." }
  ],
  keyPoints: ["Where context can come from","Underline the last row","Seed for Part 5 MCP"],
  notes: "The last row is the one to underline — it's the seed for Part 5's MCP content later today."
},

{ // Slide 151
  hidden: true,
  title: "Parked · Meet AetherBOT",
  kicker: "DAY 2 · PART 1 · CONTEXT AND CLAUDE.MD",
  subtitle: "Next, you add a chatbot to your Aether Library.",
  type: "context",
  visual: { stepThrough: true, bot: 'wave', place: 'under' },
  cards: [
    { title: "What it is", body: "A chatbot in your Aether Library that answers questions about AI terms." },
    { title: "Where its answers come from", body: "Your glossary and concept cards: only what you have built so far." },
    { title: "How it works", body: "Plain code in the app, no AI model inside. No API keys, nothing leaves your laptop." },
    { title: "How you build it", body: "CLAUDE.md guides Claude.\nsettings.json protects your data.\n/goal says when it's done." }
  ],
  tagline: "You design it first. Then Claude Code builds it.",
  keyPoints: ["AetherBOT doesn't exist yet: they build it", "Answers only from glossary and cards", "Plain code, no AI model, no API keys", "The rules are for Claude Code, not the bot", "Design first (A6), then build (A7)"],
  notes: "Introduce the chatbot before anyone designs or builds it: the Aether Library gets a chatbot called AetherBOT that answers questions about AI terms. Its answers come only from the glossary and concept cards the participant has built so far, so it grows with their Library. Make the third point explicit: it is plain code in the app, no AI model inside, no API keys, nothing leaves the laptop (the same rule as the rest of the app); Claude Code builds it, the bot itself doesn't call an AI. That's also the trap to name: CLAUDE.md, the permissions and the goal are rules for Claude Code while it builds the bot, not settings inside the bot. The bot only behaves well if Claude Code turns those rules into code. The fourth card is the whole of last session in one build: the guide and enforce columns from the last slide, plus a goal. Then the plan for the next hour: Assignment 6 designs it (CLAUDE.md plus one permission rule), a fresh session tests that design, Assignment 7 builds it towards a goal, and partners try to break each other's bot."
},

{ // Slide 152
  hidden: true,
  title: "Parked · Assignment 6: Design AetherBOT",
  kicker: "DAY 2 · ASSIGNMENT 6",
  subtitle: "You decide what goes in. Claude writes it. You check it and own it.",
  type: "practice",
  visual: { mdfile: 0 },
  layout: "exercise",
  cards: [
    { title: "In CLAUDE.md", body: "what AetherBOT is for\nwhere its answers come from\nits tone of voice\nyour 3 rules\nhow to test it" },
    { title: "In settings.json", body: "\"ask\": [\"Edit(data/**)\"]\nClaude must ask before it changes your data" }
  ],
  steps: [
    "Your own notes: purpose, data (glossary and cards), tone, 3 rules.",
    "Sort it three ways: CLAUDE.md, settings.json or your prompt?",
    "Plan mode: let Claude write the lasting parts into CLAUDE.md.",
    "Read it: delete anything you didn't decide. Change one line yourself.",
    "Add the ask rule for data/ to .claude/settings.json. Check /permissions."
  ],
  expected: "A short CLAUDE.md with only what you decided, and an ask rule that stops Claude from changing your data without asking.",
  keyPoints: ["They decide, Claude writes, they own it", "Rough notes first: purpose, data, tone, 3 rules", "CLAUDE.md = always true; settings = must hold; prompt = this task", "Delete anything they didn't decide", "Ask rule on data/: check /permissions"],
  notes: "This is where the room applies the Sources of context slide and the How the pieces fit map to something of their own: they decide what goes in, Claude writes it, they check it and own it. Step 1 is the real exercise: rough notes in their own words (in the prompt or on paper) on what AetherBOT is for, its data (the glossary and concept cards, nothing else), its tone of voice (friendly teacher, short and to the point, playful…) and 3 rules. Good rules to steer towards: answer only from the glossary and cards, say OPEN when unsure, name the source card, refuse off-topic questions, never repeat personal profile details. Step 2 sorts three ways: what is always true for this project (purpose, data, tone, rules, how to test a change to the bot) goes into CLAUDE.md; what must hold even if Claude forgets goes into settings.json (Claude must ask before it edits anything in data/); the task itself (build it now, where it appears) stays in the prompt for Assignment 7. Step 3 in plan mode, so they see the change before it's written. Step 4 matters most: Claude tends to add rules nobody decided and to make the file long, and a long CLAUDE.md is weaker. Anything they didn't decide gets deleted, and they edit one line by hand, so they know it's just a text file they own. Step 5 is last session's 4b again, one level up: they add an ask rule, Edit(data/**), next to their existing allow and deny rules in .claude/settings.json (an ask rule shows up as an approval prompt every time Claude wants to edit a file in data/; their deny rule on data/fixtures/ still wins, because deny beats ask). /permissions should list it; if not, restart Claude in the project folder. Why ask and not deny: Assignments 9 and 10 write concept cards into data/ on purpose, and the ask rule turns that into a human approval point instead of blocking it. CLAUDE.md says why the bot never changes data; the ask rule makes sure Claude can't do it silently. Show the difference: good, “AetherBOT answers only from data/glossary.json and data/concept-cards.json. If the answer isn't there, it says OPEN.”; too vague, “AetherBOT should be helpful and accurate.” (can't be checked); doesn't belong, “Today: build the chat window and add a quiz command.” (a task, so it goes in the prompt). Tip for later: in a new project, /init writes a first CLAUDE.md from the repo; same rule, read it, delete what isn't true, add what only you know. Nothing is built yet: that's the next assignment.",
},

{ // Slide 153
  hidden: true,
  title: "Parked · Fresh-session test",
  kicker: "DAY 2 · ASSIGNMENT 6 · REVIEW",
  subtitle: "Start a fresh Claude Code session.",
  type: "review",
  tagline: "Type /clear — your files stay. Your neighbour asks the six questions and decides.",
  visual: { lineReveal: 0, stamps: ['PASS', 'REVISE', 'OPEN'], swap: true, highlight: [{ in: 'tagline', text: '/clear', tone: 'orange' }] },
  cards: [
    { title: "Can Claude determine", body: "what AetherBOT is for\nwhich data it may answer from\nwhat it does when it doesn't know\nwhat it must never reveal\nhow to test a change to the bot\nand: does it ask before editing data/?" }
  ],
  check: "Decision: PASS, REVISE or OPEN",
  keyPoints: ["No laptop swap","Everyone types /clear","Neighbour on right asks six questions","Question 6: ask rule, say no","Wrong answer = missing rule"],
  notes: "No laptop swap. Everyone types /clear in their own session — the files stay, the conversation is gone. The neighbour on their right then asks the first five questions and decides PASS, REVISE or OPEN. If Claude can answer from CLAUDE.md alone, the instructions work — the single most convincing proof of the morning. Anything Claude got wrong is a rule missing from the file. Question 6 is a different kind of test: ask Claude to add a test term to data/glossary.json. Claude Code must stop and ask for approval (the ask rule from Assignment 6); they answer no. That's the difference from the map, felt in practice: questions 1–5 test what Claude remembers, the approval prompt is enforced whatever Claude remembers."
},

{ // Slide 154
  hidden: true,
  title: "Parked · Assignment 7: Build AetherBOT",
  kicker: "DAY 2 · ASSIGNMENT 7",
  subtitle: "Let Claude Code build the chatbot from your CLAUDE.md, without repeating the rules in your prompt.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Deliver", body: "a chatbot in your Library\nanswers from your glossary and cards\nfollows your CLAUDE.md rules\n1–2 commands of your own" },
    { title: "Still on", body: "ask rule: data/ untouched\nhook: validate after edits\nnew: a goal for done" }
  ],
  steps: [
    "Plan mode: plan AetherBOT from CLAUDE.md. Don't paste the rules.",
    "Write a goal you can check, e.g. the one under Example prompt.",
    "Approve the plan, set the /goal, then watch. Don't steer.",
    "Add 1–2 commands of your own, like “quiz me”.",
    "Test it yourself: questions that should break a rule."
  ],
  expected: "A chatbot in your Library that answers from your glossary and cards, follows your rules, says OPEN instead of guessing, and never changed your data.",
  prompt: "/goal AetherBOT is on the Library page, answers a question about a term from data/glossary.json, says OPEN for a term that isn't there, refuses an off-topic question, nothing in data/ changed, and npm run validate passes",
  keyPoints: ["Everything from last session in one build", "Don't paste the rules: Claude reads CLAUDE.md", "Plan first, then /goal", "Hook runs, ask rule holds, goal clears", "Goal met ≠ approved: break it yourself"],
  notes: "The payoff of Assignment 6, and all of last session in one build: CLAUDE.md guides, the ask rule and the validate hook enforce, and a goal says when it's done. Participants ask Claude Code to plan AetherBOT and do NOT repeat the rules in their prompt; Claude reads them from CLAUDE.md. If someone pastes the rules in anyway, ask them to delete that and try again. A good plan says where the chat appears in the app and how it finds answers (matching the question to glossary terms and concept cards), and keeps it plain code with no AI model or API. Then the goal: the Example prompt is a checkable one, built from their own rules; strong participants write their own (last session's 4e). Every part of it can be checked: a page, an answer, an OPEN, a refusal, untouched data, a passing command. While it runs, point at the validate output after each edit (their 4c hook). If Claude tries to write to data/, the ask rule stops it and they answer no: the bot reads data, it never writes it. The goal clearing is not approval: the last step is them trying to break it by hand, and the partner round after this does it again. Commands are things like “quiz me” or “compare X and Y”; call them commands, not skills, because Claude Code skills come after the break. When a rule fails, the question is: is the code wrong, or is the rule unclear in CLAUDE.md? Watch for a command with no test, and for rules that only exist in CLAUDE.md but never made it into the code."
},

{ // Slide 155
  hidden: true,
  title: "Parked · Break your partner's bot",
  kicker: "DAY 2 · ASSIGNMENT 7 · REVIEW",
  subtitle: "Ask your partner's AetherBOT five tricky questions.",
  type: "review",
  cards: [
    { title: "Try", body: "a term it should know\na term that is not in the Library\nan off-topic question\na question about someone's profile\na question worded in a tricky way" }
  ],
  check: "Decision: PASS, REVISE or OPEN — did every rule hold?",
  keyPoints: ["Ten minutes, swap laptops","Write down which rule failed","Fix it with Claude Code","After Assignment 10: point out new cards"],
  notes: "Ten minutes, partners swap laptops for this one (it's their own bot, not a fresh Claude session). Each person writes down which rule failed, then fixes it with Claude Code. Note for later: after Assignment 10 the bot can answer from all the new cards, without changes — point that out then."
},

{ // Slide 156
  hidden: true,
  title: "Parked · Assignment 8: Create a second card",
  kicker: "DAY 2 · ASSIGNMENT 8",
  subtitle: "Make a second concept card with a normal prompt, the same way as last session.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Deliver", body: "a second concept card\na list of what you had to repeat" }
  ],
  steps: [
    "Pick a second term.",
    "Use last session's requirements.",
    "Show the draft first.",
    "Note what you had to repeat."
  ],
  expected: "A second concept card created through another one-off prompt — plus a clear sense of what had to be repeated.",
  stepsHeading: "Steps:",
  keyPoints: ["Keep it an ad-hoc prompt, not skill","Add term to glossary first","Same requirements and validation as last session","Check it renders on Library page","No jumping ahead to Assignment 9"],
  notes: "Important: this must stay a normal, ad-hoc prompt, not a skill. Add the term to the glossary first if it isn't there yet, use the same requirements and validation as last session's approved card, and check it renders on the Library page. The inconsistency this creates between people's results, and the list of instructions they had to repeat from scratch, is exactly what motivates building a skill next. Don't let anyone jump ahead to Assignment 9 yet.",
},

{ // Slide 157
  hidden: true,
  title: "Parked · Compare the two runs",
  kicker: "DAY 2 · ASSIGNMENT 8 · REVIEW",
  subtitle: "Which parts should become a shared method?",
  type: "review",
  visual: { lineReveal: 0, diff: [
    { title: 'Run 1 · last session', rows: [{ k: 'Explanation' }, { k: 'Example' }, { k: 'Misunderstanding' }, { k: 'Key points' }, { k: 'Related' }, { k: 'Sources', note: '3' }] },
    { title: 'Run 2 · today', rows: [{ k: 'Explanation' }, { k: 'Example', odd: true, note: 'longer' }, { k: 'Misunderstanding', miss: true, note: 'missing' }, { k: 'Key points' }, { k: 'Related', miss: true, note: 'missing' }, { k: 'Sources', odd: true, note: '1' }] }] },
  cards: [
    { title: "Compare", body: "Which instructions did you repeat?\nDid the cards follow the same structure?\nDid Claude perform the same checks?\nWhich parts should become a shared method?\nWhat must still require human judgement?" }
  ],
  keyPoints: ["Collect two or three different outcomes","Say them out loud","The contrast is the point","Creates the need for a method"],
  notes: "This discussion creates the need for a reusable method — collect two or three genuinely different outcomes from the room out loud before moving to slide 95, the contrast is the point."
},

{ // Slide 158
  hidden: true,
  title: "Parked · Agentic behaviour in the assignment",
  kicker: "DAY 2 · PART 3 · BOUNDED AGENTIC WORK",
  subtitle: "The agent loop inside Assignment 10.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, art: 'loop', loopCaptions: true },
  items: [
    { label: "Observe", caption: "Read the next term and source." },
    { label: "Decide", caption: "Determine whether the information is sufficient." },
    { label: "Act", caption: "Create or revise the card." },
    { label: "Check", caption: "Validate the card." },
    { label: "Repeat or stop", caption: "Continue, mark OPEN or request human input." }
  ],
  keyPoints: ["Agent loop, now made concrete","Use as a live diagnostic","Ask stuck people which step"],
  notes: "This is the agent loop from slide 39, now made concrete in the exact assignment the room is running. Point at the last step: 'Repeat or stop' is where the goal comes in. After each turn a small model checks whether the goal is met; if not, Claude takes the next term. Check is the validate hook, and 'request human input' is the ask rule on data/. Use it as a live diagnostic while circulating: ask a stuck participant which of these five steps their session is stuck on."
},

{ // Slide 159
  hidden: true,
  title: "Parked · Explain It Back",
  kicker: "DAY 2 · PART 4 · LEARNING GAME",
  subtitle: "The Library now contains enough structured knowledge to support a learning game.",
  type: "concept",
  visual: { gameFlow: true },
  cards: [
    { title: "One AI term", body: "Shown from the approved concept cards." },
    { title: "An answer field", body: "The participant types their own explanation." },
    { title: "The approved concept card", body: "Revealed after the explanation is submitted." },
    { title: "Feedback or self-review", body: "Checked against what a good explanation contains." },
    { title: "The next term", body: "Continue through the deck of approved cards." }
  ],
  keyPoints: ["Payoff of Parts 2 to 3","Every card feeds the game","Say the connection explicitly"],
  notes: "This is the payoff of Parts 2–3 — every card the room built now feeds this game. Say that connection explicitly before moving to the starter state. Then name the one new idea of this part: so far their skill created things (cards); the skill they build here checks things (an explanation against a checklist). Same mechanism, different job: a skill can be the reviewer, not only the maker."
},

{ // Slide 160
  hidden: true,
  title: "Parked · Game starter state",
  kicker: "DAY 2 · PART 4 · LEARNING GAME",
  subtitle: "The game works — only the feedback is missing.",
  type: "concept",
  visual: { checklist: 0, gameMock: true },
  cards: [
    { title: "Already available", body: "game page and visual design\nterm card\nanswer field\nSubmit button\nempty feedback area\napproved concept-card data" }
  ],
  tagline: "Participants complete the behaviour.",
  keyPoints: ["Point out what's missing","Submit does nothing yet","Assignment 11 fills the gap"],
  notes: "Point out explicitly what's missing: the game doesn't yet do anything when Submit is clicked. That gap is exactly what Assignment 11 fills."
},

{ // Slide 161
  hidden: true,
  title: "Parked · checklist.md and the term-checker skill",
  kicker: "DAY 2 · PART 4 · LEARNING GAME",
  subtitle: "What a good explanation must contain — and how Claude Code checks it.",
  type: "concept",
  visual: { mdfile: 0, mdName: 'checklist.md', catChips: 1 },
  cards: [
    { title: "checklist.md checks", body: "central meaning\nimportant elements\npractical example\nincorrect claims\nmissing information\nrecommended resources" },
    { title: "Feedback categories", body: "Strong explanation\nPartially complete\nReview this concept\nUnable to evaluate" },
    { title: "Skill #2: term-checker", body: "Reads checklist.md and the latest submission, compares them, and writes structured feedback. The criteria live in checklist.md, not hardcoded in the skill." }
  ],
  keyPoints: ["checklist.md at repo root, not skill","Class-authored, can be extended","Same pattern as create-concept-card","Required for Assignment 11, not optional"],
  notes: "checklist.md lives at the repo root, separate from the skill file — it's participant- and class-authored, and people may edit or extend it. This is deliberately the same pattern as create-concept-card (Skill #1): the reusable method stays generic, the specific criteria live in their own file. The difference: Skill #1 makes something, Skill #2 judges something. For this group, link it to the map: checklist.md plays the role for the game that npm run validate plays for the code, a check outside Claude's own opinion. Say explicitly that this is required behaviour for Assignment 11, not an optional extra — there is no separate 'AI Concept Coach' assignment; this is it."
},

{ // Slide 162
  hidden: true,
  title: "Parked · Assignment 11: Learning game",
  kicker: "DAY 2 · ASSIGNMENT 11",
  subtitle: "The game already works. Build checklist.md and the term-checker skill, then use them.",
  type: "practice",
  visual: { mdfile: 0, mdName: 'checklist.md', phrase: 'Check my latest submission using the term-checker skill.' },
  layout: "exercise",
  cards: [
    { title: "Part A — a good explanation has", body: "central meaning\nessential points\na practical example\nno incorrect claims\nno missing information\nrelevant resources" }
  ],
  steps: [
    "Part A: define a good answer in checklist.md.",
    "Part B: build the term-checker skill.",
    "No API, no external model.",
    "Part C: say the phrase on the right."
  ],
  expected: "The game gives feedback from your own Claude Code session. No API key, no database.",
  stepsHeading: "Steps:",
  keyPoints: ["Full 60 minutes, don't rush","A: checklist.md with four ratings","B: term-checker reads checklist.md","C: say the exact phrase","No rebuild, no API keys, no database"],
  notes: "Longest single assignment of the two days; give it the full 60 minutes and don't rush the wrap-up. Part A: propose what a good “explain this term back” answer contains, based on the approved concept cards, including the four rating categories (Strong explanation, Partially complete, Review this concept, Unable to evaluate); write it to checklist.md once approved. Part B: create .claude/skills/term-checker/SKILL.md; it reads checklist.md (never hardcoded criteria) and the latest submission, compares against the matching concept card and writes structured feedback. Part C: say the exact phrase “Check my latest submission using the term-checker skill.” Do NOT let anyone rebuild the game itself; it already works. Protect this: no API keys, no external model calls, no database; feedback comes entirely from the participant's own Claude Code session reading and writing local files. Watch for people who skip Part C because time is short.",
},

{ // Slide 163
  hidden: true,
  title: "Parked · Quiz: MCP",
  kicker: "DAY 2 · QUIZ",
  subtitle: "What does an MCP connection give Claude?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "A smarter model." },
    { title: "B", body: "A standard way to reach approved tools and data outside your laptop." },
    { title: "C", body: "Permission to change Jira without asking." },
    { title: "D", body: "A replacement for CLAUDE.md." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first", "Answer: B", "C is the one to warn about: read-only, approval"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is B: MCP is the plug, not the brain. C is the misconception to correct firmly: a connection only does what it is allowed to, and in this course it stays read-only, with human approval for anything that would change a system."
},

{ // Slide 164
  hidden: true,
  title: "Parked · Approved connections",
  kicker: "DAY 2 · PART 5 · MCP & WORKPLACE SYSTEMS",
  subtitle: "Connect the approved Worldline services.",
  type: "context",
  visual: { pending: ['Setup steps follow', 'The approved instructions are added after the technical check.'] },
  cards: [
    { title: "Services", body: "Jira\nGitLab\nConfluence" },
    { title: "Inside Claude Code, use", body: "/mcp" }
  ],
  prompt: "/mcp",
  keyPoints: ["Jira, GitLab, Confluence MCP confirmed","Primary path, not stretch goal","Insert approved setup steps","No credentials on the slide","Keep local-fixture fallback ready"],
  notes: "Worldline's MCP access for Jira, GitLab and Confluence is confirmed — this is the real, primary path for Assignment 12, not a stretch goal. Insert the exact Worldline-approved setup instructions here after technical preflight; do not place credentials on this slide. Still keep the local-fixture fallback ready as a safety net in case one participant's connection fails on the day, but plan and pace the room around the real connections working."
},

{ // Slide 165
  hidden: true,
  title: "Parked · Assignment 12: Connected context",
  kicker: "DAY 2 · ASSIGNMENT 12",
  subtitle: "Retrieve one authorised item in read-only mode.",
  type: "practice",
  visual: { sourceTiles: 0, planB: 'DEMO_FALLBACK_A10', planBLabel: 'fixture fallback: fixtures/jira-EX-142.json (fictional)' },
  layout: "exercise",
  cards: [
    { title: "Choose one", body: "one Jira ticket\none GitLab issue or merge request\none Confluence page" }
  ],
  steps: [
    "Fetch one authorised item, read-only.",
    "Explain what it says, with sources.",
    "Mark what's unclear as OPEN.",
    "Change nothing in the system."
  ],
  expected: "No external changes. A sourced, plain-language explanation of one connected item, with unclear points marked OPEN.",
  stepsHeading: "Steps:",
  keyPoints: ["Highest infra risk: verify MCP beforehand","Ask which actions they didn't approve","Fallback: local fixture files","Retrieve, explain, do not modify","Captured example ready (press B)"],
  notes: "Highest infra-risk moment of the two days; verify the MCP connection end-to-end yourself before class. Also ask participants to list which actions the connection could perform that they did not approve. Fallback: if a participant's connection fails, have them use the local fixture files instead and explain those; the teaching point (retrieve, explain, do not modify) survives without a live round-trip. Keep a captured example ready (press B) if several people need the fallback at once.",
},

{ // Slide 166
  hidden: true,
  title: "Parked · From skill to workflow",
  kicker: "DAY 2 · PART 5 · MCP & WORKPLACE SYSTEMS",
  subtitle: "A skill is one reusable method. A workflow chains several — with tools and human checkpoints.",
  type: "concept",
  layout: "steps",
  items: [
    { label: "Trigger", caption: "One sentence starts it: \"start my day\"." },
    { label: "Fetch", caption: "Skill 1 reads your Jira tickets (read-only, via MCP)." },
    { label: "Sort", caption: "Skill 2 groups them: new, blocked, due soon, waiting for you." },
    { label: "Brief", caption: "Skill 3 drafts the morning brief and your top 3 priorities." },
    { label: "You decide", caption: "Human checkpoint: nothing changes without you." }
  ],
  detail: "Click through each step — every step can be its own skill.",
  tagline: "A skill packages one method. A workflow orders skills, tools and checkpoints.",
  keyPoints: ["Three minutes, no more","Workflow chains skills plus MCP","Fixed order, human checkpoint","Same pattern as Aether Library","Assignment follows immediately"],
  notes: "Three minutes, no more. The room has built two single-method skills (create-concept-card, term-checker). A workflow combines several of them, plus a tool connection (MCP), in a fixed order with a human checkpoint. Each step still keeps its own boundaries and stop conditions, and the agent loop from the working method happens inside each step. In practice the workflow can live in one top-level skill (for example day-start) that lists the steps in order, or in a short instruction file that names the skills. Say plainly: this is the same pattern as the Aether Library, pointed at real work — source, structured output, validation, human approval. Close the map: a workflow is the right column putting everything together. Skills from the guide column, permissions from the enforce column (read-only on Jira), MCP for the data, and a human checkpoint at the end. Nothing new to learn, only the order. The assignment follows immediately."
},

{ // Slide 167
  hidden: true,
  title: "Parked · Assignment 13: Day-start workflow",
  kicker: "DAY 2 · ASSIGNMENT 13",
  subtitle: "Connect Jira, list your tickets, and turn it into a workflow that starts your day.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Say it in your own words", body: "the examples in the steps show the idea\nuse your own wording\nnever change a ticket" }
  ],
  steps: [
    "Connect Jira and list your open tickets.",
    "Plan a day-start from 2–3 skills.",
    "Build it, /clear, then “Start my day.”",
    "Swap with a partner and run theirs."
  ],
  expected: "A repeatable day-start workflow: connected, read-only, several skills in a fixed order with a human checkpoint, tested in a fresh session.",
  stepsHeading: "Steps:",
  keyPoints: ["Skills plus MCP become a workflow","Split: fetch, sort, brief","Read-only on Jira","No screen sharing while it runs","Partner copies skill folders, runs it"],
  notes: "The payoff of the day: skills (Assignments 9 and 11) plus MCP (Assignment 12) become a workflow. Example phrases if people get stuck: “List my open tickets. Read-only.” → “Plan a day-start workflow from 2–3 skills: fetch, sort, brief. Show me the plan first.” → “Build those skills and a day-start that runs them in order. Never change a ticket.” then /clear and “Start my day.” A good split is fetch, sort (new, blocked, due soon, waiting for you) and brief (top 3 priorities, anything unclear marked OPEN). Everything stays read-only on Jira. Real tickets can contain sensitive details; tell people not to share their screen while it runs. If a connection fails, debugging it with Claude Code is part of the lesson: paste the exact error and check /mcp. Partner step: a skill is just files, so the partner copies the skill folders into their own project and runs it on their own tickets.",
},

{ // Slide 168
  hidden: true,
  title: "Parked · The same pattern across systems",
  kicker: "DAY 2 · PART 5 · MCP & WORKPLACE SYSTEMS",
  subtitle: "Two systems, one method.",
  type: "concept",
  layout: "compare",
  visual: { pipes: true, same: [2, 3] },
  columns: [
    { title: "Aether Library", items: [
      "Glossary source → concept card → validation → human approval"
    ] },
    { title: "Workplace system", items: [
      "Jira, GitLab or Confluence source → useful work output → validation → human approval"
    ] }
  ],
  tagline: "The source and output change. The design questions remain the same.",
  keyPoints: ["Two days in one sentence","Let it land","Then move to closing"],
  notes: "This is the whole two days compressed into one sentence — let it land before moving into the closing sequence."
},

{ // Slide 169
  hidden: true,
  title: "Parked · Short break",
  kicker: "DAY 2 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "We continue with levels: your game gets harder." }
  ],
  keyPoints: ["Break: say the return time","Press ▶ Start on the timer","Pivot: from recap to new work"],
  notes: "State the actual clock time you'll resume. This is the pivot point of the morning — from looking back to new work: goals first, then skills."
},

{ // Slide 170
  hidden: true,
  title: "Parked · Goals: tell Claude when it's done",
  kicker: "DAY 2 · PART 2 · GOALS",
  subtitle: "Your “done when”, turned into a command Claude keeps working towards.",
  type: "concept",
  visual: { cmdCards: [0], highlight: [{ in: "tagline", text: "checkable", tone: "orange" }] },
  cards: [
    { title: "Set a goal", body: "/goal level 5 is harder than level 4, npm test passes and the verifier finds nothing" },
    { title: "What happens", body: "Claude keeps working, turn after turn. After each turn a small, fast model checks: is the goal met yet?" },
    { title: "Check or stop it", body: "/goal on its own shows the status.\n/goal clear stops it.\nIt clears itself once the goal is met." },
    { title: "Good goal, bad goal", body: "Good: “npm test passes and the verifier finds nothing.”\nBad: “make level 5 fun.”" }
  ],
  tagline: "A goal is only as good as its check: write something checkable.",
  keyPoints: [
    "/goal = a “done when” that keeps running",
    "A small model checks after every turn",
    "/goal shows status, /goal clear stops",
    "Vague goal = endless or wrong work",
    "Still play the result yourself"
  ],
  notes: "Connect this to “Done when” from last session: a goal is exactly that, as a command. Claude keeps going on its own until it's met, inside the same permissions and hooks. After each turn a small, fast model decides whether the condition holds; when it does, the goal clears itself. The lesson is the bad example: “make level 5 fun” can never be checked. A met goal is still not your approval: they play the level afterwards. Before class, check that /goal exists in the version on the participants' laptops."
},

{ // Slide 171
  hidden: true,
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Parked · Assignment 24: Level 5 without watching",
  kicker: "DAY 2 · ASSIGNMENT 24 · BUILD",
  subtitle: "You know the steps work. Let Claude keep going until the check passes.",
  calm: true,
  steps: [
    "Shift+Tab to “accept edits on”: file edits go through, commit and push still ask",
    { text: "Give Claude the goal", prompt: "/goal level 5 is harder than level 4, npm test passes, the verifier finds nothing, and a merge request is open. For this goal you don't need to wait for my approval of plans; commit and push still ask.", after: "Claude works by itself: level, checker, tests, verifier. It still asks before the commit and push." },
    { text: "Want the status?", prompt: "/goal", after: "“Goal achieved” once everything is true." },
    "Shift+Tab back to “manual mode on”. Play level 5 yourself",
    "Happy? Merge the merge request"
  ],
  expected: "Level 5 is harder than level 4, the checks pass, and you merged it after playing it.",
  keyPoints: [
    "A goal = a checkable done-when",
    "Claude runs until it's met",
    "Your permissions and hooks still apply",
    "Play it before you merge"
  ],
  notes: "In the dry run (28 Oct, Claude Code 2.1.312): 'Goal achieved (2m · 2 turns · 15k tokens)'. Claude picked level 5's speed and walls itself, ran the checker, npm test and the verifier, showed 'Goal not yet met… continuing' until the merge request existed, and asked before the commit and push.\n\nWhy the extra sentence in the goal: our CLAUDE.md says 'always show a plan and wait for approval'. In the dry run that rule made Claude stop for approval, the goal check kept finding the goal unmet, and the goal paused. Giving plan approval inside the goal fixed it: 'Goal achieved (3m, 13 turns)'. Accept-edits mode keeps it from stopping at every file; the ask rules still stop it at commit and push, so the human stays in the loop. The goal names checks, not feelings: npm test, the verifier, an open merge request. Claude keeps going, inside the same permissions and hooks; the push still asks. /goal exists in Claude Code 2.1.309; on an older version, the same prompt without /goal plus 'keep going until all of this is true' works almost the same way.\n\nWhy now: The workflow works. Now let Claude run on its own, inside your permissions.\nWhat you see: Claude keeps working by itself until the goal is met, then stops.\nLook inside: Play level 5. A met goal is not your approval."
},

{ // Slide 172
  hidden: true,
  title: "Parked · Watch: Claude in the pipeline",
  kicker: "DAY 2 · PART 2 · DEPLOY",
  subtitle: "The same checks, without anyone at the keyboard.",
  type: "concept",
  visual: { cmdCards: [0], highlight: [{ in: "tagline", text: "this afternoon", tone: "orange" }] },
  cards: [
    { title: "Headless", body: "claude -p \"run the tests and review this change\" --output-format json" },
    { title: "In GitLab CI", body: "A job on every merge request: the tests, then a Claude review as a comment." },
    { title: "Its permissions", body: "--allowedTools decides what it may do. There's no human to ask, so keep it read-only." }
  ],
  tagline: "This afternoon the arcade's pipeline checks every merge request.",
  keyPoints: [
    "claude -p: one prompt, no conversation",
    "JSON output for scripts",
    "In CI on every merge request",
    "No human to ask: read-only tools"
  ],
  notes: "Demo it live: run the claude -p command in a game folder and show the JSON. It takes a few minutes, so start it and talk meanwhile. In the dry run, a tool that wasn't in --allowedTools (the level validator) was simply skipped and reported as 'needed approval': in a pipeline, nobody is there to approve. -p means print mode: one prompt, one answer, no conversation, ideal for scripts and pipelines. In GitLab CI, a job can run the tests and a Claude review on every merge request. Because nobody is there to approve anything, limit it with --allowedTools to read-only tools. This afternoon the arcade's pipeline runs the contract test on every merge request."
},

{ // Slide 173
  hidden: true,
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Parked · Assignment 25: A bug becomes a test",
  kicker: "DAY 2 · ASSIGNMENT 25 · MAINTAIN",
  subtitle: "Fix it so it never comes back.",
  calm: true,
  steps: [
    "Play for three minutes. Write down one thing that goes wrong, and how to make it happen again",
    { text: "Report the bug", prompt: "Bug: [what goes wrong]. How to make it happen: [the steps]. First write a test that shows this bug and fails. Then fix the game until the test passes. Work on a branch and open a merge request. If you can't reproduce it, tell me, and add a regression test that guards the rule instead.", after: "No real bug? Claude says so, and adds a test that guards the rule instead." },
    "Red first? Then let Claude fix the game",
    "Merge request, review, merge"
  ],
  expected: "A test that catches the bug, and the fix in main.",
  keyPoints: ["Maintain phase", "Every bug becomes a test", "Red, fix, green", "git revert for a bad merge"],
  notes: "In the dry run the example bug ('food inside a wall') didn't exist, and Claude refused to invent a fix: it asked for the steps to reproduce it, then offered a regression test instead. That's the lesson behind the steps in the prompt: a bug report without steps is a guess. Day 5's rule in small: each incident becomes an eval. A bug that has a test can't quietly come back. git revert makes a new commit that undoes an old one, so nothing is lost and the history stays honest; that's how teams undo a bad merge on a protected main.\n\nWhy now: You found a bug while playing. Fixing it isn't enough: it has to stay fixed.\nWhat you see: First a red test that shows the bug. Then the fix. Then green.\nExtra: A bad merge? “Revert that commit”: undone safely, and the history stays."
},

{ // Slide 174
  hidden: true,
  title: "Parked · Three views of the same work",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "The working method from Day 1, seen from three sides.",
  type: "concept",
  layout: "compare",
  visual: { art: 'boxes', link: { 0: ['Build', 'Test'], 1: ['Approve each change', 'Check the evidence'] } },
  columns: [
    { title: "The working method — the team", items: ["Plan", "Design", "Build", "Test", "Deploy", "Maintain"], foot: "Contains your decisions ↓" },
    { title: "You — in the loop", items: ["Set the goal", "Approve the plan", "Approve each change", "Check the evidence", "Approve the push", "Hand it over"], foot: "Contains the agent loop ↓" },
    { title: "Agent loop — Claude", items: ["Observe", "Decide", "Act", "Check", "Repeat or stop"] }
  ],
  keyPoints: ["Say the nesting left to right","Outer: the six phases","Middle: your decisions","Inner: Claude's agent loop"],
  notes: "Say: Say the nesting out loud, from the outside in. The outer box is the working method, the six phases. The middle box is you: the decisions you made in every phase last session (set the goal, approve the plan, each change, check the evidence, approve the push, hand it over). The inner box is Claude's agent loop.\n\nWhat you see: Click: the boxes zoom in one at a time, then Build and Test light up together with 'approve each change' and 'check the evidence': that's where Claude's loop runs.\n\nBackground: Nothing here is new: it's the working-method slide from Day 1, seen from three sides."
},

{ // Slide 175
  hidden: true,
  title: "Parked · The Aether Arcade",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "Everyone's game on one website. Built and run like a real team product.",
  type: "context",
  visual: { stagger: "pop", stepThrough: true, bot: "happy", place: "aside", highlight: [{ in: "tagline", text: "each other's games", tone: "orange" }] },
  cards: [
    { title: "One website", body: "Every game, playable by everyone, in the room and online." },
    { title: "One leaderboard", body: "Your record goes in through a merge request. A check catches cheaters." },
    { title: "Sprints and chaos", body: "Three sprints. In between, the product owner causes trouble." },
    { title: "Awards", body: "Arcade Champion: the best total across all games." }
  ],
  tagline: "You can only win by playing each other's games.",
  keyPoints: [
    "One arcade repo, one website",
    "Every game via a merge request",
    "Records via a merge request, anti-cheat in CI",
    "Chaos cards: real team problems",
    "Champion = best across all games"
  ],
  notes: "Why the arcade: Claude can build one game in one prompt, but ten games on one website only work with an agreement everyone keeps, reviews, versions and a pipeline. That's what teams at Worldline do every day when they connect each other's work. The arcade repo comes from AetherLink (the arcade starter as a template) with a .gitlab-ci.yml: every merge runs the contract test and, if green, publishes the arcade on GitLab Pages. Records go in as scores/<nickname>.json through a merge request; an anti-cheat check in the pipeline tests whether the score is possible, a fraud check in miniature. The AetherLink template must already contain the start screen, the leaderboard, the anti-cheat test and a .gitlab-ci.yml (a .github/workflows file does nothing on GitLab), and only one connect skill: in the dry run an old overlapping skill confused the choice. Fallback if GitLab Pages or CI runners aren't available: the host laptop runs the arcade (node serve.js) on the projector, and online participants play through screen sharing. Check Pages and runners with Worldline before the course."
},

{ // Slide 176
  hidden: true,
  title: "Parked · How the afternoon runs",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "Three sprints, two chaos cards, one tournament.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "Sprint 0", caption: "Agree the contract. Make a team skill." },
    { label: "Sprint 1", caption: "Connect your game through a merge request." },
    { label: "🃏 Chaos card", caption: "The product owner changes the plan." },
    { label: "Sprint 2", caption: "Adapt, without breaking the others." },
    { label: "🃏 Chaos card", caption: "An incident." },
    { label: "Tournament", caption: "Play each other's games." },
    { label: "Awards", caption: "And what we learned." }
  ],
  tagline: "Each sprint is the loop again: plan, build, test, deploy.",
  keyPoints: ["Order matters", "Fake scores first", "One game, then the rest", "Same as a release: layer by layer"],
  notes: "Show the shape of the afternoon before anyone starts. Each sprint is the SDLC loop in small. The chaos cards are announced, but not what's on them."
},

{ // Slide 177
  hidden: true,
  title: "Parked · Roles in the arcade",
  kicker: "DAY 2 · PART 3 · THE ARCADE",
  subtitle: "Everyone owns a game. Nobody merges their own work.",
  type: "concept",
  visual: { stepThrough: true },
  cards: [
    { title: "Everyone", body: "Your own game: connect it, keep it green." },
    { title: "Reviewer", body: "Review someone else's merge request: your verifier, plus one comment of your own." },
    { title: "Arcade host", body: "One volunteer: owns the arcade repo, the pipeline and the merges." }
  ],
  tagline: "Nobody merges their own merge request.",
  keyPoints: [
    "Split by role",
    "Manager owns agreement + arcade laptop",
    "Backender: format + scoreboard",
    "Frontender: start screen"
  ],
  notes: "Everyone works solo on their own game, and everyone also reviews one other person's merge request: that's the teamwork, and it works online too. One volunteer is the arcade host (fallback: a trainer): they own the arcade repo and merge after a review. In your role at work this is the same: the developer owns the change, a colleague reviews, someone owns main."
},

{ // Slide 178
  hidden: true,
  type: "practice",
  layout: "exercise",
  title: "Parked · Assignment 26: Sprint 0, the agreement",
  kicker: "DAY 2 · ASSIGNMENT 26 · PLAN",
  subtitle: "15 minutes, as a team, in the team chat.",
  calm: true,
  steps: [
    "Host: create the arcade repo from the AetherLink template",
    "Team: agree in the chat what every game needs: game.json, the score format, nickname, avatar",
    { text: "Host: let Claude write the agreement and the team skill", prompt: "Write arcade-spec.md from what we agreed: every game lives in games/<nickname>/ with index.html and game.json (title, nickname, avatar), and reports its score once at game over as { player, avatar, points, game }. Then make a skill arcade-connect that makes a game meet this spec and runs the contract test." },
    "Everyone: clone the arcade repo next to your game folder. The skill comes with it"
  ],
  expected: "One arcade-spec.md everyone agreed on, and the team skill on every laptop.",
  keyPoints: [
    "Plan phase, as a team",
    "Agree before anyone builds",
    "arcade-spec.md = the contract",
    "A team skill everyone shares",
    "Compare with the starter afterwards"
  ],
  notes: "One volunteer is the arcade host (fallback: a trainer). The team agrees in the chat; the host types it into Claude. The skill is shared through the arcade repo: everyone clones it and starts Claude there, so the skill is always the latest version. Don't copy it into your game repo: in the dry run the copy stayed on v1 after the contract changed. Fallback when Sprint 0 runs out of time: copy arcade-reference/ (spec, skill and contract test) into the arcade repo. Afterwards, show the contract in the arcade starter (arcade.js) and ask what the team forgot: usually the nickname length or what happens with a missing avatar.\n\nWhy now: Ten games, one leaderboard. That only works if every game speaks the same language.\nWhat you see: arcade-spec.md in the arcade repo, and a team skill arcade-connect that everyone uses.\nLook inside: Compare your spec with the arcade starter's contract. What did the team forget?"
},

{ // Slide 179
  hidden: true,
  type: "practice",
  layout: "exercise",
  title: "Parked · Assignment 27: Sprint 1, connect your game",
  kicker: "DAY 2 · ASSIGNMENT 27 · BUILD",
  subtitle: "35 minutes. Your game into the arcade, through a merge request.",
  calm: true,
  steps: [
    "Start Claude in your clone of the arcade repo, not in your game folder",
    { text: "Bring your game in with the team skill", prompt: "My game is in ../aether-snake. Use the arcade-connect skill to bring it into games/[nickname]/ and make it meet arcade-spec.md. Then commit on a new branch, push, and open a merge request.", after: "Claude asks before the push. Then the merge request opens." },
    "Pipeline red? Fix it and push again",
    "Review the merge request of the person after you on the list",
    "Merged? Play the arcade website"
  ],
  expected: "Your game is live in the arcade, and you reviewed someone else's.",
  keyPoints: [
    "Build + Test + Deploy in one sprint",
    "The pipeline is the first reviewer",
    "A human review, from someone else",
    "Nobody merges their own MR",
    "Green the first time = an award"
  ],
  notes: "Main of the arcade repo is protected: only the host merges, and only after one review from someone else. The pipeline runs the contract test on every merge request. Keep a list of nicknames in the chat for the review rotation: you review the person after you. 'First time green' (the merge request passes the pipeline on the first push) counts for an award, which rewards reading the spec carefully.\n\nWhy now: Your game has to work inside someone else's product now.\nWhat you see: The pipeline runs the contract test on your merge request. Green, reviewed, merged: your game is live on the arcade website.\nReview: Review someone else's merge request: run your verifier, and write one comment of your own."
},

{ // Slide 180
  hidden: true,
  title: "Parked · 🃏 Chaos card: the contract changes",
  kicker: "DAY 2 · PART 3 · CHAOS CARD",
  subtitle: "The product owner, five minutes ago: “Every score now also needs the level it was played on.”",
  type: "context",
  dark: true,
  visual: { stagger: "pop", stepThrough: true },
  cards: [
    { title: "What changes", body: "Contract v2: { player, avatar, points, game, level }" },
    { title: "The catch", body: "Games still on v1 must keep working for now." },
    { title: "Your questions", body: "Who tells whom? What breaks? How long do we keep v1?" }
  ],
  tagline: "A changing agreement is normal. Breaking each other isn't.",
  keyPoints: [
    "Breaking change in a contract",
    "Backward compatibility",
    "Deprecation: v1 still accepted, for now",
    "Communication first"
  ],
  notes: "Play the product owner and say it as if it's urgent. Then let the team talk for two minutes before anyone types: who updates the spec, the skill and the arcade; what happens to games still on v1; how long v1 stays accepted. That's versioning and deprecation, and it's mostly communication."
},

{ // Slide 181
  hidden: true,
  type: "practice",
  layout: "exercise",
  title: "Parked · Assignment 28: Sprint 2, contract v2",
  kicker: "DAY 2 · ASSIGNMENT 28 · BUILD",
  subtitle: "25 minutes. Change without breaking the others.",
  calm: true,
  steps: [
    "Host: update arcade-spec.md to v2, and keep v1 accepted for now",
    "Host: update the arcade-connect skill",
    { text: "Everyone: update your game with the new skill", prompt: "arcade-spec.md is now v2: a score also has level. Pull main of the arcade repo, then update my game in games/[nickname]/ with the arcade-connect skill so it sends v2 scores. Push a new branch and open a merge request.", after: "The prompt pulls main of the arcade first, so you use the new skill." },
    "Merge request, pipeline, review, merge",
    "Host: once every game is merged, tag the arcade v2.0"
  ],
  expected: "Every game sends v2 scores, and nothing broke on the way.",
  keyPoints: ["Update spec, skill, games", "Pull first: the skill changed too", "v1 still works: deprecated", "Same MR flow", "Host tags the release v2.0"],
  notes: "Only the host tags: v2.0 on the arcade repo marks the release that speaks contract v2. Players don't tag the shared repo. In the dry run, Claude flagged that a player's copied skill was still v1: pulling main of the arcade first fixes that. Expect Claude to keep v1 working with a warning instead of a date check, and to suggest a message for the team chat. If two people change the arcade's start screen at the same time in this sprint, a merge conflict appears by itself: let Claude explain both versions, and the humans choose.\n\nWhy now: The agreement changed. Your game, the skill and the arcade all have to follow.\nWhat you see: arcade-spec.md v2, an updated skill, your game sending level, the arcade tagged v2.0, and v1 scores still accepted.\nLook inside: Which games are still on v1? Does the leaderboard still work for them?"
},

{ // Slide 182
  hidden: true,
  title: "Parked · Short break",
  kicker: "DAY 2 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "We continue with a chaos card: an incident." }
  ],
  keyPoints: ["Break: say the return time","Press ▶ Start on the timer","Two big assignments follow","Reset your own energy"],
  notes: "State the actual clock time you'll resume. After the break the trainer turns a chaos card: an incident."
},

{ // Slide 183
  hidden: true,
  title: "Parked · 🃏 Chaos card: an incident",
  kicker: "DAY 2 · PART 3 · CHAOS CARD",
  subtitle: "The trainer turns one card. Fix it as a team, then make sure it can't happen again.",
  type: "context",
  dark: true,
  visual: { reveal: "click", buttons: true },
  cards: [
    { title: "Broken deploy", body: "One game takes the whole start screen down. Revert, or hotfix?" },
    { title: "Cheater", body: "480 points on level 1, where the most you can score is 4. The anti-cheat check let it through. Now what?" },
    { title: "Privacy leak", body: "A game shows a real name and an email. How did that get past review?" },
    { title: "Merge conflict", body: "Two people changed the start screen at the same time." }
  ],
  tagline: "Every incident becomes a new test, instruction or permission.",
  keyPoints: [
    "Revert vs hotfix",
    "Tighten the anti-cheat check",
    "A privacy check in CI or a hook",
    "Resolve a conflict with Claude",
    "Incident → test (Day 5)"
  ],
  notes: "Turn one card, or two if there's time. Broken deploy: the fastest safe move is git revert of the merge, then a hotfix branch for the real fix; add a test so it can't happen again. Cheater: the template caps records at 500, so a record of 480 on level 1 passes, but level 1 ends after 5 food, so it is impossible. In the dry run Claude worked that out, added a maximum per game and level, and saved the cheating record as a test case that must stay rejected. Privacy leak: add a check to the pipeline (or a hook) that fails on anything that looks like an email or a full name, and remove the data. Merge conflict: ask Claude to explain both versions, decide as humans, commit the result. Whatever the card: it ends with a new test, instruction or permission, exactly Day 5's 'each incident becomes an eval'. Prepare the cards in advance: a deliberately broken game, a cheating score file, and a game with a fake name and email, all in a branch you can merge on cue."
},

{ // Slide 184
  hidden: true,
  title: "Parked · The tournament",
  kicker: "DAY 2 · CLOSING",
  subtitle: "Play each other's games on the arcade website.",
  type: "context",
  dark: true,
  visual: { stepThrough: true, bot: "happy", place: "aside", highlight: [{ in: "tagline", text: "you built together", tone: "orange" }] },
  cards: [
    { title: "Play", body: "Every game you play counts towards Arcade Champion." },
    { title: "Record", body: "Your best score goes in through a merge request." },
    { title: "Watch", body: "The live leaderboard on the big screen." }
  ],
  tagline: "A scoreboard you built together, from one agreement.",
  keyPoints: [
    "Arcade laptop on the big screen",
    "One round each",
    "Watch the top 10 fill",
    "Close: it worked because you agreed first"
  ],
  notes: "The arcade website (or the host laptop) on the big screen. Everyone plays as many games as they can; records go in as scores/<nickname>.json through a merge request, checked by the anti-cheat test. Close with the point: this worked because the team agreed on the format first, reviewed each other and kept main green."
}

];
