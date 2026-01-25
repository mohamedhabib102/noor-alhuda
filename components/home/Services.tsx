import CustomContainer from "@/ui/CustomContainer"
import { IconType } from "react-icons";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaQuran } from "react-icons/fa";
import { GiPrayerBeads } from "react-icons/gi";
import { FaMosque } from "react-icons/fa6";
import Link from "next/link";
import CustomTitle from "@/ui/CustomTitle";
import { RiBookShelfFill } from "react-icons/ri";





interface Serve {
    id: number;
    title: string;
    icon: IconType;
    link: string
}


const services: Serve[] = [
    {
        id: 1,
        title: " الأذكار ",
        icon: FaBookOpenReader,
        link: "/adhkar"
    },
    {
        id: 3,
        title: " قراءة القرآن ",
        icon: FaQuran,
        link: "/quran"
    },
    {
        id: 4,
        title: " التسبيح ",
        icon: GiPrayerBeads,
        link: "/pray"
    },
    {
        id: 5,
        title: " المجتمع ",
        icon: FaMosque,
        link: "/community"
    },
    {
        id: 6,
        title: " الكتب والأذاعة القرآنية ",
        link: "/books",
        icon: RiBookShelfFill
    }
]




const Services: React.FC = () => {
    return (
        <section className="lg:py-16 py-8 bg-background dark:bg-background border-t border-gray-100 dark:border-transparent">
            <CustomContainer>
                <CustomTitle
                    success={false}
                    title="وردك"
                    description="لمسة صباحية تملأ قلبك بالسكينة"
                />

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-10">
                    {services.map((serv) => (
                        <Link
                            href={serv.link}
                            key={serv.id}
                            className="group text-center bg-brand-gold/5 dark:bg-main/10 transition-all duration-300 hover:bg-main dark:hover:bg-brand-gold py-10 rounded-[2.5rem] border border-brand-gold/20 dark:border-main/20 shadow-sm hover:shadow-xl hover:-translate-y-2"
                        >
                            <div className="w-20 h-20 m-auto mb-6 bg-white dark:bg-main/30 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-white/20 transition-colors">
                                <serv.icon
                                    size={40}
                                    className="text-main dark:text-brand-gold group-hover:text-white transition-colors"
                                />
                            </div>
                            <h3 className="font-bold text-xl text-main dark:text-brand-gold group-hover:text-white transition-colors">{serv.title}</h3>
                        </Link>
                    ))}
                </div>
            </CustomContainer>
        </section>
    )
}

export default Services