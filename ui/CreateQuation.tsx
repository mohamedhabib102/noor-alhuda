"use client";
import { FormEvent, useState } from "react";
import CustomTitle from "./CustomTitle";
import req from "@/lib/axios";
import { useAuth } from "@/lib/contextapi";
import { useRouter } from "next/navigation";


interface CreateQuestionProps {
    questionContent: string;
    responseContent: string;
}



interface PropsFun {
    getAllQuestion: () => void
}

// component add new Question
const CreateQuestion: React.FC<PropsFun> = ({ getAllQuestion }) => {
    const { userData } = useAuth()
    const [question, setQuestion] = useState<CreateQuestionProps>({
        questionContent: "",
        responseContent: ""
    });
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuestion(prev =>
            ({ ...prev, [name]: value })
        );
    }

    const sendQuestion = async (e: FormEvent) => {
        setLoading(true)
        e.preventDefault();
        if (!userData?.personID) {
            router.push("/join-us");
            return;
        }
        if (!question.questionContent || !question.responseContent) {
            setMessage(" من فضلك تأكد إدخال جميع البيانات المطلوبة بشكل صحيح ");
            setLoading(false)
            return;
        }
        try {
            setMessage("");
            const data = {
                personID: userData?.personID,
                questionContent: question.questionContent,
                responseContent: question.responseContent,
                personName: userData?.personName
            }
            await req.post("/api/Alhoda_Alnabawya/CreateQuestionAndResponse", data);
            getAllQuestion()
            setQuestion({
                questionContent: "",
                responseContent: ""
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <CustomTitle
                title=" شارك بسؤالك "
                success={false}
            />
            {message && (
                <div className="bg-red-50 text-right dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm border border-red-100 dark:border-red-800">
                    {message}
                </div>
            )}
            <form
                onSubmit={sendQuestion}
                method="post">
                <input
                    type="text"
                    name="questionContent"
                    id="questionContent"
                    placeholder=" أضف السؤال "
                    className="w-full p-3 mb-4 border border-brand-gold/20 dark:border-main/30 rounded-xl
                text-right outline-none focus:border-main focus:ring-2 focus:ring-main/20
                bg-white dark:bg-main/10 dark:text-white transition-all shadow-sm"
                    onChange={handelChange}
                    value={question.questionContent}
                />
                <textarea
                    name="responseContent"
                    id="responseContent"
                    placeholder=" أضف الإجابة "
                    className="resize-y w-full h-32 p-3 border border-brand-gold/20 dark:border-main/30 rounded-xl
                text-right mb-4 outline-none focus:border-main focus:ring-2 focus:ring-main/20
                bg-white dark:bg-main/10 dark:text-white transition-all shadow-sm"
                    onChange={handelChange}
                    value={question.responseContent}
                />

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 leading-relaxed">
                    <p className="mb-2">
                        • الجمل بين علامات التنصيص <span className="text-main font-bold italic">"مثل هذا"</span> تظهر بشكل مميز.
                    </p>
                    <p>
                        • للإشارة لآية، استخدم التنسيق <span className="text-main font-bold">[رقم السورة:رقم الآية]</span> ليتم تحويلها تلقائياً لرابط (مثلاً <span className="text-main font-bold">[1:5]</span> لسورة الفاتحة الآية 5).
                    </p>
                </div>

                <button
                    type="submit"
                    className="block ml-auto mt-2 px-10 py-3 bg-main hover:bg-emerald-900 text-white rounded-xl font-bold
                    cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg active:scale-95
                    w-fit text-center text-lg"
                > {loading ? " جاري الإضافة... " : "أضف السؤال"} </button>

            </form>
        </div>
    )
}
export default CreateQuestion;