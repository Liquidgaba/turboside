"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type OpenModalOptions = { title?: string };

type ModalContextType = {
  isOpen: boolean;
  modalTitle: string | null;
  openModal: (options?: OpenModalOptions) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  const openModal = useCallback((options?: OpenModalOptions) => {
    setModalTitle(options?.title ?? null);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setOpen(false);
    setTimeout(() => setModalTitle(null), 300);
  }, []);

  useEffect(() => {
    const openIfHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#forespørsel") {
        setOpen(true);
      }
    };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    return () => window.removeEventListener("hashchange", openIfHash);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, modalTitle, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
