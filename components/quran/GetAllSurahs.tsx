import Link from "next/link"



const getSurahs = async () => {
  const res = await fetch("https://api.alquran.cloud/v1/surah", {
    cache: "force-cache"
  })
  const data = await res.json()
  return data.data
}

interface Surah {
  englishName: string;
  englishNameTranslation: string;
  name: string;
  number: number;
  numberOfAyahs: number;
  revelationType: string;
}



const GetAllSurahs: React.FC = async () => {
  const surahs = await getSurahs();

  console.log(surahs)

  return (
    <div dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surahs.map((sur: Surah) => (
          <Link
            href={`/quran/${sur.number}`}
            key={sur.number}
            className="group font-quran flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-main/5 border border-main/10 dark:border-main/20 hover:border-main-bg dark:hover:border-main-bg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            {/* Subtle decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-main/5 dark:bg-main/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />

            <div className="flex items-center gap-5 relative z-10">
              <div
                className="w-12 h-12 flex justify-center items-center text-lg font-bold rounded-xl rotate-45 bg-main/10 dark:bg-main/20 text-main group-hover:bg-main group-hover:text-white transition-all duration-300 shadow-inner"
              >
                <span className="-rotate-45">{sur.number}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-main dark:text-gray-100 group-hover:text-main-bg transition-colors duration-300">{sur.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans tracking-tight">{sur.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
              </div>
            </div>
            <div className="text-left relative z-10">
              <p className="text-lg font-bold text-main-bg">{sur.numberOfAyahs}</p>
              <p className="text-[10px] text-gray-400 uppercase font-sans tracking-widest leading-none">آيات</p>
            </div>
          </Link>

        ))}
      </div>
    </div>
  )
}
export default GetAllSurahs