// ============================================================
// STELLAR ATLAS — REACT APP
// ============================================================
// This file contains all the rendering logic. You typically
// shouldn't need to edit this unless you're changing how
// things look or behave. For changing WHAT is shown
// (games, tiers, colors), edit data.js instead.
// ============================================================

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ====================================================================
// COMPONENTS
// ====================================================================

function StarLabel({ children, color }) {
  return (
    <div className="star-label" style={{ color }}>{children}</div>
  );
}

// Diffraction spikes — for the brightest objects (S + DOTA)
function Spikes({ color, length = 80 }) {
  // 4-point cross + small diagonals
  return (
    <div className="spike-host">
      <div className="spike" style={{ '--ang': '0deg',   '--spike-color': color, '--spike-len': `${length}px` }}/>
      <div className="spike" style={{ '--ang': '90deg',  '--spike-color': color, '--spike-len': `${length * 0.92}px`, '--breath': '0.4s' }}/>
      <div className="spike" style={{ '--ang': '45deg',  '--spike-color': color, '--spike-len': `${length * 0.5}px`,  '--breath': '0.8s', opacity: 0.4 }}/>
      <div className="spike" style={{ '--ang': '-45deg', '--spike-color': color, '--spike-len': `${length * 0.5}px`,  '--breath': '1.2s', opacity: 0.4 }}/>
    </div>
  );
}

// Single game star on the atlas
function StarBody({ game, idx, isSelected, isHovered, onClick, onHover, hidden }) {
  const t = TIERS[game.tier];
  const showSpikes = game.tier === 'S' || game.tier === 'DOTA';
  const spikeLen = game.tier === 'DOTA' ? 130 : (game.size * 5);
  const twinkleDur = 2.5 + (idx * 0.17) % 3;
  const twinkleDelay = (idx * 0.43) % 4;

  if (hidden) return null;

  const xPct = (game.x / 1400) * 100;
  const yPct = (game.y / 900) * 100;

  return (
    <>
      {showSpikes && (
        <div style={{ position: 'absolute', left: `${xPct}%`, top: `${yPct}%`, pointerEvents: 'none' }}>
          <Spikes color={t.glow} length={spikeLen} />
        </div>
      )}
      <div
        className={`star twinkle-it ${isSelected ? 'selected' : ''}`}
        style={{
          left: `${xPct}%`,
          top: `${yPct}%`,
          '--size': `${game.size}px`,
          '--color': t.color,
          '--glow': t.glow,
          '--glow-soft': t.glowSoft,
          '--twinkle-dur': `${twinkleDur}s`,
          '--twinkle-delay': `${twinkleDelay}s`,
        }}
        onClick={() => onClick(game)}
        onMouseEnter={() => onHover(game)}
        onMouseLeave={() => onHover(null)}
      />
      {(isSelected || isHovered) && (
        <div style={{ position: 'absolute', left: `${xPct}%`, top: `${yPct}%`, pointerEvents: 'none' }}>
          <StarLabel color={t.color}>{game.name.toUpperCase()}</StarLabel>
        </div>
      )}
    </>
  );
}

// Floating tier markers on atlas
function TierMarkers() {
  const items = [
    { tier: 'S',    label: 'SINGULARITY',   id: 'CLASS-I',    x: 920,  y: 130 },
    { tier: 'AI',   label: 'PULSAR FIELD',  id: 'CLASS-II.5', x: 180,  y: 220 },
    { tier: 'A',    label: 'SUPERGIANT',    id: 'CLASS-II',   x: 870,  y: 395 },
    { tier: 'B',    label: 'MAIN SEQUENCE', id: 'CLASS-III',  x: 600,  y: 615 },
    { tier: 'DOTA', label: 'HOME STAR',     id: 'CLASS-Ø',    x: 1280, y: 555 },
  ];
  return (
    <>
      {items.map((it, i) => {
        const t = TIERS[it.tier];
        return (
          <div
            key={i}
            className="tier-marker"
            style={{
              left: `${(it.x / 1400) * 100}%`,
              top: `${(it.y / 900) * 100}%`,
              '--color': t.glow,
            }}
          >
            <div className="name">{it.label}</div>
            <div className="id">[{it.id}]</div>
          </div>
        );
      })}
    </>
  );
}

// Background twinkling stars (decorative)
function TwinkleField({ count = 60 }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: (i * 17 + (i * i * 7) % 100) % 100,
      top: (i * 23 + (i * 11) % 100) % 100,
      dur: 2 + (i % 7) * 0.5,
      delay: (i * 0.13) % 5,
      size: (i % 5 === 0) ? 2 : 1,
    }));
  }, [count]);
  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size, height: s.size,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          }}
        />
      ))}
    </>
  );
}

// ====================================================================
// ATLAS VIEW
// ====================================================================
function AtlasView({ games, selected, setSelected, hovered, setHovered, enabledTiers }) {
  return (
    <div className="atlas">
      <div className="stage">
        {/* layered drifting starfield */}
        <div className="stars-bg" />
        <div className="stars-bg layer-2" />
        <div className="stars-bg layer-3" />

        {/* The big diagonal nebula */}
        <div className="nebula haze" />
        <div className="nebula" />

        {/* additional twinkles */}
        <TwinkleField count={80} />

        {/* scan sweep */}
        <div className="scan" />

        {/* tier name markers */}
        <TierMarkers />

        {/* the game stars */}
        {games.map((g, i) => (
          <StarBody
            key={g.name}
            game={g}
            idx={i}
            isSelected={selected?.name === g.name}
            isHovered={hovered?.name === g.name}
            onClick={setSelected}
            onHover={setHovered}
            hidden={!enabledTiers[g.tier]}
          />
        ))}
      </div>
    </div>
  );
}

// ====================================================================
// DETAIL PANEL
// ====================================================================
function DetailPanel({ game, onClose, idx }) {
  if (!game) return <div className="panel" />;
  const t = TIERS[game.tier];
  const isInf = game.score === 'inf' || game.score === '∞/∞';
  return (
    <div className={`panel ${game ? 'open' : ''} scroll-mask`} style={{ '--accent': t.accent }}>
      <button className="panel-close" onClick={onClose}>×</button>

      <div className="fade-in">
        <div className="panel-meta">
          <span className="tier" style={{ color: t.glow }}>{t.classRoman}</span>
          <span>{catalogId(idx)}</span>
          <span className="dot">·</span>
          <span>OBJ-{game.tier}</span>
        </div>

        <h2 className="panel-name">{game.name}</h2>
        <div className="panel-class">
          <b>{t.classification}</b> · {spectralFor(game.tier)}
        </div>

        <div className="panel-magnitude">
          <div className="label">APPARENT MAGNITUDE</div>
          <div className={`value ${isInf ? 'inf' : ''}`}>
            {isInf ? '∞' : game.score}
          </div>
          <div className="scale">{isInf ? 'exceeds catalog limits' : 'of 10.00'}</div>
        </div>

        <div className="panel-row">
          <span className="k">DESIGNATION</span>
          <span className="v">{catalogId(idx)}</span>
        </div>
        <div className="panel-row">
          <span className="k">CLASS</span>
          <span className="v accent">{t.classification}</span>
        </div>
        <div className="panel-row">
          <span className="k">SPECTRAL</span>
          <span className="v">{spectralFor(game.tier)}</span>
        </div>
        <div className="panel-row">
          <span className="k">STATUS</span>
          <span className="v">{game.binary ? 'binary system' : 'isolated body'}</span>
        </div>
        {game.apple && (
          <div className="panel-row">
            <span className="k">COMPANION</span>
            <span className="v accent">@apple · co-observation</span>
          </div>
        )}
        <div className="panel-row">
          <span className="k">FIRST OBSERVED</span>
          <span className="v">archive · ongoing</span>
        </div>

        {game.binary && (
          <div className="binary-badge">COOPERATIVE ORBIT · BEST OBSERVED WITH COMPANY</div>
        )}

        <div className="panel-note">
          {game.note ?? t.short}
        </div>
      </div>
    </div>
  );
}

// ====================================================================
// CATALOG VIEW
// ====================================================================
function CatalogView({ games, setSelected }) {
  const groups = ['S', 'DOTA', 'A', 'AI', 'B', 'C'];
  const tierGames = useMemo(() => {
    const out = {};
    groups.forEach(g => { out[g] = []; });
    games.forEach(g => out[g.tier]?.push(g));
    return out;
  }, [games]);

  return (
    <div className="catalog scroll-mask">
      <div className="catalog-inner">
        {groups.map(gk => {
          const list = tierGames[gk];
          if (!list || list.length === 0) return null;
          const t = TIERS[gk];
          return (
            <div key={gk} className="cat-group" style={{ '--accent': t.glow }}>
              <div className="cat-group-head">
                <div className="glyph">{t.label}</div>
                <div>
                  <div className="name"><b>{t.classification}</b> · {t.classRoman}</div>
                  <div className="count">[{list.length} observed]</div>
                </div>
                <div className="desc">{t.desc}</div>
              </div>
              <div className="cat-grid">
                {list.map((g, i) => {
                  const gi = games.indexOf(g);
                  const isInf = g.score === 'inf' || g.score === '∞/∞';
                  return (
                    <div
                      key={g.name}
                      className="cat-card"
                      style={{ '--accent': t.glow }}
                      onClick={() => setSelected(g)}
                    >
                      <div className="cat-id">{catalogId(gi)}</div>
                      <div className="cat-name">{g.name}</div>
                      <div className="cat-bottom">
                        <div className={`cat-mag ${isInf ? 'inf' : ''}`}>
                          {isInf ? '∞' : g.score}
                        </div>
                        {g.binary && <div className="cat-binary">◉◉ binary</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ====================================================================
// MISSION LOG VIEW
// ====================================================================
function LogView({ games }) {
  const counts = useMemo(() => {
    const c = { S: 0, A: 0, AI: 0, B: 0, C: 0, DOTA: 0 };
    games.forEach(g => c[g.tier]++);
    return c;
  }, [games]);
  const totalConfirmed = games.length;
  const inf = games.filter(g => g.score === 'inf').length;
  const binary = games.filter(g => g.binary).length;

  return (
    <div className="log-view scroll-mask">
      <div className="log-inner">

        <div className="stat-grid">
          <div className="stat-cell">
            <div className="sk">CATALOGUED</div>
            <div className="sv">{totalConfirmed}</div>
            <div className="ss">stellar objects</div>
          </div>
          <div className="stat-cell">
            <div className="sk">SINGULARITIES</div>
            <div className="sv">{inf}</div>
            <div className="ss">∞ magnitude</div>
          </div>
          <div className="stat-cell">
            <div className="sk">BINARY SYS.</div>
            <div className="sv">{binary}</div>
            <div className="ss">cooperative orbits</div>
          </div>
          <div className="stat-cell">
            <div className="sk">DARK MATTER</div>
            <div className="sv">~∞</div>
            <div className="ss">unobserved mass</div>
          </div>
        </div>

        <div className="log-block dota-block">
          <div className="lb-tag">★ HOME STAR PROTOCOL ★</div>
          <h3>DOTA 2 · CALIBRATION REFERENCE</h3>
          <p>
            <b>magnitude: ∞/∞.</b> the home star does not appear in the standard catalog because
            every other object is measured against it. when other systems are surveyed, time is
            recorded in <b>units of dota matches not played</b>. cumulative dwell time exceeds
            all other observed bodies combined. it is the gravitational center of the catalog —
            stable, persistent, and quietly consuming the surrounding mass.
          </p>
        </div>

        <div className="log-block">
          <div className="lb-tag">► OBSERVATION NOTES</div>
          <h3>BINARY SYSTEMS — COOPERATIVE ORBIT</h3>
          <p>
            <b>{binary} stellar objects</b> in this catalog exhibit binary-system behavior — their
            signal is amplified when a second observer is present in the chamber. the field log
            entry reads "<i>would replay if u wanna watch</i>", which is shorthand for
            <b> co-orbit confirmed</b>. these objects are tagged accordingly and recommended
            for joint observation runs.
          </p>
        </div>

        <div className="log-block">
          <div className="lb-tag">⚠ SECONDARY BODY</div>
          <h3>IT TAKES TWO · MAGNITUDE CORRECTION</h3>
          <p>
            recorded magnitude <b>9.05</b> reflects standalone observation. when paired with
            companion object <b>@apple</b>, the system enters cooperative orbit and the effective
            magnitude resolves to <b>10.00</b>. this is the only catalog entry where the recorded
            value materially understates the observed signal.
          </p>
        </div>

        <div className="log-block">
          <div className="lb-tag">◌ DARK MATTER</div>
          <h3>UNOBSERVED MASS</h3>
          <p>
            field log includes the entry "<i>and so much more trash games i forget about</i>".
            these objects exist but have <b>fallen below the detection threshold</b> of working
            memory. estimated mass: substantial. designation: <b>DM-001 through DM-∞</b>. they
            are not displayed on the atlas because they cannot be located on demand — only
            inferred from gravitational effects on the rest of the catalog.
          </p>
        </div>

        <div className="log-block">
          <div className="lb-tag">↳ FILED BY</div>
          <h3>MISSION CONTROL · ATLAS v1</h3>
          <p>
            this catalog reflects observations as of the current epoch. magnitude values are
            <b> subjective</b> but were recorded in good faith. tier boundaries are firm except
            for the SINGULARITY threshold, which is defined as "<i>I cannot rank these</i>".
            transmission ends.
          </p>
        </div>

      </div>
    </div>
  );
}

// ====================================================================
// HEADER / FOOTER
// ====================================================================
function Header({ view, setView, selected }) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const stardate = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const dayOfYear = Math.floor((d - new Date(y, 0, 0)) / 86400000);
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${y}.${String(dayOfYear).padStart(3, '0')}.${h}${m}`;
  }, [time]);

  return (
    <>
      <div className="hud-top">
        <div className="hud-left">
          <div className="title">stellar atlas</div>
          <div className="sub">personal cosmic catalog · <b>v1.0</b></div>
        </div>
        <div className="hud-coords">
          <div><span className="live">●</span> LIVE · TELESCOPE ONLINE</div>
          <div>STARDATE <span className="val">{stardate}</span></div>
          <div>RA <span className="val">17h42m</span> · DEC <span className="val">-29°00'</span></div>
        </div>
      </div>
      <div className="nav">
        <button className={`nav-btn ${view === 'atlas' ? 'active' : ''}`} onClick={() => setView('atlas')}>
          atlas
        </button>
        <button className={`nav-btn ${view === 'catalog' ? 'active' : ''}`} onClick={() => setView('catalog')}>
          catalog
        </button>
        <button className={`nav-btn ${view === 'log' ? 'active' : ''}`} onClick={() => setView('log')}>
          mission log
        </button>
      </div>
    </>
  );
}

function StatusBar({ selected, total, observing }) {
  return (
    <div className="hud-bottom">
      <div className="grp">
        <span><span className="pulse-dot"></span>OBSERVATORY · ACTIVE</span>
      </div>
      <div className="grp">
        <span>OBJECTS: <b>{total}</b></span>
        <span>OBSERVING: <b>{observing}</b></span>
        <span>FOCUS: <b>{selected ? selected.name.toUpperCase() : '—'}</b></span>
      </div>
    </div>
  );
}

// Tier filters that toggle visibility
function TierFilters({ enabled, setEnabled }) {
  const tiers = [
    { k: 'S',    label: 'S' },
    { k: 'A',    label: 'A' },
    { k: 'AI',   label: 'A·INDIE' },
    { k: 'B',    label: 'B' },
    { k: 'C',    label: 'C' },
    { k: 'DOTA', label: '☉' },
  ];
  return (
    <div className="tier-filters">
      {tiers.map(t => (
        <button
          key={t.k}
          className={`tf-btn ${enabled[t.k] ? 'on' : ''}`}
          style={{ '--col': TIERS[t.k].glow }}
          onClick={() => setEnabled({ ...enabled, [t.k]: !enabled[t.k] })}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ====================================================================
// APP
// ====================================================================
function App() {
  const [view, setView] = useState('atlas');
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [enabled, setEnabled] = useState({
    S: true, A: true, AI: true, B: true, C: true, DOTA: true,
  });

  const visibleGames = useMemo(() =>
    GAMES.filter(g => enabled[g.tier]),
  [enabled]);

  const selectedIdx = selected ? GAMES.findIndex(g => g.name === selected.name) : -1;

  return (
    <>
      <Header view={view} setView={setView} selected={selected} />

      {view === 'atlas' && (
        <AtlasView
          games={GAMES}
          selected={selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
          enabledTiers={enabled}
        />
      )}
      {view === 'catalog' && (
        <CatalogView games={GAMES} setSelected={setSelected} />
      )}
      {view === 'log' && (
        <LogView games={GAMES} />
      )}

      {view === 'atlas' && <TierFilters enabled={enabled} setEnabled={setEnabled} />}

      <DetailPanel game={selected} onClose={() => setSelected(null)} idx={selectedIdx} />

      <StatusBar
        selected={selected}
        total={GAMES.length}
        observing={visibleGames.length}
      />
    </>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Hide boot splash after fonts settle
(document.fonts?.ready || Promise.resolve()).then(() => {
  setTimeout(() => {
    const b = document.getElementById('boot');
    if (b) {
      b.classList.add('hide');
      setTimeout(() => b.remove(), 900);
    }
  }, 600);
});
