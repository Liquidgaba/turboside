import Link from "next/link";
import KontaktCta from "@/components/KontaktCta";
import { BASE_URL } from "@/lib/site";

export const metadata = {
  title: "Kontakt",
  description:
    "Kontakt oss for forespørsel på turbo til bilen din. Send skjema eller ta kontakt – vi svarer innen 1–2 virkedager.",
  alternates: { canonical: `${BASE_URL}/kontakt` },
  openGraph: {
    url: `${BASE_URL}/kontakt`,
    title: "Kontakt – turbotilbil.no",
    description: "Send forespørsel på turbo. Vi svarer innen 1–2 virkedager.",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Kontakt – turbotilbil.no",
    description: "Send forespørsel på turbo. Vi svarer raskt.",
  },
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-10 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Forside
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-slate-900">Kontakt</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Kontakt oss
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Send oss en forespørsel med bilen din og ønsket turbo – vi kommer tilbake med et tilbud så snart vi kan.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Send forespørsel</h2>
            <p className="mt-2 text-slate-600">
              Fyll ut skjemaet med navn, e-post, emne og melding. Oppgi gjerne turbonummer eller bilmodell. Vi svarer innen 1–2 virkedager.
            </p>
            <div className="mt-6">
              <KontaktCta />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Vanlige spørsmål</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>• Hvor raskt svarer dere? Innen 1–2 virkedager.</li>
              <li>• Er forespørselen bindende? Nei, den er helt uforpliktende.</li>
              <li>• Kan jeg ringe? Vi tar gjerne kontakt via telefon etter at du har sendt forespørsel.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
