import { useSpeech } from "~/lib/tts";

export function EngineToggle() {
  const { engine, setEngine } = useSpeech();
  const opts: { id: "deepgram" | "webspeech"; label: string }[] = [
    { id: "deepgram", label: "Deepgram" },
    { id: "webspeech", label: "Browser" },
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        background: "#fff",
        padding: 4,
        borderRadius: 999,
        border: "1px solid var(--line)",
      }}
    >
      {opts.map((o) => {
        const active = engine === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setEngine(o.id)}
            style={{
              border: "none",
              background: active ? "var(--ink)" : "transparent",
              color: active ? "#fff" : "var(--ink-2)",
              padding: "6px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "inherit",
              transition: "all .2s",
            }}
            aria-pressed={active}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
