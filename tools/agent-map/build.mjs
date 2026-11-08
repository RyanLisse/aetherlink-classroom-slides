import {build} from 'esbuild';
import {cp, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import {routeIds,routeNodes} from './src/route.mjs';

const sourceDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(sourceDir, '../../assets/agent-map');
const nodeIds = new Set(routeNodes.map(node => node.id));
assert.deepEqual(routeIds,['input','orchestrator','context','risk','priority','reply','adapter','switch','human']);
assert.ok(routeIds.every(id => nodeIds.has(id)),'every route step must resolve to a node');
assert.equal(routeNodes.find(node => node.id === 'adapter').output,'output: { priority, message }');

await mkdir(outputDir, {recursive: true});
await build({
  entryPoints: [path.join(sourceDir, 'src/main.jsx')],
  bundle: true,
  format: 'iife',
  minify: true,
  outfile: path.join(outputDir, 'app.js'),
  sourcemap: false,
  target: ['es2020'],
  jsx: 'automatic'
});
await cp(path.join(sourceDir, 'src/index.html'), path.join(outputDir, 'index.html'));
await cp(path.join(sourceDir, 'src/styles.css'), path.join(outputDir, 'styles.css'));
await cp(path.join(sourceDir, 'node_modules/@xyflow/react/dist/style.css'), path.join(outputDir, 'react-flow.css'));
