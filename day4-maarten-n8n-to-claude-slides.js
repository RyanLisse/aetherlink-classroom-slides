/* ==========================================================================
   Aetherlink x Worldline — Day 4 classroom deck: n8n to Claude (Maarten)
   18 slides. One slide = one object in order. See README.md "How to edit
   a slide" and the field reference at the top of day3-n8n-slides.js
   before changing anything here.

   Follows the Claude Code agent training package (TRAINER-GUIDE.md):
   lesson 1 one agent + CLAUDE.md, lesson 2 orchestrator + subagents,
   lesson 3 MCP + external transaction data. Same support ticket as the
   Day 3 n8n workflow, now built in Claude Code.
   ========================================================================== */
window.SLIDES = [

/* ---------------------------------------------------------------------- */
/* DAY 4 — Welcome                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Welcome to Day 4!",
  kicker: "AETHERLINK × WORLDLINE · DAY 4",
  subtitle: "",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["On screen as people arrive","Warm welcome once seated","Keep it to a few sentences"],
  notes: "Have this on screen while people walk in. Once everyone is seated, welcome them back: keep it to a few sentences."
},

{ // Slide 2
  title: "Today",
  kicker: "DAY 4 · OVERVIEW",
  subtitle: "Yesterday's support-ticket workflow, rebuilt in Claude Code.",
  type: "context",
  visual: { stepThrough: true, bot: 'point', place: 'left', dayRoute: ['Welcome', 'n8n → Claude', 'Lesson 1', 'Lesson 2', 'Lesson 3', 'Review', 'What you learned'] },
  cards: [
    { title: "What we do", body: "Build the same ticket triage in three lessons: one agent, then subagents, then external data through MCP." },
    { title: "What you learn", body: "CLAUDE.md, subagents in .claude/agents, and connecting an MCP server." },
    { title: "What you can do with it", body: "Choose between n8n and Claude Code, and move a workflow from one to the other." }
  ],
  keyPoints: ["Same ticket as yesterday","Three lessons, each adds one thing","Rhythm: explain, demo, try, discuss"],
  notes: "Tell how the day goes. We take the same support tickets as yesterday and build the triage in Claude Code, in three lessons that each add one thing: one agent with CLAUDE.md, then an orchestrator with subagents, then external transaction data through MCP. Each lesson follows the same rhythm: short explanation, demo, participants try it, discussion."
},

{ // Slide 3
  title: "From n8n to Claude Code",
  kicker: "DAY 4 · N8N → CLAUDE",
  subtitle: "The building blocks you know from yesterday each have a place in Claude Code.",
  type: "concept",
  layout: "compare",
  visual: { pairs: true },
  columns: [
    { title: "n8n", items: [
      "AI Agent with a system message",
      "AI Agent Tool as a sub-agent",
      "The sub-agent's Description",
      "Data table with 'Get row(s)'",
      "The workflow you draw on the canvas"
    ] },
    { title: "Claude Code", items: [
      "CLAUDE.md for the main session",
      "A subagent file in .claude/agents/",
      "The description in that file's header",
      "An MCP server with a tool like get_transaction",
      "The workflow you write down in CLAUDE.md"
    ] }
  ],
  tagline: "Same ideas, different place: in n8n you draw it, in Claude Code you write it down.",
  keyPoints: ["One pair per click","System message → CLAUDE.md","Sub-agent → .claude/agents","Data table → MCP tool","Canvas → written workflow"],
  notes: "Go through one pair per click and let the room guess the right-hand side first. The key difference: in n8n you draw the workflow and every step is fixed; in Claude Code you describe the workflow in text and the main agent follows it, deciding itself when to call which specialist. Keep this slide in mind: every lesson today fills in one of these rows."
},

{ // Slide 4
  title: "Today's customer messages",
  kicker: "DAY 4 · N8N → CLAUDE",
  subtitle: "Ten messages in customer-messages.md, the same file in every lesson.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "Tone traps", body: "1 and 6: loud and angry, but little impact." },
    { title: "Hidden risk", body: "2: calm and polite, but unknown transactions." },
    { title: "Clear cases", body: "3, 4 and 5: medium, low and high." },
    { title: "Transaction IDs", body: "7, 8 and 9: TX-1007, TX-1014, TX-1018. For lesson 3." },
    { title: "Missing information", body: "10: \"My payment isn't working. Please fix it.\"" }
  ],
  keyPoints: ["Same file in every lesson","Tone traps: 1 and 6","Hidden risk: 2","TX messages for lesson 3","10 tests missing info"],
  notes: "Show customer-messages.md in one of the lesson folders. The messages are chosen on purpose: some sound urgent but aren't, one sounds calm but could be fraud, three have a transaction ID that only makes sense once we have the external data, and the last one has too little information. Ask people to keep the numbers in mind: we come back to them in every lesson."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Lesson 1: one agent + CLAUDE.md                                  */
/* ---------------------------------------------------------------------- */

{ // Slide 5
  title: "Lesson 1: one agent + CLAUDE.md",
  kicker: "DAY 4 · LESSON 1",
  subtitle: "The main Claude Code session does the classification itself.",
  type: "concept",
  visual: { mdfile: 1, highlight: [{ in: 'tagline', text: 'impact and risk', tone: 'orange' }] },
  cards: [
    { title: "Open this folder", body: "01-lesson-one-single-agent/claude-project" },
    { title: "CLAUDE.md", body: "Purpose\nRules\nPriority definitions\nRequired output" }
  ],
  tagline: "The priority depends on impact and risk, not on tone.",
  keyPoints: ["Open only claude-project","CLAUDE.md = yesterday's system message","Definitions are still empty","Output: Priority + Reason"],
  notes: "Open 01-lesson-one-single-agent/claude-project in VS Code and start Claude Code there. Walk through CLAUDE.md: it is the system message of yesterday's AI Agent, but now as a file Claude reads at the start of every session. Point out the rules (only project information, no web search, don't invent facts, say what is missing) and the required output. The priority definitions are still empty on purpose: that is the exercise."
},

{ // Slide 6
  title: "Lesson 1: try it",
  kicker: "DAY 4 · LESSON 1 · YOUR TURN",
  subtitle: "Test the messages without definitions first, then write the definitions yourself.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Watch", body: "message 1: loud, low impact\nmessage 2: calm, possible fraud\nmessage 6: URGENT logo\nmessage 10: missing information" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Open 01-lesson-one-single-agent/claude-project in VS Code and start Claude Code.",
    "Paste messages 1, 2 and 6 one by one. Note the priority Claude gives.",
    "Fill in LOW, MEDIUM and HIGH under Priority definitions in CLAUDE.md.",
    "Start a new session and test the same messages again. What changed?",
    "Test message 10: does Claude say what is missing?"
  ],
  expected: "With your definitions, the loud messages come out LOW and the calm message about unknown transactions comes out HIGH.",
  keyPoints: ["Type the minutes on the timer","Test without definitions first","Write LOW, MEDIUM, HIGH","New session after editing CLAUDE.md","Message 10: missing info"],
  notes: "Type the minutes on the timer and press start. The point is to feel the difference: without definitions Claude tends to follow the tone, so message 6 (URGENT logo) can come out HIGH and message 2 (calm, unknown transactions) too low. After writing the definitions, start a new session (or /clear) so CLAUDE.md is read again. Early finishers: compare definitions with a neighbour. Whose definitions handle message 6 best?"
},

{ // Slide 7
  title: "Quiz: message 6",
  kicker: "DAY 4 · QUIZ",
  subtitle: "\"URGENT!!! My logo is wrong!!! Fix it NOW please.\" Which priority?",
  type: "quiz",
  visual: { quiz: { answer: 0 }, bot: 'stretchLeft', place: 'pointer', pointAt: 0 },
  cards: [
    { title: "LOW", body: "A cosmetic issue with little customer or financial impact." },
    { title: "MEDIUM", body: "A real service problem for one customer." },
    { title: "HIGH", body: "The customer is angry and says it is urgent." }
  ],
  check: "Answer: LOW",
  keyPoints: ["Vote first","Answer: LOW","Tone is not impact","Compare: message 2 is HIGH"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is LOW: an old logo in the portal is cosmetic, however loud the message is. Contrast it with message 2: polite, but three unknown card transactions is a possible fraud case, so HIGH. That is exactly why the definitions say impact and risk, not tone."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Lesson 2: orchestrator + subagents                               */
/* ---------------------------------------------------------------------- */

{ // Slide 8
  title: "Lesson 2: orchestrator + subagents",
  kicker: "DAY 4 · LESSON 2",
  subtitle: "Claude Code becomes the orchestrator. Each specialist owns one job.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, bot: 'point', place: 'beside' },
  items: [
    { label: "ticket-analyst", caption: "Reads the message, decides LOW, MEDIUM or HIGH, and explains why." },
    { label: "Wait for the result", caption: "The orchestrator waits for the analysis before anything else happens." },
    { label: "email-responder", caption: "Writes the customer email from the message and the analysis." },
    { label: "output/", caption: "The orchestrator writes one Markdown file: message, priority, reason, email." }
  ],
  keyPoints: ["Open 02-lesson-two-subagents","CLAUDE.md is now the orchestrator","Priority logic moved to ticket-analyst","Result lands in output/"],
  notes: "Open 02-lesson-two-subagents/claude-project. CLAUDE.md no longer classifies anything: it describes the workflow and tells the main session to use specialists instead of doing the work itself. This is yesterday's main AI Agent with the Customer Reply Agent and Risk Agent as tools. Step through the four steps; the last one is new compared to n8n: the result is a file in output/ you can open and review."
},

{ // Slide 9
  title: "What is in a subagent file?",
  kicker: "DAY 4 · LESSON 2",
  subtitle: "One Markdown file per specialist, in .claude/agents/.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'point', place: 'beside' },
  cards: [
    { title: "Lives here", body: ".claude/agents/ticket-analyst.md" },
    { title: "name and description", body: "Like the Description in n8n: tells the orchestrator when to call this agent." },
    { title: "The rest of the file", body: "Like the System Message: priority definitions, rules and what to return." }
  ],
  prompt: `---
name: ticket-analyst
description: Analyse incoming customer-support messages, determine LOW, MEDIUM, or HIGH priority, and explain the reason. Use this agent before drafting a customer response.
---

# Ticket Analyst

## Priority definitions
- LOW — General questions, requests for information, cosmetic issues, or situations with little/no immediate customer or financial impact.
- MEDIUM — A real service or payment problem affecting one customer, but with no clear sign of fraud, security risk, major financial exposure, or widespread impact.
- HIGH — Suspected fraud or security risk, unknown/unauthorised transactions, multiple affected transactions, substantial or time-critical financial impact, or evidence that many customers may be affected.

## Rules
- Base classification on impact and risk, not emotional tone.
- Do not invent missing facts.
- If important information is missing, state that explicitly.

## Return
- Priority: LOW | MEDIUM | HIGH
- Reason: concise explanation
- Key facts: relevant facts`,
  keyPoints: ["One file per specialist","Header: name + description","Description = when to call it","Body = how it works"],
  notes: "Open .claude/agents/ticket-analyst.md. The header between the --- lines has a name and a description: the orchestrator reads the description to decide when to use this agent, exactly like the Description field of yesterday's Risk Agent. The rest of the file is the agent's own instructions, like the System Message. Note that the priority definitions now live here, not in CLAUDE.md: the specialist owns its own logic. Use the Example prompt button to show the full file. Then open email-responder.md: style rules and a fixed email format."
},

{ // Slide 10
  title: "Lesson 2: try it",
  kicker: "DAY 4 · LESSON 2 · YOUR TURN",
  subtitle: "Let the orchestrator run the whole flow, and check who did what.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Check", body: "did the orchestrator call ticket-analyst?\ndid it wait for the analysis?\ndid email-responder write the email?\nis there a new file in output/?" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Open 02-lesson-two-subagents/claude-project and start Claude Code.",
    "Type /agents and find ticket-analyst and email-responder.",
    "Paste message 5 (duplicate charges) and let it run.",
    "Open the new file in output/: priority, reason and email all there?",
    "Run message 2 and message 10. Does the email promise anything it shouldn't?"
  ],
  expected: "A Markdown file in output/ per message, with the original message, priority, reason and a proposed email.",
  keyPoints: ["Type the minutes on the timer","/agents shows the specialists","Watch the delegation happen","Read the file in output/","Email must not overpromise"],
  notes: "Type the minutes on the timer and press start. Let people watch the delegation in the terminal: the orchestrator calls ticket-analyst, then email-responder. In output/ they should find one file per message. For message 10 the email should ask for the missing details instead of promising a fix; for message 2 it should not invent refunds or causes. Early finishers: change the email style in email-responder.md and run the same message again."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Lesson 3: MCP + external transaction data                        */
/* ---------------------------------------------------------------------- */

{ // Slide 11
  title: "Lesson 3: MCP + external data",
  kicker: "DAY 4 · LESSON 3",
  subtitle: "The analyst looks up transactions through a tool, without access to the Excel file itself.",
  type: "concept",
  visual: { plugs: 1, highlight: [{ in: 'tagline', text: 'get_transaction', tone: 'orange' }] },
  cards: [
    { title: "Like the data table in n8n", body: "Yesterday the Customer Context Agent read a data table. Today the analyst reads transactions." },
    { title: "transaction-mcp exposes one tool", body: "get_transaction(transaction_id)\nreturns the facts of one transaction" }
  ],
  tagline: "Excel data → server.js → get_transaction → Claude Code → ticket-analyst",
  keyPoints: ["Open only 03-lesson-three-mcp/claude-project","Server and Excel sit outside the project","One tool: get_transaction","Analyst gets facts, not the file"],
  notes: "Open only 03-lesson-three-mcp/claude-project. The MCP server (transaction-mcp) and the Excel file (external-data/transactions.xlsx) deliberately sit outside that folder: Claude Code cannot just open the spreadsheet. server.js gives controlled access to it as one tool, get_transaction. Read the tagline as the chain. Compare with yesterday: the Customer Context Agent had a 'Get row(s) in Data table' tool; the ticket-analyst now has get_transaction. Open ticket-analyst.md: it now says to use the tool when a message contains a transaction ID."
},

{ // Slide 12
  title: "Connect the MCP server",
  kicker: "DAY 4 · LESSON 3",
  subtitle: "Install once, then tell Claude Code how to start it.",
  type: "concept",
  visual: { term: [{ c: 'cd transaction-mcp' }, { c: 'npm install' }, { o: 'added packages · node_modules created' }, { c: 'cd ../claude-project' }, { c: 'claude mcp add transactions -- node ../transaction-mcp/server.js' }, { c: 'claude' }, { o: '/mcp → transactions · connected' }] },
  cards: [
    { title: "1. npm install, once", body: "Downloads the packages server.js needs into node_modules. It does not start the server." },
    { title: "2. Add it to Claude Code", body: "From claude-project, register the command that starts server.js." },
    { title: "3. Check it", body: "Start Claude Code and type /mcp: transactions should be connected." }
  ],
  tagline: "The server does not run all the time: Claude Code starts it when the connection is used.",
  keyPoints: ["npm install in transaction-mcp","node_modules is not shared","claude mcp add from claude-project","/mcp to verify","stdio: runs only while used"],
  notes: "Do this live. In the transaction-mcp folder, run npm install: it reads package.json and creates node_modules. Without it, the server fails to start. npm install installs the dependencies; it does not start anything. Then, from claude-project, register the server under the name transactions with claude mcp add (check claude mcp --help if your version differs). The server uses stdio: it is not a background service; Claude Code starts it as a local Node.js process when the connection is used, and it stops with the session. Check with /mcp."
},

{ // Slide 13
  title: "What is behind the IDs?",
  kicker: "DAY 4 · LESSON 3",
  subtitle: "The facts get_transaction returns from transactions.xlsx.",
  type: "concept",
  visual: { reveal: 'click', bot: 'think', place: 'slot' },
  cards: [
    { title: "TX-1007 · message 7", body: "Vertex Commerce · €899 · FAILED\nPayment failed; amount appears reserved on customer account" },
    { title: "TX-1014 · message 8", body: "Futura Labs · €1,290 · COMPLETED\nCustomer reports transaction as unrecognised · Fraud flag: Yes" },
    { title: "TX-1018 · message 9", body: "Juniper Hotels · €575.25 · COMPLETED\nCustomer says merchant has not received funds" }
  ],
  keyPoints: ["Ask the priority before each card","1007: failed, money reserved","1014: fraud flag","1018: completed, not received"],
  notes: "Before you open each card, read the customer message and ask the room which priority they expect; then open the card and see if the facts change their mind. TX-1007: the payment failed but the amount is reserved, a real problem for one customer. TX-1014: the fraud flag is set and the customer doesn't recognise it, so HIGH. TX-1018: completed on our side but the merchant says nothing arrived. The point: the message alone is not enough; the external facts make the priority defensible."
},

{ // Slide 14
  title: "Lesson 3: try it",
  kicker: "DAY 4 · LESSON 3 · YOUR TURN",
  subtitle: "Connect the server and let the analyst look up the transactions.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Check", body: "did the analyst call get_transaction?\nare the transaction facts in output/?\nis nothing invented?" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Run npm install in transaction-mcp.",
    "Add the server to Claude Code from claude-project and check /mcp.",
    "Paste message 7 (TX-1007) and approve the get_transaction call.",
    "Open the file in output/: which transaction facts were used?",
    "Run messages 8 and 9, then try an ID that does not exist, like TX-9999."
  ],
  expected: "The analyst looks up each transaction before deciding the priority, and the output file shows the facts it used.",
  keyPoints: ["Type the minutes on the timer","npm install first","Approve the tool call","Facts must appear in output/","TX-9999: not found, nothing invented"],
  notes: "Type the minutes on the timer and press start. Most problems are setup: no npm install, the wrong folder when adding the server, or Node.js missing. If the server doesn't connect, check /mcp and paste the exact error into Claude Code. When the tool is called, Claude asks for permission: that is the moment to point out that the analyst never opened the Excel file. With TX-9999 the analyst should say the transaction was not found instead of making something up."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Review and closing                                               */
/* ---------------------------------------------------------------------- */

{ // Slide 15
  title: "Look back at the three lessons",
  kicker: "DAY 4 · REVIEW",
  subtitle: "The four questions behind every agent design.",
  type: "review",
  visual: { reveal: 'click', bot: 'peek', place: 'slot', noReact: true },
  cards: [
    { title: "What does the main agent know?", body: "" },
    { title: "What belongs to a subagent?", body: "" },
    { title: "When is a tool needed?", body: "" },
    { title: "What information came from external data?", body: "" }
  ],
  keyPoints: ["One question per click","Answer with today's examples","Ask someone to share their output file"],
  notes: "Open one question per click and let the room answer with today's examples. The main agent knows the workflow in CLAUDE.md, not the priority rules. The priority logic and the email style belong to subagents. A tool is needed when the answer depends on data outside the project. The transaction facts came from the Excel file, but only through get_transaction. Ask one or two people to share an output file on screen."
},

{ // Slide 16
  title: "n8n or Claude Code?",
  kicker: "DAY 4 · REVIEW",
  subtitle: "Both can run this workflow. They are good at different things.",
  type: "concept",
  layout: "compare",
  visual: { stepThrough: true },
  columns: [
    { title: "n8n", items: [
      "A fixed flow you can see on one canvas",
      "Starts on its own: chat, form, schedule, webhook",
      "Hundreds of ready-made integrations",
      "Easy for a team to read and reuse"
    ] },
    { title: "Claude Code", items: [
      "A flow you describe in text and files",
      "The agent decides which specialist to call",
      "Works inside a project with files and output",
      "Easy to change: edit a Markdown file"
    ] }
  ],
  tagline: "Ask the room: which of your own workflows fits which tool?",
  keyPoints: ["Not a winner, a choice","n8n: fixed, triggered, visible","Claude Code: flexible, in a project","Ask for examples from their work"],
  notes: "There is no winner here. n8n is strong when a flow must run on its own, on a trigger, the same way every time, and the team should see it on a canvas. Claude Code is strong when the work happens in a project, the steps vary, and you want to change the behaviour by editing a file. Ask two or three people for a workflow from their own work, and which tool they would choose."
},

{ // Slide 17
  title: "What did you learn?",
  kicker: "DAY 4 · CLOSING",
  subtitle: "Complete these statements.",
  type: "recap",
  tagline: "Complete each statement for yourself.",
  visual: { sentences: true, quietTimer: 3 },
  cards: [
    { title: "CLAUDE.md is…", body: "" },
    { title: "I give work to a subagent when…", body: "" },
    { title: "MCP lets an agent…", body: "" },
    { title: "I still have a question about…", body: "" }
  ],
  keyPoints: ["Three quiet minutes","Let people write first","Collect a few answers aloud","Questions on the flipchart"],
  notes: "Give three quiet minutes to complete the statements, then collect a few out loud. Write the open questions on the flipchart."
},

{ // Slide 18
  title: "Thank you!",
  kicker: "DAY 4 · CLOSING",
  subtitle: "From a canvas in n8n to agents in Claude Code.",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["Thank the room","Point to the next day","Keep it short"],
  notes: "Thank everyone and say in one sentence what comes next in the programme."
}

];
