"use client";

import React, { useState } from "react";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { FaHandHoldingHeart, FaWallet, FaMobileAlt, FaCopy, FaCheck } from "react-icons/fa";
import { SiVodafone } from "react-icons/si";
import { MdPayments } from "react-icons/md";

const SupportPage = () => {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="lg:py-10 py-6 min-h-screen transition-colors duration-300">
            <CustomContainer>
                <div className="mb-12">
                    <CustomTitle
                        title="دعم المنصة"
                        description="ساهم معنا في تطوير ونشر العلم النافع، دعمك يفرق في استمرارنا"
                        success={false}
                    />
                </div>

                <div className="max-w-4xl mx-auto space-y-12 text-right" dir="rtl">
                    {/* Intro Section */}
                    <section className="relative bg-white dark:bg-main/5 p-10 rounded-3xl shadow-sm border border-main/10 overflow-hidden text-center group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-main-bg/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700"></div>

                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <div className="p-5 bg-main/5 dark:bg-main-bg/10 rounded-3xl text-main dark:text-main-bg shadow-inner">
                                <FaHandHoldingHeart size={60} className="animate-pulse" />
                            </div>
                            <h2 className="text-4xl font-black text-main dark:text-gray-100">
                                كن شريكاً في الأجر
                            </h2>
                            <p className="text-xl leading-relaxed text-foreground/80 dark:text-gray-300 max-w-2xl font-medium">
                                منصة نور الهدى مشروع غير ربحي يهدف لنشر الوعي الديني والأخلاقي. دعمك المادي يساعدنا على تغطية تكاليف التشغيل والتطوير المستمر للمنصة لتصل لكل بيت مسلم.
                            </p>
                        </div>
                    </section>

                    {/* Payment Methods */}
                    <section>
                        <h2 className="text-2xl font-bold mb-10 text-center text-foreground dark:text-gray-100 flex items-center justify-center gap-3">
                            <MdPayments className="text-main dark:text-main-bg" size={32} />
                            وسائل الدفع المتاحة
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Vodafone Cash */}
                            <div className="group bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-main/10 dark:border-main/20 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-24 h-24 bg-red-500/5 rounded-br-full -ml-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="flex flex-col items-center relative z-10">
                                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl text-red-600 mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-sm">
                                        <SiVodafone size={60} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground dark:text-gray-100 mb-2">فودافون كاش</h3>
                                    <p className="text-foreground/60 dark:text-gray-400 mb-6">يمكنك التحويل مباشرة إلى الرقم التالي:</p>

                                    <div className="relative w-full max-w-xs">
                                        <div className="bg-main/5 dark:bg-black/20 p-4 rounded-2xl border-2 border-dashed border-red-500/50 text-2xl font-mono font-black text-main dark:text-white tracking-widest flex items-center justify-center gap-4 group/box shadow-inner">
                                            <span>01027227796</span>
                                            <button
                                                onClick={() => handleCopy("01027227796", "voda")}
                                                className="cursor-pointer p-2 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 text-red-600 shadow-sm group-active/box:scale-90"
                                                title="نسخ الرقم"
                                            >
                                                {copiedId === "voda" ? <FaCheck size={18} /> : <FaCopy size={18} />}
                                            </button>
                                        </div>
                                        {copiedId === "voda" && (
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-main text-white text-xs px-4 py-1.5 rounded-full shadow-lg animate-bounce font-bold">
                                                تم النسخ بنجاح!
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 flex items-center gap-2 text-sm text-foreground/50 bg-foreground/5 py-2 px-4 rounded-full">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        من فضلك أرسل صورة الإيصال لخدمة العملاء
                                    </div>
                                </div>
                            </div>

                            {/* Fawry */}
                            <div className="group bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-main/10 dark:border-main/20 text-center relative overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100">
                                <div className="absolute top-0 left-0 w-24 h-24 bg-yellow-500/5 rounded-br-full -ml-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="flex flex-col items-center relative z-10">
                                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-2xl text-yellow-600 mb-6 group-hover:-rotate-12 transition-transform duration-500 shadow-sm">
                                        <FaWallet size={60} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground dark:text-gray-100 mb-2">فوري</h3>
                                    <p className="text-foreground/60 dark:text-gray-400 mb-6">قريباً عبر كود الدفع المباشر</p>
                                    <div className="bg-foreground/5 dark:bg-black/20 p-4 rounded-2xl border-2 border-dashed border-yellow-500/30 text-xl font-bold text-foreground/30 flex items-center justify-center gap-3 w-full shadow-inner italic">
                                        قيد التفعيل...
                                    </div>
                                    <p className="mt-8 text-sm text-foreground/40 font-medium">ترقبوا تفعيل خدمة الدفع عبر فوري قريباً</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Support Banner / Quote */}
                    <section className="text-center pt-8">
                        <div className="inline-flex flex-col items-center gap-6 bg-linear-to-l from-main/10 to-main-bg/10 dark:from-main/5 dark:to-main-bg/5 p-10 rounded-[3rem] border border-main/10 dark:border-main-bg/20 shadow-sm relative overflow-hidden group">
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-main-bg/5 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>

                            <FaMobileAlt className="text-main dark:text-main-bg text-5xl relative z-10" />
                            <h3 className="text-3xl font-black text-main dark:text-gray-100 relative z-10">
                                دعمك يعني لنا الكثير
                            </h3>
                            <p className="text-xl text-foreground/70 dark:text-gray-300 relative z-10 leading-loose italic max-w-2xl">
                                "الصدقة تطفئ الخطيئة كما يطفىء الماء النار"
                                <span className="block text-sm mt-3 opacity-60">— رواه الترمذي —</span>
                            </p>
                            <div className="mt-2 text-main-bg dark:text-main-bg font-black text-2xl relative z-10 bg-main/5 dark:bg-main-bg/10 py-3 px-8 rounded-2xl">
                                ونسعد بمشاركتك في الأجر والثواب
                            </div>
                        </div>
                    </section>
                </div>
            </CustomContainer>
        </div>
    );
};

export default SupportPage;
