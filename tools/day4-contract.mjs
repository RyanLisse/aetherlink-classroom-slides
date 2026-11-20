// Writes tools/day4-participant-contract.json: what the Day 4 decks may refer to in the participant
// repositories. It reads git objects, so it needs no checkout and changes nothing. Run it after a change
// to those repositories. Give each repository as path@ref, the ref being its solved branch:
//   node tools/day4-contract.mjs <aetherlink-day4-n8n-to-agent>@origin/trainer/solution <weather-agent-sdk>@origin/trainer/solution
// Participants stay on main, so the copy prompts come from origin/main of the first repository.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const repos = process.argv.slice(2).map((arg) => { const at = arg.lastIndexOf('@'); return at > 0 ? { dir: arg.slice(0, at), ref: arg.slice(at + 1) } : { dir: arg, ref: 'HEAD' }; });
if (repos.length !== 2) throw new Error('Give the path of both participant repositories.');
const git = (dir, ...args) => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8' }).trim();
const show = ({ dir, ref }, file) => git(dir, 'show', `${ref}:${file}`);
// A clone can have a personal fork as origin. The participants use the AetherLink-bv repository.
const repository = (dir) => {
  const urls = git(dir, 'remote', '-v').split('\n').map((line) => line.split(/\s+/)[1]).filter(Boolean);
  return (urls.find((url) => url.includes('AetherLink-bv/')) || git(dir, 'remote', 'get-url', 'origin')).replace(/.*github\.com[:/]|\.git$/g, '');
};
const main = { dir: repos[0].dir, ref: 'origin/main' };
const solo = show(repos[0], 'SOLO.md');
const contract = {
  sources: repos.map(({ dir, ref }) => ({ repository: repository(dir), commit: git(dir, 'rev-parse', ref) })),
  scripts: [...new Set(repos.flatMap((repo) => Object.keys(JSON.parse(show(repo, 'package.json')).scripts)))].sort(),
  files: [...new Set(repos.flatMap(({ dir, ref }) => git(dir, 'ls-tree', '-r', '--name-only', ref).split('\n')))].sort(),
  testCommands: Object.fromEntries([...solo.matchAll(/## SOLO (\d) ·[\s\S]*?Then test it yourself in a second terminal:\n\n```sh\n([\s\S]*?)\n```/g)].map(([, step, block]) => [step, block.split('\n')])),
  // Every fenced text or sh block a participant can copy from SOLO.md and README.md on main.
  prompts: {
    commit: git(main.dir, 'rev-parse', main.ref),
    blocks: ['SOLO.md', 'README.md'].flatMap((file) => [...show(main, file).matchAll(/```(?:text|sh)\n([\s\S]*?)\n```/g)].map(([, block]) => block)),
  },
};
writeFileSync(new URL('./day4-participant-contract.json', import.meta.url), `${JSON.stringify(contract, null, 2)}\n`);
console.log(`${contract.scripts.length} scripts, ${contract.files.length} files, test commands for SOLO ${Object.keys(contract.testCommands).join(', ')}, ${contract.prompts.blocks.length} copy blocks`);
