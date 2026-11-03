/* Locally maintained classroom content. See tools/SESSION-SOURCES.md. */
window.SLIDES = [
  {
    "lessonId": "workshop-4",
    "title": "Welcome to Workshop 4 · From n8n to Claude Agents SDK",
    "kicker": "Workshop 4 · From n8n to Claude Agents SDK",
    "type": "concept",
    "visual": {
      "opener": "welcome",
      "bot": "wave",
      "place": "beside"
    },
    "subtitle": "Rebuild the behaviour you checked in n8n, now in code.",
    "notes": "Bring one W3 ticket, observed output, failed case and human review decision. Today uses a separate package and new messages, not an import of the n8n workflow. No specialist extension is required to start.",
    "stateId": "0:Welcome to Workshop 4 · From n8n to Claude Agents SDK"
  },
  {
    "lessonId": "workshop-4",
    "type": "context",
    "title": "What was most useful in the last session?",
    "kicker": "W4 · RECAP",
    "visual": {
      "opener": "ask",
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Share one thing you learned or used.",
    "cards": [],
    "keyPoints": [
      "One useful takeaway per table.",
      "Ask for a concrete example."
    ],
    "notes": "Time: 3 min.\n1. Give each table 1 minute to discuss.\n2. Ask each table to share one useful takeaway from the n8n session.\n3. Ask where they could use it.\n4. Write the main takeaways on the board.",
    "stateId": "1:What was most useful in the last session?"
  },
  {
    "lessonId": "workshop-4",
    "type": "context",
    "title": "What went wrong? What did you learn?",
    "kicker": "W4 · W3 RECAP · LESSONS",
    "visual": {
      "bot": "point",
      "place": "left",
      "stepThrough": true
    },
    "subtitle": "Give one lesson per table.",
    "cards": [
      {
        "title": "Wrong",
        "body": "What did the flow do that you did not expect?"
      },
      {
        "title": "Lesson",
        "body": "What was hard to see or to test in n8n?"
      }
    ],
    "keyPoints": [
      "One lesson per table.",
      "Listen for things that were hard to test or to limit.",
      "Connect the lessons to today: tests, tool lists and hooks."
    ],
    "notes": "Time: 3 min.\n1. Ask each table to share one unexpected result and one lesson.\n2. Write the lessons on the board.\n3. Connect them to today: hard to test → npm run check; every tool allowed → a tools list per agent; no stop before a write → a hook.",
    "stateId": "2:What went wrong? What did you learn?"
  },
  {
    "lessonId": "workshop-4",
    "type": "context",
    "title": "What would success look like for you today?",
    "kicker": "W4 · YOUR GOAL",
    "visual": {
      "opener": "ask",
      "bot": "happy",
      "place": "beside"
    },
    "subtitle": "Name one thing you want to be able to do after this workshop.",
    "cards": [],
    "keyPoints": [
      "One concrete outcome per person.",
      "Keep the outcomes for the close."
    ],
    "notes": "Time: 3 min.\n1. Give each person 1 minute to write their desired outcome.\n2. Collect one or two outcomes per table on the board.\n3. Connect them to the goal of today. Say what fits today and what does not.\n4. Return to the outcomes at the close.",
    "stateId": "3:What would success look like for you today?"
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday’s flow · 1. Ticket in, Switch out",
    "kicker": "Recap · n8n flow 1/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/n8n/01-switch.png",
      "imageLink": "n8n · Ticket Input → Switch"
    },
    "subtitle": "A ticket goes in. The Switch picks LOW, MEDIUM or HIGH.",
    "cards": [
      {
        "title": "Ticket Input",
        "body": "One support message."
      },
      {
        "title": "Switch",
        "body": "Three routes: low, medium, high."
      }
    ],
    "keyPoints": [
      "Ticket Input: One support message.",
      "Switch: Three routes: low, medium, high."
    ],
    "notes": "Recap 1/4 (10:05). Show Maarten’s first flow: manual trigger, Ticket Input, Switch with three routes. Say: today the Switch becomes lib/switch.mjs.",
    "stateId": "4:Yesterday’s flow · 1. Ticket in, Switch out"
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday’s flow · 2. Chat and an AI Agent",
    "kicker": "Recap · n8n flow 2/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/n8n/02-chat-agent.png",
      "imageLink": "n8n · Chat trigger → AI Agent"
    },
    "subtitle": "The chat sends a message to the AI Agent. Memory keeps the session.",
    "cards": [
      {
        "title": "Chat trigger",
        "body": "When chat message received."
      },
      {
        "title": "Simple Memory",
        "body": "Adds earlier messages from the same session."
      }
    ],
    "keyPoints": [
      "Compare the observed runs.",
      "Check session boundaries."
    ],
    "notes": "Ask for the before-memory, same-session and new-session results. Do not promise an exact model answer. Today npm run chat resumes the session; a new session must not inherit another customer’s conversation.",
    "stateId": "5:Yesterday’s flow · 2. Chat and an AI Agent"
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday’s flow · 3. Structured output",
    "kicker": "Recap · n8n flow 3/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/n8n/03-parser.png",
      "imageLink": "n8n · AI Agent + Structured Output Parser"
    },
    "subtitle": "The Priority Parser gives a fixed shape. Then the Switch routes.",
    "cards": [
      {
        "title": "Structured Output Parser",
        "body": "Day 3: priority and message. Day 4: inspect the target schema."
      },
      {
        "title": "Switch",
        "body": "Routes on priority."
      }
    ],
    "keyPoints": [
      "Keep the priority values consistent.",
      "Map message to the new contract deliberately.",
      "Check parse errors and wrong decisions separately."
    ],
    "notes": "Day 3 used priority and message. Day 4 has its own schema and fixtures; do not claim they are identical. Open priority-schema.mjs and name each required field. Translate deliberately and keep the failed-case evidence.",
    "stateId": "6:Yesterday’s flow · 3. Structured output"
  },
  {
    "lessonId": "workshop-4",
    "title": "Optional yesterday, explained today: specialist agents",
    "kicker": "Recap · n8n flow 4/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/n8n/05-three-agents.png",
      "imageLink": "n8n · Customer Reply, Risk and Customer Context agents"
    },
    "subtitle": "You can start today after the one-Agent core. No L3 completion is required.",
    "cards": [
      {
        "title": "Customer Reply Agent",
        "body": "Writes the reply."
      },
      {
        "title": "Risk Agent",
        "body": "Decides the risk."
      },
      {
        "title": "Customer Context Agent",
        "body": "Reads the Data Table."
      }
    ],
    "keyPoints": [
      "Customer Reply Agent: Writes the reply.",
      "Risk Agent: Decides the risk.",
      "Customer Context Agent: Reads the Data Table."
    ],
    "notes": "Yesterday’s specialist route was optional. Show this as a reference, not an assumed participant result. Briefly identify Reply, Risk and Context, then explain the code equivalent before asking learners to build it.",
    "stateId": "7:Optional yesterday, explained today: specialist agents"
  },
  {
    "lessonId": "workshop-4",
    "title": "Today · agenda",
    "kicker": "Run of show · 10:00–16:00",
    "type": "context",
    "visual": {
      "bot": "wave",
      "place": "left",
      "dayRoute": [
        "Recap",
        "Concepts",
        "Step 0",
        "Step 1",
        "Lunch",
        "Step 2",
        "Step 3",
        "Step 4",
        "Assignment",
        "Close"
      ]
    },
    "subtitle": "I show it. Then you do it.",
    "cards": [
      {
        "title": "10:00 · Start",
        "body": "Recap, concepts, Step 0."
      },
      {
        "title": "11:15 · Step 1",
        "body": "Structured output and memory."
      },
      {
        "title": "13:00 · Steps 2–4",
        "body": "Subagents, MCP tools, the check."
      },
      {
        "title": "15:00 · Assignment",
        "body": "Extend the MCP. Close at 15:50."
      }
    ],
    "keyPoints": [
      "10:00 Welcome, recap, goal · 10:15 Concepts n8n → Agent SDK · 10:45 Step 0 · 11:00 Break · 11:15 Step 1 · 12:00 Lunch",
      "13:00 Step 2 · subagents · 13:40 Step 3 · MCP · 14:20 Step 4 · check · 14:45 Break · 15:00 Assignment · extend the MCP · 15:50 Close",
      "Step 5 (build your own agent) is optional: do it at home.",
      "Workshop repo: https://github.com/RyanLisse/aetherlink-day5-n8n-to-agent",
      "Fell behind? Fetch first, then switch to step-1 … step-4 for the finished state."
    ],
    "notes": "Run of show 10:00–16:00 (break 11:00–11:15, lunch 12:00–13:00, break 14:45–15:00). Format: I show it, you do it.",
    "stateId": "8:Today · agenda"
  },
  {
    "lessonId": "workshop-4",
    "title": "Goal of today",
    "kicker": "Welcome · Goal of today",
    "type": "context",
    "visual": {
      "keyLine": 2,
      "stamp": "EXPLAIN",
      "bot": "head",
      "place": "key"
    },
    "subtitle": "At 16:00 you have an agent system that you control.",
    "cards": [
      {
        "title": "Morning",
        "body": "One agent in code. Structured output and memory."
      },
      {
        "title": "Afternoon",
        "body": "Subagents, MCP tools and a hook for each write."
      },
      {
        "title": "You can explain",
        "body": "Which agent has which tool. When a person must approve."
      }
    ],
    "keyPoints": [
      "One flow, from n8n to code.",
      "Least privilege for each agent.",
      "A person approves risky writes."
    ],
    "notes": "Say the goal in one sentence: at 16:00 each participant has an agent system that they built and can explain. Point at the agenda times. Say when the breaks are.",
    "stateId": "9:Goal of today"
  },
  {
    "lessonId": "workshop-4",
    "title": "Why move the flow to code?",
    "kicker": "Context · why code",
    "type": "context",
    "visual": {
      "stack": [
        "test",
        "limit",
        "control"
      ],
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "n8n shows the flow. Code lets you test it and control it.",
    "cards": [
      {
        "title": "Test it",
        "body": "npm run check gives the same result on each laptop."
      },
      {
        "title": "Limit it",
        "body": "Each agent gets a list of its tools."
      },
      {
        "title": "Control it",
        "body": "A hook decides each write. The model cannot skip the hook."
      }
    ],
    "keyPoints": [
      "n8n showed the flow. Code lets you test it, limit it and control it."
    ],
    "notes": "Say why we leave n8n for code: tests, least privilege per agent, hooks as code, and the same flow on your own Claude Code. The mapping itself is on the next slide.",
    "stateId": "10:Why move the flow to code?"
  },
  {
    "lessonId": "workshop-4",
    "title": "n8n ↔ Agent SDK at a glance",
    "kicker": "Concept recap · overview",
    "type": "concept",
    "layout": "compare",
    "visual": {
      "stepThrough": true,
      "highlight": [
        {
          "in": "subtitle",
          "text": "Same person at the end",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "Same labels. Same specialists. Same person at the end.",
    "columns": [
      {
        "title": "n8n · Workshop 3",
        "items": [
          "AI Agent",
          "System Message",
          "Max Iterations",
          "Simple Memory",
          "Priority Parser",
          "Switch",
          "Data Table"
        ]
      },
      {
        "title": "Agent SDK · Workshop 4",
        "items": [
          "query()",
          "CLAUDE.md",
          "maxTurns",
          "session resume",
          "json_schema",
          "lib/switch.mjs",
          "MCP tool"
        ]
      }
    ],
    "keyPoints": [
      "Same labels, same specialists, same human at the end."
    ],
    "notes": "Map the final participant README table row by row: Chat trigger → npm run chat; AI Agent → query(); System Message → CLAUDE.md; Max Iterations → maxTurns; Simple Memory → session resume; Priority Parser → outputFormat json_schema; n8n Description → frontmatter description; Customer Context Agent + Data Table → customer-context-agent → customers MCP get_customer over customer_context.csv; transaction workbook lookup → risk-agent → transactions MCP get_transaction over transactions.xlsx; Switch → lib/switch.mjs. Every draft has human review.",
    "stateId": "11:n8n ↔ Agent SDK at a glance"
  },
  {
    "lessonId": "workshop-4",
    "title": "One agent loop. Bounded actions.",
    "kicker": "Concept · Agent",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-3/agent-loop.svg",
      "imageAlt": "Context, model call, permission check, runtime tool execution, result and next turn. Answers need review; denial, errors and limits can stop the run.",
      "imageLink": "Concept diagram · trace one real run next"
    },
    "subtitle": "The SDK runtime runs the loop. Your code sets tools, limits and controls.",
    "cards": [],
    "keyPoints": [
      "Model requests; runtime executes.",
      "Check permission before a tool runs.",
      "Hooks can inspect defined before/after events.",
      "Text is not success; check evidence.",
      "Errors, limits and people can stop the run."
    ],
    "notes": "Use WL-1026: the model may request a customer lookup; the runtime checks permission, runs the allowed tool, and adds its result to context. A second model call can use that evidence. Do not claim this lookup exists in the core chat flow: it is an optional tool example. Before any tools exist, show the short path from model to an unapproved draft. Hooks are callbacks at defined runtime events; they are not the model, do not universally intercept every operation, and do not grant human approval. A post-tool hook cannot prevent an action that already ran. A no-tool answer is one normal end path, not proof that acceptance checks passed. A denied action may be returned as an error for safe continuation or may stop the run, depending on policy. Unrecoverable failures, turn/budget limits and cancellation are separate end paths. This diagram shows one agent invocation, not the full AI-SDLC.\nDemonstrate one request and response. Participants identify them in their own trace. Discuss: who executed the code, and which evidence supports the answer? In the SDK inspect query(), tool_use/tool_result, the result subtype and maxTurns. n8n Max Iterations and SDK maxTurns are related limits, not identical counters. Not every n8n node has Claude SDK hook APIs.",
    "stateId": "12:One agent loop. Bounded actions."
  },
  {
    "lessonId": "workshop-4",
    "title": "Two ways to run the same agent",
    "kicker": "Concept · choose a backend",
    "type": "concept",
    "visual": {
      "spotlight": 0,
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Claude Code is the default. The SDK is the second way.",
    "cards": [
      {
        "title": "claude-code · default",
        "body": "Uses your Claude Code login. No API key."
      },
      {
        "title": "sdk",
        "body": "Uses query() and ANTHROPIC_API_KEY."
      },
      {
        "title": "Same options",
        "body": "Each SDK option has a CLI flag."
      }
    ],
    "keyPoints": [
      "Claude Code is the default. The SDK is the second way."
    ],
    "notes": "claude-code is the default, but if ANTHROPIC_API_KEY is set in your shell the runner picks sdk; force one with --backend. The SDK backend uses query() with ANTHROPIC_API_KEY; sdk-login is opt-in for local learning. The CLI mappings are maxTurns/--max-turns, agents/--agents, mcpServers/--mcp-config, outputFormat/--json-schema, and resume/--resume.",
    "stateId": "13:Two ways to run the same agent"
  },
  {
    "lessonId": "workshop-4",
    "title": "Demo · Step 0: the offline path",
    "kicker": "Demo · Step 0",
    "type": "concept",
    "visual": {
      "term": [
        {
          "c": "npm ci"
        },
        {
          "c": "npm run doctor"
        },
        {
          "c": "npm run lesson1 -- MSG-01 --dry-run"
        },
        {
          "o": "backend: claude-code (claude -p)"
        },
        {
          "o": "dry run — no model call"
        }
      ]
    },
    "subtitle": "Prove your setup first. A dry run makes no model call.",
    "cards": [
      {
        "title": "Facilitator demo",
        "body": "npm ci\nnpm run doctor\nnpm run verify\nnpm run lesson1 -- MSG-01 --dry-run"
      },
      {
        "title": "Point at the trace",
        "body": "backend: claude-code (claude -p)"
      }
    ],
    "keyPoints": [
      "docs/SETUP.md: Windows, WSL, Linux/macOS or Docker.",
      "npm run doctor checks the backend. npm run verify runs the tests.",
      "A dry run makes no model call."
    ],
    "notes": "Choose the platform instructions in docs/SETUP.md. Run the facilitator commands exactly as in SOLO.md. Point to the backend: line and Claude Code equivalent: line; claude-code is the default, but if ANTHROPIC_API_KEY is set in your shell the runner picks sdk; force one with --backend. A dry run is not model evidence.",
    "stateId": "14:Demo · Step 0: the offline path"
  },
  {
    "lessonId": "workshop-4",
    "title": "Get the workshop package.",
    "kicker": "SOLO 0 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "visual": {
      "bot": "wave",
      "place": "left",
      "oneCol": true,
      "cmdCards": [
        1
      ]
    },
    "subtitle": "Install the repo. Then do a dry run.",
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 0"
      },
      {
        "title": "Workshop repo",
        "body": "git clone https://github.com/RyanLisse/aetherlink-day5-n8n-to-agent.git\ncd aetherlink-day5-n8n-to-agent\nnpm ci"
      }
    ],
    "steps": [
      "Choose your platform in docs/SETUP.md.",
      "Run npm run doctor. Then run npm run verify.",
      "Run npm run lesson1 -- MSG-01 --dry-run. Find the backend: line.",
      "Run npm run chat -- --dry-run."
    ],
    "expected": "verify shows fail 0. The dry run ends with “dry run — no model call”.",
    "keyPoints": [
      "Use docs/SETUP.md for Windows, WSL, Linux/macOS, or Docker.",
      "main is Step 0; step-1 through step-4 contain the finished steps.",
      "With ANTHROPIC_API_KEY in your shell, the runner picks sdk. Use --backend to choose."
    ],
    "notes": "Participants follow docs/SETUP.md, then the exact Step 0 commands in SOLO.md. Confirm npm ci, doctor, verify, and both dry runs finish without ANTHROPIC_API_KEY. The output includes backend: and Claude Code equivalent:. claude-code is the default, but if ANTHROPIC_API_KEY is set in your shell the runner picks sdk; force one with --backend.",
    "stateId": "15:Get the workshop package."
  },
  {
    "lessonId": "workshop-4",
    "title": "What you see · Step 0",
    "kicker": "What you see · Expected output",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step0.png",
      "imageLink": "Terminal: npm run verify passes, then the lesson 1 dry run"
    },
    "subtitle": "Compare your terminal with this screen.",
    "keyPoints": [
      "npm run verify: pass 9, fail 0. Your setup is correct.",
      "Dry run: The last line says: dry run — no model call. That is correct."
    ],
    "cards": [
      {
        "title": "npm run verify",
        "body": "pass 9, fail 0. Your setup is correct."
      },
      {
        "title": "Dry run",
        "body": "The last line says: dry run — no model call. That is correct."
      }
    ],
    "notes": "Show this screen after Step 0. The first line of the dry run shows the backend: claude-code or sdk. A dry run prints the command but does not call the model, so it is not model evidence.",
    "stateId": "16:What you see · Step 0"
  },
  {
    "lessonId": "workshop-4",
    "title": "Short break",
    "kicker": "Day 4 · Break",
    "type": "pause",
    "visual": {
      "countdown": 15,
      "bot": "sleepy",
      "place": "beside"
    },
    "subtitle": "Return in 15 minutes.",
    "cards": [
      {
        "title": "Back at 11:15",
        "body": "Next: Step 1 · structured priority and chat memory."
      }
    ],
    "keyPoints": [
      "Say the return time: 11:15.",
      "Press ▶ Start on the timer.",
      "Check that everyone passed Step 0."
    ],
    "notes": "Say the return time out loud: 11:15. Use the break to help people who did not pass npm run verify in Step 0.",
    "stateId": "17:Short break"
  },
  {
    "lessonId": "workshop-4",
    "title": "System prompt",
    "kicker": "Concept · System prompt",
    "type": "concept",
    "visual": {
      "mdfile": 0,
      "mdName": "CLAUDE.md",
      "guides": [
        [
          "🧩",
          "System Message",
          "lives in the node"
        ],
        [
          "📄",
          "CLAUDE.md",
          "lives next to the code"
        ]
      ]
    },
    "subtitle": "The System Message is now a file next to the code.",
    "cards": [
      {
        "title": "CLAUDE.md",
        "body": "Purpose\nRules\nPriority definitions"
      }
    ],
    "keyPoints": [
      "The system message now lives in a file next to the code."
    ],
    "notes": "n8n text verbatim from day5 n8n/support-triage.json (AI Agent options.systemMessage). SDK: 01-single-agent/options.mjs:8-11 (cwd, settingSources, systemPrompt preset); 01-single-agent/claude-project/CLAUDE.md (Priority definitions l.13-16, Required output l.18-20). day5: src/prompts.ts COORDINATOR_SYSTEM + settingSources: [] in src/agent.ts. Live: Step 1 (tone trap). Visual: concepts/visuals/02-systeemprompt.png (light: visuals/light/02-systeemprompt.png). Detail: CLAUDE.md: Purpose · Rules · Priority definitions · settingSources: ['project'] loads CLAUDE.md · systemPrompt: preset 'claude_code' · Alternative: systemPrompt as a string (day5)",
    "stateId": "18:System prompt"
  },
  {
    "lessonId": "workshop-4",
    "title": "Structured output: parser to JSON schema",
    "kicker": "Concept · structured output",
    "type": "concept",
    "visual": {
      "stagger": "pop",
      "stepThrough": true,
      "cardArt": {
        "3": "route"
      },
      "bot": "think",
      "place": "left",
      "highlight": [
        {
          "in": "subtitle",
          "text": "The Switch stays code",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "The parser becomes a JSON schema. The Switch stays code.",
    "cards": [
      {
        "title": "n8n",
        "body": "Priority Parser"
      },
      {
        "title": "Agent SDK",
        "body": "outputFormat: json_schema"
      },
      {
        "title": "Claude Code",
        "body": "claude -p --json-schema"
      },
      {
        "title": "Route",
        "body": "lib/switch.mjs"
      }
    ],
    "keyPoints": [
      "Structured Output Parser / Priority Parser defines the shape.",
      "outputFormat uses json_schema.",
      "lib/switch.mjs routes the parsed priority."
    ],
    "notes": "Map the Structured Output Parser / Priority Parser to outputFormat with type json_schema and to Claude Code's --json-schema flag. The runner prints structured output, then lib/switch.mjs maps low, medium, and high to a fixed action and team.",
    "stateId": "19:Structured output: parser to JSON schema"
  },
  {
    "lessonId": "workshop-4",
    "title": "Memory is the session",
    "kicker": "Concept · memory",
    "type": "concept",
    "visual": {
      "art": "window",
      "highlight": [
        {
          "in": "subtitle",
          "text": "continues the session",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "npm run chat continues the session. --no-memory starts a new one.",
    "cards": [
      {
        "title": "n8n",
        "body": "Simple Memory keeps your favourite colour."
      },
      {
        "title": "Agent SDK",
        "body": "The chat resumes the last sessionId."
      }
    ],
    "keyPoints": [
      "Simple Memory carries a favourite-colour test across turns.",
      "npm run chat resumes with the previous sessionId.",
      "--no-memory starts each turn without resume."
    ],
    "notes": "The session is the memory in chat: lib/chat.mjs passes resume: sessionId to the next turn unless --no-memory is set. In n8n, the Chat trigger uses Simple Memory; Maarten's favourite-colour test makes the cross-turn behavior visible.",
    "stateId": "20:Memory is the session"
  },
  {
    "lessonId": "workshop-4",
    "title": "Step 1 · Structured priority output and chat memory",
    "kicker": "Explain · one agent",
    "type": "concept",
    "visual": {
      "stagger": "pop",
      "stepThrough": true,
      "bot": "point",
      "place": "left"
    },
    "subtitle": "One agent gives a fixed priority. Code routes it.",
    "cards": [
      {
        "title": "What you build",
        "body": "One agent that returns { priority, reason } as JSON."
      },
      {
        "title": "Why",
        "body": "A schema makes the output predictable. Then code can route it."
      },
      {
        "title": "Done when",
        "body": "The trace shows the JSON and a Switch → line."
      }
    ],
    "keyPoints": [
      "One agent returns a fixed priority. Code routes it."
    ],
    "notes": "Explain Step 1 using the final chain. The n8n Structured Output Parser / Priority Parser maps to outputFormat json_schema, and Switch maps to lib/switch.mjs. Simple Memory maps to session resume in npm run chat; --no-memory starts without resume. The main agent reads the project instructions and supplied message.",
    "stateId": "21:Step 1 · Structured priority output and chat memory"
  },
  {
    "lessonId": "workshop-4",
    "title": "Demo · Step 1: schema, route, and memory",
    "kicker": "Demo · Step 1",
    "type": "concept",
    "visual": {
      "term": [
        {
          "c": "npm run lesson1 -- MSG-01 --dry-run"
        },
        {
          "o": "dry run — no model call"
        },
        {
          "c": "npm run lesson1 -- MSG-01"
        },
        {
          "o": "Switch → low → AUTO_REPLY"
        },
        {
          "c": "npm run chat"
        },
        {
          "o": "resumes the session"
        }
      ]
    },
    "subtitle": "Show the dry run first. Then a live run or the sample trace.",
    "cards": [
      {
        "title": "Offline",
        "body": "npm run lesson1 -- MSG-01 --dry-run"
      },
      {
        "title": "Result",
        "body": "Structured output + Switch → low"
      },
      {
        "title": "Memory",
        "body": "npm run chat"
      }
    ],
    "keyPoints": [
      "Show the dry run first. Then show a live run or the sample trace."
    ],
    "notes": "Run npm run lesson1 -- MSG-01 --dry-run and point out the prompt, options, and Claude Code equivalent. The dry run does not produce model JSON or a Switch → result. Inspect 01-single-agent/priority-schema.mjs, outputFormat in the dry-run options, and lib/switch.mjs offline. Then show a live run (Claude Code login, or --backend sdk with a key) or docs/sample-trace.md explicitly labelled as an illustrative sample; point out Structured output: and Switch → low. Start npm run chat, ask for a favourite colour, then ask for it again to show resumed session memory. Compare with npm run chat -- --no-memory.",
    "stateId": "22:Demo · Step 1: schema, route, and memory"
  },
  {
    "lessonId": "workshop-4",
    "title": "Run Step 1 and test chat memory.",
    "kicker": "SOLO 1 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "multiarm",
      "place": "beside"
    },
    "subtitle": "Do the dry run. Then test the chat with and without memory.",
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 1"
      }
    ],
    "steps": [
      "Run npm run lesson1 -- MSG-01 --dry-run.",
      "Open priority-schema.mjs and lib/switch.mjs.",
      "Run npm run chat. Give a colour. Ask for it again.",
      "Do it again with npm run chat -- --no-memory."
    ],
    "expected": "You can show the schema and the route. You can say why only one chat remembers the colour.",
    "keyPoints": [
      "Do the dry run. Then compare chat with and without memory."
    ],
    "notes": "Give participants 15 minutes. Offline, inspect 01-single-agent/priority-schema.mjs, outputFormat in the dry-run options, and lib/switch.mjs. Do not present dry-run output as model JSON or a Switch → result; show those only from a live run (Claude Code login, or --backend sdk with a key) or docs/sample-trace.md, labelled as an illustrative sample. Then compare a favourite-colour follow-up in the same chat with --no-memory.",
    "stateId": "23:Run Step 1 and test chat memory."
  },
  {
    "lessonId": "workshop-4",
    "title": "What you see · Step 1",
    "kicker": "What you see · Expected output",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step1.png",
      "imageLink": "Sample trace: the agent returns JSON, then the Switch picks a route"
    },
    "subtitle": "Compare your terminal with this screen.",
    "keyPoints": [
      "Structured output: JSON with priority and reason.",
      "Switch line: Switch → low → AUTO_REPLY. Code picks the route, not the model."
    ],
    "cards": [
      {
        "title": "Structured output",
        "body": "JSON with priority and reason."
      },
      {
        "title": "Switch line",
        "body": "Switch → low → AUTO_REPLY. Code picks the route, not the model."
      }
    ],
    "notes": "This is the labelled sample in docs/sample-trace.md. A live run shows the same labels with other text. The [result] line shows turns, time and cost.",
    "stateId": "24:What you see · Step 1"
  },
  {
    "lessonId": "workshop-4",
    "title": "Discuss: what makes the route predictable?",
    "kicker": "Discuss · Step 1",
    "type": "review",
    "visual": {
      "reveal": "click",
      "bot": "peek",
      "place": "slot",
      "faces": [
        "verward",
        "dubbel",
        "eigenwijs"
      ]
    },
    "subtitle": "What does the model decide? What does code decide?",
    "cards": [
      {
        "title": "Schema",
        "body": "Which values can priority have?"
      },
      {
        "title": "Route",
        "body": "Which part picks the next action?"
      },
      {
        "title": "Memory",
        "body": "What changes when the session resumes?"
      }
    ],
    "keyPoints": [
      "The schema constrains the agent's output.",
      "lib/switch.mjs routes the parsed priority.",
      "Chat session resume carries memory across turns."
    ],
    "notes": "Discuss how a schema differs from a routing rule and from chat memory. Ask participants which behavior is model output, which is deterministic code, and which depends on session resume.",
    "stateId": "25:Discuss: what makes the route predictable?"
  },
  {
    "lessonId": "workshop-4",
    "stateId": "w4-context-window",
    "title": "Context: what can the model see?",
    "kicker": "Context · cache · compaction",
    "type": "concept",
    "subtitle": "A session supplies context. It does not provide unlimited memory.",
    "visual": {
      "opener": "sdlc-loop",
      "image": "assets/workshop-4/context-window.svg",
      "imageAlt": "Instructions, loaded files and conversation share the context window. Unread files and customer records remain outside until retrieved. Leave room for the response."
    },
    "cards": [],
    "keyPoints": [
      "Files on disk are not all in context.",
      "Loaded history and tool results use tokens.",
      "Keep room for the response."
    ],
    "notes": "Explain: the context window is the bounded input and output space for a model request. The runtime supplies instructions, loaded files, messages and tool results. Demonstrate /context in Claude Code, not inside npm run chat. Participant: identify the instructions, conversation and tool-output categories in their own session. Check: can the participant distinguish a file that exists from one the agent actually read? Discuss why a customer database and session history are different. Use synthetic data only. The picture is conceptual, not token-scale or a serialized API request. Sources: https://code.claude.com/docs/en/context-window and https://code.claude.com/docs/en/prompt-caching. These are Claude Code examples, not universal behavior for every SDK or n8n provider."
  },
  {
    "lessonId": "workshop-4",
    "stateId": "w4-prompt-cache",
    "title": "Caching: reuse work, not extra memory",
    "kicker": "Context · cache · compaction",
    "type": "concept",
    "subtitle": "A matching cached prefix saves processing. All those tokens still use context.",
    "visual": {
      "opener": "sdlc-loop",
      "image": "assets/workshop-4/prompt-cache.svg",
      "imageAlt": "An earlier request and a later request share an exact prefix. A valid cache reuses that computation; the new exchange is processed. Cached tokens still occupy context space."
    },
    "cards": [],
    "keyPoints": [
      "The prefix match is exact, not semantic.",
      "Cache reads, cache writes and output have different costs.",
      "A cache hit does not enlarge the context window."
    ],
    "notes": "Explain: Claude Code manages server-side prompt caching automatically. A valid matching prefix can be reused; new content still needs processing and may be written to cache. Demonstrate one focused follow-up about an already-read file. If the installed version exposes cache usage, inspect cache_read_input_tokens and cache_creation_input_tokens, or the /usage cache summary. Participant: identify which content stayed unchanged. Check: response speed alone is not proof of a cache hit. If counters are unavailable, record that cache reuse was not measured. Discuss why a warm cache can still contain too much irrelevant history. Lifetime, availability and effort-switch behavior depend on model, provider, version and billing mode. Do not promise fixed savings or keep a session active just for caching. Root and user CLAUDE.md edits reload at /clear, /compact or restart, not immediately. Never delay a safety correction to preserve a cache hit. Sources: https://code.claude.com/docs/en/context-window and https://code.claude.com/docs/en/prompt-caching. These are Claude Code examples, not universal behavior for every SDK or n8n provider."
  },
  {
    "lessonId": "workshop-4",
    "stateId": "w4-context-compaction",
    "title": "Compaction: shorten history, then verify",
    "kicker": "Context · cache · compaction",
    "type": "concept",
    "subtitle": "Try it in Claude Code at a task boundary, not inside the SDK chat.",
    "visual": {
      "opener": "sdlc-loop",
      "image": "assets/workshop-4/context-compaction.svg",
      "imageAlt": "Before compaction: instructions and detailed history. After: unchanged instructions, a shorter summary and room for new work. Check one acceptance criterion and the draft-only boundary against your notes."
    },
    "cards": [],
    "keyPoints": [
      "Write down one criterion and one safety boundary.",
      "Compare /context before and after /compact.",
      "Restore missing requirements before continuing."
    ],
    "notes": "Start with an approved Claude Code session in the synthetic workshop repository after the memory exercise. Explain: compaction replaces history with a shorter summary, not a lossless copy. Demonstrate /context. Participant: save the criterion \"priority must be low, medium or high\" and the boundary \"draft only; a person reviews before any action\" in their own local note. Run /compact Preserve the priority criterion, draft-only boundary and next step. Run /context again, then ask Claude to restate the criterion, boundary and next step. Check each against the saved note. Expected: a summary with the relevant facts, or an explicitly recorded omission. Stop if a requirement is lost: restore the verified facts before any further work. Keep a before/after screenshot with synthetic data and no credentials. Discuss: a cache miss does not erase the supplied context; compaction can lose detail. The conversation cache changes, but unchanged system and reloaded project context can stay cached. Do not claim a specific token reduction in a very short session. If Claude Code is unavailable, record the blocker; a facilitator screenshot is reference only. Sources: https://code.claude.com/docs/en/context-window and https://code.claude.com/docs/en/prompt-caching. These are Claude Code examples, not universal behavior for every SDK or n8n provider."
  },
  {
    "lessonId": "workshop-4",
    "title": "Lunch",
    "kicker": "Day 4 · Lunch",
    "type": "pause",
    "visual": {
      "countdown": 60,
      "bot": "sleepy",
      "place": "beside"
    },
    "subtitle": "Enjoy your lunch.",
    "cards": [
      {
        "title": "Back at 13:00",
        "body": "Next: Step 2 · subagents for risk and the customer reply."
      }
    ],
    "keyPoints": [
      "Lunch: back at 13:00.",
      "Fell behind? Switch to step-1 after lunch.",
      "Check your Claude Code login."
    ],
    "notes": "Say the return time: 13:00. Participants who fell behind can catch up with git switch step-1 after lunch.",
    "stateId": "26:Lunch"
  },
  {
    "lessonId": "workshop-4",
    "title": "Tools",
    "kicker": "Concept · Tools",
    "type": "concept",
    "visual": {
      "fence": 0,
      "highlight": [
        {
          "in": "subtitle",
          "text": "which are allowed",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "In code you say which tools exist and which are allowed.",
    "cards": [
      {
        "title": "Boundaries in code",
        "body": "tools: what exists\nallowedTools: runs without a question\ndisallowedTools: never runs"
      }
    ],
    "keyPoints": [
      "In code you state exactly which tools exist and which are allowed."
    ],
    "notes": "SDK: 01-single-agent/options.mjs:12-13 (tools: [], disallowedTools); 02-subagents/options.mjs:13-15 (tools/allowedTools/disallowedTools); 03-mcp/options.mjs:17-20 (allowedTools incl. mcp__transactions__get_transaction and list_transactions). day5: src/tools.ts COORDINATOR_TOOLS = ['Agent']. Live: Steps 1–3. Visual: concepts/visuals/03-tools.png (light: visuals/light/03-tools.png). Detail: tools: what exists (Lesson 1: [] · Lesson 2: ['Agent','Write']) · allowedTools: what runs without asking · disallowedTools: ['WebSearch','WebFetch','Bash']",
    "stateId": "27:Tools"
  },
  {
    "lessonId": "workshop-4",
    "title": "Subagents",
    "kicker": "Concept · Subagents",
    "type": "concept",
    "visual": {
      "swap": true
    },
    "subtitle": "The orchestrator delegates. Each specialist does one task.",
    "cards": [
      {
        "title": "Orchestrator",
        "body": "Sends the ticket to the specialists."
      },
      {
        "title": "risk-agent",
        "body": "Decides the priority."
      },
      {
        "title": "customer-reply-agent",
        "body": "Writes the draft reply."
      }
    ],
    "keyPoints": [
      "The orchestrator delegates. Each specialist does one task."
    ],
    "notes": "The final chain maps n8n Description to frontmatter description and System Message to the prompt body. Step 2 delegates first to risk-agent, then customer-reply-agent; Step 3 adds customer-context-agent. Claude Code reads the same .claude/agents/*.md files directly.",
    "stateId": "28:Subagents"
  },
  {
    "lessonId": "workshop-4",
    "title": "Where do the agents live?",
    "kicker": "Concept · Agent files",
    "type": "concept",
    "visual": {
      "oneCol": true,
      "stepThrough": true,
      "bot": "point",
      "place": "left",
      "highlight": [
        {
          "in": "subtitle",
          "text": ".claude/agents/",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "One Markdown file per agent, in .claude/agents/.",
    "cards": [
      {
        "title": ".claude/agents/risk-agent.md",
        "body": "From step-2. Claude Code and the SDK load this folder."
      },
      {
        "title": "Name, tools, prompt",
        "body": "The frontmatter gives the name and the tools. The text is the prompt."
      },
      {
        "title": "Not .agents/ · not AGENTS.md",
        "body": "No tool loads .agents/ as subagents. AGENTS.md is a note for coding agents."
      }
    ],
    "keyPoints": [
      "Each agent is one file in .claude/agents/.",
      "The folder starts with a dot. Use ls -a to see it.",
      "main has no agents yet. They come in step-2."
    ],
    "notes": "Show the folder on step-2: git switch step-2, then ls -a and ls .claude/agents. main is Step 0, so it has no .claude/agents yet. Claude Code looks for project subagents in .claude/agents/, walking up from the working folder; the SDK reads the same folder with settingSources: ['project']. A .agents/ folder is not loaded as subagents by Claude Code or the SDK. AGENTS.md is the cross-tool note for coding agents, not a subagent definition. In the assignment the new agents live in 03-mcp/claude-project/.claude/agents/.",
    "stateId": "29:Where do the agents live?"
  },
  {
    "lessonId": "workshop-4",
    "title": "Why this folder? Claude finds the agents.",
    "kicker": "Concept · Agent files · why",
    "type": "concept",
    "visual": {
      "stepThrough": true,
      "bot": "head",
      "place": "beside",
      "highlight": [
        {
          "in": "subtitle",
          "text": "no import, no code",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "Put the file in the folder. Claude loads it: no import, no code.",
    "cards": [
      {
        "title": "1 · Claude Code starts",
        "body": "It reads .claude/agents/ in your project and in ~/.claude/agents/."
      },
      {
        "title": "2 · It reads the description",
        "body": "The description says when to use the agent. Write it clearly."
      },
      {
        "title": "3 · It delegates",
        "body": "A task fits the description. Claude sends it to that agent."
      }
    ],
    "keyPoints": [
      "Claude Code loads the folder by itself.",
      "The description decides when Claude uses the agent.",
      "The SDK reads the same folder with settingSources: ['project']."
    ],
    "notes": "Why this folder: Claude Code and the Agent SDK look for project subagents in .claude/agents/, so you add an agent by adding a file. No registration code. Claude uses each subagent description to decide when to delegate (code.claude.com/docs/en/sub-agents). Show risk-agent.md on step-2: the description line is the trigger. Claude Code also watches the folder: edit the file and the next delegation uses the new version. In our lessons the orchestrator prompt also names the agents, so the order stays fixed. Check it in the trace: [tool_use] Agent → risk-agent.",
    "stateId": "30:Why this folder? Claude finds the agents."
  },
  {
    "lessonId": "workshop-4",
    "title": "Step 2 · Risk analysis and customer reply agents",
    "kicker": "Explain · orchestrator and agents",
    "type": "concept",
    "visual": {
      "stack": [
        "build",
        "why",
        "done"
      ],
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Two agents: one analyses, one writes.",
    "cards": [
      {
        "title": "What you build",
        "body": "An orchestrator that calls risk-agent, then customer-reply-agent."
      },
      {
        "title": "Why",
        "body": "One agent per task. Each prompt stays short."
      },
      {
        "title": "Done when",
        "body": "The trace shows two Agent calls. output/MSG-05.md has the draft."
      }
    ],
    "keyPoints": [
      "risk-agent analyzes and decides the priority.",
      "customer-reply-agent writes the reply draft.",
      "The orchestrator delegates in order and saves a file."
    ],
    "notes": "Explain Step 2. The final names are risk-agent and customer-reply-agent. The orchestrator delegates first to Agent → risk-agent, then Agent → customer-reply-agent. In n8n terms, Description maps to frontmatter description and System Message maps to the prompt body.",
    "stateId": "31:Step 2 · Risk analysis and customer reply agents"
  },
  {
    "lessonId": "workshop-4",
    "title": "Demo · Step 2: trace the two agents",
    "kicker": "Demo · Step 2",
    "type": "concept",
    "visual": {
      "term": [
        {
          "c": "npm run lesson2 -- MSG-05"
        },
        {
          "o": "[tool_use] Agent → risk-agent"
        },
        {
          "o": "[tool_use] Agent → customer-reply-agent"
        },
        {
          "o": "output/MSG-05.md · draft for a person"
        }
      ]
    },
    "subtitle": "Show the dry run first. Then a live run or the sample trace.",
    "cards": [
      {
        "title": "Commands",
        "body": "npm run lesson2 -- MSG-05 --dry-run\nnpm run lesson2 -- MSG-05"
      },
      {
        "title": "Trace",
        "body": "Agent → risk-agent\nAgent → customer-reply-agent"
      }
    ],
    "keyPoints": [
      "Show the dry run first. Then show a live run or the sample trace."
    ],
    "notes": "Run npm run lesson2 -- MSG-05 --dry-run, then run it live (Claude Code login, or --backend sdk with a key). The dry run prints the Claude Code equivalent and setup only; it does not call agents or produce a model result. Show the completed trace or docs/sample-trace.md, explicitly labelled as an illustrative sample. Point out [tool_use] Agent → risk-agent before [tool_use] Agent → customer-reply-agent, then the draft written for human review. The description test shows why n8n Description maps to the agent frontmatter description.",
    "stateId": "32:Demo · Step 2: trace the two agents"
  },
  {
    "lessonId": "workshop-4",
    "title": "Run the orchestrator and inspect the draft.",
    "kicker": "SOLO 2 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {
      "bot": "stretchLeft",
      "place": "pointer",
      "pointAt": 0
    },
    "subtitle": "Find the two agent calls. Then read the draft.",
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 2"
      }
    ],
    "steps": [
      "Run npm run lesson2 -- MSG-05 --dry-run.",
      "In a live run or docs/sample-trace.md, find risk-agent and customer-reply-agent.",
      "After a live run, open output/MSG-05.md.",
      "Read the draft before you use it."
    ],
    "expected": "risk-agent runs before customer-reply-agent. You read the draft.",
    "keyPoints": [
      "Do the dry run. Then read a live run or the sample trace."
    ],
    "notes": "Give participants 20 minutes. A dry run only shows setup and the backend command. The expected live or sample order is Agent → risk-agent followed by Agent → customer-reply-agent; the MSG-10 missing-information path also requires a live run (Claude Code login, or --backend sdk with a key) or the clearly labelled sample trace. Ask them to point to the frontmatter description and prompt body. Keep the output as a draft for human review.",
    "stateId": "33:Run the orchestrator and inspect the draft."
  },
  {
    "lessonId": "workshop-4",
    "title": "What you see · Step 2",
    "kicker": "What you see · Expected output",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step2.png",
      "imageLink": "Sample trace: the orchestrator calls risk-agent, then customer-reply-agent"
    },
    "subtitle": "Compare your terminal with this screen.",
    "keyPoints": [
      "Two Agent calls: First risk-agent, then customer-reply-agent.",
      "The draft: It asks only for the facts that are missing."
    ],
    "cards": [
      {
        "title": "Two Agent calls",
        "body": "First risk-agent, then customer-reply-agent."
      },
      {
        "title": "The draft",
        "body": "It asks only for the facts that are missing."
      }
    ],
    "notes": "This is the labelled MSG-10 sample. In a live run, check each claim in the draft. If no tool gave the fact, the draft must not say it.",
    "stateId": "34:What you see · Step 2"
  },
  {
    "lessonId": "workshop-4",
    "title": "Discuss: which facts came from a tool?",
    "kicker": "Discuss · Step 2",
    "type": "review",
    "visual": {
      "reveal": "click",
      "bot": "peek",
      "place": "slot",
      "faces": [
        "verrast",
        "betrapt"
      ]
    },
    "subtitle": "Where did each fact come from?",
    "cards": [
      {
        "title": "Order",
        "body": "Which agent runs first? Why?"
      },
      {
        "title": "Prompt",
        "body": "Where is the n8n Description now?"
      }
    ],
    "keyPoints": [
      "risk-agent provides the priority and risk analysis.",
      "customer-reply-agent uses the original message and risk-agent result.",
      "A human reviews every draft before it goes to a customer."
    ],
    "notes": "Discuss how the two subagents divide the work. Ask what the orchestrator passes to the reply agent and why the draft remains subject to human review.",
    "stateId": "35:Discuss: which facts came from a tool?"
  },
  {
    "lessonId": "workshop-4",
    "title": "MCP: external data",
    "kicker": "Concept · MCP",
    "type": "concept",
    "visual": {
      "plugs": 0,
      "highlight": [
        {
          "in": "subtitle",
          "text": "sees only what the tool returns",
          "tone": "purple"
        }
      ]
    },
    "subtitle": "The MCP server owns the data. The agent sees only what the tool returns.",
    "cards": [
      {
        "title": "Two MCP servers",
        "body": "customers → get_customer\ntransactions → get_transaction"
      }
    ],
    "keyPoints": [
      "The MCP server owns the data. The agent only sees what the tool returns."
    ],
    "notes": "The customers MCP server reads docs/customer_context.csv and exposes get_customer; the transactions MCP server reads docs/transactions.xlsx and exposes get_transaction. The Agent SDK starts both over stdio. Claude Code reads the equivalent .mcp.json. The W3 export has no HTTP Request node; its n8n side is conceptual. Run npm run smoke:mcp to test the servers without a model.",
    "stateId": "36:MCP: external data"
  },
  {
    "lessonId": "workshop-4",
    "title": "Step 3 · Read-only customer and transaction MCP tools",
    "kicker": "Explain · stdio MCP",
    "type": "concept",
    "visual": {
      "stagger": "pop",
      "stepThrough": true,
      "bot": "head",
      "place": "beside",
      "highlight": [
        {
          "in": "subtitle",
          "text": "cannot change data",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "The agents get facts from tools. They cannot change data yet.",
    "cards": [
      {
        "title": "What you build",
        "body": "Two read-only MCP servers: customers and transactions."
      },
      {
        "title": "Why",
        "body": "The agent takes facts from a tool, not from its memory."
      },
      {
        "title": "Done when",
        "body": "The trace shows both MCP tools."
      }
    ],
    "keyPoints": [
      "The agents get facts from tools. They cannot change data yet."
    ],
    "notes": "Explain Step 3. The customer CSV is read by the customers MCP server and get_customer is assigned to customer-context-agent. transactions.xlsx is read by the transactions MCP server; get_transaction and list_transactions are read-only lookups assigned to risk-agent. Both servers use stdio and return external data. The reply remains a draft for human review before sending.",
    "stateId": "37:Step 3 · Read-only customer and transaction MCP tools"
  },
  {
    "lessonId": "workshop-4",
    "title": "Demo · Step 3: read-only customer and transaction lookups",
    "kicker": "Demo · Step 3",
    "type": "concept",
    "visual": {
      "term": [
        {
          "c": "(cd 03-mcp/transaction-mcp && npm ci)"
        },
        {
          "c": "npm run smoke:mcp"
        },
        {
          "o": "MCP servers verified · no model call"
        },
        {
          "c": "npm run lesson3 -- MSG-08"
        },
        {
          "o": "[tool_use] mcp__customers__get_customer"
        }
      ]
    },
    "subtitle": "Follow each fact from the MCP tool to the agent.",
    "cards": [
      {
        "title": "Setup",
        "body": "(cd 03-mcp/transaction-mcp && npm ci)\nnpm run smoke:mcp"
      },
      {
        "title": "Tools in the trace",
        "body": "mcp__customers__get_customer\nmcp__transactions__get_transaction"
      }
    ],
    "keyPoints": [
      "customer-context-agent calls get_customer.",
      "risk-agent uses get_transaction and list_transactions.",
      "Review the customer-reply-agent draft before sending."
    ],
    "notes": "Run (cd 03-mcp/transaction-mcp && npm ci), then npm run smoke:mcp; it verifies the servers without a model. Demo a live lesson3 customer and transaction lookup, point to both MCP tool traces and the External data: line. Keep the generated reply as a draft for human review. Do not treat dry-run output as model evidence.",
    "stateId": "38:Demo · Step 3: read-only customer and transaction lookups"
  },
  {
    "lessonId": "workshop-4",
    "title": "Run Step 3 customer and transaction lookups.",
    "kicker": "SOLO 3 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {
      "bot": "wave",
      "place": "left"
    },
    "subtitle": "Find the read tools in the trace.",
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 3"
      }
    ],
    "steps": [
      "Once: (cd 03-mcp/transaction-mcp && npm ci).",
      "Run npm run smoke:mcp. It makes no model call.",
      "Run npm run lesson3 -- MSG-08 --dry-run. Find both MCP servers.",
      "In the trace, find get_customer and get_transaction."
    ],
    "expected": "The trace shows both read-only lookups. The draft waits for a person.",
    "keyPoints": [
      "Smoke-test without a model.",
      "Trace get_customer, get_transaction, and list_transactions.",
      "A person reviews the draft before sending."
    ],
    "notes": "Give participants 20 minutes. Start with npm run smoke:mcp, then run the lesson 3 dry run to inspect the MCP configuration. For real results, use a live run (Claude Code login, or --backend sdk with a key). Keep customer and transaction facts tied to the read-only MCP results, and have a person review the reply draft before sending.",
    "stateId": "39:Run Step 3 customer and transaction lookups."
  },
  {
    "lessonId": "workshop-4",
    "title": "What you see · Step 3",
    "kicker": "What you see · Expected output",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step3.png",
      "imageLink": "Terminal: npm run smoke:mcp lists read-only tools and real lookups"
    },
    "subtitle": "Compare your terminal with this screen.",
    "keyPoints": [
      "Read-only tools: list_transactions and get_transaction. No write tools yet.",
      "Last line: MCP servers OK. No model call."
    ],
    "cards": [
      {
        "title": "Read-only tools",
        "body": "list_transactions and get_transaction. No write tools yet."
      },
      {
        "title": "Last line",
        "body": "MCP servers OK. No model call."
      }
    ],
    "notes": "smoke:mcp starts both MCP servers and calls each tool once. CUST-999 does not exist, so the tool says so. That is correct.",
    "stateId": "40:What you see · Step 3"
  },
  {
    "lessonId": "workshop-4",
    "title": "Discuss: tools and external data.",
    "kicker": "Discuss · Step 3",
    "type": "review",
    "visual": {
      "reveal": "click",
      "bot": "peek",
      "place": "slot",
      "faces": [
        "dubbel",
        "blij"
      ]
    },
    "subtitle": "When does the agent need a tool?",
    "cards": [
      {
        "title": "Facts",
        "body": "Which facts came from a tool?"
      },
      {
        "title": "Review",
        "body": "Who reads the draft before it is sent?"
      }
    ],
    "keyPoints": [
      "Use get_customer for customer context.",
      "Use get_transaction or list_transactions for transaction facts.",
      "A person reviews reply drafts before they are sent."
    ],
    "notes": "Discuss when each lookup tool is needed and which facts came from customer_context.csv or transactions.xlsx. The tool result is external data. All customer and transaction tools are read-only; a person reviews the reply draft before it is sent.",
    "stateId": "41:Discuss: tools and external data."
  },
  {
    "lessonId": "workshop-4",
    "title": "Fixed workflow vs. dynamic agent",
    "kicker": "Concept · Workflows",
    "type": "concept",
    "layout": "compare",
    "visual": {
      "pairs": true,
      "highlight": [
        {
          "in": "subtitle",
          "text": "A person at the end",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "Code where it must. The agent where it may. A person at the end.",
    "columns": [
      {
        "title": "Fixed workflow",
        "items": [
          "You draw each path",
          "Rules, money, compliance"
        ]
      },
      {
        "title": "Dynamic agent",
        "items": [
          "The agent picks the tool",
          "Open questions"
        ]
      }
    ],
    "keyPoints": [
      "Code where it must. The agent chooses where it may. Always a human at the end."
    ],
    "notes": "The n8n Switch rules are fixed: priority equals low, medium, or high. In the final participant chain, lib/switch.mjs maps structured priority to a fixed action and check.mjs validates labels. The Step 2 orchestrator dynamically delegates to specialist agents. Discuss: when do you choose a fixed route or agent delegation?",
    "stateId": "42:Fixed workflow vs. dynamic agent"
  },
  {
    "lessonId": "workshop-4",
    "title": "Step 4 · Acceptance table and npm run check",
    "kicker": "SOLO 4 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "think",
      "place": "left"
    },
    "subtitle": "A fixed check says if the agent is right. The model does not grade itself.",
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 4"
      }
    ],
    "steps": [
      "Fill the acceptance table for MSG-01, 05, 07, 08 and 09.",
      "Take the facts from get_customer and get_transaction.",
      "Run npm run check. The first run makes labels.json.",
      "Fill labels.json. Run npm run check again.",
      "Save the table in participant-output/."
    ],
    "expected": "npm run check passes. The table is saved.",
    "keyPoints": [
      "A fixed check tells you if the agent is right. The model does not grade itself."
    ],
    "notes": "Give participants 15 minutes to complete the acceptance table and run npm run check. Save the acceptance table and check results in participant-output/ or the squad's intent.md. A dry run is not model evidence.",
    "stateId": "43:Step 4 · Acceptance table and npm run check"
  },
  {
    "lessonId": "workshop-4",
    "title": "What you see · Step 4",
    "kicker": "What you see · Expected output",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step4.png",
      "imageLink": "Terminal: the first npm run check creates labels.json"
    },
    "subtitle": "Compare your terminal with this screen.",
    "keyPoints": [
      "First run: Created labels.json. This is not an error.",
      "Next: Write low, medium or high for each message. Run npm run check again."
    ],
    "cards": [
      {
        "title": "First run",
        "body": "Created labels.json. This is not an error."
      },
      {
        "title": "Next",
        "body": "Write low, medium or high for each message. Run npm run check again."
      }
    ],
    "notes": "The first run exits with code 1 because labels.json is empty. After the participants fill in the labels, npm run check compares their labels with the expected priority.",
    "stateId": "44:What you see · Step 4"
  },
  {
    "lessonId": "workshop-4",
    "title": "Short break",
    "kicker": "Day 4 · Break",
    "type": "pause",
    "visual": {
      "countdown": 15,
      "bot": "sleepy",
      "place": "beside"
    },
    "subtitle": "Return in 15 minutes.",
    "cards": [
      {
        "title": "Back at 15:00",
        "body": "Next: the assignment · extend the MCP with tools, agents and hooks."
      }
    ],
    "keyPoints": [
      "Say the return time: 15:00.",
      "Press ▶ Start on the timer.",
      "Fell behind? Switch to step-4."
    ],
    "notes": "Say the return time: 15:00. The assignment starts from step-4. Participants who fell behind switch to step-4 now.",
    "stateId": "45:Short break"
  },
  {
    "lessonId": "workshop-4",
    "title": "Assignment · Extend the MCP",
    "kicker": "Explain · Assignment",
    "type": "concept",
    "visual": {
      "stagger": "pop",
      "stepThrough": true,
      "bot": "multiarm",
      "place": "beside"
    },
    "subtitle": "A real agent changes data. Do the core first.",
    "cards": [
      {
        "title": "Core · 35 min",
        "body": "Write tools on a working copy. A hook for each write."
      },
      {
        "title": "Stretch · optional",
        "body": "A drafts tool, a fraud check and a question to a person."
      }
    ],
    "keyPoints": [
      "Core: Part 1 and Part 2.",
      "Stretch: Part 3 and Part 4.",
      "Step 3 stays read-only. Writes go to a working copy."
    ],
    "notes": "The room target is the core: Part 1 and Part 2. Fast squads do the stretch, the rest can do it at home. npm run check:assignment reports core and stretch apart; it exits 0 when the core passes. Explain the final assignment. Step 3 stays read-only. The assignment adds add_transaction, update_transaction and delete_transaction to the transactions MCP server. These tools write only to participant-output/transactions.working.json; docs/transactions.xlsx does not change. A new drafts MCP server adds save_reply_draft: it writes the reply draft to participant-output/drafts/. Participants make transaction-agent and fraud-check-agent, add rules to CLAUDE.md, write the PreToolUse and PostToolUse hooks, and run the npm run resolve workflow. npm run reset:mcp removes the working copy and the drafts.",
    "stateId": "46:Assignment · Extend the MCP"
  },
  {
    "lessonId": "workshop-4",
    "title": "Control: hooks and approval",
    "kicker": "Concept · Control",
    "type": "concept",
    "layout": "compare",
    "visual": {
      "stepThrough": true,
      "highlight": [
        {
          "in": "subtitle",
          "text": "before",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "A rule or a person decides before a tool changes data.",
    "columns": [
      {
        "title": "n8n · Workshop 3",
        "items": [
          "IF node: check first",
          "Wait node: wait for approval"
        ]
      },
      {
        "title": "Agent SDK · Workshop 4",
        "items": [
          "PreToolUse hook: allow, ask or deny",
          "A person reads each draft"
        ]
      }
    ],
    "keyPoints": [
      "A human or a rule decides before a tool changes anything."
    ],
    "notes": "Hooks run in both backends: the SDK hooks option and .claude/settings.json for Claude Code. In the assignment a PreToolUse hook allows reads, auto-allows small updates and asks a person before large updates, adds and deletes; a PostToolUse hook writes the audit log. Human review still applies to every reply draft. permissionMode maps to --permission-mode.",
    "stateId": "47:Control: hooks and approval"
  },
  {
    "lessonId": "workshop-4",
    "title": "Not every agent has every tool",
    "kicker": "Explain · Permissions",
    "type": "concept",
    "subtitle": "Tool access does not give an agent human authority.",
    "cards": [
      {
        "title": "Limit the tools",
        "body": "Give each agent only the tools its task needs. The core customer and transaction tools read facts."
      },
      {
        "title": "Check before execution",
        "body": "A permission check can deny a requested tool call. A check after execution cannot undo that action."
      },
      {
        "title": "Review the draft",
        "body": "A person checks the facts and proposed reply. Tool access does not approve a refund or send a reply."
      }
    ],
    "keyPoints": [
      "Each agent gets only the tools it needs.",
      "A requested tool call is not an executed action.",
      "Read-only context does not authorize a customer action.",
      "A person reviews every draft."
    ],
    "notes": "Inspect the configured tools before the run. The current core package reads customer and transaction context; it does not grant permission to change a payment or send a reply. Ask the participant to identify the requested tool, its permitted scope and the human review decision. Keep the removed Anatomy illustration out of this route. The bounded-loop diagram earlier in the deck distinguishes pre-execution permission checks from post-tool checks.",
    "stateId": "48:Not every agent has every tool"
  },
  {
    "lessonId": "workshop-4",
    "title": "Quiz: who may change a transaction?",
    "kicker": "Assignment · Quiz",
    "type": "quiz",
    "visual": {
      "quiz": {
        "answer": 1
      },
      "bot": "stretchLeft",
      "place": "pointer",
      "pointAt": 1
    },
    "subtitle": "Which agent may call update_transaction?",
    "cards": [
      {
        "title": "A",
        "body": "risk-agent"
      },
      {
        "title": "B",
        "body": "transaction-agent"
      },
      {
        "title": "C",
        "body": "customer-reply-agent"
      },
      {
        "title": "D",
        "body": "The orchestrator"
      }
    ],
    "check": "Answer: B",
    "keyPoints": [
      "Vote first.",
      "Answer: B.",
      "The orchestrator delegates; it does not write."
    ],
    "notes": "Vote first. The answer is B. Only transaction-agent has the write tools in its list. The orchestrator has no write tools in allowedTools, so it must delegate. customer-reply-agent only has save_reply_draft.",
    "stateId": "49:Quiz: who may change a transaction?"
  },
  {
    "lessonId": "workshop-4",
    "title": "When does the hook ask?",
    "kicker": "Explain · Hook triggers",
    "type": "concept",
    "visual": {
      "stamps": [
        "ALLOW",
        "ASK",
        "DENY"
      ],
      "bot": "head",
      "place": "stamps",
      "stepThrough": true
    },
    "subtitle": "The hook gives one of three answers.",
    "cards": [
      {
        "title": "ALLOW",
        "body": "A read, a draft, or an update below 100."
      },
      {
        "title": "ASK",
        "body": "An update of 100 or more, an add, or a delete."
      },
      {
        "title": "DENY",
        "body": "A fraud hold, or the answer N. Report ESCALATE."
      }
    ],
    "keyPoints": [
      "Reads, drafts and small updates do not ask.",
      "Large updates, adds and deletes ask a person.",
      "No person to ask means deny."
    ],
    "notes": "Read the cards one by one. The threshold is one constant: AUTO_APPROVE_TRANSACTION_AMOUNT = 100 in 03-mcp/hooks/transaction-guard.mjs. In interactive claude the hook returns ask and Claude Code shows the prompt. When fraud-check-agent says medium, or a fact is missing, the orchestrator asks the person with AskUserQuestion. Under claude -p, or in the SDK without a terminal, no person can answer: the write is denied. A denied write is final: the agent reports it and stops.",
    "stateId": "50:When does the hook ask?"
  },
  {
    "lessonId": "workshop-4",
    "title": "Demo · Assignment: one write, three outcomes",
    "kicker": "Demo · Assignment",
    "type": "concept",
    "visual": {
      "term": [
        {
          "c": "npm run check:assignment"
        },
        {
          "c": "npm run hook:demo -- small"
        },
        {
          "o": "TX-1002 49.99 · Decision allow"
        },
        {
          "c": "npm run hook:demo -- large"
        },
        {
          "o": "TX-1007 899 · Decision ask"
        }
      ]
    },
    "subtitle": "One write, three outcomes.",
    "cards": [
      {
        "title": "Check",
        "body": "npm run check:assignment"
      },
      {
        "title": "Small and large",
        "body": "npm run hook:demo -- small\nnpm run hook:demo -- large"
      }
    ],
    "keyPoints": [
      "npm run check:assignment lists the core items on step-4.",
      "MSG-07 shows ask, allow and deny.",
      "MSG-08 and MSG-09 show hold and ask."
    ],
    "notes": "Run npm run check:assignment on step-4 and read the hints. Switch to the solution. Run npm run hook:demo -- small: the hook allows the update of TX-1002 (49.99) with no question. Run npm run resolve -- MSG-07 and answer y: the working copy changes, audit.jsonl gets one line and drafts/MSG-07.md is saved. Run npm run reset:mcp. Run MSG-07 again and answer N: the agent reports the denied write and stops. Run MSG-08: fraud-check-agent says hold, so no write. Run MSG-09: the customer and the transaction do not match, so the orchestrator asks you with AskUserQuestion.",
    "stateId": "51:Demo · Assignment: one write, three outcomes"
  },
  {
    "lessonId": "workshop-4",
    "title": "Where you change what · core",
    "kicker": "Explain · Where and why",
    "type": "concept",
    "visual": {
      "oneCol": true,
      "stepThrough": true,
      "bot": "point",
      "place": "left"
    },
    "subtitle": "Four files. Each has one job and one reason.",
    "cards": [
      {
        "title": "transaction-mcp/server.js",
        "body": "Add the write tools. Why: they write to a working copy, not to the workbook."
      },
      {
        "title": ".claude/agents/transaction-agent.md",
        "body": "Give this agent get, update and add. Why: only one agent writes."
      },
      {
        "title": "CLAUDE.md",
        "body": "Who writes, and when to stop. Why: the orchestrator must delegate."
      },
      {
        "title": "hooks/transaction-guard.mjs",
        "body": "Code decides each write. Why: the model cannot skip a hook."
      }
    ],
    "keyPoints": [
      "Tools go in the MCP servers.",
      "Agents go in .claude/agents/.",
      "Each agent gets only its tools.",
      "CLAUDE.md gives the rules.",
      "The hook makes the decision in code.",
      "The workflow fixes the order."
    ],
    "notes": "Show each file in the editor. server.js gets add_transaction, update_transaction and delete_transaction; they write to participant-output/transactions.working.json. drafts-server.js gets save_reply_draft; it writes participant-output/drafts/MSG-0N.md. The agent files list the tools for each agent. The SDK agents definition uses the same tool lists.\n\nCLAUDE.md is advice to the model: the model can make a mistake. The tools list and the hook are code: the model cannot go around them. The SDK loads the hook through the hooks option. Claude Code loads the same file through .claude/settings.json. resolve.mjs runs lookup, fraud check, update, hook and draft in a fixed order.",
    "stateId": "52:Where you change what · core"
  },
  {
    "lessonId": "workshop-4",
    "title": "What you see · Assignment start",
    "kicker": "What you see · Expected output",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-asg-start.png",
      "imageLink": "Terminal: check:assignment on step-4 lists the core items to fix"
    },
    "subtitle": "Compare your terminal with this screen.",
    "keyPoints": [
      "Core · Parts 1–2: 14 to fix. Each line names one file and one change.",
      "Stretch · Parts 3–4: 20 open. These are optional. Do the core first."
    ],
    "cards": [
      {
        "title": "Core · Parts 1–2: 14 to fix",
        "body": "This is the start. Each line names one file and one change."
      },
      {
        "title": "Stretch: 20 open",
        "body": "These are optional. Do the core first."
      }
    ],
    "notes": "Show this before the participants start. Red at the start is correct. They fix one line at a time and run the check again.",
    "stateId": "53:What you see · Assignment start"
  },
  {
    "lessonId": "workshop-4",
    "title": "What good looks like: core",
    "kicker": "Assignment · Expected output",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/10-good-offline.png",
      "imageLink": "Terminal: check:assignment passes the core, the small update is allowed, the large update asks"
    },
    "subtitle": "Compare your terminal with this screen.",
    "cards": [
      {
        "title": "check:assignment",
        "body": "Core · Parts 1–2: passed."
      },
      {
        "title": "hook:demo small",
        "body": "Decision allow."
      },
      {
        "title": "hook:demo large",
        "body": "Decision ask."
      }
    ],
    "keyPoints": [
      "check:assignment says: Core · Parts 1–2: passed.",
      "hook:demo small: Decision allow. No question.",
      "hook:demo large: Decision ask. The reason shows amount and limit."
    ],
    "notes": "Show this screen after the participants run npm run check:assignment and npm run hook:demo -- small and -- large. These checks run offline and need no key. If check:assignment fails, read the hints: each hint names a file. The fixtures do not call the tool and do not change data.",
    "stateId": "54:What good looks like: core"
  },
  {
    "lessonId": "workshop-4",
    "title": "Assignment core: write tools and a hook.",
    "kicker": "SOLO 6 · Core · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 35,
    "visual": {
      "bot": "multiarm",
      "place": "beside"
    },
    "subtitle": "Do the core first.",
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 6 · Core"
      }
    ],
    "steps": [
      "Add the write tools to server.js.",
      "Make transaction-agent. Give it get, update and add.",
      "Add the write rules to CLAUDE.md.",
      "Write the hook in hooks/transaction-guard.mjs.",
      "Run npm run check:assignment."
    ],
    "expected": "check:assignment says Core passed. A large write asks a person.",
    "keyPoints": [
      "Core first: Part 1 and Part 2.",
      "Only transaction-agent writes.",
      "A denied write is final."
    ],
    "notes": "Give participants 45 minutes. They work on step-4. npm run check:assignment runs without a model and shows what is missing. The solution branch has the reference answer. A live run needs a Claude Code login or --backend sdk with a key. Run npm run reset:mcp after each test.",
    "stateId": "55:Assignment core: write tools and a hook."
  },
  {
    "lessonId": "workshop-4",
    "title": "What good looks like: stretch",
    "kicker": "Assignment · Expected output",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/11-good-live.png",
      "imageLink": "Terminal: MSG-07 denied write, MSG-08 fraud hold, MSG-09 AskUserQuestion"
    },
    "subtitle": "Stretch: three tickets, three safe stops.",
    "cards": [
      {
        "title": "MSG-07 · answer N",
        "body": "The hook denies. The agent stops."
      },
      {
        "title": "MSG-08 · fraud",
        "body": "Hold. ESCALATE. No write."
      },
      {
        "title": "MSG-09 · mismatch",
        "body": "The agent asks a person."
      }
    ],
    "keyPoints": [
      "Stretch: three tickets, three safe stops."
    ],
    "notes": "These are real runs on the solution branch. The model words can differ, but the stops must be the same. Check participant-output/audit.jsonl: each applied write and each saved draft has one line. A denied write adds no line. After MSG-07 with y, a draft is in participant-output/drafts/MSG-07.md and starts with DRAFT. Run npm run reset:mcp to start again.",
    "stateId": "56:What good looks like: stretch"
  },
  {
    "lessonId": "workshop-4",
    "title": "Where you change what · stretch",
    "kicker": "Explain · Where and why",
    "type": "concept",
    "visual": {
      "oneCol": true,
      "stepThrough": true,
      "bot": "think",
      "place": "left"
    },
    "subtitle": "Three more files. Do them after the core passes.",
    "cards": [
      {
        "title": "transaction-mcp/drafts-server.js",
        "body": "Add save_reply_draft. Why: a person reads the draft before it goes out."
      },
      {
        "title": ".claude/agents/fraud-check-agent.md",
        "body": "A read-only agent that runs before each write. Why: a fraud hold stops the write."
      },
      {
        "title": "resolve.mjs",
        "body": "The workflow and AskUserQuestion. Why: the same safe order runs every time."
      }
    ],
    "keyPoints": [
      "save_reply_draft writes to participant-output/drafts/.",
      "fraud-check-agent only reads. Hold or high means ESCALATE.",
      "Only the orchestrator has AskUserQuestion."
    ],
    "notes": "Stretch only. drafts-server.js gives customer-reply-agent one tool, save_reply_draft. The draft starts with \"DRAFT - a person reviews this before sending\". fraud-check-agent reads the customer and the transaction and returns fraud_risk and hold; with hold or high the workflow writes nothing and reports ESCALATE. resolve.mjs runs the fixed order: look up, fraud check, propose, hook, draft. AskUserQuestion is for the orchestrator only; subagents cannot use it. With no terminal, the question becomes ESCALATE.",
    "stateId": "57:Where you change what · stretch"
  },
  {
    "lessonId": "workshop-4",
    "title": "Assignment stretch: drafts, fraud check, a question.",
    "kicker": "SOLO 6 · Stretch · optional",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "subtitle": "Only when the core passes.",
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 6 · Stretch"
      }
    ],
    "steps": [
      "Add save_reply_draft and fraud-check-agent.",
      "Give each agent only its tools.",
      "Add AskUserQuestion and npm run resolve.",
      "Run npm run resolve -- MSG-07."
    ],
    "expected": "Assignment check passed. A denied write stops the run.",
    "keyPoints": [
      "Stretch only after the core passes.",
      "Each agent gets only its tools.",
      "A denied write stops the run."
    ],
    "visual": {
      "bot": "stretchLeft",
      "place": "pointer",
      "pointAt": 0
    },
    "notes": "Optional stretch, only after check:assignment says Core passed. Parts 3–4: save_reply_draft, fraud-check-agent, AskUserQuestion and npm run resolve. Show MSG-07 with the answer N: the hook denies and the run stops.",
    "stateId": "58:Assignment stretch: drafts, fraud check, a question."
  },
  {
    "lessonId": "workshop-4",
    "title": "Discuss: who can change data, and when?",
    "kicker": "Discuss · Assignment",
    "type": "review",
    "visual": {
      "reveal": "click",
      "bot": "peek",
      "place": "slot",
      "faces": [
        "verward",
        "eigenwijs",
        "blij"
      ]
    },
    "subtitle": "Who may change data, and when?",
    "cards": [
      {
        "title": "Tools",
        "body": "Which agent needs write tools?"
      },
      {
        "title": "Limit",
        "body": "Which amount needs a person?"
      },
      {
        "title": "Place",
        "body": "CLAUDE.md, tools list or hook?"
      }
    ],
    "keyPoints": [
      "Which agent needs write tools?",
      "Which writes need a person?",
      "Where do you put the rule?"
    ],
    "notes": "Ask each squad for one answer per card. A rule in CLAUDE.md is advice to the model. A tools list and a hook are code: the model cannot go around them. In n8n, the Wait node and the IF node do this work.",
    "stateId": "59:Discuss: who can change data, and when?"
  },
  {
    "lessonId": "workshop-4",
    "title": "Step 5 · Build your own agent",
    "kicker": "Explain · Step 5 · homework",
    "type": "concept",
    "visual": {
      "hero": 0,
      "stepThrough": true,
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Homework. Build a small agent from zero.",
    "cards": [
      {
        "title": "What you build",
        "body": "An agent that finds and fixes a bug in utils.js."
      },
      {
        "title": "Why",
        "body": "You write the loop yourself: prompt, tools, result."
      },
      {
        "title": "Done when",
        "body": "You can name the prompt, the tools and the result."
      }
    ],
    "keyPoints": [
      "Homework, or after 15:50 if you have time. Build a small agent from zero."
    ],
    "notes": "Explain the final Step 5 in the step-4 branch. The starter is 05-build-your-own/agent.mjs. Participants identify the prompt, allowed tools, and result handling.",
    "stateId": "60:Step 5 · Build your own agent"
  },
  {
    "lessonId": "workshop-4",
    "title": "Demo · Step 5: run the starter",
    "kicker": "Demo · Step 5",
    "type": "concept",
    "visual": {
      "term": [
        {
          "c": "cd 05-build-your-own"
        },
        {
          "c": "node agent.mjs --dry-run"
        },
        {
          "o": "dry run — no model call"
        },
        {
          "c": "claude -p \"Find and fix the bug in utils.js.\" --allowedTools Read,Edit,Glob"
        }
      ]
    },
    "subtitle": "Show the dry run. Then the Claude Code command.",
    "cards": [
      {
        "title": "From step-4",
        "body": "cd 05-build-your-own\nnode agent.mjs --dry-run"
      },
      {
        "title": "Claude Code",
        "body": "claude -p \"Find and fix the bug in utils.js.\" --allowedTools Read,Edit,Glob"
      }
    ],
    "keyPoints": [
      "The dry run makes no model call.",
      "The CLI command uses Read, Edit, and Glob.",
      "The permission mode accepts edits within that scope."
    ],
    "notes": "Run the exact Step 5 demo commands from SOLO.md. Point out that the dry run is not model evidence and then show the Claude Code equivalent command.",
    "stateId": "61:Demo · Step 5: run the starter"
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · build your own agent",
    "kicker": "SOLO 5 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {
      "bot": "wave",
      "place": "beside"
    },
    "subtitle": "Run the starter. Then explain the tool call.",
    "cards": [
      {
        "title": "Level",
        "body": "SOLO 5"
      }
    ],
    "steps": [
      "Run git switch step-4.",
      "Follow 05-build-your-own/README.md.",
      "Run node agent.mjs --dry-run.",
      "Find the prompt, the tools and the result."
    ],
    "expected": "You can show the prompt, the tool call and the result.",
    "keyPoints": [
      "Follow the starter README.",
      "Keep model calls optional.",
      "Explain the tool-use and result messages."
    ],
    "notes": "Give participants 15–20 minutes. Keep the API key optional: without a model call they can use the dry run; participants with a Claude Code login can use the equivalent CLI command.",
    "stateId": "62:Your turn · build your own agent"
  },
  {
    "lessonId": "workshop-4",
    "title": "What you see · Step 5",
    "kicker": "What you see · Expected output",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step5.png",
      "imageLink": "Terminal: the Step 5 starter prints the Claude Code command"
    },
    "subtitle": "Compare your terminal with this screen.",
    "keyPoints": [
      "Claude Code equivalent: The prompt, the allowed tools and the permission mode.",
      "Your change: Change the prompt or the tools. Run the dry run again and compare."
    ],
    "cards": [
      {
        "title": "Claude Code equivalent",
        "body": "The prompt, the allowed tools and the permission mode."
      },
      {
        "title": "Your change",
        "body": "Change the prompt or the tools. Run the dry run again and compare."
      }
    ],
    "notes": "The starter has three tools: Read, Edit and Glob. acceptEdits lets the agent edit files without a question. Use it only in a test folder.",
    "stateId": "63:What you see · Step 5"
  },
  {
    "lessonId": "workshop-4",
    "title": "Skills",
    "kicker": "Concept · optional",
    "type": "concept",
    "visual": {
      "tree": 0,
      "stepThrough": true,
      "bot": "head",
      "place": "beside"
    },
    "subtitle": "Optional. A skill is a recipe. Claude loads it when it fits.",
    "cards": [
      {
        "title": "Where it lives",
        "body": ".claude/skills/<name>/SKILL.md"
      }
    ],
    "keyPoints": [
      "Optional. A skill is a recipe that Claude loads when it fits. No step uses it."
    ],
    "notes": "NOT in the exercise: neither repo has .claude/skills or the skills option. Concept only. Source: docs.claude.com/en/docs/agent-sdk/skills ('Extend agents with skills'): skills are SKILL.md files, loaded via settingSources, model-invoked, scoped with the skills option; no programmatic API like agents. No live step. Visual: concepts/visuals/07-skills.png (light: visuals/light/07-skills.png).",
    "stateId": "64:Skills"
  },
  {
    "lessonId": "workshop-4",
    "title": "Close: keep a human in the loop.",
    "kicker": "Done when · bridge to Workshop 5",
    "type": "recap",
    "layout": "recap",
    "visual": {
      "levelUp": true,
      "bot": "happy",
      "place": "beside"
    },
    "items": [
      {
        "label": "Structured output",
        "caption": "A JSON schema. Code routes."
      },
      {
        "label": "Least privilege",
        "caption": "Only transaction-agent writes."
      },
      {
        "label": "Hooks + a person",
        "caption": "Large writes ask. A deny is final."
      },
      {
        "label": "Next: Workshop 5",
        "caption": "Build your own agent."
      }
    ],
    "notes": "Close with the chat-in/chat-out assignment: npm run chat -- --lesson 3, or claude from the repository. Bridge from this agent loop to Workshop 5.",
    "stateId": "65:Close: keep a human in the loop."
  }
];
