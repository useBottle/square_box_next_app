import type { Metadata } from "next";
import "../styles/reset.scss";
import "../styles/globals.css";
import Header from "./component/Header";
import MobileNav from "./component/MobileNav";
import Providers from "./component/Providers";
import CheckToken from "./component/CheckToken";
import FetchTopics from "./component/FetchTopics";
import FetchBookmark from "./component/FetchBookmark";
import { SUITfont } from "@/util/fontsLoader";

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
      <body className={SUITfont.className}>
        <Providers>
          <CheckToken />
          <MobileNav />
          <Header />
          <FetchTopics />
          <FetchBookmark />
          <div style={{ paddingTop: "5rem" }}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
