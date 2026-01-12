import { Metadata } from "next";
import { ReactNode } from "react";

interface SupportLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    title: "نور الهدى | دعم المنصة",
    description: "ساهم في دعم مشروع نور الهدى لنشر العلم النافع وتوعية الأمة الإسلامية. دعمك يساعدنا على الاستمرار والتطوير.",
    openGraph: {
        title: "نور الهدى | دعم المنصة",
        description: "كن شريكاً في الأجر وساهم في تطوير منصة نور الهدى. دعمك يعني لنا الكثير.",
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
        title: "نور الهدى | دعم المنصة",
        description: "ساهم في دعم مشروع نور الهدى لنشر العلم النافع وتوعية الأمة الإسلامية.",
        images: ["/logo-share.png"],
    }
}

export default function SupportLayout({ children }: SupportLayoutProps) {
    return (
        <>{children}</>
    )
}
