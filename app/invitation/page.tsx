"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function InvitationPage() {
  const router = useRouter();
  const c = COPY["/invitation"];
  const bodyLines = c.body;

  return (
    <PageShell>
      <section className="panel choice offset-invitation invitation-copy invitation-shift">
        {bodyLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p><strong>{c.question}</strong></p>
        <div className="row actions choices">
          <button className="primary choice" onClick={() => router.push("/details")}>
            {c.buttons.yes}
          </button>
          <button className="choice choice" onClick={() => router.push("/repent?returnTo=/invitation&reason=invitation")}>
            {c.buttons.no}
          </button>
        </div>
      </section>
    </PageShell>
  );
}
