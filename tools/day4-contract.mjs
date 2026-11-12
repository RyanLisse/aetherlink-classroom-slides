// Writes tools/day4-participant-contract.json: what the Day 4 deck may refer to in the participant
// repositories. Run it after a change to those repositories:
//   node tools/day4-contract.mjs <aetherlink-day4-n8n-to-agent on trainer/solution> <weather-agent-sdk>
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const repos = process.argv.slice(2);
if (repos.length !== 2) throw new Error('Give the path of both participant repositories.');
const git = (dir, ...args) => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8' }).trim();
const contract = {
  sources: repos.map((dir) => ({ repository: git(dir, 'remote', 'get-url', 'origin').replace(/.*github\.com[:/]|\.git$/g, ''), commit: git(dir, 'rev-parse', 'HEAD') })),
  scripts: [...new Set(repos.flatMap((dir) => Object.keys(JSON.parse(readFileSync(`${dir}/package.json`, 'utf8')).scripts)))].sort(),
  files: [...new Set(repos.flatMap((dir) => git(dir, 'ls-files').split('\n')))].sort(),
  testCommands: Object.fromEntries([...readFileSync(`${repos[0]}/SOLO.md`, 'utf8').matchAll(/## SOLO (\d) ·[\s\S]*?Then test it yourself in a second terminal:\n\n```sh\n([\s\S]*?)\n```/g)].map(([, step, block]) => [step, block.split('\n')])),
};
writeFileSync(new URL('./day4-participant-contract.json', import.meta.url), `${JSON.stringify(contract, null, 2)}\n`);
console.log(`${contract.scripts.length} scripts, ${contract.files.length} files, test commands for SOLO ${Object.keys(contract.testCommands).join(', ')}`);
