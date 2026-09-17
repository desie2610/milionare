import { useEffect, useRef } from "react";

const files = {
  background: "background.mp3",
  correct: "correct.mp3",
  wrong: "wrong.mp3",
  final: "final.mp3",
  button: "button.mp3",
  lifeline: "lifeline.mp3",
  win: "win.mp3",
};
export function useAudio(enabled) {
  const audio = useRef({});
  useEffect(() => {
    Object.entries(files).forEach(([name, file]) => {
      const item = new Audio(`/src/assets/audio/${file}`);
      item.preload = "none";
      item.loop = name === "background";
      audio.current[name] = item;
    });
    return () => Object.values(audio.current).forEach((item) => item.pause());
  }, []);
  useEffect(() => {
    const bg = audio.current.background;
    if (!bg) return;
    if (enabled) bg.play().catch(() => {});
    else bg.pause();
  }, [enabled]);
  return (name) => {
    if (enabled) {
      const item = audio.current[name];
      if (item) {
        item.currentTime = 0;
        item.play().catch(() => {});
      }
    }
  };
}

export default function AudioController({ enabled, onToggle }) {
  return (
    <button
      className="sound-button"
      onClick={onToggle}
      aria-label="Увімкнути або вимкнути звук"
    >
      {enabled ? "🔊" : "🔇"}
    </button>
  );
}
