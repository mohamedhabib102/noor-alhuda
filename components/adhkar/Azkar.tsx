"use client"
import { Adhkar, AdhkarItem } from "@/types/Types";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import ShareZekr from "@/ui/ShareZekr";
import { getFromIDB, saveToIDB } from "@/lib/idb";

interface AzkarProps {
  list: AdhkarItem[];
  loading: boolean
}

const Azkar: React.FC<AzkarProps> = ({ list, loading }) => {
  const [active, setActive] = useState<string>("أذكار الصباح");
  const [azkar, setAzkar] = useState<Adhkar[]>([]);
  const [selectedZekr, setSelectedZekr] = useState<any>(null);

  useEffect(() => {
    const fetchAzkar = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/adhkar`);
        const data = await res.json();
        setAzkar(data);
        await saveToIDB("adhkar", "all", data);
      } catch (error) {
        console.error("Error fetching adhkar, trying offline cache:", error);
        const cached = await getFromIDB("adhkar", "all");
        if (cached) {
          setAzkar(cached);
        }
      }
    };

    fetchAzkar();
  }, []);

  const handleDecrement = (category: string, zekrId: number) => {
    setAzkar(prevAzkar => prevAzkar.map(cat => {
      if (cat.category === category) {
        const updatedArray = cat.array
          .map(item => {
            if (item.id === zekrId) {
              return { ...item, count: item.count - 1 };
            }
            return item;
          })
          .filter(item => item.count > 0);

        return {
          ...cat,
          array: updatedArray
        };
      }
      return cat;
    }));
  };

  const filterAzkar = azkar.filter((item) => item.category === active);


  const handleShare = (zekr: any, category: string) => {
    setSelectedZekr({ ...zekr, category });
  };


  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-main/5 dark:bg-main-bg/10 rounded-full flex items-center justify-center mx-auto mb-6 text-main animate-spin">
          <AiOutlineLoading3Quarters size={40} />
        </div>
        <h3 className="text-2xl font-black text-main-bg dark:text-gray-100">
          جاري تحميل الأذكار...
        </h3>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ul className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        {list?.map((item) => (
          <li
            onClick={() => setActive(item.title)}
            className={`shrink-0 flex items-center gap-2 px-8 py-3.5 rounded-2xl cursor-pointer border-2 transition-all duration-300 font-bold active:scale-95 shadow-sm
                            ${active === item.title
                ? 'bg-main border-main text-white shadow-main/20'
                : 'bg-white dark:bg-main-bg/10 border-main-bg/10 dark:border-main-bg/20 text-main-bg dark:text-gray-400 hover:border-main/30'
              }`}
            key={item.id}>
            <span className="text-lg whitespace-nowrap">{item.title}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 space-y-6">
        <AnimatePresence mode="wait">
          {filterAzkar.length > 0 && filterAzkar[0].array.length > 0 ? (
            filterAzkar.map((categoryItem) =>
              categoryItem.array.map((zekr) => (
                <motion.div
                  key={zekr.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }} // 🔥 الانيميشن عند الاختفاء
                  transition={{ type: "tween", duration: 0.3 }} // سلس وبسيط للعين
                  className="bg-white dark:bg-main-bg/10 border border-main-bg/10 dark:border-main-bg/20 p-8 rounded-4xl shadow-sm hover:border-main/30 transition-all group"
                >
                  <p className="text-xl md:text-2xl leading-relaxed text-main-bg dark:text-gray-100 font-bold text-right mb-8" dir="rtl">
                    {zekr.text}
                  </p>

                  <div className="flex flex-row-reverse items-center justify-between gap-4">
                    <button
                      onClick={() => handleDecrement(categoryItem.category, zekr.id)}
                      className="flex items-center flex-row-reverse gap-4 bg-main text-white dark:bg-main-bg/20 dark:text-white px-10 py-4 rounded-2xl font-black text-2xl hover:bg-emerald-900 transition-all shadow-lg active:scale-95 border-b-4 border-emerald-950/20"
                    >
                      <span className="min-w-[2ch]">{zekr.count}</span>
                      <BsArrowCounterclockwise size={28} className="transition-transform group-hover:rotate-180 duration-500" />
                    </button>

                    <button
                      onClick={() => handleShare(zekr, categoryItem.category)}
                      className="p-4 bg-main/5 dark:bg-white/5 text-gray-400 hover:text-main dark:hover:text-main rounded-2xl transition-colors border border-transparent hover:border-main/10"
                      title="مشاركة الذكر كصورة"
                    >
                      <FaShare size={22} />
                    </button>
                  </div>
                </motion.div>
              ))
            )
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-24 bg-main/5 dark:bg-main-bg/10 rounded-4xl border border-main/10"
            >
              <div className="w-24 h-24 bg-white dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-main shadow-sm">
                <BsArrowCounterclockwise size={48} className="animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-main-bg dark:text-white mb-2">تقبل الله منك طاعتك</h3>
              <p className="text-gray-500 dark:text-gray-400 font-bold">لقد أتممت جميع أذكار فئة {active}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ShareZekr 
          zekr={selectedZekr} 
          onClose={() => setSelectedZekr(null)} 
      />
    </div>
  );
}

export default Azkar;
