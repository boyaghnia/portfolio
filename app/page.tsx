"use client";

import * as React from "react";
import { SideRays } from "@/components/animations/side-rays";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { CertificatesSection } from "@/components/sections/certificates-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-60 dark:opacity-40 pointer-events-none">
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      </div>

      <Navbar />

      <main className="container mx-auto px-4 pb-16 max-w-7xl relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <CertificatesSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
