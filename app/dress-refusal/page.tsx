"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function DressRefusalPage() {
  const router = useRouter();
  const c = COPY["/dress-refusal"];

  return (
    <PageShell>
      <section className="panel">
        <h1>{c.title}</h1>
        {c.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <div className="row actions choices">
          <button className="primary" onClick={() => router.push("/must-bring")}>{c.button}</button>
        </div>
      </section>
    </PageShell>
  );
}
