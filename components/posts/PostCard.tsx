import req from "@/lib/axios";
import { Post } from "@/types/Types";
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
        <article className="bg-white dark:bg-white/5 rounded-2xl border border-main-bg/15 dark:border-main/20 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative w-full h-52 bg-main/5 dark:bg-main/10 overflow-hidden">
                <Image
                    src={post.image_Post || DEFAULT_IMAGE}
                    alt={post.postTitle || "Post image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            <span
            className="text-sm font-bold dark:bg-main/50 bg-main/10 w-fit uppercase
            p-1.5 block m-4 rounded-lg"
            >{post.share ? ` تمت المشاركة من:  ${post.shareName} ` : ""}</span>

            <div className="p-6 text-right">
                <h2 className="text-xl font-bold text-main-bg mb-3 line-clamp-2 leading-tight">
                    {post.postTitle}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                    {post.postContent}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-main-bg/10 dark:border-main/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-main flex items-center justify-center text-white text-xs font-black shadow-sm">
                            {post.personName?.charAt(0) || 'A'}
                        </div>
                        <span className="text-sm font-bold text-main">{post.personName}</span>
                    </div>
                    <time className="text-sm font-bold text-gray-400 uppercase tracking-wider" dateTime={post.createdAt}>
                        {formatDate(post.createdAt)}
                    </time>
                </div>

                <button
                    onClick={() => deletPost(post.postID)}
                    className="w-full mt-6 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm cursor-pointer hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-red-100 dark:border-red-900/30"
                >
                    حذف المنشور
                </button>


            </div>
        </article>
    );
};
export default PostCard;
