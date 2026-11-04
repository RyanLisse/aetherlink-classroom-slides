# Day 4 participant walkthrough

A walkthrough of Day 4 (`workshop4.html`, 74 slides) from a participant's seat. Each step follows the
slides and `SOLO.md` literally in a fresh clone of
[`aetherlink-day4-n8n-to-agent`](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent) and
records where a participant gets stuck or confused.

The goal is to make things clearer, not to cut content. Participants should keep learning how to use this in
production in their own work. Each step gets its own pull request in each repo it touches.

| Step | Slides | Status | Package PR | Slides PR |
| --- | --- | --- | --- | --- |
| 0 · Setup | 13-17 | walked, fixed | [#7](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/7) | this branch |
| 1 · One agent | 19-29 | walked, fixed | [#22](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/22) (main), #23 to #28 (step branches) | none needed |
| 2 · Subagents | 34-42 | next | | |
| 3 · MCP | 43-48 | not yet | | |
| 4 · Check | 49-51 | not yet | | |
| Assignment | 53-67 | not yet | | |
| 5 · Homework | 68-71 | not yet | | |

## Step 0 · Setup (slides 13-17)

Walked on macOS, Node.js 24.18.0, Claude Code 2.1.318, on package `main` at `9b91c3e`.

`npm ci`, `npm run doctor` ("meets minimum"), `npm run verify` (9 pass, 0 fail) and the dry run
("dry run — no model call") all behave as the slides say. The output matches the screenshot on slide 17.

### Findings

| # | What the participant sees | Why it confuses | Fix | Where |
| --- | --- | --- | --- | --- |
| 1 | A live run without `--dry-run` on `main` starts a full agent. | The options are still `{}`, so Claude Code gets every tool and the participant's own global Claude settings. In the walkthrough it read the repo with Bash, followed my personal instructions, and cost $3.91 for MSG-01. Nothing on the slides stops someone from leaving off `--dry-run`. | The runner refuses a live run while the options are empty, with one line: "Step 1 is not built yet". | Package #7; slide 16 step 5 and the watch list |
| 2 | Errors appear as a Node.js stack trace. | Non-technical participants read a stack trace as "it is broken". | Lesson errors print one line, `Error: ...`, and exit 1. | Package #7 |
| 3 | The dry run prints a bare `{}`. | Slide 15 says "shows what the agent would receive", but nothing on screen is labelled as settings. | Slides 15 and 17 say the `{}` is the agent's settings, still empty until Step 1. | Slides |
| 4 | The dry run prints `Claude Code equivalent: claude -p "..."`. | It reads as another command to run. | Slide 15 teach script says it shows what happens under the hood, and you never type it. | Slides |
| 5 | Slide 14 teaches `branch` and `git stash -u` as words that "come back all day". | On the main path nobody types them. They only matter for catching up. | Slide 14 frames them as the safety net for falling behind. | Slides |
| 6 | The starter `CLAUDE.md` says to copy text from `FACILITATOR.md`. | That file does not exist on `main`. | It now points at SOLO.md, Step 1 (Build 2). | Package #7 |
| 7 | Every npm line says `aetherlink-day5-n8n-to-agent`. | It is Day 4. It also shows on the slide 17 screenshot and in the teach clips. | Slide 15 watch list tells the trainer it is the internal name. A real rename is open (see below). | Slides |

### Open

- **Package name.** Renaming `aetherlink-day5-n8n-to-agent` to `day4` touches seven branches
  (`main`, `step-1` to `step-4`, `solution`, `facilitator`), the lockfile, the slide 17 screenshot and the
  `assets/day4-teach/a07-*.mp4` clips. That needs its own decision.
- **Slide 16 depends on package #7.** The "Step 1 is not built yet" wording on slide 16 matches the package
  only once #7 is merged.

## Step 1 · One agent (slides 19-29)

Walked on package `main` at `a18b464`, following SOLO.md literally. The slides lead: SOLO.md now follows
slides 22 to 29 in order (1a build, 1b look inside and test memory, 1c six messages and the tone trap).

| # | What the participant sees | Why it confuses | Fix | Where |
| --- | --- | --- | --- | --- |
| 1 | After Build 1 to 3 and the copied test, `npm run verify` fails: `Cannot find module lib/chat-options.mjs`. | Slide 24 says "Look for: fail 0". The copied step-1 test needs a chat refactor that only `step-1` had. Everyone on the hand-built path hits this. | `main` gets the step-1 chat refactor, so `main` plus the three Builds equals `step-1`. | Package #22 |
| 2 | Build 3 says "import it from ./priority-schema.mjs". | Neither SOLO.md nor slide 24 gives the import line itself. | SOLO.md gives the line, and says where the `outputFormat` line goes. | Package #22 to #28 |
| 3 | Before the test is copied, `verify` already passes without the parser hooked up. | It looks done while `outputFormat` is missing. | Slide 24 already has the test-copy step. SOLO now says what a schema failure means. | Package #22 to #28 |
| 4 | SOLO.md order and wording differ from the slides (memory as Build 4, extra chat dry run, "favorite color"). | Trainer and participant read two different scripts. | SOLO Step 0 and 1 rewritten against slides 15 to 29. | Package #22 to #28 |
| 5 | SOLO and the finished branch can drift apart unnoticed. | That is how finding 1 happened. | `test/solo-step1.test.mjs` on every step branch builds Step 1 from SOLO.md and compares it with the branch. It is mutation-checked. | Package #23 to #28 |

Live runs on the claude-code backend, about $0.02 each: MSG-01 low, 02 high, 03 medium, 04 low, 05 high,
06 low. All match the trainer key on slide 27. Tone trap without definitions: MSG-01 and MSG-06 stayed low
twice each. That is what slide 27's watch line expects ("the model got lucky").

## Company login (Vertex AI, Bedrock)

Participants on a Worldline laptop run Claude Code through Vertex AI. That login lives in the `env` block of
`~/.claude/settings.json`. The lessons load only project settings (`settingSources: ['project']`), so the
login never reached them. Last time those participants needed a `.env` file and separate API keys.

Tested alternative: `settingSources: ['project', 'user']`. The login reaches the lesson, but so do the
participant's own `CLAUDE.md`, claude.ai connectors and hooks. On one laptop the triage answer picked up a
personal assistant persona, and the run cost $5.08 against $0.04.

Chosen: the `claude-code` and `sdk-login` backends copy only the `env` block from the user settings into the
agent's environment. A fake `claude` on `PATH` proved the variables now arrive. A real run kept only the
`StructuredOutput` tool and cost $0.018. Not tested on a real Vertex account.

Package PRs, one per branch: main
[#15](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/15), step-1
[#16](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/16), step-2
[#17](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/17), step-3
[#18](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/18), step-4
[#19](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/19), solution
[#20](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/20), facilitator
[#21](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/21).

Teacher note on slides 13 and 16: if a run on a company laptop says it is not logged in, run
`npm run doctor`. The `Login settings` line should name `CLAUDE_CODE_USE_VERTEX`. If it says none, the
company sets the login elsewhere, so follow `docs/SETUP.md`, Company login.
