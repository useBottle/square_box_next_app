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
import { IoHomeOutline, IoNewspaperOutline, IoBookmarkOutline } from "react-icons/io5";
import { SlSocialYoutube } from "react-icons/sl";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { IoArrowBack } from "react-icons/io5";

export default function MobileNav(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { navMenu } = useSelector((state: RootState) => state.switches);
  const { signoutModal } = useSelector((state: RootState) => state.switches);
  const session = useSession();

  const menuItems = [
    { text: "HOME", icon: <IoHomeOutline />, path: "/" },
    { text: "NEWS", icon: <IoNewspaperOutline />, path: "/news" },
    { text: "YOUTUBE", icon: <SlSocialYoutube />, path: "/youtube" },
    { text: "BOOKMARK", icon: <IoBookmarkOutline />, path: "/bookmark" },
  ];

  return (
    <div>
      {navMenu && (
        <nav css={css(nav)}>
          {signoutModal && <SignoutModal />}
          <div className="back" onClick={() => dispatch(setNavMenu(navMenu ? false : true))}>
            <IoArrowBack />
          </div>
          <ul>
            {menuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.path} className="list" onClick={() => dispatch(setNavMenu(navMenu ? false : true))}>
                    {item.text}
                    {item.icon}
                  </Link>
                </li>
              );
            })}
            {session.data === null ? (
              <Link href="/auth/signin" onClick={() => dispatch(setNavMenu(navMenu ? false : true))} className="auth">
                LOG IN
                <PiSignIn />
              </Link>
            ) : (
              <button
                className="auth"
                onClick={() => {
                  dispatch(setSignoutModal(signoutModal ? false : true));
                }}
              >
                LOG OUT
                <PiSignOut />
              </button>
            )}
          </ul>
          <p className="guideSignup">
            아직 회원이 아니신가요?
            <Link
              href="/auth/signup"
              onClick={() => dispatch(setNavMenu(navMenu ? false : true))}
              className="signupBtn"
            >
              회원가입
            </Link>
          </p>
        </nav>
      )}
    </div>
  );
}
