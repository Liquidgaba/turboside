import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/turbo", label: "Turbo" },
  { href: "/turboer", label: "Turboer" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="turbotilbil.no"
              width={160}
              height={40}
              className="h-12 w-auto"
            />
          </Link>
          <nav className="flex flex-wrap justify-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} turbotilbil.no. Alle rettigheter reservert.
        </p>
      </div>
    </footer>
  );
}
