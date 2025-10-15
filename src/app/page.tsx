"use client";

import { RevealAnimation } from "@/components/RevealAnimation";
import Home from "./home/page";

export default function App() {

  return (
    <RevealAnimation
      counterDuration={4}
      helloDuration={0.4}
      dematerializeDuration={0.6}
      splitDuration={1.2}
      counterEase="power2.inOut"
      splitEase="power3.inOut"
    >
    <Home />
    </RevealAnimation>
  );
}
