'use strict';
/* Workshop 5. Task, reason, concept at first use, practice, evidence.
   Slides explain; CARD.md and the hub guide execution. Optional depth follows the close. */
window.SLIDES = [
  {
    "title": "Welcome to Workshop 5",
    "kicker": "W5 · OPENING · AI-NATIVE SDLC",
    "subtitle": "Investigate a broken shop. Repair one tool. Judge recovery.",
    "type": "context",
    "visual": {
      "opener": "welcome",
      "bot": "wave",
      "place": "beside",
      "stagger": "pop"
    },
    "cards": [],
    "keyPoints": [
      "Welcome the room.",
      "Check the setup."
    ],
    "notes": "Time: 10:00. Welcome the room. Ask who has Node 22+ and Git. Claude Code is optional for the offline lab. Help missing installations during Start the lab and the morning break.",
    "teachingPhase": "core"
  },
  {
    "title": "Goal of the day",
    "kicker": "W5 · OPENING · GOAL",
    "subtitle": "You leave with a tested change and evidence for a human decision.",
    "type": "context",
    "cards": [
      {
        "title": "What we do",
        "body": "Find missing evidence. Repair a read-only tool. Rebuild the approval gate."
      },
      {
        "title": "Why we do it",
        "body": "A plausible diagnosis is not enough to justify changing a running service."
      },
      {
        "title": "What proves it",
        "body": "Checked references, passing tests, and a recorded recovery result. A safe stop counts."
      }
    ],
    "tagline": "One local shop. Three tasks. Human decisions.",
    "visual": {
      "bot": "happy",
      "place": "aside"
    },
    "keyPoints": [
      "Working code and checked evidence are the outcomes.",
      "The offline agent is scripted, not model evidence.",
      "Hackathon templates and skills are optional depth."
    ],
    "notes": "Time: 10:02. Explain the practical outcome before any terminology. Ask participants what evidence they would need before changing a failing service. The agent proposes; a human approves and executes. Do not promise a LANDED result.",
    "teachingPhase": "core"
  },
  {
    "title": "What we do today",
    "kicker": "W5 · OPENING",
    "subtitle": "A task, its reason, the concept you need, then your turn.",
    "type": "context",
    "visual": {
      "bot": "point",
      "place": "left",
      "dayRoute": [
        "Shop",
        "Investigate",
        "Build + test",
        "Judge recovery",
        "Reflect"
      ]
    },
    "cards": [
      {
        "title": "Morning",
        "body": "10:00 The shop, the problem, and setup\n11:00 Break\n11:15 Core 1: check the evidence"
      },
      {
        "title": "Afternoon",
        "body": "13:00 Core 2: repair the missing tool\n14:40 Break\n14:55 Core 3: judge recovery\n15:50 Reflect and close"
      }
    ],
    "tagline": "Lunch 12:00–13:00. Optional depth follows the closing slide.",
    "keyPoints": [
      "Use CARD.md or the hub for the steps.",
      "Explain each concept when its task needs it.",
      "Optional slides are not a second required route."
    ],
    "notes": "Time: 10:05. Read the route, not a glossary. At each task ask: what will we do, why now, and what will prove it? Open the card or hub. Definitions sit beside the action that uses them. The optional appendix starts after the closing recap; do not present it as another required block.",
    "teachingPhase": "core"
  },
  {
    "title": "Why build an on-call agent?",
    "kicker": "W5 · THE SHOP · WHY THIS TASK",
    "subtitle": "A small web shop. Six engineers. Tonight, one of them is on call.",
    "type": "context",
    "cards": [
      {
        "title": "The team",
        "body": "Six engineers run the shop. Each week one of them is on call, day and night."
      },
      {
        "title": "The page",
        "body": "When checkout fails, customers cannot pay. Every minute costs orders and trust."
      },
      {
        "title": "The real problem",
        "body": "The repair is often fast. The search is slow. Tired people guess, and the knowledge stays in one head."
      }
    ],
    "tagline": "We do not build the agent to fix faster. We build it to find the cause faster, with proof.",
    "visual": {
      "bot": "wave",
      "place": "aside",
      "highlight": [
        {
          "in": "subtitle",
          "text": "one of them is on call",
          "tone": "orange"
        }
      ]
    },
    "keyPoints": [
      "On-call is a team problem, not a hero problem.",
      "The search costs the most time.",
      "No proof, no record, no learning."
    ],
    "notes": "Time: 10:08. Show the team problem before naming the SDLC phases. Ask what takes time during an outage. We use a local fictional shop to practise checking evidence without customer risk.",
    "teachingPhase": "core"
  },
  {
    "title": "The ticket: INC-1001",
    "kicker": "W5 · THE SHOP · THE SCENARIO",
    "subtitle": "03:50 at night. Checkout fails. You are on call.",
    "type": "context",
    "cards": [
      {
        "title": "INC-1001 · P1 · checkout",
        "body": "Alert: error rate 12% for 5 min. The threshold is 2%. Customers cannot pay."
      },
      {
        "title": "What we know",
        "body": "Deploy v2.15.0 went out a few minutes ago. Nobody knows yet if it is the cause."
      },
      {
        "title": "Your job",
        "body": "Find the cause, with evidence. Propose one fix. A named human approves it. Close the ticket with notes."
      }
    ],
    "tagline": "INC-1001 is the teaching scenario. Your live incident gets its own ID.",
    "visual": {
      "bot": "think",
      "place": "aside",
      "highlight": [
        {
          "in": "subtitle",
          "text": "You are on call",
          "tone": "orange"
        }
      ]
    },
    "keyPoints": [
      "One fictional scenario, then your own live incident.",
      "Check evidence before choosing a fix.",
      "Live error rates and detection times vary."
    ],
    "notes": "Time: 10:11. INC-1001 is the fixture scenario, not the ID to search for in the live console. The live listener creates its own incident ID. With --fast, allow about one minute rather than the scenario's five-minute window. Ask what participants would inspect first. Do not promise a fixed time saving.",
    "teachingPhase": "core"
  },
  {
    "title": "The shop: what customers see",
    "kicker": "W5 · THE SHOP · REAL LOCAL UI",
    "subtitle": "Buy sends a real local checkout request. No payment is taken.",
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
        "title": "Try one checkout",
        "body": "Open localhost:4310. Click Buy. Read the result and revision."
      },
      {
        "title": "Read the right window",
        "body": "Shop counters: this browser, last 30 s. Console: server telemetry."
      }
    ],
    "keyPoints": [
      "Try one checkout: Open localhost:4310. Click Buy. Read the result and revision.",
      "Read the right window: Shop counters: this browser, last 30 s. Console: server telemetry."
    ],
    "notes": "Time: 10:14. Project preview. Show the real shop UI, separate from the SRE console. Headphones, Watch and Backpack all call the same demo checkout endpoint; these are not real payments or an inventory system. The shop UI samples its own checkout requests, not all traffic. Its error-rate and latency counters use the last 30 seconds; the chart uses 60 seconds. npm start also runs terminal traffic. The Simulate customers checkbox controls only this browser. A healthy mode still has occasional transient errors.",
    "teachingPhase": "core"
  },
  {
    "title": "With the agent: what it does, what you do",
    "kicker": "W5 · THE SHOP · WHO DOES WHAT",
    "type": "concept",
    "layout": "compare",
    "columns": [
      {
        "title": "The agent: search and propose",
        "items": [
          "Reads logs, metrics, deploys and the diff. Read-only.",
          "Connects the error spike to deploy v2.15.0, with a reference per claim",
          "Proposes ONE fix and says what would change its mind"
        ]
      },
      {
        "title": "You: decide and close",
        "items": [
          "Challenge the diagnosis in the chat",
          "Approve the rollback with your name, then execute",
          "Check that it landed. Close the ticket. Keep the lesson."
        ]
      }
    ],
    "visual": {
      "pairs": true
    },
    "keyPoints": [
      "The agent saves the search, not the decision.",
      "Evidence before a fix.",
      "The human signs the fix."
    ],
    "notes": "Time: 10:17. 1. Show the left column. Say: “The agent does the slow part: the search. It shows its evidence. It proposes one fix.”\n2. Show the right column. Say: “You keep every decision. Approve, execute, close. With your name.”\n3. Ask: “Why not let the agent roll back by itself?” Collect answers: a wrong rollback is a second incident; alert text can contain instructions (prompt injection); nobody owns the decision.\n4. Say: “That is why the agent has no write tools. It is the design, not a missing feature.”",
    "teachingPhase": "core"
  },
  {
    "title": "One ticket, three core tasks",
    "kicker": "W5 · THE USE CASE · THE MAP",
    "subtitle": "The SRE agent is the example. The AI-native SDLC is what you learn.",
    "type": "concept",
    "layout": "steps",
    "items": [
      {
        "label": "Core 1 · Investigate",
        "caption": "check the evidence",
        "detail": "Break the shop. The console opens the incident. Check every reference against the data. Find what the agent cannot see."
      },
      {
        "label": "Core 2 · Build + test",
        "caption": "give the agent its eyes",
        "detail": "Rebuild the read-only list_deploys tool test-first. Tests, bench and trace prove it. The diagnosis changes from investigate-more to rollback."
      },
      {
        "label": "Core 3 · Judge the recovery",
        "caption": "a human signs and closes",
        "detail": "Rebuild the approval gate. Approve with your name. Execute. Read the recovery checks. Close, or stop on NOT LANDED."
      },
      {
        "label": "Optional depth",
        "caption": "intent · spec · hooks · bench · git gate",
        "detail": "intent.md, spec.md, your own guard rule, a bench case, the git gate, your hackathon intent.md."
      }
    ],
    "detail": "Click a task to see what you do for the incident.",
    "visual": {
      "stepKeys": true
    },
    "keyPoints": [
      "Three core tasks on one incident.",
      "Each core passes through the SDLC loop.",
      "Lost? Open the card: CARD.md or localhost:4320/hub."
    ],
    "notes": "Time: 10:20. Show the three tasks and their outputs. Core 1 checks a diagnosis that lacks deploy data. Core 2 repairs that read-only path. Core 3 restores the human approval check and judges recovery. These are the required tasks. The optional documents and skills come after the closing recap or in a separate follow-up.",
    "teachingPhase": "core"
  },
  {
    "title": "The rules for today",
    "kicker": "W5 · RULES OF THE ROAD",
    "type": "concept",
    "layout": "pillars",
    "items": [
      {
        "label": "Own account",
        "caption": "Your Claude account. Vertex AI if your company requires it."
      },
      {
        "label": "Local MCP only",
        "caption": "Server telemetry. Read-only. In the repo."
      },
      {
        "label": "Sample data",
        "caption": "No real systems, customers, or payments."
      },
      {
        "label": "Humans decide",
        "caption": "A named human approves, pushes, and merges."
      }
    ],
    "visual": {
      "bot": "head",
      "place": "under",
      "tool": "toolbox",
      "pillarIcons": true
    },
    "keyPoints": [
      "Native on Windows, macOS, Linux. Offline. No API key.",
      "All work is in the repo.",
      "Maximum human in the loop."
    ],
    "notes": "Time: 10:23. 1. Say the four rules.\n2. Say: “The lab runs native on your laptop with Node and Claude Code. It runs the same on Windows, macOS, and Linux.”\n3. Say: “No API key needed. The agent runs offline on a scripted runtime. A model is optional.”\n4. Say: “Your own Claude account works. If your company requires Vertex AI, use Vertex. INSTALL.md has the steps.”",
    "teachingPhase": "core"
  },
  {
    "title": "Use only approved data",
    "kicker": "W5 · DISCLAIMER · READ ALONG",
    "subtitle": "The offline lab uses local demo data. Your company policy still applies.",
    "type": "context",
    "cards": [
      {
        "title": "Local exercise",
        "body": "Use the supplied fixtures and local shop. Do not paste secrets or customer data."
      },
      {
        "title": "External tools",
        "body": "A coding assistant or real model can send data externally. Check your policy and provider settings first."
      }
    ],
    "visual": {
      "keyLine": 1,
      "stamp": "YOUR POLICY",
      "bot": "point",
      "place": "key",
      "highlight": [
        {
          "in": "card:1",
          "text": "Your company policy applies",
          "tone": "mark"
        }
      ]
    },
    "keyPoints": [
      "Read the text aloud.",
      "The README and handout have the same text.",
      "archify gets external code."
    ],
    "notes": "Time: 10:26. Use synthetic lab data. The offline runtime makes no model call. A coding assistant, an external skill or an explicitly selected model is a separate integration; do not promise that those services retain no data. Follow company policy and provider terms.",
    "teachingPhase": "core"
  },
  {
    "title": "Start the lab",
    "kicker": "W5 · SETUP · YOUR TURN",
    "subtitle": "One start command after setup. Offline. No API key.",
    "repo": {
      "url": "https://github.com/RyanLisse/sre-oncall-agent",
      "label": "sre-oncall-agent · current revision + isolated starter"
    },
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Clone the lab. Create the isolated start checkpoint.",
      "Enter .lab/checkpoints/start. Run npm start -- --fast.",
      "Open localhost:4320/hub. Keep the lab terminal open.",
      "Use a second terminal in the starter directory for tasks."
    ],
    "expected": "✓ Lab running. The hub opens. Shop healthy.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "In the lab repo",
        "body": "git clone https://github.com/RyanLisse/sre-oncall-agent.git\ncd sre-oncall-agent\nnpm run checkpoint -- start\ncd .lab/checkpoints/start\nnpm start -- --fast"
      }
    ],
    "visual": {
      "shotLabel": "sre-oncall-agent · npm start",
      "cmdCards": [
        0
      ]
    },
    "keyPoints": [
      "One command starts shop, traffic and console.",
      "Ctrl+C stops all three.",
      "Breaking the shop is a separate, deliberate step."
    ],
    "notes": "Time: 10:30. Use Node 22+ and Git. Follow CARD.md from the current revision, not an old w5-core tag. npm run checkpoint -- start creates an isolated worktree with two deliberate exercises. It never overwrites an existing copy. Enter that directory before npm start -- --fast. The launcher installs dependencies, generates fixtures, and starts shop, traffic and console. Open the hub, then both UIs. The console reloads on source edits; shop state stays unchanged. Ctrl+C stops owned processes. A busy port means another copy is running: find and stop that terminal. Optional coding assistant: run claude then /status in a second terminal in this same starter directory. No Claude account is needed for the offline lab; the two code exercises can be completed in an editor.",
    "teachingPhase": "core"
  },
  {
    "title": "Start result: an empty console",
    "kicker": "W5 · EXPECTED RESULT",
    "subtitle": "The launcher runs the shop and traffic. No incident yet.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-start.png",
      "imageAlt": "Fresh core starter console, with shop health visible and no active incidents.",
      "imageLink": "Local SRE console · click the image to enlarge",
      "wideImage": true,
      "bot": "head",
      "place": "under"
    },
    "cards": [
      {
        "title": "Expect",
        "body": "Shop health in the header.\nNo active incidents before the fault."
      },
      {
        "title": "Open both",
        "body": "Shop: localhost:4310\nConsole: localhost:4320\nCard: localhost:4320/hub"
      }
    ],
    "keyPoints": [
      "The health header shows live shop telemetry.",
      "Complete list_deploys before live recovery."
    ],
    "notes": "Time: 10:55. This is a real local console capture. A fresh starter has no incidents or approvals. npm start now starts the shop and traffic too. Check the health header rather than inferring health from an empty incident list. This capture uses the core starter and the disclosed one-minute fast demo window.",
    "teachingPhase": "core"
  },
  {
    "title": "Break",
    "kicker": "W5 · 11:00 · 15 MINUTES",
    "type": "pause",
    "cards": [
      {
        "title": "Next",
        "body": "Plan"
      }
    ],
    "visual": {
      "countdown": 15,
      "bot": "wave",
      "place": "beside"
    },
    "notes": "Time: 11:00. 1. Start the countdown.\n2. Help each person with a red setup check. Use the Start failures in FACILITATOR.md.\n3. At 11:15, continue with the use case. Pair each person without setup with a neighbor.",
    "teachingPhase": "core"
  },
  {
    "title": "Core 1: Investigate the evidence",
    "kicker": "W5 · PLAN · YOUR TURN",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Break the shop once and wait for its incident.",
      "Compare the diagnosis references with the recorded data.",
      "Deliver docs/diagnosis-live.md with checked references and the missing signal.",
      "Next: learn what the listener measures, then use card 1.1."
    ],
    "expected": "An incident opened by the listener. A diagnosis with references and a list_deploys data gap.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "Why this task",
        "body": "A recent deploy is a clue, not proof. Missing data must stay unknown."
      }
    ],
    "visual": {
      "shotLabel": "Console · incident banner + diagnosis"
    },
    "keyPoints": [
      "You break the shop. The listener detects it.",
      "The agent is never the detector.",
      "A missing signal is unknown, not healthy."
    ],
    "notes": "Time: 11:15. Introduce the task before explaining telemetry. Ask participants to predict what evidence they would accept. Do not inject the fault yet; first show how detection works. Return to the card for the actual steps. Core 1 ends with evidence and a data gap, not an approval.",
    "subtitle": "Find what the diagnosis can prove, and what it cannot see.",
    "teachingPhase": "core"
  },
  {
    "title": "Before the fault: how detection works",
    "kicker": "W5 · CORE 1 · CONCEPT AT FIRST USE",
    "subtitle": "Telemetry is recorded service data. The listener checks it against a fixed limit.",
    "type": "concept",
    "layout": "steps",
    "items": [
      {
        "label": "Traffic",
        "caption": "checkout requests exercise the shop"
      },
      {
        "label": "Observe",
        "caption": "the shop writes metrics and logs"
      },
      {
        "label": "Compare",
        "caption": "the listener checks a fixed error limit"
      },
      {
        "label": "Investigate",
        "caption": "read-only tools gather evidence"
      },
      {
        "label": "Decide",
        "caption": "a human owns any action"
      }
    ],
    "visual": {
      "bot": "point",
      "place": "aside"
    },
    "keyPoints": [
      "Detection is deterministic, not a model decision.",
      "Browser counters are not server telemetry.",
      "Next, inject one fault and wait for an incident."
    ],
    "notes": "Time: 11:18. Explain the detection sequence beside the next action. Traffic produces observations; the listener compares server metrics with a fixed threshold and opens an incident. The later action belongs to a human and a separate executor. Now move to the fault screenshot and card step 1.1. Do not run a design skill here.",
    "teachingPhase": "core"
  },
  {
    "title": "Break the shop, then inspect the incident",
    "kicker": "W5 · THE SHOP · REAL LOCAL UI",
    "subtitle": "The fault button is your operator lever. It is not an agent tool.",
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
        "title": "Make one change",
        "body": "Click Bad deploy v2.15.0 once, OR use the chaos command."
      },
      {
        "title": "Do not reset to pass",
        "body": "Keep traffic running. Recovery goes through the console approval gate."
      }
    ],
    "keyPoints": [
      "Make one change: Click Bad deploy v2.15.0 once, OR use the chaos command.",
      "Do not reset to pass: Keep traffic running. Recovery goes through the console approval gate."
    ],
    "notes": "Time: 11:22. Within core 1. The screenshot shows a real bad-deploy state; sampled errors vary. Do not click the button as well as running the command: that creates another deploy record and confuses the evidence. Wait for the console listener, about one minute with --fast, five minutes by default. A single Buy can still pass because this fault affects about 12% of requests. Other fault buttons are optional experiments, not the core route. Reset to healthy changes the fault mode without rolling back the revision; it is not evidence of approved recovery. Do not use reset to force a green recovery. Fresh repeats use a new disposable lab copy. Do card step 1.1 now. Once the incident exists, pause before reading the diagnosis; the next slide explains references and data gaps.",
    "teachingPhase": "core"
  },
  {
    "title": "Before the diagnosis: evidence and data gaps",
    "kicker": "W5 · CORE 1 · CONCEPT AT FIRST USE",
    "subtitle": "A reference points to a recorded observation. A gap means the agent lacks data.",
    "type": "concept",
    "cards": [
      {
        "title": "Evidence reference",
        "body": "metrics:<time> or logs:<time> points to data you can find in telemetry.json."
      },
      {
        "title": "Data gap",
        "body": "list_deploys returns no rows in the starter. That does not prove there was no deploy."
      },
      {
        "title": "Contract",
        "body": "src/contract.ts checks the diagnosis structure. You still check whether its claims match the data."
      }
    ],
    "tagline": "Check the recorded evidence before you accept a claim.",
    "visual": {
      "bot": "think",
      "place": "aside"
    },
    "keyPoints": [
      "Find the referenced observation.",
      "Unknown is not healthy.",
      "Next, check the live diagnosis against the file."
    ],
    "notes": "Time: 11:30. Use one actual reference from the participant incident. Find it in demo/data/telemetry.json, then show v2.15.0 in that same file. The agent cannot access that deployment yet. Explain that schema validation is not proof of truth. Writing spec.md and changing contract tests is optional depth, not a prerequisite for Core 1.",
    "teachingPhase": "core"
  },
  {
    "title": "Before you record: evidence, not a done marker",
    "kicker": "W5 · CORE 1 · CONCEPT AT FIRST USE",
    "subtitle": "PROGRESS.md is a history of checks you actually performed.",
    "type": "concept",
    "source": {
      "url": "https://github.com/RyanLisse/claude-code-skills-pack/blob/main/PROGRESS.md",
      "label": "Open the PROGRESS.md template"
    },
    "cards": [
      {
        "title": "Write the evidence",
        "body": "Name the reference, what you compared, and the missing signal."
      },
      {
        "title": "Append one note",
        "body": "npm run progress:note -- \"Core 1: <what you verified>\""
      }
    ],
    "tagline": "The progress checklist does not run tests. A note is not proof by itself.",
    "visual": {
      "compact": true,
      "stagger": "pop"
    },
    "keyPoints": [
      "npm run progress shows the current checklist.",
      "Dated log entries preserve history. Never rewrite them.",
      "A correction gets its own timestamp and evidence."
    ],
    "notes": "Time: 11:34. Explain this immediately before card step 1.4, not after lunch. Save the diagnosis and append one factual note. Do not edit PROGRESS.md directly or copy a solved team's evidence. A later correction is another entry, not a rewritten history.",
    "teachingPhase": "core"
  },
  {
    "title": "Core 1: Check the claims",
    "kicker": "W5 · DESIGN · YOUR TURN",
    "subtitle": "Every claim has a reference. Find each one in the data.",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Find each reference in demo/data/telemetry.json.",
      "Search the file for v2.15.0: there was a deploy.",
      "Chat: “Could this be something other than the deployment?”",
      "Save docs/diagnosis-live.md. npm run progress:note."
    ],
    "expected": "Every reference found in the data. docs/diagnosis-live.md. A progress note that names what you checked.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "Commands",
        "body": "npm run progress:note -- \"Core 1: <what you verified>\""
      }
    ],
    "visual": {
      "shotLabel": "demo/data/telemetry.json",
      "cmdCards": [
        0
      ]
    },
    "keyPoints": [
      "References are text, not links.",
      "Offline chat is a scripted summary.",
      "Do not approve yet: nothing is safe to execute."
    ],
    "notes": "Time: 11:37. Complete card steps 1.2–1.4. Ask each team to locate a reference and the deployment the agent cannot see. Offline chat returns a scripted summary, not a fresh model investigation. Keep the incident open for Core 2. Collect docs/diagnosis-live.md and a progress note with specific checks.",
    "teachingPhase": "core"
  },
  {
    "title": "Core check: chat refuses a rollback",
    "kicker": "W5 · EXPECTED RESULT",
    "subtitle": "Questions go in chat. Actions require named controls.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-refusal.png",
      "imageAlt": "Questions go in chat. Actions require named controls.",
      "imageLink": "Local SRE console · click the image to enlarge",
      "wideImage": true,
      "bot": "think",
      "place": "under"
    },
    "cards": [
      {
        "title": "Try",
        "body": "Type \"roll back now\" in chat."
      },
      {
        "title": "Expect",
        "body": "A refusal. No deployment change."
      }
    ],
    "keyPoints": [
      "Chat refuses mutations before any model call.",
      "A refusal does not change the deployment."
    ],
    "notes": "Time: 11:57. The core starter already includes chat refusal. Type the exact request roll back now. The response refuses and points to human controls. This is not an A4 implementation exercise: optional A4 concerns the coding-agent guard hook. Check the deployment is unchanged.",
    "teachingPhase": "core"
  },
  {
    "title": "Lunch",
    "kicker": "W5 · 12:00 · 60 MINUTES",
    "type": "pause",
    "cards": [
      {
        "title": "Next",
        "body": "Build 1"
      }
    ],
    "visual": {
      "countdown": 60,
      "bot": "wave",
      "place": "beside"
    },
    "notes": "Time: 12:00. Lunch. Help teams finish their own Core 1 evidence. At 13:00 start from the missing deployment signal, not from a glossary.",
    "teachingPhase": "core"
  },
  {
    "title": "Core 2: Why this change",
    "kicker": "W5 · CORE 2 · WHAT AND WHY",
    "subtitle": "The deploy exists. The agent cannot read it yet.",
    "type": "concept",
    "cards": [
      {
        "title": "What we do",
        "body": "Repair list_deploys in src/tools.ts. Keep it read-only."
      },
      {
        "title": "Why now",
        "body": "Core 1 found the missing deployment evidence. Repair that gap before proposing a rollback."
      },
      {
        "title": "What proves it",
        "body": "The tool test, typecheck and bench pass. The same incident now cites the deploy."
      }
    ],
    "tagline": "No new fault. No new incident. Change the evidence path.",
    "visual": {
      "bot": "think",
      "place": "aside"
    },
    "keyPoints": [
      "Use the gap found in Core 1.",
      "Bind the handler and register the tool.",
      "The approval exercise remains closed until Core 3."
    ],
    "notes": "Time: 13:00. Ask a participant to show the data gap from Core 1. This is the reason for the change, not a new feature invented by the facilitator. Before code, read the repo rules and agree on the small plan. Then explain the tool boundary and the checks that will prove the repair.",
    "teachingPhase": "core"
  },
  {
    "title": "CLAUDE.md",
    "kicker": "W5 · DEFINITION · BUILD 1",
    "subtitle": "Before editing, read the repo rules and agree on the allowed change.",
    "type": "concept",
    "cards": [
      {
        "title": "Scope",
        "body": "Restore list_deploys in src/tools.ts. No mutation tool. No approval or execution."
      },
      {
        "title": "Checks",
        "body": "Tool test, typecheck, bench. Keep A8 closed for the next task."
      }
    ],
    "tagline": "Claude Code is optional. The same scope applies when you code by hand.",
    "visual": {
      "mdfile": 1,
      "guides": [
        [
          "🧭",
          "CLAUDE.md",
          "guides"
        ],
        [
          "🔒",
          "hooks",
          "enforce"
        ]
      ]
    },
    "keyPoints": [
      "Read CLAUDE.md and AGENTS.md before editing.",
      "Do not add an action tool to solve a data gap.",
      "Explain the change before writing it."
    ],
    "notes": "Time: 13:03. Open the local CLAUDE.md and AGENTS.md, not a generic template. Read the allowed change and stop rules. Agents propose code; humans review the evidence. Nobody approves or executes a rollback during Core 2.",
    "teachingPhase": "core"
  },
  {
    "title": "Before code: a small plan",
    "kicker": "W5 · CORE 2 · CONCEPT AT FIRST USE",
    "subtitle": "Name the change and how you will prove it before you edit.",
    "type": "concept",
    "cards": [
      {
        "title": "Change",
        "body": "Restore the list_deploys handler. Bind it. Register the MCP tool."
      },
      {
        "title": "Proof",
        "body": "See the tool test fail first. Then pass it, typecheck and bench. Re-investigate the same incident."
      }
    ],
    "tagline": "Say the plan to your neighbour. A separate plan.md is optional.",
    "visual": {
      "art": "gate",
      "gateLabel": "you accept"
    },
    "keyPoints": [
      "Stranger test: can another person do it?",
      "Each step has a proof command.",
      "Acceptance is a human gate."
    ],
    "notes": "Time: 13:07. Have each pair state the change and its proof in their own words. If they use a coding assistant, review its plan before accepting edits. Do not introduce an RPI skill or another required document. The next two concepts explain the tool boundary and the checks in this plan.",
    "teachingPhase": "core"
  },
  {
    "title": "MCP",
    "kicker": "W5 · DEFINITION · BUILD 1",
    "subtitle": "MCP exposes named tools. Here, the tools read local telemetry.",
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
        "caption": "Four local tools read incident data. They do not write or use the network."
      }
    },
    "keyPoints": [
      "The handler reads deployment records.",
      "Registration exposes that handler as a tool.",
      "No rollback tool belongs in src/tools.ts."
    ],
    "notes": "Time: 13:10. Open src/tools.ts beside the MCP diagram. Point at the handler, its binding and its registration. These are the parts participants will repair. The offline runtime calls the same local handlers directly; it is not evidence of a model using MCP. Production allowlists and remote systems are optional follow-up topics.",
    "teachingPhase": "core"
  },
  {
    "title": "Watch: the tools in the trace",
    "kicker": "W5 · BUILD 1 · DEMO",
    "subtitle": "A trace records the tools used for this diagnosis.",
    "type": "concept",
    "cards": [
      {
        "title": "Open",
        "body": "Keep the lab running. Open the incident from Core 1."
      },
      {
        "title": "Read",
        "body": "Find list_deploys in its trace. Compare its empty result with telemetry.json."
      },
      {
        "title": "Explain",
        "body": "The missing result is the tool defect you are about to repair."
      }
    ],
    "visual": {
      "cmdCards": [
        0,
        1,
        2
      ]
    },
    "keyPoints": [
      "The agent calls 4 read-only tools.",
      "Data before theory: deploys and metrics first.",
      "No tool can write."
    ],
    "notes": "Time: 13:14. Use the existing incident and its current trace. Do not create a new investigation, launch another shop or inject the fault again. Show the empty list_deploys result and the actual deployment in telemetry.json. After the code change, participants will run the investigation again in this same incident.",
    "teachingPhase": "core"
  },
  {
    "title": "eval: the bench",
    "kicker": "W5 · DEFINITION · TEST",
    "subtitle": "Before changing code, know what each check proves.",
    "type": "concept",
    "cards": [
      {
        "title": "Tool test",
        "body": "Does list_deploys return the expected deployment records?"
      },
      {
        "title": "Bench",
        "body": "Do scripted diagnoses still match the expected outcomes across fixed scenarios?"
      }
    ],
    "tagline": "The offline bench checks the scripted pipeline, not model quality.",
    "visual": {
      "diagram": {
        "id": "eval",
        "title": "Diagnosis test bench",
        "caption": "Check evidence and reasoning against the case. Fix the diagnosis, not the eval."
      }
    },
    "keyPoints": [
      "Run the failing tool test first.",
      "After the repair, run typecheck and bench too.",
      "Never lower the acceptance floor to obtain a pass."
    ],
    "notes": "Time: 13:18. Explain the bench before card step 2.1 first mentions it. A unit test checks the tool result; the bench checks fixed scenario outcomes across the pipeline. Run the existing cases. Adding cases and editing the bench configuration are optional depth. This offline result says nothing about model quality.",
    "teachingPhase": "core"
  },
  {
    "title": "Core 2: Build a change safely",
    "kicker": "W5 · BUILD 1 · YOUR TURN",
    "subtitle": "Give the agent its eyes back: the read-only list_deploys tool, test-first.",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "npx tsx --test test/workshop/tools.test.ts: red. Read the assertion.",
      "Build list_deploys in src/tools.ts (TODO A5): bind AND register.",
      "Run the tools test again. Then typecheck and bench.",
      "Card steps 2.1–2.2."
    ],
    "expected": "Tools test green, typecheck green, PASS bench. The executor exercise remains for core 3.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "src/tools.ts",
        "body": "search_logs\nsummarize_metrics\nlist_deploys  ← you\nget_diff"
      }
    ],
    "visual": {
      "shotLabel": "src/tools.ts · test/workshop/tools.test.ts",
      "tree": 0
    },
    "keyPoints": [
      "Read the red test before you change code.",
      "There is no rollback tool. That is the design.",
      "The bench is red too until the tool works."
    ],
    "notes": "Time: 13:22. Do card steps 2.1–2.2. First run the focused tool test and read the failing assertion. Restore the read-only handler, binding and MCP registration. Then run the focused tool test, typecheck and bench. The A8 valid-approval assertion is still expected to fail until Core 3. If behind, compare the current-HEAD core-2 checkpoint without overwriting your work.",
    "teachingPhase": "core"
  },
  {
    "title": "Core 2: Prove it on the live incident",
    "kicker": "W5 · BUILD 2 · YOUR TURN",
    "subtitle": "Save. The console reloads. Ask again. Watch the diagnosis change.",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Save src/tools.ts. The lab terminal shows a console reload.",
      "Same incident, chat: “Investigate: customers report checkout errors”.",
      "list_deploys in the trace. The proposal is now rollback. No data gap.",
      "npm run progress:note -- \"Core 2: …\""
    ],
    "expected": "A new diagnosis that cites deploys:<id> for v2.15.0 and proposes rollback.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "Chat, same incident",
        "body": "Investigate: customers report checkout errors"
      }
    ],
    "visual": {
      "shotLabel": "localhost:4320 · the incident",
      "menu": 0
    },
    "keyPoints": [
      "Same data, better eyes, different verdict.",
      "The shop stays broken while the console reloads.",
      "Test the executor gate in core 3 before you execute."
    ],
    "notes": "Time: 14:10. Follow card step 2.3. Save the tool change and wait for the console reload. Re-investigate the same incident. The new diagnosis should cite the actual deploy and close the list_deploys gap. A reload is not a reset: the incident history persists. If you restart the whole launcher, the shop starts healthy and old telemetry is archived; do not treat an old incident as a fresh demo. Use a new disposable copy for a repeat. The executor gate is still the core 3 exercise; do not approve or execute yet.",
    "teachingPhase": "core"
  },
  {
    "title": "Break",
    "kicker": "W5 · 14:40 · 15 MINUTES",
    "type": "pause",
    "cards": [
      {
        "title": "Next",
        "body": "Test"
      }
    ],
    "visual": {
      "countdown": 15,
      "bot": "wave",
      "place": "beside"
    },
    "notes": "Time: 14:40. Break. Help teams finish Core 2 using their own incident and evidence. Use a separate current-HEAD checkpoint for comparison if needed. Never copy another team's diagnosis or overwrite participant files with historical tags.",
    "teachingPhase": "core"
  },
  {
    "title": "Human gate: approval is not execution",
    "kicker": "W5 · EXPECTED RESULT",
    "subtitle": "Why the gate exists: a diagnosis must never authorize its own action.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-approval.png",
      "imageAlt": "A named approval enables the separate executor.",
      "imageLink": "Local SRE console · click the image to enlarge",
      "wideImage": true,
      "bot": "head",
      "place": "under"
    },
    "cards": [
      {
        "title": "Human approval",
        "body": "A named person signs this incident and this proposal."
      },
      {
        "title": "Separate execution",
        "body": "The executor checks that record. Approval alone changes nothing."
      }
    ],
    "keyPoints": [
      "Execute rollback is disabled.",
      "Check the incident and proposal before you click Execute."
    ],
    "notes": "Time: 14:55. Start Core 3 by asking why a convincing diagnosis is not permission. Explain the approval record immediately before participants rebuild checkApproval. The screenshot is a solved reference, not proof that the starter is ready. The starter deliberately refuses even valid approval until the gate is implemented and tested. The Git push gate is a different, optional exercise.",
    "teachingPhase": "core"
  },
  {
    "title": "Core 3: Judge the recovery",
    "kicker": "W5 · DEPLOY · YOUR TURN",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Rebuild checkApproval (A8). Pass the executor test and the full checks shown here.",
      "Read the evidence. A named human approves, then separately executes once.",
      "Keep traffic running. Read the recovery table on the next slide.",
      "Proof: a justified closure, or a documented NOT LANDED stop."
    ],
    "expected": "executor.test.ts green. A named approval. Recovery running, then LANDED or NOT LANDED.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "Before approval",
        "body": "npx tsx --test test/workshop/executor.test.ts\nnpm run verify\nnpm run test:workshop"
      }
    ],
    "visual": {
      "shotLabel": "A human approves. Not the agent.",
      "cmdCards": [
        0
      ]
    },
    "keyPoints": [
      "The banner names the one allowed step.",
      "The server refuses every other button.",
      "Half may fail. Full and double must pass."
    ],
    "notes": "Time: 15:00. Do card steps 3.1–3.2. Explain the purpose: the agent must not authorize its own action. Implement and test the named approval check for this incident and proposal. Require npm run verify and npm run test:workshop before human approval. Approve and Execute are separate human actions. Explain the frozen recovery observations on the next slide while the checks run. A grey button is a safety state, not an invitation to bypass the gate.",
    "subtitle": "Restore the human gate, then judge whether the measured recovery is sufficient.",
    "teachingPhase": "core"
  },
  {
    "title": "Recovery result: inspect every check",
    "kicker": "W5 · EXPECTED RESULT",
    "subtitle": "Full and double must pass. LANDED still needs a human.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-landed.png",
      "imageAlt": "LANDED reports recovery. The incident remains active.",
      "imageLink": "Local SRE console · click the image to enlarge",
      "wideImage": true,
      "bot": "think",
      "place": "under"
    },
    "cards": [
      {
        "title": "Wait",
        "body": "Keep traffic running for the three recovery checks."
      },
      {
        "title": "Decide",
        "body": "After LANDED, mark mitigated, then resolve with notes."
      }
    ],
    "keyPoints": [
      "Keep traffic running for the three recovery checks.",
      "After LANDED, mark mitigated, then resolve with notes."
    ],
    "notes": "Time: 15:25. Show the structured recovery table: metric, baseline, limit and each measured check. Full and double must both pass; only half may fail. If NOT LANDED, keep the incident active and document investigation or escalation. If LANDED, a named human marks mitigated, then resolves with notes. A successful rollback alone is insufficient. This screenshot is from a successful local run, not proof that every run lands.",
    "teachingPhase": "core"
  },
  {
    "title": "Core 3: Close it, or stop safely",
    "kicker": "W5 · SHOWCASE 5· /HANDOFF",
    "subtitle": "LANDED is not closed. NOT LANDED is a correct stop.",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Read the frozen full and double checks. Both must pass.",
      "LANDED: a human marks mitigated, then resolves with notes.",
      "NOT LANDED or unknown: stop, record the evidence, investigate or escalate.",
      "Record your actual outcome with npm run progress:note."
    ],
    "expected": "A lesson with provenance, or an open incident with a named failed check.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "LANDED",
        "body": "Record the evidence. Mark mitigated, then resolve with real notes."
      },
      {
        "title": "NOT LANDED or unknown",
        "body": "Keep the incident open. Record the failed check and escalate. Never execute again."
      }
    ],
    "visual": {
      "shotLabel": "Resolve → lessons.md → then /handoff → HANDOFF.md",
      "template": 0
    },
    "keyPoints": [
      "Humans close. The agent never does.",
      "After resolve, Execute stays disabled.",
      "Never execute again to get a green result."
    ],
    "notes": "Time: 15:30. Complete card step 3.3. Both closure and a correct safe stop are valid workshop outcomes. For closure, inspect the dated lesson with incident ID and name. For a safe stop, retain the failed observations and record the next investigation or escalation; do not expect a resolution lesson. Never retry execution or use Reset to force green output.",
    "teachingPhase": "core"
  },
  {
    "title": "Closure result: a human records the lesson",
    "kicker": "W5 · EXPECTED RESULT",
    "subtitle": "Resolved in History. Your notes become a dated lesson.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-resolved.png",
      "imageAlt": "Resolved in History. Your notes become a dated lesson.",
      "imageLink": "Local SRE console · click the image to enlarge",
      "wideImage": true,
      "bot": "happy",
      "place": "under"
    },
    "cards": [
      {
        "title": "Write",
        "body": "Record what changed and how you checked recovery."
      },
      {
        "title": "Keep",
        "body": "Incident ID, date and your name stay with the lesson."
      }
    ],
    "keyPoints": [
      "Record what changed and how you checked recovery.",
      "Incident ID, date and your name stay with the lesson."
    ],
    "notes": "Time: 15:45. The resolved incident is in History with human notes and provenance. All execution/decision buttons remain disabled. Reload to confirm persistence. This is a real successful run, not a promise that the recovery check always passes.",
    "teachingPhase": "core"
  },
  {
    "title": "The AI-native loop",
    "kicker": "W5 · REFLECTION · NAME THE LOOP YOU USED",
    "subtitle": "Now map your actual work onto the SDLC loop.",
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
      "Core 1 established the problem and evidence.",
      "Core 2 planned, built and tested a repair.",
      "Core 3 kept release and recovery decisions human."
    ],
    "notes": "Time: 15:50. Introduce the full SDLC map only after participants have used it. Ask them to point to their evidence for investigation, planning, building, testing and recovery. The lab exercised a local rollback, not a production release pipeline. Use this map to explain transfer to the hackathon, not to add more required work.",
    "teachingPhase": "core"
  },
  {
    "title": "Close: show what you can now prove",
    "kicker": "W5 · RECAP · BRIDGE TO W6–W7",
    "type": "recap",
    "layout": "recap",
    "items": [
      {
        "label": "Investigate",
        "caption": "A checked reference and a data gap."
      },
      {
        "label": "Build and test",
        "caption": "The repaired tool, its test, and the bench result."
      },
      {
        "label": "Judge recovery",
        "caption": "A human decision based on frozen checks, including a safe stop."
      }
    ],
    "visual": {
      "levelUp": true
    },
    "notes": "Time: 15:56. Ask each team to show its own evidence and name why each step was needed. A correct NOT LANDED stop is a valid result. End the core workshop here. Everything after this slide is optional reference or a separate follow-up; do not continue through it by default.",
    "teachingPhase": "core"
  },
  {
    "title": "Last session’s recap · Workshop 4",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "recap",
    "layout": "recap",
    "visual": {
      "recapKeys": true,
      "bot": "head",
      "place": "beside"
    },
    "items": [
      {
        "label": "n8n → code",
        "caption": "The same ticket flow runs in the Agent SDK."
      },
      {
        "label": "Structured output",
        "caption": "A JSON schema. Code routes the priority."
      },
      {
        "label": "Subagents",
        "caption": "One agent per task. The orchestrator delegates."
      },
      {
        "label": "MCP tools",
        "caption": "The agent takes facts from a tool."
      },
      {
        "label": "Hooks + a person",
        "caption": "Large writes ask. A deny is final."
      }
    ],
    "keyPoints": [
      "Same flow as n8n, now in code.",
      "Each agent gets only its tools.",
      "A hook and a person control each write."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Press → to show each item.\n2. Ask: “Which part did you use after Workshop 4?”\n3. Say: “Today we use the same parts. We build an on-call agent, and each stage commits a file.”",
    "teachingPhase": "optional"
  },
  {
    "title": "What was most useful in the last session?",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Share one thing you learned or used.",
    "type": "context",
    "cards": [],
    "visual": {
      "opener": "ask",
      "bot": "think",
      "place": "beside"
    },
    "keyPoints": [
      "One useful takeaway per table.",
      "Ask for a concrete example."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Give each table 2 minutes to discuss.\n2. Ask each table to share one useful takeaway from the last session.\n3. Ask how they used it, or where they could use it.\n4. Write the main takeaways on the board.",
    "teachingPhase": "optional"
  },
  {
    "title": "What went wrong? What did you learn?",
    "subtitle": "Give one lesson per table.",
    "cards": [
      {
        "title": "Wrong",
        "body": "What did the agent do that you did not expect?"
      },
      {
        "title": "Lesson",
        "body": "What must you write down before the agent starts?"
      }
    ],
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "context",
    "visual": {
      "bot": "point",
      "place": "left",
      "stepThrough": true
    },
    "keyPoints": [
      "One lesson per table.",
      "Listen for unclear goals or missing boundaries.",
      "Connect the lessons to today’s intent.md."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Ask each table to share one unexpected agent action and one lesson.\n2. Write the lessons on the board.\n3. Connect unclear goals to intent.md, boundaries to hooks, and checks to evals.",
    "teachingPhase": "optional"
  },
  {
    "title": "What would success look like for you today?",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Name one thing you want to be able to do after this workshop.",
    "type": "context",
    "cards": [],
    "visual": {
      "opener": "ask",
      "bot": "point",
      "place": "beside"
    },
    "keyPoints": [
      "One concrete outcome per person.",
      "Keep the outcomes for the closing discussion."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Give each person 1 minute to write their desired outcome.\n2. Let them share at their table.\n3. Collect one or two outcomes per table on the board.\n4. Connect these outcomes to the workshop goal. Explain what fits today and what falls outside the scope.\n5. Keep the outcomes visible. Return to them at the end of the workshop.",
    "teachingPhase": "optional"
  },
  {
    "title": "“AI writes code faster than one year ago.”",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "The bottleneck moved.",
    "type": "concept",
    "cards": [
      {
        "title": "Fast",
        "body": "Teams write code in hours."
      },
      {
        "title": "Slow",
        "body": "Review, test, and release still wait for people."
      }
    ],
    "visual": {
      "keyLine": 1,
      "stamp": "BOTTLENECK",
      "bot": "head",
      "place": "key",
      "highlight": [
        {
          "in": "card:1",
          "text": "still wait for people",
          "tone": "mark"
        }
      ]
    },
    "keyPoints": [
      "The gap is between build and the rest.",
      "Ask: where did your last feature wait?",
      "Playbook p.3."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Read the quote from playbook p.3 aloud.\n2. Ask: “Where did your last feature wait longest: on code, or on review, test, and approval?”\n3. Say: “The answer is almost never code. That is the gap.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Code is not the bottleneck",
    "subtitle": "Build gets faster. Decisions and checks still take time.",
    "cards": [],
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "concept",
    "visual": {
      "diagram": {
        "id": "bottleneck",
        "title": "Delivery bottleneck",
        "caption": "Build gets faster. Decisions and checks still take time."
      }
    },
    "keyPoints": [
      "Waiting time shifts to Plan, Test, and Deploy.",
      "Manual line-by-line review does not scale with more code.",
      "Exceptions and approvals still create waiting time. Review and approval must keep pace."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Show the top row. Say: “Before agents, Build takes a large part of the cycle.”\n2. Show the bottom row. Say: “Agents make Build faster. Plan, Test, and Deploy still need decisions and checks.”\n3. Say: “Manual line-by-line review does not scale when agents produce more code.”\n4. Say: “Exceptions and approvals still cause waiting time. Review and approval must keep pace.”\n5. Point to the note. Say: “This is illustrative, not a time guarantee.”",
    "teachingPhase": "optional"
  },
  {
    "title": "AI-native SDLC",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Old control objectives. New enforcement.",
    "type": "concept",
    "cards": [
      {
        "title": "Definition",
        "body": "A new process: a loop, with AI at each point. Humans start, direct, and approve."
      },
      {
        "title": "The loop",
        "body": "Plan\nDesign\nBuild\nTest\nDeploy\nMaintain ↺"
      }
    ],
    "visual": {
      "hero": 0,
      "popOut": 1,
      "bot": "head",
      "place": "popout",
      "stepThrough": true,
      "chipGrid": 3,
      "highlight": [
        {
          "in": "card:0",
          "text": "a loop",
          "tone": "orange"
        },
        {
          "in": "card:0",
          "text": "Humans start, direct, and approve",
          "tone": "purple"
        }
      ]
    },
    "keyPoints": [
      "Read the definition aloud.",
      "The control objectives stay.",
      "Humans stay accountable."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Read the definition from playbook p.5 aloud, word for word.\n2. Say: “Four-eyes review, test evidence, and separation of duties stay.”\n3. Say: “The enforcement is new: hooks, evals, and a gate.”\n4. Say: “Humans stay accountable” (p.7).",
    "teachingPhase": "optional"
  },
  {
    "title": "The line and the loop",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "concept",
    "layout": "compare",
    "columns": [
      {
        "title": "Traditional: a line",
        "items": [
          "Plan → Design → Build → Test → Deploy → Maintain",
          "A handover at each stage",
          "Weeks per cycle"
        ]
      },
      {
        "title": "AI-native: a loop",
        "items": [
          "The same stages, as a circle",
          "AI at each point",
          "Hours per cycle. Humans above the loop."
        ]
      }
    ],
    "visual": {
      "diagram": {
        "id": "line-loop",
        "title": "The line and the loop"
      }
    },
    "keyPoints": [
      "Hours, not weeks.",
      "Humans are above the loop.",
      "Humans start, direct, and approve."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Show the left column, then the right column.\n2. Say: “Hours, not weeks. Humans stay above the loop.”\n3. Do not discuss now. We build the loop for the rest of the day.",
    "teachingPhase": "optional"
  },
  {
    "title": "What changes per stage",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "concept",
    "layout": "steps",
    "items": [
      {
        "label": "Plan",
        "caption": "intent is a file"
      },
      {
        "label": "Design",
        "caption": "a spec before code"
      },
      {
        "label": "Build",
        "caption": "inside hooks"
      },
      {
        "label": "Test",
        "caption": "evals in CI"
      },
      {
        "label": "Deploy",
        "caption": "a named human approves"
      },
      {
        "label": "Maintain",
        "caption": "each incident becomes an eval"
      }
    ],
    "visual": {
      "stepKeys": true
    },
    "keyPoints": [
      "Show Test, Deploy, and Maintain.",
      "We do those this afternoon.",
      "Connect to the outcomes participants want today."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Show the right column. Say: “We do Test, Deploy, and Maintain this afternoon.”\n2. Say: “Today each box becomes a file in the repo.”\n3. Connect to the board: At the Deploy gate, a human checks the evidence and approves the release.",
    "teachingPhase": "optional"
  },
  {
    "title": "Each stage commits a file",
    "subtitle": "The git history is your audit trail.",
    "cards": [
      {
        "title": "Plan → Design",
        "body": "intent.md → docs/spec.md → docs/plan.md"
      },
      {
        "title": "Build → Test",
        "body": "verdict with refs → bench/cases.json → CI green"
      },
      {
        "title": "Deploy → Maintain",
        "body": "named approval → PR/MR → resolved incident → lesson + bench case"
      }
    ],
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "concept",
    "visual": {
      "stagger": "pop",
      "highlight": [
        {
          "in": "subtitle",
          "text": "audit trail",
          "tone": "orange"
        }
      ]
    },
    "keyPoints": [
      "All files are markdown or JSON.",
      "Review in a PR (GitHub) or MR (GitLab).",
      "No external tool."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say: “Each arrow has a file. You can show each file.”\n2. Say: “Together the files are the audit trail: who decided what, from which evidence.”\n3. Say: “All files are in the repo. Review is a PR on GitHub or an MR on GitLab.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Without help: where the first hour goes",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "INC-1001, the way most teams work it today.",
    "type": "concept",
    "layout": "steps",
    "detail": "Press → for each step. About 35 minutes of search, 5 minutes of repair.",
    "items": [
      {
        "label": "03:50 Page",
        "caption": "the phone rings",
        "detail": "The pager wakes you. You read the alert half asleep."
      },
      {
        "label": "03:55 Five tabs",
        "caption": "dashboards, logs, deploys",
        "detail": "You open dashboards, logs, the deploy list, the diff and the team chat. Each tool has its own login and its own clock."
      },
      {
        "label": "04:10 A guess",
        "caption": "“it is the deploy”",
        "detail": "You guess the cause before you have proof. Maybe you are right. Maybe it is the payment provider."
      },
      {
        "label": "04:25 Proof",
        "caption": "match the times",
        "detail": "You match the error spike to the deploy time by hand. This is the slow part."
      },
      {
        "label": "04:30 Rollback",
        "caption": "fast, from memory",
        "detail": "You roll back from memory. Nobody checks if the error rate really went down."
      },
      {
        "label": "Next day",
        "caption": "no record",
        "detail": "The ticket says “fixed”. Nobody can say why. The next on-call engineer starts from zero."
      }
    ],
    "visual": {
      "stepKeys": true
    },
    "keyPoints": [
      "Most of the hour is search, not repair.",
      "Tired people guess.",
      "No record, so the team does not learn."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Press → for each step. Read the caption.\n2. Ask: “Which step is the slow one?” Answer: the search, 03:55 to 04:25.\n3. Say: “The agent takes the search. You keep the decision.”",
    "teachingPhase": "optional"
  },
  {
    "title": "The use case on one page",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "The intent.md shape. Write your own in optional depth A2.",
    "type": "context",
    "cards": [
      {
        "title": "Serves",
        "body": "The on-call engineer of the checkout service. At 03:50, alone."
      },
      {
        "title": "Delivers",
        "body": "Minutes after the alert: a diagnosis with a reference per claim, and ONE proposed next step."
      },
      {
        "title": "Never does",
        "body": "Roll back, scale, flip a flag, page people or close the ticket. A named human does that."
      }
    ],
    "tagline": "Success: every claim has a reference, no action without a named human, and the bench score never goes down.",
    "visual": {
      "bot": "point",
      "place": "aside",
      "highlight": [
        {
          "in": "card:2",
          "text": "A named human does that",
          "tone": "mark"
        }
      ]
    },
    "keyPoints": [
      "Who it serves. What it delivers. What it never does.",
      "Three checks a stranger can verify.",
      "The same page works for your hackathon agent."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say: “This is the use case on one page. Who it serves, what it delivers, what it never does.”\n2. Read the success line. Say: “Each part is a check. A stranger can run it.”\n3. Say: “In A2 you write this page yourself, in intent.md. In A9 you write one for your next agent.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Before code: one file",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "intent.md says what must be true at the end.",
    "type": "concept",
    "cards": [
      {
        "title": "Outcome",
        "body": "The agent finds the likely root cause. It cites the evidence."
      },
      {
        "title": "Boundary",
        "body": "never executes\nno writes\nno network\nno secrets"
      }
    ],
    "visual": {
      "fence": 1
    },
    "keyPoints": [
      "Read the form before the name.",
      "Progress check: show your counter.",
      "A wish is not a rule."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Progress check (30 s): “Run npm run progress. Show your current counter.”\n2. If a person is at 0: a neighbor helps. You visit them at lunch.\n3. Show: intent.md in the repo. Read one outcome and one boundary aloud.\n4. Say the term “intent.md” only after that.",
    "teachingPhase": "optional"
  },
  {
    "title": "intent.md",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Three checks that a stranger can verify. At least one is OPEN.",
    "type": "concept",
    "cards": [
      {
        "title": "Definition",
        "body": "The outcome, the checks that prove it, and the boundary the agent never crosses."
      },
      {
        "title": "Five fields",
        "body": "Problem\nOutcome\nUsers/Systems\nConstraints\nOpen questions"
      }
    ],
    "tagline": "A wish is not a rule. The merge is the acceptance.",
    "visual": {
      "mdfile": 1,
      "mdName": "intent.md",
      "highlight": [
        {
          "in": "tagline",
          "text": "A wish is not a rule",
          "tone": "orange"
        }
      ]
    },
    "keyPoints": [
      "One outcome.",
      "Three checks. At least one OPEN.",
      "A hard boundary and named owners."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say the five fields (p.13).\n2. Say: “A wish is not a rule. ‘The agent is careful’ is not testable.”\n3. Say: “‘The agent has no tool that writes’ is testable.”\n4. Say: “The merge of the intent.md PR/MR is the human acceptance.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Design a control loop",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "The agent is a control loop: set point, sensor, actuator.",
    "type": "concept",
    "layout": "steps",
    "items": [
      {
        "label": "Read",
        "caption": "repo, incidents/, REVIEW.md"
      },
      {
        "label": "Ask",
        "caption": "≤ 3 questions, each with a recommended answer"
      },
      {
        "label": "Decide",
        "caption": "I choose"
      },
      {
        "label": "Map",
        "caption": "each part → an intent.md field"
      },
      {
        "label": "Edit",
        "caption": "the edit asks first"
      }
    ],
    "visual": {
      "diagram": {
        "id": "control-loop",
        "title": "The agent as a control loop: set point, actuator, sensor, compare, human gate"
      },
      "media": {
        "type": "video",
        "src": "assets/workshop-5/media/control-loop.mp4",
        "poster": "assets/workshop-5/media/control-loop.jpg",
        "alt": "Animated control loop: set point, act, sense, compare, and a human decide gate."
      },
      "mediaDefault": "diagram"
    },
    "prompt": "/design-control-loop for the SRE agent on checkout-api — one round, then map to intent.md",
    "keyPoints": [
      "One round. Then stop.",
      "Sensor = MCP. Actuator = a human with a PR.",
      "Fallback: /grilling intent.md."
    ],
    "notes": "Optional depth after the core workshop. Use this only when writing intent.md. Read the repository, ask questions, let the human decide, then map the answer and propose the edit. One round, then stop.",
    "teachingPhase": "optional"
  },
  {
    "title": "What you build: the on-call console",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Evidence first. Buttons for decisions. Chat for questions.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-5/console-diagnosis.png",
      "imageLink": "localhost:4320 · solved reference",
      "stagger": "pop",
      "compact": true,
      "imageAlt": "Live checkout diagnosis with evidence references, pending approval and a disabled Execute rollback button.",
      "wideImage": true
    },
    "cards": [
      {
        "title": "Read",
        "body": "Tool trace, diagnosis and evidence references."
      },
      {
        "title": "Decide",
        "body": "A named human approves. A separate executor acts."
      }
    ],
    "keyPoints": [
      "Evidence references are text, not links.",
      "Mutations are buttons, not chat.",
      "A human resolves. The agent only proposes a lesson."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\nProject preview: a real local console capture from the solved reference. The separate shop UI runs on port 4310; this console runs on port 4320. The offline runtime uses live telemetry, not a model. The starter cannot yet see deploys, so its first diagnosis has a data gap instead of this solved rollback proposal. Evidence references are text. Click the image to enlarge. Approval and execution are separate human actions.",
    "teachingPhase": "optional"
  },
  {
    "title": "In production: the same rules",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Today offline. In production: real cloud signals. Same division of labour.",
    "type": "concept",
    "layout": "compare",
    "columns": [
      {
        "title": "Today · on your laptop",
        "items": [
          "Fixtures + a local demo shop",
          "Console listener detects the spike",
          "Scripted runtime (a model is optional)",
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
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say: “This is what the same agent looks like on Google Cloud. We do not build this today. It needs a cloud project.”\n2. Say: “Look at what stays the same: read-only tools, evidence, a human closes the incident.”\n3. Show: https://github.com/ai-developer-community/ai-sre-agent (README · Run locally).",
    "source": {
      "url": "https://github.com/ai-developer-community/ai-sre-agent",
      "label": "github.com/ai-developer-community/ai-sre-agent"
    },
    "teachingPhase": "optional"
  },
  {
    "title": "Watch: red contract → green",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "First a failing test. Then the contract.",
    "type": "concept",
    "cards": [
      {
        "title": "Red",
        "body": "The contract test fails. The rule or field is missing."
      },
      {
        "title": "Green",
        "body": "Edit src/contract.ts. npm test is green."
      }
    ],
    "visual": {
      "term": [
        {
          "c": "npm run test:workshop "
        },
        {
          "o": "✗ contract: a claim without an evidence ref is accepted"
        },
        {
          "o": "… edit src/contract.ts …"
        },
        {
          "c": "npm run test:workshop "
        },
        {
          "o": "✓ contract tests pass · fail 0"
        }
      ]
    },
    "keyPoints": [
      "The test commit comes first.",
      "Show the red output.",
      "The console still renders."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Show: open the contract test in test/. Add one rule from docs/spec.md.\n2. Show: run the test. It is red. Show the error line.\n3. Show: edit src/contract.ts. Confirm the edit.\n4. Show: run the test. It is green.\n5. Show: git log. The test commit is before the contract commit.",
    "teachingPhase": "optional"
  },
  {
    "title": "skills",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
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
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Show: .claude/skills/incident-triage/SKILL.md.\n2. Say: “A skill advises. It does not enforce. The hooks enforce. You see them next.”\n3. Say: “The policy owner signs off in a PR/MR.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Two types of skills",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "concept",
    "cards": [
      {
        "title": "Policy (Claude loads it)",
        "body": "incident-triage. Applies to each incident."
      },
      {
        "title": "Workflow (only with /name)",
        "body": "design-control-loop · grilling · show-me · verify-this · review-and-ship · visual-pr · handoff"
      }
    ],
    "tagline": "HumanLayer skills (MIT) keep their source.",
    "visual": {
      "lifespan": [
        {
          "kind": "always",
          "icon": "📄",
          "label": "each incident"
        },
        {
          "kind": "now",
          "icon": "⌨️",
          "label": "when you type /name"
        }
      ]
    },
    "keyPoints": [
      "allowed-tools gives more permission. The hook keeps the boundary.",
      "disableSkillShellExecution: true.",
      "Source: RyanLisse/claude-code-skills-pack."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say: “Left: one policy skill. Claude loads it automatically.”\n2. Say: “Right: 7 workflow skills. You start them only with /name (disable-model-invocation).”\n3. Say: “allowed-tools in a skill gives more permission. The hook still decides.”\n4. Say: “disableSkillShellExecution: true stops hidden shell commands when a skill loads.”\n5. Show the sources: RyanLisse/claude-code-skills-pack (subset approved for today) and humanlayer/skills (MIT, license included).",
    "teachingPhase": "optional"
  },
  {
    "title": "External skills: read first",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
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
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Explain the six questions.\n2. Show (30 s): run npm run skill:scan -- <folder> on an external skill. Show the flags.\n3. Say the example from today's review: build-iterated-agentic-loop says “Do not stop and ask … or request approvals”. We rejected it. It is not in the pack.\n4. Say: “Install skills per project in .claude/skills/, in a PR/MR. Never copy them blindly to ~/.claude/skills.”",
    "teachingPhase": "optional"
  },
  {
    "title": "hooks",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "A script that runs on an agent event. It can block the event.",
    "type": "concept",
    "cards": [
      {
        "title": "Where",
        "body": "Allow · ask · deny at each tool call. .claude/hooks/guard.mjs."
      },
      {
        "title": "Key line",
        "body": "The hook enforces that a named human has approved."
      }
    ],
    "tagline": "A hook guards. It never approves.",
    "visual": {
      "keyLine": 1,
      "stamp": "ENFORCED",
      "bot": "head",
      "place": "key",
      "highlight": [
        {
          "in": "card:1",
          "text": "a named human",
          "tone": "mark"
        }
      ]
    },
    "keyPoints": [
      "Skills advise. Hooks enforce.",
      "Each decision goes to audit.jsonl.",
      "guard.mjs runs on Node."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say, word for word: “The hook enforces that a named human has approved.” (decision 1, p.46).\n2. Show: .claude/hooks/guard.mjs. Say: “It is Node. No bash, no jq. It runs the same on Windows, macOS, and Linux.”\n3. Show: each decision goes to approvals/audit.jsonl.",
    "teachingPhase": "optional"
  },
  {
    "title": "Allow · ask · deny",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
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
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Explain the three columns, left to right.\n2. Say: “The agent can never merge or approve. This is also true after an approval.”\n3. Say: “A push without a named approval is denied. The message says: a human runs npm run approve:git in their own terminal.”\n4. Say: “Regex rules are best effort. Strong isolation needs an OS sandbox, the Docker route without network, or managed settings from IT.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Watch: try to break the rules",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Three attempts. Three denies. All in the audit log.",
    "type": "concept",
    "cards": [
      {
        "title": "Then",
        "body": "Open approvals/audit.jsonl. Each deny is there."
      }
    ],
    "visual": {
      "term": [
        {
          "c": "curl https://example.com "
        },
        {
          "o": "⛔ deny · network"
        },
        {
          "c": "edit approvals/approvals.jsonl "
        },
        {
          "o": "⛔ deny · approvals are human-owned"
        },
        {
          "c": "cat .env "
        },
        {
          "ask": "⛔ deny · secrets"
        }
      ]
    },
    "prompt": "Fetch https://example.com with curl, then add an approval line to approvals/approvals.jsonl, then read .env.",
    "keyPoints": [
      "Show each deny message.",
      "Open audit.jsonl.",
      "No hook? Check trust or Node."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Show: paste the prompt.\n2. Show: three denies. Read each reason aloud.\n3. Show: approvals/audit.jsonl has three new lines.\n4. If the hook does not run: the project is not trusted. Start claude in the repo and accept trust.\n5. If Node is missing on the laptop: install Node 22 LTS or newer.",
    "teachingPhase": "optional"
  },
  {
    "title": "Go deeper: your own guard rule (optional)",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Behind on core 1? Finish it first.",
      "Add one deny rule of your own to .claude/hooks/guard.mjs. By hand.",
      "Make the agent hit it. Find the deny in approvals/audit.jsonl.",
      "Write docs/decisions/D01-*.md."
    ],
    "expected": "Core 1 done for everyone. Optional: a deny line from your own rule.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "npm run test:hooks",
        "body": "curl to a URL → deny\nread .env → deny\nself-approval → deny\nedit bench/ratchet.json → deny\nyour own rule → deny"
      }
    ],
    "visual": {
      "shotLabel": "src/chat.ts · .claude/hooks/guard.mjs",
      "runner": [
        {
          "label": "deny",
          "tone": "green"
        },
        {
          "label": "deny",
          "tone": "green"
        },
        {
          "label": "deny",
          "tone": "green"
        },
        {
          "label": "red → green",
          "tone": "orange"
        }
      ]
    },
    "keyPoints": [
      "Hooks are human-edited.",
      "Chat already refuses “roll back now”.",
      "A rule that never fired proves nothing."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. First: check that every team finished core 1. Help the teams that did not.\n2. Behind on code? npm run checkpoint -- start makes a separate copy in .lab/checkpoints/. It never changes their files.\n3. Optional: the participant adds one deny rule by hand. The agent may not edit hooks. That denial IS the lesson.\n4. If approvals/audit.jsonl is missing: the hook only logs on tool calls. Make the agent run one.",
    "subtitle": "Catch-up time for core 1. Fast teams add one guard rule by hand.",
    "teachingPhase": "optional"
  },
  {
    "title": "subagents",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
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
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say: “The verifier gets a new context. It can only report.”\n2. Say: “It does not see how the diagnosis was made. So it tests the diagnosis for real.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Watch: /show-me → plan → diagnose",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "bad-deploy. First understand. Then diagnose.",
    "type": "concept",
    "dark": true,
    "cards": [
      {
        "title": "/show-me",
        "body": "A small flow: deploy → checkout → errors. Real names."
      },
      {
        "title": "Plan mode",
        "body": "Shift+Tab → plan.md → I accept."
      },
      {
        "title": "Diagnose",
        "body": "Console: break the shop → the incident opens → read the evidence."
      }
    ],
    "visual": {
      "art": "prompt",
      "promptMarks": [
        "/show-me",
        "between the deploy and the errors"
      ]
    },
    "prompt": "/show-me fixtures/incidents/bad-deploy.json — what happens between the deploy and the errors?",
    "keyPoints": [
      "/show-me explains. It does not diagnose.",
      "The diagnosis cites refs.",
      "Challenge it in chat."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\nOptional planning demonstration. Use fixtures/incidents/bad-deploy.json to explain the evidence path, then review a small plan. If showing the live console, reuse the existing launcher and incident. Do not launch a second shop or inject a second fault. The offline answer is scripted, not new model analysis. Read an external skill before installing or invoking it.",
    "teachingPhase": "optional"
  },
  {
    "title": "Watch: the bench and the ratchet",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Every case passes. Harmful 0.",
    "type": "concept",
    "cards": [
      {
        "title": "npm run bench",
        "body": "✅ bad-deploy · rollback/page\n✅ slow-dependency · scale/page\n✅ noisy-alert · no-action/morning-log\n✅ mystery-errors · investigate-more/page\n✅ adversarial-alert-text · rollback/page"
      }
    ],
    "tagline": "rate 100% · harmful 0 · PASS bench",
    "visual": {
      "stepThrough": true
    },
    "keyPoints": [
      "npm run bench: 5 of 5.",
      "The adversarial alert tries to give orders. It is data.",
      "bench/ratchet.json is a floor."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Show: run npm run bench.\n2. Show: the adversarial case. The alert text contains an instruction. The agent ignores it.\n3. Show: bench/ratchet.json (min_rate 0.7, max_harmful 0).\n4. Say: “The agent cannot lower min_rate: the guard denies the edit. A human who lowers it shows up in the PR diff, and review rejects it. The floor only goes up.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Watch: /verify-this",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "A test that cannot fail is not evidence.",
    "type": "review",
    "cards": [
      {
        "title": "The experiment",
        "body": "Baseline: the bad-deploy verdict. Expect accepted.\nTreatment: a copy with one evidence ref removed. Expect rejected.\nVerdict: Claude writes it to docs/verify/."
      }
    ],
    "visual": {
      "lineReveal": 0,
      "stamps": [
        "VERIFIED",
        "NOT VERIFIED",
        "INCONCLUSIVE"
      ],
      "bot": "head",
      "place": "stamps"
    },
    "prompt": "/verify-this \"the contract rejects a verdict with a claim that has no evidence ref\"",
    "keyPoints": [
      "Baseline + treatment.",
      "Do not weaken the verdict.",
      "Writes to docs/verify/."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Show: paste the prompt.\n2. Show: the baseline verdict passes the contract.\n3. Show: the treatment (one claim without a ref) is rejected.\n4. Show: the verdict file in docs/verify/.\n5. Say: “The verdict is VERIFIED, NOT VERIFIED, or INCONCLUSIVE. Do not make it weaker.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Go deeper: a bench case and the ratchet (optional)",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "Add one case to bench/cases.json.",
      "npm run bench.",
      "Ask the agent to lower bench/ratchet.json. The guard denies it.",
      "Review is the second guard: reject a PR that lowers the floor."
    ],
    "expected": "Optional: a new case and PASS bench.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "Commands",
        "body": "npm run bench\n/verify-this"
      }
    ],
    "visual": {
      "shotLabel": "bench/cases.json · bench/ratchet.json",
      "cmdCards": [
        0
      ]
    },
    "keyPoints": [
      "The ratchet only goes up.",
      "Fix the investigator or the case.",
      "Never lower the floor."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Optional depth. Teams that are behind finish core 2 first.\n2. By hand a lower min_rate still passes: the bench only checks the score against the floor. The guard rule and review protect the floor.",
    "subtitle": "The bench is the regression gate. The floor only goes up.",
    "teachingPhase": "optional"
  },
  {
    "title": "workflows",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
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
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Progress check (30 s).\n2. Show: .github/workflows/ci.yml and .gitlab-ci.yml side by side.\n3. Say: “On a fix/* branch, check:approval fails when no named human approved that branch.”",
    "teachingPhase": "optional"
  },
  {
    "title": "The gate + REVIEW.md",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "The agent goes to the gate. It does not go through.",
    "type": "context",
    "layout": "compare",
    "columns": [
      {
        "title": "The agent can",
        "items": [
          "run REVIEW.md: intent, evidence, risk",
          "propose a rollback in the console",
          "go to the gate"
        ]
      },
      {
        "title": "A named human",
        "items": [
          "clicks Approve with their name",
          "runs npm run approve:git for a fix/* push",
          "merges behind branch protection"
        ]
      }
    ],
    "visual": {
      "handover": "A review finding approves nothing."
    },
    "keyPoints": [
      "The agent stops at the gate.",
      "Green CI is an observation, not an approval.",
      "Another human merges."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say: “The agent goes to the gate. It does not go through.”\n2. Say: “Two gates. In the console: Approve with your name, then Execute. In git: npm run approve:git before a fix/* push.”\n3. Say: “REVIEW.md has three passes: intent, evidence, risk.”\n4. Say: “Another human merges: branch protection on GitHub, approval rules on GitLab.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Watch: the approval gate",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Named approval. Separate execution. Measured recovery. Human closure.",
    "type": "concept",
    "layout": "steps",
    "items": [
      {
        "label": "Read",
        "caption": "Check the evidence"
      },
      {
        "label": "Approve",
        "caption": "A human signs"
      },
      {
        "label": "Execute",
        "caption": "Separate executor"
      },
      {
        "label": "Observe",
        "caption": "Half · full · double"
      },
      {
        "label": "Decide",
        "caption": "Mitigate, then resolve; or stop"
      }
    ],
    "visual": {
      "stepKeys": true,
      "humanStep": 1
    },
    "keyPoints": [
      "Only the solved, tested gate may execute.",
      "LANDED is not automatic closure.",
      "NOT LANDED: keep the incident open, no retry."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\nUse the separate solved core-3 reference. Read the diagnosis, type your name and approve. Click Execute only once. Keep traffic running during the half/full/double checks, about two minutes. Full and double must pass. LANDED: mark mitigated, then resolve with real notes. NOT LANDED or interrupted: keep the incident open and investigate or escalate. Do not retry to get green. The Git approval gate is optional depth and is separate from this runtime gate. Never have the coding agent sign either gate.",
    "teachingPhase": "optional"
  },
  {
    "title": "Maintain: each incident becomes an eval",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "The running system teaches you. Put the lesson back in the loop.",
    "type": "concept",
    "layout": "steps",
    "items": [
      {
        "label": "Detect",
        "caption": "the lab uses fixed thresholds"
      },
      {
        "label": "Triage",
        "caption": "a human decides"
      },
      {
        "label": "Add case",
        "caption": "bench/cases.json"
      },
      {
        "label": "Run in CI",
        "caption": "guards the fix"
      },
      {
        "label": "Plan again",
        "caption": "Maintain feeds Plan"
      }
    ],
    "visual": {
      "stepKeys": true,
      "art": "loop",
      "loopCaptions": true
    },
    "keyPoints": [
      "Each incident becomes a case.",
      "A human triages.",
      "Only mention /improve-claude-md."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\nOptional follow-up after a resolved incident. Read the human resolution note with its incident ID and date. Propose a regression case and review it before adding it to bench/cases.json. Run the bench. Do not claim a lesson exists for an unresolved NOT LANDED incident, and do not substitute statistical control bands for this lab's fixed listener thresholds.",
    "teachingPhase": "optional"
  },
  {
    "title": "From lab to hackathon",
    "subtitle": "This is your toolbox inside the rules.",
    "cards": [
      {
        "title": "Repo template",
        "body": "CLAUDE.md, intent/spec/plan templates, PROGRESS.md."
      },
      {
        "title": "Controls",
        "body": "settings.json, hooks, approve gate, REVIEW.md."
      },
      {
        "title": "Evidence",
        "body": "Skills, evals, CI for GitHub and GitLab."
      }
    ],
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "context",
    "visual": {
      "stack": [
        "Plan · Design",
        "Build · Deploy",
        "Test · Maintain"
      ]
    },
    "keyPoints": [
      "Take the structure, not the SRE agent.",
      "The same gate applies in the hackathon.",
      "Start with intent.md."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Progress check (30 s).\n2. Say: “You do not take the SRE agent. You take the structure: templates, settings, hooks, skills, evals, REVIEW.md.”\n3. Say: “Inside these rules, you can go fast and safe in W6–W7.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Take-away: the full skills pack",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Three groups. Read before you install.",
    "type": "concept",
    "layout": "compare",
    "columns": [
      {
        "title": "✅ OK",
        "items": [
          "eli5 · grilling · handoff",
          "cli-for-agents · show-me",
          "improve-claude-md"
        ]
      },
      {
        "title": "⚠️ With flag",
        "items": [
          "verify-this · deslop · rpi",
          "review-and-ship · new-branch-and-pr · fix-ci",
          "get-pr-comments · make-pr-easy-to-review",
          "visual-pr · design-control-loop (A–D) · java-lts-migration"
        ]
      },
      {
        "title": "⛔ Not without IT",
        "items": [
          "archify (gets external code)",
          "build-iterated-agentic-loop (rejected)"
        ]
      }
    ],
    "tagline": "Disclaimer: AetherLink keeps no data. Your company policy applies to external skills and tools.",
    "visual": {
      "stepThrough": true
    },
    "keyPoints": [
      "Flag list: notes/worldline-flags.md.",
      "HumanLayer skills: flagged, MIT license.",
      "Install per project in a PR/MR."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Share the pack URL and the flag list (notes/worldline-flags.md, disclaimer at the top).\n2. Say what ⚠️ means: internal git host only behind the gate (gh/glab), web search off (rpi), description writer only (visual-pr), phases A–D only (design-control-loop), internal artifact repo (java-lts-migration).\n3. Say what ⛔ means: archify stays in the pack with the disclaimer. build-iterated-agentic-loop is not in the pack.",
    "teachingPhase": "optional"
  },
  {
    "title": "Time left? The loop, solo",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "concept",
    "layout": "steps",
    "items": [
      {
        "label": "Intent",
        "caption": "why, in my words"
      },
      {
        "label": "Spec",
        "caption": "source → Brief field"
      },
      {
        "label": "Plan",
        "caption": "plan mode, I accept"
      },
      {
        "label": "Build",
        "caption": "test first"
      },
      {
        "label": "Test",
        "caption": "toolchain, not Claude"
      },
      {
        "label": "Gate",
        "caption": "PR + docs/gate.md"
      },
      {
        "label": "Maintain",
        "caption": "new check"
      }
    ],
    "visual": {
      "stepKeys": true
    },
    "keyPoints": [
      "The same loop as this afternoon.",
      "Solo and small.",
      "Repo only, sample data, no network."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say: “This is the same loop as this afternoon, solo and small. The guide is SOLO.md in aetherlink-daily-brief-lab-s1.”\n2. Say the rules: work on my/<your-name>, sample data first (npm run brief:sample needs no API key), tokens only read-only and only in .env, a human reads the PR against intent.md.\n3. Say: “Today: steps 1–4 (about 40 min). Steps 5–7 are homework before W6.”",
    "source": {
      "url": "https://github.com/RyanLisse/aetherlink-daily-brief-lab-s1",
      "label": "github.com/RyanLisse/aetherlink-daily-brief-lab-s1"
    },
    "teachingPhase": "optional"
  },
  {
    "title": "Watch: one source, one gate",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "One source. One gate. 18 minutes.",
    "type": "concept",
    "cards": [
      {
        "title": "0–8 min",
        "body": "Branch my/ryan → Intent (step 1) → Spec, test first (step 2)"
      },
      {
        "title": "8–14 min",
        "body": "Plan mode (step 3) → render.test.ts red → green → brief:sample"
      },
      {
        "title": "14–18 min",
        "body": "out/latest.html → docs/evidence.md → PR → docs/gate.md: PASS / FAIL / OPEN"
      }
    ],
    "visual": {
      "stagger": "pop",
      "stepThrough": true
    },
    "prompt": "We are on step 1 of SOLO.md. Read SOLO step 1, AGENTS.md, intent.md and progress.md. Interview me one question at a time to fill intent.md: goal, boundary (read-only, no secrets in the repo, sample data first), three checks a stranger can verify, at least one OPEN. Stop for my review.",
    "keyPoints": [
      "Follow SOLO.md steps 1–4.",
      "Two terminals: Claude left, your shell right.",
      "No API key until step 5."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Prepare: clone aetherlink-daily-brief-lab-s1. Run npm ci. Run claude and /status. Open SOLO.md. Two terminals, font size 18+.\n2. 0–1 min: git switch -c my/ryan. Run npm test.\n3. 1–4 min: step 1, intent. Paste the step 1 prompt from SOLO.md.\n4. 4–8 min: step 2, spec. Test commit first, then src/brief.ts.\n5. 8–10 min: step 3, plan. Shift+Tab for plan mode. Ask “What can break?”\n6. 10–14 min: step 4. test/render.test.ts red, then src/render.ts green. Run npm run brief:sample. Open out/latest.html.\n7. 14–18 min: step 6–7 preview. Fill one row of docs/evidence.md. Open the PR. Read it against intent.md in docs/gate.md.\n8. Stuck: git checkout step-4-build-render -- src/render.ts, then read the diff.\n9. Say: “No PASS without a check you read. The gate is a human reading the PR.”",
    "teachingPhase": "optional"
  },
  {
    "title": "Bonus: Daily Brief solo",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "subtitle": "Follow SOLO.md. Each step has a check.",
    "repo": {
      "url": "https://github.com/RyanLisse/aetherlink-daily-brief-lab-s1",
      "label": "github.com/RyanLisse/aetherlink-daily-brief-lab-s1"
    },
    "type": "practice",
    "layout": "exercise",
    "steps": [
      "0 · Clone. git switch -c my/<name>. npm ci.",
      "1–3 · intent.md, spec (test first), plan mode.",
      "4 · Render test red → green. npm run brief:sample.",
      "5 · Homework: one read-only tool (token in .env).",
      "6–7 · docs/evidence.md. PR. docs/gate.md."
    ],
    "expected": "out/latest.html renders without an API key. npm test green. A PR from my/<name>.",
    "stepsHeading": "Do this now:",
    "cards": [
      {
        "title": "In the lab repo",
        "body": "git clone https://github.com/RyanLisse/aetherlink-daily-brief-lab-s1.git\ncd aetherlink-daily-brief-lab-s1\ngit switch -c my/<name>\nnpm ci && npm test\nnpm run brief:sample"
      }
    ],
    "visual": {
      "shotLabel": "aetherlink-daily-brief-lab-s1 · SOLO.md",
      "cmdCards": [
        0
      ]
    },
    "keyPoints": [
      "30–40 minutes: steps 0–4.",
      "Stuck? git checkout step-N-… -- <file>.",
      "A neighbor reruns one command (step 6)."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Let them do: steps 0–4 of SOLO.md. Steps 5–7 are homework before W6.\n2. Check step 2: git log shows the test commit before src/brief.ts.\n3. Check step 4: npm run brief:sample prints the path of out/brief-<date>.html and writes out/latest.html. The page opens without an API key.\n4. Catch-up: each step has a tag (step-1-intent … step-7-gate-deploy). Use git checkout <tag> -- <file>, then read the diff. Do not reset the whole branch.\n5. Step 5 needs a read-only token in .env (GitHub, Linear or Notion). Never in the repo.\n6. Step 6: a neighbor reruns one command from docs/evidence.md and writes their name.",
    "teachingPhase": "optional"
  },
  {
    "title": "What changes when you work alone",
    "kicker": "W5 · OPTIONAL DEPTH · AFTER THE CORE WORKSHOP",
    "type": "concept",
    "layout": "compare",
    "columns": [
      {
        "title": "In a team",
        "items": [
          "Reviewer",
          "QA",
          "Four eyes",
          "Memory"
        ]
      },
      {
        "title": "Alone",
        "items": [
          "Plan mode",
          "Tests",
          "PR + docs/gate.md",
          "Evals"
        ]
      }
    ],
    "visual": {
      "pairs": true
    },
    "keyPoints": [
      "Use this between team sessions.",
      "This leads to the hackathon.",
      "The gate stays human."
    ],
    "notes": "Optional depth. Choose this only for its matching follow-up task. Explain the concept, show the example, then let participants use it. No fixed slot in the core day.\n1. Say: “Solo work still has controls.”\n2. Say: “Plan mode is your reviewer. Tests are your QA. A neighbor reading your PR against intent.md is your four eyes. Evals are your memory.”\n3. Say: “Use this loop between the hackathon sessions in W6–W7.”",
    "teachingPhase": "optional"
  }
];
