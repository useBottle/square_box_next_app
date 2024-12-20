/**@jsxImportSource @emotion/react */

"use client";

import { newsSkeleton } from "@/styles/News.styles";
import { css } from "@emotion/react";

export default function NewsSkeleton(): JSX.Element {
  const arry = new Array(5).fill(null);

  return (
    <div css={css(newsSkeleton)}>
      {arry.map((_, index) => {
        return (
          <div className="list" key={index}>
            <div className="imgFrame default"></div>
            <div className="textGroup">
              <div className="textFrame default"></div>
              <div className="textFrame default"></div>
              <div className="textFrame default"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
