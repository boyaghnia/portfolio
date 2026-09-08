"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  Sparkles,
  ChevronRight,
  BookOpen,
  User,
  ArrowRight,
} from "lucide-react";

import { SideRays } from "@/components/animations/side-rays";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BlogPost,
  formatBlogDate,
  INITIAL_POSTS,
  SidebarConfig,
  DEFAULT_SIDEBAR_CONFIG,
  BlogCategoryOption,
} from "@/data/blog";
import { MarkdownRenderer } from "../_components/markdown-renderer";
import { BlogSidebar } from "../_components/blog-sidebar";
import { PostActions } from "../_components/post-actions";
import { AdminAuthModal } from "../_components/admin-auth-modal";

export default function BlogPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = React.useState<BlogPost[]>([]);
  const [sidebarConfig, setSidebarConfig] = React.useState<SidebarConfig>(
    DEFAULT_SIDEBAR_CONFIG,
  );
  const [categories, setCategories] = React.useState<BlogCategoryOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  // Listen for Cmd + . (Mac) or Ctrl + . (Windows/Linux) shortcut for Admin access
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "." || e.code === "Period")) {
        e.preventDefault();
        setShowAuthModal((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch post data
  React.useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/blog/${slug}`);
        const data = await res.json();

        if (res.ok && data.success && data.post) {
          setPost(data.post);
        } else {
          // Fallback to initial posts if API couldn't find
          const fallback = INITIAL_POSTS.find((p) => p.slug === slug);
          if (fallback) {
            setPost(fallback);
          } else {
            setNotFound(true);
          }
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
        const fallback = INITIAL_POSTS.find((p) => p.slug === slug);
        if (fallback) {
          setPost(fallback);
        } else {
          setNotFound(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAllPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.posts)) {
          setAllPosts(data.posts);
        }
      } catch {
        setAllPosts(INITIAL_POSTS);
      }
    };

    const fetchSidebarAndCategories = async () => {
      try {
        const [sidebarRes, catRes] = await Promise.all([
          fetch("/api/blog/sidebar", { cache: "no-store" }),
          fetch("/api/blog/categories", { cache: "no-store" }),
        ]);
        const sidebarData = await sidebarRes.json();
        if (sidebarData.success && sidebarData.config) {
          setSidebarConfig(sidebarData.config);
        }
        const catData = await catRes.json();
        if (catData.success && Array.isArray(catData.categories)) {
          setCategories(catData.categories);
        }
      } catch (err) {
        console.error(
          "Error fetching sidebar or categories in detail page:",
          err,
        );
      }
    };

    fetchPost();
    fetchAllPosts();
    fetchSidebarAndCategories();
  }, [slug]);

  // Related posts
  const relatedPosts = React.useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter((p) => p.id !== post.id && p.published)
      .filter(
        (p) =>
          p.category === post.category ||
          p.tags.some((t) => post.tags.includes(t)),
      )
      .slice(0, 2);
  }, [post, allPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs text-muted-foreground font-mono">
            Memuat artikel...
          </span>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center max-w-md">
          <div className="w-16 h-16 rounded-none bg-muted/80 flex items-center justify-center mx-auto mb-4 text-muted-foreground">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Maaf, artikel yang Anda cari mungkin telah dihapus, dipindahkan,
            atau belum dipublikasikan.
          </p>
          <Link href="/blog">
            <Button className="rounded-none">Kembali ke Katalog Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Background Animated Rays */}
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-40 dark:opacity-25 pointer-events-none">
        <SideRays
          speed={2.2}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={1.5}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.4}
          blend={0.7}
          falloff={1.6}
          opacity={1.0}
        />
      </div>

      <Navbar />

      <main className="container mx-auto px-4 pt-24 sm:pt-28 pb-20 max-w-7xl relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-foreground transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-medium truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Header Information */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
            <Badge
              variant="secondary"
              className="text-xs font-semibold uppercase tracking-wider bg-primary/10 border-primary/30 text-primary rounded-none"
            >
              {post.category}
            </Badge>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatBlogDate(post.publishedAt || post.updatedAt)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime} menit baca</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{post.views || 0} pembaca</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2] mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Featured Cover Image */}
        {post.coverImage && (
          <div className="my-8 rounded-none overflow-hidden border border-border/50 bg-muted shadow-2xl relative">
            <div className="relative w-full h-64 sm:h-96 lg:h-[480px]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
            {post.coverCaption && (
              <div className="p-3 text-center text-xs text-muted-foreground bg-card/60 backdrop-blur-sm border-t border-border/40">
                {post.coverCaption}
              </div>
            )}
          </div>
        )}

        {/* 2-Column Content Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-10">
          {/* Main Article Body */}
          <article className="lg:col-span-8 min-w-0">
            <MarkdownRenderer content={post.content} />

            {/* Tags footer */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-8 mt-8 border-t border-border/40 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground mr-1">
                  Tag:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-none bg-muted/60 border border-border/60 text-foreground font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Like & Share Action Bar */}
            <PostActions
              slug={post.slug}
              title={post.title}
              initialLikes={post.likes || 0}
            />
          </article>

          {/* Unified Blog Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar
              posts={allPosts}
              config={sidebarConfig}
              currentPost={post}
              categories={categories}
            />
          </div>
        </div>
      </main>

      {/* Admin Auth Modal (Cmd + .) */}
      <AdminAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectOnSuccess={true}
      />

      <Footer />
      <BackToTop />
    </div>
  );
}
