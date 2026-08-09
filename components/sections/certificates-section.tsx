"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, X, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CERTIFICATES = [
  {
    title: "Cybersecurity",
    issuer: "Digital Talent Scholarship",
    date: "Aug 2025",
    description:
      "Fundamental Cybersecurity merupakan Program pembelajaran dasar keamanan siber yang memperkenalkan profesi, konsep, dan praktik utama dalam menjaga keamanan sistem dan jaringan. Peserta mempelajari jenis serangan siber, kerangka kerja keamanan (termasuk delapan domain CISSP dan konsep CIA), serta penggunaan alat analisis seperti SIEM, protokol jaringan, SQL, dan Python.",
    image:
      "https://media.licdn.com/dms/image/v2/D562DAQGG65bOwAPj3A/profile-treasury-document-images_1920/B56Zm8q5kjJkAs-/1/1759806989614?e=1787184000&v=beta&t=Dc4rYRSUC896kL3ejTacOW4gQEUyH-7Ay8kLh9u3s3A",
    credentialId: "19510934840-268",
    link: "https://digitalent.kominfo.go.id/cek-sertifikat",
    skills: [
      "Pengenalan Dunia Keamanan Siber",
      "Evolusi Keamanan Siber",
      "Melindungi dari Ancaman, Risiko, dan Kerentanan",
      "Alat Bantu Kemanan Siber dan Bahasa Pemrograman",
    ],
  },
  {
    title: "UI/UX Design",
    issuer: "Logical Operations",
    date: "Mar 2025",
    description:
      "The UI/UX Design training introduces beginners to essential UX and UI concepts, tools, and methods. It covers user needs, user-friendly design, and visually engaging interfaces. Participants will learn the full design process, from research and ideation to prototyping and testing. Key topics include design thinking, information architecture, wireframing, visual design, usability, and accessibility. Each module blends theory with hands-on exercises to build practical skills.",
    image:
      "https://media.licdn.com/dms/image/v2/D562DAQGrC0r2v29pyQ/profile-treasury-document-images_1920/B56ZX1L9KQHoAs-/1/1743575308499?e=1787184000&v=beta&t=_z0bD7Lm8F9e15kUlrloOv6z02-xdG4s9zXGBr7DHPQ",
    credentialId: "ab009883-d6ff-41b0-991d-bf41bc3bc29a#acc.2PHw3KVF",
    link: "https://certifications.certnexus.com/ab009883-d6ff-41b0-991d-bf41bc3bc29a#acc.2PHw3KVF",
    skills: [
      "UI/UX Design",
      "UX Research",
      "Design Thinking",
      "User Flow",
      "Information Architecture",
      "Wireframing",
      "Usability Testing",
    ],
  },
  {
    title: "Front End Web Developer",
    issuer: "Dicoding Academy",
    date: "Dec 2024",
    description:
      "Kelas ini ditujukan untuk seorang Front-End Web Developer yang ingin mengembangkan website yang memiliki fungsionalitas lebih daripada hanya media informasi saja, sesuai dengan standar industri. Di akhir kelas, siswa dapat membuat aplikasi front-end web yang interaktif serta memiliki fitur penyimpanan menggunakan web storage.",
    image:
      "https://media.licdn.com/dms/image/v2/D562DAQGhuWxcINSpRQ/profile-treasury-document-images_1920/profile-treasury-document-images_1920/1/1735689945440?e=1787184000&v=beta&t=tO58AQWhPr2-OUQO-MBcOkzXu5EOS7cUhS9wMBpY2Cc",
    credentialId: "QLZ9VLRRMX5D",
    link: "https://www.dicoding.com/certificates/QLZ9VLRRMX5D",
    skills: [
      "Browser Object Model",
      "Document Object Model",
      "Interaktif dengan Event",
      "Penyimpanan Data dengan Web Storage",
    ],
  },
  {
    title: "Photoshop 2024 Essential Training",
    issuer: "LinkedIn",
    date: "Sep 2024",
    description:
      "Mempelajari dasar hingga teknik penting dalam Adobe Photoshop 2024 untuk mengolah dan menyempurnakan gambar secara digital, termasuk penggunaan layer, selection, masking, adjustment, retouching, serta typography dalam proses desain.",
    image:
      "https://media.licdn.com/dms/image/v2/D562DAQG1eTbfmHtI2Q/profile-treasury-document-images_1920/profile-treasury-document-images_1920/1/1735690621665?e=1787184000&v=beta&t=fCgT7tHBHsjLEV5fXia40rj9Xiu8ZsL7ClOAv_L4X1Y",
    credentialId:
      "23e6c3c3094825729bba73e0a14ecc5bfae6e266631375f20609f0516a63bedd",
    link: "https://www.linkedin.com/learning/certificates/23e6c3c3094825729bba73e0a14ecc5bfae6e266631375f20609f0516a63bedd",
    skills: [
      "Adobe Photoshop",
      "Graphic Design",
      "Image Editing",
      "Visual Design",
    ],
  },
  {
    title:
      "Adobe Certified Professional in Graphic Design & Illustration Using Adobe Illustrator",
    issuer: "Adobe",
    date: "Jun 2024",
    description:
      "Adobe Certified Professional (ACP) is the official certification program offered by Adobe. This program is designed to validate an individual's knowledge and skills in using various Adobe Creative Cloud (CC) software. ACP certification shows the level of ability in using Adobe visual communication applications and also shows the talent a person has in communicating ideas and creativity in the form of graphic design using Adobe applications.",
    image:
      "https://media.licdn.com/dms/image/v2/D562DAQFMdmsTPEA0Yw/profile-treasury-document-images_1920/profile-treasury-document-images_1920/1/1719383926021?e=1787184000&v=beta&t=zTSC3xSosG_nMi0fQE8y9e9kr2gxaKqyFwCxtvfexOw",
    credentialId: "xH7T-sFWP",
    link: "https://www.credly.com/badges/de2af5c6-a621-45e1-8bb3-4db027f5d499/linked_in_profile",
    skills: ["Adobe", "Illustrator", "Graphic Design"],
  },
  {
    title: "Graphic Design",
    issuer: "Coursera - California Institute of the Arts",
    date: "Feb 2024",
    description:
      "In this Specialization, learners were equipped with a set of transferable formal and conceptual tools for “making and communicating” in the field of graphic design. Learners were exposed to the fundamental skills required to make sophisticated graphic design: process, historical context, and communication through image making and typography. Learners completed a capstone project that applies the skills of each course in a finished branding project suitable for a professional portfolio.",
    image:
      "https://media.licdn.com/dms/image/v2/D562DAQGsep4GM50QQA/profile-treasury-document-cover-images_1280/profile-treasury-document-cover-images_1280/0/1708413926199?e=1786881600&v=beta&t=obgJSB5z8mBTcZrt1tQ7KY-7xB0BCWilRAnttdU_OgY",
    credentialId: "HQ3969L9BMDR",
    link: "https://www.coursera.org/verify/specialization/HQ3969L9BMDR",
    skills: [
      "Fundamental Graphic Design",
      "Introduction to Typography",
      "Introduction to Imagemaking",
      "Ideas from the History of Graphic Design",
      "Brand New Brand",
    ],
  },
  {
    title: "Junior Graphic Designer",
    issuer: "Kementerian Komunikasi dan Informatika Republik Indonesia",
    date: "Jul 2023",
    description:
      "Junior Graphic Designer is a training scheme based on the Indonesian National Work Competency Standards (SKKNI). Junior Graphic Designer training participants will be able to improve their competency in designing visual communication solutions through identity, information and persuasion programs that suit the objectives of the activity provider to their audience.",
    image:
      "https://media.licdn.com/dms/image/v2/D4E2DAQEA-UT-Odc4SA/profile-treasury-document-images_1920/profile-treasury-document-images_1920/1/1706838125233?e=1787184000&v=beta&t=DeuT9gHUaPmslIlZ0JejCI35YT9wP-iQ7CLqP4HwtoU",
    credentialId: "19968231320-34/GTA/BLSDM.Kominfo/2023",
    link: "https://digitalent.kominfo.go.id/cek-sertifikat?registrasi=19968231320-34",
    skills: [
      "Prinsip Dasar Desain",
      "Prinsip Dasar Komunikasi",
      "Design Brief",
      "Mengoperasikan Perangkat Lunak Desain",
      "Menciptakan Karya Desain",
    ],
  },
  {
    title: "Path Pengembangan Web (Node.js)",
    issuer: "Progate",
    date: "Apr 2021",
    description:
      "Mempelajari pengembangan aplikasi web menggunakan Node.js dan Express.js, termasuk server-side programming, routing, pengelolaan data, dan pembuatan aplikasi web dinamis.",
    image:
      "https://media.licdn.com/dms/image/v2/D562DAQFLFghKRf_c1Q/profile-treasury-document-images_1920/profile-treasury-document-images_1920/1/1710026773576?e=1787184000&v=beta&t=MGddwbZwpV7zAi74odrOm2wpExhZCQm1mEjSmVKqfwM",
    credentialId: "cd975ac2qr4idl",
    link: "https://progate.com/path_certificate/cd975ac2qr4idl",
    skills: ["HTML", "CSS", "Javascript", "Express.js", "Database"],
  },
  {
    title: "HTML, CSS, Javascript",
    issuer: "Kementerian Komunikasi dan Informatika Republik Indonesia",
    date: "Apr 2021",
    description:
      "The Professional Academy (PROA) program is one of the Digital Talent Scholarship academies which aims to improve the quality of competitiveness of Indonesia's skilled human resources in the ICT field by increasing capabilities in line with industry needs. The PROA program seeks to improve and prepare for the transfer of competence of Indonesian human resources through global and national training and certification in order to create a competent, adaptive and productive Indonesian workforce.",
    image:
      "https://media.licdn.com/dms/image/v2/D562DAQFy2BoJCQ9m2g/profile-treasury-document-images_1920/profile-treasury-document-images_1920/1/1710025094704?e=1787184000&v=beta&t=Uv39fehkBEAuUAoyQabJnddHy6YYXPQtCLbeyWt-jxI",
    credentialId: "970777121-70/PRO.DTS/BLSDM.KOMINFO/2021",
    link: "https://komin.fo/ProADaftarProgate",
    skills: ["HTML", "CSS", "Javascript"],
  },
];

export function CertificatesSection() {
  const [selectedCert, setSelectedCert] = React.useState<
    (typeof CERTIFICATES)[0] | null
  >(null);

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedCert]);

  return (
    <motion.section
      id="certificates"
      className="pt-8 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div variants={FADE_IN} className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Sertifikat & Penghargaan
        </h2>
        <p className="text-md text-muted-foreground mt-2">
          Pencapaian, penghargaan, serta sertifikasi kompetensi yang telah saya
          raih.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATES.map((cert, idx) => (
          <motion.div
            key={idx}
            variants={FADE_IN}
            layoutId={`cert-container-${cert.title}`}
            onClick={() => setSelectedCert(cert)}
            className="group cursor-pointer relative border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 rounded-none flex flex-col h-full overflow-hidden"
          >
            {/* Image Placeholder */}
            <motion.div
              layoutId={`cert-image-container-${cert.title}`}
              className="w-full h-64 sm:h-72 overflow-hidden relative bg-muted/10 p-4"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-contain transition-transform duration-500 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent pointer-events-none" />
            </motion.div>

            {/* Content Preview */}
            <div className="p-5 flex flex-col flex-1 relative z-10 -mt-10">
              <motion.h3
                layoutId={`cert-title-${cert.title}`}
                className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2"
              >
                {cert.title}
              </motion.h3>

              <div className="flex flex-col gap-1 mt-auto">
                <motion.p
                  layoutId={`cert-issuer-${cert.title}`}
                  className="text-sm font-medium text-foreground/80"
                >
                  {cert.issuer}
                </motion.p>
                <motion.p
                  layoutId={`cert-date-${cert.title}`}
                  className="text-xs text-muted-foreground flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {cert.date}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              layoutId={`cert-container-${selectedCert.title}`}
              className="relative w-full max-w-2xl bg-background border border-border/50 shadow-2xl rounded-none flex flex-col overflow-hidden max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-background/50 hover:bg-background/90 backdrop-blur-md rounded-none border border-border/50 text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <motion.div
                layoutId={`cert-image-container-${selectedCert.title}`}
                className="w-full h-64 sm:h-96 md:h-[500px] relative shrink-0 bg-muted/10 p-4 sm:p-8"
              >
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain shadow-sm"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background to-transparent pointer-events-none" />
              </motion.div>

              {/* Modal Content - Scrollable */}
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto relative z-10 -mt-16 sm:-mt-20">
                <div className="flex items-start justify-between gap-4">
                  <motion.h3
                    layoutId={`cert-title-${selectedCert.title}`}
                    className="text-2xl sm:text-3xl font-bold mb-4 text-foreground"
                  >
                    {selectedCert.title}
                  </motion.h3>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  <motion.p
                    layoutId={`cert-issuer-${selectedCert.title}`}
                    className="text-base font-semibold text-primary flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    {selectedCert.issuer}
                  </motion.p>
                  <motion.p
                    layoutId={`cert-date-${selectedCert.title}`}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    {selectedCert.date}
                  </motion.p>
                  {selectedCert.credentialId && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <Hash className="w-4 h-4" />
                      ID: {selectedCert.credentialId}
                    </motion.p>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="text-sm font-semibold mb-2">Deskripsi:</h4>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {selectedCert.description}
                  </p>

                  <h4 className="text-sm font-semibold mb-3">
                    Keterampilan yang diuji/dipelajari:
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedCert.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="rounded-none bg-secondary/30 text-xs font-normal border border-border/50 px-2.5 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Lihat Kredensial Asli
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
