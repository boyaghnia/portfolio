import { NextResponse } from "next/server";
import { getDbPosts, getDbCategories, readLocalPosts } from "@/utils/supabase/blog";
import { INITIAL_POSTS, BLOG_CATEGORIES } from "@/data/blog";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://boyaghnia.web.id");

  const baseUrl = rawBaseUrl.replace(/\/$/, "");
  const currentDate = new Date().toISOString();

  let posts: any[] = [];
  try {
    posts = await getDbPosts({ includeDrafts: false });
  } catch (err) {
    console.error("Error fetching db posts for blog/sitemap.xml:", err);
  }

  if (!posts || posts.length === 0) {
    const local = readLocalPosts().filter((p) => p.published);
    posts = local.length > 0 ? local : INITIAL_POSTS.filter((p) => p.published);
  } else {
    const existingSlugs = new Set(posts.map((p) => p.slug));
    for (const initPost of INITIAL_POSTS) {
      if (initPost.published && initPost.slug && !existingSlugs.has(initPost.slug)) {
        posts.push(initPost);
      }
    }
  }

  // XML items for categories
  let categories = await getDbCategories().catch(() => []);
  if (!categories || categories.length === 0) {
    categories = BLOG_CATEGORIES.filter((cat) => cat.id !== "all");
  }

  const categoriesXml = categories
    .filter((cat) => cat.id !== "all")
    .map((cat) => {
      return `  <url>
    <loc>${baseUrl}/blog?category=${encodeURIComponent(cat.id)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("\n");

  // XML items for published posts
  const postsXml = posts
    .filter((post) => post.published && post.slug)
    .map((post) => {
      const postDate = post.updatedAt || post.publishedAt || currentDate;
      const validDate = new Date(postDate);
      const isoDate = isNaN(validDate.getTime()) ? currentDate : validDate.toISOString();
      const priority = post.featured ? "0.9" : "0.8";

      return `  <url>
    <loc>${baseUrl}/blog/${encodeURIComponent(post.slug)}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
${categoriesXml}
${postsXml}
</urlset>`.trim();

  return new NextResponse(sitemapXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
