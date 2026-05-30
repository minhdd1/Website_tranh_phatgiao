import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Minimal Contemporary Art Gallery',
  description: 'Tranquil digital exhibition space and art commerce.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
