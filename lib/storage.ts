const KEY = "unbirthday_rsvp_v1";

export type Stored = {
  name?: string;
  attendance?: string;
  regret_note?: string;
  rsvp_id?: string;
};

export function loadStored(): Stored {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Stored) : {};
  } catch {
    return {};
  }
}

export function saveStored(patch: Partial<Stored>) {
  if (typeof window === "undefined") return;
  const current = loadStored();
  window.localStorage.setItem(KEY, JSON.stringify({ ...current, ...patch }));
}
