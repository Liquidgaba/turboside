import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";
import { BASE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Turbo til bilen din – turbotilbil.no",
  description:
    "Send forespørsel på turbo til bilen din. Vi tar kontakt og sender deg et uforpliktende tilbud. Enkelt og raskt.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "turbotilbil.no",
    url: BASE_URL,
    title: "Turbo til bilen din – turbotilbil.no",
    description:
      "Send forespørsel på turbo til bilen din. Vi tar kontakt og sender deg et uforpliktende tilbud. Enkelt og raskt.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turbo til bilen din – turbotilbil.no",
    description:
      "Send forespørsel på turbo til bilen din. Uforpliktende tilbud. Enkelt og raskt.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
