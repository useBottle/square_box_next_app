import type { Metadata } from "next";
import "../app/styles/globals.scss";
import Providers from "./component/Providers";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
