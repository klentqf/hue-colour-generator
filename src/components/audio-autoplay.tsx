"use client";

import { useEffect } from "react";

export function AudioAutoplay() {
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.volume = 0.35;
      audio.play().catch(() => {});
    };

    document.addEventListener("click", play, { once: true });
    document.addEventListener("touchstart", play, { once: true });
    document.addEventListener("keydown", play, { once: true });

    return () => {
      document.removeEventListener("click", play);
      document.removeEventListener("touchstart", play);
      document.removeEventListener("keydown", play);
    };
  }, []);

  return null;
}
