/**
 * In-memory booking store for the ScopeRoom demo.
 *
 * Deliberately small. The baseline lists bookings and can add one with no
 * validation and no double-booking check: that is the work the client asks
 * for in the demo (SCOPE-001), so the build agent has a real change to make.
 */

export type Booking = {
  id: string;
  name: string;
  email: string;
  /** Calendar date, YYYY-MM-DD. */
  date: string;
  createdAt: string;
};

export type NewBooking = Pick<Booking, "name" | "email" | "date">;

const seed: Booking[] = [
  {
    id: "bk_1",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    date: "2026-12-01",
    createdAt: "2026-11-01T09:00:00.000Z",
  },
  {
    id: "bk_2",
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    date: "2026-12-03",
    createdAt: "2026-11-02T10:30:00.000Z",
  },
];

let bookings: Booking[] = [...seed];
let counter = seed.length;

/** All bookings, earliest date first. Returns a copy. */
export function listBookings(): Booking[] {
  return [...bookings].sort((a, b) => a.date.localeCompare(b.date));
}

/** Adds a booking as given. No validation yet (see SCOPE-001 in the demo). */
export function addBooking(input: NewBooking, now: Date = new Date()): Booking {
  counter += 1;
  const booking: Booking = {
    id: `bk_${counter}`,
    name: input.name,
    email: input.email,
    date: input.date,
    createdAt: now.toISOString(),
  };
  bookings.push(booking);
  return booking;
}

/** Test helper: restore the seeded state. */
export function resetBookings(): void {
  bookings = [...seed];
  counter = seed.length;
}
