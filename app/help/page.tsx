"use client";

import React from "react";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { FaBookOpen, FaHandHoldingHeart, FaUserSecret, FaClipboardCheck } from "react-icons/fa";
import { MdOutlineSecurity, MdRecordVoiceOver } from "react-icons/md";
import { BsPatchQuestionFill } from "react-icons/bs";
import { RiCommunityLine } from "react-icons/ri";

const HelpPage = () => {
    return (
        <div className="py-10 min-h-screen bg-gray-50 dark:bg-[#0f1014] transition-colors duration-300">
            <CustomContainer>
                <div className="mb-12">
                    <CustomTitle
                        title="مركز المساعدة"
                        description="تعرف على رؤية نور الهدى، أهدافنا، وقواعد المشاركة في مجتمعنا"
                        success={false}
                    />
                </div>

                <div className="space-y-16 text-right" dir="rtl">
                    {/* Section 1: About / Vision */}
                    <section className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform hover:scale-110 duration-500"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400">
                                <FaBookOpen size={40} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                                    ما هي فكرة المنصة؟
                                </h2>
                                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                    نور الهدى هي منصة تهدف أولاً وأخيراً لتوعية الأمة الإسلامية ونشر العلم النافع.
                                    نحن نسعى لخلق بيئة تشاركية تساهم في التنمية الدينية والثقافية، حيث يمكن للجميع
                                    مشاركة الأسئلة الدينية، تبادل المعرفة، والنقاش الهادف في أمور ديننا ودنيانا،
                                    لنرتقي معاً بفهمنا وتطبيقنا لتعاليم الإسلام الحنيف.
                                </p>
                            </div>
                        </div>
                    </section>


                    <section>
                        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
                            <MdRecordVoiceOver className="text-green-600" />
                            كيف تشارك معنا؟
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Community Posts Card */}
                            <div className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                        <RiCommunityLine size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">المجتمع والمنشورات</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    يمكنك المشاركة في المجتمع من خلال حسابك الشخصي، مع ميزة اختيار النشر 
                                    <span className="font-semibold"> كمجهول الهوية</span> إذا رغبت بذلك. 
                                    هذه الميزة تمنحك الخصوصية بينما يظل المنشور مرتبطاً بحسابك.
                                </p>
                                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg inline-block">
                                    * تظهر المنشورات مباشرة بعد النشر، مع إمكانية تفعيل النشر كمجهول الهوية من إعدادات الحساب
                                </div>
                            </div>


                            {/* Questions Card */}
                            <div className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                        <BsPatchQuestionFill size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">الأسئلة والاستفسارات</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    لديك سؤال ديني؟ يمكنك طرحه هنا، سواء بحسابك أو كمجهول الهوية (Anonymous).
                                    نحرص بشدة على دقة المعلومات، لذا فإن الأسئلة تخضع للمراجعة قبل الظهور.
                                </p>
                                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-900/10 p-2 rounded-lg inline-block">
                                    * يتطلب موافقة الإدارة قبل النشر
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Rules and Guidelines */}
                    <section className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <MdOutlineSecurity size={30} className="text-red-500" />
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                شروط وقوانين المنصة
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <FaClipboardCheck className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200">الهدف هو الوعي</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        يجب أن يكون لأي منشور أو سؤال هدف واضح يخدم التوعية الدينية أو المجتمع. يمنع الحديث في مواضيع عشوائية لا فائدة منها.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <FaUserSecret className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200">المشاركة كمجهول الهوية </h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        نحترم خصوصيتك، يمكنك المشاركة كـ  مجهول لكن تذكر، الله يراك استخدم هذه الميزة بمسؤولية لنشر الخير.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">!</div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200">الدقة والأمانة العلمية</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        عند طرح سؤال أو إجابة، تأكد من أنك قد درست المسألة أو تنقل عن مصادر موثوقة. الدين ليس مجالاً للتجربة أو الرأي الشخصي غير المبني على علم.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="mt-1">
                                    <MdOutlineSecurity className="text-red-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200">سياسة المخالفات والحظر</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 leading-loose">
                                        في حال مخالفة القواعد، يتم التعامل كالتالي:
                                        <br />
                                        1. يتم إرسال <span className="font-bold">تحذير أول</span> عبر البريد الإلكتروني مع حذف المحتوى المخالف.
                                        <br />
                                        2. في حال التكرار، يتم إرسال <span className="font-bold">تحذير ثاني</span>.
                                        <br />
                                        3. عند المرة الثالثة، يتم <span className="font-bold">حظر المستخدم نهائياً</span> من المنصة.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer Quote */}
                    <div className="text-center py-8 opacity-80">
                        <div className="inline-flex items-center gap-2 text-xl font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                            <FaHandHoldingHeart className="text-red-500 animate-pulse" />
                            <span>وجودك يعني لنا الكثير، ونسعد بمشاركتك في الأجر</span>
                        </div>
                    </div>

                </div>
            </CustomContainer>
        </div>
    );
};

export default HelpPage;
