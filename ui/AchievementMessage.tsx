"use client";

import React from "react";
import { FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";

interface AchievementMessageProps {
    title: string;
    message: string;
    onReset?: () => void;
}

const AchievementMessage: React.FC<AchievementMessageProps> = ({ title, message, onReset }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full bg-linear-to-br from-main to-main-bg p-8 rounded-3xl shadow-2xl text-center relative overflow-hidden my-8"
        >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mt-16 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-pulse" />

            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shadow-inner mb-2">
                    <FaCrown size={40} className="text-white drop-shadow-md" />
                </div>

                <h2 className="text-3xl font-black text-white ml-2">{title}</h2>
                <p className="text-white/90 text-lg max-w-md leading-relaxed font-semibold">
                    {message}
                </p>

                {onReset && (
                    <button
                        onClick={onReset}
                        className="mt-4 px-6 py-2 bg-white text-main font-bold rounded-full hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
                    >
                        ابدأ من جديد
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default AchievementMessage;
