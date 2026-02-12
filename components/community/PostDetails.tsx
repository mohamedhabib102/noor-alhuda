"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import req from "@/lib/axios";
import { BiRepost } from "react-icons/bi";
import ExpandableText from "@/components/posts/ExpandableText";
import CustomContainer from "@/ui/CustomContainer";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
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

    const handleCopy = async () => {
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
            <section className="py-16 bg-main/5 dark:bg-black min-h-screen">
                <CustomContainer>
                    <div className="animate-pulse">
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white dark:bg-main/10 rounded-[2.5rem] p-8 border border-main/10">
                                <div className="h-8 bg-main/10 dark:bg-white/5 rounded-xl w-3/4 mb-6"></div>
                                <div className="h-72 bg-main/5 dark:bg-white/5 rounded-2xl mb-6"></div>
                                <div className="space-y-4">
                                    <div className="h-5 bg-main/5 dark:bg-white/5 rounded w-full"></div>
                                    <div className="h-5 bg-main/5 dark:bg-white/5 rounded w-5/6"></div>
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
            <section className="py-16 bg-main/5 dark:bg-black min-h-screen">
                <CustomContainer>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-main/10 rounded-[2.5rem] p-12 text-center border border-main/10 shadow-xl">
                        <h2 className="text-3xl font-black text-main-bg dark:text-white mb-4">
                            البوست غير موجود
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 font-bold">
                            عذراً، لم نتمكن من العثور على هذا البوست او تم حذفه
                        </p>
                        <Link href="/community" className="inline-block mt-8 text-main font-black hover:underline">العودة للمجتمع</Link>
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
            <section className="py-16 bg-main/5 dark:bg-black min-h-screen">
                <CustomContainer>
                    <div className="max-w-3xl mx-auto">
                        {/* Official Brand Frame */}
                        <div className="relative border-2 border-main-bg/15 dark:border-main/20 rounded-2xl p-1.5 md:p-2 bg-main/5 dark:bg-main/10 shadow-2xl transition-all hover:shadow-main/5">

                            {/* Top Branding Section */}
                            <div className="flex items-center justify-between px-8 py-5 border-b border-main-bg/10 dark:border-main/10 mb-2">
                                <div className="flex items-center gap-3">
                                    <Image src="/logo.svg" alt="logo" width={32} height={32} className="w-8 h-8 md:w-9 md:h-9" />
                                    <span className="text-base md:text-lg font-black text-main-bg tracking-tight">نور الهدى</span>
                                </div>
                                <div className="h-3 w-3 rounded-full bg-main-bg opacity-50 shadow-sm" />
                            </div>

                            {/* Share Content - If share is true */}
                            {post?.share && (
                                <div className="flex items-center gap-2 mb-4 px-6 py-3 bg-main-bg/10 dark:bg-white/5 rounded-2xl mx-3 border border-main-bg/5">
                                    <BiRepost size={24} className="text-main-bg" />
                                    <div className="font-bold text-sm md:text-base flex items-center gap-1">
                                        <span className="text-gray-600 dark:text-gray-400">تم المشاركة من :</span>
                                        <span className="text-main-bg font-black">{post.shareName}</span>
                                    </div>
                                </div>
                            )}

                            {/* Main Post Content */}
                            <div dir="rtl" className="bg-white dark:bg-main/10 lg:p-8 md:p-8 p-6 rounded-2xl shadow-sm border border-main/5">
                                {/* Post Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        {post?.image_Person && (
                                            <Image
                                                src={post.image_Person}
                                                title={post.personName}
                                                alt={post.personName}
                                                width={52}
                                                height={52}
                                                onClick={() => setShowImage(!showImage)}
                                                className="cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full object-contain border-2 border-main/10 shadow-sm"
                                            />
                                        )}
                                        <div>
                                            <h3
                                                onClick={() => setShowImage(!showImage)}
                                                className="cursor-pointer font-black text-base md:text-lg text-main-bg hover:text-main transition-colors">
                                                {post.personName}
                                            </h3>
                                            <span className="text-xs md:text-sm text-main font-bold opacity-80">
                                                {post.postTitle}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] md:text-xs text-gray-400 font-bold whitespace-nowrap ml-4 uppercase tracking-widest">
                                        {post ? new Date(post.createdAt).toLocaleDateString("ar-EG") : ""}
                                    </span>
                                </div>

                                {/* Post Content */}
                                <div className="mt-8 space-y-6">
                                    <div className="text-main-bg dark:text-gray-200 text-lg md:text-xl leading-relaxed font-medium">
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
                                                        width={800}
                                                        height={1200}
                                                        className="rounded-2xl w-full max-h-[700px] object-contain bg-black/5 dark:bg-black/20 border border-main/10 shadow-inner"
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
                                                        width={800}
                                                        height={1200}
                                                        className="rounded-2xl w-full max-h-[700px] object-contain bg-black/5 dark:bg-black/20 border border-main/10 shadow-inner"
                                                    />
                                                )}
                                            </>
                                        )
                                    }

                                    {/* Copy Link Button */}
                                    <div className="flex items-center justify-center gap-3 mt-10 pt-8 border-t border-main-bg/10 dark:border-main/10">
                                        <button
                                            className="flex items-center justify-center bg-main text-white px-8 py-4 rounded-2xl gap-3 font-black text-lg shadow-xl shadow-main/20 cursor-pointer hover:bg-emerald-900 transition-all active:scale-95 group border-b-4 border-emerald-950/30"
                                            onClick={() => handleCopy()}
                                        >
                                            <span> نسخ الرابط </span>
                                            {copied ? <AiOutlineLoading className="animate-spin" />
                                                : <FaRegCopy size={24} className="group-hover:scale-110 transition-transform" />}
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-bold">
                                        شارك المنشور مع من تحب ليعم الخير والأجر
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Back Link */}
                        <div className="mt-12 text-center">
                            <Link
                                href="/community"
                                className="inline-flex items-center gap-2 text-main-bg font-black hover:text-main transition-colors text-lg"
                            >
                                <IoArrowForward className="rotate-180" />
                                <span>العودة للمجتمع</span>
                            </Link>
                        </div>
                    </div>
                </CustomContainer>
            </section>
        </>
    );
}; export default PostDetails;
