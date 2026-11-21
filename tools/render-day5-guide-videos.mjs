import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const context = {window: {}};
vm.runInNewContext(readFileSync(new URL('day5-daily-brief-slides.js', root), 'utf8'), context);
const assignments = context.window.SLIDES.filter(slide => /^brief-a[1-7](?:-p[1-3])?$/.test(slide.assignmentId ?? ''));
const voiceBonus = context.window.SLIDES.filter(slide => /^brief-voice-p[12]$/.test(slide.assignmentId ?? ''));
const guidedSlides = [...assignments, ...voiceBonus];
const groups = new Set(assignments.map(slide => slide.assignmentId.match(/^brief-(a[1-7])/)[1]));
if (groups.size !== 7) throw new Error(`Expected seven assignment groups, found ${groups.size}`);
if (voiceBonus.length !== 2) throw new Error(`Expected two voice bonus parts, found ${voiceBonus.length}`);

const assignmentText = JSON.stringify(guidedSlides);
if (/outlook\s+(?:connector|mcp)|(?:connector|mcp)[^.;]{0,40}outlook|microsoft\s+graph|live\s+(?:outlook|mailbox)/i.test(assignmentText)) {
  throw new Error('Assignment videos may use the synthetic Outlook fixture, but must not teach a live Outlook connector route');
}
const teachesInstallation = guidedSlides.some(slide => slide.steps.some(step =>
  /^(?:install|add)\b.*\b(?:mcp|connector)\b/i.test(step.text?.trim() ?? '') ||
  /(?:npm|pnpm|yarn)\s+(?:i|install)\b|brew\s+install\b/i.test(step.prompt ?? '')
));
if (teachesInstallation) {
  throw new Error('Assignment videos must use the existing approved MCP setup, not teach connector installation');
}

const escape = text => String(text ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
})[character]);

const wrap = (text, width = 62, maximum = 5) => {
  const words = String(text ?? '').replace(/\s+/g, ' ').trim().split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if (!line || `${line} ${word}`.length <= width) line = line ? `${line} ${word}` : word;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines.slice(0, maximum);
};

const textLines = (lines, x, y, size, fill = '#e8efff', weight = 500) => lines
  .map((line, index) => `<text x="${x}" y="${y + index * size * 1.35}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escape(line)}</text>`)
  .join('');

const codeLines = (code, x, y) => String(code ?? '').split('\n')
  .flatMap(line => wrap(line, 70, 3))
  .slice(0, 3)
  .map((line, index) => `<text x="${x}" y="${y + index * 30}" font-family="Menlo, monospace" font-size="21" font-weight="700" fill="#63d5e8">${escape(line)}</text>`)
  .join('');

const frame = ({label, title, body, code, footer}) => `<svg xmlns="http://www.w3.org/2000/svg" width="1148" height="780">
  <rect width="1148" height="780" fill="#061523"/>
  <circle cx="92" cy="78" r="28" fill="#8f55f7"/><circle cx="130" cy="62" r="9" fill="#63d5e8"/>
  <text x="144" y="88" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="3" fill="#f3f6ff">AETHERLINK</text>
  <rect x="72" y="142" width="1004" height="54" rx="27" fill="#13283d" stroke="#31516d"/>
  <text x="100" y="177" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#63d5e8">${escape(label)}</text>
  ${textLines(wrap(title, 35), 72, 268, 47, '#f3f6ff', 750)}
  <rect x="72" y="382" width="1004" height="252" rx="22" fill="#0e2234" stroke="#8f55f7" stroke-width="2"/>
  ${textLines(wrap(body, 56, code ? 2 : 5), 112, code ? 432 : 442, 29)}
  ${code ? `<rect x="112" y="510" width="924" height="108" rx="14" fill="#071724" stroke="#31516d"/>${codeLines(code, 140, 548)}` : ''}
  <rect x="72" y="683" width="1004" height="1" fill="#31516d"/>
  ${textLines(wrap(footer, 90), 72, 718, 18, '#ff7a25', 700)}
</svg>`;

const fingerprint = slide => createHash('sha256').update(JSON.stringify({
  title: slide.title,
  subtitle: slide.subtitle,
  steps: slide.steps,
  expected: slide.expected,
  prompt: slide.prompt,
  copy: slide.teach?.copy
})).digest('hex').slice(0, 16);

const manifestUrl = new URL('assets/day5-daily-brief-teach/manifest.json', root);
const requested = process.argv.find(argument => argument.startsWith('--assignment='))?.split('=')[1];
if (requested && !/^(?:a[1-7](?:-p[1-3])?|voice-p[12])$/.test(requested)) throw new Error(`Unknown assignment selector: ${requested}`);
const selectedAssignments = requested
  ? guidedSlides.filter(slide => slide.assignmentId === `brief-${requested}`)
  : guidedSlides;
const manifest = requested
  ? JSON.parse(readFileSync(manifestUrl, 'utf8'))
  : {format: 1, kind: 'instruction-walkthrough', generatedFrom: 'day5-daily-brief-slides.js', guides: []};
if (requested) {
  for (const slide of guidedSlides.filter(candidate => candidate.assignmentId !== `brief-${requested}`)) {
    const recorded = manifest.guides.find(guide => guide.assignmentId === slide.assignmentId);
    if (recorded?.fingerprint !== fingerprint(slide)) {
      throw new Error(`${slide.assignmentId} also changed; run a full media render instead of an assignment-only render`);
    }
  }
}
const temporary = mkdtempSync(join(tmpdir(), 'day5-guides-'));

try {
  for (const slide of selectedAssignments) {
    const id = slide.assignmentId.slice(6);
    const stepText = JSON.stringify(slide.steps);
    const frames = [
      frame({
        label: `${slide.assignmentId.toUpperCase()} · INSTRUCTION WALKTHROUGH`,
        title: slide.title,
        body: slide.subtitle || 'Follow the assignment steps in the participant repository.',
        footer: slide.assignmentId.startsWith('brief-voice')
          ? 'Prepared with synthetic content · not a live ElevenLabs account or API recording'
          : 'Prepared with synthetic content · not a live Claude or connector recording'
      }),
      ...(slide.assignmentId === 'brief-a5-p1' ? [frame({
        label: 'BRIEF-A5 · EXISTING APPROVED CONNECTION',
        title: 'Use the existing Jira MCP',
        body: 'Run /mcp in Claude Code. Inspect the approved Jira connection and choose its exact read-only tool. Do not add a connector.',
        footer: 'Run live:check before any approved private read · keep the live output private'
      })] : []),
      ...(slide.assignmentId === 'brief-a4' ? [frame({
        label: 'BRIEF-A4 · LOCAL SYNTHETIC ARTIFACT',
        title: 'Open out/latest.html',
        body: 'Inspect every brief section, source label and visible OPEN state. Compare the generated page with the accepted contract and plan.',
        footer: 'Instruction frame · not a captured participant result or live-source artifact'
      })] : []),
      ...(slide.assignmentId.startsWith('brief-a5') && /brief:live/.test(stepText) ? [frame({
        label: 'BRIEF-A5 · PRIVATE LIVE ARTIFACT',
        title: 'Keep the validated HTML private',
        body: 'Only the host application may write the validated artifact to ~/.bree/briefs/YYYY-MM-DD.html. Do not store raw connector output.',
        footer: 'The dated artifact stays OPEN unless an approved private run produced it'
      })] : []),
      ...(slide.assignmentId.startsWith('brief-a6') && /trigger|scheduler/i.test(stepText) ? [frame({
        label: 'BRIEF-A6 · TRIGGER PROPOSAL',
        title: 'Propose the daily trigger',
        body: 'Document its command, working directory, logs, rollback and owner. Review the proposal without installing or enabling a schedule.',
        footer: 'No scheduler is installed or activated in this walkthrough'
      })] : []),
      ...(slide.assignmentId === 'brief-voice-p1' ? [frame({
        label: 'VOICE BONUS · PERSONAL KEY',
        title: 'Keep the key outside chat and Git',
        body: 'Use a personal account. Restrict the key to Text to Speech, set a small credit limit and save it only in the ignored .env.local file.',
        footer: 'Synthetic brief only · skip this optional bonus when an external account is unavailable'
      })] : []),
      ...(slide.assignmentId === 'brief-voice-p2' ? [frame({
        label: 'VOICE BONUS · FREE CHECK FIRST',
        title: 'Test with a mocked response',
        body: 'Run test:voice before the explicit API call. The test sends no network request and uses no credits. The HTML brief remains unchanged.',
        footer: 'Instruction frame · no ElevenLabs request or live account recording'
      })] : []),
      ...(slide.teach?.copy ?? []).map(([name]) => frame({
        label: `${slide.assignmentId.toUpperCase()} · COPY-READY INPUT`,
        title: name,
        body: 'Copy the exact prompt from the assignment slide or Presenter view. Read its stop point before you run it.',
        footer: 'Do not type credentials, internal URLs, customer data or copied work content into the prompt'
      })),
      ...slide.steps.map((step, index) => frame({
        label: `${slide.assignmentId.toUpperCase()} · STEP ${index + 1} OF ${slide.steps.length}`,
        title: step.where,
        body: step.text,
        code: step.prompt && step.prompt.length < 150 ? step.prompt : '',
        footer: step.prompt?.length >= 150 ? 'Paste the exact SOLO prompt from the assignment slide' : (step.after || 'Perform this step in the named surface')
      })),
      frame({
        label: `${slide.assignmentId.toUpperCase()} · HUMAN CHECK`,
        title: 'Show the evidence',
        body: slide.expected || slide.teach?.done?.at(-1) || 'Run the named check and inspect the result.',
        footer: 'Synthetic proof and live connector proof are recorded separately'
      })
    ];
    const list = join(temporary, `${id}.txt`);
    const entries = [];
    frames.forEach((content, index) => {
      const source = join(temporary, `${id}-${index}.svg`);
      const rendered = join(temporary, `${id}-${index}.png`);
      writeFileSync(source, content);
      execFileSync('sips', ['-s', 'format', 'png', source, '--out', rendered], {stdio: 'ignore'});
      entries.push(`file '${rendered}'`, 'duration 3');
    });
    entries.push(entries.at(-2));
    writeFileSync(list, `${entries.join('\n')}\n`);
    const output = new URL(`assets/day5-daily-brief-teach/${id}-guide.mp4`, root);
    const pending = join(temporary, `${id}-guide.mp4`);
    execFileSync('ffmpeg', [
      '-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list,
      '-vf', 'scale=1148:780:flags=lanczos,fps=10,format=yuv420p', '-c:v', 'libx264', '-preset', 'veryfast', '-threads', '1', pending
    ], {stdio: 'inherit'});
    renameSync(pending, output);
    manifest.guides = manifest.guides.filter(guide => guide.assignmentId !== slide.assignmentId);
    manifest.guides.push({
      assignmentId: slide.assignmentId,
      file: `assets/day5-daily-brief-teach/${id}-guide.mp4`,
      fingerprint: fingerprint(slide),
      frameCount: frames.length,
      disclaimer: id.startsWith('voice-')
        ? 'Instruction walkthrough — not a live ElevenLabs account or API recording'
        : 'Instruction walkthrough — not a live Claude or connector recording'
    });
  }
  manifest.guides.sort((left, right) => left.assignmentId.localeCompare(right.assignmentId));
  writeFileSync(manifestUrl, `${JSON.stringify(manifest, null, 2)}\n`);
} finally {
  rmSync(temporary, {recursive: true, force: true});
}
