"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Maximize2 } from "lucide-react";
import type { LightboxMedia } from "./types";

interface FolderKarindingProps {
  onOpenLightbox: (media: LightboxMedia) => void;
}

export function FolderKarinding({ onOpenLightbox }: FolderKarindingProps) {
  return (
    <motion.div
      key="folder-karinding"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="space-y-12"
    >
      {/* Folder Header & Sejarah */}
      <div className="p-6 sm:p-8 bg-card/60 border border-border/60 backdrop-blur-md space-y-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Visualisasi 3D Karinding & Filosofi Yakin Sadar Sabar
        </h3>

        <div className="text-muted-foreground leading-relaxed text-sm sm:text-base space-y-3">
          <p>
            <strong>Karinding</strong> adalah alat musik tradisional masyarakat
            Sunda yang terbuat dari pelepah kawung (batang pohon aren) atau{" "}
            <em>Awi</em> (bambu). Sebuah alat musik yang cukup tua yang konon
            telah digunakan oleh para <em>karuhun</em> (leluhur) sejak zaman
            sebelum ditemukannya Kacapi, di mana usia Kacapi itu sendiri sudah
            mencapai lebih dari 500 tahun yang lalu. Diperkirakan Karinding
            sudah berusia lebih dari <strong>600 tahun</strong> dan bahkan ada
            yang menyebutkan bahwa alat ini telah dipergunakan sejak zaman purba
            era megalitikum.
          </p>
          <p>
            Instrumen sejenis Karinding tidak hanya ada di Tatar Sunda,
            melainkan tersebar luas di berbagai daerah dan belahan dunia: di
            Bali dikenal dengan sebutan <strong>Genggong</strong>, di Kalimantan
            disebut <strong>Tung</strong>, di Tibet dikenal sebagai{" "}
            <strong>Juliab</strong>, hingga di Mongol disebut{" "}
            <strong>Xomits</strong>.
          </p>
          <p>
            Karinding dimainkan dengan cara ditempelkan di rongga mulut lalu
            ditabuh/disentil ujungnya atau melalui tali. Getaran antara bilah
            Karinding dan rongga mulut yang digabung dengan hembusan udara
            menghasilkan resonansi suara khas yang unik:{" "}
            <em>&ldquo;Tweew.. tweew...&rdquo;</em>. Karinding memiliki nada
            titian yang khas dan paten (misal laras F atau D), dengan ukuran
            proporsi standar panjang <strong>10 cm</strong> dan lebar{" "}
            <strong>2 cm</strong>.
          </p>
        </div>
      </div>

      {/* FILOSOFI YAKIN, SADAR, SABAR CARDS */}
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight">
            Filosofi Yakin, Sadar & Sabar pada 3 Bagian Anatomi Karinding
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Dibalik kesederhanaan bentuknya, Karinding menyimpan kekayaan
            intelektualitas dan nilai luhur kehidupan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Pancepengan - YAKIN */}
          <div className="p-5 sm:p-6 bg-card/60 border border-primary/40 hover:border-primary transition-colors backdrop-blur-md relative overflow-hidden flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-primary/20 text-primary border border-primary/30">
                  BAGIAN 1: PANCEPENGAN
                </span>
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Filosofi YAKIN
                </span>
              </div>
              <h5 className="font-bold text-base text-foreground">
                Pegangan yang Mantap & Pas
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pancepengan adalah bagian pangkal yang harus dipegang dengan
                baik oleh pemain Karinding—tidak usah terlalu erat, yang penting
                pas dan mantap.
              </p>
            </div>
            <div className="p-3 bg-muted/20 border border-border/40 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Makna Filosofis:</strong>{" "}
              Mengandung nilai <em>yakin</em>—bahwa seseorang harus yakin dengan
              apa yang ia pegang sebelum dimainkan, yakin ia mampu melakukannya,
              dan yakin apa yang dimainkan bermanfaat bagi banyak orang.
              Keyakinan meniupkan semangat positif{" "}
              <em>&ldquo;Aku Bisa!&rdquo;</em> untuk membuka potensi diri dalam
              kerendahan hati, ikhlas, dan tawakal.
            </div>
          </div>

          {/* 2. Cecet Ucing - SADAR */}
          <div className="p-5 sm:p-6 bg-card/60 border border-primary/40 hover:border-primary transition-colors backdrop-blur-md relative overflow-hidden flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-primary/20 text-primary border border-primary/30">
                  BAGIAN 2: CECET UCING
                </span>
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Filosofi SADAR
                </span>
              </div>
              <h5 className="font-bold text-base text-foreground">
                Bilah Getar / Jarum Nada
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cecet ucing adalah bilah buluh bambu tipis dan lentur di bagian
                tengah yang bergetar menghasilkan resonansi bunyi saat bagian
                penabuh disentil.
              </p>
            </div>
            <div className="p-3 bg-muted/20 border border-border/40 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Makna Filosofis:</strong>{" "}
              Menggambarkan nilai <em>kesadaran (sadar)</em> dalam mengolah
              napas, vokal, dan rongga mulut. Suara getaran hanya akan
              teramplifikasi merdu apabila pemain sadar penuh mengontrol
              artikulasi rongga mulut tanpa memaksakan kehendak.
            </div>
          </div>

          {/* 3. Panenggeulan - SABAR */}
          <div className="p-5 sm:p-6 bg-card/60 border border-primary/40 hover:border-primary transition-colors backdrop-blur-md relative overflow-hidden flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-primary/20 text-primary border border-primary/30">
                  BAGIAN 3: PANENGGEULAN
                </span>
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Filosofi SABAR
                </span>
              </div>
              <h5 className="font-bold text-base text-foreground">
                Ujung Penabuh Sentil
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Panenggeulan adalah bagian ujung bilah yang ditabuh/disentil
                secara ritmis menggunakan jari telunjuk tangan kanan.
              </p>
            </div>
            <div className="p-3 bg-muted/20 border border-border/40 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Makna Filosofis:</strong>{" "}
              Menabuh Karinding harus dilakukan dengan penuh <em>kesabaran</em>
              —tidak tergesa-gesa, tidak terlalu cepat, tidak terlalu keras, dan
              tidak terlalu pelan, melainkan pas di tengah-tengah. Sebaik-baik
              urusan adalah yang berada di tengah-tengah, agar suara yang keluar
              semantap keyakinan yang dipegang.
            </div>
          </div>
        </div>
      </div>

      {/* Hero Showcase: Karinding Main 3D Models */}
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight">
            Model 3D Karinding Bambu & Detail Tekstur
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Visualisasi proporsi 10 cm x 2 cm, serat bambu alami, dan kelenturan
            jarum getar cecet ucing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() =>
              onOpenLightbox({
                title: "Model 3D Karinding Bambu (Proporsi Presisi)",
                category: "Visualisasi 3D Karinding",
                type: "image",
                src: "/images/projects/3d-model/Visualisasi 3D Karinding/karining.webp",
                desc: "Pemodelan 3D Karinding bambu tradisional dengan 3 bagian anatomi lengkap: Pancepengan (pegangan), Cecet Ucing (jarum getar), dan Panenggeulan (ujung penabuh) dalam ukuran standar 10 cm x 2 cm.",
              })
            }
            className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-16/10 w-full bg-black/40 overflow-hidden">
              <Image
                src={encodeURI(
                  "/images/projects/3d-model/Visualisasi 3D Karinding/karining.webp",
                )}
                alt="3D Model Karinding Bambu"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </span>
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Model Utama Karinding Bambu (Proporsi Standar)
              </h5>
              <p className="text-xs text-muted-foreground mt-1">
                Menampilkan bentuk utuh bilah bambu dengan pembagian
                pancepengan, celah getar cecet ucing, dan panenggeulan.
              </p>
            </div>
          </div>

          <div
            onClick={() =>
              onOpenLightbox({
                title: "Detail Tekstur Serat Bambu & Jarum Cecet Ucing",
                category: "Visualisasi 3D Karinding",
                type: "image",
                src: "/images/projects/3d-model/Visualisasi 3D Karinding/karining2.webp",
                desc: "Detail tekstur serat bambu alami (bump map), ketipisan bilah cecet ucing penghasil getaran frekuensi nada, dan dudukan panyepengan.",
              })
            }
            className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
          >
            <div className="relative aspect-16/10 w-full bg-black/40 overflow-hidden">
              <Image
                src={encodeURI(
                  "/images/projects/3d-model/Visualisasi 3D Karinding/karining2.webp",
                )}
                alt="3D Karinding Detail Serat & Cecepet"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </span>
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Detail Serat Alami & Celah Getar Akustik
              </h5>
              <p className="text-xs text-muted-foreground mt-1">
                Penerapan material procedural bump mapping serat bambu dan celah
                udara mikro tempat getaran beresonansi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Perspectives Grid */}
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight">
            Rangkaian Sudut Pandang Model 3D (View 01 s/d 05)
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Studi detail tahapan konstruksi 3D, bilah cecet ucing, dan tampak
            penampang Karinding.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              num: "1",
              title: "View 01 — Rangka Dasar Tanpa Cecet Ucing (Tampak Atas)",
              desc: "Tampak atas struktur dasar bilah Karinding dari bagian pancepengan hingga ujung, sebelum dibentuknya lidah getar cecet ucing.",
            },
            {
              num: "2",
              title:
                "View 02 — Karinding Utuh dengan Cecet Ucing (Tampak Atas)",
              desc: "Tampak atas Karinding utuh dari pancepengan hingga ujung yang telah terpasang bilah jarum getar cecet ucing di celah tengah.",
            },
            {
              num: "3",
              title: "View 03 — Pembagian 3 Segmen Anatomi (Tampak Atas)",
              desc: "Tampak atas Karinding dengan segmentasi 3 zona anatomis: pancepengan (belakang/pegangan), cecet ucing (tengah/lidah getar), dan panenggeulan (depan/penabuh).",
            },
            {
              num: "4",
              title: "View 04 — Bagian Cecet Ucing (Tampak Samping)",
              desc: "Tampak samping yang memperlihatkan profil pilar penopang serta ketipisan bilah cecet ucing sebagai lidah getar penghasil nada.",
            },
            {
              num: "5",
              title:
                "View 05 — Segmen Cecet Ucing hingga Panenggeulan (Tampak Bawah)",
              desc: "Tampak bawah yang memperlihatkan rongga akustik, ketebalan dinding pembatas, serta bagian dari cecet ucing menuju panenggeulan.",
            },
          ].map((item) => (
            <div
              key={item.num}
              onClick={() =>
                onOpenLightbox({
                  title: item.title,
                  category: "Visualisasi 3D Karinding",
                  type: "image",
                  src: `/images/projects/3d-model/Visualisasi 3D Karinding/${item.num}.webp`,
                  desc: item.desc,
                })
              }
              className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                <Image
                  src={encodeURI(
                    `/images/projects/3d-model/Visualisasi 3D Karinding/${item.num}.webp`,
                  )}
                  alt={`Karinding 3D ${item.title}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  loading="lazy"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <span className="text-[10px] font-mono text-primary font-semibold">
                  VIEW 0{item.num}
                </span>
                <h6 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h6>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
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
