import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { FaBook, FaClock } from "react-icons/fa";

const BooksPage = () => {
    return (
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                    title="الكتب الإسلامية"
                    description="مكتبة شاملة تضم كتب الدين الإسلامي، السيرة النبوية الشريفة، التفسير، الفقه، والعقيدة وغيرها من الكتب الدينية النافعة"
                    success={true}
                />

                {/* قسم تحت الإنشاء */}
                <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center mt-12">
                    {/* Status Code */}
                    <div className="relative mb-6">
                        <h2 className="text-8xl md:text-9xl font-bold text-gray-200 dark:text-gray-800">
                            503
                        </h2>
                    </div>

                    {/* العنوان */}
                    <div className="flex items-center gap-3 mb-4">
                        <FaBook className="text-[#0e582d] dark:text-green-400 text-3xl" />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 font-quran">
                            الصفحة تحت الإنشاء
                        </h1>
                    </div>

                    {/* الوصف */}
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-6 text-base md:text-lg leading-relaxed">
                        نعمل حالياً على إعداد مكتبة إسلامية متكاملة لكم.
                        ستتمكنون قريباً من الوصول إلى مجموعة واسعة من الكتب الدينية القيمة.
                    </p>

                    {/* معلومات إضافية */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-md">
                        <div className="flex items-start gap-3 text-right">
                            <FaClock className="text-yellow-600 dark:text-yellow-400 text-xl mt-1 shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                    قريباً بإذن الله
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    نعمل بجد لتوفير أفضل تجربة قراءة للكتب الإسلامية.
                                    شكراً لصبركم وانتظاركم.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* شريط التقدم */}
                    <div className="mt-8 w-full max-w-md">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>التقدم في الإنشاء</span>
                            <span>30%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-linear-to-r from-[#0e582d] to-green-500 h-full rounded-full transition-all duration-500"
                                style={{ width: '30%' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </CustomContainer>
        </section>
    );
};

export default BooksPage;