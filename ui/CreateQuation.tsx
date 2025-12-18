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
const CreateQuestion: React.FC<PropsFun> = ({getAllQuestion}) => {
    const {userData} = useAuth()
    const [question, setQuestion] = useState<CreateQuestionProps>({
        questionContent: "",
        responseContent: ""
    });
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router =  useRouter()

    const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuestion(prev =>
            ({ ...prev, [name]: value })
        );
    }

    const sendQuestion = async (e: FormEvent) => {
        setLoading(true)
        e.preventDefault();
        if (!userData?.personID){
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
                    placeholder=" أضف السوال "
                    className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg
                text-right outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color)
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    onChange={handelChange}
                    value={question.questionContent}
                />
                <textarea
                    name="responseContent"
                    id="responseContent"
                    placeholder=" أضف الأجابة "
                    className="resize-none w-full h-30 p-2 border border-gray-300 dark:border-gray-600 rounded-lg
                text-right mb-4 outline-none focus:border-(--main-color) focus:ring-1 focus:ring-(--main-color)
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    onChange={handelChange}
                    value={question.responseContent}
                >

                </textarea>

                <button
                    type="submit"
                    className="block ml-auto mt-4 p-2 bg-(--main-color) text-white rounded-lg
                    cursor-pointer  hover:text-white hover:bg-[#264f37] transition-all duration-300
                    w-33 text-right text-[20px]"
                > {loading ? " جاري الأضافة... " : "أضف"} </button>
            </form>
        </div>
    )
}
export default CreateQuestion;