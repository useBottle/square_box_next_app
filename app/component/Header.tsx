/** @jsxImportSource @emotion/react */

"use client";

import { Prompt } from "next/font/google";
import { BsBox } from "react-icons/bs";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setNavMenu } from "@/store/switches";

const prompt = Prompt({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Header(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { navMenu } = useSelector((state: RootState) => state.switches);

  return (
    <header
      css={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "5rem",
      })}
    >
      <Link
        href="/"
        css={css({
          display: "flex",
          color: "var(--basic-font)",
          fontSize: "2rem",
          margin: "1rem 1.5rem",
        })}
      >
        <BsBox />
        <h1 className={prompt.className} css={css({ marginLeft: "1rem" })}>
          Square Box
        </h1>
      </Link>
      <IoMenuOutline
        css={css({
          fontSize: "2rem",
          margin: "0 1.5rem",
        })}
        onClick={() => dispatch(setNavMenu(navMenu ? false : true))}
      />
    </header>
  );
}
