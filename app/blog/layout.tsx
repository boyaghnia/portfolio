import type { Metadata } from "next";
import * as React from "react";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://boyaghnia.web.id");
const baseUrl = rawBaseUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Blog & Artikel Teknik | Boy Aghnia Rifadhan",
  description:
    "Kumpulan tulisan, tutorial, wawasan teknologi, arsitektur web modern, dan eksplorasi creative coding 3D oleh Boy Aghnia Rifadhan.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Blog & Artikel Teknik | Boy Aghnia Rifadhan",
    description:
      "Kumpulan tulisan, tutorial, wawasan teknologi, arsitektur web modern, dan eksplorasi creative coding 3D oleh Boy Aghnia Rifadhan.",
    url: `${baseUrl}/blog`,
    siteName: "Boy Aghnia Rifadhan",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Artikel Teknik | Boy Aghnia Rifadhan",
    description:
      "Kumpulan tulisan, tutorial, wawasan teknologi, arsitektur web modern, dan eksplorasi creative coding 3D oleh Boy Aghnia Rifadhan.",
    creator: "@boyaghnia",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
