/**@jsxImportSource @emotion/react */

"use client";

const bookmarkLayout: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

import { css, CSSObject } from "@emotion/react";
import BookmarkSelector from "../component/BookmarkSelector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { setPageState } from "@/store/switches";

export default function BookmarkLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const inBookmarkDetail = useSelector((state: RootState) => state.switches.inBookmarkDetail);

  useEffect(() => {
    dispatch(setPageState("bookmark"));
  }, []);

  return (
    <div css={css(bookmarkLayout)}>
      {!inBookmarkDetail && <BookmarkSelector />}
      {children}
    </div>
  );
}
