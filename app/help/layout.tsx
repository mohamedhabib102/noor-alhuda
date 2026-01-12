import { Metadata } from "next";
import { ReactNode } from "react";

interface HelpLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    title: "نور الهدى | مركز المساعدة",
    description: "تعرف على رؤية منصة نور الهدى، أهدافنا، وقواعد المشاركة في مجتمعنا الإسلامي المتكاتف.",
    openGraph: {
        title: "نور الهدى | مركز المساعدة",
        description: "كل ما تحتاج معرفته عن منصة نور الهدى وقواعد المشاركة فيها.",
        images: [
            {
                url: "/logo-share.png",
                width: 1200,
                height: 630,
            }
        ],
        locale: "ar_AR",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "نور الهدى | مركز المساعدة",
        description: "تعرف على رؤية منصة نور الهدى وقواعد المشاركة فيها.",
        images: ["/logo-share.png"],
    }
}

export default function HelpLayout({ children }: HelpLayoutProps) {
    return (
        <>{children}</>
    )
}
