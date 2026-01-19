"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddPostForm from "@/ui/CreatePost";
import SharePostForm from "@/ui/CreatePostShare";
import req from "@/lib/axios";
import { BiRepost } from "react-icons/bi";
import ExpandableText from "@/components/posts/ExpandableText";
import Link from "next/link";
import { useAuth } from "@/lib/contextapi";
import LikePost from "@/components/community/LikePost";
import { FaShare } from "react-icons/fa6";
import { getAllPosts } from "@/lib/methods";
import { Post } from "@/types/Types";

interface CardPostProps {
    stateCard: string
}

const CardPost: React.FC<CardPostProps> = ({ stateCard }) => {
    const { userData } = useAuth();

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [toggleShare, setToggleShare] = useState(false);
    const [nameShare, setNameShare] = useState<string>("")
    const [titlePostShare, setTitlePostShare] = useState<string>("")
    const [contentPostShare, setContentPostShare] = useState<string>("")
    const [imagePostShare, setImagePostShare] = useState<string>("")
    const [authorImageShare, setAuthorImageShare] = useState<string>("")
    const [imageSharePostPlatform, setImageSharePostPlatform] = useState("")
    const [imageSharePersonPlatform, setImageSharePersonPlatform] = useState("")
    const [sharePaltform, setSharePlatform] = useState(false)
    const [visibleCount, setVisibleCount] = useState(3)
    const [isFetchingMore, setIsFetchingMore] = useState(false);


    const getUserPosts = async () => {
        try {
            setLoading(true);
            const allPosts = await getAllPosts();
            if (stateCard === "profile") {
                if (!userData?.personID) return;
                const userPosts = allPosts.filter(
                    post => post.personID === userData?.personID
                )
                setPosts(userPosts)
            } else {
                setPosts(allPosts)
            }
        } catch (err) {
            console.log(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserPosts();
    }, []);

    useEffect(() => {
        if (posts.length === 0 || visibleCount >= posts.length || isFetchingMore) return;

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
    }, [visibleCount, posts.length, isFetchingMore]);






    if (loading) {
        return (
            <div className="mt-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-2">
                    جاري تحميل المقالات...
                </h2>
            </div>
        );
    }

    if (error || posts.length === 0) {
        return (
            <div className="mt-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-2">لا يوجد مقالات</h2>
            </div>
        );
    }

    const handelShare = (post: Post) => {
        setNameShare(post.personName) // This is the original author
        setTitlePostShare(post.postTitle)
        setContentPostShare(post.postContent)
        setAuthorImageShare(post.image_Person || "") // Original author's image
        setImagePostShare(post.image_Post)
        setImageSharePostPlatform(post.imageShare)
        setImageSharePersonPlatform(post.personImageShare)
        setSharePlatform(post.share)
        setToggleShare(true)
    }


    const isValidImage = (src?: string) =>
        typeof src === "string" &&
        src.trim() !== "" &&
        src !== "null" &&
        src !== "nulll" &&
        src !== "string" &&
        src !== "undefined" &&
        (src.startsWith("/") || src.startsWith("http"));



    const avatarSrcElse = (image_Person: string) => {
        return image_Person && isValidImage(image_Person)
            ? image_Person
            : "/images/default.png";
    }

    return (
        <>
            <AddPostForm
                toggle={toggle}
                setToggle={setToggle}
                refresh={getUserPosts}
            />
            <SharePostForm
                toggle={toggleShare}
                setToggle={setToggleShare}
                getAllPosts={getUserPosts}
                nameShare={nameShare}
                titlePostShare={titlePostShare}
                contentPostShare={contentPostShare}
                imagePostShare={imagePostShare}
                authorImageShare={authorImageShare}
                imageSharePostPlatform={imageSharePostPlatform}
                imageSharePersonPlatform={imageSharePersonPlatform}
                sharePaltform={sharePaltform}
            />

            <div className={` ${stateCard === "profile" && "max-w-3xl mx-auto mt-6"}`}>
                {(stateCard === "profile" || stateCard === "page") && (
                    <button className="bg-(--main-bg) text-white p-2 rounded-lg w-[200px] block ml-auto mb-8 cursor-pointer hover:opacity-80 transition duration-300"
                        onClick={() => setToggle(!toggle)}
                    > {stateCard === "profile" ? "اضافة مقال جديد" : "اضافة منشور"} </button>
                )}
                {[...posts].reverse().slice(0, visibleCount).map((post) => (
                    <div key={post.postID} className="mb-6 md:mb-14 group">
                        {/* Official Brand Frame */}

                        <div className="relative border-2 border-(--main-bg)/20 dark:border-(--main-bg)/10 rounded-2xl p-1.5 md:p-2 bg-gray-200 dark:bg-gray-900 shadow-sm transition-shadow hover:shadow-lg">
                            {/* Top Branding Section - Inside the Frame */}
                            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-300/30 dark:border-gray-700/30 mb-2">
                                <div className="flex items-center gap-2">
                                    <Image src="/logo.svg" alt="logo" width={28} height={28} className="w-6 h-6 md:w-7 md:h-7" />
                                    <span className="text-sm md:text-base font-black text-(--main-bg) tracking-tight">نور الهدى</span>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-(--main-bg) opacity-50" />
                            </div>


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
                                        {post.share ? (

                                            <Image
                                                src={isValidImage(post.personImageShare) ? post.personImageShare : "/images/default.png"}
                                                title={post.shareName || "title logo"}
                                                alt={post.postContent || "post content"}
                                                width={44}
                                                height={44}
                                                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-contain"
                                            />

                                        ) : (
                                            <Image
                                                src={post.image_Person || "/images/default.png"}
                                                title={post.personName || "title logo"}
                                                alt={post.postContent || "post content"}
                                                width={44}
                                                height={44}
                                                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-contain"
                                            />

                                        )}
                                        <div>
                                            <h3 className="font-bold text-sm md:text-base text-(--main-bg)">{post.personName || ""}</h3>
                                            <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">{post.postTitle}</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">{new Date(post.createdAt).toLocaleDateString("ar-EG")}</span>
                                </div>
                                <div className="mt-5 space-y-4">
                                    <div className="text-gray-800 dark:text-gray-200">
                                        <ExpandableText text={post.postContent} />
                                    </div>
                                    <Link href={`/community/${post.postID}`}>
                                        {post.share ?

                                            (<>

                                                {post.imageShare && post.imageShare.trim() !== "" && post.imageShare !== "null"
                                                    && post.imageShare !== "nulll" && (
                                                        <Image
                                                            src={post.imageShare || "/images/default.png"}
                                                            alt={post.shareName || "share name"}
                                                            width={600}
                                                            height={900}
                                                            className="rounded-lg w-full max-h-[500px] object-contain bg-black/20 dark:bg-black/40"
                                                        />
                                                    )}
                                            </>)
                                            : (<>
                                                {post.image_Post && post.image_Post !== "null" && (
                                                    <Image
                                                        src={post.image_Post || "/images/default.png"}
                                                        alt={post.personName || "person name"}
                                                        width={600}
                                                        height={900}
                                                        className="rounded-lg w-full max-h-[500px] object-contain bg-black/20 dark:bg-black/40"
                                                    />
                                                )}
                                            </>)
                                        }
                                    </Link>
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
                        </div>

                    </div>
                ))}
                {/* Trigger element for infinite scroll with simulated delay */}
                {visibleCount < posts.length && (
                    <div id="infinite-scroll-trigger" className="py-10 flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 border-4 border-(--main-bg) border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-(--main-bg) font-medium text-sm">جاري جلب المنشورات...</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CardPost;
