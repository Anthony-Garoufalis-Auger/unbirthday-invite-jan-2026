import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function unauthorised() {
  return NextResponse.json({ error: "Not authorised." }, { status: 401 });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  const expected = process.env.ADMIN_TOKEN ?? "";

  if (!expected || token !== expected) return unauthorised();

  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("rsvps").select("*").order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? [], { headers: { "cache-control": "no-store" } });
}
