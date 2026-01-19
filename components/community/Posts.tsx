"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import CardPost from "@/ui/CardPost";



interface Dhikr {
    id: number;
    title: string;
    content: string;
    image: string;
}

const randomDhikr: Dhikr[] = [
    {
        id: 1,
        title: " نور الهدى ",
        content: " سبحان الله وبحمده سبحان الله العظيم ",
        image: "/logo.svg"
    },
    {
        id: 2,
        title: " نور الهدى ",
        content: " لا اله إلا انت سبحانك إني كنت من الظالمين ",
        image: "/logo.svg"
    },
    {
        id: 3,
        title: " نور الهدى ",
        content: " أشهد أن لا إله إلا الله أشهد و أن محمدًا رسول الله ",
        image: "/logo.svg"
    }
]







const Posts: React.FC = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 0);
        return () => clearTimeout(timer);
    }, []);





    if (loading) {
        return (
            <div className=" py-8">
                <div className="h-10 w-[200px] rounded-lg mb-3 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                <div className="flex items-start justify-between lg:flex-row-reverse md:flex-row flex-col-reverse gap-8">
                    <div className="lg:w-[75%] md:w-[60%] w-full">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse mb-8 last:mb-0">
                                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-200 dark:bg-gray-900 lg:w-[25%] md:w-[35%] w-full sticky top-0 rounded-lg">
                        {[1].map((i) => (
                            <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                                <div className="bg-gray-400 p-2 dark:bg-gray-900 rounded-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    </div>
                                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div>
                <div className="lg:py-6 py-4">
                    <div className="flex items-start justify-between lg:flex-row-reverse md:flex-row flex-col-reverse gap-8">
                        <div className="lg:w-[75%]  w-full">
                            <CardPost stateCard="page" />
                        </div>
                        <div className="lg:block hidden bg-gray-200 dark:bg-gray-900 p-3 lg:w-[20%] md:w-[35%]  sticky top-0 rounded-2xl">
                            {/* Desktop View */}
                            <div className="hidden md:block">
                                {!loading && randomDhikr.map((dhikr) => (
                                    <div key={dhikr.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-5" dir="rtl">
                                        <div className="flex items-center justify-end flex-row-reverse gap-0.5">
                                            <h2 className="text-lg font-medium text-(--main-color)">{dhikr.title}</h2>
                                            <Image
                                                src={dhikr.image}
                                                alt={dhikr.title}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{dhikr.content}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Mobile View (Swiper) */}
                            <div className="block md:hidden sticky top-0">
                                <Swiper
                                    modules={[Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    autoplay={{ delay: 3000 }}
                                    className="w-full"
                                >
                                    {randomDhikr.map((dhikr) => (
                                        <SwiperSlide key={dhikr.id}>
                                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg" dir="rtl">
                                                <div className="flex items-center justify-end flex-row-reverse gap-0.5">
                                                    <h2 className="text-lg font-medium text-(--main-color)">{dhikr.title}</h2>
                                                    <Image
                                                        src={dhikr.image}
                                                        alt={dhikr.title}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{dhikr.content}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Posts
