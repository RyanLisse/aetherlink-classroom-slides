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
    "subtitle": "Talk at your table first. Then click to see the answer.",
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
    "notes": "Answers: the form allows only low, medium or high. The code (lib/switch.mjs) picks the route, the AI only gives the label. With --no-memory every message is a new conversation, so it forgets.",
    "stateId": "25:Discuss: what makes the route predictable?",
    "teach": {
      "time": "4 min",
      "gist": "Discussion: form, tray, memory. AI gives the label, code picks the route.",
      "script": [
        {
          "say": "Two minutes at your table. Three questions on the screen."
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
        "Let tables talk, then click per card."
      ],
      "done": [
        "Every table answered at least one question."
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
    "subtitle": "Think of a desk. The AI only sees what is on the desk: the instructions, the conversation and the tool results. The desk has a limit.",
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
    "notes": "The context window is the desk: everything the AI can see in one go (instructions, CLAUDE.md, the conversation, tool results). It has a maximum size. Show /context in Claude Code itself (not in npm run chat): it shows how full the desk is.",
    "teach": {
      "time": "3 min",
      "gist": "Context = the desk. The AI only sees what is on it, and the desk has a limit.",
      "script": [
        {
          "say": "How much can the AI see at once? Think of a desk."
        },
        {
          "do": "Point at the diagram.",
          "say": "On the desk: the work instructions, the conversation so far, and what the tools handed back. Only that. And the desk has a maximum size."
        },
        {
          "do": "Open Claude Code and type /context.",
          "say": "This shows how full the desk is right now."
        },
        {
          "ask": "What happens when the desk is full?",
          "say": "(Answer: something has to go. That is the next two slides.)"
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
    "subtitle": "Like a bookmark: what the AI already read can be reused, so it is faster. But it still takes space on the desk.",
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
    "notes": "Claude Code does this by itself (prompt caching): a part that is exactly the same as before is reused, which saves time and cost. It does not make the desk bigger: the cached part still counts in the context.",
    "teach": {
      "time": "2 min",
      "gist": "Caching = a bookmark: faster, but still on the desk.",
      "script": [
        {
          "say": "Caching is like a bookmark. What the AI already read, it does not need to read again. That is faster and cheaper."
        },
        {
          "say": "But careful: it still lies on the desk. Caching makes it faster, not bigger."
        },
        {
          "ask": "Does caching give the AI more memory?",
          "say": "(Answer: no. Only speed.)"
        }
      ],
      "do": [
        "Bookmark: faster, not bigger."
      ],
      "done": [
        "Everyone knows caching is not extra memory."
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
    "subtitle": "When the desk is full, the conversation is summarised. A summary loses details: so check that the important rules are still there.",
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
    "notes": "Compaction replaces the long history with a shorter summary (/compact in Claude Code). That is not a perfect copy: details can disappear. Do it at a natural break (end of a task), then check that the important rules still hold, for example 'priority must be low, medium or high' and 'draft only: a person checks first'. Try it in Claude Code itself, not inside npm run chat.",
    "teach": {
      "time": "3 min",
      "gist": "Compaction = summarise to make room. A summary loses details, so check.",
      "script": [
        {
          "say": "Desk full? Then the conversation is summarised. In Claude Code: /compact."
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
    "title": "Lunch",
    "kicker": "Day 4 · Lunch",
    "type": "pause",
    "visual": {
      "countdown": 60,
      "bot": "sleepy",
      "place": "beside"
    },
    "subtitle": "Back at 13:00. Fell behind? After lunch: git switch step-1.",
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
    "title": "Tools: what may each agent use?",
    "kicker": "Concept · Tools",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "subtitle": "In code you write down which tools an agent has, and which ones it may use.",
    "cards": [
      {
        "title": "tools",
        "body": "The toolbox: which tools exist for this agent."
      },
      {
        "title": "allowedTools",
        "body": "May use without asking."
      },
      {
        "title": "disallowedTools",
        "body": "Never. Not even if the AI asks."
      }
    ],
    "keyPoints": [
      "In code you state exactly which tools exist and which are allowed."
    ],
    "notes": "Like a key ring: tools is which keys exist, allowedTools which doors open without asking, disallowedTools which doors stay locked. Step 1: tools is empty and WebSearch, WebFetch and Bash are forbidden. Step 3 adds the read-only lookup tools.",
    "stateId": "27:Tools",
    "teach": {
      "time": "2 min",
      "gist": "The key ring: tools, allowedTools, disallowedTools.",
      "script": [
        {
          "say": "Remember the key ring? In code you write it down."
        },
        {
          "do": "Point at the three cards.",
          "say": "Which tools exist. Which it may use without asking. And which never, not even if the AI asks."
        },
        {
          "ask": "Which tools did our agent from Step 1 get?",
          "say": "(Answer: none. It may only read and answer. Search the web is forbidden.)"
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
    "subtitle": "The team lead hands out the work. Risk goes first; its result goes to the writer.",
    "cards": [
      {
        "title": "Orchestrator = the team lead",
        "body": "Gets the ticket and hands out the work."
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
    "notes": "Step 2: the orchestrator delegates to risk-agent first, then passes that result to customer-reply-agent. In the trace you see it as Agent → risk-agent, then Agent → customer-reply-agent. Yesterday in n8n the Risk Agent was wired as a tool of the Reply Agent. Step 3 adds a third: customer-context-agent.",
    "stateId": "28:Subagents",
    "teach": {
      "time": "2 min",
      "gist": "Team lead hands out work: risk first, then the writer.",
      "script": [
        {
          "say": "Step 2: our agent gets a team. One team lead, two specialists."
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
    "subtitle": "One file per agent, in the folder .claude/agents/.",
    "cards": [
      {
        "title": ".claude/agents/risk-agent.md",
        "body": "One file = one specialist."
      },
      {
        "title": "Top: name and tools · below: the instructions",
        "body": "The top says who it is and what it may use. The text is its work instructions."
      },
      {
        "title": "Not .agents/ · not AGENTS.md",
        "body": "Those are other things. Only .claude/agents/ is read."
      }
    ],
    "keyPoints": [
      "Each agent is one file in .claude/agents/.",
      "The folder starts with a dot. Use ls -a to see it.",
      "main has no agents yet. They come in step-2."
    ],
    "notes": "Show the folder on step-2: git switch step-2, then ls -a and ls .claude/agents. main is Step 0, so it has no .claude/agents yet. Claude Code looks for project subagents in .claude/agents/, walking up from the working folder; the SDK reads the same folder with settingSources: ['user', 'project']. A .agents/ folder is not loaded as subagents by Claude Code or the SDK. AGENTS.md is the cross-tool note for coding agents, not a subagent definition. In the assignment the new agents live in 03-mcp/claude-project/.claude/agents/.",
    "stateId": "29:Where do the agents live?",
    "teach": {
      "time": "2 min",
      "gist": "One file per specialist in .claude/agents/.",
      "script": [
        {
          "say": "Where do the specialists live? Each one is one file, in the folder .claude/agents."
        },
        {
          "do": "Point at the middle card.",
          "say": "At the top: the name and which tools it may use. Below: its work instructions, just like CLAUDE.md."
        },
        {
          "do": "Point at the last card.",
          "say": "Careful: not .agents and not AGENTS.md. Only this folder is read."
        }
      ],
      "do": [
        "One file per agent.",
        "Top = who, text = instructions."
      ],
      "done": [
        "Everyone can find the folder."
      ],
      "watch": [
        "On main the folder does not exist yet: it comes with Step 2."
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
    "subtitle": "No extra code. Claude reads the folder, and the description decides who gets the task.",
    "cards": [
      {
        "title": "1 · Claude Code starts",
        "body": "It reads .claude/agents/ in your project and in ~/.claude/agents/."
      },
      {
        "title": "2 · It reads the description",
        "body": "Like a job ad: when should this agent be used? Write it clearly."
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
    "stateId": "30:Why this folder? Claude finds the agents.",
    "teach": {
      "time": "2 min",
      "gist": "Claude reads the folder; the description is the job ad.",
      "script": [
        {
          "say": "How does Claude know the specialists exist? You put the file in the folder. That's it."
        },
        {
          "do": "Point at card 2.",
          "say": "Then it reads the description. Think of a job ad: when should this agent get the work?"
        },
        {
          "ask": "What happens with a vague description like 'helps with things'?",
          "say": "(Answer: Claude may not pick it. You test that in Step 2.)"
        }
      ],
      "do": [
        "Folder → description → delegate."
      ],
      "done": [
        "Everyone knows the description decides."
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
    "subtitle": "Your one agent becomes a team. The team lead calls the risk expert first, then the writer.",
    "cards": [
      {
        "title": "What you build",
        "body": "Two specialist files and a team lead that calls them."
      },
      {
        "title": "Why",
        "body": "One job per agent. Each instruction stays short and clear."
      },
      {
        "title": "Done when",
        "body": "The trace shows risk first, then reply, and you tested a vague description."
      }
    ],
    "keyPoints": [
      "risk-agent analyzes and decides the priority.",
      "customer-reply-agent writes the reply draft.",
      "The orchestrator delegates in order and saves a file."
    ],
    "notes": "Explain Step 2. The final names are risk-agent and customer-reply-agent. The orchestrator delegates first to Agent → risk-agent, then Agent → customer-reply-agent. In n8n terms, Description maps to frontmatter description and System Message maps to the prompt body.",
    "stateId": "31:Step 2 · Risk analysis and customer reply agents",
    "teach": {
      "time": "2 min",
      "gist": "Step 2: team lead + two specialists. Done = right order + description test.",
      "script": [
        {
          "say": "Step 2: your agent becomes a team."
        },
        {
          "do": "Point at Done when.",
          "say": "You are done when you see the right order, risk first then reply, and you did the description test."
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
    "notes": "Run npm run lesson2 -- MSG-05 --dry-run, then run it live (Claude Code login, or --backend sdk with a key). The dry run prints the Claude Code equivalent and setup only; it does not call agents or produce a model result. Show the completed trace or docs/sample-trace.md, explicitly labelled as an illustrative sample. Point out [tool_use] Agent → risk-agent before [tool_use] Agent → customer-reply-agent, then the draft written for human review. The description test shows why n8n Description maps to the agent frontmatter description.",
    "stateId": "32:Demo · Step 2: trace the two agents",
    "tagline": "Risk first, then the writer. The draft waits for a person.",
    "teach": {
      "time": "5 min",
      "gist": "Demo on step-2: dry run, real run with the order of the agents, the draft.",
      "script": [
        {
          "do": "Before class: git switch step-2 in your own copy."
        },
        {
          "say": "I show it on the finished version. Just watch."
        },
        {
          "do": "Run the real run. Point at the two Agent lines.",
          "say": "See? First the risk expert, then the writer. The team lead hands out the work.",
          "clip": "assets/day4-teach/a16-msg05-orchestrator.mp4"
        },
        {
          "do": "Open the draft.",
          "say": "And this is the draft. It waits for a person: nothing is sent."
        }
      ],
      "do": [
        "Dry run, real run, open the draft."
      ],
      "done": [
        "Everyone saw the order risk → reply."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · Step 2",
    "kicker": "SOLO 2 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {},
    "subtitle": "Build the team from SOLO.md, Step 2. Run it, read the draft, then test a vague description.",
    "cards": [],
    "steps": [
      {
        "text": "Get the Step 2 files",
        "after": "Build 1 to 3 from SOLO.md, Step 2. Short on time? Use the shortcut below.",
        "prompt": "git checkout origin/step-2 -- .claude lib/agents.mjs 02-subagents package.json test/step2.test.mjs\nnpm run verify"
      },
      {
        "text": "Run the team on two messages",
        "prompt": "npm run lesson2 -- MSG-05\nnpm run lesson2 -- MSG-10",
        "after": "Look for: Agent → risk-agent, then Agent → customer-reply-agent. MSG-10 misses information: the team asks for it."
      },
      {
        "text": "Read the draft",
        "after": "Open 02-subagents/claude-project/output/MSG-05.md. Would you send this? A person decides."
      },
      {
        "text": "The description test",
        "after": "In .claude/agents/risk-agent.md, change the description to: Helps with things. Run MSG-05 again. Is the risk expert still called?",
        "warn": true
      },
      {
        "text": "Put it back",
        "prompt": "git checkout origin/step-2 -- .claude/agents/risk-agent.md",
        "after": "Stuck anywhere? git switch step-2 gives you the finished version."
      }
    ],
    "expected": "The trace shows risk first, then reply, you read the draft, and you tested the vague description.",
    "keyPoints": [
      "Do the dry run. Then read a live run or the sample trace."
    ],
    "notes": "20 minutes. Build from SOLO.md or use the shortcut (it copies all Step 2 files). No Agent → lines? Then the team lead did the work itself: run again and discuss why. The description test: with 'Helps with things.' the team lead may stop calling the risk expert. Same as yesterday in n8n with an empty Description.",
    "stateId": "33:Run the orchestrator and inspect the draft.",
    "teach": {
      "time": "20 min",
      "gist": "Step 2 hands-on: files, two runs, read the draft, description test, restore.",
      "script": [
        {
          "say": "Now you. Build the team from SOLO.md, or use the shortcut in step 1 if you are short on time."
        },
        {
          "do": "Point at step 2.",
          "say": "Run two messages. Look for the order: risk first, then the writer. MSG-10 is missing information: watch the team ask for it.",
          "clip": "assets/day4-teach/a17-1-msg10-missing.mp4"
        },
        {
          "do": "Point at step 4.",
          "say": "Then the description test. Make the job ad vague, and see if the team lead still calls the risk expert.",
          "clip": "assets/day4-teach/a17-2-description-test.mp4"
        },
        {
          "ask": "What do you expect?",
          "say": "(Answer: it may stop delegating. Just like yesterday in n8n with an empty Description.)"
        },
        {
          "do": "Start the 20-minute timer."
        }
      ],
      "do": [
        "Files, two runs, read the draft.",
        "Description test, then restore."
      ],
      "done": [
        "Order risk → reply seen.",
        "Draft read.",
        "Description test done and restored."
      ],
      "watch": [
        "No Agent → lines: the team lead did it itself. Run again.",
        "The description test does not always change the result. Point: nothing guarantees it any more."
      ]
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
        "body": "It only asks for the facts that are missing. It does not make things up."
      }
    ],
    "notes": "This is the labelled MSG-10 sample. In a live run, check each claim in the draft. If no tool gave the fact, the draft must not say it.",
    "stateId": "34:What you see · Step 2",
    "teach": {
      "time": "2 min",
      "gist": "Compare: two Agent lines, and a draft that asks for missing facts.",
      "script": [
        {
          "say": "Compare. Two Agent lines, in this order. And a draft that only asks for what is missing."
        },
        {
          "ask": "Does the draft say something no tool gave it?",
          "say": "(If yes: that is made up. The draft must not say it.)"
        }
      ],
      "do": [
        "Compare with the screenshot."
      ],
      "done": [
        "Everyone found both Agent lines."
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
    "subtitle": "Talk at your table first. Then click to see the answer.",
    "cards": [
      {
        "title": "Order",
        "body": "Which agent runs first? Why?"
      },
      {
        "title": "The job ad",
        "body": "Where is yesterday's n8n Description now?"
      }
    ],
    "keyPoints": [
      "risk-agent provides the priority and risk analysis.",
      "customer-reply-agent uses the original message and risk-agent result.",
      "A human reviews every draft before it goes to a customer."
    ],
    "notes": "Answers: the risk expert goes first, because the writer needs its risk note. The n8n Description is now the description line at the top of the agent file in .claude/agents/.",
    "stateId": "35:Discuss: which facts came from a tool?",
    "teach": {
      "time": "3 min",
      "gist": "Discussion: order (risk first) and where the Description lives now.",
      "script": [
        {
          "ask": "Which agent runs first, and why?",
          "say": "(Answer: risk. The writer needs to know how serious it is.)"
        },
        {
          "ask": "Where is yesterday's n8n Description now?",
          "say": "(Answer: the description line at the top of the agent file.)"
        }
      ],
      "do": [
        "Let tables talk, then click."
      ],
      "done": [
        "Both questions answered."
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
    "subtitle": "The agent asks the desk for facts. The desk owns the data, and only hands over what was asked. It cannot change anything.",
    "cards": [
      {
        "title": "customers · get_customer",
        "body": "Looks up a customer in the customer list."
      },
      {
        "title": "transactions · get_transaction",
        "body": "Looks up a payment in the transaction list."
      }
    ],
    "keyPoints": [
      "The MCP server owns the data. The agent only sees what the tool returns."
    ],
    "notes": "MCP = a standard way to give an agent a lookup desk. Two desks: customers (reads docs/customer_context.csv) and transactions (reads docs/transactions.xlsx). Read-only: they can look up, not change. Yesterday's Customer Context Agent with its Data Table becomes this desk.",
    "stateId": "36:MCP: external data",
    "teach": {
      "time": "3 min",
      "gist": "MCP = the lookup desk. Read-only: look up, never change.",
      "script": [
        {
          "say": "Step 3 adds outside data. Think of a lookup desk."
        },
        {
          "do": "Point at the two cards.",
          "say": "Two desks: one for customers, one for payments. The agent asks, the desk looks it up and hands over only that."
        },
        {
          "say": "And the desk can only look up. It cannot change anything."
        },
        {
          "ask": "Why would we want facts from a desk instead of from the AI itself?",
          "say": "(Answer: the AI would make it up. The desk has the real data.)"
        }
      ],
      "do": [
        "Explain the lookup desk.",
        "Read-only."
      ],
      "done": [
        "Everyone knows: MCP looks up, never changes."
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
    "subtitle": "Your team gets two lookup desks. They can look up, not change.",
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
        "body": "The trace shows both lookups, and you wrote down three more labels."
      }
    ],
    "keyPoints": [
      "The agents get facts from tools. They cannot change data yet."
    ],
    "notes": "Explain Step 3. The customer CSV is read by the customers MCP server and get_customer is assigned to customer-context-agent. transactions.xlsx is read by the transactions MCP server; get_transaction and list_transactions are read-only lookups assigned to risk-agent. Both servers use stdio and return external data. The reply remains a draft for human review before sending.",
    "stateId": "37:Step 3 · Read-only customer and transaction MCP tools",
    "teach": {
      "time": "2 min",
      "gist": "Step 3: two lookup desks. Done = both lookups in the trace + 3 labels.",
      "script": [
        {
          "say": "Step 3: your team gets the lookup desks."
        },
        {
          "do": "Point at Done when.",
          "say": "Done when you see both lookups, and you wrote down three more labels: MSG-07, 08 and 09. You need them in Step 4."
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
        "body": "In the draft: the External data section lists what each desk handed over."
      }
    ],
    "keyPoints": [
      "customer-context-agent calls get_customer.",
      "risk-agent uses get_transaction and list_transactions.",
      "Review the customer-reply-agent draft before sending."
    ],
    "notes": "Run (cd 03-mcp/transaction-mcp && npm ci), then npm run smoke:mcp; it verifies the servers without a model. Demo a live lesson3 customer and transaction lookup, point to both MCP tool traces and the External data: line. Keep the generated reply as a draft for human review. Do not treat dry-run output as model evidence.",
    "stateId": "38:Demo · Step 3: read-only customer and transaction lookups",
    "teach": {
      "time": "5 min",
      "gist": "Demo on step-3: smoke test, real run with both lookups, External data.",
      "script": [
        {
          "do": "Before class: git switch step-3 in your own copy."
        },
        {
          "do": "Run npm run smoke:mcp.",
          "say": "First I test the desks, without the AI. Last line: MCP servers OK.",
          "clip": "assets/day4-teach/a20-1-smoke-mcp.mp4"
        },
        {
          "do": "Run npm run lesson3 -- MSG-08. Point at the two lookup lines.",
          "say": "Now a real run. See? The agent asks the customer desk and the payment desk.",
          "clip": "assets/day4-teach/a20-2-msg08-mcp.mp4"
        },
        {
          "do": "Open the draft, find External data.",
          "say": "And here it says exactly which fact came from which desk."
        }
      ],
      "do": [
        "Smoke test, real run, External data."
      ],
      "done": [
        "Everyone saw both lookups."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · Step 3",
    "kicker": "SOLO 3 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {},
    "subtitle": "Get the desks, test them, then let your team look up real facts.",
    "cards": [],
    "steps": [
      {
        "text": "Get the Step 3 files",
        "prompt": "git checkout origin/step-3 -- 03-mcp .mcp.json .claude lib package.json test/step3.test.mjs\nnpm ci\n(cd 03-mcp/transaction-mcp && npm ci)",
        "after": "The last line installs the payment desk. You don't start the desks yourself."
      },
      {
        "text": "Test the desks",
        "prompt": "npm run smoke:mcp",
        "after": "Last line: MCP servers OK — read-only lookups; no model was called."
      },
      {
        "text": "Run three messages",
        "prompt": "npm run lesson3 -- MSG-08\nnpm run lesson3 -- MSG-07\nnpm run lesson3 -- MSG-09",
        "after": "Write down each label. You need them in Step 4."
      },
      {
        "text": "Find the lookups",
        "after": "In the trace: get_customer and get_transaction. In the draft: the External data section."
      },
      {
        "text": "Stuck?",
        "prompt": "git switch step-3",
        "after": "Gives you the finished version."
      }
    ],
    "expected": "Both lookups in the trace, External data in the draft, and three more labels written down.",
    "keyPoints": [
      "Smoke-test without a model.",
      "Trace get_customer, get_transaction, and list_transactions.",
      "A person reviews the draft before sending."
    ],
    "notes": "20 minutes. Expected labels, for you only: MSG-07 medium, MSG-08 high, MSG-09 medium (checked against the answer key). The desks are read-only. The draft still waits for a person.",
    "stateId": "39:Run Step 3 customer and transaction lookups.",
    "teach": {
      "time": "20 min",
      "gist": "Step 3 hands-on: files, smoke test, three runs with labels, find the lookups.",
      "script": [
        {
          "say": "Now you. First get the files and install the desks: all in step 1."
        },
        {
          "do": "Point at step 2.",
          "say": "Test the desks. Look for: MCP servers OK."
        },
        {
          "do": "Point at step 3.",
          "say": "Then three messages. Write down every label: you need them in Step 4.",
          "clip": "assets/day4-teach/a21-msg07-msg09.mp4"
        },
        {
          "do": "Start the 20-minute timer."
        }
      ],
      "do": [
        "Files, smoke test, three runs, labels."
      ],
      "done": [
        "Both lookups seen.",
        "Three labels written down."
      ],
      "watch": [
        "For you only: MSG-07 medium, 08 high, 09 medium.",
        "Error in the nested npm ci → they are not in the package folder."
      ]
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
    "subtitle": "After the desk test. Two things to look for.",
    "keyPoints": [
      "Read-only tools: list_transactions and get_transaction. No write tools yet.",
      "Last line: MCP servers OK. No model call."
    ],
    "cards": [
      {
        "title": "1 · Only lookup tools",
        "body": "list_transactions and get_transaction. No tools that change anything."
      },
      {
        "title": "2 · Last line",
        "body": "MCP servers OK. No model was called."
      }
    ],
    "notes": "smoke:mcp starts both MCP servers and calls each tool once. CUST-999 does not exist, so the tool says so. That is correct.",
    "stateId": "40:What you see · Step 3",
    "teach": {
      "time": "2 min",
      "gist": "Compare: only lookup tools, and MCP servers OK.",
      "script": [
        {
          "say": "Compare. Only lookup tools, nothing that changes data. And the last line: MCP servers OK."
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
    "subtitle": "Talk at your table first. Then click to see the answer.",
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
    "notes": "Answers: customer facts came from get_customer (customer list), payment facts from get_transaction (transaction list): see the External data section. A person reads every draft before it is sent.",
    "stateId": "41:Discuss: tools and external data.",
    "teach": {
      "time": "3 min",
      "gist": "Discussion: facts from the desks; a person reads every draft.",
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
        "Let tables talk, then click."
      ],
      "done": [
        "Both questions answered."
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
    "subtitle": "Code where it must be exact. The agent where it may think. A person at the end.",
    "columns": [
      {
        "title": "Fixed rules · code",
        "items": [
          "The Switch picks the tray",
          "npm run check marks the labels",
          "The barrier checks every change",
          "Same input, same answer"
        ]
      },
      {
        "title": "Thinking · the agent",
        "items": [
          "Reads what the customer means",
          "The team lead picks a specialist",
          "The writer writes the draft",
          "A person checks the result"
        ]
      }
    ],
    "keyPoints": [
      "Code where it must. The agent chooses where it may. Always a human at the end."
    ],
    "notes": "Fixed: the Switch (lib/switch.mjs) and npm run check: same input, always the same result. Thinking: the team lead decides which specialist to call. A person checks the result. Use fixed code for anything that must be exact or safe.",
    "stateId": "42:Fixed workflow vs. dynamic agent",
    "teach": {
      "time": "2 min",
      "gist": "Fixed code where it must be exact, the agent where it may think, a person at the end.",
      "script": [
        {
          "say": "Two kinds of work. Fixed rules: the Switch, the check. Same input, always the same answer."
        },
        {
          "say": "And thinking: the team lead deciding who gets the work. And at the end: a person."
        },
        {
          "ask": "Would you let the AI decide the route of a fraud message?",
          "say": "(Answer: no. The label yes, the route is fixed code.)"
        }
      ],
      "do": [
        "Fixed vs thinking."
      ],
      "done": [
        "Everyone can give one example of each."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · Step 4: mark your answers",
    "kicker": "SOLO 4 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {},
    "subtitle": "Remember npm run check from slide 9? Now you use it: your labels against the answer key.",
    "cards": [],
    "steps": [
      {
        "text": "Get the checker",
        "prompt": "git checkout origin/step-4 -- check.mjs answer-key.json labels.template.json package.json\nnpm run check",
        "after": "The first run makes an empty file: labels.json. That is not an error."
      },
      {
        "text": "Fill in your labels",
        "after": "Open labels.json. Write low, medium or high for MSG-01 to MSG-09, from your own runs. Save.",
        "warn": true
      },
      {
        "text": "Mark them",
        "prompt": "npm run check",
        "after": "Per message: correct or revise. Lesson 1 passes at 6/6, Lesson 3 at 9/9."
      },
      {
        "text": "Fill in the acceptance table",
        "after": "Copy the table from SOLO.md, Step 4: per message the label, the facts from the desks, and: did a person read the draft?"
      },
      {
        "text": "Save it",
        "after": "Save the table in participant-output/. Stuck? git switch step-4."
      }
    ],
    "expected": "npm run check shows your result, and the acceptance table is saved.",
    "keyPoints": [
      "A fixed check tells you if the agent is right. The model does not grade itself."
    ],
    "notes": "15 minutes. 'revise' means: reread the priority definitions and the trace. Do not change a label just to pass. MSG-10 is not graded. Expected, for you only: 01 low, 02 high, 03 medium, 04 low, 05 high, 06 low, 07 medium, 08 high, 09 medium.",
    "stateId": "43:Step 4 · Acceptance table and npm run check",
    "teach": {
      "time": "15 min",
      "gist": "Step 4: get the checker, fill labels.json, npm run check, acceptance table.",
      "script": [
        {
          "say": "Remember the button from slide 9? Now you press it. Your labels against the answer key."
        },
        {
          "do": "Point at step 1.",
          "say": "The first run makes an empty file. That is not an error."
        },
        {
          "do": "Point at steps 2 and 3.",
          "say": "Fill in your labels from your own runs, and press check again.",
          "clip": "assets/day4-teach/a24-npm-check.mp4"
        },
        {
          "ask": "You get 'revise'. Do you just change the label?",
          "say": "(Answer: no. Reread the definitions and the trace. Changing it just to pass is cheating yourself.)"
        },
        {
          "do": "Start the 15-minute timer."
        }
      ],
      "do": [
        "Checker, labels, check, table."
      ],
      "done": [
        "npm run check run with their own labels.",
        "Table saved."
      ],
      "watch": [
        "For you only: 01 low, 02 high, 03 medium, 04 low, 05 high, 06 low, 07 medium, 08 high, 09 medium."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Check: does your screen look like this?",
    "kicker": "What you see · Step 4",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-step4.png",
      "imageLink": "Terminal: the first npm run check creates labels.json"
    },
    "subtitle": "The first run of npm run check. Two things to know.",
    "keyPoints": [
      "First run: Created labels.json. This is not an error.",
      "Next: Write low, medium or high for each message. Run npm run check again."
    ],
    "cards": [
      {
        "title": "1 · First run",
        "body": "Created labels.json. That is not an error."
      },
      {
        "title": "2 · Then",
        "body": "Fill in low, medium or high per message. Run npm run check again."
      }
    ],
    "notes": "The first run exits with code 1 because labels.json is empty. After the participants fill in the labels, npm run check compares their labels with the expected priority.",
    "stateId": "44:What you see · Step 4",
    "teach": {
      "time": "1 min",
      "gist": "First run makes labels.json: not an error.",
      "script": [
        {
          "say": "The first run says: created labels.json. That is correct. Fill it in, run again."
        }
      ],
      "do": [
        "Compare."
      ],
      "done": [
        "Nobody thinks it is broken."
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
    "subtitle": "Back at 15:00. Fell behind? Switch now: git switch step-4.",
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
    "title": "The assignment: let the agent change data, safely",
    "kicker": "Explain · Assignment",
    "type": "concept",
    "visual": {
      "bot": "multiarm",
      "place": "beside"
    },
    "subtitle": "Until now the agents could only look up. Now one agent may change data, with a barrier before every change. Do the core first.",
    "cards": [
      {
        "title": "Core · 35 min",
        "body": "Tools that change a test copy of the data, and a barrier (hook) before every change."
      },
      {
        "title": "Stretch · optional",
        "body": "A draft tool, a fraud check, and a question to a person."
      }
    ],
    "keyPoints": [
      "Core: Part 1 and Part 2.",
      "Stretch: Part 3 and Part 4.",
      "Step 3 stays read-only. Writes go to a working copy."
    ],
    "notes": "The room target is the core (Parts 1 and 2). Fast squads do the stretch; the rest can do it at home. npm run check:assignment shows core and stretch separately, without the AI. The changes go to a working copy (participant-output/transactions.working.json), never to the real workbook.",
    "stateId": "46:Assignment · Extend the MCP",
    "teach": {
      "time": "3 min",
      "gist": "The assignment: one agent may change data, with a barrier. Core first.",
      "script": [
        {
          "say": "Until now the agents could only look up. Now one agent may change data. But never without a barrier."
        },
        {
          "do": "Point at Core.",
          "say": "Everyone does the core: tools that change a test copy, and a barrier before every change."
        },
        {
          "do": "Point at Stretch.",
          "say": "Fast? Do the stretch. Otherwise at home."
        }
      ],
      "do": [
        "Explain core vs stretch."
      ],
      "done": [
        "Everyone knows the target is the core."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "The barrier: a rule or a person decides",
    "kicker": "Concept · Control",
    "type": "concept",
    "layout": "compare",
    "visual": {},
    "subtitle": "Before a tool changes data, the hook checks. Small change: go. Big change: a person must say yes.",
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
    "notes": "A hook is code that runs at a fixed moment: before a tool (PreToolUse) or after (PostToolUse). In the assignment the before-hook allows reads, lets small updates through, and asks a person for large updates, adds and deletes. The after-hook writes a line to the audit log. It works in both Claude Code (.claude/settings.json) and the SDK.",
    "stateId": "47:Control: hooks and approval",
    "teach": {
      "time": "3 min",
      "gist": "Hook = the barrier: small goes, big asks a person.",
      "script": [
        {
          "say": "Remember the barrier from slide 9? This is it. Before a tool changes data, the hook checks."
        },
        {
          "say": "A small change: through. A big change: a person must say yes first. And afterwards everything is written down in a log."
        },
        {
          "ask": "Why can't the AI drive around this barrier?",
          "say": "(Answer: it is code, not an instruction. The AI cannot skip it.)"
        }
      ],
      "do": [
        "Explain the barrier."
      ],
      "done": [
        "Everyone knows: small goes, big asks."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Not every agent gets every key",
    "kicker": "Explain · Permissions",
    "type": "concept",
    "subtitle": "A tool is a key, not permission to decide. A person still decides.",
    "cards": [
      {
        "title": "Only the keys it needs",
        "body": "Each agent gets only the tools for its own job."
      },
      {
        "title": "Check before, not after",
        "body": "The barrier stands before the change. Afterwards you cannot undo it."
      },
      {
        "title": "A person reads the draft",
        "body": "Having a tool does not mean: allowed to refund or send."
      }
    ],
    "keyPoints": [
      "Each agent gets only the tools it needs.",
      "A requested tool call is not an executed action.",
      "Read-only context does not authorize a customer action.",
      "A person reviews every draft."
    ],
    "notes": "Inspect the configured tools before the run. The current core package reads customer and transaction context; it does not grant permission to change a payment or send a reply. Ask the participant to identify the requested tool, its permitted scope and the human review decision. Keep the removed Anatomy illustration out of this route. The bounded-loop diagram earlier in the deck distinguishes pre-execution permission checks from post-tool checks.",
    "stateId": "48:Not every agent has every tool",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "teach": {
      "time": "2 min",
      "gist": "Only the keys it needs; check before, not after; a person decides.",
      "script": [
        {
          "do": "Point at the three cards.",
          "say": "Three rules. Only the keys it needs. The barrier before the change, not after. And a key is not permission: a person still decides."
        }
      ],
      "do": [
        "Three rules."
      ],
      "done": [
        "Everyone can name them."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Quiz: who may change a payment?",
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
    "subtitle": "Which agent may use update_transaction? Vote first.",
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
    "stateId": "49:Quiz: who may change a transaction?",
    "teach": {
      "time": "2 min",
      "gist": "Quiz: only transaction-agent has the write tools.",
      "script": [
        {
          "say": "Vote first. Which agent may change a payment?"
        },
        {
          "ask": "A, B, C or D?",
          "say": "(Answer: B, transaction-agent. Only it has the write tools. The team lead must hand it over.)"
        }
      ],
      "do": [
        "Vote, then reveal."
      ],
      "done": [
        "Everyone knows: one agent writes."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "When does the barrier ask?",
    "kicker": "Explain · Hook triggers",
    "type": "concept",
    "visual": {
      "stamps": [
        "ALLOW",
        "ASK",
        "DENY"
      ],
      "bot": "head",
      "place": "stamps"
    },
    "subtitle": "Three possible answers.",
    "cards": [
      {
        "title": "ALLOW",
        "body": "A lookup, a draft, or a change under 100."
      },
      {
        "title": "ASK",
        "body": "A change of 100 or more, adding, or deleting: a person must say yes."
      },
      {
        "title": "DENY",
        "body": "A fraud hold, or the person says no. The agent stops."
      }
    ],
    "keyPoints": [
      "Reads, drafts and small updates do not ask.",
      "Large updates, adds and deletes ask a person.",
      "No person to ask means deny."
    ],
    "notes": "Read the cards one by one. The threshold is one constant: AUTO_APPROVE_TRANSACTION_AMOUNT = 100 in 03-mcp/hooks/transaction-guard.mjs. In interactive claude the hook returns ask and Claude Code shows the prompt. When fraud-check-agent says medium, or a fact is missing, the orchestrator asks the person with AskUserQuestion. Under claude -p, or in the SDK without a terminal, no person can answer: the write is denied. A denied write is final: the agent reports it and stops.",
    "stateId": "50:When does the hook ask?",
    "teach": {
      "time": "2 min",
      "gist": "Allow, ask, deny.",
      "script": [
        {
          "do": "Point at the three stamps.",
          "say": "Allow: small things go through. Ask: big things, a person says yes. Deny: fraud, or the person says no: the agent stops."
        },
        {
          "ask": "A change of 250 euros. Which stamp?",
          "say": "(Answer: ASK.)"
        }
      ],
      "do": [
        "Three answers."
      ],
      "done": [
        "Everyone can place an example."
      ],
      "watch": [
        "The limit of 100 is one setting in 03-mcp/hooks/transaction-guard.mjs."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Demo · the assignment: one change, three outcomes",
    "kicker": "Demo · Assignment · I show it",
    "type": "concept",
    "visual": {},
    "subtitle": "Watch first. Then you build it.",
    "cards": [
      {
        "title": "1 · What is still missing?",
        "body": "npm run check:assignment\nA list: per line one file and one change."
      },
      {
        "title": "2 · A small change",
        "body": "npm run hook:demo -- small\nLook for: Decision allow."
      },
      {
        "title": "3 · A big change",
        "body": "npm run hook:demo -- large\nLook for: Decision ask."
      }
    ],
    "keyPoints": [
      "npm run check:assignment lists the core items on step-4.",
      "MSG-07 shows ask, allow and deny.",
      "MSG-08 and MSG-09 show hold and ask."
    ],
    "notes": "Run check:assignment on step-4 and read the hints. Then switch to the solution branch and show hook:demo small (allow) and large (ask). These run without the AI. Optional: npm run resolve -- MSG-07 on solution and answer y or N. Afterwards npm run reset:mcp resets the working copy.",
    "stateId": "51:Demo · Assignment: one write, three outcomes",
    "teach": {
      "time": "5 min",
      "gist": "Demo: check:assignment hints, hook small = allow, large = ask.",
      "script": [
        {
          "do": "On step-4: npm run check:assignment.",
          "say": "This tells you what is still missing. Every line: one file, one change."
        },
        {
          "do": "On solution: npm run hook:demo -- small, then -- large.",
          "say": "Small change: allow. Big change: ask. That is the barrier."
        }
      ],
      "do": [
        "Three commands."
      ],
      "done": [
        "Everyone saw allow and ask."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "The core: four files, four jobs",
    "kicker": "Explain · Where and why",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "left"
    },
    "subtitle": "Each file has one job.",
    "cards": [
      {
        "title": "transaction-mcp/server.js",
        "body": "Add the tools that change data. They change a test copy, not the real list."
      },
      {
        "title": ".claude/agents/transaction-agent.md",
        "body": "The only agent that may change data. Give it get, update and add."
      },
      {
        "title": "CLAUDE.md",
        "body": "Who changes data, and when to stop. The team lead must hand it over."
      },
      {
        "title": "hooks/transaction-guard.mjs",
        "body": "The barrier. Code decides every change."
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
    "stateId": "52:Where you change what · core",
    "teach": {
      "time": "3 min",
      "gist": "Four files: tools, the one writing agent, the rules, the barrier.",
      "script": [
        {
          "do": "Point at the four cards.",
          "say": "Four files. The tools. The one agent that may write. The rules in CLAUDE.md. And the barrier."
        }
      ],
      "do": [
        "Four files."
      ],
      "done": [
        "Everyone knows where to start."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Check: red at the start is correct",
    "kicker": "What you see · Assignment",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/see-asg-start.png",
      "imageLink": "Terminal: check:assignment on step-4 lists the core items to fix"
    },
    "subtitle": "Your first npm run check:assignment. Lots of red: that is the to-do list.",
    "keyPoints": [
      "Core · Parts 1–2: 14 to fix. Each line names one file and one change.",
      "Stretch · Parts 3–4: 20 open. These are optional. Do the core first."
    ],
    "cards": [
      {
        "title": "Core · 14 to fix",
        "body": "Each line names one file and one change."
      },
      {
        "title": "Stretch · 20 open",
        "body": "Optional. Core first."
      }
    ],
    "notes": "Show this before the participants start. Red at the start is correct. They fix one line at a time and run the check again.",
    "stateId": "53:What you see · Assignment start",
    "teach": {
      "time": "1 min",
      "gist": "Red at the start = the to-do list.",
      "script": [
        {
          "say": "Lots of red. Good: that is your to-do list. Fix one line, run again."
        }
      ],
      "do": [
        "Show it before they start."
      ],
      "done": [
        "Nobody panics at red."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Goal: this is what done looks like",
    "kicker": "What good looks like · core",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-4/10-good-offline.png",
      "imageLink": "Terminal: check:assignment passes the core, the small update is allowed, the large update asks"
    },
    "subtitle": "When the core is done, your screen shows this.",
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
    "stateId": "54:What good looks like: core",
    "teach": {
      "time": "1 min",
      "gist": "Done = core passed, small allow, large ask.",
      "script": [
        {
          "say": "This is your goal. Core passed. Small change: allow. Big change: ask."
        }
      ],
      "do": [
        "Show the goal."
      ],
      "done": [
        "Everyone knows the end picture."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · the assignment: core",
    "kicker": "SOLO 6 · Core",
    "type": "practice",
    "layout": "exercise",
    "timer": 35,
    "visual": {},
    "subtitle": "Work on step-4. Fix one line of the to-do list at a time.",
    "cards": [],
    "steps": [
      {
        "text": "Start on step-4 and see the to-do list",
        "prompt": "git switch step-4\nnpm run check:assignment",
        "after": "Each red line names one file and one change."
      },
      {
        "text": "The tools that change data",
        "after": "In 03-mcp/transaction-mcp/server.js. They change a test copy, not the real list."
      },
      {
        "text": "The one agent that writes",
        "after": "Make .claude/agents/transaction-agent.md. Give it get, update and add. Add the write rules to CLAUDE.md."
      },
      {
        "text": "The barrier",
        "after": "Write 03-mcp/hooks/transaction-guard.mjs: small goes, big asks a person.",
        "warn": true
      },
      {
        "text": "Check",
        "prompt": "npm run check:assignment\nnpm run hook:demo -- small\nnpm run hook:demo -- large",
        "after": "Look for: Core passed, Decision allow, Decision ask."
      }
    ],
    "expected": "check:assignment says Core passed, and a big change asks a person.",
    "keyPoints": [
      "Core first: Part 1 and Part 2.",
      "Only transaction-agent writes.",
      "A denied write is final."
    ],
    "notes": "35 to 45 minutes. check:assignment runs without the AI and says what is missing. The solution branch has the reference answer. After live runs: npm run reset:mcp resets the working copy.",
    "stateId": "55:Assignment core: write tools and a hook.",
    "teach": {
      "time": "35 min",
      "gist": "Core: tools, writing agent, rules, barrier; check:assignment until Core passed.",
      "script": [
        {
          "say": "Now you. Start on step-4 and look at the to-do list. Fix one line, run again."
        },
        {
          "do": "Point at step 4.",
          "say": "The barrier is the most important part: small goes, big asks a person."
        },
        {
          "do": "Start the 35-minute timer."
        }
      ],
      "do": [
        "Fix the to-do list one line at a time."
      ],
      "done": [
        "Core passed.",
        "Small allow, large ask."
      ],
      "watch": [
        "Stuck: read the hint, it names the file.",
        "Reference answer: git switch solution."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Stretch: three tickets, three safe stops",
    "kicker": "What good looks like · stretch",
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
    "title": "The stretch: three more files",
    "kicker": "Explain · Where and why",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "left"
    },
    "subtitle": "Only after the core passes.",
    "cards": [
      {
        "title": "transaction-mcp/drafts-server.js",
        "body": "save_reply_draft: the writer saves a draft. A person reads it."
      },
      {
        "title": ".claude/agents/fraud-check-agent.md",
        "body": "Looks up before every change. A fraud hold stops it."
      },
      {
        "title": "resolve.mjs",
        "body": "The fixed order, and a question to a person."
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
    "title": "Your turn · the assignment: stretch",
    "kicker": "SOLO 6 · Stretch",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "subtitle": "Only when the core passes. Otherwise: at home.",
    "cards": [],
    "steps": [
      {
        "text": "The draft tool and the fraud check",
        "after": "Add save_reply_draft and fraud-check-agent."
      },
      {
        "text": "Each agent only its own keys",
        "after": "Check the tools list of every agent."
      },
      {
        "text": "The question to a person",
        "after": "Add AskUserQuestion and npm run resolve."
      },
      {
        "text": "Test it",
        "prompt": "npm run resolve -- MSG-07",
        "after": "Answer N: the barrier says no and the agent stops."
      }
    ],
    "expected": "check:assignment passes, and a 'no' stops the run.",
    "keyPoints": [
      "Stretch only after the core passes.",
      "Each agent gets only its tools.",
      "A denied write stops the run."
    ],
    "visual": {},
    "notes": "Optional. Check before class that resolve works on your branch: on solution the npm run resolve script exists; on step-4 the participants add it.",
    "stateId": "58:Assignment stretch: drafts, fraud check, a question."
  },
  {
    "lessonId": "workshop-4",
    "title": "Discuss: who may change data, and when?",
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
    "subtitle": "Talk at your table first. Then click to see the answer.",
    "cards": [
      {
        "title": "Tools",
        "body": "Which agent needs tools that change data?"
      },
      {
        "title": "Limit",
        "body": "From which amount must a person say yes?"
      },
      {
        "title": "Where",
        "body": "CLAUDE.md, the tools list, or the barrier?"
      }
    ],
    "keyPoints": [
      "Which agent needs write tools?",
      "Which writes need a person?",
      "Where do you put the rule?"
    ],
    "notes": "Answers: only transaction-agent. From 100. A rule in CLAUDE.md is advice to the AI; the tools list and the barrier are code, the AI cannot get around them. In n8n the Wait and IF nodes did this.",
    "stateId": "59:Discuss: who can change data, and when?",
    "teach": {
      "time": "4 min",
      "gist": "Discussion: one writing agent, limit 100, code beats advice.",
      "script": [
        {
          "ask": "Which agent needs write tools?",
          "say": "(Answer: only transaction-agent.)"
        },
        {
          "ask": "From which amount must a person say yes?",
          "say": "(Answer: 100.)"
        },
        {
          "ask": "CLAUDE.md, tools list or barrier: which is strongest?",
          "say": "(Answer: the tools list and the barrier: they are code. CLAUDE.md is advice.)"
        }
      ],
      "do": [
        "Let tables talk, then click."
      ],
      "done": [
        "All three answered."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Homework · Step 5: build your own agent",
    "kicker": "Explain · Step 5 · homework",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "A small agent from zero: it finds and fixes a bug.",
    "cards": [
      {
        "title": "What you build",
        "body": "An agent that finds and fixes a bug in utils.js."
      },
      {
        "title": "Why",
        "body": "You write the loop yourself: the question, the tools, the result."
      },
      {
        "title": "Done when",
        "body": "You can show the question, the tools and the result."
      }
    ],
    "keyPoints": [
      "Homework, or after 15:50 if you have time. Build a small agent from zero."
    ],
    "notes": "Explain the final Step 5 in the step-4 branch. The starter is 05-build-your-own/agent.mjs. Participants identify the prompt, allowed tools, and result handling.",
    "stateId": "60:Step 5 · Build your own agent",
    "teach": {
      "time": "2 min",
      "gist": "Homework: build your own small agent.",
      "script": [
        {
          "say": "Homework: build your own small agent. It finds a bug and fixes it. Everything you learned today, in one small file."
        }
      ],
      "do": [
        "Explain the homework."
      ],
      "done": [
        "Everyone knows what to do at home."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Demo · Step 5: I show the starter",
    "kicker": "Demo · Step 5 · I show it",
    "type": "concept",
    "visual": {},
    "subtitle": "Watch first. At home you do the same.",
    "cards": [
      {
        "title": "1 · Dress rehearsal",
        "body": "cd 05-build-your-own\nnode agent.mjs --dry-run"
      },
      {
        "title": "2 · The same in Claude Code",
        "body": "claude -p \"Find and fix the bug in utils.js.\" --allowedTools Read,Edit,Glob"
      }
    ],
    "keyPoints": [
      "The dry run makes no model call.",
      "The CLI command uses Read, Edit, and Glob.",
      "The permission mode accepts edits within that scope."
    ],
    "notes": "Run the exact Step 5 demo commands from SOLO.md. Point out that the dry run is not model evidence and then show the Claude Code equivalent command.",
    "stateId": "61:Demo · Step 5: run the starter",
    "teach": {
      "time": "3 min",
      "gist": "Demo: the starter dry run and the Claude Code command.",
      "script": [
        {
          "do": "cd 05-build-your-own, then node agent.mjs --dry-run.",
          "say": "The dress rehearsal of your own agent."
        },
        {
          "do": "Show the claude -p command.",
          "say": "And the same in Claude Code: the question, and the three tools it may use.",
          "clip": "assets/day4-teach/a25-build-your-own.mp4"
        }
      ],
      "do": [
        "Dry run, Claude Code command."
      ],
      "done": [
        "Everyone saw the starter."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · Step 5 (at home)",
    "kicker": "SOLO 5 · Homework",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {
      "bot": "wave",
      "place": "beside"
    },
    "subtitle": "Run the starter. Then find the question, the tools and the result.",
    "cards": [],
    "steps": [
      {
        "text": "Go to the starter",
        "prompt": "git switch step-4\ncd 05-build-your-own",
        "after": "Read README.md in this folder."
      },
      {
        "text": "Dress rehearsal",
        "prompt": "node agent.mjs --dry-run",
        "after": "You see what the agent would get."
      },
      {
        "text": "Find three things",
        "after": "The question (prompt), the tools, and where the result comes back."
      }
    ],
    "expected": "You can show the question, the tools and the result.",
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
    "title": "Check: does your screen look like this?",
    "kicker": "What you see · Step 5",
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
        "title": "1 · The Claude Code command",
        "body": "The question, the tools it may use, and the permission mode."
      },
      {
        "title": "2 · Your change",
        "body": "Change the question or the tools. Run the dry run again and compare."
      }
    ],
    "notes": "The starter has three tools: Read, Edit and Glob. acceptEdits lets the agent edit files without a question. Use it only in a test folder.",
    "stateId": "63:What you see · Step 5"
  },
  {
    "lessonId": "workshop-4",
    "title": "Extra: skills, a recipe for Claude",
    "kicker": "Concept · optional",
    "type": "concept",
    "visual": {
      "tree": 0,
      "bot": "head",
      "place": "beside"
    },
    "subtitle": "Optional, not in today's exercise. A skill is a recipe: Claude uses it when it fits.",
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
    "stateId": "64:Skills",
    "teach": {
      "time": "2 min",
      "gist": "Skills = a recipe Claude picks when it fits. Not in today's exercise.",
      "script": [
        {
          "say": "One extra. A skill is a recipe in a folder. Claude reads the description and uses it when it fits. Just like the agent's job ad."
        },
        {
          "say": "Not in today's exercise: just so you know it exists."
        }
      ],
      "do": [
        "Mention it."
      ],
      "done": [
        "Everyone knows skills exist."
      ],
      "watch": [
        "Not in the package: concept only."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Close: a person stays in charge",
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
    "notes": "Recap round: everyone shows one result in one minute (a trace, a draft, the check output, or the chat). Go back to the goals on the board from slide 2. Ask: what was easier in n8n, what in code? Where must a person still decide? Extra for fast people: chat in, chat out: npm run chat -- --lesson 3.",
    "stateId": "65:Close: keep a human in the loop.",
    "subtitle": "One agent, a team, lookup desks and a barrier. And at the end: always a person.",
    "cards": [
      {
        "title": "You built",
        "body": "An agent team in code, with lookup desks and a barrier."
      },
      {
        "title": "Back to your goal",
        "body": "Look at the goal you wrote down this morning. Did you get there?"
      },
      {
        "title": "Next time",
        "body": "Workshop 5 builds on this agent loop."
      }
    ],
    "teach": {
      "time": "10 min",
      "gist": "Close: one result each, back to this morning's goals, bridge to Workshop 5.",
      "script": [
        {
          "say": "We started this morning with a sorting machine in n8n blocks. Now you have a team of agents in code. And at the end: always a person."
        },
        {
          "do": "Point at the goals on the board.",
          "say": "Look at the goal you wrote down this morning. Who got there?"
        },
        {
          "ask": "What was easier in n8n, and what in code?",
          "say": "(Listen. Typical: n8n easier to see, code easier to test and limit.)"
        },
        {
          "say": "Thank you. Next time we build on this."
        }
      ],
      "do": [
        "One result each, back to the goals."
      ],
      "done": [
        "Everyone showed one result."
      ],
      "watch": []
    }
  }
];
