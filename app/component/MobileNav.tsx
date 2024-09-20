/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { setNavMenu } from "@/store/switches";

export default function MobileNav(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { navMenu } = useSelector((state: RootState) => state.switches);

  return (
    <nav
      css={css({
        display: `${navMenu ? "block" : "none"}`,
        width: "100vw",
        height: "100vh",
        background: "var(--background)",
        zIndex: "999",
      })}
    >
      <IoCloseOutline
        css={css({
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          fontSize: "2rem",
        })}
        onClick={() => dispatch(setNavMenu(navMenu ? false : true))}
      />
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  );
}
