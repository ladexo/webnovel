-- Children of Fate - Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Novels table
create table if not exists novels (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text default '',
  cover_image text default '',
  author text not null,
  genre text default '',
  status text default 'ongoing' check (status in ('ongoing', 'completed', 'hiatus')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Chapters table
create table if not exists chapters (
  id uuid default uuid_generate_v4() primary key,
  novel_id uuid references novels(id) on delete cascade not null,
  title text not null,
  chapter_number integer not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(novel_id, chapter_number)
);

-- Pages table
create table if not exists pages (
  id uuid default uuid_generate_v4() primary key,
  chapter_id uuid references chapters(id) on delete cascade not null,
  page_number integer not null,
  image_url text not null,
  created_at timestamptz default now(),
  unique(chapter_id, page_number)
);

-- Indexes
create index if not exists idx_chapters_novel_id on chapters(novel_id);
create index if not exists idx_pages_chapter_id on pages(chapter_id);
create index if not exists idx_novels_slug on novels(slug);

-- Row Level Security
alter table novels enable row level security;
alter table chapters enable row level security;
alter table pages enable row level security;

-- Public read access
create policy "Public can read novels" on novels for select using (true);
create policy "Public can read chapters" on chapters for select using (true);
create policy "Public can read pages" on pages for select using (true);

-- Authenticated write access (for admin)
create policy "Auth can insert novels" on novels for insert with check (true);
create policy "Auth can update novels" on novels for update using (true);
create policy "Auth can delete novels" on novels for delete using (true);

create policy "Auth can insert chapters" on chapters for insert with check (true);
create policy "Auth can update chapters" on chapters for update using (true);
create policy "Auth can delete chapters" on chapters for delete using (true);

create policy "Auth can insert pages" on pages for insert with check (true);
create policy "Auth can update pages" on pages for update using (true);
create policy "Auth can delete pages" on pages for delete using (true);

-- Storage bucket for images
-- Note: Create a bucket called 'novel-images' in Supabase Dashboard > Storage
-- Set it to public for image access
