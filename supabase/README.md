# Supabase Store Archive

The public catalog is now maintained in `src/lib/store/products.ts`, and Selar handles product checkout and payment processing. The former Supabase inventory setup is no longer part of the active store.

`migrations/20260914_create_store.sql` is retained as historical setup for deployments that used the earlier inventory prototype. Do not use it to configure a new public catalog.
