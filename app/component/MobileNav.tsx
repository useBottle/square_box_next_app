/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { setNavMenu } from "@/store/switches";
import { FaHome, FaNewspaper, FaYoutube, FaBookmark } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { menuIcon, menuList, menuUl, nav, signinBtn, signoutBtn } from "@/styles/MobileNav.styles";

export default function MobileNav(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { navMenu } = useSelector((state: RootState) => state.switches);
  const session = useSession();

  const menuItems = [
    { icon: <FaHome css={menuIcon} />, text: "Home", path: "/" },
    { icon: <FaNewspaper css={menuIcon} />, text: "News", path: "/news" },
    { icon: <FaYoutube css={menuIcon} />, text: "Youtube", path: "/youtube" },
    { icon: <FaBookmark css={menuIcon} />, text: "BookMark", path: "/bookmark" },
  ];

  return (
    <nav
      css={css({
        ...nav,
        display: navMenu ? "block" : "none",
      })}
    >
      <ul css={css(menuUl)}>
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
            ...signinBtn,
            display: session.data === null ? "flex" : "none",
          })}
        >
          로그인
        </Link>
        <Link
          href="/auth/signout"
          onClick={() => dispatch(setNavMenu(navMenu ? false : true))}
          css={css({
            ...signoutBtn,
            display: session.data === null ? "none" : "flex",
          })}
        >
          로그아웃
        </Link>
      </ul>
    </nav>
  );
}
