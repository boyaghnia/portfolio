"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import type { YouTubeVideo } from "./types";

interface YouTubeFacadeCardProps {
  video: YouTubeVideo;
}

export function YouTubeFacadeCard({ video }: YouTubeFacadeCardProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <motion.div
      key={video.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden flex flex-col justify-between hover:border-primary/60 transition-all duration-300 shadow-md"
    >
      {/* Accent Top bar */}
      <div className="h-1 w-full bg-linear-to-r from-red-500/40 via-red-500 to-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Video Embed or Thumbnail Facade */}
      <div className="relative aspect-video w-full bg-black overflow-hidden group/thumb">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div
            className="relative w-full h-full cursor-pointer flex items-center justify-center"
            onClick={() => setIsPlaying(true)}
          >
            <Image
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover/thumb:scale-105 transition-transform duration-500 brightness-90 group-hover/thumb:brightness-100"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Red Play Button (Sharp box style, no rounded-full, no text) */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-14 h-10 bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover/thumb:scale-110 group-hover/thumb:bg-red-600 transition-all duration-300 border border-white/20">
                <Play className="w-5 h-5 fill-current translate-x-0.5" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono text-primary uppercase font-semibold">
              {video.subtitle}
            </span>
            <Badge
              variant="secondary"
              className="rounded-none text-[10px] bg-muted/60"
            >
              {video.software}
            </Badge>
          </div>

          <h3 className="text-base font-bold tracking-tight text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {video.desc}
          </p>
        </div>

        <div>
          {/* Action Link */}
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 hover:border-red-600 transition-all duration-300"
          >
            <SiYoutube className="w-4 h-4" />
            <span>Buka di YouTube</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
