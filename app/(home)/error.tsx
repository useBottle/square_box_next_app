/**@jsxImportSource @emotion/react */

"use client";

import { CSSObject, css } from "@emotion/react";
import Link from "next/link";

export default function Error(): JSX.Element {
  const infoText: CSSObject = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "80vh",
    fontSize: "1.6rem",

    "& a": {
      color: "var(--reverse-font)",
      padding: "1rem 2rem",
      background: "var(--basic-font)",
      borderRadius: "3px",
      marginTop: "8rem",
    },
  };

  return (
    <div css={css(infoText)}>
      <p>페이지에 오류가 발생했습니다</p>
      <p>다시 시도해주세요</p>
      <Link href="/">HOME</Link>
    </div>
  );
}
