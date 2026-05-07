import type { ReactNode } from "react";

interface Props {
  kicker?: string;
  title: string;
  sub?: string;
  action?: ReactNode;
}

export function SectionHeader({ kicker, title, sub, action }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 24 }}>
      <div>
        {kicker && (
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: ".18em",
              color: "var(--blue)",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {kicker}
          </div>
        )}
        <h2
          className="serif"
          style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--ink)",
          }}
        >
          {title}
        </h2>
        {sub && (
          <p
            className="tc"
            style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 15, maxWidth: 640, lineHeight: 1.6 }}
          >
            {sub}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function btnGhost(): React.CSSProperties {
  return {
    background: "#fff",
    color: "var(--ink)",
    border: "1px solid var(--line)",
    padding: "8px 16px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "inherit",
  };
}
