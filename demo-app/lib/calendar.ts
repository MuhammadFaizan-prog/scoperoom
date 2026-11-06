import type { Booking } from "./bookings";

export type Day = {
  /** YYYY-MM-DD */
  date: string;
  weekday: string;
  dayOfMonth: number;
  booking?: Booking;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Monday of the week containing `date` (YYYY-MM-DD), in UTC. */
export function weekStart(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  const offset = (d.getUTCDay() + 6) % 7; // Mon = 0
  d.setUTCDate(d.getUTCDate() - offset);
  return toISO(d);
}

/** The seven days from `start` (a Monday), each with the booking on it, if any. */
export function buildWeek(start: string, bookings: Booking[]): Day[] {
  const byDate = new Map(bookings.map((b) => [b.date, b]));
  return WEEKDAYS.map((weekday, i) => {
    const d = new Date(`${start}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + i);
    const date = toISO(d);
    return { date, weekday, dayOfMonth: d.getUTCDate(), booking: byDate.get(date) };
  });
}

/** "30 Nov – 6 Dec 2026" */
export function weekLabel(days: Day[]): string {
  const fmt = (iso: string, withYear: boolean) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      ...(withYear ? { year: "numeric" } : {}),
      timeZone: "UTC",
    });
  return `${fmt(days[0].date, false)} – ${fmt(days[6].date, true)}`;
}

/** Stable pastel tone per client, so the same person keeps the same colour. */
export function toneFor(name: string): "sky" | "mint" | "rose" | "sand" {
  const tones = ["sky", "mint", "rose", "sand"] as const;
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return tones[h % tones.length];
}
