import { useMemo, useState } from "react";
import { TODAY_WORDS, VOCAB_LIBRARY } from "~/data/content";
import { Flashcard } from "../Flashcard";
import { SectionHeader } from "../SectionHeader";

export function VocabView() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const tags = ["all", "Airport", "Hotel", "Food", "Transit", "Sights"];

  const allWords = useMemo(() => [...TODAY_WORDS, ...VOCAB_LIBRARY], []);

  const filtered = allWords.filter((w) => {
    if (filter !== "all" && w.tag !== filter) return false;
    if (
      search &&
      !w.en.toLowerCase().includes(search.toLowerCase()) &&
      !w.zh.includes(search)
    )
      return false;
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <SectionHeader
        kicker="Vocab Library"
        title="單字卡庫"
        sub={`${allWords.length} 個旅遊情境單字。點卡片翻面看中文、例句、發音。`}
      />

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "0 0 280px" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 中文 or English..."
            style={{
              width: "100%",
              padding: "10px 14px 10px 36px",
              borderRadius: 999,
              border: "1px solid var(--line)",
              fontSize: 13,
              fontFamily: "inherit",
              background: "#fff",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--muted)",
            }}
          >
            ⌕
          </span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                background: filter === t ? "var(--ink)" : "#fff",
                color: filter === t ? "#fff" : "var(--ink-2)",
                border: "1px solid " + (filter === t ? "var(--ink)" : "var(--line)"),
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "inherit",
              }}
            >
              {t === "all" ? "全部" : t}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--muted)" }} className="tc">
          顯示 {filtered.length} / {allWords.length}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((w, i) => (
          <Flashcard key={`${w.en}-${i}`} word={{ ...w, ipa: w.ipa || "", note: w.note || "" }} />
        ))}
      </div>
    </div>
  );
}
