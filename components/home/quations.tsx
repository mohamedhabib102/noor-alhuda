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



  const getAllQuestion = async () => {
    try {
      setLoading(true)
      await req.get("/api/Alhoda_Alnabawya/GetAllQuestionsAndResponses")
        .then((res) => {
          setShowQuestions(res.data)
        })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getAllQuestion()
  }, [])

  const findHim = showQuestions.some(q => q.isFound === true);


  const parts = (part:string, index:number) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      const [sura, ayah] =  part.replace(/\[|\]/g, "").split(":");
      return (
        <Link key={index}
          href={`/quran/${sura}#ayah-${ayah}`}
          className="text-main mx-1 font-bold italic"
        >{part.replace(/\[|\]/g, "")}</Link>
      )
    } else if (part.startsWith('"') && part.endsWith('"')) {
      return <span key={index} className="font-bold text-main">{part.replace('"', '')}</span>
    } else {
      return <span key={index}>{part}</span>
    }
  }
  return (
    <section className={
      `${state === "page" ? "" : "lg:py-16 py-8 bg-background dark:bg-background border-t border-gray-100 dark:border-transparent"}`
    }>
      <CustomContainer>
        {state !== "page" && (
          <CustomTitle
            title="زاد المعرفة"
            success={true}
            description="مساحة مخصصة لنشر الفائدة؛ هنا يشارك ذوو العلم السؤال وإجابته معاً من واقع خبراتهم المستمدة من الكتاب والسنة، ليكون القسم مرجعاً ثرياً بالمعلومات الجاهزة للنفع العام وليس مكاناً لطرح الأسئلة وانتظار الإجابة."            
          />
        )}
        {state !== "page" && (
          <Link href="/questions" className="block mt-4 p-3 border-2 border-brand-gold text-brand-gold rounded-xl
          cursor-pointer hover:bg-brand-gold hover:text-white transition-all duration-300
           text-lg font-bold mb-8 mr-auto w-fit shadow-sm hover:shadow-md"> عرض جميع الأسئلة  </Link>
        )}
        <div className="mb-4">
          {state === "page" ? (
            showQuestions.map((ques) => (
              ques.isFound && (
                <AccordionItem key={ques.questionID}
                  title={ques.questionContent}>
                  <div className="flex items-center flex-col">
                    <div className="flex items-center gap-3 flex-row border-b border-brand-gold/15 dark:border-main/10 w-full pb-3">
                      {
                        (
                          <Image
                            src={ques.image}
                            title={ques.questionContent}
                            alt="avatar"
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )
                      }
                      <div>
                        <h4 className="text-brand-gold dark:text-brand-gold font-bold flex flex-row gap-0.5 text-lg">
                          <span>{ques.personName}</span>
                        </h4>
                      </div>
                    </div>
                    <p className="p-3 leading-8 text-right ml-auto text-gray-800 dark:text-gray-200">
                      {ques.responseContent.split(/(".*?"|\[\d+:\d+\])/).map((part, index) =>
                        parts(part, index)
                      )}
                    </p>
                  </div>
                </AccordionItem>
              )
            ))
          ) : (
            showQuestions.slice(0, 4).map((ques) => (
              ques.isFound && (
                <AccordionItem key={ques.questionID}
                  title={ques.questionContent}>
                  <div className="flex items-center flex-col">
                    <div className="flex items-center gap-3 flex-row border-b border-brand-gold/15 dark:border-main/10 w-full pb-3">
                      {
                        (
                          <Image
                            src={ques.image}
                            title={ques.questionContent}
                            alt="avatar"
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )
                      }
                      <div>
                        <h4 className="text-brand-gold dark:text-brand-gold font-bold flex flex-row gap-0.5 text-lg">
                          <span>{ques.personName}</span>
                        </h4>
                      </div>
                    </div>
                    <p className="p-3 leading-7 text-right ml-auto text-gray-800 dark:text-gray-200">
                      {ques.responseContent.split(/(".*?")/).map((part, index) =>
                        part.startsWith('"') && part.endsWith('"') ? (
                          <span key={index}
                            className="text-main-bg mx-1 font-bold italic"
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
          <p className="mb-1.5 text-sm font-semibold bg-main/10 p-4 rounded-lg">لا يوجد أسئلة حاليًا، يمكنك إضافة سؤال وانتظار مراجعته</p>
        )}
        <CreateQuation getAllQuestion={getAllQuestion} />
      </CustomContainer>
    </section>
  )
}
export default Quations;