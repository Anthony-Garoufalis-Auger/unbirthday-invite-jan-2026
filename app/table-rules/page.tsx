"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function Page() {
  const router = useRouter();
  const c = COPY["/table-rules"];

  return (
    <PageShell>
      <section className="panel choice">
        <h1>{c.title}</h1>
        {c.body.map((line: string) => (
          <p key={line}>{line}</p>
        ))}
        <p><strong>{c.question}</strong></p>
        <div className="row actions choices">
          <button className="primary choice" onClick={() => router.push("/oath")}>{c.buttons.yes}</button>
          <button className="choice choice" onClick={() => router.push(`/repent?returnTo=/table-rules&reason=table-rules`)}>{c.buttons.no}</button>
        </div>
      </section>
    </PageShell>
  );
}
