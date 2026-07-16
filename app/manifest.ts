import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "نور الهدى | رفيقك في رحلة الإيمان",
    short_name: "نور الهدى",
    description: "منصة نور الهدى هي وجهتك الروحانية المتكاملة، حيث تجمع بين تلاوة القرآن الكريم، الأذكار اليومية، ومجتمع إسلامي متفاعل. نسعى لتعزيز صلتك بالله وتوفير بيئة هادئة تعينك على الطاعة والتفقه في الدين",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      {
        src: "/images/logo-share-copy.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo-share-copy.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}