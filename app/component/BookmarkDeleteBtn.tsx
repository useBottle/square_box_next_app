/**@jsxImportSource @emotion/react */

"use client";

import { IoTrashBinOutline } from "react-icons/io5";
import { css, CSSObject } from "@emotion/react";

const btn: CSSObject = {};

export default function BookmarkDeleteBtn() {
  return (
    <button css={css(btn)}>
      <IoTrashBinOutline />
    </button>
  );
}
