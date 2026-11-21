import {createHash} from 'node:crypto';
import {execFileSync, spawn} from 'node:child_process';
import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import vm from 'node:vm';

const PARTICIPANT_REVISION = 'b54a19851bda3b885b1ef087169744db664110c7';
const TRAINER_REVISION = 'beec03ff9c1232704f74651e57e2da132874758e';
const REPOSITORY = 'https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1.git';
const root = new URL('../', import.meta.url);
const work = new URL('.day5-video-work/', root);

const demos = {
  'a1-p1': {source: 'participant', command: "git show --format= --unified=0 69e2f25 -- intent.md sample/calendar-item.sample.json | sed -n '1,24p'", result: 'Offline human choice: the approved reader, decision and fixture agree.'},
  'a1-p2': {source: 'participant', command: 'npm run test:mini && npm run mini', result: 'One synthetic decision line passes and prints.'},
  'a2-p1': {source: 'participant', command: "sed -n '1,22p' docs/spec.md", result: 'The accepted DailyBrief contract is visible.'},
  'a2-p2': {source: 'participant', command: 'npm run test:schema', result: 'Valid input passes; unresolved sources fail.'},
  a3: {source: 'participant', command: "git show --stat --oneline f4a4882 && grep -E 'fixture|schema|renderer|OPEN' docs/design.md | head -6", result: 'The offline plan and OPEN live gate are visible.'},
  'a4-p2': {source: 'participant', command: "npm run test:render && npm run brief:sample && grep -o 'class=\"status open\"' out/latest.html | wc -l", result: 'The full brief still renders with one OPEN badge.'},
  'a5-p1': {source: 'trainer', command: "set -o pipefail; npm run test:live 2>&1 | grep -E '✔|tests |pass |fail ' | tail -10", result: 'The synthetic boundary tests pass; live access stays OPEN.'},
  'a5-p2': {source: 'trainer', command: "set -o pipefail; npm run typecheck && npm run test:live 2>&1 | grep -E 'tests |pass |fail '", result: 'The bounded host route typechecks and passes.'},
  'a5-p3': {source: 'trainer', command: "npm run live:check; code=$?; printf 'Expected OPEN exit code: %s\\n' \"$code\"", result: 'No private configuration means OPEN; no live brief is written.'},
  'a6-p1': {source: 'trainer', command: 'npm run eval', result: 'READY, OPEN and CONFLICT cases all pass.'},
  'a6-p2': {source: 'trainer', command: "set -o pipefail; npm test 2>&1 | grep -E 'tests |pass |fail ' | tail -4", result: 'The repeatable synthetic journey passes.'},
  'a6-p3': {source: 'trainer', command: "grep -nE 'scheduler|daily trigger' docs/plan.md docs/gate.md | head -6", result: 'The local trigger remains a proposal; nothing is installed.'},
  a7: {source: 'trainer', command: 'npm run test:tool', result: 'The bounded synthetic Outlook tool journey passes.'},
  'voice-p1': {source: 'trainer', command: "touch .env.local && git check-ignore .env.local && test -z \"$(git status --short --untracked-files=all | grep '.env.local')\" && echo 'PASS: ignored key file is absent from Git status'", result: 'The personal key file stays outside Git.'},
  'voice-p2': {source: 'trainer', command: 'npm run test:voice', result: 'Mocked fetch passes without a paid request.'}
};

const args = process.argv.slice(2);
if (args.length > 1) throw new Error('Expected at most one option');
const checkOnly = args[0] === '--check';
const sampleOnly = args[0] === '--sample';
const requested = args[0]?.startsWith('--assignment=') ? args[0].slice(13) : undefined;
if (args[0] === '--assignment=') throw new Error('Unknown assignment selector:');
if (args[0] && !checkOnly && !sampleOnly && !requested) throw new Error(`Unknown option: ${args[0]}`);
if (requested && !Object.hasOwn(demos, requested) && requested !== 'a4-p1') throw new Error(`Unknown assignment selector: ${requested}`);

const context = {window: {}};
vm.runInNewContext(readFileSync(new URL('day5-daily-brief-slides.js', root), 'utf8'), context);
const slides = context.window.SLIDES.filter(slide => /^brief-(?:a[1-7](?:-p[1-3])?|voice-p[12])$/.test(slide.assignmentId ?? ''));
if (slides.length !== 16) throw new Error(`Expected 16 guided lesson parts, found ${slides.length}`);
const fingerprint = slide => createHash('sha256').update(JSON.stringify({
  title: slide.title, subtitle: slide.subtitle, steps: slide.steps, expected: slide.expected,
  prompt: slide.prompt, copy: slide.teach?.copy
})).digest('hex').slice(0, 16);

if (checkOnly) {
  for (const slide of slides) {
    const id = slide.assignmentId.slice(6);
    if (id !== 'a4-p1' && !demos[id]) throw new Error(`Missing demo definition for ${id}`);
  }
  console.log('16 evidence demonstrations are defined.');
  process.exit(0);
}

const participant = new URL('participant-replay/', work);
const trainer = new URL('trainer-reference/', work);
const run = (command, commandArgs, options = {}) => execFileSync(command, commandArgs, {stdio: 'inherit', ...options});
const prepare = (directory, branch, revision) => {
  if (!existsSync(directory)) run('git', ['clone', '--depth=80', '--branch', branch, REPOSITORY, directory.pathname]);
  run('git', ['fetch', '--depth=80', 'origin', revision], {cwd: directory});
  run('git', ['checkout', '--detach', revision], {cwd: directory});
  const actual = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: directory, encoding: 'utf8'}).trim();
  if (actual !== revision) throw new Error(`Expected ${revision}, found ${actual}`);
  run('npm', ['ci', '--ignore-scripts'], {cwd: directory});
};

prepare(participant, 'codex/ryan-picsum-replay', PARTICIPANT_REVISION);
prepare(trainer, 'codex/day5-ryan-bree-solution', TRAINER_REVISION);
const selected = sampleOnly ? ['a4-p1', 'voice-p2'] : requested ? [requested] : slides.map(slide => slide.assignmentId.slice(6));
const temporary = mkdtempSync(join(tmpdir(), 'bree-evidence-demos-'));
const manifest = {format: 2, kind: 'evidence-demonstration', generatedFrom: 'day5-daily-brief-slides.js', guides: []};

const renderTerminal = id => {
  const demo = demos[id];
  const revision = demo.source === 'participant' ? PARTICIPANT_REVISION : TRAINER_REVISION;
  const directory = demo.source === 'participant' ? 'participant-replay' : 'trainer-reference';
  const label = demo.source === 'participant'
    ? `SAVED PARTICIPANT CHECKPOINT · ${revision.slice(0, 7)} · OFFLINE SYNTHETIC`
    : `SAVED TRAINER REFERENCE · ${revision.slice(0, 7)} · OFFLINE SYNTHETIC`;
  const tape = join(temporary, `${id}.tape`);
  const output = `assets/day5-daily-brief-teach/${id}-guide.mp4`;
  writeFileSync(tape, `Output "${output}"
Set Shell "zsh"
Set FontSize 28
Set Width 1148
Set Height 780
Set TypingSpeed 12ms

Type "cd .day5-video-work/${directory}"
Enter
Sleep 300ms
Type "clear; printf '\\033[1;36m${label}\\033[0m\\n${demo.result}\\n\\n'"
Enter
Sleep 900ms
Type "${demo.command.replaceAll('"', '\\"')}"
Enter
Sleep 6s
`);
  run('vhs', [tape], {cwd: root});
};

const renderBrowser = async () => {
  run('npm', ['run', 'brief:sample'], {cwd: participant});
  const server = spawn('python3', ['-m', 'http.server', '4173', '--bind', '127.0.0.1', '--directory', new URL('out/', participant).pathname], {stdio: 'ignore'});
  try {
    for (let attempt = 0; attempt < 40; attempt++) {
      try { if ((await fetch('http://127.0.0.1:4173/latest.html')).ok) break; } catch {}
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    const {chromium} = await import('playwright');
    const browser = await chromium.launch();
    const context = await browser.newContext({viewport: {width: 1148, height: 780}, recordVideo: {dir: temporary, size: {width: 1148, height: 780}}});
    const page = await context.newPage();
    const label = async text => page.evaluate(value => {
      document.querySelector('#capture-label')?.remove();
      const node = document.createElement('div');
      node.id = 'capture-label';
      node.textContent = value;
      Object.assign(node.style, {position:'fixed',zIndex:'9999',top:'12px',left:'12px',padding:'10px 14px',background:'#061523',color:'#63d5e8',font:'700 18px Arial',border:'2px solid #63d5e8',borderRadius:'8px'});
      document.body.append(node);
    }, text);
    await page.goto('http://127.0.0.1:4173/latest.html');
    await page.waitForFunction(() => document.querySelector('img')?.naturalWidth > 0, null, {timeout: 20_000});
    await label('SAVED PARTICIPANT CHECKPOINT · b54a198 · PUBLIC IMAGE LOADED');
    await page.waitForTimeout(2500);
    await page.mouse.wheel(0, 380);
    await page.waitForTimeout(1500);
    await page.route('https://picsum.photos/**', route => route.abort('blockedbyclient'));
    await page.reload();
    await label('SAME REVISION · CONTROLLED IMAGE FAILURE · BRIEF REMAINS USABLE');
    await page.waitForTimeout(2500);
    await page.mouse.wheel(0, 520);
    await page.waitForTimeout(2500);
    const video = page.video();
    await page.close();
    await context.close();
    await browser.close();
    const source = await video.path();
    run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-vf', 'fps=20,format=yuv420p', '-c:v', 'libx264', '-preset', 'veryfast', '-threads', '1', 'assets/day5-daily-brief-teach/a4-p1-guide.mp4'], {cwd: root});
  } finally {
    server.kill('SIGTERM');
  }
};

try {
  for (const id of selected) id === 'a4-p1' ? await renderBrowser() : renderTerminal(id);
  for (const slide of slides) {
    const id = slide.assignmentId.slice(6);
    const demo = id === 'a4-p1' ? {source: 'participant'} : demos[id];
    manifest.guides.push({
      assignmentId: slide.assignmentId,
      file: `assets/day5-daily-brief-teach/${id}-guide.mp4`,
      fingerprint: fingerprint(slide),
      evidenceRevision: demo.source === 'participant' ? PARTICIPANT_REVISION : TRAINER_REVISION,
      evidenceSource: demo.source === 'participant' ? 'saved participant checkpoint' : 'saved trainer reference',
      disclaimer: demo.source === 'participant'
        ? 'Offline synthetic demonstration — not a new Claude or connector execution'
        : 'Saved trainer reference with synthetic fixtures — not a live Claude, connector, or ElevenLabs execution'
    });
  }
  writeFileSync(new URL('assets/day5-daily-brief-teach/manifest.json', root), `${JSON.stringify(manifest, null, 2)}\n`);
} finally {
  rmSync(temporary, {recursive: true, force: true});
}
