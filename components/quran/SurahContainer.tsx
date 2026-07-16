"use client";
import { useState, useEffect, useRef } from "react";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import SurahDisplay from "@/ui/Surha";
import Tafsir, { TafsirData } from "@/ui/Tafsir";
import MessageSajda from "@/ui/MessageSajda";
import { Sajda } from "@/types/Types";
import { FaPlay, FaPause, FaChevronDown } from "react-icons/fa6";
import { FaChevronRight, FaChevronLeft, FaHashtag } from "react-icons/fa6";
import { MdMusicNote } from "react-icons/md";
import Link from "next/link";
import { getFromIDB, saveToIDB } from "@/lib/idb";
import { useToast } from "@/ui/Toast";

/* ─────────────── Types ─────────────── */
interface Reciter {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  audio: string;
  page: number;
  juz: number;
  sajda: boolean | Sajda;
}

interface SurahMeta {
  id: number;
  name: string;
  number: number;
  englishName: string;
  ayahs: Ayah[];
}

interface SurahContainerProps {
  surahNumber: string;
  surahMeta: SurahMeta;
}

const DEFAULT_RECITER = "ar.alafasy";
const DEFAULT_RECITER_NAME = "مشاري راشد العفاسي";

/* ─────────────── Component ─────────────── */
const SurahContainer: React.FC<SurahContainerProps> = ({
  surahNumber,
  surahMeta,
}) => {
  const { showToast } = useToast();

  /* State */
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<string>(DEFAULT_RECITER);
  const [surahAyahs, setSurahAyahs] = useState<Ayah[]>(surahMeta.ayahs || []);
  const [tafsir, setTafsir] = useState<TafsirData[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [showReciterDropdown, setShowReciterDropdown] = useState(false);
  const [selectedTafsir, setSelectedTafsir] = useState<TafsirData | null>(null);
  const [toggleTafsir, setToggleTafsir] = useState(false);
  const [toggleSajda, setToggleSajda] = useState(false);
  const [sajda, setSajda] = useState<Sajda | null>(null);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [reciterSearch, setReciterSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const loadBookmarks = () => {
    const saved = localStorage.getItem("quran-bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ── Fetch reciters on mount ── */
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/edition?format=audio&language=ar")
      .then((res) => res.json())
      .then((data) => {
        setReciters(data.data || []);
        saveToIDB("reciters", "all", data.data || []);
      })
      .catch(async () => {
        const cached = await getFromIDB("reciters", "all");
        if (cached) setReciters(cached);
      });
  }, []);

  /* ── Fetch tafsir on mount ── */
  useEffect(() => {
    fetch(
      `https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${surahNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTafsir(data.result || []);
        saveToIDB("tafsir", `${surahNumber}`, data.result || []);
      })
      .catch(async () => {
        const cached = await getFromIDB("tafsir", `${surahNumber}`);
        if (cached) setTafsir(cached);
      });
  }, [surahNumber]);

  /* ── Fetch ayahs when reciter changes ── */
  useEffect(() => {
    if (selectedReciter === DEFAULT_RECITER && surahMeta.ayahs) {
      setSurahAyahs(surahMeta.ayahs);
      return;
    }
    // Stop any current playback
    if (playingIndex !== null) {
      audioRefs.current[playingIndex]?.pause();
      setPlayingIndex(null);
    }
    setLoadingAyahs(true);
    fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/${selectedReciter}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSurahAyahs(data.data?.ayahs || []);
        saveToIDB("surah-ayahs", `${surahNumber}-${selectedReciter}`, data.data?.ayahs || []);
        setLoadingAyahs(false);
      })
      .catch(async () => {
        const cached = await getFromIDB("surah-ayahs", `${surahNumber}-${selectedReciter}`);
        if (cached) setSurahAyahs(cached);
        setLoadingAyahs(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReciter, surahNumber]);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowReciterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ─────────── Audio Handlers ─────────── */
  const handlePlayPause = (index: number) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      showToast("يجب الاتصال بالإنترنت لتشغيل التلاوة الصوتية.", "warning");
      return;
    }

    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;

    // Pause previous
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
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setPlayingIndex(null);
      return;
    }

    const nextIndex = index + 1;
    if (nextIndex < surahAyahs.length) {
      const nextAudio = audioRefs.current[nextIndex];
      if (nextAudio && nextAudio.paused) {
        nextAudio.currentTime = 0;
        nextAudio
          .play()
          .then(() => setPlayingIndex(nextIndex))
          .catch((err) => console.warn("Auto-play next prevented:", err));
      }
    } else {
      setPlayingIndex(null);
    }
  };

  const handleTogglePlay = () => {
    if (playingIndex !== null) {
      audioRefs.current[playingIndex]?.pause();
      setPlayingIndex(null);
    } else {
      handlePlayPause(0);
    }
  };

  /* ─────────── Ayah Click ─────────── */
  const handleAyahClick = (ayah: Ayah) => {
    const tafsirItem = tafsir?.find(
      (t) => Number(t.aya) === ayah.numberInSurah
    );
    if (tafsirItem) {
      setSelectedTafsir(tafsirItem);
      setToggleTafsir(true);
    } else if (ayah.sajda && typeof ayah.sajda === "object") {
      setSajda(ayah.sajda as Sajda);
      setToggleSajda(true);
    }
  };

  /* ─────────── Reciter Info ─────────── */
  const currentReciter = reciters.find((r) => r.identifier === selectedReciter);
  const currentReciterName =
    currentReciter?.name ||
    (selectedReciter === DEFAULT_RECITER ? DEFAULT_RECITER_NAME : selectedReciter);

  const handleSelectReciter = (identifier: string) => {
    setSelectedReciter(identifier);
    setShowReciterDropdown(false);
    setReciterSearch("");
  };

  const filteredReciters = reciters.filter((r) =>
    r.name.includes(reciterSearch) || r.englishName.toLowerCase().includes(reciterSearch.toLowerCase())
  );

  /* ─────────── Render ─────────── */
  return (
    <>
      {/* Tafsir Overlay */}
      <Tafsir
        toggle={toggleTafsir}
        setToggle={setToggleTafsir}
        tafsir={selectedTafsir}
        surahName={surahMeta.name}
        onBookmarkUpdate={loadBookmarks}
        isPlaying={
          selectedTafsir && playingIndex !== null
            ? surahAyahs.findIndex((a) => a.numberInSurah === Number(selectedTafsir.aya)) === playingIndex
            : false
        }
        onPlay={() => {
          const index = surahAyahs.findIndex(
            (a) => a.numberInSurah === Number(selectedTafsir?.aya)
          );
          if (index !== -1) handlePlayPause(index);
        }}
      />

      {/* Sajda Overlay */}
      <MessageSajda
        toggle={toggleSajda}
        setToggle={setToggleSajda}
        sajda={sajda}
      />

      {/* Main Content */}
      <section className="py-16 pb-44">
        <CustomContainer>
          <div>
            <CustomTitle title={surahMeta.name} success={true} description={""} />

            {/* Surah Display */}
            <div className="mt-10">
              <SurahDisplay
                surah={{ ...surahMeta, ayahs: surahAyahs }}
                tafsir={tafsir}
                audioRefs={audioRefs}
                playingIndex={playingIndex}
                onPlayPause={handlePlayPause}
                onEnded={handleEnded}
                onAyahClick={handleAyahClick}
                loading={loadingAyahs}
                bookmarks={bookmarks}
              />
            </div>

            {/* Navigation Bar */}
            <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-main/5 p-8 rounded-[2.5rem] border border-main/10 dark:border-white/10 shadow-sm transition-all duration-300">
              {/* Previous Surah */}
              <div className="w-full md:w-auto order-2 md:order-1">
                {surahMeta.number > 1 && (
                  <Link
                    href={`/quran/${surahMeta.number - 1}`}
                    scroll={true}
                    className="flex items-center justify-center gap-3 px-8 py-3.5 bg-white dark:bg-main-bg/5 text-main-bg border-2 border-main-bg/20 rounded-2xl font-bold hover:bg-main-bg hover:text-white transition-all duration-300 group shadow-sm active:scale-95"
                  >
                    <FaChevronRight className="transition-transform group-hover:translate-x-1" />
                    <span>السورة السابقة</span>
                  </Link>
                )}
              </div>

              {/* Current Surah Info */}
              <div className="flex flex-row items-center gap-8 order-1 md:order-2">
                <div className="flex flex-col items-center gap-1 group">
                  <div className="p-3 bg-main/10 rounded-2xl text-main group-hover:bg-main group-hover:text-white transition-colors duration-500">
                    <FaHashtag size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-400">رقم السورة</span>
                  <span className="text-xl font-black text-main-bg">
                    {surahMeta.number}
                  </span>
                </div>
              </div>

              {/* Next Surah */}
              <div className="w-full md:w-auto order-3">
                {surahMeta.number < 114 ? (
                  <Link
                    href={`/quran/${surahMeta.number + 1}`}
                    scroll={true}
                    className="flex items-center justify-center gap-3 px-8 py-3.5 bg-white dark:bg-main-bg/5 text-main-bg border-2 border-main-bg/20 rounded-2xl font-bold hover:bg-main-bg hover:text-white transition-all duration-300 group shadow-sm active:scale-95"
                  >
                    <span>السورة التالية</span>
                    <FaChevronLeft className="transition-transform group-hover:-translate-x-1" />
                  </Link>
                ) : (
                  <div className="px-6 py-3 opacity-0 hidden md:block select-none">
                    placeholder
                  </div>
                )}
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* ══════════════ Fixed Bottom Player Bar ══════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{ direction: "rtl" }}
      >
        {/* Reciter Dropdown (floats above bar) */}
        {showReciterDropdown && (
          <div
            ref={dropdownRef}
            className="absolute bottom-full right-0 left-0 mx-4 mb-3 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden"
            style={{ maxHeight: "280px" }}
          >
            {/* Search */}
            <div className="p-3 border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-10">
              <input
                type="text"
                value={reciterSearch}
                onChange={(e) => setReciterSearch(e.target.value)}
                placeholder="ابحث عن قارئ..."
                className="w-full px-4 py-2.5 text-sm rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-main/30 transition"
                style={{ direction: "rtl" }}
              />
            </div>
            {/* List */}
            <div className="overflow-y-auto" style={{ maxHeight: "220px" }}>
              {filteredReciters.length === 0 ? (
                <p className="text-center py-4 text-sm text-gray-400">
                  لا توجد نتائج
                </p>
              ) : (
                filteredReciters.map((reciter) => {
                  const isActive = reciter.identifier === selectedReciter;
                  return (
                    <button
                      key={reciter.identifier}
                      onClick={() => handleSelectReciter(reciter.identifier)}
                      className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 text-right transition-all duration-150
                        ${
                          isActive
                            ? "bg-main/10 dark:bg-main/20 text-main dark:text-main font-bold"
                            : "hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      <span className="text-sm leading-relaxed">{reciter.name}</span>
                      {isActive && (
                        <span className="w-2.5 h-2.5 rounded-full bg-main flex-shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Bar */}
        <div
          className="mx-3 mb-3 px-5 py-4 rounded-3xl flex items-center gap-3 shadow-2xl border border-white/10"
          style={{
            background: "rgba(15, 25, 40, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* ── Surah Info ── */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-white/50 text-[10px] font-medium tracking-wide">
              تتلو الآن
            </span>
            <span className="text-white font-bold text-sm truncate leading-tight">
              سورة {surahMeta.name}
            </span>
          </div>

          {/* ── Reciter Selector ── */}
          <button
            onClick={() => setShowReciterDropdown((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all duration-200 flex-shrink-0
              ${
                showReciterDropdown
                  ? "bg-main/30 border-main/50 text-main"
                  : "bg-white/10 border-white/15 text-white/80 hover:bg-white/15 hover:text-white"
              }`}
          >
            <MdMusicNote size={15} className="flex-shrink-0" />
            <span className="text-xs font-semibold max-w-[120px] truncate hidden sm:block">
              {currentReciterName}
            </span>
            <FaChevronDown
              size={10}
              className={`transition-transform duration-200 flex-shrink-0 ${
                showReciterDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* ── Play / Pause Button ── */}
          <button
            onClick={handleTogglePlay}
            disabled={loadingAyahs}
            className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 flex-shrink-0
              ${
                loadingAyahs
                  ? "bg-white/10 cursor-not-allowed"
                  : playingIndex !== null
                  ? "bg-main text-white shadow-lg shadow-main/30 scale-105"
                  : "bg-white text-gray-900 hover:bg-main hover:text-white shadow-md"
              }`}
          >
            {loadingAyahs ? (
              <svg
                className="animate-spin w-5 h-5 text-white/60"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : playingIndex !== null ? (
              <FaPause size={16} />
            ) : (
              <FaPlay size={16} className="mr-[-2px]" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default SurahContainer;
