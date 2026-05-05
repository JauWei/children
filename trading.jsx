/* ============================================================
   Stock Market Simulator + Need-vs-Want + Quiz
   ============================================================ */

// ---------- Stock Simulator ----------
const STOCKS_INITIAL = [
  { sym: "SHEEP", name: "小羊牧場", emoji: "🐑", desc: "賣羊毛和起司，穩穩經營", price: 50, vol: 0.04, trend: 0.001, color: "#8b5cf6" },
  { sym: "PENG", name: "企鵝冰店", emoji: "🐧", desc: "夏天爆紅，冬天冷清", price: 80, vol: 0.08, trend: 0.002, color: "#3b82f6" },
  { sym: "DINO", name: "恐龍玩具", emoji: "🦕", desc: "新公司，可能大紅或倒掉", price: 30, vol: 0.15, trend: 0.005, color: "#22c55e" },
  { sym: "TSMC", name: "台積電", emoji: "🔷", desc: "做晶片給全世界", price: 1000, vol: 0.03, trend: 0.0015, color: "#0ea5e9" },
  { sym: "FXMAIL", name: "狐狸快遞", emoji: "🦊", desc: "送貨送很快", price: 120, vol: 0.05, trend: 0.001, color: "#f97316" },
];

const NEWS_POOL = [
  { sym: "PENG", txt: "🌞 大熱浪來襲！冰店生意爆好", impact: 0.06 },
  { sym: "PENG", txt: "❄️ 寒流來了，沒人吃冰...", impact: -0.05 },
  { sym: "SHEEP", txt: "🧀 起司比賽得獎！", impact: 0.04 },
  { sym: "SHEEP", txt: "🌧️ 牧場下雨，羊感冒", impact: -0.03 },
  { sym: "DINO", txt: "🎬 新恐龍電影上映，玩具大賣！", impact: 0.12 },
  { sym: "DINO", txt: "📦 玩具被退貨...", impact: -0.10 },
  { sym: "TSMC", txt: "💻 接到大訂單", impact: 0.04 },
  { sym: "TSMC", txt: "⚡ 工廠停電一天", impact: -0.03 },
  { sym: "FXMAIL", txt: "🎄 聖誕節包裹爆量！", impact: 0.05 },
  { sym: "FXMAIL", txt: "🚚 卡車壞了，延誤", impact: -0.04 },
];

const StockSim = () => {
  const [stocks, setStocks] = React.useState(() => STOCKS_INITIAL.map(s => ({ ...s, history: [s.price] })));
  const [cash, setCash] = React.useState(10000);
  const [holdings, setHoldings] = React.useState({}); // { sym: shares }
  const [day, setDay] = React.useState(1);
  const [news, setNews] = React.useState([]);
  const [selected, setSelected] = React.useState("SHEEP");
  const [qty, setQty] = React.useState(1);
  const [autoPlay, setAutoPlay] = React.useState(false);

  const advance = React.useCallback(() => {
    setStocks(prev => {
      // pick 1-2 news
      const todayNews = [];
      const np = NEWS_POOL[Math.floor(Math.random() * NEWS_POOL.length)];
      todayNews.push(np);
      if (Math.random() < 0.4) {
        const np2 = NEWS_POOL[Math.floor(Math.random() * NEWS_POOL.length)];
        if (np2.sym !== np.sym) todayNews.push(np2);
      }
      setNews(n => [{ day: day, items: todayNews }, ...n].slice(0, 5));

      return prev.map(s => {
        // random walk + trend
        let change = (Math.random() - 0.48) * s.vol + s.trend;
        // apply news
        todayNews.forEach(nw => { if (nw.sym === s.sym) change += nw.impact; });
        const newP = Math.max(1, s.price * (1 + change));
        return { ...s, price: newP, history: [...s.history.slice(-29), newP] };
      });
    });
    setDay(d => d + 1);
  }, [day]);

  React.useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(advance, 1500);
    return () => clearInterval(t);
  }, [autoPlay, advance]);

  const portfolioValue = stocks.reduce((sum, s) => sum + (holdings[s.sym] || 0) * s.price, 0);
  const total = cash + portfolioValue;
  const profit = total - 10000;

  const sel = stocks.find(s => s.sym === selected);
  const owned = holdings[selected] || 0;
  const cost = sel.price * qty;

  const buy = () => {
    if (cost > cash) return;
    setCash(c => c - cost);
    setHoldings(h => ({ ...h, [selected]: (h[selected] || 0) + qty }));
  };
  const sell = () => {
    if (qty > owned) return;
    setCash(c => c + cost);
    setHoldings(h => ({ ...h, [selected]: owned - qty }));
  };
  const reset = () => {
    setStocks(STOCKS_INITIAL.map(s => ({ ...s, history: [s.price] })));
    setCash(10000);
    setHoldings({});
    setDay(1);
    setNews([]);
    setAutoPlay(false);
  };

  return (
    <div>
      {/* Portfolio header */}
      <div className="block" style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #14b8a6 100%)", color: "white", border: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 600 }}>📅 第 {day} 天 · DAY {day}</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>你的總資產 Total Portfolio</div>
            <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.1 }}>${total.toFixed(0).toLocaleString()}</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2, color: profit >= 0 ? "#86efac" : "#fca5a5" }}>
              {profit >= 0 ? "📈 +" : "📉 "}${Math.abs(profit).toFixed(0)} ({((profit / 10000) * 100).toFixed(1)}%)
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: "rgba(255,255,255,0.15)", padding: "10px 16px", borderRadius: 12, backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: 11, opacity: 0.85 }}>💵 現金</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>${cash.toFixed(0)}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", padding: "10px 16px", borderRadius: 12, backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: 11, opacity: 0.85 }}>📊 股票</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>${portfolioValue.toFixed(0)}</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button className="btn" style={{ background: "white", color: "var(--indigo-700)" }} onClick={advance}>⏭️ 下一天 Next Day</button>
          <button className="btn" style={{ background: autoPlay ? "#fee2e2" : "rgba(255,255,255,0.2)", color: autoPlay ? "#991b1b" : "white" }} onClick={() => setAutoPlay(a => !a)}>
            {autoPlay ? "⏸️ 暫停" : "▶️ 自動播放"}
          </button>
          <button className="btn" style={{ background: "rgba(255,255,255,0.15)", color: "white" }} onClick={reset}>🔄 重來</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        {/* Stock list */}
        <div className="block" style={{ padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>📋 股票列表 Stock List</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {stocks.map(s => {
              const prev = s.history[s.history.length - 2] || s.price;
              const chg = ((s.price - prev) / prev) * 100;
              const own = holdings[s.sym] || 0;
              return (
                <div key={s.sym}
                  onClick={() => setSelected(s.sym)}
                  style={{
                    display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 12, alignItems: "center",
                    padding: 12, borderRadius: 12, cursor: "pointer",
                    background: selected === s.sym ? "#eef2ff" : "var(--bg-1)",
                    border: selected === s.sym ? "2px solid var(--indigo)" : "2px solid transparent",
                    transition: "all 0.15s"
                  }}>
                  <div style={{ fontSize: 28 }}>{s.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{s.name} <span style={{ fontSize: 11, color: "var(--fg-3)", fontWeight: 600 }}>{s.sym}</span></div>
                    <div style={{ fontSize: 11, color: "var(--fg-3)" }}>{s.desc}</div>
                  </div>
                  {/* sparkline */}
                  <svg width="60" height="28" viewBox="0 0 60 28">
                    <polyline
                      points={s.history.map((p, i) => {
                        const min = Math.min(...s.history);
                        const max = Math.max(...s.history);
                        const range = max - min || 1;
                        const x = (i / (s.history.length - 1 || 1)) * 60;
                        const y = 28 - ((p - min) / range) * 24 - 2;
                        return `${x},${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke={chg >= 0 ? "#22c55e" : "#ef4444"}
                      strokeWidth="1.5"
                    />
                  </svg>
                  <div style={{ textAlign: "right", minWidth: 70 }}>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>${s.price.toFixed(1)}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: chg >= 0 ? "#16a34a" : "#dc2626" }}>
                      {chg >= 0 ? "▲" : "▼"} {Math.abs(chg).toFixed(1)}%
                    </div>
                    {own > 0 && <div style={{ fontSize: 10, color: "var(--indigo-700)", fontWeight: 700, marginTop: 2 }}>持有 {own}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trade panel + news */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="block" style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>💱 交易 Trade</h3>
            <div style={{ background: "var(--bg-1)", padding: 12, borderRadius: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "var(--fg-3)", fontWeight: 600 }}>選中</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 28 }}>{sel.emoji}</span>
                <div>
                  <div style={{ fontWeight: 800 }}>{sel.name}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "var(--indigo-700)" }}>${sel.price.toFixed(2)}</div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: "var(--fg-2)" }}>數量 Quantity</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button className="btn btn-ghost" style={{ padding: "6px 10px" }} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <input type="number" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))}
                  style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1.5px solid var(--border-1)", textAlign: "center", fontWeight: 700, fontFamily: "inherit" }}/>
                <button className="btn btn-ghost" style={{ padding: "6px 10px" }} onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <div style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 6, textAlign: "center" }}>總價 Total: <strong style={{ color: "var(--ink-warm)" }}>${cost.toFixed(0)}</strong></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button className="btn btn-success" onClick={buy} disabled={cost > cash}
                style={{ justifyContent: "center", opacity: cost > cash ? 0.4 : 1, cursor: cost > cash ? "not-allowed" : "pointer" }}>
                買入 Buy
              </button>
              <button className="btn btn-danger" onClick={sell} disabled={qty > owned}
                style={{ justifyContent: "center", opacity: qty > owned ? 0.4 : 1, cursor: qty > owned ? "not-allowed" : "pointer" }}>
                賣出 Sell
              </button>
            </div>
            {cost > cash && <div style={{ fontSize: 11, color: "#dc2626", marginTop: 6, textAlign: "center" }}>現金不夠！</div>}
          </div>

          <div className="block" style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>📰 今日新聞 News</h3>
            {news.length === 0 && <div style={{ fontSize: 13, color: "var(--fg-3)", textAlign: "center", padding: 20 }}>還沒有新聞，按「下一天」開始～</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 240, overflowY: "auto" }}>
              {news.map((n, i) => (
                <div key={i} style={{ background: i === 0 ? "#fef3c7" : "var(--bg-1)", padding: 10, borderRadius: 10, fontSize: 12 }}>
                  <div style={{ fontSize: 10, color: "var(--fg-3)", fontWeight: 700, marginBottom: 2 }}>第 {n.day} 天</div>
                  {n.items.map((it, j) => <div key={j} style={{ marginTop: 2, lineHeight: 1.5 }}>{it.txt}</div>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bubble-row" style={{ marginTop: 20 }}>
        <div className="bubble-avatar sheep"><Sheep size={56} mood="teach"/><span className="bubble-avatar-name">小羊老師</span></div>
        <div className="bubble sheep">
          <strong>記得：這是模擬！真實的股票市場更複雜也有真正的風險。</strong>不要把所有錢放一檔（叫做「分散投資」），也不要追漲殺跌。慢慢學～
          <span className="en">Don't put all eggs in one basket. Diversify and stay calm!</span>
        </div>
      </div>
    </div>
  );
};

// ---------- Need vs Want ----------
const NeedWant = () => {
  const ITEMS = [
    { id: 1, e: "🍚", n: "白飯", a: "need" },
    { id: 2, e: "🎮", n: "新遊戲", a: "want" },
    { id: 3, e: "👕", n: "上學的衣服", a: "need" },
    { id: 4, e: "🍭", n: "糖果", a: "want" },
    { id: 5, e: "🏠", n: "住的地方", a: "need" },
    { id: 6, e: "🧸", n: "新玩偶", a: "want" },
    { id: 7, e: "💧", n: "乾淨的水", a: "need" },
    { id: 8, e: "🎬", n: "看電影", a: "want" },
  ];
  const [picks, setPicks] = React.useState({}); // id -> 'need'/'want'
  const correct = ITEMS.filter(it => picks[it.id] === it.a).length;
  const done = Object.keys(picks).length === ITEMS.length;

  return (
    <div className="block">
      <h2>🤔 需要 vs 想要 <span className="en">Needs vs Wants</span></h2>
      <p>把每個東西分類：是「<strong>需要</strong>」(沒有不行) 還是「<strong>想要</strong>」(有了會開心)？<span className="en">Tap each item: do you NEED it, or just WANT it?</span></p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, margin: "16px 0" }}>
        {ITEMS.map(it => {
          const picked = picks[it.id];
          const isCorrect = picked === it.a;
          return (
            <div key={it.id} style={{
              background: picked ? (isCorrect ? "#dcfce7" : "#fee2e2") : "white",
              border: picked ? `2px solid ${isCorrect ? "#22c55e" : "#ef4444"}` : "2px solid var(--border-1)",
              borderRadius: 14, padding: 12, textAlign: "center"
            }}>
              <div style={{ fontSize: 36 }}>{it.e}</div>
              <div style={{ fontSize: 13, fontWeight: 700, margin: "4px 0 8px" }}>{it.n}</div>
              <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                <button onClick={() => setPicks(p => ({ ...p, [it.id]: "need" }))}
                  style={{ flex: 1, padding: "4px 6px", fontSize: 11, fontWeight: 700, borderRadius: 8, border: "none", cursor: "pointer",
                    background: picked === "need" ? (it.a === "need" ? "#22c55e" : "#ef4444") : "#dbeafe",
                    color: picked === "need" ? "white" : "#1e40af",
                    fontFamily: "inherit"
                  }}>需要</button>
                <button onClick={() => setPicks(p => ({ ...p, [it.id]: "want" }))}
                  style={{ flex: 1, padding: "4px 6px", fontSize: 11, fontWeight: 700, borderRadius: 8, border: "none", cursor: "pointer",
                    background: picked === "want" ? (it.a === "want" ? "#22c55e" : "#ef4444") : "#fce7f3",
                    color: picked === "want" ? "white" : "#9d174d",
                    fontFamily: "inherit"
                  }}>想要</button>
              </div>
            </div>
          );
        })}
      </div>

      {done && (
        <div style={{ background: correct === ITEMS.length ? "#dcfce7" : "#fef3c7", padding: 16, borderRadius: 12, textAlign: "center" }}>
          <div style={{ fontSize: 32 }}>{correct === ITEMS.length ? "🎉" : "💪"}</div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>答對 {correct} / {ITEMS.length}</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>
            {correct === ITEMS.length ? "完美！你完全懂需要與想要的差別～" : "再想想看，需要的東西是「沒有就活不下去」的喔～"}
          </div>
          <button className="btn btn-ghost" style={{ marginTop: 8 }} onClick={() => setPicks({})}>重新分類</button>
        </div>
      )}
    </div>
  );
};

// ---------- Company Picker Quiz ----------
const CompanyPicker = () => {
  const Q = [
    { id: 1, q: "下面哪個聽起來是比較穩定的公司？", a: [
      { t: "🏪 開了 50 年的麵包店，每天都有客人", correct: true, why: "穩定生意 = 收入可預測" },
      { t: "🎮 三天前才開的線上遊戲公司，沒收入但很多人玩", correct: false, why: "新公司風險很大" },
    ]},
    { id: 2, q: "颱風來了，下面哪家公司可能受影響？", a: [
      { t: "🌾 賣米的公司（米要從田裡收）", correct: true, why: "颱風會淹掉稻田" },
      { t: "💻 賣軟體的公司（東西在網路上）", correct: false, why: "網路上的東西不怕颱風" },
    ]},
    { id: 3, q: "假如全世界突然喜歡某種運動鞋，這家公司...", a: [
      { t: "📈 業績可能會大成長", correct: true, why: "需求變高 → 賣更多 → 賺更多" },
      { t: "📉 業績一定不會變", correct: false, why: "流行會直接影響銷量" },
    ]},
  ];
  const [step, setStep] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const cur = Q[step];
  const done = step >= Q.length;

  const choose = (i) => {
    setPicked(i);
    if (cur.a[i].correct) setScore(s => s + 1);
  };
  const next = () => {
    setPicked(null);
    setStep(s => s + 1);
  };

  if (done) {
    return (
      <div className="block success" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 64 }}>{score === Q.length ? "🏆" : score >= 2 ? "🥈" : "📚"}</div>
        <h2 style={{ justifyContent: "center" }}>答對 {score} / {Q.length} 題！</h2>
        <p>{score === Q.length ? "你已經有看公司的眼光了！" : "再讀一次前面的章節，再來挑戰！"}</p>
        <button className="btn btn-primary" onClick={() => { setStep(0); setScore(0); setPicked(null); }}>🔄 再玩一次</button>
      </div>
    );
  }

  return (
    <div className="block">
      <h2>🎯 你會選哪家公司？ <span className="en">Pick a Company</span></h2>
      <div style={{ fontSize: 12, color: "var(--fg-3)", fontWeight: 700 }}>第 {step + 1} / {Q.length} 題</div>
      <div style={{ fontSize: 18, fontWeight: 700, margin: "12px 0 16px", color: "var(--ink-warm)" }}>{cur.q}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {cur.a.map((opt, i) => {
          const showResult = picked !== null;
          const isPicked = picked === i;
          const bg = !showResult ? "white" : (opt.correct ? "#dcfce7" : isPicked ? "#fee2e2" : "white");
          const bd = !showResult ? "var(--border-1)" : (opt.correct ? "#22c55e" : isPicked ? "#ef4444" : "var(--border-1)");
          return (
            <button key={i} onClick={() => !showResult && choose(i)} disabled={showResult}
              style={{ background: bg, border: `2px solid ${bd}`, borderRadius: 14, padding: 16, fontSize: 15, fontWeight: 600,
                color: "var(--ink-warm)", cursor: showResult ? "default" : "pointer", textAlign: "left", fontFamily: "inherit", lineHeight: 1.4
              }}>
              {opt.t}
              {showResult && (
                <div style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 8, fontWeight: 500 }}>
                  {opt.correct ? "✅ " : "❌ "}{opt.why}
                </div>
              )}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={next}>下一題 →</button>
      )}
    </div>
  );
};

// ---------- Final Quiz ----------
const FinalQuiz = () => {
  const Q = [
    { q: "錢最早是用來解決什麼問題？", opts: ["以物易物太不方便", "讓人覺得有錢", "讓銀行賺錢"], ans: 0 },
    { q: "下面哪個是「需要」？", opts: ["新球鞋", "白飯", "電動"], ans: 1 },
    { q: "通貨膨脹的意思是？", opts: ["錢變多了", "東西變便宜", "錢的購買力變小"], ans: 2 },
    { q: "如果一家公司的東西大家都搶著買（需求大）會怎樣？", opts: ["價格通常會上升", "價格會降到 0", "公司會倒閉"], ans: 0 },
    { q: "投資股票最重要的觀念是？", opts: ["把所有錢買一檔最熱門的", "分散投資、長期持有", "每天買賣賺差價"], ans: 1 },
    { q: "什麼是複利？", opts: ["利息再生利息", "銀行送的禮物", "賠錢的意思"], ans: 0 },
  ];
  const [answers, setAnswers] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const score = Q.filter((q, i) => answers[i] === q.ans).length;

  return (
    <div className="block">
      <h2>📝 理財小測驗 <span className="en">Final Quiz</span></h2>
      <p>來檢查一下你學了多少！<span className="en">Test what you've learned!</span></p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {Q.map((q, i) => (
          <div key={i} style={{ background: "var(--bg-1)", padding: 14, borderRadius: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}><span style={{ color: "var(--indigo)" }}>Q{i + 1}.</span> {q.q}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {q.opts.map((o, j) => {
                const picked = answers[i] === j;
                const correct = submitted && j === q.ans;
                const wrong = submitted && picked && j !== q.ans;
                return (
                  <label key={j} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                    background: correct ? "#dcfce7" : wrong ? "#fee2e2" : picked ? "#eef2ff" : "white",
                    border: `1.5px solid ${correct ? "#22c55e" : wrong ? "#ef4444" : picked ? "var(--indigo)" : "var(--border-1)"}`,
                    fontSize: 14
                  }}>
                    <input type="radio" name={`q${i}`} checked={picked} onChange={() => !submitted && setAnswers(a => ({ ...a, [i]: j }))} disabled={submitted} style={{ accentColor: "var(--indigo)" }}/>
                    {o}
                    {correct && <span style={{ marginLeft: "auto", color: "#16a34a", fontWeight: 700, fontSize: 12 }}>✓ 正確</span>}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {!submitted ? (
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < Q.length}>
          交卷 Submit ({Object.keys(answers).length}/{Q.length})
        </button>
      ) : (
        <div style={{ marginTop: 16, padding: 16, background: score === Q.length ? "#dcfce7" : "#fef3c7", borderRadius: 12, textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>{score === Q.length ? "🏆" : score >= 4 ? "🌟" : "💪"}</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{score} / {Q.length}</div>
          <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 4 }}>
            {score === Q.length ? "完美！你是小小理財達人～" : score >= 4 ? "很棒！再複習錯的章節～" : "別擔心，再讀一次前面，你一定可以！"}
          </div>
          <button className="btn btn-ghost" style={{ marginTop: 12 }} onClick={() => { setAnswers({}); setSubmitted(false); }}>再做一次</button>
        </div>
      )}
    </div>
  );
};

window.StockSim = StockSim;
window.NeedWant = NeedWant;
window.CompanyPicker = CompanyPicker;
window.FinalQuiz = FinalQuiz;
