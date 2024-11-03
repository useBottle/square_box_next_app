/** @jsxImportSource @emotion/react */

"use client";

import { css, CSSObject, keyframes } from "@emotion/react";

const shine = keyframes({
  from: {
    transform: "skew(45deg) translateX(0%)",
  },
  to: {
    transform: "skew(45deg) translateX(200%)",
  },
});

export default function TopicsSkeleton(): JSX.Element {
  const arry = new Array(10).fill(null);

  const styles: CSSObject = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",

    "& .list": {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "8% 84% 6%",
      margin: "1rem 0",

      "& span": {
        position: "relative",
        background: "lightgray",
        height: "1.8rem",
        borderRadius: "3px",
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#ffffff33",
          animation: `${shine} infinite 1.5s ease-in-out`,
        },
      },

      "& .rank": {
        marginLeft: "0.5rem",
      },

      "& .keyword": {
        marginLeft: "2rem",
        marginRight: "2rem",
      },
    },
  };

  return (
    <div css={css(styles)}>
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
