"use client";

import { useModal } from "@/context/ModalContext";

export default function CTA() {
  const { openModal } = useModal();

  return (
    <section className="bg-sky-600 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Klar til å bestille turbo?
        </h2>
        <p className="mt-4 text-lg text-sky-100">
          Send en forespørsel i dag – vi kommer tilbake med et tilbud uten forpliktelser.
        </p>
        <button
          type="button"
          onClick={() => openModal()}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-sky-600 shadow-lg transition hover:bg-sky-50"
        >
          Send forespørsel
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
