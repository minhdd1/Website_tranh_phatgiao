import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Kayla Nguyen Art Gallery',
    default: 'Stillness & Mindful Contemporary Art | Kayla Nguyen Gallery',
  },
  description: 'Handcrafted contemporary artworks inspired by stillness, mindfulness, nature and meaningful living. Silk and sculptural paintings made with patience.',
  keywords: ['silk painting', 'sculptural painting', 'textured wall art', 'buddhist art', 'contemporary art'],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div
      lang={locale}
      className="min-h-screen font-serif flex flex-col pt-20 md:pt-28"
    >
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
