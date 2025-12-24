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
    switch(action.type){
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
            like ? dispatch({ type: "decrement" }) : dispatch({ type: "increment" })
            setLike(!like)
        }}

        className="select-none flex items-center justify-center bg-gray-300 dark:bg-black/20 p-2.5 rounded-lg gap-2 w-[30%] text-red-500 cursor-pointer">
            <span>{count}</span>
            <FaHeart size={23} />
        </div>
    )
}
export default LikePost