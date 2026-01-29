"use client";
import Link from "next/link";
import { useState } from "react";

const ExpandableText: React.FC<{ text: string; maxLength?: number }> = ({ text, maxLength = 150 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return null;

    const renderTextWithLinks = (content: string) => {
        // Regex to find URLs, text in quotes, or Quran verse patterns [surah:ayah]
        const parts = content.split(/(https?:\/\/[^\s]+|"[^"]*"|\[\d+:\d+\])/g);

        return parts.map((part, index) => {
            if (part.startsWith('http')) {
                return (
                    <Link
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-main hover:underline font-medium break-all block w-fit mr-auto"
                        dir="ltr"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </Link>
                );
            }
            if (part.startsWith('"') && part.endsWith('"')) {
                return (
                    <span key={index} className="text-main font-bold italic">
                        {part.replace(/"/g, "")}
                    </span>
                );
            }
            if (part.startsWith('[') && part.endsWith(']')) {
                const [sura, ayah] = part.replace(/\[|\]/g, "").split(":");
                return (
                    <Link
                        key={index}
                        href={`/quran/${sura}#ayah-${ayah}`}
                        className="text-main font-bold mx-1"
                        onClick={(e) => e.stopPropagation()}
                        dir="ltr"
                    >
                        {part}
                    </Link>
                );
            }
            return part;
        });
    };

    const isLong = text.length > maxLength;
    const displayedContent = isExpanded ? text : `${text.slice(0, maxLength)}`;

    return (
        <div className="mt-2 mb-2">
            <p className="text-lg dark:text-gray-200 inline leading-relaxed">
                {renderTextWithLinks(displayedContent)}
                {!isExpanded && isLong && "..."}
            </p>
            {isLong && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                    className="text-main-bg dark:text-main font-bold mr-2 cursor-pointer hover:underline text-sm inline-block"
                >
                    {isExpanded ? "عرض أقل" : "عرض المزيد"}
                </button>
            )}
        </div>
    );
};

export default ExpandableText;