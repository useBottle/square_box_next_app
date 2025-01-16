/** @jsxImportSource @emotion/react */

"use client";

import { useRouter } from "next/navigation";
import { css, CSSObject } from "@emotion/react";

const container: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",

  h1: {
    fontSize: "1.6rem",
  },

  button: {
    marginTop: "10rem",
    border: "none",
    borderRadius: "5px",
    background: "var(--main-color)",
    color: "var(--reverse-font)",
    width: "20rem",
    height: "5rem",
    fontSize: "1.4rem",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1,
  },

  "@media (min-width: 1200px)": {
    h1: {
      fontSize: "2.4rem",
    },

    button: {
      fontSize: "1.6rem",
    },
  },
};

export default function SocialRedirect(): JSX.Element {
  const router = useRouter();

  return (
    <div css={css(container)}>
      <h1>소셜 계정이 이미 존재합니다</h1>
      <button onClick={() => router.push("/auth/signin")}>다시 로그인하기</button>
    </div>
  );
}
