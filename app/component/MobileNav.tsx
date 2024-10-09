/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { css, CSSObject } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { setNavMenu, setSignoutModal } from "@/store/switches";
import { FaHome, FaNewspaper, FaYoutube, FaBookmark } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { nav } from "@/styles/MobileNav.styles";
import SignoutModal from "./SignoutModal";

export default function MobileNav(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { navMenu } = useSelector((state: RootState) => state.switches);
  const { signoutModal } = useSelector((state: RootState) => state.switches);
  const session = useSession();
  const ulStyles = nav["& ul"] as CSSObject;
  const liStyles = ulStyles && (ulStyles["& li"] as CSSObject);
  const btnStyles = liStyles && (liStyles["& btn"] as CSSObject);

  const menuItems = [
    { icon: <FaHome className="menuIcon" />, text: "Home", path: "/" },
    { icon: <FaNewspaper className="menuIcon" />, text: "News", path: "/news" },
    { icon: <FaYoutube className="menuIcon" />, text: "Youtube", path: "/youtube" },
    { icon: <FaBookmark className="menuIcon" />, text: "BookMark", path: "/bookmark" },
  ];

  return (
    <nav
      css={css({
        ...nav,
        display: navMenu ? "block" : "none",
      })}
    >
      {signoutModal && <SignoutModal />}
      <ul>
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.path} onClick={() => dispatch(setNavMenu(navMenu ? false : true))}>
                {item.icon}
                {item.text}
              </Link>
            </li>
          );
        })}
        <Link
          href="/auth/signin"
          onClick={() => dispatch(setNavMenu(navMenu ? false : true))}
          className="btn"
          css={css([btnStyles, { display: session.data === null ? "flex" : "none" }])}
        >
          로그인
        </Link>
        <button
          className="btn"
          onClick={() => {
            dispatch(setSignoutModal(signoutModal ? false : true));
          }}
          css={css([btnStyles, { display: session.data === null ? "none" : "flex" }])}
        >
          로그아웃
        </button>
      </ul>
    </nav>
  );
}
