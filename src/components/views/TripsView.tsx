import { TRIPS } from "~/data/content";
import { TripCard } from "../TripCard";
import { SectionHeader, btnGhost } from "../SectionHeader";

export function TripsView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <SectionHeader
        kicker="Trip Manuals"
        title="行程手冊"
        sub="完成的雙語行程整理，每份附 Key Phrase。點開可查當日完整單字 + 路線 + 換乘指示。"
        action={
          <button style={{ ...btnGhost(), opacity: 0.6, cursor: "not-allowed" }} disabled>
            + 新增行程
          </button>
        }
      />
      <div
        className="grid-3"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
      >
        {TRIPS.map((t) => (
          <TripCard key={t.id} trip={t} />
        ))}
      </div>

      <div
        className="tc"
        style={{
          marginTop: 16,
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: 14,
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>
            已完成 2 / 計畫 1 · 還差 1 份就達成 22 天目標
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            目標：3 份 1 日行程中英對照版（Day 22 交付）
          </div>
        </div>
        <button
          disabled
          style={{
            background: "var(--blue)",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "inherit",
            opacity: 0.6,
            cursor: "not-allowed",
          }}
        >
          匯出口袋書 PDF
        </button>
      </div>
    </div>
  );
}
