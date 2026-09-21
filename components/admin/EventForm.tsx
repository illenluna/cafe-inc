"use client";

import { useActionState } from "react";
import type { Event } from "@prisma/client";
import { Field } from "@/components/ui/Field";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { EventFormState } from "@/app/actions/events";

const initialState: EventFormState = { status: "idle" };

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function toTimeInputValue(date: Date): string {
  return date.toISOString().slice(11, 16);
}

export function EventForm({
  saveEventAction,
  event,
  submitLabel = "Salvar evento",
}: {
  saveEventAction: (prevState: EventFormState, formData: FormData) => Promise<EventFormState>;
  event?: Event;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(saveEventAction, initialState);

  return (
    <form action={formAction} className="reservation-form">
      <Field label="Título" htmlFor="title" error={state.fieldErrors?.title}>
        <input id="title" name="title" type="text" required defaultValue={event?.title} />
      </Field>

      <div className="mt-4">
        <Field label="Descrição" htmlFor="description" error={state.fieldErrors?.description}>
          <textarea id="description" name="description" rows={3} required defaultValue={event?.description} />
        </Field>
      </div>

      <div className="field-row mt-4">
        <Field label="Data" htmlFor="date" error={state.fieldErrors?.date}>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={event ? toDateInputValue(event.startsAt) : undefined}
          />
        </Field>
        <Field label="Horário" htmlFor="time" error={state.fieldErrors?.time}>
          <input
            id="time"
            name="time"
            type="time"
            required
            defaultValue={event ? toTimeInputValue(event.startsAt) : undefined}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Vagas" htmlFor="capacity" error={state.fieldErrors?.capacity}>
          <input id="capacity" name="capacity" type="number" min={1} required defaultValue={event?.capacity ?? 12} />
        </Field>
      </div>

      <div className="mt-6">
        <SubmitButton pendingLabel="Salvando…">{submitLabel}</SubmitButton>
      </div>

      {state.status === "error" && state.message && (
        <p className="form-message form-message--error">{state.message}</p>
      )}
    </form>
  );
}
