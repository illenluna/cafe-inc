import { getUpcomingEvents } from "@/lib/events";

function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", timeZone: "UTC" }).format(date);
}

function formatEventTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(date);
}

export async function UpcomingEvents() {
  const events = await getUpcomingEvents(3);

  if (events.length === 0) {
    return <p className="hint-text">Nenhuma degustação marcada no momento — volte em breve.</p>;
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <span className="event-card__date">
            {formatEventDate(event.startsAt)} · {formatEventTime(event.startsAt)}
          </span>
          <h3 className="event-card__title">{event.title}</h3>
          <p className="event-card__desc">{event.description}</p>
          <span className="event-card__capacity">{event.capacity} vagas</span>
        </div>
      ))}
    </div>
  );
}
