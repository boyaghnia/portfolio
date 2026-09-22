"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Menu, X, Heart, Coffee } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Certificates", href: "/#certificates" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
  { name: "Blog", href: "/blog" },
  { name: "Guestbook", href: "/guest-book" },
  { name: "Buy Me a Coffee", href: "/donasi" },
];

export function Navbar() {
  const pathname = usePathname();
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${targetId}`);
        }
      }
    }
  };

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
          className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity flex items-center gap-1.5"
        >
          <span>@boyaghnia</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {navItems.map((item) => {
            const isGuestbook = item.href === "/guest-book";
            const isBlog = item.href === "/blog";
            const isDonasi = item.href === "/donasi";
            const isActive =
              (isGuestbook && pathname === "/guest-book") ||
              (isBlog && pathname.startsWith("/blog")) ||
              (isDonasi && pathname === "/donasi");

            if (isDonasi) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  title="Buy Me a Coffee"
                  aria-label="Buy Me a Coffee"
                  className={`px-2.5 py-1.5 transition-all rounded-none flex items-center justify-center group ${
                    isActive
                      ? "text-rose-500 bg-rose-500/10 border-b-2 border-rose-500"
                      : "text-rose-500/75 hover:text-rose-500 hover:bg-rose-500/10"
                  }`}
                >
                  <Coffee
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive
                        ? "fill-rose-500 text-rose-500 scale-110"
                        : "fill-rose-500/25 text-rose-500 group-hover:fill-rose-500 group-hover:scale-115"
                    }`}
                  />
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium px-3 py-1.5 transition-all rounded-none flex items-center gap-1.5 ${
                  isActive
                    ? "text-primary font-semibold bg-primary/10 border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                } ${
                  isGuestbook || isBlog
                    ? "relative hover:text-primary transition-colors"
                    : ""
                }`}
              >
                {item.name}
                {isBlog && (
                  <span className="inline-flex items-center px-1.5 py-0.2 text-[10px] font-semibold uppercase tracking-wider rounded-sm bg-primary/15 text-primary">
                    New
                  </span>
                )}
              </Link>
            );
          })}
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
            {navItems.map((item) => {
              const isGuestbook = item.href === "/guest-book";
              const isBlog = item.href === "/blog";
              const isDonasi = item.href === "/donasi";
              const isActive =
                (isGuestbook && pathname === "/guest-book") ||
                (isBlog && pathname.startsWith("/blog")) ||
                (isDonasi && pathname === "/donasi");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-base font-medium px-4 py-2.5 transition-all rounded-none flex items-center justify-between ${
                    isActive
                      ? isDonasi
                        ? "text-rose-500 font-semibold bg-rose-500/10"
                        : "text-primary font-semibold bg-primary/10"
                      : isDonasi
                        ? "text-rose-500 hover:text-rose-400 hover:bg-rose-500/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isDonasi ? (
                      <>
                        <Heart
                          className={`w-4 h-4 ${
                            isActive
                              ? "text-rose-500 fill-rose-500"
                              : "text-rose-500 fill-rose-500/40"
                          }`}
                        />
                        <span>Buy Me a Coffee</span>
                      </>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </span>
                  {isBlog && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded bg-primary/20 text-primary">
                      New
                    </span>
                  )}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
