/* Imported from RyanLisse/aetherlink-academy-app @ b491cc0187b948a9717186fa9d2cb3f79dbc59ca
 * Source: apps/web/src/deck/workshop3-slides.ts. Adapted locally into the full Day 3 classroom route; see tools/SESSION-SOURCES.md. */
'use strict';
window.SLIDES = [
  {
    "title": "Welcome to Day 3!",
    "kicker": "AETHERLINK × WORLDLINE · DAY 3",
    "subtitle": "",
    "type": "context",
    "visual": {
      "opener": "welcome",
      "bot": "wave",
      "place": "beside"
    },
    "keyPoints": [
      "On screen as people arrive",
      "Warm welcome once seated",
      "Keep it to a few sentences"
    ],
    "notes": "Have this on screen while people walk in. Once everyone is seated, give a warm welcome back: keep it to a few sentences."
  },
  {
    "title": "What do you remember from last week?",
    "kicker": "DAY 3 · RECAP",
    "subtitle": "Without looking back, explain:",
    "type": "recap",
    "tagline": "Answer from memory first, no peeking.",
    "visual": {
      "reveal": "click",
      "bot": "peek",
      "place": "slot",
      "noReact": true
    },
    "cards": [
      {
        "title": "What are the steps of our working method?",
        "body": ""
      },
      {
        "title": "What goes in CLAUDE.md, and what in settings.json?",
        "body": ""
      },
      {
        "title": "What is a skill, and why make one?",
        "body": ""
      },
      {
        "title": "What does MCP connect Claude to?",
        "body": ""
      },
      {
        "title": "Where does the human stay in charge?",
        "body": ""
      }
    ],
    "keyPoints": [
      "Cold retrieval, no looking back",
      "Open one question per click",
      "Let the room answer first",
      "Last question leads into today"
    ],
    "notes": "Cold retrieval: make people answer without looking at last week's slides. Open one question per click and let the room answer before you add anything. The last question is the bridge to today: n8n is about workflows, and a good workflow has clear places where a person decides."
  },
  {
    "title": "Today in n8n",
    "kicker": "DAY 3 · OVERVIEW",
    "subtitle": "Monday, 08:00. Two hundred support tickets, and one of them is urgent. Today we build the workflow that finds it.",
    "type": "context",
    "visual": {
      "bot": "wave",
      "place": "left",
      "dayRoute": [
        "Welcome",
        "Recap",
        "Introductions",
        "n8n tour",
        "First workflow + share",
        "L1 Switch + share",
        "Chat + memory",
        "L2 Agent + parser + share",
        "L3 specialists + Data Tables + share",
        "Final build + share",
        "Proof",
        "Reflect"
      ]
    },
    "cards": [
      {
        "title": "The problem",
        "body": "WL-1026, “I was charged twice”, sits at number 147 in the inbox. Someone has to read every ticket to find it."
      },
      {
        "title": "Today's build",
        "body": "One ticket flow in n8n: rules first, then an AI Agent, then specialists. A person approves before any customer gets a reply."
      }
    ],
    "keyPoints": [
      "Open with the inbox: 200 tickets, one urgent",
      "Goal: the right priority, fast, with a human gate",
      "Jessy’s introduction leads the full route",
      "Grow the same ticket flow from rules to specialists",
      "End with Proof and reflection"
    ],
    "notes": "Tell the story first. A support team at a payment company starts the week with a full inbox; the ticket that matters most is buried. Today we build the workflow that reads every ticket and gives it a priority, and we add intelligence one step at a time: plain rules (L1), one AI Agent (L2), specialists (L3). A machine never answers a customer on its own; a person approves. Then walk the route below. Set the route for one combined Day 3 without promising clock times. Jessy leads the introduction, the n8n tour, and the first workflow. Pause for screen sharing after the first workflow, L1, L2, L3, and the final build. Use one ticket to move from deterministic rules to bounded judgment and three specialist roles. Keep human review visible throughout. Close with Proof and reflection."
  },
  {
    "title": "The team of Aetherlink",
    "kicker": "DAY 3 · TEAM",
    "subtitle": "We are what we do.",
    "type": "context",
    "visual": {
      "opener": "team",
      "stagger": "pop"
    },
    "cards": [
      {
        "title": "Jessy The",
        "body": ""
      },
      {
        "title": "Constance van der Vlist",
        "body": ""
      },
      {
        "title": "Maarten Nauw",
        "body": ""
      },
      {
        "title": "Ryan Lisse",
        "body": ""
      }
    ],
    "keyPoints": [
      "Who is here today",
      "One sentence each",
      "Keep it short"
    ],
    "notes": "Name who from the Aetherlink team is here today and what they do, one sentence each. Remove anyone who isn't in the room."
  },
  {
    "title": "Introducing myself",
    "kicker": "DAY 3 · TEAM",
    "subtitle": "Who is teaching you n8n today.",
    "type": "context",
    "visual": {
      "stagger": "pop",
      "stepThrough": true,
      "bot": "wave",
      "place": "beside"
    },
    "cards": [
      {
        "title": "Who I am",
        "body": ""
      },
      {
        "title": "What I do",
        "body": ""
      },
      {
        "title": "How I use n8n",
        "body": ""
      }
    ],
    "keyPoints": [
      "Who you are",
      "What you do",
      "Your own n8n story",
      "Keep it under two minutes"
    ],
    "notes": "Introduce yourself: who you are, what you do, and one concrete thing you have built or automated with n8n. A real example of your own makes the next slides land better."
  },
  {
    "title": "Introduce yourself",
    "kicker": "DAY 3 · PARTICIPANTS",
    "subtitle": "Give the room a short picture of who you are and what success means today.",
    "type": "practice",
    "visual": {
      "bot": "wave",
      "place": "beside",
      "stagger": "pop",
      "stepThrough": true
    },
    "cards": [
      {
        "title": "You",
        "body": "Name\nRole\nn8n experience"
      },
      {
        "title": "Today",
        "body": "What do you want to get out of today?\nWhat would a successful outcome look like for you?"
      }
    ],
    "keyPoints": [
      "Keep each introduction short",
      "Listen for experience levels",
      "Capture desired outcomes",
      "Use the answers to adjust the pace"
    ],
    "notes": "Invite each participant to share their name, role, n8n experience, what they want from today, and what a successful outcome would look like. Keep the round short. Use the answers to adjust the pace and examples."
  },
  {
    "title": "How many of you have ever worked with n8n?",
    "kicker": "DAY 3 · WARM-UP",
    "subtitle": "",
    "type": "context",
    "visual": {
      "opener": "ask",
      "bot": "multiarm",
      "place": "beside"
    },
    "keyPoints": [
      "Ask literally, let hands go up",
      "Say roughly how many you see",
      "Follow-up: Zapier, Make, Power Automate?",
      "Adjust tour pace to room"
    ],
    "notes": "Ask it literally and let the hands go up; say roughly how many you see. Follow-up question: who has used another automation tool, like Zapier, Make or Power Automate? Those people will recognise the idea quickly. Use the answer to set the pace of the tour."
  },
  {
    "title": "What is n8n?",
    "kicker": "DAY 3 · N8N",
    "subtitle": "Where our ticket flow will live: steps that run on their own, across the tools you already use.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-intro/ticket-workflow.jpg",
      "imageLink": "n8n · a ticket workflow: trigger → ticket → rule → low / medium / high",
      "stagger": "pop",
      "stepThrough": true,
      "highlight": [
        {
          "in": "subtitle",
          "text": "run on their own",
          "tone": "orange"
        }
      ]
    },
    "cards": [
      {
        "title": "A workflow",
        "body": "The route a ticket takes, drawn on a canvas from left to right."
      },
      {
        "title": "A trigger",
        "body": "What starts it: a new ticket, a chat message, a form, a schedule, a webhook."
      },
      {
        "title": "Nodes",
        "body": "Each step is a node: read the ticket, check a rule, ask an AI model, set the priority."
      },
      {
        "title": "Connections",
        "body": "Ready-made integrations for inboxes and ticket systems, plus HTTP and code when you need more."
      }
    ],
    "tagline": "A ticket arrives → n8n runs the steps → the priority lands where your team works.",
    "keyPoints": [
      "Workflow = chain of steps",
      "Trigger starts it",
      "Each step is a node",
      "Many integrations built in",
      "Say it: 'n-eight-n'"
    ],
    "notes": "n8n (say 'n-eight-n', short for 'nodemation') is a workflow automation tool. You build a workflow on a canvas: a trigger starts it, and each node after it does one step, like reading a spreadsheet, calling an app, asking an AI model or choosing a path with an IF. Data flows from node to node. It has hundreds of ready-made integrations, and when one is missing you use the HTTP Request node or a Code node. Keep the tagline as the one-line definition, and tie every card back to the inbox: this is where the ticket flow from the opening will run."
  },
  {
    "title": "You used an agent. Today you open it up.",
    "kicker": "DAY 3 · WHY TODAY",
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
    "kicker": "DAY 3 · N8N",
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
    "kicker": "DAY 3 · DAY 1–2 → N8N",
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
            "If and Switch nodes",
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
            "The Agent's System Message",
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
            "Structured Output Parser",
            "L2"
          ]
        },
        {
          "title": "Subagents",
          "sub": "one job each",
          "cells": [
            "Bobby, the level-checker, in its own context",
            "Specialist agents with a Description",
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
            "You approve edits and the merge",
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
    "notes": "This is the map for the whole day. Read one row at a time and ask the room where they met it on Day 1 or 2. The point: nothing today is a new idea. A rule is like a test or a hook; the AI Agent node is the agent loop; the System Message plays the role of CLAUDE.md and skills; Simple Memory is what carries over between messages; the Structured Output Parser forces checkable output; the L3 specialists are subagents with one job each, like Bobby; and agents that call each other are a workflow, like /build-game-levels. The difference is that in n8n you see each part and its data. Come back to this slide whenever a level adds a node."
  },
  {
    "title": "A tour of n8n",
    "kicker": "DAY 3 · TOUR",
    "subtitle": "The parts you will use today.",
    "type": "concept",
    "layout": "steps",
    "visual": {
      "stepKeys": true,
      "bot": "point",
      "place": "beside"
    },
    "items": [
      {
        "label": "Workflows",
        "caption": "Your overview: every workflow you have, active or not."
      },
      {
        "label": "Canvas",
        "caption": "Where you build: add nodes with +, connect them, drag them around."
      },
      {
        "label": "Trigger node",
        "caption": "Every workflow starts with one. Today: start it by hand."
      },
      {
        "label": "Node panel",
        "caption": "Open a node: input on the left, settings in the middle, output on the right."
      },
      {
        "label": "Executions",
        "caption": "Every run, with the data each node saw. This is where you look when something fails."
      },
      {
        "label": "Credentials and templates",
        "caption": "Log-ins for apps, kept separately; templates are ready-made workflows to start from."
      }
    ],
    "keyPoints": [
      "Show it live in n8n",
      "Click through one part at a time",
      "Node panel: input, settings, output",
      "Executions = where you debug",
      "Credentials are kept apart from workflows"
    ],
    "notes": "Do the tour live in n8n and use this slide as the order. Workflows overview; the canvas; add a Manual trigger; open a node and point at the three parts of the panel (input, settings, output), because reading input and output is the most important skill today; run it and show the Executions list with the data per node; finish on credentials (stored once, separate from the workflow, never pasted into a node) and templates as a place to start."
  },
  {
    "lessonId": "workshop-3",
    "title": "Your own n8n. No prod.",
    "kicker": "Guardrails",
    "type": "concept",
    "visual": {
      "bot": "head",
      "place": "beside",
      "stagger": "pop",
      "stepThrough": true,
      "highlight": [
        {
          "in": "card:0",
          "text": "Do not connect real Jira or payments.",
          "tone": "orange"
        }
      ]
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
    "title": "Build your first workflow, step by step",
    "kicker": "DAY 3 · FIRST WORKFLOW",
    "subtitle": "Five nodes: a trigger, one ticket, one rule, two answers.",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "cards": [
      {
        "title": "Ticket fields",
        "body": "ticket_id = WL-1026\nmessage = I was charged twice. I need this fixed today."
      },
      {
        "title": "Rule",
        "body": "If message contains charged twice: priority = high\nOtherwise: priority = low"
      }
    ],
    "stepsHeading": "Steps:",
    "steps": [
      "Workflows → Create workflow. Click + and choose Trigger manually.",
      "Click + after the trigger, add Edit Fields (Set), and add the two ticket fields from the card.",
      "Click + and add If. Drag message from the Input panel into Value 1, choose String → contains, and type charged twice.",
      "On the true output add Edit Fields with priority = high; on the false output priority = low. Turn on Include Other Input Fields in both.",
      "Click Execute workflow. Open each node: what came in on the left, what went out on the right?",
      "Change the message to Please send me a copy of my invoice. and run again. Which branch fires now? Find both runs in Executions."
    ],
    "expected": "WL-1026 ends in Priority: high; with the invoice message it ends in Priority: low, and both runs show in Executions.",
    "keyPoints": [
      "Five nodes, no credentials",
      "Drag fields from Input, do not type them",
      "Read input and output per node",
      "Change one word, watch the branch move",
      "Find both runs in Executions"
    ],
    "notes": "Guided build before free exploration. Build it live once on screen, then let participants repeat it with the timer running. The key skill is step 3: dragging message from the Input panel writes the expression {{ $json.message }}, which shows how data moves from node to node. Turning on Include Other Input Fields keeps ticket_id and message next to priority. This is WL-1026 from the opening inbox. Step 6 previews L1: this If is a one-rule version of the Priority Switch. Plant the next question: what if a customer writes 'I paid two times' instead? The rule misses it; that is where the AI Agent comes in at L2. Early finishers move on to the next slide and build their own idea."
  },
  {
    "title": "What can you create in n8n?",
    "kicker": "DAY 3 · EXPLORE",
    "subtitle": "Explore n8n and build your first small workflow.",
    "type": "practice",
    "layout": "exercise",
    "cards": [
      {
        "title": "Ideas",
        "body": "a form that sends you a summary\na schedule that fetches data and saves it\nan AI step that sorts incoming text\na flow that stops for your approval"
      }
    ],
    "stepsHeading": "Steps:",
    "steps": [
      "Open n8n and create a new workflow.",
      "Add a Manual trigger, then two or three nodes after it.",
      "Run it. Open each node: what came in, what went out?",
      "Open Executions and find your run.",
      "Share one working workflow on screen.",
      "Look at one template: what does it do, step by step?"
    ],
    "expected": "A small workflow that runs, and you can explain what each node does with its data.",
    "keyPoints": [
      "Type the minutes on the timer",
      "Small: trigger + 2–3 nodes",
      "Read input and output per node",
      "Find the run in Executions",
      "Screen-share one working flow",
      "Pairs can help each other"
    ],
    "notes": "Type the minutes on the timer and press start. Keep it small: a Manual trigger and two or three nodes is enough. Walk around and ask people to explain what data goes in and out of one node; that's the skill that matters. Invite one or two participants to share a working flow. Early finishers can inspect a template or add an IF node with two paths."
  },
  {
    "lessonId": "workshop-3",
    "title": "One ticket. Three agency levels.",
    "kicker": "Workshop 3 · Day 3 · L1→L3",
    "type": "concept",
    "layout": "steps",
    "visual": {
      "art": "stairs",
      "stepKeys": true
    },
    "subtitle": "One ticket workflow, built up step by step. Each step keeps what works and adds one new idea.",
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
    ],
    "keyPoints": [
      "Same tickets, same labels, every step",
      "Start without an LLM: know what rules can do",
      "Add the agent only where rules break",
      "Specialists, orchestration and data come last",
      "A human approves before any reply"
    ],
    "notes": "Open the climb. We build one ticket workflow five times. Step 1: no LLM at all, a Switch with keyword rules; it works until someone writes \"I paid two times\". Step 2: the same workflow with an AI Agent that reads meaning. Step 3: split the work into Reply and Risk specialists, like Bobby on Day 2. Step 4: let the specialists consult each other before they answer the orchestrator. Step 5: give the agents a Data Table and let them create, read, update and delete rows. The labels and the human gate never change. Rhythm all day: explain, demonstrate, participants try, discuss. Goal ≥L2; stretch L3+. Workshop 4 keeps the labels, specialist split, and human review gate while teaching one Agent SDK agent, subagents, and MCP transaction lookup."
  },
  {
    "lessonId": "workshop-3",
    "title": "Ticket in. Low / Med / High out.",
    "kicker": "Vehicle · one ticket · three levels",
    "type": "context",
    "visual": {
      "bot": "wave",
      "place": "beside",
      "stagger": "pop",
      "stepThrough": true,
      "highlight": [
        {
          "in": "subtitle",
          "text": "Low, Med, or High",
          "tone": "orange"
        }
      ]
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
    "tagline": "Day 1 bridge: an agent observes, decides, acts and checks in a loop. A rule only follows one path.",
    "kicker": "Explain · why the ladder",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside",
      "stagger": "pop",
      "stepThrough": true
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
    "notes": "Explain. L1 = business rule without LLM. L2 = judgment with one AI Agent and memory. L3 = Customer Reply, Risk, and Customer Context specialists. Human gate before “done” or customer-facing output."
  },
  {
    "lessonId": "workshop-3",
    "title": "Same tickets all day.",
    "kicker": "Scenario · shared fixture",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside",
      "stagger": "pop",
      "stepThrough": true
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
    "tagline": "Day 1 bridge: like your Snake test and hook, a Switch checks the same way every time.",
    "kicker": "Explain · L1 · deterministic routing",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside",
      "stagger": "pop",
      "stepThrough": true,
      "highlight": [
        {
          "in": "subtitle",
          "text": "without an LLM",
          "tone": "orange"
        }
      ]
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
    "notes": "Explain — L1 Switch / rules. Ticket → Switch → L/M/H. No LLM. Cover input, branches, and error path."
  },
  {
    "lessonId": "workshop-3",
    "title": "Watch: L1 Switch routes the ticket.",
    "kicker": "Demo · L1",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-01.jpg",
      "imageLink": "Step 1 · Ticket Input and Switch"
    },
    "notes": "Demo — L1. Walk through Ticket Input, the Switch, and the Low, Medium, and High branches. Run one fixture ticket and compare the branch with the expected label."
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
      "place": "beside",
      "shot": "assets/day3-lesplan/step-01.jpg",
      "shotLabel": "Level · L1: Ticket Input and Switch"
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
      "Ask a human to confirm the branch.",
      "Share your workflow on screen."
    ],
    "expected": "The flow runs, its label matches the fixture, the steps are noted, and a human confirms the branch before the screen-share checkpoint.",
    "subtitle": "Run or inspect the deterministic L1 flow and hold the human gate before L2.",
    "keyPoints": [
      "Run the L1 flow.",
      "Match the expected label.",
      "Confirm the branch with a human.",
      "Screen-share one working flow."
    ],
    "notes": "Your turn — L1 on your machine. Timer: 15 min. Checklist: (1) flow runs (2) label matches fixture (3) steps noted (4) human confirms branch. Invite one or two participants to share their workflow before moving on."
  },
  {
    "title": "What is an agent?",
    "kicker": "DAY 3 · BEFORE L2",
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
    "notes": "Contrast with L1 first: the Switch follows a path you drew, so it fails on 'I paid two times'. An agent gets a goal (give this ticket the right priority) and decides itself how to get there. Read the definition, then pop the four things it can do; stress that asking a human is part of the design, not a failure. Close with the third card: in n8n an agent is one node with four inputs you can see. Point back to the screenshot on 'You used an agent': Chat Model, Memory, Tools, Output Parser."
  },
  {
    "title": "The agentic loop",
    "kicker": "DAY 3 · BEFORE L2",
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
        "caption": "Read the result. Is the priority clear? Does the output fit the parser's fields?"
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
    "notes": "Same loop as Day 1, same five words; now follow one ticket round it. Observe: the ticket plus memory. Decide: the model picks the next action, which is the step a Switch cannot do. Act: a tool call, such as a specialist agent or a Data Table lookup. Check: read the result; the Structured Output Parser makes this concrete. Repeat or stop: an agent may go round several times, and when it stops it hands over to the human gate. After L2 runs, open Executions, click the AI Agent node and show its logs: each round of the loop is visible there."
  },
  {
    "lessonId": "workshop-3",
    "title": "L2 adds one AI Agent with memory.",
    "tagline": "Day 1 bridge: this node is the agent loop you used in Claude Code, now on the canvas.",
    "kicker": "Explain · L2 · judgment enters",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside",
      "stagger": "pop",
      "stepThrough": true,
      "highlight": [
        {
          "in": "subtitle",
          "text": "a human reviews it",
          "tone": "orange"
        }
      ]
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
    "notes": "Explain — L2. Same chain + one bounded AI Agent. Agent drafts priority; human reviews. Capture trace/settings. OpenAI node in screenshots OK — day 4 swaps stack."
  },
  {
    "lessonId": "workshop-3",
    "title": "Watch: L2 Agent drafts priority.",
    "kicker": "Demo · L2",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-04.jpg",
      "imageLink": "Step 4 · AI Agent in the ticket flow"
    },
    "notes": "Demo — L2. Add the AI Agent to the existing ticket flow. Show the Agent, its memory connection, the drafted priority, and the human review pause. The room watches before changing its own flow."
  },
  {
    "title": "Add a Chat Message Trigger",
    "kicker": "STEP 2 · CHAT INPUT",
    "subtitle": "Start one workflow run for every user message.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-02.jpg",
      "imageLink": "Step 2 · Chat Message Trigger"
    },
    "keyPoints": [
      "Add the Chat Message Trigger",
      "Use Hosted Chat for the workshop",
      "Keep public access off while building",
      "Test one message"
    ],
    "notes": "Show the Chat Message Trigger. Use Hosted Chat for the workshop and keep Make Chat Publicly Available off while building. Explain that the trigger runs the workflow once for each user message. Send one test message before adding the agent."
  },
  {
    "title": "Give the Agent memory",
    "kicker": "STEP 3 · AI AGENT + SIMPLE MEMORY",
    "subtitle": "Connect a minimal AI Agent, then prove what the same session remembers.",
    "type": "practice",
    "layout": "exercise",
    "visual": {
      "shot": "assets/day3-lesplan/step-03.jpg",
      "shotLabel": "Step 3 · Before connecting Simple Memory"
    },
    "steps": [
      "Connect the Chat Trigger to a minimal AI Agent and Chat Model.",
      "Without memory, send: My favorite color is red",
      "Without memory, ask: What is my favorite color?",
      "Connect Simple Memory and start a clean session.",
      "With memory, send: My favorite color is red",
      "In that same session, ask: What is my favorite color?",
      "Repeat the question in another session and compare the outputs."
    ],
    "expected": "You can show the recorded outputs before and after memory, plus the result from another session.",
    "keyPoints": [
      "The screenshot shows the Agent before memory is connected",
      "Connect Simple Memory live",
      "Keep the same session for the first comparison",
      "Compare with a different session"
    ],
    "notes": "The screenshot shows the minimal Agent before Simple Memory is connected. Run the exact two prompts without memory and record the output. Then connect Simple Memory, start clean, repeat both prompts in the same session, and record the output. Finally use another session and compare. Simple Memory stores configurable chat history for the current session. Discuss the observed evidence instead of promising that a model can never infer the answer from the prompt text."
  },
  {
    "title": "Add predictable output fields",
    "tagline": "Day 1 bridge: evidence, not confidence. Like a test, the parser makes the answer checkable.",
    "kicker": "STEP 5 · STRUCTURED OUTPUT PARSER",
    "subtitle": "Connect a Structured Output Parser to the Agent.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-05.jpg",
      "imageLink": "Step 5 · Structured Output Parser"
    },
    "keyPoints": [
      "Connect the parser to the AI Agent",
      "Define the output fields before testing",
      "The parser returns fields that match its JSON Schema",
      "Keep human review before sending"
    ],
    "notes": "Show where the Structured Output Parser connects to the AI Agent. Explain that the parser adds predictable fields that match its JSON Schema. It does not remove the need to test the result or review customer-facing output."
  },
  {
    "title": "Shape the parser output",
    "kicker": "STEP 6 · PARSER FIELDS",
    "subtitle": "Start with the fields visible in the example, then extend only when the workflow needs more.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-06.jpg",
      "imageLink": "Step 6 · Parser fields and JSON Schema"
    },
    "cards": [
      {
        "title": "Compact example",
        "body": "{\n  \"priority\": \"high\",\n  \"message\": \"Payment service unavailable\"\n}"
      }
    ],
    "keyPoints": [
      "Use priority and message first",
      "Match field names in the schema and downstream nodes",
      "Test more than one ticket",
      "Treat extra fields as an explicit extension"
    ],
    "notes": "Use the screenshot to explain the parser settings and JSON Schema structure. The visible example uses priority and message. Do not copy unrelated promises from the prompt example. If participants add fields later, make that an explicit extension and update every downstream reference."
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
      "place": "beside",
      "shot": "assets/day3-lesplan/step-05.jpg",
      "shotLabel": "Level · L2: Agent with Structured Output Parser"
    },
    "cards": [
      {
        "title": "Level",
        "body": "L2"
      }
    ],
    "steps": [
      "Record an AI run.",
      "Return priority and message through the parser.",
      "Have a human review the priority.",
      "Prevent silent auto-send.",
      "Start the Proof fields.",
      "Share the workflow on screen."
    ],
    "expected": "An AI run returns the parser fields, a human reviews the priority, auto-send stays off, and the group sees one working flow.",
    "subtitle": "Record one AI run and make the human review visible before anything is sent.",
    "keyPoints": [
      "Record the AI run.",
      "Check priority and message.",
      "Review the priority with a human.",
      "Keep auto-send off.",
      "Screen-share one working flow."
    ],
    "notes": "Your turn — L2. Solo bar = ≥L2 required. Timer: 20 min. Checklist: (1) AI run recorded (2) parser returns priority and message (3) human reviewed priority (4) no silent auto-send (5) Proof fields started. Invite one or two participants to share their workflow before L3."
  },
  {
    "lessonId": "workshop-3",
    "title": "L3 splits Reply, Risk and Context.",
    "tagline": "Day 2 bridge: like Bobby the level-checker, each specialist has one job. It reports; it approves nothing.",
    "kicker": "Explain · L3 · three specialists · one gate",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside",
      "stagger": "pop",
      "stepThrough": true,
      "highlight": [
        {
          "in": "subtitle",
          "text": "one human gate",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "L3 separates Customer Reply, Risk, and Customer Context while keeping one human gate.",
    "keyPoints": [
      "Split the three specialist roles.",
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
      },
      {
        "title": "Customer Context",
        "body": "Look up customer context in a Data Table through customer_id."
      }
    ],
    "notes": "Explain — L3. Split customer reply, risk or priority, and customer context. Customer Context Agent looks up context in a Data Table through customer_id. Let the main Agent orchestrate the three tools. Document who does what and keep the human gate before done. Stretch — not required for the solo bar."
  },
  {
    "lessonId": "workshop-3",
    "title": "Watch: L3 specialists, one gate.",
    "kicker": "Demo · L3",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-11.jpg",
      "imageLink": "Step 11 · Three specialist agents"
    },
    "notes": "Demo — L3. The screenshot shows Customer Reply Agent, Risk Agent, and Customer Context Agent connected to the main flow. Explain that Customer Context Agent uses a Data Table lookup through customer_id. Name all three roles and the human gate."
  },
  {
    "title": "Add the Customer Reply Agent",
    "kicker": "STEP 7 · FIRST SPECIALIST",
    "subtitle": "Give one specialist responsibility for the customer-facing draft.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-07.jpg",
      "imageLink": "Step 7 · Customer Reply Agent"
    },
    "keyPoints": [
      "Keep the main Agent as orchestrator",
      "Add Customer Reply Agent as a tool",
      "Give it one clear responsibility",
      "Review the draft before it reaches a customer"
    ],
    "notes": "Add the Customer Reply Agent as a tool for the main Agent. Its responsibility is the customer-facing draft. Keep the main Agent in control of when the tool is used. Keep a human review before sending."
  },
  {
    "title": "Add the Risk Agent",
    "kicker": "STEP 8 · SECOND SPECIALIST",
    "subtitle": "Separate risk assessment from customer reply writing.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-08.jpg",
      "imageLink": "Step 8 · Customer Reply and Risk Agents"
    },
    "keyPoints": [
      "Customer Reply drafts the response",
      "Risk assesses risk and priority",
      "The main Agent coordinates both tools",
      "One human gate remains"
    ],
    "notes": "Add the Risk Agent beside the Customer Reply Agent. Separate the responsibilities. The Reply specialist drafts customer-facing text. The Risk specialist assesses risk and priority. The main Agent coordinates both tools and one human gate remains."
  },
  {
    "title": "Description chooses. System Message guides.",
    "tagline": "Day 2 bridge: the Description works like a skill's description, the System Message like CLAUDE.md.",
    "kicker": "STEP 9 · TOOL ROUTING",
    "subtitle": "Two fields control different parts of the specialist pattern.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-09.jpg",
      "imageLink": "Step 9 · Description and System Message"
    },
    "cards": [
      {
        "title": "Description",
        "body": "Tells the main Agent when it should choose this tool."
      },
      {
        "title": "System Message",
        "body": "Defines how the specialist behaves after it is selected."
      }
    ],
    "keyPoints": [
      "Description supports tool selection",
      "System Message guides specialist behavior",
      "Write each field for its own purpose",
      "Test when the tool is and is not called"
    ],
    "notes": "Use the Risk Agent configuration to show the distinction. The Description tells the main Agent when to choose the tool. The System Message guides the specialist's behavior after selection. Test both a case that should call the specialist and one that should not."
  },
  {
    "title": "Add customer context with Data Tables",
    "kicker": "STEP 10 · THIRD SPECIALIST",
    "subtitle": "Import the workshop CSV and look up customer context through customer_id.",
    "type": "practice",
    "layout": "exercise",
    "repo": {
      "label": "Download customers.csv",
      "url": "assets/day3-lesplan/customers.csv"
    },
    "visual": {
      "shot": "assets/day3-lesplan/step-10.jpg",
      "shotLabel": "Step 10 · Data Table customer context"
    },
    "steps": [
      "Open Data Tables and create a table.",
      "Import customers.csv from this slide.",
      "Add a Customer Context Agent as the third specialist.",
      "Let it look up a row through customer_id.",
      "Return the customer context to the main Agent."
    ],
    "expected": "The Customer Context Agent finds the matching customer_id and returns useful context to the main Agent.",
    "keyPoints": [
      "Data Tables provide built-in instance storage",
      "Use customer_id consistently",
      "The screenshot shows the table interface",
      "The supplied CSV uses the same schema"
    ],
    "notes": "Open the Data Tables tab, create a table, and import the linked CSV. The screenshot is the interface example and the supplied CSV uses the same schema. Add Customer Context Agent as the third specialist. It looks up context in the Data Table through customer_id and returns the matching row to the main Agent. Data Tables suit light to moderate workshop data."
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
      "place": "beside",
      "shot": "assets/day3-lesplan/step-11.jpg",
      "shotLabel": "Level · L3: Three specialist agents"
    },
    "cards": [
      {
        "title": "Level",
        "body": "L3"
      }
    ],
    "steps": [
      "Name all three specialist roles.",
      "Use customer_id for the context lookup.",
      "Produce a joint output.",
      "Make the human gate explicit.",
      "Share the complete workflow on screen."
    ],
    "expected": "Three specialist roles produce a joint output with customer context and an explicit human gate.",
    "subtitle": "Stretch the same tickets into three specialist roles with one explicit human gate.",
    "keyPoints": [
      "Name the three roles.",
      "Use customer_id consistently.",
      "Show their joint output.",
      "Keep the human gate explicit.",
      "Screen-share one complete flow."
    ],
    "notes": "Your turn — L3 stretch (optional). Timer: 15 min. Checklist: (1) Customer Reply, Risk, and Customer Context roles named (2) customer_id lookup works (3) joint output (4) human gate explicit. Invite participants to share the results of all three specialists."
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
    "notes": "This is multi-agent orchestration. In flat L3 the orchestrator calls every specialist itself. Here the Customer Reply Agent has the Risk Agent as its own tool, so the specialists consult each other before anything goes back to the orchestrator. Walk the five steps with the arrow key. Then open the Executions view of the demo workflow: the Risk Agent's call appears inside the Reply Agent's run, not inside the orchestrator's. The point to land: who may talk to whom is decided by the wiring on the canvas, not by the prompt. Be precise about what n8n does: agents call each other as tools, one request and one answer at a time; there is no open chat between them."
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
    "title": "Final build: complete the chat workflow",
    "kicker": "FINAL ASSIGNMENT · YOUR TURN",
    "subtitle": "Bring the complete Day 3 workflow together from chat input to reviewed chat reply.",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "steps": [
      "Start with chat input through the Chat Message Trigger.",
      "Run the full workflow with parser and specialist tools.",
      "Return a chat reply after the human review gate.",
      "If you use a response node, set Response Mode to Using Response Nodes.",
      "Optionally add one extra node with a useful effect.",
      "Share the final workflow on screen."
    ],
    "expected": "A chat message runs through the full workflow and returns a reviewed chat reply. Any optional node has a clear useful effect.",
    "keyPoints": [
      "Chat input starts the run",
      "The full workflow completes",
      "A reviewed chat reply returns",
      "One useful extra node is optional",
      "Screen-share the final result"
    ],
    "notes": "Final assignment. Participants start with chat input, run the full workflow, and return a reviewed chat reply. The basic Chat Trigger can return the final Agent output. When a response node composes the reply, set Response Mode to Using Response Nodes. The optional extra node must have a useful, explainable effect. Finish with a screen-share checkpoint."
  },
  {
    "lessonId": "workshop-3",
    "title": "Proof is not vibes.",
    "kicker": "Explain · export · rules · gate",
    "type": "concept",
    "visual": {
      "bot": "head",
      "place": "key",
      "keyLine": 1,
      "stamp": "VERIFY"
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
      "place": "beside",
      "stagger": "pop",
      "stepThrough": true
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
        "caption": "Customer Reply, Risk, and Customer Context share one human gate."
      },
      {
        "label": "Proof",
        "caption": "Export or screenshot plus routing rules on /workshop/3."
      }
    ],
    "notes": "Close. Recap L1 rules, L2 judgment, and L3 with Customer Reply, Risk, and Customer Context. Outline ≠ Linear Done. Linear Done = live /workshop/3 + Proof AC with export or screenshot and routing rules."
  },
  {
    "title": "What did you learn?",
    "kicker": "DAY 3 · CLOSING",
    "subtitle": "Complete these statements.",
    "type": "recap",
    "tagline": "Complete each statement for yourself.",
    "visual": {
      "sentences": true,
      "quietTimer": 3
    },
    "cards": [
      {
        "title": "n8n is…",
        "body": ""
      },
      {
        "title": "A workflow I could build for my team is…",
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
      "Questions feed the next session"
    ],
    "notes": "Give three quiet minutes to complete the statements, then collect a few out loud. Write the workflow ideas and open questions on the flipchart: they are the starting point for the next session."
  }
];
