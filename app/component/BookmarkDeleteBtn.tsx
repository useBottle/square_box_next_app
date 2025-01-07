/**@jsxImportSource @emotion/react */

"use client";

import { IoTrashBinOutline } from "react-icons/io5";
import { css, CSSObject } from "@emotion/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { MouseEvent } from "react";

const btn: CSSObject = {
  border: "var(--basic-font) 1px solid",
  background: "var(--reverse-font)",
  color: "var(--basic-font)",
  fontSize: "2rem",
  cursor: "pointer",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5rem 0",
  borderRadius: "5px",
  marginBottom: "5rem",
};

const onClick = (data: { category: string; id: string; username: string }) => () => {
  // 서버 액션 호출하기
  window.location.reload();
};

export default function BookmarkDeleteBtn({ data }: { data: { category: string; id: string } }) {
  const selected = useSelector((state: RootState) => state.bookmark);
  const session = useSession();

  const targetData = {
    ...data,
    username: session.data?.user?.name as string,
  };

  return (
    <Link href={selected === "news" ? "/bookmark/news" : "/bookmark/youtube"} onClick={onClick(targetData)}>
      <button css={css(btn)}>
        <IoTrashBinOutline />
      </button>
    </Link>
  );
}
