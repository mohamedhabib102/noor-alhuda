"use client";
import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface SurhaProps {
    surah: any;
}

const SurhaPage: React.FC<SurhaProps> = ({ surah }) => {
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    const handlePlayPause = (index: number) => {
        const audio = audioRefs.current[index];
        if (!audio) return;

        if (playingIndex === index) {
            if (audio.paused) {
                audio.play();
                setPlayingIndex(index);
            } else {
                audio.pause();
                setPlayingIndex(null);  
            }
        } else {
            // Stop previous
            if (playingIndex !== null) {
                const prevAudio = audioRefs.current[playingIndex];
                if (prevAudio) {
                    prevAudio.pause();
                    prevAudio.currentTime = 0;
                }
            }

            // Just to be safe, pause all others if state got out of sync
            audioRefs.current.forEach((a, i) => {
                if (i !== index && a) {
                    if (!a.paused) a.pause();
                    a.currentTime = 0;
                }
            });

            audio.play();
            setPlayingIndex(index);
        }
    };

    const handleEnded = (index: number) => {
        const nextIndex = index + 1;
        if (nextIndex < surah.ayahs.length) {
            handlePlayPause(nextIndex);
        } else {
            setPlayingIndex(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {surah.ayahs.map((ayah: any, index: number) => {
                const isActive = playingIndex === index;
                return (
                    <div
                        key={ayah.number}
                        className={`
                            relative group p-6 rounded-3xl transition-all duration-300 border
                            ${isActive
                                ? "bg-emerald-200/60 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 shadow-lg shadow-emerald-100/50 dark:shadow-none"
                                : "bg-white dark:bg-zinc-900/50 border-gray-400 dark:border-zinc-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 hover:-translate-y-0.5"
                            }
                        `}
                    >
                        <audio
                            ref={(el) => { audioRefs.current[index] = el; }}
                            onEnded={() => handleEnded(index)}
                            className="hidden"
                        >
                            <source src={ayah.audio} type="audio/mpeg" />
                        </audio>

                        <div className="flex flex-col-reverse md:flex-row gap-6 items-center md:items-start justify-between">
                            <div className="shrink-0 mt-2 md:mt-1">
                                <button
                                    onClick={() => handlePlayPause(index)}
                                    className={`
                                        flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                                        ${isActive
                                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none scale-110"
                                            : "bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 dark:group-hover:bg-emerald-900/30 dark:group-hover:text-emerald-400"
                                        }
                                    `}
                                >
                                    {isActive ? <FaPause className="text-sm" /> : <FaPlay className="text-sm ml-1" />}
                                </button>
                            </div>

                            <div className="flex-1 w-full text-right">
                                <p className={`
                                    font-quran text-2xl md:text-4xl leading-[2.5] md:leading-[2.5] mb-2
                                    ${isActive ? "text-emerald-950 dark:text-emerald-50" : "text-gray-800 dark:text-gray-200"}
                                `}>
                                    {ayah.text}
                                    <span className="inline-flex items-center justify-center w-12 h-12 relative align-middle mx-3 select-none">
                                        <svg viewBox="0 0 40 40" className={`absolute inset-0 w-full h-full transition-colors duration-300 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-300 dark:text-zinc-700 group-hover:text-emerald-400/50"}`} fill="none" stroke="currentColor">
                                            <circle cx="20" cy="20" r="15" strokeWidth="2" />
                                            <circle cx="20" cy="20" r="11" strokeWidth="1" opacity="0.5" />
                                            <path d="M15 6 Q 17.5 2 20 6 Q 22.5 2 25 6" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M4 22 Q 1 20 4 18 M 36 22 Q 39 20 36 18" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <span className={`relative text-sm font-bold pt-1 font-sans ${isActive ? "text-emerald-800 dark:text-emerald-300" : "text-gray-500 dark:text-zinc-500"}`}>
                                            {ayah.numberInSurah}
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SurhaPage;
