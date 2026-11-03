# Classroom session sources

Days 1 and 2 use the existing `slides.js` deck. Their opening slides are 1 and 83.
Day 5 retains the local SRE workshop and its reviewed changes.

The four additional decks were imported as plain data from
https://github.com/RyanLisse/aetherlink-academy-app/tree/b491cc0187b948a9717186fa9d2cb3f79dbc59ca/apps/web/src/deck.

| Session | Source | Slides |
| --- | --- | --- |
| Day 3: agents in n8n | workshop3-slides.ts, adapted locally | 26 |
| Day 4: Claude Agent SDK | workshop4-slides.ts, adapted locally | 24 |
| Day 6: hackathon, thin slice | workshop6-slides.ts | 14 |
| Day 7: hackathon, ship and present | workshop7-slides.ts | 14 |

The Day 4 source had 28 slides. Its local 24-slide route separates the n8n anchor
from the SDK concepts, parks Hooks and Skills, and aligns exercises with the current
workshop package. The manifest retains the original source digest and marks this deck
as adapted instead of presenting its current data as an exact upstream copy.

The Day 3 source had 18 slides. Its local 26-slide route opens with why n8n (learn
agents visually, prototype before code) and the Day 1–2 concepts as nodes, shows the
L1 → L3+ climb as a staircase, explains what an agent is and the agentic loop before
L2, adds Day 1–2 bridge lines, and adds two stretch exercises: subagents that consult
each other (with `assets/day3-orchestration/n8n-triage-l3-orchestration.json`) and
Data Table CRUD. It is marked as adapted in the manifest, like Day 4.

Other authored text, notes, timers and exercises are retained. TypeScript annotations were removed.
Image prefixes were changed to local `assets/` paths. Three W3 JPEGs and nine W4 PNGs
come from the same source revision's `apps/web/public/` directory.
No Academy code or deployment was changed.

`node --test tools/sessions.test.mjs` checks targets, images, presenter bindings,
selector behavior, and session-scoped presenter channels.
