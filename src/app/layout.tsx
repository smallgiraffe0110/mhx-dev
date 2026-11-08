import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "mhx. — forged in a new era.",
  description:
    "A new generation of builders. MHX: our story, collaboration, and the foundry.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
