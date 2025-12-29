"use client"
import req from "@/lib/axios"
import { useAuth } from "@/lib/contextapi"
import CustomContainer from "@/ui/CustomContainer"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BiSolidComment } from "react-icons/bi"
import { FaHeart, FaShare } from "react-icons/fa6"



interface PostPage {
  postID: number;
  personID: number;
  postTitle: string;
  postContent: string;
  createdAt: string;
  personName: string;
  image_Post: string;
  image_Person: string
}


const YourPosts = () => {
  const { userData } = useAuth()
  const [posts, setPosts] = useState<PostPage[]>([])
  const [scroll, setScroll] = useState(false)




  const getAllPosts = async () => {
    try {
      const res = await req.get("/api/Alhoda_Alnabawya/GetAllPosts")
      setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      await getAllPosts();
    }

    fetchPosts();
  }, []);


  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY > 165) {
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








  const posoByID = posts.filter((p) => p.personID === userData?.personID)

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <CustomContainer>
        <div
          className={`
              sticky top-0 p-4 rounded-lg bg-gray-200 dark:bg-gray-800 mb-8 transition
              duration-200
               ${scroll ? "p-2! bg-linear-to-r from-[#121212] to-[#ceaf15]" : ""}
          `}>
          <div className="flex items-center gap-3.5">
            {userData && (
              <Image
                src={userData?.image || "/images/default.png"}
                width={112}
                height={112}
                alt="profile"
                title={userData?.personName}
                className={`w-28 h-28 rounded-full object-cover transition duration-200
                         ${scroll ? "w-10 h-10" : ""}`}
              />
            )}

            <div>
              <h4 className="mb-1 font-semibold text-lg">{userData?.personName}</h4>
              <span className="text-sm bg-gray-400 dark:bg-gray-700 px-2 py-0.5 rounded-lg text-white">{userData?.role === "Admin" ? "مشرف" : "مستخدم"}</span>
            </div>
          </div>
        </div>
        <div className="">
          {posoByID.length === 0 ? (
            <p> لا يوجد منشورات حاليا يمكنك رفع منشوراتك من المجتمع </p>
          ) : (
            posoByID.map((post) => (
              <div key={post.postID} dir="rtl" className="bg-gray-100 dark:bg-gray-800 last:mb-0 mb-14 lg:p-6 md:p-6 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {
                      post.image_Person && (
                        <Image
                          src={post.image_Person}
                          title={post.personName}
                          alt={post.postContent}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-contain"
                        />
                      )
                    }
                    <div>
                      <h3 className="font-medium -mb-1.5 text-(--main-bg)">{userData?.personID === post.personID ? "أنت" : post.personName}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{post.postTitle}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString("ar-EG")}</span>
                </div>
                <div>
                  {post.image_Post ? (
                    <div>
                      <p className="mt-2 text-lg dark:text-gray-200 mb-2">{post.postContent}</p>
                      {post.image_Post !== null && (
                        <Image
                          src={post.image_Post}
                          alt={post.personName}
                          width={600}
                          height={900}
                          className="rounded-lg w-full max-h-[500px] object-contain bg-black/20 dark:bg-black/40"
                        />


                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-lg dark:text-gray-200">{post.postContent}</p>
                  )}
                  <div className="flex items-center justify-between gap-3 mt-4">
                    <div className="flex items-center justify-center bg-gray-300 dark:bg-black/20 p-2.5 rounded-lg gap-2 w-[30%] text-red-500 cursor-pointer">
                      <span>0</span>
                      <FaHeart size={23} />
                    </div>

                    <div className="flex items-center justify-center bg-gray-300 dark:bg-black/20 p-2.5 rounded-lg gap-2 w-[30%] text-teal-600 cursor-pointer">
                      <span>0</span>
                      <BiSolidComment size={23} />
                    </div>

                    <div className="flex items-center justify-center bg-gray-300 dark:bg-black/20 p-2.5 rounded-lg gap-2 w-[30%] text-orange-600 cursor-pointer">
                      <span>Share</span>
                      <FaShare size={23} />
                    </div>
                  </div>



                </div>
              </div>
            ))
          )}
        </div>
      </CustomContainer>
    </section>
  )
}
export default YourPosts