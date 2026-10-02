"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaypalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaypalModal({ isOpen, onClose }: PaypalModalProps) {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const paypalUrl = "https://paypal.me/murbawisesa";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md border border-blue-500/50 bg-card p-6 shadow-2xl rounded-none z-10 my-auto"
          >
            {/* Header with Close button */}
            <div className="flex items-center justify-between pb-4 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#0070BA] dark:text-blue-400" />
                <h3 className="font-bold text-base text-foreground">
                  Scan QR PayPal (murbawisesa)
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-none text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QR Graphic Container */}
            <div className="my-5 bg-blue-500/10 p-5 border border-blue-500/30 shadow-inner flex flex-col items-center justify-center">
              {/* Header Label */}
              <div className="w-full flex justify-between items-center pb-2.5 border-b border-blue-500/20 text-[10px] font-mono font-bold">
                <span className="text-[#0070BA] dark:text-blue-400 font-extrabold text-xs flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  PAYPAL.ME QR
                </span>
                <span className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider">
                  murbawisesa
                </span>
              </div>

              {/* QR Image */}
              <div className="relative w-64 h-64 my-3 bg-white p-3 border-2 border-neutral-900 shadow-md flex items-center justify-center">
                <Image
                  src="/images/misc/paypal-qr.png"
                  alt="QR PayPal murbawisesa"
                  width={240}
                  height={240}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              {/* Supported Brands */}
              <div className="w-full pt-2 border-t border-blue-500/20 text-center">
                <span className="text-[10px] text-muted-foreground font-sans block">
                  PayPal Balance • Visa • MasterCard • AMEX • Discover
                </span>
              </div>
            </div>

            {/* Action Buttons & Instruction */}
            <div className="flex flex-col gap-3">
              <a
                href={paypalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full rounded-none bg-[#0070BA] hover:bg-[#005ea6] text-white font-mono text-xs cursor-pointer shadow-sm transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 mr-2" />
                  Buka Halaman Web PayPal
                </Button>
              </a>

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                Scan kode QR di atas langsung dari aplikasi PayPal atau kamera smartphone Anda untuk mengirimkan dukungan internasional.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
