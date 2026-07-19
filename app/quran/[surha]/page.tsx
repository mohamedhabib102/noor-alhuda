import SurahContainer from "@/components/quran/SurahContainer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    surha: string;
  }>;
}

const getSurahMeta = async (surahNumber: string) => {
  const textRes = await fetch(
    `https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`,
    { cache: "force-cache" }
  );
  const textData = await textRes.json();

  const audioRes = await fetch(
    `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`,
    { cache: "force-cache" }
  );
  const audioData = await audioRes.json();

  const combinedAyahs = textData.data.ayahs.map((ayah: any, index: number) => ({
    ...ayah,
    audio: audioData.data?.ayahs?.[index]?.audio || "",
  }));

  return {
    ...textData.data,
    ayahs: combinedAyahs,
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const surah = await getSurahMeta(resolvedParams.surha);

  return {
    title: `سورة ${surah.name} | القرآن الكريم`,
    description: `اقرأ آيات سورة ${surah.name} كاملة مكتوبة بالرسم العثماني مع التفسير.`,
    openGraph: {
      title: `سورة ${surah.name} | القرآن الكريم`,
      description: `اقرأ آيات سورة ${surah.name} كاملة مكتوبة بالرسم العثماني.`,
      images: [
        {
          url: "/images/default.png",
          width: 1200,
          height: 630,
          alt: "سورة " + surah.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `سورة ${surah.name} | القرآن الكريم`,
      description: `اقرأ آيات سورة ${surah.name} كاملة مكتوبة بالرسم العثماني.`,
      images: ["/images/default.png"],
    },
    keywords: [
      "القرآن الكريم",
      "سورة " + surah.name,
      "تفسير",
      "القرآن",
      "quran",
      "surah",
      "tafsir",
    ],
    alternates: {
      canonical: `/quran/${surah.number}`,
    },
  };
}

const SurhaPage: React.FC<Props> = async ({ params }) => {
  const resolvedParams = await params;
  const surahNumber = resolvedParams.surha;
  const surah = await getSurahMeta(surahNumber);

  console.log(surah);

  return (
    <>
      <SurahContainer surahNumber={surahNumber} surahMeta={surah} />
    </>
  );
};

export default SurhaPage;