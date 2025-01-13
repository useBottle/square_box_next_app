/**@jsxImportSource @emotion/react */

"use client";

import { CSSObject, css } from "@emotion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function Error(): JSX.Element {
  const path = usePathname();
  const router = useRouter();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    path !== "/" && router.push("/");
    path === "/" && window.location.reload();
  };

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
      <Link href="/" onClick={onClick}>
        HOME
      </Link>
    </div>
  );
}
