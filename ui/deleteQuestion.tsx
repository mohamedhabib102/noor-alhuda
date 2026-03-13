"use client"
import req from "@/lib/axios";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdClose } from "react-icons/md";


interface Props {
    toggleDelete: boolean;
    setToggleDelete: React.Dispatch<SetStateAction<boolean>>;
    refresh?: () => Promise<void>;
    questionID: number;
}

const DeleteQuestionContent:React.FC<Props> = 
({
toggleDelete, 
setToggleDelete, 
refresh, 
questionID
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const  handlerMouse = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)){
            setToggleDelete(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handlerMouse);
        return () => {
            document.removeEventListener("mousedown", handlerMouse);
        }
    }, [ref]);

   const  deleteQuestion = async () => {
    if (!questionID) return;

    try {
        setLoading(true);
        const res= await req.delete(`/api/Alhoda_Alnabawya/DeleteQuestion/${questionID}`);
        setToggleDelete(!toggleDelete);
        if (refresh) {
            refresh();
        }
    } catch (error) {
        console.log(error);
        setError(true);
    } finally {
        setLoading(false);
    }
   }


    return (
      <>
        <div className={`${toggleDelete ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-40 bg-black/40 backdrop-blur-xs`}></div>
        <div ref={ref} className={`${toggleDelete ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}
        transition-all duration-200 fixed top-1/2 left-1/2 -translate-1/2 z-50 lg:w-96 w-11/12 max-w-sm m-auto bg-white dark:bg-main p-6 shadow-2xl rounded-4xl border border-main/5 dark:border-white/10`}>
          <button onClick={() => setToggleDelete(!toggleDelete)} className="cursor-pointer transition duration-300 text-gray-400 hover:text-main dark:text-white/50 dark:hover:text-main-bg absolute top-4 right-4">
            <MdClose size={28} />
          </button>


          <h3 className="text-center text-main dark:text-white mb-6">هل انت متاكد من حذف السؤال</h3>


          {error && (
            <div className="text-center text-main-bg mb-4">
                <p className="inline-block mx-1.5">حدث خطأ</p>
                <button onClick={() => setToggleDelete(!toggleDelete)}>حاول مرة اخرى</button>
            </div>
          )}
          <div className="flex items-center justify-center lg:flex-nowrap flex-wrap gap-4 mt-4">
            <button 
            onClick={() => setToggleDelete(!toggleDelete)}
             className="cursor-pointer transition duration-300 
             bg-main-bg p-2 w-44 rounded-xl text-white text-lg">
              الغاء
            </button>
            <button 
            onClick={deleteQuestion}
             className="cursor-pointer transition duration-300 
             bg-red-500 p-2 w-44 rounded-xl text-white text-lg">
              {loading ? 
              <AiOutlineLoading3Quarters 
              size={20}
              className="animate-spin mx-auto"
              />
              : "حذف"}
            </button>
          </div>
        </div>
      </>
    )
};
export default DeleteQuestionContent
