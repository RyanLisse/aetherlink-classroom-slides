/* Adapted from RyanLisse/aetherlink-academy-app @ b491cc0187b948a9717186fa9d2cb3f79dbc59ca.
 * Comparisons are separated and exercises align with the current workshop package. */
'use strict';
window.SLIDES = [
  {
    "lessonId": "workshop-4",
    "title": "Welcome to Workshop 4 · Support agents with the Claude Agent SDK",
    "kicker": "Workshop 4 · Thu 8 Oct",
    "type": "context",
    "visual": {
      "opener": "welcome",
      "bot": "wave",
      "place": "beside"
    },
    "subtitle": "Thu 8 Oct · 10:00–16:00 · yesterday you drew the ticket flow in n8n. Today you write it in code.",
    "keyPoints": [
      "On screen as people arrive",
      "Same tickets, same labels, same human gate as Day 3",
      "Today the flow lives in code you can test and version"
    ],
    "notes": "Have this on screen while people arrive. Once seated, keep it short: yesterday you built the support-triage flow node by node in n8n. Today we rebuild the same flow with the Claude Agent SDK, in code. Same priorities (low, medium, high), same three specialists, and a person still approves every reply."
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday’s recap · Workshop 3 · Agents in n8n",
    "kicker": "Recap · one ticket, three levels",
    "subtitle": "Answer from memory first. Then click to see the answer.",
    "type": "recap",
    "visual": {
      "reveal": "click",
      "answers": true,
      "bot": "peek",
      "place": "slot",
      "noReact": true
    },
    "cards": [
      {
        "title": "What did L1 do without an LLM?",
        "body": "A Switch routed each ticket to Low, Med or High on fixed rules."
      },
      {
        "title": "What did the AI Agent node add at L2?",
        "body": "Judgment and memory: it read what the customer meant and suggested a priority."
      },
      {
        "title": "Which three specialists did L3 add?",
        "body": "Customer Reply, Risk and Customer Context. Each owns one job."
      },
      {
        "title": "Description or System Message: which one picks the specialist?",
        "body": "The Description. The System Message guides the specialist once it is picked."
      },
      {
        "title": "Where did a person stay in charge?",
        "body": "Before any reply reached a customer: one human gate."
      }
    ],
    "keyPoints": [
      "Cold retrieval, no looking back",
      "One click per answer",
      "Let the room answer first",
      "Question 4 returns at Lesson 2"
    ],
    "notes": "Ask each question and let the room answer before you click. These are the Day 3 slides 20 (L1 Switch), 25 (L2 AI Agent), 32 (L3 specialists), 36 (Description chooses, System Message guides) and the human gate. Question 4 comes back at Lesson 2: the same split exists in a subagent file."
  },
  {
    "lessonId": "workshop-4",
    "title": "Today · agenda",
    "kicker": "Run of show · 10:00–16:00",
    "type": "context",
    "subtitle": "WL-1026 said “I was charged twice”. Today a coded agent finds that kind of ticket, with a person still deciding.",
    "visual": {
      "bot": "wave",
      "place": "left",
      "dayRoute": [
        "Welcome",
        "Recap",
        "n8n → code",
        "Setup",
        "Lesson 1 · one agent",
        "Lunch",
        "Lesson 2 · subagents",
        "Lesson 3 · MCP",
        "Check + Proof",
        "Build your own",
        "Reflect"
      ]
    },
    "cards": [
      {
        "title": "The problem",
        "body": "A flow on a canvas is hard to test, review and version. Code is not."
      },
      {
        "title": "Today's build",
        "body": "One agent, then an orchestrator with specialists, then read-only data through MCP. A person reviews every draft."
      }
    ],
    "keyPoints": [
      "Same ticket story as Day 3",
      "I show it, you do it",
      "Fell behind? Each step has a branch: step-1 to step-4",
      "Repo: github.com/RyanLisse/aetherlink-day5-n8n-to-agent"
    ],
    "notes": "Breaks are at 11:00 and 14:45; lunch is 12:00–13:00. Tell the story: yesterday WL-1026 (“I was charged twice”) was one ticket in a full inbox. Today’s duplicate-charge case is MSG-05: the same payment charged three times. The format: concept, demo, your turn. If you fall behind: git stash -u, git fetch origin, git switch step-N, npm ci (SOLO.md, top)."
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday in n8n",
    "kicker": "Anchor · Day 3 → today",
    "type": "concept",
    "subtitle": "Every node you placed yesterday has a place in code.",
    "visual": {
      "bot": "point",
      "place": "beside",
      "stagger": "pop"
    },
    "keyPoints": [
      "One row per click",
      "Same flow, other tool",
      "Each row returns in a lesson"
    ],
    "notes": "Click one row at a time. Rows 1–5 are Lesson 1, row 6 is Lesson 2, row 7 is Lesson 3. The package README has this table in full (section n8n → Agent SDK); point people there. Simple Memory also has a place: npm run chat resumes the session. You try it in Lesson 1.",
    "cards": [
      {
        "title": "Trigger and agent",
        "body": "Chat Message trigger becomes npm run lessonN or npm run chat.\nThe AI Agent node becomes query({ prompt, options }).\nThe System Message becomes CLAUDE.md."
      },
      {
        "title": "Limits and output",
        "body": "Max Iterations becomes maxTurns.\nThe Structured Output Parser becomes outputFormat with a JSON schema."
      },
      {
        "title": "Specialists and data",
        "body": "The Risk and Customer Reply tools become subagents in .claude/agents/.\nData Table · Get row(s) becomes the MCP tool get_customer."
      }
    ]
  },
  {
    "lessonId": "workshop-4",
    "title": "Agent SDK: the query loop",
    "kicker": "Lesson 1 · Concept",
    "type": "concept",
    "subtitle": "The AI Agent node becomes a loop in code: query() runs it until a result or maxTurns.",
    "visual": {
      "bot": "think",
      "place": "beside",
      "stagger": "pop"
    },
    "tagline": "Day 1 bridge: the same five steps as “Agent loop”. Day 3 showed them in the Executions log; today they print in your terminal.",
    "keyPoints": [
      "Same five steps as Day 1 and Day 3",
      "The runner prints every event",
      "maxTurns = n8n Max Iterations"
    ],
    "notes": "Walk the five steps with the arrow key. Point to lib/run.mjs: it prints [system:init], [assistant], [tool_use], [tool_result] and [result]. maxTurns is n8n’s Max Iterations. A lesson run is one fresh session per ticket. A chat resumes its sessionId, like Simple Memory.",
    "cards": [
      {
        "title": "Observe and decide",
        "body": "The prompt is the customer message. CLAUDE.md adds the rules. The model answers, or asks for a tool."
      },
      {
        "title": "Act and check",
        "body": "A tool runs and the trace prints [tool_use]. The result goes back to the model: [tool_result]."
      },
      {
        "title": "Repeat or stop",
        "body": "The loop stops at [result], or when maxTurns is reached."
      }
    ]
  },
  {
    "lessonId": "workshop-4",
    "title": "Agent SDK: project instructions",
    "kicker": "Lesson 1 · Concept",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "CLAUDE.md is yesterday’s System Message, now in a file beside the code.",
    "cards": [
      {
        "title": "Load",
        "body": "settingSources: ['project'] loads claude-project/CLAUDE.md."
      },
      {
        "title": "Four sections",
        "body": "Purpose, Rules, Priority definitions, Required output."
      },
      {
        "title": "One rule that matters",
        "body": "Judge impact and risk, not tone."
      }
    ],
    "tagline": "Day 1 bridge: “CLAUDE.md and memory”. Only what is written down carries over.",
    "keyPoints": [
      "CLAUDE.md = n8n System Message",
      "Four sections, written in Lesson 1",
      "The tone rule is tested in the tone trap"
    ],
    "notes": "On main the file 01-single-agent/claude-project/CLAUDE.md has four TODO sections. In Lesson 1 participants paste the text from SOLO.md Step 1, Build 2. The Priority definitions end with: Judge impact and risk, not tone. The tone trap removes that section to show what happens without it."
  },
  {
    "lessonId": "workshop-4",
    "title": "Get the workshop package.",
    "kicker": "SOLO 0 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "visual": {
      "bot": "point",
      "place": "beside",
      "cmdCards": [
        0
      ]
    },
    "subtitle": "Clone, install, and look at a dry run before you call a model.",
    "cards": [
      {
        "title": "Terminal",
        "body": "node --version\ngit clone https://github.com/RyanLisse/aetherlink-day5-n8n-to-agent.git\ncd aetherlink-day5-n8n-to-agent\nnpm ci\nnpm run doctor\nnpm run verify\nnpm run lesson1 -- MSG-01 --dry-run\nnpm run chat -- --dry-run"
      }
    ],
    "steps": [
      "Check that node --version shows v22 or newer.",
      "Clone the repo. You start on main, which is Step 0.",
      "Run npm ci, then npm run doctor. Doctor shows your Node.js, the backend and your Claude Code version.",
      "Run npm run verify. Look for fail 0.",
      "Run npm run lesson1 -- MSG-01 --dry-run. Find the message, the options and the last line.",
      "Run npm run chat -- --dry-run.",
      "Open docs/customer-messages.md (MSG-01 to MSG-10) and 01-single-agent/options.mjs (the // STEP 1 lines)."
    ],
    "expected": "Done when: verify shows fail 0, and the dry run ends with “dry run — no model call, not model evidence”.",
    "keyPoints": [
      "Node.js 22 or newer, Claude Code logged in",
      "PowerShell blocks npm? Use npm.cmd",
      "Always put -- before the arguments",
      "A dry run is not model evidence"
    ],
    "notes": "Commands are from SOLO.md Step 0. Claude Code is the default backend and uses the local login; an API key is optional. Doctor prints the Claude Code minimum (2.1.205). The dry run on main shows options {} because Step 1 fills them. Message IDs have two digits: MSG-01, not MSG-1.",
    "repo": {
      "label": "Open the workshop repository",
      "url": "https://github.com/RyanLisse/aetherlink-day5-n8n-to-agent"
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Lesson 1: one agent reads CLAUDE.md.",
    "kicker": "Explain · one agent",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside",
      "stagger": "pop"
    },
    "subtitle": "buildOptions() is the settings panel of yesterday’s AI Agent node.",
    "cards": [
      {
        "title": "Rules and limits",
        "body": "cwd, settingSources and the claude_code preset load CLAUDE.md. tools: [] and maxTurns: 3: this agent only reads and answers."
      },
      {
        "title": "Priority Parser",
        "body": "outputFormat with a JSON schema: priority and reason."
      },
      {
        "title": "Switch",
        "body": "lib/switch.mjs maps low, medium and high to an action and a team."
      }
    ],
    "tagline": "Day 3 bridge: the Structured Output Parser and the Switch, now in two small files.",
    "keyPoints": [
      "Options = node settings",
      "Schema = Priority Parser",
      "Switch is plain code, no model"
    ],
    "notes": "Open 01-single-agent/options.mjs on main and read the six // STEP 1 lines: they list every option. The schema allows only low, medium or high plus a reason. After a live run, the runner prints Structured output: and a Switch → line, for example Switch → low → AUTO_REPLY (Self-service support). The Switch is the L1 idea from Day 3, kept as plain code."
  },
  {
    "lessonId": "workshop-4",
    "title": "Watch one agent classify a message.",
    "kicker": "Demo · Lesson 1",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside",
      "cmdCards": [
        0
      ]
    },
    "subtitle": "A loud request and a calm report. Judge impact, not tone.",
    "cards": [
      {
        "title": "Demo",
        "body": "npm run lesson1 -- MSG-01 --dry-run\nnpm run lesson1 -- MSG-01\nnpm run lesson1 -- MSG-02"
      },
      {
        "title": "Look for",
        "body": "Structured output: then Switch →"
      }
    ],
    "keyPoints": [
      "MSG-01 is loud; MSG-02 is calm",
      "Point at Structured output and Switch",
      "Do not read out answer keys"
    ],
    "notes": "Run on the step-1 branch. MSG-01 shouts about a receipt; MSG-02 calmly reports three unknown card transactions. Ask the room which one has more impact before you run. If the live run fails, show docs/sample-trace.md and say it is a hand-written sample, not model evidence."
  },
  {
    "lessonId": "workshop-4",
    "title": "Build Lesson 1: options, rules and parser.",
    "kicker": "SOLO 1a · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Fill in the three Step 1 files from SOLO.md, then test memory.",
    "cards": [
      {
        "title": "Files",
        "body": "01-single-agent/options.mjs\n01-single-agent/claude-project/CLAUDE.md\n01-single-agent/priority-schema.mjs"
      }
    ],
    "steps": [
      "Open SOLO.md, Step 1. Replace 01-single-agent/options.mjs with Build 1.",
      "Replace 01-single-agent/claude-project/CLAUDE.md with Build 2.",
      "Create 01-single-agent/priority-schema.mjs (Build 3). Import it and add the outputFormat line to buildOptions().",
      "Run git checkout origin/step-1 -- test/step1.test.mjs, then npm run verify.",
      "Run npm run chat. Say “My favorite color is red”, then ask for it. Type exit.",
      "Run npm run chat -- --no-memory and ask again. What changed?",
      "Stuck? Run git stash -u, git fetch origin, git switch step-1, npm ci."
    ],
    "expected": "Done when: npm run verify shows fail 0, and the dry run shows outputFormat in the options.",
    "keyPoints": [
      "Copy from SOLO.md, do not retype",
      "Memory = the session, like Simple Memory",
      "step-1 is the safety net"
    ],
    "notes": "Builds 1–4 are in SOLO.md Step 1. Build 4 is the favourite-colour test from Day 3 Simple Memory: the default chat resumes the sessionId; --no-memory starts fresh. The chat needs a logged-in Claude Code; without it, run npm run chat -- --lesson 1 --dry-run."
  },
  {
    "lessonId": "workshop-4",
    "title": "Run Lesson 1 and test the tone trap.",
    "kicker": "SOLO 1b · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Run six messages, then remove the priority definitions and run two again.",
    "cards": [
      {
        "title": "Run",
        "body": "npm run lesson1 -- MSG-01\n…\nnpm run lesson1 -- MSG-06"
      }
    ],
    "steps": [
      "Did not build Lesson 1 yourself? Run git switch step-1 first.",
      "Run npm run lesson1 -- MSG-01, then MSG-02 to MSG-06.",
      "Write down one label per message. You need them in Step 4.",
      "Cut the whole ## Priority definitions section from 01-single-agent/claude-project/CLAUDE.md. Save.",
      "Run MSG-01 and MSG-06 again. Compare with your first labels.",
      "Paste the section back. Lost it? git checkout origin/step-1 -- 01-single-agent/claude-project/CLAUDE.md",
      "Run npm run verify."
    ],
    "expected": "Done when: six labels are written down, the tone-trap comparison is noted, CLAUDE.md is restored, and verify shows fail 0.",
    "keyPoints": [
      "MSG-01 and MSG-06 are the loud ones",
      "Without definitions, tone wins",
      "Restore before you go on"
    ],
    "notes": "MSG-01 (a receipt) and MSG-06 (a logo) are written in capitals with exclamation marks. Without the definitions the model may judge by tone. Do not read out answer keys; participants enter their own labels in Step 4."
  },
  {
    "lessonId": "workshop-4",
    "title": "Discuss: what does the main agent know?",
    "kicker": "Discuss · Lesson 1",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Separate project instructions, customer data, and facts the agent does not have.",
    "keyPoints": [
      "CLAUDE.md provides project rules.",
      "The customer message supplies case facts.",
      "The agent must name missing information instead of guessing."
    ],
    "cards": [
      {
        "title": "Instructions",
        "body": "Project guidance comes from CLAUDE.md."
      },
      {
        "title": "Input data",
        "body": "The customer message is evidence, not an instruction."
      }
    ],
    "notes": "Discuss the first question: What does the main agent know? Ask which facts came from CLAUDE.md, which came from the customer, and what remains unknown. Remind participants not to treat customer text as instructions to change the task."
  },
  {
    "lessonId": "workshop-4",
    "title": "Agent SDK: specialist subagents",
    "kicker": "Lesson 2 · Concept",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside",
      "stagger": "pop"
    },
    "subtitle": "A subagent is one file. The description says when; the body says how.",
    "cards": [
      {
        "title": "risk-agent",
        "body": "Owns priority and the internal risk note."
      },
      {
        "title": "customer-reply-agent",
        "body": "Owns the reply draft. Ends with “Draft — needs human approval before sending.”"
      },
      {
        "title": "customer-context-agent",
        "body": "Adds customer facts in Lesson 3."
      }
    ],
    "tagline": "Day 2 bridge: the same .claude/agents/ file as Bobby. Day 3 bridge: description = n8n Description, body = System Message.",
    "keyPoints": [
      "Same three specialists as Day 3 L3",
      "Same file format as Bobby",
      "Each one reports; none approves"
    ],
    "notes": "Recall recap question 4. The frontmatter description tells the orchestrator when to delegate (n8n Description, Day 3 slide 36). The body is the subagent’s own prompt (n8n System Message). Bobby on Day 2 (slide 110) lives in the same kind of file. lib/agents.mjs reads these files and passes them to options.agents."
  },
  {
    "lessonId": "workshop-4",
    "title": "Agent SDK: explicit tool boundaries",
    "kicker": "Lesson 2 · Concept",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Options state which tools exist, which may run, and which are blocked.",
    "cards": [
      {
        "title": "Available",
        "body": "tools: ['Agent', 'Write']"
      },
      {
        "title": "Allowed",
        "body": "allowedTools: ['Agent', 'Write'], permissionMode: 'acceptEdits'"
      },
      {
        "title": "Blocked",
        "body": "disallowedTools: ['WebSearch', 'WebFetch', 'Bash']"
      }
    ],
    "tagline": "Day 1 bridge: “Decide first what Claude may do”. The same idea, now in code.",
    "keyPoints": [
      "Agent lets it delegate",
      "Write lets it save the draft",
      "No web, no shell"
    ],
    "notes": "These are the exact Step 2 options in SOLO.md. maxTurns goes up to 10 because delegation takes more turns. Write is allowed only so the orchestrator can save its draft in output/. Day 2 slide 102a showed the same split: what it may just do, and what stays blocked."
  },
  {
    "lessonId": "workshop-4",
    "title": "Lesson 2: delegate to two subagents.",
    "kicker": "Explain · orchestrator and agents",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside",
      "stagger": "pop"
    },
    "subtitle": "The orchestrator asks risk-agent first, then gives that result to customer-reply-agent.",
    "tagline": "Day 3 bridge: in “Subagents talk before they report back” the Reply Agent asked the Risk Agent. Here the orchestrator passes the risk result on.",
    "keyPoints": [
      "Risk first, reply second",
      "The orchestrator carries the result",
      "One reviewable file"
    ],
    "notes": "The order comes from 02-subagents/claude-project/CLAUDE.md, Workflow steps 1–4. In Day 3 L3+ the Reply Agent had the Risk Agent as its own tool. Here the orchestrator passes the risk result to the reply agent itself. The output is a draft; a person reviews it.",
    "cards": [
      {
        "title": "First: risk-agent",
        "body": "The orchestrator reads the message and delegates the analysis. risk-agent returns priority, risk note and missing information."
      },
      {
        "title": "Then: customer-reply-agent",
        "body": "It gets the message and the risk result, and writes a draft."
      },
      {
        "title": "Last: one file",
        "body": "The orchestrator saves one Markdown file in output/ for a person to review."
      }
    ]
  },
  {
    "lessonId": "workshop-4",
    "title": "Watch the orchestrator save a draft.",
    "kicker": "Demo · Lesson 2",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside",
      "cmdCards": [
        0
      ]
    },
    "subtitle": "Follow the two Agent calls, then open the saved draft.",
    "cards": [
      {
        "title": "Demo",
        "body": "npm run lesson2 -- MSG-05 --dry-run\nnpm run lesson2 -- MSG-05"
      },
      {
        "title": "Look for",
        "body": "[tool_use] Agent → risk-agent\n[tool_use] Agent → customer-reply-agent\n02-subagents/claude-project/output/MSG-05.md"
      }
    ],
    "keyPoints": [
      "MSG-05 is today’s WL-1026",
      "Risk before reply",
      "The file is a draft"
    ],
    "notes": "Run on step-2. MSG-05 is the duplicate-charge case, the cousin of WL-1026. Point at the two Agent lines in order. Open output/MSG-05.md. No Agent lines means the orchestrator did the work itself: say so, and ask why."
  },
  {
    "lessonId": "workshop-4",
    "title": "Run the orchestrator and inspect the draft.",
    "kicker": "SOLO 2 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Get the Step 2 files, trace both specialists, then test the description.",
    "cards": [
      {
        "title": "Get Step 2",
        "body": "Keep your work:\ngit checkout origin/step-2 -- .claude lib/agents.mjs 02-subagents package.json test/step2.test.mjs\nnpm ci\n\nOr catch up:\ngit stash -u\ngit fetch origin\ngit switch step-2\nnpm ci"
      }
    ],
    "steps": [
      "Get the Step 2 files with one of the two routes on the left.",
      "Run npm run lesson2 -- MSG-05 --dry-run, then npm run lesson2 -- MSG-05.",
      "Check that Agent → risk-agent comes before Agent → customer-reply-agent.",
      "Open 02-subagents/claude-project/output/MSG-05.md. Would you send it?",
      "Run npm run lesson2 -- MSG-10. What does risk-agent list as missing?",
      "Set the description in .claude/agents/risk-agent.md to “Helps with things.” Rerun MSG-05. Does it still delegate?",
      "Restore it: git checkout origin/step-2 -- .claude/agents/risk-agent.md"
    ],
    "expected": "Done when: the trace shows both agents in order, MSG-05.md is reviewed, MSG-10 lists missing information, and risk-agent.md is restored.",
    "keyPoints": [
      "Two routes: copy files or switch branch",
      "Read the draft as the human gate",
      "A vague description breaks delegation"
    ],
    "notes": "The copy shortcut and the description test are both in SOLO.md Step 2. The description test is the Day 3 lesson again: when the Risk Agent’s Description was empty, n8n stopped choosing it. A dry run shows setup only; the draft and the MSG-10 result need a live run, or docs/sample-trace.md as a labelled sample."
  },
  {
    "lessonId": "workshop-4",
    "title": "Agent SDK: read-only MCP tools",
    "kicker": "Lesson 3 · Concept",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Two small local servers give specialists narrow, read-only facts.",
    "cards": [
      {
        "title": "get_customer",
        "body": "Reads one customer from docs/customer_context.csv."
      },
      {
        "title": "get_transaction · list_transactions",
        "body": "Read transactions from docs/transactions.xlsx."
      },
      {
        "title": "Boundary",
        "body": "No agent opens a data file. Data only arrives through the tools."
      }
    ],
    "tagline": "Day 1 bridge: “Model Context Protocol”. Day 3 bridge: the Data Table and Get row(s), now behind a tool.",
    "keyPoints": [
      "Same CSV as yesterday’s Data Table",
      "Read-only: nothing changes",
      "The SDK starts the servers itself"
    ],
    "notes": "docs/customer_context.csv is the file Maarten’s Data Table was imported from. The servers are in 03-mcp/transaction-mcp/ (server.js and customers.js). Each tool is marked readOnlyHint. The SDK starts each server over stdio when needed; do not start them yourself. Writing comes later, in the Assignment."
  },
  {
    "lessonId": "workshop-4",
    "title": "Lesson 3: customer and transaction context through MCP.",
    "kicker": "Explain · stdio MCP",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Specialists receive narrow read-only facts instead of opening data files.",
    "keyPoints": [
      "get_customer reads customer context.",
      "get_transaction reads one transaction.",
      "The SDK starts both servers on demand over stdio."
    ],
    "cards": [
      {
        "title": "Customer context",
        "body": "customer_context.csv → get_customer → customer-context-agent"
      },
      {
        "title": "Transaction facts",
        "body": "transactions.xlsx → get_transaction → risk-agent"
      }
    ],
    "notes": "Use step-3. Two read-only stdio servers: transactions (get_transaction, list_transactions) and customers (get_customer). In options.mjs, mcpServers points each server at its data file through an env variable. .mcp.json registers the same servers for Claude Code."
  },
  {
    "lessonId": "workshop-4",
    "title": "Watch the specialists request external facts.",
    "kicker": "Demo · Lesson 3",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside",
      "cmdCards": [
        0
      ]
    },
    "subtitle": "First prove the servers work without a model. Then follow the IDs.",
    "cards": [
      {
        "title": "Demo",
        "body": "npm run smoke:mcp\nnpm run lesson3 -- MSG-08 --dry-run\nnpm run lesson3 -- MSG-08"
      },
      {
        "title": "Look for",
        "body": "MCP servers OK — read-only lookups; no model was called.\n[tool_use] mcp__transactions__get_transaction\nExternal data:"
      }
    ],
    "keyPoints": [
      "Smoke test: no model needed",
      "TX-1014 goes to get_transaction",
      "External data: names the source"
    ],
    "notes": "MSG-08 mentions TX-1014 and CUST-008. The smoke test calls each tool directly and checks that the workbook did not change. In the live run, follow customer-context-agent and get_customer, then risk-agent and get_transaction, then the External data: line in the result."
  },
  {
    "lessonId": "workshop-4",
    "title": "Run Lesson 3 with customer and transaction context.",
    "kicker": "SOLO 3 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Smoke-test the servers, then run three messages that carry IDs.",
    "cards": [
      {
        "title": "Get Step 3",
        "body": "Keep your work:\ngit checkout origin/step-3 -- 03-mcp .mcp.json .claude lib package.json test/step3.test.mjs\nnpm ci\n(cd 03-mcp/transaction-mcp && npm ci)\n\nOr catch up:\ngit stash -u\ngit fetch origin\ngit switch step-3\nnpm ci"
      }
    ],
    "steps": [
      "Get the Step 3 files with one of the two routes on the left.",
      "Run npm run smoke:mcp. Wait for “MCP servers OK”.",
      "Run npm run lesson3 -- MSG-08 --dry-run. Find mcpServers in the options.",
      "Run npm run lesson3 -- MSG-08, then MSG-07, then MSG-09.",
      "For each run, note which tool was called and the External data: line.",
      "Open the draft in 03-mcp/claude-project/output/ and review it."
    ],
    "expected": "Done when: the smoke test passes, each live run shows a get_transaction call and an External data: line, and each draft is reviewed by you.",
    "keyPoints": [
      "Smoke test before model",
      "Each fact has a source",
      "You review every draft"
    ],
    "notes": "Commands are from SOLO.md Step 3. npm ci also runs a postinstall that installs the server’s own dependencies, so the nested npm ci is a safe repeat. The tools are read-only and the workbook stays in docs/."
  },
  {
    "lessonId": "workshop-4",
    "title": "Discuss: tools and external data.",
    "kicker": "Discuss · Lesson 3",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Name when a tool is needed, where each fact came from, and who reviews the draft.",
    "keyPoints": [
      "Use a tool when a needed fact is outside the message.",
      "MCP results are external data.",
      "A person reviews every reply draft."
    ],
    "cards": [
      {
        "title": "Two boundaries",
        "body": "Specialists see tool results. A person decides whether a draft may be sent."
      }
    ],
    "notes": "Trace one claim to the customer message and one to an MCP result. The exercise is read-only; the human decision is whether the reply draft is fit to send."
  },
  {
    "lessonId": "workshop-4",
    "title": "Control: agent choice, fixed evidence",
    "kicker": "Proof · Concept",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "The agent chooses specialists. A fixed check and a person guard the result.",
    "cards": [
      {
        "title": "Agent choice",
        "body": "The orchestrator chooses the next specialist."
      },
      {
        "title": "Fixed check",
        "body": "npm run check compares your labels with the answer key. No model."
      },
      {
        "title": "Human review",
        "body": "A person reviews every saved draft."
      }
    ],
    "tagline": "Day 2 bridge: Bobby checked the levels and approved nothing. npm run check does the same for labels.",
    "keyPoints": [
      "The model may vary; the check does not",
      "correct or revise, per message",
      "A pass does not replace review"
    ],
    "notes": "check.mjs hashes each label and compares it with answer-key.json, so nobody sees the key. It prints correct or revise per message and a total for Lesson 1 (MSG-01 to MSG-06) and Lesson 3 (MSG-01 to MSG-09). MSG-10 is not graded. Day 3 slide 43, “Proof is not vibes.”, is the same idea. Hooks and skills are parked from the core route; they return in the Assignment."
  },
  {
    "lessonId": "workshop-4",
    "title": "Complete the acceptance table and Proof.",
    "kicker": "SOLO 4 · Your turn · Proof",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Check your labels, then record the facts and the human review.",
    "cards": [
      {
        "title": "Get the checker",
        "body": "git checkout origin/step-4 -- check.mjs answer-key.json labels.template.json package.json\nnpm run check"
      },
      {
        "title": "Table columns",
        "body": "Message · Agent label · Customer context (get_customer) · Transaction facts (get_transaction) · Draft reviewed by a person?"
      }
    ],
    "steps": [
      "Copy the checker with the command on the left.",
      "Run npm run check. The first run only creates labels.json.",
      "Write low, medium or high in labels.json for each message you ran. Leave the rest empty.",
      "Run npm run check again. Read each correct or revise line.",
      "revise? Reread the priority definitions and your trace. Do not change a label just to pass.",
      "Fill the table for MSG-01, MSG-05, MSG-07, MSG-08 and MSG-09.",
      "Save the table in participant-output/ or your squad’s intent.md, with one run trace."
    ],
    "expected": "Done when: npm run check shows Lesson 1 6/6 PASS, and the table records the source of each fact and who reviewed each draft.",
    "keyPoints": [
      "First run creates labels.json",
      "Labels come from your own runs",
      "A dry run is not model evidence"
    ],
    "notes": "From SOLO.md Step 4. The check exits 1 on the first run because labels.json is new; that is expected. It passes when Lesson 1 is 6/6 and no filled-in label is wrong. Catch up: git switch step-4."
  },
  {
    "lessonId": "workshop-4",
    "title": "Build your own agent.",
    "kicker": "SOLO 5 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "point",
      "place": "beside",
      "cmdCards": [
        0
      ]
    },
    "subtitle": "A small agent that finds and fixes a bug. Prompt, tools and loop in 30 lines.",
    "cards": [
      {
        "title": "Terminal",
        "body": "cd 05-build-your-own\nnode agent.mjs --dry-run\nclaude -p \"Find and fix the bug in utils.js. Explain the change.\" --allowedTools Read,Edit,Glob --permission-mode acceptEdits"
      }
    ],
    "steps": [
      "Be on step-4: git switch step-4, then npm ci.",
      "Open 05-build-your-own/agent.mjs. Find the prompt, the allowedTools and the loop.",
      "Run node agent.mjs --dry-run from 05-build-your-own.",
      "Run the claude -p command with your Claude Code login. With an API key, run node agent.mjs.",
      "Read the output: which line is a tool use, and which is the final result?",
      "Make it yours: change the prompt, or add a CLAUDE.md."
    ],
    "expected": "Done when: you can point to one tool use and the final result in your run.",
    "keyPoints": [
      "Same loop as Lesson 1",
      "allowedTools limits what it can do",
      "permissionMode controls edits"
    ],
    "notes": "Demo first (about 5 minutes): the dry run, then the claude -p command. 05-build-your-own/README.md explains how to make the folder a standalone project. Skip this slide if time is short; nothing later depends on it."
  },
  {
    "lessonId": "workshop-4",
    "title": "Stretch: chat in, chat out.",
    "kicker": "Stretch · Day 3 final assignment, in code",
    "type": "practice",
    "layout": "exercise",
    "visual": {
      "bot": "point",
      "place": "beside",
      "cmdCards": [
        0
      ]
    },
    "subtitle": "Yesterday’s final build: a ticket in through chat, the whole flow, a reply out. Same assignment, in code.",
    "cards": [
      {
        "title": "Terminal",
        "body": "npm run chat -- --lesson 3\n\nor\n\nclaude"
      }
    ],
    "steps": [
      "Run npm run chat -- --lesson 3, or start claude in the repo folder.",
      "Paste one message with a TX-#### ID from docs/customer-messages.md. Ask for priority, analysis and a reply draft.",
      "Watch the trace: which subagent ran, which MCP tool was called?",
      "Ask a follow-up in the same chat. The session is the memory.",
      "Paste WL-1026 from fixtures/ticket.json. How does it compare with MSG-05?"
    ],
    "expected": "Done when: one chat turn shows a subagent and an MCP call, and a follow-up uses the earlier answer.",
    "keyPoints": [
      "Claude Code reads .mcp.json and .claude/agents/",
      "Free text in, draft out",
      "After today: the Assignment in README.md"
    ],
    "notes": "From SOLO.md, Stretch · Assignment: chat in, chat out. Step 5 (WL-1026) is my addition: the ticket is in fixtures/ticket.json and has no TX or CUST ID, so expect the agents to name missing information. After the workshop, the README Assignment adds CRUD tools (Day 3 slide 41, Data Table CRUD, in code) and a PreToolUse approval hook (Day 1 slide 74, Hooks)."
  },
  {
    "lessonId": "workshop-4",
    "title": "Close: keep a human in the loop.",
    "kicker": "Done when · bridge to Workshop 5",
    "type": "recap",
    "layout": "recap",
    "visual": {
      "recapKeys": true,
      "bot": "point",
      "place": "beside"
    },
    "items": [
      {
        "label": "One agent",
        "caption": "query(), CLAUDE.md and a Priority Parser: Day 3 L2 in code."
      },
      {
        "label": "Three specialists",
        "caption": "risk, reply and customer context: Day 3 L3, in .claude/agents/."
      },
      {
        "label": "Read-only MCP",
        "caption": "Customer and transaction facts through narrow tools."
      },
      {
        "label": "Fixed check",
        "caption": "npm run check, like Bobby: it reports, it approves nothing."
      },
      {
        "label": "Human review",
        "caption": "A person reviews every draft before a customer sees it."
      }
    ],
    "keyPoints": [
      "Items appear by themselves",
      "Recap round: one result each, one minute",
      "Easier in n8n or in code?"
    ],
    "notes": "Let the items appear. Then the recap round from SOLO.md Wrap-up: everyone shows one result in one minute (a trace, a draft, the check output or the chat). Ask: which part was easier in n8n, and which in code? Where must a person still decide? Bridge: Workshop 5 builds an SRE agent with the same pattern."
  },
  {
    "lessonId": "workshop-4",
    "title": "What did you learn?",
    "kicker": "Workshop 4 · Closing",
    "subtitle": "Complete these statements.",
    "type": "recap",
    "tagline": "Complete each statement for yourself.",
    "visual": {
      "sentences": true,
      "quietTimer": 3
    },
    "cards": [
      {
        "title": "The difference between n8n and the Agent SDK is…",
        "body": ""
      },
      {
        "title": "A specialist I would give my own agent is…",
        "body": ""
      },
      {
        "title": "The fact my agent must never guess is…",
        "body": ""
      },
      {
        "title": "The step where a person must decide is…",
        "body": ""
      },
      {
        "title": "I still have a question about…",
        "body": ""
      }
    ],
    "keyPoints": [
      "Three quiet minutes",
      "Let people write first",
      "Collect a few answers aloud",
      "Open questions feed Workshop 5"
    ],
    "notes": "Give three quiet minutes, then collect a few answers aloud. Write the open questions on the flipchart: they are the input for Workshop 5. Logistics only after this."
  }
];
