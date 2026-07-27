# Sanity Schema

This document describes the current Sanity content model used by the website.

## Artwork

Artwork is the main document type for gallery and exhibition pages.

### Studio Groups

- Main: identity and editorial summary.
- Media: artwork images and optional video.
- Details: flexible artwork specifications.
- Content: per-artwork story sections and galleries.
- Commerce: price and availability.
- SEO: metadata overrides.

### Fields

- `title`: localized title.
- `slug`: URL slug.
- `excerpt`: localized short summary for listings.
- `description`: localized story or main description.
- `category`: enum string.
- `images`: Sanity image array.
- `video`: optional video URL.
- `dimensions`: legacy/simple dimensions field.
- `materials`: legacy/simple materials field.
- `specifications[]`: flexible label/value rows for artwork facts.
- `contentSections[]`: flexible per-artwork content blocks.
- `price`: optional number.
- `currency`: defaults to `VND`.
- `status`: `available`, `sold`, or `commission-open`.
- `featured`: boolean, defaults to `false`.
- `seo`: document-specific SEO overrides.

### `specifications[]`

Use this for information that changes per artwork and does not deserve a fixed schema field.

Examples:

- `Tác giả`: `Nguyễn Thúy Loan`
- `Năm sáng tác`: `2024`
- `Kỹ thuật`: `Tranh điêu khắc nổi thực hiện hoàn toàn thủ công.`
- `Nền và khung tranh`: `Gỗ sồi`
- `Hoàn thiện bề mặt`: `Phủ lớp varnish bảo vệ.`
- `Tình trạng`: `Có sẵn`

Keep the old `dimensions` and `materials` fields filled when possible because existing UI surfaces still use them as primary quick facts.

### `contentSections[]`

Use this for flexible article-like detail content on an artwork page. These sections replace previously hard-coded shared copy such as:

- `Chi Tiết Xúc Giác`
- `Sự Dung Dị Của Chất Liệu`
- `Ánh Sáng & Chiều Sâu`

Supported section types:

- `textBlock`: localized heading and body.
- `imageGallery`: localized heading, optional description, and extra images.

If an artwork has no `contentSections[]`, the detail page simply hides the flexible section area.

## Blog

Blog documents support localized rich content.

### Fields

- `title`: localized title.
- `slug`: URL slug.
- `coverImage`: Sanity image.
- `content`: localized Portable Text array.
- `seo`: document-specific SEO overrides.
- `author`: author reference or legacy inline author object.
- `publishedAt`: publication datetime.
- `translations`: optional translation metadata.

The frontend renders Portable Text through `src/components/blog/PortableContent.tsx` and uses `portableToPlainText()` for excerpts and metadata.

## Collection

Collection remains a lightweight grouping document.

### Fields

- `title`
- `slug`
- `description`
- `coverImage`

## Content Import Policy

No seed content is required for the current workflow. Editors should create and maintain artwork entries directly in Sanity Studio.

For manual entry steps, see `docs/content-workflow.md`.
