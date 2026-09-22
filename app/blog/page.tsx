"use client";

import * as React from "react";
import { SideRays } from "@/components/animations/side-rays";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import {
  BlogPost,
  INITIAL_POSTS,
  BLOG_CATEGORIES,
  BlogCategoryOption,
  SidebarConfig,
  DEFAULT_SIDEBAR_CONFIG,
} from "@/data/blog";
import { BlogHero } from "./_components/blog-hero";
import { BlogCard } from "./_components/blog-card";
import { FeaturedPost } from "./_components/featured-post";
import { BlogSidebar } from "./_components/blog-sidebar";
import { AdminAuthModal } from "./_components/admin-auth-modal";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogIndexPage() {
  const [posts, setPosts] = React.useState<BlogPost[]>(INITIAL_POSTS);
  const [sidebarConfig, setSidebarConfig] = React.useState<SidebarConfig>(
    DEFAULT_SIDEBAR_CONFIG,
  );
  const [categories, setCategories] =
    React.useState<BlogCategoryOption[]>(BLOG_CATEGORIES);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
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

  // Load published posts from API
  const loadPosts = React.useCallback(async () => {
    try {
      const res = await fetch("/api/blog", { cache: "no-store" });
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Failed to load posts from API:", error);
    }
  }, []);

  // Load sidebar configuration
  const loadSidebarConfig = React.useCallback(async () => {
    try {
      const res = await fetch("/api/blog/sidebar", { cache: "no-store" });
      const data = await res.json();
      if (res.ok && data.success && data.config) {
        setSidebarConfig(data.config);
      }
    } catch (error) {
      console.error("Failed to load sidebar config:", error);
    }
  }, []);

  // Load dynamic categories from API
  const loadCategories = React.useCallback(async () => {
    try {
      const res = await fetch("/api/blog/categories", { cache: "no-store" });
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.categories)) {
        setCategories([
          {
            id: "all",
            label: "Semua Topik",
            description: "Jelajahi semua tulisan dan artikel teknik",
          },
          ...data.categories,
        ]);
      }
    } catch (error) {
      console.error("Failed to load categories from API:", error);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      const q = params.get("search");
      if (cat) setSelectedCategory(cat);
      if (q) setSearchQuery(q);
    }
    loadPosts();
    loadSidebarConfig();
    loadCategories();
  }, [loadPosts, loadSidebarConfig, loadCategories]);

  // Filter posts
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Separate featured post if no search query is active
  const isDefaultView = !searchQuery && selectedCategory === "all";
  const featuredPost = isDefaultView
    ? filteredPosts.find((p) => p.featured) || filteredPosts[0]
    : null;

  const regularPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Background Animated Rays */}
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-50 dark:opacity-35 pointer-events-none">
        <SideRays
          speed={2.2}
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

      <main className="container mx-auto px-4 pb-20 max-w-7xl relative z-10">
        {/* Hero Section with Title & Category Pills */}
        <BlogHero />

        {/* Featured Post (Full width across max-w-7xl, above articles & sidebar) */}
        {featuredPost && (
          <div className="mt-4">
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        {/* Main Content Layout: 8 Columns Articles + 4 Columns Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Column: Latest Articles (2 Cards per row) */}
          <div className="lg:col-span-8">
            {/* Articles Section */}
            <section>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/40">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {searchQuery
                      ? `Hasil Pencarian: "${searchQuery}"`
                      : selectedCategory !== "all"
                        ? `Artikel Kategori ${
                            categories.find((c) => c.id === selectedCategory)
                              ?.label || selectedCategory
                          }`
                        : "Semua Artikel Terbaru"}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Menampilkan {filteredPosts.length} artikel yang telah
                    dipublikasikan
                  </p>
                </div>

                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="text-xs text-primary hover:underline rounded-none cursor-pointer"
                  >
                    Reset Filter
                  </Button>
                )}
              </div>

              {/* Empty State */}
              {filteredPosts.length === 0 ? (
                <div className="p-12 rounded-none border border-dashed border-border/60 bg-card/40 text-center my-6">
                  <FileQuestion className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-base font-bold text-foreground mb-1">
                    Tidak ada artikel yang cocok
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-5">
                    Tidak ditemukan artikel dengan kata kunci atau kategori
                    tersebut.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="rounded-none cursor-pointer text-xs"
                  >
                    Tampilkan Semua Artikel
                  </Button>
                </div>
              ) : (
                /* 2 Cards per Row Grid Layout */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {regularPosts.map((post, idx) => (
                    <BlogCard key={post.id} post={post} index={idx} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4">
            <BlogSidebar
              posts={posts}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              config={sidebarConfig}
              categories={categories.filter((c) => c.id !== "all")}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
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
