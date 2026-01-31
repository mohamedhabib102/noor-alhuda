import { useAuth } from "@/lib/contextapi";
import CustomContainer from "@/ui/CustomContainer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";




const LandingHeader: React.FC = () => {
    const [mounte, setMounte] = useState(false)
    const { userData } = useAuth();


    useEffect(() => {
        setMounte(true)
    }, [])
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-emerald-100/20 to-background dark:from-emerald-950/20 dark:to-background py-12 md:py-24">
            <CustomContainer>
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-right space-y-8 order-2 md:order-1">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-main/10 text-main dark:text-main font-semibold text-sm shadow-sm">
                            <Image
                                src="/logo.svg"
                                alt="logo"
                                width={26}
                                height={26}
                                className="w-6 h-6 object-contain"
                            />
                            <span>منصة نور الهدى الإسلامية</span>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-7xl font-bold text-foreground dark:text-white leading-[1.15]">
                                نور الهدى.. <br />
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-main to-brand-gold dark:from-emerald-400 dark:to-brand-gold">
                                    رفيقك في رحلة الإيمان
                                </span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mx-auto md:mr-0 font-medium">
                                وجهتكم الروحانية المتكاملة التي تجمع بين عذوبة التلاوة، فضل الأذكار، وعمق التفسير، لنبني معاً مجتمعاً إسلامياً يسمو بالروح ويقوي الصلة بالله في كل حين.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-4">
                            {mounte && !userData?.personID ? (
                            <Link
                                href="/join-us"
                                className="cursor-pointer group relative px-10 py-4 bg-main hover:bg-emerald-900 text-white rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-emerald-200 dark:shadow-none hover:-translate-y-1 active:scale-95">
                                <span className="relative z-10 text-lg">ابدأ رحلتك الآن</span>
                                <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            ) : (
                                <Link
                                href="/community"
                                className="cursor-pointer group relative px-10 py-4 bg-main hover:bg-emerald-900 text-white rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-emerald-200 dark:shadow-none hover:-translate-y-1 active:scale-95">
                                <span className="relative z-10 text-lg">انضم للمجتمع</span>
                                <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            )}
                            <Link
                                href="/quran"
                                className="cursor-pointer px-10 py-4 bg-main-bg dark:bg-main-bg/70  dark:text-white rounded-2xl font-bold text-lg transition-all duration-300 dark:hover:bg-main-bg hover:border-brand-gold
                                hover:-translate-y-1 active:scale-95 text-white">
                                تصفح المصحف
                            </Link>

                        </div>
                    </div>

                    {/* Image Visual */}
                    <div className="flex-1 order-1 md:order-2 relative group mt-4 md:mt-0 w-full">
                        <div className="relative z-10 w-full max-w-lg lg:max-w-2xl mx-auto aspect-4/3 md:aspect-square overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_rgba(14,88,45,0.2)] dark:shadow-none border-12 border-white dark:border-main/10 -rotate-1 group-hover:rotate-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]">
                            <Image
                                src="/images/header.jpg"
                                alt="نور الهدى - رفيق الإيمان"
                                fill
                                className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                priority
                            />
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -top-16 -right-16 w-64 h-64 bg-main/30 dark:bg-emerald-500/10 blur-[100px] rounded-full z-0 animate-pulse"></div>
                        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-brand-gold/30 dark:bg-amber-500/10 blur-[100px] rounded-full z-0 animate-pulse"></div>
                    </div>
                </div>
            </CustomContainer>
        </section>
    )
};

export default LandingHeader;
