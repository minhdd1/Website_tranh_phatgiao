# Content Strategy

## Pillars

### 1. Artwork Stories

Examples:

- The story behind a newly published artwork.
- Material, texture, and hand-making process.
- How a piece changes under natural light.

### 2. Artist Journey

Examples:

- Why the artist chose a material or technique.
- Studio practice and creative discipline.
- Lessons from commissions and exhibitions.

### 3. Mindfulness

Examples:

- Silence as a creative practice.
- Art and meditation.
- Living with contemplative objects.

### 4. Living Spaces

Examples:

- How art changes a room.
- Creating a peaceful home.
- Choosing artwork by light, scale, and mood.

## Publishing Frequency

Target:

- 2 articles weekly when the editorial calendar is active.
- Long-form articles: 1500-2500 words.
- Prioritize useful, search-friendly, collector-facing content over volume.

## Artwork Content Workflow

Artwork pages are edited directly in Sanity Studio.

Use `docs/content-workflow.md` as the operational checklist for entering an artwork. It covers:

- Minimal artwork entries.
- Detailed artwork entries with many facts.
- Image-heavy artwork entries.
- How to use `specifications[]`.
- How to use `contentSections[]`.

## Flexible Artwork Content Rules

Artwork pages should not rely on shared hard-coded detail copy.

Per-artwork details such as:

- `Chi Tiết Xúc Giác`
- `Sự Dung Dị Của Chất Liệu`
- `Ánh Sáng & Chiều Sâu`

must be entered in Sanity as `contentSections[]` when they are relevant to that artwork.

If another artwork has fewer details, leave optional fields empty. If another artwork has more images, add more gallery images or image gallery sections. The frontend should hide empty optional sections instead of forcing every artwork into the same template.

## Seed Content Policy

Seed content is not required for the current editorial process.

The preferred workflow is manual entry through Sanity Studio. Seed scripts should only be introduced later for staging fixtures, bulk import, or migration work.
