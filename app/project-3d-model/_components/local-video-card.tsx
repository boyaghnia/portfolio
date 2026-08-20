"use client";

import * as React from "react";
import Image from "next/image";
import { Film, Play, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LocalVideoCardProps {
  title: string;
  badgeText: string;
  posterSrc: string;
  videoSrc: string;
  desc: string;
  onOpenLightbox: () => void;
}

export function LocalVideoCard({
  title,
  badgeText,
  posterSrc,
  videoSrc,
  desc,
  onOpenLightbox,
}: LocalVideoCardProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden shadow-lg flex flex-col justify-between">
      <div className="px-4 py-3 bg-muted/40 border-b border-border/60 flex items-center justify-between">
        <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
          {title}
        </span>
        <Badge variant="outline" className="rounded-none font-mono text-[10px]">
          {badgeText}
        </Badge>
      </div>

      {/* Portrait Aspect Ratio (4:5 / 1080x1350) */}
      <div className="relative aspect-4/5 w-full bg-black group/video overflow-hidden">
        {isPlaying ? (
          <video
            src={encodeURI(videoSrc)}
            controls
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            autoPlay
            playsInline
            className="w-full h-full object-contain bg-black"
          />
        ) : (
          <div
            className="relative w-full h-full cursor-pointer flex items-center justify-center bg-black/60"
            onClick={() => setIsPlaying(true)}
          >
            <Image
              src={encodeURI(posterSrc)}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain group-hover/video:scale-105 transition-transform duration-500 brightness-95 group-hover/video:brightness-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

            {/* Play Button (Sharp box brutalist style, no rounded-full, no text) */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-14 h-12 bg-primary text-primary-foreground flex items-center justify-center shadow-2xl group-hover/video:scale-110 transition-all duration-300 border border-primary/40">
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              </div>
            </div>

            {/* Maximize Lightbox button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox();
              }}
              className="absolute bottom-3 right-3 z-20 px-2.5 py-1 bg-background/90 text-foreground border border-border text-[11px] font-medium flex items-center gap-1.5 shadow-md hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
            </button>
          </div>
        )}
      </div>

      <div className="p-4 text-xs text-muted-foreground leading-relaxed">
        {desc}
      </div>
    </div>
  );
}
