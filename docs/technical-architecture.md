# Technical Architecture

## Frontend

- Next.js 16 App Router.
- TypeScript.
- Route-level locale segment: `src/app/[locale]`.
- Locale redirect is handled by `src/proxy.ts`.

## Styling

- Tailwind CSS.
- Shared UI/components live under `src/components`.

## CMS

Sanity is the source of truth for editorial content.

Current document types:

- `artwork`
- `collection`
- `blog`
- `author`

Current artwork categories are stored as enum string values on `artwork.category`, not as separate category documents.

Artwork detail pages support flexible content through:

- `specifications[]`: label/value facts.
- `contentSections[]`: per-artwork text blocks and image galleries.

Blog content uses localized Portable Text and is rendered by `src/components/blog/PortableContent.tsx`.

## Data Access

Application content fetches are centralized in `src/lib/api.ts`.

Current patterns:

- `defineQuery` from `next-sanity`.
- Explicit GROQ projections.
- Sanity client from `src/sanity/lib/client.ts`.
- Mock fallback is limited to non-production environments.

Image URL helpers are centralized through `src/sanity/lib/image.ts`, with compatibility helpers in `src/lib/sanity.ts`.

## Forms

Commission and newsletter API routes live under `src/app/api`.

Current behavior:

- Validate JSON request bodies.
- Apply lightweight in-memory rate limiting.
- Avoid logging PII payloads.
- Send valid submissions to `GOOGLE_SHEETS_WEBAPP_URL`.
- Return `503` when Google Sheets is not configured.
- Return `502` when the Google Sheets webhook fails.

Supabase schema files exist for a possible production data store, but the current runtime form submission path uses Google Sheets.

## Database

Supabase is present as a planned or optional data layer.

Existing schema covers:

- users
- commission_requests
- newsletter_subscribers
- contact_messages

Before production, choose whether Google Sheets remains the MVP operational store or Supabase becomes the canonical store.

## Deployment

- Vercel-compatible Next.js deployment.
- Sanity Studio is embedded at `/studio`.

## Media

- Sanity Asset CDN for CMS images.
- Unsplash remains useful for mock/demo image fallback outside production.
- Repeated artwork cards should not use image `priority`; reserve priority for real above-the-fold/LCP images.

## Search

- Sanity GROQ.
- Queries should continue using explicit projections and params.

## Analytics

Planned:

- Google Analytics 4.
- Microsoft Clarity.

## Security Notes

Implemented:

- API validation.
- Basic rate limiting.
- No full PII request logging.
- Dependency patch updates and targeted package overrides.

Still open:

- Security headers/CSP.
- Decision on Supabase versus Google Sheets for production form storage.
- Major dependency migration path for remaining Sanity CLI/ESLint audit findings.
