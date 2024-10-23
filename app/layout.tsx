import type { Metadata } from "next";
import "../styles/reset.scss";
import "../styles/globals.css";
import { Noto_Sans_KR } from "next/font/google";
import Header from "./component/Header";
import MobileNav from "./component/MobileNav";
import Providers from "./component/Providers";
import CheckToken from "./component/CheckToken";
import Head from "next/head";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Square Box",
  description: "Square Box app with Next.js",
  icons: {
    apple: "/icon-192.png",
    other: {
      rel: "icon",
      url: "/favicon.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="kr">
      <Head>
        <meta name="google-site-verification" content="JyXwqZnN_f4YCgLs-eACBWoSCrXT0W8F7xy7PODT8jE" />
      </Head>
      <body className={notoSansKR.className}>
        <Providers>
          <CheckToken />
          <MobileNav />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
