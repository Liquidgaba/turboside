"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";

const steps = [
  { num: 1, text: "Send forespørsel" },
  { num: 2, text: "Bli kontaktet" },
  { num: 3, text: "Få tilbud" },
];

export default function Hero() {
  const { openModal } = useModal();
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-24 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Turbo til bilen din –{" "}
            <span className="text-sky-600">enkelt og raskt</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Send oss en forespørsel med bilen din og ønsket turbo. Vi kommer tilbake med et tilbud så snart vi kan.
          </p>

          <ul className="mt-8 space-y-4">
            {steps.map((step) => (
              <li key={step.num} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
                  {step.num}
                </span>
                <span className="text-slate-700">{step.text}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => openModal()}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-600/25 transition hover:bg-sky-700 hover:shadow-sky-600/30"
          >
            Send forespørsel
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 lg:aspect-square">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
            alt="Bil med turbo – profesjonell service"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
