"use client";

import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

const steps = [
  { num: 1, text: "Send forespørsel" },
  { num: 2, text: "Bli kontaktet" },
  { num: 3, text: "Få tilbud" },
];

type ModellHeroProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  merkeNavn?: string;
  modellNavn?: string;
};

export default function ModellHero({ title, description, imageSrc, imageAlt, merkeNavn, modellNavn }: ModellHeroProps) {
  const { openModal } = useModal();

  const ctaTitle =
    merkeNavn && modellNavn
      ? `Send forespørsel på turbo til ${merkeNavn} ${modellNavn}`
      : merkeNavn
        ? `Send forespørsel på turbo til ${merkeNavn}`
        : undefined;

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-0 pb-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-24 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{description}</p>

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

          {merkeNavn ? (
            <button
              type="button"
              onClick={() => openModal({ title: ctaTitle })}
              className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-sky-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-600/25 transition hover:bg-sky-700 hover:shadow-sky-600/30"
            >
              Send forespørsel
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <Link
              href="/#forespørsel"
              className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-sky-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-600/25 transition hover:bg-sky-700 hover:shadow-sky-600/30"
            >
              Send forespørsel
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 lg:aspect-square">
          <Image
            src={imageSrc}
            alt={imageAlt}
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
