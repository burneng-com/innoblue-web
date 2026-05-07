import type { APIContext } from "astro";
import { DEEPGRAM_VOICE_IDS } from "~/data/content";

export const prerender = false;

const MAX_TEXT = 500;
const DEEPGRAM_URL = "https://api.deepgram.com/v1/speak";

function jsonError(error: string, status = 400, extra: Record<string, unknown> = {}) {
  return new Response(JSON.stringify({ error, ...extra }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function readApiKey(context: APIContext): string | undefined {
  // Cloudflare Pages: env via runtime; local dev: import.meta.env
  const runtimeEnv =
    (context.locals as { runtime?: { env?: Record<string, string | undefined> } }).runtime?.env ?? {};
  return runtimeEnv.DEEPGRAM_API_KEY ?? import.meta.env.DEEPGRAM_API_KEY;
}

export async function POST(context: APIContext): Promise<Response> {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return jsonError("Invalid JSON body");
  }

  const { text, voice } =
    (body && typeof body === "object" ? (body as { text?: unknown; voice?: unknown }) : {}) ?? {};

  if (typeof text !== "string" || text.trim().length === 0) {
    return jsonError("`text` is required");
  }
  if (text.length > MAX_TEXT) {
    return jsonError(`\`text\` exceeds ${MAX_TEXT} chars`);
  }
  if (typeof voice !== "string" || !DEEPGRAM_VOICE_IDS.includes(voice)) {
    return jsonError("`voice` is invalid");
  }

  const apiKey = readApiKey(context);
  if (!apiKey) {
    return jsonError("DEEPGRAM_API_KEY not configured", 500);
  }

  const upstream = await fetch(`${DEEPGRAM_URL}?model=${encodeURIComponent(voice)}`, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    return jsonError("Deepgram upstream error", 502, {
      upstreamStatus: upstream.status,
      detail: errText.slice(0, 500),
    });
  }

  const headers = new Headers();
  headers.set("Content-Type", upstream.headers.get("Content-Type") ?? "audio/mpeg");
  headers.set("Cache-Control", "public, max-age=86400, immutable");

  return new Response(upstream.body, { status: 200, headers });
}
