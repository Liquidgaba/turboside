const steps = [
  {
    title: "Send forespørsel",
    description: "Fyll ut skjemaet med bilen din, ønsket turbo og eventuelt turbonummer. Vi trenger bare noen få detaljer.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Bli kontaktet",
    description: "Vi går gjennom forespørselen din og tar kontakt via e-post eller telefon for å avklare eventuelle spørsmål.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: "Få tilbud",
    description: "Du mottar et tydelig tilbud på turbo som passer din bil. Ingen forpliktelser – du bestemmer om du vil gå videre.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

type HowItWorksProps = {
  /** Valgfri innhold under stegene (f.eks. CTA-knapp på modellsider) */
  footer?: React.ReactNode;
};

export default function HowItWorks({ footer }: HowItWorksProps) {
  return (
    <section id="turboer" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Slik fungerer det
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
            Tre enkle steg fra forespørsel til tilbud på turbo til bilen din.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition hover:border-sky-200 hover:bg-sky-50/30"
            >
              <span className="absolute -top-3 left-6 rounded-full bg-sky-600 px-3 py-0.5 text-sm font-medium text-white">
                Steg {i + 1}
              </span>
              <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                {step.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        {footer ? <div className="mt-8 flex justify-center">{footer}</div> : null}
      </div>
    </section>
  );
}
