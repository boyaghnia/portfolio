"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const EXPERIENCES = [
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

export function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="pt-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div variants={FADE_IN} className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Pengalaman Kerja</h2>
        <p className="text-md text-muted-foreground">
          Perjalanan profesional saya dan perusahaan-perusahaan yang pernah saya
          bekerja selama ini.
        </p>
      </motion.div>

      <div className="ml-2 md:ml-4 space-y-12 pb-8">
        {EXPERIENCES.map((exp, expIdx) => (
          <motion.div
            key={expIdx}
            variants={FADE_IN}
            className="relative border-l border-border/50 pb-4"
          >
            {/* Company Header */}
            <div className="absolute left-[-0.5px] -translate-x-1/2 top-0 bg-background p-1 border border-border/50 rounded-none flex items-center justify-center shadow-sm w-9 h-9">
              {typeof exp.icon === "string" ? (
                <Image
                  src={exp.icon}
                  alt={exp.company}
                  width={25}
                  height={25}
                  className="h-6 w-auto"
                />
              ) : (
                React.createElement(exp.icon, {
                  className: "w-5 h-5 text-foreground",
                })
              )}
            </div>

            <div className="pl-6 md:pl-8 mb-6 pt-1">
              <h3 className="text-xl font-bold flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                {exp.company}
                <span className="hidden md:inline text-muted-foreground/50">
                  ·
                </span>
                <span className="text-sm font-normal text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </span>
              </h3>
            </div>

            {/* Roles */}
            <div className="space-y-10 mt-6">
              {exp.roles.map((role, roleIdx) => (
                <div key={roleIdx} className="relative pl-6 md:pl-8">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-1.25 top-2.5 w-2.5 h-2.5 rounded-none ring-4 ring-background ${
                      role.isCurrent ? "bg-green-500" : "bg-muted-foreground/40"
                    }`}
                  />

                  {/* Role Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        {role.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {role.type} &middot; {role.location}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`w-max rounded-none shrink-0 px-1.5 py-1 text-xs font-medium ${
                        role.isCurrent
                          ? "border-green-500/30 text-green-500 bg-green-500/10"
                          : "border-border/50 text-muted-foreground bg-transparent"
                      }`}
                    >
                      {role.date}
                    </Badge>
                  </div>

                  {/* Description List */}
                  {role.description.length > 0 && (
                    <ul className="mt-4 mb-6 space-y-2 text-muted-foreground text-sm list-none max-w-4xl">
                      {role.description.map((desc, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-muted-foreground/50 shrink-0 mt-0.5">
                            -
                          </span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Skills Tags */}
                  {role.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {role.skills.map((skill, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="rounded-none bg-secondary/30 hover:bg-secondary/50 text-xs font-normal border border-border/50 px-1.5"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
