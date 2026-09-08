"use client";

import * as React from "react";
import { List, ChevronRight } from "lucide-react";
import { HeadingItem } from "./types";

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = React.useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");

  // Extract headings from markdown text
  React.useEffect(() => {
    const lines = content.split("\n");
    const extracted: HeadingItem[] = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim();
        // Clean markdown links/formatting from heading text
        const cleanText = rawText.replace(/[*_`~[\]]/g, "").replace(/\(.*?\)/g, "");
        const id = cleanText
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        extracted.push({ id, text: cleanText, level });
      }
    });

    setHeadings(extracted);
  }, [content]);

  // Observer to highlight active heading on scroll
  React.useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -60% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="p-4 rounded-none border border-border/50 bg-card/60 backdrop-blur-sm">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border/40 font-semibold text-sm text-foreground">
        <List className="w-4 h-4 text-primary" />
        <span>Daftar Isi</span>
      </div>
      <nav className="space-y-1 text-xs sm:text-sm">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", `#${heading.id}`);
                }
              }}
              className={`group flex items-start gap-1.5 py-1.5 px-2 rounded-none transition-all ${
                heading.level === 3 ? "ml-4" : ""
              } ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <ChevronRight
                className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-transform ${
                  isActive
                    ? "text-primary translate-x-0.5"
                    : "opacity-40 group-hover:opacity-100"
                }`}
              />
              <span className="line-clamp-1">{heading.text}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
