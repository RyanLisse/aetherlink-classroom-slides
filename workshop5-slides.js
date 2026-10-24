'use strict';
/* Workshop 5. One AI-SDLC assignment, then optional reference. */
window.SLIDES = [
  {
    "title": "Welcome to Workshop 5 · AI-native SDLC",
    "stateId": "0:AI-native SDLC: more than generating code",
    "kicker": "W5 · OPENING · AI-NATIVE SDLC",
    "subtitle": "Build a useful change with AI. Prove it meets the need before a human releases it.",
    "tagline": "10:00–16:00 · Explain → demonstrate → practise → review",
    "type": "context",
    "visual": {
      "opener": "welcome",
      "bot": "wave",
      "place": "beside",
      "stagger": "pop"
    },
    "cards": [],
    "keyPoints": [
      "Faster code alone is not a successful delivery.",
      "The lifecycle is the lesson. The shop is the practice system."
    ],
    "notes": "Welcome the group at 10:00. Name the learning goal before installation or an incident: AI-native software delivery, not just code generation. Faster code still needs a clear requirement, checked evidence and a human decision. Explain the rhythm: I explain, show one example, then you practise and review your own result. Keep welcome and recap together within five minutes so Claude Code starts early. Do not promise a measured speed improvement.",
    "teachingPhase": "core"
  },
  {
    "title": "Recap: from W4 agents to the AI SDLC",
    "stateId": "w5:recap-w4",
    "kicker": "W5 · RECAP · FROM N8N TO CLAUDE AGENTS SDK",
    "subtitle": "W4 moved the ticket flow into code. W5 adds the full delivery cycle around a change.",
    "type": "context",
    "layout": "cards",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "cards": [
      {
        "title": "Keep from W4",
        "body": "Structured output, tool evidence and a human decision. Specialists have bounded roles."
      },
      {
        "title": "Add in W5",
        "body": "Accepted intent, reviewed plans, tested code, a release decision and observations for the next task."
      }
    ],
    "tagline": "Share one useful lesson or surprise from W4. Which check would catch it next time?",
    "keyPoints": [
      "Carry the method forward, not yesterday's application.",
      "A model response is not proof that software is ready to release."
    ],
    "notes": "Take two or three short answers, not a new round of W4 demonstrations. Use one observed surprise to connect the recap to today's verification work. If nobody has a case, ask what would reveal an unsupported claim in an agent reply. W4 used structured output, specialists, MCP and human control; W5 practises how to specify, change, test and release software around those ideas. W4 attendance is not a prerequisite for the solo route: read the two cards, then continue. Do not copy W4 mutation permissions into the W5 runtime's read-only tools.",
    "teachingPhase": "core"
  },
  {
    "title": "The lifecycle: AI assists, humans decide",
    "stateId": "1:The lifecycle: AI assists, humans decide",
    "kicker": "W5 · THE ROUTE WE WILL PRACTISE",
    "subtitle": "Plan → Design → Build → Test → Release → Observe → Plan again.",
    "type": "concept",
    "cards": [],
    "visual": {
      "diagram": {
        "id": "loop",
        "title": "The AI-native loop",
        "caption": "The agent supports six stages. Humans set goals, direct, and approve."
      }
    },
    "keyPoints": [
      "AI assists each stage, not only coding.",
      "Each stage leaves evidence for a human decision.",
      "Repeat the loop when observations reveal a new requirement."
    ],
    "notes": "Use this one map throughout the day. Plan includes accepted intent; Design includes a reviewed plan; Test supplies evidence; Release includes diff review and a human decision; Observe supplies the next task. Each stage leaves evidence for a human decision. Teach detailed concepts beside the action that uses them, not as another theory block.",
    "teachingPhase": "core"
  },
  {
    "title": "Your assignment and definition of done",
    "stateId": "2:Your assignment and definition of done",
    "kicker": "W5 · OPENING",
    "subtitle": "Improve the SRE agent: restore deployment evidence and check human approval.",
    "type": "context",
    "visual": {
      "bot": "point",
      "place": "left",
      "dayRoute": [
        "Specify",
        "Design",
        "Build + test",
        "Review + release",
        "Observe + iterate"
      ]
    },
    "cards": [
      {
        "title": "11:15 · Specify",
        "body": "Check the missing evidence. Accept an intent with observable checks and boundaries."
      },
      {
        "title": "13:00 · Build and verify",
        "body": "Review a plan. Repair the tool and approval gate. Record tests, trace and diff."
      },
      {
        "title": "14:55 · Review and learn",
        "body": "Review the change. Decide on release. Observe the result and review one next task."
      }
    ],
    "tagline": "10:00 opening and setup · Lunch 12:00–13:00 · Close at 16:00",
    "keyPoints": [
      "Use CARD.md or the hub for the steps.",
      "Explain each concept when its task needs it.",
      "Optional slides are not a second required route."
    ],
    "notes": "Use the three cards as the day agenda and outputs, not a second overview. Breaks are 11:00–11:15 and 14:40–14:55. Ask learners to choose one delivery skill they want to improve today; revisit it at the close. Name the two cuts: list_deploys in src/tools.ts and checkApproval in src/executor.ts. Both are repaired in Core 2. Core 3 starts with review, not more implementation. Required evidence: intent.md, docs/plan.md, a tested diff, docs/verify/sdlc.md, a human release decision and a reviewed next task. A working shop or solved checkpoint is not proof of a completed cycle. Optional depth follows the closing slide, not another required block.",
    "teachingPhase": "core"
  },
  {
    "title": "The practice system: two agents, one shop",
    "stateId": "3:The practice system: two agents, one shop",
    "kicker": "W5 · PRACTICE SYSTEM",
    "subtitle": "We change the SRE agent. The local shop supplies observations, not the learning goal.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/shop-healthy.png",
      "imageAlt": "Healthy demo shop with three products, Buy buttons, browser traffic counters and separate operator fault controls.",
      "imageLink": "localhost:4310 · local demo shop",
      "wideImage": true,
      "bot": "point",
      "place": "under"
    },
    "cards": [
      {
        "title": "Development",
        "body": "Claude Code helps you plan, build, test and review the SRE agent."
      },
      {
        "title": "Runtime",
        "body": "The SRE agent reads shop telemetry and proposes. A human decides and acts."
      }
    ],
    "keyPoints": [
      "Development: Claude Code helps you plan, build, test and review the SRE agent.",
      "Runtime: The SRE agent reads shop telemetry and proposes. A human decides and acts."
    ],
    "notes": "Use the screenshot as orientation, not an instruction to inject a fault. A console rollback is not a software release. The shop is synthetic: no real payments. Browser counters cover this browser, not all server traffic. The real model may produce different wording and actions. The healthy shop capture is from an earlier offline run, not model evidence.",
    "teachingPhase": "core"
  },
  {
    "title": "Working boundaries",
    "stateId": "4:Working boundaries",
    "kicker": "W5 · RULES OF THE ROAD",
    "type": "concept",
    "layout": "cards",
    "visual": {
      "bot": "head",
      "place": "under",
      "tool": "toolbox",
      "stagger": "pop"
    },
    "keyPoints": [
      "Local Claude Code can send requests to a provider.",
      "Do not disable guards or let an agent approve its own work."
    ],
    "notes": "Explain this before the first model request. Local CLI does not mean offline inference. Check company policy and provider settings. The development agent must not approve, commit, push or merge. Runtime approval, execution, mitigation and resolution are human-owned. These are separate from the human Git release decision.",
    "teachingPhase": "core",
    "subtitle": "Use approved accounts and synthetic data. Humans keep the decisions.",
    "cards": [
      {
        "title": "Data and access",
        "body": "Use your approved account and provider. Never send customer data or secrets."
      },
      {
        "title": "Actions",
        "body": "Read-only investigation. Humans review plans, approve actions, publish code and close incidents."
      }
    ]
  },
  {
    "title": "Open Claude Code",
    "stateId": "5:Open Claude Code",
    "kicker": "W5 · SETUP · YOUR TURN",
    "subtitle": "You are the developer of the checkout SRE agent. Open your own unfinished copy before you ask Claude to change it.",
    "type": "practice",
    "layout": "exercise",
    "teachingPhase": "core",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    },
    "steps": [
      "Follow the card: clone once and create the start checkpoint.",
      "Enter .lab/checkpoints/start and run claude.",
      "Sign in if asked. Run /status and check your account."
    ],
    "cards": [
      {
        "title": "Your workspace",
        "body": ".lab/checkpoints/start\nClaude Code: /status"
      }
    ],
    "visual": {
      "shotLabel": "Example checklist, not a captured Claude session",
      "shot": "assets/workshop-5/assignments/claude-start.png",
      "shotAlt": "Open the assistant in the starter — Example checklist, not a captured Claude session",
      "reference": "assets/workshop-5/assignments/index.html#claude-start"
    },
    "expected": "Claude Code is open in your starter; you can identify the approved account.",
    "keyPoints": [
      "Claude Code is open in your starter; you can identify the approved account."
    ],
    "notes": "Follow docs/claude-code.md. Install Claude Code with the official installer if missing; check claude --version in a new terminal. Participants use their approved accounts. /status reports the session; inspect .claude/settings.json for hooks and permissions. Do not disable guards. Never run a second checkpoint creation over an existing destination. Native Windows is supported by the instructions, not verified by our Linux run. Use CARD.md for the copyable commands. Do not recreate an existing checkpoint destination. Scenario: You are the developer of the checkout SRE agent. Open your own unfinished copy before you ask Claude to change it. Start: The original clone exists. No checkpoint is being reused or overwritten. Expected: Claude Code is open in .lab/checkpoints/start. /status shows the approved account, not proof of runtime SDK access. Stop: Stop if login fails or the folder is wrong. Do not share account details or credentials in screenshots. Show the example at assets/workshop-5/assignments/index.html#claude-start. The image is an illustrative reference, not participant evidence.",
    "stepsHeading": "Do this now:"
  },
  {
    "title": "First assignment: understand before editing",
    "stateId": "6:First assignment: understand before editing",
    "kicker": "W5 · ORIENT · YOUR TURN",
    "subtitle": "The on-call engineer needs trustworthy evidence, not a confident guess. Check that Claude understands the two repairs before it writes code.",
    "type": "practice",
    "layout": "exercise",
    "teachingPhase": "core",
    "steps": [
      "Use the read-only orientation prompt on the card.",
      "Compare the answer with the required artifacts and both repairs.",
      "Explain the two agent roles. Do not permit edits yet."
    ],
    "prompt": "Read CLAUDE.md, AGENTS.md and CARD.md. Explain the AI SDLC we will practise, its required artifacts and human decisions. Distinguish your development role from the runtime SRE agent. Name the two starter exercises. Do not edit files or run approval, execution, mitigation, resolution, commit or push commands. Wait for my review.",
    "cards": [
      {
        "title": "Read first",
        "body": "CLAUDE.md\nAGENTS.md\nCARD.md"
      }
    ],
    "visual": {
      "shotLabel": "Example checklist, not a model transcript",
      "shot": "assets/workshop-5/assignments/orientation.png",
      "shotAlt": "Check the assistant's understanding — Example checklist, not a model transcript",
      "reference": "assets/workshop-5/assignments/index.html#orientation"
    },
    "expected": "You can state the assignment, required evidence and human decisions.",
    "keyPoints": [
      "You can state the assignment, required evidence and human decisions."
    ],
    "notes": "Let every participant use Claude Code now. Check its answer against CARD.md. Refuse action outside the read-only task. A setup failure is a blocker, not proof of a model run. Scenario: The on-call engineer needs trustworthy evidence, not a confident guess. Check that Claude understands the two repairs before it writes code. Start: Claude Code is open in the unfinished starter. No code edits are permitted yet. Expected: An explanation of the two repairs, required evidence and human decisions. Compare the answer with CARD.md. Stop: Stop if Claude proposes shop changes, approves its own work or starts editing. Show the example at assets/workshop-5/assignments/index.html#orientation. The image is an illustrative reference, not participant evidence.",
    "stepsHeading": "Do this now:",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    }
  },
  {
    "title": "Start the lab and check your starting point",
    "stateId": "7:Start the lab and check your starting point",
    "kicker": "W5 · SETUP · YOUR TURN",
    "subtitle": "Check SDK access separately, then start the shop, traffic and console from the same starter.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-start.png",
      "imageAlt": "Fresh core starter console, with shop health visible and no active incidents.",
      "imageLink": "Console layout reference · earlier offline capture",
      "wideImage": true,
      "bot": "head",
      "place": "under"
    },
    "cards": [
      {
        "title": "Do · use the card",
        "body": "Terminal 2: configure SDK access, install, generate fixtures, run model:check, then start."
      },
      {
        "title": "Ready when",
        "body": "The model preflight passes; the shop and traffic run; the console has no incident yet."
      }
    ],
    "keyPoints": [
      "Do · use the card: Terminal 2: configure SDK access, install, generate fixtures, run model:check, then start.",
      "Ready when: The model preflight passes; the shop and traffic run; the console has no incident yet."
    ],
    "notes": "Reuse the starter created on Open Claude Code. Do not clone or create it twice. In the second terminal configure SDK API or cloud access per docs/claude-code.md, install dependencies, generate fixtures and run npm run model:check. It sends a small paid request with no tools and must return PASS. A successful CLI /status is not this check. On failure stop and fix access; no automatic offline fallback. An explicitly agreed offline demo uses npm start -- --fast --offline and must be labeled scripted. Keep the launcher open; Ctrl+C stops only its children. The console reloads on source edits. Stop only your own launcher if ports are busy. Open shop 4310, console 4320 and /hub. Use the exact commands on CARD.md. If the model is unavailable, record the blocker; no automatic offline fallback. Agree explicitly before scripted offline replay. The screenshot is an earlier offline capture showing the starting UI, not SDK-access evidence.",
    "teachingPhase": "core"
  },
  {
    "title": "Break",
    "stateId": "8:Break",
    "kicker": "W5 · 11:00 · 15 MINUTES",
    "type": "pause",
    "cards": [
      {
        "title": "Next",
        "body": "Core 1 · specify from evidence"
      }
    ],
    "visual": {
      "countdown": 15,
      "bot": "wave",
      "place": "beside"
    },
    "notes": "Morning break. Resume with the observed problem, not another introduction.",
    "teachingPhase": "core"
  },
  {
    "title": "Specify: start with an observed problem",
    "stateId": "9:Specify: start with an observed problem",
    "kicker": "W5 · CORE 1 · SPECIFY · YOUR TURN",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Use the starter to observe the missing deployment signal.",
      "Separate recorded facts, model claims and unknowns.",
      "Turn that gap into an accepted software requirement."
    ],
    "expected": "Core 1 delivers checked observations and an accepted intent.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "Keep the evidence",
        "body": "docs/diagnosis-live.md\nintent.md"
      }
    ],
    "visual": {
      "shotLabel": "Example evidence record; fill in your own observations",
      "shot": "assets/workshop-5/assignments/evidence.png",
      "shotAlt": "Find the missing evidence — Example evidence record; fill in your own observations",
      "reference": "assets/workshop-5/assignments/index.html#evidence"
    },
    "keyPoints": [
      "Core 1 delivers checked observations and an accepted intent."
    ],
    "notes": "Frame the task in one minute, then continue to fault injection. The proof is docs/diagnosis-live.md plus intent.md. Do not repeat the whole workshop route. Scenario: Customers report checkout failures after a bad deployment. The on-call engineer can see errors, but the starter returns no deployment records. Start: Start with a healthy shop and an empty console. Inject one bad deploy at the next step, then inspect that incident. Expected: The trace shows an empty list_deploys result. Missing evidence is a gap, not proof that no deployment occurred. Stop: Stop on fabricated citations or a failed contract. Preserve the output instead of forcing a rollback proposal. Show the example at assets/workshop-5/assignments/index.html#evidence. The image is an illustrative reference, not participant evidence.",
    "subtitle": "Customers report checkout failures after a bad deployment. The on-call engineer can see errors, but the starter returns no deployment records.",
    "teachingPhase": "core",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    }
  },
  {
    "title": "Create one fault and observe detection",
    "stateId": "10:Create one fault and observe detection",
    "kicker": "W5 · CORE 1 · OBSERVE",
    "subtitle": "Traffic creates telemetry. A fixed metric limit opens the incident; the model does not.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/shop-broken.png",
      "imageAlt": "Demo shop after Bad deploy v2.15.0, with a bad-deploy revision badge and observed checkout errors.",
      "imageLink": "localhost:4310 · local demo shop",
      "wideImage": true,
      "bot": "think",
      "place": "under"
    },
    "cards": [
      {
        "title": "Do",
        "body": "Click Bad deploy v2.15.0 once. Keep traffic running; do not also run the CLI fault."
      },
      {
        "title": "Ready when",
        "body": "A new incident appears. Read the server evidence, not just browser counters."
      }
    ],
    "keyPoints": [
      "Do: Click Bad deploy v2.15.0 once. Keep traffic running; do not also run the CLI fault.",
      "Ready when: A new incident appears. Read the server evidence, not just browser counters."
    ],
    "notes": "Explain telemetry immediately before fault injection. With --fast detection takes about one minute; normal detection takes five. The live incident ID varies; do not promise fixture INC-1001. The shop screenshot is an earlier local offline capture. Server metrics and browser counters have different windows. Never reset or repeat the fault to obtain a desired result.",
    "teachingPhase": "core"
  },
  {
    "title": "Check the diagnosis against the evidence",
    "stateId": "11:Check the diagnosis against the evidence",
    "kicker": "W5 · CORE 1 · VERIFY OBSERVATIONS",
    "subtitle": "A reference must match recorded data. An empty tool result does not prove no deployment occurred.",
    "type": "concept",
    "cards": [
      {
        "title": "Do",
        "body": "Compare citations and the list_deploys trace with telemetry.json."
      },
      {
        "title": "Ready when",
        "body": "Your diagnosis note names checked references, the missing signal and uncertainty."
      }
    ],
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-diagnosis.png",
      "imageAlt": "Checkout diagnosis with evidence references, pending approval and a disabled Execute rollback button.",
      "imageLink": "Console layout reference · earlier offline capture",
      "wideImage": true
    },
    "keyPoints": [
      "Do: Compare citations and the list_deploys trace with telemetry.json.",
      "Ready when: Your diagnosis note names checked references, the missing signal and uncertainty."
    ],
    "notes": "Use the Core 1 steps on CARD.md. Find every citation in demo/data/telemetry.json. Inspect the empty deployment tool result. Ask whether another cause is possible. Preserve fabricated citations or contract errors and stop rather than weakening checks. Save docs/diagnosis-live.md and append an actual progress note. The earlier offline screenshot illustrates layout only; model output may differ.",
    "teachingPhase": "core"
  },
  {
    "title": "Turn the finding into an intent",
    "stateId": "12:Turn the finding into an intent",
    "subtitle": "The empty deployment result blocks a reliable diagnosis. You need a small, testable change that also keeps runtime actions behind human approval.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "W5 · CORE 1 · SPECIFY · YOUR TURN",
    "steps": [
      "Use the intent prompt on the card with your checked observations.",
      "Name the user, outcome and read-only boundary.",
      "Include acceptance checks for deployment data and the human approval gate."
    ],
    "cards": [
      {
        "title": "Make checks observable",
        "body": "Recorded deploys are returned.\nUnapproved actions are refused."
      }
    ],
    "visual": {
      "shotLabel": "Example document, not participant evidence",
      "shot": "assets/workshop-5/assignments/intent.png",
      "shotAlt": "Describe the change before the solution — Example document, not participant evidence",
      "reference": "assets/workshop-5/assignments/index.html#intent"
    },
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    },
    "notes": "Use the existing card prompt. Keep unknowns explicit; an empty deployment result is unknown, not healthy. The approval check must stay fail-closed until repaired. This slide produces a draft; the next slide is the human acceptance checkpoint. Scenario: The empty deployment result blocks a reliable diagnosis. You need a small, testable change that also keeps runtime actions behind human approval. Start: You have compared the trace with telemetry and recorded the missing signal. Expected: A draft intent names the on-call engineer, both repairs, observable checks and the read-only boundary. Stop: Do not build from a vague goal such as make the agent better. Reject invented evidence. Show the example at assets/workshop-5/assignments/index.html#intent. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "expected": "intent.md contains a bounded change and observable acceptance criteria.",
    "stepsHeading": "Do this now:",
    "keyPoints": [
      "intent.md contains a bounded change and observable acceptance criteria."
    ]
  },
  {
    "title": "Accept the assignment before building",
    "stateId": "13:Accept the assignment before building",
    "subtitle": "Claude has drafted an intent. You decide whether another person could prove each check, before any implementation begins.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "W5 · CORE 1 · HUMAN DECISION · YOUR TURN",
    "steps": [
      "Compare the draft with the actual evidence.",
      "Check scope, boundaries and acceptance checks for both repairs.",
      "Record your acceptance and an open question. Reject unsupported claims."
    ],
    "cards": [
      {
        "title": "Human checkpoint",
        "body": "Can another person verify each acceptance criterion?"
      }
    ],
    "visual": {
      "shotLabel": "Example form; placeholders are not acceptance",
      "shot": "assets/workshop-5/assignments/accept-intent.png",
      "shotAlt": "Accept observable requirements — Example form; placeholders are not acceptance",
      "reference": "assets/workshop-5/assignments/index.html#accept-intent"
    },
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    },
    "notes": "Have participants show one criterion another person could verify. The human accepts intent.md; Claude does not accept its own draft. If the scope remains unclear, stop here instead of starting implementation. Scenario: Claude has drafted an intent. You decide whether another person could prove each check, before any implementation begins. Start: The draft intent covers both repairs and cites your checked observation. Expected: Your name, decision, reason and remaining question are recorded in the intent. Stop: If scope or evidence is unclear, request a revision. A model cannot accept its own draft. Show the example at assets/workshop-5/assignments/index.html#accept-intent. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "expected": "A human-accepted intent is ready before planning or code edits.",
    "stepsHeading": "Do this now:",
    "keyPoints": [
      "A human-accepted intent is ready before planning or code edits."
    ]
  },
  {
    "title": "Lunch",
    "stateId": "14:Lunch",
    "kicker": "W5 · 12:00 · 60 MINUTES",
    "type": "pause",
    "cards": [
      {
        "title": "Next",
        "body": "Core 2 · plan, build and verify both repairs"
      }
    ],
    "visual": {
      "countdown": 60,
      "bot": "wave",
      "place": "beside"
    },
    "notes": "Lunch. Resume with the accepted intent and a reviewable baseline.",
    "teachingPhase": "core"
  },
  {
    "title": "Establish a reviewable starting point",
    "stateId": "15:Establish a reviewable starting point",
    "subtitle": "The checkpoint was cut from solved code. Without a baseline, restoring the solution can leave no useful repair diff.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "W5 · CORE 2 · BASELINE · YOUR TURN",
    "steps": [
      "Follow the human-only baseline procedure on the card.",
      "Commit only the two exercise cuts on workshop-base.",
      "Create fix/w5-core. Keep intent and evidence out of the baseline commit."
    ],
    "cards": [
      {
        "title": "Keep the diff meaningful",
        "body": "workshop-base: unfinished cuts\nfix/w5-core: your repair"
      }
    ],
    "visual": {
      "shotLabel": "Illustrative output; commit ids and counts vary",
      "shot": "assets/workshop-5/assignments/baseline.png",
      "shotAlt": "Keep the unfinished code for comparison — Illustrative output; commit ids and counts vary",
      "reference": "assets/workshop-5/assignments/index.html#baseline"
    },
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    },
    "notes": "Use docs/sdlc-git.md. The checkpoint starts from solved HEAD with two unfinished cuts; without a baseline, restoring them can produce an empty diff. A human runs these Git commands. Check git show --stat workshop-base. Never overwrite an existing branch or publish the baseline to upstream. Scenario: The checkpoint was cut from solved code. Without a baseline, restoring the solution can leave no useful repair diff. Start: Your intent is accepted. The two starter cuts are still present. Expected: Your branch is fix/w5-core. The workshop-base commit contains only src/tools.ts and src/executor.ts. Stop: Do not overwrite a branch or include secrets, intent edits or unrelated files in the baseline. Show the example at assets/workshop-5/assignments/index.html#baseline. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "expected": "workshop-base contains only the starter cuts; fix/w5-core is your working branch.",
    "stepsHeading": "Do this now:",
    "keyPoints": [
      "workshop-base contains only the starter cuts; fix/w5-core is your working branch."
    ]
  },
  {
    "title": "Ask for a small plan, then review it",
    "stateId": "16:Ask for a small plan, then review it",
    "kicker": "W5 · CORE 2 · DESIGN · YOUR TURN",
    "subtitle": "The tool test fails because the handler returns no records. Ask for the smallest repair, not a new tool architecture.",
    "type": "practice",
    "cards": [
      {
        "title": "Bound the work",
        "body": "Files, checks, risks and stop point.\nRecord your review in docs/plan.md."
      }
    ],
    "tagline": "Record the plan and your review in docs/plan.md before code edits.",
    "visual": {
      "shotLabel": "Example document, not an approved plan",
      "shot": "assets/workshop-5/assignments/plan.png",
      "shotAlt": "Review the tool plan before implementation — Example document, not an approved plan",
      "reference": "assets/workshop-5/assignments/index.html#plan"
    },
    "keyPoints": [
      "The human has accepted a bounded plan before implementation."
    ],
    "notes": "Explain the failing test before accepting the plan. Check CLAUDE.md boundaries without repeating the orientation lesson. Name a rejected alternative. Do not accept a plan that weakens a contract or adds mutation tools. The second gate repair gets its own plan review at its point of use. Scenario: The tool test fails because the handler returns no records. Ask for the smallest repair, not a new tool architecture. Start: The intent and baseline exist. You can explain the failing tool assertion. Expected: A plan names the handler, checks, risk, rejected alternative and human review decision. Stop: Reject a plan that weakens tests, changes the contract or adds mutation tools. Review the gate plan separately later. Show the example at assets/workshop-5/assignments/index.html#plan. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "layout": "exercise",
    "stepsHeading": "Do this now:",
    "steps": [
      "Use the card prompt with intent, the existing spec and the failing tool test.",
      "Check files, risks, checks and the stop point in docs/plan.md.",
      "Accept the tool scope now. Review the gate plan before that separate repair."
    ],
    "expected": "The human has accepted a bounded plan before implementation.",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    }
  },
  {
    "title": "Understand the tool before repair",
    "stateId": "17:Understand the tool before repair",
    "kicker": "W5 · CORE 2 · MCP AT FIRST USE",
    "subtitle": "MCP exposes named tools. Repair the read-only handler, not the contract.",
    "type": "concept",
    "cards": [
      {
        "title": "Ours",
        "body": "In-process and read-only. Server telemetry in src/tools.ts."
      },
      {
        "title": "4 tools",
        "body": "search_logs\nsummarize_metrics\nlist_deploys\nget_diff"
      }
    ],
    "tagline": "No writes. Every result is saved as evidence.",
    "visual": {
      "diagram": {
        "id": "mcp",
        "title": "Read-only MCP",
        "caption": "The SRE agent reads the loaded telemetry through four tools. No tool can mutate the shop."
      }
    },
    "keyPoints": [
      "Find the empty list_deploys result in the trace.",
      "Read the failing tool assertion. Preserve its MCP registration.",
      "The handler must return the recorded deployments."
    ],
    "notes": "Open src/tools.ts beside the MCP diagram. Point at the handler, its binding and its registration. Participants repair the handler binding and verify the existing registration. In the default real-model run, the SDK exposes these read-only MCP tools. The explicit offline fallback calls the local handlers directly and is not model evidence. Production allowlists and remote systems are optional follow-up topics. Use the tools.test.ts command on CARD.md before editing. Read the failing assertion with the participant. Ready to build means they can explain the missing behaviour, the handler binding and the unchanged registration.",
    "teachingPhase": "core"
  },
  {
    "title": "Repair the tool: red → green",
    "stateId": "18:Repair the tool: red → green",
    "kicker": "W5 · CORE 2 · BUILD · YOUR TURN",
    "subtitle": "The on-call engineer needs the deployment records that the starter hides. Repair the handler without changing its registration.",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Repair TODO(A5): restore the list_deploys handler binding.",
      "Preserve the registration, read-only boundary and evidence contract.",
      "Rerun the tool test, typecheck and bench using the card."
    ],
    "expected": "The tool checks pass. The gate exercise is still unfinished; this is not release-ready.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "Stay in scope",
        "body": "src/tools.ts\nTODO(A5)"
      }
    ],
    "visual": {
      "shotLabel": "Expected result shape, not a recorded test run",
      "shot": "assets/workshop-5/assignments/tool-test.png",
      "shotAlt": "Prove the deployment tool repair — Expected result shape, not a recorded test run",
      "reference": "assets/workshop-5/assignments/index.html#tool-test"
    },
    "keyPoints": [
      "The tool checks pass. The gate exercise is still unfinished; this is not release-ready."
    ],
    "notes": "Use the exact focused command on CARD.md. The tool test checks returned records; the offline bench checks fixed scripted outcomes, not model quality. Explain this before running it. Do not lower acceptance thresholds. The intermediate core-2 checkpoint solves only this tool; it does not complete all of Core 2. Scenario: The on-call engineer needs the deployment records that the starter hides. Repair the handler without changing its registration. Start: You have accepted the tool plan. The focused tools test is red. Expected: Both tool assertions pass after repair. The gate exercise is still unfinished, so this is not release-ready. Stop: If the handler still returns [], inspect the binding. Do not weaken the test or count a solved checkpoint as your work. Show the example at assets/workshop-5/assignments/index.html#tool-test. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    }
  },
  {
    "title": "Check the change on the same incident",
    "stateId": "19:Check the change on the same incident",
    "kicker": "W5 · CORE 2 · VERIFY LIVE · YOUR TURN",
    "subtitle": "A green tool test does not show what the real model used. Investigate the same incident again and inspect the new trace.",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Save the tool file; let the console reload without restarting the shop.",
      "Use the card’s Investigate request on the same incident.",
      "Verify deployment citations against telemetry and record the actual trace."
    ],
    "expected": "You have checked live deployment evidence, or recorded the precise runtime blocker.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "Compare evidence",
        "body": "The tool result and citations must match the recorded deployment."
      }
    ],
    "visual": {
      "shotLabel": "Example evidence record; your trace supplies the values",
      "shot": "assets/workshop-5/assignments/same-incident.png",
      "shotAlt": "Compare the same incident before and after — Example evidence record; your trace supplies the values",
      "reference": "assets/workshop-5/assignments/index.html#same-incident"
    },
    "keyPoints": [
      "You have checked live deployment evidence, or recorded the precise runtime blocker."
    ],
    "notes": "The model may propose different actions. Never require a rollback as proof of a successful tool repair. Preserve fabricated citations or contract failures and stop. Record results in docs/verify/sdlc.md. A fresh exercise requires a new disposable copy, not rebreaking a stale incident. Scenario: A green tool test does not show what the real model used. Investigate the same incident again and inspect the new trace. Start: The tool repair is saved. Keep the shop and traffic running; let the console reload itself. Expected: The trace contains deployment records. Check cited ids and timestamps against your telemetry; model wording and proposals may differ. Stop: Preserve fabricated references or contract failures. Do not restart the shop or require a rollback proposal to get a pass. Show the example at assets/workshop-5/assignments/index.html#same-incident. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    }
  },
  {
    "title": "Understand the human approval gate",
    "stateId": "20:Understand the human approval gate",
    "kicker": "W5 · CORE 2 · SAFETY AT FIRST USE",
    "subtitle": "A diagnosis cannot authorize itself. Approval is separate from execution.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-refusal.png",
      "imageAlt": "Questions go in chat. Actions require named controls.",
      "imageLink": "Console layout reference · earlier offline capture",
      "wideImage": true,
      "bot": "think",
      "place": "under"
    },
    "cards": [
      {
        "title": "Existing boundary",
        "body": "Ask chat to roll back now. Expect refusal and no deployment change."
      },
      {
        "title": "Next repair",
        "body": "Check that a named approval matches this incident and this proposal."
      }
    ],
    "keyPoints": [
      "Existing boundary: Ask chat to roll back now. Expect refusal and no deployment change.",
      "Next repair: Check that a named approval matches this incident and this proposal."
    ],
    "notes": "Run the existing refusal check on CARD.md. It is not the implementation task: chat already blocks mutations. Explain why checkApproval must reject missing or mismatched approval. The starter fails closed, even for valid approval, until repaired. This is Core 2; no runtime execution yet. The screenshot is an earlier offline capture.",
    "teachingPhase": "core"
  },
  {
    "title": "Repair the gate: refuse unsafe actions",
    "stateId": "21:Repair the gate: refuse unsafe actions",
    "kicker": "W5 · CORE 2 · BUILD · YOUR TURN",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Read the red executor test and request the card’s fail-closed plan.",
      "Review the gate plan before allowing the TODO(A8) repair.",
      "Run the focused executor test. Keep every refusal case intact."
    ],
    "expected": "The approval-gate tests pass; no runtime action has been approved or executed.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "Stay fail-closed",
        "body": "src/executor.ts\nTODO(A8)"
      }
    ],
    "visual": {
      "shotLabel": "Expected result shape, not a recorded test run",
      "shot": "assets/workshop-5/assignments/gate-test.png",
      "shotAlt": "Keep human permission specific — Expected result shape, not a recorded test run",
      "reference": "assets/workshop-5/assignments/index.html#gate-test"
    },
    "keyPoints": [
      "The approval-gate tests pass; no runtime action has been approved or executed."
    ],
    "notes": "The human reviews the second plan before the code change. Use test/workshop/executor.test.ts and the existing card prompt. The implementation must reject absent, invalid and mismatched approval. Do not confuse a passing test with permission to click Execute. Scenario: A valid human approval must work, but an approval for another incident or proposal must not. The starter refuses everything. Start: Review the separate gate plan. The valid-approval assertion is red before repair. Expected: The gate accepts the valid named approval in tests and still refuses missing, pending or mismatched approval. Stop: A green gate test is not runtime approval. Do not click Approve or Execute during this repair. Show the example at assets/workshop-5/assignments/index.html#gate-test. The image is an illustrative reference, not participant evidence.",
    "subtitle": "A valid human approval must work, but an approval for another incident or proposal must not. The starter refuses everything.",
    "teachingPhase": "core",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    }
  },
  {
    "title": "Verify the complete change",
    "stateId": "22:Verify the complete change",
    "kicker": "W5 · CORE 2 · TEST",
    "subtitle": "Both repairs are now present. Check the combined change before a human reviews or publishes it.",
    "type": "practice",
    "cards": [
      {
        "title": "Different checks",
        "body": "Tests check code behaviour.\nBench checks scripted cases, not model quality.\nThe trace shows the live run."
      }
    ],
    "visual": {
      "shotLabel": "Example form; replace each field with actual output",
      "shot": "assets/workshop-5/assignments/verification.png",
      "shotAlt": "Record checks, not a done label — Example form; replace each field with actual output",
      "reference": "assets/workshop-5/assignments/index.html#verification"
    },
    "keyPoints": [
      "Both repairs must pass before Core 3.",
      "Save actual results and untested paths in docs/verify/sdlc.md.",
      "Passing checks are evidence, not approval."
    ],
    "notes": "Run npx tsx --test test/workshop/executor.test.ts, npm run verify, npm run test:workshop and npm run test:hooks as listed on CARD.md. The approval gate no longer remains intentionally red. Preserve actual output and runtime blockers in docs/verify/sdlc.md. Never substitute a scripted bench for model evidence or weaken checks to advance. Ready for Core 3 means both repairs pass the required code checks. Scenario: Both repairs are now present. Check the combined change before a human reviews or publishes it. Start: The focused tool and gate tests pass. No runtime action is authorized by these results. Expected: The required commands exit successfully. The evidence record separates code checks from real-model observations. Stop: Keep failing output. Do not mark the change ready or replace model evidence with the scripted bench. Show the example at assets/workshop-5/assignments/index.html#verification. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "layout": "exercise",
    "stepsHeading": "Do this now:",
    "steps": [
      "Run the focused executor test and npm run verify.",
      "Run npm run test:workshop and npm run test:hooks.",
      "Record actual results and limits in docs/verify/sdlc.md."
    ],
    "expected": "Both repairs pass the required code checks before Core 3.",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    }
  },
  {
    "title": "Break",
    "stateId": "23:Break",
    "kicker": "W5 · 14:40 · 15 MINUTES",
    "type": "pause",
    "cards": [
      {
        "title": "Next",
        "body": "Core 3 · review, release decision and observation"
      }
    ],
    "visual": {
      "countdown": 15,
      "bot": "wave",
      "place": "beside"
    },
    "notes": "Afternoon break. Both implementation tasks are complete before the next block.",
    "teachingPhase": "core"
  },
  {
    "title": "Review the actual diff",
    "stateId": "24:Review the actual diff",
    "subtitle": "Tests pass, but the change might still exceed the plan. Review the actual diff and verify Claude's findings yourself.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "W5 · CORE 3 · REVIEW · YOUR TURN",
    "steps": [
      "Check git status; inspect and stage intended new files by exact path yourself.",
      "Use the card prompt to review git diff workshop-base against intent, plan and REVIEW.md.",
      "Verify findings yourself. Record the decision, risks and untested paths."
    ],
    "cards": [
      {
        "title": "Review inputs",
        "body": "intent.md\ndocs/plan.md\nREVIEW.md\ndocs/verify/sdlc.md"
      }
    ],
    "visual": {
      "shotLabel": "Example review record, not an actual approval",
      "shot": "assets/workshop-5/assignments/diff-review.png",
      "shotAlt": "Judge the code against the intent — Example review record, not an actual approval",
      "reference": "assets/workshop-5/assignments/index.html#diff-review"
    },
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    },
    "notes": "Untracked files are absent from git diff workshop-base. Inspect them first and never stage secrets. The coding agent identifies findings; a human judges them. Do not rerun every check just to repeat the preceding slide. Rerun affected checks when review leads to a fix. Solo review is a separate pass and an explicit limitation. Scenario: Tests pass, but the change might still exceed the plan. Review the actual diff and verify Claude's findings yourself. Start: Both repairs and required checks are complete. Inspect untracked files before reviewing the diff. Expected: A meaningful diff against workshop-base and a human decision linked to findings, risks and unchecked paths. Stop: An empty repair diff is not proof. Resolve findings and rerun affected checks before release. Show the example at assets/workshop-5/assignments/index.html#diff-review. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "expected": "The human has accepted the diff or requested a specific fix with fresh checks.",
    "stepsHeading": "Do this now:",
    "keyPoints": [
      "The human has accepted the diff or requested a specific fix with fresh checks."
    ]
  },
  {
    "title": "Prepare the PR and make a release decision",
    "stateId": "25:Prepare the PR and make a release decision",
    "subtitle": "You have a reviewed change. A missing reviewer or repository permission is a release blocker, not permission to bypass the gate.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "W5 · CORE 3 · RELEASE · YOUR TURN",
    "steps": [
      "Prepare the PR text with intent, checks, risks and limitations.",
      "A human follows the Git procedure in their own learner repository.",
      "Check current-head CI and required review before merging. Otherwise record RELEASE BLOCKED."
    ],
    "cards": [
      {
        "title": "Two honest outcomes",
        "body": "Merged with required gates passed, or RELEASE BLOCKED with a reason."
      }
    ],
    "visual": {
      "shotLabel": "Example blocked outcome, not a real PR or merge",
      "shot": "assets/workshop-5/assignments/release.png",
      "shotAlt": "Publish only with the required checks — Example blocked outcome, not a real PR or merge",
      "reference": "assets/workshop-5/assignments/index.html#release"
    },
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    },
    "notes": "Use docs/sdlc-git.md and the card. Human commit, Git approval, push and PR; target workshop-base from fix/w5-core in the learner repo, never upstream. Repository provisioning is facilitator preparation. Do not bypass protection or invent a merge. A local reload is not a production deployment. With release blocked, local observation may continue only as a development test. Scenario: You have a reviewed change. A missing reviewer or repository permission is a release blocker, not permission to bypass the gate. Start: The human has reviewed the diff and current evidence. Claude may prepare PR text, not publish it. Expected: A learner-repo PR from fix/w5-core into workshop-base, or an explicit RELEASE BLOCKED record with a next action. Stop: Do not push to the upstream training repo or bypass required review. A local reload is not a production release. Show the example at assets/workshop-5/assignments/index.html#release. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "expected": "The evidence records the PR and merge commit, or the exact release blocker.",
    "stepsHeading": "Do this now:",
    "keyPoints": [
      "The evidence records the PR and merge commit, or the exact release blocker."
    ]
  },
  {
    "title": "Observe runtime with separate permission",
    "stateId": "26:Observe runtime with separate permission",
    "kicker": "W5 · CORE 3 · OBSERVE",
    "subtitle": "Code review does not approve a shop action. Judge the current proposal and its evidence.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-approval.png",
      "imageAlt": "A named approval enables the separate executor.",
      "imageLink": "Console layout reference · earlier offline capture",
      "wideImage": true,
      "bot": "head",
      "place": "under"
    },
    "cards": [
      {
        "title": "Do",
        "body": "If justified, a named human clicks Approve, then the separate Execute control once."
      },
      {
        "title": "Ready when",
        "body": "An allowed action was executed once, or the safe stop and its reason are recorded."
      }
    ],
    "keyPoints": [
      "Do: If justified, a named human clicks Approve, then the separate Execute control once.",
      "Ready when: An allowed action was executed once, or the safe stop and its reason are recorded."
    ],
    "notes": "Inspect the actual proposal after code review. A real model need not propose rollback. If evidence is insufficient, record the safe stop instead of forcing an action. A release-blocked code change can only be observed as a local development test. Approval is not execution. Keep traffic running for recovery measurements. The screenshot is an earlier offline capture, not this learner’s result.",
    "teachingPhase": "core"
  },
  {
    "title": "Recovery: confirmed or not confirmed?",
    "stateId": "27:Recovery: confirmed or not confirmed?",
    "kicker": "W5 · CORE 3 · HUMAN DECISION",
    "subtitle": "Execution success is not proof of recovery. Inspect the frozen measurements.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-not-landed.png",
      "imageAlt": "NOT LANDED: full and double recovery checks fail; the incident remains open.",
      "imageLink": "Console layout reference · earlier offline capture",
      "wideImage": true,
      "bot": "think",
      "place": "under"
    },
    "cards": [
      {
        "title": "LANDED",
        "body": "Full and double pass. A human decides whether to mark mitigated and resolve with notes."
      },
      {
        "title": "NOT LANDED or unknown",
        "body": "Keep the incident open. Preserve the failed check. Investigate or escalate; never retry for green."
      }
    ],
    "keyPoints": [
      "LANDED: Full and double pass. A human decides whether to mark mitigated and resolve with notes.",
      "NOT LANDED or unknown: Keep the incident open. Preserve the failed check. Investigate or escalate; never retry for green."
    ],
    "notes": "Only the half check may fail. Full and double must both pass. Record the actual outcome and human decision; LANDED alone does not close the incident. If resolved, retain incident ID, name and lesson. The screenshot shows the real earlier offline INC-08920 safe stop: half 0, full 0.0071, double 0.0142, frozen limit 0.005. It is layout and safety evidence, not a real-model success.",
    "teachingPhase": "core"
  },
  {
    "title": "Turn the observation into the next task",
    "stateId": "28:Turn the observation into the next task",
    "subtitle": "Recovery may fail even after a successful execution. Use the failed measurement or another observed limit to propose one next change.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "W5 · CORE 3 · PLAN AGAIN · YOUR TURN",
    "steps": [
      "Record the observed runtime result or blocker.",
      "Use the card prompt to propose one next change with an acceptance check.",
      "Review the proposal yourself; distinguish facts from hypotheses."
    ],
    "cards": [
      {
        "title": "Ground the next task",
        "body": "Observed result\nOne change\nAcceptance check\nHuman review"
      }
    ],
    "visual": {
      "shotLabel": "Conditional example; use only if you observed this gap",
      "shot": "assets/workshop-5/assignments/next-task.png",
      "shotAlt": "Use the actual result for the next task — Conditional example; use only if you observed this gap",
      "reference": "assets/workshop-5/assignments/index.html#next-task"
    },
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/CARD.md",
      "label": "Participant card · exact steps and checks"
    },
    "notes": "Do not invent a successful run or close an unresolved incident. A failed recovery check, missing observation or review finding can ground the next task. Proposing and reviewing it is required; implementing it is optional. Keep the next task out of this change unless the scope is explicitly revised. Scenario: Recovery may fail even after a successful execution. Use the failed measurement or another observed limit to propose one next change. Start: The runtime outcome or blocker is recorded. Keep an unresolved incident open. Expected: One proposed task has evidence, an observable acceptance check and a human review decision. Stop: Do not invent successful recovery or implement the next task without a new accepted scope. Show the example at assets/workshop-5/assignments/index.html#next-task. The image is an illustrative reference, not participant evidence.",
    "teachingPhase": "core",
    "expected": "docs/verify/sdlc.md contains one evidence-based next task and your review decision.",
    "stepsHeading": "Do this now:",
    "keyPoints": [
      "docs/verify/sdlc.md contains one evidence-based next task and your review decision."
    ]
  },
  {
    "title": "Continue independently",
    "stateId": "29:Continue independently",
    "kicker": "W5 · SOLO · YOUR TURN",
    "subtitle": "You continue without a facilitator. Preserve your own code and evidence, and name the limits of self-review.",
    "type": "practice",
    "layout": "exercise",
    "teachingPhase": "core",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent/blob/main/SOLO.md",
      "label": "SRE lab · recommended solo route"
    },
    "steps": [
      "Follow the recommended SRE solo route, not a second lab.",
      "Review your own work in a separate pass; record that limitation.",
      "Use a separate checkpoint if stuck. Preserve your work and record what you borrowed."
    ],
    "cards": [
      {
        "title": "Safe checkpoint use",
        "body": "core-2: tool solved, gate unfinished\ncore-3: solved reference"
      }
    ],
    "visual": {
      "shotLabel": "Example note, not participant progress",
      "shot": "assets/workshop-5/assignments/solo.png",
      "shotAlt": "Resume without inventing completion — Example note, not participant progress",
      "reference": "assets/workshop-5/assignments/index.html#solo"
    },
    "expected": "You know where to resume without skipping required evidence or review.",
    "keyPoints": [
      "You know where to resume without skipping required evidence or review."
    ],
    "notes": "SOLO.md starts with the recommended route. The legacy offline reference is not the default. Require another reviewer where repository policy says so. core-2 is tool-solved but gate-unfinished, an intermediate aid inside Core 2; core-3 is a solved reference. Neither proves learner-authored work. Daily Brief is a separate follow-up exercise outside this deck. Scenario: You continue without a facilitator. Preserve your own code and evidence, and name the limits of self-review. Start: Read SOLO.md and locate the last step you actually verified. Expected: A resume note names the last verified step, next check and any borrowed checkpoint code. Stop: Do not overwrite your work or copy another run's approvals. A required independent reviewer still blocks release. Show the example at assets/workshop-5/assignments/index.html#solo. The image is an illustrative reference, not participant evidence.",
    "stepsHeading": "Do this now:"
  },
  {
    "title": "Show the completed lifecycle",
    "stateId": "30:Show the completed lifecycle",
    "kicker": "W5 · RECAP · BRIDGE TO W6–W7",
    "type": "recap",
    "layout": "recap",
    "items": [
      {
        "label": "Intent and design",
        "caption": "Accepted checks, boundaries and a reviewed plan."
      },
      {
        "label": "Change and delivery",
        "caption": "Code diff, actual tests, human review and PR or release blocker."
      },
      {
        "label": "Observe and iterate",
        "caption": "The actual runtime result and one reviewed next task."
      }
    ],
    "visual": {
      "levelUp": true
    },
    "tagline": "Next: W6 builds one small part of your own use case. W7 reviews, finishes and presents it.",
    "notes": "Ask each learner to point to evidence from Plan, Design, Build, Test, Release and Observe. Revisit the delivery skill they chose at the start: what can they now prove, and what still needs work? A blocker stays a blocker. A solved checkpoint cannot replace a participant-authored change. Bridge to W6: take the same lifecycle to one small part of the existing personal or team use case, with n8n or the Agent SDK. W7 finishes and presents that same scope; the shop is not a mandatory project. End the taught route here. Slides after this close are reference only: select one for a specific follow-up question; do not continue presenting by default.",
    "teachingPhase": "core",
    "subtitle": "Show your work: intent, plan, tested diff, human decision and next task."
  },
  {
    "title": "skills",
    "stateId": "31:skills",
    "kicker": "W5 · REFERENCE ONLY · NOT PART OF THE ASSIGNMENT",
    "subtitle": "A method that Claude loads when a step needs it.",
    "type": "concept",
    "cards": [
      {
        "title": "Policy",
        "body": "incident-triage/SKILL.md. The policy owner signs off, as with code."
      },
      {
        "title": "It says",
        "body": "How to triage\nWhat to cite\nWhat never to do"
      }
    ],
    "visual": {
      "mdfile": 1,
      "mdName": "incident-triage/SKILL.md"
    },
    "keyPoints": [
      "A skill is a versioned file.",
      "A skill advises. It does not enforce.",
      "Review it before you install it."
    ],
    "notes": "Reference only. Open .claude/skills/incident-triage/SKILL.md when participants want a reusable method. A skill advises; it does not enforce. Review the file and policy before installation. No extra skill is required to finish the assignment.",
    "teachingPhase": "optional"
  },
  {
    "title": "External skills: read first",
    "stateId": "32:External skills: read first",
    "kicker": "W5 · REFERENCE ONLY · NOT PART OF THE ASSIGNMENT",
    "subtitle": "Six checks first.",
    "type": "concept",
    "cards": [
      {
        "title": "Checklist",
        "body": "1 · Read all of SKILL.md, HTML comments, references/\n2 · ! lines: shell runs at load\n3 · Scripts and hooks: what do they run?\n4 · Network: curl, fetch, npx/bunx, git clone, URLs\n5 · Secrets: .env, tokens, ~/.ssh, gcloud\n6 · Injection: “ignore previous”, “without approval”, hidden characters"
      }
    ],
    "tagline": "Also check allowed-tools and disable-model-invocation. Install per project in a PR/MR. npm run skill:scan is a first filter, not a seal.",
    "visual": {
      "checklist": 0,
      "bot": "think",
      "place": "left"
    },
    "keyPoints": [
      "Six check questions.",
      "Per project, in a PR/MR.",
      "skill:scan is not a seal."
    ],
    "notes": "Reference only. Read external skill files, scripts, hooks, network requests and secret access before installation. npm run skill:scan is a first filter, not a safety guarantee. Install per project through a reviewed PR; never copy an unreviewed pack into the global configuration.",
    "teachingPhase": "optional"
  },
  {
    "title": "Hooks: allow, ask, deny",
    "stateId": "33:Hooks: allow, ask, deny",
    "kicker": "W5 · REFERENCE ONLY · NOT PART OF THE ASSIGNMENT",
    "type": "concept",
    "layout": "compare",
    "columns": [
      {
        "title": "Allow",
        "items": [
          "The 4 read-only telemetry tools",
          "npm run verify · bench · test:hooks",
          "Writes in docs/, test/, lessons/proposed/"
        ]
      },
      {
        "title": "Ask",
        "items": [
          "git commit",
          "intent.md, spec, plan, bench/cases.json",
          "src/ and test/ on a fix/* branch",
          "Push after a named approval"
        ]
      },
      {
        "title": "Deny",
        "items": [
          "curl, wget, ssh, WebFetch",
          ".env, secrets/, keys, gcloud",
          "approvals/, approve scripts",
          "Merge and approve: always"
        ]
      }
    ],
    "visual": {
      "diagram": {
        "id": "hooks",
        "title": "Allow, ask, deny",
        "caption": "The lab hook checks supported tool calls. Named approval requests confirmation; merge stays blocked."
      }
    },
    "keyPoints": [
      "Permissions + hook + approvals/ + audit.jsonl.",
      "Merge and approve are human work.",
      "Regex rules are best effort."
    ],
    "notes": "Reference only. Show .claude/hooks/guard.mjs and approvals/audit.jsonl when explaining an actual denial. The human workshop route owns commit, push and merge even where underlying configuration can request confirmation. Optional guard edits are human-only. Regex guards are best effort, not a replacement for isolation or company policy.",
    "teachingPhase": "optional",
    "subtitle": "A hook runs on an agent event. It can block an action; it cannot approve one."
  },
  {
    "title": "subagents",
    "stateId": "34:subagents",
    "kicker": "W5 · REFERENCE ONLY · NOT PART OF THE ASSIGNMENT",
    "subtitle": "A helper session with its own context. Delegate the work, never the acceptance.",
    "type": "concept",
    "cards": [
      {
        "title": "Investigator",
        "body": ".claude/agents/oncall-investigator.md. Own context. It only reports."
      },
      {
        "title": "Never",
        "body": "A subagent does not accept a plan. It approves nothing."
      }
    ],
    "tagline": "Delegate the work. Never the acceptance.",
    "visual": {
      "diagram": {
        "id": "subagents",
        "title": "Separate verifier context",
        "caption": "A verifier checks the diagnosis in a separate context. A human accepts the result."
      }
    },
    "keyPoints": [
      "Own context.",
      "The verifier only reports.",
      "A human accepts."
    ],
    "notes": "Reference only. Explain separate context and a reporting-only result. A verifier is not automatically independent evidence: inspect its inputs and checks. A subagent never accepts a plan or approves a release.",
    "teachingPhase": "optional"
  },
  {
    "title": "Extend the bench without weakening it",
    "stateId": "35:Extend the bench without weakening it",
    "kicker": "W5 · REFERENCE ONLY · NOT PART OF THE ASSIGNMENT",
    "type": "concept",
    "cards": [
      {
        "title": "Commands",
        "body": "npm run bench\n/verify-this"
      }
    ],
    "visual": {
      "diagram": {
        "id": "eval",
        "title": "Diagnosis test bench",
        "caption": "Check evidence and reasoning against the case. Fix the diagnosis, not the eval."
      }
    },
    "keyPoints": [
      "The ratchet only goes up.",
      "Fix the investigator or the case.",
      "Never lower the floor."
    ],
    "notes": "Reference only after the required cycle is complete. Adding a case is a separate reviewed change. Never lower bench/ratchet.json to obtain a pass. The guard and human review protect that floor; an offline bench is not model-quality evidence.",
    "subtitle": "After the assignment, add a regression case for an observed failure.",
    "teachingPhase": "optional",
    "tagline": "Add a case for the observed failure. Never lower the acceptance floor."
  },
  {
    "title": "CI: repeat the checks",
    "stateId": "36:CI: repeat the checks",
    "kicker": "W5 · REFERENCE ONLY · NOT PART OF THE ASSIGNMENT",
    "subtitle": "A repeatable path of steps. Here: CI. Both run offline.",
    "type": "concept",
    "layout": "compare",
    "columns": [
      {
        "title": "GitHub Actions",
        "items": [
          "npm ci + npm run verify → test:hooks → bench → check:approval"
        ]
      },
      {
        "title": "GitLab CI",
        "items": [
          "npm ci + npm run verify → test:hooks → bench → check:approval"
        ]
      }
    ],
    "tagline": "Agents in CI: only after the gates. No keys.",
    "visual": {
      "pipes": true,
      "same": [
        0,
        1,
        2,
        3
      ]
    },
    "keyPoints": [
      "The same steps on both platforms.",
      "No key needed.",
      "check:approval fails without approval."
    ],
    "notes": "Reference only. Inspect the actual repository CI definition and required checks. Deterministic CI uses explicit offline mode and needs no model credentials; it does not prove the real model path. A fix/* branch still needs named human Git approval. A failing inherited starter check is a blocker, not permission to weaken CI.",
    "teachingPhase": "optional"
  },
  {
    "title": "Production: different signals, same boundaries",
    "stateId": "37:Production: different signals, same boundaries",
    "kicker": "W5 · REFERENCE ONLY · NOT PART OF THE ASSIGNMENT",
    "subtitle": "Today: real model, synthetic local signals. Humans still decide.",
    "type": "concept",
    "layout": "compare",
    "columns": [
      {
        "title": "Today · on your laptop",
        "items": [
          "Fixtures + a local demo shop",
          "Console listener detects the spike",
          "Real Agent SDK by default; explicit offline replay",
          "Files in console/data and lessons/"
        ]
      },
      {
        "title": "Production · ai-sre-agent",
        "items": [
          "A Cloud Run shop",
          "Cloud Monitoring → Pub/Sub → local worker",
          "Claude Agent SDK on Vertex or the API",
          "PostgreSQL keeps incidents and chat"
        ]
      }
    ],
    "tagline": "Same rules: read-only tools, evidence per claim, humans deploy fixes and close incidents.",
    "keyPoints": [
      "Same loop, different signals.",
      "Four read tools. No mutation tools.",
      "Humans close incidents."
    ],
    "visual": {
      "stagger": "pop",
      "bot": "think",
      "place": "beside"
    },
    "notes": "Reference only. Compare the linked production example with the local synthetic exercise. We do not build or deploy the cloud system today. Keep read-only investigation, evidence and separate human decisions. Do not claim that a local model call or shop rollback deploys the participant’s code.",
    "source": {
      "url": "https://github.com/ai-developer-community/ai-sre-agent",
      "label": "github.com/ai-developer-community/ai-sre-agent"
    },
    "teachingPhase": "optional"
  }
];
