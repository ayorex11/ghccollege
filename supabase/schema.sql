-- Run in the Supabase SQL editor. Public site reads published rows; only you (authenticated) write.
create table site_settings (key text primary key, value jsonb not null);
create table terms (id uuid primary key default gen_random_uuid(), session text, term text, starts date, ends date, note text, sort int default 0);
create table events (id uuid primary key default gen_random_uuid(), slug text unique, title text, date date, time text, location text, category text, body text, published bool default true);
create table posts (id uuid primary key default gen_random_uuid(), slug text unique, title text, category text, excerpt text, body text, cover_url text, published bool default false, published_at timestamptz default now());
create table albums (id uuid primary key default gen_random_uuid(), slug text unique, title text, cover_url text, sort int default 0);
create table photos (id uuid primary key default gen_random_uuid(), album_id uuid references albums on delete cascade, url text, caption text);
create table videos (id uuid primary key default gen_random_uuid(), title text, youtube_id text, sort int default 0);
create table testimonials (id uuid primary key default gen_random_uuid(), name text, relation text, quote text, approved bool default false);
create table content_blocks (key text primary key, title text, body jsonb); -- principal message, facilities, clubs, policies, subjects, routine
create table messages (id uuid primary key default gen_random_uuid(), name text, contact text, message text, created_at timestamptz default now(), read bool default false);
create table whatsapp_signups (id uuid primary key default gen_random_uuid(), name text, phone text, created_at timestamptz default now());

-- public read
create policy "read" on site_settings for select using (true);
create policy "read" on terms for select using (true);
create policy "read" on events for select using (published);
create policy "read" on posts for select using (published);
create policy "read" on albums for select using (true);
create policy "read" on photos for select using (true);
create policy "read" on videos for select using (true);
create policy "read" on testimonials for select using (approved);
create policy "read" on content_blocks for select using (true);
-- public can only insert forms
create policy "send" on messages for insert with check (true);
create policy "send" on whatsapp_signups for insert with check (true);
-- admin (signed in) full access
do $$ declare t text; begin
  foreach t in array array['site_settings','terms','events','posts','albums','photos','videos','testimonials','content_blocks','messages','whatsapp_signups'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "admin" on %I for all to authenticated using (true) with check (true)', t);
  end loop; end $$;

-- image storage (public bucket, only you can upload)
insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict do nothing;
create policy "images read" on storage.objects for select using (bucket_id = 'images');
create policy "images admin write" on storage.objects for all to authenticated using (bucket_id = 'images') with check (bucket_id = 'images');
