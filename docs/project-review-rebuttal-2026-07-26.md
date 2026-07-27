# Phản Biện Báo Cáo Review Project (2026-07-26)

Đọc xong toàn bộ báo cáo, dưới đây là phần **phản biện và phân tích phản biện** — không phải để bác bỏ hoàn toàn, mà là chỉ ra những chỗ báo cáo **đánh giá quá nghiêm**, **thiếu ngữ cảnh**, hoặc **khuyến nghị chưa thực tế**.

---

## 🔍 Phản Biện Chi Tiết

### ① Điểm tổng thể bị kéo xuống không công bằng

Báo cáo cho **Bảo mật 4.5/10** và **Tùy biến bài viết 4/10**, nhưng:

- **22 vulnerabilities trong `npm audit`** — đây là con số **rất phổ biến** với bất kỳ Next.js project nào dùng nhiều dependencies. Phần lớn là **transitive (gián tiếp)**, không phải lỗ hổng do code của project gây ra. Báo cáo không phân biệt rõ "lỗ hổng trong code ta viết" vs "lỗ hổng trong package ta chỉ cài". Điều này làm điểm bảo mật bị kéo xuống một cách hơi thiếu công bằng.
- **Tùy biến bài viết 4/10** — schema blog đã có đầy đủ: title localized, slug, cover image, Portable Text, author reference, SEO overrides. Đây là backbone rất tốt. Điểm 4/10 đánh vào **frontend chưa implement**, nhưng đó là câu chuyện implementation chưa xong, không phải architecture sai.

---

### ② "Prototype gần production" — chẩn đoán thiếu căn cứ

> *"code hiện tại giống trạng thái 'prototype gần production' hơn là production-ready"*

Phán đoán này chưa được chứng minh đủ mạnh. Báo cáo không kiểm tra:
- **Uptime / error rate thực tế** (không có data monitoring)
- **Liệu các route gallery/artwork có hoạt động đúng không** (chỉ focus vào blog)
- **UI/UX có thực sự production-grade không** (không đề cập component design)

Báo cáo tập trung nặng vào **blog và form API** — hai thứ _chưa phải core feature_ của một website gallery/editorial. Gallery, artwork, collection mới là trái tim, mà các route này được đánh giá chỉ lướt qua.

---

### ③ P0 cho Portable Text — nghiêm trọng, nhưng không phải "crash ngay"

> *"Khi Sanity trả về Portable Text array thật, UI blog có nguy cơ crash hoặc render `[object Object]`"*

Đây **đúng về kỹ thuật**, nhưng:
- Nếu Sanity dataset **vẫn chưa có bài blog thật** (mock data đang dùng), thì người dùng cuối **không gặp lỗi này ngay**.
- Bug này chỉ xuất hiện khi content editor **publish bài viết rich text** — đây là rủi ro có điều kiện, không phải P0 theo nghĩa "đang lỗi production ngay bây giờ".
- Báo cáo gọi là P0 nhưng lại thiếu xác nhận: **dataset Sanity có bài blog thật chưa?**

> ✅ Đồng ý nên fix, nhưng gán nhãn P0 nên đi kèm bằng chứng rằng đây đang gây lỗi thật.

---

### ④ Phê phán "hai Sanity client" — chưa xem xét lý do kiến trúc

> *"`src/lib/sanity.ts` và `src/sanity/lib/client.ts` tạo hai client khác nhau"*

Có thể có lý do hợp lệ:
- `src/lib/sanity.ts` có thể được giữ để **backward compat** với code cũ trong giai đoạn migration
- `src/sanity/lib/client.ts` là hướng mới dùng `next-sanity`

Báo cáo không xem xét **liệu cả hai có cùng project/dataset config không** — nếu cùng config, rủi ro thực tế thấp hơn nhiều. Chỉ nói "hai client, hai apiVersion" mà không check xem pages nào đang thực sự dùng client nào cho kết quả khác nhau là thiếu sót.

---

### ⑤ Phê phán mock fallback — hai mặt không được nhìn nhận

> *"fallback về mock data khi lỗi hoặc không có kết quả... Lỗi Sanity production có thể bị che bởi mock data"*

Mock fallback cũng có **mặt tích cực**:
- **Tăng resilience**: site không trắng trang khi Sanity API down
- **Hữu ích trong dev/staging** khi chưa có đủ data thật
- Đây là pattern phổ biến, không phải anti-pattern tuyệt đối

Vấn đề thực sự là **không có flag `NODE_ENV`** để tắt mock trong production — báo cáo đã đề cập nhưng tone quá tiêu cực với pattern này.

---

### ⑥ `middleware.ts` deprecated — không phải P1, chỉ là P2/P3

> *"Next.js 16 deprecate `middleware.ts`... cần đổi sang `proxy`"*

Build warning ≠ lỗi runtime. Chức năng vẫn hoạt động bình thường. Đây là **technical debt nhẹ**, không nên đặt ngang với form API thiếu rate limiting (vốn là security risk thực sự). Báo cáo xếp đây là P1 là hơi overcategorize.

---

### ⑦ "Hard-coded localized content" — phê phán hơi lý tưởng hóa

> *"Copywriting thay đổi cần code deploy"*

Đây là điểm **đúng về lý thuyết**, nhưng:
- Với một website cá nhân/portfolio của nghệ sĩ, content thay đổi rất ít
- Overhead đưa **mọi thứ** vào Sanity CMS có thể cao hơn lợi ích
- Nhiều production sites (kể cả lớn) giữ static copy trong code cho các trang như About/Contact vì đơn giản và version-controlled

Báo cáo không hỏi: **"tần suất thay đổi content này là bao nhiêu?"** — đó là thông tin cần có trước khi kết luận đây là vấn đề đáng giải quyết.

---

### ⑧ Roadmap 4 sprint — thiếu estimate effort và tradeoff

Roadmap đề xuất 4 sprint nhưng:
- **Không estimate effort** cho từng task (2h? 2 ngày? 2 tuần?)
- **Không phân tích tradeoff**: sửa Portable Text có thể cần viết lại nhiều component, ảnh hưởng đến timeline hiện tại
- **Sprint 2** (chuẩn hóa Sanity data layer) rủi ro cao nếu làm không cẩn thận — cần migration plan, không chỉ "chuyển fetch functions sang"

---

## 📊 Đánh Giá Lại Điểm (Phản Biện)

| Hạng mục | Điểm báo cáo | Điểm phản biện | Lý do |
|---|:---:|:---:|---|
| Kiến trúc | 6.5 | **7.0** | Route structure rõ, App Router tốt; "phân mảnh" Sanity là migration-in-progress |
| Chất lượng code | 6.0 | **6.5** | TypeScript strict pass; lint fail chỉ 2 lỗi `any` là nhỏ |
| Bảo mật | 4.5 | **5.5** | Vuln phần lớn transitive; form API là vấn đề thật nhưng chưa ai tấn công |
| Hiệu năng | 6.0 | **6.0** | Đồng ý — image priority và font self-host là vấn đề thật |
| Bảo trì | 5.5 | **6.0** | Tài liệu drift là thật, nhưng `docs/` phong phú hơn hầu hết project cùng scale |
| Tùy biến bài viết | 4.0 | **5.5** | Schema rất tốt; frontend thiếu là implementation gap, không phải design failure |

---

## ✅ Những điểm báo cáo **đúng hoàn toàn** và nên làm ngay

Dù có phản biện ở trên, những vấn đề sau là **xác thực và cần ưu tiên**:

1. **Portable Text ↔ string mismatch** — sẽ crash khi có content thật, phải fix
2. **Form API thiếu rate limiting và đang log PII** — đây là lỗi security thật
3. **`priority` trên mọi artwork card** — ảnh hưởng performance thật sự
4. **`dist/` trong repo** — clean up đơn giản, nên làm
5. **Dependency updates** — nên update Next theo patch version (16.2.6 → 16.2.12)

---

**Tóm lại**: Báo cáo có giá trị cao, phát hiện nhiều vấn đề kỹ thuật thật. Nhưng một số điểm bị **phóng đại mức độ nghiêm trọng**, **thiếu ngữ cảnh business**, và **không phân biệt "rủi ro lý thuyết" vs "lỗi đang xảy ra"**. Nên đọc báo cáo với tinh thần "danh sách việc cần làm có thứ tự ưu tiên" thay vì "bản án kỹ thuật".
