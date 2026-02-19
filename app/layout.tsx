import type { Metadata } from 'next';
import { Syne, Space_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Scroll Hero | 3D Animation Experience',
  description: 'A cinematic scroll-driven 3D animation experience built with Next.js and GSAP',
  keywords: ['3D animation', 'scroll animation', 'GSAP', 'Next.js', 'interactive'],
  authors: [{ name: 'Your Company' }],
  openGraph: {
    title: 'Scroll Hero | 3D Animation Experience',
    description: 'A cinematic scroll-driven 3D animation experience',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable}`}>
      <body className="font-display antialiased">
        {/* Blue radial glow backgrounds */}
        <div className="radial-glow-bg" aria-hidden="true" />
        <div className="radial-glow-secondary" aria-hidden="true" />
        <div className="grid-pattern" aria-hidden="true" />

        {children}

        {/* Film grain overlay */}
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
