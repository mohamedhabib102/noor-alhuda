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
        <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-main dark:bg-main-bg border border-white/10 dark:border-main/20 shadow-2xl rounded-4xl p-5 z-50 animate-slideUp backdrop-blur-md transition-colors duration-500">
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
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white/10 dark:bg-main/10 flex items-center justify-center text-main-bg dark:text-main shadow-inner">
                    {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" size={28} />
                    ) : radioData.img ? (
                        <img src={radioData.img} alt={radioData.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                        <FaPlay size={24} />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-black text-white dark:text-main truncate">{radioData.name}</h4>
                    <p className="text-xs font-bold overflow-hidden flex items-center gap-1">
                        {isError ? (
                            <span className="text-red-400 dark:text-red-700">  
                               عذراً، مشكلة في الأتصال حاول مرة أخرى
                             </span>
                        ) : isLoading ? (
                            <span className="text-white/60 dark:text-main/60 animate-pulse">جاري الاتصال...</span>
                        ) : (
                            <span className="text-white/90 dark:text-main/80">بث مباشر الآن</span>
                        )}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={togglePlay}
                        disabled={isLoading || isError}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${isLoading || isError
                            ? 'bg-white/10 text-white/30 cursor-not-allowed'
                            : 'bg-main-bg dark:bg-main text-white hover:scale-110 active:scale-95'
                            }`}
                    >
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" size={18} />
                        ) : isPlaying ? (
                            <FaPause size={18} />
                        ) : (
                            <FaPlay size={18} className="ml-1" />
                        )}
                    </button>
                    <button
                        onClick={clearRadio}
                        className="w-8 h-8 rounded-full bg-black/20 dark:bg-main/20 text-white/50 dark:text-main/50 hover:text-red-400 dark:hover:text-red-700 transition-all flex items-center justify-center"
                    >
                        <IoClose size={20} />
                    </button>
                </div>
            </div>

            <div className="mt-5 flex items-center gap-3 px-1">
                <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="text-white/70 dark:text-main/70 hover:text-white dark:hover:text-main transition-colors">
                    {volume === 0 ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1.5 bg-white/20 dark:bg-main/20 rounded-lg appearance-none cursor-pointer accent-main-bg dark:accent-main"
                />
            </div>
        </div>
    );
};

export default RadioSound;
