/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { setNavMenu, setSignoutModal } from "@/store/switches";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { nav } from "@/styles/MobileNav.styles";
import SignoutModal from "./SignoutModal";

export default function MobileNav(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { navMenu } = useSelector((state: RootState) => state.switches);
  const { signoutModal } = useSelector((state: RootState) => state.switches);
  const session = useSession();

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "News", path: "/news" },
    { text: "Youtube", path: "/youtube" },
    { text: "Bookmark", path: "/bookmark" },
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
              <Link href={item.path} className="list" onClick={() => dispatch(setNavMenu(navMenu ? false : true))}>
                {item.text}
              </Link>
            </li>
          );
        })}
        {session.data === null ? (
          <Link href="/auth/signin" onClick={() => dispatch(setNavMenu(navMenu ? false : true))} className="btn">
            로그인
          </Link>
        ) : (
          <button
            className="btn"
            onClick={() => {
              dispatch(setSignoutModal(signoutModal ? false : true));
            }}
          >
            로그아웃
          </button>
        )}
        <p>
          아직 회원이 아니신가요?<Link href="/auth/signup">회원가입</Link>
        </p>
      </ul>
    </nav>
  );
}
