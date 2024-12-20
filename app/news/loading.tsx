/**@jsxImportSource @emotion/react */

"use client";

import { loading } from "@/styles/Loading.styles";
import { css } from "@emotion/react";

export default function Loading() {
  return (
    <div css={css(loading)}>
      <div className="textBox">
        <h1>L O A D I N G</h1>
      </div>
      <div className="square"></div>
    </div>
  );
}
