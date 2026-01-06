"use client";

import { useEffect, useMemo, useState } from "react";

type Counts = {
  total: number;
  in: number;
  likely: number;
  prepared: number;
};

type FormState = {
  name: string;
  rsvp: "in" | "likely" | "prepared" | "";
  tea: string;
  sweet: string;
  teapot: boolean;
  mushrooms: boolean;
  costume: string;
  notes: string;
  botField: string;
};

function formatCount(n: number) {
  return new Intl.NumberFormat("en-CA").format(n);
}

export default function Page() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [form, setForm] = useState<FormState>({
    name: "",
    rsvp: "",
    tea: "",
    sweet: "",
    teapot: false,
    mushrooms: false,
    costume: "",
    notes: "",
    botField: ""
  });

  const address = useMemo(() => "5628 avenue du Parc — #304", []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/counts", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Counts;
        setCounts(data);
      } catch {}
    })();
  }, [status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong.");
        return;
      }

      setStatus("done");
      setMessage("RSVP received. Your name has been written in the Official Ledger (in jam).");

      setForm({
        name: "",
        rsvp: "",
        tea: "",
        sweet: "",
        teapot: false,
        mushrooms: false,
        costume: "",
        notes: "",
        botField: ""
      });
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <main className="container">
      <div className="card">
        <header>
          <div className="smallcaps">Forum of Folly summons</div>
          <h1>🐇🫖✨ Very Merry Unbirthday Tea Party ✨🫖🎩</h1>

          <p className="sub">
            You are cordially invited to <strong>a</strong> midday tea party to celebrate my <strong>UNBIRTHDAY</strong>{" "}
            (and likely yours too) 🎂✨
            <br />
            Merriment and revelry await us at the table of bad manners. Exorbitant amounts of tea and biscuits, and
            beautiful compatriots ready to partake in excessively caffeinated madness will be present at the table.
            <br />
            Luckily, Lewis <strong>Carroll</strong>’s birthday is on the 27th, so if we are rowdy enough maybe{" "}
            <em>his</em> spirit will feel inclined to grace us with an unbirthday visitation. 🍰⏳🫖
          </p>

          <div className="pills" aria-label="Key details">
            <div className="pill">Sunday 25 January 2026</div>
            <div className="pill">{address}</div>
            <div className="pill">First pour: 11:00am</div>
            <div className="pill">Last pour: 4:00pm (ish)</div>
          </div>

          <div className="warning">
            Arrive in “neutral chic” and you may meet the same <strong>fate</strong> as John Malcolm — in true Tea Party
            fashion.
          </div>

          <div className="fineprint">
            <a href="/api/calendar">Add to calendar (.ics)</a>
          </div>

          {counts && (
            <div className="badgeRow" aria-label="RSVP counts">
              <div className="badge">
                <strong>{formatCount(counts.total)}</strong>
                <span>Total</span>
              </div>
              <div className="badge">
                <strong>{formatCount(counts.in)}</strong>
                <span>🫖 I’m in</span>
              </div>
              <div className="badge">
                <strong>{formatCount(counts.likely)}</strong>
                <span>🐇 Likely</span>
              </div>
              <div className="badge">
                <strong>{formatCount(counts.prepared)}</strong>
                <span>👑 Fully prepared</span>
              </div>
            </div>
          )}
        </header>

        <div className="grid">
          <section aria-label="The details">
            <div className="section">
              <h2>RSVP</h2>
              <p>
                Reply with:
                <br />
                🫖 = I’m in
                <br />
                🐇 = Likely
                <br />
                👑 = I will arrive fully prepared — mentally, physically, emotionally, spiritually — for the occasion
                <br />
                <br />
                <strong>Come have some tea!</strong>
              </p>
            </div>

            <div className="section" style={{ marginTop: 14 }}>
              <h2>Dress for the occasion 👑🎀</h2>
              <p>Come as if you’ve stepped through the glass darkly:</p>
              <ul>
                <li>
                  Queens, flowers, rabbits, cats, cards, tramps, chimney sweeps, twins — a blend of Victorian
                  practicality and timeless childlike innocence — don’t be lame. 🐈‍⬛🃏
                </li>
                <li>
                  Bright colours, odd silhouettes, playful accessories, black <strong>Mary Jane</strong>-style shoes with
                  an ankle strap, gloves, bows, stripes — lean in, my friends. ✨
                </li>
              </ul>
            </div>

            <div className="section" style={{ marginTop: 14 }}>
              <h2>What you must bring (yes, must)</h2>
              <ul>
                <li>
                  <strong>Your favourite tea</strong> 🍵 (loose leaf, bags, bizarre florals, whatever you swear by)
                </li>
                <li>
                  <strong>A teacup</strong> ☕️ (bring your own vessel of dignity/absurdity)
                </li>
              </ul>

              <hr />

              <h2 style={{ marginTop: 0 }}>What you should bring</h2>
              <ul>
                <li>Appropriate attire (this is a tea party after all)</li>
                <li>
                  A short speech, a joke, a sonnet, or story appropriate for the occasion — to be read by you at the
                  table (or not by you).
                </li>
                <li>A song, to be sung solo or by the party.</li>
                <li>
                  <strong>A sweet to share</strong> 🍓 (mandatory): jam tarts, scones, Victoria sponge squares, Battenberg,
                  lemon drizzle loaf, treacle tart bites, Welsh cakes, trifle cups, shortbread, “Eat Me” biscuits,
                  marmalade sandwiches cut into dainty triangles.
                </li>
              </ul>

              <hr />

              <h2 style={{ marginTop: 0 }}>What you could bring</h2>
              <ul>
                <li>
                  <strong>Your teapot</strong> 🫖 (<strong>if</strong> you have one — the more character, the better)
                </li>
                <li>
                  🍄 Mushrooms. No pressure, no commentary, no weirdness — everyone minds their own Wonderland. The
                  Caterpillar will be happy.
                </li>
              </ul>

              <hr />

              <h2 style={{ marginTop: 0 }}>What you mustn’t bring</h2>
              <ul>
                <li>
                  A cellphone to the table. All phones will be put into a bowl upon entry. If you touch yours before you
                  leave, you will <em>feel the wrath of the table</em> ;)
                </li>
                <li>
                  A bad attitude (no <strong>Debbie</strong> Downers, no Igors, no hurried rabbits, no toxic energy, no
                  Victorian etiquette).
                </li>
              </ul>
            </div>

            <div className="section" style={{ marginTop: 14 }}>
              <h2>Table rules</h2>
              <p>
                If you gossip, you share. If you monologue, you do so with gusto.
                <br />
                If you are with your partner, no whispering or private arguments — you will be called out!
                <br />
                <br />
                Bring your best leaves, your most theatrical cup, and whatever version of yourself belongs at a table
                where <strong>madness</strong> and <strong>merriment</strong> take the <strong>reins</strong>. ☕️✨
              </p>
            </div>
          </section>

          <section aria-label="RSVP form">
            <form onSubmit={onSubmit}>
              <div className="section">
                <h2>RSVP form</h2>
                <p className="sub" style={{ margin: 0 }}>
                  Fill this in (it’s easier than being tarred and feathered).
                </p>

                <input
                  name="botField"
                  value={form.botField}
                  onChange={(e) => setForm({ ...form, botField: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  autoComplete="name"
                />

                <label htmlFor="rsvp">Will you attend?</label>
                <select
                  id="rsvp"
                  required
                  value={form.rsvp}
                  onChange={(e) => setForm({ ...form, rsvp: e.target.value as FormState["rsvp"] })}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  <option value="in">🫖 I’m in</option>
                  <option value="likely">🐇 Likely</option>
                  <option value="prepared">👑 Fully prepared</option>
                </select>

                <div className="row">
                  <div>
                    <label htmlFor="tea">Tea you’re bringing</label>
                    <input
                      id="tea"
                      value={form.tea}
                      onChange={(e) => setForm({ ...form, tea: e.target.value })}
                      placeholder="Earl Grey? Lapsang? Something unhinged?"
                    />
                  </div>
                  <div>
                    <label htmlFor="sweet">Sweet you’re bringing</label>
                    <input
                      id="sweet"
                      value={form.sweet}
                      onChange={(e) => setForm({ ...form, sweet: e.target.value })}
                      placeholder="Jam tarts? Battenberg? Welsh cakes?"
                    />
                  </div>
                </div>

                <div className="row">
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={form.teapot}
                        onChange={(e) => setForm({ ...form, teapot: e.target.checked })}
                        style={{ width: "auto", marginRight: 8 }}
                      />
                      I’m bringing a teapot 🫖
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={form.mushrooms}
                        onChange={(e) => setForm({ ...form, mushrooms: e.target.checked })}
                        style={{ width: "auto", marginRight: 8 }}
                      />
                      🍄 I may bring mushrooms
                    </label>
                  </div>
                </div>

                <label htmlFor="costume">Costume / character</label>
                <input
                  id="costume"
                  value={form.costume}
                  onChange={(e) => setForm({ ...form, costume: e.target.value })}
                  placeholder="Queen? Cat? Card? Chimney sweep?"
                />

                <label htmlFor="notes">Notes (arrival, allergies, dramatic declarations)</label>
                <textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="…"
                />

                <div style={{ marginTop: 12 }}>
                  <button type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "Submitting…" : "Send RSVP"}
                  </button>

                  {message && (
                    <p className="fineprint" style={{ color: status === "error" ? "#ffd7b3" : undefined }}>
                      {message}
                    </p>
                  )}

                  <div className="fineprint">
                    If you need buzzer specifics, DM me after you RSVP.
                    <br />
                    <a href="/admin">Admin</a>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
