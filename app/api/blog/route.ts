import { NextResponse } from "next/server";
import {
  BlogPost,
  INITIAL_POSTS,
  DEFAULT_AUTHOR,
  calculateReadTime,
  generateSlug,
} from "@/data/blog";
import {
  getDbPosts,
  createDbPost,
  updateDbPost,
  deleteDbPost,
  readLocalPosts,
  writeLocalPosts,
} from "@/utils/supabase/blog";

export function isOwnerAuthorized(passcode?: string): boolean {
  if (!passcode) return false;
  const validCodes = [
    "boyaghnia",
    "admin123",
    "owner",
    "3sopdsi",
    "esopdsi",
    "esopds1",
  ];
  if (process.env.BLOG_ADMIN_PASSCODE) {
    validCodes.push(process.env.BLOG_ADMIN_PASSCODE);
  }
  return validCodes.includes(passcode.trim());
}

// Backwards-compatible synchronous helpers for local files if needed
export function readPosts(): BlogPost[] {
  const posts = readLocalPosts();
  return posts.length > 0 ? posts : INITIAL_POSTS;
}

export function writePosts(posts: BlogPost[]): boolean {
  writeLocalPosts(posts);
  return true;
}

// GET /api/blog - Fetch posts from Supabase database
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const includeDrafts = searchParams.get("includeDrafts") === "true";
    const passcode = searchParams.get("passcode") || req.headers.get("x-admin-passcode");

    const isAdmin = isOwnerAuthorized(passcode || undefined);

    const posts = await getDbPosts({
      category: category || undefined,
      search: search || undefined,
      includeDrafts: includeDrafts && isAdmin,
    });

    return NextResponse.json({
      success: true,
      posts,
      total: posts.length,
      isAdmin,
    });
  } catch (error) {
    console.error("Error in GET /api/blog:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat artikel blog." },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create new post in Supabase
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode, post: postData, action } = body;

    // Verify authentication
    if (!isOwnerAuthorized(passcode)) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak. Passcode admin tidak valid." },
        { status: 401 }
      );
    }

    // Simple auth check action
    if (action === "verify_auth") {
      return NextResponse.json({ success: true, authorized: true });
    }

    if (!postData || !postData.title?.trim() || !postData.content?.trim()) {
      return NextResponse.json(
        { success: false, error: "Judul dan isi artikel wajib diisi." },
        { status: 400 }
      );
    }

    const existingPosts = await getDbPosts({ includeDrafts: true });
    const now = new Date().toISOString();

    // Generate unique slug
    let baseSlug = generateSlug(postData.slug || postData.title);
    if (!baseSlug) baseSlug = `artikel-${Date.now()}`;
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (existingPosts.some((p) => p.slug === uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: uniqueSlug,
      title: postData.title.trim(),
      excerpt:
        postData.excerpt?.trim() ||
        postData.content.replace(/[#*`_~[\]]/g, "").slice(0, 160) + "...",
      content: postData.content,
      category: postData.category || "web",
      tags: Array.isArray(postData.tags)
        ? postData.tags.map((t: string) => t.trim()).filter(Boolean)
        : [],
      coverImage:
        postData.coverImage?.trim() ||
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      coverCaption: postData.coverCaption?.trim() || undefined,
      featured: Boolean(postData.featured),
      published: Boolean(postData.published),
      publishedAt: postData.published ? (postData.publishedAt || now) : "",
      updatedAt: now,
      readTime: calculateReadTime(postData.content),
      views: 0,
      likes: 0,
      author: postData.author || DEFAULT_AUTHOR,
    };

    const created = await createDbPost(newPost);
    const updatedList = await getDbPosts({ includeDrafts: true });

    return NextResponse.json({
      success: true,
      message: "Artikel berhasil dibuat di Supabase!",
      post: created,
      posts: updatedList,
    });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat membuat artikel." },
      { status: 500 }
    );
  }
}

// PUT /api/blog - Update existing post in Supabase
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { passcode, post: postData } = body;

    if (!isOwnerAuthorized(passcode)) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak. Passcode admin tidak valid." },
        { status: 401 }
      );
    }

    if (!postData || !postData.id) {
      return NextResponse.json(
        { success: false, error: "ID artikel wajib disertakan." },
        { status: 400 }
      );
    }

    const existingPosts = await getDbPosts({ includeDrafts: true });
    const existing = existingPosts.find((p) => p.id === postData.id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Artikel tidak ditemukan." },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();

    // Check slug uniqueness if changed
    let slug = generateSlug(postData.slug || postData.title || existing.slug);
    if (slug !== existing.slug) {
      let uniqueSlug = slug;
      let counter = 1;
      while (existingPosts.some((p) => p.id !== existing.id && p.slug === uniqueSlug)) {
        uniqueSlug = `${slug}-${counter++}`;
      }
      slug = uniqueSlug;
    }

    const isNewlyPublished = !existing.published && postData.published;

    const updates: Partial<BlogPost> = {
      slug,
      title: postData.title?.trim() || existing.title,
      excerpt:
        postData.excerpt?.trim() ||
        postData.content?.replace(/[#*`_~[\]]/g, "").slice(0, 160) + "..." ||
        existing.excerpt,
      content: postData.content || existing.content,
      category: postData.category || existing.category,
      tags: Array.isArray(postData.tags)
        ? postData.tags.map((t: string) => t.trim()).filter(Boolean)
        : existing.tags,
      coverImage: postData.coverImage?.trim() || existing.coverImage,
      coverCaption: postData.coverCaption?.trim() ?? existing.coverCaption,
      featured: typeof postData.featured === "boolean" ? postData.featured : existing.featured,
      published: typeof postData.published === "boolean" ? postData.published : existing.published,
      publishedAt: postData.publishedAt
        ? postData.publishedAt
        : isNewlyPublished
          ? now
          : existing.publishedAt || (postData.published ? now : ""),
      updatedAt: now,
      readTime: calculateReadTime(postData.content || existing.content),
    };

    const updated = await updateDbPost(postData.id, updates);
    const updatedList = await getDbPosts({ includeDrafts: true });

    return NextResponse.json({
      success: true,
      message: "Artikel berhasil diperbarui di Supabase!",
      post: updated,
      posts: updatedList,
    });
  } catch (error: any) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat memperbarui artikel." },
      { status: 500 }
    );
  }
}

// DELETE /api/blog - Delete post from Supabase
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { passcode, id } = body;

    if (!isOwnerAuthorized(passcode)) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak. Passcode admin tidak valid." },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID artikel wajib disertakan." },
        { status: 400 }
      );
    }

    await deleteDbPost(id);
    const updatedList = await getDbPosts({ includeDrafts: true });

    return NextResponse.json({
      success: true,
      message: "Artikel berhasil dihapus dari Supabase!",
      posts: updatedList,
    });
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat menghapus artikel." },
      { status: 500 }
    );
  }
}
