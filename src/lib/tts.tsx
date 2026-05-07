import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_VOICE } from "~/data/content";

export type Engine = "deepgram" | "webspeech";

export interface SpeechState {
  engine: Engine;
  voice: string;
  setEngine: (e: Engine) => void;
  setVoice: (v: string) => void;
}

const SpeechContext = createContext<SpeechState | null>(null);

const STORAGE_KEY = "innoblue-speech";

export function SpeechProvider({ children }: { children: ReactNode }) {
  const [engine, setEngineState] = useState<Engine>("webspeech");
  const [voice, setVoiceState] = useState<string>(DEFAULT_VOICE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const v = JSON.parse(raw) as Partial<{ engine: Engine; voice: string }>;
      if (v.engine === "deepgram" || v.engine === "webspeech") setEngineState(v.engine);
      if (typeof v.voice === "string") setVoiceState(v.voice);
    } catch {
      /* ignore */
    }
  }, []);

  const setEngine = useCallback((e: Engine) => {
    setEngineState(e);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ engine: e, voice })); } catch { /* ignore */ }
  }, [voice]);

  const setVoice = useCallback((v: string) => {
    setVoiceState(v);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ engine, voice: v })); } catch { /* ignore */ }
  }, [engine]);

  const value = useMemo(() => ({ engine, voice, setEngine, setVoice }), [engine, voice, setEngine, setVoice]);

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
}

export function useSpeech(): SpeechState {
  const ctx = useContext(SpeechContext);
  if (!ctx) throw new Error("useSpeech must be used within SpeechProvider");
  return ctx;
}

const blobCache = new Map<string, Blob>();
const CACHE_LIMIT = 50;
let currentAudio: HTMLAudioElement | null = null;

function cancelAll() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

async function fetchDeepgram(text: string, voice: string): Promise<Blob> {
  const key = `${voice}::${text}`;
  const cached = blobCache.get(key);
  if (cached) return cached;
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`TTS failed (${res.status}): ${errText}`);
  }
  const blob = await res.blob();
  if (blobCache.size >= CACHE_LIMIT) {
    const firstKey = blobCache.keys().next().value;
    if (firstKey) blobCache.delete(firstKey);
  }
  blobCache.set(key, blob);
  return blob;
}

export interface SpeakHandle {
  speak: (text: string) => Promise<void>;
  cancel: () => void;
  playing: boolean;
  loading: boolean;
}

export function useSpeak(): SpeakHandle {
  const { engine, voice } = useSpeech();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const tokenRef = useRef(0);

  const cancel = useCallback(() => {
    tokenRef.current += 1;
    cancelAll();
    setPlaying(false);
    setLoading(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    cancel();
    const myToken = ++tokenRef.current;

    if (engine === "webspeech") {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.95;
      u.onend = () => {
        if (myToken === tokenRef.current) setPlaying(false);
      };
      u.onerror = () => {
        if (myToken === tokenRef.current) setPlaying(false);
      };
      setPlaying(true);
      window.speechSynthesis.speak(u);
      return;
    }

    setLoading(true);
    try {
      const blob = await fetchDeepgram(text, voice);
      if (myToken !== tokenRef.current) return;
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => {
        if (myToken === tokenRef.current) setPlaying(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        if (myToken === tokenRef.current) setPlaying(false);
        URL.revokeObjectURL(url);
      };
      currentAudio = audio;
      setLoading(false);
      setPlaying(true);
      await audio.play();
    } catch (err) {
      if (myToken === tokenRef.current) {
        setPlaying(false);
        setLoading(false);
      }
      console.error(err);
    }
  }, [engine, voice, cancel]);

  useEffect(() => () => cancel(), [cancel]);

  return { speak, cancel, playing, loading };
}
