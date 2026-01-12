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
    isFound: boolean;
    image: string
}


interface QuationsProps {
  state: string;
}

const Quations: React.FC<QuationsProps> = ({ state }) => {
  const [showQuestions, setShowQuestions] = useState<CreateQuestionProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)



  const getAllQuestion = async() => {
    try {
      setLoading(true)
       await req.get("/api/Alhoda_Alnabawya/GetAllQuestionsAndResponses")
       .then((res) => {
        setShowQuestions(res.data)
       })
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  }
  

  useEffect(() => {
    getAllQuestion()
  }, [])

  const findHim = showQuestions.some(q => q.isFound === true);
  return (
    <section className={
      `${state === "page" ? "" : "lg:py-16 py-8 bg-gray-100 dark:bg-gray-900"}`
    }>
      <CustomContainer>
        {state !== "page" && (
          <CustomTitle
            title="الأسئلة"
            description="شارك بسؤالك الديني واكتشف إجابات الأسئلة "
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
                          src={ques.image}
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
                  <p className="p-3 leading-8 text-right ml-auto text-gray-800 dark:text-gray-200">
                  {ques.responseContent.split(/(".*?")/).map((part, index) =>
                    part.startsWith('"') && part.endsWith('"') ? (
                      <span key={index}
                      className="text-(--main-color) mx-1 font-semibold underline"
                      >{part.replace(/"/g, "")}</span>
                    ) : (
                      part
                    )
                  )}
                  </p>
                </div>
              </AccordionItem>
            )
          ))
          ) : (
            showQuestions.slice(0, 3).map((ques) => (
            ques.isFound && (
              <AccordionItem key={ques.questionID}
                title={ques.questionContent}>
                <div className="flex items-center flex-col">
                  <div className="flex items-center gap-3 flex-row border-b border-gray-300 dark:border-gray-700 w-full pb-1.5">
                    {
                       (
                        <Image
                          src={ques.image}
                          title={ques.questionContent}
                          alt="avatar"
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-contain"
                        />
                      )
                    }
                    <div>
                      <h4 className="text-(--main-color) dark:text-[#4ade80] font-semibold flex flex-row gap-0.5">
                        <span>{ques.personName}</span>
                      </h4>
                    </div>
                  </div>
                  <p className="p-3 leading-7 text-right ml-auto text-gray-800 dark:text-gray-200">
                    {ques.responseContent.split(/(".*?")/).map((part, index) =>
                    part.startsWith('"') && part.endsWith('"') ? (
                      <span key={index}
                      className="text-(--main-color) mx-1 font-semibold underline"
                      >{part.replace(/"/g, "")}</span>
                    ) : (
                      part
                    )
                  )}
                  </p>
                </div>
              </AccordionItem>
            )
          ))
          )}
        </div>
        {loading && <p>جاري تحميل الأسئلة...</p>}
        {!loading && !findHim && (
          <p className="mb-1.5 text-sm font-semibold">لا يوجد أسئلة حاليًا، يمكنك إضافة سؤال وانتظار مراجعته</p>
        )}
        <CreateQuation getAllQuestion={getAllQuestion}/>
        </CustomContainer>
    </section>
  )
}
export default Quations;