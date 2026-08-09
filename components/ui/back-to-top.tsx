"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <Button
        variant="default"
        size="icon"
        onClick={scrollToTop}
        className="rounded-none shadow-lg shadow-primary/20 hover:scale-110 transition-transform w-12 h-12"
      >
        <ArrowUp className="w-6 h-6" />
        <span className="sr-only">Back to top</span>
      </Button>
    </motion.div>
  );
}
