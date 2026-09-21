-- ==========================================================
-- SKEMA DATABASE BLOG PORTFOLIO UNTUK SUPABASE
-- Jalankan skrip ini di Supabase SQL Editor:
-- https://supabase.com/dashboard/project/umjkyzonjrbpcsaszxzz/sql/new
-- ==========================================================

-- 1. Buat Tabel Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Buat Tabel Posts
CREATE TABLE IF NOT EXISTS public.posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT NOT NULL,
  cover_caption TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  read_time INT DEFAULT 1,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  author JSONB DEFAULT '{
    "name": "Boy Aghnia Rifadhan",
    "role": "Front-End Developer & UI/UX Specialist",
    "avatar": "/images/profile/hero-avatar.png",
    "handle": "@boyaghnia"
  }'::jsonb
);

-- 3. Tambahkan Index untuk Akselerasi Query
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);

-- 4. Fungsi Atomik untuk Increment Views & Likes
CREATE OR REPLACE FUNCTION public.increment_views(post_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.increment_likes(post_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts
  SET likes = likes + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Izinkan publik membaca kategori
CREATE POLICY "Public categories are viewable by everyone" 
  ON public.categories FOR SELECT USING (true);

-- Izinkan publik membaca artikel yang sudah terbit
CREATE POLICY "Public published posts are viewable by everyone" 
  ON public.posts FOR SELECT USING (published = true);

-- Izinkan operasi insert/update/delete untuk publishable key saat tahap integrasi
CREATE POLICY "Allow all operations for development"
  ON public.posts FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for categories"
  ON public.categories FOR ALL USING (true) WITH CHECK (true);
