"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Eye,
  ExternalLink,
  ArrowUpRight,
  ArrowLeft,
  Clock,
} from "lucide-react";
import {
  BlogPost,
  SidebarConfig,
  DEFAULT_SIDEBAR_CONFIG,
  DEFAULT_WIDGET_ORDER,
  SidebarAdItem,
  BlogCategoryOption,
  BLOG_CATEGORIES,
  formatExternalUrl,
} from "@/data/blog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogSidebarProps {
  posts: BlogPost[];
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  config?: SidebarConfig;
  currentPost?: BlogPost;
  categories?: BlogCategoryOption[];
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export function BlogSidebar({
  posts,
  searchQuery = "",
  onSearchChange,
  config = DEFAULT_SIDEBAR_CONFIG,
  currentPost,
  categories,
  selectedCategory = "all",
  onSelectCategory,
}: BlogSidebarProps) {
  const router = useRouter();
  const [localSearch, setLocalSearch] = React.useState(searchQuery);

  React.useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Widget Order resolution (supports both system widgets and individual ad items)
  const widgetOrder = React.useMemo<string[]>(() => {
    const rawOrder = config.widgetOrder || DEFAULT_WIDGET_ORDER;
    const order = [...rawOrder];

    // Ensure all individual ads in config.ads are accounted for in widgetOrder
    const ads =
      Array.isArray(config.ads) && config.ads.length > 0
        ? config.ads
        : config.ad
          ? [config.ad]
          : [];

    ads.forEach((ad) => {
      const adKey = `ad:${ad.id}`;
      if (
        !order.includes(adKey) &&
        !order.includes(ad.id) &&
        !order.includes("ads")
      ) {
        order.push(adKey);
      }
    });

    return order;
  }, [config.widgetOrder, config.ads, config.ad]);

  // Resolved list of categories
  const resolvedCategories = React.useMemo(() => {
    if (categories && categories.length > 0) {
      return categories;
    }
    return BLOG_CATEGORIES.filter((c) => c.id !== "all");
  }, [categories]);

  // Category counts
  const categoryCounts = React.useMemo(() => {
    const published = posts.filter((p) => p.published);
    const counts: Record<string, number> = {
      all: published.length,
    };
    for (const post of published) {
      counts[post.category] = (counts[post.category] || 0) + 1;
    }
    return counts;
  }, [posts]);

  // Sort posts by popularity (views & likes weighted), excluding currentPost if on detail page
  const topPosts = React.useMemo(() => {
    const published = posts.filter(
      (p) => p.published && (!currentPost || p.id !== currentPost.id),
    );
    return [...published]
      .sort((a, b) => {
        const scoreA = (a.views || 0) * 1.5 + (a.likes || 0) * 3;
        const scoreB = (b.views || 0) * 1.5 + (b.likes || 0) * 3;
        return scoreB - scoreA;
      })
      .slice(0, config.topPostsCount || 4);
  }, [posts, currentPost, config.topPostsCount]);

  // Related posts for current post detail page
  const relatedPosts = React.useMemo(() => {
    if (!currentPost) return [];

    const candidates = posts.filter(
      (p) => p.published && p.id !== currentPost.id,
    );

    const scored = candidates.map((p) => {
      let score = 0;
      if (p.category === currentPost.category) score += 3;
      if (p.tags && currentPost.tags) {
        const matchingTags = p.tags.filter((t) => currentPost.tags.includes(t));
        score += matchingTags.length * 1.5;
      }
      return { post: p, score };
    });

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (
        new Date(b.post.publishedAt).getTime() -
        new Date(a.post.publishedAt).getTime()
      );
    });

    return scored.slice(0, 3).map((item) => item.post);
  }, [posts, currentPost]);

  // Active Ads list
  const activeAds = React.useMemo(() => {
    if (Array.isArray(config.ads) && config.ads.length > 0) {
      return config.ads.filter((a) => a.enabled);
    }
    if (config.ad && config.ad.enabled) {
      return [config.ad];
    }
    return [];
  }, [config.ads, config.ad]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localSearch);
    } else {
      router.push(`/blog?search=${encodeURIComponent(localSearch.trim())}`);
    }
  };

  const handleSearchClear = () => {
    setLocalSearch("");
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    } else {
      router.push(
        categoryId === "all"
          ? "/blog"
          : `/blog?category=${encodeURIComponent(categoryId)}`,
      );
    }
  };

  // Helper to render an individual ad banner / AdSense block
  const renderSingleAd = (adItem: SidebarAdItem, key: string) => {
    if (!adItem || !adItem.enabled) return null;

    const validTargetUrl = formatExternalUrl(adItem.targetUrl);
    const isInternal =
      validTargetUrl.startsWith("/") || validTargetUrl.startsWith("#");

    return (
      <div
        key={key}
        className="p-4 sm:p-5 rounded-none border border-border/60 bg-card/60 backdrop-blur-md shadow-sm relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium tracking-wider uppercase text-[10px]">
            <span>{adItem.title || "Sponsor"}</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-muted text-muted-foreground border border-border/40 font-mono uppercase">
            Iklan
          </span>
        </div>

        {adItem.type === "image" && adItem.imageUrl && (
          <div className="space-y-3">
            {validTargetUrl ? (
              <a
                href={validTargetUrl}
                target={isInternal ? "_self" : "_blank"}
                rel={isInternal ? undefined : "noopener noreferrer"}
                className="group block relative overflow-hidden rounded-none border border-border/60 bg-muted/40 aspect-[16/9] w-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                title={adItem.title || "Kunjungi Tautan Iklan"}
              >
                <Image
                  src={adItem.imageUrl}
                  alt={adItem.altText || adItem.title || "Banner Iklan"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                  <span className="text-[11px] text-white flex items-center gap-1.5 font-medium drop-shadow-md">
                    <span>Kunjungi Tautan</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ) : (
              <div className="relative overflow-hidden rounded-none border border-border/60 bg-muted/40 aspect-[16/9] w-full">
                <Image
                  src={adItem.imageUrl}
                  alt={adItem.altText || adItem.title || "Banner Iklan"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>
            )}

            {adItem.caption && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {adItem.caption}
              </p>
            )}

            {validTargetUrl && (
              <a
                href={validTargetUrl}
                target={isInternal ? "_self" : "_blank"}
                rel={isInternal ? undefined : "noopener noreferrer"}
                className="block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs rounded-none border-border/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer gap-1.5"
                >
                  <span>Pelajari Lebih Lanjut</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            )}
          </div>
        )}

        {adItem.type === "adsense" && (
          <div className="space-y-2">
            {adItem.customHtml ? (
              <div
                className="overflow-hidden rounded-none border border-border/40"
                dangerouslySetInnerHTML={{ __html: adItem.customHtml }}
              />
            ) : adItem.adsenseClient && adItem.adsenseSlot ? (
              <div className="w-full min-h-[220px] bg-muted/30 border border-dashed border-border/60 flex flex-col items-center justify-center p-4 text-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client={adItem.adsenseClient}
                  data-ad-slot={adItem.adsenseSlot}
                  data-ad-format={adItem.adsenseFormat || "auto"}
                  data-full-width-responsive="true"
                />
                <span className="text-[10px] text-muted-foreground font-mono mt-2">
                  Google AdSense Unit ({adItem.adsenseSlot})
                </span>
              </div>
            ) : (
              <div className="w-full min-h-[140px] bg-muted/20 border border-dashed border-border/60 flex flex-col items-center justify-center p-4 text-center">
                <p className="text-xs font-semibold text-foreground">
                  Slot Iklan AdSense
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 max-w-[200px]">
                  Atur Client ID & Slot ID di CMS.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Render widget by widgetId
  const renderWidget = (widgetId: string) => {
    // Individual ad widget (e.g. "ad:ad-1" or "ad-1")
    if (
      widgetId.startsWith("ad:") ||
      (config.ads || []).some((a) => a.id === widgetId)
    ) {
      const cleanId = widgetId.replace(/^ad:/, "");
      const adItem = (config.ads || []).find(
        (a) => a.id === cleanId || a.id === widgetId,
      );
      if (adItem) {
        return renderSingleAd(adItem, `widget-ad-${adItem.id}`);
      }
      return null;
    }

    switch (widgetId) {
      case "search":
        if (!config.showSearch) return null;
        return (
          <div
            key="search"
            className="p-4 sm:p-5 rounded-none border border-border/60 bg-card/60 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Cari Artikel
              </h3>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari artikel, topik, atau kata kunci..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) {
                    onSearchChange(e.target.value);
                  }
                }}
                className="pl-9 pr-9 py-4 rounded-none bg-background/80 border-border/70 text-xs focus-visible:ring-primary/40"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Bersihkan pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {localSearch && (
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>
                  Kata kunci:{" "}
                  <strong className="text-foreground">"{localSearch}"</strong>
                </span>
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="text-primary hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        );

      case "related-posts":
        if (
          !Boolean(config.showRelatedPosts ?? true) ||
          !currentPost ||
          relatedPosts.length === 0
        ) {
          return null;
        }
        return (
          <div
            key="related-posts"
            className="p-4 sm:p-5 rounded-none border border-border/60 bg-card/60 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {config.relatedPostsTitle || "Artikel Terkait"}
                </h3>
              </div>
            </div>

            <div className="space-y-3.5">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-3 p-2 -mx-2 hover:bg-muted/30 transition-colors rounded-none"
                >
                  <div className="relative w-16 h-14 shrink-0 overflow-hidden rounded-none border border-border/50 bg-muted">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} mnt
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views || 0}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );

      case "categories":
        if (
          !Boolean(config.showCategories ?? true) ||
          resolvedCategories.length === 0
        ) {
          return null;
        }
        return (
          <div
            key="categories"
            className="p-4 sm:p-5 rounded-none border border-border/60 bg-card/60 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/40">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {config.categoriesTitle || "Kategori Topik"}
                </h3>
              </div>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => handleCategoryClick("all")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-none border transition-all cursor-pointer ${
                  selectedCategory === "all" && !currentPost
                    ? "bg-primary/10 border-primary text-primary font-semibold"
                    : "border-transparent hover:border-border/60 hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-foreground/60" />
                  <span>Semua Topik</span>
                </span>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-none bg-muted text-muted-foreground">
                  {categoryCounts["all"] || 0}
                </span>
              </button>

              {resolvedCategories.map((cat) => {
                const isSelected =
                  (selectedCategory === cat.id && !currentPost) ||
                  (currentPost && currentPost.category === cat.id);
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-none border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 border-primary text-primary font-semibold"
                        : "border-transparent hover:border-border/60 hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate pr-2">
                      <span
                        className="w-2 h-2 shrink-0 rounded-none"
                        style={{ backgroundColor: cat.color || "#3B82F6" }}
                      />
                      <span className="truncate">{cat.label}</span>
                    </span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-none bg-muted text-muted-foreground shrink-0">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case "top-posts":
        if (!config.showTopPosts || topPosts.length === 0) return null;
        return (
          <div
            key="top-posts"
            className="p-4 sm:p-5 rounded-none border border-border/60 bg-card/60 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {config.topPostsTitle || "Artikel Terpopuler"}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {topPosts.map((post, idx) => {
                const categoryLabel =
                  resolvedCategories.find((c) => c.id === post.category)
                    ?.label || post.category;

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-3 transition-colors"
                  >
                    <span
                      className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-none border ${
                        idx === 0
                          ? "bg-primary text-primary-foreground border-primary font-mono shadow-sm"
                          : idx === 1
                            ? "bg-secondary text-secondary-foreground border-border font-mono"
                            : "bg-muted text-muted-foreground border-border/40 font-mono"
                      }`}
                    >
                      {idx + 1}
                    </span>

                    <div className="relative w-16 h-14 flex-shrink-0 overflow-hidden rounded-none border border-border/50 bg-muted">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="truncate max-w-[90px]">
                          {categoryLabel}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );

      case "ads":
        // Legacy fallback if someone has "ads" in order
        if (activeAds.length === 0) return null;
        return (
          <div key="ads" className="space-y-6">
            {activeAds.map((adItem, index) =>
              renderSingleAd(adItem, `bulk-ad-${adItem.id || index}`),
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <aside className="w-full space-y-6 lg:sticky lg:top-24">
      {/* Quick Navigation on Post Detail Page */}
      {currentPost && (
        <div className="p-3.5 bg-card/60 backdrop-blur-md border border-border/60 rounded-none shadow-sm flex items-center justify-between">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-primary" />
            <span>Semua Artikel</span>
          </Link>
          <Badge
            variant="outline"
            className="rounded-none border-primary/30 text-primary text-[10px] font-mono capitalize"
          >
            {currentPost.category}
          </Badge>
        </div>
      )}

      {/* Render Widgets in the configured widgetOrder */}
      {widgetOrder.map((widgetId) => renderWidget(widgetId))}
    </aside>
  );
}
