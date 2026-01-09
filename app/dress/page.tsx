"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function DressPage() {
  const router = useRouter();
  const c = COPY["/dress"];

  return (
    <PageShell>
      <section className="panel">
        <h1>{c.title}</h1>
        {c.body.map((line, idx) => (
          line === "" ? null : <p key={`${line}-${idx}`}>{line}</p>
        ))}
        <p><strong>{c.question}</strong></p>
        <div className="row">
          <button className="primary" onClick={() => router.push("/must-bring")}>{c.buttons.yes}</button>
          <button onClick={() => router.push("/dress-refusal")}>{c.buttons.no}</button>
        </div>
      </section>
    </PageShell>
  );
}
