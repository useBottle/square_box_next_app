/**@jsxImportSource @emotion/react */

"use client";

import { css, CSSObject } from "@emotion/react";
import Link from "next/link";

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

export default function ExpiredData(): JSX.Element {
  return (
    <div css={css(infoText)}>
      <p>데이터가 만료되었습니다</p>
      <p>다시 시도해주세요</p>
      <Link href="/">HOME</Link>
    </div>
  );
}
