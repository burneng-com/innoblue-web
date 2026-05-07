import type { Progress } from "~/data/content";

export function ProgressBar({ progress }: { progress: Progress }) {
  const pct = Math.round((progress.currentDay / progress.totalDays) * 100);
  return (
    <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div className="tc" style={{ fontSize: 13, fontWeight: 600 }}>22 天挑戰進度</div>
        <div className="mono" style={{ fontSize: 12, color: "var(--blue)", fontWeight: 600 }}>
          Day {progress.currentDay} · {pct}%
        </div>
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: progress.totalDays }).map((_, i) => {
          const done = i < progress.currentDay;
          const today = i + 1 === progress.currentDay;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: 8,
                borderRadius: 3,
                background: done ? "var(--blue)" : "#E4E7EE",
                outline: today ? "2px solid var(--ink)" : "none",
                outlineOffset: 2,
                transition: "all .3s",
              }}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11, color: "var(--muted)" }}>
        <span>Day 1 · Mission</span>
        <span>Day 22 · 結業 ✈︎</span>
      </div>
    </div>
  );
}
