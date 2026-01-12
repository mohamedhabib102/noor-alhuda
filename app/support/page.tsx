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
        <div className="lg:py-10 py-6 min-h-screen bg-gray-50 dark:bg-[#0f1014] transition-colors duration-300">
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
                    <section className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                                <FaHandHoldingHeart size={50} className="animate-pulse" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                                كن شريكاً في الأجر
                            </h2>
                            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
                                منصة نور الهدى مشروع غير ربحي يهدف لنشر الوعي الديني والأخلاقي. دعمك المادي يساعدنا على تغطية تكاليف التشغيل والتطوير المستمر للمنصة لتصل لكل بيت مسلم.
                            </p>
                        </div>
                    </section>

                    {/* Payment Methods */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
                            <MdPayments className="text-green-600" size={32} />
                            وسائل الدفع المتاحة
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Vodafone Cash */}
                            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-400 mb-6 group-hover:scale-110 transition-transform">
                                        <SiVodafone size={60} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">فودافون كاش</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">يمكنك التحويل مباشرة إلى الرقم التالي:</p>

                                    <div className="relative group/copy w-full max-w-xs flex flex-col items-center">
                                        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 rounded-xl border border-dashed border-red-500 text-2xl font-mono font-bold text-gray-800 dark:text-white tracking-widest flex items-center justify-center gap-3 w-full">
                                            <span>01027227796</span>
                                            <button
                                                onClick={() => handleCopy("01027227796", "voda")}
                                                className="cursor-pointer p-2 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors text-red-600"
                                                title="نسخ الرقم"
                                            >
                                                {copiedId === "voda" ? <FaCheck size={18} /> : <FaCopy size={18} />}
                                            </button>
                                        </div>
                                        {copiedId === "voda" && (
                                            <span className="absolute -top-10 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                                                تم النسخ!
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-4 text-sm text-gray-500">من فضلك أرسل صورة من إيصال التحويل لخدمة العملاء</p>
                                </div>
                            </div>

                            {/* Fawry */}
                            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl text-yellow-600 dark:text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
                                        <FaWallet size={60} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">فوري</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">قريباً عبر كود الدفع المباشر</p>
                                    <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 rounded-xl border border-dashed border-yellow-500 text-xl font-bold text-gray-400">
                                        قيد التفعيل...
                                    </div>
                                    <p className="mt-4 text-sm text-gray-500">ترقبوا تفعيل خدمة الدفع عبر فوري قريباً</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer Quote */}
                    <div className="text-center py-12">
                        <div className="inline-flex flex-col items-center gap-4 bg-white dark:bg-gray-800 px-10 py-8 rounded-3xl shadow-lg border border-green-100 dark:border-green-900/30">
                            <FaMobileAlt className="text-green-500 text-4xl" />
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                دعمك يعني لنا الكثير
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                               قال صلى الله عليه وسلم “الصدقة تطفئ الخطيئة كما يطفىء الماء النار” رواه الترمذي
                            </p>
                            <div className="mt-4 text-green-600 dark:text-green-400 font-bold text-xl">
                                ونسعد بمشاركتك في الأجر والثواب
                            </div>
                        </div>
                    </div>
                </div>
            </CustomContainer>
        </div>
    );
};

export default SupportPage;
