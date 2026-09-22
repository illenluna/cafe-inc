import type { Reservation } from "@prisma/client";
import { prisma } from "./prisma";
import { isoDateToUtcMidnight } from "./dates";
import {
  TABLES_PER_SLOT,
  generateDailySlots,
  isOpenDay,
  type DayAvailability,
} from "./availability";

export async function getAvailabilityForDate(isoDate: string): Promise<DayAvailability> {
  const dateUTC = isoDateToUtcMidnight(isoDate);

  if (!isOpenDay(dateUTC)) {
    return { date: isoDate, closed: true, slots: [] };
  }

  // Each reservation occupies one table, regardless of party size.
  const counts = await prisma.reservation.groupBy({
    by: ["slot"],
    where: { date: dateUTC, status: "CONFIRMED" },
    _count: { _all: true },
  });
  const usedBySlot = new Map(counts.map((row) => [row.slot, row._count._all]));

  const slots = generateDailySlots().map((time) => {
    const used = usedBySlot.get(time) ?? 0;
    const remaining = Math.max(0, TABLES_PER_SLOT - used);
    return { time, remaining, full: remaining <= 0 };
  });

  return { date: isoDate, closed: false, slots };
}

export type BookReservationInput = {
  customerName: string;
  phone: string;
  partySize: number;
  date: string; // YYYY-MM-DD
  slot: string; // HH:mm
  notes?: string;
};

export type BookReservationResult = { ok: true; reservation: Reservation } | { ok: false; error: string };

class SlotFullError extends Error {
  constructor(public slot: string) {
    super(`Slot full: ${slot}`);
  }
}

export async function bookReservation(input: BookReservationInput): Promise<BookReservationResult> {
  const dateUTC = isoDateToUtcMidnight(input.date);

  if (!isOpenDay(dateUTC)) {
    return { ok: false, error: "Fechamos às segundas — escolha outro dia." };
  }
  if (!generateDailySlots().includes(input.slot)) {
    return { ok: false, error: "Esse horário não existe — escolha um horário da lista." };
  }

  try {
    const reservation = await prisma.$transaction(async (tx) => {
      // Serializes bookings for the same date+slot so two people can't both grab the last table at once.
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${input.date} || ${input.slot}))`;

      const used = await tx.reservation.count({
        where: { date: dateUTC, slot: input.slot, status: "CONFIRMED" },
      });

      if (used + 1 > TABLES_PER_SLOT) {
        throw new SlotFullError(input.slot);
      }

      return tx.reservation.create({
        data: {
          customerName: input.customerName,
          phone: input.phone,
          partySize: input.partySize,
          date: dateUTC,
          slot: input.slot,
          notes: input.notes,
        },
      });
    });

    return { ok: true, reservation };
  } catch (error) {
    if (error instanceof SlotFullError) {
      return { ok: false, error: `Esse horário lotou às ${error.slot} — escolha outro horário.` };
    }
    throw error;
  }
}
