"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoLoop from "@/components/animations/logo-loop";
import PixelTransition from "@/components/animations/pixel-transition";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiPhp,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiMikrotik,
} from "react-icons/si";
import { FaWindows } from "react-icons/fa";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";
import { PenTool, AppWindow } from "lucide-react";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const techLogos = [
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiLaravel className="text-[#FF2D20] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Laravel</span>
      </div>
    ),
    title: "Laravel",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiNextdotjs className="text-foreground w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Next JS</span>
      </div>
    ),
    title: "Next JS",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiReact className="text-[#61DAFB] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">React</span>
      </div>
    ),
    title: "React",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiPhp className="text-[#777BB4] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">PHP</span>
      </div>
    ),
    title: "PHP",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiTypescript className="text-[#3178C6] w-5 h-5 shrink-0" />{" "}
        <span className="font-semibold text-sm">TypeScript</span>
      </div>
    ),
    title: "TypeScript",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiJavascript className="text-[#F7DF1E] w-5 h-5 shrink-0" />{" "}
        <span className="font-semibold text-sm">JavaScript</span>
      </div>
    ),
    title: "JavaScript",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiTailwindcss className="text-[#06B6D4] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Tailwind CSS</span>
      </div>
    ),
    title: "Tailwind CSS",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiMysql className="text-[#4479A1] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">MySQL</span>
      </div>
    ),
    title: "MySQL",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Affinity_%28App%29_Logo.svg/960px-Affinity_%28App%29_Logo.svg.png"
          alt="Affinity Designer"
          className="w-5! h-5! shrink-0 object-contain"
        />{" "}
        <span className="font-semibold text-sm">Affinity Designer</span>
      </div>
    ),
    title: "Affinity Designer",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <DiPhotoshop className="text-[#31A8FF] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Photoshop</span>
      </div>
    ),
    title: "Photoshop",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <DiIllustrator className="text-[#FF9A00] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Illustrator</span>
      </div>
    ),
    title: "Illustrator",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiMikrotik className="text-foreground w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Mikrotik</span>
      </div>
    ),
    title: "Mikrotik",
  },
];

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
                logos={techLogos}
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
