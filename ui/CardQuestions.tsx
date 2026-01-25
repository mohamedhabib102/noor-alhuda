"use client";
import req from "@/lib/axios";
import AccordionItem from "@/ui/Accordion";
import CustomContainer from "@/ui/CustomContainer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/contextapi";
import { Question } from "@/types/Types";



interface CardQuationsProps {
  state: string
}


const CardQuations: React.FC<CardQuationsProps> = ({ state }) => {
  const { userData } = useAuth();

  const [showQuestions, setShowQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false)

  const getUserQuestions = async () => {
    if (!userData?.personID) return;
    try {
      setLoading(true);
      const res = await req.get("/api/Alhoda_Alnabawya/GetAllQuestionsAndResponses");
      const allQuestions: Question[] = res.data;

      const userQuestions = state === "profile" ?
        allQuestions.filter(q => q.personID === userData.personID)
        : allQuestions;

      setShowQuestions(userQuestions);
    } catch (error) {
      console.log(error);
      setError(true)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserQuestions();
  }, [userData?.personID]);




  if (loading) {
    return (
      <div className="mt-6 max-w-3xl mx-auto bg-white dark:bg-main/10 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">
          جاري تحميل الأسئلة...
        </h2>
      </div>
    );
  }

  if (error || showQuestions.length === 0) {
    return (
      <div className="mt-6 max-w-3xl mx-auto bg-white dark:bg-main/10 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">لا يوجد أسئلة</h2>
      </div>
    );
  }

  return (
    <section className={`mt-6`}>
      <CustomContainer>
        <div className="mb-4">

          {showQuestions.map(ques => (
            <AccordionItem key={ques.questionID} title={ques.questionContent}>
              <div className="flex items-center flex-col">
                <div className="flex items-center gap-3 justify-between border-b border-gray-300 dark:border-gray-700 w-full pb-1.5">
                  <div className="flex items-center gap-3">
                    <Image
                      src={ques.image}
                      title={ques.questionContent}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="text-(--main-color) dark:text-[#4ade80] font-semibold">
                        {ques.personName}
                      </h4>
                    </div>
                  </div>
                  <span>{ques.isFound ? (
                    <div className="flex items-center gap-1.5 flex-row-reverse">
                      <span className="w-3 h-3 bg-green-500 rounded-full block"></span>
                      <span className="text-sm lg:block hidden"> مقبول </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 flex-row-reverse">
                      <span className="w-3 h-3 bg-red-500 rounded-full block"></span>
                      <span className="text-sm lg:block hidden"> قيد الأنتظار</span>
                    </div>
                  )}</span>
                </div>
                <p className="p-3 leading-8 text-right ml-auto text-gray-800 dark:text-gray-200">
                  {ques.responseContent.split(/(".*?")/).map((part, index) =>
                    part.startsWith('"') && part.endsWith('"') ? (
                      <span key={index} className="text-(--main-color) mx-1 font-semibold underline">
                        {part.replace(/"/g, "")}
                      </span>
                    ) : part
                  )}
                </p>
              </div>
            </AccordionItem>
          ))}

        </div>

        {loading && <p>جاري تحميل الأسئلة...</p>}
      </CustomContainer>
    </section>
  );
};

export default CardQuations;
