# Day 4 participant walkthrough

> **Historical audit.** This document records an earlier 74-slide route with
> solved step branches. Do not use it to run the current lesson. Use
> [`workshop4.html`](../workshop4.html), the current participant repository
> [`README.md`](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent)
> and the central [`FACILITATOR.md`](../FACILITATOR.md). The current route keeps
> participants on their own unsolved `main` branch.

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
| 2 · Subagents | 34-42 | walked, fixed | [#29](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/29) (main), #30 to #35 | this branch |
| 3 · MCP | 43-48 | walked, fixed | [#43](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/pull/43) (main), #44 to #49 | this branch |
| 4 · Check | 49-51 | walked, fixed | #50 to #56 | none needed |
| Assignment | 53-67 | walked, fixed | #57 to #63 | this branch |
| 5 · Homework | 68-71 | walked | #61 to #63 (catch-up line) | none needed |

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

## Step 2 · Subagents (slides 34-42)

Walked on package `main` at `88caada` with Step 1 built, following SOLO.md Option A literally and checking
Option B. The slides lead; SOLO.md Step 2 now follows slides 38 to 42.

| # | What the participant sees | Why it matters | Fix | Where |
| --- | --- | --- | --- | --- |
| 1 | One Step 2 message costs $5.13 on one account and $1.70 on a Worldline account. | Every subagent also loaded the claude.ai connectors of the participant's account. | claude-code runs always pass `--strict-mcp-config`: $0.13 to $0.15 per message on both accounts. | Package #29 to #35 |
| 2 | A run can print three results with three different `Switch` lines. | `CLAUDE_CODE_FORK_SUBAGENT` in the shell or settings splits the run. Seen from inside a Claude Code session; a normal terminal gives one result. | The settings `env` block is filtered to login and provider variables. | Package #29 to #35 |
| 3 | SOLO says "add lesson2 after lesson1" and "update verify" in words. | Editing JSON from a description is where non-technical participants get stuck. | SOLO gives both lines literally. | Package #29 to #35 |
| 4 | Slide 36 says the top of an agent file holds "name and tools". | The files hold `name` and `description`; tools are set in code. | Slide 36 card and teach script corrected. | This branch |
| 5 | Slide 37 says "No extra code". | SOLO Build 2 writes a loader (`lib/agents.mjs`). True for Claude Code itself, not for the package. | Slide 37 says both. | This branch |
| 6 | SOLO and `step-2` can drift apart. | Same failure as Step 1. | `test/solo-step2.test.mjs` on `step-2`, mutation-checked. | Package #31 |

Option A from SOLO.md gave files identical to `step-2` and `verify` 23/0. Option B gave `verify` with no failures.
Live after the fix: MSG-05 and MSG-10 each show `Agent → risk-agent` then `Agent → customer-reply-agent`; the MSG-10
draft asks only for the missing facts. Description test with `Helps with things.`, run twice: the risk expert still ran both times,
as slide 40's watch line expects.

The trainer's `worldline` shell function does not change this on its own: the lessons start the `claude` binary
directly, so only its environment reaches them, not its `--strict-mcp-config`. Its env file is still empty.

## Step 3 · MCP (slides 43-48)

Walked from a Step 2 state, following slide 46 literally. Step 3 is a copy step: participants take the files from
`step-3` and read along.

| # | What the participant sees | Why it matters | Fix | Where |
| --- | --- | --- | --- | --- |
| 1 | After slide 46 step 1, `npm run verify` fails: 19 pass, 1 fail in `test/step0.test.mjs`. | Slide 46 copies `lib/` from `step-3`; main's Step 0 test needs the empty-options guard that only main's `lib/run.mjs` had. Introduced by the Step 0 fix. | `lib/run.mjs` and `test/step0.test.mjs` are now the same on every branch. | Package #44 to #49 |
| 2 | SOLO's Step 3 code differs from the files the participant just copied. | Four of six excerpts had drifted, including a different orchestrator prompt. | The read-along code is generated from `step-3`, and `test/solo-step3.test.mjs` keeps it exact. | Package #43 to #49 |
| 3 | "Write each label down", but where is it? | Step 3 prints no `Switch` line; the label is in the draft. | Slide 46 and SOLO say: under `Result` in the draft. | Package #43 to #49, this branch |

Live: MSG-08 high, MSG-07 medium, MSG-09 medium, matching the trainer key; $0.20 to $0.26 per message. The trace shows
`customer-context-agent` calling `get_customer` and `risk-agent` calling `get_transaction`, once each. The MSG-08 draft
lists the TX-1014 facts under `External data`. Rerunning a message whose draft exists shows one harmless
`File has not been read yet` line before the write succeeds.

## Step 4 · Check (slides 49-51)

`npm run check` behaves as slides 50 and 51 say: the first run creates `labels.json`, a wrong label gives `revise`,
and labels from the live runs give 6/6 and 9/9 PASS. Fixed in SOLO (package #50 to #56): `main` and `step-4` had two
different Step 4 texts; labels for MSG-01 to MSG-09; where to save the acceptance table
(`participant-output/acceptance-table.md`); `git stash -u` before `git switch`.

## Assignment (slides 53-67)

Walked the starting point on `step-4` and the finished state on `solution`. `check:assignment` on `step-4` shows
Core 14 to fix and Stretch 20 open (slide 60); on `solution` both pass (slide 61). `hook:demo`: allow for small
and read, ask for large, add and delete (slide 57). MSG-08 reports `ESCALATE` with no write (slide 63).

| # | What the participant sees | Why it matters | Fix | Where |
| --- | --- | --- | --- | --- |
| 1 | `step-4` SOLO has an older assignment text than `solution`. | Participants work on `step-4`. | One assignment text on `step-4`, `solution`, `facilitator`. | Package #61 to #63 |
| 2 | The check wants exact sentences and files SOLO only describes: three `CLAUDE.md` rules, `03-mcp/claude-project/.mcp.json` with `TRANSACTIONS_WRITES_ENABLED`, `.claude/settings.json` hooks, `buildResolveOptions()`. | A participant who writes "only transaction-agent may write" stays red. | SOLO gives them literally. On a fresh `step-4` the literal blocks alone take the to-do list from 14 to 8; the 8 left are coding tasks. | Package #61 to #63, slide 62 |
| 3 | Slide 65: "npm run resolve -- MSG-07, answer N". | With the default backend nobody is asked: the hook denies the €899 change by itself (fail-safe). The question needs `--backend sdk-login` in a terminal. | Slide 65 and SOLO Part 4 say so. | This branch, package #61 to #63 |
| 4 | `resolve` on `sdk-login` costs $5.03. | The SDK backends still loaded the account's claude.ai connectors. | `strictMcpConfig` for the SDK backends: $0.19. | Package #57 to #63 |

Verified on `solution` in a pseudo-terminal: `Approve update_transaction (TX-1007, amount 899)? [y/N] N` gives
`Denied by a human reviewer`, no retry, no draft.

## Step 5 and close (slides 68-74)

`cd 05-build-your-own && node agent.mjs --dry-run` prints the Claude Code command with prompt, tools and permission
mode, as slides 69 to 71 say. SOLO's catch-up line gained `git stash -u`. Open suggestion, not changed: a real
`node agent.mjs` run at home does not pass `strictMcpConfig`, so it also loads the participant's claude.ai connectors.

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
