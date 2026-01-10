"use client";

/**
 * Looking-glass landing page ("/")
 *
 * Goals:
 * - Keep your existing routing + storage logic intact.
 * - Remove the "panel" (grey box) UI so copy sits on a transparent background.
 * - Use minimal, semantic markup and CSS classes that you’ll define in globals.css:
 *   - .illustration  (the image)
 *   - .copy          (the text block)
 *   - .field         (label + input without a boxed background)
 *   - .actions       (button row)
 *   - .button        (simple, transparent button styling)
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// PageShell is your wrapper that likely renders the route’s illustration.
// We'll keep it so the route→illustration mapping continues to work.
import { PageShell } from "@/components/PageShell";

// COPY holds the text content for each route; COPY["/"] is the home page copy.
import { COPY } from "@/lib/copy";

// localStorage helpers so the name persists as the user moves through the flow.
import { saveStored } from "@/lib/storage";

export default function LookingGlassPage() {
  // Next.js client-side navigation
  const router = useRouter();

  // Copy for "/"
  const c = COPY["/"];
  const presenceLine = c.body.find((line) => line.startsWith("A presence lingers"));
  const restBody = presenceLine ? c.body.filter((line) => line !== presenceLine) : c.body;

  // Controlled input state for the user’s name
  const [name, setName] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    // Reset stored name on entry so the prompt is fresh.
    saveStored({ name: undefined });
    setName("");
    setShowQuestion(false);
  }, []);

  /**
   * If the user answers "yes" (born on the 25th),
   * we store their name and send them to the next route.
   *
   * NOTE: Your original code had the routes inverted relative to the copy:
   * - "I was." should typically go to /invitation
   * - "I was not." should go to /not-invited
   *
   * I’m keeping YOUR existing behaviour exactly as-is.
   * If you want me to flip them to match the story, say so.
   */
  function goWas() {
    const trimmed = name.trim();
    if (!trimmed) return;
    saveStored({ name: trimmed });
    router.push("/not-invited");
  }

  function goWasNot() {
    const trimmed = name.trim();
    if (!trimmed) return;
    saveStored({ name: trimmed || undefined });
    if (trimmed) {
      fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.id) saveStored({ rsvp_id: data.id });
        })
        .catch(() => {
          // Soft-fail: keep flow moving even if logging fails.
        });
    }
    router.push("/invitation");
  }

  return (
    <PageShell>
      {/* 
        IMPORTANT: We removed <section className="panel">.
        The "panel" class is what created the grey box and boxed UI feel.
        We use .copy (transparent) instead.
      */}
      <section className="copy page1-copy offset-home">
        {/* Body lines */}
        {restBody.map((line) => (
          <p key={line}>{line}</p>
        ))}

        {!showQuestion ? (
          <>
            {/* Name prompt */}
            <div className="page1-field-shift">
              {presenceLine && <p>{presenceLine}</p>}
              <p className="name-prompt">
                <strong>{c.namePrompt}</strong>
              </p>

              {/* 
                Field wrapper: lets CSS remove input boxes and use an underline instead.
                Label + input are accessible (label is clickable).
              */}
              <div className="field">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && name.trim()) {
                      const trimmed = name.trim();
                      saveStored({ name: trimmed });
                      setShowQuestion(true);
                    }
                  }}
                  placeholder="Your name"
                  autoComplete="name"
                  className="flicker-placeholder"
                />
              </div>
              <p className="small submit-hint">
                <span className="hint-desktop">Press Enter to submit</span>
                <span className="hint-mobile">Tap Send/Done to Submit</span>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Question */}
            <div className="page1-question-shift">
              <p className="prompt">
                <strong>{c.question}</strong>
              </p>

              {/* Action buttons */}
              <div className="actions choices home-choices" role="group" aria-label="Your answer">
                <button className="button choice" data-choice="no" onClick={goWasNot}>
                  {c.buttons.no}
                </button>

                <button className="button choice" data-choice="yes" onClick={goWas}>
                  {c.buttons.yes}
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </PageShell>
  );
}
