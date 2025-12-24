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



const getPrayerTimes = async () => {
    const today = new Date().toLocaleDateString("en-GB").replaceAll("/", "-");
    const url = `https://api.aladhan.com/v1/timingsByCity/${today}?city=cairo&country=egypt&method=5`;
    const response = await fetch(url, {
        next: {
            revalidate: 60 * 60 * 6, // 6 hours to build cache
        }
    });
    const data = await response.json();
    return data;
}

const TimesPrayer = async () => {
    const apiData = await getPrayerTimes();
    const timings = apiData.data.timings;
    const hijri = apiData.data.date.hijri;

    const formatTo12Hour = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number)
        const date = new Date()
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

    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const gregorianDate = currentTime.toLocaleDateString("ar-EG", {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    });


    const getNextPrayerIndex = () => {
        const now = new Date();
        for (let i = 0; i < prayerTimesList.length; i++) {
            const [hours, minutes] = prayerTimesList[i].rawTime.split(":").map(Number);
            const prayerDate = new Date();
            prayerDate.setHours(hours, minutes, 0, 0);

            if (prayerDate > now) {
                return i;
            }
        }
        return 0; // Default to Fajr if all prayers for today have passed
    };

    const nextPrayerIndex = getNextPrayerIndex();

    const getNextPrayerDate = () => {
        const now = new Date();
        const nextPrayer = prayerTimesList[nextPrayerIndex];
        const [hours, minutes] = nextPrayer.rawTime.split(":").map(Number);

        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0, 0);

        if (prayerDate < now) {
            prayerDate.setDate(prayerDate.getDate() + 1);
        }
        return prayerDate;
    };

    const nextPrayerDate = getNextPrayerDate();





    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 px-4 font-sans text-right" dir="rtl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Time Card */}
                <TimeNow
                    nextPrayerTime={nextPrayerDate.getTime()}
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
        </div>
    );
};


export default TimesPrayer;
