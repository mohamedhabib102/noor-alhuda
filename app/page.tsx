"use client";
import {
  HeroSection,
  Quations,
  Services
} from "@/components/home";
import LandingHeader from "@/components/home/LandingHeader";
import News from "@/components/home/News";

export default function Home() {

  return (
    <main>
      <LandingHeader />
      <HeroSection />
      <News />
      <Services />
      <Quations state="home" />
    </main>
  );
}
