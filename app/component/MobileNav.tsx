/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { setNavMenu } from "@/store/switches";
import { FaHome, FaNewspaper, FaYoutube, FaBookmark } from "react-icons/fa";

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
  });

  const menuIcon = css({
    marginRight: "1rem",
    color: "var(--main-color)",
  });

  const menuItems = [
    { icon: <FaHome css={menuIcon} />, text: "Home" },
    { icon: <FaNewspaper css={menuIcon} />, text: "News" },
    { icon: <FaYoutube css={menuIcon} />, text: "Youtube" },
    { icon: <FaBookmark css={menuIcon} />, text: "BookMark" },
  ];

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
              <button css={menuList}>
                {item.icon}
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
