# Stellar Atlas — project context for Claude Code

A personal video game tier list reframed as an astronomical catalog. The catalog
is **made for one specific person** — the curator's girlfriend, who is a casual
gamer and doesn't know most of these games. The whole project is essentially an
invitation: *here are the stars I've visited, come with me to the ones I'd
revisit.*

This file is read at the start of every Claude Code session. Skim it first.

---

## The audience (this is the most important section)

This catalog is for ONE reader: the curator's girlfriend. She:

- Plays mostly casual / multiplayer / cozy games — **Valorant, League of Legends,
  Terraria, It Takes Two** (which she played with the curator)
- Has not played most of the games in this catalog
- Does not know what they are, what their premises are, or what makes them good
- Is being gently invited into the curator's gaming world via this artifact

**Every piece of writing must serve this audience.** Specifically:

- The **`premise`** field (see schema below) explains *what the game IS* in one
  or two sentences, for someone who has never heard of it. This is non-negotiable
  for games she won't recognize. Examples of good premise writing:
  - *Sekiro*: "sword combat in feudal japan. one shinobi versus the world.
    very hard, in a way that clicks once you get it."
  - *Persona 5*: "tokyo high school students who lead a double life as
    supernatural phantom thieves. half social-sim, half turn-based RPG.
    about 100 hours long."
  - *Hollow Knight*: "you're a tiny bug exploring a dead kingdom underground.
    side-scrolling, lonely, surprisingly emotional. similar in feel to terraria
    but linear and story-driven."

- The **`review`** field (the italicized "field review" prose) is the curator's
  subjective opinion, written so she can follow. **Anchor unfamiliar mechanics
  to games she knows when helpful.** Examples:
  - "the combat feels like a slower, more deliberate version of valorant —
    every fight is a single conversation."
  - "you'd love this. it's it takes two but for one person."

- **Avoid in-group references.** No "the souls formula", no "JRPG tropes",
  no "metroidvania". Either explain what those mean inline, or just describe
  the experience directly.

- **Tone overall**: still observatory, still dry, still lowercase. But the
  underlying message is warm and inviting. Less "archived for completeness";
  more "this is what I've seen and what I'd show you."

---

## The bit (preserve, do not weaken)

- **Tiers are not "tiers", they are stellar classifications.** S = Singularity
  (Class I), A = Supergiant (Class II), A-indie = Pulsar Field (Class II.5),
  B = Main Sequence (Class III), C = Brown Dwarf (Class IV), DOTA = Home Star
  (Class Ø).
- **Scores are magnitudes.** Infinity → "exceeds catalog limits". Other scores
  show as "X / 10.00".
- **DOTA is the reference frame.** All other magnitudes are calibrated against
  it. Magnitude is `∞/∞`. It is its own class.
- **"Would replay if u wanna watch"** → the binary tag. In the audience-aware
  framing, these are *the curator's invitations* — the stars he'd happily revisit
  with her watching. The badge text should convey this warmly while keeping the
  observatory voice. (Suggested phrasing: "**RE-VISIT INVITED · BEST OBSERVED
  WITH COMPANY**" or similar.)
- **"And so much more trash games I forget about"** → dark matter. Inferred only
  from gravitational effects on the rest of the catalog. Not displayed on the
  atlas.
- **It Takes Two's "apple" note** → companion body. Magnitude correction from
  9.05 → 10.00. (Note: It Takes Two is the one game she has played with the
  curator. Treat it with affection.)

The voice throughout is **observatory / mission control with a warm undertone**.
Lowercase by default in display copy. Terminal-flavored. Italicized prose in
the mission log and field reviews.

---

## Aesthetic DNA — explicit do-not-break list

1. **Fonts**: Major Mono Display (display), VT323 (terminal/HUD), Newsreader
   italic (prose). Never substitute Inter, Roboto, Space Grotesk, or any system
   font.
2. **Color palette**: cyan/teal nebula + warm gold for S-tier + coral pink for
   binary accents. The diagonal nebula band must remain — it mirrors the user's
   reference image. Do not flatten it.
3. **Layered atmosphere**: three drifting starfield layers + twinkling stars +
   scan sweep + nebula glow. Don't simplify these away.
4. **Diffraction spikes** on S-tier and DOTA only. Other tiers stay as smooth glow.
5. **Detail panel** slides in from the right, never modal, never centered.
6. **Three views**: atlas, catalog, mission log. Do not add a fourth without
   a clear conceptual fit.
7. **No emoji-heavy UI.** The aesthetic is restrained scientific instrument,
   not gamified. The one ◉◉ in the binary badge and ☉ for DOTA are exceptions.

---

## File layout

```
stellar-atlas/
├── README.md            user-facing docs
├── CLAUDE.md            THIS FILE — project context for you
├── GIT.md               git reference for the user (who is learning git)
├── .gitignore
├── stellar_atlas.html   single-file standalone build (shareable)
├── serve.py             tiny http server for the editable version
└── src/                 editable split files
    ├── index.html
    ├── styles.css
    ├── data.js          *** GAMES array + TIERS object — primary edit target ***
    └── app.jsx          React components
```

**Important**: `stellar_atlas.html` is a *built* artifact. Don't auto-rebuild
it from `src/` unless asked — the user reassembles it manually when they want
a fresh distribution.

---

## Data schema (`src/data.js`)

### `GAMES` array — each entry is one stellar object

**Required fields:**
- `name` (string)
- `tier` (string) — one of `'S'`, `'A'`, `'AI'`, `'B'`, `'C'`, `'DOTA'`
- `score` (number | `'inf'` | `'∞/∞'`) — apparent magnitude
- `binary` (boolean) — whether the curator would happily re-visit this star with
  her watching / joining. (The CSV's "would replay if u wanna watch" tag.)
  See "The audience" for what this means narratively.
- `x` (number 0–1400), `y` (number 0–900) — atlas position
- `size` (number 6–28) — visual star size in pixels

**Optional context fields (audience-facing, prioritized):**
- `premise` (string) — **the single most important field for this audience.**
  One or two sentences explaining what the game IS, for someone who has never
  heard of it. Lowercase to match the voice. See "The audience" for examples.
- `review` (string) — subjective field-review prose in the observatory voice.
  Written for her. Italicized in the panel. Anchor to her games when helpful.
- `year` (number) — release year
- `studio` (string) — developer
- `genre` (string) — short genre tag
- `hours` (number) — approximate playtime
- `metacritic` (number) — Metacritic score, 0-100. External validation that
  she might find reassuring.
- `vibes` (string[]) — short mood tags shown as pills (e.g.
  `['cinematic', 'melancholy', 'co-op']`)
- `similarTo` (string[]) — optional. Games she might know that share DNA.
  Use sparingly — only when an honest comparison helps.

**Special-case fields:**
- `apple` (boolean) — only used by It Takes Two for the @apple companion badge.

**Do not invent facts.** If you don't know a release year, studio, genre, or
score, leave the field undefined rather than guess. Web-search if the tool is
available, or ask the user.

### `TIERS` object — spectral classifications

Each tier has `label`, `classification`, `classRoman`, `color`, `glow`,
`glowSoft`, `accent`, `desc`, `short`. Adjust color tokens here to recolor a
whole tier; changes propagate to stars, catalog cards, and panel automatically.

---

## Detail panel layout (current target state)

Top to bottom inside the panel:

1. Meta line: `CLASS-X · SC-### · OBJ-TIER` (already there)
2. Game name (large, Major Mono Display)
3. Classification line: `SUPERGIANT · B-type · blue supergiant` (already there)
4. **Magnitude block** — large central readout
5. **`premise` block** (new) — prominent text block right below magnitude, in
   the same italic Newsreader-style as `review`. This is what tells her *what
   the game is*.
6. **Stats rows** — small `panel-row` style entries. Show **only** these and
   only when the field is present:
   - YEAR
   - STUDIO
   - GENRE
   - HOURS
   - METACRITIC
   - SIMILAR TO (if `similarTo` array is non-empty)

   *Each row hides itself entirely when its field is missing — no "unknown"
   placeholders.*
7. **Binary badge** — re-themed for joint observation invitation (see "The bit")
8. **`review` prose** — italic Newsreader, the curator's subjective writeup
9. **`vibes` pills** — small bordered chips

**Rows that should be removed from the existing panel:**
- DESIGNATION (the SC-### is already in the header meta — redundant)
- SPECTRAL (the classification line at the top already says it)
- STATUS · binary system (the binary badge below conveys this)
- FIRST OBSERVED (was a placeholder; carries no information)

---

## Atlas positioning (the viewBox)

The atlas is laid out on a virtual viewBox of **1400 × 900**. Cluster zones:

| Tier        | x range     | y range      |
|-------------|-------------|--------------|
| S           | 820–1180    | 240–390      |
| A           | 380–1300    | 380–670      |
| A-indie     | 70–310      | 320–610      |
| B           | 100–1330    | 670–720      |
| C           | 50, 1360    | 745          |
| DOTA        | 1240        | 660          |

The diagonal nebula band runs upper-right to lower-left. Bright tiers (S, A,
DOTA) sit in/near the band. Indies cluster off to the left. B sits below the
band. C sits in the extreme outer dark.

---

## Conventions

- **Display copy**: lowercase, terminal-styled, observatory-coded.
- **Prose (mission log + field reviews)**: italicized Newsreader. Calm, dry,
  occasionally wry. Now also **warm and inviting** under the dryness, because
  of the audience. Never giddy, never marketing-coded.
- **CSS variables** live at `:root` in `styles.css`. Reuse them; no hardcoded
  hex in app.jsx.
- **Animations** use keyframes, not JS. Existing vocabulary: `twinkle`,
  `nebulaShift`, `scanSweep`, `ringPulse`, etc.

---

## How to test changes

```sh
python3 serve.py
# opens http://localhost:8000
```

No build step. No transpilation step. Babel standalone handles JSX at runtime.
No npm. Do not introduce any of these.

---

## Common tasks

### Add a game
Append to `GAMES` in `data.js` with required fields. Eyeball `x`/`y` from the
cluster table above. Pick `size` proportional to score.

### Move a star
Change `x`/`y` in `data.js`. Nothing else.

### Recolor a tier
Edit `TIERS[key].color`, `glow`, `glowSoft`, `accent`. Propagates everywhere.

### Add a field to the schema
1. Add it as **optional** in `data.js` (and document it in the comment header).
2. In `app.jsx` `DetailPanel`, render it conditionally — only show its row if
   present. **Never use "unknown" placeholders.**
3. If the field is audience-facing (like `premise`), match the existing prose
   styling (italic Newsreader for prose, mono for scalar values).

### Rewrite a mission log entry
In `app.jsx` `LogView`. Each `.log-block` is independent prose. Preserve the
observatory voice. Now also keep the audience in mind — these are read by her.

---

## Things to never do

- Switch to Tailwind, CSS-in-JS, or any other styling system.
- Introduce a build step, package.json, or npm dependencies.
- "Modernize" the typography. The fonts are deliberate.
- Flatten the layered atmosphere.
- Remove the diagonal nebula.
- Add gamification (XP, achievements, levels).
- Collapse the three views into one.
- Make the voice perky or marketing-coded.
- **Invent facts about games** (release years, studios, scores) you don't actually
  know. Either search, ask, or leave the field undefined.
- **Write game premises that assume the reader is a gamer.** She isn't.
- Auto-rebuild `stellar_atlas.html` unless explicitly asked.

---

## Working with the user

The user is the curator and the audience is his girlfriend. He will:
- Know the games he's played and his honest opinions about them
- Tell you which games she's already familiar with
- Want you to anchor unfamiliar games to ones she knows when it's an honest
  comparison
- Want you to **not invent** anything he hasn't told you

The user is learning git. When you run git commands, narrate briefly. Don't
lecture; don't be silent.

When writing premises and reviews, **draft in his voice but treat your text as
a placeholder** — he will edit it. Make it easy to edit by keeping sentences
short and rhythmically clean.
