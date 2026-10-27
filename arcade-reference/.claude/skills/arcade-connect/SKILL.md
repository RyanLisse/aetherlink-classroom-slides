---
name: arcade-connect
description: Make a game meet the arcade spec (arcade-spec.md) and run the contract test. Use when a game must join the arcade, move into games/<nickname>/, get a game.json, report its score at game over, or when the game contract test fails.
---

# arcade-connect: make a game meet the arcade spec

The rules are in `arcade-spec.md` at the root of the repo. Read it first; it wins over anything here.
**Never change `arcade.js`, `serve.js` or `tests/`**: the whole team depends on them. If the game can't meet the spec, fix the game.

## Steps
1. **Find the nickname.** Ask the human for their nickname if you don't know it (1 to 20 letters, digits, `-` or `_`). Don't invent one.
2. **Folder.** The game must be in `games/<nickname>/` with the game page as `index.html`. If it's somewhere else, move it there (`git mv` if tracked) and rename its main page to `index.html`.
3. **Avatar.** Put the player's picture in that folder. No picture? Ask the human; don't download one.
4. **game.json** in that folder, exactly these fields:
   ```json
   { "title": "<name of the game>", "nickname": "<nickname>", "avatar": "<picture file>" }
   ```
5. **Load the contract** in `index.html`, before the game's own script: `<script src="../../arcade.js"></script>`
6. **Report the score once at game over.** Find the place where the round ends and call:
   ```js
   Arcade.submitScore({ player: '<nickname>', avatar: '/games/<nickname>/<picture file>', points, game: '<title>' })
   ```
   - `points` must be a whole number, 0 or more: use `Math.floor` if the game's score can have decimals.
   - Make sure it can't fire twice for one game over (a flag reset at the start of each round), and doesn't fire before the game ends.
7. **Back link:** `<a href="/">Back to the arcade</a>`.

## Run the contract test
```sh
GAME=<nickname> node --test tests/game-contract.test.js
npm test
```
The first checks only this game; `npm test` checks the contract and every game. Fix the game until both pass. Show the human the real test output, failures included.

## Then check in the browser
- `node serve.js`, open http://localhost:8080/games.json: the game is in the list.
- Play one round to game over: the score shows on `scoreboard.html` with the right picture and nickname, and only once.

Show the human the changed files and wait for approval before committing.

## Boundaries
- Only change files inside `games/<nickname>/`.
- Don't touch other players' folders.
- No AI connection, internet API or external server inside a game.
