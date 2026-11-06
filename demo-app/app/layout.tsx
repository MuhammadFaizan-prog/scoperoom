import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Bookings",
  description: "Demo app changed by the ScopeRoom agents.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#ebe8e6] text-stone-900 antialiased">{children}</body>
    </html>
  );
}
