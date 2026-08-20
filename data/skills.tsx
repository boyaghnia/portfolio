import React from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiPhp,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiMikrotik,
} from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";

export interface TechLogoItem {
  node: React.ReactNode;
  title: string;
}

export const TECH_LOGOS: TechLogoItem[] = [
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiLaravel className="text-[#FF2D20] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Laravel</span>
      </div>
    ),
    title: "Laravel",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiNextdotjs className="text-foreground w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Next JS</span>
      </div>
    ),
    title: "Next JS",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiReact className="text-[#61DAFB] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">React</span>
      </div>
    ),
    title: "React",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiPhp className="text-[#777BB4] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">PHP</span>
      </div>
    ),
    title: "PHP",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiTypescript className="text-[#3178C6] w-5 h-5 shrink-0" />{" "}
        <span className="font-semibold text-sm">TypeScript</span>
      </div>
    ),
    title: "TypeScript",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiJavascript className="text-[#F7DF1E] w-5 h-5 shrink-0" />{" "}
        <span className="font-semibold text-sm">JavaScript</span>
      </div>
    ),
    title: "JavaScript",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiTailwindcss className="text-[#06B6D4] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Tailwind CSS</span>
      </div>
    ),
    title: "Tailwind CSS",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiMysql className="text-[#4479A1] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">MySQL</span>
      </div>
    ),
    title: "MySQL",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Affinity_%28App%29_Logo.svg/960px-Affinity_%28App%29_Logo.svg.png"
          alt="Affinity Designer"
          className="w-5! h-5! shrink-0 object-contain"
        />{" "}
        <span className="font-semibold text-sm">Affinity Designer</span>
      </div>
    ),
    title: "Affinity Designer",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <DiPhotoshop className="text-[#31A8FF] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Photoshop</span>
      </div>
    ),
    title: "Photoshop",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <DiIllustrator className="text-[#FF9A00] w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Illustrator</span>
      </div>
    ),
    title: "Illustrator",
  },
  {
    node: (
      <div className="flex items-center gap-3 px-6 py-3 border border-border/40 bg-background/60 backdrop-blur-md rounded-none whitespace-nowrap">
        <SiMikrotik className="text-foreground w-6 h-6 shrink-0" />{" "}
        <span className="font-semibold text-sm">Mikrotik</span>
      </div>
    ),
    title: "Mikrotik",
  },
];
