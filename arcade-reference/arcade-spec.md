# Arcade spec

What every game in the arcade must do. `tests/game-contract.test.js` checks it; `npm test` runs it.

## 1. One folder per player

Every game lives in its own folder, named after the player's nickname:

```
games/<nickname>/
  index.html     the game; the arcade opens this file
  game.json      who made it and what it is called
  avatar.png     the player's picture (any image: .png, .jpg, .webp, .svg)
```

- The folder name is exactly the nickname, for example `games/Cons/`.
- A nickname is 1 to 20 characters: letters, digits, `-` or `_`.
- Other files (scripts, images, sounds) may sit next to `index.html` in the same folder.

## 2. game.json

```json
{ "title": "Snake", "nickname": "Cons", "avatar": "avatar.png" }
```

| Field | What | Rule |
|---|---|---|
| `title` | the name of the game | text, not empty |
| `nickname` | the player's nickname | the same as the folder name |
| `avatar` | the player's picture | a file in the game's folder, path relative to that folder |

## 3. The score

The game loads the contract before its own script:

```html
<script src="../../arcade.js"></script>
```

At game over, and only then, it reports the score **once**:

```js
Arcade.submitScore({ player, avatar, points, game })
```

| Field | Value | Example |
|---|---|---|
| `player` | `nickname` from game.json | `"Cons"` |
| `avatar` | the avatar's path from the arcade root: `/games/<nickname>/<avatar>` | `"/games/Cons/avatar.png"` |
| `points` | whole number, 0 or more | `42` |
| `game` | `title` from game.json | `"Snake"` |

A score that breaks these rules is rejected by `arcade.js` with an error. Fix the game, never `arcade.js`.

"Once" means once per round: a new round may report a new score, but one game over never reports twice.

## 4. Shared records

A player's best score for the whole team goes in `scores/<nickname>.json`, committed to the repo:

```json
{ "nickname": "Cons", "points": 42 }
```

- `points` is a whole number from 0 to 500. `tests/anti-cheat.test.js` rejects anything else.
- `nickname` must have a game folder in `games/`, and the file is named after it.
- `serve.js` lists all of them at `/scores.json`; `scoreboard.html` shows them as the shared records.

## 5. Also

- A link back to the arcade: `<a href="/">Back to the arcade</a>`.
- No AI connection, internet API or external server inside a game.
- A game only changes files in its own folder.
