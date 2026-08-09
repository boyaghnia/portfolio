"use client";

import * as React from "react";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaGitlab,
} from "react-icons/fa";
import ShapeGrid from "@/components/animations/shape-grid";
import TextType from "@/components/animations/text-type";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function HeroSection() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center py-20"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <div
        className="absolute inset-y-0 left-1/2 right-1/2 w-screen ml-[-50vw] mr-[-50vw] z-[-1] opacity-40"
        style={{
          maskImage:
            "radial-gradient(circle at center, black 20%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 20%, transparent 60%)",
        }}
      >
        <ShapeGrid
          speed={0}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.1)"
          hoverFillColor="#222"
          shape="square"
          hoverTrailAmount={15}
        />
      </div>
      <div className="relative z-10">
        <motion.h1
          variants={FADE_IN}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          Hai, Saya <br />
          Boy Aghnia Rifadhan.
        </motion.h1>

        <motion.div variants={FADE_IN} className="mb-4 max-w-2xl min-h-18">
          <TextType
            text={[
              "Seorang Front-End Developer yang membangun aplikasi web modern, intuitif, dan responsif.",
              "Berpengalaman dalam Front-End Development, UI/UX Design, dan Graphic Design.",
              "Mengubah ide dan desain menjadi website yang interaktif, fungsional, dan terstruktur.",
            ]}
            typingSpeed={25}
            pauseDuration={2000}
            deletingSpeed={25}
            showCursor={true}
            cursorCharacter="|"
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
          />
        </motion.div>

        <motion.div variants={FADE_IN} className="flex gap-4 mb-8">
          <div className="border border-border/50 rounded-none p-4 w-48 bg-background/20 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
              Fokus
            </p>
            <p className="font-semibold text-sm">Front-End Developer</p>
          </div>
          <div className="border border-border/50 rounded-none p-4 w-48 bg-background/20 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
              Pengalaman
            </p>
            <p className="font-semibold text-sm">~3 Tahun</p>
          </div>
        </motion.div>

        <motion.div variants={FADE_IN} className="flex gap-4 mb-8">
          <a href="#projects">
            <Button
              size="lg"
              className="rounded-none shadow-lg hover:shadow-primary/25 transition-all"
            >
              Lihat Proyek
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="rounded-none">
              Lihat CV <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </motion.div>

        <motion.div
          variants={FADE_IN}
          className="flex gap-6 items-center text-muted-foreground"
        >
          <a
            href="mailto:boyaghnia@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/boyaghnia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/boyaghnia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            <FaGitlab className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            <FaYoutube className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com/boyaghnia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: isScrolled ? "none" : "auto" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-muted-foreground hover:text-primary transition-colors z-20"
        onClick={() => {
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
