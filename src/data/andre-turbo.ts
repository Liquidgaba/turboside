/**
 * Andre turboer – tverrleverandør-liste (unike serier/delnummer som ikke finnes under én leverandør).
 * Slug: /turboer/andre-turboer/[slug]
 * Filtrerer bort duplikater som allerede finnes hos BorgWarner, Garrett, Holseth, Schwitzer, IHI, Mitsubishi.
 */
import { getAllBorgWarnerSlugs } from "@/data/borgwarner-turbo";
import { getAllGarrettSlugs } from "@/data/garrett-turbo";
import { getAllHolsethSlugs } from "@/data/holseth-turbo";
import { getAllSchwitzerSlugs } from "@/data/schwitzer-turbo";
import { getAllIhiSlugs } from "@/data/ihi-turbo";
import { getAllMitsubishiSlugs } from "@/data/mitsubishi-turbo";

export type AndreTurbo = {
  serie: string;
  delnummer: string;
};

function slugFromTurbo(t: AndreTurbo): string {
  return `${t.serie}-${t.delnummer}`.toLowerCase().replace(/\s+/g, "-");
}

const RAW = `GT1749V,717858-0001
GT1749V,713673-0005
GT1749V,724930-0002
GT1749V,724930-0008
GT1749V,721021-0001
GT1749V,751851-0003
GT1749V,750431-0009
GT1749V,742614-0003
GT1749V,768331-0001
GT1749V,768331-0003

GTB1749VK,787556-0017
GTB1749VK,765312-0002
GTB1749VK,765313-0002

GT2056V,765155-0004
GT2056V,761399-0001
GT2056V,763360-0001
GT2056V,751243-0002
GT2056V,720931-0002

GT2256V,710811-0001
GT2256V,712541-0002
GT2256V,724652-0001

GT2260V,742730-0007
GT2260V,758351-0023

GTB2260VK,776469-0004
GTB2260VK,769909-0009
GTB2260VK,799671-0001

BV43,5303-970-0139
BV43,5303-988-0057
BV39,5439-970-0027
BV38,5438-970-0026

K03,5303-970-0052
K04,5304-970-0020

RHF5,06K145722A
RHF5,06K145722T
RHF5,06K145874G
RHF5,9VA19

RHF4,VE420051
RHF4,VF420014

TD04L,49135-05620
TD04L,49135-05710
TD04HL,49377-04200
TD04HL,49377-04202

TD03,49131-06007
TD03,49131-05006

CT16,17201-0L040
CT20,17201-54030
CT26,17201-17010

HX35,3536473
HX35W,4040353
HX30,3537010`;

const rawTurbos: AndreTurbo[] = RAW.split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [serie = "", delnummer = ""] = line.split(",").map((s) => s.trim());
    return { serie, delnummer };
  })
  .filter((t) => t.serie && t.delnummer);

/** Slug-set fra alle andre leverandører (unngå duplikater). */
function getExistingSlugs(): Set<string> {
  const set = new Set<string>();
  for (const s of getAllBorgWarnerSlugs()) set.add(s);
  for (const s of getAllGarrettSlugs()) set.add(s);
  for (const s of getAllHolsethSlugs()) set.add(s);
  for (const s of getAllSchwitzerSlugs()) set.add(s);
  for (const s of getAllIhiSlugs()) set.add(s);
  for (const s of getAllMitsubishiSlugs()) set.add(s);
  return set;
}

const existingSlugs = getExistingSlugs();

/** Kun turboer som ikke allerede finnes under en leverandør. */
export const andreTurbos: AndreTurbo[] = rawTurbos.filter((t) => !existingSlugs.has(slugFromTurbo(t)));

export function turboToSlug(t: AndreTurbo): string {
  return slugFromTurbo(t);
}

export function getAndreTurboBySlug(slug: string): AndreTurbo | undefined {
  return andreTurbos.find((t) => slugFromTurbo(t) === slug);
}

export function getAllAndreSlugs(): string[] {
  return andreTurbos.map(slugFromTurbo);
}

export function getAndreTurbosBySeries(): Record<string, AndreTurbo[]> {
  const out: Record<string, AndreTurbo[]> = {};
  for (const t of andreTurbos) {
    if (!out[t.serie]) out[t.serie] = [];
    out[t.serie].push(t);
  }
  return out;
}

export const ANDRE_TURBOER_NAVN = "Andre turboer";
