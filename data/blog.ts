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

export function toWibDateTimeLocal(dateInput?: string | Date): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(d.getTime())) return "";
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

export function wibDateTimeToISO(wibDateTimeString: string): string {
  if (!wibDateTimeString) return new Date().toISOString();
  // Ensure seconds are attached
  const clean = wibDateTimeString.length === 16 ? `${wibDateTimeString}:00` : wibDateTimeString;
  const withTimezone = clean.includes("+") || clean.includes("Z") ? clean : `${clean}+07:00`;
  const d = new Date(withTimezone);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

export function formatBlogDate(
  dateString: string,
  includeTime: boolean = false
): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const dateFormatted = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    if (includeTime) {
      const timeFormatted = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);
      return `${dateFormatted} • ${timeFormatted} WIB`;
    }

    return dateFormatted;
  } catch {
    return dateString;
  }
}

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "post-4",
    slug: "cara-extract-rar-menggunakan-automator-macos",
    title: "Cara Mudah Ekstrak File RAR di Mac Menggunakan Automator (1x Klik Finder)",
    excerpt: "Panduan praktis membuat Quick Action di macOS Finder menggunakan Automator dan shell script unrar. Ekstrak file RAR secara instan langsung dari menu klik kanan tanpa perlu aplikasi pihak ketiga.",
    category: "tutorial",
    tags: ["macOS", "Automator", "Shell Script", "Tutorial", "Homebrew", "Apple Silicon"],
    coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Tutorial Otomasi macOS: Ekstraksi File RAR Langsung dari Menu Klik Kanan Finder",
    featured: false,
    published: true,
    publishedAt: "2026-09-21T15:00:00.000Z",
    updatedAt: "2026-09-21T15:00:00.000Z",
    readTime: 4,
    views: 128,
    likes: 24,
    author: DEFAULT_AUTHOR,
    content: `## Mengapa Mengekstrak File RAR di Mac Sering Merepotkan?

Bagi para pengguna macOS, membuka file terkompresi seperti \`.zip\` adalah hal yang sangat mudah karena Apple sudah menyediakan aplikasi bawaan **Archive Utility**. Namun, cerita berbeda ketika kita berhadapan dengan file berekstensi \`.rar\`.

Secara *default*, macOS tidak memiliki dukungan bawaan untuk membuka arsip RAR. Sering kali, pengguna terpaksa:
1. Mengunduh aplikasi pihak ketiga seperti *The Unarchiver*, *Keka*, atau aplikasi berbayar lainnya dari Mac App Store.
2. Membuka Terminal secara manual setiap kali ingin mengekstrak file.

Tahukah Anda bahwa macOS memiliki alat otomasi bawaan yang sangat hebat bernama **Automator**? Dengan menggabungkan utilitas ringan \`unrar\` dari Homebrew dan sebuah Quick Action di Automator, Anda bisa mengekstrak file RAR **hanya dengan 1 klik kanan di Finder** tanpa perlu membuka aplikasi tambahan apa pun!

---

## Prasyarat: Instalasi Utility \`unrar\` via Homebrew

Sebelum membuat skrip otomasi di Automator, kita memerlukan *command-line tool* bernama \`unrar\` untuk melakukan proses dekompresi.

Jika Anda sudah memiliki **Homebrew** terpasang di Mac, buka aplikasi **Terminal** dan jalankan perintah berikut:

\`\`\`bash
brew install unrar
\`\`\`

> **Catatan Lokasi Path Binary:**
> - Pada Mac dengan **Apple Silicon (M1/M2/M3/M4)**, binary \`unrar\` berada di: \`/opt/homebrew/bin/unrar\`
> - Pada Mac berbasis **Intel**, binary \`unrar\` biasanya berlokasi di: \`/usr/local/bin/unrar\`

Untuk memastikan lokasi path di Mac Anda, ketikkan perintah berikut di Terminal:

\`\`\`bash
which unrar
\`\`\`

---

## Langkah demi Langkah Membuat Quick Action di Automator

Mari kita mulai membuat otomasi Finder dengan langkah-langkah mudah berikut:

### 1. Buka Aplikasi Automator
Tekan shortcut keyboard \`Cmd + Space\` untuk membuka Spotlight Search, ketik **Automator**, lalu tekan \`Enter\`.

### 2. Buat Dokumen Baru
- Saat jendela pemilihan dokumen muncul, klik tombol **New Document** (Dokumen Baru).
- Pilih jenis dokumen **Quick Action** (Tindakan Cepat) yang memiliki ikon gir biru, kemudian klik **Choose**.

### 3. Konfigurasi Input Workflow
Di bagian atas lembar kerja Automator, atur konfigurasi input sebagai berikut:
- **Workflow receives current**: pilih \`files or folders\` (file atau folder).
- **in**: pilih \`Finder.app\`.
- *(Opsional)* Anda dapat memilih gambar atau ikon dokumen agar tampilan menu lebih menarik.

### 4. Tambahkan Aksi "Run Shell Script"
1. Pada bilah pencarian panel kiri (Actions Library), ketik \`Run Shell Script\`.
2. Tarik (*drag and drop*) aksi **Run Shell Script** ke panel alur kerja di sebelah kanan.
3. Atur pengaturannya:
   - **Shell**: \`/bin/zsh\` (atau \`/bin/bash\`)
   - **Pass input**: Ubah dari \`to stdin\` menjadi **as arguments** (*PENTING: Jangan sampai terlewat, agar skrip dapat membaca parameter file yang dikirimkan oleh Finder*).

### 5. Masukkan Skrip Shell Ekstraksi
Hapus kode default yang ada di dalam kotak Run Shell Script, lalu masukkan skrip berikut:

\`\`\`bash
for f in "$@"
do
cd "$(dirname "$f")"
/opt/homebrew/bin/unrar x -o+ "$f"
done
\`\`\`

> **Untuk Pengguna Mac Intel:**
> Jika Mac Anda masih menggunakan prosesor Intel, cukup sesuaikan path \`/opt/homebrew/bin/unrar\` menjadi \`/usr/local/bin/unrar\`.

---

## Bedah Skrip: Bagaimana Cara Kerjanya?

Mari kita pelajari apa yang sebenarnya dilakukan oleh baris-baris kode di atas:

- \`for f in "$@"\`: Variabel \`"$@"\` menampung seluruh daftar file yang sedang Anda pilih/klik di Finder. Loop ini memastikan Anda bisa menyeleksi banyak file RAR sekaligus dan mengekstrak semuanya sekaligus secara bergantian.
- \`cd "$(dirname "$f")"\`: Mengambil path direktori tempat file RAR tersebut berada dan berpindah direktori (\`cd\`) ke sana. Hal ini memastikan hasil ekstraksi otomatis tersimpan rapi berdampingan di folder yang sama dengan file aslinya.
- \`/opt/homebrew/bin/unrar\`: Menjalankan binary unrar yang sudah terpasang via Homebrew menggunakan absolute path agar Automator dapat mengeksekusinya tanpa masalah environment \`$PATH\`.
- \`x\`: Parameter penting untuk mengekstrak file dengan **mempertahankan struktur folder/subdirektori aslinya** (jangan gunakan flag \`e\` karena opsi tersebut akan mengekstrak semua file secara datar/berceceran tanpa folder).
- \`-o+\`: Otomatis menimpa (*overwrite*) jika ada file dengan nama sama tanpa memunculkan dialog konfirmasi interaktif di terminal latar belakang (yang bisa menyebabkan Finder freeze atau menggantung).
- \`"$f"\`: Path lengkap ke file RAR yang diapit tanda petik ganda agar aman saat menangani nama file atau folder yang mengandung spasi.

---

## (Opsional) Tambahkan Notifikasi Selesai

Agar Anda mengetahui saat proses ekstraksi telah selesai, Anda bisa menambahkan notifikasi visual macOS:

1. Di panel Actions sebelah kiri, cari aksi **Display Notification** (Tampilkan Pemberitahuan).
2. Seret aksi tersebut tepat di bawah kotak *Run Shell Script*.
3. Atur pesannya:
   - **Title**: \`Ekstraksi RAR Selesai\`
   - **Message**: \`File RAR berhasil diekstrak!\`

---

## 6. Simpan Quick Action

1. Tekan shortcut \`Cmd + S\` untuk menyimpan workflow.
2. Beri nama workflow ini, misalnya **Extract RAR** atau **Ekstrak RAR**.
3. Klik **Save**. Quick Action ini akan langsung aktif dan tersimpan di folder layanan sistem macOS (\`~/Library/Services/\`).

---

## Cara Menggunakannya di Finder

Sekarang otomasi Anda sudah siap digunakan kapan saja:

1. Buka **Finder** dan cari file berekstensi \`.rar\`.
2. **Klik kanan** pada file RAR tersebut (atau pilih beberapa file sekaligus).
3. Pilih menu **Quick Actions** (Tindakan Cepat) > **Extract RAR**.
4. Dalam beberapa detik, isi file RAR Anda akan otomatis diekstrak di folder yang sama!

---

## Tips Tambahan & Pemecahan Masalah

### Di mana file Quick Action ini tersimpan jika ingin diedit atau dihapus?
Jika Anda ingin memperbarui skrip atau menghapus Quick Action ini di masa depan:
1. Buka **Finder**, tekan tombol \`Cmd + Shift + G\`.
2. Ketikkan path: \`~/Library/Services/\` lalu tekan \`Enter\`.
3. Anda akan menemukan file \`Extract RAR.workflow\`. Klik dua kali untuk membukanya kembali di Automator, atau klik kanan lalu *Move to Trash* untuk menghapusnya.

### Menambahkan Keyboard Shortcut (Opsional)
Ingin lebih cepat lagi tanpa klik kanan? Anda bisa membuat pintasan keyboard sendiri:
1. Buka **System Settings** > **Keyboard** > **Keyboard Shortcuts**.
2. Pilih menu **Services** di sebelah kiri, lalu buka bagian **Files and Folders**.
3. Cari **Extract RAR**, centang kotaknya, lalu klik dua kali untuk menambahkan tombol kombinasi (misalnya \`Option + Cmd + E\`).

---

## Kesimpulan

Dengan memanfaatkan fitur bawaan macOS Automator dan utilitas \`unrar\`, kita tidak perlu lagi bergantung pada aplikasi pihak ketiga yang lambat atau dipenuhi iklan. Alur kerja menjadi jauh lebih cepat, rapi, dan sepenuhnya terintegrasi dengan ekosistem native macOS Finder.`,
  },
  {
    id: "post-5",
    slug: "cara-kompres-pdf-di-mac-menggunakan-automator",
    title: "Cara Kompres PDF di Mac Menggunakan Automator & Ghostscript (1x Klik)",
    excerpt: "Panduan praktis mengecilkan ukuran file PDF di macOS secara instan menggunakan Quick Action Automator dan Ghostscript langsung dari menu klik kanan Finder tanpa perlu upload ke situs online.",
    category: "tutorial",
    tags: ["macOS", "Automator", "Ghostscript", "PDF", "Tutorial", "Apple Silicon", "Productivity"],
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Tutorial Otomasi macOS: Kompresi File PDF Langsung dari Menu Klik Kanan Finder",
    featured: false,
    published: true,
    publishedAt: "2026-09-21T15:30:00.000Z",
    updatedAt: "2026-09-21T15:30:00.000Z",
    readTime: 5,
    views: 110,
    likes: 19,
    author: DEFAULT_AUTHOR,
    content: `## Mengapa Kompresi PDF Lokal Lebih Baik Dibanding Situs Online?

Hampir setiap pengguna komputer pernah mengalami situasi di mana file PDF yang ingin dikirimkan ditolak oleh sistem karena ukurannya terlalu besar. Entah itu saat mengirim lampiran lewat email (yang umumnya dibatasi 25 MB), mendaftar beasiswa, atau mengunggah berkas administrasi lamaran kerja.

Banyak orang mengambil jalan pintas dengan mengunggah dokumen tersebut ke situs web kompresi PDF online gratisan. Namun, metode ini memiliki risiko privasi yang serius:
1. **Risiko Keamanan Data Pribadi**: Dokumen penting seperti KTP, ijazah, rekening koran, atau kontrak rahasia diunggah ke server pihak ketiga yang keamanannya tidak bisa kita jamin sepenuhnya.
2. **Ketergantungan Kuota & Kecepatan Internet**: Harus menunggu proses *upload* dan *download* yang memakan waktu, terutama jika ukuran file mencapai puluhan megabyte.
3. **Batasan Gratis yang Menjengkelkan**: Sebagian besar situs web membatasi jumlah dokumen per jam atau mengharuskan langganan berbayar.

Kabar baiknya, di macOS kita dapat mengecilkan ukuran file PDF **secara instan, 100% offline, tanpa batas ukuran, dan hanya dengan 1 klik kanan di Finder** menggunakan kombinasi **Automator** dan utilitas *open-source* populer **Ghostscript**!

---

## Prasyarat: Instalasi Ghostscript via Homebrew

**Ghostscript** adalah mesin pemroses dokumen PostScript dan PDF berkualitas industri yang sangat handal dalam melakukan kompresi dan optimasi file PDF.

Untuk memasangnya di Mac Anda:
1. Buka aplikasi **Terminal** (\`Cmd + Space\` > ketik \`Terminal\`).
2. Jalankan perintah instalasi melalui Homebrew berikut:

\`\`\`bash
brew install ghostscript
\`\`\`

> **Catatan Lokasi Binary:**
> - Pada Mac dengan **Apple Silicon (M1/M2/M3/M4)**, binary Ghostscript terpasang di: \`/opt/homebrew/bin/gs\`
> - Pada Mac berbasis **Intel**, lokasinya berada di: \`/usr/local/bin/gs\`

Untuk memverifikasi lokasi dan memastikan instalasi berhasil, ketik perintah berikut di Terminal:

\`\`\`bash
which gs
\`\`\`

---

## Langkah demi Langkah Membuat Quick Action di Automator

Ikuti langkah-langkah mudah di bawah ini untuk membuat alur kerja otomatis di Finder:

### 1. Buka Aplikasi Automator
Buka Spotlight Search dengan menekan kombinasi tombol \`Cmd + Space\`, ketik **Automator**, lalu tekan \`Enter\`.

### 2. Buat Dokumen Baru
- Klik tombol **New Document** di sudut kiri bawah jendela pemilihan.
- Pilih jenis dokumen **Quick Action** (Tindakan Cepat) yang memiliki ikon roda gigi biru, lalu klik **Choose**.

### 3. Konfigurasi Input Alur Kerja
Pada panel pengaturan di bagian atas jendela alur kerja, sesuaikan opsi berikut:
- **Workflow receives current**: pilih \`PDF files\` (atau pilih \`files or folders\` jika ingin lebih fleksibel).
- **in**: pilih \`Finder.app\`.
- *(Opsional)* Pilih ikon dokumen pada kolom **Image** agar tampilan menu klik kanan semakin cantik.

### 4. Tambahkan Aksi "Run Shell Script"
1. Pada bilah pencarian panel sebelah kiri (Actions Library), cari aksi bernama \`Run Shell Script\`.
2. Tarik (*drag & drop*) aksi tersebut ke lembar kerja di sebelah kanan.
3. Atur parameternya:
   - **Shell**: \`/bin/zsh\` (atau \`/bin/bash\`)
   - **Pass input**: Ubah opsi dari \`to stdin\` menjadi **as arguments** (*PENTING: Langkah ini wajib dilakukan agar skrip menerima daftar file yang Anda klik di Finder*).

### 5. Masukkan Skrip Kompresi Ghostscript
Hapus kode bawaan yang ada di dalam kotak Run Shell Script, kemudian masukkan skrip berikut:

\`\`\`bash
for f in "$@"
do
    /opt/homebrew/bin/gs \
    -sDEVICE=pdfwrite \
    -dCompatibilityLevel=1.4 \
    -dPDFSETTINGS=/ebook \
    -dNOPAUSE -dQUIET -dBATCH \
    -sOutputFile="\${f%.pdf}-compressed.pdf" \
    "$f"
done
\`\`\`

> **Bagi Pengguna Mac Intel:**
> Jika Anda menggunakan Mac berprosesor Intel, ganti path \`/opt/homebrew/bin/gs\` menjadi \`/usr/local/bin/gs\`.

---

## Bedah Perintah Skrip: Memahami Opsi Ghostscript

Mari kita pelajari fungsi dari masing-masing parameter yang digunakan dalam skrip di atas:

- \`for f in "$@"\`: Melakukan perulangan untuk setiap file PDF yang Anda pilih di Finder. Anda bisa memilih 5 atau 10 file PDF sekaligus, dan semuanya akan diproses satu per satu secara otomatis.
- \`/opt/homebrew/bin/gs\`: Menjalankan binary Ghostscript menggunakan *absolute path* agar Automator dapat mengaksesnya secara langsung tanpa kendala *environment variable* \`$PATH\`.
- \`-sDEVICE=pdfwrite\`: Menentukan driver output yang digunakan, yaitu driver pembuat file PDF standar.
- \`-dCompatibilityLevel=1.4\`: Mengatur format output PDF ke versi 1.4 (Acrobat 5.x) yang memiliki kompatibilitas sangat luas di seluruh browser, perangkat seluler, dan sistem pembaca PDF modern.
- \`-dPDFSETTINGS=/ebook\`: Mengatur profil kompresi kualitas menengah (*medium quality*, resolusi ~150 dpi). Opsi ini merupakan *sweet spot* terbaik karena mampu memangkas ukuran file hingga 50-80% namun teks dan gambar dokumen tetap jernih dan nyaman dibaca.
- \`-dNOPAUSE -dQUIET -dBATCH\`: Memerintahkan Ghostscript untuk memproses dokumen di latar belakang tanpa meminta interaksi pengguna, menyembunyikan pesan log yang tidak perlu, dan otomatis keluar setelah proses kompresi selesai.
- \`-sOutputFile="\${f%.pdf}-compressed.pdf"\`: Memotong ekstensi \`.pdf\` asli dan menambahkan akhiran \`-compressed.pdf\`. Dengan cara ini, **file PDF asli Anda tetap aman dan tidak akan tertimpa**.
- \`"$f"\`: Variabel yang berisi path lengkap file PDF asli yang sedang diproses.

---

## Tingkat Kompresi Alternatif (Kustomisasi Sesuai Kebutuhan)

Jika Anda ingin hasil kompresi yang lebih ekstrem atau justru ingin mempertahankan resolusi lebih tinggi, Anda bisa mengganti nilai \`-dPDFSETTINGS\` sesuai tabel berikut:

| Nilai Pengaturan | Resolusi | Karakteristik Penggunaan |
| :--- | :--- | :--- |
| \`/screen\` | 72 dpi | Ukuran file paling kecil, cocok untuk sekadar pratinjau di layar |
| \`/ebook\` | 150 dpi | **Rekomendasi Utama**: Sangat seimbang untuk email, web, dan dokumen resmi |
| \`/printer\` | 300 dpi | Kualitas tinggi, cocok jika dokumen nantinya akan dicetak fisik |
| \`/prepress\` | 300 dpi (color preserved) | Kualitas maksimal untuk kebutuhan percetakan profesional |

---

## (Opsional) Tambahkan Notifikasi Selesai

Agar Anda mengetahui kapan proses kompresi selesai:
1. Di panel Actions sebelah kiri, cari aksi **Display Notification** (Tampilkan Pemberitahuan).
2. Seret aksi tersebut tepat di bawah kotak *Run Shell Script*.
3. Atur pesannya:
   - **Title**: \`Kompresi PDF Selesai\`
   - **Message**: \`File PDF berhasil dikompresi dengan nama [nama-file]-compressed.pdf!\`

---

## 6. Simpan Quick Action

1. Tekan pintasan keyboard \`Cmd + S\`.
2. Beri nama workflow ini, misalnya **Compress PDF** atau **Kompres PDF**.
3. Klik **Save**. Quick Action ini akan langsung tersimpan di direktori sistem macOS (\`~/Library/Services/\`) dan siap digunakan seketika.

---

## Cara Menggunakannya di Finder

Sekarang Anda dapat mengompres dokumen PDF kapan saja:

1. Buka **Finder** dan arahkan ke file PDF yang ingin Anda kompres.
2. **Klik kanan** pada file tersebut (atau seleksi beberapa file PDF sekaligus).
3. Arahkan kursor ke menu **Quick Actions** (Tindakan Cepat) > klik **Compress PDF**.
4. Dalam hitungan detik, file baru bernama \`namafile-compressed.pdf\` akan muncul tepat di folder yang sama dengan ukuran yang jauh lebih ringan!

---

## Tips Tambahan

### Mengedit atau Menghapus Quick Action
Jika Anda ingin mengubah setting resolusi di kemudian hari atau menghapus alur kerja ini:
1. Di Finder, tekan kombinasi \`Cmd + Shift + G\`.
2. Ketik \`~/Library/Services/\` dan tekan \`Enter\`.
3. Klik ganda file \`Compress PDF.workflow\` untuk mengeditnya di Automator, atau hapus file tersebut jika sudah tidak digunakan.

### Menambahkan Pintasan Keyboard (Shortcut)
Anda bahkan dapat menetapkan kombinasi keyboard untuk menjalankan kompresi:
1. Masuk ke **System Settings** > **Keyboard** > **Keyboard Shortcuts**.
2. Pilih menu **Services** > buka bagian **Files and Folders**.
3. Centang opsi **Compress PDF**, lalu tambahkan shortcut favorit Anda (misalnya \`Option + Cmd + P\`).

---

## Kesimpulan

Dengan memanfaatkan Ghostscript dan Automator di macOS, kita memiliki solusi kompresi dokumen yang jauh lebih cepat, tanpa batas ukuran, dan yang terpenting **100% aman bagi privasi dokumen sensitif Anda**. Selamat mencoba otomasi ini di Mac Anda!`,
  },
];
