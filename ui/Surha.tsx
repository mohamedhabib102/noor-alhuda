"use client";

import { MutableRefObject } from "react";
import { TafsirData } from "./Tafsir";
import { Sajda } from "@/types/Types";

/* ─────────── Types ─────────── */
interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  audio: string;
  page: number;
  juz: number;
  sajda: boolean | Sajda;
}

interface SurhaProps {
  surah?: {
    number: number;
    ayahs: Ayah[];
  };
  tafsir?: TafsirData[];
  audioRefs: MutableRefObject<(HTMLAudioElement | null)[]>;
  playingIndex: number | null;
  onPlayPause: (index: number) => void;
  onEnded: (index: number) => void;
  onAyahClick: (ayah: Ayah) => void;
  loading?: boolean;
  bookmarks?: any[];
}

/* ─────────── Component ─────────── */
const SurhaPage: React.FC<SurhaProps> = ({
  surah,
  audioRefs,
  playingIndex,
  onEnded,
  onAyahClick,
  loading,
  bookmarks,
}) => {
  /* Error state */
  if (!surah || !Array.isArray(surah.ayahs) || surah.ayahs.length === 0) {
    return (
      <div className="text-center py-24 text-gray-500">
        حدث خطأ أثناء تحميل السورة
      </div>
    );
  }

  /* Loading skeleton while fetching new reciter */
  if (loading) {
    return (
      <div className="bg-main-bg/5 dark:bg-main/5 lg:p-8 p-4 md:p-12 rounded-[2.5rem] border border-main-bg/20 flex flex-col items-center justify-center gap-6 py-24">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-main/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-main animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-lg font-bold text-gray-700 dark:text-gray-200">
            جاري تحميل تلاوة القارئ
          </p>
          <p className="text-sm text-gray-400">لحظة من فضلك...</p>
        </div>
      </div>
    );
  }

  /* ── Reading Mode (only mode) ── */
  const showBasmalah = surah.number !== 1 && surah.number !== 9;
  
  // Clean first ayah text if it contains basmalah
  let firstAyahText = surah.ayahs[0]?.text || "";
  let hasExtractedBasmalah = false;
  
  if (showBasmalah && surah.ayahs[0]) {
    const originalText = surah.ayahs[0].text;
    const basmalahs = [
      "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ"
    ];
    for (const b of basmalahs) {
      if (originalText.startsWith(b)) {
        firstAyahText = originalText.substring(b.length).trim();
        hasExtractedBasmalah = true;
        break;
      }
    }
    if (!hasExtractedBasmalah && originalText.startsWith("بِسْمِ")) {
      const endOfBasmalah = originalText.indexOf("الرَّحِيمِ");
      const endOfBasmalahAlt = originalText.indexOf("ٱلرَّحِيمِ");
      if (endOfBasmalah !== -1) {
        firstAyahText = originalText.substring(endOfBasmalah + "الرَّحِيمِ".length).trim();
        hasExtractedBasmalah = true;
      } else if (endOfBasmalahAlt !== -1) {
        firstAyahText = originalText.substring(endOfBasmalahAlt + "ٱلرَّحِيمِ".length).trim();
        hasExtractedBasmalah = true;
      }
    }
  }

  return (
    <div className="space-y-6">
      {showBasmalah && (
        <div className="flex justify-center mb-10 select-none">
          <div 
            className="font-quran text-4xl md:text-5xl text-main dark:text-main-bg/90 bg-main/5 dark:bg-main-bg/5 px-10 py-5 rounded-[2rem] border border-main/15 dark:border-main-bg/15 shadow-sm max-w-md text-center leading-normal"
            dir="rtl"
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        </div>
      )}

      <div
        className="bg-main-bg/5 dark:bg-main/5 lg:p-8 p-4 md:p-12 rounded-[2.5rem] border border-main-bg/20 shadow-sm text-center lg:leading-[6.5] leading-[4.2] dir-rtl"
      >
        {surah.ayahs.map((ayah, index) => {
          const isActive = playingIndex === index;
          const showPageNumber =
            index === 0 || ayah.page !== surah.ayahs[index - 1].page;
          const isBookmarked = bookmarks?.some(b => Number(b.sura) === surah.number && Number(b.aya) === ayah.numberInSurah);
          
          // Use cleaned text for first ayah if basmalah was present
          const displayText = (index === 0 && showBasmalah) ? firstAyahText : ayah.text;

          return (
            <div
              id={`ayah-${ayah.numberInSurah}`}
              key={`${ayah.numberInSurah}-${index}`}
              className="select-none inline scroll-mt-20"
            >
              {/* Hidden audio element — controlled externally */}
              <audio
                ref={(el) => {
                  audioRefs.current[index] = el;
                }}
                src={ayah.audio}
                onEnded={() => onEnded(index)}
                preload="none"
              />

              {/* Page / Juz separator */}
              {showPageNumber && (
                <div
                  className="text-lg my-6 p-4 bg-main/20 lg:rounded-3xl rounded-2xl
                  dark:bg-main/20 flex items-center justify-between gap-4 leading-normal"
                >
                  <span>{`صفحة (${ayah.page})`}</span>
                  <span>{`الجزء ${ayah.juz}`}</span>
                </div>
              )}

              {/* Ayah text — single click opens tafsir / sajda details */}
              <span
                onClick={() => onAyahClick({ ...ayah, text: displayText })}
                title="اضغط لعرض التفسير"
                className={`font-quran text-4xl md:text-5xl cursor-pointer transition-all duration-300 px-1 rounded-xl
                  ${
                    isActive
                      ? "bg-main/20 dark:bg-main/30 text-main dark:text-gray-100 scale-105"
                      : isBookmarked
                        ? "text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10"
                        : "text-foreground dark:text-gray-200 hover:bg-main/5 dark:hover:bg-white/5"
                  }
                  ${ayah.sajda && typeof ayah.sajda === "object" ? "text-main!" : ""}
                `}
              >
                {displayText}
                <span className="mx-2 text-main-bg font-bold text-2xl md:text-3xl select-none">
                  ﴿{ayah.numberInSurah}﴾
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SurhaPage;
