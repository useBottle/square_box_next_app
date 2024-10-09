/** @jsxImportSource @emotion/react */

"use client";

import { Prompt } from "next/font/google";
import { BsBox } from "react-icons/bs";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setNavMenu, setSignoutModal } from "@/store/switches";
import { header, logo, menuBtn } from "@/styles/Header.styles";

const prompt = Prompt({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Header(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { navMenu, signoutModal } = useSelector((state: RootState) => state.switches);

  return (
    <header css={css(header)}>
      <Link href="/" css={css(logo)}>
        <BsBox />
        <h1 className={prompt.className} css={css({ marginLeft: "1rem" })}>
          Square Box
        </h1>
      </Link>
      {navMenu === false ? (
        <IoMenuOutline css={css(menuBtn)} onClick={() => dispatch(setNavMenu(navMenu ? false : true))} />
      ) : (
        <IoCloseOutline
          css={css(menuBtn)}
          onClick={() => {
            dispatch(setNavMenu(navMenu ? false : true));
            dispatch(setSignoutModal(signoutModal ? false : true));
          }}
        />
      )}
    </header>
  );
}
