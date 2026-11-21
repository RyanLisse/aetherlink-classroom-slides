import {createHash} from 'node:crypto';
import {execFileSync, spawn} from 'node:child_process';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import vm from 'node:vm';

const PARTICIPANT_REVISION = 'b54a19851bda3b885b1ef087169744db664110c7';
const TRAINER_REVISION = 'beec03ff9c1232704f74651e57e2da132874758e';
const SOURCE_ARCHIVES = {
  participant: {file: '.github/capture-input/participant-b54a198.tar.gz', sha256: 'f76f7bf18296d3c2ec18cd0e481895bb793b35caa91703f67853bc86a49eaab0'},
  trainer: {file: '.github/capture-input/trainer-beec03f.tar.gz', sha256: '3967b737bb6ad65c1cf2f482d9880a3b89dfcf09f0455e7fe1a51caf03c02c06'}
};
const REPOSITORY = 'https://github.com/AetherLink-bv/aetherlink-daily-brief-lab-s1.git';
const root = new URL('../', import.meta.url);
const work = new URL('.day5-video-work/', root);

const demos = {
  'a1-p1': {source: 'participant', command: "grep -nE 'Maya|09:00|decision' intent.md sample/calendar-item.sample.json > /tmp/a1-choice.log; test $(wc -l < /tmp/a1-choice.log) -ge 3; head -10 /tmp/a1-choice.log", result: 'CHECK: the offline human choice must agree with the synthetic fixture.'},
  'a1-p2': {source: 'participant', command: "mv src/mini.ts src/mini.ts.saved; npm run test:mini >/tmp/a1-red.log 2>&1; red=$?; mv src/mini.ts.saved src/mini.ts; if [ $red -eq 0 ]; then exit 1; fi; printf 'RED exit: %s\\n' $red; grep -E 'ERR_MODULE_NOT_FOUND|fail ' /tmp/a1-red.log | tail -2; npm run test:mini && npm run mini", result: 'CHECK: a real isolated red run must be followed by the green decision line.'},
  'a2-p1': {source: 'participant', command: "sed -n '1,22p' docs/spec.md", result: 'CHECK: show the accepted DailyBrief contract.'},
  'a2-p2': {source: 'participant', command: "mv src/brief.ts src/brief.ts.saved; npm run test:schema >/tmp/a2-red.log 2>&1; red=$?; mv src/brief.ts.saved src/brief.ts; if [ $red -eq 0 ]; then exit 1; fi; printf 'RED exit: %s\\n' $red; grep -E 'ERR_MODULE_NOT_FOUND|fail ' /tmp/a2-red.log | tail -2; npm run test:schema", result: 'CHECK: a real isolated red run must be followed by the green schema result.'},
  a3: {source: 'participant', command: "grep -nE 'fixture|schema|renderer|OPEN' docs/design.md > /tmp/a3-plan.log; grep -q 'schema' /tmp/a3-plan.log; grep -q 'OPEN' /tmp/a3-plan.log; head -8 /tmp/a3-plan.log", result: 'CHECK: the offline plan must retain its OPEN live gate.'},
  'a4-p2': {source: 'participant', command: "if ! grep -q 'EXIT_CODE=1' evidence/a4-picsum-replay/a4-red.log; then exit 1; fi; grep -E 'not ok|fail |EXIT_CODE' evidence/a4-picsum-replay/a4-red.log | tail -4; npm run test:render && npm run brief:sample && grep -c 'status open' out/latest.html", result: 'CHECK: labeled saved red evidence must precede a new green render.'},
  'a5-p1': {source: 'trainer', command: "set -o pipefail; npm run test:live 2>&1 | grep -E '✔|tests |pass |fail ' | tail -10", result: 'The synthetic boundary tests pass; live access stays OPEN.'},
  'a5-p2': {source: 'trainer', command: "set -o pipefail; npm run typecheck && npm run test:live 2>&1 | grep -E 'tests |pass |fail '", result: 'The bounded host route typechecks and passes.'},
  'a5-p3': {source: 'trainer', command: "npm run live:check; code=$?; if [ $code -ne 1 ]; then exit 1; fi; printf 'Expected OPEN exit code: %s\\n' $code", result: 'No private configuration means OPEN; no live brief is written.'},
  'a6-p1': {source: 'trainer', command: 'npm run eval', result: 'READY, OPEN and CONFLICT cases all pass.'},
  'a6-p2': {source: 'trainer', command: "npm run docs:check && npm run typecheck && npm run eval", result: 'CHECK: the targeted repeatable synthetic journey must pass.'},
  'a6-p3': {source: 'trainer', command: "grep -nE 'scheduler|daily trigger' docs/plan.md docs/gate.md > /tmp/a6-trigger.log; grep -q 'never installs or activates a scheduler' /tmp/a6-trigger.log; head -6 /tmp/a6-trigger.log", result: 'The local trigger remains a proposal; nothing is installed.'},
  a7: {source: 'trainer', command: 'npm run test:tool', result: 'The bounded synthetic Outlook tool journey passes.'},
  'voice-p1': {source: 'trainer', command: "touch .env.local && git check-ignore .env.local && ! git status --short --untracked-files=all | grep -q '.env.local' && echo 'PASS: ignored key file is absent from Git status'", result: 'The personal key file stays outside Git.'},
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
const prepare = (directory, branch, revision, archiveName) => {
  const archive = new URL(`.github/capture-input/${archiveName}`, root);
  rmSync(directory, {recursive: true, force: true});
  if (existsSync(archive)) {
    const expectedHash = Object.values(SOURCE_ARCHIVES).find(source => source.file.endsWith(archiveName))?.sha256;
    const actualHash = createHash('sha256').update(readFileSync(archive)).digest('hex');
    if (actualHash !== expectedHash) throw new Error(`${archiveName} source hash mismatch`);
    mkdirSync(directory, {recursive: true});
    run('tar', ['-xzf', archive.pathname, '-C', directory.pathname]);
    run('git', ['init', '-q'], {cwd: directory});
    run('git', ['add', '.'], {cwd: directory});
    run('git', ['-c', 'user.name=Capture', '-c', 'user.email=capture@example.invalid', 'commit', '-qm', `Exact tracked source from ${revision}`], {cwd: directory});
  } else {
    run('git', ['clone', '--depth=80', '--branch', branch, REPOSITORY, directory.pathname]);
    run('git', ['fetch', '--depth=80', 'origin', revision], {cwd: directory});
    run('git', ['checkout', '--detach', revision], {cwd: directory});
    const actual = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: directory, encoding: 'utf8'}).trim();
    if (actual !== revision) throw new Error(`Expected ${revision}, found ${actual}`);
  }
  run('npm', ['ci', '--ignore-scripts'], {cwd: directory});
};

prepare(participant, 'codex/ryan-picsum-replay', PARTICIPANT_REVISION, 'participant-b54a198.tar.gz');
prepare(trainer, 'codex/day5-ryan-bree-solution', TRAINER_REVISION, 'trainer-beec03f.tar.gz');
const selected = sampleOnly ? ['a4-p1', 'voice-p2'] : requested ? [requested] : slides.map(slide => slide.assignmentId.slice(6));
const temporary = mkdtempSync(join(tmpdir(), 'bree-evidence-demos-'));
const fullRender = selected.length === slides.length;
const manifestUrl = new URL('assets/day5-daily-brief-teach/manifest.json', root);
const manifest = fullRender
  ? {format: 2, kind: 'evidence-demonstration', generatedFrom: 'day5-daily-brief-slides.js', guides: []}
  : JSON.parse(readFileSync(manifestUrl, 'utf8'));

const addPermanentLabel = (file, label) => {
  const pending = `${file}.labeled.mp4`;
  const safeLabel = label.replaceAll(':', '\\:').replaceAll("'", "\\'");
  run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', file,
    '-vf', `scale=1148:730:flags=lanczos,pad=1148:780:0:50:black,drawbox=x=0:y=0:w=iw:h=50:color=0x061523:t=fill,drawtext=text='${safeLabel}':x=18:y=11:fontsize=24:fontcolor=0x63d5e8`,
    '-c:v', 'libx264', '-preset', 'veryfast', '-threads', '1', pending
  ], {cwd: root});
  renameSync(new URL(pending, root), new URL(file, root));
};

const renderTerminal = id => {
  const demo = demos[id];
  const revision = demo.source === 'participant' ? PARTICIPANT_REVISION : TRAINER_REVISION;
  const directory = demo.source === 'participant' ? 'participant-replay' : 'trainer-reference';
  const label = demo.source === 'participant'
    ? `SAVED PARTICIPANT CHECKPOINT · ${revision.slice(0, 7)} · OFFLINE SYNTHETIC`
    : `SAVED TRAINER REFERENCE · ${revision.slice(0, 7)} · OFFLINE SYNTHETIC`;
  const tape = join(temporary, `${id}.tape`);
  const output = `assets/day5-daily-brief-teach/${id}-guide.mp4`;
  const marker = `/tmp/bree-capture-${id}.exit`;
  rmSync(marker, {force: true});
  run('bash', ['-lc', demo.command], {cwd: new URL(`${directory}/`, work)});
  writeFileSync(tape, `Output "${output}"
Set Shell "bash"
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
Type "capture_exit=$?; printf '\\nCOMMAND_EXIT=%s\\n' $capture_exit; printf '%s' $capture_exit > ${marker}"
Enter
Sleep 4s
`);
  run('vhs', [tape], {cwd: root});
  const capturedExit = readFileSync(marker, 'utf8').trim();
  if (capturedExit !== '0') throw new Error(`${id} recorded COMMAND_EXIT=${capturedExit}`);
  addPermanentLabel(output, label);
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
    const executablePath = process.env.CHROME_PATH || undefined;
    const browser = await chromium.launch(executablePath ? {executablePath} : {});
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
    await page.waitForTimeout(4000);
    await page.mouse.wheel(0, 380);
    await page.waitForTimeout(3000);
    await label('ACTION · BLOCK ONLY picsum.photos · SAME REVISION');
    await page.waitForTimeout(1500);
    await page.route('https://picsum.photos/**', route => route.abort('blockedbyclient'));
    await page.reload();
    await page.evaluate(() => scrollTo(0, 0));
    const blockedState = await page.evaluate(() => ({
      imageFailed: [...document.images].some(image => image.src.startsWith('https://picsum.photos/') && image.complete && image.naturalWidth === 0),
      fallbackVisible: [...document.querySelectorAll('body *')].some(node => node.textContent?.trim() === 'The brief remains available if the illustration cannot load.' && getComputedStyle(node).display !== 'none'),
      sections: [...document.querySelectorAll('h2')].map(node => node.textContent?.trim())
    }));
    const requiredSections = ['Summary', 'Push your work forward', 'Top to-dos', 'New updates', 'Your day', 'Sources'];
    if (!blockedState.imageFailed || !blockedState.fallbackVisible || requiredSections.some(section => !blockedState.sections.includes(section))) {
      throw new Error(`Blocked image result is incomplete: ${JSON.stringify(blockedState)}`);
    }
    await label('SAME REVISION · CONTROLLED IMAGE FAILURE · BRIEF REMAINS USABLE');
    await page.waitForTimeout(4000);
    await page.mouse.wheel(0, 520);
    await page.waitForTimeout(3000);
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
  for (const id of selected) {
    const slide = slides.find(candidate => candidate.assignmentId === `brief-${id}`);
    const demo = id === 'a4-p1' ? {source: 'participant'} : demos[id];
    manifest.guides = manifest.guides.filter(guide => guide.assignmentId !== slide.assignmentId);
    manifest.guides.push({
      assignmentId: slide.assignmentId,
      file: `assets/day5-daily-brief-teach/${id}-guide.mp4`,
      fingerprint: fingerprint(slide),
      evidenceRevision: demo.source === 'participant' ? PARTICIPANT_REVISION : TRAINER_REVISION,
      evidenceSource: demo.source === 'participant' ? 'saved participant checkpoint' : 'saved trainer reference',
      sourceArchive: SOURCE_ARCHIVES[demo.source].file,
      sourceArchiveSha256: SOURCE_ARCHIVES[demo.source].sha256,
      command: id === 'a4-p1' ? 'real browser: loaded image, controlled block, usable brief' : demos[id].command,
      expectedExit: 0,
      videoSha256: createHash('sha256').update(readFileSync(new URL(`assets/day5-daily-brief-teach/${id}-guide.mp4`, root))).digest('hex'),
      disclaimer: demo.source === 'participant'
        ? 'Offline synthetic demonstration — not a new Claude or connector execution'
        : 'Saved trainer reference with synthetic fixtures — not a live Claude, connector, or ElevenLabs execution'
    });
  }
  manifest.guides.sort((left, right) => left.assignmentId.localeCompare(right.assignmentId));
  writeFileSync(manifestUrl, `${JSON.stringify(manifest, null, 2)}\n`);
} finally {
  rmSync(temporary, {recursive: true, force: true});
}
