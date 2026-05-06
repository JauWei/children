/* ============================================================
   Lesson content blocks
   ============================================================ */

// 0. Home page
const Home = ({ go }) => {
  const [theme, setTheme] = React.useState("warm");
  const themes = {
    warm: { bg: "linear-gradient(135deg, #fff1e6 0%, #ffe4cc 50%, #ffd0bd 100%)", accent: "#f97316", emoji: "🌅" },
    sky:  { bg: "linear-gradient(135deg, #eef4ff 0%, #ddeeff 50%, #c8e0ff 100%)", accent: "#3b82f6", emoji: "☁️" },
    candy:{ bg: "linear-gradient(135deg, #f5f3ff 0%, #fce7f3 50%, #ffeef4 100%)", accent: "#ec4899", emoji: "🍭" },
  };
  const t = themes[theme];

  const chapters = [
    { id: "ch1", n: "01", e: "💰", t: "錢是什麼？", en: "What is Money?" },
    { id: "ch2", n: "02", e: "🤔", t: "需要 vs 想要", en: "Needs vs Wants" },
    { id: "ch3", n: "03", e: "🐷", t: "存錢與儲蓄", en: "Saving" },
    { id: "ch4", n: "04", e: "🍋", t: "供需與價格", en: "Supply & Demand" },
    { id: "ch5", n: "05", e: "🕰️", t: "通貨膨脹", en: "Inflation" },
    { id: "ch6", n: "06", e: "🏢", t: "公司與股票", en: "Companies & Stocks" },
    { id: "ch7", n: "07", e: "🎲", t: "風險與分散", en: "Risk & Diversify" },
    { id: "ch8", n: "08", e: "✨", t: "複利的魔法", en: "Compound Magic" },
    { id: "ch9", n: "09", e: "📈", t: "股票模擬", en: "Stock Simulator" },
    { id: "ch10", n: "10", e: "🏆", t: "理財小測驗", en: "Final Quiz" },
  ];

  return (
    <div style={{ background: t.bg, borderRadius: 24, padding: "40px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
      {/* floating coins */}
      <div style={{ position: "absolute", top: 30, right: 40, animation: "bob 3s ease-in-out infinite" }}><Coin size={48}/></div>
      <div style={{ position: "absolute", top: 80, right: 100, animation: "bob 4s ease-in-out infinite" }}><Coin size={32}/></div>
      <div style={{ position: "absolute", bottom: 30, left: 40, animation: "bob 3.5s ease-in-out infinite" }}>
        <span style={{ fontSize: 36 }}>{t.emoji}</span>
      </div>
      <div style={{ position: "absolute", top: 50, left: "50%", animation: "sparkle 2s ease-in-out infinite", fontSize: 20 }}>✨</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, justifyContent: "flex-end" }}>
        {Object.keys(themes).map(k => (
          <button key={k} onClick={() => setTheme(k)}
            style={{
              width: 32, height: 32, borderRadius: 999, border: theme === k ? "3px solid white" : "2px solid rgba(255,255,255,0.5)",
              boxShadow: theme === k ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
              background: themes[k].bg, cursor: "pointer"
            }} title={k}/>
        ))}
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ animation: "bob 3s ease-in-out infinite" }}>
          <Sheep size={140} mood="teach"/>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: "inline-block", background: "white", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: t.accent, marginBottom: 8 }}>
            ✨ 給 8-15 歲的小朋友 · For ages 8-15
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.05, color: "var(--ink-warm)" }}>
            兒童<span style={{ background: "var(--brand-grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>投資理財</span>樂園
          </h1>
          <div style={{ fontSize: 18, color: "var(--fg-2)", fontWeight: 500, marginBottom: 4 }}>
            跟著Snoopy老師和動物同學們，一起學會錢的祕密！
          </div>
          <div style={{ fontSize: 14, color: "var(--fg-3)", fontFamily: "var(--font-latin)", fontStyle: "italic", marginBottom: 20 }}>
            Learn money, economics & investing — with Sheep Sensei 🐑
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" onClick={() => go("ch1")}>🚀 開始上課</button>
            <button className="btn btn-ghost" onClick={() => go("ch9")}>📈 直接玩股票模擬</button>
          </div>
        </div>
      </div>

      {/* characters lineup */}
      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
        {[
          { C: Sheep, name: "Snoopy老師", role: "教你經濟學", color: "#f5f3ff" },
          { C: Rabbit, name: "龍龍", role: "問問題的同學", color: "#ffeef4" },
          { C: Panda, name: "帕洽狗", role: "愛存錢", color: "#f3f4f6" },
          { C: Fox, name: "大耳狗", role: "賣檸檬汁", color: "#fff7ed" },
          { C: Lizard, name: "企企", role: "悄悄話夥伴", color: "#ecfeff" },
        ].map((c, i) => (
          <div key={i} style={{ textAlign: "center", animation: `fadeUp 0.4s ease-out ${i * 0.1}s backwards` }}>
            <div style={{ background: c.color, padding: 8, borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
              <c.C size={64} mood="happy"/>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6, color: "var(--ink-warm)" }}>{c.name}</div>
            <div style={{ fontSize: 10, color: "var(--fg-3)" }}>{c.role}</div>
          </div>
        ))}
      </div>

      {/* chapter grid */}
      <h3 style={{ fontSize: 18, fontWeight: 800, marginTop: 32, marginBottom: 12, color: "var(--ink-warm)" }}>📚 課程大綱 Curriculum</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
        {chapters.map((c, i) => (
          <button key={c.id} onClick={() => go(c.id)}
            style={{
              background: "white", border: "1.5px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: 14, textAlign: "left",
              cursor: "pointer", transition: "all 0.18s", fontFamily: "inherit",
              animation: `fadeUp 0.4s ease-out ${i * 0.04}s backwards`
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 28 }}>{c.e}</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: "var(--fg-4)", letterSpacing: "0.05em" }}>CH {c.n}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink-warm)" }}>{c.t}</div>
            <div style={{ fontSize: 10, color: "var(--fg-3)", fontStyle: "italic", fontFamily: "var(--font-latin)" }}>{c.en}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Chapter 1: What is money
const Ch1 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第一章 · Chapter 1</div>
    <h1 className="lesson-title">💰 錢是什麼？</h1>
    <div className="lesson-title-en">What is Money?</div>
    <p className="lesson-intro">很久很久以前，世界上其實沒有「錢」。大家想要東西，就用<strong>交換</strong>的～<span style={{ display: "block", fontSize: 14, color: "var(--fg-3)", fontStyle: "italic", marginTop: 4, fontFamily: "var(--font-latin)" }}>Long ago, there was no money — people just traded things.</span></p>

    <Illus name="ch1-hero" icon="🥕↔️🧀" desc="龍龍拿胡蘿蔔想跟Snoopy換起司的場景插畫"/>

    <div className="block story">
      <h2>🥕 故事：以物易物 <span className="en">Barter Story</span></h2>
      <div className="bubble-row">
        <div className="bubble-avatar rabbit"><Rabbit size={56}/><span className="bubble-avatar-name">龍龍</span></div>
        <div className="bubble rabbit">我有 10 根胡蘿蔔，想換一塊起司～<span className="en">I have carrots, I want cheese!</span></div>
      </div>
      <div className="bubble-row reverse">
        <div className="bubble-avatar sheep"><Sheep size={56}/><span className="bubble-avatar-name">Snoopy</span></div>
        <div className="bubble sheep">我不想要胡蘿蔔耶...我想要蘋果 🍎<span className="en">But I don't want carrots, I want apples.</span></div>
      </div>
      <div className="bubble-row">
        <div className="bubble-avatar rabbit"><Rabbit size={56}/></div>
        <div className="bubble rabbit">😭 那怎麼辦...我要先去找有蘋果又想要胡蘿蔔的人？</div>
      </div>
      <p style={{ marginTop: 16 }}>↑ 看到問題了嗎？這就是<strong>以物易物</strong>麻煩的地方。</p>
    </div>

    <div className="block tip">
      <h2>💡 錢的三大功能 <span className="en">Three Jobs of Money</span></h2>
      <div className="stat-grid">
        <div className="stat-card"><span className="emoji">🔄</span><div className="label">交換工具</div><div className="value" style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-2)" }}>不用湊「剛好對方想要」的東西</div></div>
        <div className="stat-card"><span className="emoji">📏</span><div className="label">衡量價值</div><div className="value" style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-2)" }}>一支冰淇淋 = 30元，一目瞭然</div></div>
        <div className="stat-card"><span className="emoji">🏦</span><div className="label">儲存價值</div><div className="value" style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-2)" }}>蘋果會爛掉，但錢可以存著</div></div>
      </div>
    </div>

    <div className="block">
      <h2>📜 錢的演化 <span className="en">Evolution of Money</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginTop: 12 }}>
        {[
          { e: "🐚", n: "貝殼", y: "古代" },
          { e: "🪙", n: "金幣銀幣", y: "古代王國" },
          { e: "💵", n: "紙鈔", y: "近代" },
          { e: "💳", n: "信用卡", y: "20 世紀" },
          { e: "📱", n: "電子支付", y: "現在" },
          { e: "₿", n: "加密貨幣", y: "未來？" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: 12, background: "var(--bg-1)", borderRadius: 12 }}>
            <div style={{ fontSize: 36 }}>{s.e}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>{s.n}</div>
            <div style={{ fontSize: 11, color: "var(--fg-3)" }}>{s.y}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Ch2 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第二章 · Chapter 2</div>
    <h1 className="lesson-title">🤔 需要 vs 想要</h1>
    <div className="lesson-title-en">Needs vs Wants</div>
    <p className="lesson-intro">每天我們都會想買東西。但是哪些是<strong>真的需要</strong>，哪些只是<strong>想要</strong>呢？分清楚這兩個，就是理財的第一步！</p>

    <Illus name="ch2-hero" icon="🥦 vs 🍰" desc="小朋友站在兩條岔路前，一邊是必需品（白飯、書包），一邊是想要的東西（玩具、糖果）"/>

    <div className="block">
      <h2>🥦 需要 vs 🍰 想要</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
        <div style={{ background: "#dbeafe", padding: 16, borderRadius: 16 }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🥦</div>
          <div style={{ fontWeight: 800, color: "#1e40af", marginBottom: 6 }}>需要 Needs</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.6 }}>沒有不行的東西<br/>食物、衣服、住的地方、看醫生</div>
        </div>
        <div style={{ background: "#fce7f3", padding: 16, borderRadius: 16 }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🍰</div>
          <div style={{ fontWeight: 800, color: "#9d174d", marginBottom: 6 }}>想要 Wants</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.6 }}>有了會開心的東西<br/>玩具、零食、新球鞋、看電影</div>
        </div>
      </div>
      <div className="bubble-row" style={{ marginTop: 16 }}>
        <div className="bubble-avatar panda"><Panda size={56}/><span className="bubble-avatar-name">帕洽狗</span></div>
        <div className="bubble panda">那香蕉口味冰淇淋呢？我每天都好想吃...是需要還是想要？🍦</div>
      </div>
      <div className="bubble-row reverse">
        <div className="bubble-avatar sheep"><Sheep size={56} mood="teach"/></div>
        <div className="bubble sheep">哈哈，再愛吃也是想要喔😆 想想看：少了它你會不會生病？不會吧～需要是像<strong>飯、水、睡覺</strong>這種真的少了不行的東西。</div>
      </div>
    </div>

    <NeedWant/>
  </div>
);

const Ch3 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第三章 · Chapter 3</div>
    <h1 className="lesson-title">🐷 存錢與儲蓄</h1>
    <div className="lesson-title-en">Saving Money</div>
    <p className="lesson-intro">把零用錢全部花光，等到真的想買大東西就買不起了。學會<strong>存錢</strong>，未來的你會謝謝現在的你！</p>

    <Illus name="ch3-hero" icon="🐷💰" desc="帕洽狗投硬幣到撲滿的可愛插畫"/>

    <div className="block tip">
      <h2>📦 50 / 30 / 20 法則 <span className="en">The 50/30/20 Rule</span></h2>
      <p>如果你拿到 100 元零用錢，可以這樣分配～</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 12 }}>
        <div style={{ background: "#dbeafe", padding: 16, borderRadius: 14, textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>🥦</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#1e40af" }}>50%</div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>需要</div>
          <div style={{ fontSize: 11, color: "var(--fg-3)" }}>午餐、文具</div>
        </div>
        <div style={{ background: "#fce7f3", padding: 16, borderRadius: 14, textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>🎮</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#9d174d" }}>30%</div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>想要</div>
          <div style={{ fontSize: 11, color: "var(--fg-3)" }}>玩具、零食</div>
        </div>
        <div style={{ background: "#fef3c7", padding: 16, borderRadius: 14, textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>🐷</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#92400e" }}>20%</div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>儲蓄</div>
          <div style={{ fontSize: 11, color: "var(--fg-3)" }}>未來大目標</div>
        </div>
      </div>
    </div>

    <div className="block">
      <h2>🎯 設一個存錢目標 <span className="en">Set a Goal</span></h2>
      <p>有目標的存錢比較不會半途放棄。例如：「我要存 600 元買新的籃球，每週存 50 元，12 週後就有了！」</p>
      <div className="bubble-row">
        <div className="bubble-avatar rabbit"><Rabbit size={56}/></div>
        <div className="bubble rabbit">我想存錢買漂亮的耳機...好難喔，看到糖果就想花掉 😭</div>
      </div>
      <div className="bubble-row reverse">
        <div className="bubble-avatar sheep"><Sheep size={56} mood="teach"/></div>
        <div className="bubble sheep">把錢分成兩個撲滿：<strong>「日常」</strong>和<strong>「大目標」</strong>。看不到的錢比較不會花喔～</div>
      </div>
    </div>
  </div>
);

const Ch4 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第四章 · Chapter 4</div>
    <h1 className="lesson-title">🍋 供需與價格</h1>
    <div className="lesson-title-en">Supply & Demand</div>
    <p className="lesson-intro">為什麼有的東西很貴，有的很便宜？答案藏在「<strong>有多少人想要</strong>」和「<strong>有多少貨</strong>」裡面～</p>

    <Illus name="ch4-hero" icon="🍋📈📉" desc="狐狸的檸檬汁攤前排了長長的隊伍，價格牌正在被改寫"/>

    <div className="block">
      <h2>📈 兩條看不見的線</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#dcfce7", padding: 16, borderRadius: 14 }}>
          <div style={{ fontSize: 28 }}>🙋‍♀️</div>
          <div style={{ fontWeight: 800, color: "#166534", marginTop: 4 }}>需求 Demand</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4, lineHeight: 1.6 }}>越貴 → 越少人想買<br/>越便宜 → 越多人想買</div>
        </div>
        <div style={{ background: "#dbeafe", padding: 16, borderRadius: 14 }}>
          <div style={{ fontSize: 28 }}>🏭</div>
          <div style={{ fontWeight: 800, color: "#1e40af", marginTop: 4 }}>供給 Supply</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4, lineHeight: 1.6 }}>越貴 → 廠商越想做更多<br/>越便宜 → 廠商不想做</div>
        </div>
      </div>
      <p style={{ marginTop: 14 }}>兩條線交叉的地方，就是「<strong>剛剛好的價格</strong>」💫</p>
    </div>

    <SupplyDemand/>

    <div className="block warn">
      <h2>🌶️ 真實生活的例子</h2>
      <ul>
        <li><strong>颱風前的青菜</strong> — 大家搶買（需求高）+ 田被淹（供給少）→ <strong>變很貴</strong></li>
        <li><strong>過季的草莓</strong> — 不流行了（需求低）+ 還很多（供給多）→ <strong>變便宜</strong></li>
        <li><strong>限量球鞋</strong> — 超多人搶（需求高）+ 只做 100 雙（供給少）→ <strong>炒到很貴</strong></li>
      </ul>
    </div>
  </div>
);

const Ch5 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第五章 · Chapter 5</div>
    <h1 className="lesson-title">🕰️ 通貨膨脹</h1>
    <div className="lesson-title-en">Inflation</div>
    <p className="lesson-intro">阿公小時候 5 元可以吃一碗麵...現在 5 元連一個茶葉蛋都不夠！為什麼錢會越來越「不值錢」？</p>

    <Illus name="ch5-hero" icon="🕰️💵" desc="時光機插畫：左邊老爺爺拿 5 元買一碗麵，右邊小孩拿 5 元站在便利商店前面困惑"/>

    <TimeMachine/>

    <div className="block tip">
      <h2>🤷 為什麼會通貨膨脹？</h2>
      <ul>
        <li><strong>錢變多了</strong> — 政府印更多鈔票，每張就比較沒價值</li>
        <li><strong>東西變少</strong> — 戰爭、疫情讓工廠停工，東西變稀有</li>
        <li><strong>大家賺更多</strong> — 大家都變有錢，店家就敢漲價</li>
      </ul>
    </div>

    <div className="block warn">
      <h2>💡 怎麼對抗通膨？</h2>
      <p>把錢放在床底下，每年都會「悄悄縮水」。所以大人們會：</p>
      <ul>
        <li>🏦 存銀行（賺利息，但常常追不上通膨）</li>
        <li>📈 買股票或基金（風險較高，但長期可能跑贏通膨）</li>
        <li>🏠 買房子或黃金（保值的東西）</li>
      </ul>
    </div>
  </div>
);

const Ch6 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第六章 · Chapter 6</div>
    <h1 className="lesson-title">🏢 公司與股票</h1>
    <div className="lesson-title-en">Companies & Stocks</div>
    <p className="lesson-intro">想像你開了一家「<strong>Snoopy起司店</strong>」，生意太好需要更多錢買新機器...怎麼辦？答案就是「<strong>股票</strong>」！</p>

    <Illus name="ch6-hero" icon="🏢🥧" desc="Snoopy起司店被切成 100 片像派一樣，每位股東拿著自己的那一片"/>

    <div className="block story">
      <h2>📖 故事：Snoopy起司店要長大</h2>
      <div className="bubble-row">
        <div className="bubble-avatar sheep"><Sheep size={56}/></div>
        <div className="bubble sheep">我的起司超好吃！但只有一個小店，買不起大機器做更多～</div>
      </div>
      <div className="bubble-row reverse">
        <div className="bubble-avatar fox"><Fox size={56}/></div>
        <div className="bubble fox">那把店分成 100 份「股票」，每份賣 100 元，這樣就有 10,000 元了！</div>
      </div>
      <div className="bubble-row">
        <div className="bubble-avatar panda"><Panda size={56}/></div>
        <div className="bubble panda">我買 5 份！這樣我就是「<strong>股東</strong>」之一囉？</div>
      </div>
      <div className="bubble-row reverse">
        <div className="bubble-avatar sheep"><Sheep size={56} mood="teach"/></div>
        <div className="bubble sheep">沒錯～你擁有 <strong>5%</strong> 的店！店賺錢，你也會分到 5% 的利潤（股息）。店變值錢，你的股票也變貴 💰</div>
      </div>
    </div>

    <div className="block tip">
      <h2>🔑 重要名詞 <span className="en">Key Words</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {[
          { w: "股票 Stock", d: "公司的一小份所有權" },
          { w: "股東 Shareholder", d: "擁有股票的人" },
          { w: "股息 Dividend", d: "公司賺錢分給股東的錢" },
          { w: "股價 Stock Price", d: "一股現在值多少錢，每天都在變" },
          { w: "股市 Stock Market", d: "大家買賣股票的地方（像市場）" },
          { w: "上市 IPO", d: "公司第一次把股票賣給大眾" },
        ].map((x, i) => (
          <div key={i} style={{ background: "white", padding: 12, borderRadius: 12, border: "1px solid #fde68a" }}>
            <div style={{ fontWeight: 800, color: "var(--ink-warm)" }}>{x.w}</div>
            <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>{x.d}</div>
          </div>
        ))}
      </div>
    </div>

    <CompanyPicker/>
  </div>
);

const Ch7 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第七章 · Chapter 7</div>
    <h1 className="lesson-title">🎲 風險與分散投資</h1>
    <div className="lesson-title-en">Risk & Diversification</div>
    <p className="lesson-intro">投資<strong>有可能</strong>讓錢變多，也<strong>有可能</strong>讓錢變少。這就是「風險」。聰明的人怎麼降低風險？</p>

    <Illus name="ch7-hero" icon="🥚🧺" desc="兩隻小動物提籃子：一個全部蛋放一籃跌倒全破，另一個分散在多個籃子"/>

    <div className="block warn">
      <h2>🥚 不要把所有蛋放在同一個籃子</h2>
      <p>如果你帶 10 顆蛋出門...全放一個籃子，跌倒了 → 全破！分到 5 個籃子 → 最多破一籃。</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
        <div style={{ background: "#fee2e2", padding: 16, borderRadius: 14, textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>🧺💥</div>
          <div style={{ fontWeight: 800, color: "#991b1b", marginTop: 6 }}>全押一檔</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)" }}>那家公司倒了 → 你全沒了</div>
        </div>
        <div style={{ background: "#dcfce7", padding: 16, borderRadius: 14, textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>🧺🧺🧺</div>
          <div style={{ fontWeight: 800, color: "#166534", marginTop: 6 }}>分散投資</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)" }}>一檔跌了，其他的還在</div>
        </div>
      </div>
    </div>

    <div className="block">
      <h2>📊 風險光譜 <span className="en">Risk Spectrum</span></h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
        {[
          { level: "低", color: "#22c55e", e: "🏦", n: "銀行存款", desc: "幾乎不會虧，但賺很少" },
          { level: "中", color: "#3b82f6", e: "📊", n: "債券、基金", desc: "穩穩的小成長" },
          { level: "中高", color: "#f59e0b", e: "📈", n: "股票（大公司）", desc: "可能上下波動" },
          { level: "高", color: "#ef4444", e: "🎢", n: "新創公司、加密貨幣", desc: "可能賺很多也可能歸零" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "white", borderRadius: 12, borderLeft: `4px solid ${r.color}` }}>
            <div style={{ fontSize: 28 }}>{r.e}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{r.n}</div>
              <div style={{ fontSize: 12, color: "var(--fg-3)" }}>{r.desc}</div>
            </div>
            <div style={{ background: r.color, color: "white", padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{r.level}風險</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Ch8 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第八章 · Chapter 8</div>
    <h1 className="lesson-title">✨ 複利的魔法</h1>
    <div className="lesson-title-en">The Magic of Compound Interest</div>
    <p className="lesson-intro">複利就像<strong>滾雪球</strong>～剛開始小小的，但越滾越大、越滾越快！</p>

    <Illus name="ch8-hero" icon="⛄️➡️🏔️" desc="小雪球從山頂滾下，越滾越大變成巨大雪球的插畫"/>

    <PiggyCompound/>

    <div className="block tip">
      <h2>🐢 比較：早開始 vs 晚開始</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#dcfce7", padding: 16, borderRadius: 14 }}>
          <div style={{ fontSize: 28 }}>🐢</div>
          <div style={{ fontWeight: 800, color: "#166534" }}>烏龜（早起步）</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>10 歲開始，每年存 1,000，到 60 歲</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#166534", marginTop: 8 }}>$573,770</div>
          <div style={{ fontSize: 11, color: "var(--fg-3)" }}>(假設年利率 8%)</div>
        </div>
        <div style={{ background: "#fee2e2", padding: 16, borderRadius: 14 }}>
          <div style={{ fontSize: 28 }}>🐰</div>
          <div style={{ fontWeight: 800, color: "#991b1b" }}>兔子（晚起步）</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>30 歲才開始，每年存 1,000，到 60 歲</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#991b1b", marginTop: 8 }}>$113,283</div>
          <div style={{ fontSize: 11, color: "var(--fg-3)" }}>晚 20 年起步，差 5 倍！</div>
        </div>
      </div>
    </div>
  </div>
);

const Ch9 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第九章 · Chapter 9</div>
    <h1 className="lesson-title">📈 股票模擬交易</h1>
    <div className="lesson-title-en">Stock Market Simulator</div>
    <p className="lesson-intro">準備好了嗎？這裡有 <strong>$10,000 虛擬幣</strong>，5 家公司可以買賣。價格會隨時間波動，每天還有新聞影響股價～玩玩看你能不能賺錢！</p>

    <StockSim/>
  </div>
);

const Ch10 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第十章 · Chapter 10</div>
    <h1 className="lesson-title">🏆 理財小測驗</h1>
    <div className="lesson-title-en">Final Quiz</div>
    <p className="lesson-intro">把前面學的都拿出來吧！加油 💪</p>
    <FinalQuiz/>
  </div>
);

window.Home = Home;
window.Ch1 = Ch1; window.Ch2 = Ch2; window.Ch3 = Ch3; window.Ch4 = Ch4; window.Ch5 = Ch5;
window.Ch6 = Ch6; window.Ch7 = Ch7; window.Ch8 = Ch8; window.Ch9 = Ch9; window.Ch10 = Ch10;
