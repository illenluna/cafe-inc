"use client";

import { useActionState, useState } from "react";
import { Field } from "@/components/ui/Field";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { SlotPicker } from "./SlotPicker";
import { createReservationAction, type ReservationFormState } from "@/app/actions/reservations";
import { MAX_PARTY_SIZE } from "@/lib/availability";
import { todayIsoDate } from "@/lib/dates";

const initialState: ReservationFormState = { status: "idle" };
const PARTY_SIZES = Array.from({ length: MAX_PARTY_SIZE }, (_, i) => i + 1);

export function ReservationForm() {
  const [state, formAction] = useActionState(createReservationAction, initialState);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);

  return (
    <form action={formAction} className="reservation-form">
      <div className="field-row">
        <Field label="Nome" htmlFor="customerName" error={state.fieldErrors?.customerName}>
          <input id="customerName" name="customerName" type="text" required autoComplete="name" />
        </Field>
        <Field label="Telefone" htmlFor="phone" error={state.fieldErrors?.phone}>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="(11) 90000-0000" />
        </Field>
      </div>

      <div className="field-row mt-4">
        <Field label="Pessoas" htmlFor="partySize" error={state.fieldErrors?.partySize}>
          <select id="partySize" name="partySize" defaultValue="2" required>
            {PARTY_SIZES.map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "pessoa" : "pessoas"}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Data" htmlFor="date" error={state.fieldErrors?.date}>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={todayIsoDate()}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setSlot(null);
            }}
          />
        </Field>
      </div>

      <div className="field mt-4">
        <label htmlFor="slot-group">Horário</label>
        <div id="slot-group">
          <SlotPicker date={date} selectedSlot={slot} onSelect={setSlot} />
        </div>
        <input type="hidden" name="slot" value={slot ?? ""} />
        {state.fieldErrors?.slot && <span className="field__error">{state.fieldErrors.slot}</span>}
      </div>

      <div className="mt-4">
        <Field label="Observações (opcional)" htmlFor="notes">
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Alguma preferência? Grupo maior que 10? Conte pra gente."
          />
        </Field>
      </div>

      <div className="mt-6">
        <SubmitButton pendingLabel="Reservando…">Confirmar reserva</SubmitButton>
      </div>

      {state.status !== "idle" && state.message && (
        <p className={`form-message form-message--${state.status === "success" ? "success" : "error"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
