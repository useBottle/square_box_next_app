/**@jsxImportSource @emotion/react */

"use client";

export default function NewsSkeleton(): JSX.Element {
  const arry = new Array(5).fill(null);

  return (
    <div className="skeleton">
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
