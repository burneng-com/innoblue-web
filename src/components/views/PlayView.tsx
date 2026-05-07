import { ScenarioGame } from "../ScenarioGame";
import { SectionHeader } from "../SectionHeader";

export function PlayView() {
  const cards = [
    {
      kicker: "WHY",
      title: "從錯誤學最快",
      body: "選錯不會扣分，但會看到「為什麼這句不夠好」的 native 解釋。比起背正確答案，知道哪裡奇怪更有用。",
    },
    {
      kicker: "HOW",
      title: "每題 30 秒",
      body: "場景設定一行字 + 三個選項。中午吃飯排隊時可以打一輪，不會中斷生活節奏。",
    },
    {
      kicker: "WHEN",
      title: "晚餐後習慣堆疊",
      body: "建議跟你的「吃完晚餐後」習慣綁在一起：5 個單字卡 → 3 個情境模擬 → 1 句寫進 Day Log。",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <SectionHeader
        kicker="Scenario Simulator"
        title="情境模擬"
        sub="不是教科書答案。三選一，選最像母語者的說法，連續答對拿 streak。"
      />
      <ScenarioGame />

      <div
        className="grid-3"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 14,
              padding: 20,
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--blue)",
                letterSpacing: ".15em",
                marginBottom: 8,
              }}
            >
              {c.kicker}
            </div>
            <div className="tc serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
              {c.title}
            </div>
            <div className="tc" style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              {c.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
