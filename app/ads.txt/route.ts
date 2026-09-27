import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const content = "google.com, pub-8425634623967324, DIRECT, f08c47fec0942fa0\n";
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
