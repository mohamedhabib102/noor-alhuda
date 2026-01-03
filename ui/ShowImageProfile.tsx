

'use client';

import Image from 'next/image';
import { useState, ChangeEvent, FormEvent, useRef } from 'react';
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



    return (
        <>
            <div className={`${toggleImage ? "opacity-100 visible" : "opacity-0 invisible"} fixed inset-0 z-40 bg-black/50 backdrop-blur-sm`} />

            <div
                className={
                    `${toggleImage ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"} fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 md:p-6 transition-all duration-300 overflow-hidden`
                }
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                            {image ? (
                                <Image src={image} alt={nameUser || 'avatar'} width={48} height={48} className="object-cover w-full h-full blur-[0.8px]" />
                            ) : (
                                <span className="text-sm font-semibold text-(--main-bg)">{(nameUser || 'ن').charAt(0)}</span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100">{nameUser || 'مستخدم'}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">عرض الصورة الشخصية</p>
                        </div>
                    </div>

                    <button onClick={() => setToggleImage(false)} className="p-1 rounded-md text-gray-500 hover:text-red-500 transition">
                        <MdClose size={26} />
                    </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="relative w-full h-[60vh] md:h-[52vh] lg:h-[48vh]">
                        {image ? (
                            <Image src={image} alt={nameUser || 'profile image'} fill className="object-contain blur-[3px]" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">لا توجد صورة</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};export default ShowImageProfile;
