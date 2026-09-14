# Macaney Store: Supabase setup

Create a Supabase project, then open its SQL Editor and run `migrations/20260914_create_store.sql` in full. The migration creates the inventory tables, seed products, profile trigger, and row-level security policies.

In Supabase Authentication, enable Email authentication and create the first store administrator. Copy that user’s UUID from the Users screen, then run this in the SQL Editor:

```sql
update public.profiles
set is_store_admin = true
where id = 'YOUR_AUTH_USER_UUID';
```

If the user was created before the migration ran, create its profile first:

```sql
insert into public.profiles (id, is_store_admin)
values ('YOUR_AUTH_USER_UUID', true)
on conflict (id) do update set is_store_admin = true;
```

Add these values locally and in the deployment provider’s environment settings. Use the project URL and publishable/anon key from Supabase’s Connect panel. Do not add a service-role key to the browser or to a `NEXT_PUBLIC_` variable.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

The public store reads only active listings. The admin panel can read, create, update, and delete products only after Supabase confirms that the signed-in profile has `is_store_admin = true`. Those restrictions are enforced by PostgreSQL row-level security, not merely by the user interface.
