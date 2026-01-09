"use client";

import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function NotInvitedPage() {
  const router = useRouter();
  const c = COPY["/not-invited"];

  return (
    <PageShell>
      <section className="panel choice">
        <h1>{c.title}</h1>
        {c.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <div className="row actions choices">
          <button className="primary choice" onClick={() => router.push("/")}>
            {c.button}
          </button>
        </div>
      </section>
    </PageShell>
  );
}
