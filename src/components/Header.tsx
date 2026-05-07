import type { Progress } from "~/data/content";
import { EngineToggle } from "./EngineToggle";
import { VoiceSelector } from "./VoiceSelector";

export type Section = "home" | "vocab" | "phrases" | "trips" | "play";

interface Props {
  section: Section;
  setSection: (s: Section) => void;
  progress: Progress;
}

export function Header({ section, setSection, progress }: Props) {
  const items: { id: Section; label: string }[] = [
    { id: "home", label: "今日 Today" },
    { id: "vocab", label: "單字卡 Vocab" },
    { id: "phrases", label: "情境句 Phrases" },
    { id: "trips", label: "行程手冊 Trips" },
    { id: "play", label: "情境模擬 Play" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(252, 251, 247, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="header-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSection("home");
          }}
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--blue)",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontFamily: "Fraunces, serif",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.05em",
              boxShadow: "0 2px 8px rgba(30,80,255,0.35)",
            }}
          >
            i
          </div>
          <div>
            <div className="serif" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>
              innoblue
            </div>
            <div
              className="mono"
              style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".1em", marginTop: -2 }}
            >
              TRAVEL · ENGLISH
            </div>
          </div>
        </a>

        <nav
          className="nav-pill"
          style={{
            display: "flex",
            gap: 4,
            background: "#fff",
            padding: 4,
            borderRadius: 999,
            border: "1px solid var(--line)",
          }}
        >
          {items.map((it) => {
            const active = section === it.id;
            return (
              <button
                key={it.id}
                onClick={() => setSection(it.id)}
                aria-current={active ? "page" : undefined}
                style={{
                  border: "none",
                  background: active ? "var(--ink)" : "transparent",
                  color: active ? "#fff" : "var(--ink-2)",
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  transition: "all .2s",
                  whiteSpace: "nowrap",
                }}
              >
                {it.label}
              </button>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <EngineToggle />
          <VoiceSelector />
          <div style={{ textAlign: "right" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".1em" }}>
              DAY
            </div>
            <div className="serif" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1 }}>
              {progress.currentDay}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>/{progress.totalDays}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
