/* ==========================================================================
   Aetherlink x Worldline — Day 7 deck (Jessy): the team project, second
   hackathon day. Finish, test, show. Follows day6-team-project-slides.js:
   same teams, same idea, same canvas and plan, same presentation checklist.
   One slide = one object in order. The field reference (title, kicker,
   visual, teach …) is at the top of day6-team-project-slides.js.
   ========================================================================== */
window.SLIDES = [

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
      {say: 'Name the gaps out loud: “Question 5 was hard for some teams, so I will ask about it when I visit your team.”'}
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
  notes: "The same seven checks as the closing slide of Day 6 (“Ready for Day 7?”). Each team goes through its own list; click a line to tick it on screen. Anything not ticked becomes the team's first task when the build starts. A team member who missed Day 6 gets the canvas and plan explained by their own team now (notes/team-canvas.md and notes/plan.md).",
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
    watch: ['Do not fix anything now: missing lines become the first task when you start building.', 'Someone missed Day 6: their team shows them notes/team-canvas.md and notes/plan.md.'],
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
  notes: "Click through the six phases (same picture as Day 6 slide 5). Plan and Design were Day 6. Today the teams finish the Build in short rounds, Test it against what they wrote in the canvas, and Deploy here means: show it working to the room. For a hackathon that is enough; real deployment to production needs approval from the owners of that system. Maintain: who owns the app after this week? That goes in the presentation as the next step.",
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
      {do: 'Press → : Maintain.', say: 'Maintain: who owns it after this week? Put that in your presentation as your next step.'}
    ],
    learn: ['Today: Build, Test, and Deploy as a demo.', 'Production needs approval; a demo does not.'],
    watch: ['Do not teach the SDLC again. One sentence per phase.'],
    next: 'the shape of today.'
  }
},

{ // Slide 6
  title: "The shape of today",
  kicker: "DAY 7 · HOW TODAY WORKS",
  subtitle: "One long build, then the presentations, then a debrief.",
  type: "context",
  layout: "steps",
  visual: { stepKeys: true, bot: 'point', place: 'beside' },
  items: [
    { label: "Start check", caption: "What is missing from Day 6 becomes your first task." },
    { label: "Build", caption: "Finish and test your MVP. Claude Code works on your presentation along the way." },
    { label: "Check-ins", caption: "Two minutes per team: what works, what blocks you." },
    { label: "Present", caption: "7–10 minutes per team, 60–90 minutes before the end of the day." },
    { label: "Debrief", caption: "What did we learn, as a group?" }
  ],
  tagline: "Presentations start at [time]. Write it down.",
  keyPoints: ["Start check, build, check-ins, present, debrief", "Presentations 60–90 min before the end", "Leaves time for the debrief", "Say the start time of the presentations"],
  notes: "Press → for each step. Say the real clock time the presentations start: 60 to 90 minutes before the end of the day, depending on the number of teams, so there is enough time for the debrief afterwards. Write it on the whiteboard or in the chat. The facilitator role is the same as on Day 6: we ask questions, keep time and unblock; the team decides and builds.",
  teach: {
    time: '2 min',
    gist: 'Today in five steps: start check, build, check-ins, present, debrief. Say when the presentations start.',
    script: [
      {do: 'Slide appears. Press → : Start check.', say: 'First: what is still missing from Day 6? That is your first task.'},
      {do: 'Press → : Build.', say: 'Then you build. Finish your MVP and test it. Claude Code works on your presentation along the way.'},
      {do: 'Press → : Check-ins.', say: 'In between, short check-ins. Two minutes per team.'},
      {do: 'Press → : Present.', say: 'Then every team presents. 7 to 10 minutes.'},
      {do: 'Press → : Debrief.', say: 'And we end together with a debrief: what did we learn?'},
      {do: 'Point at the line at the bottom. Write the time in the chat.', say: 'Presentations start at [time]. Write it down.'}
    ],
    learn: ['One long build, then present, then a debrief.', 'The presentations have a fixed start time.'],
    watch: ['Fill in the real time before class: 60–90 minutes before the end of the day.', 'Same roles as Day 6: we ask, the team decides.'],
    next: 'what your presentation needs.'
  }
},

{ // Slide 7
  title: "Your presentation",
  kicker: "DAY 7 · THE PRESENTATION",
  subtitle: "A reminder before you build: Claude Code works on your presentation while you work on your app.",
  type: "context",
  visual: { stepThrough: '.pitch-grid > .card, .slide-main > .tagline',
    pitch: { heroEmoji: '🤖', hero: 'After every round: ask Claude Code to add what you just built to your presentation. Not at the last minute.',
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
  tagline: "Presentations start at [time]. Tell why it matters, not only what it does.",
  keyPoints: ["Reminder, not new: same six as Day 6 slide 19", "Claude Code updates the presentation after every round", "Demo, five pillars, interactive", "Everybody pitches in, 7–10 minutes", "Say the start time again"],
  notes: "A reminder before the build starts, with the same six requirements as Day 6 slide 19. The main message is at the top: the presentation grows while the team builds. After every round, one prompt: 'add what we just built to our presentation'. Then the team doesn't have to make it at the last minute. Say the start time of the presentations again.",
  teach: {
    time: '3 min',
    gist: 'A reminder: Claude Code builds the presentation while you build the app. And what it needs when you present.',
    script: [
      {do: 'Slide appears with the orange line at the top.', say: 'Before you build, a reminder. Claude Code works on your presentation while you work on your app.'},
      {do: 'Point at the orange line.', say: 'After every round: ask Claude Code to add what you just built. Then it is ready when you are.'},
      {do: 'Press → : demo, pillars, interactive.', say: 'When you present, we want: a live demo, your story along the five pillars, something we can try.'},
      {do: 'Press → : Made with Claude Code, Everybody pitches in.', say: 'Made with Claude Code. And everyone has a part.'},
      {do: 'Press → : 7–10 minutes.', say: '7 to 10 minutes. Practise once before you present.'},
      {do: 'Press → : the line at the bottom.', say: 'Presentations start at [time]. Tell us why it matters, not only what it does.'}
    ],
    learn: ['The presentation grows with the app, round by round.', 'Same six requirements as Day 6.'],
    watch: ['Keep it short: the teams want to start building.', 'Fill in the real start time.'],
    copy: [['After every round', 'Add what we just built to our presentation page, in one short section.']],
    next: "let's build!"
  }
},

{ // Slide 8
  title: "Let's build!",
  kicker: "DAY 7 · BUILD",
  subtitle: "",
  type: "concept",
  visual: { bigWord: true, bot: 'think', place: 'bigword', highlight: [{ in: 'title', text: 'build!', tone: 'orange' }] },
  keyPoints: ["One big line: the build starts", "Start with the start-check gaps", "Presentation grows along", "Presentations at [time]"],
  notes: "The switch from talking to building. Leave this on screen while the teams start. Remind them: start with what was missing in the start check, build in short rounds, and after every round let Claude Code add it to the presentation. Say the start time of the presentations one more time.",
  teach: {
    time: '1 min',
    gist: 'The build starts. Start-check gaps first, short rounds, presentation along the way.',
    script: [
      {do: 'Slide appears: one big line.', say: "Enough talking. Let's build!"},
      {say: 'Start with what was missing in your start check. Then short rounds: plan mode, build, try it, commit and push.'},
      {say: 'After every round: add it to your presentation.'},
      {do: 'Point at the clock.', say: 'Presentations start at [time]. We do check-ins in between.'}
    ],
    learn: ['Build in short rounds; the presentation grows along.'],
    watch: ['Walk from team to team. Ask: what works right now, from input to result?'],
    next: 'check-in, during the build.'
  }
},

{ // Slide 9
  title: "Check-in",
  /* run during the build: once mid-morning, once after lunch */
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
  tagline: "Blocked? Say it now, not just before the presentations.",
  keyPoints: ["Same check-in as Day 6", "Two minutes per team", "Solve blockers after, not during", "Run it mid-morning and after lunch"],
  notes: "The same check-in as on Day 6, with the questions turned towards the demo. Run it mid-morning and once after lunch. Two minutes per team. Don't solve problems during the round: note the blockers and visit those teams afterwards. The OPEN security questions go to the security specialist."
},

{ // Slide 10
  title: "Short break",
  kicker: "DAY 7 · BREAK",
  subtitle: "Return in 15 minutes.",
  type: "pause",
  visual: { countdown: 15, bot: 'wave', place: 'beside' },
  cards: [
    { title: "Return in 15 minutes", body: "Continuing with: building." }
  ],
  keyPoints: ["Say the return time", "Press ▶ Start on the timer", "Check in with any team still building"],
  notes: "Say the actual clock time you'll resume. Use the break to check on a team that looked stuck."
},

{ // Slide 11
  title: "Presentations",
  kicker: "DAY 7 · PRESENTATIONS",
  subtitle: "7–10 minutes per team, then 3 minutes of questions. Then the debrief.",
  type: "review",
  visual: { bot: 'happy', place: 'left' },
  cards: [
    { title: "Presenting team", body: "Share your screen. Demo live. Everyone has a part." },
    { title: "Everyone else", body: "One thing that works well. One question. In the room or in the chat." },
    { title: "Facilitator", body: "Keeps time: a sign at 8 minutes, stop at 10." }
  ],
  tagline: "Ask the question you would ask before you used it yourself.",
  keyPoints: ["7–10 minutes + 3 minutes questions", "Feedback: one thing that works, one question", "Online: questions in the chat", "Time sign at 8 minutes"],
  notes: "Start 60–90 minutes before the end of the day, so the debrief has enough time. Say the order of the teams. Each team: 7–10 minutes, then 3 minutes of questions. Everyone else gives one thing that works well and one question, in the room or in the chat; that keeps the online participants involved. Give a sign at 8 minutes and stop at 10. Good questions to model: 'what happens when the AI is wrong?', 'where does a person decide?', 'who would use this tomorrow?'."
},

{ // Slide 12
  title: "Seven days, one route",
  kicker: "DAY 7 · DEBRIEF",
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
  notes: "Start of the debrief. Let the list tick off by itself. One sentence per day is enough. Ask: which piece did your team use most today? Most teams will name Claude Code and the working method, and the human in the loop."
},

{ // Slide 13
  title: "What did you learn?",
  kicker: "DAY 7 · DEBRIEF",
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
