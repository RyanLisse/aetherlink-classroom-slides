// Checks every game in games/ against arcade-spec.md. Run with: node --test
// One game only: GAME=<nickname> node --test tests/game-contract.test.js
const test = require('node:test'); const assert = require('node:assert');
const fs = require('fs'); const path = require('path');
const GAMES = path.join(__dirname, '..', 'games');
const folders = fs.readdirSync(GAMES, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
  .filter(name => !process.env.GAME || name === process.env.GAME);
if (process.env.GAME && !folders.length) test('game folder exists', () => assert.fail('no folder games/' + process.env.GAME));

for (const folder of folders) {
  const dir = path.join(GAMES, folder);
  const file = name => path.join(dir, name);
  test(folder + ': folder name is a valid nickname', () => {
    assert.match(folder, /^[A-Za-z0-9_-]{1,20}$/, 'nickname: 1 to 20 letters, digits, - or _');
  });
  test(folder + ': has index.html', () => assert.ok(fs.existsSync(file('index.html')), 'missing games/' + folder + '/index.html'));
  test(folder + ': game.json has title, nickname and avatar', () => {
    assert.ok(fs.existsSync(file('game.json')), 'missing games/' + folder + '/game.json');
    const g = JSON.parse(fs.readFileSync(file('game.json'), 'utf8'));
    assert.ok(typeof g.title === 'string' && g.title.trim(), 'title: the name of the game');
    assert.equal(g.nickname, folder, 'nickname must be the folder name');
    assert.ok(typeof g.avatar === 'string' && g.avatar.trim(), 'avatar: the picture file in the folder');
    assert.ok(fs.existsSync(file(g.avatar)), 'avatar file not found: games/' + folder + '/' + g.avatar);
  });
  test(folder + ': loads arcade.js and reports its score', () => {
    const html = fs.readFileSync(file('index.html'), 'utf8');
    assert.match(html, /<script[^>]+src=["'](\.\.\/\.\.\/|\/)arcade\.js["']/, 'index.html must load ../../arcade.js');
    const code = fs.readdirSync(dir).filter(n => /\.(html|js)$/.test(n)).map(n => fs.readFileSync(file(n), 'utf8')).join('\n');
    assert.match(code, /Arcade\.submitScore\s*\(/, 'the game never calls Arcade.submitScore(...)');
  });
}
