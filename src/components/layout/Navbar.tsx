"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/bill/enter", label: "Decode Bill" },
  { href: "/history", label: "History" },
  { href: "/legislation", label: "Legislation" },
  { href: "/assistance", label: "Assistance" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 px-6 md:px-8 py-4 flex items-center justify-between bg-white sticky top-0 z-50">
      <Link
        href="/"
        className="text-xl font-extrabold text-blue-950 tracking-tight hover:text-blue-800 transition-colors"
      >
        ⚡ RateShield
      </Link>
      <div className="flex gap-4 md:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors ${
              pathname === link.href || pathname?.startsWith(link.href + "/")
                ? "font-bold text-blue-950 border-b-2 border-blue-950 pb-0.5"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
