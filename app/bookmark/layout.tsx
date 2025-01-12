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
import { Suspense } from "react";
import Loading from "../component/Loading";

export default function BookmarkLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div css={css(bookmarkLayout)}>
      <BookmarkSelector />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
