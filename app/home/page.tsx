"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function HomePage() {
  const router = useRouter();
  const c = COPY["/home"];

  return (
    <PageShell>
      <section className="panel choice home-panel-shift">
        <h1>{c.title}</h1>
        {c.body.map((line) => {
          if (line.trim() === "OFF WITH YOUR HEAD!") {
            return (
              <p key={line}>
                <strong>{line}</strong>
              </p>
            );
          }
          return <p key={line}>{line}</p>;
        })}
        <div className="row actions choices">
          <button
            className="primary choice"
            onClick={() => {
              window.location.href = "https://www.irishtimes.com/culture/books/the-story-of-alice-lewis-carroll-and-the-secret-history-of-wonderland-1.2187637";
            }}
          >
            {c.button}
          </button>
        </div>
      </section>
    </PageShell>
  );
}
