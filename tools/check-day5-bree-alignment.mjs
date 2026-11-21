import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, realpathSync} from 'node:fs';
import {join, relative} from 'node:path';
import vm from 'node:vm';

const participantPath = process.argv[2] || process.env.DAY5_PARTICIPANT_DIR;
const proofPath = process.argv[3] || process.env.DAY5_PROOF_DIR;
assert.ok(participantPath && proofPath,
  'Set DAY5_PARTICIPANT_DIR and DAY5_PROOF_DIR, or pass the participant and solution directories as arguments.');
const repositories = [participantPath, proofPath].map(path => realpathSync(path));
const root = new URL('../', import.meta.url);
const context = {window: {}};
vm.runInNewContext(readFileSync(new URL('day5-daily-brief-slides.js', root), 'utf8'), context);
const assignments = context.window.SLIDES.filter(slide => /^brief-a[1-7](?:-p[1-3])?$/.test(slide.assignmentId));
const exampleIndex = context.window.SLIDES.findIndex(slide => slide.title === 'A brief worth opening');
assert.ok(exampleIndex >= 0 && exampleIndex < context.window.SLIDES.indexOf(assignments[0]),
  'Show the complete example before participants start building.');
assert.equal(context.window.SLIDES[exampleIndex].source?.url,
  'assets/day5-daily-brief-teach/bree-example.html', 'The example must open the complete HTML artifact.');
assert.deepEqual(Array.from(assignments, slide => slide.assignmentId), [
  'brief-a1-p1', 'brief-a1-p2', 'brief-a2-p1', 'brief-a2-p2', 'brief-a3',
  'brief-a4-p1', 'brief-a4-p2', 'brief-a5-p1', 'brief-a5-p2', 'brief-a5-p3',
  'brief-a6-p1', 'brief-a6-p2', 'brief-a6-p3', 'brief-a7'
], 'Publish all fourteen assignment parts in their teaching order.');
const promptSlides = assignments.filter(slide => slide.prompt);
const group = number => assignments.filter(slide => slide.assignmentId.match(/^brief-a([1-7])/)[1] === String(number));
const groupText = number => JSON.stringify(group(number));

const read = (directory, file) => readFileSync(join(directory, file), 'utf8');
const quotedPrompts = text => Array.from(text.matchAll(/^> (.+)$/gm), match => match[1]);
for (const repository of repositories) {
  const voicePrompts = quotedPrompts(read(repository, 'docs/voice-extension.md'));
  const voiceSlides = context.window.SLIDES.filter(slide => /^brief-voice-p[12]$/.test(slide.assignmentId));
  assert.equal(voicePrompts.length, voiceSlides.length, `${repository}: voice prompts need matching slides.`);
  for (const [index, prompt] of voicePrompts.entries()) {
    const slide = voiceSlides[index];
    assert.ok(slide.steps.some(step => step.prompt === prompt), `${repository}: ${slide.assignmentId} guide prompt drifted.`);
    assert.ok(slide.teach.copy.some(entry => entry[1] === prompt), `${repository}: ${slide.assignmentId} presenter prompt drifted.`);
  }
  const solo = read(repository, 'SOLO.md');
  const prompts = quotedPrompts(solo);
  assert.equal(prompts.length, promptSlides.length, `${repository}: every prompted part needs one exact prompt.`);
  assert.ok(existsSync(join(repository, 'reference/dia-to-bree.md')),
    `${repository}: the Dia-to-Bree decomposition must be available to participants.`);
  const email = JSON.parse(read(repository, 'sample/outlook-email.sample.json'));
  assert.equal(email.synthetic, true, `${repository}: Outlook practice must remain explicitly synthetic.`);
  assert.deepEqual(quotedPrompts(read(repository, 'docs/prompts.md')), prompts,
    `${repository}: docs/prompts.md must match SOLO.md.`);
  for (const [index, prompt] of prompts.entries()) {
    const slide = promptSlides[index];
    const label = `${repository}: ${slide.assignmentId}`;
    assert.equal(slide.prompt, prompt, `${label}: the slide main prompt drifted.`);
    assert.ok(slide.steps.some(step => step.prompt === prompt), `${label}: steps must contain the exact prompt.`);
    assert.ok(slide.teach.copy.some(entry => entry[1] === prompt), `${label}: presenter copy must match.`);
  }
  assert.doesNotMatch(solo, /\bgit (?:switch|checkout step-)\b/, `${repository}: no exercise branch switching.`);
  const scripts = JSON.parse(read(repository, 'package.json')).scripts;
  for (const slide of assignments) {
    for (const [, script] of JSON.stringify(slide.steps).matchAll(/npm run ([a-zA-Z0-9:_-]+)/g)) {
      assert.ok(Object.hasOwn(scripts, script), `${repository}: ${slide.assignmentId} calls missing npm script ${script}.`);
    }
  }
}

assert.match(groupText(3), /\/visual-plan\b/, 'A3 must use visual planning.');
assert.match(groupText(5), /Claude Agent SDK|claude-agent-sdk|query\(/, 'A5 must build a real SDK route.');
assert.match(groupText(5), /\bmcp\b/i, 'A5 must name the approved MCP source.');
assert.match(groupText(2), /reference\/dia-to-bree\.md/, 'A2 must reverse engineer the safe brief structure.');
assert.match(groupText(4), /out\/latest\.html/, 'A4 must produce the complete synthetic HTML artifact.');
assert.match(groupText(5), /~\/\.bree\/briefs\/YYYY-MM-DD\.html/, 'A5 must produce private dated HTML.');
assert.doesNotMatch(groupText(5), /terminal[- ]only|print .*only to the terminal/i, 'A5 must not retain terminal-only output.');
assert.match(groupText(5), /npm run brief:live\b/, 'A5 must invoke the live route.');
assert.match(groupText(6), /\/(?:pstack:)?create-verification-skill\b/, 'A6 must include the verification generator.');
for (const [number, skill] of [[1, 'grilling'], [2, 'eli5'], [3, 'visual-plan'], [4, 'verify-this'], [5, 'eli5'], [6, 'create-verification-skill'], [7, 'handoff']]) {
  assert.ok(groupText(number).includes(`/${skill}`), `A${number} must use its named project skill.`);
}

function skillFiles(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? skillFiles(path) : [path];
  });
}
for (const skill of ['grilling', 'eli5', 'visual-plan', 'verify-this', 'create-verification-skill', 'handoff']) {
  const directories = repositories.map(repository => join(repository, '.claude/skills', skill));
  const files = directories.map(directory => skillFiles(directory).map(file => relative(directory, file)).sort());
  assert.ok(files[0].includes('SKILL.md'), `${skill}: a registered skill needs SKILL.md.`);
  assert.deepEqual(files[0], files[1], `${skill}: starter and solution must bundle the same files.`);
  for (const file of files[0]) {
    assert.equal(read(directories[0], file), read(directories[1], file), `${skill}/${file} differs between repositories.`);
  }
}

const media = new Set();
function inspect(value) {
  if (typeof value === 'string' && value.startsWith('assets/') && !/\s/.test(value)) media.add(value);
  else if (Array.isArray(value)) value.forEach(inspect);
  else if (value && typeof value === 'object') Object.values(value).forEach(inspect);
}
inspect(context.window.SLIDES);
for (const file of media) assert.ok(existsSync(new URL(file, root)), `Missing published media: ${file}`);
console.log(`PASS Bree alignment: ${assignments.length} assignment parts, ${promptSlides.length} exact prompts across slides/notes/two repos, live SDK route, planning/verification skills and ${media.size} media references.`);
console.log('Media freshness and live connector execution require their separate checks.');
