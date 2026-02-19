'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MdClose } from "react-icons/md";
import { BiRepost } from "react-icons/bi";
import req from '@/lib/axios';
import { useAuth } from '@/lib/contextapi';
import { useRouter } from 'next/navigation';
import ExpandableText from '@/components/posts/ExpandableText';

interface CreatePostShareProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    getAllPosts: () => void;
    nameShare?: string; // This will be sent as personName to the API
    titlePostShare?: string;
    contentPostShare?: string;
    imagePostShare?: string;
    authorImageShare?: string;
    imageSharePostPlatform: string;
    imageSharePersonPlatform: string;
    sharePaltform: boolean
}

const CreatePostShare: React.FC<CreatePostShareProps> = ({
    toggle,
    setToggle,
    getAllPosts,
    nameShare,
    titlePostShare,
    contentPostShare,
    imagePostShare,
    authorImageShare,
    imageSharePostPlatform,
    imageSharePersonPlatform,
    sharePaltform
}) => {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const ref =useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!userData?.personID) {
            router.push("/join-us");
            return;
        }

        try {
            setLoading(true);
            const data = new FormData();

            // Following user instructions for API mapping:
            // "the nameShare that comes to you will be sent to PersonName in api"
            // "nameShare in api will be sent by the registered person"

            data.append("PersonID", userData?.personID.toString() || "");
            data.append("PersonName", nameShare || "");
            data.append("NameShare", userData?.personName || "");

            data.append("PostTitle", titlePostShare || "");
            data.append("PostContent", contentPostShare || "");
            data.append("Share", "true"); // It's a share
            data.append("CreatedAt", new Date().toISOString());
            data.append("ImageShare", imageSharePostPlatform || "null");
            data.append("PersonImageShare", authorImageShare ? authorImageShare : "null");

            const res = await req.post("/api/Alhoda_Alnabawya/CreatePost", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 200 || res.status === 201) {
                alert('تمت مشاركة المنشور بنجاح');
                setToggle(false);
                getAllPosts();
            }
        } catch (err) {
            console.error('Error sharing post:', err);
            setError('حدث خطأ أثناء مشاركة المنشور، يرجى المحاولة مرة أخرى.');
            setToggle(false);
            alert('حدث خطأ أثناء مشاركة المنشور، يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };








        const handlerMouse = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setToggle(false);
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handlerMouse);

        return () => {
            document.removeEventListener("mousedown", handlerMouse);
        }
    }, [ref])


    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-300`}></div>
            <div 
            ref={ref}
            className={
                `${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"} fixed z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-xl bg-white dark:bg-[#0a1a0f] rounded-2xl shadow-2xl p-6 transition-all duration-300 overflow-y-auto max-h-[90vh] no-scrollbar border border-main/20`
            } dir="rtl"
            
            >
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-main dark:text-gray-200 absolute top-4 left-4">
                    <MdClose size={28} />
                </button>

                <h2 className="text-xl font-bold text-main-bg dark:text-gray-100 mb-6 border-b border-main-bg/10 dark:border-main/10 pb-3">مشاركة منشور</h2>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm border border-red-100 dark:border-red-800">
                        {error}
                    </div>
                )}


                

                {sharePaltform ? (
                    <div className="bg-red-50 dark:bg-main/10 text-main-bg dark:text-main-bg p-3 rounded-lg mb-4 text-lg border border-main-bg">
                         لا يمكن مشاركة منشور تمت المشاركة عليه!
                    </div>
                ) : (
                 <>
                    <div className="space-y-6">
                    {/* Post Preview (Unified Share Style) */}
                    <div className="bg-main/5 dark:bg-main/10 p-4 rounded-xl border border-main/10">
                        {/* Header: Shared By */}
                        <div className="flex items-center gap-1.5 mb-2 px-1 text-main-bg">
                            <BiRepost size={24} className="text-main" />
                            <div className="font-bold text-sm flex items-center gap-1">
                                <span>سيتم المشاركة بواسطة :</span>
                                <span className="mx-1 text-main">{userData?.personName}</span>
                            </div>
                        </div>

                        {/* Original Post Card Preview */}
                        <div className="bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm border border-main-bg/10 dark:border-main/10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-main/10 dark:bg-main/20 flex items-center justify-center text-main font-bold text-lg overflow-hidden border border-main/10">
                                    {imageSharePersonPlatform ? (
                                            <Image
                                                src={imageSharePersonPlatform}
                                                title={nameShare}
                                                alt="author image"
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <Image
                                                src="/images/default.png"
                                                title={"nooralhuda"}
                                                alt="author image"
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        )}

                                </div>
                                <div>
                                    <h3 className="font-bold text-main-bg text-sm">{nameShare}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{titlePostShare}</p>
                                </div>
                            </div>
                        </div>

                        <div className="py-1 px-2 text-gray-700 dark:text-gray-200 my-3 text-base leading-relaxed font-medium">
                            <ExpandableText text={contentPostShare || ""} />
                        </div>

                        {
                            imagePostShare ? (
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/5 border border-main/10">
                                    <Image
                                        src={imagePostShare}
                                        alt="Post Preview"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/5 border border-main/10">
                                    <img
                                        src={"/images/default.png"}
                                        alt="Post Preview"
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                            )
                        }

                    </div>
                </div>

                {/* Actions */}
                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`cursor-pointer w-full py-3.5 px-4 rounded-xl text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95
                                    ${loading
                                    ? 'bg-main/70 cursor-not-allowed'
                                    : 'bg-main hover:bg-emerald-900 border-b-4 border-emerald-950/20'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    <span>جاري المشاركة...</span>
                                </>
                            ) : (
                                <>
                                    <FaShare className="scale-x-[-1]" />
                                    <span>تأكيد المشاركة الآن</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
                    </>
                )}
            </div>
        </>
    );
};

// Simple FaShare fallback to avoid import issues if not explicitly needed
const FaShare = ({ className }: { className?: string }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.651 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.547 11.086-26.793 0-36.328z"></path>
    </svg>
);

export default CreatePostShare;
