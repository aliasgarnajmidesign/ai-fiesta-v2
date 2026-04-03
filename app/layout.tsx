import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Fiesta',
  description: 'AI Fiesta — Gemini-powered assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
