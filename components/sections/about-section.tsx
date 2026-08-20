"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoLoop from "@/components/animations/logo-loop";
import PixelTransition from "@/components/animations/pixel-transition";
import { PenTool, AppWindow } from "lucide-react";
import { TECH_LOGOS } from "@/data/skills";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="pt-12 scroll-mt-14"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div
        variants={FADE_IN}
        className="flex flex-col md:flex-row gap-12 items-center"
      >
        <motion.div variants={FADE_IN} className="relative group shrink-0">
          <div className="relative w-64 h-72 md:w-80 md:h-100 overflow-hidden shadow-xl rounded-sm">
            <PixelTransition
              firstContent={
                <Image
                  src="/images/profile/pas-foto.jpg"
                  alt="Boy Aghnia Rifadhan"
                  fill
                  className="object-cover rounded-sm"
                  priority
                />
              }
              secondContent={
                <div className="w-full h-full rounded-sm">
                  <Image
                    src="/images/profile/katewak.png"
                    alt="Katewak"
                    fill
                    className="object-contain rounded-sm bg-white"
                    priority
                  />
                  {/* <p className="font-bold text-2xl text-white">
                    Front-End Developer
                  </p>
                  <p className="text-sm text-zinc-400 mt-2">UI/UX Designer</p> */}
                </div>
              }
              gridSize={12}
              pixelColor="#ffffff"
              animationStepDuration={0.4}
              aspectRatio="0"
              className="w-full h-full"
            />
          </div>
        </motion.div>
        <div className="flex-1 space-y-6 min-w-0 w-full">
          <h2 className="text-3xl font-bold tracking-tight mb-2">About Me</h2>
          <p className="text-md text-muted-foreground leading-relaxed mb-2">
            Halo, nama saya Boy Aghnia Rifadhan. Saya adalah seorang Pegawai
            Negeri Sipil (PNS) aktif di Kementerian Perhubungan dan saat ini
            menjabat sebagai Front-End Developer, UI/UX Designer dan Graphic
            Designer di Bagian Organisasi dan Tata Laksana Sekretariat
            Direktorat Jenderal Perhubungan Udara, Jakarta Pusat.
          </p>
          <p className="text-md text-muted-foreground leading-relaxed">
            Saya juga seorang profesional yang berpengalaman dalam Web
            Development dan memiliki ketertarikan dalam bidang Network
            Management serta Graphic Design. Beberapa proyek yang telah saya
            kerjakan mencakup tiga bidang utama ini, Saya percaya bahwa
            penguasaan multidisiplin sangat penting dalam mendukung tugas dan
            tanggung jawab saya, dan saya selalu berusaha untuk terus
            mengembangkan keterampilan saya guna memberikan kontribusi yang
            maksimal dalam tugas yang saya laksanakan.
          </p>
          <motion.div variants={FADE_IN} className="mt-2">
            <h3 className="font-semibold mb-6 text-left text-sm">
              Teknologi yang saya gunakan:
            </h3>
            <div className="w-full relative h-15 overflow-hidden">
              <LogoLoop
                logos={TECH_LOGOS}
                speed={50}
                direction="left"
                logoHeight={48}
                gap={20}
                hoverSpeed={0}
                fadeOut={true}
                ariaLabel="Teknologi yang digunakan"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
