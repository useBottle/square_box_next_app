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
import plateBack from "../../public/images/snow_forest.jpg";
import Image from "next/image";
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
  const { signoutModal } = useSelector((state: RootState) => state.switches);
  const session = useSession();

  const menuItems = [
    { text: "HOME", icon: <IoHomeOutline />, path: "/" },
    { text: "NEWS", icon: <IoNewspaperOutline />, path: "/news" },
    { text: "YOUTUBE", icon: <SlSocialYoutube />, path: "/youtube" },
    { text: "BOOKMARK", icon: <IoBookmarkOutline />, path: "/bookmark" },
  ];
  console.log(session.data);

  return (
    <div>
      {navMenu && (
        <nav css={css(nav)}>
          {signoutModal && <SignoutModal />}
          <div className="back" onClick={() => dispatch(setNavMenu(navMenu ? false : true))}>
            <IoArrowBack />
          </div>
          <div className="logoPlate">
            <div className="logo">
              <BsBox />
              <h1 className={prompt.className} css={css({ marginLeft: "1rem" })}>
                Square Box
              </h1>
            </div>
            <div className="overlay" />
            <Image src={plateBack} alt="plateback" loading="eager" />
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
