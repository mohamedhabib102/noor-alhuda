"use client"
import { useAuth } from "@/lib/contextapi";
import CustomContainer from "@/ui/CustomContainer"
import DarkModeToggle from "@/ui/DarkModeToggle";
import Logo from "@/ui/Logo";
import OverlayHelp from "@/ui/OverlayHelp";
import OverlayLogined from "@/ui/OverlayLogined";
import ToggleNavbar from "@/ui/ToggleNavbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";




const Header: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    const { userData } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const iImage = 
    userData?.image ?
    userData.image 
    : userData?.imageGoogle && userData.imageGoogle !== "nulll" ? 
    userData.imageGoogle : "/images/default.png"

    return (
        <>
            <OverlayHelp
                toggle={toggle}
                setToggle={setToggle} />
            <section className="bg-linear-to-r from-[#121212] to-[#ceaf15] py-2 relative" dir="ltr">
                <CustomContainer>
                    <nav className="flex items-center justify-between">
                        <Logo />
                        <div className="flex items-center gap-2.5 flex-row-reverse">
                            <ToggleNavbar setToggle={setToggle} toggle={toggle} />
                            <DarkModeToggle />
                            {mounted && userData?.personID && (
                                <Link href={`/profile/`}
                                    className="">
                                    {mounted && userData.personID && (
                                        <Image
                                            src={
                                                iImage
                                            }
                                            alt="user"
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 rounded-full object-contain"
                                        />
                                    )
                                    }
                                </Link>
                            )}
                        </div>
                    </nav>
                </CustomContainer>
            </section>
        </>
    )
}
export default Header;