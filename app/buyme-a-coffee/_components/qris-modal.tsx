"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QrisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QrisModal({ isOpen, onClose }: QrisModalProps) {
  const [copied, setCopied] = React.useState(false);

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

  const nmid = "ID1020021982103";
  const merchantName = "BOY AGHNIA RIFADHAN";

  const handleCopyNmid = () => {
    navigator.clipboard.writeText(nmid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            className="relative w-full max-w-md border border-border/80 bg-card p-6 shadow-2xl rounded-none z-10 my-auto"
          >
            {/* Header with Close button */}
            <div className="flex items-center justify-between pb-4 border-b border-border/40">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base text-foreground">
                  Scan QRIS Nasional
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-none text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QRIS Graphic Container */}
            <div className="my-6 bg-white text-neutral-900 p-6 border border-neutral-300 shadow-inner flex flex-col items-center justify-center">
              {/* Official QRIS Header */}
              <div className="w-full flex justify-between items-center pb-3 border-b-2 border-neutral-800">
                <span className="font-extrabold text-xl tracking-tighter text-rose-600">
                  QRIS
                </span>
                <span className="text-[10px] font-sans font-semibold tracking-wider text-neutral-600 uppercase">
                  GPN Interoperable
                </span>
              </div>

              {/* Merchant Title */}
              <div className="text-center my-3">
                <span className="text-xs font-mono font-bold tracking-wide uppercase text-neutral-800 block">
                  {merchantName}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  NMID: {nmid}
                </span>
              </div>

              {/* QR Code graphic */}
              <div className="p-3 bg-white border border-neutral-200 shadow-sm my-2 flex items-center justify-center">
                <QrCode className="w-48 h-48 text-neutral-950" />
              </div>

              {/* Supported Brands */}
              <div className="w-full mt-3 pt-2 border-t border-neutral-200 text-center">
                <span className="text-[10px] text-neutral-500 font-sans block">
                  BCA • Mandiri • BRI • BNI • GoPay • OVO • DANA • ShopeePay • LinkAja
                </span>
              </div>
            </div>

            {/* Merchant Details & Copy */}
            <div className="flex items-center justify-between p-3 bg-muted/40 border border-border/50 text-xs font-mono mb-4">
              <div>
                <span className="text-muted-foreground block text-[10px]">
                  ID Merchant (NMID)
                </span>
                <span className="font-bold text-foreground">{nmid}</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyNmid}
                className="h-8 px-2 text-xs font-mono rounded-none cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                    <span className="text-emerald-500">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    <span>Salin NMID</span>
                  </>
                )}
              </Button>
            </div>

            {/* Instruction */}
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              Buka aplikasi m-banking atau e-wallet Anda, pilih menu <strong>Scan / Bayar</strong>, lalu arahkan kamera ke kode QR di atas.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
