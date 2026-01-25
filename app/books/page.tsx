"use client";

import Broadcast from "@/components/books/Broadcast";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { useState } from "react";
import { FaBook, FaMicrophone, FaHistory, FaClock } from "react-icons/fa";

const Categories = [
    { id: 1, title: "الكتب الإسلامية", value: "books", icon: <FaBook /> },
    { id: 2, title: "إذاعة القرآن الكريم", value: "radio", icon: <FaMicrophone /> },
    { id: 3, title: "السيرة النبوية", value: "sira", icon: <FaHistory /> },
];

const BooksPage = () => {
    const [active, setActive] = useState("radio");

    return (
        <section className="py-16 bg-main/5 dark:bg-black min-h-screen">
            <CustomContainer>
                <CustomTitle
                    title="المكتبة والوسائط"
                    description="وجهتكم الشاملة للكتب الإسلامية، السيرة النبوية العطرة، وبث إذاعة القرآن الكريم على مدار الساعة"
                    success={true}
                />

                {/* Filter Section */}
                <ul className="flex items-center justify-start md:justify-center gap-4 mt-12 mb-16 overflow-x-auto pb-4 no-scrollbar" dir="rtl">
                    {Categories.map((cat) => (
                        <li
                            key={cat.id}
                            onClick={() => setActive(cat.value)}
                            className={`shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 font-black active:scale-95 shadow-sm
                                ${active === cat.value
                                    ? "bg-main border-main text-white shadow-main/20"
                                    : "bg-white dark:bg-main-bg/10 border-main-bg/10 dark:border-main-bg/20 text-main-bg dark:text-gray-400 hover:border-main/30"
                                }`}
                        >
                            <span className="text-xl">{cat.icon}</span>
                            <span className="text-lg whitespace-nowrap">{cat.title}</span>
                        </li>
                    ))}
                </ul>

                {/* Content Section */}
                <div className="mt-8">
                    {active === "books" && (
                        <div className="text-center py-20 bg-white dark:bg-main-bg/5 rounded-4xl border border-main/10 shadow-xl">
                            <div className="w-20 h-20 bg-main/10 rounded-full flex items-center justify-center mx-auto mb-6 text-main">
                                <FaBook size={40} />
                            </div>
                            <h2 className="text-3xl font-black text-main-bg dark:text-white mb-4">قسم الكتب الإسلامية</h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto font-bold">نعمل حالياً على أرشفة مكتبة ضخمة تضم أمهات الكتب الإسلامية والتفسير والحديث.</p>
                            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-main-bg/10 text-main-bg rounded-full text-sm font-black">
                                <FaClock />
                                <span>قريباً بإذن الله</span>
                            </div>
                        </div>
                    )}

                    {active === "radio" && (
                        <div className="text-center py-20 px-8 bg-white dark:bg-main-bg/5 rounded-4xl border border-main/10 shadow-xl">
                            <Broadcast />
                        </div>
                    )}

                    {active === "sira" && (
                        <div className="text-center py-20 bg-white dark:bg-main-bg/5 rounded-4xl border border-main/10 shadow-xl">
                            <div className="w-20 h-20 bg-main/10 rounded-full flex items-center justify-center mx-auto mb-6 text-main">
                                <FaHistory size={40} />
                            </div>
                            <h2 className="text-3xl font-black text-main-bg dark:text-white mb-4">السيرة النبوية العطرة</h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto font-bold">موسوعة كاملة عن حياة خير البرية صلى الله عليه وسلم، من الميلاد حتى الوفاة بالتفصيل.</p>
                            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-main-bg/10 text-main-bg rounded-full text-sm font-black">
                                <FaClock />
                                <span>قريباً بإذن الله</span>
                            </div>
                        </div>
                    )}
                </div>

            </CustomContainer>
        </section>
    );
};

export default BooksPage;