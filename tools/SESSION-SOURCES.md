# Classroom session sources

## Locally maintained teaching routes

Workshop 3 is adapted from Ryan's 47-slide deck in the supplied
`jyse/aetherlink-classroom-slides` archive at
`3bc44efae16b82a79077eeba41286ff02e4deba5`. Its source images and optional
orchestration download are retained with the same paths. Reference screenshots
are not participant-run evidence. The deck has 45 core slides; only the separate
CRUD exercise is hidden by default. Flat delegation and nested Reply → Risk
consultation are required. `assets/workshop-3/participant-guide.html` contains the
standalone instructions, test inputs, stop conditions and downloads.

Workshop 4's recap names the actual W3 fields and translates both required
communication patterns to the coordinator-mediated code route. These decks are locally maintained:
their manifest digests record the current authored content, not an unchanged
upstream import. Original import metadata is retained under `importedFrom`.
Three added W4 concepts (slides 27–29) explain context windows, prompt caching
and compaction, referencing Claude Code's official [context window](https://code.claude.com/docs/en/context-window)
and [prompt caching](https://code.claude.com/docs/en/prompt-caching) documentation.
The tables below describe the original imports.

Days 1 and 2 use the existing `slides.js` deck. Their opening slides are 7 and 63.
Day 5 retains the local SRE workshop and its reviewed changes.

The four additional decks were imported as plain data from
https://github.com/RyanLisse/aetherlink-academy-app/tree/cb50647cf2c9e1fb589b5e7f6d03211d5a13e23c/apps/web/src/deck.

| Session | Source | Slides |
| --- | --- | --- |
| Day 3: agents in n8n | workshop3-slides.ts | 18 |
| Day 4: Claude Agent SDK | workshop4-slides.ts | 36 |
| Day 6: hackathon, thin slice | workshop6-slides.ts | 14 |
| Day 7: hackathon, ship and present | workshop7-slides.ts | 14 |

Authored text, notes, timers and exercises are retained. TypeScript annotations were removed.
Image prefixes were changed to local `assets/` paths. Three W3 JPEGs and nine W4 PNGs
come from the same source revision's `apps/web/public/` directory.
No Academy code or deployment was changed.

`node --test tools/sessions.test.mjs` checks targets, images, presenter bindings,
selector behavior, and session-scoped presenter channels.
