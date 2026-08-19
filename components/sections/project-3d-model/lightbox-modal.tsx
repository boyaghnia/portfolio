"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LightboxMedia } from "./types";

interface LightboxModalProps {
  media: LightboxMedia | null;
  onClose: () => void;
}

export function LightboxModal({ media, onClose }: LightboxModalProps) {
  return (
    <AnimatePresence>
      {media && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10 z-50 rounded-none cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Lightbox Content Container */}
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-card border border-border shadow-2xl overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Viewport */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black/90 flex items-center justify-center overflow-hidden">
              {media.type === "video" ? (
                <video
                  src={encodeURI(media.src)}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={encodeURI(media.src)}
                  alt={media.title}
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                />
              )}
            </div>

            {/* Bottom Metadata Bar */}
            <div className="p-4 sm:p-6 bg-card border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-primary/10 border border-primary/30 text-primary">
                    {media.category}
                  </span>

                  {media.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 font-mono">
                      {media.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {media.title}
                </h3>
                {media.desc && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {media.desc}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={encodeURI(media.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-border bg-background hover:bg-muted text-foreground transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Resolusi Asli</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
