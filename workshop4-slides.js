'use strict';
/* Workshop 4 · Build the n8n support app with Claude Code.
   The n8n JSON is the source. The reviewed slides lead SOLO.md and the participant repository. */
window.SLIDES = [
{
    "lessonId": "workshop-4",
    "title": "Welcome to Day 4",
    "kicker": "Day 4 · From n8n to the Claude Agent SDK",
    "type": "concept",
    "visual": {
      "opener": "welcome",
      "bot": "wave",
      "place": "beside"
    },
    "subtitle": "Last session you built the flow in n8n. Today you build the same flow in code.",
    "notes": "Keep this slide on screen while people arrive. Today we build last session's n8n support flow again, this time in code with the Claude Agent SDK. We start from a fresh workshop package with new customer messages. We do not import the n8n flow. If someone's Day 3 flow did not work, that is no problem: they can use the example results in the package.",
    "stateId": "1:Welcome to Workshop 4 · From n8n to Claude Agents SDK",
    "teach": {
      "next": "Look back, look ahead: three questions",
      "time": "2 min",
      "gist": "Welcome. Last session you built the sorting machine from n8n blocks. Today we build the same machine in code.",
      "script": [
        {
          "do": "Have this slide on screen while people come in."
        },
        {
          "say": "Last session you built a sorting machine for customer messages in n8n, by connecting blocks. Today we build exactly the same machine, but in code."
        },
        {
          "say": "Why code? Because you can test it, save it and limit it. You decide what each agent may and may not do."
        },
        {
          "ask": "Who remembers what the last block of last session's flow was?",
          "say": "(Answer: a person checks before anything goes to the customer. That stays true today.)"
        }
      ],
      "do": [
        "Welcome everyone.",
        "Name the goal: the same flow, now in code."
      ],
      "done": [
        "Everyone knows that today is last session's flow, now in code."
      ],
      "watch": [
        "Did Day 3 not work for someone? Reassure them: the package has example results, so nobody is behind."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Look back, look ahead: three questions",
    "kicker": "Day 4 · Recap · 3 rounds",
    "type": "context",
    "visual": {},
    "subtitle": "Groups of 3–4 (your table). 2 minutes per round. One person shares your table's answer; you may pass.",
    "timer": 6,
    "cards": [
      {
        "title": "1 · What was useful?",
        "body": "What did you learn last session that you can actually use?"
      },
      {
        "title": "2 · What went wrong?",
        "body": "What did your flow do that you did not expect?"
      },
      {
        "title": "3 · Your goal",
        "body": "What do you want to be able to do by the end of today?"
      }
    ],
    "keyPoints": [
      "One answer per table, per round",
      "Connect 'wrong' to today: test, tool list, hook",
      "Keep the goals for the close"
    ],
    "notes": "Time: 6 minutes, three rounds of 2 minutes. Write the answers on the board. In round 2, connect each problem to today. Hard to test: focused tests and an evidence table. Every agent could do everything: a tool list per agent. No stop before a change: a hook. In round 3, keep the goals on the board and return to them at the close.",
    "teach": {
      "next": "Last session · 1. The sorting machine",
      "time": "6 min",
      "gist": "Three short rounds: what was useful, what went wrong, and what is your goal for today.",
      "script": [
        {
          "do": "Point at card 1. Start a 2-minute timer.",
          "say": "Round one. What did you learn last session that you can really use? One answer per table."
        },
        {
          "do": "Write the answers on the board. Point at card 2.",
          "say": "Round two. What did your flow do that you did not expect?"
        },
        {
          "do": "Connect each answer to today.",
          "say": "Was it hard to test? Today you get one command that tests everything. Could every agent do everything? Today each agent gets its own list. Was there no stop before a change? Today we build a brake: a person says yes first."
        },
        {
          "do": "Point at card 3.",
          "say": "Round three. What do you want to be able to do at the end of today? Write it down. We will come back to it at the end."
        }
      ],
      "do": [
        "Three rounds of two minutes each.",
        "Put the answers on the board."
      ],
      "done": [
        "Each table has given one answer for each round.",
        "The goals are on the board for the close."
      ],
      "watch": [
        "Is a table quiet? Ask one person directly: what surprised you last session?",
        "Keep it short: the real work starts in 5 minutes."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Last session · 1. The sorting machine",
    "kicker": "Recap · n8n flow 1/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-maarten-n8n/01-basic-flow.jpeg",
      "imageLink": "n8n · Ticket Input → Switch"
    },
    "subtitle": "A customer message comes in. The Switch sorts it into one of three trays: high, medium or low.",
    "cards": [
      {
        "title": "Ticket Input",
        "body": "A customer message comes in."
      },
      {
        "title": "Switch = the sorting clerk",
        "body": "It follows fixed rules and does not think. Three trays: high, medium and low."
      }
    ],
    "keyPoints": [
      "Ticket Input: One support message.",
      "Switch: Three routes: low, medium, high."
    ],
    "notes": "Recap 1 of 4 (10:05). Show Maarten’s first flow: a manual trigger, Ticket Input, and a Switch with three routes. Say that today the Switch becomes lib/switch.mjs.",
    "stateId": "3:Yesterday’s flow · 1. Ticket in, Switch out",
    "teach": {
      "next": "Last session · 2. The chat and the memory",
      "time": "2 min",
      "gist": "The Switch is the sorting clerk: the AI gives the label, and the Switch picks the tray.",
      "script": [
        {
          "do": "Point at Ticket Input.",
          "say": "A customer message comes in. That is the ticket."
        },
        {
          "do": "Point at Switch.",
          "say": "Then comes the Switch. Think of the post room: a letter comes in and the clerk puts it in one of three trays: high, medium or low. The Switch is that clerk. It follows fixed rules and does not think."
        },
        {
          "say": "The AI reads the message and says: this is high. The Switch then puts it in the right tray. So you always know exactly where a message goes."
        },
        {
          "say": "Today this block becomes a file with code: lib/switch.mjs."
        },
        {
          "ask": "Who decides the tray: the AI or the Switch?",
          "say": "(Answer: the Switch. The AI only gives the label.)"
        }
      ],
      "do": [
        "Show the first n8n flow.",
        "Explain: the AI gives the label, and the Switch picks the tray."
      ],
      "done": [
        "Everyone can say what the Switch does."
      ],
      "watch": [
        "People mix up the AI and the Switch. Repeat: the AI gives the label, the Switch picks the tray."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Last session · 2. The chat and the memory",
    "kicker": "Recap · n8n flow 2/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/day4-memory/with-memory.png",
      "imageLink": "n8n · Chat trigger → AI Agent"
    },
    "subtitle": "Memory works like a conversation at a shop counter: with the same customer, you remember what was said. With a new customer, you start afresh.",
    "cards": [
      {
        "title": "Chat trigger",
        "body": "The customer types a message."
      },
      {
        "title": "AI Agent",
        "body": "Works out what the customer means."
      },
      {
        "title": "Simple Memory",
        "body": "Plugs in below the agent and remembers what was said earlier in the same conversation."
      }
    ],
    "keyPoints": [
      "Same customer = same conversation",
      "New customer = start fresh",
      "Never carry customer A's chat over to customer B"
    ],
    "notes": "Last session's second flow had a chat in front of the AI Agent, and memory under it. Ask: what happened before you added memory, and what happened after? Today npm run chat does the same: it remembers within one conversation. A new conversation must never receive another customer's messages.",
    "stateId": "4:Yesterday’s flow · 2. Chat and an AI Agent",
    "teach": {
      "next": "Last session · 3. The form",
      "time": "2 min",
      "gist": "The chat comes in, the AI Agent reads it, and the memory keeps the conversation. Never mix up customers.",
      "script": [
        {
          "do": "Point at the chat block.",
          "say": "Last session's second step: the customer types in a chat, and the AI Agent reads the message."
        },
        {
          "do": "Point at the Memory socket under the agent.",
          "say": "Under the agent you plug in memory. Think of a conversation at the desk: as long as the same customer is standing in front of you, you remember what they just said."
        },
        {
          "say": "A new customer? Then you start fresh. You may never carry the conversation of customer A over to customer B."
        },
        {
          "ask": "Why is that so important at a payment company?",
          "say": "(Answer: privacy. Customer B may never see anything from customer A.)"
        }
      ],
      "do": [
        "Explain the chat, the agent and the memory.",
        "Name the rule: never mix up customers."
      ],
      "done": [
        "Everyone can say what memory does, and where it stops."
      ],
      "watch": [
        "People may think memory means the AI keeps learning forever. It does not: it only remembers within one conversation."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Last session · 3. The form",
    "kicker": "Recap · n8n flow 3/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-maarten-n8n/05-output-parser.jpeg",
      "imageLink": "n8n · AI Agent + Structured Output Parser"
    },
    "subtitle": "The AI fills in a fixed form, so the Switch can sort the message.",
    "cards": [
      {
        "title": "Structured Output Parser = the form",
        "body": "Tells the AI which fields to fill in (priority and message) and checks that the answer fits."
      },
      {
        "title": "Switch = the trays",
        "body": "Reads the priority field and puts the message in the right tray: high, medium or low."
      }
    ],
    "keyPoints": [
      "AI talks, the machine needs a form",
      "Parser = the form, and the check",
      "Switch = the trays"
    ],
    "notes": "Last session the Parser had two fields: priority and message. Today the package has its own form (priority-schema.mjs) with its own fields, so it is not exactly the same as on Day 3. There are two different kinds of mistake. In the first, the form is not filled in correctly (a parse error). In the second, the form is correct but the priority is wrong (a wrong decision). Look at them separately.",
    "stateId": "5:Yesterday’s flow · 3. Structured output",
    "tagline": "An AI likes to talk, but a machine cannot do anything with a story. So we ask the AI to fill in a form.",
    "teach": {
      "next": "Last session · 4. The team of specialists",
      "time": "2 min",
      "gist": "The Parser is the form the AI must fill in. The Switch is the trays. The AI gives the label, and the code picks the route.",
      "script": [
        {
          "do": "Point at the AI Agent.",
          "say": "An AI likes to talk. Ask it something and you get a story. But a machine cannot do anything with a story."
        },
        {
          "do": "Point at Structured Output Parser.",
          "say": "So we give the AI a form. Field one: priority, which is high, medium or low. Field two: the message. The Parser hands out the form and checks that it is filled in correctly."
        },
        {
          "do": "Point at the Switch.",
          "say": "Then the Switch reads the priority field and puts the message in the right tray."
        },
        {
          "ask": "What can go wrong here? Two things.",
          "say": "(Answer: the form is filled in wrongly, or the form is right but the priority is wrong. Those are two different problems.)"
        }
      ],
      "do": [
        "Explain: the AI talks, but the machine needs a form.",
        "The Parser is the form, and the Switch is the trays."
      ],
      "done": [
        "Everyone can say what the difference is between the Parser and the Switch."
      ],
      "watch": [
        "Today's form has its own fields. Do not promise that it is exactly the same as last session's."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Last session · 4. The team of specialists",
    "kicker": "Recap · n8n flow 4/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-maarten-n8n/11-three-sub-agents.jpeg",
      "imageLink": "n8n · Customer Reply, Risk and Customer Context agents"
    },
    "subtitle": "As in an office, everyone has one job. Today, Reply and Risk become agents in code. Customer Context comes back in Step 3, with a lookup desk (MCP).",
    "cards": [
      {
        "title": "Customer Reply Agent",
        "body": "The writer: drafts the reply to the customer."
      },
      {
        "title": "Risk Agent",
        "body": "The risk expert: decides how risky the message is."
      },
      {
        "title": "Customer Context Agent",
        "body": "The record keeper: looks up the customer in the Data Table."
      }
    ],
    "keyPoints": [
      "Writer, risk expert, records desk",
      "Each specialist has one job",
      "Today: 2 agents + 1 lookup tool"
    ],
    "notes": "Last session's team had three specialists, each with one job. Ask: who called the Risk Agent, and what customer information reached the Reply Agent? If someone's Day 3 flow was blocked, show this screenshot as the example and explain the idea. Do not say that their flow worked. Today Reply and Risk become subagents, and the Customer Context Agent becomes an MCP tool that looks up customers.",
    "stateId": "6:Optional yesterday, explained today: specialist agents",
    "teach": {
      "next": "Today's goal",
      "time": "3 min",
      "gist": "Three specialists, each with one job. Today we build two agents in code and one lookup tool.",
      "script": [
        {
          "say": "Last session's last step was a team of specialists. Just like at the office: you do not ask one person to do everything."
        },
        {
          "do": "Point at the three agents, left to right.",
          "say": "The writer writes the reply. The risk expert decides how risky the message is. The records desk looks up the customer."
        },
        {
          "do": "Point at the tagline.",
          "say": "Today we build this team in code. The writer and the risk expert become two agents. The records desk becomes a lookup tool: it only looks things up and does not think."
        },
        {
          "ask": "Who called the Risk Agent in your flow last session?",
          "say": "(Listen to the answers. If someone's flow did not work, show this screenshot as the example.)"
        }
      ],
      "do": [
        "Name the three specialists and their jobs.",
        "Say what they become today."
      ],
      "done": [
        "Everyone knows that today we build two agents and one lookup tool."
      ],
      "watch": [
        "Did someone's Day 3 not work? Use this screenshot as the example. Nobody is behind."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Today's goal",
    "kicker": "Welcome · Today's goal",
    "type": "context",
    "visual": {},
    "subtitle": "By the end of the day you will have built your own agent team, and you will be able to explain how it works.",
    "cards": [
      {
        "title": "You will have built",
        "body": "An agent team in code: one agent, a team of specialists and two lookup desks."
      },
      {
        "title": "You can explain",
        "body": "What each agent is allowed to do, and what it is not."
      },
      {
        "title": "You will know",
        "body": "When a person has to approve a change."
      }
    ],
    "keyPoints": [
      "Built it yourself",
      "Who may do what",
      "A person says yes before a change"
    ],
    "notes": "Say the goal in one sentence: by the end of the day you will have an agent team that you built yourself, and you can explain it. Come back to this at the close, together with the goals that people wrote down this morning.",
    "stateId": "7:Goal of today",
    "teach": {
      "next": "Today · agenda",
      "time": "1 min",
      "gist": "By the end of the day you will have built it yourself, be able to explain who may do what, and know when a person says yes.",
      "script": [
        {
          "say": "By the end of the day you will have an agent team that you built yourself, and that you can explain."
        },
        {
          "do": "Point at the three cards.",
          "say": "You built it. You can say which agent may do what. And you know when a person must say yes before anything changes."
        },
        {
          "say": "At the end of the day we will come back to this, and to the goals you wrote down this morning."
        },
        {
          "say": "And this is how we get there. On the next slide: the day in four blocks."
        }
      ],
      "do": [
        "Say the goal in one sentence.",
        "Link it to the goals on the board."
      ],
      "done": [
        "Everyone knows what they will have by the end of the day."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Today · agenda",
    "kicker": "Run of show · 10:00–16:30",
    "type": "context",
    "subtitle": "Claude Code builds. You choose the examples, inspect the diff and decide when to continue.",
    "cards": [
      {
        "title": "10:00 · Reconstruct",
        "body": "Read the sanitized n8n JSON.\nMap its behavior.\nRebuild the prepared app."
      },
      {
        "title": "11:15 · SOLO 1",
        "body": "Policy and structured output.\nThen 20 minutes: build, resume and isolate ticket memory."
      },
      {
        "title": "14:00 · SOLO 2–3",
        "body": "Risk and Reply specialists.\nCustomer Context and read-only MCP."
      },
      {
        "title": "15:45 · SOLO 4",
        "body": "Compare real behavior.\nCollect proof.\nA person decides."
      }
    ],
    "keyPoints": [
      "Prompt first.",
      "Inspect every diff.",
      "Keep missing evidence OPEN."
    ],
    "notes": "Name the morning break at 11:00, lunch at 13:15 and the afternoon break at 15:30. Lunch ends at 14:00. The afternoon break ends at 15:45. Participants keep their work on one branch. The workshop repository is https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent.",
    "teach": {
      "next": "Visual reference · the Day 4 agent route",
      "time": "2–4 min",
      "gist": "Claude Code builds. You choose the examples, inspect the diff and decide when to continue.",
      "script": [
        {
          "do": "Point to the four blocks and name the breaks.",
          "say": "The morning break starts at 11:00. Lunch runs from 13:15 to 14:00. The afternoon break runs from 15:30 to 15:45."
        },
        {
          "say": "Participants keep their work on one branch. The workshop repository is https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent."
        }
      ],
      "do": [],
      "done": [
        "The room can explain today · agenda."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Visual reference · the Day 4 agent route",
    "kicker": "React Flow · trainer reference",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/agent-map/poster.png",
      "imageLink": "Interactive map · use the button below"
    },
    "source": {
      "label": "Open the interactive React Flow map",
      "url": "assets/agent-map/index.html"
    },
    "subtitle": "Chat and commands enter the same route. Three specialists produce one draft, and a person reviews it.",
    "cards": [
      {"title":"One route","body":"Chat or command → Orchestrator → Customer Context → Risk → Priority decision → Reply."},
      {"title":"One contract","body":"Return {priority, message}; route low, medium and high without case sensitivity."},
      {"title":"One human gate","body":"The output is a draft. A named person reviews it before customer use."}
    ],
    "keyPoints": [
      "Teaching simulation — no model calls",
      "technical logs ≠ curated memory",
      "memory.md is a local exercise extension"
    ],
    "notes": "Open the interactive map if the room needs the whole route at once. Click the nodes or use Play route. This is a teaching simulation with no model calls. It maps the real n8n order and Day 4 contract. The ticket memory.md node is labelled as a local exercise extension; do not present it as n8n parity. Technical logs remain append-only evidence, while memory.md is a reviewed summary.",
    "teach": {
      "next": "The dictionary: last session's blocks, today's names",
      "time": "3 min",
      "gist": "Show the complete Day 4 route as one interactive React Flow map.",
      "script": [
        {"do":"Open the interactive map and choose Play route.","say":"Chat and commands are two doors into the same ticket flow. The route and output contract stay the same."},
        {"do":"Click Context, Risk and Reply in order.","say":"Context reads first, Risk advises before priority is final, and Reply writes the draft last."},
        {"do":"Click technical logs and ticket memory.md.","say":"Logs record execution events. The reviewed memory file is a separate local exercise extension."}
      ],
      "do": ["Play the route once.","Show the output contract and human gate.","Separate technical logs from reviewed file memory."],
      "done": ["Participants can describe the route without treating the map as a live run."],
      "watch": ["The map is a teaching simulation, not runtime evidence.","memory.md is not part of the original n8n workflow."]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "The dictionary: last session's blocks, today's names",
    "kicker": "Concept recap · overview",
    "type": "concept",
    "layout": "compare",
    "visual": {
      "highlight": [
        {
          "in": "subtitle",
          "text": "Same person at the end",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "Every block from last session, with its name in code. And still a person at the end.",
    "columns": [
      {
        "title": "n8n · last session",
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
        "title": "Code · today",
        "items": [
          "query()",
          "CLAUDE.md",
          "maxTurns",
          "session resume",
          "json_schema",
          "lib/switch.mjs",
          "MCP tool"
        ]
      },
      {
        "title": "What it means",
        "items": [
          "Asks the AI",
          "The agent's work instructions",
          "Maximum number of rounds, so it never loops forever",
          "Continues the conversation",
          "The form",
          "The trays",
          "The lookup desk"
        ]
      }
    ],
    "keyPoints": [
      "Everything from last session comes back",
      "Only the name changes",
      "Same person at the end"
    ],
    "notes": "Go row by row, from top to bottom. Everything they built last session comes back today, and only the name changes. Every draft is still checked by a person. For you: the Customer Context Agent with its Data Table becomes the customers MCP tool (get_customer, over customer_context.csv), and the transaction lookup becomes the transactions MCP tool (get_transaction, over transactions.xlsx).",
    "stateId": "10:n8n ↔ Agent SDK at a glance",
    "teach": {
      "next": "How does an agent work?",
      "time": "3 min",
      "gist": "The dictionary: last session's block, today's name, and what it means. One row per click.",
      "script": [
        {
          "say": "This is our dictionary. On the left is what you built last session. In the middle is what it is called today. On the right is what it means."
        },
        {
          "do": "Go through the rows from top to bottom. Read the right column out loud.",
          "say": "The AI Agent becomes query(): ask the AI. The System Message becomes CLAUDE.md: the work instructions. And so on."
        },
        {
          "do": "Stop at Max Iterations.",
          "say": "maxTurns is the maximum number of rounds. So the agent can never keep going forever."
        },
        {
          "ask": "Which row is last session's form?",
          "say": "(Answer: Priority Parser, json_schema.)"
        },
        {
          "say": "Everything from last session comes back. Only the name changes. And at the end there is still a person who checks."
        }
      ],
      "do": [
        "Click through row by row.",
        "Read the right column."
      ],
      "done": [
        "Everyone can find last session's blocks in today's names."
      ],
      "watch": [
        "Do not explain every technical name in depth. The right column is enough for now. The details come with each step."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "How does an agent work?",
    "kicker": "Concept · the agent loop",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/agent-loop-kitchen.svg",
      "imageAlt": "1 The AI thinks. 2 The AI asks. 3 The code checks if it is allowed. 4 The code does it and hands it back. Round after round, until done; then a person checks the answer.",
      "imageLink": "The agent loop · chef and kitchen assistant"
    },
    "subtitle": "Think of a chef and a kitchen assistant: the AI thinks and asks; the code checks and acts.",
    "cards": [
      {
        "title": "AI = the chef",
        "body": "Thinks and asks, but never touches anything itself."
      },
      {
        "title": "Code = the kitchen assistant",
        "body": "Checks whether it is allowed, does it, and hands back the result."
      },
      {
        "title": "Done is not proof",
        "body": "When the AI says “done”, a person checks the proof."
      }
    ],
    "keyPoints": [
      "Model requests; runtime executes.",
      "Check permission before a tool runs.",
      "Hooks can inspect defined before/after events.",
      "Text is not success; check evidence.",
      "Errors, limits and people can stop the run."
    ],
    "notes": "Think of a chef and a kitchen assistant. The AI is the chef: it thinks and asks 'give me the customer details'. The code is the assistant: it checks 'is the chef allowed this?', fetches it and hands it back. The chef carries on with what it received. This goes on round after round, until the dish is ready, until the maximum number of rounds (maxTurns) is reached, or until something is refused. There are two things to remember. The AI never touches anything itself: it only asks. And 'the AI says it is done' is not proof, so always check the evidence. A hook checks at fixed moments (for example before a change). That is not the same as a person approving.",
    "stateId": "11:One agent loop. Bounded actions.",
    "teach": {
      "next": "Which login do we use? And whose data?",
      "time": "4 min",
      "gist": "The chef (the AI) asks, and the kitchen assistant (the code) checks and does. The AI never touches anything itself. 'Done' is not proof.",
      "script": [
        {
          "say": "How does an agent actually work? Think of a chef and a kitchen assistant."
        },
        {
          "do": "Point at box 1 and 2.",
          "say": "The AI is the chef. It thinks, and then says: give me the customer details."
        },
        {
          "do": "Point at box 3 and 4.",
          "say": "The code is the kitchen assistant. First it checks: is the chef allowed this? Then it fetches it and hands it back."
        },
        {
          "do": "Trace the arrows round with your finger.",
          "say": "The chef carries on with what it received. Round after round, until the dish is ready."
        },
        {
          "do": "Point at the orange line at the top.",
          "say": "And when the chef says the dish is ready? Then a person tastes it first."
        },
        {
          "say": "Remember two things. One: the AI never touches anything itself. It only asks. Two: when the AI says it is done, that is not proof. You always check the evidence."
        },
        {
          "ask": "Who actually looks up the customer: the AI or the code?",
          "say": "(Answer: the code. The AI only asks.)"
        }
      ],
      "do": [
        "Tell the story of the chef and the kitchen assistant.",
        "Give the two rules: the AI only asks, and 'done' is not proof."
      ],
      "done": [
        "Everyone can say who asks and who does."
      ],
      "watch": [
        "People may think the AI 'goes into' the system itself. Repeat: it only asks, and the code does it.",
        "The loop also stops when the maximum number of rounds is reached, or when something is refused."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Which login do we use? And whose data?",
    "kicker": "Concept · choose a backend",
    "type": "concept",
    "visual": {},
    "subtitle": "We use the Claude Code login you set up on Day 1. You do not need to request anything new.",
    "cards": [
      {
        "title": "What you use",
        "body": "Your Claude Code login: the same one as on Days 1 and 2."
      },
      {
        "title": "What you don't need",
        "body": "An API key. There is nothing new to request."
      },
      {
        "title": "All data is fictional",
        "body": "Every customer, payment and message in this package is made up. Never paste real customer data into it."
      }
    ],
    "keyPoints": [
      "Use your Claude Code login",
      "No API key needed"
    ],
    "notes": "For you: the same agent can also run with a paid API key. Be careful: if someone has an API key set on their laptop, the package uses it by itself. In that case, add --backend claude-code to the command. The n8n trial credits from Day 3 do not work here. Company laptops (Worldline) often run Claude Code through Vertex AI. The package reads that login from the env block in ~/.claude/settings.json, so nobody needs a .env file or an API key. If a run on such a laptop says it is not logged in, run npm run doctor: the Login settings line should name CLAUDE_CODE_USE_VERTEX. If it says none, the company sets the login somewhere else, for example in a script or alias. Then follow docs/SETUP.md, Company login: three variables in the terminal, and the lesson runs.",
    "stateId": "12:Two ways to run the same agent",
    "teach": {
      "next": "Words you need today",
      "time": "1 min",
      "gist": "We run on the Claude Code login from Day 1. No API key is needed.",
      "script": [
        {
          "say": "Good news: you already have everything. We use your Claude Code login from Day 1. You do not need to request anything new."
        },
        {
          "say": "And one important rule: all data in this package is fictional. Every customer, payment and message is made up. Never paste real customer data into it."
        }
      ],
      "do": [
        "Say: your Claude Code login is enough."
      ],
      "done": [
        "Nobody is looking for an API key."
      ],
      "watch": [
        "Does someone's run choose 'sdk' by itself? Then an API key is set on their laptop. Add --backend claude-code to the command.",
        "The n8n trial credits from last session do not work here.",
        "Company laptop on Vertex AI and a run says it is not logged in? Run npm run doctor. The Login settings line should name CLAUDE_CODE_USE_VERTEX. If it says none, follow docs/SETUP.md, Company login (three variables in the terminal)."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Words you need today",
    "kicker": "Before we start · Words",
    "type": "concept",
    "subtitle": "Six words that return in every prompt-first assignment.",
    "cards": [
      {
        "title": "Prompt",
        "body": "The task and boundaries you paste into Claude Code."
      },
      {
        "title": "Diff",
        "body": "The exact file changes. Read it before you continue."
      },
      {
        "title": "Check",
        "body": "A repeatable command with an observable result."
      },
      {
        "title": "Trace",
        "body": "The actual specialist and tool order from a real run."
      },
      {
        "title": "OPEN",
        "body": "A claim that still lacks evidence."
      },
      {
        "title": "Human review",
        "body": "Your decision after you read the diff and evidence."
      }
    ],
    "notes": "Use the same six words all day. Claude Code may run package scripts after it explains them. The assignment is the prompt, the participant choice, the diff, the check and the human review.",
    "keyPoints": [
      "Prompt first.",
      "Read the diff.",
      "Claims without proof stay OPEN."
    ],
    "teach": {
      "next": "Demo · Step 0: is your laptop ready?",
      "time": "2–4 min",
      "gist": "Six words that return in every prompt-first assignment.",
      "script": [
        {
          "say": "Use the same six words all day. Claude Code may run package scripts after it explains them. The assignment is the prompt, the participant choice, the diff, the check and the human review."
        }
      ],
      "do": [],
      "done": [
        "The room can explain words you need today."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Demo · Step 0: is your laptop ready?",
    "kicker": "Demo · Step 0 · I show it",
    "type": "concept",
    "visual": {},
    "subtitle": "Before we build anything, we check that everything is in place. I'll show you now; on the next slide, you do the same.",
    "cards": [
      {
        "title": "1 · npm ci",
        "body": "Installs the parts of the package, like unpacking a toolbox."
      },
      {
        "title": "2 · npm run doctor",
        "body": "The health check: are Node and Claude Code installed and up to date? Look for: meets minimum."
      },
      {
        "title": "3 · npm run verify",
        "body": "Runs the tests. Look for: fail 0."
      },
      {
        "title": "4 · npm run lesson1 -- MSG-01 --dry-run",
        "body": "A dress rehearsal: shows what the agent would receive, without calling the AI. Look for: backend: claude-code. The {} is the agent's settings, still empty: you fill them in Step 1."
      }
    ],
    "keyPoints": [
      "Install, health check, tests, rehearsal",
      "The AI does nothing yet",
      "Look for: backend: claude-code"
    ],
    "notes": "Show the prepared trainer result. On the next slide, participants paste the SOLO 0 prompt into Claude Code and inspect the same evidence. Point at 'backend: claude-code': the package uses their Claude Code login. A dry run proves setup, not model quality. Platform setup is in docs/SETUP.md. The public workshop package is https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent.",
    "stateId": "14:Demo · Step 0: the offline path",
    "teach": {
      "next": "Your turn · Step 0",
      "time": "5 min",
      "gist": "Demo: install, health check, tests and dress rehearsal. The AI does nothing yet.",
      "script": [
        {
          "say": "Before we build anything, I will show you how to check that your laptop is ready. Just watch. On the next slide you do it yourself."
        },
        {
          "say": "First we check that the stage is set. It is like a dress rehearsal: the AI does nothing yet."
        },
        {
          "do": "Type npm ci.",
          "say": "This installs all the parts.",
          "clip": "assets/day4-teach/a07-1-clone-install-doctor.mp4"
        },
        {
          "do": "Type npm run doctor.",
          "say": "This is the health check: are Node and Claude Code installed, and are they recent enough? Look for 'meets minimum'."
        },
        {
          "do": "Type npm run verify.",
          "say": "This runs the tests.",
          "clip": "assets/day4-teach/a07-2-verify.mp4"
        },
        {
          "do": "Type npm run lesson1 -- MSG-01 --dry-run. Point at 'backend: claude-code'.",
          "say": "And this is the dress rehearsal. Do you see this line? It uses your Claude Code login. And it says: dry run, no model call. Two more things. The {} in the middle is the agent's settings: still empty, because you fill them in Step 1. And the line Claude Code equivalent shows what happens under the hood. You never type it.",
          "clip": "assets/day4-teach/a07-3-dry-runs.mp4"
        },
        {
          "ask": "Why do we rehearse first?",
          "say": "(Answer: if something is missing, you find out now, not halfway through the exercise.)"
        }
      ],
      "do": [
        "Show the four commands.",
        "Point at 'backend: claude-code'."
      ],
      "done": [
        "Everyone has seen the four commands and knows what each one does."
      ],
      "watch": [
        "Windows laptops: check docs/SETUP.md beforehand.",
        "A dry run says nothing about the quality of the agent. It only checks the setup.",
        "Every npm line shows aetherlink-day5-n8n-to-agent. That is the package's internal name: it is the right package for Day 4."
      ]
    },
    "tagline": "Why first? If something is missing, you find out now, not halfway through an exercise."
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Step 0",
    "kicker": "SOLO 0 · Inspect the prepared baseline",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "subtitle": "Open your own starter in Claude Code. Review the separate trainer reference without copying its implementation.",
    "steps": [
      {
        "text": "Clone your own starter. Keep its TODOs for the assignments.",
        "prompt": "git clone https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent.git\ncd aetherlink-day4-n8n-to-agent\nclaude --setting-sources project --strict-mcp-config --no-chrome"
      },
      {
        "text": "Add the trainer’s separate read-only reference folder or evidence pack to Claude Code context.",
        "after": "Keep working in your own starter. Copy no finished files. If the reference is missing, ask the trainer before SOLO 0."
      },
      {
        "text": "Paste the SOLO 0 prompt",
        "prompt": "Read n8n/support-triage.json, SOLO.md and the trainer evidence. Explain the source-to-app mapping. Inspect the prepared app diff, checks and real run. Show Customer Context → Risk → Customer Reply, output {priority, message}, the three routes, memory isolation and every OPEN gap. Help me type one fictional case for SOLO 1 and choose its observable check. Do not rebuild the whole app now. Stop after ten minutes."
      },
      {
        "text": "Inspect the map and evidence",
        "after": "Ask where each claim comes from. A dry run is setup evidence, not model evidence."
      }
    ],
    "expected": "You can explain the mapping and name the evidence behind the prepared baseline.",
    "notes": "Before class, the trainer prepares a separate reviewed reference and shares its diff, checks and real-run evidence. Participants keep their own unsolved main starter. During these ten minutes, review the reference without copying finished files. If it is missing, stop and ask the trainer. Then choose a fictional case and continue building in the starter on one personal branch.",
    "teach": {
      "next": "Check: does your screen look like this?",
      "time": "10 min",
      "gist": "Open your own starter in Claude Code. Review the separate trainer reference without copying its implementation.",
      "script": [
        {
          "say": "Before class, the trainer prepares a separate reviewed reference and shares its diff, checks and real-run evidence. Participants keep their own unsolved main starter. During these ten minutes, review the reference without copying finished files. If it is missing, stop and ask the trainer. Then choose a fictional case and continue building in the starter on one personal branch."
        }
      ],
      "do": [],
      "done": [
        "You can explain the mapping and name the evidence behind the prepared baseline."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Check: does your screen look like this?",
    "kicker": "What you see · Step 0",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step0.png",
      "imageLink": "Terminal: npm run verify passes, then the lesson 1 dry run"
    },
    "subtitle": "Compare your terminal with this screenshot. Look for two things.",
    "keyPoints": [
      "npm run verify: pass 9, fail 0. Your setup is correct.",
      "Dry run: The last line says: dry run — no model call. That is correct."
    ],
    "cards": [
      {
        "title": "1 · After npm run verify",
        "body": "Look for: fail 0. Your setup is correct."
      },
      {
        "title": "2 · After the dry run",
        "body": "The last line reads: dry run — no model call. That is correct: the AI has not done anything yet. The {} above it is the empty settings list."
      }
    ],
    "notes": "Show this after Step 0. The first line of the dry run says how the agent runs (backend: claude-code means your login). A dry run does not call the AI, so it says nothing about how good the agent is.",
    "stateId": "16:What you see · Step 0",
    "teach": {
      "next": "Coffee break",
      "time": "2 min",
      "gist": "Compare screens: fail 0, and the last line of the dry run.",
      "script": [
        {
          "say": "Compare your screen with this one. There are two things to look for."
        },
        {
          "do": "Point at card 1.",
          "say": "After verify, you should see fail 0. Then your setup is correct."
        },
        {
          "do": "Point at card 2.",
          "say": "After the dry run, the last line says: dry run, no model call. That is right: the AI has not done anything yet."
        },
        {
          "ask": "Hands up: who has fail 0?",
          "say": "(Not everyone there yet? Help them in the break.)"
        }
      ],
      "do": [
        "Compare with the screenshot.",
        "Count the hands: who has fail 0?"
      ],
      "done": [
        "Most of the room has fail 0. The rest get help in the break."
      ],
      "watch": [
        "The dry run says nothing about how good the agent is. It only checks the setup."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Coffee break",
    "kicker": "Day 4 · Break",
    "type": "pause",
    "visual": {
      "countdown": 15,
      "bot": "coffee",
      "place": "beside"
    },
    "subtitle": "Back at 11:15. Not at fail 0 yet? Stay for a moment and we'll fix it together.",
    "cards": [
      {
        "title": "Back at 11:15",
        "body": "Next: Step 1 · the form and chat memory."
      }
    ],
    "keyPoints": [
      "Say the return time: 11:15.",
      "Press ▶ Start on the timer.",
      "Check that everyone passed Step 0."
    ],
    "notes": "Say the return time out loud: 11:15. Use the break to help people who did not pass npm run verify in Step 0.",
    "stateId": "17:Short break",
    "teach": {
      "next": "CLAUDE.md: the agent's work instructions",
      "time": "15 min",
      "gist": "Break. Help anyone who does not have fail 0.",
      "script": [
        {
          "say": "We have a fifteen-minute break. Be back at 11:15. Not at fail 0 yet? Stay for a moment, and we will fix it together."
        },
        {
          "do": "Start the countdown."
        }
      ],
      "do": [
        "Start the countdown.",
        "Help people who do not have fail 0."
      ],
      "done": [
        "Everyone is at fail 0 before Step 1."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "CLAUDE.md: the agent's work instructions",
    "kicker": "Concept · work instructions",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/claude-md-three-parts.svg",
      "imageAlt": "CLAUDE.md in three parts: who you are, what you may not do, when is it what.",
      "imageLink": "01-single-agent/claude-project/CLAUDE.md"
    },
    "subtitle": "Last session, the instructions lived inside the n8n block (System Message). Today, they are a file next to the code, read on top of Claude's own system prompt.",
    "cards": [],
    "keyPoints": [
      "The system message now lives in a file next to the code."
    ],
    "notes": "It is like the work instructions that a new colleague gets on day one. The real file is 01-single-agent/claude-project/CLAUDE.md. Show it on screen: Purpose, Rules, Priority definitions and Required output. The last line of the Priority definitions is the tone trap: judge the impact, not the tone. In Step 1 they will cut that section out and see what happens.",
    "stateId": "18:System prompt",
    "teach": {
      "next": "The form, now in code",
      "time": "3 min",
      "gist": "CLAUDE.md holds the work instructions: who you are, what you may not do, and when a message is high, medium or low.",
      "script": [
        {
          "say": "Do you remember the System Message in n8n? Today that is a file: CLAUDE.md. Think of the work instructions that a new colleague gets on day one."
        },
        {
          "do": "Point at the three orange headings, left to right.",
          "say": "There are three parts. Who you are: a support assistant at a payment company. What you may not do: invent facts. And when a message is high, medium or low."
        },
        {
          "do": "Point at the orange box bottom right.",
          "say": "Look at this line: an angry tone alone never makes a message high. Remember it, because in Step 1 we will test it."
        },
        {
          "ask": "Why would you write that down?",
          "say": "(Answer: a calm customer can have a big problem, and an angry customer can have a small one. The AI must look at the problem, not the tone.)"
        }
      ],
      "do": [
        "Explain: CLAUDE.md is the work instructions.",
        "Name the three parts."
      ],
      "done": [
        "Everyone can say what is in CLAUDE.md."
      ],
      "watch": [
        "People may think CLAUDE.md is where Claude gets its knowledge. It is not: it says how to behave, not what Claude knows."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "The form, now in code",
    "kicker": "Concept · the form",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside",
      "highlight": [
        {
          "in": "subtitle",
          "text": "The trays (Switch) stay plain code",
          "tone": "orange"
        }
      ]
    },
    "subtitle": "Last session's Priority Parser becomes a JSON schema. The trays (the Switch) remain plain code.",
    "cards": [
      {
        "title": "Last session · Priority Parser",
        "body": "The form inside the n8n block."
      },
      {
        "title": "Today · json_schema",
        "body": "The same form, now as a file: priority-schema.mjs. Today it has two fields: priority and reason. The AI has to fill it in."
      },
      {
        "title": "The trays · lib/switch.mjs",
        "body": "Reads the priority and picks the route. Plain code, no AI."
      }
    ],
    "keyPoints": [
      "Structured Output Parser / Priority Parser defines the shape.",
      "outputFormat uses json_schema.",
      "lib/switch.mjs routes the parsed priority."
    ],
    "notes": "The Structured Output Parser becomes outputFormat with type json_schema (file 01-single-agent/priority-schema.mjs). In Claude Code in the terminal, the equivalent is the --json-schema flag. Then lib/switch.mjs maps low, medium and high to a fixed action and team. The AI gives the label, and the code picks the route.",
    "stateId": "19:Structured output: parser to JSON schema",
    "teach": {
      "next": "Session memory: the chat remembers this conversation",
      "time": "2 min",
      "gist": "The Parser becomes json_schema (the form as a file). The Switch stays code: the AI gives the label, and the code picks the route.",
      "script": [
        {
          "say": "Do you remember the form from last session, the Priority Parser? Today it is a file: the JSON schema."
        },
        {
          "do": "Point at the middle card.",
          "say": "It is the same form with the same fields. The AI has to fill it in, otherwise the answer is refused."
        },
        {
          "do": "Point at the last card.",
          "say": "And the trays stay plain code. No AI. The AI gives the label, and the code picks the route."
        },
        {
          "ask": "Why do we want the route in plain code, and not in the AI?",
          "say": "(Answer: then you always know exactly where a message goes. The same input always gives the same route.)"
        }
      ],
      "do": [
        "The Parser becomes json_schema.",
        "The Switch stays code."
      ],
      "done": [
        "Everyone can say: the AI gives the label, and the code picks the route."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Session memory: the chat remembers this conversation",
    "kicker": "Concept · memory",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Just like the shop counter from this morning's recap: with the same customer, you remember; with a new customer, you start afresh.",
    "cards": [
      {
        "title": "Last session · Simple Memory",
        "body": "The n8n block that remembered your favourite colour."
      },
      {
        "title": "Today · npm run chat",
        "body": "Continues the same conversation, so it remembers."
      },
      {
        "title": "Today · --no-memory",
        "body": "Every message starts a new conversation, so it forgets."
      }
    ],
    "keyPoints": [
      "Simple Memory carries a favourite-colour test across turns.",
      "npm run chat resumes with the previous sessionId.",
      "--no-memory starts each turn without resume."
    ],
    "notes": "The conversation is the memory: npm run chat passes the previous conversation on to the next message. With --no-memory every message starts fresh. Every npm run lesson1 is a new conversation on purpose, because one ticket is one case.",
    "stateId": "20:Memory is the session",
    "teach": {
      "next": "Step 1: one agent that fills in the form",
      "time": "2 min",
      "gist": "Memory is the conversation. npm run chat remembers it, and --no-memory forgets it.",
      "script": [
        {
          "say": "Do you remember the desk? With the same customer, you remember what they said. That is memory."
        },
        {
          "do": "Point at the first card.",
          "say": "Last session that was the Simple Memory block. You tested it with your favourite colour."
        },
        {
          "do": "Point at the other two cards.",
          "say": "Today npm run chat carries on the conversation, so it remembers. With --no-memory every message is a new conversation, so it forgets."
        },
        {
          "ask": "Why do we want every customer ticket to start fresh?",
          "say": "(Answer: customer B may never see anything from customer A.)"
        }
      ],
      "do": [
        "Memory is the conversation.",
        "Show it with and without --no-memory."
      ],
      "done": [
        "Everyone can say what --no-memory does."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Step 1: one agent that fills in the form",
    "kicker": "Step 1 · what you build",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "You give one agent its work instructions and the form. The code then sorts the answer into a tray.",
    "cards": [
      {
        "title": "What you build",
        "body": "One agent with CLAUDE.md and a form with two fields: priority and reason."
      },
      {
        "title": "Why",
        "body": "A fixed form makes the answer predictable, so the code can sort it."
      },
      {
        "title": "Done when",
        "body": "You have written down six labels and tested the tone trap."
      }
    ],
    "keyPoints": [
      "One agent returns a fixed priority. Code routes it."
    ],
    "notes": "Participants paste the current SOLO 1 prompt into Claude Code. Claude builds options.mjs, CLAUDE.md and priority-schema.mjs, adds focused tests and runs MSG-01 through MSG-06. Participants choose the fictional cases, inspect the diff and judge the actual evidence.",
    "stateId": "21:Step 1 · Structured priority output and chat memory",
    "teach": {
      "next": "Demo · Step 1: I show it",
      "time": "2 min",
      "gist": "Step 1: one agent with work instructions and a form. You are done when you have six labels and have tested the tone trap.",
      "script": [
        {
          "say": "Step 1. You build one agent. You give it its work instructions, CLAUDE.md, and the form."
        },
        {
          "do": "Point at Why.",
          "say": "Why the form? Because then the answer always has the same shape, and the code can sort it."
        },
        {
          "do": "Point at Done when.",
          "say": "You are done when you have written down six labels and tested the tone trap. Keep the labels, because you need them in Step 4."
        }
      ],
      "do": [
        "Name what they build.",
        "Name when they are done."
      ],
      "done": [
        "Everyone knows the goal of Step 1."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Demo · Step 1: I show it",
    "kicker": "Demo · Step 1 · I show it",
    "type": "concept",
    "visual": {},
    "subtitle": "Watch first. On the next slides, you do the same.",
    "cards": [
      {
        "title": "1 · Dress rehearsal",
        "body": "npm run lesson1 -- MSG-01 --dry-run\nLook for outputFormat: that is the form."
      },
      {
        "title": "2 · A real run",
        "body": "npm run lesson1 -- MSG-01\nLook for: Structured output, and Switch → low."
      },
      {
        "title": "3 · Memory",
        "body": "npm run chat\nGive it a colour, then ask for it back. Then try again with --no-memory."
      }
    ],
    "keyPoints": [
      "Show the dry run first. Then show a live run or the sample trace."
    ],
    "notes": "Use a prepared trainer copy. First, the dry run shows the options, including outputFormat. Second, a live run prints Structured output with the priority and reason, then the Switch line. If a live run is not possible, show docs/sample-trace.md and call it a sample. Third, show the colour test with and without --no-memory.",
    "stateId": "22:Demo · Step 1: schema, route, and memory",
    "tagline": "The AI gives the label. The code picks the tray.",
    "teach": {
      "next": "Your turn · Step 1: build the policy",
      "time": "5 min",
      "gist": "Demo from the prepared trainer copy: a dry run, a real run with the Switch line, and the memory test.",
      "script": [
        {
          "do": "Before class, prepare a completed Step 1 demo in a separate trainer copy."
        },
        {
          "say": "I will show the prepared result first. Just watch."
        },
        {
          "do": "Run the dry run. Point at outputFormat.",
          "say": "This is the dress rehearsal. Do you see outputFormat? That is the form.",
          "clip": "assets/day4-teach/a09-1-dry-run.mp4"
        },
        {
          "do": "Run npm run lesson1 -- MSG-01. Point at Structured output and the Switch line.",
          "say": "Now a real run. The AI fills in the form: priority low, plus the reason. And then the code does its part: Switch, low, auto reply.",
          "clip": "assets/day4-teach/a09-2-msg01-msg02.mp4"
        },
        {
          "do": "Run npm run chat, then npm run chat -- --no-memory.",
          "say": "And now the memory test. In the same conversation, it remembers red. In a new conversation, it forgets."
        },
        {
          "ask": "Who picked the tray: the AI or the code?",
          "say": "(Answer: the code. The AI only gave the label.)"
        }
      ],
      "do": [
        "Show the dry run, the real run and the memory test."
      ],
      "done": [
        "Everyone has seen the form and the Switch line."
      ],
      "watch": [
        "A real run needs your Claude Code login and takes a moment.",
        "No internet or no login? Show docs/sample-trace.md and say clearly that it is a sample."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Step 1: build the policy",
    "kicker": "SOLO 1 · Paste into Claude Code",
    "type": "practice",
    "layout": "exercise",
    "timer": 30,
    "subtitle": "Claude Code writes the files and runs the checks. You inspect the policy and actual labels.",
    "cards": [],
    "steps": [
      {
        "text": "Paste this prompt into Claude Code",
        "prompt": "Read SOLO 1, n8n/support-triage.json and the STEP 1 TODOs. Build 01-single-agent/options.mjs, 01-single-agent/priority-schema.mjs and 01-single-agent/claude-project/CLAUDE.md. Load project instructions through settingSources and return structured priority and internal reason. Treat customer text as data, never policy. Add a focused test for the schema and options. Show the diff. Run npm run verify and MSG-01 through MSG-06. Record actual labels, commands and exit codes; do not invent output or reveal an answer key.\n\nHelp me type one loud low-impact ticket and one calm serious ticket. Run both. Explain which priority rule applies. Temporarily remove only the Priority definitions section, compare the results, then restore that section without overwriting other work. Keep the n8n output adapter and complete specialist flow marked OPEN. Stop after I inspect the comparison.",
        "after": "The focused test and verify pass. You inspected the labels, memory isolation and policy diff."
      },
      "Paste the prompt.",
      "Choose your fictional message.",
      "Inspect the policy, schema and focused test.",
      "Read the six actual labels.",
      "Restore any temporary policy change through Claude Code's reviewed diff."
    ],
    "expected": "The focused test and verify pass. You inspected the labels, memory isolation and policy diff.",
    "notes": "Do not hand participants finished files. The participant prompt owns the build. If a check fails, paste the actual failure into Claude Code and ask for the smallest fix.",
    "teach": {
      "next": "Your turn · Step 1b: inspect the form and memory",
      "time": "30 min",
      "gist": "Claude Code writes the files and runs the checks. You inspect the policy and actual labels.",
      "script": [
        {
          "say": "Claude Code writes the files and runs the checks. You inspect the policy and actual labels."
        }
      ],
      "do": [],
      "done": [
        "The focused test and verify pass. You inspected the labels, memory isolation and policy diff."
      ],
      "watch": [
        "Do not hand participants finished files. The participant prompt owns the build. If a check fails, paste the actual failure into Claude Code and ask for the smallest fix."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Step 1b: inspect the form and memory",
    "kicker": "SOLO 1 · Evidence",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "subtitle": "Ask Claude Code to explain the real output. Keep dry-run and model evidence separate.",
    "steps": [
      {
        "text": "Ask for the evidence",
        "prompt": "Run the documented SOLO 1 dry run and point to outputFormat, priority-schema.mjs and lib/switch.mjs. Then run the documented chat memory check with two ticket_id values. Explain which output is setup evidence and which output came from a model. Show the commands and actual output. Change nothing. Stop for my review."
      },
      {
        "text": "Inspect the schema and switch",
        "after": "The model returns a label. Fixed code chooses the route."
      },
      {
        "text": "Inspect ticket isolation",
        "after": "One ticket must not see another ticket's messages."
      }
    ],
    "expected": "You can point to the form, the fixed route and proof that memory is isolated by ticket.",
    "notes": "Do not call dry-run JSON model output. A model run or the marked sample trace provides model evidence.",
    "teach": {
      "next": "Quiz: message 6",
      "time": "10 min",
      "gist": "Ask Claude Code to explain the real output. Keep dry-run and model evidence separate.",
      "script": [
        {
          "say": "Ask Claude Code to explain the real output. Keep dry-run and model evidence separate."
        }
      ],
      "do": [],
      "done": [
        "You can point to the form, the fixed route and proof that memory is isolated by ticket."
      ],
      "watch": [
        "Do not call dry-run JSON model output. A model run or the marked sample trace provides model evidence."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Quiz: message 6",
    "kicker": "Quiz · before the tone trap",
    "type": "quiz",
    "subtitle": "“URGENT!!! My logo is wrong!!! Fix it NOW please.” Which priority? Vote by raising your hand.",
    "visual": {
      "quiz": {
        "answer": 0
      },
      "bot": "stretchLeft",
      "place": "pointer",
      "pointAt": 0
    },
    "cards": [
      {
        "title": "A",
        "body": "LOW: a cosmetic issue with little customer or financial impact."
      },
      {
        "title": "B",
        "body": "MEDIUM: a real service problem for one customer."
      },
      {
        "title": "C",
        "body": "HIGH: the customer is angry and says it is urgent."
      }
    ],
    "check": "Answer: LOW",
    "notes": "From Maarten's Day 4 deck. Answer: LOW. An old logo in the portal is cosmetic, however loud the message is. Contrast it with message 2: polite, but three card payments the customer does not recognise is possible fraud, so HIGH. That is exactly why the work instructions say: judge impact and risk, not tone. Next: what happens without those rules.",
    "teach": {
      "next": "Your turn · Step 1c: challenge the policy",
      "time": "3 min",
      "gist": "Quiz: the loud logo message is LOW. Impact, not tone.",
      "script": [
        {
          "say": "Before the tone trap, a quick quiz. Read the message on the screen. Hands up: low, medium or high?"
        },
        {
          "do": "Count the hands, then press → to strike the wrong answers."
        },
        {
          "say": "The answer is LOW. An old logo is cosmetic, however loud the message is."
        },
        {
          "ask": "Message 2 was polite. Which priority did it get, and why?",
          "say": "(Answer: HIGH. Three card payments the customer does not recognise could be fraud. Impact, not tone.)"
        },
        {
          "say": "Now let's see what happens when we remove that rule."
        }
      ],
      "do": [
        "Vote, reveal, contrast with message 2."
      ],
      "done": [
        "Everyone can say: impact, not tone."
      ],
      "watch": [
        "Many people vote HIGH. That is the point: it is exactly the tone trap."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Step 1c: challenge the policy",
    "kicker": "SOLO 1 · Improvement",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "subtitle": "Let Claude Code test a weakness. You approve the experiment and inspect the restoration.",
    "steps": [
      {
        "text": "Paste the improvement prompt",
        "prompt": "Read my SOLO 1 diff and actual runs. Propose one temporary policy change that could expose tone bias without changing the fixed route. Wait for my approval. After approval, run MSG-01 and MSG-06 before and after. Record the labels and explain whether the result changed. Restore the accepted policy from the current diff, rerun npm run verify and show the clean restoration. Do not use a finished branch or reveal an answer key. Stop for my review."
      },
      {
        "text": "Approve one temporary change",
        "after": "The experiment may change the model result. It may also show that the model got lucky."
      },
      {
        "text": "Inspect the restoration",
        "after": "The policy returns through the reviewed diff."
      }
    ],
    "expected": "You have before-and-after evidence, a restored policy and a green verify run.",
    "notes": "The result can stay the same. The lesson is that removing the rule removes the guarantee.",
    "teach": {
      "next": "Check: does your screen look like this?",
      "time": "15 min",
      "gist": "Let Claude Code test a weakness. You approve the experiment and inspect the restoration.",
      "script": [
        {
          "say": "The result can stay the same. The lesson is that removing the rule removes the guarantee."
        }
      ],
      "do": [],
      "done": [
        "You have before-and-after evidence, a restored policy and a green verify run."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Check: does your screen look like this?",
    "kicker": "What you see · Step 1",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step1.png",
      "imageLink": "Sample trace: the agent returns JSON, then the Switch picks a route"
    },
    "subtitle": "After a real run. Look for two things.",
    "keyPoints": [
      "Structured output: JSON with priority and reason.",
      "Switch line: Switch → low → AUTO_REPLY. Code picks the route, not the model."
    ],
    "cards": [
      {
        "title": "1 · Structured output",
        "body": "The completed form: priority and reason."
      },
      {
        "title": "2 · The Switch line",
        "body": "Switch → low → AUTO_REPLY. The code picked the tray, not the AI."
      }
    ],
    "notes": "This is the labelled sample in docs/sample-trace.md. A live run shows the same labels with different text. The [result] line shows the turns, the time and the cost.",
    "stateId": "27:What you see · Step 1",
    "teach": {
      "next": "Discuss: who decides what?",
      "time": "2 min",
      "gist": "Compare: the filled-in form, then the Switch line.",
      "script": [
        {
          "say": "Compare your screen with this one. There are two things to look for."
        },
        {
          "do": "Point at card 1.",
          "say": "The first is the filled-in form: the priority and the reason."
        },
        {
          "do": "Point at card 2.",
          "say": "The second is the Switch line: the code picked the tray."
        },
        {
          "ask": "Your reason text is different from mine. Is that a problem?",
          "say": "(Answer: no. The words differ on every run. The priority and the route are what matter.)"
        }
      ],
      "do": [
        "Compare with the screenshot."
      ],
      "done": [
        "Everyone has found both lines."
      ],
      "watch": [
        "This screenshot is a sample: the reason text is different on every run."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Discuss: who decides what?",
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
    "subtitle": "At your table (3–4 people), 2 minutes. One person shares your table's answer; you may pass. Then click to reveal.",
    "cards": [
      {
        "title": "The form",
        "body": "Which values can priority have?"
      },
      {
        "title": "The tray",
        "body": "Who picks the route: the AI or the code?"
      },
      {
        "title": "Memory",
        "body": "What changes with --no-memory?"
      }
    ],
    "keyPoints": [
      "The schema constrains the agent's output.",
      "lib/switch.mjs routes the parsed priority.",
      "Chat session resume carries memory across turns."
    ],
    "notes": "Answers: the form allows only low, medium or high. The code (lib/switch.mjs) picks the route, and the AI only gives the label. With --no-memory every message is a new conversation, so it forgets.",
    "stateId": "28:Discuss: what makes the route predictable?",
    "teach": {
      "next": "Context: what can the AI see at once?",
      "time": "4 min",
      "gist": "Discussion: the form, the tray and the memory. The AI gives the label, and the code picks the route.",
      "script": [
        {
          "say": "You have two minutes at your table. There are three questions on the screen."
        },
        {
          "ask": "Which values can priority have?",
          "say": "(Answer: only low, medium or high. The form allows nothing else.)"
        },
        {
          "ask": "Who picks the route?",
          "say": "(Answer: the code. The AI only gives the label.)"
        },
        {
          "ask": "What changes with --no-memory?",
          "say": "(Answer: every message is a new conversation, so it forgets.)"
        }
      ],
      "do": [
        "Let the tables talk, then click through each card."
      ],
      "done": [
        "Every table has answered at least one question."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "stateId": "w4-context-window",
    "title": "Context: what can the AI see at once?",
    "kicker": "Context · cache · compaction",
    "type": "concept",
    "subtitle": "Think of a desk. The AI can only see what is on it: the instructions, the conversation and the tool results. And the desk has a size limit.",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/context-desk.svg",
      "imageAlt": "The desk: what the AI sees at once",
      "imageLink": "Context · the desk"
    },
    "cards": [],
    "keyPoints": [
      "Files on disk are not all in context.",
      "Loaded history and tool results use tokens.",
      "Keep room for the response."
    ],
    "notes": "The context window is the desk: everything the AI can see in one go (the instructions, CLAUDE.md, the conversation and the tool results). It has a maximum size. Show /context in Claude Code itself (not in npm run chat): it shows how full the desk is.",
    "teach": {
      "next": "Caching: no need to read it twice",
      "time": "3 min",
      "gist": "Context is the desk. The AI only sees what is on it, and the desk has a limit.",
      "script": [
        {
          "say": "How much can the AI see at once? Think of a desk."
        },
        {
          "do": "Point at the diagram.",
          "say": "On the desk are the work instructions, the conversation so far, and what the tools handed back. Only that. And the desk has a maximum size."
        },
        {
          "do": "Open Claude Code and type /context.",
          "say": "This shows how full the desk is right now."
        },
        {
          "ask": "What happens when the desk is full?",
          "say": "(Answer: something has to go. That is what the next two slides are about.)"
        }
      ],
      "do": [
        "Explain the desk.",
        "Show /context in Claude Code."
      ],
      "done": [
        "Everyone can say what is on the desk."
      ],
      "watch": [
        "/context works in Claude Code itself, not inside npm run chat."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "stateId": "w4-prompt-cache",
    "title": "Caching: no need to read it twice",
    "kicker": "Context · cache · compaction",
    "type": "concept",
    "subtitle": "Like a bookmark: what the AI has already read can be reused, which is faster. But it still takes up space on the desk.",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/caching-bookmark.svg",
      "imageAlt": "The bookmark: reuse what was read",
      "imageLink": "Caching · the bookmark"
    },
    "cards": [],
    "keyPoints": [
      "The prefix match is exact, not semantic.",
      "Cache reads, cache writes and output have different costs.",
      "A cache hit does not enlarge the context window."
    ],
    "notes": "Claude Code does this by itself (prompt caching): a part that is exactly the same as before is reused, which saves time and cost. It does not make the desk bigger, because the cached part still counts in the context.",
    "teach": {
      "next": "Compaction: make room by summarising",
      "time": "2 min",
      "gist": "Caching is a bookmark: it is faster, but the text is still on the desk.",
      "script": [
        {
          "say": "Caching is like a bookmark. What the AI has already read, it does not need to read again. That is faster and cheaper."
        },
        {
          "say": "But be careful: it still lies on the desk. Caching makes it faster, not bigger."
        },
        {
          "ask": "Does caching give the AI more memory?",
          "say": "(Answer: no. It only gives speed.)"
        }
      ],
      "do": [
        "The bookmark: faster, not bigger."
      ],
      "done": [
        "Everyone knows that caching is not extra memory."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "stateId": "w4-context-compaction",
    "title": "Compaction: make room by summarising",
    "kicker": "Context · cache · compaction",
    "type": "concept",
    "subtitle": "When the desk is full, the conversation is summarised. A summary loses detail, so check that the important rules are still there.",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/compaction-summary.svg",
      "imageAlt": "Summarise to make room, then check",
      "imageLink": "Compaction · summarise"
    },
    "cards": [],
    "keyPoints": [
      "Write down one criterion and one safety boundary.",
      "Compare /context before and after /compact.",
      "Restore missing requirements before continuing."
    ],
    "notes": "Compaction replaces the long history with a shorter summary (/compact in Claude Code). That is not a perfect copy, and details can disappear. Do it at a natural break (the end of a task), and then check that the important rules still hold, for example 'priority must be low, medium or high' and 'draft only: a person checks first'. Try it in Claude Code itself, not inside npm run chat.",
    "teach": {
      "next": "n8n recap · before memory was connected",
      "time": "3 min",
      "gist": "Compaction means summarising to make room. A summary loses details, so check it afterwards.",
      "script": [
        {
          "say": "Is the desk full? Then the conversation is summarised. In Claude Code, that is /compact."
        },
        {
          "say": "A summary is not a copy. Details can disappear. So after compacting you check: are the important rules still there?"
        },
        {
          "ask": "Which rule from today would you never want to lose?",
          "say": "(For example: a person checks before anything goes to the customer.)"
        }
      ],
      "do": [
        "Summarise, then check."
      ],
      "done": [
        "Everyone knows: compact at a break, then check."
      ],
      "watch": [
        "Try /compact in Claude Code itself, not inside npm run chat."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "n8n recap · before memory was connected",
    "kicker": "Real class screenshot · before",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-maarten-n8n/03-chat-memory.jpeg",
      "imageLink": "n8n · AI Agent with an empty Memory socket"
    },
    "subtitle": "This is the real class flow before Simple Memory was attached. The model is connected; the Memory socket is still empty.",
    "cards": [],
    "keyPoints": [
      "A conversation is not a curated memory file.",
      "An execution log is not user memory.",
      "The empty socket proves memory was not connected yet."
    ],
    "notes": "Show the real screenshot from the class. Point to the chat panel, the execution log and the empty Memory socket. Say explicitly that the model is connected but memory is not. This prevents the screenshot from being used as false evidence.",
    "teach": {
      "next": "n8n recap · after Simple Memory was connected",
      "time": "2 min",
      "gist": "Before Simple Memory: chat and logs exist, but the Memory socket is empty.",
      "script": [
        {
          "do": "Point to the Memory socket under the AI Agent.",
          "say": "This is our real n8n flow before memory was connected. The chat and the execution log exist, but the empty socket does not remember anything."
        },
        {
          "do": "Point to the chat panel and then the execution log.",
          "say": "The conversation contains messages. The log contains technical events. Neither one is the curated ticket memory we will build."
        }
      ],
      "do": [
        "Show the empty Memory socket and name what the screenshot does not prove."
      ],
      "done": [
        "Participants can distinguish conversation, logs and absent memory."
      ],
      "watch": [
        "Do not say that Simple Memory is connected in this screenshot."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "n8n recap · after Simple Memory was connected",
    "kicker": "Real class screenshot · after",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/day4-memory/with-memory.png",
      "imageLink": "n8n · Simple Memory connected and a colour recalled"
    },
    "subtitle": "This real class run shows Simple Memory connected. The same chat recalls that the favourite colour is red.",
    "cards": [],
    "keyPoints": [
      "The screenshot shows real connected memory.",
      "The recalled colour is visible evidence.",
      "File memory is a separate, reviewed artifact."
    ],
    "notes": "Point to the connected Simple Memory node and the answer in the chat. This is evidence for conversation memory. Then draw the boundary: today the participant will add a small reviewed file for durable ticket facts. Claude Code does not load that file magically; a new session must read it explicitly.",
    "teach": {
      "next": "Your turn · Build T-001 memory",
      "time": "2 min",
      "gist": "After Simple Memory: the same conversation recalls a fact. Durable ticket memory remains a separate artifact.",
      "script": [
        {
          "do": "Point to the connected Simple Memory node and the recalled colour.",
          "say": "Now we have evidence. The memory node is connected, and the same conversation remembers red."
        },
        {
          "say": "Our next step is different. We create one reviewed memory.md per ticket. A new Claude Code session must read that file explicitly."
        }
      ],
      "do": [
        "Show the connected node and the recalled fact."
      ],
      "done": [
        "Participants can explain why conversation memory and file memory are different."
      ],
      "watch": [
        "Do not claim that conversation memory automatically writes or loads memory.md."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Build T-001 memory",
    "kicker": "SOLO 1M · Paste into Claude Code",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "subtitle": "Use Claude Code itself as the chat. Propose, review and write one small T-001 memory file.",
    "cards": [
      {
        "title": "Scenario",
        "body": "Create durable T-001 context without inventing a conversation or log event."
      },
      {
        "title": "Starting state",
        "body": "Two separate fictional source files exist. No conversation, log event or memory file exists yet."
      },
      {
        "title": "Stop",
        "body": "Stop after the approved T-001 file and diff are visible."
      }
    ],
    "steps": [
      {
        "text": "1 · Build T-001 memory in this Claude Code session",
        "prompt": "Use Claude Code itself as our chat. Do not build a UI, add a model API call, or change the Agent SDK flow. Read docs/memory-lab/T-001.md only. No conversation or technical log exists for this exercise, so do not invent either one. Explain the difference between conversation/session resume, append-only technical logging, and a curated ticket memory file.\n\nPropose tickets/T-001/memory.md with exactly these headings: Confirmed facts, Decisions, Open questions, and Next step. Map every item to a stable T-001 source label. Preserve uncertain source claims as OPEN: under Open questions. Keep only durable ticket context. Do not include credentials, authentication data, tokens, personal data, a transcript dump, or speculation. Show the proposed file and wait for my approval. After I approve, create only tickets/T-001/memory.md and show the diff. Stop and tell me to open a fresh Claude Code session.",
        "after": "The approved T-001 file exists. The fictional source pack remains unchanged. No log event was invented."
      }
    ],
    "expected": "The approved T-001 memory file contains sourced facts, decisions, open questions and a next step.",
    "notes": "This is a documentation exercise inside Claude Code, not a new application feature. Ask participants to show the T-001 proposal and approval pause before the write. File memory is manual curation. Logs remain append-only technical evidence; memory.md is a small reviewed summary. Reject secrets, authentication data, full transcripts and unsupported claims. Stop after the T-001 file and diff.",
    "teach": {
      "next": "Your turn · Resume T-001 explicitly",
      "time": "10 min",
      "gist": "Propose and approve the T-001 memory before Claude Code writes it.",
      "script": [
        {
          "say": "Use Claude Code itself as the chat. We are not building another UI and we are not adding an API call."
        },
        {
          "do": "Ask for the T-001 proposal. Stop before the write.",
          "say": "Review the four sections and every source reference. Remove secrets, transcript dumps and guesses."
        }
      ],
      "do": [
        "Review the T-001 proposal before writing.",
        "Inspect the approved T-001 file and diff."
      ],
      "done": [
        "The T-001 file is small, sourced and approved.",
        "The T-001 source fixture is unchanged."
      ],
      "watch": [
        "File memory is curated context, not a transcript dump.",
        "Technical logs stay append-only and are not memory.md.",
        "Never store credentials, authentication data or tokens."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Resume T-001 explicitly",
    "kicker": "SOLO 1M · Fresh Claude Code session",
    "type": "practice",
    "layout": "exercise",
    "timer": 5,
    "subtitle": "Open a fresh Claude Code session. Read only the reviewed memory file; do not replay the conversation or read logs.",
    "steps": [
      {
        "text": "Paste this into a fresh Claude Code session",
        "prompt": "This is a fresh Claude Code session. Read only tickets/T-001/memory.md. Do not read a transcript, technical log, T-002 source, or T-002 memory. Summarize the confirmed facts, decisions, open questions, and next step with their source references. State that you read this file explicitly and that it was not loaded automatically. Propose no implementation. Stop after the summary.",
        "after": "The new session resumes from memory.md without replaying a conversation or reading logs."
      }
    ],
    "expected": "The summary comes only from tickets/T-001/memory.md and states that the file was read explicitly.",
    "notes": "This is the proof that file memory is manual curation, not automatic session memory. The participant must open a genuinely fresh Claude Code session and must not replay the earlier conversation.",
    "teach": {
      "next": "Your turn · Prove T-002 isolation",
      "time": "5 min",
      "gist": "A fresh session resumes T-001 only after explicitly reading its reviewed file.",
      "script": [
        {"do":"Ask participants to open a fresh Claude Code session.","say":"Do not continue the old conversation. Paste the resume prompt and watch which file Claude reads."},
        {"do":"Inspect the summary and source references.","say":"Nothing loaded this file magically. The prompt named it explicitly."}
      ],
      "do": ["Prove the fresh session reads only tickets/T-001/memory.md."],
      "done": ["T-001 resumes without replaying a conversation or reading logs."],
      "watch": ["A continued session is not fresh-session evidence."]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Prove T-002 isolation",
    "kicker": "SOLO 1M · Another fresh session",
    "type": "practice",
    "layout": "exercise",
    "timer": 5,
    "subtitle": "Read only the separate T-002 fixture. You compare T-001 and T-002 after Claude stops.",
    "steps": [
      {
        "text": "Paste this into another fresh Claude Code session",
        "prompt": "This is another fresh Claude Code session. Read docs/memory-lab/T-002.md only. Do not read docs/memory-lab/T-001.md or tickets/T-001/memory.md. Propose tickets/T-002/memory.md with exactly these headings: Confirmed facts, Decisions, Open questions, and Next step. Map every item to a stable T-002 source label. Preserve uncertain source claims as OPEN: under Open questions. Do not include credentials, authentication data, tokens, personal data, a transcript dump, or speculation. Show the proposal and wait for my approval. After I approve, create only tickets/T-002/memory.md and show the diff. Do not create or rewrite technical logs. Stop for my isolation review.",
        "after": "Every T-002 item maps to a T-002 label. A human compares both files for leakage."
      },
      "Compare the two files yourself. T-002 must contain none of T-001/F1, T-001/D1, T-001/O1 or T-001/N1."
    ],
    "expected": "T-002 has a separate reviewed file. Every item maps to a T-002 label, and your comparison finds no T-001 fact.",
    "notes": "Claude does not read T-001 during this session and therefore cannot prove absence against it. The participant performs the final comparison after Claude stops. This is a learning protocol, not a filesystem security boundary.",
    "teach": {
      "next": "Lunch",
      "time": "5 min",
      "gist": "Build T-002 from its own source, then let the participant compare both files for leakage.",
      "script": [
        {"do":"Start another fresh session and paste the T-002 prompt.","say":"Claude reads only the T-002 fixture. Every claim must map to a T-002 label."},
        {"do":"After Claude stops, compare both memory files yourself.","say":"The human comparison is the isolation check. Claude never opened T-001 in this session."}
      ],
      "do": ["Map T-002 claims to T-002 labels.","Perform the cross-ticket comparison yourself."],
      "done": ["T-002 contains no T-001 source label or fact."],
      "watch": ["Do not ask the isolated session to read T-001 for its own comparison."]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Lunch",
    "kicker": "Day 4 · Lunch",
    "type": "pause",
    "visual": {
      "countdown": 45,
      "bot": "sleepy",
      "place": "beside"
    },
    "subtitle": "Back at 14:00. Fallen behind? Give Claude Code the failing check and ask for the smallest fix.",
    "cards": [
      {
        "title": "Back at 14:00",
        "body": "Next: Step 2 · specialists for risk and the customer reply."
      }
    ],
    "keyPoints": [
      "Lunch: back at 14:00.",
      "Fell behind? Keep your branch and fix the first failing check after lunch.",
      "Check your Claude Code login."
    ],
    "notes": "Lunch runs from 13:15 to 14:00. Help participants continue on their current branch. Use the actual failing check and the smallest fix.",
    "stateId": "37:Lunch",
    "teach": {
      "next": "Tools: what may each agent use?",
      "time": "45 min",
      "gist": "Lunch. Be back at 14:00.",
      "script": [
        {
          "say": "Enjoy your lunch. Be back at 14:00. If you are behind, keep your work and ask Claude Code to fix the first failing check."
        },
        {
          "do": "Start the countdown."
        }
      ],
      "do": [
        "Start the countdown."
      ],
      "done": [
        "Everyone knows the time to be back."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Tools: what may each agent use?",
    "kicker": "Concept · Tools",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "In code, you write down which tools an agent has and which ones it is allowed to use.",
    "cards": [
      {
        "title": "tools",
        "body": "The toolbox: which tools exist for this agent."
      },
      {
        "title": "allowedTools",
        "body": "Can be used without asking."
      },
      {
        "title": "disallowedTools",
        "body": "Never, not even if the AI asks."
      }
    ],
    "keyPoints": [
      "In code you state exactly which tools exist and which are allowed."
    ],
    "notes": "It works like a key ring. tools says which keys exist, allowedTools says which doors open without asking, and disallowedTools says which doors stay locked. In Step 1, tools is empty, and WebSearch, WebFetch and Bash are forbidden. Step 3 adds the read-only lookup tools.",
    "stateId": "38:Tools",
    "teach": {
      "next": "The team: a team lead and two specialists",
      "time": "2 min",
      "gist": "The key ring: tools, allowedTools and disallowedTools.",
      "script": [
        {
          "say": "Do you remember the key ring? In code, you write it down."
        },
        {
          "do": "Point at the three cards.",
          "say": "You write down which tools exist, which ones the agent may use without asking, and which ones it may never use, not even if the AI asks."
        },
        {
          "ask": "Which tools did our agent from Step 1 get?",
          "say": "(Answer: none. It may only read and answer. Searching the web is forbidden.)"
        }
      ],
      "do": [
        "Name the three lists."
      ],
      "done": [
        "Everyone knows the key ring."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "The team: a team lead and two specialists",
    "kicker": "Concept · Subagents",
    "type": "concept",
    "visual": {
      "swap": true
    },
    "subtitle": "The team lead hands out the work. The risk expert goes first, and its result goes to the writer.",
    "cards": [
      {
        "title": "Orchestrator = the team lead",
        "body": "Receives the ticket and hands out the work."
      },
      {
        "title": "risk-agent = the risk expert",
        "body": "Decides the priority and writes a short risk note."
      },
      {
        "title": "customer-reply-agent = the writer",
        "body": "Writes the draft reply, using the risk note."
      }
    ],
    "keyPoints": [
      "The orchestrator delegates. Each specialist does one task."
    ],
    "notes": "Step 2: the orchestrator delegates to risk-agent first, and then passes that result to customer-reply-agent. In the trace you see this as Agent → risk-agent, then Agent → customer-reply-agent. Last session in n8n the Risk Agent was wired as a tool of the Reply Agent. Step 3 adds a third agent: customer-context-agent.",
    "stateId": "39:Subagents",
    "teach": {
      "next": "Each specialist is one file",
      "time": "2 min",
      "gist": "The team lead hands out the work: risk first, then the writer.",
      "script": [
        {
          "say": "Step 2: our agent gets a team. One team lead and two specialists."
        },
        {
          "do": "Point at the cards left to right.",
          "say": "The team lead gets the ticket. The risk expert goes first. The writer gets the risk note and writes the draft."
        },
        {
          "ask": "Why risk first?",
          "say": "(Answer: the writer needs to know how serious it is before writing.)"
        }
      ],
      "do": [
        "Name the three roles and the order."
      ],
      "done": [
        "Everyone knows: risk first, then the writer."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Each specialist is one file",
    "kicker": "Concept · Agent files",
    "type": "concept",
    "visual": {
      "oneCol": true,
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
    "subtitle": "One file per agent, in the .claude/agents/ folder.",
    "cards": [
      {
        "title": ".claude/agents/risk-agent.md",
        "body": "One file = one specialist."
      },
      {
        "title": "Top: name and description · below: instructions",
        "body": "The top says who the agent is and when to use it. The text below is its work instructions. Which tools it may use is set in code."
      },
      {
        "title": "Not .agents/ · not AGENTS.md",
        "body": "Those are different things. Only .claude/agents/ is read."
      }
    ],
    "keyPoints": [
      "Each agent is one file in .claude/agents/.",
      "The folder starts with a dot. Use ls -a to see it.",
      "Before SOLO 2, your branch has no specialist files. Claude Code builds them from the prompt."
    ],
    "notes": "Show .claude/agents in the prepared trainer copy. Claude Code and the package both read this folder. A folder called .agents or a file called AGENTS.md is different and does not define these specialists.",
    "stateId": "40:Where do the agents live?",
    "teach": {
      "next": "Put the file in the folder: Claude finds it",
      "time": "2 min",
      "gist": "There is one file per specialist, in .claude/agents/.",
      "script": [
        {
          "say": "Where do the specialists live? Each one is one file, in the folder .claude/agents."
        },
        {
          "do": "Point at the middle card.",
          "say": "At the top are the name and the description: when should this specialist be used? Below that are its work instructions, just like CLAUDE.md. Which tools it may use, we set in code."
        },
        {
          "do": "Point at the last card.",
          "say": "Be careful: not .agents and not AGENTS.md. Only this folder is read."
        }
      ],
      "do": [
        "One file per agent.",
        "The top says who it is, and the text gives the instructions."
      ],
      "done": [
        "Everyone can find the folder."
      ],
      "watch": [
        "On main the folder does not exist yet. It comes with Step 2."
      ]
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Put the file in the folder: Claude finds it",
    "kicker": "Concept · Agent files · why",
    "type": "concept",
    "visual": {
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
    "subtitle": "Claude reads the folder, and the description decides who gets the task.",
    "cards": [
      {
        "title": "1 · Claude Code starts",
        "body": "It reads .claude/agents/ in this project. User and global agent folders stay unloaded. The package reads the same project files for the SDK."
      },
      {
        "title": "2 · It reads the description",
        "body": "Like a job advert: when should this agent be used? Write it clearly."
      },
      {
        "title": "3 · It delegates",
        "body": "When a task matches the description, Claude hands it to that agent."
      }
    ],
    "keyPoints": [
      "Claude Code loads the folder by itself.",
      "The description decides when Claude uses the agent.",
      "The SDK reads the same folder with settingSources: ['project']."
    ],
    "notes": "A specialist is one file. Claude Code builds the files from the SOLO 2 prompt. The package reads the same folder through lib/agents.mjs. In the prepared trainer copy, show risk-agent.md and its description line.",
    "stateId": "41:Why this folder? Claude finds the agents.",
    "teach": {
      "next": "Step 2: a team lead and two specialists",
      "time": "2 min",
      "gist": "Claude reads the folder, and the description is the job advert.",
      "script": [
        {
          "say": "How does Claude know that the specialists exist? You put the file in the folder. In Claude Code that is all. In our package, a small loader reads the same folder for the SDK."
        },
        {
          "do": "Point at card 2.",
          "say": "Then it reads the description. Think of a job advert: when should this agent get the work?"
        },
        {
          "ask": "What happens with a vague description like 'helps with things'?",
          "say": "(Answer: Claude may not pick it. You test that in Step 2.)"
        }
      ],
      "do": [
        "Folder, then description, then delegate."
      ],
      "done": [
        "Everyone knows that the description decides."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Step 2: a team lead and two specialists",
    "kicker": "Step 2 · what you build",
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
    "subtitle": "Your single agent becomes a team. The team lead calls the risk expert first, then the writer.",
    "cards": [
      {
        "title": "What you build",
        "body": "Two specialist files and a team lead that calls them."
      },
      {
        "title": "Why",
        "body": "One job per agent keeps every set of instructions short and clear."
      },
      {
        "title": "Done when",
        "body": "The trace shows risk first, then the reply, and you have tested a vague description."
      }
    ],
    "keyPoints": [
      "risk-agent analyses and decides the priority.",
      "customer-reply-agent writes the reply draft.",
      "The orchestrator delegates in order and saves a file."
    ],
    "notes": "Step 2 in the package (SOLO.md, Step 2): two specialist files, a loader and the team lead. The team lead calls risk-agent first, then customer-reply-agent. Last session's n8n Description is now the description line at the top of each specialist file.",
    "stateId": "42:Step 2 · Risk analysis and customer reply agents",
    "teach": {
      "next": "Demo · Step 2: I show it",
      "time": "2 min",
      "gist": "Step 2: a team lead and two specialists. You are done when you see the right order and have done the description test.",
      "script": [
        {
          "say": "Step 2: your agent becomes a team."
        },
        {
          "do": "Point at Done when.",
          "say": "You are done when you see the right order, risk first and then the reply, and you have done the description test."
        }
      ],
      "do": [
        "Name the goal."
      ],
      "done": [
        "Everyone knows when Step 2 is done."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Demo · Step 2: I show it",
    "kicker": "Demo · Step 2 · I show it",
    "type": "concept",
    "visual": {},
    "subtitle": "Watch first. On the next slide you do the same.",
    "cards": [
      {
        "title": "1 · Dress rehearsal",
        "body": "npm run lesson2 -- MSG-05 --dry-run\nShows the setup. No agents are called yet."
      },
      {
        "title": "2 · A real run",
        "body": "npm run lesson2 -- MSG-05\nLook for: first risk-agent, then customer-reply-agent."
      },
      {
        "title": "3 · The draft",
        "body": "Open the draft file. A person reads it before anything is sent."
      }
    ],
    "keyPoints": [
      "Show the dry run first. Then show a live run or the sample trace."
    ],
    "notes": "Use the prepared trainer copy. The dry run only shows setup. The real run shows Agent → risk-agent, then Agent → customer-reply-agent, and writes 02-subagents/claude-project/output/MSG-05.md. If a real run is not possible, show docs/sample-trace.md and call it a sample.",
    "stateId": "43:Demo · Step 2: trace the two agents",
    "tagline": "Risk first, then the writer. The draft waits for a person.",
    "teach": {
      "next": "Your turn · Step 2",
      "time": "5 min",
      "gist": "Demo from the prepared trainer copy: a dry run, a real specialist trace, and the draft.",
      "script": [
        {
          "do": "Before class, prepare a completed Step 2 demo in a separate trainer copy."
        },
        {
          "say": "I will show the prepared result. Just watch."
        },
        {
          "do": "Run the real run. Point at the two Agent lines.",
          "say": "Do you see that? First the risk expert, then the writer. The team lead hands out the work.",
          "clip": "assets/day4-teach/a16-msg05-orchestrator.mp4"
        },
        {
          "do": "Open the draft.",
          "say": "And this is the draft. It waits for a person: nothing is sent."
        }
      ],
      "do": [
        "Show the dry run and the real run, then open the draft."
      ],
      "done": [
        "Everyone has seen the order: risk, then reply."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Step 2",
    "kicker": "SOLO 2 · Paste into Claude Code",
    "type": "practice",
    "layout": "exercise",
    "timer": 25,
    "subtitle": "Build Risk and Reply from the source system messages. Inspect both drafts.",
    "cards": [],
    "steps": [
      {
        "text": "Paste this prompt into Claude Code",
        "prompt": "Read SOLO 2 and the Risk and Customer Reply system messages in n8n/support-triage.json. Create the 02-subagents lesson, .claude/agents/risk-agent.md, .claude/agents/customer-reply-agent.md and the smallest loader and runner that follow the existing lib/run.mjs pattern. Risk runs before priority is finalized; Reply runs last and saves a Markdown draft. Keep risk notes internal. Reply may not reclassify priority or promise unsupported refunds. Add a focused role-boundary test and package scripts for lesson2 only after their target files exist. Show the diff. Run npm run verify, then lesson2 with MSG-05 and MSG-10. Open the saved drafts and show the specialist trace.\n\nHelp me type a fictional ticket with missing information. Make Reply ask one clear question, rerun it and compare the drafts. This lesson isolates Risk and Reply; Customer Context remains part of the prepared complete baseline and is added to this lesson in SOLO 3. Send nothing. Stop after my human review.",
        "after": "Risk runs before Reply. The test prevents Reply from changing priority. A person reviewed both drafts."
      },
      "Paste the prompt.",
      "Choose one vague or adversarial description.",
      "Inspect Risk before Reply in the trace.",
      "Read both drafts.",
      "Approve only a focused role-boundary change."
    ],
    "expected": "Risk runs before Reply. The test prevents Reply from changing priority. A person reviewed both drafts.",
    "notes": "The participant builds on one branch and reviews every generated file.",
    "teach": {
      "next": "Check: does your screen look like this?",
      "time": "25 min",
      "gist": "Build Risk and Reply from the source system messages. Inspect both drafts.",
      "script": [
        {
          "say": "The participant builds on one branch and reviews every generated file."
        }
      ],
      "do": [],
      "done": [
        "Risk runs before Reply. The test prevents Reply from changing priority. A person reviewed both drafts."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Check: does your screen look like this?",
    "kicker": "What you see · Step 2",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step2.png",
      "imageLink": "Sample trace: the orchestrator calls risk-agent, then customer-reply-agent"
    },
    "subtitle": "After a real run. Two things to look for.",
    "keyPoints": [
      "Two Agent calls: First risk-agent, then customer-reply-agent.",
      "The draft: It asks only for the facts that are missing."
    ],
    "cards": [
      {
        "title": "1 · Two Agent lines",
        "body": "First risk-agent, then customer-reply-agent."
      },
      {
        "title": "2 · The draft",
        "body": "It only asks for the missing facts. It does not make anything up."
      }
    ],
    "notes": "This is the labelled MSG-10 sample. In a live run, check each claim in the draft. If no tool gave the fact, the draft must not say it.",
    "stateId": "45:What you see · Step 2",
    "teach": {
      "next": "Discuss: who did what?",
      "time": "2 min",
      "gist": "Compare: two Agent lines, and a draft that asks for the missing facts.",
      "script": [
        {
          "say": "Compare. Two Agent lines, in this order. And a draft that only asks for what is missing."
        },
        {
          "ask": "Does the draft say something that no tool gave it?",
          "say": "(If yes: that is made up. The draft must not say it.)"
        }
      ],
      "do": [
        "Compare with the screenshot."
      ],
      "done": [
        "Everyone has found both Agent lines."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Discuss: who did what?",
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
    "subtitle": "At your table (3–4 people), 2 minutes. One person shares your table's answer; you may pass. Then click to reveal.",
    "cards": [
      {
        "title": "Order",
        "body": "Which agent runs first? Why?"
      },
      {
        "title": "The job ad",
        "body": "Where is last session's n8n Description now?"
      }
    ],
    "keyPoints": [
      "risk-agent provides the priority and risk analysis.",
      "customer-reply-agent uses the original message and risk-agent result.",
      "A human reviews every draft before it goes to a customer."
    ],
    "notes": "Answers: the risk expert goes first, because the writer needs its risk note. The n8n Description is now the description line at the top of the agent file in .claude/agents/.",
    "stateId": "46:Discuss: which facts came from a tool?",
    "teach": {
      "next": "MCP: the lookup desk",
      "time": "3 min",
      "gist": "Discussion: the order (risk first) and where the Description lives now.",
      "script": [
        {
          "ask": "Which agent runs first, and why?",
          "say": "(Answer: risk. The writer needs to know how serious it is.)"
        },
        {
          "ask": "Where is last session's n8n Description now?",
          "say": "(Answer: in the description line at the top of the agent file.)"
        }
      ],
      "do": [
        "Let the tables talk, then click."
      ],
      "done": [
        "Both questions are answered."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "MCP: the lookup desk",
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
    "subtitle": "The agent asks the desk for facts. The desk reads the customer list (docs/customer_context.csv) and the transactions spreadsheet (docs/transactions.xlsx), and hands over only what was asked for. In Step 3 it can only look things up.",
    "cards": [
      {
        "title": "customers · get_customer",
        "body": "Looks up a customer in the customer list."
      },
      {
        "title": "transactions · get_transaction",
        "body": "get_transaction and list_transactions: look up one payment, or list them."
      }
    ],
    "keyPoints": [
      "The MCP server owns the data. The agent only sees what the tool returns."
    ],
    "notes": "MCP is a standard way to give an agent a lookup desk. There are two desks: customers (reads docs/customer_context.csv) and transactions (reads docs/transactions.xlsx). They are read-only: they can look things up but not change them. Last session's Customer Context Agent with its Data Table becomes this desk.",
    "stateId": "47:MCP: external data",
    "teach": {
      "next": "Step 3: real facts from the lookup desk",
      "time": "3 min",
      "gist": "MCP is the lookup desk. It is read-only: it looks things up and never changes them.",
      "script": [
        {
          "say": "Step 3 adds outside data. Think of a lookup desk."
        },
        {
          "do": "Point at the two cards.",
          "say": "There are two desks: one for customers and one for payments. The agent asks, and the desk looks it up and hands over only that."
        },
        {
          "say": "And the desk can only look things up. It cannot change anything."
        },
        {
          "ask": "Why do we want facts from a desk instead of from the AI itself?",
          "say": "(Answer: the AI would make it up. The desk has the real data.)"
        }
      ],
      "do": [
        "Explain the lookup desk.",
        "It is read-only."
      ],
      "done": [
        "Everyone knows: MCP looks things up and never changes them."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Step 3: real facts from the lookup desk",
    "kicker": "Step 3 · what you build",
    "type": "concept",
    "visual": {
      "stagger": "pop",
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
    "subtitle": "Your team gets two lookup desks. They can look things up, but not change them.",
    "cards": [
      {
        "title": "What you build",
        "body": "Two lookup desks: customers and transactions."
      },
      {
        "title": "Why",
        "body": "The agent takes facts from a desk, not from its imagination."
      },
      {
        "title": "Done when",
        "body": "The trace shows both lookups, and you have written down three more labels."
      }
    ],
    "keyPoints": [
      "The agents get facts from tools. They cannot change data yet."
    ],
    "notes": "There are two lookup desks: customers (reads docs/customer_context.csv, tool get_customer, used by customer-context-agent) and transactions (reads docs/transactions.xlsx, tools get_transaction and list_transactions, used by risk-agent). Both can only look things up. The package starts the desks by itself. The reply stays a draft for a person.",
    "stateId": "48:Step 3 · Read-only customer and transaction MCP tools",
    "teach": {
      "next": "Demo · Step 3: I show it",
      "time": "2 min",
      "gist": "Step 3: two lookup desks. You are done when both lookups are in the trace and you have three more labels.",
      "script": [
        {
          "say": "Step 3: your team gets the lookup desks."
        },
        {
          "do": "Point at Done when.",
          "say": "You are done when you see both lookups, and you have written down three more labels: MSG-07, 08 and 09. You need them in Step 4."
        }
      ],
      "do": [
        "Name the goal."
      ],
      "done": [
        "Everyone knows when Step 3 is done."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Demo · Step 3: I show it",
    "kicker": "Demo · Step 3 · I show it",
    "type": "concept",
    "visual": {},
    "subtitle": "Watch first. On the next slide you do the same.",
    "cards": [
      {
        "title": "1 · Test the desks",
        "body": "npm run smoke:mcp\nTests both desks without the AI."
      },
      {
        "title": "2 · A real run",
        "body": "npm run lesson3 -- MSG-08\nLook for: get_customer and get_transaction."
      },
      {
        "title": "3 · Where did the facts come from?",
        "body": "In the draft, the External data section lists what each desk handed over."
      }
    ],
    "keyPoints": [
      "customer-context-agent calls get_customer.",
      "risk-agent uses get_transaction and list_transactions.",
      "Review the customer-reply-agent draft before sending."
    ],
    "notes": "Use the prepared trainer copy. Show the smoke check, then a real MSG-08 run. Point at both lookups and the External data section. The draft waits for a person.",
    "stateId": "49:Demo · Step 3: read-only customer and transaction lookups",
    "teach": {
      "next": "Your turn · Step 3",
      "time": "5 min",
      "gist": "Demo from the prepared trainer copy: a smoke check, a real run with both lookups, and External data.",
      "script": [
        {
          "do": "Before class, prepare a completed Step 3 demo in a separate trainer copy."
        },
        {
          "do": "Run npm run smoke:mcp.",
          "say": "First I test the desks, without the AI. The last line says: MCP servers OK.",
          "clip": "assets/day4-teach/a20-1-smoke-mcp.mp4"
        },
        {
          "do": "Run npm run lesson3 -- MSG-08. Point at the two lookup lines.",
          "say": "Now a real run. Do you see that? The agent asks the customer desk and the payment desk.",
          "clip": "assets/day4-teach/a20-2-msg08-mcp.mp4"
        },
        {
          "do": "Open the draft, find External data.",
          "say": "And here it says exactly which fact came from which desk."
        }
      ],
      "do": [
        "Do the smoke test, the real run and External data."
      ],
      "done": [
        "Everyone has seen both lookups."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Step 3",
    "kicker": "SOLO 3 · Paste into Claude Code",
    "type": "practice",
    "layout": "exercise",
    "timer": 30,
    "subtitle": "Add Customer Context and read-only MCP tools. Prove every external claim.",
    "cards": [],
    "steps": [
      {
        "text": "Paste this prompt into Claude Code",
        "prompt": "Read SOLO 3, n8n/support-triage.json, docs/customer_context.csv and docs/transactions.xlsx. Build 03-mcp and .mcp.json with read-only get_customer and get_transaction tools over stdio. Keep both data files outside every claude-project folder. Add customer-context-agent. Run Customer Context first, Risk before the priority decision and Reply last. Do not guess missing records. Transaction lookup is an extension to the n8n source.\n\nCreate lib/workflow-output.mjs with a pure toWorkflowOutput function that returns exactly {output: {priority, message}} from the internal priority and reply draft. Create lib/ticket-sessions.mjs with a small registry that rejects an empty ticket_id and stores one SDK sessionId per ticket_id. Route output.priority case-insensitively through lib/switch.mjs to auto_reply, investigate or escalate. Never add send or record-write tools. Add focused contract, route, two-ticket isolation, tool-permission and missing-record tests. Add package scripts only after their files exist. Show the diff and permissions. Explain and run the documented install, smoke:mcp and lesson3 checks with MSG-08, MSG-07 and MSG-09.\n\nLet me type one well-formed but missing transaction ID. Run it and show the failed lookup, full specialist order, final output and saved draft. Stop after I inspect the evidence.",
        "after": "A real trace shows Context → Risk → Reply. Every external claim comes from a read-only tool result."
      },
      "Paste the prompt.",
      "Choose one missing transaction ID.",
      "Inspect the tool permissions.",
      "Trace Context → Risk → Reply.",
      "Open the draft and match each external claim to a tool result."
    ],
    "expected": "A real trace shows Context → Risk → Reply. Every external claim comes from a read-only tool result.",
    "notes": "A smoke test alone is insufficient. Keep the transaction lookup labeled as an extension to the n8n source.",
    "teach": {
      "next": "Check: does your screen look like this?",
      "time": "30 min",
      "gist": "Add Customer Context and read-only MCP tools. Prove every external claim.",
      "script": [
        {
          "say": "A smoke test alone is insufficient. Keep the transaction lookup labeled as an extension to the n8n source."
        }
      ],
      "do": [],
      "done": [
        "A real trace shows Context → Risk → Reply. Every external claim comes from a read-only tool result."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Check: does your screen look like this?",
    "kicker": "What you see · Step 3",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step3.png",
      "imageLink": "Terminal: npm run smoke:mcp lists read-only tools and real lookups"
    },
    "subtitle": "After the desk test. Look for two things.",
    "keyPoints": [
      "Read-only tools: list_transactions and get_transaction. No write tools yet.",
      "Last line: MCP servers OK. No model call."
    ],
    "cards": [
      {
        "title": "1 · Only lookup tools",
        "body": "get_customer, get_transaction and list_transactions: only lookups. No tools that change anything."
      },
      {
        "title": "2 · Last line",
        "body": "MCP servers OK. No model was called."
      }
    ],
    "notes": "smoke:mcp starts both MCP servers and calls each tool once. CUST-999 does not exist, so the tool says so. That is correct.",
    "stateId": "51:What you see · Step 3",
    "teach": {
      "next": "Discuss: where did the facts come from?",
      "time": "2 min",
      "gist": "Compare: only lookup tools, and MCP servers OK.",
      "script": [
        {
          "say": "Compare. There should be only lookup tools, and nothing that changes data. And the last line says: MCP servers OK."
        },
        {
          "ask": "CUST-999 says: no customer. Is that an error?",
          "say": "(Answer: no. That customer does not exist, and the desk says so honestly.)"
        }
      ],
      "do": [
        "Compare with the screenshot."
      ],
      "done": [
        "Everyone has MCP servers OK."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Discuss: where did the facts come from?",
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
    "subtitle": "At your table (3–4 people), 2 minutes. One person shares your table's answer; you may pass. Then click to reveal.",
    "cards": [
      {
        "title": "Facts",
        "body": "Which facts came from a lookup desk?"
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
    "notes": "Answers: the customer facts came from get_customer (the customer list), and the payment facts came from get_transaction (the transaction list). See the External data section. A person reads every draft before it is sent.",
    "stateId": "52:Discuss: tools and external data.",
    "teach": {
      "next": "Coffee break",
      "time": "3 min",
      "gist": "Discussion: the facts come from the desks, and a person reads every draft.",
      "script": [
        {
          "ask": "Which facts came from a lookup desk?",
          "say": "(Answer: the customer and payment facts. See External data in the draft.)"
        },
        {
          "ask": "Who reads the draft before it is sent?",
          "say": "(Answer: a person. Always.)"
        }
      ],
      "do": [
        "Let the tables talk, then click."
      ],
      "done": [
        "Both questions are answered."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Coffee break",
    "kicker": "Day 4 · Break",
    "type": "pause",
    "visual": {
      "countdown": 15,
      "bot": "coffee",
      "place": "beside"
    },
    "subtitle": "Back at 15:45. Fallen behind? Keep your branch and fix the first missing proof item.",
    "cards": [
      {
        "title": "Back at 15:45",
        "body": "Next: the assignment · let one agent change data, safely."
      }
    ],
    "keyPoints": [
      "Say the return time: 15:45.",
      "Press ▶ Start on the timer.",
      "Fell behind? Keep your branch and fix the first missing proof item."
    ],
    "notes": "The afternoon break runs from 15:30 to 15:45. Participants keep their branch. Help them fix the first missing proof item from their actual run.",
    "stateId": "53:Short break",
    "teach": {
      "next": "Fixed rules or a thinking agent?",
      "time": "15 min",
      "gist": "Break. Participants keep their branch and resume from their first missing proof item.",
      "script": [
        {
          "say": "Coffee break. Be back at 15:45. If you are behind, keep your branch and fix the first missing proof item."
        },
        {
          "do": "Start the countdown."
        }
      ],
      "do": [
        "Start the countdown.",
        "Help people identify their first missing proof item."
      ],
      "done": [
        "Everyone knows which evidence item to finish after the break."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Fixed rules or a thinking agent?",
    "kicker": "Concept · Workflows",
    "type": "concept",
    "layout": "compare",
    "visual": {},
    "subtitle": "Code where it must be exact, the agent where it may think, and a person at the end.",
    "columns": [
      {
        "title": "Fixed rules · code",
        "items": [
          "The Switch picks the tray",
          "Focused tests check contracts and routes",
          "The barrier checks every change",
          "Same input, always the same route"
        ]
      },
      {
        "title": "Thinking · the agent",
        "items": [
          "Reads what the customer means: its label can differ between runs",
          "The team lead picks a specialist",
          "The writer writes the draft",
          "A person checks the result"
        ]
      }
    ],
    "keyPoints": [
      "Code where it must. The agent chooses where it may. Always a human at the end."
    ],
    "notes": "Fixed code checks contracts and routes for the same input. The team lead decides which specialist to call. A person reviews the result and the observed evidence. Use fixed code for anything that must be exact or safe.",
    "stateId": "54:Fixed workflow vs. dynamic agent",
    "teach": {
      "next": "Your turn · Step 4: compare behavior and collect proof",
      "time": "2 min",
      "gist": "Use fixed code where it must be exact, the agent where it may think, and a person at the end.",
      "script": [
        {
          "say": "There are two kinds of work. Fixed rules, like the Switch and the check: the same input always gives the same answer."
        },
        {
          "say": "And thinking, like the team lead deciding who gets the work. And at the end: a person."
        },
        {
          "ask": "Would you let the AI decide the route of a fraud message?",
          "say": "(Answer: no. The label, yes, but the route is fixed code.)"
        }
      ],
      "do": [
        "Fixed versus thinking."
      ],
      "done": [
        "Everyone can give one example of each."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Your turn · Step 4: compare behavior and collect proof",
    "kicker": "SOLO 4 · Paste into Claude Code",
    "type": "practice",
    "layout": "exercise",
    "timer": 25,
    "subtitle": "Claude Code collects observed evidence. You make the review decision.",
    "cards": [],
    "steps": [
      {
        "text": "Paste this prompt into Claude Code",
        "prompt": "Read SOLO 4, n8n/support-triage.json and my actual run output. Build a local checker without embedding or displaying expected answer labels. Use only labels observed in my runs. Create participant-output/acceptance-table.md with source behavior, app behavior, parity gap, message, observed label, external-data source, draft path and human review status. Compare output {priority, message}, the three case-insensitive routes, Context → Risk → Reply, memory isolation and missing-data behavior. Mark absent evidence OPEN. Label transaction lookup as an extension and draft-only enforcement as deliberate hardening.\n\nRun the documented checks and record commands, exit codes and short trace excerpts. Suggest one focused fix for a real mismatch, show its diff and rerun that case. Never change a label merely to make a checker pass. Attach my diff, focused test, real trace and acceptance table to participant-output. I make the final review decision. Stop before customer-facing use.",
        "after": "Every acceptance row points to observed evidence or says OPEN. Nothing is sent or deployed."
      },
      "Paste the prompt with your actual run output.",
      "Choose one real mismatch or missing case.",
      "Inspect every acceptance row.",
      "Rerun the focused case.",
      "Record your own human review decision."
    ],
    "expected": "Every acceptance row points to observed evidence or says OPEN. Nothing is sent or deployed.",
    "notes": "This replaces the hidden answer-key exercise. Proof comes from the participant's diff, focused tests, real trace, acceptance table and human review.",
    "teach": {
      "next": "Check: does your evidence look like this?",
      "time": "25 min",
      "gist": "Claude Code collects observed evidence. You make the review decision.",
      "script": [
        {
          "say": "This replaces the hidden answer-key exercise. Proof comes from the participant's diff, focused tests, real trace, acceptance table and human review."
        }
      ],
      "do": [],
      "done": [
        "Every acceptance row points to observed evidence or says OPEN. Nothing is sent or deployed."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Check: does your evidence look like this?",
    "kicker": "What you see · SOLO 4",
    "type": "concept",
    "subtitle": "Every row points to observed evidence or says OPEN.",
    "visual": {
      "stepThrough": true
    },
    "cards": [
      {
        "title": "Acceptance table",
        "body": "participant-output/acceptance-table.md exists and compares source behavior with the app."
      },
      {
        "title": "Observed trace",
        "body": "Each label and external-data claim points to an actual run, saved draft or tool result."
      },
      {
        "title": "Focused rerun",
        "body": "The chosen mismatch has a focused test and a recorded exit code."
      },
      {
        "title": "Human gate",
        "body": "A person records PASS, FAIL or OPEN. Claude Code does not approve its own work."
      }
    ],
    "keyPoints": [
      "No embedded answer labels.",
      "Missing evidence stays OPEN.",
      "A human makes the review decision."
    ],
    "notes": "Show the participant's acceptance table, focused test output and one real trace. Read one row end to end. If the evidence is absent, the row says OPEN. Do not compare against a hidden answer key.",
    "stateId": "56:What you see · Step 4",
    "teach": {
      "next": "On Monday: take this to your squad",
      "time": "2–4 min",
      "gist": "Every row points to observed evidence or says OPEN.",
      "script": [
        {
          "do": "Show the participant's acceptance table, focused test output and one real trace. Read one row end to end. If the evidence is absent, the row says OPEN. Do not compare against a hidden answer key."
        }
      ],
      "do": [
        "Show the participant's acceptance table, focused test output and one real trace. Read one row end to end. If the evidence is absent, the row says OPEN. Do not compare against a hidden answer key."
      ],
      "done": [
        "The room can explain check: does your evidence look like this?."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "On Monday: take this to your squad",
    "kicker": "Close · Monday",
    "type": "concept",
    "subtitle": "Three things to do next week, and what today's version is not.",
    "visual": {},
    "cards": [
      {
        "title": "1 · Pick one flow",
        "body": "Choose one real flow where a person already reads the result, for example a ticket draft."
      },
      {
        "title": "2 · Write the rules first",
        "body": "Which agent may do what, and which changes need a person. That is your barrier."
      },
      {
        "title": "3 · Check with security",
        "body": "Approved accounts, where data may go, and test data only. No real customer data in experiments."
      },
      {
        "title": "What today is not",
        "body": "Not production: fictional data, nine test messages, a laptop demo. A real version needs an audit log with names and a data-handling decision."
      }
    ],
    "notes": "Make it concrete for each squad: ask one person per table to name the flow they would pick.",
    "teach": {
      "next": "Close: a person stays in charge",
      "time": "4 min",
      "gist": "Monday: one flow, rules first, check with security. Today is a demo, not production.",
      "script": [
        {
          "say": "What do you do with this on Monday? Three things."
        },
        {
          "do": "Point at cards 1 to 3.",
          "say": "Pick one flow where a person already reads the result. Write the rules first: who may do what, and what needs a person. And check with security before you use any real data."
        },
        {
          "do": "Point at the last card.",
          "say": "And be honest about what today was: a demo with fictional data and nine messages. Not production."
        },
        {
          "ask": "Which flow would your squad pick?",
          "say": "(One answer per table.)"
        }
      ],
      "do": [
        "Three Monday actions."
      ],
      "done": [
        "Each table named one flow."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Close: a person stays in charge",
    "kicker": "Close · Day 4",
    "type": "recap",
    "layout": "recap",
    "visual": {
      "levelUp": true,
      "bot": "happy",
      "place": "beside"
    },
    "items": [
      {
        "label": "The form",
        "caption": "The AI fills it in; the code picks the tray."
      },
      {
        "label": "Only the keys it needs",
        "caption": "Only one agent may change data."
      },
      {
        "label": "The barrier + a person",
        "caption": "Big changes ask first. A 'no' blocks the change."
      },
      {
        "label": "Next: Day 5",
        "caption": "We build on this agent team."
      }
    ],
    "notes": "Recap round: everyone shows one result in one minute (a trace, a draft, the check output or the chat). Go back to the goals on the board from this morning. Ask: what was easier in n8n, and what was easier in code? Where must a person still decide? An extra for fast people: chat in, chat out with npm run chat -- --lesson 3.",
    "stateId": "58:Close: keep a human in the loop.",
    "subtitle": "One agent, a team, lookup desks and a barrier. And at the end, always a person.",
    "teach": {
      "next": "Optional appendix · fast lane",
      "time": "10 min",
      "gist": "Close: one result each, back to this morning's goals, and a bridge to Workshop 5.",
      "script": [
        {
          "say": "This morning we started with a sorting machine in n8n blocks. Now you have a team of agents in code. And at the end there is always a person."
        },
        {
          "do": "Point at the goals on the board from this morning.",
          "say": "Look at the goal you wrote down this morning. Who got there?"
        },
        {
          "ask": "What was easier in n8n, and what was easier in code?",
          "say": "(Listen to the answers. Typically: n8n is easier to see, and code is easier to test and limit.)"
        },
        {
          "say": "Thank you. Next time we will build on this."
        }
      ],
      "do": [
        "Ask for one result each, and go back to the goals."
      ],
      "done": [
        "Everyone has shown one result."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Optional appendix · fast lane",
    "kicker": "Optional appendix · fast lane",
    "type": "concept",
    "subtitle": "Optional after the close. These challenges are not part of the required workshop route.",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "cards": [
      {
        "title": "1 · How stable is the label?",
        "body": "Run MSG-01 to MSG-06 three times each. Which labels change between runs? What does a run cost (see the result line)?"
      },
      {
        "title": "2 · Try to break the barrier",
        "body": "After the assignment: try to get €150 through as two changes of €75. Then fix the hook with a total per transaction."
      },
      {
        "title": "3 · Log every decision",
        "body": "After the assignment: write allow, ask and deny to the audit log, with the time. Who approved what?"
      }
    ],
    "notes": "Optional appendix after the close. Do not replace or shorten a required memory assignment with this material. The challenges cover label variation, transaction limits and an audit trail.",
    "teach": {
      "next": "Trainer appendix · prepare before class",
      "time": "1 min",
      "gist": "Fast lane: three challenges for whoever finishes early.",
      "script": [
        {
          "say": "Some of you will finish early. That is great. Whenever you are done, pick one of these three. They are not on the test, they are for you."
        }
      ],
      "do": [
        "Show the three challenges."
      ],
      "done": [
        "Fast finishers know what to do."
      ],
      "watch": []
    }
  },
{
    "lessonId": "workshop-4",
    "title": "Trainer appendix · prepare before class",
    "kicker": "Trainer appendix · prepare before class",
    "type": "practice",
    "layout": "exercise",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "Required before SOLO 0. Build and review a separate trainer reference; participants keep their own unsolved starter.",
    "link": {
      "url": "https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/blob/main/n8n/support-triage.json",
      "label": "n8n/support-triage.json"
    },
    "cards": [
      {
        "title": "Start with the source",
        "body": "Open n8n/support-triage.json from the participant repository. Copy the prompt below into Claude Code."
      }
    ],
    "steps": [
      {
        "text": "Open the n8n JSON in the participant repository",
        "after": "Confirm that the export has no credentials and maps the support workflow."
      },
      {
        "text": "Paste this trainer prompt into Claude Code",
        "prompt": "Use n8n MCP to find and read “Day 3 · 12 · Reference · Full ticket triage (L1→L3)”. Do not modify or activate it. Save sanitized JSON without credentials as n8n/support-triage.json. If access fails, use the repository export and mark the live read OPEN.\n\nRead AGENTS.md, README.md, docs/SETUP.md and SOLO.md. Map the nodes, connections, system messages and output parser. Then build a bounded working app from this starter. Preserve Customer Context → Risk → Customer Reply, output {priority, message}, case-insensitive routes and memory isolation by ticket_id. Enforce draft-only output as deliberate hardening. Explain setup commands, show the actual diff, run the documented checks and one real case, and list every unverified behavior as OPEN.\n\nOnly after the actual build and run, list every current SOLO.md build step in order and propose the teaching storyline. Then stop. Wait for the trainer to choose which steps are essential, too large or less important. Do not create assignments or edit SOLO.md or the participant repository before the trainer accepts that selection.\n\nAfter the trainer accepts the selection, turn each kept step into one reviewed copy/paste or typing assignment. Give every assignment a starting state, a visible expected result and a stop condition. Then update SOLO.md and the participant repository to match the leading Workshop 4 slides. Show the documentation diff for trainer review. Deliver a separate read-only reference folder, mapping, evidence and OPEN gaps to the participants. Keep the participant starter TODOs unimplemented. Stop before adding optional features.",
        "after": "Claude rebuilds and proves the app before it proposes the lesson story."
      },
      "Claude Code reads the n8n JSON before proposing code.",
      "Claude Code rebuilds the app and proves the source contract.",
      "Ask Claude Code to list every SOLO.md step in order.",
      "Ask for one storyline that connects those steps.",
      "Remove optional detail, then turn each kept step into a copy/paste or typing assignment.",
      "Review the slide route first. Only then align SOLO.md and the participant repository to it."
    ],
    "expected": "A reviewer accepts one slide-led lesson route. SOLO.md and the participant repository then match its reviewed assignments and evidence.",
    "notes": "Required trainer preparation before class, outside the participant route. Share the completed reference separately from the unsolved participant starter. It is not a participant assignment. Use the n8n MCP when it is available. Never import, activate or expose credentials. Build first. Ask for the storyline only after the app and evidence exist.",
    "teach": {
      "time": "Before class",
      "gist": "Start from the real workflow. Build the story, then let the reviewed slide route lead SOLO.md and the participant repository.",
      "script": [
        {
          "say": "Start from the real workflow. Build the story, then let the reviewed slide route lead SOLO.md and the participant repository."
        }
      ],
      "do": [],
      "done": [
        "A reviewer accepts one slide-led lesson route. SOLO.md and the participant repository then match its reviewed assignments and evidence."
      ],
      "watch": [
        "This is trainer preparation. Use the n8n MCP when it is available. Never import, activate or expose credentials. Build first. Ask for the storyline only after the app and evidence exist. The slides lead the lesson design; do not rewrite SOLO.md or the repository until a trainer reviews the route."
      ]
    }
  }
];

const teachDoByTitle = new Map([
  ['Today · agenda', 'Point to the JSON-first route and the four build steps.'],
  ['Trainer appendix · prepare before class', 'Use Copy and inspect the n8n JSON before any app edit.'],
  ['Words you need today', 'Ask participants to connect each term to one file in the starter.'],
  ['Your turn · Step 0', 'Review the separate trainer reference and its actual output. Keep the starter TODOs unimplemented.'],
  ['Your turn · Step 1: build the policy', 'Use Copy, then compare the policy result with the n8n route.'],
  ['Your turn · Step 1b: inspect the form and memory', 'Use Copy, then inspect the submitted form and ticket_id memory.'],
  ['Your turn · Step 1c: challenge the policy', 'Use Copy, then run the selected edge case and read the refusal or route.'],
  ['Your turn · Step 2', 'Use Copy, then inspect the risk-agent diff and one actual result.'],
  ['Your turn · Step 3', 'Use Copy, then inspect the customer-reply-agent output against the contract.'],
  ['Your turn · Step 4: compare behavior and collect proof', 'Use Copy, then compare n8n and Claude Code on the same case.']
]);
for (const slide of window.SLIDES) {
  const action = teachDoByTitle.get(slide.title);
  if (action && slide.teach && !slide.teach.do?.length) slide.teach.do = [action];
  if (slide.teach) {
    const result = slide.expected || slide.keyPoints?.[slide.keyPoints.length - 1] || slide.subtitle || slide.title;
    slide.teach.done = [result];
    slide.teach.script = slide.teach.script.filter(item => {
      const value = item.say || item.do || '';
      return !/^\d{1,2}:?$/.test(value) && !/:\s*$/.test(value);
    });
  }
}
