"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function ThanksPage() {
  const router = useRouter();
  const c = COPY["/thanks"];

  return (
    <PageShell>
      <section className="panel choice thanks-shift">
        <h1>{c.title}</h1>
        {c.body.map((line) => {
          if (line.trim() === "Thank you.") {
            return (
              <p key={line}>
                <strong>{line}</strong>
              </p>
            );
          }
          return <p key={line}>{line}</p>;
        })}
        <div className="row actions choices">
          <button className="primary choice" onClick={() => router.push("/home")}>{c.button}</button>
        </div>
      </section>
    </PageShell>
  );
}
