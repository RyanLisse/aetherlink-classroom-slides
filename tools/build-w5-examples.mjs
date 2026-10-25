import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = new URL('../assets/workshop-5/assignments/', import.meta.url);
const examples = JSON.parse(readFileSync(new URL('examples.json', dir), 'utf8'));
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Workshop 5 assignment examples</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#eef2f5;color:#102b43;font:18px/1.5 system-ui,sans-serif}header,main{max-width:1120px;margin:auto;padding:32px}header p{max-width:850px}h1{font-size:38px;line-height:1.15}h2{font-size:30px;line-height:1.2;margin:8px 0 16px}nav{display:flex;gap:8px;flex-wrap:wrap}a{color:#075e68}nav a{font-size:14px;padding:6px 12px;border:1px solid #bac9d3;border-radius:20px;text-decoration:none;background:white}article{margin-bottom:64px;scroll-margin-top:24px}.phase{color:#075e68;font-size:14px;font-weight:750;letter-spacing:.1em;text-transform:uppercase}.scenario{font-size:21px;max-width:900px}.details{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0}.details section{background:white;border:1px solid #ced9e0;border-radius:12px;padding:18px}.details h3{font-size:16px;margin:0 0 8px}.details p{margin:0}.details .stop{border-left:5px solid #ac570c;grid-column:1/-1}.sample{border:1px solid #aac1cd;border-radius:14px;overflow:hidden;background:#fff}.sample-head{padding:18px 24px;background:#102b43;color:#fff;font-size:20px;font-weight:650}.sample pre{margin:0;padding:24px;font:20px/1.55 ui-monospace,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;color:#123c50}.sample footer{padding:14px 24px;background:#e5f4f1;color:#135950;font-size:15px;font-weight:650}.capture header,.capture .intro,.capture .details{display:none}.capture main{padding:24px;max-width:none}.capture article{display:none;margin:0}.capture article:target{display:block}.capture .sample pre{font-size:24px;line-height:1.55}.capture .sample-head{font-size:25px}.capture .sample footer{font-size:18px}.capture .sample{min-height:590px}.capture body{background:#eef2f5}@media(max-width:680px){header,main{padding:20px}.details{grid-template-columns:1fr}.sample pre{font-size:15px}}
</style></head><body>
<header><p class="phase">Workshop 5 · AI-native SDLC</p><h1>What each assignment produces</h1><p>Use these examples to recognise the expected result. They are teaching examples, not completed participant work or live model evidence. Fill your records with your own observations. The participant card contains the exact commands.</p><nav>${examples.map(e=>`<a href="#${esc(e.id)}">${esc(e.title)}</a>`).join('')}</nav></header>
<main>${examples.map(e=>`<article id="${esc(e.id)}"><div class="intro"><p class="phase">${esc(e.phase)}</p><h2>${esc(e.title)}</h2><p class="scenario">${esc(e.scenario)}</p></div><div class="details"><section><h3>Start here</h3><p>${esc(e.start)}</p></section><section><h3>Look for this result</h3><p>${esc(e.see)}</p></section><section class="stop"><h3>Stop when</h3><p>${esc(e.stop)}</p></section></div><div class="sample"><div class="sample-head">${esc(e.file)}</div><pre>${esc(e.lines.join('\n'))}</pre><footer>${esc(e.kind)}</footer></div></article>`).join('\n')}</main>
<script>if(new URLSearchParams(location.search).has('capture'))document.documentElement.classList.add('capture');</script>
</body></html>`;
const output = new URL('index.html', dir);
if (process.argv.includes('--check')) {
  if (readFileSync(output, 'utf8') !== html) throw new Error('Run node tools/build-w5-examples.mjs');
} else {
  writeFileSync(output, html);
  console.log(fileURLToPath(output));
}
