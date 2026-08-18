"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Box,
  Play,
  ExternalLink,
  Maximize2,
  X,
  Sparkles,
  Layers,
  Film,
  Folder,
  Plane,
  Building2,
  Music2,
  FolderGit2,
  FileText,
  Sliders,
  CheckCircle2,
  Info,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { SiBlender, SiYoutube } from "react-icons/si";

import { SideRays } from "@/components/animations/side-rays";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Folder types
export type FolderCategory =
  | "organologi-tarawangsa"
  | "organologi-kacapi"
  | "alat-musik"
  | "karinding"
  | "terminal-bade"
  | "etc";

export interface LightboxMedia {
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  desc?: string;
  badge?: string;
}

export interface YouTubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  subtitle: string;
  desc: string;
  software: string;
  url: string;
  tags: string[];
}

const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: "yt-kacapi",
    youtubeId: "O7wPGH63Gv0",
    title: "Membuat 3D Model Kacapi di Blender 2.90",
    subtitle: "Timelapse & Modelling Tutorial",
    desc: "Proses pemodelan 3D instrumen musik tradisional Sunda (Kacapi Indung) mulai dari body resonansi, inang, kawat dawai, hingga tekstur kayu alami menggunakan Blender 2.90.",
    software: "Blender 2.90",
    url: "https://youtu.be/O7wPGH63Gv0?si=T3cfcsQx5f6wwVbx",
    tags: ["Kacapi Sunda", "Alat Musik Tradisional", "Blender 3D", "Timelapse"],
  },
  {
    id: "yt-kujang",
    youtubeId: "fuHONWHJA-0",
    title: "Kujang 3D Model - Blender 2.91",
    subtitle: "Cultural Weapon 3D Showcase",
    desc: "Pemodelan 3D Kujang, senjata pusaka dan simbol budaya khas Tatar Sunda Jawa Barat, dengan lekukan bilah berornamen dan gagang kayu tradisional.",
    software: "Blender 2.91",
    url: "https://youtu.be/fuHONWHJA-0?si=ophq2o2kzY46-nGa",
    tags: [
      "Kujang Sunda",
      "Senjata Tradisional",
      "Budaya Sunda",
      "Hard Surface",
    ],
  },
  {
    id: "yt-teko",
    youtubeId: "qLyR3ifmKUA",
    title: "Blender Node Teko Cendol / Teko Blirik - Blender 2.90",
    subtitle: "Procedural Shader & Material Nodes",
    desc: "Eksplorasi procedural shader nodes untuk menghasilkan motif loreng bintik khas teko blirik/cendol enamel vintage tanpa UV image texture eksternal.",
    software: "Blender 2.90",
    url: "https://youtu.be/qLyR3ifmKUA?si=azRMR63B6rxtAHY5",
    tags: [
      "Teko Blirik",
      "Procedural Shader",
      "Shader Nodes",
      "Vintage Enamel",
    ],
  },
];

const FOLDERS: {
  id: FolderCategory;
  number: string;
  name: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  itemCount: number;
}[] = [
  {
    id: "organologi-tarawangsa",
    number: "01",
    name: "Visualisasi 3D Organologi Tarawangsa",
    shortLabel: "Organologi Tarawangsa",
    icon: Film,
    tagline:
      "Rangkaian Kajian Organologi Tarawangsa & Jentreng (Page 1-3) + Video 3D (Page 4-5)",
    itemCount: 5,
  },
  {
    id: "organologi-kacapi",
    number: "02",
    name: "Visualisasi 3D Organologi Kacapi Indung",
    shortLabel: "Organologi Kacapi",
    icon: Sparkles,
    tagline:
      "Dokumentasi Kajian Organologi Bersambung (Lembar 01/03, 02/03, 03/03)",
    itemCount: 3,
  },
  {
    id: "karinding",
    number: "03",
    name: "Visualisasi 3D Karinding",
    shortLabel: "3D Karinding",
    icon: Box,
    tagline:
      "Model 3D Karinding Bambu, Lidah Getar & 5 Sudut Render Perspektif",
    itemCount: 7,
  },
  {
    id: "alat-musik",
    number: "04",
    name: "Alat Musik Sunda",
    shortLabel: "Alat Musik Sunda",
    icon: Music2,
    tagline:
      "Koleksi 3D Model Kacapi, Tarawangsa, Bonang Gamelan & Render Gabungan",
    itemCount: 6,
  },
  {
    id: "terminal-bade",
    number: "05",
    name: "Terminal Bandara Bade",
    shortLabel: "Terminal Bandara Bade",
    icon: Plane,
    tagline:
      "Visualisasi Kawasan Air Side (AS) & Land Side (LS) serta Render Terminal",
    itemCount: 16,
  },
  {
    id: "etc",
    number: "06",
    name: "etc",
    shortLabel: "Props & Karya Lainnya",
    icon: FolderGit2,
    tagline:
      "Teko Blirik Procedural Shader, Radio Retro, Piring Enamel, Cingcin & 3D Kujang",
    itemCount: 7,
  },
];

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

  // Keyboard navigation for Lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal open
  React.useEffect(() => {
    if (selectedLightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedLightbox]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Background Animated Rays */}
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-60 dark:opacity-40 pointer-events-none">
        <SideRays
          speed={2.2}
          rayColor1="#EAB308"
          rayColor2="#38bdf8"
          intensity={2.2}
          spread={2.2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      </div>

      <Navbar />

      <main className="container mx-auto pt-28 md:pt-32 pb-24 px-4 max-w-7xl relative z-10">
        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Portofolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-none border-primary/40 bg-primary/10 text-primary font-mono text-xs"
            >
              <SiBlender className="w-3.5 h-3.5 mr-1.5" />
              Blender 3D Showcase
            </Badge>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 border border-border/60 bg-card/60 backdrop-blur-md p-6 sm:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
                <Box className="w-3.5 h-3.5" />
                <span>Dokumentasi & Portofolio 3D Modelling</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                Dokumentasi Karya 3D & Pelestarian Budaya
              </h1>

              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Koleksi karya 3D Modelling yang dikembangkan menggunakan Blender
                3D. Berawal dari inisiatif pada tahun 2019 untuk
                mendokumentasikan dan melestarikan instrumen musik tradisional
                Sunda ke dalam bentuk digital 3D dengan presisi organologi,
                hingga visualisasi arsitektur Terminal Bandar Udara Bade (Air
                Side & Land Side) serta eksplorasi procedural shader material.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-foreground/90 bg-muted/40 px-3 py-1.5 border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Kajian Organologi Alat Musik Sunda</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-foreground/90 bg-muted/40 px-3 py-1.5 border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Terminal Bandara Bade (Air Side & Land Side)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-foreground/90 bg-muted/40 px-3 py-1.5 border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Procedural Shader Nodes</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 min-w-[280px]">
              <div className="p-4 bg-background/50 border border-border/60 text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-primary">
                  44
                </span>
                <span className="text-xs text-muted-foreground uppercase font-mono">
                  Total Asset & Media
                </span>
              </div>
              <div className="p-4 bg-background/50 border border-border/60 text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-primary">
                  6
                </span>
                <span className="text-xs text-muted-foreground uppercase font-mono">
                  Folder Proyek
                </span>
              </div>
              <div className="p-4 bg-background/50 border border-border/60 text-center col-span-2 sm:col-span-1 lg:col-span-2">
                <div className="flex items-center justify-center gap-2 text-foreground font-semibold text-sm mb-1">
                  <SiBlender className="w-4 h-4 text-amber-500" />
                  <span>Blender 2.90 - 3D</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  Cycles & Eevee Renderer
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* YOUTUBE SHOWCASE SECTION */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 mb-2">
                <SiYoutube className="w-3.5 h-3.5" />
                <span>YouTube Showcase & Timelapse</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Video Pembuatan & Shader Node di YouTube
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Tonton proses pemodelan 3D, timelapse, dan eksperimen shader
                node secara langsung.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {YOUTUBE_VIDEOS.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden flex flex-col justify-between hover:border-primary/60 transition-all duration-300 shadow-md"
              >
                {/* Accent Top bar */}
                <div className="h-1 w-full bg-linear-to-r from-red-500/40 via-red-500 to-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Video Embed */}
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Video Info */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono text-primary uppercase font-semibold">
                        {video.subtitle}
                      </span>
                      <Badge
                        variant="secondary"
                        className="rounded-none text-[10px] bg-muted/60"
                      >
                        {video.software}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold tracking-tight text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {video.desc}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-border/40">
                      {video.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 bg-muted/40 text-muted-foreground border border-border/40 font-mono"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Action Link */}
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 hover:border-red-600 transition-all duration-300"
                    >
                      <SiYoutube className="w-4 h-4" />
                      <span>Buka di YouTube</span>
                      <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION NAVIGATION TABS PER FOLDER */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 mb-2">
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
                      className={`w-4 h-4 ${
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
            {/* =========================================================================
                FOLDER 1: ALAT MUSIK SUNDA
                ========================================================================= */}
            {activeFolder === "alat-musik" && (
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
                    Koleksi pemodelan 3D instrumen musik tradisional Sunda
                    mencakup <strong>Kacapi Indung</strong>,{" "}
                    <strong>Tarawangsa</strong>, dan{" "}
                    <strong>Bonang Gamelan Sunda</strong>. Dibuat dengan
                    memperhatikan proporsi bentuk fisik asli, konstruksi kayu,
                    inang (piramid penyangga senar), serta refleksi material
                    dawai kawat untuk keperluan dokumentasi digital dan
                    pelestarian seni tradisi Jawa Barat.
                  </p>
                </div>

                {/* Sub-Showcase: Kacapi Sunda Multi-Angle */}
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                      1. Pemodelan 3D Kacapi Sunda
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Visualisasi Kacapi dari sudut perspektif, tampak atas (top
                      view tata letak dawai), dan render studio resolusi tinggi.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Kacapi 1 */}
                    <div
                      onClick={() =>
                        openLightbox({
                          title: "3D Model Kacapi Sunda (Perspektif)",
                          category: "Alat Musik Sunda",
                          type: "image",
                          src: "/images/projects/3d-model/Alat Musik Sunda/kacapi.png",
                          desc: "Pemodelan 3D instrumen Kacapi Sunda dengan dawai kawat, inang piramid penyangga, dan rongga resonansi kayu.",
                        })
                      }
                      className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
                    >
                      <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                        <Image
                          src={encodeURI(
                            "/images/projects/3d-model/Alat Musik Sunda/kacapi.png",
                          )}
                          alt="3D Model Kacapi Sunda (Perspektif)"
                          fill
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
                          Tampak samping perspektif menampakkan kelengkungan
                          badan resonator dan pureut.
                        </p>
                      </div>
                    </div>

                    {/* Kacapi 2 */}
                    <div
                      onClick={() =>
                        openLightbox({
                          title: "3D Model Kacapi Sunda (Top View)",
                          category: "Alat Musik Sunda",
                          type: "image",
                          src: "/images/projects/3d-model/Alat Musik Sunda/kacapi2.png",
                          desc: "Tampak atas susunan dawai dan penala (pureut) instrumen Kacapi Sunda.",
                        })
                      }
                      className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
                    >
                      <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                        <Image
                          src={encodeURI(
                            "/images/projects/3d-model/Alat Musik Sunda/kacapi2.png",
                          )}
                          alt="3D Model Kacapi Sunda (Top View)"
                          fill
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
                          Tampak atas memperlihatkan konfigurasi jarak
                          antardawai dan penala baut putar.
                        </p>
                      </div>
                    </div>

                    {/* Kacapi 3 */}
                    <div
                      onClick={() =>
                        openLightbox({
                          title: "Render Kacapi Sunda Studio Lighting",
                          category: "Alat Musik Sunda",
                          type: "image",
                          src: "/images/projects/3d-model/Alat Musik Sunda/kacapi3.png",
                          desc: "Render studio resolusi tinggi menonjolkan pantulan cahaya pada dawai dan serat kayu alami.",
                        })
                      }
                      className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
                    >
                      <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                        <Image
                          src={encodeURI(
                            "/images/projects/3d-model/Alat Musik Sunda/kacapi3.png",
                          )}
                          alt="Render Kacapi Sunda Studio Lighting"
                          fill
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
                          Pencahayaan studio dengan bayangan lembut dan
                          kedalaman bidang optik.
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
                      Instrumen gesek Tarawangsa, pencon bonang logam perunggu,
                      dan hasil render gabungan Tarawangsa + Jentreng.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tarawangsa */}
                    <div
                      onClick={() =>
                        openLightbox({
                          title: "3D Model Instrumen Tarawangsa",
                          category: "Alat Musik Sunda",
                          type: "image",
                          src: "/images/projects/3d-model/Alat Musik Sunda/TARAWANGSA.png",
                          desc: "Model 3D Tarawangsa, alat musik gesek tradisional Sunda dengan dua dawai dan resonator kayu ramping.",
                        })
                      }
                      className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
                    >
                      <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                        <Image
                          src={encodeURI(
                            "/images/projects/3d-model/Alat Musik Sunda/TARAWANGSA.png",
                          )}
                          alt="3D Model Instrumen Tarawangsa"
                          fill
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
                          Model 3D utuh Tarawangsa dengan leher panjang dan dua
                          dawai nada.
                        </p>
                      </div>
                    </div>

                    {/* Bonang */}
                    <div
                      onClick={() =>
                        openLightbox({
                          title: "3D Model Bonang Gamelan Sunda",
                          category: "Alat Musik Sunda",
                          type: "image",
                          src: "/images/projects/3d-model/Alat Musik Sunda/bonang.png",
                          desc: "Pencon bonang gamelan Sunda berbahan logam perunggu/kuningan dengan tatakan kayu berukir.",
                        })
                      }
                      className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
                    >
                      <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                        <Image
                          src={encodeURI(
                            "/images/projects/3d-model/Alat Musik Sunda/bonang.png",
                          )}
                          alt="3D Model Bonang Gamelan Sunda"
                          fill
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
                          Pencon logam berpencon bulat dengan tekstur refleksi
                          logam kuningan.
                        </p>
                      </div>
                    </div>

                    {/* Page 6 */}
                    <div
                      onClick={() =>
                        openLightbox({
                          title: "Render Alat Musik Tarawangsa + Jentreng",
                          category: "Alat Musik Sunda",
                          type: "image",
                          src: "/images/projects/3d-model/Alat Musik Sunda/Page 6.png",
                          desc: "Hasil Render Ansambel Alat Musik Tradisional Tarawangsa + Jentreng menggunakan Blender Cycles.",
                        })
                      }
                      className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
                    >
                      <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                        <Image
                          src={encodeURI(
                            "/images/projects/3d-model/Alat Musik Sunda/Page 6.png",
                          )}
                          alt="Render Tarawangsa + Jentreng"
                          fill
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
                          Hasil Render Alat Musik Tarawangsa + Jentreng
                          menggunakan Cycles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                FOLDER 2: ORGANOLOGI KACAPI INDUNG (BERSAMBUNG / CONTINUOUS SHEET)
                ========================================================================= */}
            {activeFolder === "organologi-kacapi" && (
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
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Filosofi & Nilai Luhur Budaya Sunda</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Makna & Filosofi Kacapi Indung
                  </h3>

                  <div className="text-muted-foreground leading-relaxed text-sm sm:text-base space-y-3">
                    <p>
                      <strong>Kacapi Indung</strong> merupakan instrumen petik
                      dawai utama dalam khazanah seni karawitan dan tembang
                      Sunda (seperti <em>Tembang Sunda Cianjuran</em> dan{" "}
                      <em>Mamaos</em>). Penamaan{" "}
                      <strong>&ldquo;Indung&rdquo;</strong> (yang berarti{" "}
                      <em>Ibu</em> atau <em>Induk</em>) mencerminkan peran
                      filosofisnya sebagai{" "}
                      <strong>pemimpin dan pengayom musikal</strong>: bertugas
                      memimpin jalannya gending, membuka lagu (
                      <em>narangtang</em>), memberikan ketukan dan aksen,
                      mengatur tempo, serta membimbing alur melodi pokok yang
                      diikuti oleh instrumen lainnya (seperti{" "}
                      <em>Kacapi Rincik</em> dan <em>Suling</em>).
                    </p>
                    <p>
                      Bentuk fisiknya yang menyerupai perahu (
                      <em>Kacapi Parahu</em>) dengan lengkungan <em>Gelung</em>{" "}
                      di kedua ujungnya memiliki simbolisme mendalam sebagai{" "}
                      <strong>&ldquo;Bahtera Kehidupan&rdquo;</strong>
                      —menggambarkan perjalanan manusia dalam mengarungi samudra
                      kehidupan dengan senantiasa berpegang pada keselarasan
                      budi pekerti, nilai spiritual, serta falsafah luhur Sunda:{" "}
                      <em>Silih Asih, Silih Asah, dan Silih Asuh</em>.
                    </p>
                    <p>
                      Rentangan dawai kawat (<em>rarambut</em>) yang disangga
                      oleh deretan <em>inang</em> di atas papan suara (
                      <em>bengeut</em>) dan beresonansi melalui rongga bawah (
                      <em>susumuran</em>) melambangkan harmoni keselarasan
                      antara alam batin manusia, sesama ciptaan, dan rasa syukur
                      kepada Sang Maha Pencipta.
                    </p>
                  </div>
                </div>

                {/* Continuous Connected Sheet Flow */}
                <div className="space-y-12">
                  {/* Sheet 1 (01/03) */}
                  <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
                    <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="font-bold text-sm sm:text-base">
                          Lembar Kajian 01/03 — Anatomi Eksterior & Bagian Utama
                          Kacapi Indung
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="rounded-none font-mono text-xs"
                      >
                        organologi1.jpg (01/03)
                      </Badge>
                    </div>

                    <div
                      className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
                      onClick={() =>
                        openLightbox({
                          title:
                            "Visualisasi 3D Organologi Kacapi Indung (01/03)",
                          category: "Organologi Kacapi Indung",
                          type: "image",
                          src: "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi1.jpg",
                          desc: "Lembar 01/03: Anatomi Gelung, Bengker, Pureut, Dadampar, Bengeut / Raray, dan Pongpok pada Kacapi Indung.",
                        })
                      }
                    >
                      <Image
                        src={encodeURI(
                          "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi1.jpg",
                        )}
                        alt="Visualisasi 3D Organologi Kacapi Indung 01/03"
                        fill
                        className="object-contain p-3"
                      />
                      <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg">
                          <Maximize2 className="w-4 h-4" /> Buka Lembar Penuh
                          (Resolusi Asli)
                        </span>
                      </div>
                    </div>

                    {/* Detailed Glossary of All Directional Arrows in Image 1 */}
                    <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          Makna & Fungsi Penunjuk Arah pada Lembar 01/03:
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            GELUNG
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Gelung:</strong>{" "}
                            Mahkota lengkungan artistik yang melengkung ke atas
                            pada kedua ujung atas badan kacapi, berfungsi
                            sebagai penyeimbang visual dan penahan struktur
                            ujung.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            BENGKER
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Bengker:
                            </strong>{" "}
                            Bingkai pengikat pembatas samping atau kepala
                            penahan struktur kayu penutup agar papan suara tidak
                            retak akibat tegangan kawat.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            PUREUT
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Pureut:</strong>{" "}
                            Deretan pasak kayu penala (*tuning peg*) di sisi
                            samping badan kacapi yang diputar untuk
                            mengencangkan/mengendurkan dawai kawat saat menyetem
                            nada.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            DADAMPAR
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Dadampar:
                            </strong>{" "}
                            Bantalan landasan melintang tempat tumpuan pangkal
                            kawat dawai sebelum diarahkan menuju inang dan pasak
                            penala.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            BENGEUT / RARAY
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Bengeut / Raray:
                            </strong>{" "}
                            Bidang muka permukaan atas papan suara
                            (*soundboard*) tempat dawai membentang dan tempat
                            berdirinya inang penyangga nada.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            PONGPOK
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Pongpok:
                            </strong>{" "}
                            Bagian ujung atau moncong penutup bawah di kedua
                            sisi badan kacapi yang menyatukan dinding samping
                            (*papalayu*) dan dasar badan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sheet 2 (02/03) */}
                  <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
                    <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="font-bold text-sm sm:text-base">
                          Lembar Kajian 02/03 — Kawat Dawai, Tumpang Sari /
                          Inang & Liang Pureut
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="rounded-none font-mono text-xs"
                      >
                        organologi2.jpg (02/03)
                      </Badge>
                    </div>

                    <div
                      className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
                      onClick={() =>
                        openLightbox({
                          title:
                            "Visualisasi 3D Organologi Kacapi Indung (02/03)",
                          category: "Organologi Kacapi Indung",
                          type: "image",
                          src: "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi2.jpg",
                          desc: "Lembar 02/03: Detail Kawat/Rarambut, Tumpang Sari / Inang, Papalayu, Liang Pureut, dan model 3D pasak Pureut.",
                        })
                      }
                    >
                      <Image
                        src={encodeURI(
                          "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi2.jpg",
                        )}
                        alt="Visualisasi 3D Organologi Kacapi Indung 02/03"
                        fill
                        className="object-contain p-3"
                      />
                      <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg">
                          <Maximize2 className="w-4 h-4" /> Buka Lembar Penuh
                          (Resolusi Asli)
                        </span>
                      </div>
                    </div>

                    {/* Detailed Glossary of All Directional Arrows in Image 2 */}
                    <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          Makna & Fungsi Penunjuk Arah pada Lembar 02/03:
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            KAWAT / RARAMBUT
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Kawat / Rarambut:
                            </strong>{" "}
                            Senar dawai kawat logam baja tipis yang diregangkan
                            di atas papan suara, menjadi sumber getaran utama
                            penghasil nada petikan.
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
                            Kuda-kuda kecil kayu berbentuk piramida terpancung
                            dengan takik di atasnya, berfungsi membatasi panjang
                            getar senar dan menghantarkan energi getar ke
                            resonator.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            PAPALAYU
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Papalayu:
                            </strong>{" "}
                            Dinding samping atau lambung badan kacapi yang
                            kokoh, tempat deretan lubang penala (*liang pureut*)
                            dibuat.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            LIANG PUREUT
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Liang Pureut:
                            </strong>{" "}
                            Deretan lubang presisi pada dinding papalayu tempat
                            pasak penala masuk dan mengunci senar kawat.
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
                            Pasak kayu berbentuk poros silinder berulir lembut
                            dengan kepala pegangan untuk memudahkan jemari
                            pemain memutar dan menala dawai.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            BENGEUT & GELUNG
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Bengeut & Gelung:
                            </strong>{" "}
                            Sudut pandang potong menunjukkan keterkaitan antara
                            lengkungan mahkota gelung dan bidang datar papan
                            suara bengeut.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sheet 3 (03/03) */}
                  <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
                    <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="font-bold text-sm sm:text-base">
                          Lembar Kajian 03/03 — Skema Blueprint, Susumuran &
                          Geometri Susu/Tumpangsari
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="rounded-none font-mono text-xs"
                      >
                        organologi3.jpg (03/03)
                      </Badge>
                    </div>

                    <div
                      className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
                      onClick={() =>
                        openLightbox({
                          title:
                            "Visualisasi 3D Organologi Kacapi Indung (03/03)",
                          category: "Organologi Kacapi Indung",
                          type: "image",
                          src: "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi3.jpg",
                          desc: "Lembar 03/03: Skema teknis Susumuran, Lidah/Leletah, Bobokong, Gelung, dan penampang Susu/Tumpangsari.",
                        })
                      }
                    >
                      <Image
                        src={encodeURI(
                          "/images/projects/3d-model/Visualisasi 3D Organologi Kacapi Indung/organologi3.jpg",
                        )}
                        alt="Visualisasi 3D Organologi Kacapi Indung 03/03"
                        fill
                        className="object-contain p-3"
                      />
                      <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg">
                          <Maximize2 className="w-4 h-4" /> Buka Lembar Penuh
                          (Resolusi Asli)
                        </span>
                      </div>
                    </div>

                    {/* Detailed Glossary of All Directional Arrows in Image 3 */}
                    <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          Makna & Fungsi Penunjuk Arah pada Lembar 03/03:
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            SUSUMURAN
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Susumuran:
                            </strong>{" "}
                            Lubang resonansi di bagian dasar bawah badan kacapi
                            (*seperti sumur*), berfungsi mengalirkan gelombang
                            udara resonansi dari dalam rongga badan ke luar.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            LIDAH / LELETAH
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Lidah / Leletah:
                            </strong>{" "}
                            Celah sempit lidah pada lubang susumuran yang
                            mengontrol kompresi udara akustik di dalam rongga
                            resonansi.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            BOBOKONG
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Bobokong:
                            </strong>{" "}
                            Ruang rongga cekungan bawah / punggung badan kacapi
                            yang membentuk wadah akustik (*resonating chamber*)
                            pembesar suara.
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
                            Diagram geometris inang tampak samping
                            (segitiga/trapesium) dan tampak atas (persegi dengan
                            garis diagonal dan takik tumpuan kawat).
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
                            Gambar proyeksi teknis lengkungan mahkota ujung
                            kacapi yang memperlihatkan kurva kehalusan pahatan
                            kayu.
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
                            Perspektif 3D bawah menunjukkan pertemuan antara
                            dinding lambung samping papalayu dan bingkai
                            pengikat bengker.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                FOLDER 4: VISUALISASI 3D KARINDING
                ========================================================================= */}
            {activeFolder === "karinding" && (
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
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
                    <Box className="w-3.5 h-3.5" />
                    <span>Instrumen Purba Tatar Sunda</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Visualisasi 3D Karinding & Filosofi Yakin Sadar Sabar
                  </h3>

                  <div className="text-muted-foreground leading-relaxed text-sm sm:text-base space-y-3">
                    <p>
                      <strong>Karinding</strong> adalah alat musik tradisional
                      masyarakat Sunda yang terbuat dari pelepah kawung (batang
                      pohon aren) atau <em>Awi</em> (bambu). Sebuah alat musik
                      yang cukup tua yang konon telah digunakan oleh para{" "}
                      <em>karuhun</em> (leluhur) sejak zaman sebelum
                      ditemukannya Kacapi, di mana usia Kacapi itu sendiri sudah
                      mencapai lebih dari 500 tahun yang lalu. Diperkirakan
                      Karinding sudah berusia lebih dari{" "}
                      <strong>600 tahun</strong> dan bahkan ada yang menyebutkan
                      bahwa alat ini telah dipergunakan sejak zaman purba era
                      megalitikum.
                    </p>
                    <p>
                      Instrumen sejenis Karinding tidak hanya ada di Tatar
                      Sunda, melainkan tersebar luas di berbagai daerah dan
                      belahan dunia: di Bali dikenal dengan sebutan{" "}
                      <strong>Genggong</strong>, di Kalimantan disebut{" "}
                      <strong>Tung</strong>, di Tibet dikenal sebagai{" "}
                      <strong>Juliab</strong>, hingga di Mongol disebut{" "}
                      <strong>Xomits</strong>.
                    </p>
                    <p>
                      Karinding dimainkan dengan cara ditempelkan di rongga
                      mulut lalu ditabuh/disentil ujungnya atau melalui tali.
                      Getaran antara bilah Karinding dan rongga mulut yang
                      digabung dengan hembusan udara menghasilkan resonansi
                      suara khas yang unik:{" "}
                      <em>&ldquo;Tweew.. tweew...&rdquo;</em>. Karinding
                      memiliki nada titian yang khas dan paten (misal laras F
                      atau D), dengan ukuran proporsi standar panjang{" "}
                      <strong>10 cm</strong> dan lebar <strong>2 cm</strong>.
                    </p>
                  </div>
                </div>

                {/* FILOSOFI YAKIN, SADAR, SABAR CARDS */}
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                      Filosofi Yakin, Sadar & Sabar pada 3 Bagian Anatomi
                      Karinding
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Dibalik kesederhanaan bentuknya, Karinding menyimpan
                      kekayaan intelektualitas dan nilai luhur kehidupan.
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
                          Pancepengan adalah bagian pangkal yang harus dipegang
                          dengan baik oleh pemain Karinding—tidak usah terlalu
                          erat, yang penting pas dan mantap.
                        </p>
                      </div>
                      <div className="p-3 bg-muted/20 border border-border/40 text-xs text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">
                          Makna Filosofis:
                        </strong>{" "}
                        Mengandung nilai <em>yakin</em>—bahwa seseorang harus
                        yakin dengan apa yang ia pegang sebelum dimainkan, yakin
                        ia mampu melakukannya, dan yakin apa yang dimainkan
                        bermanfaat bagi banyak orang. Keyakinan meniupkan
                        semangat positif <em>&ldquo;Aku Bisa!&rdquo;</em> untuk
                        membuka potensi diri dalam kerendahan hati, ikhlas, dan
                        tawakal.
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
                          Cecet ucing adalah bilah buluh bambu tipis dan lentur
                          di bagian tengah yang bergetar menghasilkan resonansi
                          bunyi saat bagian penabuh disentil.
                        </p>
                      </div>
                      <div className="p-3 bg-muted/20 border border-border/40 text-xs text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">
                          Makna Filosofis:
                        </strong>{" "}
                        Menggambarkan nilai <em>kesadaran (sadar)</em> dalam
                        mengolah napas, vokal, dan rongga mulut. Suara getaran
                        hanya akan teramplifikasi merdu apabila pemain sadar
                        penuh mengontrol artikulasi rongga mulut tanpa
                        memaksakan kehendak.
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
                          Panenggeulan adalah bagian ujung bilah yang
                          ditabuh/disentil secara ritmis menggunakan jari
                          telunjuk tangan kanan.
                        </p>
                      </div>
                      <div className="p-3 bg-muted/20 border border-border/40 text-xs text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">
                          Makna Filosofis:
                        </strong>{" "}
                        Menabuh Karinding harus dilakukan dengan penuh{" "}
                        <em>kesabaran</em>—tidak tergesa-gesa, tidak terlalu
                        cepat, tidak terlalu keras, dan tidak terlalu pelan,
                        melainkan pas di tengah-tengah. Sebaik-baik urusan
                        adalah yang berada di tengah-tengah, agar suara yang
                        keluar semantap keyakinan yang dipegang.
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
                      Visualisasi proporsi 10 cm x 2 cm, serat bambu alami, dan
                      kelenturan jarum getar cecet ucing.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      onClick={() =>
                        openLightbox({
                          title: "Model 3D Karinding Bambu (Proporsi Presisi)",
                          category: "Visualisasi 3D Karinding",
                          type: "image",
                          src: "/images/projects/3d-model/Visualisasi 3D Karinding/karining.png",
                          desc: "Pemodelan 3D Karinding bambu tradisional dengan 3 bagian anatomi lengkap: Pancepengan (pegangan), Cecet Ucing (jarum getar), dan Panenggeulan (ujung penabuh) dalam ukuran standar 10 cm x 2 cm.",
                        })
                      }
                      className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
                    >
                      <div className="relative aspect-16/10 w-full bg-black/40 overflow-hidden">
                        <Image
                          src={encodeURI(
                            "/images/projects/3d-model/Visualisasi 3D Karinding/karining.png",
                          )}
                          alt="3D Model Karinding Bambu"
                          fill
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
                          pancepengan, celah getar cecet ucing, dan
                          panenggeulan.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() =>
                        openLightbox({
                          title:
                            "Detail Tekstur Serat Bambu & Jarum Cecet Ucing",
                          category: "Visualisasi 3D Karinding",
                          type: "image",
                          src: "/images/projects/3d-model/Visualisasi 3D Karinding/karining2.png",
                          desc: "Detail tekstur serat bambu alami (bump map), ketipisan bilah cecet ucing penghasil getaran frekuensi nada, dan dudukan panyepengan.",
                        })
                      }
                      className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all"
                    >
                      <div className="relative aspect-16/10 w-full bg-black/40 overflow-hidden">
                        <Image
                          src={encodeURI(
                            "/images/projects/3d-model/Visualisasi 3D Karinding/karining2.png",
                          )}
                          alt="3D Karinding Detail Serat & Cecepet"
                          fill
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
                          Penerapan material procedural bump mapping serat bambu
                          dan celah udara mikro tempat getaran beresonansi.
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
                      Studi detail tahapan konstruksi 3D, bilah cecet ucing, dan
                      tampak penampang Karinding.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      {
                        num: "1",
                        title:
                          "View 01 — Rangka Dasar Tanpa Cecet Ucing (Tampak Atas)",
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
                        title:
                          "View 03 — Pembagian 3 Segmen Anatomi (Tampak Atas)",
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
                        desc: "Tampak bawah yang memperlihatkan rongga akustik, ketebalan dinding pembatas, serta sambungan dari cecet ucing menuju panenggeulan.",
                      },
                    ].map((item) => (
                      <div
                        key={item.num}
                        onClick={() =>
                          openLightbox({
                            title: item.title,
                            category: "Visualisasi 3D Karinding",
                            type: "image",
                            src: `/images/projects/3d-model/Visualisasi 3D Karinding/${item.num}.png`,
                            desc: item.desc,
                          })
                        }
                        className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden cursor-pointer hover:border-primary/60 transition-all flex flex-col justify-between"
                      >
                        <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                          <Image
                            src={encodeURI(
                              `/images/projects/3d-model/Visualisasi 3D Karinding/${item.num}.png`,
                            )}
                            alt={`Karinding 3D ${item.title}`}
                            fill
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
            )}

            {/* =========================================================================
                FOLDER 4: ORGANOLOGI TARAWANGSA (SUMEDANG & JENTRENG + VIDEO WALKTHROUGH)
                ========================================================================= */}
            {activeFolder === "organologi-tarawangsa" && (
              <motion.div
                key="folder-organologi-tarawangsa"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-10"
              >
                {/* Folder Header */}
                <div className="p-6 sm:p-8 bg-card/60 border border-border/60 backdrop-blur-md">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                    Visualisasi 3D Organologi Tarawangsa Sumedang
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    Tarawangsa merupakan salah satu jenis alat kesenian rakyat
                    Jawa Barat. Istilah tarawangsa memiliki dua pengertian dan
                    pemaknaan. Pemaknaannya, menurut seorang pupuhu dan ahli
                    etnomusikologi, adalah alat musik gesek yang memiliki dua
                    dawai yang terbuat dari kawat baja atau besi. Pengertian
                    lainnya,{" "}
                    <em>
                      &lsquo;Ta&rsquo;tabeuhan &lsquo;Ra&rsquo;kyat
                      &lsquo;Wa&rsquo;li Salapan / nara&lsquo;wang&rsquo; ka Nu
                      Maha E&rsquo;sa&rsquo;
                    </em>
                    .
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mt-3">
                    Tarawangsa dimainkan dengan cara digesek pada dawai yang
                    paling dekat kepada pemain, sedangkan dawai satunya dipetik
                    dengan jari telunjuk tangan kiri. Dalam sebuah ensambel
                    musik, Tarawangsa dimainkan bersama instrumen petik tujuh
                    dawai yang menyerupai kecapi, yang disebut{" "}
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
                          Lembar 01 — Pengantar, Sejarah & Filosofi Tarawangsa
                          Sumedang
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="rounded-none font-mono text-xs"
                      >
                        Page 1.png
                      </Badge>
                    </div>

                    <div
                      className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
                      onClick={() =>
                        openLightbox({
                          title:
                            "Visualisasi 3D Organologi Tarawangsa Sumedang (Page 1)",
                          category: "Organologi Tarawangsa",
                          type: "image",
                          src: "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 1.png",
                          desc: "Lembar 01: Sejarah Tarawangsa di abad ke-10, naskah kuno Sewaka Darma, dokumentasi riset foto lapangan, dan model 3D Tarawangsa.",
                        })
                      }
                    >
                      <Image
                        src={encodeURI(
                          "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 1.png",
                        )}
                        alt="Visualisasi 3D Organologi Tarawangsa Sumedang Page 1"
                        fill
                        className="object-contain p-3"
                      />
                      <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg">
                          <Maximize2 className="w-4 h-4" /> Buka Lembar Penuh
                          (Resolusi Asli)
                        </span>
                      </div>
                    </div>

                    {/* Detailed Glossary of Content in Page 1 */}
                    <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          Kandungan Makna & Data Historis pada Lembar 01:
                        </span>
                      </div>

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
                              &lsquo;Wa&rsquo;li Salapan /
                              nara&lsquo;wang&rsquo; ka Nu Maha
                              E&rsquo;sa&rsquo;
                            </em>
                            , bermakna media tetabuhan musik persembahan rasa
                            syukur rakyat kepada Sang Pencipta.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            KITAB ABAD KE-10
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Usia Lebih Tua dari Rebab:
                            </strong>{" "}
                            Kata tarawangsa ditemukan dalam naskah/literatur
                            abad ke-10 di Bali dengan sebutan <em>trewasa</em>{" "}
                            dan <em>trewangsah</em> (Didi Wiardi, 2008),
                            membuktikan eksistensinya sebelum instrumen gesek
                            lain berkembang.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            NASKAH SEWAKA DARMA
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Rujukan Kuno Sunda:
                            </strong>{" "}
                            Naskah kuno Sunda <em>Sewaka Darma</em> secara
                            eksplisit mencatat nama tarawangsa sebagai salah
                            satu alat musik utama tradisi (Kurnia, 2003).
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            RISET FOTO LAPANGAN
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Dokumentasi Praktisi:
                            </strong>{" "}
                            Foto-foto pengrajin, bentuk fisik instrumen asli di
                            sanggar seni, serta posisi tubuh pemain saat
                            menggesek dan memetik dawai.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60 col-span-1 md:col-span-2">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            3D MODEL TARAWANGSA & PANGESET
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Rekonstruksi Digital:
                            </strong>{" "}
                            Model 3D utuh menampilkan proporsi tiang ramping
                            kayu, kotak resonator parungpung, serta busur gesek
                            (*pangeset*) yang tergantung di tiang instrumen.
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
                          Lembar 02 — Bagian-bagian pada Tarawangsa (Blueprint &
                          Anatomi Lengkap)
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="rounded-none font-mono text-xs"
                      >
                        Page 2.png
                      </Badge>
                    </div>

                    <div
                      className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
                      onClick={() =>
                        openLightbox({
                          title: "Bagian-bagian pada Tarawangsa (Page 2)",
                          category: "Organologi Tarawangsa",
                          type: "image",
                          src: "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 2.png",
                          desc: "Lembar 02: Skematik tampak depan, samping, belakang, dan pangeset (busur) Tarawangsa model buatan Bapak Pupung Supena (Sanggar Seni Sunda Lugina).",
                        })
                      }
                    >
                      <Image
                        src={encodeURI(
                          "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 2.png",
                        )}
                        alt="Bagian-bagian pada Tarawangsa Page 2"
                        fill
                        className="object-contain p-3"
                      />
                      <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg">
                          <Maximize2 className="w-4 h-4" /> Buka Lembar Penuh
                          (Resolusi Asli)
                        </span>
                      </div>
                    </div>

                    {/* Detailed Glossary of All Directional Arrows in Page 2 */}
                    <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                          <BookOpen className="w-4 h-4" />
                          <span>
                            Makna & Penjelasan Semua Arah Penunjuk pada Lembar
                            02:
                          </span>
                        </div>
                        <span className="text-[11px] text-muted-foreground italic">
                          *Model: Tarawangsa Sumedang buatan Bpk. Pupung Supena
                          (Sanggar Seni Sunda Lugina)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            PUCUK
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Pucuk:</strong>{" "}
                            Bagian ujung mahkota berukir di atas tiang
                            Tarawangsa yang memiliki ornamen lengkungan khas
                            tradisi Sumedang.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            PUREUT
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Pureut:</strong>{" "}
                            Sepasang pasak penala kayu kiri dan kanan di bagian
                            atas tiang untuk menyetel dan mengunci nada kedua
                            dawai kawat.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            TIHANG
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Tihang:</strong>{" "}
                            Tiang/leher kayu vertikal panjang yang menjadi jalur
                            rentangan dawai dari pucuk menuju kotak resonator
                            bawah.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            KAWAT
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Kawat:</strong>{" "}
                            Dua helai dawai kawat baja/besi: satu dawai utama di
                            sisi dalam untuk digesek dan satu dawai pengiring di
                            sisi luar untuk dipetik.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            TAKTAK
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Taktak:</strong>{" "}
                            Bahu / bidang penutup atas kotak resonator
                            (*parungpung*) yang menghubungkan kotak dengan tiang
                            (*tihang*).
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
                            Parungpung adalah wadah gema (resonator). Raray
                            adalah papan muka depan tempat inang bertumpu dan
                            dawai bergetar.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            INANG
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Inang:</strong>{" "}
                            Kuda-kuda kecil penyangga dawai di atas permukaan
                            raray yang menyalurkan energi getaran dawai ke dalam
                            kotak parungpung.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            BOBOKONG & UDEL
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Bobokong & Udel:
                            </strong>{" "}
                            Bobokong adalah dinding belakang kotak resonator.
                            Udel adalah lubang suara bulat di tengah bobokong
                            tempat keluarnya resonansi akustik.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            SUKU
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Suku:</strong>{" "}
                            Kaki-kaki penyangga kayu di dasar bawah kotak
                            resonator agar instrumen dapat berdiri tegak dan
                            stabil saat dimainkan.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60 col-span-1 md:col-span-2 lg:col-span-3">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            PANGESET (BUSUR PENGGESEK)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground pt-1">
                            <div>
                              <strong className="text-foreground">
                                Congo:
                              </strong>{" "}
                              Ujung atas tangkai busur penggesek yang
                              melengkung.
                            </div>
                            <div>
                              <strong className="text-foreground">
                                Rambut:
                              </strong>{" "}
                              Helai serat ekor kuda/benang halus penggesek kawat
                              dawai.
                            </div>
                            <div>
                              <strong className="text-foreground">
                                Bagal:
                              </strong>{" "}
                              Pangkal tangkai busur tempat tangan kanan pemain
                              memegang.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Page 3 */}
                  <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
                    <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="font-bold text-sm sm:text-base">
                          Lembar 03 — Bagian-bagian pada Jentreng (Balungan
                          Gending Tarawangsa)
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="rounded-none font-mono text-xs"
                      >
                        Page 3.png
                      </Badge>
                    </div>

                    <div
                      className="relative w-full aspect-16/10 bg-black/20 cursor-pointer group"
                      onClick={() =>
                        openLightbox({
                          title: "Bagian-bagian pada Jentreng (Page 3)",
                          category: "Organologi Tarawangsa",
                          type: "image",
                          src: "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 3.png",
                          desc: "Lembar 03: Instrumen petik 7 dawai Jentreng sebagai balungan/kerangka gending skala pentatonis pelog, madenda, dan salendro.",
                        })
                      }
                    >
                      <Image
                        src={encodeURI(
                          "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 3.png",
                        )}
                        alt="Bagian-bagian pada Jentreng Page 3"
                        fill
                        className="object-contain p-3"
                      />
                      <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-background/90 text-foreground border border-border text-xs font-semibold flex items-center gap-2 shadow-lg">
                          <Maximize2 className="w-4 h-4" /> Buka Lembar Penuh
                          (Resolusi Asli)
                        </span>
                      </div>
                    </div>

                    {/* Detailed Glossary of All Directional Arrows in Page 3 */}
                    <div className="p-6 border-t border-border/40 bg-muted/10 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          Makna & Penjelasan Semua Arah Penunjuk pada Lembar 03
                          (Jentreng):
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            JEN-TRÉNG
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Balungan Gending:
                            </strong>{" "}
                            Instrumen petik 7 dawai pengiring Tarawangsa yang
                            berfungsi sebagai kerangka melodi (*balungan*) pada
                            laras pentatonis *pelog*, *madenda*, dan *salendro*.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            GELUNG & PONGPOK
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">
                              Gelung & Pongpok:
                            </strong>{" "}
                            Gelung adalah lengkungan artistik di ujung
                            atas/bawah. Pongpok adalah bidang penutup ujung
                            badan Jentreng.
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
                            Mata Itik adalah lubang kaitan dawai di bagian atas
                            raray. Inang adalah kuda-kuda penyangga senar untuk
                            mengatur titinada.
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
                            Dadampar adalah landasan pangkal dawai. Tumpang Sari
                            adalah penyangga tumpuan dawai sebelum kawat
                            terhubung ke pasak penala bawah.
                          </p>
                        </div>

                        <div className="p-3.5 bg-background/60 border border-border/60">
                          <div className="text-xs font-mono text-primary font-bold mb-1">
                            PUREUT (7 PASAK PENALA)
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Pureut:</strong>{" "}
                            Tujuh pasak penala kayu di bagian bawah dadampar
                            untuk menyetem ketegangan masing-masing dari 7 kawat
                            Jentreng.
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
                            Bobokong adalah dinding belakang badan Jentreng.
                            Lidah/Leletah adalah lubang resonansi memanjang di
                            bobokong tempat pelepasan suara gema.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Walkthrough Section (Page 4 & 5) */}
                <div className="space-y-6 pt-4 border-t border-border/60">
                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                      Video Animasi 3D & Walkthrough (MP4)
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Animasi pergerakan kamera sinematik menelusuri detail
                      instrumen Tarawangsa dan ruang visualisasi 3D.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Video 1 */}
                    <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
                      <div className="px-4 py-3 bg-muted/40 border-b border-border/60 flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                          <Film className="w-4 h-4 text-primary" /> Animasi
                          Flythrough — Part 1
                        </span>
                        <Badge
                          variant="outline"
                          className="rounded-none font-mono text-[10px]"
                        >
                          Page 4.mp4
                        </Badge>
                      </div>

                      <div className="relative aspect-video w-full bg-black">
                        <video
                          src={encodeURI(
                            "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 4.mp4",
                          )}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4 text-xs text-muted-foreground leading-relaxed">
                        Animasi camera flythrough 3D dinamis menelusuri proporsi
                        kelengkungan badan dan leher instrumen Tarawangsa.
                      </div>
                    </div>

                    {/* Video 2 */}
                    <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg">
                      <div className="px-4 py-3 bg-muted/40 border-b border-border/60 flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                          <Film className="w-4 h-4 text-primary" /> Animasi
                          Motion & Lighting — Part 2
                        </span>
                        <Badge
                          variant="outline"
                          className="rounded-none font-mono text-[10px]"
                        >
                          Page 5.mp4
                        </Badge>
                      </div>

                      <div className="relative aspect-video w-full bg-black">
                        <video
                          src={encodeURI(
                            "/images/projects/3d-model/Visualisasi 3D Organologi Tarawangsa/Page 5.mp4",
                          )}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4 text-xs text-muted-foreground leading-relaxed">
                        Animasi gerak kamera mendalam dengan simulasi
                        pencahayaan ruangan dan interaksi bayangan pada
                        permukaan 3D.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                FOLDER 5: TERMINAL BANDARA BADE (AIR SIDE & LAND SIDE)
                ========================================================================= */}
            {activeFolder === "terminal-bade" && (
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
                    Perancangan dan visualisasi 3D arsitektur bangunan Terminal
                    Bandar Udara Bade. Desain dikelompokkan menjadi dua zona
                    operasional bandar udara utama:{" "}
                    <strong>Air Side (AS)</strong> untuk Sisi Udara (pergerakan
                    pesawat, apron, dan peron) serta{" "}
                    <strong>Land Side (LS)</strong> untuk Sisi Darat (akses
                    publik, drop-off, dan plaza lanskap).
                  </p>
                </div>

                {/* Sub-Section 1: AIR SIDE (AS) */}
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-primary" />
                      <h4 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                        Zona 1: Air Side (AS) — Sisi Udara
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Kawasan pergerakan pesawat udara, apron pelataran pesawat,
                      pintu keberangkatan (boarding gate), dan kanopi selasar
                      sisi landasan.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        code: "2604 AS1.png",
                        label: "Air Side 1 (AS1)",
                        desc: "Visualisasi tata letak apron dan boarding lounge menghadap landasan pacu.",
                      },
                      {
                        code: "2604 AS2.png",
                        label: "Air Side 2 (AS2)",
                        desc: "Perspektif gerbang keberangkatan penumpang menuju area parkir pesawat.",
                      },
                      {
                        code: "2604 AS3.png",
                        label: "Air Side 3 (AS3)",
                        desc: "Detail kanopi pelindung cuaca di peron penumpang sisi udara.",
                      },
                    ].map((as) => (
                      <div
                        key={as.code}
                        onClick={() =>
                          openLightbox({
                            title: `Terminal Bandara Bade - ${as.label}`,
                            category: "Terminal Bandara Bade",
                            badge: "Air Side (AS)",
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
                          <p className="text-xs text-muted-foreground mt-1">
                            {as.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-Section 2: LAND SIDE (LS) */}
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      <h4 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                        Zona 2: Land Side (LS) — Sisi Darat
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Kawasan akses publik penumpang, drop-off kendaraan,
                      sirkulasi jalan utama, gerbang masuk terminal, dan plaza
                      selasar pejalan kaki.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        code: "2604 LS1.png",
                        label: "Land Side 1 (LS1)",
                        desc: "Area drop-off kendaraan roda empat dan selasar kedatangan penumpang.",
                      },
                      {
                        code: "2604 LS2.png",
                        label: "Land Side 2 (LS2)",
                        desc: "Plaza pejalan kaki, penataan vegetasi lanskap hijau, dan jalur pedestrian.",
                      },
                      {
                        code: "2604 LS3.png",
                        label: "Land Side 3 (LS3)",
                        desc: "Fasad depan utama gedung terminal dari sudut pandang jalan akses masuk.",
                      },
                    ].map((ls) => (
                      <div
                        key={ls.code}
                        onClick={() =>
                          openLightbox({
                            title: `Terminal Bandara Bade - ${ls.label}`,
                            category: "Terminal Bandara Bade",
                            badge: "Land Side (LS)",
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
                          <p className="text-xs text-muted-foreground mt-1">
                            {ls.desc}
                          </p>
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
                      Koleksi render interior check-in hall, boarding lounge
                      kaca, simulasi bayangan matahari, dan master panorama
                      kawasan.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      {
                        file: "TERMINAL (1).png",
                        title: "Fasad Terminal 1",
                        desc: "Tampak depan aerodinamis.",
                      },
                      {
                        file: "TERMINAL (2).png",
                        title: "Selasar Terminal 2",
                        desc: "Akses koridor drop-off.",
                      },
                      {
                        file: "TERMINAL (3).png",
                        title: "Interior Check-in 3",
                        desc: "Aula keberangkatan.",
                      },
                      {
                        file: "TERMINAL (4).png",
                        title: "Boarding Gate 4",
                        desc: "Kaca panorama apron.",
                      },
                      {
                        file: "TERMINAL (5).png",
                        title: "Master Overview 5",
                        desc: "Bird-eye view kawasan.",
                      },
                      {
                        file: "11.png",
                        title: "Simulasi Matahari 11",
                        desc: "Studi direct sunlight.",
                      },
                      {
                        file: "22.png",
                        title: "Simulasi Bayangan 22",
                        desc: "Refleksi kaca sore.",
                      },
                      {
                        file: "33.png",
                        title: "Eye-Level View 33",
                        desc: "Sudut pandang pejalan kaki.",
                      },
                      {
                        file: "untitled.png",
                        title: "Master Render 1",
                        desc: "Detail tekstur perkerasan.",
                      },
                      {
                        file: "untitled2.png",
                        title: "Master Render 2",
                        desc: "Panorama lansekap terpadu.",
                      },
                    ].map((item) => (
                      <div
                        key={item.file}
                        onClick={() =>
                          openLightbox({
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
            )}

            {/* =========================================================================
                FOLDER 6: ETC (PROPS & KARYA LAINNYA)
                ========================================================================= */}
            {activeFolder === "etc" && (
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
                    Koleksi eksperimen pemodelan objek 3D pendukung: mulai dari
                    eksperimen <strong>Procedural Shader Nodes</strong> untuk
                    menghasilkan motif loreng Teko Blirik/Cendol vintage tanpa
                    image texture, perhiasan Sundanese &lsquo;The One&rsquo;
                    Ring beraksara Sunda kuno, pemodelan 3D Kujang pusaka,
                    hingga radio transistor retro.
                  </p>
                </div>

                {/* Highlight: Teko Blirik Procedural Shader */}
                <div className="border border-border/60 bg-card/60 backdrop-blur-md p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div
                      className="lg:col-span-6 relative aspect-4/3 w-full bg-black/40 overflow-hidden cursor-pointer group border border-border/60"
                      onClick={() =>
                        openLightbox({
                          title:
                            "Teko Blirik / Teko Cendol (Procedural Shader Node)",
                          category: "etc (Procedural Shader)",
                          type: "image",
                          src: "/images/projects/3d-model/etc/teko blirik.jpg",
                          desc: "Teko enamel klasik motif loreng blirik nusantara yang dibuat menggunakan procedural material nodes di Blender tanpa tekstur gambar eksternal.",
                        })
                      }
                    >
                      <Image
                        src={encodeURI(
                          "/images/projects/3d-model/etc/teko blirik.jpg",
                        )}
                        alt="Teko Blirik Procedural Shader Node"
                        fill
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
                        <Sliders className="w-3.5 h-3.5" /> Procedural Shader
                        Node
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
                        Teko Blirik / Cendol Enamel Vintage
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Teko blirik merupakan teko seng enamel legendaris dengan
                        motif bercak hijau-putih. Pada proyek ini, seluruh motif
                        bercak loreng diolah secara matematis menggunakan{" "}
                        <strong>Shader Nodes di Blender</strong> (menggabungkan
                        Voronoi, Musgrave, dan Noise Texture) sehingga motif
                        bersifat resolusi tak terbatas (*infinite procedural
                        detail*).
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
                      Koleksi perangkat radio retro, piring seng jadul,
                      perhiasan cingcin akik, dan hunian tropis.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      {
                        file: "radio.png",
                        title: "Radio Lawas Vintage",
                        desc: "Radio transistor retro analog.",
                      },
                      {
                        file: "piring.png",
                        title: "Piring Seng Enamel",
                        desc: "Piring seng lis klasik.",
                      },
                      {
                        file: "cingcin.jpg",
                        title: "Sundanese 'The One' Ring",
                        desc: "Cincin Emas bertuliskan 'beurang kapilis ku wengi, caang kapurug ku hujan' dalam aksara sunda kuna yang artinya 'tidak ada yang abadi'",
                      },
                      {
                        file: "kujang5.png",
                        title: "Kujang 3D Wireframe & Mesh",
                        desc: "Topologi 3D wireframe bilah berpamor senjata pusaka Kujang Sunda.",
                      },
                      {
                        file: "kuriak.png",
                        title: "Rumah Model Badak Heuay",
                        desc: "Model rumah Sunda tradisional dengan atap badak heuay.",
                      },
                      {
                        file: "garmer.png",
                        title: "Gudang Garam Merah",
                        desc: "Setup pencahayaan studio untuk rokok Gudang Garam Merah",
                      },
                    ].map((prop) => (
                      <div
                        key={prop.file}
                        onClick={() =>
                          openLightbox({
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
                            src={encodeURI(
                              `/images/projects/3d-model/etc/${prop.file}`,
                            )}
                            alt={prop.title}
                            fill
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
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM ACTION */}
        <div className="pt-16 flex items-center justify-center">
          <Link href="/#projects">
            <Button
              variant="outline"
              className="rounded-none border-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors duration-300 font-semibold px-6 py-2"
            >
              Kembali Ke Portofolio Utama
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
      <BackToTop />

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-background/95 backdrop-blur-md p-3 sm:p-6 md:p-10"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-120 rounded-none bg-background/60 hover:bg-background border border-border text-foreground cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-card border border-border shadow-2xl overflow-hidden cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media Viewport */}
              <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black/90 flex items-center justify-center overflow-hidden">
                {selectedLightbox.type === "video" ? (
                  <video
                    src={encodeURI(selectedLightbox.src)}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={encodeURI(selectedLightbox.src)}
                    alt={selectedLightbox.title}
                    fill
                    className="object-contain"
                    priority
                    quality={100}
                  />
                )}
              </div>

              {/* Bottom Metadata Bar */}
              <div className="p-4 sm:p-6 bg-card border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold px-2 py-0.5 bg-primary/10 border border-primary/30 text-primary">
                      {selectedLightbox.category}
                    </span>

                    {selectedLightbox.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 font-mono">
                        {selectedLightbox.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {selectedLightbox.title}
                  </h3>
                  {selectedLightbox.desc && (
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {selectedLightbox.desc}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={encodeURI(selectedLightbox.src)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-border bg-background hover:bg-muted text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Resolusi Asli</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
