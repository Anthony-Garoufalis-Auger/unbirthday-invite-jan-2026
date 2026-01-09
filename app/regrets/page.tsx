"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";
import { loadStored, saveStored } from "@/lib/storage";

export default function RegretsPage() {
  const router = useRouter();
  const c = COPY["/regrets"];
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const s = loadStored();
    if (s.regret_note) setNote(s.regret_note);
  }, []);

  async function submit() {
    setErr(null);
    saveStored({ regret_note: note });

    try {
      const res = await fetch("/api/regrets", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ note }),
      });
      if (!res.ok && res.status !== 404) {
        const t = await res.text();
        throw new Error(t || "Failed to submit");
      }
      setSubmitted(true);
    } catch (e: any) {
      setErr(e?.message || "Failed to submit (soft)");
      setSubmitted(true);
    }
  }

  return (
    <PageShell>
      <section className="panel">
        <h1>{c.title}</h1>
        {c.body.map((line) => (
          <p key={line}>{line}</p>
        ))}

        <div className="field">
          <textarea
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Your regrets…"
            aria-label="Your regrets"
          />
        </div>

        {err && <p className="small">{err}</p>}
        {submitted && <p className="small">Noted.</p>}

        <div className="row">
          <button className="primary" onClick={submit}>{c.submit}</button>
          <button onClick={() => router.push("/rsvp")}>{c.reconsider}</button>
        </div>
      </section>
    </PageShell>
  );
}
