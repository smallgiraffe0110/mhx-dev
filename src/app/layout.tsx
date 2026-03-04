import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MHX — Engineering the Future",
  description:
    "MHX is a premium technology studio building exceptional digital products, platforms, and experiences.",
  openGraph: {
    title: "MHX — Engineering the Future",
    description:
      "A premium technology studio building exceptional digital products, platforms, and experiences.",
    url: "https://mhx.dev",
    siteName: "MHX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MHX — Engineering the Future",
    description:
      "A premium technology studio building exceptional digital products, platforms, and experiences.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-zinc-925 text-white font-sans noise">
        {children}
      </body>
    </html>
  );
}
