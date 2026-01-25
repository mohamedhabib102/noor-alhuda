"use client";
import SurahDisplay from "@/ui/Surha";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { IconType } from "react-icons";
import { FaBookOpenReader, FaEye } from "react-icons/fa6";
import { CiMusicNote1 } from "react-icons/ci";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronRight, FaChevronLeft, FaHashtag, FaLinesLeaning } from "react-icons/fa6";
import Link from "next/link";

interface Verse {
    number: number;
    numberInSurah: number;
    text: string;
    audio: string;
}

interface Surah {
    id: number;
    name: string;
    number: number;
    englishName: string;
    ayahs: Verse[];
}

interface Tafsir {
    id: number;
    sura: string;
    aya: string;
    arabic_text: string;
    translation: string;
}

interface SurahContainerProps {
    surah: Surah;
    tafsir: Tafsir[];
}

type Eyes = {
    title: string;
    icon: IconType;
}



const eyes: Eyes[] = [
    {
        title: "وضع القراءة",
        icon: FaBookOpenReader,
    },
    {
        title: "وضع الأستماع",
        icon: CiMusicNote1,
    },
]


const SurahContainer: React.FC<SurahContainerProps> = ({ surah, tafsir }) => {

    const [switchOption, setSwitchOption] = useState(0)






    return (
        <>
            <section className="py-16">
                <CustomContainer>
                    <div>
                        <CustomTitle
                            title={surah.name}
                            success={true}
                            description={""}
                        />



                        <div className="flex items-center justify-center md:justify-start">

                            <div className="flex bg-main/5 dark:bg-white/5 p-1.5 rounded-2xl w-fit border border-main/10 dark:border-white/10 relative overflow-hidden">
                                {eyes.map((eye, idx) => (
                                    <button
                                        key={eye.title}
                                        onClick={() => setSwitchOption(idx)}
                                        className={`flex items-center lg:gap-3 gap-2 p-4 rounded-xl transition-colors duration-200 relative z-10 cursor-pointer 
                                        ${switchOption === idx ? "text-white dark:text-main" : "text-main dark:text-white/70"}`}
                                    >
                                        <eye.icon size={22} />
                                        <span className="font-bold lg:text-lg text-sm whitespace-nowrap">{eye.title}</span>
                                    </button>
                                ))}

                                {/* Sliding Background Highlight - Non-elastic, fast transition */}
                                <div
                                    className="absolute top-1.5 bottom-1.5 bg-main dark:bg-main-bg rounded-xl transition-all duration-200 shadow-md"
                                    style={{
                                        left: switchOption === 0 ? "6px" : "50%",
                                        width: "calc(50% - 9px)",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-10">
                            <SurahDisplay
                                surah={surah}
                                tafsir={tafsir}
                                option={switchOption}
                            />
                        </div>

                        {/* Navigation & Status Bar (Moved to Bottom) */}
                        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-main/5 p-8 rounded-[2.5rem] border border-main/10 dark:border-white/10 shadow-sm transition-all duration-300">
                            {/* Previous Surah */}
                            <div className="w-full md:w-auto order-2 md:order-1">
                                {surah.number > 1 && (
                                    <Link
                                        href={`/quran/${surah.number - 1}`}
                                        className="flex items-center justify-center gap-3 px-8 py-3.5 bg-white dark:bg-main-bg/5 text-main-bg border-2 border-main-bg/20 rounded-2xl font-bold hover:bg-main-bg hover:text-white transition-all duration-300 group shadow-sm active:scale-95"
                                    >
                                        <FaChevronRight className="transition-transform group-hover:translate-x-1" />
                                        <span>السورة السابقة</span>
                                    </Link>
                                )}
                            </div>

                            {/* Current Surah Info */}
                            <div className="flex flex-row items-center gap-8 order-1 md:order-2">
                                <div className="flex flex-col items-center gap-1 group">
                                    <div className="p-3 bg-main/10 rounded-2xl text-main group-hover:bg-main group-hover:text-white transition-colors duration-500">
                                        <FaHashtag size={20} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">رقم السورة</span>
                                    <span className="text-xl font-black text-main-bg">{surah.number}</span>
                                </div>
                            </div>

                            {/* Next Surah */}
                            <div className="w-full md:w-auto order-3">
                                {surah.number < 114 ? (
                                    <Link
                                        href={`/quran/${surah.number + 1}`}
                                        className="flex items-center justify-center gap-3 px-8 py-3.5 bg-white dark:bg-main-bg/5 text-main-bg border-2 border-main-bg/20 rounded-2xl font-bold hover:bg-main-bg hover:text-white transition-all duration-300 group shadow-sm active:scale-95"
                                    >
                                        <span>السورة التالية</span>
                                        <FaChevronLeft className="transition-transform group-hover:-translate-x-1" />
                                    </Link>
                                ) : (
                                    <div className="px-6 py-3 opacity-0 hidden md:block select-none">placeholder</div>
                                )}
                            </div>
                        </div>
                    </div>
                </CustomContainer>
            </section>
        </>
    );
};

export default SurahContainer;
