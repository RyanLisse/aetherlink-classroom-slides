# Day 5 participant walkthrough

Date: 2026-11-21. Participant: Maya, fictional release coordinator. Checkout: clean clone of starter `main` at `dc8b111`, branch `codex/ryan-fictional-participant`.

## Environment and start

- Node was `v24.18.0`, satisfying `>=20.12`.
- `npm ci` exited 0. It reported eight dependency audit findings and blocked two package install scripts. The lesson did not ask to change dependencies.
- Claude Code authentication existed, but it used `firstParty`, not the required approved Vertex route. No real Claude prompt was sent.
- The initial lesson before correction used `--strict-mcp-config` without an explicit approved MCP configuration. It also did not explicitly force `--permission-mode default`.
- The corrected lesson starts A1 through A4 in Manual mode with no MCP servers. Before A5, it verifies the private `AETHERLINK_JIRA_MCP_CONFIG` path and restarts Claude Code with `--permission-mode default --strict-mcp-config --mcp-config "$AETHERLINK_JIRA_MCP_CONFIG"`.
- The corrected A5 instructions require `/status` for the approved Vertex route and `/mcp` for the Jira-only connection. Missing access stays `OPEN`.
- The corrected SDK route explicitly loads the selected server definition through `mcpServers`, enables strict MCP configuration, sets built-in tools to none, and denies every unapproved tool.
- No live Jira source, customer data, credential, Outlook connection, or live brief entered this checkout.

## Source versions and remote evidence

- The participant started from [starter commit `dc8b111`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/commit/dc8b111a91cb589506f31c2516a2e55b08ec651f).
- The initial deck source was [slides commit `6fd9187`](https://github.com/AetherLink-bv/aetherlink-classroom-slides/commit/6fd9187203689b3620327b46cd5c3ffa32f73bd2).
- The explicit Manual and MCP correction is [slides commit `b7eb3cc`](https://github.com/AetherLink-bv/aetherlink-classroom-slides/commit/b7eb3ccd9e19c0cfdf2ea8b633bf2fc0f93d8136).
- [Remote video and browser run `44861466386`](https://github.com/AetherLink-bv/aetherlink-classroom-slides/actions/runs/44861466386) rendered and verified all Day 5 walkthrough videos. Its browser step failed, so the overall run was red.
- [Remote browser run `44861825462`](https://github.com/AetherLink-bv/aetherlink-classroom-slides/actions/runs/44861825462) passed the complete lesson checks and the 46-slide browser review.
- The corrected starter is [commit `47b2a58`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/commit/47b2a58dc64e71034b9091dd5fa68e5ef5e7f264). [PR 16](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/pull/16) passed [branch verification run `44862761677`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/actions/runs/44862761677), merged as [`8335f2f`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/commit/8335f2f13e9b19c949ca67052cc0b1a7d54e14c5), and passed [post-merge main run `44863298574`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/actions/runs/44863298574).
- The corrected trainer reference is [commit `c3af4ed`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/commit/c3af4eda93296749b7d3be9fd64b36d9701ebb16). [Draft PR 13](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/pull/13) remained separate and [remote verification run `44862751436`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/actions/runs/44862751436) passed.
- The participant implementation sequence ended at checkpoint `0e65a7795cdef7ef68753d8965ad5370f62a543f`, whose parent is `35ca683`. Temporary workflow commit `5cc0381` sits above it on [evidence branch `codex/ryan-participant-proof`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/tree/codex/ryan-participant-proof). This branch is evidence only and must never merge.
- [Remote participant run `44863044663`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/actions/runs/44863044663) passed on a Node version satisfying `>=20.12`. It ran 16 tests at `35ca683` and 23 tests plus six evaluations at `0e65a77`, rendered both briefs, captured both pages, removed both temporary worktrees, and left one worktree.
- The [uploaded worktree artifact](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1/actions/runs/44863044663/artifacts/14690183992) contains both HTML files and both screenshots. The final 1499×878 page shows readable sections, the amber `OPEN` state, `CONFLICT`, and source references. The previous screenshot has the same SHA-256 because this hardening checkpoint did not change rendered output.

## Human review record

The `/grilling` questions were played one at a time. Maya chose a release coordinator as reader. She chose “which blocker to bring to the 09:00 stand-up” as the observable decision. She accepted wording only after the line named both the meeting and decision.

The A2 review accepted the complete contract after adding one rule: every `sourceId` must resolve in `sources`. The A3 review accepted the plan with live proof explicitly `OPEN`. The A4 house-style review chose one visible amber `OPEN` badge. The A5 boundary review accepted exactly one Jira read tool, no built-ins, host-owned validation, and host-owned private writing. The A6 trigger remained a proposal. The A7 review chose one synthetic Outlook request with a 15:00 deadline.

## A1 Part 1: choose and approve the user and decision

- Prescribed instruction: read the project context, interview one question at a time, wait for wording approval, then update intent and fixture.
- Action: selected Maya and the 09:00 blocker decision. Updated `intent.md` and `sample/calendar-item.sample.json` only after recorded approval.
- Visible result: intent and fixture use the same reader and decision.
- Proof: `git diff` showed only the accepted intent and fixture fields before A1 Part 2.
- Ambiguity: the lesson does not prescribe where to retain the interview transcript. This report records decisions without claiming that Claude ran.

## A1 Part 2: build one useful line

- Prescribed instruction: write the test first, show red, implement `src/mini.ts`, then run the test and CLI.
- Action: added an exact output assertion before the implementation.
- Visible result: `09:00 Daily stand-up — decide: Choose which blocker to bring to the 09:00 stand-up`.
- Proof: first `npm run test:mini` exited 1 with `ERR_MODULE_NOT_FOUND`; the green rerun exited 0 with one passing test. `npm run mini` exited 0.
- Ambiguity: none. This is a synthetic learning slice, not the finished agent.

## A2 Part 1: propose and approve the contract

- Prescribed instruction: derive the complete safe structure and explain every field before approval.
- Action: completed `docs/spec.md`; the `/eli5` review explained that statuses protect uncertainty and source IDs protect provenance.
- Visible result: title, date, greeting, two single items, three non-empty arrays, and sources have explicit rules.
- Proof: the accepted spec names `READY`, `OPEN`, `CONFLICT`, prefixes, non-empty arrays, and resolved IDs.
- Ambiguity: the reference did not say whether duplicate source IDs are forbidden. The smallest contract allows them.

## A2 Part 2: prove the accepted contract

- Prescribed instruction: test first, show red, implement the schema, accept the valid sample, and reject an invalid sample.
- Action: added Zod validation and a cross-reference check.
- Visible result: the complete sample passes and an unknown source ID is rejected.
- Proof: first `npm run test:schema` exited 1 with missing `src/brief.js`. The final rerun exited 0 with three passing tests, including a fully `OPEN` brief with no sources.
- Ambiguity: none.

## A3: design the complete route

- Prescribed instruction: plan without source implementation, approve every step and rollback, then create an offline visual plan.
- Action: accepted `docs/design.md`, `docs/decisions/ADR-001.md`, `docs/plan.md`, and `docs/visual/2026-11-21-plan-bree.html`.
- Visible result: the visual shows fixtures, schema, renderer, one approved tool, SDK, private artifact, approval gates, and `OPEN` live dependencies.
- Proof: the HTML is self-contained and contains no external resource request.
- Ambiguity: the bundled `/visual-plan` mentions missing `/diagram` and `/archify` skills. Neither was needed for this small flow.

## A4 Part 1: build and prove the full brief

- Prescribed instruction: test first, render every section, escape untrusted text, and write `out/latest.html` from synthetic data.
- Action: added `src/render.ts`, `src/main.ts`, and renderer tests.
- Visible result: the page contains all six headings, provenance, `READY`, `OPEN`, and `CONFLICT`.
- Proof: first `npm run test:render` exited 1 with missing `src/render.js`; the green run exited 0 with two tests. `npm run brief:sample` exited 0 and wrote 2,136 bytes.
- Ambiguity: the optional photo was skipped because it adds no lesson proof.

## A4 Part 2: improve one house-style detail

- Prescribed instruction: ask for one small change, test it first, make the smallest change, rerun, and inspect the page.
- Action: selected a clearly visible amber `OPEN` badge. The assertion existed before renderer implementation.
- Visible result: `out/latest.html` contains one `class="status open"` badge and the complete page still renders.
- Proof: `grep -c 'class="status open"' out/latest.html` returned `1`.
- Ambiguity: a browser screenshot was not made in this executor lane. Static output and markup were checked.

## A5 Part 1: choose and test the source boundary

- Prescribed instruction: inspect the approved Jira MCP connection, identify one exact read-only tool, write focused red tests, and wait for approval.
- Action: no approved connection was available. The exact live tool stayed `OPEN`. Tests used a clearly fictional tool name and mocked SDK messages.
- Visible result: tests cover approvals, exact tool restriction, no built-ins, private path, Vertex fail-closed behavior, and structured provenance.
- Proof: the first `npm run test:live` exited 1 because `src/live.js` was absent.
- Ambiguity: the initial lesson before correction did not explain that a separate SDK process needs explicit MCP server configuration. The corrected lesson now explains that boundary.

## A5 Part 2: build and check the bounded route

- Prescribed instruction: expose only the chosen tool, validate all output, accept only exact keys from successful structured results, and let only the host write private HTML.
- Action: implemented an explicit Jira-only `mcpServers` map loaded from `AETHERLINK_JIRA_MCP_CONFIG`, strict MCP mode, `tools: []`, one allowed tool, and a deny callback. The host correlates the selected tool-call ID with a non-error result whose `content` is valid JSON containing mocked `issues[].key` values.
- Visible result: eight participant tests pass, including prose keys, failed results, unexpected tool calls, unlisted sources, an API-faithful mocked provider check, host-date agreement, and a mocked private write with mode `0600`.
- Proof: participant `npm run test:live` exited 0 with eight synthetic passes. It rejects malformed structured results, unexpected calls, non-exact IDs, a mocked non-Vertex initialization, and a mismatched host date. `npm run typecheck` exited 0. This is not an actual Vertex connection or model call.
- Ambiguity: `issues[].key` is a tool-specific mocked assumption. A human must inspect one successful private structured response and approve its exact key field before live use. Mocked shape evidence is not live proof.

## A5 Part 3: create the private live brief

- Prescribed instruction: run privately only after human approval and record `PASS` or `OPEN`.
- Action: did not create `.bree.local.json` and did not run `brief:live`.
- Visible result: `npm run live:check` exited 2 with `OPEN` because local approved configuration was absent.
- Proof: no private dated artifact was created.
- Ambiguity: live source access, authentication, model route, tool result shape, and private artifact remain `OPEN`.

## A6 Part 1: evaluate three evidence cases

- Prescribed instruction: prove complete, missing, and conflicting cases.
- Action: the initial lesson before correction supplied only mini-calendar fixtures, which could not prove three complete pages. The corrected lesson adds `ordinary-brief.json`, `missing-brief.json`, and `conflict-brief.json`.
- Visible result: ordinary evidence renders `READY`, missing evidence stays `OPEN`, and conflicting evidence stays `CONFLICT`.
- Proof: both the corrected trainer reference and participant checkpoint reran `npm run eval` with six passing tests. Each full fixture passes through the real schema and renderer instead of reusing one completed sample.
- Ambiguity: the legacy `ordinary.json`, `missing.json`, and `conflict.json` files remain useful only for mini-calendar contract tests.

## A6 Part 2: make the proof repeatable

- Prescribed instruction: generate `verify-bree`, run a complete journey, and record commands and exit codes.
- Action: generated a repository-local verification skill and two feature maps. Ran every targeted test, typecheck, eval, sample render, and live preflight.
- Visible result: `docs/evidence.md` records the synthetic journey. The skill remains `DRAFT`.
- Proof: targeted commands all exited 0. `live:check` exited 2 with `OPEN`.
- Ambiguity: `npm test` was intentionally not run locally under the resource policy. Remote CI owns the full suite.

## A6 Part 3: prepare local delivery

- Prescribed instruction: propose a local trigger, do not install it, and prove previous and current commits in temporary worktrees.
- Action: proposed 08:30 Europe/Amsterdam on weekdays. Documented the command, working directory, log boundary, owner, and rollback. Installed nothing.
- Visible result: proposal status is `PROPOSED ONLY`.
- Proof: no scheduler process or configuration was created.
- Ambiguity: the local executor did not create worktrees. Remote run `44863044663` supplied the full-suite, previous/current recovery, screenshot, cleanup, and artifact proof.

## Maintain loop

- Prescribed instruction: add one observed result, safe signal, risk, improvement, and check to intent.
- Action: added `## Next iteration` around `npm run live:check`.
- Visible result: the next iteration is bounded to the approved configuration restart and adversarial boundary check.
- Proof: `intent.md` contains the five requested fields.
- Ambiguity: none.

## A7: build a small synthetic Mock Outlook agent

- Prescribed instruction: choose a mission, define fixture and artifacts, write red first, build a bounded SDK route, prove one journey, and produce a handoff.
- Action: reused the supplied synthetic fixture and added its structured 15:00 deadline. Added a tool-free SDK query, strict empty MCP configuration, Zod validation, exact source and deadline binding, design documentation, and a portable handoff.
- Visible result: the mock returns a 15:00 review action and rejects invented source IDs and deadlines.
- Proof: the first `npm run test:tool` exposed the filename convention, then exited 1 for missing `src/outlook.js`. The final green run exited 0 with three passes, including rejection of an invented deadline. `npm run typecheck` exited 0.
- Ambiguity: A7 originally named no file. The corrected README now directs the participant to `test/tool.test.ts`, `src/outlook.ts` or a chosen entry file, and `npm run test:tool`. No live model proof exists.

## Remaining OPEN items

- A real Claude Code participant session through the approved Anthropic via Vertex route.
- The organisation-approved Jira-only MCP configuration, exact read-only tool, and confirmed structured result schema.
- The private live Jira brief and dated artifact.
- Optional ElevenLabs paid request, voice quality, quota, and account setup.
- The eight dependency audit findings reported by the clean starter installation.
- Historical A1 through A7 command transcripts were not redirected to files. New A5 through A7 hardening output is preserved separately under `evidence/`; `evidence/commands.md` remains a historical summary.

## Result

All fourteen core assignment parts were executed synthetically in order. Focused local checks passed with schema 3, live boundary 8, full evaluation 6, and A7 tool 3 tests. Remote run `44863044663` passed the full suite, detached recovery, browser capture, cleanup, and artifact inspection. The corrected starter is merged. The lesson now documents Manual mode, explicit MCP configuration, the SDK boundary, and the A7 test convention. No live Claude, Vertex, Jira, private brief, or audio result is claimed.
