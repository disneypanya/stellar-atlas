# Stellar Atlas — project context for Claude Code

A personal video game tier list reframed as an astronomical catalog. Games are
stellar objects, scores are apparent magnitudes, tiers are spectral classifications,
DOTA is the home star. The bit is the whole point — preserve it.

This file is read at the start of every Claude Code session. Skim it first.

---

## The bit (preserve, do not weaken)

- **Tiers are not "tiers", they are stellar classifications.** S = Singularity (Class I),
  A = Supergiant (Class II), A-indie = Pulsar Field (Class II.5), B = Main Sequence
  (Class III), C = Brown Dwarf (Class IV), DOTA = Home Star (Class Ø).
- **Scores are magnitudes.** Infinity → "exceeds catalog limits". Other scores show
  as "X / 10.00".
- **DOTA is the reference frame.** All other magnitudes are calibrated against it.
  Magnitude is `∞/∞`. It is its own class.
- **"Would replay if u wanna watch"** → cooperative orbit / binary system. Toggled
  per game by `binary: true`.
- **"And so much more trash games I forget about"** → dark matter. Inferred only
  from gravitational effects on the rest of the catalog. Not displayed on the atlas.
- **It Takes Two's "apple" note** → companion body. Magnitude correction from
  9.05 → 10.00. Documented in the mission log.

The voice throughout is **observatory / mission control**. Lowercase by default in
display copy. Terminal-flavored. Italicized prose in the mission log.

---

## Aesthetic DNA — explicit do-not-break list

1. **Fonts**: Major Mono Display (display), VT323 (terminal/HUD), Newsreader italic
   (prose). Never substitute Inter, Roboto, Space Grotesk, or any system font.
2. **Color palette**: cyan/teal nebula + warm gold for S-tier + coral pink for binary
   accents. The diagonal nebula band must remain — it mirrors the user's reference
   image. Do not flatten it.
3. **Layered atmosphere**: three drifting starfield layers + twinkling stars + scan
   sweep + nebula glow. Don't simplify away these layers in the name of "cleanliness".
4. **Diffraction spikes** on S-tier and DOTA only. Other tiers stay as smooth glow.
5. **Detail panel** slides in from the right, never modal, never centered.
6. **Three views**: atlas (star map), catalog (grouped cards), mission log (prose).
   Do not add a fourth without a clear conceptual fit.
7. **No emoji-heavy UI**. The aesthetic is restrained scientific instrument, not
   gamified. The one ◉◉ in the binary badge and the ☉ for DOTA are exceptions.

---

## File layout

```
stellar-atlas/
├── README.md            user-facing docs
├── CLAUDE.md            THIS FILE — project context for you
├── stellar_atlas.html   single-file standalone build (shareable)
├── serve.py             tiny http server for the editable version
└── src/                 editable split files
    ├── index.html       page shell; rarely needs editing
    ├── styles.css       all CSS; ~900 lines
    ├── data.js          *** GAMES array + TIERS object — primary edit target ***
    └── app.jsx          React components for atlas/catalog/log views
```

**Important**: `stellar_atlas.html` is the *built* version. If you make changes in
`src/`, the user is editing the development build. To produce a fresh standalone,
the user follows the manual reassembly steps in `README.md`. Don't try to
auto-rebuild it unless asked — it's their distribution artifact, hand-curated.

---

## Data schema (`src/data.js`)

### `GAMES` array — each entry is one stellar object
Required fields:
- `name` (string) — display name
- `tier` (string) — one of `'S'`, `'A'`, `'AI'`, `'B'`, `'C'`, `'DOTA'`
- `score` (number | `'inf'` | `'∞/∞'`) — apparent magnitude
- `binary` (boolean) — cooperative orbit / "replay if u wanna watch"
- `x` (number 0–1400) — atlas position horizontal
- `y` (number 0–900) — atlas position vertical
- `size` (number 6–28) — visual star size in pixels

Optional fields:
- `note` (string) — short prose for the detail panel "log" entry
- `apple` (boolean) — only used by It Takes Two for the @apple companion badge

The schema is **extensible**. When asked to add new fields (e.g. `year`, `studio`,
`genre`, `hours`, `played`, `review`, `vibes`), add them as **optional** so the
existing entries don't break. Update the detail panel in `app.jsx` to render new
fields **conditionally** — if a field is missing, hide its row entirely. Don't
emit placeholder text like "unknown".

### `TIERS` object — spectral classifications
Each tier has:
- `label` (short glyph used in catalog headers and filter pills)
- `classification` (e.g. "SUPERGIANT")
- `classRoman` (e.g. "CLASS II")
- `color` / `glow` / `glowSoft` / `accent` (color tokens; affects stars + panel + cards)
- `desc` (longer prose for catalog header)
- `short` (one-line, used as fallback `note` in detail panel)

---

## Atlas positioning (the viewBox)

The atlas is laid out on a virtual viewBox of **1400 × 900**. Position clusters:

| Tier        | x range     | y range      |
|-------------|-------------|--------------|
| S           | 820–1180    | 240–390      |
| A           | 380–1300    | 380–670      |
| A-indie     | 70–310      | 320–610      |
| B           | 100–1330    | 670–720      |
| C           | 50, 1360    | 745          |
| DOTA        | 1240        | 660          |

The diagonal nebula band runs from upper-right to lower-left. Bright tiers (S, A,
DOTA) sit in/near the band. Indies cluster off to the left in their own nebulosity.
B sits below the band. C sits in the extreme outer dark.

When adding stars, respect the cluster zones. Don't put a C-tier in the middle of
the bright band — it breaks the visual logic.

---

## Conventions

- **Tone in display copy**: lowercase, terminal-styled, observatory-coded. Examples:
  "stellar atlas", "personal cosmic catalog", "telescope online", "stardate".
- **Tone in prose (mission log)**: italicized Newsreader, like a 19th-century
  naturalist's field notebook crossed with mission control. Calm, dry, occasionally
  wry. Never giddy. Never marketing-coded.
- **Tone in chat (when responding to the user)**: matter-of-fact, specific, low on
  caveats. Match the energy of someone who built something they're proud of.
- **CSS variables** live at `:root` in `styles.css`. Reuse them; do not introduce
  hardcoded hex colors in app.jsx.
- **Animations** use keyframes, not JS. The existing `twinkle`, `nebulaShift`,
  `scanSweep`, `ringPulse`, etc. are the vocabulary.

---

## How to test changes

```sh
python3 serve.py
# opens http://localhost:8000 in default browser
# edit files in src/, refresh browser
```

There is no build step. There is no transpilation step (Babel standalone handles
JSX at runtime). There is no npm. Don't try to introduce any of those.

---

## Common tasks

### Add a game
Append to the `GAMES` array in `src/data.js` with all required fields. Eyeball
`x`/`y` based on the cluster zones above. Pick `size` proportional to the score
(roughly: 10 → size 13, 9 → size 12, 8 → size 10, 7 → size 9, 6 → size 8).

### Move a star
Change `x` / `y` in `data.js`. No other file needs editing.

### Recolor a tier
Edit `TIERS[key].color`, `glow`, `glowSoft`, `accent` in `data.js`. The change
propagates to stars, catalog cards, and the detail panel automatically.

### Add a field to all games
1. Add it as optional in `data.js` (in the comment header schema, and to the games
   that have data for it).
2. In `app.jsx`, `DetailPanel`, render the field conditionally — only show its row
   if the field is present.

### Rewrite a mission log entry
In `app.jsx`, find `LogView`. Each `.log-block` is independent prose. Preserve the
observatory voice when editing.

---

## Things to never do

- Do not switch to Tailwind, CSS-in-JS, or any styling system other than the current
  CSS variables.
- Do not introduce a build step, package.json, or npm dependencies.
- Do not "modernize" the typography. The fonts are deliberate.
- Do not flatten the layered atmosphere into a single solid background.
- Do not remove the diagonal nebula. It's the visual anchor matching the user's
  reference image.
- Do not add gamification (XP bars, achievements, levels). This is a catalog,
  not a game.
- Do not collapse the three views into one. Atlas/Catalog/Mission Log each have
  a distinct purpose.
- Do not make the voice perky or marketing-flavored. It is dry, observatory-coded.
- Do not auto-overwrite `stellar_atlas.html` from `src/` unless the user explicitly
  asks for a fresh build.

---

## Working with the user

The user is the curator of this catalog. They will know things you don't (which
games they've played, their honest opinions, when they played each one). When
extending the data, **ask them rather than guess** — never invent a release year
or a review you can't verify. Either look it up via web search (if the tooling
allows) or leave the field empty and prompt them to fill it in.

The user is learning git. When you run git commands, narrate briefly what you're
doing and why. Don't lecture, but don't be silent.
