import { listBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function Home() {
  const bookings = listBookings();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">Studio Bookings</p>
        <h1 className="mt-1 text-3xl font-semibold">Upcoming sessions</h1>
        <p className="mt-2 text-stone-600">One session per day. Booking requests go through the team chat.</p>
      </header>

      {bookings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-300 p-8 text-center text-stone-500">
          No sessions booked yet.
        </div>
      ) : (
        <ul className="divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
          {bookings.map((b) => (
            <li key={b.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium">{b.name}</p>
                <p className="text-sm text-stone-500">{b.email}</p>
              </div>
              <time dateTime={b.date} className="text-sm font-medium text-stone-700">
                {formatDate(b.date)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
