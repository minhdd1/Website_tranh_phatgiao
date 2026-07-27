'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { type ArtworkDocument, type Locale } from '@/types';
import { getImageUrl } from '@/lib/sanity';
import Container from '../layout/Container';
import Section from '../layout/Section';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Lightbox from '../ui/Lightbox';
import Dialog from '../ui/Dialog';

interface ArtworkDetailInteractiveProps {
  artwork: ArtworkDocument;
  locale: Locale;
}

export default function ArtworkDetailInteractive({
  artwork,
  locale,
}: ArtworkDetailInteractiveProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  
  // Inquiry Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState(
    locale === 'vi' 
      ? `Tôi muốn đăng ký nhận thêm thông tin chi tiết và liên hệ về tác phẩm "${artwork.title.vi}".`
      : `I would like to inquire about the pricing and secure acquisition details for the piece "${artwork.title.en}".`
  );
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const title = artwork.title[locale];
  const description = artwork.description[locale];
  const materials = artwork.materials[locale];
  const dimensions = artwork.dimensions[locale];
  const imagesList = artwork.images;
  const detailImages = imagesList.slice(1);
  const specifications = (artwork.specifications || []).filter(
    (spec) => spec.label?.[locale] && spec.value?.[locale]
  );
  const contentSections = artwork.contentSections || [];

  const localized = (value?: Partial<Record<Locale, string>>) => {
    return value?.[locale] || value?.vi || value?.en || '';
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !country) return;

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
          artwork_type: artwork.category,
          dimensions,
          budget: 'Original Purchase',
          message: `Inquiry regarding: ${artwork.title.en}. Notes: ${message}`,
        }),
      });

      if (res.ok) {
        setFormStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setIsSuccessOpen(true);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO EXHIBITION VIEW - Artwork Image, Title, Story */}
      <Section spacing="default" className="bg-[#FAF8F4] pt-8 md:pt-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Visual Frame */}
            <div className="space-y-6 w-full max-w-lg mx-auto">
              <div 
                className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-[#EFE7DF]/20 border border-charcoal/5 shadow-sm cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image
                  src={getImageUrl(imagesList[activeImageIndex])}
                  alt={imagesList[activeImageIndex]?.alt_en || title}
                  fill
                  priority
                  className="object-cover transition-all duration-700 ease-out"
                />
              </div>
              
              {/* Image Thumbnails Curation */}
              {imagesList.length > 1 && (
                <div className="flex gap-4 items-center justify-center">
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 aspect-[4/5] rounded-lg overflow-hidden border transition-all duration-500 cursor-pointer ${
                        activeImageIndex === idx ? 'border-charcoal shadow-sm' : 'border-transparent opacity-60'
                      }`}
                    >
                      <Image
                        src={getImageUrl(img)}
                        alt={`Closeup detail ${idx}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Typography Story Narrative */}
            <div className="space-y-8 text-left max-w-xl">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
                    {artwork.category.replace('-', ' ')}
                  </span>
                  <Badge status={artwork.status} />
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-wide leading-tight">
                  {title}
                </h1>
              </div>

              <div className="w-16 h-[1px] bg-charcoal/10" />

              {/* Story/Narrative - Emphasizing process & patience */}
              <div className="font-body text-base md:text-lg text-gray-soft leading-relaxed space-y-4">
                <p>{description}</p>
              </div>

              {/* Specific specs */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-charcoal/5 pt-8">
                <div className="space-y-1">
                  <span className="font-body text-xs text-gray-soft/60 uppercase tracking-widest block">
                    {locale === 'vi' ? 'Chất Liệu' : 'Materials'}
                  </span>
                  <p className="font-body text-sm text-charcoal font-medium">
                    {materials}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-body text-xs text-gray-soft/60 uppercase tracking-widest block">
                    {locale === 'vi' ? 'Kích Thước' : 'Dimensions'}
                  </span>
                  <p className="font-body text-sm text-charcoal font-medium">
                    {dimensions}
                  </p>
                </div>
              </div>

              {specifications.length > 0 && (
                <div className="border-t border-charcoal/5 pt-8 space-y-5">
                  <h2 className="font-body text-xs uppercase tracking-widest text-gray-soft">
                    {locale === 'vi' ? 'Thông Tin Tác Phẩm' : 'Artwork Details'}
                  </h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {specifications.map((spec, idx) => (
                      <div key={spec._key || `${localized(spec.label)}-${idx}`} className="space-y-1">
                        <dt className="font-body text-xs uppercase tracking-widest text-gray-soft/70">
                          {localized(spec.label)}
                        </dt>
                        <dd className="font-body text-sm leading-relaxed text-charcoal">
                          {localized(spec.value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Artwork detail images */}
      {detailImages.length > 0 && (
        <Section spacing="default" className="bg-[#EFE7DF]/10 border-y border-charcoal/5">
          <Container className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {detailImages.map((img, idx) => (
                <div 
                  key={img._key || img.asset?._ref || idx} 
                  className="space-y-4 text-left group cursor-zoom-in"
                  onClick={() => {
                    // Match the index in original list directly from local props
                    const originalIdx = artwork.images.findIndex(image => image.asset?._ref === img.asset?._ref);
                    setActiveImageIndex(originalIdx !== -1 ? originalIdx : 1);
                    setIsLightboxOpen(true);
                  }}
                >
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-charcoal/5">
                    <Image
                      src={getImageUrl(img)}
                      alt={img.alt_en || 'Artwork Closeup'}
                      fill
                      className="object-cover transform scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out"
                    />
                  </div>
                  <p className="font-body text-xs text-gray-soft uppercase tracking-widest italic pl-2">
                    {locale === 'vi' ? img.alt_vi : img.alt_en}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 3. Flexible artwork-specific sections */}
      {contentSections.length > 0 && (
        <Section spacing="default" className="bg-[#FAF8F4]">
          <Container className="space-y-20">
            {contentSections.map((section, idx) => {
              if (section._type === 'imageGallery') {
                const galleryImages = section.images || [];
                if (galleryImages.length === 0) return null;

                return (
                  <div key={section._key || idx} className="space-y-10">
                    {(localized(section.title) || localized(section.description)) && (
                      <div className="max-w-xl mx-auto text-center space-y-4">
                        {localized(section.title) && (
                          <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal tracking-wide">
                            {localized(section.title)}
                          </h2>
                        )}
                        {localized(section.description) && (
                          <p className="font-body text-sm leading-relaxed text-gray-soft">
                            {localized(section.description)}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                      {galleryImages.map((img, imageIdx) => (
                        <div
                          key={img._key || img.asset?._ref || imageIdx}
                          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-charcoal/5"
                        >
                          <Image
                            src={getImageUrl(img)}
                            alt={locale === 'vi' ? img.alt_vi || localized(section.title) : img.alt_en || localized(section.title)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={section._key || idx}
                  className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-8 lg:gap-16 items-start border-y border-charcoal/5 py-12"
                >
                  <div className="space-y-3">
                    {localized(section.eyebrow) && (
                      <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
                        {localized(section.eyebrow)}
                      </span>
                    )}
                    <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal tracking-wide">
                      {localized(section.title)}
                    </h2>
                  </div>
                  <p className="font-body text-sm md:text-base leading-relaxed text-gray-soft whitespace-pre-line">
                    {localized(section.body)}
                  </p>
                </div>
              );
            })}
          </Container>
        </Section>
      )}

      {/* 4. BELOW THE FOLD - Price, Acquisition, and Quiet Inquiry Form */}
      <Section id="acquisition" spacing="large" className="bg-[#EFE7DF]/20 border-t border-charcoal/5">
        <Container>
          <div className="max-w-2xl mx-auto space-y-12 bg-[#FAF8F4] p-8 md:p-12 rounded-3xl border border-charcoal/5 shadow-sm text-center">
            
            {/* Respectful Price Statement */}
            <div className="space-y-4">
              <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
                {locale === 'vi' ? 'Sở Hữu Tác Phẩm' : 'Acquisition'}
              </span>
              <h3 className="font-display text-3xl font-light text-charcoal tracking-wide">
                {locale === 'vi' ? 'Đầu Tư Độc Bản' : 'Pricing & Inquiry'}
              </h3>
              
              {/* Value listing displays only below fold as per art direction */}
              <div className="py-4">
                <span className="font-display text-4xl text-charcoal tracking-wider">
                  {artwork.status === 'sold' ? (
                    <span className="text-gray-soft/50 line-through text-2xl uppercase tracking-widest">
                      {locale === 'vi' ? 'Đã thuộc bộ sưu tập tư nhân' : 'In Private Collection'}
                    </span>
                  ) : (
                    <>
                      {artwork.price.toLocaleString(locale === 'vi' ? 'vi-VN' : 'en-US')}{' '}
                      <span className="text-xl font-body font-light text-gray-soft">{artwork.currency}</span>
                    </>
                  )}
                </span>
              </div>
              <p className="font-body text-xs leading-relaxed text-gray-soft max-w-sm mx-auto">
                {locale === 'vi'
                  ? '*Giá đã bao gồm chi phí căng khung nguyên bản và chuẩn bị giấy tờ chứng nhận từ nghệ sĩ. Chưa bao gồm phí đóng thùng vận chuyển quốc tế.'
                  : '*Price includes premium custom stretching, protective packing, and a signed Certificate of Authenticity. Excludes global freight crating.'}
              </p>
            </div>

            <div className="w-12 h-[1px] bg-charcoal/10 mx-auto" />

            {/* Quiet Inquiry Form */}
            {artwork.status !== 'sold' && (
              <form onSubmit={handleSubmitInquiry} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
                      {locale === 'vi' ? 'Họ và Tên *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={locale === 'vi' ? 'Ví dụ: Nguyễn Văn A' : 'E.g., John Doe'}
                      className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-full px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors"
                    />
                  </div>

                  {/* Email */}
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
                  {/* Phone */}
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

                  {/* Country */}
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
                      {locale === 'vi' ? 'Quốc Gia *' : 'Country *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder={locale === 'vi' ? 'Ví dụ: Việt Nam' : 'E.g., Vietnam'}
                      className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-full px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-widest text-charcoal/70">
                    {locale === 'vi' ? 'Lời Nhắn Hoặc Câu Hỏi Đóng Góp *' : 'Inquiry Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAF8F4] border border-charcoal/10 rounded-2xl px-5 py-3 text-sm font-body text-charcoal focus:outline-none focus:border-charcoal/30 transition-colors resize-none"
                  />
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
                        ? 'Đang Gửi Yêu Cầu...'
                        : 'Sending Inquiry...'
                      : locale === 'vi'
                      ? 'Gửi Yêu Cầu Sở Hữu'
                      : 'Send Acquisition Inquiry'}
                  </Button>
                </div>
                {formStatus === 'error' && (
                  <p className="text-xs text-red-500 font-body text-center mt-2">
                    {locale === 'vi' ? 'Đã xảy ra lỗi, vui lòng thử lại.' : 'An error occurred. Please try again.'}
                  </p>
                )}
              </form>
            )}
          </div>
        </Container>
      </Section>

      {/* Fullscreen texture light inspection */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={getImageUrl(imagesList[activeImageIndex])}
        altText={imagesList[activeImageIndex]?.alt_en}
      />

      {/* Success Modal */}
      <Dialog
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title={locale === 'vi' ? 'Đã Nhận Yêu Cầu' : 'Inquiry Received'}
        description={
          locale === 'vi'
            ? 'Cảm ơn bạn đã quan tâm đến tác phẩm. Tôi sẽ xem xét và phản hồi chi tiết tới bạn bằng thư riêng trong vòng 2-5 ngày làm việc.'
            : 'Thank you for your warm interest. I personally review every acquisition request and will respond within 2–5 business days.'
        }
      />
    </div>
  );
}
