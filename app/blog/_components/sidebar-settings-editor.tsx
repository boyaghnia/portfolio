"use client";

import * as React from "react";
import Image from "next/image";
import {
  Megaphone,
  Save,
  Check,
  ExternalLink,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Edit3,
  X,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import {
  SidebarConfig,
  DEFAULT_SIDEBAR_CONFIG,
  DEFAULT_WIDGET_ORDER,
  SidebarAdItem,
  BlogPost,
  INITIAL_POSTS,
  BlogCategoryOption,
  BLOG_CATEGORIES,
  formatExternalUrl,
} from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogSidebar } from "./blog-sidebar";

interface SidebarSettingsEditorProps {
  passcode: string;
}

const PRESET_BANNERS = [
  {
    label: "Tech & Dev Collaboration",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    title: "Sponsor & Kolaborasi Terpilih",
    targetUrl: "https://boyaghnia.my.id/#contact",
    altText: "Open for Software Engineering Collaboration",
    caption:
      "Tertarik berkolaborasi atau memasang sponsor di blog ini? Hubungi saya untuk diskusi proyek atau kemitraan.",
  },
  {
    label: "3D & Creative Tech",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    title: "Layanan Web 3D & Creative Tech",
    targetUrl: "https://boyaghnia.my.id/#projects",
    altText: "Interactive 3D Web Development Services",
    caption:
      "Hadirkan pengalaman visual imersif dengan Three.js & React Three Fiber untuk brand dan produk Anda.",
  },
  {
    label: "Design Systems & UI Engineering",
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    title: "Konsultasi Frontend & UI/UX",
    targetUrl: "https://boyaghnia.my.id/#contact",
    altText: "Design System & UI Consulting",
    caption:
      "Membangun sistem antarmuka web yang rapi, cepat, dan terukur dengan Next.js dan Tailwind CSS.",
  },
];

const WIDGET_INFO: Record<
  string,
  {
    label: string;
    description: string;
  }
> = {
  search: {
    label: "Widget Pencarian",
    description: "Kolom pencarian artikel dengan filter kata kunci",
  },
  "related-posts": {
    label: "Widget Artikel Terkait",
    description:
      "Rekomendasi artikel relevan berdasarkan topik & tags (halaman detail)",
  },
  categories: {
    label: "Widget Kategori Topik",
    description: "Daftar kategori dengan titik warna dan jumlah artikel",
  },
  "top-posts": {
    label: "Widget Artikel Terpopuler",
    description: "Daftar artikel terpopuler berdasarkan pembaca & apresiasi",
  },
};

export function SidebarSettingsEditor({
  passcode,
}: SidebarSettingsEditorProps) {
  const [config, setConfig] = React.useState<SidebarConfig>(
    DEFAULT_SIDEBAR_CONFIG,
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Live Preview States
  const [previewMode, setPreviewMode] = React.useState<"listing" | "detail">(
    "listing",
  );
  const [samplePosts, setSamplePosts] =
    React.useState<BlogPost[]>(INITIAL_POSTS);
  const [sampleCategories, setSampleCategories] = React.useState<
    BlogCategoryOption[]
  >(BLOG_CATEGORIES.filter((c) => c.id !== "all"));

  // Ad Modal State
  const [isAdModalOpen, setIsAdModalOpen] = React.useState(false);
  const [editingAd, setEditingAd] = React.useState<SidebarAdItem | null>(null);
  const [adForm, setAdForm] = React.useState<SidebarAdItem>({
    id: "",
    enabled: true,
    type: "image",
    title: "",
    imageUrl: "",
    targetUrl: "",
    altText: "",
    caption: "",
    adsenseClient: "",
    adsenseSlot: "",
    adsenseFormat: "auto",
    customHtml: "",
  });

  // Fetch current config & posts on mount
  React.useEffect(() => {
    Promise.all([
      fetch("/api/blog/sidebar", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/blog", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/blog/categories", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([sidebarData, postsData, catData]) => {
        if (sidebarData.success && sidebarData.config) {
          const cfg = sidebarData.config;

          let ads = cfg.ads;
          if (!Array.isArray(ads) || ads.length === 0) {
            ads = cfg.ad
              ? [{ ...cfg.ad, id: "ad-1" }]
              : DEFAULT_SIDEBAR_CONFIG.ads || [];
          }

          let widgetOrder =
            Array.isArray(cfg.widgetOrder) && cfg.widgetOrder.length > 0
              ? cfg.widgetOrder
              : DEFAULT_WIDGET_ORDER;

          setConfig({
            ...DEFAULT_SIDEBAR_CONFIG,
            ...cfg,
            widgetOrder,
            ads,
          });
        }

        if (
          postsData.success &&
          Array.isArray(postsData.posts) &&
          postsData.posts.length > 0
        ) {
          setSamplePosts(postsData.posts);
        }

        if (
          catData.success &&
          Array.isArray(catData.categories) &&
          catData.categories.length > 0
        ) {
          setSampleCategories(catData.categories);
        }
      })
      .catch((err) => {
        console.error("Failed to load sidebar settings or preview data:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Save helper to persist config directly to server
  const persistConfig = async (targetConfig: SidebarConfig) => {
    setIsSaving(true);
    setErrorMessage(null);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/blog/sidebar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode,
          config: targetConfig,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSaveSuccess(true);
        if (data.config) {
          setConfig(data.config);
        }
        setTimeout(() => setSaveSuccess(false), 4000);
        return true;
      } else {
        setErrorMessage(data.error || "Gagal menyimpan konfigurasi.");
        return false;
      }
    } catch (error) {
      console.error("Save error:", error);
      setErrorMessage("Terjadi kesalahan koneksi saat menyimpan pengaturan.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Save handler for manual "Simpan Perubahan" button
  const handleSave = () => persistConfig(config);

  // --- Multi-Ad Management ---

  const adsList = config.ads || [];

  // Computed full widget order ensuring all system widgets and each individual ad are present
  const fullWidgetOrder = React.useMemo(() => {
    const raw = config.widgetOrder || DEFAULT_WIDGET_ORDER;
    const order: string[] = [];

    // Filter and add valid items from raw
    raw.forEach((item) => {
      if (item === "ads") {
        // Expand legacy "ads" token to all ads
        adsList.forEach((ad) => {
          const adKey = `ad:${ad.id}`;
          if (!order.includes(adKey) && !order.includes(ad.id)) {
            order.push(adKey);
          }
        });
        return;
      }
      if (!order.includes(item)) {
        order.push(item);
      }
    });

    // Ensure all 4 system widgets are included
    const systemWidgets = [
      "search",
      "related-posts",
      "categories",
      "top-posts",
    ];
    systemWidgets.forEach((sw) => {
      if (!order.includes(sw)) {
        order.push(sw);
      }
    });

    // Ensure all individual ads are included
    adsList.forEach((ad) => {
      const adKey = `ad:${ad.id}`;
      if (!order.includes(adKey) && !order.includes(ad.id)) {
        order.push(adKey);
      }
    });

    return order;
  }, [config.widgetOrder, adsList]);

  // --- Widget & Individual Ad Reordering ---
  const moveWidget = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= fullWidgetOrder.length) return;

    const newOrder = [...fullWidgetOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    const updatedConfig: SidebarConfig = { ...config, widgetOrder: newOrder };
    setConfig(updatedConfig);
    await persistConfig(updatedConfig);
  };

  const toggleAdEnabled = async (id: string) => {
    const newAds = adsList.map((ad) =>
      ad.id === id ? { ...ad, enabled: !ad.enabled } : ad,
    );
    const updatedConfig: SidebarConfig = { ...config, ads: newAds };
    setConfig(updatedConfig);
    await persistConfig(updatedConfig);
  };

  const deleteAd = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus materi iklan ini?")) return;
    const newAds = adsList.filter((ad) => ad.id !== id);
    const newOrder = fullWidgetOrder.filter(
      (w) => w !== `ad:${id}` && w !== id,
    );
    const updatedConfig: SidebarConfig = {
      ...config,
      ads: newAds,
      widgetOrder: newOrder,
    };
    setConfig(updatedConfig);
    await persistConfig(updatedConfig);
  };

  const openAddAdModal = () => {
    const newId = `ad-${Date.now()}`;
    const defaultPreset = PRESET_BANNERS[0];
    setEditingAd(null);
    setAdForm({
      id: newId,
      enabled: true,
      type: "image",
      title: defaultPreset.title,
      imageUrl: defaultPreset.url,
      targetUrl: defaultPreset.targetUrl,
      altText: defaultPreset.altText,
      caption: defaultPreset.caption,
      adsenseClient: "",
      adsenseSlot: "",
      adsenseFormat: "auto",
      customHtml: "",
    });
    setIsAdModalOpen(true);
  };

  const openEditAdModal = (ad: SidebarAdItem) => {
    setEditingAd(ad);
    setAdForm({
      ...ad,
      targetUrl: ad.targetUrl ? formatExternalUrl(ad.targetUrl) : "",
    });
    setIsAdModalOpen(true);
  };

  const saveAdModalForm = async (e: React.FormEvent) => {
    e.preventDefault();
    let newAds: SidebarAdItem[];
    let newOrder = [...fullWidgetOrder];

    // Clean and normalize target URL
    const cleanedTargetUrl = adForm.targetUrl
      ? formatExternalUrl(adForm.targetUrl)
      : "";

    const normalizedAd: SidebarAdItem = {
      ...adForm,
      targetUrl: cleanedTargetUrl,
    };

    if (editingAd) {
      newAds = adsList.map((ad) =>
        ad.id === editingAd.id ? { ...normalizedAd } : ad,
      );
    } else {
      newAds = [...adsList, { ...normalizedAd }];
      newOrder.push(`ad:${normalizedAd.id}`);
    }

    const updatedConfig: SidebarConfig = {
      ...config,
      ads: newAds,
      widgetOrder: newOrder,
    };

    setConfig(updatedConfig);
    setIsAdModalOpen(false);
    setEditingAd(null);

    // Save directly to server so changes are immediately persisted!
    await persistConfig(updatedConfig);
  };

  const isWidgetActive = (widgetId: string): boolean => {
    switch (widgetId) {
      case "search":
        return config.showSearch;
      case "related-posts":
        return config.showRelatedPosts ?? true;
      case "categories":
        return config.showCategories ?? true;
      case "top-posts":
        return config.showTopPosts;
      default:
        return true;
    }
  };

  const getWidgetDisplayInfo = (widgetId: string) => {
    if (widgetId.startsWith("ad:") || adsList.some((a) => a.id === widgetId)) {
      const cleanId = widgetId.replace(/^ad:/, "");
      const ad = adsList.find((a) => a.id === cleanId || a.id === widgetId);
      return {
        isAd: true,
        ad,
        label: ad?.title || `Iklan (${cleanId})`,
        description:
          ad?.caption ||
          (ad?.type === "adsense"
            ? "Unit Iklan Google AdSense"
            : "Banner Gambar Sponsor"),
        icon: Megaphone,
        active: ad?.enabled ?? false,
        thumbnail: ad?.type === "image" ? ad.imageUrl : null,
      };
    }

    const info = WIDGET_INFO[widgetId];
    if (info) {
      return {
        isAd: false,
        ad: null,
        label: info.label,
        description: info.description,
        active: isWidgetActive(widgetId),
        thumbnail: null,
      };
    }

    return {
      isAd: false,
      ad: null,
      label: widgetId,
      description: "Widget kustom",
      active: true,
      thumbnail: null,
    };
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Save Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-card/60 backdrop-blur-md border border-border/40 rounded-none">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-mono tracking-tight flex items-center gap-2">
              Pengaturan Sidebar, Tata Letak & Multi-Iklan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Atur posisi widget dan masing-masing banner iklan secara terpisah,
              kelola multi-iklan, dan pantau pratinjau langsung.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            size="sm"
            className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs gap-1.5 shadow-sm px-4"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {saveSuccess && (
        <div className="p-3.5 rounded-none bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>
            Pengaturan urutan widget dan daftar iklan berhasil disimpan secara
            permanen!
          </span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-none bg-destructive/15 border border-destructive/40 text-destructive text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid: Settings on Left, Sticky Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Reordering & Settings Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: TATA LETAK & URUTAN WIDGET SIDEBAR (TERMASUK IKLAN TERPISAH) */}
          <div className="p-5 rounded-none border border-border/60 bg-card/60 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Tata Letak & Urutan Widget Sidebar
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Setiap widget dan banner iklan dapat disisipkan dan digeser
                    posisinya secara terpisah (misal: Pencarian → Iklan 1 →
                    Artikel Terkait → Iklan 2 → Kategori).
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="rounded-none border-primary/30 text-primary text-[10px] font-mono"
              >
                {fullWidgetOrder.length} Item
              </Badge>
            </div>

            <div className="space-y-2">
              {fullWidgetOrder.map((widgetId, index) => {
                const info = getWidgetDisplayInfo(widgetId);

                return (
                  <div
                    key={widgetId}
                    className={`p-3 border rounded-none flex items-center justify-between gap-3 transition-colors ${
                      info.isAd
                        ? "bg-primary/5 border-primary/30 hover:border-primary/60"
                        : "bg-muted/20 border-border/50 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="w-6 h-6 flex items-center justify-center bg-muted text-muted-foreground text-xs font-mono font-bold rounded-none border border-border/60 shrink-0">
                        #{index + 1}
                      </span>

                      {info.isAd && info.thumbnail ? (
                        <div className="relative w-9 h-7 shrink-0 overflow-hidden rounded-none border border-border/60 bg-muted">
                          <Image
                            src={info.thumbnail}
                            alt={info.label}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-7 h-7 flex items-center justify-center rounded-none shrink-0 border ${
                            info.isAd
                              ? "bg-primary/20 text-primary border-primary/30"
                              : "bg-primary/10 text-primary border-primary/20"
                          }`}
                        ></div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground truncate">
                            {info.label}
                          </span>
                          {info.isAd && (
                            <span className="text-[10px] px-1 py-0.2 rounded-none font-mono bg-primary/15 text-primary border border-primary/30">
                              Slot Iklan
                            </span>
                          )}
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-none font-mono border ${
                              info.active
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                : "bg-muted text-muted-foreground border-border/40"
                            }`}
                          >
                            {info.active ? "Aktif" : "Nonaktif"}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate line-clamp-1">
                          {info.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {info.isAd && info.ad && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => openEditAdModal(info.ad!)}
                          className="rounded-none h-7 px-2 border-border/60 hover:border-primary text-xs font-mono gap-1"
                          title="Edit Materi Iklan"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                      )}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={index === 0}
                        onClick={() => moveWidget(index, "up")}
                        className="rounded-none h-7 w-7 p-0 border-border/60 hover:border-primary hover:text-primary disabled:opacity-30"
                        title="Geser ke Atas"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={index === fullWidgetOrder.length - 1}
                        onClick={() => moveWidget(index, "down")}
                        className="rounded-none h-7 w-7 p-0 border-border/60 hover:border-primary hover:text-primary disabled:opacity-30"
                        title="Geser ke Bawah"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: MULTI-IKLAN & SPONSORSHIP */}
          <div className="p-5 rounded-none border border-border/60 bg-card/60 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Katalog Materi Iklan & Sponsor
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Tambah atau edit materi iklan (gambar/AdSense) yang dapat
                    disisipkan ke urutan sidebar.
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                onClick={openAddAdModal}
                className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs gap-1.5 h-8"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Iklan Baru
              </Button>
            </div>

            {adsList.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-border/60 text-xs text-muted-foreground font-mono space-y-2">
                <Megaphone className="w-6 h-6 mx-auto text-muted-foreground/40" />
                <p>Belum ada iklan yang ditambahkan.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openAddAdModal}
                  className="rounded-none font-mono text-xs"
                >
                  Buat Iklan Pertama
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {adsList.map((ad, index) => (
                  <div
                    key={ad.id || index}
                    className="p-3.5 bg-muted/20 border border-border/50 rounded-none flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                      <span className="w-6 h-6 flex items-center justify-center bg-muted text-muted-foreground text-xs font-mono font-bold rounded-none border border-border/60 shrink-0 mt-0.5 sm:mt-0">
                        #{index + 1}
                      </span>

                      {ad.type === "image" && ad.imageUrl ? (
                        ad.targetUrl ? (
                          <a
                            href={formatExternalUrl(ad.targetUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-16 h-11 shrink-0 overflow-hidden rounded-none border border-border/50 bg-muted cursor-pointer hover:border-primary transition-colors"
                            title={`Klik untuk menguji tautan target: ${ad.targetUrl}`}
                          >
                            <Image
                              src={ad.imageUrl}
                              alt={ad.title || "Ad"}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <ExternalLink className="w-3.5 h-3.5 text-white" />
                            </div>
                          </a>
                        ) : (
                          <div className="relative w-16 h-11 shrink-0 overflow-hidden rounded-none border border-border/50 bg-muted">
                            <Image
                              src={ad.imageUrl}
                              alt={ad.title || "Ad"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )
                      ) : (
                        <div className="w-16 h-11 shrink-0 bg-muted/60 border border-border/50 flex items-center justify-center text-muted-foreground text-xs font-mono">
                          AdSense
                        </div>
                      )}

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground truncate max-w-[220px]">
                            {ad.title || `Iklan #${index + 1}`}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-1 py-0.5 rounded-none bg-muted text-muted-foreground border border-border/40">
                            {ad.type}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleAdEnabled(ad.id)}
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-none border cursor-pointer ${
                              ad.enabled
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                : "bg-muted text-muted-foreground border-border/40"
                            }`}
                          >
                            {ad.enabled ? "Aktif" : "Nonaktif"}
                          </button>
                        </div>

                        {ad.type === "image" && (
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground/70">
                              Target:
                            </span>
                            {ad.targetUrl ? (
                              <a
                                href={formatExternalUrl(ad.targetUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1 truncate max-w-[280px]"
                                title={ad.targetUrl}
                              >
                                <span className="truncate">{ad.targetUrl}</span>
                                <ExternalLink className="w-3 h-3 shrink-0" />
                              </a>
                            ) : (
                              <span className="text-muted-foreground/50 italic text-[10px]">
                                (Belum ada target URL)
                              </span>
                            )}
                          </div>
                        )}

                        {ad.caption && (
                          <p className="text-[11px] text-muted-foreground line-clamp-1">
                            {ad.caption}
                          </p>
                        )}
                      </div>

                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => openEditAdModal(ad)}
                        className="rounded-none h-7 px-2.5 border-border/60 hover:border-primary text-xs font-mono gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => deleteAd(ad.id)}
                        className="rounded-none h-7 w-7 p-0 border-destructive/40 text-destructive hover:bg-destructive/10"
                        title="Hapus Iklan"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 3: PENGATURAN INDIVIDUAL WIDGET */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
              Parameter Masing-masing Widget
            </h4>

            {/* Widget Pencarian */}
            <div className="p-4 rounded-none border border-border/60 bg-card/60 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-foreground">
                  Widget Pencarian
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Tampilkan kolom input pencarian
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showSearch}
                  onChange={(e) =>
                    setConfig({ ...config, showSearch: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-primary border border-border"></div>
              </label>
            </div>

            {/* Widget Kategori */}
            <div className="p-4 rounded-none border border-border/60 bg-card/60 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground">
                    Widget Kategori Topik
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Tampilkan daftar kategori dan jumlah artikel
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showCategories ?? true}
                    onChange={(e) =>
                      setConfig({ ...config, showCategories: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-primary border border-border"></div>
                </label>
              </div>
              {(config.showCategories ?? true) && (
                <div className="pt-2 border-t border-border/40">
                  <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                    Judul Widget Kategori
                  </label>
                  <Input
                    type="text"
                    value={config.categoriesTitle ?? "Kategori Topik"}
                    onChange={(e) =>
                      setConfig({ ...config, categoriesTitle: e.target.value })
                    }
                    className="rounded-none text-xs bg-background font-mono"
                  />
                </div>
              )}
            </div>

            {/* Widget Artikel Terkait */}
            <div className="p-4 rounded-none border border-border/60 bg-card/60 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground">
                    Widget Artikel Terkait
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Rekomendasi artikel relevan pada halaman baca detail
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showRelatedPosts ?? true}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        showRelatedPosts: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-primary border border-border"></div>
                </label>
              </div>
              {(config.showRelatedPosts ?? true) && (
                <div className="pt-2 border-t border-border/40">
                  <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                    Judul Widget Artikel Terkait
                  </label>
                  <Input
                    type="text"
                    value={config.relatedPostsTitle ?? "Artikel Terkait"}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        relatedPostsTitle: e.target.value,
                      })
                    }
                    className="rounded-none text-xs bg-background font-mono"
                  />
                </div>
              )}
            </div>

            {/* Widget Top Posts */}
            <div className="p-4 rounded-none border border-border/60 bg-card/60 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground">
                    Widget Artikel Terpopuler
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Postingan dengan apresiasi & pembaca tertinggi
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showTopPosts}
                    onChange={(e) =>
                      setConfig({ ...config, showTopPosts: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-primary border border-border"></div>
                </label>
              </div>
              {config.showTopPosts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/40">
                  <div>
                    <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                      Judul Widget
                    </label>
                    <Input
                      type="text"
                      value={config.topPostsTitle}
                      onChange={(e) =>
                        setConfig({ ...config, topPostsTitle: e.target.value })
                      }
                      className="rounded-none text-xs bg-background font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                      Jumlah Postingan
                    </label>
                    <select
                      value={config.topPostsCount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          topPostsCount: parseInt(e.target.value, 10) || 4,
                        })
                      }
                      className="w-full h-9 px-3 text-xs bg-background border border-border rounded-none text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value={3}>3 Artikel</option>
                      <option value={4}>4 Artikel (Direkomendasikan)</option>
                      <option value={5}>5 Artikel</option>
                      <option value={6}>6 Artikel</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Live Preview */}
        <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-24">
          <div className="flex items-center justify-between p-3 bg-card/80 backdrop-blur-md border border-border/60 rounded-none">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono">
                Pratinjau Sidebar
              </span>
            </div>

            {/* Switcher Mode: Listing vs Detail */}
            <div className="flex items-center bg-muted/60 border border-border/40 p-0.5 rounded-none">
              <button
                type="button"
                onClick={() => setPreviewMode("listing")}
                className={`px-2 py-1 text-[10px] font-mono transition-colors rounded-none cursor-pointer ${
                  previewMode === "listing"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Halaman Utama
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("detail")}
                className={`px-2 py-1 text-[10px] font-mono transition-colors rounded-none cursor-pointer ${
                  previewMode === "detail"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Halaman Detail
              </button>
            </div>
          </div>

          <div className="p-4 bg-muted/10 border border-border/60 rounded-none max-h-[82vh] overflow-y-auto">
            <p className="text-[10px] text-muted-foreground font-mono mb-3 text-center">
              Mode:{" "}
              {previewMode === "listing"
                ? "Katalog /blog"
                : "Baca Artikel /blog/[slug]"}
            </p>
            <div className="w-full">
              <BlogSidebar
                posts={samplePosts}
                categories={sampleCategories}
                currentPost={
                  previewMode === "detail" ? samplePosts[0] : undefined
                }
                config={config}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: TAMBAH / EDIT IKLAN */}
      {isAdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border/60 rounded-none shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/40 bg-muted/20">
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base sm:text-lg font-mono">
                  {editingAd ? "Edit Materi Iklan" : "Tambah Iklan Baru"}
                </h3>
              </div>
              <button
                onClick={() => setIsAdModalOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveAdModalForm} className="p-4 sm:p-6 space-y-4">
              {/* Status Aktif */}
              <div className="flex items-center justify-between p-3 bg-muted/20 border border-border/40">
                <span className="text-xs font-mono font-medium text-foreground">
                  Status Penayangan Iklan
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adForm.enabled}
                    onChange={(e) =>
                      setAdForm({ ...adForm, enabled: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-primary border border-border"></div>
                </label>
              </div>

              {/* Format Iklan Switcher */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground">
                  Tipe / Format Iklan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAdForm({ ...adForm, type: "image" })}
                    className={`py-2 px-3 text-xs font-mono rounded-none border transition-colors cursor-pointer ${
                      adForm.type === "image"
                        ? "bg-primary text-primary-foreground border-primary font-bold"
                        : "bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground"
                    }`}
                  >
                    Banner Gambar
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdForm({ ...adForm, type: "adsense" })}
                    className={`py-2 px-3 text-xs font-mono rounded-none border transition-colors cursor-pointer ${
                      adForm.type === "adsense"
                        ? "bg-primary text-primary-foreground border-primary font-bold"
                        : "bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground"
                    }`}
                  >
                    Google AdSense / Script
                  </button>
                </div>
              </div>

              {/* Judul Label Iklan */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-muted-foreground">
                  Judul / Label Slot Iklan{" "}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  value={adForm.title || ""}
                  onChange={(e) =>
                    setAdForm({ ...adForm, title: e.target.value })
                  }
                  placeholder="Contoh: Sponsor & Kolaborasi"
                  className="rounded-none border-border/40 font-mono text-sm"
                  required
                />
              </div>

              {adForm.type === "image" ? (
                <>
                  {/* Preset Banner Quick Select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      Pilihan Cepat Gambar Template
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PRESET_BANNERS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setAdForm({
                              ...adForm,
                              imageUrl: preset.url,
                              title: preset.title,
                              targetUrl: preset.targetUrl,
                              caption: preset.caption,
                            })
                          }
                          className="p-2 border border-border/60 hover:border-primary text-left bg-muted/20 text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          <span className="font-bold block truncate">
                            {preset.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* URL Gambar */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      URL Gambar Banner{" "}
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      value={adForm.imageUrl || ""}
                      onChange={(e) =>
                        setAdForm({ ...adForm, imageUrl: e.target.value })
                      }
                      placeholder="https://images.unsplash.com/..."
                      className="rounded-none border-border/40 font-mono text-xs"
                      required
                    />
                  </div>

                  {/* Tautan Target */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-muted-foreground">
                        Tautan Tujuan (Target URL)
                      </label>
                      {adForm.targetUrl && (
                        <a
                          href={formatExternalUrl(adForm.targetUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1 cursor-pointer"
                          title="Uji coba membuka tautan di tab baru"
                        >
                          <span>Uji Buka Tautan</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <Input
                      value={adForm.targetUrl || ""}
                      onChange={(e) =>
                        setAdForm({ ...adForm, targetUrl: e.target.value })
                      }
                      onBlur={() => {
                        if (adForm.targetUrl) {
                          setAdForm({
                            ...adForm,
                            targetUrl: formatExternalUrl(adForm.targetUrl),
                          });
                        }
                      }}
                      placeholder="https://boyaghnia.my.id/#contact atau instagram.com/..."
                      className="rounded-none border-border/40 font-mono text-xs"
                    />
                    <p className="text-[10px] text-muted-foreground font-mono">
                      * Otomatis menambahkan <code>https://</code> jika memasukkan domain tanpa protokol (misal: <code>instagram.com/...</code>).
                    </p>
                  </div>

                  {/* Pratinjau Langsung Banner di Modal */}
                  {adForm.imageUrl && (
                    <div className="space-y-1.5 pt-2 border-t border-border/40">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-muted-foreground">
                          Pratinjau Interaktif Banner
                        </label>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {adForm.targetUrl ? "Klik gambar untuk menguji" : "(Tautan belum diisi)"}
                        </span>
                      </div>
                      <div className="relative aspect-[16/9] w-full border border-border/60 bg-muted/40 overflow-hidden group">
                        {adForm.targetUrl ? (
                          <a
                            href={formatExternalUrl(adForm.targetUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full cursor-pointer focus:outline-none"
                            title={`Klik untuk menguji tautan: ${formatExternalUrl(adForm.targetUrl)}`}
                          >
                            <Image
                              src={adForm.imageUrl}
                              alt={adForm.title || "Preview Banner"}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                              <span className="text-[11px] text-white flex items-center gap-1.5 font-medium drop-shadow-md">
                                <span>Kunjungi: {formatExternalUrl(adForm.targetUrl)}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </a>
                        ) : (
                          <div className="relative w-full h-full">
                            <Image
                              src={adForm.imageUrl}
                              alt={adForm.title || "Preview Banner"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Caption / Keterangan */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      Teks Keterangan / Caption
                    </label>
                    <textarea
                      value={adForm.caption || ""}
                      onChange={(e) =>
                        setAdForm({ ...adForm, caption: e.target.value })
                      }
                      placeholder="Deskripsi singkat mengenai sponsorship atau promosi..."
                      rows={2}
                      className="w-full p-2 text-xs font-mono bg-background border border-border/50 rounded-none text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      Google AdSense Publisher ID
                    </label>
                    <Input
                      value={adForm.adsenseClient || ""}
                      onChange={(e) =>
                        setAdForm({ ...adForm, adsenseClient: e.target.value })
                      }
                      placeholder="ca-pub-xxxxxxxxxxxxxxxx"
                      className="rounded-none border-border/40 font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      Ad Unit Slot ID
                    </label>
                    <Input
                      value={adForm.adsenseSlot || ""}
                      onChange={(e) =>
                        setAdForm({ ...adForm, adsenseSlot: e.target.value })
                      }
                      placeholder="1234567890"
                      className="rounded-none border-border/40 font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      Atau Kode HTML/Script Custom
                    </label>
                    <textarea
                      value={adForm.customHtml || ""}
                      onChange={(e) =>
                        setAdForm({ ...adForm, customHtml: e.target.value })
                      }
                      placeholder="<script ...> atau <ins ...>"
                      rows={3}
                      className="w-full p-2 text-xs font-mono bg-background border border-border/50 rounded-none text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-border/40 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAdModalOpen(false)}
                  className="rounded-none border-border/40 font-mono text-xs"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  {editingAd ? "Perbarui Iklan" : "Tambahkan ke Sidebar"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
