# Arcade starter

The starting point for the Day 2 arcade (Assignments 26–28). One repo for the whole team: everyone's game on one start screen, with one scoreboard.

## Set up (the host, once)
1. Create a project called `arcade` on Worldline's GitLab and give your team access. Protect `main`: merge requests only, one approval.
2. Copy everything in this folder into it (including the hidden `.gitlab-ci.yml`), commit and push.
3. Clone it and run `npm test`, then `node serve.js`, and open http://localhost:8080

## What's in it
| File | What |
|---|---|
| `arcade.js` | The contract in code: `Arcade.submitScore()`, `Arcade.topScores()`, `Arcade.games()`. Don't change it. |
| `serve.js` | The arcade server. No install needed. Lists games at `/games.json` and shared records at `/scores.json`. |
| `index.html` | The start screen: every game with its avatar and nickname. |
| `scoreboard.html` | Shared records from `scores/`, and personal records from this browser. |
| `scores/` | Shared records, one `<nickname>.json` per player, added through a merge request. |
| `tests/anti-cheat.test.js` | Every shared record must be possible. |
| `tests/arcade.test.js` | Tests for the contract. |
| `.gitlab-ci.yml` | Runs `npm test` on every merge request. |
| `games/AetherBOT/` | A tiny example of a connected game. |

## What the team adds in Sprint 0
`arcade-spec.md` (the agreement), the skill `.claude/skills/arcade-connect/`, and a contract test for every game. The trainer has a tested version in `../arcade-reference/`, to compare afterwards or to fall back on.
