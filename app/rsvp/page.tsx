"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";
import { loadStored, saveStored } from "@/lib/storage";

export default function RsvpPage() {
  const router = useRouter();
  const c = COPY["/rsvp"];

  const [showLedger, setShowLedger] = useState(false);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState(c.options[0]);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const s = loadStored();
    if (s.name) setName(s.name);
    if (s.attendance) setAttendance(s.attendance);
  }, []);

  async function submit() {
    setSubmitting(true);
    setErr(null);
    saveStored({ name: name.trim() || undefined, attendance });

    // Optional: if your repo has an API route, this will work; if not, it just skips.
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: name.trim(), attendance }),
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

        <p><strong>{c.question}</strong></p>

        <div className="row">
          <button className="primary" onClick={() => setShowLedger(true)}>{c.buttons.yes}</button>
          <button onClick={() => router.push("/regrets")}>{c.buttons.no}</button>
        </div>

        {showLedger && (
          <>
            <hr />
            <p><strong>{c.ledgerTitle}</strong></p>

            <label>
              <span className="small">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </label>

            <label>
              <span className="small">Choose one</span>
              <select value={attendance} onChange={(e) => setAttendance(e.target.value)}>
                {c.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

            {err && <p className="small">{err}</p>}

            <div className="row">
              <button className="primary" disabled={submitting || !name.trim()} onClick={submit}>
                {submitting ? "…" : c.submit}
              </button>
            </div>
          </>
        )}
      </section>
    </PageShell>
  );
}
