# CLAUDE.md

## Project Overview
**Route 1 Family** is a cozy, single-player road-trip game (genre: narrative packing-puzzle). The player packs a suitcase using Tetris-style shapes on a limited grid, drives Manila → Batangas, and faces 8 events that each resolve into one of three outcomes (ideal / improvised / rough) based on what they packed. Rough outcomes are never failures — they produce the warmest memories. The whole game serves one spine: *you can't control everything — that's where the memories come from.* Full design lives in `GAME_SPEC.md`; read it before doing anything. The engine is the **browser** — plain HTML/CSS/JS, no framework, no build step. The player is a non-engineer, so favor readable code and an easy-to-run game.

## Tech Stack
- **Language:** vanilla JavaScript (ES modules), HTML, CSS. No TypeScript in v1.
- **Rendering:** DOM + CSS Grid for the suitcase and screens (preferred over Canvas — easier to read and debug).
- **Libraries/plugins:** none. No npm dependencies in v1. If one seems truly necessary, ask first.
- **Build system:** none. The game must run by opening `index.html` or via a one-line static server (e.g. `python3 -m http.server`).
- **Target:** desktop browser now; will be wrapped in Electron for Steam later — do NOT add Electron yet.

## Architecture
- **Screen/state machine:** the game is a small set of screens — `title → pack → drive → journal`. A single state controller switches between them. One screen visible at a time.
- **Data/logic separation:** events and items are **plain data** (`data/items.js`, `data/events.js`), fully separate from game logic. New content must be addable without touching logic.
- **Pure resolver:** `resolve(event, packedItemIds) -> "ideal" | "improvised" | "rough"` is a pure function with no side effects. It is the heart of the outcome system and must stay testable in isolation.
- **Suggested file layout:**
  - `index.html` — entry point, mounts the app
  - `src/state.js` — screen/state controller + run-unlock state
  - `src/pack.js` — grid logic: placement, rotation, overlap/bounds validation
  - `src/drive.js` — sequences through events
  - `src/resolve.js` — the pure resolver
  - `src/journal.js` — assembles the text recap
  - `data/items.js`, `data/events.js` — content as plain data
  - `styles.css`
- Keep modules small and single-purpose.

## Conventions
- **Naming:** `camelCase` for variables/functions, `UPPER_SNAKE` for constants, kebab-case for filenames. Item/event ids are lowercase snake (`malong`, `rain_jacket`, `E2`).
- **Item shapes:** stored as `w` (width) × `h` (height) in grid cells; rotation swaps them.
- **Content is data, never hardcoded into logic.** An event references items by id only.
- **Comments:** explain anything non-obvious — assume the reader is not a programmer.
- **Functions stay small.** Prefer several named functions over one long one.
- No clever one-liners where a clear three lines would read better.

## Game Design Context
Only the parts that affect how code is structured:
- **Grid:** 5 columns × 4 rows = 20 cells. Items are rectangles, **movable and rotatable** within the grid. **Overflow is guaranteed** — the full item set exceeds 20 cells, so the player must leave items behind. A trip can start only when all packed items are in-bounds and non-overlapping.
- **Persistence:** packed items are available the whole trip — no use-up mechanic. The resolver only checks presence/absence in the bag.
- **Three-tier resolution:** priority is Ideal > Improvised > Rough. Return the first tier whose trigger item is present in the bag.
- **Non-negotiable items (Run 2):** auto-added, **cannot be removed from the bag**, but **can be moved and rotated** in the grid. They trigger no events — pure space cost. Model this as a flag on the item (e.g. `locked: true`), not a separate system.
- **No failure state:** there is no score, no game over, no lose condition. Rough is a valid, warm outcome.
- **v1 scope:** Run 1 (solo) + Run 2 (+partner +1 non-negotiable), Batangas only, 8 events, 16 items. Everything else is out of scope.

## Common Tasks
**Add a new item**
1. Add an entry to `data/items.js`: `{ id, name, w, h, kind }`.
2. Reference its `id` in any event's `ideal` or `improvised` array in `data/events.js`.
3. No logic changes should be required.

**Add or edit an event**
1. Edit `data/events.js`: `{ id, title, ideal: [...ids], improvised: [...ids], text: { ideal, improvised, rough } }`.
2. Ensure every reachable tier has at least one trigger item present somewhere in the item set (see Spec §8 coverage map).
3. Rough text must end warm.

**Tune the difficulty**
- Adjust grid size in one constant, or adjust item shapes in `data/items.js`. Do not scatter grid dimensions through the code.

**Finish a build phase** — always report:
- What you built
- The exact command/steps to run and test it
- What to look for to confirm it works
- What the next phase is (but do NOT start it)

## What NOT to Do
- **Do not build beyond `GAME_SPEC.md`.** No kids/grandma runs, extra destinations, admin/intangible items, illustrations, sound, or the wildcard mechanic in v1. If something seems missing, ask before adding.
- **Do not skip the phased build order** (Spec §11). One phase per prompt; stop and wait for approval after each.
- **Do not add a failure/score/game-over state.** It contradicts the spine.
- **Do not hardcode event or item content into logic** — it must stay as plain data.
- **Do not add frameworks, a build step, npm packages, or Electron** in v1 without asking.
- **Do not use browser storage APIs** (localStorage/sessionStorage) until I confirm the run environment supports them; ask before choosing how to persist run-unlock state.
- **Do not make non-negotiable items position-locked** — they must remain movable/rotatable, just non-removable.
- **Do not do large refactors** without explaining why and getting an okay.
- When unsure, **ask one focused question** instead of guessing.
