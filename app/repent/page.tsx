"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { REPENT_REASON } from "@/lib/copy";

export default function RepentPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const returnTo = sp.get("returnTo") || "/";
  const reason = sp.get("reason") || "";
  const body = (reason && REPENT_REASON[reason]) ? REPENT_REASON[reason] : "You have displeased the table.";

  return (
    <PageShell>
      <section className="panel">
        <h1>YOU FAILED.</h1>
        <p>{body}</p>
        <div className="row">
          <button className="primary" onClick={() => router.push(returnTo)}>I shall try again.</button>
        </div>
      </section>
    </PageShell>
  );
}
