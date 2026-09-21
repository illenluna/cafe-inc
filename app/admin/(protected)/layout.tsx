import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "@/app/actions/auth";

export default function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <nav className="admin-nav">
        <div className="admin-nav__links">
          <Link href="/admin/eventos">Eventos</Link>
          <Link href="/admin/reservas">Reservas</Link>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="btn btn--ghost">
            Sair
          </button>
        </form>
      </nav>
      <main className="admin-main">{children}</main>
    </div>
  );
}
