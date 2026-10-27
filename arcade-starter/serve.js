/* The arcade server: run `node serve.js` on the arcade laptop and open http://localhost:8080
   No install needed. It serves this folder and lists the games at /games.json. */
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname, PORT = Number(process.env.PORT) || 8080;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.wav': 'audio/wav' };
function games() {
  const dir = path.join(ROOT, 'games');
  return fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => {
    try { const g = JSON.parse(fs.readFileSync(path.join(dir, d.name, 'game.json'), 'utf8')); return { folder: d.name, ...g, url: '/games/' + d.name + '/' + (g.entry || 'index.html'), avatarUrl: '/games/' + d.name + '/' + g.avatar }; }
    catch { return null; }
  }).filter(Boolean);
}
/* The shared records: one scores/<nickname>.json per player, with the game's title and avatar added */
function scores() {
  const dir = path.join(ROOT, 'scores');
  if (!fs.existsSync(dir)) return [];
  const byNick = Object.fromEntries(games().map(g => [g.nickname, g]));
  return fs.readdirSync(dir).filter(n => n.endsWith('.json')).map(n => {
    try { const s = JSON.parse(fs.readFileSync(path.join(dir, n), 'utf8')); const g = byNick[s.nickname] || {}; return { ...s, title: g.title, avatarUrl: g.avatarUrl }; }
    catch { return null; }
  }).filter(Boolean);
}
const json = (res, data) => { res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/games.json') return json(res, games());
  if (url === '/scores.json') return json(res, scores());
  let file = path.normalize(path.join(ROOT, url === '/' ? 'index.html' : url));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => console.log('Arcade running: http://localhost:' + PORT));
