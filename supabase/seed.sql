-- Seed default cafe data (run after schema.sql)

-- Categories
insert into public.categories (name, slug, sort_order)
values
  ('Hot Coffee', 'hot-coffee', 1),
  ('Iced Coffee', 'iced-coffee', 2),
  ('Espresso', 'espresso', 3),
  ('Tea', 'tea', 4),
  ('Frappes', 'frappes', 5),
  ('Desserts', 'desserts', 6),
  ('Bakery', 'bakery', 7),
  ('Smoothies', 'smoothies', 8)
on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order;

-- Helpers
with c as (
  select id, slug from public.categories
)
insert into public.products (
  category_id, title, slug, description, price, image,
  ingredients, calories, sizes, extras, available, featured
)
select
  (select id from c where slug = 'hot-coffee'),
  'Caramel Latte',
  'caramel-latte',
  'Rich espresso, steamed milk, caramel drizzle.',
  4.80,
  '/placeholder.svg',
  array['Espresso','Milk','Caramel'],
  240,
  array['S','M','L'],
  array['Extra shot','Vanilla','Oat milk'],
  true,
  true
where not exists (select 1 from public.products where slug = 'caramel-latte');

with c as (select id from public.categories where slug = 'iced-coffee')
insert into public.products (category_id, title, slug, description, price, image, ingredients, calories, sizes, extras, available, featured)
select
  (select id from c),
  'Iced Mocha',
  'iced-mocha',
  'Chocolate, espresso, cold milk, smooth finish.',
  5.10,
  '/placeholder.svg',
  array['Espresso','Milk','Cocoa'],
  280,
  array['M','L'],
  array['Whipped cream','Extra cocoa'],
  true,
  true
where not exists (select 1 from public.products where slug = 'iced-mocha');

with c as (select id from public.categories where slug = 'espresso')
insert into public.products (category_id, title, slug, description, price, image, ingredients, calories, sizes, extras, available, featured)
select
  (select id from c),
  'Flat White',
  'flat-white',
  'Velvety micro-foam with a bold espresso base.',
  4.20,
  '/placeholder.svg',
  array['Espresso','Milk'],
  180,
  array['S','M'],
  array['Extra shot','Oat milk'],
  true,
  false
where not exists (select 1 from public.products where slug = 'flat-white');

with c as (select id from public.categories where slug = 'tea')
insert into public.products (category_id, title, slug, description, price, image, ingredients, calories, sizes, extras, available, featured)
select
  (select id from c),
  'Earl Grey Tea',
  'earl-grey-tea',
  'Bergamot-infused black tea. Elegant and aromatic.',
  3.10,
  '/placeholder.svg',
  array['Black tea','Bergamot'],
  0,
  array['M','L'],
  array['Honey','Lemon'],
  true,
  false
where not exists (select 1 from public.products where slug = 'earl-grey-tea');

with c as (select id from public.categories where slug = 'frappes')
insert into public.products (category_id, title, slug, description, price, image, ingredients, calories, sizes, extras, available, featured)
select
  (select id from c),
  'Matcha Frappe',
  'matcha-frappe',
  'Creamy matcha blended with ice and milk.',
  5.60,
  '/placeholder.svg',
  array['Matcha','Milk','Ice'],
  320,
  array['M','L'],
  array['Whipped cream','Vanilla'],
  true,
  true
where not exists (select 1 from public.products where slug = 'matcha-frappe');

with c as (select id from public.categories where slug = 'desserts')
insert into public.products (category_id, title, slug, description, price, image, ingredients, calories, sizes, extras, available, featured)
select
  (select id from c),
  'Chocolate Brownie',
  'chocolate-brownie',
  'Fudgy, warm, and deeply chocolatey.',
  3.90,
  '/placeholder.svg',
  array['Cocoa','Butter','Flour'],
  410,
  null,
  array['Vanilla ice cream'],
  true,
  false
where not exists (select 1 from public.products where slug = 'chocolate-brownie');

-- Banners
insert into public.banners (title, subtitle, image, active)
values
  ('New Seasonal Drinks', 'Try our caramel & citrus notes', '/placeholder.svg', true),
  ('Afternoon Offer', 'Any pastry + coffee bundle', '/placeholder.svg', true)
on conflict do nothing;

