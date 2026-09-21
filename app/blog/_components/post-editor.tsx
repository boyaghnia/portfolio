"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Save,
  Send,
  ArrowLeft,
  Eye,
  Edit3,
  Columns2,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Minus,
  Sparkles,
  Clock,
} from "lucide-react";
import {
  BlogPost,
  BlogCategoryOption,
  BLOG_CATEGORIES,
  calculateReadTime,
  generateSlug,
  toWibDateTimeLocal,
  wibDateTimeToISO,
} from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "./markdown-renderer";

interface PostEditorProps {
  initialPost?: BlogPost | null;
  passcode: string;
  onSaveSuccess: (post: BlogPost) => void;
  onCancel: () => void;
}

const COVER_PRESETS = [
  {
    label: "3D & Shaders",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Code & Editor",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Design Systems",
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Minimal Desk",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "AI & Neural Tech",
    url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Cyber Architecture",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  },
];

const POPULAR_TAGS = [
  "Next.js",
  "React",
  "Three.js",
  "Tailwind CSS",
  "TypeScript",
  "UI/UX",
  "Architecture",
  "Tutorial",
  "Performance",
];

export function PostEditor({
  initialPost,
  passcode,
  onSaveSuccess,
  onCancel,
}: PostEditorProps) {
  const isEditing = Boolean(initialPost?.id);

  // Form states
  const [title, setTitle] = React.useState(initialPost?.title || "");
  const [slug, setSlug] = React.useState(initialPost?.slug || "");
  const [isSlugCustomized, setIsSlugCustomized] = React.useState(Boolean(initialPost?.slug));
  const [category, setCategory] = React.useState(initialPost?.category || "web");
  const [categories, setCategories] = React.useState<BlogCategoryOption[]>(() =>
    BLOG_CATEGORIES.filter((c) => c.id !== "all")
  );

  React.useEffect(() => {
    fetch("/api/blog/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      })
      .catch((err) => console.error("Error fetching categories in post editor:", err));
  }, []);

  const [tags, setTags] = React.useState<string[]>(initialPost?.tags || []);
  const [tagInput, setTagInput] = React.useState("");
  const [excerpt, setExcerpt] = React.useState(initialPost?.excerpt || "");
  const [coverImage, setCoverImage] = React.useState(
    initialPost?.coverImage || COVER_PRESETS[0].url
  );
  const [coverCaption] = React.useState(
    initialPost?.coverCaption || ""
  );
  const [featured, setFeatured] = React.useState(initialPost?.featured || false);
  const [published, setPublished] = React.useState(
    initialPost?.published !== undefined ? initialPost.published : true
  );
  const [publishedAt, setPublishedAt] = React.useState<string>(() =>
    toWibDateTimeLocal(initialPost?.publishedAt)
  );
  const [content, setContent] = React.useState(
    initialPost?.content ||
      "## Pengantar\n\nTulis isi artikel Anda di sini menggunakan format Markdown...\n\n### Poin Pembahasan\n\n- Poin pertama\n- Poin kedua\n\n```typescript\n// Contoh kode\nconst greeting = 'Hello World';\n```"
  );

  // View mode: 'split' | 'edit' | 'preview'
  const [viewMode, setViewMode] = React.useState<"split" | "edit" | "preview">("split");
  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [showPresetGallery, setShowPresetGallery] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-generate slug when title changes unless customized
  React.useEffect(() => {
    if (!isSlugCustomized && title) {
      setSlug(generateSlug(title));
    }
  }, [title, isSlugCustomized]);

  // Read time & Word count calculation
  const wordsCount = React.useMemo(() => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  }, [content]);

  const readTime = React.useMemo(() => {
    return calculateReadTime(content);
  }, [content]);

  // Insert markdown helpers
  const insertMarkdown = (prefix: string, suffix: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end) || placeholder;

    const replacement = `${prefix}${selected}${suffix}`;
    const newContent =
      textarea.value.substring(0, start) +
      replacement +
      textarea.value.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 50);
  };

  // Add tag
  const handleAddTag = (rawTag: string) => {
    const clean = rawTag.trim().replace(/^#/, "");
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Save handler
  const handleSave = async (isPublishing: boolean) => {
    if (!title.trim()) {
      setErrorMessage("Judul artikel tidak boleh kosong.");
      return;
    }
    if (!content.trim()) {
      setErrorMessage("Konten artikel tidak boleh kosong.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    const postPayload: Partial<BlogPost> = {
      ...(initialPost?.id ? { id: initialPost.id } : {}),
      title: title.trim(),
      slug: slug.trim() || generateSlug(title),
      category,
      tags,
      excerpt: excerpt.trim() || content.slice(0, 150) + "...",
      coverImage: coverImage.trim(),
      coverCaption: coverCaption.trim() || undefined,
      featured,
      published: isPublishing,
      publishedAt: isPublishing ? wibDateTimeToISO(publishedAt) : "",
      content,
      readTime,
    };

    try {
      const res = await fetch("/api/blog", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode,
          post: postPayload,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onSaveSuccess(data.post);
      } else {
        setErrorMessage(data.error || "Gagal menyimpan artikel.");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan saat menyimpan artikel.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-md px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="rounded-none gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Button>

          <div className="h-4 w-px bg-border/60 hidden sm:block" />

          <h2 className="text-base sm:text-lg font-bold text-foreground line-clamp-1">
            {isEditing ? `Edit: ${initialPost?.title}` : "Tulis Artikel Baru"}
          </h2>
        </div>

        {/* View Mode Switcher */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-none bg-muted/60 border border-border/50">
          <button
            onClick={() => setViewMode("edit")}
            className={`px-3 py-1.5 rounded-none text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "edit"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setViewMode("split")}
            className={`px-3 py-1.5 rounded-none text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "split"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1.5 rounded-none text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "preview"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Pratinjau</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="rounded-none gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Draft</span>
          </Button>

          <Button
            size="sm"
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="rounded-none gap-1.5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSaving ? "Menyimpan..." : "Publikasikan"}</span>
          </Button>
        </div>
      </header>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-3 mx-4 sm:mx-8 mt-4 rounded-none bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-between">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)}>✕</button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Post Metadata Card */}
        <div className="p-5 sm:p-6 rounded-none border border-border/60 bg-card/60 backdrop-blur-md mb-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Judul Artikel *
            </label>
            <Input
              type="text"
              placeholder="Contoh: Membangun Pengalaman Web 3D Interaktif dengan Three.js..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base sm:text-lg font-bold py-5 rounded-none border-border/60 bg-muted/20 focus-visible:ring-primary/40"
            />
          </div>

          {/* Slug & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Slug URL (Permalink)
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugCustomized(!isSlugCustomized)}
                  className="text-xs text-primary hover:underline"
                >
                  {isSlugCustomized ? "Reset Otomatis" : "Ubah Manual"}
                </button>
              </div>
              <div className="flex items-center rounded-none border border-border/60 bg-muted/20 px-3 py-2 text-xs font-mono text-muted-foreground">
                <span className="shrink-0 text-muted-foreground/70">/blog/</span>
                <input
                  type="text"
                  value={slug}
                  disabled={!isSlugCustomized}
                  onChange={(e) => {
                    setIsSlugCustomized(true);
                    setSlug(generateSlug(e.target.value));
                  }}
                  className="w-full bg-transparent text-foreground outline-none ml-1 disabled:opacity-80"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Kategori Artikel
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-none border border-border/60 bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Ringkasan Cuplikan (Excerpt / SEO Description)
            </label>
            <Textarea
              rows={2}
              placeholder="Tulis ringkasan singkat 1-2 kalimat untuk kartu artikel dan mesin pencari..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="rounded-none border-border/60 bg-muted/20 text-sm focus-visible:ring-primary/40"
            />
          </div>

          {/* Cover Image & Presets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                URL Gambar Sampul (Cover Image)
              </label>
              <button
                type="button"
                onClick={() => setShowPresetGallery(!showPresetGallery)}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pilih dari Galeri Preset</span>
              </button>
            </div>

            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="rounded-none border-border/60 bg-muted/20 text-xs font-mono flex-1 focus-visible:ring-primary/40"
              />
              {coverImage && (
                <div className="relative w-12 h-10 rounded-none overflow-hidden border border-border/60 bg-muted shrink-0">
                  <Image
                    src={coverImage}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Preset gallery drawer */}
            {showPresetGallery && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-3 mt-3 border-t border-border/40"
              >
                {COVER_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setCoverImage(preset.url);
                      setShowPresetGallery(false);
                    }}
                    className={`relative group rounded-none overflow-hidden border transition-all h-20 text-left cursor-pointer ${
                      coverImage === preset.url
                        ? "border-primary ring-2 ring-primary/40 scale-95"
                        : "border-border/60 hover:border-primary/60"
                    }`}
                  >
                    <Image
                      src={preset.url}
                      alt={preset.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors flex items-end p-2">
                      <span className="text-[10px] font-bold text-white line-clamp-1">
                        {preset.label}
                      </span>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Tags Artikel
            </label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-none border border-border/60 bg-muted/20">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1.5 text-xs font-mono bg-card border border-border/60 text-foreground rounded-none"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    ✕
                  </button>
                </Badge>
              ))}
              <input
                type="text"
                placeholder={tags.length === 0 ? "Ketik tag lalu tekan Enter..." : "Tambah tag..."}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
                className="bg-transparent text-xs outline-none px-2 py-1 flex-1 min-w-[120px]"
              />
            </div>

            {/* Popular tags suggestion */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-muted-foreground">Saran:</span>
              {POPULAR_TAGS.map((pt) => (
                <button
                  key={pt}
                  type="button"
                  onClick={() => handleAddTag(pt)}
                  disabled={tags.includes(pt)}
                  className="text-[11px] px-2 py-0.5 rounded-none bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors cursor-pointer"
                >
                  +{pt}
                </button>
              ))}
            </div>
          </div>

          {/* Options: Featured & Published */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-border/40 text-xs text-foreground">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded-none border-border text-primary focus:ring-primary h-4 w-4"
              />
              <span className="font-semibold">Jadikan Artikel Unggulan (Featured)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded-none border-border text-primary focus:ring-primary h-4 w-4"
              />
              <span className="font-semibold">Publikasikan Langsung ke Pembaca</span>
            </label>

            {published && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Waktu Publikasi (WIB):
                </span>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="px-2 py-1 rounded-none border border-border/60 bg-muted/30 text-xs font-mono text-foreground focus:outline-none focus:border-primary cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Workspace */}
        <div className="rounded-none border border-border/60 bg-card overflow-hidden shadow-xl">
          {/* Formatting Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border/60 bg-muted/40 text-xs">
            <button
              type="button"
              onClick={() => insertMarkdown("**", "**", "teks tebal")}
              title="Bold"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("*", "*", "teks miring")}
              title="Italic"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-border/60 mx-1" />
            <button
              type="button"
              onClick={() => insertMarkdown("\n## ", "\n", "Judul Heading 2")}
              title="Heading 2"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("\n### ", "\n", "Subjudul Heading 3")}
              title="Heading 3"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Heading3 className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-border/60 mx-1" />
            <button
              type="button"
              onClick={() => insertMarkdown("\n- ", "", "Item daftar")}
              title="Bullet List"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("\n1. ", "", "Item bernomor")}
              title="Numbered List"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("\n> ", "\n", "Teks kutipan menarik")}
              title="Quote"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Quote className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-border/60 mx-1" />
            <button
              type="button"
              onClick={() => insertMarkdown("\n```tsx\n", "\n```\n", "// Tulis kode di sini")}
              title="Code Block"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("[", "](https://example.com)", "Teks Tautan")}
              title="Insert Link"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("![", "](https://images.unsplash.com/...)", "Deskripsi Gambar")}
              title="Insert Image"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("\n---\n")}
              title="Horizontal Divider"
              className="p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>

            {/* Quick stats on the right */}
            <div className="ml-auto flex items-center gap-3 text-[11px] text-muted-foreground font-mono pr-2">
              <span>{wordsCount} kata</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {readTime} min baca
              </span>
            </div>
          </div>

          {/* Split / Single View Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60 min-h-[500px]">
            {/* Editor Pane */}
            {(viewMode === "edit" || viewMode === "split") && (
              <div className={`${viewMode === "edit" ? "md:col-span-2" : "col-span-1"} flex flex-col`}>
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan artikel Anda menggunakan Markdown di sini..."
                  className="w-full h-full min-h-[500px] p-4 sm:p-6 bg-transparent font-mono text-sm leading-relaxed text-foreground resize-none focus:outline-none"
                />
              </div>
            )}

            {/* Preview Pane */}
            {(viewMode === "preview" || viewMode === "split") && (
              <div
                className={`${
                  viewMode === "preview" ? "md:col-span-2" : "col-span-1"
                } p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[700px] bg-muted/10`}
              >
                <div className="mb-6 pb-6 border-b border-border/40">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Pratinjau Hasil Pembaca
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-2 mb-3">
                    {title || "Judul Artikel Anda Akan Tampil di Sini"}
                  </h1>
                  {excerpt && (
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{excerpt}"
                    </p>
                  )}
                </div>

                <MarkdownRenderer content={content} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
