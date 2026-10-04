import type { Metadata } from "next";
import { Geist, Geist_Mono, Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ContentProtection } from "@/components/layout/content-protection";
import { GoogleAdSense } from "@/components/layout/google-adsense";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://boyaghnia.web.id"),
  ),
  title: "Portfolio | Boy Aghnia Rifadhan",
  description: "Portfolio | Boy Aghnia Rifadhan",
  icons: {
    icon: "/images/misc/logo-small.png",
  },
  verification: {
    google: "G3MH8BIuOaYQIUIoJ3lE0-LePn5kzpqSZSwyvA2hh-A",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "scroll-smooth",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        baiJamjuree.variable,
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <noscript>
          <style>{`
            .no-js-screen {
              position: fixed !important;
              inset: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              background: #09090b !important;
              z-index: 2147483647 !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
              text-align: center !important;
              padding: 24px !important;
              box-sizing: border-box !important;
              color: #ffffff !important;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            }
            .no-js-meme-box {
              position: relative !important;
              width: min(80vw, 320px) !important;
              height: min(80vw, 320px) !important;
              margin-bottom: 20px !important;
              border-radius: 6px !important;
              overflow: hidden !important;
              border: 2px solid rgba(245, 158, 11, 0.7) !important;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.9) !important;
              background: #000000 !important;
            }
            .no-js-meme-img {
              position: absolute !important;
              inset: 0 !important;
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
            }
            .no-js-meme-1 {
              animation: memeLoop1 2s infinite ease-in-out !important;
            }
            .no-js-meme-2 {
              animation: memeLoop2 2s infinite ease-in-out !important;
            }
            @keyframes memeLoop1 {
              0%, 45% { opacity: 1; visibility: visible; }
              50%, 95% { opacity: 0; visibility: hidden; }
              100% { opacity: 1; visibility: visible; }
            }
            @keyframes memeLoop2 {
              0%, 45% { opacity: 0; visibility: hidden; }
              50%, 95% { opacity: 1; visibility: visible; }
              100% { opacity: 0; visibility: hidden; }
            }
          `}</style>
          <div className="no-js-screen">
            <div className="no-js-meme-box">
              <img
                src="/images/misc/ngahahaha.jpg"
                className="no-js-meme-img no-js-meme-1"
                alt="NGAHAHAHA JPG"
              />
              <img
                src="/images/misc/ngahahaha.webp"
                className="no-js-meme-img no-js-meme-2"
                alt="NGAHAHAHA WEBP"
              />
            </div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "900",
                color: "#f59e0b",
                margin: "0 0 8px 0",
                letterSpacing: "1px",
                fontFamily: "monospace",
              }}
            >
              NGAHAHAHA! 😈
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#a1a1aa",
                maxWidth: "420px",
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              Ngapain matiin JavaScript bro? Website ini butuh JavaScript aktif
              biar bisa berfungsi dengan normal. Aktifkan dulu ya!
            </p>
          </div>
        </noscript>
        <GoogleAdSense />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ContentProtection />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
