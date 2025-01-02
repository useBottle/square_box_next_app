/**@jsxImportSource @emotion/react */

"use client";

import { RootState } from "@/store/store";
import { css, CSSObject } from "@emotion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function YoutubeDynamic(): JSX.Element {
  const youtubeList = useSelector((state: RootState) => state.youtube.youtubeList);
  const searchParams = useSearchParams();

  const videoId = searchParams.get("id");
  const index = searchParams.get("index");

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

  if (!youtubeList || youtubeList.items.length === 0) {
    return (
      <div css={css(infoText)}>
        <p>데이터가 만료되었습니다</p>
        <p>다시 시도해주세요</p>
        <Link href="/">HOME</Link>
      </div>
    );
  }

  return (
    <div>
      <div></div>
    </div>
  );
}
