"use client";

import { Prompt } from "next/font/google";
import styles from "../../styles/header.module.scss";
import { BsBox } from "react-icons/bs";

const prompt = Prompt({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Header(): JSX.Element {
  return (
    <header>
      <div id={styles.logo}>
        <BsBox />
        <h1 className={prompt.className}>Square Box</h1>
      </div>
    </header>
  );
}
