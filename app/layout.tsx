import type { Metadata } from "next";
import "../app/styles/globals.scss";

export const metadata: Metadata = {
  title: "Square Box",
  description: "Square Box app with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
