/* Locally maintained classroom content. See tools/SESSION-SOURCES.md. */
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
    "subtitle": "From n8n to the Claude Agent SDK: yesterday's flow, now in code.",
    "notes": "On screen while people arrive. Today we build yesterday's n8n support flow again, now in code with the Claude Agent SDK. We start from a fresh workshop package with new customer messages: we do not import the n8n flow. Did someone's Day 3 flow not work? No problem: they use the example results in the package.",
    "stateId": "0:Welcome to Workshop 4 · From n8n to Claude Agents SDK",
    "teach": {
      "time": "2 min",
      "gist": "Welcome: yesterday the sorting machine in n8n blocks, today the same machine in code.",
      "script": [
        {
          "do": "Have this slide on screen while people come in."
        },
        {
          "say": "Yesterday you built a sorting machine for customer messages in n8n, by connecting blocks. Today we build exactly the same machine, but in code."
        },
        {
          "say": "Why code? Code you can test, save and limit: you decide what each agent may and may not do."
        },
        {
          "ask": "Who still remembers what the last block of yesterday's flow was?",
          "say": "(Answer: a person checks before anything goes to the customer. That stays today too.)"
        }
      ],
      "do": [
        "Welcome everyone.",
        "Name the goal: same flow, now in code."
      ],
      "done": [
        "Everyone knows today is yesterday's flow, now in code."
      ],
      "watch": [
        "Day 3 did not work for someone? Reassure them: the package has example results, nobody is behind."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Look back, look ahead: three questions",
    "kicker": "W4 · RECAP · 3 ROUNDS",
    "type": "context",
    "visual": {},
    "subtitle": "Two minutes per round. One answer per table.",
    "timer": 6,
    "cards": [
      {
        "title": "1 · Useful",
        "body": "What did you learn yesterday that you can really use?"
      },
      {
        "title": "2 · Wrong",
        "body": "What did your flow do that you did not expect?"
      },
      {
        "title": "3 · Your goal",
        "body": "What do you want to be able to do at the end of today?"
      }
    ],
    "keyPoints": [
      "One answer per table, per round",
      "Connect 'wrong' to today: test, tool list, hook",
      "Keep the goals for the close"
    ],
    "notes": "Time: 6 min, three rounds of 2 min. Write the answers on the board. Round 2: connect each problem to today. Hard to test → npm run check. Every agent could do everything → a tool list per agent. No stop before a change → a hook. Round 3: keep the goals on the board and come back to them at the close.",
    "teach": {
      "time": "6 min",
      "gist": "Three short rounds: what was useful, what went wrong, what is your goal today.",
      "script": [
        {
          "do": "Point at card 1. Start a 2-minute timer.",
          "say": "Round one. What did you learn yesterday that you can really use? One answer per table."
        },
        {
          "do": "Write the answers on the board. Point at card 2.",
          "say": "Round two. What did your flow do that you did not expect?"
        },
        {
          "do": "Connect each answer to today.",
          "say": "Hard to test? Today you get one command that tests everything. Every agent could do everything? Today each agent gets its own list. No stop before a change? Today we build a brake: a person says yes first."
        },
        {
          "do": "Point at card 3.",
          "say": "Round three. What do you want to be able to do at the end of today? Write it down. We come back to it at the end."
        }
      ],
      "do": [
        "Three rounds, two minutes each.",
        "Answers on the board."
      ],
      "done": [
        "One answer per table for each round.",
        "The goals are on the board for the close."
      ],
      "watch": [
        "A table stays quiet? Ask one person directly: what surprised you yesterday?",
        "Keep it short: the real work starts in 5 minutes."
      ]
    }
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
    "stateId": "4:Yesterday’s flow · 1. Ticket in, Switch out",
    "teach": {
      "time": "2 min",
      "gist": "The Switch = the sorting clerk: the AI gives the label, the Switch picks the tray.",
      "script": [
        {
          "do": "Point at Ticket Input.",
          "say": "A customer message comes in. That is the ticket."
        },
        {
          "do": "Point at Switch.",
          "say": "Then the Switch. Think of the post room: a letter comes in and the clerk puts it in one of three trays. High, medium or low. The Switch is that clerk: fixed rules, no thinking."
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
        "Explain: the AI gives the label, the Switch picks the tray."
      ],
      "done": [
        "Everyone can say what the Switch does."
      ],
      "watch": [
        "People mix up the AI and the Switch. Repeat: AI = label, Switch = tray."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday’s flow · 2. Chat and an AI Agent",
    "kicker": "Recap · n8n flow 2/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-maarten-n8n/03-chat-memory.jpeg",
      "imageLink": "n8n · Chat trigger → AI Agent"
    },
    "subtitle": "Memory works like a conversation at the desk: same customer, you remember. New customer, you start fresh.",
    "cards": [
      {
        "title": "Chat trigger",
        "body": "The customer types a message."
      },
      {
        "title": "AI Agent",
        "body": "Reads what the customer means."
      },
      {
        "title": "Simple Memory",
        "body": "Plugs in under the agent. Remembers what was said earlier in the same conversation."
      }
    ],
    "keyPoints": [
      "Same customer = same conversation",
      "New customer = start fresh",
      "Never carry customer A's chat over to customer B"
    ],
    "notes": "Yesterday's second flow: a chat in front of the AI Agent, and memory under it. Ask: what happened before you added memory, and after? Today npm run chat does the same: it remembers within one conversation. A new conversation must never get another customer's messages.",
    "stateId": "5:Yesterday’s flow · 2. Chat and an AI Agent",
    "teach": {
      "time": "2 min",
      "gist": "Chat in, AI Agent reads, memory remembers the conversation. Never mix customers.",
      "script": [
        {
          "do": "Point at the chat block.",
          "say": "Yesterday's second step: the customer types in a chat, and the AI Agent reads the message."
        },
        {
          "do": "Point at the Memory socket under the agent.",
          "say": "Under the agent you plug in memory. Think of a conversation at the desk: as long as the same customer stands in front of you, you remember what he just said."
        },
        {
          "say": "A new customer? Then you start fresh. You may never take the conversation of customer A to customer B."
        },
        {
          "ask": "Why is that so important at a payment company?",
          "say": "(Answer: privacy. Customer B may never see anything of customer A.)"
        }
      ],
      "do": [
        "Explain chat, agent and memory.",
        "Name the rule: never mix customers."
      ],
      "done": [
        "Everyone can say what memory does, and where it stops."
      ],
      "watch": [
        "People think memory means the AI learns forever. No: it only remembers within one conversation."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday’s flow · 3. Structured output",
    "kicker": "Recap · n8n flow 3/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-maarten-n8n/05-output-parser.jpeg",
      "imageLink": "n8n · AI Agent + Structured Output Parser"
    },
    "subtitle": "The AI fills in a fixed form. Then the Switch can sort.",
    "cards": [
      {
        "title": "Structured Output Parser = the form",
        "body": "Tells the AI which fields to fill in: priority and message. Checks that the answer fits the form."
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
    "notes": "Yesterday the Parser had two fields: priority and message. Today the package has its own form (priority-schema.mjs), with its own fields; it is not exactly the same as Day 3. Two different kinds of mistakes: the form is not filled in correctly (a parse error), or the form is correct but the priority is wrong (a wrong decision). Look at them separately.",
    "stateId": "6:Yesterday’s flow · 3. Structured output",
    "tagline": "An AI likes to talk. A machine can’t do anything with a story. So the AI fills in a form.",
    "teach": {
      "time": "2 min",
      "gist": "Parser = the form the AI must fill in. Switch = the trays. AI gives the label, code picks the route.",
      "script": [
        {
          "do": "Point at the AI Agent.",
          "say": "An AI likes to talk. Ask it something and you get a story. But a machine can't do anything with a story."
        },
        {
          "do": "Point at Structured Output Parser.",
          "say": "So we give the AI a form. Field one: priority, high, medium or low. Field two: the message. The Parser hands out the form and checks it is filled in correctly."
        },
        {
          "do": "Point at the Switch.",
          "say": "Then the Switch reads the priority field and puts the message in the right tray."
        },
        {
          "ask": "What can go wrong here? Two things.",
          "say": "(Answer: the form is filled in wrong, or the form is right but the priority is wrong. Two different problems.)"
        }
      ],
      "do": [
        "Explain: AI talks, machine needs a form.",
        "Parser = form, Switch = trays."
      ],
      "done": [
        "Everyone can say the difference between the Parser and the Switch."
      ],
      "watch": [
        "Today's form has its own fields. Don't promise it is exactly the same as yesterday."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Yesterday: specialists exchange context and results",
    "kicker": "Recap · n8n flow 4/4",
    "type": "recap",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-maarten-n8n/11-three-sub-agents.jpeg",
      "imageLink": "n8n · Customer Reply, Risk and Customer Context agents"
    },
    "subtitle": "Like an office: one job each. Today Reply and Risk become agents in code; Customer Context becomes a lookup tool (MCP).",
    "cards": [
      {
        "title": "Customer Reply Agent",
        "body": "The writer. Writes the reply to the customer."
      },
      {
        "title": "Risk Agent",
        "body": "The risk expert. Decides how risky the message is."
      },
      {
        "title": "Customer Context Agent",
        "body": "The records desk. Looks up the customer in the Data Table."
      }
    ],
    "keyPoints": [
      "Writer, risk expert, records desk",
      "Each specialist has one job",
      "Today: 2 agents + 1 lookup tool"
    ],
    "notes": "Yesterday's team: three specialists, each with one job. Ask: who called the Risk Agent, and what customer information reached the Reply Agent? Was someone's Day 3 flow blocked? Show this screenshot as the example and explain the idea; do not say their flow worked. Today Reply and Risk become subagents; the Customer Context Agent becomes an MCP tool that looks up customers.",
    "stateId": "7:Optional yesterday, explained today: specialist agents",
    "teach": {
      "time": "3 min",
      "gist": "Three specialists, each one job. Today: 2 agents in code + 1 lookup tool.",
      "script": [
        {
          "say": "Yesterday's last step: a team of specialists. Just like at the office: you don't ask one person to do everything."
        },
        {
          "do": "Point at the three agents, left to right.",
          "say": "The writer writes the reply. The risk expert decides how risky it is. The records desk looks up the customer."
        },
        {
          "do": "Point at the tagline.",
          "say": "Today we build this team in code. The writer and the risk expert become two agents. The records desk becomes a lookup tool: it only looks things up, it doesn't think."
        },
        {
          "ask": "Who called the Risk Agent in your flow yesterday?",
          "say": "(Listen. If someone's flow did not work: show this screenshot as the example.)"
        }
      ],
      "do": [
        "Name the three specialists and their job.",
        "Say what they become today."
      ],
      "done": [
        "Everyone knows: today 2 agents and 1 lookup tool."
      ],
      "watch": [
        "Someone's Day 3 did not work? Use this screenshot as the example; nobody is behind."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Goal of today",
    "kicker": "Welcome · Goal of today",
    "type": "context",
    "visual": {},
    "subtitle": "At 16:00 you have an agent team you built yourself, and you can explain it.",
    "cards": [
      {
        "title": "You built",
        "body": "An agent team in code: one agent, two specialists and a lookup tool."
      },
      {
        "title": "You can explain",
        "body": "Which agent may do what. And what it may not do."
      },
      {
        "title": "You know",
        "body": "When a person must say yes before anything changes."
      }
    ],
    "keyPoints": [
      "Built it yourself",
      "Who may do what",
      "A person says yes before a change"
    ],
    "notes": "Say the goal in one sentence: at 16:00 you have an agent team you built yourself, and you can explain it. Come back to this at the close, together with the goals people wrote down on slide 2.",
    "stateId": "9:Goal of today",
    "teach": {
      "time": "1 min",
      "gist": "At 16:00: built it yourself, can explain who may do what, knows when a person says yes.",
      "script": [
        {
          "say": "At four o'clock you have an agent team that you built yourself, and that you can explain."
        },
        {
          "do": "Point at the three cards.",
          "say": "You built it. You can say which agent may do what. And you know when a person must say yes before anything changes."
        },
        {
          "say": "At the end of the day we come back to this, and to the goals you wrote down this morning."
        },
        {
          "say": "And this is how we get there. Next slide: the day in four blocks."
        }
      ],
      "do": [
        "Say the goal in one sentence.",
        "Link it to the goals on the board."
      ],
      "done": [
        "Everyone knows what they will have at 16:00."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Today · agenda",
    "kicker": "Run of show · 10:00–16:00",
    "type": "context",
    "visual": {},
    "subtitle": "The rhythm all day: I show it. You do it. We check it.",
    "cards": [
      {
        "title": "10:00 · Start",
        "body": "Welcome and recap\nFrom n8n to code\nStep 0: get the package\n☕ Break 11:00"
      },
      {
        "title": "11:15 · Step 1",
        "body": "One agent\nThe form and memory\n🍽 Lunch 12:00"
      },
      {
        "title": "13:00 · Steps 2–4",
        "body": "Step 2: two specialists\nStep 3: lookup tools (MCP)\nStep 4: the check\n☕ Break 14:45"
      },
      {
        "title": "15:00 · Assignment",
        "body": "Extend the lookup tools\nClose 15:50"
      }
    ],
    "keyPoints": [
      "Rhythm: I show it, you do it, we check it"
    ],
    "notes": "Name the breaks out loud. Fell behind? Each step has a finished version you can switch to (step-1 … step-4). Step 5, build your own agent, is optional: at home. Workshop package: github.com/RyanLisse/aetherlink-day5-n8n-to-agent (checked 4 Nov: the steps and commands on the slides match the step-1 … step-4 branches).",
    "stateId": "8:Today · agenda",
    "teach": {
      "time": "1 min",
      "gist": "The day in four blocks. Rhythm: I show it, you do it, we check it.",
      "script": [
        {
          "do": "Point at the four blocks, left to right.",
          "say": "This is our day: four blocks. The start, step 1, then steps 2 to 4, and at the end your own assignment."
        },
        {
          "say": "The rhythm all day: first I show it, then you do it, then we check together if your screen shows the same."
        },
        {
          "say": "Fell behind? No problem. Every step has a finished version you can jump to."
        },
        {
          "do": "Name the breaks: 11:00, lunch at 12:00, 14:45."
        }
      ],
      "do": [
        "Walk through the four blocks.",
        "Name the rhythm and the breaks."
      ],
      "done": [
        "Everyone knows the rhythm and when the breaks are."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Why move the flow to code?",
    "kicker": "Context · why code",
    "type": "context",
    "visual": {},
    "subtitle": "n8n is great for drawing. Code lets you test, limit and control.",
    "cards": [
      {
        "title": "Test it",
        "body": "You label each message low, medium or high. npm run check marks it: correct or revise."
      },
      {
        "title": "What is npm run check?",
        "body": "npm = the remote control of a code project. check = a button built into the package."
      },
      {
        "title": "Limit it",
        "body": "Each agent gets its own key ring: only the tools it needs."
      },
      {
        "title": "Control it",
        "body": "A hook is a barrier: before any change, the code checks first."
      }
    ],
    "keyPoints": [
      "npm = the remote control of a code project",
      "npm run check = press the 'check' button",
      "Check: your labels against the answer key",
      "Limit: key ring · Control: barrier"
    ],
    "notes": "These are the three problems from the recap on slide 2: hard to test, every agent could do everything, no stop before a change. npm run check compares the labels you wrote down (low, medium, high per message) with a hidden answer key, and says per message: correct or revise. A hook is a piece of code that runs before a change, and can say no. npm comes with Node.js; the buttons are listed under 'scripts' in package.json. They only work inside the package folder.",
    "stateId": "10:Why move the flow to code?",
    "teach": {
      "time": "2 min",
      "gist": "Three reasons for code: test with one command, limit with a key ring per agent, control with a barrier.",
      "script": [
        {
          "say": "Why leave n8n? n8n is great for drawing. But remember the three problems from this morning."
        },
        {
          "do": "Point at Test it.",
          "say": "One: testing. In code you type one command, npm run check, and it marks all your answers against the answer key. Like a teacher with the answer sheet."
        },
        {
          "do": "Point at the card 'Where does npm run check come from?'.",
          "say": "What is npm? It comes with Node.js, and it is the remote control of a code project. Someone built buttons into this package: check, doctor, verify. npm run check means: press the button called check."
        },
        {
          "say": "Careful: the buttons only work in the project they were built for. Like a remote control: it only works with its own TV. In another project, check may not exist, or do something else."
        },
        {
          "do": "Point at Limit it.",
          "say": "Two: limiting. Each agent gets its own key ring. A new colleague doesn't get the key to the vault on day one either."
        },
        {
          "do": "Point at Control it.",
          "say": "Three: control. A hook is a barrier. Before anything changes, the code checks first. And the AI cannot drive around it."
        },
        {
          "ask": "Which of yesterday's problems does the barrier solve?",
          "say": "(Answer: there was no stop before a change.)"
        }
      ],
      "do": [
        "Name the three reasons.",
        "Link them to the problems from slide 2."
      ],
      "done": [
        "Everyone can name test, limit and control."
      ],
      "watch": [
        "Someone types npm run check outside the package folder? Then npm can't find the buttons: first cd into the package folder.",
        "The answer key is encrypted: nobody can peek, everybody has to think."
      ]
    },
    "tagline": "The buttons only work inside the workshop package folder."
  },
  {
    "lessonId": "workshop-4",
    "title": "n8n ↔ Agent SDK at a glance",
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
    "subtitle": "A dictionary: every block from yesterday, with its name in code. Same person at the end.",
    "columns": [
      {
        "title": "n8n · yesterday",
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
          "Ask the AI",
          "The agent's work instructions",
          "Max rounds, so it never loops forever",
          "Carry on the conversation",
          "The form",
          "The trays",
          "The lookup desk"
        ]
      }
    ],
    "keyPoints": [
      "Everything from yesterday comes back",
      "Only the name changes",
      "Same person at the end"
    ],
    "notes": "Go row by row, top to bottom. Everything they built yesterday comes back today, only the name changes. Every draft is still checked by a person. For you: the Customer Context Agent with its Data Table becomes the customers MCP tool (get_customer, over customer_context.csv); the transaction lookup becomes the transactions MCP tool (get_transaction, over transactions.xlsx).",
    "stateId": "11:n8n ↔ Agent SDK at a glance",
    "teach": {
      "time": "3 min",
      "gist": "The dictionary: yesterday's block, today's name, what it means. One row per click.",
      "script": [
        {
          "say": "This is our dictionary. Left: what you built yesterday. Middle: what it is called today. Right: what it means."
        },
        {
          "do": "Go through the rows top to bottom. Read the right column out loud.",
          "say": "The AI Agent becomes query(): ask the AI. The System Message becomes CLAUDE.md: the work instructions. And so on."
        },
        {
          "do": "Stop at Max Iterations.",
          "say": "maxTurns is the maximum number of rounds. So the agent can never keep going forever."
        },
        {
          "ask": "Which row is the form from slide 5?",
          "say": "(Answer: Priority Parser, json_schema.)"
        },
        {
          "say": "Everything from yesterday comes back. Only the name changes. And at the end: still a person who checks."
        }
      ],
      "do": [
        "Click row by row.",
        "Read the right column."
      ],
      "done": [
        "Everyone can find yesterday's blocks in today's names."
      ],
      "watch": [
        "Don't explain every technical name in depth. The right column is enough for now: the details come with each step."
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
    "subtitle": "Think of a chef and a kitchen assistant. The AI thinks and asks. The code checks and does.",
    "cards": [
      {
        "title": "AI = the chef",
        "body": "Thinks and asks. Never touches anything itself."
      },
      {
        "title": "Code = the kitchen assistant",
        "body": "Checks if it is allowed, does it, hands it back."
      },
      {
        "title": "Done is not proof",
        "body": "When the AI says “done”, a person checks the evidence."
      }
    ],
    "keyPoints": [
      "Model requests; runtime executes.",
      "Check permission before a tool runs.",
      "Hooks can inspect defined before/after events.",
      "Text is not success; check evidence.",
      "Errors, limits and people can stop the run."
    ],
    "notes": "Think of a chef and a kitchen assistant. The AI is the chef: it thinks and asks 'give me the customer details'. The code is the assistant: it checks 'is the chef allowed this?', fetches it and hands it back. The chef carries on with what it got. Round after round, until the dish is ready, or the maximum number of rounds (maxTurns) is reached, or something is refused. Two things to remember: the AI never touches anything itself, it only asks. And 'the AI says it is done' is not proof: always check the evidence. A hook checks at fixed moments (for example before a change); it is not the same as a person approving.",
    "stateId": "12:One agent loop. Bounded actions.",
    "teach": {
      "time": "4 min",
      "gist": "Chef (AI) asks, kitchen assistant (code) checks and does. AI never touches anything itself. 'Done' is not proof.",
      "script": [
        {
          "say": "How does an agent actually work? Think of a chef and a kitchen assistant."
        },
        {
          "do": "Point at box 1 and 2.",
          "say": "The AI is the chef. It thinks and says: give me the customer details."
        },
        {
          "do": "Point at box 3 and 4.",
          "say": "The code is the kitchen assistant. First it checks: is the chef allowed this? Then it fetches it and hands it back."
        },
        {
          "do": "Trace the arrows round with your finger.",
          "say": "The chef carries on with what it got. Round after round, until the dish is ready."
        },
        {
          "do": "Point at the orange line at the top.",
          "say": "And when the chef says: the dish is ready? Then a person tastes it first."
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
        "Tell the chef and kitchen assistant story.",
        "Two rules: AI only asks, 'done' is not proof."
      ],
      "done": [
        "Everyone can say who asks and who does."
      ],
      "watch": [
        "People think the AI 'goes into' the system itself. Repeat: it only asks, the code does it.",
        "The loop also stops when the maximum number of rounds is reached, or when something is refused."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Two ways to run the same agent",
    "kicker": "Concept · choose a backend",
    "type": "concept",
    "visual": {},
    "subtitle": "We use your Claude Code login from Day 1. Nothing new to request.",
    "cards": [
      {
        "title": "What you use",
        "body": "Your Claude Code login. The same one as Day 1 and 2."
      },
      {
        "title": "What you don't need",
        "body": "An API key. Nothing new to request."
      }
    ],
    "keyPoints": [
      "Use your Claude Code login",
      "No API key needed"
    ],
    "notes": "For you, not for the slide: the same agent can also run with an Anthropic API key (the 'sdk' backend). Careful: if ANTHROPIC_API_KEY is set on someone's laptop, the package picks that way by itself. Force the login with --backend claude-code. The n8n trial credits from Day 3 do not carry over to Claude.",
    "stateId": "13:Two ways to run the same agent",
    "teach": {
      "time": "1 min",
      "gist": "We run on the Claude Code login from Day 1. No API key.",
      "script": [
        {
          "say": "Good news: you already have everything. We use your Claude Code login from Day 1. You don't need to request anything new."
        }
      ],
      "do": [
        "Say: your Claude Code login is enough."
      ],
      "done": [
        "Nobody is looking for an API key."
      ],
      "watch": [
        "Someone's run picks 'sdk' by itself? Then an API key is set on their laptop. Add --backend claude-code to the command.",
        "The n8n trial credits from yesterday do not work here."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Demo · Step 0: is your laptop ready?",
    "kicker": "Demo · Step 0 · I show it",
    "type": "concept",
    "visual": {},
    "subtitle": "Before we build, we check that everything is in place. I show it now. On the next slide you do the same.",
    "cards": [
      {
        "title": "1 · npm ci",
        "body": "Installs the parts of the package. Like unpacking a toolbox."
      },
      {
        "title": "2 · npm run doctor",
        "body": "The health check: are Node and Claude Code installed, and new enough? Look for: meets minimum."
      },
      {
        "title": "3 · npm run verify",
        "body": "Runs the tests. Look for: fail 0."
      },
      {
        "title": "4 · npm run lesson1 -- MSG-01 --dry-run",
        "body": "Dress rehearsal: shows what the agent would get, without calling the AI. Look for: backend: claude-code."
      }
    ],
    "keyPoints": [
      "Install, health check, tests, rehearsal",
      "The AI does nothing yet",
      "Look for: backend: claude-code"
    ],
    "notes": "You show this; participants do it on the next slide. Run the commands exactly as in SOLO.md. Point at the line 'backend: claude-code': that means the login is used. A dry run does not call the AI: so it says nothing yet about how good the agent is. Setup per platform (Windows, WSL, Mac, Docker) is in docs/SETUP.md.",
    "stateId": "14:Demo · Step 0: the offline path",
    "teach": {
      "time": "5 min",
      "gist": "Demo: install, health check, tests, dress rehearsal. The AI does nothing yet.",
      "script": [
        {
          "say": "Before we build anything, I'll show you how to check your laptop is ready. Just watch. On the next slide you do it yourself."
        },
        {
          "say": "Before we build anything, we check that the stage is set. Like a dress rehearsal: the AI does nothing yet."
        },
        {
          "do": "Type npm ci.",
          "say": "This installs all the parts.",
          "clip": "assets/day4-teach/a07-1-clone-install-doctor.mp4"
        },
        {
          "do": "Type npm run doctor.",
          "say": "The health check: are Node and Claude Code installed, and new enough? Look for 'meets minimum'."
        },
        {
          "do": "Type npm run verify.",
          "say": "This runs the tests.",
          "clip": "assets/day4-teach/a07-2-verify.mp4"
        },
        {
          "do": "Type npm run lesson1 -- MSG-01 --dry-run. Point at 'backend: claude-code'.",
          "say": "And the dress rehearsal. See this line? It uses your Claude Code login. And it says: dry run, no model call.",
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
        "Everyone saw the four commands and knows what each one does."
      ],
      "watch": [
        "Windows laptops: check docs/SETUP.md beforehand.",
        "A dry run says nothing about the quality of the agent: it only checks the setup."
      ]
    },
    "tagline": "Why first? If something is missing, you find out now, not halfway through the exercise."
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · Step 0",
    "kicker": "SOLO 0 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "visual": {
      "bot": "point",
      "place": "slot"
    },
    "subtitle": "The same steps I just showed. Every command has a copy button: you don't type anything yourself.",
    "cards": [],
    "steps": [
      {
        "text": "Open a terminal and go to your Documents folder",
        "prompt": "cd ~/Documents",
        "after": "Windows: PowerShell. Mac: Terminal. Other setup? See docs/SETUP.md in the package."
      },
      {
        "text": "Download the package",
        "prompt": "git clone https://github.com/RyanLisse/aetherlink-day5-n8n-to-agent.git",
        "after": "You now have your own copy of the package on your laptop."
      },
      {
        "text": "Go into the folder and install the parts",
        "prompt": "cd aetherlink-day5-n8n-to-agent\nnpm ci",
        "after": "Takes about a minute. Warnings are fine, errors are not."
      },
      {
        "text": "Health check and tests",
        "prompt": "npm run doctor\nnpm run verify",
        "after": "Look for: meets minimum, and fail 0."
      },
      {
        "text": "Dress rehearsal",
        "prompt": "npm run lesson1 -- MSG-01 --dry-run",
        "after": "The last line says: dry run — no model call. That is correct: the AI does nothing yet."
      }
    ],
    "expected": "verify shows fail 0, and the dry run ends with “dry run — no model call”.",
    "keyPoints": [
      "Use docs/SETUP.md for Windows, WSL, Linux/macOS, or Docker.",
      "main is Step 0; step-1 through step-4 contain the finished steps.",
      "With ANTHROPIC_API_KEY in your shell, the runner picks sdk. Use --backend to choose."
    ],
    "notes": "Participants do the five steps; you walk around. npm run verify also runs the chat dry run, so no separate step for that. Someone's run says backend: sdk? Then an ANTHROPIC_API_KEY is set on their laptop: add --backend claude-code. Use the break after the next slide to help people who don't have fail 0 yet.",
    "stateId": "15:Get the workshop package.",
    "teach": {
      "time": "10 min",
      "gist": "Participants do Step 0 themselves: download, install, health check, tests, dress rehearsal.",
      "script": [
        {
          "say": "Now you. The same steps I just showed. Every command has a copy button: you don't type anything yourself."
        },
        {
          "do": "Point at steps 1 and 2.",
          "say": "First go to your Documents folder, then download the package. That makes your own copy."
        },
        {
          "do": "Point at step 3.",
          "say": "Then into the folder, and install the parts. That takes about a minute."
        },
        {
          "do": "Point at steps 4 and 5.",
          "say": "Then the health check, the tests and the dress rehearsal. Look at the Done when line: that's what your screen should say."
        },
        {
          "do": "Start the 10-minute timer and walk around."
        }
      ],
      "do": [
        "Copy each command, run it.",
        "Check: meets minimum, fail 0, dry run."
      ],
      "done": [
        "verify shows fail 0.",
        "The dry run ends with 'dry run — no model call'."
      ],
      "watch": [
        "'npm' not found → Node.js is not installed (npm comes with Node.js): see docs/SETUP.md.",
        "'Missing script' or 'could not find package.json' → they are in the wrong folder: cd aetherlink-day5-n8n-to-agent first.",
        "'git' not found → Git is not installed: see docs/SETUP.md.",
        "Error at npm ci → check Node version: node --version must be 22 or higher.",
        "Backend says sdk → add --backend claude-code."
      ]
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
    "subtitle": "Compare your terminal with this screenshot. Two things to look for.",
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
        "body": "Last line: dry run — no model call. That is correct: the AI did nothing yet."
      }
    ],
    "notes": "Show this screen after Step 0. The first line of the dry run shows the backend: claude-code or sdk. A dry run prints the command but does not call the model, so it is not model evidence.",
    "stateId": "16:What you see · Step 0",
    "teach": {
      "time": "2 min",
      "gist": "Compare screens: fail 0, and the dry-run last line.",
      "script": [
        {
          "say": "Compare your screen with this one. Two things."
        },
        {
          "do": "Point at card 1.",
          "say": "After verify: fail 0. Then your setup is correct."
        },
        {
          "do": "Point at card 2.",
          "say": "After the dry run, the last line says: dry run, no model call. That is right: the AI did nothing yet."
        },
        {
          "ask": "Hands up: who has fail 0?",
          "say": "(Not everyone? Help them in the break.)"
        }
      ],
      "do": [
        "Compare with the screenshot.",
        "Count hands: who has fail 0?"
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
    "subtitle": "Back at 11:15. Not at fail 0 yet? Stay, we'll fix it together.",
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
    "stateId": "17:Short break",
    "teach": {
      "time": "15 min",
      "gist": "Break. Help anyone without fail 0.",
      "script": [
        {
          "say": "Fifteen minutes break. Back at 11:15. Not at fail 0 yet? Stay for a moment, we'll fix it together."
        },
        {
          "do": "Start the countdown."
        }
      ],
      "do": [
        "Start the countdown.",
        "Help people without fail 0."
      ],
      "done": [
        "Everyone at fail 0 before Step 1."
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
    "subtitle": "Yesterday the instructions were inside the n8n block (System Message). Today they are a file next to the code.",
    "cards": [],
    "keyPoints": [
      "The system message now lives in a file next to the code."
    ],
    "notes": "Like the work instructions of a new colleague on day one. The real file is 01-single-agent/claude-project/CLAUDE.md. Show it on screen: Purpose, Rules, Priority definitions, Required output. The last line of Priority definitions is the tone trap: judge impact, not tone. In Step 1 they will cut that section out and see what happens.",
    "stateId": "18:System prompt",
    "teach": {
      "time": "3 min",
      "gist": "CLAUDE.md = the work instructions: who you are, what you may not do, when is it high/medium/low.",
      "script": [
        {
          "say": "Remember the System Message in n8n? Today that is a file: CLAUDE.md. Think of the work instructions a new colleague gets on day one."
        },
        {
          "do": "Point at the three orange headings, left to right.",
          "say": "Three parts. Who you are: a support assistant at a payment company. What you may not do: invent facts. And when a message is high, medium or low."
        },
        {
          "do": "Point at the orange box bottom right.",
          "say": "Look at this line: an angry tone alone never makes it high. Remember it: in Step 1 we test it."
        },
        {
          "ask": "Why would you write that down?",
          "say": "(Answer: a calm customer can have a big problem, and an angry one a small problem. The AI must look at the problem, not the tone.)"
        }
      ],
      "do": [
        "Explain: CLAUDE.md = work instructions.",
        "Name the three parts."
      ],
      "done": [
        "Everyone can say what is in CLAUDE.md."
      ],
      "watch": [
        "People think CLAUDE.md is where Claude gets its knowledge. No: it says how to behave, not what it knows."
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
    "subtitle": "Yesterday's Priority Parser becomes a JSON schema. The trays (Switch) stay plain code.",
    "cards": [
      {
        "title": "Yesterday · Priority Parser",
        "body": "The form in the n8n block."
      },
      {
        "title": "Today · json_schema",
        "body": "The same form, as a file: priority-schema.mjs. The AI must fill it in."
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
    "notes": "The Structured Output Parser becomes outputFormat with type json_schema (file 01-single-agent/priority-schema.mjs). In Claude Code in the terminal the same is the --json-schema flag. Then lib/switch.mjs maps low, medium and high to a fixed action and team. The AI gives the label; the code picks the route.",
    "stateId": "19:Structured output: parser to JSON schema",
    "teach": {
      "time": "2 min",
      "gist": "Parser becomes json_schema (the form as a file). The Switch stays code: AI gives the label, code picks the route.",
      "script": [
        {
          "say": "Remember the form from yesterday, the Priority Parser? Today it is a file: the JSON schema."
        },
        {
          "do": "Point at the middle card.",
          "say": "Same form, same fields. The AI has to fill it in, otherwise it is refused."
        },
        {
          "do": "Point at the last card.",
          "say": "And the trays stay plain code. No AI. The AI gives the label, the code picks the route."
        },
        {
          "ask": "Why do we want the route in plain code, not in the AI?",
          "say": "(Answer: then you always know exactly where a message goes. Same input, same route.)"
        }
      ],
      "do": [
        "Parser → json_schema.",
        "Switch stays code."
      ],
      "done": [
        "Everyone can say: AI gives the label, code picks the route."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Memory: the chat remembers the conversation",
    "kicker": "Concept · memory",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Like the desk from slide 4: same customer, you remember. New customer, start fresh.",
    "cards": [
      {
        "title": "Yesterday · Simple Memory",
        "body": "The n8n block that remembered your favourite colour."
      },
      {
        "title": "Today · npm run chat",
        "body": "Carries on the same conversation. It remembers."
      },
      {
        "title": "Today · --no-memory",
        "body": "Every message is a new conversation. It forgets."
      }
    ],
    "keyPoints": [
      "Simple Memory carries a favourite-colour test across turns.",
      "npm run chat resumes with the previous sessionId.",
      "--no-memory starts each turn without resume."
    ],
    "notes": "The conversation is the memory: npm run chat passes the previous session on to the next message (resume: sessionId in lib/chat.mjs). With --no-memory every message starts fresh. Every npm run lesson1 is a new session on purpose: one ticket is one case.",
    "stateId": "20:Memory is the session",
    "teach": {
      "time": "2 min",
      "gist": "Memory = the conversation. npm run chat remembers, --no-memory forgets.",
      "script": [
        {
          "say": "Remember the desk? Same customer, you remember what he said. That is memory."
        },
        {
          "do": "Point at the first card.",
          "say": "Yesterday that was the Simple Memory block. You tested it with your favourite colour."
        },
        {
          "do": "Point at the other two cards.",
          "say": "Today: npm run chat carries on the conversation, so it remembers. With --no-memory every message is a new conversation, so it forgets."
        },
        {
          "ask": "Why do we want every customer ticket to start fresh?",
          "say": "(Answer: customer B may never see anything of customer A.)"
        }
      ],
      "do": [
        "Memory = the conversation.",
        "With and without --no-memory."
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
    "subtitle": "You give one agent its work instructions and the form. Then the code sorts the answer into a tray.",
    "cards": [
      {
        "title": "What you build",
        "body": "One agent with CLAUDE.md and the form: priority and reason."
      },
      {
        "title": "Why",
        "body": "A fixed form makes the answer predictable. Then the code can sort it."
      },
      {
        "title": "Done when",
        "body": "You have six labels written down, and you tested the tone trap."
      }
    ],
    "keyPoints": [
      "One agent returns a fixed priority. Code routes it."
    ],
    "notes": "Step 1 in the package (SOLO.md, Step 1): Build 1 options.mjs, Build 2 CLAUDE.md, Build 3 priority-schema.mjs, Build 4 the memory test; then six live runs (MSG-01 to MSG-06) and the tone trap. Participants copy the code from SOLO.md: they don't type it. The six labels are needed in Step 4 (npm run check).",
    "stateId": "21:Step 1 · Structured priority output and chat memory",
    "teach": {
      "time": "2 min",
      "gist": "Step 1: one agent + work instructions + form. Done = six labels and the tone trap tested.",
      "script": [
        {
          "say": "Step 1. You build one agent. You give it its work instructions, CLAUDE.md, and the form."
        },
        {
          "do": "Point at Why.",
          "say": "Why the form? Then the answer is always the same shape, and the code can sort it."
        },
        {
          "do": "Point at Done when.",
          "say": "You are done when you have six labels written down, and you tested the tone trap. Keep the labels: you need them in Step 4."
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
    "subtitle": "Watch first. On the next slides you do the same.",
    "cards": [
      {
        "title": "1 · Dress rehearsal",
        "body": "npm run lesson1 -- MSG-01 --dry-run\nLook for: outputFormat, that is the form."
      },
      {
        "title": "2 · A real run",
        "body": "npm run lesson1 -- MSG-01\nLook for: Structured output, and Switch → low."
      },
      {
        "title": "3 · Memory",
        "body": "npm run chat\nGive a colour, ask it back. Then with --no-memory."
      }
    ],
    "keyPoints": [
      "Show the dry run first. Then show a live run or the sample trace."
    ],
    "notes": "Show it on the finished version (git switch step-1), so the build is already done. 1: the dry run shows the options, including outputFormat. 2: a live run (Claude Code login) prints Structured output with priority and reason, then the Switch line. No live run possible? Show docs/sample-trace.md and say it is a sample. 3: the colour test with and without --no-memory.",
    "stateId": "22:Demo · Step 1: schema, route, and memory",
    "tagline": "The AI gives the label. The code picks the tray.",
    "teach": {
      "time": "5 min",
      "gist": "Demo on step-1: dry run, a real run with the Switch line, the memory test.",
      "script": [
        {
          "do": "Before class: git switch step-1 in your own copy."
        },
        {
          "say": "I show it first, on the finished version. Just watch."
        },
        {
          "do": "Run the dry run. Point at outputFormat.",
          "say": "The dress rehearsal. See outputFormat? That is the form.",
          "clip": "assets/day4-teach/a09-1-dry-run.mp4"
        },
        {
          "do": "Run npm run lesson1 -- MSG-01. Point at Structured output and the Switch line.",
          "say": "Now a real run. The AI fills in the form: priority low, plus the reason. And then the code: Switch, low, auto reply.",
          "clip": "assets/day4-teach/a09-2-msg01-msg02.mp4"
        },
        {
          "do": "Run npm run chat, then npm run chat -- --no-memory.",
          "say": "And the memory test. Same conversation: it remembers red. A new conversation: it forgets."
        },
        {
          "ask": "Who picked the tray: the AI or the code?",
          "say": "(Answer: the code. The AI only gave the label.)"
        }
      ],
      "do": [
        "Dry run, real run, memory test."
      ],
      "done": [
        "Everyone saw the form and the Switch line."
      ],
      "watch": [
        "A real run needs your Claude Code login and takes a moment.",
        "No internet or login? Show docs/sample-trace.md and say clearly it is a sample."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · Step 1a: build the agent",
    "kicker": "SOLO 1a · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "multiarm",
      "place": "beside"
    },
    "subtitle": "All the code is in SOLO.md, Step 1. You copy it: you don't type it yourself.",
    "cards": [],
    "steps": [
      {
        "text": "Open SOLO.md in your editor and go to Step 1",
        "after": "Everything you need is there, as Build 1, 2 and 3."
      },
      {
        "text": "Build 1: the settings",
        "after": "Replace the whole file 01-single-agent/options.mjs with Build 1."
      },
      {
        "text": "Build 2: the work instructions",
        "after": "Replace 01-single-agent/claude-project/CLAUDE.md with Build 2."
      },
      {
        "text": "Build 3: the form",
        "after": "Create 01-single-agent/priority-schema.mjs. Then add the import and the outputFormat line to options.mjs: that is the line people forget.",
        "warn": true
      },
      {
        "text": "Test it",
        "prompt": "git checkout origin/step-1 -- test/step1.test.mjs\nnpm run verify",
        "after": "Look for: fail 0. Stuck? git switch step-1 gives you the finished version."
      }
    ],
    "expected": "npm run verify shows fail 0.",
    "keyPoints": [
      "Do the dry run. Then compare chat with and without memory."
    ],
    "teach": {
      "time": "15 min",
      "gist": "Build 1-3 from SOLO.md (settings, work instructions, form), then verify.",
      "script": [
        {
          "say": "Now you build it. Open SOLO.md and go to Step 1. Everything you need is in there, as Build 1, 2 and 3. You copy it, you don't type it."
        },
        {
          "do": "Point at steps 2 and 3.",
          "say": "Build 1: the settings. Build 2: the work instructions, CLAUDE.md."
        },
        {
          "do": "Point at step 4.",
          "say": "Build 3: the form. Careful: you also add one line to options.mjs, the outputFormat line, and an import at the top. That's the one people forget."
        },
        {
          "do": "Point at step 5.",
          "say": "Then copy in the test, and run verify. Look for fail 0.",
          "clip": "assets/day4-teach/a10-1-verify-outputformat.mp4"
        },
        {
          "do": "Start the 15-minute timer."
        }
      ],
      "do": [
        "Paste Build 1-3 from SOLO.md.",
        "Copy the test, run npm run verify."
      ],
      "done": [
        "verify shows fail 0."
      ],
      "watch": [
        "Verify fails on the schema → the outputFormat line or the import is missing in options.mjs.",
        "Someone retyping code → remind them: copy from SOLO.md.",
        "Stuck: git stash -u, then git switch step-1."
      ]
    },
    "notes": "Participants copy Build 1 to 3 from SOLO.md, Step 1. The first test file is copied from the finished branch, then npm run verify. Fell behind or stuck? git switch step-1 (first git stash -u if they changed files)."
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · Step 1b: look inside and test memory",
    "kicker": "SOLO 1b · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "visual": {},
    "subtitle": "Now your agent is built. Look at the form and the trays, then test the memory.",
    "cards": [],
    "steps": [
      {
        "text": "Dress rehearsal",
        "prompt": "npm run lesson1 -- MSG-01 --dry-run",
        "after": "You see the options the agent gets. Find outputFormat: that is the priority schema."
      },
      {
        "text": "Open 01-single-agent/priority-schema.mjs and lib/switch.mjs",
        "after": "The schema says what the answer looks like. The Switch picks the route. Code decides the route, not the model."
      },
      {
        "text": "Start the chat and give it something to remember",
        "prompt": "npm run chat",
        "after": "Type: My favourite colour is red. Then ask: What is my favourite colour? Type exit to stop."
      },
      {
        "text": "Do it again, without memory",
        "prompt": "npm run chat -- --no-memory",
        "after": "Ask the same question. Now it does not know. Each message is a new session.",
        "warn": true
      }
    ],
    "expected": "You can point at the schema and the Switch, and say why only the first chat remembered red.",
    "keyPoints": [
      "Do the dry run. Then compare chat with and without memory."
    ],
    "teach": {
      "time": "10 min",
      "gist": "SOLO 1: dry run to see the schema, open schema + Switch, then the favourite-colour test with and without memory.",
      "script": [
        {
          "say": "Your turn. Four steps on the slide, every command has a copy button. You don't type anything yourself."
        },
        {
          "do": "Point at step 1.",
          "say": "First a dry run: no model, you only see what the agent would get. Look for outputFormat. That is the parser from yesterday in n8n."
        },
        {
          "do": "Point at step 2.",
          "say": "Then open two files. The schema says what the answer must look like. The Switch picks the route. The model gives a label, the code decides where it goes."
        },
        {
          "do": "Point at steps 3 and 4.",
          "say": "Then the memory test. Tell the chat your favourite colour, ask it back, exit. Do it again with --no-memory.",
          "clip": "assets/day4-teach/a10-2-memory-test.mp4"
        },
        {
          "ask": "What do you expect with --no-memory?",
          "say": "(Answer: it forgets. Every message is a new session, like n8n without Simple Memory.)"
        },
        {
          "do": "Start the 15-minute timer."
        }
      ],
      "do": [
        "Dry run MSG-01, find outputFormat.",
        "Open priority-schema.mjs and lib/switch.mjs.",
        "Chat with memory, then with --no-memory."
      ],
      "done": [
        "They can point at the schema and the Switch.",
        "They can say why only the first chat remembers the colour."
      ],
      "watch": [
        "Do not present the dry-run output as model JSON or as a Switch result. That only comes from a live run (Claude Code login, or --backend sdk with a key) or docs/sample-trace.md, as a sample.",
        "The chat needs a logged-in Claude Code. Not logged in: run claude once and log in.",
        "Funny but expected: 'My favourite colour is red' also gets a priority (low), because CLAUDE.md makes it a triage agent. Use it: the rules in CLAUDE.md apply to everything you type."
      ]
    },
    "notes": "Give participants 15 minutes. Offline, inspect 01-single-agent/priority-schema.mjs, outputFormat in the dry-run options, and lib/switch.mjs. Do not present dry-run output as model JSON or a Switch → result; show those only from a live run (Claude Code login, or --backend sdk with a key) or docs/sample-trace.md, labelled as an illustrative sample. Then compare a favourite-colour follow-up in the same chat with --no-memory.",
    "stateId": "23:Run Step 1 and test chat memory."
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · Step 1c: six messages and the tone trap",
    "kicker": "SOLO 1c · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "Your agent labels six real customer messages. Then you remove one rule and see what happens.",
    "cards": [],
    "steps": [
      {
        "text": "Label six messages, one by one",
        "prompt": "npm run lesson1 -- MSG-01",
        "after": "Then MSG-02 up to MSG-06. Write down each label: low, medium or high. You need them in Step 4."
      },
      {
        "text": "Remove the rules for high, medium and low",
        "after": "Cut the whole ## Priority definitions section from 01-single-agent/claude-project/CLAUDE.md. Save.",
        "warn": true
      },
      {
        "text": "Run two messages again",
        "prompt": "npm run lesson1 -- MSG-01\nnpm run lesson1 -- MSG-06",
        "after": "Compare with your first labels. Did anything change?"
      },
      {
        "text": "Put the rules back",
        "after": "Paste the section back and save. Lost it? git checkout origin/step-1 -- 01-single-agent/claude-project/CLAUDE.md"
      },
      {
        "text": "Check it still works",
        "prompt": "npm run verify",
        "after": "Look for: fail 0."
      }
    ],
    "expected": "Six labels written down, the tone-trap comparison noted, CLAUDE.md restored and fail 0.",
    "keyPoints": [
      "Do the dry run. Then compare chat with and without memory."
    ],
    "teach": {
      "time": "15 min",
      "gist": "Six live runs, labels written down; then the tone trap: remove the definitions, rerun 01 and 06, restore.",
      "script": [
        {
          "say": "Now your agent does real work: six customer messages. Write down every label, you need them in Step 4.",
          "clip": "assets/day4-teach/a11-1-six-labels.mp4"
        },
        {
          "do": "Point at steps 2 and 3.",
          "say": "Then the tone trap. You remove the rules for high, medium and low from CLAUDE.md, and run two messages again.",
          "clip": "assets/day4-teach/a11-2-tone-trap.mp4"
        },
        {
          "ask": "What do you expect will happen without those rules?",
          "say": "(Answer: the AI may judge by tone. An angry message looks urgent, a calm one harmless.)"
        },
        {
          "do": "Point at steps 4 and 5.",
          "say": "Then put the rules back, and check fail 0 again."
        },
        {
          "do": "Start the 15-minute timer."
        }
      ],
      "do": [
        "Six runs, labels written down.",
        "Tone trap: cut, rerun 01 and 06, restore.",
        "npm run verify."
      ],
      "done": [
        "Six labels written down.",
        "Tone-trap comparison noted.",
        "CLAUDE.md restored, fail 0."
      ],
      "watch": [
        "For you only: MSG-01 low, 02 high, 03 medium, 04 low, 05 high, 06 low.",
        "The label often does NOT change without the definitions (strong model). Say: 'the model got lucky, but now nothing in the file guarantees it. Would you bet the escalation queue on luck?'",
        "Each live run takes a moment and uses their Claude Code quota."
      ]
    },
    "notes": "Expected labels, for you only, don't say them aloud: MSG-01 low, 02 high, 03 medium, 04 low, 05 high, 06 low (checked against the package answer key). The tone trap: without the priority definitions the model may judge by tone, so a loud message looks urgent. A strong model often keeps the same label: that's fine, the point is that nothing in the file guarantees it any more. Each live run uses the participant's Claude Code quota; six runs is fine."
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
    "subtitle": "After a real run. Two things to look for.",
    "keyPoints": [
      "Structured output: JSON with priority and reason.",
      "Switch line: Switch → low → AUTO_REPLY. Code picks the route, not the model."
    ],
    "cards": [
      {
        "title": "1 · Structured output",
        "body": "The filled-in form: priority and reason."
      },
      {
        "title": "2 · The Switch line",
        "body": "Switch → low → AUTO_REPLY. The code picked the tray, not the AI."
      }
    ],
    "notes": "This is the labelled sample in docs/sample-trace.md. A live run shows the same labels with other text. The [result] line shows turns, time and cost.",
    "stateId": "24:What you see · Step 1",
    "teach": {
      "time": "2 min",
      "gist": "Compare: the filled-in form, then the Switch line.",
      "script": [
        {
          "say": "Compare your screen with this one. Two things."
        },
        {
          "do": "Point at card 1.",
          "say": "The filled-in form: priority and reason."
        },
        {
          "do": "Point at card 2.",
          "say": "And the Switch line: the code picked the tray."
        },
        {
          "ask": "Your reason text is different from mine. Is that a problem?",
          "say": "(Answer: no. The words differ per run. The priority and the route are what matter.)"
        }
      ],
      "do": [
        "Compare with the screenshot."
      ],
      "done": [
        "Everyone found both lines."
      ],
      "watch": [
        "This screenshot is a sample: the reason text is different on every run."
      ]
    }
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
    "subtitle": "The coordinator passes Risk’s result to Reply. Prove the handoff in the trace.",
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
    "notes": "The final chain maps n8n Description to frontmatter description and System Message to the prompt body. Step 2 delegates first to risk-agent, then customer-reply-agent; Step 3 adds customer-context-agent. Claude Code reads the same .claude/agents/*.md files directly. Compare with Day 3: n8n explicitly wires Risk as a tool of Reply. Here the coordinator relays the result. A file instruction such as “send your analysis to the other agent” does not establish a runtime connection. Inspect the delegation and the result passed to Reply.",
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
    "notes": "Show the folder on step-2: git switch step-2, then ls -a and ls .claude/agents. main is Step 0, so it has no .claude/agents yet. Claude Code looks for project subagents in .claude/agents/, walking up from the working folder; the SDK reads the same folder with settingSources: ['user', 'project']. A .agents/ folder is not loaded as subagents by Claude Code or the SDK. AGENTS.md is the cross-tool note for coding agents, not a subagent definition. In the assignment the new agents live in 03-mcp/claude-project/.claude/agents/.",
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
      "The SDK reads the same folder with settingSources: ['user', 'project']."
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
