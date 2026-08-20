import {
  Film,
  Sparkles,
  Box,
  Music2,
  Plane,
  FolderGit2,
  Folder,
  FolderOpen,
} from "lucide-react";
import type { YouTubeVideo, FolderTabConfig } from "./types";

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: "yt-kacapi",
    youtubeId: "O7wPGH63Gv0",
    title: "Membuat 3D Model Kacapi di Blender 2.90",
    subtitle: "Timelapse & Modelling Tutorial",
    desc: "Proses pemodelan 3D instrumen musik tradisional Sunda (Kacapi Indung) mulai dari body resonansi, inang, kawat dawai, hingga tekstur kayu alami menggunakan Blender 2.90.",
    software: "Blender 2.90",
    url: "https://youtu.be/O7wPGH63Gv0?si=T3cfcsQx5f6wwVbx",
  },
  {
    id: "yt-kujang",
    youtubeId: "fuHONWHJA-0",
    title: "Kujang 3D Model - Blender 2.91",
    subtitle: "Cultural Weapon 3D Showcase",
    desc: "Pemodelan 3D Kujang, senjata pusaka dan simbol budaya khas Tatar Sunda Jawa Barat, dengan lekukan bilah berornamen dan gagang kayu tradisional.",
    software: "Blender 2.91",
    url: "https://youtu.be/fuHONWHJA-0?si=ophq2o2kzY46-nGa",
  },
  {
    id: "yt-teko",
    youtubeId: "qLyR3ifmKUA",
    title: "Blender Node Teko Cendol / Teko Blirik - Blender 2.90",
    subtitle: "Procedural Shader & Material Nodes",
    desc: "Eksplorasi procedural shader nodes untuk menghasilkan motif loreng bintik khas teko blirik/cendol enamel vintage tanpa UV image texture eksternal.",
    software: "Blender 2.90",
    url: "https://youtu.be/qLyR3ifmKUA?si=azRMR63B6rxtAHY5",
  },
];

export const FOLDERS: FolderTabConfig[] = [
  {
    id: "organologi-tarawangsa",
    number: "01",
    name: "Visualisasi 3D Organologi Tarawangsa",
    shortLabel: "Organologi Tarawangsa",
    icon: FolderOpen,
    tagline:
      "Rangkaian Kajian Organologi Tarawangsa & Jentreng (Page 1-3) + Video 3D (Page 4-5)",
    itemCount: 5,
  },
  {
    id: "organologi-kacapi",
    number: "02",
    name: "Visualisasi 3D Organologi Kacapi Indung",
    shortLabel: "Organologi Kacapi",
    icon: FolderOpen,
    tagline:
      "Dokumentasi Kajian Organologi Bersambung (Lembar 01/03, 02/03, 03/03)",
    itemCount: 3,
  },
  {
    id: "karinding",
    number: "03",
    name: "Visualisasi 3D Karinding",
    shortLabel: "3D Karinding",
    icon: FolderOpen,
    tagline:
      "Model 3D Karinding Bambu, Lidah Getar & 5 Sudut Render Perspektif",
    itemCount: 7,
  },
  {
    id: "alat-musik",
    number: "04",
    name: "Alat Musik Sunda",
    shortLabel: "Alat Musik Sunda",
    icon: FolderOpen,
    tagline:
      "Koleksi 3D Model Kacapi, Tarawangsa, Bonang Gamelan & Render Gabungan",
    itemCount: 6,
  },
  {
    id: "terminal-bade",
    number: "05",
    name: "Terminal Bandara Bade",
    shortLabel: "Terminal Bandara Bade",
    icon: FolderOpen,
    tagline:
      "Visualisasi Kawasan Air Side (AS) & Land Side (LS) serta Render Terminal",
    itemCount: 16,
  },
  {
    id: "etc",
    number: "06",
    name: "etc",
    shortLabel: "Props & Karya Lainnya",
    icon: FolderOpen,
    tagline:
      "Teko Blirik Procedural Shader, Radio Retro, Piring Enamel, Cingcin & 3D Kujang",
    itemCount: 7,
  },
];
