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
    "subtitle": "Last session you built the flow in n8n. Today you build the same flow in code.",
    "notes": "Keep this slide on screen while people arrive. Today we build last session's n8n support flow again, this time in code with the Claude Agent SDK. We start from a fresh workshop package with new customer messages. We do not import the n8n flow. If someone's Day 3 flow did not work, that is no problem: they can use the example results in the package.",
    "stateId": "0:Welcome to Workshop 4 · From n8n to Claude Agents SDK",
    "teach": {
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
    "notes": "Time: 6 minutes, three rounds of 2 minutes. Write the answers on the board. In round 2, connect each problem to today. Hard to test: npm run check. Every agent could do everything: a tool list per agent. No stop before a change: a hook. In round 3, keep the goals on the board and come back to them at the close.",
    "teach": {
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
    "stateId": "4:Yesterday’s flow · 1. Ticket in, Switch out",
    "teach": {
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
      "image": "assets/day3-maarten-n8n/03-chat-memory.jpeg",
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
    "stateId": "5:Yesterday’s flow · 2. Chat and an AI Agent",
    "teach": {
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
    "stateId": "6:Yesterday’s flow · 3. Structured output",
    "tagline": "An AI likes to talk, but a machine cannot do anything with a story. So we ask the AI to fill in a form.",
    "teach": {
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
    "stateId": "7:Optional yesterday, explained today: specialist agents",
    "teach": {
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
    "subtitle": "By 16:00 you will have built your own agent team, and you will be able to explain how it works.",
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
    "notes": "Say the goal in one sentence: at 16:00 you will have an agent team that you built yourself, and you can explain it. Come back to this at the close, together with the goals that people wrote down this morning.",
    "stateId": "9:Goal of today",
    "teach": {
      "time": "1 min",
      "gist": "At 16:00 you will have built it yourself, be able to explain who may do what, and know when a person says yes.",
      "script": [
        {
          "say": "At four o'clock you will have an agent team that you built yourself, and that you can explain."
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
    "subtitle": "The rhythm of the day: I show you, you do it, and we check it together.",
    "cards": [
      {
        "title": "10:00 · Start",
        "body": "Welcome and recap\nFrom n8n to code\nStep 0: get the package\n☕ Break 11:00–11:15"
      },
      {
        "title": "11:15 · Step 1",
        "body": "One agent\nThe form and memory\n🍽 Lunch 12:00–13:00"
      },
      {
        "title": "13:00 · Steps 2–4",
        "body": "Step 2: two specialists\nStep 3: lookup desks (MCP)\nStep 4: check your answers\n☕ Break 14:45–15:00"
      },
      {
        "title": "15:00 · Assignment",
        "body": "Let one agent change data, safely\nWrap-up 15:50–16:00"
      }
    ],
    "keyPoints": [
      "Rhythm: I show it, you do it, we check it"
    ],
    "notes": "Name the breaks out loud. Has someone fallen behind? Each step has a finished version that they can switch to (step-1 … step-4). Step 5, build your own agent, is optional: it is for at home. The workshop package: https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent (public, so every participant can download it).",
    "stateId": "8:Today · agenda",
    "teach": {
      "time": "1 min",
      "gist": "The day in four blocks. The rhythm: I show it, you do it, we check it.",
      "script": [
        {
          "do": "Point at the four blocks, left to right.",
          "say": "This is our day, in four blocks: the start, step 1, then steps 2 to 4, and at the end your own assignment."
        },
        {
          "say": "The rhythm all day is the same. First I show it, then you do it, and then we check together whether your screen shows the same."
        },
        {
          "say": "Have you fallen behind? No problem. Every step has a finished version that you can jump to."
        },
        {
          "do": "Name the breaks: 11:00, lunch at 12:00, and 14:45."
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
    "title": "Finished early? The fast lane",
    "kicker": "All day · Fast lane",
    "type": "concept",
    "subtitle": "Done before the timer ends? Pick one of these. You can come back to them at any point today.",
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
    "notes": "For fast finishers, all day. 1 shows that the AI's label can differ between runs (the Switch does not). 2 shows why a single limit is not enough. 3 is the audit-trail pattern a payment company needs.",
    "teach": {
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
    "title": "Why move the flow to code?",
    "kicker": "Context · why code",
    "type": "context",
    "visual": {},
    "subtitle": "n8n is great for drawing a flow. Code lets you test it, limit it and control it.",
    "cards": [
      {
        "title": "Test it",
        "body": "You label each message low, medium or high. npm run check marks each label: correct or revise."
      },
      {
        "title": "What is npm run check?",
        "body": "npm is the remote control of a code project. check is one of the buttons built into the package."
      },
      {
        "title": "Limit it",
        "body": "Each agent gets its own key ring, with only the tools it needs."
      },
      {
        "title": "Control it",
        "body": "A hook is a barrier: before anything changes, the code checks first."
      }
    ],
    "keyPoints": [
      "npm = the remote control of a code project",
      "npm run check = press the 'check' button",
      "Check: your labels against the answer key",
      "Limit: key ring · Control: barrier"
    ],
    "notes": "These are the three problems from the recap this morning: hard to test, every agent could do everything, and no stop before a change. npm run check compares the labels you wrote down (low, medium or high for each message) with a hidden answer key, and says for each message: correct or revise. A hook is a piece of code that runs before a change and can say no. npm comes with Node.js. The buttons are listed under 'scripts' in package.json, and they only work inside the package folder.",
    "stateId": "10:Why move the flow to code?",
    "teach": {
      "time": "2 min",
      "gist": "There are three reasons for code: test with one command, limit with a key ring per agent, and control with a barrier.",
      "script": [
        {
          "say": "Why leave n8n? n8n is great for drawing. But remember the three problems from this morning."
        },
        {
          "do": "Point at Test it.",
          "say": "One: testing. In code you type one command, npm run check, and it marks all your answers against the answer key, like a teacher with the answer sheet."
        },
        {
          "do": "Point at the card 'Where does npm run check come from?'.",
          "say": "What is npm? It comes with Node.js, and it is the remote control of a code project. Someone built buttons into this package: check, doctor and verify. npm run check means: press the button called check."
        },
        {
          "say": "Be careful: the buttons only work in the project they were built for. It is like a remote control, which only works with its own TV. In another project, check may not exist, or it may do something else."
        },
        {
          "do": "Point at Limit it.",
          "say": "Two: limiting. Each agent gets its own key ring. A new colleague does not get the key to the vault on day one either."
        },
        {
          "do": "Point at Control it.",
          "say": "Three: control. A hook is a barrier. Before anything changes, the code checks first. And the AI cannot drive around it."
        },
        {
          "ask": "Which of last session's problems does the barrier solve?",
          "say": "(Answer: there was no stop before a change.)"
        }
      ],
      "do": [
        "Name the three reasons.",
        "Link them to the problems from this morning."
      ],
      "done": [
        "Everyone can name test, limit and control."
      ],
      "watch": [
        "Does someone type npm run check outside the package folder? Then npm cannot find the buttons. Tell them to cd into the package folder first.",
        "The answer key is encrypted: nobody can peek, so everybody has to think."
      ]
    },
    "tagline": "These buttons only work inside the workshop package folder."
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
    "stateId": "11:n8n ↔ Agent SDK at a glance",
    "teach": {
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
    "stateId": "12:One agent loop. Bounded actions.",
    "teach": {
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
    "stateId": "13:Two ways to run the same agent",
    "teach": {
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
    "subtitle": "Six words that come back all day. The timer on a slide always counts down.",
    "visual": {},
    "cards": [
      {
        "title": "Terminal",
        "body": "The window where you type commands. Windows: PowerShell. Mac: Terminal."
      },
      {
        "title": "Editor",
        "body": "The program where you open and change files, for example VS Code."
      },
      {
        "title": "cd",
        "body": "“Go to this folder.” Every command works in the folder you are in."
      },
      {
        "title": "Branch",
        "body": "A saved version of the package. step-1 to step-4 are the finished versions of each step. You only need them if you fall behind."
      },
      {
        "title": "git stash -u",
        "body": "Puts your own changes safely aside before you switch to a finished version. They are not lost. Only needed if you fall behind."
      },
      {
        "title": "npm run …",
        "body": "Presses a button built into the package, such as check or verify."
      }
    ],
    "notes": "Go through the six words quickly. They return all day. git stash -u is needed before every git switch: without it git refuses to switch when you have changed files.",
    "teach": {
      "time": "3 min",
      "gist": "Six words for the day: terminal, editor, cd, branch, git stash -u, npm run.",
      "script": [
        {
          "say": "Before we start, six words that come back all day."
        },
        {
          "do": "Point at the cards one by one.",
          "say": "The terminal is where you type commands. The editor is where you change files. cd means: go to this folder. A branch is a saved version; step-1 to step-4 are the finished versions."
        },
        {
          "say": "git stash -u puts your own changes safely aside before you switch to another branch. You do not lose them. Branch and git stash are your safety net: you only need them if you fall behind and want to catch up. And npm run presses a button in the package."
        },
        {
          "ask": "Which command do you use before switching to another branch?",
          "say": "(Answer: git stash -u.)"
        }
      ],
      "do": [
        "Explain the six words."
      ],
      "done": [
        "Everyone knows the six words."
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
    "notes": "You show this, and the participants do it on the next slide. Run the commands exactly as in SOLO.md. Point at the line 'backend: claude-code': it means that the login is being used. A dry run does not call the AI, so it does not yet tell you how good the agent is. Setup for each platform (Windows, WSL, Mac, Docker) is in docs/SETUP.md. The workshop package: https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent (public, so every participant can download it).",
    "stateId": "14:Demo · Step 0: the offline path",
    "teach": {
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
    "kicker": "SOLO 0 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "visual": {
      "bot": "point",
      "place": "slot"
    },
    "subtitle": "The same steps I just showed you. Every command has a copy button, so you don't need to type anything.",
    "cards": [],
    "steps": [
      {
        "text": "Open a terminal and go to your Documents folder",
        "prompt": "cd ~/Documents",
        "after": "Windows: PowerShell. Mac: Terminal. A different setup? See docs/SETUP.md in the package."
      },
      {
        "text": "Download the package",
        "prompt": "git clone https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent.git",
        "after": "This gives you your own copy of the package."
      },
      {
        "text": "Go into the folder and install the parts",
        "prompt": "cd aetherlink-day4-n8n-to-agent\nnpm ci",
        "after": "This takes about a minute. Lines starting with “npm warn” are fine. A line starting with “npm error” means something went wrong: ask for help."
      },
      {
        "text": "Run the health check and the tests",
        "prompt": "npm run doctor\nnpm run verify",
        "after": "Look for: meets minimum and fail 0."
      },
      {
        "text": "Do a dress rehearsal",
        "prompt": "npm run lesson1 -- MSG-01 --dry-run",
        "after": "The last line reads: dry run — no model call. That is correct: the AI does nothing yet. Keep --dry-run until you have built Step 1: without it, the package stops and says Step 1 is not built yet."
      }
    ],
    "expected": "verify shows fail 0, and the dry run ends with “dry run — no model call”.",
    "keyPoints": [
      "Use docs/SETUP.md for Windows, WSL, Linux/macOS, or Docker.",
      "main is Step 0; step-1 through step-4 contain the finished steps.",
      "With ANTHROPIC_API_KEY in your shell, the runner picks sdk. Use --backend to choose."
    ],
    "notes": "The participants do the five steps while you walk around. npm run verify also tests the chat, so there is no separate step for that. Does someone's screen say backend: sdk? Then an API key is set on their laptop, so add --backend claude-code. Use the break after the next slide to help people who do not have fail 0. The workshop package: https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent (public, so every participant can download it).",
    "stateId": "15:Get the workshop package.",
    "teach": {
      "time": "10 min",
      "gist": "Participants do Step 0 themselves: download, install, health check, tests and dress rehearsal.",
      "script": [
        {
          "say": "Now it is your turn. These are the same steps that I just showed you. Every command has a copy button, so you do not have to type anything."
        },
        {
          "do": "Point at steps 1 and 2.",
          "say": "First go to your Documents folder, then download the package. That makes your own copy."
        },
        {
          "do": "Point at step 3.",
          "say": "Then go into the folder and install the parts. That takes about a minute."
        },
        {
          "do": "Point at steps 4 and 5.",
          "say": "Then run the health check, the tests and the dress rehearsal. Look at the 'Done when' line: that is what your screen should say."
        },
        {
          "do": "Start the 10-minute timer and walk around."
        }
      ],
      "do": [
        "Copy each command and run it.",
        "Check for: meets minimum, fail 0, dry run."
      ],
      "done": [
        "verify shows fail 0.",
        "The dry run ends with 'dry run — no model call'."
      ],
      "watch": [
        "The package lives at https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent. Someone cloned the old RyanLisse link? Same content, but the folder name differs: use the new link.",
        "'npm' not found: Node.js is not installed (npm comes with Node.js). See docs/SETUP.md.",
        "'Missing script' or 'could not find package.json': they are in the wrong folder. They should cd aetherlink-day4-n8n-to-agent first.",
        "'git' not found: Git is not installed. See docs/SETUP.md.",
        "Error at npm ci: check the Node version. node --version must be 22 or higher.",
        "The backend says sdk: add --backend claude-code.",
        "Login error on a company (Vertex AI) laptop: run npm run doctor and check the Login settings line, then docs/SETUP.md, Company login.",
        "Someone ran it without --dry-run and sees Step 1 is not built yet: that is correct before Step 1. Add --dry-run."
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
    "title": "Memory: the chat remembers the conversation",
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
    "notes": "Step 1 in the package (SOLO.md, Step 1): Build 1 options.mjs, Build 2 CLAUDE.md, Build 3 priority-schema.mjs, Build 4 the memory test. Then come six live runs (MSG-01 to MSG-06) and the tone trap. Participants copy the code from SOLO.md and do not type it. The six labels are needed in Step 4 (npm run check).",
    "stateId": "21:Step 1 · Structured priority output and chat memory",
    "teach": {
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
    "notes": "Show it on the finished version (git switch step-1), so the build is already done. First, the dry run shows the options, including outputFormat. Second, a live run (with the Claude Code login) prints Structured output with the priority and reason, then the Switch line. If a live run is not possible, show docs/sample-trace.md and say that it is a sample. Third, the colour test with and without --no-memory.",
    "stateId": "22:Demo · Step 1: schema, route, and memory",
    "tagline": "The AI gives the label. The code picks the tray.",
    "teach": {
      "time": "5 min",
      "gist": "Demo on step-1: a dry run, a real run with the Switch line, and the memory test.",
      "script": [
        {
          "do": "Before class: git switch step-1 in your own copy."
        },
        {
          "say": "I will show it first, on the finished version. Just watch."
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
    "title": "Your turn · Step 1a: build the agent",
    "kicker": "SOLO 1a · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "multiarm",
      "place": "beside"
    },
    "subtitle": "All the code is in SOLO.md, Step 1. Copy it; there is no need to type it.",
    "cards": [],
    "steps": [
      {
        "text": "Open SOLO.md in your editor and go to Step 1",
        "after": "Your editor is the program where you open and change files (for example VS Code). Everything you need is in SOLO.md: Build 1, 2 and 3."
      },
      {
        "text": "Build 1: the settings",
        "after": "Replace the entire file 01-single-agent/options.mjs with Build 1."
      },
      {
        "text": "Build 2: the work instructions",
        "after": "Replace 01-single-agent/claude-project/CLAUDE.md with Build 2."
      },
      {
        "text": "Build 3: the form",
        "after": "Create 01-single-agent/priority-schema.mjs with the code from SOLO.md. Then open options.mjs: add the import line at the very top, and the outputFormat line inside buildOptions(). People often forget this line.",
        "warn": true
      },
      {
        "text": "Test it",
        "prompt": "git checkout origin/step-1 -- test/step1.test.mjs\nnpm run verify",
        "after": "Look for: fail 0. Stuck? git stash -u, then git switch step-1 gives you the finished version."
      }
    ],
    "expected": "npm run verify shows fail 0.",
    "keyPoints": [
      "Do the dry run. Then compare chat with and without memory."
    ],
    "teach": {
      "time": "15 min",
      "gist": "Do Build 1 to 3 from SOLO.md (settings, work instructions, form), then run verify.",
      "script": [
        {
          "say": "Now you build it. Open SOLO.md and go to Step 1. Everything you need is in there, as Build 1, 2 and 3. You copy it, you do not type it."
        },
        {
          "do": "Point at steps 2 and 3.",
          "say": "Build 1 is the settings. Build 2 is the work instructions, CLAUDE.md."
        },
        {
          "do": "Point at step 4.",
          "say": "Build 3 is the form. Be careful: you also add one line to options.mjs, the outputFormat line, and an import at the top. That is the one that people forget."
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
        "Paste Build 1 to 3 from SOLO.md.",
        "Copy the test and run npm run verify."
      ],
      "done": [
        "verify shows fail 0."
      ],
      "watch": [
        "Does verify fail on the schema? Then the outputFormat line or the import is missing in options.mjs.",
        "Is someone retyping the code? Remind them to copy it from SOLO.md.",
        "If they are stuck: git stash -u, then git switch step-1."
      ]
    },
    "notes": "Participants copy Build 1 to 3 from SOLO.md, Step 1. The first test file is copied from the finished branch, and then they run npm run verify. If someone has fallen behind or is stuck, they can use git switch step-1 (first git stash -u if they changed files)."
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · Step 1b: look inside and test memory",
    "kicker": "SOLO 1b · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "visual": {},
    "subtitle": "Your agent is built. Look at the form and the trays, then test the memory.",
    "cards": [],
    "steps": [
      {
        "text": "Do a dress rehearsal",
        "prompt": "npm run lesson1 -- MSG-01 --dry-run",
        "after": "You see the settings the agent receives. Find outputFormat: that is the form."
      },
      {
        "text": "Open 01-single-agent/priority-schema.mjs and lib/switch.mjs",
        "after": "The schema defines what the answer looks like. The Switch picks the route: the code decides, not the model."
      },
      {
        "text": "Start the chat and give it something to remember",
        "prompt": "npm run chat",
        "after": "Type: My favourite colour is red. Then ask: What is my favourite colour? Type exit to stop."
      },
      {
        "text": "Do it again, without memory",
        "prompt": "npm run chat -- --no-memory",
        "after": "Ask the same question. This time it does not know: every message is a new conversation.",
        "warn": true
      }
    ],
    "expected": "You can point at the schema and the Switch, and say why only the first chat remembered red.",
    "keyPoints": [
      "Do the dry run. Then compare chat with and without memory."
    ],
    "teach": {
      "time": "10 min",
      "gist": "SOLO 1: do a dry run to see the schema, open the schema and the Switch, then do the favourite-colour test with and without memory.",
      "script": [
        {
          "say": "Your turn. There are four steps on the slide, and every command has a copy button. You do not type anything yourself."
        },
        {
          "do": "Point at step 1.",
          "say": "First, a dry run. There is no model, so you only see what the agent would receive. Look for outputFormat. That is the parser from last session in n8n."
        },
        {
          "do": "Point at step 2.",
          "say": "Then open two files. The schema says what the answer must look like. The Switch picks the route. The model gives a label, and the code decides where it goes."
        },
        {
          "do": "Point at steps 3 and 4.",
          "say": "Then the memory test. Tell the chat your favourite colour, ask for it back, and exit. Then do it again with --no-memory.",
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
        "Do a dry run of MSG-01 and find outputFormat.",
        "Open priority-schema.mjs and lib/switch.mjs.",
        "Chat with memory, then with --no-memory."
      ],
      "done": [
        "They can point at the schema and the Switch.",
        "They can say why only the first chat remembers the colour."
      ],
      "watch": [
        "Do not present the dry-run output as model JSON or as a Switch result. That only comes from a live run (Claude Code login, or --backend sdk with a key) or from docs/sample-trace.md, as a sample.",
        "The chat needs a logged-in Claude Code. If they are not logged in, they should run claude once and log in.",
        "This is funny but expected: 'My favourite colour is red' also gets a priority (low), because CLAUDE.md makes it a triage agent. Use it: the rules in CLAUDE.md apply to everything you type."
      ]
    },
    "notes": "10 minutes. The dry run shows the settings, including the form (outputFormat). The filled-in form and the Switch line only appear in a real run with the Claude Code login, or in docs/sample-trace.md (say that it is a sample). Then do the colour test with and without --no-memory.",
    "stateId": "23:Run Step 1 and test chat memory."
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
        "after": "Then MSG-02 to MSG-06. Write each label down (low, medium or high) on paper or in a notes file: you will enter them in Step 4."
      },
      {
        "text": "Remove the rules for high, medium and low",
        "after": "In 01-single-agent/claude-project/CLAUDE.md, select everything from the line “## Priority definitions” up to the next line that starts with “##”. Cut it (Ctrl+X) and save (Ctrl+S).",
        "warn": true
      },
      {
        "text": "Run two messages again",
        "prompt": "npm run lesson1 -- MSG-01\nnpm run lesson1 -- MSG-06",
        "after": "For MSG-01 and MSG-06, write down: the same label as before, or a different one?"
      },
      {
        "text": "Put the rules back",
        "after": "Paste the section back in the same place (Ctrl+V) and save. Lost it? Run: git checkout origin/step-1 -- 01-single-agent/claude-project/CLAUDE.md"
      },
      {
        "text": "Check it still works",
        "prompt": "npm run verify",
        "after": "Look for: fail 0."
      }
    ],
    "expected": "Six labels written down, the tone trap compared, CLAUDE.md restored, and fail 0.",
    "keyPoints": [
      "Do the dry run. Then compare chat with and without memory."
    ],
    "teach": {
      "time": "15 min",
      "gist": "Do six live runs and write down the labels. Then the tone trap: remove the definitions, rerun 01 and 06, and restore them.",
      "script": [
        {
          "say": "Now your agent does real work: six customer messages. Write down every label, because you need them in Step 4.",
          "clip": "assets/day4-teach/a11-1-six-labels.mp4"
        },
        {
          "do": "Point at steps 2 and 3.",
          "say": "Then comes the tone trap. You remove the rules for high, medium and low from CLAUDE.md, and run two messages again.",
          "clip": "assets/day4-teach/a11-2-tone-trap.mp4"
        },
        {
          "ask": "What do you expect will happen without those rules?",
          "say": "(Answer: the AI may judge by tone. An angry message looks urgent, and a calm one looks harmless.)"
        },
        {
          "do": "Point at steps 4 and 5.",
          "say": "Then put the rules back, and check that you have fail 0 again."
        },
        {
          "do": "Start the 15-minute timer."
        }
      ],
      "do": [
        "Do six runs and write down the labels.",
        "Tone trap: cut the rules, rerun 01 and 06, then restore them.",
        "Run npm run verify."
      ],
      "done": [
        "Six labels are written down.",
        "The tone-trap comparison is noted.",
        "CLAUDE.md is restored, and verify shows fail 0."
      ],
      "watch": [
        "For you only: MSG-01 low, 02 high, 03 medium, 04 low, 05 high, 06 low.",
        "The label often does NOT change without the definitions (a strong model). Say: 'The model got lucky, but now nothing in the file guarantees it. Would you bet the escalation queue on luck?'",
        "Each live run takes a moment and uses their Claude Code quota."
      ]
    },
    "notes": "Expected labels, for you only. Do not say them aloud: MSG-01 low, 02 high, 03 medium, 04 low, 05 high, 06 low (checked against the package answer key). The tone trap: without the priority definitions the model may judge by tone, so a loud message looks urgent. A strong model often keeps the same label. That is fine: the point is that nothing in the file guarantees it any more. Each live run uses the participant's Claude Code quota, and six runs is fine."
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
    "stateId": "24:What you see · Step 1",
    "teach": {
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
    "stateId": "25:Discuss: what makes the route predictable?",
    "teach": {
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
    "title": "Lunch",
    "kicker": "Day 4 · Lunch",
    "type": "pause",
    "visual": {
      "countdown": 60,
      "bot": "sleepy",
      "place": "beside"
    },
    "subtitle": "Back at 13:00. Fallen behind? After lunch, run: git stash -u, then git switch step-1.",
    "cards": [
      {
        "title": "Back at 13:00",
        "body": "Next: Step 2 · specialists for risk and the customer reply."
      }
    ],
    "keyPoints": [
      "Lunch: back at 13:00.",
      "Fell behind? Switch to step-1 after lunch.",
      "Check your Claude Code login."
    ],
    "notes": "Say the return time: 13:00. Participants who have fallen behind can catch up with git switch step-1 after lunch.",
    "stateId": "26:Lunch",
    "teach": {
      "time": "60 min",
      "gist": "Lunch. Be back at 13:00.",
      "script": [
        {
          "say": "Enjoy your lunch. Be back at 13:00. Have you fallen behind? After lunch, use git stash -u, then git switch step-1."
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
    "stateId": "27:Tools",
    "teach": {
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
    "stateId": "28:Subagents",
    "teach": {
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
      "main has no agents yet. They come in step-2."
    ],
    "notes": "Show the folder on step-2 (git switch step-2, then open .claude/agents). On main the folder does not exist yet. Claude Code and the package both read this folder. A folder called .agents or a file called AGENTS.md is something else: those are not loaded as specialists.",
    "stateId": "29:Where do the agents live?",
    "teach": {
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
        "body": "It reads .claude/agents/ in your project and in ~/.claude/agents/. In the package, lib/agents.mjs reads the same files for the SDK."
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
      "The SDK reads the same folder with settingSources: ['user', 'project']."
    ],
    "notes": "You add a specialist by adding a file. In Claude Code that is all; in the package, lib/agents.mjs reads the folder and gives the files to the SDK, so it is one line in 02-subagents/agents.mjs. Claude reads the description of each specialist to decide who gets the task. Show risk-agent.md on step-2: the description line is the job advert.",
    "stateId": "30:Why this folder? Claude finds the agents.",
    "teach": {
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
    "stateId": "31:Step 2 · Risk analysis and customer reply agents",
    "teach": {
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
    "notes": "Show it on step-2. The dry run only shows the setup: no specialists are called. The real run (with the Claude Code login) shows Agent → risk-agent, then Agent → customer-reply-agent, and writes the draft in 02-subagents/claude-project/output/MSG-05.md. If a real run is not possible, show docs/sample-trace.md and say that it is a sample.",
    "stateId": "32:Demo · Step 2: trace the two agents",
    "tagline": "Risk first, then the writer. The draft waits for a person.",
    "teach": {
      "time": "5 min",
      "gist": "Demo on step-2: a dry run, a real run with the order of the agents, and the draft.",
      "script": [
        {
          "do": "Before class: git switch step-2 in your own copy."
        },
        {
          "say": "I will show it on the finished version. Just watch."
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
        "after": "Option A: build them yourself from SOLO.md, Step 2 (Build 1 to 3). Option B, if you are short on time: copy this command instead.",
        "prompt": "git checkout origin/step-2 -- .claude lib/agents.mjs 02-subagents package.json test/step2.test.mjs\nnpm run verify"
      },
      {
        "text": "Run the team on two messages",
        "prompt": "npm run lesson2 -- MSG-05\nnpm run lesson2 -- MSG-10",
        "after": "Look for: Agent → risk-agent, then Agent → customer-reply-agent. MSG-10 is missing information, so the team asks for it."
      },
      {
        "text": "Read the draft",
        "after": "Open 02-subagents/claude-project/output/MSG-05.md. Would you send this? A person decides."
      },
      {
        "text": "The description test",
        "after": "In .claude/agents/risk-agent.md, change the description to “Helps with things.” and run MSG-05 again. Does the risk expert still run?",
        "warn": true
      },
      {
        "text": "Put it back",
        "prompt": "git checkout origin/step-2 -- .claude/agents/risk-agent.md",
        "after": "Stuck? git stash -u, then git switch step-2 gives you the finished version."
      }
    ],
    "expected": "The trace shows risk first, then the reply; you have read the draft and tested a vague description.",
    "keyPoints": [
      "Do the dry run. Then read a live run or the sample trace."
    ],
    "notes": "20 minutes. Build from SOLO.md or use the shortcut (it copies all the Step 2 files). If there are no Agent → lines, the team lead did the work itself: run it again and discuss why. The description test: with 'Helps with things.' the team lead may stop calling the risk expert. It is the same as last session in n8n with an empty Description.",
    "stateId": "33:Run the orchestrator and inspect the draft.",
    "teach": {
      "time": "20 min",
      "gist": "Step 2 hands-on: the files, two runs, read the draft, do the description test, then restore.",
      "script": [
        {
          "say": "Now it is your turn. Build the team from SOLO.md, or use the shortcut in step 1 if you are short on time."
        },
        {
          "do": "Point at step 2.",
          "say": "Run two messages. Look for the order: risk first, then the writer. MSG-10 is missing information, so watch the team ask for it.",
          "clip": "assets/day4-teach/a17-1-msg10-missing.mp4"
        },
        {
          "do": "Point at step 4.",
          "say": "Then do the description test. Make the job advert vague, and see whether the team lead still calls the risk expert.",
          "clip": "assets/day4-teach/a17-2-description-test.mp4"
        },
        {
          "ask": "What do you expect?",
          "say": "(Answer: it may stop delegating. It is just like last session in n8n with an empty Description.)"
        },
        {
          "do": "Start the 20-minute timer."
        }
      ],
      "do": [
        "Do the files, run two messages, and read the draft.",
        "Do the description test, then restore."
      ],
      "done": [
        "They have seen the order: risk, then reply.",
        "They have read the draft.",
        "They have done the description test and restored it."
      ],
      "watch": [
        "No Agent → lines? Then the team lead did the work itself. Run it again.",
        "The description test does not always change the result. The point is that nothing guarantees it any more."
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
        "body": "It only asks for the missing facts. It does not make anything up."
      }
    ],
    "notes": "This is the labelled MSG-10 sample. In a live run, check each claim in the draft. If no tool gave the fact, the draft must not say it.",
    "stateId": "34:What you see · Step 2",
    "teach": {
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
    "stateId": "35:Discuss: which facts came from a tool?",
    "teach": {
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
    "stateId": "36:MCP: external data",
    "teach": {
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
    "stateId": "37:Step 3 · Read-only customer and transaction MCP tools",
    "teach": {
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
    "notes": "Show it on step-3. npm run smoke:mcp tests both desks without the AI. Then do a real run of MSG-08: point at both lookups and at the External data section in the draft. The draft waits for a person.",
    "stateId": "38:Demo · Step 3: read-only customer and transaction lookups",
    "teach": {
      "time": "5 min",
      "gist": "Demo on step-3: a smoke test, a real run with both lookups, and External data.",
      "script": [
        {
          "do": "Before class: git switch step-3 in your own copy."
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
        "prompt": "git checkout origin/step-3 -- 03-mcp .mcp.json .claude lib package.json test/step3.test.mjs\nnpm ci\ncd 03-mcp/transaction-mcp\nnpm ci\ncd ../..",
        "after": "The last three lines install the payment desk and take you back to the package folder. You don't need to start the desks yourself."
      },
      {
        "text": "Test the desks",
        "prompt": "npm run smoke:mcp",
        "after": "Last line: MCP servers OK — read-only lookups; no model was called."
      },
      {
        "text": "Run three messages",
        "prompt": "npm run lesson3 -- MSG-08\nnpm run lesson3 -- MSG-07\nnpm run lesson3 -- MSG-09",
        "after": "Write each label down (on paper or in a notes file): you will enter them in labels.json in Step 4. The label is under Result in the draft, for example 03-mcp/claude-project/output/MSG-08.md."
      },
      {
        "text": "Find the lookups",
        "after": "In the trace: get_customer and get_transaction. In the draft: the External data section."
      },
      {
        "text": "Stuck?",
        "prompt": "git stash -u\ngit switch step-3",
        "after": "This gives you the finished version."
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
      "gist": "Step 3 hands-on: the files, a smoke test, three runs with labels, and find the lookups.",
      "script": [
        {
          "say": "Now it is your turn. First get the files and install the desks. It is all in step 1."
        },
        {
          "do": "Point at step 2.",
          "say": "Test the desks. Look for: MCP servers OK."
        },
        {
          "do": "Point at step 3.",
          "say": "Then run three messages. Write down every label, because you need them in Step 4.",
          "clip": "assets/day4-teach/a21-msg07-msg09.mp4"
        },
        {
          "do": "Start the 20-minute timer."
        }
      ],
      "do": [
        "Do the files, the smoke test and three runs, and write down the labels."
      ],
      "done": [
        "They have seen both lookups.",
        "Three labels are written down."
      ],
      "watch": [
        "For you only: MSG-07 medium, 08 high, 09 medium.",
        "An error in the nested npm ci? Then they are not in the package folder."
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
    "stateId": "40:What you see · Step 3",
    "teach": {
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
    "stateId": "41:Discuss: tools and external data.",
    "teach": {
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
          "npm run check marks the labels",
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
    "notes": "Fixed: the Switch (lib/switch.mjs) and npm run check give the same result for the same input, every time. Thinking: the team lead decides which specialist to call. A person checks the result. Use fixed code for anything that must be exact or safe.",
    "stateId": "42:Fixed workflow vs. dynamic agent",
    "teach": {
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
    "title": "Your turn · Step 4: check your answers",
    "kicker": "SOLO 4 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {},
    "subtitle": "Remember npm run check from “Why move the flow to code?”? Now you use it to compare your labels with the answer key.",
    "cards": [],
    "steps": [
      {
        "text": "Get the checker",
        "prompt": "git checkout origin/step-4 -- check.mjs answer-key.json labels.template.json package.json\nnpm run check",
        "after": "The first run creates an empty file, labels.json. That is not an error."
      },
      {
        "text": "Fill in your labels",
        "after": "Open labels.json and enter low, medium or high for MSG-01 to MSG-09, based on your own runs. Save.",
        "warn": true
      },
      {
        "text": "Check them",
        "prompt": "npm run check",
        "after": "For each message: correct or revise. Lesson 1 passes at 6/6, Lesson 3 at 9/9. Do not change a label just to pass: reread the rules instead."
      },
      {
        "text": "Fill in the acceptance table",
        "after": "Copy the table from SOLO.md, Step 4. For each message: the label, the facts from the desks, and whether a person has read the draft."
      },
      {
        "text": "Save it",
        "after": "Save the table in participant-output/. Stuck? git stash -u, then git switch step-4."
      }
    ],
    "expected": "npm run check shows your result, and the acceptance table is saved.",
    "keyPoints": [
      "A fixed check tells you if the agent is right. The model does not grade itself."
    ],
    "notes": "15 minutes. 'revise' means: reread the priority definitions and the trace. Do not change a label just to pass. MSG-10 is not graded. Expected labels, for you only: 01 low, 02 high, 03 medium, 04 low, 05 high, 06 low, 07 medium, 08 high, 09 medium.",
    "stateId": "43:Step 4 · Acceptance table and npm run check",
    "teach": {
      "time": "15 min",
      "gist": "Step 4: get the checker, fill in labels.json, run npm run check, and save the acceptance table.",
      "script": [
        {
          "say": "Do you remember the button from “Why move the flow to code?”? Now you press it. It compares your labels with the answer key."
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
          "say": "(Answer: no. Reread the definitions and the trace. If you change it just to pass, you are only cheating yourself.)"
        },
        {
          "do": "Start the 15-minute timer."
        }
      ],
      "do": [
        "Get the checker, fill in the labels, run check, and fill in the table."
      ],
      "done": [
        "They have run npm run check with their own labels.",
        "The table is saved."
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
        "body": "It created labels.json. That is not an error."
      },
      {
        "title": "2 · Then",
        "body": "Fill in low, medium or high for each message, then run npm run check again."
      }
    ],
    "notes": "The first run exits with code 1 because labels.json is empty. After the participants fill in the labels, npm run check compares their labels with the expected priority.",
    "stateId": "44:What you see · Step 4",
    "teach": {
      "time": "1 min",
      "gist": "The first run makes labels.json. That is not an error.",
      "script": [
        {
          "say": "The first run says: created labels.json. That is correct. Fill it in, and run it again."
        }
      ],
      "do": [
        "Compare with the screenshot."
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
    "subtitle": "Back at 15:00. Fallen behind? Switch now: git stash -u, then git switch step-4.",
    "cards": [
      {
        "title": "Back at 15:00",
        "body": "Next: the assignment · let one agent change data, safely."
      }
    ],
    "keyPoints": [
      "Say the return time: 15:00.",
      "Press ▶ Start on the timer.",
      "Fell behind? Switch to step-4."
    ],
    "notes": "Say the return time: 15:00. The assignment starts from step-4. Participants who have fallen behind should switch to step-4 now.",
    "stateId": "45:Short break",
    "teach": {
      "time": "15 min",
      "gist": "Break. Have you fallen behind? Switch to step-4 now.",
      "script": [
        {
          "say": "Coffee break. Be back at 15:00. Have you fallen behind? Switch now with git stash -u, then git switch step-4. Then you start the assignment together with everyone else."
        },
        {
          "do": "Start the countdown."
        }
      ],
      "do": [
        "Start the countdown.",
        "Help people switch to step-4."
      ],
      "done": [
        "Everyone is on step-4 after the break."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "The assignment: let the agent change data, safely",
    "kicker": "Concept · The assignment",
    "type": "concept",
    "visual": {
      "bot": "multiarm",
      "place": "beside"
    },
    "subtitle": "Until now, the agents could only look things up. Now one agent may change data, with a barrier before every change. Do the core first.",
    "cards": [
      {
        "title": "Core · 35 min",
        "body": "Tools that change a test copy of the data, one agent that may use them (transaction-agent), and a barrier (hook) before every change. SOLO.md, Part 1 and 2."
      },
      {
        "title": "Stretch · optional",
        "body": "A draft tool, a fraud check and a question for a person. SOLO.md, Part 3 and 4."
      }
    ],
    "keyPoints": [
      "Core: Part 1 and Part 2.",
      "Stretch: Part 3 and Part 4.",
      "Step 3 stays read-only. Writes go to a working copy."
    ],
    "notes": "The target for the room is the core (Parts 1 and 2). Fast squads do the stretch, and the rest can do it at home. npm run check:assignment shows the core and the stretch separately, without the AI. The changes go to a working copy (participant-output/transactions.working.json), never to the real workbook.",
    "stateId": "46:Assignment · Extend the MCP",
    "teach": {
      "time": "3 min",
      "gist": "The assignment: one agent may change data, behind a barrier. Do the core first.",
      "script": [
        {
          "say": "Until now the agents could only look things up. Now one agent may change data. But never without a barrier."
        },
        {
          "do": "Point at Core.",
          "say": "Everyone does the core: tools that change a test copy, and a barrier before every change."
        },
        {
          "do": "Point at Stretch.",
          "say": "Are you fast? Then do the stretch. Otherwise, do it at home."
        }
      ],
      "do": [
        "Explain the difference between the core and the stretch."
      ],
      "done": [
        "Everyone knows that the target is the core."
      ],
      "watch": []
    },
    "tagline": "All instructions: SOLO.md, section “Assignment · Extend the MCP”. You get this section once you switch to step-4."
  },
  {
    "lessonId": "workshop-4",
    "title": "The barrier: a rule or a person decides",
    "kicker": "Concept · Control",
    "type": "concept",
    "layout": "compare",
    "visual": {},
    "subtitle": "Before a tool changes any data, the hook checks it. Small change: it goes through. Big change: a person has to approve it.",
    "columns": [
      {
        "title": "n8n · Day 3",
        "items": [
          "IF node: checks first",
          "Wait node: waits for approval"
        ]
      },
      {
        "title": "Code · Day 4",
        "items": [
          "Hook: allow, ask or deny",
          "A person reads every draft"
        ]
      }
    ],
    "keyPoints": [
      "A human or a rule decides before a tool changes anything."
    ],
    "notes": "A hook is code that runs at a fixed moment: just before a tool is used, or just after. In the assignment, the 'before' hook lets lookups and small changes through, and asks a person about big changes, additions and deletions. The 'after' hook writes every change to a log (audit.jsonl). It works in Claude Code and in the package.",
    "stateId": "47:Control: hooks and approval",
    "teach": {
      "time": "3 min",
      "gist": "The hook is the barrier: a small change goes through, and a big change asks a person.",
      "script": [
        {
          "say": "Do you remember the barrier from “Why move the flow to code?”? This is it. Before a tool changes data, the hook checks."
        },
        {
          "say": "A small change goes through. For a big change, a person must say yes first. And afterwards everything is written down in a log."
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
        "Everyone knows: small goes through, big asks."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Not every agent gets every key",
    "kicker": "Concept · Permissions",
    "type": "concept",
    "subtitle": "A tool is a key, not the authority to decide. A person still decides.",
    "cards": [
      {
        "title": "Only the keys it needs",
        "body": "Each agent gets only the tools it needs for its own job."
      },
      {
        "title": "Check before, not after",
        "body": "The barrier comes before the change. Afterwards, you cannot undo it."
      },
      {
        "title": "A person reads the draft",
        "body": "Having a tool does not mean it may issue a refund or send a reply."
      }
    ],
    "keyPoints": [
      "Each agent gets only the tools it needs.",
      "A requested tool call is not an executed action.",
      "Read-only context does not authorise a customer action.",
      "A person reviews every draft."
    ],
    "notes": "Inspect the configured tools before the run. The current core package reads customer and transaction context, but it does not grant permission to change a payment or send a reply. Ask the participant to identify the requested tool, its permitted scope and the human review decision. Keep the removed Anatomy illustration out of this route. The bounded-loop diagram earlier in the deck shows the difference between permission checks before execution and checks after the tool has run.",
    "stateId": "48:Not every agent has every tool",
    "visual": {
      "bot": "point",
      "place": "beside"
    },
    "teach": {
      "time": "2 min",
      "gist": "Give it only the keys it needs, check before and not after, and a person decides.",
      "script": [
        {
          "do": "Point at the three cards.",
          "say": "There are three rules. Give it only the keys it needs. Put the barrier before the change, not after. And a key is not permission: a person still decides."
        }
      ],
      "do": [
        "Give the three rules."
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
    "subtitle": "Which agent is allowed to use update_transaction? Vote by raising your hand for A, B, C or D.",
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
          "say": "(Answer: B, transaction-agent. Only it has the write tools. The team lead must hand the work over to it.)"
        }
      ],
      "do": [
        "Vote, then reveal the answer."
      ],
      "done": [
        "Everyone knows that only one agent writes."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "When does the barrier ask?",
    "kicker": "Concept · The barrier",
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
    "subtitle": "There are three possible answers.",
    "cards": [
      {
        "title": "ALLOW",
        "body": "A lookup, a draft, or a change below €100."
      },
      {
        "title": "ASK",
        "body": "A change of €100 or more, an addition or a deletion: a person has to approve it."
      },
      {
        "title": "DENY",
        "body": "A fraud hold, or the person says no. The change is blocked, and the agent is told to stop."
      }
    ],
    "keyPoints": [
      "Reads, drafts and small updates do not ask.",
      "Large updates, adds and deletes ask a person.",
      "No person to ask means deny."
    ],
    "notes": "Read the cards one by one. The threshold is one constant: AUTO_APPROVE_TRANSACTION_AMOUNT = 100 in 03-mcp/hooks/transaction-guard.mjs. In interactive claude, the hook returns ask and Claude Code shows the prompt. When fraud-check-agent says medium, or a fact is missing, the orchestrator asks the person with AskUserQuestion. Under claude -p, or in the SDK without a terminal, no person can answer, so the write is denied. A denied write is final: the agent reports it and stops. Precise: the hook blocks that one tool call. The agent stops because its instructions tell it to stop after a denial, and because it has no other tool that can make the change.",
    "stateId": "50:When does the hook ask?",
    "teach": {
      "time": "2 min",
      "gist": "Allow, ask or deny.",
      "script": [
        {
          "do": "Point at the three stamps.",
          "say": "Allow: small things go through. Ask: for big things, a person says yes. Deny: for fraud, or when the person says no, the agent stops."
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
        "body": "npm run check:assignment\nA list with one file and one change per line."
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
    "notes": "Run check:assignment on step-4 and read the hints. Then switch to the solution branch and show hook:demo small (allow) and large (ask). These run without the AI. Optional: run npm run resolve -- MSG-07 --backend sdk-login on solution and answer y or N. Afterwards, npm run reset:mcp resets the working copy.",
    "stateId": "51:Demo · Assignment: one write, three outcomes",
    "teach": {
      "time": "5 min",
      "gist": "Demo: check:assignment gives hints, and the hook says allow for a small change and ask for a large one.",
      "script": [
        {
          "do": "On step-4: npm run check:assignment.",
          "say": "This tells you what is still missing. Every line is one file and one change."
        },
        {
          "do": "On solution: npm run hook:demo -- small, then -- large.",
          "say": "A small change: allow. A big change: ask. That is the barrier."
        }
      ],
      "do": [
        "Run three commands."
      ],
      "done": [
        "Everyone has seen allow and ask."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "The core: four files, four jobs",
    "kicker": "Concept · Where to change what",
    "type": "concept",
    "visual": {
      "bot": "point",
      "place": "left"
    },
    "subtitle": "Each file has one job. The exact instructions are in SOLO.md, section “Assignment · Extend the MCP”, Part 1 and 2.",
    "cards": [
      {
        "title": "03-mcp/transaction-mcp/server.js",
        "body": "Add the tools that change data. They change a test copy, not the real list."
      },
      {
        "title": "03-mcp/claude-project/.claude/agents/transaction-agent.md",
        "body": "The only agent allowed to change data. Give it get, update and add."
      },
      {
        "title": "03-mcp/claude-project/CLAUDE.md",
        "body": "Who changes data, and when to stop. The team lead must hand the work over."
      },
      {
        "title": "03-mcp/hooks/transaction-guard.mjs",
        "body": "The barrier: the code decides on every change."
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
    "notes": "Show each file in the editor. server.js gets add_transaction, update_transaction and delete_transaction, which write to participant-output/transactions.working.json. drafts-server.js gets save_reply_draft, which writes participant-output/drafts/MSG-0N.md. The agent files list the tools for each agent. The SDK agents definition uses the same tool lists.\n\nCLAUDE.md is advice to the model, and the model can make a mistake. The tools list and the hook are code, and the model cannot go around them. The SDK loads the hook through the hooks option. Claude Code loads the same file through .claude/settings.json. resolve.mjs runs the lookup, fraud check, update, hook and draft in a fixed order.",
    "stateId": "52:Where you change what · core",
    "teach": {
      "time": "3 min",
      "gist": "Four files: the tools, the one agent that writes, the rules and the barrier.",
      "script": [
        {
          "do": "Point at the four cards.",
          "say": "There are four files. The tools. The one agent that may write. The rules in CLAUDE.md. And the barrier."
        }
      ],
      "do": [
        "Show the four files."
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
    "subtitle": "Your first npm run check:assignment. Lots of red: that is your to-do list.",
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
      "gist": "Red at the start is the to-do list.",
      "script": [
        {
          "say": "Lots of red? Good: that is your to-do list. Fix one line, then run it again."
        }
      ],
      "do": [
        "Show this before they start."
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
    "subtitle": "When the core is finished, your screen looks like this.",
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
    "notes": "Show this after the participants run npm run check:assignment and npm run hook:demo -- small and -- large. These run without the AI and need no key. If check:assignment fails, read the hint: it names the file.",
    "stateId": "54:What good looks like: core",
    "teach": {
      "time": "1 min",
      "gist": "Done means: the core has passed, a small change is allowed, and a large change asks.",
      "script": [
        {
          "say": "This is your goal. Core passed. Small change: allow. Big change: ask."
        }
      ],
      "do": [
        "Show the goal."
      ],
      "done": [
        "Everyone knows what the end picture looks like."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · the assignment: core",
    "kicker": "Assignment · Core",
    "type": "practice",
    "layout": "exercise",
    "timer": 35,
    "visual": {},
    "subtitle": "Work on step-4. Follow SOLO.md, “Assignment · Extend the MCP”, Part 1 and 2. Fix one line of the to-do list at a time.",
    "cards": [],
    "steps": [
      {
        "text": "Switch to step-4 and look at the to-do list",
        "prompt": "git stash -u\ngit switch step-4\nnpm run check:assignment",
        "after": "Then open SOLO.md and go to “Assignment · Extend the MCP”. Each red line of the to-do list names one file and one change."
      },
      {
        "text": "The tools that change data",
        "after": "SOLO.md, Part 1: in 03-mcp/transaction-mcp/server.js. They change a test copy, not the real list."
      },
      {
        "text": "The one agent that may change data",
        "after": "SOLO.md, Part 1: create 03-mcp/claude-project/.claude/agents/transaction-agent.md with get, update and add. Copy the three rules for changing data into 03-mcp/claude-project/CLAUDE.md word for word: the check looks for those exact sentences."
      },
      {
        "text": "The barrier",
        "after": "SOLO.md, Part 2: write 03-mcp/hooks/transaction-guard.mjs. Below €100 goes through; €100 or more asks a person; every change gets one line in the audit log.",
        "warn": true
      },
      {
        "text": "Check",
        "prompt": "npm run check:assignment\nnpm run hook:demo -- small\nnpm run hook:demo -- large",
        "after": "Look for: Core passed, Decision allow and Decision ask."
      }
    ],
    "expected": "check:assignment says Core passed, and a big change asks a person.",
    "keyPoints": [
      "Core first: Part 1 and Part 2.",
      "Only transaction-agent writes.",
      "A denied write is final."
    ],
    "notes": "35 to 45 minutes. check:assignment runs without the AI and says what is missing. The solution branch has the reference answer. After live runs, npm run reset:mcp resets the working copy.",
    "stateId": "55:Assignment core: write tools and a hook.",
    "teach": {
      "time": "35 min",
      "gist": "Core: the tools, the writing agent, the rules and the barrier. Run check:assignment until Core passed.",
      "script": [
        {
          "say": "Now it is your turn. Start on step-4 and look at the to-do list. Fix one line, then run it again."
        },
        {
          "do": "Point at step 4.",
          "say": "The barrier is the most important part: a small change goes through, and a big change asks a person."
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
        "A small change is allowed, and a large change asks."
      ],
      "watch": [
        "If they are stuck, they should read the hint. It names the file.",
        "The reference answer is on the solution branch: git switch solution."
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
    "subtitle": "On the finished version: three tickets, and each one stops safely.",
    "cards": [
      {
        "title": "MSG-07 · answer N",
        "body": "The hook says no. The change is blocked, and the agent stops."
      },
      {
        "title": "MSG-08 · fraud",
        "body": "Fraud hold. ESCALATE. Nothing is changed."
      },
      {
        "title": "MSG-09 · mismatch",
        "body": "The agent asks a person."
      }
    ],
    "keyPoints": [
      "Stretch: three tickets, three safe stops."
    ],
    "notes": "These are real runs on the solution branch. The model's wording can differ, but the stops must be the same. Check participant-output/audit.jsonl: each applied write and each saved draft has one line. A denied write adds no line. After MSG-07 with y, a draft is in participant-output/drafts/MSG-07.md and starts with DRAFT. Run npm run reset:mcp to start again.",
    "stateId": "56:What good looks like: stretch",
    "teach": {
      "time": "2 min",
      "gist": "The stretch goal: three tickets, three safe stops.",
      "script": [
        {
          "do": "Point at the three cards.",
          "say": "This is the stretch goal. There are three tickets, and each one stops safely: a 'no' stops it, fraud stops it, and a doubt goes to a person."
        }
      ],
      "do": [
        "Show the goal."
      ],
      "done": [
        "Fast squads know what the end picture looks like."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "The stretch: three more files",
    "kicker": "Concept · Where to change what",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "left"
    },
    "subtitle": "Only once the core passes. Instructions: SOLO.md, Part 3 and 4.",
    "cards": [
      {
        "title": "transaction-mcp/drafts-server.js",
        "body": "save_reply_draft: the writer saves a draft, and a person reads it."
      },
      {
        "title": ".claude/agents/fraud-check-agent.md",
        "body": "Checks before every change. A fraud hold stops it."
      },
      {
        "title": "resolve.mjs",
        "body": "The fixed order, and a question for a person."
      }
    ],
    "keyPoints": [
      "save_reply_draft writes to participant-output/drafts/.",
      "fraud-check-agent only reads. Hold or high means ESCALATE.",
      "Only the orchestrator has AskUserQuestion."
    ],
    "notes": "Stretch only. drafts-server.js gives customer-reply-agent one tool, save_reply_draft. The draft starts with \"DRAFT - a person reviews this before sending\". fraud-check-agent reads the customer and the transaction and returns fraud_risk and hold. With hold or high, the workflow writes nothing and reports ESCALATE. resolve.mjs runs the fixed order: look up, fraud check, propose, hook, draft. AskUserQuestion is for the orchestrator only, and subagents cannot use it. With no terminal, the question becomes ESCALATE.",
    "stateId": "57:Where you change what · stretch",
    "teach": {
      "time": "2 min",
      "gist": "The stretch: three more files.",
      "script": [
        {
          "say": "This is only for fast squads: three more files. A draft tool, a fraud check, and a fixed order with a question to a person."
        }
      ],
      "do": [
        "Name the three files."
      ],
      "done": [
        "Fast squads know where to start."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Your turn · the assignment: stretch",
    "kicker": "Assignment · Stretch",
    "type": "practice",
    "layout": "exercise",
    "timer": 10,
    "subtitle": "Only once the core passes. Follow SOLO.md, “Assignment · Extend the MCP”, Part 3 and 4. Otherwise, at home.",
    "cards": [],
    "steps": [
      {
        "text": "The draft tool and the fraud check",
        "after": "Add save_reply_draft and fraud-check-agent."
      },
      {
        "text": "Each agent gets only its own keys",
        "after": "Check every agent's tools list."
      },
      {
        "text": "The question for a person",
        "after": "Add AskUserQuestion and npm run resolve."
      },
      {
        "text": "Test it",
        "prompt": "npm run resolve -- MSG-07 --backend sdk-login",
        "after": "In your own terminal. Answer N: the barrier says no and the agent stops. With the default backend nobody is asked: the barrier stops a change of €100 or more by itself."
      }
    ],
    "expected": "check:assignment passes, and a 'no' stops the run.",
    "keyPoints": [
      "Stretch only after the core passes.",
      "Each agent gets only its tools.",
      "A denied write stops the run."
    ],
    "visual": {},
    "notes": "Optional. Check before class that resolve works on your branch. On solution the npm run resolve script exists, and on step-4 the participants add it.",
    "stateId": "58:Assignment stretch: drafts, fraud check, a question.",
    "teach": {
      "time": "open",
      "gist": "Stretch hands-on, only after the core passes.",
      "script": [
        {
          "say": "Has the core passed? Then do the stretch. Otherwise, do it at home."
        },
        {
          "do": "Point at step 4.",
          "say": "Test with MSG-07 and answer N: the barrier says no, and the agent stops."
        }
      ],
      "do": [
        "Do the stretch steps."
      ],
      "done": [
        "A 'no' stops the run."
      ],
      "watch": [
        "Test npm run resolve before class: it exists on the solution branch. The question only appears with --backend sdk-login (or sdk with an API key) in a real terminal; under the default claude-code backend the hook denies the €899 change without asking."
      ]
    }
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
    "subtitle": "At your table (3–4 people), 2 minutes. One person shares your table's answer; you may pass. Then click to reveal.",
    "cards": [
      {
        "title": "Tools",
        "body": "Which agent needs tools that change data?"
      },
      {
        "title": "Limit",
        "body": "From what amount must a person approve?"
      },
      {
        "title": "Where",
        "body": "CLAUDE.md, the tools list or the barrier?"
      }
    ],
    "keyPoints": [
      "Which agent needs write tools?",
      "Which writes need a person?",
      "Where do you put the rule?"
    ],
    "notes": "Answers: only transaction-agent. From 100. A rule in CLAUDE.md is advice to the AI. The tools list and the barrier are code, and the AI cannot get around them. In n8n, the Wait and IF nodes did this.",
    "stateId": "59:Discuss: who can change data, and when?",
    "teach": {
      "time": "4 min",
      "gist": "Discussion: one writing agent, the limit of 100, and code beats advice.",
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
          "ask": "CLAUDE.md, the tools list or the barrier: which is strongest?",
          "say": "(Answer: the tools list and the barrier, because they are code. CLAUDE.md is advice.)"
        }
      ],
      "do": [
        "Let the tables talk, then click."
      ],
      "done": [
        "All three questions are answered."
      ],
      "watch": []
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Discuss: who is accountable?",
    "kicker": "Discuss · Accountability",
    "type": "review",
    "subtitle": "At your table (3–4 people), 2 minutes. One person shares your table's answer; you may pass. Then click to reveal.",
    "visual": {
      "reveal": "click",
      "bot": "peek",
      "place": "slot",
      "faces": [
        "verward",
        "eigenwijs"
      ]
    },
    "cards": [
      {
        "title": "Who is accountable?",
        "body": "The agent labels a fraud ticket as low. A customer loses money. Who is accountable?"
      },
      {
        "title": "How do you prove it?",
        "body": "How do you show afterwards that a named person reviewed the decision?"
      }
    ],
    "notes": "Answers: never the agent. The organisation, and the people who designed the rules and approved the result. Proof: an audit log with what happened, when, and who approved it. In the assignment every change gets one line in participant-output/audit.jsonl; in production you add the name of the reviewer. Also: nine messages in this course prove nothing about accuracy; in production you measure on many more.",
    "teach": {
      "time": "5 min",
      "gist": "Accountability: never the agent; prove review with an audit log that names the reviewer.",
      "script": [
        {
          "say": "A hard question, and a fair one. Two minutes at your table."
        },
        {
          "ask": "Who is accountable if the agent labels fraud as low?",
          "say": "(Answer: never the agent. The organisation, and the people who designed the rules and approved the result.)"
        },
        {
          "ask": "How do you prove a named person reviewed it?",
          "say": "(Answer: an audit log: what happened, when, and who approved it. Our assignment writes one line per change; in production you add the reviewer's name.)"
        }
      ],
      "do": [
        "Let tables talk, then reveal."
      ],
      "done": [
        "Both questions answered."
      ],
      "watch": [
        "Expect this question from sceptics. Welcome it: it is exactly the point of the barrier."
      ]
    }
  },
  {
    "lessonId": "workshop-4",
    "title": "Homework · Step 5: build your own agent",
    "kicker": "Step 5 · Homework",
    "type": "concept",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "subtitle": "A small agent built from scratch: it finds and fixes a bug.",
    "cards": [
      {
        "title": "What you build",
        "body": "An agent that finds and fixes a bug in utils.js."
      },
      {
        "title": "Why",
        "body": "You write the loop yourself: the question, the tools and the result."
      },
      {
        "title": "Done when",
        "body": "You can show the question, the tools and the result."
      }
    ],
    "keyPoints": [
      "Homework, or after 15:50 if you have time. Build a small agent from zero."
    ],
    "notes": "Explain the final Step 5 in the step-4 branch. The starter is 05-build-your-own/agent.mjs. Participants identify the prompt, the allowed tools and the result handling.",
    "stateId": "60:Step 5 · Build your own agent",
    "teach": {
      "time": "2 min",
      "gist": "Homework: build your own small agent.",
      "script": [
        {
          "say": "Homework: build your own small agent. It finds a bug and fixes it. It is everything you learned today, in one small file."
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
    "subtitle": "Watch first. At home, you do the same.",
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
    "notes": "Run the commands from SOLO.md, Step 5. The dry run does not call the AI. Then show the same thing in Claude Code with claude -p.",
    "stateId": "61:Demo · Step 5: run the starter",
    "teach": {
      "time": "3 min",
      "gist": "Demo: the starter dry run and the Claude Code command.",
      "script": [
        {
          "do": "cd 05-build-your-own, then node agent.mjs --dry-run.",
          "say": "This is the dress rehearsal of your own agent."
        },
        {
          "do": "Show the claude -p command.",
          "say": "And here is the same thing in Claude Code: the question, and the three tools it may use.",
          "clip": "assets/day4-teach/a25-build-your-own.mp4"
        }
      ],
      "do": [
        "Show the dry run and the Claude Code command."
      ],
      "done": [
        "Everyone has seen the starter."
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
    "visual": {
      "bot": "wave",
      "place": "beside"
    },
    "subtitle": "Run the starter, then find the question, the tools and the result.",
    "cards": [],
    "steps": [
      {
        "text": "Go to the starter",
        "prompt": "git stash -u\ngit switch step-4\ncd 05-build-your-own",
        "after": "Read README.md in this folder."
      },
      {
        "text": "Do a dress rehearsal",
        "prompt": "node agent.mjs --dry-run",
        "after": "You see what the agent would receive."
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
    "notes": "Give participants 15 to 20 minutes. Keep the API key optional: without a model call they can use the dry run, and participants with a Claude Code login can use the equivalent CLI command.",
    "stateId": "62:Your turn · build your own agent",
    "teach": {
      "time": "at home",
      "gist": "Homework: run the starter, and find the question, the tools and the result.",
      "script": [
        {
          "say": "At home: go to the starter, do the dress rehearsal, and find three things: the question, the tools, and where the result comes back."
        }
      ],
      "do": [
        "Explain the homework steps."
      ],
      "done": [
        "Everyone knows what to do at home."
      ],
      "watch": []
    }
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
    "subtitle": "After the dress rehearsal of your own agent.",
    "keyPoints": [
      "Claude Code equivalent: The prompt, the allowed tools and the permission mode.",
      "Your change: Change the prompt or the tools. Run the dry run again and compare."
    ],
    "cards": [
      {
        "title": "1 · The Claude Code command",
        "body": "The question, the tools it may use and the permission mode."
      },
      {
        "title": "2 · Your change",
        "body": "Change the question or the tools, run the dry run again and compare."
      }
    ],
    "notes": "The starter has three tools: Read, Edit and Glob. acceptEdits lets the agent edit files without asking. Use it only in a test folder.",
    "stateId": "63:What you see · Step 5",
    "teach": {
      "time": "1 min",
      "gist": "Compare: the Claude Code command. Then change something and compare again.",
      "script": [
        {
          "say": "This is what you should see. Then change the question or the tools, and compare."
        }
      ],
      "do": [
        "Compare with the screenshot."
      ],
      "done": [
        "Everyone knows how to experiment."
      ],
      "watch": []
    }
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
    "notes": "Not in today's exercise: concept only. A skill is a folder with a SKILL.md file. Claude reads its description and uses it when it fits, just like the job advert of a specialist.",
    "stateId": "64:Skills",
    "teach": {
      "time": "2 min",
      "gist": "Skills are a recipe that Claude picks when it fits. They are not part of today's exercise.",
      "script": [
        {
          "say": "One extra thing. A skill is a recipe in a folder. Claude reads the description and uses it when it fits. It is just like the agent's job advert."
        },
        {
          "say": "It is not in today's exercise. I just want you to know that it exists."
        }
      ],
      "do": [
        "Mention it."
      ],
      "done": [
        "Everyone knows that skills exist."
      ],
      "watch": [
        "It is not in the package: it is a concept only."
      ]
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
    "stateId": "65:Close: keep a human in the loop.",
    "subtitle": "One agent, a team, lookup desks and a barrier. And at the end, always a person.",
    "teach": {
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
  }
];
