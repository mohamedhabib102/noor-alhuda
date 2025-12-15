import req from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Post {
    postID: number,
    personID: number,
    postTitle: string,
    postContent: string,
    createdAt: string,
    personName: string,
    image?: string
}

const DEFAULT_IMAGE = "/logo-share.png";

const PostCard = ({ post, getPosts }: { post: Post, getPosts: () => void }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
    }, [post.image]);

    const deletPost = async (postID: number) => {
        const id = postID;
        try {
            await req.delete(`/api/Alhoda_Alnabawya/DeletePost/${id}`).then((res) => {
               getPosts();
            });
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <article className=" dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-48  dark:bg-gray-700">
                <Image
                    src={post.image || DEFAULT_IMAGE}
                    alt={post.postTitle || "Post image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                />
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                        <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>
   
            <div className="p-5 text-left">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                    {post.postTitle}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.postContent}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                            {post.personName?.charAt(0) || 'A'}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.personName}</span>
                    </div>
                    <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={post.createdAt}>
                        {formatDate(post.createdAt)}
                    </time>
                </div>
                <button onClick={() => deletPost(post.postID)} 
                className="cursor-pointer mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                    Delete</button>
            </div>
        </article>
    );
};
export default PostCard;
