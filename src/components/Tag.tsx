import type { CSSProperties, ReactNode } from "react";
import { tone } from "~/lib/colorTokens";
import type { ColorKey } from "~/data/content";

interface Props {
  children: ReactNode;
  color?: ColorKey;
  size?: "sm" | "md";
  filled?: boolean;
  style?: CSSProperties;
}

export function Tag({ children, color = "blue", size = "sm", filled = false, style }: Props) {
  const t = tone(color);
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: size === "sm" ? "3px 8px" : "5px 10px",
    fontSize: size === "sm" ? 11 : 12,
    fontWeight: 600,
    borderRadius: 999,
    letterSpacing: ".02em",
    ...style,
  };
  return (
    <span
      style={
        filled
          ? { ...base, background: t.solid, color: "#fff" }
          : { ...base, background: t.bg, color: t.fg }
      }
    >
      {children}
    </span>
  );
}
