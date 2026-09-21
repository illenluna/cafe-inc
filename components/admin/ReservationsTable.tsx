import type { Reservation } from "@prisma/client";

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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
