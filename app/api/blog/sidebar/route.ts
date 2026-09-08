import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  SidebarConfig,
  DEFAULT_SIDEBAR_CONFIG,
  DEFAULT_WIDGET_ORDER,
  formatExternalUrl,
} from "@/data/blog";
import { isOwnerAuthorized } from "../route";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SIDEBAR_FILE_PATH = path.join(process.cwd(), "data", "sidebar.json");

export function readSidebarConfig(): SidebarConfig {
  try {
    if (!fs.existsSync(SIDEBAR_FILE_PATH)) {
      const dir = path.dirname(SIDEBAR_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(SIDEBAR_FILE_PATH, JSON.stringify(DEFAULT_SIDEBAR_CONFIG, null, 2));
      return DEFAULT_SIDEBAR_CONFIG;
    }
    const data = fs.readFileSync(SIDEBAR_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);

    // Backward-compatibility: migrate single 'ad' to 'ads' array if needed
    let ads = parsed.ads;
    if (!Array.isArray(ads) || ads.length === 0) {
      if (parsed.ad && typeof parsed.ad === "object") {
        ads = [{ ...parsed.ad, id: parsed.ad.id || "ad-1" }];
      } else {
        ads = DEFAULT_SIDEBAR_CONFIG.ads || [];
      }
    }

    const widgetOrder =
      Array.isArray(parsed.widgetOrder) && parsed.widgetOrder.length > 0
        ? parsed.widgetOrder
        : DEFAULT_WIDGET_ORDER;

    return {
      ...DEFAULT_SIDEBAR_CONFIG,
      ...parsed,
      widgetOrder,
      ads,
      ad: ads[0] || DEFAULT_SIDEBAR_CONFIG.ad,
    };
  } catch (error) {
    console.error("Error reading sidebar config:", error);
    return DEFAULT_SIDEBAR_CONFIG;
  }
}

export function writeSidebarConfig(config: SidebarConfig): boolean {
  try {
    const dir = path.dirname(SIDEBAR_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SIDEBAR_FILE_PATH, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing sidebar config:", error);
    return false;
  }
}

// GET /api/blog/sidebar
export async function GET() {
  try {
    const config = readSidebarConfig();
    return NextResponse.json(
      {
        success: true,
        config,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error in GET /api/blog/sidebar:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat konfigurasi sidebar." },
      { status: 500 }
    );
  }
}

// PUT /api/blog/sidebar - Update sidebar configuration
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { passcode, config } = body;

    if (!isOwnerAuthorized(passcode)) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak. Passcode admin tidak valid." },
        { status: 401 }
      );
    }

    if (!config || typeof config !== "object") {
      return NextResponse.json(
        { success: false, error: "Data konfigurasi sidebar tidak valid." },
        { status: 400 }
      );
    }

    const currentConfig = readSidebarConfig();

    const rawAds = Array.isArray(config.ads)
      ? config.ads
      : currentConfig.ads || [];

    // Sanitize targetUrl for each ad
    const mergedAds = rawAds.map((ad: any) => ({
      ...ad,
      targetUrl: formatExternalUrl(ad.targetUrl),
    }));

    const primaryAd = mergedAds[0]
      ? {
          ...mergedAds[0],
          targetUrl: formatExternalUrl(mergedAds[0].targetUrl),
        }
      : currentConfig.ad;

    const mergedConfig: SidebarConfig = {
      ...currentConfig,
      ...config,
      widgetOrder: Array.isArray(config.widgetOrder)
        ? config.widgetOrder
        : currentConfig.widgetOrder || DEFAULT_WIDGET_ORDER,
      ads: mergedAds,
      ad: primaryAd,
    };

    const success = writeSidebarConfig(mergedConfig);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Gagal menyimpan konfigurasi ke file." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Konfigurasi urutan widget dan materi iklan berhasil disimpan!",
        config: mergedConfig,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error in PUT /api/blog/sidebar:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server saat memperbarui sidebar." },
      { status: 500 }
    );
  }
}

