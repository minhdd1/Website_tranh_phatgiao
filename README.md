# Kayla Nguyen Website

Next.js website for an artist/gallery experience powered by Sanity Studio.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Sanity CMS with embedded Studio at `/studio`
- Google Sheets webhook for current commission/newsletter submissions

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npx.cmd tsc --noEmit --pretty false
npm.cmd run lint
npm.cmd run build
```

## Key Documentation

- `docs/technical-architecture.md`: current implementation architecture.
- `docs/sanity-schema.md`: Sanity document models and frontend expectations.
- `docs/content-workflow.md`: manual Sanity Studio workflow for entering artwork content.
- `docs/content-strategy.md`: editorial strategy and flexible artwork content rules.
- `GOOGLE_SHEETS_GUIDE.md`: webhook setup for commission/newsletter submissions.
- `docs/project-review-report-2026-07-26.md`: project review baseline and implementation update.

## Content Workflow

Artwork entries are created manually in Sanity Studio.

Use:

- `specifications[]` for flexible artwork facts.
- `contentSections[]` for per-artwork story sections and image galleries.

No seed content or import script is required for the current workflow.
