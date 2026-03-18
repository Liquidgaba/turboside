import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getModellBySlug,
  modellSiderMedInnhold,
  INGRESS_VARIANTS_BY,
  getIngressVariantIndex,
  getMerkeImage,
} from "@/data/biler";
import { getBySlug, byer } from "@/data/byer";
import { BASE_URL } from "@/lib/site";
import ModellHero from "@/components/ModellHero";
import HowItWorks from "@/components/HowItWorks";
import ModellCta from "@/components/ModellCta";
import ModellCtaButton from "@/components/ModellCtaButton";

type Props = {
  params: Promise<{ merke: string; modell: string; by: string }>;
};

/** Antall byer som pre-genereres ved build (største byer). Resten rendres on-demand for å unngå ENOSPC på Vercel. */
const PREBUILD_BY_COUNT = 20;

function getByPageStaticParams(): { merke: string; modell: string; by: string }[] {
  const params: { merke: string; modell: string; by: string }[] = [];
  const byerToPrebuild = byer.slice(0, PREBUILD_BY_COUNT);
  for (const merkeSlug of Object.keys(modellSiderMedInnhold)) {
    const set = modellSiderMedInnhold[merkeSlug];
    if (set) {
      for (const modellSlug of set) {
        for (const by of byerToPrebuild) {
          params.push({ merke: merkeSlug, modell: modellSlug, by: by.slug });
        }
      }
    }
  }
  return params;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return getByPageStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const { merke, modell, by } = await params;
  const data = getModellBySlug(merke, modell);
  const byData = getBySlug(by);
  if (!data || !byData) return { title: "Ikke funnet" };
  const { merke: merkeData, modell: modellNavn } = data;
  const title = `Turbo til ${merkeData.navn} ${modellNavn} i ${byData.navn}`;
  const description = `Turbo til ${merkeData.navn} ${modellNavn} i ${byData.navn}. Send forespørsel for uforpliktende tilbud på turbo – rask respons.`;
  const url = `${BASE_URL}/turbo/${merke}/${modell}/${by}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

/** Innhold for byside: alle tekster inkluderer bynavn. */
function ModellInnholdBy({
  merkeNavn,
  modellNavn,
  byNavn,
}: {
  merkeNavn: string;
  modellNavn: string;
  byNavn: string;
}) {
  return (
    <>
      <HowItWorks footer={<ModellCtaButton merkeNavn={merkeNavn} modellNavn={modellNavn} />} />

      <section className="bg-gradient-to-b from-sky-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h3m-3 4h3m-6-4h.01M9 17h.01" />
              </svg>
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Om {merkeNavn} – turbo i {byNavn}
            </h2>
          </div>
          <p className="mt-6 text-slate-700 leading-relaxed">
            {merkeNavn} er et bilmerke med mange modeller som bruker turbo for bedre effekt og lavere forbruk.
            {merkeNavn} {modellNavn} finnes med flere motoralternativer med turbo, og vi kan hjelpe deg med å finne riktig del – også for bilister i {byNavn}.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Uansett om du bor i {byNavn} eller andre steder – trenger du ny eller ombygd turbo, kan vi hjelpe deg med å finne riktig del og et tydelig tilbud.
          </p>
          <ModellCtaButton merkeNavn={merkeNavn} modellNavn={modellNavn} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(14,165,233,0.06)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Viktig å vite
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Hvorfor turbo er viktig for {merkeNavn} – også i {byNavn}
          </h2>
          <p className="mt-6 text-slate-700 leading-relaxed">
            {merkeNavn} bruker turbomotorer for å kombinere lave utslipp med god kjøreevne. En fungerende turbo er derfor avgjørende for ytelse og drivstofforbruk. Ved slitasje eller feil på turboen kan du oppleve tap av effekt, mer røyk eller advarsler i instrumentbrettet.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Vi tilbyr turbo til en lang rekke {merkeNavn}-modeller – inkludert {modellNavn} – og hjelper deg med å få et tilpasset tilbud. Bor du i {byNavn} eller omegn? Send oss en forespørsel med modell og årstall, så kommer vi tilbake til deg.
          </p>
          <ModellCtaButton merkeNavn={merkeNavn} modellNavn={modellNavn} />
        </div>
      </section>

      <section className="bg-slate-900 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hvorfor velge oss for turbo til {merkeNavn} {modellNavn} i {byNavn}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
              Vi har erfaring med {merkeNavn} og hjelper deg fra forespørsel til ferdig tilbud – uansett om du er i {byNavn} eller andre steder.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-6 text-center backdrop-blur-sm transition hover:bg-sky-500/20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Riktig del til din {modellNavn} i {byNavn}</h3>
              <p className="mt-2 text-slate-300">
                Vi finner turbo som passer din {merkeNavn} {modellNavn} ut fra årstall og motorkode, så du får et tilbud som stemmer – også for deg i {byNavn}.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center backdrop-blur-sm transition hover:bg-emerald-500/20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Rask og tydelig dialog</h3>
              <p className="mt-2 text-slate-300">
                Du får svar innen 1–2 virkedager. Vi avklarer eventuelle spørsmål så tilbudet blir klart og forståelig – uansett om du er i {byNavn} eller andre steder.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center backdrop-blur-sm transition hover:bg-amber-500/20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Uforpliktende tilbud</h3>
              <p className="mt-2 text-slate-300">
                Du bestemmer selv om du vil gå videre. Ingen binding – bare et ærlig tilbud på turbo til din {modellNavn} i {byNavn}.
              </p>
            </div>
          </div>
          <ModellCtaButton merkeNavn={merkeNavn} modellNavn={modellNavn} />
        </div>
      </section>

      <section className="bg-gradient-to-br from-sky-50 via-white to-amber-50/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-medium text-sky-700">
              Kundeevaringer
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Hva kundene sier om turbo til {merkeNavn} i {byNavn}
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Erfaringer fra andre som har bestilt turbo til sin {merkeNavn} – også fra {byNavn}.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <blockquote className="relative rounded-2xl border-2 border-sky-200 bg-white p-6 shadow-lg shadow-sky-100/50">
              <span className="absolute -top-2 left-6 text-4xl font-serif text-sky-200">{"\u201C"}</span>
              <p className="relative mt-2 text-slate-700">&ldquo;Rask respons på forespørsel for turbo til min {modellNavn}. Fikk tydelig tilbud og god dialog – anbefales for alle i {byNavn}.&rdquo;</p>
              <footer className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-sm font-bold text-white">K</div>
                <cite className="not-italic font-medium text-slate-900">Kunde med {merkeNavn} {modellNavn} i {byNavn}</cite>
              </footer>
            </blockquote>
            <blockquote className="relative rounded-2xl border-2 border-emerald-200 bg-white p-6 shadow-lg shadow-emerald-100/50">
              <span className="absolute -top-2 left-6 text-4xl font-serif text-emerald-200">{"\u201C"}</span>
              <p className="relative mt-2 text-slate-700">&ldquo;Enkelt å sende inn detaljene fra {byNavn}. De ringte og avklarte motorkode – anbefales.&rdquo;</p>
              <footer className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-bold text-white">M</div>
                <cite className="not-italic font-medium text-slate-900">{merkeNavn}-kunde i {byNavn}</cite>
              </footer>
            </blockquote>
            <blockquote className="relative rounded-2xl border-2 border-amber-200 bg-white p-6 shadow-lg shadow-amber-100/50">
              <span className="absolute -top-2 left-6 text-4xl font-serif text-amber-200">{"\u201C"}</span>
              <p className="relative mt-2 text-slate-700">&ldquo;Fikk god hjelp med å finne riktig turbo til min bil. Profesjonelt og ryddig – også for oss i {byNavn}.&rdquo;</p>
              <footer className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-sm font-bold text-white">E</div>
                <cite className="not-italic font-medium text-slate-900">{merkeNavn}-kunde i {byNavn}</cite>
              </footer>
            </blockquote>
          </div>
          <ModellCtaButton merkeNavn={merkeNavn} modellNavn={modellNavn} />
        </div>
      </section>

      <ModellCta merkeNavn={merkeNavn} modellNavn={modellNavn} variant="full" />
    </>
  );
}

export default async function ByPage({ params }: Props) {
  const { merke: merkeSlug, modell: modellSlug, by: bySlug } = await params;
  const data = getModellBySlug(merkeSlug, modellSlug);
  const byData = getBySlug(bySlug);

  if (!data || !byData) notFound();

  const { merke, modell } = data;
  const byNavn = byData.navn;

  const ingressIndex = getIngressVariantIndex(merkeSlug);
  const ingressFn = INGRESS_VARIANTS_BY[ingressIndex];
  const heroTitle = `Turbo til ${merke.navn} ${modell} i ${byNavn}`;
  const heroDescription = ingressFn(merke.navn, modell, byNavn);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="pt-4 pb-[50px] flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Forside
          </Link>
          <span aria-hidden>/</span>
          <Link href="/turbo" className="hover:text-slate-900">
            Turbo
          </Link>
          <span aria-hidden>/</span>
          <Link href={`/turbo/${merkeSlug}`} className="hover:text-slate-900">
            {merke.navn}
          </Link>
          <span aria-hidden>/</span>
          <Link href={`/turbo/${merkeSlug}/${modellSlug}`} className="hover:text-slate-900">
            {merke.navn} {modell}
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-slate-900">
            {byNavn}
          </span>
        </nav>
      </div>

      <ModellHero
        title={heroTitle}
        description={heroDescription}
        imageSrc={getMerkeImage(merkeSlug)}
        imageAlt={`${merke.navn} ${modell} i ${byNavn} – turbo til din bil`}
        merkeNavn={merke.navn}
        modellNavn={modell}
      />

      <ModellInnholdBy merkeNavn={merke.navn} modellNavn={modell} byNavn={byNavn} />

      <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Turbo til {merke.navn} {modell} i andre byer
          </h2>
          <p className="mt-1 text-slate-600">
            Velg by for å se informasjon og forespørsel for din region.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {byer.map((by) => (
              <li key={by.slug}>
                <Link
                  href={`/turbo/${merkeSlug}/${modellSlug}/${by.slug}`}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    by.slug === bySlug
                      ? "border-sky-300 bg-sky-50 text-sky-800"
                      : "border-slate-200 bg-slate-50/50 text-slate-900 hover:border-sky-200 hover:bg-sky-50/50 hover:shadow-sm"
                  }`}
                >
                  <span>{by.navn}</span>
                  <span className="text-slate-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
