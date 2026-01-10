"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function DressRefusalPage() {
  const router = useRouter();
  const c = COPY["/dress-refusal"];

  return (
    <PageShell>
      <section className="panel choice offset-dress-refusal dress-refusal-copy">
        <h1>{c.title}</h1>
        {c.body.map((line, index) => {
          if (index === 0 && line.startsWith("John")) {
            return (
              <p key={line}>
                <span className="initial">J</span>
                {line.slice(1)}
              </p>
            );
          }
          return <p key={line}>{line}</p>;
        })}
        <div className="row actions choices">
          <button className="primary choice" onClick={() => router.push("/must-bring")}>{c.button}</button>
        </div>
      </section>
    </PageShell>
  );
}
