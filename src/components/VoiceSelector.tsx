import { useSpeech } from "~/lib/tts";
import { DEEPGRAM_VOICES } from "~/data/content";

export function VoiceSelector() {
  const { engine, voice, setVoice } = useSpeech();
  if (engine !== "deepgram") return null;

  return (
    <select
      value={voice}
      onChange={(e) => setVoice(e.target.value)}
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 999,
        padding: "8px 12px",
        fontSize: 12,
        fontFamily: "inherit",
        color: "var(--ink-2)",
      }}
      aria-label="Voice"
    >
      {DEEPGRAM_VOICES.map((v) => (
        <option key={v.id} value={v.id}>
          {v.label}
        </option>
      ))}
    </select>
  );
}
