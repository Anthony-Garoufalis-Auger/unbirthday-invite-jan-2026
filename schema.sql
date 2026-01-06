-- Unbirthday RSVP table
-- Run this in the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  rsvp text not null check (rsvp in ('in', 'likely', 'prepared')),
  tea text,
  sweet text,
  teapot boolean,
  mushrooms boolean,
  costume text,
  notes text
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
create index if not exists rsvps_rsvp_idx on public.rsvps (rsvp);

alter table public.rsvps enable row level security;

-- With RLS enabled and no policies, anon users cannot read/insert directly.
-- All writes/reads go through your server routes using the service role key.
