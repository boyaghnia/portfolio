"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export function GoogleAdSense() {
  const pathname = usePathname();

  // Pengecualian: jangan muat skrip iklan di halaman utama (boyaghnia.web.id)
  // Iklan hanya diizinkan di subhalaman (boyaghnia.web.id/* seperti /blog, /blog/[slug], dll.)
  if (pathname === "/") {
    return null;
  }

  return (
    <Script
      id="google-adsense-script"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8425634623967324"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
