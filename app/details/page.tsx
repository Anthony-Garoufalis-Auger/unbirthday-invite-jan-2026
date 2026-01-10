"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";
import { loadStored, saveStored } from "@/lib/storage";

export default function DetailsPage() {
  const router = useRouter();
  const c = COPY["/details"];

  async function submitRsvp(rsvp: "in" | "likely" | "no", next: string, attendance: string) {
    const stored = loadStored();
    const name = stored.name?.trim() || "";
    const rsvpId = stored.rsvp_id;

    saveStored({ attendance });

    if (name) {
      try {
        const res = await fetch("/api/rsvp", {
          method: "POST",
          headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: rsvpId, name, rsvp }),
        });

        if (!res.ok && res.status !== 404) {
          await res.text();
        }
      } catch {
        // Soft-fail and still continue the flow.
      }
    }

    router.push(next);
  }

  return (
    <PageShell>
      <section className="panel choice offset-half offset-details">
        <h1>{c.title}</h1>

        {c.body.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}

        <p><strong>{c.question}</strong></p>

        <div className="row actions choices details-choices">
          <button
            className="primary choice"
            onClick={() => submitRsvp("in", "/dress", "I shall attend")}
          >
            {c.buttons.yes}
          </button>
          <button
            className="choice choice"
            onClick={() => submitRsvp("likely", "/dress", "I may attend")}
          >
            {c.buttons.maybe}
          </button>
          <button
            className="choice choice"
            onClick={() => submitRsvp("no", "/regrets", "I refuse this invitation.")}
          >
            {c.buttons.no}
          </button>
        </div>
      </section>
    </PageShell>
  );
}
