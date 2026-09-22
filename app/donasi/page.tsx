"use client";

import * as React from "react";
import { SideRays } from "@/components/animations/side-rays";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";

import { DonationMethods } from "./_components/donation-methods";
import { DonationFaq } from "./_components/donation-faq";
import { QrisModal } from "./_components/qris-modal";

export default function DonasiPage() {
  const [isQrisModalOpen, setIsQrisModalOpen] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Background Animated Rays (Consistent with other pages) */}
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-60 dark:opacity-40 pointer-events-none">
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={2}
        />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        {/* 2. Metode Pembayaran & Kanal Dukungan (QRIS, Saweria, PayPal) */}
        <DonationMethods onOpenQrisModal={() => setIsQrisModalOpen(true)} />

        {/* 5. Pertanyaan Umum & Ajak ke Buku Tamu */}
        <DonationFaq />
      </main>

      <Footer />
      <BackToTop />

      {/* QRIS Modal Pop-up */}
      <QrisModal
        isOpen={isQrisModalOpen}
        onClose={() => setIsQrisModalOpen(false)}
      />
    </div>
  );
}
