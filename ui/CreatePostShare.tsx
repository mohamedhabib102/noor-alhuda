'use client';

import { useState, FormEvent } from 'react';
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
    namePostShare?: string;
    titlePostShare?: string;
    contentPostShare?: string;
    imagePostShare?: string;
    authorImageShare?: string;
}

const CreatePostShare: React.FC<CreatePostShareProps> = ({
    toggle,
    setToggle,
    getAllPosts,
    nameShare,
    namePostShare,
    titlePostShare,
    contentPostShare,
    imagePostShare,
    authorImageShare
}) => {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
            data.append("ImageShare", imagePostShare || "");

            // If there's an image, we send the URL or keep it as is? 
            // Usually, the API might take the image URL string if it's already uploaded.
            // In the original CreatePost it was a File. Let's see if we can pass the string.
            if (imagePostShare) {
                data.append("image_Post", imagePostShare);
            }


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

    const sharePostOutSite = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: titlePostShare,
                    text: contentPostShare,
                    url: window.location.origin
                });
            } catch (error) {
                console.log("تم إلغاء المشاركة", error);
            }
        } else {
            alert("خاصية المشاركة غير مدعومة في متصفحك");
        }
    };

    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-300`}></div>
            <div className={
                `${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"} fixed z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transition-all duration-300 overflow-y-auto max-h-[90vh] no-scrollbar`
            } dir="rtl">
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-red-500 dark:text-gray-200 absolute top-4 left-4">
                    <MdClose size={28} />
                </button>

                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b dark:border-gray-700 pb-3">مشاركة منشور</h2>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm border border-red-100 dark:border-red-800">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Post Preview (Unified Share Style) */}
                    <div className="bg-gray-200 dark:bg-gray-900 p-3 rounded-xl">
                        {/* Header: Shared By */}
                        <div className="flex items-center gap-1.5 mb-2 px-1">
                            <BiRepost size={20} className="text-(--main-bg)" />
                            <div className="font-medium text-sm flex items-center gap-1">
                                <span className="font-bold">سيتم المشاركة بواسطة :</span>
                                <span className="mx-1 text-(--main-bg) font-bold">{userData?.personName}</span>
                            </div>
                        </div>

                        {/* Original Post Card */}
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-(--main-bg) font-bold text-lg overflow-hidden">
                                    {authorImageShare && authorImageShare !== "" && authorImageShare !== "null" ? (
                                        <Image
                                            src={authorImageShare}
                                            title={nameShare}
                                            alt="author image"
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span>{nameShare?.charAt(0) || "ن"}</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-(--main-bg) text-sm">{nameShare}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{titlePostShare}</p>
                                </div>
                            </div>
                        </div>

                        <div className="py-1 px-2 text-gray-700 dark:text-gray-200 mb-2 text-base leading-relaxed">
                            <ExpandableText text={contentPostShare || ""} />
                        </div>

                        {imagePostShare && imagePostShare !== "null" && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/10">
                                <Image
                                    src={imagePostShare}
                                    alt="Post Preview"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`cursor-pointer w-full py-3 px-4 rounded-xl text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2
                                    ${loading
                                    ? 'bg-[#0e582d]/70 cursor-not-allowed'
                                    : 'bg-[#0e582d] hover:bg-[#0b4623] active:scale-[0.98]'
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
