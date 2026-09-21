import Link from "next/link";
import type { Event } from "@prisma/client";
import { deleteEventAction } from "@/app/actions/events";

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "UTC" }).format(date);
}

export function EventsTable({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return <p className="hint-text">Nenhum evento cadastrado ainda.</p>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Quando</th>
          <th>Título</th>
          <th>Vagas</th>
          <th aria-label="Ações" />
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{formatDateTime(event.startsAt)}</td>
            <td>{event.title}</td>
            <td>{event.capacity}</td>
            <td>
              <div className="btn-row">
                <Link href={`/admin/eventos/${event.id}/editar`} className="btn btn--ghost">
                  Editar
                </Link>
                <form action={deleteEventAction.bind(null, event.id)}>
                  <button type="submit" className="btn btn--ghost">
                    Excluir
                  </button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
