"use client";

import { ModalProvider, useModal } from "@/context/ModalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

function SiteLayoutInner({ children }: { children: React.ReactNode }) {
  const { isOpen, modalTitle, openModal, closeModal } = useModal();

  return (
    <>
      <Header onOpenModal={openModal} />
      <main>{children}</main>
      <Footer />
      <ContactModal isOpen={isOpen} onClose={closeModal} title={modalTitle} />
    </>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <SiteLayoutInner>{children}</SiteLayoutInner>
    </ModalProvider>
  );
}
