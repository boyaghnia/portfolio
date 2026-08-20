"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

import { SideRays } from "@/components/animations/side-rays";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

import { BADE_SLIDES } from "./_components/bade-slides";
import { BadeLightbox } from "./_components/bade-lightbox";

export default function ProjectBade() {
  const [currentSection, setCurrentSection] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const openLightbox = (src: string) => setSelectedImage(src);
  const closeLightbox = () => setSelectedImage(null);

  // Keyboard navigation & Lightbox close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
      if (!selectedImage) {
        if (e.key === "ArrowDown") {
          setCurrentSection((prev) =>
            Math.min(prev + 1, BADE_SLIDES.length - 1),
          );
        } else if (e.key === "ArrowUp") {
          setCurrentSection((prev) => Math.max(prev - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // Wheel event for scrolling
  React.useEffect(() => {
    let lastTime = 0;
    const delay = 800; // debounce time

    const handleWheel = (e: WheelEvent) => {
      if (selectedImage) return;

      const now = new Date().getTime();
      if (now - lastTime < delay) return;

      if (e.deltaY > 0) {
        setCurrentSection((prev) =>
          Math.min(prev + 1, BADE_SLIDES.length - 1),
        );
        lastTime = now;
      } else if (e.deltaY < 0) {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
        lastTime = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [selectedImage]);

  return (
    <div className="fixed inset-0 w-full h-full bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Background Rays */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-60 dark:opacity-40 pointer-events-none">
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

      {/* Sections Wrapper */}
      <div className="relative w-full h-full z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pt-20 pb-10"
          >
            {BADE_SLIDES[currentSection].content(openLightbox)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons (Floating Right) */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 0))}
          className={`rounded-none bg-background/50 backdrop-blur border-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 ${
            currentSection === 0 ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSection((prev) =>
              Math.min(prev + 1, BADE_SLIDES.length - 1),
            )
          }
          className={`rounded-none bg-background/50 backdrop-blur border-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 ${
            currentSection === BADE_SLIDES.length - 1
              ? "opacity-0 invisible"
              : "opacity-100 visible"
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>

      {/* Lightbox Overlay */}
      <BadeLightbox selectedImage={selectedImage} onClose={closeLightbox} />
    </div>
  );
}
