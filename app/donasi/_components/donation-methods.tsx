"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { QrCode, ExternalLink, Copy, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BANK_ACCOUNTS, DONATION_PLATFORMS } from "@/data/donation";

interface DonationMethodsProps {
  onOpenQrisModal: () => void;
}

export function DonationMethods({ onOpenQrisModal }: DonationMethodsProps) {
  const [copiedAccount, setCopiedAccount] = React.useState<string | null>(null);

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    setTimeout(() => {
      setCopiedAccount(null);
    }, 2200);
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-8 sm:my-12">
      {/* Main Grid: QRIS Card on Left, Digital Platforms & Bank on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: QRIS Spotlight Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-5 border border-primary/40 bg-linear-to-b from-primary/10 via-card/50 to-card/30 backdrop-blur-md p-6 rounded-none relative overflow-hidden shadow-lg"
        >
          {/* Subtle glow top corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <Badge
              variant="outline"
              className="px-2.5 py-0.5 text-[10px] font-mono rounded-none bg-primary/20 text-primary border-primary/40 uppercase tracking-wider"
            >
              Rekomendasi Utama
            </Badge>
            <span className="text-[11px] font-mono text-muted-foreground">
              Bebas Biaya Admin
            </span>
          </div>

          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            QRIS Standar Nasional
          </h3>
          <p className="text-xs text-muted-foreground mt-1 mb-5">
            Bisa di-scan menggunakan seluruh aplikasi mobile banking (BCA,
            Mandiri, BRI, BNI) dan e-wallet (GoPay, OVO, DANA, ShopeePay,
            LinkAja).
          </p>

          {/* Interactive QR Code Visual Box */}
          <div
            onClick={onOpenQrisModal}
            className="group/qris relative w-full aspect-square max-w-[260px] mx-auto bg-white p-4 border border-border/80 shadow-md flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all duration-200"
          >
            {/* Stylized QR placeholder pattern */}
            <div className="w-full h-full border-2 border-black/10 flex flex-col items-center justify-center p-3 relative bg-neutral-50 text-neutral-900">
              {/* Header logo */}
              <div className="w-full flex justify-between items-center pb-2 border-b border-black/15 text-[10px] font-mono font-bold tracking-tighter">
                <span className="text-rose-600 font-extrabold text-xs">
                  QRIS
                </span>
                <span className="text-[9px] text-neutral-500 font-sans">
                  GPN Standar
                </span>
              </div>

              {/* QR Center Graphic */}
              <div className="my-auto flex flex-col items-center justify-center">
                <QrCode className="w-28 h-28 text-neutral-950 group-hover/qris:scale-105 transition-transform duration-200" />
                <span className="text-[10px] font-mono font-semibold text-neutral-700 mt-1">
                  BOY AGHNIA RIFADHAN
                </span>
                <span className="text-[8px] font-mono text-neutral-400">
                  NMID: ID1020021982103
                </span>
              </div>

              {/* Bottom hint overlay on hover */}
              <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-[2px] opacity-0 group-hover/qris:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200 p-4 text-center">
                <QrCode className="w-8 h-8 text-primary mb-2" />
                <span className="text-xs font-semibold">
                  Klik untuk Perbesar QRIS
                </span>
                <span className="text-[10px] text-neutral-300 mt-0.5">
                  Mudah di-scan langsung dari HP Anda
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <Button
              onClick={onOpenQrisModal}
              className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs cursor-pointer shadow-sm"
            >
              <QrCode className="w-3.5 h-3.5 mr-2" />
              Perbesar / Scan QRIS
            </Button>
            <p className="text-[10px] text-center text-muted-foreground">
              Nominal donasi dapat diatur secara bebas di aplikasi Anda.
            </p>
          </div>
        </motion.div>

        {/* Right: Digital Platforms & Bank Accounts (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Platform Channels: Saweria & PayPal */}
          <div>
            <h3 className="text-sm font-semibold font-mono text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              Platform Donasi Digital
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DONATION_PLATFORMS.map((platform, idx) => (
                <motion.a
                  key={platform.id}
                  href={platform.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.07 }}
                  className="group relative p-4 border border-border/60 bg-card/40 backdrop-blur-md rounded-none hover:border-primary/60 hover:bg-card/70 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {platform.name}
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </span>
                      {platform.badge && (
                        <Badge
                          variant="outline"
                          className="text-[9px] font-mono px-1.5 py-0 rounded-none bg-muted/60 text-muted-foreground border-border/50"
                        >
                          {platform.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {platform.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-border/30 flex items-center justify-between text-xs font-mono text-primary">
                    <span>Kunjungi {platform.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Direct Bank Accounts: BRI & BNI */}
          <div>
            <h3 className="text-sm font-semibold font-mono text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              Transfer Bank Langsung (BRI & BNI)
            </h3>

            <div className="flex flex-col gap-3">
              {BANK_ACCOUNTS.map((bank, idx) => {
                const isCopied = copiedAccount === bank.accountNumber;
                return (
                  <motion.div
                    key={bank.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.08 }}
                    className="p-4 border border-border/60 bg-card/40 backdrop-blur-md rounded-none flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-border transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div>
                        <span className="text-xs text-muted-foreground font-mono block">
                          {bank.name}
                        </span>
                        <span className="text-base font-mono font-bold text-foreground tracking-wider block">
                          {bank.accountNumber}
                        </span>
                        <span className="text-xs text-muted-foreground/80">
                          a.n.{" "}
                          <strong className="text-foreground/90 font-medium">
                            {bank.accountHolder}
                          </strong>
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(bank.accountNumber)}
                      className="rounded-none font-mono text-xs border-border/60 hover:border-primary shrink-0 self-end sm:self-auto cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                          <span className="text-emerald-500">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5" />
                          <span>Salin Nomor</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
