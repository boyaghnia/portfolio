import { getDbPosts, getDbCategories } from "@/utils/supabase/blog";
import { readSidebarConfig } from "@/app/api/blog/sidebar/route";
import { BlogClient } from "./_components/blog-client";
import { BlogCategoryOption } from "@/data/blog";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BlogPageProps {
  searchParams?: Promise<{ category?: string; search?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const [posts, dbCategories] = await Promise.all([
    getDbPosts(),
    getDbCategories(),
  ]);
  const sidebarConfig = readSidebarConfig();

  const categories: BlogCategoryOption[] = [
    {
      id: "all",
      label: "Semua Topik",
      description: "Jelajahi semua tulisan dan artikel teknik",
    },
    ...dbCategories,
  ];

  return (
    <BlogClient
      initialPosts={posts}
      initialCategories={categories}
      initialSidebarConfig={sidebarConfig}
      initialCategory={resolvedParams.category || "all"}
      initialSearch={resolvedParams.search || ""}
    />
  );
}
