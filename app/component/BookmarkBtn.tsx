/**@jsxImportSource @emotion/react */

"use client";

import { css, CSSObject } from "@emotion/react";
import { GoBookmarkFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";

const bookmarkBtn: CSSObject = {
  button: {
    width: "100%",
    padding: "0.8rem 0",
    fontSize: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--reverse-font)",
    border: "var(--basic-font) solid 1px",
    color: "var(--basic-font)",
    borderRadius: "5px",
    boxSizing: "border-box",
    cursor: "pointer",
    marginBottom: "4rem",

    span: {
      fontSize: "1.4rem",
      marginLeft: "0.5rem",
    },
  },
};

export default function BookmarkBtn({ success, isLoading }: { success: boolean; isLoading: boolean }): JSX.Element {
  return (
    <div css={css(bookmarkBtn)}>
      {!isLoading ? (
        <button
          type="submit"
          style={
            success
              ? {
                  background: "var(--basic-font)",
                  border: "var(--basic-font) solid 1px",
                  color: "var(--reverse-font)",
                }
              : {}
          }
        >
          {success ? <FaCheck /> : <GoBookmarkFill />}
        </button>
      ) : (
        <button></button>
      )}
    </div>
  );
}
