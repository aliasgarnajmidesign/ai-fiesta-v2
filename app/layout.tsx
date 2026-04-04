import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Construction Estimator",
  description: "Smart construction estimation with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
