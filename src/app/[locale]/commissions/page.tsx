import React from 'react';
import { type Metadata } from 'next';
import { type Locale } from '@/types';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import CommissionForm from '@/components/forms/CommissionForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Bespoke Art Collaborations | Commission Experience',
  description: 'Invite stillness and bespoke organic textures into your home. Co-create a unique original painting tailored for your space.',
};

export default async function CommissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Curate beautiful step descriptions
  const steps = [
    {
      num: '01',
      title: locale === 'vi' ? 'Gửi Yêu Cầu Ban Đầu' : 'Initial Inquiry',
      desc: locale === 'vi'
        ? 'Chia sẻ kích thước mong muốn, hình ảnh không gian của bạn và những ý tưởng sáng tác ban đầu thông qua biểu mẫu phía dưới.'
        : 'Share your preferred dimensions, snapshots of your wall placement, and initial mood concepts using our quiet inquiry form below.',
    },
    {
      num: '02',
      title: locale === 'vi' ? 'Tham Vấn Ý Tưởng' : 'Personal Consultation',
      desc: locale === 'vi'
        ? 'Chúng ta sẽ thảo luận chi tiết hơn về nhịp điệu ánh sáng trong phòng, bảng màu ưa thích và tinh thần chủ đạo của bức tranh.'
        : 'We will discuss in detail the room\'s natural light path, your preferred color tones, and the emotional anchor of the painting.',
    },
    {
      num: '03',
      title: locale === 'vi' ? 'Đề Xuất Phác Thảo' : 'Sketch Proposal',
      desc: locale === 'vi'
        ? 'Tôi sẽ gửi tới bạn một phác thảo ý tưởng bằng cọ vẽ, kèm theo lộ trình thực hiện chi tiết và bảng dự tính chi phí.'
        : 'I will deliver a hand-painted brushwork sketch proposal, detailed execution timelines, and a final pricing estimate.',
    },
    {
      num: '04',
      title: locale === 'vi' ? 'Đặt Cọc' : 'Deposit & Initiation',
      desc: locale === 'vi'
        ? 'Dự án chính thức bắt đầu sau khi hoàn tất thanh toán khoản đặt cọc 50% để chuẩn bị khung gỗ kéo căng và màu khoáng.'
        : 'The bespoke project officially begins upon receiving a 50% deposit to procure organic raw materials and stretch the wood frame.',
    },
    {
      num: '05',
      title: locale === 'vi' ? 'Tạo Tác & Đồng Hành' : 'Creation & Updates',
      desc: locale === 'vi'
        ? 'Quá trình sáng tác sẽ diễn ra chậm rãi. Tôi sẽ gửi tới bạn những hình ảnh cập nhật thầm lặng theo từng giai đoạn quan trọng.'
        : 'The painting progresses slowly in the studio. I will share quiet, periodic photo updates during key structural stages.',
    },
    {
      num: '06',
      title: locale === 'vi' ? 'Hoàn Thiện & Bàn Giao' : 'Completion & Ship',
      desc: locale === 'vi'
        ? 'Sau khi nhận được sự đồng thuận cuối cùng, tác phẩm sẽ được căng khung chuyên nghiệp và vận chuyển an toàn tới không gian của bạn.'
        : 'Upon final visual approval, the artwork is custom-stretched, packed, and securely crated to be delivered to its new sanctuary.',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#FAF8F4]">
      {/* 1. HERO - Atmospheric Header */}
      <Section spacing="default" className="border-b border-charcoal/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
              {locale === 'vi' ? 'Thiết Kế Không Gian Sống Độc Bản' : 'Bespoke Collaborations'}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-charcoal tracking-wide leading-tight">
              {locale === 'vi' ? 'Đặt Tác Phẩm Riêng' : 'Commission a Piece'}
            </h1>
            <p className="font-body text-base sm:text-lg md:text-xl text-gray-soft italic leading-relaxed max-w-xl mx-auto">
              {locale === 'vi'
                ? '“Được tạo tác thủ công dành riêng cho không gian sống tối giản và câu chuyện nội tâm của bạn.”'
                : '“Created specifically to harmonize with your living space, lighting rhythm, and personal story.”'}
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. ATMOSPHERIC SHOT */}
      <section className="relative w-full h-[40vh] md:h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1600&auto=format&fit=crop"
          alt="Hands sculpting texture detail"
          fill
          priority
          className="object-cover brightness-[0.95]"
        />
      </section>

      {/* 3. INTRODUCTION / CONTEXT */}
      <Section spacing="default">
        <Container>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start text-left">
            <div className="space-y-4">
              <h3 className="font-display text-2xl md:text-3xl font-light text-charcoal tracking-wide">
                {locale === 'vi' ? 'Lựa Chọn Có Ý Nghĩa' : 'An Intentional Process'}
              </h3>
              <p className="font-body text-sm leading-relaxed text-gray-soft">
                {locale === 'vi'
                  ? 'Việc đặt tranh đặt riêng không giống như việc mua sắm hàng hóa đại trà. Đây là một cuộc đối thoại mở giữa nhu cầu tâm hồn của nhà sưu tập và đôi bàn tay tỉ mỉ của người nghệ sĩ.'
                  : 'Commissioning an artwork is not a transactional acquisition. It is a slow, collaborative dialogue—an alignment of the collector\'s spatial needs and the artist\'s patient execution.'}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl md:text-3xl font-light text-charcoal tracking-wide">
                {locale === 'vi' ? 'Chất Liệu Đăng Ký' : 'Available Mediums'}
              </h3>
              <p className="font-body text-sm leading-relaxed text-gray-soft">
                {locale === 'vi'
                  ? 'Tôi nhận thực hiện các tác phẩm tranh lụa màu khoáng tự nhiên (Silk Paintings) và tranh thạch cao cát trắng đắp nổi (Sculptural Paintings). Các tác phẩm có sắc thái Wabi-sabi thanh tịnh, thiền định nhẹ nhàng.'
                  : 'Bespoke requests are accepted for organic raw silk paintings, textural plaster reliefs, and minimalist Buddhist art. Designs embody stillness, soft shadows, and Japandi warmth.'}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. THE GUIDED STEP-BY-STEP PROCESS TIMELINE */}
      <Section spacing="large" className="bg-[#EFE7DF]/10 border-y border-charcoal/5">
        <Container className="space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
              {locale === 'vi' ? 'Quy Trình Sáng Tác Chậm' : 'The Creative Flow'}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-charcoal tracking-wide">
              {locale === 'vi' ? 'Lộ Trình Đồng Hành' : 'The Collaboration Journey'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 text-left max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.num} className="space-y-4 p-2 relative group">
                <div className="font-display text-5xl font-extralight text-charcoal/15 group-hover:text-charcoal/30 transition-colors duration-500">
                  {step.num}
                </div>
                <h3 className="font-display text-xl font-medium text-charcoal tracking-wide">
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-gray-soft/95">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. PORTFOLIO TRUST BUILDER SECTION */}
      <Section spacing="default">
        <Container className="text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
              {locale === 'vi' ? 'Tác Phẩm Đã Bàn Giao' : 'Testimonials & Sanctuaries'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal tracking-wide">
              {locale === 'vi' ? 'Cảm Nhận Từ Nhà Sưu Tập' : 'Collector Sanctuary Stories'}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-[#FAF8F4] p-8 md:p-12 rounded-3xl border border-charcoal/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            <p className="font-display text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed text-charcoal/80">
              {locale === 'vi'
                ? '“Bức tranh đắp nổi Enso mang bột cát mịn thực sự làm căn phòng trà của tôi thay đổi hoàn toàn. Mỗi buổi chiều nắng xiên nhẹ đổ bóng qua các lớp hạt cát thô mộc làm không gian ngập tràn sự tĩnh lặng tự tại.”'
                : '“The textural Enso sand relief panel has transformed my tea room completely. Every afternoon, as natural light filters sideways, organic shadows play across the rough sand grains, filling the entire sanctuary with peace.”'}
            </p>
            <div className="space-y-1 text-center">
              <span className="font-body text-xs uppercase tracking-widest text-charcoal font-medium block">
                Minh Anh
              </span>
              <span className="font-body text-[11px] text-gray-soft uppercase tracking-wider block">
                {locale === 'vi' ? 'Nhà sưu tập tư nhân, Hà Nội' : 'Private Collector, Hanoi'}
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. INTEGRATED INQUIRY FORM */}
      <Section id="inquiry-form" spacing="large" className="bg-[#EFE7DF]/20 border-t border-charcoal/5 pb-24">
        <Container className="space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="font-body text-xs uppercase tracking-widest text-gray-soft">
              {locale === 'vi' ? 'Bắt Đầu Ý Tưởng Của Bạn' : 'Begin Your Collaboration'}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-charcoal tracking-wide">
              {locale === 'vi' ? 'Gửi Yêu Cầu Sáng Tác' : 'Quiet Inquiry Form'}
            </h2>
            <p className="font-body text-sm text-gray-soft leading-relaxed">
              {locale === 'vi'
                ? 'Xin hãy điền chi tiết câu chuyện và không gian sống của bạn. Tôi sẽ liên hệ phác thảo cọ vẽ riêng trong thời gian sớm.'
                : 'Please fill out your space details and personal story patiently below. I will respond to guide your bespoke journey.'}
            </p>
          </div>

          <CommissionForm locale={locale as Locale} />
        </Container>
      </Section>
    </div>
  );
}
