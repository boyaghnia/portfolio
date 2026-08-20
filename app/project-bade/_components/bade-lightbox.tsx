"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BadeLightboxProps {
  selectedImage: string | null;
  onClose: () => void;
}

export function BadeLightbox({ selectedImage, onClose }: BadeLightboxProps) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          onClick={onClose}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 z-110 rounded-full bg-background/50 hover:bg-background/80"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="w-6 h-6" />
          </Button>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-lg overflow-hidden shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Enlarged view"
              fill
              className="object-contain"
              quality={100}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
