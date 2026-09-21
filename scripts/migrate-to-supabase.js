const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load .env.local manually if not in Next environment
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const [key, ...values] = trimmed.split("=");
      const val = values.join("=").trim().replace(/^['"]|['"]$/g, "");
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    });
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Supabase URL or Key is missing in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("🚀 Memulai proses migrasi ke Supabase:", supabaseUrl);

  // 1. Cek ketersediaan tabel
  const testTable = await supabase.from("categories").select("count").limit(1);
  if (testTable.error && testTable.error.code === "PGRST205") {
    console.error("\n❌ Tabel belum dibuat di database Supabase.");
    console.error("Pesan error:", testTable.error.message);
    console.error(
      "\n⚠️ Silakan buka SQL Editor di dashboard Supabase (https://supabase.com/dashboard/project/umjkyzonjrbpcsaszxzz/sql/new) dan jalankan skrip SQL skema tabel terlebih dahulu.\n"
    );
    process.exit(1);
  }

  // 2. Migrasi Kategori
  const categoriesPath = path.join(process.cwd(), "data", "categories.json");
  const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));
  console.log(`\n📦 Memindahkan ${categories.length} kategori...`);

  const { error: catError } = await supabase
    .from("categories")
    .upsert(categories, { onConflict: "id" });

  if (catError) {
    console.error("❌ Gagal migrasi kategori:", catError.message);
    process.exit(1);
  }
  console.log("✅ Berhasil memindahkan semua kategori!");

  // 3. Migrasi Artikel Blog
  const postsPath = path.join(process.cwd(), "data", "posts.json");
  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
  console.log(`\n📦 Memindahkan ${posts.length} artikel blog...`);

  const mappedPosts = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags || [],
    cover_image: post.coverImage,
    cover_caption: post.coverCaption || null,
    featured: Boolean(post.featured),
    published: Boolean(post.published),
    published_at: post.publishedAt,
    updated_at: post.updatedAt,
    read_time: post.readTime || 1,
    views: post.views || 0,
    likes: post.likes || 0,
    author: post.author,
  }));

  const { error: postError } = await supabase
    .from("posts")
    .upsert(mappedPosts, { onConflict: "slug" });

  if (postError) {
    console.error("❌ Gagal migrasi artikel:", postError.message);
    process.exit(1);
  }

  console.log("✅ Berhasil memindahkan semua artikel blog ke Supabase!");

  // 4. Verifikasi data
  const { data: verifiedPosts } = await supabase
    .from("posts")
    .select("id, title, slug");
  console.log("\n📊 Ringkasan Artikel di Supabase:");
  verifiedPosts.forEach((p, idx) => {
    console.log(`  ${idx + 1}. [${p.id}] ${p.title} (${p.slug})`);
  });

  console.log("\n🎉 Seluruh blog Anda telah tersimpan dengan aman di database Supabase!\n");
}

migrate();
