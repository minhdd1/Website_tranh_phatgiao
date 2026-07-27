# Báo Cáo Review Project - 2026-07-26

## Cập Nhật Sau Khi Khắc Phục - 2026-07-27

Các thay đổi chính đã được triển khai sau báo cáo này:

- Artwork schema đã có `specifications[]` cho thông tin tác phẩm linh hoạt và `contentSections[]` cho các khối nội dung tùy biến theo từng artwork.
- Các câu hard-code trên trang artwork detail như "Chi Tiết Xúc Giác", "Sự Dung Dị Của Chất Liệu", "Ánh Sáng & Chiều Sâu" đã được gỡ khỏi UI dùng chung. Nội dung kiểu này cần nhập trong Sanity theo từng artwork.
- Trang artwork detail đã render `specifications[]`, `textBlock`, và `imageGallery` từ Sanity.
- Blog Portable Text mismatch đã được xử lý bằng `PortableContent` và helper `portableToPlainText()` cho excerpt/metadata.
- Sanity data layer đã chuyển sang `defineQuery`, projection rõ ràng, dùng shared Sanity client, và mock fallback chỉ còn dùng ngoài production.
- API commission/newsletter đã có validation, rate limit nhẹ, bỏ log PII, và trả lỗi thật khi Google Sheets chưa cấu hình hoặc webhook thất bại.
- `middleware.ts` đã được thay bằng `proxy.ts` theo convention mới của Next 16.
- Artwork cards không còn preload mọi ảnh bằng `priority`.
- `dist` đã được thêm vào `.gitignore` và ESLint ignore.
- Dependency security đã được xử lý một phần bằng `npm audit fix`, nâng Next lên `16.2.12`, và thêm overrides hẹp cho `postcss`, `sharp`, `esbuild`.
- Đã tạo `docs/content-workflow.md` làm quy trình mẫu nhập content trong Sanity Studio.

Đã kiểm tra lại:

- `npx.cmd tsc --noEmit --pretty false`: pass.
- `npm.cmd run lint`: pass.
- `npm.cmd run build`: pass với Next.js `16.2.12`.

Không triển khai theo yêu cầu:

- Không nhập bài "Tách Ký Ức" vào Sanity.
- Không tạo seed content/script import dữ liệu mẫu.

Vẫn còn mở:

- `npm audit` còn các findings trong dependency chain của Sanity CLI và ESLint. Npm đề xuất `--force`/major migration, nên cần xử lý bằng một lượt migration riêng thay vì ép trong nhánh sửa nhanh.
- Security headers/CSP chưa được triển khai.
- Chưa quyết định dứt điểm Google Sheets hay Supabase là data store production cho form submissions.

## Phạm Vi Đánh Giá

Review toàn bộ project Next.js/Sanity/Supabase trong workspace, tập trung vào:

- Kiến trúc tổng thể
- Chất lượng code và typing
- Bảo mật ứng dụng và dependency
- Hiệu năng build/runtime
- Khả năng bảo trì
- Khả năng tùy biến bài viết/blog qua CMS

## Tóm Tắt Điều Hành

Project có nền tảng khá tốt cho một website gallery/editorial: App Router rõ ràng, TypeScript strict, Tailwind, Next Image, Sanity Studio embedded, và có bộ tài liệu sản phẩm khá đầy đủ trong `docs/`. Tuy nhiên code hiện tại giống trạng thái "prototype gần production" hơn là production-ready.

Điểm mạnh lớn nhất là cấu trúc route dễ hiểu, UI đã có hệ component riêng, CMS schema đã phác thảo đúng domain nghệ thuật, và production build có thể compile thành công.

Rủi ro lớn nhất nằm ở 5 điểm:

1. Blog schema dùng Portable Text array nhưng frontend/type lại xử lý như plain string.
2. Sanity data layer bị tách đôi: `src/lib/sanity.ts`/`src/lib/api.ts` và `src/sanity/lib/*`.
3. API form thiếu validation chặt, rate limiting, và đang log PII.
4. `npm audit` báo 22 vulnerabilities, gồm 1 critical và 11 high.
5. Build/tooling còn artifact `dist/` trong repo và lint toàn cục bị treo do không ignore `dist/**`.

Đánh giá nhanh:

| Hạng mục | Điểm | Nhận xét ngắn |
|---|---:|---|
| Kiến trúc | 6.5/10 | Nền tảng đúng, nhưng data layer/CMS integration bị phân mảnh |
| Chất lượng code | 6/10 | TypeScript strict pass, nhưng lint fail và nhiều copy inline content |
| Bảo mật | 4.5/10 | Dependency audit xấu, form API thiếu hardening |
| Hiệu năng | 6/10 | Có Next Image, nhưng cache/static strategy và image priority chưa tốt |
| Bảo trì | 5.5/10 | Nhiều tài liệu tốt, nhưng docs đã drift và có duplicate/unused code |
| Tùy biến bài viết | 4/10 | Schema có ý định rich content, UI chưa render Portable Text đúng |

## Kết Quả Kiểm Tra

### Build và type

- `npm.cmd run build`: pass sau khi cho phép network để Next tải Google Fonts.
- Build time: compile khoảng 117s, TypeScript khoảng 34.9s.
- Cảnh báo: Next.js 16.2.6 báo `middleware` file convention đã deprecated, nên đổi sang `proxy`.
- Build output cho thấy các route locale/blog/gallery chủ yếu là dynamic server-rendered (`ƒ`), chưa có chiến lược static params/cache rõ.

### TypeScript

- `npx.cmd tsc --noEmit --pretty false`: pass.

### ESLint

- `npm.cmd exec eslint -- src next.config.ts sanity.config.ts sanity.cli.ts`: fail 2 lỗi:
  - `src/lib/sanity.ts:21` dùng `any`
  - `src/lib/sanity.ts:27` dùng `any`
- `npm run lint` toàn cục bị timeout vì lint đang quét project root, trong khi `dist/` là build artifact lớn và chưa nằm trong ESLint ignore.

### Dependency audit

`npm.cmd audit --omit=dev` báo:

- 22 vulnerabilities: 1 low, 9 moderate, 11 high, 1 critical.
- Đáng chú ý:
  - `next@16.2.6`: nhiều advisory high, fix gợi ý lên `16.2.12`.
  - `sharp <0.35.0`: high.
  - `tar <=7.5.20`: critical.
  - `postcss <=8.5.17`: high.
  - `undici`: high.
  - `adm-zip`, `js-yaml`, `form-data`, `linkify-it`, `dompurify`: có advisory.

Không nên chạy `npm audit fix --force` trực tiếp trên production branch vì audit gợi ý một số breaking change. Nên tạo branch riêng, update có kiểm soát, build/lint/test lại.

## Điểm Mạnh

- Sử dụng Next.js App Router và TypeScript strict.
- Route structure dễ theo dõi: `src/app/[locale]/*`, API routes nằm trong `src/app/api/*`.
- Có embedded Sanity Studio tại `src/app/studio/[[...tool]]/page.tsx`.
- Có sẵn schema domain cho artwork, collection, blog, author.
- Có `supabase/schema.sql` với RLS policies được phác thảo.
- UI component đã tách một phần: layout, navigation, artwork, forms, ui primitives.
- Dùng `next/image` cho hầu hết ảnh render trong UI.
- Tài liệu sản phẩm trong `docs/` rất hữu ích để tiếp tục chuẩn hóa.

## Findings Chi Tiết

### P0 - Blog rich content sẽ lỗi khi dùng dữ liệu Sanity thật

Bằng chứng:

- `src/sanity/schemas/blog.ts:29-45`: `content.vi` và `content.en` là array Portable Text, gồm block và image.
- `src/types/index.ts:111`: `BlogDocument.content` lại khai báo là `LocalizedText`, tức string text.
- `src/app/[locale]/blog/[slug]/page.tsx:25`: gọi `.substring()` trên `blog.content[locale]`.
- `src/app/[locale]/blog/page.tsx:75` và `src/app/[locale]/page.tsx:222`: render `blog.content[loc]` trực tiếp.
- `src/app/[locale]/blog/[slug]/page.tsx:91`: UI dùng `whitespace-pre-line`, phù hợp plain text chứ không phù hợp Portable Text.

Tác động:

- Mock data chạy được vì content là string.
- Khi Sanity trả về Portable Text array thật, metadata và UI blog có nguy cơ crash hoặc render `[object Object]`.
- Khả năng tùy biến bài viết bị khóa: editor có thể nhập heading/image/list trong Studio, nhưng frontend không render đúng.

Khuyến nghị:

- Nếu cần blog rich: đổi type sang Portable Text, dùng `@portabletext/react`, viết serializers cho block/image/link/caption, và tạo helper `toPlainText()` cho excerpt/metadata.
- Nếu chỉ cần plain text: đổi Sanity schema content về `localizedText` và bỏ array block.
- Nên ưu tiên rich content vì yêu cầu "tùy biến bài viết" phù hợp Portable Text hơn.

### P0 - Dependency security cần xử lý sớm

Bằng chứng:

- `npm audit --omit=dev` báo 22 vulnerabilities, gồm critical/high.
- `package.json` đang dùng `next: 16.2.6`, audit gợi ý fix lên `next@16.2.12`.

Tác động:

- Có rủi ro DoS, SSRF, cache confusion, Image Optimization DoS, tar parsing DoS và các lỗi supply-chain transitive.
- Một số lỗi nằm trong dependency runtime (`next`, `sharp`, `postcss`, `undici`), không chỉ dev-only.

Khuyến nghị:

- Tạo branch `security/dependency-updates`.
- Update Next trong cùng major lên bản patched, sau đó update Sanity/next-sanity theo compatibility matrix.
- Chạy lại `npm audit --omit=dev`, `npm run build`, lint source, và smoke test các route chính.

### P1 - Sanity integration bị phân mảnh

Bằng chứng:

- `src/lib/sanity.ts` tạo client bằng `@sanity/client`, apiVersion hard-code `2024-03-11`.
- `src/sanity/lib/client.ts` tạo client bằng `next-sanity`, apiVersion từ env/default `2026-06-06`.
- `src/sanity/lib/live.ts` export `sanityFetch`/`SanityLive`, nhưng app layout không render `<SanityLive />`.
- `src/lib/api.ts` mới là nơi pages đang dùng để fetch content.

Tác động:

- Hai client, hai apiVersion, hai helper image URL làm tăng drift.
- `defineLive` đã setup nhưng không thực sự dùng, nên Visual Editing/live updates không hoạt động.
- Các thay đổi CMS/revalidation sau này dễ sửa một nơi nhưng UI lại dùng nơi khác.

Khuyến nghị:

- Chọn một Data Access Layer duy nhất, nên ưu tiên `src/sanity/lib/*` với `next-sanity`.
- Chuyển `src/lib/api.ts` sang dùng `sanityFetch` và `defineQuery`.
- Render `<SanityLive />` trong root layout nếu cần live editing.
- Xóa hoặc deprecate `src/lib/sanity.ts` sau khi di trú.

### P1 - GROQ query fetch nguyên document và fallback mock che lỗi production

Bằng chứng:

- `src/lib/api.ts:10`, `24`, `69`, `83`: query không projection, lấy nguyên document.
- `src/lib/api.ts:17`, `32`, `76`, `91`, `105`: fallback về mock data khi lỗi hoặc không có kết quả.
- `src/lib/api.ts` dùng raw template string, chưa dùng `defineQuery`.

Tác động:

- Tốn bandwidth và khó type-safe.
- Lỗi Sanity production có thể bị che bởi mock data, làm deploy "xanh" nhưng nội dung thật không được lấy.
- Dataset rỗng sẽ hiện nội dung mock, có thể gây sai lệch thương mại/SEO.

Khuyến nghị:

- Dùng projection tối thiểu cho từng view: listing, detail, metadata.
- Dùng `defineQuery` để hỗ trợ TypeGen.
- Tách mock fallback theo `NODE_ENV !== 'production'` hoặc flag explicit.
- Nếu production Sanity lỗi, nên log server-side và hiện empty/error state có chủ đích.

### P1 - API form thiếu validation, rate limiting và đang log PII

Bằng chứng:

- `src/app/api/commissions/route.ts:7-11`: parse body và check required field tối thiểu.
- `src/app/api/newsletter/route.ts:7-11`: chỉ check email có tồn tại.
- `src/app/api/commissions/route.ts:17-24` và `src/app/api/newsletter/route.ts:17`: log PII lên server logs.
- `src/app/api/commissions/route.ts:15` và `src/app/api/newsletter/route.ts:15`: có artificial delay mỗi request.
- Routes vẫn return success ngay cả khi Google Sheets không config hoặc downstream save lỗi.

Tác động:

- Dễ bị spam/abuse endpoint.
- Email/message có thể sai format, quá dài, hoặc injection payload.
- Log PII tăng rủi ro privacy/compliance.
- User thấy success nhưng data có thể không được lưu.

Khuyến nghị:

- Thêm schema validation bằng Zod/Valibot hoặc custom validator typed.
- Giới hạn length và enum cho `artwork_type`, `budget`, `dimensions`.
- Thêm rate limit theo IP/email.
- Không log full email/message/phone; nếu cần log, mask email và request id.
- Nếu Google Sheets save fail, cần quyết định: return 502/503 hoặc enqueue retry, không silently success.
- Cân nhắc dùng Supabase table đã có schema thay vì Google Sheets webhook cho production.

### P1 - Next.js 16 deprecate `middleware.ts`

Bằng chứng:

- Build warning: `"middleware" file convention is deprecated. Please use "proxy" instead.`
- `src/middleware.ts:29`: đang export `middleware`.

Tác động:

- Chưa phải lỗi runtime ngay, nhưng sẽ trở thành nợ nâng cấp khi update Next.

Khuyến nghị:

- Đổi `src/middleware.ts` thành `src/proxy.ts` theo guide Next 16.
- Đổi export function `middleware` thành `proxy` nếu cần theo convention mới.
- Smoke test redirect locale và cookie `NEXT_LOCALE`.

### P1 - Security headers/CSP chưa có

Bằng chứng:

- Không thấy config `Content-Security-Policy`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `Permissions-Policy` trong `next.config.ts` hoặc proxy.
- `next.config.ts:5-13` chỉ cấu hình image remote patterns.

Tác động:

- Thiếu lớp phòng vệ XSS/clickjacking/data exfiltration.
- Site có external image/font origins, nên cần policy rõ trước khi production.

Khuyến nghị:

- Thêm security headers trong `next.config.ts` nếu không cần nonce strict.
- Nếu cần CSP strict nonce, cần cân nhắc performance vì dynamic rendering/PPR bị ảnh hưởng.
- Bắt đầu với CSP report-only trước, sau đó enforce.

### P2 - `next.config.ts` image remotePatterns quá rộng

Bằng chứng:

- `next.config.ts:8`: allow toàn bộ `images.unsplash.com`.
- `next.config.ts:12`: allow toàn bộ `cdn.sanity.io`.

Tác động:

- Remote image optimizer có thể bị dùng cho nhiều URL ngoài ý muốn hơn cần thiết.

Khuyến nghị:

- Giới hạn `pathname` cho Sanity project/dataset nếu có thể.
- Với Unsplash, nếu chỉ là mock/demo, bỏ khỏi production hoặc giới hạn path/source.
- Bỏ mock Unsplash dependency khỏi production content.

### P2 - Hiệu năng ảnh chưa tối ưu

Bằng chứng:

- `src/components/artwork/ArtworkCard.tsx:35`: mọi artwork card đều `priority`.
- Nhiều hero dùng remote Unsplash và build phụ thuộc Google Fonts.

Tác động:

- Ảnh trong grid bị preload/lazy bypass, có thể làm LCP/network contention xấu hơn.
- Build lần đầu cần network để fetch fonts; sandbox build fail nếu không có network.

Khuyến nghị:

- Chỉ đặt `priority` cho ảnh LCP/above-the-fold thật sự.
- Cho card grid mặc định lazy loading, giữ `sizes` như hiện tại.
- Self-host fonts hoặc đảm bảo build environment có network/cache fonts ổn định.

### P2 - Schema Sanity chưa theo best practices và còn `any`

Bằng chứng:

- `src/sanity/schemas/*.ts` là plain object, không dùng `defineType`, `defineField`, `defineArrayMember`.
- Nhiều validation dùng `(Rule: any)`.
- ESLint tắt `no-explicit-any` cho `src/sanity/**/*.ts`.
- `src/sanity/schemaTypes/postType.ts`, `categoryType.ts`, `blockContentType.ts`, `authorType.ts` tồn tại nhưng không nằm trong schema exported hiện tại.

Tác động:

- Giảm type-safety/autocomplete trong Studio.
- Dễ nhầm lẫn giữa schema mẫu và schema production.
- Khó duy trì migration schema về sau.

Khuyến nghị:

- Convert schema production sang `defineType/defineField/defineArrayMember`.
- Xóa hoặc tách rõ sample schemas không dùng.
- Thêm icons cho document/object quan trọng.
- Dùng validation typed thay vì tắt lint rộng.

### P2 - Tài liệu drift so với code

Bằng chứng:

- `docs/technical-architecture.md` ghi Next.js 15, nhưng `package.json` là Next 16.2.6.
- Docs ghi Supabase stores operational data, nhưng app API hiện đang lưu qua Google Sheets webhook.
- Docs ghi categories/translations trong Sanity, nhưng schema hiện tại không có category document đang dùng cho artwork; category là string enum.

Tác động:

- Onboarding và review sau này dễ dựa trên tài liệu sai.

Khuyến nghị:

- Cập nhật docs sau khi chốt architecture.
- Thêm "current implementation vs target architecture" nếu vẫn đang migration.

### P2 - Supabase schema có nhưng app chưa dùng

Bằng chứng:

- `package.json` có `@supabase/supabase-js`.
- `supabase/schema.sql` có table/RLS cho commission/newsletter/contact.
- API routes thực tế dùng `GOOGLE_SHEETS_WEBAPP_URL`.

Tác động:

- Phụ thuộc và docs thêm complexity nhưng chưa tạo giá trị runtime.
- Có nguy cơ hai nguồn dữ liệu vận hành song song.

Khuyến nghị:

- Chọn Google Sheets cho MVP hoặc Supabase cho production, document rõ.
- Nếu dùng Supabase: tạo server-only DAL và dùng service role chỉ ở server route.
- Nếu dùng Google Sheets: xóa dependency Supabase chưa dùng hoặc đánh dấu future.

### P2 - Hard-coded localized content làm giảm bảo trì

Bằng chứng:

- Nhiều route page chứa content vi/en trực tiếp trong TSX: homepage, gallery category pages, commissions, about/contact placeholders.
- `src/components/artwork/ArtworkDetailInteractive.tsx` đang hard-code các section chi tiết artwork như "Chi Tiết Xúc Giác", "Sự Dung Dị Của Chất Liệu", "Ánh Sáng & Chiều Sâu" và đoạn mô tả đi kèm. Các nội dung này không nằm trong Sanity nên mọi tác phẩm đều dùng chung, không tùy biến theo từng bài.
- `useTranslation.ts` có dictionary riêng cho nav/footer/artwork.

Tác động:

- Copywriting thay đổi cần code deploy.
- Dễ lặp lại string và thiếu consistency giữa pages.
- Chưa dùng hết Sanity cho editorial/marketing content.

Khuyến nghị:

- Với artwork detail, thêm `contentSections[]` trong Sanity để nhập các section tùy biến theo từng tác phẩm, ví dụ text section, image gallery, quote, process note.
- Di chuyển các section đang hard-code trong `ArtworkDetailInteractive.tsx` sang dữ liệu Sanity; nếu artwork không nhập section nào thì ẩn phần đó hoặc dùng fallback rất nhẹ.
- Đưa page copy vào Sanity singleton/page schema hoặc một translation resource typed.
- Tạo helper `getLocalized(value, locale, fallbackLocale)`.
- Thêm lint/test để phát hiện missing locale key.

### P3 - UX/content route chưa hoàn thiện

Bằng chứng:

- `about` và `contact` còn là placeholder nội dung ngắn.
- Chưa thấy contact form thật sự, trong khi Supabase schema có `contact_messages`.
- Blog chưa có pagination, categories/tags, related posts, search, draft preview.

Tác động:

- Site có cảm giác demo ở các route quan trọng ngoài gallery.

Khuyến nghị:

- Ưu tiên hoàn thiện About/Contact vì là trust path cho art commerce.
- Thêm blog taxonomy/excerpt/reading time/related posts nếu content strategy yêu cầu.

## Đánh Giá Khả Năng Tùy Biến Bài Viết

Hiện tại: thấp đến trung bình.

Schema blog đã có ý tưởng tốt:

- title localized
- slug
- cover image
- content localized rich content
- author reference
- publishedAt
- seo overrides

Nhưng frontend chưa hiện thực hóa:

- Portable Text chưa render.
- Không có serializer cho image/caption/link/list/heading/quote.
- Không có excerpt field riêng.
- Metadata lấy từ body string, sẽ sai với rich content.
- Chưa có categories/tags.
- Chưa có related posts/pagination.
- Chưa có draft mode/preview/live editing.

Để đạt mức tùy biến tốt:

1. Dùng Portable Text thật sự và render bằng serializer riêng.
2. Thêm fields: `excerpt`, `categories`, `tags`, `featured`, `readingTime` optional, `ogImage`, `seoTitle`, `seoDescription`.
3. Thêm block custom cho gallery image, callout, quote, artwork reference, CTA.
4. Dùng GROQ projection riêng cho list/detail/metadata.
5. Dùng Sanity Live/Draft Mode cho preview.

## Roadmap Ưu Tiên

### Sprint 1 - Fix rủi ro production

- Update dependency security theo branch riêng.
- Đổi `middleware.ts` sang `proxy.ts`.
- Sửa blog content mismatch: Portable Text hoặc plain text, nhưng phải đồng bộ schema/type/UI.
- Thêm validation và rate limiting cho `/api/commissions`, `/api/newsletter`.
- Mask/remove PII logs.

### Sprint 2 - Chuẩn hóa Sanity data layer

- Chọn một Sanity client duy nhất.
- Di chuyển fetch functions sang `src/sanity/lib` hoặc `src/data`.
- Dùng `defineQuery`, projection hẹp, và params.
- Bỏ silent mock fallback trong production.
- Mount `SanityLive` nếu cần live preview.
- Mở rộng schema `artwork` với `specifications[]` và `contentSections[]` để nhập thông tin tác phẩm linh hoạt trong Sanity Studio.
- Update query/detail DTO để trả về `specifications` và `contentSections` cho trang artwork detail.

### Sprint 3 - Hiệu năng và tooling

- Thêm `dist/**` vào `.gitignore` và `eslint.config.mjs` ignore.
- Kiểm tra `dist/` có cần tracked không; nếu không, remove khỏi git ở branch riêng.
- Bỏ `priority` khỏi artwork cards lặp lại.
- Self-host fonts hoặc cấu hình build cache fonts.
- Thêm route-level loading/error/not-found UI.

### Sprint 4 - CMS/editorial maturity

- Convert schemas sang `defineType/defineField/defineArrayMember`.
- Thêm blog taxonomy, excerpt, SEO fields, related artwork references.
- Di chuyển các section artwork detail đang hard-code như "Chi Tiết Xúc Giác" và "Ánh Sáng & Chiều Sâu" sang `contentSections[]`, render theo dữ liệu từng artwork.
- Đưa hard-coded page copy vào CMS hoặc translation resource typed.
- Hoàn thiện About/Contact.

## Kết Luận

Project có nền tảng đúng hướng và khá nhiều vật liệu tốt để thành website gallery production. Việc cần làm không phải viết lại từ đầu, mà là giảm drift: một data layer, một schema truth, một cách render rich content, một pipeline validation/security rõ ràng.

Nếu ưu tiên đúng, nên bắt đầu bằng blog content mismatch, dependency audit, API form hardening, và Sanity data layer. Đây là những điểm có tỷ lệ gây lỗi production cao nhất.
