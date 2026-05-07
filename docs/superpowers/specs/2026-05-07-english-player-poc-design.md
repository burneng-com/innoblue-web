# Innoblue English Player POC — Design Spec

**Date:** 2026-05-07
**Status:** Approved
**Repo:** https://github.com/burneng-com/innoblue-web
**Target URL:** https://innoblue.burneng.com

## 1. Goal

Build a minimal proof-of-concept web app that plays English words and sentences out loud, using either Deepgram TTS or the browser's Web Speech API (user-toggleable). Deploy to Cloudflare Pages.

This is **phase 1** of a larger English read/write practice tool. Recording + speech-to-text (Deepgram STT) is intentionally out of scope for this phase.

## 2. Scope

### In scope
- Single page that lists 10 English words and 5 English sentences
- Click ▶ to play any item
- Toggle between two TTS engines: Deepgram Aura vs. Web Speech API
- Voice selector (Deepgram voices only)
- Server endpoint that proxies Deepgram TTS so the API key stays server-side
- Deploy to Cloudflare Pages with custom domain `innoblue.burneng.com`

### Out of scope (deferred to later phases)
- Recording user speech / Deepgram STT
- Pronunciation comparison / scoring
- User accounts, history, progress tracking
- Internationalization
- Mobile-specific optimisations beyond responsive layout

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Package manager / runtime | Bun | User-specified |
| Framework | Astro | User-specified |
| Adapter | `@astrojs/cloudflare` | Required for Pages Functions (server endpoints) |
| Styling | Tailwind CSS | Fast POC styling |
| Language | TypeScript | Default for Astro |
| TTS A | Deepgram Aura (`/v1/speak`) | User has API key |
| TTS B | Browser `SpeechSynthesis` | Free fallback / comparison |
| Hosting | Cloudflare Pages | User-specified |

## 4. Architecture

```
Browser
  ├─ Engine = "deepgram"
  │     └─ POST /api/tts {text, voice}  ──▶  Deepgram /v1/speak
  │            ◀── audio/mpeg blob
  │            └─ play via <audio>
  └─ Engine = "webspeech"
        └─ window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
```

- Deepgram API key never reaches the browser — it lives only as a Cloudflare Pages env var and is read by the Pages Function.
- Only one audio source plays at a time; pressing a new ▶ stops any currently playing item.

## 5. File Structure

```
innoblue-web/
├── .env.example
├── .gitignore
├── astro.config.mjs           # cloudflare adapter, tailwind integration
├── package.json
├── tsconfig.json
├── tailwind.config.mjs
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── content.ts         # words[] + sentences[]
│   ├── lib/
│   │   ├── tts-deepgram.ts    # client: fetch /api/tts -> play blob
│   │   └── tts-webspeech.ts   # client: SpeechSynthesis wrapper
│   ├── components/
│   │   ├── EngineToggle.astro
│   │   ├── VoiceSelector.astro
│   │   └── PlayItem.astro
│   ├── pages/
│   │   ├── index.astro        # words section + sentences section
│   │   └── api/
│   │       └── tts.ts         # POST -> Deepgram TTS proxy
│   └── styles/global.css      # tailwind base
└── README.md
```

## 6. Data

`src/data/content.ts`:

```ts
export const words: string[] = [
  "apple", "banana", "computer", "develop", "freedom",
  "holiday", "journey", "knowledge", "language", "opportunity",
];

export const sentences: string[] = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect.",
  "Learning English is fun and rewarding.",
  "Could you please repeat that more slowly?",
  "I would like a cup of coffee, please.",
];

export const deepgramVoices: { id: string; label: string }[] = [
  { id: "aura-asteria-en", label: "Asteria (female)" },
  { id: "aura-luna-en",    label: "Luna (female)" },
  { id: "aura-stella-en",  label: "Stella (female)" },
  { id: "aura-orion-en",   label: "Orion (male)" },
  { id: "aura-arcas-en",   label: "Arcas (male)" },
  { id: "aura-perseus-en", label: "Perseus (male)" },
];

export const defaultVoice = "aura-asteria-en";
```

## 7. API Contract

### `POST /api/tts`

**Request body (JSON):**
```json
{ "text": "apple", "voice": "aura-asteria-en" }
```

**Validation:**
- `text`: required, non-empty string, max 500 chars
- `voice`: required, must be one of the IDs in `deepgramVoices`

**Behaviour:**
- Calls `POST https://api.deepgram.com/v1/speak?model={voice}` with header `Authorization: Token ${env.DEEPGRAM_API_KEY}` and body `{ text }`.
- Streams the response back to the client with `Content-Type: audio/mpeg`.

**Errors:**
- 400 — invalid input
- 500 — env var missing or upstream Deepgram error (return JSON `{ error }`)

## 8. UX

```
┌────────────────────────────────────────────┐
│  Innoblue English Player                   │
│                                            │
│  Engine: ( ● Deepgram ) ( ○ Web Speech )   │
│  Voice : [ Asteria (female)         ▼ ]    │   ← only when Deepgram
│                                            │
│  Words ──────────────────────────────      │
│   [▶] apple                                │
│   [▶] banana                               │
│   ...                                      │
│                                            │
│  Sentences ──────────────────────────      │
│   [▶] The quick brown fox jumps over...   │
│   ...                                      │
└────────────────────────────────────────────┘
```

- ▶ button toggles to ⏸ while that item is playing.
- Switching engine or voice while audio is playing stops playback.
- Voice selector is hidden when engine = Web Speech.
- Layout is single-column, responsive, max-width ~640px centred.

## 9. Environment Variables

| Name | Where | Purpose |
|---|---|---|
| `DEEPGRAM_API_KEY` | `.env` (local), Cloudflare Pages env (prod) | Auth header for Deepgram API |

`.env` is git-ignored. `.env.example` is committed with the var name and an empty value.

## 10. Deployment

1. Push project to `github.com/burneng-com/innoblue-web` (already created).
2. Cloudflare Dashboard (account `ifangdar@gmail.com`) → Pages → Create project → Connect to Git → select repo.
3. Build settings:
   - Framework preset: Astro
   - Build command: `bun run build`
   - Build output directory: `dist`
4. Environment variables (Production + Preview): set `DEEPGRAM_API_KEY`.
5. Custom domain: add `innoblue.burneng.com`. Cloudflare creates the CNAME automatically if `burneng.com` is on the same Cloudflare account; otherwise add a `CNAME innoblue → <pages-subdomain>.pages.dev` at the DNS provider.

## 11. Verification

- Local: `bun run dev`, click each word and sentence under both engines, confirm audio plays.
- Local Deepgram: confirm `/api/tts` returns `audio/mpeg` (200) and that an invalid `voice` returns 400.
- Production: same manual checks against `https://innoblue.burneng.com`.

## 12. Open Decisions Deferred to Implementation

- Exact Tailwind theme tokens (colours, spacing) — pick sensible defaults.
- Loading state UI while Deepgram is fetching — simple spinner on the button is fine.
- Whether to cache Deepgram audio blobs in memory across replays of the same item — yes, keep a `Map<string, Blob>` keyed by `${voice}::${text}` to avoid re-billing.
