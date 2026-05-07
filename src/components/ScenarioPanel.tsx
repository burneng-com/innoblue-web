import { useState } from "react";
import type { Scenario } from "~/data/content";
import { tone } from "~/lib/colorTokens";
import { Tag } from "./Tag";
import { SpeakBtn } from "./SpeakBtn";

export function ScenarioPanel({ scenario }: { scenario: Scenario }) {
  const t = tone(scenario.color);
  const [copied, setCopied] = useState<number | null>(null);

  const copy = (text: string, idx: number) => {
    navigator.clipboard?.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--line)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          background: t.bg,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${t.solid}22`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#fff",
              color: t.solid,
              display: "grid",
              placeItems: "center",
              fontSize: 22,
              fontWeight: 600,
              border: `1px solid ${t.solid}33`,
            }}
          >
            {scenario.icon}
          </div>
          <div>
            <div
              className="tc serif"
              style={{ fontSize: 22, fontWeight: 600, color: t.fg, letterSpacing: "-0.01em" }}
            >
              {scenario.label}
            </div>
            <div className="tc" style={{ fontSize: 13, color: t.fg, opacity: 0.7, marginTop: 2 }}>
              {scenario.blurb}
            </div>
          </div>
        </div>
        <Tag color={scenario.color} filled>
          {scenario.phrases.length} phrases
        </Tag>
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {scenario.phrases.map((p, i) => (
          <li
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "32px 1fr auto",
              gap: 16,
              alignItems: "flex-start",
              padding: "18px 28px",
              borderTop: i === 0 ? "none" : "1px solid var(--line-2)",
            }}
          >
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", paddingTop: 4 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: "var(--ink)",
                  letterSpacing: "-0.005em",
                  lineHeight: 1.45,
                }}
              >
                {p.en}
              </div>
              <div
                className="tc"
                style={{ fontSize: 14, color: "var(--muted)", marginTop: 4, lineHeight: 1.5 }}
              >
                {p.zh}
              </div>
              {p.tip && (
                <div
                  className="tc"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 8,
                    fontSize: 12,
                    color: t.fg,
                    background: t.bg,
                    padding: "3px 10px",
                    borderRadius: 999,
                  }}
                >
                  <span style={{ opacity: 0.6 }}>tip</span>
                  {p.tip}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button
                onClick={() => copy(p.en, i)}
                title="複製句子"
                style={{
                  border: "1px solid var(--line)",
                  background: copied === i ? t.bg : "#fff",
                  color: copied === i ? t.fg : "var(--muted)",
                  borderRadius: 8,
                  padding: "6px 10px",
                  fontSize: 11,
                  fontWeight: 500,
                  transition: "all .2s",
                }}
              >
                {copied === i ? "✓ 已複製" : "Copy"}
              </button>
              <SpeakBtn text={p.en} size={32} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
