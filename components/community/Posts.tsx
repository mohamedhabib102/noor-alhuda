"use client"
import Image from "next/image";
import Link from "next/link";
import AddPostForm from "@/ui/CreatePost";
import SharePostForm from "@/ui/CreatePostShare";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import req from "@/lib/axios";
import { FaShare } from "react-icons/fa6";
import { useAuth } from "@/lib/contextapi";
import { BiRepost } from "react-icons/bi";
import LikePost from "./LikePost";
import ExpandableText from "../posts/ExpandableText";



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
    shareName: string;
    image_Post: string;
    image_Person: string
    share: boolean;
    imageShare: string;
}





const Posts: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    const [toggleShare, setToggleShare] = useState(false);
    const [postsPage, setPostsPage] = useState<PostPage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<boolean>(false)
    const { userData } = useAuth()
    const [nameShare, setNameShare] = useState<string>("")
    const [namePostShare, setNamePostShare] = useState<string>("")
    const [titlePostShare, setTitlePostShare] = useState<string>("")
    const [contentPostShare, setContentPostShare] = useState<string>("")
    const [imagePostShare, setImagePostShare] = useState<string>("")
    const [authorImageShare, setAuthorImageShare] = useState<string>("")
    const [visibleCount, setVisibleCount] = useState(3)
    const [isFetchingMore, setIsFetchingMore] = useState(false)


    const getAllPosts = async () => {
        try {
            setLoading(true)
            const res = await req.get("/api/Alhoda_Alnabawya/GetAllPosts")
            setPostsPage(res.data)
        } catch (error) {
            console.log(error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllPosts();
    }, [])

    useEffect(() => {
        if (postsPage.length === 0 || visibleCount >= postsPage.length || isFetchingMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsFetchingMore(true);
                    // Load more immediately or with small delay
                    setTimeout(() => {
                        setVisibleCount((prev) => prev + 3);
                        setIsFetchingMore(false);
                    }, 500); // Reduced delay
                }
            },
            { threshold: 0.1 }
        );

        const trigger = document.getElementById("infinite-scroll-trigger");
        if (trigger) observer.observe(trigger);

        return () => observer.disconnect();
    }, [visibleCount, postsPage.length, isFetchingMore]);


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


    const handelShare = (post: PostPage) => {
        setNameShare(post.personName) // This is the original author
        setTitlePostShare(post.postTitle)
        setContentPostShare(post.postContent)
        setNamePostShare(userData?.personName || "") // Sharer's name
        setAuthorImageShare(post.image_Person || "") // Original author's image
        setImagePostShare(post.image_Post)
        setToggleShare(true)
    }

    const currentName = (share: boolean, nameShare: string, personName: string, personID: number) => {
        let name = personName
        if (share) {
            name = nameShare;
        } else {
            if (userData?.personID === personID) {
                name = "أنت"
            }
        }
        return name
    }


    return (
        <>
            <div>
                <AddPostForm
                    toggle={toggle}
                    setToggle={setToggle}
                    getAllPosts={getAllPosts}
                />
                <SharePostForm
                    toggle={toggleShare}
                    setToggle={setToggleShare}
                    getAllPosts={getAllPosts}
                    nameShare={nameShare}
                    titlePostShare={titlePostShare}
                    contentPostShare={contentPostShare}
                    imagePostShare={imagePostShare}
                    namePostShare={namePostShare}
                    authorImageShare={authorImageShare}
                />
                <div className="py-6">
                    <button className="bg-(--main-bg) text-white p-2 rounded-lg w-[200px] block ml-auto mb-4 cursor-pointer hover:opacity-80 transition duration-300"
                        onClick={() => setToggle(!toggle)}
                    > اضافة منشور </button>
                    <div className="flex items-start justify-between lg:flex-row-reverse md:flex-row flex-col-reverse gap-8">
                        <div className="lg:w-[75%] md:w-[60%] w-full">
                            <div className="">
                                {postsPage.slice(0, visibleCount).map((post) => (
                                
                                    
                                <div key={post.postID} className="mb-6 md:mb-14 group">
                                            {/* Official Brand Frame */}
                                            
                                            <div className="relative border-2 border-(--main-bg)/20 dark:border-(--main-bg)/10 rounded-2xl p-1.5 md:p-2 bg-gray-200 dark:bg-gray-900 shadow-sm transition-shadow hover:shadow-lg">

                                                {/* Top Branding Section - Inside the Frame */}
                                                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-300/30 dark:border-gray-700/30 mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Image src="/logo.svg" alt="logo" width={28} height={28} className="w-6 h-6 md:w-7 md:h-7" />
                                                    <span className="text-sm md:text-base font-black text-(--main-bg) tracking-tight">نور الهدى</span>
                                                </div>
                                                <div className="h-2 w-2 rounded-full bg-(--main-bg) opacity-50"/>
                                                </div>

                                                <Link  href={`/community/${post.postID}`}>
                                                
                                                {/* Share Content - Inside the Frame */}
                                                {post.share && (
                                                    <div className="flex items-center gap-1.5 mb-3 px-4 py-2 bg-gray-300/50 dark:bg-black/20 rounded-2xl mx-2">
                                                        <BiRepost size={20} className="text-(--main-bg)" />
                                                        <div className="font-medium text-xs md:text-sm flex items-center gap-1">
                                                            <span className="font-bold opacity-70">تم المشاركة من :</span>
                                                            <span className="text-(--main-bg) font-bold">{post.shareName}</span>
                                                        </div>
                                                    </div>
                                                )}
                                              

                                                {/* Actual Post Content - Nested within Frame */}
                                                <div dir="rtl" className={`bg-gray-100 dark:bg-gray-800 lg:p-6 md:p-6 p-4 rounded-lg shadow-sm`}>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-3">

                                                            {post.image_Person && (
                                                                <Image
                                                                    src={post.image_Person}
                                                                    title={post.personName}
                                                                    alt={post.postContent}
                                                                    width={44}
                                                                    height={44}
                                                                    className="w-10 h-10 md:w-11 md:h-11 rounded-full object-contain"
                                                                />
                                                            )}



                                                            <div>
                                                                <h3 className="font-bold text-sm md:text-base text-(--main-bg)">{currentName(post.share, post.shareName, post.personName, post.personID)}</h3>
                                                                <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">{post.postTitle}</span>
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">{new Date(post.createdAt).toLocaleDateString("ar-EG")}</span>
                                                    </div>

                                                    <div className="mt-5 space-y-4">
                                                        <div className="text-gray-800 dark:text-gray-200">
                                                            <ExpandableText text={post.postContent} />
                                                        </div>


                                                        {post.share ?
                                                            (<>

                                                                {post.image_Post && post.image_Post !== "null" && (
                                                                    <Image
                                                                        src={post.imageShare}
                                                                        alt={post.shareName}
                                                                        width={600}
                                                                        height={900}
                                                                        className="rounded-lg w-full max-h-[500px] object-contain bg-black/20 dark:bg-black/40"
                                                                    />
                                                                )}

                                                            </>)
                                                            : (<>
                                                                {post.image_Post && post.image_Post !== "null" && (
                                                                    <Image
                                                                        src={post.image_Post}
                                                                        alt={post.personName}
                                                                        width={600}
                                                                        height={900}
                                                                        className="rounded-lg w-full max-h-[500px] object-contain bg-black/20 dark:bg-black/40"
                                                                    />
                                                                )}
                                                            </>)
                                                        }



                                                        <div className="flex items-center justify-between gap-3 mt-4">
                                                            <LikePost />
                                                            <div
                                                                className="flex items-center justify-center bg-gray-300 dark:bg-black/20 p-2.5 rounded-lg gap-2 w-[30%] text-orange-600 cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handelShare(post);
                                                                }}
                                                            >
                                                                <span>Share</span>
                                                                <FaShare size={23} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                 </Link>
                                            </div>
                                           
                                </div>
                                    
                               
                                ))}

                                {/* Trigger element for infinite scroll with simulated delay */}
                                {visibleCount < postsPage.length && (
                                    <div id="infinite-scroll-trigger" className="py-10 flex flex-col items-center justify-center gap-3">
                                        <div className="w-10 h-10 border-4 border-(--main-bg) border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-(--main-bg) font-medium text-sm">جاري جلب المنشورات...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-900 p-3 lg:w-[20%] md:w-[35%] w-full sticky top-0 rounded-2xl">
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
                            <div className="block md:hidden sticky top-0">
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
            </div>
        </>
    )
}
export default Posts
