"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng, toBlob } from "html-to-image";
import { MdClose, MdShare, MdImage } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ShareZekrProps {
    zekr: {
        text: string;
        category?: string;
        count?: number;
    } | null;
    onClose: () => void;
}

const ShareZekr: React.FC<ShareZekrProps> = ({ zekr, onClose }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [generating, setGenerating] = useState(false);
    const isOpen = zekr !== null;

    const handleShareImage = async () => {
        if (!cardRef.current) return;
        setGenerating(true);
        try {
            const blob = await toBlob(cardRef.current, {
                cacheBust: true,
                style: { borderRadius: '0' }
            });
            
            if (!blob) throw new Error("Failed to generate image");
            const file = new File([blob], `zekr-${Date.now()}.png`, { type: 'image/png' });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'اذكار نور الهدى',
                    text: zekr?.text
                });
            } else {
                const dataUrl = await toPng(cardRef.current);
                const link = document.createElement('a');
                link.download = 'zekr.png';
                link.href = dataUrl;
                link.click();
            }
        } catch (error) {
            console.error("Error sharing image:", error);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <>
            {/* Backdrop following Tafsir style */}
            <div 
                className={`${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300`} 
                onClick={onClose}
            ></div>

            {/* Content following Tafsir style */}
            <div className={`${isOpen ? "opacity-100 visible scale-100 -translate-x-1/2 -translate-y-1/2" : "opacity-0 invisible scale-95 -translate-x-1/2 -translate-y-1/2"}
                transition-all duration-300 fixed top-1/2 left-1/2 z-50 lg:w-[480px] w-11/12 max-h-[90vh] overflow-auto no-scrollbar m-auto bg-background dark:bg-zinc-900 py-4 px-4 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800`}>
                
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-main/10">
                    <button onClick={onClose} className="cursor-pointer transition duration-200 hover:text-red-500 text-gray-400">
                        <MdClose size={22} />
                    </button>
                    <span className="text-[10px] font-bold text-main/60 dark:text-white"> مشاركة </span>
                    <div className="w-8"></div>
                </div>

                <div className="space-y-3">
                    {/* ULTRA COMPACT CARD */}
                    <div className="relative rounded-2xl overflow-hidden border border-main/10 bg-white dark:bg-black/20">
                        <div 
                            ref={cardRef}
                            className="bg-background dark:bg-zinc-900 p-4 flex flex-col items-center justify-center min-h-auto relative text-right"
                        >
                            <img src="/logo.svg" alt="Nour Al-Huda" className="w-12 mb-3 opacity-90" />
                            
                            <p className="font-quran text-2xl md:text-3xl leading-snug text-foreground dark:text-white text-center mb-4 px-2 font-bold w-full" dir="rtl">
                                {zekr?.text}
                            </p>

                            <div className="mt-auto pt-2 border-t border-main/5 w-full flex justify-between items-center text-main font-bold">
                                <span className="text-[12px] opacity-60">نور الهدى</span>
                                {zekr?.category && <span className="text-[12px] bg-main/5 px-2 py-0.5 rounded-full">{zekr.category}</span>}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleShareImage}
                        disabled={generating}
                        className="w-full bg-main text-white py-3 rounded-xl font-bold text-lg shadow-md hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {generating ? (
                            <AiOutlineLoading3Quarters className="animate-spin" size={20} />
                        ) : (
                            <>
                                <MdShare size={20} />
                                <span> مشاركة الآن </span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ShareZekr;
