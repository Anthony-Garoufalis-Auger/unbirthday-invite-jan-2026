import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Very Merry Unbirthday Tea Party",
  description:
    "RSVP for the Very Merry Unbirthday Tea Party — Alice in Wonderland (1951) themed tea on Sunday 25 January 2026."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
