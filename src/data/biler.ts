export type Bilmerke = {
  slug: string;
  navn: string;
  modeller: string[];
};

export const bilmerker: Bilmerke[] = [
  {
    slug: "bmw",
    navn: "BMW",
    modeller: [
      "1-serie",
      "2-serie",
      "3-serie",
      "4-serie",
      "5-serie",
      "6-serie",
      "7-serie",
      "X1",
      "X2",
      "X3",
      "X4",
      "X5",
      "X6",
      "X7",
    ],
  },
  {
    slug: "audi",
    navn: "Audi",
    modeller: [
      "A1",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "Q2",
      "Q3",
      "Q5",
      "Q7",
      "Q8",
    ],
  },
  {
    slug: "volvo",
    navn: "Volvo",
    modeller: [
      "240",
      "260",
      "340",
      "360",
      "440",
      "460",
      "480",
      "520",
      "540",
      "660",
      "740",
      "760",
      "780",
      "850",
      "940",
      "960",
      "C30",
      "C70",
      "S40",
      "S60",
      "S70",
      "S80",
      "S90",
      "V40",
      "V50",
      "V60",
      "V70",
      "V90",
      "XC40",
      "XC60",
      "XC70",
      "XC90",
    ],
  },
  {
    slug: "volkswagen",
    navn: "Volkswagen",
    modeller: [
      "Polo",
      "Golf",
      "Passat",
      "Arteon",
      "T-Cross",
      "T-Roc",
      "Tiguan",
      "Touareg",
      "Caddy",
      "Transporter",
    ],
  },
  {
    slug: "mercedes-benz",
    navn: "Mercedes-Benz",
    modeller: [
      "A-klasse",
      "B-klasse",
      "C-klasse",
      "E-klasse",
      "S-klasse",
      "GLA",
      "GLB",
      "GLC",
      "GLE",
      "GLS",
      "G-klasse",
    ],
  },
  {
    slug: "toyota",
    navn: "Toyota",
    modeller: [
      "Yaris",
      "Yaris Cross",
      "Corolla",
      "Corolla Cross",
      "RAV4",
      "Land Cruiser",
      "C-HR",
      "Camry",
      "Hilux",
      "Proace",
    ],
  },
  {
    slug: "nissan",
    navn: "Nissan",
    modeller: [
      "Micra",
      "Juke",
      "Qashqai",
      "X-Trail",
      "Navara",
      "NV200",
    ],
  },
  {
    slug: "ford",
    navn: "Ford",
    modeller: [
      "Fiesta",
      "Focus",
      "Mondeo",
      "Puma",
      "Kuga",
      "Explorer",
      "Mustang",
      "Ranger",
      "Tourneo",
    ],
  },
  {
    slug: "hyundai",
    navn: "Hyundai",
    modeller: [
      "i10",
      "i20",
      "i30",
      "Tucson",
      "Santa Fe",
      "Kona",
      "Bayon",
      "Staria",
    ],
  },
  {
    slug: "kia",
    navn: "Kia",
    modeller: [
      "Picanto",
      "Rio",
      "Ceed",
      "Sportage",
      "Niro",
      "Stonic",
      "Sorento",
      "Carnival",
    ],
  },
  {
    slug: "mazda",
    navn: "Mazda",
    modeller: [
      "Mazda2",
      "Mazda3",
      "Mazda6",
      "CX-3",
      "CX-30",
      "CX-5",
      "CX-60",
      "CX-80",
      "MX-5",
    ],
  },
  {
    slug: "skoda",
    navn: "Škoda",
    modeller: [
      "Fabia",
      "Scala",
      "Octavia",
      "Superb",
      "Kamiq",
      "Karoq",
      "Kodiaq",
    ],
  },
  {
    slug: "peugeot",
    navn: "Peugeot",
    modeller: [
      "208",
      "2008",
      "308",
      "3008",
      "5008",
      "508",
      "Rifter",
      "Traveller",
    ],
  },
  {
    slug: "renault",
    navn: "Renault",
    modeller: [
      "Clio",
      "Captur",
      "Megane",
      "Scenic",
      "Arkana",
      "Austral",
      "Kadjar",
      "Koleos",
      "Kangoo",
      "Master",
    ],
  },
  {
    slug: "opel",
    navn: "Opel",
    modeller: [
      "Corsa",
      "Mokka",
      "Astra",
      "Crossland",
      "Grandland",
      "Insignia",
      "Combo",
      "Vivaro",
      "Zafira",
    ],
  },
  {
    slug: "honda",
    navn: "Honda",
    modeller: [
      "Jazz",
      "Civic",
      "HR-V",
      "CR-V",
      "ZR-V",
    ],
  },
  {
    slug: "mitsubishi",
    navn: "Mitsubishi",
    modeller: [
      "Space Star",
      "ASX",
      "Eclipse Cross",
      "Outlander",
      "Outlander PHEV",
    ],
  },
  {
    slug: "seat",
    navn: "Seat",
    modeller: [
      "Ibiza",
      "Leon",
      "Arona",
      "Ateca",
      "Tarraco",
    ],
  },
  {
    slug: "citroen",
    navn: "Citroën",
    modeller: [
      "C3",
      "C3 Aircross",
      "C4",
      "C4 X",
      "C5 Aircross",
      "C5 X",
      "Berlingo",
      "Spacetourer",
    ],
  },
  {
    slug: "subaru",
    navn: "Subaru",
    modeller: [
      "XV",
      "Outback",
      "Forester",
      "Levorg",
    ],
  },
];

export function getMerkeBySlug(slug: string): Bilmerke | undefined {
  return bilmerker.find((m) => m.slug === slug);
}

export function getAllMerkeSlugs(): string[] {
  return bilmerker.map((m) => m.slug);
}

/** Konverter modellnavn til URL-slug (f.eks. "V60" → "v60", "1-serie" → "1-serie") */
export function modelToSlug(modell: string): string {
  return modell
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\//g, "-");
}

/** Hent merke og modellnavn for en gitt merke-slug og modell-slug. */
export function getModellBySlug(
  merkeSlug: string,
  modellSlug: string
): { merke: Bilmerke; modell: string } | undefined {
  const merke = getMerkeBySlug(merkeSlug);
  if (!merke) return undefined;
  const modell = merke.modeller.find((m) => modelToSlug(m) === modellSlug);
  if (!modell) return undefined;
  return { merke, modell };
}

/** Ingress-varianter for hero (1–5). Bruk getIngressVariantIndex(merkeSlug) for fast merke. */
export const INGRESS_VARIANTS = [
  (merke: string, modell: string) =>
    `Send inn en forespørsel på turbo til din ${merke} ${modell}, så får du raskt et uforpliktende tilbud fra oss.`,
  (merke: string, modell: string) =>
    `Trenger du turbo til ${merke} ${modell}? Send oss en forespørsel, så gir vi deg et godt tilbud – helt uforpliktende.`,
  (merke: string, modell: string) =>
    `Fyll ut skjemaet for turbo til din ${merke} ${modell}, og motta et uforpliktende tilbud så snart som mulig.`,
  (merke: string, modell: string) =>
    `La oss finne riktig turbo til din ${merke} ${modell}. Send en forespørsel, så får du et tilbud uten forpliktelser.`,
  (merke: string, modell: string) =>
    `Usikker på hvilken turbo du trenger til ${merke} ${modell}? Send oss en forespørsel, så hjelper vi deg og gir deg et uforpliktende tilbud.`,
];

/** Ingress-variant per merke (0–4). Samme for alle modeller under merket. */
export function getIngressVariantIndex(merkeSlug: string): number {
  const i = bilmerker.findIndex((m) => m.slug === merkeSlug);
  return i >= 0 ? i % INGRESS_VARIANTS.length : 0;
}

/** Ingress-varianter for bysider: merke, modell og by i teksten. */
export const INGRESS_VARIANTS_BY: ((merke: string, modell: string, by: string) => string)[] = [
  (merke, modell, by) =>
    `Send inn en forespørsel på turbo til din ${merke} ${modell} i ${by}, så får du raskt et uforpliktende tilbud fra oss.`,
  (merke, modell, by) =>
    `Trenger du turbo til ${merke} ${modell} i ${by}? Send oss en forespørsel, så gir vi deg et godt tilbud – helt uforpliktende.`,
  (merke, modell, by) =>
    `Fyll ut skjemaet for turbo til din ${merke} ${modell} i ${by}, og motta et uforpliktende tilbud så snart som mulig.`,
  (merke, modell, by) =>
    `La oss finne riktig turbo til din ${merke} ${modell} i ${by}. Send en forespørsel, så får du et tilbud uten forpliktelser.`,
  (merke, modell, by) =>
    `Usikker på hvilken turbo du trenger til ${merke} ${modell} i ${by}? Send oss en forespørsel, så hjelper vi deg og gir deg et uforpliktende tilbud.`,
];

/** Bilde per merke (Unsplash). Fallback til generisk bil. */
export const MERKE_IMAGES: Record<string, string> = {
  bmw: "/bmw.png",
  audi: "/audi.png",
  volvo: "/volvo.png",
  volkswagen: "/volkswagen.png",
  "mercedes-benz": "/mercedes.png",
  toyota: "/toyota.png",
  nissan: "/nissan.png",
  ford: "/ford.png",
  hyundai: "/hyndai.png",
  kia: "/kia.png",
  mazda: "/mazda.png",
  skoda: "/skoda.png",
  peugeot: "/peugeot.png",
  renault: "/renault.png",
  opel: "/opel.png",
  honda: "/honda.png",
  mitsubishi: "/mitsubishi.png",
  seat: "/seat.png",
  citroen: "/citroen.png",
  subaru: "/subaru.png",
};

const DEFAULT_MERKE_IMAGE = "";

export function getMerkeImage(merkeSlug: string): string {
  return MERKE_IMAGES[merkeSlug] ?? DEFAULT_MERKE_IMAGE;
}

/** Alle merke har full modellside for alle sine modeller. */
export function getModellSiderMedInnhold(): Record<string, Set<string>> {
  const out: Record<string, Set<string>> = {};
  for (const m of bilmerker) {
    out[m.slug] = new Set(m.modeller.map((mod) => modelToSlug(mod)));
  }
  return out;
}

/** Modell-sider med eget innhold: alle merke og alle modeller. */
export const modellSiderMedInnhold: Record<string, Set<string>> = (() => {
  const out: Record<string, Set<string>> = {};
  for (const m of bilmerker) {
    out[m.slug] = new Set(m.modeller.map((mod) => modelToSlug(mod)));
  }
  return out;
})();
