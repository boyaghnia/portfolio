export type ProjectCategory = "all" | "web" | "ui" | "network" | "script";

export interface Project {
  id: string;
  title: string;
  category: "web" | "ui" | "network" | "script";
  categoryLabel: string;
  role: string;
  highlightTag?: string;
  featured?: boolean;
  desc: string;
  longDesc?: string;
  highlights: string[];
  tech: string[];
  image: string;
  link: string;
  linkType?: "web" | "youtube" | "internal" | "none";
  github?: string;
}

export interface CategoryOption {
  id: ProjectCategory;
  label: string;
}

export const CATEGORIES_DATA: CategoryOption[] = [
  { id: "all", label: "Semua Proyek" },
  { id: "web", label: "Web & Sistem" },
  { id: "ui", label: "Design System & UI" },
  { id: "network", label: "Infrastruktur & Jaringan" },
  { id: "script", label: "Scripting & Otomasi" },
];

export const PROJECTS: Project[] = [
  {
    id: "hubud-web",
    title: "Website Direktorat Jenderal Perhubungan Udara",
    category: "web",
    categoryLabel: "Web & Sistem",
    role: "Front-End Developer & UI/UX",
    highlightTag: "Portal Resmi Pemerintah",
    featured: true, // Only this item is large on top-left
    desc: "Migrasi, pengembangan dan pembangunan ulang website resmi Direktorat Jenderal Perhubungan Udara ke framework Laravel, disertai redesign UI/UX, pengembangan fitur, optimasi performa, dan penyempurnaan struktur informasi.",
    longDesc:
      "Website resmi Direktorat Jenderal Perhubungan Udara Kementerian Perhubungan RI merupakan portal sentral pelayanan dan informasi penerbangan nasional. Dilakukan pembaruan menyeluruh mulai dari modernisasi arsitektur ke Laravel, desain antarmuka yang ramah pengguna, optimasi kecepatan, hingga perapihan arsitektur informasi untuk jutaan masyarakat dan stakeholder penerbangan.",
    highlights: [
      "Migrasi & rekayasa ulang sistem ke framework Laravel 12",
      "Redesign UI/UX responsif dengan standarisasi antarmuka DJPU",
      "Optimasi performa, caching, dan SEO untuk jutaan pengunjung",
      "Penyempurnaan sitemap dan struktur layanan informasi publik",
    ],
    tech: ["Laravel", "PHP", "Alpine.js", "Tailwind CSS"],
    image: "/images/projects/hubud-web.jpg",
    link: "https://hubud.kemenhub.go.id",
    linkType: "web",
  },
  {
    id: "aviasihub-ui",
    title: "Aviasihub UI Components",
    category: "ui",
    categoryLabel: "Design System & UI",
    role: "Lead UI/UX Designer & Creator",
    highlightTag: "Standarisasi Tampilan",
    featured: false,
    desc: "UI component library dan pedoman standar tata letak visual resmi yang diwajibkan untuk seluruh pengembangan web dan aplikasi di lingkungan Ditjen Perhubungan Udara.",
    longDesc:
      "Aviasihub.site diciptakan sebagai Single Source of Truth bagi standarisasi visual sistem digital DJPU. Platform ini menyediakan puluhan komponen UI siap pakai, token warna, tipografi, dan panduan layout yang kompatibel lintas framework, menjamin efisiensi tim developer dan keseragaman identitas visual institusi.",
    highlights: [
      "Penyusunan Design System resmi untuk lingkungan Ditjen Hubud",
      "Koleksi puluhan komponen antarmuka siap pakai yang aksesibel",
      "Dukungan fleksibel untuk Laravel, Alpine.js, Tailwind, Bootstrap & Vanilla CSS",
      "Standarisasi tampilan web untuk seluruh unit kerja Ditjen Perhubungan Udara",
    ],
    tech: [
      "Laravel",
      "PHP",
      "Alpine.js",
      "Tailwind CSS",
      "Bootstrap",
      "Vanilla CSS",
    ],
    image: "/images/projects/aviasihub.png",
    link: "https://aviasihub.site",
    linkType: "web",
  },
  {
    id: "e-sop",
    title: "e-SOP (Electronic SOP) DJPU",
    category: "web",
    categoryLabel: "Web & Sistem",
    role: "Full Stack Developer",
    highlightTag: "Sistem Manajemen Internal",
    featured: false,
    desc: "Aplikasi internal terpusat untuk menggantikan penyusunan dan pengelolaan SOP konvensional, menjamin keseragaman format, metadata, pengawasan, dan pengesahan dokumen.",
    longDesc:
      "Aplikasi E-SOP dikembangkan sebagai sistem informasi internal berbasis web untuk menggantikan proses penyusunan dan pengelolaan SOP yang sebelumnya dilakukan secara manual dan parsial menggunakan aplikasi perkantoran. Sistem menyediakan mekanisme terpusat untuk menjamin keseragaman format, metadata, struktur dokumen, pengawasan berjenjang, dan ketersediaan dokumen final yang telah disahkan.",
    highlights: [
      "Digitalisasi menyeluruh dari siklus draft hingga pengesahan SOP",
      "Implementasi arsitektur SPA modern berbasis Inertia.js + React",
      "Standarisasi metadata dan kontrol versi dokumen SOP antar unit kerja",
      "Dashboard monitoring progres pengesahan dan analitik berkas",
    ],
    tech: [
      "Laravel",
      "Inertia",
      "React",
      "PHP",
      "TypeScript",
      "Alpine.js",
      "Tailwind CSS",
    ],
    image: "/images/projects/e-sop.jpg",
    link: "#",
    linkType: "none",
    github: "private",
  },
  {
    id: "sikembang",
    title: "SiKembang DJPU",
    category: "web",
    categoryLabel: "Web & Sistem",
    role: "Web Developer",
    highlightTag: "Sistem Kepegawaian",
    featured: false,
    desc: "Sistem Informasi Pengembangan Kompetensi Pegawai untuk memfasilitasi pengajuan dan verifikasi RPKP, Perjanjian Belajar, dan STB secara cepat, efisien, dan transparan.",
    longDesc:
      "SIKEMBANG adalah aplikasi berbasis web yang dirancang untuk mendigitalisasi proses manajemen pengembangan kompetensi pegawai di lingkungan Kementerian Perhubungan. Aplikasi ini mengotomasi alur pengajuan dan verifikasi RPKP, Perjanjian Belajar, serta penerbitan Surat Tugas Belajar (STB) beserta ekspor dokumen resmi otomatis.",
    highlights: [
      "Otomasi workflow pengajuan RPKP & Perjanjian Belajar",
      "Integrasi generator PDF dinamis untuk pencetakan SK & STB resmi",
      "Pengelolaan database terstruktur berbasis PostgreSQL",
      "Validasi berjenjang oleh tim kepegawaian & pimpinan",
    ],
    tech: [
      "Laravel",
      "PHP",
      "Tailwind",
      "PostgreSQL",
      "Alpine.js",
      "Dompdf",
      "Maatwebsite",
    ],
    image: "/images/projects/sikembang.jpg",
    link: "https://youtu.be/fF9ZimZH2MA",
    linkType: "youtube",
  },
  {
    id: "jaringan-bade",
    title: "Infrastruktur Jaringan Bandara Bade",
    category: "network",
    categoryLabel: "Infrastruktur & Jaringan",
    role: "Network Administrator",
    highlightTag: "Infrastruktur Jaringan",
    featured: false,
    desc: "Instalasi, manajemen bandwidth, perbaikan infrastruktur, serta monitoring pemeliharaan konektivitas jaringan internet di Kantor UPBU Kelas III Bandar Udara Bade.",
    longDesc:
      "Bertanggung jawab dalam instalasi, troubleshooting, konfigurasi routing MikroTik, manajemen alokasi bandwidth, dan pemeliharaan perangkat keras jaringan demi memastikan kelancaran konektivitas operasional penerbangan dan pelayanan publik di Bandar Udara Bade, Papua.",
    highlights: [
      "Konfigurasi router MikroTik, Firewall, DNS Server, & QoS",
      "Manajemen alokasi bandwidth untuk operasional & publik",
      "Troubleshooting perangkat keras & infrastruktur kabel/nirkabel",
      "Menjamin uptime konektivitas internet operasional bandara",
    ],
    tech: ["MikroTik", "Bandwidth Management", "DNS Server", "WinBox", "QoS"],
    image: "/images/projects/jaringan-bade.jpeg",
    link: "/project-bade",
    linkType: "internal",
  },
  {
    id: "pockie-ninja",
    title: "Game Automation Engine",
    category: "script",
    categoryLabel: "Scripting & Otomasi",
    role: "Script Developer",
    highlightTag: "DOM Automation",
    featured: false,
    desc: "Custom browser script untuk otomasi gameplay online berbasis Tampermonkey, memanfaatkan DOM Mutation Observers untuk meningkatkan efisiensi pengguna secara realtime.",
    longDesc:
      "Mengembangkan skrip otomasi browser canggih menggunakan Tampermonkey dan Vanilla JavaScript murni. Skrip mengamati mutasi DOM secara realtime untuk mengeksekusi tugas-tugas repetitif secara otomatis.",
    highlights: [
      "Otomasi aksi repetitif in-game secara asynchronous",
      "Pemanfaatan MutationObserver API untuk deteksi state DOM",
      "Optimasi performa eksekusi skrip di sisi browser client",
      "Antarmuka kontrol mini terintegrasi langsung pada game view",
    ],
    tech: [
      "Tampermonkey",
      "JavaScript",
      "DOM Manipulation",
      "Mutation Observers",
    ],
    image: "/images/projects/pockie-ninja.jpg",
    link: "https://www.youtube.com/watch?v=2Iorid9Y7rY&list=PLKVk0YkfbJgAa7w5efLeekQDFIgMerlfq",
    linkType: "youtube",
    github: "private",
  },
  {
    id: "amparan-djati",
    title: "Amparan Djati",
    category: "web",
    categoryLabel: "WordPress",
    role: "WordPress Developer",
    highlightTag: "Sundanese Culture",
    featured: false,
    desc: "Platform digital yang mendokumentasikan dan memperkenalkan seni, musik, dan budaya Sunda melalui artikel, arsip musik, serta koleksi tembang tradisional.",
    longDesc:
      "Website berbasis WordPress yang dikembangkan sebagai wadah dokumentasi dan arsip digital seni serta budaya Sunda. Amparan Djati memuat berbagai konten mengenai Tembang Sunda Cianjuran, Kacapi Suling, Karinding, Suling Sunda, Tarawangsa, Jentreng, rumpaka, hingga koleksi album musik tradisional. Situs ini juga menyediakan halaman dan referensi unduhan untuk berbagai koleksi musik Sunda, sekaligus menjadi media untuk mengenalkan dan melestarikan kekayaan seni tradisional Jawa Barat melalui platform digital.",
    highlights: [
      "Dokumentasi dan arsip digital seni budaya Sunda",
      "Koleksi Tembang Sunda, Kacapi Suling, Karinding, dan musik tradisional",
      "Informasi dan dokumentasi alat musik Tarawangsa & Jentreng",
      "Katalog serta koleksi album musik Sunda",
    ],
    tech: ["WordPress", "Jetpack", "Content Management System"],
    image: "/images/projects/amparandjati.jpg",
    link: "https://amparandjati.wordpress.com",
    linkType: "web",
  },
  {
    id: "3d-modelling",
    title: "3D Modelling",
    category: "ui",
    categoryLabel: "3D Model",
    role: "3D Artist",
    highlightTag: "3D Model",
    featured: false,
    desc: "Project 3D Model alat musik sunda untuk melestarikan budaya sekaligus sebagai bahan pembelajaran diri sendiri. Banyak project yang terbengkalai dikarenakan banyaknya kesibukan pada kegiatan kegiatan lain.",
    longDesc:
      "Mengingat kurangnya asset alat musik sunda dalam bentuk 3D Model, mulai dari Tahun 2019 saya membuat 3D Model alat musik sunda untuk melestarikan budaya sekaligus sebagai bahan pembelajaran diri sendiri, selain itu terkadang saya mencoba membuat model lain. Dikarenakan banyaknya kesibukan pada kegiatan kegiatan lain maka project tersebut banyak yang terbengkalai sehingga progressnya tidak terlalu signifikan.",
    highlights: [
      "Mengabadikan Seni Budaya Sunda Melalui Dunia Digital",
      "Dokumentasi alat musik tradisional Sunda dalam bentuk 3D Model",
      "Proyek yang berkelanjutan untuk melestarikan warisan budaya Sunda",
      "Menggabungkan teknologi digital dengan seni tradisional Sunda",
    ],
    tech: ["Blender 3D"],
    image: "/images/projects/tekocendol.png",
    link: "/project-3d-model",
    linkType: "internal",
  },
];
