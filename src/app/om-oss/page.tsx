import Link from "next/link";
import { BASE_URL } from "@/lib/site";

export const metadata = {
  title: "Om oss",
  description:
    "Vi hjelper deg med turbo til bilen din. Rask respons, uforpliktende tilbud og erfaring med mange merker. Les om hvordan vi jobber.",
  alternates: { canonical: `${BASE_URL}/om-oss` },
  openGraph: {
    url: `${BASE_URL}/om-oss`,
    title: "Om oss – turbotilbil.no",
    description: "Vi hjelper deg med turbo til bilen din. Rask respons og uforpliktende tilbud.",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Om oss – turbotilbil.no",
    description: "Vi hjelper deg med turbo til bilen din.",
  },
};

const points = [
  {
    title: "Rask respons",
    description: "Vi svarer på forespørselen din innen 1–2 virkedager. Ved behov tar vi kontakt for å avklare detaljer før vi sender et endelig tilbud.",
  },
  {
    title: "Uforpliktende tilbud",
    description: "Å sende en forespørsel er helt uforpliktende. Du får et tilbud og bestemmer selv om du vil gå videre.",
  },
  {
    title: "Erfaring med mange merker",
    description: "Vi hjelper med turbo til blant annet Volkswagen, Audi, BMW, Volvo, Garrett, BorgWarner og flere leverandører.",
  },
];

const steps = [
  {
    title: "Send forespørsel",
    description: "Fyll ut skjemaet med bilen din, ønsket turbo og eventuelt turbonummer. Vi trenger bare noen få detaljer.",
  },
  {
    title: "Bli kontaktet",
    description: "Vi går gjennom forespørselen din og tar kontakt via e-post eller telefon for å avklare eventuelle spørsmål.",
  },
  {
    title: "Få tilbud",
    description: "Du mottar et tydelig tilbud på turbo som passer din bil. Ingen forpliktelser – du bestemmer om du vil gå videre.",
  },
];

export default function OmOssPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-10 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Forside
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-slate-900">Om oss</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Om oss
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Vi hjelper deg med å finne riktig turbo til bilen din. Enkel prosess og tydelig kommunikasjon fra første kontakt.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-slate-900">Hvorfor velge oss</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {points.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-slate-900">Slik fungerer det</h2>
          <p className="mt-2 text-slate-600">
            Tre enkle steg fra forespørsel til tilbud på turbo til bilen din.
          </p>
          <ol className="mt-6 space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-slate-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-14 rounded-2xl bg-sky-600 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">Klar til å sende forespørsel?</h2>
          <p className="mt-2 text-sky-100">
            Vi tar kontakt med deg så snart vi kan og sender et uforpliktende tilbud.
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
