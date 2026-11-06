import { listBookings } from "@/lib/bookings";
import { buildWeek, toneFor, weekLabel, weekStart } from "@/lib/calendar";

export const dynamic = "force-dynamic";

const TONES = {
  sky: "bg-sky-100 text-sky-950",
  mint: "bg-emerald-100 text-emerald-950",
  rose: "bg-pink-100 text-pink-950",
  sand: "bg-amber-100 text-amber-950",
} as const;

const NAV = [
  { section: "Main", items: [{ label: "Dashboard", icon: "grid" }, { label: "Sessions", icon: "cal", active: true }, { label: "Clients", icon: "users" }] },
  { section: "Delivery", items: [{ label: "Scopes", icon: "doc" }, { label: "Ledger", icon: "ledger" }] },
  { section: "Other", items: [{ label: "Settings", icon: "cog" }] },
];

function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {name === "grid" && (<g {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>)}
      {name === "cal" && (<g {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></g>)}
      {name === "users" && (<g {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.8c1.6.8 2.6 2.6 3 5.2" /></g>)}
      {name === "doc" && (<g {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></g>)}
      {name === "ledger" && (<g {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></g>)}
      {name === "cog" && (<g {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></g>)}
      {name === "search" && (<g {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></g>)}
      {name === "plus" && (<g {...p}><path d="M12 5v14M5 12h14" /></g>)}
      {name === "lock" && (<g {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></g>)}
    </svg>
  );
}

export default function Home() {
  const bookings = listBookings();
  const start = weekStart(bookings[0]?.date ?? "2026-11-30");
  const days = buildWeek(start, bookings);
  const booked = days.filter((d) => d.booking).length;

  return (
    <div className="min-h-screen bg-[#ebe8e6] p-4 lg:p-6">
      <div className="mx-auto flex max-w-[1440px] gap-4 rounded-[28px] bg-[#f7f6f4] p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 flex-col rounded-2xl bg-white/70 p-4 md:flex">
          <div className="mb-8 flex items-center gap-3 px-1">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d2b2d] font-serif text-lg text-white">N</span>
            <span className="text-lg font-medium tracking-tight">Northlight</span>
          </div>
          <nav className="flex-1 space-y-6">
            {NAV.map((g) => (
              <div key={g.section}>
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-stone-500">{g.section}</p>
                <ul className="space-y-1">
                  {g.items.map((it) => (
                    <li key={it.label}>
                      <span
                        aria-current={"active" in it && it.active ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] ${"active" in it && it.active ? "bg-[#2c4144] text-white shadow-sm" : "text-stone-700"}`}
                      >
                        <Icon name={it.icon} />
                        {it.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="mt-6 flex items-center gap-3 rounded-xl px-2 py-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-sm font-semibold text-amber-900">SA</span>
            <div className="leading-tight">
              <p className="text-sm font-medium">Studio Admin</p>
              <p className="text-xs text-stone-500">Northlight Studio</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 py-2">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h1 className="font-serif text-4xl tracking-tight text-stone-900">Sessions</h1>
            <span className="hidden items-center gap-2 rounded-full bg-stone-200/60 px-4 py-2 text-sm text-stone-500 sm:flex">
              <Icon name="search" /> Search clients
            </span>
          </div>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xl font-medium tracking-tight">
              {weekLabel(days).replace(/ \d{4}$/, "")} <span className="text-base font-normal text-stone-500">{days[6].date.slice(0, 4)}</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium">Week view</span>
              <span
                title="Not built yet: this is SCOPE-001, requested by the client in ScopeRoom"
                className="flex cursor-not-allowed items-center gap-2 rounded-full bg-[#2c4144]/40 px-4 py-2 text-sm font-medium text-white"
              >
                <Icon name="lock" /> New booking · SCOPE-001
              </span>
            </div>
          </div>

          <section aria-label="This week" className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <div className="grid grid-cols-7 border-b border-stone-200">
              {days.map((d) => (
                <div key={d.date} className="flex items-center justify-center gap-2 py-3 text-sm text-stone-700">
                  {d.booking ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1d2b2d] text-xs font-semibold text-white">{d.dayOfMonth}</span>
                  ) : (
                    <span className="text-stone-400">{d.dayOfMonth}</span>
                  )}
                  {d.weekday}
                </div>
              ))}
            </div>
            <div className="grid min-h-[340px] grid-cols-7 divide-x divide-stone-200">
              {days.map((d) => (
                <div key={d.date} className="p-2">
                  {d.booking ? (
                    <article className={`rounded-lg px-3 py-2 ${TONES[toneFor(d.booking.name)]}`}>
                      <p className="text-sm font-medium">{d.booking.name}</p>
                      <p className="truncate text-xs opacity-70">{d.booking.email}</p>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider opacity-60">Full-day session</p>
                    </article>
                  ) : (
                    <div className="flex h-16 items-center justify-center rounded-lg border border-dashed border-stone-200 text-xs text-stone-400">
                      Open
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["Booked this week", String(booked)],
              ["Open days", String(7 - booked)],
              ["Rule", "1 session / day"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-stone-200 bg-white px-5 py-4">
                <p className="text-sm text-stone-500">{k}</p>
                <p className="mt-1 text-2xl font-medium tracking-tight">{v}</p>
              </div>
            ))}
          </div>
        </main>

        {/* ScopeRoom panel */}
        <aside className="hidden w-80 shrink-0 flex-col rounded-2xl bg-[#1d2b2d] p-5 text-white xl:flex">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">ScopeRoom</p>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-6 h-20 w-20 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#c4b5fd_35%,#7dd3fc_60%,#f9a8d4_85%)] shadow-[0_0_60px_-10px_rgba(196,181,253,0.8)]" />
            <p className="text-white/80">Need a change to this app?</p>
            <p className="mt-1 text-2xl leading-snug">
              Ask <span className="font-serif italic text-violet-300">@scope</span> in the client room.
            </p>
            <ol className="mt-8 w-full space-y-2 text-left text-sm text-white/70">
              <li className="rounded-lg bg-white/5 px-3 py-2">1 · Scope writes SCOPE-&lt;id&gt; with ACs and hours</li>
              <li className="rounded-lg bg-white/5 px-3 py-2">2 · The approver signs it in the studio</li>
              <li className="rounded-lg bg-white/5 px-3 py-2">3 · Build ships it, Review checks every AC</li>
            </ol>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 text-sm text-white/50">
            <p className="text-xs text-white/40">Next up</p>
            <p className="text-white/80">SCOPE-001 · booking form, no double bookings</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
