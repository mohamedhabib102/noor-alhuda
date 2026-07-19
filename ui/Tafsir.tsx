import { MdClose, MdShare } from "react-icons/md";
import { FaPlay, FaPause, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import ShareAyah from "./ShareAyah";

export interface TafsirData {
    id: number;
    sura: string;
    aya: string;
    arabic_text: string;
    translation: string;
}

interface TafsirProps {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
    tafsir: TafsirData | null;
    onPlay?: () => void;
    isPlaying?: boolean;
    surahName?: string;
    onBookmarkUpdate?: () => void;
}

const Tafsir: React.FC<TafsirProps> = ({ toggle, setToggle, tafsir, onPlay, isPlaying, surahName, onBookmarkUpdate }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [shareAyah, setShareAyah] = useState<{ text: string; numberInSurah: number } | null>(null);

    useEffect(() => {
        if (!tafsir || !toggle) return;
        const saved = localStorage.getItem("quran-bookmarks");
        if (saved) {
            const bookmarks = JSON.parse(saved);
            const exists = bookmarks.some((b: any) => b.sura === tafsir.sura && b.aya === tafsir.aya);
            setIsBookmarked(exists);
        } else {
            setIsBookmarked(false);
        }
    }, [tafsir, toggle]);

    const handleBookmark = () => {
        if (!tafsir) return;
        
        const newBookmark = {
            sura: tafsir.sura,
            surahName: surahName || `سورة ${tafsir.sura}`,
            aya: tafsir.aya,
            arabic_text: tafsir.arabic_text,
            dateAdded: new Date().toISOString()
        };

        const saved = localStorage.getItem("quran-bookmarks");
        let bookmarks = saved ? JSON.parse(saved) : [];

        if (isBookmarked) {
            bookmarks = bookmarks.filter((b: any) => !(b.sura === tafsir.sura && b.aya === tafsir.aya));
            setIsBookmarked(false);
        } else {
            bookmarks.push(newBookmark);
            setIsBookmarked(true);
        }

        localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks));
        onBookmarkUpdate?.();
    };

    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-all duration-300`} onClick={() => setToggle(false)}></div>
            <div className={`${toggle ? "opacity-100 visible scale-100 -translate-x-1/2 -translate-y-1/2" : "opacity-0 invisible scale-95 -translate-x-1/2 -translate-y-1/2"}
        transition-all duration-300 fixed top-1/2 left-1/2 z-[100] lg:w-96 w-10/12 max-h-[80vh] overflow-auto no-scrollbar m-auto bg-white dark:bg-zinc-900 py-8 px-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800`}>
                
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-emerald-100 dark:border-emerald-900/50">
                    <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-red-500 dark:text-gray-200">
                        <MdClose size={24} />
                    </button>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400"> التفسير الميسر </span>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setShareAyah(tafsir ? { text: tafsir.arabic_text, numberInSurah: Number(tafsir.aya) } : null)} className="cursor-pointer transition duration-200 hover:scale-110 text-gray-400 hover:text-main" title="مشاركة الآية كصورة">
                            <MdShare size={22} />
                        </button>
                        <button onClick={handleBookmark} className={`cursor-pointer transition duration-200 hover:scale-110 ${isBookmarked ? 'text-main' : 'text-gray-400 hover:text-main'}`} title="علامة حفظ">
                            {isBookmarked ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
                        </button>
                        {onPlay && (
                             <button onClick={onPlay} className="cursor-pointer transition duration-200 text-emerald-600 hover:scale-110">
                                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                            </button>
                        )}
                    </div>
                </div>

                <div className="text-right space-y-6">
                    <h3 className="font-quran text-2xl md:text-3xl leading-relaxed text-gray-800 dark:text-gray-100 bg-emerald-50/30 dark:bg-emerald-950/20 p-4 rounded-2xl">
                        {tafsir?.arabic_text || "جاري التحميل..."}
                    </h3>

                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-sans text-justify" dir="rtl">
                        {tafsir?.translation}
                    </p>
                </div>
            </div>

            <ShareAyah 
                ayah={shareAyah} 
                surahName={surahName || ""} 
                onClose={() => setShareAyah(null)} 
            />
        </>
    );
}; 

export default Tafsir;