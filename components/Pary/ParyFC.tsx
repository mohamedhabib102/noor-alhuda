"use client"

import { useEffect, useReducer, useState } from "react"
import { motion } from "framer-motion"

interface State {
  count: number;
}

interface Actions {
  type: "increment";
}

const reducer = (state: number, action: Actions) => {
    switch (action.type) {
        case "increment":
            return  state === 33 ? 0 : state + 1
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

    return(
        <>
         <div className="flex items-center gap-3 select-none bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
          <span className="text-lg font-semibold"> عدد جميع التسبيحات </span>
          <div className="text-lg font-semibold relative text-white
          "> 
          <span className="absolute top-1/2 left-1/2 -translate-1/2 w-10 p-2 h-10 bg-(--main-color) z-10 rounded-r-3xl rounded-b-2xl"></span>
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
         <motion.div
         whileTap={{ scale: 0.9 }} 
         whileHover={{ scale: 1.1 }}
         onClick={handelClick} className="mt-20 mx-auto cursor-pointer lg:w-96 lg:h-96 w-72 h-72 rounded-full bg-white border-2 border-gray-400
         dark:bg-gray-800 dark:border-gray-600">
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-7xl font-bold select-none">{count <= 9 ? `0${count}` : count}</p>
            </div>
         </motion.div>
        </>
    )
}
export default ParyFC