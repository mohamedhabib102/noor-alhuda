import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"
import { Quations } from "@/components/home"



const QuestionsPage: React.FC = () => {
    return (
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                    title="زاد المعرفة"
                    success={true}
                    description="مساحة مخصصة لنشر الفائدة؛ هنا يشارك ذوو العلم السؤال وإجابته معاً من واقع خبراتهم المستمدة من الكتاب والسنة، ليكون القسم مرجعاً ثرياً بالمعلومات الجاهزة للنفع العام وليس مكاناً لطرح الأسئلة وانتظار الإجابة."
                />
                <Quations state="page" />
            </CustomContainer>
        </section>
    )
}
export default QuestionsPage;