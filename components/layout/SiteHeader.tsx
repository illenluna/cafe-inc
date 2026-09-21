"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/sobre", label: "Sobre" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          Café Inc.
        </Link>
        <nav className="site-header__nav" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-header__link${pathname === link.href ? " is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#reservas" className="btn btn--primary cut cut--sm btn--compact">
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
}
