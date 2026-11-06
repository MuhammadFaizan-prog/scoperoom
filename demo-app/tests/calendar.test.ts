import { describe, expect, it } from "vitest";
import { buildWeek, toneFor, weekLabel, weekStart } from "@/lib/calendar";
import type { Booking } from "@/lib/bookings";

const b = (date: string, name = "Ayesha Khan"): Booking => ({
  id: date,
  name,
  email: "a@example.com",
  date,
  createdAt: "2026-11-01T09:00:00.000Z",
});

describe("week calendar", () => {
  it("finds the Monday of a week", () => {
    expect(weekStart("2026-12-01")).toBe("2026-11-30"); // Tue -> Mon
    expect(weekStart("2026-11-30")).toBe("2026-11-30"); // Mon stays
    expect(weekStart("2026-12-06")).toBe("2026-11-30"); // Sun -> previous Mon
  });

  it("builds seven days and places bookings on their date", () => {
    const days = buildWeek("2026-11-30", [b("2026-12-01"), b("2026-12-03", "Bilal Ahmed")]);
    expect(days.map((d) => d.weekday)).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    expect(days[1].booking?.name).toBe("Ayesha Khan");
    expect(days[3].booking?.name).toBe("Bilal Ahmed");
    expect(days.filter((d) => d.booking)).toHaveLength(2);
  });

  it("labels a week across a month boundary", () => {
    expect(weekLabel(buildWeek("2026-11-30", []))).toBe("30 Nov – 6 Dec 2026");
  });

  it("gives the same client the same tone", () => {
    expect(toneFor("Ayesha Khan")).toBe(toneFor("Ayesha Khan"));
  });
});
