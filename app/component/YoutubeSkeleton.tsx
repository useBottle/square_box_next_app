/**@jsxImportSource @emotion/react */

"use client";

import { youtubeSkeleton } from "@/styles/Youtube.styles";
import { css } from "@emotion/react";

export default function YoutubeSkeleton(): JSX.Element {
  const arry = new Array(5).fill(null);
  return (
    <div css={css(youtubeSkeleton)}>
      {arry.map((_, index) => {
        return (
          <div className="list" key={index}>
            <div className="imgFrame default"></div>
            <div className="textGroup">
              <div className="titleFrame default"></div>
              <div className="channelFrame default"></div>
              <div className="dateFrame default"></div>
              <div className="descGroup">
                <div className="descFrame default"></div>
                <div className="descFrame default"></div>
                <div className="descFrame default"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
