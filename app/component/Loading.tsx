/**@jsxImportSource @emotion/react */

"use client";

import { loading } from "@/styles/Loading.styles";
import { css } from "@emotion/react";

export default function Loading() {
  return (
    <div css={css(loading)}>
      <h1>데이터를 불러오는 중입니다</h1>
    </div>
  );
}
