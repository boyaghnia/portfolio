"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, X, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

import { CERTIFICATES, type Certificate } from "@/data/certificates";

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
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90 transition-colors"
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
