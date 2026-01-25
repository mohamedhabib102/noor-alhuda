"use client";

import { useRadio } from "@/lib/radioContextapi";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const RadioSound = () => {
    const { radioData, clearRadio } = useRadio();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        let isCancelled = false;

        const startAudio = async () => {
            if (mounted && radioData) {
                setIsError(false);
                if (audioRef.current) {
                    try {
                        setIsLoading(true);

                        // 1. Clean up previous source thoroughly
                        audioRef.current.pause();
                        audioRef.current.removeAttribute('src');
                        audioRef.current.load();

                        // 2. Set new source
                        audioRef.current.src = radioData.url;
                        audioRef.current.load();

                        if (!isCancelled) {
                            await audioRef.current.play();
                            setIsPlaying(true);
                        }
                    } catch (err: any) {
                        if (!isCancelled && err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
                            console.warn("Playback prevented:", err.message);
                            setIsError(true);
                        }
                        setIsPlaying(false);
                    } finally {
                        if (!isCancelled) setIsLoading(false);
                    }
                }
            } else if (mounted) {
                setIsPlaying(false);
                setIsLoading(false);
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.removeAttribute('src');
                    audioRef.current.load();
                }
            }
        };

        startAudio();

        return () => {
            isCancelled = true;
        };
    }, [radioData, mounted]);

    const togglePlay = () => {
        if (audioRef.current && radioData) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                setIsLoading(true);
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false))
                    .finally(() => setIsLoading(false));
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };

    if (!mounted || !radioData) return null;


    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-white dark:bg-zinc-900 border border-main/20 shadow-2xl rounded-2xl p-4 z-50 animate-slideUp">
            <audio
                ref={audioRef}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
                onError={() => {
                    setIsError(true);
                    setIsLoading(false);
                    setIsPlaying(false);
                }}
            />

            <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-main/10 flex items-center justify-center text-main">
                    {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" size={24} />
                    ) : radioData.img ? (
                        <img src={radioData.img} alt={radioData.name} className="w-full h-full object-cover" />
                    ) : (
                        <FaPlay size={20} />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-main-bg dark:text-gray-100 truncate">{radioData.name}</h4>
                    <p className="text-xs text-gray-500 font-bold overflow-hidden flex items-center gap-1">
                        {isError ? (
                            <span className="text-red-500 text-[10px]">نعتذر، المصدر غير متاح حالياً</span>
                        ) : isLoading ? (
                            "جاري الاتصال..."
                        ) : (
                            "بث مباشر"
                        )}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={togglePlay}
                        disabled={isLoading || isError}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isLoading || isError ? 'bg-gray-300 cursor-not-allowed' : 'bg-main text-white hover:scale-105'
                            }`}
                    >
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" size={14} />
                        ) : isPlaying ? (
                            <FaPause size={14} />
                        ) : (
                            <FaPlay size={14} className="ml-0.5" />
                        )}
                    </button>
                    <button
                        onClick={clearRadio}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center"
                    >
                        <IoClose size={20} />
                    </button>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 px-1">
                <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="text-gray-400">
                    {volume === 0 ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-main"
                />
            </div>
        </div>
    );
};

export default RadioSound;
