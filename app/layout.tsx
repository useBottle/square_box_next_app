import type { Metadata } from "next";
import "../styles/reset.scss";
import "../styles/globals.css";
import { Noto_Sans_KR } from "next/font/google";
import Header from "./component/Header";
import MobileNav from "./component/MobileNav";
import Providers from "./component/Providers";
import CheckToken from "./component/CheckToken";

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
  const headerHeight = "5rem";

  return (
    <html lang="kr">
      <body className={notoSansKR.className}>
        <Providers>
          <CheckToken />
          <MobileNav />
          <Header />
          <div style={{ paddingTop: headerHeight }}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
