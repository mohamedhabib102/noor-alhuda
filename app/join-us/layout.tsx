import { Metadata } from "next";
import { ReactNode } from "react";

interface JoinUsLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    title: "نور الهدى | انضم إلينا",
    description: "انضم إلى مجتمع نور الهدى، أنشئ حسابك الآن وابدأ رحلتك في تعلم ونشر آداب الإسلام وتواصل مع إخوانك في العقيدة.",
    openGraph: {
        title: "نور الهدى | انضم إلينا",
        description: "كن جزءاً من مجتمعنا الإسلامي، سجل الآن في منصة نور الهدى.",
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
        title: "نور الهدى | انضم إلينا",
        description: "انضم إلى مجتمع نور الهدى، أنشئ حسابك الآن.",
        images: ["/logo-share.png"],
    }
}

export default function JoinUsLayout({ children }: JoinUsLayoutProps) {
    return (
        <>{children}</>
    )
}
