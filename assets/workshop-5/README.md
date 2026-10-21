# Workshop 5 console screenshots

These are real local browser captures, not UI mockups. The checkout shop is
an HTTP API. The visible application is the SRE console.

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
