import { Metadata } from "next";
import { ReactNode } from "react";


interface ProfilLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
  title: "نور الهدى | حسابي",
  description: "صفحة حساب نور الهدى، حيث يمكنك إدارة بياناتك الشخصية، تحديث معلوماتك، ومتابعة نشاطك داخل الموقع بسهولة وأمان",
  openGraph: {
    title: "نور الهدى | حسابي",
    description: "صفحة حساب نور الهدى، يمكنك إدارة بياناتك الشخصية، تحديث معلوماتك، ومتابعة نشاطك داخل الموقع بسهولة وأمان",
    images: [
      {
        url: "/images/default.png",
        width: 1200,
        height: 630,
      }
    ],
    type: "article",
    locale: "ar_AR"
  },
  twitter: {
    card: "summary",
    title: "نور الهدى | حسابي",
    description: "صفحة حساب نور الهدى، حيث يمكنك إدارة بياناتك الشخصية، تحديث معلوماتك، ومتابعة نشاطك داخل الموقع بسهولة وأمان",
    images:  [
      {
        url: "/images/default.png",
        width: 1200,
        height: 630,
      }
    ]
  }
}


export default function ProfileLayout({children}: ProfilLayoutProps){
    return (
        <>{children}</>
    )
}
