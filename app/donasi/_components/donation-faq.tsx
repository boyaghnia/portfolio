"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DONATION_FAQS } from "@/data/donation";

export function DonationFaq() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-8 sm:my-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-border/40 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-3">
        {DONATION_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="border border-border/60 bg-card/40 backdrop-blur-md rounded-none overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-sm sm:text-base text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/20 mt-1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Guestbook CTA banner */}
      <div className="mt-8 p-6 border border-primary/30 bg-primary/5 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
            <MessageSquareHeart className="w-4 h-4 text-primary" />
            Tinggalkan Pesan di Buku Tamu!
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xl">
            Setelah memberikan dukungan (Buy Me a Coffee) atau membaca tutorial, Anda bisa meninggalkan
            pesan semangat atau feedback hangat di halaman Buku Tamu website
            ini.
          </p>
        </div>

        <Link href="/guest-book" className="shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="rounded-none font-mono text-xs border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
          >
            Buka Buku Tamu
          </Button>
        </Link>
      </div>
    </section>
  );
}
