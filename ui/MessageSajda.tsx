import { Sajda } from "@/types/Types";
import { MdClose } from "react-icons/md";






interface TafsirProps {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
    sajda: Sajda | null;
}

const MessageSajda: React.FC<TafsirProps> = ({ toggle, setToggle, sajda }) => {


    const wajba = sajda?.recommended === false && sajda?.obligatory === true;
    const mustahaba = sajda?.recommended === true && sajda?.obligatory === false;
    const isLoved = sajda?.recommended === true && sajda?.obligatory === true;

    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-40 bg-black/40 backdrop-blur-sm`} onClick={() => setToggle(false)}></div>
            <div className={`${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}
        transition-all duration-200 fixed top-1/2 left-1/2 -translate-1/2 z-50 lg:w-96 w-10/12   h-[500px] overflow-auto no-scrollbar m-auto bg-white dark:bg-zinc-900 py-6 px-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800`}>
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-emerald-600 dark:text-gray-200 absolute top-4 left-4">
                    <MdClose size={24} />
                </button>

                <div className="text-right space-y-4">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block border-b border-emerald-100 dark:border-emerald-900/50 pb-2"> حكم سجدة التلاوة </span>

                    <h3 className="font-quran text-2xl md:text-3xl leading-relaxed text-gray-800 dark:text-gray-100">
                       {
                        wajba ? "سجدة واجبة – يجب القيام بها عند بعض العلماء"
                        : mustahaba ? "سجدة مستحبة – يُستحب القيام بها"
                        : isLoved ? "سجدة تلاوة – واجبة ومستحبة" : "لا توجد سجدة"
                       }
                    </h3>


                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {wajba ? `هذه الآية تحتوي على سجدة تلاوة واجبة عند بعض المذاهب مثل الحنفية.
عند تلاوتها يُستحب أن يسجد القارئ مباشرة بعد الآية احترامًا لتعليم القرآن.
إذا لم يُسجد القارئ، فقد ترك واجبًا مستحقًا عند العلماء الذين يعتبرونها واجبة.`


                        : mustahaba ? `هذه الآية تحتوي على سجدة تلاوة مستحبة، أي أن السجود بعد الآية يعتبر من السنن المؤكدة أو المستحبة.
عدم السجود هنا ليس خطأ، ولكنه يُستحب للقارئ احترامًا لتعليم القرآن واتباعًا للسنة.`


                        : isLoved ? ` هذه الآية تحتوي على سجدة تلاوة مهمة، وهي واجبة عند بعض المذاهب مثل الحنفية، ومستحبة عند مذاهب أخرى.
عند تلاوتها، يُستحب للقارئ أن يسجد مباشرة بعد الآية احترامًا لتعليم القرآن.
إذا لم يسجد القارئ، فقد فوت عليه الواجب عند بعض العلماء، بينما عند آخرين يعتبر مجرد استحباب.
لذلك يُنصح دائمًا بالقيام بالسجود عند هذه الآية لضمان الالتزام بكل الأقوال. ` : "لا توجد سجدة"
                       }
                    </p>

                </div>
            </div>
        </>
    );
}; export default MessageSajda