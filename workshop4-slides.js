/* Adapted from RyanLisse/aetherlink-academy-app @ b491cc0187b948a9717186fa9d2cb3f79dbc59ca.
 * Comparisons are separated and exercises align with the current workshop package. */
'use strict';
window.SLIDES = [
  {
    "lessonId": "workshop-4",
    "title": "Welcome to Workshop 4 · Support agents with the Claude Agent SDK",
    "kicker": "Workshop 4 · Thu 8 Oct",
    "type": "concept",
    "visual": {
      "bot": "wave",
      "place": "beside"
    },
    "subtitle": "Thu 8 Oct · 10:00–16:00 · today we rebuild yesterday’s n8n ticket flow in code.",
    "notes": "Welcome (10:00; session 10:00–16:00). Today: the same ticket flow as yesterday in n8n, now in code with the Claude Agent SDK."
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday’s recap · Workshop 3 · Agents in n8n",
    "kicker": "Recap · one ticket, three levels",
    "type": "recap",
    "layout": "recap",
    "items": [
      {
        "label": "L1 · Rules",
        "caption": "Ticket Input → Switch → Low / Med / High. No LLM."
      },
      {
        "label": "L2 · Judgment",
        "caption": "One AI Agent with memory suggests priority."
      },
      {
        "label": "L3 · Specialists",
        "caption": "Reply, Risk, and Customer Context each own one job."
      },
      {
        "label": "Human",
        "caption": "A person approves the reply before it is sent."
      }
    ],
    "notes": "Recap W3 (source: W3 deck). L1 Switch without an LLM; L2 one AI Agent with memory suggests the priority, a human reviews; L3 Reply and Risk specialists with one human gate. Auto-send off."
  },
  {
    "lessonId": "workshop-4",
    "title": "Today · agenda",
    "kicker": "Run of show · 10:00–16:00",
    "type": "context",
    "subtitle": "I show it, you do it.",
    "keyPoints": [
      "Morning: recap, setup, and one agent with CLAUDE.md.",
      "Afternoon: subagents, MCP, proof, and wrap-up.",
      "Workshop repo: https://github.com/RyanLisse/aetherlink-day5-n8n-to-agent"
    ],
    "notes": "Run of show 10:00–16:00. Breaks are at 11:00 and 14:45; lunch is 12:00–13:00. Format: I show it, you do it. Fell behind? Stash your work, fetch origin, then switch to the relevant step branch."
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday in n8n",
    "kicker": "Anchor · Day 3",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "A visible workflow connected the ticket, three specialists, and a human gate.",
    "keyPoints": [
      "Switch routes fixed priority branches.",
      "Reply, Risk, and Context own separate jobs.",
      "Data Table supplies customer context."
    ],
    "notes": "Use one n8n anchor instead of repeating a side-by-side comparison on every concept."
  },
  {
    "lessonId": "workshop-4",
    "title": "Agent SDK: the query loop",
    "kicker": "Lesson 1 · Concept",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "The AI Agent node becomes a loop in code.",
    "keyPoints": [
      "query() receives prompt and options.",
      "The event stream shows tools and observations.",
      "maxTurns limits the loop."
    ],
    "notes": "Explain the SDK loop, then move directly to project instructions."
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
    "subtitle": "CLAUDE.md moves durable instructions beside the code.",
    "keyPoints": [
      "settingSources loads project instructions.",
      "Purpose and Rules set the main boundaries.",
      "Step 1 adds priority and output requirements."
    ],
    "notes": "The supplied facilitator CLAUDE.md contains Purpose, Rules, and Always use sub-agents. It does not contain priority definitions or an output schema; those claims come from the current workshop repository."
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
      "place": "beside"
    },
    "cards": [
      {
        "title": "Terminal",
        "body": "git clone https://github.com/RyanLisse/aetherlink-day5-n8n-to-agent.git\ncd aetherlink-day5-n8n-to-agent\nnpm ci\nnpm run verify\nnpm run doctor\nnpm run lesson1 -- MSG-01 --dry-run"
      }
    ],
    "steps": [
      "Check for Node.js 22 or newer and a Claude Code login.",
      "Clone the repository; main is the Step 0 starter.",
      "Run npm ci, npm run verify, and npm run doctor.",
      "Run npm run lesson1 -- MSG-01 --dry-run.",
      "Find docs/customer-messages.md and 01-single-agent."
    ],
    "expected": "npm run verify shows fail 0, and the dry run prints the prompt and options and ends with dry run — no model call, not model evidence.",
    "subtitle": "Clone the workshop repo, install, and inspect a dry run before calling a model.",
    "keyPoints": [
      "Use Node.js 22 or newer.",
      "main is the starting point; step-1 … step-4 hold each finished step.",
      "A dry run is not model evidence."
    ],
    "notes": "Use the current workshop repository. The dry run prints configuration without calling a model. step-1 through step-4 contain finished catch-up states. The local LESSON folder is facilitator source material; do not copy its machine-specific paths.",
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
      "place": "beside"
    },
    "subtitle": "query() loads project instructions when settingSources includes project.",
    "keyPoints": [
      "CLAUDE.md sets the support rules.",
      "The main agent reads the customer message.",
      "Judge impact, not tone."
    ],
    "cards": [
      {
        "title": "Project instructions",
        "body": "settingSources: ['project'] loads CLAUDE.md."
      },
      {
        "title": "One agent",
        "body": "The main session classifies the message itself."
      }
    ],
    "notes": "Explain Lesson 1. Point to query(), the absolute claude-project cwd, settingSources, and the claude_code preset. The main agent reads CLAUDE.md and the supplied message. Customer text stays data, not instructions."
  },
  {
    "lessonId": "workshop-4",
    "title": "Watch one agent classify a message.",
    "kicker": "Demo · Lesson 1",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Compare a loud request with a calm report and focus on impact.",
    "keyPoints": [
      "Read the project rules first.",
      "Compare tone with the reported impact.",
      "Keep facts tied to the supplied message."
    ],
    "cards": [
      {
        "title": "Loud wording",
        "body": "A customer is upset about a receipt."
      },
      {
        "title": "Calm wording",
        "body": "A customer reports unfamiliar transactions."
      }
    ],
    "notes": "Demonstrate Lesson 1 with a loud request about a receipt and a calm message that reports unfamiliar transactions. Ask the room to judge impact, not tone. Do not name labels or expose grader results."
  },
  {
    "lessonId": "workshop-4",
    "title": "Run Lesson 1 and test the tone trap.",
    "kicker": "SOLO 1 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 1"
      }
    ],
    "steps": [
      "Run git fetch origin, git switch step-1, and npm ci.",
      "Run lesson1 for MSG-01 through MSG-06.",
      "Temporarily remove ## Priority definitions from the Lesson 1 CLAUDE.md.",
      "Rerun the loud-tone and tone-trap messages.",
      "Restore the section (lost it? git restore --source=origin/step-1 -- 01-single-agent/claude-project/CLAUDE.md).",
      "Write down one label per message (you enter them in labels.json in Step 4)."
    ],
    "expected": "Step 1 is checked out, all six messages run, the comparison is recorded, CLAUDE.md is restored, and six labels are written down.",
    "subtitle": "Run the first six messages and test how project rules affect tone.",
    "keyPoints": [
      "Run all six messages.",
      "Compare the tone-trap runs.",
      "Restore CLAUDE.md before continuing."
    ],
    "notes": "Give participants 15 minutes. Ask them to remove only the Priority definitions section, rerun the loud-tone and tone-trap messages, and restore the original CLAUDE.md. Have them write down their own labels; they enter them in labels.json with npm run check in Step 4. Do not read out answer keys."
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
      "place": "beside"
    },
    "subtitle": "Each specialist has a description and its own prompt.",
    "keyPoints": [
      "risk-agent owns priority and escalation.",
      "customer-reply-agent owns the draft.",
      "customer-context-agent arrives in Step 3."
    ],
    "notes": "The description tells the orchestrator when to delegate. The body tells the specialist how to work."
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
    "subtitle": "Options state which tools exist and which may run.",
    "keyPoints": [
      "tools includes Agent and Write.",
      "allowedTools permits known operations.",
      "disallowedTools blocks WebSearch, WebFetch, and Bash."
    ],
    "notes": "Use the current Step 2 options. Keep this slide to tool access only."
  },
  {
    "lessonId": "workshop-4",
    "title": "Lesson 2: delegate to two subagents.",
    "kicker": "Explain · orchestrator and agents",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "The orchestrator sends risk analysis and reply writing to separate specialists.",
    "keyPoints": [
      "risk-agent decides priority and escalation.",
      "customer-reply-agent writes the reply draft.",
      "The orchestrator saves one reviewable output file."
    ],
    "cards": [
      {
        "title": "risk-agent",
        "body": "Returns priority, risk note, and missing information."
      },
      {
        "title": "customer-reply-agent",
        "body": "Writes a draft from the message and risk analysis."
      }
    ],
    "notes": "Use step-2. The current package defines risk-agent and customer-reply-agent in .claude/agents. The orchestrator waits for the risk result before asking for a reply draft."
  },
  {
    "lessonId": "workshop-4",
    "title": "Watch the orchestrator save a draft.",
    "kicker": "Demo · Lesson 2",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Follow the two Agent calls and open the saved Markdown result.",
    "keyPoints": [
      "Trace risk-agent first.",
      "Trace customer-reply-agent second.",
      "Review output/MSG-05.md before customer-facing use."
    ],
    "cards": [
      {
        "title": "Trace",
        "body": "Agent → risk-agent, then Agent → customer-reply-agent."
      }
    ],
    "notes": "Run npm run lesson2 -- MSG-05. Follow both Agent calls, then open 02-subagents/claude-project/output/MSG-05.md. The file is a draft and needs human review."
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
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 2"
      }
    ],
    "steps": [
      "Restore Lesson 1 changes, then stash, fetch origin, and switch to step-2.",
      "Run npm ci and npm run lesson2 -- MSG-05 --dry-run.",
      "Run MSG-05 and confirm risk-agent runs before customer-reply-agent.",
      "Open 02-subagents/claude-project/output/MSG-05.md and review the draft.",
      "Run MSG-10 and inspect how missing information is handled."
    ],
    "expected": "The trace shows both current agents in order, and both saved drafts receive human review.",
    "subtitle": "Trace both specialists, inspect their saved result, and test missing information.",
    "keyPoints": [
      "Follow the Agent trace.",
      "Review the saved draft.",
      "Do not send without human approval."
    ],
    "notes": "The current Step 2 names are risk-agent and customer-reply-agent. A dry run proves configuration only; use a live run or labelled sample trace as model evidence."
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
    "subtitle": "Local servers expose customer and transaction facts through narrow calls.",
    "keyPoints": [
      "get_customer reads one customer record.",
      "get_transaction reads one transaction.",
      "Data files stay outside claude-project."
    ],
    "notes": "The current repo has two read-only servers. The supplied archive confirms only the transaction-server pattern."
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
    "notes": "Use step-3. The current package has two read-only stdio servers. The supplied LESSON source confirms the local transaction-server pattern, but its absolute Windows path is not a participant command."
  },
  {
    "lessonId": "workshop-4",
    "title": "Watch the specialists request external facts.",
    "kicker": "Demo · Lesson 3",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Follow customer and transaction IDs from the message to the correct MCP result.",
    "keyPoints": [
      "customer-context-agent calls get_customer.",
      "risk-agent calls get_transaction.",
      "The result identifies facts from external data."
    ],
    "cards": [
      {
        "title": "Read-only tools",
        "body": "mcp__customers__get_customer\nmcp__transactions__get_transaction"
      }
    ],
    "notes": "Run npm run lesson3 -- MSG-08. Follow the Agent and MCP trace, then review the saved reply draft. A dry run is configuration evidence, not model evidence."
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
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 3"
      }
    ],
    "steps": [
      "Stash your work, fetch origin, and switch to step-3.",
      "Run npm ci, then npm ci inside 03-mcp/transaction-mcp.",
      "Run npm run smoke:mcp; it calls both read-only servers without a model.",
      "Run npm run lesson3 -- MSG-08, MSG-07, and MSG-09.",
      "Inspect each tool trace, External data line, and saved draft."
    ],
    "expected": "Both servers pass the smoke test; live runs identify external facts and leave drafts for human review.",
    "subtitle": "Use the MCP tool for transaction facts and record their source.",
    "keyPoints": [
      "Smoke-test both servers first.",
      "Follow get_customer and get_transaction.",
      "Keep data files outside claude-project."
    ],
    "notes": "The current Step 3 tools are read-only. There is no clerk or write exercise in this route. Do not upload or copy the local LESSON archive or workbook."
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
    "subtitle": "The agent chooses specialists; checks and people guard the result.",
    "keyPoints": [
      "The orchestrator chooses the next specialist.",
      "npm run check validates recorded labels.",
      "A person reviews every saved draft."
    ],
    "notes": "Hooks and Skills are parked because neither appears in the core exercise."
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
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 4"
      }
    ],
    "steps": [
      "Build a table with message, agent label, and facts from external data.",
      "Run npm run check, fill in labels.json, and run npm run check again.",
      "Review drafts in the Lesson 2 and Lesson 3 output folders.",
      "Attach the table and a run trace to Proof.",
      "Record the human review gate; a dry run is not model evidence."
    ],
    "expected": "The acceptance table, npm run check output, run trace, and human review gate are recorded in Proof.",
    "subtitle": "Record the labels, external facts, run evidence, and human review.",
    "keyPoints": [
      "Fill the acceptance table.",
      "Trace external facts to MCP.",
      "Have a human review each draft."
    ],
    "notes": "Give participants 15 minutes to complete the acceptance table and npm run check (git checkout step-4 if they lack check.mjs). They should attach their trace, review the drafts in both output folders, and record the human gate. Do not use dry-run output as model evidence."
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
        "caption": "Project rules and message data guide Lesson 1."
      },
      {
        "label": "Three specialists",
        "caption": "Risk, reply, and customer context stay separate."
      },
      {
        "label": "Read-only MCP",
        "caption": "Customer and transaction facts arrive through narrow tools."
      },
      {
        "label": "Human review",
        "caption": "A person reviews every draft before customer-facing use."
      }
    ],
    "notes": "Close by recapping the three lessons and the human review gate. Bridge to Workshop 5 without carrying this package or vehicle into the next workshop."
  }
];
