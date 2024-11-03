/** @jsxImportSource @emotion/react */

"use client";

import { skeleton } from "@/styles/Topics.styles";
import { css } from "@emotion/react";

export default function TopicsSkeleton(): JSX.Element {
  const arry = new Array(10).fill(null);

  return (
    <div css={css(skeleton)}>
      {arry.map((_, index) => {
        return (
          <div key={index} className="list">
            <span className="rank"></span>
            <span className="keyword"></span>
            <span></span>
          </div>
        );
      })}
    </div>
  );
}
