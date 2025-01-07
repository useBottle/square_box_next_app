/**@jsxImportSource @emotion/react */

"use client";

import { IoTrashBinOutline } from "react-icons/io5";
import { css, CSSObject } from "@emotion/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { deleteNewsBookmark, deleteYoutubeBookmark } from "../actions/bookmarkActions";

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
  if (data.category === "news") {
    deleteNewsBookmark(data.id, data.username);
  }

  if (data.category === "youtube") {
    deleteYoutubeBookmark(data.id, data.username);
  }
  window.location.reload();
};

export default function BookmarkDeleteBtn({ data }: { data: { category: string; id: string } }) {
  const session = useSession();

  const targetData = {
    category: data.category,
    id: data.id,
    username: session.data?.user?.name as string,
  };

  return (
    <Link href={data.category === "news" ? "/bookmark/news" : "/bookmark/youtube"} onClick={onClick(targetData)}>
      <button css={css(btn)}>
        <IoTrashBinOutline />
      </button>
    </Link>
  );
}
