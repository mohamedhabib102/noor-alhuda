"use client";

import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import Link from "next/link";
import { FaShieldAlt, FaUserSecret, FaServer, FaCookieBite, FaExternalLinkAlt } from "react-icons/fa";

const PrivacyPage = () => {
    return (
        <section className="py-16 min-h-screen transition-colors duration-300">
            <CustomContainer>
                <CustomTitle
                    title="سياسة الخصوصية"
                    description="نحن نولي أهمية قصوى لخصوصية بياناتك. تعرف على كيفية تعاملنا مع المعلومات."
                    success={false}
                />

                <div className="space-y-12 mt-12 text-right" dir="rtl">

                    {/* Introduction */}
                    <div className="bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-2xl text-main dark:text-main-bg">
                                <FaShieldAlt size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-foreground dark:text-gray-100">مقدمة</h2>
                        </div>
                        <p className="text-foreground/80 dark:text-gray-300 leading-loose text-lg">
                            مرحباً بك في منصة "نور الهدى". نحن ندرك أهمية الخصوصية بالنسبة لك، ونلتزم بحماية معلوماتك الشخصية واحترام حقوقك. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا للمعلومات عند استخدامك لموقعنا.
                        </p>
                    </div>

                    {/* Information We Collect */}
                    <div className="bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-2xl text-main dark:text-main-bg">
                                <FaUserSecret size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-foreground dark:text-gray-100">المعلومات التي نجمعها</h2>
                        </div>
                        <ul className="space-y-4 text-foreground/80 dark:text-gray-300 list-disc list-inside leading-loose text-lg">
                            <li>
                                <strong className="text-foreground dark:text-white">معلومات الحساب:</strong> عند التسجيل باستخدام Google، نقوم بتخزين اسمك، بريدك الإلكتروني، وصورتك الشخصية لتسهيل عملية الدخول والتعرف عليك في المجتمع.
                            </li>
                            <li>
                                <strong className="text-foreground dark:text-white">بيانات الاستخدام:</strong> قد نجمع معلومات غير شخصية حول كيفية تفاعلك مع الموقع (مثل الصفحات التي تزورها) لتحسين تجربة المستخدم.
                            </li>
                        </ul>
                    </div>

                    {/* Third Party Services & APIs */}
                    <div className="bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-2xl text-main dark:text-main-bg">
                                <FaServer size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-foreground dark:text-gray-100">خدمات الطرف الثالث ومصادر البيانات</h2>
                        </div>
                        <p className="text-foreground/80 dark:text-gray-300 mb-6 text-lg">
                            يعتمد موقع "نور الهدى" على خدمات برمجية (APIs) موثوقة لتوفير المحتوى الديني الدقيق. نحن لا نتحكم في كيفية جمع هذه الخدمات للبيانات، ولكننا نستخدمها فقط لعرض المعلومات العام:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-4 border border-main-bg/10 dark:border-main/10 bg-main-bg/5 dark:bg-main/5 rounded-2xl">
                                <Link
                                    href="https://alquran.cloud/api"
                                    target="_blank"
                                    className="font-bold text-lg text-foreground dark:text-white mb-2 flex items-center gap-2 hover:text-main dark:hover:text-main-bg transition-colors">
                                    <FaExternalLinkAlt className="text-xs text-main dark:text-main-bg" />
                                    Al Quran Cloud API
                                </Link>
                                <p className="text-foreground/70 dark:text-gray-400 text-sm">
                                    نستخدم هذه الخدمة لعرض نصوص القرآن الكريم والسور.
                                </p>
                            </div>
                            <div className="p-4 border border-main-bg/10 dark:border-main/10 bg-main-bg/5 dark:bg-main/5 rounded-2xl">
                                <Link
                                    href="https://aladhan.com/prayer-times-api"
                                    target="_blank"
                                    className="font-bold text-lg text-foreground dark:text-white mb-2 flex items-center gap-2 hover:text-main dark:hover:text-main-bg transition-colors">
                                    <FaExternalLinkAlt className="text-xs text-main dark:text-main-bg" />
                                    Aladhan API
                                </Link>
                                <p className="text-foreground/70 dark:text-gray-400 text-sm">
                                    نستخدم هذه الخدمة لتوفير مواقيت الصلاة الدقيقة حسب موقعك الجغرافي.
                                </p>
                            </div>
                            <div className="p-4 border border-main-bg/10 dark:border-main/10 bg-main-bg/5 dark:bg-main/5 rounded-2xl">
                                <Link
                                    href="https://github.com/alihmada/Islamic-APIs"
                                    target="_blank"
                                    className="font-bold text-lg text-foreground dark:text-white mb-2 flex items-center gap-2 hover:text-main dark:hover:text-main-bg transition-colors">
                                    <FaExternalLinkAlt className="text-xs text-main dark:text-main-bg" />
                                    Islamic Radio Service
                                </Link>
                                <p className="text-foreground/70 dark:text-gray-400 text-sm">
                                    نستخدم هذه الخدمة لتوفير البث المباشر لإذاعات القرآن الكريم بجودة عالية.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cookies */}
                    <div className="bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-2xl text-main dark:text-main-bg">
                                <FaCookieBite size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-foreground dark:text-gray-100">ملفات الارتباط (Cookies)</h2>
                        </div>
                        <p className="text-foreground/80 dark:text-gray-300 leading-loose text-lg">
                            نستخدم ملفات تعريف الارتباط لتحسين تجربتك، مثل تذكر تفضيلاتك (كالوضع الليلي) وحالة تسجيل الدخول. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات متصفحك، ولكن قد يؤثر ذلك على بعض وظائف الموقع.
                        </p>
                    </div>

                    {/* Updates */}
                    <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400">
                            آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
                        </p>
                    </div>

                </div>
            </CustomContainer>
        </section>
    );
};

export default PrivacyPage;
