import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ReservationsTable } from "@/components/admin/ReservationsTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reservas — Admin · Café Inc.",
};

export default async function AdminReservasPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: [{ date: "asc" }, { slot: "asc" }],
  });

  return (
    <div>
      <p className="eyebrow">Admin</p>
      <h2>Reservas</h2>
      <div className="mt-6">
        <ReservationsTable reservations={reservations} />
      </div>
    </div>
  );
}
