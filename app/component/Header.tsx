/** @jsxImportSource @emotion/react */

"use client";

import { BsBox } from "react-icons/bs";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setNavMenu } from "@/store/switches";
import { header } from "@/styles/Header.styles";
import { prompt } from "@/util/fontsLoader";

export default function Header(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navMenu = useSelector((state: RootState) => state.switches.navMenu);

  return (
    <header css={css(header)}>
      {!navMenu ? (
        <Link href="/" className="logo" onClick={() => dispatch(setNavMenu(false))}>
          <BsBox />
          <h1 className={prompt.className} css={css({ marginLeft: "1rem" })}>
            Square Box
          </h1>
        </Link>
      ) : (
        // menuBtn 에 space-between 적용하기 위한 빈 요소
        <div />
      )}
      {navMenu === false ? (
        <IoMenuOutline className="menuBtn" onClick={() => dispatch(setNavMenu(navMenu ? false : true))} />
      ) : (
        <IoCloseOutline
          className="menuBtn"
          onClick={() => {
            dispatch(setNavMenu(!navMenu));
          }}
        />
      )}
    </header>
  );
}
