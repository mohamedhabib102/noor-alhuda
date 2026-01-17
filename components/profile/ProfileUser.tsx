"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/contextapi";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import Image from "next/image";
import { HiOutlineLogout } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import req from "@/lib/axios";
import { useRouter } from "next/navigation";
import { BsFilePostFill } from "react-icons/bs";
import Link from "next/link";
import ShowImageProfile from "@/ui/ShowImageProfile";





const ProfileUser: React.FC = () => {
  const { userData, logout, login } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();
  const [toggleImage, setToggleImage] = useState<boolean>(false)
  const [formData, setFormData] = useState<{
    personName: string;
    email: string;
    image: string | File;
  }>({
    personName: "",
    email: "",
    image: "",
  });
  const [dateToggle, setDateToggle] = useState<boolean>(false)


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      // Store the file for uploading
      setFormData(prev => ({ ...prev, image: file }));

      // Store a temporary local URL for preview
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData);


      const data = new FormData();
      data.append("PersonID", userData?.personID.toString() || "");
      data.append("PersonName", formData.personName || userData?.personName || "");
      data.append("Email", formData.email || userData?.email || "");
      data.append("Image", "string");

      if (formData.image && typeof formData.image === "object" && "name" in formData.image) {
        data.append("image", formData.image);
      }

      const res = await req.put("/api/Alhoda_Alnabawya/UpdatePerson", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // localStorage.setItem("lastDateEdit", new Date().toISOString());

      if (res.data) {
        login(res.data);
      } else {
        const updatedUserData: typeof userData = {
          ...userData!,
          personName: formData.personName || userData!.personName,
          email: formData.email || userData!.email,
          image: previewImage || userData!.image,
          imageGoogle: previewImage || userData!.imageGoogle,
        };
        login(updatedUserData);
      }

      setIsEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedDate = localStorage.getItem("lastDateEdit")

    if (storedDate) {
      const days = new Date(storedDate)
      days.setDate(days.getDate() + 15) // 15 day of edit yet

      const now = new Date()
      if (now >= days) {
        setDateToggle(false)
      } else {
        setDateToggle(true)
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!userData?.personID) {
      router.push("/");
    }
  }, [userData, router]);



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

  const userRole = userData && role === "Admin" ? "مشرف" : "مستخدم";

  return (
    <>
      <ShowImageProfile
        toggleImage={toggleImage}
        setToggleImage={setToggleImage}
        image={(typeof userData.image === 'string' && (userData.image.startsWith('http') || userData.image.startsWith('/')) ? userData.image : '') ||
          (typeof userData.imageGoogle === 'string' && (userData.imageGoogle.startsWith('http') || userData.imageGoogle.startsWith('/')) ? userData.imageGoogle : '') ||
          "/images/default.png"}
      />
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <CustomContainer>
          <CustomTitle
            title="الملف الشخصي"
            description="في هذه الصفحة يمكنك الاطلاع على بيانات حسابك داخل المجتمع الديني، ونسأل الله أن يجعل تواجدك معنا سببًا في الخير والنفع."
            success={true}
          />

          <div className="relative mt-12 max-w-3xl mx-auto rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 lg:py-14 pt-12 lg:p-6 p-4 bg-white dark:bg-gray-800">
            <button
              onClick={() => logout({ url: "/" })}
              className="absolute top-4 left-4 cursor-pointer z-30
          transition duration-200 text-red-500 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400
          flex items-center gap-2
          ">
              <span>تسجيل الخروج</span>
              <HiOutlineLogout size={25} />
            </button>

            <div className="mb-8 flex flex-col items-center text-center">
              <div className="flex flex-row-reverse items-center gap-4 relative">

                <div
                  onClick={() => setToggleImage(!toggleImage)}
                  className="cursor-pointer w-20 h-20 rounded-full overflow-hidden mb-3 z-40">
                  <Image
                    src={(previewImage ? previewImage : null) ||
                      (typeof userData.image === 'string' && (userData.image.startsWith('http') || userData.image.startsWith('/')) ? userData.image : '') ||
                      (typeof userData.imageGoogle === 'string' && (userData.imageGoogle.startsWith('http') || userData.imageGoogle.startsWith('/')) ? userData.imageGoogle : '') ||
                      "/images/default.png"}
                    alt="user"
                    width={80}
                    height={80}
                    sizes="80px"
                    className="rounded-full w-20 h-20 object-cover"
                    quality={100}
                  />

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
                  {personID && (
                    <div className="w-10 h-10 rounded-full bg-(--main-color) text-white flex items-center justify-center text-lg font-bold">
                      <span>{personName?.charAt(0) || "؟"}</span>
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-semibold text-(--main-color) dark:text-white">
                {personName || "اسم غير متوفر"}
              </h2>
              <p className="text-sm text-gray-500">{userRole}</p>
            </div>

            {isEdit ? (
              <div>
                <p className="text-center text-gray-600"> تعديل الحساب </p>

                <form
                  onSubmit={editProfile}
                >
                  <div className="flex flex-col items-center gap-4 mt-6">
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={dateToggle}
                      onClick={() => document.getElementById('imageInput')?.click()}
                      className={`
                        ${dateToggle ? "cursor-not-allowed opacity-80" : "opacity-100 cursor-pointer"}
                        bg-gray-100 dark:bg-gray-700 text-(--main-color) dark:text-white px-4 py-2 rounded-lg text-sm font-bold border border-(--main-color)/20 hover:dark:bg-gray-800 
                        hover:bg-gray-300 transition
                        `}
                    >
                      تغيير الصورة الشخصية
                    </button>
                  </div>

                  <div className="relative mt-8 mb-4">
                    <input
                      type="text"
                      id="personName"
                      name="personName"
                      disabled={dateToggle}
                      placeholder=""
                      value={formData.personName}
                      onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                      className="peer w-full border border-gray-400 dark:border-gray-600 rounded-md p-4 pt-6 
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-(--main-color) transition"
                    />
                    <label
                      htmlFor="personName"
                      className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 transition-all duration-200
                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-(--main-color)
                        text-lg
                        peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      الأسم <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mt-6 mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      disabled={dateToggle}
                      placeholder=""
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="peer w-full border border-gray-400 dark:border-gray-600 rounded-md p-4 pt-6 
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-(--main-color) transition"
                    />
                    <label
                      htmlFor="email"
                      className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 transition-all duration-200
                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-(--main-color)
                        text-lg
                        peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {dateToggle && (
                    <span
                      className={`
                    bg-red-500/10 dark:bg-red-500/50
                    p-2 rounded-lg block w-fit
                    `}
                    > لا يمكنك تعديل الحساب إلا بعد 15  يومًا  من أخر تعديل قمت به </span>
                  )}

                  <button
                    disabled={dateToggle}
                    type="submit"
                    className={`
                    w-full mt-6 bg-(--main-color) text-white py-3 rounded-md
                    hover:opacity-90 transition-opacity font-medium
                    ${dateToggle ? "cursor-not-allowed opacity-80" : "opacity-100 cursor-pointer"}
                    `}
                  >
                    {loading ? "جاري التحميل..." : "حفظ التعديلات"}
                  </button>
                  <button
                    type="button"
                    className={`
                    w-full mt-2 bg-gray-500 text-white py-3 rounded-md
                    hover:opacity-90 transition-opacity font-medium
                    `}
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    الغاء
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">رقم المستخدم</p>
                    <p className="font-semibold text-lg">{personID || "غير متوفر"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                    <p className="font-semibold text-lg break-all">{(`...${email.split("@")[0]}`) || "غير متوفر"}</p>
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
                  <div className="relative">
                    <p className="text-sm text-gray-500">تعديل الحساب</p>
                    <button
                      onClick={() => {
                        setFormData({
                          personName: userData.personName,
                          email: userData.email,
                          image: userData.image || ""
                        });
                        setIsEdit(true);
                      }}
                      className={`cursor-pointer
                    mt-1 font-semibold text-sm flex items-center gap-2 `}>
                      <span className="w-7 h-7 rounded-full flex items-center justify-center bg-(--main-color) dark:bg-gray-700">
                        <FaEdit
                          size={18}
                          className="text-white"
                        />
                      </span>
                      تعديل الحساب
                    </button>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">تعديل الحساب</p>
                    <Link
                      href="profile/your-posts"
                      className="mt-1 font-semibold text-sm flex items-center gap-2 cursor-pointer">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center bg-(--main-color) dark:bg-gray-700">
                        <BsFilePostFill
                          size={18}
                          className="text-white"
                        />
                      </span>
                      رؤية منشوراتك
                    </Link>
                  </div>
                </div>
                <div className="mt-8 rounded-xl bg-(--main-color)/5 dark:bg-(--main-color)/50 p-4 text-sm leading-relaxed text-gray-700 dark:text-white">
                  <p>
                    هذا الحساب مخصص للاستخدام داخل موقعنا الديني، ونرجو الالتزام بالأدب
                    العام وتعاليم الدين في جميع التفاعلات. نسأل الله أن يبارك فيك ويجعل
                    مشاركتك نافعة.
                  </p>
                </div>
              </>
            )}
          </div>
        </CustomContainer>
      </section>
    </>
  );
};

export default ProfileUser;
