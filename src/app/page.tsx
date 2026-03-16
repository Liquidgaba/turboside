"use client";

import Hero from "@/components/Hero";
import BilerSection from "@/components/BilerSection";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BilerSection />
      <HowItWorks />
      <TrustSection />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
