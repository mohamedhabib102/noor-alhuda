"use client"

import { useState } from "react";
import Surahs from "@/ui/Sours";
import Juzs from "@/ui/Juzs";

const options = [
    {
        title: "عرض السور",
    },
    {
        title: "عرض الأجزاء",
    },
]


const Journey = () => {
    const [switchOption, setSwitchOption] = useState(0)
    return (
      <div>
        <div className="flex items-center mt-8">
            {options.map((eye, idx) => (
                <button
                    key={eye.title}
                    onClick={() => setSwitchOption(idx)}
                    className={`flex items-center lg:gap-3 gap-2 p-4 rounded-xl cursor-pointer font-bold lg:text-lg text-sm whitespace-nowrap
                   ${switchOption === idx
                            ? "bg-main dark:bg-main-bg text-white dark:text-main shadow-md"
                            : "text-main dark:text-main-bg/70 hover:bg-main/5"}`}
                >
                    <span>{eye.title}</span>
                </button>
            ))}
        </div>
        <div className="mt-8">
                {switchOption === 0 ? (
                    <div>
                        <Surahs />
                    </div>
                ) : (
                    <div>
                        <Juzs/>
                    </div>
                )}
        </div>
      </div>
    );
}; export default Journey;