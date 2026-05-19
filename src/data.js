/* ============================================================
 *  STELLAR ATLAS — GAME DATA
 *  ============================================================
 *  This is the file to edit when you want to add/remove/move games,
 *  tweak tier colors, or change classifications.
 *
 *  GAMES array  — each game is one stellar object. Fields:
 *    name    : display name (string)
 *    tier    : 'S' | 'A' | 'AI' | 'B' | 'C' | 'DOTA'
 *    score   : 'inf' for infinity, or a number 0-10
 *    binary  : true if "would replay if u wanna watch" (cooperative orbit)
 *    x, y    : position on the atlas. viewBox is 1400 wide x 900 tall.
 *              eyeball it: low x = left, low y = top. Tier clusters live in:
 *                S    : upper-right, y~240-390, x~820-1180
 *                A    : middle band, mostly y~380-670
 *                AI   : left cluster, x~70-310, y~320-610
 *                B    : lower band, y~670-720
 *                C    : extreme outer, y~745
 *                DOTA : x=1240, y=660 (the home star anchor)
 *    size    : star size in px (6-28). Bigger = brighter glow.
 *    note    : (optional) prose shown in the detail panel "log" entry
 *    apple   : (optional) marks the @apple companion (It Takes Two)
 *
 *  TIERS object — defines the cosmic classifications, colors, and prose.
 *  Adjust .color, .glow, .glowSoft, .accent to recolor a whole tier.
 *  ============================================================ */

// ====================================================================
// TIER DEFINITIONS — cosmic classifications
// ====================================================================
const TIERS = {
  S: {
    label: 'S',
    classification: 'SINGULARITY',
    classRoman: 'CLASS I',
    color: '#fff5d0',
    glow: '#ffd576',
    glowSoft: 'rgba(255, 213, 118, 0.25)',
    accent: '#ffd576',
    desc: 'magnitude beyond instruments. perceived as ∞.',
    short: 'magnitude exceeds catalog limits.',
  },
  A: {
    label: 'A',
    classification: 'SUPERGIANT',
    classRoman: 'CLASS II',
    color: '#b8eaff',
    glow: '#4fc3d9',
    glowSoft: 'rgba(79, 195, 217, 0.25)',
    accent: '#7defff',
    desc: 'main sequence luminaries. stable, observed, confirmed.',
    short: 'high luminosity. confirmed observations.',
  },
  AI: {
    label: 'A·i',
    classification: 'PULSAR',
    classRoman: 'CLASS II.5',
    color: '#e8b8ff',
    glow: '#c878ff',
    glowSoft: 'rgba(200, 120, 255, 0.25)',
    accent: '#d8a8ff',
    desc: 'compact, intense, hand-built. emit on a narrow beam.',
    short: 'small-craft origin. high energy density.',
  },
  B: {
    label: 'B',
    classification: 'MAIN SEQUENCE',
    classRoman: 'CLASS III',
    color: '#ffc4a3',
    glow: '#ff9466',
    glowSoft: 'rgba(255, 148, 102, 0.25)',
    accent: '#ffb088',
    desc: 'steady glow. catalogued, occasionally revisited.',
    short: 'stable but unremarkable.',
  },
  C: {
    label: 'C',
    classification: 'BROWN DWARF',
    classRoman: 'CLASS IV',
    color: '#ff9788',
    glow: '#cc5544',
    glowSoft: 'rgba(204, 85, 68, 0.20)',
    accent: '#ff8a78',
    desc: 'failed ignition. archived for completeness.',
    short: 'sub-stellar. dim signal.',
  },
  DOTA: {
    label: '☉',
    classification: 'HOME STAR',
    classRoman: 'CLASS Ø',
    color: '#6cf0ff',
    glow: '#6cf0ff',
    glowSoft: 'rgba(108, 240, 255, 0.35)',
    accent: '#6cf0ff',
    desc: 'reference frame. all magnitudes calibrated against this.',
    short: 'calibration object. unmoved.',
  },
};

// ====================================================================
// GAME CATALOG — your tier list, transposed into cosmic form
// ====================================================================
// flags:
//   binary = "would replay if u wanna watch" → cooperative orbit
//   apple  = It Takes Two special case
//
// Positions are in viewBox units (0-1400 x, 0-900 y).
// Hand-arranged into tier-clusters along the diagonal nebula band.

const GAMES = [
  // ============ S TIER — singularities ============
  // Brightest objects, scattered along the bright spine of the nebula (upper-right region)
  { name: 'Elden Ring',            tier: 'S', score: 'inf', binary: true,  x: 920,  y: 240, size: 22 },
  { name: "Baldur's Gate 3",       tier: 'S', score: 'inf', binary: true,  x: 1080, y: 290, size: 24 },
  { name: 'Expedition 33',         tier: 'S', score: 'inf', binary: false, x: 820,  y: 340, size: 20, note: 'replayable' },
  { name: 'Red Dead Redemption 2', tier: 'S', score: 'inf', binary: true,  x: 1180, y: 390, size: 22 },

  // ============ HOME STAR — DOTA ============
  { name: 'DOTA 2',                tier: 'DOTA', score: '∞/∞', binary: false, x: 1240, y: 660, size: 28,
    note: 'home star. all other magnitudes calibrated against this.' },

  // ============ A TIER — supergiants ============
  // Scattered along and around the nebula band
  { name: 'Sekiro',                tier: 'A', score: 10,   binary: true,  x: 670,  y: 410, size: 13 },
  { name: 'Uncharted 2',           tier: 'A', score: 10,   binary: true,  x: 760,  y: 460, size: 13 },
  { name: 'The Last of Us 2',      tier: 'A', score: 10,   binary: true,  x: 580,  y: 440, size: 13 },
  { name: 'God of War',            tier: 'A', score: 10,   binary: true,  x: 690,  y: 510, size: 13 },
  { name: 'Uncharted 4',           tier: 'A', score: 10,   binary: true,  x: 870,  y: 470, size: 13 },
  { name: 'Cyberpunk 2077',        tier: 'A', score: 9.9,  binary: true,  x: 950,  y: 530, size: 12 },
  { name: 'Persona 4',             tier: 'A', score: 9.83, binary: true,  x: 510,  y: 380, size: 12 },
  { name: 'Persona 5',             tier: 'A', score: 9.5,  binary: false, x: 1020, y: 460, size: 12 },
  { name: 'FF7 Rebirth',           tier: 'A', score: 9.4,  binary: false, x: 1090, y: 540, size: 12 },
  { name: 'Ghost of Yotei',        tier: 'A', score: 9.28, binary: false, x: 800,  y: 380, size: 11 },
  { name: 'Death Stranding',       tier: 'A', score: 9.1,  binary: false, x: 600,  y: 540, size: 11 },
  { name: 'It Takes Two',          tier: 'A', score: 9.05, binary: true,  apple: true, x: 460, y: 480, size: 12,
    note: 'cooperative orbit with Apple. effective magnitude → 10.' },
  { name: "Divinity: Original Sin 2", tier: 'A', score: 9, binary: false, x: 1170, y: 470, size: 11 },
  { name: 'Monster Hunter World',  tier: 'A', score: 9,    binary: false, x: 1240, y: 530, size: 11 },
  { name: 'The Last of Us 1',      tier: 'A', score: 9,    binary: true,  x: 770,  y: 580, size: 11 },
  { name: 'Dark Souls 3',          tier: 'A', score: 9,    binary: true,  x: 670,  y: 600, size: 11 },
  { name: "Spider-Man: Miles Morales", tier: 'A', score: 9, binary: true, x: 540,  y: 570, size: 11 },
  { name: 'Armored Core 6',        tier: 'A', score: 9,    binary: false, x: 1300, y: 440, size: 11 },
  { name: 'Dragon Age: Origins',   tier: 'A', score: 9,    binary: false, x: 430,  y: 530, size: 11 },
  { name: "Assassin's Creed Odyssey", tier: 'A', score: 9, binary: false, x: 380,  y: 410, size: 11 },
  { name: 'Dishonored',            tier: 'A', score: 9,    binary: true,  x: 420,  y: 600, size: 11 },
  { name: 'Spider-Man',            tier: 'A', score: 8,    binary: true,  x: 850,  y: 620, size: 10 },
  { name: 'Ghost of Tsushima',     tier: 'A', score: 8,    binary: false, x: 980,  y: 620, size: 10 },
  { name: 'Battlefield 1',         tier: 'A', score: 8,    binary: false, x: 1100, y: 640, size: 10 },
  { name: 'Uncharted',             tier: 'A', score: 8,    binary: true,  x: 720,  y: 660, size: 10 },
  { name: 'Horizon Zero Dawn',     tier: 'A', score: 8,    binary: false, x: 580,  y: 670, size: 10 },

  // ============ A INDIE — pulsars ============
  // Tight cluster on the left side (their own little nebula)
  { name: 'Hades II',              tier: 'AI', score: 9.75, binary: false, x: 200, y: 320, size: 13 },
  { name: 'Hollow Knight',         tier: 'AI', score: 9.6,  binary: false, x: 130, y: 380, size: 12 },
  { name: 'Hades',                 tier: 'AI', score: 9.5,  binary: false, x: 240, y: 410, size: 12 },
  { name: 'Crusader Kings 3',      tier: 'AI', score: 9.4,  binary: false, x: 90,  y: 460, size: 12 },
  { name: 'Dispatch',              tier: 'AI', score: 9.32, binary: false, x: 180, y: 480, size: 11 },
  { name: 'Dead Cells',            tier: 'AI', score: 9.25, binary: false, x: 280, y: 490, size: 11 },
  { name: 'Slay the Princess',     tier: 'AI', score: 9.1,  binary: false, x: 140, y: 540, size: 11 },
  { name: 'Celeste',               tier: 'AI', score: 9,    binary: false, x: 230, y: 560, size: 11 },
  { name: 'Stardew Valley',        tier: 'AI', score: 9,    binary: false, x: 70,  y: 560, size: 11 },
  { name: 'Chained Echoes',        tier: 'AI', score: 8.5,  binary: false, x: 310, y: 610, size: 10 },

  // ============ B TIER — main sequence (outer halo) ============
  { name: 'Granblue Fantasy Relink', tier: 'B', score: 7.9, binary: false, x: 100, y: 670, size: 9 },
  { name: 'Horizon Forbidden West',  tier: 'B', score: 7.5, binary: false, x: 250, y: 695, size: 9 },
  { name: 'Valorant',                tier: 'B', score: 7.4, binary: false, x: 420, y: 715, size: 8 },
  { name: 'Devil May Cry',           tier: 'B', score: 7.1, binary: false, x: 580, y: 720, size: 8 },
  { name: 'Spider-Man 2',            tier: 'B', score: 7,   binary: false, x: 740, y: 720, size: 8 },
  { name: 'Uncharted 3',             tier: 'B', score: 6.5, binary: true,  x: 900, y: 715, size: 8 },
  { name: 'God of War Ragnarök',     tier: 'B', score: 6.5, binary: false, x: 1060, y: 700, size: 8 },
  { name: 'Tales of Arise',          tier: 'B', score: 6.2, binary: false, x: 1200, y: 695, size: 8 },
  { name: 'Code Vein',               tier: 'B', score: 6,   binary: false, x: 1330, y: 670, size: 7 },

  // ============ C TIER — brown dwarfs (extreme outskirts) ============
  { name: 'Monster Hunter Wilds',  tier: 'C', score: 5, binary: false, x: 50,   y: 745, size: 6 },
  { name: 'Crimson Desert',        tier: 'C', score: 4, binary: false, x: 1360, y: 745, size: 6 },
];

// stable catalog id from index (e.g. "SC-001")
const catalogId = (i) => `SC-${String(i + 1).padStart(3, '0')}`;
// per-tier spectral class for flavor
const spectralFor = (tier) => ({
  S:    'O-type · hyperluminous',
  A:    'B-type · blue supergiant',
  AI:   'pulsar · neutron',
  B:    'F-type · main sequence',
  C:    'M-type · sub-luminous',
  DOTA: 'G-type · home star',
}[tier]);
