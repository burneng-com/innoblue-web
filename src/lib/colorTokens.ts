import type { ColorKey } from "~/data/content";

export interface Tone {
  bg: string;
  fg: string;
  ink: string;
  solid: string;
}

export const colorTokens: Record<ColorKey, Tone> = {
  blue:  { bg: "var(--blue-soft)",  fg: "var(--blue-deep)", ink: "var(--blue)",  solid: "#1E50FF" },
  red:   { bg: "var(--red-soft)",   fg: "#7B2614",          ink: "var(--red)",   solid: "#C8472D" },
  green: { bg: "var(--green-soft)", fg: "#1A4A30",          ink: "var(--green)", solid: "#2F7A52" },
  khaki: { bg: "var(--khaki-soft)", fg: "#5C4A2A",          ink: "var(--khaki)", solid: "#B8A077" },
  amber: { bg: "var(--amber-soft)", fg: "#6A4A0E",          ink: "var(--amber)", solid: "#E0A02E" },
};

export function tone(c: ColorKey | string | undefined): Tone {
  if (c && c in colorTokens) return colorTokens[c as ColorKey];
  return colorTokens.blue;
}
