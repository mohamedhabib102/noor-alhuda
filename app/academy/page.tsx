import React from "react";
import { Metadata } from "next";
import AcademyClient from "@/components/academy/AcademyClient";

export const metadata: Metadata = {
  title: "نور الهدى بالتعاون مع أكاديمية يقين | تعلم القرآن والعلوم الشرعية",
  description: "منصة نور الهدى تقدم لكم بالتعاون مع أكاديمية يقين برامج تعليمية متميزة لتحفيظ القرآن الكريم، تعلم اللغة العربية، والعلوم الشرعية للأطفال والكبار بأحدث الأساليب.",
  openGraph: {
    title: "نور الهدى بالتعاون مع أكاديمية يقين",
    description: "رحلة تعليمية إيمانية متكاملة بالتعاون بين منصة نور الهدى وأكاديمية يقين لبناء جيل مرتبك بكتاب الله.",
    url: "https://noor-alhuda-lyart.vercel.app/academy",
    siteName: "نور الهدى",
    locale: "ar_AR",
    type: "website",
    images: [
      {
        url: "/images/default.png",
        width: 1200,
        height: 630,
        alt: "شعار نور الهدى",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نور الهدى بالتعاون مع أكاديمية يقين",
    description: "برامج تعليمية متميزة بالتعاون بين منصة نور الهدى وأكاديمية يقين.",
    images: ["/images/default.png"],
  },
};

const Page = () => {
  return <AcademyClient />;
};

export default Page;
