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
  const [imgError, setImgError] = useState(false);

  let safeImgSrc = "/images/default.png";
  const isValidString = (str: any) => typeof str === "string" && str.trim() !== "" && str !== "null" && str !== "undefined" && str !== "nulll";

  if (isValidString(userData?.image)) {
      safeImgSrc = userData?.image || "/images/default.png";
  } else if (isValidString(userData?.imageGoogle)) {
      safeImgSrc = userData?.imageGoogle || "/images/default.png";
  }

  if (!safeImgSrc.startsWith("http") && !safeImgSrc.startsWith("/") && !safeImgSrc.startsWith("data:")) {
      safeImgSrc = "/" + safeImgSrc;
  }

  useEffect(() => {
      setImgError(false);
  }, [safeImgSrc]);
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
      <section className="py-16 bg-white dark:bg-black min-h-screen">
        <CustomContainer>
          <p className="text-center text-main font-bold">جاري تحميل البيانات...</p>
        </CustomContainer>
      </section>
    );
  }

  const { personID, personName, email, role, createdAt } = userData;
  const userRole = role === "Admin" ? "مشرف" : "مستخدم";

  




    const filterName = (personName:string) => {
    const name = personName;

    const currentName =  name.replace(/(true|false)$/, "");
    return currentName
  }

  return (
    <>
      <ShowImageProfile
        toggleImage={toggleImage}
        setToggleImage={setToggleImage}
        image={safeImgSrc}
      />
      <section className="py-16 bg-main/10 dark:bg-black min-h-screen">
        <CustomContainer>
          <CustomTitle
            title="الملف الشخصي"
            description="في هذه الصفحة يمكنك الاطلاع على بيانات حسابك داخل المجتمع الديني، ونسأل الله أن يجعل تواجدك معنا سببًا في الخير والنفع."
            success={true}
          />

          <div className="relative mt-12 max-w-3xl mx-auto rounded-[2.5rem] shadow-2xl border border-main/10 dark:border-main/20 overflow-hidden bg-white dark:bg-main/10">
            {/* Status Bar / Top Action Area */}
            <div className="flex items-center justify-between p-6 pb-0" dir="rtl">
              <Link
                href="/profile/settings"
                className="group flex items-center gap-2 text-main-bg dark:text-gray-300 hover:text-main transition-all"
                title="إعدادات الحساب"
              >
                <div className="p-2.5 rounded-xl bg-main/5 dark:bg-white/5 group-hover:bg-main/10 transition-colors">
                  <IoSettingsOutline size={26} className="group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <span className="font-black text-sm hidden sm:inline">الإعدادات</span>
              </Link>

              <button
                onClick={() => logout({ url: "/" })}
                className="group flex items-center gap-2 text-red-500 hover:text-red-600 transition-all font-bold text-sm"
              >
                <span className="hidden sm:inline">تسجيل الخروج</span>
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                  <HiOutlineLogout size={24} />
                </div>
              </button>
            </div>

            {/* Profile Header */}
            <div className="px-8 pb-8 flex flex-col items-center text-center mt-4">
              <div className="relative group mb-4">
                <div
                  onClick={() => setToggleImage(true)}
                  className="cursor-pointer w-32 h-32 rounded-full overflow-hidden border-4 border-main/10 shadow-xl relative group-hover:border-main/30 transition-all"
                >
                  <Image
                    src={imgError ? "/images/default.png" : safeImgSrc}
                    alt="user"
                    fill
                    className="object-cover"
                    quality={100}
                    onError={() => setImgError(true)}
                  />
                </div>
                <div className="absolute top-0 right-0 bg-main text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg border-2 border-white dark:border-[#0a1a0f] shadow-md">
                  {personName?.charAt(0) || "؟"}
                </div>
              </div>

              <h2 className="text-3xl font-black text-main-bg dark:text-white mb-1">
                {filterName(personName) || "اسم غير متوفر"}
              </h2>
              <div className="px-6 py-1.5 rounded-full bg-main/10 text-main text-[10px] font-black uppercase tracking-widest border border-main/5">
                {userRole}
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-main/5 dark:bg-black/20 p-8 md:p-14 border-t border-main/10 dark:border-main/20 shadow-inner" dir="rtl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-main-bg opacity-70 uppercase tracking-[0.2em]">رقم المعرف</p>
                  <p className="text-xl font-black text-main dark:text-gray-200">#{personID || "غير متوفر"}</p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-main-bg opacity-70 uppercase tracking-[0.2em]">البريد الإلكتروني</p>
                  <p className="text-lg font-bold text-main dark:text-gray-200 break-all leading-tight">
                    {email || "غير متوفر"}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-main-bg opacity-70 uppercase tracking-[0.2em]">تاريخ الانضمام</p>
                  <p className="text-xl font-black text-main dark:text-gray-200">
                    {createdAt
                      ? new Date(createdAt).toLocaleDateString("ar-EG", { year: 'numeric', month: 'long', day: 'numeric' })
                      : "غير معروف"}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-main-bg opacity-70 uppercase tracking-[0.2em]">نشاطاتك</p>
                  <Link
                    href="/profile/your-posts"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-main text-white font-black text-sm hover:bg-emerald-900 transition-all shadow-lg shadow-main/20 active:scale-95 border-b-4 border-emerald-950/20"
                  >
                    <BsFilePostFill size={20} />
                    <span>استعراض المقالات والأسئلة</span>
                  </Link>
                </div>
              </div>

              {/* Religious Message */}
              <div className="mt-14 p-8 rounded-4xl bg-white dark:bg-white/5 border border-main/10 dark:border-main/20 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2.5 h-full bg-main transition-all duration-500 group-hover:w-3"></div>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 italic font-medium">
                  &quot;نسأل الله أن يجعل تواجدك معنا مباركاً، وأن تكون مشاركاتك شاهدةً لك لا عليك. نرجو الالتزام بآداب المجتمع الإسلامي في كل ما يُنشر.&quot;
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
