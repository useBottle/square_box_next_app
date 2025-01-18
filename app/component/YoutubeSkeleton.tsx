/**@jsxImportSource @emotion/react */

"use client";

export default function YoutubeSkeleton(): JSX.Element {
  const arry = new Array(5).fill(null);
  return (
    <div className="skeleton">
      {arry.map((_, index) => {
        return (
          <div className="list" key={index}>
            <div className="imgFrame default"></div>
            <div className="textGroup">
              <div className="titleFrame default"></div>
              <div className="channelFrame default"></div>
              <div className="dateFrame default"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
