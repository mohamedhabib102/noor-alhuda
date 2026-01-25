"use client"
import { useReducer, useState } from "react"
import { FaHeart } from "react-icons/fa6"


interface increment {
    type: "increment"
}

interface Decrement {
    type: "decrement"
}

const reducer = (state: number, action: increment | Decrement) => {
    switch (action.type) {
        case "increment":
            return state + 1
        case "decrement":
            return state - 1
        default:
            return state
    }
}


const LikePost: React.FC = () => {
    const [count, dispatch] = useReducer(reducer, 5)
    const [like, setLike] = useState<boolean>(false)
    return (
        <div
            onClick={() => {
                if (like) {
                    dispatch({ type: "decrement" });
                } else {
                    dispatch({ type: "increment" });
                }
                setLike(!like);
            }}

            className={`select-none flex items-center justify-center p-2.5 rounded-xl gap-2 w-[30%] cursor-pointer transition-all active:scale-95 border
                ${like
                    ? "bg-red-50 dark:bg-red-900/20 text-red-600 border-red-100 dark:border-red-900/30"
                    : "bg-main/5 dark:bg-white/5 text-main-bg border-main-bg/5 hover:bg-main-bg/10"
                }`}>
            <span className="font-bold text-sm">{count}</span>
            <FaHeart size={20} className={`transition-transform duration-300 ${like ? "scale-110" : "scale-100"}`} />
        </div>
    )
}
export default LikePost