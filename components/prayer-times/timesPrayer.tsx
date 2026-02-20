import TimeNow from "@/ui/TimeNow";
import { JSX } from "react";
import { MdDateRange, MdAccessTime } from "react-icons/md";

interface PrayerTime {
    name: string;
    time: string;
    rawTime: string;
    icon: JSX.Element;
}

let errrs: boolean = false;

// Helper to get current time in Egypt (Africa/Cairo)
const getEgyptTime = () => {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
};

const getPrayerTimes = async () => {
    const today = getEgyptTime().toLocaleDateString("en-GB").replaceAll("/", "-");
    const url = `https://api.aladhan.com/v1/timingsByCity/${today}?city=cairo&country=egypt&method=5`;
    try {
        const response = await fetch(url, {
            cache: "no-store"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        errrs = true;
        return null;
    }
}

import PrayerList from "./PrayerList";

const TimesPrayer = async () => {
    const apiData = await getPrayerTimes();

    if (!apiData || !apiData.data) {
        return (
            <div className="w-full text-center py-10 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
                <p className="text-red-600 dark:text-red-400 font-bold">عذراً، حدث خطأ أثناء جلب مواقيت الصلاة. يرجى المحاولة لاحقاً.</p>
            </div>
        );
    }

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
                <div className="bg-white dark:bg-main-bg/10 border border-main-bg/5 dark:border-main-bg/20 p-8 rounded-4xl shadow-2xl flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-main-bg/10 dark:bg-main-bg/20 rounded-2xl text-main-bg">
                                <MdDateRange size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-main-bg opacity-70 uppercase tracking-[0.2em]">تاريخ اليوم</p>
                                <h3 className="text-xl font-black text-main-bg dark:text-white">التقويم الهجري والميلادي</h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-main/5 dark:bg-main/10 rounded-2xl border border-main/10 dark:border-main/20 group">
                                <span className="text-[10px] font-black text-main uppercase block mb-1">الهجري</span>
                                <span className="text-xl font-black text-main-bg dark:text-gray-100 group-hover:text-main transition-colors whitespace-nowrap">
                                    {hijriDateDisplay}
                                </span>
                            </div>
                            <div className="p-4 bg-main-bg/5 dark:bg-white/5 rounded-2xl border border-main-bg/5 dark:border-white/10 group">
                                <span className="text-[10px] font-black text-gray-400 uppercase block mb-1">الميلادي</span>
                                <span className="text-lg font-bold text-gray-500 dark:text-gray-400 group-hover:text-main-bg dark:group-hover:text-white transition-colors">
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
