import type { Metadata } from "next";
import { Rubik, Rakkas } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import  { ContextProviderWrapper } from "@/lib/contextapi";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: 'swap',
});

const rakkas = Rakkas({
  variable: "--font-rakkas",
  subsets: ["arabic"],
  weight: "400",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noor-alhuda-lyart.vercel.app/"),
  title: "نور الهدى | رفيقك في رحلة الإيمان",
  description:
    "منصة نور الهدى هي وجهتك الروحانية المتكاملة، حيث تجمع بين تلاوة القرآن الكريم، الأذكار اليومية، ومجتمع إسلامي متفاعل. نسعى لتعزيز صلتك بالله وتوفير بيئة هادئة تعينك على الطاعة والتفقه في الدين",
  keywords: [
    "قرآن كريم",
    "أذكار",
    "إسلام",
    "نور الهدى",
    "تفسير",
    "أدعية",
    "مجتمع إسلامي",
    "أسئلة دينية",
  ],
  authors: [{ name: "فريق نور الهدى" }],

  openGraph: {
    title: "نور الهدى | رفيقك في رحلة الإيمان",
    description:
      "اكتشف السكينة مع منصة نور الهدى. قرآن، أذكار، ومجتمع إسلامي يجمعنا على الطاعة.",
    url: "https://noor-alhuda-lyart.vercel.app/",
    siteName: "نور الهدى",
    locale: "ar_AR",
    type: "website",
    images: [
      {
        url: "/logo-share.png",
        width: 600,
        height: 600,
        alt: "شعار نور الهدى",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "نور الهدى | رفيقك في رحلة الإيمان",
    description:
      "اكتشف السكينة مع منصة نور الهدى. قرآن، أذكار، ومجتمع إسلامي يجمعنا على الطاعة.",
    images: ["/logo-share.png"],
  },

  icons: {
    icon: "/logo-share.png",
    apple: "/logo-share.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${rubik.variable} ${rakkas.variable}`}>
      <body className={`antialiased`}>
        <ContextProviderWrapper>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        </ContextProviderWrapper>
      </body>
    </html>
  );
}
