import { Noto_Sans_KR, Prompt } from "next/font/google";
import localFont from "next/font/local";

export const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export const prompt = Prompt({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const SUITfont = localFont({
  src: "../public/fonts/SUIT-Variable.woff2",
  display: "swap",
});
