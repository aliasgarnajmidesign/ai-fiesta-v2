import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Estimator - Chat',
  description: 'UAE Construction Estimating Assistant',
};

export default function EstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
