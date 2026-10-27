// Every shared record in scores/ must be possible. Run with: node --test
const test = require('node:test'); const assert = require('node:assert');
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..'), SCORES = path.join(ROOT, 'scores');
const MAX_POINTS = 500;
const files = fs.existsSync(SCORES) ? fs.readdirSync(SCORES).filter(n => n.endsWith('.json')) : [];

for (const name of files) {
  test('scores/' + name + ': is a possible record', () => {
    const s = JSON.parse(fs.readFileSync(path.join(SCORES, name), 'utf8'));
    assert.ok(Number.isInteger(s.points) && s.points >= 0 && s.points <= MAX_POINTS, 'points: a whole number from 0 to ' + MAX_POINTS + ', got ' + s.points);
    assert.equal(name, s.nickname + '.json', 'the file must be named scores/<nickname>.json');
    assert.ok(fs.existsSync(path.join(ROOT, 'games', String(s.nickname), 'game.json')), 'no game folder for nickname ' + s.nickname);
  });
}
