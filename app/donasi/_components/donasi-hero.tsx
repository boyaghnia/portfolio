"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DonasiHero() {
  return (
    <div className="relative pt-12 sm:pt-16 flex flex-col items-center text-center">
      {/* Back button */}
      <div className="w-full max-w-5xl flex justify-start mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="group inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-none border border-transparent hover:border-border/40 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>

      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-32 bg-primary/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Badge
          variant="outline"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-none bg-primary/10 text-primary border-primary/30 uppercase tracking-widest mb-4 shadow-sm"
        >
          <Heart className="w-3.5 h-3.5 fill-primary/30 text-primary animate-pulse" />
          Dukungan & Donasi
        </Badge>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl leading-[1.15]"
      >
        Dukung Pengembangan <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-amber-400 to-yellow-200">
          Website, Domain .com & VPS
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
      >
        Donasi yang terkumpul akan dialokasikan untuk{" "}
        <strong className="text-foreground font-semibold">
          pengembangan fitur website
        </strong>
        , biaya sewa server VPS cloud, serta rencana pembelian domain utama{" "}
        <code className="px-1.5 py-0.5 rounded-none bg-muted font-mono text-xs text-primary border border-border/40">
          .com
        </code>{" "}
        (karena saat ini masih menggunakan domain{" "}
        <code className="px-1.5 py-0.5 rounded-none bg-muted font-mono text-xs text-primary border border-border/40">
          boyaghnia.web.id
        </code>
        ) agar seluruh artikel tutorial, showcase proyek, dan eksperimen web
        interaktif dapat terus beroperasi dan berkembang dengan optimal.
      </motion.p>
    </div>
  );
}
