
"use client";
import React from "react";
import { FaEnvelope, FaGooglePlay, FaApple } from "react-icons/fa";
import Link from "next/link";


const Footer = () => {
    return (
        <footer className="w-full bg-slate-50 dark:bg-gray-950 bg-linear-to-t from-emerald-100/30 to-transparent dark:from-emerald-900/20 dark:to-transparent pt-10 border-t border-emerald-100 dark:border-emerald-900/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Contact Section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 font-rakkas">
                            تواصل معنا
                        </h3>
                        <div className="flex flex-col gap-3 w-full">
                            <a
                                href="mailto:byaalkhty43@gmail.com"
                                className="flex items-center gap-3 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-800/50 hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                                    <FaEnvelope size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-none mb-1">تواصل عام</span>
                                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200">byaalkhty43@gmail.com</span>
                                </div>
                            </a>

                            <a
                                href="mailto:byaalkhty43@gmail.com"
                                className="flex items-center gap-3 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-800/50 hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                                    <FaEnvelope size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-none mb-1">الدعم الفني</span>
                                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200">byaalkhty43@gmail.com</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 font-rakkas">
                            روابط سريعة
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full">
                            <Link target="_blank"  href="/community" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                المجتمع
                            </Link>
                            <Link target="_blank"  href="/quran" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                القرآن الكريم
                            </Link>
                            <Link target="_blank"  href="/help" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                مركز المساعدة
                            </Link>
                            <Link target="_blank"  href="/support" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                دعم المنصة
                            </Link>
                        </div>
                    </div>

                    {/* Mobile App Section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 font-rakkas">
                            تطبيقاتنا
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs text-center md:text-right leading-relaxed">
                            قريباً على متجر جوجل بلاي وآبل ستور، لتكن المنصة معك في كل وقت.
                        </p>
                        <div className="flex flex-col gap-3 w-full">
                            <div className="relative group">
                                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[9px] px-2 py-0.5 rounded-full z-10 shadow-sm font-medium">قريباً</div>
                                <button disabled className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50 opacity-70 w-full">
                                    <FaGooglePlay size={18} className="text-emerald-600" />
                                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200 font-rubik">Google Play</span>
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[9px] px-2 py-0.5 rounded-full z-10 shadow-sm font-medium">قريباً</div>
                                <button disabled className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50 opacity-70 w-full">
                                    <FaApple size={20} className="text-emerald-600" />
                                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200 font-rubik">App Store</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-emerald-100/50 dark:border-emerald-800/30 py-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium font-rubik">
                        جميع الحقوق محفوظة © {new Date().getFullYear()} <span className="text-emerald-600 dark:text-emerald-400">نور الهدى</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
