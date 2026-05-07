import { TODAY_WORDS, PROGRESS, DAILY_QUOTES } from "~/data/content";
import { Flashcard } from "../Flashcard";
import { ProgressBar } from "../ProgressBar";
import { SectionHeader, btnGhost } from "../SectionHeader";
import { Tag } from "../Tag";

export function HomeView() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "2-digit", weekday: "short" });
  const quote = DAILY_QUOTES[today.getDate() % DAILY_QUOTES.length];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      {/* HERO */}
      <section
        className="hero-grid"
        style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "stretch" }}
      >
        <div
          className="paper-tex"
          style={{
            borderRadius: "var(--radius-lg)",
            padding: 48,
            border: "1px solid var(--line)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 380,
          }}
        >
          <div style={{ position: "absolute", top: 32, right: 32, color: "var(--red)" }}>
            <span className="stamp tc">{`Day ${PROGRESS.currentDay} / 22`}</span>
          </div>

          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: ".2em",
                color: "var(--blue)",
                textTransform: "uppercase",
              }}
            >
              {dateStr} · 今日 Today
            </div>
            <h1
              className="serif"
              style={{
                margin: "16px 0 0",
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                color: "var(--ink)",
                maxWidth: 580,
              }}
            >
              旅遊英文，
              <br />
              一天 5 個字 · 一句話。
            </h1>
            <p
              className="tc"
              style={{
                margin: "16px 0 0",
                fontSize: 16,
                color: "var(--muted)",
                maxWidth: 480,
                lineHeight: 1.6,
              }}
            >
              22 天累積一份能直接出發的口袋書。今天的單字＋情境短句已經幫你準備好了 — 點卡片翻面、按喇叭聽發音。
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              style={{
                background: "var(--ink)",
                color: "#fff",
                border: "none",
                padding: "13px 22px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              開始今日 5 個字 →
            </button>
            <button
              style={{
                background: "#fff",
                color: "var(--ink)",
                border: "1px solid var(--line)",
                padding: "13px 22px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              練一輪情境
            </button>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div
            className="mono"
            style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".15em", marginBottom: 12 }}
          >
            ★ FEATURED CARD
          </div>
          <Flashcard word={TODAY_WORDS[0]} big />
        </div>
      </section>

      <ProgressBar progress={PROGRESS} />

      <section>
        <SectionHeader
          kicker="Today's 5"
          title="今日 5 個旅遊單字"
          sub="點卡片翻面看中文與例句。每天早上 8:00 自動換新（依個人化情境輪流出題）。"
          action={<button style={btnGhost()}>查看完整單字庫 →</button>}
        />
        <div className="grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {TODAY_WORDS.map((w, i) => (
            <Flashcard key={i} word={w} />
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="hero-grid">
        <div
          style={{
            background: "var(--ink)",
            color: "#F7F5EF",
            borderRadius: "var(--radius-lg)",
            padding: 40,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="serif"
            style={{
              fontSize: 88,
              color: "rgba(247,245,239,0.2)",
              lineHeight: 0.6,
              position: "absolute",
              top: 24,
              left: 24,
            }}
          >
            "
          </div>
          <div
            className="serif"
            style={{
              fontSize: 22,
              lineHeight: 1.5,
              marginTop: 28,
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >
            {quote.en}
          </div>
          <div
            className="mono"
            style={{ fontSize: 12, marginTop: 18, color: "#7DB3FF", letterSpacing: ".1em" }}
          >
            — {quote.who}
          </div>
        </div>

        <div
          style={{
            background: "var(--khaki-soft)",
            borderRadius: "var(--radius-lg)",
            padding: 32,
            border: "1px solid var(--khaki)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Tag color="khaki" filled>
            This Week's Focus
          </Tag>
          <h3
            className="serif"
            style={{
              fontSize: 28,
              margin: "12px 0 6px",
              letterSpacing: "-0.015em",
              fontWeight: 600,
            }}
          >
            Chicago · 雙線轉乘
          </h3>
          <p className="tc" style={{ fontSize: 14, color: "#5C4A2A", lineHeight: 1.6, margin: 0 }}>
            這週主場景：地鐵 Blue Line ↔ Red Line 轉乘 + Chinatown Hotel check-in。 已收錄 18 句實戰短句。
          </p>
          <div
            style={{
              position: "absolute",
              right: -20,
              bottom: -20,
              fontSize: 140,
              opacity: 0.15,
              lineHeight: 1,
            }}
          >
            ✈︎
          </div>
        </div>
      </section>
    </div>
  );
}
