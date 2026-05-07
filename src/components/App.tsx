import { useState } from "react";
import { PROGRESS } from "~/data/content";
import { SpeechProvider } from "~/lib/tts";
import { Header } from "./Header";
import type { Section } from "./Header";
import { Footer } from "./Footer";
import { HomeView } from "./views/HomeView";
import { VocabView } from "./views/VocabView";
import { PhrasesView } from "./views/PhrasesView";
import { TripsView } from "./views/TripsView";
import { PlayView } from "./views/PlayView";

export default function App() {
  const [section, setSection] = useState<Section>("home");

  return (
    <SpeechProvider>
      <div data-screen-label={`Travel · ${section}`}>
        <Header section={section} setSection={setSection} progress={PROGRESS} />
        <main className="app-main" style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 32px" }}>
          {section === "home" && <HomeView />}
          {section === "vocab" && <VocabView />}
          {section === "phrases" && <PhrasesView />}
          {section === "trips" && <TripsView />}
          {section === "play" && <PlayView />}
        </main>
        <Footer />
      </div>
    </SpeechProvider>
  );
}
