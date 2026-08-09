"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 w-full z-50 flex justify-center pointer-events-none px-4"
    >
      <header className="pointer-events-auto border border-border/40 bg-background/60 backdrop-blur-md px-6 py-3 flex items-center justify-between gap-8 shadow-xl w-full max-w-7xl rounded-none transition-all duration-300">
        <div className="font-bold text-xl tracking-tight">@boyaghnia</div>
        <nav className="flex items-center gap-6">
          <a
            href="#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-1.5 transition-all rounded-none"
          >
            About
          </a>
          <a
            href="#experience"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-1.5 transition-all rounded-none hidden md:inline-block"
          >
            Experience
          </a>
          <a
            href="#certificates"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-1.5 transition-all rounded-none hidden lg:inline-block"
          >
            Certificates
          </a>
          <a
            href="#projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-1.5 transition-all rounded-none"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-1.5 transition-all rounded-none"
          >
            Contact
          </a>
          <div className="w-px h-6 bg-border/50 mx-2"></div>
          <ThemeToggle />
        </nav>
      </header>
    </motion.div>
  );
}
