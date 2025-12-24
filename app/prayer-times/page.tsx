import TimesPrayer from "@/components/prayer-times/timesPrayer";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"




const PrayerTimesPage = () => {
    return (
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                    title="أوقات الصلاة"
                    description="تعرف على أوقات الصلاة اليومية بدقة حسب موقعك، مع مواقيت الفجر والظهر والعصر والمغرب والعشاء محدثة باستمرار."
                    success={true}
                />
                <TimesPrayer />
            </CustomContainer>
        </section>
    )
}; export default PrayerTimesPage