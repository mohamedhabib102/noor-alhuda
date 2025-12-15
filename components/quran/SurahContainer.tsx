"use client";
import { useState, useEffect } from "react";
import SavedSurha from "@/components/quran/SavedSurha";
import SurahDisplay from "@/ui/Surha";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";

interface SurahContainerProps {
    surah: any;
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
