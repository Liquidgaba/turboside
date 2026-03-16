/**
 * Holseth turbo – serienummer og delnummer fra leverandør.
 * Slug brukes i URL: /turboer/holseth/[slug]
 */
export type HolsethTurbo = {
  serie: string;
  delnummer: string;
};

function slugFromTurbo(t: HolsethTurbo): string {
  return `${t.serie}-${t.delnummer}`.toLowerCase().replace(/\s+/g, "-");
}

const RAW = `HX30,3530864
HX30,3530865
HX30,3531357
HX30,3531483
HX30,3537010
HX30,3537011
HX30,3537012
HX30,3537886
HX30,3537887
HX30,3537888
HX30,3537889
HX30,3538249
HX30,3538308
HX30,3539701
HX30,3539702
HX30,3539703
HX30,3539803
HX30,3539846
HX30,3590021
HX30,3590022

HX30W,3590023
HX30W,3591365
HX30W,3592102
HX30W,3592103
HX30W,3592104
HX30W,3592118
HX30W,3592121
HX30W,3537562
HX30W,3537033
HX30W,3538288

HX32,3590995
HX32,3590996
HX32,3590997
HX32,3590998
HX32,3590999

HX35,3536473
HX35,3536971
HX35,3537189
HX35,3539697
HX35,3539811
HX35,3539812
HX35,3539813
HX35,3539814
HX35,3539815
HX35,3539816

HX35W,4038475
HX35W,4040205
HX35W,4040353
HX35W,4040354
HX35W,4040355
HX35W,4040356
HX35W,4040357
HX35W,4040358
HX35W,4040359
HX35W,4040360

HY35W,3596647
HY35W,3596648
HY35W,3596649
HY35W,3596650
HY35W,3596651

HX40,4038421
HX40,4038422
HX40,4038423
HX40,4038424
HX40,4038425

HX40W,4044427
HX40W,4044428
HX40W,4044429
HX40W,4044430
HX40W,4044431

HE221W,4043980
HE221W,4043981
HE221W,4043982
HE221W,4043983
HE221W,4043984

HE341W,4045900
HE341W,4045901
HE341W,4045902
HE341W,4045903
HE341W,4045904

HE351W,4045918
HE351W,4045919
HE351W,4045920
HE351W,4045921
HE351W,4045922

HX50,3594809
HX50,3594810
HX50,3594811
HX50,3594812
HX50,3594813

HX52,3596959
HX52,3596960
HX52,3596961
HX52,3596962
HX52,3596963`;

export const holsethTurbos: HolsethTurbo[] = RAW.split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [serie = "", delnummer = ""] = line.split(",").map((s) => s.trim());
    return { serie, delnummer };
  })
  .filter((t) => t.serie && t.delnummer);

export function turboToSlug(t: HolsethTurbo): string {
  return slugFromTurbo(t);
}

export function getHolsethTurboBySlug(slug: string): HolsethTurbo | undefined {
  return holsethTurbos.find((t) => slugFromTurbo(t) === slug);
}

export function getAllHolsethSlugs(): string[] {
  return holsethTurbos.map(slugFromTurbo);
}

/** Gruppert etter serie for listeside. */
export function getHolsethTurbosBySeries(): Record<string, HolsethTurbo[]> {
  const out: Record<string, HolsethTurbo[]> = {};
  for (const t of holsethTurbos) {
    if (!out[t.serie]) out[t.serie] = [];
    out[t.serie].push(t);
  }
  return out;
}

export const HOLSETH_NAVN = "Holseth";
