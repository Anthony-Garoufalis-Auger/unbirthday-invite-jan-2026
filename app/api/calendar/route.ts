import { NextResponse } from "next/server";

export async function GET() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Forum of Folly//Unbirthday Tea Party//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:unbirthday-tea-party-20260125@forum-of-folly",
    "DTSTAMP:20250101T000000Z",
    "DTSTART;TZID=America/Toronto:20260125T110000",
    "DTEND;TZID=America/Toronto:20260125T160000",
    "SUMMARY:Very Merry Unbirthday Tea Party",
    "LOCATION:5628 avenue du Parc #304, Montréal, QC",
    "DESCRIPTION:Bring your favourite tea and a teacup. Dress for the occasion. RSVP via the invite page.",
    "END:VEVENT",
    "END:VCALENDAR",
    ""
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": "attachment; filename=\"very-merry-unbirthday-tea-party.ics\"",
      "cache-control": "no-store"
    }
  });
}
