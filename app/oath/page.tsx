"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";

export default function OathPage() {
  const router = useRouter();
  const c = COPY["/oath"];
  const [checked, setChecked] = useState(false);

  return (
    <PageShell>
      <section className="panel">
        <h1>{c.title}</h1>
        {c.body.map((line) => (
          <p key={line}>{line}</p>
        ))}

        <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{ width: 18, height: 18, marginTop: 3 }} />
          <span>{c.checkbox}</span>
        </label>

        <div className="row">
          <button className="primary" disabled={!checked} onClick={() => router.push("/thanks")}>
            {c.buttons.yes}
          </button>
          <button onClick={() => router.push("/repent?returnTo=/oath&reason=oath")}>
            {c.buttons.no}
          </button>
        </div>
      </section>
    </PageShell>
  );
}
