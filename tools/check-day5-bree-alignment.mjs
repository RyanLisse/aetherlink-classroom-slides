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
const assignments = context.window.SLIDES.filter(slide => /^brief-a\d+$/.test(slide.assignmentId));
const exampleIndex = context.window.SLIDES.findIndex(slide => slide.title === 'A brief worth opening');
assert.ok(exampleIndex >= 0 && exampleIndex < context.window.SLIDES.indexOf(assignments[0]),
  'Show the complete example before participants start building.');
assert.equal(context.window.SLIDES[exampleIndex].source?.url,
  'assets/day5-daily-brief-teach/bree-example.html', 'The example must open the complete HTML artifact.');
assert.deepEqual(Array.from(assignments, slide => slide.assignmentId),
  Array.from({length: 7}, (_, i) => `brief-a${i + 1}`), 'Publish A1–A7 once, in order.');

const read = (directory, file) => readFileSync(join(directory, file), 'utf8');
const quotedPrompts = text => Array.from(text.matchAll(/^> (.+)$/gm), match => match[1]);
for (const repository of repositories) {
  const solo = read(repository, 'SOLO.md');
  const prompts = quotedPrompts(solo);
  assert.equal(prompts.length, 6, `${repository}: A1–A6 need six main prompts.`);
  assert.ok(existsSync(join(repository, 'reference/dia-to-bree.md')),
    `${repository}: the Dia-to-Bree decomposition must be available to participants.`);
  const email = JSON.parse(read(repository, 'sample/outlook-email.sample.json'));
  assert.equal(email.synthetic, true, `${repository}: Outlook practice must remain explicitly synthetic.`);
  assert.deepEqual(quotedPrompts(read(repository, 'docs/prompts.md')), prompts,
    `${repository}: docs/prompts.md must match SOLO.md.`);
  for (const [index, prompt] of prompts.entries()) {
    const slide = assignments[index];
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

assert.match(JSON.stringify([assignments[2].steps, assignments[2].teach]), /\/visual-plan\b/,
  'A3 must use visual planning in its instructions or presenter notes.');
assert.match(assignments[4].prompt, /Claude Agent SDK|claude-agent-sdk|query\(/,
  'A5 must build a real SDK route.');
assert.match(assignments[4].prompt, /\bmcp\b/i, 'A5 must name the approved MCP source.');
assert.match(assignments[1].prompt, /reference\/dia-to-bree\.md/, 'A2 must reverse engineer the safe brief structure.');
assert.match(assignments[3].prompt, /out\/latest\.html/, 'A4 must produce the complete synthetic HTML artifact.');
assert.match(assignments[4].prompt, /~\/\.bree\/briefs\/YYYY-MM-DD\.html/,
  'A5 must produce a dated private HTML artifact outside the repository.');
assert.doesNotMatch(assignments[4].prompt, /terminal[- ]only|print .*only to the terminal/i,
  'A5 must not retain the obsolete terminal-only result.');
assert.match(JSON.stringify(assignments[4].steps), /npm run brief:live\b/, 'A5 must invoke the live route.');
assert.doesNotMatch(assignments[4].prompt, /controlled test-model choice|Give it no network/,
  'A5 must not describe a fixture-only model as the live route.');
assert.match(JSON.stringify([assignments[5].steps, assignments[5].teach]), /\/(?:pstack:)?create-verification-skill\b/,
  'A6 must include the verification generator.');

function skillFiles(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? skillFiles(path) : [path];
  });
}
for (const skill of ['visual-plan', 'create-verification-skill']) {
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
console.log(`PASS Bree alignment: seven assignments, six exact prompts across slides/notes/two repos, live SDK route, planning/verification skills and ${media.size} media references.`);
console.log('Media freshness and live connector execution require their separate checks.');
