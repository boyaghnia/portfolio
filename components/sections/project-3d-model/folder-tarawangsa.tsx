"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  Maximize2,
  Cpu,
  Layers,
  Sliders,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LocalVideoCard } from "./local-video-card";
import type { LightboxMedia } from "./types";

interface FolderTarawangsaProps {
  onOpenLightbox: (media: LightboxMedia) => void;
}

export function FolderTarawangsa({ onOpenLightbox }: FolderTarawangsaProps) {
  return (
    <motion.div
      key="folder-organologi-tarawangsa"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="space-y-12"
    >
      {/* Folder Header */}
      <div className="p-6 sm:p-8 bg-card/60 border border-border/60 backdrop-blur-md">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          Visualisasi 3D Organologi Tarawangsa Sumedang
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-4xl">
          Rangkaian poster dan visualisasi 3D kajian organologi instrumen gesek
          kuno <strong>Tarawangsa</strong> khas Desa Rancakalong, Kabupaten
          Sumedang, Jawa Barat. Proyek ini memvisualisasikan data morfometrik,
          sejarah, penamaan bagian instrumen, hingga instrumen pengiringnya (
          <strong>Jentreng</strong>).
        </p>
      </div>

      <div className="p-6 sm:p-8 bg-card/60 border border-border/60 backdrop-blur-md">
        {/* Narrative Section */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
          <span>Latar Belakang & Filosofi Tarawangsa</span>
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          Tarawangsa merupakan salah satu alat musik gesek tradisional Sunda
          yang memiliki nilai sakral tinggi, terutama dalam upacara adat agraris{" "}
          <strong>Ngalaksa</strong> di Rancakalong, Sumedang. Menurut budayawan
          dan maestro Tarawangsa, nama <em>Tarawangsa</em> memiliki akronim
          filosofis mendalam:{" "}
          <em>
            &lsquo;Ta&rsquo;tabeuhan &lsquo;Ra&rsquo;kyat &lsquo;Wa&rsquo;li
            Salapan / nara&lsquo;wang&rsquo; ka Nu Maha E&rsquo;sa&rsquo;
          </em>
          .
        </p>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mt-3">
          Tarawangsa dimainkan dengan cara digesek pada dawai yang paling dekat
          kepada pemain, sedangkan dawai satunya dipetik dengan jari telunjuk
          tangan kiri. Dalam sebuah ensambel musik, Tarawangsa dimainkan bersama
          instrumen petik tujuh dawai yang menyerupai kecapi, yang disebut{" "}
          <strong>Jentreng</strong>.
        </p>
      </div>

      {/* Connected Document Pages (Page 1, 2, 3) */}
      <div className="space-y-12">
        {/* Page 1 */}
        <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
          <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-bold text-sm sm:text-base">
                01 — Pengantar, Sejarah & Filosofi Tarawangsa Sumedang
              </span>
            </div>
            <Badge variant="outline" className="rounded-none font-mono text-xs">
              Page 1.webp
            </Badge>
          </div>

          <div
            className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
            onClick={() =>
              onOpenLightbox({
                title: "Visualisasi 3D Organologi Tarawangsa Sumedang",
                category: "Organologi Tarawangsa",
                type: "image",
                src: "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 1.webp",
                desc: "Sejarah Tarawangsa di abad ke-10, naskah kuno Sewaka Darma, dokumentasi riset foto lapangan, dan model 3D Tarawangsa.",
              })
            }
          >
            <Image
              src={encodeURI(
                "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 1.webp",
              )}
              alt="Visualisasi 3D Organologi Tarawangsa Sumedang"
              fill
              sizes="(max-width: 1024px) 100vw, 90vw"
              loading="lazy"
              className="object-contain p-3"
            />
            <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg">
                <Maximize2 className="w-4 h-4" /> Buka Lembar Penuh (Resolusi
                Asli)
              </span>
            </div>
          </div>

          {/* Detailed Glossary of Content in Page 1 */}
          <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  TA-RA-WANG-SA
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Etimologi & Filosofi:
                  </strong>{" "}
                  Berasal dari ungkapan{" "}
                  <em>
                    &lsquo;Ta&rsquo;tabeuhan &lsquo;Ra&rsquo;kyat
                    &lsquo;Wa&rsquo;li Salapan / nara&lsquo;wang&rsquo; ka Nu
                    Maha E&rsquo;sa&rsquo;
                  </em>
                  —bermakna doa persembahan spiritual rasa syukur kepada Sang
                  Maha Pencipta atas kelimpahan panen padi (Dewi Sri).
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  SEJARAH ABAD KE-10
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Jejak Arkeologis:</strong>{" "}
                  Keberadaan alat musik gesek Tarawangsa diperkirakan telah
                  hidup sejak abad ke-10 Masehi, terbukti dari relief
                  candi-candi di Jawa serta tradisi agraris kuno masyarakat
                  Rancakalong Sumedang.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  NASKAH SEWAKA DARMA
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Sumber Tertulis:</strong>{" "}
                  Tercatat dalam naskah Sunda kuno abad ke-16{" "}
                  <em>Sewaka Darma</em> sebagai salah satu waditra utama pada
                  upacara sakral <em>Ngalaksa</em>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 */}
        <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
          <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-bold text-sm sm:text-base">
                02 — Bagian-bagian pada Tarawangsa (Blueprint & Anatomi Lengkap)
              </span>
            </div>
            <Badge variant="outline" className="rounded-none font-mono text-xs">
              Page 2.webp
            </Badge>
          </div>

          <div
            className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
            onClick={() =>
              onOpenLightbox({
                title: "Bagian-bagian pada Tarawangsa",
                category: "Organologi Tarawangsa",
                type: "image",
                src: "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 2.webp",
                desc: "Skematik tampak depan, samping, belakang, dan pangeset (busur) Tarawangsa model buatan Bapak Pupung Supena (Sanggar Seni Sunda Lugina).",
              })
            }
          >
            <Image
              src={encodeURI(
                "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 2.webp",
              )}
              alt="Bagian-bagian pada Tarawangsa"
              fill
              sizes="(max-width: 1024px) 100vw, 90vw"
              loading="lazy"
              className="object-contain p-3"
            />
            <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg">
                <Maximize2 className="w-4 h-4" /> Buka Lembar Penuh (Resolusi
                Asli)
              </span>
            </div>
          </div>

          {/* Detailed Glossary of All Directional Arrows in Page 2 */}
          <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  PUCUK
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Pucuk:</strong> Bagian
                  ujung mahkota berukir di atas tiang Tarawangsa yang memiliki
                  ornamen lengkungan khas tradisi Sumedang.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  PUREUT
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Pureut:</strong> Sepasang
                  pasak penala kayu kiri dan kanan di bagian atas tiang untuk
                  menyetel dan mengunci nada kedua dawai kawat.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  TIHANG
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Tihang:</strong>{" "}
                  Tiang/leher kayu vertikal panjang yang menjadi jalur rentangan
                  dawai dari pucuk menuju kotak resonator bawah.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  KAWAT
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Kawat:</strong> Dua helai
                  dawai kawat baja/besi: satu dawai utama di sisi dalam untuk
                  digesek dan satu dawai pengiring di sisi luar untuk dipetik.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  TAKTAK
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Taktak:</strong> Bahu /
                  bidang penutup atas kotak resonator (*parungpung*) yang
                  menghubungkan kotak dengan tiang (*tihang*).
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  PARUNGPUNG & RARAY
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Parungpung & Raray:
                  </strong>{" "}
                  Parungpung adalah wadah gema (resonator). Raray adalah papan
                  muka depan tempat inang bertumpu dan dawai bergetar.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  INANG
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Inang:</strong> Kuda-kuda
                  kecil penyangga dawai di atas permukaan raray yang menyalurkan
                  energi getaran dawai ke dalam kotak parungpung.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  BOBOKONG & UDEL
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Bobokong & Udel:</strong>{" "}
                  Bobokong adalah dinding belakang kotak resonator. Udel adalah
                  lubang suara bulat di tengah bobokong tempat keluarnya
                  resonansi akustik.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  SUKU
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Suku:</strong> Kaki-kaki
                  penyangga kayu di dasar bawah kotak resonator agar instrumen
                  dapat berdiri tegak dan stabil saat dimainkan.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60 col-span-1 md:col-span-2 lg:col-span-3">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  PANGESET (BUSUR PENGGESEK)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground pt-1">
                  <div>
                    <strong className="text-foreground">Congo:</strong> Ujung
                    atas tangkai busur penggesek yang melengkung.
                  </div>
                  <div>
                    <strong className="text-foreground">Rambut:</strong> Helai
                    serat ekor kuda/benang halus penggesek kawat dawai.
                  </div>
                  <div>
                    <strong className="text-foreground">Bagal:</strong> Pangkal
                    tangkai busur tempat tangan kanan pemain memegang.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] text-muted-foreground italic">
                *Model: Tarawangsa Sumedang buatan Bpk. Pupung Supena (Sanggar
                Seni Sunda Lugina)
              </span>
            </div>
          </div>
        </div>

        {/* Page 3 */}
        <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
          <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-bold text-sm sm:text-base">
                03 — Bagian-bagian pada Jentreng (Balungan Gending Tarawangsa)
              </span>
            </div>
            <Badge variant="outline" className="rounded-none font-mono text-xs">
              Page 3.webp
            </Badge>
          </div>

          <div
            className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
            onClick={() =>
              onOpenLightbox({
                title: "Bagian-bagian pada Jentreng",
                category: "Organologi Tarawangsa",
                type: "image",
                src: "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 3.webp",
                desc: "Instrumen petik 7 dawai Jentreng sebagai balungan/kerangka gending skala pentatonis pelog, madenda, dan salendro.",
              })
            }
          >
            <Image
              src={encodeURI(
                "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 3.webp",
              )}
              alt="Bagian-bagian pada Jentreng"
              fill
              sizes="(max-width: 1024px) 100vw, 90vw"
              loading="lazy"
              className="object-contain p-3"
            />
            <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg">
                <Maximize2 className="w-4 h-4" /> Buka Lembar Penuh (Resolusi
                Asli)
              </span>
            </div>
          </div>

          {/* Detailed Glossary of All Directional Arrows in Page 3 */}
          <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  JEN-TRÉNG
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Balungan Gending:</strong>{" "}
                  Instrumen petik 7 dawai pengiring Tarawangsa yang berfungsi
                  sebagai kerangka melodi (*balungan*) pada laras pentatonis
                  *pelog*, *madenda*, dan *salendro*.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  GELUNG & PONGPOK
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Gelung & Pongpok:</strong>{" "}
                  Gelung adalah lengkungan artistik di ujung atas/bawah. Pongpok
                  adalah bidang penutup ujung badan Jentreng.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  MATA ITIK & INANG
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Mata Itik & Inang:
                  </strong>{" "}
                  Mata Itik adalah lubang kaitan dawai di bagian atas raray.
                  Inang adalah kuda-kuda penyangga senar untuk mengatur
                  titinada.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  DADAMPAR & TUMPANG SARI
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Dadampar & Tumpang Sari:
                  </strong>{" "}
                  Dadampar adalah landasan pangkal dawai. Tumpang Sari adalah
                  penyangga tumpuan dawai sebelum kawat terhubung ke pasak
                  penala bawah.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  PUREUT (7 PASAK PENALA)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Pureut:</strong> Tujuh
                  pasak penala kayu di bagian bawah dadampar untuk menyetem
                  ketegangan masing-masing dari 7 kawat Jentreng.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  LIDAH / LELETAH & BOBOKONG
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Lidah/Leletah & Bobokong:
                  </strong>{" "}
                  Bobokong adalah dinding belakang badan Jentreng. Lidah/Leletah
                  adalah lubang resonansi memanjang di bobokong tempat pelepasan
                  suara gema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Walkthrough Section (Page 4, 5 & Specs Card) */}
      <div className="space-y-6 pt-4 border-t border-border/60">
        <div className="border-l-2 border-primary pl-4">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight">
            Video Animasi 3D & Walkthrough (MP4)
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Animasi pergerakan kamera sinematik detail instrumen Tarawangsa &
            Jentreng beserta spesifikasi teknisnya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video Card 1: Tarawangsa */}
          <LocalVideoCard
            title="Animasi Flythrough"
            badgeText="Tarawangsa"
            posterSrc="/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 4-poster.webp"
            videoSrc="/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 4.mp4"
            desc="Animasi camera flythrough 3D menelusuri kelengkungan badan, pangeset, dan leher instrumen Tarawangsa."
            onOpenLightbox={() =>
              onOpenLightbox({
                title: "3D Model Tarawangsa - Flythrough",
                category: "Visualisasi 3D Organologi Tarawangsa",
                badge: "PAGE | 4",
                type: "video",
                src: "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 4.mp4",
                desc: "Animasi camera flythrough 3D menelusuri kelengkungan badan, pangeset, dan leher instrumen Tarawangsa.",
              })
            }
          />

          {/* Video Card 2: Jentreng */}
          <LocalVideoCard
            title="Animasi Walkthrough"
            badgeText="Jentreng"
            posterSrc="/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 5-poster.webp"
            videoSrc="/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 5.mp4"
            desc="Animasi gerak kamera menelusuri 7 kawat dawai, dadampar, dan resonator Jentreng sebagai balungan gending Tarawangsa."
            onOpenLightbox={() =>
              onOpenLightbox({
                title: "3D Model Jentreng (Pupung Supena Style) - Walkthrough",
                category: "Visualisasi 3D Organologi Tarawangsa",
                badge: "PAGE | 5",
                type: "video",
                src: "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 5.mp4",
                desc: "Animasi gerak kamera menelusuri 7 kawat dawai, dadampar, dan resonator Jentreng sebagai balungan gending Tarawangsa.",
              })
            }
          />

          {/* Card 3: Technical Overview & OCR Text Documentation */}
          <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg flex flex-col justify-between">
            <div className="px-4 py-3 bg-muted/40 border-b border-border/60 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-primary" /> Parameter Teknis &
                Render
              </span>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
              {/* Header Intro */}
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-foreground">
                  Dokumentasi Topologi & Mesin Render
                </h5>
                <p className="text-muted-foreground leading-relaxed text-xs mt-1">
                  Rincian data teknis topologi 3D mesh dan pipeline rendering
                  Cycles:
                </p>
              </div>

              {/* Topology Comparison */}
              <div className="space-y-2 pt-2 border-t border-border/40">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-mono">
                  <Layers className="w-3 h-3 text-primary" /> Data Geometri 3D
                  Mesh
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2.5 bg-muted/20 border border-border/40 space-y-1">
                    <div className="font-bold text-primary text-[11px] pb-1 border-b border-border/40 truncate">
                      Tarawangsa
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[10px]">
                      <span>Vertices:</span>{" "}
                      <strong className="text-foreground">14.705</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[10px]">
                      <span>Edges:</span>{" "}
                      <strong className="text-foreground">25.990</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[10px]">
                      <span>Faces:</span>{" "}
                      <strong className="text-foreground">11.419</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[10px]">
                      <span>Triangles:</span>{" "}
                      <strong className="text-foreground">27.950</strong>
                    </div>
                  </div>

                  <div className="p-2.5 bg-muted/20 border border-border/40 space-y-1">
                    <div className="font-bold text-primary text-[11px] pb-1 border-b border-border/40 truncate">
                      Jentreng
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[10px]">
                      <span>Vertices:</span>{" "}
                      <strong className="text-foreground">12.294</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[10px]">
                      <span>Edges:</span>{" "}
                      <strong className="text-foreground">23.539</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[10px]">
                      <span>Faces:</span>{" "}
                      <strong className="text-foreground">11.294</strong>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[10px]">
                      <span>Triangles:</span>{" "}
                      <strong className="text-foreground">24.354</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rendering Configuration */}
              <div className="space-y-2 pt-2 border-t border-border/40">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-mono">
                  <Sliders className="w-3 h-3 text-primary" /> Pengaturan Render
                  Cycles
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="p-2 bg-background/50 border border-border/40">
                    <span className="text-muted-foreground block text-[9px]">
                      Engine & Sampling
                    </span>
                    <strong className="text-foreground font-mono">
                      Cycles 32 Samples
                    </strong>
                  </div>
                  <div className="p-2 bg-background/50 border border-border/40">
                    <span className="text-muted-foreground block text-[9px]">
                      Framerate & Total
                    </span>
                    <strong className="text-foreground font-mono">
                      150 Frames (30 FPS)
                    </strong>
                  </div>
                  <div className="p-2 bg-background/50 border border-border/40">
                    <span className="text-muted-foreground block text-[9px]">
                      Denoise & Threshold
                    </span>
                    <strong className="text-foreground font-mono">
                      0.1 + Denoiser
                    </strong>
                  </div>
                  <div className="p-2 bg-background/50 border border-border/40">
                    <span className="text-muted-foreground block text-[9px]">
                      Format & Kualitas
                    </span>
                    <strong className="text-foreground font-mono">
                      H.264 Medium Q
                    </strong>
                  </div>
                </div>
              </div>

              {/* Footer Citation */}
              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="font-mono">© Amparan Djati</span>
                <span className="font-semibold text-foreground font-mono">
                  Boy Aghnia Rifadhan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
