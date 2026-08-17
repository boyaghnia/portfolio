"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  Heart,
  Sparkles,
  ShieldCheck,
  Pin,
  Reply,
  CornerDownRight,
  Search,
  Lock,
  RefreshCw,
  ArrowLeft,
  Filter,
  User,
  AtSign,
  Trash2,
  Pencil,
} from "lucide-react";

import { SideRays } from "@/components/animations/side-rays";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export interface GuestbookReply {
  id: string;
  name: string;
  handle?: string;
  avatarColor: string;
  isOwner: boolean;
  message: string;
  createdAt: string;
  likes: number;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  handle?: string;
  avatarColor: string;
  tag: string;
  isOwner: boolean;
  isPinned: boolean;
  message: string;
  createdAt: string;
  likes: number;
  replies: GuestbookReply[];
}

const CATEGORY_TAGS = [
  { label: "👋 Sapaan", value: "Sapaan" },
  { label: "💡 Feedback", value: "Feedback" },
  { label: "🤝 Kolaborasi", value: "Kolaborasi" },
  { label: "💼 Tawaran Proyek", value: "Proyek" },
  { label: "❤️ Apresiasi", value: "Apresiasi" },
];

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Baru saja";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} hari lalu`;

    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

function getInitials(name: string) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatHandle(input: string): string {
  const trimmed = input.trim();
  if (!trimmed || trimmed === "@") return "";
  const clean = trimmed.replace(/^@+/, "");
  return clean ? `@${clean}` : "";
}

export default function GuestbookPage() {
  const [entries, setEntries] = React.useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Semua");
  const [activeReplyId, setActiveReplyId] = React.useState<string | null>(null);

  // Form states
  const [name, setName] = React.useState("");
  const [handle, setHandle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState("Sapaan");
  const [honeypot, setHoneypot] = React.useState(""); // Invisible honeypot for bot trap

  // Anti-Spam Rate Limit Cooldown (in seconds)
  const [cooldown, setCooldown] = React.useState(0);

  // Owner authentication
  const [isOwnerMode, setIsOwnerMode] = React.useState(false);
  const [passcode, setPasscode] = React.useState("");
  const [isOwnerVerified, setIsOwnerVerified] = React.useState(false);
  const [showOwnerModal, setShowOwnerModal] = React.useState(false);

  // Reply form states
  const [replyName, setReplyName] = React.useState("");
  const [replyHandle, setReplyHandle] = React.useState("");
  const [replyMessage, setReplyMessage] = React.useState("");
  const [replyHoneypot, setReplyHoneypot] = React.useState("");
  const [replySubmitting, setReplySubmitting] = React.useState(false);

  // Edit states
  const [editingItem, setEditingItem] = React.useState<{
    entryId: string;
    replyId?: string;
    message: string;
    tag?: string;
  } | null>(null);
  const [editSubmitting, setEditSubmitting] = React.useState(false);

  // Liked items tracking in session
  const [likedMap, setLikedMap] = React.useState<{ [key: string]: boolean }>(
    {},
  );

  // Check saved cooldown on mount
  React.useEffect(() => {
    try {
      const savedTime = localStorage.getItem("guestbook_last_submitted");
      if (savedTime) {
        const elapsed = Math.floor(
          (Date.now() - parseInt(savedTime, 10)) / 1000,
        );
        if (elapsed < 20) {
          setCooldown(20 - elapsed);
        }
      }
    } catch {
      // ignore localStorage error
    }
  }, []);

  // Cooldown countdown timer effect
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/guestbook");
      const data = await res.json();
      if (data.success) {
        setEntries(data.entries);
      }
    } catch (error) {
      console.error("Gagal mengambil data buku tamu:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchEntries();
  }, []);

  // Listen for Cmd + . (Mac) or Ctrl + . (Windows/Linux) shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "." || e.code === "Period")) {
        e.preventDefault();
        setShowOwnerModal((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleVerifyOwner = () => {
    if (
      passcode === "3sopdsi" ||
      passcode === "esopdsi" ||
      passcode === "esopds1"
    ) {
      setIsOwnerVerified(true);
      setIsOwnerMode(true);
      setName("Boy Aghnia Rifadhan");
      setHandle("@boyaghnia");
      setShowOwnerModal(false);
    } else {
      alert("Passcode salah! Masukkan passcode admin yang benar.");
    }
  };

  const handleHandleChange = (val: string) => {
    if (!val) {
      setHandle("");
      return;
    }
    if (val === "@") {
      setHandle("@");
      return;
    }
    const clean = val.replace(/^@+/, "");
    setHandle(`@${clean}`);
  };

  const handleReplyHandleChange = (val: string) => {
    if (!val) {
      setReplyHandle("");
      return;
    }
    if (val === "@") {
      setReplyHandle("@");
      return;
    }
    const clean = val.replace(/^@+/, "");
    setReplyHandle(`@${clean}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert("Silakan isi nama dan pesan Anda.");
      return;
    }

    if (cooldown > 0 && !isOwnerMode) {
      alert(
        `Harap tunggu ${cooldown} detik sebelum mengirim pesan berikutnya.`,
      );
      return;
    }

    const formattedHandle = isOwnerMode ? "@boyaghnia" : formatHandle(handle);

    try {
      setSubmitting(true);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          name: name.trim(),
          handle: formattedHandle || undefined,
          message: message.trim(),
          website: honeypot, // Honeypot field
          tag: isOwnerMode ? "Owner Note" : selectedTag,
          passcode: isOwnerMode && isOwnerVerified ? passcode : undefined,
          isPinned: isOwnerMode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEntries(data.entries);
        setMessage("");
        setHoneypot("");
        if (!isOwnerMode) {
          setName("");
          setHandle("");
          // Set 20-second client-side cooldown
          setCooldown(20);
          try {
            localStorage.setItem(
              "guestbook_last_submitted",
              Date.now().toString(),
            );
          } catch {}
        }
      } else {
        if (data.retryAfter) {
          setCooldown(data.retryAfter);
        }
        alert(data.error || "Gagal mengirim pesan.");
      }
    } catch (error) {
      console.error("Gagal mengirim:", error);
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (entryId: string) => {
    const activeName =
      isOwnerMode && isOwnerVerified ? "Boy Aghnia Rifadhan" : replyName;
    if (!activeName.trim() || !replyMessage.trim()) {
      alert("Nama dan pesan balasan wajib diisi.");
      return;
    }

    if (cooldown > 0 && !isOwnerMode) {
      alert(
        `Harap tunggu ${cooldown} detik sebelum mengirim pesan berikutnya.`,
      );
      return;
    }

    const formattedReplyHandle =
      isOwnerMode && isOwnerVerified ? "@boyaghnia" : formatHandle(replyHandle);

    try {
      setReplySubmitting(true);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reply",
          entryId,
          name: activeName.trim(),
          handle: formattedReplyHandle || undefined,
          message: replyMessage.trim(),
          website: replyHoneypot, // Honeypot field
          passcode: isOwnerMode && isOwnerVerified ? passcode : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEntries(data.entries);
        setReplyMessage("");
        setReplyHoneypot("");
        setActiveReplyId(null);
        if (!isOwnerMode) {
          // Set 20-second client-side cooldown
          setCooldown(20);
          try {
            localStorage.setItem(
              "guestbook_last_submitted",
              Date.now().toString(),
            );
          } catch {}
        }
      } else {
        if (data.retryAfter) {
          setCooldown(data.retryAfter);
        }
        alert(data.error || "Gagal mengirim balasan.");
      }
    } catch (error) {
      console.error("Gagal membalas:", error);
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setReplySubmitting(false);
    }
  };

  const handleLike = async (entryId: string, replyId?: string) => {
    const key = replyId ? `${entryId}-${replyId}` : entryId;
    if (likedMap[key]) return; // Cegah spam like dalam satu sesi

    setLikedMap((prev) => ({ ...prev, [key]: true }));

    // Optimistic update
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === entryId) {
          if (replyId) {
            return {
              ...entry,
              replies: entry.replies.map((r) =>
                r.id === replyId ? { ...r, likes: (r.likes || 0) + 1 } : r,
              ),
            };
          }
          return { ...entry, likes: (entry.likes || 0) + 1 };
        }
        return entry;
      }),
    );

    try {
      await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "like",
          entryId,
          replyId,
        }),
      });
    } catch (err) {
      console.error("Gagal like:", err);
    }
  };

  const handleDelete = async (entryId: string, replyId?: string) => {
    const isReply = Boolean(replyId);
    const confirmMessage = isReply
      ? "Apakah Anda yakin ingin menghapus balasan ini?"
      : "Apakah Anda yakin ingin menghapus pesan buku tamu ini?";

    if (!confirm(confirmMessage)) return;

    // Optimistic UI update
    if (replyId) {
      setEntries((prev) =>
        prev.map((entry) => {
          if (entry.id === entryId) {
            return {
              ...entry,
              replies: entry.replies.filter((r) => r.id !== replyId),
            };
          }
          return entry;
        }),
      );
    } else {
      setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
    }

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          entryId,
          replyId,
          passcode: isOwnerMode && isOwnerVerified ? passcode : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEntries(data.entries);
      } else {
        alert(data.error || "Gagal menghapus pesan.");
        fetchEntries();
      }
    } catch (error) {
      console.error("Gagal menghapus pesan:", error);
      alert("Terjadi kesalahan jaringan.");
      fetchEntries();
    }
  };

  const handleStartEdit = (
    entryId: string,
    message: string,
    tag?: string,
    replyId?: string,
  ) => {
    setEditingItem({ entryId, replyId, message, tag });
  };

  const handleSaveEdit = async () => {
    if (!editingItem || !editingItem.message.trim()) {
      alert("Pesan tidak boleh kosong.");
      return;
    }

    const { entryId, replyId, message, tag } = editingItem;

    // Optimistic update
    if (replyId) {
      setEntries((prev) =>
        prev.map((entry) => {
          if (entry.id === entryId) {
            return {
              ...entry,
              replies: entry.replies.map((r) =>
                r.id === replyId ? { ...r, message: message.trim() } : r,
              ),
            };
          }
          return entry;
        }),
      );
    } else {
      setEntries((prev) =>
        prev.map((entry) => {
          if (entry.id === entryId) {
            return {
              ...entry,
              message: message.trim(),
              tag: tag || entry.tag,
            };
          }
          return entry;
        }),
      );
    }

    try {
      setEditSubmitting(true);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "edit",
          entryId,
          replyId,
          message: message.trim(),
          tag: tag || undefined,
          passcode: isOwnerMode && isOwnerVerified ? passcode : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEntries(data.entries);
        setEditingItem(null);
      } else {
        alert(data.error || "Gagal menyimpan perubahan.");
        fetchEntries();
      }
    } catch (error) {
      console.error("Gagal mengedit:", error);
      alert("Terjadi kesalahan jaringan.");
      fetchEntries();
    } finally {
      setEditSubmitting(false);
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.handle &&
        entry.handle.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "Semua" ||
      entry.tag.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const totalReplies = entries.reduce(
    (acc, curr) => acc + (curr.replies?.length || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Dynamic Background Effect */}
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-50 dark:opacity-30 pointer-events-none">
        <SideRays
          speed={2}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={1.8}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      </div>

      <Navbar />

      <main className="container mx-auto pt-32 pb-24 max-w-7xl relative z-10">
        {/* Breadcrumb / Back button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between max-w-6xl mx-auto"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Only shown when Owner Mode is active to let owner know or switch off */}
          {isOwnerMode && isOwnerVerified && (
            <button
              type="button"
              onClick={() => setShowOwnerModal(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-semibold border bg-amber-500/15 text-amber-500 border-amber-500/40 shadow-sm transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Owner Mode Aktif</span>
            </button>
          )}
        </motion.div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Buku Tamu Interaktif</span>
          </div> */}

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Guest Book & Komentar
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Tinggalkan pesan, saran, peluang kerjasama, atau sapaan hangat. Anda
            juga dapat saling berdiskusi dan saya akan merespon pesan Anda
            secara langsung!
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border/40 max-w-lg mx-auto text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground text-lg">
                {entries.length}
              </span>
              <span className="text-muted-foreground">Pesan Tamu</span>
            </div>
            <div className="w-px h-4 bg-border/60"></div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground text-lg">
                {totalReplies}
              </span>
              <span className="text-muted-foreground">Balasan</span>
            </div>
            <div className="w-px h-4 bg-border/60"></div>
            <div className="flex items-center gap-2 text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-medium text-xs">Aktif</span>
            </div>
          </div>
        </motion.div>

        {/* Message Input Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14 border border-border/60 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-xl relative overflow-hidden max-w-5xl mx-auto"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-none bg-primary/10 border border-primary/20 text-primary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  {isOwnerMode && isOwnerVerified
                    ? "Tulis Pesan sebagai Pemilik (Boy Aghnia)"
                    : "Tinggalkan Pesan Anda"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Pesan Anda akan tampil secara publik di halaman ini.
                </p>
              </div>
            </div>

            {isOwnerMode && isOwnerVerified && (
              <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/40 px-2.5 py-0.5 rounded-none flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Owner
              </Badge>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Identity row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Nama Anda <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="text"
                    required
                    disabled={isOwnerMode && isOwnerVerified}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Asep Supena"
                    className="pl-9 rounded-none border-border/60 bg-background/50 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Username / Sosial Media (Opsional)
                </label>
                <div className="relative">
                  <AtSign className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="text"
                    disabled={isOwnerMode && isOwnerVerified}
                    value={handle}
                    onChange={(e) => handleHandleChange(e.target.value)}
                    onBlur={() => {
                      if (handle === "@") setHandle("");
                    }}
                    placeholder="asepsupena_"
                    className="pl-9 rounded-none border-border/60 bg-background/50 focus-visible:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Category / Tag Selection */}
            {!isOwnerMode && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  Kategori Pesan
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_TAGS.map((tag) => (
                    <button
                      key={tag.value}
                      type="button"
                      onClick={() => setSelectedTag(tag.value)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-all rounded-none cursor-pointer ${
                        selectedTag === tag.value
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-muted/30 border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Honeypot field (hidden from real users, traps spambots) */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                opacity: 0,
                top: 0,
                left: 0,
                height: 0,
                width: 0,
                zIndex: -1,
                pointerEvents: "none",
              }}
            >
              <label htmlFor="website-trap">Website</label>
              <input
                id="website-trap"
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Message Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Pesan Anda <span className="text-destructive">*</span>
                </label>
                <span className="text-[11px] text-muted-foreground">
                  {message.length}/600 karakter
                </span>
              </div>
              <Textarea
                required
                maxLength={600}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan pesan, tanggapan, atau kesan Anda di sini..."
                className="rounded-none border-border/60 bg-background/50 focus-visible:ring-primary resize-none"
              />
            </div>

            {/* Submit button & Cooldown indicator */}
            <div className="flex items-center justify-between pt-2">
              <div>
                {cooldown > 0 && !isOwnerMode && (
                  <span className="text-xs text-amber-500 font-medium">
                    ⏱️ Tunggu {cooldown}s sebelum mengirim lagi
                  </span>
                )}
              </div>
              <Button
                type="submit"
                disabled={submitting || (cooldown > 0 && !isOwnerMode)}
                className="rounded-none px-6 font-semibold flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : cooldown > 0 && !isOwnerMode ? (
                  <>
                    <span>Tunggu ({cooldown}s)</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory("Semua")}
              className={`px-3 py-1 text-xs font-medium border transition-all rounded-none shrink-0 cursor-pointer ${
                selectedCategory === "Semua"
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              Semua ({entries.length})
            </button>
            {CATEGORY_TAGS.map((tag) => (
              <button
                key={tag.value}
                type="button"
                onClick={() => setSelectedCategory(tag.value)}
                className={`px-3 py-1 text-xs font-medium border transition-all rounded-none shrink-0 cursor-pointer ${
                  selectedCategory === tag.value
                    ? "bg-foreground text-background border-foreground font-semibold"
                    : "bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tag.value}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Cari pesan atau nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-none border-border/50 bg-background/50"
            />
          </div>
        </div>

        {/* Comments Feed */}
        {loading ? (
          <div className="py-16 text-center text-muted-foreground flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            <p className="text-sm">Memuat pesan buku tamu...</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-border/60 p-8 rounded-none max-w-5xl mx-auto">
            <MessageSquare className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-base font-semibold mb-1">Belum ada pesan</h3>
            <p className="text-sm text-muted-foreground">
              Jadilah yang pertama untuk meninggalkan pesan di buku tamu ini!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {filteredEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`border p-6 shadow-md max-w-5xl mx-auto transition-all rounded-none relative backdrop-blur-sm ${
                    entry.isPinned
                      ? "border-amber-500/40 bg-amber-500/5 dark:bg-amber-950/10"
                      : "border-border/60 bg-card/40 hover:border-border"
                  }`}
                >
                  {/* Pinned Indicator */}
                  {entry.isPinned && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500 mb-3">
                      <Pin className="w-3.5 h-3.5 fill-amber-500" />
                      <span>Sematkan / Pinned Message</span>
                    </div>
                  )}

                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-none bg-gradient-to-br ${entry.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0`}
                      >
                        {getInitials(entry.name)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm md:text-base text-foreground">
                            {entry.name}
                          </span>

                          {entry.isOwner && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-none bg-amber-500/20 text-amber-500 border border-amber-500/40">
                              <ShieldCheck className="w-3 h-3 text-amber-500" />
                              Owner
                            </span>
                          )}

                          {entry.handle && (
                            <span className="text-xs text-muted-foreground font-mono">
                              {entry.handle}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>{formatDate(entry.createdAt)}</span>
                          <span>•</span>
                          <span className="text-[11px] px-2 py-0.2 bg-muted rounded-none">
                            {entry.tag}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Owner edit & delete controls for top-level entry */}
                    {isOwnerMode && isOwnerVerified && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            handleStartEdit(entry.id, entry.message, entry.tag)
                          }
                          className="text-muted-foreground hover:text-amber-500 p-1.5 rounded transition-colors cursor-pointer"
                          title="Edit komentar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(entry.id)}
                          className="text-muted-foreground hover:text-destructive p-1.5 rounded transition-colors cursor-pointer"
                          title="Hapus komentar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Message Content or Edit Mode */}
                  {editingItem?.entryId === entry.id && !editingItem.replyId ? (
                    <div className="my-3 pl-0 md:pl-13 space-y-3 bg-muted/40 p-4 border border-amber-500/40 rounded-none">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-500 flex items-center gap-1.5">
                          <Pencil className="w-3.5 h-3.5" /> Edit Komentar
                        </span>
                        <select
                          value={editingItem.tag || entry.tag}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              tag: e.target.value,
                            })
                          }
                          className="text-xs bg-background border border-border/60 px-2 py-1 rounded-none text-foreground"
                        >
                          {CATEGORY_TAGS.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                          {entry.isOwner && (
                            <option value="Owner Note">Owner Note</option>
                          )}
                        </select>
                      </div>
                      <Textarea
                        rows={3}
                        value={editingItem.message}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            message: e.target.value,
                          })
                        }
                        className="text-xs rounded-none border-border/60 bg-background/80 resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingItem(null)}
                          className="text-xs rounded-none h-7 px-3 cursor-pointer"
                        >
                          Batal
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          disabled={editSubmitting}
                          onClick={handleSaveEdit}
                          className="text-xs rounded-none h-7 px-4 bg-amber-500 hover:bg-amber-600 text-black font-bold cursor-pointer"
                        >
                          {editSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm md:text-base leading-relaxed text-foreground/90 mb-4 whitespace-pre-wrap pl-0 md:pl-13">
                      {entry.message}
                    </p>
                  )}

                  {/* Action Row */}
                  <div className="flex items-center gap-4 pt-2 border-t border-border/30 pl-0 md:pl-13">
                    <button
                      type="button"
                      onClick={() => handleLike(entry.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                        likedMap[entry.id]
                          ? "text-rose-500 font-semibold"
                          : "text-muted-foreground hover:text-rose-500"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedMap[entry.id]
                            ? "fill-rose-500 text-rose-500"
                            : ""
                        }`}
                      />
                      <span>{entry.likes || 0}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (activeReplyId === entry.id) {
                          setActiveReplyId(null);
                        } else {
                          setActiveReplyId(entry.id);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Reply className="w-4 h-4" />
                      <span>
                        Balas{" "}
                        {entry.replies?.length > 0
                          ? `(${entry.replies.length})`
                          : ""}
                      </span>
                    </button>
                  </div>

                  {/* Replies List */}
                  {entry.replies && entry.replies.length > 0 && (
                    <div className="mt-4 pt-4 space-y-3 pl-4 md:pl-13 border-l-2 border-primary/20 ml-2 md:ml-6">
                      {entry.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className={`p-3.5 rounded-none border text-xs md:text-sm relative ${
                            reply.isOwner
                              ? "bg-amber-500/5 border-amber-500/30"
                              : "bg-muted/30 border-border/40"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-6 h-6 rounded-none bg-gradient-to-br ${reply.avatarColor} flex items-center justify-center text-white font-bold text-[10px] shrink-0`}
                              >
                                {getInitials(reply.name)}
                              </div>
                              <span className="font-bold text-foreground">
                                {reply.name}
                              </span>
                              {reply.isOwner && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[9px] font-bold uppercase rounded-none bg-amber-500/20 text-amber-500 border border-amber-500/40">
                                  <ShieldCheck className="w-2.5 h-2.5" />
                                  Owner
                                </span>
                              )}
                              {reply.handle && (
                                <span className="text-[11px] text-muted-foreground font-mono">
                                  {reply.handle}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-muted-foreground">
                                {formatDate(reply.createdAt)}
                              </span>
                              {/* Owner edit & delete controls for reply */}
                              {isOwnerMode && isOwnerVerified && (
                                <div className="flex items-center gap-0.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleStartEdit(
                                        entry.id,
                                        reply.message,
                                        undefined,
                                        reply.id,
                                      )
                                    }
                                    className="text-muted-foreground hover:text-amber-500 p-1 rounded transition-colors cursor-pointer"
                                    title="Edit balasan"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(entry.id, reply.id)
                                    }
                                    className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors cursor-pointer"
                                    title="Hapus balasan"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Reply Content or Edit Mode */}
                          {editingItem?.entryId === entry.id &&
                          editingItem.replyId === reply.id ? (
                            <div className="my-2 pl-8 space-y-2 bg-muted/60 p-3 border border-amber-500/40 rounded-none">
                              <span className="text-[11px] font-semibold text-amber-500 flex items-center gap-1">
                                <Pencil className="w-3 h-3" /> Edit Balasan
                              </span>
                              <Textarea
                                rows={2}
                                value={editingItem.message}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    message: e.target.value,
                                  })
                                }
                                className="text-xs rounded-none border-border/60 bg-background/80 resize-none"
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingItem(null)}
                                  className="text-xs rounded-none h-6 px-2.5 cursor-pointer"
                                >
                                  Batal
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  disabled={editSubmitting}
                                  onClick={handleSaveEdit}
                                  className="text-xs rounded-none h-6 px-3 bg-amber-500 hover:bg-amber-600 text-black font-bold cursor-pointer"
                                >
                                  {editSubmitting ? "Menyimpan..." : "Simpan"}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="leading-relaxed text-foreground/90 pl-8 whitespace-pre-wrap">
                              {reply.message}
                            </p>
                          )}

                          <div className="flex items-center gap-3 pt-2 pl-8">
                            <button
                              type="button"
                              onClick={() => handleLike(entry.id, reply.id)}
                              className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer ${
                                likedMap[`${entry.id}-${reply.id}`]
                                  ? "text-rose-500 font-semibold"
                                  : "text-muted-foreground hover:text-rose-500"
                              }`}
                            >
                              <Heart
                                className={`w-3 h-3 ${
                                  likedMap[`${entry.id}-${reply.id}`]
                                    ? "fill-rose-500 text-rose-500"
                                    : ""
                                }`}
                              />
                              <span>{reply.likes || 0}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Active Inline Reply Box */}
                  <AnimatePresence>
                    {activeReplyId === entry.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-border/40 pl-0 md:pl-13"
                      >
                        <div className="bg-background/80 border border-border/60 p-4 rounded-none space-y-3">
                          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                            <CornerDownRight className="w-3.5 h-3.5" />
                            <span>
                              {isOwnerMode && isOwnerVerified
                                ? "Balas sebagai Boy Aghnia (Owner)"
                                : `Balas ke ${entry.name}`}
                            </span>
                          </div>

                          {!isOwnerMode && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <Input
                                type="text"
                                placeholder="Nama Anda *"
                                value={replyName}
                                onChange={(e) => setReplyName(e.target.value)}
                                className="h-8 text-xs rounded-none border-border/60"
                              />
                              <Input
                                type="text"
                                placeholder="Username/Sosmed (Opsional)"
                                value={replyHandle}
                                onChange={(e) =>
                                  handleReplyHandleChange(e.target.value)
                                }
                                onBlur={() => {
                                  if (replyHandle === "@") setReplyHandle("");
                                }}
                                className="h-8 text-xs rounded-none border-border/60"
                              />
                            </div>
                          )}

                          {/* Reply Honeypot */}
                          <div
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              opacity: 0,
                              height: 0,
                              width: 0,
                              zIndex: -1,
                              pointerEvents: "none",
                            }}
                          >
                            <input
                              type="text"
                              name="website"
                              value={replyHoneypot}
                              onChange={(e) => setReplyHoneypot(e.target.value)}
                              tabIndex={-1}
                              autoComplete="off"
                            />
                          </div>

                          <Textarea
                            rows={2}
                            maxLength={600}
                            placeholder="Tulis balasan Anda..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="text-xs rounded-none border-border/60 resize-none"
                          />

                          <div className="flex items-center justify-between gap-2">
                            <div>
                              {cooldown > 0 && !isOwnerMode && (
                                <span className="text-[11px] text-amber-500 font-medium">
                                  ⏱️ Tunggu {cooldown}s
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveReplyId(null)}
                                className="text-xs rounded-none h-8 px-3 cursor-pointer"
                              >
                                Batal
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                disabled={
                                  replySubmitting ||
                                  (cooldown > 0 && !isOwnerMode)
                                }
                                onClick={() => handleReplySubmit(entry.id)}
                                className="text-xs rounded-none h-8 px-4 bg-primary text-primary-foreground font-semibold cursor-pointer disabled:opacity-50"
                              >
                                {replySubmitting
                                  ? "Mengirim..."
                                  : cooldown > 0 && !isOwnerMode
                                    ? `Tunggu (${cooldown}s)`
                                    : "Kirim Balasan"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Owner Authentication Modal (Triggered by Cmd + .) */}
      <AnimatePresence>
        {showOwnerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border/80 p-6 max-w-md w-full shadow-2xl rounded-none"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500/15 border border-amber-500/30 text-amber-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">
                      {isOwnerVerified
                        ? "Pengaturan Mode Pemilik"
                        : "Verifikasi Mode Pemilik"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {isOwnerVerified
                        ? "Anda telah terverifikasi sebagai pemilik"
                        : "Masukkan passcode untuk membalas & mengelola pesan"}
                    </p>
                  </div>
                </div>
              </div>

              {isOwnerVerified ? (
                <div className="space-y-4 pt-2">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-xs text-amber-500 flex items-center justify-between">
                    <span>Status: Mode Pemilik Aktif</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOwnerMode(!isOwnerMode);
                        setShowOwnerModal(false);
                      }}
                      className="underline font-bold hover:text-amber-400 cursor-pointer"
                    >
                      {isOwnerMode ? "Nonaktifkan Mode" : "Aktifkan Mode"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setIsOwnerVerified(false);
                        setIsOwnerMode(false);
                        setPasscode("");
                        setName("");
                        setHandle("");
                        setShowOwnerModal(false);
                      }}
                      className="rounded-none text-xs cursor-pointer"
                    >
                      Keluar (Logout)
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setShowOwnerModal(false)}
                      className="rounded-none text-xs bg-amber-500 hover:bg-amber-600 text-black font-bold cursor-pointer"
                    >
                      Tutup
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                      Passcode Owner
                    </label>
                    <Input
                      type="password"
                      autoFocus
                      placeholder="Masukkan passcode..."
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleVerifyOwner();
                        if (e.key === "Escape") setShowOwnerModal(false);
                      }}
                      className="rounded-none border-border/60"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowOwnerModal(false)}
                      className="rounded-none text-xs cursor-pointer"
                    >
                      Batal
                    </Button>
                    <Button
                      type="button"
                      onClick={handleVerifyOwner}
                      className="rounded-none text-xs bg-amber-500 hover:bg-amber-600 text-black font-bold cursor-pointer"
                    >
                      Verifikasi
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </div>
  );
}
