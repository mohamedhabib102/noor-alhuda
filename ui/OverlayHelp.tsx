"use client"
import { IconType } from "react-icons";
import { MdOutlineHomeMax } from "react-icons/md";
import { FaMosque, FaHandHoldingHeart, FaUser } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FaHeart, FaQuran } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/contextapi";
import { FaChartBar } from "react-icons/fa6";
import { RiBookShelfFill } from "react-icons/ri";
import { IoHeartCircleSharp } from "react-icons/io5";





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
        title: " الأسئلة  ",
        link: "/questions",
        icon: IoIosHelpCircleOutline
    },
    {
        id: 4,
        title: " القرآن الكريم ",
        link: "/quran",
        icon: FaQuran
    },
    {
        id: 5,
        title: " الكتب والأذاعة القرآنية ",
        link: "/books",
        icon: RiBookShelfFill
    },
    {
        id: 6,
        title: " أوقات الصلاة ",
        link: "/prayer-times",
        icon: IoHeartCircleSharp
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
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-40 bg-black/40 backdrop-blur-xs`}></div>
            <div ref={ref} className={`${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}
        transition-all duration-200 fixed top-1/2 left-1/2 -translate-1/2 z-50 lg:w-96 w-11/12 max-w-sm m-auto bg-white dark:bg-main p-6 shadow-2xl rounded-4xl border border-main/5 dark:border-white/10`}>
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-300 text-gray-400 hover:text-main dark:text-white/50 dark:hover:text-main-bg absolute top-4 right-4">
                    <MdClose size={28} />
                </button>
                <ul className="grid grid-cols-1 gap-3 mt-12">
                    {NavbarText.map((nav) => (
                        <li key={nav.id} className="">
                            <Link href={nav.link}
                                className="group flex items-center gap-4 justify-start p-3 rounded-xl transition-all duration-300 border border-main/5 dark:border-white/5 bg-main/5 dark:bg-white/5 hover:bg-main dark:hover:bg-main-bg text-main dark:text-white/90 hover:text-white  cursor-pointer"
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
                                className="group flex items-center gap-4 justify-start p-3 rounded-xl transition-all duration-300 border border-main/5 dark:border-white/5 bg-main/5 dark:bg-white/5 hover:bg-main dark:hover:bg-main-bg text-main dark:text-white/90 hover:text-white cursor-pointer"
                                onClick={() => setToggle(!toggle)}
                            >
                                <FaUser size={20} />
                                <span>الملف الشخصي</span>
                            </Link>
                        </li>
                    )}

                    {mounted && userData?.role === "Admin" && (
                        <li className="">
                            <Link href="/control"
                                className="group flex items-center gap-4 justify-start p-3 rounded-xl transition-all duration-300 border border-main/5 dark:border-white/5 bg-main/5 dark:bg-white/5 hover:bg-main dark:hover:bg-main-bg text-main dark:text-white/90 hover:text-white  cursor-pointer"
                                onClick={() => setToggle(!toggle)}
                            >
                                <FaChartBar size={20} />
                                <span>  لوحة التحكم </span>
                            </Link>
                        </li>
                    )}

                    {mounted && !userData?.personID && (
                        <li className="">
                            <Link href="/join-us"
                                className="group flex items-center gap-4 justify-start p-3 rounded-xl transition-all duration-300 border border-main/5 dark:border-white/5 bg-main/5 dark:bg-white/5 hover:bg-main dark:hover:bg-main-bg text-main dark:text-white/90 hover:text-white  cursor-pointer"
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