"use client";

import Image from "next/image";


const StyleRamdan: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden">

            <Image
                src="/images/ramdanStyle1.png"
                alt="ramadan decorative"
                width={160}
                height={160}
                className="absolute lg:top-6 top-8 lg:right-10 -right-4 w-32 h-32 md:w-40 md:h-40 object-contain
                transition-all duration-300 anitmation_ramdan z-10"
            />
            <Image
                src="/images/ramdanStyle2.png"
                alt="ramadan decorative"
                width={160}
                height={160}
                className="absolute lg:top-10 top-12 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 object-contain
                transition-all duration-300 anitmation_ramdan"
            />


            <Image
                src="/images/ramdanStyle3.png"
                alt="ramadan decorative"
                width={160}
                height={160}
                className="absolute lg:top-6 top-8 lg:left-10 -left-4 w-32 h-32 md:w-40 md:h-40 object-contain
                transition-all duration-300 anitmation_ramdan"
            />
        </div>
    )
}; export default StyleRamdan;
