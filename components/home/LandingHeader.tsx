import CustomContainer from "@/ui/CustomContainer";
import Image from "next/image";
import Link from "next/link";





const LandingHeader: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-emerald-100/20 to-background dark:from-emerald-950/20 dark:to-background py-12 md:py-24">
            <CustomContainer>
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-right space-y-8 order-2 md:order-1">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-main/10 text-main dark:text-emerald-400 font-semibold text-sm shadow-sm">
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
                            <Link
                                href="/join-us"
                                className="cursor-pointer group relative px-10 py-4 bg-main hover:bg-emerald-900 text-white rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-emerald-200 dark:shadow-none hover:-translate-y-1 active:scale-95">
                                <span className="relative z-10 text-lg">ابدأ رحلتك الآن</span>
                                <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            <Link
                                href="/quran"
                                className="cursor-pointer px-10 py-4 bg-white dark:bg-zinc-800 border-2 border-gray-100 dark:border-zinc-700 text-gray-700 dark:text-gray-200 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-zinc-700 hover:border-brand-gold">
                                تصفح المصحف
                            </Link>

                        </div>
                    </div>

                    {/* Image Visual */}
                    <div className="flex-1 order-1 md:order-2 relative group mt-8 md:mt-0">
                        <div className="relative z-10 w-full max-w-md mx-auto aspect-square overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(14,88,45,0.15)] dark:shadow-none border-8 border-white dark:border-main/5 -rotate-2 group-hover:rotate-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]">
                            <Image
                                src="/images/header.jpg"
                                alt="نور الهدى - رفيق الإيمان"
                                fill
                                className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-main/20 dark:bg-emerald-500/10 blur-[80px] rounded-full z-0 animate-pulse"></div>
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-gold/20 dark:bg-amber-500/10 blur-[80px] rounded-full z-0 animate-pulse"></div>
                    </div>
                </div>
            </CustomContainer>
        </section>
    )
};

export default LandingHeader;
