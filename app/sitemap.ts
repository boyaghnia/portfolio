import type { MetadataRoute } from "next";
import { getDbPosts, readLocalPosts } from "@/utils/supabase/blog";
import { INITIAL_POSTS, BLOG_CATEGORIES } from "@/data/blog";

export const revalidate = 3600; // Cache for 1 hour, then regenerate in background

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://boyaghnia.web.id");

  const baseUrl = rawBaseUrl.replace(/\/$/, "");
  const currentDate = new Date();

  // 1. Fetch published posts from Supabase or fallback
  let posts: any[] = [];
  try {
    posts = await getDbPosts({ includeDrafts: false });
  } catch (err) {
    console.error("Error fetching db posts for sitemap:", err);
  }

  // 2. Fallback to local posts or INITIAL_POSTS if Supabase returned empty
  if (!posts || posts.length === 0) {
    const local = readLocalPosts().filter((p) => p.published);
    posts = local.length > 0 ? local : INITIAL_POSTS.filter((p) => p.published);
  } else {
    // Merge any missing initial published posts
    const existingSlugs = new Set(posts.map((p) => p.slug));
    for (const initPost of INITIAL_POSTS) {
      if (initPost.published && initPost.slug && !existingSlugs.has(initPost.slug)) {
        posts.push(initPost);
      }
    }
  }

  // 3. Generate dynamic sitemap entries for all published blog posts
  const blogPostUrls: MetadataRoute.Sitemap = posts
    .filter((post) => post.published && post.slug)
    .map((post) => {
      const postDate = post.updatedAt || post.publishedAt;
      const lastModified = postDate ? new Date(postDate) : currentDate;
      const validDate = isNaN(lastModified.getTime()) ? currentDate : lastModified;

      return {
        url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
        lastModified: validDate,
        changeFrequency: "weekly" as const,
        priority: post.featured ? 0.9 : 0.8,
      };
    });

  // 4. Generate dynamic category URLs
  const categoryUrls: MetadataRoute.Sitemap = BLOG_CATEGORIES
    .filter((cat) => cat.id !== "all")
    .map((cat) => ({
      url: `${baseUrl}/blog?category=${encodeURIComponent(cat.id)}`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

  // 5. Combine static routes, categories, and dynamic blog posts
  return [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/donasi`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/project-3d-model`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/project-bade`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guest-book`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...categoryUrls,
    ...blogPostUrls,
  ];
}
