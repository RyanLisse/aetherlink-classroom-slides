# Facilitate Days 4 and 5

Use this checklist with the current slides and participant repositories. The
slides set the lesson order and contain the prompts that you share in class.

## Prepare a clean teaching copy

1. Keep participant work and your demo work in separate folders.
2. In an existing clean trainer clone, run `git status --short`.
3. If the output is empty, run `git pull --ff-only`.
4. If the output is not empty, preserve the work and make a fresh sibling clone.
5. Check Node.js 22 or newer, Git and a signed-in Claude Code session.
6. Reuse an existing slide server. If none is running, run `python3 serve.py 8080`.

Open these pairs from the same server:

| Day | Projector | Trainer screen |
| --- | --- | --- |
| Day 4 | `http://localhost:8080/day4-final.html#1` | `http://localhost:8080/day4-final-presenter.html` |
| Day 5 | `http://localhost:8080/day5-daily-brief.html#1` | `http://localhost:8080/day5-daily-brief-presenter.html` |

Each of these two decks also has a day sheet: the **Day 4 sheet** or **Day 5 sheet** button in the deck. It lists
every slide with its time, key points, warnings and prompts.

Open the projector deck first. Then click **Presenter view** or press `S` in the
same browser and origin. The presenter window follows the projector slide.

The participant deck stays on the projector. The presenter notes include the
video clips. They also provide the predict, play, pause and participant-proof
cues for the trainer.

Share each copy-ready prompt in the class chat. Participants follow the slide's
**Type this in** label: Claude Code, Terminal 2, or the browser agent chat. They
inspect the result and stop at the stated review point.

## Prepare Day 4 before class

Teach from `day4-final.html`. Nothing must be built before class. The solved
steps are on the `trainer/solution` branch of the participant repository. See
the **Trainer** section of its
[`SOLO.md`](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/blob/main/SOLO.md).
Create a separate trainer clone. Do not switch the participant clone. Run:

```sh
git clone --branch trainer/solution --single-branch https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent.git aetherlink-day4-trainer
cd aetherlink-day4-trainer
npm ci
npm run verify
npm run check:1 && npm run check:2 && npm run check:3
node day4-sdk-parity/verify.mjs
```

The verify command reports 24 passing tests. All three checks pass on that branch. Run each demo once before class:
`npm run lesson1 -- MSG-06`, `npm run lesson2 -- MSG-05` and
`npm run lesson3 -- MSG-08`. A real run depends on your login and on your own
Claude Code settings, because the lessons load project and user settings.

Participants stay on `main`. On `main` the checks are red before a step. That
is correct. A participant who falls behind pastes the prompt of the current
step again. Nobody copies files from `trainer/solution`.

Use the [final Day 3 workflow](assets/workshop-4/day3-review-queue.json) to trace one chat message through to a saved draft. The starter has an older reference at `n8n/support-triage.json` used by its tests. Keep both files. For the extra exercise, the [Day 3 consultation workflow](assets/workshop-4/day3-extra-consult.json) shows the Risk Agent connected to the Customer Reply Agent. During the memory assignment, keep curated
`memory.md` files separate from transcripts and technical logs. Test a
fresh-session readback and ticket isolation.

For Assignment 5, open the included `day4-sdk-parity/` folder. For an earlier clone, unpack the [SDK exercise](assets/day4-sdk-parity.zip) in the project root. Run `node day4-sdk-parity/verify.mjs`. The offline check exercises draft storage. During a live run, inspect the saved customer reply before recording the result. If the account has reached its model limit, record the live outcome as OPEN.

The day has four blocks of 60, 120, 90 and 45 minutes. It starts at 10:00.
Lunch is from 13:15 to 14:00. The breaks are at 11:00 and 15:30.

## Run Day 5: the Daily Brief agent is the main lesson

Teach from `day5-daily-brief.html`. Participants use
[`AetherLink-bv/aetherlink-daily-brief-lab-s1`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1)
on `main` and do all seven steps in class: A1 to A4 before lunch, A5 to A7
after lunch. The lab uses sample data only. It needs no API key. Each step
ends with a file and a proof. Participants open a pull request only after the
human review in step 7. Nothing is merged or deployed.

Sonny, the SRE agent, is the bonus. Its slides are the bonus block at the end of
the same deck.

## Keep Sonny, the SRE agent, as the bonus

Use the bonus when a participant finishes the Daily Brief steps early.
Participants use [`workshop/start`](https://github.com/AetherLink-bv/sre-oncall-agent/tree/workshop/start)
and do the assignments in order. They stop where the day ends. Start with
INC-1001 and the customer impact.

Use any terminal at the participant clone's root and run `claude`. Review the
displayed path. Accept trust only for the participant's own clone. Restart
Claude Code if project skills remain missing after trust. Never bypass trust
or approve an unfamiliar folder. Cursor is optional; if it opens **Agents**,
choose **IDE** and use its terminal.

Use the repository's
[`FACILITATOR.md`](https://github.com/AetherLink-bv/sre-oncall-agent/blob/workshop/start/FACILITATOR.md)
for the time boxes and recovery notes. Use its
[`SOLO.md`](https://github.com/AetherLink-bv/sre-oncall-agent/blob/workshop/start/SOLO.md)
for the matching assignments. Every Copy prompt in the deck must match the
corresponding `SOLO.md` fence exactly.

At the start, the main test suite is green. The workshop tests are red for the
unfinished A3, A4, A5 and A8 contracts. Reuse existing services on ports 4310
and 4320. Do not start duplicate shop or console processes.

The SRE repository already includes the skills used by the lesson. Participants
do not need to install the full skills pack globally. Start explicit skill
prompts with `/show-me`, `/design-control-loop`, `/verify-this`, or `/handoff`.
The `/sdlc` mod is an optional visual route through the first prompt of each
assignment.

The core product is offline and scripted. A real model investigator is
optional. Never present scripted output or an older clip as current model
evidence. Each presenter clip is illustrative. Pause on the evidence boundary,
then inspect the participant's own result.

In A4, the participant edits `.claude/hooks/guard.mjs`. Replace the `TODO(A4)`
comment immediately before `else if (SDLC_ARTEFACT.test(rel))` with
`else if (rel === "bench/ratchet.json") decide("deny", "guard: ratchet is human-owned");`.
Claude Code reviews the edit and runs the focused test. It does not make the
human-owned edit.

Use the one-minute listener setting from A1. If port 4320 is free, start the
console with `AGENT_LISTEN_WINDOW_MIN=1 npm run console`. If an owned console
already uses the default five-minute window, let the human accept that wait or
restart only that owned console.
