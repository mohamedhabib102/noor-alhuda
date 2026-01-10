"use client"
import { Adhkar, AdhkarItem } from "@/types/Types";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface AzkarProps {
    list: AdhkarItem[];
    loading: boolean
}

const Azkar: React.FC<AzkarProps> = ({ list, loading }) => {
    const [active, setActive] = useState<string>("أذكار الصباح");
    const [azkar, setAzkar] = useState<Adhkar[]>([]);

    useEffect(() => {
        const fetchAzkar = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/adhkar`);
                const data = await res.json();
                setAzkar(data);
            } catch (error) {
                console.log(error);
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
    

    const handleShare = async (zekrText: string) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "أذكار المسلم",
                    text: zekrText + "\n\n📌 من موقع أذكار المسلم",
                    url: "https://nour-alhud.vercel.app/"
                });
            } catch (error) {
                console.log("تم إلغاء المشاركة", error);
            }
        } else {
            alert("خاصية المشاركة غير مدعومة في متصفحك");
        }
    };


    if (loading){
       return (
         <div className="text-center py-20">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600
             animate-spin">
                <AiOutlineLoading3Quarters size={40} />
            </div>
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100"> 
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
                        className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl cursor-pointer border-2 ${active === item.title
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                            : 'bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-emerald-200'
                            }`}
                        key={item.id}>
                        <span className="font-bold whitespace-nowrap">{item.title}</span>
                    </li>
                ))}
            </ul>

         <div className="mt-10 space-y-6">
           <AnimatePresence mode="wait">
             {filterAzkar.length > 0 && filterAzkar[0].array.length > 0 ? (
               filterAzkar.map((categoryItem) =>
                 categoryItem.array.map((zekr, index) => (
                   <motion.div
                     key={zekr.id} 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ x: 20, opacity: 0}} // 🔥 الانيميشن عند الاختفاء
                     transition={{ type: "tween", duration: 0.3 }} // سلس وبسيط للعين
                     className="farmer not-even:group bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm hover:border-emerald-100 dark:hover:border-emerald-900"
                   >
                     <p className="text-xl md:text-2xl leading-relaxed text-zinc-800 dark:text-zinc-100 font-medium text-right mb-6" dir="rtl">
                       {zekr.text}
                     </p>
         
                     <div className="flex flex-row-reverse items-center justify-between">
                       <button
                         onClick={() => handleDecrement(categoryItem.category, zekr.id)}
                         className="flex items-center flex-row-reverse gap-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-8 py-3 rounded-2xl font-black text-xl hover:bg-emerald-600 hover:text-white"
                       >
                         <span className="min-w-[2ch]">{zekr.count}</span>
                         <BsArrowCounterclockwise size={24} />
                       </button>
         
                       <button
                         onClick={() => handleShare(zekr.text)}
                         className="p-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-2xl"
                         title="مشاركة الذكر"
                       >
                         <FaShare size={20} />
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
                 className="text-center py-20"
               >
                 <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                   <BsArrowCounterclockwise size={40} />
                 </div>
                 <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">تقبل الله منك طاعتك</h3>
                 <p className="text-zinc-500 mt-2">لقد أتممت جميع أذكار فئة {active}</p>
               </motion.div>
             )}
           </AnimatePresence>
         </div>

        </div>
    );
}

export default Azkar;