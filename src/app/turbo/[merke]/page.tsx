import Link from "next/link";
import { notFound } from "next/navigation";
import { getMerkeBySlug, getAllMerkeSlugs, modelToSlug } from "@/data/biler";
import { BASE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ merke: string }>;
};

export async function generateStaticParams() {
  return getAllMerkeSlugs().map((merke) => ({ merke }));
}

export async function generateMetadata({ params }: Props) {
  const { merke } = await params;
  const data = getMerkeBySlug(merke);
  if (!data) return { title: "Merke ikke funnet" };
  const modellList = data.modeller.slice(0, 5).join(", ");
  const title = `Turbo til ${data.navn} – ${data.navn} modeller`;
  const description = `Turbo til ${data.navn}. Vi leverer turbo til ${data.navn} ${modellList} m.m. Send forespørsel for uforpliktende tilbud.`;
  const url = `${BASE_URL}/turbo/${merke}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export default async function MerkePage({ params }: Props) {
  const { merke } = await params;
  const data = getMerkeBySlug(merke);

  if (!data) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-10 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Forside
          </Link>
          <span aria-hidden>/</span>
          <Link href="/turbo" className="hover:text-slate-900">
            Turbo
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-slate-900">{data.navn}</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {data.navn}
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Vi kan levere turbo til følgende {data.navn}-modeller. Send en forespørsel med din modell for å få tilbud.
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.modeller.map((modell) => (
            <li key={modell}>
              <Link
                href={`/turbo/${merke}/${modelToSlug(modell)}`}
                className="block rounded-xl border border-slate-200 bg-white px-5 py-4 font-medium text-slate-900 shadow-sm transition hover:border-sky-200 hover:bg-sky-50/30 hover:shadow"
              >
                {data.navn} {modell}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-sky-600 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            Trenger du turbo til din {data.navn}?
          </h2>
          <p className="mt-2 text-sky-100">
            Send oss en forespørsel – vi kommer tilbake med et tilbud.
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
