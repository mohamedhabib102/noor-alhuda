import { Metadata } from "next";
import { ReactNode } from "react";

interface AdhkarLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    title: "نور الهدى | الأذكار",
    description: "حافظ على ذكر الله مع أذكار الصباح والمساء وأذكار المسلم اليومية بطريقة تفاعلية ومريحة.",
    openGraph: {
        title: "نور الهدى | الأذكار",
        description: "أذكار الصباح والمساء وأذكار المسلم اليومية.",
        images: [
            {
                url: "/images/default.png",
                width: 1200,
                height: 630,
            }
        ],
        locale: "ar_AR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "نور الهدى | الأذكار",
        description: "أذكار الصباح والمساء وأذكار المسلم اليومية.",
        images: ["/images/default.png"],
    }
}

export default function AdhkarLayout({ children }: AdhkarLayoutProps) {
    return (
        <>{children}</>
    )
}
