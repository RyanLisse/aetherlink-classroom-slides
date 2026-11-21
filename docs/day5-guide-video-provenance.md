# Day 5 guide-video provenance

The published guide videos use two saved, synthetic source revisions. They do not show a new Claude, Jira, Vertex, or ElevenLabs execution.

## Recreate the temporary capture input

Use local checkouts that can read the existing private repository. Do not add credentials, `.env` files, `node_modules`, generated briefs, or other untracked files.

```bash
mkdir -p .github/capture-input

git -C /path/to/participant-checkout fetch upstream b54a19851bda3b885b1ef087169744db664110c7
git -C /path/to/participant-checkout archive --format=tar.gz \
  --output="$PWD/.github/capture-input/participant-b54a198.tar.gz" \
  b54a19851bda3b885b1ef087169744db664110c7

git -C /path/to/trainer-checkout fetch upstream beec03ff9c1232704f74651e57e2da132874758e
git -C /path/to/trainer-checkout archive --format=tar.gz \
  --output="$PWD/.github/capture-input/trainer-beec03f.tar.gz" \
  beec03ff9c1232704f74651e57e2da132874758e

shasum -a 256 .github/capture-input/*.tar.gz
```

Expected archive hashes:

- Participant: `f76f7bf18296d3c2ec18cd0e481895bb793b35caa91703f67853bc86a49eaab0`
- Trainer: `3967b737bb6ad65c1cf2f482d9880a3b89dfcf09f0455e7fe1a51caf03c02c06`

The renderer rejects a different archive hash. Remove both temporary archives before opening a pull request. The final manifest retains the capture-time revision, archive name, archive hash, action, and exact video hash.

## Render and verify

The capture host needs Bash, Node.js 24, Git, npm, Python 3, VHS 0.10.0, ttyd, FFmpeg with `drawtext`, Playwright 1.64, and its matching Chromium. Install these tools on the bounded remote runner. The normal classroom CI workflow does not install them.

Run a single guide while iterating:

```bash
node tools/render-day5-guide-videos.mjs --assignment=a3
```

The temporary workflow at revision `ba15bf1` ran all sixteen guides with:

```bash
node tools/render-day5-guide-videos.mjs
node --test --test-concurrency=2 tools/day5-feedback.test.mjs tools/day5-lesson-media.test.mjs
```

Before publication, inspect the videos at their presenter width. Confirm that each clip shows its saved-source label, the actual action, the visible result, and the recorded exit status. Browser clips must also pass their DOM assertions.

Capture evidence:

- [Representative A4 and voice sample](https://github.com/AetherLink-bv/aetherlink-classroom-slides/actions/runs/44902424794) at revision `f130368`
- [Full sixteen-guide render](https://github.com/AetherLink-bv/aetherlink-classroom-slides/actions/runs/44902862407) at revision `ba15bf1`
- [A2, A3, and A4 readability rerender](https://github.com/AetherLink-bv/aetherlink-classroom-slides/actions/runs/44904301043) at revision `a87247e`
- [Final A2 contract rerender](https://github.com/AetherLink-bv/aetherlink-classroom-slides/actions/runs/44904897901) at revision `54d1dc6`

The temporary render job and source archives were removed after the published MP4 hashes were verified. Recreate the inputs and use the commands above when a guide must be regenerated.
