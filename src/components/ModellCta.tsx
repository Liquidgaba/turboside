"use client";

import { useModal } from "@/context/ModalContext";

type ModellCtaProps = {
  merkeNavn: string;
  modellNavn?: string;
  variant?: "slim" | "full";
};

export default function ModellCta({ merkeNavn, modellNavn, variant = "slim" }: ModellCtaProps) {
  const { openModal } = useModal();
  const title = modellNavn
    ? `Send forespørsel på turbo til ${merkeNavn} ${modellNavn}`
    : `Send forespørsel på turbo til ${merkeNavn}`;

  const open = () => openModal({ title });

  if (variant === "full") {
    return (
      <section className="bg-sky-600 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trenger du turbo til din {merkeNavn}{modellNavn ? ` ${modellNavn}` : ""}?
          </h2>
          <p className="mt-4 text-lg text-sky-100">
            Send en forespørsel i dag – vi kommer tilbake med et uforpliktende tilbud.
          </p>
          <button
            type="button"
            onClick={open}
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-sky-200 bg-sky-50/50 py-6 sm:flex-row sm:gap-6">
        <p className="text-center text-slate-700 sm:text-left">
          Vil du ha tilbud på turbo til din {merkeNavn}{modellNavn ? ` ${modellNavn}` : ""}?
        </p>
        <button
          type="button"
          onClick={open}
          className="shrink-0 rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Send forespørsel
        </button>
      </div>
    </div>
  );
}
