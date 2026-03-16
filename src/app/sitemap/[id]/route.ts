import { NextRequest, NextResponse } from "next/server";
import { getSitemapChunk } from "@/lib/sitemap-urls";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function entryToUrlNode(entry: { url: string; lastModified: string; changeFrequency?: string; priority?: number }): string {
  let node = `  <url>\n    <loc>${escapeXml(entry.url)}</loc>\n    <lastmod>${entry.lastModified}</lastmod>`;
  if (entry.changeFrequency) node += `\n    <changefreq>${entry.changeFrequency}</changefreq>`;
  if (entry.priority != null) node += `\n    <priority>${entry.priority}</priority>`;
  node += "\n  </url>";
  return node;
}

export function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const index = parseInt(id, 10);
    if (Number.isNaN(index) || index < 0) {
      return new NextResponse("Invalid sitemap index", { status: 400 });
    }
    const chunk = getSitemapChunk(index);
    if (!chunk) {
      return new NextResponse("Sitemap not found", { status: 404 });
    }
    const xml =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      chunk.map(entryToUrlNode).join("\n") +
      "\n</urlset>";

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  });
}
