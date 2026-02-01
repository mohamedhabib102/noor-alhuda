"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { CiPlay1 } from "react-icons/ci";
import { MdClose } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Hero } from "@/types/Types";
import req from "@/lib/axios";

export interface HeroProps {
  id: number;
  type: string;
  title: string;
  link: string;
  image: string;
  description?: string;
}

interface Props {
  skipFirstSSR?: boolean;
}

const HeroSliderClient: React.FC<Props> = ({ skipFirstSSR = false }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [hero, setHero] = useState<Hero[]>([])
  const localSlides = skipFirstSSR ? hero.slice(1) : hero;



  const getVideoId = (url: string) => {
    const match = url.match(/v=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : "";
  };


  const getHeroData = async () => {
    try {
      const res = await req.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hero`)
      setHero(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchHero = async () => {
      await getHeroData();
    };
    fetchHero();
  }, []);


  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      loop={localSlides.length > 1}
      className="w-full lg:rounded-2xl"
    >
      {localSlides.map((slide, idx) => {
        const isPlaying = playingId === slide.id;
        const videoId = slide.type === "video" ? getVideoId(slide.link) : null;

        return (
          <SwiperSlide key={idx+1} className="w-screen overflow-hidden lg:rounded-2xl md:rounded-2xl">
            <div className="w-screen lg:h-[670px] md:h-[450px] h-[300px] relative">
              {videoId ? (
                <>
                  {isPlaying && (
                    <div className="fixed top-0 inset-0 z-50 flex items-center justify-center pointer-events-none">
                      <div
                        className="relative w-full max-w-5xl lg:h-[550px] md:h-[350px] h-[260px] aspect-video p-4 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setPlayingId(null)}
                          className="absolute lg:-top-3 top-1 lg:-right-1 right-3 z-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          <MdClose size={24} />
                        </button>
                        <iframe
                          className="w-full h-full rounded-lg shadow-2xl"
                          src={`${`https://www.youtube.com/embed/${videoId}?autoplay=1` || ""}`}
                          title={slide.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  <div className={`${isPlaying ? "fixed inset-0 z-20 bg-black/75 backdrop-blur-[5px]" : "hidden"}`} />
                  <div className="w-full h-full relative cursor-pointer" onClick={() => setPlayingId(slide.id)}>
                    <Image
                      src={`${`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` || ""}`}
                      alt={slide.title}
                      fill
                      style={{ objectFit: "cover" }}
                      loading={idx === 0 ? "eager" : "lazy"} // الصورة الأولى تحميل سريع
                      placeholder="blur"
                      blurDataURL="/placeholder.png"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center shadow-lg">
                        <CiPlay1 size={30} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 z-10 bg-black/40" />
                  <Image
                    src="/images/hero-default.png"
                    alt={slide.title}
                    fill
                    style={{ objectFit: "cover" }}
                    loading={idx === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                  <div className="absolute lg:top-[40%] top-16 lg:right-16 right-8 text-white z-50">
                    <h3 className="text-xl font-bold mb-1">{slide.title}</h3>
                    <p className="text-3xl lg:text-5xl font-medium leading-tight lg:w-[600px] md:w-96 drop-shadow-lg">{slide.description}</p>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSliderClient;
