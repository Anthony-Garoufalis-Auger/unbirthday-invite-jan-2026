"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { COPY } from "@/lib/copy";
import { loadStored, saveStored } from "@/lib/storage";

export default function RegretsPage() {
  const router = useRouter();
  const c = COPY["/regrets"];
  const [note, setNote] = useState("");
  const [showNoteField, setShowNoteField] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const typingTimers = useRef<number[]>([]);
  const redirectTimer = useRef<number | null>(null);

  const farewellLines = [
    "Message transcribed and sealed.",
    "Thank you.",
    "Now enjoy this article over some tea.",
  ];

  useEffect(() => {
    setNote("");
    saveStored({ regret_note: undefined });
  }, []);

  useEffect(() => {
    if (!submitted) return;

    typingTimers.current.forEach((id) => window.clearTimeout(id));
    typingTimers.current = [];
    if (redirectTimer.current) window.clearTimeout(redirectTimer.current);
    setTypedLines([]);

    let lineIndex = 0;
    let charIndex = 0;

    const typeNext = () => {
      const currentLine = farewellLines[lineIndex];
      if (!currentLine) return;

      if (charIndex <= currentLine.length) {
        const next = currentLine.slice(0, charIndex);
        setTypedLines((prev) => {
          const updated = [...prev];
          updated[lineIndex] = next;
          return updated;
        });
        charIndex += 1;
        typingTimers.current.push(window.setTimeout(typeNext, 70));
        return;
      }

      lineIndex += 1;
      charIndex = 0;
      if (lineIndex < farewellLines.length) {
        typingTimers.current.push(window.setTimeout(typeNext, 600));
      }
    };

    typeNext();
    redirectTimer.current = window.setTimeout(() => {
      window.location.href = "https://www.irishtimes.com/culture/books/the-story-of-alice-lewis-carroll-and-the-secret-history-of-wonderland-1.2187637";
    }, 4000);

    return () => {
      typingTimers.current.forEach((id) => window.clearTimeout(id));
      typingTimers.current = [];
      if (redirectTimer.current) window.clearTimeout(redirectTimer.current);
    };
  }, [submitted]);

  async function submit() {
    setErr(null);
    saveStored({ regret_note: note });

    try {
      const res = await fetch("/api/regrets", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ note }),
      });
      if (!res.ok && res.status !== 404) {
        const t = await res.text();
        throw new Error(t || "Failed to submit");
      }
      setSubmitted(true);
    } catch (e: any) {
      setErr(e?.message || "Failed to submit (soft)");
      setSubmitted(true);
    }
  }

  return (
    <PageShell>
      <section className="panel choice regrets-shift">
        <h1>{c.title}</h1>
        {c.body.map((line) => (
          <p key={line}>{line}</p>
        ))}

        {showNoteField && !submitted && (
          <div className="field regrets-note">
            <label>
              <textarea
                rows={5}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder="Your regrets…"
                aria-label="Your regrets"
              />
            </label>
            <p className="small choice regrets-hint">
              <span className="hint-desktop">Press Enter to submit</span>
              <span className="hint-mobile">Tap Send/Done to Submit</span>
            </p>
          </div>
        )}

        {err && <p className="small choice">{err}</p>}
        {submitted && (
          <div className="small choice" aria-live="polite">
            {farewellLines.map((line, i) => (
              <p key={line}>{typedLines[i] || ""}</p>
            ))}
          </div>
        )}

        {!showNoteField && !submitted && (
          <div className="row actions choices">
            <button className="primary choice" onClick={() => setShowNoteField(true)}>{c.submit}</button>
            <button className="choice choice" onClick={() => router.push("/details")}>{c.reconsider}</button>
          </div>
        )}
      </section>
    </PageShell>
  );
}
