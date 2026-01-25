import SurahContainer from "@/components/quran/SurahContainer";


import type { Metadata } from "next";

interface Props {
  params: Promise<{
    surha: string;
  }>;
}


const getSurah = async (surahNumber: string) => {
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`, {
    cache: "no-store"
  })
  const data = await res.json()
  return data.data
}

const getTafsir = async (surahNumber: string) => {
  const res = await fetch(`https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${surahNumber}`, {
    cache: "no-store"
  })
  const data = await res.json()
  // console.log(data.result);
  return data.result
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const surah = await getSurah(resolvedParams.surha);


  return {
    title: `سورة ${surah.name} | القرآن الكريم`,
    description: `اقرأ آيات سورة ${surah.name} كاملة مكتوبة بالرسم العثماني مع التفسير.`,
    openGraph: {
      title: `سورة ${surah.name} | القرآن الكريم`,
      description: `اقرأ آيات سورة ${surah.name} كاملة مكتوبة بالرسم العثماني.`,
    },
  };
}


const SurhaPage: React.FC<Props> = async ({ params }) => {
  const resolvedParams = await params;
  const surahNumber = resolvedParams.surha;
  const surah = await getSurah(surahNumber);
  const tafsir = await getTafsir(surahNumber);
  return (
    <>
    <SurahContainer surah={surah} tafsir={tafsir} />
    </>
  );
};

export default SurhaPage;