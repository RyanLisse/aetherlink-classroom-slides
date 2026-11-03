/* Locally maintained classroom content. See tools/SESSION-SOURCES.md. */
window.SLIDES = [
  {
    "title": "Welcome to Day 3!",
    "kicker": "AETHERLINK × WORLDLINE · DAY 3",
    "subtitle": "Build a support workflow you can explain, test and stop.",
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
    "notes": "Have this on screen while people walk in. Once everyone is seated, give a warm welcome back: keep it to a few sentences.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-1"
  },
  {
    "title": "What did you build, check or stop?",
    "kicker": "DAY 3 · RECAP",
    "subtitle": "One example from day 1 or 2. No previous attendance is required.",
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
        "title": "Built",
        "body": "What did you make?"
      },
      {
        "title": "Checked",
        "body": "What showed that it worked?"
      },
      {
        "title": "Stopped",
        "body": "When did a person need to decide?"
      }
    ],
    "keyPoints": [
      "Cold retrieval, no looking back",
      "Open one question per click",
      "Let the room answer first",
      "Last question leads into today"
    ],
    "notes": "Cold retrieval: make people answer without looking at last week's slides. Open one question per click and let the room answer before you add anything. The last question is the bridge to today: n8n is about workflows, and a good workflow has clear places where a person decides.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-2"
  },
  {
    "title": "Today in n8n",
    "kicker": "DAY 3 · OVERVIEW",
    "subtitle": "Monday, 08:00. Two hundred support tickets, and one of them is urgent. Today we build the workflow that finds it.",
    "type": "context",
    "visual": {
      "bot": "wave",
      "place": "left"
    },
    "cards": [
      {
        "title": "The problem",
        "body": "WL-1026 reports a duplicate payment in a fictional support inbox."
      },
      {
        "title": "Today’s build",
        "body": "Rules, then one AI Agent. Review its draft. Specialists are optional."
      }
    ],
    "keyPoints": [
      "Open with the inbox: 200 tickets, one urgent",
      "Goal: the right priority, fast, with a human gate",
      "Jessy’s introduction leads the full route",
      "Grow the same ticket flow from rules to specialists",
      "End with Proof and reflection"
    ],
    "notes": "Tell the story first. A support team at a payment company starts the week with a full inbox; the ticket that matters most is buried. Today we build the workflow that reads every ticket and gives it a priority, and we add intelligence one step at a time: plain rules (L1), one AI Agent (L2), specialists (L3). A machine never answers a customer on its own; a person approves. Then walk the route below. Set the route for one combined Day 3 without promising clock times. Jessy leads the introduction, the n8n tour, and the first workflow. Pause for screen sharing after the first workflow, L1, L2, L3, and the final build. Use one ticket to move from deterministic rules to bounded judgment and three specialist roles. Keep human review visible throughout. Close with Proof and reflection.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-3"
  },
  {
    "title": "Today: one ticket flow, small steps",
    "subtitle": "Build along on your own screen. Explain one run before adding more.",
    "type": "concept",
    "kicker": "DAY 3 · BUILD AND CHECK",
    "cards": [
      {
        "title": "10:00–12:00",
        "body": "Rules, chat and memory. Break 11:00–11:15."
      },
      {
        "title": "12:00–13:00",
        "body": "Lunch. Save your checked workflow first."
      },
      {
        "title": "13:00–16:00",
        "body": "Parser, review, tests and demos. Break 14:15–14:30."
      }
    ],
    "stateId": "w3-agenda",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "notes": "Build along on your own screen. Explain one run before adding more.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing."
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
    "subtitle": "Use n8n Cloud trial credits and show evidence for model runs.",
    "keyPoints": [
      "Use the approved Cloud trial. Do not add a provider API key.",
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
    "notes": "Guardrails. No real Jira/payments; no secrets on screen; import ≠ model-run proof without trace.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "source": {
      "label": "Setup and participant guide",
      "url": "assets/workshop-3/participant-guide.html#setup"
    },
    "stateId": "w3-build-zip-13"
  },
  {
    "title": "Create your n8n Cloud trial account",
    "subtitle": "Every participant creates their own n8n Cloud trial account before building.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "DAY 3 · YOUR TURN",
    "steps": [
      "At n8n.io, choose Get started. Create your own account and complete any email verification.",
      "Open your own workspace. Confirm the Cloud trial is active with free model credits, and note its expiry before class.",
      "Create a workflow named W3 support triage. Do not connect production tools.",
      "Find the canvas, node settings and Executions, then save the empty workflow. Keep account details off screen."
    ],
    "expected": "Your own account and workspace are open; the active trial has free model credits and an expiry noted; W3 support triage is saved with no production connection.",
    "timer": 10,
    "repo": {
      "label": "Participant steps, checks and stop conditions",
      "url": "assets/workshop-3/participant-guide.html#setup"
    },
    "stateId": "w3-setup",
    "visual": {
      "bot": "point",
      "place": "beside",
      "shot": "assets/workshop-3/cloud/cloud-empty.png",
      "shotLabel": "Cloud reference · saved empty workflow",
      "shotAlt": "Cloud reference · saved empty workflow"
    },
    "notes": "Every participant creates their own n8n Cloud trial account before building; do not use a shared participant login. Start at n8n.io and choose Get started. Use the approved training email, complete any email verification prompt, create your own workspace if requested, and wait for the editor. Confirm the trial is active and free model credits are available; note the expiry before class. Gateway credits pay for workflow model calls; Assistant credits do not. Older instances may show free OpenAI API credits. Self-hosted n8n is only an optional rules exercise, not the free-credit route. Stop if verification is blocked, a paid plan or payment details are required, or trial credits are unavailable; do not enter payment details, buy credits, upgrade, or substitute a provider key. Participants save their own empty workflow. Explain, demonstrate, practise, inspect the saved result, then discuss. Solo participants write the explanation."
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
    "notes": "Do the tour live in n8n and use this slide as the order. Workflows overview; the canvas; add a Manual trigger; open a node and point at the three parts of the panel (input, settings, output), because reading input and output is the most important skill today; run it and show the Executions list with the data per node; finish on credentials (stored once, separate from the workflow, never pasted into a node) and templates as a place to start.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-12"
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
      "Add Manual Trigger and Edit Fields. Enter the two ticket fields shown.",
      "Add If: message contains charged twice. Drag message from Input.",
      "Add Edit Fields on both outputs: priority high or low. Keep other input fields.",
      "Run both ticket messages from the guide. Inspect the selected branch."
    ],
    "expected": "WL-1026 ends in Priority: high; with the invoice message it ends in Priority: low, and both runs show in Executions.",
    "keyPoints": [
      "Five nodes, no credentials",
      "Drag fields from Input, do not type them",
      "Read input and output per node",
      "Change one word, watch the branch move",
      "Find both runs in Executions"
    ],
    "notes": "Guided build before free exploration. Build it live once on screen, then let participants repeat it with the timer running. The key skill is step 3: dragging message from the Input panel writes the expression {{ $json.message }}, which shows how data moves from node to node. Turning on Include Other Input Fields keeps ticket_id and message next to priority. This is WL-1026 from the opening inbox. Step 6 previews L1: this If is a one-rule version of the Priority Switch. Plant the next question: what if a customer writes 'I paid two times' instead? The rule misses it; that is where the AI Agent comes in at L2. Early finishers move on to the next slide and build their own idea.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "repo": {
      "label": "Exact fields and expected branches",
      "url": "assets/workshop-3/participant-guide.html#rules"
    },
    "stateId": "w3-build-zip-14"
  },
  {
    "title": "Make the rule miss the meaning",
    "subtitle": "Same payment problem, different words.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "DAY 3 · YOUR TURN",
    "steps": [
      "Save the working flow as 01-rules.",
      "Replace charged twice with I paid two times. Predict the branch.",
      "Run it and inspect the If input and output.",
      "Explain why this rule misses the meaning. Keep both runs."
    ],
    "expected": "You can show a rule that works as written but misses a relevant ticket.",
    "timer": 5,
    "repo": {
      "label": "Participant steps, checks and stop conditions",
      "url": "assets/workshop-3/participant-guide.html#rules"
    },
    "stateId": "w3-rule-limit",
    "visual": {
      "bot": "point",
      "place": "beside",
      "shot": "assets/workshop-3/cloud/if-rule-limitation.png",
      "shotLabel": "Cloud reference · literal rule misses the meaning",
      "shotAlt": "Cloud reference · literal rule misses the meaning"
    },
    "notes": "Explain why this step is needed. Demonstrate one change, then let participants repeat it. Check: You can show a rule that works as written but misses a relevant ticket. Discuss one observed result. Stop if the starting state is missing. Use the linked guide for recovery and solo instructions.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing."
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
    "notes": "Explain. L1 = business rule without LLM. L2 = judgment with one AI Agent and memory. L3 = Customer Reply, Risk, and Customer Context specialists. Human gate before “done” or customer-facing output.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-18"
  },
  {
    "lessonId": "workshop-3",
    "title": "L1 is a Switch — no LLM.",
    "tagline": "Like a deterministic test, a Switch applies the same rules to the same input.",
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
    "notes": "Explain — L1 Switch / rules. Ticket → Switch → L/M/H. No LLM. Cover input, branches, and error path.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-20"
  },
  {
    "lessonId": "workshop-3",
    "title": "Watch: L1 Switch routes the ticket.",
    "kicker": "Demo · L1",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-01.jpg",
      "imageLink": "Reference screenshot · compare with your own run"
    },
    "notes": "Demo — L1. Walk through Ticket Input, the Switch, and the Low, Medium, and High branches. Run one fixture ticket and compare the branch with the expected label.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-21"
  },
  {
    "lessonId": "workshop-3",
    "title": "Route three explicit values",
    "kicker": "L1 · Your turn",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "point",
      "place": "beside",
      "shot": "assets/workshop-3/cloud/manual-switch-medium.png",
      "shotLabel": "Cloud reference · supplied medium → Output 1",
      "shotAlt": "Cloud reference · supplied medium → Output 1"
    },
    "cards": [
      {
        "title": "Level",
        "body": "L1"
      }
    ],
    "steps": [
      "Duplicate the rules workflow as 01-switch. Disconnect the If.",
      "Supply priority in Ticket Input. Add Switch rules for low, medium and high.",
      "Select Extra Output for unmatched values. Test each value and urgent.",
      "Point to each selected output and explain why it was chosen."
    ],
    "expected": "Three supplied values reach their matching outputs; urgent reaches the fallback. No model has classified anything.",
    "subtitle": "Keep the IF example. Use a separate Switch for low, medium and high.",
    "keyPoints": [
      "Run the L1 flow.",
      "Match the expected label.",
      "Confirm the branch with a human.",
      "Screen-share one working flow."
    ],
    "notes": "Demonstrate dragging priority from Input into the rule. Participants follow the exact steps in the guide. They supply test labels here, not the packaged hashed fixtures. Discuss why a fallback is needed.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "repo": {
      "label": "Switch values and fixture tickets",
      "url": "assets/workshop-3/participant-guide.html#switch"
    },
    "stateId": "w3-build-zip-22"
  },
  {
    "title": "Short break",
    "subtitle": "11:00–11:15",
    "type": "pause",
    "kicker": "DAY 3 · BREAK",
    "visual": {
      "countdown": 15
    },
    "stateId": "w3-break-am",
    "notes": "11:00–11:15. Save the workflow before leaving. Resume from the last checked state."
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
    "notes": "Contrast with L1 first: the Switch follows a path you drew, so it fails on 'I paid two times'. An agent gets a goal (give this ticket the right priority) and decides itself how to get there. Read the definition, then pop the four things it can do; stress that asking a human is part of the design, not a failure. Close with the third card: in n8n an agent is one node with four inputs you can see. Point back to the screenshot on 'You used an agent': Chat Model, Memory, Tools, Output Parser.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-23"
  },
  {
    "title": "One agent loop. Bounded actions.",
    "kicker": "DAY 3 · BEFORE L2",
    "subtitle": "The n8n AI Agent runs this loop inside one node.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-3/agent-loop.svg",
      "imageAlt": "Context, model call, permission check, runtime tool execution, result and next turn. Answers need review; denial, errors and limits can stop the run.",
      "imageLink": "Concept diagram · trace one real run next"
    },
    "keyPoints": [
      "Model requests; runtime executes.",
      "Check permission before a tool runs.",
      "Hooks can inspect defined before/after events.",
      "Text is not success; check evidence.",
      "Errors, limits and people can stop the run."
    ],
    "notes": "Use WL-1026: the model may request a customer lookup; the runtime checks permission, runs the allowed tool, and adds its result to context. A second model call can use that evidence. Do not claim this lookup exists in the core chat flow: it is an optional tool example. Before any tools exist, show the short path from model to an unapproved draft. Hooks are callbacks at defined runtime events; they are not the model, do not universally intercept every operation, and do not grant human approval. A post-tool hook cannot prevent an action that already ran. A no-tool answer is one normal end path, not proof that acceptance checks passed. A denied action may be returned as an error for safe continuation or may stop the run, depending on policy. Unrecoverable failures, turn/budget limits and cancellation are separate end paths. This diagram shows one agent invocation, not the full AI-SDLC.\nDemonstrate one request and response. Participants identify them in their own trace. Discuss: who executed the code, and which evidence supports the answer?",
    "stateId": "w3-build-zip-24",
    "cards": []
  },
  {
    "title": "Add a Chat Message Trigger",
    "kicker": "STEP 2 · CHAT INPUT",
    "subtitle": "Start one workflow run for every user message.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-02.jpg",
      "imageLink": "Reference screenshot · compare with your own run"
    },
    "keyPoints": [
      "Add the Chat Message Trigger",
      "Use Hosted Chat for the workshop",
      "Keep public access off while building",
      "Test one message"
    ],
    "notes": "Show the Chat Message Trigger. Use Hosted Chat for the workshop and keep Make Chat Publicly Available off while building. Explain that the trigger runs the workflow once for each user message. Send one test message before adding the agent.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-27"
  },
  {
    "title": "Connect chat to one AI Agent",
    "subtitle": "Use n8n trial credits. No personal provider API key today.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "DAY 3 · YOUR TURN",
    "steps": [
      "Save 01-switch. Create a separate workflow named 02-chat.",
      "Search chat → Chat → On new Chat event (canvas: When chat message received). Connect AI Agent and OpenAI Chat Model.",
      "Add When chat message received → AI Agent → OpenAI Chat Model.",
      "Select Use Gateway credits, or the legacy free OpenAI credits option. Check the balance.",
      "Send a fictional ticket and inspect the Agent output. No memory yet."
    ],
    "expected": "One model run using trial credits is visible, or trial access is recorded as blocked. Do not substitute an API key.",
    "timer": 10,
    "repo": {
      "label": "Participant steps, checks and stop conditions",
      "url": "assets/workshop-3/participant-guide.html#chat"
    },
    "stateId": "w3-chat",
    "visual": {
      "shot": "assets/workshop-3/cloud/gateway-model.png",
      "shotLabel": "Cloud reference · Gateway credits, not a provider key",
      "shotAlt": "Cloud reference · Gateway credits, not a provider key"
    },
    "notes": "Demonstrate OpenAI Chat Model with Use Gateway credits, or the legacy free OpenAI credits option offered by the trial. Do not create a personal API credential. Confirm the remaining balance and record the selected model. Participants build the nodes themselves and inspect a real execution. Stop if model credits are unavailable; do not pay or substitute an API key. Discuss how model access differs from Claude Code login. An Anthropic API key is used only on the later Claude SDK route. Follow the linked guide for the exact steps."
  },
  {
    "title": "Give the Agent memory",
    "kicker": "STEP 3 · AI AGENT + SIMPLE MEMORY",
    "subtitle": "Connect a minimal AI Agent, then prove what the same session remembers.",
    "type": "practice",
    "layout": "exercise",
    "visual": {
      "shot": "assets/workshop-3/cloud/memory-same-session.png",
      "shotLabel": "Cloud reference · same-session recall; test a new session too",
      "shotAlt": "Cloud reference · same-session recall; test a new session too"
    },
    "steps": [
      "Without memory, send the two favourite-colour prompts from the guide.",
      "Connect Simple Memory. Start clean and repeat both prompts in one session.",
      "Repeat the question in a different session. Inspect the inputs and outputs.",
      "Record the three results. Explain which history each request received."
    ],
    "expected": "You can show the recorded outputs before and after memory, plus the result from another session.",
    "keyPoints": [
      "The screenshot shows the Agent before memory is connected",
      "Connect Simple Memory live",
      "Keep the same session for the first comparison",
      "Compare with a different session"
    ],
    "notes": "The screenshot shows the minimal Agent before Simple Memory is connected. Run the exact two prompts without memory and record the output. Then connect Simple Memory, start clean, repeat both prompts in the same session, and record the output. Finally use another session and compare. Simple Memory stores configurable chat history for the current session. Discuss the observed evidence instead of promising that a model can never infer the answer from the prompt text.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "timer": 10,
    "repo": {
      "label": "Memory prompts and session checks",
      "url": "assets/workshop-3/participant-guide.html#memory"
    },
    "stateId": "w3-build-zip-28"
  },
  {
    "title": "Discuss: what should a new ticket remember?",
    "subtitle": "Use the recorded runs, not a guess about the model.",
    "type": "review",
    "kicker": "DAY 3 · BUILD AND CHECK",
    "cards": [
      {
        "title": "Same conversation",
        "body": "Which earlier message was included?"
      },
      {
        "title": "New conversation",
        "body": "Did another customer’s context carry over?"
      },
      {
        "title": "Stop",
        "body": "Do not continue with mixed customer sessions."
      }
    ],
    "stateId": "w3-memory-review",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "notes": "Use the recorded runs, not a guess about the model.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing."
  },
  {
    "title": "Lunch",
    "subtitle": "12:00–13:00",
    "type": "pause",
    "kicker": "DAY 3 · BREAK",
    "visual": {
      "countdown": 60
    },
    "stateId": "w3-lunch",
    "notes": "12:00–13:00. Save the workflow before leaving. Resume from the last checked state."
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
      "imageLink": "Reference screenshot · compare with your own run"
    },
    "keyPoints": [
      "Connect the parser to the AI Agent",
      "Define the output fields before testing",
      "The parser returns fields that match its JSON Schema",
      "Keep human review before sending"
    ],
    "notes": "Show where the Structured Output Parser connects to the AI Agent. Explain that the parser adds predictable fields that match its JSON Schema. It does not remove the need to test the result or review customer-facing output.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-29"
  },
  {
    "title": "Shape the parser output",
    "kicker": "STEP 6 · PARSER FIELDS",
    "subtitle": "Define a strict JSON Schema. The parser checks fields, not whether the draft is true.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/workshop-3/cloud/parser-schema.png",
      "imageLink": "Cloud reference · strict schema, not generated from an example",
      "imageAlt": "Actual Cloud parser schema with low, medium and high enum values"
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
    "notes": "Use the actual Cloud screenshot to explain the manually defined JSON Schema. The enum restricts priority to low, medium and high. A valid shape does not prove that the draft is factual. If participants add fields later, make that an explicit extension and update every downstream reference.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-30"
  },
  {
    "title": "Route fields, not free text",
    "subtitle": "Continue 02-chat. Build the parser before the Switch.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "DAY 3 · YOUR TURN",
    "steps": [
      "Enable Require Specific Output Format. Add Structured Output Parser.",
      "Use priority and message. Restrict priority to low, medium or high.",
      "Add a Switch that reads output.priority with three exact matches and a fallback.",
      "Run the three fixture tickets. Inspect the fields and selected outputs."
    ],
    "expected": "Each valid output reaches its matching branch; invalid output stops or reaches review.",
    "timer": 20,
    "repo": {
      "label": "Participant steps, checks and stop conditions",
      "url": "assets/workshop-3/participant-guide.html#parser"
    },
    "stateId": "w3-parser",
    "visual": {
      "shot": "assets/workshop-3/cloud/model-low.png",
      "shotLabel": "Cloud reference · model chooses low; Switch routes the draft",
      "shotAlt": "Cloud reference · model chooses low; Switch routes the draft"
    },
    "notes": "Explain why this step is needed. Demonstrate one change, then let participants repeat it. Check: Each valid output reaches its matching branch; invalid output stops or reaches review. Discuss one observed result. Stop if the starting state is missing. Use the linked guide for recovery and solo instructions.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing."
  },
  {
    "title": "Test the path that must stop",
    "subtitle": "A valid JSON shape is not proof that the decision is right.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "DAY 3 · YOUR TURN",
    "steps": [
      "Duplicate the workflow as 03-test. Replace the Agent input to the Switch with test fields.",
      "Set output.priority to urgent, then test without priority.",
      "Inspect the fallback. It must not become low, medium or high.",
      "Keep this test copy. Return to 02-chat for a real model run."
    ],
    "expected": "Invalid and missing priorities do not enter a valid branch.",
    "timer": 10,
    "repo": {
      "label": "Participant steps, checks and stop conditions",
      "url": "assets/workshop-3/participant-guide.html#parser"
    },
    "stateId": "w3-invalid",
    "visual": {
      "bot": "point",
      "place": "beside",
      "shot": "assets/workshop-3/cloud/invalid-urgent.png",
      "shotLabel": "Cloud reference · urgent reaches fallback, not a priority branch",
      "shotAlt": "Cloud reference · urgent reaches fallback, not a priority branch"
    },
    "notes": "Explain why this step is needed. Demonstrate one change, then let participants repeat it. Check: Invalid and missing priorities do not enter a valid branch. Discuss one observed result. Stop if the starting state is missing. Use the linked guide for recovery and solo instructions.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing."
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
      "shot": "assets/workshop-3/cloud/core-no-actions.png",
      "shotLabel": "Cloud reference · draft output is not approval",
      "shotAlt": "Cloud reference · draft output is not approval"
    },
    "cards": [
      {
        "title": "Level",
        "body": "L2"
      }
    ],
    "steps": [
      "Run a fixture through the Agent, parser and Switch.",
      "Compare the proposed priority with the expected label.",
      "Record the input, output and trace. Label a blocked run honestly.",
      "Keep the reply as a draft; the next step is human review."
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
    "notes": "Your turn — L2. Solo bar = ≥L2 required. Timer: 20 min. Checklist: (1) AI run recorded (2) parser returns priority and message (3) human reviewed priority (4) no silent auto-send (5) Proof fields started. Invite one or two participants to share their workflow before L3.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "repo": {
      "label": "Fixtures and model-evidence checklist",
      "url": "assets/workshop-3/participant-guide.html#fixtures"
    },
    "stateId": "w3-build-zip-31"
  },
  {
    "title": "A draft is not permission to send",
    "subtitle": "This lab has no email, payment or customer-system action.",
    "type": "concept",
    "kicker": "DAY 3 · BUILD AND CHECK",
    "cards": [
      {
        "title": "Propose",
        "body": "The model returns priority and a draft message."
      },
      {
        "title": "Review",
        "body": "A person checks the ticket, missing facts and proposed reply."
      },
      {
        "title": "Decide",
        "body": "Record accept, revise or stop. Nothing is sent automatically."
      }
    ],
    "stateId": "w3-gate",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "notes": "This lab has no email, payment or customer-system action.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing."
  },
  {
    "title": "Review one draft and reject another",
    "subtitle": "Manual review is an exercise boundary, not a production approval system.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "DAY 3 · YOUR TURN",
    "steps": [
      "Inspect a draft alongside its ticket and tool evidence.",
      "Record accept or revise with your reason. Do not send a real message.",
      "Use the missing-information ticket. Record stop and the missing fact.",
      "Explain what prevents a customer action: no sending node is connected."
    ],
    "expected": "You have one reviewed draft and one stop decision, with no external action.",
    "timer": 15,
    "repo": {
      "label": "Participant steps, checks and stop conditions",
      "url": "assets/workshop-3/participant-guide.html#review"
    },
    "stateId": "w3-review",
    "visual": {
      "bot": "point",
      "place": "beside",
      "shot": "assets/workshop-3/cloud/human-review-stop.png",
      "shotLabel": "Cloud reference · failed draft, human STOP/revise",
      "shotAlt": "Cloud reference · failed draft, human STOP/revise"
    },
    "notes": "Explain why this step is needed. Demonstrate one change, then let participants repeat it. Check: You have one reviewed draft and one stop decision, with no external action. Discuss one observed result. Stop if the starting state is missing. Use the linked guide for recovery and solo instructions.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing."
  },
  {
    "title": "Short break",
    "subtitle": "14:15–14:30",
    "type": "pause",
    "kicker": "DAY 3 · BREAK",
    "visual": {
      "countdown": 15
    },
    "stateId": "w3-break-pm",
    "notes": "14:15–14:30. Save the workflow before leaving. Resume from the last checked state."
  },
  {
    "title": "Data is not chat history",
    "subtitle": "Customer context comes from a lookup, not from a remembered claim.",
    "type": "concept",
    "kicker": "DAY 3 · BUILD AND CHECK",
    "cards": [
      {
        "title": "Chat history",
        "body": "Earlier messages in this session."
      },
      {
        "title": "Customer record",
        "body": "A row matched by customer_id."
      },
      {
        "title": "Missing record",
        "body": "Report the gap; do not invent customer details."
      }
    ],
    "stateId": "w3-context",
    "visual": {
      "bot": "think",
      "place": "beside"
    },
    "notes": "Customer context comes from a lookup, not from a remembered claim.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing."
  },
  {
    "title": "Look up a customer, then a missing customer",
    "subtitle": "Use a separate lookup experiment before attaching more tools.",
    "type": "practice",
    "layout": "exercise",
    "kicker": "DAY 3 · YOUR TURN",
    "steps": [
      "Download the workshop CSV and import it into a Data Table.",
      "Create a manual test with Get row(s), filtered by customer_id = CUST-003.",
      "Repeat with CUST-999. Record what the node returns.",
      "Explain how the Agent should respond when no matching row exists."
    ],
    "expected": "A known ID returns its row; an unknown ID produces a recorded data gap.",
    "timer": 15,
    "repo": {
      "label": "Participant steps, checks and stop conditions",
      "url": "assets/workshop-3/participant-guide.html#context"
    },
    "stateId": "w3-lookup",
    "visual": {
      "shot": "assets/workshop-3/cloud/customer-known.png",
      "shotLabel": "Cloud reference · synthetic customer found; test missing ID too",
      "shotAlt": "Cloud reference · synthetic customer found; test missing ID too"
    },
    "notes": "Explain why this step is needed. Demonstrate one change, then let participants repeat it. Check: A known ID returns its row; an unknown ID produces a recorded data gap. Discuss one observed result. Stop if the starting state is missing. Use the linked guide for recovery and solo instructions.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing."
  },
  {
    "title": "Final build: chat in, reviewed draft out",
    "kicker": "FINAL ASSIGNMENT · YOUR TURN",
    "subtitle": "The core needs one Agent. Specialist tools are optional.",
    "type": "practice",
    "layout": "exercise",
    "timer": 20,
    "visual": {
      "bot": "point",
      "place": "beside",
      "shot": "assets/workshop-3/cloud/model-low.png",
      "shotLabel": "Cloud reference · one-Agent core, draft only",
      "shotAlt": "Cloud reference · one-Agent core, draft only"
    },
    "steps": [
      "Open 02-chat. Run the Agent, parser and Switch with the fixture tickets.",
      "Read the proposed reply in local chat. Label it as an unapproved draft.",
      "Record your review and one stopped case. No customer action is connected.",
      "Export the workflow and explain one execution to another person or in a note."
    ],
    "expected": "One Agent completes the core. Evidence includes valid routing, a stop case and a human review.",
    "keyPoints": [
      "One Agent is enough",
      "Inspect all three branches",
      "Reject invalid output",
      "Record a human review",
      "Do not send a real message"
    ],
    "notes": "The local chat displays an unapproved draft, not a reply released to a customer. A person records their review afterwards. No sender or payment tool exists in the core. Show the final output node and inspect the Chat Trigger response mode. Finish with the evidence checklist in the guide.",
    "repo": {
      "label": "Final checks and solo completion",
      "url": "assets/workshop-3/participant-guide.html#finish"
    },
    "stateId": "w3-build-zip-42"
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
      "place": "beside",
      "shot": "assets/workshop-3/cloud/share-import.png",
      "shotLabel": "Cloud reference · separate unpublished sharing import",
      "shotAlt": "Cloud reference · separate unpublished sharing import"
    },
    "cards": [
      {
        "title": "Pack",
        "body": "Proof"
      }
    ],
    "steps": [
      "Capture execution screenshots and prepare a safe export copy using the guide.",
      "Write the L/M/H rules in one paragraph.",
      "Name the human gate.",
      "Record the level reached."
    ],
    "expected": "The Proof pack includes a checked sharing copy, execution screenshots, routing rules, a human decision, and the level reached.",
    "subtitle": "Keep the raw export private. Share only the checked copy and synthetic evidence.",
    "keyPoints": [
      "Capture the flow.",
      "Explain the L/M/H rules.",
      "Name the gate and level."
    ],
    "notes": "Follow the guide's Prepare a sharing copy steps. Save and export the participant workflow, keep the raw file private, then remove credential references, instance metadata and personal data from a separate copy. Validate JSON locally and inspect a separate inactive import without executing it. Never remove credentials from the live workflow. Check screenshots for account details. Record the trial-credit option, selected model, routing rules, human decision and level reached. Valid JSON is not proof that sensitive data is absent. Explain, demonstrate, practise, check and discuss. Solo participants label their own review as self-review.",
    "repo": {
      "label": "Evidence checklist",
      "url": "assets/workshop-3/participant-guide.html#finish"
    },
    "stateId": "w3-build-zip-44"
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
        "title": "I built…",
        "body": "Show one execution."
      },
      {
        "title": "I stopped…",
        "body": "Show the reason and missing evidence."
      },
      {
        "title": "At work I could…",
        "body": "Name one small, safe use case."
      }
    ],
    "keyPoints": [
      "Three quiet minutes",
      "Let people write first",
      "Collect a few answers aloud",
      "Questions feed tomorrow"
    ],
    "notes": "Give three quiet minutes to complete the statements, then collect a few out loud. Write the workflow ideas and open questions on the flipchart: they are the starting point for tomorrow.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-47"
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
    "subtitle": "Carry your behaviour and checks into code, not your n8n export.",
    "keyPoints": [
      "Bring observed behaviour",
      "Map the schemas explicitly",
      "No prerequisite specialist build"
    ],
    "cards": [
      {
        "title": "Bring",
        "body": "One ticket, a checked output, a failed case and a human decision."
      },
      {
        "title": "Translate",
        "body": "Nodes become prompt, schema, tools and explicit control flow."
      },
      {
        "title": "New environment",
        "body": "Day 4 uses its own messages and package. No n8n JSON import."
      }
    ],
    "notes": "Carry one ticket, actual output, failed case and human decision to Day 4. Day 4 has its own messages, schema and package. Translate deliberately; there is no n8n-export import. No W3 specialist completion is required.",
    "stateId": "w3-build-zip-45"
  },
  {
    "lessonId": "workshop-3",
    "title": "L3 splits Reply, Risk and Context.",
    "tagline": "Like a reviewer from day 2, each specialist has one job. It reports; it approves nothing.",
    "kicker": "OPTIONAL EXTENSION · Explain · L3 · three specialists · one gate",
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
    "notes": "Optional after the one-Agent core passes. Not required for solo completion. Explain — L3. Split customer reply, risk or priority, and customer context. Customer Context Agent looks up context in a Data Table through customer_id. Let the main Agent orchestrate the three tools. Document who does what and keep the human gate before done. Stretch — not required for the solo bar.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-32",
    "optional": true,
    "hidden": true
  },
  {
    "lessonId": "workshop-3",
    "title": "Watch: L3 specialists, one gate.",
    "kicker": "OPTIONAL EXTENSION · Demo · L3",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-11.jpg",
      "imageLink": "Reference screenshot · compare with your own run"
    },
    "notes": "Optional after the one-Agent core passes. Not required for solo completion. Demo — L3. The screenshot shows Customer Reply Agent, Risk Agent, and Customer Context Agent connected to the main flow. Explain that Customer Context Agent uses a Data Table lookup through customer_id. Name all three roles and the human gate.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-33",
    "optional": true,
    "hidden": true
  },
  {
    "title": "Add the Customer Reply Agent",
    "kicker": "OPTIONAL EXTENSION · STEP 7 · FIRST SPECIALIST",
    "subtitle": "Give one specialist responsibility for the customer-facing draft.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-07.jpg",
      "imageLink": "Reference screenshot · compare with your own run"
    },
    "keyPoints": [
      "Keep the main Agent as orchestrator",
      "Add Customer Reply Agent as a tool",
      "Give it one clear responsibility",
      "Review the draft before it reaches a customer"
    ],
    "notes": "Optional after the one-Agent core passes. Not required for solo completion. Add the Customer Reply Agent as a tool for the main Agent. Its responsibility is the customer-facing draft. Keep the main Agent in control of when the tool is used. Keep a human review before sending.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-34",
    "optional": true,
    "hidden": true
  },
  {
    "title": "Add the Risk Agent",
    "kicker": "OPTIONAL EXTENSION · STEP 8 · SECOND SPECIALIST",
    "subtitle": "Separate risk assessment from customer reply writing.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-08.jpg",
      "imageLink": "Reference screenshot · compare with your own run"
    },
    "keyPoints": [
      "Customer Reply drafts the response",
      "Risk assesses risk and priority",
      "The main Agent coordinates both tools",
      "One human gate remains"
    ],
    "notes": "Optional after the one-Agent core passes. Not required for solo completion. Add the Risk Agent beside the Customer Reply Agent. Separate the responsibilities. The Reply specialist drafts customer-facing text. The Risk specialist assesses risk and priority. The main Agent coordinates both tools and one human gate remains.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-35",
    "optional": true,
    "hidden": true
  },
  {
    "title": "Description chooses. System Message guides.",
    "tagline": "Day 2 bridge: the Description works like a skill's description, the System Message like CLAUDE.md.",
    "kicker": "OPTIONAL EXTENSION · STEP 9 · TOOL ROUTING",
    "subtitle": "Two fields control different parts of the specialist pattern.",
    "type": "concept",
    "visual": {
      "opener": "showcase",
      "image": "assets/day3-lesplan/step-09.jpg",
      "imageLink": "Reference screenshot · compare with your own run"
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
    "notes": "Optional after the one-Agent core passes. Not required for solo completion. Use the Risk Agent configuration to show the distinction. The Description tells the main Agent when to choose the tool. The System Message guides the specialist's behavior after selection. Test both a case that should call the specialist and one that should not.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-36",
    "optional": true,
    "hidden": true
  },
  {
    "title": "Add customer context with Data Tables",
    "kicker": "OPTIONAL EXTENSION · STEP 10 · THIRD SPECIALIST",
    "subtitle": "Import the workshop CSV and look up customer context through customer_id.",
    "type": "practice",
    "layout": "exercise",
    "repo": {
      "label": "Extension instructions and source downloads",
      "url": "assets/workshop-3/participant-guide.html#extensions"
    },
    "visual": {
      "shot": "assets/day3-lesplan/step-10.jpg",
      "shotLabel": "Reference screenshot · not your execution evidence"
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
    "notes": "Optional after the one-Agent core passes. Not required for solo completion. Open the Data Tables tab, create a table, and import the linked CSV. The screenshot is the interface example and the supplied CSV uses the same schema. Add Customer Context Agent as the third specialist. It looks up context in the Data Table through customer_id and returns the matching row to the main Agent. Data Tables suit light to moderate workshop data.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-37",
    "optional": true,
    "hidden": true,
    "timer": 10
  },
  {
    "lessonId": "workshop-3",
    "title": "Stretch L3 — same tickets.",
    "kicker": "OPTIONAL EXTENSION · L3 · Your turn · optional",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "visual": {
      "bot": "point",
      "place": "beside",
      "shot": "assets/day3-lesplan/step-11.jpg",
      "shotLabel": "Reference screenshot · not your execution evidence"
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
    "notes": "Optional after the one-Agent core passes. Not required for solo completion. Your turn — L3 stretch (optional). Timer: 15 min. Checklist: (1) Customer Reply, Risk, and Customer Context roles named (2) customer_id lookup works (3) joint output (4) human gate explicit. Invite participants to share the results of all three specialists.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-38",
    "optional": true,
    "hidden": true,
    "repo": {
      "label": "Extension instructions and source downloads",
      "url": "assets/workshop-3/participant-guide.html#extensions"
    }
  },
  {
    "title": "Subagents talk before they report back",
    "kicker": "OPTIONAL EXTENSION · L3+ · ORCHESTRATION",
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
    "tagline": "Compare this with chaining a task and a check. Inspect the actual nested call.",
    "keyPoints": [
      "One question in, one answer out",
      "The specialists talk in between",
      "Wiring decides who may ask whom",
      "The orchestrator never sees the risk call",
      "The human gate stays at the end"
    ],
    "notes": "Optional after the one-Agent core passes. Not required for solo completion. This is multi-agent orchestration. In flat L3 the orchestrator calls every specialist itself. Here the Customer Reply Agent has the Risk Agent as its own tool, so the specialists consult each other before anything goes back to the orchestrator. Walk the five steps with the arrow key. Then open the Executions view of the demo workflow: the Risk Agent's call appears inside the Reply Agent's run, not inside the orchestrator's. The point to land: who may talk to whom is decided by the wiring on the canvas, not by the prompt. Be precise about what n8n does: agents call each other as tools, one request and one answer at a time; there is no open chat between them.\nTeaching rhythm: explain the next change, demonstrate it, let participants do it, check the visible result, then discuss why it happened. Solo: write the explanation instead of screen-sharing.",
    "stateId": "w3-build-zip-39",
    "optional": true,
    "hidden": true
  },
  {
    "lessonId": "workshop-3",
    "title": "Let subagents consult each other",
    "kicker": "OPTIONAL EXTENSION · L3+ · Your turn · stretch",
    "type": "practice",
    "layout": "exercise",
    "timer": 15,
    "subtitle": "Rewire your L3 so the Reply Agent asks the Risk Agent before it answers the orchestrator.",
    "repo": {
      "label": "Extension instructions and source downloads",
      "url": "assets/workshop-3/participant-guide.html#extensions"
    },
    "cards": [
      {
        "title": "Wiring",
        "body": "Risk Agent: Tool output into Customer Reply Agent\nCustomer Reply Agent: Tool output into AI Agent"
      }
    ],
    "steps": [
      "Open your L3 workflow, or import the download. Select trial credits on each Chat Model.",
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
    "notes": "Optional after the one-Agent core passes. Not required for solo completion. The Risk Agent's Tool output moves from the orchestrator to Customer Reply Agent. The reference workflow already has this wiring. Select the trial-credit option on each Chat Model before use. Skip the extension if credits are low or unavailable; do not add a provider key or buy credits. Proof is the nested call in Executions plus the Risk note in the reply. A reference import does not prove that participants built it. Explain, demonstrate, practise, inspect the actual call and discuss. Solo participants write the explanation.",
    "stateId": "w3-build-zip-40",
    "optional": true,
    "hidden": true
  },
  {
    "lessonId": "workshop-3",
    "title": "Give the agent data: Data Table CRUD",
    "kicker": "OPTIONAL EXTENSION · Data · Your turn · stretch",
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
      "Record your manual review. Create a separate test workflow and a synthetic tickets table.",
      "Insert WL-1026 with message, priority and status new. Run the node manually.",
      "Get the same ticket_id and inspect the returned row.",
      "Update its status to reviewed. Inspect the row before continuing.",
      "Delete only WL-1026. Check that the test row is gone."
    ],
    "expected": "WL-1026 is inserted with status new, read back, updated to reviewed, and deleted again; each step shows its row in the output.",
    "keyPoints": [
      "Create, read, update, delete",
      "One table, four Data table operations",
      "Write only after the human gate",
      "Delete your test rows"
    ],
    "notes": "This extension is a separate manual CRUD experiment on synthetic data. The human starts each operation after reviewing the input; no automatic approval node is implied. Show Insert, Get, Update and Delete one at a time. Do not connect the experiment to a live chat trigger. Stop if the target table or ticket_id is uncertain.",
    "stateId": "w3-build-zip-41",
    "optional": true,
    "hidden": true,
    "repo": {
      "label": "Extension instructions and source downloads",
      "url": "assets/workshop-3/participant-guide.html#extensions"
    }
  }
];
