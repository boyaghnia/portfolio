"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sliders, Maximize2 } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import type { LightboxMedia } from "./types";

interface FolderEtcProps {
  onOpenLightbox: (media: LightboxMedia) => void;
}

export function FolderEtc({ onOpenLightbox }: FolderEtcProps) {
  return (
    <motion.div
      key="folder-etc"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="space-y-12"
    >
      {/* Folder Header */}
      <div className="p-6 sm:p-8 bg-card/60 border border-border/60 backdrop-blur-md">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          Objek, Props Vintage & Eksperimen Shader
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-4xl">
          Koleksi eksperimen pemodelan objek 3D pendukung: mulai dari eksperimen{" "}
          <strong>Procedural Shader Nodes</strong> untuk menghasilkan motif
          loreng Teko Blirik/Cendol vintage tanpa image texture, perhiasan
          Sundanese &lsquo;The One&rsquo; Ring beraksara Sunda kuno, pemodelan 3D
          Kujang pusaka, hingga radio transistor retro.
        </p>
      </div>

      {/* Highlight: Teko Blirik Procedural Shader */}
      <div className="border border-border/60 bg-card/60 backdrop-blur-md p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div
            className="lg:col-span-6 relative aspect-4/3 w-full bg-black/40 overflow-hidden cursor-pointer group border border-border/60"
            onClick={() =>
              onOpenLightbox({
                title: "Teko Blirik / Teko Cendol (Procedural Shader Node)",
                category: "etc (Procedural Shader)",
                type: "image",
                src: "/images/projects/3d-model/etc/teko blirik.webp",
                desc: "Teko enamel klasik motif loreng blirik nusantara yang dibuat menggunakan procedural material nodes di Blender tanpa tekstur gambar eksternal.",
              })
            }
          >
            <Image
              src={encodeURI("/images/projects/3d-model/etc/teko blirik.webp")}
              alt="Teko Blirik Procedural Shader Node"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" /> Perbesar
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 text-amber-500 text-xs font-mono font-semibold">
              <Sliders className="w-3.5 h-3.5" /> Procedural Shader Node
            </div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
              Teko Blirik / Cendol Enamel Vintage
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Teko blirik merupakan teko seng enamel legendaris dengan motif
              bercak hijau-putih. Pada proyek ini, seluruh motif bercak loreng
              diolah secara matematis menggunakan{" "}
              <strong>Shader Nodes di Blender</strong> (menggabungkan Voronoi,
              Musgrave, dan Noise Texture) sehingga motif bersifat resolusi tak
              terbatas (*infinite procedural detail*).
            </p>
            <div className="pt-2">
              <a
                href="https://youtu.be/qLyR3ifmKUA?si=azRMR63B6rxtAHY5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 transition-colors"
              >
                <SiYoutube className="w-3.5 h-3.5" />
                <span>Tonton Video Shader Node di YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Other Props */}
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight">
            Props Retro, Cingcin Akik & Konsep Hunian Imahaku
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Koleksi perangkat radio retro, piring seng jadul, perhiasan cingcin
            akik, dan hunian tropis.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              file: "radio.webp",
              title: "Radio Lawas Vintage",
              desc: "Radio transistor retro analog.",
            },
            {
              file: "piring.webp",
              title: "Piring Seng Enamel",
              desc: "Piring seng lis klasik.",
            },
            {
              file: "cingcin.webp",
              title: "Sundanese 'The One' Ring",
              desc: "Cincin Emas bertuliskan 'beurang kapilis ku wengi, caang kapurug ku hujan' dalam aksara sunda kuna yang artinya 'tidak ada yang abadi'",
            },
            {
              file: "kujang5.webp",
              title: "Kujang 3D Wireframe & Mesh",
              desc: "Topologi 3D wireframe bilah berpamor senjata pusaka Kujang Sunda.",
            },
            {
              file: "kuriak.webp",
              title: "Rumah Model Badak Heuay",
              desc: "Model rumah Sunda tradisional dengan atap badak heuay.",
            },
            {
              file: "garmer.webp",
              title: "Gudang Garam Merah",
              desc: "Setup pencahayaan studio untuk rokok Gudang Garam Merah",
            },
          ].map((prop) => (
            <div
              key={prop.file}
              onClick={() =>
                onOpenLightbox({
                  title: prop.title,
                  category: "etc (Props & Objek)",
                  type: "image",
                  src: `/images/projects/3d-model/etc/${prop.file}`,
                  desc: prop.desc,
                })
              }
              className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                <Image
                  src={encodeURI(`/images/projects/3d-model/etc/${prop.file}`)}
                  alt={prop.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  loading="lazy"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <h6 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                  {prop.title}
                </h6>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                  {prop.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
