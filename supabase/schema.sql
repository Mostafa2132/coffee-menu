-- Coffee Menu (Supabase) schema
-- Run in Supabase SQL editor.

-- Extensions
create extension if not exists "uuid-ossp";

-- Categories
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  image text,
  sort_order int,
  created_at timestamptz not null default now()
);

-- Products
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid not null references public.categories(id) on delete cascade,
  title text not null,
  slug text not null unique,
  description text,
  price numeric not null,
  image text,
  gallery text[],
  ingredients text[],
  calories int,
  sizes text[],
  extras text[],
  available boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Banners
create table if not exists public.banners (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subtitle text,
  image text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Settings (single row)
create table if not exists public.settings (
  id int primary key generated always as identity,
  store_name text not null default 'Caffè Aurelia',
  phone text,
  address text,
  facebook text,
  instagram text,
  tiktok text,
  opening_hours text,
  updated_at timestamptz not null default now()
);

insert into public.settings (store_name)
select 'Caffè Aurelia'
where not exists (select 1 from public.settings);

-- Favorites
create table if not exists public.favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);

-- Optional: product views for analytics
create table if not exists public.product_views (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  user_id uuid references auth.users(id) on delete set null
);

-- RLS (simple starter policies)
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.banners enable row level security;
alter table public.settings enable row level security;
alter table public.favorites enable row level security;
alter table public.product_views enable row level security;

-- Public read (menu)
create policy "public read categories" on public.categories
  for select using (true);
create policy "public read products" on public.products
  for select using (true);
create policy "public read banners" on public.banners
  for select using (true);
create policy "public read settings" on public.settings
  for select using (true);

-- Favorites: user scoped
create policy "favorites read own" on public.favorites
  for select using (auth.uid() = user_id);
create policy "favorites modify own" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Views: allow insert
create policy "views insert" on public.product_views
  for insert with check (true);
create policy "views read" on public.product_views
  for select using (true);

-- Admin write (starter): any authenticated user can write.
-- For production, replace this with role-based checks (e.g. JWT claim `role = 'admin'`).
create policy "auth write categories" on public.categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write products" on public.products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write banners" on public.banners
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write settings" on public.settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

