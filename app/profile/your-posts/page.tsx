"use client"
import { useAuth } from "@/lib/contextapi"
import CustomContainer from "@/ui/CustomContainer"
import Image from "next/image"
import { useEffect, useState } from "react"
import CardPost from "@/ui/CardPost"
import CardQuations from "@/ui/CardQuestions"



const List = [
  {
    id: 1,
    title: " المقالات ",
    value: "post"
  },
  {
    id: 2,
    title: " الأسئلة ",
    value: "question"
  }
]


const YourPosts = () => {
  const { userData } = useAuth()
  const [scroll, setScroll] = useState(false)
  const [load, setLoad] = useState(false)
  const [valueChange, setValueChange] = useState("post")


  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY >= 120) {
        setScroll(true)
      } else {
        setScroll(false)
      }

    }

    window.addEventListener("scroll", handelScroll)

    return () => {
      window.removeEventListener("scroll", handelScroll)
    }
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => setLoad(true), 0);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>

      <section className="py-16 bg-main/5 dark:bg-black min-h-screen">
        <CustomContainer>
          <div
            className={`
              sticky top-0 p-6 rounded-[2.5rem] bg-white dark:bg-[#0a1a0f] mb-12 transition-all
              duration-500 z-10 border border-main/10 shadow-xl
               ${scroll ? "py-3! px-6! rounded-full! bg-main! text-white" : "text-main-bg"}
          `}>
            <div className={`flex items-center gap-6 ${scroll ? "justify-between" : ""}`}>
              <div className="flex items-center gap-5">
                {userData && load && (
                  <div className={`relative transition-all duration-300 ${scroll ? "w-10 h-10" : "w-28 h-28"}`}>
                    <Image
                      src={userData?.image || userData?.imageGoogle || "/images/default.png"}
                      fill
                      alt="profile"
                      title={userData?.personName}
                      className={`rounded-full object-cover border-4 ${scroll ? "border-white/20" : "border-main/10"}`}
                    />
                  </div>
                )}

                <div>
                  <h4 className={`mb-1 font-black transition-all ${scroll ? "text-base" : "text-2xl"}`}>
                    {load && userData?.personName}
                  </h4>
                  {!scroll && (
                    <span className="text-[10px] font-black uppercase tracking-widest bg-main/10 dark:bg-main/20 px-3 py-1 rounded-full text-main border border-main/5">
                      {load && userData?.role === "Admin" ? "مشرف" : "مستخدم"}
                    </span>
                  )}
                </div>
              </div>

              {scroll && (
                <span className="text-xs font-black bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  {valueChange === "post" ? "المقالات" : "الأسئلة"}
                </span>
              )}
            </div>
          </div>

          <ul className="flex items-center gap-4 overflow-x-auto pb-8 no-scrollbar" dir="rtl">
            {List.map((item) => (
              <li
                onClick={() => setValueChange(item.value)}
                key={item.id}
                className={`shrink-0 flex items-center gap-3 px-8 py-3.5 rounded-2xl cursor-pointer border-2 transition-all duration-300 font-bold active:scale-95 shadow-sm
                  ${valueChange === item.value
                    ? 'bg-main border-main text-white shadow-main/20'
                    : 'bg-white dark:bg-white/5 border-main-bg/10 dark:border-main/20 text-main-bg dark:text-gray-400 hover:border-main/30'
                  }`}
              >
                <span className="text-lg">{item.title}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            {valueChange === "post" ? (
              <CardPost stateCard="profile" />
            ) : (
              <CardQuations state="profile" />
            )}
          </div>
        </CustomContainer>
      </section>
    </>
  )
}
export default YourPosts