"use client"
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { MdHotel } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { AdhkarItem } from "@/types/Adhkar";
import Azkar from "@/components/adhkar/Azkar";



const list: AdhkarItem[]= [
    {
        id: 1,
        title: "أذكار الصباح",
        icon: FaMoon
    },
    {
        id: 2,
        title: "أذكار المساء",
        icon: IoMdSunny  
    },
    {
       id: 3,
       title: "أذكار النوم",
       icon: MdHotel
    }
]

const AdhkarPage: React.FC = () => {
    return(
        <section className="py-16">
           <CustomContainer>
            <CustomTitle
                success={false}
                title=" الأذكار "
                description="لمسة صباحية تملأ قلبك بالسكينة"
            />
            <Azkar list={list} />
           </CustomContainer>
        </section>
    )
}
export default AdhkarPage;