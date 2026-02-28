import { MdClose } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

export interface TafsirData {
    id: number;
    sura: string;
    aya: string;
    arabic_text: string;
    translation: string;
}

interface TafsirProps {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
    tafsir: TafsirData | null;
    onPlay?: () => void;
}

const Tafsir: React.FC<TafsirProps> = ({ toggle, setToggle, tafsir, onPlay }) => {

    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300`} onClick={() => setToggle(false)}></div>
            <div className={`${toggle ? "opacity-100 visible scale-100 -translate-x-1/2 -translate-y-1/2" : "opacity-0 invisible scale-95 -translate-x-1/2 -translate-y-1/2"}
        transition-all duration-300 fixed top-1/2 left-1/2 z-50 lg:w-96 w-10/12 max-h-[80vh] overflow-auto no-scrollbar m-auto bg-white dark:bg-zinc-900 py-8 px-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800`}>
                
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-emerald-100 dark:border-emerald-900/50">
                    <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-red-500 dark:text-gray-200">
                        <MdClose size={24} />
                    </button>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400"> التفسير الميسر </span>
                    {onPlay && (
                         <button onClick={onPlay} className="cursor-pointer transition duration-200 text-emerald-600 hover:scale-110">
                            <FaPlay size={20} />
                        </button>
                    )}
                </div>

                <div className="text-right space-y-6">
                    <h3 className="font-quran text-2xl md:text-3xl leading-relaxed text-gray-800 dark:text-gray-100 bg-emerald-50/30 dark:bg-emerald-950/20 p-4 rounded-2xl">
                        {tafsir?.arabic_text || "جاري التحميل..."}
                    </h3>

                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-sans text-justify" dir="rtl">
                        {tafsir?.translation}
                    </p>
                </div>
            </div>
        </>
    );
}; 

export default Tafsir;