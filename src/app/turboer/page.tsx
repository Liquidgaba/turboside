import Link from "next/link";
import { BASE_URL } from "@/lib/site";

const turboerUrl = `${BASE_URL}/turboer`;
export const metadata = {
  title: "Turboer – turboleverandører",
  description:
    "Vi arbeider med ledende turboleverandører som BorgWarner, Garrett, Holseth, IHI, Mitsubishi, Schwitzer og andre turboer. Få tilbud på turbo til din bil.",
  alternates: { canonical: turboerUrl },
  openGraph: {
    url: turboerUrl,
    title: "Turboer – turboleverandører",
    description:
      "Vi arbeider med ledende turboleverandører. Få uforpliktende tilbud på turbo til din bil.",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Turboer – turboleverandører",
    description: "Turboleverandører vi samarbeider med. Send forespørsel for tilbud.",
  },
};

const turboLeverandorer: { navn: string; href: string | null }[] = [
  { navn: "BorgWarner", href: "/turboer/borgwarner" },
  { navn: "Holseth Turbochargers", href: "/turboer/holseth" },
  { navn: "Schwitzer", href: "/turboer/schwitzer" },
  { navn: "Garrett", href: "/turboer/garrett" },
  { navn: "IHI", href: "/turboer/ihi" },
  { navn: "Mitsubishi", href: "/turboer/mitsubishi" },
  { navn: "Andre turboer", href: "/turboer/andre-turboer" },
];

export default function TurboerPage() {
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
          Turboer – turboleverandører
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Vi tilbyr turbo fra anerkjente leverandører. Send oss en forespørsel så finner vi riktig del til din bil.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {turboLeverandorer.map(({ navn, href }) => (
            <li key={navn}>
              {href ? (
                <Link
                  href={href}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                >
                  <span className="font-semibold text-slate-900">{navn}</span>
                  <span className="text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ) : (
                <div className="flex items-center rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <span className="font-semibold text-slate-900">{navn}</span>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-sky-600 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            Trenger du turbo fra en av disse leverandørene?
          </h2>
          <p className="mt-2 text-sky-100">
            Send oss en forespørsel med bilmerke, modell og årstall – så kommer vi tilbake med et uforpliktende tilbud.
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
