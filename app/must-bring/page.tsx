"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function Page() {
  const router = useRouter();
  const c = COPY["/must-bring"];

  return (
    <PageShell>
      <section className="panel">
        <h1>{c.title}</h1>
        {c.body.map((line: string) => (
          <p key={line}>{line}</p>
        ))}
        <p><strong>{c.question}</strong></p>
        <div className="row">
          <button className="primary" onClick={() => router.push("/should-bring")}>{c.buttons.yes}</button>
          <button onClick={() => router.push(`/repent?returnTo=/must-bring&reason=must-bring`)}>{c.buttons.no}</button>
        </div>
      </section>
    </PageShell>
  );
}
