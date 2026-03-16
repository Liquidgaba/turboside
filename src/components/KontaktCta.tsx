"use client";

import { useModal } from "@/context/ModalContext";

export default function KontaktCta() {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      onClick={() => openModal({ title: "Send forespørsel" })}
      className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
    >
      Åpne forespørselsskjema
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  );
}
