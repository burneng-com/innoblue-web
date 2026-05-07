import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { Word } from "~/data/content";
import { tone } from "~/lib/colorTokens";
import { Tag } from "./Tag";
import { SpeakBtn } from "./SpeakBtn";

interface Props {
  word: Word;
  big?: boolean;
}

export function Flashcard({ word, big = false }: Props) {
  const [flipped, setFlipped] = useState(false);
  const t = tone(word.color);
  const w = big ? "100%" : 280;
  const h = big ? 360 : 200;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  return (
    <div
      className={`flip ${flipped ? "flipped" : ""}`}
      style={{ width: w, height: h }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="flip-inner" style={{ width: "100%", height: "100%" }}>
        {/* FRONT */}
        <div
          className="flip-face"
          style={{
            position: "absolute",
            inset: 0,
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow)",
            padding: big ? 32 : 20,
            border: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: big ? 96 : 56,
              height: big ? 96 : 56,
              background: t.bg,
              borderBottomLeftRadius: "100%",
              opacity: 0.9,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Tag color={word.color} size={big ? "md" : "sm"}>
              {word.tag}
            </Tag>
            <span className="mono" style={{ fontSize: big ? 12 : 10, color: "var(--muted)" }}>
              EN
            </span>
          </div>

          <div>
            <div
              className="serif"
              style={{
                fontSize: big ? 64 : 32,
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {word.en}
            </div>
            <div className="mono" style={{ marginTop: 8, fontSize: big ? 14 : 11, color: "var(--muted)" }}>
              {word.ipa || ""}
              {word.pos && <span style={{ marginLeft: 8 }}>· {word.pos}</span>}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <span style={{ fontSize: big ? 13 : 11, color: "var(--muted)" }}>點卡片翻面</span>
            <SpeakBtn text={word.en} size={big ? 32 : 26} />
          </div>
        </div>

        {/* BACK */}
        <div
          className="flip-face flip-back"
          style={{
            background: t.bg,
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow)",
            padding: big ? 32 : 20,
            border: `1px solid ${t.solid}33`,
            display: "flex",
            flexDirection: "column",
            gap: big ? 14 : 8,
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Tag color={word.color} size={big ? "md" : "sm"} filled>
              {word.tag}
            </Tag>
            <span className="mono" style={{ fontSize: big ? 12 : 10, color: t.fg, opacity: 0.7 }}>
              中文
            </span>
          </div>
          <div
            className="tc serif"
            style={{
              fontSize: big ? 44 : 24,
              fontWeight: 600,
              color: t.fg,
              letterSpacing: "0.02em",
            }}
          >
            {word.zh}
          </div>
          {big && word.note && (
            <div className="tc" style={{ fontSize: 14, color: t.fg, opacity: 0.8, lineHeight: 1.6 }}>
              {word.note}
            </div>
          )}
          {word.examples && word.examples.length > 0 && (
            <div style={{ marginTop: "auto", paddingTop: 8, borderTop: `1px dashed ${t.solid}55` }}>
              <div
                style={{
                  fontSize: big ? 14 : 11,
                  color: t.fg,
                  opacity: 0.9,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                "{word.examples[0].en}"
              </div>
              {big && (
                <div className="tc" style={{ fontSize: 13, color: t.fg, opacity: 0.7, marginTop: 2 }}>
                  {word.examples[0].zh}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
