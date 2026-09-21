import { NextResponse } from "next/server";
import {
  getDbPostBySlug,
  incrementDbPostViews,
  incrementDbPostLikes,
} from "@/utils/supabase/blog";

// Simple in-memory throttle to prevent rapid view inflation
const viewThrottle = new Map<string, number>();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getDbPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Artikel tidak ditemukan." },
        { status: 404 }
      );
    }

    // Check client IP for throttling view increments (max once per 5 minutes per IP per post)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const throttleKey = `${ip}-${slug}`;
    const lastViewed = viewThrottle.get(throttleKey) || 0;
    const now = Date.now();

    if (now - lastViewed > 5 * 60 * 1000) {
      viewThrottle.set(throttleKey, now);
      await incrementDbPostViews(post.id);
      post.views = (post.views || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error fetching single post from Supabase:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data artikel." },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { action } = body;

    const post = await getDbPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Artikel tidak ditemukan." },
        { status: 404 }
      );
    }

    if (action === "like") {
      const newLikes = await incrementDbPostLikes(post.id);

      return NextResponse.json({
        success: true,
        likes: newLikes,
      });
    }

    return NextResponse.json(
      { success: false, error: "Aksi tidak didukung." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating single post interaction in Supabase:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses interaksi artikel." },
      { status: 500 }
    );
  }
}
