"use client";
import {
  HeroSection,
  Quations,
  Services,
  AcademyCollaboration
} from "@/components/home";
import LandingHeader from "@/components/home/LandingHeader";
import News from "@/components/home/News";
import { supabaseConfig } from "@/lib/supabase";

export default function Home() {

  // console.log(supabaseConfig)
  return (
    <main>
      <LandingHeader />
      <HeroSection />
      <AcademyCollaboration />
      <News />
      <Services />
      <Quations state="home" />
    </main>
  );
}
