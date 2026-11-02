/* ==========================================================================
   Aetherlink x Worldline — Day 3 classroom deck: n8n agents (Maarten)
   22 slides. One slide = one object in order. See README.md "How to edit
   a slide" and the field reference at the top of day3-n8n-slides.js
   before changing anything here.

   The build slides show a screenshot in a browser frame (visual.opener
   'showcase'); the screenshots live in assets/day3-maarten-n8n/, together
   with customer-context.csv for the data table on slide 15.
   ========================================================================== */
window.SLIDES = [

/* ---------------------------------------------------------------------- */
/* DAY 3 — Welcome                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Welcome to Day 3!",
  kicker: "AETHERLINK × WORLDLINE · DAY 3",
  subtitle: "",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["On screen as people arrive","Warm welcome once seated","Keep it to a few sentences"],
  notes: "Have this on screen while people walk in. Once everyone is seated, give a warm welcome: keep it to a few sentences."
},

{ // Slide 2
  title: "What was useful from the last session?",
  kicker: "DAY 3 · RECAP",
  subtitle: "Choose one thing you used, remembered or want to practise again.",
  type: "recap",
  visual: { sentences: true, quietTimer: 2 },
  cards: [
    { title: "A useful idea was…", body: "" },
    { title: "I used it when…", body: "" },
    { title: "I want to practise…", body: "" }
  ],
  keyPoints: ["Two quiet minutes","One useful idea each","Connect the answers to today's workflow"],
  notes: "Give the room two quiet minutes. Ask each participant for one useful idea from the last session and one thing they want to practise again. Connect their answers to today's work where possible."
},

{ // Slide 3
  title: "Introducing myself",
  kicker: "DAY 3 · TEAM",
  subtitle: "Who is teaching you n8n today.",
  type: "context",
  visual: { stagger: 'pop', stepThrough: true, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Who I am", body: "" },
    { title: "What I do", body: "" },
    { title: "How I use n8n", body: "" }
  ],
  keyPoints: ["Who you are","What you do","Your own n8n story","Keep it under two minutes"],
  notes: "Introduce yourself: who you are, what you do, and one concrete thing you have built or automated with n8n. A real example of your own makes the build slides land better."
},

{ // Slide 4
  title: "Who are you?",
  kicker: "DAY 3 · INTRODUCTIONS",
  subtitle: "A short round: one sentence each.",
  type: "context",
  visual: { stagger: 'pop', stepThrough: true, bot: 'multiarm', place: 'beside' },
  cards: [
    { title: "Your name", body: "" },
    { title: "Your role", body: "" },
    { title: "Have you used n8n before?", body: "" },
    { title: "Success today", body: "What do you want to get out of today?" }
  ],
  keyPoints: ["One sentence each","Name, role and n8n experience","Desired outcome","Keep it moving"],
  notes: "Go round the room: name, role, whether they have used n8n or another automation tool, and what success would look like today. Keep it quick. Use the answers to adjust the pace and examples."
},

{ // Slide 5
  title: "Today",
  kicker: "DAY 3 · OVERVIEW",
  subtitle: "One support ticket, from a simple switch to a team of AI agents.",
  type: "context",
  visual: { stepThrough: true, bot: 'point', place: 'left', dayRoute: ['Welcome', 'Basic flow', 'Chat + memory', 'AI Agent', 'Output parser', 'Sub-agents', 'Data table', 'Assignment', 'Recap'] },
  cards: [
    { title: "What we do", body: "Build one workflow step by step, together: you build along on your own screen." },
    { title: "What you learn", body: "Triggers, the Switch, AI Agents, memory, output parsers, sub-agents and data tables." },
    { title: "What you can do with it", body: "Let AI read, sort and answer incoming work, with your own data as context." }
  ],
  keyPoints: ["What we do: build along","What you learn: the building blocks","What you can do with it","Point at the route for the planning"],
  notes: "Tell how the day will go. We take one support ticket and build the workflow around it step by step: first a simple Switch, then a chat, memory, an AI Agent, an output parser, sub-agents and a data table. Everyone builds along on their own screen. Use the route under the cards for the planning of the day, and add the times of the breaks out loud."
},

{ // Slide 6
  title: "How we work today",
  kicker: "DAY 3 · OVERVIEW",
  subtitle: "We build along together and look at each other's work.",
  type: "context",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "Build along", body: "Every slide adds one step. Build it on your own screen before we move on." },
    { title: "Share your screen", body: "During the day we share screens: what did you make, and where did you get stuck?" },
    { title: "Stuck is fine", body: "Say it out loud. Someone else in the room probably has the same question." }
  ],
  tagline: "Show what you made, not only what works.",
  keyPoints: ["Everyone builds along","We share screens during the day","Stuck = say it out loud"],
  notes: "Set the working agreement for the day. After each block, ask one or two people to share their screen: what did they make, and did they run into anything? Make it normal to show something that doesn't work yet; that is where the most is learned."
},

{ // Slide 7
  title: "A quick tour of n8n",
  kicker: "DAY 3 · N8N BASICS",
  subtitle: "Follow one run from its trigger to the data each node returns.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'point', place: 'beside' },
  cards: [
    { title: "Trigger", body: "Starts one workflow run." },
    { title: "Nodes and connections", body: "Each node reads data, does one job and passes data on." },
    { title: "Input and output", body: "Open a node to see what came in and what went out." },
    { title: "Executions", body: "Inspect earlier runs and find the step that failed." }
  ],
  keyPoints: ["Trigger starts the run","Connections carry data","Inspect input and output","Executions preserve the run"],
  notes: "Tour the live n8n interface in this order: workflows, canvas, trigger, node settings, input and output, then Executions. Run one tiny example. The central skill today is following the data through each node."
},

{ // Slide 8
  title: "Use workshop data only",
  kicker: "DAY 3 · WORKING AGREEMENT",
  subtitle: "Build on local n8n or the workshop instance and keep real systems out of the exercise.",
  type: "context",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "No production writes", body: "Do not send real messages or change customer systems." },
    { title: "Protect credentials", body: "Keep secrets and connection details off screen." },
    { title: "Use the fixtures", body: "Test with the supplied tickets and customer table." }
  ],
  keyPoints: ["Workshop environment only","No real customer data","Secrets stay off screen","Use supplied fixtures"],
  notes: "Set the boundary before the first build. Use local n8n or the workshop instance. Do not write to production systems. Do not paste real customer data or credentials into the workflow or show secrets while sharing a screen."
},

/* ---------------------------------------------------------------------- */
/* DAY 3 — Build the ticket workflow                                        */
/* ---------------------------------------------------------------------- */

{ // Slide 9
  title: "The basic flow",
  kicker: "DAY 3 · BUILD · STEP 1",
  subtitle: "A ticket comes in, and a Switch sends it down the right path.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/01-basic-flow.jpeg', imageLink: 'n8n · Ticket input + Switch', stepThrough: true },
  cards: [
    { title: "Manual trigger", body: "Starts the workflow when you click 'Execute workflow'." },
    { title: "Ticket Input", body: "An Edit Fields node with a test ticket, so every run uses the same input." },
    { title: "Switch", body: "Rules that route the ticket to low, medium or high. No AI yet." }
  ],
  keyPoints: ["Manual trigger","Ticket Input = fixed test ticket","Switch: rules, no AI","Three outputs: low, medium, high"],
  notes: "Build this live and let everyone build along. Start with a Manual trigger, add an Edit Fields node called Ticket Input with a test ticket (for example a customer who was charged twice), and add a Switch with three rules: low, medium and high. Run it and open the Switch to show which output the ticket went to. Point out that this is plain rules: it only works if the priority is already in the ticket. That is the problem the AI Agent will solve."
},

{ // Slide 10
  title: "Chat Message trigger",
  kicker: "DAY 3 · BUILD · STEP 2",
  subtitle: "Start a workflow by typing a message, instead of clicking a button.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/02-chat-trigger.jpeg', imageLink: 'n8n · When chat message received', stepThrough: true },
  cards: [
    { title: "A new trigger", body: "'When chat message received' starts the workflow on every chat message." },
    { title: "The chat panel", body: "Type on the left, follow every run in the Logs on the right." }
  ],
  keyPoints: ["New workflow, new trigger","Chat panel opens at the bottom","Logs show every run"],
  notes: "Open a new workflow and add the trigger 'When chat message received'. Show the chat panel that appears at the bottom: the chat on the left, the logs on the right. On its own it does nothing yet; on the next slide we connect an AI Agent to it."
},

{ // Slide 11
  title: "Simple Memory",
  kicker: "DAY 3 · BUILD · STEP 3",
  subtitle: "Compare what the agent receives before and after Simple Memory is connected.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/03-chat-memory.jpeg', imageLink: 'Step 3 · Before connecting Simple Memory', stepThrough: true },
  cards: [
    { title: "Test 1, without memory", body: "Type: My favorite color is red\nThen ask: What is my favorite color?" },
    { title: "Add Simple Memory", body: "Connect a Simple Memory node to the Memory slot of the AI Agent." },
    { title: "Test 2, with memory", body: "Start clean, repeat both messages in one session, and compare the output." }
  ],
  prompt: `My favorite color is red
What is my favorite color?`,
  keyPoints: ["AI Agent + chat model on the chat","Test without memory first","Add Simple Memory","Repeat and compare in one session"],
  notes: "Connect an AI Agent to the chat trigger and give it a chat model. First record the output without memory after the exact two messages. Then connect Simple Memory, start a clean session, repeat both messages in that same session and compare the output and Logs. Describe what you observe; do not promise that a model can never infer an answer without memory. Memory sends earlier messages with the current request."
},

{ // Slide 12
  title: "AI Agent in the flow",
  kicker: "DAY 3 · BUILD · STEP 4",
  subtitle: "The agent reads the ticket and decides the priority, so the Switch no longer needs it in the input.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/04-agent-in-flow.jpeg', imageLink: 'n8n · Ticket → AI Agent → Switch', stepThrough: true },
  cards: [
    { title: "Between input and Switch", body: "Ticket Input → AI Agent → Switch." },
    { title: "Chat model and memory", body: "The same building blocks as on the chat: a model and Simple Memory." },
    { title: "Its job", body: "Read the ticket, give it a priority and write a short message." }
  ],
  keyPoints: ["Back to the ticket flow","Agent between input and Switch","Model + memory, like the chat","Agent decides the priority"],
  notes: "Go back to the ticket workflow from step 1 and put an AI Agent between Ticket Input and the Switch, with a chat model and Simple Memory. Write a short instruction: read the ticket, decide low, medium or high, and write a reply. Run it and open the agent's output. Point out the problem: the answer is one block of text, so the Switch can't read the priority from it. That's the next step."
},

{ // Slide 13
  title: "Output Parser",
  kicker: "DAY 3 · BUILD · STEP 5",
  subtitle: "Make the agent answer in fixed fields that the next node can use.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/05-output-parser.jpeg', imageLink: 'n8n · Structured Output Parser', stepThrough: true },
  cards: [
    { title: "Require Specific Output Format", body: "Switch it on in the AI Agent: an Output Parser slot appears." },
    { title: "Structured Output Parser", body: "Connect it to that slot. The agent now always answers in the same shape." }
  ],
  tagline: "Free text is for people. Fixed fields are for the next node.",
  keyPoints: ["Turn on Require Specific Output Format","Connect a Structured Output Parser","Same shape every time","The Switch can read it"],
  notes: "In the AI Agent, turn on 'Require Specific Output Format'; a fourth slot, Output Parser, appears. Connect a Structured Output Parser to it. From now on the agent always answers in the same JSON shape, and the Switch can route on the priority field. The settings come on the next slide."
},

{ // Slide 14
  title: "Output Parser settings",
  kicker: "DAY 3 · BUILD · STEP 6",
  subtitle: "Give an example of the JSON you want back, and adjust the fields.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/06-output-parser-settings.jpeg', imageLink: 'n8n · Output Parser settings', stepThrough: true },
  cards: [
    { title: "Schema Type", body: "Generate From JSON Example." },
    { title: "JSON Example", body: "{ \"priority\": \"\", \"message\": \"\" }" },
    { title: "Then", body: "Point the Switch rules at the priority field, run it, and check input and output." }
  ],
  prompt: `{
  "priority": "",
  "message": ""
}`,
  keyPoints: ["Generate From JSON Example","Fields: priority and message","All fields are required","Switch reads output.priority"],
  notes: "Open the Structured Output Parser. Choose 'Generate From JSON Example' and type an example with the fields you want: priority and message. Note the warning: all fields become required. Run the workflow and compare input and output in the parser: in goes a block of text, out come clean fields. Then point the Switch rules at the priority field. Let people add or rename a field themselves, for example a category."
},

{ // Slide 15
  title: "Your first sub-agent",
  kicker: "DAY 3 · BUILD · STEP 7",
  subtitle: "The Customer Reply Agent: a specialist the main agent calls as a tool.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/07-customer-reply-agent.jpeg', imageLink: 'n8n · Customer Reply Agent', stepThrough: true },
  cards: [
    { title: "On the Tool slot", body: "Add an AI Agent Tool to the main agent's Tool slot." },
    { title: "Its own model and memory", body: "The sub-agent gets its own chat model and Simple Memory." },
    { title: "One job", body: "Write the reply to the customer. The main agent decides when to call it." }
  ],
  keyPoints: ["Sub-agent = agent as a tool","Its own model and memory","One clear job: the customer reply","Main agent decides when"],
  notes: "Add an AI Agent Tool to the Tool slot of the main AI Agent and call it Customer Reply Agent. Give it its own chat model and Simple Memory. Its only job: write a friendly, clear reply to the customer. Run the workflow and show the green dotted line: the main agent called the sub-agent. Takeaway: instead of one agent that does everything, you give each job to a specialist."
},

{ // Slide 16
  title: "The second sub-agent: Risk Agent",
  kicker: "DAY 3 · BUILD · STEP 8",
  subtitle: "A second specialist that analyses the risk of the ticket.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/08-risk-agent.jpeg', imageLink: 'n8n · Customer Reply + Risk Agent', stepThrough: true },
  cards: [
    { title: "Next to the Customer Reply Agent", body: "Another AI Agent Tool on the same Tool slot." },
    { title: "Its job", body: "Assess the risk, the urgency and whether escalation is needed." }
  ],
  keyPoints: ["Second AI Agent Tool","Same Tool slot","Job: risk, urgency, escalation","Main agent now has two specialists"],
  notes: "Add a second AI Agent Tool next to the Customer Reply Agent and call it Risk Agent, again with its own model and memory. Its job is to analyse the risk of the ticket. The main agent now has two specialists it can call. How it knows which one to call is on the next slide."
},

{ // Slide 17
  title: "Risk Agent settings",
  kicker: "DAY 3 · BUILD · STEP 9",
  subtitle: "The description tells the main agent when to call it. The system message tells the sub-agent how to work.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/09-risk-agent-settings.jpeg', imageLink: 'n8n · Risk Agent settings', stepThrough: true },
  cards: [
    { title: "Description", body: "For the main agent: when to use this tool.\n\"Use this agent to assess ticket risk, urgency and whether escalation is required.\"" },
    { title: "System Message", body: "For the sub-agent itself: who it is and what it returns.\n\"You are a payment risk and escalation specialist… Return a short internal risk note.\"" }
  ],
  prompt: `You are a payment risk and escalation specialist.

Review the ticket context.

Identify:
- customer risk
- complaint risk
- urgency
- whether escalation is needed

Return a short internal risk note.`,
  keyPoints: ["Description = when to call it","System message = how to work","Main agent only reads the description","Return a short internal risk note"],
  notes: "Open the Risk Agent. Two fields matter. The Description is read by the main agent: it decides from this text whether to call this tool, so write when to use it. The System Message is read by the sub-agent itself: its role, what to look at, and what to return. The Prompt is defined automatically by the model, meaning the main agent writes the question. Use the Example prompt button to paste the system message. Ask: what happens if the description is vague?"
},

{ // Slide 18
  title: "Data tables",
  kicker: "DAY 3 · BUILD · STEP 10",
  subtitle: "A table inside n8n that your workflow can read and write: here, what we know about each customer.",
  type: "concept",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/10-data-table.jpeg', imageLink: 'n8n · Data tables · customer context', stepThrough: true },
  source: { label: 'Download customer-context.csv', url: 'assets/day3-maarten-n8n/customer-context.csv' },
  cards: [
    { title: "What it is", body: "Rows and columns stored in n8n itself, no separate database needed." },
    { title: "Import the CSV", body: "Create a data table and import customer-context.csv." },
    { title: "How the workflow uses it", body: "A 'Get row(s) in Data table' tool looks up the customer of the ticket." }
  ],
  keyPoints: ["Data table = table inside n8n","Import customer-context.csv","Columns: type, transactions, incidents, critical","Read it with Get row(s) in Data table"],
  notes: "Explain data tables: a simple table that lives inside n8n, which workflows can read and write, without setting up a database. Share customer-context.csv with the participants (it is in this repo at assets/day3-maarten-n8n/customer-context.csv) and let them create a data table called customer context and import it. Walk through the columns: customer type, transactions per hour, previous incidents and the critical flag. This is the context the third sub-agent will use."
},

{ // Slide 19
  title: "Three sub-agents",
  kicker: "DAY 3 · BUILD · STEP 11",
  subtitle: "Customer Reply, Risk and Customer Context: each with its own job.",
  type: "practice",
  visual: { opener: 'showcase', image: 'assets/day3-maarten-n8n/11-three-sub-agents.jpeg', imageLink: 'n8n · Three sub-agents', stepThrough: true },
  cards: [
    { title: "Customer Context Agent", body: "The third sub-agent, with 'Get row(s) in Data table' as its tool." },
    { title: "Share your screen", body: "What does your workflow answer? Compare the results with each other." }
  ],
  keyPoints: ["Third agent reads the data table","Three specialists, one main agent","Share screens","Compare results"],
  notes: "Add the third sub-agent, the Customer Context Agent, and give it the 'Get row(s) in Data table' node as a tool, so it can look up the customer of the ticket. Run the workflow with a ticket for a critical customer and one for a standard customer. Then let two or three people share their screen: what did their workflow answer, and why are the results different?"
},

/* ---------------------------------------------------------------------- */
/* DAY 3 — Assignment and closing                                           */
/* ---------------------------------------------------------------------- */

{ // Slide 20
  title: "Assignment: from chat to chat",
  kicker: "DAY 3 · ASSIGNMENT",
  subtitle: "The ticket comes in through the chat, goes through the whole flow, and the answer comes back in the chat.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Ideas", body: "a Slack, Gmail or Teams node for high priority\nan IF node that asks for human approval\nwrite every ticket to a data table\na Code node that cleans up the input" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Replace the Manual trigger and Ticket Input with 'When chat message received'.",
    "Send the chat message through the AI Agent, the sub-agents and the Switch.",
    "Send a reply back to the chat at the end of each path.",
    "Test it with a few different tickets.",
    "Look at the other nodes in n8n: which one makes your workflow more interesting or more effective?"
  ],
  expected: "You type a ticket in the chat and get an answer back that fits its priority, risk and customer.",
  keyPoints: ["Type the minutes on the timer","Chat in, through the flow, chat out","Test with several tickets","Then add one extra node"],
  notes: "Type the minutes on the timer and press start. The core: the ticket comes in through the chat trigger, goes through the whole flow, and each path of the Switch ends with a message back in the chat. Once that works, let people explore other nodes to make the workflow more interesting or more effective. Walk around and help; save a few interesting workflows for the recap."
},

{ // Slide 21
  title: "Save your proof",
  kicker: "DAY 3 · ASSIGNMENT",
  subtitle: "Capture enough evidence to explain what ran and where a person still decides.",
  type: "practice",
  layout: "exercise",
  stepsHeading: "Before you finish:",
  steps: [
    "Export the workflow or capture one readable screenshot.",
    "Save one chat input and its returned answer.",
    "Write one sentence that explains the Low, Medium and High routing.",
    "Name the human review step before a customer-facing reply is sent."
  ],
  expected: "You can show the workflow, one real run, the routing rule and the human review step.",
  keyPoints: ["Workflow export or screenshot","One input and output","Routing explanation","Named human review"],
  notes: "Give participants time to save proof before the recap. The proof is small: one export or readable screenshot, one input and output, a short routing explanation, and the point where a person reviews customer-facing output."
},

{ // Slide 22
  title: "What did you learn?",
  kicker: "DAY 3 · CLOSING",
  subtitle: "Complete these statements.",
  type: "recap",
  tagline: "Complete each statement for yourself.",
  visual: { sentences: true, quietTimer: 3 },
  cards: [
    { title: "An AI Agent in n8n is…", body: "" },
    { title: "I use an output parser when…", body: "" },
    { title: "A sub-agent is useful because…", body: "" },
    { title: "I still have a question about…", body: "" }
  ],
  keyPoints: ["Three quiet minutes","Let people write first","Collect a few answers aloud","Show one or two assignments"],
  notes: "Recap of the day. Give three quiet minutes to complete the statements, then collect a few out loud. Let one or two people show their assignment on screen. Write the open questions on the flipchart."
}

];
