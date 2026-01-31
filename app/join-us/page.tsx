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
import { FaGoogle } from "react-icons/fa6";
import { signIn, useSession } from "next-auth/react";
import { ApiError } from "@/types/Types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
    const { data: session } = useSession()


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
    //mhabib7000881@gmail.com
    // @Habib7000880

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
            formData.append("ImageGoogle", "nulll");

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


    useEffect(() => {
        // Only sync if session exists, user is NOT logged in in our system, and not currently loading
        if (session?.user && !userData?.personID && !loading) {
            const syncWithBackend = async () => {
                try {
                    setLoading(true);
                    // Mapping Google session to Backend expectations
                    const formData = new FormData();
                    formData.append("PersonName", session.user?.name || "");
                    formData.append("Email", session.user?.email || "");
                    formData.append("Password", (`${session.user?.name}/@Google/${session.user?.email}`).toString());
                    formData.append("Role", "string");

                    if (session.user?.image) {
                        formData.append("ImageGoogle", session.user.image);
                    }

                    const res = await req.post("/api/Alhoda_Alnabawya/Login",
                        formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });

                    if (res.data) {
                        login(res.data);
                        if (res.data?.role === "Admin") {
                            router.push("/control")
                        } else {
                            router.push("/")
                        }
                    }
                } catch (error: unknown) {
                    const err = error as ApiError;
                    console.log("Google Sync Error:", err);
                    // Only show error if it's not a duplicate request issue
                    if (err.response?.status === 400) {
                        setError(" البريد الالكتروني موجود بالفعل ");
                    }
                } finally {
                    setLoading(false);
                }
            };
            syncWithBackend();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, userData]);

    return (
        <section className="lg:py-20 py-12 min-h-[calc(100vh-80px)] relative flex items-center justify-center bg-main/10 dark:bg-main-bg/10">
            <form
                onSubmit={handelSubmit}
                className=" lg:w-[550px] w-[95%] mx-auto
            bg-white dark:bg-main-bg/10 backdrop-blur-sm py-10 px-6 sm:px-10 rounded-2xl 
            border border-main/30
            shadow-[0_20px_50px_rgba(0,0,0,0.05)]
            dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
            transition-all duration-300
            ">
                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h3 className="text-2xl font-medium mb-3 text-main"> انضم إلينا </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400"> ادخل معلوماتك للتسجيل في المنصة </p>
                    </div>

                    <Image
                        src={imageShow || "/images/default.png"}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="p-1 w-24 h-24 bg-cover rounded-full object-contain bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm"
                    />

                </div>
                {error && (
                    <div className="mt-3 bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-4 rounded-xl mb-4 text-sm text-right border border-red-100/50 dark:border-red-900/20">
                        {error}
                    </div>
                )}

                {erroChecked && (
                    <div className="mt-3 bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-4 rounded-xl mb-4 text-sm text-right border border-red-100/50 dark:border-red-900/20">
                        {erroChecked}
                    </div>
                )}

                {/* Google Sign-In at Top */}
                <button
                    type="button"
                    onClick={() => signIn("google")}
                    className="cursor-pointer w-full bg-main text-white border border-main-bg/50   py-3.5 rounded-xl
                 active:scale-[0.98] transition-all duration-200 font-semibold flex items-center gap-3 justify-center
                    text-center shadow-sm mb-2"
                >
                    <FaGoogle size={18} className="text-red-500" />
                    <span> 
                        {loading ?  
                    <AiOutlineLoading3Quarters 
                    size={20}
                    className="animate-spin mx-auto"
                    />
                    : "المتابعة باستخدام جوجل"}
                    </span>
                </button>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100 dark:border-neutral-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-[#151515] px-4 text-gray-400 dark:text-neutral-500 font-medium tracking-wider">أو التسجيل كعضو جديد</span>
                    </div>
                </div>
                {/* Name Input */}
                <div className="relative mt-6 mb-4">
                    <input
                        type="text"
                        id="name"
                        name="personName"
                        placeholder=""
                        value={loginData.personName}
                        onChange={handelChange}
                        className="peer w-full border border-gray-200 dark:border-neutral-700 rounded-xl p-4 pt-6 
                        bg-gray-50/50 dark:bg-neutral-800/50 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-main focus:ring-1 focus:ring-main transition"
                    />
                    <label
                        htmlFor="name"
                        className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 transition-all duration-200
                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-main
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
                        className="peer w-full border border-gray-200 dark:border-neutral-700 rounded-xl p-4 pt-6 
                        bg-gray-50/50 dark:bg-neutral-800/50 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-main focus:ring-1 focus:ring-main transition"
                    />
                    <label
                        htmlFor="email"
                        className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 transition-all duration-200
                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-main
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
                        className="peer w-full border border-gray-200 dark:border-neutral-700 rounded-xl p-4 pt-6
                        bg-gray-50/50 dark:bg-neutral-800/50 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-main focus:ring-1 focus:ring-main transition"
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
                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-main
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
                        className="appearance-none w-full border border-gray-200 dark:border-neutral-700 rounded-xl p-4 pt-6
                        bg-gray-50/50 dark:bg-neutral-800/50 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-main focus:ring-1 focus:ring-main transition"
                    />
                    <label className="absolute right-4 top-2 text-xs text-gray-500 dark:text-gray-400 pointer-events-none">
                        الصورة
                    </label>
                </div>

                <div className="flex items-center gap-2 mb-3 relative">
                    <div className="w-5 h-5  bg-white dark:bg-main-bg/10 border border-gray-400 rounded-full 
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
                           bg-main-bg"
                            ></span>
                        </label>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-neutral-400"> قرأت التعليمات وموافق عليها ؟ </p>
                </div>

                <div className="mt-3 bg-amber-50/50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 p-4 rounded-xl mb-4 text-sm text-right border border-amber-100 dark:border-amber-900/20">
                    يجب قراءة التعليمات والموافقة عليها. الرجاء زيارة
                    <Link
                        href="/help"
                        className="font-bold text-amber-800 dark:text-amber-300 inline-block
                  mx-1 underline decoration-2 underline-offset-4"
                    >
                        التعليمات
                    </Link>
                    قبل المتابعة.
                </div>





                <button
                    type="submit"
                    className="cursor-pointer w-full mt-8 bg-main text-white py-4 rounded-xl
                    hover:opacity-90 active:scale-[0.98] transition-all duration-200 font-semibold text-lg shadow-lg shadow-green-900/20"
                >
                    {loading ?  
                    <AiOutlineLoading3Quarters 
                    size={20}
                    className="animate-spin mx-auto"
                    />
                    : "إنشاء الحساب"}
                </button>
            </form>
        </section>
    );
};

export default JoinUsPage;