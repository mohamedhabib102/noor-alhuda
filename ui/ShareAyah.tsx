"use client";

import { useRef, useState } from "react";
import { toPng, toBlob } from "html-to-image";
import { MdClose, MdShare } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ShareAyahProps {
  ayah: {
    text: string;
    numberInSurah: number;
  } | null;
  surahName: string;
  onClose: () => void;
}

const ShareAyah: React.FC<ShareAyahProps> = ({ ayah, surahName, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const isOpen = ayah !== null;

  const handleShareImage = async () => {
    if (!cardRef.current || !ayah) return;
    setGenerating(true);
    try {
      const blob = await toBlob(cardRef.current, {
        cacheBust: true,
        style: { borderRadius: "0" },
      });

      if (!blob) throw new Error("Failed to generate image");
      const file = new File([blob], `ayah-${surahName}-${ayah.numberInSurah}-${Date.now()}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "القرآن الكريم - تطبيق نور الهدى",
          text: `﴿ ${ayah.text} ﴾ [سورة ${surahName}: آية ${ayah.numberInSurah}]`,
        });
      } else {
        const dataUrl = await toPng(cardRef.current);
        const link = document.createElement("a");
        link.download = `ayah-${surahName}-${ayah.numberInSurah}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    } finally {
      setGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } fixed top-0 left-0 inset-0 z-[120] bg-black/40 backdrop-blur-sm transition-all duration-300`}
        onClick={onClose}
      ></div>

      {/* Content Container */}
      <div
        className={`${
          isOpen
            ? "opacity-100 visible scale-100 -translate-x-1/2 -translate-y-1/2"
            : "opacity-0 invisible scale-95 -translate-x-1/2 -translate-y-1/2"
        } transition-all duration-300 fixed top-1/2 left-1/2 z-[135] lg:w-[480px] w-11/12 max-h-[90vh] overflow-auto no-scrollbar m-auto bg-background dark:bg-zinc-900 py-4 px-4 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800`}
      >
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-main/10">
          <button
            onClick={onClose}
            className="cursor-pointer transition duration-200 hover:text-red-500 text-gray-400"
          >
            <MdClose size={22} />
          </button>
          <span className="text-[12px] font-bold text-main/60 dark:text-white">
            مشاركة الآية كصورة
          </span>
          <div className="w-8"></div>
        </div>

        <div className="space-y-4">
          {/* RENDER CARD */}
          <div className="relative rounded-2xl overflow-hidden border border-main/15 bg-white dark:bg-black/20 p-1">
            <div
              ref={cardRef}
              className="bg-background dark:bg-zinc-900 p-6 flex flex-col items-center justify-center min-h-[280px] relative text-center border-4 border-double border-main-bg/30 rounded-xl"
              style={{ direction: "rtl" }}
            >
              {/* Islamic Pattern Header */}
              <div className="flex flex-col items-center mb-4">
                <img src="/logo.svg" alt="Nour Al-Huda" className="w-12 h-12 opacity-90" />
                <span className="text-[10px] text-main-bg font-bold mt-1 tracking-wider">نور الهدى</span>
              </div>

              {/* Ayah text */}
              <p
                className="font-quran text-3xl md:text-4xl leading-normal text-foreground dark:text-white text-center mb-6 px-4 font-normal w-full select-none"
                dir="rtl"
              >
                {ayah.text}
              </p>

              {/* Info Frame / Bordered Box */}
              <div className="mt-auto w-full pt-4 border-t border-dashed border-main/10 flex justify-between items-center text-main font-bold">
                <span className="text-[12px] text-main-bg">سورة {surahName}</span>
                <span className="text-[12px] bg-main/5 dark:bg-main/20 px-3 py-1 rounded-full text-main">
                  الآية {ayah.numberInSurah}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleShareImage}
            disabled={generating}
            className="w-full bg-main text-white py-3.5 rounded-xl font-bold text-lg shadow-md hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {generating ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={20} />
            ) : (
              <>
                <MdShare size={20} />
                <span>مشاركة الآن</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ShareAyah;
