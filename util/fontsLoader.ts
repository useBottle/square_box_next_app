import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";

export const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export const SUITfont = localFont({
  src: "../public/fonts/SUIT-Variable.woff2",
  display: "swap",
});
