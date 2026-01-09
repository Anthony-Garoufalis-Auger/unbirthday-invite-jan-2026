"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function InvitationPage() {
  const router = useRouter();
  const c = COPY["/invitation"];

  return (
    <PageShell>
      <section className="panel">
        <h1>{c.title}</h1>
        {c.body.map((line) => (
          <p key={line}>{line}</p>
        ))}

        <p><strong>{c.question}</strong></p>

        <div className="row">
          <button className="primary" onClick={() => router.push("/details")}>
            {c.buttons.yes}
          </button>
          <button onClick={() => router.push("/repent?returnTo=/invitation&reason=invitation")}>
            {c.buttons.no}
          </button>
        </div>
      </section>
    </PageShell>
  );
}
