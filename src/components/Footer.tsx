export function Footer() {
  return (
    <footer style={{ marginTop: 80, padding: "32px 0", borderTop: "1px solid var(--line)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div className="tc" style={{ fontSize: 12, color: "var(--muted)" }}>
          innoblue · 22 天旅遊英文挑戰 · <span className="mono">innoblue.burneng.com</span>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--muted)" }}>
          <span>v0.1 · Phase 1（內容累積中）</span>
          <span>·</span>
          <span style={{ color: "var(--red)" }}>Phase 2（網站化）= Day 23 之後</span>
        </div>
      </div>
    </footer>
  );
}
