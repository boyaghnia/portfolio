"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, KeyRound, AlertCircle, ArrowRight, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminAuthModalProps {
  isOpen: boolean;
  onAuthenticated?: (passcode: string) => void;
  onClose?: () => void;
  redirectOnSuccess?: boolean;
}

export function AdminAuthModal({
  isOpen,
  onAuthenticated,
  onClose,
  redirectOnSuccess = true,
}: AdminAuthModalProps) {
  const router = useRouter();
  const [passcode, setPasscode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSavedVerified, setIsSavedVerified] = React.useState(false);

  // Check existing session in localStorage
  React.useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("blog_admin_passcode");
      if (saved) {
        setIsSavedVerified(true);
        setPasscode(saved);
      } else {
        setIsSavedVerified(false);
        setPasscode("");
      }
    }
  }, [isOpen]);

  // Focus input on open
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (isOpen && !isSavedVerified) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isSavedVerified]);

  const handleVerify = async (codeToVerify: string) => {
    const code = codeToVerify.trim();
    if (!code) {
      setError("Silakan masukkan passcode pemilik.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify_auth",
          passcode: code,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("blog_admin_passcode", code);
        setIsSavedVerified(true);
        if (onAuthenticated) {
          onAuthenticated(code);
        }
        if (redirectOnSuccess) {
          router.push("/blog/admin");
          if (onClose) onClose();
        }
      } else {
        setError(data.error || "Passcode salah. Akses ditolak.");
        setIsSavedVerified(false);
      }
    } catch {
      setError("Gagal menghubungi server verifikasi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify(passcode);
  };

  const handleLogout = () => {
    localStorage.removeItem("blog_admin_passcode");
    setIsSavedVerified(false);
    setPasscode("");
    setError(null);
  };

  const handleGoToAdmin = () => {
    if (onClose) onClose();
    router.push("/blog/admin");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md p-6 sm:p-8 rounded-none border border-border/80 bg-card shadow-2xl relative"
        >
          {/* Header Icon */}
          <div className="w-12 h-12 rounded-none bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-500">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center text-foreground mb-1.5">
            {isSavedVerified ? "Mode Pemilik CMS Blog" : "Akses Pemilik CMS Blog"}
          </h2>
          <p className="text-xs text-center text-muted-foreground mb-6">
            {isSavedVerified
              ? "Sesi Anda telah terverifikasi sebagai pemilik portfolio."
              : "Masukkan passcode pemilik untuk mengelola dan menulis artikel blog (Shortcut Cmd + .)"}
          </p>

          {isSavedVerified ? (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-500 flex items-center justify-between rounded-none">
                <span>Status: Mode Pemilik Terverifikasi</span>
                <span className="w-2 h-2 rounded-none bg-amber-500 animate-pulse" />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  type="button"
                  onClick={handleGoToAdmin}
                  className="w-full rounded-none gap-2 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Buka Dashboard CMS Blog</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLogout}
                    className="flex-1 rounded-none text-xs gap-1.5 text-muted-foreground hover:text-destructive cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar (Logout)</span>
                  </Button>

                  {onClose && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onClose}
                      className="rounded-none text-xs px-4 cursor-pointer"
                    >
                      Tutup
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    type="password"
                    placeholder="Masukkan passcode admin..."
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (error) setError(null);
                    }}
                    className="pl-10 py-5 rounded-none border-border/60 bg-muted/30 text-sm focus-visible:ring-primary/50"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 text-xs rounded-none bg-destructive/10 border border-destructive/20 text-destructive"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="flex gap-2 pt-2">
                {onClose && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="w-1/3 rounded-none cursor-pointer"
                    disabled={isLoading}
                  >
                    Batal
                  </Button>
                )}
                <Button
                  type="submit"
                  className="flex-1 rounded-none gap-2 font-semibold bg-amber-500 hover:bg-amber-600 text-black cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Memeriksa..." : "Verifikasi & Masuk"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-border/40 text-center text-[11px] text-muted-foreground font-mono">
            <span>Shortcut: Tekan <kbd className="px-1.5 py-0.5 border border-border/60 bg-muted/50 rounded-none text-foreground">Cmd</kbd> + <kbd className="px-1.5 py-0.5 border border-border/60 bg-muted/50 rounded-none text-foreground">.</kbd></span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
