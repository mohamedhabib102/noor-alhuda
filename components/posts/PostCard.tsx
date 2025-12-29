import req from "@/lib/axios";
import { Post } from "@/types/Adhkar";
import Image from "next/image";




const DEFAULT_IMAGE = "/logo-share.png";

const PostCard = ({ post, getPosts }: { post: Post, getPosts: () => void }) => {


    const deletPost = async (postID: number) => {
        const id = postID;
        try {
            await req.delete(`/api/Alhoda_Alnabawya/DeletePost/${id}`).then(() => {
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
                    src={post.image_Post || DEFAULT_IMAGE}
                    alt={post.postTitle || "Post image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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
