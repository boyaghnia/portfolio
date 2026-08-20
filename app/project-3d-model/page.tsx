"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Layers, Folder, Sliders } from "lucide-react";
import { SiBlender, SiYoutube } from "react-icons/si";

import { SideRays } from "@/components/animations/side-rays";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type {
  FolderCategory,
  LightboxMedia,
} from "./_components/types";
import {
  YOUTUBE_VIDEOS,
  FOLDERS,
} from "./_components/constants";
import { YouTubeFacadeCard } from "./_components/youtube-facade-card";
import { LightboxModal } from "./_components/lightbox-modal";

import { FolderTarawangsa } from "./_components/folder-tarawangsa";
import { FolderKacapi } from "./_components/folder-kacapi";
import { FolderKarinding } from "./_components/folder-karinding";
import { FolderAlatMusik } from "./_components/folder-alat-musik";
import { FolderTerminalBade } from "./_components/folder-terminal-bade";
import { FolderEtc } from "./_components/folder-etc";

export default function Project3DModelPage() {
  const [activeFolder, setActiveFolder] = React.useState<FolderCategory>(
    "organologi-tarawangsa",
  );
  const [selectedLightbox, setSelectedLightbox] =
    React.useState<LightboxMedia | null>(null);

  const openLightbox = (media: LightboxMedia) => {
    setSelectedLightbox(media);
  };

  const closeLightbox = () => {
    setSelectedLightbox(null);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-60 dark:opacity-40 pointer-events-none">
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border border-border/60 bg-card/60 backdrop-blur-md p-6 sm:p-10 relative overflow-hidden shadow-lg">
          {/* Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary/50 to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className="rounded-none border-primary/40 text-primary font-mono text-xs uppercase"
                >
                  3D Modeling & Organology Showcase
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  2020 – 2024
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                Eksplorasi Pemodelan 3D, Organologi Budaya & Shader
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Dokumentasi komprehensif visualisasi 3D yang mencakup kajian
                organologi alat musik tradisional Sunda (Tarawangsa, Kacapi,
                Karinding), perancangan bandara udara, props vintage, hingga
                eksperimen procedural shader nodes di Blender.
              </p>
            </div>

            {/* Quick Spec Badge Box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 shrink-0">
              <div className="p-3 bg-muted/40 border border-border/60 text-xs">
                <div className="text-muted-foreground text-[10px] uppercase font-mono">
                  Software Utama
                </div>
                <div className="font-bold text-foreground flex items-center gap-1.5 mt-0.5">
                  <SiBlender className="w-3.5 h-3.5 text-orange-500" />
                  <span>Blender 3D</span>
                </div>
              </div>

              <div className="p-3 bg-muted/40 border border-border/60 text-xs">
                <div className="text-muted-foreground text-[10px] uppercase font-mono">
                  Render Engine
                </div>
                <div className="font-bold text-foreground flex items-center gap-1.5 mt-0.5">
                  <Sliders className="w-3.5 h-3.5 text-primary" />
                  <span>Cycles & Eevee</span>
                </div>
              </div>

              <div className="p-3 bg-muted/40 border border-border/60 text-xs">
                <div className="text-muted-foreground text-[10px] uppercase font-mono">
                  Fokus Riset
                </div>
                <div className="font-bold text-foreground flex items-center gap-1.5 mt-0.5">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  <span>Organologi & Arsitektur</span>
                </div>
              </div>

              <div className="p-3 bg-muted/40 border border-border/60 text-xs">
                <div className="text-muted-foreground text-[10px] uppercase font-mono">
                  Total Kategori
                </div>
                <div className="font-bold text-foreground flex items-center gap-1.5 mt-0.5">
                  <Folder className="w-3.5 h-3.5 text-primary" />
                  <span>6 Folder Proyek</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: YOUTUBE TIME-LAPSE & SHOWCASE */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase font-bold mb-1">
                <SiYoutube className="w-4 h-4" />
                <span>Video Showcase & Timelapse YouTube</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Dokumentasi Video Pemodelan 3D
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Rekaman proses pembuatan model 3D, tutorial nodes shader, dan
                eksplorasi objek di YouTube.
              </p>
            </div>

            <a
              href="https://www.youtube.com/@boyaghnia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 hover:border-red-600 transition-all duration-300 shrink-0"
            >
              <SiYoutube className="w-4 h-4" />
              <span>Kunjungi Channel YouTube</span>
            </a>
          </div>

          {/* YouTube Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {YOUTUBE_VIDEOS.map((video) => (
              <YouTubeFacadeCard key={video.id} video={video} />
            ))}
          </div>
        </div>

        {/* SECTION: FOLDER EXPLORER (TABBED CATEGORIES) */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase font-bold mb-1">
                <Folder className="w-3.5 h-3.5" />
                <span>Dokumentasi Visualisasi 3D Model</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Eksplorasi Karya & Kajian Visual
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Pilih salah satu folder proyek di bawah untuk membuka halaman
                dokumentasi lengkap, lembar kajian organologi bersambung, dan
                visualisasi arsitektur.
              </p>
            </div>
          </div>

          {/* Folder Navigation Cards/Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {FOLDERS.map((folder) => {
              const Icon = folder.icon;
              const isActive = activeFolder === folder.id;

              return (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolder(folder.id)}
                  className={`p-3.5 sm:p-4 text-left border transition-all duration-300 flex flex-col justify-between relative cursor-pointer group ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-lg ring-1 ring-primary"
                      : "bg-card/60 text-foreground border-border/60 hover:border-primary/50 hover:bg-muted/40"
                  }`}
                >
                  {/* Top indicator */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        isActive
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {folder.number}
                    </span>
                    <Icon
                      className={`w-3 h-3 ${
                        isActive
                          ? "text-primary-foreground"
                          : "text-primary group-hover:scale-110 transition-transform"
                      }`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-2 mb-1 ${
                        isActive ? "text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {folder.shortLabel}
                    </h3>
                    <span
                      className={`text-[10px] font-mono ${
                        isActive
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {folder.itemCount} Asset
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DEDICATED FOLDER CONTENT VIEWS */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeFolder === "alat-musik" && (
              <FolderAlatMusik onOpenLightbox={openLightbox} />
            )}
            {activeFolder === "organologi-kacapi" && (
              <FolderKacapi onOpenLightbox={openLightbox} />
            )}
            {activeFolder === "karinding" && (
              <FolderKarinding onOpenLightbox={openLightbox} />
            )}
            {activeFolder === "organologi-tarawangsa" && (
              <FolderTarawangsa onOpenLightbox={openLightbox} />
            )}
            {activeFolder === "terminal-bade" && (
              <FolderTerminalBade onOpenLightbox={openLightbox} />
            )}
            {activeFolder === "etc" && (
              <FolderEtc onOpenLightbox={openLightbox} />
            )}
          </AnimatePresence>
        </div>

        {/* Back to Portfolio Button */}
        <div className="flex justify-center pt-8 pb-4">
          <Link href="/#projects">
            <Button
              variant="outline"
              size="lg"
              className="rounded-none border-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 min-w-44 font-semibold flex items-center gap-2 group shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Kembali Ke Portfolio</span>
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
      <BackToTop />

      {/* Lightbox Modal */}
      <LightboxModal media={selectedLightbox} onClose={closeLightbox} />
    </div>
  );
}
