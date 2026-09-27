import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://boyaghnia.web.id");

  const baseUrl = rawBaseUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/blog/admin"],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/blog/sitemap.xml`,
    ],
  };
}
