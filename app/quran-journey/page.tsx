import Journey from "@/components/quran-journey/Journey";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";




const QuranJourneyPage = () => {
    return (
        <section className="py-16 bg-main/5 dark:bg-black min-h-screen">
            <CustomContainer>
                <CustomTitle
                    title="رحلة القرآن"
                    success={true}
                   description="تابع تقدمك في قراءة القرآن الكريم، وحدد ما أنجزته من السور أو الأجزاء حتى تصل إلى ختمة كاملة."
                />
                 <Journey />
            </CustomContainer>
        </section>
    );
}; export default QuranJourneyPage