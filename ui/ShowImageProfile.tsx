

'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';


interface CreatePostProps {
    toggleImage: boolean;
    setToggleImage: React.Dispatch<React.SetStateAction<boolean>>;
    image: string;
    nameUser?: string;
}


const ShowImageProfile: React.FC<CreatePostProps> = ({
    toggleImage,
    setToggleImage,
    image,
    nameUser,
}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [imgError, setImgError] = useState(false);

    let safeImgSrc = "/images/default.png";
    const isValidString = (str: any) => typeof str === "string" && str.trim() !== "" && str !== "null" && str !== "undefined" && str !== "nulll";

    if (isValidString(image)) {
        safeImgSrc = image;
    }

    if (!safeImgSrc.startsWith("http") && !safeImgSrc.startsWith("/") && !safeImgSrc.startsWith("data:")) {
        safeImgSrc = "/" + safeImgSrc;
    }

    useEffect(() => {
        setImgError(false);
    }, [safeImgSrc]);


    const handlerMouse = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setToggleImage(false);
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handlerMouse);

        return () => {
            document.removeEventListener("mousedown", handlerMouse);
        }
    }, [ref])


    return (
        <>
            <div className={`${toggleImage ? "opacity-100 visible" : "opacity-0 invisible"} fixed inset-0 z-40 bg-black/50 backdrop-blur-sm`} />

            <div
                ref={ref}
                className={
                    `${toggleImage ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"} fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-3xl mx-auto bg-white dark:bg-[#0a1a0f] border border-main/10 dark:border-main/20 rounded-2xl shadow-2xl p-4 md:p-6 transition-all duration-300 overflow-hidden`
                }
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-main/5 dark:bg-main/10 flex items-center justify-center overflow-hidden border border-main/10">
                            <Image src={imgError ? "/images/default.png" : safeImgSrc} alt={nameUser || 'avatar'} width={48} height={48} className="object-cover w-full h-full blur-[0.8px]" onError={() => setImgError(true)} />
                        </div>
                        <div>
                            <h3 className="text-sm md:text-base font-bold text-main-bg dark:text-gray-200">{nameUser || 'مستخدم'}</h3>
                            <p className="text-xs text-main-bg/60 dark:text-gray-400 font-medium">عرض الصورة الشخصية</p>
                        </div>
                    </div>

                    <button onClick={() => setToggleImage(false)} className="p-1 rounded-md text-main-bg/50 hover:text-red-500 transition hover:bg-red-50 dark:text-gray-400 dark:hover:bg-white/5">
                        <MdClose size={26} />
                    </button>
                </div>

                <div className="bg-main/5 dark:bg-black/20 rounded-lg overflow-hidden border border-main/10 dark:border-main/20">
                    <div className="relative w-full h-[60vh] md:h-[52vh] lg:h-[48vh]">
                        <Image src={imgError ? "/images/default.png" : safeImgSrc} alt={nameUser || 'profile image'} fill className="object-contain blur-[3px]" onError={() => setImgError(true)} />
                    </div>
                </div>
            </div>
        </>
    );
}; export default ShowImageProfile;
