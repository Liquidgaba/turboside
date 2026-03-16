"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Hvor lang tid tar det å få tilbud?",
    answer: "Vi streber etter å svare på forespørselen din innen 1–2 virkedager. Ved behov tar vi kontakt for å avklare detaljer før vi sender et endelig tilbud.",
  },
  {
    question: "Trenger jeg å vite turbonummeret?",
    answer: "Nei. Du kan fylle inn bilens merke, modell og årstall, så hjelper vi deg med å finne riktig turbo. Turbonummer er valgfritt og kan fremskynde prosessen.",
  },
  {
    question: "Er det noen forpliktelse når jeg sender forespørsel?",
    answer: "Nei. Å sende en forespørsel er helt uforpliktende. Du får et tilbud og bestemmer selv om du vil gå videre.",
  },
  {
    question: "Leverer dere også montering?",
    answer: "Vi fokuserer på salg av turbo. For montering kan vi anbefale samarbeidspartnere eller verksteder i ditt område.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ofte stilte spørsmål
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Svar på vanlige spørsmål om forespørsel og tilbud.
          </p>
        </div>

        <div className="mt-12 space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 bg-white px-5 py-4 text-left font-medium text-slate-900 hover:bg-slate-50"
              >
                {faq.question}
                <span
                  className={`shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                >
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openIndex === i && (
                <div className="border-t border-slate-200 bg-slate-50/50 px-5 py-4">
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
