/**
 * Schwitzer turbo – serienummer og delnummer fra leverandør.
 * Slug brukes i URL: /turboer/schwitzer/[slug]
 */
export type SchwitzerTurbo = {
  serie: string;
  delnummer: string;
};

function slugFromTurbo(t: SchwitzerTurbo): string {
  return `${t.serie}-${t.delnummer}`.toLowerCase().replace(/\s+/g, "-");
}

const RAW = `S100,318166
S100,318167
S100,318168
S100,318169
S100,318170
S100,318171
S100,318172
S100,318173
S100,318174
S100,318175

S1B,313274
S1B,313275
S1B,313276
S1B,313277
S1B,313278
S1B,313279
S1B,313280
S1B,313281
S1B,313282
S1B,313283

S2A,314280
S2A,314281
S2A,314282
S2A,314283
S2A,314284
S2A,314285
S2A,314286
S2A,314287
S2A,314288
S2A,314289

S2B,313775
S2B,313776
S2B,313777
S2B,313778
S2B,313779
S2B,313780
S2B,313781
S2B,313782
S2B,313783
S2B,313784

S2D,314334
S2D,314335
S2D,314336
S2D,314337
S2D,314338

S3A,313696
S3A,313697
S3A,313698
S3A,313699
S3A,313700
S3A,313701
S3A,313702
S3A,313703
S3A,313704
S3A,313705

S3B,313883
S3B,313884
S3B,313885
S3B,313886
S3B,313887
S3B,313888
S3B,313889
S3B,313890
S3B,313891
S3B,313892

S3BL,167570
S3BL,167571
S3BL,167572
S3BL,167573
S3BL,167574

S200,174481
S200,174482
S200,178042
S200,1264-970-0009
S200,1264-988-0009
S200,5620-988-0017

S200G,1118010-D003
S200G,04254346KZ
S200G,1118010-70D
S200G,18G08-0803
S200G,04259318KZ

S300,317875
S300,317876
S300,317877
S300,317878
S300,317879

S400,04226650KZ
S400,04226651KZ
S400,04226652KZ
S400,04226653KZ
S400,04226654KZ`;

export const schwitzerTurbos: SchwitzerTurbo[] = RAW.split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [serie = "", delnummer = ""] = line.split(",").map((s) => s.trim());
    return { serie, delnummer };
  })
  .filter((t) => t.serie && t.delnummer);

export function turboToSlug(t: SchwitzerTurbo): string {
  return slugFromTurbo(t);
}

export function getSchwitzerTurboBySlug(slug: string): SchwitzerTurbo | undefined {
  return schwitzerTurbos.find((t) => slugFromTurbo(t) === slug);
}

export function getAllSchwitzerSlugs(): string[] {
  return schwitzerTurbos.map(slugFromTurbo);
}

/** Gruppert etter serie for listeside. */
export function getSchwitzerTurbosBySeries(): Record<string, SchwitzerTurbo[]> {
  const out: Record<string, SchwitzerTurbo[]> = {};
  for (const t of schwitzerTurbos) {
    if (!out[t.serie]) out[t.serie] = [];
    out[t.serie].push(t);
  }
  return out;
}

export const SCHWITZER_NAVN = "Schwitzer";
