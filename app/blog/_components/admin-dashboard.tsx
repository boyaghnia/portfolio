"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  FileText,
  Eye,
  Heart,
  CheckCircle,
  Clock,
  Edit2,
  Trash2,
  ExternalLink,
  LogOut,
  Sparkles,
  Sliders,
  FolderTree,
} from "lucide-react";
import { BlogPost, formatBlogDate } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DeleteModal } from "./delete-modal";
import { SidebarSettingsEditor } from "./sidebar-settings-editor";
import { CategoryManager } from "./category-manager";

interface AdminDashboardProps {
  posts: BlogPost[];
  passcode: string;
  onNewPost: () => void;
  onEditPost: (post: BlogPost) => void;
  onRefreshPosts: () => void;
  onLogout: () => void;
}

export function AdminDashboard({
  posts,
  passcode,
  onNewPost,
  onEditPost,
  onRefreshPosts,
  onLogout,
}: AdminDashboardProps) {
  const [adminTab, setAdminTab] = React.useState<"posts" | "categories" | "sidebar">("posts");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "published" | "draft">("all");
  const [deleteTarget, setDeleteTarget] = React.useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isTogglingId, setIsTogglingId] = React.useState<string | null>(null);

  // Computed statistics
  const stats = React.useMemo(() => {
    const total = posts.length;
    const published = posts.filter((p) => p.published).length;
    const drafts = total - published;
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);

    return { total, published, drafts, totalViews, totalLikes };
  }, [posts]);

  // Filtered posts
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "published"
          ? post.published
          : !post.published;

      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, statusFilter]);

  // Quick toggle publish status
  const handleTogglePublish = async (post: BlogPost) => {
    setIsTogglingId(post.id);
    try {
      const res = await fetch("/api/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode,
          post: {
            id: post.id,
            published: !post.published,
          },
        }),
      });

      if (res.ok) {
        onRefreshPosts();
      }
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    } finally {
      setIsTogglingId(null);
    }
  };

  // Delete handler
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode,
          id: deleteTarget.id,
        }),
      });

      if (res.ok) {
        setDeleteTarget(null);
        onRefreshPosts();
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Top Navbar in CMS */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Control Panel
            </span>
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            CMS Manajemen Blog
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/blog" target="_blank">
            <Button variant="outline" size="sm" className="rounded-none gap-1.5 text-xs cursor-pointer">
              <span>Buka Blog Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>

          <Button
            onClick={onNewPost}
            size="sm"
            className="rounded-none gap-1.5 text-xs font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="rounded-none gap-1.5 text-xs text-muted-foreground hover:text-destructive cursor-pointer"
            title="Keluar dari CMS"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      </div>

      {/* Tab Switcher: Kelola Artikel vs Kelola Kategori vs Pengaturan Sidebar & Iklan */}
      <div className="flex items-center gap-2 mb-8 border-b border-border/40 pb-px overflow-x-auto">
        <button
          onClick={() => setAdminTab("posts")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-none border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            adminTab === "posts"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Kelola Artikel</span>
          <span className="px-1.5 py-0.5 text-[10px] rounded-none bg-muted text-muted-foreground font-mono">
            {posts.length}
          </span>
        </button>

        <button
          onClick={() => setAdminTab("categories")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-none border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            adminTab === "categories"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Kelola Kategori</span>
        </button>

        <button
          onClick={() => setAdminTab("sidebar")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-none border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            adminTab === "sidebar"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Pengaturan Sidebar & Iklan</span>
        </button>
      </div>

      {adminTab === "categories" ? (
        <CategoryManager passcode={passcode} onCategoryChanged={onRefreshPosts} />
      ) : adminTab === "sidebar" ? (
        <SidebarSettingsEditor passcode={passcode} />
      ) : (
        <>
          {/* Stats Widgets */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <div className="p-4 rounded-none border border-border/50 bg-card/60 backdrop-blur-md">
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1.5">
            <span>Total Artikel</span>
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
        </div>

        <div className="p-4 rounded-none border border-border/50 bg-card/60 backdrop-blur-md">
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1.5">
            <span>Terbit (Live)</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.published}</div>
        </div>

        <div className="p-4 rounded-none border border-border/50 bg-card/60 backdrop-blur-md">
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1.5">
            <span>Draf (Draft)</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.drafts}</div>
        </div>

        <div className="p-4 rounded-none border border-border/50 bg-card/60 backdrop-blur-md">
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1.5">
            <span>Total Pembaca</span>
            <Eye className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.totalViews}</div>
        </div>

        <div className="p-4 rounded-none border border-border/50 bg-card/60 backdrop-blur-md col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1.5">
            <span>Apresiasi (Likes)</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.totalLikes}</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-none bg-muted/50 border border-border/50 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-none text-xs font-medium transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Semua ({posts.length})
          </button>
          <button
            onClick={() => setStatusFilter("published")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-none text-xs font-medium transition-all cursor-pointer ${
              statusFilter === "published"
                ? "bg-card text-foreground shadow-sm font-semibold text-emerald-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Terbit ({stats.published})
          </button>
          <button
            onClick={() => setStatusFilter("draft")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-none text-xs font-medium transition-all cursor-pointer ${
              statusFilter === "draft"
                ? "bg-card text-foreground shadow-sm font-semibold text-amber-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Draf ({stats.drafts})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 py-2 rounded-none text-xs bg-card border-border/60"
          />
        </div>
      </div>

      {/* Articles Table / Cards */}
      <div className="rounded-none border border-border/60 bg-card overflow-hidden shadow-lg">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-foreground mb-1">
              Tidak ada artikel ditemukan
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              {searchQuery
                ? "Coba sesuaikan kata kunci pencarian Anda."
                : "Mulai tulis artikel pertama Anda sekarang!"}
            </p>
            <Button onClick={onNewPost} size="sm" className="rounded-none gap-1.5 text-xs cursor-pointer">
              <Plus className="w-4 h-4" /> Tulis Artikel Baru
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/20 transition-colors"
              >
                {/* Article Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-none overflow-hidden bg-muted shrink-0 border border-border/50">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {/* Status badge */}
                      <button
                        onClick={() => handleTogglePublish(post)}
                        disabled={isTogglingId === post.id}
                        title="Klik untuk mengubah status terbit"
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none transition-all cursor-pointer ${
                          post.published
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25"
                            : "bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25"
                        }`}
                      >
                        {isTogglingId === post.id
                          ? "Memperbarui..."
                          : post.published
                          ? "Terbit"
                          : "Draf"}
                      </button>

                      <Badge variant="outline" className="text-[10px] uppercase font-mono rounded-none">
                        {post.category}
                      </Badge>

                      {post.featured && (
                        <span className="text-[10px] font-semibold text-primary flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Unggulan
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-foreground line-clamp-1 mb-1">
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                      <span>{formatBlogDate(post.publishedAt || post.updatedAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {post.views || 0}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500/80" /> {post.likes || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2.5 rounded-none text-xs cursor-pointer"
                      title="Buka artikel di tab baru"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditPost(post)}
                    className="h-8 px-3 rounded-none text-xs gap-1.5 font-medium cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-primary" />
                    <span>Edit</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteTarget(post)}
                    className="h-8 px-2.5 rounded-none text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                    title="Hapus artikel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        postTitle={deleteTarget?.title || ""}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
