import { Metadata } from "next";
import { ReactNode } from "react";

interface PrayLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    title: "نور الهدى | التسبيح والذكر",
    description: "المسبحة الإلكترونية التفاعلية، ساعد نفسك على المداومة على ذكر الله وتسبيحه في كل وقت وحين.",
    openGraph: {
        title: "نور الهدى | التسبيح والذكر",
        description: "المسبحة الإلكترونية من منصة نور الهدى، اذكر الله يذكرك.",
        images: [
            {
                url: "/logo-share.png",
                width: 1200,
                height: 630,
            }
        ],
        locale: "ar_AR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "نور الهدى | التسبيح والذكر",
        description: "استخدم المسبحة الإلكترونية للمداومة على الذكر.",
        images: ["/logo-share.png"],
    }
}

export default function PrayLayout({ children }: PrayLayoutProps) {
    return (
        <>{children}</>
    )
}
