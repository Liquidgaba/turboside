"use client";

import { useModal } from "@/context/ModalContext";

type ModellCtaButtonProps = {
  merkeNavn: string;
  modellNavn?: string;
};

export default function ModellCtaButton({ merkeNavn, modellNavn }: ModellCtaButtonProps) {
  const { openModal } = useModal();
  const title = modellNavn
    ? `Send forespørsel på turbo til ${merkeNavn} ${modellNavn}`
    : `Send forespørsel på turbo til ${merkeNavn}`;

  return (
    <div className="flex justify-center pt-6">
      <button
        type="button"
        onClick={() => openModal({ title })}
        className="rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        Send forespørsel
      </button>
    </div>
  );
}
