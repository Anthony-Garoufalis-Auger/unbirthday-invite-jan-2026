import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type RSVP = {
  name: string;
  rsvp: "in" | "likely" | "prepared";
  tea?: string;
  sweet?: string;
  teapot?: boolean;
  mushrooms?: boolean;
  costume?: string;
  notes?: string;
  botField?: string;
};

function cleanText(v: unknown, max = 500): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (!s) return null;
  return s.slice(0, max);
}

export async function POST(req: Request) {
  let body: RSVP | null = null;
  try {
    body = (await req.json()) as RSVP;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (body?.botField) return NextResponse.json({ ok: true });

  const name = cleanText(body?.name, 120);
  const rsvp = body?.rsvp;

  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!["in", "likely", "prepared"].includes(rsvp as string)) {
    return NextResponse.json({ error: "Invalid RSVP value." }, { status: 400 });
  }

  const tea = cleanText(body?.tea, 160);
  const sweet = cleanText(body?.sweet, 160);
  const costume = cleanText(body?.costume, 160);
  const notes = cleanText(body?.notes, 800);

  const teapot = typeof body?.teapot === "boolean" ? body.teapot : null;
  const mushrooms = typeof body?.mushrooms === "boolean" ? body.mushrooms : null;

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("rsvps").insert({
    name,
    rsvp,
    tea,
    sweet,
    teapot,
    mushrooms,
    costume,
    notes
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
