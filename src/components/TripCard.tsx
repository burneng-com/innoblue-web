import type { Trip } from "~/data/content";

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <article
      className="lift"
      style={{
        background: trip.paper,
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${trip.accent}22`,
        boxShadow: "var(--shadow)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 22px",
          borderBottom: `1px dashed ${trip.accent}55`,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          color: trip.accent,
          fontWeight: 500,
          letterSpacing: ".08em",
          textTransform: "uppercase",
        }}
      >
        <span>
          {trip.day} · {trip.chip}
        </span>
        <span style={{ fontSize: 18 }}>{trip.flag}</span>
      </div>

      <div style={{ padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div
            className="mono"
            style={{ fontSize: 11, color: trip.accent, letterSpacing: ".12em", textTransform: "uppercase" }}
          >
            {trip.city} · {trip.cn}
          </div>
          <div
            className="serif"
            style={{
              fontSize: 26,
              fontWeight: 600,
              lineHeight: 1.15,
              marginTop: 4,
              letterSpacing: "-0.015em",
            }}
          >
            {trip.title}
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2, fontStyle: "italic" }}>
            {trip.sub}
          </div>
        </div>

        <div style={{ display: "flex", gap: 18, fontSize: 12 }}>
          <span style={{ color: "var(--muted)" }}>⛅ {trip.weather}</span>
          <span style={{ color: "var(--muted)" }}>◷ {trip.duration}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 8 }}>
          {trip.spots.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: trip.accent,
                  opacity: 1 - i * 0.15,
                }}
              />
              <span style={{ color: "var(--ink-2)" }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: `repeating-linear-gradient(to right, ${trip.accent}55 0 6px, transparent 6px 12px)`,
          margin: "0 16px",
        }}
      />

      <div style={{ padding: "16px 22px 22px" }}>
        <div
          className="mono"
          style={{ fontSize: 10, color: trip.accent, letterSpacing: ".12em", marginBottom: 6 }}
        >
          KEY PHRASE
        </div>
        <div style={{ fontSize: 14, fontStyle: "italic", color: "var(--ink)", fontWeight: 500, lineHeight: 1.5 }}>
          "{trip.keyPhrase.en}"
        </div>
        <div className="tc" style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
          {trip.keyPhrase.zh}
        </div>
      </div>

      {trip.status && (
        <div style={{ position: "absolute", top: 56, right: 18, color: trip.accent }}>
          <span className="stamp tc">{trip.status}</span>
        </div>
      )}
    </article>
  );
}
