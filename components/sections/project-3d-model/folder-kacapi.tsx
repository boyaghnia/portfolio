"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, FileText, Maximize2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LightboxMedia } from "./types";

interface FolderKacapiProps {
  onOpenLightbox: (media: LightboxMedia) => void;
}

export function FolderKacapi({ onOpenLightbox }: FolderKacapiProps) {
  return (
    <motion.div
      key="folder-organologi-kacapi"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      {/* Folder Header */}
      <div className="p-6 sm:p-8 bg-card/60 border border-border/60 backdrop-blur-md space-y-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Makna & Filosofi Kacapi Indung
        </h3>

        <div className="text-muted-foreground leading-relaxed text-sm sm:text-base space-y-3">
          <p>
            <strong>Kacapi Indung</strong> merupakan instrumen petik dawai utama
            dalam khazanah seni karawitan dan tembang Sunda (seperti{" "}
            <em>Tembang Sunda Cianjuran</em> dan <em>Mamaos</em>). Penamaan{" "}
            <strong>&ldquo;Indung&rdquo;</strong> (yang berarti <em>Ibu</em>{" "}
            atau <em>Induk</em>) mencerminkan peran filosofisnya sebagai{" "}
            <strong>pemimpin dan pengayom musikal</strong>: bertugas memimpin
            jalannya gending, membuka lagu (<em>narangtang</em>), memberikan
            ketukan dan aksen, mengatur tempo, serta membimbing alur melodi
            pokok yang diikuti oleh instrumen lainnya (seperti{" "}
            <em>Kacapi Rincik</em> dan <em>Suling</em>).
          </p>
          <p>
            Bentuk fisiknya yang menyerupai perahu (<em>Kacapi Parahu</em>)
            dengan lengkungan <em>Gelung</em> di kedua ujungnya memiliki
            simbolisme mendalam sebagai{" "}
            <strong>&ldquo;Bahtera Kehidupan&rdquo;</strong>—menggambarkan
            perjalanan manusia dalam mengarungi samudra kehidupan dengan
            senantiasa berpegang pada keselarasan budi pekerti, nilai spiritual,
            serta falsafah luhur Sunda:{" "}
            <em>Silih Asih, Silih Asah, dan Silih Asuh</em>.
          </p>
          <p>
            Rentangan dawai kawat (<em>rarambut</em>) yang disangga oleh deretan{" "}
            <em>inang</em> di atas papan suara (<em>bengeut</em>) dan
            beresonansi melalui rongga bawah (<em>susumuran</em>) melambangkan
            harmoni keselarasan antara alam batin manusia, sesama ciptaan, dan
            rasa syukur kepada Sang Maha Pencipta.
          </p>
        </div>
      </div>

      {/* Continuous Connected Sheet Flow */}
      <div className="space-y-12">
        {/* Sheet 1 (01/03) */}
        <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
          <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">
                Anatomi Eksterior & Bagian Utama Kacapi Indung
              </span>
            </div>
            <Badge variant="outline" className="rounded-none font-mono text-xs">
              organologi1.webp
            </Badge>
          </div>

          <div
            className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
            onClick={() =>
              onOpenLightbox({
                title: "Visualisasi 3D Organologi Kacapi Indung (01/03)",
                category: "Organologi Kacapi Indung",
                type: "image",
                src: "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi1.webp",
                desc: "Lembar 01/03: Anatomi Gelung, Bengker, Pureut, Dadampar, Bengeut / Raray, dan Pongpok pada Kacapi Indung.",
              })
            }
          >
            <Image
              src={encodeURI(
                "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi1.webp",
              )}
              alt="Visualisasi 3D Organologi Kacapi Indung 01/03"
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

          {/* Detailed Glossary of All Directional Arrows in Image 1 */}
          <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  GELUNG
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Gelung:</strong> Mahkota
                  lengkungan artistik yang melengkung ke atas pada kedua ujung
                  atas badan kacapi, berfungsi sebagai penyeimbang visual dan
                  penahan struktur ujung.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  BENGKER
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Bengker:</strong> Bingkai
                  pengikat pembatas samping atau kepala penahan struktur kayu
                  penutup agar papan suara tidak retak akibat tegangan kawat.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  PUREUT
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Pureut:</strong> Deretan
                  pasak kayu penala (*tuning peg*) di sisi samping badan kacapi
                  yang diputar untuk mengencangkan/mengendurkan dawai kawat saat
                  menyetem nada.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  DADAMPAR
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Dadampar:</strong>{" "}
                  Bantalan landasan melintang tempat tumpuan pangkal kawat dawai
                  sebelum diarahkan menuju inang dan pasak penala.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  BENGEUT / RARAY
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Bengeut / Raray:</strong>{" "}
                  Bidang muka permukaan atas papan suara (*soundboard*) tempat
                  dawai membentang dan tempat berdirinya inang penyangga nada.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  PONGPOK
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Pongpok:</strong> Bagian
                  ujung atau moncong penutup bawah di kedua sisi badan kacapi
                  yang menyatukan dinding samping (*papalayu*) dan dasar badan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sheet 2 (02/03) */}
        <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
          <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">
                Kawat Dawai, Tumpang Sari / Inang & Liang Pureut
              </span>
            </div>
            <Badge variant="outline" className="rounded-none font-mono text-xs">
              organologi2.webp
            </Badge>
          </div>

          <div
            className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
            onClick={() =>
              onOpenLightbox({
                title: "Visualisasi 3D Organologi Kacapi Indung (02/03)",
                category: "Organologi Kacapi Indung",
                type: "image",
                src: "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi2.webp",
                desc: "Lembar 02/03: Detail Kawat/Rarambut, Tumpang Sari / Inang, Papalayu, Liang Pureut, dan model 3D pasak Pureut.",
              })
            }
          >
            <Image
              src={encodeURI(
                "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi2.webp",
              )}
              alt="Visualisasi 3D Organologi Kacapi Indung 02/03"
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

          {/* Detailed Glossary of All Directional Arrows in Image 2 */}
          <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  KAWAT / RARAMBUT
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Kawat / Rarambut:</strong>{" "}
                  Senar dawai kawat logam baja tipis yang diregangkan di atas
                  papan suara, menjadi sumber getaran utama penghasil nada
                  petikan.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  TUMPANG SARI / INANG
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Tumpang Sari / Inang:
                  </strong>{" "}
                  Kuda-kuda kecil kayu berbentuk piramida terpancung dengan
                  takik di atasnya, berfungsi membatasi panjang getar senar dan
                  menghantarkan energi getar ke resonator.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  PAPALAYU
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Papalayu:</strong> Dinding
                  samping atau lambung badan kacapi yang kokoh, tempat deretan
                  lubang penala (*liang pureut*) dibuat.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  LIANG PUREUT
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Liang Pureut:</strong>{" "}
                  Deretan lubang presisi pada dinding papalayu tempat pasak
                  penala masuk dan mengunci senar kawat.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  PUREUT (MODEL 3D)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Pureut (Pasak Penala):
                  </strong>{" "}
                  Pasak kayu berbentuk poros silinder berulir lembut dengan
                  kepala pegangan untuk memudahkan jemari pemain memutar dan
                  menala dawai.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  BENGEUT & GELUNG
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Bengeut & Gelung:</strong>{" "}
                  Sudut pandang potong menunjukkan keterkaitan antara lengkungan
                  mahkota gelung dan bidang datar papan suara bengeut.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sheet 3 (03/03) */}
        <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
          <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">
                Skema Blueprint, Susumuran & Geometri Susu/Tumpangsari
              </span>
            </div>
            <Badge variant="outline" className="rounded-none font-mono text-xs">
              organologi3.webp
            </Badge>
          </div>

          <div
            className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
            onClick={() =>
              onOpenLightbox({
                title: "Visualisasi 3D Organologi Kacapi Indung (03/03)",
                category: "Organologi Kacapi Indung",
                type: "image",
                src: "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi3.webp",
                desc: "Lembar 03/03: Skema teknis Susumuran, Lidah/Leletah, Bobokong, Gelung, dan penampang Susu/Tumpangsari.",
              })
            }
          >
            <Image
              src={encodeURI(
                "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi3.webp",
              )}
              alt="Visualisasi 3D Organologi Kacapi Indung 03/03"
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

          {/* Detailed Glossary of All Directional Arrows in Image 3 */}
          <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  SUSUMURAN
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Susumuran:</strong> Lubang
                  resonansi di bagian dasar bawah badan kacapi (*seperti
                  sumur*), berfungsi mengalirkan gelombang udara resonansi dari
                  dalam rongga badan ke luar.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  LIDAH / LELETAH
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Lidah / Leletah:</strong>{" "}
                  Celah sempit lidah pada lubang susumuran yang mengontrol
                  kompresi udara akustik di dalam rongga resonansi.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  BOBOKONG
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Bobokong:</strong> Ruang
                  rongga cekungan bawah / punggung badan kacapi yang membentuk
                  wadah akustik (*resonating chamber*) pembesar suara.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  SUSU / TUMPANGSARI
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Susu / Tumpangsari (Blueprint):
                  </strong>{" "}
                  Diagram geometris inang tampak samping (segitiga/trapesium)
                  dan tampak atas (persegi dengan garis diagonal dan takik
                  tumpuan kawat).
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  GELUNG (BLUEPRINT)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Gelung (Blueprint):
                  </strong>{" "}
                  Gambar proyeksi teknis lengkungan mahkota ujung kacapi yang
                  memperlihatkan kurva kehalusan pahatan kayu.
                </p>
              </div>

              <div className="p-3.5 bg-background/60 border border-border/60">
                <div className="text-xs font-mono text-primary font-bold mb-1">
                  BENGKER & PAPALAYU
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Bengker & Papalayu:
                  </strong>{" "}
                  Perspektif 3D bawah menunjukkan pertemuan antara dinding
                  lambung samping papalayu dan bingkai pengikat bengker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
