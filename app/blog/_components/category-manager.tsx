"use client";

import * as React from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Check,
  AlertCircle,
  RefreshCw,
  Tag,
  Hash,
  Palette,
  FileText,
  X,
  Layers,
} from "lucide-react";
import { BlogCategoryOption } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface CategoryManagerProps {
  passcode: string;
  onCategoryChanged?: () => void;
}

const PRESET_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Emerald", value: "#10B981" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Indigo", value: "#6366F1" },
];

export function CategoryManager({
  passcode,
  onCategoryChanged,
}: CategoryManagerProps) {
  const [categories, setCategories] = React.useState<BlogCategoryOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] =
    React.useState<BlogCategoryOption | null>(null);
  const [labelInput, setLabelInput] = React.useState("");
  const [slugInput, setSlugInput] = React.useState("");
  const [autoSlug, setAutoSlug] = React.useState(true);
  const [descriptionInput, setDescriptionInput] = React.useState("");
  const [colorInput, setColorInput] = React.useState("#3B82F6");

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] =
    React.useState<BlogCategoryOption | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Status & Feedback
  const [isSaving, setIsSaving] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchCategories = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blog/categories");
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("Gagal memuat kategori:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Auto-slug generation
  const handleLabelChange = (val: string) => {
    setLabelInput(val);
    if (autoSlug && !editingCategory) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlugInput(generated);
    }
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setLabelInput("");
    setSlugInput("");
    setAutoSlug(true);
    setDescriptionInput("");
    setColorInput("#3B82F6");
    setFeedback(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: BlogCategoryOption) => {
    setEditingCategory(category);
    setLabelInput(category.label);
    setSlugInput(category.id);
    setAutoSlug(false);
    setDescriptionInput(category.description || "");
    setColorInput(category.color || "#3B82F6");
    setFeedback(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFeedback(null);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labelInput.trim() || !slugInput.trim()) {
      setFeedback({
        type: "error",
        message: "Nama dan slug kategori wajib diisi.",
      });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      if (editingCategory) {
        // PUT update
        const res = await fetch("/api/blog/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passcode,
            currentId: editingCategory.id,
            id: slugInput.trim(),
            label: labelInput.trim(),
            description: descriptionInput.trim(),
            color: colorInput,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: "success", message: data.message });
          setTimeout(() => {
            closeModal();
            fetchCategories();
            onCategoryChanged?.();
          }, 800);
        } else {
          setFeedback({
            type: "error",
            message: data.error || "Gagal memperbarui kategori.",
          });
        }
      } else {
        // POST create
        const res = await fetch("/api/blog/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passcode,
            id: slugInput.trim(),
            label: labelInput.trim(),
            description: descriptionInput.trim(),
            color: colorInput,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setFeedback({ type: "success", message: data.message });
          setTimeout(() => {
            closeModal();
            fetchCategories();
            onCategoryChanged?.();
          }, 800);
        } else {
          setFeedback({
            type: "error",
            message: data.error || "Gagal menambahkan kategori.",
          });
        }
      }
    } catch (err) {
      console.error(err);
      setFeedback({
        type: "error",
        message: "Terjadi kesalahan koneksi server.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(
        `/api/blog/categories?id=${encodeURIComponent(deleteTarget.id)}`,
        {
          method: "DELETE",
          headers: {
            "x-passcode": passcode,
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        setDeleteTarget(null);
        fetchCategories();
        onCategoryChanged?.();
      } else {
        alert(data.error || "Gagal menghapus kategori.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan saat menghapus kategori.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-card/60 backdrop-blur-md border border-border/40 rounded-none">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-mono tracking-tight flex items-center gap-2">
              Kelola Kategori Artikel
              <Badge
                variant="outline"
                className="rounded-none border-primary/30 text-primary text-xs font-mono"
              >
                {categories.length} Kategori
              </Badge>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Atur taksonomi topik artikel blog, warna aksen, dan deskripsi
              kategori.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCategories}
            disabled={isLoading}
            className="rounded-none border-border/40 hover:border-primary/40 font-mono text-xs gap-1.5"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-primary" : ""}`}
            />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={openAddModal}
            className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Tambah Kategori
          </Button>
        </div>
      </div>

      {/* Categories List Table */}
      <div className="bg-card/60 backdrop-blur-md border border-border/40 rounded-none overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground font-mono text-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-primary" />
            Memuat daftar kategori...
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground font-mono text-sm space-y-2">
            <Layers className="w-8 h-8 mx-auto text-muted-foreground/40" />
            <p>Belum ada kategori yang ditambahkan.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <div
                    className="w-4 h-4 shrink-0 rounded-none border border-black/20 shadow-sm mt-1 sm:mt-0"
                    style={{ backgroundColor: category.color || "#3B82F6" }}
                    title={`Color: ${category.color || "#3B82F6"}`}
                  />

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm sm:text-base text-foreground">
                        {category.label}
                      </span>
                      <code className="text-xs font-mono bg-muted/60 text-muted-foreground px-1.5 py-0.5 border border-border/40">
                        slug: {category.id}
                      </code>
                      <Badge
                        variant="secondary"
                        className="rounded-none text-[11px] font-mono border border-border/30"
                      >
                        {category.count || 0} artikel
                      </Badge>
                    </div>
                    {category.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(category)}
                    className="rounded-none border-border/40 hover:border-primary/40 font-mono text-xs gap-1.5 h-8 px-2.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteTarget(category)}
                    className="rounded-none border-destructive/30 text-destructive hover:bg-destructive/10 font-mono text-xs gap-1.5 h-8 px-2.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border/60 rounded-none shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/40 bg-muted/20">
              <div className="flex items-center gap-2.5">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base sm:text-lg font-mono">
                  {editingCategory
                    ? `Edit Kategori: ${editingCategory.label}`
                    : "Tambah Kategori Baru"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleSaveCategory}
              className="p-4 sm:p-6 space-y-4"
            >
              {feedback && (
                <div
                  className={`p-3 text-xs font-mono border flex items-center gap-2 ${
                    feedback.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-destructive/10 border-destructive/30 text-destructive"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <Check className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Category Label */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  Nama Kategori <span className="text-destructive">*</span>
                </label>
                <Input
                  value={labelInput}
                  onChange={(e) => handleLabelChange(e.target.value)}
                  placeholder="Contoh: Artificial Intelligence"
                  className="rounded-none border-border/40 font-mono text-sm"
                  required
                />
              </div>

              {/* Slug ID */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-primary" />
                    Slug ID (URL Friendly){" "}
                    <span className="text-destructive">*</span>
                  </label>
                  {!editingCategory && (
                    <button
                      type="button"
                      onClick={() => setAutoSlug(!autoSlug)}
                      className="text-[11px] font-mono text-primary hover:underline"
                    >
                      {autoSlug ? "Ubah Manual" : "Auto-generate"}
                    </button>
                  )}
                </div>
                <Input
                  value={slugInput}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlugInput(e.target.value);
                  }}
                  placeholder="contoh: ai"
                  className="rounded-none border-border/40 font-mono text-sm"
                  required
                />
                {editingCategory && slugInput !== editingCategory.id && (
                  <p className="text-[11px] text-amber-500 font-mono">
                    Perhatian: Mengubah slug akan otomatis memperbarui kategori
                    di semua artikel terkait.
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  Deskripsi Kategori (Opsional)
                </label>
                <Input
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  placeholder="Penjelasan singkat mengenai topik artikel ini"
                  className="rounded-none border-border/40 font-mono text-sm"
                />
              </div>

              {/* Color Picker & Presets */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-primary" />
                  Warna Aksen Kategori
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    className="w-10 h-10 border border-border/40 cursor-pointer bg-transparent"
                  />
                  <Input
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    className="rounded-none border-border/40 font-mono text-xs w-28 uppercase"
                    maxLength={7}
                  />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {PRESET_COLORS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setColorInput(preset.value)}
                        className={`w-5 h-5 rounded-none border transition-transform ${
                          colorInput.toLowerCase() ===
                          preset.value.toLowerCase()
                            ? "scale-110 border-white ring-1 ring-primary"
                            : "border-black/30 hover:scale-105"
                        }`}
                        style={{ backgroundColor: preset.value }}
                        title={preset.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border/40 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="rounded-none border-border/40 font-mono text-xs"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs gap-1.5"
                >
                  {isSaving ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  {editingCategory ? "Perbarui Kategori" : "Simpan Kategori"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-destructive/40 rounded-none shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center gap-3 text-destructive">
              <div className="w-10 h-10 bg-destructive/10 border border-destructive/30 flex items-center justify-center rounded-none">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg font-mono">Hapus Kategori?</h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Apakah Anda yakin ingin menghapus kategori{" "}
              <strong className="text-foreground font-mono">
                "{deleteTarget.label}"
              </strong>{" "}
              ({deleteTarget.id})?
            </p>

            {(deleteTarget.count || 0) > 0 && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-xs font-mono space-y-1">
                <p className="font-bold">⚠️ Perhatian:</p>
                <p>
                  Kategori ini saat ini digunakan oleh{" "}
                  <strong>{deleteTarget.count}</strong> artikel. Anda harus
                  mengubah kategori pada artikel-artikel tersebut sebelum dapat
                  menghapusnya.
                </p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteTarget(null)}
                className="rounded-none border-border/40 font-mono text-xs"
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteCategory}
                disabled={isDeleting || (deleteTarget.count || 0) > 0}
                className="rounded-none font-mono text-xs gap-1.5"
              >
                {isDeleting ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                Hapus Sekarang
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
