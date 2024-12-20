/**@jsxImportSource @emotion/react */

"use client";

import { articleSkeleton } from "@/styles/News.styles";
import { css } from "@emotion/react";

export default function ArticleSkeleton(): JSX.Element {
  return (
    <div css={css(articleSkeleton)}>
      <div className="img default"></div>
      <div className="title default"></div>
      <div className="text default"></div>
      <div className="text default"></div>
    </div>
  );
}
