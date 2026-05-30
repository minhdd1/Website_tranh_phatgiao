import type { Metadata } from 'next';
import { Cormorant_Garamond, Lora } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500'],
});

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
    <html
      lang={locale}
      className={`${cormorant.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="bg-[#FAF8F4] text-[#2F2F2F] min-h-full font-serif flex flex-col pt-20 md:pt-28"
        suppressHydrationWarning
      >
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
