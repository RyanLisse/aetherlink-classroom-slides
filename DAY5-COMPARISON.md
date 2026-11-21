# Day 5 alignment review

Reviewed on 21 November 2026. The Daily Brief deck is the main lesson. Jessy's Sonny deck supplies the visual storytelling pattern and remains an optional bonus.

## Sources

- Generator: `tools/build-day5-daily-brief.mjs`
- Generated deck: `day5-daily-brief-slides.js`
- Participant lab: `AetherLink-bv/aetherlink-daily-brief-lab-s1`
- Exact prompts: participant `SOLO.md` and `docs/prompts.md`
- Technical reference: `day5-daily-brief-solution`
- Method: [The AI-native SDLC playbook](https://claude.com/resources/articles/the-ai-native-sdlc-playbook)

## Story alignment

| Jessy pattern | Daily Brief implementation |
| --- | --- |
| Start with the participant's decision | “Imagine it is 08:30” appears before tools or architecture. |
| Introduce the agent after the problem | Bree appears after the morning scene. |
| Show the complete desired result | A full synthetic Dia-style brief precedes implementation. |
| Decompose the result | Participants extract sections, schema, renderer, source route and dated artifact. |
| Keep human responsibility visible | Permissions, plan approval, artifact review and trigger activation remain human decisions. |
| Change the scene for the bonus | The Bree close transitions to Sonny at 03:45. |

## Current assignment route

| Assignment | Purpose | Evidence boundary |
| --- | --- | --- |
| A1 | Choose one reader and decision. Build one synthetic line. | Fixture proof only. |
| A2 | Reverse engineer the editorial structure into the complete `DailyBrief` schema. | Same schema test red and green; invalid sample rejected. |
| A3 | Use `/visual-plan` for fixtures and one exact MCP tool reaching the same schema, renderer and private path. | No file changes before human approval. |
| A4 | Build and open the complete synthetic HTML product. | `out/latest.html`; no live source proof. |
| A5 | Connect one existing read-only Jira tool and create validated dated private HTML. | `live:check`, SDK boundary, host write boundary and artifact `PASS` or `OPEN`. |
| A6 | Generate reusable verification, run one synthetic journey, prove both versions and review a daily trigger proposal. | No scheduler is installed or enabled. |
| A7 | Apply the method to one bounded Jira, GitLab, Confluence or mock Outlook mission. | One source, one exact tool, or the local synthetic Outlook fixture. |

## Product and safety alignment

- Every content item uses `status`, `text` and `sourceIds`.
- Missing evidence stays `OPEN`. Disagreement stays `CONFLICT`.
- Synthetic output is `out/latest.html`.
- Approved live output is `~/.bree/briefs/YYYY-MM-DD.html` with private permissions.
- The host writes validated HTML. The agent receives no file tools.
- Participants use one existing approved Jira MCP tool and the approved model route.
- Work email is not connected. Mock Outlook stays local and synthetic.
- Customer data, credentials, internal URLs, raw connector output and live HTML are never committed or recorded.
- Local execution can still send permitted data to the approved model route.

## Materials alignment

- Slides contain the exact six prompts from the participant lab.
- Presenter notes use the same commands, paths and checkpoints.
- `/visual-plan` appears before A3.
- `/create-verification-skill` appears before A6.
- A5 uses `npm run live:check` and `npm run brief:live`.
- A6 covers every HTML section, resolved source IDs, `OPEN`, `CONFLICT`, the dated path and an uninstalled trigger proposal.
- Illustrative screenshots and clips do not claim live connector proof.
- Trainer-only connector repair details stay outside the public repository.

## Deliberate limits

- CI, pull requests, public deployment and automatic scheduling are not participant outcomes.
- GitLab and Confluence are optional A7 missions, not required Bree sources.
- A7 is a transfer check, not a second complete lifecycle.
- Sonny is a separate optional lesson with a higher-risk incident scenario.
