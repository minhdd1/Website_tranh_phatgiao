export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="font-display text-4xl md:text-5xl font-light text-[#2F2F2F] tracking-wide mb-6">
        {locale === 'vi' ? 'Hành Trình Người Nghệ Sĩ' : 'The Artist Story'}
      </h1>
      <p className="font-body text-lg text-[#8D8D8D] max-w-lg leading-relaxed">
        {locale === 'vi' 
          ? 'Tìm hiểu thêm về triết lý và sự lựa chọn chất liệu lụa.' 
          : 'Discover the creative philosophy and choice of silk as a medium.'}
      </p>
    </main>
  );
}
