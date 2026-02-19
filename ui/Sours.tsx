"use client";

import { Progress, Surah } from "@/types/Types";
import AchievementMessage from "./AchievementMessage";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImCheckboxChecked } from "react-icons/im";

const Surahs: React.FC = () => {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressData, setProgressData] = useState<Progress[]>([]);

    useEffect(() => {
        const savedProgress = localStorage.getItem("progress");
        if (savedProgress) {
            const data = JSON.parse(savedProgress);
            setProgressData(data);
            const percentage = ((data.length / 114) * 100).toFixed(0);
            setProgress(Number(percentage));
        }
    }, []);

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://api.alquran.cloud/v1/surah");
                const data = await res.json();
                setSurahs(data.data);
            } catch (error) {
                console.error("Error fetching surahs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSurahs();
    }, []);

    const handleProgress = (number: number) => {
        let newProgressData;
        const exist = progressData.find(item => item.number === number);

        if (exist) {
            newProgressData = progressData.filter(item => item.number !== number);
        } else {
            newProgressData = [...progressData, { number }];
        }

        const percentage = ((newProgressData.length / 114) * 100).toFixed(0);
        setProgress(Number(percentage));
        setProgressData(newProgressData);
        localStorage.setItem("progress", JSON.stringify(newProgressData));
    };

    const handleReset = () => {
        if (window.confirm("هل أنت متأكد من مسح تقدمك في السور والبدء من جديد؟")) {
            setProgress(0);
            setProgressData([]);
            localStorage.removeItem("progress");
        }
    };

    if (loading) {
        return (
            <AiOutlineLoading3Quarters
                size={50}
                className="mt-20 mx-auto text-main animate-spin"
            />
        );
    }

    return (
        <div dir="rtl" className="space-y-8">
            {/* Achievement Message */}
            {progress === 100 && (
                <AchievementMessage
                    title="هنيئاً لك ختم السور!"
                    message="لقد أتممت قراءة جميع سور القرآن الكريم (114 سورة). تقبل الله منك صالح الأعمال وجعلها نوراً لك في الدنيا والآخرة."
                    onReset={handleReset}
                />
            )}

            {/* Premium Progress Bar (Themed Colors) */}
            <div className="bg-white dark:bg-main/10 p-6 rounded-3xl border border-main/10 shadow-sm transition-all">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-main dark:text-white">إنجازك في السور</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">لقد أتممت {progressData.length} من أصل 114 سورة</p>
                    </div>
                    <span className="text-3xl font-black text-main italic">{progress}%</span>
                </div>
                <div className="w-full h-4 bg-main/10 dark:bg-main/20 rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-main-bg rounded-full transition-all duration-700 ease-out relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Grid of Surahs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {surahs.map((sur: Surah) => {
                    const isCompleted = progressData.some((item) => item.number === sur.number);
                    return (
                        <div
                            key={sur.number}
                            onClick={() => handleProgress(sur.number)}
                            className={`group font-quran flex items-center justify-between p-5 rounded-2xl transition-all duration-300 relative overflow-hidden cursor-pointer border
                                ${isCompleted
                                    ? 'bg-main/5 border-main/30 shadow-md'
                                    : 'bg-white dark:bg-main/5 border-main/10 dark:border-main/20 hover:border-main-bg hover:shadow-lg'
                                }`}
                        >
                            {/* Subtle decoration */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-main/5 dark:bg-main/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />

                            <div className="flex items-center gap-5 relative z-10">
                                <div
                                    className={`w-12 h-12 flex justify-center items-center text-lg font-bold rounded-xl rotate-45 transition-all duration-300 shadow-inner
                                        ${isCompleted
                                            ? 'bg-main text-white'
                                            : 'bg-main/10 dark:bg-main/20 text-main group-hover:bg-main group-hover:text-white'
                                        }`}
                                >
                                    <span className="-rotate-45">
                                        {isCompleted ? <ImCheckboxChecked size={22} className="animate-in zoom-in duration-300" /> : sur.number}
                                    </span>
                                </div>
                                <div>
                                    <h3 className={`text-2xl font-bold transition-colors duration-300 ${isCompleted ? 'text-main' : 'text-main dark:text-gray-100 group-hover:text-main-bg'}`}>
                                        {sur.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans tracking-tight">{sur.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
                                </div>
                            </div>
                            <div className="text-left relative z-10">
                                <p className="text-lg font-bold text-main">{sur.numberOfAyahs}</p>
                                <p className="text-[10px] text-gray-400 uppercase font-sans tracking-widest leading-none">آيات</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Surahs;

