"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaGitlab,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LanyardComponent } from "@/components/animations/lanyard";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ContactSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [flip, setFlip] = React.useState(0);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("Mohon isi semua kolom terlebih dahulu.");
      return;
    }

    const subject = encodeURIComponent(`Pesan Portfolio dari ${formData.name}`);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`,
    );

    window.location.href = `mailto:boyaghnia@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.section
      id="contact"
      ref={containerRef}
      className="flex items-center justify-center relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <div className="w-full max-w-350 mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Lanyard on the Left */}
          <motion.div
            variants={FADE_IN}
            className="w-full lg:w-1/2 flex flex-col items-center justify-center relative"
          >
            <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-100 lg:h-150 xl:h-175 relative">
              <Button
                variant="outline"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-background/50 backdrop-blur-md border-border/50 hover:bg-background/80"
                onClick={() => setFlip((f) => f + 1)}
              >
                Putar Lanyard
              </Button>
              {isInView && (
                <LanyardComponent
                  // MENGATUR UKURAN:
                  // fov: semakin KECIL nilainya, Lanyard semakin BESAR (zoom in)
                  fov={6}
                  // position: [X, Y, Z]
                  // - Angka ke-2 (Y): Mengatur Posisi ATAS/BAWAH.
                  //   Semakin MINUS/KECIL nilainya (misal -2 atau -4), Lanyard makin naik ke ATAS.
                  // - Angka ke-3 (Z): Semakin KECIL, Lanyard semakin BESAR.
                  position={[0, 0, 30]}
                  gravity={[0, -40, 0]}
                  lanyardWidth={4}
                  // MENGUBAH GAMBAR:
                  // Hapus komentar (//) di bawah ini dan masukkan link/path gambar Anda!
                  frontImage="/images/misc/id-card.jpg"
                  backImage="/images/misc/id-card2.jpg"
                  // lanyardImage="/images/misc/tali.jpg"
                  flipTrigger={flip}
                />
              )}
            </div>
          </motion.div>

          {/* Contact Form on the Right */}
          <motion.div
            variants={FADE_IN}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Get In Touch
            </h2>
            <p className="text-md text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
              Punya ide menarik atau tawaran kolaborasi? Silakan kirim pesan
              melalui form di bawah ini.
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md mx-auto lg:mx-0 flex flex-col gap-5 text-left"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  required
                  className="rounded-none h-12 bg-muted/20 border-border/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Your email address"
                  required
                  className="rounded-none h-12 bg-muted/20 border-border/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-sm font-semibold">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="How can I help you?"
                  rows={5}
                  required
                  className="rounded-none resize-none bg-muted/20 border-border/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="rounded-none h-14 mt-2 text-sm shadow-lg shadow-primary/20 w-full hover:scale-[1.02] transition-transform"
              >
                <Mail className="mr-2 w-5 h-5" /> Send Message
              </Button>
            </form>

            <div className="flex justify-center lg:justify-start gap-6 items-center text-muted-foreground mt-12">
              <a
                href="mailto:boyaghnia@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                <Mail className="w-6 h-6" />
                <span className="sr-only">Email</span>
              </a>
              <a
                href="https://linkedin.com/in/boyaghnia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/boyaghnia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <FaGithub className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://gitlab.com/boyaghnia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <FaGitlab className="w-6 h-6" />
                <span className="sr-only">GitLab</span>
              </a>
              <a
                href="https://www.youtube.com/@boyaghnia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <FaYoutube className="w-6 h-6" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="https://instagram.com/boyaghnia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
