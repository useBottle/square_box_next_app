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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function BookmarkLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const pageState = useSelector((state: RootState) => state.switches.pageState);

  return (
    <div css={css(bookmarkLayout)}>
      {pageState === "bookmark" && <BookmarkSelector />}
      {children}
    </div>
  );
}
