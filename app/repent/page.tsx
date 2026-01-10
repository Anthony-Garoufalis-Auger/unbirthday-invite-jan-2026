"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageShell } from "@/components/PageShell";

let lastRepentSrc: string | null = null;

const LINES: Record<string, string> = {
  invitation: "You have refused my invitation? How unwise.",
  details: "You refuse the particulars? Typical of you.",
  dress: "You refuse to dress the part? The table frowns.",
  "must-bring": "You refuse the necessities? You get the boot at the door.",
  "should-bring": "You refuse to perform? How timid.",
  "could-bring": "You refuse the optional offering? Suit yourself.",
  "mustnt-bring": "You refuse restraint? Typical of you.",
  "table-rules": "You refuse the rules? The table will notice.",
  oath: "You refuse enthusiasm? A pity.",
};

function safeReturnTo(raw: string | null): string {
  if (!raw) return "/";
  if (raw.startsWith("/")) return raw;
  try {
    const decoded = decodeURIComponent(raw);
    return decoded.startsWith("/") ? decoded : "/";
  } catch {
    return "/";
  }
}

function RepentInner() {
  const router = useRouter();
  const params = useSearchParams();

  const reason = params.get("reason") ?? "invitation";
  const returnTo = safeReturnTo(params.get("returnTo"));

  const line = useMemo(() => {
    return LINES[reason] ?? LINES.invitation;
  }, [reason]);

  const repentSrc = useMemo(() => {
    const next =
      lastRepentSrc === "/illustrations/p17-repent.webp"
        ? "/illustrations/p18-repent.webp"
        : "/illustrations/p17-repent.webp";
    lastRepentSrc = next;
    return next;
  }, [reason, returnTo]);

  return (
    <PageShell illustrationSrc={repentSrc}>
      <section className="panel choice">
        <h1>YOU FAILED.</h1>
        <p>{line}</p>

        <div className="row actions choices">
          <button className="primary choice" onClick={() => router.push(returnTo)}>
            I shall try again.
          </button>
        </div>
      </section>
    </PageShell>
  );
}

export default function RepentPage() {
  return (
    <Suspense fallback={<PageShell><section className="panel choice" /></PageShell>}>
      <RepentInner />
    </Suspense>
  );
}
