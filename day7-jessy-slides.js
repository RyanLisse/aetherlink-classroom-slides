/* ==========================================================================
   Aetherlink x Worldline — Day 7 deck (Jessy): the team project, second
   hackathon day. Finish, test, show. Follows day6-team-project-slides.js:
   same teams, same idea, same canvas and plan, same presentation checklist.
   One slide = one object in order. The field reference (title, kicker,
   visual, teach …) is at the top of day6-team-project-slides.js.
   ========================================================================== */
window.SLIDES = [

/* ---------------------------------------------------------------------- */
/* DAY 7 — Welcome and recap                                                */
/* ---------------------------------------------------------------------- */

{ // Slide 1
  title: "Welcome to Day 7!",
  kicker: "AETHERLINK × WORLDLINE · DAY 7",
  subtitle: "",
  type: "context",
  visual: { opener: 'welcome', bot: 'wave', place: 'beside' },
  keyPoints: ["On screen as people arrive", "Teams sit together", "Today: finish, test, show"],
  notes: "Have this on screen while people walk in. Ask the teams from Day 6 to sit together (online: keep your team chat open). Short welcome once everyone is in: today is the finish line."
},

{ // Slide 2
  title: "Where we are",
  kicker: "DAY 7 · ROUTE",
  subtitle: "Day 6 your team chose an idea and built a first slice. Today you finish it and show it.",
  type: "context",
  visual: { bot: 'wave', place: 'left', dayRoute: ['Day 1: Claude Code', 'Day 2: skills, agents', 'Day 3: n8n', 'Day 4: Agent SDK', 'Day 5: SDLC, Sonny', 'Day 6: team project', 'Today: AI app'] },
  cards: [
    { title: "Day 6", body: "One idea, a plan for two days, a first slice that works." },
    { title: "Today", body: "Finish the MVP, test it, and show it working." }
  ],
  keyPoints: ["Same route as Day 6", "Day 6: idea, plan, first slice", "Today: finish, test, show", "Presentations at the end of the day"],
  notes: "The same route as on Day 6, one stop further. Day 6 the teams chose an idea with the five pillars, made a two-day plan and built a first slice. Today is the last stop: finish the MVP, test it, and show it working in a 7–10 minute presentation at the end of the day.",
  teach: {
    time: '2 min',
    gist: 'Last stop of the route: Day 6 was idea, plan and first slice; today you finish, test and show.',
    script: [
      {do: 'Slide appears. The route fills in from left to right.', say: 'Same route as last time. One stop further.'},
      {do: 'Point at Day 1 to Day 5.', say: 'Five days of practice: Claude Code, skills and agents, n8n, the Agent SDK, and Sonny on Day 5.'},
      {do: 'Point at Day 6 and the Day 6 card.', say: 'Day 6: your team chose one idea, made a plan for two days, and built a first slice.'},
      {do: 'Point at Today and the Today card.', say: 'Today is the finish line. You finish the MVP, you test it, and at the end of the day you show it working.'}
    ],
    learn: ['Today is the second and last day of the team project.', 'Finish, test, show.'],
    watch: ['Keep it short: the recap comes on the next slides.', 'A team member missed Day 6: their team catches them up during the start check (slide 4).'],
    next: 'what do you remember from Day 6?'
  }
},

{ // Slide 3
  title: "What do you remember?",
  kicker: "DAY 7 · RECAP",
  subtitle: "Without looking back, explain:",
  type: "recap",
  tagline: "Answer from memory first, no peeking.",
  visual: { reveal: 'click', bot: 'peek', place: 'slot', noReact: true },
  cards: [
    { title: "How did your team choose its idea?", body: "" },
    { title: "What is an MVP, and what is yours?", body: "" },
    { title: "What is the source of truth in your app?", body: "" },
    { title: "Why is security a question from the start, not a check at the end?", body: "" },
    { title: "Where does a person decide in your app?", body: "" }
  ],
  keyPoints: ["Cold retrieval", "One question per click", "Teams answer for their own app", "Gaps = what to support today"],
  notes: "Cold retrieval, no notes. Open one question per click. The questions follow Day 6: the five pillars, the MVP, the source of truth, security from the start, and the human in the loop. Let a different team answer each question, about their own app. Whatever the room can't answer is what you support most today.",
  teach: {
    time: '5 min',
    gist: 'Five questions about Day 6, answered from memory and about the team’s own app.',
    script: [
      {do: 'Slide appears with five closed questions.', say: 'Day 6, from memory. I open one question at a time. Answer for your own team’s app.'},
      {do: 'Click question 1.', ask: 'How did your team choose its idea?', say: '(Answer: with the five pillars: interest, gain, problem, team, security. Score 1 to 5 each, the highest total wins.)'},
      {do: 'Click question 2.', ask: 'What is an MVP, and what is yours?', say: '(Answer: the smallest version that shows your idea works, from input to result. Ask one team to say theirs in one sentence.)'},
      {do: 'Click question 3.', ask: 'What is the source of truth in your app?', say: '(Answer: the place where the real, up-to-date information lives. Read it first, change things only with approval.)'},
      {do: 'Click question 4.', ask: 'Why is security a question from the start, not a check at the end?', say: '(Answer: a question during the design costs minutes. The same problem found today costs the demo.)'},
      {do: 'Click question 5.', ask: 'Where does a person decide in your app?', say: '(Answer: AI notices and suggests, a person decides and acts. Ask one team to point at that moment in their app.)'},
      {say: 'Name the gaps out loud: “Question 5 was hard for some teams, so we look at it again during the security check.”'}
    ],
    learn: ['Five pillars, MVP, source of truth, security from the start, a person decides.'],
    watch: ['Let a different team answer each question.', 'Online participants: answer in the chat.', 'Do not teach Day 6 again: one sentence per answer.'],
    terms: [['MVP', 'the smallest version that shows your idea works'], ['Source of truth', 'the place where the real, up-to-date information lives'], ['OPEN', 'not known or not decided yet']],
    next: 'where does your team stand right now?'
  }
},

{ // Slide 4
  title: "Start check: where does your team stand?",
  kicker: "DAY 7 · START CHECK",
  subtitle: "The list from the end of Day 6. Tick off what is done. What is missing becomes your first task.",
  type: "review",
  visual: { checklist: 0, bot: 'point', place: 'left' },
  cards: [
    { title: "From the end of Day 6", body: "the canvas is in the repo\nyou know when your app is successful\nthe first slice works\nCLAUDE.md and settings.json are in place\nsecurity questions are answered or OPEN\nyou have a plan for the presentation\nyou know what to build first today" }
  ],
  tagline: "Missing something? That is your first task this morning.",
  keyPoints: ["Same seven checks as the end of Day 6", "Each team ticks its own list", "Missing = first task", "Catch up anyone who missed Day 6"],
  notes: "The same seven checks as the closing slide of Day 6 (“Ready for Day 7?”). Each team goes through its own list; click a line to tick it on screen. Anything not ticked becomes the team's first task in the next assignment. A team member who missed Day 6 gets the canvas and plan explained by their own team now (notes/team-canvas.md and notes/plan.md).",
  teach: {
    time: '5 min',
    gist: 'The seven checks from the end of Day 6: what is done, and what becomes the first task today.',
    script: [
      {do: 'Slide appears with the list.', say: 'This is the list you saw at the end of Day 6. Let us see where you are.'},
      {do: 'Read each line; click it when the room says done.', say: 'The canvas in the repo? You know when your app is successful? The first slice works?'},
      {do: 'Continue down the list.', say: 'CLAUDE.md and settings.json? Security questions answered or OPEN? A plan for the presentation? And you know what to build first?'},
      {ask: 'Which team still misses something?', say: '(Let each team name one missing line. That is their first task.)'},
      {do: 'Point at the line at the bottom.', say: 'Missing something? That is your first task this morning.'}
    ],
    learn: ['Start from where the team really is, not from where the plan says it should be.'],
    watch: ['Do not fix anything now: missing lines become the first task in the next assignment.', 'Someone missed Day 6: their team shows them notes/team-canvas.md and notes/plan.md.'],
    next: 'the same loop: today is Test and Deploy.'
  }
},

{ // Slide 5
  title: "Same loop, last two phases",
  kicker: "DAY 7 · SDLC",
  subtitle: "Day 6 was Plan, Design and a first Build. Today: finish the Build, Test, and show it.",
  type: "concept",
  visual: { sdlcLine: true, bot: 'point', place: 'beside' },
  tagline: "Build, test, show. Then: who owns it after today?",
  keyPoints: ["Same six phases as Day 5 and Day 6", "Plan + Design: done", "Today: Build, Test, Deploy = show", "Maintain: who owns it after today?"],
  notes: "Click through the six phases (same picture as Day 6 slide 5). Plan and Design were Day 6. Today the teams finish the Build in short rounds, Test it against what they wrote in the canvas, and Deploy here means: show it working to the room. For a hackathon that is enough; real deployment to production needs approval from the owners of that system. Maintain comes at the end of the day: who owns the app after this week?",
  teach: {
    time: '3 min',
    gist: 'The six SDLC phases once more: Plan and Design were Day 6, today Build, Test and show; Maintain at the end.',
    script: [
      {do: 'Slide appears with the six dots, none lit.', say: 'The same six phases. Let us see where you are.'},
      {do: 'Press → twice: Plan, Design.', say: 'Plan and Design: done on Day 6. The canvas and the plan.'},
      {do: 'Press → : Build.', say: 'Build: today you finish the MVP. In short rounds: plan mode, build a little, try it.'},
      {do: 'Press → : Test.', say: 'Test: does it do what you wrote in your canvas? Also with wrong input?'},
      {do: 'Press → : Deploy.', say: 'Deploy, for today: show it working to the room.'},
      {ask: 'Why is showing it to the room not the same as putting it on production?', say: '(Answer: production needs approval from the people who own that system. Security from Day 6: sandbox first.)'},
      {do: 'Press → : Maintain.', say: 'Maintain: at the end of today we ask who owns it after this week.'}
    ],
    learn: ['Today: Build, Test, and Deploy as a demo.', 'Production needs approval; a demo does not.'],
    watch: ['Do not teach the SDLC again. One sentence per phase.'],
    next: 'the shape of today.'
  }
},

{ // Slide 6
  title: "The shape of today",
  kicker: "DAY 7 · HOW TODAY WORKS",
  subtitle: "Three team assignments, then the presentations.",
  type: "context",
  layout: "steps",
  visual: { stepKeys: true, bot: 'point', place: 'beside' },
  items: [
    { label: "Finish the MVP", caption: "Build in short rounds until input → AI step → result works." },
    { label: "Test it", caption: "Does it do what your canvas says? Fix, then check security." },
    { label: "Stop building", caption: "At the stop time you only fix what breaks the demo." },
    { label: "Prepare and rehearse", caption: "Finish the presentation with Claude Code. Practise once." },
    { label: "Present", caption: "7–10 minutes per team. Then: who owns it?" }
  ],
  tagline: "We say the stop time now. Write it down.",
  keyPoints: ["Three assignments: finish, test, prepare", "Stop time: say it out loud", "Presentations at the end", "Check-ins in between"],
  notes: "Press → for each step. Say the real clock times for your day: when the stop time is (about an hour before the presentations) and when the presentations start. Write both on the whiteboard or in the chat. The check-in rhythm from Day 6 stays: once mid-morning and once after lunch. The facilitator role is the same as on Day 6: we ask questions, keep time and unblock; the team decides and builds.",
  teach: {
    time: '3 min',
    gist: 'Today in five steps: finish, test, stop building, prepare, present. Say the stop time out loud.',
    script: [
      {do: 'Slide appears. Press → : Finish the MVP.', say: 'First: finish your MVP. In short rounds, until it works from input to result.'},
      {do: 'Press → : Test it.', say: 'Then test it. Does it do what your canvas says? And a short security check.'},
      {do: 'Press → : Stop building.', say: 'Then we stop building. After the stop time you only fix what breaks the demo.'},
      {do: 'Press → : Prepare and rehearse.', say: 'Then the presentation: Claude Code helps you finish it. And you practise once.'},
      {do: 'Press → : Present.', say: 'At the end, every team presents. 7 to 10 minutes.'},
      {do: 'Point at the line at the bottom. Write the times in the chat.', say: 'Stop time is [time]. Presentations start at [time]. Write it down.'}
    ],
    learn: ['Finish, test, stop building, prepare, present.', 'There is a stop time.'],
    watch: ['Fill in the real times before class: [time] is a placeholder.', 'Same roles as Day 6: we ask, the team decides.'],
    next: 'assignment 1: finish your MVP.'
  }
},

/* ---------------------------------------------------------------------- */
/* DAY 7 — Build: finish the MVP                                            */
/* ---------------------------------------------------------------------- */

{ // Slide 7
  title: "Assignment: Finish your MVP",
  kicker: "DAY 7 · TEAM ASSIGNMENT 1",
  subtitle: "Make it work from input to result. Small rounds, every round ends with something that works.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "One round", body: "plan mode: what is the next small piece?\nbuild it\ntry it: does input → result still work?\ncommit and push\nadd it to your presentation" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Start with what was missing in the start check.",
    "Open notes/plan.md. Pick the next piece that makes input → AI step → result work.",
    "Ask Claude Code in plan mode for a plan for that one piece. Read it, then approve.",
    "Try it yourself. Does the whole app still work, from input to result?",
    "Commit and push. Tell your team what changed.",
    { text: "Add what you just built to your presentation.", note: "One prompt, see the example prompt." },
    "Repeat with the next piece. Tick it off in notes/plan.md."
  ],
  expected: "The MVP works from input to result, it is pushed, and notes/plan.md shows what is done and what is not.",
  check: "Can someone in your team show input → AI step → result right now?",
  prompt: "Read notes/team-canvas.md and notes/plan.md. What is the next small piece we need so our app works from input to result? Make a plan for only that piece. When I approve and it works, add one short section about it to our presentation page, and tick it off in notes/plan.md.",
  keyPoints: ["Type the minutes on the timer", "Start with the missing start-check lines", "One small piece per round", "Plan mode first", "Commit + push every round", "Presentation grows with the app"],
  notes: "Type the minutes on the timer. This is the longest block of the day. Walk from team to team and ask: 'what works right now, from input to result?'. Teams that add features before the main path works: point at the expected line. Every round ends with something that works, a commit and a push, and one line in the presentation; that is the Day 6 message 'let Claude build the presentation while you build'. If two people work in the same repo, the merger from Day 6 merges. The Example prompt reads the canvas and plan so Claude Code picks the next piece from the team's own plan, not a new idea."
},

{ // Slide 8
  title: "Check-in",
  kicker: "DAY 7 · CHECK-IN",
  subtitle: "Every team, two minutes. Short answers.",
  type: "review",
  visual: { reveal: 'click', bot: 'peek', place: 'slot', noReact: true },
  cards: [
    { title: "What works now, from input to result?", body: "" },
    { title: "What do you still need for the demo?", body: "" },
    { title: "What's blocking you?", body: "" },
    { title: "Which security question is still OPEN?", body: "" }
  ],
  tagline: "Blocked? Say it now, not at the stop time.",
  keyPoints: ["Same check-in as Day 6", "Two minutes per team", "Solve blockers after, not during", "Run it mid-morning and after lunch"],
  notes: "The same check-in as on Day 6, with the questions turned towards the demo. Run it mid-morning and once after lunch. Two minutes per team. Don't solve problems during the round: note the blockers and visit those teams afterwards. The OPEN security questions go to the security specialist."
},

/* ---------------------------------------------------------------------- */
/* DAY 7 — Test                                                             */
/* ---------------------------------------------------------------------- */

{ // Slide 9
  title: "Test: does it do what you said?",
  kicker: "DAY 7 · TEST",
  subtitle: "On Day 6 you wrote when your app is successful. Now you check it.",
  type: "concept",
  visual: { stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "The normal case", body: "Real input, the way your user would use it. Do you get the result you promised?" },
    { title: "Wrong input", body: "Empty, too long, the wrong format. Does the app say so, or does it break?" },
    { title: "Tricky input", body: "Text that tries to give the AI new instructions. Does your app still follow your rules?" },
    { title: "The AI is wrong", body: "What happens when the answer is wrong? Who notices, and where does a person decide?" }
  ],
  tagline: "Test against your canvas, not against what happens to work.",
  keyPoints: ["Start from “when is it successful?” in the canvas", "Normal, wrong, tricky input", "What if the AI is wrong?", "Like Day 5: rules you can check"],
  notes: "Press → for each card. The starting point is the canvas line 'when is it successful?' from Day 6: that is what you test against. Four kinds of tests: the normal case; wrong input (empty, too long, wrong format); tricky input, which is prompt injection from the Day 6 security questions; and the AI being wrong, which brings back the human in the loop. Link to Day 5: Sonny's diagnoses went through rules you could check, and the tests showed the rules caught bad ones. Teams don't need the same code, but the same idea: write down what good looks like, then check it.",
  teach: {
    time: '4 min',
    gist: 'Four kinds of tests, starting from the canvas line “when is it successful?”.',
    script: [
      {do: 'Slide appears: title only.', say: 'On Day 6 you wrote down when your app is successful. Now you check if it is true.'},
      {do: 'Press → : The normal case.', say: 'The normal case. Real input, the way your user would use it.'},
      {do: 'Press → : Wrong input.', say: 'Wrong input. Empty, too long, the wrong format. Does the app say so, or does it break?'},
      {do: 'Press → : Tricky input.', say: 'Tricky input. Text that tries to give the AI new instructions. Remember the security questions from Day 6.'},
      {do: 'Press → : The AI is wrong.', say: 'And: the AI is wrong. Who notices? Where does a person decide?'},
      {ask: 'On Day 5, how did you know Sonny’s diagnosis was good enough for the operator?', say: '(Answer: it had to meet the rules of the contract, and the tests showed the contract caught bad diagnoses.)'},
      {do: 'Press → : the line at the bottom.', say: 'Test against your canvas, not against what happens to work.'}
    ],
    learn: ['Test against what the canvas says the app must do.', 'Normal, wrong and tricky input, and the AI being wrong.'],
    watch: ['Teams with automated tests: good. Teams without: a written list of test cases they try by hand is enough.'],
    terms: [['Test case', 'one input and the result you expect'], ['Prompt injection', 'text that tries to give the AI new instructions']],
    next: 'assignment 2: test your app.'
  }
},

{ // Slide 10
  title: "Assignment: Test your app",
  kicker: "DAY 7 · TEAM ASSIGNMENT 2",
  subtitle: "Write down what good looks like, try it, and fix what fails. Then the security check.",
  type: "practice",
  layout: "exercise",
  stepsHeading: "Steps:",
  steps: [
    "Open notes/team-canvas.md. Read “when is it successful?” out loud in your team.",
    "Ask Claude Code for test cases: one normal, two wrong, one tricky, one where the AI is wrong.",
    "The team member who built the least tries every test case.",
    "Write the result per case in notes/test-results.md: works, fails, or OPEN.",
    "Fix the failures one at a time. Most important first.",
    { text: "Do the security check on the next slide.", note: "The security specialist visits every team." },
    "Commit and push."
  ],
  expected: "notes/test-results.md lists five test cases with their result, the most important failures are fixed, and the security check is done.",
  check: "Which test case failed first, and what did you change?",
  prompt: "Read notes/team-canvas.md, especially “when is it successful?”. Write five test cases for our app in notes/test-results.md: one normal case, two with wrong input, one with text that tries to give the AI new instructions, and one where the AI gives a wrong answer. For each: the input, what we expect, and an empty result column. Don't fix anything yet.",
  keyPoints: ["Type the minutes on the timer", "Start from the canvas", "Five test cases", "The person who built the least tests", "notes/test-results.md", "Fix most important first"],
  notes: "Type the minutes on the timer. The person who built the least does the testing: they see the app like a user does, and they did not write the code. The prompt asks Claude Code to write the test cases but not to fix anything, so the team sees what fails first. Fixing happens one failure at a time, most important first, in short rounds like assignment 1. Teams that already have automated tests can add the cases as tests (red first, green after, like Day 5). Plan the security specialist's visit during this assignment."
},

{ // Slide 11
  title: "Security check before you show",
  kicker: "DAY 7 · SECURITY",
  subtitle: "The same five questions as on Day 6. Now with your app in front of you.",
  type: "review",
  visual: { checklist: 0, bot: 'point', place: 'left' },
  cards: [
    { title: "Check together", body: "Data: only the data you are allowed to use goes in\nSecrets: no API keys or passwords in the code or the repo\nThe AI model: tricky input is in your test results\nActions: on production the app notifies, a person decides\nTraces: you can show afterwards what happened\nOPEN: every open question is written down, with who to ask" }
  ],
  tagline: "Aim for “yes, if…”: what has to be true for this to be safe enough?",
  keyPoints: ["Same five questions as Day 6", "Secrets: search the repo", "Tricky input tested", "A person decides on production", "OPEN list with owners"],
  notes: "The five security questions from Day 6 (data, access and secrets, the AI model, actions, traces) turned into checks the team can tick off with the app open. Secrets: ask Claude Code to search the repo and its history for keys and passwords. The AI model: the tricky-input test case from assignment 2. Actions: like Sonny on Day 5, the app may notify and suggest, a person decides on production. Traces: logs, n8n executions, git history. Anything still OPEN gets written down with the person to ask; that also goes in the presentation, because a clear OPEN list is part of a 'yes, if…'.",
  teach: {
    time: '3 min + visit',
    gist: 'The five Day 6 security questions as six checks, with the app in front of you.',
    script: [
      {do: 'Slide appears with the list.', say: 'The same five questions as on Day 6. But now you have an app, so you can check them.'},
      {do: 'Point at Data and Secrets.', say: 'Only data you may use. No keys or passwords in the code. Ask Claude Code to search the repo for them.'},
      {do: 'Point at The AI model.', say: 'The tricky input: that is one of your test cases. Look at its result.'},
      {do: 'Point at Actions and Traces.', say: 'Like Sonny: the app notifies, a person decides. And you can show afterwards what happened.'},
      {ask: 'Why does the OPEN list also go in your presentation?', say: '(Answer: it shows you know what is not safe yet. That is the “if” in “yes, if…”.)'},
      {do: 'Point at the line at the bottom.', say: 'Aim for “yes, if…”.'}
    ],
    learn: ['Security is checked with the app open, not only discussed.', 'OPEN with a name is a good answer.'],
    watch: ['The security specialist visits each team; plan the visits during assignment 2.', 'A team finds a key in its git history: rotate the key, then remove it. Rewriting history alone is not enough.'],
    copy: [['Example prompt', 'Search this repo and its git history for API keys, passwords or tokens. List where you find them. Do not change anything yet.']],
    next: 'the stop time.'
  }
},

{ // Slide 12
  title: "Stop building",
  kicker: "DAY 7 · STOP TIME",
  subtitle: "A small app that works beats a big app that breaks on stage.",
  type: "concept",
  layout: "compare",
  visual: { stepThrough: true },
  columns: [
    { title: "After the stop time, yes", items: [
      "fix what breaks the demo",
      "make the demo input ready",
      "commit, push, tag the version you show",
      "finish the presentation"
    ] },
    { title: "After the stop time, no", items: [
      "new features",
      "a different tool or framework",
      "big changes to the code",
      "“just one more thing”"
    ] }
  ],
  tagline: "What is not done goes in your presentation as the next step.",
  keyPoints: ["Stop time: about an hour before the presentations", "Only fix what breaks the demo", "Tag the version you show", "Not done = next step on a slide"],
  notes: "Say the stop time again. After the stop time teams only fix what breaks the demo. They prepare the input they will use on stage, commit and push, and mark the version they show (a git tag, or just a commit message 'demo version'), so they can go back to it if something breaks during rehearsal. Everything that isn't done becomes a 'next step' in the presentation: that is not a failure, it is the Maintain phase.",
  teach: {
    time: '2 min',
    gist: 'After the stop time: only fix what breaks the demo. Not done goes in the presentation as the next step.',
    script: [
      {do: 'Slide appears. Say the stop time again.', say: 'At [time] you stop building. A small app that works beats a big app that breaks on stage.'},
      {do: 'Press → : the left column.', say: 'After the stop time: fix what breaks the demo, get your demo input ready, push the version you show, and finish your presentation.'},
      {do: 'Press → : the right column.', say: 'No new features. No new tool. No big changes. No “just one more thing”.'},
      {ask: 'What do you do with a feature that is not done at the stop time?', say: '(Answer: it goes in the presentation as the next step.)'}
    ],
    learn: ['There is a stop time; after it, only fix the demo.', 'Not done is a next step, not a failure.'],
    watch: ['Teams will ask for ten more minutes. Give it once, not twice.'],
    copy: [['Mark the demo version', 'git tag demo && git push --tags']],
    next: 'a short break, then the presentation.'
  }
},

{ // Slide 13
  title: "Short break",
  kicker: "DAY 7 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "Continuing with: finishing your presentation." }
  ],
  keyPoints: ["Say the return time", "Press ▶ Start on the timer", "Check in with any team still building"],
  notes: "Say the actual clock time you'll resume. Use the break to check on a team that is still building after the stop time."
},

/* ---------------------------------------------------------------------- */
/* DAY 7 — The presentation                                                 */
/* ---------------------------------------------------------------------- */

{ // Slide 14
  title: "Your presentation",
  kicker: "DAY 7 · THE PRESENTATION",
  subtitle: "The same checklist as on Day 6. Your presentation has been growing all day.",
  type: "context",
  visual: { stepThrough: '.pitch-grid > .card, .slide-main > .tagline',
    pitch: { heroEmoji: '🤖', hero: 'Claude Code built your presentation with you while you built the app. Now you finish it.',
      cards: [
        { emoji: '🎬' },
        { emoji: '🏛️', chips: ['Interest', 'Gain', 'Problem', 'Team', 'Security'] },
        { emoji: '✨' },
        { emoji: '💻' },
        { emoji: '🙌' },
        { emoji: '⏱️' }
      ] } },
  cards: [
    { title: "A live demo of your MVP", body: "Show it working: your input, the AI step, the result." },
    { title: "Your story along the five pillars", body: "Why this idea? Tell it with the same pillars you used to choose it." },
    { title: "Make it interactive", body: "More than slides: a video, a website, a live poll, something people can try." },
    { title: "Made with Claude Code", body: "Your presentation is a web page Claude Code builds with you." },
    { title: "Everybody pitches in", body: "No one hides in the back row: every team member has a part on stage." },
    { title: "7–10 minutes", body: "Short and to the point. Practise once." }
  ],
  tagline: "Tell why it matters, not only what it does.",
  keyPoints: ["Same six requirements as Day 6 slide 19", "Demo, five pillars, interactive", "Made with Claude Code", "Everybody pitches in", "7–10 minutes"],
  notes: "The same six requirements as on Day 6 slide 19 (“Day 7: your presentation”), so nothing here is new. If the teams followed the Day 6 advice, their presentation page already has a section for every round they built. Go through the cards quickly and ask each team which one they still miss.",
  teach: {
    time: '3 min',
    gist: 'The six presentation requirements from Day 6, now as a checklist to finish.',
    script: [
      {do: 'Slide appears with the orange line at the top.', say: 'On Day 6 you saw this slide. Claude Code has been building your presentation with you all day. Now you finish it.'},
      {do: 'Press → : demo, pillars, interactive.', say: 'A live demo. Your story along the five pillars. Something we can try.'},
      {do: 'Press → : Made with Claude Code, Everybody pitches in.', say: 'Made with Claude Code. And everyone on stage has a part.'},
      {do: 'Press → : 7–10 minutes.', say: '7 to 10 minutes. Practise once.'},
      {ask: 'Which of these six does your team still miss?', say: '(Let each team name one. That is where they start in the next assignment.)'},
      {do: 'Press → : the line at the bottom.', say: 'Tell us why it matters, not only what it does.'}
    ],
    learn: ['Nothing new: the same six requirements as Day 6.'],
    watch: ['Keep it short: the teams need the time to prepare.'],
    next: 'assignment 3: finish and rehearse.'
  }
},

{ // Slide 15
  title: "Assignment: Finish and rehearse your presentation",
  kicker: "DAY 7 · TEAM ASSIGNMENT 3",
  subtitle: "Finish the presentation with Claude Code, plan the demo, and practise it once with a timer.",
  type: "practice",
  layout: "exercise",
  cards: [
    { title: "Your story", body: "the problem, and who has it\nwhy this idea: the five pillars\nthe live demo\nwhat you tested, and what is still OPEN\nthe next step" }
  ],
  stepsHeading: "Steps:",
  steps: [
    "Ask Claude Code to check your presentation page against the six requirements.",
    "Write the demo as three steps: this input, this AI step, this result.",
    "Make a plan B: a screen recording or screenshots of the demo working.",
    "Give every team member a part.",
    { text: "Rehearse once, with a timer. Stay under 10 minutes.", note: "Online: rehearse in your team call, with screen sharing." },
    "Fix what went wrong in the rehearsal. Commit and push."
  ],
  expected: "A presentation page that meets the six requirements, a three-step demo with a plan B, and every team member knows their part.",
  check: "Who says what, and how long did your rehearsal take?",
  prompt: "Read notes/team-canvas.md, notes/plan.md and notes/test-results.md. Check our presentation page against these six requirements: a live demo of our MVP, our story along the five pillars (interest, gain, problem, team, security), something interactive, made with Claude Code, a part for every team member, 7–10 minutes. Tell us what is missing, then add it. Add one section with what we tested, what is still OPEN, and our next step.",
  keyPoints: ["Type the minutes on the timer", "Check against six requirements", "Demo in three steps", "Plan B: a recording", "Everyone has a part", "Rehearse once with a timer"],
  notes: "Type the minutes on the timer. The prompt reads all three notes files, so the presentation tells the team's real story: the canvas (problem, pillars), the plan (what was built) and the test results (what works, what is OPEN). Push on plan B: a live demo can fail for reasons the team can't control (Wi-Fi, an API limit), and a short screen recording saves the presentation. Check that every team member has a part. Rehearsal with a timer almost always runs over; 10 minutes is the limit."
},

{ // Slide 16
  title: "Presentations",
  kicker: "DAY 7 · PRESENTATIONS",
  subtitle: "7–10 minutes per team, then 3 minutes of questions.",
  type: "review",
  visual: { bot: 'happy', place: 'left' },
  cards: [
    { title: "Presenting team", body: "Share your screen. Demo live, plan B if needed. Everyone has a part." },
    { title: "Everyone else", body: "One thing that works well. One question. In the room or in the chat." },
    { title: "Facilitator", body: "Keeps time: a sign at 8 minutes, stop at 10." }
  ],
  tagline: "Ask the question you would ask before you used it yourself.",
  keyPoints: ["7–10 minutes + 3 minutes questions", "Feedback: one thing that works, one question", "Online: questions in the chat", "Time sign at 8 minutes"],
  notes: "Say the order of the teams. Each team: 7–10 minutes, then 3 minutes of questions. Everyone else gives one thing that works well and one question, in the room or in the chat; that keeps the online participants involved. Give a sign at 8 minutes and stop at 10. Good questions to model: 'what happens when the AI is wrong?', 'where does a person decide?', 'who would use this tomorrow?'."
},

/* ---------------------------------------------------------------------- */
/* DAY 7 — Closing                                                          */
/* ---------------------------------------------------------------------- */

{ // Slide 17
  title: "After today: who owns it?",
  kicker: "DAY 7 · MAINTAIN",
  subtitle: "The last phase of the loop. An app nobody owns stops working.",
  type: "concept",
  visual: { stepThrough: true, bot: 'think', place: 'beside' },
  cards: [
    { title: "Owner", body: "One name. Who keeps it running after this week?" },
    { title: "Next step", body: "One thing to build in the next month. Small." },
    { title: "Still OPEN", body: "Which questions must be answered before real users get it?" },
    { title: "Who approves", body: "Who must say yes before it touches real data or production?" }
  ],
  tagline: "Write it in notes/next-steps.md before you leave.",
  keyPoints: ["Maintain: the last SDLC phase", "One owner, by name", "One small next step", "OPEN list and who approves"],
  notes: "Press → for each card. This is the Maintain phase from the SDLC line. Many hackathon apps die the week after; a named owner and one small next step make the difference. 'Who approves' links back to Day 6 security: before the app touches real data or production, someone has to say yes. Each team writes the four answers in notes/next-steps.md (Claude Code can do it from a short conversation) and commits it.",
  teach: {
    time: '5 min',
    gist: 'Maintain: one owner, one next step, the OPEN list and who approves. Written down before you leave.',
    script: [
      {do: 'Slide appears: title only.', say: 'The last phase of the loop: Maintain. An app nobody owns stops working.'},
      {do: 'Press → : Owner.', say: 'One name. Not the team: one person.'},
      {do: 'Press → : Next step.', say: 'One thing for the next month. Small.'},
      {do: 'Press → : Still OPEN.', say: 'What must be answered before real users get it?'},
      {do: 'Press → : Who approves.', ask: 'Who in your organisation must say yes before your app touches production?', say: '(Answer: the owners of that system, and security and legal where data is involved, like on Day 6.)'},
      {do: 'Press → : the line at the bottom.', say: 'Write it in notes/next-steps.md before you leave.'}
    ],
    learn: ['Maintain means an owner and a next step.', 'Production needs a yes from the people who own it.'],
    watch: ['A team says nobody will own it: that is a fine, honest answer. Then the next step is “show it to a possible owner”.'],
    next: 'seven days in one look back.'
  }
},

{ // Slide 18
  title: "Seven days, one route",
  kicker: "DAY 7 · CLOSING",
  subtitle: "Every day added one piece. Today you used them together.",
  type: "recap",
  layout: "recap",
  visual: { levelUp: true },
  items: [
    { label: "Day 1: Claude Code and the working method" },
    { label: "Day 2: Skills, agents and workflows" },
    { label: "Day 3: Workflows in n8n" },
    { label: "Day 4: Your own agent with the Agent SDK" },
    { label: "Day 5: The SDLC with Sonny: a person decides" },
    { label: "Day 6: One idea, one plan, security from the start" },
    { label: "Day 7: A working AI app, tested and shown" }
  ],
  keyPoints: ["Seven days, seven pieces", "Each day built on the last", "Today: all of it together"],
  notes: "Let the list tick off by itself. One sentence per day is enough. Ask: which piece did your team use most today? Most teams will name Claude Code and the working method, and the human in the loop."
},

{ // Slide 19
  title: "What did you learn?",
  kicker: "DAY 7 · CLOSING",
  subtitle: "Complete these statements.",
  type: "recap",
  tagline: "Complete each statement for yourself.",
  visual: { sentences: true, quietTimer: 3 },
  cards: [
    { title: "Our app helps…", body: "" },
    { title: "The test that surprised us was…", body: "" },
    { title: "Tomorrow at work I will use…", body: "" },
    { title: "The next step for our app is…", body: "" }
  ],
  keyPoints: ["Three quiet minutes", "Then a few answers aloud", "“Tomorrow at work” is the one that matters"],
  notes: "Three quiet minutes, then collect a few answers. Ask at least two people for 'Tomorrow at work I will use…': that is what the seven days were for. Thank everyone, and thank the security specialist and the teams by name."
}

];
