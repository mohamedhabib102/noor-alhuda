

'use client';

import Image from 'next/image';
import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { MdClose } from 'react-icons/md';


interface CreatePostProps {
    toggleImage: boolean;
    setToggleImage: React.Dispatch<React.SetStateAction<boolean>>;
    image: string
}


const ShowImageProfile: React.FC<CreatePostProps> = ({ toggleImage, setToggleImage, image}) => {




    return (
        <>
            <div className={`${toggleImage ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-40 bg-black/50 backdrop-blur-sm`}></div>
            <div className={
                `${toggleImage ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}  fixed z-50 top-1/2 left-1/2 -translate-1/2 w-[90%] h-[550px]  max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 transition no-scrollbar`
            }>
                <button onClick={() => setToggleImage(false)} 
                className="cursor-pointer transition duration-200 absolute 
                -top-14 -right-2
                z-50 text-red-500 dark:text-red-800">
                    <MdClose size={50} />
                </button>


                {image && (
                    <Image
                        src={image}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                )}

            </div>
        </>
    );
};export default ShowImageProfile;
