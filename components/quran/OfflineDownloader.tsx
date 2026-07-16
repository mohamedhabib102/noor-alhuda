"use client";

import { useState, useEffect } from "react";
import { FaDownload, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { saveToIDB, getFromIDB } from "@/lib/idb";

const OfflineDownloader = () => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "downloading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkExisting = async () => {
      try {
        const data = await getFromIDB("surahs", "all");
        if (data && data.length > 0) {
          setStatus("success");
          setMessage("المصحف والأذكار محملة بالفعل في جهازك.");
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkExisting();
  }, []);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const startDownload = async () => {
    setDownloading(true);
    setStatus("downloading");
    setProgress(0);
    setMessage("جاري تهيئة التحميل...");

    try {
      // 1. Download reciters
      setMessage("جاري تحميل قائمة القراء...");
      const recitersRes = await fetch("https://api.alquran.cloud/v1/edition?format=audio&language=ar");
      const recitersData = await recitersRes.json();
      await saveToIDB("reciters", "all", recitersData.data || []);

      // 2. Download all surahs meta
      setMessage("جاري تحميل السور...");
      const surahRes = await fetch("https://api.alquran.cloud/v1/surah");
      const surahData = await surahRes.json();
      await saveToIDB("surahs", "all", surahData.data || []);

      // 3. Download Adhkar
      setMessage("جاري تحميل الأذكار...");
      const adhkarCatRes = await fetch(`/api/adhkar?type=category`);
      if (adhkarCatRes.ok) {
        const adhkarCatData = await adhkarCatRes.json();
        await saveToIDB("adhkar-categories", "all", adhkarCatData);
      }
      const adhkarRes = await fetch(`/api/adhkar`);
      if (adhkarRes.ok) {
        const adhkarData = await adhkarRes.json();
        await saveToIDB("adhkar", "all", adhkarData);
      }

      // 4. Download 114 surahs with default reciter (ar.alafasy) and tafsir
      setMessage("جاري تحميل الآيات والتفاسير (برجاء الانتظار)...");
      const totalSurahs = 114;
      
      for (let i = 1; i <= totalSurahs; i++) {
        // Fetch Tafsir
        try {
          const tafsirRes = await fetch(`https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${i}`);
          const tafsirData = await tafsirRes.json();
          await saveToIDB("tafsir", i.toString(), tafsirData.result || []);
        } catch (err) {
          console.warn(`Failed to fetch tafsir for surah ${i}`);
        }

        // Fetch Ayahs with default reciter
        try {
          const ayahsRes = await fetch(`https://api.alquran.cloud/v1/surah/${i}/ar.alafasy`);
          const ayahsData = await ayahsRes.json();
          await saveToIDB("surah-ayahs", `${i}-ar.alafasy`, ayahsData.data?.ayahs || []);
        } catch (err) {
          console.warn(`Failed to fetch ayahs for surah ${i}`);
        }

        setProgress(Math.round((i / totalSurahs) * 100));
        // Small delay to prevent rate-limiting and UI blocking
        await delay(200);
      }

      setStatus("success");
      setMessage("تم تحميل المصحف والأذكار بنجاح! يمكنك الآن التصفح بدون إنترنت.");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("حدث خطأ أثناء التحميل. يرجى التحقق من اتصالك والمحاولة مرة أخرى.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-main/10 border border-main/10 dark:border-main/20 rounded-3xl p-6 shadow-sm mb-10 transition-all" dir="rtl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-right">
        <div className="flex-1 w-full flex flex-row items-center justify-start gap-4">
          <div className="p-4 bg-main/10 rounded-2xl text-main hidden sm:block">
            <FaDownload size={24} />
          </div>
          <div className="text-right w-full">
            <h3 className="text-lg md:text-xl font-bold text-main dark:text-white mb-2">تصفح بدون إنترنت (Offline)</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              يمكنك تحميل المصحف كاملاً (بالتفسير) وكذلك الأذكار لتعمل دون الحاجة للإنترنت.
              <br/>
              <span className="text-xs text-amber-500 font-bold mt-1 inline-block">ملاحظة: التشغيل الصوتي للآيات يتطلب إنترنت. إذا لم تقم بالتحميل، سيتم تخزين السور التي تزورها فقط.</span>
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col gap-3 min-w-[200px]">
          {status === "idle" || status === "error" ? (
            <button
              onClick={startDownload}
              disabled={downloading}
              className="flex items-center justify-center gap-2 bg-main hover:bg-main-bg text-white px-6 py-3 rounded-2xl font-bold transition-colors shadow-lg disabled:opacity-50"
            >
              <FaDownload />
              <span>{status === "error" ? "إعادة المحاولة" : "تحميل الآن"}</span>
            </button>
          ) : status === "downloading" ? (
            <div className="w-full flex flex-col gap-2 bg-gray-50 dark:bg-main-bg/20 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center text-xs font-bold text-main">
                <span>{message}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" dir="ltr">
                <div 
                  className="h-full bg-main transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-6 py-3 rounded-2xl font-bold border border-green-200 dark:border-green-900/50">
              <FaCheckCircle size={20} />
              <span>تم التحميل</span>
            </div>
          )}
        </div>
      </div>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-4 text-center flex items-center justify-center gap-2">
          <FaExclamationTriangle />
          {message}
        </p>
      )}
    </div>
  );
};

export default OfflineDownloader;
