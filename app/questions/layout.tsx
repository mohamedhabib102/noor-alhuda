import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "الأسئلة الشائعة | نور الهدى",
    description: "اعثر على إجابات لاستفساراتك الدينية والشرعية في قسم الأسئلة الشائعة. تصفح الأسئلة المطروحة أو شارك بسؤالك.",
    openGraph: {
        title: "الأسئلة الشائعة | نور الهدى",
        description: "اعثر على إجابات لاستفساراتك الدينية والشرعية في قسم الأسئلة الشائعة.",
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
        title: "الأسئلة الشائعة | نور الهدى",
        description: "اعثر على إجابات لاستفساراتك الدينية والشرعية في قسم الأسئلة الشائعة.",
        images: ["/images/default.png"],
    }
};

export default function QuestionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
