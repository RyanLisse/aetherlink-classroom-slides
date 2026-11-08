# Facilitate Days 4 and 5

Use this checklist with the current slides and participant repositories. The
slides set the lesson order and contain the prompts that you share in class.

## Prepare a clean teaching copy

1. Keep participant work and your demo work in separate folders.
2. In an existing clean trainer clone, run `git status --short`.
3. If the output is empty, run `git pull --ff-only`.
4. If the output is not empty, preserve the work and make a fresh sibling clone.
5. Check Node.js 22 or newer, Git and a signed-in Claude Code session.
6. Reuse an existing slide server. If none is running, run `python3 serve.py 8080`.

Open these pairs from the same server:

| Day | Projector | Trainer screen |
| --- | --- | --- |
| Day 4 | `http://localhost:8080/workshop4.html#1` | `http://localhost:8080/workshop4-presenter.html#1` |
| Day 5 | `http://localhost:8080/workshop5.html#1` | `http://localhost:8080/workshop5-presenter.html#1` |

For each assignment, use **Copy** on the slide. Share that prompt in the class
chat. Participants paste it into Claude Code, inspect the result and stop at
the stated review point.

## Prepare Day 4 before class

Use the exact **Trainer preparation** prompt in the participant repository's
[`SOLO.md`](https://github.com/AetherLink-bv/aetherlink-day4-n8n-to-agent/blob/main/SOLO.md).
Build and review a separate read-only reference folder or evidence pack before
SOLO 0. Do not put the completed implementation in the participant starter.

Use the sanitized `n8n/support-triage.json` from the repository. Do not activate
or modify the n8n workflow. Show the n8n screenshots before the first build
assignment. During the memory assignment, keep curated `memory.md` files
separate from transcripts and technical logs. Test a fresh-session readback and
ticket isolation.

## Run Day 5 as the main AI-native SDLC lesson

Participants use [`workshop/start`](https://github.com/AetherLink-bv/sre-oncall-agent/tree/workshop/start)
and complete A1 through A9. Use the repository's
[`FACILITATOR.md`](https://github.com/AetherLink-bv/sre-oncall-agent/blob/workshop/start/FACILITATOR.md)
for the time boxes and recovery notes. Use its
[`SOLO.md`](https://github.com/AetherLink-bv/sre-oncall-agent/blob/workshop/start/SOLO.md)
for the matching assignments.

At the start, the main test suite is green. The workshop tests are red for the
unfinished A3, A4, A5 and A8 contracts. Reuse existing services on ports 4310
and 4320. Do not start duplicate shop or console processes.

The SRE repository already includes the skills used by the lesson. Participants
do not need to install the full skills pack globally. The `/sdlc` mod is an
optional visual route through the same nine assignments.

## Keep Daily Brief as the bonus

Use the Daily Brief bonus after the SRE lesson when time remains. Steps 1
through 4 form the 30 to 40 minute classroom route. Steps 5 through 7 are
homework. Participants open a pull request only after the human review in step
7. The bonus repository is
[`AetherLink-bv/aetherlink-daily-brief-lab-s1`](https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1).
