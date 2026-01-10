# Copilot / AI agent instructions — Unbirthday RSVP app

Purpose
- Help maintainers and AI agents make focused changes in this Next.js + Supabase RSVP app.

Big picture
- This is a Next.js (App Router) single-repo web app that stores RSVPs in Supabase Postgres.
- Frontend pages live under `app/` (server components by default). API routes are under `app/api/*` and run server-side.
- Server-side Supabase access is centralized in `lib/supabaseAdmin.ts` which requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

Key files and responsibilities
- `README.md` — quick start (run `schema.sql` in Supabase, create `.env.local`, then `npm install` + `npm run dev`).
- `schema.sql` — DB schema; apply in Supabase before using the app.
- `lib/supabaseAdmin.ts` — instantiate Supabase admin client (server-only). Use this for any server-side DB access.
- `app/api/rsvp/route.ts` — public POST endpoint that inserts into `rsvps` table. Example: validates fields, ignores `botField`, uses `supabase.from('rsvps').insert(...)`.
- `app/api/admin/rsvps/route.ts` — admin GET; authorises using `ADMIN_TOKEN` (query param must match `process.env.ADMIN_TOKEN`).
- `app/admin/page.tsx` — client-side admin UI that stores the token in `localStorage` key `admin_token` and calls the admin API.
- `app/api/calendar/route.ts` — returns an `.ics` calendar file; pattern: construct string array, join with `\r\n` and return with `content-disposition` header.

Patterns and conventions (project-specific)
- Server vs client: files with `use client` are client components (e.g., `app/admin/page.tsx`). Otherwise assume server components and server-only APIs.
- API handlers use Next.js Route Handlers: export `GET`, `POST` functions and return `NextResponse` (see `app/api/*/route.ts`).
- Environment secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_TOKEN` are required for server operations. `lib/supabaseAdmin.ts` throws if missing.
- Admin auth: the admin UI keeps the admin token in `localStorage` and sends it as a query param to `/api/admin/rsvps?token=...`. The server compares against `process.env.ADMIN_TOKEN`.
- Data validation: simple, inline sanitizers (e.g., `cleanText()` in `app/api/rsvp/route.ts`) are used rather than a validation library — follow the same approach for small inputs.
- Anti-bot: the RSVP POST checks `botField` and silently accepts (no-op) when populated.

Developer workflows and commands
- Local dev: create `.env.local` with the three env vars, then run:

```bash
npm install
npm run dev
```

- Build and start:
```bash
npm run build
npm run start
```

- Lint: `npm run lint` (uses `eslint` + `eslint-config-next`).

Debugging notes
- When hitting API routes locally, server logs appear in the terminal where `next dev` runs.
- If Supabase errors occur, check that `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct and that the `rsvps` table exists per `schema.sql`.
- Use the admin UI (`/admin`) by pasting `ADMIN_TOKEN` into the token field (saved to `localStorage` key `admin_token`).

Integration points & external deps
- Supabase JS (`@supabase/supabase-js`) — used server-side via `lib/supabaseAdmin.ts`.
- No other remote services are used; the calendar endpoint returns a static ICS payload.

How to make safe edits
- For new server DB changes: update `schema.sql`, write server-side migration notes, and update `app/api` routes that read/write affected tables.
- Preserve the simple, explicit validation style used in `app/api/rsvp/route.ts`.
- Keep secrets out of client bundles: never import or expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code.

Quick references (examples)
- Insert RSVP: `app/api/rsvp/route.ts` uses `supabase.from('rsvps').insert({...})`.
- Admin check: `app/api/admin/rsvps/route.ts` compares `token` query param to `process.env.ADMIN_TOKEN`.
- Admin token storage: `app/admin/page.tsx` uses `localStorage.getItem('admin_token')` and `localStorage.setItem('admin_token', token')`.

If anything above is unclear or you want more examples (tests, CI, or migration steps), tell me which area to expand.
