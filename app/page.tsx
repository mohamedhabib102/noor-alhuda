"use client";
import {
  HeroSection,
  Quations,
  Services
}
  from "@/components/home";
import { useAuth } from "@/lib/contextapi";
import { useEffect } from "react";

export default function Home() {
  const { userData } = useAuth();

  useEffect(() => {
    console.log(userData);
  }, []);

  return (
    <main>
      <HeroSection />
      <Services />
      <Quations state="home" />
    </main>
  );
}
