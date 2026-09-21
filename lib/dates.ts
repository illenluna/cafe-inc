export function isoDateToUtcMidnight(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00.000Z`);
}

export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function combineDateTimeUtc(isoDate: string, hhmm: string): Date {
  return new Date(`${isoDate}T${hhmm}:00.000Z`);
}
