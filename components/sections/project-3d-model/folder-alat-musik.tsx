"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { LightboxMedia } from "./types";

interface FolderAlatMusikProps {
  onOpenLightbox: (media: LightboxMedia) => void;
}

export function FolderAlatMusik({ onOpenLightbox }: FolderAlatMusikProps) {
  return (
    <motion.div
      key="folder-alat-musik"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="space-y-12"
    >
      {/* Folder Header */}
      <div className="p-6 sm:p-8 bg-card/60 border border-border/60 backdrop-blur-md">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          Alat Musik Tradisional Sunda
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-4xl">
          Koleksi pemodelan 3D instrumen musik tradisional Sunda mencakup{" "}
          <strong>Kacapi Indung</strong>, <strong>Tarawangsa</strong>, dan{" "}
          <strong>Bonang Gamelan Sunda</strong>. Dibuat dengan memperhatikan
          proporsi bentuk fisik asli, konstruksi kayu, inang (piramid penyangga
          senar), serta refleksi material dawai kawat untuk keperluan
          dokumentasi digital dan pelestarian seni tradisi Jawa Barat.
        </p>
      </div>

      {/* Sub-Showcase: Kacapi Sunda Multi-Angle */}
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight">
            1. Pemodelan 3D Kacapi Sunda
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Visualisasi Kacapi dari sudut perspektif, tampak atas (top view tata
            letak dawai), dan render studio resolusi tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kacapi 1 */}
          <div
            onClick={() =>
              onOpenLightbox({
                title: "3D Model Kacapi Sunda (Perspektif)",
                category: "Alat Musik Sunda",
                type: "image",
                src: "/images/projects/3d-model/Alat Musik Sunda/kacapi.webp",
                desc: "Pemodelan 3D instrumen Kacapi Sunda dengan dawai kawat, inang piramid penyangga, dan rongga resonansi kayu.",
              })
            }
            className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
              <Image
                src={encodeURI(
                  "/images/projects/3d-model/Alat Musik Sunda/kacapi.webp",
                )}
                alt="3D Model Kacapi Sunda (Perspektif)"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </span>
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Kacapi Sunda (Perspektif)
              </h5>
              <p className="text-xs text-muted-foreground mt-1">
                Tampak samping perspektif menampakkan kelengkungan badan
                resonator dan pureut.
              </p>
            </div>
          </div>

          {/* Kacapi 2 */}
          <div
            onClick={() =>
              onOpenLightbox({
                title: "3D Model Kacapi Sunda (Top View)",
                category: "Alat Musik Sunda",
                type: "image",
                src: "/images/projects/3d-model/Alat Musik Sunda/kacapi2.webp",
                desc: "Tampak atas susunan dawai dan penala (pureut) instrumen Kacapi Sunda.",
              })
            }
            className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
              <Image
                src={encodeURI(
                  "/images/projects/3d-model/Alat Musik Sunda/kacapi2.webp",
                )}
                alt="3D Model Kacapi Sunda (Top View)"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </span>
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Kacapi Sunda (Top View)
              </h5>
              <p className="text-xs text-muted-foreground mt-1">
                Tampak atas memperlihatkan konfigurasi jarak antardawai dan
                penala baut putar.
              </p>
            </div>
          </div>

          {/* Kacapi 3 */}
          <div
            onClick={() =>
              onOpenLightbox({
                title: "Render Kacapi Sunda Studio Lighting",
                category: "Alat Musik Sunda",
                type: "image",
                src: "/images/projects/3d-model/Alat Musik Sunda/kacapi3.webp",
                desc: "Render studio resolusi tinggi menonjolkan pantulan cahaya pada dawai dan serat kayu alami.",
              })
            }
            className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
              <Image
                src={encodeURI(
                  "/images/projects/3d-model/Alat Musik Sunda/kacapi3.webp",
                )}
                alt="Render Kacapi Sunda Studio Lighting"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </span>
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Kacapi Sunda (Studio Render)
              </h5>
              <p className="text-xs text-muted-foreground mt-1">
                Pencahayaan studio dengan bayangan lembut dan kedalaman bidang
                optik.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Showcase: Tarawangsa & Bonang */}
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight">
            2. Tarawangsa, Bonang Gamelan & Render Gabungan
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Instrumen gesek Tarawangsa, pencon bonang logam perunggu, dan hasil
            render gabungan Tarawangsa + Jentreng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarawangsa */}
          <div
            onClick={() =>
              onOpenLightbox({
                title: "3D Model Instrumen Tarawangsa",
                category: "Alat Musik Sunda",
                type: "image",
                src: "/images/projects/3d-model/Alat Musik Sunda/TARAWANGSA.webp",
                desc: "Model 3D Tarawangsa, alat musik gesek tradisional Sunda dengan dua dawai dan resonator kayu ramping.",
              })
            }
            className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
              <Image
                src={encodeURI(
                  "/images/projects/3d-model/Alat Musik Sunda/TARAWANGSA.webp",
                )}
                alt="3D Model Instrumen Tarawangsa"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </span>
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Instrumen Tarawangsa
              </h5>
              <p className="text-xs text-muted-foreground mt-1">
                Model 3D utuh Tarawangsa dengan leher panjang dan dua dawai
                nada.
              </p>
            </div>
          </div>

          {/* Bonang */}
          <div
            onClick={() =>
              onOpenLightbox({
                title: "3D Model Bonang Gamelan Sunda",
                category: "Alat Musik Sunda",
                type: "image",
                src: "/images/projects/3d-model/Alat Musik Sunda/bonang.webp",
                desc: "Pencon bonang gamelan Sunda berbahan logam perunggu/kuningan dengan tatakan kayu berukir.",
              })
            }
            className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
              <Image
                src={encodeURI(
                  "/images/projects/3d-model/Alat Musik Sunda/bonang.webp",
                )}
                alt="3D Model Bonang Gamelan Sunda"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </span>
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Bonang Gamelan Sunda
              </h5>
              <p className="text-xs text-muted-foreground mt-1">
                Pencon logam berpencon bulat dengan tekstur refleksi logam
                kuningan.
              </p>
            </div>
          </div>

          {/* Page 6 */}
          <div
            onClick={() =>
              onOpenLightbox({
                title: "Render Alat Musik Tarawangsa + Jentreng",
                category: "Alat Musik Sunda",
                type: "image",
                src: "/images/projects/3d-model/Alat Musik Sunda/Page 6.webp",
                desc: "Hasil Render Ansambel Alat Musik Tradisional Tarawangsa + Jentreng menggunakan Blender Cycles.",
              })
            }
            className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
              <Image
                src={encodeURI(
                  "/images/projects/3d-model/Alat Musik Sunda/Page 6.webp",
                )}
                alt="Render Tarawangsa + Jentreng"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </span>
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Render Tarawangsa + Jentreng
              </h5>
              <p className="text-xs text-muted-foreground mt-1">
                Hasil Render Alat Musik Tarawangsa + Jentreng menggunakan
                Cycles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
