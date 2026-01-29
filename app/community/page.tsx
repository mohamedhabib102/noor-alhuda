import { Posts } from "@/components/community";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"





const Community = () => {
    return (
        <section className="lg:py-16 py-8">
            <CustomContainer>
                <CustomTitle
                    title="المجتمع"
                    success={true}
                    description=" مجتمع يتيح للأعضاء مشاركة مقالات دينية، والنقاش والتفاعل في جو من الاحترام والتقوى، لتعميق الفهم ونشر القيم الروحية بطريقة آمنة وجميلة "
                />
                <Posts />
            </CustomContainer>
        </section>
    )
}
export default Community;
