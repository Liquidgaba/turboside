import Link from "next/link";
import { BASE_URL } from "@/lib/site";

export const metadata = {
  title: "Takk for forespørselen",
  description:
    "Vi har mottatt forespørselen din og tar kontakt så snart som mulig. Forvent svar innen 1–2 virkedager.",
  alternates: { canonical: `${BASE_URL}/takk` },
  robots: { index: false, follow: true },
};

export default function TakkPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Takk for forespørselen!</h1>
        <p className="mt-3 text-slate-600">
          Vi har mottatt meldingen din og tar kontakt med deg så snart som mulig – vanligvis innen 1–2 virkedager.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Sjekk at du har oppgitt riktig e-postadresse, så du ikke går glipp av svaret vårt.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          Tilbake til forsiden
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
