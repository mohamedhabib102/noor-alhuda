"use client"
import { useAuth } from "@/lib/contextapi";
import CustomContainer from "@/ui/CustomContainer"
import DarkModeToggle from "@/ui/DarkModeToggle";
import Logo from "@/ui/Logo";
import OverlayHelp from "@/ui/OverlayHelp";
import StyleRamdan from "@/ui/StyleRamdan";
import ToggleNavbar from "@/ui/ToggleNavbar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";




const Header: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    const { userData } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [month, setMonth] = useState("");
    

    useEffect(() => {
        setMounted(true);
    }, []);

    const iImage =
        userData?.image ?
            userData.image
            : userData?.imageGoogle && userData.imageGoogle !== "nulll" ?
                userData.imageGoogle : "/images/default.png";

       // Helper to get current time in Egypt (Africa/Cairo)
       const getEgyptTime = () => {
           return new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
       };
       
       const getPrayerTimes = async () => {
           const today = getEgyptTime().toLocaleDateString("en-GB").replaceAll("/", "-");
           const url = `https://api.aladhan.com/v1/timingsByCity/${today}?city=cairo&country=egypt&method=5`;
           const response = await axios.get(url);
           const data = response.data;
        //    console.log(data.data.date.hijri.month.ar)
        const currentMonth = data.data.date.hijri.month.ar;
        setMonth(currentMonth);
       }

       useEffect(() => {
           getPrayerTimes();
       }, []);

    return (
        <>
            <OverlayHelp
                toggle={toggle}
                setToggle={setToggle} />
            <header className="bg-green-950 py-2 relative z-40" dir="ltr">
                
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
            </header>

            {
                month === "رَمَضان" && (
                    <StyleRamdan  />
                )
            }
        </>
    )
}
export default Header;