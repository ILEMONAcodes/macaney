# Macaney Sustainable Solutions

Macaney Sustainable Solutions is a public website for practical, sustainable beekeeping in Africa. It introduces Macaney's training and apiary services, shares field guides and impact stories, captures prospective beekeeper enquiries, and connects visitors with Macaney's WhatsApp community. The site also includes ThinkBee, an AI-assisted beekeeping guide, and an equipment catalogue with an administrator-managed inventory.

## Technology

- Next.js 16 App Router with React 19 and TypeScript
- Tailwind CSS 4 for styling
- Framer Motion, Lottie, and Lucide React for interface animation and icons
- Supabase Auth and PostgreSQL for store administration and product inventory
- Google Apps Script / Google Sheets endpoint for recording lead form submissions
- OpenRouter chat completions API for ThinkBee

## Main pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage hero slideshow, services and media tickers, leadership, testimonials, animated impact counters, and community/newsletter section |
| `/about` | Macaney's mission and vision, founder profile, and image stories |
| `/services` | Beekeeping and commercial apiary services |
| `/contact` | Contact information and consultation enquiry form |
| `/ai-beekeeper` | ThinkBee chat interface for beekeeping questions |
| `/blog` | Editorial index of field guides and beekeeping articles |
| `/blog/[slug]` | Individual article pages generated from the local post catalogue |
| `/free-ebook` | Lead form and WhatsApp community flow for the “From Hive to Honey” guide |
| `/real-honey-guide` | Lead form and WhatsApp community flow for the Macaney Honey Complete Guide |
| `/store` | Public equipment catalogue and product discovery |
| `/store/shop` | Searchable and filterable equipment listings, cart, and WhatsApp order handoff |
| `/admin/store` | Authenticated product inventory management |

API endpoints:

- `POST /api/leads` validates required contact details and forwards lead fields and campaign attribution to the configured Google Apps Script endpoint.
- `POST /api/ai-keeper` validates a chat message and limited conversation history, then requests a ThinkBee response from OpenRouter.

## Getting started

Use Node.js compatible with the installed Next.js version. Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The production commands are:

```bash
npm run build
npm run start
```

ESLint is available with `npm run lint`.

## Environment variables

Create `.env.local` in the project root for local development, and configure the same server-side values in the deployment environment. Never commit credentials.

| Variable | Used for | Required when |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL in shared site configuration; defaults to `https://macaney.com` | Set for preview deployments or a different canonical host |
| `GOOGLE_SCRIPT_URL` | Google Apps Script web app URL that records lead submissions | Lead capture is enabled |
| `OPENROUTER_API_KEY` | Server-side authorization for ThinkBee model requests | ThinkBee chat is enabled |
| `OPENROUTER_MODEL` | Optional OpenRouter model override; defaults to `nvidia/nemotron-3.5-lightning:free` | Only when selecting a different model |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Store features are enabled |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable/anon key used by the browser client | Store features are enabled |

Example (replace the placeholders with values from the relevant providers):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=nvidia/nemotron-3.5-lightning:free
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

If a provider is not configured, its feature cannot complete the external request: ThinkBee returns a configuration response when its key is missing, lead submission reports a server error when the Apps Script URL is missing, and the store cannot load inventory without Supabase configuration.

## Lead capture and ebook downloads

The `/free-ebook` and `/real-honey-guide` pages collect a visitor's contact and beekeeping details. The lead API sends those fields, including available UTM campaign values, to Google Apps Script. After a successful submission, the visitor is prompted to open Macaney's WhatsApp community; the guide download is then made available in the success state. The join step is a client-side flow and does not verify WhatsApp membership.

Download assets are served directly from `public/`:

- `/macaney-honey-complete-guide.pdf` — Macaney Honey Complete Guide
- `/from-hive-to-honey-beginners-guide.docx` — From Hive to Honey beginner's guide

Because files in `public/` are public static assets, their URLs can be opened directly. The page flow provides the intended guided access, but it is not access control for the files.

## Store and Supabase setup

The store uses Supabase tables and policies defined in [`supabase/migrations/20260914_create_store.sql`](supabase/migrations/20260914_create_store.sql). Apply the migration in the Supabase SQL Editor. It creates `profiles` and `products`, adds profile and product timestamp triggers, seeds example inventory, and enables row-level security. Active products can be read publicly; product management is restricted to authenticated users whose profile has `is_store_admin = true`.

Create an administrator user in Supabase Auth and promote that user's profile using the SQL instructions in [`supabase/README.md`](supabase/README.md). Use only the publishable/anon key in the browser. Do not expose a Supabase service-role key through a `NEXT_PUBLIC_` variable.

The public catalogue reads active product rows. The admin screen supports sign-in and product create, update, and delete operations. The cart hands order details off to WhatsApp; it does not process payments or create a server-side order record.

## Project structure

```text
src/
  app/                 App Router pages, layouts, styles, and API routes
  components/          Shared layout, homepage, forms, store, blog, and UI components
  config/              Shared site configuration
  lib/                 Supabase client, blog content, service catalogue, and store types
  services/            Lead submission helpers
public/                Images, brand assets, and downloadable guides
supabase/              Database migration and store setup notes
```

The blog content is currently maintained in `src/lib/blog/posts.ts`, and service descriptions are maintained in `src/lib/services.ts`. Site-wide URLs and download paths are centralized in `src/config/site.ts`.

## Deployment notes

Deploy as a Next.js application. Set the required environment variables in the hosting provider before enabling the corresponding integrations. Apply the Supabase migration and grant store-admin access to trusted accounts before using `/admin/store`. Confirm the Google Apps Script deployment accepts POST requests and writes to the intended sheet. The repository does not include automated test scripts; use the available lint and production build commands as part of release verification.
