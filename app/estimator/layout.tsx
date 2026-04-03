import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Estimator',
  description: 'UAE Construction Estimating Assistant',
};

export default function EstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
