"use client"
import { IconType } from "react-icons";
import { MdOutlineHomeMax } from "react-icons/md";
import { FaMosque, FaHandHoldingHeart, FaUser } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/contextapi";


interface OverlayMessage {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Navbar {
    id: number;
    title: string;
    link: string;
    icon: IconType;
}

const NavbarText: Navbar[] = [
    {
        id: 1,
        title: "الرئيسية",
        link: "/",
        icon: MdOutlineHomeMax
    },
    {
        id: 2,
        title: " المجتمع ",
        link: "/community",
        icon: FaMosque
    },
    {
        id: 3,
        title: " مساعدة  ",
        link: "/help",
        icon: IoIosHelpCircleOutline
    },
    {
        id: 4,
        title: " دعمنا ",
        link: "/",
        icon: FaHandHoldingHeart
    }
]


const OverlayHelp: React.FC<OverlayMessage> = ({ toggle, setToggle }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { userData } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-40 bg-black/40 backdrop-blur-sm`}></div>
            <div ref={ref} className={`${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}
        transition-all duration-300 fixed top-1/2 left-1/2 -translate-1/2 z-50 lg:w-96 w-10/12 m-auto bg-gray-100 dark:bg-gray-800 py-6 px-4 rounded-lg`}>
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-(--main-color) dark:text-gray-200 absolute top-2 right-2">
                    <MdClose size={30} />
                </button>
                <ul className="text-right flex justify-end flex-col gap-3 mt-7">
                    {NavbarText.map((nav) => (
                        <li key={nav.id} className="">
                            <Link href={nav.link}
                                className="flex items-center gap-2 justify-start flex-row
                    p-2 bg-[#0e582dd6] rounded-lg hover:bg-[#0e582d] text-white cursor-pointer"
                                onClick={() => setToggle(!toggle)}
                            >
                                <nav.icon size={20} />
                                <span>{nav.title}</span>
                            </Link>
                        </li>
                    ))}

                    {mounted && userData?.personID && (
                        <li className="">
                            <Link href="/profile"
                                className="flex items-center gap-2 justify-start flex-row
                         p-2 bg-[#0e582dd6] rounded-lg hover:bg-[#0e582d] text-white cursor-pointer"
                                onClick={() => setToggle(!toggle)}
                            >
                                <FaUser size={20} />
                                <span>الملف الشخصي</span>
                            </Link>
                        </li>
                     )}

                     {mounted && !userData?.personID && (
                        <li className="">
                            <Link href="/join-us"
                                className="flex items-center gap-2 justify-start flex-row
                         p-2 bg-[#0e582dd6] rounded-lg hover:bg-[#0e582d] text-white cursor-pointer"
                                onClick={() => setToggle(!toggle)}
                            >
                                <FaUser size={20} />
                                <span> الأنضمام إلينا </span>
                            </Link>
                        </li>
                     )}

                    <p className="flex items-center flex-row justify-center mt-2 text-center gap-1 font-semibold text-gray-800 dark:text-gray-200">
                        "
                        <span>  وجودك يعني لنا الكثير </span>
                        <FaHeart size={20} className="text-red-500" />
                        "
                    </p>
                </ul>
            </div>
        </>
    )
}
export default OverlayHelp;