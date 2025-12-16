"use client";

import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface SurhaProps {
  surah: {
    ayahs: {
      number: number;
      numberInSurah: number;
      text: string;
      audio: string;
    }[];
  };
}

const SurhaPage: React.FC<SurhaProps> = ({ surah }) => {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlayPause = (index: number) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;

    // إذا كان مشغل الآية الحالي يعمل، نوقفه
    if (playingIndex !== null && playingIndex !== index) {
      const prevAudio = audioRefs.current[playingIndex];
      if (prevAudio) {
        prevAudio.pause();
        prevAudio.currentTime = 0;
      }
    }

    if (currentAudio.paused) {
      currentAudio.play().catch((err) => console.warn("Audio play prevented:", err));
      setPlayingIndex(index);
    } else {
      currentAudio.pause();
      setPlayingIndex(null);
    }
  };

  const handleEnded = (index: number) => {
    const nextIndex = index + 1;
    if (nextIndex < surah.ayahs.length) {
      const nextAudio = audioRefs.current[nextIndex];
      if (nextAudio) {
        nextAudio.currentTime = 0;
        nextAudio.play().catch((err) => console.warn("Auto-play next prevented:", err));
        setPlayingIndex(nextIndex);
      }
    } else {
      setPlayingIndex(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {surah.ayahs.map((ayah, index) => {
        const isActive = playingIndex === index;
        return (
          <div
            key={ayah.number}
            className={`relative group p-6 rounded-3xl transition-all duration-300 border
              ${isActive
                ? "bg-emerald-200/60 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 shadow-lg shadow-emerald-100/50 dark:shadow-none"
                : "bg-white dark:bg-zinc-900/50 border-gray-400 dark:border-zinc-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 hover:-translate-y-0.5"
              }`}
          >
            <audio
             ref={(el: HTMLAudioElement | null) => {
               audioRefs.current[index] = el ?? null; // فقط خزنه، لا ترجع أي شيء
             }}
              src={ayah.audio}
              onEnded={() => handleEnded(index)}
              preload="auto"
            />

            <div className="flex flex-col-reverse md:flex-row gap-6 items-center md:items-start justify-between">
              <div className="shrink-0 mt-2 md:mt-1">
                <button
                  onClick={() => handlePlayPause(index)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                    ${isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none scale-110"
                      : "bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 dark:group-hover:bg-emerald-900/30 dark:group-hover:text-emerald-400"
                    }`}
                >
                  {isActive ? <FaPause className="text-sm" /> : <FaPlay className="text-sm ml-1" />}
                </button>
              </div>

              <div className="flex-1 w-full text-right">
                <p className={`font-quran text-2xl md:text-4xl leading-[2.5] md:leading-[2.5] mb-2
                  ${isActive ? "text-emerald-950 dark:text-emerald-50" : "text-gray-800 dark:text-gray-200"}`}>
                  {ayah.text} <span className="ml-2 block text-(--main-color) font-semibold">{`(${ayah.numberInSurah})`}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SurhaPage;
