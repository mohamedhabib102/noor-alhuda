import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Rakkas } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { ContextProviderWrapper as AuthProvider } from "@/lib/contextapi";
import { ContextProviderWrapper as RadioProvider } from "@/lib/radioContextapi";


const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  display: 'swap',
});

const rakkas = Rakkas({
  variable: "--font-rakkas",
  subsets: ["arabic", "latin"],
  weight: ["400"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noor-alhuda-lyart.vercel.app/"),
  title: "نور الهدى | رفيقك في رحلة الإيمان",
  description:
    "منصة نور الهدى هي وجهتك الروحانية المتكاملة، حيث تجمع بين تلاوة القرآن الكريم، الأذكار اليومية، ومجتمع إسلامي متفاعل. نسعى لتعزيز صلتك بالله وتوفير بيئة هادئة تعينك على الطاعة والتفقه في الدين",
  keywords: [
    "نور الهدى",
    "Noor Al Huda",
    "القرآن الكريم",
    "The Holy Quran",
    "تلاوة القرآن",
    "Quran Recitation",
    "أذكار الصباح",
    "Morning Adhkar",
    "أذكار المساء",
    "Evening Adhkar",
    "حصن المسلم",
    "Muslim Fortress",
    "مواقيت الصلاة",
    "Prayer Times",
    "الأذان",
    "Adhan",
    "إذاعة القرآن الكريم",
    "Quran Radio",
    "بث مباشر للقرآن",
    "Live Quran Stream",
    "مجتمع إسلامي",
    "Islamic Community",
    "أسئلة دينية",
    "Religious Questions",
    "فتاوى",
    "Fatwas",
    "كتب إسلامية",
    "Islamic Books",
    "مكتبة إسلامية",
    "Islamic Library",
    "إسلام",
    "Islam",
    "دين",
    "Religion",
    "تقويم هجري",
    "Hijri Calendar"
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
        url: "/images/default.png",
        width: 1200,
        height: 630,
        alt: "شعار نور الهدى",
      },
    ],
  },


  twitter: {
    card: "summary_large_image",
    title: "نور الهدى | رفيقك في رحلة الإيمان",
    description:
      "اكتشف السكينة مع منصة نور الهدى. قرآن، أذكار، ومجتمع إسلامي يجمعنا على الطاعة.",
    images: ["/images/default.png"],
  },

  icons: {
    icon: "/logo.svg",
    shortcut: "/images/logo-share.png",
    apple: "/images/default.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexSansArabic.variable} ${rakkas.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`antialiased`}>
        <AuthProvider>
          <RadioProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </RadioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
