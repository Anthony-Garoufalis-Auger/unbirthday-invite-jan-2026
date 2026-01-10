"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function Page() {
  const router = useRouter();
  const c = COPY["/should-bring"];

  return (
    <PageShell>
      <section className="panel choice offset-must-bring offset-should-bring">
        <h1>{c.title}</h1>
        {c.body.map((line: string) => (
          <p key={line}>{line}</p>
        ))}
        <p><strong>{c.question}</strong></p>
        <div className="row actions choices">
          <button className="primary choice" onClick={() => router.push("/could-bring")}>{c.buttons.yes}</button>
          <button className="choice choice" onClick={() => router.push(`/repent?returnTo=/should-bring&reason=should-bring`)}>{c.buttons.no}</button>
        </div>
      </section>
    </PageShell>
  );
}
