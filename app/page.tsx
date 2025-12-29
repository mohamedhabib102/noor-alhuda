"use client";
import {
  HeroSection,
  Quations,
  Services
} from "@/components/home";
import News from "@/components/home/News";

export default function Home() {

  return (
    <main>
      <HeroSection />
      <News />
      <Services />
      <Quations state="home" />
    </main>
  );
}
