/**
 * IHI turbo – serienummer og delnummer fra leverandør.
 * Slug brukes i URL: /turboer/ihi/[slug]
 */
export type IhiTurbo = {
  serie: string;
  delnummer: string;
};

function slugFromTurbo(t: IhiTurbo): string {
  return `${t.serie}-${t.delnummer}`.toLowerCase().replace(/\s+/g, "-");
}

const RAW = `RHF4,9V100
RHF4,9V101
RHF4,9V102
RHF4,9V103
RHF4,9V104
RHF4,9V105
RHF4,9V106
RHF4,9V107
RHF4,9V108
RHF4,9V109
RHF4,9V110
RHF4,9V111
RHF4,9V112
RHF4,9V113
RHF4,9V114
RHF4,9V115
RHF4,9V116
RHF4,9V117
RHF4,9V118
RHF4,9V119

RHF4,AL0065
RHF4,AL0066
RHF4,AL0067
RHF4,AL0068
RHF4,AL0069
RHF4,AL0070
RHF4,AL0071
RHF4,AL0072
RHF4,AL0073
RHF4,AL0074

RHF4,VE420051
RHF4,VC420058
RHF4,VF420014
RHF4,VF420015
RHF4,VF420016
RHF4,VF420017
RHF4,VF420018
RHF4,VF420019
RHF4,VF420020
RHF4,VF420021

RHF5,9VA01
RHF5,9VA02
RHF5,9VA03
RHF5,9VA04
RHF5,9VA05
RHF5,9VA06
RHF5,9VA07
RHF5,9VA08
RHF5,9VA09
RHF5,9VA10
RHF5,9VA11
RHF5,9VA12
RHF5,9VA13
RHF5,9VA14
RHF5,9VA15
RHF5,9VA16
RHF5,9VA17
RHF5,9VA18
RHF5,9VA19
RHF5,9VA20

RHF5,VIHF
RHF5,VJ36
RHF5,VJ37
RHF5,VJ38
RHF5,VJ39
RHF5,VJ40
RHF5,VJ41
RHF5,VJ42
RHF5,VJ43
RHF5,VJ44

RHF5,VA180018
RHF5,VB180018
RHF5,VC180018
RHF5,VD180018
RHF5,VE180018
RHF5,VF180018
RHF5,VG180018
RHF5,VH180018
RHF5,VI180018
RHF5,VJ180018

RHF5,06K145702N
RHF5,06K145702T
RHF5,06K145722A
RHF5,06K145722G
RHF5,06K145722H
RHF5,06K145722T
RHF5,06K145874G
RHF5,06K145874F
RHF5,06K145874M
RHF5,06K145874Q

RHB5,NB150053
RHB5,NN130030
RHB5,VA130050
RHB5,VB130050
RHB5,NN130046
RHB5,VA130067

RHF3,VQ27
RHF3,VQ29
RHF3,VQ37
RHF3,VQ38
RHF3,VQ39
RHF3,VQ40
RHF3,VQ41
RHF3,VQ42
RHF3,VQ43
RHF3,VQ45`;

export const ihiTurbos: IhiTurbo[] = RAW.split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const [serie = "", delnummer = ""] = line.split(",").map((s) => s.trim());
    return { serie, delnummer };
  })
  .filter((t) => t.serie && t.delnummer);

export function turboToSlug(t: IhiTurbo): string {
  return slugFromTurbo(t);
}

export function getIhiTurboBySlug(slug: string): IhiTurbo | undefined {
  return ihiTurbos.find((t) => slugFromTurbo(t) === slug);
}

export function getAllIhiSlugs(): string[] {
  return ihiTurbos.map(slugFromTurbo);
}

/** Gruppert etter serie for listeside. */
export function getIhiTurbosBySeries(): Record<string, IhiTurbo[]> {
  const out: Record<string, IhiTurbo[]> = {};
  for (const t of ihiTurbos) {
    if (!out[t.serie]) out[t.serie] = [];
    out[t.serie].push(t);
  }
  return out;
}

export const IHI_NAVN = "IHI";
