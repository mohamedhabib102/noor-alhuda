
"use client";
import React from "react";
import { FaEnvelope, FaGooglePlay, FaApple } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="w-full bg-slate-50 dark:bg-gray-950 bg-linear-to-t from-emerald-100/30 to-transparent dark:from-emerald-900/20 dark:to-transparent pt-10 border-t border-emerald-100 dark:border-emerald-900/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {/* Contact Section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 font-rakkas">
                            تواصل معنا
                        </h3>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a
                                href="mailto:contact@nour-alhuda.com"
                                className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-800/50 hover:shadow-md transition-shadow cursor-pointer min-w-[200px]"
                            >
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                                    <FaEnvelope size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        تواصل عام
                                    </span>
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        contact@nour-alhuda.com
                                    </span>
                                </div>
                            </a>

                            <a
                                href="mailto:support@nour-alhuda.com"
                                className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-800/50 hover:shadow-md transition-shadow cursor-pointer min-w-[200px]"
                            >
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                                    <FaEnvelope size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        الدعم الفني
                                    </span>
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        support@nour-alhuda.com
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Mobile App Section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 font-rakkas">
                            حمل التطبيق
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs text-center md:text-right">
                            نسعى لتوفير تجربة أفضل لكم عبر الهواتف الذكية. التطبيق سيكون متاحاً قريباً.
                        </p>
                        <div className="flex lg:flex-row flex-col lg:gap-4 gap-8 relative mt-2">
                            {/* Coming Soon Overlay */}

                            <div className="group relative">
                                <div className="absolute -top-3 -right-3 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full z-10 shadow-sm font-medium">
                                    قريباً
                                </div>
                                <button
                                    disabled
                                    className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-800/50 cursor-not-allowed opacity-80 min-w-[200px] hover:shadow-none transition-all"
                                >
                                    <div className="text-emerald-600 dark:text-emerald-400">
                                        <FaGooglePlay size={24} />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] text-gray-400 font-rubik leading-none">GET IT ON</span>
                                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-none font-rubik">
                                            Google Play
                                        </span>
                                    </div>
                                </button>
                            </div>

                            <div className="group relative">
                                <div className="absolute -top-3 -right-3 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full z-10 shadow-sm font-medium">
                                    قريباً
                                </div>
                                <button
                                    disabled
                                    className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-800/50 cursor-not-allowed opacity-80 min-w-[200px] hover:shadow-none transition-all"
                                >
                                    <div className="text-emerald-600 dark:text-emerald-400">
                                        <FaApple size={28} />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] text-gray-400 font-rubik leading-none">Download on the</span>
                                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-none font-rubik">
                                            App Store
                                        </span>
                                    </div>
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
