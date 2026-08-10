"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, X } from "lucide-react";

import { SideRays } from "@/components/animations/side-rays";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 0,
    content: (openLightbox: (src: string) => void) => (
      <div className="flex flex-col md:flex-row h-full w-full items-center justify-center container mx-auto px-4 max-w-6xl gap-8 md:gap-12">
        <div className="flex-1 text-left flex flex-col justify-center h-full space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
            Distribusi Jaringan Internet di Bandar Udara Bade
          </h1>
          <p className="text-primary font-medium">oleh Boy Aghnia Rifadhan</p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Selain aktif menjadi Humas, saya juga terlibat dalam beberapa tugas
            sebagai Network Administrator di bawah pengawasan Ketua Tim Teknik,
            Operasi dan Pelayanan Darurat (TOKPD) dan Kepala Kantor Bandar Udara
            Bade. Saya bertanggung jawab untuk melakukan instalasi,
            troubleshooting, perbaikan infrastruktur perangkat keras dan
            perangkat pendukung, serta monitoring dan pemeliharaan jaringan agar
            konektivitas internet di Bandar Udara Bade dapat berfungsi dan
            berjalan dengan baik.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base hidden md:block">
            Dikarenakan keterbatasan akses jaringan komunikasi di Kelurahan
            Bade, terutama konektivitas internet yang belum maksimal dikarenakan
            belum masuknya provider penyedia layanan internet seperti Indihome,
            Biznet, First Media, dsb. termasuk layanan signal selular 4G yang
            belum merata, untuk mendukung kelancaran operasional, pelaporan,
            komunikasi serta meningkatkan layanan bagi pengguna bandara, maka
            diperlukan distribusi jaringan internet yang lebih merata di seluruh
            area bandara.
          </p>
        </div>
        <div
          className="w-full md:w-1/2 h-[45vh] md:h-[80vh] relative overflow-hidden cursor-pointer group shrink-0"
          onClick={() =>
            openLightbox("/images/projects/bade/test-jaringan.jpg")
          }
        >
          <Image
            src="/images/projects/bade/test-jaringan.jpg"
            alt="Distribusi Jaringan Internet di Bandar Udara Bade"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    ),
  },
  {
    id: 1,
    content: (openLightbox: (src: string) => void) => (
      <div className="flex flex-col h-full w-full items-center justify-center container mx-auto px-4 max-w-5xl gap-6 md:gap-8 text-center pt-16">
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          Adapun Topologi Distribusi Jaringan Internet yang telah saya buat
          ialah sebagaimana terlampir pada Gambar di bawah.
        </p>
        <div
          className="w-7xl! relative overflow-hidden cursor-pointer group flex justify-center"
          onClick={() => openLightbox("/images/projects/bade/topologi.jpg")}
        >
          <Image
            src="/images/projects/bade/topologi.jpg"
            alt="Topologi Jaringan"
            width={1920}
            height={1080}
            className="object-contain"
          />
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          Topologi jaringan yang digunakan di Bandar Udara Bade dirancang dengan
          pendekatan topologi star. Setiap node di jaringan terhubung ke satu
          pusat kontrol atau server utama yang berfungsi sebagai titik
          distribusi dan pengelolaan seluruh data dan koneksi internet. Access
          Point ditempatkan di beberapa lokasi agar distribusi jaringan internet
          dapat merata, mencakup area terminal, kantor, hingga perumahan
          pegawai. Penempatan ini dirancang agar semua pengguna, baik pegawai
          maupun penumpang, dapat mengakses internet dengan lancar.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    content: (openLightbox: (src: string) => void) => (
      <div className="flex flex-col h-full w-full items-center justify-center container mx-auto px-4 max-w-6xl gap-8 pt-16">
        <div className="flex flex-row gap-2 md:gap-6 w-full justify-center items-center">
          {["test-jaringan2.jpg", "test123.jpg", "testtest.jpg"].map(
            (img, idx) => (
              <div
                key={idx}
                className="relative w-1/3 overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(`/images/projects/bade/${img}`)}
              >
                <Image
                  src={`/images/projects/bade/${img}`}
                  alt={`Hotspot Login Page ${idx + 1}`}
                  width={600}
                  height={800}
                  className="object-contain w-full h-auto"
                />
              </div>
            ),
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-left">
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Saya juga membuat login page sederhana untuk Mikrotik Hotspot dengan
            tujuan mempermudah pengguna untuk terhubung ke jaringan internet
            yang disediakan. Login page ini dirancang sederhana namun
            fungsional, menampilkan form login yang meminta username dan
            password bagi pengguna yang telah terdaftar, serta opsi akses tamu
            dengan batasan tertentu untuk para penumpang.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base hidden md:block">
            Interface login page menggunakan HTML dan CSS untuk tampilan, serta
            sedikit JavaScript untuk validasi input secara real-time, dan juga
            untuk menggerakan background gambar secara otomatis. Setelah
            pengguna berhasil login, mereka akan diarahkan ke halaman selamat
            datang yang menyebutkan durasi penggunaan internet yang tersedia dan
            kebijakan penggunaan jaringan.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (openLightbox: (src: string) => void) => (
      <div className="flex flex-col h-full w-full items-center justify-center container mx-auto px-4 max-w-5xl gap-2 text-center pt-16">
        <div
          className="w-full h-[45vh] md:h-[65vh] relative overflow-hidden cursor-pointer group"
          onClick={() => openLightbox("/images/projects/bade/server2.png")}
        >
          <Image
            src="/images/projects/bade/server2.png"
            alt="Server Monitoring"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-4xl mx-auto">
          Dengan infrastruktur yang memadai, sistem ini tidak hanya mendukung
          operasional harian bandara, tetapi juga meningkatkan efisiensi layanan
          dan kenyamanan bagi seluruh pengguna. Monitoring berkelanjutan dan
          pemeliharaan rutin juga diterapkan untuk menjaga stabilitas dan
          performa jaringan, sehingga kualitas layanan internet di Bandar Udara
          Bade tetap terjaga.
        </p>
        <Link href="/#projects">
          <Button
            variant="outline"
            className="mt-4 rounded-none border-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors duration-300 min-w-37.5 font-semibold"
          >
            Kembali Ke Portfolio
          </Button>
        </Link>
      </div>
    ),
  },
];

export default function ProjectBade() {
  const [currentSection, setCurrentSection] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const openLightbox = (src: string) => setSelectedImage(src);
  const closeLightbox = () => setSelectedImage(null);

  // Keyboard navigation & Lightbox close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
      if (!selectedImage) {
        if (e.key === "ArrowDown") {
          setCurrentSection((prev) => Math.min(prev + 1, slides.length - 1));
        } else if (e.key === "ArrowUp") {
          setCurrentSection((prev) => Math.max(prev - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // Wheel event for scrolling
  React.useEffect(() => {
    let lastTime = 0;
    const delay = 800; // debounce time

    const handleWheel = (e: WheelEvent) => {
      if (selectedImage) return;

      const now = new Date().getTime();
      if (now - lastTime < delay) return;

      if (e.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, slides.length - 1));
        lastTime = now;
      } else if (e.deltaY < 0) {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
        lastTime = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [selectedImage]);

  return (
    <div className="fixed inset-0 w-full h-full bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Background Rays */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-60 dark:opacity-40 pointer-events-none">
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

      {/* Sections Wrapper */}
      <div className="relative w-full h-full z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pt-20 pb-10"
          >
            {slides[currentSection].content(openLightbox)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons (Floating Right) */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 0))}
          className={`rounded-none bg-background/50 backdrop-blur border-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 ${
            currentSection === 0 ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSection((prev) => Math.min(prev + 1, slides.length - 1))
          }
          className={`rounded-none bg-background/50 backdrop-blur border-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 ${
            currentSection === slides.length - 1
              ? "opacity-0 invisible"
              : "opacity-100 visible"
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
            onClick={closeLightbox}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 z-110 rounded-full bg-background/50 hover:bg-background/80"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="w-6 h-6" />
            </Button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-lg overflow-hidden shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
