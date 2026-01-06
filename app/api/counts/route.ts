import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("rsvps").select("rsvp");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const counts = { total: 0, in: 0, likely: 0, prepared: 0 };
  for (const row of data ?? []) {
    counts.total += 1;
    if (row.rsvp === "in") counts.in += 1;
    else if (row.rsvp === "likely") counts.likely += 1;
    else if (row.rsvp === "prepared") counts.prepared += 1;
  }

  return NextResponse.json(counts, { headers: { "cache-control": "no-store" } });
}
