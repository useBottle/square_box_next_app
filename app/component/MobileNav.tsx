/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { setNavMenu } from "@/store/switches";
import { FaHome, FaNewspaper, FaYoutube, FaBookmark } from "react-icons/fa";
import Link from "next/link";
import { BsBox } from "react-icons/bs";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function MobileNav(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { navMenu } = useSelector((state: RootState) => state.switches);

  const menuList = css({
    width: "20rem",
    height: "5rem",
    border: "1px solid #eee",
    borderRadius: "5px",
    background: "transparent",
    margin: "1rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.4rem",
    color: "var(--basic-font)",
    transform: "translateY(-5rem)",
  });

  const menuIcon = css({
    marginRight: "1rem",
    color: "var(--main-color)",
  });

  const menuItems = [
    { icon: <FaHome css={menuIcon} />, text: "Home", path: "/" },
    { icon: <FaNewspaper css={menuIcon} />, text: "News", path: "/news" },
    { icon: <FaYoutube css={menuIcon} />, text: "Youtube", path: "/youtube" },
    { icon: <FaBookmark css={menuIcon} />, text: "BookMark", path: "/bookmark" },
  ];

  return (
    <nav
      css={css({
        display: `${navMenu ? "block" : "none"}`,
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: "var(--background)",
        zIndex: "999",
      })}
    >
      <Link
        href="/"
        css={css({
          display: "flex",
          color: "var(--basic-font)",
          fontSize: "2rem",
          margin: "1.5rem 1.5rem",
        })}
      >
        <BsBox />
        <h1 className={prompt.className} css={css({ marginLeft: "1rem" })}>
          Square Box
        </h1>
      </Link>
      <IoCloseOutline
        css={css({
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          fontSize: "2rem",
        })}
        onClick={() => dispatch(setNavMenu(navMenu ? false : true))}
      />
      <ul
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        })}
      >
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.path} onClick={() => dispatch(setNavMenu(navMenu ? false : true))} css={menuList}>
                {item.icon}
                {item.text}
              </Link>
            </li>
          );
        })}
        <Link
          href="/auth/signin"
          onClick={() => dispatch(setNavMenu(navMenu ? false : true))}
          css={css({
            marginTop: "10rem",
            border: "none",
            borderRadius: "5px",
            background: "var(--main-color)",
            color: "var(--reverse-font)",
            width: "20rem",
            height: "5rem",
            fontSize: "1.4rem",
            transform: "translateY(-5rem)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          로그인
        </Link>
      </ul>
    </nav>
  );
}
