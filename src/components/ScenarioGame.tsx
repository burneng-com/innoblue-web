import { useState } from "react";
import { GAME_SCENES } from "~/data/content";

export function ScenarioGame() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const scene = GAME_SCENES[sceneIdx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (scene.options[i].correct) setStreak((s) => s + 1);
    else setStreak(0);
  };

  const next = () => {
    setPicked(null);
    setSceneIdx((sceneIdx + 1) % GAME_SCENES.length);
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #0E1A2B 0%, #1A2A47 100%)",
        borderRadius: "var(--radius-lg)",
        color: "#fff",
        padding: 36,
        position: "relative",
        overflow: "hidden",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: ".2em",
              color: "#7DB3FF",
              textTransform: "uppercase",
            }}
          >
            Scene {sceneIdx + 1} / {GAME_SCENES.length}
          </div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 600, marginTop: 6 }}>
            {scene.title}{" "}
            <span className="tc" style={{ fontSize: 18, color: "#A0B4D6", fontWeight: 400 }}>
              · {scene.cn}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="mono" style={{ fontSize: 11, color: "#7DB3FF", letterSpacing: ".15em" }}>
            STREAK
          </div>
          <div
            className="serif"
            style={{ fontSize: 32, fontWeight: 700, color: streak > 0 ? "#FFD66B" : "#fff" }}
          >
            {streak} {streak >= 3 && "🔥"}
          </div>
        </div>
      </div>

      <div
        className="tc"
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 14,
          padding: "16px 20px",
          fontSize: 15,
          lineHeight: 1.6,
          color: "#D5DDED",
          marginBottom: 24,
        }}
      >
        <span style={{ color: "#7DB3FF", fontWeight: 600 }}>場景　</span>
        {scene.setup}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
        {scene.options.map((opt, i) => {
          const isPicked = picked === i;
          const reveal = picked !== null;
          const correct = opt.correct;
          let bg = "rgba(255,255,255,0.05)";
          let border = "rgba(255,255,255,0.12)";
          let color = "#fff";
          if (reveal) {
            if (correct) {
              bg = "rgba(47, 122, 82, 0.25)";
              border = "#4FB37C";
            } else if (isPicked) {
              bg = "rgba(200,71,45,0.20)";
              border = "#E0664D";
            } else {
              color = "#8A99B5";
            }
          }
          return (
            <button
              key={i}
              disabled={reveal}
              onClick={() => pick(i)}
              style={{
                textAlign: "left",
                background: bg,
                border: `1px solid ${border}`,
                color,
                borderRadius: 12,
                padding: "16px 20px",
                fontSize: 16,
                fontFamily: "inherit",
                fontWeight: 500,
                cursor: reveal ? "default" : "pointer",
                transition: "all .2s",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span className="mono" style={{ fontSize: 12, color: "#7DB3FF", paddingTop: 3 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{ lineHeight: 1.5 }}>"{opt.text}"</span>
              </div>
              {reveal && (
                <span style={{ fontSize: 18, flexShrink: 0 }}>
                  {correct ? "✓" : isPicked ? "✕" : ""}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div
          className="tc"
          style={{
            marginTop: 20,
            padding: "16px 20px",
            background: scene.options[picked].correct
              ? "rgba(79, 179, 124, 0.15)"
              : "rgba(224, 102, 77, 0.15)",
            borderRadius: 12,
            fontSize: 14,
            lineHeight: 1.6,
            color: "#fff",
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span>{scene.options[picked].feedback}</span>
          <button
            onClick={next}
            style={{
              background: "#1E50FF",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            下一題 →
          </button>
        </div>
      )}
    </div>
  );
}
