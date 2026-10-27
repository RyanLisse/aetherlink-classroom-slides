# Arcade reference (for trainers)

What a team produces in Sprint 0 (Assignment 26), tested in the dry run on 27 October 2026. Don't hand it out at the start: the team writes its own. Use it to compare afterwards ("what did we forget?"), or copy it into the arcade repo if Sprint 0 runs out of time.

| File | Goes to |
|---|---|
| `arcade-spec.md` | the root of the arcade repo |
| `.claude/skills/arcade-connect/SKILL.md` | the same path in the arcade repo |
| `tests/game-contract.test.js` | `tests/` in the arcade repo (`npm test` then checks every game) |

This is contract **v1** on purpose: the chaos card "the contract changes" moves it to v2 in class. The anti-cheat test in the starter caps a record at 500 points, also on purpose: the cheater card (480 points on level 1) gets through it.
