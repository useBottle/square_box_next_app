import type { Metadata } from "next";
import "../app/styles/globals.scss";
import Providers from "./component/Providers";
import { Noto_Sans_KR, Prompt } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

const prompt = Prompt({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
    <html lang="kr">
      <body className={notoSansKR.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
