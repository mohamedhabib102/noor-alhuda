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

const SettingsPage: React.FC = () => {
    const { userData, login } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const router = useRouter();
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
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
            data.append("Image", "string");

            if (formData.image) {
                data.append("image", formData.image);
            }

            await req.put("/api/Alhoda_Alnabawya/UpdatePerson", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            login({
                ...userData!,
                personName: formData.personName,
                email: formData.email,
                image: previewImage || userData!.image,
                imageGoogle: previewImage || userData!.imageGoogle,
            });

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

    const currentImage = previewImage || userData.image || userData.imageGoogle || "/images/default.png";

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <CustomContainer>
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8" dir="rtl">
                        <Link href="/profile" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-(--main-color) transition-colors">
                            <IoArrowForward size={24} />
                            <span className="font-bold">العودة للملف الشخصي</span>
                        </Link>
                    </div>

                    <CustomTitle
                        title="إعدادات الحساب"
                        description="قم بتعديل بياناتك الشخصية وصورتك الرمزية لتظهر لنا في أبهى صورة"
                        success={true}
                    />

                    <div className="mt-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                        {/* Google User Notice - Conditional */}
                        {(userData.imageGoogle && userData.imageGoogle !== "nulll") && (
                            <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-800/50 p-6 flex gap-4 text-amber-800 dark:text-amber-300 text-sm leading-relaxed" dir="rtl">
                                <IoInformationCircleOutline className="shrink-0 text-2xl text-amber-500" />
                                <p>
                                    <span className="font-bold block text-base mb-1">حسابك مرتبط بـ Google</span>
                                    بما أنك قمت بالتسجيل عبر Google، فنحن ننصحك بالإبقاء على بريدك الإلكتروني الحالي كما هو. تغيير البريد قد يؤدي إلى فقدان القدرة على تسجيل الدخول السريع أو مزامنة بياناتك المستقبلية مع حساب Google الخاص بك.
                                </p>
                            </div>
                        )}
                        <form onSubmit={updateProfile} className="p-8 md:p-12 space-y-8" dir="rtl">

                            {/* Avatar Section */}
                            <div className="flex flex-col items-center">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-(--main-color)/20 shadow-lg relative">
                                        <Image
                                            src={currentImage}
                                            alt="Avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <label
                                        htmlFor="imageInput"
                                        className="absolute bottom-0 right-0 p-2 bg-(--main-color) text-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform"
                                    >
                                        <IoCloudUploadOutline size={22} />
                                        <input
                                            type="file"
                                            id="imageInput"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <p className="mt-3 text-sm text-gray-500 font-medium">انقر على الأيقونة لتغيير الصورة</p>
                            </div>

                            {/* Inputs Section */}
                            <div className="space-y-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <IoPersonOutline className="text-(--main-color)" />
                                        <span>الأسم الكامل</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.personName}
                                        onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-(--main-color) focus:ring-2 focus:ring-(--main-color)/20 outline-none transition-all dark:text-white"
                                        placeholder="ادخل اسمك الجديد"
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <IoMailOutline className="text-(--main-color)" />
                                        <span>البريد الإلكتروني</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-(--main-color) focus:ring-2 focus:ring-(--main-color)/20 outline-none transition-all dark:text-white"
                                        placeholder="example@mail.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-(--main-color) hover:bg-(--main-color)/90 text-white rounded-2xl font-bold shadow-lg shadow-(--main-color)/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>حفظ التغييرات</span>
                                        </>
                                    )}
                                </button>

                                <Link
                                    href="/profile"
                                    className="block w-full text-center mt-4 py-4 text-gray-500 font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                >
                                    إلغاء
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/30" dir="rtl">
                        <p className="text-amber-800 dark:text-amber-400 text-sm leading-relaxed text-center">
                            نصيحة: احرص على استخدام اسم لائق وصورة محتشمة تعبر عن هويتنا الإسلامية.
                        </p>
                    </div>
                </div>
            </CustomContainer>
        </section>
    );
};

export default SettingsPage;
