export interface BankAccount {
  name: string;
  accountNumber: string;
  accountHolder: string;
}

export interface DonationChannel {
  id: string;
  name: string;
  category: "qris" | "platform" | "bank" | "global";
  badge?: string;
  description: string;
  targetUrl?: string;
  color?: string;
}

export interface DonationFaq {
  question: string;
  answer: string;
}

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    name: "Bank Rakyat Indonesia (BRI)",
    accountNumber: "0104-01-050002-50-7",
    accountHolder: "Boy Aghnia Rifadhan",
  },
  {
    name: "Bank Negara Indonesia (BNI)",
    accountNumber: "1950814262",
    accountHolder: "Boy Aghnia Rifadhan",
  },
];

export const DONATION_PLATFORMS: DonationChannel[] = [
  {
    id: "saweria",
    name: "Saweria",
    category: "platform",
    badge: "E-Wallet & QRIS",
    description:
      "Dukung instan via QRIS, GoPay, OVO, DANA, ShopeePay, dan LinkAja dengan pesan dukungan.",
    targetUrl: "https://saweria.co/boyaghnia",
    color: "#EAB308",
  },
  {
    id: "paypal",
    name: "PayPal",
    category: "global",
    badge: "International Supporter",
    description:
      "Dukungan internasional dalam USD menggunakan saldo PayPal atau kartu kredit/debit.",
    targetUrl: "https://paypal.me/murbawisesa",
    color: "#0070BA",
  },
];

export const DONATION_FAQS: DonationFaq[] = [
  {
    question: "Donasi ini akan digunakan untuk apa saja?",
    answer:
      "Donasi dialokasikan untuk pengembangan fitur website, sewa server / VPS cloud, serta rencana pembelian domain utama berakhiran .com (karena saat ini masih menggunakan domain boyaghnia.web.id).",
  },
  {
    question: "Apakah ada nominal minimal untuk berdonasi?",
    answer:
      "Sama sekali tidak ada batas minimal. Berapa pun nominal yang Anda berikan, kami sangat bersyukur dan mengapresiasi dukungan Anda demi menjaga website ini tetap aktif.",
  },
  {
    question: "Apakah website dan tutorial akan tetap gratis?",
    answer:
      "Ya! Seluruh artikel, source code tutorial, dan showcase interaktif 3D di website ini akan selalu dapat diakses secara gratis oleh siapa saja tanpa paywall.",
  },
  {
    question: "Bagaimana cara konfirmasi setelah berdonasi?",
    answer:
      "Konfirmasi tidak diwajibkan. Namun jika berkenan, Anda sangat dipersilakan meninggalkan sapaan atau pesan hangat di halaman Buku Tamu (Guestbook) agar bisa kami sapa kembali!",
  },
];
