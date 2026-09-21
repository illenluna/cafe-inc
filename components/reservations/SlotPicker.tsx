"use client";

import { useEffect, useState } from "react";

type SlotAvailability = { time: string; remaining: number; full: boolean };
type DayAvailability = { date: string; closed: boolean; slots: SlotAvailability[] };

export function SlotPicker({
  date,
  selectedSlot,
  onSelect,
}: {
  date: string;
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
}) {
  const [availability, setAvailability] = useState<DayAvailability | null>(null);

  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    fetch(`/api/disponibilidade?data=${date}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: DayAvailability) => {
        if (!cancelled) setAvailability(data);
      });
    return () => {
      cancelled = true;
    };
  }, [date]);

  if (!date) {
    return <p className="hint-text">Escolha uma data para ver os horários.</p>;
  }

  // Derived, not stored: true whenever we haven't yet received data for the currently selected date.
  const loading = !availability || availability.date !== date;

  if (loading) {
    return <p className="hint-text">Carregando horários…</p>;
  }
  if (availability.closed) {
    return <p className="hint-text">Fechamos às segundas — escolha outro dia.</p>;
  }

  return (
    <div className="slot-grid" role="group" aria-label="Horários disponíveis">
      {availability.slots.map((slot) => (
        <button
          key={slot.time}
          type="button"
          className="slot"
          disabled={slot.full}
          aria-pressed={selectedSlot === slot.time}
          onClick={() => onSelect(slot.time)}
        >
          {slot.time}
          {slot.full ? " · Lotado" : ""}
        </button>
      ))}
    </div>
  );
}
