"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Layers,
  Globe,
  Radio,
  Code2,
  Sparkles,
  ArrowUpRight,
  X,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { SiGithub, SiYoutube } from "react-icons/si";
import { Badge } from "@/components/ui/badge";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

import {
  PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

const CATEGORIES: {
  id: ProjectCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "all", label: "Semua Proyek", icon: Layers },
  { id: "web", label: "Web & Sistem", icon: Globe },
  { id: "ui", label: "Design System & UI", icon: Sparkles },
  { id: "network", label: "Infrastruktur & Jaringan", icon: Radio },
  { id: "script", label: "Scripting & Otomasi", icon: Code2 },
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] =
    React.useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null,
  );

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Close modal on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects = React.useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter(
      (p) => p.category === (activeCategory as Project["category"]),
    );
  }, [activeCategory]);

  return (
    <motion.section
      id="projects"
      className="py-16 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Section Header */}
      <motion.div variants={FADE_IN} className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Showcase Portofolio
            </div> */}
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Proyek & Karya Pilihan
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl text-base">
              Beberapa Proyek dan Karya yang telah saya kerjakan di instansi
              pemerintahan dan juga personal.
            </p>
          </div>

          <div className="hidden sm:block text-xs font-mono text-muted-foreground border-l-2 border-primary/40 pl-3">
            Total Proyek:{" "}
            <span className="text-foreground font-bold">
              {PROJECTS.length} Karya
            </span>
          </div>
        </div>

        {/* Category Filters (Hidden on Mobile) */}
        <div className="hidden sm:flex mt-8 flex-wrap gap-2 pt-2 border-t border-border/40">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count =
              cat.id === "all"
                ? PROJECTS.length
                : PROJECTS.filter(
                    (p) => p.category === (cat.id as Project["category"]),
                  ).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background/60 text-muted-foreground border-border/60 hover:text-foreground hover:border-border hover:bg-muted/30"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-none font-mono ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Grid Projects: 1 Large card on top-left (col-span-2), all others 1 col */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            // Only the featured project in "all" view takes 2 columns
            const isFeatured = project.featured && activeCategory === "all";

            return (
              <motion.div
                key={project.id}
                layout
                variants={FADE_IN}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={`group relative flex flex-col justify-between border border-border/60 bg-card/60 backdrop-blur-md hover:border-primary/60 transition-all duration-500 overflow-hidden ${
                  isFeatured
                    ? "md:col-span-2 lg:col-span-2 min-h-[380px]"
                    : "col-span-1 min-h-[380px]"
                }`}
              >
                {/* Accent Top Bar */}
                <div className="h-1 w-full bg-linear-to-r from-primary/30 via-primary to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Inner Content Area */}
                <div
                  className={`flex flex-col ${
                    isFeatured ? "lg:flex-row lg:items-stretch" : ""
                  } flex-1`}
                >
                  {/* Image Showcase */}
                  <div
                    className={`relative overflow-hidden bg-muted/20 ${
                      isFeatured
                        ? "lg:w-1/2 min-h-[240px] lg:min-h-[340px]"
                        : "h-52 w-full shrink-0"
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 filter group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/30 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span className="text-[11px] font-semibold px-2.5 py-1 bg-background/90 backdrop-blur-md border border-border/80 text-foreground shadow-xs">
                        {project.categoryLabel}
                      </span>

                      {project.highlightTag && (
                        <span className="text-[10px] font-semibold px-2 py-1 bg-primary/90 text-primary-foreground backdrop-blur-md shadow-xs">
                          {project.highlightTag}
                        </span>
                      )}
                    </div>

                    {/* Quick Action Preview Overlay button */}
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-2 text-xs font-semibold bg-background/90 text-foreground border border-border shadow-lg flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Detail
                      </button>
                    </div>
                  </div>

                  {/* Information Area */}
                  <div
                    className={`p-6 flex flex-col justify-between flex-1 ${
                      isFeatured ? "lg:w-1/2 lg:p-7" : ""
                    }`}
                  >
                    <div>
                      {/* Sub-meta: Role */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-primary font-medium tracking-wide uppercase">
                          {project.role}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-lg sm:text-xl font-bold tracking-tight mb-2.5 text-foreground group-hover:text-primary transition-colors duration-300 cursor-pointer flex items-start justify-between gap-2"
                      >
                        <span className={isFeatured ? "" : "line-clamp-2"}>
                          {project.title}
                        </span>
                        <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-primary mt-1" />
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {project.desc}
                      </p>

                      {/* Bullet Highlights (For Featured View) */}
                      {isFeatured && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          {project.highlights.slice(0, 4).map((hl, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-foreground/85 flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="truncate">{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/40 mb-4">
                        {project.tech.slice(0, isFeatured ? 6 : 4).map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="rounded-none bg-muted/50 text-[10px] sm:text-[11px] font-normal border border-border/50 px-2 py-0.5"
                          >
                            {t}
                          </Badge>
                        ))}
                        {!isFeatured && project.tech.length > 4 && (
                          <span className="text-[10px] text-muted-foreground font-mono self-center">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-2">
                        {/* Detail Modal Button */}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-semibold border border-border/70 bg-background/80 hover:bg-accent text-foreground transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5" />
                          Detail
                        </button>

                        {/* Live / Demo Link */}
                        {project.link && project.link !== "#" && (
                          <a
                            href={project.link}
                            target={
                              project.linkType === "internal"
                                ? undefined
                                : "_blank"
                            }
                            rel={
                              project.linkType === "internal"
                                ? undefined
                                : "noopener noreferrer"
                            }
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-semibold border border-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary transition-colors"
                          >
                            {project.linkType === "youtube" ? (
                              <>
                                <SiYoutube className="w-3.5 h-3.5 mr-1.5 text-red-500 group-hover:text-inherit" />
                                Video Demo
                              </>
                            ) : (
                              <>
                                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                                {project.linkType === "internal"
                                  ? "Dokumentasi"
                                  : "Kunjungi Web"}
                              </>
                            )}
                          </a>
                        )}

                        {/* GitHub Button */}
                        {project.github && (
                          <a
                            href={
                              project.github !== "private"
                                ? project.github
                                : undefined
                            }
                            target={
                              project.github !== "private"
                                ? "_blank"
                                : undefined
                            }
                            rel="noopener noreferrer"
                            className={`p-2 border border-border/60 text-xs transition-colors flex items-center justify-center ${
                              project.github === "private"
                                ? "opacity-50 cursor-not-allowed bg-muted/20 text-muted-foreground"
                                : "bg-muted/10 hover:bg-muted/40 text-foreground"
                            }`}
                            title={
                              project.github === "private"
                                ? "Private Repository (Internal)"
                                : "View GitHub Repository"
                            }
                          >
                            <SiGithub className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-card border border-border/80 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-muted/20 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 bg-primary/10 border border-primary/30 text-primary">
                    {selectedProject.categoryLabel}
                  </span>
                  {selectedProject.highlightTag && (
                    <span className="text-xs text-muted-foreground border-l border-border/60 pl-2">
                      {selectedProject.highlightTag}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Big Preview Image */}
                <div className="relative w-full h-64 sm:h-80 overflow-hidden border border-border/50 bg-muted/20">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Title & Role */}
                <div>
                  <p className="text-xs font-mono text-primary uppercase tracking-wider mb-1">
                    Peran: {selectedProject.role}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Comprehensive Description */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Tentang Proyek
                  </h4>
                  <p className="text-foreground/90 leading-relaxed text-sm sm:text-base">
                    {selectedProject.longDesc || selectedProject.desc}
                  </p>
                </div>

                {/* Key Highlights / Features */}
                {selectedProject.highlights.length > 0 && (
                  <div className="p-4 bg-muted/30 border border-border/50">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Fitur & Tanggung Jawab Utama
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedProject.highlights.map((hl, i) => (
                        <li
                          key={i}
                          className="text-xs sm:text-sm text-foreground/80 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                    Teknologi & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-none bg-muted/60 text-xs px-2.5 py-1 border border-border/60"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-border/60 bg-muted/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="text-xs text-muted-foreground">
                  {selectedProject.github === "private" && (
                    <span className="italic">
                      * Repository kode berstatus privat internal organisasi.
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 text-xs font-semibold border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>

                  {selectedProject.link && selectedProject.link !== "#" && (
                    <a
                      href={selectedProject.link}
                      target={
                        selectedProject.linkType === "internal"
                          ? undefined
                          : "_blank"
                      }
                      rel={
                        selectedProject.linkType === "internal"
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      {selectedProject.linkType === "youtube" ? (
                        <>
                          <SiYoutube className="w-4 h-4 mr-1.5 text-red-500" />
                          Lihat Demo Video
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4 mr-1.5" />
                          {selectedProject.linkType === "internal"
                            ? "Lihat Detail Proyek"
                            : "Buka Tautan Langsung"}
                        </>
                      )}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
