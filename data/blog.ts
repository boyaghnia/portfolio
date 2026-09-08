export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  handle: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  coverCaption?: string;
  featured?: boolean;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
  readTime: number; // in minutes
  views: number;
  likes: number;
  author: BlogAuthor;
}

export interface BlogCategoryOption {
  id: string;
  label: string;
  description?: string;
  color?: string;
  count?: number;
}

export type SidebarWidgetId =
  | "search"
  | "related-posts"
  | "categories"
  | "top-posts"
  | "ads"
  | `ad:${string}`
  | string;

export const DEFAULT_WIDGET_ORDER: SidebarWidgetId[] = [
  "search",
  "ad:ad-1",
  "related-posts",
  "ad:ad-2",
  "categories",
  "top-posts",
];

export interface SidebarAdItem {
  id: string;
  enabled: boolean;
  type: "image" | "adsense";
  title?: string;
  imageUrl?: string;
  targetUrl?: string;
  altText?: string;
  caption?: string;
  adsenseClient?: string;
  adsenseSlot?: string;
  adsenseFormat?: string;
  customHtml?: string;
}

export type SidebarAdConfig = SidebarAdItem;

/**
 * Format and sanitize external/internal target URLs.
 * Automatically adds https:// protocol if the user enters domain without scheme (e.g., instagram.com, wa.me).
 */
export function formatExternalUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") return "";
  // Check if it already has a scheme or is root/hash relative
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export interface SidebarConfig {
  widgetOrder?: SidebarWidgetId[];
  showSearch: boolean;
  showTopPosts: boolean;
  topPostsTitle: string;
  topPostsCount: number;
  showCategories?: boolean;
  categoriesTitle?: string;
  showRelatedPosts?: boolean;
  relatedPostsTitle?: string;
  ads?: SidebarAdItem[];
  ad?: SidebarAdConfig;
}

export const DEFAULT_SIDEBAR_CONFIG: SidebarConfig = {
  widgetOrder: DEFAULT_WIDGET_ORDER,
  showSearch: true,
  showTopPosts: true,
  topPostsTitle: "Artikel Terpopuler",
  topPostsCount: 4,
  showCategories: true,
  categoriesTitle: "Kategori Topik",
  showRelatedPosts: true,
  relatedPostsTitle: "Artikel Terkait",
  ads: [
    {
      id: "ad-1",
      enabled: true,
      type: "image",
      title: "Sponsor & Kolaborasi",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
      targetUrl: "https://boyaghnia.my.id/#contact",
      altText: "Open for Software Engineering & UI/UX Collaboration",
      caption: "Tertarik berkolaborasi atau memasang sponsor di blog ini? Hubungi saya untuk diskusi proyek atau kemitraan.",
      adsenseClient: "",
      adsenseSlot: "",
      adsenseFormat: "auto",
      customHtml: "",
    },
    {
      id: "ad-2",
      enabled: true,
      type: "image",
      title: "Layanan Web 3D & Creative Tech",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      targetUrl: "https://boyaghnia.my.id/#projects",
      altText: "Interactive 3D Web Development Services",
      caption: "Hadirkan pengalaman visual imersif dengan Three.js & React Three Fiber untuk brand dan produk Anda.",
      adsenseClient: "",
      adsenseSlot: "",
      adsenseFormat: "auto",
      customHtml: "",
    },
  ],
  ad: {
    id: "ad-1",
    enabled: true,
    type: "image",
    title: "Sponsor & Kolaborasi",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    targetUrl: "https://boyaghnia.my.id/#contact",
    altText: "Open for Software Engineering & UI/UX Collaboration",
    caption: "Tertarik berkolaborasi atau memasang sponsor di blog ini? Hubungi saya untuk diskusi proyek atau kemitraan.",
    adsenseClient: "",
    adsenseSlot: "",
    adsenseFormat: "auto",
    customHtml: "",
  },
};

export const DEFAULT_AUTHOR: BlogAuthor = {
  name: "Boy Aghnia Rifadhan",
  role: "Front-End Developer & UI/UX Specialist",
  avatar: "/images/profile/hero-avatar.png",
  handle: "@boyaghnia",
};

export const BLOG_CATEGORIES: BlogCategoryOption[] = [
  { id: "all", label: "Semua Topik", description: "Jelajahi semua tulisan dan artikel teknik" },
  { id: "web", label: "Web Development", description: "Pengembangan front-end, Next.js, dan arsitektur web modern" },
  { id: "3d", label: "3D & Creative Tech", description: "Three.js, WebGL, animasi interaktif, dan komputasi grafis" },
  { id: "design-system", label: "Design Systems & UI", description: "Desain antarmuka, token warna, Tailwind, dan aksesibilitas" },
  { id: "tutorial", label: "Tutorial & Tips", description: "Panduan praktis, tips coding, dan penyelesaian masalah" },
];

export function calculateReadTime(text: string): number {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatBlogDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "membangun-web-interaktif-3d-threejs-nextjs",
    title: "Membangun Pengalaman Web 3D Interaktif dengan Three.js dan Next.js",
    excerpt: "Panduan lengkap bagaimana mengintegrasikan React Three Fiber, Rapier Physics, dan shaders GLSL ke dalam ekosistem Next.js App Router dengan performa optimal 60 FPS.",
    category: "3d",
    tags: ["Three.js", "React Three Fiber", "Next.js", "WebGL", "Shaders"],
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Visualisasi 3D Shaders dan Geometri Abstrak",
    featured: true,
    published: true,
    publishedAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
    readTime: 5,
    views: 342,
    likes: 48,
    author: DEFAULT_AUTHOR,
    content: `## Mengapa Pengalaman 3D di Web Semakin Diminati?

Dalam beberapa tahun terakhir, batas antara aplikasi web tradisional dan pengalaman interaktif grafis tinggi semakin kabur. Berkat kemajuan browser modern, WebGL, dan sekarang WebGPU, kita dapat menghadirkan visual 3D yang imersif langsung di browser tanpa instalasi tambahan.

Menggabungkan **Next.js 16** dengan **@react-three/fiber (R3F)** memberikan kekuatan ganda: arsitektur komponen React yang deklaratif dipadukan dengan rendering Three.js berkekuatan GPU.

---

## 1. Arsitektur Komponen R3F di Next.js

Salah satu tantangan utama dalam Next.js App Router adalah memisahkan kode yang berjalan di server (Server Components) dengan kanvas WebGL yang membutuhkan browser API (*window*, *WebGLRenderingContext*).

Kuncinya adalah memastikan kanvas 3D selalu berada dalam Client Component:

\`\`\`tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

export function InteractiveCanvas() {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-border/40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <mesh>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
            <meshStandardMaterial color="#EAB308" roughness={0.2} metalness={0.8} />
          </mesh>
        </Float>
        
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
\`\`\`

> **Tips Kinerja:** Hindari membuat ulang material atau geometri di setiap render loop (\`useFrame\`). Buat instance di luar loop atau gunakan memoization agar garbage collector tidak memicu drop frame.

---

## 2. Optimasi Fisika dengan Rapier

Untuk interaktivitas objek yang natural, seperti benturan dan gravitasi, library **@react-three/rapier** adalah solusi paling efisien karena ditulis dalam Rust dan dikompilasi ke WebAssembly (WASM).

Langkah-langkah optimasi:
1. Batasi jumlah RigidBody dinamis di layar.
2. Gunakan colliders berbentuk primitif (\`cuboid\`, \`ball\`) dibanding \`trimesh\` yang berat komputasinya.
3. Manfaatkan \`damping\` linear dan angular untuk menjaga kestabilan simulasi.

---

## 3. Kesimpulan

Membangun web 3D bukan hanya tentang efek visual yang mencolok, melainkan tentang bagaimana menyajikan narasi produk yang lebih kaya dan menyenangkan bagi audiens. Dengan ekosistem Next.js dan Three.js, kita bisa mencapai keseimbangan sempurna antara estetika tinggi dan performa yang responsif.`,
  },
  {
    id: "post-2",
    slug: "desain-sistem-skalabel-tailwind-css-oklch",
    title: "Membangun Design System Skalabel dengan Tailwind CSS dan OKLCH Color Space",
    excerpt: "Eksplorasi mendalam mengenai implementasi ruang warna OKLCH pada Next.js dan Tailwind CSS v4 untuk menghasilkan tema gelap-terang yang konsisten dan nyaman di mata.",
    category: "design-system",
    tags: ["Design System", "Tailwind CSS", "OKLCH", "UI/UX", "CSS"],
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Arsitektur Token Warna Modern dan Komponen Antarmuka",
    featured: false,
    published: true,
    publishedAt: "2026-02-18T14:30:00.000Z",
    updatedAt: "2026-02-18T14:30:00.000Z",
    readTime: 4,
    views: 215,
    likes: 31,
    author: DEFAULT_AUTHOR,
    content: `## Mengapa Ruang Warna HSL Mulai Ditinggalkan?

Selama bertahun-tahun, developer web mengandalkan format RGB dan HSL untuk mendefinisikan warna. Namun, HSL memiliki kelemahan mendasar: **perceived lightness** (kecerahan yang dipersepsikan manusia) tidak konsisten. 

Warna kuning dengan lightness 50% terlihat jauh lebih terang bagi mata manusia dibandingkan warna biru pada lightness yang sama. Akibatnya, rasio kontras pada tombol atau teks sering kali tidak terduga saat beralih antara tema gelap dan terang.

---

## Masuknya OKLCH: Ruang Warna yang Dirancang untuk Persepsi Manusia

**OKLCH** menyelesaikan masalah ini dengan memisahkan:
- **L (Lightness)**: Kecerahan seragam dari 0 (hitam mutlak) hingga 1 (putih mutlak).
- **C (Chroma)**: Kejenuhan warna (purity).
- **H (Hue)**: Sudut warna dalam derajat (0 - 360).

Pada OKLCH, dua warna dengan nilai Lightness yang sama dijamin memiliki kecerahan yang setara bagi retina mata manusia!

\`\`\`css
:root {
  --primary: oklch(0.553 0.195 38.402);
  --primary-foreground: oklch(0.98 0.016 73.684);
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
}

.dark {
  --primary: oklch(0.47 0.157 37.304);
  --primary-foreground: oklch(0.98 0.016 73.684);
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
}
\`\`\`

---

## Keuntungan dalam Skala Proyek Besar

1. **Prediktabilitas Kontras WCAG**: Membuat palet warna accessible (kontras minimal 4.5:1) menjadi rumus matematika sederhana tanpa tebak-tebak buah manggis.
2. **Peralihan Dark Mode Mulus**: Cukup sesuaikan lightness tanpa merusak harmoni saturasi warna brand.
3. **Kompatibilitas Penuh**: Didukung oleh seluruh browser modern dan Tailwind CSS v4 terbaru.`,
  },
  {
    id: "post-3",
    slug: "nextjs-16-fitur-baru-dan-optimasi-arsitektur",
    title: "Mengupas Fitur Terbaru Next.js 16 dan Praktik Terbaik Arsitektur Colocation",
    excerpt: "Tinjauan arsitektur App Router terbaru, pemanfaatan pola private folder _components, Server Actions teroptimasi, dan strategi caching untuk portfolio berperforma kilat.",
    category: "web",
    tags: ["Next.js", "React 19", "Architecture", "Clean Code", "Performance"],
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Arsitektur Kode Bersih dan Pola Colocation",
    featured: false,
    published: true,
    publishedAt: "2026-01-25T08:15:00.000Z",
    updatedAt: "2026-01-25T08:15:00.000Z",
    readTime: 6,
    views: 489,
    likes: 67,
    author: DEFAULT_AUTHOR,
    content: `## Perjalanan Evolusi Next.js

Next.js terus berkembang dengan pesat, membawa perbaikan signifikan pada sistem bundling, Server Components, dan integrasi React 19.

Salah satu prinsip penting yang kami terapkan di portfolio ini adalah **Pola Route Colocation**:

\`\`\`
app/
├── blog/
│   ├── _components/          <-- Komponen eksklusif untuk blog
│   │   ├── blog-card.tsx
│   │   ├── post-editor.tsx
│   │   └── admin-dashboard.tsx
│   ├── [slug]/
│   │   └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   └── page.tsx
\`\`\`

Dengan menempatkan komponen privat di dalam \`_components/\` pada setiap folder rute:
- Folder komponen global (\`components/ui\`, \`components/layout\`) tetap ramping dan tidak berantakan.
- Menghindari circular dependency antar rute yang tidak berhubungan.
- Mempermudah refactoring di kemudian hari saat suatu rute ingin diisolasi atau dihapus.

---

## Rekomendasi Praktik Terbaik

1. **Gunakan Server Components sebagai Default**: Hanya tambahkan \`"use client"\` ketika Anda benar-benar membutuhkan state React, event listeners, atau browser APIs.
2. **Kombinasikan Data Fetching di API Routes**: Menggunakan Next.js Route Handlers (\`app/api/...\`) memberikan fleksibilitas penuh untuk validasi keamanan seperti rate limiting dan spam filtering sebelum data diubah di server.
3. **Dynamic SEO Sitemap**: Bangun \`sitemap.ts\` secara dinamis agar setiap artikel baru langsung terindeks oleh search engine tanpa perlu deploy ulang berkali-kali.`,
  },
];
