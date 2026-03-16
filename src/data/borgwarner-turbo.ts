/**
 * BorgWarner turbo – serienummer og delnummer fra leverandør.
 * Slug brukes i URL: /turboer/borgwarner/[slug]
 */
export type BorgWarnerTurbo = {
  serie: string;
  delnummer: string;
};

function slugFromTurbo(t: BorgWarnerTurbo): string {
  return `${t.serie}-${t.delnummer}`.toLowerCase().replace(/\s+/g, "-");
}

const RAW = `K03,5303-970-0001
K03,5303-970-0002
K03,5303-970-0003
K03,5303-970-0004
K03,5303-970-0005
K03,5303-970-0006
K03,5303-970-0007
K03,5303-970-0008
K03,5303-970-0009
K03,5303-970-0010
K03,5303-970-0011
K03,5303-970-0012
K03,5303-970-0013
K03,5303-970-0014
K03,5303-970-0015
K03,5303-970-0016
K03,5303-970-0017
K03,5303-970-0018
K03,5303-970-0019
K03,5303-970-0020

K04,5304-970-0001
K04,5304-970-0002
K04,5304-970-0003
K04,5304-970-0004
K04,5304-970-0005
K04,5304-970-0006
K04,5304-970-0007
K04,5304-970-0008
K04,5304-970-0009
K04,5304-970-0010
K04,5304-970-0011
K04,5304-970-0012
K04,5304-970-0013
K04,5304-970-0014
K04,5304-970-0015
K04,5304-970-0016
K04,5304-970-0017
K04,5304-970-0018
K04,5304-970-0019
K04,5304-970-0020

BV43,5303-970-0101
BV43,5303-970-0102
BV43,5303-970-0103
BV43,5303-970-0104
BV43,5303-970-0105
BV43,5303-970-0106
BV43,5303-970-0107
BV43,5303-970-0108
BV43,5303-970-0109
BV43,5303-970-0110

BV39,5439-970-0001
BV39,5439-970-0002
BV39,5439-970-0003
BV39,5439-970-0004
BV39,5439-970-0005
BV39,5439-970-0006
BV39,5439-970-0007
BV39,5439-970-0008
BV39,5439-970-0009
BV39,5439-970-0010

KP35,5435-970-0001
KP35,5435-970-0002
KP35,5435-970-0003
KP35,5435-970-0004
KP35,5435-970-0005
KP35,5435-970-0006
KP35,5435-970-0007
KP35,5435-970-0008
KP35,5435-970-0009
KP35,5435-970-0010

KP39,5439-970-0020
KP39,5439-970-0021
KP39,5439-970-0022
KP39,5439-970-0023
KP39,5439-970-0024
KP39,5439-970-0025
KP39,5439-970-0026
KP39,5439-970-0027
KP39,5439-970-0028
KP39,5439-970-0029

BV40,5440-970-0001
BV40,5440-970-0002
BV40,5440-970-0003
BV40,5440-970-0004
BV40,5440-970-0005
BV40,5440-970-0006
BV40,5440-970-0007
BV40,5440-970-0008
BV40,5440-970-0009
BV40,5440-970-0010

K14,5314-970-0001
K14,5314-970-0002
K14,5314-970-0003
K14,5314-970-0004
K14,5314-970-0005
K14,5314-970-0006
K14,5314-970-0007
K14,5314-970-0008
K14,5314-970-0009
K14,5314-970-0010`;

export const borgWarnerTurbos: BorgWarnerTurbo[] = RAW.split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [serie = "", delnummer = ""] = line.split(",").map((s) => s.trim());
    return { serie, delnummer };
  })
  .filter((t) => t.serie && t.delnummer);

export function turboToSlug(t: BorgWarnerTurbo): string {
  return slugFromTurbo(t);
}

export function getBorgWarnerTurboBySlug(slug: string): BorgWarnerTurbo | undefined {
  return borgWarnerTurbos.find((t) => slugFromTurbo(t) === slug);
}

export function getAllBorgWarnerSlugs(): string[] {
  return borgWarnerTurbos.map(slugFromTurbo);
}

/** Gruppert etter serie (K03, K04, BV43, …) for listeside. */
export function getBorgWarnerTurbosBySeries(): Record<string, BorgWarnerTurbo[]> {
  const out: Record<string, BorgWarnerTurbo[]> = {};
  for (const t of borgWarnerTurbos) {
    if (!out[t.serie]) out[t.serie] = [];
    out[t.serie].push(t);
  }
  return out;
}

export const BORG_WARNER_NAVN = "BorgWarner";
