"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Globe, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanyardComponent } from "@/components/animations/lanyard";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      className="py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Lanyard on the Left */}
        <motion.div
          variants={FADE_IN}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="w-full max-w-100 h-125 relative">
            <LanyardComponent position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </motion.div>

        {/* Contact Info on the Right */}
        <motion.div
          variants={FADE_IN}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Saya sangat antusias untuk berkontribusi pada proyek-proyek kreatif
            yang menantang dan memotivasi di lingkungan kerja yang dinamis. Mari
            kita berkolaborasi untuk menciptakan karya-karya yang menginspirasi
            dan meninggalkan kesan mendalam.
          </p>
          <a href="mailto:boyagnia@gmail.com">
            <Button
              size="lg"
              className="rounded-none h-14 px-8 text-lg mb-16 shadow-lg shadow-primary/20"
            >
              <Mail className="mr-2 w-5 h-5" /> Say Hello
            </Button>
          </a>
          <div className="flex justify-center lg:justify-start gap-6">
            <a
              href="https://instagram.com/boyaghnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:-translate-y-1 transition-all"
            >
              <Globe className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://linkedin.com/in/boyaghnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:-translate-y-1 transition-all"
            >
              <User className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://github.com/boyaghnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:-translate-y-1 transition-all"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
