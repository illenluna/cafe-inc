import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventById } from "@/lib/events";
import { updateEventAction } from "@/app/actions/events";
import { EventForm } from "@/components/admin/EventForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Editar evento — Admin · Café Inc.",
};

export default async function EditarEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  const boundSaveAction = updateEventAction.bind(null, event.id);

  return (
    <div>
      <p className="eyebrow">Admin</p>
      <h2>Editar degustação</h2>
      <div className="mt-6">
        <EventForm saveEventAction={boundSaveAction} event={event} submitLabel="Salvar alterações" />
      </div>
    </div>
  );
}
