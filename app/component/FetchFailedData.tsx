/**@jsxImportSource @emotion/react */

"use client";

import { css, CSSObject } from "@emotion/react";

const infoText: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "80vh",
  fontSize: "1.6rem",

  "& a": {
    color: "var(--reverse-font)",
    padding: "1rem 2rem",
    background: "var(--basic-font)",
    borderRadius: "3px",
    marginTop: "8rem",
  },
};

export default function FetchFailedData(): JSX.Element {
  return (
    <div css={css(infoText)}>
      <p>데이터를 불러오는 중에 오류가 발생했습니다</p>
      <p>다시 시도해주세요</p>
      {/* layout 에서 데이터를 새로 요청하기 위해 새로고침이 발생해야하므로 Link 컴포넌트 사용 금지*/}
      <a href="/">HOME</a>
    </div>
  );
}
