/**@jsxImportSource @emotion/react */

"use client";

import { css, CSSObject, keyframes } from "@emotion/react";
import { GoBookmarkFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import Link from "next/link";

const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const bookmarkBtn: CSSObject = {
  button: {
    width: "100%",
    height: "4rem",
    fontSize: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--reverse-font)",
    border: "var(--basic-font) solid 1px",
    color: "var(--basic-font)",
    borderRadius: "5px",
    boxSizing: "border-box",
    cursor: "pointer",

    span: {
      fontSize: "1.4rem",
      marginLeft: "0.5rem",
    },

    ".spinner": {
      width: "1.6rem",
      height: "1.6rem",
      border: "4px solid var(--shadow-color)",
      borderRadius: "50%",
      borderRightColor: "transparent",
      animation: `${rotate} 1s linear infinite`,
    },
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",

    button: {
      width: "4rem",
    },

    a: {
      width: "30%",

      button: {
        width: "100%",
      },
    },
  },
};

export default function BookmarkBtn({ success, isLoading }: { success: boolean; isLoading: boolean }): JSX.Element {
  const { data: session } = useSession();

  return (
    <div css={css(bookmarkBtn)}>
      {session ? (
        <>
          {!isLoading ? (
            <button
              type="submit"
              style={
                success
                  ? {
                      background: "var(--basic-font)",
                      border: "var(--basic-font) solid 1px",
                      color: "var(--reverse-font)",
                    }
                  : {}
              }
            >
              {success ? <FaCheck /> : <GoBookmarkFill />}
            </button>
          ) : (
            <button style={{ borderColor: "var(--shadow-color)" }}>
              <div className="spinner" />
            </button>
          )}
        </>
      ) : (
        <Link href="/auth/signin">
          <button>
            <span>북마크하려면 로그인 해야합니다</span>
          </button>
        </Link>
      )}
    </div>
  );
}
