"use client";

import { Progress } from "@/types/Types";
import AchievementMessage from "./AchievementMessage";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImCheckboxChecked } from "react-icons/im";

interface Juz {
    number: number;
    name: string;
}

const Juzs: React.FC = () => {
    const [juzs, setJuzs] = useState<Juz[]>([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressData, setProgressData] = useState<Progress[]>([]);

    useEffect(() => {
        const savedProgress = localStorage.getItem("juzProgress");
        if (savedProgress) {
            const data = JSON.parse(savedProgress);
            setProgressData(data);
            const percentage = ((data.length / 30) * 100).toFixed(0);
            setProgress(Number(percentage));
        }
    }, []);

    useEffect(() => {
        const loadJuzs = () => {
            setLoading(true);
            setTimeout(() => {
                const parts = Array.from({ length: 30 }, (_, i) => ({
                    number: i + 1,
                    name: `الجزء ${i + 1}`,
                }));
                setJuzs(parts);
                setLoading(false);
            }, 500);
        };

        loadJuzs();
    }, []);

    const handleProgress = (number: number) => {
        let newProgressData;
        const exist = progressData.find(item => item.number === number);

        if (exist) {
            newProgressData = progressData.filter(item => item.number !== number);
        } else {
            newProgressData = [...progressData, { number }];
        }

        const percentage = ((newProgressData.length / 30) * 100).toFixed(0);
        setProgress(Number(percentage));
        setProgressData(newProgressData);
        localStorage.setItem("juzProgress", JSON.stringify(newProgressData));
    };

    const handleReset = () => {
        if (window.confirm("هل أنت متأكد من مسح تقدمك والبدء من جديد؟")) {
            setProgress(0);
            setProgressData([]);
            localStorage.removeItem("juzProgress");
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
                    title="مبارك لك الختم!"
                    message="هنيئاً لك هذا الإنجاز العظيم، لقد أتممت قراءة القرآن الكريم كاملاً. جعل الله هذا العمل في ميزان حسناتك ونوراً لك."
                    onReset={handleReset}
                />
            )}

            {/* Premium Progress Bar (Themed Colors) */}
            <div className="bg-white dark:bg-main/10 p-6 rounded-3xl border border-main/10 shadow-sm transition-all">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-main dark:text-white">إنجازك في الأجزاء</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">لقد أتممت {progressData.length} من أصل 30 جزءاً</p>
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

            {/* Grid of Juzs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {juzs.map((juz: Juz) => {
                    const isCompleted = progressData.some((item) => item.number === juz.number);
                    return (
                        <div
                            key={juz.number}
                            onClick={() => handleProgress(juz.number)}
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
                                        {isCompleted ? <ImCheckboxChecked size={22} className="animate-in zoom-in duration-300" /> : juz.number}
                                    </span>
                                </div>
                                <div>
                                    <h3 className={`text-2xl font-bold transition-colors duration-300 ${isCompleted ? 'text-main' : 'text-main dark:text-gray-100 group-hover:text-main-bg'}`}>
                                        {juz.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans tracking-tight">من أجزاء القرآن الكريم</p>
                                </div>
                            </div>
                            <div className="text-left relative z-10">
                                <p className="text-lg font-bold text-main">{juz.number}</p>
                                <p className="text-[10px] text-gray-400 uppercase font-sans tracking-widest leading-none">رقم</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Juzs;

