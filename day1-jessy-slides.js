/* ==========================================================================
   Aetherlink x Worldline — Day 1 classroom deck (Jessy): copy of Day 1 from slides.js (slides 1-82), 2026-11-18
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
    "Next session: the same loop, as a team"
  ],
  notes: "Say: This is how every assignment today works: six phases, from 'what do we want?' to 'hand it over'. Software teams call it the software development life cycle. Claude does most of the work in each phase, but you decide: the goal, every approval, the final word. That is what being the human in the loop means.\n\nWhat you see: Click: one phase per row. Read each row across: what Claude does, what you decide (the orange column), and the file it leaves behind, so the next person, or the next session, can carry on.\n\nLink back: The agent loop from two slides ago (observe, decide, act, check) is what Claude does inside each phase. This slide puts you around it.\n\nBackground: Every assignment's kicker names its phase (PLAN, DESIGN, BUILD, TEST, DEPLOY, MAINTAIN), so people always know where they are. Day 5 (AI-native SDLC) uses exactly this loop and these file names, so the team project on Days 6 and 7 starts from something familiar. In the next session the same loop runs as a team.\n\nNext: Ground rules: what you share."
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
  notes: "Type / live and scroll through the menu. /help shows everything Claude Code can do. /model lets you choose Haiku, Sonnet or Opus: remember the model-choice slide. /permissions shows what Claude may do without asking: the gate from a few slides ago. /statusline sets what you see at the bottom of the screen; show a good example. /memory opens your CLAUDE.md, which is coming up. And the skills you install or make show up in this menu too: that's next session."
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
  notes: "Say: Claude Code doesn't remember you, and the model never learns from you. What carries over from one session to the next is what's written down. These are the files it reads at the start, every time.\n\nWhat you see: The same folder tree as the map, with only the memory files lit up. Click: first ~/.claude/: CLAUDE.md is about you, in every project, only on your laptop; projects/…/memory/ holds the notes Claude writes itself when you say 'remember this' (auto memory). Then the project: CLAUDE.md is about this project and goes into git, so the team shares it; CLAUDE.local.md is your own notes for this project, not in git. Then the bot: all four land in every new session. The dimmed files are not memory: settings.json is the next slide, intent.md is only pulled in when CLAUDE.md says @intent.md.\n\nLink back: This is the left side of the map from a few slides ago. Two folders side by side in your home folder; the project is never inside ~/.claude/.\n\nWatch for: 'Isn't the project CLAUDE.md the master one?' No: ~/.claude/CLAUDE.md is about you, the project CLAUDE.md is about the project. Both are loaded; when they disagree, the project one usually wins because it's more specific. And ~/.claude/projects/ only holds Claude's notes and chat history per project, not your code.\n\nBackground: A line like @intent.md in CLAUDE.md pulls another file in at the start. /memory shows and opens all of them. Everything is loaded in every session, which is why it should stay short: next session we'll move detail out of it.\n\nNext: Assignment 3, a CLAUDE.md for your game.",
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
  notes: "Say: After /clear the conversation is gone. Claude can read your files again, but it doesn't know your instructions. CLAUDE.md is the file it loads at the start of every session.\n\nAsk the room: Steps 1 and 3 are the same question on purpose. Let a few people read Claude's answer out loud, before and after.\n\nWatch for: A personal CLAUDE.md rule like 'use Tailwind' clashes with 'no frameworks'. Ask which rule wins, and why.\n\nWatch for: /memory takes no question after it: people type '/memory which files are loaded?'. It opens a list of memory files; Esc closes it with 'Cancelled memory editing', which is fine.\n\nWhat you see: Before: Claude guesses the rules from your files. After: it names exactly your rules, every session. /memory shows the project CLAUDE.md, the @-imported intent.md, your personal file and auto-memory.\n\nBackground: Ask about the rules, not 'what is this project': in the dry run Claude simply read intent.md and knew what the project was, even without CLAUDE.md. What it can't know without CLAUDE.md is your rules (no frameworks, npm test, plan first, nickname only). That is the difference between context (the conversation, gone after /clear), files Claude can search, and memory (CLAUDE.md, loaded every session without searching). @intent.md pulls that file in at the start of every session; next session we'll measure what that costs. 'Tests run with npm test' is in the prompt on purpose: otherwise Claude may build browser-only tests, and the hook this afternoon needs a command.\n\nExtra: A personal ~/.claude/CLAUDE.md with your role and one preference. It stays on your laptop.\n\nNext: Decide first what Claude may do."
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
  notes: "Say: Claude is about to touch your files and run git. Decide now what it may do, not after something goes wrong.\n\nWatch for: After the restart Claude Code starts in your default mode, and on some laptops that's auto. Everyone checks the bottom line.\nWatch for: Test with the exact command. In the dry run 'force push my work' did nothing visible: with no commits and no remote, Claude didn't even try. 'Run exactly this command: git push --force origin main' gets 'blocked by your permission settings' every time.\n\nWhat you see: Claude asks before it writes .claude/settings.json (always, even in accept-edits mode). Then the force push is blocked.\n\nA good result: { \"permissions\": { \"ask\": [\"Bash(git commit*)\", \"Bash(git push*)\"], \"deny\": [\"Bash(git push --force*)\", \"Bash(git push -f*)\", \"Bash(rm -rf *)\", \"Bash(glab mr merge*)\", \"Bash(gh pr merge*)\"] } }. Claude usually writes stricter rules (more variants) and explains honestly that text patterns can be worked around: worth a word.\n\nBackground: A rule matches how a command starts. 'git push --force origin main' is blocked, but 'git push origin main --force' puts the flag at the end, so it slips past the deny rule and only hits the ask rule: Claude still asks, but it isn't blocked. Someone will try it; that's the honest limit of text rules. Hooks (Assignment 11) can check the whole command.\n\nBackground: The merge deny keeps the human gate next session: Claude Code later suggests 'merge the pull request' as a next prompt, and without this rule Claude would merge its own work.\n\nLook inside: Open .claude/settings.json. Which line blocked the force push?\n\nNext: Quiz: the working method."
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
  notes: "Say: One prompt can build Snake: the dry run did it in under a minute. But then you can't steer it, you can't tell what broke, and you learn nothing about what's in the files. So we build it in five layers. After every layer you play it, check it and save it.\n\nWhat you see: Click: one board at a time. 1 Skeleton: a grid and a snake that moves by itself. 2 Controls: the arrow keys steer it. 3 Food and score: it eats, grows and counts. 4 Game over: a wall or your own tail ends the game, Space starts again. 5 Your style: your nickname and avatar on screen (Assignment 14). No best score: next session the arcade leaderboard does that.\n\nTip: After every layer: reload the browser tab (F5 or Cmd+R) and play it. The first time, Claude opens index.html for you.\n\nLink back: Every layer is one small turn of the working-method loop: plan it, build it, check it, commit it.\n\nBackground: Layers 1 to 4 get built in Assignments 6 and 8. Layer 5 comes later this afternoon, when everyone has made an avatar in LibreChat. Real software gets built the same way: small slices that each work on their own.\n\nNext: Assignment 5: Claude plans these five layers with you."
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
  notes: "Say: You typed git init at the very start, and your permissions already mention commit and push. But nothing has been saved yet: the folder only had intent.md and CLAUDE.md. Next you build layer 1, the first real code. When it works, you save it: that's your first commit. Then you push it to GitLab.\n\nWhat you see: Click: three words. Repository: your folder, with a memory that's still empty. Commit: a save point, the first one when layer 1 works. Push: a copy on GitLab.\n\nBackground: For everyone who doesn't use git every day; developers can nod along. Today is only the rhythm: a layer works, commit, push. Claude runs the git commands and asks first (the house rule). Branches, merge requests and the rest come next session, when there's a reason for them.\n\nNext: Assignment 6: build layer 1, look inside, commit."
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
  notes: "Tip: The ! in !git status runs the command yourself, without Claude.\n\nSay: It works. Make a save point before you change anything else. A small step, understood, saved.\n\nWatch for: The file name is whatever Claude chose (game.js in the dry run, sometimes snake.js). Type @ and a list of files appears: pick the right one.\nWatch for: If Claude proposes a branch, say 'commit straight to main'. Branches come next session.\n\nWhat you see: index.html, style.css and the game's .js file appear. The commit asks first, and the screen names the rule: 'Permission rule Bash(git commit *) requires confirmation'. The first commit includes CLAUDE.md, intent.md and .claude/settings.json: that's fine, they belong to the project.\n\nThree new controls: @file points Claude straight at a file, so it doesn't have to search (cheaper and faster). !git status runs a command yourself, and the output lands in the conversation; Claude even comments on it. A commit is a save point.\n\nLook inside: This is the real lesson. Which part draws the snake? If nobody can say, slow down.\n\nNext: Model Context Protocol."
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
  notes: "Say: Laptop gone, game gone. On GitLab it's safe, and next session the arcade needs it. git is on your laptop; GitLab is the online copy; the GitLab MCP is what lets Claude itself create the project.\n\nBefore class: Check that every participant has GitLab access. Most managers do, not all.\n\nWhat you see: /mcp shows GitLab connected. Claude creates the project, then asks before it pushes, because of the ask permission ('Permission rule Bash(git push *) requires confirmation').\n\nBackground: In the dry run Claude also pointed out that the commits carry the author's email from git config. On Worldline's own GitLab that's normal, but it's a nice privacy moment.\n\nIf stuck: No GitLab access: keep working locally all afternoon. git pull in the next session will then say there's no remote: ignore it.\n\nNext: Undo: checkpoints and commits. From now on the rhythm is: it works, commit, push."
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
  notes: "Say: Claude says it works. A test shows it, every time. Here's the classic Snake bug. You're moving right and press left: in a good game nothing happens, the key is ignored. Now press up and then left very fast, both before the snake moves. A careless game accepts up, then accepts left (that's not the opposite of up), but the snake never went up: it turns back into itself. Game over, from two quick keys.\n\nWhat you see: The subtitle gives the rule. The three boards show the tricky case in slow motion. 1: the up key; the game notes 'go up next', but the snake only moves every 0.12 seconds, so it hasn't moved yet. 2: quickly the left key; a careless game compares left with up (the key just pressed), and left isn't straight back from up, so it says OK. 3: the snake moves left, but it was still moving right: straight back into its neck. Green bar: a good game compares with where the snake really moves. Orange box: what the test does, and why.\n\nWatch for: keep keys and directions apart when you talk. 'The left key' is what you press; 'left' is where the snake goes.\n\nSay: Your game probably gets this right already, so your test will likely be green first. That's fine: in the assignment you break it on purpose and see it turn red.\n\nAsk the room: Would you find the bug by playing? Almost never: you'd need two keys within 120 milliseconds.\n\nBackground: That's why it's a good test: it hides until someone presses fast, and it comes back when you change the speed or the controls. A test like 'the snake grows' is less useful: you'd see that break straight away. Next session the tests grow with the levels: food never on a wall.\n\nNext: Assignment 9: your own test. Does your game have the bug?"
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
  notes: "Say: Asked to 'make the tests pass', Claude could change the test instead of the game. And it keeps asking to run npm test. Two permissions fix both.\n\nWatch for: In step 4 the answer is No. And everyone goes back to manual mode at the end.\n\nWhat you see: 'Run the tests': no question. In accept-edits mode every other file goes through, but a test file still asks.\n\nBackground: allow for npm test: approving a safe command over and over only teaches people to click yes without reading. ask for tests/, not deny: next session they'll add new tests, so the rule is 'a test only changes with my yes'. Why accept-edits mode: in manual mode every edit asks anyway, so you can't see the rule working. In the dry run the allow rule worked straight away, without a restart. Claude also noted that npm test runs tests/run.js, so protecting tests/ protects what runs without asking. Edit(tests/**) covers new files too; a Write(tests/**) rule does nothing. Deny beats ask beats allow when several rules match.\n\nLook inside: /permissions: where do your new rules show up?\n\nNext: Hooks: a check that runs by itself."
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
  notes: "Say: You keep forgetting to run the test after a change. A hook runs it by itself, after every edit.\n\nWatch for: On long commands Claude Code shows a tip to switch to auto mode: don't.\nWatch for: In the dry run Claude picked the built-in update-config skill by itself (a preview of the next session's skills) and tested the hook command before saving. Approve those steps: they only run the tests.\n\nWhat you see: A change that breaks a rule: the hook reports the failing tests at once ('The hook caught the conflict straight away'). Claude leaves the tests alone and asks whether to keep or undo the change.\n\nA good result: \"hooks\": { \"PostToolUse\": [ { \"matcher\": \"Edit|Write\", \"hooks\": [ { \"type\": \"command\", \"command\": \"npm test 1>&2 || exit 2\" } ] } ] }. Claude's own version is usually longer (it cds to the project folder and only prints on failure).\n\nBackground: Why not 'make the snake faster' as the break: in the dry run that change kept all tests green, so the hook stayed silent and nothing was learned. Letting the snake turn straight back makes the reverse tests from Assignment 9 fail. The broken change stays until someone undoes it: 'throw that change away' (git checkout of the file). /hooks is read-only: it shows the hook, changes go through settings.json. The game file may be snake.js instead of game.js: Claude finds it either way.\n\nLook inside: /hooks: which event, which matcher?\n\nThe three parts (step 2): the moment is a built-in name from Claude Code (PostToolUse: after Claude used a tool); which tool narrows it down (matcher Edit|Write: only after a file change); the command is yours (npm test). Students never write this by hand: they say it in plain words and Claude picks the moment.\n\nNext: Assignment 12."
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
  subtitle: "Your character for the next session's leaderboard. No real name, no email, no photo.",
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
  notes: "Say: Keep the energy high: this is meant to be fun. This is your character for the next session's leaderboard.\n\nWatch for: The privacy rule for the whole arcade. The avatar only describes how the character looks, and the game only shows a nickname. No real name, email, employee number or photo, because in the next session every game is on a shared website. Don't paste anything from your personal CLAUDE.md.\n\nWhat you see: LibreChat itself doesn't make images: in the library you pick the image generator. The three thumbnails are AetherBOT, made with the three starting prompts.\n\nBackground: The Example prompt button has three starting prompts: cartoon, superhero and Jip and Janneke (a well-known Dutch children's-book style by Fiep Westendorp, black silhouettes; explain it in one sentence for non-Dutch participants).\n\nBefore you move on: Make sure everyone has downloaded the file.\n\nNext: Assignment 14: Put your avatar in your game."
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
    "Next session: name + picture go to the scoreboard"
  ],
  notes: "Say: The hand-off: LibreChat made the picture, Claude Code puts it in the game. Next session the avatar and nickname go to the arcade leaderboard.\n\nWatch for: Approving the plan: option 2 again, not auto mode.\nWatch for: The fallback is the part people forget. Check the game without a picture too.\n\nWhat you see: @assets/… points Claude at the image; Claude can read images, so it can also describe it. The hook from Assignment 11 runs the test after this change too: it should.\n\nNext: Assignment 15: Hand it over."
},

{ // Slide 80
  type: "practice",
  layout: "exercise",
  title: "Assignment 15: Hand it over",
  mode: "manual",
  kicker: "DAY 1 · ASSIGNMENT 15 · MAINTAIN",
  subtitle: "Next session you continue. Maybe someone else does.",
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
    "Next session: claude --continue"
  ],
  notes: "Say: The next session starts empty. Only what's written down carries over. The Maintain phase closes the loop: the next person, or the next session, starts from PROGRESS.md.\n\nWhat you see: PROGRESS.md: what's built, how it was tested, which permissions and hooks are active, and what's still open.\n\nBackground: Day 5 uses the same file.\n\nNext: Day 1 learning note. Next session starts with git pull and claude --continue, which takes you back into today's last conversation."
},

{ // Slide 81
  title: "Day 1 learning note",
  kicker: "DAY 1 · CLOSING",
  subtitle: "Five quiet minutes — in your own words.",
  type: "recap",
  visual: { notebook: 0, quietTimer: 5, highlight: [{ in: 'tagline', text: 'OPEN', tone: 'orange' }] },
  cards: [
    { title: "Record", body: "what you created\nhow you used Claude Code\nwhat you tested\nwhat you learned\nwhat remains unclear\nwhat you want to try next session" }
  ],
  tagline: "Write the note yourself. Preserve uncertainty as OPEN.",
  keyPoints: ["Five genuinely quiet minutes","Raw, honest note, not Claude-polished","Protect the writing habit"],
  notes: "Give people genuinely quiet time to write it, five minutes is enough. The habit of writing a raw, honest note, not one polished by Claude, is worth protecting. Next session starts with showing your game: this note helps them remember what they want to show and ask."
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


];
