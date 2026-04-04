import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Fiesta Estimator",
  description: "Smart construction estimation with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
