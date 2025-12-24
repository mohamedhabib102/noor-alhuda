"use client"
import Image from "next/image";
import AddPostForm from "@/ui/CreatePost";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import req from "@/lib/axios";
import { FaHeart, FaShare } from "react-icons/fa6";
import { useAuth } from "@/lib/contextapi";
import { BiRepost } from "react-icons/bi";
import LikePost from "./LikePost";


interface Dhikr {
    id: number;
    title: string;
    content: string;
    image: string;
}

const randomDhikr: Dhikr[] = [
    {
        id: 1,
        title: " نور الهدى ",
        content: " سبحان الله وبحمده سبحان الله العظيم ",
        image: "/logo.svg"
    },
    {
        id: 2,
        title: " نور الهدى ",
        content: " لا اله إلا انت سبحانك إني كنت من الظالمين ",
        image: "/logo.svg"
    },
    {
        id: 3,
        title: " نور الهدى ",
        content: " أشهد أن لا إله إلا الله أشهد و أن محمدًا رسول الله ",
        image: "/logo.svg"
    }
]

interface PostPage {
    postID: number;
    personID: number;
    postTitle: string;
    postContent: string;
    createdAt: string;
    personName: string;
    image_Post: string;
    image_Person: string
    share: boolean;
    nameShare: string;
}

const sharePost = [
    {
        postID: 1,
        personID: 12,
        postTitle: "السودان الحبيبة",
        postContent: "اللهم حرر السوادن من د الظالمين",
        createdAt: "2025-12-23T23:38:26",
        personName: " محمد محمود أحمد ",
        image_Post: "/images/soudan.jpg",
        image_Person: "/images/default.png",
        share: false,
        nameShare: "Mohamed Habib"
    }
]

const Posts: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    const [postsPage, setPostsPage] = useState<PostPage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<boolean>(false)
    const {userData} = useAuth()


    const getAllPosts = async () => {
        try {
            setLoading(true)
            const res = await req.get("/api/Alhoda_Alnabawya/GetAllPosts")
            console.log(res);
            setPostsPage(res.data)
        } catch (error) {
            console.log(error)
            setError(true)
        } finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllPosts();
    }, [])


   if (loading) {
    return (
        <div className=" py-8">
            <div className="h-10 w-[200px] rounded-lg mb-3 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
            <div className="flex items-start justify-between lg:flex-row-reverse md:flex-row flex-col-reverse gap-8">
                <div className="lg:w-[75%] md:w-[60%] w-full">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse mb-8 last:mb-0">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                            <div className="p-5 space-y-3">
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                            </div>
                        </div>
                    ))}
                </div>
                 
                <div className="bg-gray-200 dark:bg-gray-900 lg:w-[25%] md:w-[35%] w-full sticky top-0 rounded-lg">
                    {[1].map((i) => (
                        <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                            <div className="bg-gray-400 p-2 dark:bg-gray-900 rounded-lg">
                                <div className="flex items-center gap-3 mb-4">
                                 <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                 <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            </div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    }

     if (error) {
       return <p>حدث خطأ أثناء تحميل المنشورات</p>;
     }

    return (
        <>
            <AddPostForm
                toggle={toggle}
                setToggle={setToggle}
                getAllPosts={getAllPosts}
            />
            <div className="py-6">
                <button className="bg-(--main-bg) text-white p-2 rounded-lg w-[200px] block ml-auto mb-4 cursor-pointer hover:opacity-80 transition duration-300"
                    onClick={() => setToggle(!toggle)}
                > اضافة منشور </button>
                 <div className="flex items-start justify-between lg:flex-row-reverse md:flex-row flex-col-reverse gap-8">
                    <div className="lg:w-[75%] md:w-[60%] w-full">
                        <div className="">
                        {sharePost.map((post) => (
                            <div key={post.postID} 
                            className="bg-gray-200 dark:bg-gray-900 lg:p-5 md:p-5 p-2 pb-2! px-2! rounded-lg mb-14">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <BiRepost size={20} className="text-(--main-bg)" />
                                    <div className="font-medium text-sm flex items-center gap-1"> 
                                        <span className="font-bold">تم المشاركة من :</span>
                                        <div className="flex items-center gap-1">
                                            <span className="mx-1">{post.nameShare}</span>
                                             {/* {
                                             post.image_Person && (
                                              <Image
                                              src="/images/male.png"
                                              title={post.personName}
                                              alt={post.postContent}
                                              width={28}
                                              height={28}
                                              className="w-7 h-7 rounded-full object-contain"
                                                     />
                                               )
                                             } */}
                                        </div>
                                    </div>
                                </div>
                            <div  dir="rtl" className="bg-gray-100 dark:bg-gray-800 last:mb-0 mb-14 lg:p-6 md:p-6 p-4 rounded-lg">
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

                                          <div className="flex items-center justify-center bg-gray-300 dark:bg-black/20 p-2.5 rounded-lg gap-2 w-[30%] text-orange-600 cursor-pointer">
                                            <span>Share</span>
                                            <FaShare size={23} />
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        {postsPage.map((post) => (
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
                                          <LikePost />
                                          <div className="flex items-center justify-center bg-gray-300 dark:bg-black/20 p-2.5 rounded-lg gap-2 w-[30%] text-orange-600 cursor-pointer">
                                            <span>Share</span>
                                            <FaShare size={23} />
                                          </div>
                                        </div>
                                    </div>
                                </div>
                        ))}
                        </div>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-900 p-3 lg:w-[20%] md:w-[35%] w-full sticky top-0 rounded-lg">
                        {/* Desktop View */}
                        <div className="hidden md:block">
                            {!loading && randomDhikr.map((dhikr) => (
                                <div key={dhikr.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-5" dir="rtl">
                                    <div className="flex items-center justify-end flex-row-reverse gap-0.5">
                                        <h2 className="text-lg font-medium text-(--main-color)">{dhikr.title}</h2>
                                        <Image
                                            src={dhikr.image}
                                            alt={dhikr.title}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{dhikr.content}</p>
                                </div>
                            ))}
                        </div>

                        {/* Mobile View (Swiper) */}
                        <div className="block md:hidden">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                autoplay={{ delay: 3000 }}
                                className="w-full"
                            >
                                {randomDhikr.map((dhikr) => (
                                    <SwiperSlide key={dhikr.id}>
                                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg" dir="rtl">
                                            <div className="flex items-center justify-end flex-row-reverse gap-0.5">
                                                <h2 className="text-lg font-medium text-(--main-color)">{dhikr.title}</h2>
                                                <Image
                                                    src={dhikr.image}
                                                    alt={dhikr.title}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{dhikr.content}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Posts
