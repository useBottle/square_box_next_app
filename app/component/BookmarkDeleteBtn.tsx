/**@jsxImportSource @emotion/react */

"use client";

import { IoTrashBinOutline } from "react-icons/io5";
import { css, CSSObject } from "@emotion/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { deleteNewsBookmark, deleteYoutubeBookmark } from "../actions/bookmarkActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { MarkedNewsArticle, MarkedYoutubeVideo } from "@/types/types";
import { setMarkedNews, setMarkedYoutube } from "@/store/bookmark";
import { MouseEvent } from "react";

const btn: CSSObject = {
  button: {
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
  },

  // 태블릿 뷰
  "@media (min-width: 430px)": {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "5rem",

    button: {
      width: "4rem",
      height: "4rem",
      margin: 0,
    },
  },
};

export default function BookmarkDeleteBtn({ data }: { data: { category: string; id: string } }) {
  const session = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const markedNewsData = useSelector((state: RootState) => state.bookmark.markedNews.data);
  const markedYoutubeData = useSelector((state: RootState) => state.bookmark.markedYoutube.data);

  const onClick =
    (targetData: {
      category: string;
      id: string;
      username: string;
      markedNewsData: MarkedNewsArticle[];
      markedYoutubeData: MarkedYoutubeVideo[];
    }) =>
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      async function deleteBookmark() {
        if (targetData.category === "news" && targetData.markedNewsData.length !== 0) {
          if (confirm("북마크를 제거하시겠습니까?")) {
            const deleteData = targetData.markedNewsData.filter((item) => item._id !== targetData.id);
            dispatch(setMarkedNews({ exists: true, number: deleteData.length, data: deleteData }));
            const result = await deleteNewsBookmark(targetData.id, targetData.username);

            if (result && result.delete === false) {
              alert("북마크 삭제에 실패했습니다. 재시도해주세요.");
            }
          }
        }

        if (targetData.category === "youtube") {
          if (confirm("북마크를 제거하시겠습니까?")) {
            const deleteData = targetData.markedYoutubeData.filter((item) => item._id !== targetData.id);
            dispatch(setMarkedYoutube({ exists: true, number: deleteData.length, data: deleteData }));
            const result = await deleteYoutubeBookmark(targetData.id, targetData.username);

            if (result && result.delete === false) {
              alert("북마크 삭제에 실패했습니다. 재시도해주세요.");
            }
          }
        }
      }
      deleteBookmark();
    };

  const targetData = {
    category: data.category,
    id: data.id,
    username: session.data?.user?.name as string,
    markedNewsData: markedNewsData,
    markedYoutubeData: markedYoutubeData,
  };

  return (
    <div css={css(btn)}>
      <Link href={data.category === "news" ? "/bookmark/news" : "/bookmark/youtube"} onClick={onClick(targetData)}>
        <button>
          <IoTrashBinOutline />
        </button>
      </Link>
    </div>
  );
}
