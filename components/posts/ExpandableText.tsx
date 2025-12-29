"use client";
import { useState } from "react";

const ExpandableText: React.FC<{ text: string; maxLength?: number }> = ({ text, maxLength = 150 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return null;
    if (text.length <= maxLength) {
        return <p className="mt-2 text-lg dark:text-gray-200 mb-2">{text}</p>;
    }

    return (
        <div className="mt-2 mb-2">
            <p className="text-lg dark:text-gray-200 inline">
                {isExpanded ? text : `${text.slice(0, maxLength)}...`}
            </p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
                className="text-(--main-bg) font-bold mr-1 cursor-pointer hover:underline text-sm"
            >
                {isExpanded ? "عرض أقل" : "عرض المزيد"}
            </button>
        </div>
    );
};export default ExpandableText