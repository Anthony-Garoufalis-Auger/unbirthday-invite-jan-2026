"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function DetailsPage() {
  const router = useRouter();
  const c = COPY["/details"];

  return (
    <PageShell>
      <section className="panel">
        <h1>{c.title}</h1>

        {c.body.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}

        <p><strong>{c.question}</strong></p>

        <div className="row">
          <button className="primary" onClick={() => router.push("/rsvp")}>
            {c.buttons.yes}
          </button>
          <button onClick={() => router.push("/repent?returnTo=/details&reason=details")}>
            {c.buttons.no}
          </button>
        </div>
      </section>
    </PageShell>
  );
}
