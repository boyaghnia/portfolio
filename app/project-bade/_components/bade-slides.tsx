import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface BadeSlide {
  id: number;
  content: (openLightbox: (src: string) => void) => React.ReactNode;
}

export const BADE_SLIDES: BadeSlide[] = [
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
