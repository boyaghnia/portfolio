"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  postTitle: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({
  isOpen,
  postTitle,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md p-6 rounded-none border border-destructive/30 bg-card shadow-2xl"
        >
          <div className="w-12 h-12 rounded-none bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-center text-foreground mb-2">
            Hapus Artikel Ini?
          </h3>

          <p className="text-sm text-center text-muted-foreground mb-2">
            Tindakan ini tidak dapat dibatalkan. Artikel berikut akan dihapus secara permanen:
          </p>

          <div className="p-3 my-3 rounded-none bg-muted/60 text-center font-medium text-sm text-foreground line-clamp-2">
            "{postTitle}"
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 rounded-none cursor-pointer"
              disabled={isDeleting}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onConfirm}
              className="flex-1 rounded-none gap-2 font-semibold cursor-pointer"
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Menghapus..." : "Hapus Permanen"}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
