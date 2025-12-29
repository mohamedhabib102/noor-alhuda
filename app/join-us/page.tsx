"use client";
import req from "@/lib/axios";
import { useAuth } from "@/lib/contextapi";
import { ChangeEvent, useEffect, useState } from "react";
// import { FaGoogle } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { FaCheck } from "react-icons/fa6";
import Link from "next/link";

interface ApiError {
    response?: {
        status: number;
    };
    message?: string;
}

const JoinUsPage = () => {
    const { login, userData } = useAuth();
    const [loginData, setLoginData] = useState({
        personName: "",
        email: "",
        password: "",
        image: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [checked, setChecked] = useState(false)
    const [erroChecked, setErroChecked] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()
    const [imageShow, setImageShow] = useState<string>("");


    const handelImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImageShow(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            console.log("⚠️ No file selected");
        }
    }


    // MowafyAdmin324

    const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, files } = e.target;

        setLoginData({
            ...loginData,
            [name]: type === 'file' ? (files?.[0] || "") : value
        })
    }


    const handelSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("");
        try {
            setLoading(true)

            if (!loginData.personName || !loginData.email || !loginData.password) {
                setError("من فضلك تأكد من إدخال جميع البيانات المطلوبة بشكل صحيح")
                setLoading(false)
                return
            }

            // Password validation - regex واحد
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(loginData.password)) {
                setError("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، وتتضمن حروف كبيرة وصغيرة وأرقام")
                setLoading(false)
                return
            }

            if (!checked) {
                setErroChecked(" يجب الموافقة على التعليمات ")
                return
            }
            const formData = new FormData();
            formData.append("PersonName", loginData.personName);
            formData.append("Email", loginData.email);
            formData.append("Password", loginData.password);
            formData.append("Role", "string");

            if (loginData.image && typeof loginData.image === 'object' && 'name' in loginData.image) {
                formData.append("Image", loginData.image);
            }


            const res = await req.post("/api/Alhoda_Alnabawya/Login", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            login(res.data)

            if (res.data?.role === "Admin") {
                router.push("/control")
            } else {
                router.push("/")
            }
        } catch (error: unknown) {
            const err = error as ApiError;
            console.log(err);
            if (err.response?.status === 400) {
                setError(" البريد الالكتروني موجود بالفعل او كلمة المرور غير صحيحة");
            }
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (userData?.personID) {
            if (userData.role === "Admin") {
                router.push("/control")
            } else {
                router.push("/")
            }
        }
    }, [userData, router])


    // useEffect(() => {
    //     // Only sync if session exists, user is NOT logged in in our system, and not currently loading
    //     if (session?.user && !userData?.personID && !loading) {
    //         const syncWithBackend = async () => {
    //             try {
    //                 setLoading(true);
    //                 // Mapping Google session to Backend expectations
    //                 const formData = new FormData();
    //                 formData.append("PersonName", session.user?.name || "");
    //                 formData.append("Email", session.user?.email || "");
    //                 formData.append("Password", "@GoogleOAuthDefaultPassword123");
    //                 formData.append("Role", "string");


    //                 if (session.user?.image) {
    //                     formData.append("Image", session.user.image);
    //                 }

    //                 const res = await req.post("/api/Alhoda_Alnabawya/Login", 
    //                     formData, {
    //                     headers: {
    //                         "Content-Type": "multipart/form-data",
    //                     }
    //                     });

    //                 if (res.data) {
    //                     login(res.data);
    //                     // تحويل بناءً على الـ role
    //                     if (res.data?.role === "Admin") {
    //                         router.push("/control")
    //                     } else {
    //                         router.push("/")
    //                     }
    //                 }
    //             } catch (error: unknown) {
    //                 const err = error as ApiError;
    //                 console.log("Google Sync Error:", err);
    //                 // Only show error if it's not a duplicate request issue
    //                 if (err.response?.status === 400) {
    //                     setError(" البريد الالكتروني موجود بالفعل ");
    //                 }
    //             } finally {
    //                 setLoading(false);
    //             }
    //         };
    //         syncWithBackend();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [session, userData]);

    return (
        <section className="lg:py-20 py-12 h-full relative bg-linear-to-r from-gray-600 to-transparent 
        dark:bg-linear-to-l dark:from-gray-600 dark:to-transparent">
            <form
                onSubmit={handelSubmit}
                className=" lg:w-[500px] w-[90%] mx-auto
            bg-gray-200 dark:bg-gray-800 py-6 px-4 rounded-lg 
            shadow-[0_10px_30px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)]
            dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_4px_10px_rgba(0,0,0,0.3)]
            transition-all duration-300
            ">
                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h3 className="text-2xl font-medium mb-3 text-(--main-color)"> انضم إلينا </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400"> ادخل معلوماتك للتسجيل في المنصة </p>
                    </div>

                    <Image
                        src={imageShow || "/images/default.png"}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="p-1 w-24 h-24 bg-cover rounded-full object-contain bg-gray-400 dark:bg-gray-700"
                    />

                </div>
                {error && (
                    <div className="mt-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm text-right border border-red-100 dark:border-red-800">
                        {error}
                    </div>
                )}

                {erroChecked && (
                    <div className="mt-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm text-right border border-red-100 dark:border-red-800">
                        {erroChecked}
                    </div>
                )}
                {/* Name Input */}
                <div className="relative mt-6 mb-4">
                    <input
                        type="text"
                        id="name"
                        name="personName"
                        placeholder=""
                        value={loginData.personName}
                        onChange={handelChange}
                        className="peer w-full border border-gray-400 dark:border-gray-600 rounded-md p-4 pt-6 
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-(--main-color) transition"
                    />
                    <label
                        htmlFor="name"
                        className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 transition-all duration-200
                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-(--main-color)
                        text-lg
                        peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                        الأسم <span className="text-red-500">*</span>
                    </label>
                </div>

                {/* Email Input */}
                <div className="relative mt-6 mb-4">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder=""
                        value={loginData.email}
                        onChange={handelChange}
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
                        البريد الالكتروني <span className="text-red-500">*</span>
                    </label>
                </div>

                {/* Password Input */}
                <div className="relative mt-6 mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder=" "
                        value={loginData.password}
                        onChange={handelChange}
                        className="peer w-full border border-gray-400 dark:border-gray-600 rounded-md p-4 pt-6
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-(--main-color) transition"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                    >
                        {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                    </button>
                    <label
                        htmlFor="password"
                        className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 transition-all duration-200
                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-(--main-color)
                        text-lg
                        peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                        كلمة المرور <span className="text-red-500">*</span>
                    </label>
                </div>

                <div className="relative mt-6 mb-4">
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            handelImageChange(e)
                            handelChange(e)
                        }}
                        className="appearance-none w-full border border-gray-400 dark:border-gray-600 rounded-md p-4 pt-6
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-(--main-color) transition"
                    />
                    <label className="absolute right-4 top-2 text-xs text-gray-500 dark:text-gray-400 pointer-events-none">
                        الصورة
                    </label>
                </div>

                <div className="flex items-center gap-2 mb-3 relative">
                    <div className="w-5 h-5  bg-white dark:bg-gray-700 border border-gray-400 rounded-full 
                      flex items-center justify-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="checked"
                            className="peer hidden"
                            checked={checked}
                            onChange={(e) => {
                                setChecked(e.target.checked);
                                if (e.target.checked) setErroChecked("");
                            }}
                        />
                        <label
                            htmlFor="checked"
                            className="relative cursor-pointer 
                            opacity-0 peer-checked:opacity-100 transition-transform duration-200"
                        >
                            <span
                                className="absolute w-3 h-3 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2
                           bg-(--main-bg)"
                            ></span>
                        </label>
                    </div>
                    <p className="text-sm text-gray-500"> قرأت التعليمات وموافق عليها  ؟ </p>
                </div>

                <div className="mt-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm text-right border border-red-100 dark:border-red-800">
                    يجب قراءة التعليمات والموافقة عليها. الرجاء زيارة
                    <Link
                        href="/help"
                        className="font-semibold text-red-600 dark:text-red-400 inline-block
                  mx-1 underline"
                    >
                        التعليمات
                    </Link>
                    قبل المتابعة.
                </div>





                <button
                    type="submit"
                    className="cursor-pointer w-full mt-6 bg-(--main-color) text-white py-3 rounded-md
                    hover:opacity-90 transition-opacity font-medium"
                >
                    {loading ? "جاري التحميل..." : "تسجيل"}
                </button>

                {/* <button
                    type="button"
                    onClick={() => signIn("google")}
                    className="cursor-pointer w-full mt-6 bg-(--main-color) text-white py-3 rounded-md
                    hover:opacity-90 transition-opacity font-medium flex items-center gap-2 justify-center
                    text-center"
                >

                    <span> التسجيل باستخدام </span>
                    <FaGoogle size={20} />
                </button> */}
            </form>
        </section>
    );
};

export default JoinUsPage;