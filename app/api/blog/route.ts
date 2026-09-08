import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  BlogPost,
  INITIAL_POSTS,
  DEFAULT_AUTHOR,
  calculateReadTime,
  generateSlug,
} from "@/data/blog";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "posts.json");

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

export function readPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(INITIAL_POSTS, null, 2));
      return INITIAL_POSTS;
    }
    const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading posts data:", error);
    return INITIAL_POSTS;
  }
}

export function writePosts(posts: BlogPost[]): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing posts data:", error);
    return false;
  }
}

// GET /api/blog
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const includeDrafts = searchParams.get("includeDrafts") === "true";
    const passcode = searchParams.get("passcode") || req.headers.get("x-admin-passcode");

    const posts = readPosts();
    const isAdmin = isOwnerAuthorized(passcode || undefined);

    let filtered = posts;

    // Only include drafts if authorized
    if (!includeDrafts || !isAdmin) {
      filtered = filtered.filter((post) => post.published);
    }

    if (category && category !== "all") {
      filtered = filtered.filter((post) => post.category === category);
    }

    if (search) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.excerpt.toLowerCase().includes(search) ||
          post.content.toLowerCase().includes(search) ||
          post.tags.some((tag) => tag.toLowerCase().includes(search))
      );
    }

    // Sort: newest first
    filtered.sort(
      (a, b) =>
        new Date(b.publishedAt || b.updatedAt).getTime() -
        new Date(a.publishedAt || a.updatedAt).getTime()
    );

    return NextResponse.json({
      success: true,
      posts: filtered,
      total: filtered.length,
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

// POST /api/blog - Create new post
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

    const posts = readPosts();
    const now = new Date().toISOString();

    // Generate unique slug
    let baseSlug = generateSlug(postData.slug || postData.title);
    if (!baseSlug) baseSlug = `artikel-${Date.now()}`;
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (posts.some((p) => p.slug === uniqueSlug)) {
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
      publishedAt: postData.published ? now : "",
      updatedAt: now,
      readTime: calculateReadTime(postData.content),
      views: 0,
      likes: 0,
      author: postData.author || DEFAULT_AUTHOR,
    };

    posts.unshift(newPost);
    writePosts(posts);

    return NextResponse.json({
      success: true,
      message: "Artikel berhasil dibuat!",
      post: newPost,
      posts,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server saat membuat artikel." },
      { status: 500 }
    );
  }
}

// PUT /api/blog - Update existing post
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

    const posts = readPosts();
    const index = posts.findIndex((p) => p.id === postData.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Artikel tidak ditemukan." },
        { status: 404 }
      );
    }

    const existing = posts[index];
    const now = new Date().toISOString();

    // Check slug uniqueness if changed
    let slug = generateSlug(postData.slug || postData.title || existing.slug);
    if (slug !== existing.slug) {
      let uniqueSlug = slug;
      let counter = 1;
      while (posts.some((p) => p.id !== existing.id && p.slug === uniqueSlug)) {
        uniqueSlug = `${slug}-${counter++}`;
      }
      slug = uniqueSlug;
    }

    const isNewlyPublished = !existing.published && postData.published;

    const updatedPost: BlogPost = {
      ...existing,
      ...postData,
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
      publishedAt: isNewlyPublished
        ? now
        : existing.publishedAt || (postData.published ? now : ""),
      updatedAt: now,
      readTime: calculateReadTime(postData.content || existing.content),
    };

    posts[index] = updatedPost;
    writePosts(posts);

    return NextResponse.json({
      success: true,
      message: "Artikel berhasil diperbarui!",
      post: updatedPost,
      posts,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server saat memperbarui artikel." },
      { status: 500 }
    );
  }
}

// DELETE /api/blog - Delete post
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

    const posts = readPosts();
    const updated = posts.filter((p) => p.id !== id);

    if (updated.length === posts.length) {
      return NextResponse.json(
        { success: false, error: "Artikel tidak ditemukan." },
        { status: 404 }
      );
    }

    writePosts(updated);

    return NextResponse.json({
      success: true,
      message: "Artikel berhasil dihapus!",
      posts: updated,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server saat menghapus artikel." },
      { status: 500 }
    );
  }
}
