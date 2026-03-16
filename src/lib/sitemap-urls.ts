import { BASE_URL } from "@/lib/site";
import { getAllMerkeSlugs, modellSiderMedInnhold } from "@/data/biler";
import { byer } from "@/data/byer";
import { getAllBorgWarnerSlugs } from "@/data/borgwarner-turbo";
import { getAllGarrettSlugs } from "@/data/garrett-turbo";
import { getAllHolsethSlugs } from "@/data/holseth-turbo";
import { getAllSchwitzerSlugs } from "@/data/schwitzer-turbo";
import { getAllIhiSlugs } from "@/data/ihi-turbo";
import { getAllMitsubishiSlugs } from "@/data/mitsubishi-turbo";
import { getAllAndreSlugs } from "@/data/andre-turbo";

export type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

const now = new Date().toISOString();

export function getAllSitemapEntries(): SitemapEntry[] {
  const base = BASE_URL;
  const urls: SitemapEntry[] = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/turbo`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/turboer`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/om-oss`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/turboer/borgwarner`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/turboer/garrett`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/turboer/holseth`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/turboer/schwitzer`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/turboer/ihi`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/turboer/mitsubishi`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/turboer/andre-turboer`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  for (const slug of getAllBorgWarnerSlugs()) {
    urls.push({ url: `${base}/turboer/borgwarner/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const slug of getAllGarrettSlugs()) {
    urls.push({ url: `${base}/turboer/garrett/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const slug of getAllHolsethSlugs()) {
    urls.push({ url: `${base}/turboer/holseth/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const slug of getAllSchwitzerSlugs()) {
    urls.push({ url: `${base}/turboer/schwitzer/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const slug of getAllIhiSlugs()) {
    urls.push({ url: `${base}/turboer/ihi/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const slug of getAllMitsubishiSlugs()) {
    urls.push({ url: `${base}/turboer/mitsubishi/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const slug of getAllAndreSlugs()) {
    urls.push({ url: `${base}/turboer/andre-turboer/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }

  for (const merke of getAllMerkeSlugs()) {
    urls.push({ url: `${base}/turbo/${merke}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
    const modeller = modellSiderMedInnhold[merke];
    if (modeller) {
      for (const modell of modeller) {
        urls.push({ url: `${base}/turbo/${merke}/${modell}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
        for (const by of byer) {
          urls.push({
            url: `${base}/turbo/${merke}/${modell}/${by.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
    }
  }

  return urls;
}

const SITEMAP_PAGE_SIZE = 9000;

export function getSitemapChunks(): SitemapEntry[][] {
  const all = getAllSitemapEntries();
  const chunks: SitemapEntry[][] = [];
  for (let i = 0; i < all.length; i += SITEMAP_PAGE_SIZE) {
    chunks.push(all.slice(i, i + SITEMAP_PAGE_SIZE));
  }
  return chunks;
}

export function getSitemapChunk(index: number): SitemapEntry[] | null {
  const chunks = getSitemapChunks();
  if (index < 0 || index >= chunks.length) return null;
  return chunks[index];
}
