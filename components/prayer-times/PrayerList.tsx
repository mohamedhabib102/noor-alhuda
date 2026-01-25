"use client";

import { useState, useEffect, JSX } from "react";

interface PrayerTime {
    name: string;
    time: string;
    rawTime: string;
    icon: JSX.Element;
}

interface PrayerListProps {
    prayerTimesList: PrayerTime[];
}

const PrayerList: React.FC<PrayerListProps> = ({ prayerTimesList }) => {
    const [nextPrayerIndex, setNextPrayerIndex] = useState<number | null>(null);

    useEffect(() => {
        const calculateNextPrayer = () => {
            const now = new Date(
                new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })
            );

            const ty = now.getFullYear();
            const tm = String(now.getMonth() + 1).padStart(2, '0');
            const td = String(now.getDate()).padStart(2, '0');
            const todayStr = `${ty}-${tm}-${td}`;

            let foundIndex = -1;

            for (let i = 0; i < prayerTimesList.length; i++) {
                const pDate = new Date(
                    new Date(`${todayStr}T${prayerTimesList[i].rawTime}:00`)
                        .toLocaleString("en-US", { timeZone: "Africa/Cairo" })
                );

                if (pDate > now) {
                    foundIndex = i;
                    break;
                }
            }

            if (foundIndex === -1) {
                // Default to first prayer (Fajr) of next day
                setNextPrayerIndex(0);
            } else {
                setNextPrayerIndex(foundIndex);
            }
        };

        calculateNextPrayer();
        const timer = setInterval(calculateNextPrayer, 60000); // Update every minute
        return () => clearInterval(timer);
    }, [prayerTimesList]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {prayerTimesList.map((prayer, index) => (
                <div
                    key={prayer.name}
                    className={`relative p-8 rounded-4xl transition-all duration-500 border-2 ${index === nextPrayerIndex
                        ? "bg-main border-main text-white shadow-2xl shadow-main/20 scale-105 z-10"
                        : "bg-white dark:bg-main-bg/10 border-main-bg/5 dark:border-main-bg/20 text-main-bg dark:text-gray-200"
                        } hover:-translate-y-2 group`}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className={`text-3xl transition-transform duration-500 group-hover:scale-110 ${index === nextPrayerIndex ? "text-white" : "text-main"}`}>
                            {prayer.icon}
                        </div>
                        <span className={`text-sm font-black uppercase tracking-widest ${index === nextPrayerIndex ? "text-white/80" : "text-gray-400"}`}>{prayer.name}</span>
                        <span className="text-3xl font-black tabular-nums">{prayer.time}</span>
                    </div>
                    {index === nextPrayerIndex && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-main-bg text-white text-[10px] font-black rounded-full shadow-lg text-center uppercase tracking-tighter border-2 border-white dark:border-main-bg/20">
                            الصلاة القادمة
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PrayerList;
