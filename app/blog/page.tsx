import { getDbPosts, getDbCategories } from "@/utils/supabase/blog";
import { readSidebarConfig } from "@/app/api/blog/sidebar/route";
import { BlogClient } from "./_components/blog-client";
import { BlogCategoryOption } from "@/data/blog";

export const revalidate = 60; // Incremental Static Regeneration: 0ms instant prefetch!

export default async function BlogIndexPage() {
  const [posts, dbCategories] = await Promise.all([
    getDbPosts(),
    getDbCategories(),
  ]);
  const sidebarConfig = readSidebarConfig();

  const categories: BlogCategoryOption[] = [
    {
      id: "all",
      label: "Semua Topik",
      description: "Jelajahi semua tulisan dan artikel",
    },
    ...dbCategories,
  ];

  return (
    <BlogClient
      initialPosts={posts}
      initialCategories={categories}
      initialSidebarConfig={sidebarConfig}
    />
  );
}
