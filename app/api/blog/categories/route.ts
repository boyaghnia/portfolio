import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BlogCategoryOption, BLOG_CATEGORIES } from "@/data/blog";
import { isOwnerAuthorized, readPosts, writePosts } from "../route";

const CATEGORIES_FILE_PATH = path.join(process.cwd(), "data", "categories.json");

const DEFAULT_CATEGORIES: BlogCategoryOption[] = [
  {
    id: "web",
    label: "Web Development",
    description: "Pengembangan front-end, Next.js, dan arsitektur web modern",
    color: "#3B82F6",
  },
  {
    id: "3d",
    label: "3D & Creative Tech",
    description: "Three.js, WebGL, animasi interaktif, dan komputasi grafis",
    color: "#EAB308",
  },
  {
    id: "design-system",
    label: "Design Systems & UI",
    description: "Desain antarmuka, token warna, Tailwind, dan aksesibilitas",
    color: "#10B981",
  },
  {
    id: "tutorial",
    label: "Tutorial & Tips",
    description: "Panduan praktis, tips coding, dan penyelesaian masalah",
    color: "#8B5CF6",
  },
];

export function readCategories(): BlogCategoryOption[] {
  try {
    if (!fs.existsSync(CATEGORIES_FILE_PATH)) {
      const dir = path.dirname(CATEGORIES_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(DEFAULT_CATEGORIES, null, 2));
      return DEFAULT_CATEGORIES;
    }
    const data = fs.readFileSync(CATEGORIES_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    // Filter out 'thoughts' if it still exists in an old file
    return parsed.filter((c: BlogCategoryOption) => c.id !== "thoughts");
  } catch (error) {
    console.error("Error reading categories data:", error);
    return DEFAULT_CATEGORIES;
  }
}

export function writeCategories(categories: BlogCategoryOption[]): boolean {
  try {
    const dir = path.dirname(CATEGORIES_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing categories data:", error);
    return false;
  }
}

// GET /api/blog/categories - Get all categories with post counts
export async function GET() {
  try {
    const categories = readCategories();
    const posts = readPosts();

    // Attach dynamic post counts
    const categoriesWithCount = categories.map((cat) => ({
      ...cat,
      count: posts.filter((p) => p.published && p.category === cat.id).length,
    }));

    const totalPublishedPosts = posts.filter((p) => p.published).length;

    return NextResponse.json({
      success: true,
      categories: categoriesWithCount,
      totalPosts: totalPublishedPosts,
    });
  } catch (error) {
    console.error("Error in GET /api/blog/categories:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat kategori blog." },
      { status: 500 }
    );
  }
}

// POST /api/blog/categories - Create a new category
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode, id, label, description, color } = body;

    if (!isOwnerAuthorized(passcode)) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak. Passcode admin tidak valid." },
        { status: 401 }
      );
    }

    if (!label || typeof label !== "string" || !label.trim()) {
      return NextResponse.json(
        { success: false, error: "Nama kategori wajib diisi." },
        { status: 400 }
      );
    }

    // Generate or sanitize slug id
    const cleanId = (id || label)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!cleanId || cleanId === "all") {
      return NextResponse.json(
        { success: false, error: "Slug kategori tidak valid atau terlarang." },
        { status: 400 }
      );
    }

    const categories = readCategories();
    if (categories.some((c) => c.id === cleanId)) {
      return NextResponse.json(
        { success: false, error: `Kategori dengan slug '${cleanId}' sudah ada.` },
        { status: 400 }
      );
    }

    const newCategory: BlogCategoryOption = {
      id: cleanId,
      label: label.trim(),
      description: description?.trim() || "",
      color: color?.trim() || "#3B82F6",
    };

    categories.push(newCategory);
    const success = writeCategories(categories);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Gagal menyimpan kategori ke file." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Kategori '${newCategory.label}' berhasil ditambahkan!`,
      category: newCategory,
    });
  } catch (error) {
    console.error("Error in POST /api/blog/categories:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server saat menambah kategori." },
      { status: 500 }
    );
  }
}

// PUT /api/blog/categories - Update an existing category
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { passcode, currentId, id: newId, label, description, color } = body;

    if (!isOwnerAuthorized(passcode)) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak. Passcode admin tidak valid." },
        { status: 401 }
      );
    }

    if (!currentId) {
      return NextResponse.json(
        { success: false, error: "ID kategori saat ini wajib disertakan." },
        { status: 400 }
      );
    }

    if (!label || typeof label !== "string" || !label.trim()) {
      return NextResponse.json(
        { success: false, error: "Nama kategori wajib diisi." },
        { status: 400 }
      );
    }

    const cleanNewId = (newId || currentId)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const categories = readCategories();
    const index = categories.findIndex((c) => c.id === currentId);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Kategori tidak ditemukan." },
        { status: 404 }
      );
    }

    // Check slug conflict if slug is being changed
    if (cleanNewId !== currentId && categories.some((c) => c.id === cleanNewId)) {
      return NextResponse.json(
        { success: false, error: `Slug '${cleanNewId}' sudah digunakan kategori lain.` },
        { status: 400 }
      );
    }

    // If id changed, migrate all posts in posts.json that used currentId
    if (cleanNewId !== currentId) {
      const posts = readPosts();
      let modified = false;
      const updatedPosts = posts.map((p) => {
        if (p.category === currentId) {
          modified = true;
          return { ...p, category: cleanNewId };
        }
        return p;
      });

      if (modified) {
        writePosts(updatedPosts);
      }
    }

    categories[index] = {
      id: cleanNewId,
      label: label.trim(),
      description: description?.trim() || "",
      color: color?.trim() || categories[index].color || "#3B82F6",
    };

    const success = writeCategories(categories);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Gagal memperbarui kategori di file." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Kategori '${categories[index].label}' berhasil diperbarui!`,
      category: categories[index],
    });
  } catch (error) {
    console.error("Error in PUT /api/blog/categories:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server saat memperbarui kategori." },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/categories - Delete a category
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const passcode = req.headers.get("x-passcode");

    if (!isOwnerAuthorized(passcode || undefined)) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak. Passcode admin tidak valid." },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID kategori wajib disertakan." },
        { status: 400 }
      );
    }

    const categories = readCategories();
    const exists = categories.some((c) => c.id === id);
    if (!exists) {
      return NextResponse.json(
        { success: false, error: "Kategori tidak ditemukan." },
        { status: 404 }
      );
    }

    // Check if any posts currently use this category
    const posts = readPosts();
    const usedPosts = posts.filter((p) => p.category === id);
    if (usedPosts.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Kategori ini masih digunakan oleh ${usedPosts.length} artikel. Ubah kategori artikel terkait terlebih dahulu sebelum menghapus.`,
        },
        { status: 400 }
      );
    }

    const updatedCategories = categories.filter((c) => c.id !== id);
    const success = writeCategories(updatedCategories);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Gagal menghapus kategori dari file." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kategori berhasil dihapus!",
    });
  } catch (error) {
    console.error("Error in DELETE /api/blog/categories:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server saat menghapus kategori." },
      { status: 500 }
    );
  }
}
