"use client";
import SurahDisplay from "@/ui/Surha";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";

interface Verse {
  number: number;
  text: string;
}

interface Surah {
  id: number;
  name: string;
  englishName: string;
  ayahs: Verse[];
}

interface SurahContainerProps {
  surah: Surah;
}


const SurahContainer: React.FC<SurahContainerProps> = ({ surah }) => {

    return (
        <>
            <section className="py-16">
                <CustomContainer>
                    <div>
                        <CustomTitle
                            title="سور القرآن"
                            success={true}
                            description="تصفح سور القرآن الكريم، تعلّم معانيها، وتأمل في هدايتها وقيمتها الروحية لتعميق الصلة بالله"
                        />

                        <div className="mt-10">
                            <SurahDisplay
                                surah={surah}
                            />
                        </div>
                    </div>
                </CustomContainer>
            </section>
        </>
    );
};

export default SurahContainer;
