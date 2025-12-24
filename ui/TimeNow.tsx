"use client";

import { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";

const TimeNow: React.FC<{ timeString?: string; nextPrayerTime?: number }> = ({
    timeString,
    nextPrayerTime,
}) => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>("--:--:--");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setCurrentTime(now);

            if (nextPrayerTime) {
                const diffMs = nextPrayerTime - now.getTime();
                if (diffMs > 0) {
                    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

                    // Format as HH:MM:SS
                    const formatted = [diffHrs, diffMins, diffSecs]
                        .map(v => v.toString().padStart(2, '0'))
                        .join(':');
                    setTimeLeft(formatted);
                } else {
                    setTimeLeft("00:00:00");
                }
            }
        };

        update(); // Initial call
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, [nextPrayerTime]);

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
        <div className="lg:col-span-2 relative overflow-hidden bg-linear-to-br from-[#0e582d] to-[#0a4524] p-8 rounded-lg text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 -mr-20 -mt-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#ab900b] opacity-10 -ml-10 -mb-10 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2 opacity-80">
                        <IoLocationOutline className="text-xl" />
                        <span className="text-sm font-medium">مواقيت الصلاة حسب موقعك الحالي</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter tabular-nums drop-shadow-lg">
                        {timeDisplay}
                    </h2>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 border-t md:border-t-0 md:border-r border-white/20 pt-4 md:pt-0 md:pr-6 mt-4 md:mt-0">
                    <span className="text-sm uppercase tracking-widest opacity-70 font-bold">باقي على الأذان التالي</span>
                    <span className="text-2xl font-bold text-[#ab900b] tabular-nums">
                        {timeLeft}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TimeNow;