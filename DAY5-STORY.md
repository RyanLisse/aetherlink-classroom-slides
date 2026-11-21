# Day 5 story script

Use this with the Daily Brief deck and presenter notes. The participant builds and reviews Bree. Claude Code helps create the artifacts.

## The participant story

| Story beat | Participant view |
| --- | --- |
| Goal | I want one dated private morning brief that helps me decide what needs attention. |
| Problem | A fluent answer can hide a missing source, conflicting evidence or an unsafe permission. |
| Guide | The trainer demonstrates one small path. I build and verify my own result. |
| Plan | Frame the decision, reverse engineer the safe structure, approve the route, build the complete HTML, connect one approved source, verify and deliver. |
| Success | I can open the dated HTML, trace every item to evidence and show honest synthetic, source and artifact status. |

## Visual story beats

1. Welcome the class and recap the building blocks.
2. Imagine 08:30 before stand-up.
3. Introduce Bree after the participant problem.
4. Open the full synthetic editorial brief.
5. Reverse engineer its structure: title, date, greeting, summary, one move-work-forward action, top to-dos, new updates, your day and sources.
6. Show fixtures and one approved source producing the same `DailyBrief` schema and HTML renderer.
7. Build Bree through A1 to A6. Apply the method independently in A7.
8. Close Bree before opening Sonny as the optional bonus.

The Aetherbot represents the participant or illustrates Bree only when labelled. The example brief, calendar fixture and mock Outlook mail are fictional. They are instructional examples, not live connector proof.

## The Bree route

| Phase | Artifact | Evidence |
| --- | --- | --- |
| Plan | A1 accepts `intent.md` | One synthetic calendar item becomes one decision line. |
| Design | A2 accepts `docs/spec.md` | The complete schema and the same schema test red and green. |
| Build | A3 accepts the plan. A4 renders the complete synthetic HTML. A5 connects one exact Jira tool. | `out/latest.html`, focused tests, `live:check` and dated private HTML or honest `OPEN`. |
| Test | A6 creates `.claude/skills/verify-bree/` and `docs/evidence.md` | Complete, `OPEN`, `CONFLICT` and one complete synthetic app journey. |
| Deploy | A6 proves both commits and reviews a trigger proposal | Both worktrees run. The proposal names command, working directory, logs, rollback and owner. No scheduler is enabled. |
| Maintain | One observed result becomes the next intent | Command, result, risk, next check and human acceptance. |

## Product contract

- `title`, `date` and `greeting` identify the dated brief.
- `summary` and `moveWorkForward` are single items.
- `topTodos`, `newUpdates` and `yourDay` are non-empty item arrays.
- Each item contains `status`, `text` and `sourceIds`.
- `READY` and `CONFLICT` items resolve at least one source ID.
- Missing evidence stays `OPEN`. Disagreement stays `CONFLICT`.
- Synthetic output is `out/latest.html`.
- Approved live output is `~/.bree/briefs/YYYY-MM-DD.html`.

## Data and permission boundary

- Use the existing organization-approved Jira MCP and approved model route.
- Limit the live source to the participant's own permitted work items.
- Permit one exact read-only tool. Deny built-in and file tools.
- Let the host write only validated private HTML with private permissions.
- Do not connect work email. Mock Outlook uses only `sample/outlook-email.sample.json`.
- Do not use, store, record or commit customer data, credentials, raw connector output or live HTML.
- A local process can still send permitted source data to the approved model route.
- Missing approval, authentication, source access or artifact evidence remains `OPEN`.

## Assignment transitions

| Moment | Trainer transition | Participant proof |
| --- | --- | --- |
| A1 | Who reads this line and what must they decide? | Fixture, red-green mini test and one sourced line. |
| A2 | Which editorial sections make the brief useful and safe? | Approved full schema, red-green test and rejected invalid sample. |
| A3 | Do fixtures and the live route reach the same product contract? | `/visual-plan`, accepted design, exact paths, proof and rollback. |
| A4 | Can you open the complete synthetic HTML and trace every item? | Renderer test and `out/latest.html`. |
| A5 | Which exact Jira tool may Bree use, and who writes the file? | `/mcp`, `live:check`, SDK boundary, host write boundary and artifact `PASS` or `OPEN`. |
| A6 | Can another person repeat the full proof and review future delivery? | Verification skill, journey, worktrees and an uninstalled trigger proposal. |
| A7 | Which bounded mission can you now build yourself? | Own user, decision, boundary, proof and failure case. |

## Trainer opening

> Imagine it is 08:30. Your first meeting starts in 30 minutes. What needs your attention, and which source supports that answer?
>
> Today you build Bree. You reverse engineer the safe structure of a useful brief, then build the complete dated HTML product.
>
> Synthetic fixtures and one approved Jira source feed the same schema. Only the host writes the private file.
>
> By the end, you can verify the whole route and propose daily delivery without claiming it is already enabled.

## Trainer close

> Open the dated brief. Trace one item to its source.
>
> What stays `OPEN`? What stays `CONFLICT`?
>
> Which evidence is synthetic, live source or dated artifact proof?
>
> Which small mission will you take through the same loop next?

## Keep the promise within the lesson

- A1 is a learning slice, not the finished agent.
- A4 proves the complete synthetic product path, not Jira access.
- A5 uses one exact approved Jira tool and host-owned file writing.
- A6 makes the proof repeatable and proposes, but does not enable, a scheduler.
- CI, pull requests and public deployment remain outside the lesson.
- A7 proves independent transfer. It does not repeat the entire Bree lifecycle.
