# Stellar Atlas

A personal cosmic catalog of video games, modeled after astronomical survey tools.
Tier list reframed as: games are stellar objects, scores are apparent magnitudes,
tiers are spectral classifications, DOTA is the home star.

---

## Two ways to use this

### 1. Just look at it
Double-click **`stellar_atlas.html`** in the project root. It opens in your browser.
No setup, no install, no server. Self-contained single file.

This is also the version to share — email it to a friend, drop it in a Discord,
post it somewhere. One file, runs anywhere with a modern browser and internet.

### 2. Edit it
Open the **`src/`** folder. It's the same code split into clean separate files
for editing. Then run the local server (see below) to view your changes.

```
src/
  index.html    ← the page shell. usually don't touch.
  styles.css    ← all the visual styling. tweak colors, sizes, animations here.
  data.js       ← the game list, tier definitions. *** EDIT THIS FILE ***
  app.jsx       ← the React app. only touch this for behavior changes.
```

---

## Running the editable version

You need Python 3 (it comes with every Mac and most Linux distros; on Windows
you can install it from python.org). Then:

```
python3 serve.py
```

This starts a tiny local server, opens your browser to `http://localhost:8000`,
and live-loads the files in `src/`. Hit `Ctrl+C` in the terminal to stop.

**Why a server?** Browsers block scripts loaded via `file://` from fetching
sibling files (`data.js`, `app.jsx`). It's a security default, not a bug.
The 30-line `serve.py` script sidesteps this without needing npm, Node, or
any other tooling.

---

## How to modify things

### Add a game
Open `src/data.js`. Find the `GAMES` array. Add a line like:

```js
{ name: 'Disco Elysium', tier: 'AI', score: 9.7, binary: false, x: 320, y: 350, size: 12 },
```

Fields:
- `name` — display name
- `tier` — one of `'S'`, `'A'`, `'AI'`, `'B'`, `'C'`, `'DOTA'`
- `score` — number 0–10, or `'inf'` for infinity (S-tier)
- `binary` — `true` if you'd replay it with someone watching (gets the cooperative-orbit badge)
- `x, y` — position on the atlas. ViewBox is **1400 wide × 900 tall**. Eyeball it.
  Each tier has a rough cluster zone (see comments at top of `data.js`).
- `size` — star size in pixels, roughly 6 to 28. Bigger = brighter glow.
- `note` (optional) — prose shown in the detail panel's "log" entry.
- `apple` (optional) — only used by It Takes Two to mark the @apple companion.

### Move a star
Just change its `x` and `y` in `data.js`. Save, refresh browser.

### Add a new tier
1. In `data.js`, add a new entry to the `TIERS` object with `label`,
   `classification`, `classRoman`, `color`, `glow`, `glowSoft`, `accent`,
   `desc`, `short`.
2. In `app.jsx`, find `TierFilters` and add a row for the new tier.
3. In `app.jsx`, find `TierMarkers` and add a marker if you want a label
   floating on the atlas.
4. In `app.jsx`, find `CatalogView` and add the tier key to the `groups` array.

### Change a tier's color
In `data.js`, edit `TIERS[key].color`, `glow`, `glowSoft`, and `accent`.
These affect everything: star color, glow, panel accents, catalog cards.

### Change a star's flavor text
Add a `note: '...'` field to the game's entry in the `GAMES` array.
Whatever you write replaces the default tier description in the detail panel.

### Rewrite the mission log entries
Open `src/app.jsx`, find the `LogView` component. The `.log-block` divs each
contain a `<p>` with prose. Edit those directly.

---

## Producing a new shareable single-file build

If you've made changes in `src/` and want to ship a fresh self-contained
`stellar_atlas.html`, the cleanest way is to manually reassemble:

1. Open a copy of `stellar_atlas.html`.
2. Replace its `<style>...</style>` block contents with the contents of `src/styles.css`.
3. Replace its `<script type="text/babel">...</script>` block contents with:
   - the contents of `src/data.js` (minus the comment header)
   - then a blank line
   - then the contents of `src/app.jsx` (minus the comment header,
     and skipping its `const { useState, ... } = React;` line which is
     already present once at the top of the assembled block).

Or just keep editing `stellar_atlas.html` directly — the data is at the top of
its `<script type="text/babel">` block in the same shape.

---

## Notes about the design

- **Why these fonts?** Major Mono Display feels like NASA control terminals.
  VT323 is a classic terminal font. Newsreader italic gives the mission-log
  prose a "field journal" feel. The combination is meant to read like a real
  astronomical survey UI, not a generic web app.
- **Why these tier names?** Real spectral classification has Class I (supergiants)
  through Class V (dwarfs). I borrowed the format but renamed for the bit:
  S → Singularity (Class I), A → Supergiant (II), A-indie → Pulsar (II.5),
  B → Main Sequence (III), C → Brown Dwarf (IV), DOTA → Home Star (Class Ø).
- **Why DOTA is its own class?** Per the CSV — its own column, its own scoring
  scale ("DOTA/10"). In the atlas it's the calibration reference, the thing
  every other magnitude is measured against. The note about "units of dota
  matches not played" was the joke that locked it in.
- **Binary systems** = "would replay if u wanna watch" entries. Cooperative orbit.
- **Dark matter** = "and so much more trash games i forget about". Inferred from
  gravitational effects on the rest of the catalog.

---

## Dependencies

The single file and the editable version both load these from CDN at runtime:

- React 18 (production build, ~10kb gzipped)
- ReactDOM 18 (~35kb gzipped)
- Babel standalone (~700kb — yes it's big, but it lets you write JSX without a build step)
- Google Fonts: Major Mono Display, VT323, Newsreader

So you need an internet connection on first load. Browsers cache aggressively, so
subsequent loads work offline.

If you ever want a true offline version, replace the `<script src="https://unpkg.com/...">`
tags with local copies of those files, and self-host the fonts.
