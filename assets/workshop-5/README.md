# Workshop 5 console screenshots

These are real local browser captures, not UI mockups. The checkout shop is
an HTTP API. The visible application is the SRE console.

Captured on 2026-10-21 from `RyanLisse/sre-oncall-agent`:

- Starter: `workshop/start`, commit `c4b5851cdf5fae07163bf28051135c6f55172f8b`.
- Solved: `w5-step-8-maintain`, commit `a8509b3da829a6379df53f07d7de0d8f187f4ea9`.
- Offline scripted runtime, live local shop and traffic, no model call.
- Detection window: `AGENT_LISTEN_WINDOW_MIN=1`, not the five-minute default.
- Recovery watch: default timing, about two minutes.

| Image | State |
| --- | --- |
| `console-start.png` | Starter console before the shop starts |
| `console-diagnosis.png` | Live diagnosis; approval pending |
| `console-refusal.png` | Chat refuses a rollback request |
| `console-approval.png` | Named approval; execution is a separate action |
| `console-landed.png` | Recovery verified; incident still active |
| `console-resolved.png` | Human resolution notes and lesson provenance |

The live incident is `INC-23996`. It is not the fixture incident `INC-1001`.
The demo rolls back `v2.15.0` to `v2.14.0`. Evidence references are plain text.
The solved console has no separate `customer_impact` row. It also leaves the
Execute rollback button enabled after resolution. Do not repeat execution
on a resolved incident; that path was not tested in this walkthrough.

Click a screenshot in the classroom deck to open the original image.
