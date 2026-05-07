# Innoblue · 旅遊英文共學 — Design Spec

**Date:** 2026-05-07
**Status:** Approved (revised after design import)
**Repo:** https://github.com/burneng-com/innoblue-web
**Target URL:** https://innoblue.burneng.com
**Tracks:** GitHub issue #1

## 1. Goal

Port the supplied React/JSX prototype (`/Users/eugene/Downloads/innoblue-web.zip` — 6 files: `index.html`, `app.jsx`, `components.jsx`, `data.jsx`, `tweaks-panel.jsx`, plus a bundle-src variant) into an Astro + Cloudflare Pages site, retain the visual design and interactions exactly, and upgrade the speech feature to support both Deepgram TTS and the browser's Web Speech API with a runtime toggle.

This single deploy resolves issue #1 (review + ship the prototype) and the original POC goal (read English words/sentences via TTS).

## 2. Scope

### In scope
- Five sections from the prototype, all preserved:
  - **Today (home)** — hero, Today's 5 flashcards, ProgressBar (22-day), quote panel, weekly focus
  - **Vocab** — filterable + searchable card grid (TODAY_WORDS + VOCAB_LIBRARY)
  - **Phrases** — sidebar of 6 scenarios + ScenarioPanel of 8 phrases each
  - **Trips** — boarding-pass styled trip cards + library shelf bar
  - **Play** — ScenarioGame multi-choice with streak counter
- Sticky header with section navigation and progress chip
- Footer with version line
- Speech upgrade: every `SpeakBtn` honours a global engine setting (Deepgram | Web Speech) and, when Deepgram is selected, the chosen voice
- Engine + voice picker control (placed in the header)
- `/api/tts` Pages Function that proxies Deepgram so the API key never reaches the client
- Cloudflare Pages deploy with custom domain `innoblue.burneng.com`

### Out of scope (deferred)
- `tweaks-panel.jsx` (design-time host-iframe tool, not for production)
- Recording / Deepgram STT / pronunciation scoring
- Auth, persistence, progress writes (the 22-day data is read-only)
- Trip "新增行程" and "匯出 PDF" actions (buttons render but are no-op stubs with `disabled` cursor)

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Package manager / runtime | Bun | User-specified |
| Framework | Astro 4+ | User-specified |
| UI framework | `@astrojs/react` | Prototype is React; islands keep static parts cheap |
| Adapter | `@astrojs/cloudflare` | Required for Pages Functions |
| Styling | Hand-written CSS in `global.css` | Prototype uses CSS variables + inline styles; no Tailwind |
| Language | TypeScript | Default |
| TTS A | Deepgram Aura (`/v1/speak`) | API key already on hand |
| TTS B | Browser `SpeechSynthesis` | Free fallback / comparison |
| Hosting | Cloudflare Pages | User-specified |

## 4. Architecture

```
src/pages/index.astro
  └─ <App client:load />        ← single React island (mirrors prototype's <App/>)
        ├─ Header (engine toggle + voice selector)
        ├─ HomeView | VocabView | PhrasesView | TripsView | PlayView
        └─ Footer

src/pages/api/tts.ts            ← POST { text, voice } -> Deepgram audio/mpeg
```

Why a single island: the prototype already lives in one `<App/>` and section switching is local React state. Splitting hairs into per-section islands buys nothing here and complicates state for engine/voice. Future pages (e.g. `/print`) can be plain Astro.

Speech flow:

```
SpeakBtn(text)
  └─ if engine === "webspeech": window.speechSynthesis.speak(...)
  └─ if engine === "deepgram":
       fetch("/api/tts", { body: { text, voice } })
       -> blob -> URL.createObjectURL -> <audio>.play()
       (cached in Map<voice::text, Blob> to avoid re-billing on replay)
```

## 5. File Structure

```
innoblue-web/
├── .env.example                    # DEEPGRAM_API_KEY=
├── .gitignore
├── astro.config.mjs                # cloudflare adapter + react integration
├── package.json                    # bun
├── tsconfig.json
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── content.ts              # TODAY_WORDS, VOCAB_LIBRARY, SCENARIOS, TRIPS, PROGRESS, DAILY_QUOTES, GAME_SCENES
│   ├── lib/
│   │   ├── tts.ts                  # engine context + cache + play helpers
│   │   └── colorTokens.ts          # tone() helper from prototype
│   ├── components/
│   │   ├── App.tsx                 # root island (section state, engine state)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── EngineToggle.tsx        # NEW (deepgram | webspeech)
│   │   ├── VoiceSelector.tsx       # NEW (deepgram voices)
│   │   ├── SpeakBtn.tsx            # engine-aware
│   │   ├── Tag.tsx
│   │   ├── Flashcard.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ScenarioPanel.tsx
│   │   ├── TripCard.tsx
│   │   ├── ScenarioGame.tsx
│   │   └── views/
│   │       ├── HomeView.tsx
│   │       ├── VocabView.tsx
│   │       ├── PhrasesView.tsx
│   │       ├── TripsView.tsx
│   │       └── PlayView.tsx
│   ├── pages/
│   │   ├── index.astro             # loads <App client:load />
│   │   └── api/
│   │       └── tts.ts              # Deepgram proxy (Cloudflare runtime)
│   └── styles/
│       └── global.css              # all CSS vars + .stamp / .flip / .perf-bottom / .pulse / etc., font imports
└── README.md
```

## 6. Data Port

Convert `data.jsx` → `src/data/content.ts`:
- Add TS types: `Word`, `Phrase`, `Scenario`, `Trip`, `Progress`, `Quote`, `GameScene`, `DeepgramVoice`
- Keep all literal content unchanged
- Move `GAME_SCENES` (currently inside `components.jsx`) into the same file for tidiness
- Export `deepgramVoices` and `defaultVoice` (added):
  - `aura-asteria-en` (Asteria, female) — default
  - `aura-luna-en` (Luna, female)
  - `aura-stella-en` (Stella, female)
  - `aura-orion-en` (Orion, male)
  - `aura-arcas-en` (Arcas, male)
  - `aura-perseus-en` (Perseus, male)

## 7. Speech Module

### `SpeechProvider` (React context)
State: `{ engine: "deepgram" | "webspeech", voice: string }`. Initial: `webspeech`, `aura-asteria-en`. Persisted in `localStorage` key `innoblue-speech`.

### `useSpeak()` hook
Returns `{ speak(text), cancel(), playing }`. Internally:
- Owns one `HTMLAudioElement` and a `Map<string, Blob>` cache
- On `speak`, cancels any currently playing source first
- Branches on `engine`

### `SpeakBtn` change
Drop the inline `speak` function and pull from `useSpeak()`. Visual + ARIA stays identical.

### `EngineToggle` (header)
Two-pill segmented control matching the existing nav pill style (`background: var(--ink)` for active).

### `VoiceSelector` (header)
Native `<select>` styled with `.hairline`, hidden when `engine !== "deepgram"`.

## 8. API Contract

### `POST /api/tts`

**Request body (JSON):**
```json
{ "text": "I'd like an aisle seat, please.", "voice": "aura-asteria-en" }
```

**Validation:**
- `text`: required, non-empty string, max 500 chars
- `voice`: required, must be in the `deepgramVoices` allowlist

**Behaviour:**
- `POST https://api.deepgram.com/v1/speak?model={voice}`
- Header: `Authorization: Token ${env.DEEPGRAM_API_KEY}`
- Body: `{ text }`
- Response: stream upstream `audio/mpeg` body back to client with the same content-type and a 1-day `Cache-Control: public, max-age=86400, immutable` (deterministic input → deterministic audio)

**Errors:**
- `400` invalid input → JSON `{ error }`
- `502` upstream non-2xx → JSON `{ error, upstreamStatus }`
- `500` env missing → JSON `{ error: "DEEPGRAM_API_KEY not configured" }`

## 9. CSS Port

Move everything inside the `<style>` block of `index.html` into `src/styles/global.css`:
- `:root` custom properties
- Reset (`*`, `html, body`)
- Body font + smoothing + `font-feature-settings`
- Utility classes: `.serif`, `.mono`, `.tc`, `.paper-tex`, `.perf-bottom`, `.flip*`, `.stamp`, `.hairline`, `.hairline-strong`, `.route-dot`, `.pulse` (+ `@keyframes pulse`), `.lift`, `:focus-visible`, scrollbar
- Google Fonts `<link>` goes into the layout `<head>`

## 10. Environment Variables

| Name | Where | Purpose |
|---|---|---|
| `DEEPGRAM_API_KEY` | `.env` (local), Cloudflare Pages env (prod + preview) | Auth header for Deepgram |

`.gitignore` excludes `.env`, `.env.*` (except `.env.example`), `node_modules/`, `dist/`, `.astro/`, `.wrangler/`.

## 11. Deployment

1. Push to `github.com/burneng-com/innoblue-web` (already created and `main` exists).
2. Cloudflare Dashboard (account `ifangdar@gmail.com`) → **Workers & Pages → Pages → Create → Connect to Git** → select repo.
3. Build settings:
   - Framework preset: Astro
   - Build command: `bun run build`
   - Build output directory: `dist`
   - Root directory: `/`
   - Node version env: `NODE_VERSION=20` (Cloudflare default for Astro)
4. Environment variables (Production + Preview): `DEEPGRAM_API_KEY` (encrypted).
5. Custom domain: add `innoblue.burneng.com` in Pages → Custom domains. If `burneng.com` is on the same Cloudflare account a CNAME is created automatically; otherwise add a `CNAME innoblue → <project>.pages.dev` at the DNS provider.

## 12. Verification

Local (`bun run dev`):
- Each section loads, no console errors
- Flip card animation works on every flashcard
- Search + filter on Vocab returns expected counts (`顯示 N / total`)
- Phrases sidebar switches scenarios; Copy button toggles to "✓ 已複製" for ~1.2 s
- ScenarioGame: picking the wrong option resets streak, right option increments
- Engine toggle switches mid-playback (in-flight audio is cancelled)
- Voice selector hidden when engine = Web Speech
- `/api/tts` returns 200 + `audio/mpeg` for valid input, 400 for empty text, 400 for unknown voice

Production:
- Visit `https://innoblue.burneng.com`, repeat manual checks
- Confirm Deepgram audio plays (proves env var is set)

## 13. Issue #1 Closeout

Comment on issue #1 with: deployed URL, summary of integration choices (React islands, no Tailwind, Deepgram added), checklist marked done, any deferred items called out (tweaks-panel, recording). Close on merge.

## 14. Open decisions deferred to implementation

- Exact spinner UI inside `SpeakBtn` while waiting for Deepgram fetch (lightweight in-button spinner).
- Cache eviction: cap blob cache at 50 entries (LRU) to bound memory.
- Mobile breakpoint: prototype uses fixed columns (`repeat(5, 1fr)` etc.); add `@media (max-width: 720px)` overrides where columns collapse to 1–2 wide.
