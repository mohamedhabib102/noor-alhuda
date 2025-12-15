"use client"
import { Adhkar, AdhkarItem } from "@/types/Adhkar";
import { useEffect, useState } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FaShare } from "react-icons/fa";



interface AzkarProps {
    list: AdhkarItem[];
}

const Azkar: React.FC<AzkarProps> = ({list}) => {
    const [active, setActive] = useState<string>("أذكار الصباح");
    const [azkar, setAzkar] = useState<Adhkar[]>([]);

    const allAzkar = async () => {
        try {
            const res = await fetch("/adhkar.json", {
                cache: "force-cache"
            });
            const data = await res.json();
            console.log(data);
            setAzkar(data);
        } catch (error) {
            console.log(error);
        }
    }

     useEffect(() => {
       const fetchAzkar = async () => {
         await allAzkar();
       };
       fetchAzkar();
     }, []);



    const filterAzkar = azkar.filter((azkar) => azkar.category === active);


    const handleShare = async (zekrText: string) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: "أذكار المسلم",
                text: zekrText + "\n\n📌 من موقع أذكار المسلم",
                url: "https://nour-alhud.vercel.app/"
            });
        } catch (error) {
            console.log("تم إلغاء المشاركة", error);
        }
    } else {
        alert("خاصية المشاركة غير مدعومة في متصفحك");
    }
   };
   

    return(     
        <div>
            <ul className="flex items-center gap-4">
                {list.map((item) => (
                    <li 
                    onClick={() => setActive(item.title)}
                    className={`flex items-center gap-1.5 hover:text-white p-4 hover:bg-(--main-color) hover:border-transparent border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition ${active === item.title ? 'bg-(--main-color) text-white' : ''}`}
                    key={item.id}>
                        <item.icon size={20} className="inline-block" />
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-8">
                {filterAzkar.map((azkar, index) => (
                    azkar.array.map((zekr, index) => (
                        <div 
                        key={index}
                        className="mb-6 last:mb-0"
                        >
                            <p 
                            className="p-3 border border-gray-300 rounded-lg
                        text-[20px] leading-9"
                            >{zekr.text}</p>
                            <div className="flex items-center gap-6 mt-3 justify-between">
                                <div className="cursor-pointer p-2 bg-(--main-color) transition  hover:bg-[#114928] text-white rounded-lg w-34  justify-center flex items-center flex-row-reverse gap-2">
                                    <span>{zekr.count}</span>
                                    <BsArrowCounterclockwise size={25} />
                                </div>
                                <div 
                                onClick={() => handleShare(zekr.text)}
                                className="cursor-pointer p-2 bg-(--main-color) transition  hover:bg-[#114928] text-white rounded-lg w-34 flex items-center gap-2 justify-center">
                                    <span> مشاركة </span>
                                    <FaShare size={25} />
                                </div>
                            </div>
                            {/* <audio controls>
                                <source src={zekr.audio} type="audio/mpeg" />
                            </audio> */}
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}
export default Azkar