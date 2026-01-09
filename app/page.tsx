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
import { loadStored, saveStored } from "@/lib/storage";

export default function LookingGlassPage() {
  // Next.js client-side navigation
  const router = useRouter();

  // Copy for "/"
  const c = COPY["/"];

  // Controlled input state for the user’s name
  const [name, setName] = useState("");

  /**
   * On first render, load any stored state (e.g., name)
   * so the input is prefilled if they come back.
   */
  useEffect(() => {
    const s = loadStored();
    if (s.name) setName(s.name);
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
    saveStored({ name: name.trim() || undefined });
    router.push("/not-invited");
  }

  function goWasNot() {
    saveStored({ name: name.trim() || undefined });
    router.push("/invitation");
  }

  return (
    <PageShell>
      {/* 
        IMPORTANT: We removed <section className="panel">.
        The "panel" class is what created the grey box and boxed UI feel.
        We use .copy (transparent) instead.
      */}
      <section className="copy">
        {/* Body lines */}
        {c.body.map((line) => (
          <p key={line}>{line}</p>
        ))}

        {/* A subtle separator; keep it if you like the pacing */}
        <hr />

        {/* Name prompt */}
        <p>
          <strong>{c.namePrompt}</strong>
        </p>

        {/* 
          Field wrapper: lets CSS remove input boxes and use an underline instead.
          Label + input are accessible (label is clickable).
        */}
        <div className="field">
          <label htmlFor="name">
            <span className="small">Name</span>
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>

        {/* Question */}
        <p>
          <strong>{c.question}</strong>
        </p>

        {/* Action buttons */}
        <div className="actions">
          <button className="button" onClick={goWas}>
            {c.buttons.yes}
          </button>

          <button className="button" onClick={goWasNot}>
            {c.buttons.no}
          </button>
        </div>
      </section>
    </PageShell>
  );
}
