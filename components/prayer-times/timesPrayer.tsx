import TimeNow from "@/ui/TimeNow";
import { JSX } from "react";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { MdDateRange, MdAccessTime } from "react-icons/md";

interface PrayerTime {
    name: string;
    time: string;
    rawTime: string;
    icon: JSX.Element;
}

// Helper to get current time in Egypt (Africa/Cairo)
const getEgyptTime = () => {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
};

const getPrayerTimes = async () => {
    const today = getEgyptTime().toLocaleDateString("en-GB").replaceAll("/", "-");
    const url = `https://api.aladhan.com/v1/timingsByCity/${today}?city=cairo&country=egypt&method=5`;
    const response = await fetch(url, {
        cache: "no-store"
    });
    const data = await response.json();
    return data;
}

import PrayerList from "./PrayerList";

const TimesPrayer = async () => {
    const apiData = await getPrayerTimes();
    const timings = apiData.data.timings;
    const hijri = apiData.data.date.hijri;

    const formatTo12Hour = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number)
        const date = getEgyptTime();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    const prayerTimesList: PrayerTime[] = [
        { name: "الفجر", time: formatTo12Hour(timings.Fajr), rawTime: timings.Fajr, icon: <MdAccessTime /> },
        { name: "الشروق", time: formatTo12Hour(timings.Sunrise), rawTime: timings.Sunrise, icon: <MdAccessTime /> },
        { name: "الظهر", time: formatTo12Hour(timings.Dhuhr), rawTime: timings.Dhuhr, icon: <MdAccessTime /> },
        { name: "العصر", time: formatTo12Hour(timings.Asr), rawTime: timings.Asr, icon: <MdAccessTime /> },
        { name: "المغرب", time: formatTo12Hour(timings.Maghrib), rawTime: timings.Maghrib, icon: <MdAccessTime /> },
        { name: "العشاء", time: formatTo12Hour(timings.Isha), rawTime: timings.Isha, icon: <MdAccessTime /> },
    ];

    const hijriDateDisplay = `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`;
    const currentTimeAtEgypt = getEgyptTime();

    const timeString = currentTimeAtEgypt.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const gregorianDate = currentTimeAtEgypt.toLocaleDateString("ar-EG", {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 px-4 font-sans text-right" dir="rtl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Time Card */}
                <TimeNow
                    prayerTimes={prayerTimesList.map(p => ({ name: p.name, rawTime: p.rawTime }))}
                    timeString={timeString}
                />
                {/* Date Card */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-lg shadow-xl flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl text-[#ab900b]">
                                <MdDateRange size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">تاريخ اليوم</p>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">التقويم الهجري والميلادي</h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-green-50/50 dark:bg-green-900/10 rounded-2xl border border-green-100/50 dark:border-green-900/20 group">
                                <span className="text-[10px] font-black text-[#0e582d] uppercase block mb-1">الهجري</span>
                                <span className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#0e582d] transition-colors whitespace-nowrap">
                                    {hijriDateDisplay}
                                </span>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 group">
                                <span className="text-[10px] font-black text-gray-400 uppercase block mb-1">الميلادي</span>
                                <span className="text-lg font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    {gregorianDate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prayer Times Grid */}
            <PrayerList prayerTimesList={prayerTimesList} />
        </div>
    );
};

export default TimesPrayer;
