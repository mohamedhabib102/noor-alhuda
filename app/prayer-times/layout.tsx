import { Metadata } from "next";
import { ReactNode } from "react";

interface PrayerTimesLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    title: "نور الهدى | مواقيت الصلاة والتقويم",
    description: "تابع مواقيت الصلاة بدقة لموقعك الحالي، مع عرض التاريخ الهجري والميلادي والعد التنازلي للصلاة القادمة.",
    openGraph: {
        title: "نور الهدى | مواقيت الصلاة والتقويم",
        description: "مواقيت الصلاة، التاريخ الهجري والميلادي، والقبلة في مكان واحد.",
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
        title: "نور الهدى | مواقيت الصلاة والتقويم",
        description: "تابع مواقيت الصلاة بدقة مع التاريخ الهجري والميلادي.",
        images: ["/images/default.png"],
    }
}

export default function PrayerTimesLayout({ children }: PrayerTimesLayoutProps) {
    return (
        <>{children}</>
    )
}
