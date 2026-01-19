"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/contextapi";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import Image from "next/image";
import { HiOutlineLogout } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { BsFilePostFill } from "react-icons/bs";
import Link from "next/link";
import ShowImageProfile from "@/ui/ShowImageProfile";

const ProfileUser: React.FC = () => {
  const { userData, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [toggleImage, setToggleImage] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && !userData?.personID) {
      router.push("/");
    }
  }, [userData, router, mounted]);

  if (!mounted || !userData) {
    return (
      <section className="py-16">
        <CustomContainer>
          <p className="text-center text-gray-600">جاري تحميل البيانات...</p>
        </CustomContainer>
      </section>
    );
  }

  const { personID, personName, email, role, createdAt } = userData;
  const userRole = role === "Admin" ? "مشرف" : "مستخدم";

  const iImage = userData?.image || userData?.imageGoogle || "/images/default.png";

  return (
    <>
      <ShowImageProfile
        toggleImage={toggleImage}
        setToggleImage={setToggleImage}
        image={iImage}
      />
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <CustomContainer>
          <CustomTitle
            title="الملف الشخصي"
            description="في هذه الصفحة يمكنك الاطلاع على بيانات حسابك داخل المجتمع الديني، ونسأل الله أن يجعل تواجدك معنا سببًا في الخير والنفع."
            success={true}
          />

          <div className="relative mt-12 max-w-3xl mx-auto rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
            {/* Status Bar / Top Action Area */}
            <div className="flex items-center justify-between p-6 pb-0" dir="rtl">
              <Link
                href="/profile/settings"
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-(--main-color) transition-all"
                title="إعدادات الحساب"
              >
                <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700/50 group-hover:bg-(--main-color)/10 transition-colors">
                  <IoSettingsOutline size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <span className="font-bold text-sm hidden sm:inline">الإعدادات</span>
              </Link>

              <button
                onClick={() => logout({ url: "/" })}
                className="group flex items-center gap-2 text-red-500 hover:text-red-600 transition-all font-bold text-sm"
              >
                <span className="hidden sm:inline">تسجيل الخروج</span>
                <div className="p-2 rounded-xl bg-red-50 dark:bg-red-900/10 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <HiOutlineLogout size={22} />
                </div>
              </button>
            </div>

            {/* Profile Header */}
            <div className="px-8 pb-8 flex flex-col items-center text-center mt-4">
              <div className="relative group mb-4">
                <div
                  onClick={() => setToggleImage(true)}
                  className="cursor-pointer w-28 h-28 rounded-full overflow-hidden border-4 border-(--main-color)/10 shadow-lg relative"
                >
                  <Image
                    src={iImage}
                    alt="user"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
                <div className="absolute -top-1 -right-1 bg-(--main-color) text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white dark:border-gray-800">
                  {personName?.charAt(0) || "؟"}
                </div>
              </div>

              <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-1">
                {personName || "اسم غير متوفر"}
              </h2>
              <div className="px-4 py-1 rounded-full bg-(--main-color)/10 text-(--main-color) text-xs font-bold">
                {userRole}
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-gray-50/50 dark:bg-gray-900/20 p-8 md:p-12 border-t border-gray-100 dark:border-gray-700" dir="rtl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">رقم الهوية المعرف</p>
                  <p className="font-bold text-gray-700 dark:text-gray-200">#{personID || "غير متوفر"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">البريد الإلكتروني</p>
                  <p className="font-bold text-gray-700 dark:text-gray-200 break-all">
                    {email ? `${email.split("@")[0]}@...` : "غير متوفر"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">تاريخ الانضمام</p>
                  <p className="font-bold text-gray-700 dark:text-gray-200">
                    {createdAt
                      ? new Date(createdAt).toLocaleDateString("ar-EG", { year: 'numeric', month: 'long', day: 'numeric' })
                      : "غير معروف"}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">نشاطاتك</p>
                  <Link
                    href="/profile/your-posts"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-(--main-color) text-white font-bold text-sm hover:scale-105 transition-transform"
                  >
                    <BsFilePostFill size={18} />
                    <span>استعراض المقالات والأسئلة الشخصية</span>
                  </Link>
                </div>
              </div>

              {/* Religious Message */}
              <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-(--main-color)"></div>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 italic">
                  &quot;هذا الحساب مخصص للاستخدام داخل المجتمع، ونرجو الالتزام بالأدب العام في جميع التفاعلات. نسأل الله أن يبارك فيك ويجعل مشاركتك نافعة للجميع.&quot;
                </p>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  );
};

export default ProfileUser;
