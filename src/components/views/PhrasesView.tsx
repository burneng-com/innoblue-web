import { useState } from "react";
import { SCENARIOS } from "~/data/content";
import { tone } from "~/lib/colorTokens";
import { ScenarioPanel } from "../ScenarioPanel";
import { SectionHeader } from "../SectionHeader";

export function PhrasesView() {
  const [active, setActive] = useState<string>(SCENARIOS[0].id);
  const scenario = SCENARIOS.find((s) => s.id === active) ?? SCENARIOS[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <SectionHeader
        kicker="Scenario Phrases"
        title="情境短句"
        sub="6 個旅遊情境，每個 8 句實戰短句。點 Copy 收進筆記，點喇叭跟讀。"
      />

      <div
        className="phrases-grid"
        style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24 }}
      >
        <aside
          className="phrases-sidebar"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            position: "sticky",
            top: 100,
            alignSelf: "flex-start",
          }}
        >
          {SCENARIOS.map((s) => {
            const t = tone(s.color);
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  background: isActive ? t.bg : "#fff",
                  border: `1px solid ${isActive ? t.solid + "55" : "var(--line)"}`,
                  borderRadius: 12,
                  padding: "14px 16px",
                  textAlign: "left",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "all .2s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: isActive ? t.solid : t.bg,
                    color: isActive ? "#fff" : t.fg,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  {s.icon}
                </div>
                <div className="tc" style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 14, fontWeight: 600, color: isActive ? t.fg : "var(--ink)" }}
                  >
                    {s.label}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                    {s.phrases.length} phrases
                  </div>
                </div>
              </button>
            );
          })}
        </aside>

        <ScenarioPanel scenario={scenario} />
      </div>
    </div>
  );
}
