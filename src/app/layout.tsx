import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Imajin Chat',
  description: 'End-to-end encrypted messaging for the trust network. X25519 + XChaCha20-Poly1305.',
  keywords: ['chat', 'messaging', 'encrypted', 'E2EE', 'sovereign', 'imajin'],
  openGraph: {
    type: 'website',
    url: 'https://chat.imajin.ai',
    siteName: 'Imajin Chat',
    title: 'Imajin Chat — Encrypted Messaging',
    description: 'End-to-end encrypted messaging for the trust network.',
  },
  twitter: {
    card: 'summary',
    title: 'Imajin Chat',
    description: 'End-to-end encrypted messaging for the trust network.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
