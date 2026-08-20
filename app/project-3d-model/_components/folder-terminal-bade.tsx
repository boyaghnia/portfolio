"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plane, Building2, Maximize2 } from "lucide-react";
import type { LightboxMedia } from "./types";

interface FolderTerminalBadeProps {
  onOpenLightbox: (media: LightboxMedia) => void;
}

export function FolderTerminalBade({
  onOpenLightbox,
}: FolderTerminalBadeProps) {
  return (
    <motion.div
      key="folder-terminal-bade"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="space-y-12"
    >
      {/* Folder Header */}
      <div className="p-6 sm:p-8 bg-card/60 border border-border/60 backdrop-blur-md">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          Terminal Bandar Udara Bade
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-4xl">
          Perancangan dan visualisasi 3D arsitektur bangunan Terminal Bandar
          Udara Bade. Desain dikelompokkan menjadi dua zona operasional bandar
          udara utama: <strong>Air Side</strong> untuk Sisi Udara (pergerakan
          pesawat, apron, dan peron) serta <strong>Land Side</strong> untuk Sisi
          Darat (akses publik, drop-off, dan plaza lanskap).
        </p>
      </div>

      {/* Sub-Section 1: AIR SIDE */}
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4">
          <div className="flex items-center gap-2">
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Zona 1: Air Side — Sisi Udara
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Kawasan pergerakan pesawat udara, apron pelataran pesawat, pintu
            keberangkatan (boarding gate), dan kanopi selasar sisi landasan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              code: "2604 AS1.webp",
              label: "Air Side 1",
              desc: "Visualisasi tata letak apron dan boarding lounge menghadap landasan pacu.",
            },
            {
              code: "2604 AS2.webp",
              label: "Air Side 2",
              desc: "Perspektif gerbang keberangkatan penumpang menuju area parkir pesawat.",
            },
            {
              code: "2604 AS3.webp",
              label: "Air Side 3",
              desc: "Detail kanopi pelindung cuaca di peron penumpang sisi udara.",
            },
          ].map((as) => (
            <div
              key={as.code}
              onClick={() =>
                onOpenLightbox({
                  title: `Terminal Bandara Bade - ${as.label}`,
                  category: "Terminal Bandara Bade",
                  badge: "Air Side",
                  type: "image",
                  src: `/images/projects/3d-model/Terminal Bandara Bade/${as.code}`,
                  desc: as.desc,
                })
              }
              className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                <Image
                  src={encodeURI(
                    `/images/projects/3d-model/Terminal Bandara Bade/${as.code}`,
                  )}
                  alt={as.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-primary-foreground shadow-sm font-mono">
                    AIR SIDE
                  </span>
                </div>
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  {as.label}
                </h5>
                <p className="text-xs text-muted-foreground mt-1">{as.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-Section 2: LAND SIDE */}
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4">
          <div className="flex items-center gap-2">
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Zona 2: Land Side — Sisi Darat
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Kawasan akses publik penumpang, drop-off kendaraan, sirkulasi jalan
            utama, gerbang masuk terminal, dan plaza selasar pejalan kaki.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              code: "2604 LS1.webp",
              label: "Land Side 1",
              desc: "Area drop-off kendaraan roda empat dan selasar kedatangan penumpang.",
            },
            {
              code: "2604 LS2.webp",
              label: "Land Side 2",
              desc: "Plaza pejalan kaki, penataan vegetasi lanskap hijau, dan jalur pedestrian.",
            },
            {
              code: "2604 LS3.webp",
              label: "Land Side 3",
              desc: "Fasad depan utama gedung terminal dari sudut pandang jalan akses masuk.",
            },
          ].map((ls) => (
            <div
              key={ls.code}
              onClick={() =>
                onOpenLightbox({
                  title: `Terminal Bandara Bade - ${ls.label}`,
                  category: "Terminal Bandara Bade",
                  badge: "Land Side",
                  type: "image",
                  src: `/images/projects/3d-model/Terminal Bandara Bade/${ls.code}`,
                  desc: ls.desc,
                })
              }
              className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                <Image
                  src={encodeURI(
                    `/images/projects/3d-model/Terminal Bandara Bade/${ls.code}`,
                  )}
                  alt={ls.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-primary-foreground shadow-sm font-mono">
                    LAND SIDE
                  </span>
                </div>
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  {ls.label}
                </h5>
                <p className="text-xs text-muted-foreground mt-1">{ls.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-Section 3: PERSPEKTIF TERMINAL & SIMULASI PENCAHAYAAN */}
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight">
            Zona 3: Perspektif Fasad, Interior & Simulasi Pencahayaan
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Koleksi render interior check-in hall, boarding lounge kaca,
            simulasi bayangan matahari, dan master panorama kawasan.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            {
              file: "TERMINAL (1).webp",
              title: "Fasad Terminal 1",
              desc: "Tampak depan aerodinamis.",
            },
            {
              file: "TERMINAL (2).webp",
              title: "Selasar Terminal 2",
              desc: "Akses koridor drop-off.",
            },
            {
              file: "TERMINAL (3).webp",
              title: "Interior Check-in 3",
              desc: "Aula keberangkatan.",
            },
            {
              file: "TERMINAL (4).webp",
              title: "Boarding Gate 4",
              desc: "Kaca panorama apron.",
            },
            {
              file: "TERMINAL (5).webp",
              title: "Master Overview 5",
              desc: "Bird-eye view kawasan.",
            },
            {
              file: "11.webp",
              title: "Simulasi Matahari 11",
              desc: "Studi direct sunlight.",
            },
            {
              file: "22.webp",
              title: "Simulasi Bayangan 22",
              desc: "Refleksi kaca sore.",
            },
            {
              file: "33.webp",
              title: "Eye-Level View 33",
              desc: "Sudut pandang pejalan kaki.",
            },
            {
              file: "untitled.webp",
              title: "Master Render 1",
              desc: "Detail tekstur perkerasan.",
            },
            {
              file: "untitled2.webp",
              title: "Master Render 2",
              desc: "Panorama lansekap terpadu.",
            },
          ].map((item) => (
            <div
              key={item.file}
              onClick={() =>
                onOpenLightbox({
                  title: `Terminal Bandara Bade - ${item.title}`,
                  category: "Terminal Bandara Bade",
                  type: "image",
                  src: `/images/projects/3d-model/Terminal Bandara Bade/${item.file}`,
                  desc: item.desc,
                })
              }
              className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                <Image
                  src={encodeURI(
                    `/images/projects/3d-model/Terminal Bandara Bade/${item.file}`,
                  )}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <h6 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                  {item.title}
                </h6>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
