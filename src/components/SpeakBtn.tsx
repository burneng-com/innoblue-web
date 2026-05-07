import type { CSSProperties, MouseEvent } from "react";
import { useSpeak } from "~/lib/tts";

interface Props {
  text: string;
  size?: number;
  style?: CSSProperties;
}

export function SpeakBtn({ text, size = 26, style }: Props) {
  const { speak, playing, loading } = useSpeak();

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    void speak(text);
  };

  const active = playing || loading;

  return (
    <button
      onClick={onClick}
      aria-label={`Pronounce: ${text}`}
      title="點我聽發音"
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        border: "1px solid var(--line)",
        background: active ? "var(--blue)" : "#fff",
        color: active ? "#fff" : "var(--ink)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...style,
      }}
      className={playing ? "pulse" : ""}
    >
      {loading ? (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="14 40">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite" />
          </circle>
        </svg>
      ) : (
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 5a9 9 0 0 1 0 14" />
        </svg>
      )}
    </button>
  );
}
