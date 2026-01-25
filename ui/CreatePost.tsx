'use client';

import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import Image from 'next/image';
import { FaImage, FaSmile } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import req from '@/lib/axios';
import { useAuth } from '@/lib/contextapi';
import { useRouter } from 'next/navigation';


interface CreatePostProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    refresh?: () => void;
}

interface Emoji {
    text: string;
    emoji: string;
}

const availableEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"];


const CreatePost: React.FC<CreatePostProps> = ({ toggle, setToggle, refresh }) => {
    const [formData, setFormData] = useState({
        PostTitle: '',
        PostContent: '',
    });
    const { userData } = useAuth()
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)

    const handleEmojis = (em: string) => {
        if (!em) return;
        setFormData(prev => ({ ...prev, PostContent: prev.PostContent + em }));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImage(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);


        if (!userData?.personID) {
            router.push("/join-us")
            return;
        }

        // Validation
        if (!formData.PostTitle.trim() || !formData.PostContent.trim()) {
            setError('من فضلك تأكد من إدخال جميع البيانات المطلوبة بشكل صحيح');
            return;
        }
        const now = new Date();

        try {
            setLoading(true);
            const data = new FormData();
            data.append("PersonID", userData?.personID.toString() || "")
            data.append("PersonName", userData?.personName || "")
            data.append("NameShare", "null")
            data.append("PostTitle", formData.PostTitle)
            data.append("PostContent", formData.PostContent)
            data.append("Share", "false")
            data.append("CreatedAt", now.toISOString() || "")
            data.append("ImageShare", "null")
            data.append("PersonImageShare", "null")
            if (image) {
                data.append("image", image || "")
            }
            req.post("/api/Alhoda_Alnabawya/CreatePost", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
                // Reset form
                setFormData({
                    PostTitle: '',
                    PostContent: '',
                });
                removeImage();
                alert('تم إضافة البوست بنجاح');
                setToggle(false);
                if (refresh) {
                    refresh();
                }
            })
        } catch (err) {
            console.error('Error adding post:', err);
            setError('حدث خطأ أثناء إضافة البوست، يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-40 bg-black/50 backdrop-blur-sm`}></div>
            <div className={
                `${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}  fixed z-50 top-1/2 left-1/2 -translate-1/2 w-[90%] h-[550px] overflow-auto max-w-2xl mx-auto bg-white dark:bg-[#0a1a0f] rounded-2xl shadow-2xl p-6 md:p-8 transition no-scrollbar border border-main/20`
            }>
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-main dark:text-gray-200 absolute top-2 right-2">
                    <MdClose size={30} />
                </button>
                <h2 className="text-2xl font-bold text-main-bg dark:text-gray-100 mb-6 text-center mt-6">إضافة مشاركة جديدة</h2>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-4 text-sm text-right border border-red-100 dark:border-red-800">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-main-bg dark:text-gray-300 mb-1 text-right"> نوع البوست </label>
                        <input
                            type="text"
                            id="name"
                            name="PostTitle"
                            value={formData.PostTitle}
                            onChange={handleChange}
                            placeholder=" مثال: عن القرآن الكريم , عن الأمة الأسلامية"
                            className="w-full px-4 py-3 border border-main-bg/20 dark:border-main/20 rounded-xl focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all text-right dark:bg-main/5 dark:text-white dark:placeholder-gray-500"
                        />
                    </div>
                    {/* Content Input */}
                    <div className='relative'>
                        <label htmlFor="content" className="block text-sm font-bold text-main-bg dark:text-gray-300 mb-1 text-right">محتوى البوست</label>
                        <textarea
                            id="content"
                            name="PostContent"
                            value={`${formData.PostContent}`}
                            onChange={handleChange}
                            placeholder="اكتب محتوى البوست هنا"
                            rows={5}
                            className="w-full px-4 py-3 pl-10 border border-main-bg/20 dark:border-main/20 rounded-xl focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all resize-y text-right dark:bg-main/5 dark:text-white dark:placeholder-gray-500
                            no-scrollbar"
                        />
                        <FaSmile
                            size={22}
                            className='absolute top-9 left-3 cursor-pointer text-main'
                            onClick={() => setOpen(!open)}
                        />

                        <div className={
                            `dark:bg-main/20 bg-main/5 border border-main/10 rounded-xl
                         flex items-center gap-2 p-2 w-fit mr-auto
                         ${open ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-0"}
                         transition-all duration-300 shadow-lg
                         `
                        }>
                            {availableEmojis.map((em, index) => (
                                <button
                                    key={index}
                                    className='text-xl cursor-pointer hover:scale-120 transition-transform'
                                    onClick={() => handleEmojis(em)}
                                    type='button'
                                >
                                    {em}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="flex items-center justify-end gap-4">
                        {preview && (
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-main-bg/20 dark:border-main/30 group">
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-0 right-0 bg-black/50 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity w-full h-full flex items-center justify-center"
                                >
                                    <MdClose size={20} />
                                </button>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 text-main-bg dark:text-gray-300 hover:text-main transition-colors px-4 py-2 rounded-xl hover:bg-main/5 border border-transparent hover:border-main/10"
                            title="إضافة صورة"
                        >
                            <span className="text-sm font-bold">إضافة صورة (اختياري)</span>
                            <FaImage size={24} className="text-main" />
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`cursor-pointer w-full py-3.5 px-4 rounded-xl text-white font-bold shadow-lg transition-all active:scale-[0.98]
                       ${loading
                                ? 'bg-main/70 cursor-not-allowed text-white/70'
                                : 'bg-main hover:bg-emerald-900 border-b-4 border-emerald-950/20'
                            }`}
                    >
                        {loading ? 'جاري النشر...' : 'نشر البوست'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default CreatePost;
