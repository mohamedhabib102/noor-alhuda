"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters, AiOutlinePlus, AiOutlineDelete, AiOutlineLink, AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineTag, HiOutlineDocumentText } from "react-icons/hi";
import axios from "axios";
import { HeroDB } from "@/types/Types";
import { useToast } from "@/ui/Toast";

const HeroManagementPage = () => {
    const { showToast } = useToast();
    const [heroes, setHeroes] = useState<HeroDB[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Form state - Image is removed as requested
    const [formData, setFormData] = useState({
        title: "",
        type: "video", // Default to video
        link: "",
        description: "",
    });

    const getVideoId = (url: string) => {
        if (!url) return "";
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : "";
    };

    const getImageUrl = (hero: any) => {
        if (hero.image) return hero.image;
        if (hero.type === "video") {
            const videoId = getVideoId(hero.link);
            return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "/images/hero-default.png";
        }
        return "/images/hero-default.png";
    };

    const fetchHeroes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/hero`);
            setHeroes(response.data);
        } catch (err) {
            console.error("Error fetching heroes:", err);
            setError("حدث خطأ أثناء تحميل بيانات في الفعاليات");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroes();
    }, []);

    const handleDelete = async (id: any) => {
        const mongoId = typeof id === 'object' && id?.$oid ? id.$oid : id;
        if (!confirm("هل أنت متأكد من حذف هذا العنصر؟")) return;

        try {
            await axios.delete(`/api/hero?id=${mongoId}`);
            setHeroes(heroes.filter((h: any) => {
                const hid = typeof h._id === 'object' && h._id?.$oid ? h._id.$oid : h._id;
                return hid !== mongoId;
            }));
            showToast("تم الحذف بنجاح", "success");
        } catch (err) {
            console.error("Error deleting hero:", err);
            showToast("حدث خطأ أثناء حذف الفعالية", "error");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`/api/hero`, formData);
            setFormData({
                title: "",
                type: "video",
                link: "",
                description: "",
            });
            setIsAdding(false);
            fetchHeroes();
            showToast("تم الإضافة بنجاح", "success");
        } catch (err) {
            console.error("Error creating hero:", err);
            showToast("حدث خطأ أثناء إضافة العنصر", "error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (loading && heroes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <AiOutlineLoading3Quarters className="text-4xl text-main animate-spin" />
                <p className="text-zinc-500 font-medium animate-pulse">جاري تحميل البيانات...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">إدارة الفعاليات </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">تحكم في العناصر المعروضة في مقدمة الموقع</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all transform active:scale-95 ${isAdding
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        : "bg-main text-white hover:shadow-lg hover:shadow-emerald-900/20 cursor-pointer"
                        }`}
                >
                    {isAdding ? "إلغاء الإضافة" : (
                        <>
                            <AiOutlinePlus size={20} />
                            إضافة عنصر جديد
                        </>
                    )}
                </button>
            </div>

            {/* Add Form Section */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800"
                    >
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mr-1">
                                    <HiOutlineTag className="text-main" /> العنوان الرئيسي
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="مثال: رحلة الإيمان"
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black focus:ring-2 focus:ring-main outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mr-1">
                                    <AiOutlineInfoCircle className="text-main" /> النوع (Type)
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black focus:ring-2 focus:ring-main outline-none transition-all"
                                >
                                    <option value="video">فيديو (YouTube)</option>
                                    <option value="image">صورة (Default)</option>
                                </select>
                            </div>

                            {formData.type === "video" && (
                                <div className="space-y-4 md:col-span-2">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mr-1">
                                            <AiOutlineLink className="text-main" /> الرابط (Link) {formData.type === 'video' && '(مطلوب للفيديو)'}
                                        </label>
                                        <input
                                            type="url"
                                            name="link"
                                            required={formData.type === 'video'}
                                            value={formData.link}
                                            onChange={handleChange}
                                            placeholder={formData.type === 'video' ? "https://www.youtube.com/watch?v=..." : "اختياري..."}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black focus:ring-2 focus:ring-main outline-none transition-all"
                                        />
                                    </div>
                                    
                                    {formData.link && getVideoId(formData.link) && (
                                        <div className="relative w-full max-w-md h-48 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                                            <img 
                                                src={`https://img.youtube.com/vi/${getVideoId(formData.link)}/hqdefault.jpg`} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white text-xs font-bold border border-white/30">
                                                    معاينة الصورة
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                          {formData.type === "image" && (
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 mr-1">
                                    <HiOutlineDocumentText className="text-main" /> الوصف المختصر
                                </label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="اكتب وصفاً قصيراً يظهر في الهيرو..."
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black focus:ring-2 focus:ring-main outline-none transition-all"
                                />
                            </div>
                          )}

                            <div className="md:col-span-2 flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="bg-main text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-900/30"
                                >
                                    حفظ العنصر الجديد
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Heroes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {heroes.length > 0 ? (
                    heroes.map((hero: any, index) => {
                        const id = typeof hero._id === 'object' && hero._id?.$oid ? hero._id.$oid : hero._id;
                        const imageUrl = getImageUrl(hero);

                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                key={id || index}
                                className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                {/* Image Preview */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img
                                        src={imageUrl}
                                        alt={hero.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/images/hero-default.png";
                                        }}
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                                            {hero.type === 'video' ? 'فيديو' : 'صورة'}
                                        </span>
                                    </div>

                                    {/* Delete Button - Overlay */}
                                    <button
                                        onClick={() => handleDelete(hero._id)}
                                        className="absolute top-4 left-4 p-2 bg-red-500/90 text-white rounded-xl hover:bg-red-600 transition-all scale-0 group-hover:scale-100 shadow-lg"
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">{hero.title}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 line-clamp-2 flex-1">
                                        {hero.description || "لا يوجد وصف متوفر"}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-auto">
                                        <span className="flex items-center gap-1">
                                            <AiOutlineLink className="text-main" />
                                            {hero.link ? (
                                                <span className="truncate max-w-[150px]">{new URL(hero.link).hostname}</span>
                                            ) : (
                                                "لا يوجد رابط"
                                            )}
                                        </span>
                                        {hero.createdAt && (
                                            <span>{new Date(hero.createdAt).toLocaleDateString("ar-EG")}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })
                ) : (
                    <div className="col-span-full py-20 text-center bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                        <AiOutlineInfoCircle className="mx-auto text-6xl text-zinc-300 dark:text-zinc-700 mb-4" />
                        <p className="text-zinc-500 font-bold">لا يوجد عناصر هيرو حالياً</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroManagementPage;
