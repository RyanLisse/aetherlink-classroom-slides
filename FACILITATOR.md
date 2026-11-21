# Facilitate Days 4 and 5

Use this checklist with the current slides and participant repositories. The
slides set the lesson order and contain the prompts that you share in class.

## Prepare a clean teaching copy

1. Keep participant work and your demo work in separate folders.
2. In an existing clean trainer clone, run `git status --short`.
3. If the output is empty, run `git pull --ff-only`.
4. If the output is not empty, preserve the work and make a fresh sibling clone.
5. Check Node.js 20.12 or newer, Git and a signed-in Claude Code session.
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

The participant deck stays on the projector. The presenter notes provide the
timing, questions, reveal cues and participant-proof checks for the trainer.

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

Use the [Day 5 story script](DAY5-STORY.md) for the opening, assignment
transitions and closing. As in Sonny, begin with the participant's situation
before introducing the tools. The participant builds and accepts the result.
The trainer guides the practice. Bree is the application they build today.

Use the right arrow or click to reveal the scene one beat at a time.
Ask the question before revealing the answer. The Aetherbot guides attention
or represents the participant, as its label states. Bree is the application. Follow the slide titles rather than
fixed slide numbers. Assignment slides remain fully readable.

Teach from `day5-daily-brief.html`. Participants use
[`AetherLink-bv/aetherlink-daily-brief-lab-s1`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1)
on `main` and complete A1 to A4 before lunch and A5 to A7 after lunch.
Open the presenter view and a separate demo checkout before class.
The lab includes `/visual-plan` and `/create-verification-skill` under
`.claude/skills/`. Introduce each skill before its first use.

Before A5, confirm the organization-approved model route and the existing
approved Jira MCP are available. Participants inspect the existing setup with
`/mcp`. They do not install a connector. Their live scope is limited to their
own permitted Jira work items. Work email is not allowed. Missing approval,
authentication, configuration, access or evidence stays `OPEN`.
On **Restart with the approved source**, make `AETHERLINK_JIRA_MCP_CONFIG`
available privately as the path to an existing approved Jira-only MCP
configuration. Participants close the synthetic-only session and run the file
check before restarting with `--permission-mode default --strict-mcp-config
--mcp-config "$AETHERLINK_JIRA_MCP_CONFIG"`. They confirm the approved Vertex
route with `/status` before `/mcp`. The selected setting sources exclude local
settings. `.bree.local.json` records runtime approvals; it is not MCP server
configuration. The SDK process must load the selected server definition again
through `mcpServers`; it does not inherit the interactive CLI session.
Start by asking what participants need to decide before their first meeting.
Let them answer the Day 4 recap before revealing the cards. In the demo checkout,
run `npm run brief:sample`. Open `out/latest.html` next to the fictional
calendar fixture and trace the example 09:00 stand-up line. State that A1 is a
synthetic learning slice, not the finished Bree agent.

Teach the two ground-rule slides before A1. Keep Bree private and individual.
Do not use customer data. Do not store credentials, internal connector URLs or
raw Jira responses. The host may store only validated dated HTML under
`~/.bree/briefs/` with private permissions. Do not record, project or commit
that live artifact. A local process can still send permitted source data to the
approved company model route.

Use this phase map when participants ask where they are. It follows the six
stages in the official AI-native SDLC playbook, but keeps delivery local:

| Phase | Artifact | Proof in class |
| --- | --- | --- |
| Plan | A1 accepts `intent.md`; A7 applies the same problem framing to a new small application | The A1 line and one visible A7 result |
| Design | Accepted `docs/spec.md` | The same schema test red and green |
| Build | Accepted visual plan, full HTML renderer and one exact Jira MCP tool | Human approval, focused tests, `live:check` and dated artifact `PASS` or `OPEN` |
| Test | `.claude/skills/verify-bree/` and `docs/evidence.md` | Complete, `OPEN`, `CONFLICT` and one complete synthetic app journey |
| Deploy | Accepted A5 and A6 commits plus an uninstalled trigger proposal | Dated private HTML, current and previous versions, command, logs, rollback and owner |
| Maintain | One observed A6 result becomes a new intent and check | The command, one output line and human acceptance |

A3 starts Build because the official playbook starts Build in plan mode. A6 is
only a local Deploy exercise. Do not describe it as CI, publication or a
production release.

Prepare the isolated demonstration snapshots. Use the same finished brief for A4.
Each assignment reserves time for a short demo, an individual build and a
four-minute class check. Repeat the prepared demo when the class needs it again.
Give participants their own build time and ask everyone to verify their own
result. Invite one person to share the visible result during the class check.
For A7, demonstrate how to scope a problem and read the criteria aloud.

Before the route, use the source link on “A brief worth opening” to open
`assets/day5-daily-brief-teach/bree-example.html`. Scroll every section from
title and date through sources. Point to `OPEN` and `CONFLICT`, then return to
the slide. This full synthetic page is the product target, not live proof.

After A4 passes completely, you may demonstrate one optional decorative image
with `https://picsum.photos/id/1015/1200/400`. It requires no key or account.
It is public network content, not AI generation, source evidence or a new tool
permission. Add alt text. Keep a local placeholder or omit the photo when
offline; the complete brief must still render.

The assignment clips are illustrative demonstrations. They do not prove live Jira
access or current model behaviour. Keep fixtures synthetic and never record
live work data. Each clip shows the matching local step and evidence boundary:

| Clip | Recorded demonstration |
| --- | --- |
| A1 Part 1 | Choose and approve one user and morning decision. |
| A1 Part 2 | Run the mini test red, implement `mini.ts`, rerun green and show the decision line. |
| A2 Part 1 | Reverse engineer and approve the complete contract. |
| A2 Part 2 | Run the schema test red and green, including one rejected invalid sample. |
| A3 | Run `/visual-plan`; inspect fixtures and one exact Jira tool feeding the same schema, renderer and dated private HTML; review the ADR and plan. |
| A4 Part 1 | Run the renderer test red, build the complete brief, rerun green and open every section. |
| A4 Part 2 | Add one house-style test red, make the smallest change and prove the full brief still opens. |
| Restart with the approved source | Check the private Jira-only config path, restart Manual mode, and confirm the approved route with `/status`. |
| A5 Part 1 | Inspect `/mcp`, select one exact tool and approve focused failing boundary tests, including failed results and unexpected tools. |
| A5 Part 2 | Preserve the private config, build the bounded SDK route and run `live:check`. |
| A5 Part 3 | Let the participant run `brief:live` privately and record only `PASS` or `OPEN`. |
| A6 Part 1 | Parse and render `ordinary-brief.json`, `missing-brief.json` and `conflict-brief.json` through the real schema and renderer. Do not render the same completed sample three times. |
| A6 Part 2 | Run `/create-verification-skill`, one synthetic journey and the complete local gate. |
| A6 Part 3 | Review the uninstalled trigger proposal, then continue to the worktree proof. |
| A7 | Choose one bounded Jira, GitLab, Confluence or mock Outlook mission; run one synthetic test red and green; show the source boundary and visible result. |

Regenerate the illustrative clips from the current deck and solution:

```sh
node tools/render-day5-guide-videos.mjs
```

The renderer uses synthetic data. It must not capture live Jira output,
credentials, internal URLs or the trainer-only connector appendix.

A1 ends with one synthetic calendar item becoming one useful line. A2 reverse
engineers the safe Dia-style structure and shows the same schema check red and
green. A3 saves the visual plan and design files only after approval. A4 builds
and opens every section of the complete synthetic HTML brief. A5 connects one
exact read-only Jira MCP tool through the Claude Agent SDK.
Run `npm run live:check` before any private live run. Run `npm run brief:live`
only after approval. The agent returns validated DailyBrief data. The host
writes only the validated artifact to `~/.bree/briefs/YYYY-MM-DD.html` with
private permissions. Provider and client retention follow company policy.

A6 creates `.claude/skills/verify-bree/`. Its three full fixtures run through
the real schema and renderer; the same completed sample is not rendered three
times. A6 then executes one complete synthetic app journey and reviews a local
daily trigger proposal. The proposal names the command, working directory, private
logs, rollback and owner. Do not install or enable a scheduler. Then A6 runs
HEAD and HEAD^ in separate detached worktrees. HEAD^ is the recovery proof. Before A7, each
participant chooses one result they actually saw in A6. They add a separate
`## Next iteration` section to `intent.md` with the command, one output line,
what worked, the risk, one intended improvement and its next check. They do not
overwrite the accepted first intent.
A person accepts or revises that next iteration. Do not invent a bug or claim
autonomous monitoring. A7 is a small transfer to an application chosen by the
participant, not a second complete lifecycle. Do not supply an implementation prompt for A7. Close with Show,
Tell, Ask. Have participants show a result, tell what it helps someone decide,
and ask a peer about their next check.

In A2, approve the proposed specification before Claude Code writes the test
and implementation. In A5, inspect the SDK options and exact allowlisted Jira
tool before any live run. Keep synthetic and live evidence separate.
After accepting A5, commit its working result before starting A6. Then commit
the accepted A6 result. Check both commit identities before the recovery demo.

The participant route uses no CI and opens no pull request. Keep delivery and
rollback local. Use one project skill only when it supports the current proof:
`/grilling` in A1, `/eli5` in A2 and A5, `/visual-plan` in A3,
`/verify-this` in A4, `/create-verification-skill` in A6 and `/handoff` in A7.
Do not run `/review-and-ship` during the lesson.

If the managed Jira MCP is missing or cannot authenticate, stop the live step.
Do not expose internal registry URLs on the projector. Use the local trainer
appendix `trainer-private/day5-mcp-troubleshooting.md` privately. Repair only
the managed setup. The participant records live proof as `OPEN` and continues
with synthetic verification.

After the Daily Brief close, offer the optional synthetic voice change request.
Participants may skip it without losing the accepted core result. Use a personal
free ElevenLabs account and a restricted Text to Speech key. Save the key only
in ignored `.env.local`. Never use a shared trainer key. Never show the key.
Tests mock `fetch` and use no credits. Only the participant may choose to run
`npm run brief:voice`; it sends synthetic summary and top todos and may consume
credits. Keep the HTML route unchanged. If account or API access fails, mark
audio `OPEN` and continue. Do not claim the lesson author live-tested audio.

After the optional voice change request, use the scene transition from the 08:30 meeting
to the 03:45 incident. The same SDLC now supports an on-call SRE agent.
The scope and responsibility change: participants inspect an incident and
review a proposed action. They do not reuse Bree as an incident agent.
Open the separate Jessy deck only when the class chooses the bonus.

## Optional bonus: Sonny, the on-call SRE agent

This is the earlier Day 5 route. It is not the current main lesson. Open
`day5-jessy.html` on the projector and `day5-jessy-presenter.html` on the trainer
screen for the optional on-call SRE bonus after the Daily Brief steps.

Participants use [`workshop/start`](https://github.com/AetherLink-bv/sre-oncall-agent/tree/workshop/start)
and follow the required A1 through A6 route. A8 is the human gate inside A6.
A7 and A9 are optional. Start with INC-1001 and the customer impact.
Define AI-native SDLC near the start so participants understand where a person reviews the agent’s work.

Use any terminal at the participant clone's root and run
`claude --setting-sources project --strict-mcp-config --no-chrome`. Review the
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
