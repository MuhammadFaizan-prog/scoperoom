import { beforeEach, describe, expect, it } from "vitest";
import { addBooking, listBookings, resetBookings } from "@/lib/bookings";

describe("booking store (baseline)", () => {
  beforeEach(() => resetBookings());

  it("starts with the two seeded bookings", () => {
    expect(listBookings()).toHaveLength(2);
  });

  it("lists bookings earliest date first", () => {
    addBooking({ name: "Sara Ali", email: "sara@example.com", date: "2026-11-20" });
    expect(listBookings().map((b) => b.date)).toEqual(["2026-11-20", "2026-12-01", "2026-12-03"]);
  });

  it("adds a booking with a new id and createdAt", () => {
    const now = new Date("2026-11-07T08:00:00.000Z");
    const b = addBooking({ name: "Omar", email: "omar@example.com", date: "2026-12-10" }, now);
    expect(b.id).toBe("bk_3");
    expect(b.createdAt).toBe("2026-11-07T08:00:00.000Z");
    expect(listBookings()).toHaveLength(3);
  });

  it("returns a copy, so callers cannot mutate the store", () => {
    listBookings().pop();
    expect(listBookings()).toHaveLength(2);
  });
});
