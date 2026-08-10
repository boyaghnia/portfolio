"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { ImageUpscaleIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Certificates", href: "/#certificates" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false);
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
      className="fixed top-6 w-full z-50 flex flex-col items-center pointer-events-none px-4"
    >
      <header className="pointer-events-auto border border-border/40 bg-background/60 backdrop-blur-md px-6 py-3 flex items-center justify-between gap-8 shadow-xl w-full max-w-7xl rounded-none transition-all duration-300">
        <Link
          href="/"
          className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          @boyaghnia
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-1.5 transition-all rounded-none"
            >
              {item.name}
            </Link>
          ))}
          <div className="w-px h-6 bg-border/50 mx-2"></div>
          <ThemeToggle />
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-none text-foreground"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto w-full max-w-7xl mt-2 border border-border/40 bg-background/90 backdrop-blur-md p-4 shadow-xl rounded-none flex flex-col gap-1 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-4 py-2.5 transition-all rounded-none"
              >
                {item.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
