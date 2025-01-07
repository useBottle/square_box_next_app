/**@jsxImportSource @emotion/react */

"use client";

import { IoTrashBinOutline } from "react-icons/io5";
import { css, CSSObject } from "@emotion/react";

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

export default function BookmarkDeleteBtn() {
  return (
    <button css={css(btn)}>
      <IoTrashBinOutline />
    </button>
  );
}
