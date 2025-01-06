/** @jsxImportSource @emotion/react */

"use client";

import { latestNewsSkeleton } from "@/styles/LatestNews.styles";
import { css } from "@emotion/react";

export default function LatestNewsSkeleton(): JSX.Element {
  const arry = new Array(10).fill(null);

  return (
    <div css={css(latestNewsSkeleton)}>
      {arry.map((_, index) => {
        return (
          <div key={index} className="contentBox">
            <div className="img default" />
            <div className="textGroup">
              <div className="title default"></div>
              <div className="text1 default"></div>
              <div className="text2 default"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
