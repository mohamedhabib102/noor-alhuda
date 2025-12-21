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
        title: " الكتب ",
        link: "/books",
        icon: RiBookShelfFill
    }
]

/*


*/


const Services: React.FC = () => {
    return (
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
            <CustomContainer>
                <CustomTitle
                    success={false}
                    title="وردك"
                    description="لمسة صباحية تملأ قلبك بالسكينة"
                />

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {services.map((serv) => (
                        <Link
                            href={serv.link}
                            key={serv.id}
                            className="text-center bg-[#ceaf1584] dark:bg-gray-800 transition duration-300 hover:bg-(--main-bg) dark:hover:bg-gray-700 py-6 rounded-2xl border border-transparent dark:border-gray-700"
                        >
                            <serv.icon
                                size={60}
                                className="m-auto mb-3 text-(--main-color) dark:text-[#4ade80]"
                            />
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{serv.title}</h3>
                        </Link>
                    ))}
                </div>
            </CustomContainer>
        </section>
    )
}

export default Services