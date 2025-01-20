/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue, setNavMenu } from "@/store/switches";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { nav } from "@/styles/MobileNav.styles";
import { IoHomeOutline, IoNewspaperOutline, IoBookmarkOutline, IoPersonCircleOutline } from "react-icons/io5";
import { SlSocialYoutube } from "react-icons/sl";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import plateBack from "../../public/images/snow_forest.jpg";
import Image from "next/image";
import { BsBox } from "react-icons/bs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { prompt } from "@/util/fontsLoader";

export default function MobileNav(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navMenu = useSelector((state: RootState) => state.switches.navMenu);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (navMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navMenu]);

  const onClick = (path: string) => {
    dispatch(setInputValue(""));
    dispatch(setNavMenu(navMenu ? false : true));
    router.push(path);
  };

  const menuItems = [
    { text: "HOME", icon: <IoHomeOutline />, path: "/" },
    { text: "NEWS", icon: <IoNewspaperOutline />, path: "/news" },
    { text: "YOUTUBE", icon: <SlSocialYoutube />, path: "/youtube" },
    { text: "BOOKMARK", icon: <IoBookmarkOutline />, path: "/bookmark/news" },
  ];

  return (
    <div>
      {navMenu && (
        <nav css={css(nav)}>
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
          <div className="userPlate">
            {session.data?.user.image ? (
              <Image
                src={session.data.user.image}
                alt="userImg"
                width={40}
                height={40}
                // 이미지 로드 실패 시 대체 아이콘 보여주기
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const replacedImg = document.createElement("div");
                  replacedImg.className = "replacedImg";
                  replacedImg.innerHTML = "<IoPersonCircleOutline />";
                  e.currentTarget.parentElement?.appendChild(replacedImg);
                }}
              />
            ) : (
              <div className="replacedImg">
                <IoPersonCircleOutline />
              </div>
            )}
            <div className="userName">{session.data?.user.name ? session.data.user.name : "로그인이 필요합니다"}</div>
          </div>
          <ul>
            {menuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.path} className="list" onClick={() => onClick(item.path)}>
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
                  if (confirm("로그아웃 하시겠습니까?")) {
                    signOut();
                    router.push("/");
                  }
                }}
              >
                LOG OUT
                <PiSignOut />
              </button>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
