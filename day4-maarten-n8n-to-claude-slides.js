/* ==========================================================================
   Aetherlink x Worldline — Day 4 classroom deck: n8n to Claude (Maarten)
   21 slides. One slide = one object in order. See README.md "How to edit
   a slide" and the field reference at the top of day3-n8n-slides.js
   before changing anything here.

   Follows the current workshop repository and the local LESSON source:
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
  subtitle: "Last session's support-ticket workflow, rebuilt in Claude Code.",
  type: "context",
  visual: { stepThrough: true, bot: 'point', place: 'left', dayRoute: ['Welcome', 'n8n → Claude', 'Setup', 'Lesson 1', 'Lesson 2', 'Lesson 3', 'Review', 'What you learned'] },
  cards: [
    { title: "What we do", body: "Build the same ticket triage in three lessons: one agent, then two subagents, then external data through MCP." },
    { title: "What you learn", body: "CLAUDE.md, subagents in .claude/agents, and connecting an MCP server." },
    { title: "What you can do with it", body: "Choose between n8n and Claude Code, and move a workflow from one to the other." }
  ],
  keyPoints: ["Same ticket as last session","Three lessons, each adds one thing","Rhythm: explain, demo, try, discuss"],
  notes: "Tell how the day goes. We take the same support tickets as last session and build the triage in Claude Code, in three lessons that each add one thing: one agent with CLAUDE.md, then an orchestrator with subagents, then external transaction data through MCP. Each lesson follows the same rhythm: short explanation, demo, participants try it, discussion."
},

{ // Slide 3
  title: "Last session in n8n",
  kicker: "DAY 4 · N8N ANCHOR",
  subtitle: "A visible workflow connected the ticket, three specialists and a customer-data lookup.",
  type: "concept",
  visual: { stepThrough: true, bot: 'point', place: 'beside' },
  keyPoints: ["AI Agent with a System Message","Reply, Risk and Context specialists","Data Table with Get row(s)"],
  notes: "Keep this slide on n8n. Recall the three specialist roles and the Data Table. The next slide introduces only the Claude Code equivalents."
},

{ // Slide 4
  title: "Today in Claude Code",
  kicker: "DAY 4 · CLAUDE CODE",
  subtitle: "The same responsibilities move into project instructions, agent files and MCP tools.",
  type: "concept",
  visual: { stepThrough: true, bot: 'point', place: 'beside' },
  keyPoints: ["CLAUDE.md for the main session","risk, reply and context agent files","get_customer and get_transaction through MCP"],
  notes: "Map each responsibility once. CLAUDE.md holds the main instructions. Agent descriptions tell Claude when to delegate. MCP tools supply customer and transaction facts."
},

{ // Slide 5
  title: "Today's customer messages",
  kicker: "DAY 4 · N8N → CLAUDE",
  subtitle: "Ten messages in docs/customer-messages.md, the same file in every lesson.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "Tone versus risk", body: "1 and 6 sound urgent. Message 2 is calm but may involve fraud." },
    { title: "Transaction context", body: "7, 8 and 9 contain IDs that become useful in Lesson 3." },
    { title: "Missing information", body: "10 asks for help without enough facts." }
  ],
  keyPoints: ["Same file in every lesson","Tone is not impact","Later lessons add missing context"],
  notes: "Show docs/customer-messages.md. The messages are chosen on purpose: some sound urgent but aren't, one sounds calm but could be fraud, three have a transaction ID that only makes sense once we have the external data, and the last one has too little information. Ask people to keep the numbers in mind: we come back to them in every lesson."
},

{ // Slide 5
  title: "Get the workshop package",
  kicker: "DAY 4 · SETUP · YOUR TURN",
  subtitle: "Clone once, verify the starter, then use the lesson folders during the day.",
  type: "practice",
  layout: "exercise",
  repo: { label: "Open the workshop repository", url: "https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent" },
  cards: [
    { title: "Terminal", body: "git clone https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent.git\ncd aetherlink-day4-n8n-to-agent\nnpm ci\nnpm run verify\nnpm run doctor\nnpm run lesson1 -- MSG-01 --dry-run" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Clone the workshop repository and open it in VS Code.",
    "Run npm ci, then npm run verify and npm run doctor.",
    "Run the Lesson 1 dry run. It must not call a model.",
    "Find docs/customer-messages.md and 01-single-agent. Later lesson folders arrive with the step branches."
  ],
  expected: "The verification passes and the dry run prints the prompt, project folder and dry-run notice.",
  keyPoints: ["Clone and install at the repository root","Verify and run doctor before Lesson 1","Dry run does not call a model"],
  notes: "Give everyone time to clone https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent. Run the commands exactly as shown. npm run verify checks the package and npm run doctor checks Node.js, Claude Code and the selected backend. The dry run shows what Lesson 1 would send without calling a model. Main is the Step 0 starter; step-1 through step-4 contain finished catch-up states."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Lesson 1: one agent + CLAUDE.md                                  */
/* ---------------------------------------------------------------------- */

{ // Slide 6
  title: "Lesson 1: one agent + CLAUDE.md",
  kicker: "DAY 4 · LESSON 1",
  subtitle: "The main Claude Code session does the classification itself.",
  type: "concept",
  visual: { mdfile: 1, highlight: [{ in: 'tagline', text: 'impact and risk', tone: 'orange' }] },
  cards: [
    { title: "Catch up first", body: "git fetch origin\ngit switch step-1\nnpm ci\n\nThen open 01-single-agent/claude-project" },
    { title: "CLAUDE.md", body: "Purpose\nRules\nPriority definitions\nRequired output" }
  ],
  tagline: "The priority depends on impact and risk, not on tone.",
  keyPoints: ["Switch to step-1","CLAUDE.md holds the project rules","Output: Priority + Reason"],
  notes: "Fetch and switch to step-1, run npm ci, then open 01-single-agent/claude-project in VS Code. Walk through CLAUDE.md: it is the system message of last session's AI Agent, but now as a file the agent loads for each run. Point out the rules and the required output. The finished step gives the room a runnable baseline; the exercise temporarily removes the definitions to expose the tone trap."
},

{ // Slide 7
  title: "Lesson 1: try it",
  kicker: "DAY 4 · LESSON 1 · YOUR TURN",
  subtitle: "Run the working baseline, remove the definitions, then compare the same messages.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Watch", body: "message 1: loud, low impact\nmessage 2: calm, possible fraud\nmessage 6: URGENT logo\nmessage 10: missing information" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "On step-1, run npm run lesson1 -- MSG-01, MSG-02 and MSG-06. Note each priority.",
    "Temporarily remove the Priority definitions section from 01-single-agent/claude-project/CLAUDE.md.",
    "Run MSG-01, MSG-02 and MSG-06 again. What changed?",
    "Restore the definitions, then run npm run lesson1 -- MSG-10.",
    "Check whether the result states what information is missing."
  ],
  expected: "With your definitions, the loud messages come out LOW and the calm message about unknown transactions comes out HIGH.",
  keyPoints: ["Run the baseline first","Repeat the same IDs without definitions","Restore the file before MSG-10"],
  notes: "Type the minutes on the timer and press start. Use the npm commands so each message is a fresh case. First record the completed step-1 result. Then remove only Priority definitions and repeat the same IDs. Restore the section before MSG-10. The point is to compare evidence: without definitions the model may follow tone. Do not promise that every model run will fail in the same way."
},

{ // Slide 8
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
  keyPoints: ["Vote first","Answer: LOW","Tone is not impact"],
  notes: "Vote first, then press → to strike the wrong answers. The answer is LOW: an old logo in the portal is cosmetic, however loud the message is. Contrast it with message 2: polite, but three unknown card transactions is a possible fraud case, so HIGH. That is exactly why the definitions say impact and risk, not tone."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Lesson 2: orchestrator + subagents                               */
/* ---------------------------------------------------------------------- */

{ // Slide 9
  title: "Lesson 2: orchestrator + subagents",
  kicker: "DAY 4 · LESSON 2",
  subtitle: "Claude Code becomes the orchestrator. Each specialist owns one job.",
  type: "concept",
  layout: "steps",
  visual: { stepKeys: true, bot: 'point', place: 'beside' },
  items: [
    { label: "risk-agent", caption: "Decides the priority and returns its analysis before the workflow continues." },
    { label: "customer-reply-agent", caption: "Writes the customer email from the message and the risk analysis." },
    { label: "output/", caption: "The orchestrator writes one Markdown file: message, priority, reason, email." }
  ],
  keyPoints: ["CLAUDE.md defines the workflow","Each specialist owns one job","The result lands in output/"],
  notes: "Save Lesson 1 work, fetch and switch to step-2, then open 02-subagents/claude-project. CLAUDE.md now describes the workflow and tells the main session to use specialists. Last session's Risk Agent maps to risk-agent and Customer Reply Agent maps to customer-reply-agent. Customer Context returns in Lesson 3. Step through the four steps; the result is a file in output/ you can review."
},

{ // Slide 10
  title: "What is in a subagent file?",
  kicker: "DAY 4 · LESSON 2",
  subtitle: "One Markdown file per specialist, in .claude/agents/.",
  type: "concept",
  visual: { stagger: 'pop', stepThrough: true, bot: 'point', place: 'beside' },
  cards: [
    { title: "Lives here", body: ".claude/agents/risk-agent.md" },
    { title: "name and description", body: "Like the Description in n8n: tells the orchestrator when to call this agent." },
    { title: "The rest of the file", body: "Like the System Message: priority definitions, rules and what to return." }
  ],
  prompt: `---
name: risk-agent
description: Payment risk and escalation specialist. Reviews one customer-support ticket, assigns priority LOW, MEDIUM or HIGH using the project priority definitions and writes a short internal risk note.
---

# Risk Agent

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
- Risk note: customer risk, complaint risk, urgency, escalate yes/no
- Missing information: none, or a short list`,
  keyPoints: ["One file per specialist","The description says when to call it","The body says how it works"],
  notes: "Open .claude/agents/risk-agent.md. The header between the --- lines has a name and a description: the orchestrator reads the description to decide when to use this agent, exactly like last session's Description field. The rest is the agent's own prompt, like the System Message. The priority definitions now live here. Use the Example prompt button to show the file. Then open customer-reply-agent.md for its style and output rules."
},

{ // Slide 11
  title: "Lesson 2: try it",
  kicker: "DAY 4 · LESSON 2 · YOUR TURN",
  subtitle: "Let the orchestrator run the whole flow, and check who did what.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Check", body: "did the orchestrator call risk-agent?\ndid it wait for the analysis?\ndid customer-reply-agent write the email?\nis there a new file in output/?" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Restore CLAUDE.md, then run git stash -u, git fetch origin and git switch step-2.",
    "Run npm ci and npm run lesson2 -- MSG-05 --dry-run.",
    "Open 02-subagents/claude-project and inspect CLAUDE.md.",
    "Run npm run lesson2 -- MSG-05 and watch risk-agent run before customer-reply-agent.",
    "Open the new file in output/: priority, reason and email all there?",
    "Run message 2 and message 10. Does the email promise anything it shouldn't?"
  ],
  expected: "A Markdown file in output/ per message, with the original message, priority, reason and a proposed email.",
  keyPoints: ["Watch both specialists run","Review the file in output/","The email must not overpromise"],
  notes: "Type the minutes on the timer and press start. Let people watch the delegation: the orchestrator calls risk-agent, then customer-reply-agent. In output/ they should find one file per message. For message 10 the email should ask for missing details; for message 2 it should not invent refunds or causes. Early finishers can change the style in customer-reply-agent.md and run the same message again."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Lesson 3: MCP + external transaction data                        */
/* ---------------------------------------------------------------------- */

{ // Slide 12
  title: "Lesson 3: MCP + external data",
  kicker: "DAY 4 · LESSON 3",
  subtitle: "Two specialists look up customer and transaction facts through narrow read-only tools.",
  type: "concept",
  visual: { plugs: 1, highlight: [{ in: 'tagline', text: 'get_transaction', tone: 'orange' }] },
  cards: [
    { title: "Customer context", body: "docs/customer_context.csv → get_customer → customer-context-agent" },
    { title: "Transaction facts", body: "docs/transactions.xlsx → get_transaction → risk-agent" }
  ],
  tagline: "Data files → MCP servers → read-only tools → specialist agents",
  keyPoints: ["Data files stay outside the agent project","Tools expose customer and transaction facts","Agents receive results, not file access"],
  notes: "Save Lesson 2 work, fetch and switch to step-3, then open 03-mcp/claude-project. docs/customer_context.csv and docs/transactions.xlsx sit outside the agent project. The MCP servers expose narrow read-only tools. customer-context-agent calls get_customer, like last session's Data Table lookup. risk-agent calls get_transaction for transaction IDs. Neither specialist reads the data files itself."
},

{ // Slide 13
  title: "Connect the MCP server",
  kicker: "DAY 4 · LESSON 3",
  subtitle: "Install once, run the offline smoke test, then check both connections.",
  type: "concept",
  visual: { term: [{ c: 'git switch step-3' }, { c: 'npm ci' }, { c: 'cd 03-mcp/transaction-mcp && npm ci && cd ../..' }, { c: 'npm run smoke:mcp' }, { o: 'MCP servers OK — read-only lookups; no model was called.' }, { c: 'claude' }, { o: '/mcp → transactions + customers · connected' }] },
  cards: [
    { title: "1. Install both dependency sets", body: "Run npm ci at the root and inside 03-mcp/transaction-mcp." },
    { title: "2. Prove both tools offline", body: "npm run smoke:mcp calls the customer and transaction servers without a model." },
    { title: "3. Check Claude Code", body: ".mcp.json registers both servers. In Claude Code, /mcp should show customers and transactions." }
  ],
  tagline: "The servers do not run all the time: the SDK or Claude Code starts them over stdio when needed.",
  keyPoints: ["Install both dependency sets","Smoke-test both tools without a model","Use /mcp to verify both connections"],
  notes: "Do this live from the repository root after switching to step-3. Install the root and nested dependencies. npm run smoke:mcp calls get_customer and the transaction tools without a model. .mcp.json already registers both servers for Claude Code, so no manual claude mcp add is needed. Start Claude Code at the repository root and check /mcp. Both local processes start on demand over stdio and stop with the session."
},

{ // Slide 14
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
  keyPoints: ["1007: failed, money reserved","1014: fraud flag","1018: completed, not received"],
  notes: "Before you open each card, read the customer message and ask the room which priority they expect; then open the card and see if the facts change their mind. TX-1007: the payment failed but the amount is reserved, a real problem for one customer. TX-1014: the fraud flag is set and the customer doesn't recognise it, so HIGH. TX-1018: completed on our side but the merchant says nothing arrived. The point: the message alone is not enough; the external facts make the priority defensible."
},

{ // Slide 15
  title: "Lesson 3: try it",
  kicker: "DAY 4 · LESSON 3 · YOUR TURN",
  subtitle: "Connect the server and let the analyst look up the transactions.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Check", body: "did customer-context-agent call get_customer?\ndid risk-agent call get_transaction?\nare both sources named in output/?\nis nothing invented?" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Run git stash -u, git fetch origin and git switch step-3.",
    "Run npm ci at the root and in 03-mcp/transaction-mcp, then run npm run smoke:mcp.",
    "Run npm run lesson3 -- MSG-08 --dry-run, then run MSG-08 live.",
    "Run MSG-07 and MSG-09. Inspect which customer and transaction facts appear in output/.",
    "Ask about TX-9999 in Claude Code at the repository root. It must not invent a record."
  ],
  expected: "The specialists look up external facts before the reply draft, and the output identifies which facts came from each tool.",
  keyPoints: ["Run the offline smoke test first","Trace facts and sources into output/","TX-9999 must return not found"],
  notes: "Type the minutes on the timer and press start. Most problems are setup: the wrong branch, a missing nested npm ci, or Node.js missing. Start with npm run smoke:mcp, then check /mcp. The specialists never open the CSV or workbook directly. With TX-9999 risk-agent should say the transaction was not found instead of making something up."
},

/* ---------------------------------------------------------------------- */
/* DAY 4 — Review and closing                                               */
/* ---------------------------------------------------------------------- */

{ // Slide 16
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
  notes: "Open one question per click and let the room answer with today's examples. The main agent knows the workflow in CLAUDE.md, not the specialist rules. Risk, reply and customer context belong to subagents. A tool is needed when the answer depends on data outside the project. Customer and transaction facts came only through get_customer and get_transaction. Ask one or two people to share an output file on screen."
},

{ // Slide 18
  title: "Choose n8n when the route is fixed",
  kicker: "DAY 4 · REVIEW · N8N",
  subtitle: "The team can see the triggered workflow and every branch on one canvas.",
  type: "concept",
  visual: { stepThrough: true, bot: 'point', place: 'beside' },
  keyPoints: ["Fixed and visible flow","Built-in triggers and integrations","Easy for a team to inspect"],
  notes: "Keep this slide on n8n. Ask for one participant workflow that benefits from a fixed route, trigger, and visible canvas."
},

{ // Slide 19
  title: "Choose Claude Code when the work varies",
  kicker: "DAY 4 · REVIEW · CLAUDE CODE",
  subtitle: "The agent can choose a specialist while files preserve instructions and output.",
  type: "concept",
  visual: { stepThrough: true, bot: 'point', place: 'beside' },
  keyPoints: ["Flexible delegation","Instructions and output live in files","Change behavior by editing Markdown"],
  notes: "Now ask for one workflow whose next step depends on the case. There is no universal winner; choose the control model that fits the work."
},

{ // Slide 20
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
  keyPoints: ["Three quiet minutes","Let people write first","Collect answers and open questions"],
  notes: "Give three quiet minutes to complete the statements, then collect a few out loud. Write the open questions on the flipchart."
},

{ // Slide 21
  title: "Thank you!",
  kicker: "DAY 4 · CLOSING",
  subtitle: "From a canvas in n8n to agents in Claude Code.",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["Thank the room","Point to the next day","Keep it short"],
  notes: "Thank everyone and say in one sentence what comes next in the programme."
}

];
