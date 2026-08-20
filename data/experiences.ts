import type { ElementType } from "react";

export interface Role {
  title: string;
  type: "Full-time" | "Contract" | "Freelance" | "Internship";
  location: string;
  date: string;
  isCurrent?: boolean;
  description: string[];
  skills: string[];
}

export interface Experience {
  company: string;
  location: string;
  icon: string | ElementType;
  roles: Role[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "Kementerian Perhubungan Republik Indonesia",
    location: "Indonesia",
    icon: "/icons/kemenhub.png",
    roles: [
      {
        title: "Penelaah Teknis Kebijakan",
        type: "Full-time",
        location: "Central Jakarta, Jakarta, Indonesia",
        date: "Jul 2025 - Saat ini",
        isCurrent: true,
        description: [
          "Bergabung pada Tim Data dan Sistem Informasi, Bagian Organisasi dan Tata Laksana, Sekretariat Direktorat Jenderal Perhubungan Udara. Bertanggung jawab sebagai Front-End Developer, UI/UX Designer serta Graphic Designer.",
        ],
        skills: [
          "Front-End Development",
          "UI/UX Design",
          "Graphic Design",
          "React",
          "Next.js",
          "Laravel",
        ],
      },
      {
        title: "Penyusun Bahan Hukum, Kehumasan dan Publikasi",
        type: "Full-time",
        location: "Mappi Regency, Papua, Indonesia",
        date: "May 2024 - Jul 2025",
        isCurrent: false,
        description: [
          "Mengumpulkan serta mengklasifikasi data dan informasi publikasi mencakup aktivitas rutin, tematik, sosialisasi dan kampanye, isu strategis, khusus, incident dan accident, serta informasi yang dibutuhkan melalui permohonan informasi dan pengaduan/keluhan masyarakat terkait pelayanan pengguna jasa transportasi udara;",
          "Melaksanakan sosialisasi peraturan terkait dengan Penerbangan dari Kementerian Perhubungan Direktorat Jenderal Perhubungan Udara dan juga sumber lainnya yang relevan dengan Penerbangan;",
          "Bergabung dalam Organisasi Kehumasan Civil Aviation Publication Team (CAPT) sebagai Pelaksana;",
          "Melaksanakan pelaporan periodik CAPT pada DJPU serta pelaporan lainnya terkait publikasi kehumasan;",
          "Melaksanakan tugas kedinasan lain yang diberikan Pimpinan.",
        ],
        skills: ["Public Relations", "Data Classification"],
      },
      {
        title: "Dokumentasi dan Publikasi",
        type: "Full-time",
        location: "Mappi Regency, Papua, Indonesia",
        date: "Mar 2023 - May 2024",
        isCurrent: false,
        description: [
          "Mengelola media sosial Kantor UPBU Kelas III Bade;",
          "Melaksanakan sosialisasi peraturan terkait dengan Penerbangan dari Kementerian Perhubungan Direktorat Jenderal Perhubungan Udara dan juga sumber lainnya yang relevan dengan Penerbangan;",
          "Mendokumentasikan pelaksanaan kegiatan di Kantor UPBU Kelas III Bade;",
          "Menyusun laporan kegiatan penerbangan harian, mingguan dan bulanan di Kantor UPBU Kelas III Bade;",
          "Melaksanakan tugas kedinasan lain yang diberikan Pimpinan.",
        ],
        skills: [
          "Social Media Management",
          "Documentation",
          "Reporting",
          "Photography",
        ],
      },
      {
        title:
          "Petugas Pertolongan Kecelakaan Penerbangan dan Pemadam Kebakaran",
        type: "Full-time",
        location: "Mappi Regency, Papua, Indonesia",
        date: "Mar 2022 - Mar 2023",
        isCurrent: false,
        description: [
          "Melaksanakan tugas kerja harian yang ditentukan;",
          "Mengoperasikan kendaraan pendukung jenis Mobil Komando, Mobil Tangki Air, Ambulance dan Peralatan Pendukung;",
          "Memeriksa dan merawat semua peralatan/perlengkapan yang digunakan dalam regu;",
          "Melaporkan kerusakan-kerusakan serta kekurangan kepada atasan serta melakukan tindakan perbaikan;",
          "Menyusun laporan bulanan, semester, dan tahunan berisikan daftar kendaraan pemadam, bahan pemadam serta kondisinya dan daftar personel PKP-PK;",
          "Melakukan latihan pemadam kebakaran;",
          "Melakukan pengawasan pada daerah yang dianggap rawan;",
          "Menjaga disiplin dan memupuk kerjasama sesama anggota dalam menjalankan tugas operasi/latihan/pemeliharaan;",
          "Melaksanakan tugas kedinasan lain yang diberikan Pimpinan.",
        ],
        skills: [
          "Aviation Safety",
          "Firefighting",
          "Emergency Response",
          "Vehicle Operation",
        ],
      },
    ],
  },
  {
    company: "Kementerian Agama Republik Indonesia",
    location: "Kabupaten Ciamis, West Java, Indonesia",
    icon: "/icons/kemenag.png",
    roles: [
      {
        title:
          "Tenaga Terampil Pengelolaan Informasi dan Publikasi Pendidikan Agama Islam",
        type: "Contract",
        location: "Kabupaten Ciamis, West Java, Indonesia",
        date: "Jan 2018 - Feb 2022",
        isCurrent: false,
        description: [
          "Bertanggung jawab sebagai admin SIAGA (Sistem Informasi dan Administrasi Guru Agama) pada Seksi Pendidikan Agama Islam Kantor Kementerian Agama Kab. Ciamis",
          "Melaksanakan proses verifikasi dan validasi berkas kelengkapan pembayaran tunjangan profesi Guru Pendidikan Agama Islam",
          "Menghitung, melaporkan realisasi penyerapan anggaran, serta merencanakan kebutuhan anggaran pembayaran tunjangan profesi Guru Pendidikan Agama Islam",
          "Membantu menyusun konten display Sistem Informasi Seksi Pendidikan Agama Islam",
          "Membantu mengelola data kegiatan Seksi Pendidikan Agama Islam dalam bentuk tampilan informasi sebagai bahan publikasi",
          "Melaksanakan perintah lainnya terkait dengan penguatan sistem informasi dan publikasi Seksi Pendidikan Agama Islam",
        ],
        skills: [
          "Information Management",
          "Administration",
          "Data Verification",
          "Budget Reporting",
        ],
      },
    ],
  },
  {
    company: "SAS Hospitality",
    location: "Bandung, West Java, Indonesia",
    icon: "/icons/sas-hospitality.png",
    roles: [
      {
        title: "Public Area Attendant & Room Attendant",
        type: "Freelance",
        location: "Bandung, West Java, Indonesia",
        date: "Mar 2017 - Dec 2017",
        isCurrent: false,
        description: [],
        skills: ["Hospitality", "Housekeeping", "Customer Service"],
      },
      {
        title: "Grand Tjokro Hotel Academy",
        type: "Internship",
        location: "Bandung, West Java, Indonesia",
        date: "Dec 2016 - Feb 2017",
        isCurrent: false,
        description: [],
        skills: ["Hospitality Management", "Hotel Operations"],
      },
    ],
  },
];
