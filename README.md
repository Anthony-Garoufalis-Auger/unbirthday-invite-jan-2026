# Very Merry Unbirthday Tea Party — RSVP app (Next.js + Supabase)

Option B: a proper RSVP web app using **Next.js (App Router)** + **Supabase Postgres**.

## Quick start
1) In Supabase SQL Editor, run `schema.sql`
2) Create `.env.local`:

```bash
SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
ADMIN_TOKEN="a-long-random-secret"
```

3) Install + run:

```bash
npm install
npm run dev
```

## Features
- Invite page + RSVP form (writes to Supabase)
- Public RSVP counts (no personal data)
- Admin ledger at `/admin` (protected by `ADMIN_TOKEN`)
- “Add to Calendar” link (downloads an .ics file)
