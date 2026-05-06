/* ============================================================
   Cute SVG character components — placeholder-style
   Snoopy老師, 龍龍, 帕洽狗, 大耳狗, 企企

   Each character first tries to load
     assets/characters/<slug>.{svg,png,webp,jpg}
   and falls back to the inline SVG if no image is found.
   ============================================================ */

const useCharImg = (slug) => {
  const [src, setSrc] = React.useState(null);
  React.useEffect(() => {
    const exts = ["svg", "png", "webp", "jpg"];
    let cancelled = false;
    (async () => {
      for (const ext of exts) {
        const url = `assets/characters/${slug}.${ext}`;
        const ok = await new Promise(res => {
          const img = new Image();
          img.onload = () => res(true);
          img.onerror = () => res(false);
          img.src = url;
        });
        if (cancelled) return;
        if (ok) { setSrc(url); return; }
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);
  return src;
};

const CharImg = ({ src, size, alt }) => (
  <img src={src} alt={alt} width={size} height={size}
    style={{ display: "block", width: size, height: size, objectFit: "contain" }}/>
);

const Sheep = ({ size = 80, mood = "happy" }) => {
  const src = useCharImg("sheep");
  if (src) return <CharImg src={src} size={size} alt="老師"/>;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <g>
        <circle cx="30" cy="55" r="16" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
        <circle cx="50" cy="48" r="20" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
        <circle cx="70" cy="55" r="16" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
        <circle cx="40" cy="68" r="14" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
        <circle cx="62" cy="68" r="14" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/>
      </g>
      <ellipse cx="50" cy="55" rx="16" ry="15" fill="#3a2f4a"/>
      <ellipse cx="50" cy="55" rx="14" ry="13" fill="#534765"/>
      <ellipse cx="36" cy="46" rx="5" ry="7" fill="#3a2f4a" transform="rotate(-25 36 46)"/>
      <ellipse cx="64" cy="46" rx="5" ry="7" fill="#3a2f4a" transform="rotate(25 64 46)"/>
      <circle cx="44" cy="54" r="2.5" fill="#fff"/>
      <circle cx="56" cy="54" r="2.5" fill="#fff"/>
      <circle cx="44" cy="54" r="1.4" fill="#1a1a2e"/>
      <circle cx="56" cy="54" r="1.4" fill="#1a1a2e"/>
      {mood === "happy" && <path d="M46 62 Q50 65 54 62" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round"/>}
      {mood === "teach" && <ellipse cx="50" cy="63" rx="2" ry="1.5" fill="#1a1a2e"/>}
      {mood === "teach" && (
        <g fill="none" stroke="#6366f1" strokeWidth="1.4">
          <circle cx="44" cy="54" r="4.5"/>
          <circle cx="56" cy="54" r="4.5"/>
          <line x1="48.5" y1="54" x2="51.5" y2="54"/>
        </g>
      )}
      <circle cx="40" cy="59" r="1.8" fill="#ff8fb1" opacity="0.6"/>
      <circle cx="60" cy="59" r="1.8" fill="#ff8fb1" opacity="0.6"/>
    </svg>
  );
};

const Rabbit = ({ size = 80 }) => {
  const src = useCharImg("rabbit");
  if (src) return <CharImg src={src} size={size} alt="兔兔"/>;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <ellipse cx="40" cy="22" rx="5" ry="16" fill="#fff" stroke="#e5b8c8" strokeWidth="2"/>
      <ellipse cx="40" cy="22" rx="2.5" ry="12" fill="#ffd0e0"/>
      <ellipse cx="60" cy="22" rx="5" ry="16" fill="#fff" stroke="#e5b8c8" strokeWidth="2"/>
      <ellipse cx="60" cy="22" rx="2.5" ry="12" fill="#ffd0e0"/>
      <circle cx="50" cy="55" r="22" fill="#fff" stroke="#e5b8c8" strokeWidth="2"/>
      <circle cx="42" cy="52" r="3" fill="#1a1a2e"/>
      <circle cx="58" cy="52" r="3" fill="#1a1a2e"/>
      <circle cx="43" cy="51" r="1" fill="#fff"/>
      <circle cx="59" cy="51" r="1" fill="#fff"/>
      <ellipse cx="50" cy="60" rx="2.5" ry="1.8" fill="#ff8fb1"/>
      <path d="M50 62 L50 65 M50 65 Q46 67 44 65 M50 65 Q54 67 56 65" fill="none" stroke="#1a1a2e" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="38" cy="62" r="3" fill="#ffb3c8" opacity="0.7"/>
      <circle cx="62" cy="62" r="3" fill="#ffb3c8" opacity="0.7"/>
    </svg>
  );
};

const Panda = ({ size = 80 }) => {
  const src = useCharImg("panda");
  if (src) return <CharImg src={src} size={size} alt="熊貓"/>;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <circle cx="32" cy="30" r="9" fill="#1a1a2e"/>
      <circle cx="68" cy="30" r="9" fill="#1a1a2e"/>
      <circle cx="50" cy="55" r="24" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
      <ellipse cx="40" cy="52" rx="6" ry="8" fill="#1a1a2e" transform="rotate(-15 40 52)"/>
      <ellipse cx="60" cy="52" rx="6" ry="8" fill="#1a1a2e" transform="rotate(15 60 52)"/>
      <circle cx="40" cy="53" r="2.5" fill="#fff"/>
      <circle cx="60" cy="53" r="2.5" fill="#fff"/>
      <circle cx="40" cy="53" r="1.3" fill="#1a1a2e"/>
      <circle cx="60" cy="53" r="1.3" fill="#1a1a2e"/>
      <ellipse cx="50" cy="62" rx="3" ry="2" fill="#1a1a2e"/>
      <path d="M50 64 L50 67 M50 67 Q47 69 45 68 M50 67 Q53 69 55 68" fill="none" stroke="#1a1a2e" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
};

const Fox = ({ size = 80 }) => {
  const src = useCharImg("fox");
  if (src) return <CharImg src={src} size={size} alt="狐狐"/>;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <path d="M30 35 L25 18 L42 28 Z" fill="#f97316" stroke="#c2410c" strokeWidth="1.5"/>
      <path d="M70 35 L75 18 L58 28 Z" fill="#f97316" stroke="#c2410c" strokeWidth="1.5"/>
      <path d="M32 32 L29 22 L40 28 Z" fill="#fff"/>
      <path d="M68 32 L71 22 L60 28 Z" fill="#fff"/>
      <ellipse cx="50" cy="55" rx="22" ry="20" fill="#fb923c" stroke="#c2410c" strokeWidth="1.5"/>
      <path d="M35 55 Q50 75 65 55 Q60 70 50 72 Q40 70 35 55" fill="#fff"/>
      <circle cx="42" cy="50" r="2.5" fill="#1a1a2e"/>
      <circle cx="58" cy="50" r="2.5" fill="#1a1a2e"/>
      <circle cx="43" cy="49" r="0.9" fill="#fff"/>
      <circle cx="59" cy="49" r="0.9" fill="#fff"/>
      <ellipse cx="50" cy="60" rx="2.5" ry="2" fill="#1a1a2e"/>
      <path d="M50 62 L50 66 M50 66 Q46 68 44 66 M50 66 Q54 68 56 66" fill="none" stroke="#1a1a2e" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
};

const Lizard = ({ size = 80 }) => {
  const src = useCharImg("lizard");
  if (src) return <CharImg src={src} size={size} alt="蜥蜴"/>;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <ellipse cx="55" cy="62" rx="30" ry="18" fill="#b6e0d4" stroke="#2a4a5a" strokeWidth="2"/>
      <path d="M82 62 Q92 60 88 50 Q84 44 78 50" fill="none" stroke="#2a4a5a" strokeWidth="3" strokeLinecap="round"/>
      <path d="M38 76 L34 84 M52 78 L50 86 M65 78 L67 86 M75 76 L80 84" stroke="#2a4a5a" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="28" cy="52" rx="16" ry="13" fill="#a8d8ea" stroke="#2a4a5a" strokeWidth="2"/>
      <circle cx="22" cy="48" r="3" fill="#2a4a5a"/>
      <circle cx="21" cy="47" r="0.9" fill="#fff"/>
      <circle cx="28" cy="54" r="2" fill="#ff9eb5" opacity="0.7"/>
      <path d="M16 53 Q18 56 22 55" fill="none" stroke="#2a4a5a" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="50" cy="54" r="1.6" fill="#fff" opacity="0.7"/>
      <circle cx="62" cy="58" r="1.4" fill="#fff" opacity="0.7"/>
      <circle cx="44" cy="64" r="1.2" fill="#fff" opacity="0.7"/>
    </svg>
  );
};

const Coin = ({ size = 40, value = "$" }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} style={{ display: "block" }}>
    <circle cx="20" cy="20" r="18" fill="#f5c518" stroke="#d4a017" strokeWidth="2"/>
    <circle cx="20" cy="20" r="14" fill="none" stroke="#d4a017" strokeWidth="1" strokeDasharray="2 2"/>
    <text x="20" y="26" fontSize="16" fontWeight="800" textAnchor="middle" fill="#6b4f00" fontFamily="Inter, sans-serif">{value}</text>
    <ellipse cx="14" cy="14" rx="3" ry="1.5" fill="#fff" opacity="0.5"/>
  </svg>
);

const Piggy = ({ size = 120, fill = 0.5 }) => {
  const fillH = 55 * fill;
  return (
    <svg viewBox="0 0 120 100" width={size} height={(size * 100) / 120} style={{ display: "block" }}>
      <ellipse cx="60" cy="55" rx="46" ry="35" fill="#ffb3c8" stroke="#d4789a" strokeWidth="2"/>
      <defs>
        <clipPath id="piggy-clip">
          <ellipse cx="60" cy="55" rx="44" ry="33"/>
        </clipPath>
      </defs>
      <g clipPath="url(#piggy-clip)">
        <rect x="14" y={88 - fillH} width="92" height={fillH} fill="#f5c518" opacity="0.5"/>
      </g>
      <path d="M40 25 L35 15 L50 22 Z" fill="#d4789a"/>
      <circle cx="40" cy="48" r="3" fill="#1a1a2e"/>
      <circle cx="41" cy="47" r="1" fill="#fff"/>
      <ellipse cx="22" cy="58" rx="10" ry="8" fill="#ffb3c8" stroke="#d4789a" strokeWidth="2"/>
      <ellipse cx="20" cy="56" rx="2" ry="3" fill="#1a1a2e"/>
      <ellipse cx="22" cy="60" rx="2" ry="3" fill="#1a1a2e"/>
      <rect x="55" y="22" width="20" height="3" rx="1.5" fill="#1a1a2e"/>
      <rect x="32" y="85" width="8" height="12" rx="2" fill="#d4789a"/>
      <rect x="80" y="85" width="8" height="12" rx="2" fill="#d4789a"/>
      <path d="M104 50 Q112 50 110 42 Q108 36 102 40" fill="none" stroke="#d4789a" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="58" r="3" fill="#ff8fb1" opacity="0.5"/>
    </svg>
  );
};

const Illus = ({ name, desc, icon = "🖼️", small = false, ext = "png" }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  const src = `assets/illus/${name}.${ext}`;

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setErrored(true);
    img.src = src;
  }, [src]);

  if (loaded && !errored) {
    return (
      <div style={{ margin: "20px 0", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-soft)" }}>
        <img src={src} alt={desc} style={{ display: "block", width: "100%", height: "auto" }}/>
      </div>
    );
  }

  return (
    <div className={`illus-placeholder ${small ? "small" : ""}`}>
      <span className="icon">{icon}</span>
      <div>📷 插畫位置 · Illustration goes here</div>
      <div className="desc">{desc}</div>
      <div className="filename">assets/illus/{name}.{ext}</div>
    </div>
  );
};

window.Illus = Illus;
window.Sheep = Sheep;
window.Rabbit = Rabbit;
window.Panda = Panda;
window.Fox = Fox;
window.Lizard = Lizard;
window.Coin = Coin;
window.Piggy = Piggy;
