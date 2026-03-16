import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/site";
import { getSitemapChunks } from "@/lib/sitemap-urls";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const chunks = getSitemapChunks();
  const now = new Date().toISOString();

  const index =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    chunks
      .map(
        (_, i) =>
          `  <sitemap>\n    <loc>${escapeXml(`${BASE_URL}/sitemap/${i}`)}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`
      )
      .join("\n") +
    "\n</sitemapindex>";

  return new NextResponse(index, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
