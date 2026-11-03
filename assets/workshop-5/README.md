# Workshop 5 shop and console screenshots

These are real local browser captures, not UI mockups. The checkout shop has
a storefront and fault controls; the SRE console is the separate on-call desk.

## Assignment document and terminal examples

`assignments/*.png` are browser screenshots of **illustrative teaching
examples**, not real Claude responses, executed test output, participant
acceptance, or PRs. Each image carries its provenance label. Use them to
recognise the shape of intent, plans, evidence, tests, review and release
decisions. Participants must fill in their own observations.

`assignments/examples.json` supplies the scenario, starting state, expected
result and stop condition for all 15 practice slides. Regenerate the reference
page with `node tools/build-w5-examples.mjs`. Open its `index.html` through the
slide server. For screenshots, use `?capture=1#<example-id>` at 1000 × 680.
The participant repository contains copies of the images so the hub works
without access to the slides site. Update those copies when an example changes.

The earlier videos under `media/` remain optional shop/console control
walkthroughs. They do not demonstrate the current Claude Code setup or the
complete AI-SDLC assignment. The card remains the canonical route.

## Current shop captures

Captured on 2026-10-21 from `RyanLisse/sre-oncall-agent` commit
`a7f985518a2ef3ee91d5cafff2a22869c105c329`, in a disposable clone using
`npm run checkpoint -- core-3`, then `npm start -- --fast`.
The generated checkpoint records this source revision. No historical tag or
ZIP was substituted. Offline scripted runtime, live local traffic, no model call.

| Image | UTC capture time | Observed state |
| --- | --- | --- |
| `shop-healthy.png` | 19:48:59.994 | Healthy `v2.14.0`; Buy returned paid/order `ord-9897`; browser traffic 10/s, 0.0% errors |
| `shop-broken.png` | 19:49:28.209 | One **Bad deploy v2.15.0** button click; `bad-deploy`, browser errors 7.4% |

Both images are unmodified 1440 × 900 browser captures. The Buy result below
the products is the last manual checkout, not a continually refreshed health
indicator. The status pill shows the current revision and mode. Counters use
this browser's last 30 seconds of requests; the chart spans 60 seconds. Terminal
traffic is separate. A healthy counter may therefore coexist with an earlier
red chart bar. There are no real payments.

The run used shop port 4350 and console port 4360 to leave existing services
untouched. The shop's static note still names the default console port 4320.
Default classroom ports remain shop 4310 and console 4320. `--fast` changes
detection to one minute, not the normal five minutes. Recovery timing was not
shortened: approximately 30/60/120 seconds. Some emoji glyphs were unavailable
on the capture host; product SVGs and functional labels are visible.

The same live run's incident `INC-08920` had one separately approved execution.
Rollback restored `v2.14.0`; observed half/full/double values were
0 / 0.0071 / 0.0142 against frozen limit 0.005. It correctly stopped **NOT LANDED**.
Failed observations survived reload and retry/closure remained disabled. No
Reset, retry, threshold change or synthetic successful state was used. Closure
was not exercised in this run. The accompanying participant walkthrough used
a separate current starter (`INC-08726`, low confidence, `list_deploys` gap),
then a clearly labeled read-only catch-up to that same solved incident.

## Retained console captures (earlier safety-tested revision)

Captured on 2026-10-21 from `RyanLisse/sre-oncall-agent`:

- Fresh core starter and separate checkpoint packages from commit
  `64e477a7b889c74f728652937788b21abedb13e9`.
- Resolved capture: the same persisted incident, reloaded with the renderer
  from `bc0094895934f5c4b9fe2d7d45c8e6d0de5d917d`. No new execution.
- Offline scripted runtime, live local shop and traffic, no model call.
- Launcher: `npm start -- --fast`. One-minute detection, not the five-minute default.
- Recovery watch: default half/full/double timing, about two minutes.
- Viewport: 1440 × 900. No horizontal document or sidebar overflow.

| Image | State |
| --- | --- |
| `console-start.png` | Fresh core starter; healthy shop, Active 0 and History 0 |
| `console-diagnosis.png` | Live diagnosis with customer impact and evidence; approval pending |
| `console-refusal.png` | Chat refuses the exact request `roll back now` |
| `console-approval.png` | Named approval; execution remains a separate action |
| `console-landed.png` | Observed recovery checks pass; incident still active |
| `console-resolved.png` | Human notes and provenance persist; recovery guidance says resolved |

The live incident is `INC-06729`, not fixture `INC-1001`. Bad deploy
`d-4806` changed `v2.14.0` to `v2.15.0`. One approved rollback restored
`v2.14.0`. The observed half/full/double values were 0/0/0 against a frozen
limit of 0.005. No retry, lowered limit or synthetic recovery state was used.

The incident did not close itself. A named human marked it mitigated, then
resolved it with notes. Approval, execution and closure controls stayed
disabled after resolution and reload. Evidence references are plain text.

Click a screenshot in the classroom deck to open the original image.

The retained LANDED/resolved images illustrate a different, earlier valid run;
they are not evidence that the current run closed. The latest live check
validated the NOT LANDED path instead. Factual chat questions containing
“rollback” may also trigger the conservative mutation-refusal grammar.
