"use client";

import { useEffect, useState } from "react";

type RSVPRow = {
  id: string;
  created_at: string;
  name: string;
  rsvp: "in" | "likely" | "prepared";
  tea: string | null;
  sweet: string | null;
  teapot: boolean | null;
  mushrooms: boolean | null;
  costume: string | null;
  notes: string | null;
};

function prettyRsvp(v: RSVPRow["rsvp"]) {
  if (v === "in") return "🫖 in";
  if (v === "likely") return "🐇 likely";
  return "👑 prepared";
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [rows, setRows] = useState<RSVPRow[] | null>(null);
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = window.localStorage.getItem("admin_token");
    if (t) setToken(t);
  }, []);

  async function load(t: string) {
    setErr("");
    setRows(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/rsvps?token=${encodeURIComponent(t)}`, { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data?.error ?? "Not authorised.");
        return;
      }
      setRows(data as RSVPRow[]);
    } catch {
      setErr("Network error.");
    } finally {
      setLoading(false);
    }
  }

  function onSaveAndLoad() {
    window.localStorage.setItem("admin_token", token);
    load(token);
  }

  return (
    <main className="container choice">
      <div className="card choice">
        <header>
          <div className="smallcaps choice">Admin</div>
          <h1>RSVP ledger</h1>
          <p className="sub choice">Enter your admin token. Keep it secret. Keep it safe.</p>
        </header>

        <div className="grid choice" style={{ gridTemplateColumns: "1fr" }}>
          <section className="section choice" aria-label="Admin token">
            <h2>Token</h2>
            <label htmlFor="token">ADMIN_TOKEN</label>
            <input
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste token"
              autoComplete="off"
            />
            <div style={{ marginTop: 12 }}>
              <button className="choice choice" type="button" onClick={onSaveAndLoad} disabled={!token || loading}>
                {loading ? "Loading…" : "Load RSVPs"}
              </button>
              {err && (
                <p className="fineprint choice" style={{ color: "#ffd7b3" }}>
                  {err}
                </p>
              )}
              <p className="fineprint choice">
                <a href="/">Back to invite</a>
              </p>
            </div>
          </section>

          {rows && (
            <section className="section choice" aria-label="RSVP list" style={{ marginTop: 14 }}>
              <h2>Responses ({rows.length})</h2>

              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      {["When", "Name", "RSVP", "Tea", "Sweet", "Teapot", "🍄", "Costume", "Notes"].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "10px 8px",
                            borderBottom: "1px solid var(--line)",
                            color: "var(--text)",
                            fontSize: 13,
                            whiteSpace: "nowrap"
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id}>
                        <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)", whiteSpace: "nowrap" }}>
                          {new Date(r.created_at).toLocaleString("en-CA")}
                        </td>
                        <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)", whiteSpace: "nowrap" }}>
                          {r.name}
                        </td>
                        <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)", whiteSpace: "nowrap" }}>
                          {prettyRsvp(r.rsvp)}
                        </td>
                        <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>{r.tea ?? ""}</td>
                        <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>{r.sweet ?? ""}</td>
                        <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>
                          {r.teapot ? "yes" : ""}
                        </td>
                        <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>
                          {r.mushrooms ? "yes" : ""}
                        </td>
                        <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>{r.costume ?? ""}</td>
                        <td style={{ padding: "10px 8px", borderBottom: "1px solid var(--line)" }}>{r.notes ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="fineprint choice" style={{ marginTop: 12 }}>
                Tip: you can copy/paste this table into a spreadsheet.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
