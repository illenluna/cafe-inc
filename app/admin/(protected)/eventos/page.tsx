import type { Metadata } from "next";
import { getAllEvents } from "@/lib/events";
import { createEventAction } from "@/app/actions/events";
import { EventForm } from "@/components/admin/EventForm";
import { EventsTable } from "@/components/admin/EventsTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eventos — Admin · Café Inc.",
};

export default async function AdminEventosPage() {
  const events = await getAllEvents();

  return (
    <div>
      <p className="eyebrow">Admin</p>
      <h2>Sessões de degustação</h2>

      <div className="mt-6">
        <h3>Nova degustação</h3>
        <EventForm saveEventAction={createEventAction} submitLabel="Criar evento" />
      </div>

      <div className="mt-8">
        <h3>Todas as degustações</h3>
        <EventsTable events={events} />
      </div>
    </div>
  );
}
