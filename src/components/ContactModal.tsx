"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string | null;
};

const DEFAULT_TITLE = "Send forespørsel";

/** Norsk mobil: 8 siffer, må starte på 4 eller 9. Returnerer feilmelding eller null. */
function getPhoneError(value: string): string | null {
  if (!value.trim()) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 8) return "Telefonnummer må ha nøyaktig 8 siffer.";
  if (!/^[49]/.test(digits)) return "Telefonnummer må starte med 4 eller 9.";
  return null;
}

export default function ContactModal({ isOpen, onClose, title }: ContactModalProps) {
  const router = useRouter();
  const modalTitle = title ?? DEFAULT_TITLE;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [turbonumber, setTurbonumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const WEBHOOK_URL = "https://hook.eu2.make.com/zm4plz46j3jq2rgoqj4fsrjpgl1k3v82";

  const reset = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setTurbonumber("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
    setSubmitError(null);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(reset, 300);
  }, [onClose, reset]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);
    setSubmitError(null);
    const err = getPhoneError(phone);
    if (err) {
      setPhoneError(err);
      return;
    }
    setSending(true);
    try {
      const payload = {
        name,
        email,
        phone: phone.trim() || undefined,
        turbonumber: turbonumber.trim() || undefined,
        subject,
        message,
        requestTitle: modalTitle,
        submittedAt: new Date().toISOString(),
        sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
      };
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Webhook svarte med ${res.status}`);
      }
      setSubmitted(true);
      handleClose();
      router.push("/takk");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Kunne ikke sende. Prøv igjen.");
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
            {modalTitle}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Lukk"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium text-slate-900">Takk for forespørselen!</p>
            <p className="mt-1 text-slate-600">Vi tar kontakt med deg så snart som mulig.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="mb-0.5 block text-sm font-medium text-slate-700">
                  Navn <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="Ditt navn"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-0.5 block text-sm font-medium text-slate-700">
                  E-post <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="din@epost.no"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="turbonumber" className="mb-0.5 block text-sm font-medium text-slate-700">
                  Turbonummer <span className="text-slate-400">(valgfritt)</span>
                </label>
                <input
                  id="turbonumber"
                  type="text"
                  value={turbonumber}
                  onChange={(e) => setTurbonumber(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="f.eks. Garrett GT1749V"
                />
              </div>
              <div>
                <label htmlFor="subject" className="mb-0.5 block text-sm font-medium text-slate-700">
                  Emne <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="Hva gjelder forespørselen?"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="mb-0.5 block text-sm font-medium text-slate-700">
                Telefon <span className="text-slate-400">(valgfritt, 8 siffer, starter på 4 eller 9)</span>
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError(null);
                }}
                className={`w-full rounded-lg border px-3 py-2 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-sky-500/20 ${
                  phoneError ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-sky-500"
                }`}
                placeholder="f.eks. 41234567"
              />
              {phoneError && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {phoneError}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="mb-0.5 block text-sm font-medium text-slate-700">
                Melding <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                placeholder="Beskriv bilen din og hva du trenger..."
              />
            </div>
            {submitError && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {submitError}
              </p>
            )}
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={sending}
                className="flex-1 rounded-full bg-sky-600 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {sending ? "Sender…" : "Send forespørsel"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
              >
                Avbryt
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
