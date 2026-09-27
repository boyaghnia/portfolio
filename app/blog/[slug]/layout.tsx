import type { Metadata } from "next";
import * as React from "react";
import { getDbPostBySlug } from "@/utils/supabase/blog";
import { INITIAL_POSTS } from "@/data/blog";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://boyaghnia.web.id");
  const baseUrl = rawBaseUrl.replace(/\/$/, "");

  let post = null;
  try {
    post = await getDbPostBySlug(slug);
  } catch (err) {
    console.error("Error fetching post for metadata:", err);
  }

  if (!post) {
    post = INITIAL_POSTS.find((p) => p.slug === slug) || null;
  }

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | Blog Boy Aghnia",
      description: "Halaman artikel blog yang Anda cari tidak ditemukan.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const postUrl = `${baseUrl}/blog/${encodeURIComponent(post.slug)}`;
  const title = `${post.title} | Blog Boy Aghnia`;
  const description = post.excerpt || post.title;
  const publishedTime = post.publishedAt || new Date().toISOString();
  const modifiedTime = post.updatedAt || publishedTime;
  const images = post.coverImage ? [post.coverImage] : [];

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      title: post.title,
      description,
      url: postUrl,
      siteName: "Boy Aghnia Rifadhan",
      locale: "id_ID",
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [post.author?.name || "Boy Aghnia Rifadhan"],
      tags: post.tags,
      images: images.map((img) => ({
        url: img,
        alt: post.coverCaption || post.title,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images,
      creator: "@boyaghnia",
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: Props) {
  const { slug } = await params;
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://boyaghnia.web.id");
  const baseUrl = rawBaseUrl.replace(/\/$/, "");

  let post = null;
  try {
    post = await getDbPostBySlug(slug);
  } catch {
    // fallback
  }

  if (!post) {
    post = INITIAL_POSTS.find((p) => p.slug === slug) || null;
  }

  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage ? [post.coverImage] : [],
        datePublished: post.publishedAt || new Date().toISOString(),
        dateModified: post.updatedAt || post.publishedAt || new Date().toISOString(),
        author: {
          "@type": "Person",
          name: post.author?.name || "Boy Aghnia Rifadhan",
          url: baseUrl,
        },
        publisher: {
          "@type": "Person",
          name: "Boy Aghnia Rifadhan",
          url: baseUrl,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
        },
        keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
