create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  is_store_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null check (char_length(description) between 10 and 1000),
  price numeric(12, 2) not null check (price >= 0),
  currency text not null default 'NGN' check (char_length(currency) = 3),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  status text not null default 'draft' check (status in ('active', 'draft')),
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products
for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_store_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and is_store_admin = true
  );
$$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;

create policy "Profiles are visible to their owner"
on public.profiles for select to authenticated
using (id = auth.uid());

create policy "Active products are public"
on public.products for select to anon, authenticated
using (status = 'active' or public.is_store_admin());

create policy "Store admins manage products"
on public.products for all to authenticated
using (public.is_store_admin())
with check (public.is_store_admin());

insert into public.products (name, slug, description, price, currency, stock_quantity, status, image_url)
values
  ('Langstroth Hive Complete Set', 'langstroth-hive-complete-set', 'A durable, field-ready Langstroth hive with brood box, supers, frames and a weather-resistant roof.', 85000, 'NGN', 12, 'active', 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80'),
  ('Ventilated Beekeeping Suit', 'ventilated-beekeeping-suit', 'Comfortable full-body protection designed for long inspections in hot African apiary conditions.', 48000, 'NGN', 18, 'active', 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=1000&q=80'),
  ('Stainless Steel Honey Extractor', 'stainless-steel-honey-extractor', 'Manual extractor for clean, efficient honey harvesting without damaging comb.', 215000, 'NGN', 4, 'active', 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1000&q=80'),
  ('Professional Smoker', 'professional-smoker', 'A dependable stainless-steel smoker with heat shield and bellows for calm, careful inspections.', 16500, 'NGN', 24, 'active', 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1000&q=80'),
  ('Hive Tool Set', 'hive-tool-set', 'Essential scraping, lifting and inspection tools for everyday apiary work.', 9500, 'NGN', 35, 'active', 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1000&q=80')
on conflict (slug) do nothing;

-- After creating your first Supabase Auth user, promote only that trusted account:
-- update public.profiles set is_store_admin = true where id = 'YOUR_AUTH_USER_UUID';
