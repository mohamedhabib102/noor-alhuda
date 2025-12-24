import { MdClose } from "react-icons/md";



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
}

const Tafsir: React.FC<TafsirProps> = ({ toggle, setToggle, tafsir }) => {

    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-40 bg-black/40 backdrop-blur-sm`} onClick={() => setToggle(false)}></div>
            <div className={`${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}
        transition-all duration-200 fixed top-1/2 left-1/2 -translate-1/2 z-50 lg:w-96 w-10/12   h-[500px] overflow-auto no-scrollbar m-auto bg-white dark:bg-zinc-900 py-6 px-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800`}>
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-emerald-600 dark:text-gray-200 absolute top-4 left-4">
                    <MdClose size={24} />
                </button>

                <div className="text-right space-y-4">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block border-b border-emerald-100 dark:border-emerald-900/50 pb-2"> التفسير الميسر </span>

                    <h3 className="font-quran text-2xl md:text-3xl leading-relaxed text-gray-800 dark:text-gray-100">
                        {tafsir?.arabic_text || "جاري التحميل..."}
                    </h3>

                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                        {tafsir?.translation}
                    </p>
                </div>
            </div>
        </>
    );
}; export default Tafsir