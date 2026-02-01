import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "القرآن الكريم | نور الهدى",
    description: "اقرأ واستمع إلى القرآن الكريم كاملاً. تصفح السور والآيات بسهولة ويسر مع تفسير ميسر.",
    openGraph: {
        title: "القرآن الكريم | نور الهدى",
        description: "اقرأ واستمع إلى القرآن الكريم كاملاً. تصفح السور والآيات بسهولة ويسر.",
        images: [
            {
                url: "/images/default.png",
                width: 1200,
                height: 630,
            }
        ],
        type: "website",
        locale: "ar_AR",
    },
    twitter: {
        card: "summary_large_image",
        title: "القرآن الكريم | نور الهدى",
        description: "اقرأ واستمع إلى القرآن الكريم كاملاً. تصفح السور والآيات بسهولة ويسر.",
        images: ["/images/default.png"],
    }
};

export default function QuranLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
