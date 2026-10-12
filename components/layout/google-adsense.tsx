import Script from "next/script";

export function GoogleAdSense() {
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

