'use client';

import React, { useState } from 'react';
import { type Locale, type ArtworkCategory } from '@/types';
import Button from '../ui/Button';
import Dialog from '../ui/Dialog';

interface CommissionFormProps {
  locale: Locale;
}

export default function CommissionForm({ locale }: CommissionFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [artworkType, setArtworkType] = useState<ArtworkCategory>('silk-painting');
  const [dimensions, setDimensions] = useState('80x100cm');
  const [budget, setBudget] = useState('20,000,000 - 35,000,000 VND');
  const [message, setMessage] = useState('');
  
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !country || !message) return;

    setFormStatus('loading');
    try {
      const res = await fetch('/api/commissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          country,
          artwork_type: artworkType,
          dimensions,
          budget,
          message,
        }),
      });

      if (res.ok) {
        setFormStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setCountry('');
        setMessage('');
        setIsSuccessOpen(true);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const categories = [
    { value: 'silk-painting', label: locale === 'vi' ? 'Tranh Lụa Tự Nhiên' : 'Organic Silk Painting' },
    { value: 'sculptural-painting', label: locale === 'vi' ? 'Tranh Đắp Nổi Thạch Cao' : 'Sculptural Plaster Painting' },
    { value: 'buddhist-art', label: locale === 'vi' ? 'Tranh Phật Giáo Chánh Niệm' : 'Mindful Buddhist Art' },
  ];

  const sizeOptions = [
    { value: '40x50cm', label: '40 x 50 cm' },
    { value: '60x80cm', label: '60 x 80 cm' },
    { value: '80x100cm', label: '80 x 100 cm' },
    { value: '100x100cm', label: '100 x 100 cm' },
    { value: 'custom', label: locale === 'vi' ? 'Kích thước khác (Ghi ở dưới)' : 'Custom Size (Describe below)' },
  ];

  const budgetOptions = [
    { value: '15M-30M VND', label: '15,000,000 – 30,000,000 VND ($600 - $1200 USD)' },
    { value: '30M-50M VND', label: '30,000,000 – 50,000,000 VND ($1200 - $2000 USD)' },
    { value: '50M+ VND', label: '50,000,000+ VND ($2000+ USD)' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#FAF8F4] p-6 md:p-12 rounded-3xl border border-charcoal/5 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-8 text-left">
        <div className="space-y-6">
          {/* Primary details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
                {locale === 'vi' ? 'Họ và Tên *' : 'Your Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === 'vi' ? 'Nguyễn Văn A' : 'E.g., John Doe'}
                className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-full px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
                {locale === 'vi' ? 'Địa chỉ Email *' : 'Email Address *'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-full px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
                {locale === 'vi' ? 'Số Điện Thoại (Không bắt buộc)' : 'Phone Number (Optional)'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+84 90..."
                className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-full px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
                {locale === 'vi' ? 'Quốc Gia / Thành Phố *' : 'Country / City *'}
              </label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={locale === 'vi' ? 'Ví dụ: Hà Nội, Việt Nam' : 'E.g., Hanoi, Vietnam'}
                className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-full px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors"
              />
            </div>
          </div>

          {/* Separation line */}
          <div className="w-full h-[1px] bg-charcoal/5" />

          {/* Artwork specifics */}
          <div className="space-y-2">
            <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
              {locale === 'vi' ? 'Thể Loại Tranh Quan Tâm *' : 'Select Artwork Style *'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setArtworkType(cat.value as ArtworkCategory)}
                  className={`px-4 py-3 rounded-full text-xs font-body tracking-wider uppercase border transition-all duration-300 text-center cursor-pointer ${
                    artworkType === cat.value
                      ? 'bg-charcoal text-ivory border-charcoal shadow-sm'
                      : 'bg-transparent text-gray-soft border-charcoal/10 hover:border-charcoal/30'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Dimensions */}
            <div className="space-y-2">
              <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
                {locale === 'vi' ? 'Kích Thước Mong Muốn *' : 'Preferred Size *'}
              </label>
              <select
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-full px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors cursor-pointer"
              >
                {sizeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
                {locale === 'vi' ? 'Khoảng Ngân Sách Dự Kiến *' : 'Estimated Budget Range *'}
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-full px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors cursor-pointer"
              >
                {budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description / Message */}
          <div className="space-y-2">
            <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
              {locale === 'vi' 
                ? 'Mô Tả Không Gian Sống & Ý Tưởng Của Bạn *' 
                : 'Living Space Description & Artistic Inspiration *'}
            </label>
            <p className="text-[11px] font-body text-gray-soft/80 italic leading-relaxed pb-1">
              {locale === 'vi'
                ? 'Gợi ý: Hãy chia sẻ về ánh sáng trong phòng, vị trí treo tranh mong muốn, màu sắc ưa thích hoặc những câu chuyện cá nhân bạn muốn gửi gắm.'
                : 'Suggestions: Please share details about room lighting, placement walls, preferred color tones, or personal stories you wish to weave.'}
            </p>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                locale === 'vi'
                  ? 'Ví dụ: Bức tranh sẽ được treo ở diện tường chính phòng thiền có nắng xiên nhẹ vào lúc 3 giờ chiều...'
                  : 'E.g., The panel will hang on a primary wall in my tea-room, which receives soft afternoon rays...'
              }
              className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-2xl px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={formStatus === 'loading'}
            className="w-full"
          >
            {formStatus === 'loading'
              ? locale === 'vi'
                ? 'Đang Gửi Inquiry Chậm...'
                : 'Submitting Slow Inquiry...'
              : locale === 'vi'
              ? 'Bắt Đầu Hành Trình Hợp Tác'
              : 'Initiate Bespoke Collaboration'}
          </Button>
        </div>
        {formStatus === 'error' && (
          <p className="text-xs text-red-500 font-body text-center mt-2">
            {locale === 'vi' ? 'Đã xảy ra lỗi, vui lòng thử lại.' : 'An error occurred. Please try again.'}
          </p>
        )}
      </form>

      {/* Success Dialog Modal */}
      <Dialog
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title={locale === 'vi' ? 'Khởi Đầu Hành Trình Bình Yên' : 'A Quiet Collaboration Begins'}
        description={
          locale === 'vi'
            ? 'Cảm ơn bạn đã gửi ý tưởng. Tôi rất trân trọng cơ hội được hợp tác thiết kế riêng tác phẩm cho bạn. Tôi sẽ xem xét cẩn trọng và phản hồi đề xuất cọ vẽ bằng thư riêng trong vòng 2-5 ngày làm việc.'
            : 'Thank you for sharing your story and living space details. I am deeply honored by the opportunity to design a bespoke piece for you. I will personally review your notes and respond with a sketch direction within 2-5 business days.'
        }
      />
    </div>
  );
}
