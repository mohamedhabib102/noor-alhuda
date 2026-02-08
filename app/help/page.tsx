"use client";

import React from "react";
import Link from "next/link";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { FaBookOpen, FaHandHoldingHeart, FaUserSecret, FaClipboardCheck, FaGavel, FaFileContract } from "react-icons/fa";
import { MdOutlineSecurity, MdRecordVoiceOver } from "react-icons/md";
import { BsPatchQuestionFill } from "react-icons/bs";
import { RiCommunityLine } from "react-icons/ri";

const HelpPage = () => {
    return (
        <div className="py-10 min-h-screen transition-colors duration-300">
            <CustomContainer>
                <div className="mb-12">
                    <CustomTitle
                        title="مركز المساعدة والقوانين"
                        description="دليلك الشامل لفهم رؤية نور الهدى، قواعد المجتمع، والسياسات القانونية."
                        success={false}
                    />
                </div>

                <div className="space-y-16 text-right" dir="rtl">
                    {/* Section 1: About / Vision */}
                    <section className="relative bg-white dark:bg-main/5 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-main/10 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-main-bg/10 rounded-bl-full -mr-10 -mt-10 transition-transform hover:scale-110 duration-500"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                            <div className="p-4 bg-main/10 dark:bg-main-bg/10 rounded-xl text-main dark:text-main-bg">
                                <FaBookOpen size={40} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-gray-100">
                                    ما هي فكرة المنصة؟
                                </h2>
                                <p className="text-lg leading-relaxed text-foreground/80 dark:text-gray-300">
                                    نور الهدى هي منصة تهدف أولاً وأخيراً لتوعية الأمة الإسلامية ونشر العلم النافع.
                                    نحن نسعى لخلق بيئة تشاركية تساهم في التنمية الدينية والثقافية، حيث يمكن للجميع
                                    مشاركة الأسئلة الدينية، تبادل المعرفة، والنقاش الهادف في أمور ديننا ودنيانا،
                                    لنرتقي معاً بفهمنا وتطبيقنا لتعاليم الإسلام الحنيف.
                                </p>
                            </div>
                        </div>
                    </section>


                    <section>
                        <h2 className="text-2xl font-bold mb-8 text-center text-foreground dark:text-gray-100 flex items-center justify-center gap-3">
                            <MdRecordVoiceOver className="text-main dark:text-main-bg" />
                            كيف تشارك معنا؟
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Community Posts Card */}
                            <div className="group bg-white dark:bg-main/5 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-main/10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-lg text-main dark:text-main-bg group-hover:scale-110 transition-transform">
                                        <RiCommunityLine size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-gray-100">المجتمع والمنشورات</h3>
                                </div>
                                <p className="text-foreground/80 dark:text-gray-300 leading-relaxed mb-4">
                                    يمكنك المشاركة في المجتمع من خلال حسابك الشخصي لنشر المعرفة وتبادل الخبرات.
                                    تساهم منشوراتك في بناء مجتمع إسلامي واعي ومترابط يسعى للخير دائماً.
                                </p>
                                <div className="text-sm text-main dark:text-main-bg font-medium bg-main/5 dark:bg-main-bg/10 p-2 rounded-lg inline-block">
                                    * تظهر المنشورات مباشرة بعد النشر لمن يتابعونك وفي الصفحة العامة للمجتمع
                                </div>
                            </div>


                            {/* Questions Card */}
                            <div className="group bg-white dark:bg-main/5 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-main/10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-lg text-main dark:text-main-bg group-hover:scale-110 transition-transform">
                                        <BsPatchQuestionFill size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-gray-100">شارك خبرتك وعلمك</h3>
                                </div>
                                <p className="text-foreground/80 dark:text-gray-300 leading-relaxed mb-4">
                                    هل لديك معلومة دينية أو فقهية تود نشرها؟ يمكنك طرح السؤال مع إجابته الصحيحة لتعم الفائدة.
                                    نحرص بشدة على دقة المعلومات، لذا تخضع المشاركات للمراجعة العلمية قبل الظهور للعامة.
                                </p>
                                <div className="text-sm text-main dark:text-main-bg font-medium bg-main/5 dark:bg-main-bg/10 p-2 rounded-lg inline-block">
                                    * ترفع السؤال مع إجابته الموثوقة ويتم مراجعتها قبل النشر
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Rules and Guidelines */}
                    <section className="bg-main/5 dark:bg-main/5 p-8 rounded-2xl border border-main/10 dark:border-main/10">
                        <div className="flex items-center gap-3 mb-6">
                            <MdOutlineSecurity size={30} className="text-main-bg" />
                            <h2 className="text-2xl font-bold text-foreground dark:text-gray-100">
                                شروط وقوانين المجتمع
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <FaClipboardCheck className="text-main dark:text-main-bg" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground dark:text-white">الهدف هو الوعي</h4>
                                    <p className="text-foreground/70 dark:text-gray-400 text-sm mt-1">
                                        يجب أن يكون لأي منشور أو سؤال هدف واضح يخدم التوعية الدينية أو المجتمع. يمنع الحديث في مواضيع عشوائية لا فائدة منها.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <FaUserSecret className="text-main dark:text-main-bg" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground dark:text-white">الاحترام والتقدير</h4>
                                    <p className="text-foreground/70 dark:text-gray-400 text-sm mt-1">
                                        يجب الالتزام بآداب الحوار الإسلامي، وتجنب الإساءة لأي شخص أو جهة. المنصة مكان للتعلم والرقي الأخلاقي.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <div className="w-5 h-5 rounded-full bg-main dark:bg-main-bg flex items-center justify-center text-white dark:text-black text-xs font-bold">!</div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground dark:text-white">الدقة والأمانة العلمية</h4>
                                    <p className="text-foreground/70 dark:text-gray-400 text-sm mt-1">
                                        عند طرح سؤال أو إجابة، تأكد من أنك قد درست المسألة أو تنقل عن مصادر موثوقة. الدين ليس مجالاً للتجربة أو الرأي الشخصي غير المبني على علم.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-main/10 dark:border-main/10">
                                <div className="mt-1">
                                    <MdOutlineSecurity className="text-red-500" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground dark:text-white">سياسة المخالفات والحظر</h4>
                                    <p className="text-foreground/70 dark:text-gray-400 text-sm mt-1 leading-loose">
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

                    {/* Section 4: Legal & Policy Links */}
                    <section className="relative overflow-hidden bg-white dark:bg-main/5 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-main/10">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-main-bg/5 rounded-br-full -ml-10 -mt-10"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-main-bg/20 dark:bg-main/20 rounded-xl text-main dark:text-main-bg">
                                    <FaGavel size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground dark:text-gray-100">
                                    السياسات والوثائق القانونية
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Link href="/privacy" className="group block space-y-3 cursor-pointer p-4 rounded-2xl border border-transparent hover:border-main/20 dark:hover:border-main-bg/20 transition-all hover:bg-main/5 dark:hover:bg-main-bg/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-main/10 dark:bg-main-bg/10 rounded-full flex items-center justify-center text-main dark:text-main-bg group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors">
                                            <FaUserSecret size={20} />
                                        </div>
                                        <h4 className="font-bold text-foreground dark:text-gray-200 group-hover:text-main dark:group-hover:text-main-bg transition-colors">سياسة الخصوصية</h4>
                                    </div>
                                    <p className="text-sm text-foreground/70 dark:text-gray-400 leading-relaxed pr-13">
                                        تعرف على كيفية جمعنا واستخدامنا لبياناتك الشخصية، وكيف نحمي خصوصيتك أثناء استخدام المنصة.
                                    </p>
                                </Link>

                                <Link href="/terms" className="group block space-y-3 cursor-pointer p-4 rounded-2xl border border-transparent hover:border-main/20 dark:hover:border-main-bg/20 transition-all hover:bg-main/5 dark:hover:bg-main-bg/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-main/10 dark:bg-main-bg/10 rounded-full flex items-center justify-center text-main dark:text-main-bg group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors">
                                            <FaFileContract size={20} />
                                        </div>
                                        <h4 className="font-bold text-foreground dark:text-gray-200 group-hover:text-main dark:group-hover:text-main-bg transition-colors">شروط الاستخدام</h4>
                                    </div>
                                    <p className="text-sm text-foreground/70 dark:text-gray-400 leading-relaxed pr-13">
                                        اقرأ الشروط والأحكام التي تحكم استخدامك للموقع، بما في ذلك حقوق الملكية الفكرية ومسؤوليات المستخدم.
                                    </p>
                                </Link>
                            </div>

                        </div>
                    </section>

                    {/* Footer Quote */}
                    <div className="text-center py-8 opacity-80">
                        <div className="inline-flex items-center gap-2 text-xl font-medium text-foreground dark:text-gray-300 bg-white dark:bg-main/5 px-6 py-3 rounded-full shadow-sm border border-gray-100 dark:border-main/10">
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
