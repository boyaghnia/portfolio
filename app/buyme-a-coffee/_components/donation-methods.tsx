"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  QrCode,
  ExternalLink,
  Coffee,
  Globe,
  Heart,
  Sparkles,
  ShieldCheck,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DONATION_PLATFORMS } from "@/data/donation";
import { SaweriaModal } from "./saweria-modal";
import { PaypalModal } from "./paypal-modal";

interface DonationMethodsProps {
  onOpenQrisModal: () => void;
}

export function DonationMethods({ onOpenQrisModal }: DonationMethodsProps) {
  const [isSaweriaModalOpen, setIsSaweriaModalOpen] = React.useState(false);
  const [isPaypalModalOpen, setIsPaypalModalOpen] = React.useState(false);
  const saweriaPlatform = DONATION_PLATFORMS.find((p) => p.id === "saweria");
  const paypalPlatform = DONATION_PLATFORMS.find((p) => p.id === "paypal");

  return (
    <section className="w-full max-w-5xl pt-4 mx-auto my-8 sm:my-12">
      {/* Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Badge
          variant="outline"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-none bg-primary/10 text-primary border-primary/30 uppercase tracking-widest mb-4 shadow-sm"
        >
          Buy Me a Coffee
        </Badge>
      </motion.div>

      {/* 3-Column Grid: QRIS, Saweria, PayPal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* 1. QRIS Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border border-primary/40 bg-linear-to-b from-primary/10 via-card/50 to-card/30 backdrop-blur-md p-6 rounded-none flex flex-col justify-between relative overflow-hidden shadow-lg group/qris-card"
        >
          {/* Subtle glow top corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] pointer-events-none" />

          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <QrCode className="w-5 h-5 text-primary" />
              QRIS Nasional
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Scan instan via seluruh m-banking dan e-wallet Indonesia tanpa
              biaya admin.
            </p>

            {/* Interactive QR Visual Box */}
            <div
              onClick={onOpenQrisModal}
              className="group/qris relative w-full aspect-square max-w-[210px] mx-auto bg-white p-3 border border-border/80 shadow-md flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all duration-200"
            >
              <div className="w-full h-full border-2 border-black/10 flex flex-col items-center justify-center p-2 relative bg-neutral-50 text-neutral-900">
                {/* Header logo */}
                <div className="w-full flex justify-between items-center pb-1.5 border-b border-black/15 text-[9px] font-mono font-bold tracking-tighter">
                  <span className="text-rose-600 font-extrabold text-xs">
                    QRIS
                  </span>
                  <span className="text-[8px] text-neutral-500 font-sans">
                    GPN Standar
                  </span>
                </div>

                {/* QR Center Graphic */}
                <div className="my-auto flex flex-col items-center justify-center">
                  <QrCode className="w-24 h-24 text-neutral-950 group-hover/qris:scale-105 transition-transform duration-200" />
                  <span className="text-[9px] font-mono font-semibold text-neutral-700 mt-1">
                    BOY AGHNIA RIFADHAN
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-[2px] opacity-0 group-hover/qris:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200 p-3 text-center">
                  <QrCode className="w-7 h-7 text-primary mb-1.5" />
                  <span className="text-xs font-semibold">
                    Klik untuk Perbesar
                  </span>
                  <span className="text-[9px] text-neutral-300 mt-0.5">
                    Scan langsung dari HP Anda
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono text-muted-foreground block">
                BCA • Mandiri • BRI • BNI • GoPay • OVO • DANA • ShopeePay
              </span>
            </div>
          </div>

          <div className="mt-5">
            <Button
              onClick={onOpenQrisModal}
              className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs cursor-pointer shadow-sm"
            >
              Perbesar / Scan QRIS
            </Button>
          </div>
        </motion.div>

        {/* 2. Saweria Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="border border-amber-500/40 bg-linear-to-b from-amber-500/10 via-card/50 to-card/30 backdrop-blur-md p-6 rounded-none flex flex-col justify-between relative overflow-hidden shadow-lg group/saweria-card"
        >
          {/* Subtle amber glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 blur-[50px] pointer-events-none" />

          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <Coffee className="w-5 h-5 text-amber-500" />
              Saweria
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Dukung secangkir kopi dengan pesan sapaan hangat yang bisa
              dikirimkan langsung.
            </p>

            {/* Direct Saweria QR Container */}
            <div
              onClick={() => setIsSaweriaModalOpen(true)}
              className="group/saweria-box relative w-full aspect-square max-w-52 mx-auto bg-white p-1 border border-neutral-800 shadow-md flex items-center justify-center cursor-pointer hover:border-amber-500 transition-all duration-200 overflow-hidden"
            >
              <Image
                src="/images/misc/saweria-qr2.png"
                alt="Saweria QR Code boyaghnia"
                width={250}
                height={250}
                className="w-full h-full object-contain group-hover/saweria-box:scale-105 transition-transform duration-200"
              />

              {/* Bottom hint overlay on hover */}
              <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-[2px] opacity-0 group-hover/saweria-box:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200 p-3 text-center">
                <QrCode className="w-7 h-7 text-amber-400 mb-1.5" />
                <span className="text-xs font-semibold">
                  Klik untuk Perbesar QR
                </span>
                <span className="text-[9px] text-neutral-300 mt-0.5">
                  Scan via GoPay, OVO, DANA, dll
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono text-muted-foreground block">
                QRIS • GoPay • OVO • DANA • ShopeePay • LinkAja
              </span>
            </div>
          </div>

          <div className="mt-5">
            <a
              href={
                saweriaPlatform?.targetUrl || "https://saweria.co/boyaghnia"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                variant="outline"
                className="w-full rounded-none border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-black font-mono text-xs cursor-pointer shadow-sm transition-colors"
              >
                Dukung via Saweria
                <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />
              </Button>
            </a>
          </div>
        </motion.div>

        {/* 3. PayPal Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="border border-blue-500/40 bg-linear-to-b from-blue-500/10 via-card/50 to-card/30 backdrop-blur-md p-6 rounded-none flex flex-col justify-between relative overflow-hidden shadow-lg group/paypal-card"
        >
          {/* Subtle blue glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/15 blur-[50px] pointer-events-none" />

          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <Globe className="w-5 h-5 text-[#0070BA]" />
              PayPal
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Dukungan internasional bagi pengunjung global menggunakan saldo
              PayPal atau kartu kredit.
            </p>

            {/* Direct PayPal QR Container */}
            <div
              onClick={() => setIsPaypalModalOpen(true)}
              className="group/paypal-box relative w-full aspect-square max-w-52 mx-auto bg-white p-2 border border-neutral-800 shadow-md flex items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-200 overflow-hidden"
            >
              <Image
                src="/images/misc/paypal-qr.png"
                alt="PayPal QR Code murbawisesa"
                width={250}
                height={250}
                className="w-full h-full object-contain group-hover/paypal-box:scale-105 transition-transform duration-200"
              />

              {/* Bottom hint overlay on hover */}
              <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-[2px] opacity-0 group-hover/paypal-box:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200 p-3 text-center">
                <QrCode className="w-7 h-7 text-blue-400 mb-1.5" />
                <span className="text-xs font-semibold">
                  Klik untuk Perbesar QR
                </span>
                <span className="text-[9px] text-neutral-300 mt-0.5">
                  Scan via Aplikasi PayPal / Kamera
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono text-muted-foreground block">
                PayPal Balance • Visa • MasterCard • AMEX
              </span>
            </div>
          </div>

          <div className="mt-5">
            <a
              href={
                paypalPlatform?.targetUrl || "https://paypal.me/murbawisesa"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                variant="outline"
                className="w-full rounded-none border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-[#0070BA] hover:text-white font-mono text-xs cursor-pointer shadow-sm transition-colors"
              >
                Dukung via PayPal
                <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Security & Gratitude Micro-banner */}
      <div className="mt-8 py-3 px-4 border border-border/40 bg-card/30 backdrop-blur-sm rounded-none flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>
          Semua kanal pembayaran resmi dan terhubung langsung ke akun pribadi{" "}
          <strong className="text-foreground">Boy Aghnia Rifadhan</strong>.
          Terima kasih atas setiap dukungan!
        </span>
      </div>

      {/* Saweria QR Modal */}
      <SaweriaModal
        isOpen={isSaweriaModalOpen}
        onClose={() => setIsSaweriaModalOpen(false)}
      />

      {/* PayPal QR Modal */}
      <PaypalModal
        isOpen={isPaypalModalOpen}
        onClose={() => setIsPaypalModalOpen(false)}
      />
    </section>
  );
}
