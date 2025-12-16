"use client"
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import AddPostForm from "@/ui/CreatePost";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Swiper CSS moved to app/layout.tsx for global preload and to avoid extra CSS chunks



interface User {
    name: string;
    image: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    image?: string;
    user: User;
    typeContent: string;
    type: boolean;
    time: string;
}

interface Dhikr {
    id: number;
    title: string;
    content: string;
    image: string;
}

const posts: Post[] = [
    {
        id: 1,
        user: {
            name: "Mohamed Mowafy",
            image: "/images/male.png"
        },
        title: "Post 1",
        content: " اللهم انت المنجي فا نجي القدس من اليهود ",
        image: "/images/plastine.jpg",
        typeContent: " عن الأمة التي بكى الرسول عليها ",
        type: true,
        time: "2025-11-23"
    },
    {
        id: 2,
        user: {
            name: " ايه محمود احمد ",
            image: "/images/female.jpg"
        },
        title: "Post 2",
        content: " لا اله إلا الله  محمد رسول الله ",
        typeContent: " عن القرآن الكريم الذي نزل من الله عز وجل ",
        type: false,
        time: "2025-11-15"
    }
]

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
    id: number;
    image_url: string;
    name: string;
    type: string;
    content: string;
    created_at: string;
    gender: string;
}

const Posts: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    const [postsPage, setPostsPage] = useState<PostPage[]>([])


    const getAllPosts = async () => {
        try {
            const { data, error } = await supabase.from("posts").select("*")
            console.log(data);

            if (!error && data) {
                // Shuffle the posts array randomly
                const shuffledPosts = [...data].sort(() => 0.5 - Math.random());
                setPostsPage(shuffledPosts);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchPosts = async () => {
            await getAllPosts();
        }
        fetchPosts();
    }, [])
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
                            {postsPage.map((post) => (
                                <div key={post.id} dir="rtl" className="bg-gray-100 dark:bg-gray-800 last:mb-0 mb-14 lg:p-6 md:p-6 p-4 rounded-lg">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            {
                                                post.gender !== "ذكر" ? (
                                                    <Image
                                                        src="/images/male.png"
                                                        alt={post.name}
                                                        title={post.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/images/female.jpg"
                                                        alt={post.name}
                                                        title={post.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                )
                                            }
                                            <div>
                                                <h3 className="font-medium -mb-1.5 text-(--main-bg)">{post.name}</h3>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{post.type}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(post.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        {post.image_url ? (
                                            <div>
                                                <p className="mt-2 text-lg dark:text-gray-200">{post.content}</p>
                                                {post.image_url !== null && (
                                                    <Image
                                                        src={post.image_url}
                                                        alt={post.name}
                                                        width={500}
                                                        height={500}
                                                        className="rounded-lg w-full lg:h-[550px] mt-3 bg-cover"
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <p className="mt-2 text-lg dark:text-gray-200">{post.content}</p>
                                        )}
                                        <div className="flex items-center justify-between gap-2.5 mt-4">
                                            <div className="flex items-center justify-center bg-white dark:bg-gray-700 p-2 rounded-lg gap-1 w-[45%] text-(--main-bg) cursor-pointer
                                    hover:bg-(--main-bg) hover:text-white transition duration-300">
                                                <span>0</span>
                                                <FaRegHeart size={23} />
                                            </div>
                                            <div className="flex items-center justify-center bg-white dark:bg-gray-700 p-2 rounded-lg gap-1 w-[45%] text-(--main-bg) cursor-pointer
                                    hover:bg-(--main-bg) hover:text-white transition duration-300">
                                                <span>0</span>
                                                <BiSolidComment size={23} />
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
                            {randomDhikr.map((dhikr) => (
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
