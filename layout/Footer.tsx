
"use client";
import React from "react";
import { FaEnvelope, FaGooglePlay, FaApple } from "react-icons/fa";
import Link from "next/link";


const Footer = () => {
    return (
        <footer className="w-full bg-main/10 dark:bg-main-bg/5 pt-16 border-t border-main/10 dark:border-main-bg/20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-main-bg to-transparent opacity-50" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-right">
                    {/* Contact Section */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <h3 className="text-2xl font-black text-main dark:text-main-bg font-rakkas">
                            تواصل معنا
                        </h3>
                        <div className="flex flex-col gap-4 w-full">
                            {[
                                { label: "تواصل عام", email: "byaalkhty43@gmail.com" },
                                { label: "الدعم الفني", email: "byaalkhty43@gmail.com" }
                            ].map((contact, idx) => (
                                <a
                                    key={idx}
                                    href={`mailto:${contact.email}`}
                                    className="group flex items-center gap-4 bg-main/5 dark:bg-main-bg/10 p-4 rounded-2xl border border-main/10 dark:border-main-bg/20 hover:border-main-bg transition-all duration-300"
                                >
                                    <div className="p-3 bg-white dark:bg-main-bg/20 rounded-xl text-main dark:text-main-bg shadow-sm group-hover:scale-110 transition-transform">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-main/60 dark:text-main-bg/60 font-black mb-1">{contact.label}</span>
                                        <span className="text-sm font-black text-main dark:text-white">{contact.email}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <h3 className="text-2xl font-black text-main dark:text-main-bg font-rakkas">
                            روابط سريعة
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full">
                            {[
                                { name: "المجتمع", href: "/community" },
                                { name: "القرآن الكريم", href: "/quran" },
                                { name: "مركز المساعدة", href: "/help" },
                                { name: "دعم المنصة", href: "/support" }
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    target="_blank"
                                    href={link.href}
                                    className="text-main/70 dark:text-white/80 hover:text-main dark:hover:text-main-bg transition-colors text-sm font-black flex items-center gap-2 group"
                                >
                                    <span className="w-2 h-2 rounded-full bg-main-bg group-hover:scale-150 transition-transform shadow-sm"></span>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile App Section */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <h3 className="text-2xl font-black text-main dark:text-main-bg font-rakkas">
                            تطبيقاتنا
                        </h3>
                        <p className="text-main/60 dark:text-white/70 text-sm leading-relaxed font-black">
                            قريباً على متجر جوجل بلاي وآبل ستور، لتكن المنصة معك في كل وقت.
                        </p>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="relative group">
                                <div className="absolute -top-2 -right-2 bg-main-bg text-white text-[10px] px-3 py-1 rounded-full z-10 shadow-lg font-black italic">قريباً</div>
                                <button disabled className="flex items-center gap-4 bg-white dark:bg-main-bg/10 p-4 rounded-2xl border border-main/10 dark:border-main-bg/20 opacity-60 w-full cursor-not-allowed">
                                    <FaGooglePlay size={22} className="text-main dark:text-main-bg" />
                                    <span className="text-sm font-black text-main dark:text-white">Google Play</span>
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="absolute -top-2 -right-2 bg-main-bg text-white text-[10px] px-3 py-1 rounded-full z-10 shadow-lg font-black italic">قريباً</div>
                                <button disabled className="flex items-center gap-4 bg-white dark:bg-main-bg/10 p-4 rounded-2xl border border-main/10 dark:border-main-bg/20 opacity-60 w-full cursor-not-allowed">
                                    <FaApple size={24} className="text-main dark:text-main-bg" />
                                    <span className="text-sm font-black text-main dark:text-white">App Store</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-main/10 dark:border-main-bg/10 py-8 text-center">
                    <p className="text-sm text-main/50 dark:text-white/40 font-black">
                        جميع الحقوق محفوظة © {new Date().getFullYear()} <span className="text-main dark:text-main-bg">نور الهدى</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
