"use client";

import { getAllRadios } from "@/lib/methods";
import { Radio } from "@/types/Types";
import { useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { useRadio } from "@/lib/radioContextapi";

const Broadcast: React.FC = () => {
    const [radios, setRadios] = useState<Radio[]>([]);
    const [loading, setLoading] = useState(false);
    const { setRadio } = useRadio();

    useEffect(() => {
        setLoading(true);
        getAllRadios().then((data) => {
            setRadios(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <AiOutlineLoading3Quarters className="text-main animate-spin mb-4" size={50} />
                <p className="text-main-bg font-black text-xl">جاري تحميل الإذاعات...</p>
            </div>
        );
    }

    

    return (
        <div className="space-y-8 animate-fadeIn" dir="rtl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {radios.map((radio) => (
                    <div
                        key={radio.id}
                        className="group relative p-8 rounded-4xl border-2 transition-all duration-500 flex flex-col items-center text-center gap-5 bg-white dark:bg-main-bg/10 border-main-bg/5 dark:border-main-bg/20 hover:border-main/30 shadow-md hover:shadow-xl hover:-translate-y-2"
                    >
                        <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-inner bg-main/5 dark:bg-black/20 text-main group-hover:bg-main group-hover:text-white relative overflow-hidden ring-4 ring-main/5 dark:ring-main/20">
                            {radio.img ? (
                                <Image
                                    src={radio.img}
                                    alt={radio.name}
                                    fill
                                    className="object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <FaMicrophone size={32} />
                            )}
                        </div>

                        <div>
                            <h3 className="text-xl font-black text-main-bg dark:text-gray-100 mb-2">{radio.name}</h3>
                            <p className="text-sm text-gray-500 font-bold">إذاعة مباشرة على مدار الساعة</p>
                        </div>

                        <button
                            onClick={() => setRadio(radio)}
                            className="cursor-pointer mt-2 px-6 py-2 rounded-xl font-black text-xs bg-main-bg/10 text-main-bg group-hover:bg-main group-hover:text-white transition-all">
                            استماع الآن
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Broadcast;
