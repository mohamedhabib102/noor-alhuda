"use client";
import req from "@/lib/axios";
import { useAuth } from "@/lib/contextapi";
import { ChangeEvent, useEffect, useState } from "react";
// import { FaGoogle } from "react-icons/fa";
import { IoChevronDown, IoEye, IoEyeOff } from "react-icons/io5";
// import { signIn, useSession} from "next-auth/react";

const JoinUsPage = () => {
    const { login, userData } = useAuth();
    const [loginData, setLoginData] = useState({
        personName: "",
        email: "",
        password: "",
        gender: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    // MowafyAdmin324

    const handelChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        })
    }


    const handelSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("");
        try {
            setLoading(true)
            if (!loginData.personName || !loginData.email|| !loginData.password || !loginData.gender) {
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
            const data = {
                ...loginData,
                role: "string",
            }
            const res = await req.post("/api/Alhoda_Alnabawya/Login", data)
            login(res.data)
            const role = res.data.role
            if (role === "Admin") {
                location.href = "/control"
            } else {
                location.href = "/"
            }
        } catch (error) {
            console.log(error);
            alert("حدث خطأ في الخادام الرجاء التواصل مع الدعم الفني")
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (userData?.personID) {
            location.href = "/"
        }
    }, [userData])

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
                <h3 className="text-2xl font-medium mb-3 text-(--main-color)"> انضم إلينا </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400"> ادخل معلوماتك للتسجيل في المنصة </p>

                {error && (
                    <div className="mt-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm text-right border border-red-100 dark:border-red-800">
                        {error}
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
                        الأسم
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
                        البريد الالكتروني
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
                        كلمة المرور
                    </label>
                </div>

                {/* Gender Select */}
                <div className="relative mt-6 mb-4">
                    <select
                        name="gender"
                        id="gender"
                        value={loginData.gender}
                        onChange={handelChange}
                        className="appearance-none w-full border border-gray-400 dark:border-gray-600 rounded-md p-4 pt-6 
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:border-(--main-color) transition
                        cursor-pointer"
                    >
                        <option value="" disabled>اختر النوع</option>
                        <option value="M">ذكر</option>
                        <option value="F">أنثى</option>
                    </select>
                    <IoChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    <label className="absolute right-4 top-2 text-xs text-gray-500 dark:text-gray-400 pointer-events-none">
                        النوع
                    </label>
                </div>

                <button
                    type="submit"
                    className="cursro-pointer w-full mt-6 bg-(--main-color) text-white py-3 rounded-md
                    hover:opacity-90 transition-opacity font-medium"
                >
                    {loading ? "جاري التحميل..." : "تسجيل"}
                </button>

                {/* <button
                    type="button"
                    onClick={() => signIn("google")}
                    className="cursro-pointer w-full mt-6 bg-(--main-color) text-white py-3 rounded-md
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