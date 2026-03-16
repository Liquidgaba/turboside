import Link from "next/link";
import { bilmerker } from "@/data/biler";
import { BASE_URL } from "@/lib/site";

const turboUrl = `${BASE_URL}/turbo`;
export const metadata = {
  title: "Turbo – velg bilmerke",
  description:
    "Velg bilmerke og finn turbo til din bil. BMW, Audi, Volvo, Volkswagen og mange flere. Send forespørsel for uforpliktende tilbud.",
  alternates: { canonical: turboUrl },
  openGraph: {
    url: turboUrl,
    title: "Turbo – velg bilmerke",
    description:
      "Velg bilmerke og finn turbo til din bil. Send forespørsel for uforpliktende tilbud.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turbo – velg bilmerke",
    description:
      "Velg bilmerke og finn turbo til din bil. Uforpliktende tilbud.",
  },
};

export default function TurboPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Forside
          </Link>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Velg bilmerke
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Klikk på et merke for å se modeller vi kan levere turbo til.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bilmerker.map((merke) => (
            <li key={merke.slug}>
              <Link
                href={`/turbo/${merke.slug}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
              >
                <span className="font-semibold text-slate-900">{merke.navn}</span>
                <span className="text-slate-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
