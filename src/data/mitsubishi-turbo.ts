/**
 * Mitsubishi turbo – serienummer og delnummer fra leverandør.
 * Slug brukes i URL: /turboer/mitsubishi/[slug]
 */
export type MitsubishiTurbo = {
  serie: string;
  delnummer: string;
};

function slugFromTurbo(t: MitsubishiTurbo): string {
  return `${t.serie}-${t.delnummer}`.toLowerCase().replace(/\s+/g, "-");
}

const RAW = `TD02,49173-02000
TD02,49173-02001
TD02,49173-02002
TD02,49173-02003
TD02,49173-02004
TD02,49173-02005
TD02,49173-02006
TD02,49173-02007
TD02,49173-02008
TD02,49173-02009

TD03,49131-05000
TD03,49131-05001
TD03,49131-05002
TD03,49131-05003
TD03,49131-05004
TD03,49131-05005
TD03,49131-05006
TD03,49131-05007
TD03,49131-05008
TD03,49131-05009
TD03,49131-06000
TD03,49131-06001
TD03,49131-06002
TD03,49131-06003
TD03,49131-06004
TD03,49131-06005
TD03,49131-06006
TD03,49131-06007
TD03,49131-06008
TD03,49131-06009

TD04L,49135-05000
TD04L,49135-05001
TD04L,49135-05002
TD04L,49135-05003
TD04L,49135-05004
TD04L,49135-05005
TD04L,49135-05006
TD04L,49135-05007
TD04L,49135-05008
TD04L,49135-05009
TD04L,49135-05620
TD04L,49135-05630
TD04L,49135-05710
TD04L,49135-05720
TD04L,49135-05730
TD04L,49135-05740
TD04L,49135-05750
TD04L,49135-05760
TD04L,49135-05770
TD04L,49135-05780

TD04HL,49377-04000
TD04HL,49377-04001
TD04HL,49377-04002
TD04HL,49377-04003
TD04HL,49377-04004
TD04HL,49377-04005
TD04HL,49377-04006
TD04HL,49377-04007
TD04HL,49377-04008
TD04HL,49377-04009
TD04HL,49377-04200
TD04HL,49377-04201
TD04HL,49377-04202
TD04HL,49377-04203
TD04HL,49377-04204
TD04HL,49377-04205
TD04HL,49377-04206
TD04HL,49377-04207
TD04HL,49377-04208
TD04HL,49377-04209

TD05,49178-01000
TD05,49178-01001
TD05,49178-01002
TD05,49178-01003
TD05,49178-01004
TD05,49178-01005
TD05,49178-01006
TD05,49178-01007
TD05,49178-01008
TD05,49178-01009

TD05H,49178-02000
TD05H,49178-02001
TD05H,49178-02002
TD05H,49178-02003
TD05H,49178-02004
TD05H,49178-02005
TD05H,49178-02006
TD05H,49178-02007
TD05H,49178-02008
TD05H,49178-02009`;

export const mitsubishiTurbos: MitsubishiTurbo[] = RAW.split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [serie = "", delnummer = ""] = line.split(",").map((s) => s.trim());
    return { serie, delnummer };
  })
  .filter((t) => t.serie && t.delnummer);

export function turboToSlug(t: MitsubishiTurbo): string {
  return slugFromTurbo(t);
}

export function getMitsubishiTurboBySlug(slug: string): MitsubishiTurbo | undefined {
  return mitsubishiTurbos.find((t) => slugFromTurbo(t) === slug);
}

export function getAllMitsubishiSlugs(): string[] {
  return mitsubishiTurbos.map(slugFromTurbo);
}

/** Gruppert etter serie for listeside. */
export function getMitsubishiTurbosBySeries(): Record<string, MitsubishiTurbo[]> {
  const out: Record<string, MitsubishiTurbo[]> = {};
  for (const t of mitsubishiTurbos) {
    if (!out[t.serie]) out[t.serie] = [];
    out[t.serie].push(t);
  }
  return out;
}

export const MITSUBISHI_NAVN = "Mitsubishi";
