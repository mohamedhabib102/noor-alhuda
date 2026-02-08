"use client";

import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { FaBookOpen, FaHandshake, FaExclamationTriangle, FaCode, FaCodeBranch } from "react-icons/fa";

const TermsPage = () => {
    return (
        <section className="py-16 min-h-screen transition-colors duration-300">
            <CustomContainer>
                <CustomTitle
                    title="شروط الاستخدام"
                    description="يرجى قراءة هذه الشروط بعناية لضمان الاستخدام الأمثل لمنصة نور الهدى."
                    success={false}
                />

                <div className="space-y-12 mt-12 text-right" dir="rtl">

                    {/* Introduction */}
                    <div className="bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-2xl text-main dark:text-main-bg">
                                <FaHandshake size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-foreground dark:text-gray-100">قبول الشروط</h2>
                        </div>
                        <p className="text-foreground/80 dark:text-gray-300 leading-loose text-lg">
                            باستخدامك لموقع "نور الهدى"، فإنك توافق صراحةً على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يرجى التوقف عن استخدام الموقع فوراً.
                        </p>
                    </div>

                    {/* Intellectual Property & Data Sources */}
                    <div className="bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-2xl text-main dark:text-main-bg">
                                <FaCode size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-foreground dark:text-gray-100">حقوق النشر ومصادر البيانات</h2>
                        </div>
                        <p className="text-foreground/80 dark:text-gray-300 mb-6 text-lg">
                            نحن نحترم حقوق الملكية الفكرية للآخرين ونلتزم بذكر المصادر التي نعتمد عليها في تقديم المعلومات الدينية:
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-main-bg/5 dark:bg-main/5 border border-main-bg/10 dark:border-main/10 shadow-inner">
                                <div className="mt-1 text-main dark:text-main-bg font-bold">•</div>
                                <div>
                                    <h3 className="font-bold text-foreground dark:text-white mb-1">القرآن الكريم</h3>
                                    <p className="text-foreground/70 dark:text-gray-400 text-sm">
                                        يتم استرداد نصوص القرآن الكريم ومعانيها عبر <a href="https://alquran.cloud" target="_blank" rel="noopener noreferrer" className="text-main dark:text-main-bg hover:text-main-bg hover:underline transition-colors">Al Quran Cloud API</a>. جميع الحقوق تعود لمطوري هذا المصدر الموثوق.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-main-bg/5 dark:bg-main/5 border border-main-bg/10 dark:border-main/10 shadow-inner">
                                <div className="mt-1 text-main dark:text-main-bg font-bold">•</div>
                                <div>
                                    <h3 className="font-bold text-foreground dark:text-white mb-1">مواقيت الصلاة</h3>
                                    <p className="text-foreground/70 dark:text-gray-400 text-sm">
                                        تعتمد بيانات الأذان ومواقيت الصلاة على خدمة <a href="https://aladhan.com" target="_blank" rel="noopener noreferrer" className="text-main dark:text-main-bg hover:text-main-bg hover:underline transition-colors">Aladhan API</a>، التي توفر حسابات فلكية دقيقة.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-main-bg/5 dark:bg-main/5 border border-main-bg/10 dark:border-main/10 shadow-inner">
                                <div className="mt-1 text-main dark:text-main-bg font-bold">•</div>
                                <div>
                                    <h3 className="font-bold text-foreground dark:text-white mb-1">المحتوى الخاص</h3>
                                    <p className="text-foreground/70 dark:text-gray-400 text-sm">
                                        جميع المقالات، الأذكار التي تم إدخالها يدوياً، وتصميمات "نور الهدى" هي ملكية خاصة للمنصة، ولا يجوز نسخها أو إعادة نشرها دون إذن مسبق إلا لغرض الخير ونشر العلم مع ذكر المصدر.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Use License */}
                    <div className="bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-2xl text-main dark:text-main-bg">
                                <FaBookOpen size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-foreground dark:text-gray-100">رخصة الاستخدام</h2>
                        </div>
                        <p className="text-foreground/80 dark:text-gray-300 leading-loose text-lg mb-4">
                            يُسمح لك باستخدام مواد "نور الهدى" للأغراض الشخصية، التعليمية، والدعوية غير التجارية. يمنع منعاً باتاً:
                        </p>
                        <ul className="list-disc list-outside mr-5 space-y-2 text-foreground/80 dark:text-gray-300">
                            <li>استخدام محتوى الموقع في مشاريع تجارية دون إذن.</li>
                            <li>محاولة اختراق أو تخريب الخوادم أو قواعد البيانات الخاصة بنا.</li>
                            <li>نشر محتوى مسيء أو مخالف لتعاليم الدين الإسلامي في أقسام المجتمع.</li>
                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-400">
                                <FaExclamationTriangle size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-foreground dark:text-gray-100">إخلاء المسؤولية</h2>
                        </div>
                        <p className="text-foreground/80 dark:text-gray-300 leading-loose text-lg">
                            نحن نبذل قصارى جهدنا لضمان دقة المعلومات الدينية (خاصة القرآن والأحاديث)، ولكننا بشر وقد نخطئ. في حال وجود أي خطأ، نرجو التواصل معنا فوراً، ونخلي مسؤوليتنا عن أي تفسير خاطئ للمعلومات من قبل المستخدمين.
                        </p>
                    </div>

                    {/* Version History */}
                    <div className="bg-white dark:bg-main/5 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-2xl text-main dark:text-main-bg">
                                <FaCodeBranch size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-foreground dark:text-gray-100">سجل التحديثات والإصدارات</h2>
                        </div>
                        <div className="space-y-12 relative before:absolute before:right-[7px] before:top-2 before:h-full before:w-[2px] before:bg-gray-200 dark:before:bg-gray-700">

                            {/* Version 1.2.0 - Current */}
                            <div className="relative pr-8">
                                <div className="absolute right-0 top-2 w-4 h-4 rounded-full bg-main-bg border-4 border-white dark:border-gray-800 shadow-sm z-10"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-foreground dark:text-white">الإصدار 1.2.0</h3>
                                    <span className="px-3 py-1 rounded-full bg-main-bg/10 text-main-bg text-xs font-bold w-fit">
                                        الإصدار الحالي
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-auto sm:mr-0">
                                        {new Date().toISOString().split('T')[0]}
                                    </span>
                                </div>
                                <p className="text-foreground/80 dark:text-gray-300 text-lg leading-relaxed">
                                    في هذا الإصدار، ركزنا على تعزيز الجانب الروحاني والقانوني للمنصة:
                                </p>
                                <ul className="list-disc list-outside mr-5 mt-2 space-y-1 text-foreground/80 dark:text-gray-300">
                                    <li>
                                        <span className="text-main dark:text-main-bg font-bold">جديد:</span> إضافة قسم <strong>القرآن الكريم</strong> الكامل مع التلاوات والإذاعة.
                                    </li>
                                    <li>إطلاق صفحات <strong>سياسة الخصوصية</strong> و <strong>شروط الاستخدام</strong> لضمان الشفافية.</li>
                                    <li>
                                        <span className="text-main dark:text-main-bg font-bold">تحسين:</span> <strong>وضع القراءة</strong> في القران الكريم في السور لتجربة أكثر خشوعاً.
                                    </li>
                                </ul>
                            </div>

                            {/* Version 1.1.0 */}
                            <div className="relative pr-8 opacity-80 hover:opacity-100 transition-opacity">
                                <div className="absolute right-0 top-2 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-gray-800 shadow-sm z-10"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-foreground dark:text-white">الإصدار 1.1.0</h3>
                                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold w-fit">
                                        تحديث المجتمع
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-auto sm:mr-0">
                                        2026-01-11
                                    </span>
                                </div>
                                <p className="text-foreground/80 dark:text-gray-300 text-lg leading-relaxed">
                                    تم إطلاق <strong>مجتمع نور الهدى</strong> لتعزيز التفاعل بين المستخدمين:
                                </p>
                                <ul className="list-disc list-outside mr-5 mt-2 space-y-1 text-foreground/80 dark:text-gray-300">
                                    <li>نظام <strong>المنشورات</strong> والتفاعل (إعجاب، تعليق).</li>
                                    <li>قسم <strong>الأسئلة والأجوبة</strong> لتبادل المعرفة الدينية.</li>
                                    <li>إضافة جزء <strong>للحسابات الشخصية</strong> وتعديل الحساب.</li>
                                </ul>
                            </div>

                            {/* Version 1.0.0 */}
                            <div className="relative pr-8 opacity-60 hover:opacity-100 transition-opacity">
                                <div className="absolute right-0 top-2 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-gray-800 shadow-sm z-10"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-foreground dark:text-white">الإصدار 1.0.0</h3>
                                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold w-fit">
                                        الإطلاق الرسمي
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-auto sm:mr-0">
                                        2025-11-11
                                    </span>
                                </div>
                                <p className="text-foreground/80 dark:text-gray-300 text-lg leading-relaxed">
                                    انطلاق منصة "نور الهدى" بالأساسيات:
                                </p>
                                <ul className="list-disc list-outside mr-5 mt-2 space-y-1 text-foreground/80 dark:text-gray-300">
                                    <li>تأسيس البنية التحتية للموقع.</li>
                                    <li>مواقيت الصلاة الأساسية.</li>
                                    <li>الأذكار وحصن المسلم.</li>
                                </ul>
                            </div>
                        </div>
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

export default TermsPage;
