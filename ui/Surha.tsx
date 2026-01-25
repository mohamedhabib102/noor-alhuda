"use client";

import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import Tafsir, { TafsirData } from "./Tafsir";


interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  audio: string;
}

interface SurhaProps {
  surah?: {
    number: number
    ayahs?: Ayah[];
  };
}

interface TafsirProps {
  tafsir?: TafsirData[];
  option?: number;
}


const SurhaPage: React.FC<SurhaProps & TafsirProps> = ({ surah, tafsir, option }) => {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [toggle, setToggle] = useState(false);
  const [selectedTafsir, setSelectedTafsir] = useState<TafsirData | null>(null);



  if (!surah || !Array.isArray(surah.ayahs) || surah.ayahs.length === 0) {
    return (
      <div className="text-center py-24 text-gray-500">
        حدث خطأ أثناء تحميل السورة
      </div>
    );
  }

  const handlePlayPause = (index: number) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;


    if (playingIndex !== null && playingIndex !== index) {
      const prevAudio = audioRefs.current[playingIndex];
      if (prevAudio) {
        prevAudio.pause();
        prevAudio.currentTime = 0;
      }
    }

    if (currentAudio.paused) {
      currentAudio
        .play()
        .then(() => setPlayingIndex(index))
        .catch((err) => console.warn("Audio play prevented:", err));
    } else {
      currentAudio.pause();
      setPlayingIndex(null);
    }
  };

  const handleEnded = (index: number) => {
    const nextIndex = index + 1;

    if (nextIndex < surah.ayahs!.length) {
      const nextAudio = audioRefs.current[nextIndex];
      if (nextAudio && nextAudio.paused) {
        nextAudio.currentTime = 0;
        nextAudio
          .play()
          .then(() => setPlayingIndex(nextIndex))
          .catch((err) =>
            console.warn("Auto-play next prevented:", err)
          );
      }
    } else {
      setPlayingIndex(null);
    }
  };

  return (
    <>
      <Tafsir
        toggle={toggle}
        setToggle={setToggle}
        tafsir={selectedTafsir}
      />
      {option === 0 ? (
        <div className="space-y-6">
          {surah.ayahs.map((ayah, index) => {
            const isActive = playingIndex === index;
            return (
              <div
                key={`${ayah.numberInSurah}-${index}`}
                className={`relative group p-6 rounded-3xl transition-all duration-300 border
                  ${isActive
                    ? "bg-main/10 dark:bg-main/20 border-main/30 dark:border-main/50 shadow-lg shadow-main/5 dark:shadow-none"
                    : "bg-main-bg/5 dark:bg-main/5 border-main-bg/20 hover:shadow-xl hover:shadow-main-bg/5  hover:-translate-y-0.5"
                  }`}
              >
                <audio
                  ref={(el) => {
                    audioRefs.current[index] = el;
                  }}
                  src={ayah.audio}
                  onEnded={() => handleEnded(index)}
                  preload="none"
                />

                <div className="flex flex-col-reverse gap-6 items-center md:items-start justify-between">
                  <div className="flex items-center justify-between gap-2 w-full">
                    <button
                      onClick={() => handlePlayPause(index)}
                      className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                        ${isActive
                          ? "bg-main text-white shadow-lg shadow-main/20 dark:shadow-none scale-110"
                          : "bg-white dark:bg-main/10 text-main-bg dark:text-main-bg group-hover:bg-main/10 group-hover:text-main dark:group-hover:bg-main/20 dark:group-hover:text-main"
                        }`}
                    >
                      {isActive ? (
                        <FaPause className="text-sm" />
                      ) : (
                        <FaPlay className="text-sm ml-1" />
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      {tafsir?.filter(t => Number(t.aya) === ayah.numberInSurah).map((t) => (
                        <span
                          key={t.id}
                          onClick={() => {
                            setToggle(true)
                            setSelectedTafsir(t)
                          }}
                          className="p-2 text-xs bg-main text-white rounded-full cursor-pointer"> التفسير </span>
                      ))}
                    </div>

                  </div>

                  <div className="flex-1 w-full text-right">
                    <p
                      className={`font-quran text-2xl md:text-4xl leading-[2.5] mb-2
                        ${isActive ? "text-main dark:text-gray-100" : "text-foreground dark:text-gray-300"}`}
                    >
                      {ayah.text}
                      <span className="ml-2 block text-main-bg font-semibold">
                        ({ayah.numberInSurah})
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-main-bg/5 dark:bg-main/5 lg:p-8 p-4 md:p-12 rounded-[2.5rem] border border-main-bg/20 shadow-sm text-center lg:leading-[6.5] leading-[4.2] dir-rtl">
          {surah.ayahs.map((ayah, index) => {
            const isActive = playingIndex === index;
            return (
              <span key={`${ayah.numberInSurah}-${index}`} className="inline">
                <audio
                  ref={(el) => {
                    audioRefs.current[index] = el;
                  }}
                  src={ayah.audio}
                  onEnded={() => handleEnded(index)}
                  preload="none"
                />
                <span
                  onClick={() => handlePlayPause(index)}
                  className={`font-quran text-4xl md:text-5xl cursor-pointer transition-all duration-300 px-1 rounded-xl
                    ${isActive
                      ? "bg-main/10 dark:bg-main/20 text-main dark:text-gray-100 scale-105"
                      : "text-foreground dark:text-gray-200 hover:bg-main/5 dark:hover:bg-white/5"
                    }`}
                >
                  {ayah.text}
                  <span className="mx-2 text-main-bg font-bold text-2xl md:text-3xl select-none">
                    ﴿{ayah.numberInSurah}﴾
                  </span>
                </span>
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SurhaPage;
