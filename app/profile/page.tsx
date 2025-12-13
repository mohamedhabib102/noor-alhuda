"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/contextapi";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import Image from "next/image";
import { HiOutlineLogout } from "react-icons/hi";


const ProfilePage: React.FC = () => {
  const { userData, logout } = useAuth();
    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <CustomContainer>
        <CustomTitle
          title="الملف الشخصي"
          description="في هذه الصفحة يمكنك الاطلاع على بيانات حسابك داخل المجتمع الديني، ونسأل الله أن يجعل تواجدك معنا سببًا في الخير والنفع."
          success={true}
        />

        <div className="relative mt-12 max-w-3xl mx-auto rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 lg:py-14 p-12 bg-white dark:bg-gray-800">
          <button 
          onClick={() => logout({url: "/"})}
          className="absolute top-4 left-4 cursor-pointer z-30
          transition duration-200 text-red-500 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400
          flex items-center gap-2
          ">
            <span>تسجيل الخروج</span>
            <HiOutlineLogout size={25} />
          </button>
          {/* بطاقة التعريف */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex flex-row-reverse items-center gap-4 relative">
              <div className="w-20 h-20 rounded-full bg-(--main-color) text-white flex items-center justify-center text-2xl font-bold mb-3 z-40">
                {personName?.charAt(0) || "؟"}
              </div>
               <div
                 className="absolute -top-1 right-1 z-20
                            rotate-45
                            flex flex-col gap-0.5
                            items-center justify-center"
               >
                 <span className="w-1 h-1 rounded-full bg-gray-500 dark:bg-gray-700"></span>
                 <span className="w-1 h-1 rounded-full bg-gray-500 dark:bg-gray-700"></span>
                 <span className="w-1 h-1 rounded-full bg-gray-500 dark:bg-gray-700"></span>
                 <span className="w-1 h-1 rounded-full bg-gray-500 dark:bg-gray-700"></span>
               </div>
               
              <div className="absolute -top-8 -right-9.5">
                {userData.gender === "M" ? (
                <Image
                src="/images/male.png"
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
                />
              ) : (
                <Image
                src="/images/female.jpg"
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
                />
              )}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-(--main-color) dark:text-white">
              {personName || "اسم غير متوفر"}
            </h2>
            <p className="text-sm text-gray-500">{userRole}</p>
          </div>

          {/* البيانات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">رقم المستخدم</p>
              <p className="font-semibold text-lg">{personID || "غير متوفر"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">البريد الإلكتروني</p>
              <p className="font-semibold text-lg break-all">{email || "غير متوفر"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">نوع الحساب</p>
              <p className="font-semibold text-lg">{userRole}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">تاريخ الانضمام</p>
              <p className="font-semibold text-lg">
                {createdAt
                  ? new Date(createdAt).toLocaleDateString("ar-EG")
                  : "غير معروف"}
              </p>
            </div>
          </div>

          {/* تنبيه ديني */}
          <div className="mt-8 rounded-xl bg-(--main-color)/5 dark:bg-(--main-color)/50 p-4 text-sm leading-relaxed text-gray-700 dark:text-white">
            <p>
              هذا الحساب مخصص للاستخدام داخل موقعنا الديني، ونرجو الالتزام بالأدب
              العام وتعاليم الدين في جميع التفاعلات. نسأل الله أن يبارك فيك ويجعل
              مشاركتك نافعة.
            </p>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ProfilePage;
