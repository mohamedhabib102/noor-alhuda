"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/contextapi";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import Image from "next/image";
import { IoArrowForward, IoCloudUploadOutline, IoPersonOutline, IoMailOutline, IoInformationCircleOutline } from "react-icons/io5";
import req from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";

const SettingsPage: React.FC = () => {
    const { userData, login } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    // const [showProfile, setShowProfile] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(true);
    const [daysRemaining, setDaysRemaining] = useState<number>(0);
    const [formData, setFormData] = useState({
        personName: "",
        email: "",
        image: null as File | null,
    });

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        if (userData) {
            setFormData({
                personName: userData.personName,
                email: userData.email,
                image: null,
            });
        }
        return () => clearTimeout(timer);
    }, [userData]);

    useEffect(() => {
        if (mounted && !userData?.personID) {
            router.push("/");
        }
    }, [userData, router, mounted]);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        if (userData) {
            setFormData({
                personName: userData.personName,
                email: userData.email,
                image: null,
            });

            // Check for last update restriction
            const lastUpdate = localStorage.getItem(`lastUpdate_${userData.personID}`);
            if (lastUpdate) {
                const lastUpdateTime = parseInt(lastUpdate);
                const now = Date.now();
                const fifteenDaysInMs = 30 * 24 * 60 * 60 * 1000;
                const diff = now - lastUpdateTime;

                if (diff >= fifteenDaysInMs) {
                    localStorage.removeItem(`lastUpdate_${userData.personID}`);
                    setCanEdit(true);
                } else {
                    setCanEdit(false);
                    const remainingMs = fifteenDaysInMs - diff;
                    setDaysRemaining(Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));
                }
            }
        }
        return () => clearTimeout(timer);
    }, [userData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
        }
    };



    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = new FormData();
            data.append("PersonID", userData?.personID.toString() || "");
            data.append("PersonName", formData.personName);
            data.append("Email", formData.email);
            data.append("Image", "nulll");

            if (formData.image) {
                data.append("image", formData.image);
            }

            const res = await req.put("/api/Alhoda_Alnabawya/UpdatePerson", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            login({
                personID: userData?.personID as number,
                personName: (res.data.personName) as string,
                email: res.data.email,
                role: userData?.role as string,
                createdAt: userData?.createdAt as string,
                image: res.data.image === null ? "/images/default.png" : res.data.image,
                imageGoogle: userData!.imageGoogle,
            });

            // Store last update time
            localStorage.setItem(`lastUpdate_${userData!.personID}`, Date.now().toString());
            alert("تم تحديث البيانات بنجاح");
            router.push("/profile");
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء تحديث البيانات");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted || !userData) return null;

    const currentImage =
        userData.image ? userData.image :
            (userData.imageGoogle && userData.imageGoogle !== "nulll") ? userData.imageGoogle :
                "/images/default.png";


    return (
        <section className="py-12 bg-main/5 dark:bg-black min-h-screen">
            <CustomContainer>
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8" dir="rtl">
                        <Link href="/profile" className="flex items-center gap-2 text-main-bg dark:text-gray-300 hover:text-main transition-colors group">
                            <IoArrowForward size={24} className="group-hover:translate-x-1 transition-transform" />
                            <span className="font-black text-sm">العودة للملف الشخصي</span>
                        </Link>
                    </div>

                    <CustomTitle
                        title="إعدادات الحساب"
                        description="قم بتعديل بياناتك الشخصية وصورتك الرمزية لتظهر لنا في أبهى صورة"
                        success={true}
                    />

                    <div className="mt-8 bg-white dark:bg-main/10 rounded-[2.5rem] shadow-2xl overflow-hidden border border-main/10 dark:border-main/20">
                        {/* Google User Notice - Conditional */}
                        {(userData.imageGoogle && userData.imageGoogle !== "nulll") && (
                            <div className="bg-main-bg/5 dark:bg-white/5 border-b border-main-bg/10 dark:border-main/10 p-8 flex gap-5 text-main-bg dark:text-gray-300 text-sm leading-relaxed" dir="rtl">
                                <IoInformationCircleOutline className="shrink-0 text-3xl text-main" />
                                <p className="font-medium">
                                    <span className="font-black block text-lg mb-1 text-main">حسابك مرتبط بـ Google</span>
                                    بما أنك قمت بالتسجيل عبر Google، فنحن ننصحك بالإبقاء على بريدك الإلكتروني الحالي كما هو. تغيير البريد قد يؤدي إلى فقدان القدرة على تسجيل الدخول السريع أو مزامنة بياناتك المستقبلية مع حساب Google الخاص بك.
                                </p>
                            </div>
                        )}

                        {!canEdit && (
                            <div className="bg-red-500/5 dark:bg-red-500/10 border-b border-red-500/10 dark:border-red-500/20 p-8 flex gap-5 text-red-600 dark:text-red-400 text-sm leading-relaxed" dir="rtl">
                                <IoInformationCircleOutline className="shrink-0 text-3xl" />
                                <p className="font-medium">
                                    <span className="font-black block text-lg mb-1">تحديث البيانات غير متاح حالياً</span>
                                    لقد قمت بتحديث بياناتك مؤخراً. يرجى الانتظار <span className="font-black mx-1">{daysRemaining}</span> يوم لتتمكن من التعديل مرة أخرى.
                                </p>
                            </div>
                        )}
                        <form onSubmit={updateProfile} className="p-8 md:p-14 space-y-10" dir="rtl">

                            {/* Avatar Section */}
                            <div className="flex flex-col items-center">
                                <div className="relative group">
                                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-main/10 shadow-xl relative group-hover:border-main/30 transition-all duration-500">
                                        <Image
                                            src={currentImage}
                                            alt="Avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <label
                                        htmlFor="imageInput"
                                        className={`absolute bottom-1 right-1 p-3 bg-main text-white rounded-full shadow-xl transition-all border-4 border-white dark:border-[#0a1a0f] ${!canEdit ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-110 active:scale-90"}`}
                                    >
                                        <IoCloudUploadOutline size={24} />
                                        <input
                                            type="file"
                                            id="imageInput"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            disabled={!canEdit}
                                        />
                                    </label>
                                </div>
                                <p className="mt-4 text-xs text-gray-400 font-black uppercase tracking-widest">انقر لتغيير الصورة</p>
                            </div>

                            {/* Inputs Section */}
                            <div className="space-y-8">
                                {/* Name Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-main-bg dark:text-gray-300 flex items-center gap-2">
                                        <IoPersonOutline className="text-main" size={20} />
                                        <span>الأسم الكامل</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.personName}
                                        onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                                        className="w-full px-6 py-4.5 rounded-2xl bg-main/5 dark:bg-black border border-main-bg/10 dark:border-main/20 focus:border-main focus:ring-4 focus:ring-main/5 outline-none transition-all dark:text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="ادخل اسمك الجديد"
                                        required
                                        disabled={!canEdit}
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-main-bg dark:text-gray-300 flex items-center gap-2">
                                        <IoMailOutline className="text-main" size={20} />
                                        <span>البريد الإلكتروني</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-6 py-4.5 rounded-2xl bg-main/5 dark:bg-black border border-main-bg/10 dark:border-main/20 focus:border-main focus:ring-4 focus:ring-main/5 outline-none transition-all dark:text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="example@mail.com"
                                        required
                                        disabled={!canEdit}
                                    />
                                </div>

                                {/* Show Profile
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-main-bg dark:text-gray-300 flex items-center gap-2">
                                        <FaEye className="text-main" size={20} />
                                        <span> امكانية وصول الآخرين لحسابك </span>
                                    </label>
                                    <button
                                    type="button"
                                    className="py-1 px-3 bg-main dark:bg-main/20 rounded-lg text-lg text-white
                                    cursor-pointer"
                                    onClick={() => setShowProfile(!showProfile)}
                                    >
                                        {showProfile ? "مفعل" : "تفعيل"}
                                    </button>
                                </div> */}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading || !canEdit}
                                    className="w-full py-5 bg-main hover:bg-emerald-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-main/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95 border-b-4 border-emerald-950/20"
                                >
                                    {loading ? (
                                        <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>حفظ التغييرات</span>
                                        </>
                                    )}
                                </button>

                                <Link
                                    href="/profile"
                                    className="block w-full text-center mt-6 py-2 text-gray-400 font-black text-sm hover:text-main-bg transition-colors"
                                >
                                    إلغاء وتجاهل التغييرات
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="mt-10 p-8 bg-white dark:bg-[#0a1a0f] rounded-4xl border border-main/10 dark:border-main/20 shadow-sm" dir="rtl">
                        <p className="text-main-bg dark:text-gray-400 text-sm leading-relaxed text-center font-bold">
                            <span className="text-main mr-1">نصيحة:</span> احرص على استخدام اسم لائق وصورة محتشمة تعبر عن هويتنا الإسلامية.
                        </p>
                    </div>
                </div>
            </CustomContainer>
        </section>
    );
};

export default SettingsPage;
