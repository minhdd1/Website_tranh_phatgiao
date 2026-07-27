# Content Workflow

This guide is for creating and editing content directly in Sanity Studio. It is a manual editorial workflow, not a seed script.

## Artwork Entry Workflow

Use this workflow for exhibition/gallery artworks, including sculptural paintings and relief-style artworks.

### 1. Create the artwork document

In Sanity Studio, create a new `Artwork` document.

Fill the Main group first:

- `title`: artwork name in Vietnamese and English when available.
- `slug`: generate from the Vietnamese title or the public-facing title.
- `excerpt`: one short listing summary.
- `description`: the main story or collector-facing description.
- `category`: choose the correct gallery category.

### 2. Add media

In the Media group:

- Add the primary image first. This image is used by listing cards and the main artwork detail image.
- Add secondary/detail images after the primary image.
- Add `video` only when there is a useful process/detail video.

Recommended image order:

1. Full artwork front view.
2. Close-up texture/detail.
3. Framed/lifestyle view.
4. Process or material detail.

### 3. Fill quick facts

In the Details group:

- `dimensions`: keep this concise, for example `40x40cm`.
- `materials`: keep this concise enough for card/detail summary.

Use these fields for the most important facts that should always be visible near the top of the artwork page.

### 4. Add flexible specifications

Use `specifications[]` for artwork-specific facts. Add only the rows that apply.

Example for "Tách Ký Ức":

| Label | Value |
|---|---|
| Tác giả | Nguyễn Thúy Loan |
| Năm sáng tác | 2024 |
| Kích thước bao gồm khung | 40x40cm |
| Chất liệu | Sơn dầu và chất liệu tạo khối acrylic trên nền gỗ sồi, phủ lớp varnish bảo vệ. |
| Kỹ thuật | Tranh điêu khắc nổi thực hiện hoàn toàn thủ công. |
| Nền và khung tranh | Gỗ sồi |
| Hoàn thiện bề mặt | Phủ lớp varnish bảo vệ. |
| Tình trạng | Có sẵn |

Guideline:

- If a future artwork has fewer facts, add fewer rows.
- If a future artwork has different facts, add different labels.
- Do not create fake values just to fill the table.

### 5. Add flexible content sections

Use `contentSections[]` when the artwork needs extra storytelling, detail explanation, or image groupings.

Choose `textBlock` for text:

- `heading`: section title.
- `body`: paragraph text.

Choose `imageGallery` for image-focused sections:

- `heading`: optional gallery heading.
- `description`: optional gallery note.
- `images`: detail images for this section.

Examples of content sections that now belong in Sanity:

- `Chi Tiết Xúc Giác`
- `Sự Dung Dị Của Chất Liệu`
- `Ánh Sáng & Chiều Sâu`

These should be written per artwork. Do not reuse them automatically for every artwork unless the copy is intentionally correct for that specific piece.

### 6. Fill commerce fields

In the Commerce group:

- `status`: choose `available`, `sold`, or `commission-open`.
- `price`: optional.
- `currency`: default is `VND`.
- `featured`: turn on only for artworks that should appear in featured sections.

### 7. Review SEO

In the SEO group:

- Fill SEO title/description only when the default title/excerpt is not strong enough.
- Keep SEO description concise and natural.

### 8. Publish and verify

After publishing:

- Open the artwork detail page.
- Check that the primary image is correct.
- Confirm quick facts and specifications appear in the right order.
- Confirm empty optional sections are hidden.
- Check mobile layout for long labels and long material descriptions.

## Content Patterns

### Minimal Artwork

Use this when the artwork has only basic information.

- Main group: required title, slug, excerpt, description, category.
- Media: at least one image.
- Details: dimensions and materials.
- Commerce: status.
- Leave `specifications[]` and `contentSections[]` empty.

### Detailed Artwork

Use this when the artwork has many facts.

- Fill all minimal artwork fields.
- Add `specifications[]` rows for author, year, technique, frame, surface finish, condition, and other artwork-specific facts.
- Add one or more `contentSections[]` text blocks.

### Image-Heavy Artwork

Use this when the artwork has many detail photos.

- Put the best representative image first in `images`.
- Put important detail images in either the main `images` array or inside `contentSections[]` image galleries.
- Use image galleries when images need contextual section titles or descriptions.

## Seed Content Policy

Seed content is intentionally not part of the current workflow.

Reason:

- The team wants to enter real artwork content through Sanity Studio.
- A manual workflow is easier for non-technical editing.
- Seed scripts are more useful for development fixtures, migration, or repeatable demo data.

If bulk import becomes necessary later, create a separate migration/import plan and test it against a staging dataset first.
