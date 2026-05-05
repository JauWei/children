/* ============================================================
   Interactive learning widgets
   ============================================================ */

// ---------- 1. Piggy Bank Compound Interest ----------
const PiggyCompound = () => {
  const [principal, setPrincipal] = React.useState(100);
  const [rate, setRate] = React.useState(8);
  const [years, setYears] = React.useState(10);

  const data = React.useMemo(() => {
    const arr = [];
    let v = principal;
    for (let y = 0; y <= years; y++) {
      arr.push({ year: y, value: Math.round(v) });
      v *= 1 + rate / 100;
    }
    return arr;
  }, [principal, rate, years]);

  const final = data[data.length - 1].value;
  const profit = final - principal;
  const maxV = data[data.length - 1].value;

  return (
    <div className="block success">
      <h2>🐷 撲滿成長機 <span className="en">Compound Interest Magic</span></h2>
      <p>把錢存進去，每年生一點點利息，利息又會再生利息。這就是<strong>複利</strong>，愛因斯坦說它是世界第八大奇蹟！<span className="en">Money grows on top of money — that's compound interest.</span></p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center", marginTop: 16 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <Piggy size={160} fill={Math.min(1, final / (principal * 4))}/>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "var(--fg-3)", fontWeight: 600 }}>{years} 年後 / After {years} years</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--coin-gold-d)" }}>${final.toLocaleString()}</div>
            <div style={{ fontSize: 13, color: "var(--leaf-green)", fontWeight: 700 }}>+${profit.toLocaleString()} 利息賺到 🎉</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Slider label="本金 Principal" value={principal} min={10} max={1000} step={10} prefix="$" onChange={setPrincipal}/>
          <Slider label="年利率 Rate" value={rate} min={1} max={20} step={1} suffix="%" onChange={setRate}/>
          <Slider label="存幾年 Years" value={years} min={1} max={40} step={1} suffix=" 年" onChange={setYears}/>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <svg viewBox="0 0 600 180" width="100%" style={{ display: "block" }}>
          {/* grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
            <line key={i} x1="40" y1={20 + 140 * (1 - p)} x2="580" y2={20 + 140 * (1 - p)} stroke="#f0e8dd" strokeWidth="1" strokeDasharray="2 3"/>
          ))}
          {/* bars */}
          {data.map((d, i) => {
            const x = 40 + (i * 540) / years;
            const w = Math.max(8, 540 / years - 6);
            const h = (d.value / maxV) * 140;
            return (
              <g key={i}>
                <rect x={x} y={160 - h} width={w} height={h} rx="3" fill="url(#bargrad)"/>
                {i % Math.max(1, Math.floor(years / 8)) === 0 && (
                  <text x={x + w / 2} y="175" fontSize="10" textAnchor="middle" fill="#9ca3af">{d.year}y</text>
                )}
              </g>
            );
          })}
          <defs>
            <linearGradient id="bargrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5c518"/>
              <stop offset="100%" stopColor="#f97316"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="bubble-row" style={{ marginTop: 20 }}>
        <div className="bubble-avatar sheep"><Sheep size={56} mood="teach"/><span className="bubble-avatar-name">小羊老師</span></div>
        <div className="bubble sheep">
          <strong>越早開始，雪球越大！</strong>同樣存 $100，存 5 年只賺一點點，存 30 年就賺好多好多～這就是時間的魔法 ✨
          <span className="en">The earlier you start, the bigger the snowball. Time is magic!</span>
        </div>
      </div>
    </div>
  );
};

const Slider = ({ label, value, min, max, step, prefix = "", suffix = "", onChange }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
      <span style={{ color: "var(--fg-2)" }}>{label}</span>
      <span style={{ color: "var(--indigo-700)" }}>{prefix}{value}{suffix}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ width: "100%", accentColor: "var(--indigo)" }}/>
  </div>
);

// ---------- 2. Supply & Demand mini-game ----------
const SupplyDemand = () => {
  const [price, setPrice] = React.useState(20);
  // demand decreases with price; supply increases with price
  const demand = Math.max(0, Math.round(120 - price * 2.5));
  const supply = Math.max(0, Math.round(price * 2.2));
  const sold = Math.min(demand, supply);
  const revenue = sold * price;

  let advice = "";
  if (price < 15) advice = "太便宜！大家都搶著買，但你做不出這麼多檸檬汁 😅";
  else if (price > 35) advice = "太貴了！只有少少人想買 🥲";
  else advice = "價格剛剛好！賺得最多 🎉";

  return (
    <div className="block">
      <h2>🍋 檸檬汁攤老闆 <span className="en">Lemonade Stand: Supply & Demand</span></h2>
      <p>你開了一間檸檬汁攤！如果定價太便宜，做不夠賣；定價太貴，沒人想買。怎麼定價才能<strong>賺最多</strong>？<span className="en">Set the right price to maximize profit.</span></p>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, marginTop: 16 }}>
        <div>
          {/* lemonade stand visual */}
          <div style={{ background: "linear-gradient(180deg, #fff7e0, #fef3c7)", borderRadius: 16, padding: 20, position: "relative", minHeight: 220, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 8, left: 12, fontSize: 14, fontWeight: 800, color: "#92400e" }}>🍋 小狐狸檸檬汁</div>
            <div style={{ position: "absolute", top: 8, right: 12, background: "white", padding: "4px 10px", borderRadius: 999, fontSize: 13, fontWeight: 800, color: "var(--coin-gold-d)" }}>${price} / 杯</div>

            {/* customers (one per demand unit, capped) */}
            <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", padding: "0 16px" }}>
              {Array.from({ length: Math.min(20, demand) }).map((_, i) => (
                <span key={i} style={{ fontSize: 22, animation: `bob ${2 + (i % 4) * 0.3}s ease-in-out infinite` }}>
                  {["🧒", "👧", "🧑", "👶", "👵"][i % 5]}
                </span>
              ))}
              {demand === 0 && <span style={{ fontSize: 28 }}>🌬️ 沒有客人...</span>}
            </div>

            {/* stand counter */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "#d97706", borderTop: "4px solid #92400e" }}>
              <div style={{ display: "flex", justifyContent: "space-around", paddingTop: 6 }}>
                {Array.from({ length: Math.min(8, supply) }).map((_, i) => (
                  <span key={i} style={{ fontSize: 22 }}>🥤</span>
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 12, right: 12 }}><Fox size={56}/></div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Slider label="🏷️ 定價 Price" value={price} min={5} max={50} step={1} prefix="$" onChange={setPrice}/>
          <div className="stat-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 8, margin: 0 }}>
            <div className="stat-card" style={{ padding: 12 }}>
              <span className="emoji" style={{ fontSize: 22, marginBottom: 2 }}>🙋</span>
              <div className="label" style={{ fontSize: 10 }}>想買的人</div>
              <div className="value" style={{ fontSize: 18 }}>{demand}</div>
            </div>
            <div className="stat-card" style={{ padding: 12 }}>
              <span className="emoji" style={{ fontSize: 22, marginBottom: 2 }}>🥤</span>
              <div className="label" style={{ fontSize: 10 }}>能做的杯</div>
              <div className="value" style={{ fontSize: 18 }}>{supply}</div>
            </div>
            <div className="stat-card" style={{ padding: 12, background: "#dcfce7", borderColor: "#a7f3d0" }}>
              <span className="emoji" style={{ fontSize: 22, marginBottom: 2 }}>✅</span>
              <div className="label" style={{ fontSize: 10 }}>實際賣出</div>
              <div className="value" style={{ fontSize: 18, color: "#166534" }}>{sold}</div>
            </div>
            <div className="stat-card" style={{ padding: 12, background: "#fef3c7", borderColor: "#fde68a" }}>
              <span className="emoji" style={{ fontSize: 22, marginBottom: 2 }}>💰</span>
              <div className="label" style={{ fontSize: 10 }}>今日收入</div>
              <div className="value" style={{ fontSize: 18, color: "#92400e" }}>${revenue}</div>
            </div>
          </div>
          <div style={{ background: "#f5f3ff", padding: 12, borderRadius: 12, fontSize: 13, color: "var(--ink-warm)", lineHeight: 1.5 }}>
            💡 {advice}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- 3. Money Time Machine ----------
const TimeMachine = () => {
  const eras = [
    { year: 1980, items: [{ e: "🍜", n: "一碗牛肉麵", p: 30 }, { e: "🎬", n: "電影票", p: 50 }, { e: "🚌", n: "公車票 30 趟", p: 90 }, { e: "📚", n: "幾本漫畫", p: 80 }] },
    { year: 2005, items: [{ e: "🍔", n: "麥當勞套餐", p: 99 }, { e: "🎬", n: "電影票", p: 250 }, { e: "🥤", n: "20 杯珍奶", p: 100 }, { e: "📱", n: "...買不起手機", p: "—" }] },
    { year: 2025, items: [{ e: "🧋", n: "1.5 杯珍奶", p: 80 }, { e: "🍱", n: "一個便當", p: 100 }, { e: "🎮", n: "...買不到遊戲", p: "—" }, { e: "☕", n: "1 杯星巴克", p: 120 }] },
  ];
  const [idx, setIdx] = React.useState(2);
  const era = eras[idx];

  return (
    <div className="block warn">
      <h2>🕰️ 金錢時光機 <span className="en">$100 Through Time</span></h2>
      <p>同樣是 <strong>100 元</strong>，在不同年代可以買到的東西差很多！這就是<strong>通貨膨脹</strong>。<span className="en">$100 buys less every year — that's inflation.</span></p>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "16px 0" }}>
        {eras.map((e, i) => (
          <button key={i} className={i === idx ? "btn btn-primary" : "btn btn-ghost"} onClick={() => setIdx(i)}>
            {e.year} 年
          </button>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: 16, padding: 20, border: "2px dashed #f59e0b" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 48 }}>💵</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e" }}>{era.year} 年的 $100 可以買...</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          {era.items.map((it, i) => (
            <div key={i} style={{ background: "#fff7e0", padding: 12, borderRadius: 12, textAlign: "center" }}>
              <div style={{ fontSize: 32 }}>{it.e}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{it.n}</div>
              <div style={{ fontSize: 11, color: "var(--fg-3)" }}>當時約 ${it.p}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bubble-row" style={{ marginTop: 20 }}>
        <div className="bubble-avatar lizard"><Lizard size={56}/><span className="bubble-avatar-name">蜥蜴 Tokage</span></div>
        <div className="bubble lizard">
          所以放著錢不動，其實會慢慢變「薄」～這就是為什麼大人會把錢拿去投資，希望錢長大得比通膨快！(´･ω･`)
          <span className="en">Cash sitting still actually loses value over time.</span>
        </div>
      </div>
    </div>
  );
};

window.PiggyCompound = PiggyCompound;
window.SupplyDemand = SupplyDemand;
window.TimeMachine = TimeMachine;
window.Slider = Slider;
