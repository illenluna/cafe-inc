// Pure constants/helpers only — no Prisma import here. This module is imported by
// client components (e.g. ReservationForm) for MAX_PARTY_SIZE, so pulling in the
// database client would leak server-only/Node code (pg) into the browser bundle.

// Assumptions (adjust here if the café's hours/capacity change):
export const OPEN_TIME = "08:00";
export const CLOSE_TIME = "18:00";
export const SLOT_MINUTES = 30;
export const LAST_SEATING_BUFFER_MIN = 60;
export const TABLES_PER_SLOT = 6;
export const CLOSED_WEEKDAY = 1; // Monday, per Date.prototype.getUTCDay()
export const MAX_PARTY_SIZE = 10;

function toMinutes(hhmm: string): number {
  const [hours, minutes] = hhmm.split(":").map(Number);
  return hours * 60 + minutes;
}

function toHHMM(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function isOpenDay(dateUTC: Date): boolean {
  return dateUTC.getUTCDay() !== CLOSED_WEEKDAY;
}

export function generateDailySlots(): string[] {
  const open = toMinutes(OPEN_TIME);
  const lastSeating = toMinutes(CLOSE_TIME) - LAST_SEATING_BUFFER_MIN;
  const slots: string[] = [];
  for (let t = open; t <= lastSeating; t += SLOT_MINUTES) {
    slots.push(toHHMM(t));
  }
  return slots;
}

export type SlotAvailability = { time: string; remaining: number; full: boolean };
export type DayAvailability = { date: string; closed: boolean; slots: SlotAvailability[] };
