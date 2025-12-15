"use client";
import {
  HeroSection,
  Quations,
  Services
} from "@/components/home";

export default function Home() {

  return (
    <main>
      <HeroSection />
      <Services />
      <Quations state="home" />
    </main>
  );
}
