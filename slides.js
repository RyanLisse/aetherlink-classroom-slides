/* ==========================================================================
   Aetherlink x Worldline — Two-day classroom deck
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

/* ---------------------------------------------------------------------- */
/* TEACHING DAY 1 — Welcome                                               */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Welcome to the course!",
  kicker: "AETHERLINK × WORLDLINE · WELCOME",
  subtitle: "",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["On screen as people arrive","Warm welcome once seated","Keep it to a few sentences","Who we are comes after the agreements"],
  notes: "Have this on screen while people walk in. Once everyone is seated, give a warm welcome — keep it to a few sentences. Who AetherLink is and who the trainers are comes right after the agreements."
},

{ // Slide 2
  title: "How many of you are using AI in your daily workflow?",
  kicker: "WELCOME · WARM-UP",
  subtitle: "",
  type: "context",
  visual: { opener: 'ask', bot: 'multiarm', place: 'beside', stepThrough: true },
  cards: [
    { title: "ChatGPT at home?", body: "" },
    { title: "Claude or another AI at work?", body: "" },
    { title: "Already built something with it?", body: "" }
  ],
  keyPoints: ["Ask literally, let hands go up","Then click: three follow-ups pop up","Who has already built something?","Quick read, not a discussion","Adjust the pace of Part 1"],
  notes: "Ask it literally and let the hands go up — say roughly how many you see. Then click through the three follow-ups one by one and ask each out loud: ChatGPT at home, Claude or another AI at work, and who has already built something with it. Using AI every day is not the same as building with it — the last question tells you who is really working with it. This is a quick read of the room, not a discussion: note whether you mostly have beginners or builders and adjust your pace in Part 1."
},

{ // Slide 3
  title: "How many of you already work with Claude Code?",
  kicker: "WELCOME · WARM-UP",
  subtitle: "",
  type: "context",
  visual: { opener: 'ask', bot: 'think', place: 'beside' },
  keyPoints: ["Hands up again","Who has used it, who uses it often?","Tells you how much tour the room needs"],
  notes: "Hands up again. Follow up: 'and who uses it regularly?' This tells you how much time the room needs in the tour through Claude Code before lunch. If several people already use it, ask one of them later to share a tip during the tour."
},

{ // Slide 4
  title: "A few agreements",
  kicker: "WELCOME · AGREEMENTS",
  subtitle: "So we get the most out of these two days.",
  type: "context",
  visual: { opener: 'agree', stagger: 'pop', stepThrough: true, bot: 'point', place: 'beside' },
  cards: [
    { title: "Be on time", body: "" },
    { title: "Be open-minded", body: "" },
    { title: "Be curious", body: "" },
    { title: "Listen first, then ask", body: "" },
    { title: "Online? Camera on, mic on mute", body: "" },
    { title: "Build solo, ask your team", body: "" }
  ],
  keyPoints: ["Name the agreements, one sentence each","Stress: listen first, then ask","Online: camera on, mute when not talking","Everyone builds on their own laptop","Stuck? Ask your team or the chat","Invite people to hold questions"],
  notes: "Name the agreements, one sentence each. 'Listen first, then ask' matters most today: many questions are answered a few slides later, so invite people to hold them until the explanation is done. For anyone joining online: camera on so we can see each other, microphone on mute when you're not talking. And say how we work: everyone builds on their own laptop, every assignment is done solo. Stuck? Ask your team or put it in the chat: your team is your help desk, not your pair partner."
},

{ // Slide 5
  title: "Be careful with data",
  kicker: "WORKING SAFELY WITH AI · 1 OF 3",
  subtitle: "Required for everyone, before we build anything.",
  type: "context",
  visual: { stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "Why it matters", body: "Everything you put into an AI tool leaves your hands. Only share what you are allowed to share." }
  ],
  tagline: "When in doubt: don't share it, ask first.",
  keyPoints: ["Required block, never skip", "Data you put in AI leaves your hands", "Only share what you're allowed to share"],
  notes: "This block of three slides is required, also when time is short. One: be careful with what you put into an AI tool. Once it's in, it has left your hands. When in doubt, don't share it and ask first. If Worldline has its own internal AI rules (which tools, which data), mention them here; confirm them with Worldline before the class day."
},

{ // Slide 6b
  title: "Never commit or push course material",
  kicker: "WORKING SAFELY WITH AI · 2 OF 3",
  subtitle: "One push can make it public without you noticing.",
  type: "context",
  visual: { stepThrough: true, bot: 'point', place: 'beside',
    highlight: [{ in: 'card:0', text: 'public repository', tone: 'orange' }] },
  cards: [
    { title: "The rule", body: "Course material or Worldline data never goes into a public repository. Check before every commit and push." }
  ],
  tagline: "Check before every commit and push.",
  keyPoints: ["Never push course material or Worldline data", "A public repository is public for everyone", "Check before every commit and push"],
  notes: "Two: never commit or push course material or Worldline data to a public repository. A single push can make it public without you noticing. In this course every repository is private, and Claude asks before every commit and push: that's the moment to check."
},

{ // Slide 7c
  title: "The EU AI Act",
  kicker: "WORKING SAFELY WITH AI · 3 OF 3",
  subtitle: "Why this course exists.",
  type: "context",
  visual: { stepThrough: true, bot: 'head', place: 'beside' },
  cards: [
    { title: "What it means", body: "Organisations that use AI must make sure their people know how to use it responsibly. This course is part of that." }
  ],
  tagline: "Using AI well is a skill you learn.",
  keyPoints: ["EU AI Act: AI literacy is an obligation", "Article 4", "This course is part of it"],
  notes: "Three: the EU AI Act requires organisations that use AI to make sure their people have enough AI literacy (Article 4). This course is part of how Worldline meets that."
},

{ // Slide 8
  title: "AetherLink × Worldline",
  kicker: "WELCOME · WHO WE ARE",
  subtitle: "Who AetherLink is, and what we are doing together.",
  type: "context",
  visual: { bot: 'wave', place: 'left', stepThrough: true, logoFly: true,
    highlight: [{ in: 'card:0', text: 'building brains', tone: 'orange' }, { in: 'card:1', text: 'Seven days of AI time', tone: 'purple' }] },
  dark: true,
  cards: [
    { title: "AetherLink", body: "A passion for the newest technology.\nCurious about the future.\nGood at building brains." },
    { title: "Worldline", body: "Seven days of AI time: room to explore, research and learn to work with AI." }
  ],
  keyPoints: ["AetherBOT waves, our logo flies in","Passion for the newest technology","Curious about the future, good at building brains","Worldline: seven days of AI time","Keep it short and personal"],
  notes: "AetherBOT waves first, then our logo flies in. Constance tells who AetherLink is: a passion for the newest technology, curious about the future, and good at building brains. Then Worldline: you get seven days of AI time, room to explore, research and learn to work with AI. Keep it short and personal: the shape of the programme comes back a few slides later."
},

{ // Slide 9
  title: "We are team AetherLink",
  kicker: "WELCOME · TEAM",
  subtitle: "One team, here for your team.",
  type: "context",
  visual: { opener: 'team', stagger: 'pop' },
  cards: [
    { title: "Jessy The", body: "", role: "Full-Stack Software Engineer · AI Applications",
      back: "Builds full-stack AI apps, from the model to the UI.", tags: ["TypeScript", "React · Next.js", "Node.js", "Python", "LLMs & agents", "Speaker"] },
    { title: "Constance van der Vlist", body: "", role: "CEO & Co-founder AetherLink",
      back: "Makes AI work in real teams.", tags: ["AI strategy", "Implementation", "Training", "Robotics", "NL · FI"] },
    { title: "Maarten Nauw", body: "", role: "Co-founder CFX · Game Developer · Robotics",
      back: "Video, visual effects and games.", tags: ["CFX co-founder", "VFX & 3D", "Game dev", "Robotics"] },
    { title: "Ryan Lisse", body: "", role: "AI Engineer · Agentic systems",
      back: "Multi-agent systems, from proof of concept to production.", tags: ["Agentic AI", "Evals", "TypeScript", "Python", "MCP", "Claude Code"] }
  ],
  keyPoints: ["We are one team: AetherLink","Click a card: it flips to the details","Each trainer: one or two sentences","Something personal"],
  notes: "We present ourselves as one team: team AetherLink, not as separate freelancers. Each trainer clicks their own card, so it flips to the details, and says one or two sentences: who you are, what you do in this programme, and something personal. Click again to flip it back. Keep it short: the room gets to know you over the next two days."
},

{ // Slide 10
  title: "How many of you…",
  kicker: "WELCOME · GETTING TO KNOW YOU",
  type: "context",
  visual: { bigWord: true },
  keyPoints: ["Ask questions on the spot", "Hands up", "Start easy, end with AI"],
  notes: "Ask a few \u201cHow many of you\u2026\u201d questions on the spot and let people raise their hands (online: a reaction or a yes in the chat). For example: \u2026 have used ChatGPT or Copilot this week? \u2026 write code in your job? \u2026 have used a terminal? \u2026 have built something with AI? It warms up the room and shows you who is a developer and who already builds with AI, which helps later when people get stuck."
},

{ // Slide 11
  title: "What do you hope to learn?",
  kicker: "WELCOME · EXPECTATIONS",
  subtitle: "Before we start: your curiosity and your questions.",
  type: "context",
  visual: { stepThrough: true, bot: 'think', place: 'beside', tool: 'thought' },
  cards: [
    { title: "What do you hope to learn?", body: "What would make these days worth it for you and your team?" },
    { title: "Questions you already have", body: "What do you want answered by the end of these two days?" }
  ],
  tagline: "We come back to these at the end of Day 2.",
  keyPoints: ["Give a minute to think","Flipchart: hopes and questions","Say when it comes up, or park it","Keep the sheet on the wall","Revisit in Day 2 final reflection"],
  notes: "Give people a minute to think, then collect answers on the flipchart: one column for what they hope to learn, one for questions. You're looking for curiosity: who is excited about Claude Code, who doesn't see the point yet. Don't answer now; say when in the programme it comes up (for example 'that is end of Day 2'), or park it. Keep the sheet on the wall and come back to it in the final reflection at the end of Day 2."
},

{ // Slide 12
  title: "Your team",
  kicker: "WELCOME · TEAMS",
  subtitle: "Who builds with whom?",
  type: "context",
  visual: { opener: 'teams', stagger: 'pop' },
  cards: [
    { title: "Team 1", body: "" },
    { title: "Team 2", body: "" }
  ],
  tagline: "Give your team a name. Your team is where you ask for help.",
  keyPoints: ["Write the names on the robots","Trainers: Ryan and Maarten too","Each team picks a team name","You build solo; the team is your help desk","Teams stay together for the programme"],
  notes: "Split the room into the teams and write the names on each team's robot (on the whiteboard or live in the deck). Ryan and Maarten join a team too, so everyone knows who they work with. Small assignment: each team picks a team name in two minutes. Make clear what the team is for during these two days: everyone builds on their own laptop, and the team is where you ask for help (in the room or in the team chat). The teams stay together for the rest of the programme."
},

{ // Slide 13
  title: "The seven-day programme",
  kicker: "DAY 1 · WELCOME",
  subtitle: "Two days to practise and play. Five days to deepen and apply.",
  type: "context",
  visual: { art: 'timeline', bot: 'head', place: 'timeline', tool: 'arm', target: '.tl-arrow',
    highlight: [{ in: 'subtitle', text: 'practise and play', tone: 'purple' }, { in: 'subtitle', text: 'deepen and apply', tone: 'orange' }, { in: 'card:0', text: 'Just have fun, together.', tone: 'mark' }] },
  cards: [
    { title: "Teaching Days 1–2", body: "Practise and play. Just have fun, together." },
    { title: "Support Days 1–5", body: "Deepen and apply: build your own team pipeline or workflow." }
  ],
  keyPoints: ["Important slide: take your time","Days 1–2: practise and play, just have fun together","Days 3–7: deepen and apply","Goal: your own team pipeline or workflow"],
  notes: "This one matters: set the tone. The first two days are for practising and playing: just have fun, together. Nothing has to be perfect yet. The other five days are for deepening and applying: each team builds its own pipeline or workflow. Don't explain all seven days in detail now; one sentence per phase is enough."
},

{ // Slide 14
  title: "Programme outcome",
  kicker: "DAY 1 · WELCOME",
  subtitle: "By the end of the programme, your team has built something with AI that works in your team.",
  type: "context",
  visual: { popOut: 0, bot: 'happyHatch', place: 'popout', stepThrough: true,
    highlight: [{ in: 'subtitle', text: 'your team', tone: 'purple' }, { in: 'tagline', text: 'elevates your team', tone: 'orange' }] },
  cards: [
    { title: "For example", body: "An agent\nSkills\nA pipeline\nAn automation" }
  ],
  tagline: "Anything that elevates your team. You build it together, as a team.",
  keyPoints: ["Give inspiration, not a definition","Agent, skills, pipeline, automation","Anything that elevates your team","It's a team assignment"],
  notes: "Give inspiration, not a definition. Press → and the ideas come out of AetherBOT's head one by one. What a team ends up with can be an agent, a set of skills, a pipeline or an automation: anything that elevates your team and saves time, money or effort. Make it explicit that this is a team assignment: you build it together with your team, not as a personal trick."
},

{ // Slide 15
  title: "Today",
  kicker: "DAY 1 · WELCOME",
  subtitle: "AI fundamentals, and getting to know Claude Code.",
  type: "context",
  visual: { bot: 'wave', place: 'clouds' },
  cards: [
    { title: "AI fundamentals", body: "What AI is, how a model reads your input and what that costs, and how you steer it with a good prompt." },
    { title: "Get to know Claude Code", body: "A tour this morning. After lunch you build your own Snake game with it, step by step." }
  ],
  keyPoints: ["Two things today", "Morning: AI fundamentals, then a tour of Claude Code", "After lunch: your own Snake, step by step", "Each step teaches one Claude Code skill"],
  notes: "Say: Today is about two things. This morning the AI fundamentals, and then a tour of Claude Code. After lunch everyone builds their own Snake game with Claude Code, step by step: plan, build, test, put it online. Every step teaches one Claude Code skill.\n\nNext: AI in three questions, the map of the fundamentals."
},


/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 1: AI foundations                                         */
/* ---------------------------------------------------------------------- */

{ // Slide 16: Overview of the AI fundamentals
  title: "AI in three questions",
  kicker: "DAY 1 · PART 1 · AI FOUNDATIONS",
  subtitle: "This morning's map: each answer builds on the one before.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, bot: "point", place: "left" },
  cards: [
    { title: "1 · What is AI?", body: "From the first idea to the language model you use today." },
    { title: "2 · How does a model read?", body: "Tokens, the context window, which model, and what it costs." },
    { title: "3 · How do you steer it?", body: "Where it goes wrong, and a prompt that prevents it." }
  ],
  keyPoints: [
    "Show the map before the details",
    "1 What is AI: history, rings, the language model",
    "2 How it reads: tokens, window, model, cost, then a quiz",
    "3 How you steer it: failure modes, then the prompt",
    "Ends with a knowledge check"
  ],
  notes: "Say: Before the details, the map. The next hour answers three questions, in this order, and each answer needs the one before it.\n\nWhat you see: Click: one question at a time. 1 What is AI? From the history to the language model you use today. 2 How does a model read? It reads in tokens; the context window, the model you pick and the cost are all counted in them. That chapter ends with a quiz. 3 How do you steer it? First where AI goes wrong, then the prompt that prevents it. That ends with a knowledge check.\n\nTip: Come back to this slide in your words at each new chapter: 'question 2: how does it read?'. The kicker on every slide shows which question you're in."
},

{ // Slide 17
  title: "Where AI comes from",
  kicker: "DAY 1 · PART 1 · 1 WHAT IS AI?",
  subtitle: "Seventy years in six moments.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "1950", caption: "Alan Turing asks the question: \"Can machines think?\" His Turing Test is still the best-known definition of machine intelligence." },
    { label: "1997", caption: "IBM's Deep Blue beats world chess champion Kasparov. Not by thinking, but by brute computing power." },
    { label: "2012", caption: "The deep learning breakthrough: a neural network wins the ImageNet image-recognition contest by a wide margin. Speech, images and translation all start here." },
    { label: "2017", caption: "\"Attention Is All You Need\": Google publishes the transformer, the engine under every modern language model." },
    { label: "2022", caption: "ChatGPT: one million users in five days. AI becomes something everyone can use." },
    { label: "2025–2026", caption: "Agentic AI: AI no longer only answers, it carries out tasks. That is where you are now." }
  ],
  keyPoints: ["Tell it as a story, not definitions","Press → for one year further","1950 · 1997 · 2012 · 2017 · 2022 · now","The next slides zoom in on the steps"],
  notes: "Tell this as a story. Press → to move one year further. 1950: Alan Turing asks 'Can machines think?'. 1997: Deep Blue beats Kasparov at chess, by brute computing power rather than thinking. 2012: deep learning breaks through when a neural network wins the ImageNet contest. 2017: Google's transformer paper, 'Attention Is All You Need', the engine under every modern language model. 2022: ChatGPT reaches a million users in five days. And now, 2025–2026: agentic AI, which no longer only answers but carries out tasks. That is where you are today. The next slides zoom in on the steps."
},

{ // Slide 18
  title: "The AI landscape",
  kicker: "DAY 1 · PART 1 · 1 WHAT IS AI?",
  subtitle: "Each one sits inside the one before it, like animal → dog → Rottweiler.",
  type: "concept",
  layout: "steps",
  visual: { art: 'nested', bot: 'point', place: 'nest', stepKeys: true },
  items: [
    { label: "Artificial intelligence", caption: "The whole field: machines doing things we link to human intelligence. The animal." },
    { label: "Machine learning", caption: "AI that learns from examples instead of hand-written rules. The dog." },
    { label: "Deep learning", caption: "Machine learning with many layers. The Rottweiler." },
    { label: "Generative AI", caption: "Deep learning that creates new text, images, audio or code. A male Rottweiler." },
    { label: "Large language models", caption: "Generative AI for language: text in, text out. This one Rottweiler, with his own character." }
  ],
  keyPoints: ["Click through the five rings","Metaphor: animal → dog → Rottweiler","Each ring is more specific","Ends at the model you use today"],
  notes: "Click through the five rings live so the nesting is visible. Use the metaphor: you start with 'an animal', then 'a dog', then 'a Rottweiler', then a male Rottweiler, then this one Rottweiler with his own character. Every ring is more specific than the one around it. Artificial intelligence is the whole field, and the large language model in the middle is the one you work with today."
},

{ // Slide 19
  title: "You have been training AI for years",
  kicker: "DAY 1 · PART 1 · 1 WHAT IS AI?",
  subtitle: "Machine learning: learning from examples instead of rules.",
  type: "concept",
  visual: { hero: 0, popOut: 1, bot: 'head', place: 'popout', stepThrough: true,
    highlight: [{ in: 'card:0', text: 'learns from examples', tone: 'orange' }] },
  cards: [
    { title: "Machine learning", body: "Nobody writes a rule for every case. The system learns from examples, and you have been giving it those examples for years." },
    { title: "You taught AI", body: "traffic-light captchas\nNetflix ratings\nthe spam button\nYouTube's next video" }
  ],
  keyPoints: ["Ask: who clicked traffic lights this week?","That trained a machine","Netflix, YouTube, spam: all learned","Contrast: rules vs examples"],
  notes: "Ask the room: who had to click all the traffic lights to log in somewhere this week? Notice that the puzzles keep changing. Every time you do it, you help train a machine to recognise traffic lights, buses and animals. That is machine learning: nobody writes a rule for every picture; the system learns from millions of examples. Netflix recommendations, YouTube's next video and your spam filter work the same way."
},

{ // Slide 20
  title: "From layers to creating something new",
  kicker: "DAY 1 · PART 1 · 1 WHAT IS AI?",
  subtitle: "Deep learning and generative AI.",
  type: "concept",
  visual: { hero: 0, popOut: 1, bot: 'head', place: 'popout', stepThrough: true,
    highlight: [{ in: 'card:0', text: 'many layers', tone: 'orange' }, { in: 'card:0', text: 'create', tone: 'purple' }] },
  cards: [
    { title: "Deep learning → generative AI", body: "Deep learning stacks many layers, each one finding a slightly more complex pattern. Once a model knows the patterns well enough, it can create something new from them." },
    { title: "What it creates", body: "emails\nimages\nsummaries\ncode" }
  ],
  keyPoints: ["Deep = many stacked layers","No maths","Patterns well enough → it can create","Plant: new is not the same as correct"],
  notes: "Keep it light: no maths. 'Deep' just means many layers, each picking up a slightly more complex pattern: from lines, to shapes, to faces. Once a model knows the patterns well enough, it can create something new from them: that's generative AI. Plant the caution that the next slide makes explicit: new is not the same as correct."
},

{ // Slide 21
  title: "Large language models",
  kicker: "DAY 1 · PART 1 · 1 WHAT IS AI?",
  subtitle: "Sounding right is not the same as being right.",
  type: "concept",
  visual: { keyLine: 1, stamp: 'VERIFY', bot: 'head', place: 'key',
    highlight: [{ in: 'card:1', text: 'verification', tone: 'mark' }] },
  cards: [
    { title: "What it is", body: "A model trained on huge amounts of text. It writes by predicting the most likely next piece of text, again and again. Say 'my cat' and it has to guess which cat. Say 'my Maine Coon' and it knows." },
    { title: "Key line", body: "A plausible response still requires verification." }
  ],
  keyPoints: ["Trained on huge amounts of text","It predicts the next piece of text","Likely is not the same as true","'My cat' vs 'my Maine Coon'","Training stops at a cutoff date","Same question, different answer","Say the key line slowly"],
  notes: "This closes the circle: the large language model you use today was trained on huge amounts of text and learned the patterns in it. It writes by predicting the most likely next piece of text, one piece at a time. It doesn't look facts up: it produces what sounds likely, and likely is not the same as true. Use the cat: if you say 'my cat', it has to guess — a farm cat, a lynx, a Maine Coon? Say 'my Maine Coon' and it knows. That's why what you give it matters. Two consequences to name: training stops at a cutoff date, so it doesn't know what happened after that; and it picks from likely options, so the same question can give a different answer each time. This afternoon nobody's Snake will look the same, and that's normal. Then say the key line slowly and let it land: it's the single most important sentence of Part 1, and everything about verification and human review later depends on it. Those 'pieces of text' have a name: tokens. That opens question 2, how a model reads."
},









{ // Slide 22
  title: "Tokens",
  kicker: "DAY 1 · PART 1 · 2 HOW A MODEL READS",
  subtitle: "The currency of your AI.",
  type: "concept",
  visual: { stepThrough: true, flowText: ["your text", "tokens", "numbers", "the model"],
    highlight: [{ in: 'tagline', text: 'not the same as a word', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "A token is a small piece of text that a model reads and writes: often a whole word, sometimes part of a word or a single character." },
    { title: "Why it matters", body: "Context limits, usage limits and costs are all counted in tokens. The clearer your prompt, the fewer you waste." }
  ],
  tagline: "A token is not the same as a word.",
  keyPoints: ["Question 2 starts here: how a model reads", "Tokens = the currency", "Flipchart: split one sentence into tokens", "Window, model and cost: all counted in tokens", "About 3.5 characters per token"],
  notes: "Tokens are the currency of the model: everything it reads and writes is counted in tokens. Flipchart: split one sentence into tokens — common words stay whole, rare words get split. The model sees tokens as numbers. Context limits, usage limits and costs are all counted in tokens; on average a token is about 3.5 characters of English text. The rest of this chapter follows the tokens: the context window is measured in them, a bigger model costs more per token, and through the API every token has a price. Question 3 then shows how a clear prompt keeps them in check. Expect the room to get very focused here — that's fine, but don't let tokens take over: they are one lever, not the whole story."
},
{ // Slide 23
  title: "Context windows",
  kicker: "DAY 1 · PART 1 · 2 HOW A MODEL READS",
  subtitle: "The model can only consider so much at once.",
  type: "concept",
  visual: { art: 'window',
    highlight: [{ in: 'tagline', text: 'Relevant', tone: 'orange' }, { in: 'tagline', text: 'current', tone: 'purple' }, { in: 'tagline', text: 'permitted', tone: 'mark' }] },
  cards: [
    { title: "Context window", body: "A context window limits how much information the model can consider at once. It is measured in tokens." },
    { title: "What fills it", body: "Your prompt, the conversation so far, files and tool results, and the answer itself." },
    { title: "Distraction", body: "Irrelevant context can distract from the task." }
  ],
  tagline: "Relevant, current and permitted context works best.",
  keyPoints: ["Context = small Lego blocks","Each block helps build the next","Irrelevant blocks pull attention away","Repeat: relevant, current, permitted"],
  notes: "Still counting in tokens: the window is measured in them. Think of context as small Lego blocks: each block helps the model get to the next one. Flipchart: draw one box as the window and keep adding blocks as the conversation grows: prompt, answer, a pasted file, more answers, until it is full. Irrelevant blocks take space and pull attention away from what matters. A one-and-a-half page love letter is fine if the model gets it at once; if it starts to wander, cut it into smaller blocks. The tagline is the takeaway to repeat: relevant, current, permitted."
},
{ // Slide 24
  title: "Model choice",
  kicker: "DAY 1 · PART 1 · 2 HOW A MODEL READS",
  subtitle: "Bigger models do more, and cost more per token. Pick the one that fits the task.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true,
    highlight: [{ in: 'card:3', text: 'not allowed', tone: 'orange' }] },
  cards: [
    { title: "Haiku", body: "Fast and cheap. For simple questions and small tasks." },
    { title: "Sonnet", body: "The all-rounder. For most everyday work." },
    { title: "Opus 5.5", body: "The most capable. For complex work where quality matters most." },
    { title: "Fable 5.1", body: "Exists, but not allowed at Worldline." }
  ],
  tagline: "A simple question doesn't need the biggest model.",
  keyPoints: ["Haiku: fast, cheap, simple","Sonnet: everyday all-rounder","Opus 5.5: complex, highest quality","Fable 5.1: not allowed here","Bigger is not always better"],
  notes: "Different models offer different balances of capability, speed and cost. Haiku is fast and cheap: perfect for a simple question. Sonnet is the all-rounder for most work. Opus 5.5 is the most capable, for complex work. Fable 5.1 exists, but is not allowed at Worldline. A simple question doesn't need the biggest model: that's the bridge to the next slide: what it costs."
},
{ // Slide 25
  title: "How you access a model",
  kicker: "DAY 1 · PART 1 · 2 HOW A MODEL READS",
  subtitle: "Desktop or API: same models, different costs.",
  type: "concept",
  visual: { stepThrough: true,
    highlight: [{ in: 'card:2', text: 'a secure route', tone: 'purple' }] },
  cards: [
    { title: "On your desktop", body: "A subscription: a fixed price per month, with usage limits." },
    { title: "Through the API", body: "You pay for what you use, counted in tokens." },
    { title: "Your setup", body: "Claude Code runs through your company's own setup: a secure route, used through the API." }
  ],
  tagline: "Through the API, every token has a price.",
  keyPoints: ["Same models, different ways in","Desktop: subscription","API: pay per token","Here: a secure route, through the API","So tokens matter"],
  notes: "Same models, different ways in, and different costs. On your desktop you have a subscription: a fixed price per month with usage limits. Through the API you pay for what you use, counted in tokens. In your setup Claude Code runs through your company's own secure route, because you work with sensitive systems, and it is used through the API. So every token you just learned about has a price: the right model and a clear prompt save money.\n\nNext: a quiz on questions 1 and 2, then question 3: how you steer it."
},
{ // Slide 26
  title: "Quiz: what is AI, and how does it read?",
  kicker: "DAY 1 · QUIZ",
  subtitle: "Which statement is true?",
  type: "quiz",
  visual: { quiz: { answer: 2 }, bot: 'stretchLeft', place: 'pointer', pointAt: 2 },
  cards: [
    { title: "A", body: "A large language model is not part of machine learning." },
    { title: "B", body: "Adding more context always improves the answer." },
    { title: "C", body: "For a simple question, a smaller model like Haiku is often the better choice." },
    { title: "D", body: "Through the API, tokens are free." }
  ],
  check: "Answer: C",
  keyPoints: ["Closes questions 1 and 2", "Vote first", "Answer: C", "A: the rings", "B: distraction", "D: every token has a price"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is C: pick the model that fits the task. A goes back to the rings: the language model sits inside machine learning. B goes back to the distraction card: irrelevant context takes space and attention. D goes back to the previous slide: through the API, every token has a price."
},
{ // Slide 27
  title: "AI failure modes",
  kicker: "DAY 1 · PART 1 · 3 STEERING AI",
  subtitle: "How does AI get it wrong?",
  type: "concept",
  visual: { reveal: 'click', bot: 'head', place: 'slot', faces: ['verward', 'dubbel', 'eigenwijs', 'slaperig', 'betrapt'] },
  cards: [
    { title: "Missing context", body: "The model did not have what it needed to answer well." },
    { title: "Ambiguous instructions", body: "The request could reasonably mean more than one thing." },
    { title: "Unsupported assumptions", body: "The model filled a gap with a guess instead of asking." },
    { title: "Outdated information", body: "The model only knows what was in its training data, up to a cutoff date." },
    { title: "Fabricated details", body: "A confident-sounding answer that isn't actually true." }
  ],
  tagline: "Treat AI output as a proposal until you verify it.",
  keyPoints: ["Question 3 starts here: how you steer it", "Ask for a personal example first", "Then reveal the list", "Link back: it predicts what sounds likely", "Each failure has a fix in the prompt"],
  notes: "Ask the room for a personal example of AI being confidently wrong before you reveal the list — recognition lands harder than the definition alone. Then link each one back to how the model works: it predicts what sounds likely from what it was given and what it was trained on. Missing context, an ambiguous request or a cutoff date all lead to a likely-sounding answer that isn't right.\n\nNext: Each failure has its own line in a good prompt, which the next slides build up. Missing or outdated context: the Context line. An ambiguous request: the Goal. Unsupported assumptions: Constraints and Done when. Fabricated details: the Check."
},
{ // Slide 28
  title: "Input, context and output",
  kicker: "DAY 1 · PART 1 · 3 STEERING AI",
  subtitle: "Steering starts with what you give it.",
  type: "concept",
  visual: { art: 'flow', bot: 'head', place: 'slot',
    highlight: [{ in: 'tagline', text: 'you check what comes out', tone: 'orange' }] },
  cards: [
    { title: "Input", body: "Your instruction, question or goal. Specific, clear and short." },
    { title: "Context", body: "Relevant information available to the model." },
    { title: "Output", body: "The response or proposed action." }
  ],
  tagline: "Garbage in, garbage out. Good in, good out — and you check what comes out.",
  keyPoints: ["Garbage in, garbage out","You sit in the middle: human in the loop","Developer, manager, analyst: same flow","Input: specific, clear, short"],
  notes: "Bridge from the failure modes: most of them start with what goes in. Draw the arrow on the whiteboard: input + context → model → output. Garbage in, garbage out — but good in is also good out. And you sit in the middle: you give the input and you check the output. That is human in the loop, from the very first prompt. It works the same for a developer, a manager or a technical analyst. Keep your input specific, clear and short."
},
{ // Slide 29
  title: "Prompt",
  kicker: "DAY 1 · PART 1 · 3 STEERING AI",
  subtitle: "Your input plus the context you send along: together, that's your prompt.",
  type: "concept",
  visual: { keyLine: 1, stamp: 'CLEAR', bot: 'head', place: 'key',
    highlight: [{ in: 'card:1', text: 'what your prompt tells it', tone: 'mark' }] },
  cards: [
    { title: "Definition", body: "A prompt is everything you send the model: your instruction or question, plus any background, examples or documents you add." },
    { title: "Key line", body: "At the start, the model knows only what your prompt tells it." }
  ],
  keyPoints: ["Input + context = your prompt", "Prompt = everything you send", "At the start: only what you tell it", "Later: conversation and memory add to it", "Bridge to the prompt ingredients"],
  notes: "Connect the words from the previous slide: your input and the context you send along are, together, your prompt. Keep it short: a prompt is more than the question you type, it is everything you send along with it. The key line says 'at the start' on purpose: in a fresh session the model knows only what your prompt tells it; later the conversation and memory add to that, which you'll see in Claude Code. Because it starts from your prompt, a good prompt has a fixed set of ingredients."
},
{ // Slide 30
  title: "A reliable prompt",
  kicker: "DAY 1 · PART 1 · 3 STEERING AI",
  subtitle: "A template you can copy into Claude Code or ChatGPT today.",
  type: "concept",
  visual: { checklist: 0, checkLabels: true, bot: 'point', place: 'left' },
  cards: [
    { title: "Template", body: "Goal: the result you want\nContext: what the model needs to know\nConstraints: what it must not do\nDone when: what good looks like\nOutput: the format you want back\nCheck: how you verify it" }
  ],
  tagline: "Press “Example prompt” to copy the template.",
  prompt: `Goal: [the result I want]
Context: [who I am, the project or situation, and what you need to know]
Constraints: [what you must not do or change]
Done when: [how I will recognise a good result]
Output: [the format I want back, e.g. a short plan, a table or 5 bullets]
Check: [how I will verify your answer; mark anything you cannot confirm as OPEN]`,
  keyPoints: ["Walk through the six lines once", "Each line fixes a failure mode", "Constraints + Check = human in the loop", "Open Example prompt, show it copies", "One example follows: a bug fix"],
  notes: "This is the pattern behind every assignment prompt in the deck. Walk through the six lines once, and point back at the failure modes: Context prevents missing context, Goal prevents an ambiguous request, Constraints and Done when stop assumptions, and Check catches what's made up. Constraints and Check are where you stay in the loop: you say what it may not touch, and you decide how you verify the result. Then open “Example prompt” (top right) and show that it copies. The next slide shows it filled in, for a bug fix. Each line keeps its colour there, so you can point: 'the orange line, Constraints: read only'."
},


{ // Slide 31
  title: "Example: a bug fix",
  kicker: "DAY 1 · PART 1 · 3 STEERING AI",
  subtitle: "The same six lines, filled in.",
  type: "concept",
  visual: { checklist: 0, checkLabels: true, bot: 'point', place: 'left' },
  cards: [
    { title: "Prompt", body: "Goal: find why the login test fails\nContext: it fails since yesterday's merge\nConstraints: read only, change nothing\nDone when: you can point to the line\nOutput: cause, file, line and a fix\nCheck: show proof, mark doubts as OPEN" }
  ],
  prompt: `Goal: find the cause of the failing login test.
Context: the error appears since yesterday's merge. Scan the repository.
Constraints: read only. Do not change any file.
Done when: you can point to the line that causes the error.
Output: the cause, the file and line number, and a proposed fix (not applied).
Check: show the evidence for your answer; mark anything you are not sure of as OPEN.`,
  keyPoints: ["Same lines, developer task","Constraint: read only","You decide on the fix","Evidence + OPEN = human in the loop"],
  notes: "Same six lines, now filled in for a developer task. Read it line by line, using the colours. The slide shows short versions; Example prompt (top right) has the full prompt to copy. The constraint is the important one: read only, change nothing — Claude scans the repo and shows the error, you decide what to do with it. The check asks for evidence and marks what it isn't sure of as OPEN. That's human in the loop in one line."
},

{ // Slide 32
  title: "Knowledge check",
  kicker: "DAY 1 · QUIZ",
  subtitle: "Four quick questions. Answer first, then click to see.",
  type: "review",
  visual: { qa: true },
  cards: [
    { title: "What is a token?", body: "A small piece of text the model reads and writes, often a word, sometimes part of one. The currency of your AI." },
    { title: "Why not always use the biggest model?", body: "It costs more and is slower. A simple question doesn't need it." },
    { title: "What does the model know at the start?", body: "Only what your prompt tells it. Later, the conversation and memory add to that." },
    { title: "Which line keeps you in the loop?", body: "Constraints and Check: what it may not touch, and how you verify the result." }
  ],
  keyPoints: ["Ask each question out loud","Let the room answer first","Then click to reveal","Covers tokens, model, prompt, loop"],
  notes: "Ask each question out loud and let the room answer before you click. The four questions cover what you just did: tokens, model choice, what the model knows at the start, and how you stay in the loop. Use 'Reveal next' or click a card."
},

{ // Slide 33
  title: "Short break",
  kicker: "DAY 1 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "Continuing with: Claude chat and Claude Code." }
  ],
  keyPoints: ["Break: say the return time","Show the clock time on screen","Press ▶ Start on the timer","Check your Claude Code auth"],
  notes: "State the actual clock time you'll resume, out loud and (if possible) on screen — 'return in 15 minutes' only works if people know what time that is. Use the break to check your own Claude Code auth is working before the live demo in Part 2."
},


/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 2: Claude Code — modes, plan, memory, permissions         */
/* ---------------------------------------------------------------------- */

{ // Slide 34
  title: "Claude interfaces",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Four ways to work with Claude, and when to use which.",
  type: "concept",
  visual: { spotlight: 1, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "Claude chat", body: "Ask, think and write. For questions, ideas and texts." },
    { title: "Claude Code", body: "Works inside your code project: reads, plans, changes and tests." },
    { title: "Cowork", body: "Hand over a task on your own documents and files. For knowledge work, not code." },
    { title: "API and SDK", body: "Build Claude into your own application or agent." }
  ],
  keyPoints: ["Four interfaces, one Claude","Chat: questions and texts","Cowork: tasks on your documents","Claude Code: inside your project","API/SDK: build it into your own app","Land on Claude Code"],
  notes: "Same Claude, four ways in. Claude chat is for asking, thinking and writing. Cowork hands over a task on your own documents and files: knowledge work, not code. Claude Code works inside your code project: it reads the files, makes a plan, changes code and runs tests. With the API and the SDK you build Claude into your own application or agent. Then land on Claude Code: that is where the room lives today. The difference with chat: chat only knows what you paste in, Claude Code works inside the project itself."
},

{ // Slide 35
  title: "Where Claude Code runs",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "The same Claude Code, in different windows.",
  type: "concept",
  visual: { stepThrough: true, bot: 'point', place: 'left',
    highlight: [{ in: 'tagline', text: 'in the terminal', tone: 'orange' }] },
  cards: [
    { title: "Terminal", body: "Type claude in a project folder. Everything happens in text, step by step." },
    { title: "VS Code extension", body: "The same Claude Code in a panel next to your files." },
    { title: "Desktop and web", body: "The same Claude Code also runs in the Claude desktop app and in the browser." }
  ],
  tagline: "In these lessons we work in the terminal.",
  keyPoints: ["Terminal, VS Code, desktop, web: same Claude Code","We teach in the terminal","Prefer VS Code? Fine, same tool","Next: the terminal itself"],
  notes: "Claude Code runs in the terminal, as an extension inside VS Code, and in the Claude desktop app and the browser: it is the same Claude Code. In these lessons we work in the terminal, so everyone sees the same screen and every step Claude takes. Someone who prefers VS Code can use the extension: everything we teach works there too. Tip for later: open VS Code next to your terminal, so you see the files Claude touches."
},

{ // Slide 36
  title: "The terminal",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Where Claude Code does its work.",
  type: "concept",
  visual: { term: [{ c: 'ls' }, { o: 'README.md  data  public  server.js' }, { c: 'git status' }, { o: 'On branch main · nothing to commit' }, { ask: 'Allow Claude to run npm test? (y/n)' }] },
  cards: [
    { title: "What the terminal gives you", body: "The terminal lets you interact with your computer and project through commands." },
    { title: "Same tools developers use", body: "Claude Code uses the same project tools developers already use for files, Git, applications and tests." }
  ],
  keyPoints: ["Name terminal anxiety directly","No need to memorise commands","Understand what you approve","That is the whole bar"],
  notes: "If anyone in the room is terminal-anxious, name it directly: they don't need to memorise commands, they need to understand what they're approving. That's the whole bar."
},

{ // Slide 37
  title: "Is Claude Code ready on your laptop?",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "A two-minute check, together, before the demo.",
  type: "context",
  visual: { cmdCards: [0, 1, 2] },
  cards: [
    { title: "1 · Is it installed?", body: "claude --version\nYou should see a version number." },
    { title: "2 · Start it", body: "claude\nLog in if it asks." },
    { title: "3 · Look around, then leave", body: "Inside Claude Code, type:\n/help\n/exit\nThumbs up when this works." }
  ],
  keyPoints: ["Everyone opens a terminal now", "claude --version, then claude", "Log in if asked, /help, /exit", "Count the thumbs up", "Stuck: note who, fix at the break"],
  notes: "Everyone installed Claude Code before the course; this slide only checks that it works, early, so there is time to fix problems at the break. Ask everyone to open a terminal and do the three steps with you: claude --version should print a version number; claude starts it (log in if it asks); /help shows what's available and /exit leaves again. Ask for a thumbs up (online: in the chat). Note who is stuck and fix their setup at the break, or at lunch at the latest: the first assignment is right after lunch and everyone works on their own laptop. Don't troubleshoot for the whole room here."
},


{ // Slide 38
  title: "Claude Code as an agentic tool",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "You are using an agent — not building one (yet).",
  type: "concept",
  visual: { popOut: 0, bot: 'head', place: 'popout', stepThrough: true, chipGrid: 3, chipIcons: ['🔍', '🗺', '✏️', '▶', '👁', '↻'],
    highlight: [{ in: 'tagline', text: 'existing agentic tool', tone: 'orange' }] },
  cards: [
    { title: "Claude Code can", body: "inspect a repository\nform a plan\nread and edit files\nrun commands and tests\ninspect results\nadjust its approach" }
  ],
  tagline: "Using Claude Code means using an existing agentic tool.",
  keyPoints: ["Say it explicitly","It reads, plans, acts and checks by itself","Using an agent, not building one","Building one: support day 4"],
  notes: "Important clarification, say it explicitly: Claude Code reads, plans, acts and checks by itself, so it is an agent; the general definition follows after the loop. But using Claude Code does not mean the room has built a standalone agent. Building your own agent comes in the support days (Day 4, the Claude Agent SDK) — plant it now."
},

{ // Slide 39
  title: "Agent loop",
  kicker: "DAY 1 · PART 2 · WORKING METHOD",
  subtitle: "A loop, not a line.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, art: 'loop' },
  items: [
    { label: "Observe" },
    { label: "Decide" },
    { label: "Act" },
    { label: "Check" },
    { label: "Repeat or stop" }
  ],
  tagline: "Claude Code is an agent because it loops, within a task you bound.",
  keyPoints: ["Five steps, keep Decide","Focus on the loop itself","Link to the method comes next"],
  notes: "Five steps, all of them stay including 'Decide' — this is the confirmed final wording. Keep this slide focused on the loop itself; after this comes the general definition of an agent, and then the working method: where you stand around this loop."
},

{ // Slide 40
  title: "AI agents",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Not just answering — acting toward a goal.",
  type: "concept",
  visual: { hero: 0, popOut: 1, stepThrough: true, chipIcons: ['▶', '↻', '■', '✋'],
    highlight: [{ in: 'card:0', text: 'works toward a goal', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "An AI agent works toward a goal by gathering context, choosing actions, using tools and checking results." },
    { title: "It can", body: "continue\nadjust\nstop\nask for human input" }
  ],
  keyPoints: ["Keep it abstract and short","Agents act toward a goal","Next: Claude Code is one"],
  notes: "Keep this abstract and short. They've just seen one agent up close (Claude Code and its loop); now zoom out to the general definition. The next slide puts the human next to the agent."
},
{ // Slide 41: The working method: one loop, with you in it
  title: "The working method: you stay in the loop",
  kicker: "DAY 1 · PART 2 · WORKING METHOD",
  subtitle: "Six phases. Every assignment today is one of them. Claude does the work; you decide.",
  type: "concept",
  layout: "matrix",
  visual: { stepThrough: true, highlight: [{ in: "tagline", text: "you own the goal, the approvals and the final decision", tone: "orange" }] },
  matrix: {
    columns: ["Claude does", "You decide", "Leaves behind"],
    template: "minmax(8.5rem,.9fr) minmax(0,1.3fr) minmax(0,1.5fr) minmax(0,.9fr)",
    accent: 1,
    rows: [
      { title: "Plan", sub: "What do we want?", cells: ["Asks you questions", "Set the goal, and what done means", "intent.md"] },
      { title: "Design", sub: "How do we build it?", cells: ["Proposes a plan in layers", "Approve the plan, or ask for smaller", "the plan"] },
      { title: "Build", sub: "Small steps", cells: ["Writes the code, layer by layer", "Approve each change, commit what works", "commits"] },
      { title: "Test", sub: "Evidence, not confidence", cells: ["Writes and runs the tests", "Check the evidence: fail once, then pass", "tests/"] },
      { title: "Deploy", sub: "Share it", cells: ["Pushes to GitLab", "Approve the push. Merging is yours.", "GitLab project"] },
      { title: "Maintain", sub: "Hand it over", cells: ["Writes the handover", "Could someone else carry on?", "PROGRESS.md"] }
    ]
  },
  tagline: "Claude does the work, but you own the goal, the approvals and the final decision.",
  keyPoints: [
    "One loop, six phases: every assignment is one",
    "Read across: Claude does, you decide, it leaves a file",
    "Human in the loop = the orange column",
    "The agent loop runs inside each phase",
    "Tomorrow: the same loop, as a team"
  ],
  notes: "Say: This is how every assignment today works: six phases, from 'what do we want?' to 'hand it over'. Software teams call it the software development life cycle. Claude does most of the work in each phase, but you decide: the goal, every approval, the final word. That is what being the human in the loop means.\n\nWhat you see: Click: one phase per row. Read each row across: what Claude does, what you decide (the orange column), and the file it leaves behind, so the next person, or tomorrow's session, can carry on.\n\nLink back: The agent loop from two slides ago (observe, decide, act, check) is what Claude does inside each phase. This slide puts you around it.\n\nBackground: Every assignment's kicker names its phase (PLAN, DESIGN, BUILD, TEST, DEPLOY, MAINTAIN), so people always know where they are. Day 5 (AI-native SDLC) uses exactly this loop and these file names, so the team project on Days 6 and 7 starts from something familiar. Tomorrow afternoon the same loop runs as a team.\n\nNext: Ground rules: what you share."
},



{ // Slide 42
  title: "Ground rules: what you share",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "From now on you work on your own laptop. These rules apply both days.",
  type: "context",
  visual: { checklist: 0, bot: 'think', place: 'left' },
  cards: [
    { title: "What you share", body: "Practice data only: no Worldline or customer data\nNo passwords, API keys or internal documents\nNo real photos or personal details in your game\nPush only to your own repo on Worldline's GitLab" }
  ],
  keyPoints: ["Say each line out loud","Practice data only","No passwords, keys or internal documents","No real photos or personal details","Push only to your own GitLab repo"],
  notes: "From now on everyone works on their own laptop, so say these out loud, once. Practice data only: no Worldline data and no customer data. No passwords, API keys or internal documents. No real photos, contact details or confidential text in what you build: your avatar this afternoon is a generated picture. Push only to your own repo on Worldline's GitLab: that is where your game lives this afternoon."
},

{ // Slide 43
  title: "Ground rules: what you approve",
  kicker: "DAY 1 · PART 2 · CLAUDE & CLAUDE CODE",
  subtitle: "Claude Code asks before it acts. You decide.",
  type: "context",
  visual: { badges: ['🔍', '🔐', '🛡️'], bot: 'point', place: 'aside',
    highlight: [{ in: 'tagline', text: 'say no', tone: 'orange' }] },
  cards: [
    { title: "Read before you approve", body: "" },
    { title: "Never skip permissions", body: "" },
    { title: "Respect IT policy", body: "" }
  ],
  tagline: "Not sure what it does? Then say no, and ask Claude to explain.",
  keyPoints: ["Read before you approve: don't understand it, say no","Never turn all approvals off","IT says no = no workarounds","Next: how approving works"],
  notes: "Three rules about what you approve. Read before you approve: if you don't understand a command, say no and ask Claude what it does. Never skip permissions: don't use the option that turns all approvals off, whoever suggests it. Respect IT policy: if something is blocked, that is the answer. No workarounds, no personal accounts, no borrowed logins or keys. The next slide shows how approving works in Claude Code."
},

{ // Slide 44
  title: "A tour of Claude Code",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "One screen, six parts. Each one gets its own moment today.",
  type: "concept",
  visual: { tour: {
    title: "claude · ~/my-project",
    screen: [
      { k: "dim", t: "✻ Welcome to Claude Code" },
      { k: "dim", t: "  cwd: ~/my-project", n: [1] },
      { k: "user", t: "> make the page title bigger" },
      { k: "tool", t: "● Read(CLAUDE.md)", n: [2, 6] },
      { k: "tool", t: "● Update(index.html)", n: [2] },
      { k: "out", t: "  ⎿  1 line changed", n: [2] },
      { k: "tool", t: "● Bash(npm test)", n: [2] },
      { k: "ask", t: "  Run this command?\n  ❯ 1. Yes   2. Yes, don't ask again   3. No", n: [3] },
      { k: "user", t: "> /", n: [5] },
      { k: "menu", t: "  /help  /model  /context  /mcp  …", n: [5] },
      { k: "mode", t: "⏵⏵ accept edits on (shift+tab to cycle)", n: [4] }
    ] } },
  cards: [
    { title: "Your folder", body: "You start claude in a folder. That folder is where it works." },
    { title: "Tools", body: "Claude reads files, edits them and runs commands. Every step shows up on screen." },
    { title: "The question", body: "Before a change or a command, it asks. You answer 1, 2 or 3." },
    { title: "Modes", body: "How much may it do before it asks? Shift+Tab switches. Next slide." },
    { title: "The / menu", body: "Type / for everything else: help, model, context, connections." },
    { title: "Files that steer it", body: "CLAUDE.md: what it knows.\nsettings.json: what it may do." }
  ],
  keyPoints: [
    "Click: one part at a time, the screen lights up",
    "Folder, tools, the question",
    "Modes and / menu: the next two slides",
    "Files that steer it: you make them today",
    "Then show it live in an empty folder"
  ],
  notes: "A map before the details: everything they will see on the screen today, in one picture. Click through the six parts; each click lights up the matching line on the screen. 1 Your folder: claude works in the folder you start it in, so you always start it in your own project folder. 2 Tools: reading, editing and running commands; every step is a line with a dot, so you can follow what it does. 3 The question: before a change or a command it asks; 1 is yes once, 2 is yes and don't ask again for this kind of thing, 3 is no. Read before you answer. 4 Modes: how much it may do before it asks; the bottom line says which mode you are in. Next slide. 5 The / menu: everything else lives behind /. The slide after next. 6 Files that steer it: CLAUDE.md and .claude/settings.json; they don't exist yet, they make them today. Notice on the screen: in accept edits mode the file edit went through without a question, but the command still asks.\n\nThen show it live: make an empty folder, start claude in it, type one small request and let them see the same parts on a real screen. Their screen will look a little different (version, colours, wording): that is fine, the parts are the same."
},

{ // Slide 45
  title: "Modes: how much Claude may do by itself",
  kicker: "DAY 1 · PART 2 · MODES",
  subtitle: "Shift+Tab switches the mode. You see it at the bottom of the screen. Reading your files never needs a yes.",
  type: "concept",
  layout: "matrix",
  visual: { stepThrough: true, highlight: [{ in: "tagline", text: "manually approve edits", tone: "orange" }] },
  matrix: {
    columns: ["Edits files", "Runs commands", "Pick it when"],
    rows: [
      { title: "Manual", sub: "manual mode on", cells: [["ask", "Asks you"], ["ask", "Asks you"], "You're learning, or the code is new to you. Today's default."] },
      { title: "Accept edits", sub: "accept edits on", cells: [["yes", "Just does it"], ["ask", "Asks you"], "You agreed on what to change and read the result after. Pushing or installing still stops for you."] },
      { title: "Plan", sub: "plan mode on", cells: [["no", "Not yet"], ["no", "Only to look around"], "The change is big, or you're not sure how. See the plan before anything changes."] },
      { title: "Auto", sub: "auto mode on", cells: [["yes", "Just does it"], ["yes", "Risky ones are checked"], "A clear task, tests and git as a safety net, and you review after. Not today."] }
    ]
  },
  tagline: "Check the bottom line after every restart. Approving a plan? Pick “manually approve edits”, not the auto mode default.",
  keyPoints: [
    "Shift+Tab cycles the modes",
    "The question: what may Claude do before it asks?",
    "Manual vs accept edits: only file edits differ",
    "Plan: look and plan, change nothing",
    "Auto: not today",
    "A restart can bring back auto mode",
    "Plan approval: choose option 2"
  ],
  notes: "Manual vs accept edits, the question people ask: the only difference is file edits. In manual Claude stops before every file it writes and before every command. In accept edits it writes files straight away, and still stops before every command (git push, npm install, npm test). So accept edits is for when you already agreed on what to change and would only be pressing yes ten times; you read the result afterwards (or Esc Esc to undo). Commands are where the real risk is, and they still ask. Reading files never asks, in any mode. Your own allow and ask rules in .claude/settings.json (Assignment 4) apply on top of every mode.\n\nWhen do you use which, today: manual for everything; plan mode in Assignment 5; accept edits briefly in Assignment 10 to see that your ask rule still stops it. Auto is for later: long, clear tasks with tests and git behind them.\n\nThe mode is the first thing the user controls: how much may Claude do before it asks? Show it live: press Shift+Tab a few times and read the label at the bottom. In Claude Code 2.1.309 the order is manual, accept edits, plan, auto. Manual asks before every edit and command. Accept edits lets file edits through, commands still ask. Plan mode is read-only until you approve. Auto mode keeps going, while risky actions are still checked. Two traps from the dry run, say them out loud: 1) Claude Code starts in your default mode, and on some laptops that's auto mode; every restart goes back to it, so check the bottom line after every restart and Shift+Tab to manual. 2) When you approve a plan, the first and highlighted option is 'Yes, and use auto mode'. Pressing Enter switches Claude to auto mode and it stops asking. Always choose option 2, 'Yes, manually approve edits'. There is also an option to skip all permission checks for automated setups: it exists, we don't use it."
},

{ // Slide 46
  title: "The / menu",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "Type / and Claude Code shows everything it can do.",
  type: "concept",
  visual: { lineReveal: 0, bot: 'head', place: 'beside' },
  cards: [
    { title: "Try these", body: "/help: everything Claude Code can do\n/model: choose Haiku, Sonnet or Opus\n/permissions: what Claude may do without asking\n/statusline: what you see at the bottom\n/memory: open your CLAUDE.md\nYour skills: they show up in this menu too" }
  ],
  keyPoints: ["Type / live","/help, /model","/permissions: link to the gate","/statusline: show a nice one","/memory opens CLAUDE.md","Skills appear here too (Day 2)"],
  notes: "Type / live and scroll through the menu. /help shows everything Claude Code can do. /model lets you choose Haiku, Sonnet or Opus: remember the model-choice slide. /permissions shows what Claude may do without asking: the gate from a few slides ago. /statusline sets what you see at the bottom of the screen; show a good example. /memory opens your CLAUDE.md, which is coming up. And the skills you install or make show up in this menu too: that's tomorrow."
},

{ // Slide 47
  title: "Lunch",
  kicker: "DAY 1 · LUNCH",
  subtitle: "Enjoy your lunch.",
  type: "pause",
  visual: { countdown: 60, bot: "wave", place: "beside" },
  cards: [
    { title: "Back at 13:00", body: "We continue with your own Snake." }
  ],
  keyPoints: [
    "Lunch: resume at 13:00",
    "Fix anyone still stuck on setup",
    "Check the GitLab MCP command works",
    "Assignments start right after lunch"
  ],
  notes: "Exact resume time: 13:00. Use the break to fix anyone whose Claude Code still doesn't work, and check on your own laptop that the GitLab MCP command you hand out works (Assignment 7 this afternoon)."
},
{ // Slide 48b
  title: "Today you build Snake",
  kicker: "DAY 1 · PART 2 · YOUR GAME",
  subtitle: "Snake is just the practice project. What you take home is how to work with Claude Code.",
  type: "context",
  visual: { opener: "showcase", image: "assets/examples/snake-game.svg", imageLink: "aether-snake/index.html" },
  keyPoints: [
    "Snake: one game for the whole day",
    "Eat, grow, don't hit yourself",
    "Everyone knows the rules",
    "Make it yours: nickname, avatar",
    "Each step teaches one skill",
    "The picture is an example: theirs will differ"
  ],
  notes: "Say: Before anyone starts Claude Code, tell them what they'll build: Snake, in the browser. Eat, grow, and don't hit yourself. Not everyone likes games, so say it plainly: Snake is only the practice project. What they take home is how to work with Claude Code.\n\nWhy Snake: Everyone knows how it should behave, so when Claude gets something wrong, people see it straight away: they judge Claude's work instead of learning a new game. It runs in the browser without installing anything.\n\nMake it yours: A nickname and an avatar on the start screen, their own colours and ideas.\n\nStep by step: The game is only the vehicle. What they learn is the way of working (plan, build, test, put it online), and every step adds one Claude Code skill.\n\nWhat you see: An example of a finished game. Theirs will look different: Claude never builds the same game twice, and that's fine.\n\nNext: Assignment 1: start Claude Code in your own folder."
},

{ // Slide 49
  type: "practice",
  layout: "exercise",
  title: "Assignment 1: Start Claude Code in your own folder",
  kicker: "DAY 1 · ASSIGNMENT 1 · SETUP",
  subtitle: "Copy each box into your terminal and press Enter.",
  calm: true,
  steps: [
    { text: "Make your folder", prompt: "mkdir aether-snake\ncd aether-snake\ngit init", after: "“Initialized empty Git repository”" },
    { text: "Start Claude Code", prompt: "claude", after: "Trust this folder? Press ↓ to Yes, then Enter. Enter alone quits.", warn: true },
    { text: "Look around. Esc to leave.", cmds: ["/help", "/model"] },
    "Shift+Tab until the bottom says “manual mode on”",
    { text: "Ask your first question", prompt: "What is in this folder?", after: "Empty. It didn't ask: reading needs no yes." }
  ],
  expected: "Claude Code runs in your folder, in manual mode.",
  keyPoints: [
    "git init: a repo on your own laptop, offline",
    "Trust the folder: ↓ first, the default is No",
    "/help, /model: Esc to leave",
    "Shift+Tab to manual mode on",
    "First question: reading needs no yes",
    "Stuck? Say it now"
  ],
  notes: "Say: You need a place to work, and a feel for the tool before it builds anything. An empty folder is all you need; no GitLab yet.\n\nDo together: Steps 1 and 2 on the projector, everyone at the same time. Wait at the trust question until every hand (or chat) says they're in. Then let them do 3 to 5 on their own.\n\nWatch for: The trust question. The highlighted answer is 'No, exit', so Enter quits Claude Code: arrow down first. Trusting matters later too: Claude Code only applies a project's own allow rules once the folder is trusted.\nWatch for: The mode at the start. Some laptops start in auto mode (personal or company settings). Everyone ends in manual mode: today Claude asks for everything.\nWatch for: /model. Enter sets a new default model; Esc only leaves.\n\nWhat you see: git init says 'Initialized empty Git repository': a repo on your own laptop, no internet needed. GitLab comes later, when there is something to share. The first answer comes without a question: Claude may read, it asks before it changes or runs something (the Modes slide).\n\nIf stuck: 'claude: command not found' or a login that fails: note the name, fix it at the break, and let them follow on the shared screen until then. Windows: the three lines work in PowerShell too; paste them one by one if the terminal only runs the first.\n\nNext: Why intent.md first? Their folder is empty and Claude is waiting: before it builds anything, they agree what they want."
},

{ // Slide 50c
  title: "Why intent.md first?",
  kicker: "DAY 1 · PART 2 · PLAN",
  subtitle: "Say only “build me Snake”, and Claude fills in the rest itself.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, bot: "think", place: "aside", highlight: [{ in: "tagline", text: "what done means", tone: "orange" }] },
  cards: [
    { title: "Without it", body: "Claude guesses: terminal or browser? Walls? How fast? You get a game, but not the one you had in mind." },
    { title: "intent.md", body: "A short file with what you want: the outcome, how you check it's done, and what Claude must not do." },
    { title: "Why a file", body: "Claude forgets between sessions, a file doesn't. Every next step, test and review checks against it." },
    { title: "Claude helps", body: "You don't write it alone: Claude asks you questions and writes the file. You read it and decide." }
  ],
  tagline: "No code yet. First agree what done means.",
  keyPoints: [
    "Vague prompt: Claude guesses",
    "intent.md: outcome, done when, boundaries, open questions",
    "A file outlives the chat",
    "Claude interviews, you decide",
    "Plan phase of the loop"
  ],
  notes: "This is the why behind the next assignment. Ask the room: what happens if you just type 'build me a Snake game'? Claude makes a lot of choices for you: in the dry run it offered a terminal or Python version, and picked walls, speed and controls on its own. You get something that works, but not what you had in mind, and you can't say whether it is done. intent.md is the Plan phase from the loop: what do we want, before how. Four parts: Outcome (what the game does), Done when (checks anyone can verify, not 'it's fun'), Boundaries (what Claude must not do, such as no personal data except a nickname) and Open questions. Why a file and not just the chat: a chat is gone after a restart, a file stays in the project, and from now on every plan, test and review points back to it. The nice part: you don't write it yourself. Claude interviews you with multiple-choice questions and writes the file; you read it and decide. Developers know this as requirements or a ticket; it's the same file Day 5 starts with."
},

{ // Slide 51
  type: "practice",
  layout: "exercise",
  title: "Assignment 2: Let Claude interview you",
  mode: "plan",
  kicker: "DAY 1 · ASSIGNMENT 2 · PLAN",
  subtitle: "Before Claude builds anything, decide what you want.",
  calm: true,
  steps: [
    "Shift+Tab until the bottom says “plan mode on”",
    { text: "Let Claude interview you", prompt: "Ask me questions, one at a time, about the Snake game I want to build. It's a browser game in plain HTML, CSS and JavaScript, and the start screen shows my nickname and avatar. Then write intent.md with:\n- Outcome: what the game does\n- Done when: three checks anyone can verify\n- Boundaries: what you must not do (for example: no outside links, no personal data except a nickname)\n- Open questions\nDon't write any code yet.", after: "Questions one at a time: pick with ↑↓ and Enter." },
    { text: "Approve the plan with 2: “Yes, manually approve edits”", after: "Not 1: that switches Claude to auto mode.", warn: true },
    { text: "Say yes to intent.md, then open it in VS Code", after: "Outcome, done-when checks, boundaries, open questions." }
  ],
  expected: "An intent.md with your outcome, three checks, boundaries and open questions.",
  keyPoints: [
    "Plan phase: what do we want?",
    "Claude interviews, you answer",
    "intent.md: outcome, checks, boundaries, OPEN",
    "Nothing else changes in plan mode",
    "Same file as Day 5"
  ],
  notes: "Say: One vague prompt gives you a game you didn't ask for. First agree what you want: this is the Plan phase. In plan mode Claude can't change anything except through the plan you approve.\n\nWatch for: Approving the plan. The first, highlighted option is 'Yes, and use auto mode': everyone chooses 2, 'Yes, manually approve edits'.\nWatch for: After Claude answers, a grey suggested next prompt sits in the input. It's only a suggestion: Enter sends it.\n\nWhat you see: Clickable multiple-choice questions, one at a time (audience, platform, walls, controls, high score, speed, pause). Then the plan, and intent.md.\n\nBackground: The prompt fixes 'browser game' and 'nickname and avatar' on purpose. In the dry run Claude also offered a terminal or Python version, which the rest of the course doesn't support, and without the nickname intent.md said 'no names', which clashed with the arcade later. intent.md is the same file Day 5 starts with. In the dry run Claude listed 'what happens when you press the opposite direction' as an open question: point at it, it's this afternoon's test.\n\nExtra: Push back on a check that is a wish ('the game is fun') until anyone can verify it.\n\nNext: Your AI in Claude Code."
},

{ // Slide 52
  title: "Your AI in Claude Code",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "Where everything lives: two folders it reads, and the connections it reaches out through.",
  type: "concept",
  visual: { stepThrough: ".cmap-step, .slide-main > .tagline", map: {
    tree: { root: "~", rootNote: "your home folder", groups: [
      [ ["├── ", ".claude/", "about you, every project", 1],
        ["│   ├── ", "CLAUDE.md", "memory: about you"],
        ["│   ├── ", "settings.json", "your own permissions"],
        ["│   └── ", "projects/…/memory/", "Claude's notes"] ],
      [ ["└── ", "aether-snake/", "your project, in git", 1],
        ["    ├── ", "intent.md", "what you want ✓"],
        ["    ├── ", "CLAUDE.md", "memory: this project"],
        ["    └── ", ".claude/settings.json", "permissions"] ]
    ] },
    inLabel: "loads", center: "Claude Code", centerSub: "reads both folders at the start", outLabel: "MCP",
    right: [
      { name: "Hands and feet", where: "Outside, through MCP", chips: [["GitLab", "this afternoon"], ["Jira", "support days"], ["Confluence", "support days"]] }
    ],
    apart: { name: "LibreChat", where: "In the browser · not part of Claude Code", note: "Quick questions, and images: your avatar, this afternoon." }
  } },
  tagline: "We set this up with you, step by step.",
  keyPoints: ["Opens the tour: the map first","Left: two folders, you and this project","Middle: Claude Code loads them at the start","Right: MCP, its hands and feet","Bottom: LibreChat, separate","Every file comes back today"],
  notes: "Say: Before we fill anything in, the map. Claude Code itself remembers nothing between sessions. What it knows and what it may do lives in files, in two folders, and it loads them every time it starts. Through MCP it reaches outside your laptop.\n\nWhat you see: Click: one part at a time. 1 ~/.claude/, a hidden folder in your home folder, next to your project, not around it: your personal CLAUDE.md (about you), your own settings.json and the notes Claude keeps for itself (auto memory). It stays on your laptop and counts for every project. 2 Your project folder: intent.md (done), CLAUDE.md for this project, and .claude/settings.json with the permissions. This folder goes into git, so the team gets the same instructions and permissions. 3 Claude Code in the middle: it loads both folders at the start of every session. 4 Hands and feet: through MCP it works in GitLab this afternoon, Jira and Confluence in the support days. 5 LibreChat: separate, in the browser, for quick questions and images.\n\nLink back: Every file here comes back today. Point back at this slide every time one of them comes up.\n\nWatch for: People think the project lives inside ~/.claude/ because of the projects/ folder there. It only holds Claude's notes and chat history per project; the code stays in the project folder.\n\nBackground: Project settings beat your own, and company settings beat both. /memory shows the loaded CLAUDE.md files and auto memory; /mcp shows the connections. Day 2 adds skills, agents and hooks to the same project folder.\n\nNext: Your context window in Claude Code."
},

{ // Slide 53
  title: "Your context window in Claude Code",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "The window from this morning, now on your own screen.",
  type: "concept",
  visual: { cmdCards: [0, 1, 2],
    highlight: [{ in: 'tagline', text: 'starts empty', tone: 'orange' }] },
  cards: [
    { title: "See it", body: "/context\nWhat fills your context window right now, in tokens." },
    { title: "Start fresh", body: "/clear\nA new conversation for a new task." },
    { title: "Make room", body: "/compact\nClaude summarises the conversation so far and goes on." }
  ],
  tagline: "A new session starts empty, apart from CLAUDE.md and memory.",
  keyPoints: ["Link back to the context window slide","/context live: show what fills it","/clear: new task, new conversation","/compact: summarise and go on","New session = empty, apart from CLAUDE.md"],
  notes: "This makes the context window from Part 1 concrete. Type /context live: it shows what fills the window right now, counted in tokens, including the system prompt, tools and CLAUDE.md. A long conversation fills it up and, just like on the Lego slide, irrelevant blocks pull attention away. /clear starts a fresh conversation: do that when you switch to a new task. /compact lets Claude summarise the conversation so far, so you can go on with more room. The tagline sets up the next slides: a new session starts empty, apart from what is written down in CLAUDE.md and memory."
},

{ // Slide 54
  title: "Context grows",
  kicker: "DAY 1 · PART 2 · TOUR",
  subtitle: "The more you work with it, the more it knows.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "Your first prompt", body: "It knows nothing about you yet. Everything comes from the prompt." },
    { title: "In one conversation", body: "Every prompt and answer adds context." },
    { title: "Day after day", body: "Only what is written down, in CLAUDE.md and memory files, carries over to the next session." }
  ],
  tagline: "What does Claude Code know about you today?",
  keyPoints: ["Rising line: experience grows","First prompt: knows nothing","Conversation adds context","A new session starts empty","Only what's written down carries over","Ask: what does it know about you today?"],
  notes: "Working with AI is a rising line. Your very first prompt starts from zero: it knows nothing about you. Within one conversation every prompt and answer adds context. A new session starts empty again: the model itself does not learn from you. Only what is written down, in CLAUDE.md and memory files, is read again next time. End on the question: what does Claude Code know about you today? For most people: nothing yet. That's what you fix in a few minutes, with your own CLAUDE.md."
},

{ // Slide 55
  title: "What does AI need to know first?",
  kicker: "DAY 1 · PART 2 · CLAUDE.MD",
  subtitle: "What would you tell a new colleague before they touch your project?",
  type: "context",
  visual: { reveal: 'click', buttons: true, bot: 'think', place: 'slot' },
  cards: [
    { title: "Who you are", body: "Your role, and what you need from this." },
    { title: "The project", body: "What it is and where things live." },
    { title: "The goal", body: "What “done” looks like." },
    { title: "The limits", body: "What it must not change, and when to stop and ask." },
    { title: "How to work", body: "Investigate first, show the plan, small changes, show evidence, mark OPEN, wait for approval." }
  ],
  keyPoints: ["Ask the room first", "Collect answers on the flipchart", "Then reveal one card at a time", "Last card = our working agreement", "This is what goes in a CLAUDE.md"],
  notes: "Don't show the answers yet. Ask the room: before a new colleague touches your project, what do you tell them first? Collect answers on the flipchart for a minute or two. Then reveal the cards one by one (click or →) and match them to what the room said. The last card is the working agreement for every exercise: investigate before changing, show the plan first, make small changes, run relevant checks, show evidence, mark uncertainty as OPEN and wait for human approval before committing. Frame it as the room's own agreement with Claude Code, not a rule imposed from outside. Then the bridge: Claude Code is that new colleague, every session again. You don't want to tell it all this every time, so you write it down once: that's CLAUDE.md, next."
},

{ // Slide 56
  title: "CLAUDE.md and memory",
  kicker: "DAY 1 · PART 2 · CLAUDE.MD",
  subtitle: "The model doesn't learn from you. Only what's written down carries over.",
  type: "concept",
  visual: { stepThrough: ".cmap-step, .slide-main > .tagline", highlight: [{ in: "subtitle", text: "written down", tone: "orange" }], map: {
    tree: { root: "~", rootNote: "your home folder", groups: [
      [ ["├── ", ".claude/", "about you", 1],
        ["│   ├── ", "CLAUDE.md", "you, in every project"],
        ["│   ├── ", "settings.json", "permissions: next slide", 0, 1],
        ["│   └── ", "projects/…/memory/", "Claude's own notes"] ],
      [ ["└── ", "aether-snake/", "your project", 1],
        ["    ├── ", "CLAUDE.md", "this project, in git"],
        ["    ├── ", "CLAUDE.local.md", "you here, not in git"],
        ["    ├── ", "intent.md", "pulled in with @intent.md", 0, 1],
        ["    └── ", ".claude/settings.json", "permissions: next slide", 0, 1] ]
    ] },
    inLabel: "loads", center: "Every new session", centerSub: "/memory shows what's loaded"
  } },
  keyPoints: [
    "The model doesn't learn: files carry over",
    "Same tree as the map, memory lit up",
    "You, the project, you-here, Claude's notes",
    "All loaded at the start of every session",
    "/memory shows them; keep them short"
  ],
  notes: "Say: Claude Code doesn't remember you, and the model never learns from you. What carries over from one session to the next is what's written down. These are the files it reads at the start, every time.\n\nWhat you see: The same folder tree as the map, with only the memory files lit up. Click: first ~/.claude/: CLAUDE.md is about you, in every project, only on your laptop; projects/…/memory/ holds the notes Claude writes itself when you say 'remember this' (auto memory). Then the project: CLAUDE.md is about this project and goes into git, so the team shares it; CLAUDE.local.md is your own notes for this project, not in git. Then the bot: all four land in every new session. The dimmed files are not memory: settings.json is the next slide, intent.md is only pulled in when CLAUDE.md says @intent.md.\n\nLink back: This is the left side of the map from a few slides ago. Two folders side by side in your home folder; the project is never inside ~/.claude/.\n\nWatch for: 'Isn't the project CLAUDE.md the master one?' No: ~/.claude/CLAUDE.md is about you, the project CLAUDE.md is about the project. Both are loaded; when they disagree, the project one usually wins because it's more specific. And ~/.claude/projects/ only holds Claude's notes and chat history per project, not your code.\n\nBackground: A line like @intent.md in CLAUDE.md pulls another file in at the start. /memory shows and opens all of them. Everything is loaded in every session, which is why it should stay short: tomorrow we'll move detail out of it.\n\nNext: Assignment 3, a CLAUDE.md for your game.",
  tagline: "Loaded at the start of every session, so keep it short."
},

{ // Slide 57
  type: "practice",
  layout: "exercise",
  title: "Assignment 3: A CLAUDE.md for your game",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 3 · PLAN",
  subtitle: "Tell Claude once how to work in this project.",
  calm: true,
  steps: [
    { text: "Type /clear, then ask", prompt: "Which instructions do you follow in this project?", after: "Claude guesses them from your files." },
    { text: "Write CLAUDE.md", prompt: "Write a short CLAUDE.md for this project:\n- A Snake game in plain HTML, CSS and JavaScript. No frameworks, no outside links.\n- Tests live in tests/ and run with npm test.\n- Always show me a plan before you change files.\n- The player name is a nickname. No real names, emails or other personal data in this repo.\n- Read @intent.md for what we're building.\nKeep it under 15 lines. Show it to me before you save it.", after: "Claude shows the file. Read it, then say yes." },
    { text: "Type /clear, and ask again", prompt: "Which instructions do you follow in this project?", after: "Now it names your instructions at once." },
    { text: "See which memory files are loaded. Esc closes the list.", prompt: "/memory" }
  ],
  expected: "After /clear, Claude names your project's instructions without searching for them.",
  keyPoints: [
    "/clear empties the conversation",
    "CLAUDE.md is loaded every session",
    "@intent.md pulls in another file",
    "Keep it short: it costs tokens every session",
    "/memory shows what's loaded"
  ],
  notes: "Say: After /clear the conversation is gone. Claude can read your files again, but it doesn't know your instructions. CLAUDE.md is the file it loads at the start of every session.\n\nAsk the room: Steps 1 and 3 are the same question on purpose. Let a few people read Claude's answer out loud, before and after.\n\nWatch for: A personal CLAUDE.md rule like 'use Tailwind' clashes with 'no frameworks'. Ask which rule wins, and why.\n\nWatch for: /memory takes no question after it: people type '/memory which files are loaded?'. It opens a list of memory files; Esc closes it with 'Cancelled memory editing', which is fine.\n\nWhat you see: Before: Claude guesses the rules from your files. After: it names exactly your rules, every session. /memory shows the project CLAUDE.md, the @-imported intent.md, your personal file and auto-memory.\n\nBackground: Ask about the rules, not 'what is this project': in the dry run Claude simply read intent.md and knew what the project was, even without CLAUDE.md. What it can't know without CLAUDE.md is your rules (no frameworks, npm test, plan first, nickname only). That is the difference between context (the conversation, gone after /clear), files Claude can search, and memory (CLAUDE.md, loaded every session without searching). @intent.md pulls that file in at the start of every session; tomorrow we'll measure what that costs. 'Tests run with npm test' is in the prompt on purpose: otherwise Claude may build browser-only tests, and the hook this afternoon needs a command.\n\nExtra: A personal ~/.claude/CLAUDE.md with your role and one preference. It stays on your laptop.\n\nNext: Decide first what Claude may do."
},

{ // Slide 58
  title: "Decide first what Claude may do",
  kicker: "DAY 1 · PART 2 · PERMISSIONS",
  subtitle: "Claude is about to edit your files and run commands. You set its permissions before it starts.",
  type: "concept",
  visual: { stepThrough: true, guides: [["🧭", "CLAUDE.md", "asks Claude"], ["🔒", "settings.json", "enforces"]] },
  cards: [
    { title: "Allow", body: "Claude may do it without asking. For example: running the tests." },
    { title: "Ask", body: "Claude must ask you first, every time. For example: git commit, git push." },
    { title: "Deny", body: "Never, even if you ask. For example: git push --force, rm -rf." },
    { title: "Where", body: "~/.claude/settings.json: you, everywhere\n.claude/settings.json: this project, shared\n.claude/settings.local.json: this project, only you\nCompany settings: always win" }
  ],
  tagline: "An instruction in CLAUDE.md can be forgotten. A permission in settings.json can't.",
  keyPoints: [
    "CLAUDE.md = a request, settings = enforced",
    "Permissions: always allow / never allow",
    "Hooks: Claude Code runs them, not Claude",
    "Shared file vs local file",
    "Two assignments follow: 5 and 6"
  ],
  notes: "Comes right after the CLAUDE.md assignment: CLAUDE.md asks Claude, settings.json enforces. Three kinds of permission: allow (no question), ask (a question every time), deny (never, even when asked; deny wins when rules overlap). Four levels: your own settings everywhere, the project's settings shared through git, the project's local settings only for you, and company-managed settings that always win (Worldline may have some). /permissions shows what's active. Claude Code always asks before it writes a settings file, and the project's allow rules only apply once you've trusted the folder. Hooks live in the same file; they come this afternoon."
},

{ // Slide 59
  type: "practice",
  layout: "exercise",
  title: "Assignment 4: Permissions before you build",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 4 · PLAN",
  subtitle: "Ask before saving. Never anything you can't undo.",
  calm: true,
  steps: [
    { text: "Write your permissions", prompt: "Write .claude/settings.json for this project:\n- Ask me before every git commit and every git push.\n- Never allow git push --force or rm -rf.\n- Never let Claude merge a merge request (glab mr merge, gh pr merge): I do that myself.\nShow me the file before you save it.", after: "Claude always asks before it writes settings.json. Read it, then say yes." },
    { text: "Restart Claude Code", cmds: ["/exit", "claude"], after: "Not manual at the bottom? Shift+Tab.", warn: true },
    { text: "See your permissions", prompt: "/permissions", after: "←→ shows the Ask and Deny tabs. Esc closes it." },
    { text: "Test it", prompt: "Run exactly this command: git push --force origin main", after: "Blocked by your permission settings. Which line in settings.json did that?" }
  ],
  expected: "Commit and push ask you first. Force push, rm -rf and merging your own merge request are blocked.",
  keyPoints: [
    "Permissions before building",
    "ask: commit and push",
    "deny: force push, rm -rf, merging",
    "Test with the exact command",
    "Writing settings.json always asks you"
  ],
  notes: "Say: Claude is about to touch your files and run git. Decide now what it may do, not after something goes wrong.\n\nWatch for: After the restart Claude Code starts in your default mode, and on some laptops that's auto. Everyone checks the bottom line.\nWatch for: Test with the exact command. In the dry run 'force push my work' did nothing visible: with no commits and no remote, Claude didn't even try. 'Run exactly this command: git push --force origin main' gets 'blocked by your permission settings' every time.\n\nWhat you see: Claude asks before it writes .claude/settings.json (always, even in accept-edits mode). Then the force push is blocked.\n\nA good result: { \"permissions\": { \"ask\": [\"Bash(git commit*)\", \"Bash(git push*)\"], \"deny\": [\"Bash(git push --force*)\", \"Bash(git push -f*)\", \"Bash(rm -rf *)\", \"Bash(glab mr merge*)\", \"Bash(gh pr merge*)\"] } }. Claude usually writes stricter rules (more variants) and explains honestly that text patterns can be worked around: worth a word.\n\nBackground: A rule matches how a command starts. 'git push --force origin main' is blocked, but 'git push origin main --force' puts the flag at the end, so it slips past the deny rule and only hits the ask rule: Claude still asks, but it isn't blocked. Someone will try it; that's the honest limit of text rules. Hooks (Assignment 11) can check the whole command.\n\nBackground: The merge deny keeps the human gate tomorrow: Claude Code later suggests 'merge the pull request' as a next prompt, and without this rule Claude would merge its own work.\n\nLook inside: Open .claude/settings.json. Which line blocked the force push?\n\nNext: Quiz: the working method."
},

{ // Slide 60
  title: "Quiz: the working method",
  kicker: "DAY 1 · QUIZ",
  subtitle: "In our working method, who makes the final decision?",
  type: "quiz",
  visual: { quiz: { answer: 1 }, bot: 'stretchLeft', place: 'pointer', pointAt: 1 },
  cards: [
    { title: "A", body: "Claude Code, once the tests pass." },
    { title: "B", body: "The human." },
    { title: "C", body: "Whoever wrote the plan." },
    { title: "D", body: "Nobody: the agent loop decides." }
  ],
  check: "Answer: B",
  keyPoints: ["Vote first: hands up per letter", "→ strikes the wrong answers", "Answer: B, the human decides"],
  notes: "Let the room vote before you reveal (hands up per letter). Press → to strike the wrong answers one by one. The answer is B: the human owns the goal, the boundaries and the final decision. Passing tests are evidence for that decision, not a replacement for it.\n\nNext: Snake in 5 layers."
},



/* ---------------------------------------------------------------------- */
/* DAY 1 — Part 3: Snake through the SDLC (afternoon)                     */
/* ---------------------------------------------------------------------- */


{ // Slide 61: Snake in 5 layers: the map before Assignment 5
  title: "Snake in 5 layers",
  kicker: "DAY 1 · PART 3 · DESIGN",
  subtitle: "Not one big prompt, but five small steps. Each one you can play, check and save.",
  type: "concept",
  visual: { stepThrough: ".layer-card, .slide-main > .tagline", layers: [
    { img: "assets/examples/snake-layer-1.svg", label: "Skeleton", caption: "A grid, and a snake that moves on its own." },
    { img: "assets/examples/snake-layer-2.svg", label: "Controls", caption: "The arrow keys steer the snake." },
    { img: "assets/examples/snake-layer-3.svg", label: "Food and score", caption: "Eat, grow, count your points." },
    { img: "assets/examples/snake-layer-4.svg", label: "Game over", caption: "Hit a wall or yourself: game over, play again." },
    { img: "assets/examples/snake-layer-5.svg?v=2", label: "Your style", caption: "Your nickname and avatar." }
  ] },
  tagline: "One prompt can build Snake. Layers let you steer it.",
  keyPoints: [
    "The map before the plan",
    "Five layers, each one playable",
    "Play, check, commit after every layer",
    "Layer 5 comes with your avatar this afternoon",
    "Next: Claude plans these five layers with you"
  ],
  notes: "Say: One prompt can build Snake: the dry run did it in under a minute. But then you can't steer it, you can't tell what broke, and you learn nothing about what's in the files. So we build it in five layers. After every layer you play it, check it and save it.\n\nWhat you see: Click: one board at a time. 1 Skeleton: a grid and a snake that moves by itself. 2 Controls: the arrow keys steer it. 3 Food and score: it eats, grows and counts. 4 Game over: a wall or your own tail ends the game, Space starts again. 5 Your style: your nickname and avatar on screen (Assignment 14). No best score: tomorrow the arcade leaderboard does that.\n\nTip: After every layer: reload the browser tab (F5 or Cmd+R) and play it. The first time, Claude opens index.html for you.\n\nLink back: Every layer is one small turn of the working-method loop: plan it, build it, check it, commit it.\n\nBackground: Layers 1 to 4 get built in Assignments 6 and 8. Layer 5 comes later this afternoon, when everyone has made an avatar in LibreChat. Real software gets built the same way: small slices that each work on their own.\n\nNext: Assignment 5: Claude plans these five layers with you."
},

{ // Slide 62
  type: "practice",
  layout: "exercise",
  title: "Assignment 5: Plan the 5 layers of your Snake",
  mode: "plan",
  kicker: "DAY 1 · ASSIGNMENT 5 · DESIGN",
  subtitle: "One big prompt gives you a game you can't steer.",
  calm: true,
  steps: [
    "Shift+Tab until the bottom says “plan mode on”",
    { text: "Ask for a plan in layers", prompt: "Read intent.md. Make a plan to build it in 5 layers: skeleton, controls, food and score, game over, your style (nickname and avatar). For each layer: which files change, and how I can check in 10 seconds that it works. Don't build yet.", after: "Five layers, each with a 10-second check." },
    "Too big? Choose 3 and ask for smaller layers.",
    { text: "Happy? Press Esc. Don't approve.", after: "Approving starts building. Esc keeps the plan, and nothing is built.", warn: true },
    "Shift+Tab back to “manual mode on”"
  ],
  expected: "A plan of five layers, each with its own check, and nothing built yet.",
  keyPoints: [
    "Design phase",
    "Layers you can steer",
    "Each layer has a 10-second check",
    "Reject a plan that's too big",
    "Nothing built yet"
  ],
  notes: "Say: One prompt can build Snake (the dry run did it in under a minute), but then you can't steer it and you learn nothing about what's in the files. If Claude builds it all at once, you can't tell what broke, or why. This is the Design phase.\n\nWatch for: Approving the plan. In plan mode, approving means 'go and build it', possibly all five layers at once. Here they press Esc: the plan stays in the conversation, and the next assignment builds one layer from it.\n\nIf someone approved by accident: Claude Code is now in auto mode and starts building everything. Esc stops it. Then empty input, Esc twice, pick the message before and 'Restore code and conversation' to remove what it wrote. Then Shift+Tab back to manual mode. In the dry run approving switched straight to auto mode.\n\nWhat you see: A plan with five layers: skeleton, controls, food and score, game over, your style, each with a check. Claude names the main file itself (game.js in the dry run, snake.js in another run), and often adds tests in layer 3 on its own: fine.\n\nExtra: Reject the first plan and steer it ('smaller', 'one file per layer').\n\nNext: Before you build: save points."
},


{ // Slide 63
  title: "Before you build: save points",
  kicker: "DAY 1 · PART 3 · GIT",
  subtitle: "git has been watching your folder since git init, but nothing is saved yet. Layer 1 is the first code worth saving.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, bot: "point", place: "beside", highlight: [{ in: "tagline", text: "it works → commit → push", tone: "orange" }] },
  cards: [
    { title: "Repository", body: "Your folder since git init. It can remember every version, but so far it holds none." },
    { title: "Commit", body: "A save point you can always go back to. Your first one: when layer 1 works." },
    { title: "Push", body: "Copies your commits to GitLab: safe, and visible to others. Your first push comes right after." }
  ],
  tagline: "From now on, after every layer: it works → commit → push. Claude runs git, you decide.",
  keyPoints: [
    "Why now: the first code is coming",
    "git init made a repository, still empty",
    "Commit: the first one after layer 1",
    "Push: right after, to GitLab",
    "Claude runs git, you decide"
  ],
  notes: "Say: You typed git init at the very start, and your permissions already mention commit and push. But nothing has been saved yet: the folder only had intent.md and CLAUDE.md. Next you build layer 1, the first real code. When it works, you save it: that's your first commit. Then you push it to GitLab.\n\nWhat you see: Click: three words. Repository: your folder, with a memory that's still empty. Commit: a save point, the first one when layer 1 works. Push: a copy on GitLab.\n\nBackground: For everyone who doesn't use git every day; developers can nod along. Today is only the rhythm: a layer works, commit, push. Claude runs the git commands and asks first (the house rule). Branches, merge requests and the rest come tomorrow, when there's a reason for them.\n\nNext: Assignment 6: build layer 1, look inside, commit."
},

{ // Slide 64
  type: "practice",
  layout: "exercise",
  title: "Assignment 6: Build layer 1, look inside, commit",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 6 · BUILD",
  subtitle: "A small step. Understand it. Save it.",
  calm: true,
  steps: [
    { text: "Build layer 1, and say yes to each file", prompt: "Build only layer 1 from the plan." },
    { text: "See it in your browser", prompt: "Open index.html in my browser.", after: "Claude asks to run a command: say yes. Do you see the board?" },
    { text: "Look inside", prompt: "Explain @game.js in plain words.", after: "Your file may be called snake.js: type @ and pick it." },
    { text: "Which files are new?", prompt: "!git status" },
    { text: "Save it. Claude asks first (your permission): say yes.", prompt: "Commit this layer with a clear message." }
  ],
  expected: "Layer 1 works, you can explain it, and it's committed.",
  keyPoints: [
    "Build phase: one layer",
    "@file points Claude at a file",
    "!command runs it yourself",
    "Commit = save point",
    "Claude asks: your permission from Assignment 4"
  ],
  notes: "Tip: The ! in !git status runs the command yourself, without Claude.\n\nSay: It works. Make a save point before you change anything else. A small step, understood, saved.\n\nWatch for: The file name is whatever Claude chose (game.js in the dry run, sometimes snake.js). Type @ and a list of files appears: pick the right one.\nWatch for: If Claude proposes a branch, say 'commit straight to main'. Branches come tomorrow.\n\nWhat you see: index.html, style.css and the game's .js file appear. The commit asks first, and the screen names the rule: 'Permission rule Bash(git commit *) requires confirmation'. The first commit includes CLAUDE.md, intent.md and .claude/settings.json: that's fine, they belong to the project.\n\nThree new controls: @file points Claude straight at a file, so it doesn't have to search (cheaper and faster). !git status runs a command yourself, and the output lands in the conversation; Claude even comments on it. A commit is a save point.\n\nLook inside: This is the real lesson. Which part draws the snake? If nobody can say, slow down.\n\nNext: Model Context Protocol."
},

{ // Slide 65
  title: "Model Context Protocol",
  kicker: "DAY 1 · PART 3 · MCP & GITLAB",
  subtitle: "One standard plug for approved connections.",
  type: "concept",
  visual: { plugs: 1, highlight: [{ in: 'tagline', text: 'does not remove permissions or human responsibility', tone: 'orange' }] },
  cards: [
    { title: "Definition", body: "MCP standardises how AI applications connect to approved information and capabilities." },
    { title: "An MCP server may expose", body: "resources\nreusable prompts\ntools" }
  ],
  tagline: "Connecting a server does not remove permissions or human responsibility.",
  keyPoints: ["Say the tagline explicitly","Link to the working agreement","Connected is not allowed to change"],
  notes: "Say the tagline explicitly and connect it back to the working agreement (What does AI need to know first?): being connected to something is not the same as being allowed to change it. An MCP tool goes through the same allow, ask and deny rules as a file edit or a command, so a read-only tool can be allowed and anything that writes can be ask or deny. Next: you connect GitLab yourself."
},

{ // Slide 66
  title: "git, GitLab and MCP",
  kicker: "DAY 1 · PART 3 · MCP & GITLAB",
  subtitle: "Three different things, often mixed up.",
  type: "concept",
  layout: "compare",
  columns: [
    { title: "git", items: ["Your folder and its history, on your own laptop.", "Works offline. git init made it."] },
    { title: "GitLab", items: ["The online copy of your repo.", "Safe if your laptop breaks. Others can see it."] },
    { title: "GitLab MCP", items: ["Lets Claude itself talk to GitLab:", "create a project, open a merge request, read an issue."], foot: "Your files never need MCP." }
  ],
  keyPoints: [
    "Keep the distinction crisp",
    "So far: built-in file tools only",
    "MCP is for everything outside",
    "Next: connect GitLab"
  ],
  notes: "Keep this crisp, it's the most common confusion. git is local: your folder and its history, no internet needed. GitLab is where the history is stored and shared; git push sends it there. The GitLab MCP is only so that Claude itself can act on GitLab: create the project, later open merge requests. Claude reads your files with its own built-in tools, no MCP needed."
},

{ // Slide 67
  type: "practice",
  layout: "exercise",
  title: "Assignment 7: Put your game on GitLab",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 7 · DEPLOY",
  subtitle: "Your save points are only on your laptop. Put them somewhere safe.",
  calm: true,
  steps: [
    { text: "Connect the GitLab MCP server", after: "/mcp shows GitLab connected." },
    { text: "Put your game on GitLab", prompt: "Create a private project called aether-snake-[nickname] in my personal GitLab space. Add it as the remote and push main. Ask me before you push.", after: "Claude creates the project, then asks before it pushes. Say yes." },
    "Open the project on GitLab in your browser. Is your commit there?"
  ],
  expected: "Your game and its commits are in a private project on GitLab.",
  keyPoints: [
    "Deploy phase: put it where others can see it",
    "MCP: Claude talks to GitLab",
    "Connect the GitLab MCP server",
    "The push asks: your permission",
    "No GitLab access: stay local"
  ],
  notes: "Say: Laptop gone, game gone. On GitLab it's safe, and tomorrow the arcade needs it. git is on your laptop; GitLab is the online copy; the GitLab MCP is what lets Claude itself create the project.\n\nBefore class: Check that every participant has GitLab access. Most managers do, not all.\n\nWhat you see: /mcp shows GitLab connected. Claude creates the project, then asks before it pushes, because of the ask permission ('Permission rule Bash(git push *) requires confirmation').\n\nBackground: In the dry run Claude also pointed out that the commits carry the author's email from git config. On Worldline's own GitLab that's normal, but it's a nice privacy moment.\n\nIf stuck: No GitLab access: keep working locally all afternoon. git pull tomorrow will then say there's no remote: ignore it.\n\nNext: Undo: checkpoints and commits. From now on the rhythm is: it works, commit, push."
},

{ // Slide 68
  title: "Undo: checkpoints and commits",
  kicker: "DAY 1 · PART 3 · UNDO",
  subtitle: "Two ways back. Commits are your save points. Checkpoints are Claude's own, made automatically.",
  type: "concept",
  visual: { figure: "assets/examples/undo-roadmap.svg?v=3", figureAlt: "Assignment 8 as a road: layer 2 and layer 3 work and get a commit, then the score is removed on purpose, Esc Esc goes back to the checkpoint before that, then layer 4 works and gets a commit.", highlight: [{ in: "tagline", text: "always", tone: "orange" }] },
  tagline: "Checkpoints are for the last few minutes. Commits are for always.",
  keyPoints: [
    "The road = Assignment 8",
    "Top: a checkpoint before every prompt",
    "Bottom: a commit after every working layer",
    "The break: Esc Esc back to before it",
    "Last few minutes: Esc Esc or /rewind. Older: git"
  ],
  notes: "Say: You'll break your game on purpose in the next assignment, and get it back. There are two ways back, and this road shows both.\n\nWhat you see: The road is Assignment 8, left to right. Layer 2 works: commit and push. Layer 3 works: commit and push. Then you remove the score on purpose: broken. Esc Esc, or typing /rewind, takes you back to the checkpoint just before that prompt (the orange arrow), and the score is back. Then layer 4: commit and push. Top lane: Claude makes a checkpoint before every prompt, but only in this session. Bottom lane: you make a commit after every layer that works; it stays forever, and after a push it's on GitLab.\n\nBackground: Esc twice (or /rewind) shows a list of earlier points; you choose to restore the code, the conversation, or both. It only covers Claude's own file edits in this session, not what a command did elsewhere, and it isn't shared. The broken step gets no commit, because it didn't work. Rule of thumb: last few minutes, Esc Esc; anything older, git.\n\nBefore class: Try Esc Esc on your teaching laptop so you know what the menu looks like in this version.\n\nNext: Assignment 8: layers 2 to 4, and one rescue."
},

{ // Slide 69
  type: "practice",
  layout: "exercise",
  title: "Assignment 8: Layers 2 to 4, and one rescue",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 8 · BUILD",
  subtitle: "Same rhythm for every layer. One thing goes wrong on purpose.",
  calm: true,
  steps: [
    { text: "Build layer 2: controls", prompt: "Build only layer 2 from the plan.", after: "Reload the tab (F5 or Cmd+R) and play it. Commit and push." },
    { text: "Same for layer 3: food and score", after: "“Build only layer 3 from the plan.” Play it. Commit and push." },
    { text: "Break it on purpose, then play it", prompt: "Remove the score entirely.", after: "Claude asks first, because of intent.md. Answer: “Yes, do it anyway. Leave intent.md as it is.”" },
    { text: "Rescue it: empty input, Esc twice", after: "↑ to the message before, Enter, “Restore code and conversation”. Then clear the old message from the input.", warn: true },
    { text: "Build layer 4: game over", prompt: "Build only layer 4 from the plan.", after: "Play it. Commit and push." }
  ],
  expected: "Layers 1 to 4 work and are on GitLab, and you've undone a change with Esc Esc.",
  keyPoints: [
    "The rhythm: works, commit, push",
    "Claude defends intent.md",
    "Esc Esc on an empty input",
    "Clear the old message after a rewind",
    "Layer 4 completes the game"
  ],
  notes: "Say: Things go wrong. Know how to get back before it matters. And the rhythm becomes a habit: layer works, commit, push.\n\nWatch for: Esc Esc only opens Rewind when the input is empty.\nWatch for: After a rewind the old message is back in the input. Enter would do it again, so clear it.\n\nWhat you see: Esc twice opens Rewind. Pick the message before the mistake, then 'Restore code and conversation' (also possible: code only, or conversation only). The score is back, without git. The menu warns that files changed by bash commands aren't restored.\n\nAsk the room: After step 3: why did Claude ask? Because intent.md says the score is shown. intent.md doesn't block anything, but Claude reads it and checks with you. You decide, so 'yes, do it anyway' works. 'Leave intent.md as it is' stops Claude from also rewriting intent.md to match, which it often offers.\n\nIf Claude doesn't ask: it can happen. Let them check intent.md: is the score in the Outcome or Done when? Then just say yes and go on to the rescue.\n\nBackground: In the dry runs a plain 'remove the score' made Claude stop and ask, because intent.md says the score is shown. Guides (intent.md, CLAUDE.md) make Claude ask; only tests, hooks and settings actually stop it, which is where the afternoon goes next. Removing the score also made Claude change the tests: that's why Assignment 10 protects tests/.\n\nNext: Short break (15 minutes), then A test: evidence, not confidence."
},

{ // Slide 70: Afternoon break
  title: "Short break",
  kicker: "DAY 1 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "Continuing with: a test that finds a bug." }
  ],
  keyPoints: ["Break: say the return time","Show the clock time on screen","Press ▶ Start on the timer","Everyone's game on GitLab?"],
  notes: "State the actual clock time you'll resume, out loud and (if possible) on screen. Everyone has now built layers 1 to 4. Use the break to help anyone whose game isn't on GitLab yet, or who is still stuck in a layer: after the break the topic changes from building to testing, and everyone needs a working game for that."
},

{ // Slide 71
  title: "A test: evidence, not confidence",
  kicker: "DAY 1 · PART 3 · TESTS",
  subtitle: "The rule: the snake never turns straight back. Moving right, the ← key does nothing.",
  type: "concept",
  visual: { figure: "assets/examples/snake-reverse.svg?v=3", figureAlt: "Three Snake boards in slow motion. The snake is moving right. 1: you press the up key; the game notes go up next, the snake hasn't moved yet. 2: you quickly press the left key; a careless game compares left with up, the key you just pressed, and says OK. 3: the snake moves left, into its own neck: game over. A good game compares left with where the snake really moves, right, and ignores it. The test presses both keys for you and checks: no game over.", highlight: [{ in: "tagline", text: "after every change", tone: "orange" }] },
  tagline: "Your game probably gets this right already. The test proves it, after every change.",
  keyPoints: [
    "The rule: never straight back",
    "Tricky case: the ↑ key, then quickly the ← key",
    "A careless game compares with the last key, not the real direction",
    "The test presses the keys and checks: no game over",
    "Why: you'd never press that fast, and changes can break it"
  ],
  notes: "Say: Claude says it works. A test shows it, every time. Here's the classic Snake bug. You're moving right and press left: in a good game nothing happens, the key is ignored. Now press up and then left very fast, both before the snake moves. A careless game accepts up, then accepts left (that's not the opposite of up), but the snake never went up: it turns back into itself. Game over, from two quick keys.\n\nWhat you see: The subtitle gives the rule. The three boards show the tricky case in slow motion. 1: the up key; the game notes 'go up next', but the snake only moves every 0.12 seconds, so it hasn't moved yet. 2: quickly the left key; a careless game compares left with up (the key just pressed), and left isn't straight back from up, so it says OK. 3: the snake moves left, but it was still moving right: straight back into its neck. Green bar: a good game compares with where the snake really moves. Orange box: what the test does, and why.\n\nWatch for: keep keys and directions apart when you talk. 'The left key' is what you press; 'left' is where the snake goes.\n\nSay: Your game probably gets this right already, so your test will likely be green first. That's fine: in the assignment you break it on purpose and see it turn red.\n\nAsk the room: Would you find the bug by playing? Almost never: you'd need two keys within 120 milliseconds.\n\nBackground: That's why it's a good test: it hides until someone presses fast, and it comes back when you change the speed or the controls. A test like 'the snake grows' is less useful: you'd see that break straight away. Tomorrow the tests grow with the levels: food never on a wall.\n\nNext: Assignment 9: your own test. Does your game have the bug?"
},

{ // Slide 72
  type: "practice",
  layout: "exercise",
  title: "Assignment 9: A test that finds a bug",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 9 · TEST",
  subtitle: "Your test presses the ↑ and ← keys very fast. Red means your game has the bug.",
  calm: true,
  steps: [
    { text: "Ask for a test", prompt: "Write a test in tests/ for this rule: when the snake moves right and I press the left arrow key, the game must not end. The same for the up arrow key and then the left arrow key, very fast. Run it with npm test and say in plain words what fails. Don't change the game yet: first show me if the test passes.", after: "Claude shows a plan, and the game stays untouched. Say “Go ahead.”" },
    { text: "Run it yourself: passed or failed?", prompt: "!npm test" },
    { text: "Failed? Let Claude fix the game", prompt: "The test fails. Fix the game so the snake can't turn straight back. Don't change the test.", after: "The game, never the test.", warn: true },
    { text: "Passed? Break the game on purpose", prompt: "Delete the check that ignores the opposite direction. Then run npm test.", after: "The test fails now: it catches the bug." },
    { text: "Undo: empty input, Esc twice, “Restore code”. Passes again?", prompt: "!npm test" },
    "Commit and push. This test now guards the rule."
  ],
  expected: "A test you've seen fail, and that passes now.",
  keyPoints: [
    "Test phase",
    "Test a hidden rule, not the obvious",
    "Reversing: the classic Snake bug",
    "Fails: a bug found. Passes: break it on purpose",
    "Fix the game, not the test"
  ],
  notes: "Say: A test turns 'I think it works' into 'I've seen it work, and I've seen it catch the bug.' You can't play every key combination after every change.\n\nWatch for: Claude fixes the game, never the test.\n\nWhat you see: Failed: the bug was there, and Claude fixes the game. Passed: Claude already guarded it, so break it on purpose and watch the test catch it. The ! in !npm test runs the command yourself, without Claude.\n\nWhy not plant the bug: Claude writes every game itself, and usually guards this rule. You can't hand out a buggy game without telling Claude to write a bug. So there are two paths: some games are red the first time (a real bug found), most are green (break it on purpose, then see red). Both end with a test you've seen fail.\n\nBackground: Why this test and not 'the snake grows'? Growing is the game itself; you'd see it break immediately. Reversing into yourself is the classic Snake bug: it hides until you press the wrong keys fast, and it comes back when you change the speed or the controls. Some games will be red the first time: the test found a bug nobody saw. In the dry run Claude had already guarded this rule in layer 2, so the test was green; then the point is to break it on purpose and see the test turn red. A test you've never seen fail is not evidence. npm test needs Node and a package.json; Claude makes the package.json.\n\nIf stuck: No Node on someone's laptop: ask for tests/test.html instead, and open it in the browser: green or red. The hook in Assignment 11 does need Node; they watch that one on the projector.\n\nNext: Assignment 10: The permissions grow."
},

{ // Slide 73
  type: "practice",
  layout: "exercise",
  title: "Assignment 10: The permissions grow",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 10 · TEST",
  subtitle: "Two new permissions: running the tests is always fine. Changing a test needs your yes.",
  calm: true,
  steps: [
    { text: "Add two permissions", prompt: "Add to .claude/settings.json:\n- allow: npm test, without asking\n- ask: any edit in tests/\nKeep the permissions that are already there. Show me the file before you save it.", after: "Claude shows the settings file. Read it, then say yes." },
    { text: "Try the first: tests may run", prompt: "Run the tests.", after: "No question: Claude just runs them." },
    "Shift+Tab to “accept edits on”: file edits now go through without asking",
    { text: "Try the second: a test needs your yes", prompt: "Change the test so it expects the snake to turn straight back.", after: "Claude asks before it changes the test. Choose No.", warn: true },
    "Shift+Tab to “manual mode on”. Commit and push."
  ],
  expected: "Claude runs the tests without asking, and a change to a test always needs your yes.",
  keyPoints: [
    "Permissions grow with the project",
    "allow: npm test",
    "ask: edits in tests/",
    "Why ask, not deny",
    "Approving safe things over and over trains clicking yes"
  ],
  notes: "Say: Asked to 'make the tests pass', Claude could change the test instead of the game. And it keeps asking to run npm test. Two permissions fix both.\n\nWatch for: In step 4 the answer is No. And everyone goes back to manual mode at the end.\n\nWhat you see: 'Run the tests': no question. In accept-edits mode every other file goes through, but a test file still asks.\n\nBackground: allow for npm test: approving a safe command over and over only teaches people to click yes without reading. ask for tests/, not deny: tomorrow they'll add new tests, so the rule is 'a test only changes with my yes'. Why accept-edits mode: in manual mode every edit asks anyway, so you can't see the rule working. In the dry run the allow rule worked straight away, without a restart. Claude also noted that npm test runs tests/run.js, so protecting tests/ protects what runs without asking. Edit(tests/**) covers new files too; a Write(tests/**) rule does nothing. Deny beats ask beats allow when several rules match.\n\nLook inside: /permissions: where do your new rules show up?\n\nNext: Hooks: a check that runs by itself."
},

{ // Slide 74
  title: "Hooks: a check that runs by itself",
  kicker: "DAY 1 · PART 3 · HOOKS",
  subtitle: "Your agent loops by itself. A hook is a fixed check at a fixed moment in that loop.",
  type: "concept",
  visual: { figure: "assets/examples/hooks-loop.svg?v=3", figureAlt: "The agent loop circle from slide 39: Observe, Decide, Act, Check, repeat or stop. Three hook moments are pinned on it. Before an action (PreToolUse): can stop the action. After an action (PostToolUse): runs npm test by itself; if it fails, Claude must deal with it. When Claude is done (Stop): one last check. Permissions decide what Claude may do in Act; hooks decide what always happens at a moment.", highlight: [{ in: "tagline", text: "never", tone: "orange" }] },
  tagline: "You forget to run the test. A hook never does.",
  keyPoints: [
    "The loop makes it an agent, not the hooks",
    "A hook = a moment + your command",
    "The moments are built into Claude Code",
    "Before an action it can block, after it reports back",
    "Permissions: may it? Hooks: what always happens"
  ],
  notes: "Say: Remember the agent loop from this morning: observe, decide, act, check, and again, by itself. That loop is what makes Claude Code an agent. A hook is a check you pin onto that loop: at a fixed moment, a command of yours runs. Claude doesn't have to remember it and can't skip it.\n\nWhat you see: The same loop circle as slide 39, with three moments pinned on it. Plain words big, the official name small: you'll see those names in settings.json. Before an action (PreToolUse) the hook can still stop it. After an action (PostToolUse) it already happened, so the hook can only report back: that's where 'run the tests' goes. When Claude says it's done (Stop): one last check.\n\nWatch for: 'Did we make up PreToolUse?' No. The moments and their names are built into Claude Code; you pick one. What runs (npm test) and for which action (Edit, Write, Bash) is yours. A 'tool' is one action of Claude: Read, Edit, Write, Bash.\n\nWatch for: hooks don't make Claude an agent; the loop does. Hooks make it safer to let the loop run longer, because the checks happen every time.\n\nBackground: Exit code 2 means: this failed, tell Claude. The message goes back into the loop, and Claude sees it in its Check step. Hooks run outside the context window, so only their output costs tokens. Other moments exist too, such as SessionStart and UserPromptSubmit. Day 5 builds a guard hook with allow, ask and deny on every tool call: this is the first step.\n\nLook inside: /hooks shows them.\n\nNext: what your settings.json looks like once the hook is in, then Assignment 11."
},

{ // Slide 75
  title: "Example: a complete settings.json",
  kicker: "DAY 1 · PART 3 · SETTINGS",
  subtitle: "Your permissions and your hook together in one file: .claude/settings.json",
  type: "concept",
  visual: { figure: "assets/examples/settings-example.svg?v=3", figureAlt: ".claude/settings.json after Assignment 11, with labels. Permissions: allow, no question, it just runs (npm test); ask, asks you every time (git commit, git push, edits in tests/); deny, never, even if you ask (force push, rm -rf, merging). Hook: moment PostToolUse, after Claude used a tool; which tool Edit|Write, only file changes; command npm test, run the tests. Fails? exit 2 sends it back to Claude." },
  tagline: "One file, shared with your team. Permissions are enforced, not requested.",
  prompt: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm test)\"],\n    \"ask\": [\n      \"Bash(git commit*)\",\n      \"Bash(git push*)\",\n      \"Edit(tests/**)\"\n    ],\n    \"deny\": [\n      \"Bash(git push --force*)\",\n      \"Bash(git push -f*)\",\n      \"Bash(rm -rf *)\",\n      \"Bash(glab mr merge*)\",\n      \"Bash(gh pr merge*)\"\n    ]\n  },\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"npm test 1>&2 || exit 2\"\n          }\n        ]\n      }\n    ]\n  }\n}",
  keyPoints: [
    "Where you end up after Assignment 11",
    "allow / deny under permissions",
    "PostToolUse hook, Edit|Write",
    "exit 2 sends the failure to Claude",
    "settings.local.json = only you"
  ],
  notes: "Say: This is where you end up after the next assignment: your permissions from Assignments 4 and 10, plus the hook. When Claude shows you the file in step 1, compare it with this one (the Example prompt button copies it). What you see: the file on the left, a label for each part on the right. The hook labels (moment, which tool, command) are the same as the chips in Assignment 11, step 2.\n\nWalk through it top to bottom: allow lets npm test run without a question; ask makes commit, push and any change in tests/ need a yes; deny blocks force push, rm -rf and merging your own merge request, even when asked; the PostToolUse hook runs the test after every Edit or Write, and exit 2 sends a failing test back to Claude. Claude's own version is often stricter; that's fine. After changing it, check with /permissions and /hooks.\n\nNext: Assignment 11: add the hook yourself."
},

{ // Slide 76
  type: "practice",
  layout: "exercise",
  title: "Assignment 11: Let a hook guard your game",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 11 · TEST",
  subtitle: "A hook runs the test by itself after every change. You can't forget it any more.",
  calm: true,
  steps: [
    { text: "Add the hook", prompt: "Add a hook to .claude/settings.json: after every file edit, run npm test. If the test fails, send the output back to you (exit code 2). Keep the existing permissions. Show me the file before you save it.", after: "Claude shows the file, and may test the hook first. Say yes." },
    { text: "Find your hook: moment, which tool, command. Esc to leave.", prompt: "/hooks", parts: [["Moment", "PostToolUse"], ["Which tool", "Edit|Write"], ["Command", "npm test"]] },
    { text: "Break the game on purpose", prompt: "In game.js, let the snake turn straight back into itself. Just do it.", after: "Say yes. The hook runs the test by itself: it fails, and Claude asks what to do." },
    { text: "Undo the break", prompt: "Throw that change away.", after: "game.js is back. The test passes again." },
    "Commit and push. The hook now tests every change."
  ],
  expected: "After every file change the test runs by itself, and a break gets caught.",
  keyPoints: [
    "PostToolUse, matcher Edit|Write",
    "npm test, failures back to Claude",
    "Change something risky",
    "The hook catches what you'd miss",
    "Throw away or rewind"
  ],
  notes: "Say: You keep forgetting to run the test after a change. A hook runs it by itself, after every edit.\n\nWatch for: On long commands Claude Code shows a tip to switch to auto mode: don't.\nWatch for: In the dry run Claude picked the built-in update-config skill by itself (a preview of tomorrow's skills) and tested the hook command before saving. Approve those steps: they only run the tests.\n\nWhat you see: A change that breaks a rule: the hook reports the failing tests at once ('The hook caught the conflict straight away'). Claude leaves the tests alone and asks whether to keep or undo the change.\n\nA good result: \"hooks\": { \"PostToolUse\": [ { \"matcher\": \"Edit|Write\", \"hooks\": [ { \"type\": \"command\", \"command\": \"npm test 1>&2 || exit 2\" } ] } ] }. Claude's own version is usually longer (it cds to the project folder and only prints on failure).\n\nBackground: Why not 'make the snake faster' as the break: in the dry run that change kept all tests green, so the hook stayed silent and nothing was learned. Letting the snake turn straight back makes the reverse tests from Assignment 9 fail. The broken change stays until someone undoes it: 'throw that change away' (git checkout of the file). /hooks is read-only: it shows the hook, changes go through settings.json. The game file may be snake.js instead of game.js: Claude finds it either way.\n\nLook inside: /hooks: which event, which matcher?\n\nThe three parts (step 2): the moment is a built-in name from Claude Code (PostToolUse: after Claude used a tool); which tool narrows it down (matcher Edit|Write: only after a file change); the command is yours (npm test). Students never write this by hand: they say it in plain words and Claude picks the moment.\n\nNext: Assignment 12."
},

{ // Slide 77
  type: "practice",
  layout: "exercise",
  title: "Assignment 12: Look at your context window",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 12 · BUILD",
  subtitle: "With every message, Claude rereads the whole conversation. Look inside, and make room.",
  calm: true,
  steps: [
    { text: "See what fills the window", prompt: "/context", after: "In tokens. What takes the most room?" },
    { text: "Shrink it, keep what matters", prompt: "/compact keep the test rules and the plan", after: "Claude sums up the conversation and carries on from the summary." },
    { text: "Look again", prompt: "/context", after: "The conversation is much smaller. CLAUDE.md is still there." },
    "For a new task, later: /clear empties the conversation. CLAUDE.md and your files stay."
  ],
  expected: "You know what fills the window, and when to use /compact or /clear.",
  keyPoints: [
    "Every message rereads the conversation",
    "/context: what costs what",
    "/compact: summarise, keep what matters",
    "/clear: new task, empty conversation",
    "CLAUDE.md survives both"
  ],
  notes: "Say: With every message Claude rereads the whole conversation. A long session gets slower, more expensive and more distracted. Link back to the context-window slide this morning.\n\nWhat you see: /context shows what fills the window right now: the system prompt and tools, MCP tools, CLAUDE.md, and the conversation, in tokens.\n\nBackground: /compact summarises the conversation and keeps going; you can say what to keep. /clear empties it, for a new task. CLAUDE.md and the files on disk survive both.\n\nLook inside: What takes the most room? Do you still need it?\n\nNext: Assignment 13: Make your avatar in LibreChat."
},

{ // Slide 78
  title: "Assignment 13: Make your avatar in LibreChat",
  mode: "librechat",
  kicker: "DAY 1 · ASSIGNMENT 13 · BUILD",
  subtitle: "Your character for tomorrow's leaderboard. No real name, no email, no photo.",
  calm: true,
  type: "practice",
  layout: "exercise",
  visual: { cardImages: ["assets/avatars/avatar-cartoon.webp", "assets/avatars/avatar-superhero.webp", "assets/avatars/avatar-jipjanneke.webp"] },
  cards: [
    { title: "Cartoon", body: "" },
    { title: "Superhero", body: "" },
    { title: "Jip and Janneke", body: "" }
  ],
  steps: [
    "Open LibreChat and pick the image generator from the library",
    { text: "Describe only how your avatar looks. Fill in the look, then send", prompt: "Create a square cartoon avatar of a character: [describe the look — hair, glasses, outfit], holding a laptop and a coffee. Bright colours, plain background, no text.", after: "Rather a superhero or Jip and Janneke? See the Example prompt button." },
    { text: "Download it, and pick a nickname", after: "Nothing that says who you are: no real name, email or photo.", warn: true }
  ],
  expected: "A square avatar and a nickname, with nothing that says who you are.",
  prompt: "Cartoon:\nCreate a square cartoon avatar of a character: [describe the look — hair, glasses, outfit], holding a laptop and a coffee. Bright colours, plain background, no text.\n\nSuperhero:\nCreate a square comic-book superhero portrait of a character: [describe the look]. Cape, city skyline at night, no text.\n\nJip and Janneke:\nCreate a square avatar of a character as a Dutch Jip and Janneke silhouette: black on a plain coloured background. [describe the look]. No text.",
  keyPoints: [
    "Fun, keep the energy high",
    "Describe looks only",
    "No real name, email or photo",
    "Pick a nickname",
    "Check everyone downloaded the file"
  ],
  notes: "Say: Keep the energy high: this is meant to be fun. This is your character for tomorrow's leaderboard.\n\nWatch for: The privacy rule for the whole arcade. The avatar only describes how the character looks, and the game only shows a nickname. No real name, email, employee number or photo, because tomorrow every game is on a shared website. Don't paste anything from your personal CLAUDE.md.\n\nWhat you see: LibreChat itself doesn't make images: in the library you pick the image generator. The three thumbnails are AetherBOT, made with the three starting prompts.\n\nBackground: The Example prompt button has three starting prompts: cartoon, superhero and Jip and Janneke (a well-known Dutch children's-book style by Fiep Westendorp, black silhouettes; explain it in one sentence for non-Dutch participants).\n\nBefore you move on: Make sure everyone has downloaded the file.\n\nNext: Assignment 14: Put your avatar in your game."
},

{ // Slide 79
  title: "Assignment 14: Layer 5, your avatar in your game",
  mode: "plan",
  kicker: "DAY 1 · ASSIGNMENT 14 · BUILD",
  subtitle: "Give the picture to Claude Code: it shows your character on the start screen.",
  calm: true,
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your player", body: "avatar\nnickname" }
  ],
  stepsHeading: "Do this:",
  steps: [
    "Put the picture in your game folder, in assets/",
    "Shift+Tab until the bottom says “plan mode on”",
    { text: "Fill in your file name and nickname, then send", prompt: "I put my avatar in @assets/[file name]. Show it with my nickname [nickname] on the start screen of my game. Without a picture, show the first letter of my nickname. Plan first and show me the plan before you change anything.", after: "Read the plan. Approve with 2: “Yes, manually approve edits”.", warn: true },
    "Play and check: avatar, nickname, and the first letter without a picture",
    "Commit and push"
  ],
  expected: "Your game shows your avatar and nickname. Without a picture it shows the first letter of your nickname.",
  keyPoints: [
    "LibreChat made it, Claude Code places it",
    "Picture into assets/ first",
    "Plan first, initials as fallback",
    "Tomorrow: name + picture go to the scoreboard"
  ],
  notes: "Say: The hand-off: LibreChat made the picture, Claude Code puts it in the game. Tomorrow the avatar and nickname go to the arcade leaderboard.\n\nWatch for: Approving the plan: option 2 again, not auto mode.\nWatch for: The fallback is the part people forget. Check the game without a picture too.\n\nWhat you see: @assets/… points Claude at the image; Claude can read images, so it can also describe it. The hook from Assignment 11 runs the test after this change too: it should.\n\nNext: Assignment 15: Hand it over."
},

{ // Slide 80
  type: "practice",
  layout: "exercise",
  title: "Assignment 15: Hand it over",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 15 · MAINTAIN",
  subtitle: "Tomorrow you continue. Maybe someone else does.",
  calm: true,
  steps: [
    { text: "Write the handover", prompt: "Write PROGRESS.md: what we built today, how we tested it, which permissions and hooks are active, and what is still open. No personal data.", after: "Say yes to PROGRESS.md." },
    "Read it: could a colleague carry on from this?",
    "Commit and push"
  ],
  expected: "PROGRESS.md is on GitLab, and someone else could carry on.",
  keyPoints: [
    "Maintain phase",
    "The handover file",
    "Same file as Day 5",
    "Commit and push",
    "Tomorrow: claude --continue"
  ],
  notes: "Say: Tomorrow's session starts empty. Only what's written down carries over. The Maintain phase closes the loop: the next person, or tomorrow's session, starts from PROGRESS.md.\n\nWhat you see: PROGRESS.md: what's built, how it was tested, which permissions and hooks are active, and what's still open.\n\nBackground: Day 5 uses the same file.\n\nNext: Day 1 learning note. Tomorrow starts with git pull and claude --continue, which takes you back into today's last conversation."
},

{ // Slide 81
  title: "Day 1 learning note",
  kicker: "DAY 1 · CLOSING",
  subtitle: "Five quiet minutes — in your own words.",
  type: "recap",
  visual: { notebook: 0, quietTimer: 5, highlight: [{ in: 'tagline', text: 'OPEN', tone: 'orange' }] },
  cards: [
    { title: "Record", body: "what you created\nhow you used Claude Code\nwhat you tested\nwhat you learned\nwhat remains unclear\nwhat you want to try tomorrow" }
  ],
  tagline: "Write the note yourself. Preserve uncertainty as OPEN.",
  keyPoints: ["Five genuinely quiet minutes","Raw, honest note, not Claude-polished","Protect the writing habit"],
  notes: "Give people genuinely quiet time to write it, five minutes is enough. The habit of writing a raw, honest note, not one polished by Claude, is worth protecting. Tomorrow starts with showing your game: this note helps them remember what they want to show and ask."
},

{ // Slide 82
  title: "Day 1 recap",
  kicker: "DAY 1 · CLOSING",
  subtitle: "Today you:",
  type: "recap",
  visual: { badges: ["🧭", "🧠", "🔒", "🐍", "✅", "🪝", "🚀"], bot: "happy", place: "aside", highlight: [{ in: "tagline", text: "Aether Arcade", tone: "orange" }] },
  cards: [
    { title: "Planned with intent.md", body: "" },
    { title: "Gave Claude a CLAUDE.md", body: "" },
    { title: "Set permissions first", body: "" },
    { title: "Built Snake in layers: commit, push", body: "" },
    { title: "Wrote a test that finds bugs", body: "" },
    { title: "Let a hook guard it", body: "" },
    { title: "Put it on GitLab and handed it over", body: "" }
  ],
  tagline: "Next: harder levels, your own skill and agent, and the Aether Arcade.",
  keyPoints: ["Preview only", "Don't explain skills yet", "Day 2 covers those", "End on the tagline"],
  notes: "Walk the loop once more: Plan (intent.md, CLAUDE.md, permissions), Design (layers), Build (commit and push), Test (a test and a hook), Deploy (GitLab), Maintain (PROGRESS.md). Preview only: don't explain skills or agents tonight."
},


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
  notes: "The board on the slide plays itself (autopilot). Click it and use the arrow keys to play yourself; click outside the game to get the slide keys back. Say: This is level 4. By tonight your Snake has levels like this, and you'll have built them three ways: with prompts, with skills, and with one command.\n\nThen everyone shows their Snake from yesterday, one minute each. Show: play it for a few seconds. Tell: one thing that went well, one thing that went wrong. Ask: what do you want to know after seeing the others? Online participants share their screen. Collect the questions on the flipchart: the recap answers them."
},

{ // Slide 85
  title: "Quiz: what do you remember?",
  kicker: "DAY 2 · QUIZ",
  subtitle: "Yesterday in five questions. Answer out loud first, then click to see the answer.",
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
  subtitle: "Yesterday's map, now with everything you made in it.",
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
  keyPoints: ["Same map as Day 1 slide 52", "Click: one part at a time", "Ticks: what you made yesterday", "PROGRESS.md: where today starts", "Answer the flipchart questions here"],
  notes: "Say: This is the map from yesterday (Day 1, slide 52), now with everything you made in it. Click through it one part at a time. 1 ~/.claude/: your personal CLAUDE.md, your own settings and Claude's notes, the same as yesterday. 2 Your project folder, with a tick on everything you made: intent.md, the project CLAUDE.md, .claude/settings.json with your permissions and the hook that runs npm test after every edit, the game in 5 layers, your avatar in assets/, the test in tests/ that caught the straight-back bug, and PROGRESS.md, the handover. 3 Claude Code loads both folders at the start of every session; PROGRESS.md it reads when you ask. 4 Through MCP it made your GitLab project; Jira and Confluence come in the support days.\n\nUse this to answer the questions from Show your game. Today the same folder gets spec.md, levels/, three skills, a workflow and an agent called Bobby in .claude/."
},

{ // Slide 87
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 16: Pick up where you left off",
  kicker: "DAY 2 · ASSIGNMENT 16 · PLAN",
  subtitle: "Yesterday's conversation is gone from Claude's head. Your files aren't.",
  calm: true,
  steps: [
    { text: "A new day: open a terminal, go to your game and get the latest", prompt: "cd aether-snake\ngit pull" },
    { text: "Open the code editor next to it", prompt: "code .", after: "VS Code left, the terminal right: you see every file Claude touches." },
    { text: "Start Claude Code in yesterday's conversation", prompt: "claude --continue", after: "Not “manual mode on” at the bottom? Shift+Tab." },
    { text: "Ask where you stopped", prompt: "Read PROGRESS.md. Where did we stop, and what's still open?", after: "Claude answers from the file, not from memory." },
    "In VS Code: find CLAUDE.md, intent.md, .claude/settings.json and your test. Which one did Claude just read?"
  ],
  expected: "Claude Code and VS Code are open on your game, and Claude knows where you stopped.",
  keyPoints: ["git pull every morning", "VS Code next to the terminal", "claude --continue or /resume", "PROGRESS.md carries over", "Find yesterday's files"],
  notes: "Part of the recap: hands on the keyboard before anything new. The loop goes round: yesterday's Maintain (PROGRESS.md) is today's Plan. git pull is the first thing developers do every morning. claude --continue goes back into the last conversation; /resume lets you pick one. Either way, the files are what really carry over.\n\nWhy now: a new day, a new session. Start from what's written down.\nWhat you see: Claude reads PROGRESS.md and knows where you stopped; VS Code shows the same folder as the recap map.\nLook inside: point at each file from the recap map in VS Code.\n\nNo PROGRESS.md (group didn't get to the handover)? Ask instead: “Look at this folder and the git log. What did we build, and what's still open?”"
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
    { img: "assets/examples/snake-level-1.svg", label: "Level 1", caption: "Your game from yesterday." },
    { img: "assets/examples/snake-level-2.svg", label: "Level 2", caption: "More food to finish, a longer snake, one obstacle." },
    { img: "assets/examples/snake-level-3.svg", label: "Level 3", caption: "More obstacles, a bit faster." },
    { img: "assets/examples/snake-level-4.svg", label: "Level 4", caption: "Faster, more in the way." },
    { img: "assets/examples/snake-level-5.svg", label: "Level 5", caption: "Almost a maze. Still playable." }
  ] },
  tagline: "Level 2 with prompts. Level 3 with skills. A test and Bobby check them. Levels 4 and 5 with one command.",
  keyPoints: ["Ask first: how would you make Snake harder?", "Click: one level at a time", "Harder, but still playable", "The tagline is today's route"],
  notes: "Ask the room first: what would make the next level of Snake harder? Collect a few answers, then click through the five boards. Every level turns the same knobs a little further: more food to finish, a longer snake at the start, more obstacles, a bit faster. Harder, but always playable: that rule comes back in the spec, the test and Bobby.\n\nThe tagline is the route of the day, read it out: level 2 with plain prompts, level 3 with three skills you make, then a test and a checker agent called Bobby, then one command that builds levels 4 and 5. Each time the same result, built a smarter way."
},

{ // Slide 89
  title: "intent.md and spec.md",
  kicker: "DAY 2 · PART 1 · DESIGN",
  subtitle: "Two files next to your code: why you build it, and exactly what you build. The example: the levels from the last slide.",
  type: "concept",
  visual: { stepThrough: ".dp-step, .slide-main > .tagline", docPair: {
    treeTitle: "Where they live",
    tree: [
      ["aether-snake/", "your project, in git"],
      ["├── CLAUDE.md", "how to work here"],
      ["├── intent.md", "why + what", "why"],
      ["├── spec.md", "exactly what", "what"],
      ["├── levels/", "built from spec.md"],
      ["└── tests/", "checks spec.md"]
    ],
    treeNote: "In the root, in git: the whole team reads the same two files.",
    link: "makes it exact",
    docs: [
      { name: "intent.md", badge: "Why + what", ask: "What do we want, and why?",
        lines: ["## Outcome", "Levels 2 to 5, each a bit harder.", "## Done when", "- you can play all five", "- no level is easier", "## Boundaries", "- always playable"],
        facts: ["In words, for people", "Changes when the goal changes"],
        when: { label: "Claude reads it", items: ["at the start of every session (@intent.md)", "when it makes a plan", "to check: is it done?"] },
        example: { prompt: "Make levels that get harder." },
        usersLabel: "Read by", users: ["you", "your team", "Claude"] },
      { name: "spec.md", badge: "Exactly what", ask: "What does it look like, exactly?",
        lines: ["## A level: levels/level-N.js", "value         min   max", "startLength     3     8", "speed (ms)     40   150", "obstacles       0    40", "foodToFinish    5    50", "## Example: level-2.js"], 
        facts: ["Fields, limits, an example", "Changes when the design changes"],
        when: { label: "Claude reads it", items: ["only when something points to it:", "your prompt, a skill or Bobby", "to build or check a level"] },
        example: { prompt: "Make level 3." },
        usersLabel: "Followed by", users: ["your 3 skills", "the level test", "Bobby"] }
    ],
    work: ["intent.md ≈ the why in a ticket or user story", "spec.md ≈ the API contract or the design spec"]
  } },
  tagline: "intent.md says why. spec.md says exactly what. Everything you build today follows spec.md.",
  keyPoints: ["Click: folder, intent.md, spec.md, at work", "Both in the project root, in git", "intent = why + what, in words", "spec = exact shape: fields, limits, example", "intent → spec → build → test"],
  notes: "Say: You just saw five levels. Before anyone builds one, we write two files. The content on the slide is today's wish, so you see what goes in each file with something real.\n\nClick through it. 1 Where they live: in the root of your project, next to CLAUDE.md, in git, so everyone and every Claude session reads the same files. 2 intent.md, the why and the what, in words: what we want (levels 2 to 5, each a bit harder), when it's done (you can play all five, no level is easier) and the boundaries (always playable). People read it; Claude reads it to plan. 3 spec.md, exactly what: what a level file contains, a minimum and a maximum for every value, and one example. The arrow says it: spec.md makes intent.md exact. 'A bit harder' and 'always playable' become numbers you can check. Each card also says when Claude reads it. intent.md: at the start of every session (CLAUDE.md pulls it in with @intent.md), when it makes a plan, and when it checks whether something is done. spec.md: only when something points to it (a prompt that says 'from spec.md', a skill's recipe, Bobby), so when it builds or checks a level. The two speech bubbles are the short version: 'Make levels that get harder' is an intent.md question, 'Make level 3' is a spec.md question. After Assignment 24, intent.md is no longer loaded by itself either: then it's read when needed, like spec.md. 4 At work: intent.md is the why in a ticket, spec.md is the API contract or the design spec.\n\nWhy this order: intent first, because you can't make something exact before you know what you want. Spec before building, because the next part builds from it: your three skills follow spec.md, the level test checks it, and Bobby uses it to say GO or NO-GO.\n\nWatch for: the field names on the slide are an example. Claude may choose others in Assignment 17 (startDelay instead of speed, for instance): fine, as long as every value has a minimum and a maximum.\n\nNext: Assignment 17, the same two files for your own game: first intent.md, then spec.md."
},

{ // Slide 90
  type: "practice",
  layout: "exercise",
  mode: "plan",
  title: "Assignment 17: The wish and the spec",
  kicker: "DAY 2 · ASSIGNMENT 17 · DESIGN",
  subtitle: "First the why in intent.md, then the exactly what in spec.md. Nothing gets built yet.",
  calm: true,
  steps: [
    "Shift+Tab to “plan mode on”",
    { text: "First the why: add the wish to intent.md", prompt: "New wish: levels 2 to 5, each a little harder than the one before, and always playable. Add it to intent.md: the outcome, done-when checks and boundaries. Don't build anything yet.", after: "Approve the plan with 2 (not 1). Open intent.md in VS Code: find Done when." },
    { text: "Shift+Tab to “plan mode on” again. Then the exactly what: spec.md", prompt: "Now write spec.md from the levels wish in intent.md: what a level file levels/level-N.js contains (food to finish, the snake's start length, the obstacles, the speed), a minimum and a maximum for every value so the game stays playable, and one example. A .js file, so the browser can load it straight from the folder. Don't build anything yet.", after: "Claude may ask a few questions. Pick with ↑↓ and Enter, approve with 2." },
    "Put them side by side in VS Code. Which line in spec.md makes “always playable” from intent.md exact?",
    { text: "Save it", prompt: "Commit and push intent.md and spec.md." }
  ],
  expected: "intent.md says why and when it's done; spec.md says what a level file looks like, with limits and an example.",
  keyPoints: ["Design phase", "Two prompts: why, then exactly what", "Plan mode for both", "Find the line that makes it exact", "Commit both"],
  notes: "Why now: you're about to build levels, and levels 3, 4 and 5 must look the same as 2. Describe it once, before building.\nWhat you see: intent.md gets a levels outcome with done-when checks; spec.md is a new file with fields, limits and an example.\nLook inside: step 4 is the point of the slide before: intent.md says 'always playable' in words, spec.md turns it into numbers (a minimum speed, a maximum number of obstacles).\n\nTwo prompts on purpose: the same order as the slide, why first, then exactly what. The second prompt says 'from the levels wish in intent.md', so Claude builds the spec on the intent.\n\nWatch for: Claude may put spec.md in levels/: fine. Field names may differ from the slide (startDelay, foodOnBoard): fine. Dry run (28 Oct): Claude listed its assumptions first (level 1 is today's game, game over goes back to level 1, 'You win' after level 5) and chose 5 food to finish level 1. If someone asks for 'more food on the board', Claude rightly reads that as easier: harder is more food to finish."
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
  subtitle: "Like yesterday's layers: one small step, play it, then the next. Only a little harder than level 1.",
  calm: true,
  steps: [
    { text: "Layer 1: more food to finish", prompt: "Create a branch level-2. Make levels/level-1.js from today's game and levels/level-2.js from spec.md, and load the levels in the game: after level 1's food goal you go to level 2. In this step level 2 only needs more food to finish than level 1.", after: "Reload the tab and play. Tip: ask for a test link like index.html?level=2." },
    { text: "Layer 2: a longer snake", prompt: "Next layer: in level 2 the snake starts longer than in level 1. Stay within spec.md.", after: "Reload and play." },
    { text: "Layer 3: obstacles", prompt: "Last layer: level 2 has a few obstacles. The snake never starts in one, and food never lands on one. Stay within spec.md.", after: "Reload and play. Still fair?" },
    { text: "Save it on the branch", prompt: "Commit and push the branch level-2.", after: "main stays untouched. Check: !git branch" }
  ],
  expected: "Level 2 needs more food, has a longer snake and a few obstacles, on the branch level-2.",
  keyPoints: ["A branch per feature", "Three small prompts, three layers", "Play after every layer", "Push the branch, not main"],
  notes: "Same rhythm as yesterday's five layers: one small change, play it, then the next. The hook from yesterday runs npm test after every edit. Claude also makes level-1.js: today's game as a level. Level 2 is only a little harder: that's what spec.md's limits are for.\n\nWhy now: level 2 is a new feature, and main must keep working while you build it.\nWhat you see: a branch level-2, levels/level-1.js and level-2.js, and the game going up a level.\nLook inside: !git branch: which branch are you on? Is main untouched?\n\nNotice for later: the three prompts are three jobs (food, snake, obstacles). Level 3 needs the same three again: that's the next part."
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
    { title: "Every level needs", body: "food\na snake\nobstacles\nwithin the limits in spec.md\non a branch" }
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
  title: "A skill is a recipe",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "Write down how you make the apple pie once. Bake it whenever you want.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside',
    highlight: [{ in: 'subtitle', text: 'once', tone: 'orange' }] },
  cards: [
    { title: "Built in", body: "Claude Code comes with a few. Type / to see them." },
    { title: "Your own", body: "You write the recipe yourself, in a SKILL.md." },
    { title: "Made by Claude", body: "You ask Claude to turn what you just did into a skill." }
  ],
  keyPoints: ["Recipe: write it once, bake it often","Built in: in the / menu","Your own SKILL.md","Or let Claude write it from your work"],
  notes: "A skill is a recipe. You write down once how you make the apple pie: ingredients, steps, when it's done. After that you bake it whenever you want, the same way every time. There are three kinds: built in (Claude Code comes with a few; type / and they're in the menu), your own (you write the SKILL.md yourself), and made by Claude (you ask Claude to turn what you just did into a skill). That last one is what you'll do with your Snake. Before class, type / on your teaching laptop and pick one built-in skill to point at."
},

{ // Slide 96
  title: "Inside a skill: SKILL.md",
  kicker: "DAY 2 · PART 2 · SKILLS",
  subtitle: "A skill is a folder with one file. The top of the file is the part Claude always sees.",
  type: "concept",
  visual: { code: 0, highlight: [{ in: "tagline", text: "always", tone: "orange" }] },
  cards: [
    { title: ".claude/skills/create-food/SKILL.md", body: "---\nname: create-food\ndescription: Adds the food to a level of the\n  Snake game. Use when a level needs food.\nallowed-tools: Read, Edit(levels/**)\n---\n\n# Create food\n1. Read the Food section of spec.md.\n2. A bit more food to finish than the level before.\n3. Never on an obstacle or the snake.\n4. Run npm test: green before you stop." },
    { title: "The frontmatter", body: "Between the two --- lines.\nname: the /name you type.\ndescription: when to use it.\nallowed-tools: what it may do without asking." },
    { title: "The body", body: "The recipe, in plain words. Read only when the skill is used." },
    { title: "Extra files", body: "A template or a script next to SKILL.md. Read or run only when the recipe points to them." }
  ],
  tagline: "Only the frontmatter is always loaded. The rest only when the skill is used.",
  keyPoints: ["Folder + SKILL.md", "Frontmatter between the --- lines", "description decides when Claude picks it", "allowed-tools: no question while it runs", "Body read only when used"],
  notes: "This is the anatomy. The three dashes above and below the top block are the frontmatter (Ryan's 'three stripes'): name, description and optional settings. Claude Code reads the frontmatter of every skill at the start of every session, so it knows which skills exist; that's why the description matters so much and why it must say when to use it. The body, the recipe, is only read when the skill is used. Extra files (a template, a script) cost nothing until the recipe points to them; a script is run, so only its output enters the context.\n\nallowed-tools: the tools this skill may use without asking you while it runs. Other frontmatter settings you'll meet today: disable-model-invocation: true (only you can start it, with /name) and argument-hint (what to type after /name).\n\nIn the code editor: a skill is just a folder under .claude/skills/. When Claude makes one you see the folder appear in VS Code's explorer, and the skill is in the / menu straight away, no restart."
},

{ // Slide 97
  title: "Where skills live, and who starts them",
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

{ // Slide 98
  title: "Prompt, CLAUDE.md and skill",
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
  notes: "All three are text Claude reads; they differ in when they apply. A prompt is this task, CLAUDE.md is every session, a skill is loaded when a task matches its description. None of them enforces anything: that stays in settings.json, as you saw yesterday with the permissions and the hook (guide vs enforce). Assignment 24 (a shorter CLAUDE.md) builds on exactly this difference."
},

{ // Slide 99
  title: "Skills in your role",
  kicker: "DAY 2 · PART 2 · PROMPT TO SKILL",
  subtitle: "In the game it's food, snake and obstacles. At work it looks like this.",
  type: "concept",
  visual: { stepThrough: true },
  cards: [
    { title: "Frontender", body: "A skill for a new component: your design system, your naming, a test for every state." },
    { title: "Backender", body: "A skill for a new endpoint: the contract first, tests, error handling, the same every time." },
    { title: "Manager", body: "A skill for the weekly status: read the Jira board, the same headings, the risks on top." }
  ],
  tagline: "Anything you explain to Claude twice can become a skill.",
  keyPoints: ["First the game, then your role","Frontend: component skill","Backend: endpoint skill","Manager: weekly status skill","Ask: which one would you build?"],
  notes: "Every concept first in the game, then in your role. A frontender could have a skill for a new component: their design system, their naming, a test for every state. A backender a skill for a new endpoint: the contract first, then tests and error handling, the same way every time. A manager a skill for the weekly status: read the Jira board, the same headings, risks on top. Ask the room: which skill would you build first for your own work?"
},

{ // Slide 100
  title: "Quiz: where does it go?",
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

{ // Slide 101
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 20: Skill 1, /create-food",
  kicker: "DAY 2 · ASSIGNMENT 20 · BUILD",
  subtitle: "You made the food for level 2 by hand. Now write down the recipe.",
  calm: true,
  steps: [
    { text: "Make the skill on a new branch", prompt: "Create a branch level-3. Turn how we made the food for level 2 into a skill in .claude/skills/create-food/. Frontmatter: name, and a description that says when to use it. Recipe: read the food rules in spec.md, make level N need a little more food to finish than the level before and stay within the limits, food never on an obstacle or the snake, then npm test must be green. Show me SKILL.md before you save it.", after: "Read it, then say yes." },
    "Open .claude/skills/create-food/SKILL.md in VS Code. Find the two --- lines. Which line tells Claude when to use it?",
    { text: "Is it there?", prompt: "/", after: "Type create and you'll see /create-food. No restart needed." },
    { text: "Save point", prompt: "Commit the skill on the branch level-3 and push it." }
  ],
  expected: "A /create-food skill with frontmatter and a recipe, committed on level-3.",
  keyPoints: ["Skill from your own work", "Frontmatter: name + description", "Recipe points to spec.md", "In the / menu straight away"],
  notes: "Why now: level 3 needs food again, exactly like level 2.\nWhat you see: a new folder .claude/skills/create-food/ in VS Code, with SKILL.md.\nLook inside: the description. Would Claude pick this skill if you said 'level 3 needs food'?\n\nThe recipe points to spec.md instead of repeating the numbers: one rulebook. The branch level-3 holds all three skills and level 3 itself; one merge request at the end."
},

{ // Slide 102
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 21: Skill 2, /create-snake, and its permissions",
  kicker: "DAY 2 · ASSIGNMENT 21 · BUILD",
  subtitle: "The second recipe. And this one may change level files without asking you.",
  calm: true,
  steps: [
    { text: "Make the skill", prompt: "Make a skill in .claude/skills/create-snake/ for the snake in level N: its start length and its speed, a little more than the level before, within the limits in spec.md, and the snake never starts in an obstacle. In the frontmatter, add allowed-tools so this skill may edit the files in levels/ without asking me. Show me SKILL.md before you save it.", after: "Find allowed-tools between the --- lines." },
    { text: "A rule for the whole project: secrets stay closed", prompt: "Add a deny rule to .claude/settings.json so Claude may never read .env files. Show me the change first.", after: "deny beats allow: no prompt can open it." },
    { text: "Try it", prompt: "Read the .env file.", after: "Claude can't: the deny rule stops it." },
    { text: "Save point", prompt: "Commit the skill and settings.json on level-3 and push." }
  ],
  expected: "A /create-snake skill with its own allowed-tools, and a deny rule for .env.",
  keyPoints: ["allowed-tools: per skill, while it runs", "settings.json: for the whole project", "deny beats allow and ask", "Secrets: deny, always"],
  notes: "Two kinds of permission side by side. allowed-tools in a skill's frontmatter: the tools that skill may use without asking, only while it runs. settings.json: rules for the whole project, for every session. deny beats everything: no prompt, no mode and no skill gets past it. Every real repo has secrets in .env files (API keys, passwords): a deny rule on them is standard practice.\n\nWhy now: in manual mode every level-file edit asks. A skill that only touches levels/ can be trusted with that, only while it runs. A secret should never be read, whatever the prompt.\nWhat you see: allowed-tools in SKILL.md; a deny list in settings.json.\nLook inside: .claude/settings.json: allow, ask and deny. Which one wins?\n\nNo .env in the folder? The deny still holds; Claude says it isn't allowed, or that the file doesn't exist and it wouldn't read it anyway."
},

{ // Slide 103
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 22: Skill 3, /create-obstacles, and a hook that guards main",
  kicker: "DAY 2 · ASSIGNMENT 22 · BUILD",
  subtitle: "The third recipe. And a hook so nobody, not even Claude, edits files on main.",
  calm: true,
  steps: [
    { text: "Make the skill", prompt: "Make a skill in .claude/skills/create-obstacles/ for the obstacles in level N: a few more than the level before, within the limits in spec.md, never on the snake's start and never blocking the whole board. Show me SKILL.md before you save it." },
    { text: "Add the hook", prompt: "Add a hook to .claude/settings.json: before Claude edits or writes a file, check the git branch. On main, block it with the message: Make a branch first. Show me the hook before you save it.", after: "Not working straight away? /exit, then claude --continue." },
    { text: "Try it: switch to main and ask for a change", prompt: "!git checkout main", after: "Then ask Claude to change something small. Blocked: Make a branch first." },
    { text: "Back to your branch and save", prompt: "!git checkout level-3", after: "Then: Commit the skill and settings.json on level-3 and push." }
  ],
  expected: "A /create-obstacles skill, and a hook that blocks edits on main.",
  keyPoints: ["Third skill: same shape", "Hook = always, at a fixed moment", "Protect main, like at work", "Test it on main"],
  notes: "Yesterday's hook ran the test after every edit. This one runs before every edit and can say no: a PreToolUse hook on Edit and Write that checks git branch and blocks on main. At work main is protected in GitLab; this does the same on your laptop, for Claude.\n\nWhy now: from here on every level is built on a branch. A rule like that shouldn't depend on Claude remembering it.\nWhat you see: a hooks block in settings.json and a small check script. On main, the edit is blocked with your message.\nLook inside: settings.json: when does the hook run (the event), and on which tools (the matcher)?\n\nWatch for: the hook only blocks Claude's file edits, not git itself, so checkout, pull and merge on main still work. Step 3 works because the new hook isn't committed yet: uncommitted changes come along to main.\n\nDry run (28 Oct): on main the edit was blocked with 'Make a branch first.', and Claude made a branch by itself and did the edit there. Undo that branch afterwards (!git checkout level-3). The deny rule in Assignment 21 held too: Claude refused .env and didn't try cat instead."
},

{ // Slide 104
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 23: Level 3 with your three skills",
  kicker: "DAY 2 · ASSIGNMENT 23 · BUILD",
  subtitle: "Same result as level 2. This time the recipes do the explaining.",
  calm: true,
  steps: [
    { text: "Start clean, then ask for level 3 with your skills", cmds: ["/clear"], prompt: "Make level 3 with my create-food, create-snake and create-obstacles skills: a bit harder than level 2.", after: "Watch for Skill(create-food), Skill(create-snake), Skill(create-obstacles)." },
    { text: "Play it: reload the tab", after: "Harder than level 2? Still fair?" },
    { text: "Merge request", prompt: "Push level-3 and open a merge request into main: what changed, why, how it was tested. Don't merge it.", after: "Review it on GitLab and merge it yourself." },
    { text: "Back on main", prompt: "!git checkout main && git pull" }
  ],
  expected: "Level 3 was made with your three skills, and it's in main.",
  keyPoints: ["/clear first", "Name the skills: Claude calls them", "Extra: try it without naming them", "Review and merge"],
  notes: "Why now: three recipes are ready. This is the moment they pay off.\nWhat you see: Claude names each skill as it uses it. The level appears without you explaining food, snake or obstacles.\nLook inside: did Claude use all three skills? Which values did each one choose?\n\nDry run (28 Oct, Claude Code 2.1.312): with 'Make level 3: a bit harder than level 2.' Claude read the three SKILL.md files with cat and followed them, without a Skill() call. Naming the skills in the prompt gave three real Skill() calls. Extra for the fast ones: /clear and ask without naming them, then compare.\n\nThe hook from Assignment 22 is on: everything happens on level-3, so nothing is blocked. If someone is still on main, the hook will tell them."
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
    { title: "Only when needed", body: "a SKILL.md recipe\nfiles inside a skill\nlevels/CLAUDE.md: only when Claude works in levels/" },
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

{ // Slide 107
  title: "The map of your project",
  kicker: "DAY 2 · PART 3 · ARCHITECTURE",
  subtitle: "Every file has its place. By tonight your folder looks like this.",
  type: "concept",
  visual: { code: 0 },
  cards: [
    { title: "aether-snake/", body: "CLAUDE.md              every session: keep it short\nintent.md  spec.md  PROGRESS.md\nlevels/\n  CLAUDE.md            only when working in levels/\n  level-1.js … level-5.js\ntests/levels.test.js   every level, every limit\n.claude/\n  settings.json        permissions + hooks\n  skills/              top always, recipe when used\n    create-food/  create-snake/  create-obstacles/\n    build-game-levels/ the workflow\n  agents/\n    bobby.md           the level-checker" },
    { title: "Yours, not shared", body: "Not in git:\nCLAUDE.local.md\n.claude/settings.local.json\n\nYou, in every project:\n~/.claude/CLAUDE.md\n~/.claude/settings.json\n~/.claude/skills/\n~/.claude/agents/" }
  ],
  tagline: "Project files are shared through git. Your home folder is only yours.",
  keyPoints: [
    "Project .claude/: shared with the team",
    "Local files: only you, not in git",
    "~/.claude/: you, in every project",
    "Nested CLAUDE.md per folder",
    "Skills and agents are folders and files"
  ],
  notes: "Come back to this map whenever someone asks 'where does this go?'. The rule: anything in the project's .claude/ folder and the project CLAUDE.md is shared with the team through git. The .local files are only for you and stay out of git. ~/.claude/ is the same structure for you personally, in every project. Point at the files that don't exist yet (levels.test.js, bobby.md, build-game-levels): they're coming this afternoon."
},

{ // Slide 108
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 24: A shorter CLAUDE.md",
  kicker: "DAY 2 · ASSIGNMENT 24 · MAINTAIN",
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
  title: "Assignment 25: A test for every level",
  kicker: "DAY 2 · ASSIGNMENT 25 · TEST",
  subtitle: "Every level harder than the one before, and none of them unplayable.",
  calm: true,
  steps: [
    { text: "Write the test on a new branch", prompt: "Create a branch level-test. Write tests/levels.test.js. For every level file that exists: it follows spec.md, every value stays between its minimum and maximum, each level is harder than the one before and never easier, the snake never starts in an obstacle and food never lands on one. Show me the tests before you save them.", after: "Tests change: yesterday's ask rule asks you. Say yes." },
    { text: "All green?", prompt: "!npm test" },
    { text: "Break it on purpose", prompt: "On purpose, to see the test catch it: make level 3 faster than spec.md allows.", after: "The hook runs the test: red, with the file and the allowed range. Then Esc Esc to undo." },
    { text: "Save it", prompt: "Commit, push and open a merge request. Don't merge it.", after: "Merge it yourself, then !git checkout main && git pull" }
  ],
  expected: "A green level test that turns red when a level is too fast.",
  keyPoints: ["Test phase", "Harder, never easier", "Limits keep it playable", "Break it on purpose: red", "Esc Esc to undo"],
  notes: "Why now: three levels exist, two more are coming by command. You need a check that doesn't depend on someone playing every level.\nWhat you see: tests/levels.test.js, green for levels 1 to 3. A too-fast level 3 turns it red.\nLook inside: open the test. Which line checks 'harder than the one before'?\n\nThe break-on-purpose step is the point: a test is only worth something if you've seen it fail. Dry run (28 Oct): 'Make level 3 as fast as possible' did not break anything: Claude (with the create-snake skill, which it picked by itself after a 'Use skill?' question) offered the fastest values spec.md allows. Asking for faster than spec.md allows gave 2 red tests naming the file, the value and the range. The level test Claude wrote: 19 checks, 40 of 40 green, trial-run on copies with planted mistakes first. In the next assignment this test becomes Bobby's main tool."
},

{ // Slide 110
  title: "Subagents: a helper with its own head",
  kicker: "DAY 2 · PART 4 · AGENTS",
  subtitle: "Delegate the checking, never the approval.",
  type: "concept",
  visual: { stagger: "pop", stepThrough: true, highlight: [{ in: "tagline", text: "approves nothing", tone: "orange" }] },
  cards: [
    { title: "What", body: "A separate Claude for one job, with its own context window and its own agent loop: it reads, runs and thinks by itself." },
    { title: "Skill or subagent?", body: "A skill runs inside your conversation, in your context. A subagent works apart and only sends back a short report." },
    { title: "Where", body: ".claude/agents/bobby.md: frontmatter with name, description, tools and model, then its instructions. Loads after a restart." }
  ],
  tagline: "A subagent reports. It approves nothing.",
  keyPoints: ["Own context window", "Own agent loop", "Skill = in your conversation", "Subagent = apart, returns a report", "Same frontmatter idea as a skill", "Restart before first use"],
  notes: "A subagent is a separate Claude with its own context window, its own instructions, limited tools and optionally a cheaper model. Claude hands it one job; it runs its own loop (read, run, think, repeat) and returns a short report, so your main session stays clean. That's the difference with a skill: a skill is a recipe your own Claude follows inside your conversation; a subagent is another worker.\n\nThe file looks like a skill: frontmatter between --- lines (name, description, tools, model), then the instructions in plain words. You make one by asking Claude, or by writing the file yourself. A new agent loads when Claude Code starts, so restart (claude --continue) before using it; skills load straight away. Bobby will check your levels, but the decision to merge stays yours."
},

{ // Slide 111
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 26: Bobby, your level-checker",
  kicker: "DAY 2 · ASSIGNMENT 26 · TEST",
  subtitle: "A second opinion on every level, in its own context.",
  calm: true,
  steps: [
    { text: "Ask Claude to make Bobby", prompt: "Create a branch bobby. Create a subagent called bobby in .claude/agents/bobby.md, the level-checker. Job: run tests/levels.test.js, read the level files and spec.md, and check that every level is harder than the one before and still playable. Tools: read files and npm test, no edits. Model: Haiku. Bobby ends with GO or NO-GO and the reasons, and approves nothing. Show me the file first.", after: "Say yes to the file." },
    "Open .claude/agents/bobby.md in VS Code. Same --- frontmatter as a skill: which tools may Bobby use?",
    { text: "Restart so Bobby loads: /exit, then", prompt: "claude --continue", after: "Back in auto mode? Shift+Tab to “manual mode on”.", warn: true },
    { text: "Ask Bobby", prompt: "Ask bobby to check the levels that exist.", after: "Probably NO-GO: levels 4 and 5 don't exist yet. Read the reasons." },
    { text: "Save it", prompt: "Commit, push and open a merge request. Don't merge it.", after: "Merge it yourself, then !git checkout main && git pull" }
  ],
  expected: "Bobby checks your levels and answers GO or NO-GO, without changing anything.",
  keyPoints: ["Made by asking Claude", "Same frontmatter as a skill", "Read-only + npm test", "Restart to load", "GO / NO-GO, you decide"],
  notes: "Why now: you have a test and three levels. Checking them all is reading work that fills your session; let a helper do it.\nWhat you see: .claude/agents/bobby.md, and a report ending in GO or NO-GO.\nLook inside: /context after Bobby's check: did Bobby's reading land in your context, or only the report?\n\nDry run (28 Oct, 2.1.312): Bobby ran as a background agent (about 30 s) and said NO-GO because spec.md wants five levels and only three exist; levels 1 to 3 each passed. He also spotted that the level test doesn't require all five levels: Bobby reads more than the test does. Claude itself mentioned /agents as a way to load him without a restart.\n\nWatch for: 'Agent type bobby not found' means no restart yet. Bobby gets Bash to run npm test, so 'no edits' is partly an instruction, not a hard wall: say it out loud. Haiku is enough for checking against a spec, and cheaper."
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
    { title: "🧰 Skill", body: "Loaded: the top always, the recipe when used\nStarted by: Claude, or you with /name\nOwn context: no" },
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
  title: "A workflow: /build-game-levels",
  kicker: "DAY 2 · PART 5 · WORKFLOW",
  subtitle: "Your skills, your test and Bobby, in one command.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true },
  items: [
    { label: "Look", caption: "Which levels exist already? /build-game-levels 5 makes the rest." },
    { label: "Build", caption: "On a new branch: /create-food, /create-snake, /create-obstacles for each missing level." },
    { label: "Check", caption: "npm test, then Bobby: GO or NO-GO." },
    { label: "GO", caption: "Commit, push, and a merge request on GitLab." },
    { label: "NO-GO", caption: "Stop, show why. Nothing is pushed." }
  ],
  tagline: "/build-game-levels only runs when you type it: it pushes, so Claude must never start it by itself.",
  keyPoints: ["A workflow = a skill that calls skills and agents", "The number after it: $ARGUMENTS", "Bobby is the gate", "NO-GO: nothing pushed", "Only you start it"],
  notes: "A workflow is a skill too, but its recipe calls the other skills and an agent, in a fixed order, with a gate. The number you type after the command reaches the recipe as $ARGUMENTS (argument-hint in the frontmatter shows it in the menu). Because it pushes and opens a merge request, it gets disable-model-invocation: true: Claude may never start it by itself.\n\nBobby is the gate: GO means commit, push and merge request through GitLab MCP (yesterday's connection). NO-GO means stop and explain; nothing leaves your laptop. The human gate stays at the end: you review and merge."
},

{ // Slide 114
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 27: Levels 4 and 5 with one command",
  kicker: "DAY 2 · ASSIGNMENT 27 · BUILD",
  subtitle: "Build the workflow once. Then let it build the levels.",
  calm: true,
  steps: [
    { text: "Make the workflow", prompt: "Create a branch workflow. Make a workflow skill in .claude/skills/build-game-levels/: /build-game-levels N looks which levels exist, makes a new branch, and makes the missing levels up to N with the create-food, create-snake and create-obstacles skills, each a little harder than the one before. Then it runs npm test and asks bobby to check. Only on GO: commit, push and open a merge request on GitLab. On NO-GO: stop and show me why. It only runs when I type it, never by itself. Show me SKILL.md before you save it.", after: "Find disable-model-invocation and $ARGUMENTS." },
    { text: "Save the workflow first: it wants a clean start", prompt: "Commit, push and open a merge request.", after: "Merge it, then !git checkout main && git pull" },
    { text: "Run it", prompt: "/build-game-levels 5", after: "Watch: branch, three skills per level, npm test, Bobby, then the push question." },
    "Bobby said GO? Review the merge request on GitLab, play levels 4 and 5, then merge"
  ],
  expected: "Levels 4 and 5 built by one command, checked by Bobby, merged by you.",
  keyPoints: ["Stacked: skills, test, Bobby, MR", "Only by /build-game-levels", "The push still asks", "You still merge"],
  notes: "Why now: every level is the same steps. Typing them every time is where mistakes creep in.\nWhat you see: one command; Claude names each skill and Bobby as it goes; a merge request link at the end.\nLook inside: SKILL.md of build-game-levels. Which skills and which agent does it call, in what order?\n\nDry run (28 Oct, 2.1.312, manual mode): /build-game-levels 5 found levels 1 to 3, showed a plan (values per level, obstacles as a pinwheel), made branch levels-4-to-5, wrote both level files and the script tags, ran npm test (52 of 52) and a reachability check, ran Bobby in the background (GO, with what he could not check), then asked before the commit and before the push. About 3 minutes plus the yes-clicks. With a GitLab origin it opens the merge request through git push options or MCP. It read the three skills as files instead of calling them: same result.\n\nWatch for: if the workflow's own SKILL.md is uncommitted, its clean-start check stops it at step 1: that's why step 2 exists. Skills load without a restart. Expect a few minutes per level."
},

{ // Slide 115
  type: "practice",
  layout: "exercise",
  mode: "manual",
  title: "Assignment 28: Make Bobby say no",
  kicker: "DAY 2 · ASSIGNMENT 28 · TEST",
  subtitle: "A gate is only worth something if you've seen it close.",
  calm: true,
  steps: [
    { text: "Ask for a level that breaks the rules", prompt: "/build-game-levels 5, but on purpose, to test the gate: first throw away level 5, then make the new level 5 faster than spec.md allows. Run bobby as well.", after: "npm test turns red, Bobby says NO-GO. No commit, no push." },
    "Check: was anything pushed? Look on GitLab: no new branch, no merge request",
    { text: "Clean up", prompt: "Restore the original level 5, go back to main and delete the branch you made.", after: "Your five levels are back." }
  ],
  expected: "Bobby said NO-GO, and nothing reached GitLab.",
  keyPoints: ["Break the rule on purpose", "Test red, Bobby NO-GO", "Nothing pushed", "Like Day 1's rescue"],
  notes: "Same idea as yesterday's rescue: make it go wrong on purpose, in a safe place. The limits in spec.md, the level test and Bobby together stop the bad level before it leaves the laptop.\n\nWhy now: you've seen the workflow say GO. Trust comes from seeing it say NO.\nWhat you see: a red test, a NO-GO with the reason, and no push.\nLook inside: which line in spec.md did the new level 5 break?\n\nDry run (28 Oct, 2.1.312): /build-game-levels 6 doesn't work for this: the workflow and spec.md only allow levels up to 5, so it stops before Bobby. Throwing away level 5 and rebuilding it too fast did reach all gates: the hook flagged the write, npm test failed 1 of 52 ('startDelay is 30, must be 40 to 150'), Bobby said NO-GO, nothing was committed or pushed. Bonus moment: Bobby miscounted the obstacles (30 instead of 26) and the main Claude corrected him. Bobby can be wrong: that's why he approves nothing."
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
    { title: "Compare with yesterday", body: "How many prompts did you need?\nWhat did you not have to explain?\nWhat would you add to the skill?" }
  ],
  stepsHeading: "Do this:",
  steps: ["In your game repo: a new folder for Pac-Man.", "Ask Claude to build Pac-Man with your build-arcade-game skill.", "Read the plan: does it follow your layers?", "Play after every layer. Your hook and rules still run.", "Something you had to explain again? Add it to the skill."],
  expected: "A Pac-Man you can play, built with your own skill, and a skill that got better.",
  prompt: "Use my build-arcade-game skill to build Pac-Man in the folder pacman/. Start with layer 1 and show me the plan first.",
  keyPoints: ["Same method, fewer words","Plan follows the layers?","Hooks and rules still active","Improve the skill as you go"],
  notes: "Same method, next game. The skill does the explaining, so the prompt is one line. Point out that the plan follows their own layers, and that the rules and hook from yesterday still run. The real learning is the last step: whatever they had to explain again goes into the skill. Ask afterwards: how many prompts did you need compared to Snake?"
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
  notes: "The agreement is already made: one contract (arcade.js) and one skill (arcade-score) that every game uses. The manager creates the arcade repo on GitLab, copies the starter in and pushes; the trainer has the starter (https://github.com/jyse/aetherlink-classroom-slides/tree/main/arcade-starter). Everyone clones it and reads the skill: the Example prompt lets Claude summarise it in five lines. On the arcade laptop: npm test (it tests the contract), then node serve.js and open localhost:8080. Play the example game once so there is a first score. No install is needed: serve.js uses Node only."
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
  notes: "Introduce the chatbot before anyone designs or builds it: the Aether Library gets a chatbot called AetherBOT that answers questions about AI terms. Its answers come only from the glossary and concept cards the participant has built so far, so it grows with their Library. Make the third point explicit: it is plain code in the app, no AI model inside, no API keys, nothing leaves the laptop (the same rule as the rest of the app); Claude Code builds it, the bot itself doesn't call an AI. That's also the trap to name: CLAUDE.md, the permissions and the goal are rules for Claude Code while it builds the bot, not settings inside the bot. The bot only behaves well if Claude Code turns those rules into code. The fourth card is the whole of yesterday in one build: the guide and enforce columns from the last slide, plus a goal. Then the plan for the next hour: Assignment 6 designs it (CLAUDE.md plus one permission rule), a fresh session tests that design, Assignment 7 builds it towards a goal, and partners try to break each other's bot."
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
  notes: "This is where the room applies the Sources of context slide and the How the pieces fit map to something of their own: they decide what goes in, Claude writes it, they check it and own it. Step 1 is the real exercise: rough notes in their own words (in the prompt or on paper) on what AetherBOT is for, its data (the glossary and concept cards, nothing else), its tone of voice (friendly teacher, short and to the point, playful…) and 3 rules. Good rules to steer towards: answer only from the glossary and cards, say OPEN when unsure, name the source card, refuse off-topic questions, never repeat personal profile details. Step 2 sorts three ways: what is always true for this project (purpose, data, tone, rules, how to test a change to the bot) goes into CLAUDE.md; what must hold even if Claude forgets goes into settings.json (Claude must ask before it edits anything in data/); the task itself (build it now, where it appears) stays in the prompt for Assignment 7. Step 3 in plan mode, so they see the change before it's written. Step 4 matters most: Claude tends to add rules nobody decided and to make the file long, and a long CLAUDE.md is weaker. Anything they didn't decide gets deleted, and they edit one line by hand, so they know it's just a text file they own. Step 5 is yesterday's 4b again, one level up: they add an ask rule, Edit(data/**), next to their existing allow and deny rules in .claude/settings.json (an ask rule shows up as an approval prompt every time Claude wants to edit a file in data/; their deny rule on data/fixtures/ still wins, because deny beats ask). /permissions should list it; if not, restart Claude in the project folder. Why ask and not deny: Assignments 9 and 10 write concept cards into data/ on purpose, and the ask rule turns that into a human approval point instead of blocking it. CLAUDE.md says why the bot never changes data; the ask rule makes sure Claude can't do it silently. Show the difference: good, “AetherBOT answers only from data/glossary.json and data/concept-cards.json. If the answer isn't there, it says OPEN.”; too vague, “AetherBOT should be helpful and accurate.” (can't be checked); doesn't belong, “Today: build the chat window and add a quiz command.” (a task, so it goes in the prompt). Tip for later: in a new project, /init writes a first CLAUDE.md from the repo; same rule, read it, delete what isn't true, add what only you know. Nothing is built yet: that's the next assignment.",
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
  keyPoints: ["Everything from yesterday in one build", "Don't paste the rules: Claude reads CLAUDE.md", "Plan first, then /goal", "Hook runs, ask rule holds, goal clears", "Goal met ≠ approved: break it yourself"],
  notes: "The payoff of Assignment 6, and all of yesterday in one build: CLAUDE.md guides, the ask rule and the validate hook enforce, and a goal says when it's done. Participants ask Claude Code to plan AetherBOT and do NOT repeat the rules in their prompt; Claude reads them from CLAUDE.md. If someone pastes the rules in anyway, ask them to delete that and try again. A good plan says where the chat appears in the app and how it finds answers (matching the question to glossary terms and concept cards), and keeps it plain code with no AI model or API. Then the goal: the Example prompt is a checkable one, built from their own rules; strong participants write their own (yesterday's 4e). Every part of it can be checked: a page, an answer, an OPEN, a refusal, untouched data, a passing command. While it runs, point at the validate output after each edit (their 4c hook). If Claude tries to write to data/, the ask rule stops it and they answer no: the bot reads data, it never writes it. The goal clearing is not approval: the last step is them trying to break it by hand, and the partner round after this does it again. Commands are things like “quiz me” or “compare X and Y”; call them commands, not skills, because Claude Code skills come after the break. When a rule fails, the question is: is the code wrong, or is the rule unclear in CLAUDE.md? Watch for a command with no test, and for rules that only exist in CLAUDE.md but never made it into the code."
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
  subtitle: "Make a second concept card with a normal prompt, the same way as yesterday.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Deliver", body: "a second concept card\na list of what you had to repeat" }
  ],
  steps: [
    "Pick a second term.",
    "Use yesterday's requirements.",
    "Show the draft first.",
    "Note what you had to repeat."
  ],
  expected: "A second concept card created through another one-off prompt — plus a clear sense of what had to be repeated.",
  stepsHeading: "Steps:",
  keyPoints: ["Keep it an ad-hoc prompt, not skill","Add term to glossary first","Same requirements and validation as yesterday","Check it renders on Library page","No jumping ahead to Assignment 9"],
  notes: "Important: this must stay a normal, ad-hoc prompt, not a skill. Add the term to the glossary first if it isn't there yet, use the same requirements and validation as yesterday's approved card, and check it renders on the Library page. The inconsistency this creates between people's results, and the list of instructions they had to repeat from scratch, is exactly what motivates building a skill next. Don't let anyone jump ahead to Assignment 9 yet.",
},

{ // Slide 157
  hidden: true,
  title: "Parked · Compare the two runs",
  kicker: "DAY 2 · ASSIGNMENT 8 · REVIEW",
  subtitle: "Which parts should become a shared method?",
  type: "review",
  visual: { lineReveal: 0, diff: [
    { title: 'Run 1 · yesterday', rows: [{ k: 'Explanation' }, { k: 'Example' }, { k: 'Misunderstanding' }, { k: 'Key points' }, { k: 'Related' }, { k: 'Sources', note: '3' }] },
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
  notes: "Connect this to “Done when” from yesterday: a goal is exactly that, as a command. Claude keeps going on its own until it's met, inside the same permissions and hooks. After each turn a small, fast model decides whether the condition holds; when it does, the goal clears itself. The lesson is the bad example: “make level 5 fun” can never be checked. A met goal is still not your approval: they play the level afterwards. Before class, check that /goal exists in the version on the participants' laptops."
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
  notes: "Say: Say the nesting out loud, from the outside in. The outer box is the working method, the six phases. The middle box is you: the decisions you made in every phase yesterday (set the goal, approve the plan, each change, check the evidence, approve the push, hand it over). The inner box is Claude's agent loop.\n\nWhat you see: Click: the boxes zoom in one at a time, then Build and Test light up together with 'approve each change' and 'check the evidence': that's where Claude's loop runs.\n\nBackground: Nothing here is new: it's the working-method slide from Day 1, seen from three sides."
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
