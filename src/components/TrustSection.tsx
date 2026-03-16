const points = [
  {
    title: "Rask respons",
    description: "Vi svarer på forespørselen din innen 1–2 virkedager.",
  },
  {
    title: "Uforpliktende tilbud",
    description: "Du bestemmer selv om du vil gå videre etter at du mottar tilbudet.",
  },
  {
    title: "Erfaring med mange merker",
    description: "Vi hjelper med turbo til blant annet Volkswagen, Audi, BMW, Volvo og mer.",
  },
];

export default function TrustSection() {
  return (
    <section id="om-oss" className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Hvorfor velge oss
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Enkel prosess og tydelig kommunikasjon fra første kontakt.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {points.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
