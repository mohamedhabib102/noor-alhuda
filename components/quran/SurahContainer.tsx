"use client";
import SurahDisplay from "@/ui/Surha";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";

interface Verse {
    number: number;
    numberInSurah: number;
    text: string;
    audio: string;
}

interface Surah {
  id: number;
  name: string;
  number: number;
  englishName: string;
  ayahs: Verse[];
}

interface Tafsir {
  id: number;
  sura: string;
  aya: string;
  arabic_text: string;
  translation: string;
}

interface SurahContainerProps {
  surah: Surah;
  tafsir: Tafsir[];
}


const SurahContainer: React.FC<SurahContainerProps> = ({ surah, tafsir }) => {



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
                                tafsir={tafsir}
                            />
                        </div>
                    </div>
                </CustomContainer>
            </section>
        </>
    );
};

export default SurahContainer;
