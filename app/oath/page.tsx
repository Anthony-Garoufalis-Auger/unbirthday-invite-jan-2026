"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function OathPage() {
  const router = useRouter();
  const c = COPY["/oath"];

  return (
    <PageShell>
      <section className="panel choice offset-oath">
        <h1>{c.title}</h1>
        {c.body.map((line, index) => (
          <p key={line}>{index === 1 ? <strong>{line}</strong> : line}</p>
        ))}

        <div className="row actions choices">
          <button className="primary choice" onClick={() => router.push("/thanks")}>
            {c.buttons.yes}
          </button>
          <button className="choice choice" onClick={() => router.push("/repent?returnTo=/oath&reason=oath")}>
            {c.buttons.no}
          </button>
        </div>
      </section>
    </PageShell>
  );
}
