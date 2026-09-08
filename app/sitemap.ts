import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://boyaghnia.vercel.app");

  const currentDate = new Date();

  // Read blog posts for dynamic sitemap
  let blogPostUrls: MetadataRoute.Sitemap = [];
  try {
    const postsFilePath = path.join(process.cwd(), "data", "posts.json");
    if (fs.existsSync(postsFilePath)) {
      const postsData = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
      if (Array.isArray(postsData)) {
        blogPostUrls = postsData
          .filter((post) => post.published && post.slug)
          .map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
          }));
      }
    }
  } catch (err) {
    console.error("Error generating blog sitemap:", err);
  }

  return [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1.0,
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
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogPostUrls,
  ];
}
