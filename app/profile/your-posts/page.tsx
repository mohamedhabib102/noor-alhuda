"use client"
import req from "@/lib/axios"
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

    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <CustomContainer>
        <div
          className={`
              sticky top-0 p-4 rounded-lg bg-gray-200 dark:bg-gray-800 mb-8 transition
              duration-200 z-20
               ${scroll ? "p-2! bg-linear-to-r from-[#121212] to-[#ceaf15]" : ""}
          `}>
          <div className="flex items-center gap-3.5">
            {userData && load && (
              <Image
                src={userData?.image || "/images/default.png"}
                width={112}
                height={112}
                alt="profile"
                title={userData?.personName}
                className={`w-28 h-28 rounded-full object-cover transition duration-200
                         ${scroll ? "w-10! h-10!" : ""}`}
              />
            )}

            <div>
              <h4 className="mb-1 font-semibold text-lg">{load&&userData?.personName}</h4>
              <span className="text-sm bg-gray-400 dark:bg-gray-700 px-2 py-0.5 rounded-lg text-white">{load && userData?.role === "Admin" ? "مشرف" : "مستخدم"}</span>
            </div>
          </div>
        </div>
         <ul className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
          {List.map((item) => (
              <li
                  onClick={() => setValueChange(item.value)}
                  className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl cursor-pointer border-2 ${valueChange === item.value
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-800 border-zinc-200 dark:border-zinc-600 text-zinc-500 hover:border-emerald-200'
                      }`}
                  key={item.id}>
                  <span className="font-bold whitespace-nowrap">{item.title}</span>
              </li>
          ))}
          </ul>
        <div className="">
          {valueChange === "post" ? (
            <CardPost stateCard="profile"/>
          ) : (
            <CardQuations state="profile"/>
          )}
        </div>
      </CustomContainer>
    </section>
    </>
  )
}
export default YourPosts