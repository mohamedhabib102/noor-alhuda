"use client";

import { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";

interface TimeNowProps {
    timeString?: string;
    prayerTimes: { name: string; rawTime: string }[];
}

const TimeNow: React.FC<TimeNowProps> = ({
    timeString,
    prayerTimes,
}) => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState<[number, number, number]>([0, 0, 0]);

    useEffect(() => {
        const update = () => {
            const now = new Date(
                new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })
            );
            setCurrentTime(now);

            // Find next prayer using today's date
            let nextPrayerDate: Date | null = null;
            const ty = now.getFullYear();
            const tm = String(now.getMonth() + 1).padStart(2, '0');
            const td = String(now.getDate()).padStart(2, '0');
            const todayStr = `${ty}-${tm}-${td}`;

            for (const prayer of prayerTimes) {
                const pDate = new Date(
                    new Date(`${todayStr}T${prayer.rawTime}:00`)
                        .toLocaleString("en-US", { timeZone: "Africa/Cairo" })
                );
                if (pDate > now) {
                    nextPrayerDate = pDate;
                    break;
                }
            }

            // If no prayer found today, next one is Fajr tomorrow
            if (!nextPrayerDate && prayerTimes.length > 0) {
                const tomorrow = new Date(now);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const nty = tomorrow.getFullYear();
                const ntm = String(tomorrow.getMonth() + 1).padStart(2, '0');
                const ntd = String(tomorrow.getDate()).padStart(2, '0');
                const tomorrowStr = `${nty}-${ntm}-${ntd}`;
                nextPrayerDate = new Date(
                    new Date(`${tomorrowStr}T${prayerTimes[0].rawTime}:00`)
                        .toLocaleString("en-US", { timeZone: "Africa/Cairo" })
                );
            }

            if (nextPrayerDate) {
                const diffMs = nextPrayerDate.getTime() - now.getTime();
                if (diffMs > 0) {
                    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

                    // Format as HH:MM:SS with localization
                    const formatted = [diffHrs, diffMins, diffSecs]
                        .map(v => v.toLocaleString("ar-EG", { minimumIntegerDigits: 2, useGrouping: false }))
                        .join(':');
                    setTimeLeft([diffHrs, diffMins, diffSecs]);
                } else {
                    setTimeLeft([0, 0, 0]);
                }
            }
        };

        update(); // Initial call
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, [prayerTimes]);

    // Display formatted time (only on client after mount)
    const timeDisplay = currentTime
        ? currentTime.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        })
        : timeString || "--:--:--";

    return (
        <div className="lg:col-span-2 relative overflow-hidden bg-linear-to-br from-main to-emerald-950 p-10 rounded-4xl text-white shadow-2xl border border-main/20">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-5 -mr-20 -mt-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-main-bg opacity-10 -ml-10 -mb-10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2 opacity-80">
                        <IoLocationOutline className="text-xl" />
                        <span className="text-sm font-medium">  مواقيت الصلاة مصر/القاهرة  </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter tabular-nums drop-shadow-lg">
                        {timeDisplay}
                    </h2>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 border-t md:border-t-0 md:border-r border-white/20 pt-6 md:pt-0 md:pr-10 mt-6 md:mt-0">
                    <span className="text-xs uppercase tracking-[0.2em] opacity-80 font-black">باقي على الأذان التالي</span>
                    <span className="text-4xl font-black text-main-bg tabular-nums drop-shadow-sm">
                        {`${timeLeft[0]}:${timeLeft[1]}:${timeLeft[2]}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TimeNow;