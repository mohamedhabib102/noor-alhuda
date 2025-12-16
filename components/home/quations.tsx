"use client"
import req from "@/lib/axios";
import AccordionItem from "@/ui/Accordion";
import CreateQuation from "@/ui/CreateQuation";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";






interface CreateQuestionProps {
    questionID: number,
    personID: number,
    questionContent: string,
    responseContent: string,
    personName: string,
    isFound: boolean
}


interface QuationsProps {
  state: string;
}

const Quations: React.FC<QuationsProps> = ({ state }) => {
  const [showQuestions, setShowQuestions] = useState<CreateQuestionProps[]>([])



  const getAllQuestion = async() => {
    try {
       await req.get("/api/Alhoda_Alnabawya/GetAllQuestionsAndResponses")
       .then((res) => {
        console.log(res.data);
        setShowQuestions(res.data)
       })
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    getAllQuestion()
  }, [])
  return (
    <section className={
      `${state === "page" ? "" : "py-16 bg-gray-100 dark:bg-gray-900"}`
    }>
      <CustomContainer>
        {state !== "page" && (
          <CustomTitle
            title="الأسئلة الشائعة"
            description="شارك بسؤالك الديني واكتشف إجابات الأسئلة الشائعة"
            success={false}
          />
        )}
        {state !== "page" && (
          <Link href="/questions" className="block mt-4 p-2 bg-(--main-color) text-white rounded-lg
          cursor-pointer hover:text-white hover:bg-[#264f37] transition-all duration-300
           text-[20px] mb-5 mr-auto w-fit"> عرض جميع الأسئلة  </Link>
        )}
        <div className="mb-4">
          {state === "page" ? (
            showQuestions.map((ques) => (
            ques.isFound && (
              <AccordionItem key={ques.questionID}
                title={ques.questionContent}>
                <div className="flex items-center flex-col">
                  <div className="flex items-center gap-3 flex-row border-b border-gray-300 dark:border-gray-700 w-full pb-1.5">
                    {
                       (
                        <Image
                          src="/images/male.png"
                          title={ques.questionContent}
                          alt="avatar"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )
                    }
                    <div>
                      <h4 className="text-(--main-color) dark:text-[#4ade80] font-semibold flex flex-row gap-0.5">
                        <span>{ques.personName}</span>
                      </h4>
                    </div>
                  </div>
                  <p className="p-3 leading-7 text-right ml-auto text-gray-800 dark:text-gray-200">{ques.responseContent}</p>
                </div>
              </AccordionItem>
            )
          ))
          ) : (
            showQuestions.slice(0, 8).map((ques) => (
            ques.isFound && (
              <AccordionItem key={ques.questionID}
                title={ques.questionContent}>
                <div className="flex items-center flex-col">
                  <div className="flex items-center gap-3 flex-row border-b border-gray-300 dark:border-gray-700 w-full pb-1.5">
                    {
                       (
                        <Image
                          src="/images/male.png"
                          title={ques.questionContent}
                          alt="avatar"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )
                    }
                    <div>
                      <h4 className="text-(--main-color) dark:text-[#4ade80] font-semibold flex flex-row gap-0.5">
                        <span>{ques.personName}</span>
                      </h4>
                    </div>
                  </div>
                  <p className="p-3 leading-7 text-right ml-auto text-gray-800 dark:text-gray-200">{ques.responseContent}</p>
                </div>
              </AccordionItem>
            )
          ))
          )}
        </div>
        <CreateQuation />
      </CustomContainer>
    </section>
  )
}
export default Quations;