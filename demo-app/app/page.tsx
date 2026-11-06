import { listBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

function formatDate(date: string) {
  const d = new Date(`${date}T00:00:00Z`);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit", timeZone: "UTC" }),
    month: d.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }).toUpperCase(),
    weekday: d.toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" }),
    full: d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  };
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Home() {
  const bookings = listBookings();
  const next = bookings[0];

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <header className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Northlight Studio</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Upcoming sessions</h1>
          <p className="mt-2 max-w-md text-stone-600">
            One session per day. New bookings are requested in the team chat and built by the ScopeRoom agents.
          </p>
        </div>
        <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 sm:inline">
          v0 · baseline
        </span>
      </header>

      <section aria-label="Summary" className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <p className="text-sm text-stone-500">Booked days</p>
          <p className="mt-1 text-3xl font-semibold">{bookings.length}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <p className="text-sm text-stone-500">Next session</p>
          <p className="mt-1 text-lg font-semibold">{next ? formatDate(next.date).full : "None"}</p>
        </div>
      </section>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="font-medium">No sessions booked yet.</p>
          <p className="mt-1 text-sm text-stone-500">Ask @scope in the client room to add a booking flow.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {bookings.map((b) => {
            const d = formatDate(b.date);
            return (
              <li
                key={b.id}
                className="group flex items-center gap-5 rounded-xl border border-stone-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-400"
              >
                <time dateTime={b.date} className="flex w-16 flex-col items-center rounded-lg bg-stone-900 py-2 text-white">
                  <span className="text-[10px] font-semibold tracking-widest text-emerald-300">{d.month}</span>
                  <span className="text-2xl font-semibold leading-none">{d.day}</span>
                </time>
                <div className="flex-1">
                  <p className="font-medium">{b.name}</p>
                  <p className="text-sm text-stone-500">
                    {d.weekday} · {b.email}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800"
                >
                  {initials(b.name)}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <footer className="mt-12 border-t border-stone-200 pt-6 text-sm text-stone-500">
        No booking form yet: that&apos;s <span className="font-mono text-stone-700">SCOPE-001</span>, built live in the demo.
      </footer>
    </main>
  );
}
