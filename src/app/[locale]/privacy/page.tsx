export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="font-display text-4xl md:text-5xl font-light text-[#2F2F2F] tracking-wide mb-6">
        {locale === 'vi' ? 'Điều Khoản & Bảo Mật' : 'Terms & Privacy'}
      </h1>
      <p className="font-body text-lg text-[#8D8D8D] max-w-lg leading-relaxed">
        {locale === 'vi' 
          ? 'Quyền lợi và điều khoản bảo mật của nhà sưu tập.' 
          : 'Collector rights and secure data guidelines.'}
      </p>
    </main>
  );
}
