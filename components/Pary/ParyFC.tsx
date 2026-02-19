"use client"

import { useEffect, useReducer, useState } from "react"

interface Actions {
  type: "increment";
}

const reducer = (state: number, action: Actions) => {
  switch (action.type) {
    case "increment":
      return state === 33 ? 0 : state + 1
    default:
      return state
  }
}



const ParyFC: React.FC = () => {
  const [count, dispatch] = useReducer(reducer, 0);
  const [allNums, setAllNums] = useState<number>(0)

  const handelClick = () => {

    const stored = localStorage.getItem("count");
    const oldValue = stored ? JSON.parse(stored) : 0;

    const newValue = oldValue + 1;

    localStorage.setItem("count", JSON.stringify(newValue));


    setAllNums(newValue);

    dispatch({ type: "increment" });
  };


  useEffect(() => {
    const fetchCount = async () => {
      const count = localStorage.getItem("count");
      if (count) {
        const parsedCount = JSON.parse(count);
        setAllNums(parsedCount); // الآن آمن
      }
    };
    fetchCount();
  }, []);

  return (
    <>
      <div className="flex items-center gap-3 select-none bg-main/60 text-white dark:bg-main-bg/10 p-4 rounded-lg">
        <span className="text-lg font-semibold"> عدد جميع التسبيحات </span>
        <div className="text-lg font-semibold relative text-white">
          <span className="absolute top-1/2 left-1/2 -translate-1/2 w-10 p-2 h-10 bg-main dark:bg-main-bg/50 z-10 rounded-r-3xl rounded-b-2xl"></span>
          <span className="z-20 relative">
            {allNums <= 9 ? `0${allNums}` :
              allNums === 1000 ? `1K+` :
                allNums === 10000 ? `10K+` :
                  allNums === 100000 ? `100K+` :
                    allNums === 1000000 ? `1M+` :
                      allNums}
          </span>
        </div>
      </div>

      {/* Premium Motivational Quranic Verse */}
      <div className="mt-12 mb-4 text-center group">
        <div className="inline-block relative px-10 py-6 rounded-3xl bg-main/5 dark:bg-main-bg/5 border border-main/10 dark:border-main-bg/10 shadow-sm overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-main/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-main-bg/5 rounded-tr-full -ml-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>

          <p className="text-3xl font-quran text-main dark:text-main-bg font-bold relative z-10 drop-shadow-sm tracking-wide">
            "وَفِي ذَٰلِكَ فَلْيَتَنَافَسِ الْمُتَنَافِسُونَ"
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 relative z-10 opacity-60">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-main"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-main rotate-45"></div>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-main"></div>
          </div>
        </div>
      </div>
      <div
        onClick={handelClick} className="mt-20 mx-auto cursor-pointer lg:w-96 lg:h-96 w-72 h-72 rounded-full bg-white border-2 border-main
         dark:bg-main-bg/10 dark:border-main-bg/50 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-7xl font-bold select-none">{count <= 9 ? `0${count}` : count}</p>
        </div>
      </div>
    </>
  )
}
export default ParyFC