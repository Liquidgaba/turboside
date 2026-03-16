import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBorgWarnerTurbosBySeries,
  turboToSlug as borgWarnerTurboToSlug,
  BORG_WARNER_NAVN,
} from "@/data/borgwarner-turbo";
import {
  getGarrettTurbosBySeries,
  turboToSlug as garrettTurboToSlug,
  GARRETT_NAVN,
} from "@/data/garrett-turbo";
import {
  getHolsethTurbosBySeries,
  turboToSlug as holsethTurboToSlug,
  HOLSETH_NAVN,
} from "@/data/holseth-turbo";
import {
  getSchwitzerTurbosBySeries,
  turboToSlug as schwitzerTurboToSlug,
  SCHWITZER_NAVN,
} from "@/data/schwitzer-turbo";
import {
  getIhiTurbosBySeries,
  turboToSlug as ihiTurboToSlug,
  IHI_NAVN,
} from "@/data/ihi-turbo";
import {
  getMitsubishiTurbosBySeries,
  turboToSlug as mitsubishiTurboToSlug,
  MITSUBISHI_NAVN,
} from "@/data/mitsubishi-turbo";
import {
  getAndreTurbosBySeries,
  turboToSlug as andreTurboToSlug,
  ANDRE_TURBOER_NAVN,
} from "@/data/andre-turbo";
import { BASE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ leverandor: string }>;
};

type TurboItem = { serie: string; delnummer: string };

const LEVERANDORER: Record<
  string,
  {
    navn: string;
    getBySeries: () => Record<string, TurboItem[]>;
    turboToSlug: (t: TurboItem) => string;
    descriptionSeries: string;
  }
> = {
  borgwarner: {
    navn: BORG_WARNER_NAVN,
    getBySeries: getBorgWarnerTurbosBySeries,
    turboToSlug: borgWarnerTurboToSlug,
    descriptionSeries: "K03, K04, BV39, BV40, BV43, KP35, KP39, K14",
  },
  garrett: {
    navn: GARRETT_NAVN,
    getBySeries: getGarrettTurbosBySeries,
    turboToSlug: garrettTurboToSlug,
    descriptionSeries: "GT1544V, GT1749V, GT2052V, GT2256V, GT2260V m.fl.",
  },
  holseth: {
    navn: HOLSETH_NAVN,
    getBySeries: getHolsethTurbosBySeries,
    turboToSlug: holsethTurboToSlug,
    descriptionSeries: "HX30, HX30W, HX32, HX35, HX35W, HY35W, HX40, HX40W, HE221W, HE341W, HE351W, HX50, HX52",
  },
  schwitzer: {
    navn: SCHWITZER_NAVN,
    getBySeries: getSchwitzerTurbosBySeries,
    turboToSlug: schwitzerTurboToSlug,
    descriptionSeries: "S100, S1B, S2A, S2B, S2D, S3A, S3B, S3BL, S200, S200G, S300, S400",
  },
  ihi: {
    navn: IHI_NAVN,
    getBySeries: getIhiTurbosBySeries,
    turboToSlug: ihiTurboToSlug,
    descriptionSeries: "RHF3, RHF4, RHF5, RHB5",
  },
  mitsubishi: {
    navn: MITSUBISHI_NAVN,
    getBySeries: getMitsubishiTurbosBySeries,
    turboToSlug: mitsubishiTurboToSlug,
    descriptionSeries: "TD02, TD03, TD04L, TD04HL, TD05, TD05H",
  },
  "andre-turboer": {
    navn: ANDRE_TURBOER_NAVN,
    getBySeries: getAndreTurbosBySeries,
    turboToSlug: andreTurboToSlug,
    descriptionSeries: "Utvalgte turboer fra flere leverandører – CT16, CT20, CT26, BV38 m.fl.",
  },
};

export async function generateMetadata({ params }: Props) {
  const { leverandor } = await params;
  const config = LEVERANDORER[leverandor];
  if (!config) return { title: "Ikke funnet" };
  return {
    title: `${config.navn} turbo – serienummer og delnummer`,
    description: `Oversikt over ${config.navn} turbo med serienummer og delnummer. ${config.descriptionSeries}. Send forespørsel for tilbud.`,
    alternates: { canonical: `${BASE_URL}/turboer/${leverandor}` },
    openGraph: {
      url: `${BASE_URL}/turboer/${leverandor}`,
      title: `${config.navn} turbo – serienummer og delnummer`,
      description: `Oversikt over ${config.navn} turbo. Send forespørsel for uforpliktende tilbud.`,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${config.navn} turbo – serienummer og delnummer`,
      description: `Oversikt over ${config.navn} turbo. Send forespørsel for tilbud.`,
    },
  };
}

export default async function LeverandorPage({ params }: Props) {
  const { leverandor } = await params;
  const config = LEVERANDORER[leverandor];

  if (!config) notFound();

  const bySeries = config.getBySeries();
  const seriesOrder = Object.keys(bySeries).sort();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-10 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Forside
          </Link>
          <span aria-hidden>/</span>
          <Link href="/turboer" className="hover:text-slate-900">
            Turboer
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-slate-900">{config.navn}</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {config.navn} turbo – serienummer og delnummer
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Velg turbo under for å se mer og sende forespørsel på det aktuelle delnummeret.
        </p>

        <div className="mt-10 space-y-10">
          {seriesOrder.map((serie) => {
            const turbos = bySeries[serie]!;
            return (
              <section key={serie}>
                <h2 className="text-xl font-semibold text-slate-900">{serie}</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {turbos.map((t) => {
                    const slug = config.turboToSlug(t);
                    const label = `${t.serie} ${t.delnummer}`;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/turboer/${leverandor}/${slug}`}
                          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-sky-200 hover:bg-sky-50/50 hover:shadow-sm"
                        >
                          <span>{label}</span>
                          <span className="text-slate-400">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-sky-600 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            Fant du ikke det du leter etter?
          </h2>
          <p className="mt-2 text-sky-100">
            Send oss en forespørsel med serienummer og delnummer – så hjelper vi deg med et tilbud.
          </p>
          <Link
            href="/#forespørsel"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-sky-600 shadow-lg transition hover:bg-sky-50"
          >
            Send forespørsel
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
