const testimonials = [
  {
    quote: "Rask respons og profesjonell service. Fikk tilbud på turbo til min Volvo innen kort tid.",
    author: "Lars M.",
    role: "Volvo V70",
  },
  {
    quote: "Enkelt å sende forespørsel, og de ringte meg for å avklare. Anbefales!",
    author: "Kari S.",
    role: "Audi A4",
  },
  {
    quote: "Fikk god hjelp med å finne riktig turbo til min BMW. Prisen var konkurransedyktig.",
    author: "Erik T.",
    role: "BMW 320d",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Hva kundene sier
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Les erfaringer fra andre som har bestilt turbo hos oss.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-slate-700">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-semibold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <cite className="not-italic font-medium text-slate-900">{t.author}</cite>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
