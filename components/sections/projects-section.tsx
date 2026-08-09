"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Badge } from "@/components/ui/badge";

const FADE_IN = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface Project {
  title: string;
  desc: string;
  tech: string[];
  image: string;
  link: string;
  github?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Website Direktorat Jenderal Perhubungan Udara",
    desc: "Migrasi dan pengembangan ulang website resmi Direktorat Jenderal Perhubungan Udara ke platform Laravel, disertai redesign UI/UX, pengembangan fitur, optimasi performa, dan penyempurnaan struktur informasi untuk mendukung layanan informasi publik yang lebih modern dan responsif.",
    tech: ["Laravel", "PHP", "Alpine.js", "Tailwind CSS"],
    image: "/hubud-web.jpg",
    link: "https://hubud.kemenhub.go.id",
  },
  {
    title: "e-SOP (Electronic Standar Operational Procedure) DJPU",
    desc: "Aplikasi E-SOP dikembangkan sebagai sistem informasi internal berbasis web untuk menggantikan proses penyusunan dan pengelolaan SOP yang sebelumnya dilakukan secara manual dan parsial menggunakan aplikasi perkantoran. Sistem menyediakan mekanisme terpusat untuk menjamin keseragaman format, metadata, struktur dokumen, pengawasan, dan ketersediaan dokumen final yang telah disahkan.",
    tech: [
      "Laravel",
      "Inertia",
      "React",
      "PHP",
      "Typescript",
      "Alpine.js",
      "Tailwind CSS",
    ],
    image: "/e-sop.jpg",
    link: "#",
    github: "private",
  },
  {
    title: "Aviasihub UI Components",
    desc: "Aviasihub.site adalah UI component library yang saya buat sebagai pedoman standar tata letak visual. Platform ini menyediakan elemen antarmuka responsif siap pakai. Seluruh pengembangan web dan aplikasi di lingkungan Direktorat Jenderal Perhubungan Udara diwajibkan mengimplementasikan standarisasi dari Aviasihub.site untuk memastikan keseragaman desain, kemudahan integrasi, dan profesionalitas layanan digital.",
    tech: [
      "Laravel",
      "PHP",
      "Alpine.js",
      "Tailwind CSS",
      "Bootstrap",
      "Vanilla CSS",
    ],
    image: "/aviasihub.png",
    link: "https://aviasihub.site",
  },
  {
    title: "Automation Script for Pockie Ninja Game",
    desc: "Created a custom Tampermonkey script to automate gameplay in Pockie Ninja Online, significantly enhancing efficiency and user experience. The script automates several core in-game features.",
    tech: [
      "Tampermonkey",
      "JavaScript",
      "DOM Manipulation",
      "Mutation Observers",
    ],
    image: "/pockie-ninja.jpg",
    link: "https://www.youtube.com/watch?v=2Iorid9Y7rY&list=PLKVk0YkfbJgAa7w5efLeekQDFIgMerlfq",
  },
];

export function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      className="py-12 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      <motion.div variants={FADE_IN} className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Proyek & Karya</h2>
        <p className="text-md text-muted-foreground mt-2">
          Beberapa proyek dan hasil karya yang telah saya kerjakan
        </p>
      </motion.div>

      <div className="flex flex-col gap-12">
        {PROJECTS.map((project, i) => {
          // Alternating layout for desktop
          const isEven = i % 2 === 0;

          return (
            <motion.div
              key={i}
              variants={FADE_IN}
              className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} group bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors duration-500 overflow-hidden rounded-none min-h-[300px]`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-1/2 relative overflow-hidden bg-muted/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 lg:h-full object-cover filter grayscale-50 group-hover:grayscale-0 transition-all duration-700 scale-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 lg:bg-linear-to-r lg:from-background/20 to-transparent pointer-events-none" />
              </div>

              {/* Content Container */}
              <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center relative">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-none bg-secondary/30 text-xs font-normal border border-border/50 px-2.5 py-1 hover:bg-secondary/50 transition-colors"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={project.link !== "#" ? project.link : undefined}
                    target={project.link !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-5 py-2.5 border border-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary text-sm font-semibold transition-all duration-300 w-full sm:w-fit ${project.link === "#" ? "opacity-50 cursor-not-allowed hover:bg-primary/10 hover:text-primary" : ""}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {project.link === "#" ? "No Live Site" : "Live Site"}
                  </a>

                  {project.github && (
                    <a
                      href={
                        project.github !== "private" && project.github !== "#"
                          ? project.github
                          : undefined
                      }
                      target={
                        project.github !== "private" && project.github !== "#"
                          ? "_blank"
                          : undefined
                      }
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center px-5 py-2.5 border border-border/50 bg-muted/5 hover:bg-muted/10 text-foreground text-sm font-semibold transition-all duration-300 w-full sm:w-fit ${project.github === "private" ? "opacity-60 cursor-not-allowed hover:bg-muted/5" : ""}`}
                    >
                      <SiGithub className="w-4 h-4 mr-2" />
                      {project.github === "private"
                        ? "Private GitHub"
                        : "GitHub Repo"}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
