import Link from "next/link";

export default function BilerSection() {
  return (
    <section id="biler" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Turbo til alle typer biler
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-slate-600">
          Uansett merke og modell – send oss en forespørsel med bilen din, så finner vi riktig turbo til deg.
        </p>
        <Link
          href="/turbo"
          className="mt-6 inline-flex items-center gap-1 text-sky-600 font-medium hover:text-sky-700"
        >
          Se alle merker
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
