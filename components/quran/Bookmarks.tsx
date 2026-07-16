"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash, FaBookmark } from "react-icons/fa";
import { useToast } from "@/ui/Toast";

interface Bookmark {
  sura: string;
  surahName: string;
  aya: string;
  arabic_text: string;
  dateAdded: string;
}

const Bookmarks: React.FC = () => {
  const { showToast } = useToast();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("quran-bookmarks");
    if (saved) {
      // Sort by date descending
      const parsed = JSON.parse(saved) as Bookmark[];
      parsed.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      setBookmarks(parsed);
    }
  }, []);

  const handleDelete = (sura: string, aya: string) => {
    const newBookmarks = bookmarks.filter((b) => !(b.sura === sura && b.aya === aya));
    setBookmarks(newBookmarks);
    localStorage.setItem("quran-bookmarks", JSON.stringify(newBookmarks));
    showToast("تم حذف العلامة بنجاح", "success");
  };

  if (!mounted) {
    return <div className="text-center py-20 text-main font-bold">جاري التحميل...</div>;
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-24 bg-main/5 dark:bg-main-bg/10 rounded-4xl border border-main/10 flex flex-col items-center">
        <FaBookmark size={48} className="text-main/30 mb-6" />
        <h3 className="text-2xl font-black text-main-bg dark:text-white mb-2">لا توجد علامات محفوظة</h3>
        <p className="text-gray-500 dark:text-gray-400 font-bold">يمكنك حفظ أي آية بالضغط على علامة الحفظ في نافذة التفسير.</p>
        <Link 
          href="/quran" 
          className="mt-6 px-6 py-3 bg-main text-white rounded-2xl font-bold shadow-lg hover:bg-main-bg transition-colors inline-block"
        >
          تصفح القرآن
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
      {bookmarks.map((b, index) => (
        <div key={index} className="bg-white dark:bg-main/5 border border-main/10 dark:border-main/20 p-6 rounded-3xl shadow-sm hover:border-main-bg dark:hover:border-main/40 transition-all group flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <Link href={`/quran/${b.sura}#ayah-${b.aya}`} className="hover:text-main transition-colors">
                <h3 className="text-xl font-bold text-main dark:text-white flex items-center gap-2">
                  <FaBookmark className="text-main/50" size={16} />
                  {b.surahName} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(آية {b.aya})</span>
                </h3>
              </Link>
              <button 
                onClick={() => handleDelete(b.sura, b.aya)}
                className="text-red-400 hover:text-red-600 p-2 rounded-xl bg-red-50 dark:bg-red-900/10 transition-colors"
                title="حذف العلامة"
              >
                <FaTrash />
              </button>
            </div>
            
            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 font-quran mb-6 text-right">
              {b.arabic_text}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs text-gray-400 font-sans">
              تم الحفظ: {new Date(b.dateAdded).toLocaleDateString("ar-EG", { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <Link 
              href={`/quran/${b.sura}#ayah-${b.aya}`}
              className="text-sm font-bold text-main hover:text-main-bg transition-colors"
            >
              الذهاب للسورة ←
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
