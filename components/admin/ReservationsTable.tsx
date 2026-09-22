import type { Reservation } from "@prisma/client";
import { cancelReservationAction } from "@/app/actions/reservations";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeZone: "UTC" }).format(date);
}

export function ReservationsTable({ reservations }: { reservations: Reservation[] }) {
  if (reservations.length === 0) {
    return <p className="hint-text">Nenhuma reserva ainda.</p>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Horário</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Pessoas</th>
          <th>Status</th>
          <th aria-label="Ações" />
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>{formatDate(reservation.date)}</td>
            <td>{reservation.slot}</td>
            <td>{reservation.customerName}</td>
            <td>{reservation.phone}</td>
            <td>{reservation.partySize}</td>
            <td>{reservation.status === "CONFIRMED" ? "Confirmada" : "Cancelada"}</td>
            <td>
              {reservation.status === "CONFIRMED" && (
                <form action={cancelReservationAction.bind(null, reservation.id)}>
                  <button type="submit" className="btn btn--ghost">
                    Cancelar
                  </button>
                </form>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
