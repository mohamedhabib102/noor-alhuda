"use client";

import { useEffect, useState } from "react";
import req from "@/lib/axios";
import Image from "next/image";
import { FaTrash, FaEdit, FaCheckCircle, FaTimesCircle, FaUser, FaRegQuestionCircle, FaCommentDots } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ExpandableText from "@/components/posts/ExpandableText";

interface Question {
    questionID: number;
    personID: number;
    questionContent: string;
    responseContent: string;
    personName: string;
    isFound: boolean;
    image: string;
}

const QuestionsPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const res = await req.get("/api/Alhoda_Alnabawya/GetAllQuestionsAndResponses");
            setQuestions(res.data);
        } catch (error) {
            console.error("Failed to fetch questions", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const deleteQuestion = async (id: number) => {
        if (!confirm("هل أنت متأكد من حذف هذا السؤال؟")) return;
        try {
            await req.delete(`/api/Alhoda_Alnabawya/DeleteQuestion/{${id}}`);
            setQuestions(questions.filter((q) => q.questionID !== id));
            alert("تم حذف السؤال بنجاح");
        } catch (error) {
            console.error("Failed to delete question", error);
            alert("حدث خطأ أثناء الحذف");
        }
    };

    const handleUpdateStatus = async (isFound: boolean) => {
        if (!selectedQuestion) return;
        try {
            setUpdateLoading(true);
            await req.put(`/api/Alhoda_Alnabawya/UpdateQuestionStatus`, null, {
                params: {
                    QuestionID: selectedQuestion.questionID,
                    IsFound: isFound
                }
            });

            setQuestions(questions.map(q =>
                q.questionID === selectedQuestion.questionID ? { ...q, isFound } : q
            ));
            setIsUpdateModalOpen(false);
            alert("تم تحديث الحالة بنجاح");
        } catch (error) {
            console.error("Failed to update status", error);
            alert("حدث خطأ أثناء تحديث الحالة");
        } finally {
            setUpdateLoading(false);
        }
    };

    const openUpdateModal = (question: Question) => {
        setSelectedQuestion(question);
        setIsUpdateModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--main-bg)"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6" dir="rtl">
            <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100 border-r-4 border-(--main-bg) pr-4">
                إدارة الأسئلة والإجابات
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...questions].reverse().map((q) => (
                    <div
                        key={q.questionID}
                        className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {/* Status Header */}
                        <div className={`h-1.5 w-full ${q.isFound ? 'bg-green-500' : 'bg-red-500'}`} />

                        <div className="p-5">
                            {/* User Info */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800">
                                    {q.image && q.image !== "null" ? (
                                        <Image src={q.image} alt={q.personName} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                            <FaUser size={20} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{q.personName}</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        {q.isFound ? (
                                            <span className="flex items-center gap-1 text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-bold">
                                                <FaCheckCircle size={10} /> مقبول
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-bold">
                                                <FaTimesCircle size={10} /> غير مقبول
                                            </span>
                                        )}
                                        <span className="text-xs text-zinc-400 font-mono">#{q.questionID}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openUpdateModal(q)}
                                        className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all cursor-pointer"
                                        title="تحديث الحالة"
                                    >
                                        <FaEdit size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteQuestion(q.questionID)}
                                        className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 transition-all cursor-pointer"
                                        title="حذف السؤال"
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl relative overflow-hidden group/item">
                                    <div className="absolute right-0 top-0 h-full w-1 bg-(--main-bg) opacity-50" />
                                    <div className="flex gap-2 items-start">
                                        <FaRegQuestionCircle className="text-(--main-bg) mt-1 shrink-0" size={18} />
                                        <div>
                                            <p className="text-xs font-bold text-zinc-400 mb-1">السؤال:</p>
                                            <div className="text-gray-700 dark:text-zinc-200 leading-relaxed font-medium">
                                                {q.questionContent}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-(--main-bg)/5 dark:bg-(--main-bg)/10 p-4 rounded-xl relative overflow-hidden">
                                    <div className="absolute right-0 top-0 h-full w-1 bg-zinc-300 dark:bg-zinc-700" />
                                    <div className="flex gap-2 items-start">
                                        <FaCommentDots className="text-zinc-400 mt-1 shrink-0" size={18} />
                                        <div>
                                            <p className="text-xs font-bold text-zinc-400 mb-1">الإجابة:</p>
                                            <div className="text-gray-600 dark:text-zinc-300 leading-relaxed italic">
                                                <ExpandableText text={q.responseContent || "لا توجد إجابة بعد..."} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Status Popup */}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsUpdateModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white dark:bg-zinc-900 w-full max-w-sm rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 text-center">
                            <button
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="absolute top-4 left-4 p-2 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                            >
                                <MdClose size={24} />
                            </button>

                            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${selectedQuestion?.isFound ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
                                {selectedQuestion?.isFound ? <FaCheckCircle size={40} /> : <FaTimesCircle size={40} />}
                            </div>

                            <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-2">تحديث الحالة</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-8 text-sm">
                                هل هذا السؤال مقبول للعرض في الموقع؟ <br />
                                <span className="font-bold text-zinc-700 dark:text-zinc-200 mt-2 block italic">&quot;{selectedQuestion?.questionContent?.substring(0, 50)}&hellip;&quot;</span>
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleUpdateStatus(true)}
                                    disabled={updateLoading}
                                    className={`py-4 rounded-2xl font-black transition-all flex flex-col items-center gap-2 cursor-pointer 
                                        ${selectedQuestion?.isFound
                                            ? 'bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-900/20'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600'}`}
                                >
                                    <FaCheckCircle size={20} />
                                    مقبول
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(false)}
                                    disabled={updateLoading}
                                    className={`py-4 rounded-2xl font-black transition-all flex flex-col items-center gap-2 cursor-pointer
                                        ${!selectedQuestion?.isFound
                                            ? 'bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-red-900/20'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600'}`}
                                >
                                    <FaTimesCircle size={20} />
                                    مرفوض
                                </button>
                            </div>

                            {updateLoading && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-(--main-bg) font-bold animate-pulse">
                                    <div className="w-4 h-4 border-2 border-(--main-bg) border-t-transparent rounded-full animate-spin" />
                                    جاري التحديث...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionsPage;