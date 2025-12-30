"use client"
import React, { useState, useEffect } from "react";
import { IconType } from "react-icons";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import {
    BsFillMoonStarsFill,
    BsStars,
    BsFillCalendarCheckFill,
    BsCloudSunFill
} from "react-icons/bs";
import {
    GiKneeling,
    GiPrayerBeads,
    GiPrayer,
    GiHeartOrgan,
    GiStarShuriken
} from "react-icons/gi";
import {
    FaHandsPraying,
    FaQuoteRight,
    FaMosque
} from "react-icons/fa6";
import { motion } from "framer-motion";

// 1. Daily Spiritual Messages Data
interface SpiritualMessage {
    title: string;
    text: string;
    author: string;
    icon?: IconType;
}

const dailySpiritualMessages: SpiritualMessage[] = [
    {
        title: "رسالة الصدق",
        text: "إن الله لا ينظر إلى صوركم وأموالكم، ولكن ينظر إلى قلوبكم وأعمالكم.",
        author: "حديث شريف"
    },
    {
        title: "رسالة التوكل",
        text: "من توكل على الله كفاه، ومن اعتصم بالله نجا، ومن فوض أمره إلى الله هداه.",
        author: "كلمات إيمانية"
    },
    {
        title: "رسالة الأمل",
        text: "لا تحزن إن الله معنا؛ قوة اليقين بالله تُبدد ظلام اليأس.",
        author: "نفحات الهدى"
    },
    {
        title: "رسالة الشكر",
        text: "لئن شكرتم لأزيدنكم؛ الشكر قيد النعم وسبيل الزيادة والمحبة.",
        author: "وعد رباني"
    },
    {
        title: "رسالة الاستغفار",
        text: "طوبى لمن وجد في صحيفته استغفاراً كثيراً، فإنه يمحو الذنوب ويبسط الأرزاق.",
        author: "أدب النبوة"
    }
];

const fridayMessage: SpiritualMessage = {
    title: "سنة الجمعة",
    text: "نورٌ ما بين الجمعتين؛ لا تنسَ قراءة سورة الكهف والصلاة والسلام على رسول الله ﷺ.",
    author: "يوم الجمعة",
    icon: FaMosque
};

// 2. Hijri Months Informational Data
interface HijriMonthContent {
    name: string;
    title: string;
    desc: string;
    icon: IconType;
}

const hijriMonthsContent: Record<number, HijriMonthContent> = {
  1: {
    name: "محرم",
    title: "فاتحة العام والطاعة",
    desc: "شهر الله المحرم، وهو أحد الأشهر الحرم التي عظمها الله.",
    icon: FaMosque
  },
  2: {
    name: "صفر",
    title: "العمل بلا تشاؤم",
    desc: "شهر من شهور السنة الهجرية، نتقرب فيه إلى الله بالطاعات.",
    icon: GiStarShuriken
  },
  3: {
    name: "ربيع الأول",
    title: "شهر ميلاد الرحمة",
    desc: "فيه ولد الحبيب المصطفى صلى الله عليه وسلم، رحمة للعالمين.",
    icon: FaMosque
  },
  4: {
    name: "ربيع الثاني",
    title: "دوام الذكر والاقتداء",
    desc: "أيام مباركة نملأها بذكر الله تعالى وشكره على نعمه.",
    icon: BsStars
  },
  5: {
    name: "جمادى الأولى",
    title: "الثبات على الطاعة",
    desc: "الصبر والعمل الصالح هما زاد المؤمن في كل شهر.",
    icon: GiHeartOrgan
  },
  6: {
    name: "جمادى الآخر",
    title: "الاعتماد على الله",
    desc: "ثق بالله وأقبل عليه بقلبك في كل وقت حين.",
    icon: GiPrayerBeads
  },
  7: {
    name: "رجب",
    title: "شهر التعظيم والاستعداد",
    desc: "رجب شهر الاستعداد لرمضان، فازرع فيه بذور الخير.",
    icon: BsStars
  },
  8: {
    name: "شعبان",
    title: "تهيئة القلوب للأجر",
    desc: "تُرفع فيه الأعمال إلى الله، فاجعل عملك طاعة وإخلاصاً.",
    icon: BsCloudSunFill
  },
  9: {
    name: "رمضان",
    title: "موسم القرب والمغفرة",
    desc: "خير الشهور، فيه ليلة القدر التي هي خير من ألف شهر.",
    icon: BsFillMoonStarsFill
  },
  10: {
    name: "شوال",
    title: "الاستمرار بعد الطاعة",
    desc: "فيه عيد الفطر السعيد، وصيام الست من شوال كصيام الدهر.",
    icon: BsStars
  },
  11: {
    name: "ذو القعدة",
    title: "السلام والاستعداد للحج",
    desc: "أحد الأشهر الحرم المعظمة، نستعد فيه لرحلة الحج العظيمة.",
    icon: GiPrayer
  },
  12: {
    name: "ذو الحجة",
    title: "ذروة القرب والتضحية",
    desc: "أفضل أيام الدنيا، فيها الحج وعيد الأضحى والوقوف بعرفة.",
    icon: GiKneeling
  }
};


const News: React.FC = () => {
    const [hijriMonth, setHijriMonth] = useState<number | null>(null);
    const [hijriMonthName, setHijriMonthName] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const [dailyMsg, setDailyMsg] = useState<SpiritualMessage | null>(null);

    useEffect(() => {
        const today = new Date();
        const isFriday = today.getDay() === 5;

        // 1. Set Daily Message
        if (isFriday) {
            setDailyMsg(fridayMessage);
        } else {
            const dayOfMonth = today.getDate();
            const index = dayOfMonth % dailySpiritualMessages.length;
            setDailyMsg(dailySpiritualMessages[index]);
        }

        // 2. Fetch Hijri Date
        const fetchHijriDate = async () => {
            try {
                const todayStr = today.toLocaleDateString("en-GB").replaceAll("/", "-");
                const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${todayStr}?city=cairo&country=egypt&method=5`);
                const data = await response.json();
                if (data.data) {
                    setHijriMonth(parseInt(data.data.date.hijri.month.number));
                    setHijriMonthName(data.data.date.hijri.month.ar);
                }
            } catch (error) {
                console.error("Error fetching Hijri date:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHijriDate();
    }, []);

    const monthContent = hijriMonth ? hijriMonthsContent[hijriMonth] : null;

    return (
        <section className="lg:py-16 py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
            <CustomContainer>
                <CustomTitle
                    title="نفحات إيمانية"
                    description="رسائل يومية تلامس قلبك ونفحات الشهور العربية"
                    success={false}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-12">

                    {/* --- Section 1: Daily Spiritual Message --- */}
                    <div className="lg:col-span-8 order-2 lg:order-1">
                        <div className="flex items-center mb-8">
                            <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                                <FaQuoteRight size={28} />
                            </div>
                            <h3 className="lg:text-3xl text-2xl font-bold dark:text-white">رسالة اليوم</h3>
                        </div>

                        {dailyMsg && (
                            <div
                                className="relative h-[210px] md:h-[320px] bg-emerald-800/90 dark:bg-emerald-950/40 border border-emerald-500/20 rounded-lg md:rounded-lg p-4 md:p-8 text-white overflow-hidden shadow-xl flex flex-col justify-center text-center group"
                            >
                                <div className="relative z-10 space-y-1 md:space-y-3">
                                    <div className="w-8 h-8 md:w-12 md:h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-1 border border-white/20 transition-transform group-hover:scale-110">
                                        {dailyMsg.icon ? <dailyMsg.icon size={18} className="md:size-[24px]" /> : <FaHandsPraying size={18} className="md:size-[24px]" />}
                                    </div>

                                    <span className="inline-block px-2 py-0.5 bg-black/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                                        {dailyMsg.title}
                                    </span>

                                    <h4 className="text-lg md:text-2xl font-black leading-tight max-w-2xl mx-auto italic text-white/90">
                                        &quot;{dailyMsg.text}&quot;
                                    </h4>

                                    <div className="w-8 md:w-12 h-1 bg-white/40 mx-auto rounded-full" />

                                    <p className="text-xs md:text-base font-medium text-white/60">
                                        — {dailyMsg.author}
                                    </p>
                                </div>

                                {/* Abstract Decorations */}
                                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute top-10 right-10 opacity-10 rotate-12">
                                    <FaQuoteRight size={200} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- Section 2: Hijri Month Feature (Dynamic API) --- */}
                    <div className="lg:col-span-4 order-1 lg:order-2">
                        <div className="flex items-center mb-8">
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                <BsFillCalendarCheckFill size={28} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold dark:text-white">حدث الآن</h3>
                        </div>

                        {!loading && monthContent ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative h-[210px] md:h-[320px] bg-amber-800/90 dark:bg-amber-950/40 border border-amber-400/20 rounded-lg md:rounded-lg p-4 md:p-8 shadow-xl overflow-hidden text-white flex flex-col justify-between group"
                            >
                                <div className="relative z-10">
                                    <div className="mb-2 md:mb-3 p-2 md:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg inline-block transition-transform group-hover:rotate-12">
                                        <monthContent.icon size={20} className="md:size-[32px] text-white" />
                                    </div>

                                    <div className="space-y-1 md:space-y-2">
                                        <span className="inline-block px-2 py-0.5 bg-black/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase">
                                            شهر {hijriMonthName || monthContent.name}
                                        </span>
                                        <h4 className="text-lg font-bold text-white">{monthContent.title}</h4>
                                        <p className="text-sm md:text-base text-white/90 leading-snug pt-0.5 md:pt-1">
                                            {monthContent.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <div className="p-2 md:p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl">
                                        <div className="flex items-center gap-2 mb-1 opacity-70">
                                            <FaHandsPraying className="text-white size-2 md:size-3" />
                                            <span className="text-[9px] font-bold uppercase">نفحات إيمانية</span>
                                        </div>
                                        <p className="text-[12px] md:text-sm italic font-medium leading-tight text-white/90">
                                            &quot;اللهم اجعلنا ممن يقال لهم ادخلوها بسلام آمنين&quot;
                                        </p>
                                    </div>
                                </div>

                                {/* Abstract Background Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute -right-20 bottom-20 opacity-10">
                                    <monthContent.icon size={400} />
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-[610px] bg-gray-200 dark:bg-gray-800 rounded-[2.5rem] animate-pulse flex items-center justify-center">
                                <span className="text-gray-400">جاري تحميل نفحات الشهر...</span>
                            </div>
                        )}
                    </div>

                </div>
            </CustomContainer>
        </section>
    );
};

export default News;
