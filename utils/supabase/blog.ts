import { createClient } from "@supabase/supabase-js";
import { BlogPost, BlogCategoryOption, DEFAULT_AUTHOR } from "@/data/blog";
import fs from "fs";
import path from "path";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_storage_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.storage_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.storage_SUPABASE_PUBLISHABLE_KEY ||
  process.env.storage_SUPABASE_ANON_KEY;

// Initialize Supabase client
export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

const POSTS_FILE_PATH = path.join(process.cwd(), "data", "posts.json");
const CATEGORIES_FILE_PATH = path.join(process.cwd(), "data", "categories.json");

// Helper: Read local fallback posts
export function readLocalPosts(): BlogPost[] {
  try {
    if (fs.existsSync(POSTS_FILE_PATH)) {
      return JSON.parse(fs.readFileSync(POSTS_FILE_PATH, "utf-8"));
    }
  } catch (err) {
    console.warn("Could not read local posts.json fallback:", err);
  }
  return [];
}

// Helper: Backup posts to local JSON
export function writeLocalPosts(posts: BlogPost[]): void {
  try {
    const dir = path.dirname(POSTS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(POSTS_FILE_PATH, JSON.stringify(posts, null, 2));
  } catch (err) {
    console.warn("Could not sync to local posts.json:", err);
  }
}

// Helper: Read local fallback categories
export function readLocalCategories(): BlogCategoryOption[] {
  try {
    if (fs.existsSync(CATEGORIES_FILE_PATH)) {
      return JSON.parse(fs.readFileSync(CATEGORIES_FILE_PATH, "utf-8"));
    }
  } catch (err) {
    console.warn("Could not read local categories.json fallback:", err);
  }
  return [];
}

// Helper: Backup categories to local JSON
export function writeLocalCategories(categories: BlogCategoryOption[]): void {
  try {
    const dir = path.dirname(CATEGORIES_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2));
  } catch (err) {
    console.warn("Could not sync to local categories.json:", err);
  }
}

// Map Database Row (snake_case) to BlogPost (camelCase)
export function mapDbToPost(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: Array.isArray(row.tags) ? row.tags : [],
    coverImage: row.cover_image,
    coverCaption: row.cover_caption || undefined,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    publishedAt: row.published_at || "",
    updatedAt: row.updated_at || "",
    readTime: row.read_time || 1,
    views: Number(row.views) || 0,
    likes: Number(row.likes) || 0,
    author: row.author || DEFAULT_AUTHOR,
  };
}

// Map BlogPost (camelCase) to Database Row (snake_case)
export function mapPostToDb(post: Partial<BlogPost>): Record<string, any> {
  const dbData: Record<string, any> = {};

  if (post.id !== undefined) dbData.id = post.id;
  if (post.slug !== undefined) dbData.slug = post.slug;
  if (post.title !== undefined) dbData.title = post.title;
  if (post.excerpt !== undefined) dbData.excerpt = post.excerpt;
  if (post.content !== undefined) dbData.content = post.content;
  if (post.category !== undefined) dbData.category = post.category;
  if (post.tags !== undefined) dbData.tags = post.tags;
  if (post.coverImage !== undefined) dbData.cover_image = post.coverImage;
  if (post.coverCaption !== undefined) dbData.cover_caption = post.coverCaption;
  if (post.featured !== undefined) dbData.featured = post.featured;
  if (post.published !== undefined) dbData.published = post.published;
  if (post.publishedAt !== undefined) dbData.published_at = post.publishedAt || null;
  if (post.updatedAt !== undefined) dbData.updated_at = post.updatedAt || new Date().toISOString();
  if (post.readTime !== undefined) dbData.read_time = post.readTime;
  if (post.views !== undefined) dbData.views = post.views;
  if (post.likes !== undefined) dbData.likes = post.likes;
  if (post.author !== undefined) dbData.author = post.author;

  return dbData;
}

// ----------------------------------------------------------------------------
// Posts Operations
// ----------------------------------------------------------------------------

export async function getDbPosts(options?: {
  category?: string;
  search?: string;
  includeDrafts?: boolean;
}): Promise<BlogPost[]> {
  if (!supabase) {
    return filterLocalPosts(options);
  }

  try {
    let query = supabase
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false, nullsFirst: false });

    if (!options?.includeDrafts) {
      query = query.eq("published", true);
    }

    if (options?.category && options.category !== "all") {
      query = query.eq("category", options.category);
    }

    const { data, error } = await query;

    if (error || !data) {
      console.warn("Supabase fetch error, falling back to local posts:", error?.message);
      return filterLocalPosts(options);
    }

    let results = data.map(mapDbToPost);

    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return results;
  } catch (err) {
    console.error("Error in getDbPosts:", err);
    return filterLocalPosts(options);
  }
}

function filterLocalPosts(options?: {
  category?: string;
  search?: string;
  includeDrafts?: boolean;
}): BlogPost[] {
  let posts = readLocalPosts();

  if (!options?.includeDrafts) {
    posts = posts.filter((p) => p.published);
  }

  if (options?.category && options.category !== "all") {
    posts = posts.filter((p) => p.category === options.category);
  }

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  posts.sort(
    (a, b) =>
      new Date(b.publishedAt || b.updatedAt).getTime() -
      new Date(a.publishedAt || a.updatedAt).getTime()
  );

  return posts;
}

export async function getDbPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) {
    const local = readLocalPosts();
    return local.find((p) => p.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      const local = readLocalPosts();
      return local.find((p) => p.slug === slug) || null;
    }

    return mapDbToPost(data);
  } catch (err) {
    console.error("Error in getDbPostBySlug:", err);
    const local = readLocalPosts();
    return local.find((p) => p.slug === slug) || null;
  }
}

export async function createDbPost(post: BlogPost): Promise<BlogPost> {
  if (supabase) {
    const dbPayload = mapPostToDb(post);
    const { data, error } = await supabase
      .from("posts")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.error("Error creating post in Supabase:", error);
      throw new Error(error.message);
    }

    const created = mapDbToPost(data);
    // Sync to local
    const local = readLocalPosts();
    local.unshift(created);
    writeLocalPosts(local);
    return created;
  }

  // Fallback local
  const local = readLocalPosts();
  local.unshift(post);
  writeLocalPosts(local);
  return post;
}

export async function updateDbPost(
  id: string,
  updates: Partial<BlogPost>
): Promise<BlogPost> {
  if (supabase) {
    const dbPayload = mapPostToDb(updates);
    const { data, error } = await supabase
      .from("posts")
      .update(dbPayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating post in Supabase:", error);
      throw new Error(error.message);
    }

    const updated = mapDbToPost(data);
    // Sync to local
    const local = readLocalPosts();
    const idx = local.findIndex((p) => p.id === id);
    if (idx !== -1) {
      local[idx] = updated;
      writeLocalPosts(local);
    }
    return updated;
  }

  // Fallback local
  const local = readLocalPosts();
  const idx = local.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Artikel tidak ditemukan.");
  const updated = { ...local[idx], ...updates, updatedAt: new Date().toISOString() };
  local[idx] = updated;
  writeLocalPosts(local);
  return updated;
}

export async function deleteDbPost(id: string): Promise<boolean> {
  if (supabase) {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("Error deleting post from Supabase:", error);
      throw new Error(error.message);
    }
  }

  // Sync to local
  const local = readLocalPosts();
  const filtered = local.filter((p) => p.id !== id);
  writeLocalPosts(filtered);
  return true;
}

export async function incrementDbPostViews(id: string): Promise<void> {
  if (supabase) {
    try {
      await supabase.rpc("increment_views", { post_id: id });
    } catch (err) {
      console.warn("Could not call increment_views RPC:", err);
    }
  }

  // Also increment local count
  const local = readLocalPosts();
  const post = local.find((p) => p.id === id);
  if (post) {
    post.views = (post.views || 0) + 1;
    writeLocalPosts(local);
  }
}

export async function incrementDbPostLikes(id: string): Promise<number> {
  let newLikes = 0;

  if (supabase) {
    try {
      await supabase.rpc("increment_likes", { post_id: id });
      const { data } = await supabase
        .from("posts")
        .select("likes")
        .eq("id", id)
        .single();
      if (data) newLikes = data.likes;
    } catch (err) {
      console.warn("Could not call increment_likes RPC:", err);
    }
  }

  // Also sync local count
  const local = readLocalPosts();
  const post = local.find((p) => p.id === id);
  if (post) {
    post.likes = (post.likes || 0) + 1;
    if (!newLikes) newLikes = post.likes;
    writeLocalPosts(local);
  }

  return newLikes;
}

// ----------------------------------------------------------------------------
// Categories Operations
// ----------------------------------------------------------------------------

export async function getDbCategories(): Promise<BlogCategoryOption[]> {
  if (!supabase) {
    return readLocalCategories();
  }

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("label", { ascending: true });

    if (error || !data) {
      return readLocalCategories();
    }

    return data.map((row: any) => ({
      id: row.id,
      label: row.label,
      description: row.description || "",
      color: row.color || "#3B82F6",
    }));
  } catch (err) {
    console.error("Error in getDbCategories:", err);
    return readLocalCategories();
  }
}

export async function createDbCategory(
  category: BlogCategoryOption
): Promise<BlogCategoryOption> {
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .insert({
        id: category.id,
        label: category.label,
        description: category.description || "",
        color: category.color || "#3B82F6",
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    const local = readLocalCategories();
    local.push(category);
    writeLocalCategories(local);
    return data;
  }

  const local = readLocalCategories();
  local.push(category);
  writeLocalCategories(local);
  return category;
}

export async function updateDbCategory(
  id: string,
  updates: Partial<BlogCategoryOption>
): Promise<BlogCategoryOption> {
  if (supabase) {
    const { data, error } = await supabase
      .from("categories")
      .update({
        label: updates.label,
        description: updates.description,
        color: updates.color,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    const local = readLocalCategories();
    const idx = local.findIndex((c) => c.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates };
      writeLocalCategories(local);
    }
    return data;
  }

  const local = readLocalCategories();
  const idx = local.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error("Kategori tidak ditemukan.");
  local[idx] = { ...local[idx], ...updates };
  writeLocalCategories(local);
  return local[idx];
}

export async function deleteDbCategory(id: string): Promise<boolean> {
  if (supabase) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }

  const local = readLocalCategories();
  const filtered = local.filter((c) => c.id !== id);
  writeLocalCategories(filtered);
  return true;
}
