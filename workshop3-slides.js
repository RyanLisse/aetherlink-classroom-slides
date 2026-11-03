/* Imported from RyanLisse/aetherlink-academy-app @ b491cc0187b948a9717186fa9d2cb3f79dbc59ca
 * Source: apps/web/src/deck/workshop3-slides.ts. Authored content retained; image paths adapted. */
'use strict';
window.SLIDES = [
  {
    "title": "You used an agent. Today you open it up.",
    "kicker": "WORKSHOP 3 · WHY TODAY",
    "subtitle": "In Claude Code the agent loop ran inside a terminal. Today you build that loop yourself, on a canvas where every step is visible.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-intro/agent-opened-up.jpg",
      "imageLink": "n8n · one agent, opened up: model, memory, tools and output parser",
      "stagger": "pop",
      "stepThrough": true,
      "highlight": [
        {
          "in": "subtitle",
          "text": "every step is visible",
          "tone": "orange"
        }
      ]
    },
    "cards": [
      {
        "title": "Day 1 and 2: you used one",
        "body": "Claude Code observed, decided, acted and checked for you. You saw the result, not each step inside the loop."
      },
      {
        "title": "Day 3: you build one, visually",
        "body": "In n8n the trigger, the AI Agent, its memory, its tools and its checks are nodes. You can open each one and read what went in and what came out."
      },
      {
        "title": "Day 4: you build one in code",
        "body": "The same agent, written with the Claude Agent SDK. Today's canvas becomes your blueprint."
      }
    ],
    "tagline": "First see how an agent works. Then decide what your team should build.",
    "keyPoints": [
      "Day 1 quote: 'using an agent, not building one (yet)'",
      "Today is the 'yet'",
      "n8n makes the loop visible",
      "Day 4 turns the same design into code"
    ],
    "notes": "Connect to Day 1, slide 'Claude Code as an agentic tool': we said you were using an agent, not building one yet. Today is the 'yet'. In Claude Code the loop (observe, decide, act, check) happened inside the tool; you only saw the outcome. In n8n you draw the same parts yourself and every run shows the data at every step. That makes n8n a learning tool: you can see what an agent does and why. And it is a prototyping tool: in an hour you can test whether an agent idea works for your team, before anyone writes code. Day 4 builds the same thing with the Claude Agent SDK."
  },
  {
    "title": "Why n8n?",
    "kicker": "WORKSHOP 3 · WHY N8N",
    "subtitle": "We use n8n for two jobs: to learn how agents work, and to prototype one for your team.",
    "type": "concept",
    "layout": "compare",
    "visual": {
      "stepThrough": true
    },
    "columns": [
      {
        "title": "To learn agents",
        "items": [
          "Every part of an agent is a node you can open",
          "Every run shows the data at every step",
          "You watch agency grow: rules, one Agent, specialists",
          "You see exactly where the human gate sits"
        ]
      },
      {
        "title": "To prototype",
        "items": [
          "Test an agent idea in an hour, without writing code",
          "Start with plain rules; add AI only where rules fail",
          "Runs on your own server, so customer data stays in-house",
          "A working canvas is the blueprint for Day 4's code"
        ]
      }
    ],
    "tagline": "AI does the steps. People decide where the workflow stops for a human.",
    "keyPoints": [
      "Visual: the whole flow on one canvas",
      "Low-code, code when needed",
      "Self-hosting keeps data in-house",
      "Links to last week: a workflow with a human checkpoint"
    ],
    "notes": "Two jobs, two columns. Left: n8n as a learning tool. An agent is hard to understand when it runs inside a terminal; on a canvas you see its parts and every run's data. Right: n8n as a prototyping tool. Before a team invests in code, they can test in an hour whether an agent idea holds up, with real-looking tickets and a human gate. Then answer the question the room is asking: why not just ask ChatGPT to sort the inbox? Because then you cannot see, check or repeat what happened. In n8n every ticket's route is visible and logged, plain rules handle the easy cases, AI is added only where rules fail, and a person approves before anything reaches a customer. Left column: general reasons. It's visual, so anyone on the team can follow a workflow; it's low-code but lets you drop into JavaScript or Python when needed; it can be self-hosted, which matters for a company like Worldline where data should stay inside; and AI is just one node among normal integrations. Right column: why here. Last week ended with a workflow that chains skills, tools and a human checkpoint. n8n is where that becomes something that runs on its own and that the team can see, reuse and change."
  },
  {
    "title": "What you know from Claude Code, as nodes",
    "kicker": "WORKSHOP 3 · DAY 1–2 → N8N",
    "subtitle": "Every idea from the first two days has a place on today's canvas.",
    "type": "concept",
    "layout": "matrix",
    "visual": {
      "stepThrough": true,
      "highlight": [
        {
          "in": "tagline",
          "text": "you can open it and read it",
          "tone": "orange"
        }
      ]
    },
    "matrix": {
      "columns": [
        "In Claude Code",
        "In n8n today",
        "Level"
      ],
      "rows": [
        {
          "title": "Rules",
          "sub": "no judgment",
          "cells": [
            "A test or a hook: a fixed check",
            "A Switch node",
            "L1"
          ]
        },
        {
          "title": "Agent loop",
          "sub": "observe, decide, act, check",
          "cells": [
            "Claude Code itself",
            "The AI Agent node",
            "L2"
          ]
        },
        {
          "title": "Instructions",
          "sub": "how to work",
          "cells": [
            "CLAUDE.md and skills",
            "The Agent's prompt and System Message",
            "L2"
          ]
        },
        {
          "title": "Memory",
          "sub": "what carries over",
          "cells": [
            "The context window and memory",
            "Simple Memory",
            "L2"
          ]
        },
        {
          "title": "Checked output",
          "sub": "evidence, not confidence",
          "cells": [
            "A test that must pass",
            "Parse Decision: one of three labels",
            "L2"
          ]
        },
        {
          "title": "Subagents",
          "sub": "one job each",
          "cells": [
            "Bobby, the level-checker, in its own context",
            "Customer Reply and Risk agents",
            "L3"
          ]
        },
        {
          "title": "Workflow",
          "sub": "steps chained",
          "cells": [
            "/build-game-levels: skills, test, Bobby",
            "Agents that call each other",
            "L3+"
          ]
        },
        {
          "title": "You decide",
          "sub": "human in the loop",
          "cells": [
            "You approve and you merge",
            "A human gate before any reply",
            "L1–L3"
          ]
        }
      ]
    },
    "tagline": "Same ideas, new view: in n8n every part is a node, and you can open it and read it.",
    "keyPoints": [
      "Nothing today is new as an idea",
      "What is new: you see it happen",
      "Rules first (L1), then judgment (L2), then specialists (L3)",
      "The human decision never moves to the machine"
    ],
    "notes": "This is the map for the whole day. Read one row at a time and ask the room where they met it on Day 1 or 2. The point: nothing today is a new idea. A rule is like a test or a hook; the AI Agent node is the agent loop; the prompt and System Message play the role of CLAUDE.md and skills; Simple Memory is what carries over between messages; Parse Decision forces one of three labels; the L3 specialists are subagents with one job each, like Bobby; and agents that call each other are a workflow, like /build-game-levels. The difference is that in n8n you see each part and its data. Come back to this slide whenever a level adds a node."
  },
  {
    "lessonId": "workshop-3",
    "title": "One ticket. Three agency levels.",
    "kicker": "Workshop 3 · Day 3 · L1→L3",
    "type": "concept",
    "visual": {
      "art": "stairs",
      "stepKeys": true
    },
    "subtitle": "One ticket workflow, built up step by step. Each step keeps what works and adds one new idea.",
    "keyPoints": [
      "Same tickets, same labels, every step",
      "Start without an LLM: know what rules can do",
      "Add the agent only where rules break",
      "Specialists, orchestration and data come last",
      "A human approves before any reply"
    ],
    "notes": "Open the climb. We build one ticket workflow five times. Step 1: no LLM at all, a Switch with keyword rules; it works until someone writes \"I paid two times\". Step 2: the same workflow with an AI Agent that reads meaning. Step 3: split the work into Reply and Risk specialists, like Bobby on Day 2. Step 4: let the specialists consult each other before they answer the orchestrator. Step 5: give the agents a Data Table and let them create, read, update and delete rows. The labels and the human gate never change. Rhythm all day: explain, demonstrate, participants try, discuss. Goal ≥L2; stretch L3+. Workshop 4 keeps the labels, specialist split, and human review gate while teaching one Agent SDK agent, subagents, and MCP transaction lookup.",
    "layout": "steps",
    "items": [
      {
        "label": "Rules, no LLM",
        "caption": "L1. A Switch sorts on keywords. Predictable, until a customer uses other words."
      },
      {
        "label": "The same flow, with an agent",
        "caption": "L2. An AI Agent reads what the customer means."
      },
      {
        "label": "Subagents",
        "caption": "L3. Reply and Risk specialists, one job each."
      },
      {
        "label": "Agents that consult",
        "caption": "L3+. The Reply Agent asks the Risk Agent first."
      },
      {
        "label": "Data Tables and CRUD",
        "caption": "Agents read and write rows: create, read, update, delete."
      }
    ]
  },
  {
    "lessonId": "workshop-3",
    "title": "Ticket in. Low / Med / High out.",
    "kicker": "Vehicle · one ticket · three levels",
    "type": "context",
    "visual": {
      "bot": "wave",
      "place": "beside"
    },
    "subtitle": "Keep one n8n ticket in view while routing it to Low, Med, or High.",
    "keyPoints": [
      "One ticket.",
      "Three labels.",
      "Optional reply at L3."
    ],
    "cards": [
      {
        "title": "Input",
        "body": "Start with the shared ticket fixture."
      },
      {
        "title": "Output",
        "body": "Return a Low, Med, or High label."
      }
    ],
    "notes": "The vehicle. Ticket in → Low/Med/High out (+ optional reply at L3). Point at local n8n (run npm install once in training-lab/w3-n8n-triage; on Windows this can take 15–25 minutes, so do it before the workshop, then npm run n8n) or the optional workshop instance + screenshot pack under /workshop-3/. No vehicle = fail the through-line. Soft: AET-84 starter JSON when ready — does not block today."
  },
  {
    "lessonId": "workshop-3",
    "title": "Automation is not an agent.",
    "kicker": "Explain · why the ladder",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "L1 is a business rule; agent judgment starts at L2.",
    "keyPoints": [
      "L1 has no LLM.",
      "L2 adds an AI Agent and memory.",
      "A human gate stays before done."
    ],
    "cards": [
      {
        "title": "L1 · Rules",
        "body": "Route the ticket without an LLM."
      },
      {
        "title": "L2 · Judgment",
        "body": "A bounded AI Agent drafts priority."
      }
    ],
    "notes": "Explain. L1 = business rule without LLM. L2 = judgment (one AI Agent + memory). L3 = specialists (Reply + Risk). Human gate before “done” / customer-facing.",
    "tagline": "Day 1 bridge: an agent observes, decides, acts and checks in a loop. A rule only follows one path."
  },
  {
    "lessonId": "workshop-3",
    "title": "Same tickets all day.",
    "kicker": "Scenario · shared fixture",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "A shared fixture keeps expected labels stable as agency increases.",
    "keyPoints": [
      "Reuse the fixture.",
      "Keep the expected label visible.",
      "No production writes or secrets on screen."
    ],
    "cards": [
      {
        "title": "Examples",
        "body": "Use at least three example tickets."
      },
      {
        "title": "Expected",
        "body": "Record the expected Low / Med / High label."
      }
    ],
    "notes": "Shared fixture. ≥3 example tickets with expected L/M/H. Workshop 4 uses new messages. No prod writes. Secrets off screen."
  },
  {
    "lessonId": "workshop-3",
    "title": "L1 is a Switch — no LLM.",
    "kicker": "Explain · L1 · deterministic routing",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Route each ticket with deterministic Switch rules, without an LLM.",
    "keyPoints": [
      "Use deterministic rules.",
      "Cover the branches.",
      "Show the error path."
    ],
    "cards": [
      {
        "title": "Input",
        "body": "Read the ticket fields."
      },
      {
        "title": "Branches",
        "body": "Route to Low, Med, or High."
      }
    ],
    "notes": "Explain — L1 Switch / rules. Ticket → Switch → L/M/H. No LLM. Cover input, branches, and error path.",
    "tagline": "Day 1 bridge: like your Snake test and hook, a Switch checks the same way every time."
  },
  {
    "lessonId": "workshop-3",
    "title": "Watch: L1 Switch routes the ticket.",
    "kicker": "Demo · L1",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-3/01-n8n.jpeg",
      "imageLink": "n8n · L1 Switch"
    },
    "notes": "Demo — L1. Facilitator walks screenshot 01-n8n.jpeg or live import. Room watches; does not build yet. Script: open flow → show Switch branches → run one fixture ticket → label matches."
  },
  {
    "lessonId": "workshop-3",
    "title": "Build or inspect L1 on your machine.",
    "kicker": "L1 · Your turn",
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
        "body": "L1"
      }
    ],
    "steps": [
      "Run the flow.",
      "Match the fixture label.",
      "Note the steps.",
      "Ask a human to confirm the branch."
    ],
    "expected": "The flow runs, its label matches the fixture, the steps are noted, and a human confirms the branch before L2.",
    "subtitle": "Run or inspect the deterministic L1 flow and hold the human gate before L2.",
    "keyPoints": [
      "Run the L1 flow.",
      "Match the expected label.",
      "Confirm the branch with a human."
    ],
    "notes": "Your turn — L1 on your machine. Timer: 15 min. Checklist: (1) flow runs (2) label matches fixture (3) steps noted (4) human confirms branch. Gate before L2 — required."
  },
  {
    "title": "What is an agent?",
    "kicker": "WORKSHOP 3 · BEFORE L2",
    "subtitle": "L1 follows the rules you wrote. An agent chooses its next step itself.",
    "type": "concept",
    "visual": {
      "hero": 0,
      "popOut": 1,
      "stepThrough": true,
      "chipIcons": [
        "▶",
        "↻",
        "■",
        "✋"
      ],
      "highlight": [
        {
          "in": "card:0",
          "text": "works toward a goal",
          "tone": "orange"
        }
      ]
    },
    "cards": [
      {
        "title": "Definition",
        "body": "An AI agent works toward a goal by gathering context, choosing actions, using tools and checking results."
      },
      {
        "title": "It can",
        "body": "continue\nadjust\nstop\nask for human input"
      },
      {
        "title": "In n8n",
        "body": "One AI Agent node with four parts: a Chat Model to think, a System Message to guide it, Tools to act, and Memory to remember."
      }
    ],
    "tagline": "Day 1 bridge: the same definition as Claude Code. Today you build the agent instead of using it.",
    "keyPoints": [
      "Same definition as Day 1",
      "Goal, not a fixed path",
      "Model, instructions, tools, memory",
      "It may ask a human: that is a feature"
    ],
    "notes": "Contrast with L1 first: the Switch follows a path you drew, so it fails on 'I paid two times'. An agent gets a goal (give this ticket the right priority) and decides itself how to get there. Read the definition, then pop the four things it can do; stress that asking a human is part of the design, not a failure. Close with the third card: in n8n an agent is one node with four inputs you can see. Point back to the opening screenshot: Chat Model, Memory, Tools, Output Parser."
  },
  {
    "title": "The agentic loop",
    "kicker": "WORKSHOP 3 · BEFORE L2",
    "subtitle": "A loop, not a line. The agent goes round until the goal is met, or it stops and asks.",
    "type": "concept",
    "layout": "steps",
    "visual": {
      "stepKeys": true,
      "art": "loop",
      "loopCaptions": true
    },
    "items": [
      {
        "label": "Observe",
        "caption": "Read the ticket and what memory holds: WL-1026, “I was charged twice”."
      },
      {
        "label": "Decide",
        "caption": "Choose the next step: is the priority clear, or does it need the Risk Agent or a customer lookup?"
      },
      {
        "label": "Act",
        "caption": "Call a tool: a specialist agent, a Data Table or another app."
      },
      {
        "label": "Check",
        "caption": "Read the result. Is the answer one of the three labels: low, medium or high?"
      },
      {
        "label": "Repeat or stop",
        "caption": "Not done: go round again. Done: return the answer and stop at the human gate."
      }
    ],
    "tagline": "In n8n you can watch this loop: every model and tool call appears in the AI Agent's logs in Executions.",
    "keyPoints": [
      "Same five steps as Day 1",
      "One ticket, several rounds",
      "Tools are how it acts",
      "Check is where the parser helps",
      "Stop means: hand over to a human"
    ],
    "notes": "Same loop as Day 1, same five words; now follow one ticket round it. Observe: the ticket plus memory. Decide: the model picks the next action, which is the step a Switch cannot do. Act: a tool call, such as a specialist agent or a Data Table lookup. Check: read the result; Parse Decision makes this concrete, because the answer must be one of three labels. Repeat or stop: an agent may go round several times, and when it stops it hands over to the human gate. After L2 runs, open Executions, click the AI Agent node and show its logs: each round of the loop is visible there."
  },
  {
    "lessonId": "workshop-3",
    "title": "L2 adds one AI Agent with memory.",
    "kicker": "Explain · L2 · judgment enters",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "One bounded AI Agent drafts priority while a human reviews it.",
    "keyPoints": [
      "Same ticket chain.",
      "Agent drafts priority.",
      "Human review before sending."
    ],
    "cards": [
      {
        "title": "Agent",
        "body": "Add one bounded AI Agent to the same chain."
      },
      {
        "title": "Memory",
        "body": "Keep the existing ticket context."
      }
    ],
    "notes": "Explain — L2. Same chain + one bounded AI Agent. Agent drafts priority; human reviews. Capture trace/settings. OpenAI node in screenshots OK — day 4 swaps stack.",
    "tagline": "Day 1 bridge: this node is the agent loop you used in Claude Code, now on the canvas."
  },
  {
    "lessonId": "workshop-3",
    "title": "Watch: L2 Agent drafts priority.",
    "kicker": "Demo · L2",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-3/02-n8n.jpeg",
      "imageLink": "n8n · L2 AI Agent + memory"
    },
    "notes": "Demo — L2. Screenshot 02-n8n.jpeg or live. Show Agent + memory, draft priority, human review pause. Room watches."
  },
  {
    "lessonId": "workshop-3",
    "title": "Reach L2 on your own machine.",
    "kicker": "L2 · Your turn · solo bar",
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
        "body": "L2"
      }
    ],
    "steps": [
      "Record an AI run.",
      "Have a human review the priority.",
      "Prevent silent auto-send.",
      "Start the Proof fields."
    ],
    "expected": "An AI run is recorded, a human reviews the priority, auto-send stays off, and Proof fields are started.",
    "subtitle": "Record one AI run and make the human review visible before anything is sent.",
    "keyPoints": [
      "Record the AI run.",
      "Review the priority with a human.",
      "Keep auto-send off."
    ],
    "notes": "Your turn — L2. Solo bar = ≥L2 required. Timer: 20 min. Checklist: (1) AI run recorded (2) human reviewed priority (3) no silent auto-send (4) Proof fields started."
  },
  {
    "lessonId": "workshop-3",
    "title": "L3 splits Reply and Risk.",
    "kicker": "Explain · L3 · specialists · one gate",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "L3 separates Reply and Risk specialists but keeps one human gate.",
    "keyPoints": [
      "Split the specialist roles.",
      "Document who does what.",
      "Keep the human gate before done."
    ],
    "cards": [
      {
        "title": "Reply",
        "body": "Draft a customer-facing reply."
      },
      {
        "title": "Risk",
        "body": "Assess risk or priority."
      }
    ],
    "notes": "Explain — L3. Split reply vs risk/priority; orchestrate; document who does what; human gate before done. Stretch — not required for solo bar.",
    "tagline": "Day 2 bridge: like Bobby the level-checker, each specialist has one job. It reports; it approves nothing."
  },
  {
    "lessonId": "workshop-3",
    "title": "Watch: L3 specialists, one gate.",
    "kicker": "Demo · L3",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-3/03-n8n.jpeg",
      "imageLink": "n8n · L3 Reply + Risk"
    },
    "notes": "Demo — L3. Screenshot 03-n8n.jpeg or live. Stretch demo — not required for solo bar. Name two roles and the human gate."
  },
  {
    "lessonId": "workshop-3",
    "title": "Stretch L3 — same tickets.",
    "kicker": "L3 · Your turn · optional",
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
        "body": "L3"
      }
    ],
    "steps": [
      "Name two specialist roles.",
      "Produce a joint output.",
      "Make the human gate explicit."
    ],
    "expected": "Two specialist roles produce a joint output with an explicit human gate.",
    "subtitle": "Stretch the same tickets into two specialist roles with one explicit human gate.",
    "keyPoints": [
      "Name the two roles.",
      "Show their joint output.",
      "Keep the human gate explicit."
    ],
    "notes": "Your turn — L3 stretch (optional). Timer: 15 min. Checklist: (1) two roles named (2) joint output (3) human gate explicit."
  },
  {
    "title": "Subagents talk before they report back",
    "kicker": "L3+ · ORCHESTRATION",
    "subtitle": "The orchestrator asks one specialist. That specialist asks another, and only then answers.",
    "type": "concept",
    "layout": "steps",
    "visual": {
      "stepKeys": true,
      "bot": "point",
      "place": "beside"
    },
    "items": [
      {
        "label": "Orchestrator",
        "caption": "The main AI Agent reads WL-1026 and asks the Customer Reply Agent for a draft."
      },
      {
        "label": "Customer Reply Agent",
        "caption": "Before writing, it calls the Risk Agent, which is wired as its own tool."
      },
      {
        "label": "Risk Agent",
        "caption": "Returns a risk note to the Reply Agent: double charge, complaint risk, escalate today."
      },
      {
        "label": "Customer Reply Agent",
        "caption": "Writes a reply that matches the risk note, so it promises nothing the risk does not support."
      },
      {
        "label": "Orchestrator",
        "caption": "Gets one answer back, sets the priority, and stops at the human gate."
      }
    ],
    "tagline": "Day 2 bridge: /build-game-levels chained skills, a test and Bobby. Here the agents chain each other.",
    "keyPoints": [
      "One question in, one answer out",
      "The specialists talk in between",
      "Wiring decides who may ask whom",
      "The orchestrator never sees the risk call",
      "The human gate stays at the end"
    ],
    "notes": "This is multi-agent orchestration. In flat L3 the orchestrator calls every specialist itself. Here the Customer Reply Agent has the Risk Agent as its own tool, so the specialists consult each other before anything goes back to the orchestrator. Walk the five steps with the arrow key. Then open the Executions view of the demo workflow: the Risk Agent's call appears inside the Reply Agent's run, not inside the orchestrator's. The point to land: who may talk to whom is decided by the wiring on the canvas, not by the prompt. Be precise about what n8n does: agents call each other as tools, one request and one answer at a time; there is no open chat between them.",
    "lessonId": "workshop-3"
  },
  {
    "lessonId": "workshop-3",
    "title": "Let subagents consult each other",
    "kicker": "L3+ · Your turn · stretch",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "subtitle": "Rewire your L3 so the Reply Agent asks the Risk Agent before it answers the orchestrator.",
    "repo": {
      "label": "Download the L3+ orchestration workflow",
      "url": "assets/day3-orchestration/n8n-triage-l3-orchestration.json"
    },
    "cards": [
      {
        "title": "Wiring",
        "body": "Risk Agent: Tool output into Customer Reply Agent\nCustomer Reply Agent: Tool output into AI Agent"
      }
    ],
    "steps": [
      "Open your L3 workflow, or import the download and add your own OpenAI credential to the three Chat Models.",
      "Drag the Risk Agent's connection from the AI Agent to the Tool input of the Customer Reply Agent.",
      "In the Reply Agent's System Message, tell it to ask the Risk Agent before it writes, and to end with a line that starts with Risk note:.",
      "Run WL-1026. Open Executions and find the Risk Agent's call inside the Customer Reply Agent's run.",
      "Compare with flat L3: what changed in the reply?"
    ],
    "expected": "The reply ends with a Risk note line, and the Risk Agent's call appears inside the Customer Reply Agent's run in Executions.",
    "keyPoints": [
      "Rewire, do not rebuild",
      "Wiring decides who may ask whom",
      "Find the nested call in Executions",
      "Human gate stays at the end"
    ],
    "notes": "Stretch for fast groups. The only structural change from L3 is one connection: the Risk Agent's Tool output moves from the orchestrator to the Customer Reply Agent. The downloadable workflow already has this wiring and updated system messages; participants add their own OpenAI credential. Proof is the nested call in Executions plus the Risk note line in the reply. Never paste an API key into the workflow."
  },
  {
    "lessonId": "workshop-3",
    "title": "Give the agent data: Data Table CRUD",
    "kicker": "Data · Your turn · stretch",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "subtitle": "Store each reviewed ticket in a Data Table, then read it, update it and delete it again.",
    "cards": [
      {
        "title": "Table",
        "body": "Name: tickets\nColumns: ticket_id, message, priority, status"
      },
      {
        "title": "CRUD",
        "body": "Create: Insert row\nRead: Get row(s)\nUpdate: Update row(s)\nDelete: Delete row(s)"
      }
    ],
    "steps": [
      "Open Data tables in n8n and create a table named tickets with the columns ticket_id, message, priority and status.",
      "Create: after the human gate, add a Data table node with Insert row. Map ticket_id, message and priority, and set status to new.",
      "Read: add a Data table node with Get row(s) and filter on ticket_id = WL-1026. Check the row in the output.",
      "Update: add Update row(s) for the same ticket_id and set status to reviewed.",
      "Delete: add Delete row(s) for the same ticket_id to clean up the test row.",
      "Run once, then open the table: which step changed which row?"
    ],
    "expected": "WL-1026 is inserted with status new, read back, updated to reviewed, and deleted again; each step shows its row in the output.",
    "keyPoints": [
      "Create, read, update, delete",
      "One table, four Data table operations",
      "Write only after the human gate",
      "Delete your test rows"
    ],
    "notes": "Stretch: the agent workflow gets its own storage. Data tables are built into n8n, so no database or credential is needed. Insert row is Create, Get row(s) is Read, Update row(s) is Update and Delete row(s) is Delete. Put the Insert after the human gate: nothing is stored before a person approved the priority. Proof is the four outputs plus the table view. In a later step a Customer Context Agent can use Get row(s) as a tool to look customers up."
  },
  {
    "lessonId": "workshop-3",
    "title": "Proof is not vibes.",
    "kicker": "Explain · export · rules · gate",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "A working flow, export or screenshot, and short routing explanation make the result checkable.",
    "keyPoints": [
      "Show the working flow.",
      "Explain the routing rules.",
      "Keep labels for day 4 to rerun."
    ],
    "cards": [
      {
        "title": "Working flow",
        "body": "Leave the flow runnable."
      },
      {
        "title": "Proof pack",
        "body": "Capture an export or screenshot."
      }
    ],
    "notes": "Explain — Proof. Working flow + export/screenshot + short routing explanation. Same labels day 4 will re-run."
  },
  {
    "lessonId": "workshop-3",
    "title": "Export your Proof pack before you leave.",
    "kicker": "Proof · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "cards": [
      {
        "title": "Pack",
        "body": "Proof"
      }
    ],
    "steps": [
      "Capture a screenshot or export.",
      "Write the L/M/H rules in one paragraph.",
      "Name the human gate.",
      "Record the level reached."
    ],
    "expected": "The Proof pack includes an export or screenshot, routing rules, a named human gate, and the level reached.",
    "subtitle": "Capture what ran and leave the routing rules and human gate in a checkable Proof pack.",
    "keyPoints": [
      "Capture the flow.",
      "Explain the L/M/H rules.",
      "Name the gate and level."
    ],
    "notes": "Your turn — Proof pack on your machine before you leave. Timer: 10 min. Checklist: (1) screenshot/export (2) L/M/H rules in one paragraph (3) human gate named (4) level reached."
  },
  {
    "lessonId": "workshop-3",
    "title": "Workshop 4 takes this pattern to the Agent SDK.",
    "kicker": "Bridge · → Workshop 4",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Workshop 4 keeps the labels, specialist split, and human gate while teaching three Agent SDK lessons.",
    "keyPoints": [
      "Keep the same priority labels.",
      "Keep the specialist split and human review gate.",
      "Learn one agent, subagents, and MCP."
    ],
    "cards": [
      {
        "title": "Keep",
        "body": "Carry labels, specialist roles, and human review forward."
      },
      {
        "title": "Learn",
        "body": "Start with one agent, then subagents, then MCP."
      }
    ],
    "notes": "Bridge. Workshop 4 carries the LOW, MEDIUM, and HIGH labels, the specialist split, and the human review gate into the Claude Agent SDK. The three lessons are one agent with CLAUDE.md, an orchestrator with subagents, and MCP transaction lookup. Workshop 4 uses new messages and a separate workbook."
  },
  {
    "lessonId": "workshop-3",
    "title": "Your own n8n. No prod.",
    "kicker": "Guardrails",
    "type": "concept",
    "visual": {
      "bot": "head",
      "place": "beside"
    },
    "subtitle": "Keep the exercise on local n8n or the workshop instance and show evidence for model runs.",
    "keyPoints": [
      "Use local n8n or the workshop instance.",
      "Never show secrets.",
      "An import alone is not model-run proof."
    ],
    "cards": [
      {
        "title": "No production writes",
        "body": "Do not connect real Jira or payments."
      },
      {
        "title": "Protect secrets",
        "body": "Keep credentials off screen."
      }
    ],
    "notes": "Guardrails. No real Jira/payments; no secrets on screen; import ≠ model-run proof without trace."
  },
  {
    "lessonId": "workshop-3",
    "title": "L1 rules. L2 judgment. L3 specialists.",
    "kicker": "Done when · ladder recap",
    "type": "recap",
    "layout": "recap",
    "visual": {
      "recapKeys": true
    },
    "items": [
      {
        "label": "L1 · Rules",
        "caption": "Deterministic routing without an LLM."
      },
      {
        "label": "L2 · Judgment",
        "caption": "One AI Agent drafts priority; a human reviews."
      },
      {
        "label": "L3 · Specialists",
        "caption": "Reply and Risk share one human gate."
      },
      {
        "label": "Proof",
        "caption": "Export or screenshot plus routing rules on /workshop/3."
      }
    ],
    "notes": "Close. Recap L1 rules · L2 judgment · L3 specialists. Outline ≠ Linear Done. Linear Done = live /workshop/3 + Proof AC (export/screenshot + routing rules). Rhythm held: uitleg → voordoen → zelf doen."
  }
];
