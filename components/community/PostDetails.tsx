"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import req from "@/lib/axios";
import { BiRepost } from "react-icons/bi";
import ExpandableText from "@/components/posts/ExpandableText";
import CustomContainer from "@/ui/CustomContainer";
import Link from "next/link";
import { FaRegCopy } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import ShowImageProfile from "@/ui/ShowImageProfile";



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
const PostDetails: React.FC<{ post?: PostPage }> = ({ post: initialPost }) => {
    const params = useParams();
    const postId = params?.id as string | undefined;
    const [post, setPost] = useState<PostPage | null>(initialPost || null);
    const [loading, setLoading] = useState<boolean>(initialPost ? false : true);
    const [error, setError] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [showImage, setShowImage] = useState<boolean>(false);
    const [origin, setOrigin] = useState("");



    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    useEffect(() => {
        // if an initial post was passed as prop, don't fetch
        if (initialPost) return;
        if (!postId) return;

        const getPostById = async () => {
            try {
                setLoading(true);
                const res = await req.get("/api/Alhoda_Alnabawya/GetAllPosts");
                const allPosts: PostPage[] = res.data;
                
                const foundPost = allPosts.find(p => p.postID === parseInt(postId as string));
                
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getPostById();
    }, [postId, initialPost]);

    const currentName = (share: boolean, shareName: string, personName: string) => {
        let name = personName;
        if (share) {
            name = shareName;
        }
        return name;
    };

    const linkPost = `${origin}/community/${post?.postID}`;

    const handleCopy  = async () => {
        try {
            await navigator.clipboard.writeText(linkPost);
            setCopied(true);
            setTimeout(() => setCopied(false), 700);
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    };


    if (loading) {
        return (
            <section className="py-16">
                <CustomContainer>
                    <div className="animate-pulse">
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomContainer>
            </section>
        );
    }

    if (error || !post) {
        return (
            <section className="py-16">
                <CustomContainer>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            البوست غير موجود
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            عذراً، لم نتمكن من العثور على هذا البوست او تم حذفه
                        </p>
                    </div>
                </CustomContainer>
            </section>
        );
    }
    return (
        <>
        <ShowImageProfile 
        toggleImage={showImage} 
        setToggleImage={setShowImage} 
        image={post?.image_Person} 
        nameUser={post?.personName}
        />
        <section className="py-16">
            <CustomContainer>
                <div className="max-w-3xl mx-auto">
                    {/* Official Brand Frame */}
                    <div className="relative border-2 border-(--main-bg)/20 dark:border-(--main-bg)/10 rounded-2xl p-1.5 md:p-2 bg-gray-200 dark:bg-gray-900 shadow-sm transition-shadow">
                        
                        {/* Top Branding Section */}
                        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-300/30 dark:border-gray-700/30 mb-2">
                            <div className="flex items-center gap-2">
                                <Image src="/logo.svg" alt="logo" width={28} height={28} className="w-6 h-6 md:w-7 md:h-7" />
                                <span className="text-sm md:text-base font-black text-(--main-bg) tracking-tight">نور الهدى</span>
                            </div>
                             <div className="h-2 w-2 rounded-full bg-(--main-bg) opacity-50"/>
                        </div>

                        {/* Share Content - If share is true */}
                        {post?.share && (
                            <div className="flex items-center gap-1.5 mb-3 px-4 py-2 bg-gray-300/50 dark:bg-black/20 rounded-2xl mx-2">
                                <BiRepost size={20} className="text-(--main-bg)" />
                                <div className="font-medium text-xs md:text-sm flex items-center gap-1">
                                    <span className="font-bold opacity-70">تم المشاركة من :</span>
                                    <span className="text-(--main-bg) font-bold">{post.shareName}</span>
                                </div>
                            </div>
                        )}

                        {/* Main Post Content */}
                        <div dir="rtl" className="bg-gray-100 dark:bg-gray-800 lg:p-6 md:p-6 p-4 rounded-lg shadow-sm">
                            {/* Post Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {post?.image_Person && (
                                        <Image
                                            src={post.image_Person}
                                            title={post.personName}
                                            alt={post.personName}
                                            width={44}
                                            height={44}
                                            onClick={() => setShowImage(!showImage)}
                                            className="cursor-pointer w-10 h-10 md:w-11 md:h-11 rounded-full object-contain"
                                        />
                                    )}
                                    <div>
                                        <h3 
                                        onClick={() => setShowImage(!showImage)}
                                        className="cursor-pointer font-bold text-sm md:text-base text-(--main-bg)">
                                            {currentName(post.share, post.shareName, post.personName)}
                                        </h3>
                                        <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">
                                            {post.postTitle}
                                        </span>
                                    </div>
                                </div>
                                    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap ml-4">
                                    {post ? new Date(post.createdAt).toLocaleDateString("ar-EG") : ""}
                                </span>
                            </div>

                            {/* Post Content */}
                            <div className="mt-5 space-y-4">
                                    <div className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                                    <ExpandableText text={post?.postContent || ""} />
                                </div>

                                {/* Post Image */}
                                {post.share
                                    ? (
                                        <>
                                            {post?.imageShare && post.imageShare !== "null" && (
                                                <Image
                                                    src={post.imageShare}
                                                    alt={post.shareName}
                                                    width={600}
                                                    height={900}
                                                    className="rounded-lg w-full max-h-[600px] object-contain bg-black/20 dark:bg-black/40"
                                                />
                                            )}
                                        </>
                                    )
                                    : (
                                        <>
                                            {post?.image_Post && post.image_Post !== "null" && (
                                                <Image
                                                    src={post.image_Post}
                                                    alt={post.personName}
                                                    width={600}
                                                    height={900}
                                                    className="rounded-lg w-full max-h-[600px] object-contain bg-black/20 dark:bg-black/40"
                                                />
                                            )}
                                        </>
                                    )
                                }

                                {/* Share Button */}
                                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                                        <button
                                            className="flex items-center justify-center bg-gray-300 dark:bg-black/20 p-2.5 rounded-lg gap-2 text-orange-600 cursor-pointer hover:bg-gray-400 dark:hover:bg-black/30 transition duration-200"
                                            onClick={() => handleCopy()}
                                        >
                                        <span className="text-sm md:text-base"> نسخ الرابط </span>
                                        {copied ? <AiOutlineLoading className="animate-spin" /> 
                                        : <FaRegCopy size={20} />}
                                        
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                    شارك المنشور على وسائل التواصل الاجتماعي أو مع أصدقائك
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Back Link */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/community"
                            className="inline-block bg-(--main-bg) text-white px-6 py-2 rounded-lg hover:opacity-80 transition duration-300"
                        >
                            العودة للمجتمع
                        </Link>
                    </div>
                </div>
            </CustomContainer>
        </section>
        </>
    );
}; export default PostDetails;
