import { NextResponse } from "next/server";
import { BlogCategoryOption } from "@/data/blog";
import { isOwnerAuthorized } from "../route";
import {
  getDbCategories,
  createDbCategory,
  updateDbCategory,
  deleteDbCategory,
  getDbPosts,
} from "@/utils/supabase/blog";

// GET /api/blog/categories - Get all categories with post counts from Supabase
export async function GET() {
  try {
    const categories = await getDbCategories();
    const posts = await getDbPosts({ includeDrafts: false });

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

// POST /api/blog/categories - Create a new category in Supabase
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

    const categories = await getDbCategories();
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

    const created = await createDbCategory(newCategory);

    return NextResponse.json({
      success: true,
      message: `Kategori '${newCategory.label}' berhasil ditambahkan ke Supabase!`,
      category: created,
    });
  } catch (error: any) {
    console.error("Error in POST /api/blog/categories:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat menambah kategori." },
      { status: 500 }
    );
  }
}

// PUT /api/blog/categories - Update an existing category in Supabase
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { passcode, currentId, label, description, color } = body;

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

    const categories = await getDbCategories();
    const existing = categories.find((c) => c.id === currentId);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Kategori tidak ditemukan." },
        { status: 404 }
      );
    }

    const updated = await updateDbCategory(currentId, {
      label: label.trim(),
      description: description?.trim() || "",
      color: color?.trim() || existing.color || "#3B82F6",
    });

    return NextResponse.json({
      success: true,
      message: `Kategori '${updated.label}' berhasil diperbarui di Supabase!`,
      category: updated,
    });
  } catch (error: any) {
    console.error("Error in PUT /api/blog/categories:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat memperbarui kategori." },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/categories - Delete a category from Supabase
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

    const posts = await getDbPosts({ includeDrafts: true });
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

    await deleteDbCategory(id);

    return NextResponse.json({
      success: true,
      message: "Kategori berhasil dihapus dari Supabase!",
    });
  } catch (error: any) {
    console.error("Error in DELETE /api/blog/categories:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat menghapus kategori." },
      { status: 500 }
    );
  }
}
