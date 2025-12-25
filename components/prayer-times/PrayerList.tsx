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
                    className={`relative p-6 rounded-3xl transition-all duration-300 border ${index === nextPrayerIndex
                        ? "bg-[#0e582d] border-[#0e582d] text-white shadow-lg shadow-green-900/20"
                        : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200"
                        } hover:-translate-y-2.5`}
                >
                    <div className="flex flex-col items-center gap-3">
                        <div className={`text-2xl ${index === nextPrayerIndex ? "text-white" : "text-[#0e582d]"}`}>
                            {prayer.icon}
                        </div>
                        <span className={`font-bold ${index === nextPrayerIndex ? "text-white" : "text-gray-500"}`}>{prayer.name}</span>
                        <span className="text-2xl font-black tabular-nums">{prayer.time}</span>
                    </div>
                    {index === nextPrayerIndex && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#ab900b] text-white text-[10px] font-bold rounded-full shadow-sm
                        text-center">
                            الصلاة القادمة
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PrayerList;
