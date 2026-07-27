import type { Metadata } from 'next';
import { Cormorant_Garamond, Lora } from 'next/font/google';
import './globals.css';

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
  title: 'Minimal Contemporary Art Gallery',
  description: 'Tranquil digital exhibition space and art commerce.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#FAF8F4] text-[#2F2F2F] min-h-full font-serif"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
