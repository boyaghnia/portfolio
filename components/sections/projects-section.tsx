"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Code2, Rocket, Paintbrush, MonitorSmartphone, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const PROJECTS = [
  {
    title: "Distribusi Jaringan Internet",
    desc: "Instalasi, troubleshooting, dan monitoring jaringan internet di Bandar Udara Bade.",
    tech: ["Mikrotik", "HTML", "CSS", "JavaScript"],
    icon: <Code2 className="w-6 h-6" />,
    link: "#",
  },
  {
    title: "Bade Airport Social Media",
    desc: "Menciptakan desain visual yang informatif dan konsisten dengan identitas bandara.",
    tech: ["Photoshop", "Lightroom", "Illustrator"],
    icon: <Paintbrush className="w-6 h-6" />,
    link: "#",
  },
  {
    title: "ASNBeasiswa Social Media",
    desc: "Creative Team dan Graphic Designer untuk kebutuhan konten edukasi beasiswa ASN.",
    tech: ["Photoshop", "Lightroom", "Illustrator"],
    icon: <Paintbrush className="w-6 h-6" />,
    link: "#",
  },
  {
    title: "3D Modelling Waditra Sunda",
    desc: "Membuat 3D model alat musik tradisional Sunda untuk pelestarian budaya.",
    tech: ["Blender", "Illustrator", "Photoshop"],
    icon: <Rocket className="w-6 h-6" />,
    link: "#",
  },
];

export function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      className="py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div variants={FADE_IN} className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Proyek & Karya</h2>
        <p className="text-md text-muted-foreground mt-2">
          Beberapa proyek dan hasil karya yang telah saya kerjakan.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div key={i} variants={FADE_IN} className="h-full">
            <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors group flex flex-col rounded-none">
              <CardHeader>
                <div className="mb-4 p-3 bg-primary/10 w-fit rounded-none border border-primary/20 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-sm">
                  {project.icon}
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base mt-2 leading-relaxed">
                  {project.desc}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="grow flex flex-col justify-end pb-6">
                <div className="flex flex-wrap gap-2 pt-2">
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
              </CardContent>
              
              <CardFooter className="pt-4 pb-4 border-t border-border/30 mt-auto bg-muted/5 group-hover:bg-primary/5 transition-colors">
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors w-full"
                 >
                    <ExternalLink className="w-4 h-4" />
                    Lihat Proyek
                 </a>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
