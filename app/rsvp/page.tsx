"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";
import { loadStored, saveStored } from "@/lib/storage";

export default function RsvpPage() {
  const router = useRouter();
  const c = COPY["/rsvp"];

  /**
   * We want TypeScript to know attendance can ONLY be one of the options in COPY.
   * But anything from storage is just "string", so we validate before setting it.
   */
  const options = useMemo(() => c.options as readonly string[], [c.options]);
  type AttendanceOption = (typeof options)[number];

  function isAttendanceOption(v: unknown): v is AttendanceOption {
    return typeof v === "string" && options.includes(v);
  }

  const [showLedger, setShowLedger] = useState(false);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<string>(c.options[0]);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const s = loadStored();
    if (s.name) setName(s.name);
    if (isAttendanceOption(s.attendance)) setAttendance(s.attendance);
  }, [options]);

  async function submit() {
    setSubmitting(true);
    setErr(null);

    const trimmed = name.trim();
    saveStored({ name: trimmed || undefined, attendance });

    // Optional: if your repo has an API route, this will work; if not, it just skips.
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: trimmed, attendance }),
      });

      // Ignore 404 (API not implemented yet)
      if (!res.ok && res.status !== 404) {
        const t = await res.text();
        throw new Error(t || "Failed to submit");
      }
    } catch (e: any) {
      // Soft-fail: still let the user proceed, but show the error in case you want to wire it.
      setErr(e?.message || "Failed to submit (soft)");
    } finally {
      setSubmitting(false);
      router.push("/dress");
    }
  }

  return (
    <PageShell>
      <section className="panel">
        <h1>{c.title}</h1>

        <p>
          <strong>{c.question}</strong>
        </p>

        <div className="row">
          <button className="primary" onClick={() => setShowLedger(true)}>
            {c.buttons.yes}
          </button>
          <button onClick={() => router.push("/regrets")}>{c.buttons.no}</button>
        </div>

        {showLedger && (
          <>
            <p>
              <strong>{c.ledgerTitle}</strong>
            </p>

            <label>
              <span className="small">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>

            <label>
              <span className="small">Choose one</span>
              <select
                value={attendance}
                onChange={(e) => {
                  const v = e.target.value;
                  if (isAttendanceOption(v)) setAttendance(v);
                }}
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {err && <p className="small">{err}</p>}

            <div className="row">
              <button
                className="primary"
                disabled={submitting || !name.trim()}
                onClick={submit}
              >
                {submitting ? "…" : c.submit}
              </button>
            </div>
          </>
        )}
      </section>
    </PageShell>
  );
}
